<main class="section__main">
    <div class="main main_gallery">
        <div class="main__inner">
          {if isset($game_block1)&& $game_block1}
          {foreach $game_block1 as $game}
<li class="main__item preview">
    <div class="preview__item">
	<img src="{$theme_url}/ico/{$game.g_name}.png" class="preview__img" alt="{$game.g_title}">
        <div class="preview__overlay">
            <div class="preview__action">
				<a href={if $login}"/games/{$game.g_path}/{$game.g_name}/real"{else}"#login-modal" data-toggle="modal"{/if} class="preview__button button button_color_orange">{$lang['play']}</a>
				<br>
            </div>
              {if $game.favorites}
                <i class="preview__icon fa fa-star in_favorites" data-toggle="remove-fav" data-id="{$game.g_id}" title="{$lang['del_favorites']}"></i>
              {else} 
                <i class="preview__icon fa fa-star" data-toggle="add-fav" data-id="{$game.g_id}" title='{$lang['add_favorites']}'></i>
              {/if}  
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
</main>