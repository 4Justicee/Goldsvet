<?php
error_reporting(0);
include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';



$action="spin";



$jp1=0;
$jp2=8;
$jp3=0;
$jp4=8;
	
GetJackpots();



	

	
	/*------------------------------------------------------------*/
	/*-----------------------  INIT ----------------------------*/
	/*----------------------------------------------------------- */
	
	function InitGame(){
		
$_SESSION['greategypt_fsc']=0;
		
	global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	return '{"sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp":'.time().', "qName": "app.services.messages.response.LoginResponse", "currency": "EUR", "multigame": true, "groups": ["all", "myGames", "fruit", "classic", "multiline", "extraline", "diceSlots", "keno", "roulette", "cards"], "showRtp": false, "autoplayLimit": 0, "playerName": "egt01", "languages": ["ro", "nl", "it", "bg", "en", "es", "ru", "fr", "go"], "complex": {"GEJSlot": [{"mlmJackpot": true, "recovery": "norecovery", "gameName": "Dragon Reels", "featured": false, "groups": [{"name": "all", "order": 16}, {"name": "fruit", "order": 5}, {"name": "classic", "order": 31}, {"name": "multiline", "order": 35}, {"name": "extraline", "order": 22}, {"name": "diceSlots", "order": 29}, {"name": "keno", "order": 16}, {"name": "roulette", "order": 16}, {"name": "cards", "order": 19}, {"name": "myGames", "order": 17}], "totalBet": 0, "gameIdentificationNumber": 1}]}, "command": "login", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.'}';	

	
	 //set_stat_game($userId, $user_balance, 0,0,"state_greategypt");
	return $rtn;	
	}
	
	function SpinGame(){
	global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4;	
	
	$userId=$user_id;
	
	$gBet=$_GET['bet'];
	$lines=$_GET['lines'];
	$allbet=($gBet*$lines)/100;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	if(!isset($_SESSION['greategypt_fsc'])){
	$_SESSION['greategypt_fsc']=0;	
	}
	
	if($_SESSION['greategypt_fsc']<=0){
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'aztecsecret',$allbet,"spin");
	}
	////////////////////////////////
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$wild=9;
	$scatter=10;
	
	/*-----lines--------*/
	
	$linesId=array();
	
	$linesId[0]=array(1,1,1,1,1);
	$linesId[1]=array(0,0,0,0,0);
	$linesId[2]=array(2,2,2,2,2);
	
	$linesId[3]=array(0,1,2,1,0);
	$linesId[4]=array(2,1,0,1,2);
	
	$linesId[5]=array(0,0,1,2,2);
	$linesId[6]=array(2,2,1,0,0);
	
	$linesId[7]=array(1,0,0,0,1);
	$linesId[8]=array(1,2,2,2,1);
	
	$linesId[9]=array(0,1,1,1,0);
	$linesId[10]=array(2,1,1,1,2);
	
	$linesId[12]=array(1,0,1,2,1);
	$linesId[11]=array(0,2,1,0,1);
	
	$linesId[13]=array(0,1,0,1,0);
	$linesId[14]=array(2,1,2,1,2);
	
	$linesId[15]=array(1,1,0,1,1);
	$linesId[16]=array(1,1,2,1,1);
	
	$linesId[17]=array(0,2,0,2,0);
	$linesId[18]=array(2,0,2,0,2);
	
	$linesId[19]=array(1,0,2,0,1);
	$linesId[20]=array(1,2,0,2,1);
	
	$linesId[21]=array(0,0,2,0,0);
	$linesId[22]=array(2,2,0,2,2);
	
	$linesId[23]=array(0,2,2,2,0);
	$linesId[24]=array(2,0,0,0,2);
	
	
	
	$ptb[0]=array(0,0,0,10,20,100);
	$ptb[1]=array(0,0,0,10,20,100);
	$ptb[2]=array(0,0,0,10,20,100);
	$ptb[3]=array(0,0,0,10,20,100);
	$ptb[4]=array(0,0,0,10,20,100);
	
	$ptb[5]=array(0,0,0,10,40,200);
	$ptb[6]=array(0,0,0,10,50,200);

	$ptb[7]=array(0,0,10,100,400,1000);
	$ptb[8]=array(0,0,10,100,400,1000);
	$ptb[9]=array(0,0,10,100,750,1000); // wild
	$ptb[10]=array(0,0,0,10,10,10);  // scatter
//	$ptb[11]=array(0,0,0,100,1000,5000);
//
//	$ptb[12]=array(0,0,2,4,50,100);
	
	/*-------------*/
	
	$bet=$gBet;
	
	
	/*-------------*/
	$reels=array();
	
	if($_SESSION['greategypt_fsc']<=0){
	
	$reels[0]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[1]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[2]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[3]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[4]=array(0,1,2,3,4,5,6,7,8,9,10);
	
	}else{
	
    $reels[0]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[1]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[2]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[3]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[4]=array(0,1,2,3,4,5,6,7,8,9,10);
	
	}
	
	



$isWin=false;
	$isBonus=false;
	$calcCount=0;
	$isJack=false;
	/////////////////////////////////////game_setting
		
		$gset=spin("spin",$gBet,$lines);
		if($gset['type']=="bon"){
			
		$brand=rand(1,2);	
			
		if($brand==1 && !$demomode){
        $isJack=true;
		}else{
        $isBonus=true;
		}		
			
	    
		}
		if($gset['type']=="win"){
		$isWin=true;
		} 
		$casbank = $gset['sum']; 
		
	
		////////////////////////////////////game_setting
		
		
		
	
	$winMpl=1;
	
	if($_SESSION['greategypt_fsc']>0){
	$winMpl=2;	
	}
	
	$isCalc=true;
	
	
	while($isCalc){
	
	$wild=9;
	$scatter=10;
	$calcCount++;
	shuffle($reels[0]);
	shuffle($reels[1]);
	shuffle($reels[2]);
	shuffle($reels[3]);
	shuffle($reels[4]);
	shuffle($reels);
	
	$winMap=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	$winMapString=array();
	

	$totalWin=0;
	
	
	
	
	/*wins*/
	for($i=0;$i<8;$i++){
		
	$s=array();

	
	
	$s[0]=$reels[0][$linesId[$i][0]];
	$s[1]=$reels[1][$linesId[$i][1]];
	$s[2]=$reels[2][$linesId[$i][2]];
	$s[3]=$reels[3][$linesId[$i][3]];
	$s[4]=$reels[4][$linesId[$i][4]];
	$tmpWinStr="";
    for($j=1;$j<=11;$j++){//////////symloop

	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild)){
		
	if($ptb[$j][3]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][3]*$bet*$winMpl;	
	$tmpWinStr='{"line": '.$i.', "cells": [0, '.$linesId[$i][0].', 1, '.$linesId[$i][1].', 2, '.$linesId[$i][2].'], "card": 0, "winAmount": '.$winMap[$i].'}';
	}
	
	}////////////3
	
	
	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild) && ($s[3]==$j || $s[3]==$wild)){
		
	if($ptb[$j][4]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][4]*$bet*$winMpl;	
	$tmpWinStr='{"line": '.$i.', "cells": [0, '.$linesId[$i][0].', 1, '.$linesId[$i][1].', 2, '.$linesId[$i][2].', 3, '.$linesId[$i][3].'], "card": 0, "winAmount": '.$winMap[$i].'}';
	}
	
	}////////////4
	
	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild) && ($s[3]==$j || $s[3]==$wild)  && ($s[4]==$j || $s[4]==$wild)){
		
	if($ptb[$j][4]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][4]*$bet*$winMpl;	
	$tmpWinStr='{"line": '.$i.', "cells": [0, '.$linesId[$i][0].', 1, '.$linesId[$i][1].', 2, '.$linesId[$i][2].', 3, '.$linesId[$i][3].', 4, '.$linesId[$i][4].'], "card": 0, "winAmount": '.$winMap[$i].'}';
	}
	
	}////////////4
	
	}	//////////symloop
	if($winMap[$i]>0){
	array_push($winMapString,$tmpWinStr);
	}
	$totalWin+=$winMap[$i];
	}
	
	$scatters=0;
	
	$scatterWin=0;
	$scatterCells='{"cells": [';
	
	if($_SESSION['greategypt_fsc']<=0){
		
$scatter2=12;
	
	
	}else{
		
	$scatter2=11;	
		
	}
	
	for($r=0; $r<5;$r++){
		
	if($reels[$r][0]==$scatter || $reels[$r][0]==$scatter2){
		if($scatters>0){
$scatterCells.=',';	
}	
    $scatterCells.=$r.','.'0';
	$scatters++;

	}else if($reels[$r][1]==$scatter || $reels[$r][1]==$scatter2){
			if($scatters>0){
$scatterCells.=',';	
}
    $scatterCells.=$r.','.'1';
	$scatters++;

	}else if($reels[$r][2]==$scatter || $reels[$r][2]==$scatter2){
			if($scatters>0){
$scatterCells.=',';	
}
    $scatterCells.=$r.','.'2';
	$scatters++;
	
	}	
	

	
	}
	
	$scatterWin=$ptb[$scatter][$scatters]*$bet*$lines*$winMpl;
	
	$scatterCells.='], "scatterName": 10, "winAmount": '.$scatterWin.'}';		
	
	if($scatterWin>0){
	$totalWin+=$scatterWin;	
	}else{
	$scatterCells="";	
	}
	
	$scatterCells2="";
	
	if($scatters>=3){
	$scatterCells2=12;
//$scatterCells="";	
	}else{
	$scatterCells2="";	
	}
	
	if($totalWin<=0 && !$isWin){
	$isCalc=false;	
	}
	
	
	if($totalWin>0 && $isWin){
	$isCalc=false;	
	}
	
	
	
	if($totalWin<=0 && $isWin){
	$isCalc=true;	
	}
	
	if($scatters>=3 && !$isBonus){
	$isCalc=true;	
	}
	
	if($scatters>=3 && $isBonus){
	$isCalc=false;	
	}
	
	if($scatters<3 && $isBonus){
	$isCalc=true;	
	}
	
	if($totalWin>$casbank){
	$isCalc=true;
	
	}
	
	if($calcCount>=800){
	$isWin=false;
$isBonus=false;	
$isCalc=false;
	}
	
	}
	
	$gameState="idle";
	$ws="";
	
	if($totalWin>0){
	$ws=implode(",",$winMapString);
	$gameState="gamble";
	
	
	
 cange_balance($userId, $totalWin/100);
 change_bank($user_id,'greategypt',($totalWin/100)*-1,"spin");	
	
	

	
	
	}
	
	
	
	if($scatters>=3 && $isBonus){
	$gameState="freespin";
	if($_SESSION['greategypt_fsc']<=0){
	$_SESSION['greategypt_fsc']=10;
	}else{
	$_SESSION['greategypt_fsc']+=5;	
	}
	}
	
	
	if($_SESSION['greategypt_fsc']<=0){
	$_SESSION['greategypt_win']=$totalWin;
	}else{
	$_SESSION['greategypt_win']+=$totalWin;
$totalWin=$_SESSION['greategypt_win'];	
	}
	
	
	
	$reelString="5, ".$reels[0][0].", ".$reels[0][1].", ".$reels[0][2].", 6, 2, ".$reels[1][0].", ".$reels[1][1].", ".$reels[1][2].", 4, 1, ".$reels[2][0].", ".$reels[2][1].", ".$reels[2][2].", 7, 5, ".$reels[3][0].", ".$reels[3][1].", ".$reels[3][2].", 1, 6, ".$reels[4][0].", ".$reels[4][1].", ".$reels[4][2].", 7";
	
	
	
	
	
	///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
	if($_SESSION['greategypt_fsc']>0){
	$_SESSION['greategypt_fsc']--;	
	
	}
		
		if($isJack){
	
	$gameState="jackpot";
	$isJackStr="true";
	
	$_SESSION['greatempire_j1']=0;
	$_SESSION['greatempire_j2']=0;
	$_SESSION['greatempire_j3']=0;
	$_SESSION['greatempire_j4']=0;
	
	}else{
	$isJackStr="false";	
	}
	
	
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$totalWin.', "eventTimestamp": '.time().', "gameNumber": 1538645, "state": "'.$gameState.'", "complex": {"jackpot": '.$isJackStr.', "freespins": '.$_SESSION['greategypt_fsc'].', "scatters": ['.$scatterCells.'], "expand": [], "gambles": 0, "gameCommand": "bet", "lines": ['.$ws.'], "reels": ['.$reelString.'], "freespinScatters": ['.$scatterCells2.']}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';
	
	
	
	SetJackpots();
	
	$ms=explode("r-r_");
	$_GET['messageId']=$ms[1];
	
	
	
	
	$rtn2='{"complex": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_greategypt");
	return $rtn."|".$rtn2;	
	}
		
	
function GetJackpots(){

global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4;	

$sets=get_game_settings('greatempire');

$jacks=explode("|",$sets['g_bon1_1']);

$jp1=$jacks[0]*100;
$jp2=$jacks[1]*100;
$jp3=$jacks[2]*100;
$jp4=$jacks[3]*100;

}	

function SetJackpots(){

global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4;	
if($demomode){
return;	
}
$gBet=$_GET['bet'];
	$lines=$_GET['lines'];

$allbet=($gBet*$lines)/100;



$sets=get_game_settings('greatempire');

$jacks=explode("|",$sets['g_bon1_1']);
$jacks_prc=explode("|",$sets['g_bon1_2']);

$jp1=$jacks[0];
$jp2=$jacks[1];
$jp3=$jacks[2];
$jp4=$jacks[3];

$bprc=($allbet/100);

$jacks[0]=$jacks[0]+($bprc*$jacks_prc[0]);
$jacks[1]=$jacks[1]+($bprc*$jacks_prc[1]);
$jacks[2]=$jacks[2]+($bprc*$jacks_prc[2]);
$jacks[3]=$jacks[3]+($bprc*$jacks_prc[3]);

$jacks_str=implode("|",$jacks);

set_game_settings ('greatempire','g_bon1_1',$jacks_str);

GetJackpots();

}
	
function JackpotGame(){
		
	
///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4;	
	
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$cardsArr=array("","12","24","36","48");
	
	$isJack=false;
	$isCard=0;
	$jackState="jackpot";
	$jType=rand(1,4);
	$winAmount=0;
	
	$isCard=$cardsArr[$jType];
	
	$_SESSION['greatempire_j'.$jType]++;
	
	if($_SESSION['greatempire_j'.$jType]>=3){
	$jackState="idle";	
	$sets=get_game_settings('greatempire');

$jacks=explode("|",$sets['g_bon1_1']);




$winAmount=$jacks[$jType-1];
$jacks[$jType-1]=0;

$jp1=$jacks[0]*100;
$jp2=$jacks[1]*100;
$jp3=$jacks[2]*100;
$jp4=$jacks[3]*100;


$jacks_str=implode("|",$jacks);

	set_game_settings ('greatempire','g_bon1_1',$jacks_str);
	}
	
	$_SESSION['greatempire_win']=$winAmount;
	
	
	
	if($winAmount>0){
	cange_balance($userId, $winAmount);
    	
	}
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	$winAmount=$winAmount*100;
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount":'.$winAmount.', "eventTimestamp": '.time().', "gameNumber": '.time().', "state": "'.$jackState.'", "complex": {"gameCommand": "jackpot","card":'.$isCard.',"jackpot":true}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';	

	
	
	
	$ms=explode("r-r_");
	$_GET['messageId']=$ms[1];
	
	
	$rtn2='{"complex": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 0, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": '.time().', "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_greatempire");
	return $rtn."|".$rtn2;	

	
	}	
	
	
	
	function CollectGame(){
		
	
///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$_SESSION['greategypt_win'].', "eventTimestamp": '.time().', "gameNumber": 1561257, "state": "idle", "complex": {"gameCommand": "collect"}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';	

	
	
	
	
	
	
	$rtn2='{"complex": {"levelI": 1286, "levelII": 2259, "levelIII": 50284, "levelIV": 100267, "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_greategypt");
	return $rtn."|".$rtn2;	

	
	}

function PingGame(){
	//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr;
	
	
	//$userId=$user_id;
    $user_balance = 5000;//  get_balance($userId) ;
	
	$rtn='{"qName": "app.services.messages.response.BaseResponse", "sessionKey": "'.$_GET['sessionKey'].'", "command": "ping", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success"}';
    $rtn2='{"complex": {"levelI": 0, "levelII": 0, "levelIII": 0, "levelIV": 0, "winsLevelI": 0, "largestWinLevelI": 0, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	//set_stat_game($userId, $user_balance, 0,0,"state_greategypt");
	return $rtn."|".$rtn2;	
	}
	
function DoubleGame(){
	global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
	
	$doubleWin=$_SESSION['greategypt_win'];
	
	 cange_balance($userId, ($doubleWin/100)*-1);
 change_bank($user_id,'greategypt',($doubleWin/100),"double");	
	
    $user_balance =get_balance($userId) ;
	
	
	
	$rnd_double=rand(1,2);
	
	if($rnd_double==1){
	$doubleWin=$doubleWin*2;	
	$gameState="gamble";
	
	if($_GET['color']==0){
	$ucard=2;	
	}else{
	$ucard=3;		
	}
	
	}else{
	$doubleWin=0;	
	$gameState="idle";
	
	if($_GET['color']==0){
	$ucard=3;	
	}else{
	$ucard=2;		
	}
	
	}
	
	if($doubleWin>0){

 cange_balance($userId, $doubleWin/100);
 change_bank($user_id,'greategypt',($doubleWin/100)*-1,"double");	

	}
	
	
	$_SESSION['greategypt_win']=$doubleWin;
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "eventTimestamp": '.time().', "gameNumber": 1561277, "state": "'.$gameState.'", "complex": {"jackpot": false, "gameCommand": "gamble", "gambles": 4, "card": '.$ucard.'}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "winAmount": '.$doubleWin.', "gameIdentificationNumber": 1}';
    $rtn2='{"complex": {"levelI": 0, "levelII": 0, "levelIII": 0, "levelIV": 0, "winsLevelI": 0, "largestWinLevelI": 0, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	//set_stat_game($userId, $user_balance, 0,0,"state_greategypt");
	return $rtn."|".$rtn2;	
	}	


function InitGame2(){
	//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr,$jp1,$jp2,$jp3,$jp4;	
	
	
//	$userId=$user_id;
 //   $user_balance =  get_balance($userId) ;
	
	$rtn='{"complex": {"jackpotState": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "currentState": {"jackpot": false, "previousGambles": [], "numberOfLines": 25, "denomination": 1, "scatters": [], "freespinsUsed": 0, "gambles": 0, "expand": [], "winAmount": 0, "freespins": 0, "gamblesUsed": 0, "lines": [], "state": "idle", "bet": 1, "reels": [8, 2, 4, 10, 3, 3, 2, 4, 1, 10, 5, 6, 2, 0, 8, 2, 3, 6, 10, 1, 1, 0, 3, 7, 0]}}, "command": "subscribe", "sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	// set_stat_game($userId, $user_balance, 0,0,"state_greategypt");
	return $rtn;	
	}


function InitGame3(){
//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr,$conf;
	
	
	//$userId=$user_id;
  //  $user_balance =  get_balance($userId) ;
	
	$rtn='{"complex": {"bets": ['.$conf['bets'].'], "jackpot": true, "jackpotMinBet": 1, "mainFakeReels": [[2, 4, 10, 3, 2, 7, 0, 6, 1, 4, 9, 3, 5, 6, 1, 2, 1, 0, 1, 5, 8, 2, 4, 10, 3, 2, 7, 0, 6, 1, 4, 9, 1, 5, 6, 1, 4, 2, 2, 1, 0, 4, 5, 8, 2, 4, 10, 3, 2, 7, 0, 6, 1, 4, 9, 3, 5, 6, 1, 3, 1, 2, 1, 10, 0, 2, 5, 8, 2, 4, 10, 3, 2, 7, 0, 6, 1, 4, 9, 0, 5, 6, 1, 4, 2, 1, 1, 0, 4, 5, 8], [7, 8, 0, 1, 2, 3, 2, 4, 1, 10, 6, 7, 2, 9, 1, 5, 0, 1, 2, 5, 1, 7, 8, 0, 1, 2, 3, 2, 4, 1, 10, 6, 7, 4, 9, 1, 5, 0, 3, 1, 2, 5, 1, 7, 8, 0, 1, 2, 1, 3, 2, 4, 1, 10, 6, 7, 2, 9, 1, 5, 0, 1, 2, 5, 1, 7, 8, 0, 1, 2, 3, 2, 4, 1, 10, 6, 7, 4, 9, 1, 5, 0, 3, 1, 2, 5, 1], [0, 3, 9, 7, 1, 2, 6, 2, 0, 8, 3, 0, 6, 1, 4, 10, 2, 7, 1, 5, 0, 3, 9, 7, 1, 5, 6, 2, 0, 8, 3, 0, 6, 1, 4, 10, 2, 7, 4, 5, 1, 0, 3, 9, 7, 1, 2, 4, 6, 2, 0, 8, 3, 0, 6, 1, 4, 10, 2, 7, 1, 5, 0, 3, 9, 7, 1, 5, 6, 2, 0, 8, 3, 0, 6, 1, 4, 10, 2, 7, 4, 5, 4], [3, 6, 2, 1, 7, 0, 4, 8, 0, 2, 6, 1, 5, 7, 8, 6, 1, 2, 4, 10, 2, 3, 6, 8, 1, 7, 0, 4, 8, 0, 2, 6, 4, 5, 7, 8, 6, 1, 2, 4, 10, 2, 3, 6, 2, 1, 7, 0, 4, 8, 0, 2, 6, 1, 5, 7, 8, 6, 1, 3, 2, 4, 10, 2, 3, 6, 8, 1, 7, 0, 4, 8, 0, 2, 6, 4, 5, 7, 8, 6, 1, 2, 4, 10, 2], [2, 10, 1, 0, 3, 7, 2, 5, 6, 2, 9, 4, 7, 3, 0, 6, 5, 1, 8, 4, 2, 10, 1, 0, 3, 7, 0, 5, 6, 2, 9, 4, 7, 3, 0, 6, 5, 1, 8, 4, 2, 10, 1, 0, 3, 7, 1, 5, 6, 2, 9, 4, 7, 3, 0, 6, 5, 1, 8, 4, 2, 10, 1, 0, 3, 7, 0, 5, 6, 2, 9, 4, 7, 3, 0, 6, 5, 1, 8, 4]], "paytableCoef": {"0": {"multiplier": 1, "coef": [10, 20, 100]}, "1": {"multiplier": 1, "coef": [10, 20, 100]}, "2": {"multiplier": 1, "coef": [10, 20, 100]}, "3": {"multiplier": 1, "coef": [10, 20, 100]}, "4": {"multiplier": 1, "coef": [10, 20, 100]}, "5": {"multiplier": 1, "coef": [10, 40, 200]}, "6": {"multiplier": 1, "coef": [10, 50, 200]}, "7": {"multiplier": 1, "coef": [10, 100, 400,1000]}, "8": {"multiplier": 1, "coef": [10, 100, 400,1000]}, "9": {"multiplier": 1, "coef": [10, 100, 750,1000]}, "10": {"multiplier": 1, "coef": [10, 100, 1000]}}, "denominations": [[1, 70, 300000], [2, 70, 300000], [5, 70, 300000], [10, 70, 300000]], "jackpotMaxBet": 100000, "freespinFakeReels": [[2, 4, 10, 3, 2, 7, 0, 6, 1, 8, 4, 9, 3, 5, 6, 1, 4, 2, 1, 0, 3, 5, 8, 2, 4, 10, 3, 2, 7, 0, 6, 1, 4, 9, 10, 5, 6, 1, 3, 2, 1, 0, 4, 5, 8], [7, 8, 0, 10, 1, 2, 3, 2, 4, 1, 10, 6, 7, 10, 9, 1, 5, 0, 10, 2, 5, 1, 7, 8, 0, 1, 2, 8, 3, 2, 4, 1, 9, 6, 7, 4, 9, 1, 5, 0, 3, 2, 5, 1], [0, 3, 9, 7, 1, 10, 6, 2, 10, 0, 8, 3, 0, 6, 1, 4, 10, 2, 7, 10, 5, 0, 3, 9, 7, 1, 5, 6, 2, 0, 8, 3, 0, 6, 1, 4, 10, 0, 2, 7, 4, 5], [3, 6, 0, 1, 7, 0, 4, 8, 0, 2, 6, 10, 5, 7, 8, 6, 1, 2, 4, 10, 2, 3, 6, 8, 1, 7, 0, 4, 8, 0, 10, 2, 6, 4, 5, 7, 8, 6, 1, 0, 10, 2, 4, 10, 2], [2, 10, 1, 0, 3, 7, 10, 5, 6, 2, 9, 4, 7, 3, 0, 6, 5, 1, 8, 4, 2, 10, 1, 0, 3, 7, 0, 5, 6, 0, 2, 9, 4, 7, 3, 1, 0, 6, 5, 0, 10, 1, 8, 4]]}, "command": "settings", "sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameResponse", "gameIdentificationNumber": 1}';
	
	// set_stat_game($userId, $user_balance, 0,0,"state_greategypt");
	return $rtn;	
	}




    
	
	/*------------------------------------------------------------*/
	/*-----------------------  SERVER REQUEST --------------------*/
	/*----------------------------------------------------------- */
	
	
	
	$rtn="";
	

	
	if($_GET['command']=="login"){ //                                      
                  	
	$rtn=InitGame();
	
	
        }
	if($_GET['command']=="subscribe"){ //                                      
                  	
	$rtn=InitGame2();
	
	
        }	
		if($_GET['command']=="settings"){ //                                      
                  	
	$rtn=InitGame3();
	
	
        }		
		if($_GET['command']=="ping"){ //                                      
                  	
	$rtn=PingGame();
	
	
        }	
if($_GET['command']=="bet"){ //                                      
      
if($_GET['gameCommand']=="gamble"){
   $rtn=DoubleGame();
}else if($_GET['gameCommand']=="collect"){
   $rtn=CollectGame();
}else if($_GET['gameCommand']=="jackpot"){
   $rtn=JackpotGame();
}else{	
	$rtn=SpinGame();
}
	
        }



	
	echo ''.$rtn;
	
	
	
	
?>