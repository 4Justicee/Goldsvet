<?php 
if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');
Error_Reporting(E_ALL);   

 $view = isset($_GET['view'])? intval($_GET['view']) : false;
if($view === 0 || $view === 1) {
	set_game_settings(intval($_GET['id']),'g_view',$view, true);
}


 
  if ($room>0)
  {
  if($status==1) //                                                                    
    {
  //                /                                      
$game_group_id=isset($_POST['gr_id'])? intval($_POST['gr_id']): false;
$group_action=isset($_POST['action'])? $_POST['action']: false;

if ($game_group_id!==false && $group_action)
  {
  if($group_action==$lang['adm_game_on'])
    $g_view=1;
  elseif($group_action==$lang['adm_game_off'])
    $g_view=0;
    
  $res=mysql_query("select g_id from game_settings where gr_id='$game_group_id' and room_id=$room");
  if($res)
    {
    while ($row=mysql_fetch_assoc($res))
      {
      set_game_settings(intval($row['g_id']),'g_view',$g_view, true);
      }
    }  
  }

 elseif(isset ($_REQUEST['action']) && $_REQUEST['action']== "editgarant") 
    {
    $group=isset($_REQUEST['group'])? $_REQUEST['group'] : false;
    if($group)
      {
      $sql="insert into garant (room_id, gr_id, garant_bon,garant_win) values ($room,$group,'".$_POST['gbon']."','".$_POST['gwin']."') on duplicate key UPDATE garant_bon='".$_POST['gbon']."',garant_win='".$_POST['gwin']."'";
      if($res=mysql_query($sql))
        {
        $_SESSION['message'][]="                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_18']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		  
		  ";
        echo "<script>window.location='/adm/adm.php?a=game'</script>";
        die();  
        }
      }
    } 
elseif(isset ($_REQUEST['action']) && $_REQUEST['action']== "edit_cat")
  {
  $cats=isset ($_REQUEST['cats'])? $_REQUEST['cats']: false;
  
  $g_ids=isset ($_REQUEST['ids'])? explode(',',$_REQUEST['ids']): false;
  
  if($g_ids)
    {
    $db->run("delete from game_cat_rel where g_id in (".implode(',',$g_ids).") ");
    if($cats)
      {
      foreach($cats as $cat)
        {
          foreach($g_ids as $g_id)
            {
            $values[]="(null,$g_id,'$cat')";
            }
        }
      if($db->run("insert into  game_cat_rel values ".implode(',',$values)))
        $_SESSION['message'][]="                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>                                     </strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>";
    
      }
      
    }
  
        echo "<script>window.location='/adm/adm.php?a=game'</script>";
        die();  
        }  
  }    
    

  
  ?>


                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2><?=$lang['adm_game_title']?></h2>                                       
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th><?=$lang['adm_game_table1Head_1']?></th> 
                                                    <th><?=$lang['adm_game_table1Head_2']?></th>													
                                                    <th colspan='2'><?=$lang['adm_game_table1Head_3']?></th>
													<th colspan='2'><?=$lang['adm_game_table1Head_4']?></th>
                                                </tr>
                                            </thead>
                                              <tbody>
    <?php
    $sql="select * from room_banks where room_id=$room";
    
    if($room_res=mysql_query($sql)) 
      {
      if(mysql_num_rows($room_res))
       {
      while($room_row=mysql_fetch_assoc($room_res))
        {
        if($room_row['from_bet']>=0)
          {
          echo "<tr align='center'>";
          echo "<td><input type=text name='from_bet[".$room_row['id']."]' class=form-control value=".$room_row['from_bet']."></td>";
          echo "<td><input type=text name='to_bet[".$room_row['id']."]' class=form-control value=".$room_row['to_bet']."></td>";
          echo "<td id='spin_bank".$room_row['id']."'>".$room_row['spin_bank']."</td>
		      <td width=50>
            <a href='#chBalForm' onclick=\"bank_id='".$room_row['id']."';bank_type='spin_bank';$('#chBalForm input[name=trend]').val('plus');$('#chBalForm').modal('show');return false;\"><i class='glyphicon glyphicon-plus-sign'></i></a>
            <a href='#chBalForm' onclick=\"bank_id='".$room_row['id']."';bank_type='spin_bank';$('#chBalForm input[name=trend]').val('minus');$('#chBalForm').modal('show');return false; \"><i class='glyphicon glyphicon-minus-sign'></i></a>
          </td>";
          echo "<td id='bonus_bank".$room_row['id']."'>".$room_row['bonus_bank']."</td>
		      <td width=50>
            <a href='#chBalForm' onclick=\"bank_id='".$room_row['id']."';bank_type='bonus_bank';$('#chBalForm input[name=trend]').val('plus');$('#chBalForm').modal('show');return false;\"><i class='glyphicon glyphicon-plus-sign'></i></a>
            <a href='#chBalForm' onclick=\"bank_id='".$room_row['id']."';bank_type='bonus_bank';$('#chBalForm input[name=trend]').val('minus');$('#chBalForm').modal('show');return false;\"><i class='glyphicon glyphicon-minus-sign'></i></a>
          </td>";
          }
        elseif($room_row['from_bet']==-1)
          $free_bank=array('id'=>$room_row['id'],'val'=>$room_row['spin_bank']);
        elseif($room_row['from_bet']==-2)
          $table_bank=array('id'=>$room_row['id'],'val'=>$room_row['spin_bank']);
        elseif($room_row['from_bet']==-3)
          $loto_bank=array('id'=>$room_row['id'],'val'=>$room_row['spin_bank']);    
        }
       
       //                                                                         
       echo "<tr align='center'>
              <td colspan=2><b>".$lang['adm_game_table1Head_5']."</b></td>
              <td colspan=3><span id='spin_bank".$table_bank['id']."'>".$table_bank['val']."</span></td>
              <td width=36>
                <a href='#' onclick=\"bank_id='".$table_bank['id']."';bank_type='spin_bank';$('#chBalForm input[name=trend]').val('plus');$('#chBalForm').modal('show');return false;\">
                  <i class='glyphicon glyphicon-plus-sign'></i>
                </a>
                <a href='#' onclick=\"bank_id='".$table_bank['id']."';bank_type='spin_bank';$('#chBalForm input[name=trend]').val('minus');$('#chBalForm').modal('show');return false;\">
                  <i class='glyphicon glyphicon-minus-sign'></i>
                </a>
              </td>
            </tr>"; 
        
       if(isset($free_bank))
          {
       //                                                                          
       echo "<tr align='center'>
              <td colspan=2><b>".$lang['adm_game_table1Head_7']."</b></td>
              <td colspan=3><span id='spin_bank".$free_bank['id']."'><b>".$free_bank['val']."</b></span></td>
              <td width=36>
                <a href='#' onclick=\"bank_id='".$free_bank['id']."';bank_type='spin_bank';$('#chBalForm input[name=trend]').val('plus');$('#chBalForm').modal('show');return false;\">
                  <i class='glyphicon glyphicon-plus-sign'></i>
                </a>
              </td>
            </tr>"; 
          }
       }
        
      }
    ?>

                                            </tbody>
											
                                        </table>                                         
                                        
                                    </div>
                                </div> 
                            </div>                                
                        </div>

<?php 

$sql="select sum(payin) from users where status>4 and room_id=$room";
$pay_in=mysql_result(mysql_query($sql),0);

echo "
<div class='row'> 
                            <div class='col-md-12'>                                
                                <div class='block'>
                                    <ul class='boxes one nmt'>
                                        <li>$pay_in <span>".$lang['adm_game_title2']."</span></li>                                        
                                    </ul>
                                </div>
							</div>
</div>
";
 }
 else
 {
 print "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_19']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>
 ";
 }
?> 

<script type='text/javascript' src='js/select2/select2.min.js'></script>
                        
<?php 

$cats_tmp=$db->get_all("select * from game_cat t1 join game_cat_rel t2 on (t1.href=t2.cat_href) where lang='$language' and pos between 1 and 98 order by g_id");
foreach($cats_tmp as $cat)
  {
  $cats[$cat['g_id']][$cat['cat_href']]=$cat['name'];
  }                        
  
 
$res= mysql_query("SELECT * from game_group where gr_id>1 order by position ");
while ($row=mysql_fetch_array($res))
  {
  $game_group[$row['gr_id']]=$row['gr_name'];
  }

foreach ($game_group as $gr_id=>$gr_name)
  {
  $sql="SELECT * FROM game_settings where gr_id=$gr_id and room_id=$room";
  $sql.=" ORDER BY g_id ASC";
  
  $result	= mysql_query($sql);
  if (mysql_num_rows($result)>0) //                                             
    {
      //                                                  
      
      $sql="select * from garant where room_id=$room and gr_id=$gr_id";
      $garant_row=@mysql_fetch_assoc(mysql_query($sql)); 
      if($garant_row)
        {
        ?> 
        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2><?=$lang['adm_game_title3']?> <?=$gr_name?></h2>
                                    </div>
									<form action="?a=game" method="post">
                      <input type="hidden" name="action" value="editgarant">
                      <input type="hidden" name="group" value="<?=$gr_id?>">
                                    <div class="content np">                                        
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_game_table3Head_1']?>:</strong></div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" maxlength="5000" name="gwin" value="<?=$garant_row['garant_win']?>"/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_game_table3Head_2']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" maxlength="5000" name="gbon" value="<?=$garant_row['garant_bon']?>"/>
                                            </div>
                                        </div>
						
                                    </div>
									
                                    <div class="footer">
                                        <div class="side fr">
											<input class="btn btn-primary" type="submit" value="    " name="submit" id="submit" />
                                        </div>
                                    </div> 									
								    </form>	
                                </div>

                            </div>
							
                        </div>
      
<?php      
      }
?>    
    <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2><?=$lang['adm_game_title4']?> <?=$gr_name?></h2>                                       
                                    </div>
                                    <div class="content np">
                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" class="checkall"/></th>                                                    
                                                    <th ><?=$lang['adm_game_name']?></th>
                                                    <th><?=$lang['cats']?></th>
                                                    <th ><?=$lang['adm_game_reels']?></th>
                                                    <th ><?=$lang['adm_game_lines']?></th>
                                                    <th ><?=$lang['adm_game_bonus']?></th>
                                                    <th ><?=$lang['adm_game_freespins']?></th>
                                                    <th ><?=$lang['adm_game_double']?></th>
                                                    <th ><?=$lang['adm_game_in']?></th>
                                                    <th ><?=$lang['adm_game_out']?></th>
                                                    <th ><?=$lang['adm_game_total']?></th>
                                                    <th  colspan="4"><?=$lang['adm_game_action']?></th>
                                                </tr>
                                            </thead>
                                            <tbody>
<?php 
	while($row = mysql_fetch_assoc($result))
      {
      $g_id		= $row['g_id'];
      $g_name	= $row['g_name'];
      $g_title= $row['g_title']? $row['g_title'] : $row['g_name'];
      
      $view=$row['g_view'];
      
      
      print "<tr id='game$g_id'>";
      
       print '<td align=center><input type="checkbox" name="checkbox"/></td>';
       print "<td><span class='label label-inverse'>".$g_title."</span></td>";

       print '<td>';
       if(isset($cats[$g_id]))
          foreach($cats[$g_id] as $cat)
            {
              echo '<div>'.$cat.'</div>';
            }
          
       print '</td>';
      

       print "<td align='center'><span class='label'>".$row['g_reels']."</span></td>
              <td align='center'><span class='label'>".$row['g_lines']."</span></td>
              <td align='center'><span class='label'>".$row['g_bonus']."</span></td>
              <td align='center'><span class='label'>".$row['g_freespins']."</span></td>
              <td align='center'><span class='label'>".$row['g_double']."</span></td>
              <td align='center'><span class='label label-success'>".$row['g_in']."</span></td>
              <td align='center'><span class='label label-danger'>".$row['g_out']."</span></td>
              <td align='center'><span class='label label-warning'>".sprintf('%01.2f',($row['g_in']-$row['g_out']))."</span></td>";
	  
    //                                     
    print "<td align=\"center\"><a href=\"?a=edit_game&id=$g_id\" >";
		  echo "<i class='glyphicon glyphicon-list-alt'></i>";
    print "</a></td>";
    
	  
    print "<td align=\"center\"><a href=\"#\" id='inslider_$g_id' onclick=\"inslider($g_id); return false;\">";
    
    //if($view == 1) 
	if($row['g_inslider'])
		  echo "<i class='glyphicon glyphicon-eye-open'></i>";
	  else 
		  echo "<i class='glyphicon glyphicon-eye-close'></i>";
	 
   print "</a></td>";	  
	  
	  
	  	 	
    print "<td align=\"center\"><a href=\"#\" id='view_$g_id' onclick=\"togle_g_view($g_id); return false;\">";
    
    if($view == 0) {
		  print "<i class='glyphicon glyphicon-lock'></i>";
	 } else {
		  print "<i class='glyphicon glyphicon-check'></i>";
	 }
   print "</a></td>";
   
   //flash        html5
   
    print "<td align=\"center\"><a href=\"#\" id='ver_$g_id' onclick=\"togle_g_ver($g_id); return false;\">";
    
    //if($view == 1) 
	if($row['g_ver'])
		  echo "<span class='success'>HTML</span>";
	  else 
		  echo "<span class='danger'>FLASH</span>";
	 
   print "</a></td>";	  
	 
    
		          
	   print "</tr>";
      }
    echo "</tbody>
											
                                        </table>                                         
                                        
                                    </div>
                                    <div class='footer'>
                                     <div class='side fl'>
                                        <button class='btn btn-warning table_action' type='button'>                                 </button>
                                     </div>
                                    
                                      <div class='side fr'>
                                        <form action='?a=game' method=post>
            <input type='hidden' name='gr_id' value='$gr_id' />
            <input class='btn btn-primary' type=submit name=action value='".$lang['adm_game_off']."' />
            <input class='btn btn-primary' type=submit name=action value='".$lang['adm_game_on']."' />
                                        </form>
                                      </div>  
                                    </div>
                                </div> 
                            </div>
                                                            
                        </div>	";
    }
  }
  
  
$game_cats=$db->get_all("select * from game_cat where lang='$language'");  
?>

    <!-- Bootrstrap modal form [user balance]-->
    <div class="modal fade" id="chBalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title" id="myModalLabel3"><?=$lang['adm_game_title5']?></h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_game_title6']?>:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="sum" value="" class="form-control"/>                        
                                </div>
                            </div>
                                                       
                    <input type=hidden name="trend" />    
                    </div>
                    <!--buttons -->
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_game_title7']?>:
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
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_game_cancel']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->

    <script type='text/javascript' src='js/select2/select2.min.js'></script>

    <!-- Bootrstrap modal form [game_cat]-->
    <div class="modal fade" id="game_catForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form method="post">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title" id="myModalLabel3">                         </h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        
                            <div class="controls-row">
                                <div class="col-md-3">
                                                                       :
                                </div>
                                <div class="col-md-9">
                                    <select name="cats[]" class="select2" style="width: 220px;" multiple="multiple">
                                     <?php
                                      foreach($game_cats as $cat)
            {
              if($cat['pos']>0 && $cat['pos']<99)
                echo '<option value="'.$cat['href'].'">'.$cat['name'].'</option>';
            }
                                     ?> 
                                    </select>                        
                                </div>
                            </div>
                    <input type=hidden name="action" value="edit_cat"/>                                   
                    <input type=hidden name="ids" />
                    </div>
                                      
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit">    </button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_game_cancel']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->

<script>
    
var bank_id;
var bank_type;
$(document).ready(
   function ()
    {
    $(".controls-row input").on("focus", function(){  
    $(this).parents(".controls-row").removeClass('error');
  });
  
  //                                
  $("#chBalForm .buttons button").on('click',function(){
      if($("#chBalForm input[name='trend']").val()=='plus')
        change_bank_balance($(this).html());
      else if ($("#chBalForm input[name='trend']").val()=='minus')
        change_bank_balance($(this).html()*-1);
  });
  $("#chBalForm .submit").on('click',function(){
    if($("#chBalForm input[name='trend']").val()=='plus')
      var sum=$("#chBalForm input[name='sum']").val();
    else if ($("#chBalForm input[name='trend']").val()=='minus')
      var sum=$("#chBalForm input[name='sum']").val()*-1;  
    if (sum!=0)
      {
      change_bank_balance(sum);
      $("#chBalForm").modal('hide');
      }
    else
      $("#chBalForm input[name='sum']").parents(".controls-row").addClass('error');
  });
     
    });
    
function change_bank_balance(suma){
          $.ajax({
				      url: "../engine/ajax/change_bank_balance.php",
				      data: "suma="+suma+"&bank_id="+bank_id+"&type="+bank_type,
				      cache: false,
				      success: function(result)
                {
                arr_result=result.split ('|');
                if (arr_result[0]=='success')
                  { console.log("#"+bank_type+bank_id);
                    $("#"+bank_type+bank_id).text(arr_result[1]);
                    freebank=arr_result[2].split (':');
                    if(freebank[0]!=bank_id)
                      $("#spin_bank"+freebank[0]).text(freebank[1]);
                    Ualert("<?=$lang['adm_msg_20']?> "+arr_result[1],'alert-success');
                  }
                 else  
                  Ualert(result);
                
                }
			        });
         return false;     
        }

//                                                                                                  

function inslider(g_id)
  {
  $.ajax({
				      url: "../engine/ajax/game.php",
				      data: "mod=inslider&act=togle&g_id="+g_id,
				      cache: false,
				      success: function(result)
                {
                arr_result=result.split ('|');
                if (arr_result[0]=='success')
                  {
                    if(arr_result[1]=='1')
                      {$("#inslider_"+g_id).html("<i class='glyphicon glyphicon-eye-open'></i>");
                      Ualert('<?=$lang['adm_msg_21']?> ','alert-success');
                      }
                    else  
                      {$("#inslider_"+g_id).html("<i class='glyphicon glyphicon-eye-close'></i>");
                      Ualert('<?=$lang['adm_msg_22']?>','alert-success');
                      }
                  }
                 else  
                  Ualert(result);
                }
			        });
  }
  
function togle_g_view(g_id)  
  {
  $.ajax({
				      url: "../engine/ajax/game.php",
				      data: "mod=view&act=togle&g_id="+g_id,
				      cache: false,
				      success: function(result)
                {
                arr_result=result.split ('|');
                if (arr_result[0]=='success')
                  {
                    if(arr_result[1]=='1')
                      {$("#view_"+g_id).html("<i class='glyphicon glyphicon-check'></i>");
                      Ualert('<?=$lang['adm_msg_23']?>','alert-success');
                      }
                    else  
                      {
                      $("#view_"+g_id).html("<i class='glyphicon glyphicon-lock'></i>");
                      Ualert('<?=$lang['adm_msg_24']?>','alert-success');
                      }
                  }
                 else  
                  Ualert(result);
                }
			        });
  }  

function togle_g_ver(g_id)  
  {
  $.ajax({
				      url: "../engine/ajax/game.php",
				      data: "mod=ver&act=togle&g_id="+g_id,
				      cache: false,
				      success: function(result)
                {
                arr_result=result.split ('|');
                if (arr_result[0]=='success')
                  {
                    if(arr_result[1]=='1')
                      {$("#ver_"+g_id).html("<span class='success'>HTML</span>");
                      //Ualert('<?=$lang['adm_msg_23']?>','alert-success');
                      }
                    else  
                      {
                      $("#ver_"+g_id).html("<span class='danger'>FLASH</span>");
                      //Ualert('<?=$lang['adm_msg_24']?>','alert-success');
                      }
                  }
                 else  
                  Ualert(result);
                }
			        });
  }
  
$(document).ready(function(){
    $(".table_action").on("click",function(){
    
    var ids= new Array();
    
    $(this).parents('.block').find('input:checkbox:checked').not('.checkall').each(function(){ 
       if($(this).prop("checked"))
        ids[ids.length]= $(this).parents('tr').attr('id').substr(4);
    });
    
    $("#game_catForm input[name=ids]").val(ids);
    
    if(ids.length)
      $("#game_catForm").modal('show');
    
    })
});  
  
</script>