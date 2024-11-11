<?php
include ('../cfg.php');
include ('../ini.php');


$bon_type=isset($_REQUEST['type'])? $_REQUEST['type']: 'reg'; 
$bon_id=isset($_REQUEST['id'])? intval($_REQUEST['id']) : false;

$bon_class_name=$bon_type.'_Bonus';

$bonus=new $bon_class_name;

if($bon_row=$bonus->get($bon_id))
  {
  $answer=array('success'=>true,'bonus'=>$bon_row);
  }
else
  {
  $answer=array('success'=>false);
  }  

echo json_encode($answer);  
?>