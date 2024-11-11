/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

Button("DenomButton",
{
},
(function()
{
	var p =
	{
		init: function(x, y, creditText)
		{
			this._textField = null;
		
			this._super("denomButton", x, y);
			
			this._textField = new TextView("denomField", "", 0, 85);
			var creditTextField = new TextView("denomField creditField", "", 0, 20);
			
			creditTextField.setText("1 "+creditText+"<br>=");
			
			this.addChildren(this._textField, creditTextField);
		},
		
		setSelected: function(value)
		{
			if(value)
				this.addClass("denomSelected");
			else
				this.removeClass("denomSelected");
		},
		
		setText: function(text) { this._textField.setText(text); }
	};
	
	return p;
})());