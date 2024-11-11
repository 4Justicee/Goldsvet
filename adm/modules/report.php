<?php 

if (@!defined(ENGINE_GOLDSVET))
  header('location: /adm');
if (check_right($curr_report_menu_item,'report'))
  {

load_report($curr_report_menu_item,'filter');

load_report($curr_report_menu_item,'content');

}

?>