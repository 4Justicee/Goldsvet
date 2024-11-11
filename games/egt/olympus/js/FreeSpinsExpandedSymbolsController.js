/**
*
*
*/

ViewController("FreeSpinsExpandedSymbolsController", 
{
	ON_EXPANDING_COMPLETED: "FreeSpinsExpandedSymbolsController.onExpandingCompleted",
	ON_EXPANDING_REEL_COMPLETED: "CExpanding.OnExpandingReelCompleted"
},
(function() 
{
	var p = {
		init: function() {
			this._expandingView;
			this._count;

			this._super();

			var settings = GameSettings.getInstance();

			if (settings.freeSpinsExpandSymbol == -1)
				throw "freeSpinsExpandSymbol can not be null when expansion are starting!";

			this._view = new View("FreeSpinsExpandedSymbolsController", 151, 66);
			this._view.setSize(979, 540);
			this._view.visible(false);

			this._expandingView = new ExpandingView();
			
			this._view.addChild(this._expandingView);
		},
		assembleExpanded: function() {
			var settings = GameSettings.getInstance();
			var spinMessage = settings.serverMessage;

			// Exchange of reels, lines and calculating win amount
			spinMessage.freeSpinsExpandReels = { reels: spinMessage.reels.slice(), lines: spinMessage.lines.slice() };
			spinMessage.lines = spinMessage.freeSpinsExpandLines;
			spinMessage.winAmount += spinMessage.freeSpinsExpandWinAmount;
			spinMessage.scatters = [];

			this._expandingView.assembleExpanded();

		},
		destroyExpandedCards: function() {
			this._expandingView.destroyExpandedCards();
		},
		destroyExpandedWins: function() {
			this._expandingView.destroyExpandedWins();
		},

		start: function() {
			var expanded = this._expandingView.getExpanded();

			this._expandingView.visible(true);

			// Reset count
			this._count = -1;
			if (expanded.length > 0) {
				this._view.visible(true);
				expand.call(this);
			} else {
				this._expandingView.visible(false);
				this.dispatchEvent(new Event(FreeSpinsExpandedSymbolsController.ON_EXPANDING_COMPLETED));
			}
		},

		dispose: function() {
			this._view.removeChild(this._expandingView);
			this._expandingView.dispose();
			this._expandingView = null;
			this._super();
		}
	};

	function expand(event) {
		var expanded = this._expandingView.getExpanded();

		if (this._count != -1)
			expanded[this._count].removeEventListener(FreeSpinsExpandedSymbolsController.ON_EXPANDING_REEL_COMPLETED, expand, this);

		this._count++;
		if (this._count < expanded.length) {
			expanded[this._count].addEventListener(FreeSpinsExpandedSymbolsController.ON_EXPANDING_REEL_COMPLETED, expand, this);
			expanded[this._count].expandSymbols();
		} else {
			this.dispatchEvent(new Event(FreeSpinsExpandedSymbolsController.ON_EXPANDING_COMPLETED));
		}
	}

	return p;
})());
