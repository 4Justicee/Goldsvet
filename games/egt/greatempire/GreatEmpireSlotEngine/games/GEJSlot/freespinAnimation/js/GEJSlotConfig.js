function GEJSlotConfig(settings) 
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
        ],
        freespinAnimation:
    	{
			js: 
			[
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/FreespinAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/StartAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/ChoiceAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/OutroAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/Translations.js',

			],
			css:
			[
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/style.css',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/fonts.css',
			],
			img:
			{
				en: [ 	_engineType+'/games/'+_slotName+'/freespinAnimation/images/en/pressStart.jpg',
						_engineType+'/games/'+_slotName+'/freespinAnimation/images/en/bonus_preview.jpg'
					],
				bg: [ 	_engineType+'/games/'+_slotName+'/freespinAnimation/images/bg/pressStart.jpg',
						_engineType+'/games/'+_slotName+'/freespinAnimation/images/bg/bonus_preview.jpg'
					],
				ru: [ 	_engineType+'/games/'+_slotName+'/freespinAnimation/images/ru/pressStart.jpg',
						_engineType+'/games/'+_slotName+'/freespinAnimation/images/ru/bonus_preview.jpg'
					],
				nl: [ 	_engineType+'/games/'+_slotName+'/freespinAnimation/images/nl/pressStart.jpg',
						_engineType+'/games/'+_slotName+'/freespinAnimation/images/nl/bonus_preview.jpg'
					],
				fr: [ 	_engineType+'/games/'+_slotName+'/freespinAnimation/images/fr/pressStart.jpg',
						_engineType+'/games/'+_slotName+'/freespinAnimation/images/fr/bonus_preview.jpg'
					],
				ro: [ 	_engineType+'/games/'+_slotName+'/freespinAnimation/images/ro/pressStart.jpg',
						_engineType+'/games/'+_slotName+'/freespinAnimation/images/ro/bonus_preview.jpg'
					],
				es: [ 	_engineType+'/games/'+_slotName+'/freespinAnimation/images/es/pressStart.jpg',
						_engineType+'/games/'+_slotName+'/freespinAnimation/images/es/bonus_preview.jpg'
					],
    			nonlocalized:
    			[
    				_engineType+'/games/'+_slotName+'/freespinAnimation/images/sp_bgr.jpg',
    				_engineType+'/games/'+_slotName+'/freespinAnimation/images/wild.jpg'
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
		settings.wildIndex								= 9;
		settings.lineGame								= true;
		settings.linesCountConfig						= [1, 3 ,5, 7, 10];
		settings.fixedLinesCount						= false;
		settings.comboColors;
		settings.restoreReels 							= true;
		settings.serverMessage							= null;
		settings.mainFakeReels;

		settings.scatterConfig	= [{index:10, minCount : 3, freespinMinCount:3, validReels : [ true, false, true, false, true ], freespinsVideoIndex: 10, freespinsSoundIndex:0}];
		
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
				{ gfx:[16,76, 79,76, 188,177, 201,189, 292,274, 383,274, 401,274, 578,274, 597,274, 686,274, 777,189, 792,175, 904,76, 963,76], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,0, 1,1, 2,1, 3,1, 4,0], color:0x4a82f3}
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
																							{name: "stopScatterSound1",			start:0, 	duration: 1.5},
																							{name: "stopScatterSound3",			start:2, 	duration: 1.2},
																							{name: "stopScatterSound5",			start:4, 	duration: 1.3},
																							{name: "expandSound",				start:6, 	duration: 1.3},
																							{name: "reelAccelerateSound", 		start:8, 	duration: 2.1}
																							]};
		settings.soundsInfo[2] = {src: _engineType+"/games/"+_slotName+"/sounds/winSounds.mp3", sounds:[	
																							{name: "winFlower", 				start:0, 	duration: 5.2},
																							{name: "winStatue", 				start:6, 	duration: 3.5},
																							{name: "winPanda", 					start:10, 	duration: 3.6},
																							{name: "winWoman", 					start:14, 	duration: 4.55},
																							{name: "winMan", 					start:19, 	duration: 5.4},
																							{name: "winWild", 					start:25, 	duration: 4.8},
																							{name: "winScatterFs", 				start:31, 	duration: 5.5},
																							{name: "creditAnimationSound", 		start:37, 	duration: 10.0}
																							]};
		settings.soundsInfo[5] = {src: _engineType+"/games/"+_slotName+"/sounds/freeSpinsSounds.mp3", sounds:[	
																							{name: "pressStartSound", 				start:0, 	duration: 4},
																							{name: "choiceSelectionSound", 			start:9, 	duration: 4.3},
																							{name: "choiceSelectionBackgroundSound",start:14, 	duration: 8.5},
																							{name: "introSound", 					start:23, 	duration: 6.7},
																							{name: "outroSound", 					start:31, 	duration: 7.4}
																							]};																					
																							
		settings.winSounds = [null, null, null, null, "winFlower", "winStatue", "winPanda", "winWoman", "winMan", "winWild", null];
		settings.freespinSounds = ["winScatterFs"];
		settings.winFullSounds = [{card:0, name:"fullLine1"}, {card:1, name:"fullLine1"}, 
								  {card:2, name:"fullLine1"}, {card:3, name:"fullLine1"},
								  {card:4, name:"fullLine2"}, {card:5, name:"fullLine2"},
								  {card:6, name:"fullLine3"}, {card:7, name:"fullLine3"},
								  {card:8, name:"fullLine4"}, {card:9, name:"fullLine4"},
								  {card:10, name:"fullLine4"}, {card:11, name:"fullLine4"}];

		settings.scatterSounds = [	{scatter:10, sounds:["stopScatterSound1", null, "stopScatterSound3", null, "stopScatterSound5"]}];
		settings.jackpotWinSounds = ["jackpotWin1", "jackpotWin2", "jackpotWin3", "jackpotWin4"];
		
		settings.reelVideos = [
					{src:_engineType+"/games/"+_slotName+"/images/videos/0.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 13},
					{src:_engineType+"/games/"+_slotName+"/images/videos/1.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 13},
					{src:_engineType+"/games/"+_slotName+"/images/videos/2.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 13},
					{src:_engineType+"/games/"+_slotName+"/images/videos/3.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 13},
					{src:_engineType+"/games/"+_slotName+"/images/videos/4.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 30},
					{src:_engineType+"/games/"+_slotName+"/images/videos/5.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 25},
					{src:_engineType+"/games/"+_slotName+"/images/videos/6.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 25},
					{src:_engineType+"/games/"+_slotName+"/images/videos/7.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 30},
					{src:_engineType+"/games/"+_slotName+"/images/videos/8.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 30},
					{src:_engineType+"/games/"+_slotName+"/images/videos/9.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 40},
					{src:_engineType+"/games/"+_slotName+"/images/videos/10.jpg",	 fps: 12, width: 175, height: 175, scale: 1,  length: 40}
					
					];
		settings.expandVideo = {src:_engineType+"/games/"+_slotName+"/images/videos/11.jpg",fps: 12, width: 175, height: 175, scale: 1, length: 10};
		
		settings.paytableURLs = {en: _engineType+"/games/"+_slotName+"/paytable/paytable_en.html",
								 bg: _engineType+"/games/"+_slotName+"/paytable/paytable_bg.html",
								 ru: _engineType+"/games/"+_slotName+"/paytable/paytable_ru.html",
								 ro: _engineType+"/games/"+_slotName+"/paytable/paytable_ro.html",
								 mk: _engineType+"/games/"+_slotName+"/paytable/paytable_mk.html",
								 es: _engineType+"/games/"+_slotName+"/paytable/paytable_es.html",
								 nl: _engineType+"/games/"+_slotName+"/paytable/paytable_nl.html",
								 fr: _engineType+"/games/"+_slotName+"/paytable/paytable_fr.html"
								};
		settings.helpLanguages = ["en", "bg", "es", "ro"];
	};
}
