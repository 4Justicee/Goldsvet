function SHJSlotConfig(settings)
{
	var _slotName = settings.gameType;
	var _engineType = settings.engineType;

    //// END VARIABLES

    this.resources =
    {
        css : [_engineType+'/games/'+_slotName+'/'+_slotName+'.css'],
        img : [
			_engineType+'/games/'+_slotName+'/images/background.jpg',
			_engineType+'/games/'+_slotName+'/images/backgroundOverlay.png',
			_engineType+'/games/'+_slotName+'/images/reel_images.jpg',
			_engineType+'/games/'+_slotName+'/images/betButton.png',
			_engineType+'/games/'+_slotName+'/images/denominationButton.png',
			_engineType+'/games/'+_slotName+'/images/autoSoundButton.png',
			_engineType+'/games/'+_slotName+'/images/settingsPaytableCloseButton.png',
			_engineType+'/games/'+_slotName+'/images/waysPay.png',
			_engineType+'/games/'+_slotName+'/images/x2.png',
			_engineType+'/games/'+_slotName+'/images/settingsInfo.png',
			'images/button_sprite.png',
			'images/gambleButton.png',
			'images/mainGambleCards.png',
			'images/historyGambleCards.png'
        ]
    };

		if(settings.jackpotAllowed)
	    {
	    	this.resources.img.push(_engineType+'/games/'+_slotName+'/images/gameTitle.png');
	    	this.resources.img.push('images/jackpotImages.png');
	        this.resources.img.push('images/jackpotCardsElements.jpg');
	        this.resources.img.push('images/jackpotCardBack.jpg');
	        this.resources.img.push('images/jackpotCards.png');
	    }
	    else
	    {
	    	this.resources.img.push(_engineType+'/games/'+_slotName+'/images/gameTitleNoJackpot.png');
	    	this.resources.img.push(_engineType+'/games/'+_slotName+'/images/topGameTitle.png');
	    }

    this.prepareSettings = function()
	{
		settings.numImages          					= 9;
		settings.numReels	      						= 3;
		settings.numReelCards     						= 3;
		settings.combCount      						= 2;
		settings.reelWidth     							= 309;
		settings.reelHeight								= 525;
		settings.imageHeight							= 175;
		settings.reelCoordX								= 4;
		settings.reelCoordY								= 7;
		settings.reelSpacing							= 22;
		settings.transparentReels						= false;
		settings.wildIndex								= -1;
		settings.lineGame								= false;
		settings.linesCountConfig						= [1 , 1 , 1 , 1, 27];
		settings.fixedLinesCount						= true;
		settings.comboColors							= [0x0000ff, 0xff0000];
		settings.restoreReels 							= true;
		settings.serverMessage							= null;
		settings.mainFakeReels;

		settings.scatterConfig	= [];

		settings.lines = [
			{ gfx:[12,269, 311,269, 338,269, 641,269, 668,269, 966,269], functionType:[0,0,1,0,1,0], constDraw:[4], cells:[0,1, 1,1, 2,1], color:0xfff012},
			{ gfx:[12,93, 311,93, 338,93, 641,93, 668,93, 966,93], functionType:[0,0,1,0,1,0], constDraw:[4], cells:[0,0, 1,0, 2,0], color:0xf9b013},
			{ gfx:[12,446, 311,446, 338,446, 641,446, 668,446, 966,446], functionType:[0,0,1,0,1,0], constDraw:[4], cells:[0,2, 1,2, 2,2], color:0x23e720},
			{ gfx:[12,87, 148,87, 311,174, 338,189, 641,351, 668,365, 830,452, 966,452], functionType:[0,0,0,1,0,1,0,0], constDraw:[5], cells:[0,0, 1,1, 2,2], color:0xd33939},
			{ gfx:[12,452, 150,452, 311,366, 338,351, 641,189, 668,174, 831,87, 966,87], functionType:[0,0,0,1,0,1,0,0], constDraw:[5], cells:[0,2, 1,1, 2,0], color:0xca0404}
		];

		settings.reelImages[0] = _engineType+'/games/'+_slotName+'/images/reel_images.jpg';

		settings.cardsInfo = [
							{reelImageIndex:0, x:0, y:0},
							{reelImageIndex:0, x:309, y:0},
							{reelImageIndex:0, x:618, y:0},
							{reelImageIndex:0, x:927, y:0},
							{reelImageIndex:0, x:1236, y:0},
							{reelImageIndex:0, x:1545, y:0},
							{reelImageIndex:0, x:1854, y:0},
							{reelImageIndex:0, x:2163, y:0},
							{reelImageIndex:0, x:2472, y:0}
							];

		settings.multiplierImages = {
			"2": 	"x2" // name of the css class for image
		}

		settings.soundsInfo[1] = {src: _engineType+"/games/"+_slotName+"/sounds/shortSounds.mp3", sounds:[	]};
		settings.soundsInfo[2] = {src: _engineType+"/games/"+_slotName+"/sounds/winSounds.mp3", sounds:[
																							{name: "winCherry", 				start:0, 	duration: 2.9},
																							{name: "winApple", 					start:4, 	duration: 2.3},
																							{name: "winPeach", 					start:7, 	duration: 2.3},
																							{name: "winGrapes", 				start:10, 	duration: 2.5},
																							{name: "winBell", 					start:13, 	duration: 3.3},
																							{name: "winStar", 					start:17, 	duration: 4.45},
																							{name: "winBar", 					start:22, 	duration: 2.8},
																							{name: "winDollar", 				start:25, 	duration: 1.85},
																							{name: "winSeven", 					start:27, 	duration: 2.4},
																							{name: "creditAnimationSound", 		start:30, 	duration: 10.0}]};

		settings.winSounds = ["winCherry", "winApple", "winPeach", "winGrapes", "winBell", "winStar", "winBar", "winDollar", "winSeven"];
		settings.winFullSounds = [];

		settings.scatterSounds = null;
		settings.jackpotWinSounds = ["jackpotWin1", "jackpotWin2", "jackpotWin3", "jackpotWin4"];

		settings.reelVideos = [
					{src:_engineType+"/games/"+_slotName+"/images/videos/cherry.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/apple.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/apricot.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/grapes.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/bell.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/star.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/bar.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/dollar.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/seven.jpg", fps: 8, width: 309, height: 175, scale: 1, loopIndex: 19, length: 28}
					];
		settings.expandVideo = null;

		settings.paytableURLs = {en: _engineType+"/games/"+_slotName+"/paytable/paytable_en.html",
								 bg: _engineType+"/games/"+_slotName+"/paytable/paytable_bg.html",
								 ru: _engineType+"/games/"+_slotName+"/paytable/paytable_ru.html",
								 nl: _engineType+"/games/"+_slotName+"/paytable/paytable_nl.html",
								 fr: _engineType+"/games/"+_slotName+"/paytable/paytable_fr.html",
								 mk: _engineType+"/games/"+_slotName+"/paytable/paytable_mk.html",
								 es: _engineType+"/games/"+_slotName+"/paytable/paytable_es.html",
								 ro: _engineType+"/games/"+_slotName+"/paytable/paytable_ro.html",
								 pt: _engineType+"/games/"+_slotName+"/paytable/paytable_pt.html"
								};
		settings.helpLanguages = ["en", "es", "bg", "ro", "pt"];
	};
}
