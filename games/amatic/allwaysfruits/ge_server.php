   <?php

error_reporting(0);

include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';


$str=$_GET['ddd']; if($conf['float_bet']==1){$conf['fmp']=100;	}else{$conf['fmp']=1;}

$action="spin";

//simon --don`t need in really
$conf['bets'] ='0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.6,0.8,1.0,2.0,3.0,4.0,5.0';


	function GetReels(){
		
	global $room,$conf, $conf,$userId,$user_id,$demomode;
	

$betsArr=explode(",",$conf['bets']);
$betString="";

for($b=0; $b<count($betsArr); $b++){
	$betsArr[$b]=$betsArr[$b]*$conf['fmp'];
$betString.=strlen(dechex($betsArr[$b])).dechex($betsArr[$b]);	
}
$minBets.=strlen(dechex($betsArr[0])).dechex($betsArr[0]);	
$maxBets.=strlen(dechex($betsArr[count($betsArr)-1])).dechex($betsArr[count($betsArr)-1]);	

	
		
		

$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE room_id='$room' AND  g_name='allwaysfruits'"));
$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
		
	$rtn="052291753724067485694526784516734576456847546522d26714350746375279456456745671364256347147256522f7358643751726049612734612534567456745712534871623c542706371435249261435671234567567456172435637152435760476273233734172483670526954156012345167845071627342586273143521617853724063756946821452146207143507146352794021973586437017826049524164582174257063761435249263567521a73415248734670652698514538000101010101010427101000".$minBets.$maxBets."a101010101010100a0a01110010101010100000000000000000".$betsLength.$betString."0b1010101010101010101010#00101010&";
	////////////////////////////////////////  

$hisWin="10";
$hisState="4"; //b-additional anim bonus / 3-win-take-or-gamble	/5-normal bonus next/ 7 -gamble / 4- normal
//&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['allwaysfruits_freeGames2']."&".$_SESSION['allwaysfruits_freeGames']."&".$_SESSION['allwaysfruits_freeGamesBank']
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
////$hisBalance=$hisTmp2[7];
$_SESSION['allwaysfruits_freeGames2']=$hisTmp2[4];
$_SESSION['allwaysfruits_freeGames']=$hisTmp2[5];
$_SESSION['allwaysfruits_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['allwaysfruits_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['allwaysfruits_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="5";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['allwaysfruits_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['allwaysfruits_freeGames2']=$hisTmp2[4];
$_SESSION['allwaysfruits_freeGames']=$hisTmp2[5];
$_SESSION['allwaysfruits_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['allwaysfruits_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['allwaysfruits_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="b";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['allwaysfruits_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame_end"){
$hisReel=$hisTmp2[2];	
////$hisBalance=$hisTmp2[7];
$_SESSION['allwaysfruits_freeGames2']=$hisTmp2[4];
$_SESSION['allwaysfruits_freeGames']=$hisTmp2[5];
$_SESSION['allwaysfruits_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['allwaysfruits_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['allwaysfruits_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="c";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['allwaysfruits_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

}/////demo
	
	$rtn="0522b36587936145a6784367a8423746047567158675034522912304586781923408348a48341231204201348120228578692157082567823647867856756825675678a22904586784971235617234567856781256378345678227123546781523145672832456978234678102134522c36587936145a6784367a84237460475671586750345922a12304586781923408348a4834123120420134891202295786921570825678236478678567568256975678a229045867849712356172345678567812563783456782271235467815231456728324569782346781021340".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."09".$f2.$f1."10101010100909091100".$hisReel."000000000000000010".$betString."0910101010101010101010";
	
	
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
	
	
	$_SESSION['dcard_allwaysfruits']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."";
	
	
	$rtn="100010".$rtnBalance."10".$rtnReels."000910101010101010101010100a1010101010101010101010".$_SESSION['dcard_allwaysfruits']."f15fffff15fffff15fffff15fffff";
	 set_stat_game($userId, $user_balance, 0,0,"state_allwaysfruits");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_allwaysfruits'])){
$_SESSION['dcard_allwaysfruits']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
		$betsArr=explode(",",$conf['bets']);//(0.20, 0.30, 0.40, 0.50, 1.00, 1.50, 2.00, 2.50, 3.00, 4.00, 5.00);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'allwaysfruits',$allbet,"spin");
	
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
	  
$psym[0]=array(0,0,0,10,50,500);
$psym[1]=array(0,0,0,7,25,100);
$psym[2]=array(0,0,0,5,10,20);
$psym[3]=array(0,0,0,3,5,10);
$psym[4]=array(0,0,0,3,5,10);
$psym[5]=array(0,0,0,2,4,8);
$psym[6]=array(0,0,0,2,4,8);
$psym[7]=array(0,0,0,2,4,8);
$psym[8]=array(0,0,0,1,2,5);
$psym[9]=array(0,0,0,5,25,50);
$psym[10]=array(0,0,0,0,0,0);
    /*lines*/
	
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
        $lin[10]=array(2,4,8,10,14);
        $lin[11]=array(0,4,6,10,12);
        $lin[12]=array(2,4,7,10,14);

        $lin[13]=array(1,3,7,9,13);
        $lin[14]=array(1,5,7,11,13);

        $lin[15]=array(1,4,6,10,13);
        $lin[16]=array(1,4,8,10,13);

        $lin[17]=array(0,5,6,11,12);
        $lin[18]=array(2,3,8,9,14);

        $lin[19]=array(1,3,8,9,13);
	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(3, 6, 5, 8, 7, 9, 3, 6, 1, 4, 5, 10, 6, 7, 8, 4, 3, 6, 7, 10, 8, 4, 2, 3, 7, 4, 6, 0, 4, 7, 5, 6, 7, 1, 5, 8, 6, 7, 5, 0, 3, 4, 5);
$r[1]=array(1, 2, 3, 0, 4, 5, 8, 6, 7, 8, 1, 9, 2, 3, 4, 0, 8, 3, 4, 8, 10, 4, 8, 3, 4, 1, 2, 3, 1, 2, 0, 4, 2, 0, 1, 3, 4, 8, 1, 2, 0);
$r[2]=array(5, 7, 8, 6, 9, 2, 1, 5, 7, 0, 8, 2, 5, 6, 7, 8, 2, 3, 6, 4, 7, 8, 6, 7, 8, 5, 6, 7, 5, 6, 8, 2, 5, 6, 7, 5, 6, 7, 8, 10);
$r[3]=array(0, 4, 5, 8, 6, 7, 8, 4, 9, 7, 1, 2, 3, 5, 6, 1, 7, 2, 3, 4, 5, 6, 7, 8, 5, 6, 7, 8, 1, 2, 5, 6, 3, 7, 8, 3, 4, 5, 6, 7, 8);
$r[4]=array(1, 2, 3, 5, 4, 6, 7, 8, 1, 5, 2, 3, 1, 4, 5, 6, 7, 2, 8, 3, 2, 4, 5, 6, 9, 7, 8, 2, 3, 4, 6, 7, 8, 1, 0, 2, 1, 3, 4);	


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
	
	if($casbank <$gBet*2){
	$isWin=false;	
	$isBonus=false;	
		
	}
	
	$loopCnt=0;
	
	while($isCalc){
	
	$loopCnt++;
	
	///////////////////////////////////reels position
$rp[0]=mt_rand(1,count($r[0])-2);

$rp[1]=mt_rand(1,count($r[1])-2);
$rp[2]=mt_rand(1,count($r[2])-2);
$rp[3]=mt_rand(1,count($r[3])-2);
$rp[4]=mt_rand(1,count($r[4])-2);



//create symbols map
$map=array();
	
for($i=0; $i<=4; $i++){

array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	

	


	
}
	
$wildsCnt=0;




	



	

	$wins=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	
	$wheelSym=array();
	
	$isDouble=1;
	
	
	for($d=0;$d<=14;$d++){
	

if($map[$d]==10){
$isDouble=2;	
}
	
	}
	
	/*-----------------*/
	
	for ( $ln = 0; $ln <= 8; ++$ln )
	        {
	 $wheelSym[$ln]=array(0,0,0,0,0);        
				$gg = 1;

	

for($ii=0;$ii<=2;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][0]++;

}


}
	
/*-------------------*/
	
for($ii=3;$ii<=5;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][1]++;

}


}	

/*-------------------*/

for($ii=6;$ii<=8;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][2]++;

}


}

/*-------------------*/

for($ii=9;$ii<=11;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][3]++;

}

}
/*-------------------*/

for($ii=12;$ii<=14;$ii++){
	
if($map[$ii]==$ln || $map[$ii]==$wild){	
$wheelSym[$ln][4]++;

}

}
/*-------------------*/


////////////////////////////////////

				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2];	
	
$wins[$ln]=$psym[$ln][3]*$mpl*$isDouble;	
}


/////////////////////////////////////
				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0 && $wheelSym[$ln][3]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2]*$wheelSym[$ln][3];	
	
$wins[$ln]=$psym[$ln][4]*$mpl*$isDouble;	
}
/////////////////////////////////////
				
if($wheelSym[$ln][0]>0 && $wheelSym[$ln][1]>0 && $wheelSym[$ln][2]>0 && $wheelSym[$ln][3]>0 && $wheelSym[$ln][4]>0){
	
$mpl=$wheelSym[$ln][0]*$wheelSym[$ln][1]*$wheelSym[$ln][2]*$wheelSym[$ln][3]*$wheelSym[$ln][4];	
	
$wins[$ln]=$psym[$ln][5]*$mpl*$isDouble;	
}
/////////////////////////////////////


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<9; $i++){

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

for($i=0; $i<=14;$i++){
	
if($map[$i]==9){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[9][$scatter_win]*$gBet*$lines);
$winall_r+=($psym[9][$scatter_win]*$lines);
$whex=dechex($psym[9][$scatter_win]);	
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
 change_bank($user_id,'allwaysfruits',$winall*-1,"bonus");	
 	
 }else{
change_bank($user_id,'allwaysfruits',$winall*-1,"spin");	 
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
	
	$_SESSION['allwaysfruits_freeGamesWin']=$winall;
	
	
	$str_winall=str_replace(".","",($winall*$conf['fmp'])."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_allwaysfruits']=$map;	
	
	
	$gameState="03";
    $freeInfo="10101010101010101010100a";
	if($isBonus && $scatter_win>=3){
	$hisState="freegame_start";
	if($scatter_win==3){
	$_SESSION['allwaysfruits_freeGames']=7;
	$_SESSION['allwaysfruits_freeGames2']=7;
	}else if($scatter_win==4){
	$_SESSION['allwaysfruits_freeGames']=10;
	$_SESSION['allwaysfruits_freeGames2']=10;
	}else{
	$_SESSION['allwaysfruits_freeGames']=15;
	$_SESSION['allwaysfruits_freeGames2']=15;
	}
	
	$_SESSION['allwaysfruits_freeGamesBank']=$gset['sum'];
	
$gameState="05";	
	 $freeInfo="1".dechex($_SESSION['allwaysfruits_freeGames2'])."1".dechex($_SESSION['allwaysfruits_freeGames'])."1011101010101010100a";	
	}
	
	$respinMap="";
	
	for($i=0; $i<=14;$i++){
	
    
	$respinMap.="10";	
	
	
	}
	
	
	
	
	/*-------------------------------*/
	
	$rtn="1".$gameState."0"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_allwaysfruits']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['allwaysfruits_freeGames2']."&".$_SESSION['allwaysfruits_freeGames']."&".$_SESSION['allwaysfruits_freeGamesBank']."&".$rtnBalance;
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."10101010101010101010100a".$winstr."";
	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	$hisState="collect";
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."10101010101010101010100a".$winstr.$_SESSION['dcard_allwaysfruits'].$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['allwaysfruits_freeGames2']."&".$_SESSION['allwaysfruits_freeGames']."&".$_SESSION['allwaysfruits_freeGamesBank']."&".$rtnBalance;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_allwaysfruits");
	ge_serv_show_str($rtn);			
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_allwaysfruits'])){
$_SESSION['dcard_allwaysfruits']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
		$betsArr=explode(",",$conf['bets']);//(0.20, 0.30, 0.40, 0.50, 1.00, 1.50, 2.00, 2.50, 3.00, 4.00, 5.00);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	// cange_balance($userId, $allbet*-1);
	// change_bank($user_id,'allwaysfruits',$allbet,"spin");
	
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
		  
$psym[0]=array(0,0,0,10,50,500);
$psym[1]=array(0,0,0,7,25,100);
$psym[2]=array(0,0,0,5,10,20);
$psym[3]=array(0,0,0,3,5,10);
$psym[4]=array(0,0,0,3,5,10);
$psym[5]=array(0,0,0,2,4,8);
$psym[6]=array(0,0,0,2,4,8);
$psym[7]=array(0,0,0,2,4,8);
$psym[8]=array(0,0,0,1,2,5);
$psym[9]=array(0,0,0,5,25,50);
$psym[10]=array(0,0,0,0,0,0);
		  
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
        $lin[10]=array(2,4,8,10,14);
        $lin[11]=array(0,4,6,10,12);
        $lin[12]=array(2,4,7,10,14);

        $lin[13]=array(1,3,7,9,13);
        $lin[14]=array(1,5,7,11,13);

        $lin[15]=array(1,4,6,10,13);
        $lin[16]=array(1,4,8,10,13);

        $lin[17]=array(0,5,6,11,12);
        $lin[18]=array(2,3,8,9,14);

        $lin[19]=array(1,3,8,9,13);

	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(3, 6, 5, 8, 7, 9, 3, 6, 1, 4, 5, 10, 6, 7, 8, 4, 3, 6, 7, 10, 8, 4, 2, 3, 7, 4, 6, 0, 4, 7, 5, 6, 7, 1, 5, 8, 6, 7, 5, 0, 3, 4, 5, 9);
$r[1]=array(1, 2, 3, 0, 4, 5, 8, 6, 7, 8, 1, 9, 2, 3, 4, 0, 8, 3, 4, 8, 10, 4, 8, 3, 4, 1, 2, 3, 1, 2, 0, 4, 2, 0, 1, 3, 4, 8, 9, 1, 2, 0);
$r[2]=array(5, 7, 8, 6, 9, 2, 1, 5, 7, 0, 8, 2, 5, 6, 7, 8, 2, 3, 6, 4, 7, 8, 6, 7, 8, 5, 6, 7, 5, 6, 8, 2, 5, 6, 9, 7, 5, 6, 7, 8, 10);
$r[3]=array(0, 4, 5, 8, 6, 7, 8, 4, 9, 7, 1, 2, 3, 5, 6, 1, 7, 2, 3, 4, 5, 6, 7, 8, 5, 6, 7, 8, 1, 2, 5, 6, 3, 7, 8, 3, 4, 5, 6, 7, 8);
$r[4]=array(1, 2, 3, 5, 4, 6, 7, 8, 1, 5, 2, 3, 1, 4, 5, 6, 7, 2, 8, 3, 2, 4, 5, 6, 9, 7, 8, 2, 3, 4, 6, 7, 8, 1, 0, 2, 1, 3, 4);	


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
		$isWin=true;
		} 
		$casbank = $_SESSION['allwaysfruits_freeGamesBank']; 
		$casbank_full=get_bank($user_id,'allwaysfruits',"bonus");	
		if($_SESSION['allwaysfruits_freeGamesBank']<0){
			$_SESSION['allwaysfruits_freeGamesBank']=0;
		}
		if($casbank_full<$casbank){
		$casbank=$casbank_full;
		}else{
		$casbank = $_SESSION['allwaysfruits_freeGamesBank']; 	
		}
		$winRand=rand(1,2);
	
	if($winRand==1){
	
$isWin=true;	
		
	}
	$bRand=rand(1,50);
	
	if($bRand==1){
	
$isBonus=true;	
		
	}
	$_SESSION['allwaysfruits_freeGames']--;
	
	
		////////////////////////////////////game_setting
	
	
	
	$isCalc=true;
	
	if($casbank <$gBet*5){ $isWin=false;
		
		
	}
	
	$loopCnt=0;
	
	while($isCalc){
	
	$loopCnt++;
	
	///////////////////////////////////reels position
$rp[0]=mt_rand(1,count($r[0])-2);

$rp[1]=mt_rand(1,count($r[1])-2);
$rp[2]=mt_rand(1,count($r[2])-2);
$rp[3]=mt_rand(1,count($r[3])-2);
$rp[4]=mt_rand(1,count($r[4])-2);



//create symbols map
$map=array();
	
for($i=0; $i<=4; $i++){

array_push($map,$r[$i][$rp[$i]-1]);	
array_push($map,$r[$i][$rp[$i]]);
array_push($map,$r[$i][$rp[$i]+1]);	

	


	
}
	
$wildsCnt=0;




	




	

	$wins=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	
	$wheelSym=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	
	$isDouble=1;
	
	
	for($d=0;$d<=14;$d++){
	

if($map[$d]==10){
$isDouble=2;	
}
	
	}
	
	/*-----------------*/
	
	for ( $ln = 0; $ln <= 8; $ln++ )
	        {
				
	$wheelSym[$ln]=0;			
				
	for($i=0; $i<=14;$i++){
	
if($map[$i]==$ln){
$wheelSym[$ln]++;	
}
	
}

////////////////////////////////////


if($wheelSym[$ln]>=3){
	
$wins[$ln]=$psym[$ln][$wheelSym[$ln]]*$isDouble;	

}

/////////////////////////////////////


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<9; $i++){

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

for($i=0; $i<=14;$i++){
	
if($map[$i]==9){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[9][$scatter_win]*$gBet*1)*1;
$winall_r+=$psym[9][$scatter_win]*1;
$whex=dechex($psym[9][$scatter_win]*1);	
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
	
	if(!$isBonus && $scatter_win>2){
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
	$hisState="freegame";
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'allwaysfruits',$winall*-1,"bonus");	
$_SESSION['allwaysfruits_freeGamesBank']-=	$winall;
	
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
	
	$_SESSION['allwaysfruits_freeGamesWin']+=$winall;
	//$winall_r=$_SESSION['allwaysfruits_freeGamesWin'];
	$hisWin=$_SESSION['allwaysfruits_freeGamesWin'];
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_allwaysfruits']=$map;	
	
	
	$gameState="06";
    
	if($_SESSION['allwaysfruits_freeGames']<=0){
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
	
	
	
	
	if($scatter_win>=3 && $isBonus){
	$gameState="0a";
	
	
	if($scatter_win==3){
	$_SESSION['allwaysfruits_freeGames']+=7;
	$_SESSION['allwaysfruits_freeGames2']+=7;
	}else if($scatter_win==4){
	$_SESSION['allwaysfruits_freeGames']+=10;
	$_SESSION['allwaysfruits_freeGames2']+=10;
	}else{
	$_SESSION['allwaysfruits_freeGames']+=15;
	$_SESSION['allwaysfruits_freeGames2']+=15;
	}
	
	}
	
	$freeRH=dechex($_SESSION['allwaysfruits_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['allwaysfruits_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
	
	 $freeInfo=$freeR2.$freeR.$ww."111010".$rtnReels."0a";	
	/*-------------------------------*/
	$winall2=$_SESSION['allwaysfruits_freeGamesWin']*$conf['fmp'];
	$str_winall=str_replace(".","",$winall2."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	
	$rtn="1".$gameState."0"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_allwaysfruits']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['allwaysfruits_freeGames2']."&".$_SESSION['allwaysfruits_freeGames']."&".$_SESSION['allwaysfruits_freeGamesBank']."&".$_SESSION['double_balance'];
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."10101010101010101010100a".$winstr."";
	//$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$_SESSION['allwaysfruits_freeGamesWin'];
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."10101010101010101010100a".$winstr.$_SESSION['dcard_allwaysfruits'].$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['allwaysfruits_freeGames2']."&".$_SESSION['allwaysfruits_freeGames']."&".$_SESSION['allwaysfruits_freeGamesBank']."&".$_SESSION['double_balance'];
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_allwaysfruits");
	ge_serv_show_str($rtn);			
			
		
	}	
	function FinishSpin(){
	global $room,$conf, $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_allwaysfruits'];
	$userId=$user_id;
 $_SESSION['dcard_allwaysfruits']=$dc;
		
		
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
		
	$casbank=get_bank($user_id,'allwaysfruits',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'allwaysfruits',$winall,"double");	
		
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
	
	
	
	$doubleCards=$_SESSION['dcard_allwaysfruits'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000910101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'allwaysfruits',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1070"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	$_SESSION['dcard_allwaysfruits']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_allwaysfruits"); 
	
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
	
	$doubleCards=$_SESSION['dcard_allwaysfruits'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1080"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_allwaysfruits");
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

      
		$rtn=GetSpin($st2[2],1);
		

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
