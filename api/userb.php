<?php
include_once '../engine/cfg.php';
include_once '../engine/ini.php';


$action=isset($_REQUEST['action'])? $_REQUEST['action'] : false;
$log_in=isset($_REQUEST['login'])? $_REQUEST['login'] : false;


$alloy_action=array("register",
                    "edit",
                    "auth",
                    "exit",
                    "acc_info",
		    "jp_info",
		    "getjp",
                    "demomode_on",
                    "demomode_off",
                    "pay_history",
                    "remind",
                    "chlang");
if(!in_array($action,$alloy_action))
  {
  $err=$lang['api']['not_alloy_action'];
  }
else
  {  
if($action=="register")
  {
  //                        
  unset($_SESSION['login']);
  $u_name= isset($_REQUEST['uname'])? $_REQUEST['uname'] : false;
  $u_pass= isset($_REQUEST['upass'])? $_REQUEST['upass'] : false;
  $u_pass_k= isset($_REQUEST['upassk'])? $_REQUEST['upassk'] : false;
  $u_mail= isset($_REQUEST['umail'])? $_REQUEST['umail'] : false;
  $u_ref= isset($_REQUEST['ref'])? intval($_REQUEST['ref']) : false;
  $u_agree= isset($_REQUEST['agree'])? intval($_REQUEST['agree']) : false;
  
  $u_wmr= isset($_REQUEST['uwmr'])? $_REQUEST['uwmr'] : false;
  $u_phone= isset($_REQUEST['uphone'])? $_REQUEST['uphone'] : false;
  $u_card= isset($_REQUEST['ucard'])? $_REQUEST['ucard'] : false;
  $u_ym= isset($_REQUEST['uym'])? $_REQUEST['uym'] : false;
  $u_icq= isset($_REQUEST['uicq'])? $_REQUEST['uicq'] : false;
  
  $u_avatar=isset($_REQUEST['avatar_id'])? intval($_REQUEST['avatar_id']) : 1;
  
  
  if($u_name && $u_pass && $u_agree && $u_mail)
    {
    
    if(($u_pass==$u_pass_k)||$u_pass_k===false)
      {
      if($u_mail && preg_match('/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i',$u_mail))
        {
        if(@mysql_num_rows(mysql_query("SELECT login FROM users WHERE login = '".$u_name."'"))) 
          $err=$lang['no_login']; //"                               "; 
        elseif($u_mail && @mysql_num_rows(mysql_query("SELECT mail FROM users WHERE mail = '".$u_mail."'")))
          $err=$lang['no_email']; //"      email                    "; 
        elseif($u_wmr && !preg_match('/^R\d{12}$/i',$u_wmr))
          $err=$lang['not_wmr'];//"                        webmoney";
        elseif($u_ym && !preg_match('/^\d{14}$/i',$u_ym))
          $err=$lang['not_ym'];//"                        yandex";  
        elseif($u_card && !preg_match('/^(\d{16}|\d{18})$/i',$u_card))
          $err=$lang['not_card'];//"                           ";
        elseif($u_phone && !preg_match('/^\+?(\d{10}|\d{11}|\d{12})$/i',$u_phone))
          $err=$lang['not_phone'];//"                              ,                       +000000000000 ";
        elseif(!$u_agree)  
          $err=$lang['yes_rules_yes']; //"                                           ";
		    elseif(strlen($u_name) > 20 || strlen($u_name) < 3) {
			    $err=$lang['3-20'];
  		} elseif(strlen($u_mail) > 30) {
			    $err=$lang['30'];
  		} elseif(mysql_num_rows(mysql_query("SELECT login FROM users WHERE login = '".$u_name."'"))) {
			    $err=$lang['no_login'];
		  } elseif(mysql_num_rows(mysql_query("SELECT wmr FROM users WHERE wmr = '".$u_wmr."'"))&& $u_wmr) {
			    $err=$lang['no_wmr'];
		  } elseif(mysql_num_rows(mysql_query("SELECT mail FROM users WHERE mail = '".$u_mail."'"))) {
			    $err=$lang['no_email'];
		  } 
        else
          {
          $u_passMD=as_md5($key,$u_pass);
          $now=time();
          $ip=getip();
          
          
          $sql="insert into  users (login,pass, reg_time, go_time,ip,avatar";
          if($u_mail)
            $sql.=",mail";
          if($u_ref)
            $sql.=",ref_id";
          if($u_wmr)
            $sql.=",wmr";
          if($u_phone)
            $sql.=",phone";
          if($u_card)
            $sql.=",card";
          if($u_ym)
            $sql.=",ym";
          if($u_icq)
            $sql.=",icq";  
          $sql.= ") values ('$u_name','$u_passMD',$now,$now,'$ip',$u_avatar";
          if($u_mail)
            $sql.=",'$u_mail'";
          if($u_ref)
            $sql.=",$u_ref";
          if($u_wmr)
            $sql.=",'$u_wmr'"; 
          if($u_phone)
            $sql.=",'$u_phone'";
          if($u_card)
            $sql.=",'$u_card'"; 
          if($u_ym)
            $sql.=",'$u_ym'"; 
          if($u_icq)
            $sql.=",'$u_icq'";       
          $sql.=")";
          if(mysql_query($sql))
            {
              $_SESSION['login']=$u_name;
              $ip		= getip();
              $time	= time();
              $sql = "INSERT INTO logip (user_id, ip, date) VALUES (".mysql_insert_id().", '".$ip."', ".$time.")";
              mysql_query($sql);
              $answer['text']=1;
            }
          else
            {
            $err=$lang['db_error'];//"                                           ";
            save_log(date('Y-m-d H:i:s')." [".__FILE__."]\n ".$sql."\n".mysql_error(),"db_error.log");
            }  
          }  
        }
      else
        $err=$lang['not_email'];//"          email";  
      }
    else
      $err=$lang['pass_1_2'];//"                                           ";  
    }
  elseif(!$u_agree)
    $err=$lang['yes_rules_yes'];
  else
    $err=$lang['all_input'];//'                ';  
  }
if($action=="edit")
  {
  $ed_user_id=$user_id;
  $ed_user_mail=isset($_REQUEST['umail'])?$_REQUEST['umail']: false;
  $ed_user_pass=isset($_REQUEST['upass'])?$_REQUEST['upass']: false;
  $ed_user_passk=isset($_REQUEST['upassk'])?$_REQUEST['upassk']:false;
  $ed_avatar=isset($_REQUEST['avatar_id'])? intval($_REQUEST['avatar_id']) : false;
  $ed_wmr=isset($_REQUEST['uwmr'])? $_REQUEST['uwmr'] : false;
  $ed_phone=isset($_REQUEST['uphone'])? $_REQUEST['uphone'] : false;
  $ed_card=isset($_REQUEST['ucard'])? $_REQUEST['ucard'] : false;
  $ed_ym=isset($_REQUEST['uym'])? $_REQUEST['uym'] : false;
  $ed_icq= isset($_REQUEST['uicq'])? $_REQUEST['uicq'] : false;
  
  if($ed_user_id)
    {
    if($ed_user_pass!=$ed_user_passk)
      {
      $err=$lang['pass_1_2'];//"                                   ";
      }
    elseif($ed_user_mail && @mysql_num_rows(mysql_query("SELECT mail FROM users WHERE mail = '".$ed_user_mail."'")))
      $err=$lang['no_email'];//"      email                    "; 
    elseif($ed_wmr && !preg_match('/^R\d{12}$/i',$ed_wmr))
      $err=$lang['not_wmr'];//"                        webmoney";
    elseif($ed_ym && !preg_match('/^\d{14}$/i',$ed_ym))
      $err=$lang['not_ym'];//"                        yandex";  
    elseif($ed_card && !preg_match('/^(\d{16}|\d{18})$/i',$ed_card))
      $err=$lang['not_card'];//"                           ";
    elseif($ed_phone && !preg_match('/^\+?(\d{10}|\d{11}|\d{12})$/i',$ed_phone))
      $err=$lang['not_phone'];//"                              ,                       +000000000000 ";  
    else
      {
      $sql="update users set id=$ed_user_id";
      if($ed_user_mail)
        $sql.=", mail='$ed_user_mail' ";
      if($ed_user_pass)
        $sql.=" ,pass='".as_md5($key,$ed_user_pass)."'";
      if($ed_avatar)
        $sql.=" ,avatar=$ed_avatar";
      if($ed_wmr)
        $sql.=" ,wmr='$ed_wmr'";
      if($ed_phone)
        $sql.=" ,phone='$ed_phone'";
      if($ed_card)
        $sql.=" ,card='$ed_card'";
      if($ed_ym)
        $sql.=" ,ym='$ed_ym'";
      if($ed_icq)
        $sql.=" ,icq='$ed_icq'";    
      $sql.=" where id=$ed_user_id ";
      if(mysql_query($sql))
        $answer['text']='1';
      else  
        {
        $err=$lang['db_error'];//"                                   ";
        save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
        }
      }  
    }
  else
    $err=$lang['api']['no_acc'];//"                 ";
  
  }  
if($action=="auth")
  {
  //           
  unset($_SESSION['login']);
  $u_name= isset($_REQUEST['uname'])? $_REQUEST['uname'] : false;
  $u_pass= isset($_REQUEST['upass'])? $_REQUEST['upass'] : false;
  if($u_name && $u_pass)
    {
    //$sql="select pass from users where login='$u_name' limit 1";
    $sql= "SELECT users.id,users.balance,login, pass, users.status, go_time FROM users WHERE login = '".$u_name."' LIMIT 1";

    $res=mysql_query($sql);
    if($res)
      {
      if(mysql_num_rows($res)==1)
        {
        //list($DBpass)=mysql_fetch_row($res);
        $row=mysql_fetch_array($res);
          $DBpass=$row['pass'];
          if($DBpass==as_md5($key,$u_pass))
            {
            $_SESSION['login']=$u_name;
            $ip		= getip();
            $time	= time();
            $sql = "INSERT INTO logip (user_id, ip, date) VALUES (".$row['id'].", '".$ip."', ".$time.")";
            if(!mysql_query($sql))
              save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
            $answer['text']=1;
            }
          else
            $err=$lang['wrong_pass'];//"                       ";
        }
      else
        $err=$lang['not_login'];//"             $u_name                   ";  
      }
    else
      {
      $err=$lang['db_error'];//"                                   ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }  
    }
  elseif(!$u_name)
    $err=$lang['enter_login2'];
  elseif(!$u_pass)
    $err=$lang['wrong_pass'];  
  else  
    $err=$lang['api']['script_error'];//'                ';  
  }  
if ($action == "getjp"){
    //$jack_rows= get_jackpots();
	$sql= "select jackpots.* from jackpots ";
    			$res=mysql_query($sql);
    			if($res && mysql_num_rows($res))
      			//while($jack= mysql_fetch_array($res))
        		$jack_rows[]=$jack;
    foreach ($jack_rows as $k=>$jack_row)
      {
      echo $jack_row['balance'] . " " ;
      }
    
}
if($action=="exit")
  {
  //                
  unset($_SESSION['login']);
  if(isset($_SESSION['login']))
    $err=$lang['api']['cant_del_session'];//"                                        ";
  else
    $answer['text']=1;
  }
if ($action=="jp_info")
{
$u_name= isset($_REQUEST['uname'])? $_REQUEST['uname'] : false;
  $u_pass= isset($_REQUEST['upass'])? $_REQUEST['upass'] : false;
  if($u_name && $u_pass)
    {
    //$sql="select pass from users where login='$u_name' limit 1";
    $sql= "SELECT users.id,users.balance,login, pass, users.status, go_time FROM users WHERE login = '".$u_name."' LIMIT 1";

    $res=mysql_query($sql);
    if($res)
      {
      if(mysql_num_rows($res)==1)
        {
        //list($DBpass)=mysql_fetch_row($res);
        $row=mysql_fetch_array($res);
          $DBpass=$row['pass'];
          if($DBpass==as_md5($key,$u_pass))
            {
		    $sql= "select jackpots.* from jackpots ";
    			$res=mysql_query($sql);
    			if($res && mysql_num_rows($res))
      			while($jack= mysql_fetch_array($res))
        		$jack_rows[]=$jack;
			foreach ($jack_rows as $k=>$jack_row)
      {
      $answer['jack'.$k]=sprintf("%01.2f",$jack_row['balance']);
      }
		//echo $row['balance'];
            $_SESSION['login']=$u_name;
            $ip		= getip();
            $time	= time();
            $sql = "INSERT INTO logip (user_id, ip, date) VALUES (".$row['id'].", '".$ip."', ".$time.")";
            if(!mysql_query($sql))
              save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
            $answer['text']=1;
            }
          }
	}
      }
      return;
  //$answer['user_id']=$user_id;  
  //$answer['login']=$login;
  //$answer['email']=$user_info['mail'];
  $answer['balance']=$balance;
  $answer['balance_real']=$balance_real;
  //$answer['balance_bonus']=$balance_bonus;
  //$answer['balance_demo']=$demo_balance;
  
  //$answer['demo_mode']=$demomode;
  //answer['denomination']=$denomination;
  //$answer['avatar_id']=$avatar_id;
  
  //$answer['wmr']=$uwmr;
  //$answer['icq']=$icq;
  //$answer['phone']=$phone;
  //$answer['card']=$card;
  //$answer['ym']=$user_info['ym'];
  
  //foreach($jackpots as $k=>$v)
   // $answer['jack'.$k]=$v;

  }
if ($action=="acc_info")
{
$u_name= isset($_REQUEST['uname'])? $_REQUEST['uname'] : false;
  $u_pass= isset($_REQUEST['upass'])? $_REQUEST['upass'] : false;
  if($u_name && $u_pass)
    {
    //$sql="select pass from users where login='$u_name' limit 1";
    $sql= "SELECT users.id,users.balance,login, pass, users.status, go_time FROM users WHERE login = '".$u_name."' LIMIT 1";

    $res=mysql_query($sql);
    if($res)
      {
      if(mysql_num_rows($res)==1)
        {
        //list($DBpass)=mysql_fetch_row($res);
        $row=mysql_fetch_array($res);
          $DBpass=$row['pass'];
          if($DBpass==as_md5($key,$u_pass))
            {
		
		echo $row['balance'];
            $_SESSION['login']=$u_name;
            $ip		= getip();
            $time	= time();
            $sql = "INSERT INTO logip (user_id, ip, date) VALUES (".$row['id'].", '".$ip."', ".$time.")";
            if(!mysql_query($sql))
              save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
            $answer['text']=1;
            }
          }
	}
      }
      return;
  //$answer['user_id']=$user_id;  
  //$answer['login']=$login;
  //$answer['email']=$user_info['mail'];
  $answer['balance']=$balance;
  $answer['balance_real']=$balance_real;
  //$answer['balance_bonus']=$balance_bonus;
  //$answer['balance_demo']=$demo_balance;
  
  //$answer['demo_mode']=$demomode;
  //answer['denomination']=$denomination;
  //$answer['avatar_id']=$avatar_id;
  
  //$answer['wmr']=$uwmr;
  //$answer['icq']=$icq;
  //$answer['phone']=$phone;
  //$answer['card']=$card;
  //$answer['ym']=$user_info['ym'];
  
  //foreach($jackpots as $k=>$v)
   // $answer['jack'.$k]=$v;

  } 
if ($action=="demomode_on")
  {
  if($login)
    { 
    $sql="update users set demo_mode=1 where id=$user_id limit 1";
    $res=mysql_query($sql);
    
    if($res)
      {
      $answer['text']=1;
      }
    else
      {
      $err=$lang['db_error'];//"                                   ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }   
    }
  else
    $err=$lang['no_auth'];//"                  ";
  } 
if ($action=="demomode_off")
  {
  if($login)
    { 
    $sql="update users set demo_mode=0 where id=$user_id limit 1";
    $res=mysql_query($sql);
    
    if($res)
      {
      $answer['text']=1;
      }
    else
      {
      $err=$lang['db_error'];//"                                   ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }   
    }
  else
    $err=$lang['no_auth'];//"                  ";
  } 
if ($action=="pay_history")
  {
  if($login)
    {
    //           
    $answer['payin']='';
    $sql="select * from enter where login='$login' and `sum`>0 and status=2";
    $res=mysql_query($sql);
    
    if($res)
      {
      if(mysql_num_rows($res)>0)
        {
        while($row=mysql_fetch_array($res))
          {
          $answer['payin'].="\n<order_".$row['id']."><date>".date("Y-m-d H:i:s",$row['date'])."</date><sum>".$row['sum']."</sum><status>".$row['paysys']."</status></order_".$row['id'].">";
          }
        }
      }
    else
      {
      $err=$lang['db_error'];//"                                   ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      } 
      
    //         
    $answer['payout']=''; 
    $sql="select * from enter where login='$login' and `sum`<0 and status=2";
    $res=mysql_query($sql);
    
    if($res)
      {
      if(mysql_num_rows($res)>0)
        {
        while($row=mysql_fetch_array($res))
          {
          $answer['payout'].="\n<order_".$row['id']."><date>".date("Y-m-d H:i:s",$row['date'])."</date><sum>".$row['sum']."</sum><status>".$row['paysys']."</status></order_".$row['id'].">";
          }
        }
      }
    else
      {
      $err=$lang['db_error'];//"                                   ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }     
    
    //           
    $answer['auth']=''; 
    $sql	= 'SELECT * FROM logip WHERE user_id = '.$user_id.' ORDER by id DESC LIMIT 30';
	  $res=mysql_query($sql);
    
    if($res)
      {
      if(mysql_num_rows($res)>0)
        {
        while($row=mysql_fetch_array($res))
          {
          $answer['auth'].="\n<order_".$row['id']."><date>".date("Y-m-d H:i:s",$row['date'])."</date><ip>".$row['ip']."</ip></order_".$row['id'].">";
          }
        }
      }
    else
      {
      $err=$lang['db_error'];//"                                   ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }   
      
      
      
       
    }
  else
    $err=$lang['no_auth'];//"                  ";
  }  
if ($action=="remind")
  {
  if(!$login)
    {
    $u_mail= isset($_REQUEST['email'])? $_REQUEST['email'] : false;
    $u_name= isset($_REQUEST['uname'])? $_REQUEST['uname'] : false;
	
	  $change_pass=false;
	
	  if($u_mail ||$u_name)
	   {
	   if($u_mail && !preg_match('/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i',$u_mail))
       {
       $err=$lang['preg_match'];//"                 email";
       }
     elseif($u_mail)
       {//            ,                                                 
       $r_res=mysql_query("select login from users where mail='$u_mail'");
       if(mysql_num_rows($r_res)==1)
          {
          $uname_db=mysql_result($r_res,0);
          if($u_name)
            {
            if($u_name==$uname_db)
              $change_pass=true;
            else
              $err=$lang['not_login'];//"               ";  
            }
          else
            {
            $u_name=$uname_db;
            $change_pass=true;
            }  
          }
       else
        $err=$lang['no_email2'];//"email $u_mail          ";   
       } 
     elseif($u_name)
       {//       login,                                                 
       $r_res=mysql_query("select mail from users where login='$u_name'");
       if(mysql_num_rows($r_res)==1)
          {
          $u_mail=mysql_result($r_res,0);
          $change_pass=true;
          }
       else
        $err=$lang['not_login'];//"      $u_name          ";   
       } 
       
       if($change_pass)
         {
         $case1	= 'on';
			   $case2	= 'on';
			   $case3	= 'on';
			   $case4	= 'on';
			   $num1	= 8;

			   $newpass = generator($case1, $case2, $case3, $case4, $num1);

         $subject = '                       ';
         $text='          {%username%},

<br><br>                                                  {%username%}
<br><br>            : {%newpass%}

<br><br>IP                 : {%ip%}

<br><br><br>           ,                       {%URL%}';
          //                           
          $text= str_replace('{%username%}',$u_name, $text);
          $text= str_replace('{%ip%}',$_SERVER['REMOTE_ADDR'], $text);
          $text= str_replace('{%newpass%}',$newpass, $text);
		      $text= str_replace('{%URL%}',$cfgURL, $text);
			
			   $headers = "From: ".$adminmail."\n";
			   $headers .= "Reply-to: ".$adminmail."\n";
			   $headers .= "X-Sender: < http://".$cfgURL." >\n";
			   $headers .= "Content-Type: text/html; charset=windows-1251\n";

			   mysql_query("UPDATE users SET pass = '".as_md5($key, $newpass)."' WHERE login = '".$u_name."' LIMIT 1");
			   if (@!mail($u_mail,$subject,$text,$headers)) 
				  $err=$lang['mailserver_error'];//"                          ,                   -       ";
			   else
          $answer['text']=$lang['send_newpass'];//"       email                                  ";  
         }   
     }
    else
     {
     $err=$lang['need_login_or_mail'];//"                                email                     ";
     } 
    }
  else
    $err=$lang['in_auth'];//"                                                                        ";
  }
if ($action=="chlang")
  {
  $new_lang= isset($_REQUEST['lang'])? $_REQUEST['lang'] : false;
    if(!$new_lang)
      {
      $err=$lang['api']['no_lang'];//"              ";
      }
    elseif ($new_lang=="ru" || $new_lang=="en")
      {
      $language=$new_lang;
      setcookie ('lang',$language,0,'/');
      echo $language; 
      include ('../engine/lang/'.$language.'.php');
      $answer['text']=$lang['api']['lang_changed'];//"            ";
      }  
    else
      {
      $err=$lang['api']['err_lang'];//"                                      ";
      }  
  }     
  }  

include('ender.php');
?>