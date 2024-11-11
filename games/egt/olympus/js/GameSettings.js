/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function GameSettings()
{
	var self = this;

	if ( GameSettings.prototype._instance ) {
      return GameSettings.prototype._instance;
    }
    GameSettings.prototype._instance = this;

	// COMMON SETTINGS
	self.customResult = false;
	self.reelStartBounceTime = 0;
	self.reelStopBounceTime = 0.4;
	self.reelStopBouncePercent = 30; 			// a percent of the slot image height to bounce
	self.reelRotationSpeed = 50;  				// pixels per frame
	self.reelRotationDirection = -1;
	self.gameInitialReelRotationTime = 400;  	// how many ms to rotate the fake reels before the real ones appear
	self.gameBetweenReelsDelay = 400;   		// how many ms to wait, before stopping the next reel
	self.autoplayWinVisualizationTime = 2000;
	self.autoplayWinVisualizationTimePerLine = 1000;
	self.freeSpinsWinVisualizationTime = 1600;
	self.gambleShowTime = 0.3;
	self.gambleHideTime = 0.3;
	self.balance;
	self.betValues;
	self.currBetIndex;
	self.currLineIndex;
	self.gambleChoice;
	self.historyCards = [];
	self.denominations;
	self.currDenominationIndex;
	self.gameType;
	self.screenName;
	self.diamondPlay = false;
	self.currency = true;
	self.currencyType;
	self.displayBanknotesOnly = false;
	self.currFreespin = 0;
	self.totalFreespins = 0;
	self.freespinGame = false;
	self.autoplayGame = false;
	self.jackpotAllowed = true;
	self.jackpotMinBet;
	self.jackpotMaxBet;
	self.paytableCoeficients;
	self.jackpotValues = [14, 1455, 10422, 53202];
	self.processingSubscribe = false;
	self.noSoundAndFastLineBlink = false;
	self.translations = { };
	self.autoplayLimit;
	self.remainingAutoplays;
	self.sendTotalsInfo;
	self.totalBet = 0;
	self.totalWin = 0;
	self.minimumSpinTime = 0;
	self.comboCoeficients = [0,0,0,0,0];
	self.currLanguage;

	// INDIVIDUAL SETTINGS
	self.gameType;
	self.numImages;
	self.numReels;
	self.numReelCards;
	self.combCount;
	self.reelWidth;
	self.reelHeight;
	self.imageHeight;
	self.reelCoordX;
	self.reelCoordY;
	self.reelSpacing;
	self.transparentReels;
	self.wildIndex;
	self.lineGame;
	self.linesCountConfig;
	self.fixedLinesCount;
	self.comboColors;
	self.restoreReels;
	self.serverMessage;
	self.mainFakeReels;
	self.freeSpinsExpandSymbol = 0;
	self.isFreeSpinsExpandingBegin;
	self.oldReelImage;
	self.scatterConfig;
	self.lines;

	self.frameImage;
	self.reelImages	=	[ ];
	self.cardsInfo	= 	[ ];

	self.soundsInfo = new Array();
	self.soundsInfo[0] = {src: "sounds/mainSounds.mp3", sounds:[
																			{name: "spinSound", 				start:0, 	duration: 0.25},
																			{name: "stopReelSound", 			start:1, 	duration: 0.22},
																			{name: "stopReelAllSound", 			start:2, 	duration: 0.15},
																			{name: "moneyAnimationEndSound",	start:3, 	duration: 1.35},
																			{name: "collectSound", 				start:5, 	duration: 1.45},
																			{name: "settingsShowSound",			start:7,	duration: 0.55},
																			{name: "settingsHideSound",			start:8,	duration: 0.55},
																			{name: "gambleLostSound",			start:9, 	duration: 0.95},
																			{name: "gambleWonSound",			start:10, 	duration: 0.95},
																			{name: "gambleOpenSound",			start:11, 	duration: 1.55},
																			{name: "gambleCardClickSound",		start:13, 	duration: 0.10},
																			{name: "startAutoplaySound",		start:14, 	duration: 0.25},
																			{name: "stopAutoplaySound",			start:15, 	duration: 0.52},
																			{name: "selectBetSound1",			start:16, 	duration: 0.75},
																			{name: "selectBetSound2",			start:17, 	duration: 0.6},
																			{name: "selectBetSound3",			start:18, 	duration: 0.7},
																			{name: "selectBetSound4",			start:19, 	duration: 0.55},
																			{name: "selectBetSound5",			start:20, 	duration: 0.7},
																			{name: "unmuteSound",				start:21, 	duration: 1}]};
	self.soundsInfo[3] = {src: "sounds/fullLineSounds.mp3", sounds:[
																			{name: "fullLine1", 				start:0, 	duration: 4.3},
																			{name: "fullLine2", 				start:5, 	duration: 4.75},
																			{name: "fullLine3", 				start:10, 	duration: 4.85},
																			{name: "fullLine4", 				start:15, 	duration: 5.55}]};
	self.soundsInfo[4] = {src: "sounds/jackpotSounds.mp3", sounds:[
																			{name: "jackpotBackgroundSound", 	start:0, 	duration: 8},
																			{name: "jackpotCardOpenSound", 		start:9, 	duration: 0.3},
																			{name: "jackpotShowWinnerSound", 	start:10, 	duration: 0.7},
																			{name: "jackpotWinSound1", 			start:12, 	duration: 6.84},
																			{name: "jackpotWinSound2", 			start:20, 	duration: 5.964},
																			{name: "jackpotWinSound3", 			start:27, 	duration: 6.85},
																			{name: "jackpotWinSound4", 			start:35, 	duration: 6.05},
																			{name: "jackpotIntroSound", 		start:42, 	duration: 5.07},
																			{name: "jackpotCardClickSound",		start:48, 	duration: 0.15}]};
	self.winSounds;
	self.winFullSounds;
	self.scatterSounds;
	self.jackpotWinSounds;

	self.reelVideos;
	self.expandVideo;
	self.specialExpandFrameVideo;
	self.stopVideos;
	self.paytableURLs;

	self.localize = function(word)
	{
		var locWord = self.translations[self.currLanguage][word];

		// return localized word
		if (locWord)
			return locWord

		// fall back to english
		locWord = self.translations["en"][word];

		if (locWord)
			return locWord;

		// if word not found even in english mapping return the original word
		return word;
	}

	self.assembleExpandCards = function() {
		var point;
		var rect;
		var expCard;
		var expCardContext;

		var width = self.reelWidth;
		var height = self.imageHeight;
		var expFrame = Loader.getLoader(self.frameImage).getData();

		if (self.serverMessage) {
			self.freeSpinsExpandSymbol = self.serverMessage.freeSpinsExpandSymbol;

			if (self.oldReelImage == null) {
				if (Loader.getLoader(self.reelImages[self.cardsInfo[self.freeSpinsExpandSymbol].reelImageIndex]))
					self.oldReelImage = Loader.getLoader(self.reelImages[self.cardsInfo[self.freeSpinsExpandSymbol].reelImageIndex]).getData();
				else
					self.oldReelImage = self.reelImages[self.cardsInfo[self.freeSpinsExpandSymbol].reelImageIndex];
				rect = {x: 0, y: 0, width: expFrame.width, height: expFrame.height};
				point = {x: self.cardsInfo[self.freeSpinsExpandSymbol].x, y: self.cardsInfo[self.freeSpinsExpandSymbol].y};
				expCard = new CanvasView();
				expCard.setSize(self.oldReelImage.width, self.oldReelImage.height);
				expCardContext = expCard.getContext2D();
				expCardContext.drawImage(self.oldReelImage, rect.x, rect.y);
				expCardContext.drawImage(expFrame, rect.x, rect.y, rect.width, rect.height, point.x, point.y, rect.width, rect.height);

				self.reelImages[self.cardsInfo[self.freeSpinsExpandSymbol].reelImageIndex] = expCard.getCanvas();

				point = null;
				rect = null;
			} else {
				self.reelImages[self.cardsInfo[self.freeSpinsExpandSymbol].reelImageIndex] = self.oldReelImage;
				self.oldReelImage = null;
			}
		}
	}
}

GameSettings.getInstance = function()
{
	return (new GameSettings());
}