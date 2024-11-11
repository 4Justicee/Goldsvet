<?php

include "../engine/cfg.php";
include "../engine/ini.php";

$login		 = isset ($_POST['login'])? htmlspecialchars(substr($_POST['login'],0,20), ENT_QUOTES): false;
$password	 = isset ($_POST['pass'])? as_md5($key, $_POST['pass']): false;
$cookies	 = isset ($_POST['coocies'])? htmlspecialchars($_POST['cookies'], ENT_QUOTES): false;

//save_log($login." - ".$password, 'user.log');

if(!$login || !$password || $login == "login") {
	$error = 1;
} else {
	$get_pass = mysql_query("SELECT id, login, pass,status FROM users WHERE login = '".$login."' LIMIT 1")or print(mysql_error());
	$row = mysql_fetch_array($get_pass);
		$id				= $row['id'];
		$login			= $row['login'];
		$user_password	= $row['pass'];
  if($row && !($row['status']==1||$row['status']==4))
    {
    $error=3;
    }
	elseif($user_password != $password) {
		$error = 2;
	} else {

		$_SESSION['login']=$login;
		if($cookies == "yes") {
			$hash = as_md5($key, $user_password.$key.$login);
			setcookie("GOLDSVET1", $id, time() + 604800, "/");
			setcookie("GOLDSVET2", $hash, time() + 604800, "/");
		}
   //                                                   
   //save_auth_log();
	}
}
//var_dump(!isset($error));
if(!isset($error)) {
$ip		= getip();
$time	= time();

$sql_query = "UPDATE users SET 	ip = '".$ip."', go_time = ".$time." WHERE login = '".$login."' LIMIT 1";
mysql_query($sql_query);

$sql = "INSERT INTO logip (user_id, ip, date) VALUES (".$id.", '".$ip."', ".$time.")";
mysql_query($sql);
	header('location: /adm/adm.php');
  die();
} else {
  header('location: /adm/index.php?error='.$error);
  die();
}

?>