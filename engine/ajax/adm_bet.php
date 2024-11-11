<?php
include ('../cfg.php');
include ('../ini.php');                           

$action=isset($_REQUEST['a'])? $_REQUEST['a']: 'get';

//                                             
$alloy_action=array("get",                
                    "set");
                    
if(!in_array($action,$alloy_action))
  {
  $answer['success']=false;
  $answer['error']=$lang['err_2'];
  }
elseif($action=="get")
  {
  $gr_id=isset($_REQUEST['gr_id'])? intval($_REQUEST['gr_id']): false;
  
  if(!$gr_id)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_3'];
    }
  else
    {
    $res=$db->get_all("select * from settings where key_name in ('bets_$gr_id', 'coinvalue_$gr_id')","key_name");
    $bets=isset($res["bets_$gr_id"])? $res["bets_$gr_id"]['val']: implode(',',$adm_bet);
    $coinvalue=isset($res["coinvalue_$gr_id"])? $res["coinvalue_$gr_id"]['val']: $adm_coinvalue[0];
    $answer['success']=true;
    $answer['bets']=$bets;
    $answer['coinvalue']=$coinvalue;
    }  
  
  }
elseif($action=="set") 
  {
  $gr_id=isset($_REQUEST['gr_id'])? intval($_REQUEST['gr_id']): false;
  $key= isset($_REQUEST['key'])? $db->prepare($_REQUEST['key']): false;
  $val= isset($_REQUEST['val'])? $db->prepare($_REQUEST['val']): false;
  if(!$gr_id || !$key || !$val)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_3'];
    }
  else
    {
    $sql="insert into settings (key_name,val) values ('".$key."_".$gr_id."','$val') ON DUPLICATE KEY UPDATE val='$val'";
    if($db->run($sql))
      $answer['success']=true;
    else  
      $answer['success']=false;
    }  
  } 
  
  echo json_encode($answer); 

?>