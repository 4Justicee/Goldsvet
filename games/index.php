<?php
include "../engine/cfg.php";
include "../engine/ini.php";
if(isset($user_action))
  {
if($user_action==4)//                                 
  {    
  $_SESSION['messages'][]=array('er', $lang['err_game_block']);
    header("location: /");
    die();
  }
  }

/*if(!in_array ($status, $can_game))
    {
    $_SESSION['messages'][]=array("er", $lang['err_no_access_game']);
    header("location: /");
    die();
    }
*/  

$referer=isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER'] : '/';

//$referer="http://test50/games/3d/heist/index2.swf?game=heist&min=&user=real&CURDENOM=1,2,3,4,5,10,15,20,30,40,50,100&cur=1&tpl=/engine/templates/default&keys=49:1;50:2;51:3;52:4;53:5;54:6;55:7;56:8;57:9;13:10;48:10;109:11;107:12&use_logo=1&float_bet=0&use_bg=1&use_exit1=1&use_exit2=1&stretch_mode=1&use_denom=0&use_jacks=1&use_update=0&use_collect=1&use_fullscreen=1&win_mode=1&use_faststop=0&use_stretch=0&use_sound=1&use_bonus_stop=1&use_win_stop=%200&use_jack_stop=1&hide_buttons=0&use_return_stop=1&use_prize_stop=1&denom_mode=0&bg_color=000000";
//$referer=parse_url($referer);

if(preg_match('`games`', $referer))
  $referer=$_SESSION['referer'];
else
  $_SESSION['referer']=$referer;  

if($referer!='/')
  setcookie('redirect',$referer,0,'/');


$smarty->assign('referer',$referer);
  
$url_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$conf['loto_use']=false;

		  //                                           URL                     "/"
  trim($url_path, ' /');
  if(!empty($url_path))
    {    
    $uri_parts = explode('/', trim($url_path, ' /'));
    }

if(count($uri_parts)==1)
  {
  $games_group= $db->get_all("select * from game_group join game_settings using (gr_id) where g_view=1 and g_ver in ($g_ver) order by game_group.position");
  
  foreach ($games_group as $row)
    {
    $games[$row['start_path']][]=$row;
    }
    
  $smarty->assign('games',$games);
  $templ_name='game_list.tpl';
  include_once "../engine/view.php";  //                                                                                      
  }
else
  { 
  
$g_name=$uri_parts[2];
$g_mode=isset($uri_parts[3]) ? $uri_parts[3]: 'real';
$g_series=$uri_parts[1];

if($g_mode=='log')
  {
  $keys="49:1;50:2;51:3;52:4;53:5;54:6;55:7;56:8;57:9;13:10;48:10;109:11;107:12";   
	 
	 /////////////////////////
	 $use_logo=$conf['game_use_logo'];
     $use_bg=$conf['game_use_bg'];
     $use_jacks=$conf['game_use_jacks'];
     $use_exit1=$conf['game_use_exit1'];
     $use_exit2=$conf['game_use_exit2'];
     $use_collect=$conf['game_use_collect'];
     $use_denom=$conf['game_use_denom'];
     $use_update=$conf['game_use_update'];
     $denom_mode=$conf['game_denom_mode'];
     $win_mode=$conf['game_win_mode'];
     $use_faststop=$conf['game_use_faststop'];
     $stretch_mode=$conf['game_stretch_mode'];
     $use_stretch=$conf['game_use_stretch'];
     $use_fullscreen=$conf['game_use_fullscreen'];
     $use_sound=$conf['game_use_sound'];
     $hide_buttons=$conf['game_hide_buttons'];
     $use_bonus_stop=$conf['game_use_bonus_stop'];
     $use_win_stop=$conf['game_use_win_stop'];
     $use_jack_stop=$conf['game_use_jack_stop'];
     $use_return_stop=$conf['game_use_return_stop'];
     $use_prize_stop=$conf['game_use_prize_stop'];
     $bg_color=$conf['game_bg_color'];
  
  
  $loger=get_log_strings($_GET['log_id']);
  define('GAME_NAME',substr($ge,2));
  if($g_name=="sizzlinghot_dx" || $g_name=="justjewels_dx" || $g_name=="lordofoceans" || $g_name=="mermaids" || $g_name=="magicprincess"){
  $ldr_name="../index.swf";
  }else{
	$ldr_name="index.swf";  
  }
		 
		$dnm=rtrim($user_denomination, '0.');
		$param=$ldr_name."?game=$g_name&min=&user=real&cur=$dnm&tpl=/engine/templates/default";
		$param.="&keys=$keys&view_keys=".$conf['view_keys']."&use_logo=$use_logo&use_bg=$use_bg&use_exit1=$use_exit1&use_exit2=$use_exit2&stretch_mode=$stretch_mode";
		$param.="&use_denom=$use_denom&use_jacks=$use_jacks&use_update=$use_update&use_collect=$use_collect&use_fullscreen=$use_fullscreen";
		$param.="&win_mode=$win_mode&use_faststop=$use_faststop&use_stretch=$use_stretch&use_sound=$use_sound";
		$param.="&use_bonus_stop=$use_bonus_stop&use_win_stop= $use_win_stop&use_jack_stop=$use_jack_stop&hide_buttons=$hide_buttons";
		$param.="&use_return_stop=$use_return_stop&use_prize_stop=$use_prize_stop&denom_mode=$denom_mode&bg_color=$bg_color";
    if ($loger)
      $param.="&loger=".$loger;
    $main_templ='game/log.tpl';
		$smarty->template_dir=array(ENGINE_DIR.'/templates/default');
    $smarty->assign('theme', '/engine/templates/default');
		$smarty->assign('param', $param);
		$smarty->assign('path',$path);
    $smarty->assign('title',$ge);
    $smarty->assign('game_name',$g_name);
    include_once (ENGINE_DIR."/view.php");
    die();
  }
if(!in_array ($status, $can_game)&&$g_mode!='demo')
	{    
		$_SESSION['messages'][]=array('er', $lang['err_no_access_game']);
		header("location: /");
    die();
	}


$sql="select * from game_settings left join game_page using (g_id) where g_view=1 and g_ver in($g_ver) and room_id=$room";
$res=$db->get_all($sql);
$allow_start_game=false;
foreach($res as $row)
  {
  if($row['g_name']==$g_name)
    {
    $allow_start_game=true;
    if(!empty($row['title']))
      $title=$row['title'];
    if(!empty($row['description']))  
      $description=$row['description'];
    if(!empty($row['keywords']))  
      $keywords=$row['keywords'];
    if(!empty($row['txt']))  
      $body=$row['txt'];

    $is_fav=$db->get_one("select * from game_favorites where g_id=".$row['g_id']." and user_id=".$user_id)? true : false;
    
    $smarty->assign("is_fav",$is_fav);
    $smarty->assign("g_id",$row['g_id']);
    break;  
    }
  }
  
//var_dump($allow_start_game);
//die();

  
if($allow_start_game)
  {
  if(file_exists($g_series."/".$g_name."/index.php"))
    {
    $smarty->assign('game_name',$g_name);
    
    if($g_mode=='real' &&$user_id==0)
      {
      $_SESSION['messages'][]=array('er', $lang['err_no_access_game']);
      header("location: /");
      die();
      }

    if($g_mode=='demo')
      {
      $user_info['demomode']=$demomode=true;
      $start_demobalance=$user_info['demobalance']=isset($conf['start_demobalance'])? $conf['start_demobalance'] : '5000';
      $start_demobank=isset($conf['start_demobank'])? $conf['start_demobank'] : '1000000';
      if($user_id)
        $db->run($sql="update users set demomode=1, demobalance=$start_demobalance where login='".$login."'");
      else  
        $db->run($sql="update users_tmp set demobalance=$start_demobalance where sid='".session_id()."'");
      $db->run($sql="update game_settings set g_bank=$start_demobank where g_name='demobank'");
  
      }
    elseif($g_mode=='real')
      {
      $user_info['demomode']=$demomode=false;
      $db->run("update users set demomode=0 where id=$user_id"); 
      }

    
    $b1_limit=isset($conf['game_block_count']) ? explode('|',$conf['game_block_count']): array(18,10,3);
    //echo "<pre>";
    //var_dump($game_cats);
    //echo "</pre>";
    
    foreach($game_cats as $id=>$cat)
      {
      
      if($cat['pos']==0) //top games
        {
        $sql="SELECT g_id, g_name, start_path, ifnull(g_title,g_name) as g_title, g_counter
            FROM game_settings 
  left join game_group using (gr_id)
  where g_view=1 and g_ver in($g_ver) group by  g_name order by rand() limit ".$b1_limit[1];
        $games[$cat['id']]=$db->get_all($sql);
        }
      elseif($id=='favorites')
        {
        if ($login)
          {
        $sql="SELECT g_id, g_name, start_path as g_path, ifnull(g_title,g_name) as g_title, g_counter
            FROM game_settings 
        join game_favorites using(g_id)          
        left join game_group using (gr_id)
        where g_view=1 and g_ver in($g_ver) and user_id=".$user_info['id']." group by  g_name order by game_favorites.id desc";
          $games[$cat['id']]=$db->get_all($sql);
          }
          else
            $games[$cat['id']]=array();
    }  
      elseif($cat['parent']=='0')
        $games[$cat['id']]=$db->get_all("select * from game_settings join game_group using (gr_id) join game_cat_rel using(g_id) where cat_href='".$cat['href']."' and g_view=1 and g_ver in($g_ver) limit 10");
      
      }      
    
    $smarty->assign('games', $games);
    
    include ($g_series."/".$g_name."/index.php");
    }
  else
    {
    $_SESSION['messages'][]=array('er', $lang['err_no_start_game']);
    header("location: /");
    die();
    }  
  }
else  
  {
  $_SESSION['messages'][]=array('er', $lang['err_no_game']);
  header("location: /");
  die();
  }
  }
?>