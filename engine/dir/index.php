<?php

$templ_name='index.tpl';

//                                               

$b1_limit=isset($conf['game_block_count']) ? intval($conf['game_block_count']): 10;
$sql="SELECT g_id, g_name, start_path as g_path, ifnull(g_title,g_name) as g_title
            FROM game_settings left join game_group using (gr_id) where g_view=1 and g_ver in($g_ver) group by g_id order by rand() limit $b1_limit";
$res=mysql_query($sql) or save_log($sql."\r\n".mysql_query(),"db_error.log");
  if($res)
    while($row=mysql_fetch_assoc($res))
      {
        $game_block1[]=$row;
      }        
if(isset($game_block1))   
  $smarty->assign('game_block1',$game_block1);

//                                                 

$b1_limit=isset($conf['game_block_count1']) ? intval($conf['game_block_count1']): 3;
$sql="SELECT g_id, g_name, start_path as g_path, ifnull(g_title,g_name) as g_title
            FROM game_settings left join game_group using (gr_id) where g_view=1 and g_ver in($g_ver) group by g_id order by rand() limit $b1_limit";
$res=mysql_query($sql) or save_log($sql."\r\n".mysql_query(),"db_error.log");
  if($res)
    while($row=mysql_fetch_assoc($res))
      {
        $game_block2[]=$row;
      }        
if(isset($game_block2))   
  $smarty->assign('game_block2',$game_block2);
  
?>