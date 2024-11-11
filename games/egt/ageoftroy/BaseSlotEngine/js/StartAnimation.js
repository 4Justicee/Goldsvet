Button("StartAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			this._defaultSettings = FreeSpinTranslations.defaultSettings;
			this._translations = FreeSpinTranslations[config.language].StartAnimation;
			this._super("startView", (this._defaultSettings.width - this._defaultSettings.fsBGWidth)/2, (this._defaultSettings.height - this._defaultSettings.fsBGHeight)/2 + this._defaultSettings.fsBGOffsetY);
			this._textBackground = null;
			this._textLines = [];
			this._width = this._defaultSettings.fsBGWidth;
			this._height = this._defaultSettings.fsBGHeight;

			this._blinkTween = null;
			this._blinkingInterval = this._defaultSettings.blinkingInterval;
			this._textHeight = getTextHeight.call(this);
			
			this.setSize(this._width, this._height);
			this.addClass(config.language);
			this._pressStartSound = SoundManager.getInstance().play("pressStartSound",true);

			setTextCanvas.call(this);
			setFont.call(this);

			this._blinkingSpace = findBlinkingSpace.call(this);

			if (this._defaultSettings.blink)
				blink.call(this);
			else
				drawText.call(this);

			if(!this._pressStartSound)
				SoundManager.getInstance().addEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);
		},
		dispose:function ()
		{
			SoundManager.getInstance().removeEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);
			SoundManager.getInstance().stop(this._pressStartSound);
			if (this._blinkTween)
				this._blinkTween.kill();
				this._blinkTween = null;
		}
	};
	
	function onSoundLoaded(event)
	{
		if(event.data.soundIndex == 5)
			this._pressStartSound = SoundManager.getInstance().play("pressStartSound",true);
	}

	function setTextCanvas() {
		var settings = this._defaultSettings;
		var startOffset = settings.startOffset ? settings.startOffset : 0;
		var offset = 0;

		switch (settings.textPosition) {
			case "bottom":
				this._textBackground = new CanvasView("", 0, this._height - this._textHeight + startOffset);
				break;
			case "top":
				this._textBackground = new CanvasView("", 0, 0 + startOffset);
				break;
			default:
				this._textBackground = new CanvasView("", 0, (this._height - this._textHeight)/2 + startOffset);
				break;
		}

		this._textBackground.setSize(this._width, 1.5*this._textHeight);
		this._context = this._textBackground.getContext2D();
		this.addChild(this._textBackground);
	}

	function setFont() {
		var settings = this._defaultSettings;

		this._context.font = settings.startFontStyle + " " + settings.startFontWeight + " " + settings.startFontSize + "px " + settings.startFontFace;
		this._context.textAlign = "center";
	}

	function getTextHeight() {
		var translations = this._translations;
		var settings = this._defaultSettings;

		var vGap = settings.vGap;
		var textSize = settings.startFontSize;

		// Get the text from translations and split it to lines
		var text = translations.text;
		var lines = text.split("\n");

		var linesHeight = textSize;

		var first = true;
		for (var i = 0; i < lines.length; i++) {
			if (!first)
				linesHeight += textSize + vGap;
			this._textLines.push({text: lines[i], y: linesHeight});
			first = false;
		}

		return linesHeight;
	}

	function getTextLineWidth(i) {
		return this._context.measureText(this._translations.text.split("\n")[i]).width;
	}

	function getTextWidthBeforeWord(i, word) {
		return this._context.measureText(this._translations.text.split("\n")[i].split(word)[0]).width;
	}

	function drawText() {
		var settings = this._defaultSettings;

		for (var i = 0; i < this._textLines.length; i++) {
			this._context.font = settings.startFontStyle + " " + settings.startFontWeight + " " + settings.startFontSize + "px " + settings.startFontFace;
			this._context.shadowBlur = settings.startShadowBlur;
			this._context.shadowColor = settings.startShadowStyle;
			this._context.strokeStyle = settings.startShadowStyle;
			this._context.fillStyle = settings.startShadowStyle;
			this._context.lineWidth = settings.startShadowWidth;
			this._context.strokeText(this._textLines[i].text, this._width/2 + settings.startShadowPos.x, this._textLines[i].y + settings.startShadowPos.y);
			this._context.fillText(this._textLines[i].text, this._width/2 + settings.startShadowPos.x, this._textLines[i].y + settings.startShadowPos.y);
			this._context.shadowBlur = 0;
			this._context.lineWidth = settings.startStrokeWidth;
			this._context.strokeStyle = settings.startStrokeStyle;
			this._context.strokeText(this._textLines[i].text, this._width/2, this._textLines[i].y);
			this._context.fillStyle = settings.startFillStyle;
			this._context.fillText(this._textLines[i].text, this._width/2, this._textLines[i].y);
		}
	}

	function findBlinkingSpace() {
		var settings = this._defaultSettings;

		var blinkingSpaceArray = [];

		var len = settings.blinkingWords.length;
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				blinkingSpaceArray.push(findWordPosition.call(this, settings.blinkingWords[i]));
			}
		} else
			blinkingSpaceArray = [{x: 0, y: 0, width: this._width, height: 1.5*this._height}];
			
		return blinkingSpaceArray;
	}

	function findWordPosition(word) {
		var translations = this._translations;
		var settings = this._defaultSettings;

		// Get the text from translations and split it to lines
		var text = translations.text;
		var lines = text.split("\n");

		var len = lines.length;
		for (var i = 0; i < len; i++) {
			if (lines[i].indexOf(word) != -1)
				return {x: this._width/2 - getTextLineWidth.call(this, i)/2 + getTextWidthBeforeWord.call(this, i, word) - (settings.startShadowWidth > settings.startStrokeWidth ? settings.startShadowWidth : settings.startStrokeWidth)  + settings.startShadowPos.x,
						y: i*(settings.startFontSize + settings.vGap) + settings.startShadowPos.y,
						width: this._context.measureText(word).width + 2*settings.startShadowWidth + 2*(settings.startShadowWidth > settings.startStrokeWidth ? settings.startShadowWidth : settings.startStrokeWidth),
						height: 1.5*settings.startFontSize}
			else
				return {x:0, y:0, width:0, height:0};	
		}
	}

	function blink() {
		var self = this;

		this._blinkTween = TweenMax.to(this._context, this._blinkingInterval, {
			onStart: function() {
				self._context.clearRect(0, 0, self._width, 1.5*self._textHeight);
				drawText.call(self);
			},
			onComplete: function() {
				TweenMax.to(self._context, self._blinkingInterval, {
					onStart: function() {
						for (var i = 0; i < self._blinkingSpace.length; i++)
							self._context.clearRect(self._blinkingSpace[i].x, self._blinkingSpace[i].y, self._blinkingSpace[i].width, self._blinkingSpace[i].height);
					},
					onComplete:function() {
						blink.call(self);
					}
				})
				
			}
		})
	}
	
	return p;
})());