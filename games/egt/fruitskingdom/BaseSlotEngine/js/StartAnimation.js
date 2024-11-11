Button("StartAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			this._super("startView", 183, 80);
			this.settings = GameSettings.getInstance();
			this.addClass(config.language);
			this._pressStartSound = SoundManager.getInstance().play("pressStartSound",true);
			if(!this._pressStartSound)			
				SoundManager.getInstance().addEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);
		

			this.blinkingInterval=700;

			// IntroAnimation
			this._config = config;
			this._config.translations = FreeSpinTranslations[this._config.language].IntroAnimation;

			// DoorAnimation
			var self = this;
			var settings = GameSettings.getInstance();
			var language = this._config.language;
			this._defaultSettings = FreeSpinTranslations.defaultSettings;
			this._textLinesArray = [];

			this._sound;

			this.haveBlinkingText = false;
			this.blinkingTextIsShown = true;
			this.blinkingTextSetTimeOut;

			this._background = new CanvasView("", 0, 0);
			this.backgroundWidth = 925;
			this.backgroundHeight = 571;
			this._background.setSize(this.backgroundWidth, this.backgroundHeight);
			this._context = this._background.getContext2D();
			this.addChild(this._background);
			


			this._img = Loader.getLoader(settings.engineType+'/games/'+settings.gameType+'/freespinAnimation/images/sp_bgr.png').getData();

			WebFont.load({
				custom: {
					families: [FreeSpinTranslations[language].defaultFontFace,FreeSpinTranslations.defaultSettings.numberFontFace]
				},
				loading: function() {},
				active: function() {
					createAndPositionLinesForScreen.call(self, self._config.translations, self._config.valueText);					
					 // self._context.clearRect(0, 0, self.backgroundWidth, self.backgroundHeight);
					 self._onShowIntroTextAsStartWithBlinking();
				}
			});
		},

		_onShowIntroTextAsStartWithBlinking: function()
		{
			var self = this;
			self._context.shadowBlur = null;
			// self._context.lineWidth = self._defaultSettings.lineWidth;
			self._context.clearRect(0, 0, self.backgroundWidth, self.backgroundHeight);
			self._context.drawImage(self._img,0,0);

			self._drawTextBlinking();

			if(this.haveBlinkingText){
				this.blinkingTextSetTimeOut = setTimeout(function(){
					self.blinkingTextIsShown = !self.blinkingTextIsShown;
					self._onShowIntroTextAsStartWithBlinking();					
				}, self.blinkingInterval);
			}

			
		},

		_drawTextBlinking: function() {
			for (var i = 0; i < this._textLinesArray.length; i++) {
				if(!this._textLinesArray[i].isBlinkimg ){
					shadowText.call(this, this._textLinesArray[i].text, this._textLinesArray[i].align, this._textLinesArray[i].font,
						this._textLinesArray[i].x, this._textLinesArray[i].y,
						this._textLinesArray[i].fill, this._textLinesArray[i].stroke,
						this._textLinesArray[i].shadowColor, this._textLinesArray[i].hasNoStroke);
					
				}else if(this.blinkingTextIsShown){
					shadowText.call(this, this._textLinesArray[i].text, this._textLinesArray[i].align, this._textLinesArray[i].font,
						this._textLinesArray[i].x, this._textLinesArray[i].y,
						this._textLinesArray[i].fill, this._textLinesArray[i].stroke,
						this._textLinesArray[i].shadowColor, this._textLinesArray[i].hasNoStroke);
				}
					
			}
		},

		dispose:function ()
		{	
			var self=this;
			// TODO STOP setTimeout
			if(this.haveBlinkingText){
				this.haveBlinkingText = false;

				clearTimeout(self.blinkingTextSetTimeOut);
			}
			SoundManager.getInstance().removeEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);
			SoundManager.getInstance().stop(this._pressStartSound);
		}

	};
	
	function onSoundLoaded(event)
	{
		if(event.data.soundIndex == 5)
			this._pressStartSound = SoundManager.getInstance().play("pressStartSound",true);
	}


	function createAndPositionLinesForScreen(translations, valueText) {
		var self = this;
		var translations = translations;

		// Set some default variables
		var offsetY = this._defaultSettings.offsetY;
		var lineHeight = this._defaultSettings.lineHeight;
		var hGap = this._defaultSettings.hGap;
		var beginRowOffset = this._defaultSettings.beginRowOffset;
		var numberOffsetY = this._defaultSettings.numberOffsetY;
		var hasNoStroke = false;
		var hasSecondStroke = true;
		var isBlinkimg = false;
		var fillStyle;
		var strokeStyle;
		var shadowColor;


		// Special font weight and face for numbers
		var numberFontWeight = this._defaultSettings.numberFontWeight;
		var numberFontFace = this._defaultSettings.numberFontFace;

		// The size of the value text in Outro animation
		var valueFontSize = this._defaultSettings.valueFontSize;
		var specialFontFaceOutroNumb = this._defaultSettings.specialFontFaceOutroNumb;
		var strokesArr = [];

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
			var vGap = translations.settings.vGap;
			var fontSize = translations.settings.baseFontSize;
			var font = FreeSpinTranslations[this._config.language].defaultFontFace;

			fillStyle = translations.settings.fillStyle;
			
			if(typeof(jsonItem.offsetY) !== 'undefined'){
				offsetY = jsonItem.offsetY;
			}

			// Some line text could have different font size
			if (typeof(jsonItem.specialFontSize) !== 'undefined') {
				fontSize = jsonItem.specialFontSize;
			}			

			if (typeof(jsonItem.specialFontFace) !== 'undefined') {
				font = jsonItem.specialFontFace;
			}

			//add specialFill
			if (typeof(jsonItem.specialFill) !== 'undefined') {				
				fillStyle = jsonItem.specialFill;				
			}

			//hasNoStroke
			if (typeof(jsonItem.hasNoStroke) !== 'undefined') {
				hasNoStroke = jsonItem.hasNoStroke;
			}			

			//hasSecondStroke			
			if (typeof(jsonItem.hasSecondStroke) !== 'undefined') {
				hasSecondStroke = jsonItem.hasSecondStroke;
			}
			//isBlinking
			if (typeof(jsonItem.isBlinkimg) !== 'undefined') {
				isBlinkimg = jsonItem.isBlinkimg;
				if(jsonItem.isBlinkimg==true){
					this.haveBlinkingText = true;
				}
			}

			// hGap
			if (typeof(jsonItem.hGap) !== 'undefined') {
				fontSize = jsonItem.hGap;
			}

			if (typeof(jsonItem.strokeStyle) !== 'undefined') {
				strokeStyle = jsonItem.strokeStyle;
			}

			if (typeof(jsonItem.fillStyle) !== 'undefined') {
				fillStyle = jsonItem.fillStyle;
			}

			if (typeof(jsonItem.shadowColor) !== 'undefined') {
				shadowColor = jsonItem.shadowColor;
			}

			if (typeof(jsonItem.numberOffsetY) != 'undefined') {
				numberOffsetY = jsonItem.numberOffsetY;
			}else{
				numberOffsetY=0;
			}

			// beginRowOffset
			if (typeof(jsonItem.beginRowOffset) != 'undefined') {
				beginRowOffset = jsonItem.beginRowOffset;
			}else{
				beginRowOffset=0;
			}

			// The gap between current line and next one
			if (typeof(jsonItem.vGap) !== 'undefined') {
				vGap = jsonItem.vGap;
			}

			// Enter here if text line has a number in it
			if (textItem.indexOf("*") != -1) {
				self._context.textAlign = "left";
				var numberFirst = false;
				var numberLast = false;

				var specialLine = textItem.split("*");

				// Loop through each part of the line with number to calculate the width of the text
				for (var j = 0; j < specialLine.length; j++) {
					if (specialLine[j].indexOf("~") != -1) {
						var numberText = specialLine[j].split("~");
						var jsonItemNumber = JSON.parse(numberText[0]);
						var number = numberText[1];

						// Numer could have different font size
						if (typeof(jsonItemNumber.specialFontSize) != 'undefined') {
							fontSize = jsonItemNumber.specialFontSize;
						}

						if (typeof(jsonItemNumber.hGap) != 'undefined') {
							hGap = jsonItemNumber.hGap;
						}


						//hasNoStroke
						if (typeof(jsonItemNumber.hasNoStroke) !== 'undefined') {
							hasNoStroke = jsonItemNumber.hasNoStroke;
						}

						//hasSecondStroke
						if (typeof(jsonItemNumber.hasSecondStroke) !== 'undefined') {
							hasSecondStroke = jsonItemNumber.hasSecondStroke;
						}

						//isBlinkimg
						if (typeof(jsonItemNumber.isBlinkimg) !== 'undefined') {
							isBlinkimg = jsonItemNumber.isBlinkimg;
							if(jsonItem.isBlinkimg==true){
								this.haveBlinkingText = true;
							}
						}

						// beginRowOffset
						if (typeof(jsonItemNumber.beginRowOffset) != 'undefined') {
							beginRowOffset = jsonItemNumber.beginRowOffset;
						}else{
							beginRowOffset=0;
						}

						// numberOffsetY
						if (typeof(jsonItemNumber.numberOffsetY) != 'undefined') {
							numberOffsetY = jsonItemNumber.numberOffsetY;
						}else{
							numberOffsetY=0;
						}


						// See if the sentence begins or ends with number
						if (typeof(jsonItemNumber.numberFirst) != 'undefined')
							numberFirst = true;
						if (typeof(jsonItemNumber.numberLast) != 'undefined')
							numberLast = true;

						setFont.call(this, fontSize, numberFontWeight, numberFontFace);
						measuredText += this._context.measureText(number).width;

					} else {
						var otherText = specialLine[j];
						fontSize = translations.settings.baseFontSize;

						setFont.call(this, fontSize);
						measuredText += this._context.measureText(otherText).width;
					}
				}

				// Calculate the starting point
				if (numberFirst && numberLast) {
					var coordX = (this._context.canvas.width - measuredText - (2*hGap))/2;
				} else if (numberFirst) {
					var coordX = (this._context.canvas.width - measuredText - (3*hGap))/2;
				} else if (numberLast) {
					var coordX = (this._context.canvas.width - measuredText - hGap)/2;
				} else {
					var coordX = (this._context.canvas.width - measuredText - (2*hGap))/2;
				}

				// Push the values to the array
				for (var k = 0; k < specialLine.length; k++) {


					if (specialLine[k].indexOf("~") != -1) {
						var numberText = specialLine[k].split("~");
						var jsonItemNumber = JSON.parse(numberText[0]);
						var number = numberText[1];

						fillStyle = translations.settings.fillStyle;
						strokeStyle = translations.settings.strokeStyle;

						// Numbers could have different font size, fill and stroke
						if (typeof(jsonItemNumber.specialFontSize) !== 'undefined') {
							fontSize = jsonItemNumber.specialFontSize;
						}
						if (typeof(jsonItemNumber.specialFill) !== 'undefined') {
							fillStyle = jsonItemNumber.specialFill;
						}else{
							fillStyle = translations.settings.specialFill;
						}


						if (typeof(jsonItemNumber.specialStroke) !== 'undefined') {
							strokeStyle = jsonItemNumber.specialStroke;
						}

						if (typeof(jsonItemNumber.hGap) != 'undefined') {
							hGap = jsonItemNumber.hGap;
						}

						//hasNoStroke
						if (typeof(jsonItemNumber.hasNoStroke) !== 'undefined') {
							hasNoStroke = jsonItemNumber.hasNoStroke;
						}						

						//hasSecondStroke
						if (typeof(jsonItemNumber.hasSecondStroke) !== 'undefined') {
							hasSecondStroke = jsonItemNumber.hasSecondStroke;
						}

						//isBlinkimg
						if (typeof(jsonItemNumber.isBlinkimg) !== 'undefined') {
							isBlinkimg = jsonItemNumber.isBlinkimg;
							if(jsonItemNumber.isBlinkimg==true){
								this.haveBlinkingText = true;
							}
						}	

						if (typeof(jsonItemNumber.numberOffsetY) != 'undefined') {
							numberOffsetY = jsonItemNumber.numberOffsetY;
						}else{
							numberOffsetY=0;
						}

						// beginRowOffset
						if (typeof(jsonItemNumber.beginRowOffset) != 'undefined') {
							beginRowOffset = jsonItemNumber.beginRowOffset;
						}else{
							beginRowOffset=0;
						}

						setFont.call(this, fontSize, numberFontWeight, numberFontFace);

						coordX+=beginRowOffset;
						beginRowOffset=0;

						this._textLinesArray.push({text: number, align: "left", font: setFont.call(this, fontSize, numberFontWeight, numberFontFace),
							fill: fillStyle, stroke: strokeStyle,
							x: coordX, y: offsetY+numberOffsetY,strokesArr: strokesArr });

						numberOffsetY=0;
						this._textLinesArray[this._textLinesArray.length-1].hasNoStroke = hasNoStroke;
						hasNoStroke = false;						
						this._textLinesArray[this._textLinesArray.length-1].hasSecondStroke = hasSecondStroke;
						hasSecondStroke = true;
						this._textLinesArray[this._textLinesArray.length-1].isBlinkimg = isBlinkimg;
						isBlinkimg = false;

						coordX += (this._context.measureText(number).width + hGap);
					} else {
						var otherText = specialLine[k];
						fontSize = translations.settings.baseFontSize;

						// fillStyle = translations.settings.fillStyle;
						strokeStyle = translations.settings.strokeStyle;	
						fillStyle = translations.settings.fillStyle;

						if (typeof(jsonItem.beginRowOffset) != 'undefined') {
							beginRowOffset = jsonItem.beginRowOffset;
						}else{
							beginRowOffset=0;
						}
						//hasSecondStroke			
						if (typeof(jsonItem.hasSecondStroke) !== 'undefined') {
							hasSecondStroke = jsonItem.hasSecondStroke;
						}
						if (typeof(jsonItem.specialFill) != 'undefined') {
							fillStyle = jsonItem.specialFill;
						}

						if (typeof(jsonItem.specialStroke) != 'undefined') {
							strokeStyle = jsonItem.specialStroke;
						}

						if (typeof(jsonItem.specialFontSize) != 'undefined') {
							fontSize = jsonItem.specialFontSize;
						}
						setFont.call(this, fontSize);
							
						coordX +=beginRowOffset;
						beginRowOffset=0;
						this._textLinesArray.push({text: otherText, align: "left", font: setFont.call(this, fontSize),
							fill: fillStyle, stroke: strokeStyle,
							x: coordX, y: offsetY+numberOffsetY,strokesArr: strokesArr});

						numberOffsetY=0;
						this._textLinesArray[this._textLinesArray.length-1].hasNoStroke = hasNoStroke;
						hasNoStroke = false;
						this._textLinesArray[this._textLinesArray.length-1].hasSecondStroke = hasSecondStroke;
						hasSecondStroke = true;
						this._textLinesArray[this._textLinesArray.length-1].isBlinkimg = isBlinkimg;
						isBlinkimg = false;
						coordX += (this._context.measureText(otherText).width + hGap);
					}
				}

			} else {
				self._context.textAlign = "center";
				fillStyle = fillStyle != null ? fillStyle : translations.settings.fillStyle;
				strokeStyle = strokeStyle != null ? strokeStyle : translations.settings.strokeStyle;

				coordX = self._context.canvas.clientWidth/2;

				coordX +=beginRowOffset;
				beginRowOffset=0;

				this._textLinesArray.push({text: textItem, align: "center", font: setFont.call(this, fontSize, null, font),
					fill: fillStyle, stroke: strokeStyle, shadowColor: shadowColor,
					x: coordX, y: offsetY+numberOffsetY,strokesArr: strokesArr});

				this._textLinesArray[this._textLinesArray.length-1].hasNoStroke = hasNoStroke;
				hasNoStroke = false;
				this._textLinesArray[this._textLinesArray.length-1].hasSecondStroke = hasSecondStroke;
				hasSecondStroke = true;
				this._textLinesArray[this._textLinesArray.length-1].isBlinkimg = isBlinkimg;
				isBlinkimg = false;
				numberOffsetY=0;
			}

			// Calculate the y point for the line
			offsetY += (lineHeight + vGap);
		
		}
		
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

	function shadowText(text, align, font, x, y, fill, stroke, shadowColor, hasNoStroke) {
		// console.log("text", text);
		this._context.textAlign = align;
		this._context.font = font;
		this._context.fillStyle = fill;
		if(!hasNoStroke){
			this._context.shadowColor = shadowColor != null  ? shadowColor : this._defaultSettings.shadowColor;
			// this._context.shadowBlur = null;
			this._context.shadowBlur = this._defaultSettings.shadowBlur;
			//for second stroke:
			// this._context.lineWidth = this._defaultSettings.lineWidth + 2;
			// this._context.strokeStyle = this._defaultSettings.shadowColor;
			// this._context.strokeText(text, x, y);
			// this._context.shadowBlur = 0;
			this._context.lineWidth = this._defaultSettings.lineWidth;
			this._context.strokeStyle = stroke;
			this._context.strokeText(text, x, y);
		}
		this._context.fillText(text, x, y);
		
	}
	
	return p;
})());