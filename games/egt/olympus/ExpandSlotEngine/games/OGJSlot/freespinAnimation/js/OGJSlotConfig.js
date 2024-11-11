function OGJSlotConfig(settings)
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
			_engineType+'/games/'+_slotName+'/images/frame.png',
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
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/CoreAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/StartAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/IntroAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/SpecialExpandAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/RetriggerAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/OutroAnimation.js',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/js/Translations.js',

			],
			css:
			[
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/style.css',
			 	_engineType+'/games/'+_slotName+'/freespinAnimation/fonts.css'
			],
			img:
			{
    			nonlocalized:
    			[
    				_engineType+'/games/'+_slotName+'/freespinAnimation/images/sp_bgr.jpg',
    				_engineType+'/games/'+_slotName+'/freespinAnimation/images/sp_bgr_bottom.png'
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
		settings.numImages          					= 10;
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
		settings.linesCountConfig						= [1, 3, 5, 7, 10];
		settings.fixedLinesCount						= false;
		settings.comboColors;
		settings.restoreReels 							= true;
		settings.serverMessage							= null;
		settings.mainFakeReels;

		settings.scatterConfig	= [{index:9, minCount : 3, freespinMinCount:3, validReels : [ true, true, true, true, true ], freespinsVideoIndex: 9, freespinsSoundIndex:0}];

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

		settings.frameImage = _engineType+'/games/'+_slotName+'/images/frame.png';
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
							];

		settings.soundsInfo[1] = {src: _engineType+"/games/"+_slotName+"/sounds/shortSounds.mp3", sounds:[
																							{name: "reelAccelerateSound", 		start:13, 	duration: 3.1},
																							{name: "stopScatter1", 				start:0, 	duration: 1.9},
																							{name: "stopScatter2", 				start:2, 	duration: 1.95},
																							{name: "stopScatter3", 				start:5, 	duration: 2},
																							{name: "stopScatter4", 				start:8, 	duration: 1.95},
																							{name: "stopScatter5", 				start:10, 	duration: 1.95},
																							{name: "bonusExpanding", 			start:16, 	duration: 0.35}
																							]};
		settings.soundsInfo[2] = {src: _engineType+"/games/"+_slotName+"/sounds/winSounds.mp3", sounds:[
																							{name: "winMan", 					start:0, 	duration: 5.7},
																							{name: "winWomen", 					start:6, 	duration: 6.1},
																							{name: "winPoseidon", 				start:13, 	duration: 7.2},
																							{name: "winAthene", 				start:21, 	duration: 4.8},
																							{name: "winScatterFS",				start:26,	duration: 9.8},
																							{name: "creditAnimationSound", 		start:36, 	duration: 10}
																							]};
		settings.soundsInfo[5] = {src: _engineType+"/games/"+_slotName+"/sounds/freeSpinsSounds.mp3", sounds:[
																							{name: "introSound", 				start:0, 	duration: 16},
																							{name: "outroSound", 				start:17, 	duration: 9.5},
																							{name: "bonusSpecialBlink", 		start:27, 	duration: 1.2},
																							{name: "bonusSpecialRotating",		start:29, 	duration: 0.5}
																							]};

		settings.winSounds = [null, null, null, null, null, "winMan", "winWomen", "winPoseidon", "winAthene", null];
		settings.freespinSounds = ["winScatterFS"];
		settings.winFullSounds = [{card:0, name:"fullLine1"}, {card:1, name:"fullLine1"},
								  {card:2, name:"fullLine1"}, {card:3, name:"fullLine1"},
								  {card:4, name:"fullLine1"}, {card:5, name:"fullLine2"},
								  {card:6, name:"fullLine2"}, {card:7, name:"fullLine3"},
								  {card:8, name:"fullLine4"}, {card:9, name:"fullLine4"}];

		settings.scatterSounds = [	{scatter:9, sounds:["stopScatter1", "stopScatter2", "stopScatter3", "stopScatter4", "stopScatter5"]}];
		settings.jackpotWinSounds = ["jackpotWin1", "jackpotWin2", "jackpotWin3", "jackpotWin4"];

		settings.reelVideos = [
					{src:_engineType+"/games/"+_slotName+"/images/videos/10.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 8  },
					{src:_engineType+"/games/"+_slotName+"/images/videos/J.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 8  },
					{src:_engineType+"/games/"+_slotName+"/images/videos/Q.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 8  },
					{src:_engineType+"/games/"+_slotName+"/images/videos/K.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 8  },
					{src:_engineType+"/games/"+_slotName+"/images/videos/A.jpg",	 		fps: 8, width: 175, height: 175, scale: 1,  length: 8  },
					{src:_engineType+"/games/"+_slotName+"/images/videos/man.jpg",	 		fps: 6, width: 175, height: 175, scale: 1,  length: 14 },
					{src:_engineType+"/games/"+_slotName+"/images/videos/woman.jpg",	 	fps: 6, width: 175, height: 175, scale: 1,  length: 20 },
					{src:_engineType+"/games/"+_slotName+"/images/videos/poseidon.jpg",	 	fps: 6, width: 175, height: 175, scale: 1,  length: 29 },
					{src:_engineType+"/games/"+_slotName+"/images/videos/athene.jpg",	 	fps: 6, width: 175, height: 175, scale: 1,  length: 20 },
					{src:_engineType+"/games/"+_slotName+"/images/videos/scatter_wild.jpg",	fps: 6, width: 175, height: 175, scale: 1,  length: 20 }
					];

		settings.specialExpandFrameVideo = {src:_engineType+"/games/"+_slotName+"/images/videos/specialExpandFrame.png", fps: 20, width: 195, height: 195, scale: 1, length: 15, transparent: true, loop: true, loopIndex: 5};

		settings.paytableURLs = {en: _engineType+"/games/"+_slotName+"/paytable/paytable_en.html",
								 bg: _engineType+"/games/"+_slotName+"/paytable/paytable_bg.html",
								 ru: _engineType+"/games/"+_slotName+"/paytable/paytable_ru.html",
								 nl: _engineType+"/games/"+_slotName+"/paytable/paytable_nl.html",
								 fr: _engineType+"/games/"+_slotName+"/paytable/paytable_fr.html",
								 mk: _engineType+"/games/"+_slotName+"/paytable/paytable_mk.html",
								 es: _engineType+"/games/"+_slotName+"/paytable/paytable_es.html",
								 ro: _engineType+"/games/"+_slotName+"/paytable/paytable_ro.html"
								};
		settings.helpLanguages = ["en", "es", "bg", "ro"];
	};
}
