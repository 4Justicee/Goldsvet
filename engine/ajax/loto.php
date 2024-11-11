<?php

include ('../cfg.php');
include ('../ini.php');
include ('../inc/loto_class.php');

$action=isset($_REQUEST['action'])? $_REQUEST['action']: 'view';



if($action=='view')
  {
  $loto= new Loto();
  if(isset($conf['loto_timeout']))
    $loto->timeout=intval($conf['loto_timeout']);
  if(isset($conf['loto_showtime']))  
    $loto->showtime=intval($conf['loto_showtime']);
  
  if($user_id)
    $demomode=false;
    
  $loto->draw();
  //echo  $loto['unixtime']+$loto_showtime."<". time();
  if($loto->info['balls'])
    {
    echo '{"status":2,"values":['.$loto->info['balls'].'],"time":'.($loto->info['unixtime']+$loto->timeout+$loto->showtime).',"fulltime":"'.$loto->showtime.'","round":'.($loto->info['id']).'}';
    }
  else 
    {
    echo '{"status":1,"time":'.($loto->info['unixtime']+$loto->timeout).',"fulltime":"'.$loto->timeout.'","round":'.($loto->info['id']).'}';
    }
 }
elseif($action=='get_win')
  {
  if($user_id)
    {
    $win_rows = $db->get_all($sql="select * from loto_bets where draw_id=(select max(id) from loto_draw where balls<>'') and user_id=$user_id");
    
    if($win_rows)
      {
      foreach ($win_rows as $win_row)
        {
        $balls=count(explode(',',$win_row['balls']));
        $result[]=array("logout"=>0,"sum"=>($win_row['bet_sum']*$win_row['coef']),"info"=>$win_row['win_balls_num']."/".$balls,"id"=>$win_row['id'],"rate"=>$win_row['coef']);
        }
      echo json_encode($result);
      }
      
    else  
      echo '{"logout":0}';
    }
  else
    echo '{"logout":1}';  
  } 
elseif($action=='make')
  {
  if($user_id)
    {
    $amount=isset($_REQUEST['amount'])? intval($_REQUEST['amount']): 0;
    $balls= isset($_REQUEST['come'])? $_REQUEST['come'] : false;
    if(!$amount)
      echo '{"error":1,"text":["                              "]}';
    elseif(!$balls)  
      echo '{"error":1,"text":["                              "]}';
    else
      {
      if($user_info['balance']<$amount)
        echo '{"error":1,"text":["                                        ,                                             "]}';
      else
        {
        $loto= new Loto();
        if($loto->info['balls'])
          echo '{"error":1,"text":["                                ,                                                                    "]}';
        elseif(!$db->run("update users set balance=balance-$amount where id=$user_id and balance-$amount>=0"))
          echo '{"error":1,"text":["                                                                                          "]}';
        else
          {
          $loto_income=isset($conf['loto_income'])? $conf['loto_income']: 30;
        
          if($id=$loto->set_bet($amount,$balls,$loto_income))
            echo '{"error":0,"id":'.$id.',"text":["                                    "]}';
          else  
            echo '{"error":1,"text":["'.$loto->error.'"]}';
          }
        }     
      }  
    
    }
  else
    {
    echo '{"error":1,"text":["                                                                                                               "]}';
    }  
  }  
?>