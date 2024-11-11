CoreAnimation("RetriggerAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			this._config = config;
			this._config.translations = FreeSpinTranslations[this._config.language].RetriggerAnimation;
			this._super("retriggerAnimation", config);
			this._sound = SoundManager.getInstance().play("outroSound", false);
		},
		_onWaitingForFadeOut: function()
		{
			var self = this;
			setTimeout(function(){self.startFadeOut();}, 8500);
			this._super();
		},
		dispose:function()
		{
			SoundManager.getInstance().stop(this._sound);
		}
	};
	
	return p;
})());