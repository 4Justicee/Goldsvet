<div class="modal" id="login-modal" style="display: none">
    <header class="modal__header">
        <div class="span modal__title">{$lang['auth']}</div>
        <span class="modal__icon icon icon_cancel js-close-popup"></span>
    </header>
    <form action="/engine/ajax/user.php?action=auth" method="POST" data-type="ajax">
        <div class="modal__content">
            <div class="modal__input input">
                <label class="modal__label input__label">{$lang['email']}</label>
                <input placeholder="{$lang['enter_you_email']}" type="text" name="email" class="modal__input-inner input__inner">
            </div>
            <div class="modal__input input">
                <label class="modal__label input__label">{$lang['password']}</label>
                <input placeholder="{$lang['enter_you_password']}" type="password" name="pass" class="modal__input-inner input__inner">
                <span class="modal__caption" data-toggle="modal" data-target=".popup_restorePassword">{$lang['lost_password']}</span>
            </div>
            <div class="modal__error" style="display: none">
                <span class="modal__note modal__note_important"></span>
                <span class="modal__note modal__note_accent"></span>
            </div>
        </div>
        <div class="modal__footer">
            <input type="submit" value="{$lang['enter']}" class="modal__button button_shape_round button_color_orange" />
            <div class="modal__signup-soc">
                <span class="modal__note">{$lang['log_in']}</span>
                <div class="modal__social" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://{$config['url']}/registration?ulogin">
                    <div class="socials socials_undefined">
                        <a class="socials__item" href="#" data-uloginbutton = "vkontakte">
                            <svg class="socials__icon svg_vkontakte">
                                <use xlink:href="{$theme_url}/img/svgsprite.svg#vkontakte"></use>
                            </svg>
                        </a>
                        <a class="socials__item" href="#" data-uloginbutton = "odnoklassniki">
                            <svg class="socials__icon svg_odnoklassniki">
                                <use xlink:href="{$theme_url}/img/svgsprite.svg#odnoklassniki"></use>
                            </svg>
                        </a>
                        <a class="socials__item" href="#" data-uloginbutton = "twitter">
                            <svg class="socials__icon svg_twitter" >
                                <use xlink:href="{$theme_url}/img/svgsprite.svg#twitter"></use>
                            </svg>
                        </a>
                        <a class="socials__item" href="#" data-uloginbutton = "facebook">
                            <svg class="socials__icon svg_facebook">
                                <use xlink:href="{$theme_url}/img/svgsprite.svg#facebook"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="modal__actions">
                <span class="modal__note">{$lang['not_registered_yet']}</span>
                <div class="modal__signup">
                    <div class="signup">
                        <a class="signup__button button button_font_cond" data-toggle="modal" data-target="#registration-modal">{$lang['registration']}</a>
                        <div class="signup__input input input_withbutton">
                            <input placeholder="{$lang['15_seconds']}" class="input__inner" disabled="disabled">
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
            <div class="popup__title">{$lang['recover_password']}</div>
        </div>
        <div class="popup__content">
            <div class="popup__subtitle">{$lang['specify_you_email']}</div>
            <div class="popup__input input">
                <input class="input__inner" type="text" name="email" placeholder="{$lang['email']}">
            </div>
            <div class="modal__error" style="">
                <span class="modal__note modal__note_important"></span>
                <span class="modal__note modal__note_accent"></span>
            </div>
        </div>
        <div class="popup__footer">
            <input type="submit" value="{$lang['restore']}" class="popup__button button button_color_orange" />
        </div>
    </form>
</div>
<div class="popup popup_remindSuccess" style="display:none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['notification']}</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">{$lang['password_send']}</div>
    </div>
    <div class="popup__footer">
        <div class="popup__button button button_color_brightblue js-close-popup">{$lang['close']}</div>
    </div>
</div>
{if !(isset($user_info['gift']) && $user_info['gift']>0)}
<div class="popup popup_chooseBonus" id="registration-modal" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__content">
        <div class="popup__title">{$lang['choose_bonus']}</div>
        <div class="popup__bonuses">
            <div class="bonus">
                {foreach $bonus_reg as $bonus}
                <label for="bonus_{$bonus.id}">
                    <div class="bonus__item">
                        <img src="{$theme_url}/images/bonus/{$bonus.pic}" alt="{$bonus.name}">
                        <div class="bonus__info"><span class="bonus__name">{$bonus.name}</span><span class="bonus__note">{$bonus.desc}</span></div>
                    </div>
                </label>
                <input type="radio" id="bonus_{$bonus.id}" name="bonus" value="{$bonus.id}" style="display:none">
                {/foreach}
                
            </div>
        </div>
    </div>
    <div class="popup__footer">
        <span class="popup__subtitle">{$lang['already_registered']}</span>
        <a class="popup__subtitle popup__subtitle_accent" data-toggle="modal" href="#login-modal">{$lang['enter']}</a>
    </div>
</div>
{/if}

<div class="popup popup_registration" id="registration-confirm" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['registration']}</div>
    </div>
    <div class="popup__content">
        <div class="registration">
            <div class="registration__image" data-toggle="modal" data-target="#registration-modal">
                <img src="" id="selected-bonus-image"/>
                <div class="registration__note">{$lang['change']}</div>
            </div>
            <form method="post" class="registration__form" action="/engine/ajax/user.php?action=register" data-type="ajax" >
                <div class="registration__input input">
                    <input type="hidden" name="gift" id="bonus">
                    <input type="hidden" name="ref" value="{$ref}">
                    <input placeholder="{$lang['enter_email']}" type="text" name="email"  class="registration__input-inner">
                </div>
                <div class="registration__input input">
                    <input placeholder="{$lang['enter_password']}" type="password" name="pass" class="registration__input-inner">
                </div>
                <div class="registration__checkbox checkbox">
                    <input type="checkbox" id="rules" value="1" name="yes" checked="checked" class="checkbox__inner">
                    <label for="rules" class="checkbox__label">{$lang['accept_terms']}</label>
                </div>
                <div class="modal__error" style="display: none">
                    <span class="modal__note modal__note_important"></span>
                </div>
                <button class="registration__button button button_color_orange validate">{$lang['complete']}</button>
            </form>
        </div>
    </div>
    <div class="popup__footer">
        <div class="popup__note">{$lang['registration_social']}</div>
        <div class="popup__socials">
            <div class="socials" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://{$config['url']}/registration?ulogin">
                <a class="socials__item" href="#" data-uloginbutton = "vkontakte">
                    <svg class="socials__icon svg_vkontakte">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#vkontakte"></use>
                    </svg>
                </a>
                <a class="socials__item" href="#" data-uloginbutton = "odnoklassniki">
                    <svg class="socials__icon svg_odnoklassniki">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#odnoklassniki"></use>
                    </svg>
                </a>
                <a class="socials__item" href="#" data-uloginbutton = "twitter">
                    <svg class="socials__icon svg_twitter">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#twitter"></use>
                    </svg>
                </a>
                <a class="socials__item" href="#" data-uloginbutton = "facebook">
                    <svg class="socials__icon svg_facebook">
                        <use xlink:href="{$theme_url}/img/svgsprite.svg#facebook"></use>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
{if $user_id>0}
<div class="popup popup_afterRegistration ps-container ps-theme-hidden" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['welcome']}</div>
    </div>
    <div class="popup__content">
        <div class="popup__title popup__title_accent">{$lang['you_bonus']}</div>
        <div class="bonus bonus_single">
            <div class="bonus__item bonus__item_3">
                <img src="{$theme_url}/images/bonus/{$bonus_reg.pic}">
                <div class="bonus__info"><span class="bonus__name">{$bonus_reg.name}</span><span class="bonus__caption">
                    {$lang['registration_finish']}
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="popup__footer">
        <button data-id="{$bonus_reg.id}" class="activate-bonus popup__button button button_color_orange js-close-popup">{$lang['make_deposit']}</button>
    </div>
    <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 3px;">
        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
    </div>
    <div class="ps-scrollbar-y-rail" style="top: 0px; right: 3px;">
        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
    </div>
</div>
{/if}
<div class="popup popup_emailVerification" style="display:none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['notification']}</div>
    </div>
    <div class="popup__content">
        <div class="popup__caption">{$lang['info_mail_activate']}</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_brightblue js-close-popup">{$lang['close']}</button>
    </div>
</div>

{if isset($games) }
<div class="popup popup_gameplayGallery" style="display: none">
    <div class="popup__content">
        <div class="popup__title">{$lang['info_games']}:</div>
        <div class="popup__gallery">
            {for $i=0;$i<3;$i++}
            {if $game=array_shift(array_shift($games))}
            <li class="main__item preview">
                <div class="preview__item">
                    <img src="{$theme_url}/ico/{$game.g_name}.png" width="238" height="158" class="preview__img" alt="{$game.g_title}">
                    <div class="preview__overlay">
                        <div class="preview__action">
                            <a {if (isset($user_id)&& $user_id>0)}href="/games/{$game.start_path}/{$game.g_name}/real" {else} data-toggle="modal" data-target="#login-modal"{/if} class="preview__button button button_color_orange">{$lang['play']}</a>
                            <br>
                            <a href="/games/{$game.start_path}/{$game.g_name}/demo" class="preview__button preview__button_demo button button_color_green">{$lang['demo']}</a>
                        </div>
                        <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="{$game.g_id}" title='$lang['add_favorites']'></i>
                    </div>
                </div>
                <div class="preview__info">
                    <p class="preview__title">{$game.g_title}</p>
                    <p class="preview__note">{$lang['now_playing']}: {$game.g_counter}</p>
                </div>
            </li>
            {/if}
            {/for}            
        </div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_orange" onclick="$('.popup,.modal').hide()">{$lang['back_game']}</button>
        <a class="popup__close" href="{$referer}">{$lang['exit_lobby']}</a>
    </div>
</div>
{/if}
<div class="popup popup_passwordChanged" style="display:none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['notification']}</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">{$lang['password_send']}</div>
    </div>
    <div class="popup__footer">
        <div class="popup__button button button_color_brightblue js-close-popup">{$lang['close']}</div>
    </div>
</div>
<div class="popup popup_bonusNotification" id="have_active_bonus" style="display:none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['notification']}</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">{$lang['info_bonus']}</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_brightblue js-close-popup">{$lang['close']}</button>
    </div>
</div>
<div class="popup popup_tabs popup_undefined" id="cabinet-modal" style="display: none">
    <div class="tab">
        <div class="tab__action">
            <a href="#cashier" target="_self" class="tab__item" data-toggle="tab">{$lang['cash']}</a>
            <a href="#profile" class="tab__item tab__item_active" data-toggle="tab">{$lang['profile']}</a>
            <a href="#bonuses" target="_self" class="tab__item" data-toggle="tab">{$lang['bonuses']}</a>
            <a href="#vip" target="_self" class="tab__item" data-toggle="tab">VIP</a>
        </div>
        <div class="tab__content">
            <div class="tab-cashier" id="cashier">
                <div class="tab-cashier__header"></div>
                <div class="tab-cashier__content">
                    <div class="tab tab_style_button">
                        <div class="tab__action">
                            <a href="#payment-tab" target="_self" data-toggle="tab" class="tab__item tab__item_active">{$lang['deposit']}</a>
                            <a href="#withdraw-tab" target="_self" data-toggle="tab"  class="tab__item">{$lang['out']}</a>
                            <a href="#history-tab" target="_self" data-toggle="tab" class="tab__item">{$lang['history']}</a>
                        </div>
                        <div class="tab__content">
                            <div id="payment-tab" class="active payment">
                                <div class="payment__gallery">
                                    
                                    
                                
            {assign var=p value=0}
            {foreach $payways as $k=>$payway}
            {if $p++%3==0}
            <form method="POST" action="/enter?system=trioApi&amp;action=send" class="payment-form">
            <input type="hidden" name="bonus_id" class="deposit-bonus-id">
          
              <div class="payment__row">  
              <div class="payment__row-inner">  
            {/if}  
                <label class="payment__item payitem" >
                        <input type="radio" name="psystem" value="{$k}" style="display:none">

                        <div class="payitem__img">
                            <div class="payitem__img_inner">
                                <svg class="svg-card_rub-dims">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="{$theme_url}/img/svgsprite.svg#{$k}"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="payitem__footer">
                            <p class="payitem__note payitem__note_small">{$lang['limits']}:</p>
                            <p class="payitem__note">{$config['enter_from']} - {$config['enter_to']} {$lang['currency']}</p>
                        </div>
                    </label>
             {if $p%3==0 || $p==$payways|count}
              </div>
              </div>
              <div class="payment__tooltip">
                <div class="payment__tooltip_inner">
                    <div class="pay-tooltip">
                    <div class="pay-tooltip__note" style="display: none"><i class="fa fa-exclamation-triangle"></i>
                        <span class="error__info"></span>
                    </div>
                    <div class="pay-tooltip__phone pay-tooltip__number_withplus" style="display: none">
					{$lang['phone_number']}:
                        <span class="pay-tooltip__input">
                            <input type="tel" name="addons[phone]" maxlength="14" placeholder="70000000000" class="pay-tooltip__phone_inner js-input__inner">
                        </span>
                    </div>
                    <div class="pay-tooltip__summ">{$lang['sum']}:
                        <label><input id="p_0_500" type="radio" name="money" value="500"> 500</label>
                        <label><input id="p_0_1000" type="radio" name="money" value="1000"> 1 000</label>
                        <label><input id="p_0_5000" type="radio" name="money" value="5000"> 5 000</label>
                        <input id="l_0_num" type="radio" name="money" value="500" checked="" class="l_num">
                        <div class="pay-tooltip__input input">
                            <input type="text" name="amount" class="input__inner input_summ_val js-input__inner" required="" value="500">
                        </div>
                        <button type="submit" class="pay-tooltip__button button button_color_orange">{$lang['add_funds']}</button>
                    </div>
                </div>
                </div>
            </div>
            </form>
             {/if}                       
                  
            {/foreach}
                                      
            {if $config.pin_use}                        
                                    <form method="POST" action="/enter?action=send" class="payment-form">
                                        <input type="hidden" name="bonus_id" class="deposit-bonus-id">
                                        <div class="payment__row">
                                            <div class="payment__row-inner">
                                                <label class="payment__item payitem" data-paysys="pin">
                                                    <input type="radio" name="system" value="pin" style="display:none">
                                                    <div class="payitem__img">
                                                        <div class="payitem__img_inner">
                                                            <svg class="svg-qiwi_rub-dims">
                                                                <use xlink:href="{$theme_url}/img/svgsprite.svg#qiwi_rub"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="payitem__footer">
                                                        <p class="payitem__note payitem__note_small">{$lang['limits']}:</p>
                                                        <p class="payitem__note">100 - 100000 {$lang['currency']}</p>
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
                                                        pin-код:
                                                        <span class="pay-tooltip__input">
                                                        <input type="text" name="pin" maxlength="14" placeholder="xxxxxxxxxx" class="pay-tooltip__pin_inner js-input__inner">
                                                        </span>
                                                        <button type="submit" class="pay-tooltip__button button button_color_orange">ПОПОЛНИТЬ</button>
                                                    </div>
                                                    <div class="pay-tooltip__summ">
													{$lang['sum']}:
                                                        <label><input id="p_0_500" type="radio" name="money" value="500"> 500</label>
                                                        <label><input id="p_0_1000" type="radio" name="money" value="1000"> 1 000</label>
                                                        <label><input id="p_0_5000" type="radio" name="money" value="5000"> 5 000</label>
                                                        <input id="l_0_num" type="radio" name="money" value="500" checked class="l_num">
                                                        <div class="pay-tooltip__input input">
                                                            <input type="text" name="amount" class="input__inner input_summ_val js-input__inner" required value="500">
                                                        </div>
                                                        <button type="submit" class="pay-tooltip__button button button_color_orange">ПОПОЛНИТЬ</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form> 
            {/if}
                                </div>
                            </div>
                            <div id="withdraw-tab" class="payment">
                                <div class="payment__gallery">
            {assign var=p value=0}
            {foreach $outways as $k=>$outway}
            {if $p++%3==0}
              <form method="POST" action="/engine/ajax/pay.php?paysys=out"  class="payment-form">
          
                <div class="payment__row">  
                <div class="payment__row-inner">  
            {/if} 
                    <label class="payment__item payitem" >
                        <input type="radio" name="ps" value="{$k}" style="display:none" class="payout">

                        <div class="payitem__img">
                            <div class="payitem__img_inner">
                                <svg class="svg-card_rub-dims">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="{$theme_url}/img/svgsprite.svg#{$k}"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="payitem__footer">
                            <p class="payitem__note payitem__note_small">{$lang['limits']}:</p>
                            <p class="payitem__note">{$config['minout']} - {$config['maxout']} {$lang['currency']}</p>
                        </div>
                    </label>
                    
                {if $p%3==0 || $p==$outways|count}
                  </div>
                  </div>
              
                        <div class="payment__tooltip collapse">
                                            <div class="payment__tooltip_inner">
                                                <div class="pay-tooltip">
                                                    <div class="pay-tooltip__note" style="display: none"><i class="fa fa-exclamation-triangle"></i>
                                                        <span class="error__info"></span>
                                                    </div>
                                                    <div class="pay-tooltip__number">
                                                        <span class="pay-tooltip__caption">{$lang['number_purse']}:</span>
                                                        <span class="pay-tooltip__input">
                                                        <input type="text" name="account" placeholder="Z*******" required class="pay-tooltip__number_inner input__inner js-input__inner">
                                                        </span>
                                                    </div>
                                                    <div class="pay-tooltip__input input">{$lang['sum_out']}:
                                                        <input type="text" required placeholder="{$lang['sum']}" name="sum" class="input__inner js-input__inner">
                                                    </div>
                                                    <button type="submit" class="pay-tooltip__button pay-tooltip__button_withdraw button button_color_orange">{$lang['out']}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                      {/if}              
                      {/foreach}
                               
                            </div>
                            </div>
                            
                            <div id="history-tab" class="history">
                                <table class="history__table">
                                    <thead class="history__head">
                                        <tr class="history__row">
                                            <th class="history__cell">{$lang['id']}</th>
                                            <th class="history__cell">{$lang['date']}</th>
                                            <th class="history__cell">{$lang['sum']}</th>
                                            <th class="history__cell">{$lang['system']}</th>
                                            <th class="history__cell">{$lang['type']}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="history__body">
                                        {if $history}
                                        {foreach $history as $row}
                                        <tr class="history__row">
                                            <td class="history__cell">{$row.inv_code}</td>
                                            <td class="history__cell">{$row.date}</td>
                                            <td class="history__cell">{abs($row.sum)} {$lang['currency']}</td>
                                            <td class="history__cell">{$row.paysys}</td>
                                            <td class="history__cell">{$row.type}</td>
                                        </tr>
                                        {/foreach}
                                        {/if}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab__close js-close-popup"></div>
                    </div>
                </div>
            </div>
            {if isset($user_info)}
            <div class="profile active" id="profile">
                <div class="profile__table">
                    <div class="profile__aside">
                        <div class="profile__info">
                            <div class="profile-info">
                                <div class="profile-info__title title title_font_largest">{$login}</div>
                                <div class="profile-info__caption title">{$lang['your_lvl']}</div>
                                <div class="profile-info__status">
                                    <div class="status status_huge">
                                        <div class="status__icon">
                                            <img src="{$theme_url}/img/vip/{$user_info['rating_pic']}" width="110">
                                        </div>
                                        <span class="status__note">{$user_info['rating_name']}</span>
                                    </div>
                                </div>
                                <div class="profile-info__rating">
                                    <div class="rating rating_profile">
                                        <div class="rating__stars rating__stars_large">
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
                                            <div class="rating__info">
                                                <i class="icon icon_info-light"></i>
                                                <div class="rating__tooltip tooltip">
                                                    <div class="tooltip__content">{$lang['info_lvl']}</div>
                                                    <div class="tooltip__arrow"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="rating__summary">
                                            <span class="rating__caption">{$lang['your_balance']}:
                                            <span class="rating__caption_accent">{$balance} {$lang['currency']}</span>
                                            </span>
                                            <span class="rating__title rating__title_large">{$lang['vip_points']}:</span>
                                            <span class="rating__title rating__title_large rating__title_accent">
                                                {$user_info['pay_points']}
                                                <div class="rating__info">
                                                    <i class="icon icon_info-light"></i>
                                                    <div class="rating__tooltip tooltip">
                                                        <div class="tooltip__content">{$lang['info_lvl']}</div>
                                                        <div class="tooltip__arrow"></div>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
								{if $active_bonus_bar}
                                <div class="profile-info__bonus">
                                    <div class="rating rating_profile rating_profile_bonus">
                                        <div class="rating__summary">
                                            <span class="rating__title rating__title_large">{$lang['bonus']}:</span>
                                            <span class="rating__title rating__title_large rating__title_accent">{$active_bonus_bar.sum} {$lang['currency']}</span>
                                        </div>
                                        <div class="rating__bar">
                                            <div style="width:{$active_bonus_bar.perc}%" class="rating__inner">
                                                <div class="rating__percent">{$active_bonus_bar.perc}%</div>
                                            </div>
                                            <div class="rating__info">
                                                <i class="icon icon_info-light"></i>
                                                <div class="rating__tooltip tooltip tooltip_right">
                                                    <div class="tooltip__content">{$lang['info_wager']}</div>
                                                    <div class="tooltip__arrow tooltip__arrow_right"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
								{/if}
                                <div class="profile-info__action">
                                    <button class="profile-info__button button button_color_orange"  data-tab="#cashier" data-toggle="modal" data-target="#cabinet-modal">{$lang['cash']}</button>
                                    <div class="profile-info__icon">
                                        <svg class="svg-money svg-money-dims">
                                            <use xlink:href="{$theme_url}/img/svgsprite.svg#money"></use>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile__main">
                        <form method="post" action="/engine/ajax/user.php?action=edit" data-type="ajax" class="tab-profile__form">
                            <div class="profile-details">
                                <h3 class="profile-details__title title title_align_center">{$lang['personal information']}</h3>
                                <div class="profile-details__action">
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-firstname">
                                            <input type="text" id="profileform-firstname" class="input__inner" name="ProfileForm[firstname]" value="{$user_info['firstname']}" placeholder="{$lang['name']}">
                                            <div class="help-block"></div>
                                        </div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-lastname">
                                            <input type="text" id="profileform-lastname" class="input__inner" name="ProfileForm[lastname]" value="{$user_info['lastname']}" placeholder="{$lang['surname']}">
                                            <div class="help-block"></div>
                                        </div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-login">
                                            <input type="text" id="profileform-login" class="input__inner" name="ProfileForm[login]" value="{$login}" placeholder="{$lang['login']}" disabled=disabled>
                                            <div class="help-block"></div>
                                        </div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-birthday">
                                            <input type="text" id="profileform-birthday" class="input__inner datepicker_birth" name="ProfileForm[birthday]" value="{$user_info['birthday']}" placeholder="{$lang['birthday']}">
                                            <div class="help-block"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-contacts">
                                <h3 class="profile-contacts__title title title_align_center">{$lang['contact_information']}</h3>
                                <div class="profile-contacts__action">
                                    <div class="profile-contacts__item">
                                        <div class="profile-contacts__input input">
                                            <label class="profile-contacts__label input__label"><span class="profile-contacts__label-inner">{$lang['email']}</span>
                                            {if $user_info['mail_active_status']<2}
                                            <span class="profile-contacts__status">{$lang['not_confirmed']}</span>
                                            {else}
                                            <span class="profile-contacts__status profile-contacts__status_confirmed">{$lang['confirmed']}</span>
                                            {/if}
                                            </label>
                                            {if $user_info['mail_active_status']==0}
                                            <a class="profile-contacts__button input__button button button_color_orange" data-verification="email">{$lang['confirm']}</a>
                                            {/if}
                                            <div class="form-group field-profileform-email">
                                                <input type="text" id="profileform-email" class="input__inner input__inner_readonly" name="ProfileForm[email]" value="{$user_info['email']}" readonly placeholder="{{$lang['email']}}">
                                                <div class="help-block"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="profile-contacts__item">
                                        <div class="profile-contacts__input input">
                                            <label class="profile-contacts__label input__label"><span class="profile-contacts__label-inner">{$lang['phone']}</span>
                                            <span class="profile-contacts__status">{$lang['not_confirmed']}</span>
                                            </label>
                                            <a class="profile-contacts__button input__button button button_color_orange" data-verification="phone">{$lang['confirm']}</a>
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
                                <h3 class="profile-socials__title title title_align_center">{$lang['social_network']}</h3>
                                <p class="profile-socials__note">
								{$lang['info_social']}
                                </p>
                                <div class="profile-socials__action">
                                    <div class="socials socials_form" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://{$config['url']}/registration?ulogin">
                                        <a class="socials__item {if array_key_exists('vkontakte',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('vkontakte',$user_info.soc)} data-uloginbutton = "vkontakte"{/if}>
                                            <svg class="socials__icon svg_vkontakte">
                                                <use xlink:href="{$theme_url}/img/svgsprite.svg#vkontakte"></use>
                                            </svg>
                                        </a>
                                        <a class="socials__item {if array_key_exists('odnoklassniki',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('odnoklassniki',$user_info.soc)} data-uloginbutton = "odnoklassniki"{/if}>
                                            <svg class="socials__icon svg_odnoklassniki">
                                                <use xlink:href="{$theme_url}/img/svgsprite.svg#odnoklassniki"></use>
                                            </svg>
                                        </a>
                                        <a class="socials__item {if array_key_exists('twitter',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('twitter',$user_info.soc)} data-uloginbutton = "twitter"{/if}>
                                            <svg class="socials__icon svg_twitter">
                                                <use xlink:href="{$theme_url}/img/svgsprite.svg#twitter"></use>
                                            </svg>
                                        </a>
                                        <a class="socials__item {if array_key_exists('facebook',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('facebook',$user_info.soc)} data-uloginbutton = "facebook"{/if}>
                                            <svg class="socials__icon svg_facebook">
                                                <use xlink:href="{$theme_url}/img/svgsprite.svg#facebook"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="profile__action">
                                <a class="profile__button button button_color_brightblue" data-toggle="modal" data-target=".popup_changePassword">{$lang['change_password']}</a>
                                <button type="submit" class="profile__button profile__button_submit button button_color_orange">{$lang['current_password']}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/if}
            <div class="tab-bonuses" id="bonuses">
                <div class="tab-bonuses__gallery">
                      {foreach $bonuses as $bonus}
                      <div class="tab-bonuses__item">
                          <div class="bonus-panel">
                            <div class="bonus-panel__view">
                                <img src="{$theme_url}/images/bonus/{$bonus.pic}" class="bonus-panel__img">
                            </div>
                            <div class="bonus-panel__info">
                                <p class="bonus-panel__title">{$bonus.name}</p>
                                <p class="bonus-panel__note">
                                    {$bonus.desc}
                                </p>
                            </div>
                            <div class="bonus-panel__action">
                                {if $bonus.status==1}
                                <p class="bonus-panel__title bonus-panel__title_alert">{$lang['bonus_active']}:</p>
                                {else}
                                <p class="bonus-panel__title bonus-panel__title_alert">{$lang['before_end_activation_bonus']}:</p>
                                {/if}
                                <div class="bonus-panel__timer timer">
                                    <div class="timer__table">
                                        {if $bonus.end_time} {$bonus.end_time} {else} {$bonus.start_time+$bonus.activate_time*24*60*60}{/if}
                                        <div class="timer__row timer__row_digit" data-toggle="timer" id="bonus-{$bonus.id}" data-time="{if $bonus.status==1}{$bonus.start_time+$bonus.live_time*24*60*60}{else}{if $bonus.end_time} {$bonus.end_time} {else} {$bonus.start_time+$bonus.activate_time*24*60*60}{/if}{/if}"></div>
                                        <div class="timer__row timer__row_caption">
                                            <div class="timer__cell">{$lang['d']}</div>
                                            <div class="timer__cell timer__cell_empty"></div>
                                            <div class="timer__cell">{$lang['h']}</div>
                                            <div class="timer__cell"></div>
                                            <div class="timer__cell">{$lang['m']}</div>
                                            <div class="timer__cell"></div>
                                            <div class="timer__cell">{$lang['s']}</div>
                                        </div>
                                    </div>
                                    <div class="timer__note_large"></div>
                                </div>
                                {if $bonus.status==1}
                                <div class="bonus-panel__informer bonus-panel__informer_green">{$lang['activated']}</div>
                                {else}
                                <div class="activate-bonus bonus-panel__button button button_shape_round" data-id="{$bonus.id}">{$lang['activate_bonus']}</div>
                                {/if}
                            </div>
                        </div>
                      </div>
                      {/foreach}
                    
                </div>
            </div>
            <div class="vip" id="vip">
                <div class="vip__header">
                    <span class="vip__title">
					{$lang['your_points']}: {$user_info['pay_points']}
                        <span class="vip__icon">
                            <div class="rating__info">
                                <i class="icon icon_info-light"></i>
                                <div class="rating__tooltip rating__tooltip_right tooltip">
                                    <div class="tooltip__content">{$lang['info_lvl']}</div>
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
                                <span class="vip__subtitle">{$lang['sum_points']}</span>
                                <div class="vip__input vip__input_color_white">
                                    <input type="text" id="exchange-input" name="sumpoints" class="input__inner" max="0.00" min="100" data-cours="{$point_cours_row.cours/100}">
                                </div>
                            </div>
                            <div class="vip__cell">
                                <span class="vip__subtitle">{$lang['exchange rate']}</span>
                                <div class="vip__viewrate">100 : {$point_cours_row.cours}</div>
                            </div>
                            <div class="vip__cell">
                                <span class="vip__subtitle">{$lang['you_will_receive']}</span>
                                <div class="vip__input vip__input_color_yellow">
                                    <input type="text" id="exchange-output" class="input__inner" data-cours="{$point_cours_row.cours/100}">
                                </div>
                            </div>
                            <div class="modal__error" style="display: none">
                                <span class="modal__note modal__note_important"></span>
                                <span class="modal__note modal__note_accent"></span>
                            </div>
                        </form>
                    </div>
                    <button class="vip__button button button_color_orange" onclick="$('#exchange-form').submit()">{$lang['exchanged_money']}</button>
                </div>
                <div class="vip__levels-table">
                    <div class="levels-table">
                        <div class="levels-table__table">
                            {foreach $point_courses as $k=>$cours}                    
                            <div class="levels-table__item {if $k==$user_info['rating']} levels-table__item_active{/if}" data-toggle="tab" data-target="#vip_level_description_{$k}">
                                <p class="levels-table__title levels-table__title_small">{$cours.name}</p>
                                <img src="{$theme_url}/img/vip/{$cours.pic}" class="levels-table__icon">
                                <div class="levels-table__ratenote"></div>
                                <span class="levels-table__caption">{$lang['exchange rate']}</span>
                                <div class="levels-table__viewrate">100:{$cours.cours}</div>
                                <a class="levels-table__link">{$lang['more']}</a>
                                <span class="levels-table__arrow {if $k==$user_info['rating']}levels-table__arrow_active{/if}"></span>
                                <div class="levels-table__ratenote levels-table__ratenote_zero">{$cours.range}</div>
                            </div>
                            {/foreach}                   
                        </div>
                        <div class="levels-table__slider">
                            <div class="levels-table__slider-bar">
                                <div class="levels-table__slider-inner" style="width:{$point_bar}%"></div>
                            </div>
                        </div>
                        <div class="tab__content">
                            {foreach $point_courses as $k=>$cours}  
                            <div class="levels-table__info {if $k==$user_info['rating']}active{/if}" id="vip_level_description_{$k}">
                                <div class="levels-table__status">
                                    <div class="levels-table__status-inner status status_huge">
                                        <img src="{$theme_url}/img/vip/{$cours.pic}" class="status__icon">
                                        <span class="status__note">{$cours.name}</span>
                                    </div>
                                </div>
                                <div class="levels-table__summary">
                                    <p class="levels-table__title levels-table__title_accent">{$lang['description']}:</p>
                                    <div class="levels-table__note">{$cours.description}</div>
                                </div>
                            </div>
                            {/foreach}					
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="tab__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
</div>
</div>
<div class="popup popup_changePassword" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['change_password']}</div>
    </div>
    <form action="/engine/ajax/user.php?action=change_pass" method="POST" data-type="ajax" data-answer=".popup_passwordChanged">
        <div class="popup__content">
            <div class="popup__input input">
                <label class="popup__label popup__label_small input__label">{$lang['current_password']}</label>
                <input type="password" name="current_pass" required class="input__inner" placeholder="{$lang['current_password']}">
            </div>
            <div class="popup__input input">
                <label class="popup__label popup__label_small input__label">{$lang['new_password']}</label>
                <input type="password" name="pass" required class="input__inner" placeholder="{$lang['new_password']}">
            </div>
            <div class="popup__input input">
                <label class="popup__label popup__label_small input__label">{$lang['confirm_password']}</label>
                <input type="password" name="re_pass" required class="input__inner" placeholder="{$lang['confirm_password']}">
            </div>
            <div class="modal__error" style="display:none">
                <div class="modal__note_important"></div>
            </div>
        </div>
        <div class="popup__footer">
            <button class="popup__button button button_color_orange">{$lang['change_password']}</button>
        </div>
    </form>
</div>
<div class="popup popup_tabs popup_deposit_for_bonus" id="deposit-for-bonus-modal" style="display: none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__content">
        <p class="popup__title">{$lang['make_deposit_bonus']}</p>
        <p class="popup__title">{$lang['make_deposit_bonus_min']}</p>
        <div class="popup_section__main">
            <div class="payment" style="text-align: center">
                <div class="payment__gallery">
            {assign var=p value=0}
            {foreach $payways as $k=>$payway}
            {if $p++%3==0}
            <form method="POST" action="/enter?system=trioApi&amp;action=send" class="payment-form">
            <input type="hidden" name="bonus_id" class="deposit-bonus-id">
          
              <div class="payment__row">  
              <div class="payment__row-inner">  
            {/if}  
                <label class="payment__item payitem" >
                        <input type="radio" name="psystem" value="{$k}" style="display:none">

                        <div class="payitem__img">
                            <div class="payitem__img_inner">
                                <svg class="svg-card_rub-dims">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="{$theme_url}/img/svgsprite.svg#{$k}"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="payitem__footer">
                            <p class="payitem__note payitem__note_small">{$lang['limits']}:</p>
                            <p class="payitem__note"><b class="min">{$config['enter_from']}</b> - {$config['enter_to']} {$lang['currency']}</p>
                        </div>
                    </label>
             {if $p%3==0 || $p==$payways|count}
              </div>
              </div>
              <div class="payment__tooltip">
                <div class="payment__tooltip_inner">
                    <div class="pay-tooltip">
                    <div class="pay-tooltip__note" style="display: none"><i class="fa fa-exclamation-triangle"></i>
                        <span class="error__info"></span>
                    </div>
                    <div class="pay-tooltip__phone pay-tooltip__number_withplus" style="display: none">
					{$lang['phone_number']}:
                        <span class="pay-tooltip__input">
                            <input type="tel" name="addons[phone]" maxlength="14" placeholder="70000000000" class="pay-tooltip__phone_inner js-input__inner">
                        </span>
                    </div>
                    <div class="pay-tooltip__summ">{$lang['sum']}:
                        <label><input id="p_0_500" type="radio" name="money" value="500"> 500</label>
                        <label><input id="p_0_1000" type="radio" name="money" value="1000"> 1 000</label>
                        <label><input id="p_0_5000" type="radio" name="money" value="5000"> 5 000</label>
                        <input id="l_0_num" type="radio" name="money" value="500" checked="" class="l_num">
                        <div class="pay-tooltip__input input">
                            <input type="text" name="amount" class="input__inner input_summ_val js-input__inner" required="" value="500">
                        </div>
                        <button type="submit" class="pay-tooltip__button button button_color_orange" >{$lang['add_funds']}</button>
                    </div>
                </div>
                </div>
            </div>
            </form>
             {/if}                       
            {/foreach}
                            {if $config.pin_use}                        
                                    <form method="POST" action="/enter?action=send" class="payment-form">
                                        <input type="hidden" name="bonus_id" class="deposit-bonus-id">
                                        <div class="payment__row">
                                            <div class="payment__row-inner">
                                                <label class="payment__item payitem" data-paysys="pin">
                                                    <input type="radio" name="system" value="pin" style="display:none">
                                                    <div class="payitem__img">
                                                        <div class="payitem__img_inner">
                                                            <svg class="svg-qiwi_rub-dims">
                                                                <use xlink:href="{$theme_url}/img/svgsprite.svg#qiwi_rub"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="payitem__footer">
                                                        <p class="payitem__note payitem__note_small">{$lang['limits']}:</p>
                                                        <p class="payitem__note">{$config['enter_from']} - {$config['enter_to']} {$lang['currency']}</p>
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
                                                        pin-код:
                                                        <span class="pay-tooltip__input">
                                                        <input type="text" name="pin" maxlength="14" placeholder="xxxxxxxxxx" class="pay-tooltip__pin_inner js-input__inner">
                                                        </span>
                                                        <button type="submit" class="pay-tooltip__button button button_color_orange">ПОПОЛНИТЬ</button>
                                                    </div>
                                                    <div class="pay-tooltip__summ">
                                                        {$lang['sum']}:
                                                        <label><input id="p_0_500" type="radio" name="money" value="500"> 500</label>
                                                        <label><input id="p_0_1000" type="radio" name="money" value="1000"> 1 000</label>
                                                        <label><input id="p_0_5000" type="radio" name="money" value="5000"> 5 000</label>
                                                        <input id="l_0_num" type="radio" name="money" value="500" checked class="l_num">
                                                        <div class="pay-tooltip__input input">
                                                            <input type="text" name="amount" class="input__inner input_summ_val js-input__inner" required value="500">
                                                        </div>
                                                        <button type="submit" class="pay-tooltip__button button button_color_orange">ПОПОЛНИТЬ</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form> 
                                    {/if}
                                </div>
            </div>
        </div>
         <div class="popup_section__aside">
            <div class="aside aside_promo">
                <div class="aside__promo-bonus promo-bonus">
                    <p class="promo-bonus__title">{$lang['winnings_bonus']}</p>
                    <div class="promo-bonus__img">
                        <img src="" id="bonus-img"/>
                    </div>
                </div>
                <div class="aside__promo-table">
                    <table class="table table_promo">
                        <thead class="table__head">
                            <tr class="table__headrow">
                                <th class="table__cell">#</th>
                                <th class="table__cell table__cell_fluid">{$lang['user']}</th>
                                <th class="table__cell">{$lang['win']}</th>
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
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['notification']}</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">{$lang['ok_favorites']}</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_brightblue js-close-popup">{$lang['close']}</button>
    </div>
</div>

<div class="popup popup_favoritesAddedFail" style="display:none">
    <div class="popup__close js-close-popup">
        <svg class="svg__close svg-close-dims">
            <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
        </svg>
    </div>
    <div class="popup__head">
        <div class="popup__title">{$lang['notification']}</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">{$lang['err_favorites']}</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_color_brightblue js-close-popup">{$lang['close']}</button>
    </div>
</div>