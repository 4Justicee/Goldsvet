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
			this._super("introAnimation", config);
		},
		_onComplete: function()
		{
			// this._sound = SoundManager.getInstance().play("introSound",false);
			this._super(0);
		},
		_dispose:function()
		{
			SoundManager.getInstance().stop(this._sound);
		}
	};
	
	return p;
})());