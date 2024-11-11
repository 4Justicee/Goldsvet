/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("SettingsViewController", /*(animated, denomCallback, betCallback, lineCallback, showCallback, hideCallback, paytableCallback)*/
{
},
(function()
{
	var p =
	{
		init: function(animated)
		{
			this._super();
			
			var settings = GameSettings.getInstance();
			var soundManager = SoundManager.getInstance();
			
			var denominations = [];
			var len = settings.denominations.length;
			for(var i = 0;i < len;i++)
			{
				denominations[i] = settings.denominations[i][0];
			}
			this._view = new SettingsView({denominations: denominations, currentDenom: settings.currDenominationIndex,
									  bets: settings.betValues, currentBet: settings.currBetIndex, comboCoeficients:settings.comboCoeficients, lineGame:settings.lineGame,
									  lines: settings.linesCountConfig, currentLine: settings.currLineIndex, fixedLines: settings.fixedLinesCount,
									  betText:settings.localize("BET"), creditText: settings.localize("CREDIT"), lineText: settings.localize("Line").toUpperCase(),
									  linesText: settings.localize("LINES"), fixedText: settings.localize("FIXED"), currencyType: settings.currencyType,
									  currency: settings.currency, soundButtonEnabled: soundManager.isSupported(), isMuted: soundManager.isMuted()});
			
			this._view.addEventListener(SettingsView.BET_BUTTON_CLICK, onBetButtonClick, this);
			this._view.addEventListener(SettingsView.DENOM_BUTTON_CLICK, onDenomButtonClick, this);
			this._view.addEventListener(SettingsView.LINE_BUTTON_CLICK, onLineButtonClick, this);
			this._view.addEventListener(SettingsView.AUTOPLAY_BUTTON_CLICK, onAutoplayButtonClick, this);
			this._view.addEventListener(SettingsView.SOUND_BUTTON_CLICK, onSoundButtonClick, this);
			this._view.addEventListener(SettingsView.SETTINGS_CLOSE_BUTTON_CLICK, onSettingsCloseButtonClick, this);
			this._view.addEventListener(SettingsView.PAYTABLE_BUTTON_CLICK, onOtherEvents, this);
			this._view.addEventListener(SettingsView.HELP_BUTTON_CLICK, onHelpButtonClick, this);
			this._view.addEventListener(SettingsView.SETTINGS_SHOWN, onOtherEvents, this);
			this._view.addEventListener(SettingsView.SETTINGS_HIDDEN, onOtherEvents, this);
									  
			this._view.show(animated);
			soundManager.play("settingsShowSound");
		},
		
		dispose: function()
		{
			this._view.removeEventListener(SettingsView.BET_BUTTON_CLICK, onBetButtonClick, this);
			this._view.removeEventListener(SettingsView.DENOM_BUTTON_CLICK, onDenomButtonClick, this);
			this._view.removeEventListener(SettingsView.LINE_BUTTON_CLICK, onLineButtonClick, this);
			this._view.removeEventListener(SettingsView.AUTOPLAY_BUTTON_CLICK, onAutoplayButtonClick, this);
			this._view.removeEventListener(SettingsView.SOUND_BUTTON_CLICK, onSoundButtonClick, this);
			this._view.removeEventListener(SettingsView.SETTINGS_CLOSE_BUTTON_CLICK, onSettingsCloseButtonClick, this);
			this._view.removeEventListener(SettingsView.PAYTABLE_BUTTON_CLICK, onOtherEvents, this);
			this._view.removeEventListener(SettingsView.HELP_BUTTON_CLICK, onHelpButtonClick, this);
			this._view.removeEventListener(SettingsView.SETTINGS_SHOWN, onOtherEvents, this);
			this._view.removeEventListener(SettingsView.SETTINGS_HIDDEN, onOtherEvents, this);
			
			this._super();
		}
	};

	function onBetButtonClick(event)
	{
		GameSettings.getInstance().currBetIndex = event.data.index;
		SoundManager.getInstance().play("selectBetSound"+(event.data.index+1));
		
		this._view.setCurrBet(event.data.index);

		this.dispatchEvent(event);
	}
	
	function onDenomButtonClick(event)
	{
		GameSettings.getInstance().currDenominationIndex = event.data.index;
		SoundManager.getInstance().play("spinSound");

		this._view.setCurrDenom(event.data.index);

		this.dispatchEvent(event);
	}
	
	function onLineButtonClick(event)
	{
		var settings = GameSettings.getInstance();
		if(settings.fixedLinesCount)
			return;
			
		settings.currLineIndex = event.data.index;
		
		this._view.setCurrLine(event.data.index);
		
		SoundManager.getInstance().play("selectBetSound"+(event.data.index+1));

		this.dispatchEvent(event);
	}
	
	function onAutoplayButtonClick()
	{
		var settings = GameSettings.getInstance();

		SoundManager.getInstance().play("startAutoplaySound");
		settings.autoplayGame = true;

		if(settings.autoplayLimit != null && settings.autoplayLimit.length > 0)
		{
			settings.remainingAutoplays = settings.autoplayLimit[settings.autoplayLimit.length-1];
		}

		this._view.hide();
	}
	
	function onSoundButtonClick()
	{
		var soundManager = SoundManager.getInstance();
		soundManager.toggleMute();
		if(!soundManager.areSoundsLoaded())
			soundManager.loadAll();
		
		if(!soundManager.isMuted())
			soundManager.play("unmuteSound");
	}
	
	function onSettingsCloseButtonClick()
	{
		this._view.hide();
		SoundManager.getInstance().play("settingsHideSound");
	}

	function onHelpButtonClick()
	{
		var settings = GameSettings.getInstance();

		var params = {};
		if(settings.rtp)
			params.rtp = settings.rtp;
		params.currencyType = settings.currencyType;

		params.shouldHideStopAll = settings.minimumSpinTime > 0;
		params.hasAutoplayLimit = settings.autoplayLimit != null && settings.autoplayLimit.length > 0;
		params.hasTotalsInfo = Boolean(settings.sendTotalsInfo);
		params.jackpotAllowed = settings.jackpotAllowed;
		params.lineGame = settings.lineGame;

		if (settings.jackpotAllowed)
		{
			var currency = settings.currencyType;
			params.qBets = Utils.formatNumber(settings.jackpotMinBet, 100, true) + " " + currency + " - " + Utils.formatNumber(settings.jackpotMaxBet, 100, true) + " " + currency;
		}

		var urlParam = "?" + parseURLParams(params);
		var helpLang = (settings.helpLanguages.indexOf(settings.currLanguage) < 0 ? "en" : settings.currLanguage);
		var helpUrl = settings.engineType + "/games/" + settings.gameType + "/help/help_" + helpLang + ".html"+urlParam;

		window.open(helpUrl, 'popUp', 'width=400,height=400,toolbar=no,scrollbars=yes,resizable=yes');
	}

	function parseURLParams(params)
	{
		var string = "";

		for (var key in params)
		{
			var p = encodeURIComponent(params[key]);
			string += key+"="+p+"&";
		}

		return string;
	}
	
	function onOtherEvents(event) { this.dispatchEvent(event); }
	
	return p;
})());