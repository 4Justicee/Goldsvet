<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
error_Reporting(E_ALL);

  $user_lang=isset($_GET['lang'])&& in_array($_GET['lang'],$available_langs)? $_GET['lang']: false;
  if($user_lang)
    {
      setcookie('lang',$user_lang,time()+60*60*24*365,'/');
      $_COOKIE['lang']=$user_lang;
      echo 'success';  
    }
  else
    echo 'err|                                                                        ';
  

?>