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
			this._time = 0.45;
			this._frames = this._time * this._defaultFps;
			this._blinkingInterval = 0.5;
			this._blinkingCount = 0;
			this._blinkingRepeat = 5;
			this._tween = null;
			this._specialExpandScale = this._defaultSettings.specialExpandScale;

			var specialExpandWidth = settings.reelWidth * this._specialExpandScale;
			var specialExpandHeight = settings.imageHeight * this._specialExpandScale;

			// Configuration for expand reel images and black rectangle
			this._specialExpandConf = {	symbol: null,
										sx: 0, sy: 0,
										swidth: settings.reelWidth,
										sheight: settings.imageHeight,
										width: specialExpandWidth,
										height: specialExpandHeight,
										x: (this._defaultSettings.colors.length - 1)*this._defaultSettings.specialStrokeWidth,
										y: (this._defaultSettings.colors.length - 1)*this._defaultSettings.specialStrokeWidth,
										dest: Math.sqrt(Math.pow(specialExpandWidth, 2) + Math.pow(specialExpandHeight, 2)), 
										diagonal: Math.sqrt(Math.pow(specialExpandWidth, 2) + Math.pow(specialExpandHeight, 2))
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
			this._specialExpandCanvas = new CanvasView("", 0, 0);
			this._specialExpandCanvas.setSize(this._specialExpandConf.width + 2 * this._specialExpandConf.x, this._specialExpandConf.height + 2 * this._specialExpandConf.y);
			this.addChild(this._specialExpandCanvas);
			this._specialExpandContext = this._specialExpandCanvas.getContext2D();

			// Draw the borders of the rectangle
			drawSpecialRect.call(this, 0, 0, this._specialExpandConf.width + 2 * this._specialExpandConf.x, this._specialExpandConf.height + 2 * this._specialExpandConf.y);

			// get special expand card and set public properties for it
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
			this._repeat = 2*(SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND) - expandCard - 1;
			// set animation repeats
			this._repeatCount = 0;

			this._playSpecialExpandFrameForegroundAnimation();

		},
		// play specialExpandFrame foreground animation
		_playSpecialExpandFrameForegroundAnimation: function() {
			var self = this;
			var settings = GameSettings.getInstance();
			var soundManager = SoundManager.getInstance();

			this._tween = TweenMax.to(this._specialExpandConf, this._frames, {dest: 0, startAt: {dest: self._specialExpandConf.diagonal}, ease: Linear.easeNone, useFrames: true,
				onStart: function() {
					soundManager.play("bonusSpecialRotating");
				},
				onUpdate: function() {
					clearDiagonal.call(self, self._specialExpandConf.dest, false);
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

			this._tween = TweenMax.to(this._specialExpandConf, this._frames, {dest: 0, startAt: {dest: self._specialExpandConf.diagonal}, repeat: this._repeat, ease: Linear.easeNone, useFrames: true, roundProps:"dest",
				onStart: function() {
					self._specialExpandContext.save();
					soundManager.play("bonusSpecialRotating");
				},
				onUpdate: function() {
					clearDiagonal.call(self, self._specialExpandConf.dest, true);
				},
				onRepeat: function() {
					soundManager.play("bonusSpecialRotating");

					// Draw background image to prevent blink bug
					updateExpand.call(self, (self._count < 1) ? (SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND) : (self._count - 1));
					
					self._specialExpandContext.rect(self._specialExpandConf.x, self._specialExpandConf.y, self._specialExpandConf.width, self._specialExpandConf.height);
					self._specialExpandContext.clip();
					drawExpandSymbol.call(self);

					if (--self._count < 0) {
						self._count = SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND;
					}

					if (++self._repeatCount >= self._repeat - self._slowDownFrames - 1 ) {
						TweenMax.ticker.fps(fps);
						fps -= self._frames/self._slowDownFrames;
					}
				},
				onComplete: function() {
					self._specialExpandContext.restore();
					self._playSpecialExpandFrameEndAnimation();
				}});
		},
		_playSpecialExpandFrameEndAnimation: function() {
			var self = this;
			var settings = GameSettings.getInstance();
			var soundManager = SoundManager.getInstance();

			this._tween = TweenMax.to(this._specialExpandConf, this._frames, {dest: 0, startAt: {dest: self._specialExpandConf.diagonal}, ease: Linear.easeNone, useFrames: true, roundProps:"dest",
				onStart: function() {
					soundManager.play("bonusSpecialRotating");
					if (--self._count < 0) {
						self._count = SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND;
					}
				},
				onUpdate: function() {
					clearDiagonal.call(self, self._specialExpandConf.dest, true);
				},
				onComplete: function() {
					TweenMax.ticker.fps(this._defaultFps);
					updateExpand.call(self, (self._count < 1) ? (SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND) : (self._count - 1));
					soundManager.play("bonusSpecialBlink");
					self._blink();
				}});
		},
		_blink: function() {
			var self = this;

			this._tween = TweenMax.to(this._specialExpandContext, this._blinkingInterval, {
				onStart: function() {
					drawSpecialRect.call(self, 0, 0, self._specialExpandConf.width + 2 * self._specialExpandConf.x, self._specialExpandConf.height + 2 * self._specialExpandConf.y);
					self._specialExpandContext.clearRect(self._specialExpandConf.x, self._specialExpandConf.y, self._specialExpandConf.width, self._specialExpandConf.height);
					drawExpandSymbol.call(self);
					// self._specialExpandContext.globalCompositeOperation = "destination-over";
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
					// self._specialExpandContext.globalCompositeOperation = "source-over";
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

	function clearDiagonal(dest, image) {
		var settings = this._defaultSettings;
		var destX = (dest > this._specialExpandConf.diagonal/2) ? (this._specialExpandConf.width - Math.sqrt(2*Math.pow(this._specialExpandConf.diagonal - dest,2))) : (this._specialExpandConf.height - Math.sqrt(2*Math.pow(dest,2)));
		var destY = (dest > this._specialExpandConf.diagonal/2) ? (Math.sqrt(2*Math.pow(this._specialExpandConf.diagonal - dest,2))) : (Math.sqrt(2*Math.pow(dest,2)));

		// this._specialExpandContext.rect(0, 0, this._specialExpandRectWidth, this._specialExpandRectHeight);

		this._specialExpandContext.save();
		// Draw background image
		if (!image) {
			updateExpand.call(this, this._count);
		}
		else {
			updateExpand.call(this, (this._count < 1) ? (SpecialExpandAnimation.NUM_IMAGES_IN_SELECTING_EXPAND) : (this._count - 1));
		}
		this._specialExpandContext.rect(this._specialExpandConf.x, this._specialExpandConf.y, this._specialExpandConf.width, this._specialExpandConf.height);
		this._specialExpandContext.clip();
		drawExpandSymbol.call(this);

		// Draw foreground image or shape
		this._specialExpandContext.beginPath();
		this._specialExpandContext.moveTo(this._specialExpandConf.x, this._specialExpandConf.y + this._specialExpandConf.height);
		this._specialExpandContext.lineTo(this._specialExpandConf.x, this._specialExpandConf.y);
		this._specialExpandContext.lineTo(this._specialExpandConf.x + ((dest > this._specialExpandConf.diagonal/2) ? destX : 0), this._specialExpandConf.y + ((dest > this._specialExpandConf.diagonal/2) ? 0 : destX));
		this._specialExpandContext.lineTo(this._specialExpandConf.x + ((dest > this._specialExpandConf.diagonal/2) ? this._specialExpandConf.width : destY), this._specialExpandConf.y + ((dest > this._specialExpandConf.diagonal/2) ? destY : this._specialExpandConf.height));
		this._specialExpandContext.lineTo(this._specialExpandConf.x + this._specialExpandConf.width, this._specialExpandConf.y + this._specialExpandConf.height);
		this._specialExpandContext.closePath();
		this._specialExpandContext.clip();
		

		if (!image) {
			drawSpecialRect.call(this, 0, 0, this._specialExpandConf.width + 2 * this._specialExpandConf.x, this._specialExpandConf.height + 2 * this._specialExpandConf.y);
		}
		else {
			updateExpand.call(this, this._count);
			drawExpandSymbol.call(this);
		}

		// Draw white opacity line
		this._specialExpandContext.beginPath();
		this._specialExpandContext.moveTo(this._specialExpandConf.x + ((dest > this._specialExpandConf.diagonal/2) ? destX : 0), this._specialExpandConf.y + ((dest > this._specialExpandConf.diagonal/2) ? 0 : destX));
		this._specialExpandContext.lineTo(this._specialExpandConf.x + ((dest > this._specialExpandConf.diagonal/2) ? this._specialExpandConf.width : destY), this._specialExpandConf.y + ((dest > this._specialExpandConf.diagonal/2) ? destY : this._specialExpandConf.height));
		this._specialExpandContext.closePath();
		this._specialExpandContext.lineWidth = 20;
		this._specialExpandContext.globalAlpha = 0.2;
		this._specialExpandContext.strokeStyle = "white";
		this._specialExpandContext.stroke();

		this._specialExpandContext.restore();

	}

	return p;
})());