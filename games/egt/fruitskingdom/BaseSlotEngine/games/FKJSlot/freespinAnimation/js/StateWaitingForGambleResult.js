/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateWaitingForGambleResult(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function()
	{
		throw "Invalid command \"spin\" in StateWaitingForGambleResult!";
	}
	self.gamble = function()
	{
		throw "Invalid command \"gamble\" in StateWaitingForGambleResult!";
	}
	self.jackpot = function()
	{
		throw "Invalid command \"jackpot\" in StateWaitingForGambleResult!";
	}
	self.collect = function()
	{
		throw "Invalid command \"collect\" in StateWaitingForGambleResult!";
	}
	self.setResult = function()
	{
		throw "Invalid command \"setResult\" in StateWaitingForGambleResult!";
	}
	self.onResult = function()
	{
		var message = GameSettings.getInstance().serverMessage;
		if (message.type != BaseMessage.GAMBLE)
		{
			throw "Invalid message type in \"onResult\" command in StateWaitingForGambleResult!";
			return;
		}
			
		if (message.state == BaseMessage.STATE_IDLE)
		{
			setStateCallback(StateMachineContext.STATE_IDLE);
			controller.gambleReceived();
		}
		else if (message.state == BaseMessage.STATE_GAMBLE)
		{
			setStateCallback(StateMachineContext.STATE_GAMBLE);
			controller.gambleReceived();
		}
		else if (message.state == BaseMessage.STATE_JACKPOT)
		{
			setStateCallback(StateMachineContext.STATE_JACKPOT);
			controller.gambleReceived();
		}
		else
			throw "Invalid message state in \"onResult\" command in StateWaitingForGambleResult!";
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_WAITING_FOR_GAMBLE_RESULT;
	}
}