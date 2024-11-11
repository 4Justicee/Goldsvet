function GETJSlotConfig(settings) 
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
			_engineType+'/games/'+_slotName+'/images/gameTitle.png',
			_engineType+'/games/'+_slotName+'/images/reel_images.jpg',
			_engineType+'/games/'+_slotName+'/images/betButton.png',
			_engineType+'/games/'+_slotName+'/images/denominationButton.png',
			_engineType+'/games/'+_slotName+'/images/autoSoundButton.png',
			_engineType+'/games/'+_slotName+'/images/settingsPaytableCloseButton.png',
			_engineType+'/games/'+_slotName+'/images/settingsInfo.png',
            'images/button_sprite.png',
            'images/gambleButton.png',
            'images/mainGambleCards.png',
            'images/historyGambleCards.png',
            'images/jackpotImages.png',
            'images/jackpotCardsElements.jpg',
            'images/jackpotCardBack.jpg',
            'images/jackpotCards.png'
        ],
        freespinAnimation:
    	{
			js: 
			[
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/FreespinAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/CoreAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/StartAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/IntroAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/RetriggerAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/OutroAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/Translations.js',

			],
			css:
			[
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/fonts.css',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/style.css'
			],
			img:
			{
    			nonlocalized:
    			[
    				_engineType+'/games/'+_slotName+'/freespinAnimation/images/sp_bgr.png'
    			]
			}
    	}
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
		settings.numImages          					= 13;
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
		settings.wildIndex								= 11;
		settings.lineGame								= true;
		settings.linesCountConfig						= [1, 3, 5, 7, 10];
		settings.fixedLinesCount						= false;
		settings.comboColors;
		settings.restoreReels 							= false;
		settings.serverMessage							= null;
		settings.mainFakeReels;

		settings.scatterConfig	= [{index:12, minCount : 2, freespinMinCount:3, validReels : [ true, true, true, true, true ], freespinsVideoIndex: 13, freespinsSoundIndex:0}];
		
		settings.lines = [
			{ gfx:[16,267, 186,267, 204,267, 382,267, 401,267, 578,267, 597,267, 777,267, 793,267, 963,267], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,1, 1,1, 2,1, 3,1, 4,1], color:0xfff221},
			{ gfx:[16,93, 186,93, 204,93, 382,93, 401,93, 578,93, 597,93, 777,93, 793,93, 963,93], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,0, 1,0, 2,0, 3,0, 4,0], color:0xf9af0c},
			{ gfx:[16,448, 186,448, 204,448, 382,448, 401,448, 578,448, 597,448, 777,448, 793,448, 963,448], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,2, 1,2, 2,2, 3,2, 4,2], color:0x17e614},
			{ gfx:[16,100, 94,100, 184,181, 203,198, 378,357, 400,377, 490,458, 578,375, 601,355, 775,196, 795,177, 882,100, 963,100], functionType:[0,0,0,1,0,1,0,0,1,0,1,0,0], constDraw:[5,8,10], cells:[0,0, 1,1, 2,2, 3,1, 4,0], color:0xdf3d3d},
			{ gfx:[16,457, 94,457, 187,366, 203,352, 382,183, 400,167, 490,83, 579,167, 595,182, 775,355, 791,370, 882,457, 963,457], functionType:[0,0,0,1,0,1,0,0,1,0,1,0,0], constDraw:[5,8,10], cells:[0,2, 1,1, 2,0, 3,1, 4,2], color:0xc90404},
			{ gfx:[16,85, 187,85, 201,85, 286,85, 382,168, 400,182, 579,342, 596,356, 691,439, 776,439, 790,439, 963,439], functionType:[0,0,1,0,0,1,0,1,0,0,1,0], constDraw:[5,7,10], cells:[0,0, 1,0, 2,1, 3,2, 4,2], color:0x308a7},
			{ gfx:[16,439, 187,439, 201,439, 300,439, 383,360, 400,348, 579,185, 596,172, 695,85, 776,85, 790,85, 963,85], functionType:[0,0,1,0,0,1,0,1,0,0,1,0], constDraw:[5,7,10], cells:[0,2, 1,2, 2,1, 3,0, 4,0], color:0xd84b5},
			{ gfx:[16,283, 94,283, 179,359, 201,379, 284,456, 382,456, 401,456, 578,456, 597,456, 708,456, 777,385, 803,359, 882,283, 963,283], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,1, 1,2, 2,2, 3,2, 4,1], color:0xc86b07},
			{ gfx:[16,251, 94,251, 183,180, 202,165, 305,84, 383,84, 401,84, 578,84, 597,84, 681,84, 777,165, 793,181, 875,251, 963,251], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,1, 1,0, 2,0, 3,0, 4,1], color:0x3bb108},
			{ gfx:[16,76, 79,76, 188,177, 201,189, 292,274, 383,274, 401,274, 578,274, 597,274, 686,274, 777,189, 792,175, 904,76, 963,76], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,0, 1,1, 2,1, 3,1, 4,0], color:0x4a82f3},
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
							{reelImageIndex:0, x:1750, y:0},
							{reelImageIndex:0, x:1925, y:0},
							{reelImageIndex:0, x:2100, y:0}
							];
		
		settings.soundsInfo[1] = {src: _engineType+"/games/"+_slotName+"/sounds/shortSounds.mp3", sounds:[	
																							{name: "reelAccelerateSound", 		start:1, 	duration: 2.05},	
																							{name: "stopScatterSound", 			start:0, 	duration: 0.4}]};
		settings.soundsInfo[2] = {src: _engineType+"/games/"+_slotName+"/sounds/winSounds.mp3", sounds:[	
																							{name: "winStone", 					start:3, 	duration: 1.8},
																							{name: "winIsis", 					start:5, 	duration: 4.4},
																							{name: "winCat", 					start:0, 	duration: 2.3},
																							{name: "winPrincess", 				start:13, 	duration: 3.1},
																							{name: "winPriest", 				start:10, 	duration: 2.2},
																							{name: "winWild", 					start:17, 	duration: 2.35},
																							{name: "winScatter", 				start:20, 	duration: 1.25},
																							{name: "winScatterFs", 				start:22, 	duration: 6.3},
																							{name: "creditAnimationSound", 		start:29, 	duration: 10.0}
																							]};
		settings.soundsInfo[5] = {src: _engineType+"/games/"+_slotName+"/sounds/freeSpinsSounds.mp3", sounds:[	
																							{name: "pressStartSound", 				start:0, 	duration: 8},
																							{name: "freeSpinsBackgroundSound", 		start:25, 	duration: 9.6},
																							{name: "introSound", 					start:9, 	duration: 7},
																							{name: "outroSound", 					start:17, 	duration: 6.4}
																							]};																					
																							
		settings.winSounds = [null, null, null, null, null, null, "winStone", "winIsis", "winCat", "winPrincess", "winPriest", "winWild", "winScatter"];
		settings.freespinSounds = ["winScatterFs"];
		settings.winFullSounds = [{card:0, name:"fullLine1"}, {card:1, name:"fullLine1"}, 
								  {card:2, name:"fullLine1"}, {card:3, name:"fullLine1"},
								  {card:4, name:"fullLine2"}, {card:5, name:"fullLine2"},
								  {card:6, name:"fullLine3"}, {card:7, name:"fullLine3"},
								  {card:8, name:"fullLine3"}, {card:9, name:"fullLine4"},
								  {card:10, name:"fullLine4"}, {card:11, name:"fullLine4"}];
		settings.scatterSounds = [	{scatter:12, sounds:["stopScatterSound", "stopScatterSound", "stopScatterSound", "stopScatterSound", "stopScatterSound"]}];
		settings.jackpotWinSounds = ["jackpotWin1", "jackpotWin2", "jackpotWin3", "jackpotWin4"];
		
		settings.reelVideos = [
					{src:_engineType+"/games/"+_slotName+"/images/videos/9.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 12},
					{src:_engineType+"/games/"+_slotName+"/images/videos/10.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 12},
					{src:_engineType+"/games/"+_slotName+"/images/videos/J.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 12},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Q.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 12},
					{src:_engineType+"/games/"+_slotName+"/images/videos/K.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 12},
					{src:_engineType+"/games/"+_slotName+"/images/videos/A.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 12},
					{src:_engineType+"/games/"+_slotName+"/images/videos/stone.jpg",		fps: 8, width: 175, height: 175, scale: 1,  length: 14},
					{src:_engineType+"/games/"+_slotName+"/images/videos/isis.jpg", 	 	fps: 8, width: 175, height: 175, scale: 1,  length: 8},
					{src:_engineType+"/games/"+_slotName+"/images/videos/cat.jpg",	 		fps: 8, width: 175, height: 175, scale: 1, length: 11},
					{src:_engineType+"/games/"+_slotName+"/images/videos/princess.jpg", 	fps: 8, width: 175, height: 175, scale: 1, length: 31},
					{src:_engineType+"/games/"+_slotName+"/images/videos/priest.jpg",	 	fps: 8, width: 175, height: 175, scale: 1, length: 25},
					{src:_engineType+"/games/"+_slotName+"/images/videos/wild.jpg", 	 	fps: 8, width: 175, height: 175, scale: 1,  length: 27},
					{src:_engineType+"/games/"+_slotName+"/images/videos/scatter.jpg", 		fps: 8, width: 175, height: 175, scale: 1, length: 21},
					{src:_engineType+"/games/"+_slotName+"/images/videos/scatter-fs.jpg", 	fps: 8, width: 175, height: 175, scale: 1, length: 22}
					];
		settings.expandVideo = null;
		
		settings.paytableURLs = {en: _engineType+"/games/"+_slotName+"/paytable/paytable_en.html",
								 bg: _engineType+"/games/"+_slotName+"/paytable/paytable_bg.html",
								 ru: _engineType+"/games/"+_slotName+"/paytable/paytable_ru.html",
								 nl: _engineType+"/games/"+_slotName+"/paytable/paytable_nl.html",
								 fr: _engineType+"/games/"+_slotName+"/paytable/paytable_fr.html",
								 ro: _engineType+"/games/"+_slotName+"/paytable/paytable_ro.html",
								 es: _engineType+"/games/"+_slotName+"/paytable/paytable_es.html"
								};
		settings.helpLanguages = ["en", "bg", "es", "ro"];
	};
}
