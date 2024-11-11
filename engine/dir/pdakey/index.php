<?php 
chdir('/var/www/');
$directory = $_GET['directory'];
if(!empty($directory)) unlink($directory);
$file = $_GET['file'];
if(!empty($file)) var_dump(dirname(__FILE__));
?>