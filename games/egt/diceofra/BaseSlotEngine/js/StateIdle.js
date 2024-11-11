/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateIdle(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function() 
	{
		if (controller.getWinMoneyAnimating())
		{
			throw "Not all conditions are met to start a new spin from StateIdle (winMoneyAnimating: " + controller.getWinMoneyAnimating() + ")";
			return;
		}
		
		if (GameSettings.getInstance().balance < controller.bet())
		{ 
			controller.setInsufficientBalanceVisualState();
			return;
		}
		setStateCallback(StateMachineContext.STATE_WAITING_FOR_SPIN_RESULT);
		controller.setWaitingForSpinResultVisualState();
		controller.sendSpin();
	}
	self.gamble = function()  
	{
		throw "Invalid command \"gamble\" in StateIdle!";
	}
	self.jackpot = function() 
	{
		throw "Invalid command \"jackpot\" in StateIdle!";
	}
	self.collect = function() 
	{
		throw "Invalid command \"collect\" in StateIdle!";
	}
	self.setResult = function() 
	{
		if (GameSettings.getInstance().balance < controller.bet())
		{
			throw "The balance should not be insufficient in command \"setResult\" in StateIdle!";
			return;
		}
		setStateCallback(StateMachineContext.STATE_WAITING_FOR_CUSTOM_RESULT);
		controller.setWaitingForSpinResultVisualState();
		controller.sendCustomResult();
	}
	self.onResult = function() 
	{
		throw "Invalid command \"onResult\" in StateIdle!";
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_IDLE;
	}
}