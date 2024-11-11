/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("GambleView",
{
	GAMBLE_RED_BLACK_BUTTON_CLICK: "gambleRedBlackButtonClick",
	GAMBLE_RESULT_SHOWN: "gambleResultShown",
	START_CLICK_SOUND: "startClickSound",
	STOP_CLICK_SOUND: "stopClickSound",
	
	HISTORY_CARDS_COUNT: 5
},
(function()
{
	var p =
	{
		init: function(x, y, config)
		{
			this._config = config;
			this._redButton = null;
			this._blackButton = null;
			this._gambleAttemptsField = null;
			this._amountField = null;
			this._winField = null;
			this._historyCards = [];
			this._mainCard = null;
			this._blinkTimer = null;
			this._showTimer = null;
			this._backType = 0;
		
			this._super("gambleContainer", x, y);

			this.addChild(new TextView("gambleLabel amount", this._config.gambleAmountTitle, 16, 16));
			this.addChild(new TextView("gambleLabel win", this._config.amountToWinTitle, 654, 16));
			this.addChild(new TextView("gambleLabel history", this._config.historyTitle, 512, 59));
			var attemptsLabel = new TextView("gambleLabel attempts", this._config.attemptsLeftTitle, 8, 498);
			this._gambleAttemptsField = new TextView("gambleLabel attemptsField", this._config.attemptsLeft, 0, 0, true);
			this._gambleAttemptsField.setPositionType("relative");
			attemptsLabel.addChild(this._gambleAttemptsField);
			this.addChild(attemptsLabel);
			
			this._amountField = new TextView("gambleLabel amountField", "", 36, 70);
			this._winField = new TextView("gambleLabel winField", "", 689, 56);
			
			this.addChildren(this._amountField, this._winField);
			
			var historyCardsView = new View("historyCardsView", 403, 98);
			for(var i = 0; i < GambleView.HISTORY_CARDS_COUNT; i++)
			{
				this._historyCards[i] = new View("historyCard", i*(63+4), 0);
				this._historyCards[i].visible(false);
				this._historyCards[i].setSize(63, 88);
				
				historyCardsView.addChild(this._historyCards[i]);
				
				if (i != 0)
				{
					var card = this._config.history[i-1];
					if (this._config.history.length >= i && card != -1)
					{
						if(card == 0 || card == 3)
							this._historyCards[i].addClass("black");
						else
							this._historyCards[i].addClass("red");
						this._historyCards[i].visible(true);
					}
				}
				else
				{
					this._historyCards[i].addClass("back");
					this._historyCards[i].visible(true);
				}
			}
			this.addChild(historyCardsView);
			
			this._mainCard = new View("mainCard backRed", 469, 205);
			
			this._redButton = new Button("gambleButton red", 12, 115);
			this._blackButton = new Button("gambleButton black", 12, 270);
			
			this.addChildren(this._mainCard, this._redButton, this._blackButton);
			
			var self = this;
			this._blinkTimer = setInterval(function() { onBlinkTimer.call(self); }, 70);
			
			this._redButton.addEventListener(MouseEvent.CLICK, onButtonClick, this);
			this._blackButton.addEventListener(MouseEvent.CLICK, onButtonClick, this);
			
			setAmount.call(this, this._config.gambleAmount);
			setWin.call(this, this._config.amountToWin);
		},
		
		setButtonsEnabled: function(value)
		{
			this._redButton.enabled(value);
			this._blackButton.enabled(value);
		},

		getButtonsEnabled: function()
		{
			return this._redButton.enabled() && this._blackButton.enabled();
		},
		
		setResult: function(card, gambleAmount, amountToWin, attemptsLeft, history)
		{
			if (gambleAmount > 0)
			{
				setAmount.call(this, gambleAmount);
				setWin.call(this, amountToWin);
				this._gambleAttemptsField.setText(attemptsLeft.toString());
			}
			else
				this._gambleAttemptsField.setText(this._config.attemptsLeft - 1);
		
			this._config.attemptsLeft = attemptsLeft;
			
			clearInterval(this._blinkTimer);
			this._blinkTimer = 0;
			
			this.dispatchEvent(new Event(GambleView.STOP_CLICK_SOUND));
			
			this._mainCard.removeClass("backRed backBlack");
			this._historyCards[0].removeClass("back");
			if(card == 0 || card == 3)
			{
				this._mainCard.addClass("faceBlack");
				this._historyCards[0].addClass("black");
			}
			else
			{
				this._mainCard.addClass("faceRed");
				this._historyCards[0].addClass("red");
			}
			
			//if (gambleAmount > 0)
				//addChild(_config.gambleWin);
			
			var delay = attemptsLeft == 0 && gambleAmount > 0 ? 2000 : 1000;
			var self = this;
			this._showTimer = setTimeout( function() { onShowTimer.call(self); }, delay);
		},
		
		dispose: function()
		{
			this._redButton.removeEventListener(MouseEvent.CLICK, onButtonClick, this);
			this._blackButton.removeEventListener(MouseEvent.CLICK, onButtonClick, this);
			
			if(this._blinkTimer)
			{
				clearInterval(this._blinkTimer);
				this._blinkTimer = 0;
			}
			if(this._showTimer)
			{
				clearTimeout(this._showTimer);
				this._showTimer = 0;
			}
			
			this._super();
		}
	};
	
	function setAmount(value) 
	{ 
		if(this._config.currency)
		{
			this._amountField.setText(Utils.formatNumber(value, 100, true) + " " + this._config.currencyType); 
		}
		else
		{
			this._amountField.setText(Utils.formatNumber(value, this._config.denomination));
		}
	}
	
	function setWin(value) 
	{ 
		if(this._config.currency)
		{
			this._winField.setText("<span class='amountToWinValue'>"+Utils.formatNumber(value, 100, true)+"</span> " + this._config.currencyType); 
		}
		else
		{
			this._winField.setText("<span class='amountToWinValue'>"+Utils.formatNumber(value, this._config.denomination)+"</span>");
		}
	}
	
	function onButtonClick(event)
	{
		if(event.target == this._redButton)
			this.dispatchEvent(new Event(GambleView.GAMBLE_RED_BLACK_BUTTON_CLICK, {type: 0}));
		else if(event.target == this._blackButton)
			this.dispatchEvent(new Event(GambleView.GAMBLE_RED_BLACK_BUTTON_CLICK, {type: 1}));
		this.setButtonsEnabled(false);
	}
	
	function onBlinkTimer()
	{
		if(this._backType)
		{
			this._mainCard.removeClass("backBlack");
			this._mainCard.addClass("backRed");
			this._backType = 0;
		}
		else
		{
			this._mainCard.removeClass("backRed");
			this._mainCard.addClass("backBlack");
			this._backType = 1;
		}
	}
	
	function onShowTimer()
	{
		clearTimeout(this._showTimer);
		this._showTimer = 0;
		
		//if (_config.gambleWin.stage)
			//removeChild(_config.gambleWin);
			
		if (this._config.attemptsLeft)
		{
			this.setButtonsEnabled(true);
			for (var i = GambleView.HISTORY_CARDS_COUNT - 1; i >= 1; i--)
			{
				prevCard = this._historyCards[i-1].hasClass("red") ? 0 : this._historyCards[i-1].hasClass("black") ? 1 : -1;
				currCard = this._historyCards[i].hasClass("red") ? 0 : this._historyCards[i].hasClass("black") ? 1 : -1;
				if (prevCard != -1)
				{
					this._historyCards[i].removeClass("red black");
					if(prevCard == 0)
						this._historyCards[i].addClass("red");
					else
						this._historyCards[i].addClass("black");
					this._historyCards[i].visible(true);
				}
			}
			this._historyCards[0].removeClass("red black");
			this._historyCards[0].addClass("back");
			
			this._backType = 0;
			this._mainCard.removeClass("faceRed faceBlack");
			this._mainCard.addClass("backRed");
			var self = this;
			this._blinkTimer = setInterval( function() { onBlinkTimer.call(self); }, 70);
			
			this.dispatchEvent(new Event(GambleView.START_CLICK_SOUND));
		}

		this.dispatchEvent(new Event(GambleView.GAMBLE_RESULT_SHOWN));
	}
	
	return p;
})());