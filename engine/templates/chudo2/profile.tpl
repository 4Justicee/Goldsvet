<div class="bonus-nav">
    <div class="bonus-nav-item ">
        <a href="/exchange">
            <div class="title-inside">
                <span>Мой уровень</span>
            </div>
        </a>
    </div>
    <div class="bonus-nav-item active">
        <a href="#">
            <div class="title-inside">
                <span class="h1">Мой счет</span>
            </div>
        </a>
    </div>
</div>

<div class="profile-page-wrap">
    <div class="trading-block">

        <div class="bonuse-page-shadows top">
            <img src="/engine/templates/chudoslot/images/shadow-bonuse-page.png" alt="">
        </div>
        <div class="bonuse-page-shadows bottom">
            <img src="/engine/templates/chudoslot/images/shadow-bonuse-page.png" alt="">
        </div>
        <div class="mbox has-shadow static-shadow">
            <div class="profile-middle trading-block-main">
                <div class="profile-main">

                    <div class="profile-main-wrap">
                        <div class="profile-name">
                            <p class="linear-yellow">{$login}</p>
                        </div>
                        <div class="profile-lvl-title">
                            Ваш уровень
                        </div>
                        <div class="profile-lvl">
                            <div class="item">
                                <div class="item-img">
                                    <img src="{$theme_url}/img/vip/{$user_info['rating_pic']}" alt="">
                                </div>
                                <div class="item-star">
                                    <ul>
                                            {for $i=1;$i<6;$i++ }
                                            
                                            <li class="active">
                                                <img src="{$theme_url}/images/profile-lvl-img-star-full.png" alt="">
                                                <img src="{$theme_url}/images/profile-lvl-img-star-active.png" alt="" class="active-star">
                                            </li>
                                            {/for}
                                            
                                            {*
                                            <li class="active">
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-full.png" alt="">
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-active.png" alt="" class="active-star">
                                            </li>
                                        
                                                                                    <li>
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-full.png" alt="">
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-active.png" alt="" class="active-star">
                                            </li>
                                                                                    <li>
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-full.png" alt="">
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-active.png" alt="" class="active-star">
                                            </li>
                                                                                    <li>
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-full.png" alt="">
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-active.png" alt="" class="active-star">
                                            </li>
                                                                                    <li>
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-full.png" alt="">
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-active.png" alt="" class="active-star">
                                            </li>
                                                                                    <li>
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-full.png" alt="">
                                                <img src="/engine/templates/chudoslot/images/profile-lvl-img-star-active.png" alt="" class="active-star">
                                            </li> *}
                                        
                                    </ul>
                                </div>
                                <div class="item-progres">
                                    <div class="progress-line" data-value="0">
                                        <div class="progress-line-background">
                                            <img src="{$theme_url}/images/progress-line-background-header.png" alt="">
                                        </div>
                                        <div class="progress-line-value" style="width: {round($user_info['payin_total']/$point_courses[$user_info['rating']+1].range*100)}%;">
                                        </div>
                                    </div>
                                    <div class="item-text-icon">
                                        <span>i</span>
                                        <div class="item-text-hidden">
                                            <p>Вам нужно набрать {$point_courses[$user_info['rating']+1].range-$user_info['payin_total']} монет для получения следующего уровня</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-table">
                                    <div class="item-row">
                                        <div class="item-cell"><p>Баланс</p></div>
                                        <div class="item-cell"><p class="linear-yellow">{$balance} {$lang['currency']}.</p>
                                        </div>
                                    </div>
                                    <div class="item-row">
                                        <div class="item-cell"><p>Монеты</p></div>
                                        <div class="item-cell"><p class="linear-yellow">{$user_info['pay_points']}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                                    </div>
                        <div class="profile-button button-whith-img">
                            <a href="#cashbox" class="fancybox-cashbox-form">
                                <span>Касса</span>
                                <img src="{$theme_url}/images/profile-button-hover.png" class="hover" alt="">
                                <img src="{$theme_url}/images/profile-button-normal.png" class="normal" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="profile-data">
                                        <form method="post" action="/engine/ajax/profile.php" id="profile-data" data-type="ajax" class="tab-profile__form" novalidate="novalidate">
                        <input name="csrf_token" value="f37fc0f169a0b92b10063b41cec8f4f86e393b9763f646898fc8582bfb033242" type="hidden">
                        <div class="form-row row-1">
                            <div class="profile-data-title">
                                <p>Твоя информация</p>
                            </div>
                            <div class="profile-data-inputs">
                                <div class="form_row">
                                    <div class="form_input field-profileform-firstname">

<input type="text" id="profileform-firstname" class="input__inner" name="ProfileForm[firstname]" placeholder="Имя" value="{$user_info['firstname']}">

<div class="help-block"></div>
</div>

                                    <div class="form_input field-profileform-lastname">

<input type="text" id="profileform-lastname" class="input__inner" name="ProfileForm[lastname]" placeholder="Фамилия" value="{$user_info['lastname']}">

<div class="help-block"></div>
</div>
                                </div>
                                <div class="form_row">
                                    <div class="form_input field-profileform-login required" aria-required="true">

<input type="text" id="profileform-login" class="input__inner" name="ProfileForm[login]" value="{$login}" placeholder="Login" aria-required="true">

<div class="help-block"></div>
</div>

                                    <div class="form_input field-datepicker">

<input type="text" id="datepicker" class="input__inner datepicker_birth hasDatepicker" name="ProfileForm[birthday]" placeholder="День рождения" value="{$user_info['birthday']}">

<div class="help-block"></div>
</div>

                                </div>
                            </div>
                        </div>
                        <div class="form-row row-2">
                            <div class="profile-data-title">
                                <p>Ваши контакты</p>
                            </div>
                            <div class="profile-data-inputs">
                                <div class="form_row">
                                    <div class="form_input">
                                        <div class="input-title">Почта</div>
                                          {*
                                        {if $user_info['mail_active_status']<2}
                                            <span class="profile-contacts__status">{$lang['not_confirmed']}</span>
                                            {else}
                                            <span class="profile-contacts__status profile-contacts__status_confirmed">{$lang['confirmed']}</span>
                                            {/if}
                                            </label>
                                            {if $user_info['mail_active_status']==0}
                                            <a class="profile-contacts__button input__button button button_color_orange" data-verification="email">{$lang['confirm']}</a>
                                            {/if}
                                          *}
                                        <div class="input-button ">
                                            <div class="confirm button-whith-img">
                                                <a href="#" data-verification="email">
                                                    <span>Подтвердить</span>
                                                    <img src="{$theme_url}/images/profile-button-confirm-normal.png" class="hover" alt="">
                                                    <img src="{$theme_url}/images/profile-button-confirm-normal.png" class="normal" alt="">
                                                </a>
                                            </div>
                                            <div class="success">
                                                <img src="{$theme_url}/images/profile-button-confirm-succes.png" alt="">
                                            </div>
                                        </div>


                                                                                    <div class="form-group field-profileform-email">
<input type="text" id="profileform-email" class="input__inner" name="ProfileForm[email]" value="{$user_info['email']}" disabled="true" placeholder="Почта"><div class="help-block"></div>
</div>
                                        

                                    </div>
                                    <div class="form_input">
                                        <div class="input-title">Телефон</div>
                                        <div class="input-button ">
                                            <div class="confirm button-whith-img">
                                                <a href="#" data-verification="phone">
                                                    <span>Подтвердить</span>
                                                    <img src="{$theme_url}/images/profile-button-confirm-normal.png" class="hover" alt="">
                                                    <img src="{$theme_url}/images/profile-button-confirm-normal.png" class="normal" alt="">
                                                </a>
                                            </div>
                                            <div class="success">
                                                <img src="{$theme_url}/profile-button-confirm-succes.png" alt="">
                                            </div>
                                        </div>
                                        <div class="form-group field-profileform-phone">
<input type="text" id="profileform-phone" class="input__inner" name="ProfileForm[phone]" placeholder="+00000000000" value="{$user_info['phone']}"><div class="help-block"></div>
</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row row-2 cabinet-promo">
                            <div class="profile-data-title">
                                <p>ПРОМО-КОД</p>
                            </div>
                            <div class="profile-data-inputs">
                                <div class="form_row">
                                    <div class="promo--success" style="display: none;">
                                        <b>Спасибо!</b>
                                        <p>Ваш промо-код обработан. Ваш подарок уже находится в разделе
                                            <a class="fancybox-bonus" href="#bonus-popup">Бонусы</a>
                                        </p>
                                        <a href="#bonus-popup" class="fancybox-bonus button-whith-img ok_promo">
                                            <button>
                                                <span style="top: 1px;">OK</span>
                                                <img src="{$theme_url}/images/profile-form-submit-hover.png" class="hover" alt="" style="height: 20px;">
                                                <img src="{$theme_url}/images/profile-form-submit-normal.png" class="normal" alt="" style="height: 20px;">
                                            </button>
                                        </a>
                                    </div>
                                    <div class="form_input">
                                        <p class="cabinet-promo__note">
                                            Только латинские символы
                                        </p>
                                        <div class="form-group field-profile cabinet-promo__input ">
                                            <div class="input-button ">
                                                <div class="confirm cabinet-promo__button button-whith-img">
                                                    <a href="javascript:void(0)" id="promo_code_value" data-id="370351">
                                                        <span>ПРИМЕНИТЬ</span>
                                                        <img src="{$theme_url}/images/profile-button-confirm-normal.png" class="hover" alt="">
                                                        <img src="{$theme_url}/images/profile-button-confirm-normal.png" class="normal" alt="">
                                                    </a>
                                                </div>
                                                <div class="success">
                                                    <img src="{$theme_url}/images/profile-button-confirm-succes.png" alt="">
                                                </div>
                                            </div>
                                            <input type="text" id="promo_code" class="input__inner" placeholder="...">
                                            <div class="help-block">
                                                <span class="error promo_error" style="display: none;">Вы ввели несуществующий промо-код</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="form-row row-3">
                                        <div class="profile-data-title">
        <p>Социальные сети</p>
    </div>
    <div class="ocial-list">
    <ul>
                    <li class="">
                <a class="socials__item {if array_key_exists('vkontakte',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('vkontakte',$user_info.soc)} data-uloginbutton = "vkontakte"{/if}>
                    <img src="{$theme_url}/images/profile-ocial-icon-normal-vkontakte.png" alt="">
                    <img src="{$theme_url}/images/profile-ocial-icon-hover-vkontakte.png" alt="" class="hover"></a>
            </li>
                    <li class="">
                <a class="socials__item {if array_key_exists('odnoklassniki',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('odnoklassniki',$user_info.soc)} data-uloginbutton = "odnoklassniki"{/if}>
                    <img src="{$theme_url}/images/profile-ocial-icon-normal-odnoklassniki.png" alt="">
                    <img src="{$theme_url}/images/profile-ocial-icon-hover-odnoklassniki.png" alt="" class="hover"></a>
            </li>
                    <li class="">
                <a class="socials__item {if array_key_exists('twitter',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('twitter',$user_info.soc)} data-uloginbutton = "twitter"{/if}>
                    <img src="{$theme_url}/images/profile-ocial-icon-normal-twitter.png" alt="">
                    <img src="{$theme_url}/images/profile-ocial-icon-hover-twitter.png" alt="" class="hover"></a>
            </li>
                    <li class="">
                <a class="socials__item {if array_key_exists('facebook',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('facebook',$user_info.soc)} data-uloginbutton = "facebook"{/if}>
                    <img src="{$theme_url}/images/profile-ocial-icon-normal-facebook.png" alt="">
                    <img src="{$theme_url}/images/profile-ocial-icon-hover-facebook.png" alt="" class="hover"></a>
            </li>
        
    </ul>

    <div class="ocial-text">
        <p> Прикрепите Ваш аккаунт в социальной сети к профилю в казино. И вы сможете легко входить в аккаунт, используя иконки социальных сетей вверху сайта.</p>
    </div>

                        </div>
                        <div class="form-row row-4">
                            <div class="profile-data-title">
                                <p>Уведомления</p>
                            </div>
                            <div class="profile-data-chekboxes">
                                <div class="item">
                                    <label>
                                        <div class="form-group field-profileform-notification_email_news">
<input type="hidden" name="ProfileForm[notification_email_news]" value="0"><input type="checkbox" id="profileform-notification_email_news" name="ProfileForm[notification_email_news]" value="1" checked=""><div class="checkbox"></div><div class="help-block"></div>
</div>
                                        <b>Новости</b>
                                    </label>
                                </div>
                                <div class="item">
                                    <label>
                                        <div class="form-group field-profileform-notification_email_promotion">
<input type="hidden" name="ProfileForm[notification_email_promotion]" value="0"><input type="checkbox" id="profileform-notification_email_promotion" name="ProfileForm[notification_email_promotion]" value="1" checked=""><div class="checkbox"></div><div class="help-block"></div>
</div>
                                        <b>Акции</b>
                                    </label>
                                </div>
                                <div class="item">
                                    <label>
                                        <div class="form-group field-profileform-notification_email_money">
<input type="hidden" name="ProfileForm[notification_email_money]" value="0"><input type="checkbox" id="profileform-notification_email_money" name="ProfileForm[notification_email_money]" value="1" checked=""><div class="checkbox"></div><div class="help-block"></div>
</div>
                                        <b>Пополнения</b>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-row row-5 form-submit">
                            <a href="#change-pass-popup" class="fancybox-form-change-pass"><span>Изменить пароль</span></a>
                            <div class="button-whith-img">
                                <button type="submit">
                                    <span>Сохранить</span>
                                    <img src="{$theme_url}/images/profile-form-submit-hover.png" class="hover" alt="">
                                    <img src="{$theme_url}/images/profile-form-submit-normal.png" class="normal" alt="">
                                </button>
                            </div>
                        </div>
                    
                    <!--<div class="form-row row-6">
                        <form name="profile-data-promocode" id="profile-data-promocode">
                            <div class="profile-data-title">
                                <p>Промо код</p>
                            </div>
                            <div class="promo-inputs profile-data-inputs">
                                <div class="form_row">
                                    <div class="form_input">
                                        <input type="text" name="promo-code" value=""
                                               placeholder="введите промо код" data-val="******"
                                               class="profile-promocode">
                                    </div>
                                    <div class="promo-inputs-button button-whith-img">
                                        <button type="submit" disabled>
                                            <span>ОК</span>
                                            <img src="images/profile-button-promo-inputs-hover.png" class="active"
                                                 alt="">
                                            <img src="images/profile-button-promo-inputs-normal.png" class="normal"
                                                 alt="">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>-->
                </div></form>
            </div>
        </div>
    </div>
</div>
<!--

<section class="section section_full">
    <main class="section__main">
        <div class="main main_profile">
            <div class="profile">
                <div class="profile__header">
                    <div class="profile__title title title_font_hugest">Мой счет</div>
                </div>
                <div class="profile__table">
                    <div class="profile__aside">
                        <div class="profile__info">
                            <div class="profile-info">
                                <div class="profile-info__title title title_font_largest">logitec</div>
                                <div class="profile-info__caption title">Ваш уровень</div>
                                <div class="profile-info__status">
                                    <div class="status status_huge">
                                        <div class="status__icon">
                                            <img src="/engine/templates/chudoslot/img/vip/engine/templates/chudoslot/img/vip/c6815f8e1829b9f6ff61aa4771cffdd2.png" width="110">
                                            
                                        </div>
                                        <span class="status__note">Ученик</span>
                                    </div>
                                </div>
                                <div class="profile-info__rating">
                                    <div class="rating rating_profile">
                                        <div class="rating__stars rating__stars_large">
                                                                                            <svg class="rating__icon svg-star">
                                                    <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#star-filled"></use>
                                                </svg>
                                            
                                                                                            <svg class="rating__icon svg-star_disabled svg-star">
                                                    <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#star"></use>
                                                </svg>
                                                                                            <svg class="rating__icon svg-star_disabled svg-star">
                                                    <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#star"></use>
                                                </svg>
                                                                                            <svg class="rating__icon svg-star_disabled svg-star">
                                                    <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#star"></use>
                                                </svg>
                                                                                            <svg class="rating__icon svg-star_disabled svg-star">
                                                    <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#star"></use>
                                                </svg>
                                                                                            <svg class="rating__icon svg-star_disabled svg-star">
                                                    <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#star"></use>
                                                </svg>
                                            
                                        </div>
                                        <div class="rating__bar">
                                            <div style="width:0%" class="rating__inner">
                                                <div class="rating__percent rating__percent_large">0
                                                    %
                                                </div>
                                            </div>
                                            <div class="rating__info"><i class="icon icon_info-light"></i>
                                                <div class="rating__tooltip tooltip">
                                                    <div class="tooltip__content">Вам нужно набрать 3000 монет для получения следующего уровня
                                                    </div>
                                                    <div class="tooltip__arrow"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="rating__summary">
                                            <span class="rating__caption">Баланс:
                                                <span class="rating__caption_accent">0.00 рублей</span>
                                            </span>
                                            <span class="rating__title rating__title_large">Монеты
                                                :</span>
                                            <span class="rating__title rating__title_large rating__title_accent">0.00 монет
                                                <div class="rating__info"><i class="icon icon_info-light"></i>
                                                <div class="rating__tooltip tooltip">
                                                  <div class="tooltip__content">Вам нужно набрать 3000 монет для получения следующего уровня
                                                  </div>
                                                  <div class="tooltip__arrow"></div>
                                                </div>
                                              </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                                                <div class="profile-info__action"
                                     data-piwik-event="Group_Profile,ProfileCashier,Cashier">
                                    <button class="profile-info__button button button_color_orange" data-tab="#cashier"
                                            data-toggle="modal"
                                            data-target="#cabinet-modal">Касса</button>
                                    <div class="profile-info__icon">
                                        <svg class="svg-money svg-money-dims">
                                            <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#money"></use>
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="profile__main">
                        <form method="post" action="/engine/ajax/profile.php" data-type="ajax"
                              class="tab-profile__form">
                            <input name="csrf_token" value="f37fc0f169a0b92b10063b41cec8f4f86e393b9763f646898fc8582bfb033242" type="hidden">
                            <div class="profile-details">
                                <h3 class="profile-details__title title title_align_center">Ваши данные</h3>
                                <div class="profile-details__action">
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-firstname">

<input type="text" id="profileform-firstname" class="input__inner" name="ProfileForm[firstname]" placeholder="Имя">

<div class="help-block"></div>
</div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-lastname">

<input type="text" id="profileform-lastname" class="input__inner" name="ProfileForm[lastname]" placeholder="Фамилия">

<div class="help-block"></div>
</div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-login required">

<input type="text" id="profileform-login" class="input__inner" name="ProfileForm[login]" value="logitec" placeholder="Login" aria-required="true">

<div class="help-block"></div>
</div>
                                    </div>
                                    <div class="profile-details__input">
                                        <div class="form-group field-profileform-birthday">

<input type="text" id="profileform-birthday" class="input__inner datepicker_birth" name="ProfileForm[birthday]" placeholder="День рождения">

<div class="help-block"></div>
</div>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-contacts">
                                <h3 class="profile-contacts__title title title_align_center">Ваши контакты</h3>
                                <div class="profile-contacts__action">
                                    <div class="profile-contacts__item">
                                        <div class="profile-contacts__input input">
                                            <label class="profile-contacts__label input__label"><span
                                                        class="profile-contacts__label-inner">Почта</span>
                                                                                                    <span class="profile-contacts__status">Не подтверждено</span>
                                                                                            </label>
                                                                                            <a class="profile-contacts__button input__button button button_color_orange"
                                                   data-verification="email">Подтвердить</a>
                                                                                        <div class="form-group field-profileform-email">
<input type="text" id="profileform-email" class="input__inner" name="ProfileForm[email]" value="logitec@pochta.ru" placeholder="Почта"><div class="help-block"></div>
</div>
                                        </div>
                                    </div>
                                    <div class="profile-contacts__item">
                                        <div class="profile-contacts__input input">
                                            <label class="profile-contacts__label input__label"><span
                                                        class="profile-contacts__label-inner">Телефон</span>
                                                                                                    <span class="profile-contacts__status">Не подтверждено</span>
                                                                                            </label>
                                                                                            <a class="profile-contacts__button input__button button button_color_orange"
                                                   data-verification="phone">Подтвердить</a>
                                                                                        <div class="form-group field-profileform-phone">
<input type="text" id="profileform-phone" class="input__inner" name="ProfileForm[phone]" placeholder="+00000000000"><div class="help-block"></div>
</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal__error" style="display:none">
                                <div class="modal__note_important"></div>
                            </div>
                            <div class="profile-socials">
                                <h3 class="profile-socials__title title title_align_center">Социальные сети</h3>
                                <p class="profile-socials__note">
                                    Прикрепите Ваш аккаунт в социальной сети к профилю в казино. И вы сможете легко входить в аккаунт, используя иконки социальных сетей вверху сайта.
                                </p>
                                <div class="profile-socials__action">
                                    <div class="socials">
                                                                                                                                                                                                                                                                                <a class="socials__item"
                                                       href="http://sauth.online/auth.php?provider=vkontakte&return_url=http://chudoslot3.com/registration?ulogin&token=J6X63eRjhw6MFQ7ks55lwr38fdiJB4qvEtFbBlmPSA0%3D">
                                                        <svg class="socials__icon svg_vkontakte">
                                                            <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#vkontakte"></use>
                                                        </svg>

                                                    </a>
                                                                                                                                                                                                <a class="socials__item"
                                                       href="http://sauth.online/auth.php?provider=odnoklassniki&return_url=http://chudoslot3.com/registration?ulogin&token=J6X63eRjhw6MFQ7ks55lwr38fdiJB4qvEtFbBlmPSA0%3D">
                                                        <svg class="socials__icon svg_odnoklassniki">
                                                            <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#odnoklassniki"></use>
                                                        </svg>

                                                    </a>
                                                                                                                                                                                                <a class="socials__item"
                                                       href="http://sauth.online/auth.php?provider=twitter&return_url=http://chudoslot3.com/registration?ulogin&token=J6X63eRjhw6MFQ7ks55lwr38fdiJB4qvEtFbBlmPSA0%3D">
                                                        <svg class="socials__icon svg_twitter">
                                                            <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#twitter"></use>
                                                        </svg>

                                                    </a>
                                                                                                                                                                                                <a class="socials__item"
                                                       href="http://sauth.online/auth.php?provider=facebook&return_url=http://chudoslot3.com/registration?ulogin&token=J6X63eRjhw6MFQ7ks55lwr38fdiJB4qvEtFbBlmPSA0%3D">
                                                        <svg class="socials__icon svg_facebook">
                                                            <use xlink:href="/engine/templates/chudoslot/img/svgsprite.svg#facebook"></use>
                                                        </svg>

                                                    </a>
                                                                                            
                                                                            </div>
                                </div>
                            </div>

                            <div class=" profile-notify">
                                <h3 class="profile-notify__title title title_align_center">Уведомления</h3>
                                <div class="profile-notify__action">
                                    <div class="profile-notify__row">
                                        <div class="profile-notify__label title">Почта</div>
                                        <div class="profile-notify__choice">
                                            <div class="profile-notify__checkbox checkbox">
                                                <div class="form-group field-profileform-notification_email_news">
<input type="hidden" name="ProfileForm[notification_email_news]" value="0"><input type="checkbox" id="profileform-notification_email_news" class="checkbox__inner" name="ProfileForm[notification_email_news]" value="1" checked><label class="checkbox__label" for="profileform-notification_email_news">Новости</label><div class="help-block"></div>
</div>
                                            </div>
                                            <div class="profile-notify__checkbox checkbox">
                                                <div class="form-group field-profileform-notification_email_promotion">
<input type="hidden" name="ProfileForm[notification_email_promotion]" value="0"><input type="checkbox" id="profileform-notification_email_promotion" class="checkbox__inner" name="ProfileForm[notification_email_promotion]" value="1" checked><label class="checkbox__label" for="profileform-notification_email_promotion">Промо</label><div class="help-block"></div>
</div>
                                            </div>
                                            <div class="profile-notify__checkbox checkbox">
                                                <div class="form-group field-profileform-notification_email_money">
<input type="hidden" name="ProfileForm[notification_email_money]" value="0"><input type="checkbox" id="profileform-notification_email_money" class="checkbox__inner" name="ProfileForm[notification_email_money]" value="1" checked><label class="checkbox__label" for="profileform-notification_email_money">Пополнение/Вывод</label><div class="help-block"></div>
</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="profile-notify__row">
                                        <h3 class="profile-notify__label title">СМС</h3>
                                        <div class="profile-notify__choice">
                                            <div class="profile-notify__checkbox checkbox">
                                                <div class="form-group field-profileform-notification_phone_news">
<input type="hidden" name="ProfileForm[notification_phone_news]" value="0"><input type="checkbox" id="profileform-notification_phone_news" class="checkbox__inner" name="ProfileForm[notification_phone_news]" value="1" checked><label class="checkbox__label" for="profileform-notification_phone_news">Новости</label><div class="help-block"></div>
</div>
                                            </div>
                                            <div class="profile-notify__checkbox checkbox">
                                                <div class="form-group field-profileform-notification_phone_promotion">
<input type="hidden" name="ProfileForm[notification_phone_promotion]" value="0"><input type="checkbox" id="profileform-notification_phone_promotion" class="checkbox__inner" name="ProfileForm[notification_phone_promotion]" value="1" checked><label class="checkbox__label" for="profileform-notification_phone_promotion">Промо</label><div class="help-block"></div>
</div>
                                            </div>
                                            <div class="profile-notify__checkbox checkbox">
                                                <div class="form-group field-profileform-notification_phone_money">
<input type="hidden" name="ProfileForm[notification_phone_money]" value="0"><input type="checkbox" id="profileform-notification_phone_money" class="checkbox__inner" name="ProfileForm[notification_phone_money]" value="1" checked><label class="checkbox__label" for="profileform-notification_phone_money">Пополнение/Вывод</label><div class="help-block"></div>
</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="profile__action">
                                <a class="profile__button button button_color_brightblue" data-toggle="modal"
                                   data-target=".popup_changePassword">Изменить пароль</a>
                                <button type="submit"
                                        class="profile__button profile__button_submit button button_color_orange">Сохранить изменения</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</section>
-->
        
    </div>