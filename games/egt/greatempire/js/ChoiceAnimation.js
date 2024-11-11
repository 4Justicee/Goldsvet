View("ChoiceAnimation",
{
	ANIMATION_COMPLETE: "animationComplete"
},
(function()
{
	var p = 
	{

		init: function(config)
		{
			this._super("choiceAnimation");
			var self = this;
			var settings = GameSettings.getInstance();
			
			this._settings;
			this._imgWild;
			this._introTextFiled;
			this._config = config;
			this._selectedItem = 0;
			this._optionsArray = [];
			this._textLinesArray = [];
			this._introSound;

			this._blackRect = {x:0,y:0,width:1281,height:720,opacity:0};

			this._background = new CanvasView("",0,0);
			this._background.setSize(1281,720);
			this._context = this._background.getContext2D();
			this.addChild(this._background);
		
			this._img = Loader.getLoader(settings.engineType+'/games/'+settings.gameType+'/freespinAnimation/images/'+this._config.language+'/bonus_preview.jpg').getData();
			this._introSound = SoundManager.getInstance().play("choiceSelectionBackgroundSound",true); 

			TweenMax.to(this._blackRect, 0.8 , {opacity:1, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete: function() { self._onFadeInComplete();
				}
			});
		},

		_onFadeInComplete: function()
		{
			var self = this;


			TweenMax.to(this._blackRect, 0.8, {opacity:0, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.drawImage(self._img,0,0);
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
			 onComplete: function() {
			 		self._onBlackRectHide();
			 	}
			});
			
		},
		_onBlackRectHide:function()
		{
			this._optionsArray.push(new Button("option",104,20));
			this._optionsArray.push(new Button("option",467,20));
			this._optionsArray.push(new Button("option",833,20));

			for (var i = 0; i < this._optionsArray.length; i++) {
				
				this.addChild(this._optionsArray[i]);
				this._optionsArray[i].itemIndex = i;
				this._optionsArray[i].addEventListener(MouseEvent.CLICK, this.onItemClicked, this);

			};
		},
		onItemClicked : function(event)
		{
			var self = this;
			SoundManager.getInstance().stop(this._introSound);
			this._introSound = SoundManager.getInstance().play("choiceSelectionSound",false);
			this._selectedItem = event.target.itemIndex;
			for (var i = 0; i < this._optionsArray.length; i++) {
				this.removeChild(this._optionsArray[i]);
				this._optionsArray[i].removeEventListener(MouseEvent.CLICK, this.onItemClicked, this);
			};
			setTimeout(function(){self.dispatchEvent(new Event("choiceComplete"));}, 2000);
			 // this._onFadeOutComplete();
		},
		_onFadeOutComplete: function()
		{
			var self = this;
			TweenMax.to(this._blackRect, 0.8 , {opacity:1, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.drawImage(self._img,0,0);
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete: function() { self._createIntroScreen();
				}
			});
		},
		_createIntroScreen:function()
		{
			var self = this;
			var settings = GameSettings.getInstance();
			this._img = Loader.getLoader(settings.engineType+'/games/'+settings.gameType+'/freespinAnimation/images/sp_bgr.jpg').getData();

			WebFont.load({
			  custom: {
			    families: ['BonzaiGe']
			  },
			  	loading: function() {},
  				active: function() {self._onWebFontLoaded();}
			});

		},
		_onWebFontLoaded:function()
		{
			var self = this;
			this._introSound = SoundManager.getInstance().play("introSound",false);

			createAndPositionTextLinesForIntroScreen.call(this,0,0,this._selectedItem);


			TweenMax.to(this._blackRect, 0.8 , {opacity:0, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.drawImage(self._img,0,0);
					self.drawText();
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete: function() { 
					self.dispatchEvent(new Event("refreshScreen"));
					setTimeout(function(){self._hideIntroAnimation();}, 5800);
				}
			});
		},
		_hideIntroAnimation:function()
		{
			var self = this;
			TweenMax.to(this._blackRect, 0.8 , {opacity:1,ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.drawImage(self._img,0,0);
					self.drawText();
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete: function() { self._introAnimationComplete();
				}
			});
		},
		_introAnimationComplete:function()
		{
			var self = this;
			TweenMax.to(this._blackRect, 0.8 , {opacity:0, ease:Quad.easeInOut,
				onUpdate:function(){
					self._context.clearRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
					self._context.fillStyle = "rgba(0, 0, 0, "+self._blackRect.opacity+")";
					self._context.fillRect(self._blackRect.x, self._blackRect.y, self._blackRect.width, self._blackRect.height);
				},
				onComplete: function() { self.dispatchEvent(new Event(ChoiceAnimation.ANIMATION_COMPLETE));
				}
			});
		},
		messageReceived:function(obj)
		{
			this._onFadeOutComplete();
		},
		getSelectedItem:function()
		{
			return this._selectedItem;
		},
		drawText:function()
		{
			for (var i = 0; i < this._textLinesArray.length; i++) {

				if(this._textLinesArray[i].text != "[Wild]")
				{
					this._context.font = this._textLinesArray[i].font;
					this._context.shadowColor = this._settings.shadowColor;
					this._context.shadowBlur = this._settings.shadowBlur;
					this._context.fillStyle = this._settings.fillStyle;

					this._context.fillText(this._textLinesArray[i].text, this._textLinesArray[i].x, this._textLinesArray[i].y);
		       		this._context.strokeText(this._textLinesArray[i].text, this._textLinesArray[i].x, this._textLinesArray[i].y);
				}
				else
				{

					this._context.drawImage(this._imgWild,this._textLinesArray[i].x,this._textLinesArray[i].y);
				}
			};

		}
	};
	function createAndPositionTextLinesForIntroScreen( x, y, selectedItem)
	{
		var language = this._config.language;
		var translations = FreeSpinTranslations[language].IntroAnimation[selectedItem];
		var defaultFontName = FreeSpinTranslations[language].defaultFontName;
		var selectedText = translations.text;
		this._settings = translations.settings;
		var yOffset = this._settings.yOffset;
		var xOffset = this._settings.xOffset;
		var settings = GameSettings.getInstance();
		var oneLineYOffset = 0;
		var oneLineXOffset = 0;
		var fontProperty= "";

		this._context.lineWidth = this._settings.lineWidth;
		this._context.strokeStyle = this._settings.strokeStyle;
		this._context.textBaseline = this._settings.textBaseline;

		var lines = selectedText.split("\n");

		for (var i = 0; i < lines.length; i++) {
			if(lines[i].indexOf("[Wild]")!=-1) 
			{
				//logic for IMAGE WILD
				var line = lines[i].split("^");
				if(line.length != 1)
				{
					var jsonItem = JSON.parse(line[0]);
					if(Device.isiOS && typeof(jsonItem.iosYOffset) !== 'undefined')
					{
						y+=parseInt(jsonItem.iosYOffset);
					}

				}	

				this._imgWild = Loader.getLoader(settings.engineType+'/games/'+settings.gameType+'/freespinAnimation/images/wild.jpg').getData();

				var wildImageX = (this._context.canvas.width - this._imgWild.width)/2;
				var wildImageY = y;
				var imageWidth = this._imgWild.width;
				var imageHeight = this._imgWild.height;


				this._textLinesArray.push({text:"[Wild]",y:wildImageY,x:wildImageX , width:imageWidth ,height:imageHeight});

				y += imageHeight + parseInt(yOffset);
				x += imageWidth + parseInt(xOffset);
				
			}
			else
			{
				
				var line = lines[i].split("^");
				var jsonItem = JSON.parse(line[0]);
				var text = line[1];
				var size = jsonItem.lineFontSize;
				var name;


				if(typeof(jsonItem.fontName) !== 'undefined')
					name = jsonItem.fontName; 
				else
					name = defaultFontName;

				if(typeof(jsonItem.yOffset) !== 'undefined')
					oneLineYOffset = parseInt(jsonItem.yOffset);
				
				if(typeof(jsonItem.xOffset) !== 'undefined')
				oneLineXOffset = parseInt(jsonItem.xOffset); 

				if(Device.isiOS && typeof(jsonItem.iosYOffset) !== 'undefined')
				{
					y+=parseInt(jsonItem.iosYOffset);
				}
				var font;
				if(typeof(jsonItem.fontProperty)  !== 'undefined')	
				{
					fontProperty = jsonItem.fontProperty;
					font = fontProperty +" "+size+" '"+name+"'";
				}
				else
					font = size+" '"+name+"'";

				this._context.font = font;
				var coordX = (this._context.canvas.width - this._context.measureText(text).width)/2;
				
				this._textLinesArray.push({text:text,font:font ,y:y+=oneLineYOffset ,x:coordX +=oneLineXOffset})

				y += parseInt(size) + parseInt(yOffset);
				x += parseInt(size) + parseInt(xOffset);
				oneLineYOffset = 0;
				oneLineXOffset = 0;
			}
		};
		//console.log(this._textLinesArray);
	}
	return p;
})());