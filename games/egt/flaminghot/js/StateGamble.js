/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateGamble(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function() 
	{
		throw "Invalid command \"spin\" in StateGamble!";
	}
	self.gamble = function()
	{
		setStateCallback(StateMachineContext.STATE_WAITING_FOR_GAMBLE_RESULT);
		controller.setWaitingForGambleResultVisualState();
		controller.sendGamble();
	}
	self.jackpot = function()
	{
		throw "Invalid command \"jackpot\" in StateGamble!";
	}
	self.collect = function()
	{
		setStateCallback(StateMachineContext.STATE_WAITING_FOR_COLLECT_RESULT);
		controller.hideGamble();
		controller.sendCollect();
	}
	self.setResult = function()
	{
		throw "Invalid command \"setResult\" in StateGamble!";
	}
	self.onResult = function()
	{
		throw "Invalid command \"onResult\" in StateGamble!";
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_GAMBLE;
	}
}