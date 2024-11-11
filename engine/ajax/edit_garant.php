<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
Error_Reporting(E_ALL);                              
if (isset($_REQUEST['user'])&&is_numeric($_REQUEST['user']))
  {
  $edited_user=$_REQUEST['user'];
  }  
$data=mysql_real_escape_string($_REQUEST['data']);
$type=$_REQUEST['type'];
if($status==1)
  {
  $garant_field=$type=='bonus'? 'garant_bonus': 'garant';
  mysql_query("update users set $garant_field='$data' where id=$edited_user") or print (mysql_error());
  }

?>