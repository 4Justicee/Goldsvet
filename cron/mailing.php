<?php

$path='../';
include($path.'engine/cfg.php');

 //                             -          
  include ($path.'engine/inc/mail_class.php');
  $mail = new mail();
  $mail->smtp_from=$conf['mail_from'];
  $mail->smtp_reply=$conf['mail_reply'];
  $mail->type= intval($conf['mail_type']);
  if($mail->type===1)
    {
    $mail->smtp_host=$conf['mail_smtp_host'];
    $mail->smtp_port=$conf['mail_smtp_port'];
    $mail->smtp_user=$conf['mail_smtp_user'];
    $mail->smtp_pass=$conf['mail_smtp_pass'];
    }
 
//                                                                   
$sql="select count(*) from mailing where status=0";
$mail_count=mysql_result(mysql_query($sql),0);
if ($mail_count)
  {
  //                                                                                                                                    
  $sql="select count(*)  from mailing where status=1 and adddate(date_time, interval ".$conf['mail_period']." minute) > now()";
  $sendMail_count=mysql_result(mysql_query($sql),0);
  if($sendMail_count<$conf['mail_period_count'])
    {
    //                                        
    $sql="select mailing.id, email, subj,text, user_id from mailing join users on (users.id=mailing.user_id) join mailing_text using (mail_id) where email is not null and mailing.status=0 limit ".$conf['mail_count'];
    $res=mysql_query($sql);
    while($row=mysql_fetch_assoc($res))
      {
      $user_row=$db->get_row("select users.*, imported_users.pass as password  from users left join imported_users using (login) where users.id=".$row['user_id']);
      
      $subj=$row['subj'];
      $text=$row['text'];
      foreach($user_row as $key=>$val)
        {
        $subj=str_replace('{%'.$key.'%}',$val, $subj);
        $text=str_replace('{%'.$key.'%}',$val, $text);
        }
      if($mail->send($row['email'],$subj,$text))
        {
        $db->run("update mailing set status=1,date_time=now() where id=".$row['id']);
        $db->run("delete from imported_users where login='".$user_row['login']."'");
        }
      }

    }
  }


?>