<?php

chdir('..');
include "../../cfg.php";
include "../../ini.php";

 $pin=isset($_POST['pin'])? $db->prepare($_POST['pin']): false;
 $error_stay=isset($_SESSION['error_stay'])? $_SESSION['error_stay'] : 10;
  if ($pin && strlen($pin)==10)
  {
  $sql= "select * from enter where status=1 and login='$pin' and paysys='pin'";
  
  if ($row=$db->get_row($sql))
    {
    $sql= "update enter set login='$login' where id=".$row['id'];
    $db->run($sql);
    $sys='pin';
    pay($row['id']);
    $answer=array("result"=>"ok", "sum"=>$row['sum']);
    $_SESSION['messages'][]=array('erok',$lang['err_yes_pin']." ".$row['sum']);
    unset($_SESSION['error_stay']);
    }
  else
    {
    $sql="select * from scratch_cards where pin='$pin' and status=1";
    $row=$db->get_row($sql);
    
    if($row)
      {
      $db->run("update scratch_cards set status=3, time_activate=now() where pin='$pin'");
      
      
      $enter_id=$db->get_one("select id from enter where login='$pin'");
      $db->run("update enter set login='$login' where id=".$enter_id);
      $sys='scratch_card';
      pay($enter_id);
      $answer=array("result"=>"ok", "sum"=>$row['sum']);
      $_SESSION['messages'][]=array('erok',$lang['err_yes_pin']." ".$row['sum']);
      unset($_SESSION['error_stay']);
      }
    else
      {
      $_SESSION['error_stay']=--$error_stay; 
      if ($error_stay>0)
        $answer=array("result"=>"err",  "message"=>$lang['err_no_pin_search'].", ".$lang['err_pin_stay']." ".$error_stay);
      else
        {
        $answer=array("result"=>"err",  "message"=>$lang['err_pin_block']);
        block_user($user_id);
        }
      }
    }
  }else
    {
    $_SESSION['error_stay']=--$error_stay; 
    if ($error_stay>0)
      $answer=array("result"=>"err",  "message"=>$lang['err_no_pin'].", ".$lang['err_pin_stay']." ".$error_stay );
    else
      {
      $answer=array("result"=>"err",  "message"=>$lang['err_pin_block']);
      block_user($user_id);
      }
    } 

  if(isset($_REQUEST['redirect']))
	   {
     header('location: /enter');
     die();
     }
  else
    {
    echo json_encode($answer);
    }   
     
	
?>