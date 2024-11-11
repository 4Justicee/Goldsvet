   var FreeSpinTranslations =
{
	"defaultSettings" : {
		"width"				: 1280,
		"height"			: 720,

		/* Special Expand symbol properties */
		"specialExpandX"	: 960,
		"specialExpandY"	: 380,
		"specialOffsetX"	: -40,
		"offsetLanguages"	: ['en', 'nl', 'fr'],
		"specialExpandScale": 1.2,

		/* Special Expand rectangle colors */
		"specialStrokeWidth" : 3,
		"colors" : ["#fffcb7", "#322409", "#ed4414", "transparent"],

		"fontWeight" : "900",
		"fontSize" : 70,
		"numberFontWeight" : "900",
		"numberFontFace" : "Bear",
		"valueFontSize" : 120,
		"valueFillStyle" : "#ff8200",
		"valueStrokeStyle" : "#fffba7",
		"valueShadowStyle" : "#37282b",
		"shadowStyle" : "#000",
		"shadowBlur" : 1,
		"shadowLineWidth" : 12,
		"lineWidth" : 5,
		"lineCap" : "round",
		"lineJoin" : "round",
		"textBaseline" : "alphabetic",
		"hGap" : 30,

		/* Numbers */
		"numberFontSize" : 180,
		"numberFillStyle" : "#ff8200",
		"numberStrokeStyle" : "#fffba7",
		"numberShadow" : "#37282b",
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
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 110,
				"offsetY" : 0,
				"vGap" : 20,
			},
			"text" : '{}^freespins+ FREE SPINS\n{"vGap": 10, "specialFontSize" : 100, "padding" : 60}^WON\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 60}^SPECIAL\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^EXPANDING\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^SYMBOL'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 50,
				"offsetY" : 40,
				"vGap" : 30,
			},
			"text" : '{"specialFontSize" : 110}^CONGRATULATIONS\n{"vGap" : 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^YOU HAVE RETRIGGERED THE FEATURE\n{"specialFontSize" : 90, "vGap" : 0, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^ADDITIONAL+freespins\n{"specialFontSize" : 90, "vGap" : 40, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^FREE SPINS\n{"specialFontSize" : 70, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^ARE AWARDED'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^TOTAL\n{"vGap" : 20, "specialFontSize" : 140, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^WIN',

		},
		"StartAnimation" : {
			"text" : 'Press START to begin'
		},
	},
	"bg":
	{
		"defaultFontFace" : "Tahoma,Geneva,Kalimati,sans-serif",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 80,
				"offsetY" : 0,
				"vGap" : 20,
			},
			"text" : '{}^                       +freespins\n{"vGap": 10, "specialFontSize" : 60, "padding" : -62}^                         \n{"specialFontSize" : 80, "align" : "left", "padding": 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 100}^                  \n{"specialFontSize" : 80, "align" : "left", "padding": 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                     \n{"specialFontSize" : 80, "align" : "left", "padding": 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^            '
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 50,
				"offsetY" : 50,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 110}^                        \n{"specialFontSize" : 75, "vGap" : 30, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                           \n{"specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                        \n{"specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^freespins\n{"vGap" : 40, "specialFontSize" : 80, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                         '
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^        \n{"vGap" : 20, "specialFontSize" : 140, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^              ',

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
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 80,
				"offsetY" : 0,
				"vGap" : 20,
			},
			"text" : '{}^                     +freespins\n{"vGap": 10, "specialFontSize" : 60, "padding" : -62}^                         \n{"specialFontSize" : 60, "align" : "left", "padding": 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 130}^                      \n{"specialFontSize" : 60, "align" : "left", "padding": 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                          \n{"specialFontSize" : 60, "align" : "left", "padding": 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^            '
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 50,
				"offsetY" : 50,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 110}^                      \n{"specialFontSize" : 75, "vGap" : 30, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                     \n{"specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                            \n{"specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^freespins\n{"vGap" : 40, "specialFontSize" : 80, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                         '
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 120,
				"offsetY" : 140,
				"vGap" : 70,
			},
			"text" : '{}^          \n{"vGap" : 20, "specialFontSize" : 100, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^              ',

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
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 110,
				"offsetY" : 0,
				"vGap" : 20,
			},
			"text" : '{}^freespins+ FREE SPINS\n{"vGap": 10, "specialFontSize" : 80, "padding" : 65}^GEWONNEN\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 60}^SPECIAAL\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^VERGROOT\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^SYMBOOL'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 50,
				"offsetY" : 70,
				"vGap" : 30,
			},
			"text" : '{"specialFontSize" : 110}^GEFELICITEERD\n{"vGap" : 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^U HEBT DE FUNCTIE\n{"specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^NOGMAALS GEACTIVEERD\n{"specialFontSize" : 90, "vGap" : -30, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^U KRIJGT+freespins+EXTRA\n{"vGap" : 50, "specialFontSize" : 90, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^FREE SPINS'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^TOTALE\n{"vGap" : 20, "specialFontSize" : 140, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^WINST',

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
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 80,
				"offsetY" : 0,
				"vGap" : 20,
			},
			"text" : '{}^freespins+PARTIES GRATUITES\n{"vGap": 25, "specialFontSize" : 70, "padding" : 65}^GAGN  ES\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 60}^SYMBOLE\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^EXPANSIF\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^SP  CIAL'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 50,
				"offsetY" : 80,
				"vGap" : 30,
			},
			"text" : '{"specialFontSize" : 110}^F  LICITATIONS\n{"vGap" : 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^VOUS AVEZ RED  CLENCH  \n{"specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^LA FONCTION\n{"specialFontSize" : 90, "vGap" : -30, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^freespins+PARTIES GRATUITES\n{"padding" : 60, "specialFontSize" : 70, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^SUPPL  MENTAIRES'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^GAIN\n{"vGap" : 20, "specialFontSize" : 140, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^TOTAL',

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
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 65,
				"offsetY" : 0,
				"vGap" : 20,
			},
			"text" : '{}^freespins+                                       \n{"vGap": 25, "specialFontSize" : 70, "padding" : 65}^                \n{"specialFontSize" : 75, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 75}^                    \n{"specialFontSize" : 75, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                        \n{"specialFontSize" : 75, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^            '
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 50,
				"offsetY" : 50,
				"vGap" : 20,
			},
			"text" : '{"specialFontSize" : 110}^                \n{"vGap" : 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                                            \n{"specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                                        \n{"specialFontSize" : 90, "vGap" : -30, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^                        +freespins\n{"specialFontSize" : 70, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 50}^                                       '
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^            \n{"vGap" : 20, "specialFontSize" : 140, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^              ',

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
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 110,
				"offsetY" : 0,
				"vGap" : 20,
			},
			"text" : '{}^freespins+ JUEGOS GRATIS\n{"vGap": 10, "specialFontSize" : 100, "padding" : 60}^GANADOS\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 60}^S  MBOLOS\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^ESPECIALES\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^DE EXPANSI  N'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 50,
				"offsetY" : 40,
				"vGap" : 30,
			},
			"text" : '{"specialFontSize" : 110}^ENHORABUENA\n{"vGap" : 50, "specialFontSize":40, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^USTED HA ACCIONADO NUEVAMENTE LA ATRACCI  N\n{"specialFontSize" : 90, "vGap" : 0, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^freespins+  JUEGOS GRATIS\n{"specialFontSize" : 90, "vGap" : 40, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^ADICIONALES\n{"specialFontSize" : 70, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^HAN SIDO GANADOS'
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^GANANCIA\n{"vGap" : 20, "specialFontSize" : 140, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^TOTAL',

		},
		"StartAnimation" : {
			"text" : 'PRESIONE INICIO PARA COMENZAR'
		},
	},
	"ro":
	{
		"defaultFontFace" : "Tahoma,Geneva,Kalimati,sans-serif",
		"IntroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 80,
				"offsetY" : 0,
				"vGap" : 20,
			},
			"text" : '{}^freespins+ROTIRI GRATUITE\n{"vGap": 25, "specialFontSize" : 70, "padding" : 65}^AU C    TIGAT\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 60}^SIMBOL\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^EXTENSIBIL\n{"specialFontSize" : 80, "align" : "left", "padding": 75, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^SPECIAL'
		},
		"RetriggerAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 50,
				"offsetY" : 80,
				"vGap" : 30,
			},
			"text" : '{"specialFontSize" : 110}^Felicit  ri\n{"vGap" : 50, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^A  I REDECLAN  AT\n{"specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^FUNC  IA\n{"specialFontSize" : 85, "vGap" : -30, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^freespins+ROTIRI GRATUITE\n{"padding" : 45, "specialFontSize" : 55, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601", "vGap" : 45}^ADI  IONALE AU FOST ACORDATE '
		},
		"OutroAnimation" : {
			"settings" : {
				"fillStyle" : "#f5ad00",
				"strokeStyle" : "#b02a02",
				"baseFontSize" : 160,
				"offsetY" : 100,
				"vGap" : 70,
			},
			"text" : '{}^TOTAL\n{"vGap" : 20, "specialFontSize" : 140, "specialFill" : "#ffeb00", "specialStroke" : "#0a436b", "specialShadow" : "#f45601"}^C    TIG',

		},
		"StartAnimation" : {
			"text" : 'Ap  sa  i pe START pentru a   ncepe'
		}
	}
}
