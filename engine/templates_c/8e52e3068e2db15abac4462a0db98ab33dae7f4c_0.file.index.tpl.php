<?php
/* Smarty version 3.1.31, created on 2019-11-01 10:04:10
  from "/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/index.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5dbbe6fa7d1726_68849719',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8e52e3068e2db15abac4462a0db98ab33dae7f4c' => 
    array (
      0 => '/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/index.tpl',
      1 => 1498228642,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5dbbe6fa7d1726_68849719 (Smarty_Internal_Template $_smarty_tpl) {
?>
<main class="section__main">
    <div class="main main_gallery">
        <div class="main__inner">
          <?php if (isset($_smarty_tpl->tpl_vars['game_block1']->value) && $_smarty_tpl->tpl_vars['game_block1']->value) {?>
          <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['game_block1']->value, 'game');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['game']->value) {
?>
<li class="main__item preview">
    <div class="preview__item">
	<img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/ico/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
.png" class="preview__img" alt="<?php echo $_smarty_tpl->tpl_vars['game']->value['g_title'];?>
">
        <div class="preview__overlay">
            <div class="preview__action">
				<a href=<?php if ($_smarty_tpl->tpl_vars['login']->value) {?>"/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/real"<?php } else { ?>"#login-modal" data-toggle="modal"<?php }?> class="preview__button button button_color_orange"><?php echo $_smarty_tpl->tpl_vars['lang']->value['play'];?>
</a>
				<br>
                <a href="/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/demo" class="preview__button preview__button_demo button button_color_green"><?php echo $_smarty_tpl->tpl_vars['lang']->value['demo'];?>
</a>
            </div>
              <?php if ($_smarty_tpl->tpl_vars['game']->value['favorites']) {?>
                <i class="preview__icon fa fa-star in_favorites" data-toggle="remove-fav" data-id="<?php echo $_smarty_tpl->tpl_vars['game']->value['g_id'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['lang']->value['del_favorites'];?>
"></i>
              <?php } else { ?> 
                <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="<?php echo $_smarty_tpl->tpl_vars['game']->value['g_id'];?>
" title='<?php echo $_smarty_tpl->tpl_vars['lang']->value['add_favorites'];?>
'></i>
              <?php }?>  
        </div>
    </div>
    <div class="preview__info">
        <p class="preview__title"><?php echo $_smarty_tpl->tpl_vars['game']->value['g_title'];?>
</p>
        <p class="preview__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['now_playing'];?>
: <?php echo $_smarty_tpl->tpl_vars['game']->value['g_counter'];?>
</p>
    </div>
</li>
          <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

          <?php }?>
        </div>
    </div>
</main><?php }
}
