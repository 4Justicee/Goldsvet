DoorAnimation("OutroAnimation",
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
			this._super("outroAnimation",config);
			this._sound = SoundManager.getInstance().play("outroSound",false);
		},
		_onFadeInComplete: function()
		{
			this._super(6000);
		},
		_dispose:function()
		{
			SoundManager.getInstance().stop(this.sound);
		},


	};
	
	return p;
})());