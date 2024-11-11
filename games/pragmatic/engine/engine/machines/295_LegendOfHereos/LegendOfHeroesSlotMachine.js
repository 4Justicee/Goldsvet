var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus == "NOTUMBLE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.maskView = [];
    this.baseView = [];
    this.hammerWildCount = 0;
    this.wildPositions = 0;
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.topView = [];
    this.boxView = [];
    this.topTumble = "";
    this.boxTumble = "";
    this.topLineAbove = 12;
    //          
    this.tumbleIndex = 0;
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinPossibleLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinTumbleMulti = 1;
    this.freeSpinStartLength = 0;

    this.buyMulti = 100;
    this.buyPatternCount = 30;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1;
var wild = 2;
var empty = 19;
var slotWidth = 6;
var slotHeight = 8;
var winMulti = 1;
var winLines = [];
var winSymbols = [];
var tumblingPositions = [];
var freeSpinCountArray = [10, 14, 18, 22];
var lastHammerPosition = 0; //                                                 
var baseReels = [
    [10, 8, 9, 9, 8, 5, 12, 12, 4, 12, 5, 7, 8, 12, 8, 5, 5, 11, 9, 9, 9, 9, 12, 8, 5, 5, 1, 12, 12, 5, 12, 9, 4, 5, 9, 12, 12, 8, 9, 9, 8, 5, 1, 5, 5, 5, 8, 12, 10, 9, 8, 10, 3, 7, 8, 6, 5, 9, 12, 8, 6, 5, 8, 4, 8, 8, 8, 10, 9, 9, 3, 10, 5, 8, 5, 12, 6, 7, 12, 12, 8, 9, 5, 7, 8, 6, 12, 12, 12, 1, 9, 9, 11, 7, 8, 9, 7, 8, 12, 12, 7, 12, 11, 8, 8, 9, 12, 8, 5, 5, 4],
    [9, 10, 6, 10, 11, 11, 6, 7, 6, 8, 7, 10, 10, 10, 11, 4, 1, 11, 12, 7, 4, 10, 7, 7, 3, 4, 11, 10, 4, 4, 4, 9, 5, 11, 5, 10, 6, 12, 7, 7, 8, 8, 4, 7, 7, 7, 7, 7, 1, 9, 12, 5, 3, 7, 10, 10, 8, 11, 9, 11, 12, 11, 11, 11, 1, 10, 11, 10, 11, 7, 7, 4, 10, 11, 7, 10, 8, 7, 11],
    [10, 7, 6, 11, 9, 5, 6, 9, 12, 11, 11, 9, 11, 6, 4, 12, 4, 8, 7, 9, 12, 5, 1, 5, 4, 7, 6, 4, 4, 10, 8, 6, 10, 12, 8, 6, 6, 6, 6, 6, 8, 6, 9, 4, 7, 9, 8, 1, 5, 9, 6, 8, 11, 11, 8, 8, 4, 8, 9, 6, 12, 7, 9, 11, 4, 3, 7, 6, 6, 8, 10, 4, 12, 12, 8],
    [4, 12, 9, 4, 9, 3, 10, 3, 9, 1, 10, 10, 10, 6, 12, 9, 12, 11, 3, 8, 12, 10, 9, 12, 12, 12, 12, 6, 8, 7, 3, 12, 1, 12, 4, 6, 7, 9, 9, 9, 6, 10, 9, 12, 6, 11, 10, 7, 5, 6, 8, 12],
    [12, 6, 10, 10, 8, 3, 6, 6, 12, 9, 5, 1, 11, 12, 7, 11, 8, 6, 4, 6, 10, 5, 5, 6, 10, 12, 7, 12, 10, 11, 8, 12, 1, 8, 10, 10, 5, 11, 12, 8, 3, 3, 5, 6, 5, 10, 9, 9, 4, 12, 10, 6, 12, 5, 9, 8, 9, 5, 7, 8, 1, 9, 6, 5, 8, 6, 10, 6, 11, 5, 11, 7, 7, 12, 10, 10, 8, 10, 6, 1, 5, 12, 5, 4, 7, 8, 6, 4, 5, 6, 12, 10, 11, 8, 6, 6, 5, 12, 4, 8, 11, 8, 5, 10, 6, 1, 11, 6, 4, 12, 6, 5, 11, 10, 4, 10, 5, 3, 6, 5, 6, 6, 5, 11, 11, 4, 5, 1, 11, 11, 9, 9, 3, 12, 6, 12, 11, 11, 5, 10, 6, 7, 12, 10, 6, 11, 11, 9, 7, 12, 9, 9, 12, 6, 6, 5, 6, 11],
    [4, 11, 8, 8, 1, 5, 7, 9, 10, 10, 10, 10, 9, 8, 12, 6, 3, 1, 12, 7, 9, 10, 11, 11, 11, 12, 10, 10, 11, 5, 11, 6, 11, 5, 4],
];
var freeReels = [
    [4, 12, 9, 5, 10, 6, 8, 6, 8, 6, 6, 12, 11, 8, 11, 12, 5, 9, 9, 9, 9, 8, 8, 10, 12, 9, 7, 10, 9, 8, 12, 8, 8, 9, 12, 12, 7, 9, 8, 12, 8, 12, 12, 12, 12, 12, 8, 4, 12, 8, 6, 4, 10, 11, 9, 12, 9, 8, 7, 6, 12, 8, 12, 6, 8, 8, 8, 3, 6, 4, 11, 8, 9, 8, 8, 9, 6, 12, 6, 5, 7, 9, 10, 9, 11, 6, 5, 8],
    [7, 12, 12, 4, 9, 8, 9, 12, 12, 10, 9, 8, 8, 11, 9, 4, 8, 8, 10, 9, 12, 6, 8, 10, 12, 5, 10, 7, 8, 5, 11, 11, 12, 12, 6, 3, 6, 9, 8, 12, 8, 3, 6, 8, 3, 9, 12, 5, 6, 12, 8, 7, 8, 9, 9, 6, 9, 8],
    [8, 7, 5, 4, 12, 12, 5, 10, 7, 12, 10, 11, 6, 11, 11, 10, 10, 12, 5, 12, 12, 8, 10, 6, 7, 9, 4, 12, 10, 4, 11, 7, 9, 10, 10, 8, 12, 10, 11, 9, 11, 6, 10, 10, 3, 9, 6, 11, 4, 9, 11, 8, 10, 9, 12, 7, 7, 7, 10, 9, 10, 12, 11, 5, 8, 9, 3, 8, 7, 7, 9, 7, 6, 8, 9, 9, 8, 4, 9, 8, 6, 11, 7, 7, 8, 9, 4, 10, 4, 7, 5, 7, 12, 4, 7, 8, 10, 5, 12, 6, 4, 7, 6, 9, 6, 7, 11, 8, 10, 11, 9, 7, 9, 10, 4, 6],
    [11, 8, 7, 9, 7, 5, 3, 9, 5, 3, 12, 9, 8, 4, 8, 9, 12, 3, 4, 12, 8, 7, 7, 6, 9, 11, 12, 9, 12, 3, 12, 9, 7, 9, 7, 12, 3, 12, 9, 5, 5, 5, 9, 10, 4, 12, 9, 8, 12, 4, 7, 5, 12, 7, 12, 7, 10, 7, 5, 8, 12, 11, 12, 12, 8, 5, 12, 3, 10, 12, 11, 4, 9, 3, 12, 12, 9, 12, 9, 7, 5, 12, 12, 12, 12, 12, 11, 7, 11, 8, 7, 7, 12, 10, 8, 7, 9, 7, 9, 12, 3, 5, 7, 7, 9, 12, 4, 5, 10, 12, 4, 10, 7, 7, 10, 7, 9, 12, 12, 9, 7, 3, 12, 3, 4, 9, 9, 9, 5, 8, 5, 8, 3, 3, 12, 12, 10, 9, 5, 3, 3, 12, 5, 9, 12, 11, 11, 9, 3, 12, 7, 7, 5, 4, 8, 5, 12, 11, 12, 10, 7, 6, 9, 10, 5, 9, 4, 12, 9, 12],
    [11, 4, 6, 6, 11, 9, 7, 6, 7, 6, 9, 5, 4, 10, 10, 5, 7, 8, 5, 11, 12, 12, 8, 12, 3, 7],
    [11, 7, 11, 6, 11, 9, 6, 10, 5, 11, 7, 5, 11, 10, 8, 11, 5, 10, 9, 5, 10, 6, 10, 9, 12, 10, 11, 6, 6, 5, 8, 9, 11, 3, 12, 5, 4, 10, 5, 9, 8, 11, 5, 4, 9, 10, 8, 12, 11, 11, 12, 11, 9, 6, 11, 5, 5, 5, 12, 6, 5, 12, 4, 9, 9, 10, 10, 11, 10, 11, 4, 5, 6, 8, 8, 5, 6, 3, 11, 7, 10, 11, 10, 11, 5, 9, 8, 5, 9, 9, 6, 11, 10, 12, 11, 7, 5, 3, 4, 6, 10, 11, 8, 10, 6, 8, 7, 5, 9, 5, 11, 5, 6, 9, 11, 11, 11, 8, 5, 6, 9, 9, 10, 12, 7, 5, 8, 12, 12, 4, 5, 12, 9, 12, 5, 8, 5, 7, 4, 6, 7, 7, 9, 6, 12, 5, 11, 10, 12, 4, 10, 12, 6, 10, 5, 12, 5, 12, 11, 4, 7, 11, 11, 3, 12, 5, 12, 12, 10, 7, 6, 12, 5, 5, 6],
];
var topReels = [2, 2, 11, 3, 10, 7, 8, 12, 18, 13, 10, 5, 2, 6, 12, 12, 4, 11, 10, 7, 2, 17, 11, 10, 2, 12, 4, 2, 8, 16, 15, 7, 10, 11, 2, 11, 5, 12, 9, 10, 2, 8, 11, 9, 6, 6, 10, 10, 10, 12, 12, 14, 8, 6, 11, 18, 10, 2, 3, 2, 4, 4, 7, 12, 6, 8, 11, 10, 7, 10, 2, 13, 10, 10, 14, 11, 10, 2, 8, 7, 6, 5, 16, 8, 11, 8, 10, 11, 3, 4, 12, 9, 11, 9, 9, 9, 9, 10, 9, 9, 3, 17, 11, 10, 8, 4, 18, 9, 7, 18, 7, 7, 3, 11, 3, 8, 9, 8, 10, 12, 10, 3, 2, 15, 9, 10, 10, 7, 13, 10, 2, 11, 7, 11, 11, 5, 9, 12, 8, 7, 9, 9, 11];
var max_reelSizes = [8, 7, 7, 7, 7, 8];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 10, 10, 5, 4, 4, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 40, 20, 10, 8, 8, 5, 5, 4, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 50, 30, 15, 12, 10, 10, 10, 8, 8, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 400, 100, 50, 40, 30, 25, 20, 18, 16, 12, 0, 0, 0, 0, 0, 0, 0],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.hammerWildCount = 0;

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    var viewData = {};
    this.tmb_res = 0;
    this.gambleStatus = "NOGAMBLE";
    this.gambleResult = "NORESULT";

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        viewData = this.tumbleCacheList[0];
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.tumbleCacheList = this.freeSpinCacheList[0];
        viewData = this.tumbleCacheList[0];
    }

    winMulti = 1;
    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.view = viewData.baseView;
    this.topView = viewData.topView;
    this.boxView = viewData.boxView;
    this.maskView = viewData.maskView;
    this.hammerWildCount = viewData.wildCnt;
    this.wildPositions = viewData.wildPositions;

    this.winMoney = WinFromView(viewData.view, player.betPerLine);
    this.winLines = winLines;

    var topTumblePositions = [],
        boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);
    this.topLineAbove = Util.random(wild, 8);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    } else {
        this.CheckFreeSpin();
    }
};

SlotMachine.prototype.CheckFreeSpin = function () {
    if (isFreeSpinWin(this.view)) {
        this.freeSpinStartLength = getFreeSpinCounts(this.view);
        this.freeSpinLength = 0;
        if (this.freeSpinStartLength < 22) {
            this.currentGame = "FREE";
            this.gambleStatus = "GAMBLE";
            this.freeSpinPossibleLength = this.freeSpinCacheList.length - 1;
            this.bonusLevel = 0;
            this.isBonusEnd = 0;
            this.bonuslifes = 1;
            var statusStr = "";
            for (var i = 0; i < freeSpinCountArray.length; i++) {
                if (this.freeSpinStartLength == freeSpinCountArray[i]) {
                    statusStr = statusStr + "1,";
                } else {
                    statusStr = statusStr + "0,";
                }
            }
            this.bonusStatus = statusStr.slice(0, statusStr.length - 1);
        } else {
            this.freeSpinIndex = 1;
            this.currentGame = "FREE";
            this.gambleStatus = "NOGAMBLE";
            this.freeSpinWinMoney = this.tmb_res;
            this.freeSpinLength = this.freeSpinStartLength;
            this.freeSpinTumbleMulti = 1;
        }
    }
}

SlotMachine.prototype.Tumbling = function (player, isFreeSpin = false) {
    var viewData = this.tumbleCacheList[this.tumbleIndex];
    this.view = viewData.baseView;
    this.topView = viewData.topView;
    this.boxView = viewData.boxView;
    this.maskView = viewData.maskView;
    this.hammerWildCount = viewData.wildCnt;
    this.wildPositions = viewData.wildPositions;

    if (isFreeSpin) {
        this.freeSpinTumbleMulti++;
        winMulti = this.freeSpinTumbleMulti;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.winMoney = WinFromView(viewData.view, player.betPerLine);
    this.winLines = winLines;

    var topTumblePositions = [],
        boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);

    this.tmb_res += this.winMoney;
    this.topLineAbove = Util.random(wild, 8);
    this.tumbleIndex++;

    //                 
    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
        if (!isFreeSpin) {
            this.CheckFreeSpin();
        }
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player, true);

        if (this.tumbleStatus == "NOTUMBLE") {
            this.freeSpinWinMoney += this.tmb_res;

            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    var viewData = this.tumbleCacheList[0];
    this.view = viewData.baseView;
    this.topView = viewData.topView;
    this.boxView = viewData.boxView;
    this.maskView = viewData.maskView;
    this.hammerWildCount = viewData.wildCnt;
    this.wildPositions = viewData.wildPositions;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    winMulti = this.freeSpinTumbleMulti;
    this.winMoney = WinFromView(viewData.view, player.betPerLine);
    this.winLines = winLines;

    var topTumblePositions = [],
        boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);
    this.topLineAbove = Util.random(wild, 8);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var gambleSelectionFlag = Number(param.ind);
    if (gambleSelectionFlag) {
        this.freeSpinStartLength += 4;
        this.bonusLevel++;
        if (this.freeSpinStartLength <= this.freeSpinPossibleLength) {
            if (this.freeSpinStartLength == 22) {
                this.isBonusEnd = 1;
                this.freeSpinLength = this.freeSpinStartLength;
                this.freeSpinIndex = 1;
                this.freeSpinWinMoney = this.tmb_res;
                this.freeSpinTumbleMulti = 1;
            } else {
                this.isBonusEnd = 0;
            }
            this.bonuslifes = 1;
            var statusStr = "";
            for (var i = 0; i < freeSpinCountArray.length; i++) {
                if (this.freeSpinStartLength == freeSpinCountArray[i]) {
                    statusStr = statusStr + "1,";
                } else {
                    statusStr = statusStr + "0,";
                }
            }
            this.bonusStatus = statusStr.slice(0, statusStr.length - 1);
        } else {
            this.isBonusEnd = 1;
            this.bonuslifes = 0;
            this.currentGame = "BASE";
        }
    } else {
        this.freeSpinLength = this.freeSpinStartLength;
        this.isBonusEnd = 1;
        this.bonuslifes = 0;
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = this.tmb_res;
        this.freeSpinTumbleMulti = 1;
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

    winMulti = 1;
    if (baseWin > 0) {
        var { viewList, tumbleWinMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
    } else {
        var { viewList, tumbleWinMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
    }

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
            break;
        default:
            break;
    }

    var result = {
        error: 1,
        msg: "Jackpot Type Error",
    };
    return result;
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterViewCache = RandomScatterView(baseReels, bpl);
    var tumbleCacheList = scatterViewCache.viewList;

    //                           
    var fsCount = getFreeSpinCounts(tumbleCacheList[tumbleCacheList.length - 1].baseView);
    if (fsCount < 22) {
        if (Util.probability(15)) {
            fsCount = freeSpinCountArray[Util.random(freeSpinCountArray.indexOf(fsCount), freeSpinCountArray.length)];
        } else if (Util.probability(10)) {
            fsCount = freeSpinCountArray[Util.random(freeSpinCountArray.indexOf(fsCount) + 1, freeSpinCountArray.length)];
        } else {
            fsCount = 22;
        }
    }
    // console.log("fsCount: " + fsCount);

    //                           
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterViewCache.tumbleWinMoney, fsCount);
    freeSpinCacheList.push(tumbleCacheList);

    return {
        win: fsCache.win + scatterViewCache.tumbleWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinCacheList = [];

    var scatterViewCache = RandomScatterView(baseReels, bpl);
    var tumbleCacheList = scatterViewCache.viewList;

    //                           
    var fsCount = getFreeSpinCounts(tumbleCacheList[tumbleCacheList.length - 1].view);
    if (fsCount < 22) {
        if (Util.probability(15)) {
            fsCount = freeSpinCountArray[Util.random(freeSpinCountArray.indexOf(fsCount), freeSpinCountArray.length)];
        } else if (Util.probability(10)) {
            fsCount = freeSpinCountArray[Util.random(freeSpinCountArray.indexOf(fsCount) + 1, freeSpinCountArray.length)];
        } else {
            fsCount = 22;
        }
    }
    // console.log("fsCount: " + fsCount);

    //                           
    var fsCache = BuyBonusViewCache(freeReels, bpl, fsCount, true);
    freeSpinCacheList.push(tumbleCacheList);

    return {
        win: fsCache.win + scatterViewCache.tumbleWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0,
        calcCount = 0;
    while (true) {
        var view = RandomView(reels);
        var hammerPos = GetHammerPosition(view);
        lastHammerPosition = hammerPos;
        var viewData = GetFinalViewData(view, hammerPos);
        var tumbleWinMoney = WinFromView(viewData.view, bpl);

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }

        if (tumbleWinMoney == 0) {
            continue;
        }

        var viewList = [viewData];

        //                       
        while (true) {
            var lastCache = viewList[viewList.length - 1];
            var prevWin = WinFromView(lastCache.view, bpl); // (NumberOfHammer(newView) > 1 && nWinMoney == 0)           continue       lastTumbling.length = 0                                           .
            var lastTumbling = tumblingPositions;
            var newView = GetTumbleView(lastCache.view, lastTumbling);
            var newHammerPos = GetHammerPosition(newView);
            var newViewData = GetFinalViewData(newView, newHammerPos, lastHammerPosition);

            let originLastHammerPosition = lastHammerPosition;
            lastHammerPosition = newHammerPos;
            var nWinMoney = WinFromView(newViewData.view, bpl);
            var nHammers = NumberOfHammer(newView);
            if ((nHammers > 0 && nHammers % 2 == 0 && nWinMoney == 0) || isScatterWin(newView)) {
                lastHammerPosition = originLastHammerPosition;
                continue;
            }
            viewList.push(newViewData);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            return { viewList, tumbleWinMoney };
        }

    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var hammerPos = GetHammerPosition(view);
        var viewData = GetFinalViewData(view, hammerPos);
        var tumbleWinMoney = WinFromView(viewData.view, bpl);

        if (hammerPos <= 0 && tumbleWinMoney == 0) {
            var viewList = [];
            viewList.push(viewData);
            return { viewList, tumbleWinMoney };
        }
    }
};

var RandomView = function (reels, reelSizes = [], isScatterView = false) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(3, max_reelSizes[i] + 1);

            if (reelSizes.length > 0) {
                reelSize = reelSizes[i];
            }

            for (var j = 0; j < reelSize; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                randomView[viewPos] = reels[i][reelPos];
            }
            for (var j = reelSize; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                randomView[viewPos] = empty;
            }
        }

        var topIndex = Util.random(0, topReels.length);
        for (var i = 0; i < slotWidth; i++) {
            randomView[i] = topReels[(topIndex + i) % topReels.length];
        }

        randomView[0] = empty;
        randomView[slotWidth - 1] = empty;

        if (isScatterView) {
            break;
        }

        var scatterCount = NumberOfScatters(randomView);

        if (scatterCount < 3 && (scatterCount == 0 || Util.probability(10))) {
            break;
        }
    }

    return randomView;
};

var isNotHammerView = function (view) {
    if (NumberOfHammer(view) == 0) {
        var hammerSupportSymbolCount = 0;

        for (var i = 0; i < slotWidth; ++i) {
            if (view[i] > 13 && view[i] != empty) {
                ++hammerSupportSymbolCount;
            }
        }

        if (!hammerSupportSymbolCount) {
            return true;
        }
    }

    return false;
}

var RandomScatterView = function (reels, bpl) {
    winMulti = 1;

    while (true) {
        var view = [];
        var nWinMoney = 0;
        var newView = [];
        var nScatters = 0;
        var viewData = {};

        while (true) {
            view = RandomView(reels, [], true);
            viewData = GetFinalViewData(view, 0);
            nWinMoney = WinFromView(viewData.view, bpl);
            nScatters = NumberOfScatters(view);
            if (isNotHammerView(view) && (nScatters >= 4 && nWinMoney == 0 || Util.probability(12) && nScatters >= 2 && nWinMoney > bpl * 10)) {
                break;
            }
        }

        var tumbleWinMoney = nWinMoney;
        var viewList = [viewData];

        //                       
        while (tumbleWinMoney) {
            var lastCache = viewList[viewList.length - 1];
            var lastTumbling = tumblingPositions;
            newView = GetTumbleView(lastCache.view, lastTumbling, true);

            if (!isNotHammerView(newView)) {
                continue;
            }

            var newViewData = GetFinalViewData(newView, 0);
            nWinMoney = WinFromView(newViewData.view, bpl);

            viewList.push(newViewData);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }
        }

        nScatters = NumberOfScatters(view);
        if (nScatters >= 4) {
            if (nScatters >= 6 && Util.probability(20)) {
                continue;
            } else if (nScatters >= 5 && Util.probability(20)) {
                continue;
            }
            return { viewList, tumbleWinMoney };
        }
    }
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen, false);

        if (freeSpinData.win >= minMoney && freeSpinData.win <= maxMoney) {
            return freeSpinData;
        }

        if (freeSpinData.win > lowerLimit && freeSpinData.win < minMoney) {
            lowerLimit = freeSpinData.win;
            lowerView = freeSpinData;
        }
        if (freeSpinData.win > maxMoney && freeSpinData.win < upperLimit) {
            upperLimit = freeSpinData.win;
            upperView = freeSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var BuyBonusViewCache = function (reels, bpl, fsLen, isBuy = false) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;
    winMulti = 1;

    while (true) {
        // var view = RandomView(reels, [], true);
        while (true) {
            var view = RandomView(reels);
            var hammerPos = GetHammerPosition(view);
            var originWin = WinFromView(view, bpl);

            if (isScatterInView(view) == false && (hammerPos <= 0 || originWin > 0)) {
                break;
            }
        }

        lastHammerPosition = hammerPos;
        //                       7                    
        if (!isBuy && originWin > 0 && hammerPos <= 0 && Util.probability(22)) {
            if (Util.probability(60)) {
                var reelNo = Util.random(1, 5);
                var symbol = winSymbols[Util.random(0, winSymbols.length)];

                for (var j = 0; j < slotHeight - 1; ++j) {
                    view[reelNo + j * slotWidth] = symbol;
                }
            } else {
                var reelNo = Math.floor(Util.random(0, 2)) * 5;
                var symbol = winSymbols[Util.random(0, winSymbols.length)];

                for (var j = 1; j < slotHeight; ++j) {
                    view[reelNo + j * slotWidth] = symbol;
                }
            }
        }

        var viewData = GetFinalViewData(view, hammerPos);
        var tumbleWinMoney = WinFromView(viewData.view, bpl);
        var viewList = [viewData];
        //                       
        if (tumbleWinMoney > 0) {
            while (true) {
                var lastCache = viewList[viewList.length - 1];
                var prevWin = WinFromView(lastCache.view, bpl); // (NumberOfHammer(newView) > 1 && nWinMoney == 0)           continue       lastTumbling.length = 0                                           .
                var lastTumbling = tumblingPositions;
                while (true) {
                    if (lastTumbling.length == 0) {
                        console.log('tumbleing error');
                    }
                    var newView = GetTumbleView(lastCache.view, lastTumbling);
                    if (isScatterInView(newView) == false) {
                        break;
                    }
                }

                var newHammerPos = GetHammerPosition(newView);
                var newViewData = GetFinalViewData(newView, newHammerPos, lastHammerPosition);

                let originLastHammerPosition = lastHammerPosition;
                lastHammerPosition = newHammerPos;
                winMulti++;
                var nWinMoney = WinFromView(newViewData.view, bpl);
                var nHammers = NumberOfHammer(newView);
                if ((nHammers > 0 && nHammers % 2 == 0 && nWinMoney == 0) || isScatterWin(newView)) {
                    lastHammerPosition = originLastHammerPosition;
                    continue;
                }

                viewList.push(newViewData);
                tumbleWinMoney += nWinMoney;

                //                 
                if (nWinMoney == 0) {
                    break;
                }
            }
        }

        freeSpinCacheList.push(viewList);
        freeSpinWinMoney += tumbleWinMoney;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            break;
        }
    }

    freeSpinData = {
        win: freeSpinWinMoney,
        cache: freeSpinCacheList,
    };

    return freeSpinData;
};

var getFreeSpinCounts = function (view) {
    var freeSpinCnt = 0;
    switch (NumberOfScatters(view)) {
        case 4:
            freeSpinCnt = 10;
            break;
        case 5:
            freeSpinCnt = 14;
            break;
        case 6:
            freeSpinCnt = 18;
            break;
        case 7:
            freeSpinCnt = 22;
            break;
        case 8:
            freeSpinCnt = 26;
            break;
        case 9:
            freeSpinCnt = 30;
            break;
        default:
            break;
    }
    return freeSpinCnt;
};

var GetFinalView = function (view) {
    var newView = Util.clone(view);
    for (var i = 0; i < newView.length; i++) {
        if (newView[i] > 13 && newView[i] != empty) {
            newView[i] -= 6;
        }
    }

    return newView;
};

var GetHammerPosition = function (view) {
    var tmpView = Util.clone(view);
    var topSymbolArray = tmpView.slice(1, slotWidth - 1);
    var hammerPos = 0;
    for (var i = 0; i < topSymbolArray.length - 1; i++) {
        if (topSymbolArray[i] == 13) {
            hammerPos = i + 1;
        }
    }

    return hammerPos;
};

var NumberOfHammer = function (view) {
    var tmpView = Util.clone(view);
    var topSymbolArray = tmpView.slice(1, slotWidth - 1);
    var hammerCnt = 0;
    for (var i = 0; i < topSymbolArray.length; i++) {
        if (topSymbolArray[i] == 13) {
            hammerCnt++;
        }
    }
    return hammerCnt;
};

var GetWildView = function (tmpView, position, lastPos = 0) {
    var view = Util.clone(tmpView);
    var wildCnt = 0,
        wildPositions = [];

    if (position > 0 && position != lastPos) {
        for (var i = position; i < view.length; i += slotWidth) {
            if (view[i] != empty) {
                view[i] = wild;
                wildPositions.push(i);
                wildCnt++;
            }
        }
        for (var i = position + 1; i < view.length; i += slotWidth) {
            if (view[i] != empty) {
                view[i] = wild;
                wildPositions.push(i);
                wildCnt++;
            }
        }
        return {
            wildCnt: wildCnt,
            boxView: view,
            wildPositions: wildPositions,
        };
    } else {
        return {
            wildCnt: wildCnt,
            boxView: view,
            wildPositions: wildPositions,
        };
    }
};

//                                                                             
var GetFinalViewData = function (view, hammerPos, lastPos = 0) {
    var tmpView = Util.clone(view);
    var boxView = tmpView.slice(slotWidth, slotWidth * slotHeight);
    var wildBoxData = GetWildView(boxView, hammerPos, lastPos);

    var moneyTopLine = GetFinalView(tmpView.slice(0, slotWidth));
    if (hammerPos > 0) {
        moneyTopLine[hammerPos + 1] += 6;
    }

    var baseTopLine = GetFinalView(tmpView.slice(0, slotWidth));
    if (hammerPos > 0) {
        baseTopLine[hammerPos + 1] = 13;
    }

    var topView = baseTopLine.slice(1, slotWidth - 1).reverse();

    return {
        baseView: baseTopLine.concat(wildBoxData.boxView),
        view: moneyTopLine.concat(wildBoxData.boxView),
        topView: topView,
        boxView: wildBoxData.boxView,
        maskView: boxView,
        wildCnt: wildBoxData.wildCnt,
        wildPositions: wildBoxData.wildPositions,
    };
};

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    winSymbols = [];
    tumblingPositions = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (view[pos] == empty) {
            continue;
        }
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    //                           ,                                               
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId] * winMulti;
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                if (tumblingPositions.indexOf(history[i]) < 0) {
                    tumblingPositions.push(history[i]);
                }
            }
            winLines.push(`0~${winMoney}~${history.join("~")}`);
            winSymbols.push(symbolId);
        }
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId] * winMulti;
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                if (tumblingPositions.indexOf(history[i]) < 0) {
                    tumblingPositions.push(history[i]);
                }
            }
            winLines.push(`0~${winMoney}~${history.join("~")}`);
            winSymbols.push(symbolId);
        }
        return winMoney;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var GetTumbles = function (view, positions) {
    var tumbles = [];
    for (var i = 0; i < positions.length; i++) {
        var tumblePos = positions[i];
        if (tumblePos < 0 || tumblePos >= view.length) {
            continue;
        }
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    if (tumbles.length == 0) {
        return "";
    }
    return tumbles.join("~");
};

var GetTumbleView = function (view, tumbles, isScatterView = false) {
    while (true) {
        var tumbleView = Util.clone(view);

        //                                
        for (var i = slotWidth - 1; i >= 1; i--) {
            //                                    
            if (tumbles.indexOf(i) >= 0 && tumbleView[i] != empty) {
                for (var j = i + 1; j < slotWidth - 1; j++) {
                    tumbleView[j - 1] = tumbleView[j];
                }
                if (tumbleView[slotWidth - 3] == 13) {
                    tumbleView[slotWidth - 2] = Util.random(14, empty);
                } else {
                    tumbleView[slotWidth - 2] = -1;
                }
            }
        }

        //                                             
        for (var i = 0; i < slotWidth; i++) {
            //                                         
            for (var j = 1; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                if (view[pos] == empty) {
                    break;
                }
                //                                    
                if (tumbles.indexOf(pos) >= 0 && tumbleView[pos] != empty) {
                    for (var k = j - 1; k >= 1; k--) {
                        tumbleView[i + (k + 1) * slotWidth] = tumbleView[i + k * slotWidth];
                    }
                    tumbleView[i + slotWidth] = -1;
                }
            }
        }

        var randomView = RandomView(baseReels, max_reelSizes, true);

        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
            }
        }
        tumbleView[0] = empty;
        tumbleView[slotWidth - 1] = empty;

        if (isDoubleScatterInLine(tumbleView) || !isScatterView && NumberOfScatters(tumbleView) >= 3) {
            continue;
        }

        var otherView = false;
        for (var i = 0; i < tumbleView.length; i++) {
            if (view[i] != tumbleView[i]) {
                otherView = true;
                break;
            }
        }

        if (otherView) {
            return tumbleView;
        }
    }
};

var isDoubleScatterInLine = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var numberOfScattersOfLine = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (isScatter(view[i + j * slotWidth])) {
                numberOfScattersOfLine++;
            }
        }
        if (numberOfScattersOfLine > 1) {
            return true;
        }
    }
    return false;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isScatterWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 4;
};

var isScatterInView = function (view) {
    var isScatter = false;

    for (var i = 0; i < view.length; i++) {
        if (view[i] == scatter) {
            isScatter = true;
        }
    }

    return isScatter;
};

var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
};

module.exports = SlotMachine;