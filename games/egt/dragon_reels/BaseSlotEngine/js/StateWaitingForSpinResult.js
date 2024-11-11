/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateWaitingForSpinResult(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function()
	{
		throw "Invalid command \"spin\" in StateWaitingForSpinResult!";
	}
	self.gamble = function()
	{
		throw "Invalid command \"gamble\" in StateWaitingForSpinResult!";
	}
	self.jackpot = function() 
	{
		throw "Invalid command \"jackpot\" in StateWaitingForSpinResult!";
	}
	self.collect = function() 
	{
		throw "Invalid command \"collect\" in StateWaitingForSpinResult!";
	}
	self.setResult = function()
	{
		throw "Invalid command \"setResult\" in StateWaitingForSpinResult!";
	}
	self.onResult = function()
	{
		var settings = GameSettings.getInstance();
	
		if (settings.serverMessage.type == BaseMessage.SPIN)
		{
			setStateCallback(StateMachineContext.STATE_WIN);
			controller.spinReceived();
		}
		else if (settings.serverMessage.type == BaseMessage.COLLECT)
		{
			setStateCallback(StateMachineContext.STATE_IDLE);
			controller.setTerminalInsufficientBalanceVisualState();
		}
		else
			throw "Invalid message type " + settings.serverMessage.type + " in StateWaitingForSpinResult!";
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_WAITING_FOR_SPIN_RESULT;
	}
}