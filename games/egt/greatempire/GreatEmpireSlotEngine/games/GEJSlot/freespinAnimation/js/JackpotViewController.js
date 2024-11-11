/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("JackpotViewController",
{
	JACKPOT_RESULT_SHOWN: "jackpotResultShown"
},
(function()
{
	var p =
	{
		init: function(jackpotGameState, animated)
		{
			this._cardClickSoundChannel = null;
			this._cardClickSoundRequested = false;
			this._numberOfCardOpenSoundsPlaying = 0;
			
			this._super();
			
			var settings = GameSettings.getInstance();
			
			this._view = new JackpotView({animated: animated}, jackpotGameState);
			this._view.addEventListener(JackpotView.JACKPOT_SHOWN, onJackpotShown, this);
			this._view.addEventListener(JackpotView.JACKPOT_CARD_CLICK, onJackpotCardClick, this);
			
			var soundManager = SoundManager.getInstance();
			soundManager.play("jackpotIntroSound");
			soundManager.addEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);

			$(document).bind("keyup", this, onKeyUp);
		},
		
		show: function() { this._view.show(); },
		
		getCardPos: function() { return this._view.getCardPos(); },
		
		setResult: function() 
		{ 
			var settings = GameSettings.getInstance();
			var message = settings.serverMessage;
			if (message.type != BaseMessage.JACKPOT)
			{
				throw "Setting jackpot result from invalid message type in JackpotViewController!";
				return;
			}

			this._view.setCard(message.card, message.state == BaseMessage.STATE_IDLE, message.winLevel, message.winAmount);
			stopCardClick.call(this);
			var self = this;
			this._numberOfCardOpenSoundsPlaying++;
			SoundManager.getInstance().play("jackpotCardOpenSound", false, function()
			{
				self._numberOfCardOpenSoundsPlaying--;
				
				// don't use the message we previously got because by the time the sound has ended
				// we may have received a new message with different state
				if(settings.serverMessage.state != BaseMessage.STATE_IDLE)
					startCardClick.call(self);
				else if(self._numberOfCardOpenSoundsPlaying == 0)
				{
					self._view.startWinAnimation();
					self.dispatchEvent(new Event(JackpotViewController.JACKPOT_RESULT_SHOWN));
				}
			});
		},
		
		dispose: function() 
		{ 
			SoundManager.getInstance().removeEventListener(SoundManager.SOUND_LOADED, onSoundLoaded, this);

			$(document).unbind("keyup", onKeyUp);
			
			stopCardClick.call(this);
			
			this._view.removeEventListener(JackpotView.JACKPOT_SHOWN, onJackpotShown, this);
			this._view.removeEventListener(JackpotView.JACKPOT_CARD_CLICK, onJackpotCardClick, this);
			
			this._super();
		}
	};

	function onKeyUp(event)
	{
		console.log(event);

		var self = event.data;
		if(event.keyCode == 81)
			self._view.performClickOnCard(0);
		else if(event.keyCode == 87)
			self._view.performClickOnCard(1);
		else if(event.keyCode == 69)
			self._view.performClickOnCard(2);
		else if(event.keyCode == 82)
			self._view.performClickOnCard(3);
		else if(event.keyCode == 65)
			self._view.performClickOnCard(4);
		else if(event.keyCode == 83)
			self._view.performClickOnCard(5);
		else if(event.keyCode == 68)
			self._view.performClickOnCard(6);
		else if(event.keyCode == 70)
			self._view.performClickOnCard(7);
		else if(event.keyCode == 90)
			self._view.performClickOnCard(8);
		else if(event.keyCode == 88)
			self._view.performClickOnCard(9);
		else if(event.keyCode == 67)
			self._view.performClickOnCard(10);
		else if(event.keyCode == 86)
			self._view.performClickOnCard(11);
	}

	function startCardClick() 
	{ 
		if(this._cardClickSoundChannel)
			return;
			
		this._cardClickSoundChannel = SoundManager.getInstance().play("jackpotCardClickSound", true); 
		this._cardClickSoundRequested = !this._cardClickSoundChannel;
	}
	
	function stopCardClick()
	{
		this._cardClickSoundRequested = false;
		
		if(!this._cardClickSoundChannel)
			return;
			
		this._cardClickSoundChannel = SoundManager.getInstance().stop(this._cardClickSoundChannel);
		
	}
	
	function onJackpotShown(event)
	{
		startCardClick.call(this);
		
		this.dispatchEvent(event);
	}
	
	function onJackpotCardClick(event) { this.dispatchEvent(event); }
	
	function onSoundLoaded(event)
	{
		if(event.data.soundIndex == 4 && this._cardClickSoundRequested)
			startCardClick.call(this);
	}
	
	return p;
})());