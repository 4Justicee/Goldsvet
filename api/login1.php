<?php session_start();

$API_URL = "http://4win4.eu/api/userb.php";
$BASE_DIR = "";
$MICROBANK = "0";

function validateUser($name,$pass)
{
    session_regenerate_id ();
    $_SESSION['valid'] = 1;
    $_SESSION['username'] = $name;
    $_SESSION['password'] = $pass;
		$_SESSION['session'] = $session;
		$_SESSION['base_dir'] = $BASE_DIR;
		$_SESSION['microbank'] = $MICROBANK;
		$_SESSION['login'] = $name;
		$_SESSION['ts'] = date("Y-m-d H:i:s");
}

$username = $_GET['User-Name'];
$password = $_GET['Password'];

$url = $API_URL . '?action=acc_info&uname=' . $username . '&upass=' . $password ;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true );
curl_setopt($ch, CURLOPT_ENCODING, "gzip,deflate");     
$response = curl_exec($ch);
curl_close($ch);
if (isset($response) && !empty($response)){
	validateUser($username,$password);
	echo "ok";
}else {
	echo "dead";
}



?>