   <?php

error_reporting(0);

include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';


$str=$_GET['ddd'];

$action="spin";



	function GetReels(){
		
	
		
		
	 $rtn="052255755666551141445430333225552244642254228551101666733344242206655511336664464021122755506667444041113335552262333446660442422a56556663311044440433372255660116664442211222857551146644443335066220336660155522114405215766655144303366655524216066733442265566655514621755566674401555226633446217554466631446033722555662185714664435550664462233550001010101010104271010001a33e8641010101010101064640a1100101010101000000000000000000a1112131415161718191a651010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010#00101010";
  return $rtn;   
		
		
	}

	
	/*------------------------------------------------------------*/
	/*-----------------------  INIT ----------------------------*/
	/*----------------------------------------------------------- */
	
	function InitGame(){
	global $login,$userId,$user_id;	
	
	
	
	$userId=$user_id;
    $user_balance =  get_balance($userId) ;
	
	
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
	
	
	$_SESSION['dcard_bellsonfirehot']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."";
	
	
	$rtn="1000$loginId".$rtnBalance."10".$rtnReels."00641010101010101010101010651010101010101010101010".$_SESSION['dcard_bellsonfirehot']."f15fffff15fffff15fffff15fffff";
	 set_stat_game($userId, $user_balance, 0,0,"state_bellsonfirehot");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin($bet,$lines){
		
	global $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  get_balance($userId) ;
	
	
if(!isset($_SESSION['dcard_bellsonfirehot'])){
$_SESSION['dcard_bellsonfirehot']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=array(0.01,0.02,0.03,0.04,0.05,0.06,0.07,0.08,0.09,0.10);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'bellsonfirehot',$allbet,"spin");
	
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
	    $psym[0]=array(0,0,0,100,1000,5000);
$psym[1]=array(0,0,0,40,200,400);
$psym[2]=array(0,0,0,40,200,400);
$psym[3]=array(0,0,0,20,50,200);
$psym[4]=array(0,0,0,10,40,150);
$psym[5]=array(0,0,0,10,40,150);
$psym[6]=array(0,0,5,10,25,100);
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
$lin[10]=array(2,4,7,10,14);
$lin[11]=array(0,4,6,10,12);
$lin[12]=array(2,4,8,10,14);
$lin[13]=array(1,3,7,9,13);
$lin[14]=array(1,5,7,11,13);
$lin[15]=array(1,4,6,10,13);
$lin[16]=array(1,4,8,10,13);
$lin[17]=array(0,5,6,11,12);
$lin[18]=array(2,3,8,9,14);
$lin[19]=array(1,3,8,9,13);
$lin[20]=array(0,3,7,11,14);
$lin[21]=array(2,5,7,9,12);
$lin[22]=array(0,3,7,10,13);
$lin[23]=array(2,5,7,10,13);
$lin[24]=array(1,4,6,9,12);
$lin[25]=array(1,4,8,11,14);
$lin[26]=array(1,4,7,9,12);
$lin[27]=array(1,4,7,11,14);
$lin[28]=array(2,5,8,10,12);
$lin[29]=array(0,3,6,10,14);
$lin[30]=array(2,4,6,9,12);
$lin[31]=array(0,4,8,11,14);
$lin[32]=array(1,3,7,10,13);
$lin[33]=array(1,5,7,10,13);
$lin[34]=array(1,4,7,9,13);
$lin[35]=array(1,4,7,11,13);
$lin[36]=array(1,3,8,11,14);
$lin[37]=array(1,5,6,9,12);
$lin[38]=array(0,3,6,11,12);
$lin[39]=array(2,5,8,9,14);
$lin[40]=array(2,3,6,9,12);
$lin[41]=array(0,5,8,11,14);
$lin[42]=array(0,4,7,10,13);
$lin[43]=array(2,4,7,10,13);
$lin[44]=array(1,4,7,10,12);
$lin[45]=array(1,4,7,10,14);
$lin[46]=array(1,5,8,11,14);
$lin[47]=array(1,3,6,9,12);
$lin[48]=array(1,4,7,9,14);
$lin[49]=array(1,4,7,11,12);
$lin[50]=array(0,3,6,11,13);
$lin[51]=array(2,5,8,9,13);
$lin[52]=array(0,3,6,10,13);
$lin[53]=array(0,3,6,11,14);
$lin[54]=array(2,5,8,10,13);
$lin[55]=array(2,5,8,9,12);
$lin[56]=array(2,5,6,9,12);
$lin[57]=array(1,4,6,10,12);
$lin[58]=array(0,3,8,11,14);
$lin[59]=array(1,4,8,10,14);
$lin[60]=array(0,4,8,11,13);
$lin[61]=array(0,4,8,11,12);
$lin[62]=array(2,4,6,9,13);
$lin[63]=array(2,4,6,9,14);
$lin[64]=array(1,3,6,10,13);
$lin[65]=array(1,5,8,10,13);
$lin[66]=array(1,3,8,10,13);
$lin[67]=array(1,5,6,10,13);
$lin[68]=array(1,4,6,9,13);
$lin[69]=array(1,4,8,11,13);
$lin[70]=array(1,4,6,11,13);
$lin[71]=array(1,4,8,9,13);
$lin[72]=array(0,3,7,10,12);
$lin[73]=array(0,3,8,11,12);
$lin[74]=array(0,3,7,11,12);
$lin[75]=array(0,3,8,10,12);
$lin[76]=array(2,5,6,9,14);
$lin[77]=array(2,5,7,10,14);
$lin[78]=array(2,5,7,9,14);
$lin[79]=array(2,5,6,10,14);
$lin[80]=array(1,3,7,9,12);
$lin[81]=array(1,3,7,9,14);
$lin[82]=array(1,3,7,11,12);
$lin[83]=array(1,3,7,11,14);
$lin[84]=array(1,5,7,11,14);
$lin[85]=array(1,5,7,11,12);
$lin[86]=array(1,5,7,9,14);
$lin[87]=array(1,5,7,9,12);
$lin[88]=array(0,3,7,9,13);
$lin[89]=array(2,5,7,9,13);
$lin[90]=array(0,5,7,9,13);
$lin[91]=array(2,3,7,9,13);
$lin[92]=array(2,5,7,11,13);
$lin[93]=array(0,3,7,11,13);
$lin[94]=array(0,5,7,11,13);
$lin[95]=array(2,3,7,11,13);
$lin[96]=array(1,5,6,10,12);
$lin[97]=array(2,4,6,10,12);
$lin[98]=array(1,3,8,10,14);
$lin[99]=array(0,4,8,10,14);
	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(5, 7, 5, 5, 6, 6, 6, 5, 5, 1, 1, 4, 1, 4, 4, 5, 4, 3, 0, 3, 3, 3, 2, 2, 5, 5, 5, 2, 2, 4, 4, 6, 4, 2, 2, 5, 4);
$r[1]=array(5, 5, 1, 1, 0, 1, 6, 6, 6, 7, 3, 3, 3, 4, 4, 2, 4, 2, 2, 0, 6, 6, 5, 5, 5, 1, 1, 3, 3, 6, 6, 6, 4, 4, 6, 4, 0, 2, 1, 1);
$r[2]=array(5, 5, 5, 0, 6, 6, 6, 7, 4, 4, 4, 0, 4, 1, 1, 1, 3, 3, 3, 5, 5, 5, 2, 2, 6, 2, 3, 3, 3, 4, 4, 6, 6, 6, 0, 4, 4, 2, 4);
$r[3]=array(5, 6, 5, 5, 6, 6, 6, 3, 3, 1, 1, 0, 4, 4, 4, 4, 0, 4, 3, 3, 3, 7, 2, 2, 5, 5, 6, 6, 0, 1, 1, 6, 6, 6, 4, 4, 4, 2, 2, 1, 1, 2);
$r[4]=array(5, 7, 5, 5, 1, 1, 4, 6, 6, 4, 4, 4, 4, 3, 3, 3, 5, 0, 6, 6, 2, 2, 0, 3, 3, 6, 6, 6, 0, 1, 5, 5, 5, 2, 2, 1, 1, 4, 4, 0);	



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
				
				



/////////////////////////////////////

if(($s1==$s2 ) && $s1 !=7 ){



$wins[$ln]=$psym[$s2][2];	
	
}				

if(($s1==$s2 ) && ($s2==$s3) && $s1 !=7 ){



$wins[$ln]=$psym[$s3][3];	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 ) && $s1 !=7 ){



$wins[$ln]=$psym[$s4][4];	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 ) && $s1 !=7){



$wins[$ln]=$psym[$s5][5];	
	
}


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<100; $i++){

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
 change_bank($user_id,'bellsonfirehot',$winall*-1,"spin");	
	
	
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
	
	$_SESSION['bellsonfirehot_freeGamesWin']=$winall;
	
	
	$str_winall=str_replace(".","",($winall*100)."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_bellsonfirehot']=$map;	
	
	
	$gameState="03";
    $freeInfo="101010101010101010101065";
	if($isBonus && $scatter_win>=3){
	
	$_SESSION['bellsonfirehot_freeGames']=15;
	
	$_SESSION['bellsonfirehot_freeGamesBank']=$gset['sum'];
	
$gameState="05";	
	 $freeInfo="1f1f10131010101010101065";	
	}
	
	$respinMap="";
	
	for($i=0; $i<=14;$i++){
	
    
	$respinMap.="10";	
	
	
	}
	
	
	
	
	/*-------------------------------*/
	
	$rtn="1".$gameState."0".$loginId.$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_bellsonfirehot']."".$respinMap."#".count($r[3]);
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101065".$winstr."";
	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  get_balance($userId) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101065".$winstr.$_SESSION['dcard_bellsonfirehot'].$respinMap;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_bellsonfirehot");
	return $rtn;		
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
global $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  get_balance($userId) ;
	
	
if(!isset($_SESSION['dcard_bellsonfirehot'])){
$_SESSION['dcard_bellsonfirehot']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=array(0.01,0.02,0.03,0.04,0.05,0.10,0.15,0.20,0.25,0.30,0.35,0.40,0.45,0.50);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	// cange_balance($userId, $allbet*-1);
	// change_bank($user_id,'bellsonfirehot',$allbet,"spin");
	
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
	  
		$psym[0]=array(0,0,0,100,1000,5000);
$psym[1]=array(0,0,0,40,200,400);
$psym[2]=array(0,0,0,40,200,400);
$psym[3]=array(0,0,0,20,50,200);
$psym[4]=array(0,0,0,10,40,150);
$psym[5]=array(0,0,0,10,40,150);
$psym[6]=array(0,0,5,10,25,100);
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
$lin[10]=array(2,4,7,10,14);
$lin[11]=array(0,4,6,10,12);
$lin[12]=array(2,4,8,10,14);
$lin[13]=array(1,3,7,9,13);
$lin[14]=array(1,5,7,11,13);
$lin[15]=array(1,4,6,10,13);
$lin[16]=array(1,4,8,10,13);
$lin[17]=array(0,5,6,11,12);
$lin[18]=array(2,3,8,9,14);
$lin[19]=array(1,3,8,9,13);
$lin[20]=array(0,3,7,11,14);
$lin[21]=array(2,5,7,9,12);
$lin[22]=array(0,3,7,10,13);
$lin[23]=array(2,5,7,10,13);
$lin[24]=array(1,4,6,9,12);
$lin[25]=array(1,4,8,11,14);
$lin[26]=array(1,4,7,9,12);
$lin[27]=array(1,4,7,11,14);
$lin[28]=array(2,5,8,10,12);
$lin[29]=array(0,3,6,10,14);
$lin[30]=array(2,4,6,9,12);
$lin[31]=array(0,4,8,11,14);
$lin[32]=array(1,3,7,10,13);
$lin[33]=array(1,5,7,10,13);
$lin[34]=array(1,4,7,9,13);
$lin[35]=array(1,4,7,11,13);
$lin[36]=array(1,3,8,11,14);
$lin[37]=array(1,5,6,9,12);
$lin[38]=array(0,3,6,11,12);
$lin[39]=array(2,5,8,9,14);
$lin[40]=array(2,3,6,9,12);
$lin[41]=array(0,5,8,11,14);
$lin[42]=array(0,4,7,10,13);
$lin[43]=array(2,4,7,10,13);
$lin[44]=array(1,4,7,10,12);
$lin[45]=array(1,4,7,10,14);
$lin[46]=array(1,5,8,11,14);
$lin[47]=array(1,3,6,9,12);
$lin[48]=array(1,4,7,9,14);
$lin[49]=array(1,4,7,11,12);
$lin[50]=array(0,3,6,11,13);
$lin[51]=array(2,5,8,9,13);
$lin[52]=array(0,3,6,10,13);
$lin[53]=array(0,3,6,11,14);
$lin[54]=array(2,5,8,10,13);
$lin[55]=array(2,5,8,9,12);
$lin[56]=array(2,5,6,9,12);
$lin[57]=array(1,4,6,10,12);
$lin[58]=array(0,3,8,11,14);
$lin[59]=array(1,4,8,10,14);
$lin[60]=array(0,4,8,11,13);
$lin[61]=array(0,4,8,11,12);
$lin[62]=array(2,4,6,9,13);
$lin[63]=array(2,4,6,9,14);
$lin[64]=array(1,3,6,10,13);
$lin[65]=array(1,5,8,10,13);
$lin[66]=array(1,3,8,10,13);
$lin[67]=array(1,5,6,10,13);
$lin[68]=array(1,4,6,9,13);
$lin[69]=array(1,4,8,11,13);
$lin[70]=array(1,4,6,11,13);
$lin[71]=array(1,4,8,9,13);
$lin[72]=array(0,3,7,10,12);
$lin[73]=array(0,3,8,11,12);
$lin[74]=array(0,3,7,11,12);
$lin[75]=array(0,3,8,10,12);
$lin[76]=array(2,5,6,9,14);
$lin[77]=array(2,5,7,10,14);
$lin[78]=array(2,5,7,9,14);
$lin[79]=array(2,5,6,10,14);
$lin[80]=array(1,3,7,9,12);
$lin[81]=array(1,3,7,9,14);
$lin[82]=array(1,3,7,11,12);
$lin[83]=array(1,3,7,11,14);
$lin[84]=array(1,5,7,11,14);
$lin[85]=array(1,5,7,11,12);
$lin[86]=array(1,5,7,9,14);
$lin[87]=array(1,5,7,9,12);
$lin[88]=array(0,3,7,9,13);
$lin[89]=array(2,5,7,9,13);
$lin[90]=array(0,5,7,9,13);
$lin[91]=array(2,3,7,9,13);
$lin[92]=array(2,5,7,11,13);
$lin[93]=array(0,3,7,11,13);
$lin[94]=array(0,5,7,11,13);
$lin[95]=array(2,3,7,11,13);
$lin[96]=array(1,5,6,10,12);
$lin[97]=array(2,4,6,10,12);
$lin[98]=array(1,3,8,10,14);
$lin[99]=array(0,4,8,10,14);
	
	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(7, 6, 6, 6, 5, 5, 1, 4, 4, 3, 0, 3, 3, 6, 6, 6, 5, 5, 5, 2, 4);
$r[1]=array(0, 6, 6, 7, 3, 3, 4, 4, 2, 2, 6, 5, 5, 6, 6, 6, 5, 5, 5, 1, 4, 6);
$r[2]=array(5, 5, 5, 6, 6, 6, 7, 4, 4, 0, 1, 5, 5, 5, 2, 2, 6, 6, 3, 3, 4, 4, 6);
$r[3]=array(5, 5, 4, 4, 6, 6, 6, 3, 1, 4, 4, 6, 0, 3, 3, 7, 2, 2, 5, 5, 5, 6, 6);
$r[4]=array(5, 7, 1, 4, 6, 6, 4, 4, 3, 5, 5, 5, 0, 6, 6, 4, 4, 6, 2, 2, 3, 3, 5, 5);	


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
		$casbank = $_SESSION['bellsonfirehot_freeGamesBank']; 
		
		$winRand=rand(1,2);
	
	if($winRand==1){
	
$isWin=true;	
		
	}
	
	$_SESSION['bellsonfirehot_freeGames']--;
	
	
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
for($i=0; $i<100; $i++){

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
	
	if($isBonus && $scatter_win<=0){
	$isCalc=true;		
	}
	
	if(!$isBonus && $scatter_win>0){
	$isCalc=true;		
	}
	
	if($loopCnt>800){
	$isCalc=false;	
		
	}
	
	}
	
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'bellsonfirehot',$winall*-1,"spin");	
$_SESSION['bellsonfirehot_freeGamesBank']-=	$winall;
	
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
	
	$_SESSION['bellsonfirehot_freeGamesWin']+=$winall;
	//$winall_r=$_SESSION['bellsonfirehot_freeGamesWin'];
	
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_bellsonfirehot']=$map;	
	
	
	$gameState="06";
    
	if($_SESSION['bellsonfirehot_freeGames']<=0){
	
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
	
	$freeRH=dechex($_SESSION['bellsonfirehot_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	 $freeInfo="1f".$freeR.$ww."131010".$rtnReels."65";	
	/*-------------------------------*/
	$winall2=$_SESSION['bellsonfirehot_freeGamesWin']*100;
	$str_winall=str_replace(".","",$winall2."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	
	$rtn="1".$gameState."0".$loginId.$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_bellsonfirehot']."".$respinMap."#".count($r[3]);
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."101010101010101010101065".$winstr."";
	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  get_balance($userId) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."101010101010101010101065".$winstr.$_SESSION['dcard_bellsonfirehot'].$respinMap;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_bellsonfirehot");
	return $rtn;		
			
		
	}	
	function FinishSpin(){
	global $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_bellsonfirehot'];
	$userId=$user_id;
 $_SESSION['dcard_bellsonfirehot']=$dc;
		
		
	$user_balance =  get_balance($userId) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['finish_answer']="1040".$loginId.$rtnBalance.$_SESSION['finish_answer'];	
		
	return $_SESSION['finish_answer'];	
		
	}
	
	/*------------------------------------------------------------*/
	/*-----------------------  DOUBLE ----------------------------*/
	/*----------------------------------------------------------- */
	function GetDouble($daction){
	global $login,$userId,$user_id;	
	
	
	$userId=$user_id;
  

	
	$doubleWin=rand(1,2);	
		
	$casbank=get_bank($user_id,'bellsonfirehot',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'bellsonfirehot',$winall,"double");	
		
	}
	
	$ucard="";
	
	
	
	

$reds=array(00,01,04,05,08,09,12,13,16,17,20,21,24,25,28,29,32,33,36,37,40,41,44,45,48,49,52);
$blacks=array(02,03,06,07,10,11,14,15,18,19,22,23,26,27,30,31,34,35,38,39,42,43,46,47,50,51);	

$suit3=array(00,04,08,12,16,20,24,28,32,36,40,44,48,52);	
$suit4=array(01,05,09,13,17,21,25,29,33,37,41,45,49,53);	

$suit5=array(02,06,10,14,18,22,26,30,34,38,42,46,50);
$suit6=array(03,07,11,15,19,23,27,31,35,39,43,47,51);
	
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
	
	
	
	$doubleCards=$_SESSION['dcard_bellsonfirehot'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000a10101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'bellsonfirehot',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1070".$loginId.$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	$_SESSION['dcard_bellsonfirehot']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_bellsonfirehot"); 
	
	return $rtn;	
	}
	/////////////////////////////////////////////////////////////////////
	
	/*------------------------------------------------------------*/
	/*-----------------------  DOUBLE HALF------------------------*/
	/*----------------------------------------------------------- */
	function GetDoubleHalf(){
	global $login,$userId,$user_id;	
	
	
	$userId=$user_id;
  

	
	$winall=$_SESSION['double_win'];
	
	
	

$winall=$winall/2;


     $winall=sprintf( "%01.2f", $winall );

     $winall_h1=str_replace(".","",$winall."");
	$winall_h=dechex($winall_h1);
	
	$ucard=dechex($ucard);
	if(strlen($ucard)<=1){
	$ucard="0".$ucard;	
	}
	
	$doubleCards=$_SESSION['dcard_bellsonfirehot'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1080".$hexLogin.$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_bellsonfirehot");
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