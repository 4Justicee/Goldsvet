<?php
class Tournament
  {
  var $tour_id=0;
  var $error='';
  
  function __construct($tour_id=false)
    {
    global $db,$conf,$language,$lang;
    if(isset($db)) $this->db=$db;
    if(isset($lang)) $this->lang=$lang;
    if(isset($language)) $this->language=$language;
    
    if(is_array($tour_id))
      {
      $this->tour_id=$tour_id['id'];
      $this->info=$tour_id;
      }
    elseif($tour_id)
      {
      $this->tour_id=$tour_id;
      $this->info=$db->get_row("select * from tournaments where id=$tour_id");
      
      //$this->games=$db->get_all("select * from tour_games where tour_id=$tour_id");
      //$this->prize=$db->get_all("select * from tour_prizes where tour_id=$tour_id");
      }
    else
      {
      $this->info=$db->get_row("select * from tournaments where status=0 order by rand()");
      $this->tour_id=$this->info['id'];
      } 
    $this->minitext();   
    }
  function get_games()
    {
    global $g_ver;
    return $this->games=$this->db->get_all("select g_id, g_name, g_title, start_path, g_counter from tour_games join game_settings on (tour_games.game_id=game_settings.g_id) join game_group using (gr_id) where g_view=1 and g_ver in($g_ver) and tour_id=".$this->tour_id);
    }
      
  function get_prizes()
    {
    return $this->prizes=$this->db->get_all("select * from tour_prize where tour_id=".$this->tour_id." order by suma desc");
    }
    
  function create($params)
    {
    if(count(explode("|",$params['botlimit']))!=3)
      {
      $this->error="                                                                                                          1000|2000|10 ";
      return false;
      }
    $sql="insert into tournaments values (null, '".$params['title']."', '".$params['name']."', '".$params['start']."', '".$params['end']."', '".$params['is_loop']."', '".$params['type']."','".array_sum($params['prize'])."',0, '".$params['pic']."', '".$params['pic_2']."', '".$params['minstav']."','".$params['spincount']."','".$params['botlimit']."','".$params['txt']."', 0)";
    if($this->db->run($sql))
     {
      $tour_id=$this->db->insert_id;
      foreach($params['prize'] as $prize)
        {
        $a_prize=array_pad (explode("|",$prize), 2, 0);

        $this->db->run("insert into tour_prize values (null,$tour_id, $a_prize[0], $a_prize[1], null, null, null)");
        }
      $this->db->run("insert into tour_games select null,$tour_id, g_id, g_name from game_settings where g_id in (".implode(",",$params['games']).")");
      $this->tour_id=$tour_id;
      return true;
      }
    return false;
    }  
  
  function edit($params)
    {
    if(isset($params['title']) && $this->info['title']!=$params['title'])
      $set[]="title='".$params['title']."'";
    if(isset($params['name']) && $this->info['name']!=$params['name'])
      $set[]="name='".$params['name']."'";
    if(isset($params['start']) && $this->info['start_time']!=$params['start'])
      $set[]="start_time='".$params['start']."'";
    if(isset($params['end']) && $this->info['end_time']!=$params['end'])
      $set[]="end_time='".$params['end']."'";
    if(isset($params['is_loop']) && $this->info['is_loop']!=$params['is_loop'])
      $set[]="is_loop='".$params['is_loop']."'";
    if(isset($params['type']) && $this->info['type']!=$params['type'])
      $set[]="type='".$params['type']."'";
    if(isset($params['minstav']) && $this->info['min_stav']!=$params['minstav'])
      $set[]="min_stav='".$params['minstav']."'";
    if(isset($params['spincount']) && $this->info['spin_count']!=$params['spincount'])
      $set[]="spin_count='".$params['spincount']."'";
    if(isset($params['botlimit']) && $this->info['bot_limit']!=$params['botlimit'])
      $set[]="bot_limit='".$params['botlimit']."'";
    if(isset($params['pic']) && $this->info['pic']!=$params['pic'])
      $set[]="pic='".$params['pic']."'"; 
    if(isset($params['pic_2']) && $this->info['pic_2']!=$params['pic_2'])
      $set[]="pic_2='".$params['pic_2']."'";  
    if(isset($params['txt']) && $this->info['txt']!=$params['txt'])
      $set[]="txt='".$params['txt']."'";
      
    if(isset($set))
      {
    $sql="update tournaments set ".implode(",",$set)." where id=".$this->tour_id;  
    if($this->db->run($sql))
      return true;
    else
      return false;
      }
    else
      return true;        
    }
    
  function del()
    {
    if($this->info['status']===0)
      {
      $this->error="                                                                      ,                                      ";
      return false;
      }
    else
      {
      if(
      $this->db->run("delete from tournaments where id=".$this->tour_id) &&
      $this->db->run("delete from tour_games where tour_id=".$this->tour_id)&&
      $this->db->run("delete from tour_prize where tour_id=".$this->tour_id))
        return true;
      else
        return false;
      }  
    }    
  function check_close()
    {
    //                                                            
      $open_tour=$this->db->get_all("select *, if(end_time<now(),1,0) as close from tournaments where status=0 ");
      if($open_tour)
        {
        foreach($open_tour as $tour)
          {
          if($tour['close'])
            $this->close($tour);
          else
            $tours[]=$tour;  
          }
        }
     if(isset($tours))   
      return $tours;
     else
      return false;    
     }
     
  function close($tour)        
     { 
     global $conf;
        $bots=explode(',',$conf['botstat_logins']);
          $tmp_tour= new Tournament($tour);
          $tmp_tour->gamers(count($tmp_tour->get_prizes()));
          $min_res=count($tmp_tour->gamers)? 0: 100;
          
          if(count($tmp_tour->gamers)<count($tmp_tour->prizes))
            foreach($tmp_tour->gamers as $gamer)
              {
              $min_res=min($min_res,$gamer['result']);
              }
          
          while(count($tmp_tour->gamers)<count($tmp_tour->prizes))
            {
            $bot=array_rand($bots);
            $min_res=rand(1,$min_res-1);
            $tmp_tour->gamers[]=array('user'=>$bots[$bot],'result'=>$min_res);
            }
            
          foreach($tmp_tour->gamers as $k=>$user)
            {
            if(in_array($user['user'],$bots))
              {
              $this->db->run("update tour_prize set winner_id='".$user['user']."', result=".$user['result']." where id=".$tmp_tour->prizes[$k]['id']);
              }
            else
              {  
              //                                                           
              $sys='t-'.$tour['id'];
              $order_id=save_stat_pay($tmp_tour->prizes[$k]['suma'],$user['user'],2,$sys,$inv_code);
              $this->db->run("update tour_prize set winner_id=".$user['user_id'].", order_id=$order_id, result=".$user['result']." where id=".$tmp_tour->prizes[$k]['id']);
            
              //                                                 ,                                                                 pay()                                         ,                             .  .
              $this->db->run("update users set balance=balance+".$tmp_tour->prizes[$k]['suma'].", wager=wager+".($tmp_tour->prizes[$k]['suma']*$tmp_tour->prizes[$k]['wager'])." where id=".$user['user_id']);
              }
            }
          $this->db->run("update tournaments set status=1 where id=".$tour['id']); 
          $this->msg[]=(date("Y-m-d h:i:s")."                                   ".$tour['name']."(".$tour['id'].")"); 
          if($tmp_tour->info['is_loop']) //                                                ,                                     
            $this->db->run("insert into tournaments SELECT null, `name`, `title`, `start_time` + interval 7 day, `end_time` + interval 7 day, `is_loop`, `type`, `prizes_sum`, `status`, `pic`, `pic_2`, `min_stav`, `spin_count`, `bot_limit`, `txt`, `mailing_status` FROM `tournaments` WHERE id=".$tmp_tour->info['id']);
    }
  
  function gamers($count)
    {
    global $conf;
    if($this->tour_id)
      {
      if($this->info)
        {
        if($this->info['status']==0)
          {
          
          $sql="select login as user, t.* from users join (select user_id, cast(result as decimal(14,2)) as result from (select user_id, ";
          if($this->info['type']==1) //                       
            {
            $sql.=" sum(stav) ";
            }
          elseif($this->info['type']==2) //                                                    
            {
            $sql.=" ifnull(sum(win)/sum(stav),0) ";
            }
          elseif($this->info['type']==3) //               
            {
            $sql.=" sum(win)-sum(stav) ";
            }
          elseif($this->info['type']==4) //                              
            {
            $sql.=" sum(win) ";
            }     
          $sql.=" as result, count(id) as count_spin from stat_game where date_time between '".$this->info['start_time']."' and '".$this->info['end_time']."' and stav>=".$this->info['min_stav']." and game in (select game_name from tour_games where tour_id=".$this->tour_id.")  group by user_id)tmp where count_spin>=".$this->info['spin_count']." and result >0 order by 2) t on (users.id=t.user_id) where users.status in (5,6)";
          
          $sql.=" union select user, id, result from tour_bot where tour_id=".$this->info['id']." order by result desc ";
          $sql.=" limit $count";
          $this->gamers=$this->db->get_all($sql);
          return $this->gamers;
          }
        else
          {
          $sql="select login as user, tour_prize.winner_id as user_id ,tour_prize.* from tour_prize left join users on (users.id=tour_prize.winner_id) where tour_prize.tour_id=".$this->info['id']." order by tour_prize.suma desc";
          $this->gamers=$this->db->get_all($sql);
          return $this->gamers;
          }
        }
      else
        {
        $this->error='                              ';
        return false;
        }  
      }
    else
      {
      $this->error='                              ';
      return false;
      }
    } 
    
  function add_bot($bot_logins)
    {
    //        
          $bots_db=array_keys($this->db->get_all("select * from tour_bot where tour_id=".$this->info['id'],'user'));
          if(count($bots_db)<50)
            {
            //                                         
            $bots=explode(',',$bot_logins);
            $bots=array_diff($bots,$bots_db);
            
            if(count($bots)>5)
              {
              $bots_id= array_rand($bots,5);
              }
            else
              $bots_id= array_keys($bots); 
            
            $bot_conf=explode("|",$this->info['bot_limit']);
            

              foreach($bots_id as $bot_id)
                {
                $sum=0; //rand(1,$bot_conf[2]);
                $limit=rand($bot_conf[0],$bot_conf[1]);
                $val[]="(null,".$this->info['id'].", '".$bots[$bot_id]."',$sum,$limit,$bot_conf[2])";
                }
            
            if(isset($val))
                {
                $sql="insert into tour_bot values ".implode(",",$val);
                $this->db->run($sql);
                }
            }
    }
   
   function increase_bot()
    {
    //                             
      $this->db->run(" update tour_bot set result=result+FLOOR(RAND()*countup) where result<`limit`");
    } 
    
  function set_mailing($end=false)
    {
    global $conf,$mail_byID,$language;
    if(($this->info['mailing_status']>0 && !$end) || ($this->info['mailing_status']>1))
      {
      $this->error='                                                ';
      return false;
      }
    $mail_count=0;
    //                                      
    $mail_id=$end ? '11' : '10';
    
    $available_langs=$this->db->get_all("select distinct lang from users where status in (5,6)");

    foreach($available_langs as $lang)
      {
      $mail_templ=$this->db->get_row("select * from mail_tmp where id=$mail_id and lang='".$lang['lang']."'");
      if($mail_templ)
        {
        foreach($this->info as $k=>$v)
          {
          $mail_templ= str_replace( "%".$k."%", $v, $mail_templ );
          }
        
        $text=$mail_templ['body'];
        save_log(THEME_DIR.'/email/'.$mail_byID[$mail_id].'_'.$language.'.tpl','mailing.log');
        save_log(file_exists(THEME_DIR.'/email/'.$mail_byID[$mail_id].'_'.$language.'.tpl'),'mailing.log');  
        if($conf['mail_text_type']!==0)
          {
          if(file_exists(THEME_DIR.'/email/'.$mail_byID[$mail_id].'_'.$language.'.tpl'))
            {
            $text_tmp=file_get_contents(THEME_DIR.'/email/'.$mail_byID[$mail_id].'_'.$language.'.tpl');
            $text= str_replace('{%text%}',$text, $text_tmp);
            //$text= str_replace('{%subject%}',$subject, $text);
     
            $theme_dir= isset($_SERVER['HTTPS'])?'https://' :'http://'.$_SERVER['HTTP_HOST'].($_SERVER['SERVER_PORT']!='80'? ':'.$_SERVER['SERVER_PORT'] :'').THEME_URL;
            $text= str_replace('{$theme_url}',$theme_dir, $text);
            }
          }
            
        $this->db->run($sql="insert into mailing_text values (null,'".$mail_templ['subj']."','".$text."')");
        if($mail_id=$this->db->insert_id)
          {
          $mail_count+=$this->db->run($sql="insert into mailing select null, id, $mail_id, 0, null from users where status in (5,6) and lang='".$lang['lang']."'");
          if($end)
            $this->db->run("update tournaments set mailing_status=2 where id=".$this->info['id']);
          else
            $this->db->run("update tournaments set mailing_status=1 where id=".$this->info['id']);
          }
        else   
          {
          $this->error='                                                                     ';
          }   
        }
      else
        {
        $this->error='                                                                           (id=10, lang='.$lang['lang'].')';
        }
      }
    if($mail_count)
      return true;
    else
      return false;    
    }  
    
   function minitext() 
    {
    if($this->info)
      {
      $txt=$this->info['txt'];
      $char_num=250;
      
        if(strlen($txt)>$char_num)
          {
          $pos[]= strpos($txt,'<br>',$char_num) ? strpos($txt,'<br>',$char_num) : strlen($txt);
          $pos[]= strpos($txt,'</p>',$char_num) ? strpos($txt,'</p>',$char_num) : strlen($txt);
          $end_pos= min($pos);
          }
        else  
          $end_pos= strlen($txt);
          
        $minitext=$end_pos? substr($txt,0,$end_pos): $txt;
        
        $this->info['minitxt']=$minitext;
      }
    }
       
  }

?>