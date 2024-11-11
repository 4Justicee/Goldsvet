$(document).ready(function(){

    $(".faq .item .title").click(function(){
        var text = $(this).parent('.item').find('.text');
        
        if(text.is(':visible'))
            text.slideUp();
        else
            text.slideDown();                
    });

    $("#faqSearch").click(function(){
        var keyword = $(".faqSearchKeyword").val();
        
        if(keyword.length >= 3){
            $(".faq").find('.text').slideUp();
            $("#faqSearchResult").html("");
            $(".faq").removeHighlight();
            
            var items = $(".faq .text:containsi('"+keyword+"')");
            items.highlight(keyword);
            items.slideDown();
            $("#faqSearchResult").html("<span class='text-success'>Found in "+items.length+" answers</span>");            
            
        }else
            $("#faqSearchResult").html("<span class='text-error'>Minimum 3 chars</span>");
         
    });
    
    $("#faqListController a").click(function(){
        var open = $(this).attr('href');
        $(open).find('.text').slideDown();
    });
    
    $("#faqOpenAll").click(function(){
        $(".faq").find('.text').slideDown();
    });
    
    $("#faqCloseAll").click(function(){
        $(".faq").find('.text').slideUp();
    });
    
    $("#faqRemoveHighlights").click(function(){
        $(".faq").removeHighlight();
    });
    
    
    
});
