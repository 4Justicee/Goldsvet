<?php
header("Content-Type:	text/javascript; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');

$gname=$_POST['game'];
$exp_bets="";

if($gname=="ultrahot" || $gname=="alwayshot" || $gname=="sizzlinghot" || $gname=="russian"){

$exp_bets="&new_bets=1,2,3,4,5,10,15,20,30,40,50,100,200&change_bet=1";

}

echo "&denom_mode=".$conf['denome_mode']."&exit_mode=".$conf['exit_mode']."&pay_mode=".$conf['pay_mode'].$exp_bets;

?>