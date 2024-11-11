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
    this.scatterWin = 0;

    //          
    this.tumbleIndex = 0;
    this.tumbles = [];
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    // api          
    this.wildChangeArr = [];
    this.multiWinLines = [];
    this.totalMulti = 1;
    this.slm_mp = [];
    this.slm_mv = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinData = [];
    this.freeSpinCacheList = [];
    //             
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];

    //             
    this.buyMulti = 100;
    this.buyPatternCount = 34;

    this.doubleMulti = 0.25;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 5;
var winLines = [], tumblingPositions = [], multiWinLines = [];
var baseReels = [
    [3, 3, 7, 6, 6, 3, 6, 4, 1, 7, 7, 8, 5, 6, 7, 2, 6, 8, 6, 5, 2, 5, 6, 6, 4, 5, 8, 5, 9, 5, 3, 9, 5, 7, 8, 3, 4, 3, 6, 8, 9, 9, 5, 5, 6, 9, 7, 6, 8, 7, 5, 7, 9, 4, 6, 9, 6, 4, 8, 6, 9, 7, 8, 1, 9, 7, 6, 7, 6, 1, 9, 5, 3, 5, 8, 8, 5, 4, 4, 4, 8, 9, 6, 7, 8, 6, 9, 7, 8, 6, 4, 8, 6, 4, 7, 3, 8, 4, 8, 5, 8, 4, 9, 4, 8, 5, 5, 6, 6, 7, 7, 5, 3, 6, 9, 4, 6, 4, 8, 5, 3, 7, 9, 8, 8, 7, 8, 6, 6, 9, 5, 4, 6, 9, 4, 3, 3, 9, 8, 7, 6, 3, 5, 5, 7, 6, 4, 6, 8, 5, 6, 8, 7, 4, 5, 6, 8, 4, 8, 5, 5, 5, 8, 6, 4, 6, 5, 9, 7, 5, 3, 4, 9, 4, 5, 3, 8, 5, 3, 4, 5, 6, 4, 7, 6, 8, 3, 3, 6, 4, 9, 6, 5, 8, 5, 5, 9, 6, 6, 4, 8, 7, 5, 4, 8, 4, 4, 6, 8, 5, 5, 6, 6, 3, 4, 5, 7, 8, 3, 5, 3, 7, 5, 6, 6, 9, 7, 9, 6, 7, 4, 9, 6, 8, 7, 3, 9, 2, 8, 9, 4, 7],
    [3, 9, 3, 7, 7, 3, 9, 9, 6, 5, 8, 8, 6, 9, 9, 8, 7, 7, 9, 3, 9, 7, 9, 6, 7, 7, 4, 7, 8, 1, 3, 8, 7, 3, 9, 3, 7, 9, 9, 6, 6, 4, 7, 3, 7, 9, 9, 4, 9, 9, 8, 7, 8, 9, 4, 9, 5, 3, 7, 7, 5, 9, 8, 5, 6, 7, 9, 5, 9, 3, 7, 7, 4, 8, 5, 7, 5, 2, 8, 4, 4, 7, 7, 8, 9, 1, 5, 7, 9, 7, 5, 7, 4, 6, 5, 7, 8, 4, 3, 8, 8, 7, 7, 3, 5, 5, 7, 6, 7, 4, 1, 6, 7, 9, 9, 8, 8, 6, 3, 7, 4, 7, 8, 7, 9, 9, 9, 4, 9, 3, 8, 7, 9, 5, 6, 9, 8, 9, 9, 7, 3, 5, 7, 8, 7, 6, 8, 3, 3, 9, 7, 9, 2, 8, 7, 7, 3, 6, 8, 5, 7, 9, 9, 7, 9, 7, 9, 9, 7, 6, 7, 7, 3, 9, 7, 9, 9, 7, 3, 9, 9, 7, 9, 6, 6, 9, 9, 8, 9, 7, 7, 2, 3, 3, 9, 7, 7, 9, 4, 9, 8, 4, 9, 7, 7, 9, 7, 5, 5, 9, 9, 6, 7, 9, 3, 9, 9, 4, 7, 9, 9, 8, 7, 9, 9, 7, 9, 4, 9, 5, 9, 7, 7, 8, 9, 8, 9, 7, 7, 8, 9, 6, 9, 3, 9, 7, 8, 7, 3, 3, 8],
    [9, 7, 7, 3, 4, 6, 5, 3, 8, 6, 5, 5, 6, 9, 3, 8, 5, 3, 7, 9, 4, 9, 8, 7, 5, 4, 5, 3, 2, 7, 6, 9, 4, 9, 5, 7, 8, 8, 5, 9, 5, 9, 4, 8, 8, 5, 3, 8, 5, 4, 8, 3, 4, 8, 5, 4, 5, 3, 7, 4, 5, 8, 6, 8, 7, 8, 6, 8, 4, 8, 3, 9, 9, 4, 9, 6, 8, 6, 5, 7, 5, 4, 8, 6, 8, 4, 7, 5, 1, 4, 8, 7, 9, 7, 6, 3, 6, 7, 9, 6, 1, 4, 9, 9, 7, 8, 8, 5, 8, 6, 8, 6, 3, 8, 5, 8, 9, 5, 8, 2, 4, 4, 7, 9, 4, 6, 9, 6, 7, 4, 4, 5, 8, 4, 5, 8, 7, 4, 6, 9, 8, 9, 3, 5, 4, 7, 4, 3, 5, 4, 5, 6, 6, 5, 4, 9],
    [4, 7, 9, 3, 9, 7, 7, 6, 4, 6, 9, 7, 4, 6, 5, 7, 9, 7, 6, 3, 7, 7, 8, 9, 3, 5, 8, 6, 7, 9, 4, 9, 8, 9, 9, 4, 9, 2, 7, 3, 9, 4, 3, 3, 9, 9, 3, 4, 8, 7, 6, 7, 9, 7, 4, 3, 9, 8, 9, 5, 9, 9, 3, 3, 9, 6, 6, 8, 4, 7, 9, 7, 1, 7, 6, 9, 7, 6, 9, 7, 3, 3, 9, 7, 7, 9, 1, 9, 8, 7, 7, 7, 7, 7, 4, 3, 5, 7, 5, 9, 9, 6, 9, 7, 9, 6, 9, 7, 2, 9, 9, 3, 7, 7, 8, 7, 8, 7, 9, 6, 6, 7, 9, 8, 3, 8, 9, 9, 3, 7, 4, 7, 3, 3, 5, 3, 9, 5, 7, 9, 4, 8, 7, 6, 7, 4, 7, 3, 9, 7, 3, 9, 3, 3, 9, 3, 5, 5, 3, 8, 7, 5, 5, 9, 6, 7, 9, 7, 3, 9, 7, 9, 5, 8, 7, 9, 7, 3, 7, 3, 8, 7, 5, 9, 5, 9, 7, 3, 4],
    [4, 7, 6, 7, 4, 4, 7, 5, 8, 5, 7, 3, 4, 7, 7, 5, 7, 9, 8, 9, 6, 4, 4, 8, 7, 5, 6, 5, 7, 6, 8, 6, 9, 6, 5, 6, 6, 5, 9, 9, 7, 3, 4, 2, 3, 4, 6, 4, 4, 8, 6, 6, 4, 6, 6, 5, 8, 4, 8, 7, 8, 8, 6, 5, 8, 4, 5, 9, 5, 8, 7, 7, 5, 6, 1, 4, 4, 5, 5, 7, 8, 3, 5, 6, 6, 6, 5, 6, 9, 7, 5, 6, 4, 3, 6, 8, 8, 4, 4, 9, 9, 6, 4, 6, 7, 8, 7, 9, 9, 3, 4, 7, 9, 6, 7, 7, 3, 4, 7, 6, 9, 8, 3, 4, 3, 8, 7, 6, 3, 9, 6, 1, 4, 9, 6, 8, 3, 1, 8, 4, 9, 7, 4, 5, 8, 4, 3, 5, 4, 8, 2, 9, 6, 8, 9, 6, 4, 2, 6, 4, 8, 4, 8, 8, 5, 8, 6, 4, 5, 8, 6, 5, 5, 5, 3, 9, 9, 6, 8, 5, 4, 4, 6, 6, 3, 5, 3, 8, 8, 6, 5, 9, 3, 5, 9, 8, 7, 6, 6, 4, 6, 5, 4, 6, 4, 6, 5, 6, 9, 4, 4, 9, 6, 5, 5, 9, 7, 3, 5, 5, 6, 6, 8, 9, 7, 8, 8, 9, 4, 5, 8, 6, 8, 6, 4, 8, 8, 5, 6, 7, 6, 9, 4, 6, 3, 4, 9, 8, 7, 6, 8, 5, 5, 7, 5, 8, 3, 8, 5, 6]
];
var freeReels = [
    [5, 7, 8, 3, 9, 8, 8, 7, 6, 6, 4, 4, 7, 8, 5, 3, 5, 7, 8, 6, 4, 4, 7, 4, 1, 6, 7, 6, 3, 8, 5, 4, 5, 7, 9, 6, 7, 8, 4, 6, 3, 9, 9, 4, 8, 3, 8, 8, 5, 5, 6, 3, 9, 5, 7, 5, 5, 6, 6, 4, 5, 6, 4, 3, 6, 8, 5, 7, 1, 6, 5, 7, 7, 8, 8, 5, 4, 5, 3, 4, 7, 9, 8, 3, 9, 5, 8, 7, 6, 7, 6, 5, 3, 5, 9, 4, 5, 5, 5, 9, 6, 5, 8, 6, 5, 5, 6, 7, 8, 9, 7, 9, 5, 9, 6, 8, 6, 5, 6, 4, 4, 9, 4, 6, 5, 9, 3, 4, 7, 3, 7, 6, 8, 1, 4, 5, 4, 7, 8, 9, 5, 4, 8, 2, 8, 5, 5, 6, 8, 8, 3, 6, 3, 8, 4, 2, 3, 6, 6, 3, 6, 6, 4, 7, 9, 8, 6, 5, 5, 7, 4, 8, 4, 8, 5, 6, 3, 5, 9, 2, 8, 8, 3, 4, 9, 6, 9, 6, 3, 7, 9, 9, 6, 5, 6, 8, 9, 9, 7, 7],
    [5, 8, 3, 9, 7, 8, 3, 9, 9, 5, 2, 6, 2, 7, 9, 7, 9, 7, 9, 6, 9, 9, 6, 3, 7, 5, 9, 7, 8, 7, 7, 5, 5, 8, 9, 7, 7, 6, 6, 7, 7, 8, 3, 5, 9, 7, 3, 6, 7, 3, 3, 9, 6, 4, 8, 5, 9, 3, 6, 7, 7, 1, 9, 8, 8, 7, 3, 7, 3, 9, 4, 7, 9, 9, 4, 4, 7, 9, 7, 7, 9, 8, 9, 8, 8, 2, 9, 3, 8, 7, 8, 9, 9, 7, 5, 9, 6, 7, 3, 4, 7, 8, 3, 9, 9, 3, 7, 1, 4, 3, 4, 8, 8, 7, 6, 8, 5, 9, 4, 8, 7, 7, 5, 2, 9, 9, 9, 1, 7, 7, 8, 7, 3, 9, 9, 5, 7, 5, 9, 8, 9, 5, 7, 7, 5, 8, 8, 7, 9, 4, 9, 6, 5, 9, 6, 7, 9, 4, 9, 7, 7, 9, 8, 9, 8, 6, 7, 4, 7, 7, 9, 9, 7, 7, 3, 8, 3, 8, 9, 9, 7, 9, 7, 7, 4, 9, 5, 8, 9, 7, 9, 8, 8, 9, 9, 8, 3, 9, 9, 3, 7, 7, 9, 8, 9, 7, 3, 6, 9, 9, 7, 9, 9, 7, 7, 8, 5, 8, 9, 8, 4, 8, 7, 7, 3, 9, 6, 9, 5, 7, 3, 7, 3, 6, 9, 3, 2, 7, 2, 7, 8, 3, 8, 9, 5, 5, 9, 7, 5, 7, 7, 9, 9, 8],
    [5, 6, 4, 8, 8, 5, 6, 9, 5, 5, 6, 8, 8, 7, 7, 9, 9, 8, 8, 6, 8, 9, 5, 5, 7, 6, 4, 7, 4, 6, 4, 8, 4, 3, 6, 4, 6, 9, 4, 8, 9, 2, 3, 5, 5, 4, 5, 3, 7, 6, 5, 8, 7, 6, 9, 9, 5, 7, 9, 8, 4, 4, 5, 4, 7, 5, 4, 4, 5, 6, 1, 9, 4, 4, 5, 3, 7, 7, 3, 3, 6, 4, 5, 8, 8, 5, 8, 6, 5, 3, 5, 6, 2, 7, 5, 7, 4, 7, 8, 5, 6, 8, 3, 4, 7, 5, 3, 8, 9, 9, 4, 8, 8, 9, 6, 7, 6, 9, 2, 7, 4, 4, 5, 6, 3, 4, 6, 9, 4, 8, 9, 4, 3, 8, 8, 9, 6, 8, 5, 5, 4, 3, 4, 5, 2, 8, 8, 7, 8, 7, 4, 9, 8, 6, 6, 5, 1, 7, 5, 4, 9, 8, 4, 9, 6, 9, 5, 6, 5, 9, 3, 5, 5, 8, 2, 8, 6, 9, 6, 8, 5, 4, 3, 3, 8, 4, 6, 8, 9, 8, 9, 8, 7, 4, 7, 8, 3, 6, 6, 8, 7, 9, 7, 6, 8, 3, 9, 4, 5, 9, 9, 5, 3, 8, 7, 5, 8, 5, 1, 5, 4, 8, 9, 6, 4, 3, 4, 9, 5, 6, 5, 4, 9, 7, 3, 8],
    [9, 7, 9, 8, 5, 9, 2, 8, 4, 7, 9, 7, 3, 9, 7, 5, 9, 7, 9, 3, 3, 1, 7, 9, 6, 7, 7, 4, 7, 8, 7, 2, 9, 9, 7, 9, 9, 3, 3, 2, 6, 7, 9, 9, 7, 9, 9, 3, 7, 8, 9, 9, 5, 7, 4, 8, 6, 3, 5, 7, 8, 9, 7, 7, 5, 3, 7, 7, 3, 9, 6, 9, 3, 7, 6, 7, 9, 3, 6, 7, 7, 6, 8, 6, 6, 3, 4, 5, 7, 5, 7, 7, 9, 7, 3, 5, 3, 6, 6, 2, 5, 2, 4, 8, 6, 4, 8, 9, 9, 6, 8, 7, 9, 7, 3, 9, 7, 9, 9, 7, 9, 7, 9, 5, 1, 4, 3, 9, 3, 7, 9, 3, 9, 5, 7, 9, 7, 3, 9, 3, 9, 3, 7, 9, 4, 3, 9, 3, 9, 9, 3, 7, 1, 9, 8, 7, 9, 3, 7, 3, 8, 9, 3, 3, 5, 6, 9, 4, 5, 9, 7, 8, 4, 9, 9, 8, 3, 7, 3, 7, 7, 9, 6, 6, 8, 9, 9, 7, 9, 8, 5, 4, 3, 7, 3, 4, 4, 8, 9, 7, 6, 8, 4, 7, 9, 9, 6, 8, 9, 6, 4, 9, 7, 3, 3, 5, 7, 9, 5, 4, 9, 4, 3, 7, 3, 8, 9, 8, 9, 6, 7, 7, 2, 9, 3, 7, 8, 9, 7, 5, 7, 3, 7, 7, 4, 7, 3, 7, 3, 9, 7, 7, 9, 5, 9, 6, 3, 9, 9, 6, 7, 4, 9, 4, 3, 7],
    [3, 8, 9, 1, 4, 8, 5, 9, 4, 7, 9, 4, 8, 4, 6, 7, 4, 9, 6, 5, 6, 7, 8, 4, 8, 6, 7, 6, 5, 5, 9, 6, 5, 7, 4, 8, 6, 8, 8, 4, 9, 7, 7, 4, 5, 8, 6, 8, 8, 9, 4, 6, 8, 5, 8, 6, 5, 8, 5, 6, 4, 9, 7, 6, 9, 6, 3, 3, 6, 2, 8, 3, 4, 5, 5, 5, 6, 4, 6, 5, 6, 4, 5, 6, 7, 6, 6, 8, 7, 3, 8, 8, 7, 5, 5, 6, 5, 5, 9, 8, 7, 8, 5, 5, 9, 5, 7, 9, 4, 3, 8, 4, 6, 8, 5, 6, 9, 7, 9, 9, 5, 5, 8, 8, 7, 8, 2, 4, 5, 8, 9, 7, 4, 3, 3, 6, 3, 6, 7, 4, 8, 8, 3, 6, 6, 3, 4, 9, 5, 1, 5]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 10, 10, 6, 4, 4, 4],
    [0, 0, 0, 100, 50, 25, 20, 10, 10, 10],
    [0, 0, 0, 1500, 400, 200, 100, 70, 50, 50]
];
var payLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.wildIndex = 0;

    this.winMoney = 0;
    this.winLines = [];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "FREE") {
        //                                       
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
        this.totalMulti = 1;
        this.freeSpinIndex = 1;
        this.freeSpinLength = this.freeSpinCacheList.length;
        this.freeSpinWinMoney = 0;
        this.currentGame = "FREE";
        return;
    }
    //                      
    this.totalMulti = 1;
    this.tumbleCacheList = viewCache.view;
    this.wildHandle(player, 0);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }
};

SlotMachine.prototype.wildHandle = function (player, tumbleIndex) {
    this.view = this.tumbleCacheList[tumbleIndex].multiView;
    this.wildChangeArr = this.tumbleCacheList[tumbleIndex].wildChangeArr;
    this.winMoney = WinFromView(this.view, player.betPerLine) * this.totalMulti;
    this.winLines = winLines;
    this.multiWinLines = multiWinLines;

    this.slm_mp = [];
    this.slm_mv = [];

    for (var i = 0; i < this.view.length; ++i) {
        if (isWild(this.view[i])) {
            this.slm_mp.push(i);
            this.slm_mv.push(Math.floor(this.view[i] / 100));
            this.view[i] %= 100;
        }
    }

    this.tumbles = [];

    if (this.winMoney) {
        this.tumbles = GetTumbles(this.view, tumblingPositions, this.wildChangeArr, this.tumbleCacheList[tumbleIndex + 1].multiView);
    }
}

SlotMachine.prototype.Tumbling = function (player) {
    this.wildHandle(player, this.tumbleIndex);
    this.tmb_res += this.winMoney;

    this.tumbleIndex++;

    //                 
    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        ++this.totalMulti;
        this.Tumbling(player);

        if (this.tumbleStatus == "NOTUMBLE") {
            //                              
            this.freeSpinWinMoney += this.tmb_res;

            if (this.freeSpinIndex >= this.freeSpinLength) {
                this.freeSpinWinMoney += this.scatterWin;
                this.currentGame = "BASE";
            }
        }

        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    this.wildHandle(player, 0);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex >= this.freeSpinLength && this.winMoney == 0) {
        this.freeSpinWinMoney += this.scatterWin;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

    if (baseWin > 0) {
        var { viewList, tmb_res } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tmb_res;
        pattern.view = viewList;
    } else {
        var { viewList, tmb_res } = RandomZeroView(baseReels, bpl);
        pattern.win = tmb_res;
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
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin / 10);
            ;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCount = GetFreeSpinCount(scatterView);
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount - 1);
    var freeSpinData = [scatterView];

    return {
        view: freeSpinData.concat(fsCache.cache),
        win: fsCache.win,
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCount = GetFreeSpinCount(scatterView);
    var fsCache = BuyBonusViewCache(freeReels, bpl, fsCount - 1);
    var freeSpinData = [scatterView];

    return {
        view: freeSpinData.concat(fsCache.cache),
        win: fsCache.win,
        bpl: bpl,
        type: "FREE",
        isCall: 0
    };
}

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0, calcCount = 0;
    while (true) {
        var tmb_res = 0;
        var multiView = RandomView(reels);
        var tmb_res = WinFromView(multiView, bpl);
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
        if (tmb_res == 0) {
            continue;
        }

        var nWinMoney = tmb_res;
        var wildChangeArr = GetWildChangeArr(multiView, nWinMoney, tumblingPositions);
        var viewList = [{
            multiView: multiView,
            wildChangeArr: wildChangeArr
        }];

        //                       
        while (nWinMoney) {
            var lastMultiView = viewList[viewList.length - 1].multiView;
            var lastWildChangeArr = viewList[viewList.length - 1].wildChangeArr;
            var lastTumbling = Util.clone(tumblingPositions);
            var newMultiView = GetTumbleView(lastMultiView, lastTumbling, lastWildChangeArr);

            if (isFreeSpinWin(newMultiView)) {
                continue;
            }
            //        GetTumbleView                                                      
            nWinMoney = WinFromView(newMultiView, bpl);
            var newWildChangeArr = GetWildChangeArr(newMultiView, nWinMoney, tumblingPositions);
            viewList.push({
                multiView: newMultiView,
                wildChangeArr: newWildChangeArr
            });
            tmb_res += nWinMoney;
        }

        if (tmb_res > bottomLimit && tmb_res <= maxWin) {
            return { viewList, tmb_res };
        }
        // calcCount++;
        // if (calcCount > 100) {
        //     return RandomZeroView(reels,bpl);
        // }
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var multiView = RandomView(reels);
        var winMoney = WinFromView(multiView, bpl);
        if (winMoney == 0) {
            var viewList = [];
            viewList.push({
                multiView: multiView,
                wildChangeArr: []
            });
            var tmb_res = 0;
            return { viewList, tmb_res };
        }
    }
};

var RandomView = function (reels, nWilds = 3) {
    var view = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
                if (view[viewPos] == 2) {
                    view[viewPos] = 102;
                }
            }
        }

        if (!isFreeSpinWin(view) && NumberOfWilds(view) <= nWilds) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl) {
    var view = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
            }
        }

        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    return view;
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
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen)
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

var BuyBonusViewCache = function (reels, bpl, fsLen) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinWinMoney = 0;
    var totalMulti = 1;
    while (freeSpinIndex <= fsLen) {
        var tmb_res = 0;
        var multiView = RandomView(reels);
        var tmb_res = WinFromView(multiView, bpl) * totalMulti;

        var nWinMoney = tmb_res;
        var wildChangeArr = GetWildChangeArr(multiView, nWinMoney, tumblingPositions);
        var viewList = [{
            multiView: multiView,
            wildChangeArr: wildChangeArr
        }];

        //                       
        while (nWinMoney) {
            ++totalMulti;
            var lastMultiView = viewList[viewList.length - 1].multiView;
            var lastWildChangeArr = viewList[viewList.length - 1].wildChangeArr;
            var lastTumbling = Util.clone(tumblingPositions);
            var newMultiView = GetTumbleView(lastMultiView, lastTumbling, lastWildChangeArr);

            if (isFreeSpinWin(newMultiView)) {
                continue;
            }

            nWinMoney = WinFromView(newMultiView, bpl) * totalMulti;
            var newWildChangeArr = GetWildChangeArr(newMultiView, nWinMoney, tumblingPositions);
            viewList.push({
                multiView: newMultiView,
                wildChangeArr: newWildChangeArr
            });
            tmb_res += nWinMoney;
        }

        ++freeSpinIndex;
        freeSpinCacheList.push(viewList);
        freeSpinWinMoney += tmb_res;
    }

    freeSpinData = {
        win: freeSpinWinMoney,
        cache: freeSpinCacheList,
    };

    return freeSpinData;
};

var GetWildChangeArr = function (multiView, nWinMoney, tumblingPositions) {
    var steps = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 }
    ];
    var changeArr = [];
    var newWildPosArr = [];
    for (var i = 0; i < slotWidth; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = i + j * slotWidth;
            if (isWild(multiView[pos])) {
                if (nWinMoney && multiView[pos] < 500) {
                    var possibleSteps = [];

                    if (tumblingPositions.indexOf(pos) >= 0) {
                        //                                                                                                                         
                        for (var k = 0; k < 4; ++k) {
                            var x = steps[k].x, y = steps[k].y;
                            if (tumblingPositions.indexOf(pos + x + y * slotWidth) >= 0) {  //    ,                              
                                if (i + x >= 0 && i + x < slotWidth && j + y >= 0 && j + y < slotHeight) {
                                    possibleSteps.push(k);
                                }
                            }
                        }

                        if (possibleSteps.length) {
                            var count = 0;
                            while (true) {
                                var k = possibleSteps[Util.random(0, possibleSteps.length)];
                                var newPos = pos + steps[k].x + steps[k].y * slotWidth;

                                if (newWildPosArr.indexOf(newPos) >= 0 && count < 4) {    //4                                            
                                    ++count;
                                    continue;
                                }

                                if (newWildPosArr.indexOf(newPos) < 0) {
                                    changeArr.push([pos, newPos]);
                                    newWildPosArr.push(newPos);
                                } else {
                                    changeArr.push([pos, pos]);
                                    newWildPosArr.push(pos);
                                }
                                break;
                            }
                        } else {
                            changeArr.push([pos, pos]);
                        }

                    }

                } else {
                    changeArr.push([pos, -1]);
                }
            }
        }
    }

    for (var i = 0; i < slotWidth; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = i + j * slotWidth;
            if (isWild(multiView[pos])) {
                if (nWinMoney && multiView[pos] < 500) {
                    var possibleSteps = [];

                    if (tumblingPositions.indexOf(pos) < 0) {
                        //                                 .                    .                                                   ,                                                                                                               .
                        var belowTmbCount = 0;

                        for (var k = j + 1; k < slotHeight; ++k) {
                            if (tumblingPositions.indexOf(i + k * slotWidth) >= 0 && newWildPosArr.indexOf(i + k * slotWidth) < 0) {
                                ++belowTmbCount;
                            }
                        }
                        var cnt = 0, k = j;
                        while (cnt < belowTmbCount) {
                            if (newWildPosArr.indexOf(i + k * slotWidth) < 0) {
                                ++cnt;
                            }
                            ++k;
                        }
                        changeArr.push([pos, i + k * slotWidth]);
                    }


                } else {
                    changeArr.push([pos, -1]);
                }
            }
        }
    }

    return changeArr;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromLine = function (view, lineId, bpl) {
    var last = 0;
    var win = 0;
    var payLine = payLines[lineId];
    var lineMulti = 0;
    //                                                       
    for (var i = 0; i < 3; ++i) {
        var notWild = i;
        while (isWild(view[payLine[notWild]]) && notWild < payLine.length) {
            ++notWild;
        }

        for (last = notWild; last < payLine.length; ++last) {
            if (view[payLine[last]] != view[payLine[notWild]] && !isWild(view[payLine[last]])) {
                break;
            }
        }

        var money = payTable[last - i][view[payLine[notWild]]] * bpl;

        if (money > 0) {
            var multi = 0;
            for (var j = i; j < last; ++j) {
                if (isWild(view[payLine[j]])) {
                    multi += Math.floor(view[payLine[j]] / 100);
                }
            }
            money *= (multi ? multi : 1);
            var winLine = `${lineId}~${money}`;
            for (var j = i; j < last; ++j) {
                winLine += `~${payLine[j]}`;
                if (tumblingPositions.indexOf(payLine[j]) < 0) {
                    tumblingPositions.push(payLine[j]);
                }
            }
            winLines.push(winLine);
            win += money;
            if (multi) {
                lineMulti = multi;
            }
            break;
        }
    }
    //                                                       
    if (last < 5) {
        var beforeLast = last;
        for (var i = 4; i >= beforeLast; --i) {
            var notWild = i;
            while (isWild(view[payLine[notWild]]) && notWild >= 0) {
                --notWild;
            }

            for (last = notWild; last >= 0; --last) {
                if (view[payLine[last]] != view[payLine[notWild]] && !isWild(view[payLine[last]])) {
                    break;
                }
            }

            var money = payTable[i - last][view[payLine[notWild]]] * bpl;

            if (money > 0) {
                var multi = 0;
                for (var j = last + 1; j <= i; ++j) {
                    if (isWild(view[payLine[j]])) {
                        multi += Math.floor(view[payLine[j]] / 100);
                    }
                }
                money *= (multi ? multi : 1);
                var winLine = `${lineId}~${money}`;
                for (var j = last + 1; j <= i; ++j) {
                    winLine += `~${payLine[j]}`;
                    if (tumblingPositions.indexOf(payLine[j]) < 0) {
                        tumblingPositions.push(payLine[j]);
                    }
                }
                winLines.push(winLine);
                win += money;
                if (multi) {
                    lineMulti = multi;
                }
                break;
            }
        }
    }
    if (lineMulti > 1) {
        multiWinLines.push([lineId, lineMulti]);
    }
    return win;
};

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    tumblingPositions = [];
    multiWinLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var linePay = WinFromLine(view, lineId, bpl);
        money += linePay;
    }
    return money;
};

var GetTumbles = function (view, tumbling, wildChangeArr, tumbleView) {
    var tumbles = [];
    for (var i = 0; i < tumbling.length; i++) {
        var tumblePos = tumbling[i];
        var isWildTumble = false;
        var j = 0;
        for (j = 0; j < wildChangeArr.length; ++j) {
            if (wildChangeArr[j][1] == tumblePos) {
                isWildTumble = true;
                break;
            }
        }
        if (!isWildTumble) {
            tumbles.push(`${tumblePos},${view[tumblePos]}`);
        } else if (tumbling.indexOf(wildChangeArr[j][0]) < 0 && !isWild(tumbleView[wildChangeArr[j][0]])) {
            tumbles.push(`${wildChangeArr[j][0]},${view[wildChangeArr[j][0]]}`);
        }
    }
    return tumbles;
};

var GetTumbleView = function (view, tumbles, wildChangeArr) {
    if (tumbles.length == 0) {
        return view;
    }

    while (true) {
        var tumbleView = Util.clone(view);
        var newWildPosArr = [];

        for (var i = 0; i < wildChangeArr.length; ++i) {
            newWildPosArr.push(wildChangeArr[i][1]);
        }

        for (var i = 0; i < wildChangeArr.length; ++i) {
            for (var j = 0; j < wildChangeArr.length; ++j) {
                if (i != j && wildChangeArr[i][1] == wildChangeArr[j][0] && wildChangeArr[i][0] == wildChangeArr[j][1]) {
                    // console.log("                      !");
                }
            }
            if (wildChangeArr[i][1] >= 0) {
                tumbleView[wildChangeArr[i][1]] = view[wildChangeArr[i][0]];
                if (tumbles.indexOf(wildChangeArr[i][0]) >= 0) {
                    tumbleView[wildChangeArr[i][1]] += 100;
                }
                if (wildChangeArr[i][1] != wildChangeArr[i][0] && newWildPosArr.indexOf(wildChangeArr[i][0]) < 0) {
                    tumbleView[wildChangeArr[i][0]] = -1;
                }
            } else {
                tumbleView[wildChangeArr[i][0]] = -1;
            }
        }

        //           
        for (var i = 0; i < slotWidth; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                //                                    
                if (tumbles.indexOf(pos) >= 0 && !isWild(tumbleView[pos])) {
                    for (var k = j; k > 0; --k) {
                        if (isWild(tumbleView[i + k * slotWidth])) {
                            continue;
                        }
                        var notWild = k - 1;
                        while (isWild(tumbleView[i + notWild * slotWidth])) {
                            --notWild;
                        }
                        if (notWild >= 0) {
                            tumbleView[i + k * slotWidth] = tumbleView[i + notWild * slotWidth];
                        }
                    }

                    var notWild = i;
                    while (isWild(tumbleView[notWild])) {
                        notWild += slotWidth;
                    }
                    tumbleView[notWild] = -1;
                }
            }
        }

        var randomView = RandomView(baseReels, 1);

        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
            }
        }

        var otherView = false;
        for (var i = 0; i < tumbleView.length; i++) {
            if (view[i] != tumbleView[i] && (!isWild(tumbleView[i]) || !isWild(view[i]))) {
                otherView = true;
                break;
            }
        }

        if (otherView && NumberOfWilds(tumbleView) <= 3) {
            return tumbleView;
        }
    }
};

var isWild = function (symbol) {
    return symbol % 100 == wild;
};

var NumberOfWilds = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result++;
        }
    }
    return result;
};

var isScatter = function (symbol) {
    return symbol == scatter;
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

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var GetFreeSpinCount = function (view) {
    switch (NumberOfScatters(view)) {
        case 5: return 15;
        case 4: return 12;
        case 3: return 10;
    }
    return 0;
};

module.exports = SlotMachine;