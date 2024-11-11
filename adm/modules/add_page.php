<?php


if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');

//                                                                        
function sch_special_chars($str)
{
	$spch_check_result = 0;
	$special_chars = array("?",">","<","&","|","+",";",":","'","=","/","\"","$","!","@","#","%","^","*","(",")","   ");
	$str_lenght = strlen($str);
	$i = 0;
	for($i = 0;$i <= $str_lenght;$i++)
	{
		$char_from_str = substr($str,$i,1);
		$check_spch = in_array($char_from_str,$special_chars);
		if($check_spch != false)
		{
 			$spch_check_result = 1;
			break;
		}
	}
if($spch_check_result != 0)
 return 1;
else
 return 0;
}
//                                       

	$folder			= "";
	$title			= "";
	$sub_title		= "";
	$body			= "";
	$keywords		= "";
	$description	= "";
	$lite			= "";

$action = isset($_GET['action']) ? $_GET['action'] : false;
if ($action == "add") {
	$folder			= htmlspecialchars(strtolower($_POST['folder']), ENT_QUOTES);
	$title			= htmlspecialchars($_POST['title'], ENT_QUOTES);
	$sub_title		= htmlspecialchars($_POST['sub_title'], ENT_QUOTES);
	$body			= $_POST['body'];
	$keywords		= htmlspecialchars($_POST['keywords'], ENT_QUOTES);
	$description	= htmlspecialchars($_POST['description'], ENT_QUOTES);
	$type			= 1;
	$view			= 1;

	if(!$folder || !$title) {
		print "                          
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_1']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	}
	elseif(!preg_match("/[0-9a-z]/",$folder)) {
		print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_2']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	}
	elseif(sch_special_chars($folder) != 0) {
		print "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_3']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	}
	elseif(file_exists("../engine/dir/".$folder."/index.php")) {
		print "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_4']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>		
		";
	} else { 
		$old_umask = umask(0);
		if(mkdir("../engine/dir/".$folder, "0755")) {
			umask($old_umask);

			$sql = "INSERT INTO pages (path, GE, title, sub_title, body, keywords, description, type, view) VALUES ('".$folder."','".$folder."', '".$title."', '".$sub_title."', '".$body."', '".$keywords."', '".$description."', ".$view.", ".$view.")";

			mysql_query($sql);
			$lastid	= mysql_insert_id();

			$fn		= "../engine/dir/".$folder."/index.php";
			$fo		= fopen($fn, "a+");
			$fw		= fwrite($fo, "<?php \n\$templ_name='content.tpl';
	                         \n?>");
      fclose($fo);

			if($fw) {

				print "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_5']." <a href=\"http://".$cfgURL."/".$folder."\" target=\"_blank\">".$cfgURL."/".$folder."</a> ".$lang['adm_msg_6']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>				
				";

				$folder			= "";
				$title			= "";
				$sub_title		= "";
				$body			= "";
				$keywords		= "";
				$description	= "";
			} else {
				print "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_7']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>				
				";
				//                          
				rmdir("../".$folder);
				//                                        
				mysql_query("DELETE FROM pages WHERE id = ".$lastid." LIMIT 1");
			}

		} else {
			print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_8']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>			
			";
		}
	}
}
if(!ini_get('safe_mode')) {
?>

                        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2><?=$lang['adm_add_page_title']?></h2>
                                    </div>
									<form action="?a=add_page&action=add" method="post">
                                    <div class="content np">                                        
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_add_page_tableHead_1']?>: <strong>http://<?php print $cfgURL; ?>/</strong></div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="folder" maxlength="50" value="<?php print $folder; ?>"/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_add_page_tableHead_2']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="title" maxlength="150" value="<?php print $title; ?>"/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_add_page_tableHead_3']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="sub_title" maxlength="500" value="<?php print $sub_title; ?>"/>
                                            </div>
                                        </div>										
                                        <div class="controls-row">
                                            <textarea id="clEditor" class="nm nb form-control" name="body"><?php print $body; ?></textarea>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_add_page_tableHead_4']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="keywords" maxlength="500" value="<?php print $keywords; ?>"/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_add_page_tableHead_5']?>:</div>
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
<?php
} else {
	print "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_9']."<strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	";
}
?>