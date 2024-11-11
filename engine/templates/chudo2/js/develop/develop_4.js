function topSlider() {
    $('.top-block-slider-wrap').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 701,
                settings: 'unslick'
            }
        ]
    });

    $(window).resize(function (event) {
        setTimeout(function () {
            if (!$('.top-block-slider-wrap').hasClass('slick-slider') && $(window).width() > 701) {
                $('.top-block-slider-wrap').slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    speed: 500,
                    prevArrow: '<button type="button" class="slick-prev"></button>',
                    nextArrow: '<button type="button" class="slick-next"></button>',
                    fade: true,
                    cssEase: 'linear',
                    autoplay: true,
                    responsive: [
                        {
                            breakpoint: 701,
                            settings: 'unslick'
                        }
                    ]
                });
            }
        }, 700)
    });
}

$(document).off('click', '[data-toggle]');
$(document).on('click', '[data-toggle]', function (e) {
    e.preventDefault();

    var $el = $(this);
    if ($el.attr('data-toggle') == 'add-fav') {
        $.get('/engine/ajax/add_to_favorites.php', {'id': $(this).data('id')}, function (data) {
            if (data.success) {
                //$('.popup_favoritesAdded').css('position', 'fixed').show();
                //$('.overflow').show();
                $el.closest('.item-star').addClass('active');
                $el.attr('data-toggle', 'remove-fav');
                $el.attr('title', '                                        ');
            } else {
                $('.popup_favoritesAddedFail').css('position', 'fixed').show();
                $('html').addClass('modal_open');
                $el.closest('.item-star').removeClass('active');
            }
        }, 'json')
    } else if ($el.attr('data-toggle') == 'remove-fav') {
        $.get('/engine/ajax/remove_favorites.php', {'id': $el.data('id')}, function (data) {
            $el.closest('.item-star').removeClass('active');
            $el.attr('data-toggle', 'add-fav');
            $el.attr('title', '                                      ');
        }, 'json')
    }
});
function timer() {
    var masItem = getTimeRemaining($('#timer-1').data('timer'));

    var timesDays = masItem.days * 24 * 60 * 60;
    var timesHours = masItem.hours * 60 * 60;
    var timesMinutes = masItem.minutes * 60;
    var timesSeconds = masItem.seconds;

    var allTime = timesDays + timesHours + timesMinutes + timesSeconds;
    $('#timer-1').timeTo({
        seconds: allTime,
        displayDays: 2,
        lang: 'ru',
        displayCaptions: true,
        fontFamily: 'Roboto',
        fontSize: 14
    });
}

function topBlockCounter() {

    var block = $('#top-block-counter');

    var start = parseFloat(block.attr('data-min'));
    var finish = parseFloat(block.attr('data-max'));
    var randomMin = parseFloat(block.attr('data-random-min'));
    var randomMax = parseFloat(block.attr('data-random-max'));
    var startString = '';

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function numberWithSpace(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    var timer = setInterval(function () {
        block.text(numberWithSpace(start));
        start = start + getRandomInt(randomMin, randomMax);
        startString = numberWithSpace(start);
        if (start > finish) {
            clearInterval(timer);
            block.text(finish);
        }
    }, 2000);
}

function socialMore() {
    var menuMobile = $('.center ul li.next-lvl');
    var toggleMenu = $('.center ul li.next-lvl ul');

    if ($(window).width() >= 1024 && !device.androidTablet()) {
        $('.center ul li.next-lvl').hover(function () {
            $(this).addClass('active');
            toggleMenu.stop().slideDown();
        }, function () {
            toggleMenu.slideUp();
            menuMobile.removeClass('active');
        });
    } else if ($(window).width() < 1024 || device.androidTablet()) {
        $(document).on('touchstart', function (event) {
            var menuItem = $('.center ul li.next-lvl')
            if (!menuItem.is(event.target) && menuItem.has(event.target).length === 0) {
                menuItem.removeClass('active');
                toggleMenu.stop().slideUp();
            } else {
                menuItem.toggleClass('active');
                toggleMenu.stop().slideToggle();
            }


        });
    }
}

function hoverItems() {
    if ($(window).width() <= 1024 || device.androidTablet()) {
        $('.items-wrap .items .item').click(function (event) {
            if ($(this).hasClass('active')) {

            } else {
                event.preventDefault();
                $('.items-wrap .items .item').removeClass('active');
                $(this).addClass('active');
            }

        });
    }
}

function tabsFunc() {
    $('.tabs-holder').not(':first').removeClass('active');
    $('.button-tabs li').click(function (event) {
        if ($(this).hasClass('active') || $(this).hasClass('disabled')) {
            event.preventDefault();
        } else {
            event.preventDefault();
            $('.button-tabs li').removeClass('active').eq($(this).index()).addClass('active');
            $('.tabs-holder').removeClass('active').eq($(this).index()).addClass('active');
        }
    });
    $('.button-tabs li').eq(0).addClass('active');
}

function removeMboxShadow() {
    setTimeout(function () {
        if ($('.mbox.has-shadow').outerHeight(true) <= 770 && !$('.mbox.has-shadow').hasClass('static-shadow')) {
            $('.mbox.has-shadow').removeClass('has-shadow');
        }
    }, 200);
}

function centerCursorForInput() {
    if ($('input.centered-input').length) {
        var input = $('input.centered-input');
        var text = input.data('placeholder');

        input.focusin(function () {
            $(this).attr("placeholder", "");
        });

        input.focusout(function () {
            var txtval = $(this).val();
            if (txtval == "") {
                $(this).attr("placeholder", text);
            }
        });
    }
}

function tournamentSlider() {
    if ($('.item-right-slider-wrap')) {
        $('.item-right-slider-wrap').slick({
            dots: false,
            arrows: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            responsive: [
                {
                    breakpoint: 1241,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 999,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
}

function vipItemHoverDevice() {

    var step;
    var timer = null;

    $(document).on('click', '.vip-status-steps .step .step-circle, .vip-status-steps .step .step-textting', function (event) {

        event.preventDefault();

        step = $(this).closest('.step');

        if (step.hasClass('active')) {

            step.removeClass('active').removeAttr('style');

        } else {

            $('.vip-status-steps .step').removeClass('active').removeAttr('style');
            var desc = step.find('.step-description').outerHeight(true);
            step.css('margin-bottom', desc + 20 + 'px');

            step.addClass('active');

            vipScroll($(this));

        }

    });

    function vipScroll(block) {

        if ($(window).width() > 699) {

            var scroller = jQuery.browser.webkit ? "body" : "html";

            var blockOfsset = block.offset().top;

            $(scroller).stop().animate({scrollTop: blockOfsset}, 300);

        }

    }

}

// 6-dev scrollbar
function scrollBar() {
    if ($(".tournaments-inner").length) {
        $(".tournaments-inner .cover-for-sroll").mCustomScrollbar({
            axis: "x",
            scrollEasing: "linear",
            scrollInertia: 200
        });
    }
    if ($(".cash-popup-history").length) {
        if ($(window).width() > 750) {
            $("#cash-popup-history").mCustomScrollbar("destroy");
            $("#cash-popup-history .table-main-container").mCustomScrollbar({
                axis: "y",
                scrollEasing: "linear",
                scrollInertia: 200
            });
        } else {
            $("#cash-popup-history .table-main-container").mCustomScrollbar("destroy");
            $("#cash-popup-history").mCustomScrollbar({
                axis: "yx",
                scrollEasing: "linear",
                scrollInertia: 200
            });
        }
        // $(".table-imitation .table-main-container").mCustomScrollbar({
        //      axis:"y"
        //  });
        // $(".table-imitation").mCustomScrollbar({
        //    axis:"x"
        // });
    }
}
//

$(document).ready(function () {

    vipItemHoverDevice();
    tournamentSlider();
    centerCursorForInput();
    tabsFunc();
    timer();
    topSlider();
    socialMore();
    hoverItems();
    topBlockCounter();
    scrollBar();

});

$(window).load(function () {
    removeMboxShadow();
});

$(window).resize(function () {
    scrollBar();

});

$(document).on("click",".vip_button",function() {
    var userId = $(this).attr('data-id');
    $.get('/engine/ajax/vip_bonus.php',{'user_id':userId},function(b){
        if(b.success == true){
            if(xhr!=''){
                xhr.abort();
            }
            xhr =$.post('/engine/ajax/activate_bonus.php', {'id': b.bonus.bonuses[0]}, function (data) {
                xhr = '';
                if (data.status && data.is_deposit) {
                    $('#reg_vip').hide();
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
        }
    },'json');
});