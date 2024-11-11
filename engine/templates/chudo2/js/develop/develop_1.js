/* progress line */
var xhr = '';
var iCan = true;
function progressLine() {

    $('.progress-line').each(function () {
        var value = $(this).attr('data-value');
        $(this).find('.progress-line-value').width(value + '%');
    });

    $('.progress-value').each(function () {

        var value = $(this).attr('data-progress-value');
        $(this).text(value + '%');

    });

    $('.bonus-page-progess-values').each(function () {

        var value = $(this).attr('data-value');
        var valuesWrap = $(this);

        var listLength = $(this).find('li').length;
        var percValue = parseInt(100 / (listLength - 1));
        var point = 1;

        $(this).find('li').each(function () {

            var pointVal = point * percValue;
            if (value > pointVal) {
                valuesWrap.find('li').eq(point).find('.breacker-active').addClass('active');
                point++;
            } else {
                return false;
            }

        });

    });

};

/* /progress line */

/* bonus-page tabs */

function bonusPageTabs() {

    var timer = null;

    function levelingIconsFreeSpace() {

        var infoItemHeight = $('.leveling-icon.active .info-item').outerHeight() - 1;
        $('.leveling-icon').css({'padding-bottom': '0px'});
        $('.leveling-icon.active').css({'padding-bottom': infoItemHeight + 'px'});

    }

    $(document).on('click', '.leveling-icon:not(.active)', function () {

        var parent = $(this);

        $('.leveling-icon').removeClass('active');

        parent.addClass('active');
        clearTimeout(timer);
        timer = setTimeout(function () {
            levelingIconsFreeSpace();
        }, 0);

        scrollOnDesktop();

    });

    function scrollOnDesktop() {

        if ($(window).width() > 699) {

            var scroller = jQuery.browser.webkit ? "body" : "html";

            var blockOfsset = $('.leveling-icons').offset().top;

            $(scroller).stop().animate({scrollTop: blockOfsset}, 300);

        }

    }


    $(window).resize(function () {

        if ($('.leveling-icons').length) {

            clearTimeout(timer);
            timer = setTimeout(function () {
                levelingIconsFreeSpace();
            }, 100);

        }

    });

};

/* /bonus-page tabs */

/* bonus-page barter */

function bonusPageBarter() {

    var pattern = /^[0-9]\d*$/;
    var lastValue = 0;

    $(document).on('keydown', '.trade-form input', function () {

        if (pattern.test($(this).val())) {
            lastValue = $(this).val();
        }

    });

    $(document).on('keyup', '.trade-form input', function () {

        var thisValue = $(this).val();
        var barter = $(this).attr('data-barter');
        var barterTwo = $(this).attr('data-barter-two');
        var wrapper = $(this).parents('.form-input');

        if (!pattern.test(thisValue)) {
            $(this).val('');
            $('.trade-value .calced-value').text(0);
        }
        else {
            barterSumCalc(thisValue, barter, barterTwo, wrapper);
        }

    });

    function barterSumCalc(inputValue, barter, barterTwo, wrapper) {

        var calcValue = (inputValue / barter) * barterTwo;

        if (wrapper.is('.rubs-input')) {

            $('.bonuses-input input').val(calcValue);
            $('.rubs-input .input-imitation .calced-value').text(parseInt(inputValue).toFixed(2));

        } else if (wrapper.is('.bonuses-input')) {

            calcValue = calcValue.toFixed(2);

            $('.rubs-input input').val(calcValue);
            $('.rubs-input .input-imitation .calced-value').text(calcValue);
            $('.rubs-input input').val(calcValue);

        }

        var stringCalcValue = calcValue.toString();

        pretyValFix(stringCalcValue);

    };

    $(document).on('click', '.trade-value.input-imitation', function () {

        $(this).addClass('hide');
        $(this).parents('.form-input').find('input').val('').addClass('show').focus();

    });

    $(document).on('focusout', '.trade-form input', function () {

        $(this).removeClass('show');
        $(this).parents('.form-input').find('.hide').removeClass('hide');

        if ($(this).val() == '') {

            $('.rubs-input input').val('0');
            $('.rubs-input .trade-value .calced-value').text('0');
            $('.bonuses-input input').val('0');

        }

    });

    function pretyValFix(stringCalcValue) {

        if ($(window).width() < 700) {
            if (stringCalcValue.length > 6 && stringCalcValue.length < 11) {
                $('.trade-value p').css({'font-size': '14px', 'top': '2px'});
            } else if (stringCalcValue.length >= 11) {
                $('.trade-value p').css({'top': '-2px'});
            } else {
                $('.trade-value p').css({'font-size': '16px', 'top': '0px'});
            }
        } else {
            if (stringCalcValue.length > 11 && stringCalcValue.length < 17) {
                $('.trade-value p').css({'font-size': '14px', 'top': '2px'});
            } else if (stringCalcValue.length >= 17) {
                $('.trade-value p').css({'top': '-2px'});
            } else {
                $('.trade-value p').css({'font-size': '18px', 'top': '0px'});
            }
        }

    };

    $(window).resize(function () {

        pretyValFix($('.trade-value .calced-value').text());

    });

};

/* /bonus-page barter */

/* scale game page */

function scaleGamePage() {

    var widthMax = 1510;

    function scaleFunc() {

        if ($(window).width() < widthMax) {
            var percScale = $(window).width() / widthMax;

            $('.game-main').css({'transform': 'scale(' + percScale + ')'});

        } else {
            $('.game-main').removeAttr('style');
        }

    }

    setTimeout(function () {
        scaleFunc();
    }, 0);

    $(window).resize(function () {
        scaleFunc();
    });

}

/* /scale game page */

/* game-page navigation */

function gamePageNavigation() {

    $('.slider-wrap').slick({
        dots: false,
        slidesToShow: 8,
        slidesToScroll: 8,
        arrows: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 940,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $(document).on('click', '.game-page .tabs-block li a', function (e) {

        e.preventDefault();

        var parent = $(this).parents('li');
        var index = parent.index();

        if (parent.is('.active')) {
            parent.removeClass('active');
            $('.game-center-slider-item').removeClass('active');
        } else {
            $('.game-page .tabs-block li').removeClass('active');
            parent.addClass('active');
            $('.game-center-slider-item').removeClass('active');
            $('.game-center-slider-item').eq(index).addClass('active');
        }

    });

};

/* /game-page navigation */

/* game-page unlog */

function gamePageHoverLinks() {

    if ($('html').is('.tablet') || $('html').is('.mobile')) {

        var timer = null;

        $('.game-page-unlog .game-main .game-content .game-right .middle-items .middle-items-wrap .items .item').hover(
            function () {
                clearTimeout(timer);
                var item = $(this);
                timer = setTimeout(function () {
                    item.addClass('device-active');
                }, 300);
            },
            function () {
                $(this).removeClass('device-active');
            }
        );

    }

};

/* /game-page unloog */

/* bonus-popup */
window.getTimeRemaining = function (endtime) {
    var today = (new Date()).toUTCString();
    endtime = (new Date(endtime * 1000)).toUTCString();
    var t = Date.parse(endtime) - Date.parse(today);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
function bonusPopupTimer() {

    $('.bonus-popup-timer').each(function () {

        var timer = $(this).data('timer');

        if (timer != '') {
            var masItem = getTimeRemaining(timer);
            var timesDays = masItem.days * 24 * 60 * 60;
            var timesHours = masItem.hours * 60 * 60;
            var timesMinutes = masItem.minutes * 60;
            var timesSeconds = masItem.seconds;

            var allTime = timesDays + timesHours + timesMinutes + timesSeconds;

            $(this).timeTo({
                seconds: allTime,
                displayDays: 2,
                lang: 'ru',
                displayCaptions: true,
                fontFamily: 'Roboto',
                fontSize: 30
            });
        }

    });

    var fancyTimer = null;

    $('.fancybox-bonus').fancybox({
        padding: 0,
        fitToView: true,
        wrapCSS: 'bonus-popup-wrap',
        autoSize: true,
        closeBtn: false,
        onUpdate: function () {
            fancyLock();
            clearTimeout(fancyTimer);
            setTimeout(function () {
                calcHeight();
            }, 300);
        },
        afterShow: function () {

            clearTimeout(fancyTimer);
            setTimeout(function () {
                calcHeight();
            }, 300);

        },
        beforeShow: function () {
            fancyLock();
        },
        afterClose: function () {
            fancyUnLock();
        }
    });

    function calcHeight() {

        var innerHeight = $('.fancybox-inner').height();
        var bonusTopHeight = $('.bonus-popup-top').outerHeight();
        var mainHeight = parseInt(innerHeight) - parseInt(bonusTopHeight);
        $('.bonus-popup-items').outerHeight(mainHeight);

    };

}

/* /bonus-popup */

/* enter-popup */

function enterPopup() {

    $('.fancybox-enter').fancybox({
        padding: 0,
        fitToView: false,
        wrapCSS: 'enter-popup-wrap',
        autoSize: true,
        closeBtn: false,
        onUpdate: function () {
            fancyLock();
        },
        beforeShow: function () {
            fancyLock();
        },
        afterClose: function () {
            fancyUnLock();
        }
    });

};

/* /enter-popup */

/* popup-soci */

function popupSoci() {

    if ($(window).width() >= 1024 && !device.androidTablet()) {

        $('.popup-soci .next-lvl').hover(
            function () {
                $(this).find('>span').addClass('active');
                $(this).find('ul').stop().slideDown(300);
            },
            function () {
                $(this).find('>span').removeClass('active');
                $(this).find('ul').stop().slideUp(300);
            }
        );

    } else if ($(window).width() < 1024 || device.androidTablet()) {

        $(document).on('touchstart', function (event) {

            var container = $('.popup-soci ul li.next-lvl');

            if (!container.is(event.target) && container.has(event.target).length === 0) {
                container.find('>span').removeClass('active');
                container.find('ul').stop().slideUp(300);
            } else {
                event.preventDefault();
                container.find('>span').addClass('active');
                container.find('ul').stop().slideDown(300);
            }

        });

    }
}

/* /popup-soci */

/* close-popup button */

function closePopupButton() {

    $(document).on('click', '.close-btn-custom', function () {
        $.fancybox.close();
    });

};

/* /close-popup button */

$(document).ready(function () {

    progressLine();

    bonusPageTabs();
    bonusPageBarter();

    bonusPopupTimer();
    enterPopup();

    closePopupButton();

    popupSoci();
    gamePageHoverLinks();

    //scaleGamePage();

});
var preloader = '<div id="loader" class="middle-items-button"><div class="loade_more loading"><img src="engine/templates/chudoslot/images/loader_more.gif" alt=""></div></div>';

$(document).on('submit', 'form.payment-form', function (e) {
    e.preventDefault();
    var $type = $(this).attr('method');
    var $action = $(this).attr('action');
    var $data = $(this).serialize();
    var $answer = $(this).data('answer');
    var $form = $(this);
    $.ajax({
        type: $type,
        url: $action,
        data: $data,
        dataType: 'json',
        beforeSend: function () {
            $form.find('.error__info').remove();
            $form.closest('.modal,.popup').append(preloader);
        },
        success: function (data) {
            $('.loading').remove();
            if (data.result != 'ok') {
                $form.find('.item-form').append('<div class="error__info"></div>');
                if ($.type(data.message) == 'object') {
                    $form.find('.error__info').remove();
                    $.each(data.message, function ($key, $value) {
                        $form.find('.error__info').append($value + "<br/>");
                    });
                } else {
                    $form.find('.error__info').html(data.message);
                }
            } else {

                if (data.form != undefined) {
                    $('body').append(data.form);
                    $('#' + data.form_id).submit();
                } else {
                    if ($answer != undefined) {
                        $.fancybox.close();
                        $($answer).show();
                    }
                }
            }
        }
    })
});

$(".activate-bonus").on('click', function (e) {
    e.preventDefault();
    if (xhr != '') {
        xhr.abort();
    }
    fancyUnLock();
    xhr = $.post('/engine/ajax/activate_bonus.php', {'id': $(this).data('id')}, function (data) {
        if (data.status && data.is_deposit) {
            $.fancybox.open("#cashbox_not_resources");
            fancyLock();
            $('#bonus-img').attr('src', data.image);
            $('#bonus-deposit-sum').html(data.deposit);
            $('.deposit-campaign-id').val(data.campaign_id);
            $('#deposit-for-bonus-modal .aside__promo-table .table__body').html('');
            $.each(data.winners, function ($key, $item) {
                var $row = "<tr class='table__row'><td class='table__cell'>" + ($key + 1) + "</td><td class='table__cell'>" + $item.login + "</td><td class='table__cell'>" + Math.round($item.win) + "</td></tr>";
                $('#deposit-for-bonus-modal .aside__promo-table .table__body').append($row);
            });
        } else {
            if (!data.status) {
                $.fancybox.close();
                $('#have_active_bonus .popup__content .popup__title').html(data.error);
                $('#have_active_bonus').show();
            } else {
                window.location.reload();
            }
        }
        $(window).scrollTop(0);
    }, 'json')
});

$(document).on('click', '.js-close-popup', function () {
    $('.popup').hide();
});

$(document).on('click', '.disabled', function (e) {
    e.preventDefault();
    if ($(this).data('target') != undefined) {
        $('.modal,.popup').hide();
        $($(this).data('target')).show();
    }
    $(this).removeClass('disabled');
});
var calculateSize = function ($el) {

    var width = $el.width();
    var height = $el.height();
    var maxWidth = $el.parent().parent().width();
    var maxHeight = $el.parent().parent().height();
    var proportions = 3 / 4;

    if (maxHeight / maxWidth < proportions) {
        height = maxHeight;
        width = height / proportions;
    } else {
        width = maxWidth;
        height = width * proportions;
    }

    $el.css({
        width: width + 'px',
        height: height + 'px',
        display: 'block'
    })
    return {
        width: width,
        height: height
    };
}
setTimeout(function () {
    calculateSize($('.gameplay__canvas_inner object'));
}, 100);

function come(elem) {
    var docViewTop = $(window).scrollTop(),
        docViewBottom = docViewTop + $(window).height() * 0.8,
        elemTop = $(elem).offset().top,
        elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemBottom >= docViewTop));
}

$(window).scroll(function () {

    if ($('#game-list').length > 0 && come($('#games-wrapper')) && iCan) {
        $('#loader').remove();
        $('#game-list .items-wrap').append(preloader);
        iCan = false;

        $.ajax({
            type: "GET",
            data: {
                'page': parseInt($("#page").val()) + 1,
                'type': 'html',
                'group': $("#gamegroup").val(),
                'q': $('#queryString').val()
            },

            url: '/engine/ajax/game_list.php',
            success: function (data) {
                $('#loader').remove();
                if (data) {
                    $('#games-wrapper').append(data);
                    $("#page").val(parseInt($("#page").val()) + 1);
                    setTimeout(function () {
                        iCan = true;
                    }, 200);
                } else {
                    iCan = false;
                }
            }
        })
    }
});

$(document).on('click', '[data-verification]', function (e) {
    e.preventDefault();
    var $type = $(this).data('verification');
    if (xhr != '') {
        return false;
    }
    xhr = $.ajax({
        type: "POST",
        data: {'val': $("#profileform-" + $type).val(), 'type': $type},
        url: '/engine/ajax/activate.php',
        dataType: 'json',
        beforeSend: function () {
            $('.help-block').html('');
        },
        success: function (data) {
            xhr = '';
            $('.loading').remove();
            if (!data.success) {
                $("#profileform-" + $type).next('.help-block').html(data.error);
                $("#profileform-" + $type).next('.help-block').show();
            } else {
                if ($type == 'phone') {
                    var timeinterval = setInterval(function () {
                        var $time = getTimeRemaining(data.time);
                        if ($time.seconds <= 0 && $time.minutes <= 0) {
                            $('.clock-timer__counter').text('0:00');
                            clearInterval(timeinterval);
                        } else {
                            $('.clock-timer__counter').text($time.minutes + ':' + $time.seconds);
                        }
                    }, 100);
                    $('.popup_phoneVerification').show();
                }
                if ($type == 'email') {
                    $('.popup_emailVerification').show();
                }
            }
        }
    })
});

$(document).on('click', 'a[data-type="ajax"]', function (e) {
    e.preventDefault();
    var $success = $(this).data('success');
    var $fail = $(this).data('fail');
    $.post($(this).attr('href'), {}, function (data) {
        if (data.success) {
            $($success).show();
        } else {
            $($fail).show();
        }
    }, 'json')
});

function outpay(form) {
    var data = $(form).serialize();
    $(form).find('.error__info').remove();
    $.post('/engine/ajax/pay.php', data + '&paysys=out', function (res) {
        if (res.success == true) {
            if (res.txt)
                $(form).children('.dialog_success').html(res.txt).show();

            setTimeout(function () {
                window.location.reload()
            }, 3000);
        }
        else {
            $(form).find('.item-form').append('<div class="error__info"></div>');
            $(form).find('.error__info').html(res.error);
        }
    }, 'json');

    return false;
}