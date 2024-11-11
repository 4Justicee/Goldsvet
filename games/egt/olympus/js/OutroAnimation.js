CoreAnimation("OutroAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config, valueText)
		{
			var soundManager = SoundManager.getInstance();
			this._config = config;
			this._config.translations = FreeSpinTranslations[this._config.language].OutroAnimation;
			this._config.valueText = valueText;
			this._super("outroAnimation", config);
			this._sound = soundManager.play("outroSound", false);
		},
		_onWaitingForFadeOut: function()
		{
			var self = this;
			setTimeout(function(){self.startFadeOut();}, 6500);
			this._super();
		},
		dispose:function()
		{
			var soundManager = SoundManager.getInstance();
			SoundManager.getInstance().stop(this._sound);
		},


	};
	
	return p;
})());