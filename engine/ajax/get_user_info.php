<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
                              
if (isset($_REQUEST['id']))
  {
  if (is_numeric($_REQUEST['id']))
    {$id=$_REQUEST['id'];
     show_user_addinfo ($id);
    }
  elseif(is_numeric($room_id=substr($_REQUEST['id'],4))) 
    {
    show_room_addinfo ($room_id,true,false);
    }
  }


?>