<?php 
header("Content-Type:	text/html; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
Error_Reporting(E_ALL);                     
$arr_bank_type=array('spin_bank','bonus_bank','spin_cell','bonus_cell','spin_max_cell','bonus_max_cell');         
$arr_notbank=array('spin_max_cell','bonus_max_cell');

$bank_id=isset($_REQUEST['bank_id'])?intval($_REQUEST['bank_id']):false;
$bank_type= isset($_REQUEST['type'])&& in_array($_REQUEST['type'],$arr_bank_type)? $_REQUEST['type'] : false ;  //         action                ,                             0,   .  .                                       
$sum=isset($_REQUEST['suma'])? floatval($_REQUEST['suma']) : 0;

if(!$bank_type)
  {
  die("                                        ");
  }


if ($status==1)
  {
  $bank_row=mysql_fetch_assoc(mysql_query("select * from room_banks where id=$bank_id"));
  
  if($bank_row['from_bet']==-1) //                                 
    {
    $room_balance=mysql_result(mysql_query("select balance from rooms where id=$room"),0);

    if($sum>0)
      {
        $sql="UPDATE LOW_PRIORITY room_banks SET ".$bank_type."=".$bank_type."+$sum where id=$bank_id";
        mysql_query($sql);
        $bank_sum=mysql_result(mysql_query("select ".$bank_type." from room_banks where id=$bank_id"),0);
        echo "success|".sprintf("%01.4f",$bank_sum);
      }
    else
      echo "                                                                 ";  
    }
  elseif(in_array($bank_type,$arr_notbank))
    { //                                  
      if(mysql_query($sql="UPDATE LOW_PRIORITY room_banks SET ".$bank_type."=".$bank_type."+$sum where id=$bank_id"))
        echo "success|".($bank_row[$bank_type]+$sum);
      else
        $bank_sum= $bank_row[$bank_type];
    }  
  else //                 
    {
    $bank_sum=$bank_row['from_bet']==-2 ? $bank_row['spin_bank'] : $bank_row[$bank_type];
    
    if($bank_sum+$sum>=0)
      {
      $freebank_row=mysql_fetch_assoc(mysql_query("select * from room_banks where from_bet=-1 and room_id=".$bank_row['room_id']));
    
      if($freebank_row['spin_bank']-$sum>=0)
        { 
        mysql_query($sql="UPDATE LOW_PRIORITY room_banks SET ".$bank_type."=".$bank_type."+$sum where id=$bank_id and ".$bank_type."+$sum>=0");
        if(mysql_affected_rows()>0)
          mysql_query($sql1="update LOW_PRIORITY room_banks SET spin_bank=spin_bank-$sum where id=".$freebank_row['id']);
        if(mysql_affected_rows()>0)
          echo "success|".sprintf("%01.4f",$bank_sum+$sum)."|".$freebank_row['id'].":".sprintf("%01.4f",$freebank_row['spin_bank']-$sum);
        else
          save_log($sql,'db_error.log');    
        }
      else
        echo "                                                            ";  
      }
    else
      echo "                                                       ";
    
    }       
  }
else  
  echo "                                                ";
?>