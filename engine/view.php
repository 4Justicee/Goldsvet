<?php
if (!isset($main_templ))
  $main_templ='main.tpl';
if (isset($templ_name)&& $main_templ!=$templ_name) 
   $smarty->assign('content_templ', $templ_name);
else
   $smarty->assign('content_templ', false); //                                 

if(isset($_SESSION['err_404']))
  {
  unset($_SESSION['err_404']);
  header("HTTP/1.0 404 Not Found");
  header("HTTP/1.1 404 Not Found");
  header("Status: 404 Not Found"); 
  }

if(!isset($title,$sub_title,$description,$keywords,$body) || (empty($title) ||empty($sub_title)||empty($description)||empty($keywords)||empty($body)))
  {
  list($title_i,$sub_title_i,$description_i,$keywords_i,$body_i)=mysql_fetch_row(mysql_query("select title,sub_title,description,keywords, body from pages where ge='index' and lang='$language'"));
  }

if(!isset($title) || empty($title))
  $title=$title_i;
if(!isset($sub_title) || empty($sub_title))
  $sub_title=$sub_title_i;  
if(!isset($description) || empty($description))
  $description=$description_i;
if(!isset($keywords) || empty($keywords))
  $keywords=$keywords_i;
if(!isset($body) || empty($body))
  $body=$body_i;
  
  //                                                                                 
  foreach($conf as $k=>$v)
    if(!is_array($v)) $body=str_replace("%$k%",$v,$body);

  $smarty->assign('content', $body);
  
$smarty->assign('title', $title);
$smarty->assign('sub_title', $sub_title);
$smarty->assign('description', $description);
$smarty->assign('keywords', $keywords);


$smarty->assign('config', $conf);
if(isset($user_info)&& $user_id)
  {
  //                           
  list($rating_name,$rating_color,$rating_level,$rating_pic)=mysql_fetch_row(mysql_query("select name, color, level, pic from users_rate_range where lang='$language' and level=".$user_info['rating']));
  $user_info['rating_name']= $rating_name;
  $user_info['rating_color']=$rating_color;
  $user_info['rating_level']=$rating_level;
  $user_info['rating_pic']=$rating_pic;
  
  $smarty->assign('user_info', $user_info);
  }
if(isset($user_id))
  $smarty->assign('user_id', $user_id);  

$smarty->assign('lang', $lang);
$smarty->assign('available_langs', $available_langs);
$smarty->assign('cur_lang',$language);
if (isset($ge)&& $ge!='index')
  $smarty->assign('ge', $ge);
$smarty->assign('theme_url', THEME_URL);
$smarty->assign('templ_theme', $templ_theme);


$smarty->assign('ref', $ref);
$smarty->assign('login', $login);
if (isset($status))
  $smarty->assign('status', $status);
else
  $smarty->assign('status', false);
@$smarty->assign('demomode', $demomode); 

$smarty->assign('balance',$balance); 
@$smarty->assign('balance_bonus',$balance_bonus); 

@$smarty->assign('real_balance',$real_balance);
@$smarty->assign('demo_balance',$demo_balance);

  $languages=get_languages();
$smarty->assign('languages',$languages);  

@$smarty->assign('href',$page_href);

//                                 
if(isset($_SESSION['messages']))
  {
  
  $smarty->assign('messages',$_SESSION['messages']);
  unset($_SESSION['messages']);
  }
else
  {
  $smarty->assign('messages',false);
  }
  
$res= mysql_query("select title, ge from pages where type=0 and ge<>'index' and lang='$language'");
  while($row=mysql_fetch_assoc($res))
    {
    $pages[]=$row;
    }
if(isset($pages))
  $smarty->assign('pages',$pages);

$sql="SELECT * from game_group join game_settings using (gr_id) where g_view=1 and g_ver in ($g_ver) order by position";
$res=mysql_query($sql);
if($res)
  {
  while($row=mysql_fetch_assoc($res))
    {
    $groups[$row['gr_id']]=$row['gr_name'];
    }
  }
$smarty->assign('game_groups',$groups);

fill_stat_game();

$sql="select game, login, stav, win, date_time, time(date_time) as `time` , stat_game.id from stat_game join users on (users.id=stat_game.user_id)  join game_settings on(game_settings.g_name=stat_game.game) where g_ver in ($g_ver) and win>0 union
      select game, login, stav, win, date_time, time(date_time) as `time`, 0 from stat_game_bot join game_settings on(game_settings.g_name=stat_game_bot.game) where g_ver in ($g_ver) order by date_time desc limit 10";

$res=mysql_query($sql) or print(mysql_error());
if($res)
  {
  while($row=mysql_fetch_assoc($res))
    {
      $g_name=$g_title=$row['game'];
      $path='';
      do
       {
      $sql="select start_path, g_title from game_settings join game_group using (gr_id) where g_name='".$g_name."'";
       $res1=mysql_query($sql);
       if(mysql_num_rows($res1)==0 && $pos=strrpos($g_name, '_' ))
         {
         $g_name=substr($row['game'], 0, $pos);
         }
       elseif($res1)
        {
        list($path,$g_title)=mysql_fetch_row($res1);
        }  
       }while(strrpos($g_name, '_' )&& mysql_num_rows($res1)==0);
    
          
    $last_win[]=array("time"=>$row['time'],"login"=>$row['login'],"stav"=>sprintf('%01.2f',$row['stav']),"win"=>sprintf('%01.2f',$row['win']), "game"=>$g_name, "title"=>$g_title,"path"=>$path, "title"=>$g_title);
    }
  }
if(!isset($last_win)) $last_win=array(); 
$smarty->assign('last_wins',$last_win);

$smarty->assign('po_name',$po_name);
$smarty->assign('theme_url', THEME_URL);

$sql = "SELECT 
          game, 
          stav, 
          start_path as g_path, 
          ifnull(g_title,g_name) as g_title, 
          sum(win) as suma
      FROM (select game, login, stav, win, date_time, time(date_time) as `time` , stat_game.id from `stat_game` join users on (users.id=stat_game.user_id)  where win>0 union 
            select game, login, stav, win, date_time, time(date_time) as `time` , 0 from stat_game_bot ) t1 join 
            game_settings t2 on (t1.game = t2.g_name) left join 
            game_group using (gr_id)
      WHERE date_time+interval 5 day > now() and win>0 and g_ver in ($g_ver)

GROUP BY game order by 5 desc limit 10";
$res=mysql_query($sql) or save_log($sql."\r\n".mysql_query(),"db_error.log");
  if($res)
    while($row=mysql_fetch_assoc($res))
      {
        $payout_block[]=$row;
      }        
if(!isset($payout_block)) $payout_block=false;  
  $smarty->assign('payout_block',$payout_block); 

/* 
if(isset($pay_mods))
  {
  $smarty->assign('paysys_count',count($pay_mods));
  $smarty->assign('pay_mods',$pay_mods);
  }
else
   $smarty->assign('paysys_count',0);
$fill_ps=false;
  $ps=array();
  $ps[0]=$lang['out_ps_select']; 
    
  if($conf['allow_qiwi'])
    {
    if(isset($user_info['qiwi'])&&$user_info['qiwi'])
      {
      $ps['qiwi']=$lang['out_QIWI'];
      if(!$fill_ps) $fill_ps=true;
      }
    }	
  if ($conf['allow_wmr'])
    {
    if(isset($user_info['wmr']) && $user_info['wmr'])
      {
      $ps['wmr']=$lang['out_WMR'];
      if(!$fill_ps) $fill_ps=true;
      }
    }
*/	

  $courses=$db->get_all("select * from users_rate_range where lang='$language'",'level');
  foreach ($courses as $k=>$cours)
    {
    $cours_=explode('|',$cours['point_cours']);
    $courses[$k]['cours']= $cours_[0];
    }
  
  if($user_id>0)
    $point_bar=  ($user_info['rating']-1)*100*0.17+ round(($user_info['payin_total']-$courses[$user_info['rating']]['range'])/($courses[$user_info['rating']+1]['range']-$courses[$user_info['rating']]['range'])*100)*0.17;
  else
    $point_bar=0;  
    
  $smarty->assign("point_courses",$courses);
  if($user_id>0) 
    $smarty->assign("point_cours_row",$courses[$user_info['rating']]);
  else
    $smarty->assign("point_cours_row",$courses[1]);
  $smarty->assign("point_bar",$point_bar);
  
$cur_tour_one=new Tournament();

if($cur_tour_one->tour_id)
  $cur_tour_one->info['gamers']=$cur_tour_one->gamers(10);   
$smarty->assign("cur_tour_one",$cur_tour_one->info);


foreach($game_cats as $game_cat)
  {
  if($game_cat['parent']==0)
    {
    $cat_bar[$game_cat['href']]=array('id'=>$game_cat['id'],'href'=>'/'.trim($game_cat['href'], '/'),'name'=>$game_cat['name'],'pos'=>$game_cat['pos']);
    
    $cat_bar[$game_cat['href']]['subcats']=$db->get_all("select * from game_cat where view=1 and parent=".$game_cat['id'],"href");
    }
  }


if(isset($cur_cat))
  $cat_bar[$cur_cat]['active']=true;
if(isset($cur_subcat))
   $cat_bar[$cur_cat]['subcats'][$cur_subcat]['active']=true;

$smarty->assign('cat_bar',$cat_bar);
//var_dump($cur_cat);
//die();
   
if(isset($cur_cat))
  {
  
  $b1_limit=isset($conf['game_block_count']) ? explode('|',$conf['game_block_count']): array(18,10,3);
  
  $counter_time=isset($conf['g_counter_time']) ? $conf['g_counter_time'] : 0;
  
  if($counter_time+60*15 < time() )
    {
    $db->run("update game_settings set g_counter=floor(rand()*9) + concat(floor(rand()*9),floor(rand()*9))");
    $db->run("update settings set val='".time()."' where key_name='g_counter_time'");
    }

  $fav_games= $login ? $db->get_all("select g_id from game_favorites where user_id=".$user_info['id'],'g_id') : false;
  
  
  
  if($cur_cat=='')
    $sql="SELECT g_id, g_name, start_path as g_path, ifnull(g_title,g_name) as g_title, g_counter
            FROM game_settings 
  left join game_group using (gr_id)
  where g_view=1 and g_ver in ($g_ver) group by  g_name order by rand() limit ".max($b1_limit);
  elseif($cur_cat=='favorites')
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
  where g_view=1 and g_ver in($g_ver)  and cat_href='".(isset($cur_subcat) ? $cur_subcat : $cur_cat)."' group by g_name order by rand()";

  
  $game_block1=$sql? $db->get_all($sql): false;
  if(!$game_block1 && $cur_cat=='favorites')
    {
    $_SESSION['messages'][]=array('er','                                                                                ');
    header('location: '.$_SERVER['HTTP_REFERER']);
     die();
    }
    //$smarty->assign('messages',array(array('er','                                                                                ')));
  if($game_block1)
  foreach($game_block1 as $k=>$game)
    {
    if($fav_games && array_key_exists($game['g_id'],$fav_games))
      $game_block1[$k]['favorites']=true;
    else  
      $game_block1[$k]['favorites']=false;
    }  
  
  
  if(isset($game_block1))   
  $smarty->assign('game_block1',$game_block1);
  $smarty->assign('b1_limit',$b1_limit);
  }
  $jack_sum=substr(round(time()/3*5),-8);
  $smarty->assign('jack_sum',$jack_sum);
  
  $history=$db->get_all($sql="select inv_code, from_unixtime(`date`) as `date`, abs(`sum`) as `sum`, paysys, if(sum>0,'              ','          ') as type from enter where login='$login' and status=2 and paysys!='return' 
                            union  
                         select inv_code, from_unixtime(`date`) as `date`, `sum`, ps, if(status=0,'                ','            ') from output where status in (0,3) and login= '$login' order by 2 desc limit 20");
  foreach($history as $k=>$row)
    {
    if(strpos($row['paysys'],'bonus')!==false)
      {
      $history[$k]['type']="          ";
      }
    }
  $smarty->assign('history',$history);
  
  if(isset($templ_name))
    $smarty->assign('content_templ', $templ_name);
  
  $smarty->assign("bonus_reg",$bonus_reg);
  $smarty->assign("bonuses",$bonuses);
  
  //var_dump(isset($active_bonus_bar)? $active_bonus_bar :false);
  $smarty->assign("active_bonus_bar",(isset($active_bonus_bar)? $active_bonus_bar :false));

if(isset($user_info['rating']))
  {  
  $lang['info_lvl']=str_replace('X',$courses[$user_info['rating']+1]['range']-$user_info['payin_total'],$lang['info_lvl']);
  $lang['info_wager']=str_replace('X',$active_bonus_bar['rest'],$lang['info_wager']);
  }
  
  $smarty->assign('lang',$lang);
  
  
  $smarty->assign("is_mobile",$is_mobile);
  
  $smarty->assign("payways",$trioApi_payways);
  $smarty->assign("outways",$trioApi_outways);
                                              
  if(isset($_REQUEST['q']))
    $smarty->assign("q",$_REQUEST['q']);
  else  
    $smarty->assign("q",false);
  
  //$smarty->assign('adapters', $adapters);
     

if(isset($game_name))
  $smarty->assign('game_name',$game_name);
//$smarty->assign('fill_ps',$fill_ps);
//$smarty->assign('ps',$ps);
$smarty->display($main_templ);


?>