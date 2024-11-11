/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

EventDispatcher("ReelView",
{
	REEL_IDLE 		: 0,
	REEL_STARTING 	: 1,
	REEL_ROTATING 	: 2,
	REEL_STOPPING 	: 3,
	REEL_BOUNCING 	: 4,

	REEL_BOUNCED	: "reelBounced",
	REEL_STOPPED	: "reelStopped"
},
(function()
{
	var p = 
	{
		init: function(config, reelIndex)
		{
			this._super();
			
			// PRIVATE PROPERTIES
			this._reel_index		= reelIndex;		
			this._x 				= 0;						// the x and y coordinates of the reel calculated based
			this._y					= 0;						// on the config settings
			this._config 			= config; 					// reel view config (image size, number of images etc.)	
			this._fake_reel			= null;						// the fake reel to rotate
			this._real_reel			= null;						// the real reel to rotate (it should be of the same size as the _fake_reel, -1`s tell the draw function
																// that the image to be drawn should be taken from the _fake_reel
			this._reel_length		= 0;						// the length of the _fake_reel respectively of the _real_reel
			this._result			= null;						// the result that the reel should stop on
			this._offset			= this._config.imageHeight;	// current offset in the reel (in pixels)
			this._final_offset 		= 0;
			this._drawn_once		= false;					// indicates whether the reel is drawn at least once (if the state is REEL_IDLE and _drawnOnce
																// is true the reel is not redrawn)
			this._state				= ReelView.REEL_IDLE;		// the state of the reel
			this._state_next		= ReelView.REEL_IDLE;		// the next state the reel should go to
			this._stop_after_start	= false;					// this flag should be true if the reels should stop before they event started rotating(this can happen if the reels
																// are requested to stop during their REEL_STARTING phase)
			this._stopped_state		= ReelView.REEL_IDLE;
			this._rotating			= false;
			this._dist_to_end 		= -1;
			this._source_rect		= new Object();
			this._dest_point		= new Object();
			this._result_index		= -1;
			this._bounce			= 0;
			this._dispatchStop		= false;
			this._tween				= null;
			
			this._x = this._config.reelCoordX + this._reel_index * ( this._config.reelWidth + this._config.reelSpacing);
			this._y = this._config.reelCoordY;
			this._bounce = Math.floor(this._config.reelRotationDirection * this._config.imageHeight * this._config.reelStopBouncePercent / 100);
			
			this._dest_point.x = this._x;
		},
		
		// PUBLIC METHODS
		getSetOffset: function(value)
		{
			if(value == undefined) 
				return this._offset;
			else
				this._offset = value;
		},
		getIndex: function() { return this._reel_index; },
		getState: function()
		{
			switch(this._state)
			{
				case ReelView.REEL_STARTING:
				case ReelView.REEL_ROTATING:
					return ReelView.REEL_ROTATING;
				case ReelView.REEL_STOPPING:
				case ReelView.REEL_BOUNCING:
					return ReelView.REEL_STOPPING;
			}
			return ReelView.REEL_IDLE;
		},

		changeFakeReel: function(arr)
		{
			this._reel_length = arr.length;
			this._fake_reel = new Array();
			this._real_reel = new Array();
			for (var i = 0;i < this._reel_length;i++)
			{
				this._fake_reel[i] = arr[i];
				this._real_reel[i] = -1;
			}
			var len = this._result.length;
			for (i = 0; i < len; i++)
				this._real_reel[i] = this._result[i];
			this._offset = this._config.imageHeight;
		},
		
		setFakeReel: function(arr)
		{
			if(this._fake_reel)
				throw "Trying to set the fake reel of reel " + this._reel_index + " twice";
				
			this._reel_length = arr.length;
			this._fake_reel = [];
			this._real_reel = [];
			for (var i = 0;i < this._reel_length;i++)
			{
				this._fake_reel[i] = arr[i];
				this._real_reel[i] = -1;
			}
			this._result = [];
			clearResult.call(this);
		},

		setResult: function(result, show_now)
		{
			var start_index = this._reel_index * (this._config.numReelImages + 2);
			var image = ( getCurrentTopImage.call(this) + this._reel_length - 1 ) % this._reel_length;
			if (show_now)
				this._result_index = image;
			var len = this._config.numReelImages + 2;
			for (var i = 0;i < len;i++)
			{
				if ( show_now ) {
					this._real_reel[image] = result[start_index + i];
					image = (image + 1) % this._reel_length;
				}
				this._result[i] = result[i + start_index];
			}
			this._drawn_once = false;
			if (show_now)
				this.draw(1);
		},
		
		start: function()
		{
			if (this._state == ReelView.REEL_IDLE)
			{
				clearResult.call(this);
				changeState.call(this, ReelView.REEL_STARTING);
				this._stopAfterStart = false;
			}
		},
		
		stop: function(dist_to_end)
		{
			if( dist_to_end == undefined) dist_to_end = 0;
			
			switch(this._state)
			{
				case ReelView.REEL_STARTING:
					this._dist_to_end = -1;
					this._stop_after_start = true;
					this._stopped_state = ReelView.REEL_STARTING;
					break;
				case ReelView.REEL_ROTATING:
					this._dist_to_end = dist_to_end;
					changeState.call(this, ReelView.REEL_STOPPING);
					this._stopped_state = ReelView.REEL_ROTATING;
					break;
				case ReelView.REEL_STOPPING:
					this._offset = this._final_offset - (this._config.reelRotationDirection == 1 ? dist_to_end : -dist_to_end);
					this._stopped_state = ReelView.REEL_STOPPING;
					break;
			}
		},
		
		getDistToStop: function()
		{
			if (this._state == ReelView.REEL_STOPPING)
				return Math.abs(this._offset - this._final_offset);
			return -1;
		},
		
		clearCell: function(cell)
		{
			this._config.context.clearRect(this._x, this._y + cell * this._config.imageHeight, this._config.reelWidth, this._config.imageHeight);
		},
		
		redraw: function()
		{
			this._drawn_once = false;
			this.draw(1);
		},
		
		draw: function(compensation)
		{
			if(this._state == ReelView.REEL_IDLE && this._drawn_once)
				return;

			this._drawn_once = true;
			
			var rotation_speed;
			if(this._rotating)
				rotation_speed = this._config.reelRotationSpeed*compensation*this._config.reelRotationDirection;
			else
				rotation_speed = 0;
			
			var offset = this._offset;
			this._offset += rotation_speed;
			
			if (this._state == ReelView.REEL_STOPPING)
			{
				if (this._config.reelRotationDirection == 1 && this._offset >= this._final_offset || this._config.reelRotationDirection == -1 && this._offset <= this._final_offset)
				{
					this._offset = this._final_offset;
					changeState.call(this, ReelView.REEL_BOUNCING);
				}
			}
			
			var reel_pixels = this._reel_length * this._config.imageHeight;
			offset = offset % reel_pixels;
			if ( offset < 0 )
				offset = reel_pixels + offset;
			
			this._source_rect.y = offset % this._config.imageHeight;
			this._source_rect.width = this._config.reelWidth;
			this._source_rect.height = this._config.imageHeight-this._source_rect.y;
			
			this._dest_point.y = 0;

			var image_index = Math.floor(offset / this._config.imageHeight);
			var image;

			if (this._config.reelRotationDirection == 1)
				this._real_reel[(image_index + this._reel_length - 1) % this._reel_length] = -1;

			while(this._dest_point.y < this._config.reelHeight)
			{
				image = this._real_reel[image_index];
				if(image < 0)
					image = this._fake_reel[image_index];
				
				this._source_rect.x = this._config.cardsInfo[image].x;
				this._source_rect.y += this._config.cardsInfo[image].y;
				if(this._config.transparentReels == true)
					this._config.context.clearRect( this._dest_point.x, this._dest_point.y+this._y, this._source_rect.width, this._source_rect.height);
					
				this._config.context.drawImage(this._config.reelImages[this._config.cardsInfo[image].reelImageIndex], this._source_rect.x, this._source_rect.y, 
											   this._source_rect.width, this._source_rect.height, this._dest_point.x, this._dest_point.y+this._y, 
											   this._source_rect.width, this._source_rect.height);
				//_config.context.fillStyle = "#ff0000";
				//_config.context.fillRect(_dest_point.x, _dest_point.y+_y, _source_rect.width, _source_rect.height);
				this._dest_point.y += this._source_rect.height;
				image_index = (image_index + 1) % this._reel_length;
				
				this._source_rect.y = 0;
				this._source_rect.height = this._config.imageHeight - Math.max(0, this._dest_point.y - this._config.imageHeight * (this._config.numReelImages-1));
				
			}

			if (this._config.reelRotationDirection == -1)
			{
				var stop_index = this._result_index == -1 ? 
								(getCurrentTopImage.call(this) + this._reel_length - 2) % this._reel_length : 
								(this._result_index + this._reel_length - 1) % this._reel_length;
				do
				{
					image_index++;
					image_index = image_index % this._reel_length;
					this._real_reel[image_index] = -1;
				} while(image_index != stop_index);
			}
			
			if(this._dispatchStop)
			{
				changeState.call(this, ReelView.REEL_IDLE);
				this._dispatchStop = false;
				this.dispatchEvent(new Event(ReelView.REEL_STOPPED));
			}
		},
		
		dispose: function()
		{
			this._config = null;
			if(this._tween)
			{
				this._tween.kill();
				this._tween = null;
			}
			
			this._super();
		}
	};

	// PRIVATE METHODS
	function clearResult()
	{
		var len = this._result.length;
		for (i = 0;i < len;i++)
			this._result[i] = -1;
	}
	
	function getCurrentTopImage()
	{
		var reel_pixels = this._config.imageHeight * this._reel_length;
		var idx = this._offset % reel_pixels;
		if ( idx < 0 )
			idx = reel_pixels + idx;
		return Math.floor(idx / this._config.imageHeight);
	}

	function changeState(state)
	{
		this._state = state;
		
		switch(state)
		{
		case ReelView.REEL_STARTING:
			//_offset = _offset % (_fakeReel.length * _imageHeight);
				//if (_offset < 0)
					//_offset += _fakeReel.length * _imageHeight;
			//_tween = TweenMax.to(this, _config.reelStartBounceTime ? _config.reelStartBounceTime : (_config.reelRotationSpeed * 2)/1000, 
							//{offset:_offset + _movingDirection * _imageHeight, ease:_config.reelStartBounceTime ? Back.easeIn : Sine.easeIn, onComplete:onTweenEnd, roundProps:["offset"]});
			//_state_next = ReelView.REEL_ROTATING;
			
			// TODO: implement the possibility of reel acceleration
			this._rotating = false;
			
			changeState.call(this, ReelView.REEL_ROTATING);
			break;
		case ReelView.REEL_ROTATING:

			this._rotating = true;
			
			if(this._stop_after_start)
				changeState.call(this, ReelView.REEL_STOPPING);
		break;
		case ReelView.REEL_STOPPING:

			var offset = this._offset;
			var stop_offset = offset + this._config.reelRotationDirection * (this._config.numReelImages + 2) * this._config.imageHeight;
			
			// --- round the offset forward along the reel movement to the closest symbol boundary
			
			var frac = stop_offset % this._config.imageHeight;
			if ( frac != 0 )
			{
				if ( this._config.reelRotationDirection > 0 )
					stop_offset += this._config.imageHeight - frac;
				else
					if ( stop_offset < 0 )
						stop_offset -= this._config.imageHeight + frac;
					else
						stop_offset -= frac;
			}

			// --- plant the real slots into the reel
			
			var reel_pixels = this._reel_length * this._config.imageHeight;
			var img = stop_offset % reel_pixels;
			if ( img < 0 ) img += reel_pixels;
			img = Math.floor(img / this._config.imageHeight);
			
			this._result_index = img;
			var len = this._result.length;
			for ( var j = 0; j < len; ++j )
			{
				this._real_reel[img] = this._result[j];
				img = (img + 1) % this._reel_length;
			}
			
			stop_offset -= this._config.reelRotationDirection * this._config.imageHeight; // compensate for the 1 guarding symbol of the real reel
			stop_offset += this._bounce;  // bounce
			this._final_offset = stop_offset;
			
			if ( this._dist_to_end > 0 )
				this._offset = this._final_offset - ( this._config.reelRotationDirection == 1 ? this._dist_to_end : -this._dist_to_end );
			break;
		case ReelView.REEL_BOUNCING:
			this.dispatchEvent(new Event(ReelView.REEL_BOUNCED));
			
			this._rotating = false;
			
			var self = this;
			this._tween = TweenMax.to(this, this._config.reelStopBounceTime, {getSetOffset:this._offset - this._bounce, ease:"Cubic.easeOut", onComplete:function(){
				onTweenEnd.call(self);
			}, roundProps:"getSetOffset"});
			this._state_next = ReelView.REEL_IDLE;
			break;
		}
	}
	
	function onTweenEnd()
	{
		if (this._state_next == ReelView.REEL_IDLE)
		{
			this._dispatchStop = true;
			this._drawn_once = false;
		}
		else
			changeState.call(this, this._state_next);
		this._tween = null;
	}
	
	return p;
})());
