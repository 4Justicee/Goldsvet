<?php
error_reporting(0);
include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';



$action="spin";
$logstr="";

$jp1=0;
$jp2=8;
$jp3=0;
$jp4=8;
	
GetJackpots();
	
$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE g_name='cleopatra'"));
	
	/*------------------------------------------------------------*/
	/*-----------------------  INIT ----------------------------*/
	/*----------------------------------------------------------- */
	
	function InitGame(){
		
$_SESSION['cleopatra_fsc']=0;
$_SESSION['cleopatra_fsc2']=0;
		
	global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4,$res1,$user_id;
	
	$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
	
	$hisInfoTmp=explode("##",$res2['str']);
	$hisInfo=array();
	for($i=0; $i<count($hisInfoTmp);$i++){
	$hisInfoTmp2=explode("=",$hisInfoTmp[$i]);	
	$hisInfo[$hisInfoTmp2[0]]=$hisInfoTmp2[1];
	}
	//print_r($hisInfo);
	if(!isset($hisInfo['reelString']) || $hisInfo['reelString']=="" ){
	$hisInfo['reelString']="8, 2, 4, 10, 3, 3, 2, 4, 1, 10, 5, 6, 2, 0, 8, 2, 3, 6, 10, 1, 2, 0, 3, 7, 0	";
	}
$_SESSION['cleopatra_reelString']=$hisInfo['reelString'];	
	
	if(!isset($hisInfo['winAmount'])){
	$hisInfo['winAmount']="0";
	}
	if(!isset($hisInfo['freespins'])){
	$hisInfo['freespins']="0";
	}
	if(!isset($hisInfo['gameState'])){
	$hisInfo['gameState']="idle";
	}	
	
	if($hisInfo['winAmount']>0){
	$_SESSION['cleopatra_win']=$hisInfo['winAmount'];	
	}
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	$user_balance-=$_SESSION['cleopatra_win'];
	
	return '{"sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp":'.time().', "qName": "app.services.messages.response.LoginResponse", "currency": "EUR", "multigame": true, "groups": ["all", "myGames", "fruit", "classic", "multiline", "extraline", "diceSlots", "keno", "roulette", "cards"], "showRtp": false, "autoplayLimit": 0, "playerName": "egt01", "languages": ["ro", "nl", "it", "bg", "en", "es", "ru", "fr", "go"], "complex": {"GOCJSlot": [{"mlmJackpot": true, "recovery": "norecovery", "gameName": "Dragon Reels", "featured": false, "groups": [{"name": "all", "order": 16}, {"name": "fruit", "order": 5}, {"name": "classic", "order": 31}, {"name": "multiline", "order": 35}, {"name": "extraline", "order": 22}, {"name": "diceSlots", "order": 29}, {"name": "keno", "order": 16}, {"name": "roulette", "order": 16}, {"name": "cards", "order": 19}, {"name": "myGames", "order": 17}], "totalBet": 0, "gameIdentificationNumber": 1}]}, "command": "login", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.'}';	

	
	 //set_stat_game($userId, $user_balance, 0,0,"state_cleopatra");
	return $rtn;	
	}
	
	function SpinGame(){
	global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4,$logstr;	
	
	$userId=$user_id;
	
	$gBet=$_GET['bet'];
	$lines=$_GET['lines'];
	$allbet=($gBet*$lines)/100;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	if(!isset($_SESSION['cleopatra_fsc'])){
	$_SESSION['cleopatra_fsc']=0;	
	}
	
	if($_SESSION['cleopatra_fsc']<=0){
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'cleopatra',$allbet,"spin");
	}
	////////////////////////////////
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$wild=9;
	$scatter=9;
	
	/*-----lines--------*/
	
	$linesId=array();
	
	$linesId[0]=array(1,1,1,1,1);
	$linesId[1]=array(0,0,0,0,0);
	$linesId[2]=array(2,2,2,2,2);
	
	$linesId[3]=array(0,1,2,1,0);
	$linesId[4]=array(2,1,0,1,2);
	
	$linesId[5]=array(0,0,1,2,2);
	$linesId[6]=array(2,2,1,0,0);
	
	$linesId[8]=array(1,0,0,0,1);
	$linesId[7]=array(1,2,2,2,1);
	
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
	
	
	
//	$ptb[0]=array(0,0,0,2,5,100);
//	$ptb[1]=array(0,0,0,2,5,100);
//	$ptb[2]=array(0,0,0,2,5,100);
//	$ptb[3]=array(0,0,0,2,5,100);
//	$ptb[4]=array(0,0,0,2,5,100);
//
//	$ptb[5]=array(0,0,0,10,40,200);
//	$ptb[6]=array(0,0,0,10,50,200);
//	$ptb[7]=array(0,0,0,10,100,400);
//	$ptb[8]=array(0,0,0,10,100,400);
//	$ptb[9]=array(0,0,0,10,100,750);
//	$ptb[10]=array(0,0,0,10,100,1000);
//	$ptb[11]=array(0,0,0,100,1000,5000);
//
//	$ptb[12]=array(0,0,2,4,50,100);


	$ptb[0]=array(0,0,0,5,25,100);
	$ptb[1]=array(0,0,0,5,25,100);
	$ptb[2]=array(0,0,0,5,25,100);

	$ptb[3]=array(0,0,0,5,40,150);
	$ptb[4]=array(0,0,0,5,40,150);

	$ptb[5]=array(0,0,5,30,100,750);
	$ptb[6]=array(0,0,5,30,100,750);

	$ptb[7]=array(0,0,5,40,100,2000);
	$ptb[8]=array(0,0,10,100,1000,10000);

	$ptb[9]=array(0,0,0,20,250,2500);

//	$ptb[10]=array(0,0,0,10,100,1000);
//	$ptb[11]=array(0,0,0,100,1000,5000);
//	$ptb[12]=array(0,0,2,4,50,100);




        /*-------------*/
	
	$bet=$gBet;
	
	
	/*-------------*/
	$reels=array();
	
	if($_SESSION['cleopatra_fsc']<=0){
	
	$reels[0]=array(0,1,2,3,4,5,6,7,8,9);
	$reels[1]=array(0,1,2,3,4,5,6,7,8,9);
	$reels[2]=array(0,1,2,3,4,5,6,7,8,9);
	$reels[3]=array(0,1,2,3,4,5,6,7,8,9);
	$reels[4]=array(0,1,2,3,4,5,6,7,8,9);
	
	}else{
	
    $reels[0]=array(0,1,2,3,4,5,6,7,8,9);
	$reels[1]=array(0,1,2,3,4,5,6,7,8,9);
	$reels[2]=array(0,1,2,3,4,5,6,7,8,9);
	$reels[3]=array(0,1,2,3,4,5,6,7,8,9);
	$reels[4]=array(0,1,2,3,4,5,6,7,8,9);
	
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
	
	
	
	$isCalc=true;
	
	
	while($isCalc){
	
	$wild=9;
	$scatter=9;
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
	for($i=0;$i<10;$i++){
		
	$s=array();

	
	
	$s[0]=$reels[0][$linesId[$i][0]];
	$s[1]=$reels[1][$linesId[$i][1]];
	$s[2]=$reels[2][$linesId[$i][2]];
	$s[3]=$reels[3][$linesId[$i][3]];
	$s[4]=$reels[4][$linesId[$i][4]];
	$tmpWinStr="";
    for($j=1;$j<=8;$j++){//////////symloop

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
	
	
	///////////////////////
	$wsfs="";
	$wsfs2=array();
	$fsWin=0;
	if($_SESSION['cleopatra_fsc']>0){
	
	$ss=array(0,0,0,0,0,0);
	$ww=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	
	$wcnt=0;
	
	for($ii=0;$ii<5;$ii++){
	
    if($reels[$ii][0]==$_SESSION['cleopatra_exp'] || $reels[$ii][1]==$_SESSION['cleopatra_exp'] || $reels[$ii][2]==$_SESSION['cleopatra_exp']){
	$ss[$ii]=1;	
	$wcnt++;
	}
	
	}
	
	$exPay=$ptb[$_SESSION['cleopatra_exp']][$wcnt]*$bet;
	
	if($exPay>0){
	
	for($i=0;$i<10;$i++){
	
	$tmpWinStr='{"line": '.$i.', "cells": [';
	
	$ts=array();
	
	if($ss[0]>0){
	array_push($ts,'0,'.$linesId[$i][0]);
	}
	if($ss[1]>0){
	array_push($ts,'1,'.$linesId[$i][1]);
	}
	if($ss[2]>0){
	array_push($ts,'2,'.$linesId[$i][2]);
	}
	if($ss[3]>0){
	array_push($ts,'3,'.$linesId[$i][3]);
	}
	if($ss[4]>0){
	array_push($ts,'4,'.$linesId[$i][4]);
	}
	$sstr=implode(",",$ts);
   
$tmpWinStr.=$sstr.'], "card": 0, "winAmount": '.$exPay.'}';
$fsWin+=$exPay;

array_push($wsfs2,$tmpWinStr);

	}
	
	
	$wsfs=implode(",",$wsfs2);
	$totalWin+=$fsWin;
	}
	
		
	}
	///////////////////////
	
	$scatters=0;
	
	$scatterWin=0;
	$scatterCells='{"cells": [';
	
	if($_SESSION['cleopatra_fsc']<=0){
		
$scatter2=9;
	
	
	}else{
		
	$scatter2=9;	
		
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
	
	$scatterCells.='], "scatterName": 9, "winAmount": '.$scatterWin.'}';		
	
	if($scatterWin>0){
	$totalWin+=$scatterWin;	
	}else{
	$scatterCells="";	
	}
	
	$scatterCells2="";
	
	if($scatters>=3){
	$scatterCells2=9;
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

	}
	
	}
	
	$gameState="idle";
	$ws="";
	
	if($totalWin>0){
	$ws=implode(",",$winMapString);
	$gameState="gamble";
	
	
	
 cange_balance($userId, $totalWin/100);
 change_bank($user_id,'cleopatra',($totalWin/100)*-1,"spin");	
	
	

	
	
	}
	
	$fsc=0;
	
	if($scatters>=3 && $isBonus){
	$gameState="freespin";
	if($_SESSION['cleopatra_fsc']<=0){
	$_SESSION['cleopatra_fsc']=11;
	$_SESSION['cleopatra_fsc2']=0;
	$_SESSION['cleopatra_exp']=rand(0,6);
	$fsc=10;
	}else{
	$_SESSION['cleopatra_fsc']+=10;
$fsc=10;	
	}
	}
	
	
	if($_SESSION['cleopatra_fsc']<=0){
	$_SESSION['cleopatra_win']=$totalWin;
	$_SESSION['cleopatra_exp']=-1;
	}else{
	$_SESSION['cleopatra_win']+=$totalWin;
$totalWin=$_SESSION['cleopatra_win'];	
$gameState="idle";
  $user_balance =get_balance($userId)*100 ;
	}
	
	
	
	$reelString="5, ".$reels[0][0].", ".$reels[0][1].", ".$reels[0][2].", 6, 2, ".$reels[1][0].", ".$reels[1][1].", ".$reels[1][2].", 4, 9, ".$reels[2][0].", ".$reels[2][1].", ".$reels[2][2].", 7, 5, ".$reels[3][0].", ".$reels[3][1].", ".$reels[3][2].", 1, 6, ".$reels[4][0].", ".$reels[4][1].", ".$reels[4][2].", 7";
	
	
	
	if($scatters>=3 && $isBonus){
	$gameState="freespin";
	
	}
	
	///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
	if($_SESSION['cleopatra_fsc']>0){
	$_SESSION['cleopatra_fsc']--;	
	$_SESSION['cleopatra_fsc2']++;	
	
	}
	if($isJack){
	
	$gameState="jackpot";
	$isJackStr="true";
	
	$_SESSION['cleopatra_j1']=0;
	$_SESSION['cleopatra_j2']=0;
	$_SESSION['cleopatra_j3']=0;
	$_SESSION['cleopatra_j4']=0;
	
	}else{
	$isJackStr="false";	
	}
	/*history*/
	$logstr.='reelString='.$reelString.'##';
	$logstr.='winAmount='.$_SESSION['cleopatra_win'].'##';
	$logstr.='gameState='.$gameState.'##';
	$logstr.='ws='.$ws.'##';
	$logstr.='freespins='.$_SESSION['cleopatra_fsc'].'##';
	$logstr.='freespinsUsed='.$_SESSION['cleopatra_fsc2'].'##';
	$logstr.='scatters='.$scatterCells.'##';
	$logstr.='exp='.$_SESSION['cleopatra_exp'].'##';
	$logstr.='freespinScatters='.$scatterCells2.'##';
	
	$_SESSION['cleopatra_reelString']=$reelString;
	/*history*/
	
	//$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$totalWin.', "eventTimestamp": '.time().', "gameNumber": 1538645, "state": "'.$gameState.'", "complex": {"jackpot": false,"freeSpinsExpandSymbol":0,"freeSpinsExpandLines":[],"freeSpinsExpandWinAmount":0, "freespins": '.$_SESSION['cleopatra_fsc'].', "scatters": ['.$scatterCells.'], "expand": [], "gambles": 0, "gameCommand": "bet", "lines": ['.$ws.'], "reels": ['.$reelString.'], "freespinScatters": ['.$scatterCells2.']}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$totalWin.', "eventTimestamp": '.time().', "gameNumber": 1645733, "state": "'.$gameState.'", "complex": {"freeSpinsExpandSymbol": '.$_SESSION['cleopatra_exp'].', "jackpot": '.$isJackStr.', "scatters": ['.$scatterCells.'], "gambles": 5, "expand": [], "freespinScatters": ['.$scatterCells2.'], "freeSpinsExpandWinAmount": '.$fsWin.', "freeSpinsExpandLines": ['.$wsfs.'], "freespins": '.$fsc.', "lines": ['.$ws.'], "gameCommand": "bet", "reels": ['.$reelString.']}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';

	
		
	SetJackpots();
	
	$ms=explode("r-r_");
	$_GET['messageId']=$ms[1];
	
	
	
	
	$rtn2='{"complex": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.',   "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_cleopatra");
	return $rtn."|".$rtn2;	
	}
		
function GetJackpots(){

global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4;	

$sets=get_game_settings('cleopatra');

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



$sets=get_game_settings('cleopatra');

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

set_game_settings ('cleopatra','g_bon1_1',$jacks_str);

GetJackpots();

}
	
function JackpotGame(){
		
	
///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4,$logstr;	
	
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$cardsArr=array("","12","24","36","48");
	
	$isJack=false;
	$isCard=0;
	$jackState="jackpot";
	$jType=rand(1,4);
	$winAmount=0;
	
	$isCard=$cardsArr[$jType];
	
	$_SESSION['cleopatra_j'.$jType]++;
	
	if($_SESSION['cleopatra_j'.$jType]>=3){
	$jackState="idle";	
	$sets=get_game_settings('cleopatra');

$jacks=explode("|",$sets['g_bon1_1']);




$winAmount=$jacks[$jType-1];
$jacks[$jType-1]=0;

$jp1=$jacks[0]*100;
$jp2=$jacks[1]*100;
$jp3=$jacks[2]*100;
$jp4=$jacks[3]*100;


$jacks_str=implode("|",$jacks);

	set_game_settings ('cleopatra','g_bon1_1',$jacks_str);
	}
	
	$_SESSION['cleopatra_win']=$winAmount;
	
	
	
	if($winAmount>0){
	cange_balance($userId, $winAmount);
    	
	}
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	$winAmount=$winAmount*100;
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount":'.$winAmount.', "eventTimestamp": '.time().', "gameNumber": '.time().', "state": "'.$jackState.'", "complex": {"gameCommand": "jackpot","card":'.$isCard.',"jackpot":true}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';	

	
	/*history*/
	$logstr.='reelString='.$_SESSION['cleopatra_reelString'].'##';
	$logstr.='winAmount='.$_SESSION['cleopatra_win'].'##';
	if($winAmount>0){
	$logstr.='gameState=idle##';	
	}else{
	$logstr.='gameState=jackpot##';
	}
	
	
	
	/*history*/
	
	$ms=explode("r-r_");
	$_GET['messageId']=$ms[1];
	
	
	$rtn2='{"complex": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 0, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": '.time().', "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_cleopatra");
	return $rtn."|".$rtn2;	

	
	}
	
	function CollectGame(){
		
	
///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
global $demomode, $login,$userId,$user_id,$logstr;	
	
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$_SESSION['cleopatra_win'].', "eventTimestamp": '.time().', "gameNumber": 1561257, "state": "idle", "complex": {"gameCommand": "collect"}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';	

	
	/*history*/
	$logstr.='reelString='.$_SESSION['cleopatra_reelString'].'##';
	$logstr.='winAmount=0##';
	$logstr.='gameState=idle##';

	
	
	/*history*/
	
	
	
	
	$rtn2='{"complex": {"levelI": 1286, "levelII": 2259, "levelIII": 50284, "levelIV": 100267, "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_cleopatra");
	return $rtn."|".$rtn2;	

	
	}

function PingGame(){
	//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr;
	
	
	//$userId=$user_id;
    $user_balance = 5000;//  get_balance($userId) ;
	
	$rtn='{"qName": "app.services.messages.response.BaseResponse", "sessionKey": "'.$_GET['sessionKey'].'", "command": "ping", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success"}';
    $rtn2='{"complex": {"levelI": 0, "levelII": 0, "levelIII": 0, "levelIV": 0, "winsLevelI": 0, "largestWinLevelI": 0, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	//set_stat_game($userId, $user_balance, 0,0,"state_cleopatra");
	return $rtn."|".$rtn2;	
	}
	
function DoubleGame(){
	global $demomode, $login,$userId,$user_id,$logstr;	
	
	
	
	$userId=$user_id;
	
	$doubleWin=$_SESSION['cleopatra_win'];
	
	 cange_balance($userId, ($doubleWin/100)*-1);
 change_bank($user_id,'cleopatra',($doubleWin/100),"double");	
	
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
 change_bank($user_id,'cleopatra',($doubleWin/100)*-1,"double");	

	}
	
	
	$_SESSION['cleopatra_win']=$doubleWin;
	/*history*/
	$logstr.='reelString='.$_SESSION['cleopatra_reelString'].'##';
	$logstr.='winAmount='.$_SESSION['cleopatra_win'].'##';
	$logstr.='gameState='.$gameState.'##';

	
	
	/*history*/
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "eventTimestamp": '.time().', "gameNumber": 1561277, "state": "'.$gameState.'", "complex": {"jackpot": false, "gameCommand": "gamble", "gambles": 4, "card": '.$ucard.'}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "winAmount": '.$doubleWin.', "gameIdentificationNumber": 1}';
    $rtn2='{"complex": {"levelI": 0, "levelII": 0, "levelIII": 0, "levelIV": 0, "winsLevelI": 0, "largestWinLevelI": 0, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	//set_stat_game($userId, $user_balance, 0,0,"state_cleopatra");
	return $rtn."|".$rtn2;	
	}	


function InitGame2(){
	//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr,$jp1,$jp2,$jp3,$jp4,$res1,$user_id;
	
	unset($_SESSION['cleopatra_j1']);
	unset($_SESSION['cleopatra_j2']);
	unset($_SESSION['cleopatra_j3']);
	unset($_SESSION['cleopatra_j4']);
	$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
	
	$hisInfoTmp=explode("##",$res2['str']);
	$hisInfo=array();
	for($i=0; $i<count($hisInfoTmp);$i++){
	$hisInfoTmp2=explode("=",$hisInfoTmp[$i]);	
	$hisInfo[$hisInfoTmp2[0]]=$hisInfoTmp2[1];
	}
	//print_r($hisInfo);
	if(!isset($hisInfo['reelString']) || $hisInfo['reelString']=="" ){
	$hisInfo['reelString']="5, 2, 4, 1, 3, 3, 2, 4, 1, 0, 5, 2, 2, 0, 3, 2, 3, 0, 1, 1, 2, 0, 3, 5, 0";	
	}
$_SESSION['cleopatra_reelString']=$hisInfo['reelString'];	
	if(!isset($hisInfo['winAmount'])){
	$hisInfo['winAmount']="0";
	}
	if(!isset($hisInfo['freespins'])){
	$hisInfo['freespins']="0";
	}
	if(!isset($hisInfo['freespinsUsed'])){
	$hisInfo['freespinsUsed']="0";
	}
	if(!isset($hisInfo['gameState'])){
	$hisInfo['gameState']="idle";
	}
	if($hisInfo['freespins']>0){
	$hisInfo['gameState']="gamble";	
	$_SESSION['cleopatra_fsc']=$hisInfo['freespins'];
	$_SESSION['cleopatra_fsc2']=$hisInfo['freespinsUsed'];
	}
	if(isset($hisInfo['freespins'])){
	$_SESSION['cleopatra_exp']=$hisInfo['freespins'];
	}
	$rtn='{"complex": {"jackpotState": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "currentState": {"jackpot": false, "previousGambles": [], "numberOfLines": 10, "denomination": 1, "scatters": ['.$hisInfo['scatterCells'].'], "freespinsUsed": '.$hisInfo['freespinsUsed'].', "gambles": 0, "expand": [], "winAmount": '.$hisInfo['winAmount'].', "freespins":'.$hisInfo['freespins'].', "gamblesUsed": 0, "lines": ['.$hisInfo['ws'].'], "state": "'.$hisInfo['gameState'].'", "bet": 1, "reels": ['.$hisInfo['reelString'].']}}, "command": "subscribe", "sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	// set_stat_game($userId, $user_balance, 0,0,"state_cleopatra");
	return $rtn;	
	}


function InitGame3(){
//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr,$jp1,$jp2,$jp3,$jp4,$conf;
	
	
	//$userId=$user_id;
  //  $user_balance =  get_balance($userId) ;
	
	$rtn='{"complex": {"bets": ['.$conf['bets'].'], "jackpot": true, "jackpotMinBet": 1, "mainFakeReels": [[8, 1, 4, 0, 5, 2, 6, 1, 5, 7, 3, 0, 1, 4, 2, 9, 5, 6, 8, 2, 0, 8, 1, 4, 0, 5, 2, 6, 1, 5, 7, 3, 0, 1, 4, 2, 7, 5, 6, 8, 2, 0], [2, 8, 0, 6, 1, 5, 8, 2, 4, 3, 5, 3, 2, 4, 1, 7, 2, 8, 3, 6, 2, 8, 0, 6, 1, 5, 8, 2, 4, 3, 5, 9, 2, 4, 1, 7, 2, 8, 3, 6], [4, 0, 5, 1, 8, 3, 6, 4, 8, 1, 9, 3, 2, 5, 1, 7, 0, 3, 6, 2, 4, 0, 5, 1, 8, 3, 6, 4, 8, 1, 4, 3, 2, 5, 1, 7, 0, 3, 6, 2], [2, 6, 0, 2, 5, 3, 8, 1, 7, 0, 5, 1, 2, 5, 7, 1, 4, 8, 6, 3, 4, 9, 2, 6, 0, 2, 5, 3, 8, 1, 7, 0, 5, 1, 2, 5, 7, 1, 4, 8, 6, 3, 4, 5], [6, 1, 7, 3, 5, 0, 5, 4, 8, 1, 5, 9, 2, 4, 8, 7, 5, 0, 3, 4, 6, 1, 7, 3, 5, 0, 5, 4, 8, 1, 5, 9, 2, 4, 8, 7, 5, 0, 3, 4]], "paytableCoef": {"0": {"multiplier": 1, "coef": [5, 25, 100]}, "1": {"multiplier": 1, "coef": [5, 25, 100]}, "2": {"multiplier": 1, "coef": [5, 25, 100]}, "3": {"multiplier": 1, "coef": [5, 40, 150]}, "4": {"multiplier": 1, "coef": [5, 40, 150]}, "5": {"multiplier": 1, "coef": [5, 30, 100, 750]}, "6": {"multiplier": 1, "coef": [5, 30, 100, 750]}, "7": {"multiplier": 1, "coef": [5, 40, 400, 2000]}, "8": {"multiplier": 1, "coef": [10, 100, 1000, 5000]}, "9": {"multiplier": 1, "coef": [2, 25, 250]}, "-1": {"multiplier": 1, "coef": []}}, "denominations": [[2, 70, 300000], [5, 70, 300000], [10, 70, 300000], [15, 70, 300000]], "jackpotMaxBet": 100000, "freespinFakeReels": [[8, 1, 4, 0, 5, 2, 6, 1, 5, 7, 3, 0, 1, 4, 2, 9, 5, 6, 8, 2, 0, 8, 1, 4, 0, 5, 2, 6, 1, 5, 7, 3, 0, 1, 4, 2, 7, 5, 6, 8, 2, 0], [2, 8, 0, 6, 1, 5, 8, 2, 4, 3, 5, 3, 2, 4, 1, 7, 2, 8, 3, 6, 2, 8, 0, 6, 1, 5, 8, 2, 4, 3, 5, 9, 2, 4, 1, 7, 2, 8, 3, 6], [4, 0, 5, 1, 8, 3, 6, 4, 8, 1, 9, 3, 2, 5, 1, 7, 0, 3, 6, 2, 4, 0, 5, 1, 8, 3, 6, 4, 8, 1, 4, 3, 2, 5, 1, 7, 0, 3, 6, 2], [2, 6, 0, 2, 5, 3, 8, 1, 7, 0, 5, 1, 2, 5, 7, 1, 4, 8, 6, 3, 4, 9, 2, 6, 0, 2, 5, 3, 8, 1, 7, 0, 5, 1, 2, 5, 7, 1, 4, 8, 6, 3, 4, 5], [6, 1, 7, 3, 5, 0, 5, 4, 8, 1, 5, 9, 2, 4, 8, 7, 5, 0, 3, 4, 6, 1, 7, 3, 5, 0, 5, 4, 8, 1, 5, 9, 2, 4, 8, 7, 5, 0, 3, 4]]}, "command": "settings", "sessionKey": "6SEmu7Ovnzb8BmNo1489510499862", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameResponse", "gameIdentificationNumber": 1}';
	// set_stat_game($userId, $user_balance, 0,0,"state_cleopatra");
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


if($_GET['command']=="bet"){		
$logstr='action='.$_GET['gameCommand'].'##'.$logstr;
$sql= "INSERT DELAYED INTO game_log (game_id,user_id,ip,post, str) values ('".$res1['g_id']."',$user_id,'".getip( )."','','$logstr')";
mysql_query($sql);
}

	
	echo ''.$rtn;
	
	
	
	
?>