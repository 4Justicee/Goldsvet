<?php

include "../engine/cfg.php";
include "../engine/ini.php";

$group_allow_adm=array(1,4);
if(in_array($status,$group_allow_adm) && $login) {
	header('location: /adm/adm.php');
  die();
} else {

?>

<!DOCTYPE html>
<html lang="en">
<head>        
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />    
    <!--[if gt IE 8]>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />        
    <![endif]-->                
    <title><?=$lang['adm_login_title']?></title>
    <link rel="icon" type="image/ico" href="favicon.ico"/>
    
    <link href="css/stylesheets.css" rel="stylesheet" type="text/css" />
    
    <!--[if lte IE 7]>
        <script type='text/javascript' src='js/other/lte-ie7.js'></script>
    <![endif]-->    
    
    <script type='text/javascript' src='js/jquery/jquery.min.js'></script>
    <script type='text/javascript' src='js/jquery/jquery-ui-1.10.3.custom.min.js'></script>
    <script type='text/javascript' src='js/jquery/jquery-migrate.min.js'></script>
    <script type='text/javascript' src='js/jquery/globalize.js'></script>
    
    <script type='text/javascript' src='js/bootstrap/bootstrap.min.js'></script>
    
    <script type='text/javascript' src='js/scrollup/jquery.scrollUp.min.js'></script>
    
    <script type='text/javascript' src='js/plugins.js'></script>    

</head>
<body class="themeDark">
       
    <div id="wrapper" class="screen_wide sidebar_off">       
        <div id="layout">
            <div id="content">                        
                <div class="wrap nm">            
                    
                    <div class="signin_block">
                        <div class="row">
						
<?php
$error = isset($_GET['error'])?intval($_GET['error']): false;
if($error == 1) {
	print "
                            <div class=\"alert alert-danger\">
                            <strong>".$lang['enterCor_login_pass']." !</strong>
                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>
                            </div>
	";
} elseif($error == 2) {
	print "
                            <div class=\"alert alert-danger\">
                            <strong>".$lang['enterCor_login_pass']." !</strong>
                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>
                            </div>	
	";
}
elseif($error == 3) {
	print "
                            <div class=\"alert alert-danger\">
                            <strong>".$lang['adm_not_access']." !</strong>
                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>
                            </div>";
}

?>
                            <div class="block">
                                <div class="head">
                                    <h2><?=$lang['adm_login_title']?></h2>                                                                        
                                </div>
                                <form action="login.php" method="post">
                                <div class="content np">
                                    <div class="controls-row">
                                        <div class="col-md-3"><?=$lang['login']?>:</div>
                                        <div class="col-md-9"><input type="text" name="login" class="form-control" value=""/></div>
                                    </div>
                                    <div class="controls-row">
                                        <div class="col-md-3"><?=$lang['pass']?>:</div>
                                        <div class="col-md-9"><input type="password" name="pass" class="form-control" value=""/></div>
                                    </div>                                
                                </div>
                                <div class="footer">

                                    <div class="side fr">
                                        <button class="btn btn-primary"><?=$lang['adm_form_enter']?></button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>               
        
    </div>
    
</body>
</html>

<?php } ?>