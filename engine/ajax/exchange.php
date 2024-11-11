<?php
include ('../cfg.php');
include ('../ini.php');
                               

$sumpoints=isset($_REQUEST['sumpoints'])? intval($_REQUEST['sumpoints']): $user_info['pay_points'];

if ($login)
  {
  if($user_info['pay_points']<$sumpoints)
    {
    $answer=array("success"=>false,"error"=>"                                       ");
    }
  elseif($sumpoints<100)  
    $answer=array("success"=>false,"error"=>"                                   <b>100</b>               ");
  else
    {
    $cours_=explode('|',$db->get_one("select point_cours from users_rate_range where id=".$user_info['rating']));

    $cours=$cours_[0];
    $wager=$cours_[1];
    
    save_log($cours);   

  //                               
  
  $sum=$sumpoints*$cours/100;
  $wager_sum=$sum*$wager;
  $pay_id=save_stat_pay($sum,$login,1,'pay_point',$inv_code);
  save_log("pay_id: ".$pay_id);
        $sys='pay_point';
        pay($pay_id);
  if($db->run("update users set pay_points=pay_points-$sumpoints, wager=wager+$wager_sum where id=$user_id"))
     {
     $answer=array("success"=>true);
     $_SESSION['messages'][]=array('erok',"VIP-                                        ");
     }
    }  
  }
else
  $answer=array("success"=>false,"error"=>"                                       ");
  
echo json_encode($answer);    
?>