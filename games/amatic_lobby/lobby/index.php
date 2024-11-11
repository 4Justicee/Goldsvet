<?php
include_once '../../../engine/cfg.php';
include_once '../../../engine/ini.php';


?>

<script type="text/javascript" src="src/jquery-1.10.2.js"></script>
<script type="text/javascript" src="src/jquery-ui.js"></script>
<link href="src/css/bonusstyle.css" rel="stylesheet" type="text/css">
<head><meta charset="utf-8" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">

<title>Amatic </title>
</head>


<script>var sport=<?php echo file_get_contents("http://".$_SERVER['HTTP_HOST'] ."/games/amatic_server/socketport.php");?>;var sserver='ws://'+location.hostname+':'+sport; var isLobby=false;<?php  if(isset($_GET['lobby'])){?>isLobby=true;<?php }?>



var socket = new WebSocket(sserver);
socket.onerror = function(error) {

var xmlhttp = new XMLHttpRequest();

 
xmlhttp.open("GET", "../../amatic_server/dm.php", true);
xmlhttp.send();setTimeout(function(){window.location.reload();},2000);


  
};
</script>
<script type="text/javascript"> 




window.HideAuth = function(){
 $("#myiframe2").hide();
$("#myiframe")[0].contentWindow.location.reload(true);
}
window.ExitMenu = function(){

window.location.reload(true);
}

window.LogOut=function(){
	
var uname=$("#uname").val();	

$.get("../../../api/user.php?action=exit&uname="+uname+"&upass="+uname,window.top.ExitMenu);

	
}

if (screen.width <= 699) { var snd1 = "src/bonus/sounds/bonus.mp3"; var snd2 = "src/jackpot/sounds/jackpotintro.mp3";}else{var snd1 = "src/bonus/sounds/bonus.ogg"; var snd2 = "src/jackpot/sounds/jackpotintro.ogg";}
var alarmsocket=null;function showBonusMsg(){$("#bonusdiv").fadeIn(),$("#bonusinner").effect("bounce",{times:3},1e3),setTimeout(hideBonusMsg,4e3);var e=new Audio(snd1);e.play();}function hideBonusMsg(){$("#bonusdiv").fadeOut(2e3)}function showJackpotWin(e){$("#jpdiv").fadeIn(),$("#jpinner").effect("bounce",{times:3},1e3),$("#jpwin").text(e),setTimeout(hideJackpotWin,7000);var o=new Audio(snd2);o.play()}function hideJackpotWin(){$("#jpdiv").fadeOut(2e3)}function waitForLogin(){""!=sessionStorage.sessionValue2?a_connect():setTimeout(waitForLogin,3e3)}function a_reConnect(){a_connect()}function a_connect(){  var e="ws://136.243.151.199:"+sessionStorage.gamePort+"/alarm";try{ if(alarmsocket==null){alarmsocket=new WebSocket(e),alarmsocket.onopen=function(){alarmsocket.send("A/u90,"+sessionStorage.sessionValue2)},alarmsocket.onmessage=function(e){if("00"==e.data&&(document.getElementById("myiframe").src="browser/"),0===e.data.lastIndexOf("88",0)&&showBonusMsg(),0===e.data.lastIndexOf("77",0)){var o=e.data.split(","),n=o[2];showJackpotWin(n)}"11"==e.data&&(document.getElementById("myiframe").src="browser/"),"12"==e.data&&(document.getElementById("myiframe").src="gameframe.php")},alarmsocket.onclose=function(){setTimeout(a_reConnect,3e3),alarmsocket=null}}}catch(o){message("Error")}}function message(e){console.log(e+"</p>")}sessionStorage.sessionValue2="",alarmsocket=null,$(document).ready(function(){waitForLogin()});
</script>
<body style="margin:0px;">
<div id="gamediv" style="width:100%; height:100%">
<div id="bonusdiv">
    <div id="bonusinner">        
    </div>
</div>
<div id="jpdiv">
    <div id="jpinner">        
	<div id="jpwin">
	100.00
	</div>
    </div>
</div>

<?php if(!isset($_SESSION['login'])){?>
<iframe id="myiframe2" src="auth.php"
        style="border: 0; position:absolute; z-index:5; top:0; left:0; right:0; bottom:0; width:100%; height:100%" allowfullscreen>
</iframe>

<?}?>

<iframe id="myiframe" src="menu.php"
        style="border: 0; position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%" allowfullscreen>
</iframe>

</div>
</body>
<script src="src/hideAddressbar.min.js"></script>
<script>hideAddressbar('#gamediv');</script>
<script type="text/javascript">

$(function() {
        $(this).bind("contextmenu", function(e) {
            e.preventDefault();
        });
    });
</script>


