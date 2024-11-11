/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("WinVisualizationView",
{
	CYCLE_COMPLETE: "cycleComplete"
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._config = config;
			this._linesView;
			this._showingLines;
			this._lineIndex;
			this._numberOfBlinks;
			this._comboColorIndex;
			this._timerForX2Blink;
			this._visibleX2;
			this._multiplierX2;
			this._lineLabel;
			this._lostConnection = false;
			
			this._super("");
			
			this._linesView = new LinesView(this._config.linesViewConfig);
			this._linesView.addEventListener(LinesView.BLINKING_COMPLETE, onBlinkingComplete, this);
			this._lineLabel = new TextView("textField infoLine", "", 400, 619);
			this._lineLabel.setZIndex(121);
			
			this.addChildren(this._linesView, this._lineLabel);
		},
		
		start: function(noFastLineBlink)
		{
			if (!this._config.lines.length && !this._config.scatters.length)
				return;
			
			this._showingLines = this._config.scatters.length ? false : true;
			this._comboColorIndex = 0;
			this._lineIndex = 0;
			this._numberOfBlinks = noFastLineBlink ? 3 : 1;
			
			if (this._config.lineGame)
			{
				if (this._showingLines)
					this._linesView.drawLine(this._config.lines[this._lineIndex].cells, this._config.lines[this._lineIndex].line);
				else
					this._linesView.drawCells(this._config.scatters[this._lineIndex].cells);
			}
			else
			{
				if (this._config.lines.length == 1 && this._config.lines[this._lineIndex].multiplier > 1) 
				{
					this._multiplierX2 = new View("x2Image");
					this.addChild(this._multiplierX2);
					this._multiplierX2.setPosition(400, 175);
					this._multiplierX2.setZIndex(5);
					startBlinkX2.call(this);
				}
				this._linesView.drawCells(this._config.lines[this._lineIndex].cells, this._config.comboColors[this._comboColorIndex]);
				
			}
			this._linesView.startBlinking(this._numberOfBlinks, 300);
			updateWinPerLine.call(this);
		},
		
		stopBlinkX2: function()
		{
			if(!this._multiplierX2)
				return;
				
			clearTimeout(this._timerForX2Blink);
			this._multiplierX2.visible(false);
		},
		
		onLostConnection: function() 
		{ 
			this._lostConnection = true;
			this._lineLabel.visible(false); 
		},
		
		dispose: function()
		{
			this._linesView.dispose();
			if(this._multiplierX2 != null)
			{
				this._multiplierX2.dispose();
				this._multiplierX2 = null;
			}
			
			this._linesView.removeEventListener(LinesView.BLINKING_COMPLETE, onBlinkingComplete, this);
			this._lineLabel.dispose();
			
			this._super();
		}
	};
	
	function updateWinPerLine()
	{
		var card= -1;
		var winAmount;
		var count;
		
		if(this._showingLines)
			winAmount = this._config.lines[this._lineIndex].winAmount;
		else
			winAmount = this._config.scatters[this._lineIndex].winAmount;
			
		if (!winAmount || this._lostConnection)
		{
			this._lineLabel.visible(false);
			return;
		}
		else
			this._lineLabel.visible(true);
			
		if (this._showingLines)
		{
			card = this._config.lines[this._lineIndex].card;
			count = this._config.lineGame ? this._config.lines[this._lineIndex].cells.length / 2 : this._config.lines[this._lineIndex].len;
			if(this._config.lineGame)
			{
				if(this._config.currency)
				{
					this._lineLabel.setText(this._config.lineText + " " + (this._config.lines[this._lineIndex].line + 1) + " - " + 
											Utils.formatNumber(this._config.lines[this._lineIndex].winAmount, 100, true)+ " " + " " +this._config.currencyType);
				}
				else
				{
					this._lineLabel.setText(this._config.lineText + " " + (this._config.lines[this._lineIndex].line + 1) + " - " + 
											Utils.formatNumber(this._config.lines[this._lineIndex].winAmount, this._config.denomination));
				}
			}
			else
			{
				var moneyText;
				if(this._config.currency)
				{
					moneyText = this._config.lines[this._lineIndex].count.toString() + " x " + Utils.formatNumber(this._config.lines[this._lineIndex].winPerCount, 100, true) + " " + 
								this._config.currencyType + " = " + Utils.formatNumber(this._config.lines[this._lineIndex].winAmount, 100, true)+ " " + this._config.currencyType;
				}
				else
				{
					moneyText = this._config.lines[this._lineIndex].count.toString() + " x " + Utils.formatNumber(this._config.lines[this._lineIndex].winPerCount, this._config.denomination) + 
								" = " + Utils.formatNumber(this._config.lines[this._lineIndex].winAmount, this._config.denomination);
				}

				if (this._config.lines[this._lineIndex].count > 1)
					this._lineLabel.setText("Combos " + moneyText);
				else
					this._lineLabel.setText("Combo " + moneyText);
			}
		}
		else
		{
			card = this._config.scatters[this._lineIndex].scatterName;
			count = this._config.scatters[this._lineIndex].cells.length / 2;
			if(this._config.currency)
			{
				this._lineLabel.setText("Scatter - " + Utils.formatNumber(this._config.scatters[this._lineIndex].winAmount, 100, true) + " " + this._config.currencyType);
			}
			else
			{
				this._lineLabel.setText("Scatter - " + Utils.formatNumber(this._config.scatters[this._lineIndex].winAmount, this._config.denomination));
			}
		}
	}
	
	function startBlinkX2()
	{
		this._multiplierX2.visible(!this._multiplierX2.visible());
		
		var self = this;
		this._timerForX2Blink = setTimeout(function() { startBlinkX2.call(self); }, 500);
	}
	
	function onBlinkingComplete()
	{
		this._lineIndex++;
		
		var isCycleComplete = false;
		if (this._showingLines && this._lineIndex == this._config.lines.length)
		{
			if (this._config.scatters.length)
				this._showingLines = false;
			
			isCycleComplete = true;
				
			this._numberOfBlinks = 3;
			this._lineIndex = 0;
		}
		else if (!this._showingLines && this._lineIndex == this._config.scatters.length)
		{
			if (!this._config.expand.length && this._config.lines.length)
				this._showingLines = true;
			else
			{
				isCycleComplete = true;
				
				this._numberOfBlinks = 3;
			}
			this._lineIndex = 0;
		}
		if (this._config.lineGame) 
		{
			if (this._showingLines)
				this._linesView.drawLine(this._config.lines[this._lineIndex].cells, this._config.lines[this._lineIndex].line);
			else
				this._linesView.drawCells(this._config.scatters[this._lineIndex].cells);
		}
		else
		{
			if (this._lineIndex == 0)
				this._comboColorIndex = 0;
			else
				this._comboColorIndex++;

			this._linesView.drawCells(this._config.lines[this._lineIndex].cells, this._config.comboColors[this._comboColorIndex]);
		}
		
		this._linesView.startBlinking(this._numberOfBlinks, 300);
		updateWinPerLine.call(this);
		
		if(isCycleComplete)
			this.dispatchEvent(new Event(WinVisualizationView.CYCLE_COMPLETE));
	}
	
	return p;
})());