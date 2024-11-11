<?php

chdir('../');
include "../../cfg.php";
include "../../ini.php";

$inv= isset($_REQUEST['shop_invoice_id']) ? $db->prepare($_REQUEST['shop_invoice_id']) : 0;

if($row=$db->get_row("select * from enter where status=2 and inv_code='$inv'"))
  $_SESSION['messages'][]=array("erok", $lang['err_27']." ".$row['sum']);
  
header('location: /');
die();  
?>