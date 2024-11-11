GameProxy("SlotProxy",
{
	
},
(function()
{
	var p =
	{
		init: function(socket, config, balance)
		{
			this._subscribe = null;
			this._settings = null;
			this._gameNumber = null;
			this._currentState = null;
			this._engineType = undefined;
			this._classesProgress = 0;
			this._resourcesProgress = 0;
			this._loadingQueue = null;
			this._hierarchyJSONLoader = null;
			
			this._super(socket, config, balance);
			
			this._socket.addEventListener(Socket.SOCKET_CLOSED, this._onLostConnection, this);
			this._socket.addEventListener(Socket.RESPONSE_RECEIVED, this._onResponseReceived, this);
			this._socket.addEventListener(Socket.SERVER_EVENT_RECEIVED, onServerEvent, this);
			
			// TODO: get this from PlatformSettings.js
			// get the engine type that this game is using
			var xml = $(Loader.getLoader("config.xml").getData());
	    	var enginesTag = xml.find("engines");
	    	var engineNodes = enginesTag.children();

	    	var self = this;
	    	engineNodes.each(function()
	    	{
	    		var gameFound = false;
	    		$(this).children().each(function()
	    		{
	    			if($(this).attr("name") == self._config.gameType)
	    			{
	    				gameFound = true;
	    				return false;
	    			}
	    		});
	    		
				if(gameFound)
				{
					self._engineType = $(this).attr("type");
					Loader.cacheTimestamp = $(this).attr("buildTimestamp");
					return false;
				}
	    	});
	    	
	    	if(!this._engineType)
	    		throw "Engine type for game type " + this._config.gameType + "is undefined";
	    	////////////////////////////////////////////////////
			
			requestSubscribe.call(this);
		},
		
		dispose: function()
		{
			this._socket.removeEventListener(Socket.SOCKET_CLOSED, this._onLostConnection, this);
			this._socket.removeEventListener(Socket.RESPONSE_RECEIVED, this._onResponseReceived, this);
			this._socket.removeEventListener(Socket.SERVER_EVENT_RECEIVED, onServerEvent, this);
			
			this._super();
		},
		
		_onResponseReceived: function(event) 
		{
			this._super(event);
			
			var response = event.data;

			if(response.gameIdentificationNumber != this._config.gin)
				return;

			if(response.command == "subscribe")
				handleSubscribeResponse.call(this, response);
			else if(response.command == "settings")
				handleSettingsResponse.call(this, response);
			else if(response.command == "bet")
				handleBetResponse.call(this, response);
		},
		
		_onLostConnection: function() 
		{
			if(this._gameInterface)
				this._gameInterface.setData({command:"event", lostConnection:true, balance: this._balance.value});
			else
			{
				if(this._hierarchyJSONLoader)
					this._hierarchyJSONLoader.stop();
				if(this._loadingQueue)
					this._loadingQueue.stop();
			}
		}
	};
	
	function requestSubscribe()
	{
		this._socket.sendRequest(
		{
            command                 : "subscribe",
            qName                   : "jServer."+this._config.gameType+".subscribe", 
            gameIdentificationNumber: this._config.gin,
            gameNumber              : -1,
            sessionKey				: this._config.sessionKey
        }, 20);
	}
	
	function requestSettings()
	{
        this._socket.sendRequest(
        {
            command                 : "settings",
            qName                   : "jServer."+this._config.gameType+".settings", 
            gameIdentificationNumber: this._config.gin,
            gameNumber              : -1,
            sessionKey				: this._config.sessionKey
        }, 20);
	}
	
	function calculateProgress()
	{
		var progress = this._classesProgress + this._resourcesProgress;
		
		this.dispatchEvent(new Event(GameProxy.GAME_LOADING_PROGRESS, progress));
	}
	
	function handleSubscribeResponse(response)
	{
		this._subscribe = response.complex;
		this._gameNumber = response.gameNumber;
		this._currentState = response.complex.currentState.state;
		
		requestSettings.call(this);
	}
	
	function handleSettingsResponse(response)
	{
		this._settings = response.complex;
		
		//<debug>
		this._hierarchyJSONLoader = new JSONLoader(this._engineType+"/Hierarchy.json");
		this._hierarchyJSONLoader.addEventListener(LoaderEvent.COMPLETE, onGameClassHierarchyLoaded, this);
		this._hierarchyJSONLoader.addEventListener(LoaderEvent.ERROR, onGameClassHierarchyError, this);
		this._hierarchyJSONLoader.load();
    	//</debug>
	}
	
	function handleBetResponse(response)
	{
		if(response.complex && response.complex.gameCommand == "bet")
			this._gameNumber = response.gameNumber;

		if(response.state)
			this._currentState = response.state;
		
		response.balance = this._balance.value;

		this._gameInterface.setData(response);
	}

	function onServerEvent(event)
	{
		var eventData = event.data;
		
		if(eventData.gameIdentificationNumber == this._config.gin)
		{
			if(this._gameInterface)
				this._gameInterface.setData(eventData);
		}
	}
	
	//<debug>
    function onGameClassHierarchyLoaded(event)
    {
    	event.target.removeEventListener(LoaderEvent.COMPLETE, onGameClassHierarchyLoaded, this);
    	event.target.removeEventListener(LoaderEvent.ERROR, onGameClassHierarchyError, this);

    	this._loadingQueue = new LoadingQueue(false);
    	
    	var gameClasses = event.data.jsonContent.classes;
    	for(var gameClassIndex in gameClasses)
    		this._loadingQueue.addScriptLoader(new ScriptLoader(this._engineType+"/"+gameClasses[gameClassIndex]+".js"));
    	
    	this._loadingQueue.addCssLoader(new CSSLoader("js/style1.css"));
    	
    	this._loadingQueue.addEventListener(LoaderEvent.COMPLETE, onGameClassesLoaded, this);
    	this._loadingQueue.addEventListener(LoaderEvent.PROGRESS, onGameClassesProgress, this);
    	this._loadingQueue.addEventListener(LoaderEvent.ERROR, onGameClassesError, this);
    	this._loadingQueue.load();
    }
    
    function onGameClassHierarchyError(event)
    {
    	event.target.removeEventListener(LoaderEvent.COMPLETE, onGameClassHierarchyLoaded, this);
    	event.target.removeEventListener(LoaderEvent.ERROR, onGameClassHierarchyError, this);

    	this.dispatchEvent(new Event(GameProxy.GAME_LOADING_ERROR));
    }
    //</debug>
    
    function onGameClassesProgress(event)
    {
    	this._classesProgress = 0.5*event.data.progress;
    	calculateProgress.call(this);
    }
    function onGameClassesLoaded(event)
    {
    	event.target.removeEventListener(LoaderEvent.COMPLETE, onGameClassesLoaded, this);
    	event.target.removeEventListener(LoaderEvent.PROGRESS, onGameClassesProgress, this);
    	event.target.removeEventListener(LoaderEvent.ERROR, onGameClassesError, this);
    	
    	this._gameInterface = new SlotEngineMain();
    	this._gameInterface.addEventListener(LoaderEvent.COMPLETE, onGameResourcesLoaded, this);
    	this._gameInterface.addEventListener(LoaderEvent.PROGRESS, onGameResourcesProgress, this);
    	this._gameInterface.addEventListener(LoaderEvent.ERROR, onGameResourcesError, this);
    	
    	var len = this._gameInterface.events.length;
        for(var i = 0;i < len;i++)
        	this._gameInterface.addEventListener(this._gameInterface.events[i], onGameEvent, this);
    	
    	var gameViewport = new Stage($("#GameViewport"), true);
    	gameViewport.addChild(this._gameInterface);
    	
    	data = {
    		command: "show",
    		gameType: this._config.gameType,
    		engineType: this._engineType,
    		gameNumber: this._gameNumber,
    		balance: this._balance.value,
    		currency: this._balance.getCurrency(),
    		settings: this._settings,
    		subscribe: this._subscribe,
    		language: this._config.language,
    		login: this._config.login
    	};

    	this._gameInterface.setData(data);
    }
    
    function onGameClassesError(event)
    {
    	event.target.removeEventListener(LoaderEvent.COMPLETE, onGameClassesLoaded, this);
    	event.target.removeEventListener(LoaderEvent.PROGRESS, onGameClassesProgress, this);
    	event.target.removeEventListener(LoaderEvent.ERROR, onGameClassesError, this);
    	
    	this.dispatchEvent(new Event(GameProxy.GAME_LOADING_ERROR));
    }
    
    function onGameResourcesLoaded(event)
    {
    	this._gameInterface.removeEventListener(LoaderEvent.COMPLETE, onGameResourcesLoaded, this);
    	this._gameInterface.removeEventListener(LoaderEvent.PROGRESS, onGameResourcesProgress, this);
    	this._gameInterface.removeEventListener(LoaderEvent.ERROR, onGameResourcesError, this);

        $("#Game").addClass("slot " + this._config.gameType);
        
        this.dispatchEvent(new Event(GameProxy.GAME_LOADING_COMPLETE));
    }
    
    function onGameResourcesProgress(event)
    {
    	this._resourcesProgress = 0.5*event.data.progress;
    	calculateProgress.call(this);
    }
    
    function onGameResourcesError(event)
    {
    	this._gameInterface.removeEventListener(LoaderEvent.COMPLETE, onGameResourcesLoaded, this);
    	this._gameInterface.removeEventListener(LoaderEvent.PROGRESS, onGameResourcesProgress, this);
    	this._gameInterface.removeEventListener(LoaderEvent.ERROR, onGameResourcesError, this);
    	
    	this.dispatchEvent(new Event(GameProxy.GAME_LOADING_ERROR));
    }
    
    function onGameEvent(event)
    {
    	if(event.type == "hideGame")
    	{
    		this.dispatchEvent(new Event(GameProxy.HIDE_GAME, this._config.gin));
    	}
    	else
    	{
    		// the game wants to send a bet to the server
    		var bet = event.data;
    		if(bet.gameCommand == "bet" && !bet.bonus)
    			this._balance.value -= bet.bet*bet.lines;
    		
    		this._socket.sendRequest(
    		{
    			command: "bet", 
    			qName: "jServer."+this._config.gameType+".bet."+bet.gameCommand,
    			gameIdentificationNumber: this._config.gin,
    			gameNumber: this._gameNumber,
    			bet:bet,
    			sessionKey: this._config.sessionKey
    		}, 20);
    	}
    }
	
	return p;
})());