(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* Tato polo  ka je povinn  ",
                    "alertTextCheckboxMultiple": "* Pros  m vyberte jednu mo  nost",
                    "alertTextCheckboxe": "* Tato polo  ka je povinn  "
                },
                 "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Pole se mus   rovnat test"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* Minim  ln   ",
                    "alertText2": " znaky"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* Maxim  ln   ",
                    "alertText2": " znaky"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* Mus  te zadat jedno z nasleduj  c  ch pol  "
                },
                "min": {
                    "regex": "none",
                    "alertText": "* Minim  ln   hodnota je "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* Maxim  ln   hodnota je "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* Datum p  ed "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* Datum po "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* Po  et vybran  ch polo  ek p  es  hl limit"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* Pros  m vyberte ",
                    "alertText2": " volbu"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* Pole se neshoduj  "
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* Neplatn       slo kreditn   karty"
                },
                "CZphone": {
                    // telefon       slo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])([0-9]{3}[\-][0-9]{3}[\-][0-9]{3})$/,
                    "alertText": "* Neplatn   telefon       slo, zadejte ve form  tu +420 598-598-895"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                    "alertText": "* Neplatn   telefon       slo"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "* Neplatn   emailov   adresa"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* Zadejte pouze     sla"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* Neplatn       slo"
                },
                "CZdate": {
                    // datum ve form  tu jak se pou    v   v   r
                    "regex": /^(0[1-9]|[12][0-9]|3[01])[. /.](0[1-9]|1[012])[. /.](19|20)\d{2}$/,
                    "alertText": "* Neplatn   datum, datum mus   b  t ve form  tu den.m  s  c.rok (dd.mm.rrrr)"
                },
                "date": {
                    // Date in ISO format. Credit: bassistance
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* Neplatn   datum, datum mus   b  t ve form  tu YYYY-MM-DD"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Neplatn   IP  adresa"
                },
                //  esk   syntaxe pro rodn       slo
                "rc": {
                    "regex": /^\d{2}((0[1-9]|1[012])|(5[1-9]|6[012]))(0[1-9]|[12][0-9]|3[01])\/([0-9]{2,4})$/,
                    "alertText": "* Neplatn   rodn       slo, tvar mus   b  t 895431/4567"
                },
                //po  tovn   sm  rovac       slo
                "psc": {
                    "regex": /^\d{3}[ \.\-]\d{2}$/,
                    "alertText": "* Neplatn   po  tovn   sm  rovac       slo, tvar mus   b  t 456 45"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Neplatn   odkaz"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* Pouze     sla"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* Pouze p  smena"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* Pouze p  smena a     slice"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* U  ivatelsk   jm  no je ji   pou  ito",
                    "alertTextLoad": "* Ov    ov  n  , pros  m   ekejte"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* U  ivatelsk   jm  no je ji   pou  ito",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* Toto jm  no je k dispozici",
                    // speaks by itself
                    "alertTextLoad": "* Ov    ov  n  , pros  m   ekejte"
                },
                "validate2fields": {
                    "alertText": "* Pros  m napi  te HELLO"
                }
            };
            
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);
