/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("ReelsViewController",
{
	REELS_STOPPED: "reelsStopped"
},
(function()
{
	var p =
	{
		init: function(reels)
		{
			this._super();

			this._reels;
			this._resultReceived;
			this._stopAllRequested;
			this._initialRotationTimeElapsed;
			this._stopReelTimer;
			this._lastTime;
			this._numReelsBounced;
			this._allowedAccelSound;
			this._scatterCount;
			this._accelSoundChannel;
			this._lostConnection;

			this._view = new CanvasView("", 151, 66);
			this._view.setSize(979, 540);

			var settings = GameSettings.getInstance();
			var imagesArray = [];
			this._reels = [];

			var len = settings.reelImages.length;
			for(var i = 0 ;i < len;i++ )
				imagesArray[i] = Loader.getLoader(settings.reelImages[i]).getData();

			for(var i = 0;i < settings.numReels;i++)
			{
				this._reels[i] = new ReelView({numReelImages:settings.numReelCards, numImages:settings.numImages, transparentReels:settings.transparentReels, reelCoordX:settings.reelCoordX, reelCoordY:settings.reelCoordY,
										  reelWidth:settings.reelWidth, reelHeight:settings.reelHeight, imageHeight:settings.imageHeight, reelSpacing:settings.reelSpacing,
										  reelImages:imagesArray, cardsInfo:settings.cardsInfo,
										  reelStartBounceTime:settings.reelStartBounceTime, reelStopBounceTime:settings.reelStopBounceTime, reelStopBouncePercent:settings.reelStopBouncePercent,
										  reelRotationSpeed:settings.reelRotationSpeed, reelRotationDirection:settings.reelRotationDirection, context:this._view.getContext2D()}, i);
				this._reels[i].setFakeReel(settings.mainFakeReels[i]);
				this._reels[i].setResult(reels, true);
				this._reels[i].addEventListener(ReelView.REEL_STOPPED, onReelStopped, this);
				this._reels[i].addEventListener(ReelView.REEL_BOUNCED, onReelBounced, this);
			}

			this._scatterCount = [];
			this._allowedAccelSound = [];
			var len = settings.scatterConfig.length;
			for (var i = 0; i < len; i++)
			{
				var item = settings.scatterConfig[i];
				this._scatterCount[item.index] = { count:0, checkedReels:[] };
				for (var j = 0; j < settings.numReels; j++)
					this._scatterCount[item.index].checkedReels[j] = false;

				this._allowedAccelSound[item.index] = false;
			}

			this._lostConnection = false;
			this._stopAllRequested = false;
			this._initialRotationTimeElapsed = false;
		},

		getReelsRotating: function()
		{
			var settings = GameSettings.getInstance();
			for(var i = 0; i < settings.numReels; i++)
				if (this._reels[i].getState() != ReelView.REEL_IDLE)
					return true;

			return false;
		},

		getStopAllRequested: function() { return this._stopAllRequested; },

		start: function()
		{
			if (this.getReelsRotating())
				return;

			var settings = GameSettings.getInstance();

			for(var i = 0; i < settings.numReels; i++)
				this._reels[i].start();

			if (this._stopReelTimer)
			{
				throw "_stopReelTimer should be null when the reels are starting!";
			}
			var totalReelDelay = (settings.numReels - 1) * settings.gameBetweenReelsDelay;
			var lastReelStopTime = (settings.numReelCards + 1) * settings.reelRotationSpeed +
				settings.reelStopBounceTime * 1000;
			var totalSpinTime = totalReelDelay + lastReelStopTime;

			var initialRotationTime = Math.max(settings.gameInitialReelRotationTime,
				settings.minimumSpinTime*1000 - totalSpinTime);

			var self = this;
			this._stopReelTimer = setTimeout(function()
			{
				onStopReelTimer.call(self);
			}, initialRotationTime);

			this._resultReceived = false;
			this._initialRotationTimeElapsed = false;
			this._numReelsBounced = 0;
		},

		stopAll: function()
		{
			var settings = GameSettings.getInstance();

			if (!this.getReelsRotating() || settings.minimumSpinTime > 0)
				return;


			if (this._resultReceived)
			{
				// align all unstopped reels to a single offset, so they'll stop at once
				var offset = settings.reelHeight;
				for(var i = 0; i < settings.numReels; i++)
					this._reels[i].stop(offset);
			}

			this._stopAllRequested = true;

			if (this._stopReelTimer)
			{
				clearTimeout(this._stopReelTimer);
				this._stopReelTimer = 0;
			}
		},

		resultReceived: function()
		{
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;
			if (spinMessage.type != BaseMessage.SPIN)
			{
				throw "Incorrect message type in resultReceived in ReelsViewController!";
			}

			for(var i = 0; i < settings.numReels; i++)
				this._reels[i].setResult(spinMessage.reels);
			this._resultReceived = true;
			if (this._stopAllRequested)
				this.stopAll();
			else if (this._initialRotationTimeElapsed)
				onStopReelTimer.call(this);
		},

		setReels: function(reels)
		{
			var settings = GameSettings.getInstance();
			if (this.getReelsRotating())
			{
				throw "Cannot set reels if they are not stopped!";
			}
			for(var i = 0; i < settings.numReels; i++)
				this._reels[i].setResult(reels, true);
		},

		clearReels: function(cells)
		{
			var len = cells.length;
			for (var i = 0; i < len; i += 2)
				this._reels[cells[i]].clearCell(cells[i + 1]);
		},

		setMainFakeReels: function(fakeReels)
		{
		},

		setFreespinFakeReels: function(fakeReels)
		{
		},

		redrawReels: function()
		{
			var settings = GameSettings.getInstance();
			for(var i = 0; i < settings.numReels; i++)
				this._reels[i].redraw();
		},

		onLostConnection: function()
		{
			this._lostConnection = true;

			if (this._stopReelTimer)
			{
				clearTimeout(this._stopReelTimer);
				this._stopReelTimer = 0;
			}
		},

		newFrame: function(coeficient)
		{
			var settings = GameSettings.getInstance();
			for(var i = 0;i < settings.numReels;i++)
				this._reels[i].draw(coeficient);
		},

		dispose: function()
		{
			var len = this._reels.length;
			for(var i = 0;i < len;i++)
			{
				this._reels[i].removeEventListener(ReelView.REEL_STOPPED, onReelStopped, this);
				this._reels[i].removeEventListener(ReelView.REEL_BOUNCED, onReelBounced, this);
				this._reels[i].dispose();
			}

			this._reels = null;

			if(this._stopReelTimer)
				clearTimeout(this._stopReelTimer);

			if(this._accelSoundChannel)
				SoundManager.getInstance().stop(this._accelSoundChannel);

			this._super();
		}
	};

	// PRIVATE
	function getNextReelToStop()
	{
		var settings = GameSettings.getInstance();
		for(var i = 0; i < settings.numReels; i++)
			if (this._reels[i].getState() == ReelView.REEL_ROTATING)
				return this._reels[i];
		return null;
	}

	function checkForAccelerationSound(reel)
	{
		if (this._stopAllRequested || !SoundManager.getInstance().hasSound("reelAccelerateSound"))
			return;

		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;

		for (var i = 0; i < settings.numReelCards; i++)
		{
			var card = SpinAnalyzer.getCard(reel, i, spinMessage);
			if (this._allowedAccelSound[card])
				continue;
			if (this._scatterCount[card])
			{
				var scatterConfig;
				var len = settings.scatterConfig.length;
				for (var j = 0; j < len; j++)
					if (settings.scatterConfig[j].index == card)
					{
						scatterConfig = settings.scatterConfig[j];
						break;
					}

				if (scatterConfig.freespinMinCount == -1)
					continue;

				if (!this._scatterCount[card].checkedReels[reel])
				{
					this._scatterCount[card].checkedReels[reel] = true;
					this._scatterCount[card].count++;
				}
				if (this._scatterCount[card].count >= scatterConfig.freespinMinCount - 1)
				{
					var moreScattersPossible = false;
					for (var j = reel+1; j < settings.numReels; j++)
					{
						if (scatterConfig.validReels[j] && this._reels[j].getState() == ReelView.REEL_ROTATING)
						{
							moreScattersPossible = true;
							break;
						}
					}
					if (moreScattersPossible)
					{
						this._allowedAccelSound[card] = true;
						break;
					}
				}
			}
		}
	}

	function playReelStopSound(reel)
	{
		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;
		var soundManager = SoundManager.getInstance();

		var card;
		var prevScatter, nextScatter;

		for (var i = 0; i < settings.numReelCards; i++)
		{
			card = SpinAnalyzer.getCard(reel, i, spinMessage);
			var scatterConfig = null;
			var len = settings.scatterConfig.length;
			for (var j = 0; j < len; j++)
			{
				if (settings.scatterConfig[j].index == card)
				{
					scatterConfig = settings.scatterConfig[j];
					break;
				}
			}

			if (scatterConfig != null && scatterConfig.validReels[reel])
			{
				prevScatter = nextScatter = 0;
				for (var j = 0; j < settings.numReels; j++)
				{
					if (scatterConfig.validReels[j])
					{
						if ( j < reel && SpinAnalyzer.isCardOnReel(j, card, spinMessage)) prevScatter++;
						if ( j > reel ) nextScatter++;
					}
				}
				if (prevScatter + nextScatter + 1 >= scatterConfig.minCount)
				{
					var sound;
					var len = settings.scatterSounds.length;
					for(var j = 0; j < len; j++)
					{
						if(settings.scatterSounds[j].scatter == card)
						{
							sound = settings.scatterSounds[j].sounds[reel];
							break;
						}
					}

					soundManager.play(sound);
					return;
				}
			}

			var len = settings.expandSounds.length;
			for (var k = 0; k < len; k++) {
				if (settings.expandSounds[k].expand == card && settings.expandSounds[k].sounds[reel] != null) {
					soundManager.play(settings.expandSounds[k].sounds[reel]);
					return;
				}
			}



		}

		soundManager.play("stopReelSound");
	}

	function onStopReelTimer()
	{
		if (this._resultReceived)
		{
			var reel = getNextReelToStop.call(this);
			if (reel)
			{
				var settings = GameSettings.getInstance();

				reel.stop();

				checkForAccelerationSound.call(this, reel.getIndex());

				var playAccelSound = false;
				var len = settings.scatterConfig.length;
				for (var i = 0; i < len; i++)
				{
					var item = settings.scatterConfig[i];
					if(this._allowedAccelSound[item.index] && item.validReels[reel.getIndex()+1])
					{
						playAccelSound = true;
						break;
					}
				}

				var self = this;
				this._stopReelTimer = window.setTimeout(function() { onStopReelTimer.call(self); }, playAccelSound ? 1500 : settings.gameBetweenReelsDelay);
			}
		}
		else
		{
			this._initialRotationTimeElapsed = true;
			clearTimeout(this._stopReelTimer);
			this._stopReelTimer = 0;
		}
	}

	function onReelBounced(event)
	{
		this._numReelsBounced++;

		var reel = event.target;

		var settings = GameSettings.getInstance();
		var soundManager = SoundManager.getInstance();

		this._accelSoundChannel = soundManager.stop(this._accelSoundChannel);

		if (this._numReelsBounced < settings.numReels)
		{
			var nextReel = getNextReelToStop.call(this);
			var playAccelSound = false;
			if (nextReel)
			{
				var len = settings.scatterConfig.length;
				for (var i = 0; i < len; i++)
				{
					var item = settings.scatterConfig[i];
					if(this._allowedAccelSound[item.index] && item.validReels[nextReel.getIndex()])
					{
						playAccelSound = true;
						break;
					}
				}
			}
			if (playAccelSound)
				this._accelSoundChannel = soundManager.play("reelAccelerateSound");
		}
		if (this._stopAllRequested)
		{
			if (this._numReelsBounced == settings.numReels)
				soundManager.play("stopReelAllSound");
		}
		else
		{
			playReelStopSound.call(this, reel.getIndex());
		}
	}

	function onReelStopped(event)
	{
		var settings = GameSettings.getInstance();

		if (this.getReelsRotating())
			return;

		if (this._stopReelTimer)
		{
			clearTimeout(this._stopReelTimer);
			this._stopReelTimer = 0;
		}

		var len = settings.scatterConfig.length;
		for (var i = 0; i < len; i++)
		{
			var item = settings.scatterConfig[i];
			this._scatterCount[item.index].count = 0;
			for (var j = 0; j < settings.numReels; j++)
				this._scatterCount[item.index].checkedReels[j] = false;
			this._allowedAccelSound[item.index] = false;
		}

		this._stopAllRequested = false;

		if(!this._lostConnection)
			this.dispatchEvent(new Event(ReelsViewController.REELS_STOPPED));
	}

	return p;
})());