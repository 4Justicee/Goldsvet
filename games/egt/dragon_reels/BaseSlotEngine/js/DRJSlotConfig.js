function DRJSlotConfig(settings)
{
	var _slotName = settings.gameType;
	var _engineType = settings.engineType;

    //// END VARIABLES

    this.resources =
    {
        css : [_engineType+'/games/'+_slotName+'/'+_slotName+'.css'],
        img : [
			'images/background.jpg',
			'images/backgroundOverlay.png',
			'images/reel_images.jpg',
			'images/betButton.png',
			'images/denominationButton.png',
			'images/autoSoundButton.png',
			'images/settingsPaytableCloseButton.png',
			'images/settingsInfo.png',
            'images/button_sprite.png',
            'images/gambleButton.png',
            'images/mainGambleCards.png',
            'images/historyGambleCards.png'
        ],
        freespinAnimation:
    	{
			js:
			[
			 	_engineType+'js/FreespinAnimation.js',
			 	_engineType+'js/StartAnimation.js',
			 	_engineType+'js/DoorAnimation.js',
			 	_engineType+'js/IntroAnimation.js',
			 	_engineType+'js/RetriggerAnimation.js',
			 	_engineType+'js/OutroAnimation.js',
			 	_engineType+'js/Translations.js',

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
    				_engineType+'images/sp_background.png'
    			]
			}
    	}
    };

    if(settings.jackpotAllowed)
    {
    	this.resources.img.push('images/gameTitle.png');
    	this.resources.img.push('images/jackpotImages.png');
        this.resources.img.push('images/jackpotCardsElements.jpg');
        this.resources.img.push('images/jackpotCardBack.jpg');
        this.resources.img.push('images//jackpotCards.png');
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
		settings.linesCountConfig						= [1, 5, 10, 20, 25];
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
		{ gfx:[16,430, 116,430, 188,357, 202,344, 293,258, 383,258, 401,258, 578,258, 597,258, 682,258, 777,348, 791,360, 861,430, 963,430], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,2, 1,1, 2,1, 3,1, 4,2], color:0xce0089},
		{ gfx:[16,290, 112,290, 186,357, 201,371, 283,448, 381,357, 397,343, 578,181, 595,166, 688,84, 777,160, 798,179, 927,290, 963,290], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,1, 1,2, 2,1, 3,0, 4,1], color:0xce52a1},
		{ gfx:[16,243, 97,243, 177,177, 202,157, 294,85, 384,164, 403,180, 581,335, 601,354, 709,448, 777,378, 796,358, 915,243, 963,243], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,1, 1,0, 2,1, 3,2, 4,1], color:0xaf2dc5},
		{ gfx:[16,107, 120,107, 188,169, 202,182, 290,265, 380,180, 398,161, 490,76, 579,162, 597,181, 687,267, 776,184, 791,172, 863,107, 963,107], functionType:[0,0,0,1,0,0,1,0,0,1,0,0,1,0,0], constDraw:[6,9,12], cells:[0,0, 1,1, 2,0, 3,1, 4,0], color:0x3a9e26},
		{ gfx:[16,465, 70,465, 184,355, 203,336, 284,259, 383,350, 397,363, 490,448, 579,364, 596,350, 695,261, 775,337, 795,355, 909,465, 963,465], functionType:[0,0,0,1,0,0,1,0,0,1,0,0,1,0,0], constDraw:[6,9,12], cells:[0,2, 1,1, 2,2, 3,1, 4,2], color:0x227ab3},
		{ gfx:[16,276, 186,276, 204,276, 310,276, 383,344, 398,357, 490,441, 579,358, 595,345, 673,276, 777,276, 793,276, 963,276], functionType:[0,0,1,0,0,1,0,0,1,0,0,1,0], constDraw:[5,8,11], cells:[0,1, 1,1, 2,2, 3,1, 4,1], color:0x6e0cb3},
		{ gfx:[16,258, 186,258, 204,258, 290,258, 374,179, 400,154, 490,71, 579,159, 602,180, 684,258, 777,258, 793,258, 963,258], functionType:[0,0,1,0,0,1,0,0,1,0,0,1,0], constDraw:[5,8,11], cells:[0,1, 1,1, 2,0, 3,1, 4,1], color:0xce00ba},
		{ gfx:[16,115, 99,115, 137,183, 228,354, 281,450, 335,354, 430,183, 490,80, 550,182, 650,354, 708,448, 755,354, 840,183, 876,115, 963,115], functionType:[0,0,0,1,0,0,1,0,0,1,0,0,1,0,0], constDraw:[6,9,12], cells:[0,0, 1,2, 2,0, 3,2, 4,0], color:0xcba303},
		{ gfx:[16,421, 104,421, 141,354, 236,183, 293,84, 345,182, 437,354, 490,449, 541,354, 632,183, 688,84, 742,182, 834,354, 873,421, 963,421], functionType:[0,0,0,1,0,0,1,0,0,1,0,0,1,0,0], constDraw:[6,9,12], cells:[0,2, 1,0, 2,2, 3,0, 4,2], color:0xbc3500},
		{ gfx:[16,235, 100,235, 172,179, 202,152, 295,80, 350,182, 442,355, 490,440, 536,355, 631,182, 688,81, 775,157, 800,179, 866,235, 963,235], functionType:[0,0,0,1,0,0,1,0,0,1,0,0,1,0,0], constDraw:[6,9,12], cells:[0,1, 1,0, 2,2, 3,0, 4,1], color:0xa2a2a2},
		{ gfx:[16,296, 104,296, 174,359, 201,383, 280,457, 338,354, 433,183, 490,89, 547,183, 646,354, 708,457, 777,385, 802,358, 866,296, 963,296], functionType:[0,0,0,1,0,0,1,0,0,1,0,0,1,0,0], constDraw:[6,9,12], cells:[0,1, 1,2, 2,0, 3,2, 4,1], color:0xdc9314},
		{ gfx:[16,69, 187,69, 201,69, 294,69, 355,183, 445,355, 490,436, 534,355, 627,182, 691,69, 776,69, 791,69, 962,69], functionType:[0,0,1,0,0,1,0,0,1,0,0,1,0], constDraw:[5,8,11], cells:[0,0, 1,0, 2,2, 3,0, 4,0], color:0xc71c5},
		{ gfx:[16,471, 187,471, 201,471, 277,471, 342,354, 437,183, 490,93, 543,184, 643,354, 712,471, 776,471, 791,471, 962,471], functionType:[0,0,1,0,0,1,0,0,1,0,0,1,0], constDraw:[5,8,11], cells:[0,2, 1,2, 2,0, 3,2, 4,2], color:0x692ec1},
		{ gfx:[16,121, 96,121, 130,183, 221,354, 279,461, 384,461, 397,461, 579,461, 594,461, 709,461, 763,352, 847,183, 881,121, 962,121], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,0, 1,2, 2,2, 3,2, 4,0], color:0x30b337},
		{ gfx:[16,415, 98,415, 132,354, 225,182, 286,78, 384,78, 397,78, 579,78, 594,78, 695,78, 752,182, 845,354, 878,415, 962,415], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,2, 1,0, 2,0, 3,0, 4,2], color:0xf60d76}
		];

		settings.reelImages[0] = _engineType+'/games/'+_slotName+'/images/reel_images.jpg';

		settings.cardsInfo = [
							{reelImageIndex:0, x:0, y:0},
							{reelImageIndex:0, x:175, y:0},
							{reelImageIndex:0, x:875, y:0},
							{reelImageIndex:0, x:1750, y:0},
							{reelImageIndex:0, x:1050, y:0},
							{reelImageIndex:0, x:350, y:0},
							{reelImageIndex:0, x:1225, y:0},
							{reelImageIndex:0, x:700, y:0},
							{reelImageIndex:0, x:525, y:0},
							{reelImageIndex:0, x:1400, y:0},
							{reelImageIndex:0, x:1575, y:0},
							{reelImageIndex:0, x:2275, y:0},
							{reelImageIndex:0, x:2100, y:0}
							];

		settings.soundsInfo[1] = {src: _engineType+"/games/"+_slotName+"/sounds/shortSounds.mp3", sounds:[
																							{name: "reelAccelerateSound", 		start:5, 	duration: 2.04},
																							{name: "stop_scatter_1", 			start:0, 	duration: 0.5},
																							{name: "stop_scatter_2", 			start:1, 	duration: 0.57},
																							{name: "stop_scatter_3", 			start:2, 	duration: 0.53},
																							{name: "stop_scatter_4", 			start:3, 	duration: 0.53},
																							{name: "stop_scatter_5", 			start:4, 	duration: 0.61}]};
		settings.soundsInfo[2] = {src: _engineType+"/games/"+_slotName+"/sounds/winSounds.mp3", sounds:[
																							{name: "bg_petard", 				start:0, 	duration: 3},
																							{name: "bg_drum", 			start:4, 	duration: 2.62},
																							{name: "bg_lantern", 				start:7, 	duration: 3},
																							{name: "bg_man", 					start:18, 	duration: 6.58},
																							{name: "bg_woman", 				start:11, 	duration: 6},
																							{name: "bg_wild", 				start:25, 	duration: 6.17},
																							{name: "bg_scatter", 				start:32, 	duration: 2.56},
																							{name: "bg_fs_scatter", 				start:35, 	duration: 8.1},
																							{name: "creditAnimationSound", 		start:45, 	duration: 10.0}
																							]};
		settings.soundsInfo[5] = {src: _engineType+"/games/"+_slotName+"/sounds/freeSpinsSounds.mp3", sounds:[
																							{name: "pressStartSound", 				start:0, 	duration: 8},
																							{name: "outroSound", 					start:15, 	duration: 9.65},
																							{name: "bonus_retrig", 					start:9, 	duration: 4.86}
																							]};

		settings.winSounds = [null, null, null, null, "bg_petard", "bg_petard", "bg_lantern", "bg_drum", "bg_woman", "bg_man", "bg_wild", "bg_scatter"];
		settings.freespinSounds = ["bg_fs_scatter"];
		settings.winFullSounds = [{card:0, name:"fullLine1"}, {card:1, name:"fullLine1"},
								  {card:2, name:"fullLine1"}, {card:3, name:"fullLine1"},
								  {card:4, name:"fullLine1"}, {card:5, name:"fullLine2"},
								  {card:6, name:"fullLine3"}, {card:7, name:"fullLine3"},
								  {card:8, name:"fullLine3"}, {card:9, name:"fullLine4"},
								  {card:10, name:"fullLine4"}, {card:11, name:"fullLine4"}];
		settings.scatterSounds = [	{scatter:12, sounds:["stop_scatter_1", "stop_scatter_2", "stop_scatter_3", "stop_scatter_4", "stop_scatter_5"]}];
		settings.jackpotWinSounds = ["jackpotWin1", "jackpotWin2", "jackpotWin3", "jackpotWin4"];

		settings.reelVideos = [
					{src:_engineType+"/games/"+_slotName+"/images/videos/9.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/10.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/J.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Q.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/K.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/A.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/pipe.jpg",	 fps: 10, width: 175, height: 175, scale: 1, length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/lantern.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/drums.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/lady.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/man.jpg",	 fps: 8, width: 175, height: 175, scale: 1,  length: 10},
					{src:_engineType+"/games/"+_slotName+"/images/videos/wild.jpg", 	 fps: 8, width: 175, height: 175, scale: 1,  length: 40},
					{src:_engineType+"/games/"+_slotName+"/images/videos/scatter.jpg", 	 fps: 8, width: 175, height: 175, scale: 1,  length: 30},
					{src:_engineType+"/games/"+_slotName+"/images/videos/scatterFS.jpg", 	 fps: 8, width: 175, height: 175, scale: 1,  length: 30}
					];
		settings.expandVideo = null;

		settings.paytableURLs = {en: _engineType+"/games/"+_slotName+"/paytable/paytable_en.html",
								 bg: _engineType+"/games/"+_slotName+"/paytable/paytable_bg.html",
								 ru: _engineType+"/games/"+_slotName+"/paytable/paytable_ru.html",
								 nl: _engineType+"/games/"+_slotName+"/paytable/paytable_nl.html",
								 fr: _engineType+"/games/"+_slotName+"/paytable/paytable_fr.html",
								 mk: _engineType+"/games/"+_slotName+"/paytable/paytable_mk.html",
								 ro: _engineType+"/games/"+_slotName+"/paytable/paytable_ro.html",
								 es: _engineType+"/games/"+_slotName+"/paytable/paytable_es.html"
								};

		settings.helpLanguages = ["en", "bg", "es", "ro"];
	};
}
