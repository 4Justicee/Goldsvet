<?php

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

$action=isset($_REQUEST['action'])? $_REQUEST['action']: false;

if($action=='add')
  {
  $name= isset($_REQUEST['name'])?$db->prepare($_REQUEST['name']): false;
  $href=isset($_REQUEST['href'])?$db->prepare($_REQUEST['href']): false;
  $parent=isset($_REQUEST['parent'])?$db->prepare($_REQUEST['parent'],1): 0;
  $pos=isset($_REQUEST['pos'])?$db->prepare($_REQUEST['pos'],1): 1;
  
  $err=false;
  if(!$name)
    {
    $err="                          ";
    }
  elseif(!$href && ($pos>0 && $pos<99))
    {
    $err="                  URL";
    }
  else
    {
    
    $game_cats=$db->get_all("select * from game_cat where lang='$language'",'pos');
    
    if($pos==0 && isset($game_cats[0]))
      $err="                                         -      ";
    elseif($pos==99 && isset($game_cats[99]))
      $err="                                                       ";
    else{
      foreach($available_langs as $avail_lang)
        {
        $parent_= $avail_lang==$language ? $parent: $db->get_one($sql="select id from game_cat where lang='$avail_lang' and href=(select href from game_cat where id=$parent)");
        if($parent_)
          {
          if(!$db->run("insert into game_cat values (null,$pos,'$name','$avail_lang','$href',$parent_,'1')"))
          $err=$db->error;
          }
        }
      if(!$err)
      $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>                                     </strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";} 
    }
    
    if($err)
      {
      $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$err."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	"; 
      } 
      ?>  
 <script>
 window.location.href='adm.php?a=game_cat';
 </script>   
 <?php
 die();
  
  }
elseif($action=='edit')
  {
  $cat_id=$db->prepare($_REQUEST['id']);
  
  $name= isset($_REQUEST['name'])?$db->prepare($_REQUEST['name']): false;
  $href=isset($_REQUEST['href'])?$db->prepare($_REQUEST['href']): false;
  $parent=isset($_REQUEST['parent'])?$db->prepare($_REQUEST['parent'],1): 0;
  $pos=isset($_REQUEST['pos'])?$db->prepare($_REQUEST['pos'],1): 1;
  
  $err=false;
  if(!$cat_id)
    {
    $err="                  ID";
    }
  if(!$name)
    {
    $err="                          ";
    }
  elseif(!$href && ($pos>0 && $pos<99))
    {
    $err="                  URL";
    }  
  else
    {
    $cat_row=$db->get_row("select * from game_cat where id='$cat_id'");
    
    if($cat_row['name']!=$name)
      {
      $set[]="name='$name'";
      }
    if($cat_row['href']!=$href &&($pos>0 && $pos<99))
      {
      $set[]="href='$href'";
      }  
    if($cat_row['parent']!=$parent)
      {
      $set[]="parent='$parent'";
      }
    if($cat_row['pos']>0 && $cat_row['pos']<99 && $cat_row['pos']!=$pos)  
      {
      $set[]="POS='$pos'";
      }
    if(isset($set))
      {
      if($db->run("update game_cat set ".implode(',',$set)." where id='$cat_id'"))
        {$_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>                                   </strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";     }
      }
    
    }
  
  
    if($err)
      {
      $_SESSION['message'][]= "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$err."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
	";
      }
      
      ?>  
 <script>
 window.location.href='adm.php?a=game_cat';
 </script>   
 <?php
 die();
  
   
  }  
elseif(isset($_GET['action'])&&$_GET['action']='del')
  {
  $cat_href = $db->prepare($_REQUEST['href']);
	if(!$cat_href) {
		$_SESSION['message'][]=  "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>                                      </strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	} else {
		$db->run("delete from game_cat_rel where cat_href='$cat_href'");
		$db->run("delete from game_cat where href='$cat_href'");
		$_SESSION['message'][]=  "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>                                 </strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
		";
	}
  
  ?>  
 <script>
 window.location.href='adm.php?a=game_cat';
 </script>   
 <?php
 die();
  }
?>

                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2><?=$lang['cat_game']?></h2>
                                        <ul class="buttons">                                    
                                            <li><a href="#" onclick="add_cat()"><span class="i-plus-2"></span></a></li>
                                        </ul>                                        
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th width="40%"><?=$lang['name']?></th>
                                                    <th width="10%"><?=$lang['position_menu']?></th> 
                                                    <th width="40%">URL</th>													
                                                    <th width="10%"><?=$lang['action']?></th>
                                                </tr>
                                            </thead>
                                              <tbody>											
<?php
$cats=$db->get_all("SELECT *, if(parent=0,id*1000,parent*1000+id) as ordering FROM `game_cat` WHERE lang='$language' order by ordering");
$first_cat=current($cats)['id'];
if($cats)
  {
  foreach($cats as $cat)
    {
    print "<tr id='".$cat['id']."' data-parent='".$cat['parent']."'>";
    print "<td class='name'><span class='badge";
    if($cat['parent']==0)
      print " badge-success";
    print "'>".$cat['name']."</span></td>";
      print "<td class='pos'>".$cat['pos']."</td>";
//    elseif  ($cat['href']== '/')
  //    print "<td class='href'> games".$cat['href']."</td>";
    //else
      print "<td class='href'> ".$cat['href']."</td>";
    print "<td align='center'>
            <a href=\"http://$url/".$cat['href']."\" target=\"_blank\"><i class='glyphicon glyphicon-share'></i></a>	
            <a href='#' class='editCat' ><i class='glyphicon glyphicon-edit' style='width: 16px; height: 16px; display: inline-block'></i></a>
            
            ";
      if($cat['pos']>0&&$cat['pos']<99 && $cat['href']!='game')
        {      
    print   "<a href='#' class='delCat' ><i class='glyphicon glyphicon-remove' style='width: 16px; height: 16px; display: inline-block'></i></a>";
    if($cat['view'])
      print   "<a href='#' class='closeCat' ><i class='glyphicon glyphicon-eye-open' style='width: 16px; height: 16px; display: inline-block'></i></a>";
    else
      print   "<a href='#' class='openCat' ><i class='glyphicon glyphicon-eye-close' style='width: 16px; height: 16px; display: inline-block'></i></a>";
        }    
    print  "</td>";
    print "</tr>";
    }
  }
else    
  {
    print "<tr>";
    print "<td colspan=3>                         </td>";
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
                        
<script>
function add_cat()
  {
  $('#catForm form').attr('action', "?a=game_cat&action=add");
  $('#catForm .modal-title').html('<?=$lang['add_cat']?>');
  $('#catForm input[type=text]').val('');
  //$('#catForm select :nth-child(2)').attr("selected", "selected");
  $('#catForm input[name=href]').val('games/');
  $('#catForm').modal('show');
  }

  $(document).ready(function(){
    $('.editCat').on('click',function(){
    //                                              
    var cat_id= $(this).parents('tr').attr('id');
    var cat_name= $(this).parents('tr').find('.name span').html();
    var cat_href= $(this).parents('tr').find('.href').html().trim();
    var cat_parent= $(this).parents('tr').data('parent');
    var cat_pos= $(this).parents('tr').find('.pos').html();
    
      $('#catForm form').attr('action', "?a=game_cat&action=edit");
      $('#catForm .modal-title').html('<?=$lang['edit_cat']?>');
      if($('#catForm input[name=id]').length>0)
         $('#catForm input[name=id]').val(cat_id);
      else   
        $('#catForm form').append("<input type=hidden name=id value="+cat_id+">");
        
      $('#catForm input[name=name]').val(cat_name);
      $('#catForm input[name=href]').val(cat_href);
      $('#catForm input[name=pos]').val(cat_pos);
      if(cat_pos==0|| cat_pos==99||cat_href=='game')
        {
        $('#catForm input[name=pos]').prop('disabled',true);
        $('#catForm input[name=href]').prop('disabled',true);
        $('#catForm select').prop('disabled',true); 
        }
      else
        {
        $('#catForm input[name=pos]').prop('disabled',false); 
        $('#catForm input[name=href]').prop('disabled',false);
        $('#catForm select').prop('disabled',false);
        }
         
      $('#catForm option').removeAttr("selected");
      $('#catForm select [value="'+cat_parent+'"]').attr("selected", "selected");
      $('#catForm').modal('show');
  });
  
    $('.delCat').on('click',function(){
    //                                              
    var cat_href= $(this).parents('tr').find('.href').html().trim();
    location.href='adm.php?a=game_cat&action=del&href='+cat_href;
    });
    
    $('.openCat').on('click',function(){
    var cat_id= $(this).parents('tr').attr('id');
    el=$(this);
    $.get('/engine/ajax/game_cat.php?action=on&cat_id='+cat_id,function(data){
      if(data.result=='ok')
        el.removeClass('openCat').addClass('closeCat').find('i').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
      },'json');
    });
    
    $('.closeCat').on('click',function(){
    var cat_id= $(this).parents('tr').attr('id');
    el=$(this);
    $.get('/engine/ajax/game_cat.php?action=off&cat_id='+cat_id,function(data){
      if(data.result=='ok')
        el.removeClass('closeCat').addClass('openCat').find('i').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');

      },'json');
    });
 });
</script>

<!-- Bootrstrap modal form [edit user]-->
    <div class="modal fade" id="catForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
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
                                    <?=$lang['position_menu']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="pos" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['name']?>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="name" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    URL
                                </div>
                                <div class="col-md-9">
                                    <input type="text" name="href" value="" class="form-control"/>                        
                                </div>
                            </div>
                            <div class="controls-row">
                                <div class="col-md-3">
                                    <?=$lang['main_category']?>
                                </div>
                                <div class="col-md-9">
                                    <select name="parent" class="form-control"/>
                                      <option value="0"><?=$lang['select_value']?></option>
                                    <?php
                                    foreach($cats as $cat)
                                      {
                                      if($cat['parent']==0)
                                        {
                                        echo "<option value='".$cat['id']."'>".$cat['name']."</option>";
                                        }
                                      }
                                    ?>  
                                    </select>                        
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
                        