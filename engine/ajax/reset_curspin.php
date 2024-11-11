<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
Error_Reporting(E_ALL);                              
if (isset($_REQUEST['user'])&&is_numeric($_REQUEST['user']))
  {
  $edited_user=$_REQUEST['user'];
  }  

if($status==1)
  {
  $type=$_REQUEST['type'];
  $curspin_field=$type=='bonus'? 'curspin_bonus': 'curspin';
  mysql_query("update users set $curspin_field=0 where id=$edited_user") or print (mysql_error());
  }

?>