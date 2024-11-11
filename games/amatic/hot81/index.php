<!DOCTYPE HTML>
<html lang="en">
<head>
    <title>Hot 81</title>
	<meta charset="UTF-8"/>
	<meta http-equiv="Cache-Control" content="no-transform" />
	<meta http-equiv="expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" />
	<link media="screen" href="fixed.css" type= "text/css" rel="stylesheet" />
	<script src="src/webgl-2d.js" type="text/javascript"></script>
</head>
<script> var sport=<?php echo file_get_contents("http://".$_SERVER['HTTP_HOST'] ."/games/amatic_server/socketport.php");?>;var sserver='ws://'+location.hostname+':'+sport; var isLobby=false;<?php  if(isset($_GET['lobby'])){?>isLobby=true;<?php } ?>var float_bet=true;	var isFloat=<?php error_reporting(0);include_once '../../../engine/cfg.php';include_once '../../../engine/ini.php';echo $conf['float_bet'];?>;if(isFloat==0){float_bet=false;	}

var socket = new WebSocket(sserver);
socket.onerror = function(error) {

var xmlhttp = new XMLHttpRequest();

 
xmlhttp.open("GET", "../../amatic_server/dm.php", true);
xmlhttp.send();setTimeout(function(){window.location.reload();},5000);

  
};
</script>
<body>
    <div id="gameArea">
		<canvas id="canvas2"></canvas>
		<canvas id="canvas"></canvas>
	</div>
	<div id="slideUpOverlay">
		<div id="slideUp">
		</div>
	</div>
	<div id="rotateOverlay">
		<div id="rotatePanel">
			<div id="rotate">
			</div>
			<div id="rotateInfo">
			</div>
		</div>
	</div>
	<script type="text/javascript" src="src/hot81loader_00255223.js"></script>
</body>
</html>