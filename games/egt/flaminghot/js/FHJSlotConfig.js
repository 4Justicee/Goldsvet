function FHJSlotConfig(settings)
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
		settings.numImages          					= 10;
		settings.numReels	      						= 5;
		settings.numReelCards     						= 4;
		settings.combCount      						= 2;
		settings.reelWidth     							= 175;
		settings.reelHeight								= 524;
		settings.imageHeight							= 131;
		settings.reelCoordX								= 8;
		settings.reelCoordY								= 7;
		settings.reelSpacing							= 22;
		settings.transparentReels						= false;
		settings.wildIndex								= 8;
		settings.lineGame								= true;
		settings.linesCountConfig						= [1, 10, 20, 30, 40];
		settings.fixedLinesCount						= true;
		settings.comboColors;
		settings.restoreReels 							= true;
		settings.serverMessage							= null;
		settings.mainFakeReels;

		settings.scatterConfig	= [{index:9, minCount : 3, validReels : [ true, true, true, true, true ] }];

		settings.lines = [
			{ gfx:[16,201, 186,201, 204,201, 382,201, 401,201, 578,201, 597,201, 777,201, 793,201, 963,201], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,1, 1,1, 2,1, 3,1, 4,1], color:0xc170c2},
{ gfx:[16,333, 186,333, 204,333, 382,333, 401,333, 578,333, 597,333, 777,333, 793,333, 963,333], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,2, 1,2, 2,2, 3,2, 4,2], color:0xe0a23d},
{ gfx:[16,75, 186,75, 204,75, 382,75, 401,75, 578,75, 597,75, 777,75, 793,75, 963,75], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,0, 1,0, 2,0, 3,0, 4,0], color:0xac53a1},
{ gfx:[16,460, 186,460, 204,460, 382,460, 401,460, 578,460, 597,460, 777,460, 793,460, 963,460], functionType:[0,0,1,0,1,0,1,0,1,0], constDraw:[4,6,8], cells:[0,3, 1,3, 2,3, 3,3, 4,3], color:0x4cc3b9},
{ gfx:[16,207, 113,207, 188,256, 206,269, 384,383, 407,399, 486,451, 568,398, 594,380, 771,267, 791,254, 866,207, 963,207], functionType:[0,0,0,1,0,1,0,0,1,0,1,0,0], constDraw:[5,8,10], cells:[0,1, 1,2, 2,3, 3,2, 4,1], color:0xb8d1da},
{ gfx:[16,326, 113,326, 186,277, 206,264, 382,149, 402,137, 486,84, 569,137, 597,154, 772,267, 793,279, 866,326, 963,326], functionType:[0,0,0,1,0,1,0,0,1,0,1,0,0], constDraw:[5,8,10], cells:[0,2, 1,1, 2,0, 3,1, 4,2], color:0x5ec5df},
{ gfx:[16,68, 186,68, 204,68, 280,68, 382,132, 401,145, 578,261, 598,274, 775,389, 795,401, 873,453, 963,453], functionType:[0,0,1,0,0,1,0,1,0,1,0,0], constDraw:[5,7,9], cells:[0,0, 1,0, 2,1, 3,2, 4,3], color:0xd2cfbf},
{ gfx:[16,467, 186,467, 203,467, 280,467, 380,401, 401,386, 577,271, 597,259, 775,144, 793,131, 873,81, 963,81], functionType:[0,0,1,0,0,1,0,1,0,1,0,0], constDraw:[5,7,9], cells:[0,3, 1,3, 2,2, 3,1, 4,0], color:0xa16a5f},
{ gfx:[16,340, 104,340, 186,392, 203,402, 304,467, 382,467, 400,467, 578,467, 596,467, 668,467, 771,400, 792,385, 866,340, 963,340], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,2, 1,3, 2,3, 3,3, 4,2], color:0xd579e1},
{ gfx:[16,194, 100,194, 183,139, 203,127, 295,68, 382,68, 400,68, 578,68, 597,68, 674,68, 775,130, 793,141, 879,194, 963,194], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,1, 1,0, 2,0, 3,0, 4,1], color:0x7ac496},
{ gfx:[16,82, 100,82, 183,136, 202,148, 381,266, 400,278, 577,395, 595,406, 686,467, 777,467, 792,467, 963,467], functionType:[0,0,0,1,0,1,0,1,0,0,1,0], constDraw:[5,7,10], cells:[0,0, 1,1, 2,2, 3,3, 4,3], color:0xc7c8e3},
{ gfx:[16,453, 100,453, 181,399, 202,385, 380,270, 400,256, 577,139, 596,127, 689,68, 775,68, 792,68, 963,68], functionType:[0,0,0,1,0,1,0,1,0,0,1,0], constDraw:[5,7,10], cells:[0,3, 1,2, 2,1, 3,0, 4,0], color:0x8f63c6},
{ gfx:[16,322, 92,322, 186,380, 210,398, 304,457, 381,405, 400,393, 578,277, 597,266, 680,213, 769,268, 791,283, 886,345, 963,345], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,2, 1,3, 2,2, 3,1, 4,2], color:0xa780d8},
{ gfx:[16,212, 89,212, 186,146, 204,135, 303,74, 382,125, 403,138, 578,252, 602,268, 679,318, 758,267, 792,244, 881,189, 963,189], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,1, 1,0, 2,1, 3,2, 4,1], color:0xfa668d},
{ gfx:[16,62, 85,62, 186,128, 203,140, 293,201, 381,140, 400,129, 486,74, 578,131, 596,143, 678,197, 770,136, 792,121, 886,62, 963,62], functionType:[0,0,0,1,0,0,1,0,0,1,0,0,1,0,0], constDraw:[6,9,12], cells:[0,0, 1,1, 2,0, 3,1, 4,0], color:0x957812},
{ gfx:[16,472, 85,472, 186,403, 204,391, 293,335, 382,391, 401,402, 486,459, 576,400, 596,386, 678,336, 775,397, 790,407, 890,472, 963,472], functionType:[0,0,0,1,0,0,1,0,0,1,0,0,1,0,0], constDraw:[6,9,12], cells:[0,3, 1,2, 2,3, 3,2, 4,3], color:0xd84950},
{ gfx:[16,189, 96,189, 186,246, 216,267, 294,317, 371,267, 400,247, 571,136, 595,120, 682,64, 776,122, 798,137, 920,214, 963,214], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,1, 1,2, 2,1, 3,0, 4,1], color:0x9bdef8},
{ gfx:[16,345, 90,345, 186,282, 210,268, 294,216, 375,269, 398,283, 575,398, 595,413, 679,469, 776,405, 793,393, 913,320, 963,320], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,2, 1,1, 2,2, 3,3, 4,2], color:0xa454b8},
{ gfx:[16,56, 87,56, 186,123, 207,137, 291,193, 382,193, 400,193, 578,193, 595,193, 672,193, 761,136, 792,114, 883,56, 963,56], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,0, 1,1, 2,1, 3,1, 4,0], color:0xb8dc50},
{ gfx:[16,477, 87,477, 186,409, 204,398, 298,338, 382,338, 400,338, 578,338, 595,338, 672,338, 770,400, 790,414, 888,477, 963,477], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,3, 1,2, 2,2, 3,2, 4,3], color:0xdebe36},
{ gfx:[16,183, 186,183, 202,183, 270,183, 382,258, 401,270, 578,389, 596,399, 721,482, 777,482, 791,482, 963,482], functionType:[0,0,1,0,0,1,0,1,0,0,1,0], constDraw:[5,7,10], cells:[0,1, 1,1, 2,2, 3,3, 4,3], color:0x4463e5},
{ gfx:[16,349, 186,349, 203,349, 273,349, 382,276, 401,264, 578,147, 597,136, 730,51, 775,51, 791,51, 963,51], functionType:[0,0,1,0,0,1,0,1,0,0,1,0], constDraw:[5,7,10], cells:[0,2, 1,2, 2,1, 3,0, 4,0], color:0xb6c7f3},
{ gfx:[16,86, 94,86, 174,138, 200,155, 374,270, 397,286, 453,324, 578,324, 595,324, 686,324, 775,380, 800,398, 876,447, 963,447], functionType:[0,0,0,1,0,1,0,0,1,0,0,1,0,0], constDraw:[5,8,11], cells:[0,0, 1,1, 2,2, 3,2, 4,3], color:0xcb712},
{ gfx:[16,447, 98,447, 172,399, 201,378, 374,267, 398,249, 467,206, 578,206, 594,206, 691,206, 775,148, 793,136, 878,85, 963,85], functionType:[0,0,0,1,0,1,0,0,1,0,0,1,0,0], constDraw:[5,8,11], cells:[0,3, 1,2, 2,1, 3,1, 4,0], color:0xd6e3d7},
{ gfx:[16,216, 113,216, 186,263, 202,274, 281,325, 382,325, 398,325, 578,325, 594,325, 696,325, 777,377, 809,398, 879,443, 963,443], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,1, 1,2, 2,2, 3,2, 4,3], color:0xe0a47e},
{ gfx:[16,315, 114,315, 184,269, 202,258, 285,206, 382,205, 398,206, 578,206, 595,206, 699,206, 776,154, 798,138, 880,90, 963,90], functionType:[0,0,0,1,0,0,1,0,1,0,0,1,0,0], constDraw:[6,8,11], cells:[0,2, 1,1, 2,1, 3,1, 4,0], color:0x77847e},
{ gfx:[16,51, 186,51, 201,51, 277,51, 382,118, 408,136, 484,185, 561,135, 595,112, 700,45, 775,45, 791,45, 963,45], functionType:[0,0,1,0,0,1,0,0,1,0,0,1,0], constDraw:[5,8,11], cells:[0,0, 1,0, 2,1, 3,0, 4,0], color:0x9b9f0d},
{ gfx:[16,482, 186,482, 201,482, 274,482, 382,409, 400,398, 484,346, 570,401, 594,417, 700,486, 775,486, 791,486, 963,486], functionType:[0,0,1,0,0,1,0,0,1,0,0,1,0], constDraw:[5,8,11], cells:[0,3, 1,3, 2,2, 3,3, 4,3], color:0xd2b267},
{ gfx:[16,355, 186,355, 203,355, 317,355, 381,397, 397,406, 486,464, 578,402, 596,392, 664,351, 776,351, 791,351, 963,351], functionType:[0,0,1,0,0,1,0,0,1,0,0,1,0], constDraw:[5,8,11], cells:[0,2, 1,2, 2,3, 3,2, 4,2], color:0x8c79b8},
{ gfx:[16,177, 186,177, 203,177, 320,177, 380,137, 398,124, 486,68, 578,127, 597,139, 665,183, 775,183, 791,183, 963,183], functionType:[0,0,1,0,0,1,0,0,1,0,0,1,0], constDraw:[5,8,11], cells:[0,1, 1,1, 2,0, 3,1, 4,1], color:0x71b4e8},
{ gfx:[16,44, 186,44, 201,44, 382,44, 397,44, 460,44, 579,120, 602,136, 777,248, 803,267, 874,313, 963,313], functionType:[0,0,1,0,1,0,0,1,0,1,0,0], constDraw:[4,7,9], cells:[0,0, 1,0, 2,0, 3,1, 4,2], color:0xe2aec3},
{ gfx:[16,486, 186,486, 201,486, 382,486, 397,486, 460,486, 579,407, 598,395, 775,279, 795,267, 874,218, 963,218], functionType:[0,0,1,0,1,0,0,1,0,1,0,0], constDraw:[4,7,9], cells:[0,3, 1,3, 2,3, 3,2, 4,1], color:0x3eaec8},
{ gfx:[16,360, 126,360, 186,397, 202,407, 298,471, 383,471, 397,471, 492,471, 579,413, 601,399, 775,285, 804,268, 876,223, 963,223], functionType:[0,0,0,1,0,0,1,0,0,1,0,1,0,0], constDraw:[6,9,11], cells:[0,2, 1,3, 2,3, 3,2, 4,1], color:0x784eb2},
{ gfx:[16,172, 124,172, 179,136, 203,120, 294,62, 382,62, 398,62, 499,62, 578,114, 611,136, 775,239, 813,267, 878,307, 963,307], functionType:[0,0,0,1,0,0,1,0,0,1,0,1,0,0], constDraw:[6,9,11], cells:[0,1, 1,0, 2,0, 3,1, 4,2], color:0x1f7c94},
{ gfx:[16,91, 91,91, 162,138, 202,163, 274,213, 382,213, 398,213, 526,213, 579,246, 609,267, 775,375, 813,399, 875,438, 963,438], functionType:[0,0,0,1,0,0,1,0,0,1,0,1,0,0], constDraw:[6,9,11], cells:[0,0, 1,1, 2,1, 3,2, 4,3], color:0x99c6d4},
{ gfx:[16,443, 96,443, 162,398, 203,370, 280,321, 382,321, 398,321, 527,321, 578,285, 605,268, 776,160, 810,137, 882,94, 963,94], functionType:[0,0,0,1,0,0,1,0,0,1,0,1,0,0], constDraw:[6,9,11], cells:[0,3, 1,2, 2,2, 3,1, 4,0], color:0xc781d3},
{ gfx:[16,310, 90,310, 186,371, 223,398, 320,460, 383,417, 411,399, 578,291, 615,268, 776,166, 817,138, 882,99, 963,99], functionType:[0,0,0,1,0,0,1,0,1,0,1,0,0], constDraw:[6,8,10], cells:[0,2, 1,3, 2,2, 3,1, 4,0], color:0x98a9db},
{ gfx:[16,221, 82,221, 187,151, 208,137, 319,69, 382,109, 422,136, 578,237, 624,268, 776,364, 825,399, 878,432, 963,432], functionType:[0,0,0,1,0,0,1,0,1,0,1,0,0], constDraw:[6,8,10], cells:[0,1, 1,0, 2,1, 3,2, 4,3], color:0x708cb5},
{ gfx:[16,90, 87,90, 165,138, 202,160, 373,268, 397,283, 577,397, 595,407, 688,467, 775,407, 793,395, 856,354, 963,354], functionType:[0,0,0,1,0,1,0,1,0,0,1,0,0], constDraw:[5,7,10], cells:[0,0, 1,1, 2,2, 3,3, 4,2], color:0x128bcd},
{ gfx:[16,438, 101,438, 162,398, 203,370, 361,268, 400,239, 562,136, 596,112, 684,55, 775,113, 807,136, 875,178, 963,178], functionType:[0,0,0,1,0,1,0,1,0,0,1,0,0], constDraw:[5,7,10], cells:[0,3, 1,2, 2,1, 3,0, 4,1], color:0x5fcefe}


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
							{reelImageIndex:0, x:1575, y:0}
							];

		settings.soundsInfo[1] = {src: _engineType+"/games/"+_slotName+"/sounds/shortSounds.mp3", sounds:[
																							{name: "stopWildSound", 				start:0, 	duration: 0.6},
																							{name: "stopScatterSound1", 			start:1, 	duration: 0.65},
																							{name: "stopScatterSound2", 			start:2, 	duration: 0.5},
																							{name: "stopScatterSound3", 			start:3, 	duration: 0.65},
																							{name: "stopScatterSound4", 			start:4, 	duration: 0.8},
																							{name: "stopScatterSound5", 			start:5, 	duration: 0.8}
																							]};
		settings.soundsInfo[2] = {src: _engineType+"/games/"+_slotName+"/sounds/winSounds.mp3", sounds:[
																							{name: "winCherry", 				start:0, 	duration: 0.9},
																							{name: "winPeach", 					start:2, 	duration: 2.2},
																							{name: "winApple", 					start:5, 	duration: 2.3},
																							{name: "winGrapes", 				start:8, 	duration: 1.8},
																							{name: "winWatermelon", 			start:11, 	duration: 3.35},
																							{name: "winBanana", 				start:14, 	duration: 1.7},
																							{name: "winBar",		 			start:17, 	duration: 2},
																							{name: "winSeven", 					start:20, 	duration: 2.7},
																							{name: "winDollar", 				start:23, 	duration: 4.4},
																							{name: "creditAnimationSound", 		start:28, 	duration: 10.0}
																							]};

		settings.winSounds = ["winCherry","winPeach","winApple", "winGrapes", "winWatermelon", "winBanana",  "winBar","winSeven",null, "winDollar" ];

		settings.winFullSounds = [	{card:0, name:"fullLine1"},
									{card:1, name:"fullLine1"},
									{card:2, name:"fullLine1"},
									{card:3, name:"fullLine1"},
									{card:4, name:"fullLine2"},
									{card:5, name:"fullLine2"},
									{card:6, name:"fullLine3"},
									{card:7, name:"fullLine4"}
								];
		settings.scatterSounds = [	{scatter:9, sounds:["stopScatterSound1", "stopScatterSound2", "stopScatterSound3", "stopScatterSound4", "stopScatterSound5"]}];

		settings.jackpotWinSounds = ["jackpotWin1", "jackpotWin2", "jackpotWin3", "jackpotWin4"];

		settings.reelVideos = [
					{src:_engineType+"/games/"+_slotName+"/images/videos/Cherry.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Peach.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Apple.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Grapes.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Watermelon.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Banana.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Bar.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Seven.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Wild.jpg", fps: 8, width: 175, height: 131, scale: 1, length: 28},
					{src:_engineType+"/games/"+_slotName+"/images/videos/Dollar.jpg", fps: 8, width: 175, height: 131, scale: 1, loopIndex: 19, length: 28}
					];
		settings.expandVideo = null;

		settings.paytableURLs = {en: _engineType+"/games/"+_slotName+"/paytable/paytable_en.html",
								 bg: _engineType+"/games/"+_slotName+"/paytable/paytable_bg.html",
								 ru: _engineType+"/games/"+_slotName+"/paytable/paytable_ru.html",
								 nl: _engineType+"/games/"+_slotName+"/paytable/paytable_nl.html",
								 fr: _engineType+"/games/"+_slotName+"/paytable/paytable_fr.html",
								 mk: _engineType+"/games/"+_slotName+"/paytable/paytable_mk.html",
								 es: _engineType+"/games/"+_slotName+"/paytable/paytable_es.html",
								 ro: _engineType+"/games/"+_slotName+"/paytable/paytable_ro.html"
								};
		settings.helpLanguages = ["en","es", "bg","ro"];
	};
}
