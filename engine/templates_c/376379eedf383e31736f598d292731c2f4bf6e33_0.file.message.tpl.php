<?php
/* Smarty version 3.1.31, created on 2023-10-15 18:03:14
  from "C:\xampp\htdocs\engine\templates\default\message.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_652c0d422d8395_77942344',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '376379eedf383e31736f598d292731c2f4bf6e33' => 
    array (
      0 => 'C:\\xampp\\htdocs\\engine\\templates\\default\\message.tpl',
      1 => 1498192642,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_652c0d422d8395_77942344 (Smarty_Internal_Template $_smarty_tpl) {
if (count($_smarty_tpl->tpl_vars['messages']->value) > 0) {?>
  <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['messages']->value, 'message');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['message']->value) {
?>
<div class="popup popup_emailConfirmed" style="">
            <div class="popup__close js-close-popup">
                <svg class="svg__close svg-close-dims">
                    <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#close"></use>
                </svg>
            </div>
            <div class="popup__head">
                <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['notification'];?>
</div>
            </div>
            <div class="popup__content">
                <div class="popup__caption"><?php echo $_smarty_tpl->tpl_vars['message']->value[1];?>
</div>
            </div>
            <div class="popup__footer">
                <button class="popup__button button button_color_brightblue js-close-popup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['close'];?>
</button>
            </div>
</div>
  <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

<?php }
}
}
