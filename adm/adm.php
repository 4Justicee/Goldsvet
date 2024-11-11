<?php

define ('ADM_DIR','adm');
$default_page=array(1=>'users',2=>'users',3=>'users',4=>'users');

include "../engine/cfg.php";
include "../engine/ini.php";

$avalable_status=array(1,4);


//                                                                      ,   .  .                                                                                          ,                                                     

$sql= "update users set action=0 where action not in (3,4) and go_time+".LOGOUT_TIMEOUT."<".time();
$db->run($sql);
     
$active_menu=isset($default_page[$status])? $default_page[$status]: 0;
//                                                                  
if(isset($_GET['a']))
  $active_menu=$_GET['a'];
else
  {//                                                                                           ,                                                  $a             
  $url_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

  $url_path = str_replace('/'.ADM_DIR.'/','',$url_path);
  $url_path = str_replace(basename(__FILE__),'',$url_path);
		  //                                           URL                     "/"
  trim($url_path, ' /');
  if(!empty($url_path))
    {    
    $uri_parts = explode('/', trim($url_path, ' /'));
	  $active_menu = array_shift($uri_parts);
    } 
  }

if($active_menu=='logout')
  {
  unset($_SESSION["login"]);
  unset($_SESSION["token"]);
  header('location: /adm/');
  die();
  }

$result = mysql_query("SELECT * FROM adminmenu ORDER BY id ASC");

while ($row = mysql_fetch_array($result)) {
  $pages[$row['path']]=$row;
}
  
if(array_key_exists($active_menu,$pages))     
{
if(in_array($status,$avalable_status)) {
	
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>        
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />    
    <!--[if gt IE 8]>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />        
    <![endif]-->                
    <title><?=$conf['cas_name']?></title>
    <link rel="icon" type="image/ico" href="favicon.ico"/>
    
    <link href="css/stylesheets.css" rel="stylesheet" type="text/css" />
    <link href="assets/flagstrap/css/flags.css" rel="stylesheet">
    
    <!--[if lte IE 7]>
        <script type='text/javascript' src='js/other/lte-ie7.js'></script>
    <![endif]-->    
    
    <script type='text/javascript' src='js/jquery/jquery.min.js'></script>
    <script type='text/javascript' src='js/jquery/jquery-ui-1.10.3.custom.min.js'></script>
    <script type='text/javascript' src='js/timepicker/jquery-ui-timepicker-addon.js'></script>
    <script type='text/javascript' src='js/jquery/jquery.ui.datepicker-ru.js'></script>
    <script type='text/javascript' src='js/jquery/jquery-migrate.min.js'></script>
    <script type='text/javascript' src='js/uniform/jquery.uniform.min.js'></script>
    <script type='text/javascript' src='js/jquery/globalize.js'></script>
    <script type="text/javascript" src="js/cookies/jquery.cookies.2.2.0.min.js" ></script>
    <script type='text/javascript' src='js/noty/jquery.noty.js'></script>
    <script type="text/javascript" src="js/noty/layouts/topRight.js" ></script>
    <script type="text/javascript" src="js/noty/themes/default.js"></script>
    
    <script type='text/javascript' src='js/bootstrap/bootstrap.min.js'></script>
    <script type='text/javascript' src="assets/flagstrap/js/jquery.flagstrap.js"></script>
    
    <script type='text/javascript' src='js/nicedit/nicEdit.js'></script>
    <script type='text/javascript' src='js/cleditor/jquery.cleditor.min.js'></script>
    
    <script type='text/javascript' src='js/scrollup/jquery.scrollUp.min.js'></script>
    <script type='text/javascript' src='js/ibutton/jquery.ibutton.min.js'></script>
    
    <script type='text/javascript' src='js/validationengine/languages/jquery.validationEngine-<?=$language?>.js'></script>
    <script type='text/javascript' src='js/validationengine/jquery.validationEngine.js'></script>
    
    
    <script type='text/javascript' src='js/plugins.js'></script>
    <script type='text/javascript' src='js/actions.js'></script>     

</head>
<body class="themeDark">
    
    <div id="wrapper" class="screen_wide">
        
        <div id="header">
            
            <div class="wrap">
                
                <a href="/adm/" class="logo"></a>
                
                <div class="buttons">
                    <div class="item"> 
                      <div id="langs">
      <?php 
      foreach ($available_langs as $tmp_language)
        {
        echo '<a href="" data-val="'.$tmp_language.'" onclick="return false"><i class="flagstrap-icon flagstrap-'.$tmp_language.'"  style="margin-right: 5px;"></i></a>';
        }
      ?>
                      </div>
                    </div>
                    <div class="item">                        
                        <div class="btn-group">                        
                            <a href="/" class="btn btn-primary btn-sm dropdown-toggle" >
                                <span class="i-forward"></span>
                            </a>
                        </div>
                    </div>                
                </div>

                
            </div>
            
        </div>
        
        <div id="layout">
        
            <div id="sidebar">

                <div class="user">
                    <div class="pic">
                        <img src="img/examples/users/ava.png"/>
                    </div>
                    <div class="info">
                        <div class="name">
                            <strong><?=$login?></strong> - <?=$lang['admin_head_ip']?> <strong><?php echo $_SERVER["REMOTE_ADDR"]; ?></strong>
                        </div>
                        <div class="buttons">
                            <?=$lang['admin_head_group']?> <strong><?=$lang['user_group'][$status]?></strong>
                            
                            
                        </div>
                    </div>
                </div>
				
<ul class="navigation">

<?php
$i = 0;
$o = 1;

$result = mysql_query("SELECT * FROM adminmenu ORDER BY id ASC");
$a = isset($_GET['a']) ? $_GET['a'] : $default_page[$status];
while ($row = mysql_fetch_array($result)) {

	$dostup=explode('|',$row['dostup']);
	
	if ($a==$row['path'])
	  {
    $a= in_array($status,$dostup)? $a : $default_page[$status];
    }
	
	if (in_array($status,$dostup)&& $row['show']==1)
	 {
	print '<li class="';
  if($row['path']==$a)
    {
    if($row['path']=='settings'|| $row['path']=='report'||$row['path']=='bonus')
      print " open ";
    else  
      print " active ";
    }
  if($row['path']=='settings'|| $row['path']=='report'||$row['path']=='bonus')
    print " openable ";  
  print '">';
  $menu_text= isset($lang['adminmenu'][$row['path']])? $lang['adminmenu'][$row['path']] : $row['title'];
  
  if($row['path']=='settings') //                                                                     
    {
    print "<a href=\"#\"><strong>".$menu_text."</strong></a>";
    //                             
    $cur_group=isset($_GET['gr_id'])? $_SESSION['sett_gr']=intval($_GET['gr_id']) : (isset($_SESSION['sett_gr'])? $_SESSION['sett_gr']: 1);
    $res_set= mysql_query("SELECT distinct t1.* from settings_group t1 join settings t2 on (t1.gr_id=t2.sett_group and (room_id=$room or (room_id=0 and is_global=1)))");
    while ($row_set=mysql_fetch_array($res_set))
      {
      if($row_set['gr_name'])
        $set_group[$row_set['gr_id']]=$row_set['gr_name'];
      }
    $res_set=mysql_fetch_row(mysql_query("select count(*) from settings where (room_id=$room or (room_id=0 and is_global=1)) and sett_group=0 and title<>''"));  
    if ($res_set[0]>0)  
      $set_group[0]= $lang['settings_group']['other_settings'];
  
    //$set_group[-1]= $lang['settings_group']['returns'];
    //$set_group[-2]= $lang['settings_group']['gamers_rating'];   
    print "<ul>";
    foreach ($set_group as $gr_id=>$gr_name_nav)
      {
      print "<li";
        if ($cur_group==$gr_id)
          print " class= 'active'";
      print "> <a href=\"?a=settings&gr_id=$gr_id\">".(isset($lang['settings_group'][$gr_id])?$lang['settings_group'][$gr_id]:$gr_name_nav)."</a>";
      print "</li>";     
      }
    print "</ul>";
    }
  elseif($row['path']=='report') //                                                                     
    {
    print "<a href=\"#\"><strong>".$menu_text."</strong></a>";
    //                               
    $sql_rep="select * from report_menu order by id";
  
    $result_rep=mysql_query($sql_rep);
    if($result_rep)
      {
      while($row_rep=mysql_fetch_array($result_rep))
        {
        $dostup_rep=explode('|',$row_rep['dostup']);
        if (in_array($status,$dostup_rep))
          {
          $report_menu_items[$row_rep['id']]=$row_rep['name'];
          }
        }
      }

    if (isset($report_menu_items))
      {
      $curr_report_menu_item=isset($_REQUEST['report'])?intval($_REQUEST['report']):min(array_keys ($report_menu_items));
      print "<ul>";
      foreach($report_menu_items as $key=>$val)
        {
        print "<li";
        if($key==$curr_report_menu_item)
          print " class= 'active'";
        
        $rep_name=isset($lang['reportmenu'][$key])? $lang['reportmenu'][$key] : $val;
        print "><a href='?a=report&report=$key'>".$rep_name."</a>";
        print "</li>";     
        }
      print "</ul>";
      }
    }
  elseif($row['path']=='bonus') //                                                                     
    {
    print "<a href=\"#\"><strong>".$menu_text."</strong></a>";
    print "<ul>";
    foreach($bonus_types as $key=>$txt)
      { 
        print "<li";
        if((isset($_REQUEST['btype']) && $key==$_REQUEST['btype'])|| (!isset($_REQUEST['btype'])&& $key=='reg'))
          print " class= 'active'";
        
        $bonus_name=isset($lang['bonus_group'][$key])? $lang['bonus_group'][$key] : $txt;
        print "><a href='?a=bonus&btype=$key'>".$bonus_name."</a>";
        print "</li>";
      }
    print "</ul>";  
    }  
  else  
    print "<a href=\"?a=".$row['path']."\"><strong>".$menu_text."</strong></a>";
  
  print "</li>";

	}	


  $i++;
  $o++;
  }

?>
<li><a href="/adm/logout"><strong><?=$lang['adminmenu']['exit']?></strong></a></li>
</ul>

            </div>

            <div id="content">  
                
                <div class="wrap">                    
                    
                                                                   
                    
                    <div class="container"> 
                    
    <div id="alert" style="display: none;" class='col-md-12'>

    <div id="alt" class="" >            
       <center><strong></strong></center> 
       <button data-dismiss="alert" class="close" type="button">  </button>
    </div>     
    </div>
    
    <!-- Bootrstrap modal form -->
    <div class="modal fade" id="uprompt" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 class="modal-title"></h3>
                </div>
                <form action="" method="post" class="validate">
                <div class="modal-body">                                   
                    <div class="row content">
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-warning submit"><?=$lang['ok']?></button> 
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true"><?=$lang['cancel']?></button> 
                               
                </div>
                </form>                
            </div>
        </div>
    </div>    
                                             
                        
<?php
//                                                             
  if(isset($_SESSION['message']))
    {
    foreach ($_SESSION['message'] as $msg)
      print $msg;
    
    unset($_SESSION['message']);  
    }

	if(!$a) {
		include "modules/index.php";
	} elseif(file_exists("modules/".$a.".php")) {
		include "modules/".$a.".php";
	} else {
		include "modules/error.php";
	}

?>

                    </div>                    
                    
                </div>
                
            </div>
            
        </div>

    </div>

    
</body>
</html>

<script>
function refreshInfo(node_id, id, info_url)
  {

		function onSuccess(data) {
		    // alert(JSON.stringify(data));
			if (!data.errcode) {
				onLoaded(data)
			} else {
				onLoadError(data)
			}
		}


		function onAjaxError(xhr, status){
			var errinfo = { errcode: status }
			if (xhr.status != 200) {
				//                                  200,                
				//     -                                JSON
				errinfo.message = xhr.statusText
			} else {
				errinfo.message = '<?=$lang['adm_msg_14']?>';
			onLoadError(errinfo)
			}
		}
		


		function onLoaded(data) {

			$("#user-info").html(data);
        	$('.datepicker').datepicker();
			$('.timepicker').timepicker({showSecond: true,timeFormat: 'hh:mm:ss'});
		}

		function onLoadError(error) {
			var msg = "<?=$lang['adm_msg_14']?>: "+error.errcode
			if (error.message) msg = msg + ' :'+error.message
			alert(msg)
		}

    
    $.cookies.set(id+'_open', node_id);

		$.ajax({
			url: info_url,
			data: "id="+node_id,
			dataType: "html",
			success: onSuccess,
			error: onAjaxError,
			cache: false
		})
  }

function refreshJackpotInfo(node_id, id, info_url)
{

    function onSuccess(data) {
        // alert(JSON.stringify(data));
        if (!data.errcode) {
            onLoaded(data)
        } else {
            onLoadError(data)
        }
    }


    function onAjaxError(xhr, status){
        var errinfo = { errcode: status }
        if (xhr.status != 200) {
            //                                  200,                
            //     -                                JSON
            errinfo.message = xhr.statusText
        } else {
            errinfo.message = '<?=$lang['adm_msg_14']?>';
            onLoadError(errinfo)
        }
    }



    function onLoaded(data) {

        $("#jackpot-info").html(data);
//        $('.datepicker').datepicker();
//        $('.timepicker').timepicker({showSecond: true,timeFormat: 'hh:mm:ss'});
    }

    function onLoadError(error) {
        var msg = "<?=$lang['adm_msg_14']?>: "+error.errcode
        if (error.message) msg = msg + ' :'+error.message
        alert(msg)
    }


    $.cookies.set(id+'_open', node_id);

    $.ajax({
        url: info_url,
        data: "id="+node_id,
        dataType: "html",
        success: onSuccess,
        error: onAjaxError,
        cache: false
    })
}

function set_Refresh_timer()
  {
  return setInterval(function(){ 
    //refreshInfo(getCookie('users-tree_open'),'users-tree', '<?=$baseurl?>engine/ajax/get_user_info.php');
    refreshInfo('room1','users-tree', '<?=$baseurl?>engine/ajax/get_user_info.php');
    }, <?php  echo REFRESH_TIMEOUT; ?>);  
  }

  function set_Refresh_JP_timer()
  {
      return setInterval(function(){
          refreshJackpotInfo(10,'Jackpot-tree', '<?=$baseurl?>engine/ajax/get_jack.php');
        //  refreshJackpotInfo(1,'Jackpot-tree', '<?=$baseurl?>engine/ajax/get_jack.php');
         // refreshJackpotInfo(2,'Jackpot-tree', '<?=$baseurl?>engine/ajax/get_jack.php');
        //  refreshJackpotInfo(3,'Jackpot-tree', '<?=$baseurl?>engine/ajax/get_jack.php');
      }, <?php  echo REFRESH_TIMEOUT; ?>);
  }

function Request(){
    var requestParam ="";

    //getParameter       
    this.getParameter = function(param){
        //                 decoding
        var url = unescape(location.href);
        //                         ,        &                                          .
        var paramArr = (url.substring(url.indexOf("?")+1,url.length)).split("&");

        for(var i = 0 ; i < paramArr.length ; i++){
            var temp = paramArr[i].split("="); //                                

            if(temp[0].toUpperCase() == param.toUpperCase()){
                //                                               
                requestParam = paramArr[i].split("=")[1];
                break;
            }
        }
        return requestParam;
    }
}
  
$(document).ready(
   function ()
    {
    //set_refresh_timer();      //                                          
    //set_refresh_timer_();

    //  set_Refresh_JP_timer();

    $("#coment-form").dialog({
          autoOpen: false,
			    height: 125,
			    width: 300,
			    modal: true,
			    buttons: {
				    "            ": function() {
					   $( this ).dialog( "close" );
				    },
				    "<?=$lang['adm_users_yes']?>": function(){$("#commentForm").submit();	$( this ).dialog( "close" ); }
			         }
          });
    $(document).on('click','.preset', function(){
       clearInterval(refreshTimer_id);
      });
      
      $(document).on('change', '.preset', function(){
      $.ajax({
				      url: "../engine/ajax/set_preset.php",
				      data: "user="+$(this).parents('tr').attr("id")+"&preset_id="+this.value,
				      cache: false,
				      success: function(result)
                {
                arr_result=result.split ('|');
                if (arr_result[0]=='success')
				{
					refreshTimer_id=set_Refresh_timer();
				} 
                else
                  alert(arr_result[1]);
                }
			        });
      }); 
      
      
  /* $(".langs").flagStrap({
        countries: {
            "en": "EN",
            "ru": "RU",
            "ua": "UA"
        },
        buttonSize: "btn-sm",
        buttonType: "btn-info",
        labelMargin: "10px",
        scrollable: false,
        scrollableHeight: "350px"
    });*/

   /*$('#langs').flagStrap({
        countries: {
//            <?php
//            foreach ($available_langs as $language_tmp)
//              echo '"'.$language_tmp.'":"'.$language_tmp.'",';
//            ?>
        },
        selectedCountry: '<?=$language?>',
        buttonSize: "btn-xs",
        buttonType: "btn-info",
        labelMargin: "5px",
        scrollable: false,
        scrollableHeight: "300px"
    });*/

$("#langs").on('click','a',function(){
  $.cookies.set('lang',$(this).attr('data-val'), Math.round(new Date().getTime() / 1000)+604800, '/');
  location = location.href;
}); 

$(".uprompt").on('click',function(){
  var title= $(this).data().promptTitle ? $(this).data().promptTitle : $(this).data().promptText;
  var text= $(this).data().promptText;
  var href= $(this).attr('href');
  $("#uprompt .modal-title").text(title);
  $("#uprompt .content").text(text);
  $("#uprompt form").attr('action',href);
  $("#uprompt").modal('show');
  
  console.log($(this).attr('href'));
  return false;
});    
          
   });
   
function reset_user_action(user_id)
  {
  $.ajax({
				url: "<?=$baseurl?>engine/ajax/reset_user_action.php?user="+user_id,
				dataType: "text",
				cache: false,
        success: function(result)
                {
                arr_result=result.split ('|');
                if (arr_result[0]=='success')
                  {
                  $("#user_"+user_id+"_action").html(arr_result[1]);
                  }
                 else  
                  alert(result);
                }
			});
  return false;
  } 


 
 function set_refresh_timer_()
  {
   setInterval(function(){
     $.ajax({
				url: "<?=$baseurl?>adm/ajax.php?p=<?=$a?>",
				dataType: "json",
				cache: false,
				success: function(data){
          for (var key in data)
            {
            $(data[key].selector).html(data[key].val);
            }
				 
				},
				error: onAjaxError
			});
   }, <?php  echo REFRESH_TIMEOUT; ?>);
   
   function onAjaxError(xhr, status){
			var errinfo = { errcode: status }
			if (xhr.status != 200) {
				//                                  200,                
				//     -                                JSON
				errinfo.message = xhr.statusText
			} else {
				errinfo.message = '<?=$lang['adm_msg_14']?>';
			onLoadError(errinfo)
			}
		}
		
		function onLoadError(error) {
			var msg = "<?=$lang['adm_msg_14']?> "+error.errcode
			if (error.message) msg = msg + ' :'+error.message
			alert(msg)
		}
  }

setTimeout(function(){
    $(".erok").hide();
    $(".er").not(".nohidden").hide();
    }, 10000);
    
function Ualert(text,type)
  {
  
  type= type || 'alert-danger';
  $("#alt").attr('class','alert '+type);
  $("#alert strong").html(text);
  $("#alert").show();
  console.log(this);
  }

</script>

<?php
} else {
print "<html><head><script language=\"javascript\">top.location.href='index.php';</script></head><body><a href=\"index.php\"><b>Index</b></a></body></html>";
}
}
else
 {
 $sapi_name = php_sapi_name();
if ($sapi_name == 'cgi' || $sapi_name == 'cgi-fcgi') {
    header('Status: 404 Not Found');
} else {
    header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
}
include(realpath(dirname(__FILE__).'/../engine/dir/includes/errors/404.php'));
 } 
?>