/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function SpinAnalyzer() {}

SpinAnalyzer.getNumWins = function(spinMessage) { return spinMessage.lines.length + spinMessage.scatters.length; }
SpinAnalyzer.getCard = function(col, row, spinMessage) { return spinMessage.reels[(GameSettings.getInstance().numReelCards + 2) * col + row + 1]; }
SpinAnalyzer.isCardOnReel = function(reel, card, spinMessage)
{
	for (var i = 0; i < GameSettings.getInstance().numReelCards; i++)
		if (SpinAnalyzer.getCard(reel, i, spinMessage) == card)
			return true;
	return false;
}
SpinAnalyzer.countCardOnReel = function(reel , card, spinMessage)
{
	var count = 0;
	for (var i = 0; i < GameSettings.getInstance().numReelCards; i++)
		if (SpinAnalyzer.getCard(reel, i, spinMessage) == card)
			count++;
		
	return count;
}
SpinAnalyzer.getCardAfterExpand = function(col, row, spinMessage)
{
	if (spinMessage.expand.length > 0)
	{
		var len = spinMessage.expand.length;
		for (var i = 0; i < len; i += 2)
			if (col == spinMessage.expand[i] && row == spinMessage.expand[i + 1])
				return GameSettings.getInstance().wildIndex;
	}
	return SpinAnalyzer.getCard(col, row, spinMessage);
}
SpinAnalyzer.getStrongestCard = function(spinMessage)
{
	var settings = GameSettings.getInstance();
	
	var card = -1, x;
	
	var scatters = spinMessage.scatters;
	var len = scatters.length;
	for (var i = 0; i < len; i++)
	{
		if (card == -1 || scatters[i].scatterName > card)
			card = scatters[i].scatterName;
	}
	
	if (card != -1)
		return card;
	
	var lines = spinMessage.lines;
	len = lines.length;
	for(var i = 0; i < len; i++)
	{
		if (card == -1 || lines[i].card >= card)
			card = lines[i].card;
	}
	
	return card;
}
SpinAnalyzer.getFullLineCard = function(spinMessage)
{
	var settings = GameSettings.getInstance();
	
	var card = -1, x;
	
	var lines = spinMessage.lines;
	var len = lines.length;
	for (var i = 0; i < len; i++)
	{
		if (lines[i].cells.length/2 >= settings.numReels)
		{
			// we have a full line
			
			if (card == -1 || lines[i].card >= card)
				card = lines[i].card;
		}
	}
	return card;
}