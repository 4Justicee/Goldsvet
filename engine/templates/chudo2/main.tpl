<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="description" content="{$description} | {$lang['copyright']}" />
	<meta name="keywords" content="{$keywords}" />
    <link rel="icon" href="{$theme_url}/favicon.ico" type="image/x-icon" />
    <title>{$title}</title>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
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

    <script src="{$theme_url}/js/jquery.min.js"></script>
    <!--[if lt IE 10]>
    <link rel="stylesheet" href="https://rawgit.com/codefucker/finalReject/master/reject/reject.css" media="all"/>
    <script type="text/javascript" src="https://rawgit.com/codefucker/finalReject/master/reject/reject.min.js"></script>
    <![endif]-->
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
    <script src="//ulogin.ru/js/ulogin.js"></script>
</head>

<body>
{include file='dialogs.tpl'}

<div class="global-wrapper inside-page  ">

    <!-- HEADER -->
    <header class="header {if $ge}header-inside{/if}">
        <div class="header-main">
            <div class="mbox">
                <div class="header-wrap">
                    <div class="logo">
                        <a href="/"><img src="{$theme_url}/images/logo.png" alt=""></a>
                    </div>

{include file='login.tpl'}
                    
                </div>
                <div class="header-second-wrap">
    <div class="mobile-show">
        <div class="mobile-buter">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <b>Меню</b>
    </div>
    
    <ul>
      <li class="{if $ge=='game'||$ge=='slots'||$ge=='table'} active{/if}"><a href="/slots"><span>Игры</span></a></li>
      <li class=""><a href="#"><span>Акции</span></a></li>
      <li class="{if $ge=='tournament'} active{/if}"><a href="/tournament" data-piwik-event="Group_Menu_Top_Items,MenuTournament,Tournament"><span>Турниры</span></a></li>
      <li class=""><a href="#"><span>Лотереи</span></a></li>
      <li class="vip "><a href="/vip"><span>VIP-уровни</span></a></li>
    </ul>

</div>
            </div>
        </div>
        <div class="top-block">
    {if !$ge}
    <div class="top-block-slider">
        <div class="top-block-slider-wrap">
                            <div class="item">
                    <div class="item-img"><img src="{$theme_url}/storage/banners/1.jpg" alt=""></div>
                    <div class="item-button">
                          {if $user_id>0}
                            <a href="/slots">
                          {else}
                            <a href="#registration-modal" class="fancybox-registration" >
                          {/if}
                                <span>Играйте в новые игры</span>
                                <img src="{$theme_url}/images/top-block-button.png" alt="">
                                <img class="hover" src="{$theme_url}/images/top-block-button-hover.png" alt="">
                            </a>
                                            </div>
                </div>
                            <div class="item">
                    <div class="item-img"><img src="{$theme_url}/storage/banners/2.jpg" alt=""></div>
                    <div class="item-button">
                          {if $user_id>0}
                            <a href="/slots">
                          {else}
                            <a href="#registration-modal" class="fancybox-registration" >
                          {/if}
                                <span>Участвовать</span>
                                <img src="{$theme_url}/images/top-block-button.png" alt="">
                                <img class="hover" src="{$theme_url}/images/top-block-button-hover.png" alt="">
                            </a>
                                            </div>
                </div>
                            <div class="item">
                    <div class="item-img"><img src="{$theme_url}/storage/banners/3.jpg" alt=""></div>
                    <div class="item-button">
                          {if $user_id>0}
                            <a href="#bonus-popup" class="fancybox-bonus">
                          {else}
                            <a href="#registration-modal" class="fancybox-registration" >
                          {/if}
                                <span>Получить бонус</span>
                                <img src="{$theme_url}/images/top-block-button.png" alt="">
                                <img class="hover" src="{$theme_url}/images/top-block-button-hover.png" alt="">
                            </a>
                                            </div>
                </div>
                            <div class="item">
                    <div class="item-img"><img src="{$theme_url}/storage/banners/4.jpg" alt=""></div>
                    <div class="item-button">
                            <a href="/lottery-weekly1" >
                                <span>Участвовать</span>
                                <img src="{$theme_url}/images/top-block-button.png" alt="">
                                <img class="hover" src="{$theme_url}/images/top-block-button-hover.png" alt="">
                            </a>
                                            </div>
                </div>
            
        </div>
    </div>
    
    <div class="top-block-text">
        <div class="top-block-text-wrap">
            <div class="top-block-text-img left"><img src="{$theme_url}/images/top-block-text-img-left.png"
                                                      alt=""></div>
            <div class="top-block-text-center">
                <img src="{$theme_url}/images/top-block-text-center-img.png" alt="">
                <p class="linear-yellow" id="top-block-counter" data-min="{substr(time(),2)}" data-max="999999999"
                   data-random-min="1" data-random-max="5"></p>
            </div>
            <div class="top-block-text-img right"><img src="{$theme_url}/images/top-block-text-img-right.png"
                                                       alt=""></div>
        </div>
    </div>
    {/if}
</div>
    </header>
<!-- /HEADER -->

    <!-- MAIN -->
    <div class="main {if $ge || !$cur_tour_one}zal-items-wrap{/if}" >
    {if isset($content_templ) && $content_templ}
      {include file=$content_templ}
    {/if}

    </div>
    <!-- /MAIN -->



<div class="overflow"></div>
</div>

    <div class="bottom-section">
        <div class="mbox">
            <div class="bottom-section-wrap">
                <div class="bottom-section-img">
                    <img src="{$theme_url}/images/bottom-section-img.png" alt="">
                </div>
                <div class="bottom-section-link">
                    <ul>
    <li class="nav__item"><a
                class="nav__link "
                href="#">О нас</a></li>
    <li class="nav__item"><a class="nav__link "
                             href="#">Условия и правила</a></li>
    <li class="nav__item"><a
                class="nav__link "
                href="#">Ответственная игра</a></li>
    <li class="nav__item"><a
                class="nav__link "
                target="_blank" href="#">Партнерская программа</a></li>
</ul>
                </div>
                <div class="bottom-section-partners">
                    <img src="{$theme_url}/images/bottom-section-partners.png" alt="">
                </div>
            </div>
        </div>
    </div>

    <div class="scroll_up">
        <div class="scroll_up_wrap">
        </div>
    </div>


    

    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/validate_script.js"></script>

    <!-- build:js -->
    <script type="text/javascript" src="{$theme_url}/js/plagins/device.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/jquery.fancybox.pack.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/jquery.formstyler.min.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/jquery.validate.min.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/additional-methods.min.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/slick.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/maskInput.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/time-to.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/jquery-ui.min.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/plagins/jquery.mCustomScrollbar.concat.min.js"></script>


    <script type="text/javascript" src="{$theme_url}/js/basic_scripts.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/develop/develop_1.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/develop/develop_4.js"></script>
    <script type="text/javascript" src="{$theme_url}/js/develop/main.js"></script>

</div>




</body>

</html>