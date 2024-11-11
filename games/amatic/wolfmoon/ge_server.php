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
$betsArr[count($betsArr)-1]=$betsArr[count($betsArr)-1]*40;
$minBets.=strlen(dechex($betsArr[0]*40)).dechex($betsArr[0]*40);	
$maxBets.=strlen(dechex($betsArr[count($betsArr)-1])).dechex($betsArr[count($betsArr)-1]);	

$betsLength=count($betsArr);
$betsLength=dechex($betsLength);			
		
if(strlen($betsLength)<=1){
$betsLength="0".$betsLength;
}		
	
	$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE room_id='$room' AND  g_name='wolfmoon'"));
$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
		
	$rtn="052291753724067485694526784516734576456847546522d26714350746375279456456745671364256347147256522f7358643751726049612734612534567456745712534871623c542706371435249261435671234567567456172435637152435760476273233734172483670526954156012345167845071627342586273143521617853724063756946821452146207143507146352794021973586437017826049524164582174257063761435249263567521a73415248734670652698514538000101010101010427101000".$minBets.$maxBets."a101010101010100a0a01110010101010100000000000000000".$betsLength.$betString."0b1010101010101010101010#00101010&";
	////////////////////////////////////////  

$hisWin="10";
$hisState="4"; //b-additional anim bonus / 3-win-take-or-gamble	/5-normal bonus next/ 7 -gamble / 4- normal
//&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['wolfmoon_freeGames2']."&".$_SESSION['wolfmoon_freeGames']."&".$_SESSION['wolfmoon_freeGamesBank']
$hisTmp=explode("&st=",$res2['str']);
$hisTmp2=explode("&",$hisTmp[1]);
$onlyWin=$hisTmp2[1];
$hisTmp2[1]=$hisTmp2[1]*$conf['fmp'];

$rtnReels="";
	
	for($i=1; $i<=5; $i++){
	

$rndR=rand(0,20);
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
$_SESSION['wolfmoon_freeGames2']=$hisTmp2[4];
$_SESSION['wolfmoon_freeGames']=$hisTmp2[5];
$_SESSION['wolfmoon_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['wolfmoon_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['wolfmoon_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="5";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['wolfmoon_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['wolfmoon_freeGames2']=$hisTmp2[4];
$_SESSION['wolfmoon_freeGames']=$hisTmp2[5];
$_SESSION['wolfmoon_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['wolfmoon_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['wolfmoon_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="b";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['wolfmoon_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame_end"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['wolfmoon_freeGames2']=$hisTmp2[4];
$_SESSION['wolfmoon_freeGames']=$hisTmp2[5];
$_SESSION['wolfmoon_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['wolfmoon_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['wolfmoon_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="c";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['wolfmoon_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

}/////demo		
	
	$rtn="05255854a36738464911119a700005738473896222279611116552222a394a938486ba711111111a55222222222551111658473a48365600007565222285646547936738946a3754a53852222583764a8475376111169b958625e8791111a73894a7800007594783898a1111975a4a5222267386684a7111159378b678ba911111978a111111187222223f571111639473822225680000656ba83a92222839a490000751111a72222222223b751111a7396469384a000094838b7622225493b8a00007b5a1111652222523764939811118a2222a354674a000057364735b8228951111a6000079225111158000084546b937111162222a370000a922d111156382222a4647700005b60000493911115478383a22f745111165222273800006ba36471111835900009480000a23011116473922228ab536489000094500005461111670000870".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."28".$f2.$f1."101111101028280a1100".$hisReel."0000000000000000".$betsLength.$betString."291010101010101010101010101010101010101010101010101010101010101010101010101010101010";
	echo $rtn;   
		
		
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
	

$rndR=rand(0,20);
$rHex=dechex($rndR);	
$rtnReels.=strlen($rHex).$rHex;		
	}
	
	
	$_SESSION['dcard_wolfmoon']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
	
	
	$rtn="100010".$rtnBalance."10".$rtnReels."00281010101010101010101010291010101010101010101010101010101010101010101010101010101010101010101010101010101010".$_SESSION['dcard_wolfmoon']."f15fffff15fffff15fffff15fffff";
	 set_stat_game($userId, $user_balance, 0,0,"state_wolfmoon");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_wolfmoon'])){
$_SESSION['dcard_wolfmoon']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.01, 0.02, 0.03, 0.04, 0.05, 0.08,0.12);

	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'wolfmoon',$allbet,"spin");
	
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

 
	
	
	//////////////////////////////////////////////////loop
	
	
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


$psym[1]=array(0,0,0,25,100,400);
$psym[2]=array(0,0,0,25,100,400);
$psym[3]=array(0,0,0,20,75,250);
$psym[4]=array(0,0,0,20,75,250);
$psym[5]=array(0,0,0,5,50,150);
$psym[6]=array(0,0,0,5,50,150);
$psym[7]=array(0,0,0,5,20,100);
$psym[8]=array(0,0,0,5,20,100);
$psym[9]=array(0,0,0,5,20,100);
$psym[10]=array(0,0,0,5,20,100);
$psym[11]=array(0,0,0,2,5,20);
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(8, 5, 4, 10, 3, 6, 7, 3, 8, 4, 6, 4, 9, 1, 1, 1, 1, 9, 10, 7, 0, 0, 0, 0, 5, 7, 3, 8, 4, 7, 3, 8, 9, 6, 2, 2, 2, 2, 7, 9, 6, 1, 1, 1, 1, 6, 5, 5, 2, 2, 2, 2, 10, 3, 9, 4, 10, 9, 3, 8, 4, 8, 6, 11, 10, 7, 1, 1, 1, 1, 1, 1, 1, 1, 10, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2);
$r[1]=array(1, 1, 1, 1, 6, 5, 8, 4, 7, 3, 10, 4, 8, 3, 6, 5, 6, 0, 0, 0, 0, 7, 5, 6, 5, 2, 2, 2, 2, 8, 5, 6, 4, 6, 5, 4, 7, 9, 3, 6, 7, 3, 8, 9, 4, 6, 10, 3, 7, 5, 4, 10, 5, 3, 8, 5, 2, 2, 2, 2, 5, 8, 3, 7, 6, 4, 10, 8, 4, 7, 5, 3, 7, 6, 1, 1, 1, 1, 6, 9, 11, 9, 5, 8, 6);
$r[2]=array(8, 7, 9, 1, 1, 1, 1, 10, 7, 3, 8, 9, 4, 10, 7, 8, 0, 0, 0, 0, 7, 5, 9, 4, 7, 8, 3, 8, 9, 8, 10, 1, 1, 1, 1, 9, 7, 5, 10, 4, 10, 5, 2, 2, 2, 2, 6, 7, 3, 8, 6, 6, 8, 4, 10, 7, 1, 1, 1, 1, 5, 9, 3, 7, 8, 11, 6, 7, 8, 11, 10, 9, 1, 1, 1, 1, 1, 9, 7, 8, 10, 1, 1, 1, 1, 1, 1, 1, 8, 7, 2, 2, 2, 2);
$r[3]=array(5, 7, 1, 1, 1, 1, 6, 3, 9, 4, 7, 3, 8, 2, 2, 2, 2, 5, 6, 8, 0, 0, 0, 0, 6, 5, 6, 11, 10, 8, 3, 10, 9, 2, 2, 2, 2, 8, 3, 9, 10, 4, 9, 0, 0, 0, 0, 7, 5, 1, 1, 1, 1, 10, 7, 2, 2, 2, 2, 2, 2, 2, 2);
$r[4]=array(7, 5, 1, 1, 1, 1, 10, 7, 3, 9, 6, 4, 6, 9, 3, 8, 4, 10, 0, 0, 0, 0, 9, 4, 8, 3, 8, 11, 7, 6, 2, 2, 2, 2, 5, 4, 9, 3, 11, 8, 10, 0, 0, 0, 0, 7, 11, 5, 10, 1, 1, 1, 1, 6, 5, 2, 2, 2, 2);	


$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=0;
	
	
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
	
	if($casbank <$gBet*10*($lines/2)){
		
		
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
$_SESSION['rsym_wolfmoon']=$map[0];
	
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

 if ($s1 == $wild && $s2 !=11 && $s2!=12)
				{
					$s1 = $s2;
					
				}
				if ($s2 == $wild && $s1 !=11 && $s1!=12)
				{
					$s2 = $s1;
					
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=11)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=11)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=11)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=11)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=11)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=11)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=11)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=11)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=11)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=11)
	            {
	                $s4 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=11)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=11)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=11)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=11)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=11)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=11)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=11)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=11)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=11)
				{
					$s5 = $s2;
					
				}
				
				



/////////////////////////////////////

	if(($s1==$s2 )  && $s1 !=11){



$wins[$ln]=$psym[$s2][2];	
	
}			

if(($s1==$s2 ) && ($s2==$s3)   && $s1 !=11){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 )  && $s1 !=11){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 )  && $s1 !=11){



$wins[$ln]=$psym[$s5][5];	
	
}


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<40; $i++){

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
	
if($map[$i]==11){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[11][$scatter_win]*$gBet*$lines);
$winall_r+=$psym[11][$scatter_win];
$whex=dechex($psym[11][$scatter_win]);	
$winstr.=strlen($whex).$whex;	
}else{
$winstr.="10";	
}	
	
	if($isWin && $winall>0){
	$isCalc=false;	
		
	}
	if(!$isWin && $winall<=0){
	$isCalc=false;	
		
	}
	
	if($isBonus && $scatter_win<3){
	$isCalc=true;		
	}
	
	if(!$isBonus && $scatter_win>=3){
	$isCalc=true;		
	}
	
	if($isBonus && $scatter_win>=3){
	$isCalc=false;		
	}
	
	if($winall>$casbank){
	$isCalc=true;		
	}
	
	
	if($loopCnt>800){
	$isCalc=false;	
		
	}
	
	}
		
$hisState="spin";
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'wolfmoon',$winall*-1,"spin");	
	
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
	$_SESSION['wolfmoon_freeGamesWin']=$winall;
	
	$str_winall=str_replace(".","",($winall*$conf['fmp'])."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
		
	
	
	$gameState="03";
    $respinMap="";	

	
	$gameState="03";
	          //"101010101010101010101029"
    $freeInfo="101010101010101010101029";
	if($isBonus && $scatter_win>=3){
	
	$_SESSION['wolfmoon_freeGames']=5;
	$_SESSION['wolfmoon_freeGames2']=5;
	
	$_SESSION['wolfmoon_freeGamesBank']=$gset['sum'];
	
$gameState="05";	
	 $freeInfo="151510111010101010101029";	
	}
	
	/*-------------------------------*/
	
	$rtn="1".$gameState."0"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_wolfmoon']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['wolfmoon_freeGames2']."&".$_SESSION['wolfmoon_freeGames']."&".$_SESSION['wolfmoon_freeGamesBank']."&".$rtnBalance;
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr."";
	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	$hisState="collect";
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr.$_SESSION['dcard_wolfmoon']."f15fffff15fffff15fffff15fffff"."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['wolfmoon_freeGames2']."&".$_SESSION['wolfmoon_freeGames']."&".$_SESSION['wolfmoon_freeGamesBank']."&".$rtnBalance;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_wolfmoon");
	ge_serv_show_str($rtn);		
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_wolfmoon'])){
$_SESSION['dcard_wolfmoon']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.01, 0.02, 0.03, 0.04, 0.05, 0.08,0.12);

	
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
 
	
	//////////////////////////////////////////////////loop
	
	

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


$psym[1]=array(0,0,0,25,100,400);
$psym[2]=array(0,0,0,25,100,400);
$psym[3]=array(0,0,0,20,75,250);
$psym[4]=array(0,0,0,20,75,250);
$psym[5]=array(0,0,0,5,50,150);
$psym[6]=array(0,0,0,5,50,150);
$psym[7]=array(0,0,0,5,20,100);
$psym[8]=array(0,0,0,5,20,100);
$psym[9]=array(0,0,0,5,20,100);
$psym[10]=array(0,0,0,5,20,100);
$psym[11]=array(0,0,0,2,5,20);	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(6, 4, 9, 3, 9, 8, 1, 1, 1, 1, 8, 10, 2, 2, 2, 2, 10, 3, 5, 4, 6, 7, 4, 10, 0, 0, 0, 0, 5, 7, 3, 6, 4, 7, 3, 5, 11, 8, 2, 2, 8, 9, 5, 1, 1, 1, 1, 10, 6, 0, 0, 0, 0, 7, 9);
$r[1]=array(1, 1, 1, 1, 5, 8, 0, 0, 0, 0, 8, 4, 5, 4, 6, 11, 9, 3, 7, 1, 1, 1, 1, 6, 2, 2, 2, 2, 10, 3, 7, 0, 0, 0, 0, 10, 9);
$r[2]=array(1, 1, 1, 1, 5, 6, 3, 8, 2, 2, 2, 2, 10, 4, 6, 4, 7, 7, 0, 0, 0, 0, 5, 11, 6, 0, 0, 0, 0, 4, 9, 3, 9, 1, 1, 1, 1, 5, 4, 7, 8, 3, 8, 3, 10);
$r[3]=array(7, 4, 5, 1, 1, 1, 1, 6, 5, 2, 2, 2, 2, 7, 3, 8, 0, 0, 0, 0, 6, 11, 10, 3, 6, 4, 7, 1, 1, 1, 1, 8, 3, 5, 9, 0, 0, 0, 0, 9, 4, 8, 0, 0, 0, 0, 10);
$r[4]=array(1, 1, 1, 1, 6, 4, 7, 3, 9, 2, 2, 2, 2, 8, 10, 11, 5, 3, 6, 4, 8, 9, 0, 0, 0, 0, 9, 4, 5, 0, 0, 0, 0, 5, 4, 6, 1, 1, 1, 1, 6, 7, 0, 0, 0, 0, 8, 7);	


$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=0;
	
	
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
	$bRand=rand(1,50);
	
	if($bRand==1){
	
$isBonus=true;	
		
	}
	$isCalc=true;
	
	if($casbank <$gBet*10*($lines/2)){
		
		
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

$isBonus=false;

/*

for($i=0;$i<count($map);$i++){

if($map[$i]==$wild){
$wildsCnt++;	
}
	
}	
	
	
if($map[0]==$map[1] && $map[1]==$map[2] && $map[2]==$map[3] && $map[0]!=$wild && $wildsCnt>0){
	
$isBonus=true;	
$_SESSION['rsym_wolfmoon']=$map[0];
	
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

 if ($s1 == $wild && $s2 !=11 && $s2!=12)
				{
					$s1 = $s2;
					
				}
				if ($s2 == $wild && $s1 !=11 && $s1!=12)
				{
					$s2 = $s1;
					
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=11)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=11)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=11)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=11)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=11)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=11)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=11)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=11)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=11)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=11)
	            {
	                $s4 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=11)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=11)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=11)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=11)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=11)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=11)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=11)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=11)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=11)
				{
					$s5 = $s2;
					
				}
				
				



/////////////////////////////////////

	if(($s1==$s2 )  && $s1 !=11){



$wins[$ln]=$psym[$s2][2];	
	
}			

if(($s1==$s2 ) && ($s2==$s3)   && $s1 !=11){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 )  && $s1 !=11){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 )  && $s1 !=11){



$wins[$ln]=$psym[$s5][5];	
	
}


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<40; $i++){

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
	
if($map[$i]==11){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[11][$scatter_win]*$gBet*$lines);
$winall_r+=$psym[11][$scatter_win];
$whex=dechex($psym[11][$scatter_win]);	
$winstr.=strlen($whex).$whex;	
}else{
$winstr.="10";	
}	
	
	if($isWin && $winall>0){
	$isCalc=false;	
		
	}
	if(!$isWin && $winall<=0){
	$isCalc=false;	
		
	}
	
	if($isBonus && $scatter_win<3){
	$isCalc=true;		
	}
	
	if(!$isBonus && $scatter_win>=3){
	$isCalc=true;		
	}
	
	if($isBonus && $scatter_win>=3){
	$isCalc=false;		
	}
	
	if($winall>$casbank){
	$isCalc=true;		
	}
	
	
	if($loopCnt>800){
	$isCalc=false;	
		
	}
	
	}
	$hisState="freegame";
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'wolfmoon',$winall*-1,"spin");	
$_SESSION['wolfmoon_freeGamesBank']-=	$winall;	
$_SESSION['wolfmoon_freeGamesWin']+=$winall;	
}	
	
	
	
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
	
	
	//$winall_r=$_SESSION['wolfmoon_freeGamesWin'];
	
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['wolfmoon_freeGames']--;
	
	
	$gameState="06";
    
	if($_SESSION['wolfmoon_freeGames']<=0){
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
	
	if($scatter_win>=3){
	$_SESSION['wolfmoon_freeGames']+=5;	
	$_SESSION['wolfmoon_freeGames2']+=5;	
	$gameState="0a";
	}
	
	$freeRH2=dechex($_SESSION['wolfmoon_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
	$freeRH=dechex($_SESSION['wolfmoon_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	 $freeInfo=$freeR2.$freeR.$ww."111010".$rtnReels."29";	
	/*-------------------------------*/
	$winall2=($_SESSION['wolfmoon_freeGamesWin']*$conf['fmp']);
	$str_winall=str_replace(".","",$winall2."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	$hisWin=$_SESSION['wolfmoon_freeGamesWin'];
	
	$rtn="1".$gameState."0"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_wolfmoon']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['wolfmoon_freeGames2']."&".$_SESSION['wolfmoon_freeGames']."&".$_SESSION['wolfmoon_freeGamesBank']."&".$_SESSION['double_balance'];
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr."";
	//$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$_SESSION['wolfmoon_freeGamesWin'];
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr.$_SESSION['dcard_wolfmoon']."f15fffff15fffff15fffff15fffff"."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['wolfmoon_freeGames2']."&".$_SESSION['wolfmoon_freeGames']."&".$_SESSION['wolfmoon_freeGamesBank']."&".$_SESSION['double_balance'];
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_wolfmoon");
	ge_serv_show_str( $rtn);		
		
		
		
	}	
	function FinishSpin(){
	global $room,$conf, $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_wolfmoon'];
	$userId=$user_id;
 $_SESSION['dcard_wolfmoon']=$dc;
		
		
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
		
	$casbank=get_bank($user_id,'wolfmoon',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'wolfmoon',$winall,"double");	
		
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
	
	
	
	$doubleCards=$_SESSION['dcard_wolfmoon'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000a10101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'wolfmoon',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1070"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	$_SESSION['dcard_wolfmoon']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_wolfmoon"); 
	
	return $rtn;	
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
	
	$doubleCards=$_SESSION['dcard_wolfmoon'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1080"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_wolfmoon");
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
