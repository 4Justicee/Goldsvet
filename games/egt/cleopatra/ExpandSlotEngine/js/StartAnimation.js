Button("StartAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			// default settings
			var settings = GameSettings.getInstance();
			this._defaultSettings = FreeSpinTranslations.defaultSettings;
			this._translations = FreeSpinTranslations[config.language].StartAnimation;
			this._textLines = [];
			this._specialExpandScale = this._defaultSettings.specialExpandScale;

			var x = 0;
			var y = 0;

			var width = this._defaultSettings.width;
			var height = this._defaultSettings.height;

			// set press area
			this._background = {width: width, height: height};
			this._super("startView", x, y);
			this.setSize(this._background.width, this._background.height);
			this.addClass(config.language);

			// set blinking text background
			this._textBackground = new CanvasView("", 0, y + this._defaultSettings.offsetY);
			this._textContext = this._textBackground.getContext2D();
			setFont.call(this);
			this._height = getTextHeight.call(this) + this._defaultSettings.startShadowPos.y*this._defaultSettings.shadowBlur + 2*this._defaultSettings.startStrokeWidth;
			this._textBackground.setSize(this._background.width, this._height);
			this.addChild(this._textBackground);

			// place and draw specialExpand image on other canvas
			var specialExpandPos = (this._defaultSettings.colors.length - 1)*this._defaultSettings.specialStrokeWidth;
			var specialRectWidth = settings.reelWidth * this._specialExpandScale + 2 * specialExpandPos;
			var specialRectHeight = settings.imageHeight * this._specialExpandScale + 2 * specialExpandPos;
			
			var offsetLanguages = this._defaultSettings.offsetLanguages;
			for (var i = 0; i < offsetLanguages.length; i++)
				if (config.language == offsetLanguages[i] && this._defaultSettings.specialOffsetX) {
					this._specialExpandBackground = new CanvasView("", this._defaultSettings.specialExpandX + this._defaultSettings.specialOffsetX, this._defaultSettings.specialExpandY);
					break;
				}
				else
					this._specialExpandBackground = new CanvasView("", this._defaultSettings.specialExpandX, this._defaultSettings.specialExpandY);

			this._specialExpandContext = this._specialExpandBackground.getContext2D();
			this._specialExpandBackground.setSize(specialRectWidth, specialRectHeight);
			this.addChild(this._specialExpandBackground);
			
			drawSpecialRect.call(this, x, y, specialRectWidth, specialRectHeight);

			// initiate blinking tween and interval
			this._blinkTween = null;
			this._blinkingInterval = this._defaultSettings.blinkingInterval;

			// find blinking space and start blinking
			blink.call(this);
		},
		dispose:function ()
		{
			this._blinkTween.kill();
			this._blinkTween = null;
		}
	};

	function drawSpecialRect(x, y, width, height, clearBackground) {
		var settings = this._defaultSettings;
		var lineWidth = settings.specialStrokeWidth;

		for (var i = 0; i < settings.colors.length; i++) {
			if (settings.colors[i] == 'transparent') {
				this._specialExpandContext.clearRect(x + i*lineWidth, y + i*lineWidth, width - 2*i*lineWidth, height - 2*i*lineWidth);
				continue;
			}
			this._specialExpandContext.fillStyle = settings.colors[i];
			this._specialExpandContext.clearRect(x + i*lineWidth, y + i*lineWidth, width - 2*i*lineWidth, height - 2*i*lineWidth);
			this._specialExpandContext.fillRect(x + i*lineWidth, y + i*lineWidth, width - 2*i*lineWidth, height - 2*i*lineWidth);
		}
	}

	function setFont() {
		var settings = this._defaultSettings;
		this._textContext.font = settings.startFontStyle + " " + settings.startFontWeight + " " + settings.startFontSize + "px " + settings.startFontFace;
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

	function drawText() {
		var settings = this._defaultSettings;
		this._textContext.textAlign = 'center';

		for (var i = 0; i < this._textLines.length; i++) {
			this._textContext.font = settings.startFontStyle + " " + settings.startFontWeight + " " + settings.startFontSize + "px " + settings.startFontFace;
			this._textContext.shadowBlur = settings.startShadowBlur;
			this._textContext.shadowColor = settings.startShadowStyle;
			this._textContext.strokeStyle = settings.startShadowStyle;
			this._textContext.fillStyle = settings.startShadowStyle;
			this._textContext.lineWidth = settings.startShadowWidth;
			this._textContext.strokeText(this._textLines[i].text, this._background.width/2 + settings.startShadowPos.x, this._textLines[i].y + settings.startShadowPos.y);
			this._textContext.fillText(this._textLines[i].text, this._background.width/2 + settings.startShadowPos.x, this._textLines[i].y + settings.startShadowPos.y);
			this._textContext.shadowBlur = 0;
			this._textContext.lineWidth = settings.startStrokeWidth;
			this._textContext.strokeStyle = settings.startStrokeStyle;
			this._textContext.strokeText(this._textLines[i].text, this._background.width/2 + 0, this._textLines[i].y);
			this._textContext.fillStyle = settings.startFillStyle;
			this._textContext.fillText(this._textLines[i].text, this._background.width/2 + 0, this._textLines[i].y);
		}
	}

	function blink() {
		var self = this;

		this._blinkTween = TweenMax.to(this._textContext, this._blinkingInterval, {
			onStart: function() {
				self._textContext.clearRect(0, 0, self._background.width, self._height);
				drawText.call(self);
			},
			onComplete: function() {
				TweenMax.to(self._textContext, self._blinkingInterval, {
					onStart: function() {
						self._textContext.clearRect(0, 0, self._background.width, self._height);
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