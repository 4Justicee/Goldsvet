<script type='text/javascript' src='js/colorpicker/colorpicker.js'></script>

                            <div class="row" >                            
                               <div class="col-md-12">
                                 <div class="block">
                                    <div class="head"> 
									                   <h2><?=$lang['settings']?></h2>
                                    </div>
                                    <div class="content np settings">
                                        <div  class="controls-row">
                                            <div class="col-md-3"><?=$lang['vip_rate']?>:</div>
                                            <div class="col-md-9">
                                                <input type="checkbox" class="form-control ibutton" name="use_gamer_raiting"  value="1" <?=$conf['use_gamer_raiting']? "checked='checked'": ''?> />
                                            </div>
                                        </div>
                                        <div  class="controls-row">
                                            <div class="col-md-3"><?=$lang['vip_replenishment']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="points_pay"  value="<?=$conf['points_pay']?>" />
                                            </div>
                                        </div>
                                    </div>
                                 </div>  
                               </div>  
                            </div> 


                            <div class="row">                            
                               <div class="col-md-12">
                                 <div class="block">
                                    <div class="head"> 
									                   <h2><?=$lang['settings_raiting_title']?></h2>
                                        <ul class="buttons">                                    
                                            <li>
                                              <a onclick="showAddRangeForm(); return false;" role="button" href="#addForm">
                                                <span class="i-plus-2"></span>
                                              </a>
                                            </li>
                                        </ul>  
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="gamers_range" class="editable oc_disable">
										
                                            <thead>
                                                <tr>               
                                                  <th><?=$lang['settings_raiting_th1']?></th>                                     
                                                  <th><?=$lang['settings_raiting_th2']?></th>
                                                  <th><?=$lang['settings_raiting_th3']?></th>
                                                  <th><?=$lang['settings_raiting_th4']?></th>
                                                  <th><?=$lang['settings_raiting_th5']?></th>
                                                  <th><?=$lang['settings_raiting_th6']?></th>
                                                  <th>                     </th>
                                                  <th><?=$lang['settings_raiting_th7']?></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            <?php
                                            $sql="select * from users_rate_range where lang='$language'";
                                            $res=mysql_query($sql);
                                            while($row=mysql_fetch_assoc($res))
                                              {
                                              echo "<tr align='center' id='rate".$row['id']."'>
											                                  <td>".$row['level']."</td>
                                                        <td>".$row['name']."</td>
                                                        <td>".$row['range']."</td>
                                                        <td>".$row['color']."</td>
                                                        <td>".$row['pic']."</td>
                                                        <td>".$row['point_cours']."</td>
                                                        <td>".$row['bonus_sum']."</td>
                                                        <td><a href='#' onclick='showEditRangeForm(".$row['id']."); return false;'><i class='glyphicon glyphicon-edit'></i></a></td>
                                                    </tr>";    
                                              }
                                            ?>

                                            </tbody>
                                        </table>
                                    </div>
                                 </div>  
                               </div>  
                            </div>           
                                     
                                     
                                     
<!-- Bootrstrap modal form [user balance]-->
    <div class="modal fade" id="addForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title" id="myModalLabel3"><?=$lang['settings_raiting_add']?></h3>
                </div>
                <div class="modal-body">
                  <form>
                    <input type="hidden" name="action" value="add"/>
                    <input type="hidden" name="id" value=""/>
                    <div class="row">
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['settings_raiting_name']?>:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="name" value="" class="form-control"/>                        
                                </div>
                            </div>
                    </div>
                    
                    <div class="row">
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['settings_raiting_th1']?>:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="level" value="" class="form-control"/>                        
                                </div>
                            </div>
                    </div>
                    
                    <div class="row">
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['settings_raiting_deposit']?>:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="range" value="" class="form-control"/>                        
                                </div>
                            </div>
                    </div>
                    
                    <div class="row">
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['settings_raiting_course']?>:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="point_cours" value="" class="form-control"/>                        
                                </div>
                            </div>
                    </div>
                    
                    <div class="row">
                            <div class="controls-row">
                                <div class="col-md-3">
                                                         
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="bonus_sum" value="" class="form-control"/>                        
                                </div>
                            </div>
                    </div>
					
                    <div class="row">
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['settings_raiting_title']?>:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="title" value="" class="form-control"/>                        
                                </div>
                            </div>
                    </div>
					
                            <div>
                                <div class="col-md-12">
                                  <div class="content np" style="border: solid 1px #c0cad5">
                                    <textarea id="nicEditor" name="description" class="nm nb form-control" style="height: 200px;">
                                    </textarea>           
                                  </div>               
                                </div>
                            </div>
                    
                    <div class="row">
                      <div class="controls-row">
                        <div class="col-md-3"><?=$lang['settings_raiting_color']?>:</div>
                        <div class="col-md-9">
                          <div class="input-group">
                              <span class="input-group-addon">#</span>
                              <input type="text" name="color" class="color form-control">
                          </div>                                                 
                        </div>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="controls-row">
                        <div class="col-md-3"><?=$lang['settings_raiting_pic']?> :</div>
                        <div class="col-md-9">
                              <input type="text" name="pic" class="form-control">
                        </div>
                      </div>
                    </div>
                 </form>                      
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning submit-ajax">    </button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_users_edit_cancel']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    <!-- EOF Bootrstrap modal form -->
    
<script>
function showAddRangeForm()
  {
  $("#addForm .modal-title").html('<?=$lang['settings_raiting_add']?>');
  $("#addForm input[type=text]").val('');
  $("#addForm input[name=action]").val('add');
  
  $('#nicEditor').siblings().css('width','100%');
  $('.nicEdit-main').css('width','100%');
  
  $("#addForm").modal('show');
  }

function showEditRangeForm(id)
  {
  $.get('/engine/ajax/gamer_rating.php?id='+id,function(data){
    //console.log(data.success);
    if(data.success==true)
      {
      $("#addForm .modal-title").html('<?=$lang['settings_raiting_edit']?>');
      $("#addForm input[name=action]").val('edit');
      
      for( var i in data.info)
        {
        $("#addForm input[name="+i+"]").val(data.info[i]);
        }
      
       $("#addForm #nicEditor").html(data.info.description);
       $("#addForm  .nicEdit-main").html(data.info.description);
      
      $("#addForm").modal('show');
      }
  },'json');
  
  $('#nicEditor').siblings().css('width','100%');
  $('.nicEdit-main').css('width','100%');
  
  }  


$(document).ready(function(){
   $("#addForm .submit-ajax").on('click',function(){
   
   $("textarea[name=description]").val($(".nicEdit-main").html());
   
   $.post('/engine/ajax/gamer_rating.php',$("#addForm form").serialize(),function(data){
      if(data.success==true)
        {                                                                                                                                                                                                                                                                              
        if($("#addForm input[name=action]").val()=='add')
      $("#gamers_range tbody").append("<tr id='rate'"+$("#addForm input[name=level]").val()+" align='center'><td>"+$("#addForm input[name=level]").val()+"</td><td>"+$("#addForm input[name=name]").val()+"</td><td>"+$("#addForm input[name=range]").val()+"</td><td>"+$("#addForm input[name=color]").val()+"</td><td>"+$("#addForm input[name=pic]").val()+"</td><td>"+$("#addForm input[name=point_cours]").val()+"</td><td>"+$("#addForm input[name=bonus_sum]").val()+"</td><td><a href='#' onclick='showEditRangeForm("+$("#addForm input[name=id]").val()+"); return false;'><i class='glyphicon glyphicon-edit'></i></a></td></tr>");
        else
          window.location='adm.php?a=gamer_rating';
        $("#addForm").modal('hide');
        }
      else  
        window.location='adm.php?a=gamer_rating';
      },'json');
   
   });
   
  //$("input[name=points_pay]").on('change',function(){
  //var val=this.value;
  //$.get("/engine/ajax/settings.php?key=points_pay&val="+val);
//});

  $(".settings input").on('change',function(){
  el=$(this);
  var key=el.attr('name');
  if(el.attr('type')=='text')
    var val=el.val();
  else if(el.attr('type')=='checkbox')
    var val=el.attr('checked')=='checked'? 1: 0;
  else
    return false;
  
  $.get("/engine/ajax/settings.php?key="+key+"&val="+val);
  });
});
</script>    
                                                  