$.Class("ViewportHandler",
{
},
(function()
{
	var p =
	{
		init: function(width, height)
		{
			this._width 				= width;
			this._height 				= height;
			this._aspectRatio			= width/height;
			this._isFullscreen			= false;
			this._isLoadingInProgress 	= false;
			this._window				= $(window);
			this._body					= $("body");
			this._game          		= $("#Game");
			this._viewport 				= $("#GameViewport");
			this._orientation   		= $("#Orientation");
			this._fullscreen    		= $("#FullScreen");
			this._loading       		= $("#Loading");
			
			var fullscreenFunction = undefined;
			if(document.documentElement.requestFullscreen)
	    		fullscreenFunction = document.documentElement.requestFullscreen;
	    	else if (document.documentElement.mozRequestFullScreen)
	    		fullscreenFunction = document.documentElement.mozRequestFullScreen;
	    	else if (document.documentElement.webkitRequestFullScreen)
	    		fullscreenFunction = document.documentElement.webkitRequestFullScreen;
			
			document.documentElement.requestFullscreen = fullscreenFunction;

            if(Device.isSafari && !isInIframe.call(this))
                $("html").css("height", "10000px");
			
			if(Device.isSafari)
			    this._fullscreen.find('.hand_slide').show();
			else
				this._fullscreen.hide();
			
			handleViewport.call(this);
			handleOrientation.call(this);
			
			var self = this;
			this._window.on("resize", function() 
			{ 
				if(self._isLoadingInProgress)
					handleLoadingSize.call(self);
				handleViewport.call(self);
				if(!self._isLoadingInProgress)
					handleOrientation.call(self);
			});
			this._window.on("mousedown touchstart", function(event) 
			{ 
				if(!Device.isSafari || self._isFullscreen || self._isLoadingInProgress)
					event.preventDefault();
			});
		},
		
		loadingStarted: function()
		{
			handleLoadingSize.call(this);
			this._orientation.hide();
			this._isLoadingInProgress = true;
		},
		
		loadingEnded: function()
		{
			this._isLoadingInProgress = false;
			
			handleViewport.call(this);
			handleOrientation.call(this);
			
			if(Device.isSafari)
			{
				var self = this;
				this._window.on("scroll", function() { handleViewport.call(self); });
			}
			else
			{
				var self = this;
				$("#SoundPopUpYesButton").on('touchend mouseup', function(event) { goFullscreen.call(self); });
				$("#SoundPopUpNoButton").on('touchend mouseup', function(event) { goFullscreen.call(self); });
				$("#OverlayStopButton").on('touchend mouseup', function(event) 
				{ 
					if(goFullscreen.call(self))
					{
						$("#OverlayStopButton").hide(); 
						setTimeout(function() {$("#OverlayStopButton").show(); }, 50);
					}
				});
			}
		}
	};

    function isInIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
	
	function handleLoadingSize()
	{
        var aspectRatio = window.innerWidth / window.innerHeight;

        var scale = 0;
        
        var css = new Object();
        
        if(aspectRatio > 1){
            scale       = window.innerHeight / this._loading.outerHeight();
            css.left    = (window.innerWidth - this._loading.outerWidth()*scale)/2 + 'px';
            css.top     = 0;
            
        }
        else
        {
        	// TODO: get this 600 in a meaningful way (now its not clear what it is)
            scale       = window.innerWidth / (this._loading.outerWidth()-600);
            css.left    = (window.innerWidth - this._loading.outerWidth()*scale)/2 + 'px';
            css.top     = (window.innerHeight - this._loading.outerHeight()*scale)/2 + 'px';

        }
        
        this._loading.css({
            'transform': 'scale('+scale+')',
            '-ms-transform': 'scale('+scale+')',
            '-webkit-transform': 'scale('+scale+')'
        }).css(css); 
    }
	
	function handleViewport()
	{
        if(Device.isSafari) 
            handleViewportSafari.call(this);
        else
            handleViewportFullscreenAPI.call(this);
    }
	
	function handleViewportSafari()
	{
		var aspectRatio = window.innerWidth / window.innerHeight;

        var scale = window.innerWidth / this._width;
        
        this._body.css({
            width: window.innerWidth,
            height: this._height*scale
        });

        if(aspectRatio > this._aspectRatio)
        {
            scale = window.innerHeight / this._height;
            
            this._body.css({
                width: this._height*scale,
                height: window.innerHeight
            });
        }
        else
        {
            scale = window.innerWidth / this._width;
            
            this._body.css({
                width: window.innerWidth,
                height: this._height*scale
            });
        }
        
        // if(aspectRatio+0.01 > this._aspectRatio && aspectRatio-0.01 > this._aspectRatio)
        // {
        //     this._fullscreen.show();
        //     this._isFullscreen = false;
        // }
        // else
        // {
            this._fullscreen.hide();
            this._isFullscreen = true;
        // }
		
		Device.scale = scale;

        this._game.css({
            'transform': 'scale3d('+scale+','+scale+',1)',
            '-ms-transform': 'scale3d('+scale+','+scale+',1)',
            '-webkit-transform': 'scale3d('+scale+','+scale+',1)',
            'left': (window.innerWidth - this._game.outerWidth()*scale)/2 + 'px'
        });
       
		// window.scrollTo(0,0);
    }
	    
    function handleViewportFullscreenAPI()
    {
        var aspectRatio = window.innerWidth / window.innerHeight;

        var scale = 0;
                
        // TODO: why here scale is calculated using either width or height
        // and in handleViewportSafari it is calculated using only width
        if(aspectRatio > this._aspectRatio)
        {
            scale = window.innerHeight / this._height;
            
            this._body.css({
                width: this._height*scale,
                height: window.innerHeight
            });
        }
        else
        {
            scale = window.innerWidth / this._width;
            
            this._body.css({
                width: window.innerWidth,
                height: this._height*scale
            });
        }
		
		Device.scale = scale;
        
        this._game.css({
            'transform': 'scale('+scale+')',
            '-ms-transform': 'scale('+scale+')',
            '-webkit-transform': 'scale('+scale+')',
            'left': (window.innerWidth - this._game.outerWidth()*scale)/2 + 'px'
        });
        
//        if(isFullscreenApiAvailable.call(this))
//        {
//	        if(this._isFullscreen)
//	            this._fullscreen.hide();
//	        else
//	            this._fullscreen.show();
//
//	        window.scrollTo(0,0);
//        }
    }
	    
    function handleOrientation()
    {	
        if(this._window.height() > this._window.width())
            this._orientation.show();
        else
        	this._orientation.hide();
    }
    
    function goFullscreen() 
    { 
    	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement)
    	{
    		document.documentElement.requestFullscreen();
    		return true;
    	}
    	
    	return false;
    }
    
    function isFullscreenApiAvailable()
    {
    	if(document.documentElement.requestFullscreen)
    		return true;
    	
    	return false;
    }
    
	return p;
})());