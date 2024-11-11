   <?php

error_reporting(0);

include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';


$str=$_GET['ddd']; if($conf['float_bet']==1){$conf['fmp']=100;	}else{$conf['fmp']=1;}

$action="spin";



	function GetReels(){
	global $room,$conf, $conf,$userId,$user_id,$demomode;
	

$betsArr=explode(",",$conf['bets']);
$betString="";

for($b=0; $b<count($betsArr); $b++){
	$betsArr[$b]=$betsArr[$b]*$conf['fmp'];
$betString.=strlen(dechex($betsArr[$b])).dechex($betsArr[$b]);	
}
$betsArr[count($betsArr)-1]=$betsArr[count($betsArr)-1]*50;
$minBets.=strlen(dechex($betsArr[0]*1)).dechex($betsArr[0]*1);	
$maxBets.=strlen(dechex($betsArr[count($betsArr)-1])).dechex($betsArr[count($betsArr)-1]);	

$betsLength=count($betsArr);
$betsLength=dechex($betsLength);			
		
if(strlen($betsLength)<=1){
$betsLength="0".$betsLength;
}	
	
$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE room_id='$room' AND  g_name='bigpanda'"));
$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
		
	$rtn="052291753724067485694526784516734576456847546522d26714350746375279456456745671364256347147256522f7358643751726049612734612534567456745712534871623c542706371435249261435671234567567456172435637152435760476273233734172483670526954156012345167845071627342586273143521617853724063756946821452146207143507146352794021973586437017826049524164582174257063761435249263567521a73415248734670652698514538000101010101010427101000".$minBets.$maxBets."a101010101010100a0a01110010101010100000000000000000".$betsLength.$betString."0b1010101010101010101010#00101010&";
	////////////////////////////////////////  

$hisWin="10";
$hisState="4"; //b-additional anim bonus / 3-win-take-or-gamble	/5-normal bonus next/ 7 -gamble / 4- normal
//&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bigpanda_freeGames2']."&".$_SESSION['bigpanda_freeGames']."&".$_SESSION['bigpanda_freeGamesBank']
$hisTmp=explode("&st=",$res2['str']);
$hisTmp2=explode("&",$hisTmp[1]);
$onlyWin=$hisTmp2[1];
$hisTmp2[1]=$hisTmp2[1]*$conf['fmp'];

$rtnReels="";
	
	for($i=1; $i<=5; $i++){
	

$rndR=rand(0,50);
$rHex=dechex($rndR);	
$rtnReels.=strlen($rHex).$rHex;		
	}
	
	$hisReel=$rtnReels;
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)); 
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	////////////////////////////////login
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	
	$hisBalance=$rtnBalance;
$f1="10";
$f2="10";

/*not demo*/

if(!$demomode){

if($hisTmp2[0]=="collect"){
$hisReel=$hisTmp2[2];	

}
	
if($hisTmp2[0]=="spin"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
}
	
if($hisTmp2[0]=="gamble"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$hisState="3";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}



/*------------FREE-GAME------------*/	

if($hisTmp2[0]=="freegame_start"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['bigpanda_freeGames2']=$hisTmp2[4];
$_SESSION['bigpanda_freeGames']=$hisTmp2[5];
$_SESSION['bigpanda_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;
$_SESSION['bigpanda_freeGamesSym']=$hisTmp2[8];

$freeRH=dechex($_SESSION['bigpanda_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bigpanda_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="5";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bigpanda_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['bigpanda_freeGames2']=$hisTmp2[4];
$_SESSION['bigpanda_freeGames']=$hisTmp2[5];
$_SESSION['bigpanda_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;
$_SESSION['bigpanda_freeGamesSym']=$hisTmp2[8];
$freeRH=dechex($_SESSION['bigpanda_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bigpanda_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="b";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bigpanda_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame_end"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['bigpanda_freeGames2']=$hisTmp2[4];
$_SESSION['bigpanda_freeGames']=$hisTmp2[5];
$_SESSION['bigpanda_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;
$_SESSION['bigpanda_freeSym']=$hisTmp2[8];

$freeRH=dechex($_SESSION['bigpanda_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bigpanda_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="c";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bigpanda_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

}/////demo	

        //$rtn="0522d40000111922233384444666697777888836555566444623a444471111800002222733331555566665777718885553337234567456722d11100028943335555677778666684444696888822224823a666610000444478888511117555513333577773333222257716788556722d4777735555166667888849333354444522290007111185222139062456781293840567456781579830222001728345680123745684756012301234222215349065786512973568401823749867022218234567801234567845267850673120342211234056978123459067318402758612300".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."32".$f2.$f1."101010101032320a1100".$hisReel."0000000000000000".$betsLength.$betString."331010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010321010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010#00101010".$_SESSION['bigpanda_freeSym'];
        // $rtn="0522d40000111922233384444666697777888836555566444623a444471111800002222733331555566665777718885553337234567456722d11100028943335555677778666684444696888822224823a666610000444478888511117555513333577773333222257716788556722d4777735555166667888849333354444522290007111185222139062456781293840567456781579830222001728345680123745684756012301234222215349065786512973568401823749867022218234567801234567845267850673120342211234056978123459067318402758612300".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."32".$f2.$f1."101010101032320a1100".$hisReel."0000000000000000".$betsLength.$betString."331010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010321010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010#00101010".$_SESSION['bigpanda_freeSym'];

          $rtn="05256000065111168222275333385444476488865555637578134678757682575875876666577776888899996562430873218723684123456789876543212764795865512345678987654321236551867252045678987654321234567898765448677617325423512345678987654321234567898651689587835324c0464567898765432123456789876543278379578123456789876543212345678987656212836239012345678987654321234567898765432123456785677586592867834522917aaaa2483aaaa506aaaaa8567aaaa578678aaaaa23e448007aaaaa2263aaaaa35711aaaaa775568aaaaa686aaaaaaa567588aaaaa236aaaa665772aaaaaa885781aaaaa85021aaaaaaa6567304aaaaaa3424300611824aaaaa253374aaaa775aaaa8688655aaaaa6776aaaaa588aaaaa657aaaaa2410011223344aaaaaa55577766688865aaaaaaa7857680723451668875aaaaaaaaa0".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."32".$f2.$f1."101010101032320a1100".$hisReel."0000000000000000".$betsLength.$betString."3310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101015000001500000".$_SESSION['bigpanda_freeGamesSym'];
       // $rtn="05256000065111168222275333385444476488865555637578134678757682575875876666577776888899996562430873218723684aaaaaaaaaaaaaaaaaa7647958655aaaaaaaaaaaaaaaaaaa655186725204aaaaaaaaaaaaaaaaaaaaaaaaaa4867761732542aaaaaaaaaaaaaaaaaaaaaaaaaaaa651689587835324c04645aaaaaaaaaaaaaaaaaaaaaaaaaaa783795781aaaaaaaaaaaaaaaaaaaaaaaaaaa5621283623901234aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa5677586592867834522917aaaa2483aaaa506aaaaa8567aaaa578678aaaaa23e448007aaaaa2263aaaaa35711aaaaa775568aaaaa686aaaaaaa567588aaaaa236aaaa665772aaaaaa885781aaaaa85021aaaaaaa6567304aaaaaa3424300611824aaaaa253374aaaa775aaaa8688655aaaaa6776aaaaa588aaaaa657aaaaa2410011223344aaaaaa55577766688865aaaaaaa7857680723451668875aaaaaaaaa0".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."32".$f2.$f1."101010101032320a1100".$hisReel."0000000000000000".$betsLength.$betString."3310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101015000001500000";
    return $rtn;
		
		
	}

	
	/*------------------------------------------------------------*/
	/*-----------------------  INIT ----------------------------*/
	/*----------------------------------------------------------- */
	
	function InitGame(){
	global $room,$conf, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	////////////////////////////////login
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	

	$rtnReels="";
	
	for($i=1; $i<=5; $i++){
	

$rndR=rand(1,20);
$rHex=dechex($rndR);	
$rtnReels.=strlen($rHex).$rHex;		
	}
	
	
	$_SESSION['dcard_bigpanda']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5);
	
	
	$rtn="100010".$rtnBalance."10".$rtnReels."0032101010101010101010101033101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010"."12090d2d181f301b"."15000001500000#";
	 set_stat_game($userId, $user_balance, 0,0,"state_bigpanda");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_bigpanda'])){
$_SESSION['dcard_bigpanda']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5);
		
}
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.10);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'bigpanda',$allbet,"spin");
	
	////////////////////////////////
	
	
	
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	
	$hexLogin=dechex(11111111);
	$loginId=strlen($hexLogin).$hexLogin;
	////////////////////////////////login
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance


	$rtnReels="";
	

	//////////////////////////////////////////////////calc win
  /*paytab*/
        $psym=array();
	 
		  
		
    /*lines*/
	
 $lin=array();

$lin[0]=array(1,5,9,13,17);
$lin[1]=array(2,6,10,14,18);
$lin[2]=array(0,4,8,12,16);
$lin[3]=array(3,7,11,15,19);
$lin[4]=array(1,4,8,12,17);
$lin[5]=array(2,7,11,15,18);
$lin[6]=array(2,5,10,13,18);
$lin[7]=array(1,6,9,14,17);
$lin[8]=array(0,5,8,13,16);
$lin[9]=array(3,6,11,14,19);
$lin[10]=array(0,4,9,12,16);
$lin[11]=array(3,7,10,15,19);
$lin[12]=array(0,4,10,12,16);
$lin[13]=array(3,7,9,15,19);
$lin[14]=array(0,4,11,12,16);
$lin[15]=array(3,7,8,15,19);
$lin[16]=array(1,5,10,13,17);
$lin[17]=array(2,6,9,14,18);
$lin[18]=array(0,7,8,15,16);
$lin[19]=array(3,4,11,12,19);
$lin[20]=array(1,4,9,12,17);
$lin[21]=array(2,7,10,15,18);
$lin[22]=array(1,6,11,14,17);
$lin[23]=array(2,5,8,13,18);
$lin[24]=array(1,4,9,14,19);
$lin[25]=array(0,5,10,15,18);
$lin[26]=array(1,5,9,12,17);
$lin[27]=array(1,5,9,14,17);
$lin[28]=array(2,6,10,15,18);
$lin[29]=array(2,6,10,13,18);
$lin[30]=array(1,5,8,12,16);
$lin[31]=array(1,5,10,14,18);
$lin[32]=array(2,6,9,13,17);
$lin[33]=array(2,6,11,15,19);
$lin[34]=array(1,6,10,14,17);
$lin[35]=array(2,5,9,13,18);
$lin[36]=array(1,5,8,13,17);
$lin[37]=array(2,6,11,14,18);
$lin[38]=array(0,5,10,15,19);
$lin[39]=array(3,6,9,12,16);
$lin[40]=array(0,4,9,13,17);
$lin[41]=array(3,7,10,14,18);
$lin[42]=array(0,4,8,13,16);
$lin[43]=array(3,7,11,14,19);
$lin[44]=array(0,4,9,14,19);
$lin[45]=array(3,7,10,13,16);
$lin[46]=array(1,5,11,13,17);
$lin[47]=array(2,6,8,14,18);
$lin[48]=array(0,5,9,13,16);
$lin[49]=array(3,6,10,14,19);

$psym[0]=array(0,0,0,20,100,500);
$psym[1]=array(0,0,0,15,75,300);
$psym[2]=array(0,0,0,15,75,300);
$psym[3]=array(0,0,0,10,50,200);
$psym[4]=array(0,0,0,10,50,200);
$psym[5]=array(0,0,0,2,10,40);
$psym[6]=array(0,0,0,2,10,40);
$psym[7]=array(0,0,0,1,5,20);
$psym[8]=array(0,0,0,1,5,20);
$psym[9]=array(0,0,0,0,0,0);  // bonus
	//////////////////////////////////////////////////loop

	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//05256
//00006511116822227533338544447648886555563757813467875768257587587666657777688889999656
//24308732187236841234567898765432127647958655 12345678987654321236551867
//25204567898765432123456789876544867761732542 35123456789876543212345678986516895878353
//24c04645 67898765432123456789876543278379578 123456789876543212345678987656212836
//239012345678987654321234567898765432123456785677586592867834
//522917aaaa2483aaaa506aaaaa8567aaaa578678aaaaa23e448007aaaaa2263aaaaa35711aaaaa775568aaaaa686aaaaaaa567588aaaaa236aaaa665772aaaaaa885781aaaaa85021aaaaaaa6567304aaaaaa3424300611824aaaaa253374aaaa775aaaa8688655aaaaa6776aaaaa588aaaaa657aaaaa2410011223344aaaaaa55577766688865aaaaaaa7857680723451668875aaaaaaaaa0

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(0, 0, 0, 0, 6, 5, 1, 1, 1, 1, 6, 8, 2, 2, 2, 2, 7, 5, 3, 3, 3, 3, 8, 5, 4, 4, 4, 4, 7, 6, 4, 8, 8, 8, 6, 5, 5, 5, 5, 6, 3, 7, 5, 7, 8, 1, 3, 4, 6, 7, 8, 7, 5, 7, 6, 8, 2, 5, 7, 5, 8, 7, 5, 8, 7, 6, 6, 6, 6, 5, 7, 7, 7, 7, 6, 8, 8, 8, 8, 9, 9, 9, 9, 6, 5, 6);
$r[1]=array(0, 8, 7, 3, 2, 1, 8, 7, 2, 3, 6, 8, 4, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 7, 6, 4, 7, 9, 5, 8, 6, 5, 5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 6, 5, 5, 1, 8, 6, 7);
$r[2]=array(0, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 4, 8, 6, 7, 7, 6, 1, 7, 3, 2, 5, 4, 2, 3, 5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 6, 5, 1, 6, 8, 9, 5, 8, 7, 8, 3, 5, 3);
$r[3]=array(0, 4, 6, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 7, 8, 3, 7, 9, 5, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 6, 2, 1, 2, 8, 3, 6);
$r[4]=array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5 , 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 5, 6, 7, 7, 5, 8, 6, 5, 9, 2, 8, 6, 7, 8, 3, 4);

        $bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=110;
	
	
	$isWin=false;
	$isBonus=false;
	/////////////////////////////////////game_setting
		
		$gset=spin("spin",$gBet,$lines);
		if($gset['type']=="bon"){
	    $isBonus=true;
		}
		if($gset['type']=="win"){
		$isWin=true;
		} 
		$casbank = $gset['sum']; 
		////////////////////////////////////game_setting
	
	
	$isCalc=true;
	
	if($casbank <$gBet*5){ $isWin=false;
		
		
	}
	
	$loopCnt=0;
	
	while($isCalc){
	
	$loopCnt++;
	
	///////////////////////////////////reels position
$rp[0]=mt_rand(1,count($r[0])-3);

$rp[1]=mt_rand(1,count($r[1])-3);
$rp[2]=mt_rand(1,count($r[2])-3);
$rp[3]=mt_rand(1,count($r[3])-3);
$rp[4]=mt_rand(1,count($r[4])-3);

/*
if($isBonus){
$rp[0]=$bonusR1Pos[rand(0,7)];	
$rp[2]=rand(30,40);	
$rp[3]=rand(30,40);	
	
}*/

//create symbols map
$map=array();
	
for($i=0; $i<=4; $i++){

array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	
array_push($map,$r[$i][$rp[$i]+2]);	
	


	
}
	
$wildsCnt=0;


/*

for($i=0;$i<count($map);$i++){

if($map[$i]==$wild){
$wildsCnt++;	
}
	
}	
	
	
if($map[0]==$map[1] && $map[1]==$map[2] && $map[2]==$map[3] && $map[0]!=$wild && $wildsCnt>0){
	
$isBonus=true;	
$_SESSION['rsym_bigpanda']=$map[0];
	
}	
*/	
	
	$wins=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	for ( $ln = 0; $ln < $lines; ++$ln )
	        {
	         $s1 = $map[$lin[$ln][0]];
	            $s2 = $map[$lin[$ln][1]];
	            $s3 = $map[$lin[$ln][2]];
	            $s4 = $map[$lin[$ln][3]];
	            $s5 = $map[$lin[$ln][4]];
				$gg = 1;


			
				
////////////////////////////////////

 if ($s1 == $wild && $s2 !=9 && $s2!=12)
				{
					$s1 = $s2;
					
				}
				if ($s2 == $wild && $s1 !=9 && $s1!=12)
				{
					$s2 = $s1;
					
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=9)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=9)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=9)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=9)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=9)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=9)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=9)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=9)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=9)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=9)
	            {
	                $s4 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=9)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=9)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=9)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=9)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=9)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=9)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=9)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=9)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=9)
				{
					$s5 = $s2;
					
				}
				
				



/////////////////////////////////////

			

if(($s1==$s2 ) && ($s2==$s3)   && $s1 !=9){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 )  && $s1 !=9){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 )  && $s1 !=9){



$wins[$ln]=$psym[$s5][5];	
	
}


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<50; $i++){

if($wins[$i]>0 ){
$winall+=($wins[$i]*$gBet);
$winall_r+=$wins[$i];
$whex=dechex($wins[$i]);	
$winstr.=strlen($whex).$whex;
}else{
$winstr.="10";	
}	
	
}	

$scatter_win=0;

for($i=0; $i<=19;$i++){
	
if($map[$i]==9){
$scatter_win++;	
}
	
}		
if($scatter_win>=5){	

$winstr.="10";		
}else{
$winstr.="10";		
}	
	
	if($isWin && $winall>0){
	$isCalc=false;	
		
	}
	if(!$isWin && $winall<=0){
	$isCalc=false;	
		
	}
	
	if($isBonus && $scatter_win<5){
	$isCalc=true;		
	}
	
	if(!$isBonus && $scatter_win>=5){
	$isCalc=true;		
	}
	
	if($isBonus && $scatter_win>=5){
	$isCalc=false;		
	}
	
	if($winall>$casbank){
	$isCalc=true;		
	}
	
	
	if($winall>$casbank){ 
$isCalc=true;	
	} 
 if($loopCnt>1200 && !$isCalc && ($isWin || $isBonus)){	
	$isWin=false;	
	$isBonus=false;	
	$isCalc=true;		
	}
	
	}
	$hisState="spin";	
if($winall>0){
	
 cange_balance($userId, $winall);
 if($isBonus){
 change_bank($user_id,'bigpanda',$winall*-1,"bonus");	
 }else{
 change_bank($user_id,'bigpanda',$winall*-1,"spin");	
 }
	
	
$hisState="gamble";	
}	
	
	$hisWin=$winall;
	
	
	
	//////////////////////////////////////////////////
	
	for($i=0; $i<5; $i++){
	
//$rndR=rand(0,55);
$rndR=$rp[$i];
$rHex=dechex($rndR);	
$rtnReels.=strlen($rHex).$rHex;		
	}
	
	$ln_h=dechex($lines);
	if(strlen($ln_h)<=1){
	$ln_h="0".$ln_h;	
	}
	
	$bet_h=dechex($bet);
	if(strlen($bet_h)<=1){
	$bet_h="0".$bet_h;	
	}
	$_SESSION['bigpanda_freeGamesWin']=$winall;
	
	$str_winall=str_replace(".","",($winall*$conf['fmp'])."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
		
	
	
	$gameState="03";
    $respinMap="";	

	
	$gameState="03";
	          //"101010101010101010101029"
    $freeInfo="101010101010101010101033";
	if($isBonus && $scatter_win>=5){
	
	$_SESSION['bigpanda_freeGames']=$scatter_win;
	$_SESSION['bigpanda_freeGames2']=$scatter_win;
	
	$_SESSION['bigpanda_freeGamesBank']=$gset['sum'];
	$hisState="freegame_start";
$gameState="10";	
	 $freeInfo="1".dechex($scatter_win)."1".dechex($scatter_win)."10111010101010101033";	
	}
	
	/*-------------------------------*/
	$_SESSION['bigpanda_freeGamesSym']=rand(0,4);
	$frgs=$_SESSION['bigpanda_freeGamesSym'];
$frgs=dechex($frgs);
	$rtn="1".$gameState."0"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr."12090d2d181f301b"."15000001500000".""."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bigpanda_freeGames2']."&".$_SESSION['bigpanda_freeGames']."&".$_SESSION['bigpanda_freeGamesBank']."&".$rtnBalance."&".$_SESSION['bigpanda_freeGamesSym'];
	$_SESSION['bigpanda_freeGames_start']="1050"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr."12090d2d181f301b"."15".$frgs.$frgs.$frgs.$frgs.$frgs."15".$frgs.$frgs.$frgs.$frgs.$frgs.""."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bigpanda_freeGames2']."&".$_SESSION['bigpanda_freeGames']."&".$_SESSION['bigpanda_freeGamesBank']."&".$rtnBalance."&".$_SESSION['bigpanda_freeGamesSym'];
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101033".$winstr."";
	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	$hisState="collect";
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101033".$winstr."12090d2d181f301b"."15000001500000"."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bigpanda_freeGames2']."&".$_SESSION['bigpanda_freeGames']."&".$_SESSION['bigpanda_freeGamesBank']."&".$rtnBalance."&".$_SESSION['bigpanda_freeGamesSym'];
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_bigpanda");
	ge_serv_show_str($rtn);		
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_bigpanda'])){
$_SESSION['dcard_bigpanda']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.10);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	
	
	////////////////////////////////
	
	
	
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	
	$hexLogin=dechex(11111111);
	$loginId=strlen($hexLogin).$hexLogin;
	////////////////////////////////login
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance


	$rtnReels="";
	

	//////////////////////////////////////////////////calc win
  /*paytab*/
        $psym=array();
	  
		  
		
    /*lines*/
	
 $lin=array();
 
$lin[0]=array(1,5,9,13,17);
$lin[1]=array(2,6,10,14,18);
$lin[2]=array(0,4,8,12,16);
$lin[3]=array(3,7,11,15,19);
$lin[4]=array(1,4,8,12,17);
$lin[5]=array(2,7,11,15,18);
$lin[6]=array(2,5,10,13,18);
$lin[7]=array(1,6,9,14,17);
$lin[8]=array(0,5,8,13,16);
$lin[9]=array(3,6,11,14,19);
$lin[10]=array(0,4,9,12,16);
$lin[11]=array(3,7,10,15,19);
$lin[12]=array(0,4,10,12,16);
$lin[13]=array(3,7,9,15,19);
$lin[14]=array(0,4,11,12,16);
$lin[15]=array(3,7,8,15,19);
$lin[16]=array(1,5,10,13,17);
$lin[17]=array(2,6,9,14,18);
$lin[18]=array(0,7,8,15,16);
$lin[19]=array(3,4,11,12,19);
$lin[20]=array(1,4,9,12,17);
$lin[21]=array(2,7,10,15,18);
$lin[22]=array(1,6,11,14,17);
$lin[23]=array(2,5,8,13,18);
$lin[24]=array(1,4,9,14,19);
$lin[25]=array(0,5,10,15,18);
$lin[26]=array(1,5,9,12,17);
$lin[27]=array(1,5,9,14,17);
$lin[28]=array(2,6,10,15,18);
$lin[29]=array(2,6,10,13,18);
$lin[30]=array(1,5,8,12,16);
$lin[31]=array(1,5,10,14,18);
$lin[32]=array(2,6,9,13,17);
$lin[33]=array(2,6,11,15,19);
$lin[34]=array(1,6,10,14,17);
$lin[35]=array(2,5,9,13,18);
$lin[36]=array(1,5,8,13,17);
$lin[37]=array(2,6,11,14,18);
$lin[38]=array(0,5,10,15,19);
$lin[39]=array(3,6,9,12,16);
$lin[40]=array(0,4,9,13,17);
$lin[41]=array(3,7,10,14,18);
$lin[42]=array(0,4,8,13,16);
$lin[43]=array(3,7,11,14,19);
$lin[44]=array(0,4,9,14,19);
$lin[45]=array(3,7,10,13,16);
$lin[46]=array(1,5,11,13,17);
$lin[47]=array(2,6,8,14,18);
$lin[48]=array(0,5,9,13,16);
$lin[49]=array(3,6,10,14,19);

$psym[0]=array(0,0,0,20,100,500);
$psym[1]=array(0,0,0,15,75,300);
$psym[2]=array(0,0,0,15,75,300);
$psym[3]=array(0,0,0,10,50,200);
$psym[4]=array(0,0,0,10,50,200);
$psym[5]=array(0,0,0,2,10,40);
$psym[6]=array(0,0,0,2,10,40);
$psym[7]=array(0,0,0,1,5,20);
$psym[8]=array(0,0,0,1,5,20);
$psym[9]=array(0,0,0,0,0,0);	

	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();
	$frgs=$_SESSION['bigpanda_freeGamesSym'];
//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
if($frgs==0){


$r[0]=array(1, 7, 0, 0, 0, 0, 2, 4, 8, 3, 0, 0, 0, 0, 5, 0, 6, 0, 0, 0, 0, 0, 8, 5, 6, 7, 0, 0, 0, 0, 5, 7, 8, 6, 7, 8, 0, 0, 0, 0, 0);
$r[1]=array(4, 4, 8, 0, 0, 7, 0, 0, 0, 0, 0, 2, 2, 6, 3, 0, 0, 0, 0, 0, 3, 5, 7, 1, 1, 0, 0, 0, 0, 0, 7, 7, 5, 5, 6, 8, 0, 0, 0, 0, 0, 6, 8, 6, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 5, 8, 8, 0, 0, 0, 0, 0);
$r[2]=array(0, 0, 0, 0, 6, 6, 5, 7, 7, 2, 0, 0, 0, 0, 0, 0, 8, 8, 5, 7, 8, 1, 0, 0, 0, 0, 0, 8, 5, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 6, 5, 6, 7, 3, 0, 4, 0, 0, 0, 0, 0, 0, 3, 4);
$r[3]=array(0, 0, 6, 1, 1, 8, 2, 4, 0, 0, 0, 0, 0, 2, 5, 3, 3, 7, 4, 0, 0, 0, 0, 7, 7, 5, 0, 0, 0, 0, 8, 6, 8, 8, 6, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 6, 0, 0, 0, 0, 0, 5, 8, 8, 0, 0, 0, 0, 0, 6, 5, 7, 0, 0, 0, 0, 0);
$r[4]=array(0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 5, 5, 5, 7, 7, 7, 6, 6, 6, 8, 8, 8, 6, 5, 0, 0, 0, 0, 0, 0, 0, 7, 8, 5, 7, 6, 8, 0, 7, 2, 3, 4, 5, 1, 6, 6, 8, 8, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0);


//
//    $r[0]=array(1, 3, 0, 0, 0, 0, 4, 5, 6, 7, 0, 0, 0, 0, 3, 8, 4, 0, 0, 0, 0, 0, 5, 6, 7, 8, 0, 0, 0, 0, 8, 3, 0, 2);
//    $r[1]=array(0, 1, 7, 2, 8, 3, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 8, 4, 7, 5, 0, 0, 0, 0, 3, 0, 1, 2, 3, 4);
//    $r[2]=array(0, 0, 0, 0, 4, 9, 0, 6, 0, 0, 0, 0, 5, 1, 2, 9,0, 0, 0, 0, 8, 4, 0, 1, 0, 0, 0, 0, 4, 9, 8, 6, 7, 0);
//    $r[3]=array(1, 8, 2, 0, 0, 0, 0, 7, 8, 0, 1, 0, 0, 0, 0, 6, 7, 8, 4, 0, 0, 0, 0, 8, 5, 0, 6,0, 0, 0, 0, 0, 3, 4);
//    $r[4]=array(1, 2, 3, 4, 0, 0, 0, 0, 7, 8, 1, 2, 0, 0, 0, 0, 0, 6, 7, 3, 0, 0, 0, 0, 2, 7, 5, 8, 0, 0, 0, 0, 0);



}else if($frgs==1){

$r[0]=array(1, 7, 1, 1, 1, 1, 2, 4, 8, 3, 1, 1, 1, 1, 5, 0, 6, 1, 1, 1, 1, 1, 8, 5, 6, 7, 1, 1, 1, 1, 5, 7, 8, 6, 7, 8, 1, 1, 1, 1, 1);
$r[1]=array(4, 4, 8, 1, 1, 7, 1, 1, 1, 1, 1, 2, 2, 6, 3, 1, 1, 1, 1, 1, 3, 5, 7, 1, 1, 1, 1, 1, 1, 1, 7, 7, 5, 5, 6, 8, 1, 1, 1, 1, 1, 6, 8, 6, 1, 1, 1, 1, 1, 1, 1, 5, 6, 7, 5, 8, 8, 1, 1, 1, 1, 1);
$r[2]=array(1, 1, 1, 1, 6, 6, 5, 7, 7, 2, 1, 1, 1, 1, 1, 1, 8, 8, 5, 7, 8, 1, 1, 1, 1, 1, 1, 8, 5, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 6, 5, 6, 7, 3, 1, 4, 1, 1, 1, 1, 1, 1, 3, 4);
$r[3]=array(1, 1, 6, 1, 1, 8, 2, 4, 1, 1, 1, 1, 1, 2, 5, 3, 3, 7, 4, 1, 1, 1, 1, 7, 7, 5, 1, 1, 1, 1, 8, 6, 8, 8, 6, 5, 5, 1, 1, 1, 1, 1, 6, 7, 7, 6, 1, 1, 1, 1, 1, 5, 8, 8, 1, 1, 1, 1, 1, 6, 5, 7, 1, 1, 1, 1, 1);
$r[4]=array(1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 1, 1, 1, 1, 1, 1, 5, 5, 5, 7, 7, 7, 6, 6, 6, 8, 8, 8, 6, 5, 1, 1, 1, 1, 1, 1, 1, 7, 8, 5, 7, 6, 8, 1, 7, 2, 3, 4, 5, 1, 6, 6, 8, 8, 7, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1);

//    $r[0]=array(1, 3, 1, 1, 1, 1, 4, 5, 6, 7, 1, 1, 1, 1, 3, 8, 4, 1, 1, 1, 1, 0, 5, 6, 7, 8, 1, 1, 1, 1, 8, 3, 0, 2);
//    $r[1]=array(0, 1, 7, 2, 8, 3, 1, 1, 1, 1, 0, 1, 2, 3, 1, 1, 1, 1, 8, 4, 7, 5, 1, 1, 1, 1, 3, 0, 1, 2, 3, 4);
//    $r[2]=array(1, 1, 1, 1, 4, 9, 0, 6, 1, 1, 1, 1, 5, 1, 2, 9,1, 1, 1, 1, 8, 4, 0, 1, 1, 1, 1, 0, 4, 9, 8, 6, 7, 0);
//    $r[3]=array(1, 8, 2, 1, 1, 1, 1, 7, 8, 0, 1, 1, 1, 1, 1, 6, 7, 8, 4, 1, 1, 1, 1, 8, 5, 0, 6,1, 1, 1, 1, 0, 3, 4);
//    $r[4]=array(1, 2, 3, 4, 1, 1, 1, 1, 7, 8, 1, 2, 1, 1, 1, 1, 0, 6, 7, 3, 1, 1, 1, 1, 2, 7, 5, 8, 1, 1, 1, 1, 0);
	
}else if($frgs==2){

$r[0]=array(1, 7, 2, 2, 2, 2, 2, 4, 8, 3, 2, 2, 2, 2, 5, 2, 6, 2, 2, 2, 2, 2, 8, 5, 6, 7, 2, 2, 2, 2, 5, 7, 8, 6, 7, 8, 2, 2, 2, 2, 2);
$r[1]=array(4, 4, 8, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 6, 3, 2, 2, 2, 2, 2, 3, 5, 7, 1, 1, 2, 2, 2, 2, 2, 7, 7, 5, 5, 6, 8, 2, 2, 2, 2, 2, 6, 8, 6, 2, 2, 2, 2, 2, 2, 2, 5, 6, 7, 5, 8, 8, 2, 2, 2, 2, 2);
$r[2]=array(2, 2, 2, 2, 6, 6, 5, 7, 7, 2, 2, 2, 2, 2, 2, 2, 8, 8, 5, 7, 8, 1, 2, 2, 2, 2, 2, 8, 5, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 6, 5, 6, 7, 3, 2, 4, 2, 2, 2, 2, 2, 2, 3, 4);
$r[3]=array(2, 2, 6, 1, 1, 8, 2, 4, 2, 2, 2, 2, 2, 2, 5, 3, 3, 7, 4, 2, 2, 2, 2, 7, 7, 5, 2, 2, 2, 2, 8, 6, 8, 8, 6, 5, 5, 2, 2, 2, 2, 2, 6, 7, 7, 6, 2, 2, 2, 2, 2, 5, 8, 8, 2, 2, 2, 2, 2, 6, 5, 7, 2, 2, 2, 2, 2);
$r[4]=array(2, 2, 1, 1, 2, 2, 3, 3, 4, 4, 2, 2, 2, 2, 2, 2, 5, 5, 5, 7, 7, 7, 6, 6, 6, 8, 8, 8, 6, 5, 2, 2, 2, 2, 2, 2, 2, 7, 8, 5, 7, 6, 8, 2, 7, 2, 3, 4, 5, 1, 6, 6, 8, 8, 7, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2);

//    $r[0]=array(1, 3, 2, 2, 2, 2, 4, 5, 6, 7, 2, 2, 2, 2, 3, 8, 4, 2, 2, 2, 2, 0, 5, 6, 7, 8,2, 2, 2, 2, 8, 3, 0, 2);
//    $r[1]=array(0, 1, 7, 2, 8, 3, 2, 2, 2, 2, 0, 1, 2, 3, 2, 2, 2, 2, 8, 4, 7, 5, 2, 2, 2, 2, 3, 0, 1, 2, 3, 4);
//    $r[2]=array(2, 2, 2, 2, 4, 9, 0, 6, 2, 2, 2, 2, 5, 1, 2, 9,2, 2, 2, 2, 8, 4, 0, 2, 2, 2, 2, 0, 4, 9, 8, 6, 7, 0);
//    $r[3]=array(1, 8, 2, 2, 2, 2, 2, 7, 8, 0, 2, 2, 2, 2, 6, 7, 8, 4, 2, 2, 2, 2, 8, 5, 0, 6,2, 2, 2, 2, 0, 3, 4);
//    $r[4]=array(1, 2, 3, 4, 2, 2, 2, 2, 7, 8, 1, 2, 2, 2, 2, 2, 0, 6, 7, 3, 2, 2, 2, 2, 2, 7, 5, 8, 2, 2, 2, 2, 0);


}else if($frgs==3){

$r[0]=array(1, 7, 3, 3, 3, 3, 2, 4, 8, 3, 3, 3, 3, 3, 5, 3, 6, 3, 3, 3, 3, 3, 8, 5, 6, 7, 3, 3, 3, 3, 5, 7, 8, 6, 7, 8, 3, 3, 3, 3, 3);
$r[1]=array(4, 4, 8, 3, 3, 7, 3, 3, 3, 3, 3, 2, 2, 6, 3, 3, 3, 3, 3, 3, 3, 5, 7, 1, 1, 3, 3, 3, 3, 3, 7, 7, 5, 5, 6, 8, 3, 3, 3, 3, 3, 6, 8, 6, 3, 3, 3, 3, 3, 3, 3, 5, 6, 7, 5, 8, 8, 3, 3, 3, 3, 3);
$r[2]=array(3, 3, 3, 3, 6, 6, 5, 7, 7, 2, 3, 3, 3, 3, 3, 3, 8, 8, 5, 7, 8, 1, 3, 3, 3, 3, 3, 8, 5, 3, 2, 1, 3, 3, 3, 3, 3, 3, 3, 6, 5, 6, 7, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4);
$r[3]=array(3, 3, 6, 1, 1, 8, 2, 4, 3, 3, 3, 3, 3, 2, 5, 3, 3, 7, 4, 3, 3, 3, 3, 7, 7, 5, 3, 3, 3, 3, 8, 6, 8, 8, 6, 5, 5, 3, 3, 3, 3, 3, 6, 7, 7, 6, 3, 3, 3, 3, 3, 5, 8, 8, 3, 3, 3, 3, 3, 6, 5, 7, 3, 3, 3, 3, 3);
$r[4]=array(3, 3, 1, 1, 2, 2, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 5, 5, 5, 7, 7, 7, 6, 6, 6, 8, 8, 8, 6, 5, 3, 3, 3, 3, 3, 3, 3, 7, 8, 5, 7, 6, 8, 3, 7, 2, 3, 4, 5, 1, 6, 6, 8, 8, 7, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3);


//    $r[0]=array(1, 3, 3, 3, 3, 3, 4, 5, 6, 7,3, 3, 3, 3, 3, 8, 4, 3, 3, 3, 3, 0, 5, 6, 7, 8,3, 3, 3, 3, 8, 3, 0, 2);
//    $r[1]=array(0, 1, 7, 2, 8, 3, 3, 3, 3, 3, 0, 1, 2, 3, 3, 3, 3, 3, 8, 4, 7, 5, 3, 3, 3, 3, 3, 0, 1, 2, 3, 4);
//    $r[2]=array(3, 3, 3, 3, 4, 9, 0, 6, 3, 3, 3, 3, 5, 1, 2, 9,3, 3, 3, 3, 8, 4, 0, 3, 3, 3, 3, 0, 4, 9, 8, 6, 7, 0);
//    $r[3]=array(1, 8, 2,3, 3, 3, 3, 7, 8, 0, 3, 3, 3, 3, 6, 7, 8, 4, 3, 3, 3, 3, 8, 5, 0, 6,3, 3, 3, 3, 0, 3, 4);
//    $r[4]=array(1, 2, 3, 4, 3, 3, 3, 3, 7, 8, 1, 3, 3, 3, 3, 2, 0, 6, 7, 3, 3, 3, 3, 3, 2, 7, 5, 8, 3, 3, 3, 3, 0);
//
}else if($frgs==4){

$r[0]=array(1, 7, 4, 4, 4, 4, 2, 4, 8, 3, 4, 4, 4, 4, 5, 4, 6, 4, 4, 4, 4, 4, 8, 5, 6, 7, 4, 4, 4, 4, 5, 7, 8, 6, 7, 8, 4, 4, 4, 4, 4);
$r[1]=array(4, 4, 8, 4, 4, 7, 4, 4, 4, 4, 4, 2, 2, 6, 3, 4, 4, 4, 4, 4, 3, 5, 7, 1, 1, 4, 4, 4, 4, 4, 7, 7, 5, 5, 6, 8, 4, 4, 4, 4, 4, 6, 8, 6, 4, 4, 4, 4, 4, 4, 4, 5, 6, 7, 5, 8, 8, 4, 4, 4, 4, 4);
$r[2]=array(4, 4, 4, 4, 6, 6, 5, 7, 7, 2, 4, 4, 4, 4, 4, 4, 8, 8, 5, 7, 8, 1, 4, 4, 4, 4, 4, 8, 5, 4, 2, 1, 4, 4, 4, 4, 4, 4, 4, 6, 5, 6, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4);
$r[3]=array(4, 4, 6, 1, 1, 8, 2, 4, 4, 4, 4, 4, 4, 2, 5, 3, 3, 7, 4, 4, 4, 4, 4, 7, 7, 5, 4, 4, 4, 4, 8, 6, 8, 8, 6, 5, 5, 4, 4, 4, 4, 4, 6, 7, 7, 6, 4, 4, 4, 4, 4, 5, 8, 8, 4, 4, 4, 4, 4, 6, 5, 7, 4, 4, 4, 4, 4);
$r[4]=array(4, 4, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 7, 7, 7, 6, 6, 6, 8, 8, 8, 6, 5, 4, 4, 4, 4, 4, 4, 4, 7, 8, 5, 7, 6, 8, 4, 7, 2, 3, 4, 5, 1, 6, 6, 8, 8, 7, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4);

//    $r[0]=array(1, 3, 4, 4, 4, 4, 4, 5, 6, 7,4, 4, 4, 4, 3, 8, 4, 4, 4, 4, 4, 0, 5, 6, 7, 8,4, 4, 4, 4, 8, 3, 0, 2);
//    $r[1]=array(0, 1, 7, 2, 8, 4, 4, 4, 4, 3, 0, 1, 2, 4, 4, 4, 4, 3, 8, 4, 7, 5, 4, 4, 4, 4, 3, 0, 1, 2, 3, 4);
//    $r[2]=array(4, 4, 4, 4, 4, 9, 0, 6, 4, 4, 4, 4, 5, 1, 2, 9,4, 4, 4, 4, 8, 4, 0, 4, 4, 4, 4, 0, 4, 9, 8, 6, 7, 0);
//    $r[3]=array(1, 8, 2,4, 4, 4, 4, 7, 8, 0, 4, 4, 4, 4, 6, 7, 8, 4, 4, 4, 4, 4, 8, 5, 0, 6,4, 4, 4, 4, 0, 3, 4);
//    $r[4]=array(1, 2, 3, 4, 4, 4, 4, 4, 7, 8, 1, 4, 4, 4, 4, 2, 0, 6, 7, 4, 4, 4, 4, 3, 2, 7, 5, 8, 4, 4, 4, 4, 0);
	
}else if($frgs==5){

$r[0]=array(1, 7, 5, 5, 5, 5, 2, 4, 8, 3, 5, 5, 5, 5, 5, 5, 6, 5, 5, 5, 5, 5, 8, 5, 6, 7, 5, 5, 5, 5, 5, 7, 8, 6, 7, 8, 5, 5, 5, 5, 5);
$r[1]=array(4, 4, 8, 5, 5, 7, 5, 5, 5, 5, 5, 2, 2, 6, 3, 5, 5, 5, 5, 5, 3, 5, 7, 1, 1, 5, 5, 5, 5, 5, 7, 7, 5, 5, 6, 8, 5, 5, 5, 5, 5, 6, 8, 6, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 5, 8, 8, 5, 5, 5, 5, 5);
$r[2]=array(5, 5, 5, 5, 6, 6, 5, 7, 7, 2, 5, 5, 5, 5, 5, 5, 8, 8, 5, 7, 8, 1, 5, 5, 5, 5, 5, 8, 5, 5, 2, 1, 5, 5, 5, 5, 5, 5, 5, 6, 5, 6, 7, 3, 5, 4, 5, 5, 5, 5, 5, 5, 3, 4);
$r[3]=array(5, 5, 6, 1, 1, 8, 2, 4, 5, 5, 5, 5, 5, 2, 5, 3, 3, 7, 4, 5, 5, 5, 5, 7, 7, 5, 5, 5, 5, 5, 8, 6, 8, 8, 6, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 6, 5, 5, 5, 5, 5, 5, 8, 8, 5, 5, 5, 5, 5, 6, 5, 7, 5, 5, 5, 5, 5);
$r[4]=array(5, 5, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 6, 6, 6, 8, 8, 8, 6, 5, 5, 5, 5, 5, 5, 5, 5, 7, 8, 5, 7, 6, 8, 5, 7, 2, 3, 4, 5, 1, 6, 6, 8, 8, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);	

	
}

$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=110;
	
	
	$isWin=false;
	$isBonus=false;
	/////////////////////////////////////game_setting
		
		$gset=spin("spin",$gBet,$lines);
		if($gset['type']=="bon"){
	   
		}
		if($gset['type']=="win"){
		
		} 
		$casbank = $gset['sum']; 
		////////////////////////////////////game_setting
	
	$winR=rand(1,2);
	
	if($winR==1){
	$isWin=true;	
	}
	
	$isCalc=true;
	
	$casbank=get_bank($user_id,'bigpanda',"bonus");
	
	
	$loopCnt=0;
	
	while($isCalc){
	
	$loopCnt++;
	
	///////////////////////////////////reels position
$rp[0]=mt_rand(1,count($r[0])-3);

$rp[1]=mt_rand(1,count($r[1])-3);
$rp[2]=mt_rand(1,count($r[2])-3);
$rp[3]=mt_rand(1,count($r[3])-3);
$rp[4]=mt_rand(1,count($r[4])-3);

/*
if($isBonus){
$rp[0]=$bonusR1Pos[rand(0,7)];	
$rp[2]=rand(30,40);	
$rp[3]=rand(30,40);	
	
}*/

//create symbols map
$map=array();
	
for($i=0; $i<=4; $i++){

array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	
array_push($map,$r[$i][$rp[$i]+2]);	
	


	
}
	
$wildsCnt=0;

$isBonus=false;

/*

for($i=0;$i<count($map);$i++){

if($map[$i]==$wild){
$wildsCnt++;	
}
	
}	
	
	
if($map[0]==$map[1] && $map[1]==$map[2] && $map[2]==$map[3] && $map[0]!=$wild && $wildsCnt>0){
	
$isBonus=true;	
$_SESSION['rsym_bigpanda']=$map[0];
	
}	
*/	
	
	$wins=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	for ( $ln = 0; $ln < $lines; ++$ln )
	        {
	         $s1 = $map[$lin[$ln][0]];
	            $s2 = $map[$lin[$ln][1]];
	            $s3 = $map[$lin[$ln][2]];
	            $s4 = $map[$lin[$ln][3]];
	            $s5 = $map[$lin[$ln][4]];
				$gg = 1;


////////////////////////////////////
	



/////////////////////////////////////

	if(($s1==$s2 ) ){



$wins[$ln]=$psym[$s2][2];	
	
}			

if(($s1==$s2 ) && ($s2==$s3)  ){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 )  ){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 )  ){



$wins[$ln]=$psym[$s5][5];	
	
}


			
	           
	        }
			
		
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<50; $i++){

if($wins[$i]>0 ){
$winall+=($wins[$i]*$gBet);
$winall_r+=$wins[$i];
$whex=dechex($wins[$i]);	
$winstr.=strlen($whex).$whex;
}else{
$winstr.="10";	
}	
	
}	

$scatter_win=0;

for($i=0; $i<=19;$i++){
	
if($map[$i]==9){
$scatter_win++;	
}
	
}		
if($scatter_win>=5){	

$winstr.="10";		
}else{
$winstr.="10";		
}	
	
	if($isWin && $winall>0){
	$isCalc=false;	
		
	}
	if(!$isWin && $winall<=0){
	$isCalc=false;	
		
	}
	
	if($isBonus && $scatter_win<5){
	$isCalc=true;		
	}
	
	if(!$isBonus && $scatter_win>=5){
	$isCalc=true;		
	}
	
	if($isBonus && $scatter_win>=5){
	$isCalc=false;		
	}
	
	if($winall>$casbank){
	$isCalc=true;		
	}
	
	
	if($winall>$casbank){ 
$isCalc=true;	
	} 
 if($loopCnt>1200 && !$isCalc && ($isWin || $isBonus)){	
	$isWin=false;	
	$isBonus=false;	
	$isCalc=true;		
	}
	
	}
	$hisState="freegame";
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'bigpanda',$winall*-1,"bonus");	
$_SESSION['bigpanda_freeGamesBank']-=	$winall;	
$_SESSION['bigpanda_freeGamesWin']+=$winall;	
}	
	
	$hisWin=$_SESSION['bigpanda_freeGamesWin'];	
	
	//////////////////////////////////////////////////
	
	for($i=0; $i<5; $i++){
	
//$rndR=rand(0,55);
$rndR=$rp[$i];
$rHex=dechex($rndR);	
$rtnReels.=strlen($rHex).$rHex;		
	}
	
	$ln_h=dechex($lines);
	if(strlen($ln_h)<=1){
	$ln_h="0".$ln_h;	
	}
	
	$bet_h=dechex($bet);
	if(strlen($bet_h)<=1){
	$bet_h="0".$bet_h;	
	}
	
	
	//$winall_r=$_SESSION['bigpanda_freeGamesWin'];
	
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['bigpanda_freeGames']--;
	
	
	$gameState="06";
    
	if($_SESSION['bigpanda_freeGames']<=0){
	$hisState="freegame_end";
$gameState="0c";	
		
	}
	
	$respinMap="";
	
	
	
	
	for($i=0; $i<=14;$i++){
	
    
	$respinMap.="10";	
	
	
	}
	
	$ww="10";
	
	if($winall>0){
	
$ww="1f";	
		
	}
	
	$freeRH=dechex($_SESSION['bigpanda_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	 $freeInfo="1".dechex($_SESSION['bigpanda_freeGames2']).$freeR.$ww."111010".$rtnReels."33";	
	/*-------------------------------*/
	$winall2=($_SESSION['bigpanda_freeGamesWin']*$conf['fmp']);
	$str_winall=str_replace(".","",$winall2."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	
	$rtn="1".$gameState."0"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr."12090d2d181f301b"."150668815"."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bigpanda_freeGames2']."&".$_SESSION['bigpanda_freeGames']."&".$_SESSION['bigpanda_freeGamesBank']."&".$rtnBalance."&".$_SESSION['bigpanda_freeGamesSym'];
	
	
	
	//////////////////////////////////////////////double_answer
	
	//$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101033".$winstr."";
	//$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$_SESSION['bigpanda_freeGamesWin'];
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	//$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101033".$winstr.$_SESSION['dcard_bigpanda']."f15fffff15fffff15fffff15fffff";
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_bigpanda");
	ge_serv_show_str($rtn);			
		
		
		
	}	
	function FinishSpin(){
	global $room,$conf, $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_bigpanda'];
	$userId=$user_id;
 $_SESSION['dcard_bigpanda']=$dc;
		
		
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['finish_answer']="1040"."10".$rtnBalance.$_SESSION['finish_answer'];	
		
	ge_serv_show_str($_SESSION['finish_answer']);	
		
	}
	
	/*------------------------------------------------------------*/
	/*-----------------------  DOUBLE ----------------------------*/
	/*----------------------------------------------------------- */
	function GetDouble($daction){
	global $room,$conf, $login,$userId,$user_id;	
	
	
	$userId=$user_id;
  

	
	$doubleWin=rand(1,2);	
		
	$casbank=get_bank($user_id,'bigpanda',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'bigpanda',$winall,"double");	
		
	}
	
	$ucard="";
	
	
	
	

$reds=array(0,1,4,5,8,9,12,13,16,17,20,21,24,25,28,29,32,33,36,37,40,41,44,45,48,49,52);
$blacks=array(2,3,6,7,10,11,14,15,18,19,22,23,26,27,30,31,34,35,38,39,42,43,46,47,50,51);		

$suit3=array(0,4,8,12,16,20,24,28,32,36,40,44,48,52);		
$suit4=array(1,5,9,13,17,21,25,29,33,37,41,45,49,53);	

$suit5=array(2,6,10,14,18,22,26,30,34,38,42,46,50);
$suit6=array(3,7,11,15,19,23,27,31,35,39,43,47,51);
	
if($daction<=2){
$winall=$winall*2;	
	
}else{
$winall=$winall*4;		
}	
	
if($doubleWin==1  ){//////////////////////////////

if($daction==1){
$ucard=$reds[rand(0,26)];	
}
if($daction==2){
$ucard=$blacks[rand(0,25)];	
}
if($daction==3){
$ucard=$suit3[rand(0,12)];	
}
if($daction==4){
$ucard=$suit4[rand(0,12)];	
}
if($daction==5){
$ucard=$suit5[rand(0,12)];	
}
if($daction==6){
$ucard=$suit6[rand(0,12)];	
}
	
}else{//////////////////////////////////////

if($daction==1){
$ucard=$blacks[rand(0,25)];	
}
if($daction==2){
$ucard=$reds[rand(0,26)];	
}
if($daction==3){
	
$rnds=array(4,5,6);
$ucard=${"suit".$rnds[rand(0,2)]}[rand(0,12)];	
}
if($daction==4){
$rnds=array(3,5,6);
$ucard=${"suit".$rnds[rand(0,2)]}[rand(0,12)];		
}
if($daction==5){
$rnds=array(4,3,6);
$ucard=${"suit".$rnds[rand(0,2)]}[rand(0,12)];		
}
if($daction==6){
$rnds=array(4,5,3);
$ucard=${"suit".$rnds[rand(0,2)]}[rand(0,12)];	
}

$winall=0;		
	
}




$winall=sprintf( "%01.2f", $winall );$winall=floor_format_($winall);

     $winall_h1=str_replace(".","",$winall."");
	$winall_h=dechex($winall_h1);
	
	$ucard=dechex($ucard);
	if(strlen($ucard)<=1){
	$ucard="0".$ucard;	
	}
	
	
	
	$doubleCards=$_SESSION['dcard_bigpanda'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000a10101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'bigpanda',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	$dbla=$_SESSION['double_answer'];
     $rtn="1070"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$dbla.$doubleCards."15088111500000";
	
	$_SESSION['dcard_bigpanda']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_bigpanda"); 
	
	ge_serv_show_str($rtn);		
	}
	/////////////////////////////////////////////////////////////////////
	
	/*------------------------------------------------------------*/
	/*-----------------------  DOUBLE HALF------------------------*/
	/*----------------------------------------------------------- */
	function GetDoubleHalf(){
	global $room,$conf, $login,$userId,$user_id;	
	
	
	$userId=$user_id;
  

	
	$winall=$_SESSION['double_win'];
	
	
	

/*----------------------------*/	

if($winall>0.01){

$winall22=sprintf( "%01.2f", $winall/2);
}else{
$winall22=0;	
}

$winall=$winall-$winall22;

$user_balance =  floor_format_(get_balance($userId))-$winall ;
$_SESSION['double_win']=$winall;

$user_balance=sprintf( "%01.2f",$user_balance);
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	
	$_SESSION['double_balance']=$rtnBalance;

     $winall=sprintf( "%01.2f", $winall );$winall=floor_format_($winall);
/*----------------------------*/	


     $winall=sprintf( "%01.2f", $winall );$winall=floor_format_($winall);

     $winall_h1=str_replace(".","",$winall."");
	$winall_h=dechex($winall_h1);
	
	$ucard=dechex($ucard);
	if(strlen($ucard)<=1){
	$ucard="0".$ucard;	
	}
	
	$doubleCards=$_SESSION['dcard_bigpanda'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	$dbla=$_SESSION['double_answer'];
     
     $rtn="1080"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$dbla.$doubleCards."15088111500000";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_bigpanda");
	return $rtn;	
	}
	
	
	/*------------------------------------------------------------*/
	/*-----------------------  SERVER REQUEST --------------------*/
	/*----------------------------------------------------------- */
	
	
	$st=explode("A/u",$str);
	$st2=explode(",",$st[1]);
	$rtn="";
	if($st2[0]=="25"){//                    

   $rtn=GetReels();
	}
	
	
	if($st2[0]=="250"){ //                                      
                  	
	$rtn=InitGame();
	
	
        }

        if($st2[0]=="251"){

      
		$rtn=GetSpin($st2[2],$st2[1]);
		

	   }
	   if($st2[0]=="2517"){

      
		$rtn=$_SESSION['bigpanda_freeGames_start'];
		

	   } 
	   
	   if($st2[0]=="256"){

      
		$rtn=GetRespin($st2[2],$st2[1]);
		

	   } 
		
		 if($st2[0]=="254"){
		
		
		$rtn=FinishSpin();
		 
		 }
		 
		  if($st2[0]=="257"){//gamble
		
		
		  
		  
		  $rtn=GetDouble($st2[1]);
		  
		  }
		   if($st2[0]=="258"){//gamble
		
		
		  
		  
		  $rtn=GetDoubleHalf();
		  
		  }



	
	echo $rtn;
	
	
	
	
?>