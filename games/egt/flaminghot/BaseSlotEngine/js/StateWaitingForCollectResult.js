/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateWaitingForCollectResult(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function()
	{
		throw "Invalid command \"spin\" in StateWaitingForCollectResult!";
	}
	self.gamble = function()
	{
		throw "Invalid command \"gamble\" in StateWaitingForCollectResult!";
	}
	self.collect = function()
	{
		throw "Invalid command \"collect\" in StateWaitingForCollectResult!";
	}
	self.jackpot = function()
	{
		throw "Invalid command \"jackpot\" in StateWaitingForCollectResult!";
	}
	self.setResult = function()
	{
		throw "Invalid command \"setResult\" in StateWaitingForCollectResult!";
	}
	self.onResult = function()
	{
		var message = GameSettings.getInstance().serverMessage;
		if (message.state == BaseMessage.STATE_IDLE)
			setStateCallback(StateMachineContext.STATE_IDLE);
		else if (message.state == BaseMessage.STATE_JACKPOT)
			setStateCallback(StateMachineContext.STATE_JACKPOT);
		else
		{
			throw "Invalid message state in \"onResult\" command in StateWaitingForCollectResult!";
			return;
		}
		controller.collectReceived();
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_WAITING_FOR_COLLECT_RESULT;
	}
}