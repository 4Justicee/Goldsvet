<!DOCTYPE html>
<html lang="en" class="desktop landscape bagfix_windows webkit Win"><head>
    <meta charset="UTF-8">
    <meta name="description" content="{$description}">
	  <meta name="keywords" content="{$keywords}" />
    <link rel="icon" href="{$theme_url}/favicon.ico" type="image/x-icon" />
    <title>{$title}</title>
    
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="format-detection" content="telephone=no">

    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900" rel="stylesheet">
    <!-- build:css -->
    <link rel="stylesheet" href="{$theme_url}/css/fancybox.css">
    <link rel="stylesheet" href="{$theme_url}/css/formstyler.css">
    <link rel="stylesheet" href="{$theme_url}/css/normalize.css">
    <link rel="stylesheet" href="{$theme_url}/css/timeto.css">
    <link rel="stylesheet" href="{$theme_url}/css/slick.css">
    <link rel="stylesheet" href="{$theme_url}/css/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="{$theme_url}/css/jquery-ui.min.css">

    <link rel="stylesheet" href="{$theme_url}/css/zdev_0_basic.css">
    <link rel="stylesheet" href="{$theme_url}/css/zdev_4.css">
    <link rel="stylesheet" href="{$theme_url}/css/zdev_4_adapt.css">
    <link rel="stylesheet" href="{$theme_url}/css/zdev_6.css">
    <link rel="stylesheet" href="{$theme_url}/css/zdev_6_adapt.css">
    <link rel="stylesheet" href="{$theme_url}/css/zdev_1.css">
    <link rel="stylesheet" href="{$theme_url}/css/zdev_1_adapt.css">
    <link rel="stylesheet" href="{$theme_url}/css/bag_fix.css">
    <link rel="stylesheet" href="{$theme_url}/css/grid12.css">
    <link rel="stylesheet" href="{$theme_url}/css/modal/bonus.css">
    <link rel="stylesheet" href="{$theme_url}/css/modal/game_bonus_popup.css">
    <!-- endbuild -->

    <!--[if lt IE 10]>
    <link rel="stylesheet" href="https://rawgit.com/codefucker/finalReject/master/reject/reject.css" media="all"/>
    <script type="text/javascript" src="https://rawgit.com/codefucker/finalReject/master/reject/reject.min.js"></script>
    <![endif]-->
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script src="//ulogin.ru/js/ulogin.js"></script>
</head>
<body class="the-game">

<div class="game-page {if $user_id==0}game-page-unlog{/if}">

    <div class="game-main">

        <div class="game-tabs">
            <div class="tabs-block">
                <div class="tabs-block-wrap">
                    <ul>
                    
                    {foreach $cat_bar as $cat}
      <li class="">
        <a href="{$cat.href}">
              <span class="item-wrap">
                  <span class="item">
                      <span>{$cat.name}</span>
                  </span>
              </span>
        </a>
    </li>
                    {/foreach}
</ul>
                </div>
            </div>
        </div>

        <div class="game-content">

            <div class="game-left">
                {if $user_id>0}
                <div class="game-item">

    <div class="game-top-user shadow">
        <div class="game-logo">
            <a href="/" class="disabled" data-target=".popup_gameplayGallery">
                <img src="{$theme_url}/images/logo.png" alt="">
            </a>
        </div>
                    <div class="game-name">
                <p class="linear-yellow">{$login}</p>
            </div>
            </div>

            <div class="game-middle-user">

            <div class="some-wrap-one shadow">

                <div class="game-user-info-wrap">

                    <div class="game-user-info">
                        <div class="key">VIP</div>
                        <div class="value">
                            <p class="linear-yellow">{$point_courses[$user_info['rating']]['name']}</p>
                        </div>
                    </div>

                    <div class="game-user-info">
                        <div class="key">Монеты</div>
                        <div class="value">
                            <p class="linear-yellow">{$user_info['balance']}</p>
                        </div>
                    </div>

                </div>

                <div class="game-user-progress-line">

                    <div class="progress-line" data-value="0">
                        <div class="progress-line-background">
                            <img src="{$theme_url}/images/progress-line-background-header.png" alt="">
                        </div>
                        <div class="progress-line-value" style="width:{round($user_info['payin_total']/$point_courses[$user_info['rating']+1].range*100)}%;"></div>
                    </div>

                    <div class="progress-value" data-progress-value="{round($user_info['payin_total']/$point_courses[$user_info['rating']+1].range*100)}">{round($user_info['payin_total']/$point_courses[$user_info['rating']+1].range*100)}%</div>

                </div>

            </div>
                        

        </div>
        <div class="game-bottom-user">

            <div class="button-wrap">
                <a href="#cashbox" class="fancybox-cashbox-form button red-button">
                    <span>Касса</span>
                    <img src="{$theme_url}/images/red-button-background.png" alt="" class="default">
                    <img src="{$theme_url}/images/red-button-background-hover.png" alt="" class="hover">
                </a>
            </div>
                            <div class="button-wrap">
                    <a href="/engine/ajax/add_to_favorites.php?game={$game_name}" class="button purp-button" data-type="ajax" data-success=".popup_favoritesAdded" data-fail=".popup_favoritesAddedFail" data-target="/engine/ajax/add_to_favorites.php?game={$game_name}">
                        <img src="{$theme_url}/images/small-star.png" alt="" class="icon">
                        <span class="linear-yellow">в Любимые</span>
                        <img src="{$theme_url}/images/tab-block-normal.png" alt="" class="default">
                        <img src="{$theme_url}/images/tab-block-hover.png" alt="" class="hover">
                    </a>
                </div>
            

            <div class="button-wrap">
                <a href="/game" class="button purp-button disabled" data-target=".popup_gameplayGallery">
                    <img src="{$theme_url}/images/triangle.png" alt="" class="icon">
                    <span class="linear-yellow">Игровой зал</span>
                    <img src="{$theme_url}/images/tab-block-normal.png" alt="" class="default">
                    <img src="{$theme_url}/images/tab-block-hover.png" alt="" class="hover">
                </a>
            </div>

        </div>
    </div>
    {else}
    <div class="game-item">

    <div class="game-top-user ">
        <div class="game-logo">
            <a href="/" class="disabled" data-target=".popup_gameplayGallery">
                <img src="{$theme_url}/images/logo.png" alt="">
            </a>
        </div>
                    <div class="desktop">
                <p>ВЫИГРЫВАЙ</p>
                <p>
                    <span class="linear-yellow">ТВОЙ ДЖЕKПОТ</span>
                </p>
            </div>
            </div>

            <div class="game-middel-unlog">

            <div class="desktop-smaller">
                <p>ВЫИГРЫВАЙ</p>
                <p>
                    <span class="linear-yellow">ТВОЙ ДЖЕKПОТ</span>
                </p>
            </div>

            <div class="jeckpot shadow" id="top-block-counter" data-min="{substr(time(),2)}" data-max="999999999" data-random-min="1" data-random-max="20">49 548 299</div>

            <div class="unlog-buttons-wrap">

                <div class="button-wrap button-whith-img">
                    <a href="#registration-modal" class="fancybox-registration button button-red-small">
                        <span>РЕГИСТРАЦИЯ</span>
                        <img src="{$theme_url}/images/button-red-small-default.png" alt="" class="normal">
                        <img src="{$theme_url}/images/button-red-small-hover.png" alt="" class="hover">
                    </a>
                </div>

                <div class="button-wrap button-whith-img">
                    <a href="#enter-popup" class="fancybox-enter button button-green-small">
                        <span>ВОЙТИ В КЛУБ</span>
                        <img src="{$theme_url}/images/button-green-small-default.png" alt="" class="normal">
                        <img src="{$theme_url}/images/button-green-small-hover.png" alt="" class="hover">
                    </a>
                </div>

            </div>

        </div>
                <div class="game-socials">
        <div class="game-soc-title">
            <p>Войти через</p>
            <p>Социальные сети</p>
        </div>

        <div class="game-social-links" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://{$config['url']}/registration?ulogin">
                <a class="socials__item {if array_key_exists('vkontakte',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('vkontakte',$user_info.soc)} data-uloginbutton = "vkontakte"{/if}>
                    <img src="{$theme_url}/images/header-center-vkontakte.png" alt="">
                    <img src="{$theme_url}/images/header-center-vkontakte-active.png" alt="" class="active">
                </a>
                <a class="socials__item {if array_key_exists('odnoklassniki',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('odnoklassniki',$user_info.soc)} data-uloginbutton = "odnoklassniki"{/if}>
                    <img src="{$theme_url}/images/header-center-odnoklassniki.png" alt="">
                    <img src="{$theme_url}/images/header-center-odnoklassniki-active.png" alt="" class="active">
                </a>
                <a class="socials__item {if array_key_exists('twitter',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('twitter',$user_info.soc)} data-uloginbutton = "twitter"{/if}>
                    <img src="{$theme_url}/images/header-center-twitter.png" alt="">
                    <img src="{$theme_url}/images/header-center-twitter-active.png" alt="" class="active">
                </a>
                <a class="socials__item {if array_key_exists('facebook',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('facebook',$user_info.soc)} data-uloginbutton = "facebook"{/if}>
                    <img src="{$theme_url}/images/header-center-facebook.png" alt="">
                    <img src="{$theme_url}/images/header-center-facebook-active.png" alt="" class="active">
                </a>
            
        </div>
    </div>

    </div>
    {/if}
            </div>

            <div class="game-center">

                <div class="game-center-wrap">
                    <div class="game-center-slider">
                        <script>
                                
                                
                                </script>
                        
                        
                        {foreach $cat_bar as $cat}
                        <div class="game-center-slider-item">
                            <div class="game-center-slider-item-wrap">
                                <div class="slider-wrap slick-slider">
                                {if $games[$cat.id]}
                                {foreach $games[$cat.id] as  $game}
                                
                                <div class="slider-item">
                                <a {if (isset($user_id)&& $user_id>0)}href="/games/{$game.start_path}/{$game.g_name}/real" {else} href="#enter-popup" class="fancybox-enter" {/if} class="slider__item">
                                  <div class="img-wrap">
                                    <img src="{$theme_url}/ico/{$game.g_name}.png" class="slider__img" alt="{$game.g_title}">
                                  </div>
                                </a>
                                </div>
                                {/foreach} 
                                {/if}
                                              
                                </div>
                            </div>
                        </div>
                        {/foreach}
                        <div class="game-center-slider-item">
                            <div class="game-center-slider-item-wrap">
                                <div class="slider-wrap slick-slider">
                                <button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;">Previous</button>
                                                                            <div aria-live="polite" class="slick-list draggable"><div class="slick-track" style="opacity: 1; width: 3924px; transform: translate3d(-872px, 0px, 0px);" role="listbox"><div class="slider-item slick-slide slick-cloned" data-slick-index="-8" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/deluxe/lordofoceans/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_lordofoceans.jpg" class="slider__img" alt="Lord Of Oceans Deluxe">
                                                    </div>
                                                </a> 
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="-7" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/igrosoft/resident/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_resident.jpg" class="slider__img" alt="Resident">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="-6" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/igrosoft/gnom/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_gnom.jpg" class="slider__img" alt="Gnome">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="-5" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/gaminators/bananasplash/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_bananasplash.jpg" class="slider__img" alt="Banana Splash">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="-4" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/netent/boom_brothers/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_boom_brothers.jpg" class="slider__img" alt="Boom Brothers">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="-3" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/igrosoft/keks/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_keks.jpg" class="slider__img" alt="Keks">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="-2" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/gaminators/moneygame/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_moneygame.jpg" class="slider__img" alt="Money Game">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/netent/megafortune/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_megafortune.jpg" class="slider__img" alt="Mega Fortune">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide10">
                                                                                        <a href="/games/gaminators/bookofra/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_bookofra.jpg" class="slider__img" alt="Book Of Ra">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="1" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide11">
                                                                                        <a href="/games/igrosoft/crmonkey/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_crmonkey.jpg" class="slider__img" alt="Crazy Monkey">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="2" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide12">
                                                                                        <a href="/games/gaminators/luckylady/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_luckylady.jpg" class="slider__img" alt="Lucky Lady’s Charm">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="3" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide13">
                                                                                        <a href="/games/igrosoft/cocktail/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_cocktail.jpg" class="slider__img" alt="Fruit Cocktail">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="4" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide14">
                                                                                        <a href="/games/gaminators/dolphins/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_dolphins.jpg" class="slider__img" alt="Dolphin’s Pearl">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="5" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide15">
                                                                                        <a href="/games/gaminators/bananas/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_bananas.jpg" class="slider__img" alt="Bananas Go Bahamas">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="6" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide16">
                                                                                        <a href="/games/gaminators/justjewels/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_justjewels.jpg" class="slider__img" alt="Just Jewels">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="7" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide17">
                                                                                        <a href="/games/netent/gonzo/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_gonzo.jpg" class="slider__img" alt="Gonzo Quest">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="8" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide18">
                                                                                        <a href="/games/netent/jackhammer/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_jackhammer.jpg" class="slider__img" alt="Jack Hammer">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="9" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide19">
                                                                                        <a href="/games/gaminators/sizzlinghot/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_sizzlinghot.jpg" class="slider__img" alt="Sizzling Hot">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="10" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide110">
                                                                                        <a href="/games/deluxe/bookofra_dx/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_bookofra_dx.jpg" class="slider__img" alt="Book Of Ra Deluxe">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="11" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide111">
                                                                                        <a href="/games/netent/wildwater/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_wildwater.jpg" class="slider__img" alt="Wild Water">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="12" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide112">
                                                                                        <a href="/games/deluxe/lordofoceans/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_lordofoceans.jpg" class="slider__img" alt="Lord Of Oceans Deluxe">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="13" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide113">
                                                                                        <a href="/games/igrosoft/resident/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_resident.jpg" class="slider__img" alt="Resident">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="14" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide114">
                                                                                        <a href="/games/igrosoft/gnom/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_gnom.jpg" class="slider__img" alt="Gnome">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="15" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide115">
                                                                                        <a href="/games/gaminators/bananasplash/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_bananasplash.jpg" class="slider__img" alt="Banana Splash">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="16" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide116">
                                                                                        <a href="/games/netent/boom_brothers/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_boom_brothers.jpg" class="slider__img" alt="Boom Brothers">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="17" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide117">
                                                                                        <a href="/games/igrosoft/keks/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_keks.jpg" class="slider__img" alt="Keks">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="18" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide118">
                                                                                        <a href="/games/gaminators/moneygame/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_moneygame.jpg" class="slider__img" alt="Money Game">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide" data-slick-index="19" aria-hidden="true" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide119">
                                                                                        <a href="/games/netent/megafortune/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_megafortune.jpg" class="slider__img" alt="Mega Fortune">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="20" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/gaminators/bookofra/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_bookofra.jpg" class="slider__img" alt="Book Of Ra">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="21" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/igrosoft/crmonkey/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_crmonkey.jpg" class="slider__img" alt="Crazy Monkey">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="22" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/gaminators/luckylady/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_luckylady.jpg" class="slider__img" alt="Lucky Lady’s Charm">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="23" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/igrosoft/cocktail/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_cocktail.jpg" class="slider__img" alt="Fruit Cocktail">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="24" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/gaminators/dolphins/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_dolphins.jpg" class="slider__img" alt="Dolphin’s Pearl">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="25" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/gaminators/bananas/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_bananas.jpg" class="slider__img" alt="Bananas Go Bahamas">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="26" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/gaminators/justjewels/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_justjewels.jpg" class="slider__img" alt="Just Jewels">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-cloned" data-slick-index="27" aria-hidden="true" style="width: 109px;" tabindex="-1">
                                                                                        <a href="/games/netent/gonzo/real" class="slider__item" tabindex="-1">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_gonzo.jpg" class="slider__img" alt="Gonzo Quest">
                                                    </div>
                                                </a>
                                    </div></div></div>
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                    
                                <button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;">Next</button></div>
                            </div>
                        </div>
                        <div class="game-center-slider-item">
                            <div class="game-center-slider-item-wrap">
                                <div class="slider-wrap s slick-slider">
                                                                            <div aria-live="polite" class="slick-list draggable"><div class="slick-track" style="opacity: 1; width: 654px; transform: translate3d(0px, 0px, 0px);" role="listbox"><div class="slider-item slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide20">
                                                                                        <a href="/games/gaminators/bookofra/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_bookofra.jpg" class="slider__img" alt="Book Of Ra">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="1" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide21">
                                                                                        <a href="/games/gaminators/luckylady/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_luckylady.jpg" class="slider__img" alt="Lucky Lady’s Charm">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="2" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide22">
                                                                                        <a href="/games/igrosoft/cocktail/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_cocktail.jpg" class="slider__img" alt="Fruit Cocktail">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="3" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide23">
                                                                                        <a href="/games/gaminators/dolphins/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_dolphins.jpg" class="slider__img" alt="Dolphin’s Pearl">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="4" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide24">
                                                                                        <a href="/games/netent/gonzo/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_gonzo.jpg" class="slider__img" alt="Gonzo Quest">
                                                    </div>
                                                </a>
                                    </div><div class="slider-item slick-slide slick-active" data-slick-index="5" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide25">
                                                                                        <a href="/games/gaminators/moneygame/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_moneygame.jpg" class="slider__img" alt="Money Game">
                                                    </div>
                                                </a>
                                    </div></div></div>
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                     
                                </div>
                            </div>
                        </div>
                        <div class="game-center-slider-item">
                            <div class="game-center-slider-item-wrap">
                                <div class="slider-wrap  slick-slider">
                                                                            <div aria-live="polite" class="slick-list draggable"><div class="slick-track" style="opacity: 1; width: 109px; transform: translate3d(0px, 0px, 0px);" role="listbox"><div class="slider-item slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style="width: 109px;" tabindex="-1" role="option" aria-describedby="slick-slide30">
                                                                                        <a href="/games/table/carib_poker/real" class="slider__item" tabindex="0">
                                                                                                    <div class="img-wrap">
                                                        <img src="{$theme_url}/ico/thumb_cache_260x166_carib_poker.jpg" class="slider__img" alt="Caribbean Poker">
                                                    </div>
                                                </a>
                                        </div></div></div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="game-center-slider-item">
                            <div class="game-center-slider-item-wrap">
                                <div class="slider-wrap  slick-slider">
                                    
                                <div aria-live="polite" class="slick-list draggable"><div class="slick-track" style="opacity: 1; width: 0px; transform: translate3d(0px, 0px, 0px);" role="listbox"></div></div></div>
                            </div>
                        </div>
                    </div>
                                        <div class="gameplay__canvas">
                        <div class="gameplay__canvas_inner">
                            <object width="100%" height="100%" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,18,0" id="test" align="middle" style="width: 944px; height: 708px; display: block;">
                                <param name="allowFullScreen" value="true">
                                <param name="movie" value="{$param}">
                                <param name="bgcolor" value="03030F">
                                <param name="wmode" value="opaque">
                                <embed src="{$param}" bgcolor="03030F" allowfullscreen="true" wmode="opaque" name="game" align="middle" width="100%" height="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">
                            </object>
                        </div>
                    </div>
                    
                </div>

            </div>

            <div class="game-right">

            
            <div class="game-item">
            {if count($cur_tour_one)}
            
            

        <div class="torment-info">

            <div class="desktop">
                <div class="torment-title">
                <p class="linear-yellow">
                      Текущий турнир
                </p>
                </div>
                <div class="torment-name">{$cur_tour_one.name}</div>
                <div class="torment-value">
                    <span>{$cur_tour_one.prizes_sum} {$lang['currency']}</span>
                </div>
            </div>

            <div class="torment-img">
                <img src="{$theme_url}/images/tournaments/{$cur_tour_one.pic}" alt="{$cur_tour_one.name}">
            </div>

        </div>

        <div class="torment-time-left torment-info">

            <div class="desktop-smaller">
                <div class="torment-title">
                    <p class="linear-yellow">
                                                    Текущий турнир
                                            </p>
                </div>
                <div class="torment-name">{$cur_tour_one.name}</div>
                <div class="torment-value">
                    <span>{$cur_tour_one.prizes_sum} {$lang['currency']}</span>
                </div>
            </div>
            <div class="title">
                <p class="linear-yellow">ЕЩЕ ЕСТЬ ВРЕМЯ</p>
            </div>
            <div class="timer-wrap">
                <div id="timer-1" class="timeTo timeTo-white" data-timer="{strtotime($cur_tour_one.end_time)}" style="font-family: Roboto; font-size: 14px;"><figure style="width:36px"><div class="first" style="width:13px; height:15px;"><ul style="left:2px; top:-15px"><li>0</li><li>0</li></ul></div><div style="width:13px; height:15px;margin-right:6px"><ul style="left:2px; top:-15px"><li>2</li><li>2</li></ul></div><figcaption style="font-size:6px;padding-right:6px">д</figcaption></figure><figure style="max-width:29px"><div class="first" style="width:13px; height:15px;"><ul style="left: 2px; top: -15px;" class=""><li>1</li><li>1</li></ul></div><div style="width:13px; height:15px;"><ul style="left: 2px; top: -15px;" class=""><li>9</li><li>9</li></ul></div><figcaption style="font-size:6px;">ч</figcaption></figure><span>:</span><figure style="max-width:29px"><div class="first" style="width:13px; height:15px;"><ul style="left: 2px; top: -15px;" class=""><li>2</li><li>2</li></ul></div><div style="width:13px; height:15px;"><ul style="left: 2px; top: -15px;" class=""><li>8</li><li>8</li></ul></div><figcaption style="font-size:6px;">м</figcaption></figure><span>:</span><figure style="max-width:29px"><div class="first" style="width:13px; height:15px;"><ul style="left: 2px; top: -15px;" class=""><li>5</li><li>5</li></ul></div><div style="width:13px; height:15px;"><ul style="left: 2px; top: 0px;" class="transition"><li>6</li><li>7</li></ul></div><figcaption style="font-size:6px;">с</figcaption></figure></div>
            </div>

            <div class="button-wrap">
                <a href="/tournament/{$cur_tour_one.id}" class="button yellow-button">
                    <span>УЧАСТВОВАТЬ</span>
                    <img src="{$theme_url}/images/aside-button.png" alt="" class="default">
                    <img src="{$theme_url}/images/aside-button-hover.png" alt="" class="hover">
                </a>
            </div>

        </div>

        <div class="table-wrap">
            <div class="table">
            {foreach $cur_tour_one.gamers as $i=>$gamer}
                    {if $i<5}
                        <div class="row">
                            <div class="item">{$i+1}</div>
                            <div class="item">
                                <div>{$gamer.user}</div>
                            </div>
                            <div class="item">{$gamer.result}</div>
                        </div>
                    {/if}
            {/foreach}					
            </div>
        </div>

                                    <div class="tournament__yourposition">
                    <h3 class="yourposition__header">Ваша позиция:</h3>
                    <div class="table-wrap">
                        <table>
                            <tbody><tr>
                                <td>—</td>
                                <td>{$login}</td>
                                <td>0</td>
                            </tr>
                        </tbody></table>
                    </div>
                </div>
{/if}
</div>


                        


            </div>

        </div>
        <div class="game-page-unlog">
            <div class="game-main">
                                    <div class="game-bottom-button">
                        <div class="button-wrap button-whith-img">
                            <a href="real" class="button button-game-red">
                                <span>Играть на деньги</span>
                                <img src="{$theme_url}/images/button-game-red-default.png" alt="" class="default">
                                <img src="{$theme_url}/images/button-game-red-hover.png" alt="" class="hover">
                            </a>
                        </div>
                    </div>
                            </div>
        </div>


    </div>

    <div class="scroll_up">
        <div class="scroll_up_wrap"></div>
    </div>

</div>
    <script>
        var showed = false;
        var checkInterval=setInterval(function(){
            $.ajax({
                url:'/engine/ajax/user_status.php',
                dataType:'json',
                success:function(data){
                    if(data.success==false && showed==false){
                        var pay = data.pay;
                        $.fancybox.open(data.target);
                        if(pay.method != 'undefined' &&  pay.account != 'undefined'){
                            var item = $(".payitemsys[data-sys='" + pay.method +"']");
                            makePaySys(item, pay.account);
                        }
                        showed=true;
                        clearInterval(checkInterval);
                    }
                }
            })
        },3000);
    </script>
<!-- SCRIPTS -->
<script>
    var rating_star = 'ajax.php';
    var timerCount = 6; //in hour
    var ajaxShowMore = 'js/json/zal-items.json';

    /**Обработка выбора платежной системы при депозите*/
    function makePaySys(obItem, account) {

        /**Set pay system*/
        if(account != null){
            $( obItem ).find('input[type="radio"]').prop( "checked", true );
            $(obItem).find('.form_input').find('input[name="addons[phone]"]').val(account);
        }

        var item = $(obItem).closest('.item');
        $(obItem).closest('form').find('.error__info').html('').hide();
        if (item.hasClass('active')) {
            $('.cashbox-middle-items .item').removeClass('active').removeAttr('style');
        } else if (!item.hasClass('active')) {
            $('.cashbox-middle-items .item.active').removeClass('active').removeAttr('style');
            var form = item.find('.item-form');
            item.addClass('active');
            if ($(window).width() > 767) {
                item.css('margin-bottom', (form.outerHeight(true) + 140) + 'px');
            }
        }

    }
</script>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script type="text/javascript" src="{$theme_url}/js/validate_script.js"></script>

<!-- build:js -->
<script type="text/javascript" src="{$theme_url}/js/plagins/device.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/jquery.fancybox.pack.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/jquery.formstyler.min.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/jquery.validate.min.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/slick.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/maskInput.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/time-to.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/jquery.mousewheel.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/jquery.jscrollpane.min.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="{$theme_url}/js/plagins/jquery-ui.min.js"></script>

<script type="text/javascript" src="{$theme_url}/js/basic_scripts.js"></script>

<script type="text/javascript" src="{$theme_url}/js/develop/develop_1.js"></script>
<script type="text/javascript" src="{$theme_url}/js/develop/develop_4.js"></script>
<script type="text/javascript" src="{$theme_url}/js/develop/main.js"></script>

<!-- endbuild -->
{include file='dialogs.tpl'}
<div id="ads"></div>
</body>

</html>







{*


<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="description" content="{$description}">
	  <meta name="keywords" content="{$keywords}" />
    <link rel="icon" href="{$theme_url}/img/favicon/favicon.ico" type="image/x-icon" />
    <title>{$title}</title>
    <link rel="stylesheet" href="{$theme_url}/css/vendor.min.css">
    <link rel="stylesheet" href="{$theme_url}/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="{$theme_url}/css/main.min.css">
    <script src="{$theme_url}/js/jquery.min.js"></script>
    <script src="{$theme_url}/vendor/svg4everybody/svg4everybody.min.js"></script>
    <script src="//ulogin.ru/js/ulogin.js" type="text/javascript"></script>
    
</head>
<body class="game_bg">
<div class="gameplay_over">
<div class="gameplay">
    <div class="gameplay__shadow">
        <div class="gameplay__wrap_head">
            <div class="gameplay__left">
                <a class="gameplay__logo disabled" data-target=".popup_gameplayGallery" href="{$referer}"><img src="{$theme_url}/img/logo.png" class="gameplay__logo-inner"></a>
            </div>	
            <div class="gameplay__main ">
                <div class="gameplay__nav">
                    <ul class="gameplay-nav">
  {foreach $cat_bar as $cat}
                        <li class="gameplay-nav__item" data-target="#cat{$cat.id}">{$cat.name}</li>
  {/foreach}
                    </ul>
                    <div class="hide_big_nav show__nav"><span>{$lang['games']}</span><i class="fa fa-bars"></i>
                        <ul class="gameplay-nav-small hide">
  {foreach $cat_bar as $cat}
                            <li class="gameplay-nav-small__item"><a href="{$cat.href}">{$cat.name}</a></li>
  {/foreach}
                        </ul>
                    </div>
                </div>
            </div>

            <aside class="gameplay__aside hide_small">
{if count($cur_tour_one)}
                <div class="gameplay-toppanel">
                    <div class="gameplay-toppanel__icon"><i class="icon icon_cup"></i></div>
                    <div class="gameplay-toppanel__summary">
                        <h3 class="gameplay-toppanel__caption">{$lang['current_tournament']}</h3>
                        <h2 class="gameplay-toppanel__title">{$cur_tour_one.name}</h2>
                    </div>
                    <div class="gameplay-toppanel__info"><i class="icon icon_info"></i>
                        <div class="gameplay-toppanel__tooltip tooltip">
                            <div class="tooltip__content">{$cur_tour_one.minitxt}</div>
                            <div class="tooltip__arrow tooltip__arrow_right"></div>
                        </div>
                    </div>
                </div>
{/if}
            </aside>
        </div>
        <div class="gameplay__wrap">	
            <div class="gameplay__left">	
                <div class="gameplay__user gameplay-user">
                    <div class="gameplay-signup">
{if !(isset($user_id)&& $user_id>0)}
                        <div class="title gameplay-signup__title">{$lang['win_your_jp']}</div>
                        <div class="gameplay-signup__jackpot">
                            <div class="jackpot">
                                <div class="jackpot__back"></div>
                                <div class="jackpot__overlay"></div>
                                    <div class="jackpot__base finecountdown" data-sum="{$jack_sum}" data-jack="{substr(round(time()/3*5),-8)}" data-toggle="jackpot" id="banner-jackpot"></div>
                            </div>
                        </div>
                        <div class="gameplay-user__action">
                            <button class="gameplay-user__button gameplay-user__button_orange button" data-toggle="modal" data-target="#registration-modal"><span>{$lang['register_oneself']}</span></button>
                            <button class="gameplay-user__button gameplay-user__button_blue button" data-toggle="modal"  data-target="#login-modal"><span>{$lang['enter_club']}</span></button>
                        </div>
{else}
                    <h2 class="gameplay-user__title">{$lang['username']}: {$login}</h2>
                        <div class="gameplay-user__vip">
                            <div class="rating rating_gameplay">
                                <div class="rating__summary"><span class="rating__caption">VIP:</span>
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
                                    <span class="rating__title rating__title_large">{$lang['vip_points']}:</span>
                                    <span class="rating__title rating__title_large rating__title_accent">{$user_info['pay_points']}</span>

                                    <div class="rating__bar">
                        <div style="width:{round($user_info['payin_total']/$point_courses[$user_info['rating']+1].range*100)}%" class="rating__inner">
                            <div class="rating__percent">{round($user_info['payin_total']/$point_courses[$user_info['rating']+1].range*100)}%</div>
                        </div>
                                    </div>
                                </div>
                                <div class="rating__info"><i class="icon icon_info-light"></i>
                            <div class="rating__tooltip tooltip">
                                <div class="tooltip__content">{$lang['info_lvl']}</div>
                                <div class="tooltip__arrow"></div>
                            </div>
                                </div>
                            </div>
                        </div>
                       {if $active_bonus_bar} 
                        <div class="gameplay-user__vip">
                            <div class="rating rating_gameplay">
 
                                    <div class="rating__summary"><span class="rating__title">{$lang['bonus']}:</span><span class="rating__title rating__title_accent">{$active_bonus_bar.sum} {$lang['currency']}.</span>
                                        <div class="rating__bar">
                                            <div style="width:{$active_bonus_bar.perc}%" class="rating__inner">
                                                <div class="rating__percent">{$active_bonus_bar.perc}%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="rating__info"><i class="icon icon_info-light"></i>
                                        <div class="rating__tooltip tooltip">
                                            <div class="tooltip__content">{$lang['info_wager']}</div>
                                            <div class="tooltip__arrow"></div>
                                        </div>
                                    </div>
 
                            </div>
                        </div>
                        {/if}

                        <div class="gameplay-user__action">
                            <button class="gameplay-user__button gameplay-user__button_orange button" data-tab="#cashier" data-toggle="modal" data-target="#cabinet-modal">
                                <i class="gameplay-user__icon fa fa-credit-card"></i><span class="gameplay-user__button-text">{$lang['cash']}</span>
                            </button>
							               {if !$is_fav}
                            <button class="gameplay-user__button gameplay-user__button_blue button" data-type="ajax" data-success=".popup_favoritesAdded" data-fail=".popup_favoritesAddedFail" data-target="/engine/ajax/add_to_favorites.php?id={$g_id}">
							    <i class="gameplay-user__icon icon icon_star-white"></i><span class="gameplay-user__button-text">{$lang['in_favorites']}</span>
							</button>      {/if}
                            
                            <a href="/" class="gameplay-user__button gameplay-user__button_darkblue button disabled" data-target=".popup_gameplayGallery">
							    <i class="gameplay-user__icon icon icon_exit"></i><span class="gameplay-user__button-text">{$lang['exit_lobby']}</span>
                            </a>
                        </div>
{/if}
				    </div>
                </div>
            </div>
			
    <main class="gameplay__main">
  {foreach $cat_bar as $cat}	
    <div class="gameplay__slider" id="cat{$cat.id}">
      <div class="slider slider_gameplay">
    {foreach $games[$cat.id] as  $game}
    
    <a {if (isset($user_id)&& $user_id>0)}href="/games/{$game.start_path}/{$game.g_name}/real" {else} data-toggle="modal" data-target="#login-modal"{/if} class="slider__item">
         <img src="{$theme_url}/ico/{$game.g_name}.png" class="slider__img" alt="{$game.g_title}">
         <span class="slider__title title title_font_smallest">{$game.g_title}</span>
    </a>
    {/foreach}
      </div>
    </div>
  {/foreach}
                
                <div class="gameplay__canvas">
                   <div class="gameplay__canvas_inner">
<object  width="100%"" height="100%"" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,18,0" id="test" align="middle">
<param name="allowFullScreen" value="true" />
<param name="movie" value="{$param}" />
<param name="bgcolor" value="03030F" />
<param name="wmode" value="opaque" />
<embed src="{$param}" bgcolor="03030F" allowFullScreen="true" wmode="opaque" name="game" align="middle" width="100%" height="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
</object>
                    </div><img src="{$theme_url}/img/game_fon.png" width="100%" id="get_height" class="game_param">
                </div>
				
    </main>
			
<aside class="gameplay__aside gameplay__aside_overflow">
{if count($cur_tour_one)}
<div class="hide_big">
<div class="gameplay-toppanel">
    <div class="gameplay-toppanel__icon"><i class="icon icon_cup"></i></div>
    <div class="gameplay-toppanel__summary">
        <h3 class="gameplay-toppanel__caption">{$lang['current_tournament']}</h3>
        <h2 class="gameplay-toppanel__title">{$cur_tour_one.name} 1</h2>
    </div>
    <div class="gameplay-toppanel__info"><i class="icon icon_info"></i>
        <div class="gameplay-toppanel__tooltip tooltip">
            <div class="tooltip__content">{$cur_tour_one.txt} 2</div>
            <div class="tooltip__arrow tooltip__arrow_right"></div>
        </div>
    </div>
</div>
</div>
<div class="tournament tournament_gameplay">
    <div class="tournament__promo">
        <div class="tournament__head">
            <div class="tournament__title">{$cur_tour_one.prizes_sum} {$lang['currency']}</div>
        </div>
        <div class="tournament__img-overlay"><img src="{$theme_url}/images/tournaments/{$cur_tour_one.pic}" class="tournament__img"></div>
        <a target="_blank" class="tournament__button button button_shape_round" href="/tournament/{$cur_tour_one.id}">{$lang['read_more']}</a>
    </div>
    <div class="tournament__timer timer">
        <div class="timer__note">{$lang['time_left']}</div>
        <div class="timer__table">
            <div class="timer__row timer__row_digit" data-toggle="timer" id="{$cur_tour_one.id}" data-time="{strtotime($cur_tour_one.end_time)}"></div>
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
    <div class="tournament__table">
        <table class="table table_main">
            <thead class="table__head">
            <tr class="table__headrow">
                <th class="table__cell">#</th>
                <td class="table__cell">{$lang['login']}</td>
                <th class="table__cell">{$lang['points']}</th>
            </tr>
            </thead>
            <tbody class="table__body">
			{foreach $cur_tour_one.gamers as $i=>$gamer}
                    {if $i<5}
                    <tr class="table__row">
                        <td class="table__cell">{$i+1}</td>
                        <td class="table__cell overflow_outer">
                            <div class="overflow_ellipsis">{$gamer.user}</div>
                        </td>
                        <td class="table__cell">{$gamer.result}</td>
                    </tr>
                    {/if}
            {/foreach}					
            </tbody>
        </table>
    </div>
</div>
{/if}
</aside>
        </div>
    </div>
</div>
</div>

{include file='dialogs.tpl'}

<div class="overflow"></div>

<script src="{$theme_url}/js/vendor.min.js"></script>

<script src="{$theme_url}/js/scripts.js"></script>

<script>

function refresh_balance()
  {
  $.get('/engine/ajax/user.php?action=get_balance',function(data){
    
    if(data.success)
       {
       console.log(data.freespin);
       if (data.balance>0 || data.freespin==1)
        {
        setTimeout(refresh_balance, 3000);
        }
       else
        {
        $('.modal,.popup').hide();
        $('html').addClass('modal_open');
        $('.popup_gameplayNomoney').show();
        
        } 
       
       } 
        
  },'json');
  }
  
setTimeout(refresh_balance, 3000);  
</script>

<div class="popup popup_gameplayNomoney" style="display:none">
    <div class="popup__close js-close-popup">Закрыть</div>
    <div class="popup__content">
        <p class="popup__title">Ой, у Вас недостаточно средств для игры.</p>
        <p class="popup__title popup__title_accent">Пожалуйста, пополните Ваш счет</p>
        <div class="popup__icon"><i class="icon icon_safebox"></i></div>
    </div>
    <div class="popup__footer">
        <button class="popup__gameplay-button gameplay-user__button gameplay-user__button_orange button" data-toggle="modal" data-tab="#cashier" data-target="#cabinet-modal" >
            <i class="gameplay-user__icon icon icon_purse"></i>
            <span class="gameplay-user__button-text">Сделать депозит</span>
        </button>
    </div>
</div>

</body>
</html>*}