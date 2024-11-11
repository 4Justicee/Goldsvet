/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ru'] = {
		closeText: '              ',
		prevText: '&#x3c;        ',
		nextText: '        &#x3e;',
		currentText: '              ',
		monthNames: ['            ','              ','        ','            ','      ','        ',
		'        ','            ','                ','              ','            ','              '],
		monthNamesShort: ['      ','      ','      ','      ','      ','      ',
		'      ','      ','      ','      ','      ','      '],
		dayNames: ['                      ','                      ','              ','          ','              ','              ','              '],
		dayNamesShort: ['      ','      ','      ','      ','      ','      ','      '],
		dayNamesMin: ['    ','    ','    ','    ','    ','    ','    '],
		weekHeader: '    ',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
});

$.timepicker.regional['ru'] = {
	timeOnlyTitle: '                           ',
	timeText: '          ',
	hourText: '        ',
	minuteText: '            ',
	secondText: '              ',
	currentText: '            ',
	closeText: '              ',
	ampm: false
};
$.timepicker.setDefaults($.timepicker.regional['ru']);
