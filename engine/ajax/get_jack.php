<?php 
header("Content-Type:	text/javascript; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
                              
$id= isset($_REQUEST['id'])?intval($_REQUEST['id']):false;
$result=array();
if($id===0)
  {
  $interval=rand(1,$conf['fake_jack_param'][1]);
  if(time()>$conf['fake_jack_param'][2])
    {
    $sum=rand(1,$conf['fake_jack_param'][0]);
    mysql_query("update settings set val=val+$sum where key_name='fake_jack'");
    mysql_query("update settings set val='".$conf['fake_jack_param'][0]."|".$conf['fake_jack_param'][1]."|".(time()+$interval)."' where key_name='fake_jack_param'");
    $result=array($conf['fake_jack']+$sum,$interval);
    }
  else
    $result=array(intval($conf['fake_jack']),$interval);
  }
  else if($id == 10)
  {
      show_jackpots($room);
  }
else
  {
  $sql="select * from jackpots where id=$id and room_id=$room";
  $res=mysql_query($sql);
  if($res)
    $result=mysql_fetch_assoc($res);
  else
    $result=array('success'=>false);  
  }  
echo json_encode($result);  
?>