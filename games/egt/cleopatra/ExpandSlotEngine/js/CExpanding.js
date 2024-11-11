/**
 * 
 * 
 */
View("CExpanding", 
{
	// CONSTANTS
	ON_EXPANDING_REEL_COMPLETED: "CExpanding.OnExpandingReelCompleted"
},
(function() {
	var p = {
		init: function(params, x, y) {
			this._expandTimeout = 250;

			this._x = x;
			this._y = y;

			this._params = [];
			this._isExpanding = true;
			this._expTime = -1;
			this._cardCount;

			if (params.length > 0) {
				this._params = params;
				this._isExpanding = false;
			}

			this._super("CExpanding", x, y);
		},
		getParams: function() {
			return this._params;
		},
		expandSymbols: function() {
			if (this._isExpanding == true)
				return;

			this._isExpanding = true;
			this._cardCount = -1;
			drawCard.call(this);
		},
		hideSymbols: function(frame) {
			this._cardCount = -1;
			putFrames.call(this, frame);
		},
		dispose: function() {
			var len = this.getNumChildren;
			for (var i = 0; i < len; i++) {
				this.removeChild(this.getChildAt(i));
			}

			this._params = [];
			this._params = null;

			this._super();
		}
	}

	function drawCard() {
		var self = this;
		var ii = 0;
		var p;
		var currentContext;
		var soundManager = SoundManager.getInstance();

		clearTimeout(this._expTime);

		this._expTime = -1;
		this._cardCount++;
		
		// Assemble each card + frame for current reel
		if (this._cardCount < this._params.length) {
			p = this._params[this._cardCount];
			currentContext = p.canvas.getContext2D();

			for (ii = 0; ii < p.symbols.length; ii++) {
				var img = p.symbols[ii];
				if (p.exp)
					if (img.width > p.width)
						currentContext.drawImage(img, p.sourceX, p.sourceY, p.width, p.height, p.xGlobal, p.yGlobal, p.width, p.height);
					else
						currentContext.drawImage(img, p.xGlobal, p.yGlobal);
			}

			if (p.exp == true) {
				soundManager.play("bonusExpanding");
				this._expTime = setTimeout(function(){ drawCard.call(self);}, self._expandTimeout);
			} else {
				drawCard.call(this);
			}



		} else {
			clearTimeout(this._expTime);
			this._expTime = -1;
			this.dispatchEvent(new Event(CExpanding.ON_EXPANDING_REEL_COMPLETED));
		}


	}

	function putFrames(frame) {
		var p;
		var currentContext;

		this._cardCount++;

		if (this._cardCount < this._params.length) {
			p = this._params[this._cardCount];
			currentContext = p.canvas.getContext2D();

			currentContext.clearRect(p.xGlobal, p.yGlobal, frame.width, frame.height);
			currentContext.drawImage(frame, p.xGlobal, p.yGlobal);
			putFrames.call(this, frame);
		}
	}

	return p;
})());