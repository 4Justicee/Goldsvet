<?php

session_start();
  $_SESSION['messages'][]=array("er",$lang['err_24']);
  header('location: /');
  die();

?>