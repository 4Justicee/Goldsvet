<?php

class mail {
  var $type=0;
  var $smtp_host="";
  var $smtp_port=25;
  var $smtp_user="";
  var $smtp_from="";
  var $smtp_reply="";
  var $smtp_pass="";
  var $charset="utf-8";

  function send($to,$subject,$text,$headers=false)
    {

    if(empty($this->smtp_reply))
       $this->smtp_reply=$this->smtp_from;
      
      if(preg_match("`(\S+)(<\S+@\S+>)`",$this->smtp_from,$match_from))
         $this->smtp_from="=?".$this->charset."?B?".base64_encode($match_from[1])."?=".$match_from[2];
      if(preg_match("`(\S+)(<\S+@\S+>)`",$this->smtp_reply,$match_reply))
         $this->smtp_reply="=?".$this->charset."?B?".base64_encode($match_reply[1])."?=".$match_reply[2];
      if(preg_match("`(\S+)(<\S+@\S+>)`",$to,$match_to))
         $to="=?".$this->charset."?B?".base64_encode($match_to[1])."?=".$match_to[2];   
      
      $headers="Date: ".date("D, j M Y G:i:s")." +0700\r\n";
      $headers.="From: ".$this->smtp_from."\r\n";
      $headers.="X-Mailer: The Bat! (v3.99.3) Professional\r\n";
      $headers.="Reply-To: ".$this->smtp_reply."\r\n";
      $headers.="X-Priority: 3 (Normal)\r\n";
      $headers.="Message-ID: <172562218.".date("YmjHis")."@".$this->smtp_host.">\r\n";
      $headers.="To: $to\r\n";
      $headers.="Subject: =?".$this->charset."?B?" . base64_encode($subject) . "?=\r\n";
      $headers.="MIME-Version: 1.0\r\n";
      $headers.="Content-Type: text/html; charset=".$this->charset."\r\n";
      $headers.="Content-Transfer-Encoding: 8bit\r\n"; 
      
    if($this->type===0)
      return mail($to,$subject,$text,$headers);
    else
      {
      $smtp_conn = fsockopen($this->smtp_host, $this->smtp_port, $errno, $errstr, 10);
      if(!$smtp_conn) {fclose($smtp_conn); save_log("fsockopen: ".$errstr,'mail.err');return false;}
      $data = $this->get_data($smtp_conn);   
      
      $this->put_data($smtp_conn,"EHLO localhost\r\n");
       $code = substr($this->get_data($smtp_conn),0,3);
      if($code != 250) {fclose($smtp_conn); save_log("EHLO localhost\r\n".socket_strerror(socket_last_error()),'mail.err');return false;}
      
      if($this->smtp_pass)
        {
      $this->put_data($smtp_conn,"AUTH LOGIN\r\n");
      $code = substr($this->get_data($smtp_conn),0,3);
      if($code != 334) {fclose($smtp_conn); save_log("AUTH LOGIN\r\n".socket_strerror(socket_last_error()),'mail.err');return false;}

      $this->put_data($smtp_conn,base64_encode($this->smtp_user)."\r\n");
      $code = substr($this->get_data($smtp_conn),0,3);
      if($code != 334) {fclose($smtp_conn); save_log(base64_encode($this->smtp_user)."\r\n".socket_strerror(socket_last_error()),'mail.err');return false;}

      $this->put_data($smtp_conn,base64_encode($this->smtp_pass)."\r\n");
      $code = substr($this->get_data($smtp_conn),0,3);
      if($code != 235) {fclose($smtp_conn); save_log(base64_encode($this->smtp_pass)."\r\n".socket_strerror(socket_last_error()),'mail.err');return false;}
        }
        
      $this->put_data($smtp_conn,"MAIL FROM:<".$this->smtp_user.">\r\n");
      $code = substr($this->get_data($smtp_conn),0,3);
      if($code != 250) {fclose($smtp_conn); save_log("MAIL FROM:<".$this->smtp_user.">\r\n".socket_strerror(socket_last_error()),'mail.err');return false;}

      $this->put_data($smtp_conn,"RCPT TO:<$to>\r\n");
      $code = substr($this->get_data($smtp_conn),0,3);
      if($code != 250 AND $code != 251) {fclose($smtp_conn); save_log("RCPT TO:<$to>\r\n".socket_strerror(socket_last_error()),'mail.err');return false;}

      $this->put_data($smtp_conn,"DATA\r\n");
      $code = substr($this->get_data($smtp_conn),0,3);
      if($code != 354) {fclose($smtp_conn); save_log("DATA\r\n".socket_strerror(socket_last_error()),'mail.err');return false;}

      $this->put_data($smtp_conn,$headers."\r\n".$text."\r\n.\r\n");
      $code = substr($this->get_data($smtp_conn),0,3);
      if($code != 250) {fclose($smtp_conn); save_log($headers."\r\n".$text."\r\n.\r\n".socket_strerror(socket_last_error()),'mail.err');return false;}

      $this->put_data($smtp_conn,"QUIT\r\n");
      fclose($smtp_conn);
      return true;
      }
        
    }  
  function put_data($smtp_conn,$data)
    {
    save_log($data,'smtp.log');
    fputs($smtp_conn, $data);
    }
  function get_data($smtp_conn)
    {
    $data="";
    while($str = fgets($smtp_conn,515))
      {
      $data .= $str;
      if(substr($str,3,1) == " ") { break; }
      }
    save_log($data,'smtp.log');
    return $data;
    }
}

?>