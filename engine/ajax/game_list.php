<?php

include ('../cfg.php');
include ('../ini.php');

$game_group=isset($_REQUEST['game_group']) ? intval($_REQUEST['game_group']) : 0;
$game_count=isset($_REQUEST['count']) ? intval($_REQUEST['count']) : 0;
$type=isset($_REQUEST['type']) ? $_REQUEST['type'] : 'json';
$q= isset($_REQUEST['q']) ?$db->prepare($_REQUEST['q']): false;

if($type=='json')
  {
  if(isset($game_group))
    {
    $sql="select * from game_group";
    $res=mysql_query($sql);
    if($res)
      while($row=mysql_fetch_array($res))
        {
        $game_groups[$row['gr_id']]=array($row['gr_name'],$row['start_path']);
        }
    if ($game_group=="0")
      {
      $out['title'] = "";
      $sql="SELECT g_id, position, start_path as g_path, g_name, ifnull(g_title,g_name) as g_title
            FROM game_settings left join game_group using (gr_id) where g_view=1 group by g_id order by position";
      if($game_count)
        $sql.=" limit $game_count";
      }
    elseif(isset($game_groups) && array_key_exists($game_group,$game_groups))
      {
      $out['title'] = $game_groups[$game_group][0];

      $sql="SELECT g_id, g_name, '".$game_groups[$game_group][1]."' as g_path, ifnull(g_title,g_name) as g_title
            FROM game_settings where g_view=1 and gr_id=$game_group group by g_id ";
      }
    }

if (isset($out))
  {

  $res=mysql_query($sql) or save_log($sql."\r\n".mysql_query(),"db_error.log");
  if($res)
    while($row=mysql_fetch_assoc($res))
      {
        $out['games'][]=$row;
      }
  echo $json= json_encode($out);

  }
  }
elseif($type=='html')
  {
  
  if(strlen($q))
    {
   $sql="SELECT g_id, g_name, start_path as g_path, ifnull(g_title,g_name) as g_title, g_counter
            FROM game_settings
  left join game_group using (gr_id)
  
  where g_view=1 and g_ver in ($g_ver) and (g_name like '%$q%' or g_title like '%$q%') group by g_name";
    }
  else
    {
    $url=parse_url($_SERVER['HTTP_REFERER']);
    $path=$url['path']=='/'? '': trim($url['path'],'/');
    $b1_limit=isset($conf['game_block_count']) ? explode('|',$conf['game_block_count']): array(18,10,3);
    
    if($path=='')
    $sql="SELECT g_id, g_name, start_path as g_path, ifnull(g_title,g_name) as g_title, g_counter
            FROM game_settings 
  left join game_group using (gr_id)
  where g_view=1 and g_ver in ($g_ver) group by  g_name order by rand() limit ".max($b1_limit);
  elseif($path=='favorites')
    {if ($login)
    $sql="SELECT g_id, g_name, start_path as g_path, ifnull(g_title,g_name) as g_title, g_counter
            FROM game_settings 
  join game_favorites using(g_id)          
  left join game_group using (gr_id)
  where g_view=1 and g_ver in($g_ver) and user_id=".$user_info['id']." group by  g_name order by game_favorites.id desc";
    else
      $sql=false;
    }
  else
    $sql="SELECT g_id, g_name, start_path as g_path, ifnull(g_title,g_name) as g_title, g_counter
            FROM game_settings
  left join game_group using (gr_id)
  join game_cat_rel using (g_id)
  where g_view=1 and g_ver in($g_ver)  and cat_href='$path' group by g_name order by rand()";
    }
    
  //echo $sql;
  $fav_games= $login ? $db->get_all("select g_id from game_favorites where user_id=".$user_info['id'],'g_id') : false;
  
  if($sql && $games=$db->get_all($sql))
    {
    foreach($games as $game)
      {
      echo '<li class="main__item preview">
                <div class="preview__item"><img src="'.THEME_URL.'/ico/'.$game['g_name'].'.png" class="preview__img" alt="'.$game['g_title'].'">
                    <div class="preview__overlay"><div class="preview__action"><a ';
                    if($login)
                      echo 'href= "/games/'.$game['g_path'].'/'.$game['g_name'].'/real"';
                    else  
                      echo 'data-toggle="modal" data-target="#login-modal" ';
              echo 'class="preview__button button button_color_orange">            </a><br><a
 href="/games/'.$game['g_path'].'/'.$game['g_name'].'/demo" rel="nofollow" class="preview__button preview__button_demo button
 button_color_green">        </a></div>';
 if(array_key_exists($game['g_id'],$fav_games))
  echo '<i class="preview__icon fa fa-star in_favorites" data-toggle="remove-fav" data-id="'.$game['g_id'].'" title="                                        "></i>';
 else
  echo '<i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="'.$game['g_id'].'" title="                                      "></i>';
  
  echo '</div>
                </div>
                <div class="preview__info">
                    <p class="preview__title">'.$game['g_title'].'</p>
                    <p class="preview__note">                         : '.$game['g_counter'].'</p>
                </div>
            </li>';
      }
    }
  else
    echo $db->error;  
  }  
  
?>