<?php

  if($login)
    {
   if($status!=5 and $status!=6)
    {
    $_SESSION['messages'][]=array("er", $lang['err_22']);
    header("location: /");
    die();
    }
	
  $templ_name='enter.tpl';        
  $money = isset($_POST['money']) ? sprintf("%01.2f", $_POST['money']): 0;
  
if($money && ($money<$conf['enter_from'] || $money>$conf['enter_to']))

  {
  $msg=$lang['err_23'];
  $msg=str_replace('%max', $conf['enter_to'], $msg);
  $msg=str_replace('%min', $conf['enter_from'], $msg);
  //$_SESSION['messages'][]=array("er",$msg);
  echo json_encode(array("status"=>"err","message"=>$msg));
  die();
  }
elseif($money && isset($_REQUEST['bonus_id']))
  {
  $bonus= new Bonus($_REQUEST['bonus_id']);
  if($money<$bonus->info['min_deposit'])
    {
    $msg=$lang['err_23'];
    $msg=str_replace('%max', $conf['enter_to'], $msg);
    $msg=str_replace('%min', $bonus->info['min_deposit'], $msg);
    echo json_encode(array("status"=>"err","message"=>$msg));
    die();
    }
  }   

$ps=isset($_REQUEST['system'])&& in_array($_REQUEST['system'],$pay_mods)? $_REQUEST['system']: false; 

$dir=realpath(dirname(__FILE__)."/../pay");
  
  if($ps)
    {
     if (file_exists($dir.'/'.$ps.'/enter/enter.php'))
        {
        include($dir.'/'.$ps.'/enter/enter.php');
        }
     
    }
  else
    {
  $handle = opendir($dir);
  for ($i=0;false !== ($paysys = readdir($handle));$i++)
    {
    if ( in_array ($paysys, $pay_mods) && is_dir($dir.'/'.$paysys))
      {
      if (file_exists($dir.'/'.$paysys.'/enter/enter.php'))
        {
        include($dir.'/'.$paysys.'/enter/enter.php');
        }
      }
    }
    }  	
    }    
  else
	 {
   $_SESSION['messages'][]=array('er',$lang['err_19']);
   header("location: /");
    die();
   }
   
?>