/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateWaitingForJackpotResult(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function()
	{
		throw "Invalid command \"spin\" in StateWaitingForJackpotResult!";
	}
	self.gamble = function() 
	{
		throw "Invalid command \"gamble\" in StateWaitingForJackpotResult!";
	}
	self.collect = function() 
	{
		throw "Invalid command \"collect\" in StateWaitingForJackpotResult!";
	}
	self.jackpot = function() 
	{
		throw "Invalid command \"jackpot\" in StateWaitingForJackpotResult!";
	}
	self.setResult = function()
	{
		throw "Invalid command \"setResult\" in StateWaitingForJackpotResult!";
	}
	self.choice = function()
	{
		throw "Invalid command \"choice\" in StateWaitingForJackpotResult!";
	}
	self.setChoiceResult = function()
	{
		throw "Invalid command \"setChoiceResult\" in StateWaitingForJackpotResult!";
	}
	self.onResult = function() 
	{
		var message = GameSettings.getInstance().serverMessage;
		if (message.type != BaseMessage.JACKPOT)
		{
			throw "Invalid message type in \"onResult\" command in StateWaitingForJackpotResult!";
			return;
		}
			
		if (message.state == BaseMessage.STATE_IDLE)
		{
			setStateCallback(StateMachineContext.STATE_IDLE);
			controller.jackpotReceived();
		}
		else if (message.state == BaseMessage.STATE_JACKPOT)
		{
			setStateCallback(StateMachineContext.STATE_JACKPOT);
			controller.jackpotReceived();
		}
		else
			throw "Invalid message state in \"onResult\" command in StateWaitingForJackpotResult!";
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_WAITING_FOR_JACKPOT_RESULT;
	}
}