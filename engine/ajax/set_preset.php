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
    }
  else
    {
    $edited_user=false;
    }    
  }

$preset_id= isset($_REQUEST['preset_id'])? $_REQUEST['preset_id'] : false ;

if ($edited_user)
  {
  $sql="SELECT * FROM users where id=$edited_user limit 1";
  $edited_user_row=mysql_fetch_array(mysql_query($sql));
  if(check_parent($edited_user,$user_id)||($status=4 && $edited_user_row['room_id']==$room))
    {
      if(mysql_query("update users set preset_id=$preset_id where id=$edited_user "))
          {
          $result="success|$preset_id";
          }
      else
        $result="error|                                                          ".mysql_error();
    }
  else
    $result="error|                                                                                                 "; 
  }  
else
    $result="error|                                               ";  
echo $result;
?>