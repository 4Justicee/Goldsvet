<?php
/* Smarty version 3.1.31, created on 2019-11-02 17:04:04
  from "/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/tournament.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5dbd9ae4eb29f0_98329837',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ba507d8558e3a8d325720399cdb390049d597b68' => 
    array (
      0 => '/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/tournament.tpl',
      1 => 1498228642,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5dbd9ae4eb29f0_98329837 (Smarty_Internal_Template $_smarty_tpl) {
?>
<main class="section__main">
<?php if (isset($_smarty_tpl->tpl_vars['tournament']->value)) {?>

<div class="popup popup_tournamentGames" style="display:none">
    <div class="popup__close js-close-popup"><i class="icon icon_cross-bold"></i></div>
    <div class="popup__head">
        <div class="popup__title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['games_tournament'];?>
</div>
        <form action="/game" method="get">
            <div class="popup__search search">
                <button type="submit" class="search__button" disabled="disabled"></button>
                <input placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['search'];?>
" name="q" onkeyup="searchGame($(this).val())" class="search__input" value="">
            </div>
        </form>
    </div>
    <div class="popup__content">
      <div class="popup__gallery">
        <div class="main main_gallery">
        <?php if (($_smarty_tpl->tpl_vars['tournament']->value->games)) {?>
        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['tournament']->value->games, 'game');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['game']->value) {
?>
          <li class="main__item preview">
                        <div class="preview__item">
                            <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/ico/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
.png" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                  <a <?php if ($_smarty_tpl->tpl_vars['login']->value) {?>href="/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['start_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/real" <?php } else { ?> data-toggle="modal" data-target="#login-modal"<?php }?> class="preview__button button button_color_orange" ><?php echo $_smarty_tpl->tpl_vars['lang']->value['play'];?>
</a><br>
                                  <a href="/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['start_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/demo" class="preview__button preview__button_demo button button_color_green">
									  <?php echo $_smarty_tpl->tpl_vars['lang']->value['demo'];?>

                                    </a>
                                </div>
                                  <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="<?php echo $_smarty_tpl->tpl_vars['game']->value['g_id'];?>
" title="$lang['add_favorites']"></i>
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
        <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>
 
        <?php }?> 
        </div>
      </div>
    </div>
</div>

<div class="main main_tournament-details">
                <div class="tournament-details">
                    <div class="tournament-details__header">
                        <div class="tournament-details__header_top">
                            <h1 class="tournament-details__title title title_font_hugest"><?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['name'];?>
</h1>
                        </div>

                        <h2 class="tournament-details__subtitle title title_color_accent"><?php echo $_smarty_tpl->tpl_vars['lang']->value['prize_fund'];?>
</h2>
                        <div class="tournament-details__countdown">
                            <div class="countdown finecountdown" data-sum="<?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['prizes_sum'];?>
"></div>
                            <div class="tournament-details__currency tournament-details__currency_ruble"></div>
                        </div>
                    </div>
                    <div class="tournament-details__summary">
                        <div class="summary">
                            <div class="summary__block">
                                <div class="summary__description">
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['description'];?>
</div>
                                        </div>
                                    </div>
                                    <div class="summary__content" >
                                        <?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['txt'];?>

                                    </div>
                                </div>
                            </div>
                            <div class="summary__block">
                                <div class="summary__info">
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['status'];?>
:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title">
                                                 <?php if (strtotime($_smarty_tpl->tpl_vars['tournament']->value->info['start_time']) > time()) {
echo $_smarty_tpl->tpl_vars['lang']->value['soon'];
} else {
echo $_smarty_tpl->tpl_vars['lang']->value['active'];
}?>
                                                                                            </div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['date_start'];?>
:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['start_time'];?>
</div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['date_end'];?>
:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['end_time'];?>
</div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['type_tournament'];?>
:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['type_txt'];?>
</div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['bet_tournament'];?>
:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['min_stav'];?>
</div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['qualification'];?>
:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title"><?php echo $_smarty_tpl->tpl_vars['tournament']->value->info['spin_count'];?>
</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 class="tournament-details__crosstitle title title_font_huge"><?php echo $_smarty_tpl->tpl_vars['lang']->value['leaders'];?>
:</h3><span class="tournament-details__leaderboard">
          <div class="leaderboard">
              <div class="leaderboard__slider slider_leaderboard">
                  
                  <div class="leaderboard__block">
                <table class="table table_leaderboard">
                  <thead class="table__head">
                  <tr class="table__headrow">
                    <th class="table__cell">#</th>
                    <th class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['login'];?>
</th>
                    <th class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['points'];?>
</th>
                    <th class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['prize'];?>
</th>
                  </tr>
                  </thead>
                  <tbody class="table__body">
                  <?php
$_smarty_tpl->tpl_vars['i'] = new Smarty_Variable(null, $_smarty_tpl->isRenderingCache);
$_smarty_tpl->tpl_vars['i']->value = 0;
if ($_smarty_tpl->tpl_vars['i']->value < 10) {
for ($_foo=true;$_smarty_tpl->tpl_vars['i']->value < 10; $_smarty_tpl->tpl_vars['i']->value++) {
?>
                    <tr class="table__row">
                      <td class="table__cell"><?php echo $_smarty_tpl->tpl_vars['i']->value+1;?>
</td>
                      <td class="table__cell table__cell_fluid"><?php if (isset($_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value])) {
if (is_numeric($_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value]['user_id'])) {
echo $_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value]['user'];
} else {
echo $_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value]['user_id'];
}
}?></td>
                      <td class="table__cell"><?php if (isset($_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value])) {
echo $_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value]['result'];
}?></td>
                      <td class="table__cell"><?php if (isset($_smarty_tpl->tpl_vars['tournament']->value->prizes[$_smarty_tpl->tpl_vars['i']->value])) {
echo $_smarty_tpl->tpl_vars['tournament']->value->prizes[$_smarty_tpl->tpl_vars['i']->value]['suma'];
}?></td>
                    </tr>
                  <?php }
}
?>

                    </tbody>
                  </table>
                  </div>
                  
                  <div class="leaderboard__block">
                <table class="table table_leaderboard">
                  <thead class="table__head">
                  <tr class="table__headrow">
                    <th class="table__cell">#</th>
                    <th class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['login'];?>
</th>
                    <th class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['points'];?>
</th>
                    <th class="table__cell"><?php echo $_smarty_tpl->tpl_vars['lang']->value['prize'];?>
</th>
                  </tr>
                  </thead>
                  <tbody class="table__body">
                  <?php
$_smarty_tpl->tpl_vars['i'] = new Smarty_Variable(null, $_smarty_tpl->isRenderingCache);
$_smarty_tpl->tpl_vars['i']->value = 10;
if ($_smarty_tpl->tpl_vars['i']->value < 20) {
for ($_foo=true;$_smarty_tpl->tpl_vars['i']->value < 20; $_smarty_tpl->tpl_vars['i']->value++) {
?>
                    <tr class="table__row">
                      <td class="table__cell"><?php echo $_smarty_tpl->tpl_vars['i']->value+1;?>
</td>
                      <td class="table__cell table__cell_fluid"><?php if (isset($_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value])) {
if (is_numeric($_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value]['user_id'])) {
echo $_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value]['user'];
} else {
echo $_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value]['user_id'];
}
}?></td>
                      <td class="table__cell"><?php if (isset($_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value])) {
echo $_smarty_tpl->tpl_vars['tournament']->value->gamers[$_smarty_tpl->tpl_vars['i']->value]['result'];
}?></td>
                      <td class="table__cell"><?php if (isset($_smarty_tpl->tpl_vars['tournament']->value->prizes[$_smarty_tpl->tpl_vars['i']->value])) {
echo $_smarty_tpl->tpl_vars['tournament']->value->prizes[$_smarty_tpl->tpl_vars['i']->value]['suma'];
}?></td>
                    </tr>
                  <?php }
}
?>

                    </tbody>
                  </table>
                  </div>
              </div>
              <?php if ($_smarty_tpl->tpl_vars['login']->value) {?>
                    <div class="leaderboard__importance">
                      <div class="leaderboard__cell"><?php echo $_smarty_tpl->tpl_vars['place']->value;?>
</div>
                      <div class="leaderboard__cell leaderboard__cell_fluid"><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['you'];?>
</div>
                      <div class="leaderboard__cell leaderboard__cell_fluid"> &mdash; </div>
                      <div class="leaderboard__cell"> &mdash; </div>
                    </div>
                  <?php }?>
                        </div></span>
                    <?php if ($_smarty_tpl->tpl_vars['tournament']->value->games) {?>
                    <h3 class="tournament-details__crosstitle tournament-details__crosstitle_small title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['games_tournament'];?>
</h3>
                    <div class="tournament-details__slider">
                        <div class="slider slider_tournament">
                        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['tournament']->value->games, 'game');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['game']->value) {
?> 
                          <a class="slider__item" <?php if ($_smarty_tpl->tpl_vars['login']->value) {?> href="/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['start_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/real" <?php } else { ?>data-toggle="modal" data-target="#login-modal"<?php }?> style="width: 110px;">
                             <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/ico/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
.png" class="slider__img" width="100px">
                             <span class="slider__title title title_font_smallest"><?php echo $_smarty_tpl->tpl_vars['game']->value['g_title'];?>
</span>
                          </a>
                        <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                        </div>
                    </div>
                    
                    <button class="tournament-details__button button button_shape_round" data-toggle="modal" data-target=".popup_tournamentGames"><?php echo $_smarty_tpl->tpl_vars['lang']->value['all_slots'];?>
</button>
                    <?php }?>
                </div>
            </div>

<?php } else { ?>

 <div class="main main_tournament">
            <div class="lottery__title title title_font_hugest"><?php echo $_smarty_tpl->tpl_vars['lang']->value['tournament'];?>
</div>
            <div class="lottery__tabs" style="margin-bottom: 20px">
                <div class="lottery__tabitem lottery__tabitem_active" data-toggle="tab" data-target="#current_tournaments" data-piwik-event="Group_Tournaments_List_Page,TournamentPageListCurrent,Current_Tournaments">
                    <span class="lottery__caption title title_font_large title_family_basee">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['current_tournaments'];?>

                    </span>
                    <span class="lottery__caption lottery__caption_xs title title_font_large title_family_base">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['current'];?>

                    </span>
                </div>
                <div class="lottery__tabitem" data-toggle="tab" data-target="#ended_tournaments" data-piwik-event="Group_Tournaments_List_Page,TournamentPageListPast,Ended_Tournaments">
                    <span class="lottery__caption title title_font_large title_family_basee">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['completed_tournaments'];?>

                    </span>
                    <span class="lottery__caption lottery__caption_xs title title_font_large title_family_base">
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['completed'];?>

                    </span>
                </div>
            </div>
            <div class="tab__content">
                <div id="current_tournaments" class="active">
                 <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['cur_tour']->value, 'tour');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['tour']->value) {
?>
               
                   <div class="main__item">
                            <div class="panel panel_tournament">
                                <div class="panel__cell panel__cell_img">
                                    <div class="panel__overflow"></div>
                                    <div class="img_overflow"><img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/images/tournaments/<?php echo $_smarty_tpl->tpl_vars['tour']->value['pic'];?>
" class="panel__img"></div>
                                    <div class="panel__timer">
                                        <div class="timer">
                                            <div class="timer__note">
                                              <?php if (strtotime($_smarty_tpl->tpl_vars['tour']->value['start_time']) > time()) {
echo $_smarty_tpl->tpl_vars['lang']->value['before_start'];
} else {
echo $_smarty_tpl->tpl_vars['lang']->value['time_left'];
}?>
                                            </div>
                                            <div class="timer__table">
                                                <div class="timer__row timer__row_digit" data-toggle="timer" id="current_tour_<?php echo $_smarty_tpl->tpl_vars['tour']->value['id'];?>
" data-time="<?php if (strtotime($_smarty_tpl->tpl_vars['tour']->value['start_time']) > time()) {
echo strtotime($_smarty_tpl->tpl_vars['tour']->value['start_time']);
} else {
echo strtotime($_smarty_tpl->tpl_vars['tour']->value['end_time']);
}?>"> <div class="timer__cell">0</div> <div class="timer__cell timer__cell_empty"></div> <div class="timer__cell">00</div> <div class="timer__cell">:</div> <div class="timer__cell">00</div> <div class="timer__cell">:</div> <div class="timer__cell">00</div> </div>
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
                                    </div>
                                </div>
                                <div class="panel__cell panel__cell_content">
                                    <div class="panel__summary">
                                        <div class="panel__info">
                                            <div class="panel__header">
                                                <?php if (strtotime($_smarty_tpl->tpl_vars['tour']->value['start_time']) > time()) {?>
                                                <span class="panel__status panel__status_future">
												<?php echo $_smarty_tpl->tpl_vars['lang']->value['soon'];?>

                                                </span>
                                                <?php } else { ?>
                                                <span class="panel__status ">
												<?php echo $_smarty_tpl->tpl_vars['lang']->value['active'];?>

                                                </span>
                                                <?php }?>
                                                <span class="panel__title panel__title_tournament title"><?php echo $_smarty_tpl->tpl_vars['tour']->value['name'];?>
</span>
                                            </div>
                                            <div class="panel__caption">
                                                <?php echo $_smarty_tpl->tpl_vars['tour']->value['minitxt'];?>
 
                                            </div>
                                            <div class="panel__info-button">
                                                <a href="/tournament/<?php echo $_smarty_tpl->tpl_vars['tour']->value['id'];?>
" class="button button_color_brightblue"><?php echo $_smarty_tpl->tpl_vars['lang']->value['read_more'];?>
<span class="panel__arrow"><i class="icon icon_arrow-right-white"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="panel__prize">
                                            <div class="panel__countnote title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['prize_fund'];?>
</div>
                                            <div class="panel__countbutton"><?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</div>
                                            <div class="panel__countdown">
                                                <div class="countdown finecountdown" data-sum="<?php echo $_smarty_tpl->tpl_vars['tour']->value['prizes_sum'];?>
"></div>
                                            </div>
                                            <div class="panel__icons">
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-gold-large">1</span>
                                                    <h5 class="panel__icon-title title"><?php if (isset($_smarty_tpl->tpl_vars['tour']->value['prizes'][0])) {
echo $_smarty_tpl->tpl_vars['tour']->value['prizes'][0]['suma'];
}?></h5>
                                                </div>
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-silver-large">2</span>
                                                    <h5 class="panel__icon-title title"><?php if (isset($_smarty_tpl->tpl_vars['tour']->value['prizes'][1])) {
echo $_smarty_tpl->tpl_vars['tour']->value['prizes'][1]['suma'];
}?></h5>
                                                </div>
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-bronze-large">3</span>
                                                    <h5 class="panel__icon-title title"><?php if (isset($_smarty_tpl->tpl_vars['tour']->value['prizes'][2])) {
echo $_smarty_tpl->tpl_vars['tour']->value['prizes'][2]['suma'];
}?></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel__slider">
                                        <div class="panel__slider-inner">
                                            <div class="slider slider_small">
                                              <?php if ($_smarty_tpl->tpl_vars['tour']->value['games']) {?>
                                              <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['tour']->value['games'], 'game');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['game']->value) {
?>
                                              <a class="slider__item" <?php if ($_smarty_tpl->tpl_vars['login']->value) {?>href="/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['start_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/real" <?php } else { ?>data-toggle="modal" data-target="#login-modal"<?php }?> style="width: 110px;">
                                                  <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/ico/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
.png" class="slider__img" width="82" height="60">
                                                  <span class="slider__title title title_font_smallest"><?php echo $_smarty_tpl->tpl_vars['game']->value['g_title'];?>
</span>
                                              </a>
                                              <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>
 
                                              <?php }?>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                 <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

                 </div>
                <div id="ended_tournaments">
                   <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['end_tour']->value, 'tour');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['tour']->value) {
?>
               
                   <div class="main__item">
                            <div class="panel panel_tournament">
                                <div class="panel__cell panel__cell_img">
                                    <div class="panel__overflow"></div>
                                    <div class="img_overflow"><img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/images/tournaments/<?php echo $_smarty_tpl->tpl_vars['tour']->value['pic'];?>
" class="panel__img"></div>
                                    <div class="panel__timer">
                                        <div class="timer">
                                            <div class="timer__note">
                                              <?php if (strtotime($_smarty_tpl->tpl_vars['tour']->value['start_time']) > time()) {
echo $_smarty_tpl->tpl_vars['lang']->value['before_start'];
} else {
echo $_smarty_tpl->tpl_vars['lang']->value['time_left'];
}?>
                                            </div>
                                            <div class="timer__table">
                                                <div class="timer__row timer__row_digit" data-toggle="timer" id="current_tour_<?php echo $_smarty_tpl->tpl_vars['tour']->value['id'];?>
" data-time="<?php echo strtotime($_smarty_tpl->tpl_vars['tour']->value['end_time']);?>
"> <div class="timer__cell">0</div> <div class="timer__cell timer__cell_empty"></div> <div class="timer__cell">00</div> <div class="timer__cell">:</div> <div class="timer__cell">00</div> <div class="timer__cell">:</div> <div class="timer__cell">00</div> </div>
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
                                    </div>
                                </div>
                                <div class="panel__cell panel__cell_content">
                                    <div class="panel__summary">
                                        <div class="panel__info">
                                            <div class="panel__header">
                                                <span class="panel__status panel__status_finished"><?php echo $_smarty_tpl->tpl_vars['lang']->value['over'];?>
</span>
                                                <span class="panel__title panel__title_tournament title"><?php echo $_smarty_tpl->tpl_vars['tour']->value['name'];?>
</span>
                                            </div>
                                            <div class="panel__caption">
                                                <?php echo $_smarty_tpl->tpl_vars['tour']->value['minitxt'];?>
 
                                            </div>
                                            <div class="panel__info-button">
                                                <a href="/tournament/<?php echo $_smarty_tpl->tpl_vars['tour']->value['id'];?>
" class="button button_color_brightblue"><?php echo $_smarty_tpl->tpl_vars['lang']->value['read_more'];?>
<span class="panel__arrow"><i class="icon icon_arrow-right-white"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="panel__prize">
                                            <div class="panel__countnote title"><?php echo $_smarty_tpl->tpl_vars['lang']->value['prize_fund'];?>
</div>
                                            <div class="panel__countbutton"><?php echo $_smarty_tpl->tpl_vars['lang']->value['currency'];?>
</div>
                                            <div class="panel__countdown">
                                                <div class="countdown finecountdown" data-sum="<?php echo $_smarty_tpl->tpl_vars['tour']->value['prizes_sum'];?>
"></div>
                                            </div>
                                            <div class="panel__icons">
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-gold-large">1</span>
                                                    <h5 class="panel__icon-title title"><?php if (isset($_smarty_tpl->tpl_vars['tour']->value['prizes'][0])) {
echo $_smarty_tpl->tpl_vars['tour']->value['prizes'][0]['suma'];
}?></h5>
                                                </div>
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-silver-large">2</span>
                                                    <h5 class="panel__icon-title title"><?php if (isset($_smarty_tpl->tpl_vars['tour']->value['prizes'][0])) {
echo $_smarty_tpl->tpl_vars['tour']->value['prizes'][1]['suma'];
}?></h5>
                                                </div>
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-bronze-large">3</span>
                                                    <h5 class="panel__icon-title title"><?php if (isset($_smarty_tpl->tpl_vars['tour']->value['prizes'][0])) {
echo $_smarty_tpl->tpl_vars['tour']->value['prizes'][2]['suma'];
}?></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel__slider">
                                        <div class="panel__slider-inner">
                                            <div class="slider slider_small">
                                              <?php if ($_smarty_tpl->tpl_vars['tour']->value['games']) {?>
                                              <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['tour']->value['games'], 'game');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['game']->value) {
?>
                                              <a class="slider__item" <?php if ($_smarty_tpl->tpl_vars['login']->value) {?>href="/games/<?php echo $_smarty_tpl->tpl_vars['game']->value['start_path'];?>
/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
/real" <?php } else { ?> data-toggle="modal" data-target="#login-modal"<?php }?> style="width: 110px;">
                                                  <img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/ico/<?php echo $_smarty_tpl->tpl_vars['game']->value['g_name'];?>
.png" class="slider__img" width="82" height="60">
                                                  <span class="slider__title title title_font_smallest"><?php echo $_smarty_tpl->tpl_vars['game']->value['g_title'];?>
</span>
                                              </a>
                                              <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>
 
                                              <?php }?>
                                                
                                            </div>
                                        </div>
                                    </div>
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
<?php }?>
</main><?php }
}
