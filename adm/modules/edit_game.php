<?php


if (@!defined(ENGINE_GOLDSVET))
  {
  header('location: /adm');
  die();
  }
  
$id=isset($_REQUEST['id'])? intval($_REQUEST['id']): false;

if(!$id)  
  {
  header('location: /adm?a=game');
  die();
  }
  
$game=mysql_fetch_assoc(mysql_query("select * from game_settings where g_id=$id limit 1"));

if(mysql_num_rows($res=mysql_query("select * from game_page where g_id=$id limit 1")))
  {
  $game_page=mysql_fetch_assoc($res);
  }
else  
  $game_page=array();

$g_title=isset($game_page['title'])?$game_page['title']: '';
$g_description=isset($game_page['description'])?$game_page['description']: '';
$g_keywords=isset($game_page['keywords'])?$game_page['keywords']: '';
$g_text= isset($game_page['txt'])?$game_page['txt']: ''; 


$action = isset($_GET['action']) ? $_GET['action'] : false;

if ($action == "save") {

  if(count($game_page))
    {
	if($g_title!=$_POST['title'])
    {
    $set[]="title='".$_POST['title']."'";
    }
  if($g_description!=$_POST['description'])
    {
    $set[]="description='".$_POST['description']."'";
    }
  if($g_keywords!=$_POST['keywords'])
    {
    $set[]="keywords='".$_POST['keywords']."'";
    }
  if($g_text!=$_POST['text'])
    {
    $set[]="txt='".$_POST['text']."'";
    }
    
  if(isset($set))
    $sql="update game_page set ".implode(',',$set)." where g_id=$id";  
    }
  else
    {
    $sql="insert into game_page values ($id,'".$_POST['title']."','".$_POST['description']."','".$_POST['keywords']."','".$_POST['text']."')";
    }
  
  $g_title=$_POST['title'];
  $g_description=$_POST['description'];
  $g_keywords=$_POST['keywords'];
  $g_text=$_POST['text'];
    
  if (isset($sql)&& mysql_query($sql))
    print "<div class='col-md-12'>
          <div class='alert alert-success'>
          <center><strong>                               <strong></center>
          <button class='close' data-dismiss='alert' type='button'>  </button>
          </div>
          </div>	";    
	}

$game=mysql_fetch_assoc(mysql_query("select * from game_settings where g_id=$id limit 1"));

if(mysql_num_rows($res=mysql_query("select * from game_page where g_id=$id limit 1")))
  {
  $game_page=mysql_fetch_assoc($res);
  }
else  
  $game_page=array();

?>

                        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2><?=$lang['adm_edit_game_title']." - [ ".$game['g_title']." ]"?></h2>
                                    </div>
									<form action="?a=edit_game&action=save" method="post">
                    <input type="hidden" name="id" value="<?=$id?>">
                                    <div class="content np">                                        
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_game_tableHead_1']?>: </div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="title" maxlength="150" value="<?=$g_title?>"/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_game_tableHead_2']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="description" maxlength="500" value="<?=$g_description; ?>"/>
                                            </div>
                                        </div>
                                        <div class="controls-row">
                                            <div class="col-md-3"><?=$lang['adm_edit_game_tableHead_3']?>:</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="keywords" maxlength="500" value="<?=$g_keywords; ?>"/>
                                            </div>
                                        </div>										
                                        <div class="controls-row">
                                            <textarea id="clEditor" class="nm nb form-control" name="text"><?=$g_text; ?></textarea>
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
