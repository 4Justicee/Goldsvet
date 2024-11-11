DoorAnimation("IntroAnimation",
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

		_onFadeInComplete: function()
		{
			var self = this;
			self.dispatchEvent(new Event("refreshScreen"));
			setTimeout(function(){self._onFadeOutComplete();}, 200);
		},

		_dispose:function()
		{
			SoundManager.getInstance().stop(this._sound);
		}
	};
	
	return p;
})());