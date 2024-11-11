$(function(){
    $('.bonus-getmoney__close').click(function(){
        $(this).toggleClass('open');
        $('#bonus__item__content').slideToggle();
    });
    $('#close-bonus').click(function(){
        $('.bonus-getmoney__item.success').remove();
    });
    $('#yes-phone-bonus').on('click', function(){
        var userId = $(this).attr('data-id');
        $.get('/engine/ajax/user.php',{'id':userId, 'action': 'getBonus', 'hasPhone':'yes'},function(data){
            if(data.success == true){
                $('#getmoney-popup').remove();
                $('.bonus-getmoney__item.success').css('display', 'block');
            }
        },'json');
    });
    $('#no-phone-bonus').on('click', function(){
        var userId = $(this).attr('data-id');
        var phone = $('#wish-bonus__phone').val();
        $.get('/engine/ajax/user.php',{'id':userId, 'action': 'getBonus', 'phone':phone, 'hasPhone':'no'},function(data){
            if(data.success == true){
                $('#getmoney-popup').remove();
                $('.bonus-getmoney__item.success').css('display', 'block');

            }else{
                $('.bonus-getmoney .error_phone').css('display', 'block');
            }
        },'json');
    });

    $('#wish-bonus .getBonus.add_first').on('click', function(){
        var userId = $(this).attr('data-id');
        var phone = $('#wish-bonus__phone1').val();
        $.get('/engine/ajax/user.php',{'id':userId, 'action': 'getBonus', 'phone':phone, 'hasPhone':'no'},function(data){
            if(data.success == true){
                $('.wish-bonus-tt').css('display', 'none');
                $('.wish-bonus__content').css('display', 'none');
                $('#wish-bonus-thanks').css('display', 'block');

            }else{
                $('.wish-bonus__content .error_phone').css('display', 'block');
            }
        },'json');
    });

    $('#wish-bonus .getBonus.add_last').on('click', function(){
        var userId = $(this).attr('data-id');
        $.get('/engine/ajax/user.php',{'id':userId, 'action': 'getBonus', 'hasPhone':'yes'},function(data){
            if(data.success == true){
                $('.wish-bonus-tt').css('display', 'none');
                $('.wish-bonus__content').css('display', 'none');
                $('#wish-bonus-thanks').css('display', 'block');
            }
        },'json');
    });

    $('#phone-modal .getBonus.all_').on('click', function(){
        var userId = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        var phone = $('#bottom-bonus__phone').val();
        $.get('/engine/ajax/user.php',{'user_id':userId, 'action': 'phone', 'phone':phone, 'phone_type':type},function(data){
            if(data.success == true){
                $('.bottom-panel__head-tt').css('display', 'none');
                $('.bottom-panel__content, .bottom-panel__bonus-info').css('display', 'none');
                $('.bottom-panel__head .success').css('display', 'block');
            }else{
                $('.bottom-panel__content .error_phone').css('display', 'block');
            }
        },'json');
    });

    $('.wish-bonus__bonus-label').on('click', function() {
        $('.wish-bonus').addClass('open');
    });
    $('.wish-bonus__close, #wish-bonus .ok-bonus-close, #wish-bonus .no-thanks-phone').on('click', function () {
        $('.wish-bonus').removeClass('open');
    });
    $('.popup-panel__toggle').on('click', function() {
        $('.popup-panel__content').slideToggle();
        $(this).toggleClass('close')
    });
    $('.wish-bonus__link').on('click', function () {
        $('.wish-bonus').removeClass('open');
    });
    $('.bottom-panel__close, #phone-modal .ok-bonus-close').on('click', function () {
        $('#phone-modal').css('display', 'none');
    });

    if (window.location.hash != undefined) {
        if (window.location.hash == '#registration'){
            $('a[href="#registration-modal"]').click();
            _paq.push(['trackEvent', 'Registration', 'Open', 'Gift_Popup_Step_1'])
        }

        if (window.location.hash == '#login'){
            $('a[href="#enter-popup"]').click();
            _paq.push(['trackEvent', 'Popup', ', Login'])
        }
    }

});

// mariam piwik
function registerCloseEvents(){
    if($('.register-step.step-first').hasClass('active')){
        _paq.push(['trackEvent', 'Registration', 'Close', 'Gift_Popup_Step_1']);
        console.log( 'Register', 'Close', 'Gift_Popup_Step_1');
    }
    else if($('.register-step.step-second').hasClass('active')){
        _paq.push(['trackEvent', 'Registration', 'Close', 'Gift_Popup_Step_2']);
        console.log( 'Register', 'Close', 'Gift_Popup_Step_2');
    }
}

$('#register-close').click(function(){
    registerCloseEvents()
});

$('#promo_code_value').on('click', function(){
    var userId = $(this).attr('data-id');
    var promoCode = $('#promo_code').val();
    var error =  $('.promo_error');
    var success =  $('.promo--success');

    error.css('display', 'none');
    success.css('display', 'none');

    $.get('/engine/ajax/bonus.php',{'id':userId, 'action': 'getBonusFromCode', 'code':promoCode},function(data){
        if(data.success == true){
            success.css('display', 'block');
            $('.cabinet-promo .form_input').css('display', 'none');
        }else{
            error.text(data.error);
            error.css('display', 'block');
        }
    },'json');
});

// window.onbeforeunload = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     registerCloseEvents();
//     return void(0);
// };