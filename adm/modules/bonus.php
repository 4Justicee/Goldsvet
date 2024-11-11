<?php

if (@!defined(ENGINE_GOLDSVET))
  {
  header('location: /adm');
  die();
  }
  
$bon_type=isset($_GET['btype'])? $_GET['btype']: 'reg';
$action=isset($_REQUEST['action'])? $_REQUEST['action']: false;

$bon_class_name=$bon_type.'_Bonus';

$bonus=new $bon_class_name;

if($action=='add')
  {
  if(!(isset($_REQUEST['start_date'])&& $_REQUEST['start_date']))
    {
    $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_error_startdate']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>";
?>  
 <script>
 window.location.href='adm.php?a=bonus&btype=<?=$bon_type?>';
 </script>   
 <?php
 die();
    }
  elseif(!(isset($_REQUEST['end_date'])&& $_REQUEST['end_date']))
    {
    $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_error_enddate']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>";
?>  
 <script>
 window.location.href='adm.php?a=bonus&btype=<?=$bon_type?>';
 </script>   
 <?php
 die();
    }  
  elseif($bonus->add()!==false)
    {$_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_bonus']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";  
      ?>  
 <script>
 window.location.href='adm.php?a=bonus&btype=<?=$bon_type?>';
 </script>   
 <?php
 die();
  
    }
  else
    echo $bonus->db->error;
  }
elseif($action=='edit')
  {
  if($bonus->edit()!==false)
    
    {$_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_bonus1']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";  
      ?>  
 <script>
 window.location.href='adm.php?a=bonus&btype=<?=$bon_type?>';
 </script>   
 <?php
 die();
  
    }
  else
    echo $bonus->db->error;
  }
elseif($action=='del')
  {
  if($bonus->remove()!==false)
    {$_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>"."            "."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";  
      ?>  
 <script>
 window.location.href='adm.php?a=bonus&btype=<?=$bon_type?>';
 </script>   
 <?php
 die();
  
    }
  else
    echo $bonus->db->error;
  }

?>

                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2> <?=$lang['bonuses']." ". $lang['bonus_group'][$bon_type]?></h2>
                                       <?php if($bon_type!='reg'){ ?>
                                        <ul class="buttons">                                    
                                            <li><a href="#add_bonus" class="addBonus"><span class="i-plus-2"></span></a></li>
                                        </ul>
                                        <?php } ?>                                        
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                                                                         
                                                    <th><?=$lang['name']?></th>
                                                    <?php if($bon_type=='freespin'){?><th>        </th> <?php } ?>
                                                    <?php if($bon_type!='nondep'){?><th><?=$bon_type=='freespin'?'          ':$lang['min_dep']?></th> <?php } ?>
                                                    <?php if($bon_type!='vip'){?><th> <?=$bon_type!='nondep'? ($bon_type=='freespin'?'            ':$lang['percent']): $lang['sum']?></th><?php } ?>
                                                    <?php if($bon_type!='dep' && $bon_type!='nondep'  && $bon_type!='return'){?><th><?=$bon_type=='freespin'?'          ':$lang['koef']?></th><?php } ?>
                                                    <?php if($bon_type!='nondep' && $bon_type!='vip' && $bon_type!='return'){?><th><?=$bon_type=='freespin'?'          ':$lang['max_bonus']?></th> <?php } ?>
                                                    
                                                    <?php if($bon_type!='vip'  && $bon_type!='return'){?><th><?=$lang['wager']?></th> <?php } ?>
                                                    <?php if($bon_type!='dep'&& $bon_type!='nondep'){?><th><?=$lang['time_life']?></th><?php } ?>
                                                    <th><?=$lang['time_active']?></th>
                                                    <?php if($bon_type!='reg'&& $bon_type!='nondep'){?><th><?=$lang['players']?></th><?php } ?>
                                                    <th><?=$lang['stats']?> <?php if($bon_type=='reg'){echo $lang['nonact'];} echo $lang['act_end'];?></th>
                                                    <th><?=$lang['action']?></th>
                                                </tr>
                                            </thead>
                                              <tbody>											
<?php
foreach($bonus->get_bonuses() as $bon)
  {
  print "<tr data-id='".$bon['id']."'>";
  print "<td>".$bon['name']."</td>";
  if($bon_type=='freespin') print "<td>".$bon['g_title']."</td>";
  if($bon_type!='nondep') print "<td>".$bon['min_deposit']."</td>";
  if($bon_type!='vip') print "<td>".$bon['perc']."</td>";
  
  if($bon_type!='dep' && $bon_type!='nondep' && $bon_type!='return') print "<td>".$bon['koef']."</td>";
  if($bon_type!='nondep' && $bon_type!='vip' && $bon_type!='return') print "<td>".$bon['max_bon']."</td>";
  
  if($bon_type!='vip' && $bon_type!='return') print "<td>".$bon['wager']."</td>";
  if($bon_type!='dep' && $bon_type!='nondep') print "<td>".$bon['live_time']."</td>";
  print "<td>".$bon['activate_time']."</td>";
  if($bon_type!='reg'&& $bon_type!='nondep') print "<td>".$bon['users']."</td>";
  print "<td>";
  if($bon_type=='reg') print "<span class='badge badge-success'>".$bon['noact']."</span>";
  print " <span class='badge badge-info'>".($bon['act']+$bon['ended'])."</span> <span class='badge'>".$bon['ended']."</span></td>";
  print "<td>
            <a href='#' class='editBonus' ><i class='glyphicon glyphicon-edit' style='width: 16px; height: 16px; display: inline-block'></i></a>
            <a class=\"uprompt\" data-prompt-title='              ' data-prompt-text='                          ".$bon['name']."?' href='?a=bonus&btype=".$bon_type."&action=del&id=".$bon['id']."' ><i class='glyphicon glyphicon-remove' style='width: 16px; height: 16px; display: inline-block'></i></a>  
         </td>";
  print "</tr>";
  }
?>                           
                                            </tbody>
											
                                        </table>                                         
                                        
                                    </div>
<?php        if(isset($paginator))
      echo "
          <div class='footer'>
            <div class=\"side fr\">$paginator</div>
          </div>";
          
?>          
                                    
                                </div> 
                            </div>                                
                        </div>
                        

<!-- Bootrstrap modal form -->
    <div class="modal fade" id="bonusForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title"></h3>
                </div>
                <form action="?a=bonus&action=add" method="post" class="validate">
                  <input type="hidden" name="id" value="0"/>
                  <input type="hidden" name="type" value="<?=$bon_type?>"/>
                <div class="modal-body">                                   
                    <div class="row">
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['name']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="name" value="" class="form-control validate[required]"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                     <?=$lang['img']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="pic" value="" class="form-control validate[required]"/>                        
                                </div>
                            </div>
                        <?php if($bon_type=='dep') { ?>
                            <div class="controls-row">   
                                <div class="col-md-3">
                                   <?=$lang['refill_number']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="num_deposit" value="" class="form-control"/>                        
                                </div>
                            </div>
                        <?php } elseif($bon_type=='nondep' || $bon_type=='freespin'){?>
                            <div class="controls-row">   
                                <div class="col-md-3">
                                   <?=$lang['refills']?>
                                </div>
                                <div class="col-md-9">
                                    <select name="num_deposit"  class="form-control">
                                      <option value=0><?=$lang['without_refills']?></option>
                                      <option value=1><?=$lang['with_refills']?></option>
                                    </select>                        
                                </div>
                            </div>
                        <?php } ?>
                        <?php if($bon_type!='nondep') {?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$bon_type!='freespin'? $lang['min_dep'] : $lang['sum']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="min_deposit" value="" class="form-control"/>                        
                                </div>
                            </div>
                        <?php } ?>
                        <?php if($bon_type!='vip'){?>
                            <div class="controls-row">
                                <div class="col-md-3">
                               <?=$bon_type!='nondep' ? $bon_type=='freespin' ? '            ': $lang['percent']: $lang['sum']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="perc" value="" class="form-control"/>                        
                                </div>
                            </div>
                        <?php } ?>    
                        <?php if($bon_type=='reg'||$bon_type=='vip'||$bon_type=='freespin'){?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$bon_type=='freespin'? "          ": $lang['koef']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="koef" value="" class="form-control"/>                        
                                </div>
                            </div>
                        <?php } ?>
                        <?php if($bon_type!='nondep'&& $bon_type!='vip' && $bon_type!='return'){?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$bon_type=='freespin'?"          ":$lang['max_bonus']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="max_bon" value="" class="form-control"/>                        
                                </div>
                            </div>
                        <?php } ?>
                        <?php if($bon_type!='vip'  && $bon_type!='return'){?>    
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['wager']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="wager" value="" class="form-control"/>                        
                                </div>
                            </div>
                        <?php } ?>
                        <?php if($bon_type=='freespin'){ 
                        $game_groups=$db->get_all("select gr_id, gr_name from game_group where gr_id in (2,3,8)");
                        
                        ?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                                       :
                                </div>
                                <div class="col-md-9">
                                    <select name="gr_id" class="form-control"/>
                                      <?php
                                      if($game_groups)
                                        foreach($game_groups as $game_group)
                                          {
                                          echo '<option value="'.$game_group['gr_id'].'">'.$game_group['gr_name'].'</option>';
                                          }
                                      ?>
                                      
                                    </select>                        
                                </div>
                            </div>
                        <?php
                        
                        $games=$db->get_all("select g_id, g_title from game_settings where gr_id=6 and g_view=1");
                        ?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                            :
                                </div>
                                <div class="col-md-9">
                                    <select name="g_id" class="form-control"/>
                                      <?php
                                      if($games)
                                        foreach($games as $game)
                                          {
                                          echo '<option value="'.$game['g_id'].'">'.$game['g_title'].'</option>';
                                          }
                                      ?>
                                      
                                    </select>                        
                                </div>
                            </div>
                        <?php } ?>    
                        <?php if($bon_type!='reg'){ ?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                     <?=$lang['date_start']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="start_date" value="" class="form-control datepicker validate[required]"/>                        
                                </div>
                            </div>
                                <div class="controls-row">
                                <div class="col-md-3">
                                     <?$lang['date_finish']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="end_date" value="" class="form-control datepicker validate[required]"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                     <?=$lang['time_start']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="start_time" value="" class="form-control timepicker"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                     <?=$lang['time_finish']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="end_time" value="" class="form-control timepicker"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                     <?=$lang['repeat']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="checkbox" name="is_loop" value="1" class="form-control ibutton"/>                        
                                </div>
                            </div>
                        <?php } ?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['time_active']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="activate_time" value="" class="form-control"/>                        
                                </div>
                            </div>
                        <?php if($bon_type!='dep' && $bon_type!='nondep' ){ ?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['time_life']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="live_time" value="" class="form-control"/>                        
                                </div>
                            </div>
                        <?php } ?>
                            
                        <?php if($bon_type!='reg' && $bon_type!='nondep' && $bon_type!='freespin') { ?>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['players']?>
                                </div>
                                <div class="col-md-9">
                                    <select name="users" class="form-control">
                                      <option value="0"><?=$lang['players_all']?></option>
                                      <option value="1"><?=$lang['players_old']?></option>
                                      <option value="2"><?=$lang['players_new']?></option>
                                    </select>                        
                                </div>
                            </div>
                        <?php } ?>
                            
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['description']?>
                                </div>
                                <div class="col-md-9">
                                    <textarea name="desc" class="form-control">
                                    </textarea>                        
                                </div>
                            </div>
                    </div>
                                       
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit"><?=$lang['ok']?></button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['cancel']?></button> 
                               
                </div>
                </form>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->

<script type="text/javascript">
$(document).ready(function(){
  $('.addBonus').on('click',function(){
  
    $('#bonusForm form').attr('action', "?a=bonus&btype=<?=$bon_type?>&action=add");
    $('#bonusForm .modal-title').html('<?=$lang['add_bonus']?>');
    $('#bonusForm input').not("[name=type]").not("[type=checkbox]").val("");
    $('#bonusForm textarea').html("");
    
    $('#bonusForm').modal('show');
  });
  
  $('.editBonus').on('click',function(){

    var bonus_id= $(this).parents('tr').data('id');
    
    $.get('/engine/ajax/bonus.php?action=get_info&type=<?=$bon_type?>&id='+bonus_id, function(data){
      $('#bonusForm form').attr('action', "?a=bonus&btype=<?=$bon_type?>&action=edit");
      $('#bonusForm .modal-title').html('<?=$lang['edit_bonus']?>');
      
      for(key in data.bonus)
        {
        if(data.bonus[key]==null)
          $('#bonusForm input[name='+key+']').attr('disabled',true);
        else  
          $('#bonusForm input[name='+key+']').val(data.bonus[key]);
        
        if($('#bonusForm input[name='+key+']').attr('type')=='checkbox')
          {
          console.log (data.bonus[key]);
          if(data.bonus[key]==1)
            $('#bonusForm input[name='+key+']').attr('checked','checked').iButton("repaint");
          }

        $('#bonusForm select[name='+key+']').find('[value='+data.bonus[key]+']').attr("selected", "selected");
        $('#bonusForm textarea[name='+key+']').html(data.bonus[key]);  
        }
      
      $('#bonusForm').modal('show');
      
      //$('#gamersList tbody').empty();
    },'json');
    return false;
    });
    
  $("[name=gr_id]").on("change", function(){
    var gr_id=this.value;
    $.get("/engine/ajax/game_list.php?game_group="+gr_id,function(data){
      if(data.games)
        {
        $("[name=g_id]").empty();
        for(var i in data.games)
          {
          var game=data.games[i];
          $("[name=g_id]").append('<option value="' + game.g_id + '">' + game.g_title + '</option>');
          }
        }
      console.log(data);
    },'json');
  });  
  });
</script>                         