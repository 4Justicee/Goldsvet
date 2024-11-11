/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

CanvasView("CustomResultView",
{
	WIDTH: 750
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			this._config = config;
			this._open = false;
			this._useCustom = false;
			this._reels = [];
			this._selectedImage = -1;
			this._gameContainer = $("#Game");
			
			this._customResultButtonRect 	= {x: 575, y: 60, width: 100, height:45};
			this._selectImageRect			= {x: 30, y:130, width: 55, height:55};
			this._reelImageRect				= {x: 30, y: 190, width: 55, height:55};
			
			this._super("customResultView", -CustomResultView.WIDTH, 50);
			this.setSize(CustomResultView.WIDTH, 600);
			this.setZIndex(1000);
			
			this._showHideButton = new Button("showHideCustomResultButton", CustomResultView.WIDTH, 245);
			this._showHideButton.addEventListener(MouseEvent.CLICK, onShowHideButtonClick, this);
			this.addChild(this._showHideButton);
			
			this._context.globalAlpha = 0.5;
			this._context.fillRect(0, 0, CustomResultView.WIDTH, 600);
			
			this._context.globalAlpha = 1;
			this._context.fillStyle = "#00ff00";
			this._context.fillRect(this._customResultButtonRect.x, this._customResultButtonRect.y, this._customResultButtonRect.width, this._customResultButtonRect.height);

			// draw the select images
			for(var i = 0;i < this._config.numImages; i++)
			{	
				
				this._context.drawImage(this._config.reelImages[this._config.cardsInfo[i].reelImageIndex], this._config.cardsInfo[i].x, this._config.cardsInfo[i].y, 
										this._config.reelWidth, this._config.imageHeight, this._selectImageRect.x + i*this._selectImageRect.width, 
										this._selectImageRect.y, this._selectImageRect.width, this._selectImageRect.height);
			}
			selectImage.call(this, 0);
			
			// draw the reel images
			var len = (this._config.numReelImages+2)*this._config.numReels;
			for(var i = 0;i < len; i++)
			{
				this._reels[i] = 0;
				
				if(i%(this._config.numReelImages+2) > 0 && i%(this._config.numReelImages+2) < this._config.numReelImages+1)
					drawReelImage.call(this, i, 0);
			}
			
			var self = this;
			this._canvas.on("touchstart mousedown", function(event) { onTouchStart.call(self, event); });
		},
		
		getResult: function() { return this._useCustom ? {reels: this._reels.slice()} : null; }
	};
	
	function isInsideRect(left, top, width, height, x, y)
	{
		if(x > left && y > top && x < left + width && y < top + height)
			return true;
			
		return false;
	}
	
	function selectImage(index)
	{
		if(index == this._selectedImage)
			return;
			
		if(this._selectedImage != -1)
		{
			this._context.clearRect(this._selectImageRect.x+this._selectedImage*this._selectImageRect.width, this._selectImageRect.y, this._selectImageRect.width, this._selectImageRect.height);
			this._context.fillStyle = "#8c8c8c";
			this._context.globalAlpha = 0.5;
			this._context.fillRect(this._selectImageRect.x+this._selectedImage*this._selectImageRect.width, this._selectImageRect.y, this._selectImageRect.width, this._selectImageRect.height);
			this._context.globalAlpha = 1;
			this._context.drawImage(this._config.reelImages[this._config.cardsInfo[this._selectedImage].reelImageIndex], this._config.cardsInfo[this._selectedImage].x, this._config.cardsInfo[this._selectedImage].y, 
									this._config.reelWidth, this._config.imageHeight, this._selectImageRect.x + this._selectedImage*this._selectImageRect.width, 
									this._selectImageRect.y, this._selectImageRect.width, this._selectImageRect.height);
		}
		
		this._selectedImage = index;
		this._context.strokeStyle = "#ff0000";
		this._context.lineWidth = 3;
		this._context.strokeRect(this._selectImageRect.x+this._selectedImage*this._selectImageRect.width+2, this._selectImageRect.y+2, this._selectImageRect.width-4, 
								 this._selectImageRect.height-4);
	}
	
	function drawReelImage(index, image)
	{
		this._reels[index] = image;
		
		this._context.clearRect(this._reelImageRect.x + Math.floor(index/(this._config.numReelImages+2))*this._reelImageRect.width, 
								this._reelImageRect.y + (index%(this._config.numReelImages+2))*this._reelImageRect.height, this._reelImageRect.width, this._reelImageRect.height);
		this._context.fillStyle = "#8c8c8c";
		this._context.globalAlpha = 0.5;
		this._context.fillRect(this._reelImageRect.x + Math.floor(index/(this._config.numReelImages+2))*this._reelImageRect.width, 
							   this._reelImageRect.y + (index%(this._config.numReelImages+2))*this._reelImageRect.height, this._reelImageRect.width, this._reelImageRect.height);
		this._context.globalAlpha = 1;
		this._context.drawImage(this._config.reelImages[this._config.cardsInfo[image].reelImageIndex], this._config.cardsInfo[image].x, this._config.cardsInfo[image].y, 
								this._config.reelWidth, this._config.imageHeight, this._reelImageRect.x + Math.floor(index/(this._config.numReelImages+2))*this._reelImageRect.width, 
								this._reelImageRect.y + (index%(this._config.numReelImages+2))*this._reelImageRect.height, this._reelImageRect.width, this._reelImageRect.height);
	}
	
	function onTouchStart(event)
	{
		var touch = event;
		if(event.type == "touchstart")
			touch = event.originalEvent.touches[0];
		
		var touchX = Math.floor((touch.clientX-this._gameContainer.position().left)/Device.scale)-this.x();
		var touchY = Math.floor((touch.clientY-this._gameContainer.position().top)/Device.scale)-this.y();

		if(isInsideRect(this._customResultButtonRect.x, this._customResultButtonRect.y, this._customResultButtonRect.width, this._customResultButtonRect.height, touchX, touchY))
		{
			// use custom button pressed
			if(this._useCustom)
				this._context.fillStyle = "#00ff00";
			else
				this._context.fillStyle = "#ff0000";
				
			this._context.fillRect(this._customResultButtonRect.x, this._customResultButtonRect.y, this._customResultButtonRect.width, this._customResultButtonRect.height);
			this._useCustom = !this._useCustom;
		}
		else
		{
			// check wether we clicked some of the select images
			if(isInsideRect(this._selectImageRect.x, this._selectImageRect.y, this._config.numImages*this._selectImageRect.width, this._selectImageRect.height, touchX, touchY))
			{
				// one of the select images was clicked
				// find which one
				var selImage = Math.floor((touchX-this._selectImageRect.x)/this._selectImageRect.width);
				selectImage.call(this, selImage);
			}
			else if(isInsideRect(this._reelImageRect.x, this._reelImageRect.y+this._reelImageRect.height, this._config.numReels*this._reelImageRect.width, 
					this._config.numReelImages*this._reelImageRect.height, touchX, touchY))
			{
				// one of the reel images was clicked
				// find which one
				var col = Math.floor((touchX-this._reelImageRect.x)/this._reelImageRect.width);
				var row = Math.floor((touchY-(this._reelImageRect.y+this._reelImageRect.height))/this._reelImageRect.height);
				var imageIndex = col*(this._config.numReelImages+2) + row+1;
				console.log(row, col);
				drawReelImage.call(this, imageIndex, this._selectedImage);
			}
		}
	}
	
	function onShowHideButtonClick(event)
	{
		if(this._open)
			this.setPosition(-CustomResultView.WIDTH, this.y());
		else
			this.setPosition(0, this.y());
		
		this._open = !this._open;
	}
	
	return p;
})());
		
		
//function CustomResultView(config)
//{
//	var self = this;
//	
//	var _config = config;
//	var _ctx;
//	var _canvas;
//	var _open = false;
//	var _useCustom = false;
//	var _reels;
//	var _selectedImage = -1;
//	
//	var customResultButtonRect 	= {x: 575, y: 60, width: 100, height:45};
//	var selectImageRect			= {x: 30, y:130, width: 55, height:55};
//	var reelImageRect			= {x: 30, y: 190, width: 55, height:55};
//	
//	function constructor()
//	{
//		_canvas = $("<canvas id='CustomResult'></canvas>");
//		viewport.append(_canvas);
//		_ctx = _canvas[0].getContext("2d");
//		_ctx.canvas.width = 680;
//		_ctx.canvas.height = 600;
//		
//		_ctx.globalAlpha = 0.5;
//		_ctx.fillRect(0, 0, 680, 600);
//		
//		_ctx.globalAlpha = 1;
//		_ctx.fillStyle = "#00ff00";
//		_ctx.fillRect(customResultButtonRect.x, customResultButtonRect.y, customResultButtonRect.width, customResultButtonRect.height);
//		
//		_reels = new Array((_config.numReelImages+2)*_config.numReels);
//		
//		// draw the select images
//		for(var i = 0;i < _config.numImages;i++)
//		{	
//			
//			_ctx.drawImage(_config.reelImages[_config.cardsInfo[i].reelImageIndex], _config.cardsInfo[i].x, _config.cardsInfo[i].y, _config.reelWidth, _config.imageHeight, selectImageRect.x + i*selectImageRect.width, 
//							selectImageRect.y, selectImageRect.width, selectImageRect.height);
//		}
//		selectImage(0);
//		
//		// draw the reel images
//		var len = _reels.length;
//		for(var i = 0;i < len; i++)
//		{
//			_reels[i] = 0;
//			
//			if(i%(_config.numReelImages+2) > 0 && i%(_config.numReelImages+2) < _config.numReelImages+1)
//				drawReelImage(i, 0);
//		}
//		
//		_canvas.on("touchstart", onTouchStart);
//	}
//	
//	self.getResult = function() { return _useCustom ? {reels: _reels.slice()} : null; }
//	self.toggleShowHide = function() 
//	{
//		if(_open)
//			_canvas.removeClass("shown");
//		else
//			_canvas.addClass("shown");
//		
//		_open = !_open;
//	}
//	
//	
//	
//	constructor();
//}