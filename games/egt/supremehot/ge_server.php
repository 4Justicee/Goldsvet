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
		

		
	global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	return '{"sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp":'.time().', "qName": "app.services.messages.response.LoginResponse", "currency": "EUR", "multigame": true, "groups": ["all", "myGames", "fruit", "classic", "multiline", "extraline", "diceSlots", "keno", "roulette", "cards"], "showRtp": false, "autoplayLimit": 0, "playerName": "egt01", "languages": ["ro", "nl", "it", "bg", "en", "es", "ru", "fr", "go"], "complex": {"SHJSlot": [{"mlmJackpot": true, "recovery": "norecovery", "gameName": "Burning Hot", "featured": false, "groups": [{"name": "all", "order": 16}, {"name": "fruit", "order": 5}, {"name": "classic", "order": 31}, {"name": "multiline", "order": 35}, {"name": "extraline", "order": 22}, {"name": "diceSlots", "order": 29}, {"name": "keno", "order": 16}, {"name": "roulette", "order": 16}, {"name": "cards", "order": 19}, {"name": "myGames", "order": 17}], "totalBet": 500, "gameIdentificationNumber": 1}]}, "command": "login", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.'}';	

	
	 //set_stat_game($userId, $user_balance, 0,0,"state_supremehot");
	return $rtn;	
	}
	
	function GetJackpots(){

global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4;	

$sets=get_game_settings('supremehot');

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
	$lines=1;

$allbet=($gBet*$lines)/100;

echo $allbet;

$sets=get_game_settings('supremehot');

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

set_game_settings ('supremehot','g_bon1_1',$jacks_str);

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
	
	$_SESSION['supremehot_j'.$jType]++;
	
	if($_SESSION['supremehot_j'.$jType]>=3){
	$jackState="idle";	
	$sets=get_game_settings('supremehot');

$jacks=explode("|",$sets['g_bon1_1']);




$winAmount=$jacks[$jType-1];
$jacks[$jType-1]=0;

$jp1=$jacks[0]*100;
$jp2=$jacks[1]*100;
$jp3=$jacks[2]*100;
$jp4=$jacks[3]*100;


$jacks_str=implode("|",$jacks);

	set_game_settings ('supremehot','g_bon1_1',$jacks_str);
	}
	
	$_SESSION['supremehot_win']=$winAmount;
	
	
	
	if($winAmount>0){
	cange_balance($userId, $winAmount);
    	
	}
	$winAmount=$winAmount*100;
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount":'.$winAmount.', "eventTimestamp": '.time().', "gameNumber": '.time().', "state": "'.$jackState.'", "complex": {"gameCommand": "jackpot","card":'.$isCard.',"jackpot":true}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';	

	
	
	
	$ms=explode("r-r_");
	$_GET['messageId']=$ms[1];
	
	
	$rtn2='{"complex": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 0, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": '.time().', "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_supremehot");
	return $rtn."|".$rtn2;	

	
	}	
	
	function SpinGame(){
	global $demomode, $login,$userId,$user_id,$jp1,$jp2,$jp3,$jp4;	
	
	$userId=$user_id;
	
	$gBet=$_GET['bet'];
	$lines=1;
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
	
	
	
	$ptb[0]=array(0,0,0,10,10,10);
	$ptb[1]=array(0,0,0,10,10,10);
	$ptb[2]=array(0,0,0,10,10,10);
	$ptb[3]=array(0,0,0,10,10,10);
	$ptb[4]=array(0,0,0,20,20,20);
	$ptb[5]=array(0,0,0,20,20,20);
	$ptb[6]=array(0,0,0,40,40,40);
	$ptb[7]=array(0,0,0,80,80,80);
	$ptb[8]=array(0,0,0,100,100,100);
//	$ptb[9]=array(0,0,0,10,100,750);
//	$ptb[10]=array(0,0,0,10,100,1000);
//	$ptb[11]=array(0,0,0,100,1000,5000);
//
//	$ptb[12]=array(0,0,2,4,50,100);
	
	/*-------------*/
	
	$bet=$gBet;
	
	
	/*-------------*/
	$reels=array();
//	$reels[0]=array(0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7);
//	$reels[1]=array(0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7);
//	$reels[2]=array(0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7);
//	$reels[3]=array(0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7);
//	$reels[4]=array(0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7);


        $reels[0]=array(0,1,2,3,4,5,6,7,8);
        $reels[1]=array(0,1,2,3,4,5,6,7,8);
        $reels[2]=array(0,1,2,3,4,5,6,7,8);
        $reels[3]=array(0,1,2,3,4,5,6,7,8);
        $reels[4]=array(0,1,2,3,4,5,6,7,8);
	
	
	
	
	
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
	$cells_combo=array();
	
	$cells_combo[0]=array(-1,-1,-1);
	$cells_combo[1]=array(-1,-1,-1);
	$cells_combo[2]=array(-1,-1,-1);
	$wcard=0;
	$mcard=0;
	$mpay=0;
	for($si=0; $si<=7;$si++){
		
	$s=array(0,0,0,0);

/*------------------*/
if($reels[0][0]==$si){
$s[0]++;	
}
if($reels[0][1]==$si){
$s[0]++;	
}
if($reels[0][2]==$si){
$s[0]++;	
}
/*------------------*/
if($reels[1][0]==$si){
$s[1]++;	
}
if($reels[1][1]==$si){
$s[1]++;	
}
if($reels[1][2]==$si){
$s[1]++;	
}
/*------------------*/
if($reels[2][0]==$si){
$s[2]++;	
}
if($reels[2][1]==$si){
$s[2]++;	
}
if($reels[2][2]==$si){
$s[2]++;	
}

/*-------------------*/

if($s[0]>0 && $s[1]>0 && $s[2]>0){

$winMap[$si]=$ptb[$si][3]*$gBet*$s[0]*$s[1]*$s[2];

$wcard=$si;
$mcard=$s[0]*$s[1]*$s[2];
$mpay=$ptb[$si][3]*$gBet;

/*------------------*/
if($reels[0][0]==$si){
$cells_combo[0][0]=0;	
}
if($reels[0][1]==$si){
$cells_combo[0][1]=1;	
}
if($reels[0][2]==$si){
$cells_combo[0][2]=2;	
}
/*------------------*/
if($reels[1][0]==$si){
$cells_combo[1][0]=0;	
}
if($reels[1][1]==$si){
$cells_combo[1][1]=1;	
}
if($reels[1][2]==$si){
$cells_combo[1][2]=2;	
}
/*------------------*/
if($reels[2][0]==$si){
$cells_combo[2][0]=0;
}
if($reels[2][1]==$si){
$cells_combo[2][1]=1;
}
if($reels[2][2]==$si){
$cells_combo[2][2]=2;	
}	




}	
	

  
	if($winMap[$si]>0){
	//array_push($winMapString,$tmpWinStr);
	}
	$totalWin+=$winMap[$si];
	}
	
	$cells_str="";
	
	/*--------------*/
	if($cells_combo[0][0]>=0){
	$cells_str.="0,0";	
	}
	if($cells_combo[0][1]>=0){
	$cells_str.=",0,1";	
	}
	if($cells_combo[0][2]>=0){
	$cells_str.=",0,2";	
	}
	/*--------------*/
	if($cells_combo[1][0]>=0){
	$cells_str.=",1,0";	
	}
	if($cells_combo[1][1]>=0){
	$cells_str.=",1,1";	
	}
	if($cells_combo[1][2]>=0){
	$cells_str.=",1,2";	
	}
	/*--------------*/
	if($cells_combo[2][0]>=0){
	$cells_str.=",2,0";	
	}
	if($cells_combo[2][1]>=0){
	$cells_str.=",2,1";	
	}
	if($cells_combo[2][2]>=0){
	$cells_str.=",2,2";	
	}
	$ws="";
	
	
	if($cells_str{0}==","){
	$cells_str = substr($cells_str, 1, strlen($cells_str));	
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
	//$ws="";
	//print_r($cells_combo);
	if($totalWin>0){
	//$ws=implode(",",$winMapString);
	$gameState="gamble";
	$ws='{"card":'.$wcard.',"len":3,"count":'.$mcard.',"winPerCount":'.$mpay.',"multiplier":1,"winAmount":'.$totalWin.',"cells":['.$cells_str.']}';
	
	
	
 cange_balance($userId, $totalWin/100);
 change_bank($user_id,'supremehot',($totalWin/100)*-1,"spin");	
	
	

	
	
	}
	
	
	$_SESSION['supremehot_win']=$totalWin;
	
	$reelString="3, ".$reels[0][0].", ".$reels[0][1].", ".$reels[0][2].", 3, 2, ".$reels[1][0].", ".$reels[1][1].", ".$reels[1][2].", 4, 2, ".$reels[2][0].", ".$reels[2][1].", ".$reels[2][2].", 0";
	//$reelString="7,0,0,0,3,4,0,0,0,4,2,5,0,0,0";
	
	
	
	
	///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
		if($isJack){
	
	$gameState="jackpot";
	$isJackStr="true";
	
	$_SESSION['supremehot_j1']=0;
	$_SESSION['supremehot_j2']=0;
	$_SESSION['supremehot_j3']=0;
	$_SESSION['supremehot_j4']=0;
	
	}else{
	$isJackStr="false";	
	}
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$totalWin.', "eventTimestamp": '.time().', "gameNumber": 1538645, "state": "'.$gameState.'", "complex": {"jackpot": '.$isJackStr.', "freespins": 0, "scatters": ['.$scatterCells.'], "expand": [], "gambles": 0, "gameCommand": "bet", "combos": ['.$ws.'], "reels": ['.$reelString.'], "freespinScatters": []}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';
	//$rtn='{"complex":{"reels":[6,0,0,0,3,4,8,5,4,1,2,2,2,5,0],"combos":['.$ws.'],"scatters":['.$scatterCells.'],"expand":[],"gambles":0,"jackpot":'.$isJackStr.',"gameCommand":"bet"},"state":"'.$gameState.'","winAmount":'.$totalWin.',"gameIdentificationNumber":821,"gameNumber":1476832894977,"balance":'.$user_balance.',"sessionKey":"'.$_GET['sessionKey'].'","msg":"success","messageId":"'.$_GET['messageId'].'","qName":"app.services.messages.response.GameEventResponse","command":"bet","eventTimestamp":'.time().'}';
	
	SetJackpots();
	
	$ms=explode("r-r_");
	$_GET['messageId']=$ms[1];
	
	
	
	$rtn2='{"complex": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.',"winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_supremehot");
	return $rtn."|".$rtn2;	
	}
	
	
	function CollectGame(){
		
	
///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =get_balance($userId)*100 ;
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "winAmount": '.$_SESSION['supremehot_win'].', "eventTimestamp": '.time().', "gameNumber": 1561257, "state": "idle", "complex": {"gameCommand": "collect"}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "balance": '.$user_balance.', "gameIdentificationNumber": 1}';	

	
	
	
	
	
	
	$rtn2='{"complex": {"levelI": 1286, "levelII": 2259, "levelIII": 50284, "levelIV": 100267, "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//set_stat_game($userId, $user_balance, 0,0,"state_supremehot");
	return $rtn."|".$rtn2;	

	
	}

function PingGame(){
	//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr;
	
	
	//$userId=$user_id;
    $user_balance = 5000;//  get_balance($userId) ;
	
	$rtn='{"qName": "app.services.messages.response.BaseResponse", "sessionKey": "'.$_GET['sessionKey'].'", "command": "ping", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success"}';
    $rtn2='{"complex": {"levelI": 0, "levelII": 0, "levelIII": 0, "levelIV": 0, "winsLevelI": 0, "largestWinLevelI": 0, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	//set_stat_game($userId, $user_balance, 0,0,"state_supremehot");
	return $rtn."|".$rtn2;	
	}
	
function DoubleGame(){
	global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
	
	$doubleWin=$_SESSION['supremehot_win'];
	
	 cange_balance($userId, ($doubleWin/100)*-1);
 change_bank($user_id,'supremehot',($doubleWin/100),"double");	
	
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
 change_bank($user_id,'supremehot',($doubleWin/100)*-1,"double");	

	}
	
	
	$_SESSION['supremehot_win']=$doubleWin;
	
	$rtn='{"sessionKey": "'.$_GET['sessionKey'].'", "qName": "app.services.messages.response.GameEventResponse", "eventTimestamp": '.time().', "gameNumber": 1561277, "state": "'.$gameState.'", "complex": {"jackpot": false, "gameCommand": "gamble", "gambles": 4, "card": '.$ucard.'}, "command": "bet", "messageId": "'.$_GET['messageId'].'", "msg": "success", "winAmount": '.$doubleWin.', "gameIdentificationNumber": 1}';
    $rtn2='{"complex": {"levelI": 0, "levelII": 0, "levelIII": 0, "levelIV": 0, "winsLevelI": 0, "largestWinLevelI": 0, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "command": "event", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	
	//set_stat_game($userId, $user_balance, 0,0,"state_supremehot");
	return $rtn."|".$rtn2;	
	}	


function InitGame2(){
	//global $demomode, $login,$userId,$user_id;	
		global $demomode, $reqArr,$jp1,$jp2,$jp3,$jp4;
	
	
//	$userId=$user_id;
 //   $user_balance =  get_balance($userId) ;
	
	$rtn='{"complex": {"jackpotState": {"levelI": '.$jp1.', "levelII":'.$jp2.', "levelIII":'.$jp3.', "levelIV":'.$jp4.', "winsLevelI": 1108, "largestWinLevelI": 1108, "largestWinDateLevelI": "07-12-2016 01:19", "largestWinUserLevelI": "egt02", "lastWinLevelI": 1108, "lastWinDateLevelI": "07-12-2016 01:19", "lastWinUserLevelI": "egt02", "winsLevelII": 0, "largestWinLevelII": 0, "largestWinDateLevelII": "Never", "largestWinUserLevelII": "None", "lastWinLevelII": 0, "lastWinDateLevelII": "Never", "lastWinUserLevelII": "None", "winsLevelIII": 0, "largestWinLevelIII": 0, "largestWinDateLevelIII": "Never", "largestWinUserLevelIII": "None", "lastWinLevelIII": 0, "lastWinDateLevelIII": "Never", "lastWinUserLevelIII": "None", "winsLevelIV": 100118, "largestWinLevelIV": 100118, "largestWinDateLevelIV": "07-12-2016 01:19", "largestWinUserLevelIV": "egt01", "lastWinLevelIV": 100118, "lastWinDateLevelIV": "07-12-2016 01:19", "lastWinUserLevelIV": "egt01"}, "currentState": {"jackpot": false, "previousGambles": [], "numberOfLines": 5, "denomination": 1, "scatters": [], "gambles": 0, "expand": [], "winAmount": 0, "gamblesUsed": 0, "lines": [], "state": "idle", "bet": 100,"combo":27,"denomination":100, "reels": [7,0,0,0,3,4,0,0,0,4,2,5,0,0,0,1]}}, "command": "subscribe", "sessionKey": "3nsVx8d68WuTSYhk1489068162355", "eventTimestamp":'.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameEventResponse", "gameIdentificationNumber": 1}';
	//$rtn='{"complex":{"currentState":{"gamblesUsed":0,"previousGambles":[],"bet":100,"combo":27,"denomination":100,"state":"idle","winAmount":0,"reels":[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2],"combos":[],"scatters":[],"expand":[],"gambles":0,"jackpot":false},"jackpotState":{"levelI":1601200,"levelII":6799200,"levelIII":12662900,"levelIV":11858300,"winsLevelI":26608,"largestWinLevelI":10734100,"largestWinDateLevelI":"Mar 7, 2015 8:15:02 PM","largestWinUserLevelI":"Demo Player - 1425759209310","lastWinLevelI":1732900,"lastWinDateLevelI":"Mar 30, 2017 5:31:31 PM","lastWinUserLevelI":"Demo Player - 1490895058522","winsLevelII":13539,"largestWinLevelII":21906600,"largestWinDateLevelII":"Mar 2, 2015 12:48:47 PM","largestWinUserLevelII":"Demo Player - 1424954706344","lastWinLevelII":3259400,"lastWinDateLevelII":"Mar 30, 2017 4:28:41 PM","lastWinUserLevelII":"Demo Player - 1490891260648","winsLevelIII":3680,"largestWinLevelIII":72872100,"largestWinDateLevelIII":"Mar 7, 2015 11:59:09 PM","largestWinUserLevelIII":"Demo Player - 1425771776407","lastWinLevelIII":21165900,"lastWinDateLevelIII":"Mar 30, 2017 4:48:48 PM","lastWinUserLevelIII":"Demo Player - 1490892354953","winsLevelIV":1367,"largestWinLevelIV":224580100,"largestWinDateLevelIV":"Feb 27, 2015 6:46:24 PM","largestWinUserLevelIV":"Demo Player - 1425059781145","lastWinLevelIV":22090400,"lastWinDateLevelIV":"Mar 30, 2017 5:23:44 PM","lastWinUserLevelIV":"Demo Player - 1490890286876"}},"gameIdentificationNumber":821,"gameNumber":-1,"sessionKey":"'.$_GET['sessionKey'].'","msg":"success","messageId":"'.$_GET['messageId'].'","qName":"app.services.messages.response.GameEventResponse","command":"subscribe","eventTimestamp":'.time().'}';
	
	// set_stat_game($userId, $user_balance, 0,0,"state_supremehot");
	return $rtn;	
	}


function InitGame3(){
//global $demomode, $login,$userId,$user_id;	
	global $demomode, $reqArr,$conf;
	
	
	//$userId=$user_id;
  //  $user_balance =  get_balance($userId) ;
	
	$rtn='{"complex": {"bets": ['.$conf['bets'].'], "jackpot": true, "mainFakeReels": [[6,1,1,1,6,0,0,0,1,1,1,2,2,2,3,3,3,5,2,2,2,5,8,2,2,2,5,1,1,1],[7,6,5,0,8,2,2,2,3,3,3,7,5,1,1,1,0,0,0,2,2,2,0,8,6,0,2,2,2,0],[0,0,0,2,2,2,0,7,5,6,4,0,0,0,6,0,3,3,3,5,1,1,1,5,7,2,2,2,5,8]], "paytableCoef": {"0": {"multiplier": 1, "coef": [10]}, "1": {"multiplier": 1, "coef": [10]}, "2": {"multiplier": 1, "coef": [10]}, "3": {"multiplier": 1, "coef": [10]}, "4": {"multiplier": 1, "coef": [20]}, "5": {"multiplier": 1, "coef": [20]}, "6": {"multiplier": 1, "coef": [40]}, "7": {"multiplier": 1, "coef": [80]}, "8": {"multiplier": 1, "coef": [100]}}, "jackpotMinBet": 1, "denominations": [ [100, 70, 300000]], "jackpotMaxBet": 100000}, "command": "settings", "sessionKey": "'.$_GET['sessionKey'].'", "eventTimestamp": '.time().', "messageId": "'.$_GET['messageId'].'", "msg": "success", "gameNumber": -1, "qName": "app.services.messages.response.GameResponse", "gameIdentificationNumber": 1}';
	//$rtn='{"complex":{"paytableCoef":{"0":{"coef":[10],"multiplier":1},"1":{"coef":[10],"multiplier":1},"2":{"coef":[10],"multiplier":1},"3":{"coef":[10],"multiplier":1},"4":{"coef":[80],"multiplier":1},"5":{"coef":[80],"multiplier":1},"6":{"coef":[100],"multiplier":1},"7":{"coef":[200],"multiplier":1},"8":{"coef":[300],"multiplier":1}},"bets":[1,2,5,10,20],"jackpotMinBet":1,"lines":[5],"jackpot":true,"mainFakeReels":[[6,1,1,1,6,0,0,0,1,1,1,2,2,2,3,3,3,5,2,2,2,5,8,2,2,2,5,1,1,1],[7,6,5,0,8,2,2,2,3,3,3,7,5,1,1,1,0,0,0,2,2,2,0,8,6,0,2,2,2,0],[0,0,0,2,2,2,0,7,5,6,4,0,0,0,6,0,3,3,3,5,1,1,1,5,7,2,2,2,5,8]],"jackpotMaxBet":100000,"denominations":[[100,70,3000000]]},"gameIdentificationNumber":821,"gameNumber":-1,"sessionKey":"'.$_GET['sessionKey'].'","msg":"success","messageId":"'.$_GET['messageId'].'","qName":"app.services.messages.response.GameResponse","command":"settings","eventTimestamp":'.time().'}';
	// set_stat_game($userId, $user_balance, 0,0,"state_supremehot");
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