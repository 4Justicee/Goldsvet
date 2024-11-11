<?php 

include ('../cfg.php');
include ('../ini.php');

if(!$login)
  {
  die("                                       ");
  }


$g_id=isset($_REQUEST['id']) ? intval($_REQUEST['id']) : false;


if($g_id)
  {
    $sql="delete from game_favorites where g_id=$g_id and user_id=".$user_info['id'];
      if($db->run($sql))
        $out=array('success'=>true); 
      else
        $out=array('success'=>false,'error'=>$db->error);   
  }

  echo $json= json_encode($out);
  
?>