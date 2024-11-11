/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("SlotEngineMain",
{
	// Events sent to the game platform
	SPIN:		"bet",					// sent when a new spin is starting
	COLLECT:	"collect",				// sent when the money from the previous spin should be added to the balance (only when there is a possibility for gamble)
	GAMBLE:		"gamble",				// sent when requesting a gamble card
	JACKPOT:	"jackpot",				// sent when requesting a jackpot card
	SET_RESULT:	"setResult",			// sent when a custom result should be set
	HIDE_GAME:	"hideGame",				// sent when the game should be closed

	MSG_SUCCESS: "success",
	MSG_INSUFFICIENT_FUNDS:"insufficientFunds",
	MSG_REALITY_CHECK:"doRealityCheck",
	MSG_BET_LIMIT:"betLimitReached",
	MSG_LOSS_LIMIT:"lossLimitReached",
	MSG_TIME_LIMIT:"sessionTimeLimitReached",
	MSG_TIME_PROXIMITY_ALERT:"timeProximityAlert",
	MSG_CREDIT_LEFT_ALERT:"creditLeftAlert"
},
(function()
{
	var p = 
	{
		init: function()
		{
			this._super();
			
			this._settingsLoader = null;
			this._resourcesQueue = null;
			this._slotEngineController;
			this._currentState;
			this._lostConnection = false;

			this.VALID_MSG_VALUES = [SlotEngineMain.MSG_SUCCESS, SlotEngineMain.MSG_REALITY_CHECK, SlotEngineMain.MSG_TIME_PROXIMITY_ALERT,
				SlotEngineMain.MSG_CREDIT_LEFT_ALERT];
			
			this.events = [SlotEngineMain.SPIN, SlotEngineMain.COLLECT, SlotEngineMain.GAMBLE, SlotEngineMain.JACKPOT, SlotEngineMain.SET_RESULT, SlotEngineMain.HIDE_GAME];
		},
		
		setData: function(value)
		{
			
			console.log("aaa",value);
			
			if(this._lostConnection)
				return;
			
			var settings = GameSettings.getInstance();

			if (!isNaN(value.totalBet))
				settings.totalBet = value.totalBet;
			if (!isNaN(value.totalWin))
				settings.totalWin = value.totalWin;

			if (value.command == "responsibleGaming")
			{
				if (this._slotEngineController)
					this._slotEngineController.onResponsibleGamingEvent(value.msg);
			}
			else if (value.command == "responsibleGamingComplete")
			{
				if (this._slotEngineController)
					this._slotEngineController.onResponsibleGamingCompleteEvent();
			}
			else if (value.msg == SlotEngineMain.MSG_INSUFFICIENT_FUNDS)
			{
				settings.balance = value.balance;
				settings.serverMessage = new CollectMessage(value.state);
				
				// inform the game about the server response
				this._slotEngineController.onServerResponse();
			}
			else if((value.command == "event" && value.lostConnection) || 
				(value.msg && this.VALID_MSG_VALUES.indexOf(value.msg) == -1))
			{
				this._lostConnection = true;
				
				settings.balance = value.balance;
				if(this._slotEngineController)
					this._slotEngineController.onLostConnection();
				else
				{
					if(this._settingsLoader)
						this._settingsLoader.stop();
					if(this._resourcesQueue)
						this._resourcesQueue.stop();
				}
			}
			else if (value.command == "event" && value.complex)
			{
				// the values of the jackpot should be updated
				settings.jackpotValues = [value.complex.levelI, value.complex.levelII, value.complex.levelIII, value.complex.levelIV];
				
				if(this._slotEngineController)
					this._slotEngineController.onJackpotValuesUpdated(value.complex.winLevel != undefined ? value.complex.winLevel : -1, value.complex.screenName, value.complex.winAmount);
			}
			else if(value.command == "show")
			{
				settings.balance = value.balance;
				settings.currencyType = value.currency;
				
				settings.gameType = value.gameType;
				settings.gameName = value.login.complex[value.gameType][0].gameName;
				settings.gameVersion = settings.gameName + " v: " + Loader.cacheTimestamp.split("|")[0];
				settings.engineType = value.engineType;
				settings.rtp = value.settings.rtp;
				if (value.login.showRtp == false)
					settings.rtp = undefined;
				settings.autoplayLimit = value.login.autoplayLimit;
				settings.sendTotalsInfo = value.login.sendTotalsInfo;
				settings.minimumSpinTime = value.login.minimumSpinTime;
				//settings.screenName = value.iData.playerName;
				//settings.currencyType = value.currency.toUpperCase();
				//settings.setBalance(value.balance);
				//settings.diamondPlay = value.currency == "EGT" ? true : false;
				for(var i in PlatformSettings.currencies)
				{
					if(PlatformSettings.currencies[i].name == value.currency)
					{
						if(PlatformSettings.currencies[i].displayCreditsOnly == "yes")
						{
							settings.currency = false;
						}
						else if(PlatformSettings.currencies[i].displayBanknotesOnly == "yes")
						{
							settings.displayBanknotesOnly = true;
						}

						break;
					}
				}
				settings.betValues = value.settings.bets.slice();
				settings.denominations = value.settings.denominations.slice();
				settings.jackpotAllowed = value.settings.jackpot;
				if (settings.jackpotAllowed)
				{
					settings.jackpotMinBet = value.settings.jackpotMinBet;
					settings.jackpotMaxBet = value.settings.jackpotMaxBet;
				}
				settings.paytableCoeficients = value.settings.paytableCoef;
				settings.translations = CommonSettings.translations;
				settings.currLanguage = value.language;
				settings.mainFakeReels = value.settings.mainFakeReels.slice();
				if (value.settings.freespinFakeReels)
					settings.freespinFakeReels = value.settings.freespinFakeReels.slice();
				
				// get the ways to pay coeficient for a non linear game
				if (value.settings.lines)
				{
					for (var i = value.settings.lines.length-1, j = 4; i >= 0;i--, j--)
						settings.comboCoeficients[j] = value.settings.lines[i];
				}
				
				settings.currDenominationIndex = 0;
				settings.currBetIndex = 0;
				settings.currLineIndex = 4;
	
				if(settings.jackpotAllowed)
					settings.jackpotValues = [value.subscribe.jackpotState.levelI, value.subscribe.jackpotState.levelII, value.subscribe.jackpotState.levelIII, value.subscribe.jackpotState.levelIV];
				value.subscribe.currentState.gameNumber = value.gameNumber;
				this._currentState = new CurrentState(value.subscribe.currentState);
				
				verifyLanguage.call(this);
				
				loadSettings.call(this);
			}
	        else if(value.command == "bet")
			{
				if (value.complex.gameCommand == BaseMessage.COMMAND_SPIN)
				{
					settings.serverMessage = new SpinMessage(value.complex.reels, settings.lineGame ? value.complex.lines : value.complex.combos, value.complex.scatters, value.complex.expand, value.winAmount, value.complex.gambles, value.complex.jackpot, value.complex.freespins, value.complex.freespinsPerLine, value.complex.freespinScatters, value.gameNumber, value.state);
				}
				else if (value.complex.gameCommand == BaseMessage.COMMAND_GAMBLE)
				{
					settings.serverMessage = new GambleMessage(value.complex.card, value.winAmount, value.complex.gambles, value.complex.jackpot, value.state);
				}
				else if(value.complex.gameCommand == BaseMessage.COMMAND_JACKPOT)
				{
					settings.serverMessage = new JackpotMessage(value.complex.card, value.winAmount, value.complex.winLevel, value.state);
				}
				else if(value.complex.gameCommand == BaseMessage.COMMAND_COLLECT)
				{
					settings.serverMessage = new CollectMessage(value.state);
				}
				
				settings.balance = value.balance;
				this._slotEngineController.setBalance();
				
				this._slotEngineController.onServerResponse();
			}
		},
		
		event: function(type, e)
		{
			if(!this._slotEngineController)
				return;
	        
			if(type == "drag")
				this._slotEngineController.onSlideEvent(e);	
		}
	};

	function loadSettings()
	{
		var settings = GameSettings.getInstance();
		this._settingsLoader = new ScriptLoader(settings.engineType+"/games/"+settings.gameType+"/"+settings.gameType+"Config.js");
		this._settingsLoader.addEventListener(LoaderEvent.COMPLETE, onSettingsLoaded, this);
		this._settingsLoader.addEventListener(LoaderEvent.ERROR, onSettingsError, this);
		this._settingsLoader.load();
	}
	
	function loadResources(resources)
	{
		var settings = GameSettings.getInstance();
		
		this._resourcesQueue = Loader.createQueue("slotResources");
		this._resourcesQueue.setAsyncScriptExecution(false);
		
		var len = resources.css ? resources.css.length : 0;
		for(var i = 0;i < len;i++)
			this._resourcesQueue.addCssLoader(new CSSLoader(resources.css[i]));
		
		len = resources.js ? resources.js.length : 0;
		for(var i = 0;i < len;i++)
			this._resourcesQueue.addScriptLoader(new ScriptLoader(resources.js[i]));
		
		len = resources.img ? resources.img.length : 0;
		for(var i = 0;i < len;i++)
			this._resourcesQueue.addImageLoader(new ImageLoader(resources.img[i]));
		
		// load FreespinAnimation resources
		if(resources.freespinAnimation)
		{
			var fsRes = resources.freespinAnimation;
			len = fsRes.js.length;
			for(var i = 0;i < len;i++)
				this._resourcesQueue.addScriptLoader(new ScriptLoader(fsRes.js[i]));
			
			len = fsRes.css ? fsRes.css.length : 0;
			for(var i = 0;i < len;i++)
				this._resourcesQueue.addCssLoader(new CSSLoader(fsRes.css[i]));
			
			if(fsRes.img)
			{
				var localizedImages = null;
				if(fsRes.img[settings.currLanguage])
					localizedImages = fsRes.img[settings.currLanguage];
				else if(fsRes.img["en"])
					localizedImages = fsRes.img["en"];
				
				len = localizedImages ? localizedImages.length : 0;
				for(var i = 0;i < len;i++)
					this._resourcesQueue.addImageLoader(new ImageLoader(localizedImages[i]));
				
				len = fsRes.img.nonlocalized ? fsRes.img.nonlocalized.length : 0;
				for(var i = 0;i < len;i++)
					this._resourcesQueue.addImageLoader(new ImageLoader(fsRes.img.nonlocalized[i]));
			}
		}
		
		if(SoundManager.getInstance().isSupported())
			this._resourcesQueue.addSoundLoader(new SoundLoader("sounds/dummy.mp3"));
		
		this._resourcesQueue.addEventListener(LoaderEvent.COMPLETE, onResourcesLoaded, this);
		this._resourcesQueue.addEventListener(LoaderEvent.PROGRESS, onResourcesProgress, this);
		this._resourcesQueue.addEventListener(LoaderEvent.ERROR, onResourcesError, this);
		this._resourcesQueue.load();
	}
	
	function verifyLanguage()
	{
		var settings = GameSettings.getInstance();
		var translations = settings.translations;
		
		// if we don`t have a translation for the requested language set it to english
		if(!translations[settings.currLanguage])
			settings.currLanguage = "en";
			
		console.log(settings.currLanguage);
	}
	
	function setDenomBetAndLines()
	{
		var settings = GameSettings.getInstance();
		
		// if state != "idle" set the last denomination, bet and lines from the server
		if (this._currentState.state != BaseMessage.STATE_IDLE)
		{
			var len = settings.denominations.length;
			for (var i = 0; i < len; i++)
				if (settings.denominations[i][0] == this._currentState.denomination)
				{
					settings.currDenominationIndex = i;
					break;
				}
			
			len = settings.betValues.length;
			var denom = settings.denominations[settings.currDenominationIndex][0];
			for (i = 0; i < len; i++)
				if (settings.betValues[i]*denom == this._currentState.bet)
				{
					settings.currBetIndex = i;
					break;
				}
			
			len = settings.linesCountConfig.length;
			for (i = 0; i < len; i++)
				if (settings.linesCountConfig[i] == this._currentState.numberOfLines)
				{
					settings.currLineIndex = i;
					break;
				}
		}
	}
	
	function onSettingsLoaded(event)
	{
		event.target.removeEventListener(LoaderEvent.COMPLETE, onSettingsLoaded, this);
		event.target.removeEventListener(LoaderEvent.ERROR, onSettingsError, this);
		
		var settings = GameSettings.getInstance();
		
		var gameConfig = new window[settings.gameType+"Config"](settings);
		gameConfig.prepareSettings();
		
		console.log("SETTINGS LOADED");
		
		loadResources.call(this, gameConfig.resources);
	}
	
	function onSettingsError(event)
	{
		event.target.removeEventListener(LoaderEvent.COMPLETE, onSettingsLoaded, this);
		event.target.removeEventListener(LoaderEvent.ERROR, onSettingsError, this);
		
		this.dispatchEvent(new LoaderEvent(LoaderEvent.ERROR));
		
		console.log("SETTINGS ERROR");
	}
	
	function onResourcesLoaded(event)
	{
		event.target.removeEventListener(LoaderEvent.COMPLETE, onResourcesLoaded, this);
		event.target.removeEventListener(LoaderEvent.ERROR, onResourcesError, this);
		
		var settings = GameSettings.getInstance();
		
		console.log("GAME READY TO START");
		
		setDenomBetAndLines.call(this);
		
		var videosQueue = Loader.createQueue("slotVideos");
		var len = settings.reelVideos.length;
		for(var i = 0;i < len;i++)
		{
			if(settings.reelVideos[i])
				videosQueue.addImageLoader(new ImageLoader(settings.reelVideos[i].src));
		}
		if(settings.expandVideo)
			videosQueue.addImageLoader(new ImageLoader(settings.expandVideo.src));
		if (settings.stopVideos) {
			var len = settings.stopVideos.length;
			for(var i = 0;i < len;i++)
			{
				if(settings.stopVideos[i])
					videosQueue.addImageLoader(new ImageLoader(settings.stopVideos[i].src));
			}
		}

		videosQueue.load();
		
		var totalsInfoView = null;
		if (settings.sendTotalsInfo)
		{
			var panelHeight = 26;
			settings.scaleCoef = (720 - panelHeight) / 720;
			settings.paddingX = (1280 - 1280*settings.scaleCoef) / 2;
			settings.paddingY = (720 - 720*settings.scaleCoef) / 2;

			totalsInfoView = new TotalsInfoView({currencyType: settings.currencyType,
				totalBetLabel:settings.localize("totalBetLabel"), totalWinLabel:settings.localize("totalWinLabel")});
			totalsInfoView.setSize(1280, panelHeight);
			totalsInfoView.setPosition(0, 720 - panelHeight);
		}
		
		this._slotEngineController = new SlotEngineController(this._currentState, totalsInfoView);
		
		var len = this.events.length;
		for(var i = 0;i < len;i++)
			this._slotEngineController.addEventListener(this.events[i], onGameEvent, this);
		
		this.addChild(this._slotEngineController._view);
		
		if(totalsInfoView)
			this.addChild(totalsInfoView);
		
		if(settings.sendTotalsInfo) {
			this._slotEngineController._view.setScale(settings.scaleCoef, settings.scaleCoef);
			this._slotEngineController._view.y((720*settings.scaleCoef - 720) / 2);
		}
		
		this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
	}
	
	function onResourcesProgress(event)
	{
		this.dispatchEvent(new LoaderEvent(LoaderEvent.PROGRESS, event.data));
	}
	
	function onResourcesError(event)
	{
		event.target.removeEventListener(LoaderEvent.COMPLETE, onResourcesLoaded, this);
		event.target.removeEventListener(LoaderEvent.ERROR, onResourcesError, this);
		
		this.dispatchEvent(new LoaderEvent(LoaderEvent.ERROR));
	}
	
	function onGameEvent(event)
	{
		this.dispatchEvent(event);
	}
	
	return p;
})());