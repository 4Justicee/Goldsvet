<?php
include ('../cfg.php');
include ('../ini.php');                           

$action=isset($_REQUEST['action'])? $_REQUEST['action']: 'get';

//                                             
$alloy_action=array("register",                //                                       
                    "auth",
                    "get_balance",
                    "remind",
                    "edit",
                    "change_pass",
                    "set_gift",
                    "exit");
                    
if(!in_array($action,$alloy_action))
  {
  $answer['success']=false;
  $answer['error']=$lang['err_2'];
  }
elseif($action=="set_gift")
  {
  $gift=isset($_REQUEST['gift'])? intval($_REQUEST['gift']): false;
  
  if(!$gift)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_3'];
    }
  elseif ($gift>3 ||$gift<0)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_4'];
    }
  else
    {
    $db->run("update users set gift=$gift where id=$user_id");
    $db->run("insert into bonus_user values (null,$gift,$user_id,now(),'0',null,0,0)");
    $answer['success']=true;
    }  
  
  }
elseif($action=="register")
  {
  //                                               
  unset($_SESSION['login']);
  
  $mail=isset($_REQUEST['email'])? $_REQUEST['email']: false;
  $pass=isset($_REQUEST['pass'])? $_REQUEST['pass']: false;
  $gift=isset($_REQUEST['gift'])? intval($_REQUEST['gift']): false;
  $yes=isset($_REQUEST['yes'])? $_REQUEST['yes']: false;
  $ref= isset($_REQUEST['ref'])? intval($_REQUEST['ref']) : false;
  
  $answer=array();
  $answer['success']=true;
  if(!$mail)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_5'];
    }
  elseif(!preg_match('/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i',$mail))
    {
    $answer['success']=false;
    $answer['error']=$lang['err_6'];
    }  
  elseif($db->get_one("select count(*) from users where email='$mail'")>0)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_7'];
    }  
  elseif(!$pass) 
    {
    $answer['success']=false;
    $answer['error']=$lang['err_8'];
    }
  elseif(!$gift) 
    {
    $answer['success']=false;
    $answer['error']=$lang['err_9'];
    }  
  elseif(!$yes) 
    {
    $answer['success']=false;
    $answer['error']=$lang['err_10'];
    }  
  else
    {
    $pass=as_md5($key,$pass);
    $login=$login_base=substr($mail,0,strpos($mail,'@'));
    $counter=1;
    while($db->get_one("select count(*) from users where login='$login'")>0){
      $login=$login_base."_".$counter++;
    };
    $sql="insert into users (login,pass,email,gift,reg_time,ip";
    if($ref)
      $sql.=",ref_id";
    $sql.=") values('$login','$pass','$mail','$gift','".time()."','$ip'";
    if($ref)
      $sql.=",'$ref'";
    $sql.=")";
    $db->run($sql);
    
    $user_id=$db->insert_id;
    //                                            
    $db->run("insert into bonus_user values (null,$gift,$user_id,now(),'0',null,0,0)");
    
    //                                 
    $db->run("insert into bonus_user select null,id,$user_id,if(start_date>curdate(),concat(start_date, ' ',ifnull(start_time,'00:00')),if(start_time is null, now(), concat(date(now()),' ',start_time))),'0',null,0,0 from bonus where ((`type`<>'nondep' and users in (0,2))|| (`type`='nondep' and num_deposit=0 )) and(ifnull(is_loop,0)=0 or (is_loop=1 and dayofweek(start_date)=dayofweek(curdate()))) and end_date>=curdate() and is_reg=0");
    
    $_SESSION['login']=$login;
    setcookie('new','1',0,"/");
    user_mail(1,$user_id,array('login'=>$login,'password'=>$_REQUEST['pass']));
    $answer['txt']="ok";
    }  
  }
elseif($action=="auth")
  {
  $mail=isset($_REQUEST['email'])? $_REQUEST['email']: false;
  $pass=isset($_REQUEST['pass'])? $_REQUEST['pass']: false;
  
  if(!$mail)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_5'];
    }
  elseif(!$pass)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_8'];
    }  
  elseif(!preg_match('/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i',$mail))
    {
    $answer['success']=false;
    $answer['error']=$lang['err_6'];
    }  
  elseif($user_row=$db->get_row("select * from users where email='$mail'"))
    {    
	if($user_row['pass']==as_md5($key,$pass))
      {
      $db->run("update users set ip='$ip' where email='$mail'");
      $answer['success']=true;
      $_SESSION['login']=$user_row['login'];
      $_SESSION['email']=$mail;
      }
    else  
      {
      $answer['success']=false;
      $answer['error']=$lang['err_8'];
      }
    }  
  else
    {
    $answer['success']=false;
    $answer['error']=$lang['err_11'];
    }  
  
  }
elseif($action=='remind')
  {
  if(!$login)
    {
    $mail= isset($_REQUEST['email'])? $_REQUEST['email'] : false;
	
	  if(!$mail)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_5'];
    }
  elseif(!preg_match('/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i',$mail))
    {
    $answer['success']=false;
    $answer['error']=$lang['err_6'];
    }  
  elseif($user_row=$db->get_row("select * from users where email='$mail'"))
    {
         $case1	= 'on';
			   $case2	= 'on';
			   $case3	= 'on';
			   $case4	= 'on';
			   $num1	= 8;
			   $newpass = generator($case1, $case2, $case3, $case4, $num1);

			   $db->run("UPDATE users SET pass = '".as_md5($key, $newpass)."' WHERE email = '".$mail."' LIMIT 1");
			   if (!user_mail(2,$user_row['id'],array('ip'=>$_SERVER['REMOTE_ADDR'],'newpass'=>$newpass))) 
				  {
          $answer['success']=false;
          $answer['error']=$lang['err_28'];
          }
			   else
          {
          $answer['success']=true;
          }
    }  
  else
    {
    $answer['success']=false;
    $answer['error']=$lang['err_11'];
    }
    
    
    }
  else
    $err=$lang['err_12'];
  } 
elseif($action=="edit")
  {
  $profile=isset($_REQUEST['ProfileForm'])? $_REQUEST['ProfileForm'] : false;
  $sql="update users set ";
  if($profile['firstname'])
    $sql.="firstname='".$profile['firstname']."'";
  if($profile['lastname'])
    $sql.=",lastname='".$profile['lastname']."'";
  if($profile['birthday'])
    $sql.=",birthday='".$profile['birthday']."'";
    
    
  $sql.=" where login='$login'";
  if($db->run($sql));
  $answer['success']=true;
  } 
elseif($action=="change_pass")
  {
  if($login)
    {
  $old_pass=isset($_REQUEST['current_pass'])? $_REQUEST['current_pass'] : false;
  $pass=isset($_REQUEST['pass'])? $_REQUEST['pass'] : false;
  $re_pass=isset($_REQUEST['re_pass'])? $_REQUEST['re_pass'] : false;
  
  if(!$old_pass)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_13'];
    }
  elseif(!$pass)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_14'];
    }  
  elseif(!$re_pass)
    {
    $answer['success']=false;
    $answer['error']=$lang['err_15'];
    }  
  elseif($pass!=$re_pass) 
    {
    $answer['success']=false;
    $answer['error']=$lang['err_16'];
    }
  elseif(as_md5($key,$old_pass)!=$user_info['pass'])
    {
    $answer['success']=false;
    $answer['error']=$lang['err_17'];
    }  
  else
    {
    
    $new_pass=as_md5($key,$pass);
    if($db->run("update users set pass='$new_pass' where login='$login'"))
      $answer['success']=true;
    else
      {
      $answer['success']=false;
      $answer['error']=$lang['err_18'];
      }  
    }
    }
  else
    {
    $answer['success']=false;
    $answer['error']=$lang['err_19'];
    }    
  } 
elseif($action=="get_balance")
  {
  $answer['success']=true;
  $answer['balance']=$user_info['demomode']? $user_info['demobalance']: $user_info['balance'];
  $freespin=$db->get_one($sql="select count(*) from bonus  join bonus_user on (bonus_user.bonus_id=bonus.id) where status='1' and type='freespin' and user_id=$user_id");
  $answer['freespin']=$freespin;   
  }
  
  echo json_encode($answer); 

?>