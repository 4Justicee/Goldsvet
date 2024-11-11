ViewController("FreespinAnimationViewController",
{
	INTRO_ENDED:"introEnded",
	RETRIGGER_ENDED:"retriggerEnded",
	OUTRO_ENDED:"outroEnded",
	REFRESH_SCREEN:"refreshScreen",
	START_PRESSED:"startPressed"
},
(function()
{
	var p = 
	{
		init: function()
		{
			this._super();
			
			var settings = GameSettings.getInstance();
			
			this._view = new FreespinAnimation({language: settings.currLanguage, currency:settings.currency, diamondPlay:settings.diamondPlay,currencyType:settings.currencyType,
												denomination: settings.denominations[settings.currDenominationIndex][0]});
			this._view.addEventListener(FreespinAnimationViewController.INTRO_ENDED, onEvent, this);
			this._view.addEventListener(FreespinAnimationViewController.RETRIGGER_ENDED, onEvent, this);
			this._view.addEventListener(FreespinAnimationViewController.OUTRO_ENDED, onEvent, this);
			this._view.addEventListener(FreespinAnimationViewController.REFRESH_SCREEN, onEvent, this);
			this._view.addEventListener(FreespinAnimationViewController.START_PRESSED, onEvent, this);
		},
		
		setValueText: function(valueTxt) { this._view.setValueText(valueTxt); },
		playStart: function() { this._view.goToPhase("start"); },
		playIntro: function() { this._view.goToPhase("intro"); },
		playRetrigger: function() { this._view.goToPhase("retrigger"); },
		playOutro: function() { this._view.goToPhase("outro"); },
		
		dispose: function()
		{
			this._view.removeEventListener(FreespinAnimationViewController.INTRO_ENDED, onEvent, this);
			this._view.removeEventListener(FreespinAnimationViewController.RETRIGGER_ENDED, onEvent, this);
			this._view.removeEventListener(FreespinAnimationViewController.OUTRO_ENDED, onEvent, this);
			this._view.removeEventListener(FreespinAnimationViewController.REFRESH_SCREEN, onEvent, this);
			this._view.removeEventListener(FreespinAnimationViewController.START_PRESSED, onEvent, this);
			
			this._view.dispose();
			
			this._super();
		}
	};
	
	function onEvent(event) { this.dispatchEvent(event); }
	
	return p;
})());