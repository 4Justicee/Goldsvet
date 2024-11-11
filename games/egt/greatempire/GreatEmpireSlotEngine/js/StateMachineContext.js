/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function StateMachineContext(initialState, controller)
{
	var self = this;
	
	var _state;
	var _stateIdle;
	var _stateWin;
	var _stateGamble;
	var _stateJackpot;
	var _stateWaitingForSpinResult;
	var _stateWaitingForGambleResult;
	var _stateWaitingForJackpotResult
	var _stateWaitingForCollectResult;
	var _stateWaitingForCustomResult;
	var _stateWaitingForChoiceResult;
	var _stateWaitingForCustomChoiceResult;

	function constructor()
	{
		_stateIdle = new StateIdle(controller, setState);
		_stateWin = new StateWin(controller, setState);
		_stateGamble = new StateGamble(controller, setState);
		_stateJackpot = new StateJackpot(controller, setState);
		_stateWaitingForSpinResult = new StateWaitingForSpinResult(controller, setState);
		_stateWaitingForGambleResult = new StateWaitingForGambleResult(controller, setState);
		_stateWaitingForJackpotResult = new StateWaitingForJackpotResult(controller, setState);
		_stateWaitingForCollectResult = new StateWaitingForCollectResult(controller, setState);
		_stateWaitingForCustomResult = new StateWaitingForCustomResult(controller, setState);
		_stateWaitingForChoiceResult = new StateWaitingForChoiceResult(controller, setState);
		_stateWaitingForCustomChoiceResult = new StateWaitingForCustomChoiceResult(controller, setState);
		
		if (initialState == StateMachineContext.STATE_IDLE)
			_state = _stateIdle;
		else if (initialState == StateMachineContext.STATE_WIN)
			_state = _stateWin;
		else if (initialState == StateMachineContext.STATE_GAMBLE)
			_state = _stateGamble;
		else if (initialState == StateMachineContext.STATE_JACKPOT)
			_state = _stateJackpot;
		else 
			throw "Invalid initial state in StateMachineContext contructor!";
	}
	
	self.spin = function()
	{
		_state.spin();
	}
	self.gamble = function()
	{
		_state.gamble();
	}
	self.jackpot = function()
	{
		_state.jackpot();
	}
	self.collect = function()
	{
		_state.collect();
	}
	self.choice = function()
	{
		_state.choice();
	}
	self.setResult = function()
	{
		_state.setResult();
	}
	self.onResult = function()
	{
		_state.onResult();
	}
	self.setChoiceResult = function()
	{
		_state.setChoiceResult();
	}
	self.getState = function()
	{
		return _state.getState();
	}
	
	var setState = function(state)
	{
		if(state == StateMachineContext.STATE_IDLE)
			_state = _stateIdle;
		else if(state == StateMachineContext.STATE_WIN)
			_state = _stateWin;
		else if(state == StateMachineContext.STATE_GAMBLE)
			_state = _stateGamble;
		else if(state == StateMachineContext.STATE_JACKPOT)
			_state = _stateJackpot;
		else if(state == StateMachineContext.STATE_WAITING_FOR_SPIN_RESULT)
			_state = _stateWaitingForSpinResult;
		else if(state == StateMachineContext.STATE_WAITING_FOR_GAMBLE_RESULT)
			_state = _stateWaitingForGambleResult;
		else if(state == StateMachineContext.STATE_WAITING_FOR_JACKPOT_RESULT)
			_state = _stateWaitingForJackpotResult;
		else if(state == StateMachineContext.STATE_WAITING_FOR_COLLECT_RESULT)
			_state = _stateWaitingForCollectResult;
		else if(state == StateMachineContext.STATE_WAITING_FOR_CUSTOM_RESULT)
			_state = _stateWaitingForCustomResult;
		else if(state == StateMachineContext.STATE_WAITING_FOR_CHOICE_RESULT)
			_state = _stateWaitingForChoiceResult;
		else if(state == StateMachineContext.STATE_WAITING_FOR_CUSTOM_CHOICE_RESULT)
			_state = _stateWaitingForCustomChoiceResult;
	}

	constructor();
}

StateMachineContext.STATE_IDLE = 0;
StateMachineContext.STATE_WIN = 1;
StateMachineContext.STATE_GAMBLE = 2;
StateMachineContext.STATE_JACKPOT = 3;
StateMachineContext.STATE_WAITING_FOR_SPIN_RESULT = 4;
StateMachineContext.STATE_WAITING_FOR_GAMBLE_RESULT = 5;
StateMachineContext.STATE_WAITING_FOR_JACKPOT_RESULT = 6;
StateMachineContext.STATE_WAITING_FOR_COLLECT_RESULT = 7;
StateMachineContext.STATE_WAITING_FOR_CUSTOM_RESULT = 8;
StateMachineContext.STATE_WAITING_FOR_CHOICE_RESULT = 9;
StateMachineContext.STATE_WAITING_FOR_CUSTOM_CHOICE_RESULT = 10;