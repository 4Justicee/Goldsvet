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
			// console.log(FreeSpinTranslations[this._config.language])
			this._config.translations = FreeSpinTranslations[this._config.language].IntroAnimation;
			this._super("introAnimation", config);
			// this._sound = SoundManager.getInstance().play("introSound",false);

		},

		_onFadeInComplete: function()
		{
			var self = this;
			// this._super(3800);
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