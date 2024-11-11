/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateWaitingForChoiceResult(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function()
	{
		throw "Invalid command \"spin\" in StateWaitingForChoiceResult!";
	}
	self.gamble = function()
	{
		throw "Invalid command \"gamble\" in StateWaitingForChoiceResult!";
	}
	self.jackpot = function()
	{
		throw "Invalid command \"jackpot\" in StateWaitingForChoiceResult!";
	}
	self.collect = function()
	{
		throw "Invalid command \"collect\" in StateWaitingForChoiceResult!";
	}
	self.setResult = function()
	{
		throw "Invalid command \"setResult\" in StateWaitingForChoiceResult!";
	}
	self.choice = function()
	{
		throw "Invalid command \"choice\" in StateWaitingForChoiceResult!";
	}
	self.setChoiceResult = function()
	{
		throw "Invalid command \"setChoiceResult\" in StateWaitingForChoiceResult!";
	}
	self.onResult = function()
	{
		setStateCallback(StateMachineContext.STATE_WIN);
		controller.choiceReceived();
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_WAITING_FOR_CHOICE_RESULT;
	}
}