<?php

session_start();

$steps=array("                                -   GOLDSVET   Casino Management System", "                                             ", "                                                                   PHP", "                                                                              ", "                                      MySQL               ", "                                                                       ", "                                     ");

$writable_files=array('../engine/dbcfg.php');

$curr_step=isset($_POST['step'])? $_POST['step']: 0;

$po="  GOLDSVET   Casino Management System";

//                

if ($curr_step==5)
  {
  //                       
    $configfile = '../engine/dbcfg.php';

	$dbhost = 'localhost';
	$dbname = 'db host';
	$dbuser = 'db user';
	$dbpassword = 'db password';
		
	if(isset($_POST['dbhost']))
		$dbhost = addslashes($_POST['dbhost']);
	if(isset($_POST['dbname']))
		$dbname = addslashes($_POST['dbname']);
	if(isset($_POST['dbuser']))
		$dbuser = addslashes($_POST['dbuser']);
	if(isset($_POST['dbpassword']))
		$dbpassword = addslashes($_POST['dbpassword']);

	if(!empty($dbname) && !empty($dbuser)&& !empty($dbhost))
	{
		if(!@mysql_connect($dbhost, $dbuser, $dbpassword))
			$error = '                                                  .                                              ';
		if(!@mysql_select_db($dbname))
			$error = "                      $dbname                          .";
		if(!@mysql_query('SET NAMES utf8'))
			$error = '                                                  .                                              ';
		
		if(!is_readable('ru_setup.sql'))
			$error = '         ru_setup.sql                  ';
			
		if(!isset($error))
		{
			mysqlrestore('ru_setup.sql');
      
      $domen=$_SERVER['HTTP_HOST'];
      mysql_query("update settings set val='$domen' where key_name='url'");
      
      $btc_callback=mysql_result(mysql_query("select val from settings where key_name='btc_callback'"),0);
      $btc_callback=str_replace('your_domain.com',$domen,$btc_callback);
      mysql_query("update settings set val='$btc_callback' where key_name='btc_callback'");
			
			#                                            
			$config = file_get_contents($configfile);
			$config = preg_replace("/database.*;/i", 'database = "'.$dbname.'";', $config);
			$config = preg_replace("/hostname.*;/i", 'hostname = "'.$dbhost.'";', $config);
			$config = preg_replace("/mysql_login.*;/i", 'mysql_login = "'.$dbuser.'";', $config);
			$config = preg_replace("/mysql_password.*;/i", 'mysql_password = "'.$dbpassword.'";', $config);
			if (@!file_put_contents($configfile, $config))
      	$error="                                                                                                     $configfile";
		}
	}
  else
    $error="                                               MySQL                                                          .                                                                                                     MySQL";  
  }
elseif ($curr_step==6)
  {
  include_once ('../engine/cfg.php');
  include_once ('../engine/inc/functions.php');
  
  $_SESSION['base_dir']=realpath(dirname(__FILE__)."/..");	
  
  $domen=get_domen();
  $key_ = gen_key($domen);
    mysql_query("update settings set val='$key_' where key_name='lic_key'");
  	
  if(isset($_POST['username']) && isset($_POST['password']))
	{
	  if($_POST['password']==$_POST['confirm_password'])
	  {
    include_once ('../engine/cfg.php');
    include_once ('../engine/inc/functions.php');
    mysql_query ("delete from users");
    $sql = 'insert into users (id,login,pass,email,balance,status,creator) values (1,"'.$_POST['username'].'", "'.as_md5( $key_, $_POST['password'] ).'","'.$_POST['email'].'",0,1,0)';
		mysql_query($sql) or $error = '                                         '.mysql_error();
		$_SESSION['login']= $_POST['username'];
		}
		else
		$error="                                                               ";
	}
  }
  
if (isset($error))
  $curr_step--;

switch($curr_step)
		{
			
      case 0:
      $content="
		                                                                   <b>  GOLDSVET   Casino Management System</b>.                                                                                                                                  .<br><br>
		                                                                      ,                                                                                       ,                                                                                                                      .<br><br>
		                                                    ,        <b>  GOLDSVET   Casino Management System</b>                                                ,                                          ,                                                     <b>modrewrite</b>                                                                 .<br><br>
		<font color=\"red\">                :                                                                                                     ,                                                               ,                                                                             ,                                                                                         <b>/install/</b>                                                                             !</font><br><br>
		                                                                                      <b>".$po."</b>";
		  
      break;
      case '2':
      $content="
				
<table class=\"table table-normal table-bordered\">
<tr>
<td width=\"250\">                                                          </td>
<td colspan=\"2\">                               </td>
</tr>";

	if( version_compare(phpversion(), '5.6', '<') ) {
		 $status = '<font color=red><b>      </b></font>';
	} else {
		$status = '<font color=green><b>    </b></font>';
    }
	
$content.= "<tr>
         <td>             PHP 5.6</td>
         <td colspan=2>$status</td>
         </tr>";
	
    $status = function_exists('mysqli_connect') ? '<font color=green><b>    </b></font>' : '<font color=red><b>      </b></font>';

$content.= "<tr>
         <td>                   MySQLi</td>
         <td colspan=2>$status</td>
         </tr>";

    $status = extension_loaded('xml') ? '<font color=green><b>    </b></font>' : '<font color=red><b>      </b></font>';

$content.= "<tr>
         <td>                   XML</td>
         <td colspan=2>$status</td>
         </tr>";

    $status = function_exists('mb_convert_encoding') ? '<font color=green><b>    </b></font>' : '<font color=red><b>      </b></font>';;

$content.= "<tr>
         <td>                                                      </td>
         <td colspan=2>$status</td>
         </tr>";
		 
    $status = extension_loaded('gd') ? '<font color=green><b>    </b></font>' : '<font color=red><b>      </b></font>';;

$content.= "<tr>
         <td>                   GD</td>
         <td colspan=2>$status</td>
         </tr>";
		 
    $status = extension_loaded('ionCube Loader') ? '<font color=green><b>    </b></font>' : '<font color=red><b>      </b></font>';;

$content.= "<tr>
         <td>                   IonCube Loader</td>
         <td colspan=2>$status</td>
         </tr>";
		 
    $status = extension_loaded('sockets') ? '<font color=green><b>    </b></font>' : '<font color=red><b>      </b></font>';;

$content.= "<tr>
         <td>                   Web Sockets</td>
         <td colspan=2>$status</td>
         </tr>";

$content.= "<tr>
         <td colspan=3><br />                                                                              ,                                                                                                               .                                                                                                                                                                                    .<br /><br /></td>
         </tr>";		 

$content.= "</table>";
                        
      break;
      case '1':
      $content="
		                    ,                                                                                                                                                     <b>  GOLDSVET   Casino Management System</b>.<br /><br />
		<div style=\"height: 300px; border: 1px solid #76774C; background-color: #FDFDD3; padding: 5px; overflow: auto;\">
		<b>1.                                                               </b><br /><br />
		                                                                                        (                               )                                                                                                                                                 <b>  GOLDSVET   Casino Management System</b>, (                                                ),                                           ,                                                                     .                                                                                              ,                                                                                                   .                                                                                                                                                                                                                              .<br /><br />
		<b>2.                              </b><br /><br />
		<b>2.1.</b>                                       <b>  GOLDSVET   Casino Management System</b>,                                                                                                                                             (                                         ).<br /><br />
		<b>2.2.</b>                                                                                                                                                       ,                                                                .<br /><br />
		<b>2.3.</b>                                                                                                                           ,             ,                                                                                        .<br /><br />
		<b>2.4.</b>                                                                                                                                                                                                                          .<br /><br />
		<b>3.                    ,                                                                         </b><br /><br />
		<b>3.1.</b>                                                                                                        :<br /><br />
		<b>3.1.1.</b>                                                                                                                                                                      ;<br /><br />
		<b>3.1.2.</b>                                                                                                           ,                                                                                                                                                                                                                    ,                                         ,                                                                                          .                                                                                                                                                                   ,                                                                                                                                                ;<br /><br />
		<b>3.1.3.</b>                                                                                                                                                                ;<br /><br />
		<b>3.1.4.</b>                                                                                   ,                                                                      ,                                                                                         ;<br /><br />
		<b>3.1.5.</b>                                                   ,                                                                                                                                                                                                               ,             ,                                                             ;<br /><br />
		<b>3.2.</b>                                                                                                                              :<br /><br />
		<b>3.2.1.</b>                                                                                        ,                                                                   -                                        ;<br /><br />
		<b>3.2.2.</b>                                                        ,                                                                                 (                         ,                                                                                    );<br /><br />
		<b>3.2.3.</b>                                                                                                                                                                                                    ;<br /><br />
		<b>3.2.4.</b>                                                                                                                               ,                                                                                  ;<br /><br />
		<b>3.2.5.</b>                                                                                                                                                                                                          (URL,               ,                     ,      .  .).                                                                                        ;<br /><br />
		<b>3.2.6.</b>                        /                                                                                                                                                                  ;<br /><br />
		<b>3.2.6.1.</b>                                                                         ,            50%                                                                  ;<br /><br />
		<b>3.3.</b>                                                                                                                                                                                   ,                                                          .<br /><br />
		<b>3.4.</b>                                                                                                                                                                                                                          .<br /><br />
		<b>3.5.</b>                                                                                     (                                          ),                                                   10%                                                              .<br /><br />
		<b>4.                                               </b><br /><br />
		<b>4.1.</b>                                                      ,                                    ,                                                                                                                                                                                               .<br /><br />
		<b>4.2.</b>                                                                                                                                                                                                                                                                                                                     ,                                                                 .<br /><br />
		<b>4.3.</b>                               -                                                                                                                                                                                                                                                 .<br /><br />
		<b>4.4.</b>                                                                                                                                                                                                                                                   .<br /><br />
		<b>5.                                            </b><br /><br />
		<b>5.1.</b>                                                      ,                                                                                                                         ,                                           .<br /><br />
		<b>5.2.</b>                                                                                                                                                                                                                     .<br /><br />
		<b>5.3.</b>                                                                                              -                   ,                                                                                                                                                            .<br /><br />
		<b>5.4.</b>                                                                                                                                                      ,                                                                                                                                                            .<br /><br />
		<b>5.5.</b>                ,                                                                                                                                                                   ,                                                                                                                      ,                                                .<br /><br />
		<b>5.6.</b>                                                                                                        ,                                                                                                                .<br /><br />
		<b>6.                     </b><br /><br />
		<b>6.1.</b>                                <b>  GOLDSVET   Casino Management System</b>,                                                                                                                                                                           .<br /><br />
		<b>6.1.1.</b>                ,                                                                ,                     ,                                                                                                      :<br /><br />
		-                                                     ,                                                                                                               .<br /><br />
		-                                                                                      <b>  GOLDSVET   Casino Management System</b>,                      ,                                                                                                                                                   ,                                                                                                               .<br /><br />
		-                                                                                           <b>  GOLDSVET   Casino Management System</b>,                                              .<br /><br />
		<b>6.1.2.</b>                                                                                                             <b>  GOLDSVET   Casino Management System</b>,                                          6.1.1.,                                                                              .<br /><br />
		<b>6.2.</b>                                <b>  GOLDSVET   Casino Management System</b>,                                                                                                                                                                      ,                                                                                                           .<br /><br />
        </div>";

      break;
      case 3:
      $content="
<table class=\"table table-normal table-bordered\">

<thead><tr>
<td>          /        </td>
<td width=\"100\">CHMOD</td>
<td width=\"100\">            </td></tr></thead><tbody>";

$important_files = array(
'../engine/logs',
'../engine/templates_c',
'../engine/cfg.php',
'../engine/dbcfg.php',
'../engine/ini.php',
'../engine/view.php',
);


$chmod_errors = 0;
$not_found_errors = 0;
    foreach($important_files as $file){

        if(!file_exists($file)){
            $file_status = "<font color=red>                 !</font>";
            $not_found_errors ++;
        }
        elseif(is_writable($file)){
            $file_status = "<font color=green>                  </font>";
        }
        else{
            @chmod($file, 0777);
            if(is_writable($file)){
                $file_status = "<font color=green>                  </font>";
            }else{
                @chmod("$file", 0755);
                if(is_writable($file)){
                    $file_status = "<font color=green>                  </font>";
                }else{
                    $file_status = "<font color=red>                  </font>";
                    $chmod_errors ++;
                }
            }
        }
        $chmod_value = @decoct(@fileperms($file)) % 1000;

$content.= "<tr>
         <td>$file</td>
         <td>$chmod_value</td>
         <td>$file_status</td>
         </tr>";
    }
    
if($chmod_errors == 0 and $not_found_errors == 0){

    $status_report = '                                                  !                                                     !';

} else {
    
    if($chmod_errors > 0){
        $status_report = "<font color=red>                !!!</font><br /><br />                                                                  : <b>$chmod_errors</b>.                                            .<br />                                                       CHMOD 777,                     CHMOD 666,                    FTP             .<br /><br /><font color=red><b>                                                        </b></font>                                        ,                                                                   .<br />";
    }

    if($not_found_errors > 0){
        $status_report .= "<font color=red>                !!!</font><br />                                                                  : <b>$not_found_errors</b>.                               !<br /><br /><font color=red><b>                               </b></font>                                        ,                                                                   .<br />";
    }
}

$content.= "<tr><td height=\"25\" colspan=3>&nbsp;&nbsp;                                   </td></tr><tr><td style=\"padding: 5px\" colspan=3>$status_report</td></tr>

</tbody></table>";
		  
      break;
      case 4:
      $dbhost =isset($_POST['dbhost'])? $_POST['dbhost']:'localhost';
	  $dbname =isset($_POST['dbname'])? $_POST['dbname']:'';
	  $dbuser =isset($_POST['dbuser'])? $_POST['dbuser']:'';
      $dbpassword =isset($_POST['dbpassword'])? $_POST['dbpassword']:'';
      $content="
<table width=\"100%\">
<tr><td style=\"padding: 5px;\">             MySQL:<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"dbhost\" value=\"$dbhost\"></tr>
<tr><td style=\"padding: 5px;\">                            :<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"dbname\" value=\"$dbname\"></tr>
<tr><td style=\"padding: 5px;\">                               :<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"dbuser\" value=\"$dbuser\"></tr>
<tr><td style=\"padding: 5px;\">            :<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"dbpassword\" value=\"$dbpassword\"></tr>
</table>";

      break;      
      case 5:
      $username=isset($_POST['username'])? $_POST['username']: 'admin';
      $email=isset($_POST['email'])? $_POST['email']:'admin@admin.com';
      $content="
<table width=\"100%\">
<tr><td style=\"padding: 5px;\">                                   :<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"username\" value=\"$username\"></tr>
<tr><td style=\"padding: 5px;\">            :<td style=\"padding: 5px;\"><input type=password size=\"28\" name=\"password\" value=\"admin\"> <b>    </b>                              !</tr>
<tr><td style=\"padding: 5px;\">                               :<td style=\"padding: 5px;\"><input type=password size=\"28\" name=\"confirm_password\" value=\"admin\"></tr>
<tr><td style=\"padding: 5px;\">E-mail:<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"email\" value=\"$email\"></tr>
</table>";

      break;
      case 6:      
      $content=" 
		                             , <b>  GOLDSVET   Casino Management System</b>                                                                    .                                                               <a class=\"status-info\" href=\"/\">                                        </a>                                                               .                            <a class=\"status-info\" href=\"/adm/\">          </a>                                      <b>  GOLDSVET   Casino Management System</b>                                                                   .<br><br>
		<font color=\"red\">                :                                                                                                     ,                                                               ,                                                                             ,                                                                                         <b>/install/</b>                                                                             !</font><br><br>
		                                                                                      <b>".$po."</b>";
  
    }

?>

<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=0">
  <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
  <title><?=$steps[$curr_step]?></title>
  <link href="css/application.css" media="screen" rel="stylesheet" type="text/css" />
<style type="text/css">
body {
	background: url("images/bg.png");

}
</style>
</head>
<body>
<form action="" method=post>
<div class="container">
<div class="col-md-8 col-md-offset-2">
    <div class="padded">
	<div style="margin-top: 10px;">
<input type="hidden" name="action" value="eula">
<div class="box">
  <div class="box-header">
    <div class="title"><?=$steps[$curr_step]?></div>
  </div>
  <div class="box-content">
	<div class="row box-section">
    		 	    <?php
    		 	    if (isset($error))
    		 	      echo "<div class='message error'>            : $error</div><br />";
              if (isset($msg))
                echo "<div class='message'>$msg</div><br />"; 
              print $content?> 
	</div>

           <?php
           if($curr_step+1<count($steps)) {?>
		   <div class='row box-section'>
           <input class='btn btn-green' type="hidden" name="step" value="<?=$curr_step+1?>"/>	 	                    
           <input class='btn btn-green' type='submit' class='button' value='          ' />
		   </div>
           <?php } ?>
		   
  </div>
</div>
    </div>
    </div>
</div>
</div>
</form>
</body>
</html>


<?php

##################################################################
##################################################################


function mysqlrestore($filename)
{ global $error;
  $templine = '';
  $fp = fopen($filename, 'r');

  // Loop through each line
  if($fp)
  while(!feof($fp)) {
    $line = fgets($fp);
    // Only continue if it's not a comment
    if (substr($line, 0, 2) != '--' && $line != '') {
      // Add this line to the current segment
      $templine .= $line;
      // If it has a semicolon at the end, it's the end of the query
      if (substr(trim($line), -1, 1) == ';') {
        // Perform the query
        mysql_query($templine) or $error='Error performing query \'<b>' . $templine . '</b>\': ' . mysql_error() . '<br /><br />';
        // Reset temp variable to empty
        $templine = '';
      }
    }
  }

  fclose($fp);
}

?>