<?php 
include ('../cfg.php');
include ('../ini.php');
Error_Reporting(E_ALL);                              

if($status!=1)
  die('{"status":"error","txt": "                                          "}');

$action=isset($_REQUEST['action'])? $_REQUEST['action'] : false;

if($action=='change')
  {
  $g_id=isset($_REQUEST['g_id'])?intval($_REQUEST['g_id']):false;
  $jp=isset($_REQUEST['jp'])?intval($_REQUEST['jp']):false;
  $field=isset($_REQUEST['field'])?$db->prepare($_REQUEST['field']):false;
  $sum=isset($_REQUEST['suma'])?  floatval($_REQUEST['suma'])  : 0;
  
  $jp_val= $db->get_one("select $field from game_settings where g_id=$g_id");
  $jp_val_arr=explode('|',$jp_val);
  if($jp_val_arr[$jp]==$sum)
    $answer=array("status"=>"ok");
  else
    {
    $jp_val_arr[$jp]=$sum;
    $jp_val=implode('|',$jp_val_arr);
    if($db->run("update game_settings set $field='$jp_val' where g_id=$g_id"))
      $answer=array("status"=>"ok");
    else
      $answer=array("status"=>"error","txt"=>$db->error);  
    }  
  }

  echo json_encode($answer);
?>