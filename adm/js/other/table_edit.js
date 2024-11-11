$(document).ready(function(){
        
        
    $("table.editable td").dblclick(function () {        
        
        var eContent = $(this).text();
        var eCell = $(this);
            
        if(eContent.indexOf('<') >= 0 || eCell.parents('table').hasClass('oc_disable')) return false;        
            
        eCell.addClass("editing");        
        eCell.html('<input type="text" value="' + eContent + '"/>');
        
        var eInput = eCell.find("input");
        eInput.focus();
 
        eInput.keypress(function(e){
            if (e.which == 13) {
                var newContent = $(this).val();
                eCell.html(newContent).removeClass("editing");
                // Here your ajax actions after pressed Enter button
            }
        });
 
        eInput.focusout(function(){
            eCell.text(eContent).removeClass("editing");            
            // Here your ajax action after focus out from input
        });        
    });
    
    $("table.editable").on("click",".edit",function(){
        var eRow   = $(this).parents('tr');
        var eState = $(this).attr('data-state');
        
        if(eState == null){
            $(this).html('Save');
            eState = 1;
        }
        
        eRow.find('td').each(function(){            
            if(eState == 1){
                var eContent = $(this).html();                
                if(eContent.indexOf('<') < 0){
                    $(this).addClass("editing").html('<input type="text" value="' + eContent + '"/>');                    
                }
            }
            if(eState == 2){
                var eContent = $(this).find('input').val();                                
                if(eContent != null){
                    $(this).removeClass("editing").html(eContent);
                    // Here your ajax action after Save button pressed
                }
            }
        });
        
        if(eState == 1) 
            $(this).attr('data-state','2');
        else{
            $(this).removeAttr('data-state');
            $(this).html('Edit');
        }
    });
    $("table.editable").on("click",".remove",function(){
        rRow = $(this).parents("tr");
        $("#row_delete").dialog("open");
    });
    function remove_row(row){
        row.remove();
        // Here your ajax action after delete confirmed
    }
    $("#row_delete").dialog({
        autoOpen: false,
        resizable: false,        
        modal: true,
        buttons: {
            "Delete": function() {
                remove_row(rRow);
                $(this).dialog("close");
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });    
    
});
