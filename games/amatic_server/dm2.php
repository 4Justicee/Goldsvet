   <?php

include_once '../../engine/cfg.php';
include_once '../../engine/ini.php';

set_time_limit(0); 

$socket = stream_socket_server("tcp://".$conf['url'].":".$conf['amatic_port'], $errno, $errstr);
if (!$socket) {
    die("$errstr ($errno)\n");
}

$connects = array();
$gameId=array();
while (true) {
    //                                                                           :
    $read = $connects;
    $read []= $socket;
    $write = $except = null;

    if (!stream_select($read, $write, $except, null)) {//                                                                   (                       )
        break;
    }

    if (in_array($socket, $read)) {//                                        
        //                                                                                                 :
        if (($connect = stream_socket_accept($socket, -1)) && $info = handshake($connect)) {
            $connects[] = $connect;//                                                                                          
            onOpen($connect, $info);//                                                                  
        }
        unset($read[ array_search($socket, $read) ]);
    }

    foreach($read as $connect) {//                                                    
        $data = fread($connect, 100000);

        if (!$data) { //                                            
            fclose($connect);
            unset($connects[ array_search($connect, $connects) ]);
            onClose($connect);//                                                                  
            continue;
        }

        onMessage($connect, $data);//                                                                  
    }
}

fclose($server);

function handshake($connect) {
    $info = array();

    $line = fgets($connect);
    $header = explode(' ', $line);
    $info['method'] = $header[0];
    $info['uri'] = $header[1];

    //                                                               
    while ($line = rtrim(fgets($connect))) {
        if (preg_match('/\A(\S+): (.*)\z/', $line, $matches)) {
            $info[$matches[1]] = $matches[2];
        } else {
            break;
        }
    }

    $address = explode(':', stream_socket_get_name($connect, true)); //                                          
    $info['ip'] = $address[0];
    $info['port'] = $address[1];

    if (empty($info['Sec-WebSocket-Key'])) {
        return false;
    }

    //                                                                                              
    $SecWebSocketAccept = base64_encode(pack('H*', sha1($info['Sec-WebSocket-Key'] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
    $upgrade = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
        "Upgrade: websocket\r\n" .
        "Connection: Upgrade\r\n" .
        "Sec-WebSocket-Accept:$SecWebSocketAccept\r\n\r\n";
    fwrite($connect, $upgrade);

    return $info;
}

function encode($payload, $type = 'text', $masked = false)
{
    $frameHead = array();
    $payloadLength = strlen($payload);

    switch ($type) {
        case 'text':
            // first byte indicates FIN, Text-Frame (10000001):
            $frameHead[0] = 129;
            break;

        case 'close':
            // first byte indicates FIN, Close Frame(10001000):
            $frameHead[0] = 136;
            break;

        case 'ping':
            // first byte indicates FIN, Ping frame (10001001):
            $frameHead[0] = 137;
            break;

        case 'pong':
            // first byte indicates FIN, Pong frame (10001010):
            $frameHead[0] = 138;
            break;
    }

    // set mask and payload length (using 1, 3 or 9 bytes)
    if ($payloadLength > 65535) {
        $payloadLengthBin = str_split(sprintf('%064b', $payloadLength), 8);
        $frameHead[1] = ($masked === true) ? 255 : 127;
        for ($i = 0; $i < 8; $i++) {
            $frameHead[$i + 2] = bindec($payloadLengthBin[$i]);
        }
        // most significant bit MUST be 0
        if ($frameHead[2] > 127) {
            return array('type' => '', 'payload' => '', 'error' => 'frame too large (1004)');
        }
    } elseif ($payloadLength > 125) {
        $payloadLengthBin = str_split(sprintf('%016b', $payloadLength), 8);
        $frameHead[1] = ($masked === true) ? 254 : 126;
        $frameHead[2] = bindec($payloadLengthBin[0]);
        $frameHead[3] = bindec($payloadLengthBin[1]);
    } else {
        $frameHead[1] = ($masked === true) ? $payloadLength + 128 : $payloadLength;
    }

    // convert frame-head to string:
    foreach (array_keys($frameHead) as $i) {
        $frameHead[$i] = chr($frameHead[$i]);
    }
    if ($masked === true) {
        // generate a random mask:
        $mask = array();
        for ($i = 0; $i < 4; $i++) {
            $mask[$i] = chr(rand(0, 255));
        }

        $frameHead = array_merge($frameHead, $mask);
    }
    $frame = implode('', $frameHead);

    // append payload to frame:
    for ($i = 0; $i < $payloadLength; $i++) {
        $frame .= ($masked === true) ? $payload[$i] ^ $mask[$i % 4] : $payload[$i];
    }

    return $frame;
}

function decode($data)
{
    $unmaskedPayload = '';
    $decodedData = array();

    // estimate frame type:
    $firstByteBinary = sprintf('%08b', ord($data[0]));
    $secondByteBinary = sprintf('%08b', ord($data[1]));
    $opcode = bindec(substr($firstByteBinary, 4, 4));
    $isMasked = ($secondByteBinary[0] == '1') ? true : false;
    $payloadLength = ord($data[1]) & 127;

    // unmasked frame is received:
    if (!$isMasked) {
        return array('type' => '', 'payload' => '', 'error' => 'protocol error (1002)');
    }

    switch ($opcode) {
        // text frame:
        case 1:
            $decodedData['type'] = 'text';
            break;

        case 2:
            $decodedData['type'] = 'binary';
            break;

        // connection close frame:
        case 8:
            $decodedData['type'] = 'close';
            break;

        // ping frame:
        case 9:
            $decodedData['type'] = 'ping';
            break;

        // pong frame:
        case 10:
            $decodedData['type'] = 'pong';
            break;

        default:
            return array('type' => '', 'payload' => '', 'error' => 'unknown opcode (1003)');
    }

    if ($payloadLength === 126) {
        $mask = substr($data, 4, 4);
        $payloadOffset = 8;
        $dataLength = bindec(sprintf('%08b', ord($data[2])) . sprintf('%08b', ord($data[3]))) + $payloadOffset;
    } elseif ($payloadLength === 127) {
        $mask = substr($data, 10, 4);
        $payloadOffset = 14;
        $tmp = '';
        for ($i = 0; $i < 8; $i++) {
            $tmp .= sprintf('%08b', ord($data[$i + 2]));
        }
        $dataLength = bindec($tmp) + $payloadOffset;
        unset($tmp);
    } else {
        $mask = substr($data, 2, 4);
        $payloadOffset = 6;
        $dataLength = $payloadLength + $payloadOffset;
    }

    /**
     * We have to check for large frames here. socket_recv cuts at 1024 bytes
     * so if websocket-frame is > 1024 bytes we have to wait until whole
     * data is transferd.
     */
    if (strlen($data) < $dataLength) {
        return false;
    }

    if ($isMasked) {
        for ($i = $payloadOffset; $i < $dataLength; $i++) {
            $j = $i - $payloadOffset;
            if (isset($data[$i])) {
                $unmaskedPayload .= $data[$i] ^ $mask[$j % 4];
            }
        }
        $decodedData['payload'] = $unmaskedPayload;
    } else {
        $payloadOffset = $payloadOffset - 4;
        $decodedData['payload'] = substr($data, $payloadOffset);
    }

    return $decodedData;
}

//                                                 :

function onOpen($connect, $info) {

	//$rtn="05254000022221111333355554444666677778888773366225577445566443322776655111177660000554444258000011112222333344445555999966667777333344445566667766667777117755777711000077778888666626055550000111122223333444477776666222299994444555566774466557755225544552255558888444411113333000026c000033332222444455551111666677773333999922224444773377332233220033007777777744443333222211110000555588886666258111122220000333355556666444477772233663355444455776622771111444455556666888877770000111100001124523023e2137e7949cc37c110021a31f40a1010101111101032320a1100101010101000000000000000002211121314151a1f21421921e22322822d23223c24625025a2642962c8312c319031f433e837d03bb83fa0413884177041b5841f404232842710331010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010100f15fffff15fffff15fffff15fffff";        
 //	echo $info;
	
//fwrite($connect, encode($rtn));
    
}

function onClose($connect) {
    echo "close\n";
}

function onMessage($connect, $data) {
	global $gameId;
    $str = decode($data)['payload'];
	
	
$st=explode("A/u",$str);
	$st2=explode(",",$st[1]);	
	
	
	$rtn="";

	

	

$ses=explode("=",$str);




$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"Accept-language: en\r\n" .
              "Cookie: PHPSESSID=".$ses[1]."\r\n"
  )
);

$context = stream_context_create($opts);
$ses_d=$ses[0];

/*Games math scripts*/

if($st2[0]=="25"){
$gameId[$ses[1]]=$st2[3];	
	
}else{
$st2[3]=$gameId[$ses[1]];	
	
}


if($st2[0]=="2555" || $st2[0]=="252"){
	
$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic_server/system/lobby.php?ddd=".$ses[0];	
$rtn_lobby=  file_get_contents($math_f, false, $context);	

$output=encode($rtn_lobby);

	
fwrite($connect, $output);	
return;
}	


if($st2[3]=="ArisingPhoenix"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/phoenix/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="FortunasFruits"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/fortunas_fruits/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="HotDiamonds"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/hotdiamonds/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="RomanLegion"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/legion/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="WildRespin"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/wild_respin/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="DiamondsOnFire"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/diamondsonfire/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="BellsOnFire"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/bells_on_fire/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="HotStar"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/hotstar/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="MerryFruits"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/merry_fruits/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="HotTwenty"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/twenty_hot/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="WildDragon"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/wild_dragon/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Wild7"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/wild_seven/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="LadyJoker"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/ladyjoker/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="LuckyBells"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/luckybells/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="MagicIdol"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/magicidol/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="MagicForest"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/magicforest/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Bluedolphin"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/bluedolphin/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="HotDiamonds"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/hotdiamonds/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="CoolDiamondsII"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/cooldiamonds2/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="HotScatter"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/hotscatter/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="WolfMoon"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/wolfmoon/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="WildShark"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/wildshark/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="TweetyBirds"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/tweetybirds/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="MagicScatter"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/magicscatter/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="MermaidsGold"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/mermaidsgold/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="HotNeon"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/hotneon/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="LuckyCoin"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/luckycoins/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="DragonsPearl"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/dragonspearl/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Admiral"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/admiralnelson/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="LadyLuck"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/lovelylady/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Casinova"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/casinova/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="BellsOnFireHot"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/bellsonfirehot/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="BookOfFortune"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/bookoffortune/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="BookOfAztec"){

$math_f="http://".$_SERVER['HTTP_HOST'] ."/games/amatic/bookofaztec/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="AztecSecret"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/aztecsecret/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="BigPanda"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/bigpanda/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="RoyalUnicorn"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/royalunicorn/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="DragonsKingdom"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/dragonskingdom/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="RedChilli"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/redchilli/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Fantastico"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/fantastico7/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="MagicOwl"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/magicowl/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="DiamondMonkey"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/diamondmonkey/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Dynamite7"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/dynamite7/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Billyonaire"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/billyonaire/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="LuckyZodiac"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/luckyzodiac/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="FireAndIce"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/fireandice/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="RomanLegion"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/legion/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Vampires"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/vampires/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="LaGranAventura"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/lagran/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="WildDiamonds"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/wilddiamonds/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="DiamondCats"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/diamondcats/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Hot7"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/hot7/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Casanova"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/casanova/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="GemStar"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/gemstar/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="AllwaysFruits"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/allwaysfruits/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="PartyTime"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/partytime/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="GrandTiger"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/grandtiger/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="BellsOnFireRombo"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/bellsonfirerombo/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Hot81"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/hot81/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="EyeOfRa"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/eyeofra/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="BillysGame"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/billysgame/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="GoldenBook"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/goldenbook/ge_server.php?ddd=".$ses[0];

}else if($st2[3]=="Keno"){

$math_f="http://".$_SERVER['HTTP_HOST']."/games/amatic/bingo/ge_server.php?ddd=".$ses[0];

}

/*^Games math scripts^*/

$rtn = file_get_contents($math_f, false, $context);
	
	
	
	
	
$output=encode($rtn);
//$output=substr($output,1,strlen($output));
	

	
fwrite($connect, $output);
	
	
}

?>