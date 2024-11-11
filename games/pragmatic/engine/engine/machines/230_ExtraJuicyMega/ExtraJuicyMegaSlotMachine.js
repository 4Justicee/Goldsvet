var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus == "NOTUMBLE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.topView = [];
    this.boxView = [];
    this.topTumble = "";
    this.boxTumble = "";
    this.topLineAbove = 12;
    //          
    this.tumbleIndex = 0;
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    this.tumbleMulti = 1;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinStartMulti = 1;
    this.freeSpinRandomMode = {};
    this.freeSpinSelect = [];
    this.freeSpinData;

    this.buyMulti = 100;
    this.buyPatternCount = 30;
    this.doubleMulti = 0.25;

    //             
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1, multiScatter = 13;
var empty = 14, slotWidth = 6, slotHeight = 7;
var winMulti = 1;
var winLines = [], tumblingPositions = [];
var baseReels = [
    [11, 7, 9, 12, 11, 12, 5, 5, 9, 12, 5, 7, 7, 5, 9, 9, 9, 9, 1, 3, 6, 5, 5, 12, 12, 11, 7, 5, 5, 4, 6, 7, 11, 11, 11, 11, 5, 6, 5, 9, 7, 7, 9, 8, 11, 11, 12, 5, 10, 11, 9, 3, 3, 3, 7, 9, 6, 6, 8, 9, 9, 1, 11, 9, 12, 4, 11, 9, 9, 12, 12, 12, 12, 4, 12, 5, 9, 12, 6, 11, 11, 7, 6, 6, 12, 9, 3, 10, 7, 7, 7, 7, 9, 7, 6, 12, 7, 7, 4, 10, 3, 6, 9, 12, 6, 9, 11, 6, 6, 6, 6, 7, 11, 3, 12, 9, 9, 7, 9, 12, 12, 3, 12, 12, 11, 11, 5, 5, 5, 5, 12, 11, 7, 10, 5, 4, 7, 3, 6, 5, 6, 6, 11, 9, 12, 8, 8, 8, 5, 6, 5, 12, 12, 11, 9, 6, 3, 3, 11, 11, 9, 8, 9, 10, 10, 10, 12, 12, 11, 11, 12, 9, 11, 8, 10, 7, 12, 11, 7, 6, 7, 8, 11],
    [8, 4, 9, 7, 10, 4, 3, 7, 7, 10, 5, 8, 12, 3, 3, 3, 12, 12, 8, 4, 10, 7, 5, 7, 10, 10, 7, 12, 6, 10, 9, 10, 8, 8, 8, 12, 5, 8, 4, 7, 8, 5, 4, 10, 7, 5, 11, 3, 7, 12, 9, 12, 12, 12, 12, 3, 10, 8, 6, 4, 4, 12, 7, 12, 8, 10, 1, 12, 10, 3, 8, 7, 7, 7, 7, 4, 12, 4, 7, 12, 8, 10, 11, 8, 5, 8, 12, 9, 6, 5, 10, 10, 10, 10, 5, 12, 12, 8, 8, 5, 12, 10, 3, 10, 8, 8, 11, 7, 8, 1, 5, 5, 5, 5, 3, 10, 8, 10, 10, 5, 5, 4, 12, 10, 12, 4, 7, 12, 10, 8, 4, 4, 4, 4, 12, 5, 12, 10, 8, 7, 12, 6, 3, 12, 5, 3, 7, 4, 11, 5, 12, 7],
    [9, 4, 12, 12, 8, 9, 9, 11, 11, 11, 11, 8, 6, 9, 4, 11, 5, 10, 3, 6, 8, 8, 8, 8, 5, 11, 11, 10, 11, 6, 6, 5, 5, 5, 11, 11, 7, 10, 11, 3, 8, 6, 11, 10, 10, 10, 10, 4, 11, 9, 3, 10, 6, 4, 6, 11, 3, 3, 3, 10, 5, 10, 1, 7, 8, 9, 9, 9, 9, 12, 11, 10, 10, 8, 11, 10, 9, 8, 12, 12, 12, 8, 7, 9, 8, 9, 9, 6, 3, 11, 6, 6, 6, 6, 9, 4, 6, 4, 6, 8, 10, 10, 11, 4, 4, 4, 4, 3, 8, 10, 10, 9, 9, 8, 4, 11, 10],
    [7, 3, 5, 9, 9, 6, 6, 3, 10, 7, 12, 12, 12, 12, 5, 11, 6, 6, 7, 12, 6, 9, 5, 6, 9, 10, 11, 11, 11, 11, 5, 7, 9, 12, 12, 9, 9, 12, 5, 11, 8, 9, 3, 3, 3, 6, 8, 11, 5, 11, 11, 1, 11, 3, 9, 5, 5, 9, 9, 9, 9, 6, 11, 7, 5, 12, 4, 9, 11, 9, 12, 12, 9, 8, 7, 7, 7, 7, 12, 5, 9, 7, 7, 6, 9, 9, 7, 10, 6, 11, 6, 6, 6, 6, 12, 7, 4, 11, 11, 4, 6, 12, 11, 12, 3, 9, 8, 8, 8, 7, 11, 8, 3, 7, 3, 10, 11, 6, 4, 11, 7, 10, 10, 10, 7, 3, 12, 9, 12, 5, 6, 12, 11, 7, 9, 12, 5, 5, 5, 5, 1, 5, 11, 12, 5, 9, 11, 11, 12, 6, 12, 11, 7, 12],
    [8, 7, 10, 8, 12, 12, 3, 12, 10, 7, 7, 12, 8, 8, 8, 8, 3, 6, 8, 10, 9, 9, 4, 5, 7, 12, 7, 10, 9, 12, 12, 12, 12, 10, 3, 10, 12, 6, 7, 11, 11, 3, 4, 12, 10, 3, 12, 7, 7, 7, 7, 9, 10, 8, 12, 4, 7, 10, 12, 10, 3, 12, 5, 8, 10, 10, 10, 10, 8, 7, 11, 8, 10, 12, 5, 5, 1, 3, 1, 7, 8, 5, 5, 5, 5, 4, 4, 12, 4, 5, 5, 7, 3, 4, 7, 8, 12, 5, 10, 4, 4, 4, 4, 12, 8, 10, 8, 12, 4, 8, 7, 4, 10, 5, 7, 8, 3, 3, 3, 6, 5, 11, 10, 6, 12, 8, 7, 5, 5, 8, 12, 12, 10, 4],
    [11, 5, 6, 10, 11, 9, 3, 9, 6, 11, 11, 11, 11, 7, 11, 10, 9, 11, 10, 6, 4, 7, 10, 12, 8, 8, 8, 8, 11, 10, 6, 1, 4, 8, 8, 4, 11, 10, 9, 9, 9, 9, 6, 6, 4, 9, 11, 4, 8, 6, 10, 4, 9, 3, 3, 3, 8, 11, 8, 4, 9, 11, 9, 6, 3, 10, 7, 10, 10, 10, 10, 8, 3, 11, 6, 10, 10, 8, 9, 11, 10, 6, 6, 6, 6, 10, 6, 5, 8, 9, 6, 5, 4, 8, 11, 10, 4, 4, 4, 4, 11, 11, 3, 6, 9, 9, 8, 10, 12, 8, 12, 12, 12, 5, 11, 10, 8, 9, 12, 11, 7, 11, 8, 11, 7, 7, 7, 8, 9, 3, 12, 3, 10, 9, 4, 8, 9, 1, 9]
];
var freeReels = [
    [9, 12, 12, 10, 3, 10, 12, 5, 11, 13, 12, 4, 6, 9, 9, 9, 9, 6, 10, 9, 7, 9, 5, 3, 3, 6, 4, 6, 11, 11, 11, 11, 8, 13, 9, 12, 11, 7, 9, 3, 5, 12, 11, 10, 12, 8, 8, 8, 9, 11, 8, 7, 12, 4, 12, 8, 11, 5, 7, 11, 7, 3, 3, 3, 13, 4, 5, 5, 11, 11, 9, 7, 7, 12, 10, 3, 9, 9, 12, 12, 12, 12, 6, 6, 5, 9, 4, 13, 12, 12, 4, 7, 3, 12, 11, 11, 7, 7, 7, 7, 9, 11, 13, 9, 5, 8, 7, 10, 6, 11, 9, 11, 5, 10, 6, 6, 6, 6, 3, 5, 3, 7, 4, 12, 6, 8, 6, 7, 11, 9, 7, 5, 5, 5, 5, 6, 13, 6, 8, 7, 4, 12, 9, 11, 12, 10, 13, 12, 9],
    [11, 10, 10, 11, 8, 8, 12, 10, 13, 11, 8, 4, 12, 11, 3, 3, 3, 5, 7, 5, 10, 10, 9, 9, 10, 8, 13, 5, 8, 10, 11, 8, 8, 8, 8, 6, 8, 4, 12, 5, 5, 3, 12, 6, 8, 5, 8, 3, 10, 12, 12, 12, 12, 11, 13, 8, 10, 6, 5, 10, 12, 4, 12, 13, 7, 8, 3, 12, 10, 10, 10, 10, 12, 8, 8, 7, 7, 11, 8, 4, 6, 12, 10, 3, 6, 12, 13, 7, 7, 7, 7, 3, 3, 9, 10, 9, 5, 13, 4, 7, 10, 10, 12, 7, 4, 11, 11, 11, 10, 12, 5, 9, 10, 12, 4, 12, 11, 10, 13, 12, 7, 3, 5, 5, 5, 5, 7, 8, 9, 11, 6, 8, 7, 8, 7, 13, 7, 12, 7, 8, 7, 6, 6, 6, 3, 13, 4, 7, 8, 5, 9, 12, 12, 10, 5, 12, 8, 6, 10, 4, 4, 4, 12, 13, 7, 4, 12, 10, 4, 9, 7, 3, 5, 4, 9, 7, 12, 12, 6],
    [6, 3, 9, 8, 9, 8, 6, 10, 9, 3, 10, 8, 7, 8, 11, 11, 11, 11, 13, 7, 4, 11, 6, 8, 6, 8, 6, 6, 9, 5, 9, 10, 4, 9, 8, 8, 8, 8, 10, 9, 13, 10, 4, 8, 11, 5, 9, 8, 8, 12, 12, 9, 6, 8, 4, 5, 5, 5, 10, 8, 10, 10, 11, 11, 8, 5, 13, 11, 6, 7, 3, 8, 6, 9, 10, 10, 10, 10, 9, 4, 6, 10, 9, 10, 4, 12, 10, 9, 4, 6, 13, 8, 4, 3, 3, 3, 10, 7, 10, 9, 9, 12, 3, 11, 11, 4, 9, 6, 10, 10, 13, 6, 9, 9, 9, 9, 7, 9, 11, 10, 9, 11, 8, 12, 11, 11, 8, 9, 10, 7, 11,  13,10, 6, 6, 6, 6, 7, 11, 10, 11, 6, 3, 5, 5, 9, 13, 8, 10, 7, 4, 8, 9, 7, 7, 7, 10, 3, 8, 5, 6, 4, 12, 8, 5, 12, 5, 4, 11, 7, 12, 11, 4, 4, 4, 4, 11, 3, 12, 3, 9, 10, 11, 13, 3, 11, 8, 11, 5, 11, 12, 11, 11],
    [6, 12, 11, 12, 11, 13, 6, 4, 12, 11, 12, 5, 5, 9, 5, 12, 12, 12, 12, 7, 13, 12, 9, 3, 9, 11, 6, 12, 11, 3, 8, 12, 5, 12, 7, 11, 9, 11, 11, 11, 11, 13, 9, 12, 6, 10, 11, 7, 11, 9, 9, 4, 11, 3, 9, 9, 8, 7, 9, 9, 9, 9, 13, 6, 3, 9, 4, 8, 11, 7, 4, 11, 5, 10, 10, 12, 9, 7, 11, 6, 7, 7, 7, 7, 4, 9, 7, 6, 9, 13, 3, 9, 10, 3, 8, 9, 5, 12, 3, 7, 6, 6, 6, 6, 9, 10, 12, 11, 4, 12, 13, 7, 6, 6, 10, 11, 7, 11, 7, 10, 6, 4, 4, 4, 5, 11, 7, 13, 3, 11, 12, 12, 7, 9, 6, 5, 9, 5, 8, 4, 5, 5, 5, 5, 7, 12, 5, 6, 7, 10, 8, 12, 5, 3, 8, 6, 11, 11, 12, 10, 4, 4],
    [7, 10, 10, 5, 8, 5, 4, 12, 3, 10, 13, 3, 8, 8, 8, 8, 5, 4, 12, 12, 4, 10, 12, 5, 3, 3, 8, 4, 9, 9, 9, 13, 12, 5, 6, 8, 10, 7, 7, 5, 7, 13, 9, 8, 12, 12, 12, 12, 8, 11, 9, 8, 5, 7, 8, 11, 3, 12, 12, 9, 7, 7, 7, 7, 10, 13, 10, 5, 7, 3, 3, 8, 10, 10, 12, 12, 6, 8, 10, 10, 10, 10, 7, 3, 11, 8, 13, 6, 7, 7, 4, 6, 4, 8, 5, 5, 5, 5, 8, 12, 13, 12, 7, 9, 8, 4, 4, 7, 6, 11, 12, 4, 4, 4, 4, 5, 11, 8, 10, 4, 6, 12, 13, 12, 10, 7, 5, 12, 8, 11, 11, 11, 12, 10, 5, 12, 9, 8, 11, 8, 10, 10,  13,12, 9, 3, 3, 3, 11, 10, 9, 6, 11, 13, 9, 10, 7, 7, 13, 12, 10, 10],
    [3, 8, 11, 4, 8, 12, 6, 13, 10, 11, 6, 10, 9, 11, 9, 11, 11, 11, 11, 10, 13, 11, 6, 5, 9, 11, 8, 5, 9, 9, 8, 4, 3, 8, 4, 8, 8, 8, 8, 12, 8, 5, 8, 3, 3, 7, 10, 7, 3, 4, 5, 5, 9, 6, 10, 9, 9, 9, 9, 8, 4, 6, 4, 10, 6, 7, 13, 12, 9, 5, 8, 9, 10, 9, 10, 4, 3, 3, 3, 11, 6, 8, 3, 10, 13, 9, 7, 9, 11, 10, 12, 6, 11, 12, 9, 10, 10, 10, 10, 13, 10, 8, 10, 11, 6, 11, 9, 10, 9, 11, 9, 13, 10, 10, 11, 6, 6, 6, 6, 9, 8, 5, 10, 10, 8, 12, 7, 6, 9, 7, 6, 11, 8, 4, 11, 5, 5, 5, 11, 10, 10, 8, 13, 6, 3, 8, 11, 8, 3, 11, 4, 12, 12, 9, 4, 13, 4, 4, 8, 10, 8, 11, 11, 6, 11, 11, 4, 5, 6, 7, 10, 4,  13,4, 7, 7, 7, 8, 12, 7, 3, 11, 5, 8, 11, 13, 9, 6, 12, 9, 10, 8, 9, 9]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 10, 8, 7, 6, 4, 3, 3, 2, 2, 0, 0],
    [0, 0, 0, 25, 15, 12, 10, 9, 6, 4, 4, 3, 3, 0, 0],
    [0, 0, 0, 40, 25, 20, 15, 12, 8, 6, 6, 5, 5, 0, 0],
    [0, 0, 0, 120, 75, 50, 40, 30, 20, 15, 15, 12, 12, 0, 0]
];
var freeSpinCountArray = [8, 12, 16, 20, 28];
var multiList = [3, 4, 5, 6, 8, 10, 12, 15];
var reelSizeList = [2, 3, 4, 5, 6, 7];
var percentList = {
    freeWinPercent: 30,
    longReelPercent: 50,
    shortReelPercent: 10,
    reelChangePercent: 50,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 25; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        this.view = this.tumbleCacheList[0];
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.tumbleCacheList = this.freeSpinCacheList[0];
        this.view = this.tumbleCacheList[0];
        this.freeSpinStartLength = getFreeSpinCounts(this.view);
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.tmb_res = 0;
    this.tmb_win = 0;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = GetWinLines(winLines);
    this.tumbles = GetTumbles(this.view, tumblingPositions);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    if (isFreeSpinWin(this.view)) {
        this.freeSpinLength = 0;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinStartLength = getFreeSpinCounts(this.view);

        if (this.freeSpinStartLength < 28) {
            this.currentGame = "BONUS";
            this.bonusLevel = freeSpinCountArray.indexOf(this.freeSpinStartLength);
            this.bonusEnd = false;
            var status = [0, 0, 0, 0, 0];
            status[freeSpinCountArray.indexOf(this.freeSpinStartLength)] = 1;
            this.bonusStatus = status;
        } else {
            this.freeSpinIndex = 1;
            this.currentGame = "FREE";
            this.freeSpinLength = this.freeSpinStartLength;
            this.bonusStatus = [0, 0, 0, 0, 1];
        }
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var tumbleCacheView = this.tumbleCacheList[this.tumbleIndex];

    this.view = tumbleCacheView;
    this.winMoney = WinFromView(tumbleCacheView, player.betPerLine);
    this.winLines = GetWinLines(winLines);
    this.tumbles = GetTumbles(tumbleCacheView, tumblingPositions);
    this.tmb_res += this.winMoney;
    this.tmb_win += this.winMoney;

    this.tumbleIndex++;

    if (this.currentGame == "FREE") {
        this.freeSpinWinMoney += this.winMoney;
    }

    this.multPosList = getMultiScatterPos(tumbleCacheView).multiList;

    this.view = GetFinalView(tumbleCacheView);

    //                 
    if (this.winMoney == 0) {
        var multi = getMultiScatterPos(tumbleCacheView).totalMulti;
        if (multi != 0) {
            this.tmb_res *= multi;
            this.winMoney = this.tmb_res - this.tmb_win;
            this.freeSpinWinMoney = this.freeSpinWinMoney + this.winMoney;
        }
        this.tumbleStatus = "NOTUMBLE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player, true);
        if (this.tumbleStatus == "NOTUMBLE") {
            if (this.freeSpinIndex >= this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        var {viewList, tumbleWinMoney} = RandomZeroView(baseReels, player.betPerLine)
        this.view = viewList[0];
    }else{
        this.view = this.tumbleCacheList[0];
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = GetWinLines(winLines);
    this.tumbles = GetTumbles(this.view, tumblingPositions);

    this.multPosList = getMultiScatterPos(this.view).multiList;

    this.view = GetFinalView(this.view);
    this.freeSpinWinMoney += this.winMoney;

    this.tmb_res = 0;
    this.tmb_win = 0;
    
    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_win += this.winMoney;
        this.tmb_res += this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;

    var gambleSelectFlag = Number(param.ind);

    //                          
    if (gambleSelectFlag == 0) {
        this.currentGame = "FREE";
        this.freeSpinIndex = 1;
        var freeLen = freeSpinCountArray[this.bonusLevel];
        this.freeSpinLength = freeLen;
        this.bonusEnd = true;
    } else {
        var winPercent = 0;
        if (this.bonusLevel == 0) {
            winPercent = 66;
        } else if (this.bonusLevel == 1) {
            winPercent = 70;
        } else if (this.bonusLevel == 2) {
            winPercent = 65;
        } else if (this.bonusLevel == 3) {
            winPercent = 55;
        }

        var gambleWin = Util.probability(winPercent);
        if (gambleWin) {
            this.bonusLevel++;
            // 28          
            if (this.bonusLevel == 4) {
                this.currentGame = "FREE";
                this.freeSpinIndex = 1;
                this.freeSpinLength = 28;
                this.bonusEnd = true;
            }
        } else {
            this.bonusLevel--;
            if (this.bonusLevel < 0) {
                this.currentGame = "BASE";
                this.bonusEnd = true;
            }
        }
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
        default: break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterViewData = RandomScatterView(baseReels, bpl);

    //                           
    fsCount = 28;

    //                           
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push([scatterViewData]);

    return {
        win: fsCache.win,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinCacheList = [];

    var scatterViewData = RandomScatterView(baseReels, bpl);

    //                           
    fsCount = 28;

    //                           
    var fsCache = BuyBonusViewCache(freeReels, bpl, fsCount);
    freeSpinCacheList.push([scatterViewData]);

    return {
        win: fsCache.win,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0, calcCount = 0;
    while (true) {
        var tumbleWinMoney = 0;
        var view = RandomView(reels);
        var tumbleWinMoney = WinFromView(view, bpl);
        
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
        if (tumbleWinMoney == 0) {
            continue;
        }
        var viewList = [view];

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumblingPositions);
            var newView = GetTumbleView(lastView, lastTumbling);

            if (isFreeSpinWin(newView)) {
                continue;
            }

            var nWinMoney = WinFromView(newView, bpl);
            viewList.push(newView);
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
        var winMoney = WinFromView(view, bpl);
        if (winMoney == 0) {
            var viewList = [];
            viewList.push(view);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
        }
    }
};

var RandomView = function (reels, reelSizes = []) {

    while (true) {
        var view = [];

        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            var reelSize;
            if (reelSizes.length > 0) {
                reelSize = reelSizes[i];
                if (Util.probability(percentList.reelChangePercent)) {
                    reelSize = Util.random(reelSize, slotHeight);
                }
            } else if (Util.probability(percentList.longReelPercent)) {
                reelSize = reelSizeList[Util.random(0, reelSizeList.length)];
            } else if (Util.probability(percentList.shortReelPercent)) {
                reelSize = reelSizeList[Util.random(0, reelSizeList.length / 3 * 2)];
            } else {
                reelSize = reelSizeList[Util.random(0, reelSizeList.length / 3)];
            }

            for (var j = 0; j < reelSize; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
            }
            for (var j = reelSize; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                view[viewPos] = empty;
            }
        }

        return view;
    }
};

var RandomScatterView = function (reels, bpl) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(2, slotHeight - 1) + 1;
            if (Util.probability(5)) {
                reelSize = Util.random(2, slotHeight) + 1;
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

        if (isFreeSpinWin(randomView) && WinFromView(randomView, bpl) == 0) {
            break;
        }
    }
    return randomView;
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
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen, false)

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

var BuyBonusViewCache = function (reels, bpl, fsLen, isBuy = true) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;

    while (true) {
        var view = RandomView(reels);
        var tmpView = GenMultiView(view);
        var tumbleWinMoney = WinFromView(tmpView, bpl);

        if (isBuy) {
            if (Util.probability(80)) {
                if (tumbleWinMoney == 0) {
                    continue;
                }
            }
        }

        var viewList = [tmpView];

        //                       
        if (tumbleWinMoney > 0) {
            while (true) {
                var lastView = viewList[viewList.length - 1];
                var lastTumbling = Util.clone(tumblingPositions);
                var newView = GetTumbleView(lastView, lastTumbling);

                var newTmpView = GenMultiView(newView);

                if (isFreeSpinWin(newTmpView)) {
                    continue;
                }

                var nWinMoney = WinFromView(newTmpView, bpl);
                viewList.push(newTmpView);
                tumbleWinMoney += nWinMoney;

                //                 
                if (nWinMoney == 0) {
                    var multi = getMultiScatterPos(newTmpView).totalMulti;
                    if (multi != 0) {
                        tumbleWinMoney *= multi;
                    }
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl) {
    var total_money = 0;
    var symbolList = [];
    winLines = [];
    tumblingPositions = [];
    var searched = [false, false, false, false, false, false, false];
    //                                          
    for (var k = 0; k < 5; k++) {
        for (var i = 0; i < slotHeight; i++) {
            var pos = i * slotWidth + k;
            if (searched[i]) {
                continue;
            }

            var history = [pos];
            searched[i] = true;
            var symbolId = view[pos];
            var count = 1;

            if (symbolId > multiScatter) {
                continue;
            }

            if (symbolList.indexOf(symbolId) != -1) {
                continue;
            }

            for (var j = i + 1; j < slotHeight; j++) {
                var searchPos = j * slotWidth + k;
                if (view[searchPos] == symbolId && !searched[j]) {
                    history.push(searchPos);
                    searched[j] = true;
                    count++;
                }
            }

            money = RecursiveSearch(view, 1, count, history, symbolId, bpl, k + 1);
            total_money += money;
            
            if (money > 0) {
                symbolList.push(symbolId);
            }
        }
        for (var l = 0; l < searched.length; l++) {
            searched[l] = false;
        }
    }

    return total_money;
};

var RecursiveSearch = function (view, length, count, history, symbolId, bpl, deep) {
    //                                                             
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (deep == slotWidth) {
        var winMoney = bpl * payTable[length][symbolId] * count;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);

            for (var i = 0; i < history.length; i++) {
                var pos = history[i];
                if (tumblingPositions.indexOf(pos) < 0) {
                    tumblingPositions.push(pos);
                }
            }
        }
        return winMoney;
    }

    //                                                                                            
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = deep + i * slotWidth;
        if (view[pos] == symbolId) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var winMoney = bpl * payTable[length][symbolId] * count;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);

            for (var i = 0; i < history.length; i++) {
                var pos = history[i];
                if (tumblingPositions.indexOf(pos) < 0) {
                    tumblingPositions.push(pos);
                }
            }
        }
        return winMoney;
    }

    var matchCount = 0;
    var historyTmp = Util.clone(history);
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;
    return RecursiveSearch(view, length + 1, matchCount, historyTmp, symbolId, bpl, deep + 1);
};

var GetWinLines = function (winLines) {
    var lines = [];
    for (var i = 0; i < winLines.length; i++) {
        var cache = winLines[i];
        lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~l`);
    }
    return lines.join(";");
};

var GenMultiView = function (view) {
    for (var i = 0; i < view.length; i++) {
        if (view[i] == multiScatter) {
            view[i] = multiScatter * multiList[Util.random(0, 3)];
        }
    }
    return view;
};

var GetTumbles = function (view, positions) {
    var tumbles = [];
    var tumblePos = [];

    for (var i = 0; i < positions.length; i++) {
        tumbles.push(positions[i] % slotWidth);
    }

    var startPos = Util.minInArr(tumbles).value;
    var endPos = Util.maxInArr(tumbles).value;

    for (var i = startPos; i <= endPos; i++) {
        for (var j = 0; j < slotHeight; j++) {
            if (view[j * slotWidth + i] != empty && view[j * slotWidth + i] % multiScatter != 0) {
                tumblePos.push(`${j * slotWidth + i},${view[j * slotWidth + i]}`);
            }
        }
    }

    if (tumblePos.length == 0) {
        return "";
    }
    return tumblePos.join('~');
};

var getMultiScatterPos = function (view) {
    var multiList = [];
    var totalMulti = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] % multiScatter == 0) {
            var obj = {
                pos: i,
                multi: view[i] / multiScatter
            }
            totalMulti += view[i] / multiScatter;
            multiList.push(obj);
        }
    }

    var resObj = {
        totalMulti: totalMulti,
        multiList: multiList
    }

    return resObj;
};

var GetTumbleView = function (view, tumbles) {
    if (tumbles.length == 0) {
        return view;
    }

    var tumblePos = [];
    for (var i = 0; i < tumbles.length; i++) {
        tumblePos.push(tumbles[i] % slotWidth);
    }

    var startPos = Util.minInArr(tumblePos).value;
    var endPos = Util.maxInArr(tumblePos).value;

    var initView = [...view];
    var tumbleView = [...view];

    //                              
    var multiPosList = [], reelPos = [];
    var multiValues = [];
    var reelIndex = 0, isMulti = false;
    for (var i = startPos; i <= endPos; i++) {
        reelIndex = 0, isMulti = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (tumbleView[j * slotWidth + i] != empty) {
                if (tumbleView[j * slotWidth + i] % multiScatter == 0) {
                    reelPos.push(i);
                    multiValues.push(initView[j * slotWidth + i]);
                    isMulti = true;
                }

                reelIndex++;
                tumbleView[j * slotWidth + i] = Util.random(3, 13);
            }
        }
        if (isMulti) {
            multiPosList.push(reelIndex);
        }
    }

    //                       
    for (var i = 0; i < reelPos.length; i++) {
        tumbleView[(multiPosList[i] - 1) * slotWidth + reelPos[i]] = multiValues[i];
    }

    return tumbleView;
};

var getFreeSpinCounts = function (view) {
    var freeSpinCnt = 0;
    switch (NumberOfScatters(view)) {
        case 4:
            freeSpinCnt = 12;
            break;
        case 5:
            freeSpinCnt = 16;
            break;
        case 6:
            freeSpinCnt = 20;
            break;
        default:
            break;
    }
    return freeSpinCnt;
};

var GetFinalView = function (view) {
    var newView = [...view];
    for (var i = 0; i < newView.length; i++) {
        if (newView[i] % multiScatter == 0) {
            newView[i] = multiScatter;
        }
    }

    return newView;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 4;
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

var isScatter = function (symbol) {
    return symbol == scatter;
}

module.exports = SlotMachine;