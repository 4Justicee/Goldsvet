function BHJSlotConfig(settings)
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
		settings.numImages          					= 11;
		settings.numReels	      						= 5;
		settings.numReelCards     						= 3;
		settings.combCount      						= 2;
		settings.reelWidth     							= 175;
		settings.reelHeight								= 525;
		settings.imageHeight							= 175;
		settings.reelCoordX								= 8;
		settings.reelCoordY								= 7;
		settings.reelSpacing							= 22;
		settings.transparentReels						= false;
		settings.wildIndex								= 8;
		settings.lineGame								= true;
		settings.linesCountConfig						= [1, 2, 3, 4, 5];
		settings.fixedLinesCount						= true;
		settings.comboColors;
		settings.restoreReels 							= true;
		settings.serverMessage							= null;
		settings.mainFakeReels;

		settings.scatterConfig	= [{index:9, minCount : 3, validReels : [ true, false, true, false, true ] }, {index:10, minCount : 3, validReels : [ true, true, true, true, true ] }];

		settings.lines = [
				{ gfx:[16,267, 186,267, 204,267, 382,267, 401,267, 578,267, 597,267, 777,267, 793,267, 963,267], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,1, 1,1, 2,1, 3,1, 4,1], color:0xfff221},
				{ gfx:[16,93, 186,93, 204,93, 382,93, 401,93, 578,93, 597,93, 777,93, 793,93, 963,93], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,0, 1,0, 2,0, 3,0, 4,0], color:0xf9af0c},
				{ gfx:[16,448, 186,448, 204,448, 382,448, 401,448, 578,448, 597,448, 777,448, 793,448, 963,448], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,2, 1,2, 2,2, 3,2, 4,2], color:0x17e614},
				{ gfx:[16,100, 94,100, 184,181, 203,198, 378,357, 400,377, 490,458, 578,375, 601,355, 775,196, 795,177, 882,100, 963,100], functionType:[0,0,0,1,0,1,0,0,1,0,1,0,0], constDraw:[5,8,10], cells:[0,0, 1,1, 2,2, 3,1, 4,0], color:0xdf3d3d},
				{ gfx:[16,457, 94,457, 187,366, 203,352, 382,183, 400,167, 490,83, 579,167, 595,182, 775,355, 791,370, 882,457, 963,457], functionType:[0,0,0,1,0,1,0,0,1,0,1,0,0], constDraw:[5,8,10], cells:[0,2, 1,1, 2,0, 3,1, 4,2], color:0xc90404}
				];

		settings.reelImages[0] = _engineType+'/games/'+_slotName+'/images/reel_images.jpg';

		settings.cardsInfo = [
							{reelImageIndex:0, x:0, y:0},
							{reelImageIndex:0, x:175, y:0},
							{reelImageIndex:0, x:350, y:0},
							{reelImageIndex:0, x:525, y:0},
							{reelImageIndex:0, x:700, y:0},
							{reelImageIndex:0, x:875, y:0},
							{reelImageIndex:0, x:1050, y:0},
							{reelImageIndex:0, x:1225, y:0},
							{reelImageIndex:0, x:1400, y:0},
							{reelImageIndex:0, x:1575, y:0},
							{reelImageIndex:0, x:1750, y:0}
							];

		settings.soundsInfo[1] = {src: _engineType+"/games/"+_slotName+"/sounds/shortSounds.mp3", sounds:[
																							{name: "stopWildSound", 			start:0, 	duration: 0.6},
																							{name: "stopScatterSound", 			start:1, 	duration: 0.4}]};
		settings.soundsInfo[2] = {src: _engineType+"/games/"+_slotName+"/sounds/winSounds.mp3", sounds:[
																							{name: "winCherry", 				start:0, 	duration: 1.4},
																							{name: "winLemon", 					start:2, 	duration: 1.7},
																							{name: "winOrange", 				start:4, 	duration: 2.25},
																							{name: "winPlum", 					start:7, 	duration: 1.65},
																							{name: "winBell", 					start:9, 	duration: 2.1},
																							{name: "winGrapes", 				start:12, 	duration: 1.5},
																							{name: "winWatermelon", 			start:14, 	duration: 2.1},
																							{name: "winSeven", 					start:17, 	duration: 2.7},
																							{name: "winStar", 					start:20, 	duration: 4.4},
																							{name: "winDollar", 				start:25, 	duration: 1.75},
																							{name: "creditAnimationSound", 		start:27, 	duration: 10.0},
																							{name: "expandSound", 				start:38, 	duration: 1.2}]};

		settings.winSounds = ["winCherry", "winLemon", "winOrange", "winPlum", "winBell", "winGrapes", "winWatermelon", "winSeven", null, "winStar", "winDollar"];
		settings.winFullSounds = [	{card:0, name:"fullLine1"}, {card:1, name:"fullLine1"},
								{card:2, name:"fullLine1"}, {card:3, name:"fullLine1"},
								{card:4, name:"fullLine2"}, {card:5, name:"fullLine3"},
								{card:6, name:"fullLine3"}, {card:7, name:"fullLine4"}];
		settings.scatterSounds = [	{scatter:9, sounds:["stopScatterSound", "stopScatterSound", "stopScatterSound", "stopScatterSound", "stopScatterSound"]},
								{scatter:10, sounds:["stopScatterSound", "stopScatterSound", "stopScatterSound", "stopScatterSound", "stopScatterSound"]}];
		settings.jackpotWinSounds = ["jackpotWin1", "jackpotWin2", "jackpotWin3", "jackpotWin4"];

		settings.reelVideos = [
					{src:_engineType+"/games/"+_slotName+"/images/videos/cherry.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/lemon.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/orange.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/plum.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/bell.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/grapes.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/watermelon.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/seven.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/clover.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/star.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/dollar.jpg", fps: 8, width: 175, height: 175, scale: 1, loopIndex: 19, length: 28}
					];
		settings.expandVideo = {src:_engineType+"/games/"+_slotName+"/images/videos/expand.jpg", fps: 10, width: 175, height: 175, scale: 1, length: 9};

		settings.paytableURLs = {en: _engineType+"/games/"+_slotName+"/paytable/paytable_en.html",
								 bg: _engineType+"/games/"+_slotName+"/paytable/paytable_bg.html",
								 ru: _engineType+"/games/"+_slotName+"/paytable/paytable_ru.html",
								 ro: _engineType+"/games/"+_slotName+"/paytable/paytable_ro.html",
								 nl: _engineType+"/games/"+_slotName+"/paytable/paytable_nl.html",
								 fr: _engineType+"/games/"+_slotName+"/paytable/paytable_fr.html",
								 mk: _engineType+"/games/"+_slotName+"/paytable/paytable_mk.html",
								 es: _engineType+"/games/"+_slotName+"/paytable/paytable_es.html"
								};
		settings.helpLanguages = ["en", "es", "bg", "ro"];
	};
}
