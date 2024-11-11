            <div class="vipclub">
                <div class="vipclub__header">
                    <h1 class="vipclub__title title title_font_huge">{$title}</h1>
                </div>
                <div class="vipclub__content">
                    <p class="vipclub__note">
                        {$content}
                    </p>
					
                    <div class="vipclub__row">
                        {foreach $point_courses as $k=>$cours}
                        <div class="vipclub__item" data-target='#rate{$k}'>
                            <div class="vip-panel">
                                <div class="vip-panel__badge">{$k}</div>
                                <img src="{$theme_url}/img/vip/{$cours.pic}" alt="{$cours.name}" class="vip-panel__img">
                                <button class="vip-panel__button button button_color_brightblue">{$cours.name}</button>
                            </div>
                        
                        </div>
                        <div class="vipclub__info" id="rate{$k}">
                            <h3 class="vipclub__subtitle title">{$cours.title} {$cours.name}</h3>
                            <div class="vipclub__caption">
                                {$cours.description}
                            </div>
                            <span class="vipclub__arrow"></span>
                        
                        </div>
                       {if $k%3==0}
                    </div>
                    <div class="vipclub__row">
                       {/if}
                       {/foreach}
                                                
                    </div>
                    
                </div>
            </div>