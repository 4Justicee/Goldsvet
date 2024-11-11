<main class="section__main">
{if isset($tournament)}

<div class="popup popup_tournamentGames" style="display:none">
    <div class="popup__close js-close-popup"><i class="icon icon_cross-bold"></i></div>
    <div class="popup__head">
        <div class="popup__title">{$lang['games_tournament']}</div>
        <form action="/game" method="get">
            <div class="popup__search search">
                <button type="submit" class="search__button" disabled="disabled"></button>
                <input placeholder="{$lang['search']}" name="q" onkeyup="searchGame($(this).val())" class="search__input" value="">
            </div>
        </form>
    </div>
    <div class="popup__content">
      <div class="popup__gallery">
        <div class="main main_gallery">
        {if ($tournament->games)}
        {foreach $tournament->games as $game}
          <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/{$game.g_name}.png" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                  <a {if $login}href="/games/{$game.start_path}/{$game.g_name}/real" {else} data-toggle="modal" data-target="#login-modal"{/if} class="preview__button button button_color_orange" >{$lang['play']}</a><br>
                                  <a href="/games/{$game.start_path}/{$game.g_name}/demo" class="preview__button preview__button_demo button button_color_green">
									  {$lang['demo']}
                                    </a>
                                </div>
                                  <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="{$game.g_id}" title="$lang['add_favorites']"></i>
                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">{$game.g_title}</p>
                            <p class="preview__note">{$lang['now_playing']}: {$game.g_counter}</p>
                        </div>
          </li>
        {/foreach} 
        {/if} 
        </div>
      </div>
    </div>
</div>

<div class="main main_tournament-details">
                <div class="tournament-details">
                    <div class="tournament-details__header">
                        <div class="tournament-details__header_top">
                            <h1 class="tournament-details__title title title_font_hugest">{$tournament->info['name']}</h1>
                        </div>

                        <h2 class="tournament-details__subtitle title title_color_accent">{$lang['prize_fund']}</h2>
                        <div class="tournament-details__countdown">
                            <div class="countdown finecountdown" data-sum="{$tournament->info['prizes_sum']}"></div>
                            <div class="tournament-details__currency tournament-details__currency_ruble"></div>
                        </div>
                    </div>
                    <div class="tournament-details__summary">
                        <div class="summary">
                            <div class="summary__block">
                                <div class="summary__description">
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$lang['description']}</div>
                                        </div>
                                    </div>
                                    <div class="summary__content" >
                                        {$tournament->info['txt']}
                                    </div>
                                </div>
                            </div>
                            <div class="summary__block">
                                <div class="summary__info">
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$lang['status']}:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title">
                                                 {if strtotime($tournament->info['start_time'])>time()}{$lang['soon']}{else}{$lang['active']}{/if}
                                                                                            </div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$lang['date_start']}:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$tournament->info['start_time']}</div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$lang['date_end']}:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$tournament->info['end_time']}</div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$lang['type_tournament']}:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$tournament->info['type_txt']}</div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$lang['bet_tournament']}:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$tournament->info['min_stav']}</div>
                                        </div>
                                    </div>
                                    <div class="summary__item">
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$lang['qualification']}:</div>
                                        </div>
                                        <div class="summary__cell">
                                            <div class="summary__title title">{$tournament->info['spin_count']}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 class="tournament-details__crosstitle title title_font_huge">{$lang['leaders']}:</h3><span class="tournament-details__leaderboard">
          <div class="leaderboard">
              <div class="leaderboard__slider slider_leaderboard">
                  
                  <div class="leaderboard__block">
                <table class="table table_leaderboard">
                  <thead class="table__head">
                  <tr class="table__headrow">
                    <th class="table__cell">#</th>
                    <th class="table__cell">{$lang['login']}</th>
                    <th class="table__cell">{$lang['points']}</th>
                    <th class="table__cell">{$lang['prize']}</th>
                  </tr>
                  </thead>
                  <tbody class="table__body">
                  {for $i=0;$i<10; $i++}
                    <tr class="table__row">
                      <td class="table__cell">{$i+1}</td>
                      <td class="table__cell table__cell_fluid">{if isset($tournament->gamers[$i])}{if is_numeric($tournament->gamers[$i].user_id)}{$tournament->gamers[$i].user}{else}{$tournament->gamers[$i].user_id}{/if}{/if}</td>
                      <td class="table__cell">{if isset($tournament->gamers[$i])}{$tournament->gamers[$i].result}{/if}</td>
                      <td class="table__cell">{if isset($tournament->prizes[$i])}{$tournament->prizes[$i]['suma']}{/if}</td>
                    </tr>
                  {/for}
                    </tbody>
                  </table>
                  </div>
                  
                  <div class="leaderboard__block">
                <table class="table table_leaderboard">
                  <thead class="table__head">
                  <tr class="table__headrow">
                    <th class="table__cell">#</th>
                    <th class="table__cell">{$lang['login']}</th>
                    <th class="table__cell">{$lang['points']}</th>
                    <th class="table__cell">{$lang['prize']}</th>
                  </tr>
                  </thead>
                  <tbody class="table__body">
                  {for $i=10;$i<20; $i++}
                    <tr class="table__row">
                      <td class="table__cell">{$i+1}</td>
                      <td class="table__cell table__cell_fluid">{if isset($tournament->gamers[$i])}{if is_numeric($tournament->gamers[$i].user_id)}{$tournament->gamers[$i].user}{else}{$tournament->gamers[$i].user_id}{/if}{/if}</td>
                      <td class="table__cell">{if isset($tournament->gamers[$i])}{$tournament->gamers[$i].result}{/if}</td>
                      <td class="table__cell">{if isset($tournament->prizes[$i])}{$tournament->prizes[$i]['suma']}{/if}</td>
                    </tr>
                  {/for}
                    </tbody>
                  </table>
                  </div>
              </div>
              {if $login}
                    <div class="leaderboard__importance">
                      <div class="leaderboard__cell">{$place}</div>
                      <div class="leaderboard__cell leaderboard__cell_fluid">{$login} {$lang['you']}</div>
                      <div class="leaderboard__cell leaderboard__cell_fluid"> &mdash; </div>
                      <div class="leaderboard__cell"> &mdash; </div>
                    </div>
                  {/if}
                        </div></span>
                    {if $tournament->games}
                    <h3 class="tournament-details__crosstitle tournament-details__crosstitle_small title">{$lang['games_tournament']}</h3>
                    <div class="tournament-details__slider">
                        <div class="slider slider_tournament">
                        {foreach $tournament->games as $game} 
                          <a class="slider__item" {if $login} href="/games/{$game.start_path}/{$game.g_name}/real" {else}data-toggle="modal" data-target="#login-modal"{/if} style="width: 110px;">
                             <img src="{$theme_url}/ico/{$game.g_name}.png" class="slider__img" width="100px">
                             <span class="slider__title title title_font_smallest">{$game.g_title}</span>
                          </a>
                        {/foreach}
                        </div>
                    </div>
                    
                    <button class="tournament-details__button button button_shape_round" data-toggle="modal" data-target=".popup_tournamentGames">{$lang['all_slots']}</button>
                    {/if}
                </div>
            </div>

{else}

 <div class="main main_tournament">
            <div class="lottery__title title title_font_hugest">{$lang['tournament']}</div>
            <div class="lottery__tabs" style="margin-bottom: 20px">
                <div class="lottery__tabitem lottery__tabitem_active" data-toggle="tab" data-target="#current_tournaments" data-piwik-event="Group_Tournaments_List_Page,TournamentPageListCurrent,Current_Tournaments">
                    <span class="lottery__caption title title_font_large title_family_basee">
					{$lang['current_tournaments']}
                    </span>
                    <span class="lottery__caption lottery__caption_xs title title_font_large title_family_base">
					{$lang['current']}
                    </span>
                </div>
                <div class="lottery__tabitem" data-toggle="tab" data-target="#ended_tournaments" data-piwik-event="Group_Tournaments_List_Page,TournamentPageListPast,Ended_Tournaments">
                    <span class="lottery__caption title title_font_large title_family_basee">
					{$lang['completed_tournaments']}
                    </span>
                    <span class="lottery__caption lottery__caption_xs title title_font_large title_family_base">
					{$lang['completed']}
                    </span>
                </div>
            </div>
            <div class="tab__content">
                <div id="current_tournaments" class="active">
                 {foreach $cur_tour as $tour}
               
                   <div class="main__item">
                            <div class="panel panel_tournament">
                                <div class="panel__cell panel__cell_img">
                                    <div class="panel__overflow"></div>
                                    <div class="img_overflow"><img src="{$theme_url}/images/tournaments/{$tour.pic}" class="panel__img"></div>
                                    <div class="panel__timer">
                                        <div class="timer">
                                            <div class="timer__note">
                                              {if strtotime($tour.start_time)>time()}{$lang['before_start']}{else}{$lang['time_left']}{/if}
                                            </div>
                                            <div class="timer__table">
                                                <div class="timer__row timer__row_digit" data-toggle="timer" id="current_tour_{$tour.id}" data-time="{if strtotime($tour.start_time)>time()}{strtotime($tour.start_time)}{else}{strtotime($tour.end_time)}{/if}"> <div class="timer__cell">0</div> <div class="timer__cell timer__cell_empty"></div> <div class="timer__cell">00</div> <div class="timer__cell">:</div> <div class="timer__cell">00</div> <div class="timer__cell">:</div> <div class="timer__cell">00</div> </div>
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
                                    </div>
                                </div>
                                <div class="panel__cell panel__cell_content">
                                    <div class="panel__summary">
                                        <div class="panel__info">
                                            <div class="panel__header">
                                                {if strtotime($tour.start_time)>time()}
                                                <span class="panel__status panel__status_future">
												{$lang['soon']}
                                                </span>
                                                {else}
                                                <span class="panel__status ">
												{$lang['active']}
                                                </span>
                                                {/if}
                                                <span class="panel__title panel__title_tournament title">{$tour.name}</span>
                                            </div>
                                            <div class="panel__caption">
                                                {$tour.minitxt} 
                                            </div>
                                            <div class="panel__info-button">
                                                <a href="/tournament/{$tour.id}" class="button button_color_brightblue">{$lang['read_more']}<span class="panel__arrow"><i class="icon icon_arrow-right-white"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="panel__prize">
                                            <div class="panel__countnote title">{$lang['prize_fund']}</div>
                                            <div class="panel__countbutton">{$lang['currency']}</div>
                                            <div class="panel__countdown">
                                                <div class="countdown finecountdown" data-sum="{$tour.prizes_sum}"></div>
                                            </div>
                                            <div class="panel__icons">
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-gold-large">1</span>
                                                    <h5 class="panel__icon-title title">{if isset($tour.prizes[0])}{$tour.prizes[0]['suma']}{/if}</h5>
                                                </div>
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-silver-large">2</span>
                                                    <h5 class="panel__icon-title title">{if isset($tour.prizes[1])}{$tour.prizes[1]['suma']}{/if}</h5>
                                                </div>
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-bronze-large">3</span>
                                                    <h5 class="panel__icon-title title">{if isset($tour.prizes[2])}{$tour.prizes[2]['suma']}{/if}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel__slider">
                                        <div class="panel__slider-inner">
                                            <div class="slider slider_small">
                                              {if $tour.games}
                                              {foreach $tour.games as $game}
                                              <a class="slider__item" {if $login}href="/games/{$game.start_path}/{$game.g_name}/real" {else}data-toggle="modal" data-target="#login-modal"{/if} style="width: 110px;">
                                                  <img src="{$theme_url}/ico/{$game.g_name}.png" class="slider__img" width="82" height="60">
                                                  <span class="slider__title title title_font_smallest">{$game.g_title}</span>
                                              </a>
                                              {/foreach} 
                                              {/if}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                 {/foreach}
                 </div>
                <div id="ended_tournaments">
                   {foreach $end_tour as $tour}
               
                   <div class="main__item">
                            <div class="panel panel_tournament">
                                <div class="panel__cell panel__cell_img">
                                    <div class="panel__overflow"></div>
                                    <div class="img_overflow"><img src="{$theme_url}/images/tournaments/{$tour.pic}" class="panel__img"></div>
                                    <div class="panel__timer">
                                        <div class="timer">
                                            <div class="timer__note">
                                              {if strtotime($tour.start_time)>time()}{$lang['before_start']}{else}{$lang['time_left']}{/if}
                                            </div>
                                            <div class="timer__table">
                                                <div class="timer__row timer__row_digit" data-toggle="timer" id="current_tour_{$tour.id}" data-time="{strtotime($tour.end_time)}"> <div class="timer__cell">0</div> <div class="timer__cell timer__cell_empty"></div> <div class="timer__cell">00</div> <div class="timer__cell">:</div> <div class="timer__cell">00</div> <div class="timer__cell">:</div> <div class="timer__cell">00</div> </div>
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
                                    </div>
                                </div>
                                <div class="panel__cell panel__cell_content">
                                    <div class="panel__summary">
                                        <div class="panel__info">
                                            <div class="panel__header">
                                                <span class="panel__status panel__status_finished">{$lang['over']}</span>
                                                <span class="panel__title panel__title_tournament title">{$tour.name}</span>
                                            </div>
                                            <div class="panel__caption">
                                                {$tour.minitxt} 
                                            </div>
                                            <div class="panel__info-button">
                                                <a href="/tournament/{$tour.id}" class="button button_color_brightblue">{$lang['read_more']}<span class="panel__arrow"><i class="icon icon_arrow-right-white"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="panel__prize">
                                            <div class="panel__countnote title">{$lang['prize_fund']}</div>
                                            <div class="panel__countbutton">{$lang['currency']}</div>
                                            <div class="panel__countdown">
                                                <div class="countdown finecountdown" data-sum="{$tour.prizes_sum}"></div>
                                            </div>
                                            <div class="panel__icons">
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-gold-large">1</span>
                                                    <h5 class="panel__icon-title title">{if isset($tour.prizes[0])}{$tour.prizes[0]['suma']}{/if}</h5>
                                                </div>
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-silver-large">2</span>
                                                    <h5 class="panel__icon-title title">{if isset($tour.prizes[0])}{$tour.prizes[1]['suma']}{/if}</h5>
                                                </div>
                                                <div class="panel__icon-cell"><span class="panel__icon icon icon_medal-bronze-large">3</span>
                                                    <h5 class="panel__icon-title title">{if isset($tour.prizes[0])}{$tour.prizes[2]['suma']}{/if}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel__slider">
                                        <div class="panel__slider-inner">
                                            <div class="slider slider_small">
                                              {if $tour.games}
                                              {foreach $tour.games as $game}
                                              <a class="slider__item" {if $login}href="/games/{$game.start_path}/{$game.g_name}/real" {else} data-toggle="modal" data-target="#login-modal"{/if} style="width: 110px;">
                                                  <img src="{$theme_url}/ico/{$game.g_name}.png" class="slider__img" width="82" height="60">
                                                  <span class="slider__title title title_font_smallest">{$game.g_title}</span>
                                              </a>
                                              {/foreach} 
                                              {/if}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                 {/foreach}
                </div>
            </div>
 </div>
{/if}
</main>