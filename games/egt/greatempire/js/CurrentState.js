/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function CurrentState(currentState) 
{
	this.state = currentState.state;
	this.gameNumber = currentState.gameNumber;
	this.bet = currentState.bet;
	this.denomination = currentState.denomination;
	this.numberOfLines = typeof(currentState.numberOfLines) !== "undefined" ? currentState.numberOfLines : currentState.combos;
	this.reels = currentState.reels.slice();
	if(currentState.lines)
		this.lines = currentState.lines.slice();
	else if (currentState.combos)
		this.lines = currentState.combos.slice();
	if(currentState.scatters)
		this.scatters = currentState.scatters.slice();
	if(currentState.expand)
		this.expand = currentState.expand.slice();
	this.winAmount = currentState.winAmount;
	this.gamblesUsed = currentState.gamblesUsed;
	this.gambleAttemptsLeft = currentState.gambles;
	this.previousGambles = currentState.previousGambles.slice();
	this.freeSpins = currentState.freespins;
	this.freespinsUsed = currentState.freespinsUsed;
	if(currentState.freespinScatters)
		this.freespinScatters = currentState.freespinScatters.slice();
	if (currentState.freespinsPerLine)
		this.freeSpinsPerLine = currentState.freespinsPerLine.slice();
	this.firstSpin = currentState.firstSpin;
	this.jackpotGameState = currentState.jackpotGameState;
	this.jackpot = currentState.jackpot;
	this.holdReels = currentState.holdReels;
	if (currentState.choicesObject)
		this.choicesObject = currentState.choicesObject;
	else
		this.choicesObject = { };
	this.choicesObject.recovery = true;	// tells the freespin animation that the information in this object comes from recovery
									// and not from choice response
	this.wildIndexes = currentState.wildIndexes;
}