CoreAnimation("IntroAnimation",
{

},
(function()
{
	var p = 
	{
		init: function(config)
		{
			this._config = config;
			this._sound;
			this._config.translations = FreeSpinTranslations[this._config.language].IntroAnimation;
			this._super("introInAnimation", config);
		},
		_onFadeInComplete: function()
		{
			var soundManager = SoundManager.getInstance();
			this._sound = soundManager.play("introSound", true);
			this._super();
		},
		_onWaitingForFadeOut: function()
		{
			this._super();
			this.dispatchEvent(new Event(CoreAnimation.INTRO_IN_ENDED));
		},
		dispose:function()
		{
			var soundManager = SoundManager.getInstance();
			SoundManager.getInstance().stop(this._sound);
		}
	};
	
	return p;
})());