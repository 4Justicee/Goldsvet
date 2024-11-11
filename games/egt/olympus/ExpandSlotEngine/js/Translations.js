   var FreeSpinTranslations =
{
	"defaultSettings" : {
		"width"				: 1280,
		"height"			: 720,

		/* Special Expand symbol properties */
		"specialExpandX"	: 960,
		"specialExpandY"	: 380,
		"specialOffsetX"	: -60,
		"offsetLanguages"	: ['en', 'nl', 'fr'],
		"specialExpandScale": 1.2,

		/* Special Expand rectangle colors */
		"specialStrokeWidth" : 3,
		"colors" : ["#fff", "#001e47", "#44faff", "#2f8bca"],

		"fontWeight" : "900",
		"fontSize" : 70,
		"numberFontWeight" : "900",
		"numberFontFace" : "Bear",
		"valueFontSize" : 120,
		"valueFillStyle" : "#4edbfe",
		"valueStrokeStyle" : "#001e47",
		"valueShadowStyle" : null,
		"shadowStyle" : "#002351",
		"shadowBlur" : 1,
		"shadowLineWidth" : 15,
		"lineWidth" : 5,
		"lineCap" : "round",
		"lineJoin" : "round",
		"textBaseline" : "alphabetic",
		"hGap" : 30,

		/* Numbers */
		"numberFontSize" : 150,
		"numberFillStyle" : "#1b6b76",
		"numberStrokeStyle" : "#fbffff",
		"numberShadow" : "#002351",
		"numberOffsetY" : 20,

		/* Start Animation */
		"blinkingInterval"	: 0.6,
		"offsetY"			: 670, // pixels from y position of start animation
		"startFontFace"		: "Arial",
		"startFontSize"		: 30,
		"startFontStyle" 	: "normal",
		"startFontWeight"	: "900",
		"startFillStyle"	: "white",
		"startStrokeStyle"	: "black",
		"startShadowStyle"	: null,
		"startStrokeWidth" 	: 5,
		"startShadowWidth"	: 0,
		"startShadowBlur"	: 0,
		"startShadowPos"	: {x : 0, y: 0}, // translate by [x, y]
	} ,
	"en":
	{
		"defaultFontFace" : "Bear",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 80,
				"offsetY" : 30,
				"vGap" : 20,
			},
			// "text" : '{"specialFontSize" : 115, "specialAlign" : "left"}^CONGRATULATIONS\n{"specialFontSize" : 80, "vGap" : 80}^YOU WIN\n{}^*{"specialFontSize" : 150, "specialFill" : "#990100", "specialStroke" : "#faef01"}~15*\n{}^FREE SPINS'
			"text" : '{}^freespins+FREE SPINS\n{"vGap": 10, "specialFontSize" : 80, "padding" : 80}^WON\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 90}^SPECIAL\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^EXPANDING\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^SYMBOL'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 55,
				"offsetY" : 100,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 100}^CONGRATULATIONS\n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^YOU HAVE RETRIGGERED THE FEATURE\n{"specialFontSize" : 70, "vGap" : 0}^freespins+ADDITIONAL\n{"specialFontSize" : 80, "vGap" : 40}^FREE SPINS\n{"specialFontSize" : 70, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^are awarded'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^TOTAL\n{"vGap" : 20, "specialFontSize" : 140}^WIN',
			//"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false
		},
		"StartAnimation" : {
			"text" : 'PRESS START TO BEGIN'
		},
	},
	"ro":
	{
		"defaultFontFace" : "Tahoma,Geneva,Kalimati,sans-serif",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 75,
				"offsetY" : 30,
				"vGap" : 20,
			},
			"text" : '{}^freespins+ROTIRI GRATUITE\n{"specialFontSize" : 60, "padding" : 60}^AU C    TIGAT\n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 90}^SIMBOL\n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^EXTENSIBIL\n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^SPECIAL'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 60,
				"offsetY" : 80,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 120}^Felicit  ri\n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^A  I REDECLAN  AT\n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^FUNC  IA\n{"specialFontSize" : 50, "vGap": -10}^freespins+ROTIRI GRATUITE\n{"vGap" : 50 ,"specialFontSize" : 60, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^ADI  IONALE AU FOST ACORDATE'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 140,
				"offsetY" : 120,
				"vGap" : 20,
			},
			"text" : '{}^TOTAL\n{"vGap" : 20, "specialFontSize" : 140}^C    TIG',

		},
		"StartAnimation" : {
			"text" : 'Ap  sa  i pe START pentru a   ncepe'
		},
	},
	"bg":
	{
		"defaultFontFace" : "Tahoma,Geneva,Kalimati,sans-serif",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 70,
				"offsetY" : 20,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 90}^                       \n{"padding": -300}^freespins\n{"vGap": -140, "padding": 70}^                \n{"padding": 70, "vGap": 15}^        \n{"align" : "left", "padding": 130, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 60}^                  \n{"align" : "left", "padding": 130, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 20}^                     \n{"align" : "left", "padding": 130, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 20}^            '
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 60,
				"offsetY" : 70,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 100}^                        \n{"vGap" : 50, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^                           \n{"specialFontSize" : 70, "vGap": 0}^freespins+                        \n{"specialFontSize" : 100, "vGap": 50}^                         '
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 140,
				"offsetY" : 120,
				"vGap" : 20,
			},
			"text" : '{}^        \n{"vGap" : 20, "specialFontSize" : 140}^              ',
		},
		"StartAnimation" : {
			"text" : '                                               '
		},
	},
	"ru":
	{
		"defaultFontFace" : "Tahoma,Geneva,Kalimati,sans-serif",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 70,
				"offsetY" : 20,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 90}^                     \n{"padding" : -300}^freespins\n{"vGap": -140, "padding": 70}^                  \n{"padding": 70, "vGap": 15}^      \n{"align" : "left", "padding": 100, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 70}^                      \n{"align" : "left", "padding": 100, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 20}^                          \n{"align" : "left", "padding": 100, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 20}^            '
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 60,
				"offsetY" : 70,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 100}^                      \n{"vGap" : 50, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^                     \n{"specialFontSize" : 70, "vGap": 0}^freespins+                            \n{"specialFontSize" : 100, "vGap": 50}^                         '
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 140,
				"offsetY" : 120,
				"vGap" : 20,
			},
		"text" : '{}^          \n{"vGap" : 20, "specialFontSize" : 140}^              ',
		},
		"StartAnimation" : {
			"text" : '                                                 '
		},
	},
	"nl":
	{
		"defaultFontFace" : "Bear",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 80,
				"offsetY" : 30,
				"vGap" : 20,
			},
			"text" : '{}^freespins+FREE SPINS\n{"vGap": 20, "specialFontSize" : 60, "padding" : 80}^GEWONNEN\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 80}^SPECIAAL\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^VERGROOT\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^SYMBOOL'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 60,
				"offsetY" : 80,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 120}^GEFELICITEERD\n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^U HEBT DE FUNCTIE\n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^NOGMAALS GEACTIVEERD\n{"specialFontSize" : 50, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap": -10}^U KRIJGT+freespins+EXTRA\n{"specialFontSize" : 100, "vGap": 40}^FREE SPINS'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 140,
				"offsetY" : 120,
				"vGap" : 20,
			},
			"text" : '{}^TOTALE\n{"vGap" : 20, "specialFontSize" : 140}^WINST',

		},
		"StartAnimation" : {
			"text" : 'Druk op START om te beginnen'
		},
	},
	"fr":
	{
		"defaultFontFace" : "Tahoma,Geneva,Kalimati,sans-serif",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 75,
				"offsetY" : 30,
				"vGap" : 20,
			},
			"text" : '{}^freespins+PARTIES GRATUITES\n{"specialFontSize" : 60, "padding" : 60}^GAGN  ES\n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 90}^SYMBOLE\n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^EXPANSIF\n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^SP  CIAL'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 60,
				"offsetY" : 80,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 120}^F  LICITATIONS\n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^VOUS AVEZ RED  CLENCH  \n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^LA FONCTION\n{"specialFontSize" : 50, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap": -10}^freespins+PARTIES GRATUITES\n{"vGap" : 50 ,"specialFontSize" : 60}^SUPPL  MENTAIRES'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 140,
				"offsetY" : 120,
				"vGap" : 20,
			},
			"text" : '{}^GAIN\n{"vGap" : 20, "specialFontSize" : 140}^TOTAL',

		},
		"StartAnimation" : {
			"text" : 'Appuyez sur START pour commencer'
		},
	},
	"mk":
	{
		"defaultFontFace" : "Tahoma,Geneva,Kalimati,sans-serif",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 65,
				"offsetY" : 20,
				"vGap" : 20,
			},
			"text" : '{}^freespins+                                       \n{"specialFontSize" : 60, "padding" : 60}^                \n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 120}^                    \n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^                        \n{"align" : "left", "padding": 160, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^            '
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 60,
				"offsetY" : 70,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 120}^                \n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^                                            \n{"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^                                        \n{"specialFontSize" : 50, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap": -10}^                        +freespins\n{"vGap" : 50 ,"specialFontSize" : 60}^                                       '
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 140,
				"offsetY" : 120,
				"vGap" : 20,
			},
			"text" : '{}^            \n{"vGap" : 20, "specialFontSize" : 140}^              ',
		},
		"StartAnimation" : {
			"text" : '                                                        '
		},
	},
	"es":
	{
		"defaultFontFace" : "Bear",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 80,
				"offsetY" : 30,
				"vGap" : 20,
			},
			// "text" : '{"specialFontSize" : 115, "specialAlign" : "left"}^CONGRATULATIONS\n{"specialFontSize" : 80, "vGap" : 80}^YOU WIN\n{}^*{"specialFontSize" : 150, "specialFill" : "#990100", "specialStroke" : "#faef01"}~15*\n{}^FREE SPINS'
			"text" : '{}^freespins+JUEGOS GRATIS\n{"vGap": 10, "specialFontSize" : 80, "padding" : 80}^GANADOS\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false, "vGap" : 90}^S  MBOLOS\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^ESPECIALES\n{"align" : "left", "padding": 140, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^DE EXPANSI  N'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 55,
				"offsetY" : 100,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 100}^ENHORABUENA\n{"specialFontSize" : 40, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^USTED HA ACCIONADO NUEVAMENTE LA ATRACCI  N\n{"specialFontSize" : 80, "vGap" : 0}^freespins+  JUEGOS GRATIS\n{"specialFontSize" : 70, "vGap" : 40}^ADICIONALES\n{"specialFontSize" : 70, "specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false}^HAN SIDO GANADOS'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#00db2e",
				"strokeStyle" : "#fff",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^GANANCIA\n{"vGap" : 20, "specialFontSize" : 140}^TOTAL',
			//"specialFill" : "#4edbfe", "specialStroke" : "#001e47", "specialShadow" : false
		},
		"StartAnimation" : {
			"text" : 'PRESIONE INICIO PARA COMENZAR'
		},
	}
}
