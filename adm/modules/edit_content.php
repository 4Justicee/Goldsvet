<?php

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

$f		= $_GET['f'];
$action = isset($_GET['action'])?$_GET['action']:false;
if($action == "add") {

	$title			= htmlspecialchars($_POST['title'], ENT_QUOTES);
	$sub_title		= htmlspecialchars($_POST['sub_title'], ENT_QUOTES);
	$body			= $_POST['body'];
	$keywords		= htmlspecialchars($_POST['keywords'], ENT_QUOTES);
	$description	= htmlspecialchars($_POST['description'], ENT_QUOTES);

	if(!$title) {
		print "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_1']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	} else {

		mysql_query($sql="insert into pages values (null,'$language','$title','$sub_title','$keywords','$description','$f','$f',0,0,0,'$body') on duplicate key UPDATE title = '".$title."', sub_title = '".$sub_title."', body = '".$body."', keywords = '".$keywords."', description = '".$description."'");

     //echo $sql;
			$title			= "";
			$sub_title		= "";
			$body			= "";
			$keywords		= "";
			$description	= "";
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
$get_page_info = mysql_query($sql_p="SELECT * FROM pages WHERE ge = '".$f."' and lang='$language' LIMIT 1");
	//echo $sql_p;
  $row = mysql_fetch_array($get_page_info);
	 $title			= $row['title'];
	 $sub_title		= $row['sub_title'];
	 $keywords		= $row['keywords'];
	 $description	= $row['description'];
	 $body			= stripslashes($row['body']);
	 $type			= $row['type'];
?>

                        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2><?=$lang['adm_edit_content_title']?></h2>
                                    </div>
									<form action="?a=edit_content&f=<?php echo $f; ?>&action=add" method="post">
                                    <div class="content np">                                        
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_content_tableHead_1']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="title" maxlength="150" value="<?php print $title; ?>"/>
                                            </div>
                                        </div>
  <?php
	if($type==0 ||$type==1||$type==2||$type==4) {
	?>  
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_content_tableHead_2']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="sub_title" maxlength="500" value="<?php print $sub_title; ?>"/>
                                            </div>
                                        </div>
  <?php
	}
	if($type==0 || $type==1||$type==4) {
	?>										
                                        <div class="controls-row">
                                            <textarea id="clEditor" class="nm nb form-control" name="body"><?php print $body; ?></textarea>
                                        </div>
	<?php
	}
	?>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_content_tableHead_3']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="keywords" maxlength="500" value="<?php print $keywords; ?>"/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_content_tableHead_4']?>:</div>
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