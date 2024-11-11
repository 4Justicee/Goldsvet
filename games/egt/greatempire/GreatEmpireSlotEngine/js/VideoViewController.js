/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("VideoViewController",
{
	EXPAND_COMPLETE: "expandComplete",
	CLEAR_CELLS: "clearCells"
},
(function()
{
	var p =
	{
		init: function()
		{
			this._videos = [];
			this._requestedVideos = [];
			this._winVideosStarted = false;
			
			this._super();
			
			this._view = new CanvasView("", 151, 66);
			this._view.setSize(979, 540);
			this._view.setZIndex(3);
			
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;
			
			var len = spinMessage.expand.length;
			if(!settings.processingSubscribe)
				for (var i = 0; i < len; i += 2)
					createVideo.call(this, spinMessage.expand[i], spinMessage.expand[i + 1], true);
			
			len = spinMessage.lines.length;
			for (var i = 0; i < len; i++)
			{
				var cells = spinMessage.lines[i].cells;
				var cellsLen = cells.length;
				for (var j = 0; j < cellsLen; j+=2)
					createVideo.call(this, cells[j], cells[j + 1], false);
			}
			
			len = spinMessage.scatters.length;
			for (var i = 0; i < len; i++)
			{
				var cellsLen = spinMessage.scatters[i].cells.length;
				for (var j = 0; j < cellsLen; j += 2)
					createVideo.call(this, spinMessage.scatters[i].cells[j], spinMessage.scatters[i].cells[j + 1], false);
			}
			
			Loader.getQueue("slotVideos").addEventListener(LoaderEvent.COMPLETE, onVideoSpritesLoaded, this);
		},
		
		start: function()
		{
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;
			var soundManager = SoundManager.getInstance();
			
			if(spinMessage.expand.length)
			{
				if (this._videos[settings.reelVideos.length])
					this._videos[settings.reelVideos.length].play();
				else
				{
					if(settings.processingSubscribe)
					{
						this.dispatchEvent(new Event(VideoViewController.EXPAND_COMPLETE));
						playWinVideos.call(this);
					}
					else
					{
						var self = this;
						var soundLength = soundManager.getSoundLength("expandSound")*1000;
						if(soundLength <= 0)
							soundLength = 1200;
						setTimeout(function()
						{
							self.dispatchEvent(new Event(VideoViewController.EXPAND_COMPLETE));
							playWinVideos.call(self);
						}, soundLength);
					}
				}
				if(!settings.processingSubscribe)
					soundManager.play("expandSound");
			}
			else
			{
				this.dispatchEvent(new Event(VideoViewController.EXPAND_COMPLETE));
				playWinVideos.call(this);
			}
		},
		
		dispose: function()
		{
			Loader.getQueue("slotVideos").removeEventListener(LoaderEvent.COMPLETE, onVideoSpritesLoaded, this);
			
			var len = this._videos.length;
			for(var i = 0;i < len;i++)
				if(this._videos[i])
					this._videos[i].dispose();

			this._super();
		}
	};
	
	function createVideo(col, row, expand, startFromLoop)
	{
		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;
		
		var card = expand ? settings.reelVideos.length : SpinAnalyzer.getCardAfterExpand(col, row, spinMessage);

		var scatterConfig;
		var len = settings.scatterConfig.length;
		for(var i = 0;i < len;i++)
			if (card == settings.scatterConfig[i].index)
			{
				scatterConfig = settings.scatterConfig[i];
				break;
			}
			
		if (spinMessage.freeSpinScatters && scatterConfig && scatterConfig.freespinsVideoIndex != -1)
		{
			len = spinMessage.freeSpinScatters.length;
			for (var i = 0; i < len; i++)
			{
				if (spinMessage.freeSpinScatters[i] == card)
				{
					card = scatterConfig.freespinsVideoIndex;
					break;
				}
			}
		}
		
		var videoConfig = expand ? settings.expandVideo : settings.reelVideos[card];
		if(!videoConfig)
			return;
			
		var img = Loader.getLoader(videoConfig.src).getData();
		
		if(!img)
		{
			if(!expand)
				this._requestedVideos.push({col: col, row: row});
			
			return;
		}
			
		if(!this._videos[card])
		{
			videoConfig.loop = !expand;
			var videoPlayer = new VideoPlayer(img, this._view.getContext2D(), videoConfig, startFromLoop);
			
			videoPlayer.addEventListener(VideoPlayer.VIDEO_READY, onVideoReady, this);
			if(expand)
				videoPlayer.addEventListener(VideoPlayer.VIDEO_COMPLETE, onExpandComplete, this);
																
			this._videos[card] = videoPlayer;
		}
		
		this._videos[card].addInstance({ x: settings.reelCoordX + col * (settings.reelWidth + settings.reelSpacing),
										 y: settings.reelCoordY + row * (settings.reelHeight / settings.numReelCards),
										 row:row,col:col});
	}
	
	function playWinVideos()
	{
		var settings = GameSettings.getInstance();
		if (this._videos[settings.reelVideos.length])
		{
			this._videos[settings.reelVideos.length].removeEventListener(VideoPlayer.VIDEO_READY, onVideoReady, this);
			this._videos[settings.reelVideos.length].removeEventListener(VideoPlayer.VIDEO_COMPLETE, onExpandComplete, this);
			this._videos[settings.reelVideos.length].dispose();
			this._videos[settings.reelVideos.length] = null;
		}

		var len = this._videos.length;
		for(var i = 0;i < len;i++)
		{
			if(!this._videos[i] || this._videos[i].isPlaying())
				continue;
				
			this._videos[i].play();
		}
		
		this._winVideosStarted = true;
	}
	
	function onVideoReady(event) { this.dispatchEvent(new Event(VideoViewController.CLEAR_CELLS, { cells: event.target.getVideoCells() })); }
	
	function onExpandComplete()
	{
		console.log("EXPAND COMPLETE");
		this.dispatchEvent(new Event(VideoViewController.EXPAND_COMPLETE));
		playWinVideos.call(this);
	}
	
	function onVideoSpritesLoaded(event)
	{
		var len = this._requestedVideos.length;
		for (var i = 0;i < len;i++)
			createVideo.call(this, this._requestedVideos[i].col, this._requestedVideos[i].row, false, true);
		
		if(this._winVideosStarted)
			playWinVideos.call(this);
	}
	
	return p;
})());