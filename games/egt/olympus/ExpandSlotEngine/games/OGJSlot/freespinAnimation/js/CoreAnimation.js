View("CoreAnimation",
{
	ANIMATION_COMPLETE: "animationComplete",
	INTRO_IN_ENDED:  "introInEnded",
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
			var settings = GameSettings.getInstance();
			var language = this._config.language;
			this._animation = cssClass;
			this._config = config;
			this._defaultSettings = FreeSpinTranslations.defaultSettings;
			this._textLinesArray = [];
			this._isWaitingForFont = false;
			this._isFontLoaded = false;


			var x = this._defaultSettings.x;
			var y = this._defaultSettings.y;
			var width = this._defaultSettings.width;
			var height = this._defaultSettings.height;

			this._img = Loader.getLoader(settings.engineType+'/games/'+settings.gameType+'/freespinAnimation/images/sp_bgr.jpg').getData();
			
			this._background = new CanvasView("", x, y);
			this._background.setSize(width, height);
			this._context = this._background.getContext2D();
			this.addChild(this._background);

			this._blackRect = {x:0,y:0,width: width, height: height,opacity:0};

			WebFont.load({
			  custom: {
			    families: [ FreeSpinTranslations[language].defaultFontFace, this._defaultSettings.numberFontFace ]
			  },
			  	loading: function() {},
  				active: function() {
  					self._isFontLoaded = true;
					createAndPositionLinesForScreen.call(self, self._config.translations, self._config.valueText);
  					if(self._isWaitingForFont)
  					{
  						startDrawingText.call(self);
  					}
  				}
			});

			TweenMax.to(this._blackRect, 0.8 , {opacity:1, ease : Quad.easeInOut,
				onUpdate : function() {
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete : function() {
					self._onFadeInComplete();
				}
			});
		},
		_onFadeInComplete: function()
		{
			var self = this;

			if(this._isFontLoaded)
			{
				startDrawingText.call(this);
			}
			else
			{
				this._isWaitingForFont = true;
			}
		},
		_onWaitingForFadeOut: function() {
			this.dispatchEvent(new Event("refreshScreen"));
		},

		startFadeOut: function() 
		{
			var self = this;
			var soundManager = SoundManager.getInstance();
			
			this._context.drawImage(this._img, this._blackRect.x, this._blackRect.y);
			this._drawText();

			TweenMax.to(this._blackRect, 0.8 , {opacity:1, ease: Quad.easeInOut,
				onUpdate : function() {
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.drawImage(self._img, self._blackRect.x, self._blackRect.y);
					self._drawText();
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete : function() {
					self._onFadeOutComplete();
				}
			});
		},

		_onFadeOutComplete: function()
		{
			var self = this;

			TweenMax.to(this._blackRect, 0.8 , {opacity:0, ease: Quad.easeInOut,
				onUpdate : function() {
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete : function() {
					self.dispatchEvent(new Event(CoreAnimation.ANIMATION_COMPLETE));
				}
			});
		},
		_drawText: function() {
			for (var i = 0; i < this._textLinesArray.length; i++) {
				shadowText.call(this, this._textLinesArray[i].text, this._textLinesArray[i].font, 
									this._textLinesArray[i].x, this._textLinesArray[i].y, 
									this._textLinesArray[i].fill, this._textLinesArray[i].stroke, this._textLinesArray[i].shadow);
			}
		}
	};

	function startDrawingText() {
		var self = this;

		TweenMax.to(this._blackRect, 0.8 , {opacity:0, ease: Quad.easeInOut,
			onUpdate : function() {
				self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				self._context.drawImage(self._img, self._blackRect.x, self._blackRect.y);
				self._drawText();
				self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
				self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
			},
			onComplete : function() {
				self._onWaitingForFadeOut();
			}
		});
	}

	function createAndPositionLinesForScreen(translations, valueText) {
		var self = this;

		// Set some default variables
		var offsetY = translations.settings.offsetY;
		var hGap = this._defaultSettings.hGap;
		var fillStyle;
		var strokeStyle;
		var align;

		// Get the number of freespins
		var freespins = this._config.message ? this._config.message.freeSpins : 15;

  		// Special font weight and face for numbers
  		var numberFontWeight = this._defaultSettings.numberFontWeight;
  		var numberFontFace = this._defaultSettings.numberFontFace;

  		// The size of the value text in Outro animation
  		var valueFontSize = this._defaultSettings.valueFontSize;

  		// Setting default canvas properties
		self._context.textBaseline = this._defaultSettings.textBaseline;
		self._context.lineWidth = this._defaultSettings.lineWidth;
		self._context.lineCap = this._defaultSettings.lineCap;
		self._context.lineJoin = this._defaultSettings.lineJoin;
		setFont.call(this);

		// Get the text from translations and split it to lines
		var text = translations.text;
		var lines = text.split("\n");

		// Loop through each line of the text
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i].split("^");
			var jsonItem = JSON.parse(line[0]);
			var textItem = line[1];
			var measuredText = 0;
			var x = 0;
			var vGap = translations.settings.vGap;

			fontSize = translations.settings.baseFontSize;
			fillStyle = translations.settings.fillStyle;
			strokeStyle = translations.settings.strokeStyle;
			shadowStyle = this._defaultSettings.shadowStyle;

			// Some line text could have different font size
			if (typeof(jsonItem.specialFontSize) !== 'undefined') {
				fontSize = jsonItem.specialFontSize;
			}
			// Some line text could have different font fill
			if (typeof(jsonItem.specialFill) !== 'undefined') {
				fillStyle = jsonItem.specialFill;
			}
			// Some line text could have different font stroke
			if (typeof(jsonItem.specialStroke) !== 'undefined') {
				strokeStyle = jsonItem.specialStroke;
			}
			// Some line text could not have shadow
			if (typeof(jsonItem.specialShadow) !== 'undefined') {
				shadowStyle = jsonItem.specialShadow;
			}
			// The gap between current line and next one
			if (typeof(jsonItem.vGap) !== 'undefined') {
				vGap = jsonItem.vGap;
			}

			var padding = 0;

			setFont.call(this, fontSize);

			// This is set only for 'Special Expanding Symbol' text
			if (typeof(jsonItem.align) !== 'undefined' || typeof(jsonItem.padding) !== 'undefined') {
				padding = jsonItem.padding;
				if (jsonItem.align == "left")
					x = 0 + padding;
				else if (jsonItem.align == "right")
					x = this._context.canvas.width - this._context.measureText(textItem).width + padding;
				else
					x = (this._context.canvas.width - this._context.measureText(textItem).width)/2 + padding; 
			}
			else
				x = (this._context.canvas.width - this._context.measureText(textItem).width)/2 + padding;

			// Calculate the x starting point if freespins number is with other text at any position: left, middle, right
			// The line text have to be aligned in the center!!!
			if (textItem.indexOf("freespins") !== -1) {
				if (textItem.length !== "freespins".length) {
					var freespinsLine = textItem.split("+");
					var xPositions = calculateFreespinsX.call(this, freespins, freespinsLine, this._defaultSettings.numberFontSize, fontSize);

					// The y point for the line have to be equal to freespin number font size
					if (i == 0)
						offsetY += fontSize > this._defaultSettings.numberFontSize ? fontSize : this._defaultSettings.numberFontSize;
					else
						offsetY += (fontSize > this._defaultSettings.numberFontSize ? fontSize : this._defaultSettings.numberFontSize) + vGap;

					for (var j = 0; j < freespinsLine.length; j++) {
						if (freespinsLine[j] == "freespins") {
							this._textLinesArray.push({ text: freespins, 
														font: setFont.call(this, this._defaultSettings.numberFontSize), 
														fill: this._defaultSettings.numberFillStyle, 
														stroke: this._defaultSettings.numberStrokeStyle, shadow: this._defaultSettings.numberShadow, 
														x: xPositions[j] + padding, y: this._defaultSettings.numberOffsetY ? this._defaultSettings.numberOffsetY + offsetY : offsetY});
						} else {
							this._textLinesArray.push({ text: freespinsLine[j], 
														font: setFont.call(this, fontSize), 
														fill: fillStyle, 
														stroke: strokeStyle, shadow: shadowStyle, 
														x: xPositions[j] + padding, y: offsetY});
						}
					}
				continue;
				} else {
					textItem = freespins;
					fontSize = this._defaultSettings.numberFontSize;
					fillStyle = this._defaultSettings.numberFillStyle;
					strokeStyle = this._defaultSettings.numberStrokeStyle;
					shadowStyle = this._defaultSettings.numberShadow;
					setFont.call(this, fontSize)
					x = (this._context.canvas.width - this._context.measureText(textItem).width)/2 + padding;
				}
			}

			// Calculate the y point for the line
			if (i == 0)
				offsetY += fontSize;
			else
				offsetY += fontSize + vGap;

			this._textLinesArray.push({text: textItem, font: setFont.call(this, fontSize), 
										fill: fillStyle, stroke: strokeStyle, shadow: shadowStyle, 
										x: x, y: offsetY});
			
			

		}

		// Enter only on Outro animation
		if (typeof(valueText) !== 'undefined') {
			var coordX = self._context.canvas.clientWidth/2;
			var value;
			var currency = "";
			numberFontFace = this._defaultSettings.numberFontFace;
			offsetY += valueFontSize + vGap;

			// Check if currency is supported
			if(this._config.currency)
			{
				value = Utils.formatNumber(valueText, 100, true);
				currency = this._config.currencyType;
			}
			else
				value = Utils.formatNumber(valueText, this._config.denomination);

			// Measure text to specify the starting point
			setFont.call(this, valueFontSize, numberFontWeight, numberFontFace);
			coordX -= (this._context.measureText(value).width/2 + hGap/2);

			if(this._config.currency)
			{
				setFont.call(this, valueFontSize/2, numberFontWeight);
				coordX -= this._context.measureText(currency).width/2;
			}

			// Push the properties to the array
			setFont.call(this, valueFontSize, numberFontWeight, numberFontFace);
			this._textLinesArray.push({text: value, font: setFont.call(this, valueFontSize, numberFontWeight, numberFontFace), 
											fill: this._defaultSettings.valueFillStyle, stroke: this._defaultSettings.valueStrokeStyle,
											shadow: this._defaultSettings.valueShadowStyle, x: coordX, y: offsetY});
			if(this._config.currency)
			{
				coordX += this._context.measureText(value).width + hGap;

				setFont.call(this, valueFontSize/2, numberFontWeight);
				this._textLinesArray.push({text: this._config.currencyType, font: setFont.call(this, valueFontSize/2, numberFontWeight, numberFontFace), 
												fill: this._defaultSettings.valueFillStyle, stroke: this._defaultSettings.valueStrokeStyle,
												shadow: this._defaultSettings.valueShadowStyle, x: coordX, y: offsetY});
			}
		}
	}

	function calculateFreespinsX(freespins, textLine, numberFontSize, regularFontSize) {
		var x = [];
		var measuredText = 0;

		for (var i = 0; i < textLine.length; i++) {
			if (textLine[i] == "freespins") {
				setFont.call(this, numberFontSize);
				measuredText += this._context.measureText(freespins).width;
			} else {
				setFont.call(this, regularFontSize);
				measuredText += this._context.measureText(textLine[i]).width;
			}
		}

		measuredText += (textLine.length - 1)*this._defaultSettings.hGap;

		for (var j = 0; j < textLine.length; j++) {
			if (j == 0) {
				x.push((this._context.canvas.width  - measuredText)/2);
			} else {
				if (textLine[j - 1] == "freespins") {
					setFont.call(this, numberFontSize);
					x.push(x[j - 1] + this._context.measureText(freespins).width + this._defaultSettings.hGap);
				} else {
					setFont.call(this, regularFontSize);
					x.push(x[j - 1] + this._context.measureText(textLine[j - 1]).width + this._defaultSettings.hGap);
				}
				
			}
		}

		return x;
	}

	function setFont(fontSize, fontWeight, fontFace) {
		var language = this._config.language;
		if (fontWeight == null) {
			fontWeight = this._defaultSettings.fontWeight;
		}
		if (fontSize == null) {
			fontSize = this._defaultSettings.fontSize;
		}
		if (fontFace == null) {
			fontFace = FreeSpinTranslations[language].defaultFontFace;
		}
	
		return this._context.font = fontWeight + " " + fontSize + "px " + fontFace;
	}

	function shadowText(text, font, x, y, fill, stroke, shadow) {
		var self = this;
		var freespins = this._config.message ? this._config.message.freespins : 15;
		
		this._context.textAlign = "left";
		this._context.lineWidth = this._defaultSettings.lineWidth + this._defaultSettings.shadowLineWidth;
  		this._context.font = font;
		this._context.fillStyle = fill;
		if (shadow) {
			this._context.shadowColor = shadow;
			this._context.shadowBlur = this._defaultSettings.shadowBlur;
	  		this._context.strokeStyle = shadow;
			this._context.strokeText(text, x, y);			
		}

		this._context.shadowBlur = 0;
		this._context.lineWidth = this._defaultSettings.lineWidth + 4;
  		this._context.strokeStyle = stroke;
		this._context.strokeText(text, x - 1, y - 1);
		this._context.fillText(text, x - 1, y - 1);

	}

	return p;
})());