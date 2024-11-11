<div class="bonus-page">

<div class="bonus-nav">
    <div class="bonus-nav-item active">
        <a href="#">
            <div class="title-inside">
                <span class="h1">Мой уровень</span>
            </div>
        </a>
    </div>
    <div class="bonus-nav-item">
        <a href="/profile">
            <div class="title-inside">
                <span>Мой счет</span>
            </div>
        </a>
    </div>
</div>

<div class="bonus-wrap">
    <div class="mbox has-shadow static-shadow">

        <div class="trading-block">

            <div class="bonuse-page-shadows top">
                <img src="{$theme_url}/images/shadow-bonuse-page.png" alt="">
            </div>
            <div class="bonuse-page-shadows bottom">
                <img src="{$theme_url}/images/shadow-bonuse-page.png" alt="">
            </div>

            <div class="trading-block-main">

                <div class="title-wrap">
                    <h1 class="title">Ваши монеты <span>{$point_pay}</span>
                        <div class="toltip-icon">
                            <div class="toltip-main">
                                <img src="{$theme_url}/images/toltip-icon-img.png" alt="">
                            </div>
                            <div class="toltip-text">
                                <p>Вам нужно набрать 3000 монет для получения следующего уровня</p>
                            </div>
                        </div>
                    </h1>
                </div>

                <div class="trade-main">
                    <form action="action="?action=exchange" method='post'" method="POST" id="exchange-form" class="trade-form" novalidate="novalidate">
                        <div class="trade-form-wrap">
                            <div class="form-row">
                                <div class="form-col">
                                    <div class="form-title">Количество монет</div>
                                    <div class="form-input bonuses-input">
                                        <input type="text" id="exchange-input" name="sumpoints" class="input__inner" min="100" data-barter="1" data-barter-two="{$point_cours/100}">
                                    </div>
                                </div>
                                <div class="form-col">
                                    <div class="form-title">Курс обмена</div>
                                    <div class="form-input">
                                        <div class="trade-course input-imitation">100 : {$point_cours}</div>
                                    </div>
                                </div>
                                <div class="form-col">
                                    <div class="form-title">Вы получите</div>
                                    <div class="form-input rubs-input">
                                        <input type="text" id="exchange-output" class="input__inner" data-barter-two="1" data-barter="{$point_cours/100}">
                                        <div class="trade-value input-imitation">
                                            <p>
                                                <span class="calced-value">0</span>
                                                <span class="calded-count">рублей</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="error__info" style="padding-bottom: 20px"></div>
                            <div class="form-row submit-row">
                                <div class="submit-button button-whith-img">
                                    <button type="submit" data-piwik-event="Group_Profile_VIP,ProfileVIPExchangeRate,Exchange_Rate">
                                        <span>Обменять на деньги</span>
                                        <img src="{$theme_url}/images/bonus-page-submit-button-hover.png" alt="" class="hover">
                                        <img src="{$theme_url}/images/bonus-page-submit-button-normal.png" alt="" class="normal">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

        </div>

        <div class="bonus-page-progress">

            <div class="bonus-page-progess-values" data-value="0">
                <ul>
                {foreach $point_courses as $k=>$cours}
                                            <li>
                            <div class="value">{$cours.range}</div>
                            <div class="breacker-wrap">
                                <div class="breacker-background"></div>
                                <div class="breacker-active"></div>
                            </div>
                        </li>
                 {/foreach}       
                                           
                    
                </ul>
                <div class="mobile-value">0</div>
            </div>

            <div class="bonus-page-progress-wrap">
                <div class="progress-line" data-value="0">
                    <div class="progress-line-background">

                        <ul class="progress-line-breackers-mobile">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>

                        <img src="{$theme_url}/images/progress-line-background.png" alt="">
                        <img src="{$theme_url}/images/progress-line-background-mobile.png" alt="" class="mobile">
                    </div>
                    <div class="progress-line-value" style="width: 0%;">
                        <ul class="progress-line-breackers-mobile">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

        <div class="bonus-page-leveling">

            <div class="leveling-icons">
            
            {foreach $point_courses as $k=>$cours}
              <div class="leveling-icon" >

                        <div class="leveling-icon-wrap">
                            <div class="leveling-img">
                                <img src="{$theme_url}/img/vip/{$cours.pic}" alt="" style="width: 99px; heigth: 99px;">
                            </div>
                            <div class="leveling-text">Курс обмена</div>
                            <div class="leveling-button active">
                               {assign var=point_cours_arr value=explode('|',$cours.point_cours)}
                                <span>100:{$point_cours_arr[0]}</span>
                            </div>

                            <div class="info-item-triangle active"></div>

                        </div>

                        <div class="info-item">
                            <div class="info-item-wrap">
                                <div class="info-title linear-yellow">Преимущества</div>
                                <div class="info-text">
                                    <div class="levels-table__note">{$cours.description}</div>
                                </div>
                            </div>
                        </div>

                    </div>
            {/foreach}
            
            </div>

        </div>

    </div>
</div>
</div>