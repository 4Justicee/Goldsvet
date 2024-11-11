/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateWin(controller, setStateCallback)
{
	var self = this;
	
	self.spin = function()
	{
		var settings = GameSettings.getInstance();
		var message = settings.serverMessage;
		if (message.type != BaseMessage.SPIN)
		{
			throw "Invalid message type in \"spin\" command in StateWin!";
			return;
		}
		
		if (controller.getWinMoneyAnimating())
		{
			throw "Invalid command \"spin\" while win money are animating in StateWin!";
			return;
		}
			
		if (message.state == BaseMessage.STATE_IDLE || message.state == BaseMessage.STATE_FREESPIN)
		{
			if (message.state == BaseMessage.STATE_IDLE && settings.balance < controller.bet())
			{
				setStateCallback(StateMachineContext.STATE_IDLE);
				controller.setInsufficientBalanceVisualState();
				return;
			}
			setStateCallback(StateMachineContext.STATE_WAITING_FOR_SPIN_RESULT);
			controller.setWaitingForSpinResultVisualState();
			controller.sendSpin();
		}
		else if (message.state == BaseMessage.STATE_GAMBLE)
		{
			if (settings.balance + message.winAmount < controller.bet())
			{
				setStateCallback(StateMachineContext.STATE_WAITING_FOR_COLLECT_RESULT);
				controller.setInsufficientBalanceVisualState();
				controller.sendCollect();
				return;
			}
			setStateCallback(StateMachineContext.STATE_WAITING_FOR_COLLECT_RESULT);
			controller.setWaitingForSpinResultVisualState();
			controller.sendCollect();
		}
		else
			throw "Invalid message state in \"spin\" command in StateWin!";
	}
	self.gamble = function()
	{
		var message = GameSettings.getInstance().serverMessage;
		if (message.type != BaseMessage.SPIN)
		{
			throw "Invalid message type in \"gamble\" command in StateWin!";
			return;
		}
			
		if (message.state != BaseMessage.STATE_GAMBLE)
		{
			throw "No gamble allowed in StateWin!";
			return;
		}
		
		setStateCallback(StateMachineContext.STATE_GAMBLE);
		controller.showGamble();
	}
	self.jackpot = function()
	{
		var message = GameSettings.getInstance().serverMessage;
		if (message.type != BaseMessage.SPIN)
		{
			throw "Invalid message type in \"jackpot\" command in StateWin!";
			return;
		}
			
		if (message.state != BaseMessage.STATE_JACKPOT)
		{
			throw "No jackpot allowed in StateWin!";
			return;
		}
		
		setStateCallback(StateMachineContext.STATE_JACKPOT);
		controller.showJackpot();
	}
	self.collect = function() 
	{
		var message = GameSettings.getInstance().serverMessage;
		if (message.type != BaseMessage.SPIN)
		{
			throw "Invalid message type in \"collect\" command in StateWin!";
			return;
		}
		
		if (controller.getWinMoneyAnimating())
		{
			throw "Invalid command \"collect\" while win money are animating in StateWin!";
			return;
		}
		
		if (message.state == BaseMessage.STATE_IDLE)
		{
			setStateCallback(StateMachineContext.STATE_IDLE);
			controller.setIdleVisualState();
		}
		else if (message.state == BaseMessage.STATE_GAMBLE)
		{
			setStateCallback(StateMachineContext.STATE_WAITING_FOR_COLLECT_RESULT);
			controller.setWaitingForCollectVisualState();
			controller.sendCollect();
		}
		else
			throw "Invalid message state in \"collect\" command in StateWin!";
	}
	self.choice = function()
	{
		var message = GameSettings.getInstance().serverMessage;
		if (!message)
		{
			throw new Error("Invalid message type in \"choice\" command in StateWin!");
			return;
		}

		if (message.state == BaseMessage.STATE_CHOICE)
		{
			setStateCallback(StateMachineContext.STATE_WAITING_FOR_CHOICE_RESULT);
			controller.sendChoice(); 
		}
		else
			throw new Error("Invalid message state in \"choice\" command in StateWin!");
		
	}
	self.setResult = function()
	{
		if (GameSettings.getInstance().balance < controller.bet())
		{
			throw new Error("The balance should not be insufficient in command \"setResult\" in StateWin!");
			return;
		}
		setStateCallback(StateMachineContext.STATE_WAITING_FOR_CUSTOM_RESULT);
		controller.setWaitingForSpinResultVisualState();
		controller.sendCustomResult();
	}
	self.setChoiceResult = function()
	{
		setStateCallback(StateMachineContext.STATE_WAITING_FOR_CUSTOM_CHOICE_RESULT);
		controller.sendCustomChoiceResult();
	}
	self.onResult = function()
	{
		throw "Invalid command \"onResult\" in StateWin!";
	}
	self.getState = function()
	{
		return StateMachineContext.STATE_WIN;
	}
}