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
			this._timerForX2Blink;
			this._visibleX2;
			this._multiplierImages = this._config.multiplierImages;
			this._multiplierX2;
			this._lineLabel;
			this._lostConnection = false;
			this._prevLineCard = -1;
			this._numberOfUniqueCards = 0;
			this._comboColorIndex = -1;

			this._super("");

			this._linesView = new LinesView(this._config.linesViewConfig);
			this._linesView.addEventListener(LinesView.BLINKING_COMPLETE, onBlinkingComplete, this);
			this._lineLabel = new TextView("textField infoLine", "", 400, 619);
			this._lineLabel.setZIndex(121);

			if (!this._config.lineGame)
			{
				// we need this information only if
				// this is a ways to pay game
				calculateNumberOfUniqueCards.call(this);

				resetComboColorIndex.call(this);
			}

			this.addChildren(this._linesView, this._lineLabel);
		},

		start: function(noFastLineBlink)
		{
			if (!this._config.lines.length && !this._config.scatters.length)
				return;
			var settings = GameSettings.getInstance();
			this._showingLines = this._config.scatters.length ? false : true;
			this._lineIndex = 0;
			this._numberOfBlinks = noFastLineBlink ? 3 : 1;

			drawCurrentShape.call(this);
			if (this._config.lines[this._lineIndex] != undefined ) {
				if (this._config.lines[this._lineIndex].multiplier > 1 && this._multiplierImages != undefined) {
					var x;
					var y;
					var multiplier = this._config.lines[this._lineIndex].multiplier;
					if (this._multiplierImages.hasOwnProperty(multiplier)) {
						this._multiplierX2 = new View("xImage " + this._multiplierImages[multiplier]);
						this.addChild(this._multiplierX2);
						this._multiplierX2.visible(true);

						if (settings.multiplierImagesCenteredOnReels)
							x = ((this._config.linesViewConfig.reelWidth * this._config.linesViewConfig.numReels + this._config.linesViewConfig.reelSpacing * this._config.linesViewConfig.numReels - 1) / 2 - this._multiplierX2.getWidth() / 2 ) + this._linesView.x();
						else
							x = (this._config.linesViewConfig.reelWidth * multiplier + this._config.linesViewConfig.reelSpacing * multiplier - 1 ) / 2 - this._multiplierX2.getWidth() / 2 + this._linesView.x();

						y = this._config.linesViewConfig.reelHeight / 2 - this._multiplierX2.getHeight() / 2 + this._linesView.y();
						this._multiplierX2.setPosition(x, y);
						this._multiplierX2.setZIndex(5);
						startBlinkX2.call(this);
					}

				}
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
			this._lineLabel.visible(false);
			this._lostConnection = true;
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

	function calculateNumberOfUniqueCards()
	{
		if (this._config.lines == null || this._config.lines.length == 0)
		{
			return;
		}

		var uniqueCards = [];
		var length = this._config.lines.length;
		for (var i = 0; i < length; i++)
		{
			var card = this._config.lines[i].card;
			if (uniqueCards.indexOf(card) != -1)
				continue;

			uniqueCards.push(card);
		}

		this._numberOfUniqueCards = uniqueCards.length;
	}

	function resetComboColorIndex()
	{
		if (this._numberOfUniqueCards == 0)
		{
			return;
		}

		this._prevLineCard = -1;
		this._comboColorIndex = this._config.comboColors.length - this._numberOfUniqueCards - 1;
	}

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

	function drawCurrentShape()
	{
		if (this._showingLines)
		{
			if (this._config.lineGame)
			{
				this._linesView.drawLine(this._config.lines[this._lineIndex].cells, this._config.lines[this._lineIndex].line);
			}
			else
			{
				if (this._prevLineCard != this._config.lines[this._lineIndex].card)
				{
					this._prevLineCard = this._config.lines[this._lineIndex].card;
					this._comboColorIndex++;
				}

				var lineColor = this._config.comboColors[this._comboColorIndex];
				this._linesView.drawCells(this._config.lines[this._lineIndex].cells, lineColor);
			}
		}
		else
		{
			this._linesView.drawCells(this._config.scatters[this._lineIndex].cells);
		}
	}

	function onBlinkingComplete()
	{
		this._lineIndex++;

		var isCycleComplete = false;
		if (this._showingLines && this._lineIndex == this._config.lines.length)
		{
			if (this._config.scatters.length)
				this._showingLines = false;

			resetComboColorIndex.call(this);

			isCycleComplete = true;

			this._numberOfBlinks = 3;
			this._lineIndex = 0;
		}
		else if (!this._showingLines && this._lineIndex == this._config.scatters.length)
		{
			if (this._config.lines.length)
				this._showingLines = true;
			else
			{
				isCycleComplete = true;

				this._numberOfBlinks = 3;
			}
			this._lineIndex = 0;
		}

		drawCurrentShape.call(this);

		this._linesView.startBlinking(this._numberOfBlinks, 300);
		updateWinPerLine.call(this);

		if(isCycleComplete)
			this.dispatchEvent(new Event(WinVisualizationView.CYCLE_COMPLETE));
	}

	return p;
})());