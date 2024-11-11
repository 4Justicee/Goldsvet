<?php

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

$view = isset($_GET['view'])? intval($_GET['view']): false;
if($view === 0 || $view === 1) {
	mysql_query("UPDATE pages SET view = ".$view." WHERE id = ".intval($_GET['id'])." LIMIT 1");
}
if(isset($_GET['action'])&&$_GET['action']='del')
  {
  $f = $_GET['f'];
	if(!$f) {
		print "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_pages_msg_1']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	} else {
		@unlink("../engine/dir/".$f."/".$f.".php");
		@unlink("../engine/dir/".$f."/index.php");
		@rmdir("../engine/dir/".$f);
		mysql_query("DELETE FROM pages WHERE path = '".$f."' LIMIT 1");
		print "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_pages_msg_2']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
		";
	}
  }
?>

                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2><?=$lang['adm_pages_title']?></h2>
                                        <ul class="buttons">                                    
                                            <li><a href="adm.php?a=add_page"><span class="i-plus-2"></span></a></li>
                                        </ul>                                        
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th width="45%"><?=$lang['adm_pages_tableHead_1']?></th> 
                                                    <th width="45%"><?=$lang['adm_pages_tableHead_2']?></th>													
                                                    <th width="10%"><?=$lang['adm_pages_tableHead_3']?></th>
                                                </tr>
                                            </thead>
                                              <tbody>											
<?php
$urls_res=mysql_query("select distinct ge from pages where type !=4 ORDER BY id ASC");

while($urls_row = mysql_fetch_array($urls_res))  
  {  
$sql="SELECT id, title, GE, type, view FROM pages WHERE ge='".$urls_row['ge']."' and lang='$language'";
$result=mysql_query($sql);
if($result)
 {
$row=mysql_fetch_assoc($result); 
$id		= $row['id'];
$title	= $row['title'];
$folder	= $urls_row['ge'];
$page	= $row['type'];
$view	= $row['view'];

print "<tr>
	<td>".$title."</td>
	<td>".$urls_row['ge']."</td>
	<td align='center'><a href=\"http://$url/".$urls_row['ge']."\" target=\"_blank\"><i class='glyphicon glyphicon-share'></i></a> 
    <a href=\"?a=edit_content&f=".$folder."\"><i class='glyphicon glyphicon-edit'></i></a> ";
	if($view == 0) {
		print "<a href=\"?a=pages&id=".$id."&view=1\"><i class='glyphicon glyphicon-lock'></i></a> ";
	} else {
		print "<a href=\"?a=pages&id=".$id."&view=0\"><i class='glyphicon glyphicon-check'></i></a> ";
	}
	if($page == 1) {
		print "<a style=\"cursor:pointer\" onclick=\"if(confirm('                                      ,      ?')) top.location.href='?a=pages&action=del&f=".$folder."';\"><i class='glyphicon glyphicon-remove-sign'></i></a>";
	} 
print "</td></td></tr>";

} 
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