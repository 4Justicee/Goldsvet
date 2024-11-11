<?php 
if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

//                                                                  


if ($status==1|| $status==4)
{
  if(isset($_GET['action']))
    {
    if ($_GET['action']=='generate')
    {
    @$count=intval($_POST['count_pin']);
    @$nominal=intval($_POST['pin_nominal']);
    $pin_type=isset($_POST['pin_type']) ? intval($_POST['pin_type']): false;
    
    if ($count&& $nominal)
      {
      
      if($pin_type==1)
        {
      $sql="select login from enter where paysys='pin' and status=0";
      $res=mysql_query($sql);
      if (mysql_num_rows($res)>0)
        {
        while ($row=mysql_fetch_row($res))
          $db_pins[]=$row[0];
        }
      else
        $db_pins=array();
      
      $pins=array();    
      
        for ($i=1;$i<=$count;$i++)
          {
          $pin=generator('off','off','on','off',10);
          if (in_array($pin,$db_pins) or in_array($pin,$pins))
            $i--;
          else
           $pins[]=$pin;
          }
        $sql="insert into enter (login, sum, date, status, paysys, returned, inv_code) values (";
        foreach ($pins as $pin)
          {
          $ar_sql[]= "'$pin', $nominal, UNIX_TIMESTAMP(), 1, 'pin', if((select is_return from rooms where id=$room),0,2),'".($pin)."'";
          } 
        $sql.=implode('),(',$ar_sql).")";
      
    } 
  
  if (mysql_query($sql))
        $_SESSION['message'][]="                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_28']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		"; 
      else 
        $_SESSION['message'][]="                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
    
      }                            
    else 
      $_SESSION['message'][]="                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_29']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
    }
?> 
  
 <script>
 window.location.href='adm.php?a=pin';
 </script>   

 <?php
 
 die();
    }
?>

                        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2><?=$lang['adm_pin_title']?></h2>
                                    </div>
									<form action="adm.php?a=pin&action=generate" method="post">
                                    <div class="content np">                                        
                                        <div  class="controls-row">
                                            <div class="col-md-3">                       -        :</div>
                                            <div class="col-md-9">
                                                <input type="checkbox" class="form-control ibutton" name="pin_use"  value="true" <?=$conf['pin_use']?'checked=checked':''?>/>
                                            </div>
                                        </div>
                                        <div  class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_pin_tableHead_1']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="count_pin" maxlength="1000" value=""/>
                                            </div>
                                        </div>
                                        
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_pin_tableHead_2']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="pin_nominal" maxlength="12" value=""/>
                                            </div>
                                        </div>											
										
                                        <input type="hidden" name="pin_type" value="0">
                                        		
                                    </div>
									
                                    <div class="footer">
                                        <div class="side fr">
											<input class="btn btn-primary" type="submit" onclick="$('input[name=pin_type]').val(parseInt(pinIndex)+1);" value="<?=$lang['adm_pin_btn_1']?>" name="submit" id="submit" />
                                        </div>
                                    </div> 
									
								    </form>	
                                </div>

                            </div>
							
                        </div> 


                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									     <h2><?=$lang['adm_pin_title2']?></h2> 
                                       <div class="side fr">
                                          <form action="get_pin.php" target="blank" method=get onsubmit="setTimeout(function(){window.location.reload()}, 2000);" >
                                          <input type="hidden" value="get" name="action">                     
                                          <input class="btn btn-primary" type="submit" value="<?=$lang['adm_pin_btn_2']?>" name="submit" id="submit" />
                                          </form>
                                       </div>                   
                                    </div>
                                    
                                    <div class="content np tabs-custom tabs-head">                       

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th><?=$lang['adm_pin_table2Head_1']?></th> 
                                                    <th><?=$lang['adm_pin_table2Head_2']?></th>	
                                                    <th><?=$lang['adm_pin_table2Head_3']?></th>
                                                    <th><?=$lang['adm_pin_table2Head_4']?></th>
                                                </tr>
                                        </thead>
                                            <tbody>	
<?php 
  $sql="select * from enter where paysys='pin' and status<2";
  $result=pager($sql,$paginator);
  if($result && mysql_num_rows($result)>0)
    {
    while ($row=mysql_fetch_assoc($result))
      {
      echo "<tr align='center'>";
      echo "<td>".$row['login']."</td>
            <td>".$row['sum']."</td>
            <td>".date("Y-m-d",$row['date'])."</td>";
      echo "<td>";
      switch ($row['status'])
        {
        case 0: 
          echo $lang['adm_pin_status1'];
          break;
        case 1:
          echo $lang['adm_pin_status2'];
          break;
        }
      echo "</td>";
      echo "</tr>";
      }   
    }
else
  echo "<tr><td align='center' colspan='4'>".$lang['adm_pin_noPin']."</td></tr>"; 
  
?>
                                            </tbody>
											
                                          </table>

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

<script>
var pinIndex=0;
$(document).ready(function(){
	
//pinIndex=parseInt(oldIndex)? oldIndex : 0;

console.log($("input[name=pin_use]"));

$("input[name=pin_use]").on('change',function(){
  var pin_use=this.checked;
  $.get("/engine/ajax/settings.php?key=pin_use&val="+pin_use);
});
   
});
</script>