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
$minBets.=strlen(dechex($betsArr[0]*10)).dechex($betsArr[0]*10);	
$maxBets.=strlen(dechex($betsArr[count($betsArr)-1])).dechex($betsArr[count($betsArr)-1]);	

$betsLength=count($betsArr);
$betsLength=dechex($betsLength);			
		
if(strlen($betsLength)<=1){
$betsLength="0".$betsLength;
}	
		$res1=mysql_fetch_assoc(mysql_query("SELECT g_id FROM game_settings WHERE room_id='$room' AND  g_name='lovelylady'"));
$res2=mysql_fetch_assoc(mysql_query("SELECT str FROM game_log WHERE game_id='".$res1['g_id']."' AND user_id='$user_id' ORDER BY id DESC LIMIT 1"));
		
	$rtn="052291753724067485694526784516734576456847546522d26714350746375279456456745671364256347147256522f7358643751726049612734612534567456745712534871623c542706371435249261435671234567567456172435637152435760476273233734172483670526954156012345167845071627342586273143521617853724063756946821452146207143507146352794021973586437017826049524164582174257063761435249263567521a73415248734670652698514538000101010101010427101000".$minBets.$maxBets."a101010101010100a0a01110010101010100000000000000000".$betsLength.$betString."0b1010101010101010101010#00101010&";
	////////////////////////////////////////  

$hisWin="10";
$hisState="4"; //b-additional anim bonus / 3-win-take-or-gamble	/5-normal bonus next/ 7 -gamble / 4- normal
//&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['lovelylady_freeGames2']."&".$_SESSION['lovelylady_freeGames']."&".$_SESSION['lovelylady_freeGamesBank']
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
$_SESSION['lovelylady_freeGames2']=$hisTmp2[4];
$_SESSION['lovelylady_freeGames']=$hisTmp2[5];
$_SESSION['lovelylady_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['lovelylady_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['lovelylady_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="5";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['lovelylady_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['lovelylady_freeGames2']=$hisTmp2[4];
$_SESSION['lovelylady_freeGames']=$hisTmp2[5];
$_SESSION['lovelylady_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['lovelylady_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['lovelylady_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="b";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['lovelylady_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

if($hisTmp2[0]=="freegame_end"){
$hisReel=$hisTmp2[2];	
//$hisBalance=$hisTmp2[7];
$_SESSION['lovelylady_freeGames2']=$hisTmp2[4];
$_SESSION['lovelylady_freeGames']=$hisTmp2[5];
$_SESSION['lovelylady_freeGamesBank']=$hisTmp2[6];
$_SESSION['double_balance']=$hisBalance;

$freeRH=dechex($_SESSION['lovelylady_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	$freeRH2=dechex($_SESSION['lovelylady_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
		
$f1=$freeR;
$f2=$freeR2;

$hisState="c";

$str_winall=str_replace(".","",$hisTmp2[1]."");
$_SESSION['lovelylady_freeGamesWin']=$onlyWin;	
$_SESSION['double_win']=$onlyWin;	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
$hisWin=strlen($winall_h).$winall_h;
	
}

}/////demo			
		
	$rtn="05220a578368c98264a79a493865a08b7a61823062981795794b3947acb38647067a189b37947529b5c9a89a22ba4a2983648a165b62a9562a80a378175936b1978bc822ba0825b394b95b74ac759165b47a082693816594b92722ba267184b92793b47b176073849a1bc493b561971b955221a08b4a71659b368c982649817a927a365224a47067acb3962a5935acb485a89470679183224a3671b94b256bc8942649a80a37bc8715a80224ac7593617582b637a0826934ac75ba468914224a52a7607381bc4967859384b65a2671bc4930".$hisState."0".$hisReel."10".$hisBalance.$hisWin."00".$minBets.$maxBets."0a".$f2.$f1."10101010100a0a011100".$hisReel."0000000000000000".$betsLength.$betString."0b1010101010101010101010#00101010";
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
	
	
	$_SESSION['dcard_lovelylady']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."";
	
	
	$rtn="100010".$rtnBalance."10".$rtnReels."000a10101010101010101010100b1010101010101010101010".$_SESSION['dcard_lovelylady']."f15fffff15fffff15fffff15fffff";
	 set_stat_game($userId, $user_balance, 0,0,"state_lovelylady");
	return $rtn;	
	}




    /*------------------------------------------------------------*/
	/*-----------------------  SPIN ------------------------------*/
	/*----------------------------------------------------------- */
	function GetSpin($bet,$lines){
		
	global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_lovelylady'])){
$_SESSION['dcard_lovelylady']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
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
	 change_bank($user_id,'lovelylady',$allbet,"spin");
	
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
	  
		$psym[0]=array(0,0,10,250,2500,9000);
$psym[1]=array(0,0,2,25,125,750);
$psym[2]=array(0,0,2,25,125,750);
$psym[3]=array(0,0,0,20,100,400);
$psym[4]=array(0,0,0,15,75,250);
$psym[5]=array(0,0,0,15,75,250);
$psym[6]=array(0,0,0,10,50,125);
$psym[7]=array(0,0,0,10,50,125);
$psym[8]=array(0,0,0,5,25,100);
$psym[9]=array(0,0,0,5,25,100);
$psym[10]=array(0,0,0,5,25,100);
$psym[11]=array(0,0,2,5,25,100);
$psym[12]=array(0,0,2,5,20,500); 
		  
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
$r[0]=array(10, 5, 7, 8, 3, 6, 8, 12, 9, 8, 2, 6, 4, 10, 7, 9, 10, 4, 9, 3, 8, 6, 5, 10, 0, 8, 11, 7, 10, 6, 1, 8);
$r[1]=array(6, 2, 9, 8, 1, 7, 9, 5, 7, 9, 4, 11, 3, 9, 4, 7, 10, 12, 11, 3, 8, 6, 4, 7, 0, 6, 7, 10, 1, 8, 9, 11, 3, 7, 9, 4, 7, 5, 2, 9, 11, 5, 12, 9, 10, 8, 9, 10);
$r[2]=array(10, 4, 10, 2, 9, 8, 3, 6, 4, 8, 10, 1, 6, 5, 11, 6, 2, 10, 9, 5, 6, 2, 10, 8, 0, 10, 3, 7, 8, 1, 7, 5, 9, 3, 6, 11, 1, 9, 7, 8, 11, 12, 8);
$r[3]=array(10, 0, 8, 2, 5, 11, 3, 9, 4, 11, 9, 5, 11, 7, 4, 10, 12, 7, 5, 9, 1, 6, 5, 11, 4, 7, 10, 0, 8, 2, 6, 9, 3, 8, 1, 6, 5, 9, 4, 11, 9, 2, 7);
$r[4]=array(10, 2, 6, 7, 1, 8, 4, 11, 9, 2, 7, 9, 3, 11, 4, 7, 11, 1, 7, 6, 0, 7, 3, 8, 4, 9, 10, 1, 11, 12, 4, 9, 3, 11, 5, 6, 1, 9, 7, 1, 11, 9, 5);	



$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=0;
	
	
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

 if ($s1 == $wild && $s2 !=12 && $s2!=12)
				{
					$s1 = $s2;
					$gg = 2;
				}
				if ($s2 == $wild && $s1 !=12 && $s1!=12)
				{
					$s2 = $s1;
					$gg = 2;
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=12)
	            {
	                $s1 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=12)
	            {
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=12)
	            {
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=12)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=12)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=12)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=12)
	            {
	                $s1 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=12)
	            {
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=12)
	            {
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=12)
	            {
	                $s4 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=12)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=12)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=12)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=12)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=12)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=12)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               $gg = 2;
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=12)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					$gg = 2;
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=12)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					$gg = 2;
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=12)
				{
					$s5 = $s2;
					$gg = 2;
				}
				
				



/////////////////////////////////////

if(($s1==$s2 ) && $s1 !=12 ){



$wins[$ln]=$psym[$s2][2]*$gg;	
	
}				

if(($s1==$s2 ) && ($s2==$s3) && $s1 !=12 ){



$wins[$ln]=$psym[$s3][3]*$gg;	
	
}
if(($s1==$s2 ) && ($s2==$s3) && ($s3==$s4 ) && $s1 !=12 ){



$wins[$ln]=$psym[$s4][4]*$gg;	
	
}
if(($s1==$s2 ) && ($s2==$s3 ) && ($s3==$s4 )  && ($s4==$s5 ) && $s1 !=12){



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
	
if($map[$i]==12){
$scatter_win++;	
}
	
}		
if($scatter_win>=2){	
$winall+=($psym[12][$scatter_win]*$gBet*$lines);
$winall_r+=($psym[12][$scatter_win]*$lines);
$whex=dechex($psym[12][$scatter_win]);	
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
 change_bank($user_id,'lovelylady',$winall*-1,"spin");	
	
	
	
	
	
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
	
	$_SESSION['lovelylady_freeGamesWin']=$winall;
	
	
	$str_winall=str_replace(".","",($winall*$conf['fmp'])."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_lovelylady']=$map;	
	
	
	$gameState="03";
    $freeInfo="10101010101010101010100b";
	if($isBonus && $scatter_win>=3){
	$hisState="freegame_start";
	$_SESSION['lovelylady_freeGames']=15;
	$_SESSION['lovelylady_freeGames2']=15;
	
	$_SESSION['lovelylady_freeGamesBank']=$gset['sum'];
	
$gameState="05";	
	 $freeInfo="1f1f1013101010101010100b";	
	}
	
	$respinMap="";
	
	for($i=0; $i<=14;$i++){
	
    
	$respinMap.="10";	
	
	
	}
	
	
	
	
	/*-------------------------------*/
	
	$rtn="1".$gameState."0"."10".$rtnBalance.strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_lovelylady']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['lovelylady_freeGames2']."&".$_SESSION['lovelylady_freeGames']."&".$_SESSION['lovelylady_freeGamesBank']."&".$rtnBalance;
	
	
	
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
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr.$_SESSION['dcard_lovelylady'].$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['lovelylady_freeGames2']."&".$_SESSION['lovelylady_freeGames']."&".$_SESSION['lovelylady_freeGamesBank']."&".$rtnBalance;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_lovelylady");
	ge_serv_show_str($rtn);			
		
		
	}

    /*------------------------------------------------------------*/
	/*-----------------------  FREE SPINS| RESPINS ---------------*/
	/*----------------------------------------------------------- */

	
	function GetRespin($bet,$lines){
		
global $room,$conf, $login,$userId,$user_id,$action;	
	
	
	
	
	$userId=$user_id;
    $user_balance =  floor_format_(get_balance($userId)) ;
	
	
if(!isset($_SESSION['dcard_lovelylady'])){
$_SESSION['dcard_lovelylady']=rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5).rand(0,5)."0";
		
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
	// change_bank($user_id,'lovelylady',$allbet,"spin");
	
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
	  
		$psym[0]=array(0,0,10,250,2500,9000);
$psym[1]=array(0,0,2,25,125,750);
$psym[2]=array(0,0,2,25,125,750);
$psym[3]=array(0,0,0,20,100,400);
$psym[4]=array(0,0,0,15,75,250);
$psym[5]=array(0,0,0,15,75,250);
$psym[6]=array(0,0,0,10,50,125);
$psym[7]=array(0,0,0,10,50,125);
$psym[8]=array(0,0,0,5,25,100);
$psym[9]=array(0,0,0,5,25,100);
$psym[10]=array(0,0,0,5,25,100);
$psym[11]=array(0,0,2,5,25,100);
$psym[12]=array(0,0,2,5,20,500);
		  
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
$r[0]=array(10, 0, 8, 11, 4, 10, 7, 1, 6, 5, 9, 11, 3, 6, 8, 12, 9, 8, 2, 6, 4, 9, 8, 1, 7, 10, 9, 2, 7, 10, 3, 6, 5);
$r[1]=array(10, 4, 7, 0, 6, 7, 10, 12, 11, 3, 9, 6, 2, 10, 5, 9, 3, 5, 10, 12, 11, 4, 8, 5, 10, 8, 9, 4, 7, 0, 6, 7, 9, 1, 8, 3);
$r[2]=array(10, 3, 6, 7, 1, 11, 9, 4, 11, 2, 5, 6, 11, 12, 8, 9, 4, 2, 6, 4, 9, 10, 8, 0, 10, 3, 7, 11, 12, 8, 7, 1, 5, 10, 8, 0);
$r[3]=array(10, 12, 7, 5, 9, 3, 6, 1, 7, 5, 8, 2, 11, 6, 3, 7, 10, 0, 8, 2, 6, 9, 3, 4, 10, 12, 7, 5, 11, 10, 4, 6, 8, 9, 1, 4);
$r[4]=array(10, 5, 2, 10, 7, 6, 0, 7, 3, 8, 1, 11, 12, 4, 9, 6, 7, 8, 5, 9, 3, 8, 4, 11, 6, 5, 10, 2, 6, 7, 1, 11, 12, 4, 9, 3);	


$bonusR1Pos=array(1,5,9,13,17,21,29,33);
//////////////////
	
	
	
	/////////////////////////////////////////////////////
	$wild=0;
	
	
	$isWin=false;
	$isBonus=false;
	/////////////////////////////////////game_setting
		
		$gset=spin("spin",$gBet,$lines);
		if($gset['type']=="bon"){
	 
		}
		if($gset['type']=="win"){
		$isWin=true;
		} 
		$casbank = $_SESSION['lovelylady_freeGamesBank']; 
		
		$winRand=rand(1,2);
	
	if($winRand==1){
	
$isWin=true;	
		
	}
		$bRand=rand(1,50);
	
	if($bRand==1){
	
$isBonus=true;	
		
	}
	
	$_SESSION['lovelylady_freeGames']--;
	
	
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

 if ($s1 == $wild && $s2 !=12 && $s2!=12)
				{
					$s1 = $s2;
					$gg = 2;
				}
				if ($s2 == $wild && $s1 !=12 && $s1!=12)
				{
					$s2 = $s1;
					$gg = 2;
				}
				if ( $s1 == $wild && $s2 == $s3 && $s2 !=12)
	            {
	                $s1 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s1 !=12)
	            {
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s1 !=12)
	            {
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 !=12)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 !=12)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 !=12)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $s3 && $s3 == $s4 && $s2 !=12)
	            {
	                $s1 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s1 == $s3 && $s3 == $s4 && $s1 !=12)
	            {
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s1 == $s2 && $s2 == $s4 && $s1 !=12)
	            {
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s4 == $wild && $s1 == $s2 && $s2 == $s3 && $s1 !=12)
	            {
	                $s4 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s2 == $wild && $s3 == $s4 && $s3 !=12)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s3 == $wild && $s2 == $s4 && $s2 !=12)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	               $gg = 2;
	            }
	            if ( $s1 == $wild && $s4 == $wild && $s2 == $s3 && $s2 !=12)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s3 == $wild && $s1 == $s4 && $s1 !=12)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	               $gg = 2;
	            }
	            if ( $s2 == $wild && $s4 == $wild && $s1 == $s3 && $s1 !=12)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	               $gg = 2;
	            }
	            if ( $s3 == $wild && $s4 == $wild && $s1 == $s2 && $s1 !=12)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	               $gg = 2;
	            }
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 !=12)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					$gg = 2;
				}
				if ($s1 == $wild && $s2 == $wild && $s3 == $wild && $s4 == $wild && $s5 !=12)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					$gg = 2;
				}
				if ($s5 == $wild && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 !=12)
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
	
if($map[$i]==12){
$scatter_win++;	
}
	
}		
if($scatter_win>=2){	
$winall+=($psym[12][$scatter_win]*$gBet*$lines)*3;
$winall_r+=$psym[12][$scatter_win]*3;
$whex=dechex($psym[12][$scatter_win]*3);	
$winstr.=strlen($whex).$whex;	
}else{
$winstr.="10";	
}	
	
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
	if($isBonus && $scatter_win>=3){
	$isCalc=false;		
	}
	
	if($loopCnt>800){
	$isCalc=false;	
		
	}
	
	}
		$hisState="freegame";	
if($winall>0){
	
 cange_balance($userId, $winall);
 change_bank($user_id,'lovelylady',$winall*-1,"spin");	
$_SESSION['lovelylady_freeGamesBank']-=	$winall;
	
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
	
	$_SESSION['lovelylady_freeGamesWin']+=$winall;
	//$winall_r=$_SESSION['lovelylady_freeGamesWin'];
	$hisWin=$_SESSION['lovelylady_freeGamesWin'];	
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
	$_SESSION['rmap_lovelylady']=$map;	
	
	
	$gameState="06";
    
	if($_SESSION['lovelylady_freeGames']<=0){
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
	$_SESSION['lovelylady_freeGames2']+=15;	
	$_SESSION['lovelylady_freeGames']+=15;	
	$gameState="0a";
	}
	
	$freeRH2=dechex($_SESSION['lovelylady_freeGames2']);
	$freeR2=dechex(strlen($freeRH2)).$freeRH2;
	$freeRH=dechex($_SESSION['lovelylady_freeGames']);
	$freeR=dechex(strlen($freeRH)).$freeRH;
	 $freeInfo=$freeR2.$freeR.$ww."131010".$rtnReels."0b";	
	/*-------------------------------*/
	$winall2=$_SESSION['lovelylady_freeGamesWin']*$conf['fmp'];
	$str_winall=str_replace(".","",$winall2."");
	
	
	$str_winall=($str_winall-0);
	
	$winall_h=dechex($str_winall);
	
	
	$rtn="1".$gameState."0"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h.$freeInfo.$winstr.$_SESSION['dcard_lovelylady']."".$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['lovelylady_freeGames2']."&".$_SESSION['lovelylady_freeGames']."&".$_SESSION['lovelylady_freeGamesBank']."&".$rtnBalance;
	
	
	
	//////////////////////////////////////////////double_answer
	
	$_SESSION['double_answer']=$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr."";
	//$_SESSION['double_balance']=$rtnBalance;
	$_SESSION['double_win']=$_SESSION['lovelylady_freeGamesWin'];
	
	///////////////////////////////////////////////finish answer
	
	$user_balance =  floor_format_(get_balance($userId)) ;
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
	
	
	
	$_SESSION['finish_answer']=strlen($winall_h).$winall_h.$rtnReels."".$bet_h.$ln_h."10101010101010101010100b".$winstr.$_SESSION['dcard_lovelylady'].$respinMap."#&st=".$hisState."&".$hisWin."&".$rtnReels."&".$bet_h."&".$_SESSION['lovelylady_freeGames2']."&".$_SESSION['lovelylady_freeGames']."&".$_SESSION['lovelylady_freeGamesBank']."&".$rtnBalance;
	
	set_stat_game($userId, $user_balance, $allbet,$winall,"spin_lovelylady");
		ge_serv_show_str($rtn);		
			
		
	}	
	function FinishSpin(){
	global $room,$conf, $login,$userId,$user_id;	
	
	$dc=$_SESSION['dcard_lovelylady'];
	$userId=$user_id;
 $_SESSION['dcard_lovelylady']=$dc;
		
		
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
		
	$casbank=get_bank($user_id,'lovelylady',"double");	
	$winall=$_SESSION['double_win'];
	$dbet=$winall;
	
	if($winall>0){
	 cange_balance($userId, $winall*-1);
	 change_bank($user_id,'lovelylady',$winall,"double");	
		
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
	
	
	
	$doubleCards=$_SESSION['dcard_lovelylady'];
	$doubleCards=substr($doubleCards,0,strlen($doubleCards)-3);
	$doubleCards=$ucard.$doubleCards."0";
	
//bubi->chervy->tref->piki->
	
	 //$rtn="10707e82a7813569501010101010000a10101010101010101010103310101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101030241220000000000f15fffff15fffff15fffff15fffff";
	
	
	if($winall>0){
	 cange_balance($userId, $winall);
	 change_bank($user_id,'lovelylady',$winall*-1,"double");	
		
	}
	
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1070"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	$_SESSION['dcard_lovelylady']=$doubleCards;
	$_SESSION['double_win']=$winall;
	
	
	set_stat_game($userId, $user_balance, $dbet,$winall,"double_lovelylady"); 
	
	ge_serv_show_str( $rtn);	
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
	
	$doubleCards=$_SESSION['dcard_lovelylady'];
	
	

	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	
     $rtn="1080"."10".$_SESSION['double_balance'].strlen($winall_h).$winall_h.$_SESSION['double_answer'].$doubleCards."f15fffff15fffff15fffff15fffff";
	
	
	$_SESSION['double_win']=$winall;
	set_stat_game($userId, $user_balance, $winall,$winall,"double_half_lovelylady");
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
