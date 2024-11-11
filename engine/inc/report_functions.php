<?php

function load_report($report_id,$file_rep)  
  {
  global $curr_report_menu_item, $user_id,$status, $room, $user_creator, $conf,$lang,$db;
  $report_user_id=$status==3? $user_creator: $user_id;
  $report_dir=getcwd().'/reports/';
  $file=$report_dir.$report_id.'/'.$file_rep.'.rep';
  if(is_readable($file))
    include ($file); 
  else
    echo "<p class='er'>                                                                                            $file_rep                            $report_id </p>";
  }

?>