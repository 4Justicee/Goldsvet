<?php
/* Smarty version 3.1.31, created on 2020-02-26 04:04:54
  from "C:\xampp\htdocs\Game_Site\engine\templates\default\login.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5e55e0567219b8_74748216',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5d7d0950fcafa042a2b9c2e7d517b93f3913bbd1' => 
    array (
      0 => 'C:\\xampp\\htdocs\\Game_Site\\engine\\templates\\default\\login.tpl',
      1 => 1572711717,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5e55e0567219b8_74748216 (Smarty_Internal_Template $_smarty_tpl) {
if (!$_smarty_tpl->tpl_vars['login']->value) {?>

<div class="header__toppanel">
    <div class="toppanel">
        <div class="toppanel__title">
            <span class="toppanel__name">   <?php echo $_smarty_tpl->tpl_vars['lang']->value['hello'];?>
</span>
        </div>
        <button class="toppanel__button button js-toppanel-button"><?php echo $_smarty_tpl->tpl_vars['lang']->value['menu'];?>

            <span class="toppanel__icon_menu toppanel__icon"></span>
            <svg class="toppanel__icon toppanel__icon_close svg-cancel svg-cancel-dims">
                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#cancel"></use>
            </svg>
        </button>
    </div>
</div>
<div class="mobile-nav mobile-nav_dropdown js-mobilenav-dropdown">
    <ul class="mobile-nav__list">
        <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg game-hall svg-game-hall-dims">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#game-hall"></use>
                    </svg>
                </span>
            <a class="mobile-nav__link " href="/slots"><?php echo $_smarty_tpl->tpl_vars['lang']->value['games'];?>
</a>
        </li>
        <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg tournament svg-tournament-dims">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#tournament"></use>
                    </svg>
                </span>
            <a class="mobile-nav__link " href="/tournament"><?php echo $_smarty_tpl->tpl_vars['lang']->value['tournament'];?>
</a>
        </li>
        <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg-vip-level svg-vip-level-dims">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#vip-level"></use>
                    </svg>
                </span>
            <a class="mobile-nav__link " href="/vip"><?php echo $_smarty_tpl->tpl_vars['lang']->value['vip_lvl'];?>
</a>
        </li>
    </ul>
</div>
<div class="header__panel">
    <div class="head-panel">
        <div class="head-panel__cell head-panel__cell_fluid">
            <div class="head-panel__signup">
                <div class="signup"><a class="signup__button button button_font_cond button_color_orange" data-toggle="modal" data-target="#registration-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['registration'];?>
</a>
                    <div class="signup__input input input_withbutton">
                        <input placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['15_seconds'];?>
" class="input__inner" disabled>
                    </div>
                </div>
            </div>
        </div>
        <div class="head-panel__cell">
            <a class="head-panel__button button button_font_cond" data-toggle="modal" href="#login-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['enter'];?>
</a>
        </div>
        <div class="head-panel__cell">
                                            <div class="head-panel__caption"><?php echo $_smarty_tpl->tpl_vars['lang']->value['log_in'];?>
:</div>

                <div class="head-panel__socials">

                    <div class="socials" >



<div id="uLogin" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://<?php echo $_smarty_tpl->tpl_vars['config']->value['url'];?>
/registration?ulogin">
    <a class="socials__item" >
        <svg data-uloginbutton = "vkontakte" class="socials__icon svg_vkontakte">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#vkontakte"></use>
        </svg>
    </a>
	
    <a class="socials__item" >
        <svg data-uloginbutton = "odnoklassniki" class="socials__icon svg_odnoklassniki">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#odnoklassniki"></use>
        </svg>
    </a>
	
    <a class="socials__item" >
        <svg data-uloginbutton = "twitter" class="socials__icon svg_twitter">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#twitter"></use>
        </svg>
    </a>
	
    <a class="socials__item" >
        <svg data-uloginbutton = "facebook" class="socials__icon svg_facebook">
            <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#facebook"></use>
        </svg>
    </a>
</div>
                        
                    </div>
                </div>
                    </div>
    </div>
    <div class="mobile-panel">
        <a class="mobile-panel__button button button_color_orange"  data-toggle="modal" data-target="#registration-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['registration'];?>
</a>
        <a class="mobile-panel__button mobile-panel__button_blue button" data-toggle="modal" href="#login-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['enter'];?>
</a>
    </div>
</div>
<?php } else {
if ($_smarty_tpl->tpl_vars['user_info']->value['gift'] == null && ($_smarty_tpl->tpl_vars['status']->value == 5 || $_smarty_tpl->tpl_vars['status']->value == 6)) {
echo '<script'; ?>
 type="text/javascript">

  $(document).ready(function(){
  console.log(<?php echo $_smarty_tpl->tpl_vars['user_info']->value['gift'];?>
);
    $("#registration-modal .popup__footer").hide();
    $("#registration-modal .popup__close").hide();
    $("#registration-modal").show();
    $('#registration-modal [name="bonus"]').data("binding", true);
    $('html').addClass('modal_open');
    $(document).on('change','#registration-modal [name="bonus"]',function(e){
      var gift=this.value;
      $.get("/engine/ajax/user.php?action=set_gift&gift="+gift, function(data){
        if(data.success)
          location.reload();
      },'json');
    
  });
    
  });
<?php echo '</script'; ?>
> 
<?php }?>

<div class="header__toppanel header__toppanel_logged">

    <div class="user-toppanel">
	
        <div class="user-toppanel__title">
            <span class="user-toppanel__name"><?php echo $_smarty_tpl->tpl_vars['lang']->value['hello'];?>
</span>
            <span class="user-toppanel__name"><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</span>
        </div>
		
        <div class="user-toppanel__nav">
            <a href="#cabinet-modal" data-tab="#profile" data-toggle="modal" class="user-toppanel__item user-toppanel__item_profile">
                <span class="user-toppanel__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile'];?>
</span></a>
            <a href="#cabinet-modal" data-tab="#cashier" data-toggle="modal"
               class="user-toppanel__item user-toppanel__item_balance"  >
                <svg class="user-toppanel__icon svg-ruble svg-ruble-dims">
                    <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#ruble"></use>
                </svg>
                <span class="user-toppanel__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['your_balance'];?>
:</span>
                <span class="user-toppanel__note user-toppanel__note_accent"> <?php echo $_smarty_tpl->tpl_vars['balance']->value;?>
</span>
            </a>
            <a href="#cabinet-modal" data-tab="#vip" data-toggle="modal" class="user-toppanel__item user-toppanel__item_vip">
                <svg class="user-toppanel__icon user-toppanel__icon_vip svg-vip svg-ruble-dims">
                    <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#vip"></use>
                </svg>
                <span class="user-toppanel__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['vip_points'];?>
:</span>
                <span class="user-toppanel__note user-toppanel__note_accent"> <?php echo $_smarty_tpl->tpl_vars['user_info']->value['pay_points'];?>
</span>
            </a>
        </div>
		
        <button class="user-toppanel__button button js-userpanel-button"><?php echo $_smarty_tpl->tpl_vars['lang']->value['menu'];?>
<span class="user-toppanel__icon_menu user-toppanel__icon"></span>
            <svg class="user-toppanel__icon user-toppanel__icon_close svg-cancel svg-cancel-dims">
                <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#cancel"></use>
            </svg>
        </button>

        <a href="/logout" class="user-toppanel__action">
            <div class="user-toppanel__note user-toppanel__note_important"><?php echo $_smarty_tpl->tpl_vars['lang']->value['exit'];?>
</div>
        </a>
		
    </div>
	
</div>

<div class="mobile-panel">

    <div class="mobile-panel__action">
	
        <div class="mobile-panel__cashier button button_color_orange button_font_cond" data-tab="#cashier"
             data-toggle="modal" data-target="#cabinet-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['cash'];?>

        </div>
		
        <div class="mobile-panel__countpad countpad" data-tab="#bonuses" data-toggle="modal"
             data-target="#cabinet-modal">
            <i class="countpad__icon">
                <svg class="svg-gift">
                    <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#gift"></use>
                </svg>
            </i>
            <div class="countpad__counter"><?php echo count($_smarty_tpl->tpl_vars['bonuses']->value);?>
</div>
        </div>
		
    </div>
	
</div>

<div class="header__panel header__panel_logged">

    <div class="user-panel">
	
        <div class="user-panel__cell user-panel__cell_status">
            <div class="user-panel__status status">
                <i class="status__icon icon icon_vip-<?php echo $_smarty_tpl->tpl_vars['user_info']->value['rating'];?>
-small"></i>
            </div>
        </div>
		
        <div class="user-panel__cell user-panel__cell_rating">
		
            <div class="user-panel__rating rating">
			
                <div class="rating__summary"><span class="rating__title"><?php echo $_smarty_tpl->tpl_vars['point_cours_row']->value['name'];?>
</span>
				
                    <div class="rating__stars">
					
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
						
                        <div class="rating__info"><i class="icon icon_info-light"></i>
						
                            <div class="rating__tooltip tooltip">
                                <div class="tooltip__content"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_lvl'];?>
</div>
                                <div class="tooltip__arrow"></div>
                            </div>
							
                        </div>
						
                    </div>
                </div>
            </div>
        </div>
		<?php if ($_smarty_tpl->tpl_vars['active_bonus_bar']->value) {?>		
        <div class="user-panel__cell user-panel__cell_bonus">
                            <div class="user-panel__rating rating">
                    <div class="rating__summary">
                        <span class="rating__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['bonus'];?>
:</span>
                        <span class="rating__title rating__title_accent"><?php echo $_smarty_tpl->tpl_vars['active_bonus_bar']->value['sum'];?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
.</span>
                        <div class="rating__bar">
                            <div style="width:<?php echo $_smarty_tpl->tpl_vars['active_bonus_bar']->value['perc'];?>
%" class="rating__inner">
                                <div class="rating__percent"><?php echo $_smarty_tpl->tpl_vars['active_bonus_bar']->value['perc'];?>
%</div>
                            </div>
                            <div class="rating__info"><i class="icon icon_info-light"></i>
                                <div class="rating__tooltip tooltip">
                                    <div class="tooltip__content"><?php echo $_smarty_tpl->tpl_vars['lang']->value['info_wager'];?>
</div>
                                    <div class="tooltip__arrow"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
		<?php }?>
        <div class="user-panel__cell user-panel__cell_action">
            <div class="user-panel__button button button_color_orange button_font_cond" data-tab="#cashier"
                 data-toggle="modal" data-target="#cabinet-modal"><?php echo $_smarty_tpl->tpl_vars['lang']->value['cash'];?>

            </div>
            <div class="user-panel__countpad countpad" data-tab="#bonuses" data-toggle="modal"
                 data-target="#cabinet-modal">
                <i class="countpad__icon">
                    <svg class="svg-gift">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#gift"></use>
                    </svg>
                </i>
                <span class="countpad__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['bonuses'];?>
</span>
                <div class="countpad__counter"><?php echo count($_smarty_tpl->tpl_vars['bonuses']->value);?>
</div>
            </div>
            <a href="#cabinet-modal" data-tab="#profile" data-toggle="modal" class="user-panel__profile">
                <span class="mobile-nav__icon ">
                    <svg class="svg-profile svg-profile-dims">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#profile"></use>
                    </svg>
                </span><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile'];?>

            </a>
            <a href="#cabinet-modal" data-tab="#vip" data-toggle="modal" class="user-panel__vip-points">
                <i class="user-panel_vip-points_icon">
                    <svg class="svg-vip-points svg-vip-points-dims">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#vip-points"></use>
                    </svg>
                </i>
                <span class="user-panel__caption"><?php echo $_smarty_tpl->tpl_vars['lang']->value['vip_points'];?>
:</span>
                <span class="user-panel__caption user-panel__caption_accent"> <?php echo $_smarty_tpl->tpl_vars['user_info']->value['pay_points'];?>
</span>
            </a>
            <a href="/logout" class="user-panel__logout"><?php echo $_smarty_tpl->tpl_vars['lang']->value['exit'];?>
</a>
        </div>

    </div>
	
    <div class="mobile-nav">
        <h5 class="mobile-nav__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['menu_site'];?>
</h5>
        <ul class="mobile-nav__list">
            <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg game-hall svg-game-hall-dims">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#game-hall"></use>
                    </svg>
                </span>
                <a class="mobile-nav__link " href="/slots"><?php echo $_smarty_tpl->tpl_vars['lang']->value['games'];?>
</a>
            </li>
            <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg tournament svg-tournament-dims">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#tournament"></use>
                    </svg>
                </span>
                <a class="mobile-nav__link " href="/tournament"><?php echo $_smarty_tpl->tpl_vars['lang']->value['tournament'];?>
</a>
            </li>
            <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg-vip-level svg-vip-level-dims">
                        <use xlink:href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/svgsprite.svg#vip-level"></use>
                    </svg>
                </span>
                <a class="mobile-nav__link " href="/vip"><?php echo $_smarty_tpl->tpl_vars['lang']->value['vip_lvl'];?>
</a>
            </li>
        </ul>
    </div>
	
</div>
	
<?php }?>

    <div class="header__head-nav">
     <ul class="nav">
      <li class="nav__item"><a class="nav__link " href="/slots"><?php echo $_smarty_tpl->tpl_vars['lang']->value['games'];?>
</a></li>
      <li class="nav__item"><a class="nav__link " href="/tournament"><?php echo $_smarty_tpl->tpl_vars['lang']->value['tournament'];?>
</a></li>
      <li class="nav__item"><a class="nav__link " href="/vip"><?php echo $_smarty_tpl->tpl_vars['lang']->value['vip_lvl'];?>
</a></li>
     </ul>
    </div><?php }
}
