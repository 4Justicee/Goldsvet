/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("UserInterfaceView",
{
	BALANCE_CLICK: "balanceClick",
	WIN_MONEY_ANIMATED: "winMoneyAnimated",
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._super();

			// PRIVATE PROPERTIES
			this._config = config;
			this._topUIContainer;
			this._bottomUIContainer;
			this._balanceField;
			this._betField;
			this._winField;
			this._denominationField;
			this._linesView;
			this._winMoneyTween;
			this._balanceMoneyTween;
			this._gameNumber;
			this._time;
			this._timeTimer;
			this._gameTitle;
			this._freespinsLayer;

			// PUBLIC PROPERTIES
			this.spinButton;
			this.stopButton;
			this.collectButton;
			this.gambleButton;
			this.stopAutoplayButton;
			this.infoLineField;
			this.jackpotBoxes;
			this.homeButton;
			this.settingsButton;

			this._gameTitle = new View("gameTitle" + (this._config.jackpotAllowed ? "" : " noJackpot"), 94, 616);


			this.addChild(new View("backgroundOverlay", 72, 66));
			this.addChild(this._gameTitle);

			this._gameNumber = new TextView("gameNumberTime gameNumber", "", 3, 60);
			this._time = new TextView("gameNumberTime  time", "", 1142, 60);

			this.addChildren(this._gameNumber, this._time);

			this._topUIContainer = new View("topUIContainer", 0, 0);

			if(this._config.jackpotAllowed)
			{
				this.jackpotBoxes = new JackpotBoxes(0, 4, {currencyType: this._config.currencyType, currency: this._config.currency,
					numberOfCents: config.displayBanknotesOnly ? 0 : 2 });

				this._topUIContainer.addChild(this.jackpotBoxes);
			}
			else
			{
				var topGameTitle = new View("topGameTitle");
				topGameTitle.setPositionType("relative");
				this._topUIContainer.addChild(topGameTitle);
			}

			this._bottomUIContainer = new View("bottomUIContainer", 96, 614);

			if(this._config.sendTotalsInfo)
			{
				if(this._config.jackpotAllowed)
				{
					this._totalBet = new TextView("textField totals jackpot", "", 353, -12);
					this._totalWin = new TextView("textField totals jackpot", "", 550, -12);

					this._bottomUIContainer.addChildren(this._totalBet, this._totalWin);
				}
				else
				{
					this._totalBet = new TextView("textField totals", "", 0, 24);
					this._totalWin = new TextView("textField totals", "", 0, 45);

					this._topUIContainer.addChildren(this._totalBet, this._totalWin);
				}
			}

			this._balanceField = new MoneyTextView("textField balance", 319, 38, "balanceBetCurrency")
			this._balanceField.currencyType(this._config.currencyType);
			this._balanceField.currency(this._config.currency);
			this._betField = new MoneyTextView("textField bet", 632, 38, "balanceBetCurrency");
			this._betField.currencyType(this._config.currencyType);
			this._betField.currency(this._config.currency);
			this._winField = new MoneyTextView("textField win", 792, 7, "winCurrency");
			this._winField.currencyType(this._config.currencyType);
			this._winField.currency(this._config.currency);
			this._denominationField = new TextView("textField denomination", "", 536, 47);
			this._denominationField.setResizeEnabled(true);
			this.infoLineField = new TextView("textField infoLine", "", 307, 5);
			if(this._config.lineGame == true)
				this._linesView = new LinesSelectView({ lines: this._config.lines, currLine: this._config.currLine});
			else
				this._linesView = new WaysToPayView({currLine: this._config.currLine,lines: this._config.lines });

			this._bottomUIContainer.addChildren(this._balanceField, this._betField, this._winField, this._denominationField, this.infoLineField);

			this._bottomUIContainer.addChild(new TextView("textLabel balanceTitle", this._config.balanceTitle, 323, 76));
			this._bottomUIContainer.addChild(new TextView("textLabel betTitle", this._config.betTitle, 627, 76));
			this._bottomUIContainer.addChild(new TextView("textLabel winTitle", this._config.winTitle, 801, 76));

			this.addChildren(this._topUIContainer, this._bottomUIContainer, this._linesView);


			this.stopButton =new Button("stopButtonOverlay", 73, 66);
			this.stopButton.setId("OverlayStopButton");
			this.spinButton = new Button("button spin", 1022, 219);
			this.collectButton = new Button("button collect", 1022, 219);
			this.gambleButton = new Button("button gamble", 90, 219);
			this.stopAutoplayButton = new Button("button stopAutoplay", 1022, 219);
			this.stopAutoplayButton.remainingAutoplays = new TextView("textField remainingAutoplays", "", 67, 116);
			this.stopAutoplayButton.addChild(this.stopAutoplayButton.remainingAutoplays);

			this.homeButton = new Button("icons home", 1211, 100, {x: 0, y: -20, width: 100, height: 95});
			var homeImage = new View("iconsImage home", 8, 4);
			homeImage.setScale(-1, 1);
			this.homeButton.addChild(homeImage);
			this.homeButton.setScale(-1, 1);
			this.settingsButton = new Button("icons settings", 0, 100, {x: 0, y: -20, width: 100, height: 95});
			this.settingsButton.addChild(new View("iconsImage settings", 8, 6));

			this.addChildren(this.stopButton, this.spinButton, this.collectButton, this.gambleButton, this.stopAutoplayButton,
							 this.homeButton, this.settingsButton);

			var self = this;
			this._timeTimer = setInterval(function() { onTimeTimer.call(self); }, 1000);
			onTimeTimer.call(this);
		},

		setGameNumber: function(value) { this._gameNumber.setText(value); },
		getBalanceMoneyAnimating: function() { return this._balanceMoneyTween != null; },
		getWinMoneyAnimating: function() { return this._winMoneyTween != null; },

		freespins: function(value)
		{
			if ((this._freespinsLayer && value) || (!this._freespinsLayer && !value))
				return;

			this._gameTitle.visible(!value);

			if (value)
			{
				this._freespinsLayer = new View("freespinsLayer", 4, 4);

				var freespinText = new TextView("fsTextField freespinText", this._config.freespinText, 3, 13);
				freespinText.setResizeEnabled(true);

				var freespinNumbers = new TextView("freespinNumbers", "", 128, 14, false, true);

				this._freespinsLayer.addChildren(freespinText, freespinNumbers);

				this._bottomUIContainer.addChild(this._freespinsLayer);
			}
			else
			{
				this._bottomUIContainer.removeChild(this._freespinsLayer);
				this._freespinsLayer = null;
			}
		},

		balanceMoney: function(value)
		{
			if(value == undefined)
				return this._balanceField.moneyValue();

			this._balanceField.moneyValue(value);
		},

		winMoney: function(value)
		{
			if(value == undefined)
				return this._winField.moneyValue();

			this._winField.moneyValue(value);

			if(value == 0)
				this._winField.visible(false);
			else
				this._winField.visible(true);
		},

		setBet: function(value) { this._betField.moneyValue(value); },

		setDenomination: function(value) {
			this._denominationField.setText(Utils.formatNumber(value, 100, true));
			this._balanceField.denomination(value);
			this._winField.denomination(value);
			this._betField.denomination(value);

			if(this._config.sendTotalsInfo)
			{
				this.updateTotalBet(this._totalBetValue);
				this.updateTotalWin(this._totalWinValue);
			}

			if(this.jackpotBoxes != null)
			{
				this.jackpotBoxes.denomination(value);
			}
		},

		setLines: function(index) { this._linesView.setLines(index); },

		setFixedLines: function(index) { this._linesView.setFixedLines(index); },

		setZIndexesForSettingsShown: function()
		{
			this._topUIContainer.setZIndex(120);
			this._bottomUIContainer.setZIndex(120);
			this._gameTitle.setZIndex(121);
		},

		setZIndexesForSettingsHidden: function()
		{
			this._topUIContainer.setZIndex(80);
			this._bottomUIContainer.setZIndex(80);
			this._gameTitle.setZIndex(81);
		},

		animateBalanceMoney: function(value, time)
		{
			if(value == this._balanceField.moneyValue())
				return;

			if (this._balanceMoneyTween)
			{
				if (value < this._balanceMoneyTween.vars.balanceMoney)
				{
					this._balanceMoneyTween.kill();
					this._balanceMoneyTween = null;
					this.balanceMoney(value);

					if (this._winMoneyTween)
						this._winMoneyTween.totalTime(this._winMoneyTween.totalDuration());
				}
				else
					this._balanceMoneyTween.updateTo( { balanceMoney: value } );

				return;
			}

			var self = this;
			this._balanceMoneyTween = TweenMax.to(this, time, {balanceMoney: value, ease: Linear.easeNone, onComplete: function()
			{
				self._balanceMoneyTween.kill();
				self._balanceMoneyTween = null;
			}});
		},

		animateWinMoney: function(value, time)
		{
			if(value == this._winField.moneyValue())
				return;

			if (this._winMoneyTween)
			{
				this._winMoneyTween.updateTo({winMoney: value});
				return;
			}

			var self = this;
			this._winMoneyTween = TweenMax.to(this, time, {winMoney: value, ease: Linear.easeNone, onComplete: function()
			{
				self._winMoneyTween.kill();
				self._winMoneyTween = null;

				self.dispatchEvent(new Event(UserInterfaceView.WIN_MONEY_ANIMATED));
			}});
		},

		completeAnimations: function(balanceComplete, winMoneyComplete)
		{
			if (this._balanceMoneyTween && balanceComplete)
				this._balanceMoneyTween.totalTime(this._balanceMoneyTween.totalDuration());
			if (this._winMoneyTween && winMoneyComplete)
				this._winMoneyTween.totalTime(this._winMoneyTween.totalDuration());
		},

		updateFreespins: function(currFreespin, totalFreespins)
		{
			if (!this._freespinsLayer)
				return;

			this._config.currFreespin = currFreespin;
			this._config.totalFreespins = totalFreespins;

			var txtField = this._freespinsLayer.getChildAt(1);
			txtField.setText("<span class='fsTextField fsNumber'>" + currFreespin + "</span> <span class='fsTextField'>"
							 + this._config.ofText + "</span> <span class='fsTextField fsNumber'>" + totalFreespins + "</span>");

			var coef = txtField.getWidth()/txtField.getMeasuredWidth();
			if (coef < 1)
			{
				var measuredHeight = txtField.getMeasuredHeight();
				txtField.setScale(coef, coef);
				txtField.setPosition(txtField.x(), 14 + (measuredHeight - (measuredHeight * coef)) / 2);
			}
			else
			{
				txtField.setScale(1, 1);
				txtField.setPosition(txtField.x(), 14);
			}
		},

		updateTotalBet: function(value)
		{
			this._totalBetValue = value;

			var valueString = formatMoney.call(this, value);
			this._totalBet.setText(this._config.totalBetLabel + " " + valueString);

			if(!this._config.jackpotAllowed)
			{
				this._totalBet._containerDiv.css({"left":"initial"});
			}
		},

		updateTotalWin: function(value)
		{
			this._totalWinValue = value;

			var valueString = formatMoney.call(this, value);
			this._totalWin.setText(this._config.totalWinLabel + " " + valueString);

			if(!this._config.jackpotAllowed)
			{
				this._totalWin._containerDiv.css({"left":"initial"});
			}
		},


		dispose: function()
		{
			if(this._balanceMoneyTween)
			{
				this._balanceMoneyTween.kill();
				this._balanceMoneyTween = null;
			}

			if(this._winMoneyTween)
			{
				this._winMoneyTween.kill();
				this._winMoneyTween = null;
			}

			this._super();
		}
	};

	function formatMoney(value)
	{
		if(this._config.currency)
		{
			return Utils.formatNumber(value, 100, true) + " " + this._config.currencyType;
		}
		else
		{
			return Utils.formatNumber(value, this._config.denomination, false);
		}
	}

	function onTimeTimer()
	{
		var date = new Date();

		var s = date.getHours() + ":";
		if(date.getMinutes() < 10)
			s += "0";
		s += date.getMinutes();

		this._time.setText(s);
	}

	return p;
})());