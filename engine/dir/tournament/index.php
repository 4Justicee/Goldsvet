<?php
	 $templ_name='tournament.tpl';

include_once( 'engine/inc/tournament_class.php');

if(isset($uri_parts[1]))
  {
  $tournament= new Tournament(intval($uri_parts[1]));
  $tournament->get_games();
  if(isset($uri_parts[2])&& $uri_parts[2]=='games')
    {
    $smarty->assign('games', $tournament->games);
    }
  else
    {  
  $tournament->get_prizes();
  $tournament->gamers(20);
  $tournament->info['type_txt']=$lang['adm_tournament_type_'.$tournament->info['type']];
  $place="&mdash;";
  foreach($tournament->gamers as $k=>$gamer)
    {
    if($gamer['user']==$login) 
      $place=$k+1;
    }
  
  if($tournament->info['title'])
    $title= $tournament->info['title'];
  
  $smarty->assign('place', $place); 
   }
  $smarty->assign('tournament', $tournament);  
  }
else
  {   
$cur_tour=$db->get_all("select * from tournaments where status=0 order by start_time asc, end_time asc limit 10");
foreach($cur_tour as $k=>$tour)
  {
  $tournament = new Tournament($tour['id']);
  $cur_tour[$k]['games']= $tournament->get_games();
  $cur_tour[$k]['prizes']= $tournament->get_prizes();
  $cur_tour[$k]['type_txt']=$lang['adm_tournament_type_'.$tour['type']];
  $cur_tour[$k]['minitxt']= $tournament->info['minitxt'];
  }

$end_tour=$db->get_all("select * from tournaments where status=1 limit 10");
foreach($end_tour as $k=>$tour)
  {
  $tournament = new Tournament($tour['id']);
  $end_tour[$k]['games']= $tournament->get_games();
  $end_tour[$k]['prizes']= $tournament->get_prizes();
  $end_tour[$k]['type_txt']=$lang['adm_tournament_type_'.$tour['type']];
  $end_tour[$k]['minitxt']= $tournament->info['minitxt'];
  }

$smarty->assign('cur_tour', $cur_tour);
$smarty->assign('end_tour', $end_tour);   
  }
?>