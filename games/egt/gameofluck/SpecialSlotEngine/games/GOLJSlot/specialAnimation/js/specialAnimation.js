CanvasView("SpecialAnimation",
{
},
(function()
{
	var p = 
	{
		init: function(config)
		{
			this._super();
			this.videoWidth = 325;
			this.videoHeight= 287;
			this.transparent = true;
			this.frameNumber = 0;

			this.setSize(650 , 574);
			this.img = Loader.getLoader("SpecialSlotEngine/games/GOLJSlot/specialAnimation/images/rainbow_half.png").getData();
			this._numberOfColomsInSpriteSheet = 10;

			this.framesToEventsMap = 
			[
				{frame:1 , events:["ShowVideo2.1"]},
				{frame:2 , events:["ShowVideo1.1"]},
				{frame:3 , events:["ShowVideo1.2"]},
				{frame:4 , events:["ShowVideo1.3"]},
				{frame:5 , events:["ShowVideo1.4","ShowVideo2.2"]},
				{frame:6 , events:["ShowVideo1.5"]},
				{frame:7 , events:["ShowVideo1.6","ShowVideo2.3"]},
				{frame:8 , events:["ShowVideo1.7","ShowVideo2.4"]},
				{frame:9 , events:["ShowVideo1.8"]},
				{frame:10 , events:["ShowVideo2.5"]},
				{frame:11 , events:[]},
				{frame:12 , events:[]}
			];
			// this.draw();
		},
		changeFrame:function()
		{
			
			if(this.frameNumber == this.framesToEventsMap.length-1)
			{
				this.dispatchEvent(new Event("LastFrameReached"));
				
			}
			else
			{
				draw.call(this);
				if(this.framesToEventsMap[this.frameNumber].events.length != 0)
				{
					for (var i = 0; i < this.framesToEventsMap[this.frameNumber].events.length; i++)
					{
						this.dispatchEvent(new Event(this.framesToEventsMap[this.frameNumber].events[i]));
					}
				}
	
				++this.frameNumber; 
			}
		},
		dispose:function()
		{
			this._super();
		}
	};
	function draw()
	{
		if(this.transparent)
			this._context.clearRect(0,0,650,574);	

		var imgX = (this.frameNumber % this._numberOfColomsInSpriteSheet)* this.videoWidth;
		var imgY = Math.floor(this.frameNumber / this._numberOfColomsInSpriteSheet) * this.videoHeight;
		this._context.drawImage(this.img,imgX,imgY ,this.videoWidth,this.videoHeight,0,0,this.videoWidth*2,this.videoHeight*2);		
	}
	return p;

})());