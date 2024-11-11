{if !$login}

<div class="header__toppanel">
    <div class="toppanel">
        <div class="toppanel__title">
            <span class="toppanel__name">﻿{$lang['hello']}</span>
        </div>
        <button class="toppanel__button button js-toppanel-button">{$lang['menu']}
            <span class="toppanel__icon_menu toppanel__icon"></span>
            <svg class="toppanel__icon toppanel__icon_close svg-cancel svg-cancel-dims">
                <use xlink:href="{$theme_url}/img/svgsprite.svg#cancel"></use>
            </svg>
        </button>
    </div>
</div>
<div class="mobile-nav mobile-nav_dropdown js-mobilenav-dropdown">
    <ul class="mobile-nav__list">
        <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg game-hall svg-game-hall-dims">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#game-hall"></use>
                    </svg>
                </span>
            <a class="mobile-nav__link " href="/slots">{$lang['games']}</a>
        </li>
        <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg tournament svg-tournament-dims">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#tournament"></use>
                    </svg>
                </span>
            <a class="mobile-nav__link " href="/tournament">{$lang['tournament']}</a>
        </li>
        <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg-vip-level svg-vip-level-dims">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#vip-level"></use>
                    </svg>
                </span>
            <a class="mobile-nav__link " href="/vip">{$lang['vip_lvl']}</a>
        </li>
    </ul>
</div>
<div class="header__panel">
    <div class="head-panel">
        <div class="head-panel__cell head-panel__cell_fluid">
            <div class="head-panel__signup">
                <div class="signup"><a class="signup__button button button_font_cond button_color_orange" data-toggle="modal" data-target="#registration-modal">{$lang['registration']}</a>
                    <div class="signup__input input input_withbutton">
                        <input placeholder="{$lang['15_seconds']}" class="input__inner" disabled>
                    </div>
                </div>
            </div>
        </div>
        <div class="head-panel__cell">
            <a class="head-panel__button button button_font_cond" data-toggle="modal" href="#login-modal">{$lang['enter']}</a>
        </div>
        <div class="head-panel__cell">
                                            <div class="head-panel__caption">{$lang['log_in']}:</div>

                <div class="head-panel__socials">

                    <div class="socials" >



<div id="uLogin" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://{$config['url']}/registration?ulogin">
    <a class="socials__item" >
        <svg data-uloginbutton = "vkontakte" class="socials__icon svg_vkontakte">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#vkontakte"></use>
        </svg>
    </a>
	
    <a class="socials__item" >
        <svg data-uloginbutton = "odnoklassniki" class="socials__icon svg_odnoklassniki">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#odnoklassniki"></use>
        </svg>
    </a>
	
    <a class="socials__item" >
        <svg data-uloginbutton = "twitter" class="socials__icon svg_twitter">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#twitter"></use>
        </svg>
    </a>
	
    <a class="socials__item" >
        <svg data-uloginbutton = "facebook" class="socials__icon svg_facebook">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#facebook"></use>
        </svg>
    </a>
</div>
                        
                    </div>
                </div>
                    </div>
    </div>
    <div class="mobile-panel">
        <a class="mobile-panel__button button button_color_orange"  data-toggle="modal" data-target="#registration-modal">{$lang['registration']}</a>
        <a class="mobile-panel__button mobile-panel__button_blue button" data-toggle="modal" href="#login-modal">{$lang['enter']}</a>
    </div>
</div>
{else}
{if $user_info.gift==null && ($status==5 || $status==6)}
<script type="text/javascript">

  $(document).ready(function(){
  console.log({$user_info.gift});
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
</script> 
{/if}

<div class="header__toppanel header__toppanel_logged">

    <div class="user-toppanel">
	
        <div class="user-toppanel__title">
            <span class="user-toppanel__name">{$lang['hello']}</span>
            <span class="user-toppanel__name">{$login}</span>
        </div>
		
        <div class="user-toppanel__nav">
            <a href="#cabinet-modal" data-tab="#profile" data-toggle="modal" class="user-toppanel__item user-toppanel__item_profile">
                <span class="user-toppanel__note">{$lang['profile']}</span></a>
            <a href="#cabinet-modal" data-tab="#cashier" data-toggle="modal"
               class="user-toppanel__item user-toppanel__item_balance"  >
                <svg class="user-toppanel__icon svg-ruble svg-ruble-dims">
                    <use xlink:href="{$theme_url}/img/svgsprite.svg#ruble"></use>
                </svg>
                <span class="user-toppanel__note">{$lang['your_balance']}:</span>
                <span class="user-toppanel__note user-toppanel__note_accent"> {$balance}</span>
            </a>
            <a href="#cabinet-modal" data-tab="#vip" data-toggle="modal" class="user-toppanel__item user-toppanel__item_vip">
                <svg class="user-toppanel__icon user-toppanel__icon_vip svg-vip svg-ruble-dims">
                    <use xlink:href="{$theme_url}/img/svgsprite.svg#vip"></use>
                </svg>
                <span class="user-toppanel__note">{$lang['vip_points']}:</span>
                <span class="user-toppanel__note user-toppanel__note_accent"> {$user_info['pay_points']}</span>
            </a>
        </div>
		
        <button class="user-toppanel__button button js-userpanel-button">{$lang['menu']}<span class="user-toppanel__icon_menu user-toppanel__icon"></span>
            <svg class="user-toppanel__icon user-toppanel__icon_close svg-cancel svg-cancel-dims">
                <use xlink:href="{$theme_url}/img/svgsprite.svg#cancel"></use>
            </svg>
        </button>

        <a href="/logout" class="user-toppanel__action">
            <div class="user-toppanel__note user-toppanel__note_important">{$lang['exit']}</div>
        </a>
		
    </div>
	
</div>

<div class="mobile-panel">

    <div class="mobile-panel__action">
	
        <div class="mobile-panel__cashier button button_color_orange button_font_cond" data-tab="#cashier"
             data-toggle="modal" data-target="#cabinet-modal">{$lang['cash']}
        </div>
		
        <div class="mobile-panel__countpad countpad" data-tab="#bonuses" data-toggle="modal"
             data-target="#cabinet-modal">
            <i class="countpad__icon">
                <svg class="svg-gift">
                    <use xlink:href="{$theme_url}/img/svgsprite.svg#gift"></use>
                </svg>
            </i>
            <div class="countpad__counter">{count($bonuses)}</div>
        </div>
		
    </div>
	
</div>

<div class="header__panel header__panel_logged">

    <div class="user-panel">
	
        <div class="user-panel__cell user-panel__cell_status">
            <div class="user-panel__status status">
                <i class="status__icon icon icon_vip-{$user_info['rating']}-small"></i>
            </div>
        </div>
		
        <div class="user-panel__cell user-panel__cell_rating">
		
            <div class="user-panel__rating rating">
			
                <div class="rating__summary"><span class="rating__title">{$point_cours_row.name}</span>
				
                    <div class="rating__stars">
					
                        {foreach $point_courses as $k=>$cours}
                        {if $k<=$user_info['rating']}
                        <svg class="rating__icon svg-star">
                            <use xlink:href="{$theme_url}/img/svgsprite.svg#star-filled"></use>
                        </svg>
                        {else}
                        <svg class="rating__icon svg-star_disabled svg-star">
                            <use xlink:href="{$theme_url}/img/svgsprite.svg#star"></use>
                        </svg>
                        {/if}
                        {/foreach}
                        
                    </div>
					
                    <div class="rating__bar">
					
                        <div style="width:{round($user_info['payin_total']/$point_courses[$user_info['rating']+1].range*100)}%" class="rating__inner">
                            <div class="rating__percent">{round($user_info['payin_total']/$point_courses[$user_info['rating']+1].range*100)}%</div>
                        </div>
						
                        <div class="rating__info"><i class="icon icon_info-light"></i>
						
                            <div class="rating__tooltip tooltip">
                                <div class="tooltip__content">{$lang['info_lvl']}</div>
                                <div class="tooltip__arrow"></div>
                            </div>
							
                        </div>
						
                    </div>
                </div>
            </div>
        </div>
		{if $active_bonus_bar}		
        <div class="user-panel__cell user-panel__cell_bonus">
                            <div class="user-panel__rating rating">
                    <div class="rating__summary">
                        <span class="rating__title">{$lang['bonus']}:</span>
                        <span class="rating__title rating__title_accent">{$active_bonus_bar.sum} {$lang['currency']}.</span>
                        <div class="rating__bar">
                            <div style="width:{$active_bonus_bar.perc}%" class="rating__inner">
                                <div class="rating__percent">{$active_bonus_bar.perc}%</div>
                            </div>
                            <div class="rating__info"><i class="icon icon_info-light"></i>
                                <div class="rating__tooltip tooltip">
                                    <div class="tooltip__content">{$lang['info_wager']}</div>
                                    <div class="tooltip__arrow"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
		{/if}
        <div class="user-panel__cell user-panel__cell_action">
            <div class="user-panel__button button button_color_orange button_font_cond" data-tab="#cashier"
                 data-toggle="modal" data-target="#cabinet-modal">{$lang['cash']}
            </div>
            <div class="user-panel__countpad countpad" data-tab="#bonuses" data-toggle="modal"
                 data-target="#cabinet-modal">
                <i class="countpad__icon">
                    <svg class="svg-gift">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#gift"></use>
                    </svg>
                </i>
                <span class="countpad__title">{$lang['bonuses']}</span>
                <div class="countpad__counter">{count($bonuses)}</div>
            </div>
            <a href="#cabinet-modal" data-tab="#profile" data-toggle="modal" class="user-panel__profile">
                <span class="mobile-nav__icon ">
                    <svg class="svg-profile svg-profile-dims">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#profile"></use>
                    </svg>
                </span>{$lang['profile']}
            </a>
            <a href="#cabinet-modal" data-tab="#vip" data-toggle="modal" class="user-panel__vip-points">
                <i class="user-panel_vip-points_icon">
                    <svg class="svg-vip-points svg-vip-points-dims">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#vip-points"></use>
                    </svg>
                </i>
                <span class="user-panel__caption">{$lang['vip_points']}:</span>
                <span class="user-panel__caption user-panel__caption_accent"> {$user_info['pay_points']}</span>
            </a>
            <a href="/logout" class="user-panel__logout">{$lang['exit']}</a>
        </div>

    </div>
	
    <div class="mobile-nav">
        <h5 class="mobile-nav__title">{$lang['menu_site']}</h5>
        <ul class="mobile-nav__list">
            <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg game-hall svg-game-hall-dims">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#game-hall"></use>
                    </svg>
                </span>
                <a class="mobile-nav__link " href="/slots">{$lang['games']}</a>
            </li>
            <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg tournament svg-tournament-dims">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#tournament"></use>
                    </svg>
                </span>
                <a class="mobile-nav__link " href="/tournament">{$lang['tournament']}</a>
            </li>
            <li class="mobile-nav__item">
                <span class="mobile-nav__icon ">
                    <svg class="svg-vip-level svg-vip-level-dims">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#vip-level"></use>
                    </svg>
                </span>
                <a class="mobile-nav__link " href="/vip">{$lang['vip_lvl']}</a>
            </li>
        </ul>
    </div>
	
</div>
	
{/if}

    <div class="header__head-nav">
     <ul class="nav">
      <li class="nav__item"><a class="nav__link " href="/slots">{$lang['games']}</a></li>
      <li class="nav__item"><a class="nav__link " href="/tournament">{$lang['tournament']}</a></li>
      <li class="nav__item"><a class="nav__link " href="/vip">{$lang['vip_lvl']}</a></li>
     </ul>
    </div>