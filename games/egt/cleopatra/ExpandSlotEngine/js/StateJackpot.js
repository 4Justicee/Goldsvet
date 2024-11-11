/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateJackpot(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function()
	{
		throw "Invalid command \"spin\" in StateJackpot!";
	}
	self.gamble = function()
	{
		throw "Invalid command \"gamble\" in StateJackpot!";
	}
	self.jackpot = function()
	{
		setStateCallback(StateMachineContext.STATE_WAITING_FOR_JACKPOT_RESULT);
		controller.sendJackpot();
	}
	self.collect = function()
	{
		throw "Invalid command \"collect\" in StateJackpot!";
	}
	self.setResult = function()
	{
		throw "Invalid command \"setResult\" in StateJackpot!";
	}
	self.onResult = function()
	{
		throw "Invalid command \"onResult\" in StateJackpot!";
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_JACKPOT;
	}
}