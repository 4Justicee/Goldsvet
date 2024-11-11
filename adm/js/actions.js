$(document).ready(function(){
    
    /* head popup */
    $("#header .buttons .item > a").click(function(){        
        var popup = $(this).parent('.item').find('.popup');                
        if(popup.length > 0){            
            popup.is(':visible')?popup.fadeOut(200):popup.fadeIn(300);                        
            return false;
        }        
    });
    $(".popup-close").click(function(){
        $(this).parents('.popup').fadeOut(200);
    });
    
        /* load messages in head */
        $("#messages").load('ajax_messages.html');
    
    /* eof head popup */
    
    /* combobox */

    $(".combobox input").focus(function(){           
        var cl = $(this).parent('.combobox').find('ul');                
            cl.show();
        
        $(this).focusout(function(){        
            setTimeout(function(){                 
                cl.hide().find('li').show();
            }, 200);        
        });
    });

    $(".combobox input").keyup(function(){            
        var cb = $(this).parent(".combobox");
        
        if(cb.hasClass('ws')){
            if($(this).val().length > 0){
                cb.find('li').hide();
                cb.find("li:containsi('"+$(this).val()+"')").show();        
            }else
                cb.find('li').show();
        }               
    });        

    $(".combobox ul > li").click(function(){
        var cb = $(this).parents(".combobox");
        var cl = cb.find("ul");
        var ci = cb.find("input");
        
        if($(this).attr('data-val') != null)
            ci.val($(this).attr('data-val'));
        else{
            ci.val($(this).html());            
        }

        cl.hide();//.find('li').show();                                    
    });    
    
    /* EOF combobox */
    
    /* table checkall */
    $("table .checkall").click(function(){           
        var iC = $(this).parents('th').index(); //index of checkall checkbox
        var tB = $(this).parents('table').find('tbody'); // tbody of table        
        
        if($(this).is(':checked'))
            tB.find('tr').each(function(){                
                var cb = $(this).find('td:eq('+iC+') input:checkbox');                
                if(cb.hasClass('uni')) cb.parent('span').addClass('checked');                                
                cb.attr('checked',true);                
            });
        else
            tB.find('tr').each(function(){
                var cb = $(this).find('td:eq('+iC+') input:checkbox');
                if(cb.hasClass('uni'))cb.parent('span').removeClass('checked')
                cb.attr('checked',false);
            });                    
    });
    /* eof table checkall */    
    
    /* icomoon button get code */
    $("#icon_icomoon_list li").click(function(){
       $("#icon_icomoon").html('&lt;i class="'+$(this).find('i').attr('class')+'"&gt;&lt;/i&gt;');
    });
    /* eof icomoon button get code */
    /* glyphs button get code */
    $("#icon_glyphs_list li").click(function(){
       $("#icon_glyphs").html('&lt;i class="'+$(this).find('i').attr('class')+'"&gt;&lt;/i&gt;');
    });
    /* eof glyphs button get code */    
    
    /* Block loading start button  USING FOR EXAMPLE, CAN BE REMOVED*/
    $(".block_loading").click(function(){
        var bC = $(this).parents('.block').find('.content');
        block_loading(bC);
        
        // Timer
        setTimeout(function(){
            block_loading(bC);
        },2000);
        
        return false;
    });
    /* EOF Block loading start button */
    
    /* Remove block button */
    $(".block_remove").click(function(){
        $(this).parents('.block').fadeOut(300,function(){
            $(this).remove();
        });
        return false;
    });
    /* EOF Remove block button */
    
    /* Toggle block button */
    $(".block_toggle").click(function(){
        var bC = $(this).parents('.block').find('.content');
        if(bC.is(':visible')){
            bC.slideUp();
            $(this).find('span').removeClass('i-arrow-down-3').addClass('i-arrow-up-3');
        }else{
            bC.slideDown();
            $(this).find('span').removeClass('i-arrow-up-3').addClass('i-arrow-down-3');
        }
        return false;
    });
    /* EOF Toggle block button */
    
    /* Navigation open submenu button */
    $("#sidebar .navigation li.openable > a").click(function(){        
        if($(this).parent('li').hasClass('open')){
            $(this).parent('li').removeClass('open');
        }else{
            $(this).parent('li').addClass('open');            
        }
        return false;
    });
    /* EOF Navigation open submenu button */
    
    /* Toggle navigation button */
    if($("body").width() < 769){        
        $("#wrapper").addClass("sidebar_off");
        $(".c_layout").addClass('active').find("span").attr("class","i-layout-9");         
    }
    
    $(".c_layout").click(function(){
        
        if($("#wrapper").hasClass("sidebar_off")){
            $("#wrapper").removeClass("sidebar_off");
            $(this).removeClass('active').find("span").attr("class","i-layout-8");
        }else{
            $("#wrapper").addClass("sidebar_off");
            $(this).addClass('active').find("span").attr("class","i-layout-9");
        }
        
        actions();
        return false;
    });
    /* EOF Toggle navigation button */
    
    /* Toggle layout */
    $(".c_screen").click(function(){                
        
        if($("#wrapper").hasClass("screen_wide")){
            
            $("#wrapper").removeClass("screen_wide");
            $(this).removeClass('active').find("span").attr("class","i-stretch");
        }else{
            
            $("#wrapper").addClass("screen_wide");
            $(this).addClass('active').find("span").attr("class","i-narrow");
        }                        

        actions();
        return false;        
    });
    /* EOF Toggle layout */
    
    /* input file */
    $(".file .btn, .file input:text").click(function(){        
        var block = $(this).parent('.file');
        block.find('input:file').click();
        block.find('input:file').change(function(){
            block.find('input:text').val(block.find('input:file').val());
        });
    });
    /* eof input file */     
        
    /* Draggable blocks */        
    if($(".sortableContent").length > 0){

        var scid = 'sC_'+$(".sortableContent").attr('id');
                
        var sCdata = $.cookies.get( scid );          
        
        if(null != sCdata){            
            for(row=0;row<Object.size(sCdata); row++){                
                for(column=0;column<Object.size(sCdata[row]);column++){                    
                    for(block=0;block<Object.size(sCdata[row][column]);block++){                        
                        $("#"+sCdata[row][column][block]).appendTo(".sortableContent .scRow:eq("+row+") .scCol:eq("+column+")");                        
                    }
                }               
            }            
        }                    
       
        //$.cookies.del( scid );
       
        $(".sortableContent .scCol").sortable({
            connectWith: ".sortableContent .scCol",
            items: "> .block",
            handle: ".head",
            placeholder: "scPlaceholder",
            start: function(event,ui){
                $(".scPlaceholder").height(ui.item.height());
            },
            stop: function(event, ui){                                

                var sorted = {};
                var row = 0;
                $(".sortableContent .scRow").each(function(){                    
                    sorted[row] = {};
                    $(this).find(".scCol").each(function(){
                        var column = $(this).index();                        
                        sorted[row][column] = {};

                        $(this).find('.block').each(function(){
                            sorted[row][column][$(this).index()] = $(this).attr('id');
                        });
                    });
                    row++;
                });
                                                
                $.cookies.set( scid, JSON.stringify(sorted));                
            }
        }).disableSelection();
    }
    
    /* EOF Draggable blocks */            
    
    /* pricing table */
    $("#pricing_action").on('change',function(){
        if($(this).val() == 1)
            $("#pricing_domain").hide();
        else
            $("#pricing_domain").show();
    });
    /* EOF pricing table*/
    
    /* Settings */
        var sTheme = $.cookies.get('sTheme');
        if(null != sTheme){
            $(".themes a[data-theme="+sTheme+"]").addClass('active');
            $("body").addClass(sTheme);
        }else            
            $(".themes a.default").addClass('active');
        
        $(".themes a").click(function(){
            $(".themes a").removeClass('active');
            $(this).addClass('active');
            $('body').removeClass('themeSimple themeDark').addClass($(this).attr('data-theme'));
            $.cookies.set('sTheme',$(this).attr('data-theme'));
            return false;
        });
        
        var sBack = $.cookies.get('sBack');
        if(null != sBack){
            $(".backgrounds a[data-back="+sBack+"]").addClass('active');
            $("body").addClass(sBack);
        }else            
            $(".backgrounds a.default").addClass('active');
        
        $(".backgrounds a").click(function(){
            $(".backgrounds a").removeClass('active');
            $(this).addClass('active');
            $('body').removeClass('b_bcrosshatch b_crosshatch b_cube b_dots b_grid b_hline b_simple b_vline').addClass($(this).attr('data-back'));
            $.cookies.set('sBack',$(this).attr('data-back'));
            return false;
        });    
    /* EOF Settings */
    
});
$(window).load(function(){      
    $(window).resize();
});
$(window).resize(function(){    
    //resizing();
    actions();    
    thumbs();            
});

function resizing(){
    
    if($("body").width() < 1025){
        $(".c_screen").hide();                    
        $("#wrapper").addClass("screen_wide");
        
    }else{
        $(".c_screen").show();
        if(!$(".c_screen").hasClass('active'))           
           $("#wrapper").removeClass("screen_wide");
       
              
    }    
        
}

function actions(){
    block_items_width('.wide_elements',['.add-on','button'],'input');    
    if($(".gallery").length > 0) gallery();    
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function block_loading(content){
    if(content.find('.block_loading').length > 0)
        content.find('.block_loading').remove();
    else{
        var ptc = content.hasClass('np') ? 0 : 20;
        content.append('<div class="block_loading" style="width: '+(content.width()+ptc)+'px; height: '+(content.height()+ptc)+'px;"><img src="img/loader.gif"/></div>');
    }
    return false;
}

function block_items_width(block,what,to){    
    
    $(block).each(function(){        
        var iWidth = $(this).width();        
        if(what.length > 0){            
            for(var i=0; i < what.length; i++){
                $(this).find(what[i]).each(function(){                    
                    iWidth -= $(this).width()+(parseInt($(this).css('padding-left')) * 2)+2;
                });
            }            
            $(this).find(to).width(iWidth-12);
        }
    });    
    
}

function gallery(){   
    
    var w_block = $(".gallery").width()-20;
    var w_item  = $(".gallery a").width();        
    var c_items = Math.floor( w_block/w_item );    
    var m_items = Math.round( (w_block-w_item*c_items)/(c_items*2) );        
    $(".gallery a").css('margin',m_items+2);
}

function thumbs(){
    
    $(".thumbs").each(function(){        
        
        var maxImgHeight = 0;
        var maxTextHeight = 0;    
        
        $(this).find(".thumbnail").each(function(){
            var imgHeight = $(this).find('a > img').height();
            var textHeight = $(this).find('.caption').height();
            
            maxImgHeight = maxImgHeight < imgHeight ? imgHeight : maxImgHeight;
            maxTextHeight = maxTextHeight < textHeight ? textHeight : maxTextHeight;
        });
        
        $(this).find('.thumbnail > a').height(maxImgHeight);
        $(this).find('.thumbnail .caption').height(maxTextHeight);
    });
    

    
    var w_block = $(".thumbs").width()-20;
    var w_item  = $(".thumbs .thumbnail").width()+10;
    
    var c_items = Math.floor(w_block/w_item);
    
    var m_items = Math.floor( (w_block-w_item*c_items)/(c_items*2) );
    
    $(".thumbs .thumbnail").css('margin',m_items+2);

}

function clear_form(form) {
    $(form).find(':input').each(function(){        
        switch(this.type) {            
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                if(!$(this).is(':disabled'))
                    $(this).val('');            
            break;
            case 'checkbox':
            case 'radio':
                if(!$(this).is(':disabled')){                    
                    $(this).attr('checked', false);
                    if($(this).hasClass('uni'))
                        $(this).parent('span').removeClass('checked');                    
                }
            break;
        }        
    });
    return false;
}