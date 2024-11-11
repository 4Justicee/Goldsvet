/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("GambleViewController",
{
},
(function()
{
	var p =
	{
		init: function()
		{
			this._view = null;
			this._cardClickSoundChannel = null;
			this._cardClickSoundRequested = false;
			
			this._super();
			
			var settings = GameSettings.getInstance();
			var message = GameSettings.getInstance().serverMessage;
			if (message.type != BaseMessage.SPIN)
			{
				throw "Trying to open gamble with invalid message type!";
				return;
			}
			
			this._view = new GambleView(74, 67, {gambleAmountTitle:settings.localize("GAMBLE AMOUNT"), 
									amountToWinTitle:settings.localize("GAMBLE TO WIN"), currencyType: settings.currencyType, currency: settings.currency,
									denomination: settings.denominations[settings.currDenominationIndex][0], historyTitle:settings.localize("HISTORY"), 
									attemptsLeftTitle:settings.localize("GAMBLE ATTEMPTS LEFT"), attemptsLeft:message.gambleAttemptsLeft,
									gambleAmount:message.winAmount, amountToWin:message.winAmount * 2, history:settings.historyCards});
			
			this._view.addEventListener(GambleView.GAMBLE_RED_BLACK_BUTTON_CLICK, onRedBlackButtonClick, this);
			this._view.addEventListener(GambleView.GAMBLE_RESULT_SHOWN, onGambleResultShown, this);
			this._view.addEventListener(GambleView.START_CLICK_SOUND, onStartClickSound, this);
			this._view.addEventListener(GambleView.STOP_CLICK_SOUND, onStopClickSound, this);
			
			SoundManager.getInstance().addEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);
			
			onStartClickSound.call(this);

			$(document).bind("keyup", this, onKeyUp);
		},
		
		setResult: function()
		{
			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;
			if (message.type != BaseMessage.GAMBLE)
			{
				throw "Setting gamble result from invalid message type in GambleViewController!";
				return;
			}
			
			var history = settings.historyCards;
			var len;
			if (history.length < 10)
				history.push( -1);
			len = history.length;
			for (var i = len - 1; i >= 1; i--)
				history[i] = history[i - 1];
			history[0] = message.card;
			this._view.setResult(message.card, message.winAmount, message.winAmount*2, message.gambleAttemptsLeft, history);
			
			if (message.winAmount > 0)
				SoundManager.getInstance().play("gambleWonSound");
			else
				SoundManager.getInstance().play("gambleLostSound");
		},
		
		dispose: function()
		{
			$(document).unbind("keyup", onKeyUp);

			SoundManager.getInstance().removeEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);
			
			onStopClickSound.call(this);

			this._super();
		}
	};

	function onKeyUp(event)
	{
		console.log(event);

		var self = event.data;
		if(event.keyCode == 37 || event.keyCode == 39) // Left or Right
		{
			if(self._view.getButtonsEnabled())
			{
				if(event.keyCode == 37)
				{
					self._view.dispatchEvent(new Event(GambleView.GAMBLE_RED_BLACK_BUTTON_CLICK, {type: 0}));
				}
				else if(event.keyCode == 39)
				{
					self._view.dispatchEvent(new Event(GambleView.GAMBLE_RED_BLACK_BUTTON_CLICK, {type: 1}));
				}
			}
		}
	}
	
	function onRedBlackButtonClick(event) { this.dispatchEvent(event); }
	function onGambleResultShown(event) { this.dispatchEvent(event); }
	
	function onStartClickSound() 
	{ 
		this._cardClickSoundChannel = SoundManager.getInstance().play("gambleCardClickSound", true);
		this._cardClickSoundRequested = true;
	}
	
	function onStopClickSound() 
	{ 
		this._cardClickSoundChannel = SoundManager.getInstance().stop(this._cardClickSoundChannel); 
		this._cardClickSoundRequested = false;
	}
	
	function onSoundLoaded(event)
	{
		if(event.data.soundIndex == 0 && this._cardClickSoundRequested)
			onStartClickSound.call(this);
	}
	
	return p;
})());