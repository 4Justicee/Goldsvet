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
			this._config.translations = FreeSpinTranslations[this._config.language].IntroAnimation;
			this._super("introInAnimation", config);
			this._sound = SoundManager.getInstance().play("introSound", true);
		},
		_onFadeInComplete: function()
		{
			this._super();
		},
		_onWaitingForFadeOut: function()
		{
			this._super();
			this.dispatchEvent(new Event(CoreAnimation.INTRO_IN_ENDED));
		},
		dispose:function()
		{
			SoundManager.getInstance().stop(this._sound);
		}
	};
	
	return p;
})());