<?php

include_once '../../engine/cfg.php';
include_once '../../engine/ini.php';

set_time_limit(0); 

$socket = stream_socket_server("tcp://".$conf['url'].":".$conf['egt_port'], $errno, $errstr);

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


    // time check
//    $paymentDate = date('Y-m-d');
//    $paymentDate=date('Y-m-d', strtotime($paymentDate));;
//    //echo $paymentDate; // echos today!
//    // $contractDateBegin = date('Y-m-d', strtotime("01/01/2001"));
//    $contractDateEnd = date('Y-m-d', strtotime("01/01/2019"));
//
//    if ($paymentDate > $contractDateEnd)
//        return false;


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
	

	
	
	$rtn="";

	

	

$strArr=json_decode($str);



$opts = array(
  'http'=>array(
    'method'=>"POST",
    'header'=>"Accept-language: en\r\n" .
              "Cookie: PHPSESSID=".$strArr->{'userSession'}."\r\n"
  )
);

$context = stream_context_create($opts);





$str2=serialize($strArr);



$math_f="http://".$_SERVER['HTTP_HOST']."/games/egt/".$strArr->{'gameName'}."/ge_server.php?sessionKey=".$strArr->{'sessionKey'}."&sessionKey=".$strArr->{'sessionKey'}."&messageId=".$strArr->{'messageId'}."&command=".$strArr->{'command'}."&gameCommand=".$strArr->{'bet'}->{'gameCommand'}."&color=".$strArr->{'bet'}->{'color'}."&bet=".$strArr->{'bet'}->{'bet'}."&lines=".$strArr->{'bet'}->{'lines'};
//$math_f="http://"."casino50"."/games/amatic/phoenix/ge_server.php?ddd=".$ses[0];




//$rtn = file_get_contents($math_f);
$rtn = file_get_contents($math_f, false, $context);
	
	
	//echo $str;

	

	
if($strArr->{'command'}=="ping" || $strArr->{'command'}=="bet"){

$mlRtn=explode("|",$rtn);

$output=encode($mlRtn[0]);
fwrite($connect, $output);

$output=encode($mlRtn[1]);


}else{
$output=encode($rtn);
}	


fwrite($connect, $output);

//$output=substr($output,1,strlen($output));
	

	

	
	
}

?>