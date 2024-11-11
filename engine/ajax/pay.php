<?php
include ('../cfg.php');
include ('../ini.php');

if(!$login)
  {json_encode(array('success'=>false,'error'=>"                                       "));
  die();
  }


$ps=isset($_REQUEST['paysys'])?$_REQUEST['paysys']:'pin';

if($ps=='pin')
  {
  $pin=isset($_POST['pin_code'])? addslashes($_POST['pin_code']): false;
  $error_stay=isset($_SESSION['error_stay'])? $_SESSION['error_stay'] : 10;
  if ($pin && strlen($pin)==10)
  {
  $sql= "select * from enter where status=1 and login='$pin' and paysys='pin'";
  $res=mysql_query($sql);
  
  
  if ($res && mysql_num_rows($res)>0)
    {
    $row=mysql_fetch_assoc($res);
    $sql= "update enter set login='$login' where id=".$row['id'];
    mysql_query($sql);
    $sys='pin';
    $q=pay($row['id']);
    $answer=array("success"=>true, "txt"=>$lang['err_yes_pin']." ".$row['sum']);
    unset($_SESSION['error_stay']);
    }
  else
    {
    $sql="select * from scratch_cards where pin='$pin' and status=1";
    $row=mysql_fetch_assoc(mysql_query($sql));
    
    if($row)
      {
      mysql_query("update scratch_cards set status=3, time_activate=now() where pin='$pin'");
      
      
      $enter_id=mysql_result(mysql_query("select id from enter where login='$pin' limit 1"),0);
      mysql_query("update enter set login='$login' where id=".$enter_id);
      $sys='scratch_card';
      pay($enter_id);
      $_SESSION['messages'][]=array('erok',$lang['err_yes_pin']." ".$row['sum']);
      $answer=array("success"=>true, "txt"=>$lang['err_yes_pin']." ".$row['sum']);
      unset($_SESSION['error_stay']);
      }
    else
      {
      $_SESSION['error_stay']=--$error_stay; 
      if ($error_stay>0)
        $error=$lang['err_no_pin_search'].", ".$lang['err_pin_stay']." ".$error_stay;
      else
        {
        $error=$lang['err_pin_block'];
        block_user($user_id);
        }
      }
    }
  }else
    {
    $_SESSION['error_stay']=--$error_stay; 
    if ($error_stay>0)
      $error= $lang['err_no_pin'].", ".$lang['err_pin_stay']." ".$error_stay ;
    else
      {
      $error= $lang['err_pin_block'];
      block_user($user_id);
      }
    } 

  } 
elseif($ps=='out')
  {
    
  if($user_info['wager']>0)
    {
    $error=$lang['err_no_weger'] ." <b>".$user_info['wager']."     .</b>";
    }  
  
  if(!$conf['allow_outpay'])
  {$error=$lang['err_no_out'];}
	
   if(!isset($error)) { 
    
    $sum = sprintf ("%01.2f", str_replace(',', '.', $_POST['sum']));
		$selected_ps	= isset($_POST['ps'])? $db->prepare($_POST['ps']): false;
    $account=isset($_POST['account'])? $db->prepare($_POST['account']): '';
		$user_balance=$user_info['balance'];
		if ($sum < $conf['minout'] || $sum > $conf['maxout']) {
		  //print_r($conf);
		  $txt=str_replace("{min}", $conf['minout'], $lang['err_min_max_out']);
		  $txt=str_replace("{max}", $conf['maxout'], $txt);
			$error=$txt;
		} elseif (!array_key_exists($selected_ps,$trioApi_outways)) {
			$error=$lang['err_no_access_ps'];
		} elseif ($user_balance < $sum) {
			$error=$lang['err_no_money'];
    } elseif ($selected_ps=='0') {
			$error=$lang['err_in_ps'];
		}
     else {

       $users_payrequest=$db->get_one("select count(*) from output where login='$login' and status=0");
       if($users_payrequest==0)
       {
      if(save_stat_outpay($sum,$login,'0',$trioApi_outways[$selected_ps]."_".$account,$inv_code)){
				
        //$real_balance=$balance=cange_balance($user_id, -1*$sum, true);
        $real_balance=$balance=change_balance(-1*$sum, $user_id, $ps, true);
        //mysql_query("update users set action=3 where id=$user_id");
				//$date = date("d.m.Y");
        //send_sms(3,array('login'=>$login,'sum'=>$sum));
        $_SESSION['messages'][]=array('erok',"                                      $sum                             ,                 ");
        
        
				$answer=array("success"=>true, 'result'=>'ok', 'txt'=>$lang['err_yes_out']);
			} else {
				$error=$lang['err_no_send_out'];
			}
      }
      else
        {
        $error=$lang['err_wait_out'];
        }
		}
  }
  }     

 if(isset($error))
    $answer=array('success'=>false,'error'=>$error, 'message'=>$error);
  elseif(!isset($answer))
    $answer=array('success'=>false,'error'=>'                                  ');
  
  echo json_encode($answer);
  die();  
?>