/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function GambleMessage(card, winAmount, gambleAttemptsLeft, jackpot, state)
{
	this.type = BaseMessage.GAMBLE;
	this.state = state;
	this.card = card;
	this.winAmount = winAmount;
	this.gambleAttemptsLeft = gambleAttemptsLeft;
	this.jackpot = jackpot;
}