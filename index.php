<?php

if(isset($_REQUEST['GE']))
  $ge=$_REQUEST['GE'];
else      
  {
  $url_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);  
 
  //                                           URL                     "/"
  $url_path = trim($url_path, '/');
  if(!empty($url_path))
    {    
    $uri_parts = explode('/', trim($url_path, ' /'));
    }

  $ge=isset($uri_parts)&& !empty($uri_parts[0])&& !($uri_parts[0]=='index.php') ? $uri_parts[0] : 'index';
  }
//var_dump($ge);
// var_dump($_COOKIE['redirect']);
//var_dump($_SERVER['HTTP_REFERER']);

if(isset($_COOKIE['redirect']))
  {
  $redirect= $_COOKIE['redirect'];
  setcookie('redirect','',-1,'/');
  //var_dump(isset($_SERVER['HTTP_REFERER']) && $redirect!=$_SERVER['HTTP_REFERER']);
  if(isset($_SERVER['HTTP_REFERER']) && $redirect!=$_SERVER['HTTP_REFERER'])
    {
    header("location: ".$redirect);
    die();
    }
    
  }
	require_once "engine/cfg.php";
	require_once "engine/ini.php";

/*if($status!=5 && $status!=0 && $status!=1)
  {
  header("location: /adm");
  die();
  }  
*/

$pages=$db->get_all("select path from pages where `view`=1 and lang='$language'","path");
if(isset($ge))
  {
  //echo "<pre>";
  //var_dump($url_path,$game_cats);
  //die();
  if ($ge=='index')
    {//                                 
    $path='engine/dir/';
    }
  elseif($ge=='logout')
    {
    if (isset($_SESSION['login']))
      {
      $sql= "UPDATE users SET action=0 WHERE login = '".$_SESSION['login']."' and action not in(3,4) LIMIT 1";
      $db->run($sql);
      unset($_SESSION['login']);
      }
    @setcookie("GOLDSVET1", '', time() - 1, "/");
    @setcookie("GOLDSVET2", '', time() - 1, "/");
    $login = "";
    $user_info=array();
    header('location: /');
    die();
    }  
  elseif($ge=='activate')
    {//                                   
    $db->run("delete from activate where exp_time<now()");
    if($active_info=$db->get_row("select * from activate where code='".$uri_parts[1]."'"))
      {
      $sql="update users set ";
      if($active_info['type']==1)
        $sql.=" mail_active_status=2 ";
      else
        $sql.=" phone_active_status=2 ";
      
      $sql.= " where id=".$active_info['user_id']; 
      if($db->run($sql))
         {$db->run("delete from activate where code='".$uri_parts[1]."'");
         $_SESSION['messages'][]=array('erok', $lang['err_20']);
         }  
      }
    else
      $_SESSION['messages'][]=array('er', $lang['err_29']);
      
    
    
    //include_once "engine/view.php";
    header("location: /");
    die();  
    }
  elseif(array_key_exists($url_path,$game_cats)) 
    {
    $templ_name='index.tpl';
    include_once "engine/view.php";
    die();  
    }
  else  
    {                                                                                                                   
    if($view)
      $path='engine/dir/'.$path;
    else
      $path='engine/dir/';
    } 
$index=1;
$fullpath=dirname(__FILE__)."/".$path;
  if ($path!==false && file_exists ($fullpath."/index.php"))
    {
    $user_info['demomode']=$demomode=false;
    include $fullpath."/index.php";
    }
  elseif(array_key_exists($url_path,$pages))
    {
    $templ_name=$url_path.'.tpl';
    }  
  else{
    
    list($path, $title, $sub_title, $keywords, $description, $body, $part,$view)=mysql_fetch_row(mysql_query("select path, title, sub_title, keywords, description, body, part, view from pages where GE='index' and lang='$language'"));
    //include "engine/dir/index.php";
    //unset($_SERVER['REQUEST_URI']);
    $_SESSION['err_404']=1;
    $_SESSION['messages'][]=array('er', $lang['err_21']);
	   header("location: /");
    die();
    }  
  } 
include_once "engine/view.php"; 	
?>