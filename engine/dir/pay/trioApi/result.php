<?php

chdir('../');
include "../../cfg.php";
include "../../ini.php";

$trio_use= isset($conf['trioApi_use'])? $conf['trioApi_use']: false;
$trioApi_shop_id=isset($conf['trioApi_shop_id'])?$conf['trioApi_shop_id']:false;
$trioApi_key=isset($conf['trioApi_key'])?$conf['trioApi_key']:false;
$inv= isset($_POST['shop_invoice_id'])?$db->prepare($_POST['shop_invoice_id']):false;

$post=$_POST;
unset($post['sign']);

//$hash = strtoupper(md5($fk_merchant_id.":".$_POST['AMOUNT'].":".$fk_merchant_key2.":".$_POST['MERCHANT_ORDER_ID']));

$sum=isset($_POST['shop_amount'])?floatval($_POST['shop_amount']):0;



$payways=array();



$sys=isset($trioApi_payways[$_POST['payway']])? $trioApi_payways[$_POST['payway']] : $db->prepare($_POST['payway']);

if(isset($_POST['ps_data']))
  {
  //save_log(str_replace('\\',"",$_POST['ps_data']));
  $ps_data=json_decode(str_replace('\\',"",$_POST['ps_data']),1);
  //save_log(print_r($ps_data,1));
  if(isset($ps_data['ps_payer_account']))
    $sys.=$db->prepare($ps_data['ps_payer_account']);
  }

  $sql="select * from enter where status<2 and inv_code='$inv'";
  $order_row=$db->get_row($sql);
   if($order_row)
     {
     if($order_row['sum']!=$sum)
       $msg= "                           ";
     elseif (pay($order_row['id']))
       $msg= "ok";
      else
        $msg=$lang['err_25'];
      }
     else 
      $msg= $lang['err_26'];
//    }
//else
//  $msg=$lang['pay']['fail_sign'];

echo $msg;

?>