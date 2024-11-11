/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

Button("JackpotCard", 
{
},
(function()
{
	var p =
	{
		init: function(x, y)
		{
			this._type = -1;
			this._glow = false;
			this._letter = null;
			this._suite = null;
			this._image = null;
			this._backImage = null;
			this._overlay = null;
		
			this._super("jackpotCard", x, y);
			
			this._letter = new View("jackpotCardLetter", 3, 7);
			this._suite = new View("jackpotCardSuite", 30, 89);
			this._image = new View("jackpotCardImage", 57, 7);
			this._backImage = new View("jackpotCardBack", 6, 5);
			this._backImage.setScale(0.535, 0.535);
			this._overlay = new View("jackpotCardOverlay", -1, 0);
			
			this.addChildren(this._image, this._backImage, this._letter, this._suite);
			
			this.setType(-1);
		},
		
		getType: function() { return this._type; },
		setType: function(type)
		{
			this._type = type;
			if(type == -1)
			{
				this._letter.visible(false);
				this._suite.visible(false);
				this._image.visible(false);
				this._backImage.visible(true);
			}
			else
			{
				this._letter.visible(true);
				this._letter.removeClass("black red");
				this._suite.visible(true);
				this._suite.removeClass("suite0 suite1 suite2 suite3");
				this._suite.addClass("suite"+type);
				this._image.visible(true);
				this._backImage.visible(false);
				
				if(type == 0 || type == 3)
					this._letter.addClass("black");
				else
					this._letter.addClass("red");
			}
		},
		
		highlight: function(value)
		{
			if(value)
				this.addClass("highlight");
			else
				this.removeClass("highlight");
		},
		
		darken: function(value)
		{
			this.addChild(this._overlay);
			//_containerDiv.css("-webkit-filter", "grayscale(1) brightness(0.3)");
		},
		
		getGlow: function() { return this._glow; },
		setGlow: function(value) { this._glow = value; $(this._suite.getInternalContainer()).css("opacity", value ? 0.3 : 1);/*_containerDiv.css("box-shadow", "0px 0px 9px " + (value ? 6 : 0) + "px #c6571a");*/ },
		
		dispose: function()
		{
			this._super();
		}
	};
	
	return p;
})());