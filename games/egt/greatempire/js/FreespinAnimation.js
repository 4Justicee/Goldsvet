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
			this._choiceAnimation = null;
			this._retriggerAnimation = null;
			this._outroAnimation = null;
			this._playChoiceAfterRetrigger = false;
			this._selectedItem;
			this._paramObject;

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
				case "start":
					this._startAnimation = new StartAnimation(this._config);
					this._startAnimation.addEventListener(MouseEvent.CLICK, onStartPressed, this);
					this.addChild(this._startAnimation);
					break;
				case "choice":
					this._choiceAnimation = new ChoiceAnimation(this._config);
					this._choiceAnimation.addEventListener(ChoiceAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
					this.addChild(this._choiceAnimation);
					break;
				case "outro":
					this._outroAnimation = new OutroAnimation(this._config, this._valueText);
					this._outroAnimation.addEventListener(OutroAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
					this.addChild(this._outroAnimation);
					break;
				default:
					throw new Error("No freespin animation \" "+ phase + "\" supported");
			}
		},
		setParams: function (obj)
		{
			this._paramObject = obj;
		},
		setPlayChoiceAfterRetrigger:function (enable)
		{
			this._playChoiceAfterRetrigger = enable;
		},
		choiceReceived:function ()
		{
			this._choiceAnimation.messageReceived(this._paramObject);
		},
		isStateChoice: function()
		{
			if (!this._choiseAnimation)
					return false;

			return this._choiceAnimation.isWaitingForUserAction();
		},
		getChoiceInt: function ()
		{
				return this._choiceAnimation.getSelectedItem();
		},
		dispose: function()
		{
			stopAllAnimations.call(this);
			
			this._super();
		}
	};
	
	function stopAllAnimations()
	{
		if (this._startAnimation)
		{
			this.removeChild(this._startAnimation);
			this._startAnimation.removeEventListener(MouseEvent.CLICK, onStartPressed, this);
			this._startAnimation.dispose();
			this._startAnimation = null;
		}
		if (this._choiceAnimation)
		{
			this._choiceAnimation.removeEventListener(ChoiceAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
			this.removeChild(this._choiceAnimation);
			this._choiceAnimation.dispose();
			this._choiceAnimation = null;
		}
		if (this._outroAnimation)
		{
			this._outroAnimation.removeEventListener(OutroAnimation.ANIMATION_COMPLETE, onAnimationComplete, this);
			this.removeChild(this._outroAnimation);
			this._outroAnimation.dispose();
			this._outroAnimation = null;
		}
	}
	
	function onStartPressed(event)
	{
		this.dispatchEvent(new Event("startPressed"));
	}
	
	function onAnimationComplete(event)
	{
		if(event.target == this._choiceAnimation)
			this.dispatchEvent(new Event("introEnded"));
		else if(event.target == this._outroAnimation)
			this.dispatchEvent(new Event("outroEnded"));
	}
	
	return p;
})());