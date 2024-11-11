<?php

include ('../cfg.php');
include ('../ini.php');

$answer=array('status'=>false);
if($login)
  {
  $bon_id=isset($_REQUEST['id'])? intval($_REQUEST['id']) : false;
  if(!$bon_id)
    {
    $answer=array('status'=>false,'error'=>'                  ID');
    } 
  else
    {
    $bonus=new Bonus($bon_id);
   
    if($bonus->info['wager']>0 && $user_info['wager']>0)
      {
      $answer=array('status'=>false);
      $answer["error"]="                                              ";
      }
    elseif($bonus->info['type']=='vip' && $db->get_one("select count(*) from bonus join bonus_user on (bonus.id=bonus_user.bonus_id) where type='vip' and user_id=$user_id and status='1'"))
      {
      $answer=array('status'=>false);
      }
    elseif($bonus->info['type']=='return' && $db->get_one("select count(*) from bonus join bonus_user on (bonus.id=bonus_user.bonus_id) where type='return' and user_id=$user_id and status='1'"))
      {
      $answer=array('status'=>false);
      }
    elseif($bonus->info['type']=='freespin' && $db->get_one("select count(*) from bonus join bonus_user on (bonus.id=bonus_user.bonus_id) where type='freespin' and user_id=$user_id and status='1'")>0)
      {
      $answer=array('status'=>false);
      }
    elseif($bonus->info['type']=='nondep')
      {
      if ($bonus->activate())
        {
        $answer['status']=true;
        $answer["is_deposit"]=false;
        }
      }
    elseif($bonus->info['type']=='freespin' && $bonus->info['min_deposit']==0)
      {
      if ($bonus->activate())
        {
        $answer['status']=true;
        $answer["is_deposit"]=false;
        }
      }  
    else
      {
      if($bonus->info['num_deposit']>0)
        {
        $count_deposit=$db->get_one("select count(*) from enter join users using (login) where users.id=$user_id and enter.status=2 and paysys not like 'bonus%'");
        if($count_deposit!=$bonus->info['num_deposit']-1)
          {
          $answer['status']=false;
          $answer["error"]="                !!!                                                                                           ".($bonus->info['num_deposit']-$count_deposit-1)."                     !!!";
          }
        }
      if(!isset($answer["error"]))
        {  
      $winners=$bonus->fill_bot_stat($bon_id);
    
      $answer['status']=true;
      $answer["bonus_id"]=$bon_id;
      $answer["image"]=THEME_URL."/images\bonus/".$bonus->info['pic'];
      $answer["title"]=$bonus->info['name'];
      $answer["winners"]=$winners; //:[{"login":" \u041d\u0438\u043a\u0438\u0442\u0430","win":"10097.00"},{"login":" Ruslan2292","win":"10094.00"},{"login":" bars333","win":"10093.00"},{"login":" bars333","win":"10083.00"},{"login":" j3eka2","win":"10054.00"},{"login":" Sofirina48","win":"10040.00"},{"login":" sashiko","win":"10035.00"},{"login":" serhio771","win":"10012.00"},{"login":"mainer","win":"10000.00"},{"login":" j3eka2","win":"10000.00"}]
      $answer["is_deposit"]=true;
      $answer["is_vip"]=0;
      $answer["deposit"]=$bonus->info['min_deposit']."             ";
        }
      }
    }  
  } 
  
echo json_encode($answer);
?>