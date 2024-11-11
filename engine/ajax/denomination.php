<?php
header("Content-Type:	text/javascript; charset=UTF-8");
include ('../cfg.php');
include ('../ini.php');
  
$sql="select * from users where login='$login'";
   $user_row=mysql_fetch_array(mysql_query($sql));
 
$set_denomination=isset($_REQUEST['denomination'])? floatval($_REQUEST['denomination']): 0 ;
$alloy_denomination=isset($conf['alloy_denomination'])?$conf['alloy_denomination']: 1;
if($alloy_denomination)
  {
  if($set_denomination)
    {
    if (in_array($set_denomination,$denominations))
      {
      $sql= "update users set denomination=$set_denomination where login='$login'";
      if (mysql_query($sql))
        {
       
		
		if($demomode){
		$balance=$user_row['demobalance']/$set_denomination;
		}else{
		 $balance=$balance/$set_denomination;
		}
		
        printf("%01.2f",$balance);
        }
      else
        echo '-3';
      }
    else
      echo '-2';
    }
  else
    echo implode('|',$denominations);
  }
else
  echo '-1';  
  
  /*
  -1 -                                                  
  -2 -                                                          
  -3 -                                                                        
  */
?>