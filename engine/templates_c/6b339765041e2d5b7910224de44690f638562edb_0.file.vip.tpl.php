<?php
/* Smarty version 3.1.31, created on 2023-10-18 20:37:20
  from "C:\xampp\htdocs\engine\templates\default\vip.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_653025e04edb74_29964755',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6b339765041e2d5b7910224de44690f638562edb' => 
    array (
      0 => 'C:\\xampp\\htdocs\\engine\\templates\\default\\vip.tpl',
      1 => 1498192642,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_653025e04edb74_29964755 (Smarty_Internal_Template $_smarty_tpl) {
?>
            <div class="vipclub">
                <div class="vipclub__header">
                    <h1 class="vipclub__title title title_font_huge"><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
                </div>
                <div class="vipclub__content">
                    <p class="vipclub__note">
                        <?php echo $_smarty_tpl->tpl_vars['content']->value;?>

                    </p>
					
                    <div class="vipclub__row">
                        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['point_courses']->value, 'cours', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['cours']->value) {
?>
                        <div class="vipclub__item" data-target='#rate<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
'>
                            <div class="vip-panel">
                                <div class="vip-panel__badge"><?php echo $_smarty_tpl->tpl_vars['k']->value;?>
</div>
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/vip/<?php echo $_smarty_tpl->tpl_vars['cours']->value['pic'];?>
" alt="<?php echo $_smarty_tpl->tpl_vars['cours']->value['name'];?>
" class="vip-panel__img">
                                <button class="vip-panel__button button button_color_brightblue"><?php echo $_smarty_tpl->tpl_vars['cours']->value['name'];?>
</button>
                            </div>
                        
                        </div>
                        <div class="vipclub__info" id="rate<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
">
                            <h3 class="vipclub__subtitle title"><?php echo $_smarty_tpl->tpl_vars['cours']->value['title'];?>
 <?php echo $_smarty_tpl->tpl_vars['cours']->value['name'];?>
</h3>
                            <div class="vipclub__caption">
                                <?php echo $_smarty_tpl->tpl_vars['cours']->value['description'];?>

                            </div>
                            <span class="vipclub__arrow"></span>
                        
                        </div>
                       <?php if ($_smarty_tpl->tpl_vars['k']->value%3 == 0) {?>
                    </div>
                    <div class="vipclub__row">
                       <?php }?>
                       <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                                                
                    </div>
                    
                </div>
            </div><?php }
}
