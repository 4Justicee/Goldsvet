<?php

$game_groups=$db->get_all("select * from game_group where gr_id>1");

      echo '<div class="controls-row">
		              <div class="col-md-4">                   : </div>
		              <div class="col-md-8">
                    <select id=game_group name="game_group" class="form-control"><div class="ibutton-handle" style="left: 56px;">';
      foreach($game_groups as $group)
        echo "<option value='".$group['gr_id']."'>".$group['gr_name']."</option>";              
      echo         '</select>
                  </div>
	           </div>';
?>

<div class="controls-row">
  <div class="col-md-4">Bets: </div>
	<div class="col-md-8">
    <?php
    $bets=$db->get_one($sql="select val from settings where key_name='bets_".($game_groups[0]['gr_id'])."'");
    if(!$bets)
      $bets=implode(',',$adm_bet);
    ?>
    <input id="bets" class="form-control" value="<?=$bets?>" />
  </div>
</div>
<div class="controls-row">
  <div class="col-md-4">Coin value: </div>
	<div class="col-md-8">
    <select id="coinvalue" class="form-control">
      <?php
      foreach($adm_coinvalue as $val)
        {
        if(isset($conf['coinvalue_'.$game_groups[0]['gr_id']])&& $conf['coinvalue_'.$game_groups[0]['gr_id']] == $val)
          echo '<option value="'.$val.'" selected=selected>'.implode(',',explode("_", $val)).'</option>';
        else
          echo '<option value="'.$val.'">'.implode(',',explode("_", $val)).'</option>';  
        }
      ?>
      
    </select>
  </div>
</div>
<style>
.wait{background-color: yellow;}

</style>

<script>
//$(document).ready(get_bet);
$("#game_group").on("change", get_bet);
$("#bets").on("change", set_bet);
$("#coinvalue").on("change", set_bet);

function get_bet()
  {
  var game_group=$("#game_group :selected").val();
  
  $.get("/engine/ajax/adm_bet.php?gr_id="+game_group,function(data){
     if(data['bets'])
      $("#bets").val(data['bets']);
     if(data['coinvalue'])
      $("#coinvalue [value='"+data['coinvalue']+"']").attr("selected", "selected");  
  },'json');
  }

function set_bet(e)
  {
  //console.log(e.target);
  $(e.target).addClass('wait');
  var game_group=$("#game_group :selected").val();
  var key=e.target.id;
  var val=e.target.value;
  $.get("/engine/ajax/adm_bet.php?a=set&gr_id="+game_group+"&key="+key+"&val="+val,function(data){
    $(e.target).removeClass('wait');
  },'json');
  
  }

</script>