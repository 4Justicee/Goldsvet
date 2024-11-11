<!DOCTYPE HTML>
<html lang="en">
<head>
    <title>Book Of Aztec</title>
	<meta charset="UTF-8"/>
	<meta http-equiv="Cache-Control" content="no-transform" />
	<meta http-equiv="expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" />
	<link media="screen" href="fixed.css" type= "text/css" rel="stylesheet" />
	<link href="../../res/fonts.css" type= "text/css" rel="stylesheet" />
	<script src="src/webgl-2d.js" type="text/javascript"></script>
	<script src="../../res/jquery-2.0.3.min.js" type="text/javascript"></script>
</head>

<script> var sport=<?php echo file_get_contents("http://".$_SERVER['HTTP_HOST'] ."/games/amatic_server/socketport.php");?>;var sserver='ws://'+location.hostname+':'+sport; var isLobby=false;<?php  if(isset($_GET['lobby'])){?>isLobby=true;<?php } ?>var float_bet=true;	var isFloat=<?php error_reporting(0);include_once '../../../engine/cfg.php';include_once '../../../engine/ini.php';echo $conf['float_bet'];?>;if(isFloat==0){float_bet=false;	}

var strCurrency="<?php echo $conf['currency'] ?>"; var socket = new WebSocket(sserver);
socket.onerror = function(error) {

var xmlhttp = new XMLHttpRequest();

 
xmlhttp.open("GET", "../../amatic_server/dm.php", true);
xmlhttp.send();setTimeout(function(){window.location.reload();},5000);

  
};

/*--------------------------------------------*/
var isJack=false;
var jackSum=0;

var jackSnd=new Audio();
jackSnd.src="../../res/jack_win.mp3";

var jackSnd2=new Audio();
jackSnd2.src="../../res/addwin.mp3";	

function ShowJack(j_sum){
isJack=true;
$('#jack_wnd').show();
	
jackSnd.play();
	
jackSum=j_sum;
$('#sum_text').text(jackSum);

setTimeout(ShowJack2,5000);

};


function ShowJack2(){
isJack=true;


jackSnd2.play();
	
var sum=jackSum*100;
$('#sum_text').text(sum);
var adw=1;
var dl=0;
var ji=setInterval(function(){

dl++;
if(dl>=4){
adw+=1;	
dl=0;
}
if(sum>adw*100){
fza.lbb.oat+=adw*100;
sum=sum-(adw*100);

fza.lbb.llk(fza.lbb.oat,true);
$('#sum_text').text(""+sum/100);
}else{
fza.lbb.oat+=sum;
sum=0;
fza.lbb.llk(fza.lbb.oat,true);
$('#sum_text').text(""+sum/100);
clearInterval(ji);
isJack=false;	
$('#jack_wnd').hide(); 
 $('#dark').hide();
jackSnd.pause();
jackSnd2.pause();
}

},20);	
	
};




$( window ).resize(function() {
$('#jack_sum').textfill({ maxFontPixels: 100 });	
}
);
$( document ).ready(function() {
	
$('#jack_sum').textfill({ maxFontPixels: 100 });	
$('#jack_wnd').hide(); 
 $('#dark').hide();

});
(function($) {
    $.fn.textfill = function(options) {
        var fontSize = options.maxFontPixels;
        var ourText = $('span:visible:first', this);
        var maxHeight = $(this).height();
        var maxWidth = $(this).width();
        var textHeight;
        var textWidth;
        do {
            ourText.css('font-size', fontSize);
            textHeight = ourText.height();
            textWidth = ourText.width();
            fontSize = fontSize - 1;
        } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
        return this;
    }
})(jQuery);

/*--------------------------------------------*/

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
	<script type="text/javascript" src="src/bookofaztecloader_00395223.js"></script>
</body>
</html>