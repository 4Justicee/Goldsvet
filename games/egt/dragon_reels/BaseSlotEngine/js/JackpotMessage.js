/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function JackpotMessage(card, winAmount, winLevel, state)
{
	this.type = BaseMessage.JACKPOT;
	this.state = state;
	this.card = card;
	this.winAmount = winAmount;
	this.winLevel = winLevel;
	this.jackpot = false;
}