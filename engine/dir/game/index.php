<?php

$templ_name='content.tpl';

if(!file_exists(THEME_DIR."/".$templ_name))
      {
      header('location: /',true,302);
      die();  
      }

$res=mysql_query("select * from game_group");
if($res)
  {
  while($row=mysql_fetch_assoc($res))
    {
    
    $res1=mysql_query($sql="select g_title,g_name from game_settings where g_view=1 and gr_id=".$row['gr_id']);

    if($res1 && mysql_num_rows($res1)>0)
      {
      $games[$row['gr_id']]['title']=$row['gr_name'];
      $games[$row['gr_id']]['path']=$row['start_path'];
      while($row1=mysql_fetch_assoc($res1))
        {
        $games[$row['gr_id']]['games'][]=$row1;
        }
      }
    }
  }
if(!isset($games)) $games=false;
$smarty->assign('games', $games); 
 
?>