View("OutroAnimation",
{
	ANIMATION_COMPLETE: "animationComplete"
},
(function()
{
	var p = 
	{
		init: function(config, valueText)
		{
			this._super("outroAnimation");
			this._config = config;
			this._valueText = valueText;
			this._outroSound ;
			this._textLinesArray = [];

			var self = this;
			var settings = GameSettings.getInstance();
			var language = this._config.language;

			this._blackRect = {x:0,y:0,width:1281,height:720,opacity:0, textAlpha:0};

			this._background = new CanvasView("",0,0);
			this._background.setSize(1281,720);
			this._context = this._background.getContext2D();

			this.addChild(this._background);
			this._outroSound = SoundManager.getInstance().play("outroSound",false);
			this._img = Loader.getLoader(settings.engineType+'/games/'+settings.gameType+'/freespinAnimation/images/sp_bgr.jpg').getData();

			TweenMax.to(this._blackRect, 1 , {opacity:1, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete: function() { 
					WebFont.load({
					  custom: {
					    families: [FreeSpinTranslations[language].defaultFontName, FreeSpinTranslations[language].valueFontName]
					  },
					  	loading: function() {},
		  				active: function() {self._onFadeInComplete();}
					});
				}
			});
		},
		_onFadeInComplete: function()
		{
			var self = this;
			var yOfTextFiled;

			createAndPositionTextLinesForIntroScreen.call(this, 0, 0);

			TweenMax.to(this._blackRect, 1, {opacity:0, textAlpha:1, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.drawImage(self._img,0,0);
					self.drawText();
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
			 onComplete: function() {
			 		self.dispatchEvent(new Event("refreshScreen"));
			 		setTimeout(function(){self._onFadeOutStart();}, 5800);
			 	}
			});
			
		},
		_onFadeOutStart:function()
		{
			var self = this;
			TweenMax.to(this._blackRect, 1, {opacity:1,textAlpha:0, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.drawImage(self._img,0,0);
					self.drawText();
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
			 onComplete: function() {
			 		self._onFadeOutComplete();
			 	}
			});
		},
		_onFadeOutComplete:function()
		{
			var self = this;
			TweenMax.to(this._blackRect, 1 , {opacity:0, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete: function() { self.dispatchEvent(new Event(OutroAnimation.ANIMATION_COMPLETE));
				}
			});
		},
		_dispose:function()
		{
			SoundManager.getInstance().stop(this._outroSound);
		},
		drawText:function()
		{
			for (var i = 0; i < this._textLinesArray.length; i++) {
				this._context.font = this._textLinesArray[i].font;
				this._context.shadowColor = this._settings.shadowColor;
				this._context.shadowBlur = this._settings.shadowBlur;
				this._context.fillStyle =this._textLinesArray[i].fill;

				this._context.fillText(this._textLinesArray[i].text, this._textLinesArray[i].x, this._textLinesArray[i].y);
	       		this._context.strokeText(this._textLinesArray[i].text, this._textLinesArray[i].x, this._textLinesArray[i].y);
			};

		}
	};

	function createAndPositionTextLinesForIntroScreen(x, y)	{
		var language = this._config.language;
		var translations = FreeSpinTranslations[language].OutroAnimation;
		var selectedText = translations.text;
		this._settings = translations.settings;
		var yOffset = this._settings.yOffset;
		var settings = GameSettings.getInstance();
		var fontProperty= "";
		var defaultFontName = FreeSpinTranslations[language].defaultFontName;
		var valueFontName = FreeSpinTranslations[language].valueFontName;
		var font;
		var oneLineYOffsetNext = 0;

		var oneLineYOffset = 180;
		if (Device.isiOS) {
			oneLineYOffset = 180;
		}
		if (Device.isiOS && language == 'en') {
			oneLineYOffset = 150;
		}
		if (Device.isAndroid && language == 'en') {
			oneLineYOffset = 130;
		}

		this._context.lineWidth = this._settings.lineWidth;
		this._context.strokeStyle = this._settings.strokeStyle;
		this._context.textBaseline = this._settings.textBaseline;

		var lines = selectedText.split("\n");

		for (var i = 0; i < lines.length; i++) {
						
			var line = lines[i].split("^");
			var jsonItem = JSON.parse(line[0]);
			var text = line[1];
			var size = jsonItem.lineFontSize;
			var name;

			if(typeof(jsonItem.fontName) !== 'undefined')
				name = jsonItem.fontName; 
			else
				name = defaultFontName;

			if(typeof(jsonItem.yOffset) !== 'undefined')
				oneLineYOffset = parseInt(jsonItem.yOffset); 

			console.log("/// Device.isAndroid /// " + Device.isAndroid);


			if(Device.isiOS && typeof(jsonItem.iosYOffset) !== 'undefined')
			{
				y+=parseInt(jsonItem.iosYOffset);
			}
			if(Device.isAndroid && typeof(jsonItem.androidYOffset) !== 'undefined')
			{
				y+=parseInt(jsonItem.androidYOffset);
			}
			if(typeof(jsonItem.fontProperty)  !== 'undefined')	
			{
				fontProperty = jsonItem.fontProperty;
				font = fontProperty +" "+size+" '"+name+"'";
			}
			else
				font = size+" '"+name+"'";
			//oneLineYOffsetNext
			if(typeof(jsonItem.oneLineYOffsetNext) !== 'undefined')
				oneLineYOffsetNext = parseInt(jsonItem.oneLineYOffsetNext);
			this._context.font = font;
			var coordX = (this._context.canvas.width - this._context.measureText(text).width)/2;
			
			this._textLinesArray.push({text:text,font:font ,y:y+=oneLineYOffset ,x:coordX, fill: this._settings.fillStyle});

			y += parseInt(size) + parseInt(yOffset);
			y+=oneLineYOffsetNext;
			oneLineYOffsetNext=0;
			oneLineYOffset = 0;
		}

		// Setting the position and font of value and curency type
		var value;
		var currency = this._config.currencyType;
		var gap = 20;
		var vOffset = 30;
		// if (Device.isiOS) {
		// 	vOffset = 60;
		// }
		// if (Device.isiOS && language == 'en') {
		// 	vOffset = 30;
		// }

		if (this._config.currency)
		{
			if (this._config.diamondPlay)
				value = Utils.formatNumber(this._valueText, 100, false);
			else
				value = Utils.formatNumber(this._valueText, 100, true);
		} else
			value = Utils.formatNumber(this._valueText, this._config.denomination, false);

		// Measure the width of the whole text
		this._context.font = this._settings.numberFontSize + "px " + valueFontName;
		var measuredText = this._context.measureText(value).width;

		if(this._config.currency)
		{
			this._context.font = this._settings.numberFontSize/2 + "px " + valueFontName;
			measuredText += (gap + this._context.measureText(currency).width);

			// Set the starting point
			coordX = (this._context.canvas.width - measuredText)/2;
		}

		// Push the values to an array
		


		font = this._settings.numberFontSize + "px " + valueFontName;
		this._context.font = font;
		this._textLinesArray.push({text: value,font: font ,y: y - vOffset ,x: coordX, fill: this._settings.numberFillStyle});
		coordX += this._context.measureText(value).width + gap;

		if(this._config.currency)
		{
			font = this._settings.numberFontSize/2 + "px " + valueFontName;
			this._context.font = font;
			this._textLinesArray.push({text: currency,font: font ,y: y += (this._settings.numberFontSize/2 - this._settings.currencyYOffset - vOffset), x: coordX, fill: this._settings.numberFillStyle});
		}
	}
	
	return p;
})());