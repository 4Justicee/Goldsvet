/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("PaytableViewController",//(showCallback, hideCallback, settingsCallback)
{
},
(function()
{
	var p =
	{
		init: function()
		{
			this._loadingQueue = null;
			this._paytableHtmlSrc = "";
			
			this._super();
			
			var settings = GameSettings.getInstance();
			
			this._view = new PaytableView({});
			
			SoundManager.getInstance().play("settingsShowSound");

			console.log(settings.paytableURLs[settings.currLanguage]);
			
			this._paytableHtmlSrc = typeof settings.paytableURLs[settings.currLanguage] != 'undefined' ? settings.paytableURLs[settings.currLanguage] : settings.paytableURLs['en'];
			
			this._loadingQueue = Loader.getQueue("slotPaytable");
			if(!this._loadingQueue)
			{
				this._loadingQueue = Loader.createQueue("slotPaytable");
				this._loadingQueue.addXMLLoader(new XMLLoader(this._paytableHtmlSrc));
				this._loadingQueue.addCssLoader(new CSSLoader(settings.engineType+"/games/"+settings.gameType+"/paytable/paytable.css"));
				this._loadingQueue.addScriptLoader(new ScriptLoader(settings.engineType+"/games/"+settings.gameType+"/paytable/PaytableContent.js"));
			}

			this._loadingQueue.addEventListener(LoaderEvent.COMPLETE, onPaytableLoaded, this);
			this._loadingQueue.addEventListener(LoaderEvent.ERROR, onPaytableError, this);

			this._loadingQueue.load();
			
			this._view.addEventListener(PaytableView.PAYTABLE_CLOSE_BUTTON_CLICK, onPaytableCloseButtonClick, this);
			this._view.addEventListener(PaytableView.SETTINGS_BUTTON_CLICK, onEvent, this);
			this._view.addEventListener(PaytableView.PAYTABLE_SHOWN, onEvent, this);
			this._view.addEventListener(PaytableView.PAYTABLE_HIDDEN, onEvent, this);
			
			this._view.show();
		},
		
		dispose: function()
		{
			this._loadingQueue.removeEventListener(LoaderEvent.COMPLETE, onPaytableLoaded, this);
			this._loadingQueue.removeEventListener(LoaderEvent.ERROR, onPaytableError, this);
			
			// TODO: stop the loading of the paytable or leave it loading so that the next time 
			// we open the paytable it will be loaded
			
			this._view.removeEventListener(PaytableView.PAYTABLE_CLOSE_BUTTON_CLICK, onPaytableCloseButtonClick, this);
			this._view.removeEventListener(PaytableView.SETTINGS_BUTTON_CLICK, onEvent, this);
			this._view.removeEventListener(PaytableView.PAYTABLE_SHOWN, onEvent, this);
			this._view.removeEventListener(PaytableView.PAYTABLE_HIDDEN, onEvent, this);
			
			this._super();
		}
	};

	function setViewContent(value)
	{
		var settings = GameSettings.getInstance();
		
		if(!value)
		{
			this._view.setContent(null);
			return;
		}

		// console.log("SET CONTENT VIEW");
		var betPerLine = settings.betValues[settings.currBetIndex] * settings.denominations[settings.currDenominationIndex][0];
		var totalBet = betPerLine * (settings.lineGame ? settings.linesCountConfig[settings.currLineIndex] : settings.comboCoeficients[settings.currLineIndex]);
		var htmlLoader = Loader.getLoader(this._paytableHtmlSrc);
		this._view.setContent(htmlLoader.getData(), settings.paytableCoeficients, settings.denominations, settings.currDenominationIndex, betPerLine, totalBet, 
						 	  settings.jackpotMinBet, settings.jackpotMaxBet, settings.currencyType,settings.currency);


		if(!settings.jackpotAllowed)
			$("#jackpot").hide();
	}
	
	function onPaytableCloseButtonClick(event)
	{
		this._view.hide();
		SoundManager.getInstance().play("settingsHideSound");
	}
	
	function onEvent(event) { this.dispatchEvent(event); }
	
	function onPaytableLoaded() { setViewContent.call(this, true); }
	function onPaytableError() { setViewContent.call(this, false); }

	return p;
})());