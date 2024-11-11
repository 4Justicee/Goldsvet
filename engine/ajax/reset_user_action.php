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
 


if ($edited_user)
  {
  if(mysql_query("update users set action=0 where id=$edited_user and action not in (3,4)"))
    {
    if(mysql_affected_rows()>0)
      {
      save_log("$login                action                 id $edited_user",'bank.log');
      $result="success|".$lang['user_action'][0];
      }
    else
      {
      $result="error|                                   action";
      }  
    }
  }  
}
else
    $result="error|                                               ";  
echo $result;
?>