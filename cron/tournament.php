<?php
//echo getcwd();
$path='../';
require_once($path.'engine/cfg.php');
require_once($path.'engine/inc/functions.php');
require_once($path.'engine/inc/tournament_class.php');


$chk_tour=new Tournament();

$tournaments=$chk_tour->check_close();

if(!isset($conf['botstat_logins']))
    $conf['botstat_logins']=$db->get_one("select val from settings where key_name='botstat_logins'");
    
if(is_array($tournaments))
foreach ($tournaments as $tournament)
  {
  if(strtotime($tournament['start_time'])<time())
    {
    $tour = new Tournament($tournament);
  
  
    $tour->add_bot($conf['botstat_logins']);
  
    if(isset($tour->msg))
      foreach($tour->msg as $msg)
      {
      echo "$msg \r\n";
      }
    }
  }
if(isset($tour))  
  {
  $tour->increase_bot();
  }
  

  /*                                                                                                                                                                    ,                                               
                                                                                               */
    
$mailing_tour=$db->get_all("select id from tournaments where mailing_status=1 and status=0 and start_time + interval 1 day < now() and now() + interval 1 day > end_time", 'id');  

foreach($mailing_tour as $k=>$v)
  {
  $mail_tour=new Tournament($k);
  $mail_tour->set_mailing(true);
  }



?>

