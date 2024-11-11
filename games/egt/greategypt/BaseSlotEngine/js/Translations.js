   var FreeSpinTranslations = // If some property is null it takes the parent value
{
	"defaultSettings" : {
		"cyrillicLanguages"	: ["bg", "ru", "fr"],
		"multiplier"		: "x3",

		"width"				: 1280,
		"height"			: 720,

		"fsBGWidth"			: 788,
		"fsBGHeight"		: 382,
		"fsBGOffsetY"		: -30,

		"lineCap"			: "round",
		"lineJoin"			: "round",
		"textAlign" 		: "center",
		"vGap" 				: 20, // the gap between each lines
		"offset"			: -20, // offset y position of the text, only applied on Intro
		"valueCurrencyGap"	: 20, // the gap between value and currency in outro animation
		"currencyScale"		: 0.5, // change the scale of currency  in outro animation
		"introTitleScale"	: 1, // change the scale of title in intro animation
		"outroTitleScale"	: 1.2, // change the scale of title in outro animation

		/* Text in intro, outro and retrigger animation */
		"defaultFontFace" 	: "Bear",
		"cyrillicFontFace" 	: "Tahoma,Geneva,Kalimati,sans-serif",
		"fontStyle" 		: "normal",
		"fontWeight" 		: "bold",
		"fontSize" 			: 60,
		"fillStyle"			: "#e0b700",
		"strokeStyle"		: "#000",
		"shadowStyle"		: "#000",
		"strokeWidth" 		: 6,
		"shadowWidth"		: 5, // if null : 1.5 * strokeWidth
		"shadowAlpha"		: null, // default 1
		"shadowPos"			: {x : 0, y: 0}, // position of the shadow, default 0,0
		"shadowBlur"		: 10, 

		/* Start Animation */
		"blink"				: true,
		"blinkingWords"		: [],
		"blinkingInterval"	: 0.6,
		"textPosition"		: 'bottom',
		"startOffset"		: -50,
		"startFontFace"		: "Tahoma,Geneva,Kalimati,sans-serif",
		"startFontSize"		: 25,
		"startFontStyle" 	: "normal",
		"startFontWeight"	: "900",
		"startFillStyle"	: "#36ff00",
		"startStrokeStyle"	: "#000000",
		"startShadowStyle"	: null,
		"startStrokeWidth" 	: 2,
		"startShadowWidth"	: 2,
		"startShadowBlur"	: 20,
		"startShadowPos"	: {x : 0, y: 0}, // translate by [x, y]

		/* Numbers in intro and retrigger animation */
		"numberFontFace" 	: "Bear",
		"numberFontStyle" 	: null,
		"numberFontWeight" 	: "bold",
		"numberFontSize"	: 100, // if null : 1.5 * fontSize
		"numberFillStyle"	: "#008ef7",
		"numberStrokeStyle"	: "#ffde00",
		"numberShadowStyle"	: "#ffde00",
		"numberStrokeWidth"	: 6,
		"numberShadowWidth"	: 20,
		"numberShadowAlpha"	: 1,
		"numberShadowPos"	: {x : 0, y: 0},
		"numberShadowBlur"	: 2,

		/* Value and currency in outro animation */
		"valueFontFace"		: "Bear",
		"valueFontStyle"	: null,
		"valueFontWeight"	: null,
		"valueFontSize"		: 70, // if null : 1.5 * fontSize
		"valueFillStyle"	: "#008ef7",
		"valueStrokeStyle"	: "#ffde00",
		"valueShadowStyle"	: null,
		"valueStrokeWidth"	: 6,
		"valueShadowWidth"	: 2,
		"valueShadowAlpha"	: 1,
		"valueShadowPos"	: {x: 0, y: 0},
		"valueShadowBlur"	: 0,
		
	} ,
	"en":
	{
		"IntroAnimation" : {
			"text" : '{freeSpins} FREE SPINS\nAT {multiplier} MULTIPLIER'
		},
		"RetriggerAnimation" : {
			"text" : 'ADDITIONAL\n{freeSpins} FREE SPINS'
		},
		"OutroAnimation" : {
			"text" : 'TOTAL\nWIN\n{total}'
		},
		"StartAnimation" : {
			"text" : 'Press START to begin'
		},
	},
	"bg":
	{
		"IntroAnimation" : {
			"fontSize" : 60,
			"text" : '{freeSpins}                          \n                    {multiplier}'
		},
		"RetriggerAnimation" : {
			"fontSize": 60,
			"text" : '                        \n{freeSpins}                          '
		},
		"OutroAnimation" : {
			"text" : '        \n              \n{total}'
		},
		"StartAnimation" : {
			"text" : '                                               '
		},
	},
	"ru":
	{
		"IntroAnimation" : {
			"fontSize" : 55,
			"text" : '{freeSpins}                          \n                        {multiplier}'
		},
		"RetriggerAnimation" : {
			"fontSize": 60,
			"text" : '{freeSpins}\n                            \n                         '
		},
		"OutroAnimation" : {
			"text" : '          \n              \n{total}'
		},
		"StartAnimation" : {
			"text" : '                                                 '
		},
	},
	"nl":
	{
		"IntroAnimation" : {
			"fontSize" : 55,
			"text" : '{freeSpins} FREE SPINS\nTEGEN {multiplier} MULTIPLIER'
		},
		"RetriggerAnimation" : {
			"text" : '{freeSpins} EXTRA\nFREE SPINS'
		},
		"OutroAnimation" : {
			"text" : 'TOTALE\nWINST\n{total}'
		},
		"StartAnimation" : {
			"text" : 'Druk op START om te beginnen'
		},
	},
	"fr":
	{
		"IntroAnimation" : {
			"fontSize": 50,
			"text" : '{freeSpins} PARTIES GRATUITES\n   {multiplier} MULTIPLICATEUR'
		},
		"RetriggerAnimation" : {
			"fontSize": 60,
			"text" : '{freeSpins} PARTIES\nGRATUITES\nSUPPL  MENTAIRES'
		},
		"OutroAnimation" : {
			"text" : 'GAIN\nTOTAL\n{total}'
		},
		"StartAnimation" : {
			"text" : 'Appuyez sur START pour commencer'
		},
	},
	"ro":
	{
		"IntroAnimation" : {
			"fontSize": 50,
			"text" : '{freeSpins} ROTIRI  GRATUITE\ncu  Multiplicator {multiplier}'
		},
		"RetriggerAnimation" : {
			"fontSize": 60,
			"text" : '{freeSpins}\nROTIRI GRATUITE\nADI  IONALE'
		},
		"OutroAnimation" : {
			"text" : 'TOTAL\nC    TIG\n{total}'
		},
		"StartAnimation" : {
			"text" : 'Ap  sa  i pe START pentru a activa aceast   func  ie'
		},
	},
	"es":
	{
		"IntroAnimation" : {
			"fontSize": 45,
			"text" : '{freeSpins} JUEGOS  GRATIS\nCON  MULTIPLICADOR {multiplier}'
		},
		"RetriggerAnimation" : {
			"fontSize": 60,
			"text" : '{freeSpins}\nJUEGOS  GRATIS\nADICIONALES'
		},
		"OutroAnimation" : {
			"text" : 'GANANCIA\nTOTAL\n{total}'
		},
		"StartAnimation" : {
			"text" : 'Presione INICIO para comenzar'
		},
	}

}