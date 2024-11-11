<?php

include ('../cfg.php');
include ('../ini.php');

$s_gr=$_REQUEST['gr'];
$gr=mysql_fetch_assoc(mysql_query("select gr_id from game_group where start_path='$s_gr'")); 
 $coinsArr=explode(",",$conf["coinvalue_".$gr['gr_id']]);

if($_REQUEST['a']=="get"){


$coinvalue="";

if(isset($conf["coinvalue_".$gr['gr_id']])){
$coinvalue=$conf["coinvalue_".$gr['gr_id']];
}else{
	
$coinvalue=$adm_coinvalue[0];	
}



if(!isset($_SESSION["coinvalue_".$s_gr])){
	
	
$_SESSION["coinvalue_".$s_gr]=$coinsArr[0];	
}

echo $coinvalue."|".$_SESSION["coinvalue_".$s_gr];

}else if($_REQUEST['a']=="set"){
	
	
	
	
	if(in_array($_REQUEST['coin'],$coinsArr)){
		$_SESSION["coinvalue_".$s_gr]=$_REQUEST['coin'];
	}
		if($demomode){
		$balance=$user_row['demobalance']/$_SESSION["coinvalue_".$s_gr];
		}else{
		 $balance=$balance/$_SESSION["coinvalue_".$s_gr];
		}
		
        printf("%01.2f",$balance);	
	
}




?>