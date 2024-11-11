/**
 * 
 * 
 */
View("ExpandingView", 
{
	// CONSTANTS
},
(function() {
	var p = {
		init: function() {
			this._expanded;

			var settings = GameSettings.getInstance();

			this._expWidth = settings.reelWidth;
			this._expHeight = settings.imageHeight;
			this._count;
			this._expandCanvas;
			this._oldExpCard;
			this._expFrame;

			this._super("ExpandingView", settings.reelCoordX, settings.reelCoordY);
			this.setSize(settings.numReels * (settings.reelWidth + settings.reelSpacing) - settings.reelSpacing, settings.reelHeight);
		},
		getExpanded: function() {
			return this._expanded;
		},
		assembleExpanded: function() {
			var i;
			var j;
			var arr;
			var index;
			var x;
			var y;
			var expCard;
			var expArray;
			var tmpImageData;
			var scaleX;
			var scaleY;

			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;

			// Reset the array
			this._expanded = [];

			// Get expanded symbol
			expCard = settings.reelImages[settings.cardsInfo[settings.freeSpinsExpandSymbol].reelImageIndex];
			// Calculate scale
			scaleX = this._expWidth / (expCard.width/settings.numImages);
			scaleY = this._expHeight/ (expCard.height);
			// Get frame image
			this._expFrame = Loader.getLoader(settings.frameImage).getData();

			// TODO: Destroy preventive expand wins
			// destroyExpandedWins.call(this);

			// Draw Obscuration
			this._expandCanvas = new CanvasView("ExpandCanvas");
			this._expandCanvas.setSize(settings.numReels * (settings.reelWidth + settings.reelSpacing) - settings.reelSpacing, settings.reelHeight);
			this._expandCanvas.setZIndex(4);
			var expandContext = this._expandCanvas.getContext2D();

			this.addChild(this._expandCanvas);

			expandContext.fillStyle = "black";
			expandContext.globalAlpha = 0.6;
			expandContext.fillRect(0, 0, settings.numReels * (settings.reelWidth + settings.reelSpacing) - settings.reelSpacing, settings.reelHeight);
			expandContext.globalAlpha = 1;

			// Get expanded positions in each reel
			for (var i = 0; i < settings.numReels; i++) {
				expArray = [];
				index = 1 + i * (settings.numReelCards + 2);

				// Get part of reels array for each reel
				arr = spinMessage.freeSpinsExpandReels.reels.slice(index, index + settings.numReelCards);

				// Remove reel spacing obscuration
				if (i > 0) {
					clearRect.call(this, this._expandCanvas, 
										(i * settings.reelWidth) + ((i - 1) * settings.reelSpacing),
										0, 
										settings.reelSpacing, 
										settings.reelHeight
									);
				}

				// Check if there is expand symbol on the reel
				if (arr.indexOf(settings.freeSpinsExpandSymbol) === -1)
					continue;

				// Assemble exp objects
				for (var j = 0; j < arr.length; j++) {
					// Calculate y
					y = j*this._expHeight;
					var params = {  canvas: this._expandCanvas,
									xGlobal: i*(settings.reelWidth + settings.reelSpacing),
									yGlobal: y,
									x: 0,
									y: y,
									width: this._expWidth,
									height: this._expHeight,
									sourceX: settings.cardsInfo[settings.freeSpinsExpandSymbol].x, 
									sourceY: settings.cardsInfo[settings.freeSpinsExpandSymbol].y
									};

					// Set neighbor expand
					spinMessage.reels[index + j] = settings.freeSpinsExpandSymbol;
					if (arr[j] === settings.freeSpinsExpandSymbol) {
						params.exp = false;
						params.symbols = [null, this._expFrame];
						clearRect.call(this, this._expandCanvas, 
											i*(settings.reelWidth + settings.reelSpacing),
											y, 
											this._expFrame.width*scaleX, 
											this._expFrame.height*scaleY
											);
					} else {
						params.exp = true;
						params.symbols = [expCard, this._expFrame];
					}

					expArray.push(params);
				}

				var expandView = new CExpanding(expArray.slice(), i*(settings.reelWidth + settings.reelSpacing), 0);

				this._expanded.push(expandView);

				this.addChild(expandView);
			}
		},
		destroyExpandedCards: function() {
			var i, j;
			var paramsExpand;

			if (this._expanded.length > 0) {
				for (var i = 0; i < this._expanded.length; i++) {
					paramsExpand = this._expanded[i]._params;
					j = paramsExpand.length;
					while(j--) {
						clearRect.call(this,this._expandCanvas,
											paramsExpand[j].xGlobal,
											paramsExpand[j].yGlobal,
											paramsExpand[j].width,
											paramsExpand[j].height
											);
					}
					this._expanded[i].hideSymbols(this._expFrame);
				}
			}
		},
		destroyExpandedWins: function() {
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;

			this.visible(false);

			// Destroy exp mask
			if (this._expandCanvas != null) {
				this._expandCanvas.dispose();
				this.removeChild(this._expandCanvas);
				this._expandCanvas = null;
			}

			// Destroy each exp view
			if (this._expanded && this._expanded.length > 0) {
				for (var i = 0; i < this._expanded.length; i++) {
					this._expanded[i].dispose();
					this.removeChild(this._expanded[i]);
					this._expanded[i] = null;
				}
				this._expanded = [];
				this._expanded = null;
			}
		},
		dispose: function() {
			this.destroyExpandedWins();
			this._super();
		}
	}

	function clearRect(canvas, x, y, width, height) {
		canvas.getContext2D().clearRect(x, y, width, height);
	}

	return p;
})());