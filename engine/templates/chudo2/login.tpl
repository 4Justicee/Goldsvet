{if $user_id}
  <div class="header-log-in">
    <div class="top">
        <div class="row">
            <div class="item">
                <div class="header-user-name">
                    <p>Привет, <b>{$login}</b></p>
                </div>
            </div>
            <div class="item cloned hidden">
                <div class="header-top-link">
                    <a href="/profile">
                        <img src="{$theme_url}/images/header-top-img-1.png" alt="">
                        <span>Профиль</span>
                    </a>
                </div>
            </div>
            <div class="item">
                <div class="header-top-text">
                    <a href="#cashbox" class="fancybox-cashbox-form">
                        Баланс: &nbsp; <b> {$balance} {$lang['currency']}.</b>
                    </a>
                </div>
            </div>
            <div class="item">
                <div class="header-top-text">
                    <a href="/exchange" >
                        Монеты: &nbsp; <b>{$user_info['pay_points']}</b>
                    </a>
                </div>
            </div>
            <div class="item hidden-mobile">
                <div class="header-top-link">
                    <a href="/profile">
                        <img src="{$theme_url}/images/header-top-img-1.png" alt="">
                        <span>Счет</span>
                    </a>
                </div>
            </div>
            <div class="item support">
                <div class="header-top-link">
                    <a href="#" onclick="$('#sh_button').click()">
                        <img src="{$theme_url}/images/header-top-img-2.png" alt="">
                        <span>Поддержка</span>
                    </a>
                </div>
            </div>
            <div class="item logout">
                <div class="header-top-link">
                    <a href="/logout">
                        <img src="{$theme_url}/images/header-top-img-3.png" alt="">
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="row">
            <div class="item-params">
                <div class="item item-1">
                    <div class="item-img">
                        <img src="{$theme_url}/images/thumb_cache__70x60_738ae79c0d93ae0308d979a32ba828c6.png" alt="">
                    </div>
                    <div class="item-description">
                        <div class="item-text">
                            <div class="item-text-left">Ученик</div>
                            <div class="item-text-right">

                                <div class="item-text-icon">
                                    <span>i</span>
                                    <div class="item-text-hidden">
                                        <p>Вам нужно набрать 3000 монет для получения следующего уровня</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item-progres">
                            <div class="progress-line" data-value="0">
                                <div class="progress-line-background">
                                    <img src="{$theme_url}/images/progress-line-background-header.png" alt="">
                                </div>
                                <div class="progress-line-value" style="width: 0%;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                            </div>
            <div class="item-button">
                <div class="button-purple button-whith-img">
                    <a href="#bonus-popup" class="fancybox-bonus">
                                            <span>
                                                <span class="img">
                                                    <img src="{$theme_url}/images/header-purple-button-1.png" alt="">
                                                </span>
                                                <span class="circle">{count($bonuses)}</span>
                                            </span>
                        <img src="{$theme_url}/images/img-header-purple-button-normal.png" alt="" class="normal">
                        <img src="{$theme_url}/images/img-header-purple-button-hover.png" alt="" class="hover">
                    </a>
                </div>
                <!-- <div class="button-purple button-whith-img">
                    <a href="#change-pass-popup" class="fancybox-form">
                                            <span>
                                                <span class="img">
                                                    <img src="{$theme_url}/images/header-purple-button-2.png" alt="">
                                                </span>
                                                <span class="circle">13</span>
                                            </span>
                        <img src="{$theme_url}/images/img-header-purple-button-normal.png" alt="" class="normal">
                        <img src="{$theme_url}/images/img-header-purple-button-hover.png" alt="" class="hover">
                    </a>
                </div>-->
                <div class="button-red button-whith-img">
                    <a href="#cashbox" class="fancybox-cashbox-form">
                        <span>Касса</span>
                        <img src="{$theme_url}/images/img-header-bottom-button-normal.png" alt="" class="normal">
                        <img src="{$theme_url}/images/img-header-bottom-button-hover.png" alt="" class="hover">
                    </a>
                </div>

            </div>
        </div>
    </div>
</div>

{else}
  <div class="center" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://{$config['url']}/registration?ulogin">
            <p class="linear-yellow">﻿Войти через</p>
    <ul>
                    <li>
                <a class="socials__item {if array_key_exists('vkontakte',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('vkontakte',$user_info.soc)} data-uloginbutton = "vkontakte"{/if}>
                    <img src="{$theme_url}/images/header-center-vkontakte.png" alt=""/>
                    <img src="{$theme_url}/images/header-center-vkontakte-active.png" alt=""
                         class="hover"/>
                </a>
            </li>
                    <li>
                <a class="socials__item {if array_key_exists('odnoklassniki',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('odnoklassniki',$user_info.soc)} data-uloginbutton = "odnoklassniki"{/if}>
                    <img src="{$theme_url}/images/header-center-odnoklassniki.png" alt=""/>
                    <img src="{$theme_url}/images/header-center-odnoklassniki-active.png" alt=""
                         class="hover"/>
                </a>
            </li>
                    <li>
                <a class="socials__item {if array_key_exists('twitter',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('twitter',$user_info.soc)} data-uloginbutton = "twitter"{/if}>
                    <img src="{$theme_url}/images/header-center-twitter.png" alt=""/>
                    <img src="{$theme_url}/images/header-center-twitter-active.png" alt=""
                         class="hover"/>
                </a>
            </li>
                    <li>
                <a class="socials__item {if array_key_exists('facebook',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('facebook',$user_info.soc)} data-uloginbutton = "facebook"{/if}>
                    <img src="{$theme_url}/images/header-center-facebook.png" alt=""/>
                    <img src="{$theme_url}/images/header-center-facebook-active.png" alt=""
                         class="hover"/>
                </a>
            </li>
        
    </ul>

</div>
<div class="right-buttons">
    <div class="item">

        <a data-piwik-event="Registration, Open, Gift_Popup_Step_1" href="#registration-modal" class="red fancybox-registration">
            <img src="{$theme_url}/images/right-button-red.png" alt="">
            <img src="{$theme_url}/images/right-button-red-hover.png" class="hover" alt="">
            <span>Регистрация</span>
        </a>
        <img src="{$theme_url}/images/right-buttons-arrow.png" alt="" class="mobile-hidden">
        <p class="linear-yellow">Только 15 секунд</p>
    </div>
    <div class="item">
        <a href="#enter-popup" class="green fancybox-enter">
            <img src="{$theme_url}/images/ight-button-gren.png" alt="">
            <img src="{$theme_url}/images/right-button-gren-hover.png" class="hover"
                 alt=""><span>Войти</span>
        </a>
    </div>
</div>
{/if}