<?php
if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');
  
$order_id=isset($_REQUEST['order_id'])? intval($_REQUEST['order_id']) : false;

$sql="select *, users.id as user_id, output.status as order_status from output join users using(login) where output.id=$order_id ";
if($status==2)
  $sql.= " and kassir=$user_id";

$order_row=$db->get_row($sql);



//var_dump($order_row);

$action=isset($_REQUEST['action'])? $_REQUEST['action'] :false;

if($action)
  {
  if($action=="pay")
    {
    //                                                   
    if ($db->run($sql="update output set status=2 where id=$order_id"))
        {
        $db->run("INSERT INTO output_history values (null,$order_id,$user_id,now(),2)");
        save_stat_pay($order_row['sum']*-1,'id:'.$order_row['user_id'],2,$order_row['ps'],$inv_code);
        $_SESSION['content_msg']=array('erok', '                                 ');
        user_mail (5,$order_row['user_id'],array('sum'=>$order_row['sum'],'sum_out'=>$order_row['sum_out'],'ps'=>$order_row['ps'], 'inv_code'=>$order_row['inv_code']));
        echo "<script> location.href= '?a=users'</script>";
        die();
        }
    else
      print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";    
    }
  if($action=="return")
    {
    list($sum,$login,$uid)=mysql_fetch_row(mysql_query($sql="select sum, users.login, users.id from output join users using(login) where output.id=$order_id and output.status=0"));
    if ($sum && $login)
      {
      if (save_stat_pay($sum,$login,'2','return',$inv_code))
        {
        if (cange_balance($uid,$sum))
          {
          //                                                     
          if (mysql_query("update output set status=3 where id=$order_id"))
            {
            mysql_query("INSERT INTO output_history values (null,$order_id,$user_id,now(),3)");
            $_SESSION['content_msg']=array('erok', $lang['outpay_return']);
            user_mail (6,$order_row['user_id'],array('sum'=>$order_row['sum'],'sum_out'=>$order_row['sum_out'],'ps'=>$order_row['ps'], 'inv_code'=>$order_row['inv_code']));
            echo "<script> location.href= '?a=users'</script>";
            die();
            }
          else
            print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>			
			";
          }
        }
      }
        
    } 
  if($action=="frize")
    {
    //                                                   
    if (mysql_query("update output set status=4 where id=$order_id"))
        {
        mysql_query("INSERT INTO output_history values (null,$order_id,$user_id,now(),4)");
        //$_SESSION['content_msg']=array('erok', $lang['outpay_freeze']);
        user_mail (7,$order_row['user_id'],array('sum'=>$order_row['sum'],'sum_out'=>$order_row['sum_out'],'ps'=>$order_row['ps'], 'inv_code'=>$order_row['inv_code']));
        echo "<script> location.href= '?a=users'</script>";
        die();
        }
    else
      print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";    
    } 
  }

if ($order_row['order_status']>0)
  {echo "<script> location.href= '?a=edit'</script>";
   die();
  }
  
$outway_prefix=array('webmoney'=>'R','qiwi_rub'=>'+');  
  
foreach($trioApi_outways as $k=>$way)
  {
  if(strpos($order_row['ps'],$way)===0)
    {
    $ps=$way;
    $account=str_replace($way.'_','',$order_row['ps']);
    if(isset($outway_prefix[$k])) $account= $outway_prefix[$k].$account;
    
    break;
    }
  else
    {
    $ps=$account='';
    }  
  }

echo '
               <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2>'.$lang['adm_outpay_detail_invoice'].' - '.$order_row['inv_code'].'</h2>                                       
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>

                                            </thead>
                                            <tbody>
<tr align="center">
<td><span class="badge badge-inverse">'.$order_row['login'].'</span></td>
<td><span class="badge badge-info">'.$order_row['ip'].'</span></td>
<td><span class="badge badge-inverse">'.date("d-m-Y H:i:s",$order_row['reg_time']).'</span></td>
<td><span class="badge badge-inverse">'.date("d-m-Y H:i:s",$order_row['go_time']).'</span></td>
</tr>

<tr align="center">
<td><span class="badge badge-inverse">'.$ps.'</span></td>
<td><span class="badge badge-success">'.$account.'</span></td>
<td><span class="badge badge-danger">'.$order_row['sum'].'</span></td>
<td><span class="badge badge-success">'.$order_row['sum_out'].'</span></td>
</tr>

                                            </tbody>
											
                                        </table>										
                                        
                                    </div>									
									
                                </div> 
                            </div>                                
                        </div>						
';
  
?>



 <?php
 echo '
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2>'.$lang['adm_outpay_detail_title'].'</h2>                                       
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th width="20%">'.$lang['adm_outpay_detail_table1Head_1'].'</th> 
                                                    <th width="20%">'.$lang['adm_outpay_detail_table1Head_2'].'</th>													
                                                    <th width="20%">'.$lang['adm_outpay_detail_table1Head_3'].'</th>
													<th width="20%">'.$lang['adm_outpay_detail_table1Head_4'].'</th>
                                                </tr>
                                            </thead>
                                            <tbody>  
  ';
 $sql="select * from enter where login='".$order_row['login']."' order by `date` desc limit 10";
 $res=mysql_query($sql);
 if($res && mysql_num_rows($res)>0)
  {
  
  while($row=mysql_fetch_assoc($res))
    {
    echo "<tr>
            <td align=center>".date("d-m-Y",$row['date'])."</td>
            <td align=center>".$row['sum']."</td>
            <td align=center>".$row['paysys']."</td>
            <td align=center>".$row['inv_code']."</td>
          </tr>";
    }        
  }
 else
  {
  echo "                            
<tr><td colspan=4>
<center><strong>".$lang['adm_outpay_detail_noData']."</strong></center>
</td></tr>  
  ";
  } 
  echo '
                                            </tbody>
											
                                        </table>										
                                        
                                    </div>
                                </div> 
                            </div>                                
                        </div>  
  ';
 ?> 

  <?php
 $sql="select * from stat_game where user_id='".$order_row['user_id']."' order by `date_time` desc limit 10";
 $res=mysql_query($sql);
 echo '
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2>'.$lang['adm_outpay_detail_title2'].'</h2>                                       
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th width="20%">'.$lang['adm_outpay_detail_table2Head_1'].'</th> 
                                                    <th width="20%">'.$lang['adm_outpay_detail_table2Head_2'].'</th>													
                                                    <th width="20%">'.$lang['adm_outpay_detail_table2Head_3'].'</th>
													<th width="20%">'.$lang['adm_outpay_detail_table2Head_4'].'</th>
													<th width="20%">'.$lang['adm_outpay_detail_table2Head_5'].'</th>
                                                </tr>
                                            </thead>
                                            <tbody>  
  ';
 if($res && mysql_num_rows($res)>0)
  {
  
  while($row=mysql_fetch_assoc($res))
    {
    echo "<tr>
            <td align=center>".$row['date_time']."</td>
            <td align=center>".$row['balans']."</td>
            <td align=center>".$row['stav']."</td>
            <td align=center>".$row['win']."</td>
            <td align=center>".$row['game']."</td>
          </tr>";
    }        
  }
 else
  {
  echo "                           
<tr>
<td colspan=5>
<center><strong>".$lang['adm_outpay_detail_noData']."</strong></center>
</td>
</tr>
  ";
  }
  echo "
                                            </tbody>
											
                                        </table>                                         
                                        
                                    </div>
                                </div> 
                            </div>                                
                        </div>  
  ";
   
 ?>                           
                            <div class="col-md-12">
                                <div class="block">

                                    <div class="content np">										                                        
                                    </div>

                                    <div class="footer">
                                        <div class="side fr">
											<input class="btn btn-danger" type="submit" value="<?=$lang['adm_outpay_detail_cancel']?>" onclick="cancelOutpay(<?=$order_id?>)"/>										
											<input class="btn btn-success" type="submit" value="<?=$lang['adm_outpay_detail_confirm']?>" onclick="confirmOutpay(<?=$order_id?>)"/>									
                                        </div>
                                    </div>									
									
                                </div> 
                            </div> 
                            
<!-- Bootrstrap modal -->    
    <div class="modal fade" id="pay" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title" id="myModalLabel2"></h3>
                </div>
                <div class="modal-body">
                    <p></p>
                </div>
                <div class="modal-footer">
                    <a href="" class="btn btn-warning yes" ><?=$lang['adm_outpay_detail_yes']?></a> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_outpay_detail_no']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    
    <!-- EOF Bootrstrap modal --> 
    
<script>
function cancelOutpay(order_id)
  {
  $("#pay .modal-title").html("<?=$lang['adm_outpay_detail_popupTitle']?>");
  $("#pay .modal-body p").html("<?=$lang['adm_outpay_detail_popupBody']?>");
  $("#pay .yes").attr("href","?a=outpay_detail&order_id=<?=$order_id?>&action=return");
  $("#pay").modal('show');
  }

function confirmOutpay(order_id)
  {
  $("#pay .modal-title").html("<?=$lang['adm_outpay_detail_popupTitle2']?>");
  $("#pay .modal-body p").html("<?=$lang['adm_outpay_detail_popupBody2']?>");
  $("#pay .yes").attr("href","?a=outpay_detail&order_id=<?=$order_id?>&action=pay");
  $("#pay").modal('show');
  }

</script>                               
                            
<!--									
<a href="?a=outpay_detail&order_id=<?=$order_id?>&action=pay" onclick="return confirm('<?=$lang['paid'].$lang['Y-N']?>')"></a>
<a href="?a=outpay_detail&order_id=<?=$order_id?>&action=frize" onclick="return confirm('<?=$lang['frize'].$lang['Y-N']?>')"></a>	
-->