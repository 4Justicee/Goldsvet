<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
                              

$id=isset($_REQUEST['id'])?$_REQUEST['id']:false;

if (is_numeric($id))
  {
  show_user_addinfo ($id, true);
  }
elseif (is_numeric($room_id=substr($id,4)))
  {
  show_room_addinfo ($room_id,true,false);
  }  


?>