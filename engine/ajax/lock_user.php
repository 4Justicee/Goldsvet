<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
Error_Reporting(E_ALL);                              

$user=isset($_REQUEST['user'])? intval($_REQUEST['user']) : false;
$action=isset($_REQUEST['action'])? $_REQUEST['action'] : false;
if($user)
  {
  if($action=='lock')
    $sql="update LOW_PRIORITY users set action=4 where id=".$user;
  if($action=='unlock')  
    $sql="update LOW_PRIORITY users set action=0 where id=".$user;
  }

if(mysql_query($sql))
  {
  echo '{"success":"true"}';
  }
else
  echo mysql_error();  
  
?>