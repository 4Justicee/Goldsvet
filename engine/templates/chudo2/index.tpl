<div class="tabs-block">
    <div class="tabs-block-wrap">
        <ul>
  {foreach $cat_bar as $cat}
    <li class="{if isset($cat.active) && $cat.active}active{/if}" data-menu-id="{$cat.pos}">
    {if ($cat.pos==99 && $login)||$cat.pos!=99}
      <a href="{$cat.href}">
      <span class="item-wrap">
        <span class="item"><span>{$cat.name}</span></span>
      </span>
    </a>
    {else}
    <a data-toggle="modal" href="#login-modal">
      <span class="item-wrap">
        <span class="item"><span>{$cat.name}</span></span>
      </span>
    </a>
    {/if}
    </li>
  {/foreach}
            <li class="find-form">
                <span class="item-wrap">
                    <input name="group" id="gamegroup" value="" type="hidden">
                     <form action="/game" method="get" id="search-form">
                         <input type="text" placeholder="Найти игру" name="q"
                                class="search__input" value="">
                         <button type="submit"></button>
                     </form>
                </span>
            </li>
        </ul>
    </div>
</div>
<div class="tabs-block-mini">
    <div class="tabs-block-mini-wrap">
        
  {foreach $cat_bar as $cat}
    {if $cat.subcats}
      <ul data-menu-id="{$cat.pos}" style="display: none">
      {foreach $cat.subcats as $subcat}
        <li class="">
          <a href="/{$subcat.href}">
            <span class="item-wrap">
              <span class="item">
                <span>{$subcat.name}</span>
              </span>
            </span>
          </a>
        </li>
      {/foreach}
      </ul>
    {/if}
  {/foreach}
        
    </div>
</div>
<div class="middle-items index-page">
    <div class="mbox">
        <div class="middle-items-wrap">
            <div class="items-wrap">
                <!-- function loadMore() -->
                <!-- add class  load_more to .items that would ajax working-->
    
<div class="items" id="games-wrapper" data-action="load_items_zal">
          {if isset($game_block1)&& $game_block1}
          {foreach $game_block1 as $game}
<div class="item" >
    <div class="item-img">
        <div class="item-img-wrap"><img src="{$theme_url}/ico/{$game.g_name}.png" alt=""></div>
        <div class="item-img-buttons">
            <a href={if $login}"/games/{$game.g_path}/{$game.g_name}/real"{else}"#enter-popup" data-toggle="modal"{/if} class="game fancybox-enter">
              <img src="{$theme_url}/images/item-buttons-game.png" alt="">
              <img src="{$theme_url}/images/item-buttons-game-hover.png" class="hover" alt="">
              <span>{$lang['play']}</span>
            </a>
            <a href="/games/{$game.g_path}/{$game.g_name}/demo" class="demo">
              <img src="{$theme_url}/images/item-buttons-demo.png" alt="">
              <img src="{$theme_url}/images/item-buttons-demo-hover.png" class="hover" alt="">
              <span>{$lang['demo']}</span>
            </a>
        </div>
    </div>
    <div class="item-description">
        <div class="item-description-wrap">
            <div class="item-title">{$game.g_title}</div>
            <div class="item-subtitle">{$lang['now_playing']}: {$game.g_counter}</div>
        </div>
        <div class="item-star ">
            <a href="#enter-popup" class="fancybox-enter"> <span></span></a>
        </div>
    </div>
</div>
          {/foreach}
          {/if}
</div>
            
                <div class="middle-items-button">
            {if !$ge}            <a href="/game"><span>Игровой зал</span>
                        <img src="{$theme_url}/images/middle-items-button-img.png" alt="">
                        <img src="{$theme_url}/images/middle-items-button.png" alt="" class="norm">
                        <img src="{$theme_url}/images/middle-items-button-hover.png" alt="" class="norm hover"></a>
                        {/if}   
                </div>
             
</div>
{if !$ge && $cur_tour_one}
<div class="aside">
                <div class="aside-wrap">
                
                <!-- ТЕКУЩИЙ ТУРНИР -->
    <div class="aside-img">
        <img src="{$theme_url}/images/tournaments/{$cur_tour_one.pic}" alt="{$cur_tour_one.name}"/>
    </div>
    <div class="aside-description">
        <p class="linear-yellow">{$lang['current_tournament']}</p>
        <b>{$cur_tour_one.name}</b>
        <b class="shadow"><span>{$cur_tour_one.prizes_sum}</span></b>
        <p class="linear-yellow">{$lang['time_left']}</p>
        <div class="timer__table" id="{$cur_tour_one.id}" data-timer="{strtotime($cur_tour_one.end_time)}">
        </div>
        <a href="/tournament/{$cur_tour_one.id}" class="aside-button"
           data-piwik-event="Group_Menu_Widgets,WidgetTournamentMainParticipate,Participate_now_-_tournaments_-_Main_Page">
            <img src="{$theme_url}/images/aside-button.png" alt="">
            <img src="{$theme_url}/images/aside-button-hover.png" class="hover" alt="">
            <span>УЧАСТВОВАТЬ</span>
        </a>
    </div>
    <div class="aside-table">
        <div class="aside-table-wrap">
                {foreach $cur_tour_one.gamers as $i=>$gamer}
                <div class="row">
                    <div class="item">{$i+1}</div>
                    <div class="item">
                        <div>{$gamer.user}</div>
                    </div>
                    <div class="item">{$gamer.result}</div>
                </div>
                {/foreach}
                
        </div>
    </div>
    
<!-- ТЕКУЩИЙ ТУРНИР -->

              </div>
            </div>
{/if}

        </div>
    </div>
</div>                