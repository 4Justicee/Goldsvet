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
$betsArr[count($betsArr)-1]=$betsArr[count($betsArr)-1]*10;
$minBets.=strlen(dechex($betsArr[0]*1)).dechex($betsArr[0]*1);	
$maxBets.=strlen(dechex($betsArr[count($betsArr)-1])).dechex($betsArr[count($betsArr)-1]);	

$betsLength=count($betsArr);
$betsLength=dechex($betsLength);			
		
if(strlen($betsLength)<=1){
$betsLength="0".$betsLength;
}	
		$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE room_id='$room' AND  g_name='luckyzodiac'"));
$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
		
	$rtn="052291753724067485694526784516734576456847546522d26714350746375279456456745671364256347147256522f7358643751726049612734612534567456745712534871623c542706371435249261435671234567567456172435637152435760476273233734172483670526954156012345167845071627342586273143521617853724063756946821452146207143507146352794021973586437017826049524164582174257063761435249263567521a73415248734670652698514538000101010101010427101000".$minBets.$maxBets."a101010101010100a0a01110010101010100000000000000000".$betsLength.$betString."0b10101010";
	////////////////////////////////////////  

$hisWin="10";
$hisState="4"; //b-additional anim bonus / 3-win-take-or-gamble	/5-normal bonus next/ 7 -gamble / 4- normal
//&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['luckyzodiac_freeGames2']."&".$_SESSION['luckyzodiac_freeGames']."&".$_SESSION['luckyzodiac_freeGamesBank']
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
$_SESSION['luckyzodiac_freeGames2']=$hisTmp2[4];
$_SESSION['luckyzodiac_freeGames']=$hisTmp2[5];
$_SESSION['luckyzodiac_freeGamesBank']=$hisTmp2[6];

$_SESSION['luckyzodiac_freeSym']=$hisTmp2[8];
$_SESSION['luckyzodiac_freeMpl']=$hisTmp2[9];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['luckyzodiac_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['luckyzodiac_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="5";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['luckyzodiac_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['luckyzodiac_freeGames2']=$hisTmp2[4];
$_SESSION['luckyzodiac_freeGames']=$hisTmp2[5];
$_SESSION['luckyzodiac_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;
$_SESSION['luckyzodiac_freeSym']=$hisTmp2[8];
$_SESSION['luckyzodiac_freeMpl']=$hisTmp2[9];
$freeRH=dechex($_SESSION['luckyzodiac_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['luckyzodiac_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="b";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['luckyzodiac_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame_end"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['luckyzodiac_freeGames2']=$hisTmp2[4];
$_SESSION['luckyzodiac_freeGames']=$hisTmp2[5];
$_SESSION['luckyzodiac_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['luckyzodiac_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['luckyzodiac_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="c";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['luckyzodiac_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

}/////demo			
		
	$rtn="0522973462038b2acd49c5607ab023468a0bc2a6a12069229a16b3894c7d1425307c859b1345789bc15937b37b2291056289abd2105c762849a140568ac159b234067a23612634579a0bc8d1293745c618ab1234056789abc203456789abc08236236b517048a92cd145683709abc1234056789abc012345d6789abc521a234c516d78ab951234b67089ac21ba0238456179bcd12348679acb5d21b4123567089dab1c23c56d789a4b21a312456789abcd152367849cab021a31427b56089cad3192468a57cb0".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."0a".$f2.$f1."101".$_SESSION['luckyzodiac_Mpl']."1010100a0a011100".$hisReel."0000000000000000".$betsLength.$betString."0b10101010101010101010101".dechex($_SESSION['luckyzodiac_freeSym']);
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
	
	
	$_SESSION['dcard_luckyzodiac']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."";
	
	
	$rtn="100010".$rtnBalance."10".$rtnReels."000a10101010101010101010100b1010101010101010101010".$_SESSION['dcard_luckyzodiac']."f15fffff15fffff15fffff15fffff";
	 set_stat_game($userId, $user_balance, 0,0,"state_luckyzodiac");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_luckyzodiac'])){
$_SESSION['dcard_luckyzodiac']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.02, 0.03, 0.04, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.40, 0.50);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	 cange_balance($userId, $allbet*-1);
	 change_bank($user_id,'luckyzodiac',$allbet,"spin");
	
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

 $psym[0]=array(0,0,0,30,250,1000);
$psym[1]=array(0,0,0,10,50,200);
$psym[2]=array(0,0,0,10,50,200);
$psym[3]=array(0,0,0,10,50,200);
$psym[4]=array(0,0,0,10,50,200);
$psym[5]=array(0,0,0,10,50,200);
$psym[6]=array(0,0,0,10,50,200);
$psym[7]=array(0,0,0,10,50,200);
$psym[8]=array(0,0,0,10,50,200);
$psym[9]=array(0,0,0,10,50,200);
$psym[10]=array(0,0,0,10,50,200);
$psym[11]=array(0,0,0,10,50,200);
$psym[12]=array(0,0,0,10,50,200);
$psym[13]=array(0,0,0,2,20,200);
$psym[14]=array(0,0,0,0,0,75);
$psym[15]=array(0,0,0,0,0,75);
$psym[16]=array(0,0,0,0,0,75);
$psym[17]=array(0,0,0,0,0,75);
	
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(7, 3, 4, 6, 2, 0, 3, 8, 11, 2, 10, 12, 13, 4, 9, 12, 5, 6, 0, 7, 10, 11, 0, 2, 3, 4, 6, 8, 10, 0, 11, 12, 2, 10, 6, 10, 1, 2, 0, 6, 9);
$r[1]=array(10, 1, 6, 11, 3, 8, 9, 4, 12, 7, 13, 1, 4, 2, 5, 3, 0, 7, 12, 8, 5, 9, 11, 1, 3, 4, 5, 7, 8, 9, 11, 12, 1, 5, 9, 3, 7, 11, 3, 7, 11);
$r[2]=array(1, 0, 5, 6, 2, 8, 9, 10, 11, 13, 2, 1, 0, 5, 12, 7, 6, 2, 8, 4, 9, 10, 1, 4, 0, 5, 6, 8, 10, 12, 1, 5, 9, 11, 2, 3, 4, 0, 6, 7, 10);
$r[3]=array(1, 2, 6, 3, 4, 5, 7, 9, 10, 0, 11, 12, 8, 13, 1, 2, 9, 3, 7, 4, 5, 12, 6, 1, 8, 10, 11, 1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 8);
$r[4]=array(2, 3, 6, 11, 5, 1, 7, 0, 4, 8, 10, 9, 2, 12, 13, 1, 4, 5, 6, 8, 3, 7, 0, 9, 10, 11, 12, 1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 13, 6, 7, 8, 9, 10, 11, 12);	


$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=13;
	
	
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

 if ($s1 == $wild && $s2 !=101 && $s2!=121)
				{
					$s1 = $s2;
					$gg = 2;
				}
				if ($s2 == $wild && $s1 !=101 && $s1!=112)
				{
					$s2 = $s1;
					$gg = 2;
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=101)
	            {
	                $s1 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=101)
	            {
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=101)
	            {
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=101)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=101)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=101)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=101)
	            {
	                $s1 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=101)
	            {
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=101)
	            {
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=101)
	            {
	                $s4 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=101)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=101)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=101)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=101)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=101)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=101)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               $gg = 2;
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=101)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					$gg = 2;
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=101)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					$gg = 2;
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=101)
				{
					$s5 = $s2;
					$gg = 2;
				}
				
				



/////////////////////////////////////

				

if(($s1==$s2 ) && ($s2==$s3) && $s1 !=13 ){



$wins[$ln]=$psym[$s3][3]*$gg;	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 ) && $s1 !=13 ){



$wins[$ln]=$psym[$s4][4]*$gg;	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 ) && $s1 !=13){



$wins[$ln]=$psym[$s5][5]*$gg;	
	
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
	
if($map[$i]==13){
$scatter_win++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[13][$scatter_win]*$gBet*$lines);
$winall_r+=($psym[13][$scatter_win]*$lines);
$whex=dechex($psym[13][$scatter_win]);	
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
	$hisState="spin";	
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'luckyzodiac',$winall*-1,"spin");	
	
	

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
	
	$_SESSION['luckyzodiac_freeGamesWin']=$winall;
	
	
	$str_winall=str_replace(".","",($winall*$conf['fmp'])."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_luckyzodiac']=$map;	
	$respinMap="101010";	
	
	$gameState="03";
    $freeInfo="10101010101010101010100b";
	if($isBonus && $scatter_win>=3){
	$hisState="freegame_start";
	$_SESSION['luckyzodiac_freeGames']=10;
	$_SESSION['luckyzodiac_freeGames2']=10;
	$_SESSION['luckyzodiac_freeSym']=rand(0,8);
	
	$_SESSION['luckyzodiac_freeGamesBank']=$gset['sum'];
	$_SESSION['luckyzodiac_freeMpl']=rand(1,3);
	$respinMap="1".dechex($_SESSION['luckyzodiac_freeSym'])."1010";
$gameState="10";	
	 $freeInfo="1a1a101".$_SESSION['luckyzodiac_freeMpl']."101010101010100b";	
	}
	
	
	
	
    
	
	
	
	
	
	
	
	
	/*-------------------------------*/
	
	$rtn="1".$gameState."0"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_luckyzodiac']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['luckyzodiac_freeGames2']."&".$_SESSION['luckyzodiac_freeGames']."&".$_SESSION['luckyzodiac_freeGamesBank']."&".$rtnBalance."&".$_SESSION['luckyzodiac_freeSym']."&".$_SESSION['luckyzodiac_freeMpl'];
	$_SESSION['luckyzodiac_freeStart']="1050"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr."0000000000000000";
	$_SESSION['luckyzodiac_adv']="#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['luckyzodiac_freeGames2']."&".$_SESSION['luckyzodiac_freeGames']."&".$_SESSION['luckyzodiac_freeGamesBank']."&".$rtnBalance."&".$_SESSION['luckyzodiac_freeSym']."&".$_SESSION['luckyzodiac_freeMpl'];
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr."";
	$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$winall;
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	$hisState="collect";
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr.$_SESSION['dcard_luckyzodiac'].$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['luckyzodiac_freeGames2']."&".$_SESSION['luckyzodiac_freeGames']."&".$_SESSION['luckyzodiac_freeGamesBank']."&".$rtnBalance."&".$_SESSION['luckyzodiac_freeSym']."&".$_SESSION['luckyzodiac_freeMpl'];
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_luckyzodiac");
	ge_serv_show_str($rtn);			
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_luckyzodiac'])){
$_SESSION['dcard_luckyzodiac']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
}
	///////////////////////////////////////////
	$betsArr=explode(",",$conf['bets']);//(0.02, 0.03, 0.04, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.40, 0.50);
	
	$gBet=$betsArr[$bet];
	$allbet=$gBet*$lines;
	
	$_REQUEST['action']="spin";
	$action="spin";
	 $_POST['betline']=$gBet;
     $_POST['lines']=$lines;
	
	///////////////////////////////
	
	// cange_balance($userId, $allbet*-1);
	// change_bank($user_id,'luckyzodiac',$allbet,"spin");
	
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

 $psym[0]=array(0,0,0,30,250,1000);
$psym[1]=array(0,0,0,10,50,200);
$psym[2]=array(0,0,0,10,50,200);
$psym[3]=array(0,0,0,10,50,200);
$psym[4]=array(0,0,0,10,50,200);
$psym[5]=array(0,0,0,10,50,200);
$psym[6]=array(0,0,0,10,50,200);
$psym[7]=array(0,0,0,10,50,200);
$psym[8]=array(0,0,0,10,50,200);
$psym[9]=array(0,0,0,10,50,200);
$psym[10]=array(0,0,0,10,50,200);
$psym[11]=array(0,0,0,10,50,200);
$psym[12]=array(0,0,0,10,50,200);
$psym[13]=array(0,0,0,2,20,200);
$psym[14]=array(0,0,0,0,0,75);
$psym[15]=array(0,0,0,0,0,75);
$psym[16]=array(0,0,0,0,0,75);
$psym[17]=array(0,0,0,0,0,75);
	
	//////////////////////////////////////////////////loop
	
	
	
	
	
	
	///////////////////////Create Symbols Map///////////////////////////////
	
		
$r=array();
$rp=array();

//reels	    1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,
$r[0]=array(2, 3, 4, 12, 5, 1, 6, 13, 7, 8, 10, 11, 9, 5, 1, 2, 3, 4, 11, 6, 7, 0, 8, 9, 10, 12);
$r[1]=array(10, 0, 2, 3, 8, 4, 5, 6, 1, 7, 9, 11, 12, 13, 1, 2, 3, 4, 8, 6, 7, 9, 10, 12, 11, 5, 13);
$r[2]=array(4, 1, 2, 3, 5, 6, 7, 0, 8, 9, 13, 10, 11, 1, 12, 2, 3, 12, 5, 6, 13, 7, 8, 9, 10, 4, 11);
$r[3]=array(3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 5, 2, 3, 6, 7, 8, 4, 9, 12, 10, 11, 0);
$r[4]=array(3, 1, 4, 2, 7, 11, 5, 6, 0, 8, 9, 12, 10, 13, 3, 1, 9, 2, 4, 6, 8, 10, 5, 7, 12, 11);	


$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=13;
	
	
	$isWin=false;
	$isBonus=false;
	/////////////////////////////////////game_setting
		
		$gset=spin("spin",$gBet,$lines);
		if($gset['type']=="bon"){
	   
		}
		if($gset['type']=="win"){
		$isWin=true;
		} 
		$casbank = $_SESSION['luckyzodiac_freeGamesBank']; 
		
		$winRand=rand(1,2);
	
	if($winRand==1){
	
$isWin=true;	
		
	}
	
	$_SESSION['luckyzodiac_freeGames']--;
	
	
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

 if ($s1 == $wild && $s2 !=101 && $s2!=12)
				{
					$s1 = $s2;
					$gg = 2;
				}
				if ($s2 == $wild && $s1 !=101 && $s1!=12)
				{
					$s2 = $s1;
					$gg = 2;
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=101)
	            {
	                $s1 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=101)
	            {
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=101)
	            {
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=101)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=101)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=101)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=101)
	            {
	                $s1 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=101)
	            {
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=101)
	            {
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=101)
	            {
	                $s4 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=101)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=101)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=101)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=101)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=101)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=101)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               $gg = 2;
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=101)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					$gg = 2;
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=101)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					$gg = 2;
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=101)
				{
					$s5 = $s2;
					$gg = 2;
				}
				
				



/////////////////////////////////////

				

if(($s1==$s2 ) && ($s2==$s3)  ){



$wins[$ln]=$psym[$s3][3]*$gg;	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 ) ){



$wins[$ln]=$psym[$s4][4]*$gg;	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 ) ){



$wins[$ln]=$psym[$s5][5]*$gg;	
	
}


			
	           
	        }
			
			
$winall=0;			
$winall_r=0;			
$winstr="";			
for($i=0; $i<10; $i++){

if($wins[$i]>0 ){
$winall+=($wins[$i]*$gBet*$_SESSION['luckyzodiac_freeMpl']);
$winall_r+=$wins[$i]*$_SESSION['luckyzodiac_freeMpl'];
$whex=dechex($wins[$i]);	
$winstr.=strlen($whex).$whex;
}else{
$winstr.="10";	
}	
	
}	



$scatter_win=0;
$scatter_win2=0;

for($i=0; $i<=14;$i++){
	
if($map[$i]==13){
$scatter_win++;	
}	
if($map[$i]==$_SESSION['luckyzodiac_freeSym']){
$scatter_win2++;	
}
	
}		
if($scatter_win>=3){	
$winall+=($psym[13][$scatter_win]*$gBet*$lines)*$_SESSION['luckyzodiac_freeMpl'];
$winall_r+=$psym[13][$scatter_win]*$_SESSION['luckyzodiac_freeMpl'];
$whex=dechex($psym[13][$scatter_win]*$_SESSION['luckyzodiac_freeMpl']);	
$winstr.=strlen($whex).$whex;	
}else{
$winstr.="10";	
}	
$expWin=0;

$winall+=($psym[$_SESSION['luckyzodiac_freeSym']][$scatter_win2]*$gBet*$lines)*1;

	
	$expWin=($psym[$_SESSION['luckyzodiac_freeSym']][$scatter_win2]*$gBet*$lines)*1;
	$isBonus=false;
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
	
	if($loopCnt>800){
	$isCalc=false;	
		
	}
	
	}
	$hisState="freegame";
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'luckyzodiac',$winall*-1,"spin");	
$_SESSION['luckyzodiac_freeGamesBank']-=	$winall;
	
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
	
	$_SESSION['luckyzodiac_freeGamesWin']+=$winall;
	//$winall_r=$_SESSION['luckyzodiac_freeGamesWin'];
	$hisWin=$_SESSION['luckyzodiac_freeGamesWin'];
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_luckyzodiac']=$map;	
	
	
	$gameState="06";
    
	if($_SESSION['luckyzodiac_freeGames']<=0){
		$hisState="freegame_end";
$gameState="0c";	
		
	}
	
	$expWin=$expWin*$conf['fmp'];
	
	$expWinHex=dechex($expWin);	
$expWinHex2=strlen($expWinHex).$expWinHex;		
	
	$respinMap="1".dechex($_SESSION['luckyzodiac_freeSym'])."1".$scatter_win2.$expWinHex2;
	$ww="10";
	
	if($winall>0){
	
$ww="19";	
		
	}
	
	$freeRH=dechex($_SESSION['luckyzodiac_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	 $freeInfo="1a".$freeR.$ww."1".$_SESSION['luckyzodiac_freeMpl']."1010".$rtnReels."0b";	
	/*-------------------------------*/
	$winall2=$_SESSION['luckyzodiac_freeGamesWin']*$conf['fmp'];
	$str_winall=str_replace(".","",$winall2."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	
	$rtn="1".$gameState."0"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_luckyzodiac']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['luckyzodiac_freeGames2']."&".$_SESSION['luckyzodiac_freeGames']."&".$_SESSION['luckyzodiac_freeGamesBank']."&".$rtnBalance."&".$_SESSION['luckyzodiac_freeSym']."&".$_SESSION['luckyzodiac_freeMpl'];
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr."";
	//$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$_SESSION['luckyzodiac_freeGamesWin'];
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr.$_SESSION['dcard_luckyzodiac'].$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['luckyzodiac_freeGames2']."&".$_SESSION['luckyzodiac_freeGames']."&".$_SESSION['luckyzodiac_freeGamesBank']."&".$rtnBalance."&".$_SESSION['luckyzodiac_freeSym']."&".$_SESSION['luckyzodiac_freeMpl'];
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_luckyzodiac");
	ge_serv_show_str( $rtn);		
			
		
	}	
	function FinishSpin(){
	global $room,$conf, $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_luckyzodiac'];
	$userId=$user_id;
 $_SESSION['dcard_luckyzodiac']=$dc;
		
		
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
		
	$casbank=get_bank($user_id,'luckyzodiac',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'luckyzodiac',$winall,"double");	
		
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
	
	
	
	$doubleCards=$_SESSION['dcard_luckyzodiac'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000a10101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'luckyzodiac',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1070"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	$_SESSION['dcard_luckyzodiac']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_luckyzodiac"); 
	
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
	
	$doubleCards=$_SESSION['dcard_luckyzodiac'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1080"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_luckyzodiac");
	ge_serv_show_str( $rtn);	
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
	    if($st2[0]=="2517"){

      $_SESSION['luckyzodiac_freeSym']=$st2[1];
		$rtn=$_SESSION['luckyzodiac_freeStart']."1".dechex($st2[1])."1010".$_SESSION['luckyzodiac_adv'];

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
