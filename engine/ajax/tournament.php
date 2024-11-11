<?php
require_once ('../cfg.php');
require_once ('../ini.php');
require_once('../inc/tournament_class.php');


$action=isset($_REQUEST['action'])?$_REQUEST['action']:'gamers_list';

if($action=='gamers_list')
  {
  $tour_id=isset($_REQUEST['id'])? intval($_REQUEST['id']) : false;
  $tour=new Tournament($tour_id);
  
  
  $gamers=$tour->gamers(10);
  if($gamers)
    $answer=array('success'=>true,'gamers'=>$gamers);
  else
    $answer=array('success'=>false,'error'=>$tour->error);  
  }
elseif($action=='get_info')
  {
  $tour_id=isset($_REQUEST['id'])? intval($_REQUEST['id']) : false;
  $tour=new Tournament($tour_id);
  if($tour)
    {
    $tour->get_games();
    $tour->get_prizes();
    $answer=array('success'=>true,'tour'=>$tour);
    }
  else
    $answer=array('success'=>false,'error'=>'                              ');
  }
elseif($action=='del')
  {
  $tour_id=isset($_REQUEST['id'])? intval($_REQUEST['id']) : false;
  $tour=new Tournament($tour_id);
  if($tour->del())
    {
    $answer=array('success'=>true);
    }
  else
    $answer=array('success'=>false,'error'=>$tour->error);
  }
elseif($action=='mailing')
  {
  $tour_id=isset($_REQUEST['id'])? intval($_REQUEST['id']) : false;
  $tour=new Tournament($tour_id);
  if($tour->set_mailing())
    {
    $answer=array('success'=>true);
    }
  else
    $answer=array('success'=>false,'error'=>$tour->error);
  }



 if(isset($error))
    $answer=array('success'=>false,'error'=>$error);
  elseif(!isset($answer))
    $answer=array('success'=>false,'error'=>'                                  ');
  
  echo json_encode($answer);  
?>