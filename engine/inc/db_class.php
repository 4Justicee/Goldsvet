<?php

class DATABASE
  {
  var $request=array();
  var $debug=true;
  var $log_file='logs/db.log';
  
  function __construct($host,$user,$pass,$db_name)
    {
    $this->start=microtime();

    $this->conn = new mysqli($host, $user , $pass,$db_name);

    if ($this->conn->connect_errno) {
      printf("                                            : %s\n", $this->conn->connect_error);
      exit();
     }
     else
      {
      $this->conn->query("SET NAMES 'UTF8'");
      $this->conn->query("SET time_zone = '".date_default_timezone_get());

      if($this->debug) $this->conn->query("set profiling=1");
      }
    }  
    
  function __destruct()
    {
    if($this->debug&& count($this->request))
      {
      $profiles=$this->get_all("show profiles");
      $handle = fopen(dirname(__FILE__)."/../".$this->log_file, 'a');               
      fwrite($handle, date("[Y-m-d H:i:s] ").print_r($this->request,1)."\r\n");
      fwrite($handle, print_r($profiles,1)."\r\n");
      fwrite($handle, "                                               : ".(microtime()-$this->start)."\r\n");
      fclose($handle);
      }
    }  
    
  function get_all($sql=false,$key=false)
    {
    $num_request=count($this->request);
    $this->request[$num_request]['sql']=$this->sql=$sql;
    
    $start_time=microtime();
    $res=$this->conn->query($sql);
    $time=microtime()-$start_time;
    $this->request[$num_request]['sql_time']=$time;
    if($res)
      {
      $data=array();
      while($row=$res->fetch_assoc())
        {
        if($key && isset($row[$key]))
          $data[$row[$key]]=$row;
        else
          $data[]=$row;
          
        }
      $time=microtime()-$start_time-$this->request[$num_request]['sql_time'];
      $this->request[$num_request]['php_time']=$time;  
      return $data;  
      }
    else
      {
      $this->error=$this->conn->error;
      $this->request[$num_request]['sql_error']=$this->conn->error;
      $this->log();
      } 
    return false;   
    } 
    
  function get_all_paginator($sql=false,&$paginator,$page=1,$rowperpage=false,$key=false)
    {
    $start_time=microtime();
    $num_request=count($this->request);
    
    if(!$rowperpage) $rowperpage=PAGINATOR_ROWS;
    
    $this->request[$num_request]['sql']=$sql;
    
    
    $res=$this->conn->query($sql);
    $this->request[$num_request]['sql_time']=microtime()-$start_time;
    
    if($res)
      {
    
      $count=$res->num_rows;
      $total	= intval(($count - 1) / $rowperpage ) + 1;
      if($page>$total)
        {
        $page=$total;
        }
      elseif($page<1)
        {
        $page=1;
        }  
      
      $start = ($page-1) * $rowperpage;
      $res->data_seek($start);  
      
      $data=array();
      for($i=1;$i<=$rowperpage;$i++)
        {
        $row=$res->fetch_assoc();
        if(!$row) break;

        if($key && isset($row[$key]))
          $data[$row[$key]]=$row;
        else
          $data[]=$row;
          
        }
      $this->request[$num_request]['php_time']=microtime()-$start_time-$this->request[$num_request]['sql_time']; 
      
      $paginator=$total>1 ? array('page'=>$page,'total'=>$total): false; 
      return $data;  
      }
    else
      {
      $this->error=$this->conn->error;
      $this->request[$num_request]['sql_error']=$this->conn->error;
      $this->log();
      } 
    return false;
    }  
  
  function get_row($sql=false,$key=false)
    {
    if(!preg_match("`LIMIT`",$sql))
      $sql.= " LIMIT 1";
    $this->sql=$sql;
    
    $num_request=count($this->request);
    $this->request[$num_request]['sql']=$sql;
    
    $start_time=microtime();
    $res=$this->conn->query($sql);
    $time=microtime()-$start_time;
    $this->request[$num_request]['sql_time']=$time;

    if($res)
      {
      $data=array();
      
      $row=$res->fetch_assoc();
        if($key && isset($row[$key]))
          $data[$row[$key]]=$row;
        else
          $data=$row;
          
      $time=microtime()-$start_time-$this->request[$num_request]['sql_time'];
      $this->request[$num_request]['php_time']=$time;    
          
      return $data;  
      }
    else
      {
      $this->error=$this->conn->error;
      $this->request[$num_request]['sql_error']=$this->conn->error;
      $this->log();
      } 
    return false;   
    }
    
  function get_one($sql=false)
    {
    if(!preg_match("`LIMIT`",$sql))
      $sql.= " LIMIT 1";
    $this->sql=$sql;
    
    $num_request=count($this->request);
    $this->request[$num_request]['sql']=$sql;
    
    $start_time=microtime();
    $res=$this->conn->query($sql);
    $time=microtime()-$start_time;
    $this->request[$num_request]['sql_time']=$time;

    if($res)
      {
      $data=array();
      $row=$res->fetch_row();
          $data=$row[0];
          
      $time=microtime()-$start_time-$this->request[$num_request]['sql_time'];
      $this->request[$num_request]['php_time']=$time;    
          
      return $data;  
      }
    else
      {
      $this->error=$this->conn->error;
      $this->request[$num_request]['sql_error']=$this->conn->error;
      $this->log();
      } 
    return false;   
    }   
  
  
  function run($sql)
    {
    $this->sql=$sql;
    $num_request=count($this->request);
    $this->request[$num_request]['sql']=$sql;
    
    $start_time=microtime();
    $res=$this->conn->real_query($sql);
    $time=microtime()-$start_time;
    $this->request[$num_request]['sql_time']=$time;
    if($res)
      {
      $this->error=false;
      $this->insert_id=$this->conn->insert_id;
      return $this->conn->affected_rows;
      }
    else
      {
      $this->error=$this->conn->error;
      $this->request[$num_request]['sql_error']=$this->conn->error;
      $this->log();
      }  
    return false;  
    } 
    
  function prepare($val,$type='char')
    {
    if($type=='char')
      return $this->conn->real_escape_string($val);
    elseif($type=='int')
      return intval($val);
    elseif($type=='float')
      return floatval($val);
    else
      return $val;
    }    

  function log($str=false,$file=false)
    {
    if(!$str)
      $str=$this->sql."\r\n".$this->error."\r\n";
    if(!$file)
      $file='logs/db_err.log';  

      $handle = fopen(dirname(__FILE__)."/../".$file, 'a');               
      fwrite($handle, date("[Y-m-d H:i:s] ").$str);
      fclose($handle);
      
    }
  }
?>