<div class="title-inside">
    <h1>VIP уровень</h1>
</div>

<div class="mbox has-shadow static-shadow">
    <div class="vip-status-steps">
        <div class="vip-status-steps-wrap">
                            
                            
                {foreach $point_courses as $k=>$cours}
                      <div class="step">
                        <div class="step-circle-wrap">
                          <div class="step-circle">
                            <div class="step-circle-img">
                                <img src="{$theme_url}/img/vip/{$cours.pic}" alt="{$cours.name}">
                            </div>
                            <div class="step-circle-count">
                                <img src="{$theme_url}/images/step-circle-img-count-{$k}.png" alt="">
                            </div>
                            <div class="step-arrow">
                                <img src="{$theme_url}/images/step-arrow-right.png" alt="">
                            </div>
                        </div>
                        <div class="step-text">
                                                            <div class="step-textting">
                                    <span>ПОДРОБНЕй</span> <img src="{$theme_url}/images/step-textting-img.png" alt="">
                                </div>
                                <div class="step-description">
                                    <div class="step-description-wrap">
                                        <div class="step-description-title">
                                            <b>{$cours.title} {$cours.name}</b>
                                </div>
                                        <div class="step-description-text">
                                            {$cours.description}
                                        </div>
                                    </div>
                        </div>
                                                    </div>
                        </div>
                      </div>
                {/foreach}
