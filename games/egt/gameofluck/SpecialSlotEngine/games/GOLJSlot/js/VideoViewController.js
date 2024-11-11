/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("VideoViewController",
{
	EXPAND_COMPLETE: "expandComplete",
	SCATTER_COMPLETE:"scatterComplete",
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

			var settings = GameSettings.getInstance();
			this._expandOffsetX = settings.expandVideo.offsetX ? settings.expandVideo.offsetX : 0;
			this._expandOffsetY = settings.expandVideo.offsetY ? settings.expandVideo.offsetY : 0;
			this._expandX = (settings.expandVideo.width*settings.expandVideo.scale - settings.reelWidth - this._expandOffsetX);
			this._expandY = (settings.expandVideo.height*settings.expandVideo.scale - settings.imageHeight - this._expandOffsetY);
			
			this._view = new CanvasView("", 151 - Math.round(this._expandX/2), 66 - Math.round(this._expandY/2));
			this._view.setSize(979 + this._expandX, 540 + this._expandY);
			this._view.setZIndex(83);
			
			var spinMessage = settings.serverMessage;

			this._videoPlayers =[];
			this._videoBitmapDatas =[];
			this._videoBitmaps =[];
			this._expandSpecialVideoBitmaps =[];
			this._expandSpecialRainbow =[];
			this._sortedExpandArrays =[];
			this._caseOfRainbowAnimation =[];
			

			var j = 0;
			
			var len = spinMessage.expand.length;
			if(!settings.processingSubscribe && !spinMessage.scatters.length)
			{
				for (var i = 0; i < len; i += 2)
					createVideo.call(this, spinMessage.expand[i], spinMessage.expand[i + 1], true);
				//new Part Special
				if (len != 0 && settings.specialExpandSymbol)
				{
					len = spinMessage.specialExpand.length;
					for (i = 0; i < len; i += 2)
					{
						createVideo.call(this,spinMessage.specialExpand[i], spinMessage.specialExpand[i + 1], false, false, false, true);
						
						var internalSortArray=[];
						var k= 0;
						var col= spinMessage.specialExpand[i];
						var row= spinMessage.specialExpand[i + 1];
						
 						if ((col - 1) >= 0 )
						{
							internalSortArray[k] = (row * settings.numReels) + (col - 1);
							k++;
						}
						if (isExistBottomRow(col, row))
						{
							if ((col - 1) >= 0 )
							{
								internalSortArray[k] = ((row+1) * settings.numReels) + (col - 1)
								k++;
							}
							
							internalSortArray[k] = ((row+1) * settings.numReels) + (col)
							k++;
							
							if ((col + 1 < settings.numReels))
							{
								internalSortArray[k] = ((row+1) * settings.numReels) + (col + 1);
								k++;
							}
						}
						if ((col + 1 < settings.numReels))
						{
							internalSortArray[k] = (row * settings.numReels) + (col +1);
							k++;
						}
						if (isExistUpperRow(col, row))
						{
							if((col + 1) < settings.numReels)
							{
								internalSortArray[k] = ((row-1) * settings.numReels) + (col +1);
								k++;
							}
							internalSortArray[k] = ((row-1) * settings.numReels) + (col);
							k++;
							if ((col - 1) >= 0 )
								internalSortArray[k] = ((row-1) * settings.numReels) + (col -1);
						}
						this._caseOfRainbowAnimation[j] = chekCaseOfRainbow.call(this,col, row);
						this._sortedExpandArrays[j] = internalSortArray;
						j++;
					}
				}
			}

			if ((spinMessage.expand.length && !spinMessage.scatters.length) || !spinMessage.expand.length)
			{
				len = spinMessage.lines.length;
				for (var i = 0; i < len; i++)
				{
					var cells = spinMessage.lines[i].cells;
					var cellsLen = cells.length;
					for (var j = 0; j < cellsLen; j+=2)
						createVideo.call(this, cells[j], cells[j + 1], false);
				}
			}
			
			len = spinMessage.scatters.length;
			for (var i = 0; i < len; i++)
			{
				var cellsLen = spinMessage.scatters[i].cells.length;
				for (var j = 0; j < cellsLen; j += 2)
				{
					var player = createVideo.call(this, spinMessage.scatters[i].cells[j], spinMessage.scatters[i].cells[j + 1], false ,null, spinMessage.expand.length);
					if (spinMessage.expand.length && i == 0 && player)
					{
						player.addEventListener(VideoPlayer.VIDEO_COMPLETE, onScatterEnded , this);
					}

				}

			}
			
			Loader.getQueue("slotVideos").addEventListener(LoaderEvent.COMPLETE, onVideoSpritesLoaded, this);
		},
		
		start: function()
		{
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;
			var soundManager = SoundManager.getInstance();

			if (spinMessage.expand.length && spinMessage.scatters.length) 
			{
				playWinVideos.call(this);
				return;
			};
			
			if(spinMessage.expand.length)
			{
				if (this._videos[settings.reelVideos.length])
					this._videos[settings.reelVideos.length].play();
				else
				{
					if(settings.processingSubscribe || !spinMessage.expand.length)
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
				if(!settings.processingSubscribe|| !spinMessage.expand.length)
					soundManager.play("expandSound");
			}
			else
			{
				this.dispatchEvent(new Event(VideoViewController.EXPAND_COMPLETE));
				playWinVideos.call(this);
			}

			if (this._videos[settings.reelVideos.length+1])
			{
				// for each(bitmap in _expandSpecialVideoBitmaps)
				// 	_view.addChild(bitmap);
				this._videos[settings.reelVideos.length + 1].play();
				
				for (var i = 0; i < this._expandSpecialRainbow.length; i++) {
					this._view.addChild(this._expandSpecialRainbow[i]);
				}
				
				var k = 0;
				for (var i = 0 ; i < this._expandSpecialRainbow.length; i++)
				{
					
					switch(this._caseOfRainbowAnimation[i])
					{
							case 1: 
								for ( k = 1 ; k <this._sortedExpandArrays[i].length + 1; k++)
								{
									this._expandSpecialRainbow[i].addEventListener("ShowVideo1." + String(k) , videosHandler, this);
									this._expandSpecialRainbow[i].addEventListener("LastFrameReached" , lastFrameHandler, this);
									
								}
							break;
							case 2:
								for (k = 1 ; k <this._sortedExpandArrays[i].length + 1; k++)
								{
									this._expandSpecialRainbow[i].addEventListener("ShowVideo2." + String(k) , videosHandler, this);
									this._expandSpecialRainbow[i].addEventListener("LastFrameReached" , lastFrameHandler, this);
									
								}
							break;
					}
			
				}
				var self = this;
				this._timer = setInterval(function() { changeFrame.call(self); }, 1000/settings.specialRainbowAnimationFrameRate);
				
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
	
	function createVideo(col, row, expand, startFromLoop, ignoreExpand, specialExpand)
	{
		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;

		ignoreExpand = typeof ignoreExpand !== 'undefined' ? ignoreExpand : false;
   		specialExpand = typeof specialExpand !== 'undefined' ? specialExpand : false;
		
		var card = specialExpand ? settings.reelVideos.length+1 : expand ? settings.reelVideos.length : ignoreExpand ? SpinAnalyzer.getCard(col, row, spinMessage) : SpinAnalyzer.getCardAfterExpand(col, row, spinMessage);

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
		
		var videoConfig = specialExpand ? settings.specialExpandSymbol: expand ? settings.expandVideo : settings.reelVideos[card];

		if(!videoConfig)
			return;
			
		var img = Loader.getLoader(videoConfig.src).getData();
		
		if(!img)
		{
			if(!expand && !specialExpand)
				this._requestedVideos.push({col: col, row: row});
			
			return;
		}
			
		if(!this._videos[card])
		{
			videoConfig.loop = !expand;
			var videoPlayer = new VideoPlayer(img, this._view.getContext2D(), videoConfig, startFromLoop);
			
			if(expand)
				videoPlayer.addEventListener(VideoPlayer.VIDEO_COMPLETE, onExpandComplete, this);
			else
				videoPlayer.addEventListener(VideoPlayer.VIDEO_READY, onVideoReady, this);
																
			this._videos[card] = videoPlayer;
		}
		
		if (specialExpand)
		{
			var specialAnimation = new SpecialAnimation();
			var xPos = (settings.reelCoordX + col * (settings.reelWidth + settings.reelSpacing)) - ((specialAnimation.getWidth() - settings.reelWidth) / 2);
			var yPos = (settings.reelCoordY + row * (settings.reelHeight / settings.numReelCards)) - ((specialAnimation.getHeight() - (settings.reelHeight / settings.numReelCards)) / 2);
			specialAnimation.setPosition(xPos, yPos);
			this._expandSpecialRainbow[this._expandSpecialRainbow.length] = specialAnimation;
		}
		this._videos[card].addInstance({ x: (expand ? settings.reelCoordX + this._expandOffsetX : settings.reelCoordX + Math.round(this._expandX/2)) + 
											col * (settings.reelWidth + settings.reelSpacing),
										 y: (expand ? settings.reelCoordY + this._expandOffsetY : settings.reelCoordY + Math.round(this._expandY/2)) + 
										 	row * (settings.reelHeight / settings.numReelCards),
										 row:row,col:col, visible: expand ? false : true}, 
										 expand ? row*settings.numReels + col : -1);

		return this._videos[card];
	}
	function videosHandler(e)
	{
		var settings = GameSettings.getInstance();
		var index = parseInt(e.type.slice(e.type.length - 1, e.type.length));
		var cells= [];
		var len = this._expandSpecialRainbow.length;
		for (var i = 0; i < len; i++)
		{
			if (this._expandSpecialRainbow[i] == e.target)
				break;
		}
		var instanceIndex = this._sortedExpandArrays[i][index - 1];
		cells.push(instanceIndex % settings.numReels, parseInt(instanceIndex / settings.numReels));

		this._videos[settings.reelVideos.length].setInstanceVisible(true, instanceIndex);

		this.dispatchEvent(new Event(VideoViewController.CLEAR_CELLS, { cells: cells }));
	}
	function lastFrameHandler(e)
	{
		clearInterval(this._timer);
		for (var i = 0; i < this._expandSpecialRainbow.length; i++) {
				this._expandSpecialRainbow[i].dispose();
		}
	}

	function chekCaseOfRainbow(c, r)
	{
		if (isExistBottomRow.call(this,c,r) && isExistUpperRow.call(this,c,r))
			return 1;
		else 
			return 2;
			
	}
	function isExistBottomRow(c, r)
	{
		var settings = GameSettings.getInstance();
		if (r >= 0 && r < settings.numReelCards-1 )
			return true;
		else
			return false;
	}
	function isExistUpperRow(c, r)
	{
		var settings = GameSettings.getInstance();
		if (r <= settings.numReelCards && r > 0 )
			return true;
		else
			return false;
	}
	function changeFrame()
	{
		for (var i = 0; i < this._expandSpecialRainbow.length; i++) {
			this._expandSpecialRainbow[i].changeFrame();
		}
	}
	
	function playWinVideos()
	{
		var settings = GameSettings.getInstance();
		if (this._videos[settings.reelVideos.length+1])
		{
			this._videos[settings.reelVideos.length+1].removeEventListener(VideoPlayer.VIDEO_READY, onVideoReady, this);
			this._videos[settings.reelVideos.length+1].removeEventListener(VideoPlayer.VIDEO_COMPLETE, onExpandComplete, this);
			this._videos[settings.reelVideos.length+1].dispose();
			this._videos[settings.reelVideos.length+1] = null;
		}
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
		this.dispatchEvent(new Event(VideoViewController.EXPAND_COMPLETE));
		playWinVideos.call(this);
	}
	function onScatterEnded(event)
	{
		event.target.removeEventListener(VideoPlayer.VIDEO_COMPLETE, onScatterEnded,this);
		this.dispatchEvent(new Event(VideoViewController.SCATTER_COMPLETE));
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