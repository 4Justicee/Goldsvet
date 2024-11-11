/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("TotalsInfoView",
{
},
(function()
{
	var p =
	{
		init: function(config)
		{
			this._config = config;
			
			this._super("totalsInfoView");

			this._totalBetLabel = new TextView("textField totalLabel", config.totalBetLabel, 0, 4);
			this._totalWinLabel = new TextView("textField totalLabel", config.totalWinLabel, 0, 4);
			
			this._totalBetAmount = new MoneyTextView("textField totalAmount", 0, 4, "totalCurrency", 100000);
			this._totalWinAmount = new MoneyTextView("textField totalAmount", 0, 4, "totalCurrency", 100000);
					
			this.addChild(this._totalBetLabel);
			this.addChild(this._totalBetAmount);
			this.addChild(this._totalWinLabel);
			this.addChild(this._totalWinAmount);
			
			this._totalBetAmount.currencyType(config.currencyType);
			
			this._totalWinAmount.currencyType(config.currencyType);
			
			positionFields.call(this);
		},
		
		updateTotalBet(value) {
			this._totalBetAmount.moneyValue(value);
			
			positionFields.call(this);
		},
		
		updateTotalWin(value) {
			this._totalWinAmount.moneyValue(value);
			
			positionFields.call(this);
		}
	};
	
	function positionFields()
	{
		var self = this;
		setTimeout(function () {
			self._totalBetLabel.x(118);
			self._totalBetAmount.setPosition(self._totalBetLabel.x() + self._totalBetLabel.getWidth() + 10, 4);
			
			self._totalWinLabel.x(self._totalBetAmount.x() + self._totalBetAmount.getWidth() + 30);
			self._totalWinAmount.setPosition(self._totalWinLabel.x() + self._totalWinLabel.getWidth() + 10, 4);
		}, 0);
	}
	
	return p;
})());