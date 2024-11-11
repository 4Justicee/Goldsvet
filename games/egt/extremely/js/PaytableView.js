/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("PaytableView",
{
	STATE_SHOWN: 0,
	STATE_HIDDEN: 1,
	STATE_SHOWING: 2,
	STATE_HIDING: 3,
	STATE_SLIDE_SHOWING: 4,
	STATE_SLIDE_HIDING: 5,
	
	PAYTABLE_CLOSE_BUTTON_CLICK: "paytableCloseButtonClick",
	SETTINGS_BUTTON_CLICK: "settingsButtonClick",
	PAYTABLE_SHOWN: "paytableShown",
	PAYTABLE_HIDDEN: "paytableHidden"
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._config = config;
			this._loadingIcon = null;
			this._paytableCloseButton = null;
			this._settingsButton = null;
			this._showHideTween = null;
			this._state = PaytableView.STATE_HIDDEN;
			this._position = {x: -1280};
			this._paytableButtonContainerDiv = null;
			this._arrowBlinkTween = null;
		
			this._super("paytableView", 0, 0, true);
			
			this._scrollView = new ScrollView("paytableScrollView", 0, 0, true);
			this._loadingIcon = new View("paytableLoading");
			this._paytableCloseButton = new SettingsPaytableCloseButton(0, 100, {x: 0, y: -20, width: 100, height: 94});
			this._settingsButton = new Button("settingsFromPaytableButton", 0, 516, {x: 0, y: -20, width: 100, height: 94}, true);
			this._settingsButton.addChild(new View("settingsFromPaytableButtonWheelIcon", 9, 6));
			
			this.addChildren(this._scrollView, this._loadingIcon, this._paytableCloseButton, this._settingsButton);

			this.setPosition(this._position.x, 0);
			
			this.setZIndex(122);
			
			this._paytableCloseButton.addEventListener(MouseEvent.CLICK, onPaytableCloseButtonClick, this);
			this._settingsButton.addEventListener(MouseEvent.CLICK, onSettingsButtonClick, this);
		},
		
		setContent: function(content, paytableCoeficients, denominations, currDenomIndex, betPerLine, totalBet, 
							 jackpotMinBet, jackpotMaxBet, currencyType, currency)
		{
			if(!content)
			{
				onSettingsButtonClick.call(this);
				return;
			}

			this.removeChild(this._loadingIcon);

			// clone the element so that when it is added to this document it is not removed from its original document
			var contentView = new View("", 0, 0, true, $(content));
			this._scrollView.addChild(contentView);

			// this function is defined in each of the game`s PaytableContent.js files
			setPaytableContent(paytableCoeficients, denominations, currDenomIndex, betPerLine, totalBet, 
							   jackpotMinBet, jackpotMaxBet, currencyType, currency);
		},
		
		show: function()
		{
			if(this._state == PaytableView.STATE_SHOWN || this._state == PaytableView.STATE_SHOWING)
				return;
				
			this._state = PaytableView.STATE_SHOWING;
			if(this._state == PaytableView.STATE_HIDING)
			{
				this._showHideTween.updateTo({x:0});
				return;
			}

			var self = this;
			this._showHideTween = TweenMax.to(this._position, 0.2, {x: 0, ease: Linear.easeNone, onComplete: function()
			{
				self._state = PaytableView.STATE_SHOWN;
				self._showHideTween = null;
				self.setZIndex(110);
				self.dispatchEvent(new Event(PaytableView.PAYTABLE_SHOWN));
			}, onUpdate: function() { self.setPosition(self._position.x, self.y()); }});
		},
		
		hide: function()
		{
			if(this._state == PaytableView.STATE_HIDDEN || this._state == PaytableView.STATE_HIDING)
				return;
				
			this._state = PaytableView.STATE_HIDING;
			if(this._state == PaytableView.STATE_SHOWING)
			{
				this._showHideTween.updateTo({x:-1350});
				return;
			}
			
			var self = this;
			this._showHideTween = TweenMax.to(this._position, 0.3, {x: -1350, ease: Linear.easeNone, onComplete: function()
			{
				self._state = PaytableView.STATE_HIDDEN;
				self._showHideTween = null;
				self.dispatchEvent(new Event(PaytableView.PAYTABLE_HIDDEN));
			}, onUpdate: function() { self.setPosition(self._position.x, self.y()); }});
		},
		
		dispose: function()
		{
			console.log("DISPOSE");
			this._paytableCloseButton.dispose();
			this._scrollView.dispose();
			
			this._super();
		}
	};
	
	function onPaytableCloseButtonClick() { this.dispatchEvent(new Event(PaytableView.PAYTABLE_CLOSE_BUTTON_CLICK)); }
	function onSettingsButtonClick() { this.dispatchEvent(new Event(PaytableView.SETTINGS_BUTTON_CLICK)); }
	
	return p;
})());