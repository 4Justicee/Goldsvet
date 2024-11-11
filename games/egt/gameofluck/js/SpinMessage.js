/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function SpinMessage(reels, lines, scatters, expand, specialExpand ,winAmount, gambleAttemptsLeft, jackpot, freeSpins, 
					 freeSpinsPerLine, freeSpinScatters, gameNumber, state)
{
	this.type = BaseMessage.SPIN;
	this.state = state;
	this.reels = reels.slice();
	if (lines)
	{
		this.lines = lines.slice();
		this.lines.sort(function(l1, l2)
		{
			if(GameSettings.getInstance().lineGame)
				return l1.line - l2.line;
			else
				return l1.card - l2.card;
		});
	}
	this.scattersWinAmount = 0;
	if (scatters)
	{
		this.scatters = scatters.slice();
		var len = scatters.length;
		for (var i = 0; i < len; i++)
			this.scattersWinAmount += scatters[i].winAmount;
	}

	if (expand)
		this.expand = expand.slice();
	if(specialExpand)
		this.specialExpand = specialExpand.slice();
	this.gameNumber = gameNumber;
	this.winAmount = winAmount;
	this.gambleAttemptsLeft = gambleAttemptsLeft;
	this.jackpot = jackpot;
	this.freeSpins = freeSpins;
	if (freeSpinScatters)
		this.freeSpinScatters = freeSpinScatters.slice();
	if (freeSpinsPerLine)
		this.freeSpinsPerLine = freeSpinsPerLine.slice();
}