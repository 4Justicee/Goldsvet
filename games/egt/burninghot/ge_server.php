<?php
error_reporting(0);
include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';



$action="spin";



$jp1=0;
$jp2=8;
$jp3=0;
$jp4=8;
	
$logstr="";	
GetJackpots();
	

$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE g_name='burninghot'"));

	
	/*------------------------------------------------------------*/
	/*-----------------------  INIT ----------------------------*/
	/*----------------------------------------------------------- */
	
	function InitGame(){
		

		
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
	$_SESSION['burninghot_win']=$hisInfo['winAmount'];	
	}
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	$user_balance-=$_SESSION['burninghot_win'];
	return '{"sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp":'.time().', "qName": "app.services.messages.response.LoginResponse", "currency": "EUR", "multigame": true, "groups": ["all", "myGames", "fruit", "classic", "multiline", "extraline", "diceSlots", "keno", "roulette", "cards"], "showRtp": false, "autoplayLimit": 0, "playerName": "egt01", "languages": ["ro", "nl", "it", "bg", "en", "es", "ru", "fr", "go"], "complex": {"BHJSlot": [{"mlmJackpot": true, "recovery": "norecovery", "gameName": "Burning Hot", "featured": false, "groups": [{"name": "all", "order": 16}, {"name": "fruit", "order": 5}, {"name": "classic", "order": 31}, {"name": "multiline", "order": 35}, {"name": "extraline", "order": 22}, {"name": "diceSlots", "order": 29}, {"name": "keno", "order": 16}, {"name": "roulette", "order": 16}, {"name": "cards", "order": 19}, {"name": "myGames", "order": 17}], "totalBet": 0, "gameIdentificationNumber": 1}]}, "command": "login", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.'}';	

	
	 //set_stat_game($userId, $user_balance, 0,0,"state_burninghot");
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
	
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'aztecsecret',$allbet,"spin");
	
	////////////////////////////////
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$wild=8;
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

        $ptb[0]=array(0,0,0,10,30,100);
        $ptb[1]=array(0,0,0,10,30,100);
        $ptb[2]=array(0,0,0,10,30,100);
        $ptb[3]=array(0,0,0,10,30,100);

        $ptb[4]=array(0,0,0,20,50,200);         // blue
        $ptb[5]=array(0,0,0,40,100,500);        //yellow

        $ptb[6]=array(0,0,0,40,100,500);        // eight
        $ptb[7]=array(0,0,10,50,200,3000);      // main symbol

        $ptb[8]=array(0,0,10,50,200,3000);        // wild
        $ptb[9]=array(0,0,0,100,100,100);      //green scatter
        $ptb[10]=array(0,0,0,3,20,100);        //yello scatter
	
	/*-------------*/
	
	$bet=$gBet;
	
	
	/*-------------*/
	$reels=array();
	$reels[0]=array(0,1,2,3,4,5,6,7,10);
	$reels[1]=array(0,1,2,3,4,5,6,7,8,9,10);
	$reels[2]=array(0,1,2,3,4,5,6,7,8,10);
	$reels[3]=array(0,1,2,3,4,5,6,7,8,10);
	$reels[4]=array(0,1,2,3,4,5,6,7,10);
	
	
	
	
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
	
	
	
	$isCalc=true;
	
	
	while($isCalc){
	
	$calcCount++;
	
	
	shuffle($reels[0]);
	shuffle($reels[1]);
	shuffle($reels[2]);
	shuffle($reels[3]);
	shuffle($reels[4]);
	
	
	$winMap=array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	$winMapString=array();
	
	$totalWin=0;
	/*wins*/
	for($i=0;$i<5;$i++){
		
	$s=array();

	$s[0]=$reels[0][$linesId[$i][0]];
	$s[1]=$reels[1][$linesId[$i][1]];
	$s[2]=$reels[2][$linesId[$i][2]];
	$s[3]=$reels[3][$linesId[$i][3]];
	$s[4]=$reels[4][$linesId[$i][4]];
	$tmpWinStr="";
    for($j=0;$j<=7;$j++){//////////symloop

	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild)){
		
	if($ptb[$j][3]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][3]*$bet;	
	$tmpWinStr='{"line": '.$i.', "cells": [0, '.$linesId[$i][0].', 1, '.$linesId[$i][1].', 2, '.$linesId[$i][2].'], "card": 0, "winAmount": '.$winMap[$i].'}';
	}
	
	}////////////3
	
	
	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild) && ($s[3]==$j || $s[3]==$wild)){
		
	if($ptb[$j][4]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][4]*$bet;	
	$tmpWinStr='{"line": '.$i.', "cells": [0, '.$linesId[$i][0].', 1, '.$linesId[$i][1].', 2, '.$linesId[$i][2].', 3, '.$linesId[$i][3].'], "card": 0, "winAmount": '.$winMap[$i].'}';
	}
	
	}////////////4
	
	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild) && ($s[3]==$j || $s[3]==$wild)  && ($s[4]==$j || $s[4]==$wild)){
		
	if($ptb[$j][4]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][4]*$bet;	
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
	
	
	
	for($r=0; $r<5;$r++){
		
	if($reels[$r][0]==$scatter){
		if($scatters>0){
$scatterCells.=',';	
}	
    $scatterCells.=$r.','.'0';
	$scatters++;

	}else if($reels[$r][1]==$scatter){
			if($scatters>0){
$scatterCells.=',';	
}
    $scatterCells.=$r.','.'1';
	$scatters++;

	}else if($reels[$r][2]==$scatter){
			if($scatters>0){
$scatterCells.=',';	
}
    $scatterCells.=$r.','.'2';
	$scatters++;
	
	}	
	

	
	}
	
	$scatterWin=$ptb[$scatter][$scatters]*$bet*$lines;
	
	$scatterCells.='], "scatterName": 10, "winAmount": '.$scatterWin.'}';		
	
	if($scatterWin>0){
	$totalWin+=$scatterWin;	
	}else{
	$scatterCells="";	
	}
	
	$scatterCells2="";
	
	if($scatters>=4){
	$scatterCells2.=$scatterCells;
//$scatterCells="";	
	}
	
	if($totalWin<=0 && !$isWin){
	$isCalc=false;	
	}
	if($totalWin<=0 && $isWin){
	$isCalc=true;	
	}
	
	if($totalWin>0 && $isWin){
	$isCalc=false;	
	}
	
	if($scatters>=4 && $isBonus){
	$isCalc=false;	
	}
	
	
	if($scatters>=4 && !$isBonus){
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
 change_bank($user_id,'burninghot',($totalWin/100)*-1,"spin");	
	
	

	
	
	}
	
	
	$_SESSION['burninghot_win']=$totalWin;
	
	$reelString="5, ".$reels[0][0].", ".$reels[0][1].", ".$reels[0][2].", 6, 2, ".$reels[1][0].", ".$reels[1][1].", ".$reels[1][2].", 4, 10, ".$reels[2][0].", ".$reels[2][1].", ".$reels[2][2].", 7, 5, ".$reels[3][0].", ".$reels[3][1].", ".$reels[3][2].", 1, 6, ".$reels[4][0].", ".$reels[4][1].", ".$reels[4][2].", 7";
	
	
	
	
	
	///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
	if($isJack){
	
	$gameState="jackpot";
	$isJackStr="true";
	
	$_SESSION['burninghot_j1']=0;
	$_SESSION['burninghot_j2']=0;
	$_SESSION['burninghot_j3']=0;
	$_SESSION['burninghot_j4']=0;
	
	}else{
	$isJackStr="false";	
	}
	
	/*history*/
	$logstr.='reelString='.$reelString.'##';
	$logstr.='winAmount='.$_SESSION['burninghot_win'].'##';
	$logstr.='gameState='.$gameState.'##';
	$logstr.='ws='.$ws.'##';
	$logstr.='freespins='.$_SESSION['burninghot_fsc'].'##';
	$logstr.='freespinsUsed='.$_SESSION['burninghot_fsc2'].'##';
	$logstr.='scatters='.$scatterCells.'##';
	$logstr.='freespinScatters='.$scatterCells2.'##';
	
	$_SESSION['burninghot_reelString']=$reelString;
	/*history*/
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$totalWin.', "eventTimestamp": '.time().', "gameNumber": 1538645, "state": "'.$gameState.'", "complex": {"jackpot": '.$isJackStr.', "freespins": 0, "scatters": ['.$scatterCells.'], "expand": [], "gambles": 0, "gameCommand": "bet", "lines": ['.$ws.'], "reels": ['.$reelString.'], "freespinScatters": []}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';
	
	
	
	SetJackpots();
	
	$ms=explode("r-r_");
	$_GET['messageId']=$ms[1];
	
	
	
	
	$rtn2='{"complex": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_burninghot");
	return $rtn."|".$rtn2;	
	}
	
		
function GetJackpots(){

global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4;	

$sets=get_game_settings('burninghot');

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



$sets=get_game_settings('burninghot');

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

set_game_settings ('burninghot','g_bon1_1',$jacks_str);

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
	
	$_SESSION['burninghot_j'.$jType]++;
	
	if($_SESSION['burninghot_j'.$jType]>=3){
	$jackState="idle";	
	$sets=get_game_settings('burninghot');

$jacks=explode("|",$sets['g_bon1_1']);




$winAmount=$jacks[$jType-1];
$jacks[$jType-1]=0;

$jp1=$jacks[0]*100;
$jp2=$jacks[1]*100;
$jp3=$jacks[2]*100;
$jp4=$jacks[3]*100;


$jacks_str=implode("|",$jacks);

	set_game_settings ('burninghot','g_bon1_1',$jacks_str);
	}
	
	$_SESSION['burninghot_win']=$winAmount;
	
	
	
	if($winAmount>0){
	cange_balance($userId, $winAmount);
    	
	}
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	$winAmount=$winAmount*100;
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount":'.$winAmount.', "eventTimestamp": '.time().', "gameNumber": '.time().', "state": "'.$jackState.'", "complex": {"gameCommand": "jackpot","card":'.$isCard.',"jackpot":true}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';	

	/*history*/
	$logstr.='reelString='.$_SESSION['burninghot_reelString'].'##';
	$logstr.='winAmount='.$_SESSION['burninghot_win'].'##';
	if($winAmount>0){
	$logstr.='gameState=idle##';	
	}else{
	$logstr.='gameState=jackpot##';
	}
	
	
	
	/*history*/
	
	
	$ms=explode("r-r_");
	$_GET['messageId']=$ms[1];
	
	
	$rtn2='{"complex": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 0, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": '.time().', "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_burninghot");
	return $rtn."|".$rtn2;	

	
	}

	
	function CollectGame(){
		
	
///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$_SESSION['burninghot_win'].', "eventTimestamp": '.time().', "gameNumber": 1561257, "state": "idle", "complex": {"gameCommand": "collect"}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';	

	
	
	/*history*/
	$logstr.='reelString='.$_SESSION['burninghot_reelString'].'##';
	$logstr.='winAmount=0##';
	$logstr.='gameState=idle##';

	
	
	/*history*/
	
	
	
	$rtn2='{"complex": {"levelI": 1286, "levelII": 2259, "levelIII": 50284, "levelIV": 100267, "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_burninghot");
	return $rtn."|".$rtn2;	

	
	}

function PingGame(){
	//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr;
	
	
	//$userId=$user_id;
    $user_balance = 5000;//  get_balance($userId) ;
	
	$rtn='{"qName": "app.services.messages.response.BaseResponse", "sessionKey": "'.$_GET['sessionKey'].'", "command": "ping", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success"}';
    $rtn2='{"complex": {"levelI": 0, "levelII": 0, "levelIII": 0, "levelIV": 0, "winsLevelI": 0, "largestWinLevelI": 0, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	//set_stat_game($userId, $user_balance, 0,0,"state_burninghot");
	return $rtn."|".$rtn2;	
	}
	
function DoubleGame(){
	global $demomode, $login,$userId,$user_id,$logstr;		
	
	
	
	$userId=$user_id;
	
	$doubleWin=$_SESSION['burninghot_win'];
	
	 cange_balance($userId, ($doubleWin/100)*-1);
 change_bank($user_id,'burninghot',($doubleWin/100),"double");	
	
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
 change_bank($user_id,'burninghot',($doubleWin/100)*-1,"double");	

	}
	
	
	$_SESSION['burninghot_win']=$doubleWin;
	
	
	/*history*/
	$logstr.='reelString='.$_SESSION['burninghot_reelString'].'##';
	$logstr.='winAmount='.$_SESSION['burninghot_win'].'##';
	$logstr.='gameState='.$gameState.'##';

	
	
	/*history*/
	
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "eventTimestamp": '.time().', "gameNumber": 1561277, "state": "'.$gameState.'", "complex": {"jackpot": false, "gameCommand": "gamble", "gambles": 4, "card": '.$ucard.'}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "winAmount": '.$doubleWin.', "gameIdentificationNumber": 1}';
    $rtn2='{"complex": {"levelI": 0, "levelII": 0, "levelIII": 0, "levelIV": 0, "winsLevelI": 0, "largestWinLevelI": 0, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	//set_stat_game($userId, $user_balance, 0,0,"state_burninghot");
	return $rtn."|".$rtn2;	
	}	


function InitGame2(){
	//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr,$jp1,$jp2,$jp3,$jp4,$res1,$user_id;
	
	unset($_SESSION['burninghot_j1']);
	unset($_SESSION['burninghot_j2']);
	unset($_SESSION['burninghot_j3']);
	unset($_SESSION['burninghot_j4']);
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
	$_SESSION['burninghot_reelString']=$hisInfo['reelString'];
	
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
	$_SESSION['burninghot_fsc']=$hisInfo['freespins'];
	$_SESSION['burninghot_fsc2']=$hisInfo['freespinsUsed'];
	}
	//print_r($hisInfo);
	$rtn='{"complex": {"jackpotState": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "currentState": {"jackpot": false, "previousGambles": [], "numberOfLines": 5, "denomination": 1, "scatters": ['.$hisInfo['scatterCells'].'], "gambles": 0, "expand": [], "winAmount": '.$hisInfo['winAmount'].', "gamblesUsed": 0, "lines": ['.$hisInfo['ws'].'], "state": "'.$hisInfo['gameState'].'", "bet": 3, "reels": ['.$hisInfo['reelString'].']}}, "command": "subscribe", "sessionKey": "3nsVx8d68WuTSYhk1489068162355", "eventTimestamp":'.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	// set_stat_game($userId, $user_balance, 0,0,"state_burninghot");
	return $rtn;	
	}


function InitGame3(){
//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr,$conf;
	
	
	//$userId=$user_id;
  //  $user_balance =  get_balance($userId) ;
	
	$rtn='{"complex": {"bets": ['.$conf['bets'].'], "jackpot": true, "mainFakeReels": [[6, 2, 2, 2, 0, 0, 0, 5, 4, 4, 4, 1, 5, 10, 1, 1, 1, 3, 3, 3, 4, 7, 4, 9, 4, 6, 2, 2, 2, 0, 0, 0, 5, 4, 1, 5, 10, 1, 1, 3, 4, 7, 4, 9, 4], [7, 2, 2, 2, 8, 5, 3, 0, 0, 0, 10, 6, 3, 3, 3, 1, 1, 1, 4, 4, 4, 1, 4, 8, 4, 2, 7, 2, 2, 2, 5, 3, 0, 0, 10, 6, 3, 3, 1, 1, 4, 1, 3, 5, 4, 2], [6, 1, 1, 1, 8, 7, 1, 5, 3, 3, 3, 9, 1, 4, 4, 4, 2, 2, 2, 10, 0, 0, 0, 6, 1, 1, 1, 7, 1, 5, 3, 3, 9, 1, 4, 0, 4, 2, 2, 2, 10, 0, 0], [7, 1, 1, 1, 8, 3, 3, 3, 5, 6, 4, 4, 4, 2, 2, 2, 10, 2, 0, 0, 0, 5, 1, 1, 1, 1, 7, 1, 3, 3, 8, 6, 4, 3, 4, 2, 2, 10, 2, 0, 0, 5, 1], [7, 3, 3, 2, 2, 2, 1, 1, 1, 6, 10, 1, 1, 3, 3, 3, 2, 7, 0, 0, 0, 4, 4, 4, 7, 3, 3, 3, 2, 2, 1, 6, 10, 1, 1, 3, 3, 3, 2, 7, 0, 0, 4, 9, 4]], "paytableCoef": {"0": {"multiplier": 1, "coef": [10, 30, 100]}, "1": {"multiplier": 1, "coef": [10, 30, 100]}, "2": {"multiplier": 1, "coef": [10, 30, 100]}, "3": {"multiplier": 1, "coef": [10, 30, 100]}, "4": {"multiplier": 1, "coef": [20, 50, 200]}, "5": {"multiplier": 1, "coef": [40, 100, 500]}, "6": {"multiplier": 1, "coef": [40, 100, 500]}, "7": {"multiplier": 1, "coef": [10, 50, 200, 3000]}, "9": {"multiplier": 1, "coef": [20]}, "10": {"multiplier": 1, "coef": [3, 20, 100]}}, "jackpotMinBet": 1, "denominations": [[3, 70, 300000], [5, 70, 300000], [10, 70, 300000], [20, 70, 300000]], "jackpotMaxBet": 100000}, "command": "settings", "sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameResponse", "gameIdentificationNumber": 1}';
	// set_stat_game($userId, $user_balance, 0,0,"state_burninghot");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin2($bet,$lines){
		
	//global $demomode, $login,$userId,$user_id,$action;	
	
	
	
	
	//$userId=$user_id;
   // $user_balance =  get_balance($userId) ;
	
	
if(!isset($_SESSION['dcard_burninghot'])){
$_SESSION['dcard_burninghot']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=array(0.02, 0.03, 0.04, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.40, 0.50);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'burninghot',$allbet,"spin");
	
	////////////////////////////////
	
	
	
	
	$user_balance =  get_balance($userId) ;
	
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
	  
		$psym[0]=array(0,0,0,50,250,2500);
$psym[1]=array(0,0,0,25,100,500);
$psym[2]=array(0,0,0,20,75,300);
$psym[3]=array(0,0,0,15,50,200);
$psym[4]=array(0,0,0,15,50,200);
$psym[5]=array(0,0,0,10,25,100);
$psym[6]=array(0,0,0,10,25,100);
$psym[7]=array(0,0,0,2,10,50);
		  
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
$r[0]=array(0, 0, 0, 6, 6, 6, 2, 2, 2, 6, 6, 6, 5, 5, 5, 6, 6, 6, 3, 3, 3, 7, 1, 1, 1, 4, 4, 4, 6, 6, 6, 3, 3, 3, 2, 2, 2, 6, 6, 6, 3, 3, 3);
$r[1]=array(6, 6, 6, 7, 4, 4, 4, 1, 1, 1, 5, 5, 5, 2, 2, 2, 3, 3, 3, 5, 5, 5, 0, 0, 0, 4, 4, 4, 5, 5, 5, 4, 4, 4, 5, 5, 5, 1, 1, 1, 2, 2, 2);
$r[2]=array(4, 4, 4, 5, 5, 5, 6, 6, 6, 2, 2, 2, 6, 6, 6, 5, 5, 5, 7, 1, 1, 1, 6, 6, 6, 3, 3, 3, 6, 6, 6, 0, 0, 0, 7, 6, 6, 6, 5, 5, 5, 7, 3, 3, 3, 6, 6, 6, 5, 5, 5);
$r[3]=array(3, 3, 3, 0, 0, 0, 6, 6, 6, 7, 5, 5, 5, 1, 1, 1, 4, 4, 4, 2, 2, 2, 5, 5, 5, 4, 4, 4, 5, 5, 5, 4, 4, 4, 2, 2, 2, 1, 1, 1);
$r[4]=array(7, 2, 2, 2, 0, 0, 0, 6, 6, 6, 4, 4, 4, 6, 6, 6, 3, 3, 3, 6, 6, 6, 1, 1, 1, 6, 6, 6, 5, 5, 5, 6, 6, 6, 3, 3, 3, 0, 0, 0);	


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
	
	if($casbank <$gBet*10*($lines/2)){
		
		
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
	for ( $ln = 0; $ln < $lines; ++$ln )
	        {
	         $s1 = $map[$lin[$ln][0]];
	            $s2 = $map[$lin[$ln][1]];
	            $s3 = $map[$lin[$ln][2]];
	            $s4 = $map[$lin[$ln][3]];
	            $s5 = $map[$lin[$ln][4]];
				$gg = 1;

				

////////////////////////////////////

 if ($s1 == $wild && $s2 !=7 && $s2!=12)
				{
					$s1 = $s2;
					
				}
				if ($s2 == $wild && $s1 !=7 && $s1!=12)
				{
					$s2 = $s1;
					
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=7)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=7)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=7)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=7)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=7)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=7)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=7)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=7)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=7)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=7)
	            {
	                $s4 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=7)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=7)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=7)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=7)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=7)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=7)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=7)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=7)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=7)
				{
					$s5 = $s2;
					
				}
				
				




///////////////////////////////////////////////////
///////////////////////////////
////////////////////////
if(($s1==$s2 ) && ($s2==$s3) && $s1 !=7 ){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s2==$s3 ) && ($s3==$s4) && $s2 !=7 ){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s3==$s4 ) && ($s4==$s5) && $s3 !=7 ){



$wins[$ln]=$psym[$s3][3];	
	
}
///////////////////////////////////////////////////
///////////////////////////////
////////////////////////
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 ) && $s1 !=7 ){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s4==$s5 ) && ($s2==$s3) && ($s3==$s4 ) && $s2 !=7 ){



$wins[$ln]=$psym[$s4][4];	
	
}
///////////////////////////////////////////////////
///////////////////////////////
////////////////////////
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 ) && $s1 !=7){



$wins[$ln]=$psym[$s5][5];	
	
}


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<10; $i++){

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
	
if($map[$i]==7){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[7][$scatter_win]*$gBet*$lines);
$winall_r+=($psym[7][$scatter_win]*$lines);
$whex=dechex($psym[7][$scatter_win]);	
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
	
	if($loopCnt>1000){
	$isCalc=false;	
		
	}
	
	}
	
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'burninghot',$winall*-1,"spin");	
	
	
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
	
	$_SESSION['burninghot_freeGamesWin']=$winall;
	
	
	$str_winall=str_replace(".","",($winall*100)."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_burninghot']=$map;	
	
	
	$gameState="03";
    $freeInfo="10101010101010101010100b";
	if($isBonus && $scatter_win>=3){
	
	$_SESSION['burninghot_freeGames']=15;
	$_SESSION['burninghot_freeGames2']=15;
	
	$_SESSION['burninghot_freeGamesBank']=$gset['sum'];
	
$gameState="05";	
	 $freeInfo="1f1f1013101010101010100b";	
	}
	
	$respinMap="";
	
	for($i=0; $i<=14;$i++){
	
    
	$respinMap.="10";	
	
	
	}
	
	
	
	
	/*-------------------------------*/
	
	$rtn="1".$gameState."0"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_burninghot']."".$respinMap."#".count($r[3]);
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr."";
	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  get_balance($userId) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr.$_SESSION['dcard_burninghot'].$respinMap;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_burninghot");
	return $rtn;		
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
global $demomode, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  get_balance($userId) ;
	
	
if(!isset($_SESSION['dcard_burninghot'])){
$_SESSION['dcard_burninghot']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=array(0.02, 0.03, 0.04, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.40, 0.50);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	// cange_balance($userId, $allbet*-1);
	// change_bank($user_id,'burninghot',$allbet,"spin");
	
	////////////////////////////////
	
	
	
	
	$user_balance =  get_balance($userId) ;
	
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
	  	$psym[0]=array(0,0,0,50,250,2500);
$psym[1]=array(0,0,0,25,100,500);
$psym[2]=array(0,0,0,20,75,300);
$psym[3]=array(0,0,0,15,50,200);
$psym[4]=array(0,0,0,15,50,200);
$psym[5]=array(0,0,0,10,25,100);
$psym[6]=array(0,0,0,10,25,100);
$psym[7]=array(0,0,0,2,10,50);
		  
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
$r[0]=array(0, 0, 0, 6, 6, 6, 2, 2, 2, 5, 5, 5, 6, 6, 6, 3, 3, 3, 7, 1, 1, 1, 4, 4, 4, 6, 6, 6, 3, 3, 3, 2, 2, 2, 3, 3, 3);
$r[1]=array(6, 6, 6, 7, 4, 4, 4, 1, 1, 1, 5, 5, 5, 2, 2, 2, 3, 3, 3, 5, 5, 5, 0, 0, 0, 4, 4, 4, 5, 5, 5, 4, 4, 4, 7, 5, 5, 5);
$r[2]=array(4, 4, 4, 5, 5, 5, 2, 2, 2, 6, 6, 6, 5, 5, 5, 7, 1, 1, 1, 6, 6, 6, 3, 3, 3, 6, 6, 6, 0, 0, 0, 7, 5, 5, 5, 3, 3, 3);
$r[3]=array(3, 3, 3, 0, 0, 0, 6, 6, 6, 7, 5, 5, 5, 1, 1, 1, 4, 4, 4, 2, 2, 2, 5, 5, 5, 4, 4, 4, 5, 5, 5, 7, 4, 4, 4, 2, 2, 2);
$r[4]=array(7, 2, 2, 2, 0, 0, 0, 6, 6, 6, 4, 4, 4, 6, 6, 6, 3, 3, 3, 6, 6, 6, 1, 1, 1, 6, 6, 6, 5, 5, 5, 3, 3, 3);	


$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=7;
	
	
	$isWin=false;
	$isBonus=false;
	/////////////////////////////////////game_setting
		
		$gset=spin("spin",$gBet,$lines);
		if($gset['type']=="bon"){
	   
		}
		if($gset['type']=="win"){
		$isWin=true;
		} 
		$casbank = $_SESSION['burninghot_freeGamesBank']; 
		
		$winRand=rand(1,2);
	
	if($winRand==1){
	
$isWin=true;	
		
	}
	
	
	$bRand=rand(1,50);
	
	if($brand==1 && !$demomode){
	
$isBonus=true;	
		
	}
	$_SESSION['burninghot_freeGames']--;
	
	
		////////////////////////////////////game_setting
	
	
	
	$isCalc=true;
	
	if($casbank <$gBet*10*($lines/2)){
		
		
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
	for ( $ln = 0; $ln < $lines; ++$ln )
	        {
	         $s1 = $map[$lin[$ln][0]];
	            $s2 = $map[$lin[$ln][1]];
	            $s3 = $map[$lin[$ln][2]];
	            $s4 = $map[$lin[$ln][3]];
	            $s5 = $map[$lin[$ln][4]];
				$gg = 1;

				

////////////////////////////////////

 if ($s1 == $wild && $s2 !=77 && $s2!=12)
				{
					$s1 = $s2;
					
				}
				if ($s2 == $wild && $s1 !=77 && $s1!=12)
				{
					$s2 = $s1;
					
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=77)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=77)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=77)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=77)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=77)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=77)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=77)
	            {
	                $s1 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=77)
	            {
	                $s2 = $s3;
	               
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=77)
	            {
	                $s3 = $s2;
	               
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=77)
	            {
	                $s4 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=77)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=77)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=77)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=77)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=77)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=77)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=77)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=77)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=77)
				{
					$s5 = $s2;
					
				}
				
				




///////////////////////////////////////////////////
///////////////////////////////
////////////////////////
if(($s1==$s2 ) && ($s2==$s3) && $s1 !=77 ){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s2==$s3 ) && ($s3==$s4) && $s2 !=77 ){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s3==$s4 ) && ($s4==$s5) && $s3 !=77 ){



$wins[$ln]=$psym[$s3][3];	
	
}
///////////////////////////////////////////////////
///////////////////////////////
////////////////////////
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 ) && $s1 !=77 ){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s4==$s5 ) && ($s2==$s3) && ($s3==$s4 ) && $s2 !=77 ){



$wins[$ln]=$psym[$s4][4];	
	
}
///////////////////////////////////////////////////
///////////////////////////////
////////////////////////
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 ) && $s1 !=77){



$wins[$ln]=$psym[$s5][5];	
	
}

			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<10; $i++){

if($wins[$i]>0 ){
$winall+=($wins[$i]*$gBet*3);
$winall_r+=$wins[$i]*3;
$whex=dechex($wins[$i]);	
$winstr.=strlen($whex).$whex;
}else{
$winstr.="10";	
}	
	
}	



$scatter_win=0;

for($i=0; $i<=14;$i++){
	
if($map[$i]==7){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[7][$scatter_win]*$gBet*$lines)*3;
$winall_r+=$psym[7][$scatter_win]*3;
$whex=dechex($psym[7][$scatter_win]*3);	
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
	
	if($isBonus && $scatter_win<=2){
	$isCalc=true;		
	}
	
	if(!$isBonus && $scatter_win>2){
	$isCalc=true;		
	}
	if($isBonus && $scatter_win>=3){
	$isCalc=false;		
	}
	
	if($loopCnt>800){
	$isCalc=false;	
		
	}
	
	}
	
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'burninghot',$winall*-1,"spin");	
$_SESSION['burninghot_freeGamesBank']-=	$winall;
	
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
	
	$_SESSION['burninghot_freeGamesWin']+=$winall;
	//$winall_r=$_SESSION['burninghot_freeGamesWin'];
	
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_burninghot']=$map;	
	
	
	$gameState="06";
    
	if($_SESSION['burninghot_freeGames']<=0){
	
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
	$_SESSION['burninghot_freeGames']+=15;	
	$_SESSION['burninghot_freeGames2']+=15;	
	$gameState="0a";
	}
	
	$freeRH=dechex($_SESSION['burninghot_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['burninghot_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
	 $freeInfo=$freeR2.$freeR.$ww."131010".$rtnReels."0b";	
	/*-------------------------------*/
	$winall2=$_SESSION['burninghot_freeGamesWin']*100;
	$str_winall=str_replace(".","",$winall2."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	
	$rtn="1".$gameState."0"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_burninghot']."".$respinMap."#".count($r[3]);
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr."";
	//$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$_SESSION['burninghot_freeGamesWin'];
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  get_balance($userId) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr.$_SESSION['dcard_burninghot'].$respinMap;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_burninghot");
	return $rtn;		
			
		
	}	
	function FinishSpin(){
	global $demomode, $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_burninghot'];
	$userId=$user_id;
 $_SESSION['dcard_burninghot']=$dc;
		
		
	$user_balance =  get_balance($userId) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['finish_answer']="1040"."10".$rtnBalance.$_SESSION['finish_answer'];	
		
	return $_SESSION['finish_answer'];	
		
	}
	
	/*------------------------------------------------------------*/
	/*-----------------------  DOUBLE ----------------------------*/
	/*----------------------------------------------------------- */
	function GetDouble($daction){
	global $demomode, $login,$userId,$user_id;	
	
	
	$userId=$user_id;
  

	
	$doubleWin=rand(1,2);	
		
	$casbank=get_bank($user_id,'burninghot',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'burninghot',$winall,"double");	
		
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




$winall=sprintf( "%01.2f", $winall );

     $winall_h1=str_replace(".","",$winall."");
	$winall_h=dechex($winall_h1);
	
	$ucard=dechex($ucard);
	if(strlen($ucard)<=1){
	$ucard="0".$ucard;	
	}
	
	
	
	$doubleCards=$_SESSION['dcard_burninghot'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000a10101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'burninghot',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1070"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	$_SESSION['dcard_burninghot']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_burninghot"); 
	
	return $rtn;	
	}
	/////////////////////////////////////////////////////////////////////
	
	/*------------------------------------------------------------*/
	/*-----------------------  DOUBLE HALF------------------------*/
	/*----------------------------------------------------------- */
	function GetDoubleHalf(){
	global $demomode, $login,$userId,$user_id;	
	
	
	$userId=$user_id;
  

	
	$winall=$_SESSION['double_win'];
	
	
	

/*----------------------------*/	

if($winall>0.01){

$winall22=sprintf( "%01.2f", $winall/2);
}else{
$winall22=0;	
}

$winall=$winall-$winall22;

$user_balance =  get_balance($userId)-$winall ;
$_SESSION['double_win']=$winall;

$user_balance=sprintf( "%01.2f",$user_balance);
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	
	$_SESSION['double_balance']=$rtnBalance;

     $winall=sprintf( "%01.2f", $winall );
/*----------------------------*/	


     $winall=sprintf( "%01.2f", $winall );

     $winall_h1=str_replace(".","",$winall."");
	$winall_h=dechex($winall_h1);
	
	$ucard=dechex($ucard);
	if(strlen($ucard)<=1){
	$ucard="0".$ucard;	
	}
	
	$doubleCards=$_SESSION['dcard_burninghot'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1080"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_burninghot");
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

if($_GET['command']=="bet" ){		
$logstr='action='.$_GET['gameCommand'].'##'.$logstr;
$sql= "INSERT DELAYED INTO game_log (game_id,user_id,ip,post, str) values ('".$res1['g_id']."',$user_id,'".getip( )."','','$logstr')";
mysql_query($sql);
}

	
	echo ''.$rtn;
	
	
	
	
?>