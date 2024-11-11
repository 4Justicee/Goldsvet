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
$minBets.=strlen(dechex($betsArr[0]*1)).dechex($betsArr[0]*1);	
$maxBets.=strlen(dechex($betsArr[count($betsArr)-1])).dechex($betsArr[count($betsArr)-1]);	

$betsLength=count($betsArr);
$betsLength=dechex($betsLength);			
		
if(strlen($betsLength)<=1){
$betsLength="0".$betsLength;
}	
	

$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE room_id='$room' AND  g_name='bells_on_fire'"));
$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
		
	$rtn="052291753724067485694526784516734576456847546522d26714350746375279456456745671364256347147256522f7358643751726049612734612534567456745712534871623c542706371435249261435671234567567456172435637152435760476273233734172483670526954156012345167845071627342586273143521617853724063756946821452146207143507146352794021973586437017826049524164582174257063761435249263567521a73415248734670652698514538000101010101010427101000".$minBets.$maxBets."a101010101010100a0a01110010101010100000000000000000".$betsLength.$betString."0b1010101010101010101010#00101010&";
	////////////////////////////////////////  

$hisWin="10";
$hisState="4"; //b-additional anim bonus / 3-win-take-or-gamble	/5-normal bonus next/ 7 -gamble / 4- normal
//&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bells_on_fire_freeGames2']."&".$_SESSION['bells_on_fire_freeGames']."&".$_SESSION['bells_on_fire_freeGamesBank']
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
$_SESSION['bells_on_fire_freeGames2']=$hisTmp2[4];
$_SESSION['bells_on_fire_freeGames']=$hisTmp2[5];
$_SESSION['bells_on_fire_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['bells_on_fire_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bells_on_fire_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="5";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bells_on_fire_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['bells_on_fire_freeGames2']=$hisTmp2[4];
$_SESSION['bells_on_fire_freeGames']=$hisTmp2[5];
$_SESSION['bells_on_fire_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['bells_on_fire_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bells_on_fire_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="b";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bells_on_fire_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame_end"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['bells_on_fire_freeGames2']=$hisTmp2[4];
$_SESSION['bells_on_fire_freeGames']=$hisTmp2[5];
$_SESSION['bells_on_fire_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['bells_on_fire_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bells_on_fire_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="c";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bells_on_fire_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

}/////demo	
		
   $rtn="052510000066664477333385522226666777755551111877333344446655558777755533222211844422662470000777770044666664411666333399997777785556666877784444111166662222877723d6663333855550000445555000555444411115555577711182222999994444249000000111100022222999997777722221111333338444411199999333366666444445555524b00005555771111444400000551111222266444440000011111333333666677778222224433300".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."28".$f2.$f1."101111101028280a1100".$hisReel."0000000000000000".$betsLength.$betString."291010101010101010101010101010101010101010101010101010101010101010101010101010101010";
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
	
	
	$_SESSION['dcard_bells_on_fire']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
	
	
	$rtn="100010".$rtnBalance."10".$rtnReels."00281010101010101010101010291010101010101010101010101010101010101010101010101010101010101010101010101010101010".$_SESSION['dcard_bells_on_fire']."f15fffff15fffff15fffff15fffff";
	 set_stat_game($userId, $user_balance, 0,0,"state_bells_on_fire");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_bells_on_fire'])){
$_SESSION['dcard_bells_on_fire']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
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
	 change_bank($user_id,'bells_on_fire',$allbet,"spin");
	
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
	    $psym[8] = array( 0, 0, 0, 2, 200, 2500 );       
		$psym[7] = array( 0, 0, 0, 8, 40, 100);       
		$psym[6] = array( 0, 0, 0, 8, 40, 100);
		$psym[5] = array( 0, 0, 0, 8, 40, 100 );       
		$psym[4] = array(0, 0, 0, 8, 40, 100);      
		$psym[3] = array(0, 0, 0, 20, 80, 200);      
		$psym[2] = array( 0, 0, 0, 20, 80, 200 );      
		$psym[1] = array(0, 0, 0, 40, 100, 300 );     
		$psym[0] = array( 0, 0, 4, 60, 200, 1000 );    
		  
		$psym[9] = array( 0, 0, 0,0, 0, 0 );   
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
	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(0, 0, 0, 0, 0, 6, 6, 6, 6, 4, 4, 7, 7, 3, 3, 3, 3, 8, 5, 5, 2, 2, 2, 2, 6, 6, 6, 6, 7, 7, 7, 7, 5, 5, 5, 5, 1, 1, 1, 1, 8, 7, 7, 3, 3, 3, 3, 4, 4, 4, 4, 6, 6, 5, 5, 5, 5, 8, 7, 7, 7, 7, 5, 5, 5, 3, 3, 2, 2, 2, 2, 1, 1, 8, 4, 4, 4, 2, 2, 6, 6);
$r[1]=array(0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 4, 4, 6, 6, 6, 6, 6, 4, 4, 1, 1, 6, 6, 6, 3, 3, 3, 3, 9, 9, 9, 9, 7, 7, 7, 7, 7, 8, 5, 5, 5, 6, 6, 6, 6, 8, 7, 7, 7, 8, 4, 4, 4, 4, 1, 1, 1, 1, 6, 6, 6, 6, 2, 2, 2, 2, 8, 7, 7, 7);
$r[2]=array(6, 6, 6, 3, 3, 3, 3, 8, 5, 5, 5, 5, 0, 0, 0, 0, 4, 4, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 4, 4, 4, 4, 1, 1, 1, 1, 5, 5, 5, 5, 5, 7, 7, 7, 1, 1, 1, 8, 2, 2, 2, 2, 9, 9, 9, 9, 9, 4, 4, 4, 4);
$r[3]=array(0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7, 2, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 3, 3, 8, 4, 4, 4, 4, 1, 1, 1, 9, 9, 9, 9, 9, 3, 3, 3, 3, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5);
$r[4]=array(0, 0, 0, 0, 5, 5, 5, 5, 7, 7, 1, 1, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0, 0, 5, 5, 1, 1, 1, 1, 2, 2, 2, 2, 6, 6, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 7, 7, 7, 7, 8, 2, 2, 2, 2, 2, 4, 4, 3, 3, 3);	


$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=9;
	
	
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
	
	if($casbank <$gBet*8){
	$isWin=false;	
		
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
$_SESSION['rsym_bells_on_fire']=$map[0];
	
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

 if ($s1 == $wild && $s2 != 8 && $s2!=12)
				{
					$s1 = $s2;
					
				}
				if ($s2 == $wild && $s1 != 8 && $s1!=12)
				{
					$s2 = $s1;
					
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 != 8)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 != 8)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 != 8)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 != 8)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 != 8)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 != 8)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 != 8)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 != 8)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 != 8)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 != 8)
	            {
	                $s4 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 != 8)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 != 8)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 != 8)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 != 8)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 != 8)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 != 8)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 != 8)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 != 8)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 != 8)
				{
					$s5 = $s2;
					
				}
				
				



/////////////////////////////////////

	if(($s1==$s2 )  && $s1 != 8){



$wins[$ln]=$psym[$s2][2];	
	
}					

if(($s1==$s2 ) && ($s2==$s3)   && $s1 != 8){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 )  && $s1 != 8){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 ) && $s1 != 8 ){



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
	
if($map[$i]==8){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[8][$scatter_win]*$gBet*$lines);
$winall_r+=$psym[8][$scatter_win];
$whex=dechex($psym[8][$scatter_win]);	
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
 change_bank($user_id,'bells_on_fire',$winall*-1,"bonus");
 }else{ 
 change_bank($user_id,'bells_on_fire',$winall*-1,"spin");	
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
	
	
	$str_winall=str_replace(".","",($winall*$conf['fmp'])."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_bells_on_fire']=$map;	
	
	/*bonus_start*/
	if($isBonus){
		
	$hisState="freegame_start";
		
	$gameState="1e";	
	$_SESSION['reel_respin_bells_on_fire']=$rp[0];
	$respinMap=$_SESSION['rsym_bells_on_fire'];
	
	/*respinMap*/
	$sline=array();
	$sline[0]=array(0,4,8,12,16);
	$sline[1]=array(1,5,9,13,17);
	$sline[2]=array(2,6,10,14,18);
	$sline[3]=array(3,7,11,15,19);
	$_SESSION['rsym_cnt_bells_on_fire']=0;
	for($i=0; $i<=3;$i++){
		$respinMap.="15";	
	for($j=0; $j<=4;$j++){	
		
	
	if($map[$sline[$i][$j]]==$_SESSION['rsym_bells_on_fire']){
	$respinMap.=$_SESSION['rsym_bells_on_fire'];	
	$_SESSION['rsym_cnt_bells_on_fire']++;
	}else if($map[$sline[$i][$j]]==$wild){
	$respinMap.=$wild;	
	$_SESSION['rsym_cnt_bells_on_fire']++;
	}else{
	$respinMap.="f";	
  // $_SESSION['rmap_bells_on_fire'][$sline[$i][$j]]=-1;	
	}
	
	}
	
	}
	/*-----------*/
	
	}else{
	$gameState="03";
    $respinMap="";	
	}
	/*-------------------------------*/
	
	$rtn="1".$gameState."0"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr.$_SESSION['dcard_bells_on_fire']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bells_on_fire_freeGames2']."&".$_SESSION['bells_on_fire_freeGames']."&".$_SESSION['bells_on_fire_freeGamesBank']."&".$rtnBalance;
	
	
	
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
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr.$_SESSION['dcard_bells_on_fire']."f15fffff15fffff15fffff15fffff"."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bells_on_fire_freeGames2']."&".$_SESSION['bells_on_fire_freeGames']."&".$_SESSION['bells_on_fire_freeGamesBank']."&".$rtnBalance;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_bells_on_fire");
	ge_serv_show_str($rtn);		
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
	
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.01, 0.02, 0.03, 0.04, 0.05, 0.08,0.12);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	///////////////////////////////
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
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
	    $psym[8] = array( 0, 0, 0, 10, 20, 100 );       
		$psym[7] = array( 0, 0, 0, 10, 20, 100 );       
		$psym[6] = array( 0, 0, 0, 10, 30, 150);
		$psym[5] = array( 0, 0, 0, 10, 30, 150 );       
		$psym[4] = array(0, 0, 0, 20, 40, 200);      
		$psym[3] = array(0, 0, 0, 30, 60, 300);      
		$psym[2] = array( 0, 0, 0, 30, 60, 300 );      
		$psym[1] = array(0, 0, 0, 40, 80, 400 );     
		$psym[0] = array( 0, 0, 0, 50, 200, 1000 );    
		  
		$psym[9] = array( 0, 0, 0,0, 0, 0 );   
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
	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(0, 0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 3, 5, 5, 5, 5, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 7, 7, 3, 3, 6, 6, 2, 2, 5, 5, 7, 7, 4, 4, 5, 5, 6, 6, 4, 4, 3, 3, 2, 2, 7, 7, 6, 6, 5, 5, 1, 1, 1, 1, 7, 7, 6, 6, 0, 0, 0, 0, 5, 5, 4, 4, 4, 4);
$r[1]=array(0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9, 9, 6, 6, 6, 6, 7, 7, 7, 7, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 6, 6, 6, 6, 7, 7, 7, 7, 1, 1, 7, 7, 5, 5, 7, 7, 7, 7, 1, 1, 0, 0, 0, 0, 7, 7, 7, 7, 8, 8, 8, 8, 6, 6, 6, 6);
$r[2]=array(5, 5, 5, 5, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 7, 7, 7, 7, 6, 6, 6, 6, 2, 2, 2, 2, 9, 9, 9, 9, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 7, 7, 4, 4, 6, 6, 5, 5, 7, 7, 5, 5, 2, 2, 5, 5, 4, 4, 5, 5, 2, 2, 5, 5, 5, 5, 8, 8, 8, 8, 4, 4, 4, 4, 1, 1, 1, 1, 3, 3, 3, 3, 0, 0, 0, 0);
$r[3]=array(0, 0, 0, 0, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 4, 4, 5, 5, 5, 5, 1, 1, 1, 1, 6, 6, 6, 6, 7, 7, 7, 7, 3, 3, 3, 3, 9, 9, 9, 9, 2, 2, 2, 2, 4, 4, 4, 4, 7, 7, 3, 3, 7, 7, 3, 3, 2, 2, 3, 3, 2, 2, 0, 0, 3, 3, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 5, 5, 5, 5);
$r[4]=array(1, 1, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 5, 5, 5, 5, 6, 6, 6, 6, 4, 4, 4, 4, 7, 7, 7, 7, 2, 2, 3, 3, 6, 6, 3, 3, 5, 5, 4, 4, 4, 4, 5, 5, 7, 7, 6, 6, 2, 2, 7, 7, 1, 1, 1, 1, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 8, 8, 8, 8, 7, 7, 7, 7, 0, 0, 0, 0, 1, 1, 1, 1);	


//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=9;
	
	
	$isWin=false;
	$isBonus=false;
	/////////////////////////////////////game_setting
		
		$gset=spin("spin",$gBet,$lines);
		if($gset['type']=="bon"){
	   
		}
		if($gset['type']=="win"){
		$isWin=true;
		} 
		$casbank = $gset['sum']; 
		////////////////////////////////////game_setting
	
	
	
	$isCalc=true;
	
	if($casbank <$gBet*8){
	$isWin=false;	
		
	}
	
	
	while($isCalc){
	
	
	
	///////////////////////////////////reels position
$rp[0]=$_SESSION['reel_respin_bells_on_fire'];
$rp[1]=mt_rand(1,count($r[1])-3);
$rp[2]=mt_rand(1,count($r[2])-3);
$rp[3]=mt_rand(1,count($r[3])-3);
$rp[4]=mt_rand(1,count($r[4])-3);

//create symbols map
$map=array();
	
for($i=0; $i<=4; $i++){

array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	
array_push($map,$r[$i][$rp[$i]+2]);	
	


	
}
	
/*bonus_start*/
	$isBonus=false;
	$rSymCnt=0;
	
	for($i=0; $i<=19;$i++){
		
	if($_SESSION['rmap_bells_on_fire'][$i]==$_SESSION['rsym_bells_on_fire'] || $_SESSION['rmap_bells_on_fire'][$i]==$wild){
	$map[$i]=$_SESSION['rmap_bells_on_fire'][$i];	
	}

if($map[$i]==$_SESSION['rsym_bells_on_fire'] || $map[$i]==$wild){
$rSymCnt++;	
}
	
	}
	
	if($rSymCnt>$_SESSION['rsym_cnt_bells_on_fire']){
	
   $isBonus=true;	
	
	}
	
	
	
		
	
	$respinMap=$_SESSION['rsym_bells_on_fire'];
	
	$sline=array();
	$sline[0]=array(0,4,8,12,16);
	$sline[1]=array(1,5,9,13,17);
	$sline[2]=array(2,6,10,14,18);
	$sline[3]=array(3,7,11,15,19);
	
	for($i=0; $i<=3;$i++){
		$respinMap.="15";	
	for($j=0; $j<=4;$j++){	
		
	
	if($map[$sline[$i][$j]]==$_SESSION['rsym_bells_on_fire']){
	$respinMap.=$_SESSION['rsym_bells_on_fire'];	
	
	}else if($map[$sline[$i][$j]]==$wild){
	$respinMap.=$wild;	
	
	}else{
	$respinMap.="f";	

	}
	
	}
	
	}
	
	
	if($isBonus){
	$gameState="1f";

	}else{
	$gameState="20";	
	}
	/*-----------*/	
	
	
	
	$wins=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	for ( $ln = 0; $ln < $lines; ++$ln )
	        {
	         $s1 = $map[$lin[$ln][0]];
	            $s2 = $map[$lin[$ln][1]];
	            $s3 = $map[$lin[$ln][2]];
	            $s4 = $map[$lin[$ln][3]];
	            $s5 = $map[$lin[$ln][4]];
				$gg = 1;


////////////////////////////////////

 if ($s1 == $wild && $s2 != 8 && $s2!=12)
				{
					$s1 = $s2;
					
				}
				if ($s2 == $wild && $s1 != 8 && $s1!=12)
				{
					$s2 = $s1;
					
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 != 8)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 != 8)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 != 8)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 != 8)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 != 8)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 != 8)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 != 8)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 != 8)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 != 8)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 != 8)
	            {
	                $s4 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 != 8)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 != 8)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 != 8)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 != 8)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 != 8)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 != 8)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 != 8)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 != 8)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 != 8)
				{
					$s5 = $s2;
					
				}
				
				



/////////////////////////////////////

				

if(($s1==$s2 ) && ($s2==$s3)  ){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 ) ){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 ) ){



$wins[$ln]=$psym[$s5][5];	
	
}


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<=$lines; $i++){

if($wins[$i]>0 && !$isBonus){
$winall+=($wins[$i]*$gBet);
$winall_r+=$wins[$i];
$whex=dechex($wins[$i]);	
$winstr.=strlen($whex).$whex;
}else{
$winstr.="10";	
}	
	
}			
	
	
	/*if($isWin && $winall>0){
	$isCalc=false;	
		
	}
	if(!$isWin && $winall<=0){*/
	$isCalc=false;	
	/*	
	}
	
	if($winall>$casbank){
	$isCalc=true;		
	}*/
	
	
	}
	
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'bells_on_fire',$winall*-1,"bonus");	

set_stat_game($userId, $user_balance, $allbet,$winall,"respin_win_bells_on_fire"); 
	
}else{
	
set_stat_game($userId, $user_balance, $allbet,$winall,"respin_step_bells_on_fire");	
	
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
	
	$winall_h=dechex($winall_r);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	
	
	
	/*-------------------------------*/
	
	$rtn="1".$gameState."0"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr.$_SESSION['dcard_bells_on_fire'].$respinMap."#$rSymCnt#".count($r[3]);
	
	$_SESSION['rsym_cnt_bells_on_fire']=$rSymCnt;	
	$_SESSION['rmap_bells_on_fire']=$map;	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr."";
//	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['finish_answer']="1040"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101029".$winstr.$_SESSION['dcard_bells_on_fire']."f15fffff15fffff15fffff15fffff";
	
	
	return $rtn;		
		
		
	}	
	function FinishSpin(){
	global $room,$conf, $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_bells_on_fire'];
	$userId=$user_id;
 $_SESSION['dcard_bells_on_fire']=$dc;
		
		
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
		
	$casbank=get_bank($user_id,'bells_on_fire',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'bells_on_fire',$winall,"double");	
		
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
	
	
	
	$doubleCards=$_SESSION['dcard_bells_on_fire'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000a10101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'bells_on_fire',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1070"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	$_SESSION['dcard_bells_on_fire']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_bells_on_fire"); 
	
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
	
	$doubleCards=$_SESSION['dcard_bells_on_fire'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1080"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_bells_on_fire");
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
	   
	    if($st2[0]=="2531"){

      
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
