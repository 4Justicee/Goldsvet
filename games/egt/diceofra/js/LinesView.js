/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

CanvasView("LinesView",
{
	BLINKING_COMPLETE: "blinkingComplete"
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._config = config;
			this._blinkTimer;
			this._targetBlinkCount;
			this._currentBlinkCount;
			this._blinkPhase;
			this._linesDrawn;
			this._colorMultiplier;
			this._lastDrawnPositions;
			this._lastDrawnLine;
			this._lastDrawnColor;
			this._lastBoundingRectangle;
		
			this._super("", 151, 66);
			this.setSize(979, 540);
			this.setZIndex(4);

			this._colorMultiplier = 1;
			this._lastDrawnLine = -1;
			this._lastBoundingRectangle = {};
		},
		
		drawLines: function(count)
		{
			var gfx;
			var color;
			
			this._linesDrawn = count;
			
			this._context.lineWidth = 8;
			this._context.lineJoin = "round";
			this._context.lineCap = "round";

			for (var i = 0; i < count; i++)
			{
				this._context.beginPath();
				
				gfx = this._config.lines[i].gfx;
				color = this._config.lines[i].color;
				
				_ctx.strokeStyle = color;

				this._context.moveTo(gfx[0], gfx[1]+4);
				var len = gfx.length;
				for (var j = 2; j < len; j += 2)
					this._context.lineTo(gfx[j], gfx[j + 1]+4);
					
				this._context.stroke();
			}
		},
			
		drawLine: function(positions, lineIndex)
		{
			this._lastDrawnPositions = positions.slice();
			this._lastDrawnLine = lineIndex;
			
			positions = positions.slice();
			var len = positions.length / 2 + 1;
			for (var i = 1; i < len; i++)
				positions.splice(i, 1);
			
			var gfx = this._config.lines[lineIndex].gfx;
			var color = this._config.lines[lineIndex].color;
			var cells = this._config.lines[lineIndex].cells;
			var funcType = this._config.lines[lineIndex].functionType;
			
			var r = (color >> 16) & 0xff;
			var g = (color >> 8) & 0xff;
			var b = color & 0xff;
			if(this._colorMultiplier != 1)
			{
				r = Math.floor(r*this._colorMultiplier);
				g = Math.floor(g*this._colorMultiplier);
				b = Math.floor(b*this._colorMultiplier);
			}
			
			this._context.strokeStyle = "#"+colorToString.call(this, r)+colorToString.call(this, g)+colorToString.call(this, b);
			this._context.lineWidth = 8;
			this._context.lineJoin = "round";
			this._context.lineCap = "round";
			this._context.beginPath();
			
			this._lastBoundingRectangle.left = gfx[0];
			this._lastBoundingRectangle.right = gfx[gfx.length-2];
			this._lastBoundingRectangle.top = this._context.canvas.height;
			this._lastBoundingRectangle.bottom = 0;

			var index = 0;
			var cellHeight = Math.floor(this._config.reelHeight / this._config.numReelImages);
			var x,y;
			for (i = 0; i < this._config.numReels; i++)
			{
				var arr = [];
				
				if (funcType[index + 1] == 0 && funcType[index + 2] == 0)
					// 3 points belong to the cell on this reel
					arr.push(index++, index++, index++);
				else
					// 2 points belong to the cell on this reel
					arr.push(index++, index++);
					
				var firstIndex = arr[0];
				if (firstIndex != 0)
				{
					y = gfx[(firstIndex - 1) * 2 +1];
					this._context.moveTo(gfx[(firstIndex - 1) * 2], y);
					if(this._lastBoundingRectangle.top > y)
						this._lastBoundingRectangle.top = y;
					if(this._lastBoundingRectangle.bottom < y)
						this._lastBoundingRectangle.bottom = y;
				}
				
				var pos = positions.indexOf(i);
				if (pos == -1)
				{
					var len = arr.length;
					for(var j = 0; j < len; j++)
					{
						y = gfx[arr[j] * 2 + 1];
						if (arr[j] == 0)
							this._context.moveTo(gfx[arr[j] * 2], y);
						else
							this._context.lineTo(gfx[arr[j] * 2], y);
							
						if(this._lastBoundingRectangle.top > y)
							this._lastBoundingRectangle.top = y;
						if(this._lastBoundingRectangle.bottom < y)
							this._lastBoundingRectangle.bottom = y;
					}
				}
				else
				{
					for(var j = 0; j < len; j++)
					{
						y = gfx[arr[j] * 2 + 1];
						if (funcType[arr[j]] == 0)
							this._context.moveTo(gfx[arr[j] * 2], y);
						else
							this._context.lineTo(gfx[arr[j] * 2], y);
							
						if(this._lastBoundingRectangle.top > y)
							this._lastBoundingRectangle.top = y;
						if(this._lastBoundingRectangle.bottom < y)
							this._lastBoundingRectangle.bottom = y;
					}
				}
				
				if (pos != -1)
				{
					var col = cells[i*2];
					var row = cells[i*2 + 1];
					x = this._config.reelCoordX + col * (this._config.reelWidth + this._config.reelSpacing);
					y = this._config.reelCoordY + row * cellHeight;
					
					if(i == 0)
						this._lastBoundingRectangle.left = x;
					else if(i == this._config.numReels-1)
						this._lastBoundingRectangle.right = x + this._config.reelWidth;
						
					if(this._lastBoundingRectangle.top > y)
						this._lastBoundingRectangle.top = y;
					if(this._lastBoundingRectangle.bottom < y+cellHeight)
						this._lastBoundingRectangle.bottom = y+cellHeight;
					
					this._context.strokeRect(x, y, this._config.reelWidth, cellHeight);
				}
			}
			
			this._context.stroke();
		},
		
		drawCells: function(positions, defaultColor)
		{
			if(defaultColor == undefined)
				defaultColor = 0x19e616;
				
			this._lastDrawnPositions = positions.slice();
			this._lastDrawnColor = defaultColor;
			
			var r = (defaultColor >> 16) & 0xff;
			var g = (defaultColor >> 8) & 0xff;
			var b = defaultColor & 0xff;
			if(this._colorMultiplier != 1)
			{
				r = Math.floor(r*this._colorMultiplier);
				g = Math.floor(g*this._colorMultiplier);
				b = Math.floor(b*this._colorMultiplier);
			}
			
			this._context.strokeStyle = "#"+colorToString.call(this, r)+colorToString.call(this, g)+colorToString.call(this, b);
			this._context.lineWidth = 8;
			this._context.lineJoin = "round";
			
			this._lastBoundingRectangle.left = this._context.canvas.width;
			this._lastBoundingRectangle.right = 0;
			this._lastBoundingRectangle.top = this._context.canvas.height;
			this._lastBoundingRectangle.bottom = 0;
			
			var cellHeight = Math.floor(this._config.reelHeight / this._config.numReelImages);
			var len = positions.length;
			var x,y;
			for (var i = 0; i < len; i += 2)
			{
				var col = positions[i];
				var row = positions[i + 1];
				x = this._config.reelCoordX + col * (this._config.reelWidth + this._config.reelSpacing);
				y = this._config.reelCoordY + row * cellHeight;
				
				if(this._lastBoundingRectangle.left > x)
					this._lastBoundingRectangle.left = x;
				if(this._lastBoundingRectangle.right < x + this._config.reelWidth)
					this._lastBoundingRectangle.right = x + this._config.reelWidth;
				if(this._lastBoundingRectangle.top > y)
					this._lastBoundingRectangle.top = y;
				if(this._lastBoundingRectangle.bottom < y + cellHeight)
					this._lastBoundingRectangle.bottom = y + cellHeight;
				
				this._context.strokeRect(x, y, this._config.reelWidth, cellHeight);
			}
		},
		
		startBlinking: function(count, blinkInterval)
		{
			if (this._blinkTimer)
				return;
				
			this._targetBlinkCount = count;
			this._currentBlinkCount = 0;
			this._blinkPhase = 0;
			
			var self = this;
			this._blinkTimer = setInterval(function() { onBlinkTimer.call(self); }, blinkInterval);
		},
		
		dispose: function()
		{
			if(this._blinkTimer)
			{
				clearInterval(this._blinkTimer);
				this._blinkTimer = 0;
			}
			
			clearLines.call(this);
			
			this._super();
		}
	};

	function clearLines()
	{
		var x = this._lastBoundingRectangle.left-5;
		var y = this._lastBoundingRectangle.top-5;
		var width = 10+this._lastBoundingRectangle.right-this._lastBoundingRectangle.left;
		var height = 10+this._lastBoundingRectangle.bottom-this._lastBoundingRectangle.top;
		this._context.clearRect(x, y, width, height);
		//_ctx.fillStyle = "#ffffff";
		//_ctx.globalAlpha = 0.5;
		//_ctx.fillRect(x, y, width, height);
		this._linesDrawn = 0;
	}
		
	function onBlinkTimer()
	{
		this._blinkPhase = this._blinkPhase == 0 ? 1 : 0;
			
		if (this._blinkPhase == 0 && ++this._currentBlinkCount == this._targetBlinkCount)
		{
			clearInterval(this._blinkTimer);
			this._blinkTimer = 0;
			
			this._colorMultiplier = 1;
			this._lastDrawnLine = -1;
			
			clearLines.call(this);

			this.dispatchEvent(new Event(LinesView.BLINKING_COMPLETE));

			return;
		}
		
		this._colorMultiplier = this._blinkPhase == 0 ? 1 : 0.7;
		
		if(this._lastDrawnLine != -1)
			this.drawLine(this._lastDrawnPositions, this._lastDrawnLine);
		else
			this.drawCells(this._lastDrawnPositions, this._lastDrawnColor);
	}
	
	function colorToString(component)
	{
		var stringColor = component.toString(16);
		if(stringColor.length == 1)
			stringColor = "0"+stringColor;
			
		return stringColor;
	}
	
	return p;
})());