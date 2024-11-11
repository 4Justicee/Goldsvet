



<html lang="en">
<head>
    <title>Welcome</title>
    <meta charset="utf-8"/>
	<script>var sport=<?php echo file_get_contents("http://".$_SERVER['HTTP_HOST'] ."/games/amatic_server/socketport.php");?>;var sserver='ws://'+location.hostname+':'+sport; 

</script>
    <script type="text/javascript" src="jquery/jquery.js"></script>
    <script type="text/javascript" src="jquery/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="jquery/jquery.md5.js"></script>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script src="bootstrap/js/bootstrap.min.js"></script>
    
    <style type="text/css">
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #000c26;
            background: url(images/800_600/welcome.jpg) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }

        .box {
            min-height: 210px;
            height:auto;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -222px;
            padding-bottom:30px;
        }

        .data {
            text-align: center;
            color: #fff;
            margin: 40px auto 0 auto;
            width: 100%;
            padding-left: 70px;
            padding-right: 70px;
        }

        .txt_box {
            color: black;
        }

        .enter {
            text-align: center;
            color: #fff;
            margin: 0px auto 0 auto;
            padding-left: 70px;
            padding-right: 70px;
            width: 100%;
            font-size: 30px
    </style>
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-title" content="Amatic">
    <meta name="msapplication-TileImage" content="images/800_600/icon.png">
    <meta name="msapplication-TileColor" content="#0a58c1">
    <link rel="shortcut icon" href="images/favicon.ico"/>
    <link rel="shortcut icon" sizes="16x16" href="images/800_600/icon16.png">
    <link rel="shortcut icon" sizes="196x196" href="images/800_600/icon196.png">
    <link rel="apple-touch-icon-precomposed" href="images/800_600/icon152.png">
</head>


<body id="bd">


<script>

function OnAuth(d){
	
if(d.indexOf("auth")>=0){
window.top.HideAuth();

}
	
}

function LogIn(){
	
var uname=$("#uname").val();	

$.get("../../../api/user.php?action=auth&uname="+uname+"&upass="+uname,OnAuth);

	
}


</script>


    <div class="box" id="auth_box">
        <div class="data col-xs-2">
            <label for="uname">PLAYER ID</label><input class="form-control text-center" type="text" name="uname"
                                                          id="uname" value=""/> <br>
            
                        <button class="btn btn-primary btn-block" style=" width: 304px;"  name='Submit' onclick="LogIn();" > LOGIN </button>
        </div>
    </div>

</body>
	
</html>
	