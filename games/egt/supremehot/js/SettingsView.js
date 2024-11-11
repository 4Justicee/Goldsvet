/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("SettingsView",
{
	STATE_SHOWN: 0,
	STATE_HIDDEN: 1,
	STATE_SHOWING: 2,
	STATE_HIDING: 3,
	
	BET_BUTTON_CLICK: "betButtonClick",
	DENOM_BUTTON_CLICK: "denomButtonClick",
	LINE_BUTTON_CLICK: "lineButtonClick",
	AUTOPLAY_BUTTON_CLICK: "autoplayButtonClick",
	SOUND_BUTTON_CLICK: "soundButtonClick",
	SETTINGS_CLOSE_BUTTON_CLICK: "settingsCloseButtonClick",
	PAYTABLE_BUTTON_CLICK: "paytableButtonClick",
	HELP_BUTTON_CLICK: "helpButtonClick",
	SETTINGS_SHOWN: "settingsShown",
	SETTINGS_HIDDEN: "settingsHidden"
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._config = config;
			this._denomButtons = [];
			this._betButtons = [];
			this._lineButtons = [];
			this._showHideTween = null;
			this._soundButton = null;
			this._autoplayButton = null;
			this._settingsCloseButton = null;
			this._paytableButton = null;
			this._helpButton = null;
			this._gamesLabel = null;
			this._state = SettingsView.STATE_HIDDEN;
			this._position = {x: -1280, y:0};
			
			this._super("settingsViewContainer", 0, 0, true);
			
			var background = new View("settingsView", 0, config.paddingY);
			background.setScale(1/config.scaleCoef, 1/config.scaleCoef);
			this.addChild(background);
			this.addChild(new TextView("gameVersion gameNumberTime", this._config.gameVersion, 106, 66));

			var len = this._config.denominations.length;
			var denomButtonStartX = 105 + (741 - (len*174 + (len-1)*15))/2;
			for(var i = 0;i < len;i++)
			{
				this._denomButtons[i] = new DenomButton(denomButtonStartX + i*189, 91, this._config.creditText);
				this._denomButtons[i].addEventListener(MouseEvent.CLICK, onDenomButtonClick, this);
				this._denomButtons[i].setText(Utils.formatNumber(this._config.denominations[i], 100, true) + "<span class='denomCurrency'> "+this._config.currencyType+"</span>");
				if(this._config.currentDenom == i)
					this._denomButtons[i].setSelected(true);
				this.addChild(this._denomButtons[i]);
			}
			
			for(var i = 0;i < 5;i++)
			{
				console.log(this._config.currency);
				var topText = this._config.currency ? this._config.currencyType : "";
				this._betButtons[i] = new BetButton({type: 1, topText: topText, bottomText: this._config.betText}, 108 + i*217, 434);
				this._betButtons[i].addEventListener(MouseEvent.CLICK, onBetButtonClick, this);
				setBetButtonText.call(this, i);
				if(this._config.currentBet == i)
					this._betButtons[i].setSelected(true);
				this.addChild(this._betButtons[i]);
			}
			if(this._config.lineGame || !this._config.fixedLines)
			{
				for(var i = 0;i < 5;i++)
				{
					this._lineButtons[i] = new BetButton({type: 2, topText: this._config.fixedLines && i == 4 ? this._config.fixedText : "", bottomText: this._config.lineGame ? (i == 0 ? this._config.lineText : this._config.linesText) : "WAYS"}, 108 + i*217, 261);
					this._lineButtons[i].addEventListener(MouseEvent.CLICK, onLineButtonClick, this);
					this._lineButtons[i].setText(this._config.lines[i]);
					if(this._config.currentLine == i)
						this._lineButtons[i].setSelected(true);
					this.addChild(this._lineButtons[i]);
				}
			}
			else
			{
				this._lineButtons[0] = new BetButton({type: 2, topText: this._config.fixedLines ? "FIXED" : "", bottomText: "WAYS"}, 108 + 2*217 , 261);
				this._lineButtons[0].addEventListener(MouseEvent.CLICK, onLineButtonClick, this);
				this._lineButtons[0].setText(this._config.lines[4]);
				this._lineButtons[0].setSelected(true);
				this.addChild(this._lineButtons[0]);
			}
			
			
			this._autoplayButton = new Button("autoplayButton", 881, 102);
			if(this._config.isAutoplayGameDisabled) {
				this._autoplayButton.removeClass("autoplayButton");
				this._autoplayButton.addClass("autoplayButtonDisabled");
				this._autoplayButton.enabled(false);
			}
                        
			this._soundButton = new Button("soundButton", 1028, 102);
			this._settingsCloseButton = new SettingsPaytableCloseButton(-config.paddingX, 100, {x: 0, y: -20, width: 100, height: 94});
			this._paytableButton = new Button("paytableFromSettingsButton", -config.paddingX, 516, {x:0, y:-20, width: 100, height: 94});
			this._paytableButton.addChild(new View("paytableFromSettingsButtonInfoIcon", 7, 5));
			this._helpButton = new Button("paytableFromSettingsButton", 1208 + config.paddingX, 516, {x:0, y:-20, width: 100, height: 94});
			this._helpButton.setScale(-1, 1);
			var helpIcon = new View("paytableFromSettingsButtonHelpIcon", 9, 5);
			helpIcon.setScale(-1, 1);
			this._helpButton.addChild(helpIcon);
			
			this.addChildren(this._autoplayButton, this._soundButton, 
				this._settingsCloseButton, this._paytableButton, this._helpButton);
			
			if(this._config.isMuted)
				this._soundButton.addClass("soundOff");
			this._soundButton.enabled(this._config.soundButtonEnabled);
			
			this._autoplayButton.addEventListener(MouseEvent.CLICK, onAutoplayButtonClick, this);
			this._soundButton.addEventListener(MouseEvent.CLICK, onSoundButtonClick, this);
			this._settingsCloseButton.addEventListener(MouseEvent.CLICK, onSettingsCloseButtonClick, this);
			this._paytableButton.addEventListener(MouseEvent.CLICK, onPaytableButtonClick, this);
			this._helpButton.addEventListener(MouseEvent.CLICK, onHelpButtonClick, this);
			
			this._position.x -= this._config.paddingX;

			this.setPosition(this._position.x, this._position.y);
		},
		
		show: function(animated)	
		{
			if(this._state == SettingsView.STATE_SHOWN || this._state == SettingsView.STATE_SHOWING)
				return;
			
			if(animated)
			{
				this._state = SettingsView.STATE_SHOWING;
				if(this._state == SettingsView.STATE_HIDING)
				{
					this._showHideTween.updateTo({x: 0});
					return;
				}
				
				var self = this;
				this._showHideTween = TweenMax.to(this._position, 0.2, {x: 0, ease: Linear.easeNone, onComplete: function()
				{
					self._state = SettingsView.STATE_SHOWN;
					self._showHideTween = null;

					self.dispatchEvent(new Event(SettingsView.SETTINGS_SHOWN));
				}, onUpdate: function() { self.setPosition(self._position.x, self._position.y); }});
			}
			else
			{
				this._position.x = 0;
				this._state = SettingsView.STATE_SHOWN;
				this.setPosition(this._position.x, this._position.y);
			}
		},
		
		hide: function()
		{
			if(this._state == SettingsView.STATE_HIDDEN || this._state == SettingsView.STATE_HIDING)
				return;
				
			this._state = SettingsView.STATE_HIDING;
			if(this._state == SettingsView.STATE_SHOWING)
			{
				this._showHideTween.updateTo({x:-1350});
				return;
			}
			
			var self = this;
			this._showHideTween = TweenMax.to(this._position, 0.3, {x: -1350, ease: Linear.easeNone, onComplete: function()
			{
				self._state = SettingsView.STATE_HIDDEN;
				self._showHideTween = null;

				self.dispatchEvent(new Event(SettingsView.SETTINGS_HIDDEN));
			}, onUpdate: function() { self.setPosition(self._position.x, self._position.y); }});
		},
		
		setCurrDenom: function(index)
		{
			this._denomButtons[this._config.currentDenom].setSelected(false);
			this._config.currentDenom = index;
			this._denomButtons[index].setSelected(true);
			
			for(var i = 0;i < 5;i++)
			{
				setBetButtonText.call(this, i);
			}
		},
		
		setCurrBet: function(index)
		{
			this._betButtons[this._config.currentBet].setSelected(false);
			this._config.currentBet = index;
			this._betButtons[index].setSelected(true);
		},
		
		setCurrLine: function(index)
		{
			this._lineButtons[this._config.currentLine].setSelected(false);
			this._config.currentLine = index;
			this._lineButtons[index].setSelected(true);
			
			for(var i = 0;i < 5;i++)
				setBetButtonText.call(this, i);
		},
		
		dispose: function()
		{
			this._settingsCloseButton.dispose();
			
			this._super();
		}
	};
	
	function setBetButtonText(index)
	{
		if(this._config.currency)
		{
			this._config.lineGame=0;
		
			this._betButtons[index].setText(Utils.formatNumber(this._config.bets[index]*this._config.denominations[this._config.currentDenom]*(1), 100, true));
		} 
		else
		{
		
			this._betButtons[index].setText(this._config.bets[index]*(this._config.lineGame ? this._config.lines[this._config.currentLine]: this._config.comboCoeficients[this._config.currentLine]));
		}
	}

	function onAutoplayButtonClick() { this.dispatchEvent(new Event(SettingsView.AUTOPLAY_BUTTON_CLICK)); }
	
	function onDenomButtonClick(event)
	{
		for(var i = 0;i < 4;i++)
			if(event.target == this._denomButtons[i])
			{
				this.dispatchEvent(new Event(SettingsView.DENOM_BUTTON_CLICK, {index: i}));
				return;
			}
	}
	
	function onBetButtonClick(event)
	{
		for(var i = 0;i < 5;i++)
			if(event.target == this._betButtons[i])
			{
				this.dispatchEvent(new Event(SettingsView.BET_BUTTON_CLICK, {index: i}));
				return;
			}
	}
	
	function onLineButtonClick(event)
	{
		for(var i = 0;i < 5;i++)
			if(event.target == this._lineButtons[i])
			{
				this.dispatchEvent(new Event(SettingsView.LINE_BUTTON_CLICK, {index: i}));
				return;
			}
	}
	
	function onSoundButtonClick()
	{
		if(this._soundButton.hasClass("soundOff"))
			this._soundButton.removeClass("soundOff");
		else
			this._soundButton.addClass("soundOff");
			
		this.dispatchEvent(new Event(SettingsView.SOUND_BUTTON_CLICK));
	}
	
	function onPaytableButtonClick() { this.dispatchEvent(new Event(SettingsView.PAYTABLE_BUTTON_CLICK)); }
	function onHelpButtonClick() { this.dispatchEvent(new Event(SettingsView.HELP_BUTTON_CLICK)); }
	function onSettingsCloseButtonClick() { this.dispatchEvent(new Event(SettingsView.SETTINGS_CLOSE_BUTTON_CLICK)); }
	
	return p;
})());