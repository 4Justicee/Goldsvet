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
			this._sound = SoundManager.getInstance().play("outroSound", false);
		},
		_onWaitingForFadeOut: function()
		{
			var self = this;
			setTimeout(function(){self.startFadeOut();}, 6500);
			this._super();
		},
		dispose:function()
		{
			SoundManager.getInstance().stop(this._sound);
		},


	};
	
	return p;
})());