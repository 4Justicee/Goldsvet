<?php
include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';


?>


<head>
    <title>Menu</title>
	<meta charset="UTF-8"/>
	<script>var sport=<?php echo file_get_contents("http://".$_SERVER['HTTP_HOST'] ."/games/amatic_server/socketport.php");?>;var sserver='ws://'+location.hostname+':'+sport; 
	float_bet=true;	
var isFloat=<?php echo $conf['float_bet']?>;
if(isFloat==0){
	console.log(isFloat);
float_bet=false;	
}
</script>
	<meta http-equiv="Cache-Control" content="no-transform" />
	<meta http-equiv="expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" />
	<meta name="mobile-web-app-capable" content="yes"/>
 	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-title" content="Amatic"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="msapplication-TileImage" content="images/800_600/icon.png"/>
   	<meta name="msapplication-TileColor" content="#0a58c1"/>
	<link rel="manifest" href="manifest.json">
   	<link rel="shortcut icon" href="images/800_600/favicon.ico"/>
	<link rel="shortcut icon" sizes="192x192" href="images/800_600/icon192.png"/>
   	<link rel="apple-touch-icon-precomposed" href="images/800_600/icon152.png"/>
	<link media="screen" href="fixed.css" type= "text/css" rel="stylesheet"/>
	<link rel="stylesheet" href="style/addtohomescreen.css"/>
	<script type="application/javascript" src="src/addtohomescreen-min.js" charset="utf-8"></script>
	<script type="text/javascript">
		var ath = addToHomescreen({
			startDelay: 5,          
			displayPace: 1440,
			lifespan: 8000,
			detectHomescreen: true
		});
	</script>
</head>	
</head>
<body>
    <div id="gameArea">
		<canvas id="canvas"></canvas>
	</div>
	<script id='js_loader' type='text/javascript'  src='src/mobileloader_00292972.js'></script></body>
</html>