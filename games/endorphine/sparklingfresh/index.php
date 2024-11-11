<!DOCTYPE html>
<html class="startup">
    <head>
        <title>Sparkling Fresh</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="">
        <meta name="google" value="notranslate" />
        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1, maximum-scale=1.0, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="msapplication-TileColor" content="#2b5797">
        <meta name="theme-color" content="#001c47">
        <meta name="format-detection" content="telephone=no" />

        <script>
            window.loadTimeStartMs = Date.now();
        </script>
 
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/manifest.json">



        
        <link rel="stylesheet" href="css/game.min.css"/>

    </head>
	
	 <script>
	   localStorage.setItem('endorphinaSettings_SPARKLING FRESH',' {"version":"1.0.17","settings":{"credits":{"showInCash":"left"},"autoplay":{"rounds":{"active":false,"steps":["off",10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,550,600,650,700,750,800,850,900,950,1000],"selectedIndex":0},"timePassed":{"active":false,"steps":["off",5,10,15,20,30,60],"selectedIndex":0},"winExceeds":{"active":false,"steps":["off",5,10,20,50,75,100,200,500,1000],"selectedIndex":0},"balanceDecBy":{"active":false,"steps":["off",10,20,30,40,50,60,70,80,90],"selectedIndex":0},"balanceIncBy":{"active":false,"steps":["off",1.5,2,3,5,10],"selectedIndex":0}},"graphics":{"lefthand":false},"locale":{"language":{"steps":[{"label":"ENGLISH","localizedLabel":"ENGLISH","flag":"menu/flag-uk"}],"selectedIndex":0}},"sound":{"quality":true,"master":{"active":true,"volume":100},"effects":{"active":true,"volume":100},"background":{"active":false,"volume":100}}}}');
	 
	 
	 
	 function GetCookie(cookieName) {
    var re = new RegExp('[; ]'+cookieName+'=([^\\s;]*)');
    var sMatch = (' '+document.cookie).match(re);
    if (cookieName && sMatch) return unescape(sMatch[1]);
}
	 
var sport=<?php echo file_get_contents("http://".$_SERVER['HTTP_HOST'] ."/games/endorphine_server/socketport.php");?>;
	 
	 
  
  var sserver='ws://'+location.hostname+':'+sport;
  var socket = new WebSocket(sserver);
socket.onerror = function(error) {

var xmlhttp = new XMLHttpRequest();

 
xmlhttp.open("GET", "../../endorphine_server/dm.php", true);
xmlhttp.send();setTimeout(function(){window.location.reload();},2000);
}
  </script>
    <body>
        <div id="main-container">
            <div id="canvas-wrap"></div> 
            <div id="rules-container" class="top-level-element"></div>
            <div id="slider-container" class="top-level-element slider-container"></div>
            <div id="html-dynamic-wrap"></div>
            <div id="html-dynamic-wrap-interactive"></div>
            <div id="html-static-wrap">
                <div id="black-div"></div>
                <div id="glass-layer"></div>
                <div id="help-container"></div>
                <div id="preloader"><img src="img/preloader.gif" alt="loading"/></div>
                <div id='dialog'>
                    <p id='dialogText'></p>                  
                    <a id='buttonLeft'></a>
                    <a id='buttonRight'></a>
                    <a id='buttonOk'></a>
                </div>
                <div id="start-button">
                    <span class="localizable" data-id="start"></span>
                </div>
                <div id="progress-bar-wrap">
                    <img id="loading-back" data-src="img/loading-logo.png" alt="" src=""/>
                    <div id="progress-bar-back"></div>
                    <div id="progress-bar-front"></div>
                </div>
                <div id="rotate-overlay">
                    <p data-id="rotate-overlay-text" class="localizable"></p>
                </div>
                <span id="simpleTextMsg"></span>
            </div>
        </div>
        <div id='iphone-scroll-up-pane'>
            <p data-id="scroll-up-overlay-text" class="localizable"></p>
        </div>

        <script>
(function () {
    function loadModulesList(cb) {
        // load modules list
        require(['data/init-modules-list-core', 'data/init-modules-list'],
                function (modulesCore, modulesGame) {
                    var k, i, ks, innerKs;
                    ks = Object.keys(modulesGame);
                    for (k = 0; k < ks.length; k++) {
                        innerKs = Object.keys(modulesGame[ks[k]]);
                        for (i = 0; i < innerKs.length; i++) {
                            modulesCore[ks[k]][innerKs[i]]
                                    = modulesGame[ks[k]][innerKs[i]];
                        }
                    }
                    window.initModulesList = modulesCore;
                    cb();
                });
    }
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam)
            {
                return sParameterName[1];
            }
        }
    }
    function loadLoadingImages(path, cb) {
    }
    // do not log anything to console
//    console.log = function () {
//    };

    // initialize global path to resources
    window.assetsPath = window.location.pathname.replace('demo', '');
    window.assetsPath = window.assetsPath.replace('real', '');
    if (window.assetsPath === '/') {
        window.assetsPath = '';
    }
    window.assetsPathCore = window.assetsPath;
    window.assetsPathType = window.assetsPath;
    window.assetsPathGame = window.assetsPath;

    // load loading background image
    var div = document.getElementById('loading-back');
    div.setAttribute('src', div.getAttribute('data-src'));

    // load main script
    var ERROR_REDIRECT = getUrlParameter('exit');
    var src = 'js/main.min.js';
    var script = document.createElement('script');
    script.hasLoaded = false;
    script.onload = function () {
        script.hasLoaded = true;
        loadModulesList(function () {
            // fire the start module
            require(['services/start']);
        });
    };
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
    setTimeout(function () {
        if (!script.hasLoaded) {
            // redirect to main page on error
            window.location = ERROR_REDIRECT;
        }
    }, 10000);

})();        </script>
    </body>
</html>