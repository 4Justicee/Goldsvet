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

			this._shouldCheckOtherReelsForStackedSymbol = true;
			this._isFirstReelFullWithStackedSymbols = false;
			this._indexOfStackedSymbol = -1;
			
			this._view = new View("", 151, 66);
			this._view.setSize(979, 540);

			this._reelsView = new CanvasView("", 0, 0);
			this._reelsView.setSize(979, 540);
			this._view.addChild(this._reelsView);

			this._stopVideosView = new CanvasView("", 0, 0);
			this._stopVideosView.setSize(979, 540);
			this._view.addChild(this._stopVideosView);

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
										  reelRotationSpeed:settings.reelRotationSpeed, reelRotationDirection:settings.reelRotationDirection, context:this._reelsView.getContext2D()}, i);
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
				this._scatterCount[item.index] = 0;
				this._allowedAccelSound[item.index] = false;
			}

			this._stopVideoPlayers = [];
			this._stopVideoImagesConfig = [];
			this._numberOfStopVideos = 0;
			
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

			if (this._stopVideoPlayers.length)
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
			for(var i = 0;i < settings.numReels;i++) {
				this._reels[i].draw(coeficient);
				if (this._stopVideoImagesConfig[i]) {
					for (var j = 0; j < this._stopVideoImagesConfig[i].length; j++) {
						if (this._stopVideoImagesConfig[i][j]) {
							var distToRest = this._reels[i].getDistToRest();
							if (distToRest != -1) {
								this._stopVideoImagesConfig[i][j].y = this._stopVideoImagesConfig[i][j].originalY + distToRest;
							}
						}
					}
				}
			}
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

			len = this._stopVideoPlayers.length;
			for (var i = 0; i < len; i++) {
				for (var j = 0; j < this._stopVideoPlayers[i].length; j++) {
					this._stopVideoPlayers[i][j].removeEventListener(VideoPlayer.VIDEO_COMPLETE, onStopVideoEnded, this);
					this._stopVideoPlayers[i][j].removeEventListener(VideoPlayer.VIDEO_READY, onStopVideoReady, this);
					this._stopVideoPlayers[i][j].dispose();
				}
			}

			if(this._accelSoundChannel)
				SoundManager.getInstance().stop(this._accelSoundChannel);

			this._stopVideoPlayers = null;
			this._stopVideoImagesConfig = null;
			
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
			if (this._scatterCount[card] != undefined)
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
				
				this._scatterCount[card]++;

				var maxScatterOnReel = 1;
				if(scatterConfig.maxScatterOnReel != undefined)
					maxScatterOnReel = scatterConfig.maxScatterOnReel;
				
				if (this._scatterCount[card] >= scatterConfig.freespinMinCount - maxScatterOnReel)
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

	function checkForStopVideos(reel) {
		var settings = GameSettings.getInstance();

		if (!settings.stopVideos)
			return;

		var spinMessage = settings.serverMessage;
		var reelIndex = reel.getIndex();
		var card;
		var stopVideoConfig;
		var img;

		for (var row = 0; row < settings.numReelCards; row++) {
			card = SpinAnalyzer.getCard(reelIndex, row, spinMessage);

			if (!settings.stopVideos[card])
				continue;

			var scatterConfig = null;
			for (var i = 0; i < settings.scatterConfig.length; i++) {
				if (settings.scatterConfig[i].index == card) {
					scatterConfig = settings.scatterConfig[i];
					break;
				}
			}

			if (scatterConfig && getActiveScatter.call(this, reelIndex) == -1)
				continue;

			stopVideoConfig = settings.stopVideos[card];

			img = Loader.getLoader(stopVideoConfig.src).getData();

			if (!img)
				return;

			if (!this._stopVideoPlayers[reelIndex]) {
				this._stopVideoPlayers[reelIndex] = [];
			}

			var videoPlayer = this._stopVideoPlayers[reelIndex][card];
			if (!videoPlayer) {
				videoPlayer = new VideoPlayer(img, this._stopVideosView.getContext2D(), stopVideoConfig);

				videoPlayer.addEventListener(VideoPlayer.VIDEO_COMPLETE, onStopVideoEnded, this);
				videoPlayer.addEventListener(VideoPlayer.VIDEO_READY, onStopVideoReady, this);

				this._stopVideoPlayers[reelIndex][card] = videoPlayer;

				this._numberOfStopVideos++;
			}

			var col = reelIndex;
			var videoPlayerInstance = { x: settings.reelCoordX + col * (settings.reelWidth + settings.reelSpacing),
										y: settings.reelCoordY + row * (settings.reelHeight / settings.numReelCards),
										originalY: settings.reelCoordY + row * (settings.reelHeight / settings.numReelCards),
										row: row, col: col};

			this._stopVideoPlayers[reelIndex][card].addInstance(videoPlayerInstance);

			if (!this._stopVideoImagesConfig[reelIndex])
				this._stopVideoImagesConfig[reelIndex] = [];

			this._stopVideoImagesConfig[reelIndex][card] = videoPlayerInstance;


			this._stopVideoImagesConfig[reelIndex][card].y += this._reels[reelIndex].getDistToRest();
		}

	}
	function hasStackedSymbolsOnReel (reel) 
	{
		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;
		var len = settings.wholeReelFiguresIndexes.length;
		var prevStackedReel = 0;

		if(this._shouldCheckOtherReelsForStackedSymbol)
		{
			for (var i = 0; i < len; i++) 
			{
				var card = settings.wholeReelFiguresIndexes[i];
				if(SpinAnalyzer.countCardOnReel(reel,card,spinMessage) == settings.numReelCards)
				{
					if(reel == 0)
					{
						this._isFirstReelFullWithStackedSymbols = true;
						this._indexOfStackedSymbol = card;
						return true;
					}
					for(var j = 0; j < settings.numReels; j++)
					{
						if (j < reel && (SpinAnalyzer.countCardOnReel(j, card, spinMessage) == settings.numReelCards))
						{
							prevStackedReel++;
						}
					}
					if(((card == this._indexOfStackedSymbol)&& this._isFirstReelFullWithStackedSymbols && this._shouldCheckOtherReelsForStackedSymbol) || prevStackedReel == reel)
						return true;

					else
						this._shouldCheckOtherReelsForStackedSymbol = false;
				}
			}
		}
		return false;
	}

	function playReelStopSound(reel)
	{
		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;
		var soundManager = SoundManager.getInstance();

		if (soundManager.hasSound("stopWildSound") && SpinAnalyzer.isCardOnReel(reel, settings.wildIndex, spinMessage))
		{
			soundManager.play("stopWildSound");
			return;
		}
		if(settings.wholeReelFiguresIndexes.length != 0 )
		{
			var playStackedSound = hasStackedSymbolsOnReel.call(this,reel);			
			if(playStackedSound)
			{
				soundManager.play(settings.wholeReelFiguresSounds[reel]);
				return;
			}
		}	
		var activeScatter = getActiveScatter.call(this, reel);
		if (activeScatter != -1) {
			soundManager.play(settings.scatterSounds[activeScatter].sounds[reel]);
			return;
		}

		soundManager.play("stopReelSound");
	}

	function getActiveScatter(reel) {
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
				var maxScatterOnReel = 1;
				if(scatterConfig.maxScatterOnReel != undefined)
					maxScatterOnReel = scatterConfig.maxScatterOnReel;

				prevScatter = nextScatter = 0;
				for (var j = 0; j < settings.numReels; j++)
				{
					if (scatterConfig.validReels[j])
					{
						if ( j < reel) 
							prevScatter += SpinAnalyzer.countCardOnReel(j, card, spinMessage);
						else if ( j > reel ) 
							nextScatter += maxScatterOnReel;
					}
				}
				if (prevScatter + nextScatter + SpinAnalyzer.countCardOnReel(reel, card, spinMessage) >= scatterConfig.minCount)
				{
					var len = settings.scatterSounds.length;
					for(var j = 0; j < len; j++)	
					{
						if(settings.scatterSounds[j].scatter == card)
						{
							return j;
						}
					}
				}
			}
		}
		
		return -1;
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

	function handleStopVideoEnded(reelIndex, card) {
		var settings = GameSettings.getInstance();
		var videoPlayer = this._stopVideoPlayers[reelIndex][card];
		var imageConfig;

		for (var row = 0; row < settings.numReelCards; row++) {
			imageConfig = this._stopVideoImagesConfig[reelIndex][row];
			if (imageConfig)
				this._stopVideoImagesConfig[reelIndex][row] = null;
		}

		videoPlayer.removeEventListener(VideoPlayer.VIDEO_COMPLETE, onStopVideoEnded, this);
		videoPlayer.removeEventListener(VideoPlayer.VIDEO_READY, onStopVideoReady, this);
		videoPlayer.dispose();

		this._numberOfStopVideos--;
		if (!this._numberOfStopVideos) {
			this._stopVideoPlayers.length = 0;
			this._stopVideoImagesConfig.length = 0;
		}

		if (this.getReelsRotating())
			return;

		onAllReelsStopped.call(this);
	}
	
	function onReelBounced(event)
	{
		this._numReelsBounced++;
		
		var reel = event.target;
		
		var settings = GameSettings.getInstance();
		var soundManager = SoundManager.getInstance();
		
		this._accelSoundChannel = soundManager.stop(this._accelSoundChannel);

		if (!this._stopAllRequested) {
			checkForStopVideos.call(this, reel);

			var reelIndex = reel.getIndex();
			if (this._stopVideoPlayers[reelIndex]) {	
				for (var i = 0; i < this._stopVideoPlayers[reelIndex].length; i++) {
					if (this._stopVideoPlayers[reelIndex][i]) {
						this._stopVideoPlayers[reelIndex][i].play();
					}
				}
			}
		}
		
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

		onAllReelsStopped.call(this);
	}

	function onAllReelsStopped() {
		var settings = GameSettings.getInstance();

		if (this._stopReelTimer)
		{
			clearTimeout(this._stopReelTimer);
			this._stopReelTimer = 0;
		}
		
		var len = settings.scatterConfig.length;
		for (var i = 0; i < len; i++)
		{
			var item = settings.scatterConfig[i];
			this._scatterCount[item.index] = 0;
			this._allowedAccelSound[item.index] = false;
		}
		
		this._stopAllRequested = false;
		if (settings.wholeReelFiguresIndexes.length != 0)
		{
			this._isFirstReelFullWithStackedSymbols = false;
			this._shouldCheckOtherReelsForStackedSymbol = true;
			this._indexOfStackedSymbol = -1;
			
		}
		if(!this._lostConnection)
			this.dispatchEvent(new Event(ReelsViewController.REELS_STOPPED));
	}

	function getStopVideoReelIndexAndCard(videoPlayer) {
		var settings = GameSettings.getInstance();

		for (var reelIndex = 0; reelIndex < settings.numReels; reelIndex++) {
			if (this._stopVideoPlayers[reelIndex]) {
				var len = this._stopVideoPlayers[reelIndex].length;
				for (var j = 0; j < len; j++) {
					if (this._stopVideoPlayers[reelIndex][j] == videoPlayer)
						return [reelIndex, j];
				}
			}
		}
		return null;
	}

	function onStopVideoEnded(event) {
		var array = getStopVideoReelIndexAndCard.call(this, event.target);

		if (array)
			handleStopVideoEnded.call(this, array[0], array[1]);
	}

	function onStopVideoReady(event) {
		return;

		// var array = getStopVideoReelIndexAndCard.call(this, event.target);

		// if (array)
		// 	handleStopVideoEnded.call(this, array[0], array[1]);
	}

	return p;
})());