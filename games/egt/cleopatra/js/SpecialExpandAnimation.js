View("SpecialExpandAnimation",
{
	NUM_IMAGES_IN_SELECTING_EXPAND: GameSettings.getInstance().numImages - 2
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			// default settings
			var self = this;
			var settings = GameSettings.getInstance();
			this._defaultSettings = FreeSpinTranslations.defaultSettings;
			this._imagesArray = [];
			this._config = config;
			this._defaultFps = 60;
			this._count = SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND;
			this._time = 0.3;
			this._frames = this._time * this._defaultFps;
			this._blinkingInterval = 0.5;
			this._blinkingCount = 0;
			this._blinkingRepeat = 5;
			this._tween = null;
			this._specialExpandScale = this._defaultSettings.specialExpandScale;
			
			// Configuration for expand reel images and black rectangle
			this._specialExpandConf = {	symbol: null,
										sx: 0, sy: 0,
										swidth: settings.reelWidth,
										sheight: settings.imageHeight,
										width: settings.reelWidth * this._specialExpandScale,
										height: settings.imageHeight * this._specialExpandScale,
										x: (this._defaultSettings.colors.length - 1)*this._defaultSettings.specialStrokeWidth,
										y: (this._defaultSettings.colors.length - 1)*this._defaultSettings.specialStrokeWidth,
										alpha: 0
			};

			// add view
			var offsetLanguages = this._defaultSettings.offsetLanguages;
			for (var i = 0; i < offsetLanguages.length; i++)
				if (config.language == offsetLanguages[i] && this._defaultSettings.specialOffsetX) {
					this._super("", this._defaultSettings.specialExpandX + this._defaultSettings.specialOffsetX, this._defaultSettings.specialExpandY);
					break;
				}
				else
					this._super("", this._defaultSettings.specialExpandX, this._defaultSettings.specialExpandY);

			// add canvas for specialExpand frame animation
			this._specialExpandFrameCanvas = new CanvasView("", 0, 0);
			this._specialExpandFrameCanvas.setSize(this._specialExpandConf.width + 2 * this._specialExpandConf.x, this._specialExpandConf.height + 2 * this._specialExpandConf.y);
			this.addChild(this._specialExpandFrameCanvas);
			this._specialExpandContext = this._specialExpandFrameCanvas.getContext2D();
			
			// Draw the borders of the rectangle
			drawSpecialRect.call(this, 0, 0, this._specialExpandConf.width + 2 * this._specialExpandConf.x, this._specialExpandConf.height + 2 * this._specialExpandConf.y);

			// get special expand card
			var expandCard = this._config.message != null ? this._config.message.freeSpinsExpandSymbol : 8;
			
			// get reel images
			var len = settings.reelImages.length;
			for(var i = 0 ;i < len;i++ ) {
				if (Loader.getLoader(settings.reelImages[i]))
					this._imagesArray[i] = Loader.getLoader(settings.reelImages[i]).getData();
				else
					this._imagesArray[i] = settings.reelImages[i];
			}

			// set last images that will slow down
			this._slowDownFrames = 3;
			// set repeat time
			this._repeat = 2*(SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND) - expandCard;
			// set animation repeats
			this._repeatCount = 0;

			this._playSpecialExpandFrameForegroundAnimation();

		},
		// play specialExpandFrame foreground animation
		_playSpecialExpandFrameForegroundAnimation: function() {
			var self = this;
			var settings = GameSettings.getInstance();
			var soundManager = SoundManager.getInstance();

			this._tween = TweenMax.to(this._specialExpandConf, this._frames/2, {alpha: 1, ease: Linear.easeNone, useFrames: true,
				onStart: function() {
					setAlphaRectColor.call(self, "black");
				},
				onUpdate: function() {
					drawBlackRect.call(self, self._specialExpandConf.alpha, false);
				},
				onComplete: function() {
					self._playSpecialExpandFrameAnimation();
				}});
		},
		_playSpecialExpandFrameAnimation: function() {
			var self = this;
			var settings = GameSettings.getInstance();
			var soundManager = SoundManager.getInstance();
			var fps = self._defaultFps;
			var alphaControl = 0;

			this._tween = TweenMax.to(this._specialExpandConf, this._frames, {alpha: 0, startAt: {alpha: 1}, yoyo: true, repeat: 2*this._repeat + 1, ease: Linear.easeNone, useFrames: true,
				onStart: function() {
					soundManager.play("bonusSpecialRotating");
					updateExpand.call(self, self._count);
				},
				onUpdate: function() {
					drawBlackRect.call(self, self._specialExpandConf.alpha, true);
				},
				onRepeat: function() {
					if (alphaControl == 1) {
						soundManager.play("bonusSpecialRotating");

						updateExpand.call(self, (self._count < 1) ? (SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND) : (self._count - 1));

						if (--self._count < 0) {
							self._count = SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND;
						}

						if (++self._repeatCount > self._repeat - self._slowDownFrames) {
							TweenMax.ticker.fps(fps);
							fps -= self._frames/self._slowDownFrames;
						}
						alphaControl = 0;
					} else
						alphaControl = 1;
					
				},
				onComplete: function() {
					self._playSpecialExpandFrameEndAnimation();
				}});
		},
		_playSpecialExpandFrameEndAnimation: function() {
			var self = this;
			var settings = GameSettings.getInstance();
			var soundManager = SoundManager.getInstance();

			this._tween = TweenMax.to(this._specialExpandConf, this._frames, {alpha: 0, startAt: {alpha: 1}, ease: Linear.easeNone, useFrames: true,
				onStart: function() {
					if (--self._count < 0) {
						self._count = SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND;
					}
					updateExpand.call(self, self._count);
				},
				onUpdate: function() {
					drawBlackRect.call(self, self._specialExpandConf.alpha, true);
				},
				onComplete: function() {
					soundManager.play("bonusSpecialBlink");
					TweenMax.ticker.fps(this._defaultFps);
					self._specialExpandContext.globalAlpha = 1;
					self._blink();
				}});
		},
		_blink: function() {
			var self = this;

			this._tween = TweenMax.to(this._specialExpandContext, this._blinkingInterval, {
				onStart: function() {
					self._specialExpandContext.clearRect(0, 0, self._specialExpandConf.width + 2 * self._specialExpandConf.x, self._specialExpandConf.height + 2 * self._specialExpandConf.y);
					drawSpecialRect.call(self, 0, 0, self._specialExpandConf.width + 2 * self._specialExpandConf.x, self._specialExpandConf.height + 2 * self._specialExpandConf.y);
					drawExpandSymbol.call(self);
					self._blinkingCount++;
				},
				onComplete: function() {
					TweenMax.to(self._specialExpandContext, self._blinkingInterval, {
						onStart: function() {
							self._specialExpandContext.clearRect(0, 0, self._specialExpandConf.width + 2 * self._specialExpandConf.x, self._specialExpandConf.height + 2 * self._specialExpandConf.y);
						},
						onComplete: function() {
							if (self._blinkingCount != self._blinkingRepeat)
								self._blink();
							else
								self._waitToComplete();
						}
					});
			}});				
		},
		_waitToComplete: function() {
			var self = this;

			this._tween = TweenMax.to(this._specialExpandContext, 2, {ease: Quad.easeInOut,
				onStart: function() {
					drawSpecialRect.call(self, 0, 0, self._specialExpandConf.width + 2 * self._specialExpandConf.x, self._specialExpandConf.height + 2 * self._specialExpandConf.y);
					drawExpandSymbol.call(self);
				},
				onComplete: function() {
					self.dispatchEvent(new Event("animationComplete"));
				}});
		},
		dispose: function() {
			this._tween.kill();
			this._tween = null;

			TweenMax.ticker.fps(this._defaultFps);

			this._super();
		}
	};

	function updateExpand(count) {
		var settings = GameSettings.getInstance();

		this._specialExpandConf.symbol = this._imagesArray[settings.cardsInfo[count].reelImageIndex];
		this._specialExpandConf.sx = settings.cardsInfo[count].x;
		this._specialExpandConf.sy = settings.cardsInfo[count].y;
	}

	function drawExpandSymbol() {
		this._specialExpandContext.drawImage(this._specialExpandConf.symbol, 
														this._specialExpandConf.sx,
														this._specialExpandConf.sy,
														this._specialExpandConf.swidth,
														this._specialExpandConf.sheight,
														this._specialExpandConf.x,
														this._specialExpandConf.y,
														this._specialExpandConf.width,
														this._specialExpandConf.height);
	}

	function drawSpecialRect(x, y, width, height) {
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

	function setAlphaRectColor(color) {
		this._specialExpandContext.fillStyle = color;
	}

	function drawBlackRect(alpha, image) {
		this._specialExpandContext.globalAlpha = 1;
		this._specialExpandContext.clearRect(this._specialExpandConf.x, this._specialExpandConf.y, this._specialExpandConf.width, this._specialExpandConf.height);
		if (image)
			drawExpandSymbol.call(this);
		this._specialExpandContext.globalAlpha = alpha;
		this._specialExpandContext.fillRect(this._specialExpandConf.x, this._specialExpandConf.y, this._specialExpandConf.width, this._specialExpandConf.height);
	}

	return p;
})());