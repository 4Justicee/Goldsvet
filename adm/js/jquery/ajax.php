   <?php
 $uploaddir = 'ajax_';
 $uploadfile = $uploaddir . basename($_FILES['userfile']['name']);

 if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
   echo "File is valid, and was successfully uploaded.\n";
 } else {
   echo "File uploading failed.\n";
 }
?>