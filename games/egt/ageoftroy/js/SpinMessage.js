/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function SpinMessage(reels, lines, scatters, expand, winAmount, gambleAttemptsLeft, jackpot, freeSpins, 
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
				return l2.card - l1.card;
		});
	}
	if (scatters)
		this.scatters = scatters.slice();
	if (expand)
		this.expand = expand.slice();
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