<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="description" content="{$description} | {$lang['copyright']}">
    <meta name="keywords" content="{$keywords}" />
    <link rel="icon" href="{$theme_url}/img/favicon.ico" type="image/x-icon" />
    <title>{$title}</title>
    <link rel="stylesheet" href="{$theme_url}/css/vendor.min.css">
    <link rel="stylesheet" href="{$theme_url}/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="{$theme_url}/css/main.min.css">
    <script src="{$theme_url}/js/jquery.min.js" type="text/javascript"></script>
    <script src="{$theme_url}/vendor/svg4everybody/svg4everybody.min.js" type="text/javascript"></script>
    <script src="//ulogin.ru/js/ulogin.js" type="text/javascript"></script>

</head>
<body>
<script type="text/javascript">

  $(document).ready(function(){
    $("a.nav__link[href='/{if isset($ge)}{$ge}{/if}']").addClass('nav__link_active');
    
     //покажем окно при первом входе
  
if(get_cookie('new')&& {if isset($user_info)}{intval($user_info.gift)}{else}0{/if}>0)
  {
  //console.log(get_cookie('new'));
  $('.popup_afterRegistration').show();
  $('html').addClass('modal_open');
   delete_cookie('new');       
  }
 
 {if $q}
   console.log('{$q}')
   $.ajax({
      type:"GET",
      data:{ 'page':$("#page").val(),'group':$("#gamegroup").val(),'type':'html','q':'{$q}'},
      url:'/engine/ajax/game_list.php',
      success:function(data){
        $('.main_gallery').html(data);
      }
    })
   $('input[name=q]').val('{$q}');
 {/if}

  });

</script>  
<header class="header">
    <div class="header__left"></div>
    <div class="header__wrap wrap">
        <div class="header__wrap_bg"></div>
        <a class="header__logo" href="/"></a>       

{include file='login.tpl'}

    </div>
<div class="header__right"></div>
</header>

    <div class="hero">
        <div class="hero__slider">
            <div class="slider slider_hero">
{if $content_templ=='tournament.tpl' && isset($tournament)}
                        <div class="slider__item">                           
                            <img src="{$theme_url}/images/tournaments/{$tournament->info['pic_2']}" class="slider__img slider">
                        </div>
                        
{else}
                        
                        <div class="slider__item">
                            <a data-toggle="modal" {if !$login}data-target="#registration-modal"{else}data-target="#cabinet-modal" data-tab="#bonuses"{/if}>
                        
                                <img src="{$theme_url}/banners/banner-1.jpg" class="slider__img slider__img_mobile">
                                <img src="{$theme_url}/banners/banner-1.jpg" class="slider__img slider__img_desktop">
                                
                            </a>
                        </div>
                        
                        <div class="slider__item">
                            <a {if !$login}data-toggle="modal" data-target="#registration-modal"{else}href="/"{/if}>
                        
                                <img src="{$theme_url}/banners/banner-2.jpg" class="slider__img slider__img_mobile">
                                <img src="{$theme_url}/banners/banner-2.jpg" class="slider__img slider__img_desktop">
                                
                            </a>
                        </div>                       
{/if}                       
            </div>
        </div>
        
        <div class="hero__wrap wrap">
            <a class="hero__counter" href="/jp">
                <div class="hero__countdown">
                    <div class="countdown finecountdown" data-sum="{$jack_sum}" data-jack="{$jack_sum}" data-toggle="jackpot" id="banner-jackpot"></div>
                </div>
                <div class="hero__countnote">{$lang['jp']}</div>
                <div class="hero__countbutton"></div>
            </a>
            <div class="hero__nav">


<ul class="main-nav">
  {foreach $cat_bar as $cat}
    <li class="main-nav__item {if isset($cat.active) && $cat.active} main-nav__item_active{/if}{if $cat.subcats} main-nav__item_subnav{/if}">
    {if ($cat.pos==99 && $login)||$cat.pos!=99}
    <a class="main-nav__link" href="{$cat.href}">{$cat.name}</a>
    {else}
    <a class="main-nav__link" data-toggle="modal" href="#login-modal">{$cat.name}</a>
    {/if}
    {if $cat.subcats}
      <ul class="main-nav__subnav subnav">
      {foreach $cat.subcats as $subcat}
        <li class="subnav__item"><a class="subnav__link {if $subcat.active} subnav__link_active{/if}" href="/{$subcat.href}">{$subcat.name}</a></li>
      {/foreach}
      </ul>
    {/if}
    </li>
  {/foreach}
</ul>
            </div>
        </div>
    </div>

<!-- СЕЙЧАС ВЫИГРЫВАЮТ -->

{if $content_templ=='index.tpl' && isset($last_wins)}
    <section class="section section_winsline">
    <div class="winsline" id="tracker">
    {foreach $last_wins as $wins}
            <a class="winsline__item" {if $login}href="/games/{$wins.path}/{$wins.game}/real" {else} data-toggle="modal" data-target="#login-modal"{/if}>
                <div class="winsline__block">
                    <img src="{$theme_url}/ico/{$wins.game}.png" alt="{$wins.title}" class="winsline__img">
                    <div class="winsline__overlay">
                        <button class="winsline__button button button_small">{$lang['play']}</button>
                    </div>
                    <div class="winsline__content">
                        <p class="winsline__title">{$wins.title}</p>
                        <p class="winsline__title winsline__title_color_yellow">{$wins.win} {$lang['currency']}</p>
                        <span class="winsline__note">{$wins.time}</span>
                        <span class="winsline__note winsline__note_small">  {$wins.login}</span>
                    </div>
                </div>
            </a>
    {/foreach}
    </div>
    </section>
{/if}

{if $messages}
    {include file='message.tpl'}
{/if}   

<!-- СЕЙЧАС ВЫИГРЫВАЮТ -->

{if $content_templ=='index.tpl'}
<section class="section section_main">
{else}
<section class="section section_full">
{/if}

{if isset($content_templ) && $content_templ}
    {include file=$content_templ}
{/if}

{if $content_templ=='index.tpl'}

    <aside class="section__aside">
    <div class="aside">
    
<!-- ПОИСК -->  
    
    <div class="aside__search">
        <form action="/game" method="get" id="search-form">
            <div class="search">
                <button type="submit" class="search__button" disabled="disabled"></button>
                <input placeholder="{$lang['search']}" name="q" class="search__input" value="">
            </div>
        </form>

    </div>
    
<!-- ПОИСК -->

<!-- ТЕКУЩИЙ ТУРНИР -->

{if $cur_tour_one}
<div class="aside__curtour">
    <div class="aside__icon aside__icon_cup"><i class="icon icon_cup"></i></div>
    <div class="aside__subtitle">{$lang['current_tournament']}</div>
    <div class="aside__icon aside__icon_info"><i class="icon icon_info"></i>
        <div class="aside__tooltip tooltip">
            <div class="tooltip__content">{$cur_tour_one.minitxt}</div>
            <div class="tooltip__arrow tooltip__arrow_right"></div>
        </div>
    </div>
</div>
<div class="aside__title">{$cur_tour_one.name}</div>
<div class="aside__tournament">
    <div class="tournament tournament_undefined">
        <div class="tournament__promo">
            <div class="tournament__head">
                <div class="tournament__title">{$cur_tour_one.prizes_sum}</div>
            </div>
            <div class="tournament__img-overlay"><img src="{$theme_url}/images/tournaments/{$cur_tour_one.pic}" class="tournament__img"></div>
            <a class="tournament__button button button_shape_round" href="/tournament/{$cur_tour_one.id}">{$lang['read_more']}</a>
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
                
                <tr class="table__row">
                    <td class="table__cell">{$i+1}</td>
                    <td class="table__cell overflow_outer">
                        <div class="overflow_ellipsis">{$gamer.user}</div>
                    </td>
                    <td class="table__cell">{$gamer.result}</td>
                </tr>
                {/foreach}                
                </tbody>
            </table>
        </div>
    </div>
</div>
{/if}

<!-- ТЕКУЩИЙ ТУРНИР -->

    </div>
    </aside>
    
{/if}

</section>
    
<footer class="footer">
    <div class="footer__head">
    <img src="{$theme_url}/img/logo.png" class="footer__logo">
    </div>
    <div class="footer__nav">
        <ul class="nav nav_footer">
            <li class="nav__item"><a class="nav__link" href="/responsiblegaming">{$lang['responsiblegaming']}</a></li>
            <li class="nav__item"><a class="nav__link" href="/privacypolicy">{$lang['privacypolicy']}</a></li>
            <li class="nav__item"><a class="nav__link" href="/termsandconditions">{$lang['termsandconditions']}</a></li>
            <li class="nav__item"><a class="nav__link" href="/antifraud">{$lang['antifraud']}</a></li>
        </ul>
    </div>
    <div class="footer__icons">
        <span class="footer__cell"><i class="icon icon_visa"></i></span>
        <span class="footer__cell"><i class="icon icon_mastercard"></i></span>
        <span class="footer__cell"><i class="icon icon_qiwi"></i></span>
        <span class="footer__cell"><i class="icon icon_yandex"></i></span>
        <span class="footer__cell"><i class="icon icon_webmoney"></i></span>
        <span class="footer__cell"><i class="icon icon_moneta"></i></span>
        <span class="footer__cell"><i class="icon icon_wallet"></i></span>
        <span class="footer__cell"><i class="icon icon_sberbank"></i></span>
        <span class="footer__cell"><i class="icon icon_alfabank"></i></span>
        <span class="footer__cell"><i class="icon icon_promsvyazbank"></i></span>
    </div>
    <div class="footer__icons">
        <span class="footer__cell"><i class="icon icon_18"></i></span>
        <span class="footer__cell"><i class="icon icon_curagao"></i></span>
        <span class="footer__cell"><i class="icon icon_ecorga"></i></span>
        <span class="footer__cell"><i class="icon icon_microgaming"></i></span>
        <span class="footer__cell"><i class="icon icon_netent"></i></span>
    </div>
</footer>

{include file='dialogs.tpl'}

<div class="overflow"></div>

<div class="scroller">
    <div class="scroller__icon">
        <i class="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
    <span class="scroller__note">{$lang['up']}</span>
</div>

<script src="{$theme_url}/js/vendor.min.js"></script>

<script src="{$theme_url}/js/scripts.js"></script>
  
</body>
</html>