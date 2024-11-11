/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("LinesSelectView",
{
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._config = config;
			this._containerDiv;
			this._leftLines;
			this._rightLines;
			this._fixedLabels;
			this._linesLabels;
			
			this._super();
			
			this._fixedLabels = [];
			this._linesLabels = [];
			this._fixedLabels[0] = new TextView("textField lines active", "FIXED", 72, 0);
			this._fixedLabels[1] = new TextView("textField lines active", "FIXED", 1142, 0);
			this._fixedLabels[0].setFontSize(12);
			this._fixedLabels[0].visible(false);
			this._fixedLabels[1].setFontSize(12);
			this._fixedLabels[1].visible(false);
			this._linesLabels[0] = new TextView("textField lines active", "", 72, 0);
			this._linesLabels[1] = new TextView("textField lines active", "", 1142, 0);
			this._linesLabels[0].setFontSize(18);
			this._linesLabels[1].setFontSize(18);
			
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
					
					this._linesLabels[0].setText(i == 0 ? "LINE" : "LINES");
					this._linesLabels[1].setText(i == 0 ? "LINE" : "LINES");
					this._linesLabels[0].setPosition(this._linesLabels[0].x(), 516-98*i + 29);
					this._linesLabels[1].setPosition(this._linesLabels[1].x(), 516-98*i + 29);
				}
				
				this._leftLines[i] = lline;
				this._rightLines[i] = rline;
				
				this.addChildren(lline, rline);
			}
			
			this.addChildren(this._linesLabels[0], this._linesLabels[1], this._fixedLabels[0], this._fixedLabels[1]);
		},
		
		setLines: function(index)
		{
			this._leftLines[this._config.currLine].removeClass("active");
			this._rightLines[this._config.currLine].removeClass("active");
			this._config.currLine = index;
			this._leftLines[this._config.currLine].addClass("active");
			this._rightLines[this._config.currLine].addClass("active");
			
			var linesY = this._leftLines[index].y();
			this._linesLabels[0].setPosition(this._linesLabels[0].x(), linesY + 29);
			this._linesLabels[1].setPosition(this._linesLabels[1].x(), linesY + 29);
			
			this._linesLabels[0].setText(index == 0 ? "LINE" : "LINES");
			this._linesLabels[1].setText(index == 0 ? "LINE" : "LINES");
		},
		
		setFixedLines: function(index)
		{
			if(index == -1)
			{
				this._fixedLabels[0].visible(false);
				this._fixedLabels[1].visible(false);
				return;
			}
			var linesY = this._leftLines[index].y();
			this._fixedLabels[0].setPosition(this._fixedLabels[0].x(), linesY + 48);
			this._fixedLabels[0].visible(true);
			this._fixedLabels[1].setPosition(this._fixedLabels[1].x(), linesY + 48);
			this._fixedLabels[1].visible(true);
		}
	};

	return p;
})());