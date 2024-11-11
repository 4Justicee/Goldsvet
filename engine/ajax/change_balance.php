<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
Error_Reporting(E_ALL);                              
if (isset($_REQUEST['user']))
  {
  if(is_numeric($_REQUEST['user']))
    {
    $edited_user=$_REQUEST['user'];
    $edited_room=false;
    }
  elseif(is_numeric($edited_room=substr($_REQUEST['user'],4)))
    {
    $edited_user=false;
    }
  else
    {
    $edited_user=false;
    $edited_room=false;
    }    
  }

$trend= isset($_REQUEST['action'])? ($_REQUEST['action']=='plus' ? 1 : -1) : 0 ;  //         action                ,                             0,   .  .                                       
$type= isset($_REQUEST['type'])&& !empty($_REQUEST['type'])? $_REQUEST['type'] : 'real' ;
$sum=isset($_REQUEST['suma'])?  (floatval($_REQUEST['suma']) * $trend) : 0;

$balance='';

$room_id=$room;

if($type=='demo')
  {
  $db->run("update users set demobalance=demobalance+$sum where id=$edited_user");
  $demobalance=$db->get_ohe("select demobalance from users where id=$edited_user");
  $balance="success|$demobalance";
  }
elseif($type=='real')
{  
if ($edited_user)
  {
$edited_user_row=$db->get_row($sql="SELECT users.status as user_group, users.creator as user_creator, users.room_id, rooms.status, rooms.creator as room_creator, action, users.balance as user_balance,login, ref_id FROM users LEFT JOIN rooms ON ( users.room_id = rooms.id ) where users.id=$edited_user");
  if(($edited_user_row['user_group']==5||$edited_user_row['user_group']==6)&&($status==1||$status==4))
    {
    
    //                                                                                
    if(($status==4 && $conf['kassir_outpay_after_collect'] && $edited_user_row['action']==3) || $sum>0||($status==4 && !$conf['kassir_outpay_after_collect']) || $status==1 || $status==4 )
    {
    
    $balance= change_balance ($sum, $edited_user);
    if($balance)
      $a_balance=explode('|',$balance);
    else
      $a_balance=false;
              
    if($a_balance&& $a_balance[0]=='success')
      {
      //$sql="insert into enter values (null, (select login from users where id=$edited_user), $sum, UNIX_TIMESTAMP(), 2, '$login',if((select is_return from rooms where id=$room_id),0,2))";
      if($sum>0)
       $pay_id= save_stat_pay($sum,$edited_user_row['login'],1,$login,$inv_code);
      else        
       $pay_id= save_stat_pay($sum,$edited_user_row['login'],2,$login,$inv_code);
      
        $sys=$login;
        pay($pay_id, false);
        //$sql="UPDATE LOW_PRIORITY rooms set return_balance=return_balance+".$sum."*return_perc/100, return_login='".$edited_user_row['login']."' where id=$room and is_return_room=1";
        //          mysql_query($sql) or save_log($sql.":".mysql_error(),'db_error.log');
        $balance.="|".$pay_id;  
        
        if($a_balance[1]==0)
        {
        //                                                       ,                                                                       ,                                                                                     
        $sql="update LOW_PRIORITY enter set returned=4 where login=(select login from users where id=$edited_user) and returned=0";
        $db->run($sql);
        }
                              
        $sql="update users set action=0 where id=$edited_user and action=3";
        $db->run($sql);
        $edited_login=$edited_user_row['login'];
        //if($sum>0);
  
      }
      else
        $balance="error|".$a_balance[1];
      }
    }
  else
    {
    $balance="error|                                                                ";
    }
      
  }
else
  {
  $balance="error|                                          ";
  }
}
else  
  $balance="error|                                            ";
echo $balance;
?>