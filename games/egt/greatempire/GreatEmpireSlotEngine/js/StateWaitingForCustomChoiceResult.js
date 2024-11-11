/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateWaitingForCustomChoiceResult(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function()
	{
		throw "Invalid command \"spin\" in StateWaitingForCustomChoiceResult!";
	}
	self.gamble = function()
	{
		throw "Invalid command \"gamble\" in StateWaitingForCustomChoiceResult!";
	}
	self.collect = function()
	{
		throw "Invalid command \"collect\" in StateWaitingForCustomChoiceResult!";
	}
	self.jackpot = function()
	{
		throw "Invalid command \"jackpot\" in StateWaitingForCustomChoiceResult!";
	}
	self.setResult = function()
	{
		throw "Invalid command \"setResult\" in StateWaitingForCustomChoiceResult!";
	}
	self.choice = function()
	{
		throw "Invalid command \"choice\" in StateWaitingForCustomChoiceResult!";
	}
	self.setChoiceResult = function()
	{
		throw "Invalid command \"setChoiceResult\" in StateWaitingForCustomChoiceResult!";
	}
	self.onResult = function()
	{
		setStateCallback(StateMachineContext.STATE_WIN);
		controller.customChoiceResultReceived();
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_WAITING_FOR_CUSTOM_CHOICE_RESULT;
	}
}