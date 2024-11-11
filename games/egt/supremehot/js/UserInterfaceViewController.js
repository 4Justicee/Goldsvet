/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */
//
//function UserInterfaceViewController(winMoneyCallback, jackpotBlinkCallback, viewport)
//{

ViewController("UserInterfaceViewController",
{
	STATE_IDLE: 0,
	STATE_WAITING_FOR_SPIN_RESULT: 1,
	STATE_WAITING_FOR_REELS_TO_STOP: 2,
	STATE_WAITING_FOR_COLLECT: 3,
	STATE_GAMBLE: 4,
	STATE_WAITING_FOR_MONEY_ANIMATION: 5,
	STATE_FREESPINS_TRANSITION: 6,
	STATE_WAITING_FOR_FREESPINS_START: 7,
	STATE_WAITING_FOR_FREESPINS_ANIMATION: 8,
	STATE_WAITING_FOR_EXPAND: 9,
	STATE_INSUFFICIENT_FUNDS: 10,
	STATE_WAITING_FOR_GAMBLE_RESULT: 11,
	STATE_SETTINGS_PAYTABLE: 12,
	STATE_WIN: 13,
	STATE_JACKPOT: 14,
	STATE_JACKPOT_COLLECT_WAIT: 15,
	STATE_JACKPOT_TRANSITION: 16,
	STATE_WAITING_FOR_JACKPOT_MONEY_ANIMATION: 17,
	STATE_TERMINAL_INSUFFICIENT_FUNDS: 18,
	
	SPIN_BUTTON_CLICK: "spinButtonClick",
	COLLECT_BUTTON_CLICK: "collectButtonClick",
	GAMBLE_BUTTON_CLICK: "gambleButtonClick",
	STOP_BUTTON_CLICK: "stopButtonClick",
	STOP_AUTOPLAY_BUTTON_CLICK: "stopAutoplayButtonClick",
	HOME_BUTTON_CLICK: "homeButtonClick",
	SETTINGS_BUTTON_CLICK: "settingsButtonClick",
	BET_BUTTON_CLICK: "betButtonClick",
	DENOM_BUTTON_CLICK: "denomButtonClick"
},
(function()
{
	var p = 
	{
		init: function()
		{
			this._super();
			
			this._freezedJackpotValue;
			this._uiState;
			this._lostConnection = false;
			
			var settings = GameSettings.getInstance();
			this._view = new UserInterfaceView({diamondPlay:settings.diamondPlay, currency:settings.currency, currencyType:settings.currencyType,
		   		lines: settings.linesCountConfig, currLine: settings.currLineIndex, displayBanknotesOnly: settings.displayBanknotesOnly,
			   	denomination:settings.denominations[settings.currDenominationIndex][0], balanceTitle:settings.localize("BALANCE"),
			   	betTitle:settings.localize("TOTAL BET"), winTitle:settings.localize("WIN"), freespinText:settings.localize("FREE SPIN"),
			   	ofText: settings.localize("OF"), paddingX: settings.paddingX,
			   	lineGame:settings.lineGame, fixedLinesCount:settings.fixedLinesCount, jackpotAllowed: settings.jackpotAllowed
			});
			
			this._view.addEventListener(UserInterfaceView.WIN_MONEY_ANIMATED, onWinMoneyAnimationComplete, this);
			
			this._view.spinButton.addEventListener(MouseEvent.CLICK, onUIButtonClick, this);
			this._view.collectButton.addEventListener(MouseEvent.CLICK, onUIButtonClick, this);
			this._view.gambleButton.addEventListener(MouseEvent.CLICK, onUIButtonClick, this);
			this._view.stopButton.addEventListener(MouseEvent.CLICK, onUIButtonClick, this);
			this._view.betButton.addEventListener(MouseEvent.CLICK, onUIButtonClick, this);
			this._view.denomButton.addEventListener(MouseEvent.CLICK, onUIButtonClick, this);
			this._view.stopAutoplayButton.addEventListener(MouseEvent.CLICK, onUIButtonClick, this);
			this._view.homeButton.addEventListener(MouseEvent.CLICK, function(ev){document.location.href="../../../"}, this);
			this._view.settingsButton.addEventListener(MouseEvent.CLICK, onUIButtonClick, this);
			this._view.addEventListener(JackpotBoxes.JACKPOT_BLINK_COMPLETE, onJackpotBlinkComplete, this);
										   
			if(settings.fixedLinesCount)
				this._view.setFixedLines(settings.currLineIndex);

			this._freezedJackpotValue = -1;
			
			if(settings.jackpotAllowed)
				this.setJackpotValues(settings.jackpotValues, [true, true, true, true]);

			var self = this;
			$(document).keyup(function(event)
			{
				if(event.keyCode == 32) // Space
				{
					if(self._view.spinButton.enabled())
					{
						self._view.spinButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
					}
					else if(self._view.collectButton.enabled())
					{
						self._view.collectButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
					}
					else if(self._view.stopButton.enabled())
					{
						self._view.stopButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
					}
					else if(self._view.stopAutoplayButton.enabled())
					{
						self._view.stopAutoplayButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
					}
				}
				else if(event.keyCode == 37 || event.keyCode == 39) // Left or Right
				{
					if(self._view.gambleButton.enabled())
					{
						self._view.gambleButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
					}
				}
			});
		},
		
		getUIState: function() { return this._uiState; },
		setUIState: function(state, gamble)
		{
			if(this._lostConnection)
				return;
			
			var settings = GameSettings.getInstance();
			
			this._uiState = state;
			
			if(gamble == undefined)
				gamble = false;

			if (settings.autoplayGame && settings.remainingAutoplays >= 0)
			{
				this._view.stopAutoplayButton.remainingAutoplays.setText(settings.remainingAutoplays);
			}
			else
			{
				this._view.stopAutoplayButton.remainingAutoplays.setText("");
			}
			
			this._view.betButton.enabled(false);
			this._view.denomButton.enabled(false);

			switch(state)
			{
				case UserInterfaceViewController.STATE_IDLE:
					if(settings.autoplayGame)
					{
						this._view.stopAutoplayButton.visible(true);
						this._view.stopAutoplayButton.enabled(true);
					}
					else
					{
						this._view.stopAutoplayButton.visible(false);
						this._view.stopAutoplayButton.enabled(false);
						this._view.spinButton.visible(true);
						this._view.spinButton.enabled(true);
					}
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.infoLineField.setText(settings.localize("PLEASE PLACE YOUR BET"));
					this._view.settingsButton.enabled(true);
					this._view.betButton.enabled(true);
					this._view.denomButton.enabled(true);
					this._view.homeButton.enabled(true);
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_SPIN_RESULT:
					if(settings.autoplayGame)
					{
						this._view.stopAutoplayButton.visible(true);
						this._view.stopAutoplayButton.enabled(true);
					}
					else
					{
						this._view.stopAutoplayButton.visible(false);
						this._view.stopAutoplayButton.enabled(false);
					}
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(true);
					this._view.infoLineField.setText(settings.localize("GOOD LUCK!"));
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_REELS_TO_STOP:
					if(settings.autoplayGame)
					{
						this._view.stopAutoplayButton.visible(true);
						this._view.stopAutoplayButton.enabled(true);
					}
					else
					{
						this._view.stopAutoplayButton.visible(false);
						this._view.stopAutoplayButton.enabled(false);
					}
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_EXPAND:
					if(settings.autoplayGame)
					{
						this._view.stopAutoplayButton.visible(true);
						this._view.stopAutoplayButton.enabled(true);
					}
					else
					{
						this._view.stopAutoplayButton.visible(false);
						this._view.stopAutoplayButton.enabled(false);
					}
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_MONEY_ANIMATION:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(true);
					this._view.collectButton.enabled(true);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.infoLineField.setText("");
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					break;
				case UserInterfaceViewController.STATE_WIN:
					if(settings.autoplayGame)
					{
						this._view.stopAutoplayButton.visible(true);
						this._view.stopAutoplayButton.enabled(true);
						this._view.collectButton.visible(false);
						this._view.collectButton.enabled(false);
					}
					else
					{
						this._view.stopAutoplayButton.visible(false);
						this._view.stopAutoplayButton.enabled(false);
						this._view.collectButton.visible(true);
						this._view.collectButton.enabled(true);
						this._view.gambleButton.visible(gamble);
						this._view.gambleButton.enabled(gamble);
					}
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.infoLineField.setText("");
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_COLLECT:
					if(settings.autoplayGame)
					{
						this._view.stopAutoplayButton.visible(true);
						this._view.stopAutoplayButton.enabled(true);
					}
					else
					{
						this._view.stopAutoplayButton.visible(false);
						this._view.stopAutoplayButton.enabled(false);
						this._view.collectButton.visible(true);
					}
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					break;
				case UserInterfaceViewController.STATE_GAMBLE:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(true);
					this._view.collectButton.enabled(true);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					break;
				case UserInterfaceViewController.STATE_FREESPINS_TRANSITION:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					this._view.infoLineField.setText("");
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_FREESPINS_START:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(true);
					this._view.spinButton.enabled(true);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					this._view.infoLineField.setText("");
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_FREESPINS_ANIMATION:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					this._view.infoLineField.setText("");
					break;
				case UserInterfaceViewController.STATE_INSUFFICIENT_FUNDS:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(true);
					this._view.spinButton.enabled(true);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(true);
					this._view.betButton.enabled(true);
					this._view.denomButton.enabled(true);
					this._view.homeButton.enabled(true);
					this._view.infoLineField.setText(settings.localize("INSUFFICIENT BALANCE"));
					break;
				case UserInterfaceViewController.STATE_TERMINAL_INSUFFICIENT_FUNDS:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(true);
					this._view.infoLineField.setText(settings.localize("INSUFFICIENT BALANCE"));
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_GAMBLE_RESULT:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					break;
				case UserInterfaceViewController.STATE_SETTINGS_PAYTABLE:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(true);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.betButton.enabled(true);
					this._view.denomButton.enabled(true);
					this._view.homeButton.enabled(true);
					break;
				case UserInterfaceViewController.STATE_JACKPOT:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					this._view.infoLineField.setText(settings.localize("CHOOSE CARD"));
					break;
				case UserInterfaceViewController.STATE_JACKPOT_TRANSITION:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					this._view.infoLineField.setText("");
					break;
				case UserInterfaceViewController.STATE_WAITING_FOR_JACKPOT_MONEY_ANIMATION:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(false);
					this._view.collectButton.enabled(false);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					this._view.infoLineField.setText("");
					break;
				case UserInterfaceViewController.STATE_JACKPOT_COLLECT_WAIT:
					this._view.stopAutoplayButton.visible(false);
					this._view.stopAutoplayButton.enabled(false);
					this._view.spinButton.visible(false);
					this._view.spinButton.enabled(false);
					this._view.collectButton.visible(true);
					this._view.collectButton.enabled(true);
					this._view.gambleButton.visible(false);
					this._view.gambleButton.enabled(false);
					this._view.stopButton.enabled(false);
					this._view.settingsButton.enabled(false);
					this._view.homeButton.enabled(false);
					this._view.infoLineField.setText(settings.localize("PRESS COLLECT TO END THIS FEATURE"));
					break;
			}
		},
		
		setGameNumber: function(value) { this._view.setGameNumber(value); },
		getWinMoneyAnimating: function() { return this._view.getWinMoneyAnimating(); },
		getBalanceMoneyAnimating: function() { return this._view.getBalanceMoneyAnimating(); },
		balanceMoney: function() { return this._view.balanceMoney(); },
		winMoney: function() { return this._view.winMoney(); },
		
		freespins: function(value) 
		{ 		
			var settings = GameSettings.getInstance();
			
			if (!this._lostConnection)
			{
				this._view.freespins(value); 
				if (value)
					this._view.updateFreespins(settings.currFreespin, settings.totalFreespins);

				if(value)
				{
					if(settings.freespinFixedLines != -1)
					{
						this._view.setLines(settings.freespinFixedLines);
						this._view.setFixedLines(settings.freespinFixedLines);
					}
				}
				else
				{
					this._view.setLines(settings.currLineIndex);
					if(settings.fixedLinesCount)
						this._view.setFixedLines(settings.currLineIndex);
					else
						this._view.setFixedLines(-1);
				}
			}
		},
		
		setZIndexesForSettingsShown: function() { this._view.setZIndexesForSettingsShown(); },
		setZIndexesForSettingsHidden: function() { this._view.setZIndexesForSettingsHidden(); },
		
		setBalanceMoney: function(value, animated, time)
		{
			if(animated == undefined)
				animated = false;
			if(time == undefined)
				time = 0;
				
			var settings = GameSettings.getInstance();

			if (this._view.getBalanceMoneyAnimating() || animated)
				this._view.animateBalanceMoney(value, time > 0 ? time : MoneyAnimation.getAnimationTime(Math.abs(this._view.balanceMoney()-value), settings.denominations[settings.currDenominationIndex][0])/1000);
			else
				this._view.balanceMoney(value);
		},
		
		setWinMoney: function(value, animated, time)
		{
			if(animated == undefined)
				animated = true;
			if(time == undefined)
				time = 0;
				
			var settings = GameSettings.getInstance();
				
			if (animated)
				this._view.animateWinMoney(value, time > 0 ? time : MoneyAnimation.getAnimationTime(Math.abs(this._view.winMoney()-value), settings.denominations[settings.currDenominationIndex][0])/1000);
			else
				this._view.winMoney(value);
		},
		
		setBetMoney: function(value) { this._view.setBet(value); },
		
		setDenomination: function(value) { this._view.setDenomination(value); },
		
		setLines: function(index) { this._view.setLines(index); },
		
		setJackpotValues: function(values, updated, animated, time) 
		{ 
			if(time == undefined)
				time = 0;
				
			if (updated[0] && this._freezedJackpotValue != 0)
			{
				if (!animated || !animated[0])
					this._view.jackpotBoxes.setJackpot(0, values[0]);
				else
					this._view.jackpotBoxes.animateJackpot(values[0], 0, time);
			}
			if (updated[1] && this._freezedJackpotValue != 1)
			{
				if (!animated || !animated[1])
					this._view.jackpotBoxes.setJackpot(1, values[1]);
				else
					this._view.jackpotBoxes.animateJackpot(values[1], 1, time);
			}
			if (updated[2] && this._freezedJackpotValue != 2)
			{
				if (!animated || !animated[2])
					this._view.jackpotBoxes.setJackpot(2, values[2]);
				else
					this._view.jackpotBoxes.animateJackpot(values[2], 2, time);
			}
			if (updated[3] && this._freezedJackpotValue != 3)
			{
				if (!animated || !animated[3])
					this._view.jackpotBoxes.setJackpot(3, values[3]);
				else
					this._view.jackpotBoxes.animateJackpot(values[3], 3, time);
			}
		},
		
		setJackpotWinScreenName: function(index, name) 
		{ 
			if (index != this._freezedJackpotValue) 
			{
				SoundManager.getInstance().play("jackpotShowWinnerSound");
				this._view.jackpotBoxes.setJackpotScreenName(index, name); 
			}
		},
		stopJackpotBlink: function(index) { this._view.jackpotBoxes.stopJackpotBlink(index); },
		freezeJackpotValue: function(value) { this._freezedJackpotValue = value; },
		
		updateFreespins: function()
		{
			var settings = GameSettings.getInstance();
			
			this._view.updateFreespins(settings.currFreespin, settings.totalFreespins);
		},
		
		completeAnimations: function() { this._view.completeAnimations(true, true); },
		
		onLostConnection: function() 
		{
			var settings = GameSettings.getInstance();
			
			this._lostConnection = true;
			
			this._view.stopAutoplayButton.visible(false);
			this._view.stopAutoplayButton.enabled(false);
			this._view.spinButton.visible(false);
			this._view.spinButton.enabled(false);
			this._view.collectButton.visible(false);
			this._view.collectButton.enabled(false);
			this._view.gambleButton.visible(false);
			this._view.gambleButton.enabled(false);
			this._view.stopButton.enabled(false);
			this._view.settingsButton.enabled(false);
			this._view.homeButton.enabled(true);
			this._view.infoLineField.setText(settings.localize("NO CONNECTION"));
		},
		
		dispose: function()
		{
			this._view.removeEventListener(UserInterfaceView.WIN_MONEY_ANIMATED, onWinMoneyAnimationComplete, this);
			
			this._super();
		}
	};
	
	function onUIButtonClick(event)
	{
		var eventType = "";
		if(event.target == this._view.spinButton)
			eventType = UserInterfaceViewController.SPIN_BUTTON_CLICK;
		else if(event.target == this._view.collectButton)
			eventType = UserInterfaceViewController.COLLECT_BUTTON_CLICK;
		else if(event.target == this._view.gambleButton)
			eventType = UserInterfaceViewController.GAMBLE_BUTTON_CLICK;
		else if(event.target == this._view.stopButton)	
			eventType = UserInterfaceViewController.STOP_BUTTON_CLICK;
		else if(event.target == this._view.stopAutoplayButton)	
			eventType = UserInterfaceViewController.STOP_AUTOPLAY_BUTTON_CLICK;
		else if(event.target == this._view.homeButton)	
			eventType = UserInterfaceViewController.HOME_BUTTON_CLICK;
		else if(event.target == this._view.settingsButton)	
			eventType = UserInterfaceViewController.SETTINGS_BUTTON_CLICK;
		else if(event.target == this._view.betButton)
			eventType = UserInterfaceViewController.BET_BUTTON_CLICK;
		else if(event.target == this._view.denomButton)
			eventType = UserInterfaceViewController.DENOM_BUTTON_CLICK;

		this.dispatchEvent(new Event(eventType));
	}
	
	function onWinMoneyAnimationComplete(event) { this.dispatchEvent(event); }
	
	function onJackpotBlinkComplete(event) { this.dispatchEvent(event); }

	return p;
})());
