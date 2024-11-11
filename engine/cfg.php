<?php

require 'dbcfg.php';
require_once('inc/db_class.php');

//                             
if (@!($conn = mysql_connect($hostname, $mysql_login , $mysql_password))) {
	include "dir/includes/errors/db.php";
	exit();
} else {
	if (!(mysql_select_db($database, $conn))) {
		include "dir/includes/errors/db.php";
		exit();
	}
}

$db=new DATABASE($hostname, $mysql_login , $mysql_password,$database);
//                                        

//                                                             (                                                              lang)

  $dir=realpath(dirname(__FILE__)."/lang");
  $handle = opendir($dir);
  for ($i=0;false !== ($file = readdir($handle));$i++)
    {
    if (!is_dir($dir.'/'.$file))
      {
      $lang_name=str_replace('.php','',$file);
      $available_langs[]=$lang_name;
      }
    }
    
//date_default_timezone_set('Europe/Kiev');

mysql_query("SET NAMES 'UTF8'");
mysql_query("SET time_zone = '".date_default_timezone_get());
                      
set_time_limit(0);
ini_set('max_execution_time',0);
ini_set('output_buffering',0);
$safe_mode = ini_get('safe_mode');

//                                      
$po_name="  GOLDSVET   Casino Management System";

if(version_compare(phpversion(), '4.1.0') == -1) {
 $_POST   = &$HTTP_POST_VARS;
 $_GET    = &$HTTP_GET_VARS;
 $_SERVER = &$HTTP_SERVER_VARS;
}

//                                    
$_POST = antisql($_POST);
$_GET = antisql($_GET);
$_REQUEST = antisql($_REQUEST);

if (!session_id()) session_start( );

$sid=session_id();

$_SESSION['base_dir']=realpath(dirname(__FILE__)."/..");	

$login = isset($_SESSION['login'])? $_SESSION['login'] : false;

$room=1;

$res= mysql_query($sql="select `key_name`, val,type from settings");
if($res)
        while($row=mysql_fetch_array($res))
          {
          if($row['type']=='select')
            {
            $options_arr=explode('|',$row['val']);
            $conf[$row['key_name']]=array_shift($options_arr);
            }
          elseif($row['type']=='array')
            {
            $conf[$row['key_name']]=explode('|',$row['val']);
            }  
          else
            $conf[$row['key_name']]= $row['val'];
          }
 else
  {
  $conf['lic_key']=false;
  }

$conf['use_total_bank']= true;


//recaptcha
if(!isset($conf['recaptcha_privatekey'])) $conf['recaptcha_privatekey'] = "6LcQ4vwSAAAAAMWx5BjTFnZNnACHkSkFm6RwvOv9";
if(!isset($conf['recaptcha_publickey'])) $conf['recaptcha_publickey'] = "6LcQ4vwSAAAAAKcHDvxD6f1xUaBeZhMl8rU6SPUT";


@$cfgURL		= $conf["url"];				              // URL               
@$adminmail		= $conf["adm_email"];		              // e-mail                             
@$use_blocks    = $conf["use_blocks"] = 1;                //                                      ,                 ,                            + icq
$num            = isset($conf['num'])? $conf['num']: 20;  //       -                                         

//$key=$conf['lic_key'];

preg_match('~\/(\S+)\/~',$_SERVER['PHP_SELF'],$match);


if(preg_match('~\/?(\S*)\/(adm)?\/~',$_SERVER['PHP_SELF'],$match_))
  {
  if($match_[1])
    $baseurl= '/'.$match_[1].'/';
  else  
    $baseurl= '/';
  $ge=$match_[2];
  }
elseif(isset($match[1]) && $match[1]!='adm')
  {$baseurl='/'.$match[1].'/';
  $ge=$match[1];
  }
else  
  $baseurl='/';
  
if (preg_match('~(game/)(.+)(/ge_server.php)~i',$_SERVER['PHP_SELF'],$matches))
  {$ge=$matches[2]; 
  if (!defined('GAME_NAME'))
    define('GAME_NAME',$ge);
  }

if (!isset($ge))
  $ge=isset($_GET['GE'])? $_GET['GE'] : 'root';
  
 $can_game=isset($conf['can_game'])? explode('|',$conf['can_game']) : array(1,5);  //                                                                                              
 
 
  
 $debug=isset($conf['debug'])? $conf['debug']: true;
 $dev_debug=true;
 
 
define("LOGS_DIR","/engine/logs");
define('ENGINE_DIR',dirname(__FILE__));
define('BACKUP_DIR',"/adm/backup");

//                                       
$users_group=array(
  1=>'                            ', 
  4=>'              ', 
  5=>'            '
);

$gamer_groups= array(5);
 
$denominations=isset($conf['denomination'])? explode('|',$conf['denomination']):array(0.2, 0.5, 1, 2, 5);

$msg_len = 5000; //                                               ,                                           , +/-                                                                                                 ...

function antisql($array)
  {
  $result=array();
  foreach ($array as $key=>$val)
    {
    if (is_array($val))
      $result[$key]=antisql($val);
    else
      {
      if (@get_magic_quotes_gpc())
        $val=stripslashes($val);
      if (!is_numeric($val)) 
        $result[$key] = mysql_real_escape_string($val);
      else
        $result[$key]=$val;
      }
    }
  return $result;
  } 

//                                                        
define('REPORT_START_DATE', date('Y-m-01')); 
define('REPORT_CURR_DATE', date('Y-m-d')); 

define('REPORT_START_TIME', '9:00:00'); 
define('REPORT_END_TIME', '23:59:59'); 

if (isset($conf['online_timeout']))
  define('LOGOUT_TIMEOUT',$conf['online_timeout']*60);  
else
  define('LOGOUT_TIMEOUT','300');

if (isset($conf['refresh_timeout'])&&$conf['refresh_timeout']>=5000)
  define('REFRESH_TIMEOUT',$conf['refresh_timeout']);  
else
  define('REFRESH_TIMEOUT','5000'); //                              -                    
  
$templ_theme=isset($conf['templ_theme'])?$conf['templ_theme']:'default';   //                           ,                               default

include("inc/Mobile_Detect.php");
$detect = new Mobile_Detect;
//if($detect->isMobile() || $detect->isTablet())
//$templ_theme=isset($conf['templ_theme_mobile'])?$conf['templ_theme_mobile']:'mobile';   //                                              ,                               mobile

$is_mobile=  ($detect->isMobile() || $detect->isTablet()) ? true : false;
$g_ver=$is_mobile? 1 : '0,1'; 

define('THEME_DIR', ENGINE_DIR.'/templates/'.$templ_theme);
define('THEME_URL', '/engine/templates/'.$templ_theme);


//                                                                                         
if (!isset($conf['table_games']))
$conf['table_games']=array('black_jack','roulette_euro','roulette_euro2','carib_poker','keno');

$games_without_wager=array(
                          'black_jack',
                          'roulette_euro',
                          'roulette_euro2',
                          'carib_poker',
                          'keno'
                          );   
$mail_byID = array ( 1=>'register',
                     2=>'remind',
                     4=>'payin',
                     5=>'payout_success',
                     7=>'payout_none',
                     8=>'activate',
                     9=>'support',
                     10=>'tournament_start',
                     11=>'tournament_end'
                     );
                     
$trioApi_payways=array('card_rub'=>'VISA/MASTERCARD',
                       'qiwi_rub'=>'QIWI',
                       'yamoney_rub'=>'YANDEX MONEY',
                       'okpay_rub'=>'OKPAY',
                       'perfectmoney_usd'=>'PERFECTMONEY',
                       'payeer_rub'=>'PAYEER');
                       
foreach($trioApi_payways as $k=>$v)
  {
  if(!$conf['trioApi_'.$k])
    unset($trioApi_payways[$k]);
  }                                            

$trioApi_outways=array('qiwi_rub'=>'QIWI',
                       'webmoney'=>'WEBMONEY',
                       'yamoney_rub'=>'YANDEX MONEY',
                       'card_rub'=>'VISA/MASTERCARD');

foreach($trioApi_outways as $k=>$v)
  {
  if(!$conf['out_trioApi_'.$k])
    unset($trioApi_outways[$k]);
  }                                            


$adm_bet=array(1,2,3,5,10,20,50,100);
$adm_coinvalue=array('1','1_2','1_2_5','1_2_5_10','1_2_5_10_20','1_2_5_10_20_50','10');


if(preg_match("`games\/(.+?)\/`",$_SERVER['REQUEST_URI'],$match))
  {
    $gr_name=$match[1];
    $gr_id=$db->get_one("select gr_id from game_group where start_path='$gr_name'");
		$bets=isset($conf["bets_$gr_id"])? $conf["bets_$gr_id"]: implode(',',$adm_bet);
    
    $conf["bets"]=$bets;
  }
    
  
//var_dump($conf['bets']);

include_once( 'inc/tournament_class.php');
?>