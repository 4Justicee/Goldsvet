<?php
/* Smarty version 3.1.31, created on 2023-10-16 20:03:41
  from "C:\xampp\htdocs\engine\templates\default\game\game.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_652d7afdb3b9f2_30849795',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cfc9672a32d756d6f51cfeb1ce9dfff9947d1db4' => 
    array (
      0 => 'C:\\xampp\\htdocs\\engine\\templates\\default\\game\\game.tpl',
      1 => 1493906814,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_652d7afdb3b9f2_30849795 (Smarty_Internal_Template $_smarty_tpl) {
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['description']->value;?>
">
	<meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['keywords']->value;?>
" />
    <link rel="icon" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/favicon/favicon.ico" type="image/x-icon" />
    <title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
    <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/css/vendor.min.css">
    <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/css/main.min.css">
    <?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/js/jquery.min.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/vendor/svg4everybody/svg4everybody.min.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="//ulogin.ru/js/ulogin.js" type="text/javascript"><?php echo '</script'; ?>
>
    
</head>
<body class="game_bg">

<object  width="100%"" height="100%"" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,18,0" id="test" align="middle">
<param name="allowFullScreen" value="true" />
<param name="movie" value="<?php echo $_smarty_tpl->tpl_vars['param']->value;?>
" />
<param name="bgcolor" value="03030F" />
<param name="wmode" value="opaque" />
<embed src="<?php echo $_smarty_tpl->tpl_vars['param']->value;?>
" bgcolor="03030F" allowFullScreen="true" wmode="opaque" name="game" align="middle" width="100%" height="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
</object>

</body>
</html><?php }
}
