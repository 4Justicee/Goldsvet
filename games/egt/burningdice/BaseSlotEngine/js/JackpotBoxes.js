/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

//function JackpotBoxes(config)
//{

View("JackpotBoxes",
{
	JACKPOT_BLINK_COMPLETE: "jackpotBlinkComplete"
},
(function()
{
	var p = 
	{
		init: function(x, y, config)
		{
			this._config = config;
			this._jackpotFields;
			this._jackpotFieldsCanvas;
			this._jackpotFieldsParams = [{x: 206, width: 0, text: ""}, 
										 {x: 417, width: 0, text: ""}, 
										 {x: 827, width: 0, text: ""}, 
										 {x: 1074, width: 0, text: ""}];
			this._jackpotNames;
			this._jackpotBlinkTimers;
			this._jackpotBlinkTotalCount;
			this._jackpotBlinkCurrentCount;
			this._jackpotBlinking;
			this._jackpotTweens;
			this._jackpotTweensUpdateIntervals; // TODO: this is a temporary fix for the performance issues of android
												// when HTML text is changing frequently
			this._jackpotValues;
			this._jackpotFinalValues;
			
			this._super("jackpotBoxes", x, y);
			
			if(this._config.numberOfCents == undefined)
				this._config.numberOfCents = 2;
			
			this._jackpotValues = {jackpot1: 0, jackpot2: 0, jackpot3: 0, jackpot4: 0};
			this._jackpotFinalValues = [];
			this._jackpotFields = [];
			this._jackpotNames = [];
			this._jackpotTweens = [];
			
			this._jackpotTweensUpdateIntervals = [];
			this._jackpotBlinkTimers = [0, 0, 0, 0];
			this._jackpotBlinkTotalCount = [0, 0, 0, 0];
			this._jackpotBlinkCurrentCount = [0, 0, 0, 0];
			this._jackpotBlinking = [false, false, false, false];
			var currencyType = "";
			if(this._config.currency)
				currencyType = this._config.currencyType.charAt(0)+"</br>"+this._config.currencyType.charAt(1)+"</br>"+this._config.currencyType.charAt(2);
			var xCoordinates = [{field: 152, currency:269}, {field: 352, currency:489}, {field: 753, currency:910}, {field: 990, currency:1166}];
			for(var i = 0;i < 4;i++)
			{
				this._jackpotFields[i] = new TextView("textField jackpotField jackpot"+(i+1), "", xCoordinates[i].field, 13);
				this._jackpotNames[i] = new TextView("textField winnerName jackpot"+(i+1), "", xCoordinates[i].field, 1);
				this._jackpotNames[i].visible(false);
				
				this.addChildren(/*this._jackpotFields[i],*/ this._jackpotNames[i]);
				this.addChild(new TextView("jackpotCurrency jackpotCurrency"+(i+1), currencyType, xCoordinates[i].currency, 7));
			}
			
			this._jackpotFieldsCanvas = new CanvasView("", 0, 0);
			setCanvasParams.call(this);
			
			this.addChild(this._jackpotFieldsCanvas);
		},

		denomination: function(value)
		{
			if(value == undefined)
				return this._config.denomination;

			this._config.denomination = value;

			for(var i = 0;i < 4;i++)
				this.setJackpot(i, this._jackpotFinalValues[i]);
		},
		
		setJackpot: function(index, value)
		{
			if(this._config.numberOfCents == 0)
				value = Math.floor(value/100);
			
			if(this._jackpotTweens[index])
			{
				this._jackpotTweens[index].kill();
				this._jackpotTweens[index] = null;
			}
			
			var text;
			if(this._config.currency) 
			{
				text = Utils.formatNumber(value, Math.pow(10, this._config.numberOfCents), true);
				if(this._config.numberOfCents == 0)
					text = text.split(".")[0];
			}
			else
			{
				text = Utils.formatNumber(value, this._config.denomination);
			}
			//this._jackpotFields[index].setText(text);
			this._jackpotFieldsParams[index].text = text;
			clearJackpotField.call(this, index);
			drawJackpotField.call(this, index);
			this._jackpotFinalValues[index] = value;
			
			if(index == 0)
				this._jackpotValues.jackpot1 = value;
			else if(index == 1)
				this._jackpotValues.jackpot2 = value;
			else if(index == 2)
				this._jackpotValues.jackpot3 = value;
			else if(index == 3)
				this._jackpotValues.jackpot4 = value;
		},
		
		animateJackpot: function(value, index, time)
		{
			if (this._jackpotBlinking[index])
				return;

			this.setJackpot(index, value);
			return;
			
			if(this._config.numberOfCents == 0)
				value = Math.floor(value/100);
				
			this._jackpotFinalValues[index] = value;
			
			var tweenParams;
			if(this._jackpotTweens[index])
			{
				if(index == 0)
					tweenParams = {jackpot1: value};
				else if(index == 1)
					tweenParams = {jackpot2: value};
				else if(index == 2)
					tweenParams = {jackpot3: value};
				else if(index == 3)
					tweenParams = {jackpot4: value};
				this._jackpotTweensUpdateIntervals[index] = 0;
				this._jackpotTweens[index].updateTo(tweenParams, true);
				return;
			}

			if(index == 0)
				tweenParams = {jackpot1 : value};
			else if(index == 1)
				tweenParams = {jackpot2 : value};
			else if(index == 2)
				tweenParams = {jackpot3 : value};
			else if(index == 3)
				tweenParams = {jackpot4 : value};
			
			var self = this;
			tweenParams.ease = Linear.easeNone;
			tweenParams.roundProps = "jackpot"+(index+1);
			tweenParams.onCompleteParams = [index];
			tweenParams.onUpdateParams = [index];
			tweenParams.onComplete = function(index) { onTweenComplete.call(self, index); };
			tweenParams.onUpdate = function(index) { onTweenUpdate.call(self, index); };
			
			this._jackpotTweensUpdateIntervals[index] = 0;
			this._jackpotTweens[index] = TweenMax.to(this._jackpotValues, time, tweenParams);
		},
		
		completeJackpotAnimation: function(index) 
		{
			if(!this._jackpotTweens[index])
				return;
				
			this._jackpotTweens[index].kill();
			this._jackpotTweens[index] = null;
			
			// TODO: there should be a parameter in formatNumber to achieve this formatting
			var text = Utils.formatNumber(this._jackpotFinalValues[index], Math.pow(10, this._config.numberOfCents), true);
			if(this._config.numberOfCents == 0)
				text = text.split(".")[0];
			this._jackpotFields[index].setText(text);
		},
		
		setJackpotScreenName: function(index, name)
		{
			if (this._jackpotBlinkTimers[index])
			{
				clearInterval(this._jackpotBlinkTimers[index]);
				this._jackpotBlinkTimers[index] = 0;
				this._jackpotNames[index].visible(false);
				this._jackpotFields[index].visible(true);
				this._jackpotBlinking[index] = false;
			}
			
			if (!name || name == "")
				return;
			
			if (name.length > 10)
			{
				name = name.substr(0, 10);
				name += "...";
			}
			
			this._jackpotNames[index].setText(name);
			this._jackpotNames[index].visible(true);
			
			this._jackpotBlinking[index] = true;
			
			var self = this;
			this._jackpotBlinkTimers[index] = setInterval(function() { onJackpotBlinkTimer.call(self, index); }, 500);
			this._jackpotBlinkTotalCount[index] = 10;
			this._jackpotBlinkCurrentCount[index] = 0;
		},
		
		stopJackpotBlink: function(index)
		{
			if (!this._jackpotBlinkTimers[index])
				return;
			
			clearInterval(this._jackpotBlinkTimers[index]);
			this._jackpotBlinkTimers[index] = 0;
			this._jackpotNames[index].visible(false);
			this._jackpotFields[index].visible(true);
			this._jackpotBlinking[index] = false;
		}
	};
	
	function setCanvasParams()
	{
		this._jackpotFieldsCanvas.setSize(1280, 54);
		var context = this._jackpotFieldsCanvas.getContext2D();
		
		context.font = "26px arial";
		context.textAlign="center";
		context.textBaseline="top";
		context.fillStyle = "white";
	}
	
	function drawJackpotField(index, text)
	{
		var context = this._jackpotFieldsCanvas.getContext2D();
		
		context.fillText(this._jackpotFieldsParams[index].text, this._jackpotFieldsParams[index].x, 14);
		this._jackpotFieldsParams[index].width = context.measureText(this._jackpotFieldsParams[index].text).width;
	}
	
	function clearJackpotField(index)
	{
		var context = this._jackpotFieldsCanvas.getContext2D();
		var width = this._jackpotFieldsParams[index].width;
		context.clearRect(this._jackpotFieldsParams[index].x - width/2, 14, width, 26);
	}
	
	function onTweenComplete(index)
	{
		this._jackpotTweens[index].kill();
		this._jackpotTweens[index] = null;
	}
	
	function onTweenUpdate(index)
	{
		var updateInterval = Math.floor(this._jackpotTweens[index].time()/3);
		//if(this._jackpotTweensUpdateIntervals[index] == updateInterval && 
		   //this._jackpotTweens[index].time() !=  this._jackpotTweens[index].duration())
		//{
			//return;
		//}
		
		this._jackpotTweensUpdateIntervals[index] = updateInterval;
			
		var value;
		if(index == 0)
			value = this._jackpotValues.jackpot1;
		else if(index == 1)
			value = this._jackpotValues.jackpot2;
		else if(index == 2)
			value = this._jackpotValues.jackpot3;
		else if(index == 3)
			value = this._jackpotValues.jackpot4;
			
		var text = Utils.formatNumber(value, Math.pow(10, this._config.numberOfCents), true);
		if(this._config.numberOfCents == 0)
			text = text.split(".")[0];
		//this._jackpotFields[index].setText(text);
		this._jackpotFieldsParams[index].text = text;
		clearJackpotField.call(this, index);
		drawJackpotField.call(this, index);
	}
	
	function onJackpotBlinkTimer(index)
	{
		if (this._jackpotBlinking[index])
		{
			var jackpotNameVisible = this._jackpotNames[index].visible();
			this._jackpotNames[index].visible(!jackpotNameVisible);
			//this._jackpotFields[index].visible(!jackpotNameVisible);
			if(jackpotNameVisible)
				clearJackpotField.call(this, index);
			else
				drawJackpotField.call(this, index);
		}
		
		this._jackpotBlinkCurrentCount[index]++;
		if (this._jackpotBlinkCurrentCount[index] == this._jackpotBlinkTotalCount[index] && this._jackpotBlinkTotalCount[index] != 1)
		{
			this._jackpotBlinking[index] = false;
			this._jackpotBlinkTotalCount[index] = 1;
			this._jackpotBlinkCurrentCount[index] = 0;
			clearInterval(this._jackpotBlinkTimers[index]);
			var self = this;
			this._jackpotBlinkTimers[index] = setInterval(function() { onJackpotBlinkTimer.call(self, index); }, 10000);

			this.dispatchEvent(new Event(JackpotBoxes.JACKPOT_BLINK_COMPLETE, {index: index}));
		}
		else if (this._jackpotBlinkCurrentCount[index] == this._jackpotBlinkTotalCount[index] && this._jackpotBlinkTotalCount[index] == 1)
		{
			this._jackpotNames[index].visible(false);
			
			clearInterval(this._jackpotBlinkTimers[index]);
			this._jackpotBlinkTimers[index] = 0;
		}
	}
	
	return p;
})());