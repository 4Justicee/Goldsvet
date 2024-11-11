/*                             */
function validate(form, options) {
    var setings = {
        errorFunction: null,
        submitFunction: null,
        highlightFunction: null,
        unhighlightFunction: null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && ($form.attr('novalidate') === undefined || form === '#register-form' )) {
        $form.on('submit', function (e) {
            e.preventDefault();
        });

        var mainForm = $form.validate({
            errorClass: 'errorText',
            focusCleanup: true,
            focusInvalid: false,
            onfocusout: false,
            invalidHandler: function (event, validator) {
                if (typeof(setings.errorFunction) === 'function') {
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function (error, element) {
                if ($(element).data('limit') == true) {
                    error.appendTo(element.closest('.form_row'));
                }
                //error.appendTo( element.closest('.form_input'));
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('error');
                //$(element).closest('.form_row').addClass('error').removeClass('valid');
                if (typeof(setings.highlightFunction) === 'function') {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('error');
                // if($(element).closest('.form_row').is('.error')){
                //     $(element).closest('.form_row').removeClass('error').addClass('valid');
                // }
                if (typeof(setings.unhighlightFunction) === 'function') {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function (form) {
                if (typeof(setings.submitFunction) === 'function') {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        // calling by 32 times ( i mean that it's problem :( )
        $(document).on('focusout', '.register-form input', function () {
            if ($(this).valid()) {
                $(this).removeClass('error').addClass('valid');
            } else {
                $(this).removeClass('valid').addClass('error');
            }
        });
        // / calling by 32 times ( i mean that it's problem :( )

        $(document).on('click', '.close-btn-custom', function () {
            mainForm.resetForm();
        });

        $('[required]', $form).each(function () {
            $(this).rules("add", {
                required: true,
                messages: {
                    required: "                         "
                }
            });
        });

        if ($('[type="email"]', $form).length) {
            $('[type="email"]', $form).rules("add",
                {
                    messages: {
                        email: "                     email"
                    }
                });
        }
        ;

        if ($('.tel-mask[required]', $form).length) {
            $('.tel-mask[required]', $form).rules("add",
                {
                    messages: {
                        required: "                                                               ."
                    }
                });
        }
        ;

        $('[type="password"]', $form).each(function () {

            $(this).rules('add', {
                minlength: 3
            });

            if ($(this).is("#change-pass-password") == true) {
                $(this).rules("add", {
                    equalTo: "#change-pass-re-password"
                });
            }

        });

        $('[data-limit]', $form).each(function () {
            var min = $(this).data('min'),
                max = $(this).data('max'),
                minText = $(this).data('text-min'),
                maxText = $(this).data('text-max');
            $(this).rules("add", {
                min: min,
                max: max,
                messages: {
                    min: minText,
                    max: maxText,
                    required: " "
                }
            });
        });

    }
}

/*                                                          */
function validationCall(form) {

    var thisForm = $(form);

    var formSur = thisForm.serialize();

    $.ajax({
        url: thisForm.attr('action'),
        data: formSur,
        method: 'POST',
        success: function (data) {
            if (data.trim() == 'true') {
                thisForm.trigger("reset");
                //popNext("#call_success", "call-popup");
            }
            else {
                thisForm.trigger('reset');
            }

        }
    });
}

function popNext(popupId, popupWrap) {

    $.fancybox.open(popupId, {
        padding: 0,
        fitToView: false,
        wrapCSS: popupWrap,
        autoSize: true,
        afterClose: function () {
            $('form').trigger("reset");
            clearTimeout(timer);
        }
    });

    var timer = null;

    timer = setTimeout(function () {
        $('form').trigger("reset");
        $.fancybox.close(popupId);
    }, 2000);

}

/*                            */
function Maskedinput() {
    if ($('.tel-mask')) {
        $('.tel-mask').mask('99999999999');
    }
}

/*fansybox                */
function fancyboxForm() {
    $('.fancybox-form').fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        autoResize: true,
        wrapCSS: 'fancybox-form',
        'closeBtn': false,
        fitToView: true,
        padding: '0',
        onUpdate: function () {
            fancyLock();
        },
        beforeShow: function () {
            fancyLock();
        },
        afterClose: function () {
            $('form').trigger("reset");
            $('#call-popup input').removeClass('error');
            fancyUnLock();
        }
    });

    $(document).on('click', '.fancybox-form .close-btn', function (event) {
        event.preventDefault();
        $.fancybox.close();
    });
}

function fancyboxFormChangePass() {
    $('.fancybox-form-change-pass').fancybox({
        autoResize: true,
        wrapCSS: 'fancybox-form-change-password',
        'closeBtn': false,
        fitToView: true,
        padding: '0',
        onUpdate: function () {
            fancyLock();
        },
        beforeShow: function () {
            fancyLock();
        },
        afterClose: function () {
            $('form').trigger("reset");
            fancyUnLock();
        }
    });

    $(document).on('click', '.fancybox-form .close-btn', function (event) {
        event.preventDefault();
        $.fancybox.close();
    });
}

function fancyLock() {

    setTimeout(function () {

        var height = $(window).outerHeight();
        var popupHeight = parseInt($('.fancybox-inner>div').height()) + 100;

        if (popupHeight > height) {

            height = popupHeight;

        }

        //$('.global-wrapper').addClass('lock').css('height', height + 'px');
        //$('html').addClass('lock').css('height', height + 'px');
        //$('body').addClass('lock').css('height', height + 'px');

    }, 300);
}

function fancyUnLock() {
    $('.global-wrapper').removeClass('lock').removeAttr('style');
    $('html').removeClass('lock').removeAttr('style');
    $('body').removeClass('lock').removeAttr('style');
}

function loadMore() {
    if ($('.load_more').length) {
        var wraper = $('.load_more');
        var wraperAction = wraper.attr('data-action');
        var flag = true;
        var hasItems = 'true';


        var count = 2;

        function scrollLoadMore() {
            var wraperHeight = $('.load_more').outerHeight();
            var wraperMiddle = 0.65 * ($('.load_more').offset().top + wraperHeight);

            if ($(window).scrollTop() >= wraperMiddle && flag) {
                scrollLoadAjax();
            }

        }

        function scrollLoadAjax() {
            if (hasItems == 'true') {
                $.ajax({
                    url: ajaxShowMore,
                    data: {action: wraperAction, count: count},
                    method: 'GET',
                    beforeSend: function () {
                        flag = false;
                        $('.loade_more').addClass('loading');
                    },
                    success: function (data) {
                        if (typeof data != 'object') {
                            data = JSON.parse(data);
                        }
                        hasItems = data.hasdata;
                        setTimeout(function () {
                            wraper.append(data.markup);
                            flag = true;
                            $('.loade_more').removeClass('loading');
                            count++;
                        }, 500);

                    }
                }).fail(function (jqXHR) {
                    var responseCode = jqXHR.status;
                    console.log('responseCode', responseCode);
                });
            }
        }

        $(window).scroll(function () {
            scrollLoadMore();
        });
    }
}

function promoCodeCheck() {
    if ($('.profile-promocode').length) {
        var inp = $('.profile-promocode'),
            inpVal = inp.data('val'),
            flag = false,
            inpStr = false,
            text = '_';

        inp.mask(inpVal, {
            completed: function () {
                flag = true;
                inp.closest('.promo-inputs').addClass('active');
                inp.closest('.promo-inputs').find('button').removeAttr('disabled')
            }
        });

        inp.keyup(function (event) {
            if (!(inp.val().indexOf(text) + 1)) {
                inpStr = true;
            } else {
                inpStr = false;
            }
            if (flag && !inpStr) {
                inp.closest('.promo-inputs').removeClass('active');
                inp.closest('.promo-inputs').find('button').attr('disabled', true)
            }
        });
    }
}

function dataPiker() {
    if ($('#datepicker').length) {
        $.datepicker.regional['ru'] = {
            closeText: '              ',
            prevText: '',
            nextText: '',
            currentText: '              ',
            monthNames: ['            ', '              ', '        ', '            ', '      ', '        ',
                '        ', '            ', '                ', '              ', '            ', '              '],
            monthNamesShort: ['      ', '      ', '      ', '      ', '      ', '      ',
                '      ', '      ', '      ', '      ', '      ', '      '],
            dayNames: ['                      ', '                      ', '              ', '          ', '              ', '              ', '              '],
            dayNamesShort: ['      ', '      ', '      ', '      ', '      ', '      ', '      '],
            dayNamesMin: ['    ', '    ', '    ', '    ', '    ', '    ', '    '],
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);


        var myDate = new Date("January 1, 1980");
        $("#datepicker").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            changeYear: true,
            yearRange: '1950:' + (new Date).getFullYear(),
            defaultDate: myDate
        });


    }
}

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
                breakpoint: 768,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
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
}
/* /game-page navigation */

// cashbox popup scripts
function cashboxPopupScripts() {
    $('.fancybox-cashbox-form').fancybox({
        autoResize: true,
        wrapCSS: 'cashbox-form',
        'closeBtn': false,
        fitToView: true,
        padding: '0',
        onUpdate: function () {
            fancyLock();
            //deviceScrollFix();
        },
        beforeShow: function () {
            fancyLock();
            //deviceScrollFix();
        },
        afterClose: function () {
            fancyUnLock()
        }
    });

    function cashboxPopupTabs() {
        $('.has-tabs .cashbox-top-tabs li a').click(function (event) {
            if ($(this).parent().hasClass('active') || $(this).parent().hasClass('disabled')) {
                event.preventDefault();
            } else {
                event.preventDefault();
                $('.has-tabs .cashbox-top-tabs li').removeClass('active').eq($(this).parent().index()).addClass('active');
                $('.has-tabs .cashbox-middle-wrapper .cashbox-middle-item').removeClass('active').eq($(this).parent().index()).addClass('active');
            }
        });
    }

    function clickItem() {

        $(document).on('click', '.cashbox-middle-items .item-wrap form .item-img,.cashbox-middle-items .item-wrap form .item-description', function (event) {
            var item = $(this).closest('.item');
            $(this).closest('form').find('.error__info').html('').hide();
            if (item.hasClass('active') && !($(event.target).closest('.item-form').length > 0)) {
                $('.cashbox-middle-items .item').removeClass('active').removeAttr('style');
            } else if (!item.hasClass('active') && !($(event.target).closest('.item-form').length > 0)) {
                $('.cashbox-middle-items .item.active').removeClass('active').removeAttr('style');
                var form = item.find('.item-form');
                item.addClass('active');
                if ($(window).width() > 767) {
                    item.css('margin-bottom', (form.outerHeight(true) + 30) + 'px');
                }
            }

        });
    }

    function InputInLabelLogic() {
        $(document).on('click', '.cashbox-popup .item-form label', function (event) {
            $(this).parent().find('input[type=radio]').prop('checked', 'false')
            //$(this).parent().find('.input-value input').attr('disabled','true');
            $(this).find('input[type=radio]').prop('checked', 'true');
            // if ($(this).children('.input-value').length){
            //     $(this).find('.input-value input').removeAttr('disabled');
            // }
        });

        $(document).on('keyup', '.cashbox-popup label .input-value input', function (event) {
            var normValue = this.value.replace(/[^0-9\.]/g, '');
            $(this).val(normValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
            $(this).parent().parent().find('input[type="radio"]').val(normValue);
        });

        $(document).on('keyup', '.cashbox-popup .contact-form-row.item-conclusin .form_input input', function (event) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        });

        $(document).on('keyup', '.cashbox-popup .contact-form-row.item-conclusin .form_input input', function (event) {
            showErrorText($(this));
        });
        $(document).on('click', '.cashbox-popup .contact-form-row.item-conclusin .contact-submit', function (event) {
            showErrorText($(this));
        });

        function showErrorText(that) {
            if ($(window).width() > 767) {
                setTimeout(function () {
                    var error = that.closest('.contact-form-row.item-conclusin').find('.errorText');
                    var marBottom = that.closest('.item.active').css('margin-bottom');
                    if (error.text().length > 1) {
                        that.closest('.item.active').addClass('has_error').css('margin-bottom', (parseInt(marBottom) + 20) + 'px');
                    } else {
                        that.closest('.item.active').removeClass('has_error').css('margin-bottom', marBottom);
                    }

                }, 100)
            }
        }
    }

    function deviceScrollFix() {
        if (device.tablet() || device.mobile()) {
            console.log('tick');
            var pop = $('.fancybox-desktop .cashbox-popup');
            var buttonHeight = pop.find('.cashbox-top').height();
            var popPadding = ( parseInt(pop.find('.cashbox-popup-wrap').css('padding-top')) )
            var superHeight = pop.outerHeight() - (buttonHeight + popPadding);

            pop.find('.cashbox-middle-item').css('height', superHeight + 'px');

        }
    }

    function popupSlider() {
        if ($(window).width() < 768) {
            /*$('.cashbox-popup .cashbox-middle-items').slick({
                dots: true,
                arrows: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
                autoplay: false,
                adaptiveHeight: true
             });*/
        }
    }

    popupSlider();
    InputInLabelLogic();
    clickItem();
    cashboxPopupTabs();
}

// change pass form
function showHidePassword() {
    $(document).on('mousedown', '.show-hide-pass .show-pass-button', function (event) {
        event.preventDefault();
        $(this).siblings('input').attr('type', 'text');
    });
    $(document).on('mouseup mouseleave', '.show-hide-pass .show-pass-button', function (event) {
        $(this).siblings('input').attr('type', 'password');
    });

    if (device.mobile() || device.tablet()) {
        $(document).on('touchstart', '.show-hide-pass .show-pass-button', function (event) {
            event.preventDefault();
            $(this).siblings('input').attr('type', 'text');
        });
        $(document).on('touchend', '.show-hide-pass .show-pass-button', function (event) {
            $(this).siblings('input').attr('type', 'password');
        });
    }
}

/* registration-popups sripts */

function registrationPopupScripts() {

    $('.fancybox-registration').fancybox({
        padding: 0,
        fitToView: true,
        wrapCSS: 'registration-popup-wrap',
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
            $('.register-popup .register-step').removeClass('active');
            $('.register-popup .step-first').addClass('active');
            $('.register-form').trigger('reset');
            $('.register-form input').removeClass('valid');
            $('.register-form').removeClass('check-it');
            //$('.register-form .register-fields-wrap .form-row:last-child').addClass('disabled');
            $('.steps-nav .step-nav-item').removeClass('done current');
            $('.steps-nav .step-nav-item:first-child').addClass('current');
        }
    });

    $(document).on('click', '.first-step-item', function () {

        var index = $(this).index();

        $('.second-step-img .img').removeClass('active');
        $('.second-step-img .img').eq(index).addClass('active');

        $('.second-step-img input').prop('checked', 'false');
        $('.second-step-img .img').eq(index).find('input').prop('checked', 'true');

        $('.register-step').removeClass('active');
        $('.register-step.step-second').addClass('active');

        $('.steps-nav .step-nav-item').removeClass('current');
        $('.steps-nav .step-nav-item:first-child').addClass('done');
        $('.steps-nav .step-nav-item:last-child').addClass('current');

    });

    $(document).on('click', '.back-link a, .second-step-col-first .second-step-img .img', function (e) {
        console.log('s');
        e.preventDefault();

        $('.second-step-img .img').removeClass('active');

        $('.second-step-img input').prop('checked', 'false');

        $('.register-step').removeClass('active');
        $('.register-step.step-first').addClass('active');

        $('.steps-nav .step-nav-item').removeClass('current done');
        $('.steps-nav .step-nav-item:first-child').addClass('current');

    });

    function isRobot(form) {

        if (!$(form).is('.check-it')) {

            $(form).addClass('check-it');

            var formRowHeight = $(form).find('.visible').height();

            $(form).find('.form-row.disabled input').rules('add', {
                required: true
            });

            $(form).find('.form-row.disabled').css({'height': formRowHeight + 'px', 'position': 'relative'});
            setTimeout(function () {
                $(form).find('.form-row.disabled').removeClass('disabled').removeAttr('style');
            }, 300);


        } else {
            $(form).find('.register-fields-wrap .form-row:last-child input').attr('placeholder', '                            ');
        }

    }

    validate('#register-form', {submitFunction: ajaxSubmit});

}

/* /registration-popup sripts */

$(document).ready(function () {
    cashboxPopupScripts();
    fancyboxFormChangePass();
    showHidePassword();
    dataPiker();
    promoCodeCheck();
    loadMore();
    validate('#call-popup form', {submitFunction: validationCall});
    validate('.profile-page-wrap .profile-data #profile-data', {submitFunction: ajaxSubmit});
    validate('.profile-page-wrap .profile-data #profile-data-promocode', {submitFunction: ajaxSubmit});
    validate('.tabs-block form');
    validate('.change-pass-popup form', {submitFunction: ajaxSubmit});
    validate('.enter-popup-form', {submitFunction: ajaxSubmit});
    //validate('.restore-pass-popup-form', {submitFunction: ajaxSubmit});
    validate('#exchange-form', {submitFunction: ajaxSubmit});
    validate('#phone-verification', {submitFunction: ajaxSubmit});

    $('.cashbox-middle-items .item-form form').each(function (index, el) {
        validate(el);
    });
    registrationPopupScripts();

    Maskedinput();
    fancyboxForm();

    gamePageNavigation();

    $('.item-bottom-slider-wrapper').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1239,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
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

});

function ajaxSubmit(form) {
    var $type = $(form).attr('method');
    var $action = $(form).attr('action');
    var $data = $(form).serialize();
    var $answer = $(form).data('answer');
    var $form = $(form);

    $.ajax({
        type: $type,
        url: $action,
        data: $data,
        dataType: 'json',
        beforeSend: function () {
            if (!$form.valid()) {
                return false;
            }
            $form.find('.error__info').html('').hide();
            $form.closest('.modal,.popup').append(preloader);
        },
        success: function (data) {

            if (!data.success) {

                if ($form.find('.error__info').length == 0) {
                    $form.append('<div class="error__info"></div>');
                }

                $('[type="password"]').val('');
                if ($.type(data.error) == 'object') {
                    $.each(data.error, function ($key, $value) {
                        $form.find('.error__info').append($value + "<br/>");
                    });
                } else {
                    $form.find('.error__info').html(data.error);
                }
                $form.find('.error__info').show();
            } else {

                // if (data.uid != undefined && _ggcounter != undefined) {
                //     _ggcounter.push({
                //         event: "login",
                //         uid: data.uid,
                //         callback: function () {
                //         }
                //     });
                //     console.log('logined');
                //     console.log(data);
                //
                // }

                if (data.form != undefined) {
                    $('body').append(data.form);
                    $('#' + data.form_id).submit();
                } else {
                    if ($answer != undefined) {
                        $.fancybox.close();
                        $('.popup').hide();
                        $($answer).show();
                    } else {
                        window.location.reload();
                    }

                }
            }
        }
    });
}

function user_ajax(form, action) {

    data = $(form).serialize();
    $(form).closest('.modal,.popup').append(preloader);
    error_box = $(form).find('.error__info');
    error_box.html('').hide();

    $.post('/engine/ajax/user.php', data + '&action=' + action, function (res) {
        $('.loading').remove();
        if (res.success == true) {
            if (res.txt) {

            }
            //setTimeout (function(){ window.location.reload()}, 3000);
            window.location.reload();
        }
        else {
            if (res.error) {
                if ($(form).find('.error__info').length == 0) {
                    $(form).find('.form-row').eq(0).append('<div class="error__info"></div>');
                }
                $(form).find('.error__info').html(res.error).show();
            }
        }
    }, 'json');
    return false;
}

$(document).on('submit', '#search-form', function (e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        data: {
            'page': $("#page").val(),
            'group': $("#gamegroup").val(),
            'type': 'html',
            'q': $("#search-form input").val()
        },
        url: '/engine/ajax/game_list.php',
        success: function (data) {
            if ($("#search-form input").val() != '') {
                history.pushState({q: $("#search-form input").val()}, '', window.location.pathname + '?q=' + $("#search-form input").val());
            } else {
                history.pushState({}, '', window.location.pathname);
            }

            $('#games-wrapper').html(data);
        }
    })
});

$(document).on('keyup', '#search-form input', function (e) {
    e.preventDefault();
    if (xhr != '') {
        xhr.abort();
    }
    xhr = $.ajax({
        type: "GET",
        data: {
            'page': $("#page").val(),
            'group': $("#gamegroup").val(),
            'type': 'html',
            'q': $("#search-form input").val()
        },
        url: '/engine/ajax/game_list.php',
        success: function (data) {
            if ($("#search-form input").val() != '') {
                history.pushState({q: $("#search-form input").val()}, '', window.location.pathname + '?q=' + $("#search-form input").val());
            } else {
                history.pushState({}, '', window.location.pathname);
            }

            $('#games-wrapper').html(data);
        }
    });
});