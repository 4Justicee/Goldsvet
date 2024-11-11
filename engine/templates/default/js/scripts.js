var preloader="<div class='loading'><div class='loader'></div></div>";
window.vulcanNamespace = {};
var xhr='';

$(function(){
  // piwik test
    var array = $('[data-piwik-event]');
    array.each(function(index){
        var item =  $(this)
            ,eventName = item.attr('data-piwik-event').split(',');

        item.bind('click', function(){
            _paq.push(['trackEvent', eventName[0], eventName[1], eventName[2]]);
            console.log("Group: " + eventName[0] + ", " + "Event Name: " + eventName[2] + ", " + "Event Action: " + eventName[1]);
        });
    });
//piwik

  $('.levels-table__item').on('touchend click', function(e) {
    $('.levels-table__item').removeClass('levels-table__item_active');
    $(this).addClass('levels-table__item_active');
    $('.levels-table__arrow').removeClass('levels-table__arrow_active');
    $(this).find('.levels-table__arrow').addClass('levels-table__arrow_active');
  });

  $(".js-close-popup, [data-toggle='tab']").on('click', function(e) {
    $('.payment__tooltip').removeClass("payment__tooltip_open");
    //$(this).next('.payment__tooltip').toggleClass("payment__tooltip_open");
  });

   $(".payitem").on('click', function(e) {
    var $index=$(this).index(),
        content = $('.payment__tooltip_open .pay-tooltip');

    $('.pay-tooltip__summ input[type="radio"]').on('click',function( i ) {
      var volume_value = $(this).val();
      $(this).parent().parent().find('.l_num').val(volume_value);
      $(this).parent().parent().find('.input_summ_val').val(volume_value).focus();
    });

    $('.js-input__inner').val('');
    $('.pay-tooltip__note').hide();
    $('.l_num').click().val('500');
    $('.input_summ_val').val('500');
    $('.input_summ_val').on('change, input', function () {
      var volume_value = $(this).val();
      $(this).parent().parent().find('.l_num').val(volume_value).click();
    });

    $('.payment__tooltip').removeClass("payment__tooltip_open");
    $(this).parent().parent().next('.payment__tooltip').toggleClass("payment__tooltip_open");
    
     var paysys=$(this).data("paysys");
    if(paysys)
      $(this).parents(".payment-form").attr('action','/engine/dir/pay/'+paysys+'/'+paysys+'.php');

    if($(this).find('input').val() === "qiwi_rub") {
      $('.pay-tooltip__phone').show();
      $('.pay-tooltip').addClass('pay-tooltip_withphone');
      //$('.pay-tooltip__phone_inner').mask("99999999999");
      $('.pay-tooltip__phone_inner').attr('required', true);
    } 
    else {
      $('.pay-tooltip__summ').show();
      $('.pay-tooltip__phone').hide();
      $('.pay-tooltip').removeClass('pay-tooltip_withphone');
      $('.pay-tooltip__phone_inner').attr('required', false);
    }

    if ($(this).find('input').val() === "qiwi_rub" && $(this).find('input').hasClass('payout')) {
      $('.pay-tooltip__number').removeClass('pay-tooltip__number_withr');
      $('.pay-tooltip__number').addClass('pay-tooltip__number_withplus');
      $('.pay-tooltip__number_inner').removeClass('pay-tooltip__number_inner-noprefix');
      $('.pay-tooltip__number_inner')
          .attr({
            required: true,
            name: "account",
            type: "tel",
            placeholder: "70000000000",
            maxlength: "14"
          });
    } else if ($(this).find('input').val() === "webmoney") {
      $('.pay-tooltip__number').removeClass('pay-tooltip__number_withplus');
      $('.pay-tooltip__number').addClass('pay-tooltip__number_withr');
      $('.pay-tooltip__number_inner').removeClass('pay-tooltip__number_inner-noprefix');
      $('.pay-tooltip__number_inner')
          .attr({
            required: true,
            name: "account",
            type: "text",
            placeholder: "000000000000",
            maxlength: "20"
          });
    } else if ($(this).find('input').val() === "pin") {
     $('.pay-tooltip__summ').hide();
      $('.pay-tooltip__pin_inner')
          .attr({
            required: true,
            name: "pin",
            type: "text",
            placeholder: "0000000000",
            maxlength: "10"
          });
      $('.pay-tooltip__pin').show();    
    } else {
      $('.pay-tooltip__summ').show();
      $('.pay-tooltip__number').removeClass('pay-tooltip__number_withplus');
      $('.pay-tooltip__number').removeClass('pay-tooltip__number_withr');
      $('.pay-tooltip__number_inner').addClass('pay-tooltip__number_inner-noprefix');
      $('.pay-tooltip__number_inner')
          .attr({
            required: true,
            name: "account",
            type: "text",
            placeholder: "0000000000000",
            maxlength: "20"
          });
    }



    $(this).find('.l_num').click();



    $('.js-input__inner').on("keyup, input", function(e) {
      //if (e.keyCode != 37) {
        if (this.value.match(/[^0-9]/g)) {
          this.value = this.value.replace(/[^0-9]/g, '');
        }
     // }
    });


    if($index==0){
      content.addClass('left').removeClass('right');
    } else if($index==1){
      content.removeClass('left').removeClass('right');
    } else if($index==2){
      content.removeClass('left').addClass('right');

    }


  });


  $('.slider_small').slick({
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    touchMove: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: false
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: false,
          swipe: true,
          draggable: true
        }
      }
    ]
  });

  $('.slider_info').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1500
  });

  $('.slider_tournament').slick({
    infinite: true,
    autoplay: false,
    autoplaySpeed: 1500,
    slidesToShow: 9,
    slidesToScroll: 1,
    dots: false,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: false,
          swipe: true,
          draggable: true
        }
      }
    ]
  });


  $('.slider_hero').slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          dots: false
        }
      }
    ]
  });

  $('.slider_hero').show();

  $('.slider_gameplay').not('.slick-initialized').slick({
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    dots: false
  });

  $('.winsline').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: true,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          pauseOnFocus: true
        }
      },
      {
        breakpoint: 999,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          pauseOnFocus: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          pauseOnFocus: true
        }
      }
    ]
  });

  $('.winsline').show();


  (function($) {
    if ($(window).width() < 768) {
      $('.leaderboard__slider').slick({
        dots: true,
        infinite: false,
        arrows: false
      });
      $('.lottery-details__tickets').slick({
        dots: true,
        infinite: false,
        arrows: false
      });
    }
  })(jQuery);

  (function($) {
    $('body').on('show', '.popup_tabs', function(){
      if ($(window).width() < 768) {
        $('.levels-table__table').ready(function(){
          $('.levels-table__table').not('.slick-initialized').slick({
            dots: true,
            infinite: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
          });
          $('.levels-table__table').on('afterChange', function(event, slick, currentSlide, nextSlide){
            var $dataId = $(slick.$slides[currentSlide]).data('target');
            $(this).parent().find('.tab__content > div').removeClass('active');
            $($dataId).addClass('active');
          });
        })
      }
    });
  })(jQuery);

  // Tabs script

  //  needs adding .not('.slick-initialized') to work properly - in that case it is not initialized on already "slicked" slider

  $('.slider_small').not('.slick-initialized').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 9,
    slidesToScroll: 1,
    dots: false
  });



  // Gameplay scripts
  $('.show__nav').on('click', function () {
    $('.gameplay-nav-small').slideToggle();
  });
  $('.gameplay-nav__item').on('click', function() {

    $('.gameplay-nav').find('li').not($(this)).removeClass('gameplay-nav__item_active');
    $('.gameplay__slider').not($($(this).data('target'))).removeClass('gameplay__slider_open').css('display', 'none');

    if ($(this).hasClass('gameplay-nav__item_active')) {
      $(this).removeClass('gameplay-nav__item_active');
      $($(this).data('target')).removeClass('gameplay__slider_open').css('display', 'none');
    } else {
      $(this).addClass('gameplay-nav__item_active');
      $($(this).data('target')).addClass('gameplay__slider_open').css('display', 'block');
    }
  });



  $('.socials__item').on('click', function(){
    $(this).toggleClass('socials__item_active');
  });

  // Perfect scrollbar initialization

  (function($) {
    if ($(window).width() > 700) {
      $('.summary__content').not('.ps-container').perfectScrollbar({
        theme: 'details',
        suppressScrollX: true
        // maxScrollbarLength: 213
      });
      $('.popup__gallery').not('.ps-container').perfectScrollbar({
        theme: 'tabs',
        suppressScrollX: true
        // maxScrollbarLength: 213
      });
      $('.payment').not('.ps-container').perfectScrollbar({
        theme: 'tabs',
        suppressScrollX: true,
        scrollXMarginOffset: 5
        // maxScrollbarLength: 213
      });

      $('.history').not('.ps-container').perfectScrollbar({
        theme: 'tabs',
        suppressScrollX: true
        // maxScrollbarLength: 213
      });

      $('.popup__history').not('.ps-container').perfectScrollbar({
        theme: 'tabs',
        suppressScrollX: true
        // maxScrollbarLength: 213
      });
      $('.table-panel').not('.ps-container').perfectScrollbar({
        theme: 'details',
        suppressScrollX: true
        // maxScrollbarLength: 213
      });
    }

  })(jQuery);


  (function($) {
    if ($(window).width() < 768) {
      $('.main-nav').not('.ps-container').perfectScrollbar({
        theme: 'hidden',
        suppressScrollY: true,
        scrollXMarginOffset: 5
        // maxScrollbarLength: 213
      });
    }
  })(jQuery);

  (function($) {
    $('.header__wrap_scroll').not('.ps-container').perfectScrollbar({
      theme: 'hidden',
      suppressScrollY: true,
      scrollXMarginOffset: 5
      // maxScrollbarLength: 213
    });
  })(jQuery);


  (function($) {
    if ($(window).width() > 768) {
      $('.modal_open .popup').not('.ps-container').not('.popup_tabs').perfectScrollbar({
        theme: 'hidden'
      });
    }
  })(jQuery);

  // Chosen Select styling

  $(".filter__select").chosen({disable_search: true});

  // Date picker - Zebra_Datepicker


  $('input.datepicker_start').Zebra_DatePicker({
    offset: [-150, 40],
    default_position: 'below',
    show_icon: false,
    direction: true,
    format: 'm/d/Y',
    show_clear_date: false,
    show_select_today: false,
    pair: $('input.datepicker_end')
  });

  $('input.datepicker_end').Zebra_DatePicker({
    offset: [-150, 40],
    default_position: 'below',
    show_icon: false,
    format: 'm/d/Y',
    show_clear_date: false,
    show_select_today: false,
    direction: 1
  });

  $('input.datepicker_birth').Zebra_DatePicker({
    offset: [-280, 40],
    days: ['    .', '    .', '    .', '    .', '    .', '    .', '    .'],
    months: ['            ', '              ', '        ', '            ', '      ', '        ', '        ', '            ', '                ', '              ', '            ', '              '],
    default_position: 'below',
    show_icon: false,
    format: 'Y-m-d',
    show_clear_date: false,
    show_select_today: false
  });

  // Lottery range input

  $('input.range__input').ionRangeSlider({
    type: "double",
    grid: true,
    grid_snap: true,
    min: 1,
    max: 7,
    from: 1,
    step: 1,
    to: 2,
    from_fixed: true,
    prefix: "x",
    hide_from_to: true,
    hide_min_max: true,
    onStart: function (data) {
      $('.irs-grid-text').each( function( index, element ){
        $(this).removeClass('irs-grid-text_active');
        if (index === data.to - 1) {
          $(this).addClass('irs-grid-text_active');
        }
      });
    },
    onChange: function (data) {
      var toValue = data.to;
      //console.log(toValue);
      $('.irs-grid-text').each( function( index, element ){
        $(this).removeClass('irs-grid-text_active');
        if (index === data.to - 1) {
          $(this).addClass('irs-grid-text_active');
        }
      });
    }
  });


  // Nav scripts

  var heroHeight = $('.hero__wrap').outerHeight();
  var subnavHeight = $('.main-nav__subnav').outerHeight();


  $(".main-nav__item_subnav").hover(
      function() {
        if(!$(this).hasClass('main-nav__item_active')) {
          if (!$(".hero__nav").hasClass("hero__nav_sticky")) {
            if ($('.main-nav').outerHeight() <= 50) {
              $('.hero__wrap').animate({height: (subnavHeight + heroHeight) + "px"}, {queue: false, duration: 100});
              $('.main-nav').attr('style', 'overflow: initial !important');
            } else {
              $('.hero__wrap').animate({height: (subnavHeight + heroHeight) + "px"}, {queue: false, duration: 100});
            }
          }
        }
      }, function() {
        if(!$(this).hasClass('main-nav__item_active')) {
          if ($('.main-nav').outerHeight() <= 50) {
            $('.hero__wrap').animate( { height: heroHeight + "px" }, { queue:false, duration:100 });
            $('.main-nav').attr('style', 'overflow: hidden !important');
          } else {
            $('.hero__wrap').animate( { height: heroHeight + "px" }, { queue:false, duration:100 });
          }
        }
      }
  );

  (function($) {
    $('.main-nav').attr('style', 'overflow: auto !important');
    if ($(".main-nav__item_subnav").hasClass('main-nav__item_active')) {
      var heroHeight = $('.hero__wrap').outerHeight();
      var heroSubnav = $('.main-nav__subnav').outerHeight();

      $('.hero__wrap').css('height', heroHeight + heroSubnav);
      $('.main-nav').attr('style', 'overflow: initial !important');

    }
  })(jQuery);

  // top nav sticky script

  $(function(){
    var alertPanel = $(".alert-panel").height();
    var header = $(".header").height();
    var hero = $(".hero").height();
    var heightSum;
    if (alertPanel !== undefined) {
      heightSum = alertPanel + header + hero;
    } else {
      heightSum = header + hero;
    }
    var window_width = $(window).width();
    if ($('.main-nav li').width() >= window_width) {
      $('.hero__nav').addClass('hero__nav_scroll');
    }
    $(window).scroll(function() {
      var scroll = getCurrentScroll();

      if ( window_width > 768) {
        if ( scroll >= heightSum - 78) {
          $('.hero__nav').addClass('hero__nav_sticky');
        }
        else {
          $('.hero__nav').removeClass('hero__nav_sticky');
        }

        if ( scroll >= 1 && scroll < heightSum - (78+43) && $('.alert-panel').is(':visible')) {
          $('header').css({'margin-top':alertPanel});
          $('.alert-panel').addClass('hero__nav_sticky');
        }
        else {
          $('header').css({'margin-top':0});
          $('.alert-panel').removeClass('hero__nav_sticky');
        }
      }


    });
    function getCurrentScroll() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
  });
  $(function () {
    if (window.location.hash != undefined) {
      if (window.location.hash == '#registration') {
        $('#registration-modal').show();
        var link = window.location.href;
        link = link.replace(window.location.hash, '');
        history.pushState({}, '', link);
      }
      if (window.location.hash == '#login') {
        $('#login-modal').show();
        var link = window.location.href;
        link = link.replace(window.location.hash, '');
        history.pushState({}, '', link);
      }
    }
  });

  $(document).on('click','[data-toggle="modal"]',function(e){
    e.preventDefault();
    if ($(this).data('tab') == '#cashier'){
      $(window).scrollTop(0);
    }

    $('.modal,.popup').hide();
    var $id=$(this).attr('href');
    if($id==undefined){
      $id=$(this).data('target');
    }

    $($id).show();

    $('html').addClass('modal_open');

    if ($(window).width() < 768) {
      $('.modal_open .popup').not('.ps-container').not('.popup_tabs').perfectScrollbar({
        theme: 'hidden'
      });
    }

    if($(this).data('tab')!=undefined){
      $($(this).data('tab')).parent().find('>div').removeClass('active');
      $($(this).data('tab')).addClass('active');
      $('.tab__item[href="'+$(this).data('tab')+'"]').parent().find('.tab__item').removeClass('tab__item_active');
      $('.tab__item[href="'+$(this).data('tab')+'"]').addClass('tab__item_active');



    }
  });
  window.getTimeRemaining = function(endtime) {
    var today=(new Date()).toUTCString();
    endtime = (new Date(endtime*1000)).toUTCString();
    var t = Date.parse(endtime) - Date.parse(today);
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  function initializeClock(id, endtime){
    var clock = document.getElementById(id);
    var timeinterval = setInterval(function(){
      var t = getTimeRemaining(endtime);
      if(t.days<0){t.days=0}
      if(t.hours<0){t.hours=0}
      if(t.minutes<0){t.minutes=0}
      if(t.seconds<0){t.seconds=0}

      if(t.hours<10 && t.hours>=0){t.hours='0'+t.hours}
      if(t.minutes<10 && t.minutes>=0){t.minutes='0'+t.minutes}
      if(t.seconds<10 && t.seconds>=0){t.seconds='0'+t.seconds}

      clock.innerHTML = ' <div class="timer__cell">' + t.days + '</div> ' +
          '<div class="timer__cell timer__cell_empty"></div> ' +
          '<div class="timer__cell">'+ t.hours + '</div>' +
          ' <div class="timer__cell">:</div> ' +
          '<div class="timer__cell">' + t.minutes + '</div> ' +
          '<div class="timer__cell">:</div> ' +
          '<div class="timer__cell">' + t.seconds + '</div> ';
      if(t.total<=0){
        clearInterval(timeinterval);
      }
    },1000);
  }
  function initializeJackpot(id, jackpot){
    
    var jack = document.getElementById(id);
    var numbers = (jackpot+ '').split('',-4);
    var $j=numbers.reverse();
    var timeinterval = setInterval(function(){
      $j[0]=parseInt($j[0])+randomInteger(0,5);
      if($j[0]>=10){
        $j[0]=parseInt($j[0])-10;
        $j[1]=parseInt($j[1])+1;
        if($j[1]>=10){
          $j[1]=10-$j[1];
          $j[2]=parseInt($j[2])+1;
          if($j[2]>=10){
            $j[2]=10-$j[2];
            $j[3]=parseInt($j[3])+1
          }
        }
      }
      if($j[0]<0){
        $j[0]=0;
        $j[1]=parseInt($j[1])-1;
        if($j[1]<0){
          $j[1]=0;
          $j[2]=parseInt($j[2])-1;
          if($j[2]<0){
            $j[2]=0;
            $j[3]=parseInt($j[3])-1;
          }
        }
      }
      $(jack).find('.js-countdown__item:last').html($j[0]);
      //console.log($(jack).find('.js-countdown__item').length);
      $(jack).find('.js-countdown__item').eq(parseInt($(jack).find('.js-countdown__item').length)-2).html($j[1]);
      $(jack).find('.js-countdown__item').eq(parseInt($(jack).find('.js-countdown__item').length)-3).html($j[2]);
      $(jack).find('.js-countdown__item').eq(parseInt($(jack).find('.js-countdown__item').length)-4).html($j[3]);


    },3000);
  }
  function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
  }
  $(function () {

    function randomInteger(min, max) {
      var rand = min + Math.random() * (max - min)
      rand = Math.round(rand);
      return rand;
    }


    $('.js-close-popup').on('click', function (e) {
      e.preventDefault();
      var popup = $(this).parents('.popup');
      if (popup.length != 0)  {
        var Class = popup.attr('class').split(' ');
        var ClassName = Class[1];

      } else {
        var ClassName = 'modal';
      }
      $("." + ClassName).hide();

      $('.modal').hide();
      //$('.overflow').hide();
      $('html').removeClass('modal_open');
    });
    $('.alert-panel__icon .icon_cross').on('click', function (e) {
      e.preventDefault();
      $('.alert-panel').hide();
    });
    $('.notify-panel__icon .icon_cross').on('click', function (e) {
      e.preventDefault();
      $('.notify-panel').hide();
    });
    $.each($('[data-toggle="timer"]'),function(){
      initializeClock($(this).attr("id"), $(this).data('time'))
    });

    $.each($('[data-toggle="jackpot"]'),function(){
      initializeJackpot($(this).attr("id"), $(this).data('jack'))
    });
  });

  function showRegistrationPopup(){
    $('.modal,.popup').hide();

    $('#registration-confirm').show();
    $('html').addClass('modal_open');
    if ($(window).width() < 768) {
      $('.modal_open .popup').not('.ps-container').perfectScrollbar({
        theme: 'hidden'
      });
    }
      $('#registration-confirm #bonus').val($('#registration-modal [name="bonus"]:checked').val());
      $('#registration-confirm .registration__image img').attr('src',$('#registration-modal [name="bonus"]:checked').prev('label').find('img').attr('src'));
  }
  
  if(!$('#registration-modal [name="bonus"]').data("binding"))
  $('#registration-modal [name="bonus"]').on('change',function(e){
    
    e.preventDefault();
    showRegistrationPopup();
    $('html').addClass('modal_open');
  });
  

  $(document).on('submit','form[data-type="ajax"]',function(e){
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
        $form.find('.modal__error').hide();
        $form.find('.pay-tooltip__note').hide();
        $form.closest('.modal,.popup').append(preloader);
      },
      success:function(data){
        $('.loading').remove();
        if(!data.success){
          $('[type="password"]').val('');
          if($.type(data.error)=='object'){
            $form.find('.modal__error .modal__note_important,.pay-tooltip__note .error__info').html('');
            $.each(data.error,function($key,$value){
              $form.find('.modal__error .modal__note_important,.pay-tooltip__note .error__info').append($value + "<br/>");
            });
          } else {
            $form.find('.modal__error .modal__note_important,.pay-tooltip__note .error__info').html(data.error);
          }
          $form.find('.modal__error').show();
          $form.find('.pay-tooltip__note').show();
        } else {
          if(data.uid!=undefined && _ggcounter!=undefined){
            _ggcounter.push({
              event: "login",
              uid: data.uid,
              callback: function(){
              }
            });
          }
          if(data.form!=undefined){
            $('body').append(data.form);
            $('#'+data.form_id).submit();
          } else {
            if($answer!=undefined){
              $('.modal,.popup').hide();
              $($answer).show();
            } else {
              window.location.reload();
            }

          }
        }
      }
    });

  });

  $(document).on('submit','form.payment-form',function(e){
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
        $form.closest('.modal,.popup').append(preloader);
      },
      success:function(data){
        $('.loading').remove();
        if(data.result!='ok'){
          if($.type(data.message)=='object'){
            $form.find('.pay-tooltip__note .error__info').html('');
            $.each(data.message,function($key,$value){
              $form.find('.pay-tooltip__note .error__info').append($value + "<br/>");
            });
          } else {
            $form.find('.pay-tooltip__note .error__info').html(data.message);
          }
          $form.find('.pay-tooltip__note').show();
        } else {

          if(data.form!=undefined){
            $('body').append(data.form);
            $('#'+data.form_id).submit();
          } else {
            if ($answer != undefined) {
              $('.modal,.popup').hide();
              $($answer).show();
            } else {
              window.location.reload();
            }
          }
        }
      }
    })
  });
  $(function () {
    $(".activate-bonus").on('click', function (e) {
      e.preventDefault();
      if(xhr!=''){
        xhr.abort();
      }
      var id= $(this).data('id');
      xhr =$.post('/engine/ajax/activate_bonus.php', {'id': id}, function (data) {
        xhr='';
        if (data.status && data.is_deposit) {
          $('#bonus-img').attr('src', data.image);
          $('#bonus-deposit-sum').html(data.deposit);
          console.log($('.min'));
          $('.min').html(data.deposit);
          $('.deposit-campaign-id').val(data.campaign_id);
          $('#deposit-for-bonus-modal .aside__promo-table .table__body').html('');
          $('#deposit-for-bonus-modal input[name=bonus_id]').val(id);
          $.each(data.winners, function ($key, $item) {
            var $row = "<tr class='table__row'><td class='table__cell'>" + ($key + 1) + "</td><td class='table__cell'>" + $item.login + "</td><td class='table__cell'>" + Math.round($item.win) + "</td></tr>";
            $('#deposit-for-bonus-modal .aside__promo-table .table__body').append($row);
          });
          $('#cabinet-modal').hide();
          $('#deposit-for-bonus-modal').show();
          $('html').addClass('modal_open');
        } else {
          if(!data.status){
            $('#cabinet-modal').hide();
            $('#have_active_bonus .popup__content .popup__title').html(data.error);
            $('#have_active_bonus').show();
          } else {
            window.location.reload();
          }
        }
        $(window).scrollTop(0);
      }, 'json')
    });
  });

  $(document).on('click','button[data-type="ajax"]',function(e){
    e.preventDefault();
    var $success=$(this).data('success');
    var $fail=$(this).data('fail');
    console.log ($(this).data('target'));
    $.post($(this).data('target'),{},function(data){
      if(data.success){
        $($success).show();
      } else {
        $($fail).show();
      }
    },'json')
  });
  (function () {
    $('.popup_favoritesAdded .js-close-popup').on('click', function(){
      $('button[data-success =".popup_favoritesAdded"]').hide()
    })
  })();
  $(document).on('submit','#search-form',function(e){
    e.preventDefault();
    $.ajax({
      type:"GET",
      data:{'page':$("#page").val(),'group':$("#gamegroup").val(),'type':'html','q':$("#search-form input").val()},
      url:'/engine/ajax/game_list.php',
      success:function(data){
        if($("#search-form input").val()!=''){
          history.pushState({q: $("#search-form input").val()}, '', window.location.pathname+'/?q='+$("#search-form input").val());
        } else {
          history.pushState({}, '', window.location.pathname);
        }

        $('.main_gallery').html(data);
      }
    })
  });

  $(document).on('keyup','#search-form input',function(e){
    e.preventDefault();
    if(xhr!=''){
      xhr.abort();
    }
    xhr =$.ajax({
      type:"GET",
      data:{'page':$("#page").val(),'group':$("#gamegroup").val(),'type':'html','q':$("#search-form input").val()},
      url:'/engine/ajax/game_list.php',
      success:function(data){
        xhr='';
        if($("#search-form input").val()!=''){
          history.pushState({q: $("#search-form input").val()}, '', window.location.pathname.replace(new RegExp("[/]+$", "g"), "")+'/?q='+$("#search-form input").val());
        } else {
          history.pushState({}, '', window.location.pathname);
        }

        $('.main_gallery').html(data);
      }
    });
  });
  (function ($) {
    $.each(['show', 'hide'], function (i, ev) {
      var el = $.fn[ev];
      $.fn[ev] = function () {
        this.trigger(ev);
        return el.apply(this, arguments);
      };
    });
  })(jQuery);

  $('#registration-modal').on('show', function(){
    $('[name="bonus"]').prop('checked',false);
  });
  $('#soc_registration-modal').on('show', function(){
    $('[name="bonus"]').prop('checked',false);
  });
  $('.modal,.popup').on('show', function(){
    $('.modal__error').hide();
    $('.pay-tooltip__note').hide();
    if ($('.tab-profile__form').length >= 1) {
      $('.tab-profile__form')[0].reset();
      $('.js-input__inner_tel').on('change keyup input click',function(){
        if (this.value.match(/[^0-9]/g)) {
          this.value = this.value.replace(/[^0-9]/g, '');
        }

      });
    }

  });

  $(document).on('click','[data-verification]',function(e){
    e.preventDefault();
    var $type=$(this).data('verification');
    if(xhr!=''){
      xhr.abort();
    }
    xhr =$.ajax({
      type:"POST",
      data:{'val':$("#profileform-"+$type).val(),'type':$type},
      url:'/engine/ajax/activate.php',
      dataType:'json',
      success:function(data){
        xhr='';
        $('.loading').remove();
        if(!data.success){
          $("#profile").find('.modal__error .modal__note_important').html(data.error);
          $("#profile").find('.modal__error').show();
        } else {
          if ($type == 'phone') {
            var timeinterval = setInterval(function() {
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
          if($type=='email'){
            $('.popup_emailVerification').show();
          }
         }
      }
    })
  });

  $(document).on('click','.disabled',function(e){
    e.preventDefault();
    if($(this).data('target')!=undefined){
      $('.modal,.popup').hide();
      $($(this).data('target')).show();
    }
    $(this).removeClass('disabled');
  });
});
$(function () {
  $('.vipclub__row .vipclub__item').on('click', function () {
    var infoBlock = $($(this).data('target'));
    var padding_for = infoBlock.height() + 76;
    $('.vipclub__row').not(infoBlock.parent()).css('padding-bottom', '0');
    $('.vipclub__info').not(infoBlock).removeClass('vipclub__info_open');

    if(infoBlock.hasClass('vipclub__info_open')) {

      infoBlock.removeClass('vipclub__info_open');
      infoBlock.parent().css('padding-bottom', 0);

    } else  {

      infoBlock.addClass('vipclub__info_open');
      infoBlock.parent().css('padding-bottom', padding_for);

      if ($(this).is(':first-child')) {
        infoBlock.find('.vipclub__arrow').removeClass('vipclub__arrow_right');
        infoBlock.find('.vipclub__arrow').addClass('vipclub__arrow_left');
      } else if ($(this).is(':nth-last-child(2)')) {
        infoBlock.find('.vipclub__arrow').removeClass('vipclub__arrow_left');
        infoBlock.find('.vipclub__arrow').addClass('vipclub__arrow_right');
      } else {
        infoBlock.find('.vipclub__arrow').removeClass('vipclub__arrow_left vipclub__arrow_right');
      }
    }
  });
});

$(function(){
  $('[data-toggle="tab"]').on('click tap swipe', function(e) {
    e.preventDefault();
    var $id = $(this).attr('href'),
        $viewport = $('html, body');
    if ($id == undefined) {
      $id = $(this).data('target');
    }


    if ($(this).hasClass('levels-table__item') && $(window).width() > 768) {

      $viewport.stop().animate({ scrollTop: $(".levels-table").offset().top}, 'slow', function(){
        $viewport.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
      });
      $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
        if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
          $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
        }
      });

    }

    $($id).parent().find('>div').removeClass('active');
    $($id).addClass('active');
    //hide error message from server
    $('.modal__error').hide();

    if($(this).data('remote')!=undefined && $(this).data('remote')!=''){
      var $content=$(this).data('content');
      $.post($(this).data('remote'),{},function(data){
        var $response=$(data).find($content);
        var $html=$response.html();
        $($id).html($html);
      });
    }
    if (!$(this).hasClass('levels-table__item')) {
      if($(this).hasClass('lottery__tabitem')){
        $(this).parent().find('.lottery__tabitem').removeClass('lottery__tabitem_active');
        $(this).addClass('lottery__tabitem_active');
      } else {
        $(this).parent().find('.tab__item').removeClass('tab__item_active');
        $(this).addClass('tab__item_active');
      }
    }
  });
  /*$('.levels-table__item[data-toggle="tab"]').on('swipe', function(e) {
   e.preventDefault();
   $(this).click();

   $(this).parent().find('>div').removeClass('active');
   $(this).addClass('active');
   if($(this).data('remote')!=undefined && $(this).data('remote')!=''){
   var $content=$(this).data('content');
   $.post($(this).data('remote'),{},function(data){
   var $response=$(data).find($content);
   var $html=$response.html();
   $($id).html($html);
   });
   }
   });*/
});


$(function () {
  // window.vulcanNamespace.resetStarHandlers =  function() {
  $(document).off('click','[data-toggle]');
  $(document).on('click','[data-toggle]',function(e){
    e.preventDefault();

    var $el = $(this);
    if ($el.attr('data-toggle') == 'add-fav') {
      $.get('/engine/ajax/add_to_favorites.php',{'id':$(this).data('id')},function(data){
        if(data.success){
          //$('.popup_favoritesAdded').css('position', 'fixed').show();
          //$('.overflow').show();
          $el.addClass('in_favorites');
          $el.attr('data-toggle','remove-fav');
          $el.attr('title','                                        ');
        } else {
          $('.popup_favoritesAddedFail').css('position', 'fixed').show();
          $('html').addClass('modal_open');
          $el.removeClass('in_favorites');
        }
      },'json')
    } else if ($el.attr('data-toggle') == 'remove-fav') {
      $.get('/engine/ajax/remove_favorites.php',{'id':$el.data('id')},function(data){
        $el.removeClass('in_favorites');
        $el.attr('data-toggle','add-fav');
        $el.attr('title','                                      ');
      },'json')
    }
  });


  // };
  //window.vulcanNamespace.resetStarHandlers();
});
function user_ajax(form,action){

  data=$(form).serialize();
  $(form).closest('.modal,.popup').append(preloader);
  error_box= $(form).find('.modal__error .modal__note_important').empty();
  $.post('/engine/ajax/user.php',data+'&action='+action,function(res){
    $('.loading').remove();
    if(res.success==true)
    {
      if(res.txt){
        $(form).find('.modal__error .modal__note_important').html('');
        //$(form).find('.modal__error .modal__note_accent').html(res.txt);
        $(form).find('.modal__error').show();
      }
      //setTimeout (function(){ window.location.reload()}, 3000);
      window.location.reload();
    }
    else
    {
      if(res.error){
        error_box.html(res.error);
        $(form).find('.modal__error').show();
      }
    }
  },'json');
  return false;
}
function decimalAdjust(type, value, exp) {
  //                                                  ,                             ...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  //                                                             ,                                                                      ...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  //                            
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  //                            
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

//                                                                  
if (!Math.round10) {
  Math.round10 = function(value, exp) {
    return decimalAdjust('round', value, exp);
  };
}
$(document).on('change keyup input click','#exchange-input',function(){
  if (this.value.match(/[^0-9]/g)) {
    this.value = this.value.replace(/[^0-9]/g, '');
  }
  var $value=$(this).val()*$(this).data('cours');
  $('#exchange-output').val(Math.round10($value,-2));
  $('#exchange-input').val($(this).val()*1);

});
$(document).on('change keyup input click','#exchange-output',function(){

    this.value = this.value.replace(/[^\d\.]/g, '');

  var $value=$(this).val()/$(this).data('cours');
  $('#exchange-input').val(Math.round10($value,-2));
  $('#exchange-output').val($(this).val()*1);
});

// script fro scroll to top button

$(document).ready(function(){
  var calculateSize = function($el) {
  
    var width = $el.width();
    var height = $el.height();
    var maxWidth = $el.parent().parent().width();
    var maxHeight = $el.parent().parent().height();
    var proportions = 3 / 4;

    if (maxHeight / maxWidth < proportions) {
      height = Math.floor(maxHeight);
      width = Math.floor(height / proportions);
    } else {
      width = Math.floor(maxWidth);
      height = Math.floor(width * proportions);
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
  setTimeout(function(){
    calculateSize($('.gameplay__canvas_inner object'));
  }, 100);

  // validation
  $('form button.validate').click(function(e){
    e.preventDefault();
    var $form = $(this).closest('form');
    // $form.find('.modal__note_important');
    var hasErrors = false;
    $form.find('.modal__error').hide();
    $form.find('.modal__note_important').html('');
    $(this).closest('form').find('[required][type="checkbox"]').each(function(index, el) {
      if (!$(el)[0].checked) {
        hasErrors = true;
        $form.find('.modal__error').show();
        $form.find('.modal__note_important').append($(el).attr('data-error-message'));
      }
    });
    if (!hasErrors) {
      $form.submit();
    }
  });

  $(window).resize(function() {
    calculateSize($('.gameplay__canvas_inner object'));
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('.scroller').fadeIn();
    }
    else {
      $('.scroller').fadeOut();
    }
  });
  $('.popup_tournamentGames').scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('.scroller').fadeIn();
    }
    else {
      $('.scroller').fadeOut();
    }
  });
  $('.scroller').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 400);
    if ($('.popup_tournamentGames').css('display') == 'block') {
      $('.popup_tournamentGames').animate({
        scrollTop: 0
      }, 400);
    }
    return false;
  });
  

});
function searchGame(text){
  if(text==''){
    $('.popup__gallery .main__item.preview').show();
    return true;
  }
  var search=text.toLowerCase();
  $.each($('.popup__gallery .main__item.preview'),function(){
    var $title=$(this).find('.preview__title').html().toLowerCase();
    $('.popup__gallery').perfectScrollbar('update');
    if($title.indexOf(search)<0){
      $(this).hide();
    } else {
      $(this).show();
    }
  })
}

// Script for xs header

$(function(){
  $('.js-userpanel-button').on('click', function(){
    $(this).toggleClass('user-toppanel__button_close');
    $(this).toggleClass('js-userpanel-button-close');
    $('.header__panel').toggleClass('open');
    $('.header').toggleClass('header_panel-open');
    $('.header__wrap').toggleClass('header__wrap_scroll');
    $('.header__wrap_scroll').not('.ps-container').perfectScrollbar({
      theme: 'hidden',
      suppressScrollY: true,
      scrollXMarginOffset: 5
      // maxScrollbarLength: 213
    });
    $('.header__toppanel').toggleClass('open');
    $('body, html').toggleClass('hidden');
  });
});

$(function(){
  $('.js-toppanel-button').on('click', function(){
    $(this).toggleClass('toppanel__button_close');
    $(this).toggleClass('js-toppanel-button-close');
    $('.js-mobilenav-dropdown').toggleClass('open');
    $('.header__toppanel').toggleClass('open');
    $('body, html').toggleClass('hidden');
  });
});


// Promo details script for xSmall screen

$(function(){
  $('.js-promo-details-button').on('click', function(){
    $('.promo-details__dropdown').slideToggle('fast').toggleClass('active');
  });
});
//$(function() {
  //if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    //$('html').addClass('Sa');
  //}
//});

// Popup_gameplayGallery Close button positioning on mobile devices

//$(function() {
// $('.popup_gameplayGallery')
//     .find('.popup__close')
//     .css('top', $('.popup_gameplayGallery').find('.popup__content').height() + 80);
//});

$(function(){
  if($('.finecountdown').length>0)
    {
    $('.finecountdown').each(function(){
  var suma=$(this).data('sum').toString();
  var i=k=0;
  
  $(this).empty();
  for(i=suma.length-1; i>=0; --i)
    {
    if($(this).hasClass('countdown')==true)
      {
      $(this).prepend('<span class="countdown__item js-countdown__item">'+suma[i]+'</span>');
      if(++k%3==0 && k>0 && k<=suma.length-1)
        $(this).prepend('<span class="countdown__divider"></span>');
      }
    else
      {
      $(this).prepend('<span class="js-countdown__item">'+suma[i]+'</span>');
      if(++k%3==0 && k>0 && k<=suma.length-1)
        $(this).prepend(' , ');
      }
    
    
    }
  });
  }
});

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  //                                      
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{
  var cookie_string = name + "=" + escape ( value );
 
  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }
 
  if ( path )
        cookie_string += "; path=" + escape ( path );
 
  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}