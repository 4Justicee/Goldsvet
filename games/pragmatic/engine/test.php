<?php
print_r("please wait while npm installing.\n");
$path = getcwd();
$path .= "/npm.cmd";
$a = shell_exec("node index");
die($a);
?>