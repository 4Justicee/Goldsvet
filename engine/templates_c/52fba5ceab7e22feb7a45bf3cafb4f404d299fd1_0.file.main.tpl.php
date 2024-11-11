<?php
/* Smarty version 3.1.31, created on 2020-02-26 04:04:53
  from "C:\xampp\htdocs\Game_Site\engine\templates\default\main.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5e55e055ee8a10_20655620',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '52fba5ceab7e22feb7a45bf3cafb4f404d299fd1' => 
    array (
      0 => 'C:\\xampp\\htdocs\\Game_Site\\engine\\templates\\default\\main.tpl',
      1 => 1574483195,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:login.tpl' => 1,
    'file:message.tpl' => 1,
    'file:dialogs.tpl' => 1,
  ),
),false)) {
function content_5e55e055ee8a10_20655620 (Smarty_Internal_Template $_smarty_tpl) {
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['description']->value;?>
 | <?php echo $_smarty_tpl->tpl_vars['lang']->value['copyright'];?>
">
    <meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['keywords']->value;?>
" />
    <link rel="icon" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/favicon.ico" type="image/x-icon" />
    <title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
    <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/css/vendor.min.css">
    <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/css/main.min.css">
    <?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/js/jquery.min.js" type="text/javascript"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/vendor/svg4everybody/svg4everybody.min.js" type="text/javascript"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="//ulogin.ru/js/ulogin.js" type="text/javascript"><?php echo '</script'; ?>
>

</head>
<body>
<?php echo '<script'; ?>
 type="text/javascript">

  $(document).ready(function(){
    $("a.nav__link[href='/<?php if (isset($_smarty_tpl->tpl_vars['ge']->value)) {
echo $_smarty_tpl->tpl_vars['ge']->value;
}?>']").addClass('nav__link_active');
    
     //                                                      
  
if(get_cookie('new')&& <?php if (isset($_smarty_tpl->tpl_vars['user_info']->value)) {
echo intval($_smarty_tpl->tpl_vars['user_info']->value['gift']);
} else { ?>0<?php }?>>0)
  {
  //console.log(get_cookie('new'));
  $('.popup_afterRegistration').show();
  $('html').addClass('modal_open');
   delete_cookie('new');       
  }
 
 <?php if ($_smarty_tpl->tpl_vars['q']->value) {?>
   console.log('<?php echo $_smarty_tpl->tpl_vars['q']->value;?>
')
   $.ajax({
      type:"GET",
      data:{ 'page':$("#page").val(),'group':$("#gamegroup").val(),'type':'html','q':'<?php echo $_smarty_tpl->tpl_vars['q']->value;?>
'},
      url:'/engine/ajax/game_list.php',
      success:function(data){
        $('.main_gallery').html(data);
      }
    })
   $('input[name=q]').val('<?php echo $_smarty_tpl->tpl_vars['q']->value;?>
');
 <?php }?>

  });

<?php echo '</script'; ?>
>  
<header class="header">
    <div class="header__left"></div>
    <div class="header__wrap wrap">
        <div class="header__wrap_bg"></div>
        <a class="header__logo" href="/"></a>       

<?php $_smarty_tpl->_subTemplateRender('file:login.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>


    </div>
<div class="header__right"></div>
</header>

    <div class="hero">
        <div class="hero__slider">
            <div class="slider slider_hero">
<?php if ($_smarty_tpl->tpl_vars['content_templ']->value == 'tournament.tpl' && isset($_smarty_tpl->tpl_vars['tournament']->value)) {?>
                        <div class="slider__item">                           
                            <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/images/tournaments/<?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['pic_2'];?>
" class="slider__img slider">
                        </div>
                        
<?php } else { ?>
                        
                        <div class="slider__item">
                            <a data-toggle="modal" <?php if (!$_smarty_tpl->tpl_vars['login']->value) {?>data-target="#registration-modal"<?php } else { ?>data-target="#cabinet-modal" data-tab="#bonuses"<?php }?>>
                        
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/banners/banner-1.jpg" class="slider__img slider__img_mobile">
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/banners/banner-1.jpg" class="slider__img slider__img_desktop">
                                
                            </a>
                        </div>
                        
                        <div class="slider__item">
                            <a <?php if (!$_smarty_tpl->tpl_vars['login']->value) {?>data-toggle="modal" data-target="#registration-modal"<?php } else { ?>href="/"<?php }?>>
                        
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/banners/bbanner-2.jpg" class="slider__img slider__img_mobile">
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/banners/banner-2.jpg" class="slider__img slider__img_desktop">
                                
                            </a>
                        </div>
                            
                        <div class="slider__item">
                            <a <?php if (!$_smarty_tpl->tpl_vars['login']->value) {?>data-toggle="modal" data-target="#registration-modal"<?php } else { ?>href="/"<?php }?>>
                        
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/banners/banner-3.jpg" class="slider__img slider__img_mobile">
                                <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/banners/banner-3.jpg" class="slider__img slider__img_desktop">
                                
                            </a>
                        </div>
<?php }?>                       
            </div>
        </div>
        
        <div class="hero__wrap wrap">
            <a class="hero__counter" href="/jp">
                <div class="hero__countdown">
                    <div class="countdown finecountdown" data-sum="<?php echo $_smarty_tpl->tpl_vars['jack_sum']->value;?>
" data-jack="<?php echo $_smarty_tpl->tpl_vars['jack_sum']->value;?>
" data-toggle="jackpot" id="banner-jackpot"></div>
                </div>
                <div class="hero__countnote"><?php echo $_smarty_tpl->tpl_vars['lang']->value['jp'];?>
</div>
                <div class="hero__countbutton"></div>
            </a>
            <div class="hero__nav">


<ul class="main-nav">
  <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['cat_bar']->value, 'cat');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['cat']->value) {
?>
    <li class="main-nav__item <?php if (isset($_smarty_tpl->tpl_vars['cat']->value['active']) && $_smarty_tpl->tpl_vars['cat']->value['active']) {?> main-nav__item_active<?php }
if ($_smarty_tpl->tpl_vars['cat']->value['subcats']) {?> main-nav__item_subnav<?php }?>">
    <?php if (($_smarty_tpl->tpl_vars['cat']->value['pos'] == 99 && $_smarty_tpl->tpl_vars['login']->value) || $_smarty_tpl->tpl_vars['cat']->value['pos'] != 99) {?>
    <a class="main-nav__link" href="<?php echo $_smarty_tpl->tpl_vars['cat']->value['href'];?>
"><?php echo $_smarty_tpl->tpl_vars['cat']->value['name'];?>
</a>
    <?php } else { ?>
    <a class="main-nav__link" data-toggle="modal" href="#login-modal"><?php echo $_smarty_tpl->tpl_vars['cat']->value['name'];?>
</a>
    <?php }?>
    <?php if ($_smarty_tpl->tpl_vars['cat']->value['subcats']) {?>
      <ul class="main-nav__subnav subnav">
      <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['cat']->value['subcats'], 'subcat');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['subcat']->value) {
?>
        <li class="subnav__item"><a class="subnav__link <?php if ($_smarty_tpl->tpl_vars['subcat']->value['active']) {?> subnav__link_active<?php }?>" href="/<?php echo $_smarty_tpl->tpl_vars['subcat']->value['href'];?>
"><?php echo $_smarty_tpl->tpl_vars['subcat']->value['name'];?>
</a></li>
      <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

      </ul>
    <?php }?>
    </li>
  <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

</ul>
            </div>
        </div>
    </div>

<!--                                   -->

<?php if ($_smarty_tpl->tpl_vars['content_templ']->value == 'index.tpl' && isset($_smarty_tpl->tpl_vars['last_wins']->value)) {?>
    <section class="section section_winsline">
    <div class="winsline" id="tracker">
    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['last_wins']->value, 'wins');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['wins']->value) {
?>
            <a class="winsline__item" <?php if ($_smarty_tpl->tpl_vars['login']->value) {?>href="/games/<?php echo $_smarty_tpl->tpl_vars['wins']->value['path'];?>
/<?php echo $_smarty_tpl->tpl_vars['wins']->value['game'];?>
/real" <?php } else { ?> data-toggle="modal" data-target="#login-modal"<?php }?>>
                <div class="winsline__block">
                    <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/ico/<?php echo $_smarty_tpl->tpl_vars['wins']->value['game'];?>
.png" alt="<?php echo $_smarty_tpl->tpl_vars['wins']->value['title'];?>
" class="winsline__img">
                    <div class="winsline__overlay">
                        <button class="winsline__button button button_small"><?php echo $_smarty_tpl->tpl_vars['lang']->value['play'];?>
</button>
                    </div>
                    <div class="winsline__content">
                        <p class="winsline__title"><?php echo $_smarty_tpl->tpl_vars['wins']->value['title'];?>
</p>
                        <p class="winsline__title winsline__title_color_yellow"><?php echo $_smarty_tpl->tpl_vars['wins']->value['win'];?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</p>
                        <span class="winsline__note"><?php echo $_smarty_tpl->tpl_vars['wins']->value['time'];?>
</span>
                        <span class="winsline__note winsline__note_small">  <?php echo $_smarty_tpl->tpl_vars['wins']->value['login'];?>
</span>
                    </div>
                </div>
            </a>
    <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

    </div>
    </section>
<?php }?>

<?php if ($_smarty_tpl->tpl_vars['messages']->value) {?>
    <?php $_smarty_tpl->_subTemplateRender('file:message.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<?php }?>   

<!--                                   -->

<?php if ($_smarty_tpl->tpl_vars['content_templ']->value == 'index.tpl') {?>
<section class="section section_main">
<?php } else { ?>
<section class="section section_full">
<?php }?>

<?php if (isset($_smarty_tpl->tpl_vars['content_templ']->value) && $_smarty_tpl->tpl_vars['content_templ']->value) {?>
    <?php $_smarty_tpl->_subTemplateRender($_smarty_tpl->tpl_vars['content_templ']->value, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
?>

<?php }?>

<?php if ($_smarty_tpl->tpl_vars['content_templ']->value == 'index.tpl') {?>

    <aside class="section__aside">
    <div class="aside">
    
<!--            -->  
    
    <div class="aside__search">
        <form action="/game" method="get" id="search-form">
            <div class="search">
                <button type="submit" class="search__button" disabled="disabled"></button>
                <input placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['search'];?>
" name="q" class="search__input" value="">
            </div>
        </form>

    </div>
    
<!--            -->

<!--                             -->

<?php if ($_smarty_tpl->tpl_vars['cur_tour_one']->value) {?>
<div class="aside__curtour">
    <div class="aside__icon aside__icon_cup"><i class="icon icon_cup"></i></div>
    <div class="aside__subtitle"><?php echo $_smarty_tpl->tpl_vars['lang']->value['current_tournament'];?>
</div>
    <div class="aside__icon aside__icon_info"><i class="icon icon_info"></i>
        <div class="aside__tooltip tooltip">
            <div class="tooltip__content"><?php echo $_smarty_tpl->tpl_vars['cur_tour_one']->value['minitxt'];?>
</div>
            <div class="tooltip__arrow tooltip__arrow_right"></div>
        </div>
    </div>
</div>
<div class="aside__title"><?php echo $_smarty_tpl->tpl_vars['cur_tour_one']->value['name'];?>
</div>
<div class="aside__tournament">
    <div class="tournament tournament_undefined">
        <div class="tournament__promo">
            <div class="tournament__head">
                <div class="tournament__title"><?php echo $_smarty_tpl->tpl_vars['cur_tour_one']->value['prizes_sum'];?>
</div>
            </div>
            <div class="tournament__img-overlay"><img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/images/tournaments/<?php echo $_smarty_tpl->tpl_vars['cur_tour_one']->value['pic'];?>
" class="tournament__img"></div>
            <a class="tournament__button button button_shape_round" href="/tournament/<?php echo $_smarty_tpl->tpl_vars['cur_tour_one']->value['id'];?>
"><?php echo $_smarty_tpl->tpl_vars['lang']->value['read_more'];?>
</a>
        </div>
        <div class="tournament__timer timer">
            <div class="timer__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['time_left'];?>
</div>
            <div class="timer__table">
                <div class="timer__row timer__row_digit" data-toggle="timer" id="<?php echo $_smarty_tpl->tpl_vars['cur_tour_one']->value['id'];?>
" data-time="<?php echo strtotime($_smarty_tpl->tpl_vars['cur_tour_one']->value['end_time']);?>
"></div>
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
        <div class="tournament__table">
            <table class="table table_main">
                <thead class="table__head">
                <tr class="table__headrow">
                    <th class="table__cell">#</th>
                    <td class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['login'];?>
</td>
                    <th class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['points'];?>
</th>
                </tr>
                </thead>
                <tbody class="table__body">
                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['cur_tour_one']->value['gamers'], 'gamer', false, 'i');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['i']->value => $_smarty_tpl->tpl_vars['gamer']->value) {
?>
                
                <tr class="table__row">
                    <td class="table__cell"><?php echo $_smarty_tpl->tpl_vars['i']->value+1;?>
</td>
                    <td class="table__cell overflow_outer">
                        <div class="overflow_ellipsis"><?php echo $_smarty_tpl->tpl_vars['gamer']->value['user'];?>
</div>
                    </td>
                    <td class="table__cell"><?php echo $_smarty_tpl->tpl_vars['gamer']->value['result'];?>
</td>
                </tr>
                <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>
                
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php }?>

<!--                             -->

    </div>
    </aside>
    
<?php }?>

</section>
    
<footer class="footer">
    <div class="footer__head">
    <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/img/logo.png" class="footer__logo">
    </div>
    <div class="footer__nav">
        <ul class="nav nav_footer">
            <li class="nav__item"><a class="nav__link" href="/responsiblegaming"><?php echo $_smarty_tpl->tpl_vars['lang']->value['responsiblegaming'];?>
</a></li>
            <li class="nav__item"><a class="nav__link" href="/privacypolicy"><?php echo $_smarty_tpl->tpl_vars['lang']->value['privacypolicy'];?>
</a></li>
            <li class="nav__item"><a class="nav__link" href="/termsandconditions"><?php echo $_smarty_tpl->tpl_vars['lang']->value['termsandconditions'];?>
</a></li>
            <li class="nav__item"><a class="nav__link" href="/antifraud"><?php echo $_smarty_tpl->tpl_vars['lang']->value['antifraud'];?>
</a></li>
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

<?php $_smarty_tpl->_subTemplateRender('file:dialogs.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>


<div class="overflow"></div>

<div class="scroller">
    <div class="scroller__icon">
        <i class="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
    <span class="scroller__note"><?php echo $_smarty_tpl->tpl_vars['lang']->value['up'];?>
</span>
</div>

<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/js/vendor.min.js"><?php echo '</script'; ?>
>

<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/js/scripts.js"><?php echo '</script'; ?>
>
  
</body>
</html><?php }
}
