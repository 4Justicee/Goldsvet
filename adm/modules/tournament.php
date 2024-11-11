<?php 
if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

//                                                                  


if ($status==1)
{
require_once('../engine/inc/tournament_class.php');

$action=isset($_REQUEST['action'])? $_REQUEST['action']: false;

if($action=='add')
  {
  $tour= new Tournament();
  if($tour->create($_REQUEST))
    {
    $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_55']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";  
      ?>  
 <script>
 window.location.href='adm.php?a=tournament';
 </script>   
 <?php
 die();
  
    }
  else
    echo "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$tour->error."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";   
    
  }
elseif($action=='edit')
  {
  $tour_id=$_REQUEST['id'];
  $tour= new Tournament($tour_id);
  if($tour->edit($_REQUEST))
    {$_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_56']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";  
      ?>  
 <script>
 window.location.href='adm.php?a=tournament';
 </script>   
 <?php
 die();
  
    }
  else
    echo $tour->db->error;
  }  

  
?>
<script type='text/javascript' src='js/multiselect/jquery.multi-select.js'></script>
<style>
.tab{ display: none}
</style>
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									                     <h2><?=$lang['adm_tournament_title1']?></h2>
                                       <ul class="buttons">                                    
                                            <li><a href="#" onclick="add_tour(); return false;"><span class="i-plus-2"></span></a></li>
                                       </ul> 
                                    </div>
                                    
                                    <div class="content np tabs-custom tabs-head">

                                        <ul style="margin-right: 40px;">
                                            <li><a href="#tour-tab1"><?=$lang['adm_tournament_tab1']?></a></li>
                                            <li><a href="#tour-tab2"><?=$lang['adm_tournament_tab2']?></a></li>
                                        </ul>                        

                                        <div id="tour-tab1" class="tab">
                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th><?=$lang['adm_tournament_table1Head_1']?></th> 
                                                    <th><?=$lang['adm_tournament_table1Head_2']?></th>	
                                                    <th><?=$lang['adm_tournament_table1Head_3']?></th>
                                                    <th><?=$lang['adm_tournament_table1Head_4']?></th>
                                                    <th><?=$lang['adm_tournament_table1Head_5']?></th>
                                                    <th><?=$lang['adm_tournament_table1Head_6']?></th>
                                                </tr>
                                        </thead>
                                            <tbody>	
<?php 
  $sql="select * from tournaments where status=0 order by end_time";
  $result=pager($sql,$paginator);
  if($result && mysql_num_rows($result)>0)
    {
    while ($row=mysql_fetch_assoc($result))
      {
      echo "<tr align='center' id='tour".$row['id']."'>";
      echo "<td>".$row['name']."</td>
            <td>".$row['end_time']."</td>
            <td>".$row['start_time']."</td>
            <td>".$lang['adm_tournament_type_'.$row['type']]."</td>
            <td>".$row['prizes_sum']."</td>";
      echo "<td>";
      if($row['mailing_status']==0) echo "<a href='#' class='mailTour' ><i class='glyphicon glyphicon-envelope' style='width: 16px; height: 16px; display: inline-block'></i></a>";
      echo   "<a href='#' class='gamersList' ><i class='glyphicon glyphicon-align-justify' style='width: 16px; height: 16px; display: inline-block'></i></a>
              <a href='#' class='editTour' ><i class='glyphicon glyphicon-edit' style='width: 16px; height: 16px; display: inline-block'></i></a>
            </td></tr>";
      }   
    }
else
  echo "<tr><td align='center' colspan='6'>".$lang['adm_tournament_noData']."</td></tr>"; 
  
?>
                                            </tbody>
											
                                          </table> 
                                        </div>                        

                                        <div id="tour-tab2" class="tab">
                                            <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                  
                                                    <th><?=$lang['adm_tournament_table2Head_id']?></th>
                                                    <th><?=$lang['adm_tournament_table2Head_1']?></th> 
                                                    <th><?=$lang['adm_tournament_table2Head_2']?></th>	
                                                    <th><?=$lang['adm_tournament_table2Head_3']?></th>
                                                    <th><?=$lang['adm_tournament_table2Head_4']?></th>
                                                    <th><?=$lang['adm_tournament_table2Head_5']?></th>
                                                    <th><?=$lang['adm_tournament_table2Head_6']?></th>
                                                </tr>
                                        </thead>
                                            <tbody>	
<?php 
  $sql="select * from tournaments where status=1 order by end_time";
  $result=pager($sql,$paginator_scratch);
  if($result && mysql_num_rows($result)>0)
    {
    while ($row=mysql_fetch_assoc($result))
      {
      echo "<tr align='center' id='tour".$row['id']."'>";
      echo "<td>".$row['id']."</td>
            <td>".$row['name']."</td>
            <td>".$row['end_time']."</td>
            <td>".$row['start_time']."</td>
            <td>".$lang['adm_tournament_type_'.$row['type']]."</td>
            <td>".$row['prizes_sum']."</td>";
      echo "<td>
              <a href='#' class='delTour' ><i class='glyphicon glyphicon-remove' style='width: 16px; height: 16px; display: inline-block'></i></a>
            </td></tr>";
      }   
    }
else
  echo "<tr><td align='center' colspan='6'>".$lang['adm_tournament_noData']."</td></tr>"; 
  
?>
                                            </tbody>
											
                                          </table>
                                        </div>

                                    </div>
                                    
<?php        if($paginator)
      echo "
          <div class='footer'>
            <div class=\"side fr\">$paginator</div>
          </div>";
?>          
                                </div> 
                            </div>                                
                        </div>	
<?php 
}
else
  print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_30']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div> 
  ";
?>
<style>
.tab-info {
  display: none;
}
</style>

<script>
$(document).ready(function(){
  //$(".tabs-custom").tabs({cookie:{expires:20}});
    var index = 'key_tab';
    var dataStore = window.sessionStorage;
    try {
        var oldIndex = dataStore.getItem(index);
    } catch(e) {
        var oldIndex = 0;
    }
    pinIndex=oldIndex;
    $('.tab-info:eq('+oldIndex+')').show();
    
    
    $('.tabs-custom').tabs({
        active : oldIndex,
        activate : function( event, ui ){
            var newIndex = ui.newTab.parent().children().index(ui.newTab);
            dataStore.setItem( index, newIndex );
            
            $(ui.oldTab.children().attr('href')+'-info').hide();
            $(ui.newTab.children().attr('href')+'-info').show();
            pinIndex=newIndex;
        }
    }); 
    
  $('#tour_games').multiSelect({ selectableOptgroup: true });
  $('#tournamentForm .btn.add').on('click',function(){
    var val=$(this).parents(".input-group").find("input").val();
    val_arr=val.split(',') || val;
    var prizes=[];
    var element=$(this).parents(".input-group").parent();
    if(val_arr.length>0)
      {
      val_arr.forEach(function(el,index,arr){
       //add_prizeRow(element,el);
       prize_arr=el.split('|');
       if(prize_arr.length==3)
         {
         for(i=0;i<prize_arr[2];i++)
           prizes[prizes.length]=prize_arr[0]+'|'+prize_arr[1];
         }
       else
         prizes[prizes.length]=el;
       
      })
      }
    
    
    prizes.forEach(function(val,index){
    if(index==0)
      {
      element.find("input").val(val);
      }
    else
      element.append('<div class="input-group">'+
                                    '<input name="prize[]" type="text" class="form-control" value="'+val+'"/>'+ 
                                    '<div class="input-group-btn">'+
                                        '<button class="btn btn-default del" type="button"><i class="i-cancel-2"></i></button>'+
                                    '</div>'+ 
                                  '</div>');
    });
    
  }); 
  
  $(document).on('click','#tournamentForm .btn.del',function(){
    $(this).parents(".input-group").remove();
  });   
  $('.gamersList').on('click',function(){
    //                                              
    var tour_id= $(this).parents('tr').attr('id').substr(4);
    
    $.get('/engine/ajax/tournament.php?id='+tour_id, function(data){
      
      $('#gamersList tbody').empty();
      $.each(data.gamers, function(id,val){
        $('#gamersList tbody').append("<tr>"+
                                        "<td>"+(id+1)+"</td>"+
                                        "<td>"+val.user_id+"</td>"+
                                        "<td>"+val.user+"</td>"+
                                        "<td>"+val.result+"</td>"+
                                      "</tr>");
      });
      $('#gamersList').modal('show');
    },'json');
  });
  $('.editTour').on('click',function(){
    //                                              
    var tour_id= $(this).parents('tr').attr('id').substr(4);
    
    $.get('/engine/ajax/tournament.php?action=get_info&id='+tour_id, function(data){
      
      $('#tournamentForm form').attr('action', "?a=tournament&action=edit");
      $('#tournamentForm .modal-title').html('<?=$lang['adm_tournament_popup1_title']?>');
      $('#tournamentForm form').append("<input type=hidden name=id value="+data.tour.info['id']+">");
      $('#tournamentForm input[name=name]').val(data.tour.info['name']);
      $('#tournamentForm input[name=title]').val(data.tour.info['title']);
      $('#tournamentForm input[name=start]').val(data.tour.info['start_time']);
      $('#tournamentForm input[name=end]').val(data.tour.info['end_time']);
      $("#tournamentForm select[name=type] [value='"+data.tour.info['type']+"']").attr("selected", "selected");
      $("#tournamentForm [name='games[]']").parents(".controls-row").hide();//                       
      $("#tournamentForm [name='prize[]']").parents(".controls-row").hide();//                   
      $('#tournamentForm input[name=minstav]').val(data.tour.info['min_stav']);
      $('#tournamentForm input[name=spincount]').val(data.tour.info['spin_count']);
      $('#tournamentForm input[name=botlimit]').val(data.tour.info['bot_limit']);
      $('#tournamentForm input[name=pic]').val(data.tour.info['pic']);
	  $('#tournamentForm input[name=pic_2]').val(data.tour.info['pic_2']);
      $('#tournamentForm .nicEdit-main').html(data.tour.info['txt']);
      $('#tournamentForm textarea[name=txt]').html(data.tour.info['txt']);
      //console.log (data.tour.info['is_loop']);
      if(data.tour.info['is_loop']==1)
        $('#tournamentForm input[name=is_loop]').attr('checked','checked').iButton("repaint");
      else  
        $('#tournamentForm input[name=is_loop]').removeAttr('checked').iButton("repaint");
      $('#tournamentForm').modal('show');
      
      //$('#gamersList tbody').empty();
    },'json');
  });
  
    $('.delTour').on('click',function(){
    //                                              
    var tr=$(this).parents('tr');
    console.log(tr);
    var tour_id= $(this).parents('tr').attr('id').substr(4);
    
    $.get('/engine/ajax/tournament.php?action=del&id='+tour_id, function(data){
      if(data.success==true)
        tr.remove();
          
      //$('#gamersList tbody').empty();
    },'json');
  });
  
  $('.mailTour').on('click',function(){
    //                
    var el=$(this);
    var tr=$(this).parents('tr');
    var tour_id= $(this).parents('tr').attr('id').substr(4);
    
    $.get('/engine/ajax/tournament.php?action=mailing&id='+tour_id, function(data){
      if(data.success==true)
        el.remove();
    },'json');
  });
  
  $('#nicEditor').siblings().css('width','100%');
  $('.nicEdit-main').css('width','100%');
});
function add_tour()
  {
  $('#tournamentForm form').attr('action', "?a=tournament&action=add");
  $('#tournamentForm .modal-title').html('<?=$lang['adm_tournament_popup2_title']?>');
  $('#tournamentForm input[type=text]').val('');
  $('#tournamentForm .nicEdit-main').html('');
  $('#tournamentForm textarea[name=txt]').html('');
  $("#tournamentForm [name='games[]']").parents(".controls-row").show();//                       
  $("#tournamentForm [name='prize[]']").parents(".controls-row").show();//                   
  $('#tournamentForm').modal('show');
  }
  
</script>

<!-- Bootrstrap modal form [edit user]-->
    <div class="modal fade" id="tournamentForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title"></h3>
                </div>
                <form action="?a=tournament&action=add" method="post">
                <div class="modal-body">
                    <div class="row">
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_title']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="title" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_name']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="name" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_start']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="start" value="" class="datetimepicker form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_end']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="end" value="" class="datetimepicker form-control"/>                        
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
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_type']?>
                                </div>
                                <div class="col-md-9">
                                    <select name="type" class="form-control">
                                      <option value="1"><?=$lang['adm_tournament_type_1']?></option>
                                      <option value="2"><?=$lang['adm_tournament_type_2']?></option>
                                      <option value="3"><?=$lang['adm_tournament_type_3']?></option>
                                      <option value="4"><?=$lang['adm_tournament_type_4']?></option>
                                    </select>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_games']?>
                                </div>
                                <div class="col-md-9">
                                    <select id="tour_games" class="form-control" name="games[]" multiple="multiple">
                                     <?php
                                     $sql="select * from game_group where position >0 order by position";
                                     $res=mysql_query($sql);
                                     while($group_row=mysql_fetch_assoc($res))
                                      {
                                      $res1=mysql_query("select g_id, g_name from game_settings where gr_id=".$group_row['gr_id']);
                                      if($res1 && mysql_num_rows($res1)>0)
                                        {
                                        echo '<optgroup label="'.$group_row['gr_name'].'">';
                                        while($game_row=mysql_fetch_assoc($res1))
                                          {
                                          echo '<option value="'.$game_row['g_id'].'">'.$game_row['g_name'].'</option>';
                                          }
                                        }
                                      }
                                     
                                     ?>
                                     </select>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_prizes']?>
                                </div>
                                <div class="col-md-9">
                                  <div class="input-group">
                                    <input name="prize[]" type="text" class="form-control"/> 
                                    <div class="input-group-btn">
                                        <button class="btn btn-default add" type="button"><i class="i-plus-2"></i></button>
                                    </div> 
                                  </div>                      
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_minstav']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="minstav" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_spincount']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="spincount" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_botlimit']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="botlimit" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_pic']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="pic" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['adm_tour_add_banners']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="pic_2" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div>
                                <div class="col-md-12">
                                  <div class="content np" style="border: solid 1px #c0cad5">
                                    <textarea id="nicEditor" name="txt" class="nm nb form-control" style="height: 200px;">
                                    </textarea>           
                                  </div>               
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
    
    <!-- Bootrstrap modal form [gamers_ list]-->
    <div class="modal fade" id="gamersList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title"><?=$lang['adm_tournament_popup3_title']?></h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="block">
                                    
                                    <div class="content np">
                                        
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                            <thead>
                                                <tr>                                    
                                                    <th width="25%"><?=$lang['adm_tournament_popup3_th1']?></th>
                                                    <th width="25%"><?=$lang['adm_tournament_popup3_th2']?></th>
                                                    <th width="25%"><?=$lang['adm_tournament_popup3_th3']?></th>
                                                    <th width="25%"><?=$lang['adm_tournament_popup3_th4']?></th>                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                                             
                                            </tbody>
                                        </table>                                        
                                        
                                    </div>
                                </div>
                    </div>
                                       
                </div>
                </form>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->