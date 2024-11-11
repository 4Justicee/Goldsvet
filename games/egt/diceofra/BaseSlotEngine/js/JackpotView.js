/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("JackpotView",
{
	CARD_WIDTH: 118,
	CARD_HEIGHT: 165,
	CARD_HSPACING: 29,
	CARD_VSPACING: 10,
	
	LEVEL1_ANIMATION_TIME: 4,
	LEVEL2_ANIMATION_TIME: 8,
	LEVEL3_ANIMATION_TIME: 12,
	LEVEL4_ANIMATION_TIME: 16,
	
	JACKPOT_SHOWN: "jackpotShown",
	JACKPOT_CARD_CLICK: "jackpotCardClick"
},
(function()
{
	var p =
	{
		init: function(config, jackpotGameState)
		{
			this._config = config;
			this._maskView = null;
			this._maskViewParams = {x: 561, width: 10};
			this._jackpotContentView = null;
			this._cards = [];
			this._smallSuites = [];
			this._suitesCount = [0, 0, 0, 0];
			this._lastClickedCard = -1;
			this._lights = [];
			this._prevLights = [];
			this._lightsAnimationTimer;
			this._suitesBlinkTimer;
			this._winCardType;
			
			this._super("jackpotView");
			
			this._maskView = new View("", this._maskViewParams.x, -26, true);
			this._maskView.setSize(this._maskViewParams.width, 564);
			
			this._jackpotContentView = new View("jackpotContentView", 73, 67, true);
			this._jackpotContentView.setSize(1133, 538);
			this._jackpotContentView.setMask(this._maskView);
			
			this._jackpotContentView.addChild(new View("jackpotGirl left", 30, 137));
			this._jackpotContentView.addChild(new View("jackpotGirl right", 888, 137));
			this._jackpotContentView.addChild(new View("jackpotOrnament", 15, 31));
			var jackpotOrnamentRight = new View("jackpotOrnament", 890, 31);
			jackpotOrnamentRight.setScale(-1, 1);
			this._jackpotContentView.addChild(jackpotOrnamentRight);
			
			var light1, light2;
			for(var i = 0;i < 14;i++)
			{
				light1 = new View("jackpotLights", 231, i*36);
				light2 = new View("jackpotLights", 838, i*36);
				this._lights[i*2] = light1;
				this._lights[i*2 + 1] = light2;

				this._jackpotContentView.addChildren(light1, light2);
			}
			
			for(var i = 0;i < 12;i++)
			{
				var col = i % 4;
				var row = Math.floor(i/4);
				var card = new JackpotCard(284 + col*(JackpotView.CARD_WIDTH+JackpotView.CARD_HSPACING), 8 + row*(JackpotView.CARD_HEIGHT+JackpotView.CARD_VSPACING));
				this._cards[i] = card;
				
				var type = Math.floor(i/3);
				var x = type == 0 ? 79 : type == 1 ? 288 : type == 2 ? 696 : 944;
				this._smallSuites[i] = new View("smallSuites", x + (i%3)*35, -26);
				this._smallSuites[i].addClass("inactive " + ("suite"+type));
				
				if (jackpotGameState[i] != undefined)
				{
					var cardType = Math.floor(jackpotGameState[i]/13);
					this._suitesCount[cardType]++;
					this._cards[i].setType(cardType);
				}
				else
					this._cards[i].addEventListener(MouseEvent.CLICK, onCardClick, this);
					
				this._jackpotContentView.addChildren(this._cards[i], this._smallSuites[i]);
			}
			
			for(var i = 0;i < 4;i++)
			{
				var len = this._suitesCount[i];
				for(var j = 0;j < len;j++)
					this._smallSuites[i*3 + j].addClass("active");
			}
		},
		
		show: function()
		{
			if(this._config.animated)
			{
                var jackpotCardsLogoTop = new View("jackpotCardsLogo top", 401, -20, true);
                var jackpotCardsLogoBottom = new View("jackpotCardsLogo bottom", 401, 4, true);
                jackpotCardsLogoTop.setScale(0.33, 0.33);
                jackpotCardsLogoBottom.setScale(0.33, 0.33);
                this.addChildren(jackpotCardsLogoTop, jackpotCardsLogoBottom);

				var self = this;
				TweenMax.to(jackpotCardsLogoTop.getInternalContainer(), 0.9, {scaleX: 1.1, scaleY: 1.1, x: 436, y: 245, ease: Back.easeIn});
				TweenMax.to(jackpotCardsLogoBottom.getInternalContainer(), 0.9, {scaleX: 1.1, scaleY: 1.1, x: 436, y: 355, ease: Back.easeIn, onComplete: function()
				{
					TweenMax.to(jackpotCardsLogoTop.getInternalContainer(), 1.2, {scaleX: 1.4, scaleY: 1.4, ease: Elastic.easeOut});
					TweenMax.to(jackpotCardsLogoBottom.getInternalContainer(), 1.2, {scaleX: 1.4, scaleY: 1.4, ease: Elastic.easeOut, onComplete: function()
					{
						TweenMax.to(jackpotCardsLogoTop.getInternalContainer(), 0.3, {delay: 1.6, x: 500, ease: Quad.easeOut});
						TweenMax.to(jackpotCardsLogoTop.getInternalContainer(), 0.3, {delay: 1.6, rotation: 90, y: 296, ease: Linear.easeNone});
						TweenMax.to(jackpotCardsLogoBottom.getInternalContainer(), 0.3, {delay: 1.6, x: 375, ease: Quad.easeOut});
						TweenMax.to(jackpotCardsLogoBottom.getInternalContainer(), 0.3, {delay: 1.6, rotation: 90, y: 294, ease: Linear.easeNone, onComplete: function()
						{
							self.addChild(self._jackpotContentView);
							self._lightsAnimationTimer = setInterval(function() { onLightsAnimationTimer.call(self); }, 350);
							TweenMax.to(self._maskViewParams, 0.2, {width: 1133, x: 0, roundProps: "width", ease: Linear.easeNone, onUpdate: function()
							{
								self._maskView.setPosition(self._maskViewParams.x, self._maskView.y());
								self._maskView.setSize(self._maskViewParams.width, self._maskView.getHeight());
								
							}, onComplete: function()
							{
								self.dispatchEvent(new Event(JackpotView.JACKPOT_SHOWN));
							}});
							TweenMax.to(jackpotCardsLogoTop.getInternalContainer(), 0.227, {x: 1133, ease: Linear.easeNone});
							TweenMax.to(jackpotCardsLogoBottom.getInternalContainer(), 0.227, {x: -258, ease: Linear.easeNone, onComplete: function()
							{
								self.removeChild(jackpotCardsLogoTop);
								self.removeChild(jackpotCardsLogoBottom);
							}});
						}});
					}});
				}});
			}
			else
			{
				this._maskView.setPosition(0, this._maskView.y());
				this._maskView.setSize(1133, this._maskView.getHeight());
				this.addChild(this._jackpotContentView);
				var self = this;
				this._lightsAnimationTimer = setInterval(function() { onLightsAnimationTimer.call(self); }, 350);
				this.dispatchEvent(new Event(JackpotView.JACKPOT_SHOWN));
			}
		},
		
		getCardPos: function() { return this._lastClickedCard; },
		
		setCard: function(card, finalCard, winLevel, winAmount)
		{
			if (this._lastClickedCard == -1)
			{
				throw "Trying to se jackpot card but the last clicked card is unknown!";
				return;
			}
			
			card = Math.floor(card/13);
			
			this._smallSuites[card*3 + this._suitesCount[card]].addClass("active");
			this._suitesCount[card]++;
			this._cards[this._lastClickedCard].setType(card);
			this._cards[this._lastClickedCard].highlight(false);

			if(finalCard)
				this._winCardType = card;
			else
				for(var i = 0;i < 12;i++)
					this._cards[i].enabled(true);	
		},
		
		startWinAnimation: function()
		{
			var self = this;
			this._suitesBlinkTimer = setInterval( function() { onSuitesBlinkTimer.call(self); }, 300);
			
			var closedCards = [];
			var len = this._cards.length;
			for(var i = 0;i < len;i++)
				if(this._cards[i].getType() == -1)
					closedCards.push(this._cards[i]);
					
			for (var i = 0; i < 4; i++)
			{
				len = 3 - this._suitesCount[i];
				for (var j = 0; j < len; j++)
				{
					var randomCardIndex = Math.round(Math.random() * (closedCards.length - 1));
					closedCards[randomCardIndex].setType(i);
					closedCards[randomCardIndex].darken();
					closedCards.splice(randomCardIndex, 1);
				}
			}
		},

		performClickOnCard: function(cardIndex)
		{
			if(this._cards[cardIndex].enabled())
			{
				this._cards[cardIndex].dispatchEvent(new MouseEvent(MouseEvent.CLICK));
			}
		},
		
		dispose: function()
		{
			stopLightsAnimation.call(this);
			clearInterval(this._suitesBlinkTimer);
			var len = this._cards.length;
			for(var i = 0;i < len;i++)
				this._cards[i].dispose();
		}
	};
	
	function stopLightsAnimation()
	{
		clearInterval(this._lightsAnimationTimer);
		this._lightsAnimationTimer = 0;
	}
	
	function onCardClick(event)
	{
		for(var i = 0;i < 12;i++)
		{
			if(event.target == this._cards[i])
			{
				this._lastClickedCard = i;
				this._cards[i].removeEventListener(MouseEvent.CLICK, onCardClick, this);
				this._cards[i].highlight(true);
			}
			this._cards[i].enabled(false);
		}
		
		this.dispatchEvent(new Event(JackpotView.JACKPOT_CARD_CLICK));
	}
	
	function onLightsAnimationTimer()
	{
		var len = this._prevLights.length;
		for (var i = 0; i < len;i++)
			this._prevLights[i].removeClass("off");
		this._prevLights.length = 0;

		len = Math.round(1 + Math.random()*3);
		for (var i = 0; i < len; i++)
		{
			var index = Math.round(Math.random() * ((this._lights.length / 2) - 1));
			this._lights[index * 2].addClass("off");
			this._prevLights.push(this._lights[index * 2]);
		}
		len = Math.round(1 + Math.random() * 3);
		for (var i = 0; i < len; i++)
		{
			var index = Math.round(Math.random() * ((this._lights.length / 2) - 1));
			this._lights[index * 2 + 1].addClass("off");
			this._prevLights.push(this._lights[index * 2 + 1]);
		}
	}
	
	function onSuitesBlinkTimer()
	{
		var firstIndex = this._winCardType*3;
		if(this._smallSuites[firstIndex].hasClass("active"))
			for(var i = 0;i < 3;i++)
				this._smallSuites[firstIndex+i].removeClass("active");
		else
			for(var i = 0;i < 3;i++)
				this._smallSuites[firstIndex+i].addClass("active");
				
		var len = this._cards.length;
		for(var i = 0;i < len;i++)
			if(this._cards[i].getType() == this._winCardType)
				this._cards[i].setGlow(!this._cards[i].getGlow());
	}
	
	return p;
})());