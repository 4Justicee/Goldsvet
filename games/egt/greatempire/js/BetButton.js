/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

Button("BetButton",
{
},
(function()
{
	var p =
	{
		init: function(config, x, y)
		{
			this._config = config;
			this._textField = null;
			this._topLabel = null;
			this._bottomLabel = null;
			
			this._super("betButton", x, y);
			
			this._textField = new TextView("betField", "", 0, 38);
			this._topLabel = new TextView("betField " + (this._config.type == 1 ? "topBetLabel" : "topBetLabelRed"), this._config.topText, 0, this._config.type == 1 ? 2 : 0);
			this._bottomLabel = new TextView("betField bottomBetLabel",  this._config.bottomText, 0, 122);
			
			this.addChildren(this._textField, this._topLabel, this._bottomLabel);
		},
		
		setSelected: function(value)
		{
			if(value)
			{
				
				this.addClass("betSelected");
				this._textField.addClass("betFieldSelected");
				if(this._config.type == 1)
					this._topLabel.addClass("betLabelSelected");
				this._bottomLabel.addClass("betLabelSelected");
			}
			else
			{
				this.removeClass("betSelected");
				this._textField.removeClass("betFieldSelected");
				if(this._config.type == 1)
					this._topLabel.removeClass("betLabelSelected");
				this._bottomLabel.removeClass("betLabelSelected");
			}
		},
		
		setText: function(text) 
		{ 
			if(text.length >= 6)
				text = text.split(".")[0];
			
			this._textField.setText(text); 
		}
	};
	
	return p;
})());