/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("WinVisualizationViewController",
{
	ENTER_FREESPINS_SCENARIO_COMPLETE: "enterFreespinsScenarioComplete"
},
(function()
{
	var p =
	{
		init: function()
		{
			this._view;
			this._coinAnimation;
			this._winSoundChannel;
			this._freeSpinSoundEnded;
			this._lineAnimationCycleEnded;
			this._freespinScenarioComplete;
			this._lostConnection;
			this._cardSoundPlaying;
			
			this.allowCreditAnimationSound;
			
			this._super();
			
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;
	
			var linesViewConfig = new LinesViewConfig(settings.lines, settings.numReelCards, settings.numReels, settings.reelCoordX, settings.reelCoordY,
													  settings.reelWidth, settings.reelHeight, settings.reelSpacing);
			this._view = new WinVisualizationView(new WinVisualizationViewConfig(spinMessage.reels, spinMessage.lines, spinMessage.scatters, settings.wildIndex, null, 
											settings.denominations[settings.currDenominationIndex][0], settings.currency, settings.currencyType,
											null, settings.lineGame ? settings.localize("Line") : "", 
											linesViewConfig, settings.lineGame, settings.comboColors, null/*Resources.getInstance().x2*/));
			
			this._view.addEventListener(WinVisualizationView.CYCLE_COMPLETE, onCycleComplete, this);
			
			this._cardSoundPlaying = false;
			this._freespinScenarioComplete = false;
			this._lostConnection = false;
		},
		
		stopBlinkX2: function()
		{
			this._view.stopBlinkX2();
		},
		
		getCardSoundPlaying: function() { return this._cardSoundPlaying; },
		stopWinSound: function() { this._winSoundChannel = SoundManager.getInstance().stop(this._winSoundChannel); },
		
		start: function()
		{
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;
			var soundManager = SoundManager.getInstance();
			this._view.start(settings.noSoundAndFastLineBlink);
			
			if (settings.processingSubscribe)
			{
				this._lineAnimationCycleEnded = true;
				this._freeSpinSoundEnded = true;
				checkEnterFreespinsScenarionEnd.call(this);
			}
			else
			{
				this._lineAnimationCycleEnded = false;
				this._freeSpinSoundEnded = false;
			}
			
			this._cardSoundPlaying = false;
			this.allowCreditAnimationSound = true;
			
			if (!settings.processingSubscribe && !settings.noSoundAndFastLineBlink)
			{
				var snd = null;
				if (spinMessage.freeSpins)
				{
					var len = spinMessage.freeSpinScatters.length;
					for (var i = 0; i < len; i++)
					{
						var scatterConfig;
						var len2 = settings.scatterConfig.length;
						for (var j = 0; j < len2; j++)
							if (spinMessage.freeSpinScatters[i] == settings.scatterConfig[j].index)
							{
								scatterConfig = settings.scatterConfig[j];
								break;
							}
						if (scatterConfig && settings.freespinSounds)
						{
							// TODO: what if the sound is not yet loaded or we are playing without sound
							snd = settings.freespinSounds[scatterConfig.freespinsSoundIndex];
							break;
						}
					}
				}
				else
				{
					var fullLineCard = SpinAnalyzer.getFullLineCard(spinMessage);
					var strongestCard = SpinAnalyzer.getStrongestCard(spinMessage);
					
					if (fullLineCard != -1)
					{
						snd = null;
						var len = settings.winFullSounds.length;
						for(var i = 0;i < len;i++)
							if(settings.winFullSounds[i].card == fullLineCard)
							{
								snd = settings.winFullSounds[i].name;
								break;
							}
							
						if (!snd)
							snd = settings.winSounds[fullLineCard];
					}
					else
						snd = settings.winSounds[strongestCard];
						
					if (snd)
						this._cardSoundPlaying = true;
						
					//if (_coinAnimation)
					//{
						//snd = Resources.getInstance().coinAnimationSound;
						//_cardSoundPlaying = false;
					//}
				}
				
				var self = this;
				this._winSoundChannel = soundManager.play(snd, false, function() { onWinSoundComplete.call(self); });
			}
		},
		
		onLostConnection: function() { this._view.onLostConnection(); },
		
		dispose: function()
		{
			this._winSoundChannel = SoundManager.getInstance().stop(this._winSoundChannel);
			this._view.removeEventListener(WinVisualizationView.CYCLE_COMPLETE, onCycleComplete, this);

			this._super();
		}
	};
	
	function checkEnterFreespinsScenarionEnd()
	{
		var spinMessage = GameSettings.getInstance().serverMessage;
		
		if (spinMessage.freeSpins && !this._freespinScenarioComplete && this._lineAnimationCycleEnded && this._freeSpinSoundEnded)
		{
			this._freespinScenarioComplete = true;
			this.dispatchEvent(new Event(WinVisualizationViewController.ENTER_FREESPINS_SCENARIO_COMPLETE));
		}
	}
	
	function onCycleComplete() 
	{ 
		this._lineAnimationCycleEnded = true;
		checkEnterFreespinsScenarionEnd.call(this);
	}
	
	function onWinSoundComplete()
	{
		this._cardSoundPlaying = false;
		
		var spinMessage = GameSettings.getInstance().serverMessage;
		if (!spinMessage.freeSpins && this.allowCreditAnimationSound)
			this._winSoundChannel = SoundManager.getInstance().play("creditAnimationSound");
		else
		{
			this._freeSpinSoundEnded = true;
			checkEnterFreespinsScenarionEnd.call(this);
		}
	}
	
	return p;
})());