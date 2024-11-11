jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = (navigator.userAgent.match(/Opera|OPR\//) ? true : false);
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
jQuery.browser.safari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
jQuery.browser.ie11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
jQuery.browser.edge = window.navigator.userAgent.indexOf("Edge") > -1;

var scroller = jQuery.browser.webkit ? "body" : "html";

$.scrollbarWidth = function () {
    var a, b, c;
    if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
        b = a.children();
        c = b.innerWidth() - b.height(99).innerWidth();
        a.remove()
    }
    return c
};


/* scrollUp */
function scrollUp(block, targetBlock) {

    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $(scroller).stop().animate({scrollTop: target}, 800);
        return false;

        e.preventDefault();
    });

    $(window).scroll(function (event) {
        if ($(window).scrollTop() > 300) {
            $(block).addClass('active');
        } else {
            $(block).removeClass('active');
        }
    });
}

function oneHeightItems() {

    function oneHeight(block, options) {

        var timer = null;

        var params = {
            notebook: false,
            macBook: false,
            iPadHorizontal: false,
            iPadVertical: false,
            iPhoneHorizontal: false,
            iPhoneVertical: false,
            phoneHorizontal: false
        };

        $.extend(params, options);

        function calcOneHeight() {

            clearTimeout(timer);

            var height = 0;
            $(block).removeAttr('style');

            var calcHeight = false;
            var windowWidth = $(window).width();

            if (windowWidth > 1366) {
                calcHeight = true;
            } else if (windowWidth <= 1366 && windowWidth > 1280 && params.notebook == true) {
                calcHeight = true;
            } else if (windowWidth <= 1280 && windowWidth > 1024 && params.macBook == true) {
                calcHeight = true;
            } else if (windowWidth <= 1024 && windowWidth > 992 && params.ipadHorizontal == true) {
                calcHeight = true;
            } else if (windowWidth <= 992 && windowWidth > 767 && params.ipadVertical == true) {
                calcHeight = true;
            } else if (windowWidth <= 767 && windowWidth > 666 && params.iPhoneHorizontal == true) {
                calcHeight = true;
            } else if (windowWidth <= 666 && windowWidth > 479 && params.iPhoneVertical == true) {
                calcHeight = true;
            } else if (windowWidth <= 479 && params.phoneHorizontal == true) {
                calcHeight = true;
            }


            if (calcHeight == true) {
                timer = setTimeout(function () {

                    $(block).each(function (index) {
                        if ($(this).height() > height) {
                            height = $(this).height();
                        }
                    });

                    $(block).css('height', height);

                }, 0);
            }

        };

        calcOneHeight();

        $(window).load(function () {

            calcOneHeight();

        });

        $(window).resize(function () {

            calcOneHeight();

        });

    }

    // options:{notebook:false, macBook:false, iPadHorizontal:false, iPadVertical:false, iPhoneHorizontal:false, iPhoneVertical:false, phoneHorizontal:false}

    oneHeight('.oneHeight', {notebook: true, macBook: true});

}

/*scroll animation*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + ($(window).height() / 1.5);
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);


            }
        });
    }

    checkForAnimate();
}

/*GO TO href*/
function goTo() {
    $('.header-menu a').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top - 65;
        $(scroller).animate({scrollTop: target}, 500);
    });
}

// cut text script

function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};


/*header buter*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 701 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().fadeToggle();
            }
        });

        $(document).on('click', function (event) {
            if ($(window).width() < 701 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.fadeOut();
                    menuMobile.removeClass('active');
                }
            }
        });

        $(document).on('touchstart', function (event) {
            if ($(window).width() < 701 - $.scrollbarWidth() /*&& device.ios() */) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.fadeOut();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

function hoverSecondMenu() {
    if (device.desktop() && $('.tabs-block-mini').length) {
        /*
        $('.tabs-block-mini,.tabs-block .tabs-block-wrap ul li:nth-child(2)').hover(function () {
            $('.tabs-block:not(.popap) .tabs-block-wrap ul li:nth-child(2)').addClass('entered');
            $('.tabs-block-mini').stop().slideDown();
        }, function () {
            $('.tabs-block:not(.popap) .tabs-block-wrap ul li:nth-child(2)').removeClass('entered');
            $('.tabs-block-mini').stop().slideUp();
        }); */
        $('.tabs-block-mini ul,.tabs-block .tabs-block-wrap ul li').hover(function () {
            var id=$(this).data('menu-id');
            $(this).addClass('entered');
            if($('.tabs-block-mini ul[data-menu-id='+id+']').length)
              {
              $('.tabs-block-mini ul[data-menu-id='+id+']').show();
              $('.tabs-block-mini').stop().slideDown();
              }
            
        }, function () {
            $(this).removeClass('entered');
            $('.tabs-block-mini').stop().slideUp();
            $('.tabs-block-mini ul').hide();
        });

    }
    if ($('.tabs-block-mini').length && (device.mobile() || device.tablet() )) {
        $('.tabs-block-mini,.tabs-block .tabs-block-wrap ul li:nth-child(2)').on('click', function (event) {
            var li = $('.tabs-block:not(.popap) .tabs-block-wrap ul li:nth-child(2) a');
            if (!li.is('.active')) {
                event.preventDefault();
                li.addClass('active');
                $('.tabs-block-mini').stop().slideDown();
            }
            // else if (!$('.tabs-block-mini').is(event.target) && $('.tabs-block-mini').has(event.target).length === 0 && li.is('.active')){
            //     $('.tabs-block-mini').stop().slideUp();
            //      li.removeClass('active');
            // }

        });
    }
    $(window).resize(function () {
        if (!device.desktop()) {
            $('.tabs-block-mini').removeAttr('style');
            $('.tabs-block:not(.popap) .tabs-block-wrap ul li:nth-child(2)').removeClass('entered');
        }
    });
}


/* DOCUMENT READY  */
$(document).ready(function () {

    if (device.desktop() && !device.ios() && device.windows()) {
        $('html').addClass('bagfix_windows');
    }
    if (device.ios() && !device.desktop()) {
        $('html').addClass('bagfix_ios_device');
    }

    // mozilla desctop
    if (jQuery.browser.mozilla && device.desktop()) {
        $('html').addClass('bagfix_mozilla');
    }

    // iphone
    if (device.iphone()) {
        $('html').addClass('bagfix_iphone');
    }

    if (device.androidTablet()) {
        $('html').addClass('bagfix_androidTablet');
    }

    if (device.desktop()) {
        if (jQuery.browser.mozilla) {
            $('html').addClass('mozilla');
        } else if (jQuery.browser.webkit && !jQuery.browser.safari && !jQuery.browser.opera) {
            $('html').addClass('webkit');
        } else if (jQuery.browser.opera) {
            $('html').addClass('opera');
        } else if (jQuery.browser.safari) {
            $('html').addClass('safari');
        }

        if (jQuery.browser.ie11) {
            $('html').addClass('ie11');
        }

        if (jQuery.browser.edge) {
            $('html').addClass('edge');
        }
    }

    if (navigator.platform.indexOf('Mac') > -1) {
        $('html').addClass('Mac');
    }
    if (navigator.platform.indexOf('Win') > -1) {
        $('html').addClass('Win');
    }

    //check if suport touch


    hoverSecondMenu();
    headeButer($('.header .mobile-show'), $('.header-second-wrap ul'));

    scrollUp($('.scroll_up'), $('body'));

    //oneHeightItems();
    //goTo();

    document.onkeydown = function(e){
        var evtobj = window.event? event : e;
        if (evtobj.keyCode == 77 && evtobj.ctrlKey) {
            $("#manual").val(1);
        }
    };
});


$(window).resize(function () {

    if ($(window).width() > 701) {
        $('.header-second-wrap ul').removeAttr('style');
    }
});