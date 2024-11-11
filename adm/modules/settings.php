<?php
if (@!defined(ENGINE_GOLDSVET)) header('location: /adm');

$cur_group = isset($_GET['gr_id']) ? $_SESSION['sett_gr'] = intval($_GET['gr_id']) : (isset($_SESSION['sett_gr']) ? $_SESSION['sett_gr'] : 1);

if (isset($_GET['action']) && $_GET['action'] == 'edit')
{
    $sql = "select key_name, type, title, checker,val,id from settings where (room_id=$room or (room_id=0 and is_global=1))and sett_group=$cur_group and sett_subgroup=" . intval($_GET['id']);
    $res = mysql_query($sql);
    if (mysql_num_rows($res) > 0)
    {
        while ($row = mysql_fetch_row($res))
        {
            //echo $row[0];
            //var_dump($_POST[$row[0]]);
            

            if (isset($_POST[$row[0]]) || $row[1] == 'checkbox')
            {
                if ($row[0] == 'denomination' && min(explode('|', $_POST[$row[0]])) < 0.01)
                {
                    //                                                                                                0.01
                    $_SESSION['message'][] = "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>" . $lang['adm_msg_31'] . "</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>           
           ";
                    $val = $row[4];
                }
                elseif ($row[1] == 'checkbox')
                {
                    $val = isset($_POST[trim($row[0]) ]) ? '1' : '0';
                }
                elseif ($row[1] == 'include') //                                                           
                
                {
                    $val = $row[4];
                }
                elseif ($row[1] == 'select')
                {
                    $options_arr = explode('|', $row[4]);
                    $old_val = array_shift($options_arr);
                    $new_val = isset($_POST[$row[0]]) ? intval($_POST[$row[0]]) : false;
                    if ($new_val !== false) $val = $new_val . "|" . implode('|', $options_arr);
                }
                else
                {
                    $val = isset($_POST[$row[0]]) ? $_POST[$row[0]] : false;
                    if ($row[3] && $row[0] != 'lic_key') if (!preg_match($row[3], $val))
                    {
                        $err_check[] = $row[2];
                        break;
                    }
                }
                if ($row[0] != 'lic_key') $sql = "update settings set val='$val' where id='$row[5]'";
                $result = mysql_query($sql) or $err_bd[] = $row[2];
                if ($result)
                {
                    //                                                                             
                    if ($row[4] != $val) mysql_query("insert into settings_history values (null, $room, $user_id, now(),'" . $row[0] . "', '$val','" . $row[4] . "')") or save_log(mysql_error() , 'db_error.log');
                }
            }
        }
    }
    if (isset($err_check) && count($err_check) > 0) $_SESSION['message'][] = "                            
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>\"" . implode('\", \"', $err_check) . "\", " . $lang['check'] . "</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>    
    ";
    elseif (isset($err_bd) && count($err_bd) > 0) $_SESSION['message'][] = "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>" . $lang['adm_msg_14'] . ": " . $sql . "\r\n" . mysql_error() . "</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>    
    ";
    else $_SESSION['message'][] = "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>" . $lang['adm_msg_13'] . "</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>    
    ";

    echo "<script> location.href='adm.php?a=settings'</script>";
    die();

}

if (isset($_GET['action']) && $_GET['action'] == 'add_gr_game')
{
    $sql = 'insert into game_group (gr_name) values (\'' . $_POST['add_gr_game'] . '\')';
    if (mysql_query($sql)) echo "                            
<div class='col-md-12'>
<div class='alert alert-success'>
<center><strong>" . $lang['adm_msg_32'] . "</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>      
      ";
    else echo "                           
<div class='col-md-12'>
<div class='alert alert-danger'>
<center><strong>" . $lang['adm_msg_14'] . ": " . $sql . "\r\n" . mysql_error() . "</strong></center>
<button class='close' data-dismiss='alert' type='button'>  </button>
</div>
</div>      
      ";
}

$set_subgroup[0] = isset($lang['settings_group'][$cur_group]) ? $lang['settings_group'][$cur_group] : $db->get_one("select gr_name from settings_group where gr_id=$cur_group");

$sql = "SELECT distinct t1.* from settings_group t1 join settings t2 on (t1.gr_id=t2.sett_subgroup and (room_id=$room or (room_id=0 and is_global=1))) where t2.sett_group=$cur_group";
$res = mysql_query($sql);
while ($row = mysql_fetch_array($res))
{
    $set_subgroup[$row['gr_id']] = isset($lang['settings_group'][$row['gr_id']]) ? $lang['settings_group'][$row['gr_id']] : $row['gr_name'];

}

foreach ($set_subgroup as $gr_id => $gr_name)
{

    //if($gr_id==17 && $conf['mail_type']!=='1') break;  //                                                                     ,                                            
    $sql = "select * from settings where (room_id=$room or (room_id=0 and is_global=1)) and sett_group=$cur_group and title<>'' and sett_subgroup=$gr_id order by position ASC";
    $result = mysql_query($sql);

    if (mysql_num_rows($result) > 0) //                                             
    
    {
        echo '
    <div class="row">                            
                            <div class="col-md-12">
                                <div class="block">
                                    <div class="head"> 
                                    <h2>' . $gr_name . '</h2>
                                    </div>
                                    <form action="?a=settings&action=edit&id=' . $gr_id . '" method="post">
                                    <div class="content np">
                                    ';

        while ($row = mysql_fetch_array($result))
        {
            $s_id = $row['id'];
            $s_name = $row['key_name'];
            $s_title = isset($lang['settings_title'][$s_name]) ? $lang['settings_title'][$s_name] : $row['title'];
            //$s_title=$lang['settings_title'][$s_name];
            $s_opis = isset($lang['settings_opis'][$s_name]) ? $lang['settings_opis'][$s_name] : $row['opis'];
            //$s_opis= $lang['settings_opis'][$s_name];
            $s_val = htmlspecialchars($row['val'], ENT_QUOTES, 'UTF-8');
            $s_type = $row['type'];
            $is_global = $row['is_global'];

            $tr_color = $is_global ? 'background: #705E6B' : '';

            $s_show = true;

            //                                                                    
            if (strpos($s_name, 'mail_smtp_') !== false && $conf['mail_type'] !== '1') //SMTP settings
            $s_show = false;

            if ($s_show)
            {
                if ($s_type == 'include')
                {
                    if (file_exists('modules/' . $s_val)) include ('modules/' . $s_val);
                    else echo '<div class="alert alert-warning">         ' . $s_val . '                  </div>';
                }
                else
                {
                    print '<div class="controls-row">
                      <div class="col-md-4">' . $s_title . '</div>
                      <div class="col-md-8">';

                    if ($s_type == 'select')
                    { //select -                                            1|                0|                1|                N         1            -                                                                     
                        $options_arr = explode('|', $s_val);
                        $val = array_shift($options_arr);
                        print "<select class='form-control' name='$s_name'>";
                        foreach ($options_arr as $option_id => $option_val)
                        {
                            print "<option value='$option_id'";
                            if ($val == $option_id) print " selected ";
                            print ">$option_val</option>";
                        }
                        print "</select>";
                    }
                    else
                    {
                        print '
                    <input   type="' . $s_type . '" name="' . trim($s_name) . '"';
                        //                                                
                        if ($s_name == 'lic_key') echo " disabled ";
                        if ($s_type == 'checkbox')
                        {
                            echo "class='ibutton' value=\"true\" ";
                            if ($s_val == '1') echo " checked ";
                        }
                        else echo "class='form-control' value=\"" . $s_val . "\"";

                        echo " />";
                    }
                    echo '</div>
               </div>';
                }
            }
        }
        echo '</div>
                                    <div class="footer">
                                        <div class="side fr">
                                            <input class="btn btn-primary" type="submit" value="    " name="submit" id="submit" />
                                        </div>
                                    </div>
</form>                                    
                                </div> 
                            </div>                                
                        </div>';
    }
}

?>