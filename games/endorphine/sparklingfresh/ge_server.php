<?php
error_reporting(0);
include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';



$action="spin";

	
	
	/*------------------------------------------------------------*/
	/*-----------------------  INIT ----------------------------*/
	/*----------------------------------------------------------- */
	
	function InitGame(){

		
	global $demomode, $login,$userId,$user_id,$conf;	
	
	
	
	$userId=$user_id;
    $user_balance =sprintf("%01.2f",get_balance($userId));
	
	$rtn1='{"@type":"Message","payload":{"@type":"Balance","balance":"'.$user_balance.'","currency":"EUR"}}';
	$rtn2='{"@type":"Message","payload":{"@type":"Payment","amount":"'.$user_balance.'","currency":"EUR","type":"DEPOSIT"}}';
	$rtn3='{"@type":"MethodInvocation","payload":{"@type":"logic.api.paytable.slot.Paytable_Info_Slot","gameId":"endorphina_4OfAKing","gameName":"4OfAKing","reels":5,"sectors":3,"symbols":7,"bets_set":['.$conf['bets'].'],"lines_set":[5],"denoms_set":["1.000"],"virtual_strips":null,"virtual_fg_strips":null,"critical_bet":null,"no_gamble_after_bonus":false,"bonus_strips":[],"extra_bet":null,"maxbet_in_money":null,"gambleLimit":null},"requestId":"0","method":"GET_PAYTABLE_INFO"}';
	
	return $rtn1."|".$rtn2."|".$rtn3;	
	}
	
	function SpinGame(){
	global $demomode, $login,$userId,$user_id;	
	
	$userId=$user_id;
	
	$gBet=$_GET['bet'];
	$lines=$_GET['lines'];
	$allbet=($gBet*$lines);
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	if(!isset($_SESSION['sparklingfresh_fsc'])){
	$_SESSION['sparklingfresh_fsc']=0;	
	}
	
	if($_SESSION['sparklingfresh_fsc']<=0){
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'sparklingfresh',$allbet,"spin");
	}
	////////////////////////////////
	
	$userId=$user_id;
     $user_balance =sprintf("%01.2f",get_balance($userId));
	
	$wild=11;
	$scatter=12;
	
	/*-----lines--------*/
	
	$linesId=array();
	
	$linesId[0]=array(1,1,1,1,1);
	$linesId[1]=array(0,0,0,0,0);
	$linesId[2]=array(2,2,2,2,2);
	
	$linesId[3]=array(0,1,2,1,0);
	$linesId[4]=array(2,1,0,1,2);
	
	$linesId[5]=array(0,0,1,0,0);
	$linesId[6]=array(2,2,1,2,2);
	
	$linesId[7]=array(1,2,2,2,1);
	$linesId[8]=array(1,0,0,0,1);
	
	$linesId[9]=array(1,0,1,0,1);
	$linesId[10]=array(1,2,1,2,1);
	
	$linesId[11]=array(0,1,0,1,0);
	$linesId[12]=array(2,1,2,1,2);

	$linesId[13]=array(1,1,0,1,1);
	$linesId[14]=array(1,1,2,1,1);

	
	$linesId[15]=array(0,1,1,1,0);
	$linesId[16]=array(2,1,1,1,2);
	
	$linesId[17]=array(0,1,2,2,2);
	$linesId[18]=array(2,1,0,0,0);
	
	$linesId[19]=array(0,2,0,2,0);
	$linesId[20]=array(2,0,2,0,2);

	$linesId[21]=array(0,2,2,2,0);
	$linesId[22]=array(2,0,0,0,2);
	
	
	
	
	
	$ptb[1]=array(0,0,0,20,100,1000);
	$ptb[2]=array(0,0,0,10,60,500);
	$ptb[3]=array(0,0,0,10,60,500);
	$ptb[4]=array(0,0,0,5,40,200);
	
	$ptb[5]=array(0,0,0,5,40,200);
	$ptb[6]=array(0,0,0,5,20,100);
	$ptb[7]=array(0,0,0,5,20,100);
	$ptb[8]=array(0,0,0,10,100,400);
	$ptb[9]=array(0,0,0,10,100,750);
	$ptb[10]=array(0,0,0,10,100,1000);
	$ptb[11]=array(0,0,0,100,1000,5000);
	
	$ptb[12]=array(0,0,2,4,50,100);
	
	/*-------------*/
	
	$bet=$gBet;
	
	
	/*-------------*/
	$reels=array();
	
	
	
    $reels[0]=array(1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7);
	$reels[1]=array(1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7);
	$reels[2]=array(1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7);
	$reels[3]=array(1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7);
	$reels[4]=array(1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,6,7);
	
	
	
	

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
	
	if($_SESSION['sparklingfresh_fsc']>0){
	$winMpl=2;	
	}
	
	$isCalc=true;
	
	
	while($isCalc){
	
	$calcCount++;
	
	$wild=11;
	$scatter=12;
	
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
	for($i=0;$i<$lines;$i++){
		
	$s=array();

	
	
	$s[0]=$reels[0][$linesId[$i][0]];
	$s[1]=$reels[1][$linesId[$i][1]];
	$s[2]=$reels[2][$linesId[$i][2]];
	$s[3]=$reels[3][$linesId[$i][3]];
	$s[4]=$reels[4][$linesId[$i][4]];
	$tmpWinStr="";
    for($j=1;$j<=7;$j++){//////////symloop

	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild)){
		
	if($ptb[$j][3]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][3]*$bet*$winMpl;	
	
	$tmpWinStr='{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":'.($linesId[$i][4]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":'.($linesId[$i][3]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":'.($linesId[$i][2]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":'.($linesId[$i][1]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":'.($linesId[$i][0]).'}],"icons":[0,0,'.$j.','.$j.','.$j.'],"jokers":[0,0,0,0,0],"strip_icons":[0,0,'.$j.','.$j.','.$j.'],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":34,"line_number":'.($i+1).',"win":'.$winMap[$i].',"playing_symbol":'.$j.',"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}';

	}
	
	}////////////3->
	if(($s[4]==$j || $s[4]==$wild) && ($s[3]==$j || $s[3]==$wild) && ($s[2]==$j || $s[2]==$wild)){
		
	if($ptb[$j][3]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][3]*$bet*$winMpl;	
	
	$tmpWinStr='{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":'.($linesId[$i][4]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":'.($linesId[$i][3]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":'.($linesId[$i][2]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":'.($linesId[$i][1]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":'.($linesId[$i][0]).'}],"icons":['.$j.','.$j.','.$j.',0,0],"jokers":[0,0,0,0,0],"strip_icons":['.$j.','.$j.','.$j.',0,0],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":34,"line_number":'.($i+1).',"win":'.$winMap[$i].',"playing_symbol":'.$j.',"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}';

	}
	
	}////////////3<-
	
	
	
	
	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild) && ($s[3]==$j || $s[3]==$wild)){
		
	if($ptb[$j][4]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][4]*$bet*$winMpl;	
	$tmpWinStr='{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":'.($linesId[$i][4]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":'.($linesId[$i][3]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":'.($linesId[$i][2]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":'.($linesId[$i][1]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":'.($linesId[$i][0]).'}],"icons":[0,'.$j.','.$j.','.$j.','.$j.'],"jokers":[0,0,0,0,0],"strip_icons":[0,'.$j.','.$j.','.$j.','.$j.'],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":34,"line_number":'.($i+1).',"win":'.$winMap[$i].',"playing_symbol":'.$j.',"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}';

	}
	
	}////////////4->
	
	
	if(($s[4]==$j || $s[4]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild) && ($s[3]==$j || $s[3]==$wild)){
		
	if($ptb[$j][4]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][4]*$bet*$winMpl;	
	$tmpWinStr='{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":'.($linesId[$i][4]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":'.($linesId[$i][3]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":'.($linesId[$i][2]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":'.($linesId[$i][1]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":'.($linesId[$i][0]).'}],"icons":['.$j.','.$j.','.$j.','.$j.',0],"jokers":[0,0,0,0,0],"strip_icons":['.$j.','.$j.','.$j.','.$j.',0],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":34,"line_number":'.($i+1).',"win":'.$winMap[$i].',"playing_symbol":'.$j.',"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}';

	}
	
	}////////////4<-
	
	if(($s[0]==$j || $s[0]==$wild) && ($s[1]==$j || $s[1]==$wild) && ($s[2]==$j || $s[2]==$wild) && ($s[3]==$j || $s[3]==$wild)  && ($s[4]==$j || $s[4]==$wild)){
		
	if($ptb[$j][5]*$bet>$winMap[$i]){	
	$winMap[$i]=$ptb[$j][5]*$bet*$winMpl;	
	$tmpWinStr='{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":'.($linesId[$i][4]+1).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":'.($linesId[$i][3]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":'.($linesId[$i][2]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":'.($linesId[$i][1]).'},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":'.($linesId[$i][0]).'}],"icons":['.$j.','.$j.','.$j.','.$j.','.$j.'],"jokers":[0,0,0,0,0],"strip_icons":['.$j.','.$j.','.$j.','.$j.','.$j.'],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":34,"line_number":'.($i+1).',"win":'.$winMap[$i].',"playing_symbol":'.$j.',"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}';

	
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
	
	if($_SESSION['sparklingfresh_fsc']<=0){
		
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
	
	$scatterCells.='], "scatterName": 12, "winAmount": '.$scatterWin.'}';		
	
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


	}
	
	}
	
	$gameState="FINISHED";
	$ws="";
	
	if($totalWin>0){
	$ws=implode(",",$winMapString);
	$gameState="IN_PROGRESS";
	
	
	
	
 cange_balance($userId, $totalWin);
 change_bank($user_id,'sparklingfresh',($totalWin)*-1,"spin");	
	
	

	
	
	}
	
	
	
	
	
	
	
	$reelString="[".$reels[0][0].", ".$reels[0][1].", ".$reels[0][2]."],[".$reels[1][0].", ".$reels[1][1].", ".$reels[1][2]."],[".$reels[2][0].", ".$reels[2][1].", ".$reels[2][2]."],[".$reels[3][0].", ".$reels[3][1].", ".$reels[3][2]."],[".$reels[4][0].", ".$reels[4][1].", ".$reels[4][2]."]";
	
	
		$_SESSION['sparklingfresh_win']=$totalWin;
	
	
	
	///////                                                                                                                                                                                                                                                                                                                                          r1 r1 r1       r2  r2 r2        r3 r3 r3       r4 r4 r4       r5 r5 r5                                                        
	
	//////{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":1}],"icons":[6,6,6,0,0],"jokers":[0,0,0,0,0],"strip_icons":[0,0,6,6,6],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":34,"line_number":6,"win":5,"playing_symbol":6,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}
	
	$rtn='{"@type":"MethodInvocation","payload":{"@type":"GameResponse","data":{"@type":"logic.api.gamelogic.Game_History_Item","features":[{"@type":"logic.api.gamelogic.Feature_State","feature_id":"SLOT","id":0,"init_parameters":{"@type":"logic.api.gamelogic.slot.Slot_Init_Parameters"},"current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":true,"curr_reaction":null},"prev_current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":false,"curr_reaction":null},"current_win":'.$totalWin.',"status":"'.$gameState.'","last_step":{"@type":"logic.api.gamelogic.Feature_Step","action":{"@type":"logic.api.gamelogic.slot.Slot_Action"},"reaction":{"@type":"logic.api.gamelogic.slot.Slot_Reaction","spin_result":{"@type":"logic.api.paytable.slot.spinresult.Slot_Spin_Result","drum":['.$reelString.'],"final_drum":null,"items":['.$ws.'],"sound_flags":[false,false,false,false,false],"teaser_flags":[false,false,false,false,false],"wild_multiplier":null,"triggers":null,"pre_animation":null}}},"parent_index":0}],"betting_param":{"@type":"logic.api.gamelogic.slot.Slot_Betting_Parameters","denom":"1.000","bet_per_line":1,"num_of_lines":5,"extra_bet":0},"status":"'.$gameState.'","winLimit":"9223372036854775807","game_current_state":{"@type":"logic.api.gamelogic.Game_Current_State","counter":null,"num_of_accumulating_jokers_x_total_bet_amount":null}},"balance":{"@type":"Balance","balance":"'.$user_balance.'","currency":"EUR"},"jackpot":null},"requestId":"1","method":"START_GAME"}';
	
	

	return $rtn;	
	}
	
	
	function CollectGame(){
	global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =sprintf("%01.2f",get_balance($userId));
	
	
	
	
	
	
	
	$rtn='{"@type":"MethodInvocation","payload":{"@type":"GameResponse","data":{"@type":"logic.api.gamelogic.Game_History_Item","features":[{"@type":"logic.api.gamelogic.Feature_State","feature_id":"SLOT","id":0,"init_parameters":{"@type":"logic.api.gamelogic.slot.Slot_Init_Parameters"},"current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":true,"curr_reaction":null},"prev_current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":false,"curr_reaction":null},"current_win":295,"status":"FINISHED","last_step":{"@type":"logic.api.gamelogic.Feature_Step","action":{"@type":"logic.api.gamelogic.slot.Slot_Action"},"reaction":{"@type":"logic.api.gamelogic.slot.Slot_Reaction","spin_result":{"@type":"logic.api.paytable.slot.spinresult.Slot_Spin_Result","drum":[[1,1,1],[2,4,4],[4,4,4],[7,7,7],[5,8,1]],"final_drum":null,"items":[{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":1}],"icons":[8],"jokers":[0],"strip_icons":[5],"animation_id":null,"layer_id":null,"fullscreen_animation_id":null,"combo_id":42,"line_number":0,"win":0,"playing_symbol":-1,"win_multiplier":1,"bonus_id":"EXPANDING_JOKER","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":1}],"icons":[8,8,4,4,0],"jokers":[0,0,0,0,0],"strip_icons":[0,4,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":20,"line_number":1,"win":40,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":0}],"icons":[8,8,4,0,0],"jokers":[0,0,0,0,0],"strip_icons":[0,0,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":22,"line_number":2,"win":5,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":2}],"icons":[8,8,4,4,0],"jokers":[0,0,0,0,0],"strip_icons":[0,4,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":20,"line_number":3,"win":40,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":0}],"icons":[8,8,4,4,0],"jokers":[0,0,0,0,0],"strip_icons":[0,4,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":20,"line_number":4,"win":40,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":2}],"icons":[8,8,4,4,0],"jokers":[0,0,0,0,0],"strip_icons":[0,4,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":20,"line_number":5,"win":40,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":1}],"icons":[8,8,4,4,0],"jokers":[0,0,0,0,0],"strip_icons":[0,4,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":20,"line_number":6,"win":40,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":1}],"icons":[8,8,4,0,0],"jokers":[0,0,0,0,0],"strip_icons":[0,0,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":22,"line_number":7,"win":5,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":2}],"icons":[8,8,4,4,0],"jokers":[0,0,0,0,0],"strip_icons":[0,4,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":20,"line_number":8,"win":40,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":0}],"icons":[8,8,4,0,0],"jokers":[0,0,0,0,0],"strip_icons":[0,0,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":22,"line_number":9,"win":5,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":2}],"icons":[8,8,4,4,0],"jokers":[0,0,0,0,0],"strip_icons":[0,4,4,8,8],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":20,"line_number":10,"win":40,"playing_symbol":4,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}],"sound_flags":[false,false,false,false,false],"teaser_flags":[false,false,false,false,false],"wild_multiplier":null,"triggers":null,"pre_animation":null}}},"parent_index":0}],"betting_param":{"@type":"logic.api.gamelogic.slot.Slot_Betting_Parameters","denom":"1.000","bet_per_line":1,"num_of_lines":5,"extra_bet":0},"status":"FINISHED","winLimit":"9223372036854775807","game_current_state":{"@type":"logic.api.gamelogic.Game_Current_State","counter":null,"num_of_accumulating_jokers_x_total_bet_amount":null}},"balance":{"@type":"Balance","balance":"'. $user_balance.'","currency":"EUR"},"jackpot":null},"requestId":"1","method":"END_GAME"}';
	return $rtn;	

	
	}
	

	
function CollectGame2(){
	
	global $demomode, $reqArr;
	
	
	$rtn='{"@type":"MethodInvocation","payload":{"@type":"logic.api.gamelogic.Game_History_Item","features":[{"@type":"logic.api.gamelogic.Feature_State","feature_id":"SLOT","id":0,"init_parameters":{"@type":"logic.api.gamelogic.slot.Slot_Init_Parameters"},"current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":true,"curr_reaction":null},"prev_current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":false,"curr_reaction":null},"current_win":40,"status":"FINISHED","last_step":{"@type":"logic.api.gamelogic.Feature_Step","action":{"@type":"logic.api.gamelogic.slot.Slot_Action"},"reaction":{"@type":"logic.api.gamelogic.slot.Slot_Reaction","spin_result":{"@type":"logic.api.paytable.slot.spinresult.Slot_Spin_Result","drum":[[3,4,4],[7,1,1],[7,7,6],[7,7,7],[7,5,5]],"final_drum":null,"items":[{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":0}],"icons":[7,7,7,7,0],"jokers":[0,0,0,0,0],"strip_icons":[0,7,7,7,7],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":38,"line_number":2,"win":20,"playing_symbol":7,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":1}],"icons":[0,7,7,7,0],"jokers":[0,0,0,0,0],"strip_icons":[0,7,7,7,0],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":41,"line_number":7,"win":5,"playing_symbol":7,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":2}],"icons":[7,7,7,0,0],"jokers":[0,0,0,0,0],"strip_icons":[0,0,7,7,7],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":40,"line_number":8,"win":5,"playing_symbol":7,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":2}],"icons":[0,7,7,7,0],"jokers":[0,0,0,0,0],"strip_icons":[0,7,7,7,0],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":41,"line_number":9,"win":5,"playing_symbol":7,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":2}],"icons":[7,7,7,0,0],"jokers":[0,0,0,0,0],"strip_icons":[0,0,7,7,7],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":40,"line_number":10,"win":5,"playing_symbol":7,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}],"sound_flags":[false,false,false,false,false],"teaser_flags":[false,false,false,false,false],"wild_multiplier":null,"triggers":null,"pre_animation":null}}},"parent_index":0}],"betting_param":{"@type":"logic.api.gamelogic.slot.Slot_Betting_Parameters","denom":"1.000","bet_per_line":1,"num_of_lines":5,"extra_bet":0},"status":"IN_PROGRESS","winLimit":"9223372036854775807","game_current_state":{"@type":"logic.api.gamelogic.Game_Current_State","counter":null,"num_of_accumulating_jokers_x_total_bet_amount":null}},"requestId":"1","method":"END_FEATURE"}';
   
	return $rtn;
	}
	

function GetDouble(){
	global $demomode, $login,$userId,$user_id;	
	
	$cardSuits=array("CLUBS","HEARTS","DIAMONDS","SPADES");
	$dealerCard=rand(0,12);
	$_SESSION['sparklingfresh_dc']=$dealerCard;
	$_SESSION['sparklingfresh_dcstr']='{"@type":"logic.api.gamelogic.gamble.Card","rank":'.$dealerCard.',"is_joker":false,"suit":"'.$cardSuits[0].'"}';
	shuffle($cardSuits);
	
	$userId=$user_id;
    $user_balance =sprintf("%01.2f",get_balance($userId));
	$_SESSION['sparklingfresh_dcnt']=10;
	$rtn='{"@type":"MethodInvocation","payload":{"@type":"logic.api.gamelogic.Feature_State","feature_id":"GAMBLE","id":2,"init_parameters":{"@type":"logic.api.gamelogic.gamble.Gamble_Init_Parameters","start_win":'.$_SESSION['sparklingfresh_win'].',"mults":[2],"tries":10},"current_state":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"curr_win":'.$_SESSION['sparklingfresh_win'].',"tries":10,"gamble_reactions":[],"dealer_card":{"@type":"logic.api.gamelogic.gamble.Card","rank":'.$dealerCard.',"is_joker":false,"suit":"'.$cardSuits[0].'"},"must_play":false},"prev_current_state":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"curr_win":60,"tries":10,"gamble_reactions":[],"dealer_card":{"@type":"logic.api.gamelogic.gamble.Card","rank":12,"is_joker":false,"suit":"HEARTS"},"must_play":false},"current_win":0,"status":"IN_PROGRESS","last_step":null,"parent_index":0},"requestId":"1","method":"START_FEATURE"}';
	return $rtn;	
	}
	
function StepDouble(){
	global $demomode, $login,$userId,$user_id;	
	
	$cardSuits=array("CLUBS","HEARTS","DIAMONDS","SPADES","CLUBS","HEARTS","DIAMONDS","SPADES");
	$userId=$user_id;
	cange_balance($userId,$_SESSION['sparklingfresh_win']*-1);
    change_bank($user_id,'sparklingfresh',$_SESSION['sparklingfresh_win'],"double");	
	
	$dwin=$_SESSION['sparklingfresh_win'];
	$dwins=$dwin;
	$rnd_double=rand(1,2);
	$isWin="false";
	if($rnd_double==1){
	$uCard=rand($_SESSION['sparklingfresh_dc'],12);
    $dwin=$dwin*2;	
	$isWin="true";
	}else{
	$dwin=0;	
    $uCard=rand(0,$_SESSION['sparklingfresh_dc']);		
	}
	
	/*if($uCard==$_SESSION['sparklingfresh_dc']){
	$dwin=$_SESSION['sparklingfresh_win'];	
	$isWin="true";
	$dwins=$dwin;
	}*/
	
	
	
	if($dwin>0){
	
	cange_balance($userId,$dwin);
	//file_put_contents("1.txt",$dwin."-".$ss);
    change_bank($user_id,'sparklingfresh',$dwin*-1,"double");	
	
	}
	
	shuffle($cardSuits);
	
	$userId=$user_id;
    //$user_balance =sprintf("%01.2f",get_balance($userId));
	$_SESSION['sparklingfresh_dcnt']--;
	$crds=array();
	$crds[0]='{"@type":"logic.api.gamelogic.gamble.Card","rank":'.rand(0,0).',"is_joker":false,"suit":"'.$cardSuits[0].'"}';
	$crds[1]='{"@type":"logic.api.gamelogic.gamble.Card","rank":'.rand(0,0).',"is_joker":false,"suit":"'.$cardSuits[1].'"}';
	$crds[2]='{"@type":"logic.api.gamelogic.gamble.Card","rank":'.rand(0,0).',"is_joker":false,"suit":"'.$cardSuits[2].'"}';
	$crds[3]='{"@type":"logic.api.gamelogic.gamble.Card","rank":'.rand(0,0).',"is_joker":false,"suit":"'.$cardSuits[3].'"}';
	$crds[4]='{"@type":"logic.api.gamelogic.gamble.Card","rank":'.rand(0,0).',"is_joker":false,"suit":"'.$cardSuits[4].'"}';
	
	$crds[$_GET['pcard']+1]='{"@type":"logic.api.gamelogic.gamble.Card","rank":'.$uCard.',"is_joker":false,"suit":"'.$cardSuits[5].'"}';
	
	$userCards=implode(",",$crds);
	
	$newDc=rand(0,12);
	
	$rtn='{"@type":"MethodInvocation","payload":{"@type":"logic.api.gamelogic.FeatureStateWrapper","state":{"@type":"logic.api.gamelogic.Feature_State","feature_id":"GAMBLE","id":0,"init_parameters":{"@type":"logic.api.gamelogic.gamble.Gamble_Init_Parameters","start_win":'.$dwins.',"mults":[2],"tries":10},"current_state":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"curr_win":'.$dwin.',"tries":'.$_SESSION['sparklingfresh_dcnt'].',"gamble_reactions":[],"dealer_card":{"@type":"logic.api.gamelogic.gamble.Card","rank":'.$newDc.',"is_joker":false,"suit":"SPADES"},"must_play":false},"prev_current_state":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"curr_win":40,"tries":10,"gamble_reactions":[],"dealer_card":{"@type":"logic.api.gamelogic.gamble.Card","rank":'.$newDc.',"is_joker":false,"suit":"CLUBS"},"must_play":false},"current_win":40,"status":"IN_PROGRESS","last_step":{"@type":"logic.api.gamelogic.Feature_Step","action":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Action","bet":40,"player_choice":'.$_GET['pcard'].'},"reaction":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Reaction","is_win":true,"cards":['.$userCards.']}},"parent_index":0},"historyItem":{"@type":"logic.api.gamelogic.Game_History_Item","features":[{"@type":"logic.api.gamelogic.Feature_State","feature_id":"SLOT","id":0,"init_parameters":{"@type":"logic.api.gamelogic.slot.Slot_Init_Parameters"},"current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":true,"curr_reaction":null},"prev_current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":false,"curr_reaction":null},"current_win":40,"status":"FINISHED","last_step":{"@type":"logic.api.gamelogic.Feature_Step","action":{"@type":"logic.api.gamelogic.slot.Slot_Action"},"reaction":{"@type":"logic.api.gamelogic.slot.Slot_Reaction","spin_result":{"@type":"logic.api.paytable.slot.spinresult.Slot_Spin_Result","drum":[[6,6,3],[2,2,2],[1,1,1],[1,4,4],[1,5,5]],"final_drum":null,"items":[{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":0}],"icons":[1,1,1,0,0],"jokers":[0,0,0,0,0],"strip_icons":[0,0,1,1,1],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":4,"line_number":2,"win":20,"playing_symbol":1,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null},{"@type":"logic.api.paytable.slot.spinresult.Spin_Result_Item","positions":[{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":4,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":3,"yPos":0},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":2,"yPos":1},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":1,"yPos":2},{"@type":"logic.api.paytable.slot.spinresult.Position2D","xPos":0,"yPos":2}],"icons":[1,1,1,0,0],"jokers":[0,0,0,0,0],"strip_icons":[0,0,1,1,1],"animation_id":null,"layer_id":"UNDERLINES4","fullscreen_animation_id":null,"combo_id":4,"line_number":8,"win":20,"playing_symbol":1,"win_multiplier":1,"bonus_id":"NO_BONUS","feature_state_index":0,"win_data":null,"fullscreenAnimation_id":null}],"sound_flags":[false,false,false,false,false],"teaser_flags":[false,false,false,false,false],"wild_multiplier":null,"triggers":null,"pre_animation":null}}},"parent_index":0},{"@type":"logic.api.gamelogic.Feature_State","feature_id":"GAMBLE","id":0,"init_parameters":{"@type":"logic.api.gamelogic.gamble.Gamble_Init_Parameters","start_win":40,"mults":[2],"tries":10},"current_state":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"curr_win":'.$dwin.',"tries":9,"gamble_reactions":[],"dealer_card":{"@type":"logic.api.gamelogic.gamble.Card","rank":3,"is_joker":false,"suit":"SPADES"},"must_play":false},"prev_current_state":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"curr_win":'.$dwin.',"tries":10,"gamble_reactions":[],"dealer_card":{"@type":"logic.api.gamelogic.gamble.Card","rank":1,"is_joker":false,"suit":"CLUBS"},"must_play":false},"current_win":'.$dwin.',"status":"IN_PROGRESS","last_step":{"@type":"logic.api.gamelogic.Feature_Step","action":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Action","bet":40,"player_choice":'.$_GET['pcard'].'},"reaction":{"@type":"logic.api.gamelogic.gamble.BTD_Gamble_Reaction","is_win":'.$isWin.',"cards":['.$userCards.']}},"parent_index":0}],"betting_param":{"@type":"logic.api.gamelogic.slot.Slot_Betting_Parameters","denom":"0.010","bet_per_line":1,"num_of_lines":5,"extra_bet":0},"status":"IN_PROGRESS","winLimit":"9223372036854775807","game_current_state":{"@type":"logic.api.gamelogic.Game_Current_State","counter":null,"num_of_accumulating_jokers_x_total_bet_amount":null}}},"requestId":"1","method":"STEP_FEATURE"}';
	
	$_SESSION['sparklingfresh_win']=$dwin;
	$_SESSION['sparklingfresh_dc']=$newDc;
	return $rtn;	
	}


function InitGame2(){
	global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =sprintf("%01.2f",get_balance($userId));
	
	$rtn='{"@type":"MethodInvocation","payload":{"@type":"logic.api.gamelogic.Game_History_Item","features":[{"@type":"logic.api.gamelogic.Feature_State","feature_id":"SLOT","id":1,"init_parameters":{"@type":"logic.api.gamelogic.slot.Slot_Init_Parameters"},"current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":[[1,1,1,1,1,1,1,4,4,4,7,7,7,3,3,3,6,6,6,2,2,2,6,6,6,3,3,3,7,7,7,4,4,4,3,3,3,6,6,6,4,4,4,3,3,3,6,6,6,5,5,5,3,3,3,4,4,4,1,1,1,6,6,6,4,4,4],[2,2,2,5,5,5,4,4,4,3,3,3,6,6,6,7,7,7,2,2,2,4,4,4,7,7,7,1,1,1,1,1,7,7,7,5,5,5,2,2,2,6,6,6,5,5,5,2,2,2,7,7,7,5,5,5,2,2,2,5,5,5,7,7,7],[1,1,1,7,7,7,6,6,6,3,3,3,4,4,4,6,6,6,2,2,2,5,5,5,4,4,4,1,1,1,7,7,7,5,5,5,3,3,3,6,6,6,5,5,5,2,2,2,4,4,4,7,7,7,1,1,1,6,6,6,7,7,7],[7,7,7,4,4,4,3,3,3,6,6,6,4,4,4,2,2,2,4,4,4,6,6,6,3,3,3,6,6,6,5,5,5,1,1,1,4,4,4,6,6,6,3,3,3,7,7,7,4,4,4,3,3,3,6,6,6,5,5,5,3,3,3],[1,1,1,5,5,5,6,6,6,2,2,2,7,7,7,3,3,3,7,7,7,4,4,4,2,2,2,6,6,6,5,5,5,2,2,2,7,7,7,5,5,5,2,2,2,7,7,7,2,2,2,5,5,5,1,1,1,7,7,7,5,5,5]],"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":true,"curr_reaction":null},"prev_current_state":{"@type":"logic.api.gamelogic.slot.Slot_Current_State","strips_current":null,"strips_next":null,"strips_changed_bet":null,"ext_mults":null,"is_final":false,"curr_reaction":null},"current_win":0,"status":"FINISHED","last_step":{"@type":"logic.api.gamelogic.Feature_Step","action":{"@type":"logic.api.gamelogic.slot.Slot_Action"},"reaction":{"@type":"logic.api.gamelogic.slot.Slot_Reaction","spin_result":{"@type":"logic.api.paytable.slot.spinresult.Slot_Spin_Result","drum":[[6,6,6],[5,5,5],[5,4,4],[7,7,7],[2,2,2]],"final_drum":null,"items":[],"sound_flags":[false,false,false,false,false],"teaser_flags":[false,false,false,false,false],"wild_multiplier":null,"triggers":null,"pre_animation":null}}},"parent_index":0}],"betting_param":{"@type":"logic.api.gamelogic.slot.Slot_Betting_Parameters","denom":"1.000","bet_per_line":1,"num_of_lines":5,"extra_bet":null},"status":"FINISHED","winLimit":"9223372036854775807","game_current_state":{"@type":"logic.api.gamelogic.Game_Current_State","counter":null,"num_of_accumulating_jokers_x_total_bet_amount":null}},"requestId":"0","method":"GET_LAST_GAME"}';
	
	return $rtn;	
	}


function InitGame3(){
global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =sprintf("%01.2f",get_balance($userId));
	
	$rtn='{"@type":"MethodInvocation","payload":{"@type":"Balance","balance":"'.$user_balance.'","currency":"EUR"},"requestId":"0","method":"GET_BALANCE"}';
	return $rtn;		
	}
	
function InitGame4(){
global $demomode, $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =sprintf("%01.2f",get_balance($userId));
	
	$rtn='{"@type":"MethodInvocation","payload":{"@type":"logic.api.paytable.slot.Dynamic_Help_Info_Slot","items":[{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":1,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":1000,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":20,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":2,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":500,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":60,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":10,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":3,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":500,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":60,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":10,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":4,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":200,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":40,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":5,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":200,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":40,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":6,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":20,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":false}]},{"@type":"logic.api.paytable.slot.paytableinfo.one_Help_Icon_Data","icon_number":7,"wins":[{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":100,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":20,"free_win":0,"is_scatter":false},{"@type":"logic.api.paytable.slot.paytableinfo.win_Item","win":5,"free_win":0,"is_scatter":false}]}]},"requestId":"1","method":"GET_DYNAMIC_HELP_INFO"}';
	return $rtn;		
	}




    
	
	/*------------------------------------------------------------*/
	/*-----------------------  SERVER REQUEST --------------------*/
	/*----------------------------------------------------------- */
	
	
	
	$rtn="";
	

	
	if($_GET['command']=="GET_PAYTABLE_INFO"){ //                                      
                  	
	$rtn=InitGame();
	
	
    }else if($_GET['command']=="GET_LAST_GAME"){ //                                      
                  	
	$rtn=InitGame2();
	
	
        }else if($_GET['command']=="GET_BALANCE"){ //                                      
                  	
	$rtn=InitGame3();
	
	
         }else if($_GET['command']=="GET_DYNAMIC_HELP_INFO"){ //                                      
                  	
	      $rtn=InitGame4();
	
	
             }else if($_GET['command']=="START_GAME"){ //                                      
                  	
	      $rtn=SpinGame();
	
	
             }else if($_GET['command']=="END_FEATURE"){ //                                      
                  	
	      $rtn=CollectGame2();
	
	
             }else if($_GET['command']=="END_GAME"){ //                                      
                  	
	      $rtn=CollectGame();
	
	
             }else if($_GET['command']=="START_FEATURE"){ //                                      
                  	
	      $rtn=GetDouble();
	
	
             }else if($_GET['command']=="STEP_FEATURE"){ //                                      
                  	
	      $rtn=StepDouble();
	
	
             }

	
     



	
	echo ''.$rtn;
	
	
	
	
?>