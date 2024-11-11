$(document).ready(function(){
        
    /* jQuery Select2 */
    if($(".select2").length > 0)
        $(".select2").select2();
    /* EOF jQuery Select2 */    
    
    /* jQuery Uniform */
    if($(".uni").length > 0)
        $(".uni").uniform();
    /* EOF jQuery Uniform */
        
    /* jQuery Tags Input */
    if($("input.tags").length > 0)
        $("input.tags").tagsInput({'width':'218px','height':'auto','defaultText':''});
    /* EOF jQuery Tags Input */
    
    /* jQuery MultiSelect */
    if($("#multiselect").length > 0)
        $("#multiselect").multiSelect();
            
    if($("#multiselect_custom").length > 0)
        $("#multiselect_custom").multiSelect({selectableHeader: "<div class='ms-header'>Selectable items</div>",
                                              selectionHeader: "<div class='ms-header'>Selection items</div>",
                                              selectableFooter: "<div class='ms-footer'>Selectable footer</div>",
                                              selectionFooter: "<div class='ms-footer'>Selection footer</div>"
                                             });
    /* EOF jQuery MultiSelect */
    
    /* jQuery ValidationEngine */    
    if($("#validate").length > 0)
        $("#validate, #validate_custom").validationEngine('attach',{promptPosition : "topLeft"});    
    
    if($(".validate").length > 0)
        $(".validate").validationEngine('attach',{promptPosition : "topRight"});    
    
    /* EOF ValidationEngine */
    
    /* jQuery Masked Input */
    if($("input[class^='mask_']").length > 0){
        $("input.mask_tin").mask('99-9999999');
        $("input.mask_ssn").mask('999-99-9999');        
        $("input.mask_date").mask('9999-99-99');
        $("input.mask_product").mask('a*-999-a999');
        $("input.mask_phone").mask('99 (999) 999-99-99');
        $("input.mask_phone_ext").mask('99 (999) 999-9999? x99999');
        $("input.mask_credit").mask('9999-9999-9999-9999');        
        $("input.mask_percent").mask('99%');
    }    
    /* EOF jQuery Masked Input */
    
    /* jQuery UI Datepicker */
    if($(".datepicker").length > 0)
       $(".datepicker").datepicker();
    /* EOF jQuery UI Datepicker */
    
    /* Timepicker */
    if($(".timepicker").length > 0)
        $(".timepicker").timepicker();
    /* EOF Timepicker */
    
    /* Datetimepicker */
    if($(".datetimepicker").length > 0)
        $(".datetimepicker").datetimepicker();
    /* EOF Datetimepicker */
    
    
    /* jQuery Stepy Wizard */
    if($("#wizard").length > 0) 
        $('#wizard').stepy();
    
    if($("#wizard_validate").length > 0){
        
        $("#wizard_validate").validationEngine('attach',{promptPosition : "topLeft"});
        
        $('#wizard_validate').stepy({
            back: function(index) {                                                                
                //if(!$("#wizard_validate").validationEngine('validate')) return false; //uncomment if u need to validate on back click                
            }, 
            next: function(index) {                
                if(!$("#wizard_validate").validationEngine('validate')) return false;                
            }, 
            finish: function(index) {                
                if(!$("#wizard_validate").validationEngine('validate')) return false;
            }            
        });
    }    
    /* EOF jQuery Stepy Wizard */    
    
    /* NicEditor */
    if($("#nicEditor").length > 0)
        nE = new nicEditor({fullPanel : true, iconsPath : 'img/nicedit/nicEditorIcons.gif'}).panelInstance('nicEditor');       
    /* EOF NicEditor */
    
    /* CLEditor */
    if($(".clEditor").length > 0)
        cE = $(".clEditor").cleditor({width:"100%",height: 230});    
    if($("#clEditor").length > 0)
        cE = $("#clEditor").cleditor({width:"100%",height: 230});            
    
    if($("#clEditorComments").length > 0)
        cEC = $("#clEditorComments").cleditor({width:"100%",height: 230,controls: "bold italic underline strikethrough link unlink"});
    
        /* Email */
        if($("#mail_wysiwyg").length > 0)
            m_editor = $("#mail_wysiwyg").cleditor({width:"100%", height:"100%",controls:"bold italic underline strikethrough | font size style | color highlight removeformat | bullets numbering | outdent alignleft center alignright justify"})[0].focus();

        $('#sendmail').on('shown.bs.modal', function(e){
            m_editor.refresh();            
        });  
        /* EOF Email */
        
    /* EOF CLEditor */
   
    /* Accordion */
    if($(".accordion").length > 0){
       $(".accordion").accordion({heightStyle: "content",
                                  activate: function(e,ui){
                                      if($(ui.newPanel).hasClass('scroll'))
                                          $(ui.newPanel).mCustomScrollbar("update");
                                  }});
       $(".accordion .ui-accordion-header:last").css('border-bottom','0px');
    }    
    /* EOF Accordion */

    /* Sortable */
    if($("#sortable").length > 0)
       $("#sortable").sortable();
    /* EOF Sortable */
    
    /* Selectable */
    if($("#selectable").length > 0)
       $("#selectable").selectable();
    /* EOF Sortable */

    /* Tabs */
    if($(".tabs").length > 0)
       $(".tabs").tabs();
    /* EOF Tabs */
    
    /* Tooltips */
    if($(".tip").length > 0)
        $(".tip").tooltip({placement: 'top'});
    if($(".tipb").length > 0)
        $(".tipb").tooltip({placement: 'bottom'});
    if($(".tipl").length > 0)
        $(".tipl").tooltip({placement: 'left'});    
    if($(".tipr").length > 0)
        $(".tipr").tooltip({placement: 'right'});        
    /* EOF Tooltips */
    
    /* Slider */
    if($("#slider").length > 0)
        $("#slider").slider({min: 0,
                             max: 500,
                             value: 250,
                             range: 'min'});    
    if($("#slider_head").length > 0)
        $("#slider_head").slider({min: 0,
                                  max: 20,
                                  value: 10,
                                  range: 'min'});        
    if($("#slider_range").length > 0){        
        $("#slider_range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 150, 350 ],
            slide: function( event, ui ) {
                $( "#slider_range_amount" ).html( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
        });        
        $( "#slider_range_amount" ).html( "$" + $( "#slider_range" ).slider( "values", 0 ) +
        " - $" + $( "#slider_range" ).slider( "values", 1 ) );    
    }    
    /* EOF Slider */
    
    /* Popovers */
    if($("#popover_top").length > 0){
        var popover_title = 'Popover title';
        var popover_content = 'Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit.';
        
        $("#popover_top").popover({placement: 'top', title: popover_title, content: popover_content});    
        $("#popover_right").popover({placement: 'right', title: popover_title, content: popover_content});
        $("#popover_bottom").popover({placement: 'bottom', title: popover_title, content: popover_content});
        $("#popover_left").popover({placement: 'left', title: popover_title, content: popover_content});
    }
    /* EOF Popovers */
    
    /* jQuery Dialog */

        $("#jDialog_default").dialog({autoOpen: false,draggable: false});       
        $("#jDialog_default_button").click(function(){
            $("#jDialog_default").dialog('open');
        });
        
        $("#jDialog_modal").dialog({autoOpen: false, modal: true, draggable: false});        
        $("#jDialog_modal_button").click(function(){
            $("#jDialog_modal").dialog('open');
        });        
        
        $("#jDialog_form").dialog({autoOpen: false, 
                                   modal: true,
                                   width: 400,
                                   draggable: false,
                                   buttons: {"Submit": function() {
                                                $( this ).dialog( "close" );
                                            },
                                            Cancel: function() {
                                                $( this ).dialog( "close" );
                                            }
                                }});
    
        $("#jDialog_form_button").click(function(){$("#jDialog_form").dialog('open')});    
    
    /* EOF jQuery Dialog */
    
    /* mCustomScrollBar */
    if($(".scroll").length > 0)
       $(".scroll").mCustomScrollbar({scrollButtons:{enable:true}});           
    /* EOF mCustomScrollBar */
    
    /* Syntax Highlight */
    if($("pre[class^=brush]").length > 0){
        SyntaxHighlighter.defaults['toolbar'] = false;
        SyntaxHighlighter.all();   
    }
    /* EOF Syntax Highlight */
    
    /* iButton plugin */
    if($(".ibutton").length > 0)
       $(".ibutton:radio, .ibutton:checkbox").iButton();    
    /* EOF iButton plugin */
    
    /* datepicker */
    if($(".datepicker").length > 0)
       $(".datepicker").datepicker();
    /* EOF datepicker */
        
    /* colorpicker */
    if($(".color").length > 0)
       $(".color").ColorPicker({
                onSubmit: function(hsb, hex, rgb, el) {
                        $(el).val(hex);
                        $(el).ColorPickerHide();
                },
                onBeforeShow: function () {
                        $(this).ColorPickerSetColor(this.value);
                }
        })
        .bind('keyup', function(){
                $(this).ColorPickerSetColor(this.value);
        });
    /* EOF colorpicker */    
    
    /* datatables */
    if($("table.simple_sort").length > 0)
        $("table.simple_sort").dataTable({"iDisplayLength": 5,"bLengthChange": false,"bFilter": false,"bInfo": false,"bPaginate": true});
    
    if($("table.sort").length > 0)
        $("table.sort").dataTable({"iDisplayLength": 5, "sPaginationType": "full_numbers","bLengthChange": false,"bFilter": false,"bInfo": false,"bPaginate": true, "aoColumns": [ { "bSortable": false }, null, null, null, null]});
    
    if($("table.sortc").length > 0)
        $("table.sortc").dataTable({"iDisplayLength": 5, "aLengthMenu": [5,10,25,50,100], "sPaginationType": "full_numbers", "aoColumns": [ { "bSortable": false }, null, null, null, null]});
    /* EOF datatables */    
    
    /* Sparkline */
    if($(".mChartBar").length > 0)
       $(".mChartBar").sparkline('html',{ enableTagOptions: true, disableHiddenCheck: true});
    /* EOF Sparkline */
    
   // new selector case insensivity        
        $.expr[':'].containsi = function(a, i, m) {
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };        
   //     
   
   /* Fancybox */
   if($(".fancybox").length > 0)
      $(".fancybox").fancybox({padding: 10});
   /* EOF Fancybox */

   // Scroll up plugin
   $.scrollUp({scrollText: '^'});
   // eof scroll up plugin       
});

$(window).load(function(){ 



});

function toggleNicEdit(){
    if(!nE){
        nE = new nicEditor({fullPanel : true, iconsPath : 'img/nicedit/nicEditorIcons.gif'}).panelInstance('nicEditor');
    }else{
        nE.removeInstance('nicEditor');
        nE = null;
    }
}



