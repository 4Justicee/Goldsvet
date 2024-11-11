<!DOCTYPE HTML>
<html lang="en">
<head>
    <title>Supreme Hot</title>
	<meta http-equiv="Cache-Control" content="no-transform" />
	<meta http-equiv="expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" />
    
    <style>
      html, body{
      	background-color:#000000;
      	padding:0;
      	width:100%;
      	height:100%;
        margin: 0;
      }
    </style>
   <script>
  var sport=<?php echo file_get_contents("http://".$_SERVER['HTTP_HOST'] ."/games/egt_server/socketport.php");?>;
  </script>
            <link rel="stylesheet" type="text/css" href="js/style.css?v=1400771587" />
            <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
            <script type="text/javascript" src="js/library.js?v=1400771587"></script>
            <script type="text/javascript" src="js/Balance.js?v=1400771587"></script>
            <script type="text/javascript" src="js/GamePlatform.js?v=1400771587"></script>
            <script type="text/javascript" src="js/Socket.js?v=1400771587"></script>
            <script type="text/javascript" src="js/Utils.js?v=1400771587"></script>
            <script type="text/javascript" src="js/ViewportHandler.js?v=1400771587"></script>
            <script type="text/javascript" src="js/Device.js?v=1400771587"></script>
            <script type="text/javascript" src="js/GameProxy.js?v=1400771587"></script>
            <script type="text/javascript" src="js/SlotProxy.js?v=1400771587"></script>
            <script type="text/javascript" src="js/SessionKeeper.js?v=1400771587"></script>
            <script type="text/javascript" src="js/PlatformSettings.js?v=1400771587"></script>
            <script type="text/javascript" src="js/LoadingHandler.js?v=1400771587"></script>
            <script type="text/javascript">
            
            function makeid()
              {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for( var i=0; i < 16; i++ )
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
              }
              function start()
              {
                var lang = "en";
                var gameId = 1;
                var ts = new Date().getTime();
                var vars =
                {
                  socketType		: 'wss',
                    tcpHost         : 'casino50',
                    tcpPort         : '9090',
                    sessionKey      : makeid() + (new Date()).getTime(),
                    lang            : lang,
                  gameIdentificationNumber: gameId
                }

                new GamePlatform(vars);
              }

               
               

              

            </script>
            </head>
            <body onload="start()">
              <div id="Loading">
                    <img src="images/logo.jpg" alt="EGT" class="logo" /><br />
                    <span class="progress">
                        <span class="fill"></span>
                        <span class="percent"></span>
                        <span class="text">LOADING</span>
                  <img src="images/loadingStar.png" alt="star" class="star" />
                    </span><br />
                    <img src="images/touch.jpg" alt="Touch" class="touch" />
              </div>
              <div id="Game">
                  <div id="GameViewport" class="gameViewport">
                  </div>
                  <div id="FullScreen">
                      <img class="hand_slide" src="images/hand_slide.gif" alt="Slide!" />
                  </div>
                  <div id="Waiting">
                      <img src="images/loading.gif" alt="Loading" />
                  </div>
                  <div id="Error">
                    <div class="middle">
                      <div class="inner">
                          <div class="message"></div>
                          <span class="rightButton"></span>
                          <span class="leftButton"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="Orientation">
                    <img src="images/rotate.gif" alt="Rotate!" />
                </div>
            </body>

</html>
