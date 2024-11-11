<?php

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

//                                                                  


$action=isset($_REQUEST['action'])? $_REQUEST['action']: false;

  if(isset($_SESSION['room_msg']))
    {
    print $_SESSION['room_msg'];
    unset ($_SESSION['room_msg']);
    }

  if ($action=='edit')
  {
  $jack_name=mysql_real_escape_string ($_POST['jack_name']);
  $jack_sum=floatval ($_POST['jack_sum']);
  $jack_percent=floatval (str_replace (',','.',$_POST['jack_perc']));
  $jack_minsum=floatval (str_replace (',','.',$_POST['jack_minsum']));
  $jack_chance=intval ($_POST['jack_chance']);
  
  //$jack_start_timeofday=mysql_real_escape_string ($_POST['jack_start_timeofday']);
  //$jack_end_timeofday=mysql_real_escape_string($_POST['jack_end_timeofday']);
  //$jack_gamers_count=intval ($_POST['jack_gamers_count']);
  
  $jack_id=intval($_REQUEST['jack_id']);
  
  if($jack_name&&$jack_sum&& $jack_percent)
    {
    $sql="update jackpots 
          set 
            date_time=now(),
            name='$jack_name',
            pay_sum=$jack_sum,
            percent=$jack_percent,
            min_sum=$jack_minsum,
            chance_prepay=$jack_chance
          where id=$jack_id";
          
          /*
          ,
            start_timeofday='$jack_start_timeofday',
            end_timeofday='$jack_end_timeofday',
            gamer_count='$jack_gamers_count'
            */
          
    if(mysql_query($sql))
      {
      $txt=$lang['adm_jp_editmsg'];
      $txt=str_replace('%jack_name%',$jack_name,$txt);
      $txt=str_replace('%jack_sum%',$jack_sum,$txt);
      $txt=str_replace('%jack_percent%',$jack_percent,$txt);
      mysql_query("insert into jack_history (jack_id,user_id,txt) values ($jack_id,$user_id, '$txt')");
      $msg="                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_10']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
      }
    else
      $msg="                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
    }
  else
    $msg="                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_1']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	";
  
  if (isset($msg)) echo $msg;
  }
elseif ($action=='edit_megajp')
  {
  $g_id=$db->prepare($_POST['g_id']);
  $jp1=floatval ($_POST['jp1']);
  $jp2=floatval ($_POST['jp2']);
  $jp_count=floatval (str_replace (',','.',$_POST['jp_count']));
  $jp_triger=floatval (str_replace (',','.',$_POST['jp_triger']));
  
  
  if($g_id)
    {
    $jp_sum=$jp1."|".$jp2;
    $sql="update game_settings 
          set 
            g_bon1_1='$jp_sum',
            g_bon1_2='$jp_count',
            g_bon1_3='$jp_triger'
          where g_id=$g_id";
          
          /*
          ,
            start_timeofday='$jack_start_timeofday',
            end_timeofday='$jack_end_timeofday',
            gamer_count='$jack_gamers_count'
            */
    if($db->run($sql))
      {
      $msg="                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>                             </strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
      }
    else
      $msg="                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
    }
  else
    $msg="                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_1']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	";
  
  if (isset($msg)) echo $msg;
  }   
     
  
if($action=='history')
  {
  $id=intval($_REQUEST['id']);
  $sql="select t1.*, login from jack_history t1 join users on (t1.user_id=users.id) where jack_id=$id order by t1.id desc";
  $jack_his_res=pager($sql,$paginator);
  if($jack_his_res)
    {
    echo '
                        <div class="row">                            
                            <div class="col-md-12" id = "jackpot-info">
                                <div class="block">
                                    <div class="head"> 
									<h2>'.$lang['adm_jp_head_log'].'</h2>                                        
                                    </div>
                                    <div class="content np" >

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th width="15%">'.$lang['adm_jp_log_date'].'</th> 
                                                    <th width="15%">'.$lang['adm_jp_log_login'].'</th>													
                                                    <th width="70%">'.$lang['adm_jp_log_log'].'</th>
                                                </tr>
                                            </thead>
                                              <tbody>	
	';
    if(mysql_num_rows($jack_his_res)>0)
      {
      while($row=mysql_fetch_array($jack_his_res))
        {
      echo "<tr align='center'>";
      echo "<td>".$row['date_time']."</td>";
      echo "<td>".$row['login']."</td>";
      echo "<td>".$row['txt']."</td>";
      echo "</tr>";
        }
      }
    else
      {
      echo "<tr><td colspan=3 align=center>".$lang['adm_jp_no_records']."</td></tr>";
      }
    echo "</table></div>";
    if($paginator)
      echo "
          <div class='footer'>
            <div class=\"side fr\">$paginator</div>
          </div>";
    echo      "
          </div></div></div>";  
    }
    else
           echo "                            
        <div class='col-md-12'>
        <div class='alert alert-danger'>
        <center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
        <button class='close' data-dismiss='alert' type='button'>  </button>
        </div>
        </div>  
           ";
  }
else
  {   
      if (isset($room)&& $room>0)
        {
        show_jackpots($room);

        show_egt_jackpots();

        show_mega_jackpots();
    
?>


                                                    
                                                  
<!-- Bootrstrap modal form [jack balance]-->
    <div class="modal fade" id="chBalEgtForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title"></h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-5">
                                                                   
                                </div>
                                <div class="col-md-7">
                                  <div class="input-group">
                                    <span class="input-group-addon minus"><i class="i-minus-3"></i></span>
                                    <input type="text" name="sum" value="" class="form-control"/>
                                    <span class="input-group-addon plus"><i class="i-plus-2"></i></span>
                                  </div> 
                                </div>
                            </div>
                                                       
                        
                    </div>
                                      
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit">    </button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_jp_cancel']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->


    <!-- Bootrstrap modal form [jack balance]-->
    <div class="modal fade" id="chBalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title" id="myModalLabel3"><?=$lang['adm_jp_title']?></h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_jp_amount']?>
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
                                    <?=$lang['adm_jp_select']?>
                                </div>
                                <div class="col-md-9 buttons">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">100</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">200</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">500</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">1000</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">5000</button>
                                </div>
                            </div>
                                                       
                        
                    </div>                    
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit">    </button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_jp_cancel']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->

    <!-- Bootrstrap modal form [edit jack]-->
    <div class="modal fade" id="megajackForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title"></h3>
                </div>
                <form action="" method="post">
                <input type="hidden" name="action" value="edit_megajp">
                <input type="hidden" name="g_id">
                <div class="modal-body">
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                    JP 1:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jp1" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    JP 2:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jp2" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                                  
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jp_count" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                                
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jp_triger" value="" class="form-control"/>                        
                                </div>
                            </div>
                    </div>
                                       
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit">    </button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_popup_cancel']?></button> 
                               
                </div>
                </form>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->


    <!-- Bootrstrap modal form [edit jack]-->
    <div class="modal fade" id="jackForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title"></h3>
                </div>
                <form action="" method="post">
                <input type="hidden" name="action" value="edit">
                <input type="hidden" name="jack_id">
                <div class="modal-body">
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_jp_edit_name']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jack_name" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_jp_edit_win']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jack_sum" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_jp_edit_percent']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jack_perc" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_jp_edit_win_chance']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jack_minsum" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_jp_edit_spin']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="jack_chance" value="" class="form-control"/>                        
                                </div>
                            </div>
                                                       
                        
                    </div>
                                       
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit">    </button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_popup_cancel']?></button> 
                               
                </div>
                </form>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->


<script>
var jack_id;
var g_id,field, badge;
$(document).ready( function () {

    refreshTimer_jackpotid = set_Refresh_JP_timer();

  $(".controls-row input").on("focus", function(){  
    $(this).parents(".controls-row").removeClass('error');
  });
  
  
  //                                
  $("#chBalForm .buttons button").on('click',function(){
      change_jackbalance($(this).html());
  });
  $("#chBalForm .submit").on('click',function(){
    var sum=$("#chBalForm input[name='sum']").val();
    if (sum!=0)
      {
          change_jackbalance(sum);
          $("#chBalForm").modal('hide');
      }
    else
      $("#chBalForm input[name='sum']").parents(".controls-row").addClass('error');
  });

  $(".egt_sum").on('click', function(){
    g_id=$(this).parents('tr').data('g_id');
    jp= $(this).data('jp');
    field='g_bon1_1';
    tds=$(this).parents('tr').children('td');
    g_name=$(tds[0]).children().text();
    val=$(this).text();
    badge=$(this);
    $("#chBalEgtForm .modal-title").text(g_name+'                '+(jp+1)+' (          )');
    $("#chBalEgtForm input[name='sum']").val(val);
    $("#chBalEgtForm").modal('show');
  });
  
  $(".egt_perc").on('click', function(){
    g_id=$(this).parents('tr').data('g_id');
    jp= $(this).data('jp');
    field='g_bon1_2';
    tds=$(this).parents('tr').children('td');
    g_name=$(tds[0]).children().text();
    val=$(this).text();
    badge=$(this);
    $("#chBalEgtForm .modal-title").text(g_name+'                '+(jp+1)+' (              )');
    $("#chBalEgtForm input[name='sum']").val(val);
    $("#chBalEgtForm").modal('show');
  });
  
  $(".mega_edit").on('click',function(){
  
    var tr=$(this).parents("tr");
    $("#megajackForm .modal-title").text(tr.children("td:eq(0)").text());
    $("#megajackForm [name=g_id]").val(tr.data("g_id"));
    $("#megajackForm [name=jp1]").val(tr.children("td:eq(1)").text());
    $("#megajackForm [name=jp2]").val(tr.children("td:eq(2)").text());
    $("#megajackForm [name=jp_count]").val(tr.children("td:eq(3)").text());
    $("#megajackForm [name=jp_triger]").val(tr.children("td:eq(4)").text());
    $("#megajackForm").modal('show');
    return false;
  });
  
  $(".mega_sum").on('click', function(){
    g_id=$(this).parents('tr').data('g_id');
    jp= 0;
    field='g_bon1_1';
    tds=$(this).parents('tr').children('td');
    g_name=$(tds[0]).children().text();
    val=$(this).text();
    badge=$(this);
    $("#chBalEgtForm .modal-title").text(g_name+' (          )');
    $("#chBalEgtForm input[name='sum']").val(val);
    $("#chBalEgtForm").modal('show');
  });
  
  $(".mega_perc").on('click', function(){
    g_id=$(this).parents('tr').data('g_id');
    jp= 0;
    field='g_bon1_2';
    tds=$(this).parents('tr').children('td');
    g_name=$(tds[0]).children().text();
    val=$(this).text();
    badge=$(this);
    $("#chBalEgtForm .modal-title").text(g_name+' (              )');
    $("#chBalEgtForm input[name='sum']").val(val);
    $("#chBalEgtForm").modal('show');
  });
  
  $(".mega_triger").on('click', function(){
    g_id=$(this).parents('tr').data('g_id');
    jp= 0;
    field='g_bon1_3';
    tds=$(this).parents('tr').children('td');
    g_name=$(tds[0]).children().text();
    val=$(this).text();
    badge=$(this);
    $("#chBalEgtForm .modal-title").text(g_name+' (            )');
    $("#chBalEgtForm input[name='sum']").val(val);
    $("#chBalEgtForm").modal('show');
  });
  
  $("#chBalEgtForm .minus").on('click', function(){
    $(this).siblings('input[name=sum]').val($(this).siblings('input[name=sum]').val()-1);
  });
  
  $("#chBalEgtForm .plus").on('click', function(){
    $(this).siblings('input[name=sum]').val(parseFloat($(this).siblings('input[name=sum]').val())+1);
  });
  
  $("#chBalEgtForm .submit").on('click', function(){
   sum=$("#chBalEgtForm input[name='sum']").val();
   $.ajax({
				      url: "../engine/ajax/egt_jack.php",
				      data: "action=change&field="+field+"&suma="+sum+"&jp="+jp+"&g_id="+g_id,
				      cache: false,
              dataType: 'json',
				      success: function(result)
                {
                if (result.status=='ok')
                  {
                  badge.text(sum);
                  Ualert('                                 ','alert-success');
                  }
                 else  
                  Ualert(result.txt);
                $("#chBalEgtForm").modal('hide');  
                }
			        }); 
  });
    
  //                                        
  $("#jackForm .submit").on('click',function(){
    var error=false;;
    /*if ($("#userForm input[name='username']").val()=='') //                           
      {
      $("#userForm input[name='username']").parents(".controls-row").addClass('error');
      error=true;
      }
    if ($("#userForm input[name='userpass']").val()=='') //                 pass
      {
      $("#userForm input[name='userpass']").parents(".controls-row").addClass('error');
      error=true;
      }
    if ($("#userForm input[name='usermail']").val()=='') //                 mail
      {
      $("#userForm input[name='usermail']").parents(".controls-row").addClass('error');
      error=true;
      }*/    
    if(!error)
      $("#jackForm form").submit();
    else
      return false;  
  });  
		}); 
		
function edit_jack(jack_id)
  {
      clearInterval(refreshTimer_jackpotid);
  $.ajax({
				url:"/engine/ajax/get_jack.php?id="+jack_id,
				cache: false,
				dataType: 'json',
				success: function(result){
         $('#jackForm .modal-title').html("<?=$lang['adm_jp_edit_title']?>");
         $('#jackForm input[name="jack_id"]').val(result.id);
				 $('#jackForm input[name="jack_name"]').val(result.name);
				 $('#jackForm input[name="jack_sum"]').val(result.pay_sum);
				 $('#jackForm input[name="jack_perc"]').val(result.percent);
				 $('#jackForm input[name="jack_minsum"]').val(result.minsum);
				 $('#jackForm input[name="jack_chance"]').val(result.chance);
				 $('#jackForm input[name="jack_coment"]').val(result.coment);
         //$('#jack_start_timeofday').val(result[0].starttime);
         //$('#jack_end_timeofday').val(result[0].endtime);
         //$('#jack_gamers_count').val(result[0].gamer_count);
				 $("#jack-form").attr('action','?a=jp&action=edit&jack_id='+jack_id);
				 $("#jackForm").modal('show'); 
				}
			});

      refreshTimer_jackpotid = set_Refresh_JP_timer();
  }

function change_jackbalance(suma){

    clearInterval(refreshTimer_jackpotid);

          $.ajax({
				      url: "../engine/ajax/change_jack_balance.php",
				      data: "action=plus&suma="+suma+"&jack="+jack_id,
				      cache: false,
				      success: function(result)
                {
                arr_result=result.split ('|');

                    refreshTimer_jackpotid = set_Refresh_JP_timer();

                if (arr_result[0]=='success')
                  {
                  $("#balance_"+jack_id).text((arr_result[1]));
                  Ualert('<?=$lang['adm_jp_balanceUp']?> '+suma,'alert-success');
                  }
                 else
                  Ualert(result);
                }
			        });
        } 
</script>
      <?php
    
    }
}
?>