<?php

if(isset($_GET['ulogin']))
  $ulogin_auth=true;
else
  $ulogin_auth=false;  

    $ulogin	= "";
	  $email	= "";
    $gift=isset($_POST["gift"])? intval ($_POST["gift"]) : 'null';
      $reg_bon=($gift==1||$gift=='null') && isset($conf['reg_bon']) ? floatval($conf['reg_bon'][0]) : 0;
      $reg_bon_wager=isset($conf['reg_bon']) ? floatval($conf['reg_bon'][1]) : 0;
      if($referal) { $ref_id = intval($referal); } else { $ref_id = 0; }
      $time	 = time();
      


if ($login)
  {
  $_SESSION['messages'][]=array('er',$lang['err_1']." ".$login);
  }
elseif($ulogin_auth)
  {
  
  $s = file_get_contents('http://ulogin.ru/token.php?token=' . $_POST['token'] . '&host=' . $_SERVER['HTTP_HOST']);
  $aUlogin_user = json_decode($s, true);

  $sql="select * from ulogin join users on (users.id=ulogin.user_id) where network='".$aUlogin_user['network']."' and uid='".$aUlogin_user['uid']."'";
  if ($user_row=$db->get_row($sql))
    {
    //                                
    $_SESSION['login']=$user_row['login'];
    header('location: /',true,302);
    die();
    }
  else
    {
    //                 IP
    if(isset($conf['reg_ip_check']) && $conf['reg_ip_check']>0)
      {
      $ip=getip();
      $ip_2=substr($ip,0,strpos($ip, '.',strpos($ip, '.')+1));
      $sql="select count(*) from users where status in(5,6) and ip like '".$ip_2."%'";
  
      $count=$db->get_one($sql);
      if($count>=$conf['reg_ip_check'])
        {
        $_SESSION['messages'][]=array('er',$lang['err_no_reg_ip']);
        header('location: /',true,302);
        die();
        }
      }
    
    $socUserPrefix=isset($conf['soc_user_prefix'])? $conf['soc_user_prefix']: 'ulogin';
  
    //$sql="select max(login) from users where login like '".$socUserPrefix."\_%'";
    $sql="select max(cast(substring(login,".(strlen($socUserPrefix)+2).") AS UNSIGNED))  from users where login like '".$socUserPrefix."\_%'";
    
    if($user_num=$db->get_one($sql))
      {
      $user_num=$user_num+1;
      }
    else
      $user_num=1;

    
    //$payed_spin=$conf['payed_spins_fixed']? $conf['payed_spins_val']: $conf['spin_koef']*$bonus;
      $payed_spin=$conf['payed_spins_val'];
        
    //                                 
    $sql="insert into users (login, go_time, ip, os, useragent,  ref_id, reg_time, balance, balance_bonus,wager,payed_spins,lang,gift) values ('".$socUserPrefix."_".$user_num."', ".$time.", '".getip()."', '".get_os()."', '".$useragent."', ".$ref_id.", ".$time.", $reg_bon, $reg_bon, $reg_bon*$reg_bon_wager,  $payed_spin, '".$language."',null)";
    $db->run($sql);
    $user_id=$db->insert_id;
    $sql="insert into ulogin values (null, $user_id, '".$aUlogin_user['network']."' ,'".$aUlogin_user['uid']."')";
    $db->run($sql);
    
    //                                 
    if($user_id)
    $db->run("insert into bonus_user select null,id,$user_id,if(start_date>curdate(),concat(start_date, ' ',ifnull(start_time,'00:00')),if(start_time is null, now(), concat(date(now()),' ',start_time))),'0',null,0,0 from bonus where ((`type`<>'nondep' and users in (0,2))|| (`type`='nondep' and num_deposit=0 )) and(ifnull(is_loop,0)=0 or (is_loop=1 and dayofweek(start_date)=dayofweek(curdate()))) and end_date>=curdate() and is_reg=0");
    
    $_SESSION['login']=$socUserPrefix."_".$user_num;
    header('location: /',true,302);
    die();
    
    } 
  }  
else
  {
  
    //                 IP
    if(isset($conf['reg_ip_check']) && $conf['reg_ip_check']>0)
      {
      $ip=getip();
      $ip_2=substr($ip,0,strpos($ip, '.',strpos($ip, '.')+1));
      $sql="select count(*) from users where status=5 and ip like '".$ip_2."%'";
  
      $count=mysql_result(mysql_query($sql),0);
      if($count>=$conf['reg_ip_check'])
        {
        $_SESSION['messages'][]=array('er',$lang['err_no_reg_ip']);
        header('location: /',true,302);
        die();
        }
      }

  
  if(isset($_GET['action']) && $_GET['action'] == "save") {
		$referer= str_replace('http://','',$_SERVER['HTTP_REFERER']);
    $referer= str_replace('/','',$referer);
    $referer= str_replace(':85','',$referer);
    $domen=get_domen();
     
    $ulogin	= isset($_POST['ulogin'])? mysql_real_escape_string ($_POST['ulogin']) : false;
	$pass	= isset($_POST['pass'])? mysql_real_escape_string ($_POST['pass']) : false;
	$repass	= isset($_POST['repass'])? mysql_real_escape_string ($_POST['repass']) : ($referer==$domen ? $pass: false);
	$email	= isset($_POST['email'])? mysql_real_escape_string ($_POST['email']) : false;
    $yes    = isset($_POST["yes"])? intval ($_POST["yes"]) : false;
    $bot_login_a=isset($conf['botstat_logins'])? explode(',',$conf['botstat_logins']): array();
    $sid=session_id();
    
    
		if(((!$ulogin || !$pass || !$repass || !$email) && !isset($_SESSION['uLogin'])) ||(!$email && isset($_SESSION['uLogin']))) {
			$_SESSION['messages'][]=array('er',$lang['err_all_input']);
		} elseif(strlen($ulogin) > 20 || strlen($ulogin) < 3 && !isset($_SESSION['uLogin'])) {
			$_SESSION['messages'][]=array('er',$lang['err_login_3_20']);
		} elseif(!$yes) {
			$_SESSION['messages'][]=array('er',$lang['err_rules']);
		} elseif($pass != $repass && !isset($_SESSION['uLogin'])) {
			$_SESSION['messages'][]=array('er',$lang['err_pass2']);
		} elseif(strlen($email) > 30) {
			$_SESSION['messages'][]=array('er',$lang['err_mail_30']);
		} elseif($conf['use_captcha'] && !recaptcha_check($_POST['g-recaptcha-response'])) {
			$_SESSION['messages'][]=array('er',$lang['err_captcha']);
		} elseif($conf['use_captcha'] && isset($resp) && !$resp->is_valid) {
		  	$_SESSION['messages'][]=array('er',$lang['err_captcha']);
        } elseif(!preg_match("/^[a-z0-9_.-]{1,20}@(([a-z0-9-]+\.)+(pro|com|net|org|mil|edu|gov|arpa|info|biz|[a-z]{2})|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})$/is", $email)) {
			$_SESSION['messages'][]=array('er',$lang['err_mail_preg_match']);
		} elseif(mysql_num_rows(mysql_query("SELECT login FROM users WHERE login = '".$ulogin."'"))) {
			$_SESSION['messages'][]=array('er',$lang['err_login_duble']);
		} elseif(in_array($ulogin,$bot_login_a)) {
			$_SESSION['messages'][]=array('er',$lang['err_login_duble']);
		} elseif(mysql_num_rows(mysql_query("SELECT email FROM users WHERE email = '".$email."'"))) {
			$_SESSION['messages'][]=array('er',$lang['err_mail_duble']);
		} else {
			
			$pass	 = !isset($_SESSION['uLogin']) ? as_md5($key, $pass) : "";
			
      if(isset($_SESSION['uLogin']))
        {  
        $socUserPrefix=isset($conf['soc_user_prefix'])? $conf['soc_user_prefix']: 'ulogin';
  
        $sql="select max(login) from users where login like '".$socUserPrefix."\_%'";
        $res=mysql_query($sql);
        if($res && mysql_num_rows($res)==1)
          {
          $user_num=mysql_result($res,0);
          $user_num=str_replace(strtolower($socUserPrefix).'_','',strtolower($user_num));
          $user_num++;
          }
        else
          $user_num=1;  
        
        $ulogin=$socUserPrefix."_".$user_num;
        }

    //$payed_spin=$conf['payed_spins_fixed']? $conf['payed_spins_val']: $conf['spin_koef']*$bonus;
      $payed_spin=$conf['payed_spins_val'];
    
    $sql = "INSERT INTO users (login, pass, email, go_time, ip, os, useragent, ref_id, reg_time, balance, balance_bonus, wager, payed_spins, gift) VALUES ('".$ulogin."', '".$pass."', '".$email."', ".$time.", '".getip()."', '".get_os()."', '".$useragent."', ".$ref_id.", ".$time.", $reg_bon, $reg_bon, $reg_bon_wager*$reg_bon, $payed_spin, $gift)";
		
    if (!mysql_query($sql)) 
			
        $_SESSION['messages'][]=array('er',$lang['err_db'] .mysql_error());
		
			else
        {
        $add_user_id=mysql_insert_id();
        if($reg_bon>0)
          {
          save_stat_pay($reg_bon,$ulogin,2,'reg_bon',$inv_code);
          //save_log("save_stat_pay($reg_bon,$ulogin,2,'reg_bon',$inv_code)","reg_bon.log");
          if($ref_id)
            {
            $reg_bon_ref=isset($conf['reg_bon_ref']) ? floatval($conf['reg_bon_ref'][0]) : 0;
            $reg_bon_ref_wager=isset($conf['reg_bon_ref']) ? floatval($conf['reg_bon_ref'][1]) : 0;
            $sql="update users set balance=balance+".$reg_bon_ref.", wager=wager+$reg_bon_ref_wager*$reg_bon_ref, payed_spins=$payed_spin where id=".$ref_id;
            if (mysql_query($sql))
              {
              save_stat_pay($reg_bon_ref,'id:'.$ref_id,2,'reg_bon_ref',$inv_code);
              }
            }
          }  
        }
		}
		if (!isset ($_SESSION['messages']))
    {

    $_SESSION['login']=$ulogin;
    
    user_mail(1,$add_user_id,array('login'=>$ulogin,'password'=>$repass));
    send_sms(1,array('login'=>$ulogin));
    header('location: /',true,302);
    die();
    }
    else 
      $templ_name='index.tpl';
   }
   
 /* header('location: /',true,302);
    die();*/
  
  }

    $templ_name='registration.tpl'; 
    //var_dump(THEME_DIR."/".$templ_name);
    //die();
    if(file_exists(THEME_DIR."/".$templ_name))
      {
      $smarty->assign('ulogin_auth',$ulogin_auth);
      $smarty->assign('ulogin',$ulogin);
      $smarty->assign('email',$email);
      }
    else
      {
      header('location: /',true,302);
      die();  
      }  
    
?>