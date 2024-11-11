   <?php

error_reporting(0);

include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';

$userId=$user_id;

if($conf['float_bet']==1){

    $user_balance =  get_balance($userId) ;
}else{
$user_balance =  floor(get_balance($userId)) ;	
}
	
	$hexLogin=base_convert($login."", 10, 16);
	$loginId=dechex(strlen($hexLogin)).$hexLogin;
	////////////////////////////////login
	$str_balance=str_replace(".","",$user_balance."");
	$hexBalance=dechex(($str_balance-0));
	$rtnBalance=strlen($hexBalance).$hexBalance;
	///////////////////////////////balance
/*	
admiralnelson,allwaysfruits,wolfmoon,aztecsecret,bells_on_fire,bellsonfirehot,bellsonfirerombo,bigpanda,billyonaire,billysgame,bluedolphin,bookofaztec
bookoffortune,casanova,casinova,cooldiamonds2,diamondcats,diamondmonkey,diamondsonfire,dragonskingdom,dragonspearl,dynamite7,eyeofra,fantastico7
fireandice,fortunas_fruits,gemstar,goldenbook,grandtiger,hot7,hot81,hotdiamonds,hotneon,hotscatter,hotstar,ladyjoker
lagran,legion,lovelylady,luckybells,luckycoins,luckyzodiac,magicforest,magicidol,magicowl,magicscatter,mermaidsgold,merry_fruits
partytime,phoenix,redchilli,royalunicorn,tweetybirds,twenty_hot,vampires,wild_dragon,wild_respin,wild_seven,wilddiamonds,wildshark
*/

$str=$_GET['ddd'];

echo"1".$rtnBalance."| |  EUR |null|0|Top Games,| Page 1,admiralnelson,allwaysfruits,wolfmoon,aztecsecret,bells_on_fire,bellsonfirehot,bellsonfirerombo,bigpanda,billyonaire,billysgame,bluedolphin,bookofaztec| Page 2,bookoffortune,casanova,casinova,cooldiamonds2,diamondcats,diamondmonkey,diamondsonfire,dragonskingdom,dragonspearl,dynamite7,eyeofra,fantastico7| Page 3,fireandice,fortunas_fruits,gemstar,goldenbook,grandtiger,hot7,hot81,hotdiamonds,hotneon,hotscatter,hotstar,ladyjoker| Page 4,lagran,legion,lovelylady,luckybells,luckycoins,luckyzodiac,magicforest,magicidol,magicowl,magicscatter,mermaidsgold,merry_fruits| Page 5,partytime,phoenix,redchilli,royalunicorn,tweetybirds,twenty_hot,vampires,wild_dragon,wild_respin,wild_seven,wilddiamonds,wildshark| Page 6,ageoftroy,burningdice,burninghot,cleopatra,diceofra,dragon_reels,extremely,flaminghot,greatempire,olympus,supremehot,zodiac| Page 7,fruitskingdom,gameofluck,greategypt";	

?>