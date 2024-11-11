<?php

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

$id = intval($_GET['id']);

if (isset($_GET['go']) && $_GET['go'] == "go") {
	$subject		= htmlspecialchars($_POST['subject']);
	$text			= $_POST['text'];
	$keywords		= htmlspecialchars($_POST['keywords'], ENT_QUOTES);
	$description	= htmlspecialchars($_POST['description'], ENT_QUOTES);
	
	if (!$subject) { print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_11']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	"; }
	elseif(!$text) { print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_12']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	"; }
	else {
		$sql = "UPDATE news SET subject = '".$subject."', msg = '".$text."', keywords = '".$keywords."', description = '".$description."' WHERE id = ".$id." LIMIT 1";
		$result = mysql_query($sql);

		print "                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_10']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
		
	}
}

$get_news		= "SELECT * FROM news WHERE id = ".$id." LIMIT 1";
$query_result	= mysql_query($get_news);
$row			= mysql_fetch_array($query_result);
$subject		= $row['subject'];
$text			= $row['msg'];
$keywords		= $row['keywords'];
$description	= $row['description'];
?>

                        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2><?=$lang['adm_edit_news_title']?></h2>
                                    </div>
									<form action="?a=edit_news&id=<?php print $id; ?>&go=go" method="post">
                                    <div class="content np">                                        

                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_news_tableHead_1']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="subject" maxlength="150" value="<?php print $subject; ?>"/>
                                            </div>
                                        </div>									
                                        <div class="controls-row">
                                            <textarea id="clEditor" class="nm nb form-control" name="text"><?php print $text; ?></textarea>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_news_tableHead_2']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="keywords" maxlength="500" value="<?php print $keywords; ?>"/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_news_tableHead_3']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="description" maxlength="500" value="<?php print $description; ?>"/>
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