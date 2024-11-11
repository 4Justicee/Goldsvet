<?php
include ('../cfg.php');
include ('../ini.php');
                               

$action=isset($_REQUEST['action'])? $_REQUEST['action']: 'get';
$user=isset($_REQUEST['user'])? intval($_REQUEST['user']): false;

//                                                                                        


if ($status==1 && $user)
  {
  if ($action=='on')
    {
    //                                             
    $sql="update users set point_on=1 where id=$user";
    if(mysql_query("$sql"))
      echo "success";
    else
      echo "Error|                                                                                 ";  
    }
  elseif($action=='off')
    {
    //                                               
    $sql="update users set point_on=0 where id=$user";
    if(mysql_query("$sql"))
      echo "success";
    else
      echo "Error|                                                                                 ";  
    }
  }
?>