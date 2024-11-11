{if count($messages)>0}
  {foreach $messages as $message}
<div class="popup popup_emailConfirmed" style="">
            <div class="popup__close js-close-popup">
                <svg class="svg__close svg-close-dims">
                    <use xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
                </svg>
            </div>
            <div class="popup__head">
                <div class="popup__title">{$lang['notification']}</div>
            </div>
            <div class="popup__content">
                <div class="popup__caption">{$message[1]}</div>
            </div>
            <div class="popup__footer">
                <button class="popup__button button button_color_brightblue js-close-popup">{$lang['close']}</button>
            </div>
</div>
  {/foreach}
{/if}