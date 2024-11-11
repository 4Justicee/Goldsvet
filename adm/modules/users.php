<?php

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

//                                                                  

$action=isset($_REQUEST['action'])? $_REQUEST['action']: false;

if($status==1)
 {
if($action=="remove")
  {
  $remove_user=intval($_REQUEST['userid']);
  if ($remove_user>1)
    {remove_user($remove_user);
    print "<script>  location.href='?a=users';</script>";
    }
  else
    $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_33']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";
  }
elseif ($action=="delacc")
  {
  $id=isset($_REQUEST['id'])? intval($_REQUEST['id']): false;
  if(!empty($id))
    remove_user($id);
  }
elseif($action=="addacc")
  {
  //                             
  $add_login= isset($_REQUEST['username'])&& !empty($_REQUEST['username'])?  mysql_real_escape_string($_REQUEST['username']): false;
  $add_pass=  isset($_REQUEST['userpass'])&& !empty($_REQUEST['userpass'])?  mysql_real_escape_string($_REQUEST['userpass']): false;
  $add_mail=  isset($_REQUEST['usermail'])&& !empty($_REQUEST['usermail'])?  mysql_real_escape_string($_REQUEST['usermail']): false;
  $add_wmr=  isset($_REQUEST['userwmr'])&& !empty($_REQUEST['userwmr'])?  mysql_real_escape_string($_REQUEST['userwmr']): false;
  $add_phone= isset($_REQUEST['userphone'])&& !empty($_REQUEST['userphone']) && $_REQUEST['userphone']!=='+7'?  "'".mysql_real_escape_string($_REQUEST['userphone'])."'": 'null';
  
  $add_group= (isset($_REQUEST['is_kassir']) && $_REQUEST['is_kassir']=='1') ? 4 : 5;
  $add_room= $room;
  $add_creator=$user_id;
  
  $add_login=trim($add_login);
  $default_lang=$conf['default_lang'];
  
  if(!$add_login)
     {
     $err=true;
     $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_34']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	 
	 ";
     }
   if(!$add_pass)  
     {
     $err=true;
     $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_35']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	 
	 ";
     }
   if(!$add_mail && $add_group==5) 
     {
     $err=true;
     $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_36']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	 
	 ";
     }
   elseif(!preg_match("/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i", $add_mail)) 
     {
     $err=true;
     $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_37']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	 
	 ";
     }   
    if(!isset($err)) 
     {
    //                           
    if($status==1)
      {
      //$payed_spin=$conf['payed_spins_fixed']? $conf['payed_spins_val']: $conf['spin_koef']*$bonus;
      $payed_spin=$conf['payed_spins_val'];
    
      
      $pin= generator('off','off','on','off',4);
      $sql= "insert into users (login, pass,creator,status,reg_time,pin,room_id,lang,email,qiwi,wmr,ip, os, useragent,payed_spins) 
              values('$add_login','".as_md5($conf['lic_key'],$add_pass)."',$add_creator,$add_group,".time().",'$pin',$add_room,'$default_lang','$add_mail',$add_phone,'$add_wmr','".getip()."', '".get_os()."', '".$useragent."',$payed_spin)";
      if (mysql_query($sql))
        {
        $add_user_id= mysql_insert_id();
        save_log(date('Y-m-d H:i:s')." $login                             $add_login (pin $pin)             ($add_room)" , 'users.log');
        $txt=str_replace('%username%',$add_login,$lang['adm_msg_38']);
        $txt=str_replace('%pin%',$pin,$txt);
        $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>$txt</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
        user_mail('1', 0, array('login'=>$add_login,'password'=>$add_pass,'group'=>$add_group, 'room'=>$add_room, 'reg_time'=>time(),'user'=>$login));
        if($reg_bon) 
		save_stat_pay($reg_bon, $add_login, 2, 'reg_bon', $inv_code);
				print "<script>  location.href='?a=users';</script>";
				exit();
        }
      else
        {
          if(strpos(mysql_error(),'Duplicate entry')!==false)
             { 
             if(strpos(mysql_error(),'login')!==false)
              $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_39']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>			  
			  ";
             if(strpos(mysql_error(),'email')!==false)
              $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_40']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>			  
			  ";
             if(strpos(mysql_error(),'qiwi')!==false)
              $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_41']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>			  
			  ";  
             }
          else
             $_SESSION['message'][]= "
                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>			 
			 ";
        }   
      }
    else
      print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_42']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
   }   
  }
elseif($action=="editacc")
  {
  //                         
  $edit_user_id=isset($_REQUEST['id'])&& !empty($_REQUEST['id'])?  intval($_REQUEST['id']): false;
  $edit_login= isset($_REQUEST['username'])&& !empty($_REQUEST['username'])?  mysql_real_escape_string($_REQUEST['username']): false;
  $edit_pass=  isset($_REQUEST['userpass'])&& !empty($_REQUEST['userpass'])?  mysql_real_escape_string($_REQUEST['userpass']): false;
  $edit_mail=  isset($_REQUEST['usermail'])&& !empty($_REQUEST['usermail'])?  mysql_real_escape_string($_REQUEST['usermail']): false;
  $edit_phone= isset($_REQUEST['userphone'])&& !empty($_REQUEST['userphone'])?  mysql_real_escape_string($_REQUEST['userphone']): false;
  $edit_wmr= isset($_REQUEST['userwmr'])&& !empty($_REQUEST['userwmr'])?  mysql_real_escape_string($_REQUEST['userwmr']): false;
  $edit_group= isset($_REQUEST['is_kassir'])&& $_REQUEST['is_kassir']==1? '4': 5;
  
  $sql_arr[]="status='$edit_group'";
  if($edit_login) $sql_arr[]="login='$edit_login'";
  if($edit_pass) $sql_arr[]="pass='".as_md5($conf['lic_key'],$edit_pass)."'";
  if($edit_mail && $edit_mail!=$user_info['email']) $sql_arr[]="email='$edit_mail'";
  if($edit_phone) $sql_arr[]="qiwi='$edit_phone'";
  if($edit_wmr) $sql_arr[]="wmr='$edit_wmr'";
  
  $edit_login=trim($edit_login);
    //                             
    if(($status==1) && $edit_user_id)
      {
      if(isset($sql_arr))
        {
        $sql= "update users set ";
        $sql.=implode(', ', $sql_arr);
        $sql.=" where id=$edit_user_id";
        }
      if (mysql_query($sql))
        {
        print "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_10']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>			
		";
        }
      else
        {
        print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
        save_log($sql."\r\n".mysql_error(),"db_error.log");
        }  
          
      }
    else
      print "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_42']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
  }

 elseif($action=="addcomment")
  {
  if (mysql_query("update users set comment='".$_POST['commentText']."' where id=".intval($_POST['user_comment'])))
    {$_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_43']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>
	";
		 print "<script>  location.href='?a=users';</script>";
		 exit();
		} 
  }
elseif($action=="set_jack")
  {
  $jack=intval($_GET['jack']);
  $user=intval($_GET['uid']);
  if($jack && $user && $db->get_one("select count(*) from users where id=$user"))
    {
    if($db->run("update jackpots set mast_win=$user where id=$jack"))
      {
      $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_44']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
		  print "<script>  location.href='?a=users';</script>";
		  exit();
      }
    }
  else
    {
    $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_45']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	";
		 print "<script>  location.href='?a=users';</script>";
		 exit();
    }  
  }
elseif($action=="unset_jack")
  {
  $jack=intval($_GET['jack']);
  if($jack)
    {
    if(mysql_query("update jackpots set mast_win=null where id=$jack"))
      {
      $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_46']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
		  print "<script>  location.href='?a=users';</script>";
		  exit();
      }
    }
  else
    {
    $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_45']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	";
		 print "<script>  location.href='?a=users';</script>";
		 exit();
    }  
  }
 }
  
$cookie_user= isset($_COOKIE['users-tree_open'])? $_COOKIE['users-tree_open']: $user_id;

  if(isset($_SESSION['message']))
    {
    foreach($_SESSION['message'] as $msg)
      print $msg;
    unset ($_SESSION['message']);
    }
if(1==2)
  {    
?>
<div class="row">                            
  <div class="col-md-12">
    <div class="block">
      <div class="head"> 
				<h2>                </h2>                                      
      </div>
      <div class="content np">
        <table width="100%" cellspacing="0" cellpadding="0" class="editable oc_disable" id="addRowExample">
          <thead>
            <tr>                                                    
              <th width="10%">            </th>
              <th width="10%">          </th>													
              <th width="10%">    </th>
							<th width="10%">          </th>
              <th width="10%">            </th>
							<th width="10%">          </th>
              <th width="10%">          </th>
            </tr>
          </thead>
          <tbody>	
            <tr align="center">
              <td id="debug_balance"></td>
              <td id="debug_bbalance"></td>
              <td id="debug_payin"></td>
              <td id="debug_bank"></td>
              <td id="debug_cell"></td>
              <td id="debug_jack"></td>
              <td id="debug_total"></td>
            </tr>  
          </tbody>
        </table>                                         
      </div>
    </div> 
  </div>                                
</div>

<?php
  }
print '<div id="user-info">  ';
    show_room_addinfo(1,true,false);
print '</div>';
  
function status_pic($status)
  {
  return "($status)";
  }    
?>


<!-- Bootrstrap modal form [user balance]-->
    <div class="modal fade" id="chBalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title" id="myModalLabel3"><?=$lang['adm_users_edit_head']?></h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_users_edit_amount']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="sum" value="" class="form-control"/>                        
                                </div>
                            </div>
                                                       
                        
                    </div>
                    <!--buttons -->
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_users_edit_select']?>
                                </div>
                                <div class="col-md-9 buttons">
                                    <?php
                                    foreach($conf['balance_preset'] as $val)
                                    echo '<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">'.$val.'</button> ';
                                    ?>
                                </div>
                            </div>
                                                       
                        
                    </div>                    
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit">    </button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_users_edit_cancel']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->

    <!-- Bootrstrap modal form [edit user]-->
    <div class="modal fade" id="userForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title"></h3>
                </div>
                <form action="?a=users&action=addacc" method="post">
                <div class="modal-body">
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_users_add_login']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="username" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_users_add_pass']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="password" name="userpass" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_users_add_mail']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="usermail" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_users_add_phone']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="userphone" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_users_add_wmr']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="userwmr" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_users_add_cashier']?>
                                </div>
                                <div class="col-md-9">
                                    <input name="is_kassir" type="checkbox" value="1" class="uni"/>                        
                                </div>
                            </div>
                                                       
                        
                    </div>
                                       
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit">    </button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_users_add_cancel']?></button> 
                               
                </div>
                </form>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->
    
    <!-- Bootrstrap modal -->    
    <div class="modal fade" id="delUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title" id="myModalLabel2"><?=$lang['adm_users_del_head']?></h3>
                </div>
                <div class="modal-body"> 
                    <p><?=$lang['adm_users_del_body']?></p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning yes" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_users_yes']?></button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_users_no']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    
    <!-- EOF Bootrstrap modal -->


<script>
$(document).ready(function () {
  $(".controls-row input").on("focus", function(){  
    $(this).parents(".controls-row").removeClass('error');
  });
  
  
  //                                
  balance_flag=true;
  $("#chBalForm .buttons button").on('click',function(){
      change_acc_balance($(this).html());
  });
  $("#chBalForm .submit").on('click',function(){
    var sum=$("#chBalForm input[name='sum']").val();
    if (sum!=0)
      {
      change_acc_balance(sum);
      $("#chBalForm").modal('hide');
      }
    else
      $("#chBalForm input[name='sum']").parents(".controls-row").addClass('error');
  });
    
 
  //                              
  $("#userForm .submit").on('click',function(){
    var error=false;;
    if ($("#userForm input[name='username']").val()=='') //                           
      {
      $("#userForm input[name='username']").parents(".controls-row").addClass('error');
      error=true;
      }
    if ($('#userForm form').attr('action')== "?a=users&action=addacc" && $("#userForm input[name='userpass']").val()=='') //                 pass
      {
      $("#userForm input[name='userpass']").parents(".controls-row").addClass('error');
      error=true;
      }
    if ($("#userForm input[name='usermail']").val()=='') //                 mail
      {
      $("#userForm input[name='usermail']").parents(".controls-row").addClass('error');
      error=true;
      }    
    if(!error)
      $("#userForm form").submit();
    else
      return false;  
  });
  
});

function add_acc()
  {
  $('#userForm form').attr('action', "?a=users&action=addacc")
  $('#userForm input[name="username"]').val('');
  $('#userForm input[name="usermail"]').val('');
  $('#userForm input[name="userphone"]').val('+7');
  $('#userForm #is_kassir').attr("checked",false);
  $('#userForm .modal-title').html("<?=$lang['adm_users_add_title']?>");
  $('#userForm').modal('show');
  }
  


function edit_acc(user)
  {
  $.ajax({
				url: "<?=$baseurl?>engine/ajax/get_user_row.php?id="+user,
				cache: false,
        dataType: "json",
				success: function(data){
          $('#userForm .modal-title').html("<?=$lang['adm_users_edit_title']?>");
          $('#userForm form').attr('action', "?a=users&action=editacc&id="+user)
          $('#userForm input[name="username"]').val(data.login);
          $('#userForm input[name="usermail"]').val(data.email);
          $('#userForm input[name="userphone"]').val(data.qiwi);
          $('#userForm input[name="userwmr"]').val(data.wmr);
          if(data.status==4)
            {
            $('#userForm input[name="is_kassir"]').attr("checked",true);
            $('#userForm input[name="is_kassir"]').parent('span').addClass('checked');
            }
          else  
            {
            $('#userForm input[name="is_kassir"]').attr("checked",false);
            $('#userForm input[name="is_kassir"]').parent('span').removeClass('checked');
            }
          $('#userForm').modal('show');
				}
			});
      
  
  }

function remove_user(user_id)
  {
  $("#userid").val(user_id);
  $('#addUserForm').attr('action', '?a=users&action=remove');
  $('#addUserForm').submit();
  }  

function lock_user(user_id)
  {
  $.ajax({
				url: "<?=$baseurl?>engine/ajax/lock_user.php?user="+user_id+"&action=lock",
				cache: false,
				success: function(html){
          refreshInfo($.cookies.get('users-tree_open'),'users-tree', '<?=$baseurl?>engine/ajax/get_user_info.php');
          Ualert('<?=$lang['adm_msg_47']?>','alert-success');
				}
			});
  }  

function unlock_user(user_id)
  {
  $.ajax({
				url: "<?=$baseurl?>engine/ajax/lock_user.php?user="+user_id+"&action=unlock",
				cache: false,
				success: function(html){
          refreshInfo($.cookies.get('users-tree_open'),'users-tree', '<?=$baseurl?>engine/ajax/get_user_info.php');
          Ualert('<?=$lang['adm_msg_48']?>','alert-success');
				}
			});
  }  
  
  
function reset_curspin(user,type)
  {
  if(type==null) type='spin';
  $.ajax({
				url: "<?=$baseurl?>engine/ajax/reset_curspin.php?user="+user+"&type="+type,
				cache: false,
				success: function(html){
          Ualert('<?=$lang['adm_msg_49']?>','alert-success');
				}
			});
  }  
  
function edit_payed_spins(elem,user)
  {
  elem=$(elem);
  if(elem.children('.inp').length==0)
    {
    val= elem.html();
    elem.html("<input class=inp type=text value='"+val+"'>");
    clearInterval(refreshTimer_id);
    elem.children('.inp').focus();
    elem.children('.inp').on('blur',
        function(){
            amount=this.value;
            $.ajax({
				url: "<?=$baseurl?>engine/ajax/edit_payed_spins.php?user="+user+"&amount="+amount,
				cache: false,
				success: function(html){
        elem.html(amount);
        refreshTimer_id= set_Refresh_timer();
        Ualert('<?=$lang['adm_msg_50']?>','alert-success');
				}
			});
  
            })
    }
  }

function edit_garant(elem,user,type)
  {
  if(type==null) type='spin';
  elem=$(elem);
  if(elem.children('.inp').length==0)
    {
    val= elem.html();
    elem.html("<input class=inp type=text value='"+val+"'>");
    clearInterval(refreshTimer_id);
    elem.children('.inp').focus();
    elem.children('.inp').on('blur',
        function(){
            amount=this.value;
            $.ajax({
				url: "<?=$baseurl?>engine/ajax/edit_garant.php?user="+user+"&data="+amount+"&type="+type,
				cache: false,
				success: function(html){
        elem.html(amount);
        refreshTimer_id= set_Refresh_timer();
        Ualert('<?=$lang['adm_msg_51']?>','alert-success');
				}
			});
  
            })
    }
  }

          
var balance_trend;
var user;
$(document).ready(
   function ()
    {
      
      $(document).on('change','.point_on', function(){
          user_id=$(this).parent().parent().attr('id');
          if(this.checked)
            action='on';
          else
            action='off';
          $.ajax({
				url: "<?=$baseurl?>engine/ajax/point.php?action="+action+"&user="+user_id,
				cache: false,
        dataType: "json",
				success: function(data){
					  alert(data);
				}
			});    
      }); 
		  
		  $('input.asci_only').keypress( function(e) {
        if($.browser.msie)
          return isAsci(e.keyCode)
        else
          return (e.keyCode) ? true : isAsci(e.charCode)
        });
    function isAsci(cCode){
      return /[a-zA-Z0-9@\.]/.test(String.fromCharCode(cCode))
}
		  
		   
  
    }
  );
  
        
function change_acc_balance(suma){
          if(!suma)
            suma=Number($("#acc_sum").val());
          
          if(balance_flag)
          if(suma)
          {
          balance_flag=false;
          $.ajax({
				      url: "../engine/ajax/change_balance.php",
				      data: "action="+balance_trend+"&suma="+suma+"&user="+user_id+"&type="+balance_type,
				      cache: false,
				      success: function(result)
                {
                balance_flag=true;
                arr_result=result.split ('|');
                if (arr_result[0]=='success')
                  {
                  if(balance_type=='real')
                    {
                    $("#acc_"+user_id+"_balance").text(arr_result[1]);
                    $("#balance").text(arr_result[2]);
                    if(balance_trend=='plus')
                      Ualert('<?=$lang['adm_msg_52']?> '+suma,'alert-success');
                    else
                      Ualert('<?=$lang['adm_msg_53']?>'+suma, 'alert-success');
                    }
                  else
                    {
                    $("#acc_"+user_id+"_demobalance").text(arr_result[1]);
                    }  
    	            refreshInfo($.cookies.get('users-tree_open'),'users-tree', '<?=$baseurl?>engine/ajax/get_room_info.php');
                  }
                 else  
                  Ualert(arr_result[1]);
                }
			        });
         }
         else
         alert ('<?=$lang['adm_users_enter_sum']?>');  
        }  
        
/*$(document).on('focus', "#summ", function(){
     clearInterval(refreshTimer_id);
});

$(document).on('blur', "#summ", function(){
     refreshTimer_id= set_Refresh_timer();
}); */   
  
$(document).on('focus', "#filter", function(){
    this.value='';
    clearInterval(refreshTimer_id);
  });  

$(document).on('blur', "#filter", function(){
          if(this.value=='')
            {
            $.cookies.set('filter','', '-3600','/');
            }
          else
            {  
            $.cookies.set('filter',this.value, '','/');
            }
            refreshTimer_id= set_Refresh_timer();
            refreshInfo($.cookies.get('users-tree_open'),'users-tree', '<?=$baseurl?>engine/ajax/get_user_info.php');
          });


//$(".paginator a").on('click', function(){refreshInfo($.cookies.get('users-tree_open'),'users-tree', '<?=$baseurl?>engine/ajax/get_user_info.php')});
                       
$(document).ready(function () {
  
  refreshTimer_id=set_Refresh_timer();
  
  $(document).on('click', '#acc_table th.sorting', function(){
      var order_field=this.id.substring(3);
      var order_cookie;
      if(order_cookie=$.cookies.get('order_acc'))
         order_cookie=order_cookie.split(':');
      else
         order_cookie=false;
          
      if(order_cookie && order_cookie[0]==order_field)
        {
        var order_direction=order_cookie[1]=='asc'?'desc':'asc';
        }
      else  
        {
        var order_direction='asc';
        }


      $.cookies.set('order_acc', order_field+':'+order_direction);
      refreshInfo($.cookies.get('users-tree_open'),'users-tree', '<?=$baseurl?>engine/ajax/get_user_info.php');
  });
   
  });
function activate(user,type,resend)
  {
  //alert(user+' - '+type+' - '+resend);
  $.ajax({
				      url: "../engine/ajax/activate.php",
				      data: "type="+type+"&user="+user+"&resend="+resend,
				      cache: false,
				      success: function(result)
                {
                arr_result=result.split ('|');
                if (arr_result[0]=='error')
                  alert(arr_result[1]);
                }
			        });
  }  
</script>
