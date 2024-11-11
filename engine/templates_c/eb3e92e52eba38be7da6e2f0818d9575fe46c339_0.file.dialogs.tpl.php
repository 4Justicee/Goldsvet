<?php
/* Smarty version 3.1.31, created on 2019-11-05 18:15:25
  from "/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/dialogs.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5dc1a01d69d0e9_76738321',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'eb3e92e52eba38be7da6e2f0818d9575fe46c339' => 
    array (
      0 => '/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/dialogs.tpl',
      1 => 1572964104,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5dc1a01d69d0e9_76738321 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div class="modal" id="login-modal" style="display: none">
    <header class="modal__header">
        <div class="span modal__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['auth'];?>
</div>
        <span class="modal__icon icon icon_cancel js-close-popup"></span>
    </header>
    <form action="/engine/ajax/user.php?action=auth" method="POST" data-type="ajax">
        <div class="modal__content">
            <div class="modal__input input">
                <label class="modal__label input__label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['email'];?>
</label>
                <input placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['enter_you_email'];?>
" type="text" name="email" class="modal__input-inner input__inner">
            </div>
            <div class="modal__input input">
                <label class="modal__label input__label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['password'];?>
</label>
                <input placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['enter_you_password'];?>
" type="password" name="pass" class="modal__input-inner input__inner">
                <span class="modal__caption" data-toggle="modal" data-target=".popup_restorePassword"><?php echo $_smarty_tpl->tpl_vars['lang']->value['lost_password'];?>
</span>
            </div>
            <div class="modal__error" style="display: none">
                <span class="modal__note modal__note_important"></span>
                <span class="modal__note modal__note_accent"></span>
            </div>
        </div>
        <div class="modal__footer">
            <input type="submit" value="<?php echo $_smarty_tpl->tpl_vars['lang']->value['enter'];?>
" class="modal__button button_shape_round button_color_orange" />
            <div class="modal__signup-soc">
                <span class="modal__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['log_in'];?>
</span>
                <div class="modal__social" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://<?php echo $_smarty_tpl->tpl_vars['config']->value['url'];?>
/registration?ulogin">
                    <div class="socials socials_undefined">
                        <a class="socials__item" href="#" data-uloginbutton = "vkontakte">
                            <svg class="socials__icon svg_vkontakte">
                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#vkontakte"></use>
                            </svg>
                        </a>
                        <a class="socials__item" href="#" data-uloginbutton = "odnoklassniki">
                            <svg class="socials__icon svg_odnoklassniki">
                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#odnoklassniki"></use>
                            </svg>
                        </a>
                        <a class="socials__item" href="#" data-uloginbutton = "twitter">
                            <svg class="socials__icon svg_twitter" >
                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#twitter"></use>
                            </svg>
                        </a>
                        <a class="socials__item" href="#" data-uloginbutton = "facebook">
                            <svg class="socials__icon svg_facebook">
                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#facebook"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="modal__actions">
                <span class="modal__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['not_registered_yet'];?>
</span>
                <div class="modal__signup">
                    <div class="signup">
                        <a class="signup__button button button_font_cond" data-toggle="modal" data-target="#registration-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['registration'];?>
</a>
                        <div class="signup__input input input_withbutton">
                            <input placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['15_seconds'];?>
" class="input__inner" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="popup popup_restorePassword" style="display:none">
    <div class="popup__close js-close-popup"><i class="icon icon_cross-bold"></i></div>
    <form action="/engine/ajax/user.php?action=remind" method="POST" data-type="ajax" data-answer=".popup_remindSuccess">
        <div class="popup__head">
            <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['recover_password'];?>
</div>
        </div>
        <div class="popup__content">
            <div class="popup__subtitle"><?php echo $_smarty_tpl->tpl_vars['lang']->value['specify_you_email'];?>
</div>
            <div class="popup__input input">
                <input class="input__inner" type="text" name="email" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['email'];?>
">
            </div>
            <div class="modal__error" style="">
                <span class="modal__note modal__note_important"></span>
                <span class="modal__note modal__note_accent"></span>
            </div>
        </div>
        <div class="popup__footer">
            <input type="submit" value="<?php echo $_smarty_tpl->tpl_vars['lang']->value['restore'];?>
" class="popup__button button button_color_orange" />
        </div>
    </form>
</div>
<div class="popup popup_remindSuccess" style="display:none">
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
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['password_send'];?>
</div>
    </div>
    <div class="popup__footer">
        <div class="popup__button button button_color_brightblue js-close-popup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['close'];?>
</div>
    </div>
</div>
<?php if (!(isset($_smarty_tpl->tpl_vars['user_info']->value['gift']) && $_smarty_tpl->tpl_vars['user_info']->value['gift'] > 0)) {?>
<div class="popup popup_chooseBonus" id="registration-modal" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__content">
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['choose_bonus'];?>
</div>
        <div class="popup__bonuses">
            <div class="bonus">
                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['bonus_reg']->value, 'bonus');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['bonus']->value) {
?>
                <label for="bonus_<?php echo $_smarty_tpl->tpl_vars['bonus']->value['id'];?>
">
                    <div class="bonus__item">
                        <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/images/bonus/<?php echo $_smarty_tpl->tpl_vars['bonus']->value['pic'];?>
" alt="<?php echo $_smarty_tpl->tpl_vars['bonus']->value['name'];?>
">
                        <div class="bonus__info"><span class="bonus__name"><?php echo $_smarty_tpl->tpl_vars['bonus']->value['name'];?>
</span><span class="bonus__note"><?php echo $_smarty_tpl->tpl_vars['bonus']->value['desc'];?>
</span></div>
                    </div>
                </label>
                <input type="radio" id="bonus_<?php echo $_smarty_tpl->tpl_vars['bonus']->value['id'];?>
" name="bonus" value="<?php echo $_smarty_tpl->tpl_vars['bonus']->value['id'];?>
" style="display:none">
                <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                
            </div>
        </div>
    </div>
    <div class="popup__footer">
        <span class="popup__subtitle"><?php echo $_smarty_tpl->tpl_vars['lang']->value['already_registered'];?>
</span>
        <a class="popup__subtitle popup__subtitle_accent" data-toggle="modal" href="#login-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['enter'];?>
</a>
    </div>
</div>
<?php }?>

<div class="popup popup_registration" id="registration-confirm" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['registration'];?>
</div>
    </div>
    <div class="popup__content">
        <div class="registration">
            <div class="registration__image" data-toggle="modal" data-target="#registration-modal">
                <img src="" id="selected-bonus-image"/>
                <div class="registration__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['change'];?>
</div>
            </div>
            <form method="post" class="registration__form" action="/engine/ajax/user.php?action=register" data-type="ajax" >
                <div class="registration__input input">
                    <input type="hidden" name="gift" id="bonus">
                    <input type="hidden" name="ref" value="<?php echo $_smarty_tpl->tpl_vars['ref']->value;?>
">
                    <input placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['enter_email'];?>
" type="text" name="email"  class="registration__input-inner">
                </div>
                <div class="registration__input input">
                    <input placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['enter_password'];?>
" type="password" name="pass" class="registration__input-inner">
                </div>
                <div class="registration__checkbox checkbox">
                    <input type="checkbox" id="rules" value="1" name="yes" checked="checked" class="checkbox__inner">
                    <label for="rules" class="checkbox__label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['accept_terms'];?>
</label>
                </div>
                <div class="modal__error" style="display: none">
                    <span class="modal__note modal__note_important"></span>
                </div>
                <button class="registration__button button button_color_orange validate"><?php echo $_smarty_tpl->tpl_vars['lang']->value['complete'];?>
</button>
            </form>
        </div>
    </div>
    <div class="popup__footer">
        <div class="popup__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['registration_social'];?>
</div>
        <div class="popup__socials">
            <div class="socials" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://<?php echo $_smarty_tpl->tpl_vars['config']->value['url'];?>
/registration?ulogin">
                <a class="socials__item" href="#" data-uloginbutton = "vkontakte">
                    <svg class="socials__icon svg_vkontakte">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#vkontakte"></use>
                    </svg>
                </a>
                <a class="socials__item" href="#" data-uloginbutton = "odnoklassniki">
                    <svg class="socials__icon svg_odnoklassniki">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#odnoklassniki"></use>
                    </svg>
                </a>
                <a class="socials__item" href="#" data-uloginbutton = "twitter">
                    <svg class="socials__icon svg_twitter">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#twitter"></use>
                    </svg>
                </a>
                <a class="socials__item" href="#" data-uloginbutton = "facebook">
                    <svg class="socials__icon svg_facebook">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#facebook"></use>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
<?php if ($_smarty_tpl->tpl_vars['user_id']->value > 0) {?>
<div class="popup popup_afterRegistration ps-container ps-theme-hidden" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['welcome'];?>
</div>
    </div>
    <div class="popup__content">
        <div class="popup__title popup__title_accent"><?php echo $_smarty_tpl->tpl_vars['lang']->value['you_bonus'];?>
</div>
        <div class="bonus bonus_single">
            <div class="bonus__item bonus__item_3">
                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/images/bonus/<?php echo $_smarty_tpl->tpl_vars['bonus_reg']->value['pic'];?>
">
                <div class="bonus__info"><span class="bonus__name"><?php echo $_smarty_tpl->tpl_vars['bonus_reg']->value['name'];?>
</span><span class="bonus__caption">
                    <?php echo $_smarty_tpl->tpl_vars['lang']->value['registration_finish'];?>

                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="popup__footer">
        <button data-id="<?php echo $_smarty_tpl->tpl_vars['bonus_reg']->value['id'];?>
" class="activate-bonus popup__button button button_color_orange js-close-popup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['make_deposit'];?>
</button>
    </div>
    <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 3px;">
        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
    </div>
    <div class="ps-scrollbar-y-rail" style="top: 0px; right: 3px;">
        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
    </div>
</div>
<?php }?>
<div class="popup popup_emailVerification" style="display:none">
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
        <div class="popup__caption"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_mail_activate'];?>
</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_brightblue js-close-popup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['close'];?>
</button>
    </div>
</div>

<?php if (isset($_smarty_tpl->tpl_vars['games']->value)) {?>
<div class="popup popup_gameplayGallery" style="display: none">
    <div class="popup__content">
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_games'];?>
:</div>
        <div class="popup__gallery">
            <?php
$_smarty_tpl->tpl_vars['i'] = new Smarty_Variable(null, $_smarty_tpl->isRenderingCache);
$_smarty_tpl->tpl_vars['i']->value = 0;
if ($_smarty_tpl->tpl_vars['i']->value < 3) {
for ($_foo=true;$_smarty_tpl->tpl_vars['i']->value < 3; $_smarty_tpl->tpl_vars['i']->value++) {
?>
            <?php $_prefixVariable1 = array_shift(array_shift($_smarty_tpl->tpl_vars['games']->value));
$_smarty_tpl->_assignInScope('game', $_prefixVariable1);
if ($_prefixVariable1) {?>
            <li class="main__item preview">
                <div class="preview__item">
                    <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/ico/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
.png" width="238" height="158" class="preview__img" alt="<?php echo $_smarty_tpl->tpl_vars['game']->value['g_title'];?>
">
                    <div class="preview__overlay">
                        <div class="preview__action">
                            <a <?php if ((isset($_smarty_tpl->tpl_vars['user_id']->value) && $_smarty_tpl->tpl_vars['user_id']->value > 0)) {?>href="/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['start_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/real" <?php } else { ?> data-toggle="modal" data-target="#login-modal"<?php }?> class="preview__button button button_color_orange"><?php echo $_smarty_tpl->tpl_vars['lang']->value['play'];?>
</a>
                            <br>
                            <a href="/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['start_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/demo" class="preview__button preview__button_demo button button_color_green"><?php echo $_smarty_tpl->tpl_vars['lang']->value['demo'];?>
</a>
                        </div>
                        <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="<?php echo $_smarty_tpl->tpl_vars['game']->value['g_id'];?>
" title='$lang['add_favorites']'></i>
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
            <?php }?>
            <?php }
}
?>
            
        </div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_orange" onclick="$('.popup,.modal').hide()"><?php echo $_smarty_tpl->tpl_vars['lang']->value['back_game'];?>
</button>
        <a class="popup__close" href="<?php echo $_smarty_tpl->tpl_vars['referer']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['lang']->value['exit_lobby'];?>
</a>
    </div>
</div>
<?php }?>
<div class="popup popup_passwordChanged" style="display:none">
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
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['password_send'];?>
</div>
    </div>
    <div class="popup__footer">
        <div class="popup__button button button_color_brightblue js-close-popup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['close'];?>
</div>
    </div>
</div>
<div class="popup popup_bonusNotification" id="have_active_bonus" style="display:none">
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
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_bonus'];?>
</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_brightblue js-close-popup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['close'];?>
</button>
    </div>
</div>
<div class="popup popup_tabs popup_undefined" id="cabinet-modal" style="display: none">
    <div class="tab">
        <div class="tab__action">
            <a href="#cashier" target="_self" class="tab__item" data-toggle="tab"><?php echo $_smarty_tpl->tpl_vars['lang']->value['cash'];?>
</a>
            <a href="#profile" class="tab__item tab__item_active" data-toggle="tab"><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile'];?>
</a>
            <a href="#bonuses" target="_self" class="tab__item" data-toggle="tab"><?php echo $_smarty_tpl->tpl_vars['lang']->value['bonuses'];?>
</a>
            <a href="#vip" target="_self" class="tab__item" data-toggle="tab">VIP</a>
        </div>
        <div class="tab__content">
            <div class="tab-cashier" id="cashier">
                <div class="tab-cashier__header"></div>
                <div class="tab-cashier__content">
                    <div class="tab tab_style_button">
                        <div class="tab__action">
                            <a href="#payment-tab" target="_self" data-toggle="tab" class="tab__item tab__item_active"><?php echo $_smarty_tpl->tpl_vars['lang']->value['deposit'];?>
</a>
                            <a href="#withdraw-tab" target="_self" data-toggle="tab"  class="tab__item"><?php echo $_smarty_tpl->tpl_vars['lang']->value['out'];?>
</a>
                            <a href="#history-tab" target="_self" data-toggle="tab" class="tab__item"><?php echo $_smarty_tpl->tpl_vars['lang']->value['history'];?>
</a>
                        </div>
                        <div class="tab__content">
                            <div id="payment-tab" class="active payment">
                                <div class="payment__gallery">
                                    
                                    
                                
            <?php $_smarty_tpl->_assignInScope('p', 0);
?>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['payways']->value, 'payway', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['payway']->value) {
?>
            <?php if ($_smarty_tpl->tpl_vars['p']->value++%3 == 0) {?>
            <form method="POST" action="/enter?system=trioApi&amp;action=send" class="payment-form">
            <input type="hidden" name="bonus_id" class="deposit-bonus-id">
          
              <div class="payment__row">  
              <div class="payment__row-inner">  
            <?php }?>  
                <label class="payment__item payitem" >
                        <input type="radio" name="psystem" value="<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
" style="display:none">

                        <div class="payitem__img">
                            <div class="payitem__img_inner">
                                <svg class="svg-card_rub-dims">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="payitem__footer">
                            <p class="payitem__note payitem__note_small"><?php echo $_smarty_tpl->tpl_vars['lang']->value['limits'];?>
:</p>
                            <p class="payitem__note"><?php echo $_smarty_tpl->tpl_vars['config']->value['enter_from'];?>
 - <?php echo $_smarty_tpl->tpl_vars['config']->value['enter_to'];?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</p>
                        </div>
                    </label>
             <?php if ($_smarty_tpl->tpl_vars['p']->value%3 == 0 || $_smarty_tpl->tpl_vars['p']->value == count($_smarty_tpl->tpl_vars['payways']->value)) {?>
              </div>
              </div>
              <div class="payment__tooltip">
                <div class="payment__tooltip_inner">
                    <div class="pay-tooltip">
                    <div class="pay-tooltip__note" style="display: none"><i class="fa fa-exclamation-triangle"></i>
                        <span class="error__info"></span>
                    </div>
                    <div class="pay-tooltip__phone pay-tooltip__number_withplus" style="display: none">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['phone_number'];?>
:
                        <span class="pay-tooltip__input">
                            <input type="tel" name="addons[phone]" maxlength="14" placeholder="70000000000" class="pay-tooltip__phone_inner js-input__inner">
                        </span>
                    </div>
                    <div class="pay-tooltip__summ"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sum'];?>
:
                        <label><input id="p_0_500" type="radio" name="money" value="500"> 500</label>
                        <label><input id="p_0_1000" type="radio" name="money" value="1000"> 1 000</label>
                        <label><input id="p_0_5000" type="radio" name="money" value="5000"> 5 000</label>
                        <input id="l_0_num" type="radio" name="money" value="500" checked="" class="l_num">
                        <div class="pay-tooltip__input input">
                            <input type="text" name="amount" class="input__inner input_summ_val js-input__inner" required="" value="500">
                        </div>
                        <button type="submit" class="pay-tooltip__button button button_color_orange"><?php echo $_smarty_tpl->tpl_vars['lang']->value['add_funds'];?>
</button>
                    </div>
                </div>
                </div>
            </div>
            </form>
             <?php }?>                       
                  
            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                                      
            <?php if ($_smarty_tpl->tpl_vars['config']->value['pin_use']) {?>                        
                                    <form method="POST" action="/enter?action=send" class="payment-form">
                                        <input type="hidden" name="bonus_id" class="deposit-bonus-id">
                                        <div class="payment__row">
                                            <div class="payment__row-inner">
                                                <label class="payment__item payitem" data-paysys="pin">
                                                    <input type="radio" name="system" value="pin" style="display:none">
                                                    <div class="payitem__img">
                                                        <div class="payitem__img_inner">
                                                            <svg class="svg-qiwi_rub-dims">
                                                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#qiwi_rub"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="payitem__footer">
                                                        <p class="payitem__note payitem__note_small"><?php echo $_smarty_tpl->tpl_vars['lang']->value['limits'];?>
:</p>
                                                        <p class="payitem__note">100 - 100000 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="payment__tooltip">
                                            <div class="payment__tooltip_inner">
                                                <div class="pay-tooltip">
                                                    <div class="pay-tooltip__note" style="display: none"><i class="fa fa-exclamation-triangle"></i>
                                                        <span class="error__info"></span>
                                                    </div>
                                                    <div class="pay-tooltip__pin" style="display: none">
                                                        pin-      :
                                                        <span class="pay-tooltip__input">
                                                        <input type="text" name="pin" maxlength="14" placeholder="xxxxxxxxxx" class="pay-tooltip__pin_inner js-input__inner">
                                                        </span>
                                                        <button type="submit" class="pay-tooltip__button button button_color_orange">                  </button>
                                                    </div>
                                                    <div class="pay-tooltip__summ">
													<?php echo $_smarty_tpl->tpl_vars['lang']->value['sum'];?>
:
                                                        <label><input id="p_0_500" type="radio" name="money" value="500"> 500</label>
                                                        <label><input id="p_0_1000" type="radio" name="money" value="1000"> 1 000</label>
                                                        <label><input id="p_0_5000" type="radio" name="money" value="5000"> 5 000</label>
                                                        <input id="l_0_num" type="radio" name="money" value="500" checked class="l_num">
                                                        <div class="pay-tooltip__input input">
                                                            <input type="text" name="amount" class="input__inner input_summ_val js-input__inner" required value="500">
                                                        </div>
                                                        <button type="submit" class="pay-tooltip__button button button_color_orange">                  </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form> 
            <?php }?>
                                </div>
                            </div>
                            <div id="withdraw-tab" class="payment">
                                <div class="payment__gallery">
            <?php $_smarty_tpl->_assignInScope('p', 0);
?>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['outways']->value, 'outway', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['outway']->value) {
?>
            <?php if ($_smarty_tpl->tpl_vars['p']->value++%3 == 0) {?>
              <form method="POST" action="/engine/ajax/pay.php?paysys=out"  class="payment-form">
          
                <div class="payment__row">  
                <div class="payment__row-inner">  
            <?php }?> 
                    <label class="payment__item payitem" >
                        <input type="radio" name="ps" value="<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
" style="display:none" class="payout">

                        <div class="payitem__img">
                            <div class="payitem__img_inner">
                                <svg class="svg-card_rub-dims">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="payitem__footer">
                            <p class="payitem__note payitem__note_small"><?php echo $_smarty_tpl->tpl_vars['lang']->value['limits'];?>
:</p>
                            <p class="payitem__note"><?php echo $_smarty_tpl->tpl_vars['config']->value['minout'];?>
 - <?php echo $_smarty_tpl->tpl_vars['config']->value['maxout'];?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</p>
                        </div>
                    </label>
                    
                <?php if ($_smarty_tpl->tpl_vars['p']->value%3 == 0 || $_smarty_tpl->tpl_vars['p']->value == count($_smarty_tpl->tpl_vars['outways']->value)) {?>
                  </div>
                  </div>
              
                        <div class="payment__tooltip collapse">
                                            <div class="payment__tooltip_inner">
                                                <div class="pay-tooltip">
                                                    <div class="pay-tooltip__note" style="display: none"><i class="fa fa-exclamation-triangle"></i>
                                                        <span class="error__info"></span>
                                                    </div>
                                                    <div class="pay-tooltip__number">
                                                        <span class="pay-tooltip__caption"><?php echo $_smarty_tpl->tpl_vars['lang']->value['number_purse'];?>
:</span>
                                                        <span class="pay-tooltip__input">
                                                        <input type="text" name="account" placeholder="Z*******" required class="pay-tooltip__number_inner input__inner js-input__inner">
                                                        </span>
                                                    </div>
                                                    <div class="pay-tooltip__input input"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sum_out'];?>
:
                                                        <input type="text" required placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['sum'];?>
" name="sum" class="input__inner js-input__inner">
                                                    </div>
                                                    <button type="submit" class="pay-tooltip__button pay-tooltip__button_withdraw button button_color_orange"><?php echo $_smarty_tpl->tpl_vars['lang']->value['out'];?>
</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                      <?php }?>              
                      <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                               
                            </div>
                            </div>
                            
                            <div id="history-tab" class="history">
                                <table class="history__table">
                                    <thead class="history__head">
                                        <tr class="history__row">
                                            <th class="history__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['id'];?>
</th>
                                            <th class="history__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['date'];?>
</th>
                                            <th class="history__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sum'];?>
</th>
                                            <th class="history__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['system'];?>
</th>
                                            <th class="history__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['type'];?>
</th>
                                        </tr>
                                    </thead>
                                    <tbody class="history__body">
                                        <?php if ($_smarty_tpl->tpl_vars['history']->value) {?>
                                        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['history']->value, 'row');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['row']->value) {
?>
                                        <tr class="history__row">
                                            <td class="history__cell"><?php echo $_smarty_tpl->tpl_vars['row']->value['inv_code'];?>
</td>
                                            <td class="history__cell"><?php echo $_smarty_tpl->tpl_vars['row']->value['date'];?>
</td>
                                            <td class="history__cell"><?php echo abs($_smarty_tpl->tpl_vars['row']->value['sum']);?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</td>
                                            <td class="history__cell"><?php echo $_smarty_tpl->tpl_vars['row']->value['paysys'];?>
</td>
                                            <td class="history__cell"><?php echo $_smarty_tpl->tpl_vars['row']->value['type'];?>
</td>
                                        </tr>
                                        <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                                        <?php }?>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab__close js-close-popup"></div>
                    </div>
                </div>
            </div>
            <?php if (isset($_smarty_tpl->tpl_vars['user_info']->value)) {?>
            <div class="profile active" id="profile">
                <div class="profile__table">
                    <div class="profile__aside">
                        <div class="profile__info">
                            <div class="profile-info">
                                <div class="profile-info__title title title_font_largest"><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</div>
                                <div class="profile-info__caption title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['your_lvl'];?>
</div>
                                <div class="profile-info__status">
                                    <div class="status status_huge">
                                        <div class="status__icon">
                                            <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/vip/<?php echo $_smarty_tpl->tpl_vars['user_info']->value['rating_pic'];?>
" width="110">
                                        </div>
                                        <span class="status__note"><?php echo $_smarty_tpl->tpl_vars['user_info']->value['rating_name'];?>
</span>
                                    </div>
                                </div>
                                <div class="profile-info__rating">
                                    <div class="rating rating_profile">
                                        <div class="rating__stars rating__stars_large">
                                            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['point_courses']->value, 'cours', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['cours']->value) {
?>
                                            <?php if ($_smarty_tpl->tpl_vars['k']->value <= $_smarty_tpl->tpl_vars['user_info']->value['rating']) {?>
                                            <svg class="rating__icon svg-star">
                                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#star-filled"></use>
                                            </svg>
                                            <?php } else { ?>
                                            <svg class="rating__icon svg-star_disabled svg-star">
                                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#star"></use>
                                            </svg>
                                            <?php }?>
                                            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>
                             
                                        </div>
                                        <div class="rating__bar">
                                            <div style="width:<?php echo round($_smarty_tpl->tpl_vars['user_info']->value['payin_total']/$_smarty_tpl->tpl_vars['point_courses']->value[$_smarty_tpl->tpl_vars['user_info']->value['rating']+1]['range']*100);?>
%" class="rating__inner">
                                                <div class="rating__percent"><?php echo round($_smarty_tpl->tpl_vars['user_info']->value['payin_total']/$_smarty_tpl->tpl_vars['point_courses']->value[$_smarty_tpl->tpl_vars['user_info']->value['rating']+1]['range']*100);?>
%</div>
                                            </div>
                                            <div class="rating__info">
                                                <i class="icon icon_info-light"></i>
                                                <div class="rating__tooltip tooltip">
                                                    <div class="tooltip__content"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_lvl'];?>
</div>
                                                    <div class="tooltip__arrow"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="rating__summary">
                                            <span class="rating__caption"><?php echo $_smarty_tpl->tpl_vars['lang']->value['your_balance'];?>
:
                                            <span class="rating__caption_accent"><?php echo $_smarty_tpl->tpl_vars['balance']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</span>
                                            </span>
                                            <span class="rating__title rating__title_large"><?php echo $_smarty_tpl->tpl_vars['lang']->value['vip_points'];?>
:</span>
                                            <span class="rating__title rating__title_large rating__title_accent">
                                                <?php echo $_smarty_tpl->tpl_vars['user_info']->value['pay_points'];?>

                                                <div class="rating__info">
                                                    <i class="icon icon_info-light"></i>
                                                    <div class="rating__tooltip tooltip">
                                                        <div class="tooltip__content"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_lvl'];?>
</div>
                                                        <div class="tooltip__arrow"></div>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
								<?php if ($_smarty_tpl->tpl_vars['active_bonus_bar']->value) {?>
                                <div class="profile-info__bonus">
                                    <div class="rating rating_profile rating_profile_bonus">
                                        <div class="rating__summary">
                                            <span class="rating__title rating__title_large"><?php echo $_smarty_tpl->tpl_vars['lang']->value['bonus'];?>
:</span>
                                            <span class="rating__title rating__title_large rating__title_accent"><?php echo $_smarty_tpl->tpl_vars['active_bonus_bar']->value['sum'];?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</span>
                                        </div>
                                        <div class="rating__bar">
                                            <div style="width:<?php echo $_smarty_tpl->tpl_vars['active_bonus_bar']->value['perc'];?>
%" class="rating__inner">
                                                <div class="rating__percent"><?php echo $_smarty_tpl->tpl_vars['active_bonus_bar']->value['perc'];?>
%</div>
                                            </div>
                                            <div class="rating__info">
                                                <i class="icon icon_info-light"></i>
                                                <div class="rating__tooltip tooltip tooltip_right">
                                                    <div class="tooltip__content"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_wager'];?>
</div>
                                                    <div class="tooltip__arrow tooltip__arrow_right"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
								<?php }?>
                                <div class="profile-info__action">
                                    <button class="profile-info__button button button_color_orange"  data-tab="#cashier" data-toggle="modal" data-target="#cabinet-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['cash'];?>
</button>
                                    <div class="profile-info__icon">
                                        <svg class="svg-money svg-money-dims">
                                            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#money"></use>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile__main">
                        <form method="post" action="/engine/ajax/user.php?action=edit" data-type="ajax" class="tab-profile__form">
                            <div class="profile-details">
                                <h3 class="profile-details__title title title_align_center"><?php echo $_smarty_tpl->tpl_vars['lang']->value['personal information'];?>
</h3>
                                <div class="profile-details__action">
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-firstname">
                                            <input type="text" id="profileform-firstname" class="input__inner" name="ProfileForm[firstname]" value="<?php echo $_smarty_tpl->tpl_vars['user_info']->value['firstname'];?>
" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['name'];?>
">
                                            <div class="help-block"></div>
                                        </div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-lastname">
                                            <input type="text" id="profileform-lastname" class="input__inner" name="ProfileForm[lastname]" value="<?php echo $_smarty_tpl->tpl_vars['user_info']->value['lastname'];?>
" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['surname'];?>
">
                                            <div class="help-block"></div>
                                        </div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-login">
                                            <input type="text" id="profileform-login" class="input__inner" name="ProfileForm[login]" value="<?php echo $_smarty_tpl->tpl_vars['login']->value;?>
" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['login'];?>
" disabled=disabled>
                                            <div class="help-block"></div>
                                        </div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-birthday">
                                            <input type="text" id="profileform-birthday" class="input__inner datepicker_birth" name="ProfileForm[birthday]" value="<?php echo $_smarty_tpl->tpl_vars['user_info']->value['birthday'];?>
" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['birthday'];?>
">
                                            <div class="help-block"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-contacts">
                                <h3 class="profile-contacts__title title title_align_center"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact_information'];?>
</h3>
                                <div class="profile-contacts__action">
                                    <div class="profile-contacts__item">
                                        <div class="profile-contacts__input input">
                                            <label class="profile-contacts__label input__label"><span class="profile-contacts__label-inner"><?php echo $_smarty_tpl->tpl_vars['lang']->value['email'];?>
</span>
                                            <?php if ($_smarty_tpl->tpl_vars['user_info']->value['mail_active_status'] < 2) {?>
                                            <span class="profile-contacts__status"><?php echo $_smarty_tpl->tpl_vars['lang']->value['not_confirmed'];?>
</span>
                                            <?php } else { ?>
                                            <span class="profile-contacts__status profile-contacts__status_confirmed"><?php echo $_smarty_tpl->tpl_vars['lang']->value['confirmed'];?>
</span>
                                            <?php }?>
                                            </label>
                                            <?php if ($_smarty_tpl->tpl_vars['user_info']->value['mail_active_status'] == 0) {?>
                                            <a class="profile-contacts__button input__button button button_color_orange" data-verification="email"><?php echo $_smarty_tpl->tpl_vars['lang']->value['confirm'];?>
</a>
                                            <?php }?>
                                            <div class="form-group field-profileform-email">
                                                <input type="text" id="profileform-email" class="input__inner input__inner_readonly" name="ProfileForm[email]" value="<?php echo $_smarty_tpl->tpl_vars['user_info']->value['email'];?>
" readonly placeholder="<?php ob_start();
echo $_smarty_tpl->tpl_vars['lang']->value['email'];
$_prefixVariable2=ob_get_clean();
echo $_prefixVariable2;?>
">
                                                <div class="help-block"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="profile-contacts__item">
                                        <div class="profile-contacts__input input">
                                            <label class="profile-contacts__label input__label"><span class="profile-contacts__label-inner"><?php echo $_smarty_tpl->tpl_vars['lang']->value['phone'];?>
</span>
                                            <span class="profile-contacts__status"><?php echo $_smarty_tpl->tpl_vars['lang']->value['not_confirmed'];?>
</span>
                                            </label>
                                            <a class="profile-contacts__button input__button button button_color_orange" data-verification="phone"><?php echo $_smarty_tpl->tpl_vars['lang']->value['confirm'];?>
</a>
                                            <div class="form-group field-profileform-phone">
                                                <input type="text" id="profileform-phone" class="js-input__inner_tel input__inner" name="ProfileForm[phone]" maxlength="12" placeholder="00000000000">
                                                <div class="help-block"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal__error" style="display:none">
                                <div class="modal__note_important"></div>
                            </div>
                            <div class="profile-socials">
                                <h3 class="profile-socials__title title title_align_center"><?php echo $_smarty_tpl->tpl_vars['lang']->value['social_network'];?>
</h3>
                                <p class="profile-socials__note">
								<?php echo $_smarty_tpl->tpl_vars['lang']->value['info_social'];?>

                                </p>
                                <div class="profile-socials__action">
                                    <div class="socials socials_form" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://<?php echo $_smarty_tpl->tpl_vars['config']->value['url'];?>
/registration?ulogin">
                                        <a class="socials__item <?php if (array_key_exists('vkontakte',$_smarty_tpl->tpl_vars['user_info']->value['soc'])) {?> socials__item_active<?php }?>" href="#" <?php if (!array_key_exists('vkontakte',$_smarty_tpl->tpl_vars['user_info']->value['soc'])) {?> data-uloginbutton = "vkontakte"<?php }?>>
                                            <svg class="socials__icon svg_vkontakte">
                                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#vkontakte"></use>
                                            </svg>
                                        </a>
                                        <a class="socials__item <?php if (array_key_exists('odnoklassniki',$_smarty_tpl->tpl_vars['user_info']->value['soc'])) {?> socials__item_active<?php }?>" href="#" <?php if (!array_key_exists('odnoklassniki',$_smarty_tpl->tpl_vars['user_info']->value['soc'])) {?> data-uloginbutton = "odnoklassniki"<?php }?>>
                                            <svg class="socials__icon svg_odnoklassniki">
                                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#odnoklassniki"></use>
                                            </svg>
                                        </a>
                                        <a class="socials__item <?php if (array_key_exists('twitter',$_smarty_tpl->tpl_vars['user_info']->value['soc'])) {?> socials__item_active<?php }?>" href="#" <?php if (!array_key_exists('twitter',$_smarty_tpl->tpl_vars['user_info']->value['soc'])) {?> data-uloginbutton = "twitter"<?php }?>>
                                            <svg class="socials__icon svg_twitter">
                                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#twitter"></use>
                                            </svg>
                                        </a>
                                        <a class="socials__item <?php if (array_key_exists('facebook',$_smarty_tpl->tpl_vars['user_info']->value['soc'])) {?> socials__item_active<?php }?>" href="#" <?php if (!array_key_exists('facebook',$_smarty_tpl->tpl_vars['user_info']->value['soc'])) {?> data-uloginbutton = "facebook"<?php }?>>
                                            <svg class="socials__icon svg_facebook">
                                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#facebook"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="profile__action">
                                <a class="profile__button button button_color_brightblue" data-toggle="modal" data-target=".popup_changePassword"><?php echo $_smarty_tpl->tpl_vars['lang']->value['change_password'];?>
</a>
                                <button type="submit" class="profile__button profile__button_submit button button_color_orange"><?php echo $_smarty_tpl->tpl_vars['lang']->value['current_password'];?>
</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <?php }?>
            <div class="tab-bonuses" id="bonuses">
                <div class="tab-bonuses__gallery">
                      <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['bonuses']->value, 'bonus');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['bonus']->value) {
?>
                      <div class="tab-bonuses__item">
                          <div class="bonus-panel">
                            <div class="bonus-panel__view">
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/images/bonus/<?php echo $_smarty_tpl->tpl_vars['bonus']->value['pic'];?>
" class="bonus-panel__img">
                            </div>
                            <div class="bonus-panel__info">
                                <p class="bonus-panel__title"><?php echo $_smarty_tpl->tpl_vars['bonus']->value['name'];?>
</p>
                                <p class="bonus-panel__note">
                                    <?php echo $_smarty_tpl->tpl_vars['bonus']->value['desc'];?>

                                </p>
                            </div>
                            <div class="bonus-panel__action">
                                <?php if ($_smarty_tpl->tpl_vars['bonus']->value['status'] == 1) {?>
                                <p class="bonus-panel__title bonus-panel__title_alert"><?php echo $_smarty_tpl->tpl_vars['lang']->value['bonus_active'];?>
:</p>
                                <?php } else { ?>
                                <p class="bonus-panel__title bonus-panel__title_alert"><?php echo $_smarty_tpl->tpl_vars['lang']->value['before_end_activation_bonus'];?>
:</p>
                                <?php }?>
                                <div class="bonus-panel__timer timer">
                                    <div class="timer__table">
                                        <?php if ($_smarty_tpl->tpl_vars['bonus']->value['end_time']) {?> <?php echo $_smarty_tpl->tpl_vars['bonus']->value['end_time'];?>
 <?php } else { ?> <?php echo $_smarty_tpl->tpl_vars['bonus']->value['start_time']+$_smarty_tpl->tpl_vars['bonus']->value['activate_time']*24*60*60;
}?>
                                        <div class="timer__row timer__row_digit" data-toggle="timer" id="bonus-<?php echo $_smarty_tpl->tpl_vars['bonus']->value['id'];?>
" data-time="<?php if ($_smarty_tpl->tpl_vars['bonus']->value['status'] == 1) {
echo $_smarty_tpl->tpl_vars['bonus']->value['start_time']+$_smarty_tpl->tpl_vars['bonus']->value['live_time']*24*60*60;
} else {
if ($_smarty_tpl->tpl_vars['bonus']->value['end_time']) {?> <?php echo $_smarty_tpl->tpl_vars['bonus']->value['end_time'];?>
 <?php } else { ?> <?php echo $_smarty_tpl->tpl_vars['bonus']->value['start_time']+$_smarty_tpl->tpl_vars['bonus']->value['activate_time']*24*60*60;
}
}?>"></div>
                                        <div class="timer__row timer__row_caption">
                                            <div class="timer__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['d'];?>
</div>
                                            <div class="timer__cell timer__cell_empty"></div>
                                            <div class="timer__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['h'];?>
</div>
                                            <div class="timer__cell"></div>
                                            <div class="timer__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['m'];?>
</div>
                                            <div class="timer__cell"></div>
                                            <div class="timer__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['s'];?>
</div>
                                        </div>
                                    </div>
                                    <div class="timer__note_large"></div>
                                </div>
                                <?php if ($_smarty_tpl->tpl_vars['bonus']->value['status'] == 1) {?>
                                <div class="bonus-panel__informer bonus-panel__informer_green"><?php echo $_smarty_tpl->tpl_vars['lang']->value['activated'];?>
</div>
                                <?php } else { ?>
                                <div class="activate-bonus bonus-panel__button button button_shape_round" data-id="<?php echo $_smarty_tpl->tpl_vars['bonus']->value['id'];?>
"><?php echo $_smarty_tpl->tpl_vars['lang']->value['activate_bonus'];?>
</div>
                                <?php }?>
                            </div>
                        </div>
                      </div>
                      <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                    
                </div>
            </div>
            <div class="vip" id="vip">
                <div class="vip__header">
                    <span class="vip__title">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['your_points'];?>
: <?php echo $_smarty_tpl->tpl_vars['user_info']->value['pay_points'];?>

                        <span class="vip__icon">
                            <div class="rating__info">
                                <i class="icon icon_info-light"></i>
                                <div class="rating__tooltip rating__tooltip_right tooltip">
                                    <div class="tooltip__content"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_lvl'];?>
</div>
                                    <div class="tooltip__arrow tooltip__arrow_right"></div>
                                </div>
                            </div>
                        </span>
                    </span>
                </div>
                <div class="vip__action">
                    <div class="vip__table">
                        <form data-type="ajax" action="/engine/ajax/exchange.php" method="POST" id="exchange-form">
                            <input name="csrf_token" value="c91e312a044e1a3818b2e7c599880d29ddd08f994d7aef246187c52cece3cbd6" type="hidden">
                            <div class="vip__cell">
                                <span class="vip__subtitle"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sum_points'];?>
</span>
                                <div class="vip__input vip__input_color_white">
                                    <input type="text" id="exchange-input" name="sumpoints" class="input__inner" max="0.00" min="100" data-cours="<?php echo $_smarty_tpl->tpl_vars['point_cours_row']->value['cours']/100;?>
">
                                </div>
                            </div>
                            <div class="vip__cell">
                                <span class="vip__subtitle"><?php echo $_smarty_tpl->tpl_vars['lang']->value['exchange rate'];?>
</span>
                                <div class="vip__viewrate">100 : <?php echo $_smarty_tpl->tpl_vars['point_cours_row']->value['cours'];?>
</div>
                            </div>
                            <div class="vip__cell">
                                <span class="vip__subtitle"><?php echo $_smarty_tpl->tpl_vars['lang']->value['you_will_receive'];?>
</span>
                                <div class="vip__input vip__input_color_yellow">
                                    <input type="text" id="exchange-output" class="input__inner" data-cours="<?php echo $_smarty_tpl->tpl_vars['point_cours_row']->value['cours']/100;?>
">
                                </div>
                            </div>
                            <div class="modal__error" style="display: none">
                                <span class="modal__note modal__note_important"></span>
                                <span class="modal__note modal__note_accent"></span>
                            </div>
                        </form>
                    </div>
                    <button class="vip__button button button_color_orange" onclick="$('#exchange-form').submit()"><?php echo $_smarty_tpl->tpl_vars['lang']->value['exchanged_money'];?>
</button>
                </div>
                <div class="vip__levels-table">
                    <div class="levels-table">
                        <div class="levels-table__table">
                            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['point_courses']->value, 'cours', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['cours']->value) {
?>                    
                            <div class="levels-table__item <?php if ($_smarty_tpl->tpl_vars['k']->value == $_smarty_tpl->tpl_vars['user_info']->value['rating']) {?> levels-table__item_active<?php }?>" data-toggle="tab" data-target="#vip_level_description_<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
">
                                <p class="levels-table__title levels-table__title_small"><?php echo $_smarty_tpl->tpl_vars['cours']->value['name'];?>
</p>
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/vip/<?php echo $_smarty_tpl->tpl_vars['cours']->value['pic'];?>
" class="levels-table__icon">
                                <div class="levels-table__ratenote"></div>
                                <span class="levels-table__caption"><?php echo $_smarty_tpl->tpl_vars['lang']->value['exchange rate'];?>
</span>
                                <div class="levels-table__viewrate">100:<?php echo $_smarty_tpl->tpl_vars['cours']->value['cours'];?>
</div>
                                <a class="levels-table__link"><?php echo $_smarty_tpl->tpl_vars['lang']->value['more'];?>
</a>
                                <span class="levels-table__arrow <?php if ($_smarty_tpl->tpl_vars['k']->value == $_smarty_tpl->tpl_vars['user_info']->value['rating']) {?>levels-table__arrow_active<?php }?>"></span>
                                <div class="levels-table__ratenote levels-table__ratenote_zero"><?php echo $_smarty_tpl->tpl_vars['cours']->value['range'];?>
</div>
                            </div>
                            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>
                   
                        </div>
                        <div class="levels-table__slider">
                            <div class="levels-table__slider-bar">
                                <div class="levels-table__slider-inner" style="width:<?php echo $_smarty_tpl->tpl_vars['point_bar']->value;?>
%"></div>
                            </div>
                        </div>
                        <div class="tab__content">
                            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['point_courses']->value, 'cours', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['cours']->value) {
?>  
                            <div class="levels-table__info <?php if ($_smarty_tpl->tpl_vars['k']->value == $_smarty_tpl->tpl_vars['user_info']->value['rating']) {?>active<?php }?>" id="vip_level_description_<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
">
                                <div class="levels-table__status">
                                    <div class="levels-table__status-inner status status_huge">
                                        <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/vip/<?php echo $_smarty_tpl->tpl_vars['cours']->value['pic'];?>
" class="status__icon">
                                        <span class="status__note"><?php echo $_smarty_tpl->tpl_vars['cours']->value['name'];?>
</span>
                                    </div>
                                </div>
                                <div class="levels-table__summary">
                                    <p class="levels-table__title levels-table__title_accent"><?php echo $_smarty_tpl->tpl_vars['lang']->value['description'];?>
:</p>
                                    <div class="levels-table__note"><?php echo $_smarty_tpl->tpl_vars['cours']->value['description'];?>
</div>
                                </div>
                            </div>
                            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>
					
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="tab__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#close"></use>
        </svg>
    </div>
</div>
</div>
<div class="popup popup_changePassword" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['change_password'];?>
</div>
    </div>
    <form action="/engine/ajax/user.php?action=change_pass" method="POST" data-type="ajax" data-answer=".popup_passwordChanged">
        <div class="popup__content">
            <div class="popup__input input">
                <label class="popup__label popup__label_small input__label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['current_password'];?>
</label>
                <input type="password" name="current_pass" required class="input__inner" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['current_password'];?>
">
            </div>
            <div class="popup__input input">
                <label class="popup__label popup__label_small input__label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['new_password'];?>
</label>
                <input type="password" name="pass" required class="input__inner" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['new_password'];?>
">
            </div>
            <div class="popup__input input">
                <label class="popup__label popup__label_small input__label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['confirm_password'];?>
</label>
                <input type="password" name="re_pass" required class="input__inner" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['confirm_password'];?>
">
            </div>
            <div class="modal__error" style="display:none">
                <div class="modal__note_important"></div>
            </div>
        </div>
        <div class="popup__footer">
            <button class="popup__button button button_color_orange"><?php echo $_smarty_tpl->tpl_vars['lang']->value['change_password'];?>
</button>
        </div>
    </form>
</div>
<div class="popup popup_tabs popup_deposit_for_bonus" id="deposit-for-bonus-modal" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__content">
        <p class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['make_deposit_bonus'];?>
</p>
        <p class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['make_deposit_bonus_min'];?>
</p>
        <div class="popup_section__main">
            <div class="payment" style="text-align: center">
                <div class="payment__gallery">
            <?php $_smarty_tpl->_assignInScope('p', 0);
?>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['payways']->value, 'payway', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['payway']->value) {
?>
            <?php if ($_smarty_tpl->tpl_vars['p']->value++%3 == 0) {?>
            <form method="POST" action="/enter?system=trioApi&amp;action=send" class="payment-form">
            <input type="hidden" name="bonus_id" class="deposit-bonus-id">
          
              <div class="payment__row">  
              <div class="payment__row-inner">  
            <?php }?>  
                <label class="payment__item payitem" >
                        <input type="radio" name="psystem" value="<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
" style="display:none">

                        <div class="payitem__img">
                            <div class="payitem__img_inner">
                                <svg class="svg-card_rub-dims">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="payitem__footer">
                            <p class="payitem__note payitem__note_small"><?php echo $_smarty_tpl->tpl_vars['lang']->value['limits'];?>
:</p>
                            <p class="payitem__note"><b class="min"><?php echo $_smarty_tpl->tpl_vars['config']->value['enter_from'];?>
</b> - <?php echo $_smarty_tpl->tpl_vars['config']->value['enter_to'];?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</p>
                        </div>
                    </label>
             <?php if ($_smarty_tpl->tpl_vars['p']->value%3 == 0 || $_smarty_tpl->tpl_vars['p']->value == count($_smarty_tpl->tpl_vars['payways']->value)) {?>
              </div>
              </div>
              <div class="payment__tooltip">
                <div class="payment__tooltip_inner">
                    <div class="pay-tooltip">
                    <div class="pay-tooltip__note" style="display: none"><i class="fa fa-exclamation-triangle"></i>
                        <span class="error__info"></span>
                    </div>
                    <div class="pay-tooltip__phone pay-tooltip__number_withplus" style="display: none">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['phone_number'];?>
:
                        <span class="pay-tooltip__input">
                            <input type="tel" name="addons[phone]" maxlength="14" placeholder="70000000000" class="pay-tooltip__phone_inner js-input__inner">
                        </span>
                    </div>
                    <div class="pay-tooltip__summ"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sum'];?>
:
                        <label><input id="p_0_500" type="radio" name="money" value="500"> 500</label>
                        <label><input id="p_0_1000" type="radio" name="money" value="1000"> 1 000</label>
                        <label><input id="p_0_5000" type="radio" name="money" value="5000"> 5 000</label>
                        <input id="l_0_num" type="radio" name="money" value="500" checked="" class="l_num">
                        <div class="pay-tooltip__input input">
                            <input type="text" name="amount" class="input__inner input_summ_val js-input__inner" required="" value="500">
                        </div>
                        <button type="submit" class="pay-tooltip__button button button_color_orange" ><?php echo $_smarty_tpl->tpl_vars['lang']->value['add_funds'];?>
</button>
                    </div>
                </div>
                </div>
            </div>
            </form>
             <?php }?>                       
            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                            <?php if ($_smarty_tpl->tpl_vars['config']->value['pin_use']) {?>                        
                                    <form method="POST" action="/enter?action=send" class="payment-form">
                                        <input type="hidden" name="bonus_id" class="deposit-bonus-id">
                                        <div class="payment__row">
                                            <div class="payment__row-inner">
                                                <label class="payment__item payitem" data-paysys="pin">
                                                    <input type="radio" name="system" value="pin" style="display:none">
                                                    <div class="payitem__img">
                                                        <div class="payitem__img_inner">
                                                            <svg class="svg-qiwi_rub-dims">
                                                                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#qiwi_rub"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="payitem__footer">
                                                        <p class="payitem__note payitem__note_small"><?php echo $_smarty_tpl->tpl_vars['lang']->value['limits'];?>
:</p>
                                                        <p class="payitem__note"><?php echo $_smarty_tpl->tpl_vars['config']->value['enter_from'];?>
 - <?php echo $_smarty_tpl->tpl_vars['config']->value['enter_to'];?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="payment__tooltip">
                                            <div class="payment__tooltip_inner">
                                                <div class="pay-tooltip">
                                                    <div class="pay-tooltip__note" style="display: none"><i class="fa fa-exclamation-triangle"></i>
                                                        <span class="error__info"></span>
                                                    </div>
                                                    <div class="pay-tooltip__pin" style="display: none">
                                                        pin-      :
                                                        <span class="pay-tooltip__input">
                                                        <input type="text" name="pin" maxlength="14" placeholder="xxxxxxxxxx" class="pay-tooltip__pin_inner js-input__inner">
                                                        </span>
                                                        <button type="submit" class="pay-tooltip__button button button_color_orange">                  </button>
                                                    </div>
                                                    <div class="pay-tooltip__summ">
                                                        <?php echo $_smarty_tpl->tpl_vars['lang']->value['sum'];?>
:
                                                        <label><input id="p_0_500" type="radio" name="money" value="500"> 500</label>
                                                        <label><input id="p_0_1000" type="radio" name="money" value="1000"> 1 000</label>
                                                        <label><input id="p_0_5000" type="radio" name="money" value="5000"> 5 000</label>
                                                        <input id="l_0_num" type="radio" name="money" value="500" checked class="l_num">
                                                        <div class="pay-tooltip__input input">
                                                            <input type="text" name="amount" class="input__inner input_summ_val js-input__inner" required value="500">
                                                        </div>
                                                        <button type="submit" class="pay-tooltip__button button button_color_orange">                  </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form> 
                                    <?php }?>
                                </div>
            </div>
        </div>
         <div class="popup_section__aside">
            <div class="aside aside_promo">
                <div class="aside__promo-bonus promo-bonus">
                    <p class="promo-bonus__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['winnings_bonus'];?>
</p>
                    <div class="promo-bonus__img">
                        <img src="" id="bonus-img"/>
                    </div>
                </div>
                <div class="aside__promo-table">
                    <table class="table table_promo">
                        <thead class="table__head">
                            <tr class="table__headrow">
                                <th class="table__cell">#</th>
                                <th class="table__cell table__cell_fluid"><?php echo $_smarty_tpl->tpl_vars['lang']->value['user'];?>
</th>
                                <th class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['win'];?>
</th>
                            </tr>
                        </thead>
                        <tbody class="table__body">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="popup popup_favoritesAdded" style="display:none">
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
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['ok_favorites'];?>
</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_brightblue js-close-popup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['close'];?>
</button>
    </div>
</div>

<div class="popup popup_favoritesAddedFail" style="display:none">
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
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['err_favorites'];?>
</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_brightblue js-close-popup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['close'];?>
</button>
    </div>
</div><?php }
}
