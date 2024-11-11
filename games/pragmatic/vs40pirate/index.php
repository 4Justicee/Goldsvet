<?php
session_start();
require_once "/../../../engine/cfg.php";

$login = isset($_SESSION['login']) ? $_SESSION['login'] : 0;
$serverURL = 0;
if($login) {
	$email = $_SESSION['email'];
	$token = sha1("user's email:".$email.date("h:i:s"));

	$db->run("update users set token='$token', targetRtp='80' where email='$email'");  
	
	$b = basename($_SERVER['REQUEST_URI']);
	$env_path = ($b == "real") ? "pragmatic/engine/.env" : "../engine/.env";
	$con = file_get_contents($env_path);	
	$host_str = strstr($con, "GAME_HOST=");
	$pos = strpos($host_str, "\n");
	$host_addr=substr($host_str, 10, $pos - 10);
	if($host_addr == "") {
		$_SESSION['messages'][]=array('er',"Can not determine game host address.");
		header("location: /");
		die();
	}
	$serverURL = $host_addr."/game_start.do?mgckey=$token&gameSymbol=vs40pirate"; 
}
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
    <title>Pirate Gold</title>
	<meta charset="UTF-8"/>
	<meta http-equiv="Cache-Control" content="no-transform" />
	<meta http-equiv="expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" />	
	<script src="../../res/jquery.min.js" type="text/javascript"></script>
</head>
<body style='margin:0px;overflow:hidden;' onresize='resizeWindow();'>
<?php if($serverURL) :?>
<iframe style='border:0px;' src='<?php echo $serverURL;?>' id='viewWnd'></iframe>
<?php endif;?>
</body>
<script>
function resizeWindow() {
	var w = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var h = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;
	
	$("#viewWnd").css("width", "100%");
	$("#viewWnd").css("height", (h)+"px");
}
resizeWindow();
</script>
</html>