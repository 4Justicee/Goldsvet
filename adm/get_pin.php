<?php

include "../engine/cfg.php";
include "../engine/ini.php";

if($status == 1|| $status==4)
  {
  if(isset($_GET['action']) && $_GET['action']=='get')
    {
    $domen=get_domen();
    $sql="select login,`sum` from enter where paysys='pin' and status<2";
    $res=mysql_query($sql);
    if (mysql_num_rows($res)>0)
      {
      header('Content-Disposition:	attachment; filename="pins.csv"');
      header('Content-Type:	text/comma-separated-values');
      while ($row=mysql_fetch_array($res))
        echo $row['login'].",".$row['sum'].",".$domen."\n";
      mysql_query("update enter set status=1 where paysys='pin' and status=0");  
      }
    }
  }
  
?>