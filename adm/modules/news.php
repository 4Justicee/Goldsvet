<?php

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');
  
if (isset ($_GET['go']) && $_GET['go'] == 'go') {
	$subject	 = trim(htmlspecialchars($_POST['subject']));
	$description = htmlspecialchars($_POST['description']);
	$keywords	 = htmlspecialchars($_POST['keywords']);
    $text		 = $_POST['text'];
  
	if (!$subject) {
		print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_11']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	} elseif (!$text) {
		print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_12']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	} else {

		$now	=  date('d.m.Y');
		$sql	= "INSERT INTO news (subject, lang, msg, date, keywords, description) values ('".$subject."','".$language."', '".$text."','".$now."', '".$keywords."', '".$description."')";
		$result	= mysql_query($sql);

		print "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_26']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";

	}
}
//                            
if(isset($_GET['action']) && $_GET['action'] == "del") {

	$id = isset($_GET['id'])? $_GET['id']:false;

	if($id) {
		$sql="DELETE FROM news WHERE id = ".$id." LIMIT 1";
		if (mysql_query($sql))
		  {
      if (mysql_affected_rows()>0)
        echo "                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_27']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
  
      }
    else
      print "                          
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	} 

}
//                                  
?>

                        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2><?=$lang['adm_news_title']?></h2>
                                    </div>
									<form action="?a=news&go=go" method="post">
                                    <div class="content np">                                        

                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_news_tableHead_1']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="subject" maxlength="150" value=""/>
                                            </div>
                                        </div>									
                                        <div class="controls-row">
                                            <textarea id="clEditor" class="nm nb form-control" name="text"></textarea>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_news_tableHead_2']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="keywords" maxlength="500" value=""/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_news_tableHead_3']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="description" maxlength="500" value=""/>
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
function show_topics ($id, $subj, $msg, $date, $status)
{
global $page_name,$lang;
	$text = substr($msg, 0, 10000);
	$text = substr($text, 0, 10000);
	
                        print "<div class='row'>

                            <div class='col-md-12'>
                                <div class='block'>
                                    <div class='head'>";
                                        print "<h2>".$date." - ".$subj."</h2>";
                                        print "<div class='side fr'>";
	if ($status == 1 || $status == 2)
	{
		print " <a href=\"/adm/adm.php?a=edit_news&id=".$id."\"><i class='glyphicon glyphicon-edit'></i></a> ";
		print "<a style=\"cursor: pointer;\" onclick=\"delNews($id)\"; /><i class='glyphicon glyphicon-remove-sign'></i></a>";
	}
                                        print "</div>                                        
                                    </div>";
                                                print "<div class='content'>".$text."</div>";
                                            print "</div>                                       
                                    </div>                                    
                                </div>";	
}

function topics_list($page, $num, $status)
{
global $language;
 	$query	= "SELECT * FROM news where lang='$language' order by id DESC";
	$result	= pager($query,$paginator);
	$themes = mysql_num_rows($result);
	
	while ($row = mysql_fetch_array($result))
	{
		show_topics($row['id'], $row['subject'], $row['msg'], $row['date'], $status);
	}
  if($paginator)
      echo "
          <div class='row'>
          <div class='col-md-12'>
          <div class='block'>
            <div class=\"side fr\">$paginator</div>
          </div>
          </div>
          </div>";

}

$page = isset($_GET['page']) ? intval($_GET['page']): false;
topics_list($page, $num, 1);

?>

<!-- Bootrstrap modal -->    
    <div class="modal fade" id="delNews" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title" id="myModalLabel2"><?=$lang['adm_news_modalTitle']?></h3>
                </div>
                <div class="modal-body">
                    <p><?=$lang['adm_news_modalBody']?></p>
                </div>
                <div class="modal-footer">
                    <a href="" class="btn btn-warning yes" ><?=$lang['adm_news_yes']?></a> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['adm_news_no']?></button>            
                </div>                
            </div>
        </div>
    </div>    
    
    <!-- EOF Bootrstrap modal --> 

<script>
function delNews(news_id)
  {
  $("#delNews .modal-title").html("<?=$lang['adm_news_modalTitle']?>");
  $("#delNews .modal-body p").html("<?=$lang['adm_news_modalBody']?>");
  $("#delNews .yes").attr("href","?a=news&id="+news_id+"&action=del");
  $("#delNews").modal('show');
  }
</script>							