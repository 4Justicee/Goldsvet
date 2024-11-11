<div class="hidden-block">
    <div id="call-popup">
        <form action="ajax.php" name="" class="login-form" >

            <a title="Close" class="close-btn" href="#"></a>

            <div class="contact-form-row cfix">
                <div class="contact-form-item">
                    <div class="contact-form-item-input form_row">
                        <div class="form_input">
                            <input type="text" name="login" required="required" value="" placeholder="Логин" aria-required="true">
                        </div>
                    </div>
                </div>
                <div class="contact-form-item">
                    <div class="contact-form-item-input form_row">
                        <div class="form_input">
                            <input type="password" name="pass" class="password" value="" required="required" placeholder="ПаРОЛЬ" aria-required="true">
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact-form-row cfix">
                <div class="contact-form-item">
                    <button type="submit" class="contact-submit">
                        <span>ВОЙТИ</span>
                    </button>
                </div>
            </div>
            <div class="contact-form-row">
                <a href="#">
                    <span>ЗАБЫЛИ ПАРОЛЬ?</span>
                </a>
            </div>
        </form>
    </div>

    <div class="popup popup_tabs popup_undefined" id="cabinet-modal" style="display: none">
    <div class="tab">
        <div class="tab__action">
            <a href="#cashier" target="_self" class="tab__item" data-toggle="tab" data-piwik-event="Group_ProfileMenu,ProfileMenuCashier,Cashier">Касса</a>
            <a href="#profile" class="tab__item tab__item_active" data-toggle="tab" data-piwik-event="Group_ProfileMenu,ProfileMenuProfile,Profile">Профиль</a>
            <a href="#bonuses" target="_self" class="tab__item" data-toggle="tab" data-piwik-event="Group_ProfileMenu,ProfileMenuBonus,Bonus">Подарки</a>
            <a href="#vip" target="_self" class="tab__item" data-toggle="tab" data-piwik-event="Group_ProfileMenu,ProfileMenuVIP,VIP">VIP</a>
        </div>
        <div class="tab__content">
        
            <div id="cashbox" class="cashbox-popup has-tabs">
    <div class="close-btn-custom"></div>
    <div class="cashbox-popup-wrap">
        <div class="cashbox-top">
            <div class="cashbox-top-title">
                <ul>
                    <li class="active"><b>Касса</b></li>
                    <li><a class="fancybox-bonus" href="#bonus-popup">Мои подарки</a></li>
                </ul>
            </div>
            <div class="cashbox-top-tabs">
                <div class="tabs-block popap">
                    <div class="tabs-block-wrap">
                        <ul>
                            <li class="active"><a href="#"><span class="item-wrap" data-piwik-event="Group_ProfileMenu_Deposit,ProfileDepositClick,Deposit_by_channels"><span class="item"><span>Пополнение</span></span></span></a>
                            </li>
                            <li><a href="#" data-piwik-event="Group_ProfileMenu_Withdraw_Step1,ProfileWithdrawClick,Withdraw_channel"><span class="item-wrap"><span class="item"><span>Вывести</span></span></span></a>
                            </li>
                            <li><a href="#" data-piwik-event="Group_ProfileMenu_History,ProfileHistory,History"><span class="item-wrap"><span class="item"><span>История</span></span></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="cashbox-middle">
            <div class="cashbox-middle-wrapper">
                <div class="cashbox-middle-item active">
                    <div class="cashbox-middle-items deposite">
                                               <div class="payment__gallery">

                  {include file='inpaysys.tpl'}                             

</div>


                        
                    </div>
                </div>
                <div class="cashbox-middle-item">
                    <div class="cashbox-middle-items conclusion">
                                               
<div class="payment__gallery">
        {include file='outpaysys.tpl'}
    
</div>
<script>
    $(function(){
        $('input[name=ps]').change(function(){
            $('.pay-tooltip__caption').hide();
            var vm = $(this).val();
            if(vm !== 'card') {
                $('.number-ver').show();
            }else {
                $('.card-ver').show();
            }
        });
    });
    function outpay_rotator(form)
    {
        data=$(form).serialize();
	$(form).find('.error__info').remove();
        $.post('/rotator/withdraw/out.php',data,function(res){
            if(res.success===true)
            {
                if(res.txt)
                    $(form).children('.dialog_success').html(res.txt).show();

                setTimeout (function(){ window.location.reload()}, 3000);
            }
            else
            {
		$(form).find('.item-form').append('<div class="error__info"></div>');
                $(form).find('.error__info').html(res.error);
            }
        },'json');

        return false;
    }
</script>

                                            </div>
                </div>
                <div class="cashbox-middle-item">
<div class="cash-popup-history">
    <div class="table-imitation" id="cash-popup-history">
        <div class="table-header">
            <div class="header-row">
                <div class="cell">id</div>
                <div class="cell">дата</div>
                <div class="cell">сумма</div>
                <div class="cell">система</div>
                <div class="cell">Тип</div>
            </div>
        </div>
        <div class="table-main-container">
          {if $history}
                                        {foreach $history as $row}
                                        <div class="table-row">
                                            <div class="cell">{$row.inv_code}</div>
                                            <div class="cell">{$row.date}</div>
                                            <div class="cell">{abs($row.sum)} {$lang['currency']}</div>
                                            <div class="cell">{$row.paysys}</div>
                                            <div class="cell">{$row.type}</div>
                                        </div>
                                        {/foreach}
          {/if}
        </div>
        <div class="table-main-container mCustomScrollbar _mCS_1 mCS_no_scrollbar">
          <div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style="max-height: 0px;" tabindex="0">
            <div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr"></div>
            <div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical" style="display: none;">
              <div class="mCSB_draggerContainer">
                <div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 100px; top: 0px;">
                  <div class="mCSB_dragger_bar" style="line-height: 100px;"></div>
                </div>
                <div class="mCSB_draggerRail"></div>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).on('submit','form.rotator-form',function(e){
        e.preventDefault();
        var $type=$(this).attr('method');
        var $action=$(this).attr('action');
        var $data=$(this).serialize();
        var $answer=$(this).data('answer');
        var $form=$(this);
        $.ajax({
            type:$type,
            url:$action,
            data:$data,
            dataType:'json',
            beforeSend:function(){
                $form.find('.pay-tooltip__note').hide();
                //  $form.closest('.modal,.popup').append(preloader);
            },
            success:function(data){
                $('.loading').remove();
                if(data.result!='ok'){
                    if($.type(data.message)=='object'){
                        $form.find('.pay-tooltip__note .error__info1').html('');
                        $.each(data.message,function($key,$value){
                            $form.find('.pay-tooltip__note .error__info1').append($value + "<br/>");
                        });
                    } else {
                        $form.find('.pay-tooltip__note .error__info1').html(data.message);
                    }
                    $form.find('.pay-tooltip__note').show();
                } else {
                    if(data.redirectUrl){
                        window.location.href = data.redirectUrl;
                    }
                    else{
                        window.location.reload();
                    }
                }
            }
        })
    });
</script>

            <div id="bonus-popup" class="bonus-popup" style="display: none;">
    <div class="bonus-popup-main">

        <div class="bonus-popup-top">
            <div class="title">
                <div class="word-wrap">
                    <a href="#cashbox" class="fancybox-cashbox-form">Касса</a>
                </div>
                <div class="word-wrap active">
                    <span>Мои подарки</span>
                </div>
            </div>
            <div class="close-btn-custom"></div>
        </div>

        <div class="bonus-popup-items" style="height: 668px;">
            <div class="bonus-getmoney" id="getmoney-popup">
    
    
    <div class="item bonus-getmoney__item success">
        <span class="title">Спасибо!</span>
        <div class="bonus__item__content">
            <p class="bonus__item__p">
                В течение 15 минут вы получите
                полную информацию о чудо-бонусах в нашем казино
            </p>
            <div class="popup-panel__row">
                <button class="btn" id="close-bonus">Ok</button>
            </div>
        </div>
    </div>
</div>

{foreach $bonuses as $bonus}
            <div class="item">

                    <div class="item-img">
                        <img src="{$theme_url}/images/bonus/{$bonus.pic}" alt="">
                    </div>

                    <div class="item-info">
                        <div class="title linear-purple">{$bonus.name}</div>
                        <div class="content">{$bonus.desc}</div>
                    </div>

                    <div class="item-right">
                        <div class="title">
                            {if $bonus.status==1}
                                <p class="bonus-panel__title bonus-panel__title_alert">{$lang['bonus_active']}:</p>
                            {else}
                                <p class="bonus-panel__title bonus-panel__title_alert">{$lang['before_end_activation_bonus']}:</p>
                            {/if}
                        
                        </div>
                        <div class="item-time-left">
                            
                            <!-- here gona be timers -->
                        <div class="bonus-popup-timer bonus-panel__timer timer timeTo timeTo-white" data-timer="{if $bonus.status==1}{$bonus.start_time+$bonus.live_time*24*60*60}{else}{if $bonus.end_time} {$bonus.end_time} {else} {$bonus.start_time+$bonus.activate_time*24*60*60}{/if}{/if}" style="font-family: Roboto; font-size: 30px;"><figure style="width:72px"><div class="first" style="width:28px; height:32px;"><ul style="left:3px; top:-32px"><li>0</li><li>0</li></ul></div><div style="width:28px; height:32px;margin-right:12px"><ul style="left:3px; top:-32px"><li>0</li><li>0</li></ul></div><figcaption style="font-size:13px;padding-right:12px">д</figcaption></figure><figure style="max-width:59px"><div class="first" style="width:28px; height:32px;"><ul style="left:3px; top:-32px"><li>1</li><li>1</li></ul></div><div style="width:28px; height:32px;"><ul style="left:3px; top:-32px"><li>2</li><li>2</li></ul></div><figcaption style="font-size:13px;">ч</figcaption></figure><span>:</span><figure style="max-width:59px"><div class="first" style="width:28px; height:32px;"><ul style="left: 3px; top: -32px;" class=""><li>0</li><li>0</li></ul></div><div style="width:28px; height:32px;"><ul style="left: 3px; top: -32px;" class=""><li>0</li><li>0</li></ul></div><figcaption style="font-size:13px;">м</figcaption></figure><span>:</span><figure style="max-width:59px"><div class="first" style="width:28px; height:32px;"><ul style="left: 3px; top: -32px;" class=""><li>3</li><li>3</li></ul></div><div style="width:28px; height:32px;"><ul style="left: 3px; top: 0px;" class="transition"><li>6</li><li>7</li></ul></div><figcaption style="font-size:13px;">с</figcaption></figure></div>
                                                    </div>


                        <div class="button-wrap">
                            <div class="button-main">
                                                                    <a href="#" data-id="481" class="button activate-bonus">
                                        <span>Взять подарок</span>
                                        <img src="{$theme_url}/images/activate-bonus-default.png" alt="" class="default">
                                        <img src="{$theme_url}/images/activate-bonus-hover.png" alt="" class="hover">
                                    </a>
                                
                            </div>
                    </div>
                </div>

            </div>
{/foreach}

        </div>

    </div>
</div>

        </div>
        <div class="tab__close js-close-popup">
            <svg class="svg__close svg-close-dims">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="{$theme_url}/img/svgsprite.svg#close"></use>
            </svg>
        </div>
    </div>
</div>

<div id="change-pass-popup" class="change-pass-popup">
    <div class="close-btn-custom"></div>
    <form action="/engine/ajax/change_pass.php" method="POST" data-answer=".popup_passwordChanged" class="change-pass-form" >
        <div class="change-pass-popup-title">
            <b>Изменить пароль</b>
        </div>
        <div class="contact-form-row cfix">
            <div class="contact-form-item">
                <div class="contact-form-item-input form_row">
                    <p>Текущий пароль</p>
                    <div class="form_input show-hide-pass">
                        <input type="password" name="current_pass" required="required" value="" placeholder="Текущий пароль" aria-required="true">
                        <span class="show-pass-button"></span>
                    </div>
                </div>
            </div>
            <div class="contact-form-item">
                <div class="contact-form-item-input form_row">
                    <p>Новый пароль</p>
                    <div class="form_input show-hide-pass">
                        <input type="password" name="pass" class="" value="" required="required" placeholder="Новый пароль" id="change-pass-password" aria-required="true">
                        <span class="show-pass-button"></span>
                    </div>
                </div>
            </div>
            <div class="contact-form-item">
                <div class="contact-form-item-input form_row">
                    <p>Подтвердите пароль</p>
                    <div class="form_input show-hide-pass">
                        <input type="password" name="re_pass" class="" value="" required="required" placeholder="Подтвердите пароль" id="change-pass-re-password" aria-required="true">
                        <span class="show-pass-button"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-form-row cfix">
            <div class="contact-form-item contact-submit">
                <button type="submit">
                    <span>Изменить пароль</span>
                </button>
            </div>
        </div>
    </form>
</div>

<div id="cashbox_not_resources" class="cashbox-popup cashbox_not_resources">
    <div class="close-btn-custom"></div>
    <div class="cashbox-popup-wrap">
        <div class="cashbox-top">
            <div class="no-resources">
                <div class="no-resources-wrap">
                    <p class="linear-yellow">Осталось лишь пополнить счет</p>
                    <span>Для получения бонуса вам необходимо внести сумму от <span class="popup__title popup__title_accent" id="bonus-deposit-sum"></span></span>
                </div>
            </div>
        </div>
        <div class="cashbox-middle">
            <div class="cashbox-middle-wrapper">
                <div class="cashbox-middle-items active">
                                    <div class="payment__gallery">
                                    
            {include file = 'inpaysys.tpl'}
    
    
</div>


                                </div>
            </div>
        </div>
    </div>
</div>

<div id="phone-modal" class="bottom-panel popup_gameplayPhoneNomoney" style="display: none;">
        <div class="bottom-panel__close"><i class="icon icon_cross-bold"></i></div>
        <div class="bottom-panel__head">
            <div class="bottom-panel__head-tt">
                <div class="bottom-panel__title">ЧудоСлот - это место, где случаются чудеса!</div>
                <div class="bottom-panel__subtitle">
                    Просто оставьте свой номер в поле ниже
                    и мы подберем для вас самый чудесный бонус из всех существующих
                </div>
            </div>
            <div class="success" style="display:none">
                <div class="bottom-panel__title">Спасибо</div>
                <div class="bottom-panel__subtitle">
                    В течение 15 минут вы получите полную информацию
                    о чудо-бонусах в нашем казино
                </div>
                <br>
                <button class="btn ok-bonus-close">Ok</button>
            </div>
        </div>
        <div class="bottom-panel__content">
            <div class="bottom-panel__form">
                <div class="bottom-panel__input input">
                    <input type="text" placeholder="7 ___ ___ __ __" class="input__inner js-input__inner_tel" id="bottom-bonus__phone">
                </div>
                <button data-id="370351" data-type="registration" class="getBonus all_ btn">Ok</button>
            </div>
            <span class="error_phone" style="display: none;color:red;font-size: 13px;margin-top: 10px;">Некорректный номер телефона</span>
        </div>
        <div class="bottom-panel__bonus-info">
            <span class="bottom-panel__bonus-icon">
                <i class="icon icon_lock_small"></i>
            </span>
            <span class="bottom-panel__bonus-note">Мы надежно храним ваши данные и не передаем их третьим лицам</span>
        </div>
    </div>
                        
<div class="popup popup_phoneVerification" style="display: none">
    <div class="popup__close js-close-popup">
        <div class="close-btn-custom"></div>
    </div>
    <div class="popup__head">
        <div class="popup__title">SMS код отправлен</div>
    </div>
    <form action="/engine/ajax/activate.php" method="POST" id="phone-verification" data-answer=".popup_phoneVerified" >
        <div class="popup__content">
            <div class="popup__caption">SMS с кодом активации был отправлен на ваш мобильный телефон. Пожалуйста, введите его в поле ниже
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="popup__input input">
                        <input type="text" name="code" required="required" class="input__inner" placeholder="SMS код" aria-required="true">
                    </div>
                </div>
                <div class="col-sm-6">
                    <a class="popup__button button button_secondary" data-resend="1" data-verification="phone">Отправить</a>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <div class="popup__timer clock-timer">
                        <div class="clock-timer__icon"><i class="icon icon_clock"></i></div>
                        <div class="clock-timer__counter">00:59</div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="popup__advice">
                        Вы не можете получить код сейчас, вы сможете запросить код повторно согласно таймеру ниже
                    </div>
                </div>
            </div>

            <div style="" class="modal__error">
                <div class="modal__note_important"></div>
            </div>
        </div>
        <div class="popup__footer">
            <button class="popup__button button" type="submit" data-piwik-event="Group_Profile,ProfilePhoneConfirmSMS,Confirm_--_inside_of_pop_up_for_imputing_SMS_code">Подтвердить</button>
        </div>
    </form>
</div>
<div class="popup popup_emailVerification" style="display:none">
    <div class="popup__close js-close-popup">
        <div class="close-btn-custom"></div>
    </div>
    <div class="popup__head">
        <div class="popup__title">Подтверждение электронной почты</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">Сообщение отправлено</div>
        <div class="popup__caption">
            Активационная ссылка была отправлена на ваш е-майл. Пожалуйста, проверьте его и перейдите по ссылке для завершения верификации
        </div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_secondary js-close-popup">Закрыть</button>
    </div>
</div>

<div class="popup popup_favoritesAdded" style="display:none">
    <div class="popup__close js-close-popup">
        <div class="close-btn-custom"></div>
    </div>
    <div class="popup__head">
        <div class="popup__title">Уведомление</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">Игра добавлена в Любимые</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_secondary js-close-popup">Закрыть</button>
    </div>
</div>

<div class="popup popup_favoritesAddedFail" style="display:none">
    <div class="popup__close js-close-popup">
        <div class="close-btn-custom"></div>
    </div>
    <div class="popup__head">
        <div class="popup__title">Уведомление</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">Невозможно добавить игру в Любимые</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_secondary js-close-popup">Закрыть</button>
    </div>
</div>
<div class="popup popup_phoneVerified" style="display:none">
    <div class="popup__close js-close-popup">
        <div class="close-btn-custom"></div>
    </div>
    <div class="popup__head">
        <div class="popup__title">Уведомление</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">Телефон успешно подтвержден</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_secondary js-close-popup">Закрыть</button>
    </div>
</div>
<div class="popup popup_gameplayGallery" style="display: none">

    <div class="popup__content middle-items">
        <div class="popup__title">Отправьтесь в чудесный мир других игр. Выберите одну из самых увлекательных прямо сейчас:</div>
        <div class="popup__gallery middle-items-wrap">
            <div class="items">
            
            {for $i=0;$i<3;$i++}
            {if $game=array_shift(array_shift($games))}
            <div class="item" data-id="{$game.g_id}">
              <div class="item-img">
                <div class="item-img-wrap"><img src="{$theme_url}/ico/{$game.g_name}.png" alt=""></div>
                <div class="item-img-buttons">
                    <a {if (isset($user_id)&& $user_id>0)}href="/games/{$game.start_path}/{$game.g_name}/real" class="game" {else} href="#enter-popup" class="game fancybox-enter"{/if} >
                      <img src="{$theme_url}/images/item-buttons-game.png" alt="">
                      <img src="{$theme_url}/images/item-buttons-game-hover.png" class="hover" alt="">
                      <span>Играть</span>
                    </a>
                    <a href="/games/{$game.start_path}/{$game.g_name}/demo" class="demo">
                      <img src="{$theme_url}/images/item-buttons-demo.png" alt="">
                      <img src="{$theme_url}/images/item-buttons-demo-hover.png" class="hover" alt="">
                      <span>Демо</span>
                    </a>
                </div>
              </div>
              <div class="item-description">
                <div class="item-description-wrap">
                  <div class="item-title">{$game.g_title}</div>
                  <div class="item-subtitle">Сейчас в игре : {$game.g_counter}</div>
                </div>
                <div class="item-star ">
                  <a href="#" data-toggle="add-fav" data-id="{$game.g_id}"> <span></span></a>
                </div>
              </div>
            </div>
            
            {/if}
            {/for}
                    
                
            </div>
        </div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button" onclick="$('.popup,.modal').hide()" data-piwik-event="Group_Popups_Another_Game_Leave,PopAnotherGameBack,Click_Go_back">Назад к игре</button>
        <a class="popup__close" href="/" data-piwik-event="Group_Popups_Another_Game_Leave,PopAnotherGameLobby,Click_Go_to_lobby">Выйти в лобби</a>
    </div>
</div>

<div class="popup popup_passwordChanged" style="display:none">
    <div class="popup__close js-close-popup">
        <div class="close-btn-custom"></div>
    </div>
    <div class="popup__head">
        <div class="popup__title">Пароль изменен</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">Ваш пароль успешно изменен <br>
            Удачи в играх!
        </div>
    </div>
    <div class="popup__footer">
        <div class="popup__button button button_secondary js-close-popup">Закрыть</div>
    </div>
</div>

<div class="popup popup_bonusNotification" id="have_active_bonus" style="display:none">
    <div class="popup__close js-close-popup">
        <div class="close-btn-custom"></div>
    </div>
    <div class="popup__head">
        <div class="popup__title">Уведомление</div>
    </div>
    <div class="popup__content">
        <div class="popup__title">У вас уже есть активный подарок</div>
    </div>
    <div class="popup__footer">
        <button class="popup__button button button_secondary js-close-popup">Закрыть</button>
    </div>
</div>


<div id="cashbox_insufficient_funds" class="cashbox-popup cashbox-insufficient-funds">
    <div class="close-btn-custom"></div>
    <div class="cashbox-popup-wrap">
        <div class="cashbox-top">
            <div class="insufficient-funds">
                <div class="insufficient-funds-wrap">
                    <p>У ВАС НЕДОСТАТОЧНО СРЕДСТВ, ЧТОБЫ ПРОДОЛЖИТЬ ИГРУ</p>
                    <ul>
                        <li><span>1) Сделайте депозит удобным для вас способом</span></li>
                        <li><span>2) Наслаждайтесь игрой</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="cashbox-middle">
            <div class="cashbox-middle-wrapper">
                <div class="cashbox-middle-item active">
                    <div class="cashbox-middle-items deposite">
                                <div class="payment__gallery">
                      {include file='inpaysys.tpl'}
</div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="popup popup_afterRegistration" id="reg_vip" style="display: none;">
    <div class="popup__close js-close-popup vip_button" data-id="370351">
        <div class="close-btn-custom"></div>
    </div>
    <div class="popup__head">
        <div class="popup__title">Добро пожаловать!</div>
    </div>
    <div class="popup__content">
        <div class="popup__title popup__title_accent">Ваш бонус</div>
        <div class="bonus bonus_single">
            <div class="bonus__item bonus__item">
                <img src="{$theme_url}/img/klondike.png">
                <div class="bonus__info">
                    <span class="bonus__name">Золотой Клондайк</span>
                    <span class="bonus__caption">
                                Регистрация завершена. Теперь вы можете пополнить счет и получить приветственный подарок
                            </span>
                </div>
            </div>
        </div>

    </div>
    <div class="popup__footer">
        <button data-id="370351" class="vip_button popup__button button">Получить</button>
    </div>
</div>
{if !$user_id}
<div class="register-popup popup_Reg" id="registration-modal" style="display: none;">
    <div class="popup__close js-close-popup">
       <div class="close-btn-custom"></div>
    </div>
    <div class="popup__content">
        <img src="{$theme_url}/images/reg-header-2.png" class="reg-header">
        <img src="{$theme_url}/images/present-1000.png" class="reg-present">
        <div class="register-popup-content">
            <div class="register-step">
                <form method="post" id="register-form" class="register-form" action="/engine/ajax/user.php?action=register" >
                    <input type="hidden" name="manual" value="0" id="manual">
                    <input type="hidden" name="yes" value="1" >
                    <input type="hidden" name="gift" value="{rand(1,3)}">
                    <div class="second-step-col-second">
                        <div class="register-fields-wrap">
                            <div class="form-row visible">
                                <div class="form-col form_row">
                                    <div class="form-col-wrap">
                                        <div class="form-input">
                                            <input data-piwik-event="Registration, Click, Email_Step_2" type="email" placeholder="Введите почту" name="email" id="user_email" required="required" aria-required="true" class="">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-col form_row">
                                    <div class="form-col-wrap">
                                        <div class="form-input">
                                            <input ddata-piwik-event="Registration, Click, Password_Step_2" type="password" name="pass" id="user_pass" placeholder="Введите пароль" required="required" aria-required="true" class="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="error__info"></div>
                        </div>
                        <div class="bottom-steps-soci-enter">
                                                                                            <div class="reg-steps-soc-text"><span>или войдите через</span></div>
                                <div class="popup-soci-wrap">
                                    <div class="popup-soci" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://{$config['url']}/registration?ulogin">
                                        <ul>
                                                                                        <li>
                                                <a class="socials__item {if array_key_exists('vkontakte',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('vkontakte',$user_info.soc)} data-uloginbutton = "vkontakte"{/if}>
                                                    <img src="{$theme_url}/images/profile-ocial-icon-normal-vkontakte.png" alt="">
                                                    <img src="{$theme_url}/images/profile-ocial-icon-hover-vkontakte.png" alt="" class="hover">
                                                </a>
                                            </li>
                                                                                        <li>
                                                <a class="socials__item {if array_key_exists('odnoklassniki',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('odnoklassniki',$user_info.soc)} data-uloginbutton = "odnoklassniki"{/if}>
                                                    <img src="{$theme_url}/images/profile-ocial-icon-normal-odnoklassniki.png" alt="">
                                                    <img src="{$theme_url}/images/profile-ocial-icon-hover-odnoklassniki.png" alt="" class="hover">
                                                </a>
                                            </li>
                                                                                        <li>
                                                <a class="socials__item {if array_key_exists('twitter',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('twitter',$user_info.soc)} data-uloginbutton = "twitter"{/if}>
                                                    <img src="{$theme_url}/images/profile-ocial-icon-normal-twitter.png" alt="">
                                                    <img src="{$theme_url}/images/profile-ocial-icon-hover-twitter.png" alt="" class="hover">
                                                </a>
                                            </li>
                                                                                        <li>
                                                <a class="socials__item {if array_key_exists('facebook',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('facebook',$user_info.soc)} data-uloginbutton = "facebook"{/if}>
                                                    <img src="{$theme_url}/images/profile-ocial-icon-normal-facebook.png" alt="">
                                                    <img src="{$theme_url}/images/profile-ocial-icon-hover-facebook.png" alt="" class="hover">
                                                </a>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                                    </div>
                        <div class="form-row form-submit-row">
                            <div class="form-col">
                                <div class="lisence-checkbox">
                                    <label data-piwik-event="Registration, Click, Accept_rules">
                                        <input type="checkbox" name="yes" required="required" checked="" aria-required="true">
                                        <span class="checkbox-mask"></span>
                                        <span class="lisence-text">Я принимаю условия</span>
                                    </label>
                                </div>
                            </div>
                            <div data-piwik-event="Registration, Click, Register" class="form-col">
                                <button class="button-submit-steps popup__button" type="submit">
                                    <span>Регистрация</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>

<div id="enter-popup" class="enter-popup" style="display: none;">

    <div class="enter-popup-main">

        <div class="enter-popup-top">
            <div class="title linear-purple">Авторизация</div>
            <div class="close-btn-custom"></div>
        </div>

        <div class="enter-popup-center">

            <div class="enter-popup-center-wrap">

                <form class="enter-popup-form" action="/engine/ajax/user.php?action=auth" method="POST">
                    <div class="form-row">
                        <div class="form-input">
                            <div class="form-title">Введите Ваш e-mail</div>
                            <div class="form-wrap">
                                <input type="email" name="email" required="required" placeholder="Почта" aria-required="true">
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-input">
                            <div class="form-title">Введите Ваш пароль</div>
                            <div class="form-wrap">
                                <input type="password" name="pass" required="required" placeholder="Пароль" aria-required="true">
                            </div>
                        </div>
                    </div>
                    <div class="form-row submit">
                        <button class="button enter-submit-button" type="submit" data-piwik-event="Group_Popups_Authorization,PopAuthLogin,Log_In">
                            <span>Войти</span>
                            <img src="{$theme_url}/images/enter-submit-default.png" alt="">
                            <img src="{$theme_url}/images/enter-submit-hover.png" alt="" class="hover">
                        </button>
                    </div>
                </form>

                <div class="forgot-pass">
                    <a href="#restore-pass-popup" class="fancybox-enter" data-piwik-event="Group_Popups_Authorization,PopAuthPassword,Forgot_Password">Забыли пароль?</a>
                </div>

                <div class="enter-socials">
                                                                    <div class="title linear-purple">Войти через</div>
                        <div class="popup-soci" data-ulogin="display=buttons;fields=first_name,last_name;redirect_uri=http://{$config['url']}/registration?ulogin">
                            <ul>
                                                                    <li>
                                        <a class="socials__item {if array_key_exists('vkontakte',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('vkontakte',$user_info.soc)} data-uloginbutton = "vkontakte"{/if}>
                                            <img src="{$theme_url}/images/header-center-vkontakte.png" alt="">
                                            <img src="{$theme_url}/images/header-center-vkontakte-active.png" alt="" class="hover">
                                        </a>
                                    </li>
                                                                    <li>
                                        <a class="socials__item {if array_key_exists('odnoklassniki',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('odnoklassniki',$user_info.soc)} data-uloginbutton = "odnoklassniki"{/if}>
                                            <img src="{$theme_url}/images/header-center-odnoklassniki.png" alt="">
                                            <img src="{$theme_url}/images/header-center-odnoklassniki-active.png" alt="" class="hover">
                                        </a>
                                    </li>
                                                                    <li>
                                        <a class="socials__item {if array_key_exists('twitter',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('twitter',$user_info.soc)} data-uloginbutton = "twitter"{/if}>
                                            <img src="{$theme_url}/images/header-center-twitter.png" alt="">
                                            <img src="{$theme_url}/images/header-center-twitter-active.png" alt="" class="hover">
                                        </a>
                                    </li>
                                                                    <li>
                                        <a class="socials__item {if array_key_exists('facebook',$user_info.soc)} socials__item_active{/if}" href="#" {if !array_key_exists('facebook',$user_info.soc)} data-uloginbutton = "facebook"{/if}>
                                            <img src="{$theme_url}/images/header-center-facebook.png" alt="">
                                            <img src="{$theme_url}/images/header-center-facebook-active.png" alt="" class="hover">
                                        </a>
                                    </li>
                                
                            </ul>
                        </div>
                    
                </div>

            </div>

        </div>

        <div class="enter-popup-bottom">
            <div class="enter-popup-bottom-wrap">
                <p>Еще не зарегистрированы?</p>
                <a href="#registration-modal" class="fancybox-registration" data-piwik-event="Group_Popups_Authorization,PopAuthReg,Register">Регистрация</a>
            </div>
        </div>

    </div>

</div>

<div id="restore-pass-popup" class="enter-popup restore-pass">

    <div class="enter-popup-main">

        <div class="enter-popup-top">
            <div class="title linear-purple">Восстановить пароль</div>
            <div class="close-btn-custom"></div>
        </div>

        <div class="enter-popup-center">

            <div class="enter-popup-center-wrap">

                <form class="restore-pass-popup-form" action="/reminder?action=send" method="post" onsubmit="user_ajax(this,'remind');return false;">
                    <div class="form-row">
                        <div class="form-input">
                            <div class="form-title">Укажите ваш e-mail для получения пароля</div>
                            <div class="form-wrap">
                                <input type="email" name="email" required="required" placeholder="Почта">
                            </div>
                        </div>
                    </div>

                    <div class="form-row submit">
                        <button class="button restore-pass-submit-button" type="submit">
                            <span>Восстановить пароль</span>
                            <img src="{$theme_url}/images/restore-pass-submit-default.png" alt="">
                            <img src="{$theme_url}/images/restore-pass-submit-hover.png" alt="" class="hover">
                        </button>
                    </div>
                </form>

                <div class="forgot-pass">
                    <a href="#" onclick="$('#sh_button').click()">Или обратитесь в службу поддержки</a>
                </div>

            </div>

        </div>

        <div class="enter-popup-bottom">
            <div class="enter-popup-bottom-wrap">
                <p>ХОТИТЕ ЗАРЕГИСТРИРОВАТЬСЯ?</p>
                <a href="#registration-modal" class="fancybox-registration">Регистрация</a>
            </div>
        </div>

    </div>
</div>

<div class="popup popup_restorePassword" style="display:none">
    <div class="popup__close js-close-popup"><i class="icon icon_cross-bold"></i></div>
    <form action="/reminder?action=send" method="post" onsubmit="user_ajax(this,'remind');return false;">
        <div class="popup__head">
            <div class="popup__title">Восстановить пароль</div>
        </div>
        <div class="popup__content">
            <div class="popup__subtitle">Enter your email address to get password</div>
            <div class="popup__input input">
                <input type="text" class="input__inner" name="email" placeholder="Почта">
            </div>
            <div class="modal__error" style="display: none">
                <span class="modal__note modal__note_important"></span>
                <span class="modal__note modal__note_accent"></span>
            </div>

        </div>
        <div class="popup__footer">
            <button type="submit" class="popup__button button">Восстановить пароль</button>
        </div>
    </form>
</div>
{/if}

<script>
    $(function(){
        $('body').addClass('modal_open');
    });

    $('.js-close-popup, .vip_button').click(function(){
        $('body').removeClass('modal_open');
    });
</script>




<script>
    $(function(){
        $('.vip-info__button').on('click', function(){
            var userId = $(this).attr('data-id');
            $.get('/engine/ajax/vip_bonus.php',{ 'user_id':userId},function(data){
                if(data.success == true){
                    document.location.href='/#bonus-popup';
                    location.reload(true);
                }
            },'json');
        });

        $('.vip-info__button').on('click', function(){
            var userId = $(this).attr('data-id');
            $.get('/engine/ajax/vip_bonus.php',{ 'user_id':userId},function(b){
                if(b.success == true){
                    if(xhr!=''){
                        xhr.abort();
                    }
                    xhr =$.post('/engine/ajax/activate_bonus.php', { 'id': b.bonus.bonuses[0]}, function (data) {
                        console.log(data);
                        xhr = '';
                        if(data.is_need_activate_email == true && data.is_need_activate_phone == true) {
                            $('#before_active_bonus .popup__head .popup__title').html('Подтвердите контакты');
                            $('#before_active_bonus .popup__content .popup__title').html(
                                'Для получения бонуса вам нужно подтвердить ваш e-mail и телефон в профиле. '+
                                ' Это займет всего 2 минуты и делается только один раз.');
                            $('#before_active_bonus').show();
                        }
                        else if(data.is_need_activate_phone == false && data.is_need_activate_email == true) {
                            $('#before_active_bonus .popup__head .popup__title').html('Подтвердите емайл');
                            $('#before_active_bonus .popup__content .popup__title').html(
                                'Для получения бонуса вам нужно подтвердить ваш e-mail в профиле. '+
                                ' Это займет всего 2 минуты и делается только один раз.');
                            $('#before_active_bonus').show();
                        }
                        else if(data.is_need_activate_email == false && data.is_need_activate_phone == true) {
                            $('#before_active_bonus .popup__head .popup__title').html('Подтвердите телефон');
                            $('#before_active_bonus .popup__content .popup__title').html(
                                ' Для получения бонуса вам нужно подтвердить ваш телефон в профиле. '+
                                'Это займет всего 2 минуты и делается только один раз.');
                            $('#before_active_bonus').show();
                        }
                        else if (data.status && data.is_deposit) {
                            $('#bonus-img').attr('src', data.image);
                            $('#bonus-deposit-sum').html(data.deposit);
                            $('.deposit-campaign-id').val(data.campaign_id);
                            $('#deposit-for-bonus-modal .aside__promo-table .table__body').html('');
                            $.each(data.winners, function ($key, $item) {
                                var $row = "<tr class='table__row'><td class='table__cell'>" + ($key + 1) + "</td><td class='table__cell'>" + $item.login + "</td><td class='table__cell'>" + Math.round($item.win) + "</td></tr>";
                                $('#deposit-for-bonus-modal .aside__promo-table .table__body').append($row);
                            });
                            $('#cabinet-modal').hide();
                            $('#reg_vip').hide();
                            $('#deposit-for-bonus-modal').show();
                            $('html').addClass('modal_open');
                        } else {
                            if(!data.status){
                                $('#have_active_bonus .popup__content .popup__title').html(data.error);
                                $('#have_active_bonus').show();
                            } else {
                                window.location.reload();
                            }
                        }
                        $(window).scrollTop(0);
                    }, 'json')
                }
            },'json');
        });
    });
</script>






<div class="overflow" style="display: none"></div>
</div>