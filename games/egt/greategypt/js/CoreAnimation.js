View("CoreAnimation",
{
	ANIMATION_COMPLETE: "animationComplete",
	/* TYPES */
	NUMBER:     1,
	VALUE :     2,
	/* PROPERTIES */
	FONT_FACE:      1,
	FONT_STYLE:     2,
	FONT_WEIGHT:    3,
	FONT_SIZE:      4,
	FILL_STYLE:     5,
	STROKE_STYLE:   6,
	SHADOW_STYLE:   7,
	STROKE_WIDTH:   8,
	SHADOW_WIDTH:   9,
	SHADOW_ALPHA: 	10,
	SHADOW_POS: 	11,
	SHADOW_BLUR: 	12
},
(function()
{
	var p = 
	{
		init: function(cssClass,config)
		{
			this._super();
			var self = this;
			this._animation = cssClass;
			this._config = config;
			var settings = GameSettings.getInstance();
			var language = this._config.language;
			this._defaultSettings = FreeSpinTranslations.defaultSettings;
			this._textLinesArray = [];
			this._sound = null;
			
			this._img = Loader.getLoader(settings.engineType+'/games/'+settings.gameType+'/freespinAnimation/images/sp_bgr.png').getData();

			this._background = new CanvasView("", (this._defaultSettings.width - this._defaultSettings.fsBGWidth)/2, (this._defaultSettings.height - this._defaultSettings.fsBGHeight)/2 + this._defaultSettings.fsBGOffsetY);
			this._background.setSize(this._defaultSettings.fsBGWidth, this._defaultSettings.fsBGHeight);
			this._context = this._background.getContext2D();
			this.addChild(this._background);

			WebFont.load({
			  custom: {
				families: [ "Bear" ]
			  },
				loading: function() {},
				active: function() {
					createAndPositionLinesForScreen.call(self);
					self._context.drawImage(self._img,0,0);
					self._drawText();
				}
			});

			this._onComplete();
		},
		_onComplete: function(time)
		{
			var self = this;
			if (time)
				setTimeout(function(){self._onEnd();}, time);
		},

		_onEnd: function() {
			SoundManager.getInstance().stop(this._sound);
			this.dispatchEvent(new Event(CoreAnimation.ANIMATION_COMPLETE));
		},

		_drawText: function() {
			for (var i = 0; i < this._textLinesArray.length; i++) {
				shadowText.call(this, 	this._textLinesArray[i].type, 
										this._textLinesArray[i].text, 
										this._textLinesArray[i].x, 
										this._textLinesArray[i].y, 
										this._textLinesArray[i].scale
										);
			}
		}
	};
	function createAndPositionLinesForScreen() {
		var translations = this._config.translations;
		var settings = this._defaultSettings;
		var language = this._config.language;

		// Set value and currency parameters
		var value;
		var currency = "";

		// Check if currency is supported
		if(this._config.currency)
		{
			value = Utils.formatNumber(this._config.valueText, 100, true);
			currency = this._config.currencyType;
		}
		else
			value = Utils.formatNumber(this._config.valueText, this._config.denomination);

		// Set some default variables
		var vGap = this._defaultSettings.vGap ? this._defaultSettings.vGap : 0;

		this._context.lineCap = settings.lineCap;
		this._context.lineJoin = settings.lineJoin;

		// Get the text from translations and split it to lines
		var text = translations.text;
		var lines = text.split("\n");

		var canvasWidth = this._context.canvas.width;
		var canvasHeight = this._context.canvas.height;

		var coordX = 0;
		var coordY = canvasHeight;

		var textWidth = 0;
		var textHeight = 0;

		var first = true;
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].indexOf("freeSpins") != -1) {
				if (!first)
					coordY -= (getProperty.call(this, CoreAnimation.FONT_SIZE, CoreAnimation.NUMBER) + vGap);
			} else if (lines[i].indexOf("multiplier") != -1) {
				if (!first)
					coordY -= (getProperty.call(this, CoreAnimation.FONT_SIZE, CoreAnimation.NUMBER) + vGap);
			} else if (lines[i].indexOf("total") != -1) {
				if (!first)
					coordY -= (getProperty.call(this, CoreAnimation.FONT_SIZE, CoreAnimation.VALUE) + vGap);
			} else {
				if (!first)
					coordY -= (getProperty.call(this, CoreAnimation.FONT_SIZE) + vGap);
			}
			first = false;
		}

		coordY /= 2;
		coordY += getProperty.call(this, CoreAnimation.FONT_SIZE)/2;
		coordY += (settings.offset && this._animation == 'introAnimation') ? settings.offset : 0;

		first = true;
		for (i = 0; i < lines.length; i++) {
			if (lines[i].indexOf("freeSpins") != -1) {
				if (!first)
					coordY += getProperty.call(this, CoreAnimation.FONT_SIZE, CoreAnimation.NUMBER) + vGap;
				// coordX = calculateStartingPoint.call(this, lines[i], "{freeSpins}", this._config.message.freeSpins);
				// pushToArray.call(this, coordX, coordY, lines[i], "{freeSpins}", this._config.message.freeSpins);
				coordX = calculateStartingPoint.call(this, lines[i], "{freeSpins}", this._config.message ? this._config.message.freeSpins : 15);
				pushToArray.call(this, coordX, coordY, lines[i], "{freeSpins}", this._config.message ? this._config.message.freeSpins : 15);
			} else if (lines[i].indexOf("multiplier") != -1) {
				if (!first)
					coordY += getProperty.call(this, CoreAnimation.FONT_SIZE, CoreAnimation.NUMBER) + vGap;
				coordX = calculateStartingPoint.call(this, lines[i], "{multiplier}", settings.multiplier);
				pushToArray.call(this, coordX, coordY, lines[i], "{multiplier}", settings.multiplier);
			} else if (lines[i].indexOf("total") != -1) {
				if (!first)
					coordY += getProperty.call(this, CoreAnimation.FONT_SIZE, CoreAnimation.VALUE) + vGap;
				// coordX = calculateStartingPoint.call(this, lines[i], "{total}", Utils.formatNumber(valueText, 100, true), this._config.currencyType);
				// pushToArray.call(this, coordX, coordY, lines[i], "{total}", Utils.formatNumber(valueText, 100, true), this._config.currencyType);
				coordX = calculateStartingPoint.call(this, lines[i], "{total}", value, currency);
				pushToArray.call(this, coordX, coordY, lines[i], "{total}", value, currency);
			} else {
				if (!first) 
					coordY += getProperty.call(this, CoreAnimation.FONT_SIZE) + vGap;

				if (this._animation == "outroAnimation" && (language == 'bg' || language == 'ru'))
					first = true; 

				coordX = calculateStartingPoint.call(this, lines[i], null, null, null, first);
				pushToArray.call(this, coordX, coordY, lines[i], null, null, null, first);
			}

			first = false;
		}
	}

	function pushToArray(x, y, text, splitter, value, currency, first) {
		var settings = this._defaultSettings;


		if (first == 'undefined')
			first = false;

		if (splitter != null){
			if (currency != null){
				this._textLinesArray.push({ type: getType.call(this, splitter), text: value, x: x, y: y });
				this._textLinesArray.push({ type: getType.call(this, splitter), text: currency, 
											x: x + measureText.call(this, value, getType.call(this, splitter)) + (settings.valueCurrencyGap ? settings.valueCurrencyGap : 20), 
											y: y, scale: (settings.currencyScale ? settings.currencyScale : 0.5) });
			} else {
				if (text.indexOf('{') == 0) {this._textLinesArray.push({ type: getType.call(this, splitter), text: value, x: x, y: y });
					this._textLinesArray.push({ type: null, text: text.split(splitter)[1], 
												x: x + measureText.call(this, value, getType.call(this, splitter)), 
												y: y });
				} else if (text.indexOf('}') == text.length - 1) {
					this._textLinesArray.push({ type: null, text: text.split(splitter)[0], x: x, y: y });
					this._textLinesArray.push({ type: getType.call(this, splitter), text: value, 
												x: x + measureText.call(this, text.split(splitter)[0]), 
												y: y });
				} else {
					this._textLinesArray.push({ type: null, text: text.split(splitter)[0], x: x, y: y });
					this._textLinesArray.push({ type: getType.call(this, splitter), text: value, 
												x: x + measureText.call(this, text.split(splitter)[0]), 
												y: y });
					this._textLinesArray.push({ type: null, text: text.split(splitter)[1], 
												x: x + measureText.call(this, text.split(splitter)[0]) + measureText.call(this, value, getType.call(this, splitter)), 
												y: y });
				}
			}
		} else {
			if (settings.introTitleScale != null && (this._animation == "introAnimation" || this._animation == "retriggerAnimation") && first) 
				this._textLinesArray.push({ type: null, text: text, x: x, y: y, scale: settings.introTitleScale });
			else if (settings.outroTitleScale != null && this._animation == "outroAnimation" && first) 
				this._textLinesArray.push({ type: null, text: text, x: x, y: y, scale: settings.outroTitleScale });
			else 
				this._textLinesArray.push({ type: null, text: text, x: x, y: y });
		}

	}

	function calculateStartingPoint(text, splitter, value, currency, first) {
		var settings = this._defaultSettings;
		var align = settings.textAlign;
		var coordX = this._context.canvas.width;
		var measuredText = 0;
		var padding = settings.padding ? settings.padding : 0;

		if (align == "left") {
			return 0 + padding;
		}

		if (first == 'undefined' || first == null)
			first = false;

		if (splitter != null) {
			if (currency != null) {
				measuredText += measureText.call(this, value, getType.call(this, splitter)) + 
								measureText.call(this, currency, getType.call(this, splitter), (settings.currencyScale ? settings.currencyScale : 0.5)) + 
								(settings.valueCurrencyGap ? settings.valueCurrencyGap : 20);
			} else {
				if (text.indexOf('{') == 0) {
					measuredText += measureText.call(this, value, getType.call(this, splitter)) + 
									measureText.call(this, text.split('}')[1]);
				} else if (text.indexOf('}') == text.length - 1) {
					measuredText += measureText.call(this, text.split('{')[0]) + 
									measureText.call(this, value, getType.call(this, splitter));
				} else {
					measuredText += measureText.call(this, text.split(splitter)[0]) + 
									measureText.call(this, value, getType.call(this, splitter)) + 
									measureText.call(this, text.split(splitter)[1]);
				}
			}
		} else {
			if (settings.introTitleScale != null && (this._animation == "introAnimation" || this._animation == "retriggerAnimation") && first) {
				measuredText += measureText.call(this, text, null, settings.introTitleScale);
			}
			else if (settings.outroTitleScale != null && this._animation == "outroAnimation" && first) {
				measuredText += measureText.call(this, text, null, settings.outroTitleScale);
			}
			else {
				measuredText += measureText.call(this, text);
			}
		}

		if (align == "right") {
			return this._context.canvas.width - measuredText - padding;
		} 

		return (coordX - measuredText)/2;
	}

	function measureText(text, type, scale) {
		setFont.call(this, getFont.call(this, type, scale));
		return this._context.measureText(text).width;
	}

	function getType(splitter) {
		if (splitter == "{freeSpins}" || splitter == "{multiplier}")
			return CoreAnimation.NUMBER;
		else if (splitter == "{total}")
			return CoreAnimation.VALUE;
		else
			return null;
	}

	function getFont(type, scale) {
		if (scale == null)
			scale = 1;

		return  getProperty.call(this, CoreAnimation.FONT_STYLE, type) + " " + 
				getProperty.call(this, CoreAnimation.FONT_WEIGHT, type) + " " + 
				getProperty.call(this, CoreAnimation.FONT_SIZE, type)*scale + "px " + 
				getProperty.call(this, CoreAnimation.FONT_FACE, type);
	}

	function setFont(font) {
		this._context.font = font;
	}

	function getProperty(property, type) {
		var settings = this._defaultSettings;
		var language = this._config.language;
		var translations = this._config.translations;

		switch(property) {
			case CoreAnimation.FONT_FACE:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueFontFace != null)
							return settings.valueFontFace;
					case CoreAnimation.NUMBER:
						if (settings.numberFontFace != null)
							return settings.numberFontFace;
					default:
						for (var i = 0; i < settings.cyrillicLanguages.length; i++)
							if (language == settings.cyrillicLanguages[i])
								return settings.cyrillicFontFace;
						if (settings.defaultFontFace != null)
							return settings.defaultFontFace;
						else
							return "Arial";
				}
				break;
			case CoreAnimation.FONT_STYLE:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueFontStyle != null)
							return settings.valueFontStyle;
					case CoreAnimation.NUMBER:
						if (settings.numberFontStyle != null)
							return settings.numberFontStyle;
					default:
						if (settings.fontStyle != null)
							return settings.fontStyle;
						else
							return "normal";
				}
				break;
			case CoreAnimation.FONT_WEIGHT:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueFontWeight != null)
							return settings.valueFontWeight;
					case CoreAnimation.NUMBER:
						if (settings.numberFontWeight != null)
							return settings.numberFontWeight;
					default:
						if (settings.fontWeight != null)
							return settings.fontWeight;
						else
							return "normal";
				}
				break;
			case CoreAnimation.FONT_SIZE:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueFontSize != null)
							return settings.valueFontSize;
						else if (settings.fontSize != null)
							return 1.5 * settings.fontSize;
						else
							return 1.5 * 50;
					case CoreAnimation.NUMBER:
						if (settings.numberFontSize != null)
							return settings.numberFontSize;
						else if (settings.fontSize != null)
							return 1.5 * settings.fontSize;
						else
							return 1.5 * 50;
					default:
						if (translations.fontSize != null)
							return translations.fontSize;
						else if (settings.fontSize != null)
							return settings.fontSize;
						else
							return 50;
				}
				break;
			case CoreAnimation.FILL_STYLE:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueFillStyle != null)
							return settings.valueFillStyle;
					case CoreAnimation.NUMBER:
						if (settings.numberFillStyle != null)
							return settings.numberFillStyle;
					default:
						if (settings.fillStyle)
							return settings.fillStyle;
						else
							return "white";
				}
				break;
			case CoreAnimation.STROKE_STYLE:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueStrokeStyle != null)
							return settings.valueStrokeStyle;
					case CoreAnimation.NUMBER:
						if (settings.numberStrokeStyle != null)
							return settings.numberStrokeStyle;
					default:
						if (settings.strokeStyle != null)
							return settings.strokeStyle;
						else
							return "black";
				}
				break;
			case CoreAnimation.SHADOW_STYLE:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueShadowStyle != null)
							return settings.valueShadowStyle;
					case CoreAnimation.NUMBER:
						if (settings.numberShadowStyle != null)
							return settings.numberShadowStyle;
					default:
						if (settings.shadowStyle != null)
							return settings.shadowStyle;
						else
							return "black";
				}
				break;
			case CoreAnimation.STROKE_WIDTH:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueStrokeWidth != null)
							return settings.valueStrokeWidth;
					case CoreAnimation.NUMBER:
						if (settings.numberStrokeWidth != null)
							return settings.numberStrokeWidth;
					default:
						if (settings.strokeWidth != null)
							return settings.strokeWidth;
						else
							return 2;
				}
				break;
			case CoreAnimation.SHADOW_WIDTH:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueShadowWidth != null)
							return settings.valueShadowWidth;
					case CoreAnimation.NUMBER:
						if (settings.numberShadowWidth != null)
							return settings.numberShadowWidth;
					default:
						if (settings.shadowWidth != null)
							return settings.shadowWidth;
						else if (settings.strokeWidth != null)
							return 1.5 * settings.strokeWidth;
						else
							return 1.5 * 2;
				}
				break;
			case CoreAnimation.SHADOW_ALPHA:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueShadowAlpha != null)
							return settings.valueShadowAlpha;
					case CoreAnimation.NUMBER:
						if (settings.numberShadowAlpha != null)
							return settings.numberShadowAlpha;
					default:
						if (settings.shadowAlpha != null)
							return settings.shadowAlpha;
						else
							return 1;
				}
				break;
			case CoreAnimation.SHADOW_POS:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueShadowPos != null)
							return settings.valueShadowPos;
					case CoreAnimation.NUMBER:
						if (settings.numberShadowPos != null)
							return settings.numberShadowPos;
					default:
						if (settings.shadowPos != null)
							return settings.shadowPos;
						else
							return {x: 0, y: 0};
				}
				break;
			case CoreAnimation.SHADOW_BLUR:
				switch(type) {
					case CoreAnimation.VALUE:
						if (settings.valueShadowBlur != null)
							return settings.valueShadowBlur;
					case CoreAnimation.NUMBER:
						if (settings.numberShadowBlur != null)
							return settings.numberShadowBlur;
					default:
						if (settings.shadowBlur != null)
							return settings.shadowBlur;
						else
							return 0;
				}
				break;
		}
	}

	function shadowText(type, text, x, y, scale) {
		var settings = this._defaultSettings;

		this._context.font = getFont.call(this, type, scale);
		this._context.globalAlpha = getProperty.call(this, CoreAnimation.SHADOW_ALPHA, type);
		this._context.shadowBlur = getProperty.call(this, CoreAnimation.SHADOW_BLUR, type);
		this._context.shadowColor = getProperty.call(this, CoreAnimation.SHADOW_STYLE, type);
		this._context.strokeStyle = getProperty.call(this, CoreAnimation.SHADOW_STYLE, type);
		this._context.fillStyle = getProperty.call(this, CoreAnimation.SHADOW_STYLE, type);
		this._context.lineWidth = getProperty.call(this, CoreAnimation.SHADOW_WIDTH, type);

		
		if (getProperty.call(this, CoreAnimation.SHADOW_BLUR, type) == 0) {	
			this._context.shadowOffsetX = 0;
			this._context.shadowOffsetY = 0;
			this._context.strokeText(text, x + getProperty.call(this, CoreAnimation.SHADOW_POS, type).x, y + getProperty.call(this, CoreAnimation.SHADOW_POS, type).y);
		} 
		else {
			this._context.shadowOffsetX = getProperty.call(this, CoreAnimation.SHADOW_POS, type).x;
			this._context.shadowOffsetY = getProperty.call(this, CoreAnimation.SHADOW_POS, type).y;
			this._context.fillText(text, x, y);
		}

		this._context.shadowBlur = 0;
		this._context.shadowColor = null;
		this._context.shadowOffsetX = 0;
		this._context.shadowOffsetY = 0;
		this._context.globalAlpha = 1;
		this._context.lineWidth = getProperty.call(this, CoreAnimation.STROKE_WIDTH, type);
		this._context.strokeStyle = getProperty.call(this, CoreAnimation.STROKE_STYLE, type);
		this._context.strokeText(text, x, y);
		this._context.fillStyle = getProperty.call(this, CoreAnimation.FILL_STYLE, type);
		this._context.fillText(text, x, y);
	}

	return p;
})());