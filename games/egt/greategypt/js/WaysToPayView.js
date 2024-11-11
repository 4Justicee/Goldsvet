/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("WaysToPayView",
{
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._config = config;
			
			this._super();

			if(this._config.lineGame || !this._config.fixedLines) {
				this._leftWaysPayImage = new View("waysToPayImage", 78, 472-98*this._config.currLine);
				this._leftWaysPayImage.setSize(55, 121);
				this._rightWaysPayImage = new View("waysToPayImage", 1148, 472-98*this._config.currLine);
				this._rightWaysPayImage.setSize(55, 121);

				this.addChildren(this._leftWaysPayImage, this._rightWaysPayImage);

				this._leftLines = [];
				this._rightLines = [];
				for(var i = 0;i < 5;i++)
				{
					var lline = new TextView("textField lines", this._config.lines[i], 72, 516-98*i);
					var rline = new TextView("textField lines", this._config.lines[i], 1142, 516-98*i);
					
					if(this._config.currLine == i)
					{
						lline.addClass("active");
						rline.addClass("active");
					}
					
					this._leftLines[i] = lline;
					this._rightLines[i] = rline;
					
					this.addChildren(lline, rline);
				}
			} else {
				this._fixedImage = [];
				this._fixedImage[0] = new View("waysToPayImage", 72, 232);
				this._fixedImage[1] = new View("waysToPayImage", 1141, 232);

				this.addChildren(this._fixedImage[0], this._fixedImage[1]);
			}

		},
		
		setLines: function(index) {
			if(this._config.lineGame || !this._config.fixedLines) {
				this._leftWaysPayImage.setPosition(78, 472-98*index);
				this._rightWaysPayImage.setPosition(1148, 472-98*index);

				this._leftLines[this._config.currLine].removeClass("active");
				this._rightLines[this._config.currLine].removeClass("active");
				this._config.currLine = index;
				this._leftLines[this._config.currLine].addClass("active");
				this._rightLines[this._config.currLine].addClass("active");
			}
		},
		setFixedLines: function() {}
	};
	
	return p;
})());