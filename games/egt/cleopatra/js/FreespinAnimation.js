View("FreespinAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			this._super();
			
			this._config = config;
			this._startAnimation = null;
			this._introAnimation = null;
			this._retriggerAnimation = null;
			this._outroAnimation = null;
			this._specialExpandAnimation = null;

			this._valueText = "";
			this._currency = "";
			
			this.setId("FreespinAnimation");
		},
		
		setValueText: function(text)
		{
			this._valueText = text;
		},
		goToPhase: function(phase)
		{
			stopAllAnimations.call(this);
			
			switch(phase)
			{
				case "intro":
					
					break;
				case "start":
					this._introAnimation = new IntroAnimation(this._config);
					this._introAnimation.addEventListener(CoreAnimation.INTRO_IN_ENDED, onIntroInEnded, this);
					this._introAnimation.addEventListener(CoreAnimation.ANIMATION_COMPLETE, introOutEnded, this);
					this.addChild(this._introAnimation);
					break;
				case "retrigger":
					this._retriggerAnimation = new RetriggerAnimation(this._config);
					this._retriggerAnimation.addEventListener(CoreAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
					this.addChild(this._retriggerAnimation);
					break;
				case "outro":
					this._outroAnimation = new OutroAnimation(this._config, this._valueText);
					this._outroAnimation.addEventListener(CoreAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
					this.addChild(this._outroAnimation);
					break;
				default:
					throw new Error("No freespin animation \" "+ phase + "\" supported");
			}
		},
		
		dispose: function()
		{
			stopAllAnimations.call(this);
			
			this._super();
		}
	};
	
	function stopAllAnimations()
	{
		if (this._retriggerAnimation)
		{
			this._retriggerAnimation.removeEventListener(CoreAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
			this.removeChild(this._retriggerAnimation);
			this._retriggerAnimation.dispose();
			this._retriggerAnimation = null;
		}
		if (this._outroAnimation)
		{
			this._outroAnimation.removeEventListener(CoreAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
			this.removeChild(this._outroAnimation);
			this._outroAnimation.dispose();
			this._outroAnimation = null;
		}
	}
	
	function onStartPressed(event)
	{
		this.removeChild(this._startAnimation);
		this._startAnimation.removeEventListener(MouseEvent.CLICK, onStartPressed, this);
		this._startAnimation.dispose();
		this._startAnimation = null;

		this._specialExpandAnimation = new SpecialExpandAnimation(this._config);
		this._specialExpandAnimation.addEventListener(CoreAnimation.ANIMATION_COMPLETE, onSpecialExpandAnimationComplete, this);
		this.addChild(this._specialExpandAnimation);

		this.dispatchEvent(new Event("startPressed"));
	}

	function onIntroInEnded(event)
	{
		this._startAnimation = new StartAnimation(this._config);
		this._startAnimation.addEventListener(MouseEvent.CLICK, onStartPressed, this);
		this.addChild(this._startAnimation);
	}

	function onSpecialExpandAnimationComplete(event)
	{
		this._introAnimation.startFadeOut();

		this.removeChild(this._specialExpandAnimation);
		this._specialExpandAnimation.removeEventListener(CoreAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
		this._specialExpandAnimation.dispose();
		this._specialExpandAnimation = null;
	}

	function introOutEnded(event)
	{
		this.removeChild(this._introAnimation);
		this._introAnimation.removeEventListener(CoreAnimation.INTRO_IN_ENDED, onIntroInEnded, this);
		this._introAnimation.removeEventListener(CoreAnimation.ANIMATION_COMPLETE, introOutEnded, this);
		this._introAnimation.dispose();
		this._introAnimation = null;

		this.dispatchEvent(new Event("introEnded"));
	}
	
	function onAnimationComplete(event)
	{
		if(event.target == this._retriggerAnimation)
			this.dispatchEvent(new Event("retriggerEnded"));
		else if(event.target == this._outroAnimation)
			this.dispatchEvent(new Event("outroEnded"));
	}
	
	return p;
})());