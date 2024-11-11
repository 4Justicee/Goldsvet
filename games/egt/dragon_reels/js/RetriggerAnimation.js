DoorAnimation("RetriggerAnimation",
{
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._config = config;
			//console.log( "|---------------------------------------------------------------------------| " + this._config);
			this._config.translations = FreeSpinTranslations[this._config.language].RetriggerAnimation;
			this._super("retriggerAnimation", config);
			this._sound = SoundManager.getInstance().play("bonus_retrig",false);
		},
		_onFadeInComplete: function()
		{
			this._super(4800);
		},
		_dispose:function()
		{
			SoundManager.getInstance().stop(this._sound);
		}
	};

	return p;
})());
