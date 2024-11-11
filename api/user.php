<?php
include_once '../engine/cfg.php';
include_once '../engine/ini.php';

//header ("Access-Control-Allow-Origin: *");

$action=isset($_REQUEST['action'])? $_REQUEST['action'] : false;

//                                             
$alloy_action=array("register",                //                                       
                    "edit",                    //                            
                    "auth",
                    "exit",
                    "acc_info",
                    "demomode_on",
                    "demomode_off",
                    "pay_history",
                    "remind",
                    "chlang",
                    "activate");
if(!in_array($action,$alloy_action))
  {
  $err="                                                                                ";
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
  
  $u_avatar=isset($_REQUEST['avatar_id'])? intval($_REQUEST['avatar_id']) : 1;
  
  $u_room=mysql_result(mysql_query("select id from rooms limit 1"),0); //                                                                               
  
  if($u_name && $u_pass && $u_agree)
    {
    if($u_pass_k && ($u_pass==$u_pass_k)||!$u_pass_k)
      {
      if(!$u_mail|| ($u_mail && preg_match('/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i',$u_mail)))
        {
        if(@mysql_num_rows(mysql_query("SELECT login FROM users WHERE login = '".$u_name."'"))) 
          $err="                                                           "; 
        elseif($u_mail && @mysql_num_rows(mysql_query("SELECT email FROM users WHERE email = '".$u_mail."'")))
          $err="           email                                      "; 
        elseif(@!mysql_num_rows(mysql_query("SELECT * FROM rooms WHERE id = '".$u_room."'")))
          $err="                                     ID=$u_room";   
        elseif($u_wmr && !preg_match('/^R\d{12}$/i',$u_wmr))
          $err="                                            webmoney";
        elseif($u_ym && !preg_match('/^\d{14}$/i',$u_ym))
          $err="                                            yandex";  
        elseif($u_card && !preg_match('/^(\d{16}|\d{18})$/i',$u_card))
          $err="                                                  ";
        elseif($u_phone && !preg_match('/^\+?(\d{10}|\d{11}|\d{12})$/i',$u_phone))
          $err="                                                        ,                                         +000000000000 ";
        elseif(!$u_agree)  
          $err="                                                                                ";
        else
          {
          $u_passMD=as_md5($key,$u_pass);
          $now=time();
          
          
          
          $sql="insert into  users (login,pass, reg_time, go_time,ip,status,creator,room_id";
          if($u_mail)
            $sql.=",email";
          if($u_ref)
            $sql.=",ref_id";
          if($u_wmr)
            $sql.=",wmr";
          if($u_phone)
            $sql.=",qiwi";
          if($u_card)
            $sql.=",card";
          if($u_ym)
            $sql.=",ym";
          $sql.= ") values ('$u_name','$u_passMD',$now,$now,'$ip','5',(select max(t1.id)+1 from users t1),$u_room";
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
          $sql.=")";
          if(mysql_query($sql))
            {
             $answer['text']='1';
            }
          else
            {
            $err="                                                                                ";
            save_log(date('Y-m-d H:i:s')." [".__FILE__."]\n ".$sql."\n".mysql_error(),"db_error.log");
            }  
          }  
        }
      else
        $err="                  email";  
      }
    else
      $err="                                                                                 ";  
    }
  else
    $err='                              ';  
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
  $ed_lang=isset($_REQUEST['language'])? $_REQUEST['language']: false;
  $ed_denomination=isset($_REQUEST['denomination']) ? floatval($_REQUEST['denomination']): 1;
    
  
  if($ed_user_id)
    {
    if($ed_user_pass!=$ed_user_passk)
      {
      $err="                                                                  ";
      }
    elseif($ed_user_mail && @mysql_num_rows(mysql_query("SELECT email FROM users WHERE email = '".$ed_user_mail."'")))
      $err="           email                                      "; 
    elseif($ed_wmr && !preg_match('/^R\d{12}$/i',$ed_wmr))
      $err="                                            webmoney";
    elseif($ed_ym && !preg_match('/^\d{14}$/i',$ed_ym))
      $err="                                            yandex";  
    elseif($ed_card && !preg_match('/^(\d{16}|\d{18})$/i',$ed_card))
      $err="                                                  ";
    elseif($ed_phone && !preg_match('/^\+?(\d{10}|\d{11}|\d{12})$/i',$ed_phone))
      $err="                                                        ,                                         +000000000000 ";  
    elseif($ed_lang && !in_array($_REQUEST['language'],$available_langs))
      $err="                                                                         ";  
    else
      {
      setcookie('lang','',time()-3600,'/');
      $sql="update users set id=$ed_user_id";
      if($ed_user_mail)
        $sql.=", email='$ed_user_mail' ";
      if($ed_user_pass)
        $sql.=" ,pass='".as_md5($key,$ed_user_pass)."'";
      if($ed_avatar)
        $sql.=" ,avatar_id=$ed_avatar";
      if($ed_wmr)
        $sql.=" ,wmr='$ed_wmr'";
      if($ed_phone)
        $sql.=" ,phone='$ed_phone'";
      if($ed_card)
        $sql.=" ,card='$ed_card'";
      if($ed_ym)
        $sql.=" ,ym='$ed_ym'";
      if($ed_lang)    
        $sql.=" ,lang='$ed_lang'";
      if($ed_denomination)    
        $sql.=" ,denomination='$ed_denomination'";
      $sql.=" where id=$ed_user_id and status=5";
      
      if(mysql_query($sql))
        $answer['text']='1';
      else  
        {
        $err="                                                                 ";
        save_log(date('Y-m-d H:i:s')." [".__FILE__."]\n ".$sql."\n".mysql_error(),"db_error.log");
        }
      }  
    }
  else
    $err="                                ";
  
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
    $sql= "SELECT users.id,users.balance,login, pass, users.status, action, deny_multilogin, go_time FROM users left join rooms on (users.room_id=rooms.id) WHERE login = '".$u_name."' LIMIT 1";

    $res=mysql_query($sql);
    if($res)
      {
      if(mysql_num_rows($res)==1)
        {
        //list($DBpass)=mysql_fetch_row($res);
        $row=mysql_fetch_array($res);
        if($row['deny_multilogin']&& ($row['action']==1 ||$row['action']==2) && ($row['go_time']+LOGOUT_TIMEOUT)>time())
          {
          $login = '';
	        $err="                                                   ";
          }
        else
          {
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
            $err="                                           ";
          }   
        }
      else
        $err="                         $u_name                                    ";  
      }
    else
      {
      $err="                                                                 ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }  
    }
  else
    $err='                              ';  
  }  
if($action=="exit")
  {
  $u_name= isset($_REQUEST['uname'])? $_REQUEST['uname'] : $_SESSION['login'];
  $sql= "UPDATE users SET action=0 WHERE login = '".$u_name."' and action not in(3,4) LIMIT 1";
  mysql_query( $sql)or save_log($sql."/r/n".mysql_error(),'db_error.log');
  //                              
  unset($_SESSION['login']);
  if(isset($_SESSION['login']))
    $err="                                                                            ";
  else
    $answer['text']=1;
  }
if ($action=="acc_info")
  {
  $u_name= isset($_REQUEST['id'])? $_REQUEST['id'] : false;
  if($u_name)
    {
    $sql= "update users set action=0 where action!=3 and go_time+".LOGOUT_TIMEOUT."<".time();
    mysql_query($sql);

    $sql="select * from users where login='$u_name' and action!=0";
    $res=mysql_query($sql);
    if(mysql_num_rows($res)==1)
      {
    $user_row=mysql_fetch_assoc($res);
    $answer['user_id']=$user_row['id'];  
    $answer['login']=$user_row['login'];
    $answer['email']=$user_row['email'];
	
	
		  $answer['balance']= floor_format( get_balance($user_id) );	
	
	
  
    $answer['balance_real']=$user_row['balance'];
    $answer['balance_bonus']=$user_row['balance_bonus'];
    $answer['demo_balance']=$user_row['demobalance'];
  
    $answer['demo_mode']=$demomode;
    $answer['denomination']=$user_row['denomination'];
    $answer['avatar_id']=$user_row['avatar_id'];
  
    $answer['wmr']=$user_row['wmr'];
    $answer['phone']=$user_row['qiwi'];
    $answer['card']=$user_row['card'];
    $answer['ym']=$user_row['ym'];
      }
    else
      $err="                                          ";  
    }
  elseif($login)
    {
  $answer['user_id']=$user_id;  
  $answer['login']=$login;
  $answer['email']=$user_info['email'];
   $answer['balance']= floor_format( get_balance($user_id) );	
  $answer['balance_real']=$real_balance;
  $answer['balance_bonus']=$balance_bonus;
  $answer['demo_balance']=$demo_balance;
  
  $answer['demo_mode']=$user_demomode;
  $answer['denomination']=$user_denomination;
  $answer['avatar_id']=$avatar_id;
  
  $answer['wmr']=$wmr;
  $answer['phone']=$phone;
  $answer['card']=$card;
  $answer['ym']=$user_info['ym'];
  
  foreach($jackpots as $k=>$v)
    $answer['jack'.$k]=$v;
    }
  else
    $err="                                  ";
  } 
if ($action=="demomode_on")
  {
  if($login)
    { 
    $sql="update users set demomode=1 where id=$user_id limit 1";
    $res=mysql_query($sql);
    
    if($res)
      {
      $answer['text']=1;
      }
    else
      {
      $err="                                                                 ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }   
    }
  else
    $err="                                  ";
  } 
if ($action=="demomode_off")
  {
  if($login)
    { 
    $sql="update users set demomode=0 where id=$user_id limit 1";
    $res=mysql_query($sql);
    
    if($res)
      {
      $answer['text']=1;
      }
    else
      {
      $err="                                                                 ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }   
    }
  else
    $err="                                  ";
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
      $err="                                                                 ";
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
      $err="                                                                 ";
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
      $err="                                                                 ";
      save_log(date('Y-m-d H:i:s')." [".__FILE__."]/n ".$sql."/n".mysql_error(),"db_error.log");
      }   
      
      
      
       
    }
  else
    $err="                                  ";
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
       $err="                               email";
       }
     elseif($u_mail)
       {//                       ,                                                                                          
       $r_res=mysql_query("select login from users where email='$u_mail'");
       if(mysql_num_rows($r_res)==1)
          {
          $uname_db=mysql_result($r_res,0);
          if($u_name)
            {
            if($u_name==$uname_db)
              $change_pass=true;
            else
              $err="                            ";  
            }
          else
            {
            $u_name=$uname_db;
            $change_pass=true;
            }  
          }
       else
        $err="email $u_mail                  ";   
       } 
     elseif($u_name)
       {//             login,                                                                                          
       $r_res=mysql_query("select email from users where login='$u_name'");
       if(mysql_num_rows($r_res)==1)
          {
          $u_mail=mysql_result($r_res,0);
          $change_pass=true;
          }
       else
        $err="           $u_name                  ";   
       } 
       
       if($change_pass)
         {
         $case1	= 'on';
			   $case2	= 'on';
			   $case3	= 'on';
			   $case4	= 'on';
			   $num1	= 8;

			   $newpass = generator($case1, $case2, $case3, $case4, $num1);

         $subject = '                                           ';
         $text='                   {%username%},

<br><br>                                                                                            {%username%}
<br><br>                       : {%newpass%}

<br><br>IP                                : {%ip%}

<br><br><br>                     ,                                           {%URL%}';
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
				  $err="                                                 ,                                  -              ";
			   else
          $answer['text']="            email                                                               ";  
         }   
     }
    else
     {
     $err="                                                           email                                       ";
     } 
    }
  else
    $err="                                                                                                                                       ";
  }   
if ($action=="chlang")
  {
  $user_lang=isset($_GET['lang'])&& in_array($_GET['lang'],$available_langs)? $_GET['lang']: false;
  if($user_lang)
    {
    if($login) //                                        ,                                         
      {
      $sql="update users set lang='$user_lang' where login='$login'";
      $res=mysql_query($sql) or $err="                  ".mysql_error();
      if(mysql_affected_rows()>0)
        {
        $answer['text']='                                      ';
        }
      else  
        $err="                                           ,                                 ($sql)";
      }
    else
      {
      setcookie('lang',$user_lang,time()+60*60*24*365,'/');
      $_COOKIE['lang']=$user_lang;
      $answer['text']='                                      ';
      }  
    }
  else
    $err="                                                                        ";
  }
elseif($action=='activate')
  {
  $code=isset($_REQUEST['code']) ? $db->prepare($_REQUEST['code']): false;
  if($code)
    {
    if($row =$db->get_row("select * from activate where code='".$code."'"))
      {
      $sql="update users set ";
      if($active_info['type']==1)
        $sql.=" mail_active_status=2 ";
      
      $sql.= " where id=".$row['user_id']; 
      if($db->run($sql))
         {$db->run("delete from activate where code='".$code."'");
         $answer['text']="OK";
         }  
      }
    else
      $err= "                                                       ";
    }
  }  
  
}
include('ender.php');
?>