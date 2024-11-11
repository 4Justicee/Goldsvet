var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];
    this.multiValues = [];
    this.changeView = [];
    this.changedStr = "";

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1;
var wild = 2;
var slotWidth = 6;
var slotHeight = 4;
var winMulti = 1;
var multipleFactors = [2, 3, 5, 10, 25];

var baseReels = [
    [4, 4, 4, 4, 8, 3, 6, 6, 6, 7, 5, 6, 1, 3, 3, 3, 7, 7, 7, 5, 5, 5, 8, 8, 8, 3, 7, 5, 6, 7, 6, 7, 5, 6, 7, 3, 5, 3, 8, 6, 5, 7, 3, 7, 6, 3, 6, 7, 6, 7, 5, 3, 7, 5, 6, 7, 8, 6, 7, 3, 6, 7, 8, 5, 7, 6, 7, 8, 6, 7, 3, 7, 3, 5, 6, 7, 8, 7, 3, 6, 3, 7, 5, 8, 3, 7, 8, 7, 3, 7, 8, 6, 5, 6, 8, 7, 8, 7, 8, 5, 7, 3, 6, 3, 7, 8, 7, 3, 7, 6, 8, 6, 8, 7, 3, 6, 7, 5, 3, 6, 7, 8, 6, 5, 3, 5, 3, 8, 7, 3, 5, 8, 6, 7, 6, 7, 6, 8, 5, 3, 7, 3, 7, 3, 5, 7, 8, 7, 3, 8, 7, 5, 3, 6, 3, 7, 6, 8, 7, 3, 6, 7, 6, 7, 3, 5, 3, 7, 3, 7, 8, 6, 7, 3, 7, 5, 7, 3, 5, 7, 3, 5, 6, 3, 8, 3, 7, 3, 5, 3, 8, 6, 8, 5, 8, 5, 7, 3, 7, 3, 7, 3, 7, 3, 7, 5, 8, 6, 3, 5, 7, 3, 7],
    [4, 5, 7, 7, 7, 3, 7, 8, 6, 3, 3, 3, 5, 5, 5, 6, 6, 6, 8, 8, 8, 4, 4, 4, 5, 3, 8, 5, 6, 5, 7, 5, 7, 3, 6, 5, 6, 8, 7, 6, 5, 6, 5, 3, 7, 3, 5, 8, 5, 3, 7, 8, 3, 8, 3, 5, 8, 6, 8, 3, 5, 7, 8, 3, 8, 5, 3, 6, 5, 8, 5, 6, 8, 5, 8, 3, 5, 6, 7, 6, 7, 5, 8, 5, 7, 5, 3, 6, 8, 5, 8, 6, 7, 3, 5, 8, 6, 3, 5, 8, 7, 3, 8, 5, 7, 5, 6, 3, 8, 6, 8, 3, 8, 5, 3, 1, 8, 3, 5, 8, 3, 8, 3, 7, 8, 3, 6, 3, 7, 8, 5, 8, 3],
    [4, 8, 7, 7, 7, 5, 6, 4, 4, 4, 7, 3, 6, 6, 6, 5, 5, 5, 8, 8, 8, 7, 3, 6, 7, 5, 6, 5, 8, 7, 5, 8, 7, 3, 6, 7, 8, 6, 5, 6, 8, 5, 8, 5, 7, 5, 6, 3, 6, 7, 8, 5, 3, 7, 6, 7, 1, 6, 8, 7, 5, 8, 6, 5, 7, 5, 8, 5, 6, 5, 6, 7, 8],
    [5, 4, 4, 4, 3, 3, 3, 3, 7, 4, 5, 5, 5, 6, 8, 7, 7, 7, 6, 6, 6, 8, 8, 8, 7, 6, 1],
    [3, 3, 3, 8, 5, 5, 5, 7, 3, 5, 4, 6, 8, 8, 8, 7, 7, 7, 4, 4, 4, 6, 6, 6, 4, 7, 5, 6, 8, 6, 8, 5, 4, 8, 7, 8, 5, 8, 5, 4, 8, 6, 7, 6, 7, 6, 5, 8, 6, 5, 8, 6, 5, 4, 5, 8, 4, 8, 6, 8, 5, 8, 5, 6, 5, 8, 4, 5, 7, 4, 6, 7, 6, 8, 5, 6, 8, 6, 8, 7, 8, 7, 6, 7, 4, 7, 5, 8, 4, 8, 7, 8, 4, 7, 6, 8, 6, 7, 4, 8, 5, 8, 5, 6, 5, 6, 8, 7, 8, 7, 8, 7, 8, 4, 8, 7, 5, 8, 4, 8, 5, 7, 5, 8, 7, 6, 7, 8, 7, 5, 7, 6, 4, 8, 7, 4, 5, 8, 5, 6, 5, 7, 8, 5, 8, 6, 8, 7, 8, 4, 5, 8, 6, 7, 8, 4, 7, 6, 8, 7, 8, 5, 6, 7, 8, 6, 4, 5, 6, 5, 8, 6, 4, 7, 8, 6, 7, 6, 8, 4, 8, 6, 8, 5, 1, 8, 7, 6, 8, 4],
    [8, 5, 5, 5, 7, 7, 7, 7, 5, 8, 8, 8, 4, 3, 6, 4, 4, 4, 3, 3, 3, 6, 6, 6, 7, 6, 7, 6, 3, 4, 7, 6, 7, 6, 3, 6, 4, 5, 6, 7, 5, 6, 5, 7, 3, 7, 4, 6, 5, 6, 5, 7, 6, 3, 5, 6, 3, 5, 6, 5, 6, 7, 3, 6, 3, 6, 5, 7, 6, 3, 4, 5, 6, 5, 7, 6, 5, 4, 6, 5, 7, 5, 7, 6, 4, 5, 4, 1, 5, 3, 5, 7, 3, 5, 6, 5, 3, 6, 5, 6, 5, 6]
];
var freeReels = [
    [6, 8, 6, 6, 6, 4, 7, 4, 4, 4, 5, 3, 7, 7, 7, 8, 8, 8, 5, 5, 5, 4, 8, 7, 8, 5, 4, 5, 7, 8, 5, 8, 5, 7, 8, 7, 8, 7, 4, 8, 4, 8, 4, 8, 5, 7, 5, 8, 4, 5, 4, 7, 4, 8, 5, 8, 5, 4, 7, 4, 5, 7, 8, 4, 8, 1, 4, 5, 8, 5, 7, 8, 5, 8, 5, 8, 5, 4],
    [3, 8, 8, 8, 4, 7, 4, 4, 4, 6, 1, 8, 7, 7, 7, 5, 3, 3, 3, 6, 6, 6, 5, 5, 5, 6, 5, 6, 7, 5, 7, 5, 6, 4, 5, 6, 7, 6, 4, 7, 5, 4, 8, 5, 4, 7, 8, 5, 4, 5, 7, 4, 6, 5, 8, 7, 8, 4, 5, 4, 5, 4, 5, 4, 7, 4, 6, 5, 7, 5, 6, 5, 7, 6, 8, 5, 7, 4, 6, 4, 7, 5, 6, 8, 5, 6, 8, 6, 8, 6, 5, 7, 4, 8, 4, 6, 7, 8, 4, 5, 4, 5, 4, 8, 5, 7, 5, 6, 8, 7, 6, 7, 5, 8, 6, 4, 8, 5, 8, 4, 6, 7, 6, 7, 4, 7, 5, 6, 4, 8, 5, 4, 7, 5, 8, 6, 7, 4, 8, 4, 7, 5, 4, 8, 4, 6, 5, 4, 8, 4, 8, 5, 7, 4, 5, 6, 4, 8, 4, 8, 7, 4, 8, 7, 4, 8, 7, 5, 6, 7, 4, 7, 4, 5, 4, 5, 8, 5, 4, 8, 7, 5, 8, 4, 5, 8, 4, 6, 5, 6, 5, 4, 6, 7, 5, 4, 8, 5, 8, 5, 7, 8, 4, 6, 4, 5, 4, 6, 5, 6, 7, 4, 7, 4, 7, 4, 5, 8, 7, 5, 8, 5, 8, 7, 5, 4, 7, 8, 7, 8, 5, 7, 8, 6, 4, 5, 8, 5, 8, 5, 4, 7, 4, 8, 5, 6, 4, 7, 4, 6, 7, 8, 7, 8, 5, 8, 6, 8, 6, 4, 6, 7, 4, 8, 7, 5, 4, 8, 5, 8, 4, 8, 7, 8, 7, 4, 8, 5],
    [4, 6, 7, 5, 8, 3, 8, 8, 8, 7, 7, 7, 4, 4, 4, 5, 5, 5, 6, 6, 6, 5, 1, 7, 8, 5, 8, 7, 8, 7, 8, 3, 8, 3, 7, 8, 6, 7, 5, 8, 7, 6, 7, 8, 5, 7, 8, 7, 8, 3, 8, 5, 7, 5, 3, 6, 7, 8, 5, 6, 5, 7, 5, 8, 7, 5, 7, 6, 5, 7, 5, 7, 5, 8, 5, 7, 8, 5, 6, 8, 5, 7, 5, 3, 5, 6, 7, 8, 3, 6, 7, 5, 8, 5, 7, 8, 7, 8, 7, 3, 7, 5, 7, 5, 7, 6, 8, 7, 5, 7, 8, 7, 6, 5, 7, 5, 6, 8, 5, 3, 8, 5, 7, 5, 7, 6, 7, 6, 7, 8, 6, 5, 6, 8, 5, 8, 7, 3, 5, 6, 5, 8, 5, 7, 5, 7, 8, 3, 6, 7, 5, 3, 8, 5, 6, 5, 8, 7, 8, 3, 6, 5, 6, 5, 7, 8, 7, 8, 5, 6, 8, 5, 8, 6, 7, 3, 8, 7, 5, 6, 7, 8, 5, 8, 5, 7, 8, 5, 8, 6, 8, 5, 8, 5, 7, 8, 5, 7, 3, 8, 7, 5, 6, 8, 5, 6, 8, 6, 8, 1, 5, 8, 5, 8, 7, 6, 8, 7, 6, 5, 8, 5, 8, 7, 6, 7, 3, 8, 5, 8, 7, 5, 8, 3, 5, 7, 6, 5, 7, 5, 7, 8, 6, 7, 5, 6, 7, 6, 8, 5, 8, 5],
    [4, 7, 5, 6, 3, 8, 8, 8, 8, 3, 3, 3, 7, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4, 4, 7, 3, 7, 5, 7, 8, 6, 7, 6, 7, 6, 3, 6, 3, 5, 7, 3, 7, 8, 7, 6, 3, 8, 6, 3, 7, 5, 7, 6, 7, 6, 8, 6, 7, 5, 7, 6, 7, 3, 6, 7, 6, 7, 6, 3, 7, 5, 3, 7, 8, 6, 7, 3, 7, 3, 6, 8, 3, 7, 5, 3, 6, 3, 7, 6, 7, 5, 7, 3, 7, 3, 6, 3, 7, 5, 7, 8, 7, 3, 7, 6, 3, 8, 7, 8, 7, 3, 6, 3, 7, 8, 7, 5, 3, 5, 7, 6, 8],
    [6, 4, 4, 4, 5, 5, 5, 5, 7, 3, 4, 8, 3, 3, 3, 6, 6, 6, 7, 7, 7, 8, 8, 8, 5, 3, 4, 5, 7, 5, 4, 5, 8, 5, 7, 3, 1, 7, 5, 7, 4, 5, 7, 8, 7, 4, 8, 4, 5, 8, 7, 3, 4, 5, 3, 8, 4, 7, 8, 7, 5, 7, 8, 4, 7, 5, 3, 8, 5, 4, 5, 7, 4, 7, 5, 3, 7, 3, 8, 5, 7, 3, 4, 5, 7, 4, 5, 8, 7, 8, 4, 5, 8, 4, 7, 3, 5, 3, 5, 8, 5, 7, 3, 8, 5, 7, 4, 8, 4, 7, 8, 3, 8, 5, 4, 5, 8, 7, 4, 5, 3, 7, 5, 4, 3, 4, 8, 5, 3, 4, 7, 5, 8, 5, 3, 7, 3, 7, 3, 7, 5, 3, 4, 7, 5, 4, 3, 7, 5, 8, 5, 4, 3, 4, 3, 5, 7, 4, 7],
    [4, 8, 8, 8, 7, 3, 3, 3, 3, 6, 6, 6, 5, 6, 8, 7, 7, 7, 5, 5, 5, 4, 4, 4, 5, 6, 3, 5, 8, 7, 6, 8, 3, 6, 8, 6, 5, 7, 8, 7, 5, 6, 8, 6, 3, 6, 8, 6, 3, 8, 6, 7, 5, 8, 3, 6, 5, 3, 8, 3, 5, 7, 3, 6, 3, 7, 3, 6, 5, 8, 6, 3, 8, 3, 6, 7, 8, 5, 6, 8, 6, 5, 6, 3, 5, 8, 3, 6, 8, 6, 3, 5, 6, 5, 8, 6, 8, 3, 8, 6, 8, 5, 7, 6, 7, 5, 8, 3, 7, 3, 1, 6, 3, 7, 5, 8, 3, 5, 8, 5, 6, 3, 8, 7, 5, 3, 8, 7, 8, 7, 3, 7, 5, 8, 3, 8, 7, 8, 6, 5, 6, 3, 7, 8, 3, 6, 3, 7, 8, 7, 5, 3, 5, 6, 5, 8, 7, 8, 3, 5, 6, 7, 8, 7, 8, 6, 3, 6, 7, 8, 6, 8, 6, 3, 5, 8, 6, 1, 3, 6, 8, 7, 6, 3, 6, 5, 8, 5, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 10, 10, 8, 6, 5, 4, 3],
    [0, 0, 15, 15, 15, 12, 10, 8, 5],
    [0, 0, 40, 40, 40, 25, 15, 12, 10],
    [0, 0, 125, 125, 125, 50, 40, 30, 25],
];
var payLines = [
    [6, 7, 8, 9, 10, 11],               // 1
    [0, 1, 2, 3, 4, 5],                 // 2
    [12, 13, 14, 15, 16, 17],           // 3
    [18, 19, 20, 21, 22, 23],           // 4
    [6, 1, 2, 3, 4, 11],                // 5
    [6, 13, 14, 15, 16, 11],            // 6
    [0, 7, 8, 9, 10, 5],                // 7
    [12, 7, 8, 9, 10, 17],              // 8
    [12, 19, 20, 21, 22, 17],           // 9
    [18, 13, 14, 15, 16, 23],           // 10
    [6, 7, 2, 3, 10, 11],               // 11
    [6, 7, 14, 15, 10, 11],             // 12
    [0, 1, 8, 9, 4, 5],                 // 13
    [12, 13, 8, 9, 16, 17],             // 14
    [12, 13, 20, 21, 16, 17],           // 15
    [18, 19, 14, 15, 22, 23],           // 16
    [6, 1, 8, 3, 10, 5],                // 17
    [6, 13, 8, 15, 10, 17],             // 18
    [6, 13, 20, 15, 10, 5],             // 19
    [0, 7, 2, 9, 4, 11],                // 20
    [0, 7, 14, 21, 16, 11],             // 21
    [12, 7, 14, 9, 16, 11],             // 22
    [12, 7, 2, 9, 16, 23],              // 23
    [12, 19, 14, 21, 16, 23],           // 24
    [18, 13, 8, 3, 10, 17],             // 25
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var result;
    if (this.currentGame == "FREE") {
        result = this.FreeSpin(player);
    } else {
        var viewCache = player.viewCache;

        if (viewCache.type == "BASE") {
            result = viewCache.view;
        } else if (viewCache.type == "FREE") {
            this.freeSpinCacheList = viewCache.view;
            result = this.freeSpinCacheList[0];
        }
    }

    this.view = result.originView;
    this.changeView = result.view;
    this.changedStr = result.changed;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    var multiResult = result.multi;
    this.multiValues = multiResult.values;

    winMulti = multiResult.total;
    this.winMoney = WinFromView(this.changeView, player.betPerLine);
    this.winLines = WinLinesFromView(this.changeView, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, this.totalBet) * winMulti;

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = FreeSpinCountFromView(this.view);
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var result = this.freeSpinCacheList[this.freeSpinIndex];
    this.freeSpinIndex++;
    winMulti = result.multi.total;
    this.winMoney = WinFromView(result.view, player.betPerLine);
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }

    return result;
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpResult;

    if (baseWin > 0) {
        tmpResult = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpResult = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: tmpResult.view,
        win: tmpResult.win,
        type: "BASE",
        bpl: bpl
    };

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
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterCount = RandomScatterCount();
    var scatterView = RandomScatterView(baseReels, bpl, scatterCount);
    var fsCount = FreeSpinCountFromView(scatterView);
    var changeResult = SymbolChangeFromView(scatterView);
    changeResult.multi = MultipliersFromView(scatterView, true);
    winMulti = changeResult.multi.total;
    var scatterWinMoney = WinFromView(changeResult.view, bpl);

    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount, totalBet);
    freeSpinCacheList.push(changeResult);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, calcCount = 0, bottomLimit = 0;
    while (true) {
        tmpView = RandomView(reels);
        var changeResult = SymbolChangeFromView(tmpView);
        changeResult.multi = MultipliersFromView(tmpView);
        winMulti = changeResult.multi.total;
        tmpWin = WinFromView(changeResult.view, bpl);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    var result = {
        view: changeResult,
        win: tmpWin
    }
    return result;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;
    while (true) {
        tmpView = RandomView(reels);
        var changeResult = SymbolChangeFromView(tmpView);
        changeResult.multi = MultipliersFromView(tmpView);
        winMulti = changeResult.multi.total;
        tmpWin = WinFromView(changeResult.view, bpl);
        if (tmpWin == 0) {
            break;
        }
    }

    var result = {
        view: changeResult,
        win: tmpWin
    }
    return result;
};

var RandomScatterView = function (reels, bpl, nScatters) {
    while (true) {
        var view = RandomView(reels);
        if (WinFromView(view, bpl) == 0 && NumberOfScatters(view) == 0) {
            break;
        }
    }

    var scatterReels = [0, 1, 2, 3, 4, 5];
    Util.shuffle(scatterReels);

    for (var i = 0; i < nScatters; i++) {
        var reelNo = scatterReels[i];

        var positions = [];
        for (var j = 0; j < slotHeight; j++)
            positions[j] = reelNo + j * slotWidth;

        var randIndex = Util.random(0, slotHeight);
        var viewPos = positions[randIndex];
        view[viewPos] = scatter;
    }

    return view;
};

var RandomView = function (reels, piero = false, isFreeSpin = false) {
    var resultView = [];
    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        //                                       
        //              50                                                   
        if (Util.probability(30) || isFreeSpin) {
            if (isFreeSpin) {
                var randomIndex = 5 + slotWidth * Util.random(0, slotHeight);
                resultView[randomIndex] = wild;

                if (Util.probability(20)) {
                    while (true) {
                        var anotherRandomIndex = Util.random(0, resultView.length);
                        if (anotherRandomIndex % slotWidth != 5) {
                            resultView[anotherRandomIndex] = wild;
                            break;
                        }
                    }
                }
            } else {
                var randomIndex = Util.random(0, resultView.length);
                resultView[randomIndex] = wild;
            }
        }

        if (!isFreeSpinWin(resultView)) {
            break;
        }
    }

    return resultView;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, totalBet) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView, tmpWin = 0;
        var piero = false;

        while (true) {
            tmpView = RandomView(reels, piero, true);
            var changeResult = SymbolChangeFromView(tmpView, true);
            changeResult.multi = MultipliersFromView(tmpView, false, piero);
            winMulti = changeResult.multi.total;
            tmpWin = WinFromView(changeResult.view, bpl);

            freeSpinCacheList.push(changeResult);
            freeSpinTotalWin += tmpWin;

            freeSpinIndex++;
            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin
        }

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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    money += ScatterWinFromView(view, 25 * bpl);
    money *= winMulti;
    return money;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    //                                
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        . 
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;
    return winPay;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl) * winMulti;
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var hasWild = function (view) {
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i]))
            return true;
    }
    return false;
}

var RandomScatterCount = function () {
    if (Util.probability(1))
        return 6;
    if (Util.probability(5))
        return 5;
    if (Util.probability(10))
        return 4;
    return 3;
};

var FreeSpinCountFromView = function (view) {
    var nScatters = NumberOfScatters(view);
    if (nScatters == 3) {
        return 8;
    } else if (nScatters == 4) {
        return 10;
    } else if (nScatters == 5) {
        return 15;
    } else if (nScatters == 6) {
        return 20;
    }
    return 0;
}

var RandomScatterCount = function () {
    if (Util.probability(1))
        return 6;
    if (Util.probability(5))
        return 5;
    if (Util.probability(10))
        return 4;
    return 3;
}
var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
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

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var ScatterWinFromView = function (view, totalBet) {
    var win = 0;
    if (isFreeSpinWin(view)) {
        win = totalBet;
    }
    return win;
};

//                                     (                ,                 ,                    )
var SymbolChangeFromView = function (view, isFreeSpin = false) {
    //                                                                     
    if (!hasWild(view)) {
        var result = {
            originView: view,
            view: view,
            symbol: -1,
            changed: "",
            multi: {},
        }
        return result;
    }

    var changeView = Util.clone(view);
    var symbolChangePositions = [];
    var changed = [];
    var changeSymbol = RandomChangeSymbol(view);

    for (var i = 0; i < view.length; i++) {
        if (changeView[i] == changeSymbol) {
            changeView[i] = wild;
            symbolChangePositions.push(i);
        }
    }

    for (var i = 0; i < symbolChangePositions.length; i++) {
        var str = `${changeSymbol}~${wild}~${symbolChangePositions[i]}`;
        changed.push(str);
    }

    if (NumberOfWilds(view) > 1 && isFreeSpin) {
        changeSymbol = RandomChangeSymbol(view, changeSymbol);
        var anotherSymbolChangePositions = [];

        for (var i = 0; i < view.length; i++) {
            if (changeView[i] == changeSymbol) {
                changeView[i] = wild;
                anotherSymbolChangePositions.push(i);
            }
        }

        for (var i = 0; i < anotherSymbolChangePositions.length; i++) {
            var str = `${changeSymbol}~${wild}~${anotherSymbolChangePositions[i]}`;
            changed.push(str);
        }
    }

    var result = {
        originView: view,
        view: changeView,
        symbol: changeSymbol,
        changed: changed.join(';'),
        multi: {},
    }
    return result;
};

var RandomChangeSymbol = function (view, symbol = -1) {
    //                    
    while (true) {
        var randomInd = Util.random(0, view.length);
        var changeSymbol = view[randomInd];
        if (changeSymbol > 2 && changeSymbol != symbol) //          ,                                           .
            return changeSymbol;
    }
}

//                                            (                             ,                                    )
var MultipliersFromView = function (view, isScatterView = false, piero = false) {
    var totalMultiFactor = 0;
    var multiValues = [];
    var nScatters = NumberOfScatters(view);

    var multipleCount = 5;
    if (nScatters == 6) {
        multipleCount = 1;
    } else if (nScatters == 5) {
        multipleCount = 2;
    } else if (nScatters == 4) {
        multipleCount = 3;
    } else if (nScatters == 3) {
        multipleCount = 4;
    } else {
        multipleCount = 5;
    }

    var multiples = [];
    if (isScatterView) {
        for (var i = 0; i < multipleCount; i++) {
            if (multipleFactors[i] < 5) {
                multiples.push(multipleFactors[i]);
            }
        }
    } else if (piero) {
        for (var i = 2; i < multipleFactors.length; i++) {
            multiples.push(multipleFactors[i]);
        }
    } else {
        for (var i = 0; i < multipleCount; i++) {
            var count = multipleFactors.length - i;
            count += Util.random(0, count);
            for (var j = 0; j < count; j++)
                multiples.push(multipleFactors[i]);
        }
    }

    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {  //                 
            var randIndex = Util.random(0, multiples.length);
            var multi = multiples[randIndex];
            totalMultiFactor += multi;
            multiValues.push(multi);
        }
    }
    if (totalMultiFactor == 0)
        totalMultiFactor = 1;

    var result = {
        total: totalMultiFactor,
        values: multiValues,
    };
    return result;
}

module.exports = SlotMachine;