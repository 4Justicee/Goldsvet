<?php

if (@!defined('ENGINE_GOLDSVET'))
  header('location: /adm');
$action = isset($_GET['action'])? $_GET['action']: false;
if ($action=='save') 
  {
  $subj=strip_tags ($_POST['subj']);
  $body= strip_tags ($_POST['body'],'<strong>, <b>, <p>, <br>, <br />');
  $id=intval($_GET['id']);
  $mail_lang=in_array($_POST['lang'],$available_langs) ? $_POST['lang']: 'ru';
  if ($subj && $body)
    {
    if (mysql_query("insert into mail_tmp values ($id, '$mail_lang', '".$lang['adm_email_title'.$id]."', '$subj', '$body') on duplicate key update subj='$subj', body='$body'"))
      echo "                           
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>".$lang['adm_msg_13']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
    else
      echo "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_14'].": ".$sql."\r\n".mysql_error()."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	  
	  ";
    }
  else  
    echo "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>".$lang['adm_msg_1']."</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>	
	";
  }
$res= mysql_query($sq3="SELECT distinct(id) from mail_tmp where lang='$language' order by id");
while ($row=mysql_fetch_array($res))
  {
  $title=isset($lang['adm_email_title'.$row['id']])? $lang['adm_email_title'.$row['id']]: $row['title'];
    
    echo '
                        <div class="row">

                            <div class="col-md-12">

                                <div class="block">
                                    <div class="head">
                                        <h2>'.$title.'</h2>
                                    </div>';
      $row1=mysql_fetch_assoc(mysql_query("select * from mail_tmp where id=".$row['id']." and lang='$language'"));  
    echo '                                
									<form action="?a=email&action=save&id='.$row['id'].'" method="post">
                  <input type="hidden" name="lang" value="'.$language.'" />
                                    <div class="content np">                                        

                                        <div class="controls-row">
                                            <div class="col-md-3">'.$lang['adm_email_title'].':</div>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" name="subj" maxlength="150" value="'.$row1['subj'].'"/>
                                            </div>
                                        </div>';
                
                   echo '               <div class="controls-row">                                            
                                            <textarea class="nm nb form-control clEditor" style="width: 100%" name="body">'.$row1['body'].'</textarea>
                                        </div>';
                if($conf['mail_text_type']==1)
                  {
                    $style=!file_exists(THEME_DIR.'/email/'.$mail_byID[$row['id']].'_'.$language.'.tpl') ? "style='color: red'" : "";
                    
                  echo '               <div class="controls-row"> 
                                          <div class="col-md-3">                         :</div>
                                          <div class="col-md-9" '.$style.'>'.THEME_DIR.'/email/'.$mail_byID[$row['id']].'_'.$language.'.tpl</div>                                           
                                        </div>';
                  }                        										
                   echo '           </div>
									
                                    <div class="footer">
                                        <div class="side fr">
											<input class="btn btn-primary" type="submit" value="    " name="submit" id="submit" />
                                        </div>
                                    </div> 
									
								    </form>	
                                 
  ';
  echo '</div>

                            </div>
							
                        </div>';
  }
  
?>