<?php 

include ('../cfg.php');
include ('../ini.php');

if($status!=1)
  {
  die("                               ");
  }


$action=isset($_REQUEST['action']) ? $_REQUEST['action'] : 'list';
$rating_name=isset($_REQUEST['name']) ? $db->prepare($_REQUEST['name']) : false;
$rating_level=isset($_REQUEST['level']) ? intval($_REQUEST['level']) : false;
$rating_range=isset($_REQUEST['range']) ? intval($_REQUEST['range']) : false;
$rating_title=isset($_REQUEST['title']) ? $db->prepare($_REQUEST['title']) : false;
$rating_description=isset($_REQUEST['description']) ? $db->prepare($_REQUEST['description']) : false;
$rating_color=isset($_REQUEST['color']) ? $db->prepare($_REQUEST['color']) : false;
$rating_pic=isset($_REQUEST['pic']) ? $db->prepare($_REQUEST['pic']) : false;
$rating_id=isset($_REQUEST['id']) ? intval($_REQUEST['id']) : false;
$rating_cours=isset($_REQUEST['point_cours']) ? $db->prepare($_REQUEST['point_cours']) : false;
$rating_bonus=isset($_REQUEST['bonus_sum']) ? $db->prepare($_REQUEST['bonus_sum']) : false;


if($action=='list')
  {
  if($rating_id)
    {
    $sql="select * from users_rate_range where id=$rating_id limit 1";
    $res=mysql_query($sql);
    if($res)
      {
      $row=mysql_fetch_assoc($res);
      if($row)
        $out=array('success'=>true,'info'=>$row); 
      else
        $out=array('success'=>false,'txt'=>'                                ');   
      }
    }
  else
    $out=array('success'=>false,'txt'=>'                          id');  
  }
elseif($action=='add')
  {
  if(empty($rating_name))
    {
    $out=array('success'=>false,'txt'=>'                                          ');
    }
  elseif(!isset($rating_range))
    {
    $out=array('success'=>false,'txt'=>'                                                     ');
    }  
  elseif(empty($rating_color))
    {
    $out=array('success'=>false,'txt'=>'                                  ');
    }  
  else
    {
    $sql="insert into users_rate_range values(null, '$language', '$rating_bonus', '$rating_title','$rating_description', $rating_level, '$rating_cours', '$rating_name','$rating_range','$rating_color','$rating_pic')";
    if($db->run($sql))
      $out=array('success'=>true);
    else
      $out=array('success'=>false,'txt'=>$sql."/r/n".$db->error);  
    }  
  
  }
elseif($action=='edit')
  {
  if(empty($rating_name))
    {
    $out=array('success'=>false,'txt'=>'                                          ');
    }
  elseif(!isset($rating_range))
    {
    $out=array('success'=>false,'txt'=>'                                                     ');
    }  
  elseif(empty($rating_color))
    {
    $out=array('success'=>false,'txt'=>'                                  ');
    }  
  else
    {
    
    $sql="update users_rate_range set 
              `level`=$rating_level, 
              `title` = '$rating_title',
              `description` = '$rating_description',
              `point_cours`='$rating_cours',
              `name`='$rating_name', 
              `range`='$rating_range', 
              `color`='$rating_color',
              `pic`='$rating_pic',
              `bonus_sum`=$rating_bonus 
          where id=$rating_id";
    if($db->run($sql))
      {
      $out=array('success'=>true);
      $_SESSION['message'][]= "                            
        <div class='col-md-12'>
        <div class='alert alert-success'>
        <center><strong>                                             </strong></center>
        <button class='close' data-dismiss='alert' type='button'>  </button>
        </div>
        </div>";
      }
    else
      {$out=array('success'=>false,'txt'=>$sql."/r/n".mysql_error());
      if($db->error)
      $_SESSION['message'][]= "<div class='col-md-12'>
        <div class='alert alert-danger'>
        <center><strong>".$db->error."</strong>".$db->sql."</center>
        <button class='close' data-dismiss='alert' type='button'>  </button>
        </div>
        </div>";
      }  
    }  
  
  }

  echo $json= json_encode($out);
  
?>