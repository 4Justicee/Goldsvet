CoreAnimation("OutroAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config, valueText)
		{
			this._config = config;
			this._config.translations = FreeSpinTranslations[this._config.language].OutroAnimation;
			this._config.valueText = valueText;
			this._super("outroAnimation", config);
		},
		_onComplete: function()
		{
			this._sound = SoundManager.getInstance().play("outroSound",false);
			this._super(6500);
		},
		_dispose:function()
		{
			SoundManager.getInstance().stop(this.sound);
		},


	};
	
	return p;
})());