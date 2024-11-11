{if isset($tournament)}
<section class="section section_full">
    <main class="section__main">
        <div class="title-inside">
            <h1>Турниры</h1>
        </div>
                    <div class="loteries-items-wrap-inner">
                <div class="mbox has-shadow">
                    <div class="loteries-items">
                        <div class="loteries-items-wrap active tabs-holder">
                            <div class="items cfix onfire">
                                <div class="backward-link">
                                    <a href="/tournament">&lt; Назад к списку турниров</a>
                                </div>
                                <div class="item-left cfix">
                                    <div class="item-description">
                                        <div class="item-img">
                                          <div class="loteries-on-fire">
                                              <img src="{$theme_url}/images/tournament-on-fire.png" alt="">
                                          </div>
                                          <img src="{$theme_url}/images/tournaments/{$tournament->info['pic']}" alt="">
                                        </div>
                                        <b>
                                                                                            Специальный турнир
                                                                                    </b>

                                        <h3>{$tournament->info['name']}</h3>
                                        <br>

                                        <br>
                                        <b>Описание</b>
                                        <div>
                                        {$tournament->info['txt']}
                                        </div>
                                    </div>
                                    <div class="item-description-1289 item-description">
                                        <div class="item-img">
                                                <div class="loteries-on-fire">
                                                    <img src="{$theme_url}/images/tournament-on-fire.png" alt="">
                                                </div>
                                          <img src="{$theme_url}/images/tournaments/{$tournament->info['pic']}" alt="">
                                        </div>
                                        <b>
                                                                                            Специальный турнир
                                                                                    </b>

                                        <h3>{$tournament->info['name']}</h3>
                                        <b>Описание</b>
                                        <div>
                                        {$tournament->info['text']}
                                        </div>
                                    </div>
                                </div>
                                <div class="item-right cfix">
                                    <div class="item-right-top">
                                        <div class="item-price-title">
                                            Призовой фонд
                                        </div>
                                        <div class="item-price-number linear-purple">
                                            <span class="">{$tournament->info['prizes_sum']}</span>
                                        </div>
                                    </div>
                                    <div class="item-right-middle">
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Дата начала:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['start_time']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Дата окончания:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['end_time']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Тип турнира:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['type_txt']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Призовой фонд:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['prizes_sum']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Вращения для квалификации</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['spin_count']}</p>
                                            </div>
                                        </div>
                                                                                    <div class="line">
                                                <div class="right-part">
                                                    <p>Минимальное количество очков:</p>
                                                </div>
                                                <div class="left-part">
                                                    <p>{$tournament->info['min_stav']}</p>
                                                </div>
                                            </div>
                                                                            </div>
                                    <div class="item-right-bottom">
                                        <div class="table-imitation">
                                            <div class="heading">Лидеры</div>
                                            <div class="table-top-part">
                                                <div class="cell">Логин</div>
                                                <div class="cell">Позиция</div>
                                                <div class="cell">Очки</div>
                                                <div class="cell">Приз</div>
                                            </div>
                                            <div class="main-part">      
                                            {for $i=0;$i<20; $i++}
                                                        <div class="row ">
                                                            <div class="cell">{if isset($tournament->gamers[$i])}{if is_numeric($tournament->gamers[$i].user_id)}{$tournament->gamers[$i].user}{else}{$tournament->gamers[$i].user_id}{/if}{/if}</div>
                                                            <div class="cell">#{$i+1}</div>
                                                            <div class="cell">{if isset($tournament->gamers[$i])}{$tournament->gamers[$i].result}{/if}</div>
                                                            <div class="cell">{if isset($tournament->prizes[$i])}{$tournament->prizes[$i]['suma']}{/if} ₽</div>
                                                        </div>
                                            {/for} 
                                            </div>                                                                                                                             <div class="main-part">
                                        </div>
                                    </div>
                                </div>
                               </div>
                            </div>

                            <div class="items-700 cfix onfire">
                                <div class="backward-link">
                                    <a href="/tournament">&lt; Назад к списку турниров</a>
                                </div>
                                <div class="item-img">
                                    
                                    <img src="{$theme_url}/images/tournaments/f531849c6d2ed669f308d3721083b14e.jpg" alt="">
                                </div>

                                <div class="cover-for-prize-money">
                                    <div class="item-right-top">
                                        <div class="item-price-title">
                                            Призовой фонд
                                        </div>
                                        <div class="item-price-number linear-purple">
                                            <span class="">{$tournament->info['prizes_sum']}</span>
                                        </div>
                                    </div>
                                    <div class="item-right-middle">
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Дата начала:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['start_time']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Дата окончания:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['end_time']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Тип турнира:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['type_txt']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Призовой фонд:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['prizes_sum']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Вращения для квалификации</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['spin_count']}</p>
                                            </div>
                                        </div>
                                                                                    <div class="line">
                                                <div class="right-part">
                                                    <p>Минимальное количество очков:</p>
                                                </div>
                                                <div class="left-part">
                                                    <p>{$tournament->info['min_stav']}</p>
                                                </div>
                                            </div>
                                                                            </div>
                                </div>
                                <div class="item-description">
                                    <b>
                                                                                    Специальный турнир
                                                                            </b>

                                    <h3>{$tournament->info['name']}</h3>
                                        <b>Описание</b>
                                        <div>
                                        {$tournament->info['text']}
                                        </div>
                                </div>
                                <div class="item-right cfix">
                                    <div class="item-right-bottom">
                                        <div class="table-imitation">
                                            <div class="heading">Лидеры</div>
                                            <div class="table-top-part">
                                                <div class="cell">Логин</div>
                                                <div class="cell">Позиция</div>
                                                <div class="cell">Очки</div>
                                                <div class="cell">Приз</div>
                                            </div>
                                            <div class="main-part">
                                            {for $i=0;$i<20; $i++}
                                                        <div class="row ">
                                                            <div class="cell">{if isset($tournament->gamers[$i])}{if is_numeric($tournament->gamers[$i].user_id)}{$tournament->gamers[$i].user}{else}{$tournament->gamers[$i].user_id}{/if}{/if}</div>
                                                            <div class="cell">#{$i+1}</div>
                                                            <div class="cell">{if isset($tournament->gamers[$i])}{$tournament->gamers[$i].result}{/if}</div>
                                                            <div class="cell">{if isset($tournament->prizes[$i])}{$tournament->prizes[$i]['suma']}{/if} ₽</div>
                                                        </div>
                                            {/for}
                                                    
                                                                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {*<div class="item-description">
                                    Хотите почувствовать себя настоящим Рыцарем? На Чудослот это сделать очень просто! Участвуйте в Рыцарском Турнире и выиграйте 25 000 рублей! Просто играйте в свои любимые Чудо-слоты и выигрывайте еще больше!<br><br>
В турнире участвуют все игры, кроме настольных игр и покера. <br><br>
Призы автоматически начисляются с вейджером 20х. В зачет идет каждый выигранный рубль.  <br><br>
Турнир проходит еженедельно с понедельника по четверг!  У Вас целых четыре дня, чтобы войти в тройку лучших игроков Рыцарского Турнира!<br><br>
Участвуйте и выигрывайте на Чудослот! Все самые крупные выигрыши уже ждут Вас!
                                </div>*}
                            </div>

                            <div class="items-300 cfix onfire">
                                <div class="backward-link">
                                    <a href="/tournament">&lt; Назад к списку турниров</a>
                                </div>
                                <div class="item-img">
                                        <div class="loteries-on-fire">
                                            <img src="{$theme_url}/images/tournament-on-fire.png" alt="">
                                        </div>
                                        <img src="{$theme_url}/images/tournaments/{$tournament->info['pic']}" alt="">
                                </div>

                                <div class="item-description">
                                    <b>
                                                                                    Специальный турнир
                                                                            </b>

                                    <h3>{$tournament->info['name']}</h3>
                                    <br>
                                    <b>Описание</b>
                                    <div>
                                        {$tournament->info['txt']}
                                    </div>
                                </div>

                                <div class="cover-for-prize-money">
                                    <div class="item-right-top">
                                        <div class="item-price-title">
                                            Призовой фонд
                                        </div>
                                        <div class="item-price-number linear-purple">
                                            <span class="">{$tournament->info['prizes_sum']}</span>
                                        </div>
                                    </div>
                                    <div class="item-right-middle">
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Дата начала:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['start_time']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Дата окончания:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['end_time']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Тип турнира:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['type_txt']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Призовой фонд:</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['prizes_sum']}</p>
                                            </div>
                                        </div>
                                        <div class="line">
                                            <div class="right-part">
                                                <p>Вращения для квалификации</p>
                                            </div>
                                            <div class="left-part">
                                                <p>{$tournament->info['spin_count']}</p>
                                            </div>
                                        </div>
                                                                                    <div class="line">
                                                <div class="right-part">
                                                    <p>Минимальное количество очков:</p>
                                                </div>
                                                <div class="left-part">
                                                    <p>{$tournament->info['min_stav']}</p>
                                                </div>
                                            </div>
                                                                            </div>
                                </div>

                                <div class="item-right cfix">
                                    <div class="item-right-bottom">
                                        <div class="table-imitation">
                                            <div class="heading">Лидеры</div>
                                            <div class="cover-for-sroll">
                                                <div class="wide-cover">
                                                    <div class="revers-scrol">
                                                        <div class="table-top-part">
                                                            <div class="cell">Логин</div>
                                                            <div class="cell">Позиция</div>
                                                            <div class="cell">Очки</div>
                                                            <div class="cell">Приз</div>
                                                        </div>
                                                        <div class="main-part">
                                                        {for $i=0;$i<20; $i++}
                                                        <div class="row ">
                                                            <div class="cell">{if isset($tournament->gamers[$i])}{if is_numeric($tournament->gamers[$i].user_id)}{$tournament->gamers[$i].user}{else}{$tournament->gamers[$i].user_id}{/if}{/if}</div>
                                                            <div class="cell">#{$i+1}</div>
                                                            <div class="cell">{if isset($tournament->gamers[$i])}{$tournament->gamers[$i].result}{/if}</div>
                                                            <div class="cell">{if isset($tournament->prizes[$i])}{$tournament->prizes[$i]['suma']}{/if} ₽</div>
                                                        </div>
                                                        {/for}
                                                                                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {*<div class="item-description">
                                    Хотите почувствовать себя настоящим Рыцарем? На Чудослот это сделать очень просто! Участвуйте в Рыцарском Турнире и выиграйте 25 000 рублей! Просто играйте в свои любимые Чудо-слоты и выигрывайте еще больше!<br><br>
В турнире участвуют все игры, кроме настольных игр и покера. <br><br>
Призы автоматически начисляются с вейджером 20х. В зачет идет каждый выигранный рубль.  <br><br>
Турнир проходит еженедельно с понедельника по четверг!  У Вас целых четыре дня, чтобы войти в тройку лучших игроков Рыцарского Турнира!<br><br>
Участвуйте и выигрывайте на Чудослот! Все самые крупные выигрыши уже ждут Вас!
                                </div>*}
                            </div>

                            <div class="item-bottom">
                                <div class="item-bottom-heading">
                                    <h3>Игры, участвующие в турнире</h3>
                                </div>
                                <div class="item-bottom-slider-wrapper slick-slider">
                                    {foreach $tournament->games as $game}
                                        <a class="item" {if $login} href="/games/{$game.start_path}/{$game.g_name}/real" {else}data-toggle="modal" data-target="##registration-modal"{/if} aria-hidden="true" style="width: 194px;" tabindex="-1">
                                           <img src="{$theme_url}/ico/{$game.g_name}.png" class="slider__img" width="100px">
                                        </a> 
                                    {/foreach}
                                    
                                </div>
                                <div class="button-wraper">
                                    <!--<a href="#tournament-games-popup" class="fancybox-games">-->
                                    <a href="/game">
                                        <img src="{$theme_url}/images/red-button.png">
                                        <img src="{$theme_url}/images/tournament-red-button.png" class="hover">
                                        <span>ВСЕ СЛОТЫ</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
</section>
{else}
<section class="section section_full">
    <main class="section__main">
        <div class="title-inside">
            <h1>{$lang['tournament']}</h1>
        </div>
                    <div class="button-tabs">
                <div class="button-tabs-wrap">
                    <ul>
                        <li class="active">
                            <a href="#">
                            <span class="item linear-yellow">
                                <span>{$lang['current_tournaments']}</span>
                            </span>
                                <img src="{$theme_url}/images/button-tabs-normal.png" alt="">
                                <img src="{$theme_url}/images/button-tabs-hover.png" alt="" class="hover">
                                <img src="{$theme_url}/images/button-tabs-active.png" alt="" class="active">
                            </a>
                        </li>
                        <!-- class="disabled" to disable button-->
                        <li class="">
                            <a href="#">
                            <span class="item linear-yellow">
                                <span> {$lang['completed_tournaments']}</span>
                            </span>
                                <img src="{$theme_url}/images/button-tabs-normal.png" alt="">
                                <img src="{$theme_url}/images/button-tabs-hover.png" alt="" class="hover">
                                <img src="{$theme_url}/images/button-tabs-active.png" alt="" class="active">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loteries-items-wrap">
                <div class="mbox">
                    <div class="loteries-items tournaments-items">
                          <div class="loteries-items-wrap active tabs-holder">
                                                            
                               {foreach $cur_tour as $tour}                             
                                  <div class="items cfix onfire">
                                    <div class="item-left cfix">
                                        <div class="item-img">
                                                                                                                                                                                                                                    <div class="loteries-on-fire">
                                            <img src="{$theme_url}/images/tournament-on-fire.png" alt="">
                                                </div>
                                            <img src="{$theme_url}/images/tournaments/{$tour.pic}" alt="">
                                        </div>
                                        <div class="item-description">
                                            <div class="item-description-desc">
                                                <b>
                                                                                                            Специальный турнир
                                                                                                    </b>
                                            </div>
                                            <div class="item-description-title">
                                                <p>{$tour.name}</p>
                                            </div>
                                            <div class="item-description-desc">
                                                <b>дата</b>
                                            </div>
                                            <div class="item-description-desc">
                                                <p>{str_replace('-','.',substr($tour.start_time,0,10))} — {str_replace('-','.',substr($tour.end_time,0,10))}</p>
                                            </div>
                                            <div class="item-description-desc">
                                                <b>Тип турнира</b>
                                            </div>
                                            <div class="item-description-desc">
                                                <p></p>
                                            </div>
                                            <div class="item-description-link">

                                                <a href="/tournament/{$tour.id}">
                                                    <span>Подробнее</span>
                                                    <img src="{$theme_url}/images/loteries-items-btn-normal.png" alt="">
                                                    <img src="{$theme_url}/images/loteries-items-btn-hover.png" class="hover" alt="">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item-right cfix">
                                        <div class="item-right-top">
                                            <div class="item-price-title">
                                                Призовой фонд
                                            </div>
                                            <div class="item-price-number linear-purple">
                                                <span class="">{$tour.prizes_sum}</span>
                                            </div>
                                        </div>
                                        <div class="item-right-bottom">
                                            <div class="item-price-place">
                                                                                                    <div class="item">
                                                        <div class="item-img">1</div>
                                                        <div class="item-money">{if isset($tour.prizes[0])}{$tour.prizes[0]['suma']}{/if} ₽</div>
                                                    </div>
                                                                                                    <div class="item">
                                                        <div class="item-img">2</div>
                                                        <div class="item-money">{if isset($tour.prizes[1])}{$tour.prizes[1]['suma']}{/if} ₽</div>
                                                    </div>
                                                                                                    <div class="item">
                                                        <div class="item-img">3</div>
                                                        <div class="item-money">{if isset($tour.prizes[2])}{$tour.prizes[2]['suma']}{/if} ₽</div>
                                                    </div>
                                                
                                            </div>
                                        </div>
                                        <div class="item-right-slider">
                                            <div class="item-right-slider-wrap slick-slider">
                                              {if $tour.games}
                                              {foreach $tour.games as $game}
                                              <a class="item" {if $login}href="/games/{$game.start_path}/{$game.g_name}/real" {else}data-toggle="modal" data-target="#login-modal"{/if} data-slick-index="-3" aria-hidden="true" style="width: 117px;" tabindex="-1">
                                                  <img width="82" height="60" src="{$theme_url}/ico/{$game.g_name}.png" class="slider__img" width="82" height="60">
                                              </a>
                                              {/foreach}
                                              {/if} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/foreach}
                                                            
                            
                        </div>

                        <div class="loteries-items-wrap tabs-holder">
                              
                              {foreach $end_tour as $tour}
                              <div class="items cfix ended">
                                    <div class="item-left cfix">
                                        <div class="item-img">
                                            <img src="{$theme_url}/images/tournaments/{$tour.pic}">                                                                                                                                                                                    <img src="{$theme_url}/images/tournaments/4a03b6d4be302f832753379c5c4d2531.jpg" alt="">
                                        </div>
                                        <div class="item-description">
                                            <div class="item-description-desc">
                                                <b>Турнир завершен</b>
                                            </div>
                                            <div class="item-description-title">
                                                <p>{$tour.name}</p>
                                            </div>
                                            <div class="item-description-desc">
                                                <b>дата</b>
                                            </div>
                                            <div class="item-description-desc">
                                                <p>{str_replace('-','.',substr($tour.start_time,0,10))} — {str_replace('-','.',substr($tour.end_time,0,10))}</p>
                                            </div>
                                            <div class="item-description-desc">
                                                <b>Тип турнира</b>
                                            </div>
                                            <div class="item-description-desc">
                                                <p></p>
                                            </div>
                                            <div class="item-description-link">

                                                <a href="/tournament/{$tour.id}">
                                                    <span>Подробнее</span>
                                                    <img src="{$theme_url}/images/loteries-items-btn-normal.png" alt="">
                                                    <img src="{$theme_url}/images/loteries-items-btn-hover.png" class="hover" alt="">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item-right cfix">
                                        <div class="item-right-top">
                                            <div class="item-price-title">
                                                Призовой фонд
                                            </div>
                                            <div class="item-price-number linear-purple">
                                                <span class="">{$tour.prizes_sum}</span>
                                            </div>
                                        </div>
                                        <div class="item-right-bottom">
                                            <div class="item-price-place">
                                                                                                    <div class="item">
                                                        <div class="item-img">1</div>
                                                        <div class="item-money">{if isset($tour.prizes[0])}{$tour.prizes[0]['suma']}{/if} ₽</div>
                                                    </div>
                                                                                                    <div class="item">
                                                        <div class="item-img">2</div>
                                                        <div class="item-money">{if isset($tour.prizes[1])}{$tour.prizes[1]['suma']}{/if} ₽</div>
                                                    </div>
                                                                                                    <div class="item">
                                                        <div class="item-img">3</div>
                                                        <div class="item-money">{if isset($tour.prizes[2])}{$tour.prizes[2]['suma']}{/if} ₽</div>
                                                    </div>
                                                
                                            </div>
                                        </div>
                                        <div class="item-right-slider">
                                            <div class="item-right-slider-wrap slick-slider">
                                                  {if $tour.games}
                                                  {foreach $tour.games as $game}
                                                  <a class="item" {if $login}href="/games/{$game.start_path}/{$game.g_name}/real" {else}data-toggle="modal" data-target="#login-modal"{/if} data-slick-index="-3" aria-hidden="true" style="width: 117px;" tabindex="-1">
                                                    <img width="82" height="60" src="{$theme_url}/ico/{$game.g_name}.png" class="slider__img" width="82" height="60">
                                                  </a>
                                                  {/foreach}
                                                  {/if}
                                                  
                                                                                                   
                                            <button type="button" class="slick-next slick-arrow" style="display: block;"></button></div>
                                        </div>
                                    </div>
                                </div>
                                {/foreach}
                                          
                           </div> 
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            </main>
</section>

<div id="tournament-games-popup" class="popup popup_tournamentGames" style="display: none">
    <div class="popup__close js-close-popup"><i class="icon icon_cross-bold"></i></div>
    <div class="popup__head">
        <div class="popup__title">Игры, участвующие в турнире</div>
        <form action="/game" method="get">
            <div class="popup__search search">
                <button type="submit" class="search__button" disabled="disabled"></button>
                <input placeholder="Найти игру" name="q" onkeyup="searchGame($(this).val())" class="search__input" value="">
            </div>
        </form>
    </div>
    <div class="popup__content">
        <div class="popup__gallery">
            <div class="main main_gallery">
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/bookofra.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/bookofra/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="1" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">BOOK OF RA</p>
                            <p class="preview__note">Сейчас в игре: 17</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/bananas.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/bananas/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="2" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">BANANAS</p>
                            <p class="preview__note">Сейчас в игре: 4</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/dolphins.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/dolphins/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="3" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">DOLPHINS</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/luckylady.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/luckylady/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="4" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">LUCKY LADY</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/moneygame.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/moneygame/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="5" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">MONEY GAME</p>
                            <p class="preview__note">Сейчас в игре: 10</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/bananasplash.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/bananasplash/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="6" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">BANANA SPLASH</p>
                            <p class="preview__note">Сейчас в игре: 4</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/ph2.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/ph2/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="7" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">PH GOLD 2</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/queenof.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/queenof/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="8" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">QUEEN OF HEART</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/royaltreasures.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/royaltreasures/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="9" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ROYAL TREASURES</p>
                            <p class="preview__note">Сейчас в игре: 18</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/goldenplanet.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/goldenplanet/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="10" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GOLDEN PLANET</p>
                            <p class="preview__note">Сейчас в игре: 20</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/kingofcards.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/kingofcards/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="11" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">KING OF CARDS</p>
                            <p class="preview__note">Сейчас в игре: 16</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/polarfox.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/polarfox/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="12" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">POLAR FOX</p>
                            <p class="preview__note">Сейчас в игре: 19</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/safariheat.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/safariheat/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="13" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SAFARY HEAT</p>
                            <p class="preview__note">Сейчас в игре: 14</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/sparta.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/sparta/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="14" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SPARTA</p>
                            <p class="preview__note">Сейчас в игре: 19</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/dynasty.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/dynasty/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="15" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">DYNASTY OF MING</p>
                            <p class="preview__note">Сейчас в игре: 16</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/attila.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/attila/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="16" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ATILLA</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/gryphonsgold.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/gryphonsgold/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="17" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GRYPHONS GOLD</p>
                            <p class="preview__note">Сейчас в игре: 7</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/secretforest.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/secretforest/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="18" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SECRET FOREST</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/ph3.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/ph3/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="19" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">PH GOLD 3</p>
                            <p class="preview__note">Сейчас в игре: 10</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/cashmachine.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/cashmachine/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="21" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CASH MACHINE</p>
                            <p class="preview__note">Сейчас в игре: 7</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/unicorn.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/unicorn/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="22" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">UNICORN MAGIC</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/cuba.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/cuba/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="25" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CUBA</p>
                            <p class="preview__note">Сейчас в игре: 11</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/tikiisland.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/tikiisland/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="26" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">TIKI ISLAND</p>
                            <p class="preview__note">Сейчас в игре: 17</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/geisha.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/geisha/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="28" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GEISHA</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/worldcup.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/worldcup/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="29" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">WORLD CUP</p>
                            <p class="preview__note">Сейчас в игре: 20</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/sizzlinghot.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/sizzlinghot/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="30" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SIZZLING HOT</p>
                            <p class="preview__note">Сейчас в игре: 10</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/ultrahot.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/ultrahot/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="31" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ULTRA HOT</p>
                            <p class="preview__note">Сейчас в игре: 7</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/alwayshot.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/alwayshot/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="32" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ALWAYS HOT</p>
                            <p class="preview__note">Сейчас в игре: 11</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/justjewels.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/justjewels/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="33" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">JUST JEWELS</p>
                            <p class="preview__note">Сейчас в игре: 19</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/fourqueens.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/fourqueens/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="34" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">FOUR QUEENS</p>
                            <p class="preview__note">Сейчас в игре: 15</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/hottarget.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/hottarget/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="35" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">HOT TARGET</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/beatlemania.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/beatlemania/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="36" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">BEATLE MANIA</p>
                            <p class="preview__note">Сейчас в игре: 15</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/illusionist.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/illusionist/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="37" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ILLUSIONIST</p>
                            <p class="preview__note">Сейчас в игре: 16</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/buzzinbugs.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/buzzinbugs/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="38" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">BUZZING BUGS</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/venetian.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/venetian/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="40" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">VENETIAN</p>
                            <p class="preview__note">Сейчас в игре: 20</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/markopolo.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/gaminators/markopolo/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="41" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">MARKO POLO</p>
                            <p class="preview__note">Сейчас в игре: 5</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/crmonkey.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/crmonkey/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="42" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CRAZY MONKEY</p>
                            <p class="preview__note">Сейчас в игре: 11</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/keks.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/keks/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="43" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">KEKS</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/rockclimber.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/rockclimber/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="44" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ROCK KCLIMBER</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/resident.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/resident/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="45" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">RESIDENT</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/lucky_haunter.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/lucky_haunter/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="46" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">LUCKY HAUNTER</p>
                            <p class="preview__note">Сейчас в игре: 7</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/cocktail.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/cocktail/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="47" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">COCKTAIL</p>
                            <p class="preview__note">Сейчас в игре: 7</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/gnom.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/gnom/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="48" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GNOME</p>
                            <p class="preview__note">Сейчас в игре: 7</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/island.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/island/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="49" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ISLAND</p>
                            <p class="preview__note">Сейчас в игре: 19</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/island2.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/island2/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="51" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ISLAND 2</p>
                            <p class="preview__note">Сейчас в игре: 6</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/sweetlife.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/igrosoft/sweetlife/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="52" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SWEET LIFE</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/castlemania.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/sheriff/castlemania/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="61" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CASTLE MANIA</p>
                            <p class="preview__note">Сейчас в игре: 20</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/goldraider.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/sheriff/goldraider/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="62" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GOLD RAIDER</p>
                            <p class="preview__note">Сейчас в игре: 11</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/fortunefarm.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/sheriff/fortunefarm/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="63" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">FORTUNE FARM</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/lunapark.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/lunapark/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="64" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">LUNA PARK</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/lukyluke.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/lukyluke/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="65" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">LUCKY LUKE</p>
                            <p class="preview__note">Сейчас в игре: 15</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/dartagnan.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/dartagnan/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="66" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">DARTAGNAN</p>
                            <p class="preview__note">Сейчас в игре: 4</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/happyfarm.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/happyfarm/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="68" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">HAPPY FARM</p>
                            <p class="preview__note">Сейчас в игре: 18</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/numbers.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/numbers/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="69" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">NUMBERS</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/jungle.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/jungle/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="70" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">JUNGLE JIMMY</p>
                            <p class="preview__note">Сейчас в игре: 10</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/navy.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/navy/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="71" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">NAVY</p>
                            <p class="preview__note">Сейчас в игре: 17</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/montblanc.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/montblanc/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="72" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">MONT BLANC</p>
                            <p class="preview__note">Сейчас в игре: 19</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/gladiator.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/gladiator/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="73" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GLADIATOR</p>
                            <p class="preview__note">Сейчас в игре: 14</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/mafia.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/mafia/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="74" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">MAFIA BOSS</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/atlantis.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/atlantis/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="75" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ATLANTIS</p>
                            <p class="preview__note">Сейчас в игре: 18</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/jurassic.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/b3w_25/jurassic/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="78" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">JURASSIC WORLD</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/alchemist.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/alchemist/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="79" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ALCHEMIST DX</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/lordofoceans.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/lordofoceans/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="80" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">LORD OF OCEANS DX</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/sizzlinghot_dx.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/sizzlinghot_dx/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="81" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SIZZLING HOT DX</p>
                            <p class="preview__note">Сейчас в игре: 4</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/mermaids.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/mermaids/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="82" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">MERMAIDS PEARL DX</p>
                            <p class="preview__note">Сейчас в игре: 15</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/justjewels_dx.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/justjewels_dx/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="83" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">JUST JEWELS DX</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/magicprincess.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/magicprincess/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="84" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">MAGIC PRINCESS DX</p>
                            <p class="preview__note">Сейчас в игре: 7</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/luckylady_dx.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/luckylady_dx/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="85" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">LUCKY LADY DX</p>
                            <p class="preview__note">Сейчас в игре: 6</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/bookofra_dx.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/bookofra_dx/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="86" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">BOOK OF RA DX</p>
                            <p class="preview__note">Сейчас в игре: 17</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/dolphins_dx.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/dolphins_dx/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="87" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">DOLPHINS DX</p>
                            <p class="preview__note">Сейчас в игре: 17</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/columbus_dx.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/columbus_dx/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="89" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">COLUMBUS DX</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/ultrahot_dx.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/ultrahot_dx/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="91" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ULTRA HOT DX</p>
                            <p class="preview__note">Сейчас в игре: 4</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/golden_cobras.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/golden_cobras/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="92" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GOLDEN COBRAS DX</p>
                            <p class="preview__note">Сейчас в игре: 4</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/horses.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/horses/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="94" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">HOLD YOUR HORSES DX</p>
                            <p class="preview__note">Сейчас в игре: 17</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/diamond7.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/diamond7/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="95" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">DIAMOND 7 DX</p>
                            <p class="preview__note">Сейчас в игре: 20</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/holydays.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/holydays/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="96" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CARIBBEAN HOLIDAYS DX</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/mystery_star.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/mystery_star/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="97" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">MYSTERY STAR DX</p>
                            <p class="preview__note">Сейчас в игре: 17</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/ramses2.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/ramses2/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="99" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">RAMSES 2 DX</p>
                            <p class="preview__note">Сейчас в игре: 19</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/seasirenes.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/seasirenes/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="100" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SEA SIRENS DX</p>
                            <p class="preview__note">Сейчас в игре: 16</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/goldenark.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/goldenark/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="101" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GOLDEN ARK DX</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/katana.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/katana/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="102" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">KATANA DX</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/redlady.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/redlady/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="104" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">RED LADY DX</p>
                            <p class="preview__note">Сейчас в игре: 11</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/purplehot2.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/purplehot2/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="107" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">PURPLE HOT 2 DX</p>
                            <p class="preview__note">Сейчас в игре: 10</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/sizzling6.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/sizzling6/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="110" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SIZZLING 6 DX</p>
                            <p class="preview__note">Сейчас в игре: 6</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/secret_elixir.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/deluxe/secret_elixir/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="113" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SECRET ELIXIR DX</p>
                            <p class="preview__note">Сейчас в игре: 20</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/give5.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/loto/give5/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="118" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ДАЙ ПЯТЬ</p>
                            <p class="preview__note">Сейчас в игре: 18</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/win.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/loto/win/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="119" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ПОБЕДА</p>
                            <p class="preview__note">Сейчас в игре: 20</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/champ.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/megajack/champ/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="120" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CHAMPAGNE</p>
                            <p class="preview__note">Сейчас в игре: 19</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/pharaohs.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/megajack/pharaohs/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="121" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">PHARAONS TREASURE</p>
                            <p class="preview__note">Сейчас в игре: 11</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/pirates.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/megajack/pirates/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="122" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">PIRATES ISLAND</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/slotopol.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/megajack/slotopol/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="123" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SLOT-O-POL</p>
                            <p class="preview__note">Сейчас в игре: 16</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/wildwest.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/megajack/wildwest/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="124" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">WILD WEST</p>
                            <p class="preview__note">Сейчас в игре: 17</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/gonzo.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/gonzo/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="130" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GONZO QUEST</p>
                            <p class="preview__note">Сейчас в игре: 14</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/wildwater.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/wildwater/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="132" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">WILD WATER</p>
                            <p class="preview__note">Сейчас в игре: 7</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/southpark.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/southpark/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="133" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">REEL CHAOS</p>
                            <p class="preview__note">Сейчас в игре: 19</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/jackhammer.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/jackhammer/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="134" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">JACK HAMMER</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/boom_brothers.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/boom_brothers/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="137" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">BOOM BROTHERS</p>
                            <p class="preview__note">Сейчас в игре: 16</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/crusade.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/crusade/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="138" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CRUSADE OF FORTUNE</p>
                            <p class="preview__note">Сейчас в игре: 5</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/hall.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/hall/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="139" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">HALL OF GODS</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/scareface.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/scareface/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="140" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SCARFACE</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/megafortune.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/megafortune/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="142" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">MEGA FORTUNE</p>
                            <p class="preview__note">Сейчас в игре: 20</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/cosmic.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/cosmic/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="143" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">COSMIC FORTUNE</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/asian.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/asian/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="147" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">ASIAN</p>
                            <p class="preview__note">Сейчас в игре: 14</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/boobs.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/boobs/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="149" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">BOOBS</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/charming.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/charming/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="150" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CHARMING</p>
                            <p class="preview__note">Сейчас в игре: 18</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/crazyparty.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/crazyparty/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="151" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">CRAZY PARTY</p>
                            <p class="preview__note">Сейчас в игре: 13</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/desires.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/desires/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="152" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">DESIRES</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/fancy.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/fancy/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="153" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">FANCY</p>
                            <p class="preview__note">Сейчас в игре: 15</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/girlgirl.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/girlgirl/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="154" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">GIRL GIRL</p>
                            <p class="preview__note">Сейчас в игре: 12</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/happyholidays.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/happyholidays/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="155" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">HAPPY HOLIDAYS</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/latin.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/latin/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="156" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">LATIN</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/naked.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/naked/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="157" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">NAKED</p>
                            <p class="preview__note">Сейчас в игре: 18</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/redhot.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/redhot/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="158" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">REDHOT</p>
                            <p class="preview__note">Сейчас в игре: 11</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/tasty.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/erotic/tasty/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="160" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">TASTY</p>
                            <p class="preview__note">Сейчас в игре: 11</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/deadoralive.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/deadoralive/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="172" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">DEAD OR ALIVE</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/fortunes_of_sparta.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/fortunes_of_sparta/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="175" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">FORTUNES OF SPARTA</p>
                            <p class="preview__note">Сейчас в игре: 10</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/jackhammer2.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/jackhammer2/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="177" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">JACK HAMMER 2</p>
                            <p class="preview__note">Сейчас в игре: 8</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/spinata.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/spinata/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="179" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">SPINATA GRANDE</p>
                            <p class="preview__note">Сейчас в игре: 3</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/steam_tower.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/steam_tower/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="180" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">STEAM TOWER</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/thrill_spin.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/thrill_spin/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="182" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">THRILL SPIN</p>
                            <p class="preview__note">Сейчас в игре: 16</p>
                        </div>
                    </li>
                                    <li class="main__item preview">
                        <div class="preview__item">
                            <img src="{$theme_url}/ico/twinspin.jpg" class="preview__img">
                            <div class="preview__overlay">
                                <div class="preview__action">
                                                                            <a class="preview__button button button_color_orange" data-toggle="modal" data-target="#registration-modal">Играть</a><br>
                                                                        <a href="/games/netent/twinspin/demo" class="preview__button preview__button_demo button button_color_green">
                                        Демо
                                    </a>
                                </div>
                                                                    <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="183" title="Добавить в Любимые"></i>
                                                            </div>
                        </div>
                        <div class="preview__info">
                            <p class="preview__title">TWIN SPIN</p>
                            <p class="preview__note">Сейчас в игре: 9</p>
                        </div>
                    </li>
                
            </div>
        </div>
    </div>
</div>
{/if}


{*

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


*}