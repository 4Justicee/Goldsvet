/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("SlotEngineController",
{
},
(function()
{
	var p =
	{
		init: function(currentState, totalsInfoView)
		{
			this._reelsViewController;
			this._uiViewController;
			this._winVisualizationViewController;
			this._videoViewController;
			this._gambleViewController;
			this._jackpotViewController;
			this._settingsViewController;
			this._paytableViewController;
			this._freespinAnimationViewController;
			this._customResultViewController;
			this._soundPopUp;
			this._lostConnection = false;
			this._stateMachineContext;
			this._startRequested = false;
			this._autoplayDelayTimer;
			this._collectReceived = true;
			this._startJackpotAfterWinMoneyAnimation = false;
			this._jackpotWaitTimer;
			this._jackpotComplete = false;
			this._jackpotMusicSoundChannel;
			this._jackpotMusicRequested = false;
			this._jackpotWinSoundChannel;
			this._jackpotWinSoundRequested = false;
			this._freespinsSpinMessage = null;
			this._freespinsStartPressed = false;
			this._currentState = currentState;
			this._freespinMusicSoundChannel;

			this._super();

			// TODO: add a button to show and hide the debug panel

			this._view = new View("");
			this._view.setSize(1280, 720);
			
			this._totalsInfoView = totalsInfoView;
			setTotalsInfo.call(this);

			var settings = GameSettings.getInstance();
			var soundManager = SoundManager.getInstance();

			if(soundManager.isSupported())
			{
				if(!settings.jackpotAllowed)
				{
					settings.soundsInfo.splice(4, 1);
				}

				soundManager.setSounds(settings.soundsInfo);
				soundManager.addEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);

				this._soundPopUp = new PopUp("Play Sounds?", "", "Yes", "No");
				this._soundPopUp.addEventListener(PopUp.BUTTON1_CLICK, onLoadSounds, this);
				this._soundPopUp.addEventListener(PopUp.BUTTON2_CLICK, onCancelSounds, this);

				this._soundPopUp.setButtonIds("SoundPopUpYesButton", "SoundPopUpNoButton");
			}

			this._reelsViewController = new ReelsViewController(currentState.reels);
			this._reelsViewController.addEventListener(ReelsViewController.REELS_STOPPED, onReelsStopped, this);

			this._uiViewController = new UserInterfaceViewController();
			this._uiViewController.setBalanceMoney(settings.balance);
			this._uiViewController.setWinMoney(0, false);
			this._uiViewController.setBetMoney(this.bet());
			this._uiViewController.setDenomination(settings.denominations[settings.currDenominationIndex][0]);
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_IDLE);

			this._uiViewController.addEventListener(UserInterfaceViewController.SPIN_BUTTON_CLICK, onSpinClick, this);
			this._uiViewController.addEventListener(UserInterfaceViewController.STOP_BUTTON_CLICK, onStopClick, this);
			this._uiViewController.addEventListener(UserInterfaceViewController.COLLECT_BUTTON_CLICK,  onCollectClick, this);
			this._uiViewController.addEventListener(UserInterfaceViewController.GAMBLE_BUTTON_CLICK, onGambleClick, this);
			this._uiViewController.addEventListener(UserInterfaceViewController.STOP_AUTOPLAY_BUTTON_CLICK, onAutoplayStopClick, this);
			this._uiViewController.addEventListener(UserInterfaceViewController.HOME_BUTTON_CLICK, onHomeClick, this);
			this._uiViewController.addEventListener(UserInterfaceViewController.SETTINGS_BUTTON_CLICK, onSettingsClick, this);
			this._uiViewController.addEventListener(UserInterfaceViewController.BET_BUTTON_CLICK, onBetClick, this);
			this._uiViewController.addEventListener(UserInterfaceViewController.DENOM_BUTTON_CLICK, onDenomClick, this);
			this._uiViewController.addEventListener(JackpotBoxes.JACKPOT_BLINK_COMPLETE, onJackpotBlinkComplete, this);
			this._uiViewController.addEventListener(UserInterfaceView.WIN_MONEY_ANIMATED, onWinMoneyAnimationComplete, this);

			if(settings.customResult)
				this._customResultViewController = new CustomResultViewController();

			this.addChildViewController(this._uiViewController);
			this.addChildViewController(this._reelsViewController);

			if(this._customResultViewController)
				this.addChildViewController(this._customResultViewController);

			////////// FREESPIN ANIMATION TEST ///////////////
			// createFreespinAnimation.call(this);
			// this._freespinAnimationViewController.playStart();
			// this._freespinAnimationViewController.playIntro();
			// this._freespinAnimationViewController.playRetrigger();
			// this._freespinAnimationViewController.playOutro();
			// return;
			///////////////////////////////////////////////////

			if(this._soundPopUp)
				this._view.addChild(this._soundPopUp);

			// process the currentState
			this._uiViewController.setGameNumber(currentState.gameNumber == -1 ? 0 : currentState.gameNumber);
			settings.processingSubscribe = true;
			var initialStateMachineContextState = StateMachineContext.STATE_IDLE;
			if (currentState.state == BaseMessage.STATE_IDLE)
				settings.serverMessage = new CollectMessage(currentState.state);
			else if (currentState.state == BaseMessage.STATE_GAMBLE)
			{
				initialStateMachineContextState = currentState.gamblesUsed == 0 ? StateMachineContext.STATE_WIN : StateMachineContext.STATE_GAMBLE;
				settings.serverMessage = new SpinMessage(currentState.reels, currentState.lines, currentState.scatters, currentState.expand, currentState.winAmount,
														 currentState.gambleAttemptsLeft, currentState.jackpot, currentState.freeSpins, null, currentState.freespinScatters, currentState.gameNumber, currentState.state);
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_WIN, true);
				this._uiViewController.setWinMoney(currentState.winAmount, false);
				settings.historyCards = currentState.previousGambles.slice();

				if (currentState.gamblesUsed == 0)
				{
					// no gambles have been used so the gamble screen should not bet opened initially
					startVideos.call(this);
				}
					
				else
				{
					this.showGamble(false);
					settings.serverMessage = new GambleMessage(currentState.previousGambles[0], currentState.winAmount, currentState.gambleAttemptsLeft, currentState.jackpot, currentState.state);
				}

			}
			else if (currentState.state == BaseMessage.STATE_FREESPIN)
			{
				initialStateMachineContextState = StateMachineContext.STATE_WIN;
				settings.serverMessage = new SpinMessage(currentState.reels, currentState.lines, currentState.scatters, currentState.expand, currentState.winAmount,
														 currentState.gambleAttemptsLeft, currentState.jackpot, currentState.freespinsUsed == 0 ? currentState.freeSpins : 0, currentState.freeSpinsPerLine,
														 currentState.freespinScatters, currentState.gameNumber, currentState.state);
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_FREESPINS_START);
				this._uiViewController.setWinMoney(currentState.winAmount, false);
				this._reelsViewController.setFreespinFakeReels();

				if (currentState.firstSpin && settings.restoreReels)
					this._freespinsSpinMessage = new SpinMessage(
																currentState.firstSpin.reels.slice(), 
																currentState.firstSpin.lines ? currentState.firstSpin.lines.slice() : currentState.firstSpin.combos.slice(), 
																currentState.firstSpin.scatters.slice(), 
																currentState.firstSpin.expand.slice(), 
																0, 0, false, 0, null, [], 0, ""
																);

				if (currentState.freespinsUsed == 0)
					startVideos.call(this);
			}
			else if (currentState.state == BaseMessage.STATE_JACKPOT)
			{
				initialStateMachineContextState = StateMachineContext.STATE_JACKPOT;
				settings.serverMessage = new CollectMessage(BaseMessage.STATE_JACKPOT);
				this._jackpotMusicSoundChannel = SoundManager.getInstance().play("jackpotBackgroundSound", true);
				this._jackpotMusicRequested = !this._jackpotMusicSoundChannel;
				this.showJackpot(currentState.jackpotGameState);
			}

			// create the state machine context
			this._stateMachineContext = new StateMachineContext(initialStateMachineContextState, this);

			this._view.addEventListener(Event.ADDED_TO_STAGE, onViewAddedToStage, this);

			var rvc = this._reelsViewController;
			(function animloop() {
				rvc.newFrame(1);
				requestAnimFrame(animloop, {});
			})();

			// HACK !!!! force a change on the screen because older iPads will not render the background and other images
			// unless a change on the screen occurs
			var self = this;
			setTimeout(function()
			{
				self._uiViewController.setBalanceMoney(settings.balance);
			},0);
		},

		bet: function()
		{
			var settings = GameSettings.getInstance();
			return settings.betValues[settings.currBetIndex]*settings.denominations[settings.currDenominationIndex][0]*(settings.lineGame ? settings.linesCountConfig[settings.currLineIndex] : settings.comboCoeficients[settings.currLineIndex]);
		},

		getWinMoneyAnimating: function() { return this._uiViewController.getWinMoneyAnimating(); },

		spinReceived: function()
		{
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;

			if(this._totalsInfoView)
			{
				this._totalsInfoView.updateTotalBet(settings.totalBet);
			}

			// if this response starts freespins save this message so we can restore the
			// the screen that started the freespins after they are played

			if (spinMessage.freeSpins && !this._freespinsSpinMessage && settings.restoreReels)
			{
				this._freespinsSpinMessage = new SpinMessage(
															spinMessage.reels, 
															spinMessage.lines, 
															spinMessage.scatters, 
															spinMessage.expand, 
															0, 0, false, 0, null, [], 0, "");
			}

			this._uiViewController.setGameNumber(spinMessage.gameNumber);
			// if freespins should be played stop the autoplay
			if (settings.autoplayGame &&
				(spinMessage.freeSpins || spinMessage.jackpot || settings.remainingAutoplays == 0))
			{
				if (spinMessage.jackpot && spinMessage.state != BaseMessage.STATE_JACKPOT && spinMessage.state != BaseMessage.STATE_FREESPIN)
					this._startJackpotAfterWinMoneyAnimation = true;
				onAutoplayStopClick.call(this);
			}

			// tell the reels to start stopping
			this._reelsViewController.resultReceived();
		},

		collectReceived: function()
		{
			this._collectReceived = true;

			setTotalsInfo.call(this);

			if (this._stateMachineContext.getState() == StateMachineContext.STATE_JACKPOT)
			{
				if(!this.getWinMoneyAnimating())
					this.showJackpot();

				return;
			}

			var settings = GameSettings.getInstance();

			if (this._startRequested)
			{
				this._startRequested = false;

				if (settings.balance < this.bet())
				{
					this.setTerminalInsufficientBalanceVisualState();
					return;
				}
				else
					this._uiViewController.setBalanceMoney(settings.balance - this.bet());

				if(settings.customResult)
				{
					var result = this._customResultViewController.getResult();
					if (result != null && settings.balance >= this.bet())
					{
						this._stateMachineContext.setResult();
						this._startRequested = true;
					}
					else
					{
						this._stateMachineContext.spin();
					}
				}
				else
					this._stateMachineContext.spin();
			}
			else if(this._uiViewController.getUIState() != UserInterfaceViewController.STATE_INSUFFICIENT_FUNDS)
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_IDLE);
		},

		gambleReceived: function()
		{
			if (!this._gambleViewController)
			{
				throw "Gamble result received but the gamble view is not open!";
				return;
			}

			this._gambleViewController.setResult();

			var message = GameSettings.getInstance().serverMessage;
			this._uiViewController.setWinMoney(message.winAmount, true, 1);
		},

		jackpotReceived: function()
		{
			if (!this._jackpotViewController)
			{
				throw ("Jackpot result received but the jackpot view is not open!");
				return;
			}

			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;

			if (message.winLevel != -1)
			{
				var jackpotValues = settings.jackpotValues.slice();
				jackpotValues[message.winLevel] = message.winAmount;
				var updated = [false, false, false, false];
				updated[message.winLevel] = true;
				this._uiViewController.stopJackpotBlink(message.winLevel);
				this._uiViewController.setJackpotValues(jackpotValues, updated);
				this._uiViewController.freezeJackpotValue(message.winLevel);
			}

			this._jackpotViewController.setResult();
		},

		customResultReceived: function()
		{
			if (this._startRequested)
			{
				var settings = GameSettings.getInstance();
				if(!settings.freespinGame)
					this._uiViewController.setBalanceMoney(settings.balance - this.bet());
				this._startRequested = false;
				this._stateMachineContext.spin();
			}
		},

		sendSpin: function()
		{
			var settings = GameSettings.getInstance();
			this.dispatchEvent(new Event(SlotEngineMain.SPIN,
			{
				bet:settings.betValues[settings.currBetIndex]*settings.denominations[settings.currDenominationIndex][0],
				denomination:settings.denominations[settings.currDenominationIndex][0], lines:settings.lineGame ? settings.linesCountConfig[settings.currLineIndex] : settings.comboCoeficients[settings.currLineIndex],
				bonus:settings.freespinGame, gameCommand:BaseMessage.COMMAND_SPIN
			}));
		},

		sendCollect: function()
		{
			this._collectReceived = false;
			this.dispatchEvent(new Event(SlotEngineMain.COLLECT, {gameCommand:BaseMessage.COMMAND_COLLECT}));
		},

		sendGamble: function()
		{
			this.dispatchEvent(new Event(SlotEngineMain.GAMBLE, {gameCommand:BaseMessage.COMMAND_GAMBLE, color:GameSettings.getInstance().gambleChoice}));
		},

		sendJackpot: function()
		{
			this.dispatchEvent(new Event(SlotEngineMain.JACKPOT, {gameCommand:BaseMessage.COMMAND_JACKPOT, pos:this._jackpotViewController.getCardPos()}));
		},

		sendCustomResult: function()
		{
			var settings = GameSettings.getInstance();
			if (settings.customResult)
			{
				var bet = this._customResultViewController.getResult();
				if (bet)
					bet.gameCommand = BaseMessage.COMMAND_SET_RESULT;
				this.dispatchEvent(new Event(SlotEngineMain.SET_RESULT, bet));
			}
			else
				throw "Trying to set custom result but \"customResult\" flag is set to false!";
		},

		setIdleVisualState: function()
		{
			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;
			var winAmount = message.state == BaseMessage.STATE_GAMBLE ? message.winAmount : 0;

			this._uiViewController.setUIState(UserInterfaceViewController.STATE_IDLE);
			// in freespins the win should be accumulated from all spins
			if (!settings.freespinGame)
			{
				this._uiViewController.setBalanceMoney(settings.balance+winAmount, true, 1);
				this._uiViewController.setWinMoney(0, true, 1);

				setTotalsInfo.call(this);
			}
			stopWinVisualization.call(this);
			stopVideos.call(this);
		},

		setInsufficientBalanceVisualState: function()
		{
			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;
			var winAmount = message.state == BaseMessage.STATE_GAMBLE ? message.winAmount : 0;

			this._uiViewController.setUIState(UserInterfaceViewController.STATE_INSUFFICIENT_FUNDS);
			this._uiViewController.setBalanceMoney(settings.balance+winAmount);
			this._uiViewController.setWinMoney(0, false);

			setTotalsInfo.call(this);

			stopWinVisualization.call(this);
			stopVideos.call(this);

			this._startRequested = false;
		},

		setTerminalInsufficientBalanceVisualState: function()
		{
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_TERMINAL_INSUFFICIENT_FUNDS);
			this._uiViewController.setBalanceMoney(GameSettings.getInstance().balance);

			setTotalsInfo.call(this);
		},

		setWaitingForSpinResultVisualState: function()
		{
			if (this._reelsViewController.getReelsRotating())
				return;

			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;
			var winAmount = message.state == BaseMessage.STATE_GAMBLE ? message.winAmount : 0;

			// if we are in autoplay game and the autoplay count is limited
			// (remainingAutoplays > 0), decrease the remainingAutoplays
			if (settings.autoplayGame && settings.remainingAutoplays > 0)
				settings.remainingAutoplays--;

			this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_SPIN_RESULT);
			if (!settings.freespinGame)
			{
				this._uiViewController.setBalanceMoney((settings.balance + winAmount) - this.bet());
				this._uiViewController.setWinMoney(0, false);

				setTotalsInfo.call(this);
			}
			else
			{
				if (this._freespinMusicSoundChannel)
					this._freespinMusicSoundChannel.volume.gain.value = 1;
				settings.currFreespin++;
				this._uiViewController.updateFreespins();
			}
			stopWinVisualization.call(this);
			stopVideos.call(this, false);
			//hidePaytable();
			this._reelsViewController.start();
		},

		setWaitingForCollectVisualState: function()
		{
			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;
			var winAmount = message.state == BaseMessage.STATE_GAMBLE ? message.winAmount : 0;

			this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_COLLECT);
			// in freespins the win should be accumulated from all spins
			if (!settings.freespinGame)
			{
				this._uiViewController.setBalanceMoney(settings.balance+winAmount, true, 1);
				this._uiViewController.setWinMoney(0, true, 1);
			}
			stopWinVisualization.call(this);
			stopVideos.call(this);
		},

		setWaitingForGambleResultVisualState: function()
		{
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_GAMBLE_RESULT);
		},

		setBalance: function()
		{
			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;
			if (message.state == BaseMessage.STATE_IDLE || message.state == BaseMessage.STATE_JACKPOT)
				this._uiViewController.setBalanceMoney(settings.balance - message.winAmount);
			else
				this._uiViewController.setBalanceMoney(settings.balance);
		},

		onServerResponse: function() { this._stateMachineContext.onResult(); },
		onSlideEvent: function(event)
		{
			if(this._soundPopUp)
				return;

			if(event.type == "start")
			{
				if(event.direction == "up" && this._customResultViewController && !this._paytableViewController)
					this._customResultViewController.toggleShowHide();
			}
			else if(event.type == "move")
			{
			}
			else if(event.type == "end")
			{
			}
			//else if(event.direction == "left" && _settingsViewController)
				//hideSettings();
			//else if(event.direction == "left")
				//createPaytable();
		},

		onJackpotValuesUpdated: function(winLevel, screenName, winAmount)
		{
			var values = GameSettings.getInstance().jackpotValues.slice();
			console.log("j1: " + values[0] + " j2: " + values[1] + " j3: " + values[2] + " j4: " + values[3]);
			var animated = [true, true, true, true];
			if (winLevel != -1)
			{
				animated[winLevel] = false;
				values[winLevel] = winAmount;
				this._uiViewController.stopJackpotBlink(winLevel);
				this._uiViewController.setJackpotValues(values, [true, true, true, true], animated, 5.3);
				this._uiViewController.setJackpotWinScreenName(winLevel, screenName);
			}
			else
				this._uiViewController.setJackpotValues(values, [true, true, true, true], animated, 5.3);
		},

		onResponsibleGamingEvent: function(msg)
		{
			var settings = GameSettings.getInstance();

			if (settings.autoplayGame)
				onAutoplayStopClick.call(this);
		},

		onResponsibleGamingCompleteEvent: function()
		{

		},

		onLostConnection: function()
		{
			var settings = GameSettings.getInstance();

			this._lostConnection = true;
			this._uiViewController.setBalanceMoney(settings.balance);
			this._uiViewController.onLostConnection();
			if(this._winVisualizationViewController)
				this._winVisualizationViewController.onLostConnection();

			setTotalsInfo.call(this);
		},

		showGamble: function(withSound)
		{
			if(withSound == undefined)
				withSound = true;

			if (this._gambleViewController)
				return;

			if(withSound)
				SoundManager.getInstance().play("gambleOpenSound");

			this._gambleViewController = new GambleViewController();
			this._gambleViewController.addEventListener(GambleView.GAMBLE_RED_BLACK_BUTTON_CLICK, onRedBlackGambleClick, this);
			this._gambleViewController.addEventListener(GambleView.GAMBLE_RESULT_SHOWN, onGambleResultShown, this);
			this.addChildViewController(this._gambleViewController);

			this._uiViewController.setUIState(UserInterfaceViewController.STATE_GAMBLE);

			stopWinVisualization.call(this);
			stopVideos.call(this);
		},

		hideGamble: function()
		{
			if (!this._gambleViewController)
				return;

			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;

			setTotalsInfo.call(this);

			// if winAmount is != 0 then either all cards are guessed correctly or the collect button is pressed
			if (message.winAmount)
				SoundManager.getInstance().play("collectSound");

			this._gambleViewController.removeEventListener(GambleView.GAMBLE_RED_BLACK_BUTTON_CLICK, onRedBlackGambleClick, this);
			this._gambleViewController.removeEventListener(GambleView.GAMBLE_RESULT_SHOWN, onGambleResultShown, this);
			this.removeChildViewController(this._gambleViewController);
			this._gambleViewController.dispose();
			this._gambleViewController = null;

			var winAmount = message.state == BaseMessage.STATE_GAMBLE ? message.winAmount : 0;
			var setMoneyWithAnimation = (settings.balance + winAmount) > this._uiViewController.balanceMoney();
			this._uiViewController.setBalanceMoney(settings.balance + winAmount, setMoneyWithAnimation, 1);
			this._uiViewController.setWinMoney(0, setMoneyWithAnimation, 1);

			if (message.jackpot)
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_JACKPOT_TRANSITION);
			else
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_IDLE);
		},

		showJackpot: function(jackpotGameState)
		{
			if(this._jackpotViewController)
				return;

			setTotalsInfo.call(this);

			var animated = false;
			if(jackpotGameState == undefined)
			{
				animated = true;
				jackpotGameState = {};
			}
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_JACKPOT_TRANSITION);

			this._jackpotViewController = new JackpotViewController(jackpotGameState, animated);
			this._jackpotViewController.addEventListener(JackpotView.JACKPOT_SHOWN, onJackpotShown, this);
			this._jackpotViewController.addEventListener(JackpotView.JACKPOT_CARD_CLICK, onJackpotCardClick, this);
			this._jackpotViewController.addEventListener(JackpotViewController.JACKPOT_RESULT_SHOWN, onJackpotResultShown, this);
			this.addChildViewController(this._jackpotViewController);

			this._jackpotViewController.show();

			this._uiViewController.setBalanceMoney(GameSettings.getInstance().balance);
			this._uiViewController.setWinMoney(0, false);

			stopWinVisualization.call(this);
		},

		hideJackpot: function()
		{
			if(!this._jackpotViewController)
				return;

			setTotalsInfo.call(this);

			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;

			//_jackpotWinSoundChannel = Utils.stopSound(_jackpotWinSoundChannel);

			this.removeChildViewController(this._jackpotViewController);
			this._jackpotViewController.removeEventListener(JackpotView.JACKPOT_SHOWN, onJackpotShown, this);
			this._jackpotViewController.removeEventListener(JackpotView.JACKPOT_CARD_CLICK, onJackpotCardClick, this);
			this._jackpotViewController.removeEventListener(JackpotViewController.JACKPOT_RESULT_SHOWN, onJackpotResultShown, this);
			this._jackpotViewController.dispose();
			this._jackpotViewController = null;

			this._uiViewController.setUIState(UserInterfaceViewController.STATE_IDLE);
			this._uiViewController.freezeJackpotValue( -1);
			var updated = [false, false, false, false];
			updated[message.winLevel] = true;
			this._uiViewController.setJackpotValues(settings.jackpotValues, updated);
		}

		// TODO: add dispose and see what the memory guidlines are for javascirpt
	};

	// PRIVATE METHODS

	function startWinVisualization()
	{
		if (this._winVisualizationViewController)
			return;

		this._winVisualizationViewController = new WinVisualizationViewController();
		this.addChildViewController(this._winVisualizationViewController);
		this._winVisualizationViewController.addEventListener(WinVisualizationViewController.ENTER_FREESPINS_SCENARIO_COMPLETE, onEnterFreespinsScenarioComplete, this);

		this._winVisualizationViewController.start();
		if(this._lostConnection)
			this._winVisualizationViewController.onLostConnection();
	}

	function stopWinVisualization()
	{
		if (!this._winVisualizationViewController)
			return;

		this._winVisualizationViewController.removeEventListener(WinVisualizationViewController.ENTER_FREESPINS_SCENARIO_COMPLETE, onEnterFreespinsScenarioComplete, this);

		this.removeChildViewController(this._winVisualizationViewController);
		this._winVisualizationViewController.dispose();
		this._winVisualizationViewController = null;
	}

	function createFreespinAnimation()
	{
		if (this._freespinAnimationViewController)
			return;

		var settings = GameSettings.getInstance();

		this._freespinAnimationViewController = new FreespinAnimationViewController();
		this._freespinAnimationViewController.addEventListener(FreespinAnimationViewController.START_PRESSED, onFSStartPressed, this);
		this._freespinAnimationViewController.addEventListener(FreespinAnimationViewController.REFRESH_SCREEN, onFSRefreshScreen, this);
		this._freespinAnimationViewController.addEventListener(FreespinAnimationViewController.INTRO_ENDED, onFSIntroEnded, this);
		this._freespinAnimationViewController.addEventListener(FreespinAnimationViewController.RETRIGGER_ENDED, onFSRetriggerEnded, this);
		this._freespinAnimationViewController.addEventListener(FreespinAnimationViewController.OUTRO_ENDED, onFSOutroEnded, this);

		this.addChildViewController(this._freespinAnimationViewController);
	}

	function destroyFreespinAnimation()
	{
		if (!this._freespinAnimationViewController)
			return;

		this.removeChildViewController(this._freespinAnimationViewController);
		this._freespinAnimationViewController.removeEventListener(FreespinAnimationViewController.START_PRESSED, onFSStartPressed, this);
		this._freespinAnimationViewController.removeEventListener(FreespinAnimationViewController.REFRESH_SCREEN, onFSRefreshScreen, this);
		this._freespinAnimationViewController.removeEventListener(FreespinAnimationViewController.INTRO_ENDED, onFSIntroEnded, this);
		this._freespinAnimationViewController.removeEventListener(FreespinAnimationViewController.RETRIGGER_ENDED, onFSRetriggerEnded, this);
		this._freespinAnimationViewController.removeEventListener(FreespinAnimationViewController.OUTRO_ENDED, onFSOutroEnded, this);
		this._freespinAnimationViewController.dispose();
		this._freespinAnimationViewController = null;
	}
	/**
	 * Checks for the end of the freespins
	 */
	function checkForFreespinEnd()
	{
		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;
		if (!settings.freespinGame)
			return;

		if (settings.currFreespin == settings.totalFreespins)
		{
			// the freespins has ended, create the freespins animation and start the outro part of the animation
			settings.freespinGame = false;
			settings.currFreespin = 0;
			settings.totalFreespins = 0;
			if (this._winVisualizationViewController)
				this._winVisualizationViewController.stopWinSound();
			createFreespinAnimation.call(this);
			SoundManager.getInstance().stop(this._freespinMusicSoundChannel);
			this._freespinAnimationViewController.setValueText(spinMessage.winAmount);
			this._freespinAnimationViewController.playOutro();
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_FREESPINS_ANIMATION);
			this._reelsViewController.setMainFakeReels();
		}
	}

	function startVideos()
	{
		if (this._videoViewController)
			return;

		this._videoViewController = new VideoViewController();
		this.addChildViewController(this._videoViewController);
		this._videoViewController.addEventListener(VideoViewController.EXPAND_COMPLETE, onExpandComplete, this);
		this._videoViewController.addEventListener(VideoViewController.CLEAR_CELLS, onClearCells, this);

		this._videoViewController.start();
	}

	function stopVideos(redrawReels)
	{
		if (!this._videoViewController)
			return;

		if(redrawReels == undefined)
			redrawReels = true;

		this._videoViewController.removeEventListener(VideoViewController.EXPAND_COMPLETE, onExpandComplete, this);
		this._videoViewController.removeEventListener(VideoViewController.CLEAR_CELLS, onClearCells, this);
		this.removeChildViewController(this._videoViewController);
		this._videoViewController.dispose();
		this._videoViewController = null;

		if (redrawReels && GameSettings.getInstance().transparentReels)
			this._reelsViewController.redrawReels();
	}

	function onHomeClick() {  window.location = "../../../../" }

	function onClearCells(event)
	{
		if(GameSettings.getInstance().transparentReels)
			this._reelsViewController.clearReels(event.data.cells);
	}

	function showSettings(animated)
	{
		if(this._settingsViewController)
			return;

		this._settingsViewController = new SettingsViewController(animated);
		this._settingsViewController.addEventListener(SettingsView.BET_BUTTON_CLICK, onBetChanged, this);
		this._settingsViewController.addEventListener(SettingsView.DENOM_BUTTON_CLICK, onDenominationChanged, this);
		this._settingsViewController.addEventListener(SettingsView.LINE_BUTTON_CLICK, onLinesChanged, this);
		this._settingsViewController.addEventListener(SettingsView.PAYTABLE_BUTTON_CLICK, onPaytableButtonClick, this);
		this._settingsViewController.addEventListener(SettingsView.SETTINGS_SHOWN, onSettingsShown, this);
		this._settingsViewController.addEventListener(SettingsView.SETTINGS_HIDDEN, onSettingsHidden, this);
		this.addChildViewController(this._settingsViewController);

		this._uiViewController.setUIState(UserInterfaceViewController.STATE_SETTINGS_PAYTABLE);
		this._uiViewController.setZIndexesForSettingsShown();
	}

	function createPaytable()
	{
		if(this._paytableViewController)
			return;

		this._paytableViewController = new PaytableViewController();
		this._paytableViewController.addEventListener(PaytableView.SETTINGS_BUTTON_CLICK, onSettingsFromPaytableClick, this);
		this._paytableViewController.addEventListener(PaytableView.PAYTABLE_SHOWN, onPaytableShown, this);
		this._paytableViewController.addEventListener(PaytableView.PAYTABLE_HIDDEN, onPaytableHidden, this);
		this.addChildViewController(this._paytableViewController);

		this._uiViewController.setUIState(UserInterfaceViewController.STATE_SETTINGS_PAYTABLE);
	}

	function destroyPaytable()
	{
		if(!this._paytableViewController)
			return;

		this._paytableViewController.removeEventListener(PaytableView.SETTINGS_BUTTON_CLICK, onSettingsFromPaytableClick, this);
		this._paytableViewController.removeEventListener(PaytableView.PAYTABLE_SHOWN, onPaytableShown, this);
		this._paytableViewController.removeEventListener(PaytableView.PAYTABLE_HIDDEN, onPaytableHidden, this);

		this.removeChildViewController(this._paytableViewController);
		this._paytableViewController.dispose();
		this._paytableViewController = null;
	}

	function putExpandInReels()
	{
		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;

		var len = spinMessage.expand.length;
		if (len > 0)
		{
			for (var i = 0; i < len; i += 2)
			{
				var col = spinMessage.expand[i];
				var row = spinMessage.expand[i + 1];
				spinMessage.reels[col * (settings.numReelCards + 2) + row + 1] = settings.wildIndex;
			}
			
			this._reelsViewController.setReels(spinMessage.reels);
		}
	}

	function setTotalsInfo()
	{
		var settings = GameSettings.getInstance();

		if (this._totalsInfoView)
		{
			this._totalsInfoView.updateTotalBet(settings.totalBet);
			this._totalsInfoView.updateTotalWin(settings.totalWin);
		}
	}

	function onSpinClick()
	{
		console.log("SPIN");

		if (this._lostConnection || this._reelsViewController.getReelsRotating())
			return;

		//if (_autoplayDelayTimer)
		//{
			//_autoplayDelayTimer.removeEventListener(TimerEvent.TIMER_COMPLETE, onAutoplayDelay);
			//_autoplayDelayTimer.stop();
			//_autoplayDelayTimer = null;
		//}

		var settings = GameSettings.getInstance();
		settings.processingSubscribe = false;
		settings.noSoundAndFastLineBlink = false;

		// if the freespin "PRESS START" screen is visible start the freespin intro screen
		if (!this._freespinsStartPressed && settings.freespinGame)
		{
			this._freespinsStartPressed = true;
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_FREESPINS_ANIMATION);
			this._freespinAnimationViewController.playIntro();
			return;
		}

		this._uiViewController.completeAnimations();

		if(!settings.autoplayGame && !settings.freespinGame)
			SoundManager.getInstance().play("spinSound");

		var message = settings.serverMessage;
		if(this._collectReceived)
		{
			if (message.jackpot && !settings.freespinGame)
			{
				// we have a jackpot game waiting to be played so send a collect message to the server
				// and then start the jackpot game
				this._stateMachineContext.collect();
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_JACKPOT_TRANSITION);
			}
			else
			{
				if(settings.customResult)
				{
					// if the custom result panel is present (only in debug mode)
					// check whether we should send a custom result to the server
					var result = this._customResultViewController.getResult();
					if (result != null && settings.balance >= this.bet() && (message.state == BaseMessage.STATE_IDLE || message.state == BaseMessage.STATE_FREESPIN))
					{
						this._stateMachineContext.setResult();
						this._startRequested = true;
					}
					else
					{
						if (message.state == BaseMessage.STATE_GAMBLE)
							this._startRequested = true;
						this._stateMachineContext.spin();
					}
				}
				else
				{
					// if we are in state "gamble" we should remember that the user chose to start a new game
					// and after the collect responce is received we should send a new bet request to the server
					if (message.state == BaseMessage.STATE_GAMBLE)
						this._startRequested = true;
					// when telling the state machine we want a new spin to be started it will first send a collect
					// request to the server if the state of the last message was "gamble"
					this._stateMachineContext.spin();
				}
			}
		}
		else
		{
			// we are still waiting for a collect responce, the collect request was invoked either
			// by changing the denomination, the number of lines or pressing collect while in the gamble game
			message = settings.serverMessage;

			if (settings.balance + message.winAmount >= this.bet())
			{
				this.setWaitingForSpinResultVisualState();
				this._startRequested = true;
			}
		}
	}

	function onStopClick()
	{
		console.log("STOP");
		this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_REELS_TO_STOP);
		this._reelsViewController.stopAll();
	}

	function onAutoplayStopClick()
	{
		var settings = GameSettings.getInstance();
		var message = settings.serverMessage;

		if(message.state != BaseMessage.STATE_FREESPIN && !message.jackpot)
			SoundManager.getInstance().play("stopAutoplaySound");

		if(this._autoplayDelayTimer)
		{
			clearTimeout(this._autoplayDelayTimer);
			this._autoplayDelayTimer = 0;
		}

		settings.autoplayGame = false;
		this._uiViewController.setUIState(this._uiViewController.getUIState(), settings.serverMessage.state == BaseMessage.STATE_GAMBLE);
	}

	function onCollectClick()
	{
		console.log("COLLECT CLICK");

		if (this._jackpotViewController)
		{
			var settings = GameSettings.getInstance();
			var setMoneyWithAnimation = settings.balance > this._uiViewController.balanceMoney();
			this._uiViewController.setWinMoney(0, setMoneyWithAnimation, 1);
			this._uiViewController.setBalanceMoney(settings.balance, setMoneyWithAnimation, 1);

			var soundManager = SoundManager.getInstance();
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_JACKPOT_TRANSITION);
			this._jackpotComplete = true;
			this._jackpotWinSoundChannel = soundManager.stop(this._jackpotWinSoundChannel);
			this._jackpotWinSoundRequested = false;
			soundManager.play("collectSound");
		}
		else if (this._stateMachineContext.getState() == StateMachineContext.STATE_WIN)
		{
			if(this._uiViewController.getWinMoneyAnimating())
				this._uiViewController.completeAnimations();
			else
			{
				this._stateMachineContext.collect();
				SoundManager.getInstance().play("collectSound");
			}
		}
		else if (this._stateMachineContext.getState() == StateMachineContext.STATE_GAMBLE)
			this._stateMachineContext.collect();
		else if(this._stateMachineContext.getState() == StateMachineContext.STATE_IDLE)
		{
			// this will happen after freespins without gamble
			this.setIdleVisualState();
			SoundManager.getInstance().play("collectSound");
		}
	}

	function onGambleClick()
	{
		console.log("GAMBLE CLICK");
		this._stateMachineContext.gamble();
	}

	function onRedBlackGambleClick(event)
	{
		console.log("GAMBLE CHOICE", event.data.type);
		//_gambleViewController.buttonsEnabled = false;
		GameSettings.getInstance().gambleChoice = event.data.type;
		this._stateMachineContext.gamble();
	}

	function onJackpotCardClick() { this._stateMachineContext.jackpot(); }

	function onPaytableButtonClick()
	{
		var GameType = GameSettings.getInstance().gameType;
		createPaytable.call(this);
	}

	function onSettingsClick() { showSettings.call(this, true); }
	
	function onBetClick() {
		var settings = GameSettings.getInstance();
		
		settings.currBetIndex++;
		if(settings.currBetIndex >= settings.betValues.length)
			settings.currBetIndex = 0;
			
		this._uiViewController.setBetMoney(this.bet());
			
		SoundManager.getInstance().play("selectBetSound"+(settings.currBetIndex+1));
			
		if(this._settingsViewController != null)
			this._settingsViewController.updateSelectedBet();
	}
	
	function onDenomClick() {
		var settings = GameSettings.getInstance();
		
		settings.currDenominationIndex++;
		if(settings.currDenominationIndex >= settings.denominations.length)
			settings.currDenominationIndex = 0;

		this._uiViewController.setDenomination(settings.denominations[settings.currDenominationIndex][0]);
		this._uiViewController.setBetMoney(this.bet());
		
		SoundManager.getInstance().play("spinSound");
			
		if(this._settingsViewController != null)
			this._settingsViewController.updateSelectedDenomination();
	}
	
	function onSettingsFromPaytableClick()
	{
		showSettings.call(this, false);

		if(this._paytableViewController)
			destroyPaytable.call(this);
	}

	function onDenominationChanged()
	{
		var settings = GameSettings.getInstance();
		this._uiViewController.setDenomination(settings.denominations[settings.currDenominationIndex][0]);
		this._uiViewController.setBetMoney(this.bet());
	}

	function onBetChanged()
	{
		this._uiViewController.setBetMoney(this.bet());
	}

	function onLinesChanged()
	{
		this._uiViewController.setBetMoney(this.bet());
		this._uiViewController.setLines(GameSettings.getInstance().currLineIndex);
	}

	function onReelsStopped()
	{
		this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_EXPAND);

		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;

		if(SpinAnalyzer.getNumWins(spinMessage) > 0)
		{
			if(spinMessage.expand.length && !Loader.getLoader(settings.expandVideo.src).getData())
			{
				// no expand video is loaded yet so put the expand images in the reels immediately
				putExpandInReels.call(this);
			}
			startVideos.call(this);
		}
		else if (spinMessage.state == BaseMessage.STATE_JACKPOT && !settings.freespinGame && !this._lostConnection)
			this._stateMachineContext.jackpot();
		else
		{
			if(spinMessage.state == BaseMessage.STATE_IDLE)
				this._stateMachineContext.collect();
			checkForFreespinEnd.call(this);
			if (settings.freespinGame || settings.autoplayGame)
				onSpinClick.call(this);
		}
	}

	function onExpandComplete()
	{
		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;

		putExpandInReels.call(this);

		if (!settings.processingSubscribe && !settings.noSoundAndFastLineBlink)
		{
			if (spinMessage.freeSpins)
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_FREESPINS_TRANSITION);
			else
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_MONEY_ANIMATION, spinMessage.state == BaseMessage.STATE_GAMBLE && !settings.autoplayGame);
		}

		if(!settings.noSoundAndFastLineBlink)
			this._uiViewController.setWinMoney(spinMessage.winAmount, settings.processingSubscribe ? false : true, settings.processingSubscribe ? 0 : settings.autoplayGame ? 2 : 0);
		if (this._freespinMusicSoundChannel)
			this._freespinMusicSoundChannel.volume.gain.value = 0.1;
		startWinVisualization.call(this);
	}

	function onWinMoneyAnimationComplete()
	{
		console.log("MONEY COMPLETE");

		var settings = GameSettings.getInstance();

		if (this._stateMachineContext.getState() == StateMachineContext.STATE_WIN)
		{
			var spinMessage = settings.serverMessage;

			this._winVisualizationViewController.allowCreditAnimationSound = false;
			if (!spinMessage.freeSpins && !this._winVisualizationViewController.getCardSoundPlaying())
				this._winVisualizationViewController.stopWinSound();

			if (!settings.freespinGame && !spinMessage.freeSpins && !this._winVisualizationViewController.getCardSoundPlaying())
				SoundManager.getInstance().play("moneyAnimationEndSound");

			this._winVisualizationViewController.stopBlinkX2();
			//_winVisualizationViewController.stopCoinAnimation();

			if (spinMessage.state == BaseMessage.STATE_JACKPOT && !settings.freespinGame)
			{
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_JACKPOT_TRANSITION);
				stopVideos.call(this);
				stopWinVisualization.call(this);
				var self = this;
				this._jackpotWaitTimer = setTimeout(function()
				{
					self._jackpotWaitTimer = 0;

					if(!this._lostConnection)
						self._stateMachineContext.jackpot();
				}, 1000);
				return;
			}
			else if (this._startJackpotAfterWinMoneyAnimation)
			{
				this._startJackpotAfterWinMoneyAnimation = false;
				onSpinClick.call(this);
				return;
			}
			else if(!spinMessage.freeSpins)
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_WIN, spinMessage.state == BaseMessage.STATE_GAMBLE ? true : false);

			if (!spinMessage.freeSpins)
				checkForFreespinEnd.call(this);

			if (settings.autoplayGame)
			{
				//_uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_AUTOPLAY_DELAY);
				var self = this;
				this._autoplayDelayTimer = setTimeout(function() { onAutoplayDelay.call(self); }, 1000);
			}
			else if (!spinMessage.freeSpins && settings.freespinGame)
				onSpinClick.call(this);
		}
		else if(this._jackpotViewController)
		{
			if(!this._jackpotComplete)
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_JACKPOT_COLLECT_WAIT);
			else
			{
				this._jackpotComplete = false;
				this.hideJackpot();
			}
		}
		else if (this._stateMachineContext.getState() == StateMachineContext.STATE_JACKPOT)
		{
			if(!this._gambleViewController && !this._lostConnection)
				this.showJackpot();
		}
	}

	function onEnterFreespinsScenarioComplete(event)
	{
		console.log("COMPLETE");
		createFreespinAnimation.call(this);
		this._uiViewController.completeAnimations();
		SoundManager.getInstance().stop(this._freespinMusicSoundChannel);

		var settings = GameSettings.getInstance();
		var spinMessage = settings.serverMessage;

		if (!settings.freespinGame)
		{
			settings.freespinGame = true;
			settings.currFreespin = 0;
			settings.totalFreespins = spinMessage.freeSpins;
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_FREESPINS_START);
			this._reelsViewController.setFreespinFakeReels();
			this._freespinsStartPressed = false;
			this._freespinAnimationViewController.playStart();
		}
		else
		{
			settings.totalFreespins += spinMessage.freeSpins;
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_FREESPINS_ANIMATION);
			this._freespinAnimationViewController.playRetrigger();
		}
	}

	function onAutoplayDelay()
	{
		this._autoplayDelayTimer = 0;
		onSpinClick.call(this);
	}

	function onGambleResultShown()
	{
		if (this._stateMachineContext.getState() == StateMachineContext.STATE_GAMBLE)
			this._uiViewController.setUIState(UserInterfaceViewController.STATE_GAMBLE);
		else if (this._stateMachineContext.getState() == StateMachineContext.STATE_IDLE)
			this.hideGamble();
		else if(this._stateMachineContext.getState() == StateMachineContext.STATE_JACKPOT)
		{
			this.hideGamble();

			if(!this.getWinMoneyAnimating() && !this._lostConnection)
				this.showJackpot();
		}
	}

	function onJackpotBlinkComplete(event)
	{
		console.log("BLINK COMPLETE");
		var updated = [false, false, false, false];
		updated[event.data.index] = true;
		this._uiViewController.setJackpotValues(GameSettings.getInstance().jackpotValues, updated, [false, false, false, false]);
	}

	function onJackpotResultShown(event)
	{
		var settings = GameSettings.getInstance();
		var message = settings.serverMessage;

		if(message.winLevel == -1)
			return;

		var soundManager = SoundManager.getInstance();

		var moneyCountingTime;
		if (message.winLevel == 0)
			moneyCountingTime = JackpotView.LEVEL1_ANIMATION_TIME;
		else if (message.winLevel == 1)
			moneyCountingTime = JackpotView.LEVEL2_ANIMATION_TIME;
		else if (message.winLevel == 2)
			moneyCountingTime = JackpotView.LEVEL3_ANIMATION_TIME;
		else if (message.winLevel == 3)
			moneyCountingTime = JackpotView.LEVEL4_ANIMATION_TIME;

		this._uiViewController.setWinMoney(message.winAmount, true, moneyCountingTime);
		this._uiViewController.setUIState(UserInterfaceViewController.STATE_WAITING_FOR_JACKPOT_MONEY_ANIMATION);

		var jackpotValues = settings.jackpotValues.slice();
		jackpotValues[message.winLevel] = 0;
		var updated = [false, false, false, false];
		updated[message.winLevel] = true;
		var animating = [false, false, false, false];
		animating[message.winLevel] = true;
		this._uiViewController.freezeJackpotValue( -1);
		this._uiViewController.setJackpotValues(jackpotValues, updated, animating, moneyCountingTime);
		this._uiViewController.freezeJackpotValue(message.winLevel);

		this._jackpotMusicSoundChannel = soundManager.stop(this._jackpotMusicSoundChannel);
		this._jackpotMusicRequested = false;
		this._jackpotWinSoundChannel = soundManager.play("jackpotWinSound"+(message.winLevel+1), true);
		if(!this._jackpotWinSoundChannel)
			this._jackpotWinSoundRequested = "jackpotWinSound"+(message.winLevel+1);
	}

	function onSettingsShown() {}
	function onSettingsHidden()
	{
		this._settingsViewController.removeEventListener(SettingsView.BET_BUTTON_CLICK, onBetChanged, this);
		this._settingsViewController.removeEventListener(SettingsView.DENOM_BUTTON_CLICK, onDenominationChanged, this);
		this._settingsViewController.removeEventListener(SettingsView.LINE_BUTTON_CLICK, onLinesChanged, this);
		this._settingsViewController.removeEventListener(SettingsView.PAYTABLE_BUTTON_CLICK, onPaytableButtonClick, this);
		this._settingsViewController.removeEventListener(SettingsView.SETTINGS_SHOWN, onSettingsShown, this);
		this._settingsViewController.removeEventListener(SettingsView.SETTINGS_HIDDEN, onSettingsHidden, this);
		this.removeChildViewController(this._settingsViewController);
		this._settingsViewController.dispose();
		this._settingsViewController = null;

		this._uiViewController.setUIState(UserInterfaceViewController.STATE_IDLE);

		this._uiViewController.setZIndexesForSettingsHidden();

		if(GameSettings.getInstance().autoplayGame)
			onSpinClick.call(this);
	}

	function onPaytableShown()
	{
		if(this._settingsViewController)
		{
			this._settingsViewController.dispose();
			this._settingsViewController = null;

			this._uiViewController.setZIndexesForSettingsHidden();
		}
	}

	function onPaytableHidden()
	{
		destroyPaytable.call(this);

		this._uiViewController.setUIState(UserInterfaceViewController.STATE_IDLE);
	}

	function onJackpotShown()
	{
		this._uiViewController.setUIState(UserInterfaceViewController.STATE_JACKPOT);
		this._jackpotMusicSoundChannel = SoundManager.getInstance().play("jackpotBackgroundSound", true);
		this._jackpotMusicRequested = !this._jackpotMusicSoundChannel;
	}

	function onFSStartPressed(event) { onSpinClick.call(this); }
	function onFSRefreshScreen(event)
	{
		var settings = GameSettings.getInstance();
		if (settings.freespinGame)
		{
			stopWinVisualization.call(this);
			stopVideos.call(this);
			this._uiViewController.freespins(true);
		}
		else
		{
			this._uiViewController.freespins(false);

			if (this._freespinsSpinMessage)
			{
				stopWinVisualization.call(this);
				stopVideos.call(this, false);

				this._reelsViewController.setReels(this._freespinsSpinMessage.reels);
				var message = settings.serverMessage;

				message.reels = this._freespinsSpinMessage.reels.slice();
				message.lines = this._freespinsSpinMessage.lines.slice();
				message.scatters = this._freespinsSpinMessage.scatters.slice();
				message.expand = this._freespinsSpinMessage.expand.slice();

				if (message.state == BaseMessage.STATE_GAMBLE)
				{
					settings.noSoundAndFastLineBlink = true;
					startVideos.call(this);
				}else
					putExpandInReels.call(this);

				this._freespinsSpinMessage = null;
			}
		}
	}

	function onFSIntroEnded(event)
	{
		destroyFreespinAnimation.call(this);

		if (this._lostConnection)
			return;

		this._freespinMusicSoundChannel = SoundManager.getInstance().play("freeSpinsBackgroundSound",true);
		onSpinClick.call(this);
	}
	function onFSRetriggerEnded(event)
	{
		destroyFreespinAnimation.call(this);

		if (this._lostConnection)
			return;

		this._freespinMusicSoundChannel = SoundManager.getInstance().play("freeSpinsBackgroundSound",true);
		onSpinClick.call(this);
	}
	function onFSOutroEnded(event)
	{
		var spinMessage = GameSettings.getInstance().serverMessage;
		destroyFreespinAnimation.call(this);
		SoundManager.getInstance().stop(this._freespinMusicSoundChannel);

		if(spinMessage.state != BaseMessage.STATE_JACKPOT)
		{
			if(spinMessage.winAmount > 0)
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_WIN, spinMessage.state == BaseMessage.STATE_GAMBLE);
			else
				this._uiViewController.setUIState(UserInterfaceViewController.STATE_IDLE);
		}

		if (this._lostConnection)
			return;

		if (spinMessage.state == BaseMessage.STATE_JACKPOT)
			this._stateMachineContext.jackpot();
	}

	function onViewAddedToStage()
	{
		var settings = GameSettings.getInstance();

		if (this._currentState.state == BaseMessage.STATE_FREESPIN && this._currentState.freespinsUsed != 0)
		{
			settings.freespinGame = true;
			settings.currFreespin = this._currentState.freespinsUsed;
			settings.totalFreespins = this._currentState.freeSpins + this._currentState.freespinsUsed;
			this._uiViewController.freespins(true);
			this._freespinsStartPressed = true;
			this._freespinMusicSoundChannel = SoundManager.getInstance().play("freeSpinsBackgroundSound",true);
			onSpinClick.call(this);
		}
	}

	function onLoadSounds()
	{
		console.log("LOAD SOUNDS");

		this._soundPopUp.removeEventListener(PopUp.BUTTON1_CLICK, onLoadSounds, this);
		this._soundPopUp.removeEventListener(PopUp.BUTTON2_CLICK, onCancelSounds, this);

		this._soundPopUp.dispose();
		this._soundPopUp = null;

		var settings = GameSettings.getInstance();
		var soundManager = SoundManager.getInstance();

		soundManager.playDummySound(Loader.getLoader("sounds/dummy.mp3").getData());
		soundManager.loadAll();
		soundManager.toggleMute();
	}

	function onCancelSounds()
	{
		this._soundPopUp.removeEventListener(PopUp.BUTTON1_CLICK, onLoadSounds, this);
		this._soundPopUp.removeEventListener(PopUp.BUTTON2_CLICK, onCancelSounds, this);

		this._soundPopUp.dispose();
		this._soundPopUp = null;

		SoundManager.getInstance().playDummySound(Loader.getLoader("sounds/dummy.mp3").getData());
	}

	function onSoundLoaded(event)
	{
		if(event.data.soundIndex == 4)
		{
			var soundManager = SoundManager.getInstance();
			if(this._jackpotMusicRequested)
				this._jackpotMusicSoundChannel = soundManager.play("jackpotBackgroundSound", true);

			if(this._jackpotWinSoundRequested)
				this._jackpotWinSoundChannel = soundManager.play(this._jackpotWinSoundRequested, true);
		}
	}

	return p;
})());
