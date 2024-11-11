   <?php

error_reporting(0);

include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';


$str=$_GET['ddd']; if($conf['float_bet']==1){$conf['fmp']=100;	}else{$conf['fmp']=1;}

$action="spin";

//simon --don`t need in really
$conf['bets'] ='0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.6,0.7,0.8,0.9,1.0,2.0,3.0,4.0,5.0';
//$conf['bets'] ='0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.6,0.7,0.8,0.9,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0';

	function GetReels(){
		
	global $room,$conf, $conf,$userId,$user_id,$demomode;
	
$betsArr=explode(",",$conf['bets']);
$betString="";

for($b=0; $b<count($betsArr); $b++){
	$betsArr[$b]=$betsArr[$b]*$conf['fmp'];
$betString.=strlen(dechex($betsArr[$b])).dechex($betsArr[$b]);	
}
$betsArr[count($betsArr)-1]=$betsArr[count($betsArr)-1]*10;
$minBets.=strlen(dechex($betsArr[0]*1)).dechex($betsArr[0]*1);	
$maxBets.=strlen(dechex($betsArr[count($betsArr)-1])).dechex($betsArr[count($betsArr)-1]);	

$betsLength=count($betsArr);
$betsLength=dechex($betsLength);			
		
if(strlen($betsLength)<=1){
$betsLength="0".$betsLength;
}	

		
	
$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE room_id='$room' AND  g_name='bellsonfirerombo'"));
$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
		
	
$hisWin="10";
$hisState="4"; //b-additional anim bonus / 3-win-take-or-gamble	/5-normal bonus next/ 7 -gamble / 4- normal
//&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bellsonfirerombo_freeGames2']."&".$_SESSION['bellsonfirerombo_freeGames']."&".$_SESSION['bellsonfirerombo_freeGamesBank']
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
$_SESSION['bellsonfirerombo_freeGames2']=$hisTmp2[4];
$_SESSION['bellsonfirerombo_freeGames']=$hisTmp2[5];
$_SESSION['bellsonfirerombo_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['bellsonfirerombo_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bellsonfirerombo_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="5";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bellsonfirerombo_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['bellsonfirerombo_freeGames2']=$hisTmp2[4];
$_SESSION['bellsonfirerombo_freeGames']=$hisTmp2[5];
$_SESSION['bellsonfirerombo_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['bellsonfirerombo_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bellsonfirerombo_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="b";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bellsonfirerombo_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame_end"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['bellsonfirerombo_freeGames2']=$hisTmp2[4];
$_SESSION['bellsonfirerombo_freeGames']=$hisTmp2[5];
$_SESSION['bellsonfirerombo_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['bellsonfirerombo_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bellsonfirerombo_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="c";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['bellsonfirerombo_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

}/////demo	
		
	
	$rtn="052290047027036714582777346541611542144474272422d7856375670635732145799996357666655553333365652382574567540374867412266677999996605777777555552222284433322c3475607237758431475257499992666611111146666323002573674654816362077305463744136651827377399955552290470270368714578273465417614154214474272422d7856375670635732145799996357666655553333365652149999999999999999999922c347560723775843147525749999266661111114666632300257367465481636207730546374413665182737739995550".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."08".$f2.$f1."101010101008080b1100".$hisReel."000000000000000013".$betString."09101010101010101010";
	
	
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
	

$rndR=rand(2,2);
$rHex=dechex($rndR);	
$rtnReels.=strlen($rHex).$rHex;		
	}
	
	
	$_SESSION['dcard_bellsonfirerombo']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."";
	
	
	$rtn="100010".$rtnBalance."10".$rtnReels."00081010101010101010101010091010101010101010101010".$_SESSION['dcard_bellsonfirerombo']."f15fffff15fffff15fffff15fffff";
	 set_stat_game($userId, $user_balance, 0,0,"state_bellsonfirerombo");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_bellsonfirerombo'])){
$_SESSION['dcard_bellsonfirerombo']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.20, 0.30, 0.40, 0.50, 1.00, 1.50, 2.00, 2.50, 3.00, 4.00, 5.00);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*1;
	$gBet=$gBet/10;
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'bellsonfirerombo',$allbet,"spin");
	
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
	  
$psym[0]=array(0,0,0,20,50,100);
$psym[1]=array(0,0,0,10,20,50);
$psym[2]=array(0,0,0,5,10,20);
$psym[3]=array(0,0,0,5,10,20);
$psym[4]=array(0,0,0,2,4,8);
$psym[5]=array(0,0,0,2,4,8);
$psym[6]=array(0,0,0,1,2,3);
$psym[7]=array(0,0,0,1,2,3);
$psym[8]=array(0,0,0,2,10,50);
$psym[9]=array(0,0,0,0,0,0);
    /*lines*/
	
 $lin=array();
  $lin[0]=array(1,4,7,10,13);
 $lin[1]=array(0,3,6,9,12);
 $lin[2]=array(2,5,8,11,14);
 
 $lin[3]=array(0,4,8,10,12);
 $lin[4]=array(2,4,6,10,14);
 
 $lin[5]=array(0,3,7,9,12);
 $lin[6]=array(2,5,7,11,14);
      
$lin[7]=array(1,3,6,9,13);	    
$lin[8]=array(1,5,8,11,13);	

 $lin[9]=array(0,4,7,10,12);
	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(0, 0, 4, 7, 0, 2, 7, 0, 3, 6, 7, 1, 4, 5, 8, 2, 7, 7, 7, 3, 4, 6, 5, 4, 1, 6, 1, 1, 5, 4, 2, 1, 4, 4, 4, 7, 4, 2, 7, 2, 4);
$r[1]=array(7, 8, 5, 6, 3, 7, 5, 6, 7, 0, 6, 3, 5, 7, 3, 2, 1, 4, 5, 7, 9, 9, 9, 9, 6, 3, 5, 7, 6, 6, 6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 6, 5, 6, 5);
$r[2]=array(2, 5, 7, 4, 5, 6, 7, 5, 4, 0, 3, 7, 4, 8, 6, 7, 4, 1, 2, 2, 6, 6, 6, 7, 7, 9, 9, 9, 9, 9, 6, 6, 0, 5, 7, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 8, 4, 4, 3, 3, 3);
$r[3]=array(3, 4, 7, 5, 6, 0, 7, 2, 3, 7, 7, 5, 8, 4, 3, 1, 4, 7, 5, 2, 5, 7, 4, 9, 9, 9, 9, 2, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 4, 6, 6, 6, 6, 3);
$r[4]=array(0, 2, 5, 7, 3, 6, 7, 4, 6, 5, 4, 8, 1, 6, 3, 6, 2, 0, 7, 7, 3, 0, 5, 4, 6, 3, 7, 4, 4, 1, 3, 6, 6, 5, 1, 8, 2, 7, 3, 7, 7, 3, 9, 9, 9, 5, 5, 5);	


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
	
	if($casbank <$gBet*5){
	$isWin=false;	
		
	}
	
	$loopCnt=0;
	
	while($isCalc){
	
	$loopCnt++;
	
	///////////////////////////////////reels position
$rp[0]=mt_rand(1,count($r[0])-2);

$rp[1]=mt_rand(1,count($r[1])-3);
$rp[2]=mt_rand(1,count($r[2])-2);
$rp[3]=mt_rand(1,count($r[3])-3);
$rp[4]=mt_rand(1,count($r[4])-2);



//create symbols map
$map=array();
	
for($i=0; $i<=4; $i++){

if($i==0 || $i==4){
	
array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	

}else if($i==1 || $i==3){
	
array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	
array_push($map,$r[$i][$rp[$i]+2]);	

}else{
array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);		
array_push($map,$r[$i][$rp[$i]+2]);		
array_push($map,$r[$i][$rp[$i]+3]);		
	
}
	


	
}
	
$wildsCnt=0;




	



	
	$wins=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	
	$wheelSym=array();
	

	
	
	
	
	for ( $ln = 0; $ln <= 7; ++$ln )
	        {
	 $wheelSym[$ln]=array(0,0,0,0,0);        
				$gg = 1;

	

for($ii=0;$ii<=2;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][0]++;

}


}
	
/*-------------------*/
	
for($ii=3;$ii<=6;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][1]++;

}


}	

/*-------------------*/

for($ii=7;$ii<=11;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][2]++;

}


}

/*-------------------*/

for($ii=12;$ii<=15;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][3]++;

}

}
/*-------------------*/

for($ii=16;$ii<=18;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild ){	
$wheelSym[$ln][4]++;

}

}

////////////////////////////////////

				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2];	
	
$wins[$ln]=$psym[$ln][3]*$mpl;	
}


/////////////////////////////////////
				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0 && $wheelSym[$ln][3]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2]*$wheelSym[$ln][3];	
	
$wins[$ln]=$psym[$ln][4]*$mpl;	
}
/////////////////////////////////////
				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0 && $wheelSym[$ln][3]>0 && $wheelSym[$ln][4]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2]*$wheelSym[$ln][3]*$wheelSym[$ln][4];	
	
$wins[$ln]=$psym[$ln][5]*$mpl;	
}


/////////////////////////////////////


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<8; $i++){

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

for($i=0; $i<=18;$i++){
	
if($map[$i]==8){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[8][$scatter_win]*$gBet*10);
$winall_r+=($psym[8][$scatter_win]*10);
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
 change_bank($user_id,'bellsonfirerombo',$winall*-1,"bonus");	
 }else{
change_bank($user_id,'bellsonfirerombo',$winall*-1,"spin");	 
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
	
	$_SESSION['bellsonfirerombo_freeGamesWin']=$winall;
	
	
	$str_winall=str_replace(".","",($winall*$conf['fmp'])."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_bellsonfirerombo']=$map;	
	
	
	$gameState="03";
    $freeInfo="101010101010101010101009";
	if($isBonus && $scatter_win>=3){
	
	$_SESSION['bellsonfirerombo_freeGames']=5;
	$_SESSION['bellsonfirerombo_freeGames2']=5;
	
	$_SESSION['bellsonfirerombo_freeGamesBank']=$gset['sum'];
	$hisState="freegame_start";
$gameState="05";	
	 $freeInfo="151510111010101010101009";	
	}
	
	$respinMap="";
	
	for($i=0; $i<=14;$i++){
	
    
	$respinMap.="10";	
	
	
	}
	
	
	
	
	/*-------------------------------*/
	
	$rtn="1".$gameState."0"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_bellsonfirerombo']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bellsonfirerombo_freeGames2']."&".$_SESSION['bellsonfirerombo_freeGames']."&".$_SESSION['bellsonfirerombo_freeGamesBank']."&".$rtnBalance;
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101009".$winstr."";
	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	$hisState="collect";	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101009".$winstr.$_SESSION['dcard_bellsonfirerombo'].$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bellsonfirerombo_freeGames2']."&".$_SESSION['bellsonfirerombo_freeGames']."&".$_SESSION['bellsonfirerombo_freeGamesBank']."&".$rtnBalance;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_bellsonfirerombo");
	ge_serv_show_str($rtn);		
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_bellsonfirerombo'])){
$_SESSION['dcard_bellsonfirerombo']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.20, 0.30, 0.40, 0.50, 1.00, 1.50, 2.00, 2.50, 3.00, 4.00, 5.00);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*10;
	$gBet=$gBet/1;
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	// cange_balance($userId, $allbet*-1);
	// change_bank($user_id,'bellsonfirerombo',$allbet,"spin");
	
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
	  
	$psym[0]=array(0,0,0,20,50,100);
$psym[1]=array(0,0,0,10,20,50);
$psym[2]=array(0,0,0,5,10,20);
$psym[3]=array(0,0,0,5,10,20);
$psym[4]=array(0,0,0,2,4,8);
$psym[5]=array(0,0,0,2,4,8);
$psym[6]=array(0,0,0,1,2,3);
$psym[7]=array(0,0,0,1,2,3);
$psym[8]=array(0,0,0,2,10,50);
$psym[9]=array(0,0,0,0,0,0);
    /*lines*/
		  
    /*lines*/
	
 $lin=array();
  $lin[0]=array(1,4,7,10,13);
 $lin[1]=array(0,3,6,9,12);
 $lin[2]=array(2,5,8,11,14);
 
 $lin[3]=array(0,4,8,10,12);
 $lin[4]=array(2,4,6,10,14);
 
 $lin[5]=array(0,3,7,9,12);
 $lin[6]=array(2,5,7,11,14);
      
$lin[7]=array(1,3,6,9,13);	    
$lin[8]=array(1,5,8,11,13);	

 $lin[9]=array(0,4,7,10,12);
	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(0, 4, 7, 0, 2, 7, 0, 3, 6, 8, 7, 1, 4, 5, 7, 8, 2, 7, 3, 4, 6, 5, 4, 1, 7, 6, 1, 4, 1, 5, 4, 2, 1, 4, 4, 7, 4, 2, 7, 2, 4);
$r[1]=array(7, 8, 5, 6, 3, 7, 5, 6, 7, 0, 6, 3, 5, 7, 3, 2, 1, 4, 5, 7, 9, 9, 9, 9, 6, 3, 5, 7, 6, 6, 6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 6, 5, 6, 5);
$r[2]=array(9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9);
$r[3]=array(3, 4, 7, 5, 6, 0, 7, 2, 3, 7, 7, 5, 8, 4, 3, 1, 4, 7, 5, 2, 5, 7, 4, 9, 9, 9, 9, 2, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 4, 6, 6, 6, 6, 3);
$r[4]=array(0, 2, 5, 7, 3, 6, 7, 4, 6, 5, 4, 8, 1, 6, 3, 6, 2, 0, 7, 7, 3, 0, 5, 4, 6, 3, 7, 4, 4, 1, 3, 6, 6, 5, 1, 8, 2, 7, 3, 7, 7, 3, 9, 9, 9, 5, 5, 5);	


$bonusR1Pos=array(1,5,9,13,17,21,29,33);
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
		$casbank = $_SESSION['_freeGamesBank']; 
		$casbank = $_SESSION['bellsonfirerombo_freeGamesBank']; 
		$casbank_full=get_bank($user_id,'bellsonfirerombo',"bonus");	
		if($_SESSION['bellsonfirerombo_freeGamesBank']<0){
			$_SESSION['bellsonfirerombo_freeGamesBank']=0;
		}
		if($casbank_full<$casbank){
		$casbank=$casbank_full;
		}else{
		$casbank = $_SESSION['bellsonfirerombo_freeGamesBank']; 	
		}
		$winRand=rand(1,2);
	
	if($winRand==1){
	
$isWin=true;	
		
	}
	
	
	$bRand=rand(1,50);
	
	if($bRand==1){
	
$isBonus=true;	
		
	}
	$_SESSION['bellsonfirerombo_freeGames']--;
	
	
		////////////////////////////////////game_setting
	
	
	
	$isCalc=true;
	
	if($casbank <$gBet*5){ $isWin=false;
		
		
	}
	
	$loopCnt=0;
	
	while($isCalc){
	
	$loopCnt++;
	
	///////////////////////////////////reels position
$rp[0]=mt_rand(1,count($r[0])-2);

$rp[1]=mt_rand(1,count($r[1])-3);
$rp[2]=mt_rand(1,count($r[2])-2);
$rp[3]=mt_rand(1,count($r[3])-3);
$rp[4]=mt_rand(1,count($r[4])-2);



//create symbols map
$map=array();
	
for($i=0; $i<=4; $i++){

if($i==0 || $i==4){
	
array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	

}else if($i==1 || $i==3){
	
array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	
array_push($map,$r[$i][$rp[$i]+2]);	

}else{
array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);		
array_push($map,$r[$i][$rp[$i]+2]);		
array_push($map,$r[$i][$rp[$i]+3]);		
	
}
	


	
}
	
$wildsCnt=0;




	



	
	$wins=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	
	$wheelSym=array();
	

	
	
	
	
	for ( $ln = 0; $ln <= 7; ++$ln )
	        {
	 $wheelSym[$ln]=array(0,0,0,0,0);        
				$gg = 1;

	

for($ii=0;$ii<=2;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][0]++;

}


}
	
/*-------------------*/
	
for($ii=3;$ii<=6;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][1]++;

}


}	

/*-------------------*/

for($ii=7;$ii<=11;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][2]++;

}


}

/*-------------------*/

for($ii=12;$ii<=15;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][3]++;

}

}
/*-------------------*/

for($ii=16;$ii<=18;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild ){	
$wheelSym[$ln][4]++;

}

}

////////////////////////////////////

				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2];	
	
$wins[$ln]=$psym[$ln][3]*$mpl;	
}


/////////////////////////////////////
				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0 && $wheelSym[$ln][3]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2]*$wheelSym[$ln][3];	
	
$wins[$ln]=$psym[$ln][4]*$mpl;	
}
/////////////////////////////////////
				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0 && $wheelSym[$ln][3]>0 && $wheelSym[$ln][4]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2]*$wheelSym[$ln][3]*$wheelSym[$ln][4];	
	
$wins[$ln]=$psym[$ln][5]*$mpl;	
}


/////////////////////////////////////
	
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<8; $i++){

if($wins[$i]>0 ){
$winall+=($wins[$i]*$gBet*1);
$winall_r+=$wins[$i]*1;
$whex=dechex($wins[$i]);	
$winstr.=strlen($whex).$whex;
}else{
$winstr.="10";	
}	
	
}	



$scatter_win=0;

for($i=0; $i<=18;$i++){
	
if($map[$i]==8){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[8][$scatter_win]*$gBet*10)*1;
$winall_r+=$psym[8][$scatter_win]*1;
$whex=dechex($psym[8][$scatter_win]*1);	
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
	
	if($isBonus && $scatter_win<3){
	$isCalc=true;		
	}
	
	if(!$isBonus && $scatter_win>2){
	$isCalc=true;		
	}
	
	if($isBonus && $scatter_win>=3){
	$isCalc=false;		
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
 change_bank($user_id,'bellsonfirerombo',$winall*-1,"bonus");	
$_SESSION['bellsonfirerombo_freeGamesBank']-=	$winall;
	
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
	
	$_SESSION['bellsonfirerombo_freeGamesWin']+=$winall;
	//$winall_r=$_SESSION['bellsonfirerombo_freeGamesWin'];
	$hisWin=$_SESSION['bellsonfirerombo_freeGamesWin'];
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_bellsonfirerombo']=$map;	
	
	
	$gameState="06";
    
	if($_SESSION['bellsonfirerombo_freeGames']<=0){
	$hisState="freegame_end";
$gameState="0c";	
		
	}
	
	$respinMap="";
	
	
	
	
	for($i=0; $i<=14;$i++){
	
    
	$respinMap.="10";	
	
	
	}
	
	$ww="10";
	
	if($winall>0){
	
$ww="19";	
		
	}
	
	
	if($scatter_win>=3){
	$_SESSION['bellsonfirerombo_freeGames']+=5;	
	$_SESSION['bellsonfirerombo_freeGames2']+=5;	
	$gameState="0a";
	}
	
	$freeRH=dechex($_SESSION['bellsonfirerombo_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['bellsonfirerombo_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
	 $freeInfo=$freeR2.$freeR.$ww."111010".$rtnReels."09";	
	/*-------------------------------*/
	$winall2=$_SESSION['bellsonfirerombo_freeGamesWin']*$conf['fmp'];
	$str_winall=str_replace(".","",$winall2."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	
	$rtn="1".$gameState."0"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_bellsonfirerombo']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bellsonfirerombo_freeGames2']."&".$_SESSION['bellsonfirerombo_freeGames']."&".$_SESSION['bellsonfirerombo_freeGamesBank']."&".$_SESSION['double_balance'];
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101009".$winstr."";
	//$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$_SESSION['bellsonfirerombo_freeGamesWin'];
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101009".$winstr.$_SESSION['dcard_bellsonfirerombo'].$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['bellsonfirerombo_freeGames2']."&".$_SESSION['bellsonfirerombo_freeGames']."&".$_SESSION['bellsonfirerombo_freeGamesBank']."&".$_SESSION['double_balance'];
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_bellsonfirerombo");
	ge_serv_show_str($rtn);			
			
		
	}	
	function FinishSpin(){
	global $room,$conf, $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_bellsonfirerombo'];
	$userId=$user_id;
 $_SESSION['dcard_bellsonfirerombo']=$dc;
		
		
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
		
	$casbank=get_bank($user_id,'bellsonfirerombo',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'bellsonfirerombo',$winall,"double");	
		
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
	
	
	
	$doubleCards=$_SESSION['dcard_bellsonfirerombo'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000910101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'bellsonfirerombo',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1070"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	$_SESSION['dcard_bellsonfirerombo']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_bellsonfirerombo"); 
	
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
	
	$doubleCards=$_SESSION['dcard_bellsonfirerombo'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1080"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_bellsonfirerombo");
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

      
		$rtn=GetSpin($st2[2],9);
		

	   } 
	   
	    if($st2[0]=="256"){

      
		$rtn=GetRespin($st2[2],1);
		

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
