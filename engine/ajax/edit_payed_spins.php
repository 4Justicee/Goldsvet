<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
Error_Reporting(E_ALL);                              
if (isset($_REQUEST['user'])&&is_numeric($_REQUEST['user']))
  {
  $edited_user=$_REQUEST['user'];
  }  
$amount=floatval($_REQUEST['amount']);
if($status==1)
  {
  mysql_query("update users set payed_spins=$amount where id=$edited_user") or print (mysql_error());
  }

?>