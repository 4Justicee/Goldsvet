<?php

$trio_use= isset($conf['trioApi_use'])? $conf['trioApi_use']: false;
$system= isset($_GET['system'])?$_GET['system'] : false;
$trioApi_shop_id=isset($conf['trioApi_shop_id'])?$conf['trioApi_shop_id']:false;
$trioApi_key=isset($conf['trioApi_key'])?$conf['trioApi_key']:false;
//$trioApi_shop_id= '302859';
//$trioApi_key='YNfGKWgNyBKRll0g5Q80uklGZU3DnRf1p';
$money=isset($_REQUEST['money'])?$_REQUEST['money']:'0';
$psystem=isset($_REQUEST['psystem'])?$_REQUEST['psystem']:false;
$amount=isset($_REQUEST['amount'])?$_REQUEST['amount']:'0';
$currency='643';
if ($trio_use && $login && $money) 
{
    if ($system=='trioApi')
    {
    save_stat_pay($money,$login,'0', 'trioApi', $inv_code);
		if(isset($inv_code) && $inv_code) {
		$order_id = $inv_code;
    
    if(isset($_REQUEST['bonus_id']) && $_REQUEST['bonus_id'])
      {
      $db->run("update bonus_user set enter_id='$order_id' where bonus_id=".$_REQUEST['bonus_id']." and user_id=$user_id");
      
      }

    //var_dump($amount.$currency.$psystem.$trioApi_shop_id.$trioApi_key);
    //var_dump($hash);
    
    $request = array(
    'amount' => $amount,
    'currency' => $currency,
	  'shop_id' => $trioApi_shop_id,
	  'shop_invoice_id' => $order_id,
    'payway' => $psystem,
      );
      
    save_log(print_r($request,1),'trio.log');  

    ksort($request);
		$hash = md5(implode(':',$request).$trioApi_key);
    $request['sign']=$hash;
    
    if(isset($_POST['addons']))
      {
      foreach($_POST['addons'] as $k=>$v)
        {
        if($v)
        $request[$k]=$v;
        }
      }    
    
$options = array (
    'http' => array (
        'method' => 'POST',
        'header' => "Content-Type: application/json; charset=utf-8\r\n",
        'content' => json_encode($request)
    )
);

$context = stream_context_create($options);

$answer= file_get_contents('https://central.pay-trio.com/invoice', 0, $context);
    
    $json=json_decode($answer,1);
    
    if($json['result']=='ok')
      {
      $db->run("update enter set status=1 where inv_code='$order_id'");
      $form="<form id='$psystem' action='".$json['data']['source']."' method='".$json['data']['method']."'>";
      foreach($json['data']['data'] as $k=>$val)
        {
        $form.="<input name='$k' value='$val'/>";
        }
      $form.="</form>";  
      $result=array("result"=>"ok","form"=>$form, "form_id"=>$psystem);
      }
    else
      $result=array("result"=>"err","message"=>$json['message']);
      
      
      echo json_encode(  $result);
      
      
    die();
  
		} else {
		$err="<p class=\"er\">".$lang['pay']['nopay']."</p>";
        $smarty->assign('pay_err',$err);
			   }
	}	
}

?>