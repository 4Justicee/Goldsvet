<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
Error_Reporting(E_ALL);                              

$jack_id=isset($_REQUEST['jack'])?intval($_REQUEST['jack']):false;
$trend= isset($_REQUEST['action'])? ($_REQUEST['action']=='plus' ? 1 : -1) : 0 ;  //         action                ,                             0,   .  .                                       
$sum=isset($_REQUEST['suma'])?  (floatval($_REQUEST['suma']) * $trend) : 0;

if($sum<0)
  echo "                                                             ";
elseif ($status==1)
  {
  echo change_jack_balance($jack_id,$sum);
  }
else  
  echo "                                                                 ";
?>