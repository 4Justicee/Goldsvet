<?php
echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>
	 <api>";
if(isset($err)||!isset($answer))
  {
  if(!isset($err)) $err="                           ";
  echo "<type>error</type>
<text>$err</text>";
  }
else
  {
  echo "<type>$action</type>";
  foreach($answer as  $k=>$v)
    echo "\n<".$k.">".$v."</".$k.">";
  }
echo "</api>";  
?>