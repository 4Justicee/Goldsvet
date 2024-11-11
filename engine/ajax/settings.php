<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
                              
if ($status==1)
  {
  $key=isset($_REQUEST['key'])? $db->prepare($_REQUEST['key']) : false;
  $val=isset($_REQUEST['val'])? $db->prepare($_REQUEST['val']) : false;
  
  
  if($val=='true' || $val=='false')
    $val=$val=='true'? 1 : 0;
  var_dump($key);
  var_dump($conf[$key]);
  var_dump($val);
  if($conf[$key]==$val)
    return true;
  else
    return $db->run("update settings set val='$val' where key_name='$key'");
  }


?>