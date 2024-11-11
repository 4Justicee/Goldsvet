<?php

require_once ('inc/functions.php');
require_once ('inc/smarty_libs/Smarty.class.php');
require_once ('inc/bonus_class.php');
//require_once 'inc/SocialAuther/autoload.php';

define ('ENGINE_GOLDSVET', 'TRUE');

$ip = getip();
$useragent = $_SERVER['HTTP_USER_AGENT'];
function get_os() {
$browser = $_SERVER['HTTP_USER_AGENT'];
if (strpos($browser,"Windows") !== FALSE) {
return "Windows";
}else if (strpos($browser,"Linux") !== FALSE) {
return "Linux";
}else if (strpos($browser,"FreeBSD") !== FALSE) {
return "FreeBSD";
}else if (strpos($browser,"NetBSD") !== FALSE) {
return "NetBSD";
}else if (strpos($browser,"OSX") !== FALSE) {
return "OSX";
}else if (strpos($browser,"iOS") !== FALSE) {
return "iOS";
}else if (strpos($browser,"Android") !== FALSE) {
return "Linux";
}
}

header("charset: UTF-8");  
$url = $_SERVER['SERVER_NAME'];
$url = str_replace( "www.", "", $url );
$url = str_replace( "https://", "", $url );

/*if(preg_match("`^(\S{2})\.(\S+)`",$url,$url_match))
  {
  if(in_array($url_match[1],$available_langs))
    {
    $url=$url_match[2];
    $language=$url_match[1];
    setcookie ('lang',$language,604800,'/');
    }
  }*/

$pkey = gen_key($url);
$key=$conf['lic_key']=$pkey;
  //                                                          
  $smarty = new Smarty;

  $smarty->debugging = false;
  $smarty->caching = false;

  $smarty->template_dir=array(THEME_DIR);
  $smarty->compile_dir = ENGINE_DIR.'/templates_c/';
  $smarty->config_dir = ENGINE_DIR.'/configs/';
  $smarty->cache_dir = ENGINE_DIR.'/cache/';
  
  //                             -          
  include ('inc/mail_class.php');
  $mail = new mail();
  $mail->type= intval($conf['mail_type']);
  
  if($mail->type===1)
    {
    $mail->smtp_host=$conf['mail_smtp_host'];
    $mail->smtp_port=$conf['mail_smtp_port'];
    $mail->smtp_user=$conf['mail_smtp_user'];
    $mail->smtp_pass=$conf['mail_smtp_pass'];
    }
  
  //                                                                        
  //$res=$mail->send('megawin24@mail..ru','subj','text');



$ref = isset($_GET['ref']) ? intval( $_GET['ref']): false;
if ( $ref )
{
	setcookie( "referal", $ref, time( ) + 2592000 );
}
$referal = isset($_COOKIE['referal']) ?intval( $_COOKIE['referal'] ): false;

if(strpos($_SERVER['PHP_SELF'],'adm'))
  $auth_token=isset($_REQUEST['token']) ? $_REQUEST['token'] : (isset($_SESSION['token'])?$_SESSION['token']: false);
else
  $auth_token=false;
  
if($auth_token)
  {
  $_SESSION['token']=$auth_token;
  //                                        ,                                                                                                
  $auth_serv=isset($conf['auth_serv'])? $conf['auth_serv']: 'http://login';
  $res=file_get_contents($auth_serv."/api/user.php?token=".$auth_token);
  $a_res=json_decode($res);
  if($a_res[0]='success')
    {
    $login=$_SESSION['login']=$a_res[1];
    }
  }

if ( !$login && isset($_COOKIE['GOLDSVET1']) )
{
	$get_user = mysql_query( "SELECT login, pass, mail FROM users WHERE id = ".intval( $_COOKIE['GOLDSVET1'] )." LIMIT 1" );
	$row = mysql_fetch_array( $get_user );
	$login = $row['login'];
	$pass = $row['pass'];
	$mail = $row['mail'];
	$user_pass = as_md5( $key, $pass.$key.$login );
	if ( $_COOKIE['GOLDSVET2'] == $user_pass )
	{    
		$_SESSION['login']=$login;
	}
	else
	{
		$login = "";
	}
} 
if ( $login )
{

	$get_user_info = mysql_query( "SELECT * FROM users WHERE login = '".$login."' LIMIT 1" );
	$user_info=$row = mysql_fetch_array( $get_user_info );
  if($user_info['action']==4)
    {
    $_SESSION['login']='';
    $_SESSION['messages'][]=array('er',"                                                 ");
    header("location: /");
    die();
    }
    
  if(isset($language) && $language!=$user_info['lang'])
    $db->run("update users set lang='$language' where id=".$row['id']);  
  
  $user_info['garant']=empty($user_info['garant'])? false : explode('|',$user_info['garant']);
  $user_info['garant_bonus']=empty($user_info['garant_bonus'])? false : explode('|',$user_info['garant_bonus']);
	$user_id = $row['id'];
	$login = $row['login'];
	$user_pass = $row['pass'];
	$user_room=$row['room_id'];
	$status = $row['status'];
	$user_denomination=$row ? $row['denomination'] : 1;
	$balance=sprintf("%01.2f", $row['balance']);
  $balance_bonus= sprintf("%01.2f", $row["balance_bonus"]);
  $real_balance= $row['balance'];
	$balance_denom=$real_balance/$user_denomination;
  $demo_balance=$row['demobalance']/$user_denomination;
  $demomode=$row['demomode'];
  
	$go_time=$row['go_time'];
	$user_action=$row['action'];
  $user_creator=$row['creator'];
	$ip_sql= " '$ip' ";
  
  $room=1; //                                                         
  
  //                                 
  $pay_mods_temp=array('pin','fk','trioApi');
  $pay_mods=array();

  foreach($pay_mods_temp as $ps)
    {
    if((isset($conf['use_'.$ps])&& $conf['use_'.$ps]) || (isset($conf[$ps.'_use'])&&$conf[$ps.'_use']))
      $pay_mods[]=$ps;
    }

	
  /*
  if($row['preset_id'])
    {
    $preset_row=mysql_fetch_assoc(mysql_query("select * from presets where id=".$row['preset_id']));
    $games=explode("|",$preset_row['games_ids']);
    $res=mysql_query("select g_id, g_name from game_settings where g_name in ('".implode("','",$games)."') and room_id=$user_room and g_view=1");
    while($row=mysql_fetch_assoc($res))
      {
      $user_games[$row['g_id']]=$row['g_name'];
      }
    $user_denomination=$preset_row['denomination'];  
    }
  */    
  
  if(isset($_REQUEST['action']))
    {
    if ($_REQUEST['action']=='set_denomination')
      {//                                                    
      $sql="UPDATE LOW_PRIORITY users set denomination=".floatval($_REQUEST['denomination'])." where login='$login'";
      mysql_query($sql) or save_log(date("Y-m-d H:i:s ").mysql_error()."[$sql]",'db_error.log');
      $user_denomination= floatval($_REQUEST['denomination']);
      }
    elseif($_REQUEST['action']=='collect')
      {
      if($conf['remote_auth'])
       {
       //                                                             ,                                                                                     
       //                                    
       $sql="INSERT LOW_PRIORITY INTO enter values (null,'$login',-$real_balance, ".time().",1,'ps_api',if((select is_return from rooms where id=$room),0,2))";
       if(!mysql_query($sql))
        {echo $sql.mysql_error();
          exit;
        }
       else
        {
        $pay_id=mysql_insert_id();
        //                                                                                  
        $ps->change_balance($ps_sid,$real_balance/$ps_acc['rate']);
        $ps_error=str_replace('The requested URL returned error: ', '', $ps->error);
    
        if($ps_error ||$ps_acc===null)
          {
          //                                                        -      
          save_log($ps_error,'ps_api-change_balance.err');
          $_SESSION['msg']="<p class='er'>                                                                             [$ps_error]</p>";
          }
        else
          {
          $sys="ps_api";
          //                                                                    ,                                                         
          if (pay($pay_id))
            {$_SESSION['msg']="<p class='erok'>                                                     </p>";
            header('location: '.$baseurl);
            die();
            }
          else
            $_SESSION['msg']="<p class='er'>                                                        [ID               : $pay_id]</p>";  
          }
        }     
       }
      else
       { 
       if(isset($conf['collect_deny']) && $conf['collect_deny'])
        {
        //"                  "                                   
        $sql="UPDATE LOW_PRIORITY users set action=3 where login='$login' and balance>0";
        if (mysql_query($sql))
          {
          if(mysql_affected_rows()>0)
            $_SESSION['msg']="                                                                  ,                                       ";
          header("location: ".$baseurl);
          die();
          }
        }
       else
        {
        $error_collect=true;
        
        }
       }   
      }  
    }
    
	//                         
  $jack_rows= get_jackpots($room);
  foreach ($jack_rows as $jack_row)
    {
    $jackpots[]=sprintf("%01.2f",$jack_row['balance']);
    }
  
  
        
	/*$user_action 
  0-                
  1-                                 
  2-            
  3 -                   
  4 -                         
  */
  
 // var_dump (preg_match('~\/games\/.+\/(.+)(\/real|\/demo)~i',$_SERVER['REQUEST_URI'],$matches));
 // die($_SERVER['REQUEST_URI']);
  
	if (preg_match('/^g_(\S+)/', $ge,$matches)||preg_match('~(.*\/games\/.+\/)(.+)(/ge_server.php)~i',$_SERVER['PHP_SELF'],$matches1)&& (isset($_REQUEST['action'])&& $_REQUEST['action']!='state') )
	 {
   if ($user_action==3&& $status!=1)
    {
    $_SESSION['msg']="                                                                  ,                                       ";
    header("location: ".$baseurl);
    die();
    } 
   elseif($user_action==4&& $status!=1)
    {
    $_SESSION['msg']="                                       ,                                                     ";
    header("location: ".$baseurl);
    die();
    }  
   
    $game_name= isset($matches[1])? $matches[1]: $matches1[2];
    
   //                 u                 
   
   $sql="select garant_win,garant_bon from garant where gr_id=(select distinct gr_id from game_settings where g_name ='$game_name') and room_id=$room ";
   $res=mysql_query($sql);
   if($res && mysql_num_rows($res)>0)
    {
    list($gr_garant_win,$gr_garant_bon)=mysql_fetch_row($res);
    if(!empty($gr_garant_win)) $conf['garant_win_opt']= $gr_garant_win;
    if(!empty($gr_garant_bon)) $conf['garant_bon_opt']= $gr_garant_bon;
    }
   
   $user_action='2';
   
   //$smarty->template_dir=array(THEME_DIR.'/game');
   
   if($conf['garant_win_on']&&(isset($matches1)&&is_array($matches1)))
    {
    if(action_match('spin'))//                                                      
      {
    save_log("***************************",'garant_win.log');
    //                      1                                                     
    //mysql_query("update low_priority users set payed_spins=payed_spins-1 where id= $user_id and payed_spins-1>=0");
      
    //                                                                     
    //mysql_query("update users set curspin=curspin+1, curspin_bonus=curspin_bonus+1 where id=$user_id")or save_log(mysql_error(),'db_error.log');
    //$user_info['curspin']++;
    //$user_info['curspin_bonus']++;
    
    save_log("user_info['curspin']: ".print_r($user_info['curspin'],1),'garant_win.log');
    save_log("user_info['garant']: ".print_r($user_info['garant'],1),'garant_win.log'); 
    
    save_log("user_info['curspin_bonus']: ".print_r($user_info['curspin_bonus'],1),'garant_win.log');
    save_log("user_info['garant_bonus']: ".print_r($user_info['garant_bonus'],1),'garant_win.log'); 
    
    
    if(!isset($user_info['garant']) || ($user_info['curspin']>$user_info['garant'][0]))
      {
      if(isset($user_info['garant'][0]) && ($user_info['curspin']>$user_info['garant'][0]))
        {
        mysql_query("update users set curspin=1 where id=$user_id");
        $user_info['curspin']=1;
    
        save_log("user_info['curspin']: is reset",'garant_win.log');
        }
      
      save_log("user_info['curspin']: ".print_r($user_info['curspin'],1),'garant_win.log'); 
      $available_garant_win=explode(',',$conf['garant_win_opt']);
      save_log("available_garant_win: ".print_r($available_garant_win,1),'garant_win.log');
      $garant_win_key=array_rand($available_garant_win);
      save_log("garant_win_key: $garant_win_key",'garant_win.log');
      $garant_win=explode('|',$available_garant_win[$garant_win_key]);
      save_log("garant_win: ".print_r($garant_win,1),'garant_win.log');
      if($user_info['payed_spins']<=0) //                                                                                                                                                    
        {
        $win_koef=isset($conf['win_koef'])? $conf['win_koef'] : 2;
        $garant_win[0]=$garant_win[0]*$win_koef;
        save_log("garant_win(                  ): ".print_r($garant_win,1),'garant_win.log');
        }
      $user_info['garant']=$garant_win;
      mysql_query("update users set garant='".implode('|',$garant_win)."' where id=$user_id");
      
      }
    save_log("user_info['garant']: ".print_r($user_info['garant'],1),'garant_win.log'); 
    
      if(empty($user_info['garant_bonus']) || ($user_info['curspin_bonus']>$user_info['garant_bonus'][0]))
        {
        if(isset($user_info['garant_bonus'][0]) && ($user_info['curspin_bonus']>$user_info['garant_bonus'][0]))
          {
          mysql_query("update users set curspin_bonus=1 where id=$user_id");
          $user_info['curspin_bonus']=1;
    
          save_log("user_info['curspin_bonus']: is reset",'garant_win.log');
          }
      
        save_log("user_info['curspin_bonus']: ".print_r($user_info['curspin_bonus'],1),'garant_win.log'); 
        $available_garant_bon=explode(',',$conf['garant_bon_opt']);
        save_log("available_garant_bon: ".print_r($available_garant_bon,1),'garant_win.log');
        $garant_bon_key=array_rand($available_garant_bon);
        save_log("garant_bon_key: $garant_bon_key",'garant_win.log');
        $garant_bon=explode('|',$available_garant_bon[$garant_bon_key]);
        save_log("garant_bon: ".print_r($garant_bon,1),'garant_win.log');
        if($user_info['payed_spins']<=0) //                                                                                                                                                    
          {
          $win_koef=isset($conf['win_koef'])? $conf['win_koef'] : 2;
          $garant_bon[0]=$garant_bon[0]*$win_koef;
          save_log("garant_bon(                  ): ".print_r($garant_bon,1),'garant_win.log');
          }
        $user_info['garant_bonus']=$garant_bon;
        mysql_query("update users set garant_bonus='".implode('|',$garant_bon)."' where id=$user_id");
      
        save_log("user_info['garant_bonus']: ".print_r($user_info['garant_bonus'],1),'garant_win.log'); 
        }
      } 
    }
   }
  elseif (preg_match('~\/games\/.+\/(.+)(\/real|\/demo)~i',$_SERVER['PHP_SELF'],$matches))
    {
    $game_name=$matches[1];
    var_dump($matches);
    } 
  elseif ($user_action!=3 && $user_action!=4)
   $user_action='1'; 
   
    
	//mysql_query( "UPDATE LOW_PRIORITY users SET go_time = ".time( ).", ip = $ip_sql, last_ge='".($user_action==2?$game_name:$ge)."', action=$user_action WHERE id = ".$user_id." LIMIT 1" );
  //                                          IP                       , ip                                            logip
  mysql_query( "UPDATE LOW_PRIORITY users SET go_time = ".time( ).", last_ge='".($user_action==2?$game_name:$ge)."', action=$user_action WHERE id = ".$user_id." LIMIT 1" );
	if ( $status === 0 )
	{
    if (in_array($ge,$panels))
      include( "../engine/dir/includes/errors/banlogin.php" );
    else  
      include( "engine/dir/includes/errors/banlogin.php" );
		exit( );
	}
	
}
elseif(!$auth_token)
{
  //                                           users_tmp
  mysql_query($sql="insert into users_tmp (sid, reg_time, go_time, demobalance) values ('".session_id()."', ".time().",".time().",'1000') ON DUPLICATE KEY UPDATE go_time=".time()) or save_log($sql."\r\n".mysql_error(),"db_error.log");
	$user_id = 0;
  if (preg_match('/^g_(\S+)/', $ge,$matches)||preg_match('~(.*\/games\/.+\/)(.+)(\/ge_.+\.php)~i',$_SERVER['PHP_SELF'],$matches1)||preg_match('/ajax/', $ge) )
	 {
	 $user_info=mysql_fetch_assoc(mysql_query("select * from users_tmp where sid='".session_id()."'"));
   $login = "          ";
   $status = '5';
   $user_info['demomode']=$demomode=true;
   $room=$user_info['room_id']=mysql_result(mysql_query("select min(id) from rooms"),0);
   $user_denomination=$user_info['denomination'];
   $user_info['garant']=empty($user_info['garant'])? false : explode('|',$user_info['garant']);
   $user_info['garant_bonus']=empty($user_info['garant_bonus'])? false : explode('|',$user_info['garant_bonus']);
   
   	/* //                         
  $jack_rows= get_jackpots($room);
  
  foreach ($jack_rows as $jack_row)
    {
    $jackpots[]=sprintf("%01.2f",$jack_row['balance']);
    }  */
  
   
   //                        
   
    $game_name= isset($matches[1])? $matches[1]: $matches1[2];
    
   //                 u                 
   
   $sql="select garant_win,garant_bon from garant where gr_id=(select distinct gr_id from game_settings where g_name ='$game_name') and room_id=(select min(id) from rooms)";
   $res=mysql_query($sql);
   if($res && mysql_num_rows($res)>0)
    {
    list($gr_garant_win,$gr_garant_bon)=mysql_fetch_row($res);
    if(!empty($gr_garant_win)) $conf['garant_win_opt']= $gr_garant_win;
    if(!empty($gr_garant_bon)) $conf['garant_bon_opt']= $gr_garant_bon;
    }
   
   //$smarty->template_dir=array(THEME_DIR.'/game');
   
   if($conf['garant_win_on']&&(isset($matches1)&&is_array($matches1)))
    {
    if(action_match('spin'))//                                                      
      {
    save_log("***************************",'garant_win.log');
    
    save_log("user_info['curspin']: ".print_r($user_info['curspin'],1),'garant_win.log');
    save_log("user_info['garant']: ".print_r($user_info['garant'],1),'garant_win.log'); 
    
    save_log("user_info['curspin_bonus']: ".print_r($user_info['curspin_bonus'],1),'garant_win.log');
    save_log("user_info['garant_bonus']: ".print_r($user_info['garant_bonus'],1),'garant_win.log'); 
    
    
    if(!isset($user_info['garant']) || ($user_info['curspin']>$user_info['garant'][0]))
      {
      if(isset($user_info['garant'][0]) && ($user_info['curspin']>$user_info['garant'][0]))
        {
        mysql_query("update users_tmp set curspin=1 where sid='".session_id()."'");
        $user_info['curspin']=1;
    
        save_log("user_info['curspin']: is reset",'garant_win.log');
        }
      
      save_log("user_info['curspin']: ".print_r($user_info['curspin'],1),'garant_win.log'); 
      $available_garant_win=explode(',',$conf['garant_win_opt']);
      save_log("available_garant_win: ".print_r($available_garant_win,1),'garant_win.log');
      $garant_win_key=array_rand($available_garant_win);
      save_log("garant_win_key: $garant_win_key",'garant_win.log');
      $garant_win=explode('|',$available_garant_win[$garant_win_key]);
      save_log("garant_win: ".print_r($garant_win,1),'garant_win.log');
      $user_info['garant']=$garant_win;
      mysql_query("update users_tmp set garant='".implode('|',$garant_win)."' where sid='".session_id()."'");
      
      }
    save_log("user_info['garant']: ".print_r($user_info['garant'],1),'garant_win.log'); 
    
      if(empty($user_info['garant_bonus']) || ($user_info['curspin_bonus']>$user_info['garant_bonus'][0]))
        {
        if(isset($user_info['garant_bonus'][0]) && ($user_info['curspin_bonus']>$user_info['garant_bonus'][0]))
          {
          mysql_query("update users_tmp set curspin_bonus=1 where sid='".session_id()."'");
          $user_info['curspin_bonus']=1;
    
          save_log("user_info['curspin_bonus']: is reset",'garant_win.log');
          }
      
        save_log("user_info['curspin_bonus']: ".print_r($user_info['curspin_bonus'],1),'garant_win.log'); 
        $available_garant_bon=explode(',',$conf['garant_bon_opt']);
        save_log("available_garant_bon: ".print_r($available_garant_bon,1),'garant_win.log');
        $garant_bon_key=array_rand($available_garant_bon);
        save_log("garant_bon_key: $garant_bon_key",'garant_win.log');
        $garant_bon=explode('|',$available_garant_bon[$garant_bon_key]);
        save_log("garant_bon: ".print_r($garant_bon,1),'garant_win.log');
        $user_info['garant_bonus']=$garant_bon;
        mysql_query("update users_tmp set garant_bonus='".implode('|',$garant_bon)."' where sid='".session_id()."'");
      
        save_log("user_info['garant_bonus']: ".print_r($user_info['garant_bonus'],1),'garant_win.log'); 
        }
      } 
    }
   
   //                                               
   }
  else
    { 
    if($ge=='games')
      {
      $login = "          ";
      $status = '5';
      }
    else
      {  
    $login = "";
    $status = 0;
      }
      
	  $user_pass = "";
	  $user_mail = "";
	  
	  $balance = 0;
	  $uwmr = "";
    }
}

//                         
  $jack_rows= get_jackpots($room);
  foreach ($jack_rows as $jack_row)
    {
    $jackpots[]=sprintf("%01.2f",$jack_row['balance']);
    }

if(!isset($language))
  {
  if (isset($_COOKIE['lang']))
    {
    $language=$_COOKIE['lang']; 
    }
  else
    {
    if(in_array($conf['default_lang'],$available_langs))
      {
      $language=isset($conf['default_lang']) ? $conf['default_lang']:'ru';
      setcookie ('lang',$language,604800,'/');  
      }
    else
      {
      $language='ru';
      setcookie ('lang',$language,604800);
      }  
    }
  }
  
if(!isset($language)|| !in_array($language,$available_langs))  //                                               
  {
  $language=isset($conf['default_lang']) ? $conf['default_lang']:'ru';
  setcookie ('lang',$language,604800,'/');
  }

include ('lang/'.$language.'.php');
if($login=="          ")
$login=$lang['auth_guest'];

if ($ge)
  {
$get_page_info = mysql_query( $sql="SELECT title, sub_title, keywords, description, body, path,view FROM pages WHERE ge = '".$ge."' and lang='$language' and view=1 union
SELECT title, sub_title, keywords, description, body, path, 1 FROM pages WHERE ge = 'index' and lang='$language'  LIMIT 1" );
$row = mysql_fetch_array( $get_page_info );

$title = $row['title'];
$sub_title = $row['sub_title'];
$keywords = $row['keywords'];
$description = $row['description'];
$body = stripslashes( $row['body'] );
$path = $row['path'];
$view=$row['view'];

  }
else
  {
  $title=isset($conf['cas_name'])? $conf['cas_name'] : $po_name." ".$po_version;
  $keywords = isset($conf['cas_name'])? $conf['cas_name'] : $po_name." ".$po_version;
  $description = isset($conf['cas_name'])? $conf['cas_name'] : $po_name." ".$po_version;
  }  
  
if ( isset($page) && $page == "news" && isset($_GET['id']) )
{
	$get_news_info = mysql_query( "SELECT subject, keywords, description, msg, date FROM news WHERE lang='$language' and id = ".intval( $_GET['id'] )." LIMIT 1" );
	$row = mysql_fetch_array( $get_news_info );
	$title = $row['subject'];
	$keywords = $row['keywords'];
	$description = $row['description'];
	$news_text = $row['msg'];
	$news_date = $row['date'];
}

//                                                              
$is_block=mysql_result(mysql_query("select val from settings where key_name='is_block'"),0);
if ($is_block && !in_array($ge,$panels) && ($status != 1 && $status != 2))
	{
	  $block_reason=mysql_result(mysql_query("select val from settings where key_name='block_reason'"),0);
	  if (in_array($ge,$panels))
      include( "../engine/dir/includes/errors/site_blocked.php" );
    else  
      include( "engine/dir/includes/errors/site_blocked.php" );
	  exit( );
  }
//                                                            
if($login && $status>1)
  {
$room_info_res= mysql_query("select * from rooms where id=$room");
if ($room_info_res&& mysql_num_rows($room_info_res)==1&&!strpos($_SERVER['PHP_SELF'],'ajax')&&!strpos($_SERVER['PHP_SELF'],'adm'))
  {
  $room_info=mysql_fetch_array($room_info_res);
  if($room_info['status']==0)
    {
    include( $_SESSION['base_dir']."/engine/dir/includes/errors/room_blocked.php" );
    $sql= "UPDATE users SET action=0 WHERE login = '".$_SESSION['login']."' and action not in(3,4) LIMIT 1";
    mysql_query( $sql);
    unset($_SESSION['login']);
    print "<html><head><script language=\"javascript\">setTimeout(function(){top.location.href='\';},5000)</script></head></html>";
	  exit( );
    }
  
  if($room_info['is_selfIP'])
    {
    $room_IP=explode(',',$room_info['ip']);
    if(!in_array($ip,$room_IP))
      {
      include( $_SESSION['base_dir']."/engine/dir/includes/errors/banip.php" );
      include( $_SESSION['base_dir']."/engine/exit.php");
	    exit( );
      }
    }
  }
 } 
//                                                                ,                                                                             



if (preg_match('/^g_/i',$ge)&& !isset($_GET['log_id']))
  {
  $g_name= substr($ge,2);
  $g_view=mysql_result(mysql_query("select g_view from game_settings where g_name='".$g_name."' and room_id=$room"),0);
  if ($g_view==='0'&& ($status != 1 && $status != 2))
    {                                                                                                        
    $_SESSION['msg']="                                   ";
    header('location: '.$baseurl);
    die();
    }
  
  }
  
//if($login)
//  {
//  $language=$user_info['lang'];
//  }
//else
//  {  

if(@$error_collect)
  {
  $_SESSION['msg']=$lang['collect_deny'];
        header("location: ".$baseurl);
        die();
  }

if(preg_match('/(\/)(\w+)(\/)(ge_server\.php$)/', $_SERVER['PHP_SELF'], $matches))
  {
   //save_log(print_r ($matches,1),'loging.log');
   $game_settings=get_game_settings($matches[2]);
   
   if(isset($game_settings['g_view'])&&!$game_settings['g_view'])
    {
    die("error|                           ,                                                     ");
    }
  }   
@$err=$_SESSION['err'];
unset ($_SESSION['err']);


$game_cats=$db->get_all("select * from game_cat where lang='$language' and view=1 order by pos",'href');


 //$url_path = trim($_SERVER['REQUEST_URI'],'/');
/* echo "<pre>";
 var_dump($url_path);
 var_dump(array_key_exists($url_path,$game_cats));
 var_dump($game_cats);
 die();   */
 
if($user_id>0)
  {
  if($soc=$db->get_all("select * from ulogin where user_id=$user_id",'network'))
    $user_info['soc']=$soc;
  else
    $user_info['soc']=array();
  } 
 


 if(isset($url_path) && array_key_exists($url_path,$game_cats))
      {
      if($game_cats[$url_path]['parent']==0)
        $cur_cat= $url_path;
      else  
        {
        foreach($game_cats as $cat)
          {
          if ($cat['id']==$game_cats[$url_path]['parent'])
            $cur_cat=$cat['href'];
          }  
        $cur_subcat=$url_path;
        }
      }
    
$bonus_reg_class= new reg_Bonus;

if(!(isset($user_info['gift'])&& $user_info['gift']>0))
  {
  $bonus_reg=$bonus_reg_class->get_bonuses();
  }
else
  {
  $bonus_reg=$bonus_reg_class->get($user_info['gift']);
  } 
  
if($user_id)  
  {
  $bonuses=$bonus_reg_class->get_avail($user_id);
  $active_bonus_bar=$bonus_reg_class->bar();
  
  }
else
  $bonuses=array();     


/*echo "<pre>";
var_dump($jack_sum);
echo "</pre>";
die();*/
 
/*$vkAdapterConfig = array(
        'client_id'     => '5845041',
        'client_secret' => 'ax5jL9aucq5gSiUOFsdp',
        'redirect_uri'  => 'http://svn40/auth?provider=vk'
    );
     
    
//                                                                       
	$vkAdapter = new SocialAuther\Adapter\Vk($vkAdapterConfig);

	//                                      SocialAuther
	$auther = new SocialAuther\SocialAuther($vkAdapter);  */
  
/*$adapterConfigs = array(
    'vkontakte' => array(
        'client_id'     => '5845041',
        'client_secret' => 'ax5jL9aucq5gSiUOFsdp',
        'redirect_uri'  => 'http://svn40/registration?provider=vkontakte&ulogin',
        'prefix'  => 'vk'
    ),
    'odnoklassniki' => array(
        'client_id'     => '168635560',
        'client_secret' => 'C342554C028C0A76605C7C0F',
        'redirect_uri'  => 'http://localhost/auth?provider=odnoklassniki',
        'public_key'    => 'CBADCBMKABABABABA'
    ),
    'twitter' => array(
        'client_id'     => '770076',
        'client_secret' => '5b8f8906167229feccd2a7320dd6e140',
        'redirect_uri'  => 'http://localhost/auth/?provider=mailru'
    ),
    'facebook' => array(
        'client_id'     => '613418539539988',
        'client_secret' => '2deab137cc1d254d167720095ac0b386',
        'redirect_uri'  => 'http://localhost/auth?provider=facebook'
    )
);

$adapters = array();
foreach ($adapterConfigs as $adapter => $settings) {
    $class = 'SocialAuther\Adapter\\' . ucfirst($adapter);
    $adapters[$adapter] = new $class($settings);
} */
    
 

?>