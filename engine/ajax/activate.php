<?php

include ('../cfg.php');
include ('../ini.php');

if($login)
  { 
  mysql_query("delete from activate where exp_time<now()");  
  
  if($status==1&& isset($_REQUEST['user']))//          
    {
    $type=isset($_REQUEST['type']) && $_REQUEST['type']=='mail' ? 1 : 2;
    $type_txt=isset($_REQUEST['type']) && $_REQUEST['type']=='mail' ? 'mail' : 'phone';
    $u_id=floatval($_REQUEST['user']);
    $resend=intval($_REQUEST['resend']);
    
    $user_info=mysql_fetch_assoc(mysql_query("select *, exp_time<now() as expired_activate from users join activate on (users.id=activate.user_id) where activate.type=$type and id=$u_id"));
    if($user_info[$type_txt.'_active_status']==2)//                               ,                                  
      {
      $sql="update users set ".$type_txt."_active_status=0 where id=$u_id";
      mysql_query($sql);
      echo "OK";
      }
    elseif($user_info[$type_txt.'_active_status']==1)
      {
        if($resend)
          {
          activate_user($u_id,$type,1,$activate_code);
          
          $activate="$activate_code";
          if($type==1)
            {
            if (user_mail(8, $u_id,array('activate_code'=>$activate_code,'activate'=>$activate)))
              echo "OK";
            else
              echo "error|".$lang['mailserver_error'];
          }     
          }
        else
          {
          activate_user($u_id,$type,2,$activate_code);
          echo "OK";
          }  
      }  
    elseif($user_info[$type_txt.'_active_status']==0)
      {
      $val=isset($_REQUEST['val']) ? addslashes(htmlspecialchars($_REQUEST['val'], ENT_QUOTES)) : false;
      if($val)
        {
        if($type_txt=='mail')
          {
          if(preg_match("/^[a-z0-9_.-]{1,20}@(([a-z0-9-]+\.)+(com|net|org|mil|edu|gov|arpa|info|biz|[a-z]{2})|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})$/is", $val))
            {
            mysql_query("update users set email='$val' where id=$u_id") or save_log(mysql_error(),'db_error.log');
            }
          else
            exit("error|                             Email");
          }
        else
          {
          if(preg_match("/^\+\d{12}$/is", $val))
            mysql_query("update users set qiwi='$val' where id=$u_id");
          else
            exit("error|                                           ");
          }  
        }
      activate_user($u_id,$type,1,$activate_code);
      
      $activate="$activate_code";
      if($type==1)
        {
        if (user_mail(8, $u_id,array('activate_code'=>$activate_code,'activate'=>$activate)))
          echo "OK";
        else
          echo "error|".$lang['mailserver_error'];
        }    
      }  
    }
  else
    {
  $code=isset($_REQUEST['code']) ? $_REQUEST['code']: false;
  if($code)
    {
    $res=mysql_query($sql="select * from activate where code='".$code."'");
    if(mysql_num_rows($res)>0)
      {
      $active_info=mysql_fetch_assoc($res);
      $sql="update users set ";
      if($active_info['type']==1)
        $sql.=" mail_active_status=2 ";
      
      $sql.= " where id=".$active_info['user_id']; 
      if(mysql_query($sql))
         {mysql_query("delete from activate where code='".$code."'");
         echo "OK";
         }  
      }
    else
      echo "error|                                                       ";
    }
  else
    {
  
  $type=isset($_REQUEST['type']) && $_REQUEST['type']=='email' ? 1 : 2;
  $type_txt=isset($_REQUEST['type']) && $_REQUEST['type']=='email' ? 'mail' : 'phone';
  
  $user_info=mysql_fetch_assoc(mysql_query("select * from users where id=$user_id"));
 
  if($user_info[$type_txt.'_active_status']==2)
    {
    $answer['success']=false;
    $answer['error']="       e-mail                 ";
    }
  else
    {
    if($user_info[$type_txt.'_active_status']==1 && !isset($user_info['expired_activate']))
      {
      $answer['success']=false;
      $answer['error']="                                                          ";
      }
    else
      {
      $val=isset($_REQUEST['val']) ? addslashes(htmlspecialchars($_REQUEST['val'], ENT_QUOTES)) : false;
      
      if($type_txt=='mail')
        {
        if(preg_match("/^[a-z0-9_.-]{1,20}@(([a-z0-9-]+\.)+(com|net|org|mil|edu|gov|arpa|info|biz|[a-z]{2})|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})$/is", $val))
          {
          mysql_query($sql="update users set email='$val' where id=$user_id") or save_log($sql."\r\n".mysql_error(),'db_error.log');
          }
        else
          {
          $answer['success']=false;
          $answer['error']="                             Email";
          }
        }
      else
        {
        if(!preg_match("/^\+/i", $val))
          $val='+'.trim($val);
        if(preg_match("/^\+\d+/i", $val) && strlen($val)>8)
          {
          if(mysql_query($sql="update users set qiwi='$val' where id=$user_id"))
            $user_info['qiwi']=$val;
          else
            {
            $error=mysql_error();
            save_log($sql."\r\n".$error,'db_error.log');
            if(preg_match("/duplicate entry '(.*)' for key 'qiwi'/i",$error,$matches))
              {
              $answer['success']=false;
              $answer['error']="               $matches[1]                        ";
              }
            else  
              {
              $answer['success']=false;
              $answer['error']="                                                                 ";
              }
            }  
          }
        else
          {
          $answer['success']=false;
          $answer['error']="                                            $val";
          }
        }
      activate_user($user_id,$type,1,$activate_code);
      
      $activate="$activate_code";
      if($type==1)
        {
        if (user_mail(8, $user_id,array('activate_code'=>$activate_code,'activate'=>$activate)))
          $answer['success']= true;
        else
          {
          $answer['success']=false;
          $answer['error']=$lang['err_no_send'];
          }
        }     
      }  
    } 
    }
    echo json_encode($answer); 
    }
  }
  
function activate_user($user_id,$type,$status,&$code)
  {
  global $conf;
  $user_info=mysql_fetch_assoc(mysql_query("select * from users  where id=$user_id"));
  $type_txt=$type==1? 'mail': 'phone';
  
  if($status==1)//                                            
    {
    do{
    $code=generator('off','off','on','off',5);
    $res=mysql_query("select * from activate where code='$code'");
      }
      while (mysql_num_rows($res)>0);
    
    mysql_query($sql="insert into activate values('$code', $user_id, now()+ interval 1 day, $type) ON DUPLICATE KEY UPDATE code='$code'") or save_log($sql."\r\n".mysql_error(),'db_error.log');
    
    mysql_query($sql="update users set ".$type_txt."_active_status=1 where id=$user_id") or save_log($sql."/r/n".mysql_error(),'db_error.log');
    }
  elseif($status==2)//                                                             
    {
    $act_bon=isset($conf['act_bon']) ? floatval($conf['act_bon']) : 0;
    $act_bon_ref=isset($conf['act_bon_ref']) ? floatval($conf['act_bon_ref']) : 0;
    $payed_spin=$conf['payed_spins_val'];
    
    
    mysql_query($sql="update users set ".$type_txt."_active_status=2, balance_bonus=balance_bonus+$act_bon, payed_spins=$payed_spin where id=$user_id") or save_log($sql."/r/n".mysql_error(),'db_error.log');
    
    save_stat_pay($act_bon,$user_info['login'],2,'act_bon',$inv_code);
    
         if($user_info['ref_id'])
          {
          mysql_query("update users set balance_bonus=balance_bonus+$act_bon_ref, payed_spins=$payed_spin where id=".$user_info['ref_id']);
          save_stat_pay($act_bon_ref,'id:'.$user_info['ref_id'],2,'act_bon_ref',$inv_code);
          }
    
    }  
  }  
?>