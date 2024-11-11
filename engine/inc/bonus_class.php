<?php

$bonus_types=array('reg'=>'                           ',
                   'dep'=>'                    ',
                   'nondep'=>'                           ',
                   'vip'=>'VIP         ',
                   'return'=>'                ',
                   'freespin'=>'                '
				   );

class Bonus{
function __construct($id=false)
    {
    global $db,$user_id,$login,$conf,$language,$lang;
    if(isset($db)) $this->db=$db;
    if(isset($lang)) $this->lang=$lang;
    if(isset($language)) $this->language=$language;
    if(isset($conf)) $this->conf=$conf; 
    $this->debug=true;
    
    if($this->debug) save_log('===== Bonus('.$id.")=====", 'bon.log');
    if($this->debug) save_log("user_id: $user_id", 'bon.log');
    
    if($id)
      {
      if(is_array($id))
        $this->info=$id;
      else
        $this->get($id);
      }
    else
      {  
    //                                                     
    $old_bon=$db->run ("update bonus_user join bonus on (bonus_user.bonus_id=bonus.id) set status='3' where status='0' and bonus_user.start_time + interval activate_time day< now()");
    if($this->debug) save_log('old_bon='.$old_bon, 'bon.log');
    
    //                                                                               live_time
    $sql="select * from  bonus  join bonus_user on (bonus_user.bonus_id=bonus.id) where status='1' and live_time is not null and bonus_user.start_time + interval live_time day< now()";
    if($ended_bonuses=$this->db->get_all($sql))
      {
      if($this->debug) save_log('end_bon='.print_r($ended_bonuses,1), 'bon.log');
      foreach($ended_bonuses as $ended_bonus)
        {
        $this->deactivate($ended_bonus);
        unset($end_bon);
        }
      }
    //                                                                                                                                   
    $sql="update bonus_user join bonus on (bonus_user.bonus_id=bonus.id) set status='4' where end_time is not null and curtime() not between bonus.start_time and bonus.end_time and curdate() between start_date and end_date";
    $db->run($sql);
    
    //                                                                
    //if($loop_bonuses=$this->db->get_all("select * from bonus where is_reg=0 and is_loop=1 and dayofweek(start_date)=dayofweek(now()) and start_date<date(now())" ))
    if($loop_bonuses=$this->db->get_all($sql_="SELECT bonus.* FROM `bonus` left join (select bonus_id as id from bonus_user where user_id=$user_id and date(start_time)=date(now())) as tmp using (id)  WHERE is_loop=1 and dayofweek(start_date)=dayofweek(now()) and now() between start_date and end_date and tmp.id is null and bonus.users in (0,1)"))
      {
      if($this->debug) save_log('loop_bonuses='.print_r($loop_bonuses,1), 'bon.log');
      foreach($loop_bonuses as $bonus)
        {
        $start_time= new DateTime($bonus['start_time']);
        $now_time=   new DateTime(date('H:i:s'));
        $start_time=$bonus['start_time']=='null' ? 'now()': "concat(curdate(),' ','".$bonus['start_time']."')";
        $end_time=$bonus['end_time']=='null' ? 'null': "concat(date(now()),' ','".$bonus['start_time']."')";
          $sql="insert ignore into bonus_user select null, ".$bonus['id'].",id,$start_time,'0',null,0,0 from users where users.status in (5,6)";
          if($bonus['type']=='nondep')
            {
            if ($bonus['num_deposit']==0)
              $sql.=" and payin_total=0";
            else  
              $sql.=" and payin_total>0";
            }
          if($this->debug) save_log('loop_bonuses_sql='.print_r($sql,1), 'bon.log');
        $db->run($sql);   
        }
       }
      } 
      
    //                                                                      
              
    //$this->refresh_num_deposit($user_id);   
     }
    
  function get($bonus_id){
    $this->info=$this->db->get_row("select * from bonus where id=$bonus_id");
    return $this->info;
    }
    
  public static function get_active($type){
    global $user_id, $db;
    
    $bonus=$db->get_row("select * from bonus join bonus_user on (bonus_user.bonus_id=bonus.id) where type='$type' and user_id=$user_id and status='1'");
    
    if($type=='freespin')
      {
      if($bonus['max_bon']==$bonus['spin'])
        {
        $bon_tmp= new Bonus($bonus);
        $bon_tmp->deactivate($bonus);
        $bonus=false;
        }
      }
    
    return  $bonus;
    } 
    
  public static function refresh_num_deposit($user=false){
    global $user_id, $db;
    $user=$user ? intval($user) : $user_id;
    $count_deposit=$db->get_one("select count(*) from enter join users using (login) where users.id=$user and enter.status=2 and (paysys not like 'bonus%' and paysys <> 'pay_point')");
    $sql="delete bonus_user from bonus_user join bonus on (bonus.id=bonus_user.bonus_id) where user_id=$user and `type`<>'nondep' and ifnull(num_deposit,0)>0 and num_deposit<=$count_deposit and bonus_user.status='0'" ;
    $db->run($sql);
 
    if($count_deposit)
      {
      $sql="insert ignore into bonus_user select null,id,$user,if(start_time is null, now(), concat(date(now()),' ',start_time)),'0',null,0,0 from bonus where now() between start_date and end_date  and (type='nondep' and num_deposit=".($count_deposit ? 1: 0).")";
      $db->run($sql);
      
      $sql="delete bonus_user from bonus_user join bonus on (bonus.id=bonus_user.bonus_id) where user_id=$user and `type`='nondep' and ifnull(num_deposit,0)=0 and bonus_user.status='0'";
      $db->run($sql);
      }
    
  }  
    
  public static function deactivate($info=false){
    global $balance, $db;
    if($info)
      {
      if($info['type']=='return'&& $balance==0)
        {
        $start_unix_time=strtotime($info['start_time'])-10;
        $end_unix_time=$start_unix_time+$info['live_time']*60*60*24;
        
        
        $sql="select sum(`sum`) from enter where date between $start_unix_time and $end_unix_time and returned='0' and login=(select login from users where id=".$info['user_id'].")";
        //save_log($sql);
        $sum=$db->get_one($sql);
        //save_log("sum: ".$sum);
        $bonus_sum=$sum*$info['perc']/100;
        //save_log("bonus_sum: ".$bonus_sum);
        
        $bal=change_balance($bonus_sum, $info['user_id'], 'bonus_return_'.$info['id']);
        if($bal)
              $a_balance=explode('|',$bal);
            else
              $a_balance=false;
              
            if($a_balance&& $a_balance[0]=='success')
              {
              save_stat_pay($bonus_sum,'id:'.$info['user_id'],2,'bonus_return_'.$info['id'],$inv_code);
              $balance=sprintf("%01.2f",$a_balance[1]); //              ,                                                                    
              $db->run("update enter set returned='1' where date between $start_unix_time and $end_unix_time and returned='0' and login=(select login from users where id=".$info['user_id'].")");
              }
        }
      elseif($info['type']=='freespin')
        {
        if($info['win']>0)
          {
          if($info['max_bon']==$info['spin'])
            {
          $bal=change_balance($info['win'], $info['user_id'], 'bonus_freespin_'.$info['id']);
          if($bal)
              $a_balance=explode('|',$bal);
            else
              $a_balance=false;
              
            if($a_balance&& $a_balance[0]=='success')
              {
              save_stat_pay($info['win'],"id:".$info['user_id'],2,'bonus_freespin_'.$info['id'],$inv_code);
              $balance=sprintf("%01.2f",$a_balance[1]); //              ,                                                                    
              $db->run("update users set balance_bonus=".$info['win'].", wager=".($info['win']*$info['wager']).", wager_bonus=+".($info['win']*$info['wager'])." where id=".$info['user_id']);
              }
            }
          else
            {//                                     -          ,                                                         
            $db->run("update room_banks set spin_bank=spin_bank+".$info['win']." where ".$info['perc']." between from_bets and to_bets");
            $db->run("update bonus_user set win=0 where id=".$info['id']);
            }    
          }
        }  
      return $db->run("update bonus_user set status='2' where bonus_id=".$info['bonus_id']." and user_id=".$info['user_id']." and status='1'");
      }
    else
      return false;  
    }
    
  function activate($deposit=false){
    global $user_id,$user_info,$login,$conf;
    if(isset($this->info))
      {
      if($this->debug) save_log('==activate('.$deposit.')', 'bon.log');
      $info=$this->info;
      $stat_txt=$info['is_reg']?'bonus_reg_'.$info['id']:'bonus_'.$info['type']."_".$info['id'];
      
      if(!$login)
        {
        $user_info=$this->db->get_row("select * from users where id=$user_id");
        $login=$user_info['login'];
        }
      
      if($this->debug) save_log('type='.$info['type'], 'bon.log');
      
      //                                                                                        
      
      if($active_bon=$this->db->get_one("select count(*) from bonus_user join bonus on (bonus_user.bonus_id=bonus.id) where status='1' and type='".$info['type']."' and user_id=$user_id")>0)
          {
          if($this->debug) save_log('active_bon='.$active_bon, 'bon.log');
          return false;
          }
      elseif(intval($deposit)<intval($info['min_deposit']))
          {
          if($this->debug) save_log('deposit='.intval($deposit).'; min_deposit='.intval($info['min_deposit']), 'bon.log');
          return false;
          }
      elseif($info['wager']>0 && $user_info['wager']>0 && $this->info['type']!='freespin')
          {
          if($this->debug) save_log('wager ='.$user_info['wager'] , 'bon.log');
          return false;
          }        
      elseif($info['type']=='dep') //                                             (%                    )
          {
            $bonus_sum=min($deposit*$info['perc']/100,$info['max_bon']);
            $bonus_wager=$bonus_sum*$info['wager'];
            
            $balance= change_balance ($bonus_sum, $user_id,$stat_txt);
              
            if($balance)
              $a_balance=explode('|',$balance);
            else
              $a_balance=false;
              
            if($a_balance&& $a_balance[0]=='success')
              {
              save_stat_pay($bonus_sum,$login,2,$stat_txt,$inv_code);
              $this->db->run("update users set balance_bonus=$bonus_sum, wager=$bonus_wager, wager_bonus=$bonus_wager where id=$user_id");
              }
          }
      elseif($info['type']=='nondep') //                                                          
        {
            $bonus_sum=$info['perc'];
            $bonus_wager=$bonus_sum*$info['wager'];
            $balance= change_balance ($bonus_sum, $user_id,$stat_txt);
            if($this->debug) save_log("change_balance ($bonus_sum, $user_id,$stat_txt)", 'bon.log');
            if($this->debug) save_log("balance: $balance", 'bon.log');  
            if($balance)
              $a_balance=explode('|',$balance);
            else
              $a_balance=false;
              
            if($a_balance&& $a_balance[0]=='success')
              {
              save_stat_pay($bonus_sum,$login,2,$stat_txt,$inv_code);
              $this->db->run("update users set balance_bonus=$bonus_sum, wager=$bonus_wager, wager_bonus=$bonus_wager where id=$user_id");
              }
        
        }    
      elseif($info['type']=='vip')
        {
        //pay_points
        $pay_points_perc=isset($conf['points_pay'])? $conf['points_pay']: '0.25';
        if($this->debug) save_log("pay_points_perc = $pay_points_perc", 'bon.log');
        $pay_points_koef=$pay_points_perc*$info['koef'];
        if($this->debug) save_log("pay_points_koef = $pay_points_koef", 'bon.log');
        $pay_points=$deposit*$pay_points_koef-$deposit*$pay_points_perc;
        $this->db->run("update users set pay_points=pay_points+$pay_points where id=$user_id");
        if($this->debug) save_log("update users set pay_points=pay_points+$pay_points where id=$user_id", 'bon.log');
        }
           
      $sql="update bonus_user set status='1', start_time=now() where bonus_id=".$this->info['id']." and user_id=".$user_id." and status='0'";
      if($this->debug) save_log('sql='.$sql, 'bon.log');
      return $this->db->run($sql);
      }  
    else   
      return false;
    }  
      
  
  function  add(){
    if($fields=$this->db->get_all("SHOW COLUMNS FROM `bonus`"))
      {
      $insert=array();
      foreach ($fields as $field)
        {
        //save_log(print_r($field,1));
        $field_name=$field['Field'];
        if(isset($_REQUEST[$field_name])&& $field_name!='id')
          {
          if(substr($field['Type'],0,2)=='int')
            $insert[$field_name]=$this->db->prepare($_REQUEST[$field_name],1);
          elseif($field['Type']=='time' or $field['Type']=='date')  
            $insert[$field_name]=$_REQUEST[$field_name] ? $this->db->prepare($_REQUEST[$field_name]): 'null';
          else  
            $insert[$field_name]=$this->db->prepare($_REQUEST[$field_name]);
          }
        }
     if($insert['type']=='nondep')  $insert['users']=1;
        
     $insert_keys=array_keys($insert);   
      
      $sql="insert into bonus (`".implode("`,`", $insert_keys)."`) values ('".implode("','", $insert)."')";
      $sql=str_replace("'null'",'null',$sql);
        
      if($this->db->run($sql));
        {
        $bon_id=$this->db->insert_id;
        $start_time=strtotime($insert['start_date'])>time() ? "'".$insert['start_date']." ".$insert['start_time']."'" : ($insert['start_time']=='null' ? 'now()': "concat(date(now()),' ','".$insert['start_time']."')");
        $user_type=isset($insert['users'])?intval($insert['users']) : 0;

        $sql="create temporary table dep_count select login, count(*) as numdep from enter where status=2 and (paysys not like 'bonus%' and paysys <> 'pay_point') group by login";
        $this->db->run($sql);
        
        //if(!$insert['is_loop'] || ($insert['is_loop'] && $_REQUEST['start_date']==date("Y-m-d")))
        if(!$insert['is_loop']) //                                                                                     
          {
        if($insert['num_deposit']==0 && $insert['type']=='nondep')
          $sql="insert into bonus_user select null,$bon_id,id,$start_time,'0',null,0,0 from users where users.status in (5,6) and payin_total=0";
        elseif($insert['num_deposit']==1 && $insert['type']=='nondep')  
            $sql="insert into bonus_user select null,$bon_id,id,$start_time,'0',null,0,0 from users  where users.status in (5,6) and payin_total>0";
        elseif($user_type==0 ||$user_type==1)
          {
          if($insert['num_deposit'])
            $sql="insert into bonus_user select null,$bon_id,id, $start_time,'0',null,0,0 from users left join dep_count using (login) where ifnull(dep_count.numdep,0)<".$insert['num_deposit']." and users.status in (5,6)";
          else
            $sql="insert into bonus_user select null,$bon_id,id, $start_time,'0',null,0,0 from users left join dep_count using (login) where users.status in (5,6)";  
          }
        return $this->db->run($sql);
          }
        return true; 
        }
      }

      return false;  
    } 
  
  
  function  edit(){
    $id=isset($_REQUEST['id']) ? intval($_REQUEST['id']) : false;
    
    $bon=$this->get($id);
    
    foreach ($bon as $key=>$val)
      {
      if(isset($_REQUEST[$key]) && $_REQUEST[$key]!=$val && $key!='id')
        $set[]= "`$key`='".$this->db->prepare($_REQUEST[$key])."'";
      }
    //save_log(print_r($set, 1));  
    if(isset($set))
      return $this->db->run("update bonus set ".implode(',',$set)." where id=$id");
    else
      return true;
    } 
    
   function get_avail($user_id)
    {

    //$sql="select *, unix_timestamp(bonus_user.start_time) as start_time, unix_timestamp(bonus.end_time) as end_time from bonus_user join bonus on(bonus.id=bonus_user.bonus_id) where (status='0' or (status='1' and type not in ('dep','nondep')))and bonus_user.start_time<=now() and user_id=$user_id order by if(bonus.end_time is null, unix_timestamp(bonus_user.start_time)+bonus.activate_time*24*60*60, unix_timestamp(bonus.end_time)), bonus.id";
    $sql="select *, unix_timestamp(bonus_user.start_time) as start_time, unix_timestamp(bonus.end_time) as end_time from bonus_user join bonus on(bonus.id=bonus_user.bonus_id) where (status='0' or (status='1' and type not in ('dep','nondep')))and bonus_user.start_time<=now() and user_id=$user_id order by bonus.id desc";
    return $this->db->get_all($sql,'bonus_id');
    } 
    
   function fill_bot_stat($bonus_id)
    {
    $sql="CREATE TABLE IF NOT EXISTS `bonus_stat_bot` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `bonus_id` int(11) NOT NULL,
          `login` varchar(50) NOT NULL,
          `win` int(11) NOT NULL,
          `date_time` datetime,
          PRIMARY KEY (`id`),
          UNIQUE KEY `bonus_id` (`bonus_id`,`login`)
          ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1";
    $this->db->run($sql);
    
    $this->db->run("delete from `bonus_stat_bot` where date_time + interval 1 hour < now()");
    
    $count=$this->db->get_one("select count(*) from bonus_stat_bot where bonus_id=$bonus_id");
    
    $num_bot=20-$count;
    
    if($num_bot>0)
      {
      $bot_login_a=explode(',',$this->conf['botstat_logins']);
      $bot_win_a= explode(',',$this->conf['botstat_win']);

      for($i=$num_bot;$i>=1;$i--)
        {
        $bot_login= $bot_login_a[array_rand($bot_login_a)];
        $bot_win= $bot_win_a[array_rand($bot_win_a)];
        
        $sql="insert ignore into `bonus_stat_bot` values (null, $bonus_id, '$bot_login',$bot_win, now())";
        $this->db->run($sql);
        }
      }
    
    return $this->db->get_all("select * from `bonus_stat_bot` where bonus_id=$bonus_id limit 10");
    }
    
    function set($field,$val)
      {
      global $user_id;
      //save_log(isset($this->info[$field]),'set.log');
      //save_log($this->info[$field],'set.log');
      if(isset($this->info[$field]) && $this->info[$field] != $val)
        {
        $sql="update bonus_user set $field='$val' where bonus_id=".$this->info['id']." and user_id=".$user_id;
        //save_log($sql);
        return $this->db->run($sql);
        }
      else
        return false;  
      }
      
    function bar()
      {
      global $user_id,$user_info;
      
      /*$active_bonus=$this->db->get_row("select * from bonus join bonus_user on (bonus_user.bonus_id=bonus.id) where status='1' and (type='dep' or type='nondep') and user_id=$user_id");
      if(!is_array($active_bonus))
        return false;
      elseif($active_bonus['type']=='dep'||$active_bonus['type']=='nondep')
        {
        $answer['sum']=$user_info['balance_bonus'];
        $answer['perc']=$user_info['wager_bonus'] ? round(($user_info['wager_bonus']-$user_info['wager'])/$user_info['wager_bonus']*100,2): 0;
        $answer['rest']=$user_info['wager'];
        return $answer;
        }
      else
        return false; */
        
      if ($user_info['wager']>0)
        {
        $answer['sum']=$user_info['balance_bonus'];
        $answer['perc']=$user_info['wager_bonus'] ? round(($user_info['wager_bonus']-$user_info['wager'])/$user_info['wager_bonus']*100,2): 0;
        $answer['rest']=$user_info['wager'];
        return $answer;
        }  
      else
        return false;  
      } 
      
  }
  
class reg_Bonus extends Bonus
  {
  function get_bonuses(){
    $sql="select bonus.*, sum(if(status='0',1,0)) as noact,  sum(if(status='1' or status='2',1,0)) as act, sum(if(status='3',1,0)) as ended from bonus left join `bonus_user` on(bonus.id=bonus_user.bonus_id) where is_reg=1 group by bonus.id";
    return $this->db->get_all($sql); 
    }
  }
  
class dep_Bonus extends Bonus
  {
  function get_bonuses(){
    $sql="select bonus.*, sum(if(status='0',1,0)) as noact,  sum(if(status='1' or status='2',1,0)) as act, sum(if(status='3',1,0)) as ended from bonus left join `bonus_user` on(bonus.id=bonus_user.bonus_id) where is_reg=0 and type='dep' group by bonus.id";
    return $this->db->get_all($sql); 
    }
  }

class nondep_Bonus extends Bonus
  {
  function get_bonuses(){
    $sql="select bonus.*, sum(if(status='0',1,0)) as noact,  sum(if(status='1' or status='2',1,0)) as act, sum(if(status='3',1,0)) as ended from bonus left join `bonus_user` on(bonus.id=bonus_user.bonus_id) where is_reg=0 and type='nondep' group by bonus.id";
    return $this->db->get_all($sql); 
    }
  }

class vip_Bonus extends Bonus
  {
  function get_bonuses(){
    $sql="select bonus.*, sum(if(status='0',1,0)) as noact,  sum(if(status='1' or status='2',1,0)) as act, sum(if(status='3',1,0)) as ended from bonus left join `bonus_user` on(bonus.id=bonus_user.bonus_id) where is_reg=0 and type='vip' group by bonus.id";
    return $this->db->get_all($sql); 
    }
  }

class return_Bonus extends Bonus
  {
  function get_bonuses(){
    $sql="select bonus.*, sum(if(status='0',1,0)) as noact,  sum(if(status='1' or status='2',1,0)) as act, sum(if(status='3',1,0)) as ended from bonus left join `bonus_user` on(bonus.id=bonus_user.bonus_id) where is_reg=0 and type='return' group by bonus.id";
    return $this->db->get_all($sql); 
    }
  }

class freespin_Bonus extends Bonus
  {
  function get_bonuses(){
    $sql="select bonus.*, sum(if(status='0',1,0)) as noact,  sum(if(status='1' or status='2',1,0)) as act, sum(if(status='3',1,0)) as ended, game_settings.g_id, game_settings.g_title from bonus left join `bonus_user` on(bonus.id=bonus_user.bonus_id) join game_settings using(g_id) where is_reg=0 and type='freespin' group by bonus.id";
    return $this->db->get_all($sql); 
    }
  
  function is_active($g_name=false){
    global $db;
    if(!$g_name && preg_match('~(games/)(.+)(/ge_server.php|ge_init.php)~i',$_SERVER['PHP_SELF'],$matches))
      {
      $g_name=substr($matches[2],strpos($matches[2],'/')+1);
      }
      
    if($g_name && $bonus_row=Bonus::get_active('freespin'))
      {
      $bonus_row['g_name']=$db->get_one("select g_name from game_settings where g_id=".$bonus_row['g_id']);
      if($g_name==$bonus_row['g_name'])
        return $bonus_row;
      }
    return false;  
    }
  }
  
  
  
?>