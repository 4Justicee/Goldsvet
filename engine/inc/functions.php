<?php

error_reporting( E_ERROR );

include('report_functions.php');
 
function getip()                      
{               
  $ip = FALSE;
 
    if (isset($_SERVER['HTTP_CLIENT_IP']) && filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] !== '') {
        $ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
 
        for ($i = 0; $i < count($ips); $i++) {            
            if (!preg_match ("/^(10|172\.16|192\.168)\./i", $ips[$i])) {
                if(filter_var($ips[$i], FILTER_VALIDATE_IP)) {
                    $ip = $ips[$i];
                }
            }
        }
    }
    
    $result = ($ip !== FALSE &&
        $ip != '127.0.0.1' &&
        $ip != '::1' &&
        $ip != $_SERVER['SERVER_ADDR']) ? $ip : $_SERVER['REMOTE_ADDR'];
 
    return $result;
}

function generator($case1, $case2, $case3, $case4, $num1) {
	$password = "";

	$small="abcdefghijklmnopqrstuvwxyz";
	$large="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$numbers="1234567890";
	$symbols="~!#$%^&*()_+-=,./<>?|:;@";

	for ($i=0; $i<$num1; $i++) {

    $type=rand(1,4);
		switch ($type) {
		case 1:
			if ($case1 == "on") { $password .= $large[rand(0,25)]; } else { $i--; }
			break;
		case 2:
			if ($case2 == "on") { $password .= $small[rand(0,25)]; } else { $i--; }
			break;
		case 3:
			if ($case3 == "on") { $password .= $numbers[rand(0,9)]; } else { $i--; }
			break;
		case 4:
			if ($case4 == "on") { $password .= $symbols[rand(0,23)]; } else { $i--; }
			break;
		}
	}
	return $password;
}


function as_md5( $key, $pass,$getsql=false )
{
 global $debug;
  $sql = "md5(concat('". $key."',md5(concat('Z&','$key','x_V',".$pass."))))"; 
	
    
  $pass = md5( $key.md5( "Z&".$key."x_V".htmlspecialchars( $pass, ENT_QUOTES, 'UTF-8' ))  );  
  if ($getsql)
	  return $sql;
  else	 
    return $pass;
}

 
function gen_key($host)
{
  $str='0123456789ABCDEFGHIJQKLMNOPRSTXYZ';
  $md5= md5( "RecfXBq_g~C".md5( $host));
  $res='';
  for ($i=0;$i<=15;$i++)
    {
    $res.=$str{intval($md5{$i},16)+intval($md5{$i+16},16)};
    if (($i+1)%4==0 && $i<15)
	     $res.='-';
    }
  return $res;  
}

 
function get_jackpots($room)
    {
    global $user_denomination; 
    
    if(!$user_denomination) $user_denomination=1;
    
    $jack_rows=array();
    $sql= "select jackpots.*,  jackpots.balance/$user_denomination as balance,  jackpots.pay_sum/$user_denomination as pay_sum from jackpots join rooms on (jackpots.room_id=rooms.id) where rooms.id=$room ";
    $res=mysql_query($sql);
    if($res && mysql_num_rows($res)>0)
      {
      while($row=mysql_fetch_array($res))
        {
        $jack_rows[]=$row;
        }
      }
    while(count($jack_rows)<3)
      $jack_rows[]= array('balance'=>0);   
      
    
    return  $jack_rows;
    }
function floor_format_($balance){

global $conf;


if($conf['float_bet']==1){

$return_balance=$balance;	
	
}else{

$return_balance=floor($balance);	
	
}
	
return 	$return_balance;
} 
function floor_format($balance){

global $conf;

//simon
//$bets=isset($conf['bets'])? $conf['bets']: '1,2,3,5,10,15,20,30,40,50,100';

$bets=isset($conf['bets'])? $conf['bets']: '0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.6,0.7,0.8,0.9,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0';

$bets_a=explode(",",$bets);	
$return_balance=0;
if($bets_a[0]<1 || $conf['float_bet']>=1){

$return_balance=$balance;	
	
}else{

$return_balance=floor($balance);	
	
}
	
return 	$return_balance;
}
 
//                                                                    
function get_balance($id,$type=1)
  {
  /*$type=1 -                                      
          2 -                      */
  global $conf, $room,$user_denomination,$demomode,$db;
       
  if ($type==1)  
    {
    if(!$id)
      $sql= "select * from users_tmp where sid='".session_id()."'";
    else  
      $sql="select * from users where id=$id";
      
      
    @$user_row=mysql_fetch_array(mysql_query($sql));
    if(isset($user_row['status']) && $user_row['status']==4)
      $balance=get_balance($user_row['room_id'],2);
    else
      $balance=$demomode ? $user_row['demobalance']: ($user_row['balance']);  
    }
  else
    {$sql="select balance from rooms where id=$id";
    if ($res=mysql_query($sql))
      $balance=(mysql_num_rows($res)==1)? mysql_result($res,0): false;
    else
      $balance=false;
    }  
  
  
  if(preg_match('~(games/)(.+)(/ge_server.php|ge_init.php)~i',$_SERVER['PHP_SELF'],$matches))
    {//                          ,                                             
    $balance=$balance/$user_denomination;
    //                                                 ,                                          
    
    /*$game= substr($matches[2],strpos($matches[2],'/')+1);
    
    
    if($freespin=Bonus::get_active('freespin'))
      {
      $freespin['g_name']=$db->get_one("select g_name from game_settings where g_id=".$freespin['g_id']);
      if($game==$freespin['g_name'])
        $balance=(intval($freespin['perc'])*intval($freespin['koef'])*(intval($freespin['max_bon']-$freespin['spin'])));
      } */
  
    }  
    
  return sprintf("%01.2f", $balance);
  } 

function cange_balance($id, $sum, $game_balance=true)
  {
  global $conf,$user_denomination,$login,$demomode,$user_info,$db,$action;
  
  //save_log("cange_balance($id, $sum, $game_balance)",'ch_bal.log');
  
  $url_path=explode('/',$_SERVER['PHP_SELF']);
  $game_group= $url_path[2];
  
  $game_group_without_wager=array('table','loto');
  
  if (strpos($_SERVER['PHP_SELF'],'ge_server.php') && $user_denomination!=1)
    {$sum=$sum*$user_denomination;
    }
    
  if($demomode)
    {
    if($sum+$user_info['demobalance']<0)
      return false;
    else  
      {
      if($id)
        $db->run($sql="update users set demobalance=demobalance+$sum where id=$id");
      else
        $db->run($sql="update users_tmp set demobalance=demobalance+$sum where sid='".session_id()."'");
      return $sum+$user_info['demobalance'];
      }
    }  
  
  if(preg_match('~(games/)(.+)(/ge_server.php|ge_init.php)~i',$_SERVER['PHP_SELF'],$matches))
    {
    //                                                 
    
    $game= substr($matches[2],strpos($matches[2],'/')+1);
    
    
    if($freespin=freespin_Bonus::is_active($game))
      {
        if($sum>0  || ($sum<0 &&$action=='double'))
          {
          $sql= "UPDATE LOW_PRIORITY bonus_user set win=win+$sum where status='1' and bonus_id=".$freespin['bonus_id']." and user_id=".$id;
          $db->run($sql);
          }
        return $balance+$sum;
      }
    }
    
  
  $row=$db->get_row("select balance, wager, demobalance from users where id=$id");
  
  $balance=$row['balance'];
  $wager=$row['wager'];
  $demobalance=$row['demobalance'];

    if ($sum>0) //                                             
      {
      $sql= "UPDATE LOW_PRIORITY users set balance=balance+$sum where id=$id";
      $db->run($sql);
      return $balance+$sum;
      }
    else
      { //                                                 
    
    
    $pay=$sum*-1;
    if ($pay>$balance)
      return null;
    else
      {
      
      if ($pay<$balance)
        {
        if(in_array($game_group,$game_group_without_wager))
          $new_wager=$wager;
        else   
          $new_wager=$wager-$pay>=0 ? $wager-$pay : 0;
        //$balance_bonus=$user_info['balance_bonus']-$pay>0 ? $user_info['balance_bonus']-$pay : 0; 
        //mysql_query($sql="update users set balance=balance-$pay,wager=$new_wager, balance_bonus=$balance_bonus where id=$id")or save_log($sql."\r\n".mysql_error(),"db_error");
        $db->run($sql="update users set balance=balance-$pay,wager=$new_wager where id=$id");
        }
      else
        {
        $db->run($sql="update users set balance=balance-$pay, wager=0,wager_bonus=0, balance_bonus=0 where id=$id");
        }
        
      if($new_wager==0 || $pay==$balance) //                                          
          {
          if($dep_bon=Bonus::get_active('dep'))
            Bonus::deactivate($dep_bon);
          
          if($nondep_bon=Bonus::get_active('nondep'))
            Bonus::deactivate($nondep_bon);
          }  
      return $balance-$pay;   
      }  
    }
  }
  
function change_balance($sum, $user, $ps='adm', $to_save=true)
  {
  global $user_id,$user_info,$demomode,$conf,$status,$db,$language;
  
  $balance_field=$demomode?'demobalance':'balance';
  
  if (strpos($_SERVER['PHP_SELF'],'ge_server.php') && $user_info['denomination']!=1&& $user_info['denomination']!=0)
    {
    $sum=$sum*$user_info['denomination'];
    }
    
  $payed_spin='';  
  if($status==1)
                  {
                  $conf['payed_spins_fixed']=$db->get_one('select val from settings where key_name="payed_spins_fixed" and room_id=1');
                  $conf['payed_spins_val']=$db->get_one('select val from settings where key_name="payed_spins_val" and room_id=1');
                  }
                  
                if($conf['payed_spins_fixed'])
                   $payed_spin=$sum>0 ? $conf['payed_spins_val']: 0;
                else
                  {
                  $spin_koef=isset($conf['spin_koef'])?$conf['spin_koef']:10;
                  $payed_spin=$sum*$spin_koef>0? $sum*$spin_koef: ($user_info['payed_spins']+$sum*$spin_koef>=0 ? $user_info['payed_spins']+$sum*$spin_koef : 0);
                  }  
  
    
  if($sum>0)  
    {
    if ($user_info['payed_spins']<=0)
      {
      $a_garant=explode("|",$user_info['garant']);
      $win_koef=isset($conf['win_koef'])? $conf['win_koef'] : 2;
      $a_garant[0]=round($a_garant[0]/$win_koef);
      $garant_sql=", garant='".implode("|",$a_garant)."'";
      }
    else
      $garant_sql="" ; 
    
    //pay_points
    $pay_points_perc=isset($conf['points_pay'])? $conf['points_pay']: '0.25';
    //                                                             VIP
    if($vip_bon = Bonus::get_active('vip'))
      {
      $pay_points_perc=$pay_points_perc*$vip_bon['koef'];
      }
    $pay_points_sql=($ps=='pay_point' || strpos($ps,'bonus')===0)? "" : ", pay_points=pay_points+".($sum*$pay_points_perc);
    $payin_sum=($ps=='pay_point' || strpos($ps,'bonus')===0)? 0 : $sum;
    $payin= ($user_info['payin']+$payin_sum>=0) ? $user_info['payin']+$payin_sum : 0;
    
    if(strpos($ps,'bonus')!==false)
      {
      $payin='payin';
      $payin_sum=0;
      }
    
    //                
    $rating_row=$db->get_row($sql="select level,bonus_sum from users_rate_range where lang='$language' and `range`<=(select payin_total from users where id=$user)+".$payin_sum." order by `range` desc");
    $rating= $rating_row['level'];
    if($rating!=$user_info['rating'])
      {
      $rating_sql=", rating=$rating";
      $sum+=$rating_row['bonus_sum'];
      save_stat_pay($rating_row['bonus_sum'],"id:".$user,2,'vip_bonus',$inv_code);
      }
    else
      {
      $rating_sql= "";
      }
                                                                                                                  
    //$sql="update users set balance=balance+$sum, payin= $payin,payin_total=payin_total+$payin_sum, payed_spins=$payed_spin, can_outpay=1 $garant_sql $rating_sql $pay_points_sql where id=$user and balance+$sum>=0";
        $sql="update users set balance=balance+$sum, payin=payin + $payin,payin_total=payin_total+$payin_sum, payed_spins=$payed_spin, can_outpay=1 $garant_sql $rating_sql $pay_points_sql where id=$user and balance+$sum>=0"; //simon
    }
  else  
    $sql="update users set balance=balance+$sum, payin=payin-$sum where id=$user and balance+$sum>=0";
  if($db->run($sql))
    {
    //mysql_query("insert into payments values (null, now(),$user_id,$user,$sum,'$ps',".$user_info['denomination'].")");
    if($sum>0)
      $db->run("update rooms set pay_in=pay_in+$sum");
    else
      $db->run("update rooms set pay_out=pay_out+$sum*-1");
    
    if($user_info[$balance_field]+$sum==0)
      $db->run("update users set wager=0 where id=$user");
    
    return  "success| ".sprintf("%01.2f",$user_info[$balance_field]+$sum);
    }
  else
    $error="                                                                        ";  
  if(isset($error))
    return 'error|'.$error;
    
  } 
  
 
function get_bank($user_id, $g_name, $bank_type='spin')
  {
  global $debug,$action,$key,$conf,$room,$user_denomination,$rnd_bonus,$demomode,$coins,$user_info;
  
  $logfile=$g_name.'_bank.log';                                                  
  if($debug) save_log ("***********  ".date('Y-m-d H:i:s')."  ***************", $logfile);
  if($debug) save_log ("user_id=$user_id,game=$g_name", $logfile);
  if($bank_type=='double') $bank_type='spin';
  if($demomode)//                                                                                     
    {
    $sql="select * from game_settings where g_name='demobank' and room_id=$room";
  
   $row=mysql_fetch_assoc(mysql_query($sql));
      return $row['g_bank'];
    }
  
   if($debug) save_log ("user_denomination=".$user_denomination, $logfile);
  //$bet=get_bet($g_name,false);
  $bet_sum=$user_denomination? get_bet($g_name)*$user_denomination: get_bet($g_name);
  $bet=$user_denomination? get_bet($g_name,true)*$user_denomination: get_bet($g_name,true);
  
   if($debug) save_log ("bet=".$bet, $logfile);
  
   
   if($debug) save_log ("action=".$action, $logfile);
   if($debug) save_log ("rnd_bonus=".$rnd_bonus, $logfile);
  
   $bank_field=$bank_type.'_bank';
   
   if(isset($_SESSION['cell_win']))
    {
    $bank_field.='+'.$_SESSION['cell_win'];
    }
   
   if($debug) save_log ("bank_field=".$bank_field, $logfile);
   
   $bank_table= 'room_banks';
   if($debug) save_log ("bank_table=".$bank_table, $logfile);
   
   if($debug) save_log ("bet=".$bet, $logfile);
   
    if(($action=="spin" && $rnd_bonus!=1)||($g_name=='garage' && $action=='ge_play'))
      {
      $bet=isset($bet)? $bet : $coins;
      if(in_array($g_name,$conf['table_games']))
        $sql="select id from room_banks where from_bet=-2 and room_id=$room";
      else  
        $sql="select id from room_banks where $bet>from_bet and $bet<=to_bet and room_id=$room";
      if($debug) save_log ($sql, $logfile);
      if ($res=mysql_query($sql))
        {
        $bank_id=mysql_result($res,0);
        $_SESSION['bank_id']=$bank_id;
        }
      else
        if($debug) save_log (mysql_error(), $logfile);
      }
    else
      $bank_id=$_SESSION['bank_id'];      
   
   if($debug) save_log ("bank_id=".$bank_id, $logfile); 
   
   $sql="select $bank_field from $bank_table where id=$bank_id";
   
   $bank_sum=mysql_result(mysql_query($sql),0);
   if($debug) save_log ("bank(not denom)=".$bank_sum, $logfile);
   
    if (strpos($_SERVER['PHP_SELF'],'ge_server.php') && $user_denomination!=1)
      $bank_sum=$bank_sum/$user_denomination;
  
    save_log ('garant:'.print_r($user_info['garant'],1), $logfile);
    
    /*if($conf['garant_win_on'] && isset($user_info['garant'])&& action_match('spin'))
      {
         $allbet=get_bet($g_name);
         $bet_bank=$bank_sum;
         if(action_match('spin')) $bet_bank= $allbet*$user_info['garant'][1];
         elseif(!action_match('double')) $bet_bank= $allbet*$user_info['garant_bonus'][1];
         $bank_sum=$bet_bank>$bank_sum? $bank_sum: $bet_bank;
         if ($debug) save_log ('garant_win_bank:'.$bank_sum, $logfile); 
      }
    */  
   return $bank_sum;
  }
  
function get_bank_($action,$bet,$user_info)
  {
  global $conf,$user_denomination;
  if($user_info['demomode'])//                                                                                     
    {
    $sql="select * from game_settings where g_name='demobank' and room_id=".$user_info['room_id'];
  
   $row=mysql_fetch_assoc(mysql_query($sql));
      return $row['g_bank'];
    }
    
  $bank_field=$action."_bank";  
  
  $bank_table= 'room_banks'; 
  
  $bet=$bet*$user_info['denomination']; 
  
  
    if($action=="spin" || $action=='bonus')
      {
      $sql="select id from room_banks where $bet>from_bet and $bet<=to_bet and room_id=".$user_info['room_id'];
      if ($res=mysql_query($sql))
        {
        $bank_id=mysql_result($res,0);
        $_SESSION['bank_id']=$bank_id;
        }
      else
        if($debug) save_log (mysql_error(), 'db_error.log');
      }
    else
      $bank_id=$_SESSION['bank_id'];      
   
   
   $sql="select $bank_field from $bank_table where id=$bank_id";
   save_log($sql,'sql.log');
   $bank_sum=mysql_result(mysql_query($sql),0);
  
  return $bank_sum; 
  } 
  
  
function change_bank($user_id, $g_name, $bank_sum,$bank_type='spin')
  {
  global $debug,$action, $conf,$room,$user_denomination,$rnd_bonus,$demomode,$db, $user_info;
  
  $logfile=$g_name.'_cbank.log';
  save_log("=============".date("Y-m-d H:i:s")."============",$logfile);
  save_log("change_bank($user_id, $g_name, $bank_sum,$bank_type)",$logfile);
  
  if($bank_type=='double') $bank_type='spin';
  
  if($demomode)
    {
    set_game_settings('demobank','g_bank',"g_bank+".$bank_sum);
    return;
    }
    
  $pay_in=$user_info['balance'];  // simon
 //    $pay_in=$user_info['payin'];
  $bet_sum=$user_denomination? get_bet($g_name)*$user_denomination: get_bet($g_name);
  $bet=$user_denomination? get_bet($g_name,true)*$user_denomination: get_bet($g_name,true);
  
  $income=0;
  
  if($debug)
   {
  save_log("pay_in: $pay_in", $logfile);
  save_log("bet_sum: $bet_sum",$logfile);
  save_log("bet: $bet",$logfile);
   }
  
    
    
  if($bank_sum>=0)
    {
    if($action=='spin')
      $bank_sum=$bet_sum;

    if(preg_match('~(games/)(.+)(/ge_server.php|ge_init.php)~i',$_SERVER['PHP_SELF'],$matches))
      {//                          ,                                             
       //                                                 ,                                      
    
      $game= substr($matches[2],strpos($matches[2],'/')+1);
    
      if($debug) save_log("***action: $action",$logfile);
      if($freespin=freespin_Bonus::is_active($game) )
        {
        if($action!='double')
          return true;
        }
      }
    }  
  
  if($bank_sum==0)
    {
    save_log("                                                         0                 ",$logfile);
    save_log("=========================",$logfile);
    return true;
    }
  
  $bank=get_bank($user_id, $g_name, $bank_type);
  if (strpos($_SERVER['PHP_SELF'],'ge_server.php') && $user_denomination!=1)
    {
    $bank=$bank *$user_denomination;
    $bank_sum=$bank_sum*$user_denomination;
    }
    
  save_log("bank: $bank",$logfile);
  save_log("bank_sum: $bank_sum",$logfile);
  save_log("balance_bonus: ".$user_info['balance_bonus'],$logfile);  
  
    
  if(isset($_SESSION['cell_win'])&& $bank_sum<0)
    {
    save_log("                                     ".$_SESSION['cell_win']." $bank_sum ",$logfile);
    $db->run("update room_banks set ".$_SESSION['cell_win']."=".$_SESSION['cell_win']."+$bank_sum where id=".$_SESSION['bank_id']);
    unset($_SESSION['cell_win']);
    return true;
    }
    
  
  
  
  
  if($bet_sum && $bank_sum>0)
    {
     if($user_info['balance_bonus']-($user_info['wager_bonus']-$user_info['wager'])>0)
      {
      save_log($user_info['balance_bonus']."-(".$user_info['wager_bonus']."-".$user_info['wager'].")",$logfile);
      return true;
      }
 
    //                                                                                         ,                                                      
    //    determine what part of the rate is taxed, and which goes completely to the bank

    if($bet_sum<$pay_in)
      {
      //                                                          ,                                                                    
          //if the amount of the bid is less than the payne, then we tax the entire amount of the bet
     // $sql="UPDATE LOW_PRIORITY users set payin=payin-$bet_sum where id=$user_id and payin-$bet_sum>=0";
          $sql="UPDATE LOW_PRIORITY users set payin=payin-$bet_sum where id=$user_id and balance-$bet_sum>=0"; //simon
      if($db->run($sql) )
        $free_sum=0;
      else
        $free_sum=$bet_sum;  
      }
    elseif($pay_in==0)
      {
      //                                ,                                                                                 
      $free_sum=$bet_sum;
      }
    else
      {
      //                                                                           
      $sql="UPDATE LOW_PRIORITY users set payin=0 where id=$user_id";
      if($db->run($sql) )
        $free_sum=$bet_sum-$pay_in;
      else
        $free_sum=$bet_sum; 
      }
    if($debug) save_log ("free_sum: $free_sum", $logfile);    
    
    
    } 
   
   
   if($debug) save_log ("action=".$action, $logfile);
   if($debug) save_log ("rnd_bonus=".$rnd_bonus, $logfile);
   $g_sett=get_game_settings($g_name);
   
       
   $spin_bank_perc=isset($conf['spin_bank_perc'])? $conf['spin_bank_perc']: 30;
   $bonus_bank_perc=isset($conf['bonus_bank_perc'])? $conf['bonus_bank_perc']: 30;
   $double_bank_perc=isset($conf['double_bank_perc'])? $conf['double_bank_perc']: 30;
   
   $cell1_perc=isset($conf['cell1_perc'])? $conf['cell1_perc']: 1;
   $cell2_perc=isset($conf['cell2_perc'])? $conf['cell2_perc']: 1;
   
   if(in_array($g_name,$conf['table_games']))
    {
    $spin_bank_perc=98;
    $bonus_bank_perc=0;
    $double_bank_perc=0;
    }
   
   
   $spin_bank_perc_free= 100-$bonus_bank_perc; //-$double_bank_perc;
   
   if($debug) save_log ("spin_bank_perc_free=100-$bonus_bank_perc", $logfile);
   if($debug) save_log ("spin_bank_perc_free=".$spin_bank_perc_free, $logfile);
   /*
   if(($action=="spin" && $rnd_bonus!=1)||($g_name=='garage' && $action=='ge_play'))
    $bank_field='spin_bank';
   elseif($action=="double")
    $bank_field='double_bank';
   else
    $bank_field='bonus_bank';  
   */
   
   $bank_field=$bank_type.'_bank';
   
   if($debug) save_log ("bank_field=".$bank_field, $logfile);
   
   $bank_table= 'room_banks';
   if($debug) save_log ("bank_table=".$bank_table, $logfile);
   
   if($debug) save_log ("bet=".$bet_sum, $logfile);
   
    if(($action=="spin" && $rnd_bonus!=1)||($g_name=='garage' && $action=='ge_play'))
      {
      if(in_array($g_name,$conf['table_games']))
        $sql="select id from room_banks where from_bet=-2 and room_id=$room";
      else  
        $sql="select id from room_banks where $bet>from_bet and $bet<=to_bet and room_id=$room";
      if($debug) save_log ($sql, $logfile);
      if ($bank_id=$db->get_one($sql))
        {
        $_SESSION['bank_id']=$bank_id;
        }
      }
    else
      $bank_id=$_SESSION['bank_id'];      
    
   
  if($debug) save_log ("bank_id: ".$bank_id, $logfile); 
   if(($bank+$bank_sum)>=0) //                                  if($bank_result===false || $bank_result<0)
    {
    if($bank_sum>=0)
      {
      if($action=='bonus')
        {
        
        $sql="UPDATE LOW_PRIORITY $bank_table set 
              bonus_bank=bonus_bank+".($bank_sum)."
              where id=$bank_id";
        }
      elseif($action!='double')
        { 
        //                             
        
        if($g_name=='roulette_euro' || $g_name=='roulette_euro2')
          {
          $win_sum= $bet_sum-$bank_sum;
          if($debug) save_log ("win_sum: ".$win_sum, $logfile);
          $spin_bank_sum=(($bet_sum-$free_sum)*$spin_bank_perc+$free_sum*$spin_bank_perc_free)/100 - $win_sum;
          if($debug) save_log ("spin_bank_sum: ".$spin_bank_sum, $logfile);
          $income=$bet_sum- ($spin_bank_sum+$bet_sum*$bonus_bank_perc/100+$bet_sum*$double_bank_perc/100)-$win_sum;
          if($debug) save_log ("income: ".$income, $logfile);
          }
        else  
          {
          $spin_bank_sum=(($bet_sum-$free_sum)*$spin_bank_perc+$free_sum*$spin_bank_perc_free)/100;    
          $income=$bet_sum- ($spin_bank_sum+$bet_sum*$bonus_bank_perc/100);
          if($debug) save_log("spin_bank_sum: $spin_bank_sum=(($bet_sum-$free_sum)*$spin_bank_perc+$free_sum*$spin_bank_perc_free)/100;", $logfile);
          if($debug) save_log("$income=$bet_sum- ($spin_bank_sum+$bet_sum*$bonus_bank_perc/100);", $logfile);
          }
          
        //                            -- jackpot : simon
        
        $jack_res=mysql_query($sql="select * from jackpots where room_id=$room");
        if($debug) save_log($sql, $logfile);
        if($jack_res && mysql_num_rows($jack_res)>0)
          {
          while($row=mysql_fetch_array($jack_res))
            {
            $jack_sum=($bet_sum-$free_sum)*$row['percent']/100;
            if($debug) save_log("$spin_bank_sum>=$jack_sum", $logfile);
            if($spin_bank_sum>=$jack_sum && $jack_sum>0)
              {

			  // simon - load mini_jp
                  if($debug) save_log("reset_jack_balance(".$row['id'].", $jack_sum, $g_name);", $logfile);
                    reset_jack_balance($row['id'], $jack_sum, $g_name);

					save_log('jack_pay:'.$jack_sum,'jack.log');

                  $spin_bank_sum-= $jack_sum;
              }
              else
              {
                  save_log("Can not jackpot now ! Because following reason.", $logfile);
                  save_log("bet_sum is ".$bet_sum, $logfile);
                  save_log("free_sum is".$free_sum, $logfile);
                  save_log("spin_bank_sum is ".$spin_bank_sum, $logfile);
                  save_log("jack_sum is".$jack_sum, $logfile);
              }

            }
          }
        $bank_sum=$spin_bank_sum;
        
        $sql="UPDATE LOW_PRIORITY $bank_table set spin_bank=spin_bank+".($spin_bank_sum).",
              bonus_bank=bonus_bank+".($bet_sum*$bonus_bank_perc/100)."
              where id=$bank_id";
        }
      else
        {
        $sql="UPDATE LOW_PRIORITY $bank_table set 
              spin_bank=spin_bank+".($bank_sum)."
              where id=$bank_id";
        }
        
      }
    else  
      $sql="UPDATE LOW_PRIORITY $bank_table set $bank_field = $bank_field"."$bank_sum where id=$bank_id and $bank_field"."$bank_sum>=0";
    }
    
   if($debug) save_log ("sql=".$sql, $logfile);
   
   if($db->run($sql))
      $result=$bank+$bank_sum;
   else
      $result=false;
   
    
   if($income && $result!==false)
    {
    $sql="UPDATE LOW_PRIORITY rooms set income=income+$income where id=$room";
    save_log("incomeSQL: $sql",$logfile);
    $db->run($sql);
    } 
    
    if ($debug)
      {
      save_log("income_sum: $income",$logfile);
      $txt="result: $result \n";
      $txt.="******************* \n \n";
      save_log ($txt,$logfile);
      }
  if ($result!==false)
    {
    if($bank_sum>0)
      {
      //$g_sett=get_game_settings($g_name);
      set_game_settings($g_name, "g_in", "g_in+".($bet_sum));
      }
      
    else  
      set_game_settings($g_name, "g_out", "g_out-".$bank_sum);
    }  
  return $result;    
  }  
   

function pay($pay_id,$change_balance=true)
  {
  global $user_id, $conf,$sys,$db;
  
  $query	= "SELECT *, users.id as user_id FROM enter join users using (login) WHERE enter.id = $pay_id and enter.status=1";
          
					if($row=$db->get_row($query)) {
						$date = date("d.m.Y");
						$sum=$row['sum'];
            
            if($change_balance)
              {
                $balance= change_balance ($row['sum'], $row['user_id'],$row['paysys'],1);
              
            if($balance)
              $a_balance=explode('|',$balance);
            else
              $a_balance=false;
              
            if($a_balance&& $a_balance[0]=='success')
              {
              
              $bonus_id=$db->get_one($sql="select bonus_id from bonus_user where enter_id='".$row['inv_code']."'");
              
              if((isset($_REQUEST['bonus_id']) && intval($_REQUEST['bonus_id'])>0) || $bonus_id)
                {
                $bonus_id=$bonus_id ? $bonus_id : intval($_REQUEST['bonus_id']);
                $user_id=$row['user_id'];
                save_log("bonus_id: $bonus_id");
                save_log("user_id: $user_id");
                $bonus=new Bonus($bonus_id);
                $bonus->activate($row['sum']);
                }
              
              
              $sql= "UPDATE enter t2 SET t2.status = 2, t2.paysys = '$sys', `date`=".time()." WHERE t2.id=$pay_id";
  						if($db->run($sql))
  						  { 
                  //                                                                      
                  //$sql="UPDATE LOW_PRIORITY rooms set return_balance=return_balance+".$row['sum']."*return_perc/100, return_login='".$row['login']."' where id=".$row['room_id']." and is_return_room=1";
                  //mysql_query($sql) or save_log($sql.":".mysql_error(),'db_error.log');
                  
  
                user_mail (4,$row['user_id'],array('sum'=>$row['sum'],'ps'=>$sys,'inv_code'=>$row['inv_code']));
                Bonus::refresh_num_deposit($row['user_id']); 
                return true;
                }
              else
                return false;
					   } else {
						  return false;
					   }
             }
             else
              {
              $sql= "UPDATE enter t2 SET t2.status = 2, t2.paysys = '$sys' WHERE t2.id=$pay_id";
  						$db->run($sql);
              user_mail (4,$row['user_id'],array('sum'=>$row['sum'],'ps'=>$sys,'inv_code'=>$row['inv_code']));
              Bonus::refresh_num_deposit($row['user_id']);
              }
             
          } 
      return false;    
  }
  
function  block_user($user_id)
  {
  $sql="UPDATE LOW_PRIORITY users set action=4 where status<>1 and id=$user_id";
  mysql_query($sql);
  }

function pager($sql, &$div)
  {
  global $ge,$num, $lang,$conf;
  
  $curpage=(empty($_GET['curpagenum'])or $_GET['curpagenum'] <= 0) ? '1' : intval($_GET['curpagenum']);
  
  
  $url = $_SERVER['PHP_SELF'];
  unset($_GET['curpagenum']);
  foreach($_GET as $k=>$v)
    $param[]=$k."=".$v;
  $param[]="curpagenum=";
  $url.= "?". implode('&',$param);
  
  $start = ($curpage-1) * $num;
  $sql_lim= preg_replace ('/^select /i','SELECT SQL_CALC_FOUND_ROWS ', $sql);
  $sql_lim.=" LIMIT $start, $num";
  $res = mysql_query($sql_lim) or save_log($sql_lim."\r\n".mysql_error(), 'db_error.log');
  
  
  $count=mysql_result(mysql_query("select FOUND_ROWS()"),0);
  $total	= intval(($count - 1) / $num) + 1;
  if($curpage > $total && $total>1)
    {$curpage = $total;
    $start = ($curpage-1) * $num;
    $sql_lim= "$sql LIMIT $start, $num";
    $res = mysql_query($sql_lim) or save_log($sql_lim."\r\n".mysql_error(), 'db_error.log');
    }
  
  if($total>1)
    {//$div="<div align=\"center\"><b><br>".$lang['pages'].":  </b>".$pervpage.$page2left.$page1left."[ <b>".$curpage."</b> ]".$page1right.$page2right.$nextpage."<br><br></div>";
    $div= '<ul class="pagination">';                                                    
    $div.=   '<li '.($curpage==1 ? ' class="disabled" ': '').'><a href="'.$url.'1">  </a></li>'; //                             
    for($i=$curpage-2;$i<=$curpage+2;$i++)
      {
      if ($i>0 &&$i<=$total)
        $div.=   '<li '.($curpage==$i ? 'class="active"':'').'><a href="'.$url.$i.'">'.$i.'</a></li>';
      }
    $div.=   '<li '.($curpage==$total ? ' class="disabled" ': '').'><a href="'.$url.$total.'">  </a></li>'; //                                   
    $div.=   '</ul>';
    }
  else
    $div="";  
  return $res;
  }
  
function pager_ajax($sql, &$div='')
  {
  global $ge,$num, $lang;
  
  $curpage=(empty($_COOKIE['curpagenum'])or $_COOKIE['curpagenum'] <= 0) ? '1' : intval($_COOKIE['curpagenum']);
  
  
  $start = ($curpage-1) * $num;
  $sql_lim= preg_replace ('/^select /i','SELECT SQL_CALC_FOUND_ROWS ', $sql);
  $sql_lim.=" LIMIT $start, $num";
  $res = mysql_query($sql_lim);
  
  
  $count=mysql_result(mysql_query("select FOUND_ROWS()"),0);
  $total	= intval(($count - 1) / $num) + 1;
  if($curpage > $total)
    {$curpage = $total;
    $start = ($curpage-1) * $num;
    $sql_lim= "$sql LIMIT $start, $num";
    $res = mysql_query($sql_lim);
    }
  
  if($total>1)
    {
    $div= '<ul class="pagination">';                                                    
    $div.=   '<li '.($curpage==1 ? ' class="disabled" ': '').'><a href="#" onclick=\'$.cookies.set("curpagenum", "1","","/"); refreshInfo($.cookies.get("users-tree_open"),"users-tree", "/engine/ajax/get_user_info.php"); return false;\'>  </a></li>'; //                             
    for($i=$curpage-2;$i<=$curpage+2;$i++)
      {
      if ($i>0 &&$i<=$total)
        $div.=   '<li '.($curpage==$i ? 'class="active"':'').'><a href="#" onclick=\'$.cookies.set("curpagenum", "'.$i.'","","/"); refreshInfo($.cookies.get("users-tree_open"),"users-tree", "/engine/ajax/get_user_info.php"); return false;\'>'.$i.'</a></li>';
      }
    $div.=   '<li '.($curpage==$total ? ' class="disabled" ': '').'><a href="#" onclick=\'$.cookies.set("curpagenum", "'.$total.'","","/"); refreshInfo($.cookies.get("users-tree_open"),"users-tree", "/engine/ajax/get_user_info.php");return false;\'>  </a></li>'; //                                   
    $div.=   '</ul>';
    }
  else
    $div="";
  return $res;
  } 
  
function paginator($sql,&$nav='')
  {
    global $ge,$num, $lang;
  
  $curpage=(empty($_COOKIE['curpagenum'])or $_COOKIE['curpagenum'] <= 0) ? '1' : intval($_COOKIE['curpagenum']);
  
  $start = ($curpage-1) * $num;
  $sql_lim= preg_replace ('/^select /i','SELECT SQL_CALC_FOUND_ROWS ', $sql);
  $sql_lim.=" LIMIT $start, $num";
  $res = mysql_query($sql_lim);
  
  
  $count=mysql_result(mysql_query("select FOUND_ROWS()"),0);
  $total	= intval(($count - 1) / $num) + 1;
  if($curpage > $total)
    {$curpage = $total;
    $start = ($curpage-1) * $num;
    $sql_lim= "$sql LIMIT $start, $num";
    $res = mysql_query($sql_lim);
    }
  
    $nav=array($curpage,$total);
  return $res;

  }  
   
function get_game_settings($game,$ignor_hash=false)
  {
  global $room,$conf,$action,$debug,$user_denomination,$user_info;
  if (is_numeric($game))
    $where=" g_id= $game";
  else
    $where="g_name ='$game' and room_id=$room";
  $sql= "select * from game_settings where $where";
  
  $res= mysql_query( $sql );
  $row=$res? mysql_fetch_assoc($res ): false;
  
  
  return $row;
  }  
  
function mail_admin($subj,$body)
  {
  global $conf,$debug,$mail;
  
  $headers = "From: ".$conf['adm_email']."\n";
	$headers .= "Reply-to: ".$conf['adm_email']."\n";
	$headers .= "X-Sender: < https://".$conf['url']." >\n";
	$headers .= "Content-Type: text/html; charset=windows-1251\n";
	if ($debug)
      {
      $handle = fopen('mail.log', 'a');
      fwrite($handle, $conf['adm_email']."\n");
      fwrite($handle, $subj."\n");
      fwrite($handle, $body."\n\n");
      fclose($handle);
      }
  else       
	$mail->send($conf['adm_email'], $subj, $body, $headers);
  
  }
  
function set_game_settings($game,$field_name,$field_val,$ignor_badhash=true,$where_set=false)
  {
  global $conf,$dev_debug,$room,$user_id,$user_denomination,$status;
  
  $numeric_fields=array('g_bank','g_balance','g_in','g_out');
  
  if (is_numeric($game))
    $where=" g_id= $game";
  else
    $where="g_name ='$game' and room_id=$room";
    
  $where=  empty($game)? ($where_set? $where_set:'') : ($where_set? $where_set. " and ". $where: " where $where");
    
      
  $sql= "select * from game_settings $where";
	$result=mysql_query($sql);
	if (mysql_num_rows($result)==1)
	 {
	$row=mysql_fetch_assoc($result);
   
  if($status==5 && $field_name=='g_bon1_2'&&$user_denomination)
    {
    $field_val=$row[$field_name]+($field_val-$row[$field_name])*$user_denomination;
    }
	
	if($row[$field_name]==$field_val)
	 return true;
	
	
      $sql="UPDATE LOW_PRIORITY game_settings set $field_name=";
      if (in_array($field_name, $numeric_fields) )
        $sql.=$field_val;
      else
        $sql.="'$field_val'";
      
   $sql.= $where;
     
	 if (mysql_query($sql))
    {
    if (mysql_affected_rows()>0)
      return true;
    else
      {
      save_log(date('Y-m-d H:i:s').'*********[set_game_settings()]***********', 'bank_err.log');
      save_log('ID         : '.$room, 'bank_err.log');
      save_log('ID             : '.$user_id, 'bank_err.log');
      save_log('          : '.$field_val, 'bank_err.log');
      save_log('         '.$row['g_name'].'                                                     ,                                  ', 'bank_err.log');
      return false;
      }  
    }
   else
    {
    save_log("function set_game_settings", 'db_error.log');
    save_log($sql." \r\n ".mysql_error(), 'db_error.log');
    return false; 
    } 
   } 
  }   
  
function set_allgame_settings($field_name,$field_val)
  {
  global $conf,$dev_debug,$room;
  
  $sql= "select * from game_settings where room_id=$room limit 1";
	$result=mysql_query($sql);
	$row=mysql_fetch_assoc($result);
	
	$str='';
	$sql_arr=array();
	foreach ($row as $key=>$val)
	 {
   if($key!='check')
    {
    $sql_arr[]="cast(ifnull(".$key.",'') as char)";
    }
   }
   $where = "$field_name is not null and g_name not in ('megabank','total_bank') and room_id=$room";
   $sql="UPDATE LOW_PRIORITY game_settings set $field_name='$field_val' ,`check` =".as_md5($conf['lic_key'],implode(',', $sql_arr),true)." where $where";
        
  
	 if (mysql_query($sql))
    return true;
   else
    return false;   
  }  
  
function ge_serv_show_str($str)
  {
  global $game_settings,$user_id,$status,$room,$login,$balance,$user_denomination, $denominations, $conf, $jackpots,$tickets,$demomode,$adm_maxbet,$adm_minbet,$adm_coinvalue,$db;
  
  
  $is_game_logging=$demomode ? false : (isset($game_settings['is_logging'])? $game_settings['is_logging'] : true); 
  
  
  //save_log("denom: $user_denomination", "denom" );
  if(is_array($tickets))
    $str.="&tickets=".implode('|',$tickets);
  
  
  //              -            
  /*if(!$demomode && preg_match('~(games/)(.+)(/ge_server.php|ge_init.php)~i',$_SERVER['PHP_SELF'],$matches))
     {
    //                                                 
    $game= substr($matches[2],strpos($matches[2],'/')+1);
    
    if($freespin=Bonus::get_active('freespin'))
      {
      $freespin['g_name']=$db->get_one("select g_name from game_settings where g_id=".$freespin['g_id']);
      if($game==$freespin['g_name'])
        {
          $str.="&freespin_bonus=".intval($freespin['perc'])."|".intval($freespin['koef'])."|".intval($freespin['max_bon']-$freespin['spin'])."|".floatval($freespin['win']);
          if(($freespin['max_bon']-$freespin['spin'])==1)
            $str.= "|                                            ".$freespin['win']."                                        ".($freespin['win']*$freespin['wager']);
        }
      }
     }*/
     
  if(!$demomode && $freespin=freespin_Bonus::is_active())
    {
    $str.="&freespin_bonus=".intval($freespin['perc'])."|".intval($freespin['koef'])."|".intval($freespin['max_bon']-$freespin['spin'])."|".floatval($freespin['win']);
    if(($freespin['max_bon']-$freespin['spin'])==1)
      $str.= "|                                            ".$freespin['win']."                                        ".($freespin['win']*$freespin['wager']);
    }   
  
  
  //                                                                                            
  if($status>4&&$room  && !$demomode)
    {
    
    $room_info=mysql_fetch_assoc(mysql_query("select rooms.*, point from users join rooms on (users.room_id=rooms.id) where users.id=$user_id"));
    
    
    if(!strpos($str,'&bonus='))
      {
      $jack_rows=get_jackpots($room);
      
      foreach($jack_rows as $jack_row)  
        {
          $alloy_jackpay=true;

		    $min_jp = $jack_row['min_jp'];
          
          $start_time=$jack_row['start_timeofday'];
          $end_time=$jack_row['end_timeofday'];
          $cur_time=date('H:i:s');
          
          $a_start_time=explode(':',$start_time);
          $a_end_time=explode(':',$end_time);
          $a_cur_time=explode(':',$cur_time);
          
          $start_timestamp=mktime($a_start_time[0],$a_start_time[1],$a_start_time[2]);
          $end_timestamp=mktime($a_end_time[0],$a_end_time[1],$a_end_time[2]);
          $cur_timestamp=mktime($a_cur_time[0],$a_cur_time[1],$a_cur_time[2]);
          
          $alloy_jackpay= ($cur_timestamp>=$start_timestamp && $cur_timestamp<=$end_timestamp) ? $alloy_jackpay && true : $alloy_jackpay && false; 
          
          $gamer_count=mysql_result(mysql_query($sql="select count(*) from users where status in (5,6) and action in(1,2) and room_id=$room"),0);
          
          $alloy_jackpay= ($gamer_count>=$jack_row['gamer_count']) ? $alloy_jackpay && true : $alloy_jackpay && false;
          
        
        if($alloy_jackpay)
          {
          if ($jack_row['balance']>$jack_row['min_sum'] && $jack_row['mast_win']==$user_id)
            {
            $_SESSION['jack_spin']=isset($_SESSION['jack_spin'])? ++$_SESSION['jack_spin'] : 1; 
            save_log('jack_spin:'.$_SESSION['jack_spin'],'jack.log');
            $is_prepay=$_SESSION['jack_spin']>=$jack_row['chance_prepay'] ? 1 : 0;
            save_log('is_prepay:'.$is_prepay,'jack.log');
            }
        if ($jack_row['mast_win']==$user_id && ($is_prepay===1))
          {
          unset($_SESSION['jack_spin']);
          $sum_pay=floor($jack_row['min_sum']);
		

          if($room_info['balance']>=$sum_pay)
            {
            
		  //simon
          //$sql= "UPDATE jackpots set balance=balance-".$sum_pay." ,mast_win=null where id=".$jack_row['id']." and balance-".$sum_pay.">=0";

		   $sql= "UPDATE jackpots set balance=".$min_jp." ,mast_win=null where id=".$jack_row['id']." and balance-".$sum_pay.">=0";

          mysql_query($sql);
          if(mysql_affected_rows()>0 ) //                                                                ,                                                 
            {
            $jack_sum= $sum_pay;
            
            //                                                                                  ,                                                             
            if($conf['jack_nal'])
              {
              
              $sql="INSERT LOW_PRIORITY INTO jack_pay values (null,".$jack_row['id'].",$user_id,$jack_sum,now(),0,null)";
              if(mysql_query($sql))
                {
                $txt_log='             <b>'.$jack_row['name']."</b>            <b class=\'sum\'>".$sum_pay."</b>                                                 <b>$login</b>";
                mysql_query("INSERT LOW_PRIORITY INTO jack_history (jack_id,user_id,txt) values (".$jack_row['id'].",$user_id, '$txt_log')");
                $str.='&bonus=                                                   '.sprintf("%01.0f",$sum_pay).',                                                                  |0';
                }
              }
            else
              {
              $balance=change_balance($jack_sum/$user_denomination,$user_id);
              $sql="INSERT LOW_PRIORITY INTO jack_pay values (null,".$jack_row['id'].",$user_id,$jack_sum,now(),2,null)";
              mysql_query($sql) or save_log($sql." \n".mysql_error(),'db_error.log');

              $txt_log='             <b>'.$jack_row['name']."</b>            <b class=\'sum\'>".$sum_pay."</b>                                 <b>$login</b>";
              mysql_query("INSERT LOW_PRIORITY INTO jack_history (jack_id,user_id,txt) values (".$jack_row['id'].",$user_id, '$txt_log')");
              $str.='&bonus=                                                     '.sprintf("%01.0f",$jack_sum).'|'.sprintf("%01.0f",$sum_pay);
              //$sql= "INSERT LOW_PRIORITY INTO enter (login,`sum`,`date`,status,paysys,returned) values ('$login', $sum_pay, ".time().", 2,'".$jack_row['name']."',2)";
              //mysql_query($sql);
              save_stat_pay($sum_pay,$login,2,$jack_row['name'],$inv_code);
              }
            $jack_row['balance'] =$jack_row['balance']-$sum_pay;  
            }
            }
          }
        elseif ((!$jack_row['mast_win'] && $jack_row['balance']>=$jack_row['pay_sum']&& $jack_row['pay_sum']>0)&& $alloy_jackpay)
          {
          
          //var_damp($jack_row['mast_win']);
          //var_damp(!$jack_row['mast_win']);
          //                                                         
          save_log('jack_pay:'.$jack_row['pay_sum'],'jack.log');
           
		   //simon
		// $sql="UPDATE jackpots set balance=balance-pay_sum where id=".$jack_row['id'];
		   $sql="UPDATE jackpots set balance=".$min_jp." where id=".$jack_row['id'];
          
          if (mysql_query($sql))
            {
            
            $jack_row['balance'] = $jack_row['balance'] -$jack_row['pay_sum'];
            $jack_sum= $jack_row['pay_sum']*$user_denomination;
            
            //                                                                                  ,                                                             
            
            if($conf['jack_nal'])
              {
              
              $sql="INSERT LOW_PRIORITY INTO jack_pay values (null,".$jack_row['id'].",$user_id,$jack_sum,now(),0,null)";
              if(mysql_query($sql))
                {
                $txt_log='             <b>'.$jack_row['name']."</b>            <b class=\'sum\'>".$jack_row['pay_sum']."</b>                                                 <b>$login</b>";
                mysql_query("INSERT LOW_PRIORITY INTO jack_history (jack_id,user_id,txt) values (".$jack_row['id'].",$user_id, '$txt_log')");
                $str.='&bonus1=                                                   '.sprintf("%01.0f",$jack_row['pay_sum']).',                                                                  |0';
                }
              }
            else
              {
              $sql="INSERT LOW_PRIORITY INTO jack_pay values (null,".$jack_row['id'].",$user_id,$jack_sum,now(),2,null)";
              mysql_query($sql);
              $balance=change_balance($jack_sum/$user_denomination,$user_id);
              $txt_log='             <b>'.$jack_row['name']."</b>            <b class=\'sum\'>".$jack_row['pay_sum']."</b>                                 <b>$login</b>";
              mysql_query("INSERT LOW_PRIORITY INTO jack_history (jack_id,user_id,txt) values (".$jack_row['id'].",$user_id, '$txt_log')");
              $str.='&bonus=                                                     '.sprintf("%01.0f",$jack_row['pay_sum']).'|'.sprintf("%01.0f",$jack_row['pay_sum']);
              //$sql= "INSERT LOW_PRIORITY INTO enter (login,`sum`,`date`,status,paysys,returned) values ('$login', ".$jack_row['pay_sum'].", ".time().", 2,'".$jack_row['name']."',2)";
              //mysql_query($sql) or save_log($sql."\r\n".mysql_error(),'db_error.log');
              save_stat_pay($jack_row['pay_sum']*$user_denomination,$login,2,$jack_row['name'],$inv_code);
              }
            }
          else 
            echo mysql_error();                                     
          }
          }
        $jacks[]=sprintf("%01.0f",$jack_row['balance']); 
        }
        //$str="error|".$str;
      //$jacks=array_pad ($jacks,3,0);  
        
      }
    if(isset($jackpots) && !preg_match("/^error\|/i",$str))
        $str.='&jackpots='.implode('|',$jackpots);  
        
    if(!strpos($str,'&bonus='))
    {
    $balance=get_balance($user_id);
      
     }
    }
   elseif(isset($jackpots))
    $str.='&jackpots='.implode('|',$jackpots);  
    
    
    
    $str.="&curdenom=".$user_denomination;
  if($is_game_logging)
    {
    
    //$str= isset($_REQUEST['action'])? $_REQUEST['action'] : '';
    
	if($_POST['cf']-1>0 || $rnd_bonus==1){
		
	if($rnd_bonus==1){
$_POST['cf']=0;
$_POST['tf']=$_SESSION[$_POST['game'].'_freeGameCount'];
	}	
		
	$_POST['action2']="freegame";	
	}else{
	$_POST['action2']="";		
	}
	
    if (isset ($_POST))
      foreach ($_POST as $key=>$val)
      
        $str_arr[]= addslashes("$key=$val");
        
    $post_str= isset($str_arr)? implode(':',$str_arr) : '';
    
/*-------add-more-info-to-log-deluxe----*/

$gname_=$_POST['game'];
	
if($_POST['action']=="finish"){
	
$_SESSION[$gname_.'_win']=0;

	
}

	
if($_POST['action']=="spin"){
	
$str.="&winall=".$_SESSION[$gname_.'_win'];	
$_SESSION[$gname_.'_info']=$str;	
$_SESSION[$gname_.'_finish']=$str;
$tmpsym=explode("&info=",$str);
$tmpsym2=explode("&",$tmpsym[1]);
$_SESSION[$gname_.'_info']=$tmpsym2[0]."&";

	
$str.="&infof=".$_SESSION[$gname_.'_info'];			
}

if($_POST['action']=="freegame"){
	
$str.="&winall=".$_SESSION[$gname_.'_win'];	
$str.="&mud2=".$_SESSION[$gname_.'_mud2'];	
$str.="&mud=".$_SESSION[$gname_.'_mud'];	

$str.="&fullwin=".$_SESSION[$gname_.'_FullBWin'];
$str.="&curwin=".$_SESSION[$gname_.'_CurBWin'];
$str.="&freeGameCount=".$_SESSION[$gname_.'_freeGameCount'];
$tmpsym=explode("&info=",$str);
$tmpsym2=explode("&",$tmpsym[1]);
$_SESSION[$gname_.'_info']=$tmpsym2[0];	
$_SESSION[$gname_.'_finish']=$str;

	
}

if($_POST['action']=="double"){
	
$str.="&double_step=".$_SESSION[$gname_.'_d'];
$str.="&winall=".$_SESSION[$gname_.'_win'];	
$prevSpin=$_SESSION[$gname_.'_finish'];	

	
	$prevSpin = str_replace("&info","&info2", $prevSpin);
	$prevSpin = str_replace("&winall","&winall2", $prevSpin);
$_SESSION[$gname_.'_finish'].="&double_win=".$_SESSION[$gname_.'_win'];	
$str.="&".$prevSpin;	
	
/*$tmpsym=explode("&info=",$str);
$tmpsym2=explode("&",$tmpsym[1]);	
$_SESSION[$gname_.'_info']=$tmpsym2[0];	*/
	
}



if($_POST['group']!="gaminators" && $_POST['group']!="deluxe" ){
if($_POST['action']=="finish"){
	

$str=$_SESSION[$gname_.'_finish'];	

	
}
}else{

$str="&infof=".$_SESSION[$gname_.'_info']."&".$str;		
}

/*-------add-more-info-to-log-deluxe----*/	 
    
    $sql= "INSERT DELAYED INTO game_log (game_id,user_id,ip,post, str) values ('".$game_settings['g_id']."',$user_id,'".getip( )."','$post_str','$str')";
    //save_log($sql,'loging.log');
    if (mysql_query($sql)) 
      {$log_id=mysql_insert_id();
       //save_log($sql,'loging.log');
      }
    else
      save_log(mysql_error()." :: ".$sql,'loging.log');     
   
    
    
    
    
    //$sql= "insert into game_log (game_id,user_id,ip,str) values ('".$game_settings['g_id']."',$user_id,'".getip( )."','$str')";
    /*$sql = "UPDATE LOW_PRIORITY game_log set str=concat(str,'$str') where id=$log_id";
    mysql_query($sql); */
    }  
  echo $str;
  } 
  
 
  
function array_strip_tags(&$val)
  {
  $val=addslashes(strip_tags($val));
  }     
  
function save_log ($txt, $log_name='err.log') 
    {
    global $conf;
    
    $file_name= $_SESSION['base_dir'].LOGS_DIR."/$log_name";
    @$handle = fopen($file_name, 'a'); 
    @$res=fwrite($handle, date("[Y-m-d H:i:s] ").$txt."\r\n");
    @fclose($handle);
    return $res;
    }     
    
function get_domen()
  {
  $host=$_SERVER['HTTP_HOST'];
  $domen=str_ireplace('www.','',$host);
  if(strpos($domen,':')!== false) 
    $domen=substr($domen,0,strpos($domen,':')); //                         
  return $domen;
  }    

  
function Clear_array_empty($array)
  {
  $ret_arr = array();
  foreach($array as $val)
    {
      if (!empty($val))
        {
        $ret_arr[] = trim($val);
        }
    }
  return $ret_arr;
  }
  
function get_languages()
  {
  $lang_dir= $_SESSION['base_dir']."/engine/lang";
  $handle = opendir($lang_dir);
  for ($i=0;false !== ($file = readdir($handle));$i++)
    {
    if (!is_dir($lang_dir."/".$file))
      {
      $tmp_lang=str_replace('.php','',$file);
      if (is_readable($lang_dir."/pic/".$tmp_lang.".png"))
        $lang[]=$tmp_lang;
      }
    }	
   return $lang; 
  }   
  
function save_syslog($txt)
  {
  global $user_id;
  $sql="INSERT DELAYED INTO syslog (user_id, `text`) values ($user_id, '$txt')";
  mysql_query($sql);
  }
  
 
function save_stat_game($user_balance,$allbet,$winall,$stat_txt)
  {
  global $user_id, $room,$user_denomination, $demomode;
    
    if ($user_denomination!=1)
      {
      $user_balance=$user_balance*$user_denomination;
      $allbet=$allbet*$user_denomination;
      $winall=$winall*$user_denomination;
      }
     $sql="INSERT LOW_PRIORITY INTO stat_game VALUES(NULL, now(), $user_id, '$user_balance', (select balance from users where id=$user_id), '$allbet','$winall','$stat_txt',$room,$user_denomination)";
    if(!$demomode)
  	  mysql_query( $sql ) or save_log($sql."/r/n ".mysql_error(),'db_error.log');
  } 

function set_stat_game($user_id,$user_balance,$stav,$win,$text)
  {
  save_stat_game($user_balance,$stav,$win,$text);
  }     
  
function show_user_addinfo ($userid)
  {
  global $user_id,$status,$lang;
  $sql="select * from users where id=$userid limit 1";
  
  $user_row=mysql_fetch_array(mysql_query($sql));
  
  if(!$user_row)
    show_user_addinfo ($user_id);
  else
    {  
  $balance= $user_row['balance'];
  print "<table class='user-table'>
            <tr>
              <th colspan=3 style='border-bottom: solid 1px #505E6B;'><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size=+2>".$user_row['login']."</font>";
       if($status==1|| $user_id==$userid ||($status==2)) 
        print "&nbsp;&nbsp;<a href='#' onclick='user_id=\"".$user_row['id']."\";$(\"#pass-form\").dialog(\"open\"); return false;'>".$lang['chpass']."</a><br><br>";
       print "</th>
            </tr>
            <tr>
              <td style='border-bottom: solid 1px #505E6B;' rowspan=4>
                ";
		
       if (( /* $user_row['status']==1 ||                                                       ,                     */ $user_row['status']==4)&& ($user_id!=$userid||$user_id==1)&& $status==1) 
        print " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href='#' onclick=\"balance_trend='plus';user_id='".$user_row['id']."';$('#dialog-form').dialog('open');\">
                  <img width='16' height='16' border='0' src='images/plus.png'>
                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href='#' onclick=\"balance_trend='minus';user_id='".$user_row['id']."';$('#dialog-form').dialog('open');\">
                  <img width='16' height='16' border='0' src='images/minus.png'>
                </a>
              ";
          
       print  "  
              </td>
              <td style='border-bottom: solid 1px #505E6B;' rowspan=4>";
              
       if($user_row['status']!=4)
       print "<font size=+2><b id='balance'>".sprintf("%01.2f", $balance)."</b></font>";
              
      print   "</td>
              
              <td style='border-left: solid 1px #505E6B;text-align: center;'><br>".$lang['registered'].":</td>
            </tr>
            <tr>
              <td style='border-bottom: solid 1px #505E6B; border-left: solid 1px #505E6B; text-align: center;'><b>".date("d/m/Y",$user_row['reg_time'])."</b><br><br></td>
            </tr>
            <tr>
              <td style='border-left: solid 1px #505E6B;text-align: center;'><br>".$lang['lastlogon'].":</td>
            </tr>
            <tr>
              <td style='border-bottom: solid 1px #505E6B; border-left: solid 1px #505E6B;text-align: center;'><b>".date("d/m/Y",$user_row['go_time'])."</b><br><br></td>
            </tr>
            <tr>
              <td style='border-bottom: solid 1px #505E6B;' ><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$lang['group']."<br><br></td>
              <td style='border-bottom: solid 1px #505E6B;' ><b>".$lang['user_group'][$user_row['status']]."</b></td>
              <td style='border-left: solid 1px #505E6B;text-align: center;'>".$lang['last']." IP:</td>
            </tr>
            <tr>
              <td style='border-bottom: solid 1px #505E6B;'><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$lang['aply_action']."<br><br></td>
              <td style='border-bottom: solid 1px #505E6B;'>";
              if ($user_row['status']!=5)
                {
               
               if (($user_row['status']==1||$user_row['status']==2) && $status==1)
                {
                //                               /         
                if($user_row['status']==2)
                  print "<a href='#' onclick=\"room_id='".$user_row['room_id']."';user_id='".$user_row['id']."';add_room('".$user_row['id']."', ".$user_row['status'].");\"><img width='16' height='16' border='0' src='images/room_add.png'></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                print "<a href='#' onclick=\"room_id='".$user_row['room_id']."';user_id='".$user_row['id']."';add_user('".$user_row['id']."', ".$user_row['status'].");\"><img width='16' height='16' border='0' src='images/user_add.png'></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                }
                //                           /         
                if ($status==1 && $user_id!=$user_row['id'])
                  {
                print "
                  <a href='#' onclick=\"if(confirm('".$lang['confirm']."'))remove_user('".$user_row['id']."');\">
                  <img width='16' height='16' border='0' src='images/remove.png'>
                </a>";
                  }
                }
              print "
              </td>
              <td style='border-bottom: solid 1px #505E6B; border-left: solid 1px #505E6B;text-align: center;'><b>".$user_row['ip']."</b></td>
            </tr>
        </table>";
     }   
  }

  function show_room_addinfo($room_id,$show_acc=true,$show_roomset=true)
    {
    global $user_id,$status,$lang,$room,$conf;
    if($status==4)
      $room_id=$room;
      
    $sql="select * from rooms where id= $room_id";
    $room_row=mysql_fetch_array(mysql_query($sql));
    
    if($status<5)
      {
    if($show_acc==true)  
      print "<form action='?a=users&action=editroom' method='post'>";
    else
      print "<form action='?a=room&action=editroom' method='post'>";
    
    print  "
    <input type=hidden name='room_id' value='$room_id'/>
    <table class='user-table'>";
            
      $disabled=$status==1? "": " disabled ";      
            
      if($show_roomset)
        {      
       print "<tr class='add_row'>
              <td style='border-bottom: solid 1px #505E6B;'>IP:</td>
              <td style='border-bottom: solid 1px #505E6B; text-align:center;'><input name='room_ip' id='room_ip' type='text' class='inp' value='".$room_row['ip']."' $disabled /> </td>
            </tr>";
       print "<tr class='add_row'>
              <td style='border-bottom: solid 1px #505E6B;'>".$lang['only_self_ip'].":</td>
              <td style='border-bottom: solid 1px #505E6B; text-align:center;'><input name='room_is_selfIP' id='room_is_selfIP' type='checkbox' class='inp' $disabled";
       if ($room_row['is_selfIP'])
        echo " checked=true ";       
       print "/></td>
            </tr>
            <tr class='add_row'>
              <td style='border-bottom: solid 1px #505E6B;'>".$lang['deny_multilogon'].":</td>
              <td style='border-bottom: solid 1px #505E6B; text-align:center;'><input name='room_is_multiacc' id='room_is_multiacc' type='checkbox' class='inp' $disabled";
       if ($room_row['deny_multilogin'])
        echo " checked=true ";       
       print "/> </td>
            </tr>
            ";
       print "<tr class='add_row'>
              <td>".$lang['returns'].":</td>
              <td style='text-align:center;'><input name='room_is_return' id='room_is_return' $disabled onclick='if($(this).is(\":checked\")) $(\"#room_is_return_room\").attr(\"checked\", false);' type='checkbox' class='inp'";
       if ($room_row['is_return'])
        echo " checked=true ";       
       print "/></td>
            </tr>
            <tr class='add_row'><td colspan=2 style='border-bottom: solid 1px #505E6B;'>
              <table style='padding: 0 20px;text-align: center;'>
                <tr>
                  <th></th>
                  <th>min</th>
                  <th>max</th>
                  <th>%</th>
                </tr>";
        
           $sql="select * from `return` where room_id=".$room_row['id']." order by range_min";
           if($return_res=mysql_query($sql))
            {
            for ($i=1;$i<4;$i++)
              {
              $row=mysql_fetch_array($return_res);
              if($row)
                {
                $min=$row['range_min'];
                $max=$row['range_max'];
                $perc=$row['percent'];
                }
              elseif($i==1)
                {
                $min=0;
                $max=99;
                $perc=5;
                }  
              elseif($i==2)
                {
                $min=100;
                $max=999;
                $perc=10;
                } 
              elseif($i==3)
                {
                $min=1000;
                $max=99999;
                $perc=15;
                }
              print "<tr>
                      <td>".$lang['diapazon']." $i </td>
                      <td><input $disabled name='range".$i."[min]' type='text' class='inp' value='".$min."' style='width: 135px'/></td>
                      <td><input $disabled name='range".$i."[max]' type='text' class='inp' value='".$max."' style='width: 135px'/></td>
                      <td><input $disabled name='range".$i."[perc]' type='text' class='inp' value='".$perc."' style='width: 135px'/></td
                     </tr>";     
              }
            }
          else
            print "<tr><td colspan=4>".$lang['db_error'].": ".mysql_error()."</td></tr>";      
        print "</table>  
            </td></tr> ";
        
        print "<tr class='add_row'>
              <td >".$lang['returns1'].":</td>
              <td style='text-align:center;'><input $disabled name='room_is_return_room' id='room_is_return_room' onclick='if($(this).is(\":checked\")) $(\"#room_is_return\").attr(\"checked\", false);' type='checkbox' class='inp'";
       if ($room_row['is_return_room'])
        echo " checked=true ";       
       print "/></td>
            </tr>
            <tr class='add_row'>
              <td> ".$lang['return_perc'].":</td>
              <td style='text-align:center;'>
              <input $disabled name='room_return_perc' type='text' class='inp' value='".$room_row['return_perc']."' style='width: 135px'/></td>
            </tr>
            <tr class='add_row'>
              <td> ".$lang['returns_balance'].":</td>
              <td style='text-align:center;'>
               <input disabled name='room_return_balance' type='text' class='inp' value='".sprintf("%01.2f",$room_row['return_balance'])."' style='width: 135px'/>
              
              </td>
            </tr>
            <tr class='add_row'>
              <td> ".$lang['returns_paysum'].":</td>
              <td style='text-align:center;'>
              <input $disabled name='room_return_winsum' type='text' class='inp' value='".$room_row['return_winsum']."' style='width: 135px'/></td>
            </tr>
            <tr class='add_row' style='border-bottom: solid 1px #505E6B;'>
              <td> ".$lang['returns_user'].":</td>
              <td style='text-align:center;'>
              <input disabled name='room_return_acc' type='text' class='inp' value='".$room_row['return_login']."' style='width: 135px'/><br><br></td>
            </tr>
            ";        
            
       if(!$disabled)
         print"
            <tr class='add_row'>
              <td colspan=2 style='border-bottom: solid 1px #505E6B;'><br><input type='submit' value='OK' name='submit' id='atm_submit' class='fader submit' /><br><br><br></td>
            </tr>";
            }
        print "
            
        </table>
        </form>";
      if($show_acc)
        {    
        print "<div id='accounts-div' style='margin: 5px'>";
        show_accaunts($room_id); 
        print "</div>";
        }
      }
    }
    
function show_jackpots($room_id)
  {
  global $lang;
  $sql="select jackpots.*, users.login from jackpots left join users on (users.id=jackpots.mast_win) where jackpots.room_id='$room_id' order by pos";
$jack_res=mysql_query($sql);
if($jack_res)
  {?>
                        <div class="row" id="jackpot-info">
                            <div class="col-md-12" >
                                <div class="block">
                                    <div class="head"> 
									<h2><?=$lang['adm_jp_head_2']?></h2>                                      
                                    </div>
                                    <div class="content np" >

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th width="10%"><?=$lang['adm_jp_logs']?></th>													
                                                    <th width="10%"><?=$lang['adm_jp_balance']?></th>
													<th width="10%"><?=$lang['adm_jp_win']?></th>
													<th width="10%"><?=$lang['adm_jp_percent']?></th>
													<th width="10%"><?=$lang['adm_jp_win_chance']?></th>
													<th width="10%"><?=$lang['adm_jp_spin']?></th>
													<th width="15%"><?=$lang['adm_jp_win_player']?></th>
													<th width="5%"><?=$lang['adm_jp_deposit']?></th>
													<th width="5%"><?=$lang['adm_jp_edit']?></th>
                                                </tr>
                                            </thead>
                                              <tbody>	
  <?php 
  if(mysql_num_rows($jack_res)>0)
    {
    while($row=mysql_fetch_array($jack_res))
      {
      echo "<tr align=center>";
      echo "<td><a href='?a=jp&action=history&id=".$row['id']."'>".$row['name']."</a></td>";
      echo "<td><span id='balance_".$row['id']."' class='badge badge-success'>".$row['balance']."</span></td>";
      echo "<td><span class='badge badge-info'>".$row['pay_sum']."</span></td>";
      echo "<td><span class='badge badge'>".$row['percent']."</span></td>";
      echo "<td><span class='badge badge-danger'>".$row['min_sum']."</span></td>";
      echo "<td><span class='badge badge-warning'>".$row['chance_prepay']."</span></td>";
      echo "<td><span class='badge badge-inverse'>".$row['login']."</span></td>";
      echo "<td><a href='#chBalForm' onclick=\"jack_id=".$row['id']."; $('#chBalForm').modal('show'); \"><i class='glyphicon glyphicon-plus-sign'></i></a></td>";
	  echo "<td><a href='#' onclick='edit_jack(".$row['id']."); return false'><i class='glyphicon glyphicon-edit'></i></a></td>";
      echo "</tr>";
      }
    }
  else
    print "<tr><td colspan=11 align=center>                   </td></tr>";
    
  print "
                                            </tbody>
											
                                        </table>                                         
                                        
                                    </div>
                                </div> 
                            </div>                                
                        </div>  
  ";    
  }
else
  print mysql_error();
  }    


function show_egt_jackpots($room_id=1)
  {
  global $lang,$db;
  $sql="select * from game_settings where g_bon1_1 like '%|%|%|%|%' and  g_bon1_2 like '%|%|%|%|%' and room_id='$room_id'";
$jack_res=$db->get_all($sql);
if($jack_res)
  {?>
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2>EGT Jackpots</h2>                                      
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                  <th width="25%" rowspan=2>Game</th>													
                                                  <th width="15%" colspan=2>Jackpot 1</th>
                                                  <th width="15%" colspan=2>Jackpot 2</th>
                                                  <th width="15%" colspan=2>Jackpot 3</th>
                                                  <th width="15%" colspan=2>Jackpot 4</th>
                                                  <th width="15%" colspan=2>Jackpot 5</th>
                                                </tr>
                                                <tr>
                                                  <th>Amount</th>
                                                  <th>%</th>
                                                  <th>Amount</th>
                                                  <th>%</th>
                                                  <th>Amount</th>
                                                  <th>%</th>
                                                  <th>Amount</th>
                                                  <th>%</th>
                                                  <th>Amount</th>
                                                  <th>%</th>
                                                </tr>
                                            </thead>
                                              <tbody>	
  <?php 
    foreach($jack_res as $row)
      {
      $jp_sum=explode("|",$row["g_bon1_1"]);
      $jp_perc=explode("|",$row["g_bon1_2"]);
      echo "<tr align=center data-g_id=".$row['g_id'].">";
      echo "<td><a href='?a=jp&action=history_egt&game=".$row['g_name']."' >".$row['g_title']."</a></td>";
      
      for($i=0;$i<5;$i++)
        {
        echo "<td><span id='egt_jp_sum_".$i."' class='badge badge-success egt_sum' data-jp=$i>".$jp_sum[$i]."</span></td>";
        echo "<td><span class='badge badge egt_perc' data-jp=$i>".$jp_perc[$i]."</span></td>";
        }
      
      echo "</tr>";
      }
    
  print "
                                            </tbody>
											
                                        </table>                                         
                                        
                                    </div>
                                </div> 
                            </div>                                
                        </div>  
  ";    
  }
else
  print $db->error();
  }

function show_mega_jackpots($room_id=1)
  {
  global $lang,$db;
  $sql="select * from game_settings where g_bon1_1 is not null and gr_id=10 and room_id='$room_id'";
$jack_res=$db->get_all($sql);
if($jack_res)
  {?>
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2>MEGA Jackpots</h2>                                      
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                  <th width="25%">Game</th>													
                                                  <th width="15%">JP 1</th>
                                                  <th width="15%">JP 2</th>
                                                  <th width="15%">Counter</th>
                                                  <th width="15%">Trigger</th>
                                                  <th width="15%">Act</th>
                                                </tr>
                                            </thead>
                                              <tbody>	
  <?php 
    foreach($jack_res as $row)
      {
      echo "<tr align=center data-g_id=".$row['g_id'].">";
      echo "<td><a href='?a=jp&action=history_mega&game=".$row['g_name']."'>".$row['g_title']."</a></td>";
      
        $jp_sum=explode('|',$row['g_bon1_1']);
        echo "<td><span id='mega_jp1_sum_".$i."' class='badge badge-success'>".$jp_sum[0]."</span></td>";
        echo "<td><span id='mega_jp1_sum_".$i."' class='badge badge-success'>".$jp_sum[1]."</span></td>";
        echo "<td>".$row['g_bon1_2']."</td>";
        echo "<td>".$row['g_bon1_3']."</td>";
        echo "<td><a href='#' class='mega_edit'><i class='glyphicon glyphicon-edit'></i></a></td>";
      
      echo "</tr>";
      }
    
  print "
                                            </tbody>
											
                                        </table>                                         
                                        
                                    </div>
                                </div> 
                            </div>                                
                        </div>  
  ";    
  }
else
  print $db->error();
  }


function do_jack_options($cur_jack)
  {
  $sql="select * from jackpots ";
  $result=mysql_query($sql);
  if($result)
    {
    $str="<option value=0>--------</option>";
    while($row=mysql_fetch_array($result))
      {
      $str.="<option value=".$row['id'];
      if ($row['id']==$cur_jack)
        $str.=" selected ";
      $str.=">".$row['name']."(".$row['pay_sum']."/".$row['percent']."%[".$row['balance']."])</option>";
      }
    return $str;
    }
  else
    return false;
  }

function show_accaunts($room_id)
  {
  global $lang, $status,$conf;
  
  $online_timeout=mysql_result(mysql_query("select val from settings where key_name='online_timeout' and room_id=$room_id"),0);
  //                                                                                      
  
  $sql="UPDATE LOW_PRIORITY users SET action=0 where action in (1,2) and status=5 and room_id=$room_id and go_time+".($online_timeout*60)."<".time();
  mysql_query($sql);
  
  $kassir_outpay_after_collect=mysql_result(mysql_query("select val from settings where key_name='kassir_outpay_after_collect' and room_id=$room_id"),0);
  //$kassir_outpay_after_collect=true;
  
  $only_pay_wait=(isset($_COOKIE['only_pay_wait'])&& $_COOKIE['only_pay_wait'])? "checked" : "";
  $filter=isset($_COOKIE['filter'])? $_COOKIE['filter'] : false;
  
  if(strpos($filter,'*')==strlen($filter)-1)
    {
    $filter_sql="%".str_replace('*','%',$filter);
    }
  else  
    $filter_sql=$filter;
    
  print '<div class="row">
                            
                            <div class="col-md-12">                                
                                <div class="block">
                                    <div class="block_wrapper">
                                        <div class="input-group">
                                            <input id="filter" type="text" class="form-control" placeholder="'.$lang['adm_users_search_input'].'" value="'.$filter.'"/>
                                            <div class="input-group-btn">                                                
                                                <button class="btn btn-default" type="button">'.$lang['adm_users_search'].'</button>
                                            </div>
                                        </div>                                         
                                    </div>
                                </div>
                            </div>
                                
                        </div>';
                        
  $sql="select t1.*, t2.login as creator_login, count(output.id) as wait_opl from users t1 left join users t2 on (t1.creator=t2.id) left join output ON ( t1.login = output.login AND output.status =0 ) where t1.room_id=$room_id ";
  if($status==1)
    $sql.=" and t1.status in (4,5,6)";
  elseif($status==4)  
    $sql.=" and t1.status in (5,6)";
  if($only_pay_wait)
    $sql.=" and count(output.id)>0 ";
  if($filter)
    $sql.=" and (t1.login like '$filter_sql' or t1.ip like '$filter_sql' or t1.qiwi like '$filter_sql' or t1.email like '$filter_sql') ";
  $sql.=" group by t1.login ";    
  $sql.=" order by t1.status asc, wait_opl desc";

if(isset($_COOKIE['order_acc']))
  {
  $order=explode(':', $_COOKIE['order_acc']); 
  $sorting_fields=array('login','balance','pay_points','action');
  if(in_array($order[0],$sorting_fields))
    $sql.=", ".implode(' ',$order);
  else
    unset ($order);  
  }
else  
  $sql.=", balance desc";
  
  
print '
      <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2>'.$lang['adm_users_head'].'</h2>';
if($status==1)
print '                 
                                        <ul class="buttons">                                    
                                            <li>
                                              <a href="#" onclick="room_id=\''.$room_id.'\'; add_acc('.$room_id.', '.$status.'); return false;">
                                                <span class="i-plus-2"></span>
                                              </a>
                                            </li>
                                        </ul>';

print '                                        
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="acc_table" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th width="15%" class="sorting ';
                          if(isset($order) && $order[0]=='login')
                            echo $order[1];
print                                                   '" id="tr_login">'.$lang['adm_users_login'].'</th>';
print "<th>Email</th>";
if($status==1)
  print '<th width="10%">'.$lang['adm_users_jp'].'</th>';
  
print '                   <th width="15%" class="sorting ';
                          if(isset($order) && $order[0]=='balance')
                            echo $order[1];
print                                                   '" id="tr_balance">'.$lang['adm_users_balance'].'</th>
													<th width="4%">'.$lang['adm_users_plus'].'</th>
													<th width="4%">'.$lang['adm_users_minus'].'</th>
                          <th width="4%" id="tr_pay_points" class="sorting ';
                          if(isset($order) && $order[0]=='pay_points')
                            echo $order[1];
print                                                   '">'.$lang['adm_users_points'].'</th>
													<th width="10%" id="tr_action" class="sorting ';
                          if(isset($order) && $order[0]=='action')
                            echo $order[1];
print                                                   '">'.$lang['adm_users_status'].'</th>';
                          
if($status==1)
print '<th width="10%">'.$lang['adm_users_spin'].'</th>
													<th width="10%">'.$lang['adm_users_guarantee'].'</th>
													<th width="10%">'.$lang['adm_users_limit'].'</th>
													<th width="3%">'.$lang['adm_users_m_activ'].'</th>
													<th width="3%">'.$lang['adm_users_block'].'</th>
													<th width="3%">'.$lang['adm_users_del'].'</th>';
print '
                                                </tr>
                                            </thead>
                                              <tbody>				
';   


  $res=pager_ajax($sql,$div);
  
  if($res && mysql_num_rows($res)>0)
    {
    $from_date=isset($_POST['fromdate'])?$_POST['fromdate']: REPORT_START_DATE;
    $to_date=isset($_POST['todate'])?$_POST['todate']: REPORT_CURR_DATE;
    
    $from_time=isset($_POST['fromtime'])?$_POST['fromtime']: REPORT_START_TIME;
    $to_time=isset($_POST['totime'])?$_POST['totime']: REPORT_END_TIME;
   
   
    while ($row=mysql_fetch_array($res))
      {
      
      print "
        <tr align='center' id='".$row['id']."'>
          <td><strong><span";
      
      if($row['wait_opl'])
        print ' class="badge badge-warning"';
      elseif($row['status']==4)
        print ' class="badge badge-success"';
      print '>';      
		  if($status==1)
		    print "<a href='#' onclick='edit_acc(".$row['id'].");return false;' style='color: inherit'>".$row['login']."</a>";
      else
        print $row['login'];
      print '</span></strong></td>';
      
      print "<td>".$row['email']."</td>";
        
             if($status==1 && $row['status']==5||$row['status']==6)
                {
                print "<td>";
                $jack_res=mysql_query("select * from jackpots where room_id=$room_id");
                
                while($jack_row=mysql_fetch_assoc($jack_res))
                  {
                  $mast_win=$jack_row['mast_win'];
                  if($mast_win)
                    {
                    if($mast_win==$row['id'])
                      print "
                        <span class=\"badge badge-success\"><a href='?a=users&action=unset_jack&jack=".$jack_row['id']."&uid=".$row['id']."' style='color: inherit'>
                        ".$jack_row['pos']."
                        </a></span>";
                    else
                      print "<span class=\"badge badge-danger\"> ".$jack_row['pos']." </span>";    
                    }
                  else
                    print "
                        <span class=\"badge\"><a href='?a=users&action=set_jack&jack=".$jack_row['id']."&uid=".$row['id']."' style='color: inherit'>
                        ".$jack_row['pos']."
                        </a></span>"; 
                  }
                 print "</td>"; 
                 }
                
          
          if($row['status']<5)
            print "<td colspan=13></td>";
          else
            {  
          print "
          <td><span id='acc_".$row['id']."_balance' class=\"badge badge-success\">".$row['balance']."</span> <span id='acc_".$row['id']."_wager' class=\"badge\">".sprintf("%01.2f",$row['wager'])."</span> <span id='acc_".$row['id']."_bbalance' class=\"badge badge-info\">".sprintf("%01.2f",$row['balance_bonus'])."</span>";
          print "</td>";
          if($status==1|| $status==4)
           {
          print "
          <td align='center'>         
                <a href='#chBalForm' data-toggle='modal' onclick=\"balance_trend='plus';balance_type='real';user_id='".$row['id']."';\"><i class='glyphicon glyphicon-plus-sign'></i></a>";
          print "</td>
          <td align='center'>";
                if($row['wait_opl']>0)
                    {
                    $order_id=mysql_result(mysql_query($sql="select id from output where login='".$row['login']."' and status=0 order by id desc limit 1"),0);
                    if($order_id)
                      print "<a href='?a=outpay_detail&order_id=$order_id'>";
                    else
                      print "<a href='#' onclick='return false'>";
                      
                    print "<i class='glyphicon glyphicon-minus-sign'></i>";
                    }
                  else
                    {
                    // if($kassir_outpay_after_collect)
                    //   echo "<span class='badge'>      </span>";
                    // else
                    //   echo "<a href='#chBalForm' data-toggle='modal' onclick=\"balance_trend='minus';balance_type='real';user_id='".$row['id']."';\"><i class='glyphicon glyphicon-minus-sign'></i></a>";
                    echo "<a href='#chBalForm' data-toggle='modal' onclick=\"balance_trend='minus';balance_type='real';user_id='".$row['id']."';\"><i class='glyphicon glyphicon-minus-sign'></i></a>";
                    }                
          print "</td>";
            }
          
          print "<td><span class='badge'>".$row['pay_points']."</span></td>";
          
          print " 
          <td>";
          if($status==1 && $row['action']>0&&$row['action']!=4)
            echo "<span class=\"badge badge-info\" id='user_".$row['id']."_action' onclick='reset_user_action(".$row['id'].")'>";
          else
            echo '<span class="badge badge-info">';
            
          if($row['action']==2)
            echo $lang['adm_users_action'][$row['action']]." ".$row['last_ge'];
          else  
            echo $lang['adm_users_action'][$row['action']];

          echo "</span>";
          echo "</td>";
          
          
          if($status==1)
                {
                print "<td>
                          <a href='#' onclick='reset_curspin(".$row['id']."); return false'>".$row['curspin']."</a><br>
                          <a href='#' onclick='reset_curspin(".$row['id'].",\"bonus\"); return false'>".$row['curspin_bonus']."</a>
                      </td>
                      <td>
                          <span onclick='edit_garant(this,".$row['id'].")'>".$row['garant']."</span><br>
                          <span onclick='edit_garant(this,".$row['id'].",\"bonus\")'>".(empty($row['garant_bonus']) ? "...":$row['garant_bonus'])."</span>
                      </td>
                      <td><div onclick='edit_payed_spins(this,".$row['id'].");'>".$row['payed_spins']."</div></td>";
                }
          
          if($status==1)
            {
            print "<td>";
                //                                               
                if($row['mail_active_status']==0)
            echo "<a href='' onclick='activate(".$row['id'].",\"mail\"); return false;'><img src='img/noactive.png' /></a> ";
          elseif($row['mail_active_status']==1)
            echo "<a href='' onclick='activate(".$row['id'].",\"mail\"); return false;'><img src='img/wait.png' /></a> "; 
          elseif($row['mail_active_status']==2)
            echo "<a href='' onclick='activate(".$row['id'].",\"mail\"); return false;'><img src='img/active.png' /></a> "; 

            //                                              
           print "</td><td>";
            //                               
              if($row['action']==4)
                print "
                <a href='#' onclick='unlock_user(".$row['id']."); return false;'>
                  <img src='img/noactive.png' />
                </a>";
              else  
                print "
                <a href='#' onclick='lock_user(".$row['id']."); return false;'>
                  <img src='img/active.png' />
                </a>";
            //                 
			print "</td><td><a href='#delUser' data-toggle='modal' onclick='$(\"#delUser .yes\").on(\"click\",function(){location.href=\"?a=users&action=delacc&id=".$row['id']."\"})'>
                  <i class=\"i-cancel-2\"></i>
                </a>";
              
                     
          print "</td>"; 
              }     
            }    
          echo "
        </tr>";
      } 
     
    
    }
  else 
    print "<tr><td align='center' colspan=9>".$lang['adm_msg_54']."</td></tr>"; 
    
  print "
                                            </tbody>
											
                                        </table>                                         
                                        
                                    </div>";
 if($div)
      echo "
          <div class='footer'>
            <div class=\"side fr\">$div</div>
          </div>";                                   
 print                             "</div> 
                            </div>                                
                        </div>
	";   
  }
  
  
function remove_user($remove_user)
  {
  global $login;
  
  $balance=0;
  if(mysql_num_rows($child_res=mysql_query("select id from users where status<5 and creator=$remove_user"))>0)
    {
    //                                ,                            ,                                      
    while($child=mysql_fetch_array($child_res))
       remove_user($child['id']);
    }
  if(mysql_num_rows($child_res=mysql_query("select id from rooms where creator=$remove_user"))>0) 
    {
    //                          ,                                                           ,                                      
    while($child=mysql_fetch_array($child_res))
       remove_room($child['id']);
    } 
  
  //                                                                
  mysql_query("update jackpots set mast_win=null where mast_win=$remove_user");
  
  $remove_row=mysql_fetch_array(mysql_query("select * from users where id=$remove_user"));
  
  $acc_balance=get_balance($remove_row['id']);  
  if(($acc_balance+$remove_row['spin_bank']+$remove_row['bonus_bank']+$remove_row['double_bank'])>0)
    {
    if ($remove_row['status']==5)
      {
      $balance=change_balance($acc_balance,$remove_row['room_id'],$remove_row['id'],2);
      $sql= "UPDATE LOW_PRIORITY rooms set balance=balance+".($remove_row['spin_bank']+$remove_row['bonus_bank']+$remove_row['double_bank'])." where id=".$remove_row['room_id'];
      mysql_query($sql);
      }
    else 
      $balance='success|0';  
    }  
  else
    $balance='success|0';       
  if($balance)
      $a_balance=explode('|',$balance);
    else
      $a_balance=false;
              
    if($a_balance&& $a_balance[0]=='success')
      {
    
    $sql= "delete users, enter, logip, game_log from users left join enter using(login) left join logip on(logip.user_id=users.id) left join game_log on(game_log.user_id=users.id) where  users.id=".$remove_row['id'];
    mysql_query($sql) or save_log($sql." ".mysql_error(),'db_error.log');
    
    $sql="delete from payments where (user_id=".$remove_row['id'].")";
    mysql_query($sql) or save_log($sql." ".mysql_error(),'db_error.log');
    
    
    save_log(date("Y-m-d H:i:s")." $login                                       ".$remove_row['login']." (ID: ".$remove_row['id']."),                     (".$remove_row['balance'].")                                                id=".$remove_row['creator'], "users.log");
    print "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>           ".$remove_row['login']."             </strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	";
      }
    else
      {
      print "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>                              ".$remove_row['login'].": $a_balance[1]</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
      }                             
  }

  
function get_room_balance($room)
  {
  $sql="select * from rooms where id=$room limit 1";
  $room_res=mysql_query($sql);
  if ($room_res)
    {
    $room_row=mysql_fetch_array($room_res);
    
      return $room_row['balance'];
    
    }
  else 
    return false; 
  }  
  
function change_jack_balance($jack_id, $sum, $game=false)
  {
  global $user_id,$user_denomination;
  @$jack_row=mysql_fetch_array(mysql_query("select jackpots.*, rooms.balance as room_balance from jackpots join rooms on jackpots.room_id=rooms.id where jackpots.id=$jack_id"));
  @$jack_sum=$jack_row['balance'];
  //$sum=$game? $sum*$jack_row['percent']/100 : $sum;
  $jack_allow=true;
  
  if (($jack_sum+$sum)>=0 && $jack_allow)
    {
    

	//simon add min_jp field.
    $sql="UPDATE LOW_PRIORITY jackpots
            set
				min_jp = $sum,
              balance=balance+$sum
            where
              id=$jack_id";
    if(mysql_query($sql))
      {
      $txt='                            <b>'.$jack_row['name']."</b> ";
      if ($game)
        {$txt.="               <b>$game</b> ";
        //mysql_query("UPDATE LOW_PRIORITY rooms set income = income-$sum where id=".$jack_row['room_id']);
        }
      $txt.="                <b>$sum</b>                     <b>".($jack_sum+$sum)."</b>";
      if(!$game)
        {
      //mysql_query($sql="insert low_priority into payments (user,to_id,to_type, from_id, from_type, suma)values($user_id, ".$jack_row['room_id'].", 3, ".$jack_row['room_id'].", 2, $sum)") or save_log($sql."\r\n".mysql_error(),"db_error.log");  
      if(mysql_query("INSERT LOW_PRIORITY jack_history (jack_id,user_id,txt) values ($jack_id,$user_id, '$txt')"))
        return "success|".sprintf("%01.4f",($jack_sum+$sum));
      else
        return "                               ($sql)                                   ".mysql_error(); 
        }
      else
        {
        return "success|".sprintf("%01.4f",($jack_sum+$sum));
        } 
      }
    else
      return "                               ($sql)                                   ".mysql_error();            
    }
  elseif($jack_allow==false)
    return "                                         ";
  else
    {
    return "                                                                                 ";
    }  
  }   


  function reset_jack_balance($jack_id, $sum, $game=false)
  {
  global $user_id,$user_denomination;
  @$jack_row=mysql_fetch_array(mysql_query("select jackpots.*, rooms.balance as room_balance from jackpots join rooms on jackpots.room_id=rooms.id where jackpots.id=$jack_id"));
  @$jack_sum=$jack_row['balance'];

  @$min_jp=$jack_row['min_jp']; 
  //$sum=$game? $sum*$jack_row['percent']/100 : $sum;
  $jack_allow=true;
  
  if (($jack_sum+$sum)>=0 && $jack_allow)
    {
	//simon add min_jp field.
    $sql="UPDATE LOW_PRIORITY jackpots
            set
              balance=balance+ $sum
            where
              id=$jack_id";
    if(mysql_query($sql))
      {
      $txt='                            <b>'.$jack_row['name']."</b> ";
      if ($game)
        {$txt.="               <b>$game</b> ";
        //mysql_query("UPDATE LOW_PRIORITY rooms set income = income-$sum where id=".$jack_row['room_id']);
        }
      $txt.="                <b>$sum</b>                     <b>".($jack_sum+$sum)."</b>";
      if(!$game)
        {
      //mysql_query($sql="insert low_priority into payments (user,to_id,to_type, from_id, from_type, suma)values($user_id, ".$jack_row['room_id'].", 3, ".$jack_row['room_id'].", 2, $sum)") or save_log($sql."\r\n".mysql_error(),"db_error.log");  
      if(mysql_query("INSERT LOW_PRIORITY jack_history (jack_id,user_id,txt) values ($jack_id,$user_id, '$txt')"))
        return "success|".sprintf("%01.4f",($jack_sum+$sum));
      else
        return "                               ($sql)                                   ".mysql_error(); 
        }
      else
        {
        return "success|".sprintf("%01.4f",($jack_sum+$sum));
        } 
      }
    else
      return "                               ($sql)                                   ".mysql_error();            
    }
  elseif($jack_allow==false)
    return "                                         ";
  else
    {
    return "                                                                                 ";
    }  
  }   


  
function get_user_info($id, $id_field='id')
  {
  global $user_id, $status,$user_creator,$room;
  $report_user_id=$status==3? $user_creator: $user_id;
    $sql="select * from users where room_id=$room and $id_field='$id'";
  
  $res=mysql_query($sql);
  if($res && mysql_num_rows($res)==1)
    {
    return mysql_fetch_array($res);
    }
  else
   return false;  
  }  

function check_right($id, $type)
  {
  global $status;
  if($type=='report')
    {
    $sql="select dostup from report_menu where id=$id";
    @$dostup_str=mysql_result(mysql_query($sql),0);
    $dostup_arr=$dostup_str===false? array(): explode('|',$dostup_str);
    if (in_array($status,$dostup_arr))
      return true;
    else
      return false;
    }
  return false;
  } 
  

  
function get_freegame_prize($user_id,$game,$allbet,$min_win)
  {
  global $conf;
  
  $bank_percent=100;
  $bank=get_bank($user_id,$game);
  $max_prize=$bank*$bank_percent/100;
  
  $min_prize=$allbet*$min_win*3*7;
  if($bank<$min_prize) $min_prize=$bank;
  
  $prize=rand($min_prize, $max_prize);
  
  return $prize;
  } 
  
function get_bet($game_name,$is_allbet=true)
  {
   $allbet=0;
   
   
   $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : 'error';
	 $action = str_replace("-","", $action);
	 $action = str_replace("`","", $action);
	 $action = str_replace("'","", $action);
	 
	 if ($action != 'error')
	   {
	    if ($action == "ge_play")
	     {//                        
       if (!isset($_SESSION[$game_name.'_freenumspin'])) //                                                              
        {
        $bet = isset($_POST['bet']) ? $_POST['bet'] : 0;
		    $line = isset($_POST['lines']) ? $_POST['lines'] : 0;
        $allbet = $bet * $line;
        }
       }
      elseif(($game_name=='black_jack'||$game_name=='carib_poker') && ($action=='addbet'||$action=='play'||$action=='spin'))
        {
        $bet=explode("|",$_POST['bets']);
        $allbet=0;
        for($i=0;$i<=7;$i++){
          if(isset($bet[$i])&&$bet[$i]>0){
            $allbet+=$bet[$i];
            }
          }
        $bet=$allbet;  
        }                                                                                                
      elseif($game_name=='black_jack'&& $action='double') 
        {
        $curBox=$_POST['box'];
        $bet=$allbet = $_SESSION['boxes'][$curBox];        
        }         
	    else
	     {
	    $asc = explode( "|", $action );
		  $action = str_replace( "action=", "", $asc[0] );
		  if($action == "ge_play")
        {
        
        $bet = str_replace( "bet=", "", $asc[1] );
		    $lines = str_replace( "lines=", "", $asc[2] );
		    $allbet = $bet * $lines;
        }
      elseif($action == "spin")
        {
        if(isset($_POST['betline'])&& isset($_POST['lines']))
          {
          $bet =  $_POST['betline'];
		      $line = $_POST['lines'];
          }
        elseif(isset($_POST['nb_coins'])&& isset($_POST['nb_lines']))
          {
          $bet =  $_POST['nb_coins'];
		      $line = $_POST['nb_lines'];
          }  
        if (isset($bet))
          $allbet = $bet * $line;
        elseif (isset($_POST['bets'])) 
          {
          $bets=explode("|" , $_POST['bets']);
          $allbet = 0;
          foreach($bets as $bet)
            {
            if($bet)
              {$cur_bet=explode(":" , $bet);
              $allbet+=$cur_bet[1];
              } 
            }
          }
        else
          $allbet = 0;
        }
       }
      }
    if($game_name=='roulette_euro')
      $bet=$allbet;  
      
    if($is_allbet)  
      return $allbet; 
    else
      return $bet; 
  }  

function iconv_deep($e1, $e2, $value)
{
   if (is_array($value))
   {
      $item = null;
      foreach ($value as &$item)
      {
         $item = iconv_deep($e1, $e2, $item);
      }
      unset($item);
   }
   else
   {
      if (is_string($value)) $value = mb_convert_encoding($value, $e2, $e1);
   }
   return $value;
}   

 

function change_income($sum)
  {
  global $room;
  
  if (strpos($_SERVER['PHP_SELF'],'ge_server.php') && $user_denomination!=1 && $user_denomination!=0 )
    {
    $sum=$sum/$user_denomination;
    }
  
  if($sum>0)
    $sql="update low_priority rooms set income=income+$sum where id=$room";
  else
    $sql="update low_priority rooms set income=income$sum where id=$room";
  save_log($sql,'income.log');  
  if(mysql_query($sql))
    return true;
  else
    {
    save_log($sql.':' .mysql_error(),'db_error.log');
    return false;
    }  
  }
  
function get_game_percout($g_id,$arr)
  {
  //                                                                                                                                       
  return 1;
  }

function action_match($action_need)
  {
  $action_arr=isset($_REQUEST['action'])? explode('|',$_REQUEST['action']): array('');
  //save_log($_REQUEST['action'],'action');
  $action=$action_arr[0];
  $action=str_replace('action=','',$action);
  //save_log($action,'action');
  if($action_need=='spin')
    {
    if($action=='spin'||$action=='ge_play'||$action=='addbet')
      return true;
    else
      return false;  
    }
  return false;  
  }  
  
function prettyUsername($username) {
      if(strlen($username)==12)
        {
        $username_arr=str_split($username,4);
        }
      elseif (strlen($username)==6) 
        {
        $username_arr=str_split($username,4);
        
        }
      return implode('-',$username_arr);   
		}   
    
function spin($action,$bet,$line)
  {
  global $user_info,$game_name,$conf,$room,$db;
  $log_file='spin.log';
  save_log(date("********* Y-M-d H:i:s *********"),$log_file);
  save_log("spin($action,$bet,$line)",$log_file);
  save_log("game_name: $game_name",$log_file);
  if(isset($user_info['login'],$user_info['id']))
  save_log("user: ".$user_info['login']."(".$user_info['id'].")",$log_file);
  $allbet=$bet*$line;
  
  $bank_id= isset($_SESSION['bank_id'])? intval($_SESSION['bank_id']): false;

  save_log("bank_id: ".$bank_id,$log_file);
  $garant=$user_info['garant'];
  save_log("garant: ".print_r($garant,1),$log_file);
  
  $garant_bonus=$user_info['garant_bonus'];
  save_log("garant_bonus: ".print_r($garant_bonus,1),$log_file);
  $win=array('type'=>'not','sum'=>0);
  $bank=0; 
  //                                                           
  if($action=='spin' || $action=='freespin')
    {
    if($action=='spin')
    {
    if(isset($user_info['id']))
      {
    //                      1                                                     
    mysql_query($sql="update low_priority users set payed_spins=payed_spins-1 where id= ".$user_info['id']." and payed_spins-1>=0");
    save_log(print_r($sql,1),$log_file); 
       
    //                                                                     
    mysql_query($sql="update users set curspin=curspin+1, curspin_bonus=curspin_bonus+1 where id=".$user_info['id'])or save_log(mysql_error(),'db_error.log');
    save_log(print_r($sql,1),$log_file);
    
    
    if(preg_match('~(games/)(.+)(/ge_server.php|ge_init.php)~i',$_SERVER['PHP_SELF'],$matches) && !$user_info['demomode'])
     {
    //                                                 
    $game= substr($matches[2],strpos($matches[2],'/')+1);
    
    
    if($freespin=freespin_Bonus::is_active($game))
      {
          $sql= "UPDATE bonus_user set spin=ifnull(spin,0)+1 where status='1' and bonus_id=".$freespin['bonus_id']." and user_id=".$user_info['id'];
          $db->run($sql);
      }
     } 
     
      }
    else
      {
      mysql_query($sql="update users_tmp set curspin=curspin+1, curspin_bonus=curspin_bonus+1 where sid='".session_id()."'")or save_log(mysql_error(),'db_error.log');
      save_log(print_r($sql,1),$log_file);
      }  
    $user_info['curspin']++;
    $user_info['curspin_bonus']++;
    }
    elseif($action=='freespin')
    {
    if($user_info['id'])
      {
      mysql_query($sql="update users set curspin_bonus=curspin_bonus+1 where id=".$user_info['id'])or save_log(mysql_error(),'db_error.log');
      }
    else
      {
      mysql_query($sql="update users_tmp set curspin_bonus=curspin_bonus+1 where sid='".session_id()."'")or save_log(mysql_error(),'db_error.log');
      }  
    save_log(print_r($sql,1),$log_file);
    $user_info['curspin_bonus']++;
    }
    save_log("user_info['curspin']: ".print_r($user_info['curspin'],1),$log_file);
    
    save_log("user_info['curspin_bonus']: ".print_r($user_info['curspin_bonus'],1),$log_file);
    
   
    
    if($user_info['curspin_bonus']>=$garant_bonus[0])
      {
      $win=array('type'=>'bon','sum'=>$garant_bonus[1]*$allbet);
      $bank=get_bank_('bonus',$allbet,$user_info);
      save_log("bank: $bank",$log_file);
  
      if($user_info['id'])
        mysql_query("update users set curspin_bonus=0 where id=".$user_info['id']);
      else  
        mysql_query("update users_tmp set curspin_bonus=0 where sid='".session_id()."'");
      $user_info['curspin_bonus']=1;
    
      save_log("user_info['curspin_bonus']: is reset",$log_file);

      $available_garant_bon=explode(',',$conf['garant_bon_opt']);
      save_log("available_garant_bon: ".print_r($available_garant_bon,1),'garant_win.log');
      $garant_bon_key=array_rand($available_garant_bon);
      save_log("garant_bon_key: $garant_bon_key",'garant_win.log');
      $garant_bon=explode('|',$available_garant_bon[$garant_bon_key]);
      save_log("garant_bon: ".print_r($garant_bon,1),'garant_win.log');
      /*if($user_info['payed_spins']<=0) //                                                                                                                                                    
          {
          $win_koef=isset($conf['win_koef'])? $conf['win_koef'] : 2;
          $garant_bon[0]=$garant_bon[0]*$win_koef;
          save_log("garant_bon(                  ): ".print_r($garant_bon,1),'garant_win.log');
          }*/
      $user_info['garant_bonus']=$garant_bon;
      if(isset($user_info['id']) && $user_info['id'])
        mysql_query("update users set garant_bonus='".implode('|',$garant_bon)."' where id=".$user_info['id']);
      else  
        mysql_query("update users_tmp set garant_bonus='".implode('|',$garant_bon)."' where sid='".session_id()."'");
      }
    elseif($user_info['curspin']>=$garant[0])
      {
      $win=array('type'=>'win','sum'=>$garant[1]*$allbet);
      $bank=get_bank_('spin',$allbet,$user_info);
      save_log("bank: $bank",$log_file);
      
      if(isset($user_info['id']))
        mysql_query("update users set curspin=0 where id=".$user_info['id']);
      else
        mysql_query("update users_tmp set curspin=0 where sid=".session_id());  
      $user_info['curspin']=1;
    
      save_log("user_info['curspin']: is reset",$log_file);
      
      $available_garant_win=explode(',',$conf['garant_win_opt']);
      save_log("available_garant_win: ".print_r($available_garant_win,1),$log_file);
      $garant_win_key=array_rand($available_garant_win);
      save_log("garant_win_key: $garant_win_key",$log_file);
      $garant_win=explode('|',$available_garant_win[$garant_win_key]);
      save_log("garant_win: ".print_r($garant_win,1),$log_file);
      if($user_info['payed_spins']<=0) //                                                                                                                                                    
        {
        $win_koef=isset($conf['win_koef'])? $conf['win_koef'] : 2;
        $garant_win[0]=$garant_win[0]*$win_koef;
        save_log("garant_win(                  ): ".print_r($garant_win,1),$log_file);
        }
      $user_info['garant']=$garant_win;
      if(isset($user_info['id']))
        mysql_query("update users set garant='".implode('|',$garant_win)."' where id=".$user_info['id']);
      else
        mysql_query("update users_tmp set garant='".implode('|',$garant_win)."' where sid='".session_id()."'");
      }
    save_log("win: ".print_r($win,1),$log_file);  
    if($win['sum']>$bank)
       $win['sum']=$bank;
    save_log("win: ".print_r($win,1),$log_file);   
    }
  return $win;  
  }
  
function get_add_bonuses()
  {
  global $room;
  $sql= "select 
          sum(g_bon1_2) 
          from game_settings where room_id=$room";
  
  return mysql_result(mysql_query($sql),0);
  }

function user_mail ($mail_id,$pay_user_id=false,$teg_array=false,$replay_mail=null)
  {
  global $conf,$user_id,$language,$mail_byID,$db;
  
  
  $mail = new mail();
  $mail->type= intval($conf['mail_type']);
  
  if($mail->type===1)
    {
    $mail->smtp_host=$conf['mail_smtp_host'];
    $mail->smtp_port=$conf['mail_smtp_port'];
    $mail->smtp_user=$conf['mail_smtp_user'];
    $mail->smtp_pass=$conf['mail_smtp_auth'] ? $conf['mail_smtp_pass']: false;
    }
  //                                                                        
  //$res=$mail->send('logitec@pochta.ru','subj','text');

  
  $mail_user=$pay_user_id ? $pay_user_id : $user_id;
  //save_log($mail_user);
  $user_info=$db->get_row("select * from users where id=$mail_user");
  //save_log(print_r($user_info,1));
  $row=$db->get_row("select * from mail_tmp where lang='$language' and id=$mail_id union select * from mail_tmp where lang='ru' and id=$mail_id");
  $subject = $row['subj'];
  $text=$row['body'];
    
  if(isset($conf['mail_text_type'])&& $conf['mail_text_type']!=0)
    {
    if(file_exists(THEME_DIR.'/email/'.$mail_byID[$row['id']].'_'.$language.'.tpl'))
      {
      $text_tmp=file_get_contents(THEME_DIR.'/email/'.$mail_byID[$row['id']].'_'.$language.'.tpl');
      $text= str_replace('{%text%}',$text, $text_tmp);
      $text= str_replace('{%subject%}',$subject, $text);
     
      $theme_dir= isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] ?'https://' :'http://'.$_SERVER['HTTP_HOST'].($_SERVER['SERVER_PORT']!='80'? ':'.$_SERVER['SERVER_PORT'] :'').THEME_URL;
      $text= str_replace('{$theme_url}',$theme_dir, $text);
      }
    else
      {
      save_log('                               '.THEME_DIR.'/email/'.$mail_byID[$row['id']].'_'.$language.'.tpl ('.$row['id'].')','mail.err');
      return false; 
      }
       
    }
  
  //                                                    
  
  if($teg_array)
  foreach ($teg_array as $key=>$val)
     {
      if(!is_array($val))
      {
      $text= str_replace('{%'.$key.'%}',$val, $text);
      $text= str_replace('{$'.$key.'}',$val, $text);
      $subject= str_replace('{%'.$key.'%}',$val, $subject);
      }
     } 
  foreach ($conf as $key=>$val)
     {
     if(!is_array($val))
      {
      $text= str_replace('{%'.$key.'%}',$val, $text);
      $text= str_replace('{$conf['.$key.']}',$val, $text);
      $subject= str_replace('{%'.$key.'%}',$val, $subject);
      }
     }
     
  foreach ($user_info as $key=>$val)
     {
     if(!is_array($val))
      {
      $text= str_replace('{%'.$key.'%}',$val, $text);
      $text= str_replace('{$user_info['.$key.']}',$val, $text);
      $subject= str_replace('{%'.$key.'%}',$val, $subject);
      }
     } 
  
  
       
  if($pay_user_id)
    {
    $mail->smtp_from=$conf['mail_from'];
    $mail->smtp_reply=$conf['mail_reply'];
    $result=$mail->send($user_info['email'],$subject,$text);
    save_log($result,"mail.log");
    return $result;
    } 
  else
    {
    $mail->smtp_from=$conf['mail_from'];
    $mail->smtp_reply=$user_info['email'];
    return $mail->send($conf['adm_email'],$subject,$text);
    }
   
  }
  
function save_stat_outpay($sum,$login,$status,$paysys,&$inv_code)
  {
  global $conf,$user_id, $db;
  do{
    $inv_code=generator('on','off','on','off',10);
    }
  while ($db->get_one("select count(*) from output where inv_code='$inv_code'"));
  $sum_out=$sum - $sum / 100 * $conf['outpay_tax_perc'] - $conf['outpay_tax_sum'];
  
  if($db->run('INSERT INTO output (inv_code,sum, date, login, status, ps, sum_out) VALUES ("'.$inv_code.'", "'.$sum.'", "'.time().'", "'.$login.'", "'.$status.'", "'.$paysys.'", '.$sum_out.')'))
    {
    $order_id=$db->insert_id;
    $db->run("INSERT INTO output_history values (null,$order_id,$user_id,now(),0)");
    return true;
    }
  return false;
  }  

function save_stat_pay($sum,$login,$status,$paysys,&$inv_code)
  {
  global $conf,$db;
  $ip=getip();
  if(strpos($login,'id:')!== false)
    {
    $id=str_replace('id:','',$login);
    $sql="select login from users where id=$id";
    
    if(!$login=$db->get_one($sql))
      {
      return false; 
      }
    }

  do{              
    $inv_code=generator('on','off','on','off',10);
    }
  while ($db->get_one("select count(*) from enter where inv_code='$inv_code'")>0);
  
  if(preg_match('~bonus|return~',$paysys) || preg_match('~\_bon~',$paysys) || preg_match('~pay\_point~',$paysys))
    $return=2;
  //elseif(($conf['return_date']==date('Y-m-d') || (date('w')==$conf['return_weekday'])))
  //  $return=1;
  else
    $return=0;
  
  $db->run($sql='INSERT INTO enter (inv_code,sum, date, login, status, paysys,`returned`,`ip`) VALUES ("'.$inv_code.'", "'.$sum.'", "'.time().'", "'.$login.'", "'.$status.'", "'.$paysys.'", '.$return.', "'.$ip.'")');
  return $db->insert_id;
  }  

function set_bonus()
  {
  global $login,$demomode,$conf,$lang, $user_info;
  
  if ($demomode && check_module_activate('FAN-mod'))
    {
    $demobonus=isset($conf['demo_bonus'])? $conf['demo_bonus'] : 1000;
    if ($demobonus>0){
    $sql= "update users set balance_demo=balance_demo+$demobonus, last_demobonus=current_date where last_demobonus < current_date and login='$login'";
    mysql_query($sql);
    
    if (mysql_affected_rows()<1)
      return -1;
    else
      return $demobonus;
    }
    else
      return 0;
    }
  else
    {
  if($user_info['use_wager']==0)
    {
    return -4;
    }  
  $bonus=mt_rand($conf['bonus_daily'][0],$conf['bonus_daily'][1]);
  if ($bonus>0)
    {
    
      //$payed_spin=$conf['payed_spins_fixed']? $conf['payed_spins_val']: $conf['spin_koef']*$bonus;
      $payed_spin=$conf['payed_spins_val'];
      
      $sql= "select * from enter where from_unixtime( date, '%Y-%m-%d' ) = curdate( ) and paysys='bonus' and login='$login'";
  if (mysql_num_rows(mysql_query($sql))==0)
  {
  save_stat_pay($bonus,$login,'2', 'bonus', $inv_code);
		if(isset($inv_code) && $inv_code) 
    {
    $sql="update users set balance=balance+$bonus,balance_bonus=balance_bonus+$bonus, wager=wager+$bonus*".$conf['bonus_daily'][2].", payed_spins=$payed_spin where login='$login'";
    mysql_query($sql) or save_log($sql."\r\n".mysql_error(),'db_error.log');
    
    return $bonus;
    }
  else  
    return -2;
  }
  else
  return -3;
    }
  else
    return 0;
  }
  }
  
function fill_stat_game()
  {
  global $conf, $db, $g_ver;
  // "                                                                  <br>";

  $rows_num=10;
  
  $sql="select stat_game.id,date_time,login,stat_game.balans,stat_game.stav,stat_game.win,stat_game.game from stat_game join users on(users.id=stat_game.user_id) join game_settings on(game_settings.g_name=stat_game.game) where g_ver in ($g_ver) and (unix_timestamp(date_time)+".($conf['botstat_timeout']).")>".time()." union select stat_game_bot.* from stat_game_bot join game_settings on(game_settings.g_name=stat_game_bot.game) where g_ver in ($g_ver) and (unix_timestamp(date_time)+".($conf['botstat_timeout']).")>".time();
  $stat_num=$db->get_one($sql);
  
  $num=0;
  if($stat_num<$rows_num)
    $num=$rows_num-$stat_num;
  else
    {
    $sql="select * from stat_game_bot where (unix_timestamp(date_time)+".($conf['botstat_timeout']).")>".time();
    $bot_num=mysql_num_rows(mysql_query($sql));
    if($bot_num==0)
      $num=1;
    }  
  for($i=$num;$i>=1;$i--)
    {
    //echo "<br>                                       <pre>";
    $bot_login_a=explode(',',$conf['botstat_logins']);
    $bot_stav_a= explode(',',$conf['botstat_stav']);
    $bot_win_a= explode(',',$conf['botstat_win']);
    
    
    $bot_login= $bot_login_a[array_rand($bot_login_a)];
    $bot_stav= $bot_stav_a[array_rand($bot_stav_a)];
    $bot_win= $bot_win_a[array_rand($bot_win_a)];
    
    $now=time();
    
    $sql="create temporary table IF NOT EXISTS tmp_date SELECT max(date_time) as dat FROM `stat_game` union select max(date_time) from stat_game_bot union select now()- interval ".($conf['botstat_timeout']*$i)." second";
    $res=mysql_query($sql) or save_log($sql. "\r\n". mysql_error(),"db_error.log");
    $sql=" select unix_timestamp(max(dat)) from tmp_date";
           
    /*$time_start=$now-$conf['botstat_timeout']*$i;
    $time_end=$now-$conf['botstat_timeout']*($i-1);
    */
    $res=mysql_query($sql) or save_log($sql. "\r\n". mysql_error(),"db_error.log");
    $time_start=mysql_result($res,0);
    $time_end=$now;
    
    $time=rand($time_start,$time_end);
    
    $sql="select g_name from game_settings where g_view=1 and g_ver in($g_ver) order by rand() limit 1";
    $res=mysql_query($sql);
    if($res && mysql_num_rows($res)==1)
      $statgame= mysql_result($res,0);
    else
      $statgame=false;
    
    if($statgame)
      {    
    $sql="insert into stat_game_bot values (null, from_unixtime($time), '$bot_login', 0, $bot_stav, $bot_win, '$statgame')";
    mysql_query($sql) or print(mysql_error()); 
    //$sql = "DELETE `stat_game_bot`.* FROM `stat_game_bot` LEFT JOIN (SELECT `id`, 1 AS `delete` FROM `stat_game_bot` AS `sgb` ORDER BY `date_time` desc LIMIT 9) AS `tmp_tbl` ON (stat_game_bot.id = tmp_tbl.id) WHERE tmp_tbl.delete is null";
    $sql="DELETE from stat_game_bot where  ADDDATE(date_time, INTERVAL 1 day) < now()";
    mysql_query($sql) or print(mysql_error());
      }    
    }
  }
  
function get_log_strings($log_id=false)
  {
  $idstr=$log_id ? $log_id : (isset($_GET['log_id'])? intval($_GET['log_id']):false);
  if ($idstr)
    {
    //                                                              |
    while (substr($idstr,strlen($idstr)-1,strlen($idstr))=='|')
      $idstr=substr($idstr,0,strlen($idstr)-1); 
    $ids=explode("|",$idstr);
    array_walk($ids, 'array_strip_tags');
    
    $sql="select t1.*, t2.login, t3.g_name from game_log t1 join users t2 on(t1.user_id=t2.id) join game_settings t3 on (t1.game_id=t3.g_id) where t1.id in (".implode(',', $ids).")";
    $result=mysql_query($sql);

    $rtn='';
    while (false!==($res=mysql_fetch_assoc($result))) 
      {

      $tmp_post=explode(":",$res['post']);
      
      foreach ($tmp_post as $value)
        {
        $key=substr($value,0,strpos($value, '='));
        //echo "<br>";
        $val= substr($value,strpos($value, '=')+1);
        //echo "<br>";
        $post[$key]=$val;
        }
        
      //                                 action                                  
      
      if (preg_match('/action=/',$post['action']))  
        {        
        $action_tmp=explode("|",$post['action']);
        foreach ($action_tmp as $value)
          {
          $key=substr($value,0,strpos($value, '='));
          $val= substr($value,strpos($value, '=')+1);
          $act[$key]=$val;
          }
        if (($action=$act['action'])!="ge_init")  
          {
          $lines= $act['lines'];
          $bet=  $act['bet'];
		  
		   //////////add
		  if($act['action']=="double"){
		  $bet=$action_tmp[1];
		  }
		  //////////add
		  
          }
        
        }
        else
        {
        if (($action=$post['action'])!="state" && $action!="ge_init")
          {
          $lines=$post['lines'];
          $bet=$post['bet'];
          }
        }
          
      
      if($action!="ge_init" && $action!="state" )
        {
        $rtn[]=str_replace('&','vc',$res['g_time']."!".$res['g_name']."!".$res['login']."!".$res['ip']."!".$res['str']."set:".$lines."|".$bet."!".$action);
        }

      }

    if (isset($rtn)&& is_array($rtn))
      return implode('::', $rtn);
    else
      return '';
    
    }
  else
    return false;
  }

//                             DEMO

function remove_users($remove_users)
  {
  
  $remove_row=mysql_fetch_array(mysql_query("select * from users where id=$remove_users"));

  $sql= "delete users from users where users.id=".$remove_row['id'];
  mysql_query($sql);

  }
  
?>