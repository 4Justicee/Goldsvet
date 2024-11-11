CoreAnimation("RetriggerAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			var soundManager = SoundManager.getInstance();
			this._config = config;
			this._config.translations = FreeSpinTranslations[this._config.language].RetriggerAnimation;
			this._super("retriggerAnimation", config);
			this._sound = soundManager.play("outroSound", false);
		},
		_onWaitingForFadeOut: function()
		{
			var self = this;
			setTimeout(function(){self.startFadeOut();}, 8500);
			this._super();
		},
		dispose:function()
		{
			var soundManager = SoundManager.getInstance();
			SoundManager.getInstance().stop(this._sound);
		}
	};
	
	return p;
})());