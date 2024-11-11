function ZWJSlotConfig(settings)
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
			_engineType+'/games/'+_slotName+'/images/reel_images.png',
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
		settings.transparentReels						= true;
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

		settings.reelImages[0] = _engineType+'/games/'+_slotName+'/images/reel_images.png';
		settings.reelImages[1] = _engineType+'/games/'+_slotName+'/images/reel_images.jpg';

		settings.cardsInfo = [
							{reelImageIndex:0, x:0, y:0},
							{reelImageIndex:0, x:175, y:0},
							{reelImageIndex:0, x:350, y:0},
							{reelImageIndex:0, x:525, y:0},
							{reelImageIndex:1, x:0, y:0},
							{reelImageIndex:1, x:175, y:0},
							{reelImageIndex:1, x:350, y:0},
							{reelImageIndex:1, x:525, y:0},
							{reelImageIndex:1, x:700, y:0},
							{reelImageIndex:1, x:875, y:0},
							{reelImageIndex:1, x:1050, y:0}
							];

		settings.soundsInfo[1] = {src: _engineType+"/games/"+_slotName+"/sounds/shortSounds.mp3", sounds:[
																							{name: "stopWildSound", 			start:0, 	duration: 1.3},
																							{name: "stopScatterBook1", 			start:2, 	duration: 1.4},
																							{name: "stopScatterBook2", 			start:5, 	duration: 1.5},
																							{name: "stopScatterBook3", 			start:8, 	duration: 1.4},
																							{name: "stopScatterBook4", 			start:10, 	duration: 1.5},
																							{name: "stopScatterBook5", 			start:12, 	duration: 1.5},
																							{name: "stopScatterMap1", 			start:14, 	duration: 1},
																							{name: "stopScatterMap3", 			start:16, 	duration: 1.1},
																							{name: "stopScatterMap5", 			start:18, 	duration: 1.2}
																							]};
		settings.soundsInfo[2] = {src: _engineType+"/games/"+_slotName+"/sounds/winSounds.mp3", sounds:[
																							{name: "winSphere", 				start:0, 	duration: 3.3},
																							{name: "winTelescope",				start:4, 	duration: 2.4},
																							{name: "winWoman",	 				start:8, 	duration: 5.6},
																							{name: "winMan", 					start:14, 	duration: 5.4},
																							{name: "winWheel", 					start:20, 	duration: 4},
																							{name: "winScatterMap", 			start:28, 	duration: 4.8},
																							{name: "winScatterBook", 			start:34, 	duration: 4.65},
																							{name: "creditAnimationSound", 		start:39, 	duration: 10.0},
																							{name: "expandSound", 				start:25, 	duration: 1.8}]};

		settings.winSounds = [null, null, null, null, "winSphere", "winTelescope", "winWoman", "winMan", "winWheel", "winScatterMap", "winScatterBook"];
		settings.winFullSounds = [
								{card:0, name:"fullLine1"},
								{card:1, name:"fullLine1"},
								{card:2, name:"fullLine1"},
								{card:3, name:"fullLine1"},
								{card:4, name:"fullLine2"},
								{card:5, name:"fullLine3"},
								{card:6, name:"fullLine3"},
								{card:7, name:"fullLine4"},
								{card:8, name:"fullLine4"}];

		settings.scatterSounds = [
								{scatter:9, sounds:["stopScatterMap1", null, "stopScatterMap3", null, "stopScatterMap5"]},
								{scatter:10, sounds:["stopScatterBook1", "stopScatterBook2", "stopScatterBook3", "stopScatterBook4", "stopScatterBook5"]}
								];
		settings.jackpotWinSounds = ["jackpotWin1", "jackpotWin2", "jackpotWin3", "jackpotWin4"];

		settings.reelVideos = [
					{src:_engineType+"/games/"+_slotName+"/images/videos/Jack.png", fps: 10, width: 87, height: 87, scale: 2,  length: 10 , transparent:true},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Queen.png", fps: 10, width: 87, height: 87, scale: 2, length: 10,transparent:true},
					{src:_engineType+"/games/"+_slotName+"/images/videos/King.png", fps: 10, width: 87, height: 87, scale: 2,  length: 10, transparent:true},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Ace.png", fps: 10, width: 87, height: 87, scale: 2,  length: 10,transparent:true},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Sphere.jpg", fps: 10, width: 175, height: 175, scale: 1, length: 20},
					{src:_engineType+"/games/"+_slotName+"/images/videos/telescope.jpg", fps: 10, width: 175, height: 175, scale: 1, length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Woman.jpg", fps: 10, width: 175, height: 175, scale: 1, length: 27},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Man.jpg", fps: 10, width: 175, height: 175, scale: 1, length: 29},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Wild.jpg", fps: 10, width: 175, height: 175, scale: 1, length: 20},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Map.jpg", fps: 10, width: 175, height: 175, scale: 1, length: 27},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Book.jpg", fps: 10, width: 175, height: 175, scale: 1, length: 23}
					];
		settings.expandVideo = {src:_engineType+"/games/"+_slotName+"/images/videos/Expand.png", fps: 10, width: 87, height: 87, scale: 2, length: 9, transparent:true};

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
