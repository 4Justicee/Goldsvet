<?php
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');

$id= isset($_REQUEST['id'])?intval($_REQUEST['id']) : false;
$answer=array();
if($status==1 && $id)
  {
  $sql="select * from users where id=$id";
  $answer=mysql_fetch_assoc(mysql_query($sql));
  unset($answer['pass']);
  }
  
echo json_encode($answer);  
?>