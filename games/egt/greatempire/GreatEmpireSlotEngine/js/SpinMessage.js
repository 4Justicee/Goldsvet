/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function SpinMessage(reels, lines, additional ,scatters, expand, winAmount, gambleAttemptsLeft, jackpot, freeSpins, 
					 freeSpinScatters, choices, choiceObject,  gameNumber,	holdReels, state)
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
	if (additional)
	{
		if (additional.length > 0)
		{
			this.additional[0].additional = true; //We expect only 1 element in array.additional Prameter tels that we have special case
			this.lines.push(this.additional[0]);
		}
	}
	
	if (scatters)
		this.scatters = scatters.slice();
	if (expand)
		this.expand = expand.slice();
	if (holdReels)
		this.holdReels = holdReels.slice();
	this.gameNumber = gameNumber;
	this.winAmount = winAmount;
	this.gambleAttemptsLeft = gambleAttemptsLeft;
	this.jackpot = jackpot;
	this.freeSpins = freeSpins;

	if (choices > 0)
		this.freeSpins = -1;

	if (freeSpinScatters)
		this.freeSpinScatters = freeSpinScatters.slice();
	this.choices = choices;
	this.choiceObject = choiceObject ? choiceObject : { };
	this.choiceObject.freespins = this.freeSpins;
}