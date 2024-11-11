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
    $sql="insert into game_favorites values (null,$g_id, ".$user_info['id'].")";
      if($db->run($sql))
        $out=array('success'=>true); 
      else
        $out=array('success'=>false,'error'=>$db->error);   
  }

  echo $json= json_encode($out);
  
?>