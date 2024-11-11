<?php

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');
  
  
$action=isset($_REQUEST['action'])? $_REQUEST['action'] : false;

if($action=='send')
  {
  $subj=isset($_REQUEST['subject'])? $_REQUEST['subject'] : false;
  $text=isset($_REQUEST['text'])? $_REQUEST['text'] : false;
  if($subj && $text)
    {
    $sql="insert into mailing_text values (null,'$subj','$text')";
    mysql_query($sql) or save_log($sql."\r\n".mysql_error(), "db_error.log");
    if($mail_id=mysql_insert_id())
      {
      $sql="insert into mailing select null, id, $mail_id, 0, null from users where status=5";
      mysql_query($sql) or save_log($sql."\r\n".mysql_error(), "db_error.log");
      }
    }
  else
    {
    $_SESSION['message'][]= "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_25']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	";
    }
  print "<script>  location.href='?a=mailing';</script>";
  exit();
  }
if($action=='del')
  {
  $mail_id=intval($_REQUEST['mail_id']);
  if($db->run("delete mailing, mailing_text from mailing join mailing_text using (mail_id) where mail_id=$mail_id"))
    {
    print "<script>  location.href='?a=mailing';</script>";
    exit();
    }
  else
    echo mysql_error();  
  }   

?>
                        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2><?=$lang['adm_mailing_title']?></h2>
                                    </div>
									<form action="?a=mailing&action=send" method="post">
                                    <div class="content np">                                        
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_mailing_tableHead_1']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="subject" maxlength="50" value=""/>
                                            </div>
                                        </div>									
                                        <div class="controls-row">
                                            <textarea id="clEditor" class="nm nb form-control" name="text"></textarea>
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
						
                        <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
									<h2><?=$lang['adm_mailing_title1']?></h2>                                       
                                    </div>
                                    <div class="content np">

                                        <table cellpadding="0" cellspacing="0" width="100%" id="addRowExample" class="editable oc_disable">
										
                                            <thead>
                                                <tr>                                                    
                                                    <th width="30%"><?=$lang['adm_mailing_table1Head_1']?></th> 
                                                    <th width="30%"><?=$lang['adm_mailing_table1Head_2']?></th>	
                                                    <th width="30%"><?=$lang['adm_mailing_table1Head_3']?></th>													
                                                    <th width="10%"><?=$lang['adm_mailing_table1Head_4']?></th>
                                                </tr>
                                        </thead>
                                            <tbody>	
<?php
$sql="SELECT count(*), sum(if(status=1,1,0)), max(date_time), subj,mail_id FROM mailing join mailing_text using (mail_id) group by mail_id";
$res=pager($sql,$paginator);
if($res && mysql_num_rows($res)>0 )
  {

  while ($row=mysql_fetch_array($res))
    {
    echo "<tr align='center'>";
    echo "<td>".$row['subj']."</td>";
    echo "<td>".$row[2]."</td>";
    echo "<td>".$row[0]." / ".$row[1]."</td>";
    echo "<td><a href='?a=mailing&action=del&mail_id=".$row['mail_id']."'><i class='glyphicon glyphicon-remove-sign'></i></a></td>";
    echo "</tr>";
    }
  }
else
  echo "<tr><td align='center' colspan='4'>".$lang['adm_mailing_noMsg']."</td></tr>";  
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
