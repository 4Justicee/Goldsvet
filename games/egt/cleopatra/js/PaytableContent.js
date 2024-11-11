/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function setPaytableContent(paytableCoeficients, denominations, currDenomIndex, betPerLine, totalBet, jackpotMinBet, jackpotMaxBet, currencyType, currency)
{
	var div;
	for(var index in paytableCoeficients)
	{
		var len = paytableCoeficients[index].coef.length;
		for(var i = 0;i < len;i++)
		{
			div = $("#LineContent"+i+"-"+index);
			if(!div[0])
				continue;

			var bet;
			if (index == 9)
				bet = totalBet;
			else
				bet = betPerLine;
				
			if(currency)
				div[0].innerHTML = Utils.formatNumber(bet*paytableCoeficients[index].coef[i], 100, true) + " " + "<span class='currency'>"+currencyType+"</span>";
			else
				div[0].innerHTML = Utils.formatNumber(bet*paytableCoeficients[index].coef[i], denominations[currDenomIndex][0]);

		}
	}
	
	var maxGambleAmount = Math.min(denominations[currDenomIndex][2], denominations[currDenomIndex][1] * totalBet) / 2;
	div = $("#GambleTextLine");
	if(currency)
		div[0].innerHTML = Utils.formatNumber(maxGambleAmount, 100, true) + " " + "<span class='jackpotGambleCurrency'>"+currencyType+"</span>";
	else
		div[0].innerHTML = Utils.formatNumber(maxGambleAmount, denominations[currDenomIndex][0]);

	div = $("#JackpotTextLine");
	if(currency)
		div[0].innerHTML = Utils.formatNumber(jackpotMinBet, 100, true) + " " + "<span class='jackpotGambleCurrency'>"+currencyType+"</span>" + " - " + 
						   Utils.formatNumber(jackpotMaxBet, 100, true) + " " + "<span class='jackpotGambleCurrency'>"+currencyType+"</span>";
	else
		div[0].innerHTML = Utils.formatNumber(jackpotMinBet, denominations[currDenomIndex][0]) + " - " + Utils.formatNumber(jackpotMaxBet, denominations[currDenomIndex][0]);

	
	if(Device.isAndroid) {
		$('#PaytableContent .arrow').addClass("Android");
	}

//	if(Device.isiOS)
//	{
//		$("#PaytableContent .paytableLine").addClass("iOS");
//		$("#PaytableContent .textLine.lineContent").addClass("iOS");
//	}
}