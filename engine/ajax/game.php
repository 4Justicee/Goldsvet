<?php
include ('../cfg.php');
include ('../ini.php');

if($status==1)
  {
  $g_id=isset($_REQUEST['g_id']) ? intval ($_REQUEST['g_id']) : false;
  $mod=isset($_REQUEST['mod']) ? $_REQUEST['mod'] : false;
  $act=isset($_REQUEST['act']) ? intval ($_REQUEST['act']) : false;
  
  if($g_id)
    {
    if($mod=='inslider') //                                                  inslider
      {
      if($act=='togle') //                                                                          
        {
        $cur_val=mysql_result(mysql_query("select g_inslider from game_settings where g_id=$g_id"),0);
        $new_val=$cur_val? 0: 1;
        if(mysql_query($sql="update game_settings set g_inslider=$new_val where g_id=$g_id"))
          echo "success|$new_val";
        else
          echo $sql.mysql_error();  
        }
      else
       echo "                                                               "; 
      }
    elseif($mod=='view') //                                                  view
      {
      if($act=='togle') //      /               
        {
        $cur_val=mysql_result(mysql_query("select g_view from game_settings where g_id=$g_id"),0);
        $new_val=$cur_val? 0: 1;
        if(mysql_query($sql="update game_settings set g_view=$new_val where g_id=$g_id"))
          echo "success|$new_val";
        else
          echo $sql.mysql_error();  
        }
      else
       echo "                                                               "; 
      } 
    elseif($mod=='ver') //                                                  g_ver
      {
      if($act=='togle') 
        {
        $cur_val=$db->get_one("select g_ver from game_settings where g_id=$g_id");
        $new_val=$cur_val? 0: 1;
        $sql="update game_settings set g_ver=$new_val where g_id=$g_id";
        if($db->run($sql))
          echo "success|$new_val";
        else
          echo $db->error;  
        }
      else
       echo "                                                               "; 
      }   
    else
      echo "                              "; 
    }
  else
    {
    echo "                            ";
    }   
  }  
else
  echo "                                                          ";  
?>