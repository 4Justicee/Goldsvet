/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateWaitingForCustomResult(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function() 
	{
		throw "Invalid command \"spin\" in StateWaitingForCustomResult!";
	}
	self.gamble = function() 
	{
		throw "Invalid command \"gamble\" in StateWaitingForCustomResult!";
	}
	self.jackpot = function() 
	{
		throw "Invalid command \"jackpot\" in StateWaitingForCustomResult!";
	}
	self.collect = function() 
	{
		throw "Invalid command \"collect\" in StateWaitingForCustomResult!";
	}
	self.setResult = function() 
	{
		throw "Invalid command \"setResult\" in StateWaitingForCustomResult!";
	}
	self.choice = function()
	{
		throw "Invalid command \"choice\" in StateWaitingForCustomResult!";
	}
	self.setChoiceResult = function()
	{
		throw "Invalid command \"setChoiceResult\" in StateWaitingForCustomResult!";
	}
	self.onResult = function() 
	{
		setStateCallback(StateMachineContext.STATE_IDLE);
		controller.customResultReceived();
	}
	self.getState = function() 
	{
		return StateMachineContext.STATE_WAITING_FOR_CUSTOM_RESULT;
	}
}