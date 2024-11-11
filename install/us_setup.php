<?php

session_start();

$steps=array("Installation Wizard - GOLDSVET", "License Agreement", "Check of the installed PHP components", "Checking the write access for important system files", "Data for access to MySQL server", "Data for the access to the control panel", "Installation Complete");

$writable_files=array('../engine/dbcfg.php');

$curr_step=isset($_POST['step'])? $_POST['step']: 0;

$po="Casino Management System, GOLDSVET 5.1 - Black Edition";

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
			$error = 'Can\'t connect to the database. Check the username and password';
		if(!@mysql_select_db($dbname))
			$error = "DataBase $dbname does not exist";
		if(!@mysql_query('SET NAMES utf8'))
			$error = 'Can\'t connect to the database. Check the username and password';
		
		if(!is_readable('us_setup.sql'))
			$error = 'File us_setup.sql not found';
			
		if(!isset($error))
		{
			mysqlrestore('us_setup.sql');
      
      $domen=$_SERVER['HTTP_HOST'];
      mysql_query("update settings set val='$domen' where key_name='url'");
			
			
			#                                            
			$config = file_get_contents($configfile);
			$config = preg_replace("/database.*;/i", 'database = "'.$dbname.'";', $config);
			$config = preg_replace("/hostname.*;/i", 'hostname = "'.$dbhost.'";', $config);
			$config = preg_replace("/mysql_login.*;/i", 'mysql_login = "'.$dbuser.'";', $config);
			$config = preg_replace("/mysql_password.*;/i", 'mysql_password = "'.$dbpassword.'";', $config);
			if (@!file_put_contents($configfile, $config))
      	$error="An error occurred when writing the configuration data in $configfile";
		}
	}
  else
    $error="Unable to connect to MySQL server. Enter the correct access data for connecting to MySQL database";  
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
		mysql_query($sql) or $error = 'Error when writing to DataBase '.mysql_error();
		$_SESSION['login']= $_POST['username'];
		}
		else
		$error="Confirm password does not match";
	}
  }
  
if (isset($error))
  $curr_step--;

switch($curr_step)
		{
			
      case 0:
      $content="
		Welcome to the <b>GOLDSVET</b> installation wizard. This wizard will help you install the system in just a few minutes.<br><br>
		Before you begin the installation, please, make sure that all the distribution files was uploaded to the server. Don't forget to set the necessary permissions for folders and files.<br><br>
		Please note that <b>GOLDSVET</b> supports User-Friendly URL, and it requires <b>modrewrite</b> module to be installed and allowed for use.<br><br>
		<font color=\"red\">Attention: when you install the system, the database structure and administrator's account are created, and basic settings are performed, so you need to delete <b>/install/</b> after the successful installation in order to avoid re-installation of the system!</font><br><br>
		Enjoy your work with the system, <b>".$po."</b>";
		  
      break;
      case '2':
      $content="
				
<table class=\"table table-normal table-bordered\">
<tr>
<td width=\"250\">Minimal script requirements</td>
<td colspan=\"2\">Current value</td>
</tr>";

	if( version_compare(phpversion(), '5.6', '<') ) {
		 $status = '<font color=red><b>No</b></font>';
	} else {
		$status = '<font color=green><b>Yes</b></font>';
    }
	
$content.= "<tr>
         <td>PHP ver. 5.6</td>
         <td colspan=2>$status</td>
         </tr>";
	
    $status = function_exists('mysqli_connect') ? '<font color=green><b>Yes</b></font>' : '<font color=red><b>No</b></font>';

$content.= "<tr>
         <td>MySQLi support</td>
         <td colspan=2>$status</td>
         </tr>";

    $status = extension_loaded('xml') ? '<font color=green><b>Yes</b></font>' : '<font color=red><b>No</b></font>';

$content.= "<tr>
         <td>XML support</td>
         <td colspan=2>$status</td>
         </tr>";

    $status = function_exists('mb_convert_encoding') ? '<font color=green><b>Yes</b></font>' : '<font color=red><b>No</b></font>';;

$content.= "<tr>
         <td>Multibyte strings support</td>
         <td colspan=2>$status</td>
         </tr>";
		 
    $status = extension_loaded('gd') ? '<font color=green><b>Yes</b></font>' : '<font color=red><b>No</b></font>';;

$content.= "<tr>
         <td>GD support</td>
         <td colspan=2>$status</td>
         </tr>";
		 
    $status = extension_loaded('ionCube Loader') ? '<font color=green><b>Yes</b></font>' : '<font color=red><b>No</b></font>';;

$content.= "<tr>
         <td>IonCube Loader support</td>
         <td colspan=2>$status</td>
         </tr>";
		 
    $status = extension_loaded('sockets') ? '<font color=green><b>Yes</b></font>' : '<font color=red><b>No</b></font>';;

$content.= "<tr>
         <td>Web Sockets support</td>
         <td colspan=2>$status</td>
         </tr>";
    $status = ($ver = exec('node --version')) ? $ver : '<font color=red><b>Not installed</b></font>';;
$content.= "<tr>
         <td>Node.js version</td>
         <td colspan=2>$status</td>
         </tr>";

$content.= "<tr>
         <td colspan=3><br />If any of these items are highlighted in red, please follow the steps to remedy the situation. In the case of non-compliance with the minimum requirements of the script it can not work properly in the system.<br /><br /></td>
         </tr>";		 

$content.= "</table>";
                        
      break;
      case '1':
      $content="
		Please read carefully and accept before using <b>GOLDSVET</b>.<br /><br />
		<div style=\"height: 300px; border: 1px solid #76774C; background-color: #FDFDD3; padding: 5px; overflow: auto;\">
		<b>1. The subject of the license agreement</b><br /><br />
		The subject of this license agreement (hereinafter Agreement) is the right to use one licensed copy of the software product <b>Casino Management System, GOLDSVET</b> (hereinafter referred to as the Software product), in the manner and on the terms set forth in this Agreement. If you do not agree with the terms of this Agreement, you may not use this Software product. Installing and using the Software constitutes your full agreement with all clauses of this Agreement.<br /><br />
		<b>2. Copyright</b><br /><br />
		<b>2.1.</b> Software product <b>Casino Management System, GOLDSVET</b>, is an intellectual property Dyanin Stanislav Vladimirovich (the copyright holder).<br /><br />
		<b>2.2.</b> the Software product is protected by the Russian law \"On copyright and related rights\", and international treaties.<br /><br />
		<b>2.3.</b> the rights of ownership and copyright are the source codes, texts, images, and other objects of the copyright.<br /><br />
		<b>2.4.</b> In the case of copyright infringement imposes liability in accordance with applicable law.<br /><br />
		<b>3. The scope of the rights granted in this Agreement</b><br /><br />
		<b>3.1.</b> this Agreement grants you the following rights:<br /><br />
		<b>3.1.1.</b> the Right to install and use one copy of the Software product on a single domain name;<br /><br />
		<b>3.1.2.</b> the Right to make a copy of the Software provided that this copy is only for archival purposes and for replacement of a lawfully acquired copy in cases when the original is lost, destroyed or became unsuitable for use. This copy may not be used for other purposes and must be destroyed in case if possession of the copy of Software product will cease to be lawful;<br /><br />
		<b>3.1.3.</b> Right to receive Software product updates via the Internet under the agreement;<br /><br />
		<b>3.1.4.</b> Right to change the design of a Software product in accordance with the needs of your website, but without violating the other terms of this agreement;<br /><br />
		<b>3.1.5.</b> the Right to create applications that interface which will operate successfully with the Software product and which do not affect the source code of the system, specifying that this is your original product.<br /><br />
		<b>3.2.</b> In accordance with the terms of this Agreement you may not:<br /><br />
		<b>3.2.1.</b> Make the modification to the Software product, to use its components in any other products;<br /><br />
		<b>3.2.2.</b> to Transfer the rights granted to you in this Agreement (by rental, lease or transfer for temporary use);<br /><br />
		<b>3.2.3.</b> to Remove or correct in the Software product any signs of the ownership right and copyright on it.<br /><br />
		<b>3.2.4.</b> to Distribute the Software product or individual copies of files, libraries, and other source code of the product;<br /><br />
		<b>3.2.5.</b> to Modify a Software product to work with one set of source files at several Addresses (URLS, domains, subdomains, etc.). Each site requires a separate license;<br /><br />
		<b>3.2.6.</b> Transfer and/or sell the license to a third party without notice of the rights holder.<br /><br />
		<b>3.2.6.1.</b> renewal of the license to a third party, is worth 50% of the cost of the Software product;<br /><br />
		<b>3.3.</b> this Agreement does not grant you any rights in connection with trademarks or names belonging to the Franchisor.<br /><br />
		<b>3.4.</b> this Agreement does not grant the right to receive the new version of the Software product free of charge.<br /><br />
		<b>3.5.</b> In the non-payment of installment in due time (three calendar months), will be subject to a 10% lock-in licensed copies.<br /><br />
		<b>4. The term of the Agreement</b><br /><br />
		<b>4.1.</b> this Agreement and the rights granted to them shall become effective at the time of installation of the product and apply throughout the term of the license.<br /><br />
		<b>4.2.</b> Upon the expiration of Your license to the Software product and in case of its unwillingness to renew You have the right to use the product under this Agreement, but without technical support services.<br /><br />
		<b>4.3.</b> Without prejudice to any other rights the Franchisor may terminate this Agreement if you fail to comply with its terms and restrictions.<br /><br />
		<b>4.4.</b> Upon termination of this Agreement, you must destroy all copies of and components of Software product.<br /><br />
		<b>5. Responsibilities of the parties</b><br /><br />
		<b>5.1.</b> the Rightholder guarantees that the Software will conform to the description given in the documentation.<br /><br />
		<b>5.2.</b> the holder does not bear any responsibility in case of incompatibility of the Software with Your server.<br /><br />
		<b>5.3.</b> the holder is not liable for any damages arising from the use of or inability to use the Software product.<br /><br />
		<b>5.4.</b> For copyright infringement to the Software product the infringer bears civil, administrative or criminal responsibility in accordance with the law.<br /><br />
		<b>5.5.</b> if the user changes the core of the product or the database structure of the Software product, the licensor does not guarantee uninterrupted operation of the program, and the safety kernel.<br /><br />
		<b>5.6.</b> partially open source Software Product, a refund is not provided in this Agreement.<br /><br />
		<b>6. Contents</b><br /><br />
		<b>6.1.</b> Holder <b>Casino Management System, GOLDSVET</b> reserves the right to publish lists of selected customers of their Software products.<br /><br />
		<b>6.1.1.</b> in order to be added to the list of clients, it is necessary that your project meets the following requirements:<br /><br />
		- the copy of the Software must be legally purchased from the copyright holder of the product.<br /><br />
		- your project must be placed logo <b>Casino Management System, GOLDSVET</b>, with a description that it is a licensed copy and a link to the official website of the Software, or the page on the official website with a description of your system.<br /><br />
		- website design must be approved by staff <b>Casino Management System, GOLDSVET</b>, or commissioned from the designers.<br /><br />
		<b>6.1.2.</b> Your site can be published at the discretion of the staff <b>Casino Management System, GOLDSVET</b>, without complying with paragraph 6.1.1., if your project produced a \"turnkey\".<br /><br />
		<b>6.2.</b> Holder <b>Casino Management System, GOLDSVET</b> reserves the right at any time to modify the terms of this license agreement, but these actions have not and will not be retroactive.<br /><br />
        </div>";

      break;
      case 3:
      $content="
<table class=\"table table-normal table-bordered\">

<thead><tr>
<td>Directory/File</td>
<td width=\"100\">CHMOD</td>
<td width=\"100\">Status</td></tr></thead><tbody>";

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
            $file_status = "<font color=red>is not found!</font>";
            $not_found_errors ++;
        }
        elseif(is_writable($file)){
            $file_status = "<font color=green>is permitted</font>";
        }
        else{
            @chmod($file, 0777);
            if(is_writable($file)){
                $file_status = "<font color=green>is permitted</font>";
            }else{
                @chmod("$file", 0755);
                if(is_writable($file)){
                    $file_status = "<font color=green>is permitted</font>";
                }else{
                    $file_status = "<font color=red>is prohibited</font>";
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

    $status_report = 'Checking is successfully completed! You can continue the installation!';

} else {
    
    if($chmod_errors > 0){
        $status_report = "<font color=red>Warning!!!</font><br /><br />The following errors were found during the check: <b>$chmod_errors</b>. It is permitted to write to the file.<br />You must set CHMOD 777 for folders and CHMOD 666 for files using FTP client.<br /><br /><font color=red><b>It is strongly recommended</b></font> not to continue the installation until changes will be done.<br />";
    }

    if($not_found_errors > 0){
        $status_report .= "<font color=red>Warning!!!</font><br />The following errors were found during the check: <b>$not_found_errors</b>. Files not found!<br /><br /><font color=red><b>It is not recommended</b></font> to continue the installation until changes will be done.<br />";
    }
}

$content.= "<tr><td height=\"25\" colspan=3>&nbsp;&nbsp;Check status</td></tr><tr><td style=\"padding: 5px\" colspan=3>$status_report</td></tr>

</tbody></table>";
		  
      break;
      case 4:
      $dbhost =isset($_POST['dbhost'])? $_POST['dbhost']:'localhost';
	  $dbname =isset($_POST['dbname'])? $_POST['dbname']:'';
	  $dbuser =isset($_POST['dbuser'])? $_POST['dbuser']:'';
      $dbpassword =isset($_POST['dbpassword'])? $_POST['dbpassword']:'';
      $content="
<table width=\"100%\">
<tr><td style=\"padding: 5px;\">MySQL Server Host:<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"dbhost\" value=\"$dbhost\"></tr>
<tr><td style=\"padding: 5px;\">Database Name:<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"dbname\" value=\"$dbname\"></tr>
<tr><td style=\"padding: 5px;\">MySQL User Name:<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"dbuser\" value=\"$dbuser\"></tr>
<tr><td style=\"padding: 5px;\">MySQL Password:<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"dbpassword\" value=\"$dbpassword\"></tr>
</table>";

      break;      
      case 5:
      $username=isset($_POST['username'])? $_POST['username']: 'admin';
      $email=isset($_POST['email'])? $_POST['email']:'admin@admin.com';
      $content="
<table width=\"100%\">
<tr><td style=\"padding: 5px;\">Login for Administrator:<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"username\" value=\"$username\"></tr>
<tr><td style=\"padding: 5px;\">Password:<td style=\"padding: 5px;\"><input type=password size=\"28\" name=\"password\" value=\"admin\"> <b>do not</b> forget the password!</tr>
<tr><td style=\"padding: 5px;\">Confirm Your Password:<td style=\"padding: 5px;\"><input type=password size=\"28\" name=\"confirm_password\" value=\"admin\"></tr>
<tr><td style=\"padding: 5px;\">E-mail:<td style=\"padding: 5px;\"><input type=text size=\"28\" name=\"email\" value=\"$email\"></tr>
</table>";

      break;
      case 6:      
      $content=" 
		Congratulations, <b>GOLDSVET</b> has been successfully installed on your server. Now you can go to the <a class=\"status-info\" href=\"/\">Homepage of your website</a> and try the features of the system. Or you can <a class=\"status-info\" href=\"/adm/\">enter</a> the <b>GOLDSVET</b> control panel and change other system settings.<br><br>
		<font color=\"red\">Attention: when you install the system, the database structure and administrator's account are created, and basic system settings are performed, so you need to delete <b>/install/</b> after the successful installation in order to avoid re-installation of the system! <br><br>Please read follow instructions carefully. <br><br>1. Open new cmd or terminal.<br>2. Modify .env file in <b>/games/pragmatic/engine</b> directory.<br>&nbsp;&nbsp;2.1 Change GAME_HOST(127.0.0.1) to real game domain name, example : http://pragmatic.kro.kr:8940. <br>&nbsp;&nbsp;2.2 Change REPLAY_HOST(localhost) to real game replay domain name, example : http://pragmaticreplay.kro.kr:8940.<br>&nbsp;&nbsp;2.3 GAME_HOST and REPLAY_HOST have to be different.<br>&nbsp;&nbsp;2.4 Change MySQL database and port informations.<br>3.Type <b>\"node index.js\"</b> in cmd or terminal.</font><br><br>
		Enjoy your work with the system, <b>".$po."</b>";
  
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
    		 	      echo "<div class='message error'>Error: $error</div><br />";
              if (isset($msg))
                echo "<div class='message'>$msg</div><br />"; 
              print $content?> 
	</div>

           <?php
           if($curr_step+1<count($steps)) {?>
		   <div class='row box-section'>
           <input class='btn btn-green' type="hidden" name="step" value="<?=$curr_step+1?>"/>	 	                    
           <input class='btn btn-green' type='submit' class='button' value='Next' />
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