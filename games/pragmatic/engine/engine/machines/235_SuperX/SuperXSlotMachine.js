var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.moneyCache = {};
    this.moneyTotalValue = 0;
    this.moneyPositions = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    this.doubleMulti = 0.2;
    this.baseWinPercent = 60;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, XSymbol = 12, empty = 23;
var slotWidth = 5, slotHeight = 3;
var winLines = [];
var freeSpinCount = 10;
var baseReels = [
    [4, 10, 4, 11, 8, 6, 11, 11, 10, 7, 8, 5, 11, 9, 9, 4, 4, 7, 6, 6, 6, 6, 6, 5, 8, 10, 10, 11, 10, 9, 10, 8, 3, 10, 9, 9, 8, 8, 7, 4, 9, 7, 8, 8, 8, 10, 8, 5, 8, 9, 10, 10, 4, 8, 10, 9, 5, 8, 1, 1, 10, 11, 8, 7, 4, 8, 5, 5, 5, 3, 10, 1, 7, 3, 11, 5, 3, 9, 1, 3, 9, 9, 6, 9, 8, 12, 5, 4, 8, 9, 9, 9, 5, 6, 5, 7, 7, 11, 12, 5, 8, 9, 8, 1, 8, 6, 11, 11, 4, 10, 8, 10, 11, 11, 11, 12, 7, 10, 11, 10, 10, 6, 4, 7, 7, 9, 10, 7, 11, 11, 9, 10, 11, 3, 3, 5, 10, 10, 10, 11, 9, 11, 6, 8, 6, 10, 3, 7, 9, 8, 8, 5, 11, 8, 10, 9, 5, 8, 10, 3, 3, 3, 9, 7, 6, 8, 1, 6, 1, 9, 1, 12, 10, 8, 4, 8, 9, 10, 12, 11, 7, 6, 7, 7, 7, 1, 5, 11, 10, 10, 11, 5, 9, 1, 7, 1, 9, 7, 4, 11, 9, 7, 9, 11, 1, 11, 4, 4, 4, 5, 3, 8, 11, 11, 6, 9, 7, 6, 9, 1, 10, 5, 11, 7, 6, 4, 10, 5, 11, 12, 12, 12, 10, 9, 7, 6, 6, 1, 5, 8, 6, 7, 11, 8, 3, 4, 9, 5, 6, 8, 11, 11, 9, 7],
    [2, 8, 6, 6, 6, 7, 9, 8, 9, 8, 8, 8, 2, 9, 6, 10, 2, 2, 2, 10, 4, 3, 9, 9, 9, 11, 10, 10, 5, 11, 11, 11, 8, 7, 11, 6, 10, 10, 10, 8, 11, 6, 9, 3, 3, 3, 11, 8, 2, 7, 7, 7, 2, 5, 9, 4, 5, 5, 5, 2, 11, 7, 3, 4, 4, 4, 11, 8, 10, 7, 9],
    [7, 11, 6, 6, 6, 5, 8, 9, 2, 8, 8, 8, 8, 3, 9, 9, 5, 5, 5, 11, 11, 2, 8, 9, 9, 9, 7, 9, 5, 5, 11, 11, 11, 10, 10, 7, 10, 10, 10, 10, 8, 5, 1, 3, 3, 3, 11, 4, 10, 6, 7, 7, 7, 1, 8, 11, 4, 2, 2, 2, 11, 6, 9, 10, 4, 4, 4, 6, 3, 2, 2, 9],
    [11, 6, 6, 6, 11, 8, 8, 8, 8, 7, 8, 5, 5, 5, 5, 11, 9, 9, 9, 8, 6, 11, 11, 11, 9, 5, 10, 10, 10, 9, 4, 3, 3, 3, 6, 2, 2, 2, 2, 3, 10, 4, 4, 4, 10, 4, 7, 7, 7, 7, 9, 10],
    [4, 6, 6, 11, 9, 6, 6, 6, 9, 11, 7, 5, 5, 11, 8, 8, 8, 10, 4, 9, 9, 5, 9, 5, 5, 5, 3, 10, 3, 8, 7, 8, 9, 9, 9, 7, 7, 9, 4, 8, 4, 10, 11, 11, 11, 10, 6, 1, 1, 8, 11, 10, 10, 10, 6, 11, 1, 9, 10, 5, 3, 3, 3, 3, 11, 5, 11, 6, 7, 7, 7, 7, 9, 9, 10, 7, 6, 10, 4, 4, 4, 5, 4, 8, 11, 11, 8, 9, 8],
];
var freeReels = [
    [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    [23, 23, 23, 23, 23, 13, 13, 13, 23, 23, 13, 14, 23, 23, 15, 23, 23, 23, 23, 13, 14, 23, 23, 16, 23, 23, 23, 23, 17, 23, 23, 23, 13, 18, 23, 23, 23, 23, 19, 23, 23, 23, 23, 13, 13, 13, 20, 23, 23, 23, 13, 13, 21, 23, 23, 23, 23, 13, 13, 23, 23, 22, 23, 23, 23, 23, 13, 13, 14, 14, 23, 13, 23, 23, 15, 23, 23, 23, 23, 23, 23, 13, 14, 23, 13, 13, 23, 23, 23, 23, 13, 14, 23, 23, 23, 23, 13, 14, 14, 15, 23],
    [23, 23, 23, 23, 23, 13, 13, 13, 23, 23, 13, 14, 23, 23, 15, 23, 23, 23, 23, 13, 14, 23, 23, 16, 23, 23, 23, 23, 17, 23, 23, 23, 13, 18, 23, 23, 23, 23, 19, 23, 23, 23, 23, 13, 13, 13, 20, 23, 23, 23, 13, 13, 21, 23, 23, 23, 23, 13, 13, 23, 23, 22, 23, 23, 23, 23, 13, 13, 14, 14, 23, 13, 23, 23, 15, 23, 23, 23, 23, 23, 23, 13, 14, 23, 13, 13, 23, 23, 23, 23, 13, 14, 23, 23, 23, 23, 13, 14, 14, 15, 23],
    [23, 23, 23, 23, 23, 13, 13, 13, 23, 23, 13, 14, 23, 23, 15, 23, 23, 23, 23, 13, 14, 23, 23, 16, 23, 23, 23, 23, 17, 23, 23, 23, 13, 18, 23, 23, 23, 23, 19, 23, 23, 23, 23, 13, 13, 13, 20, 23, 23, 23, 13, 13, 21, 23, 23, 23, 23, 13, 13, 23, 23, 22, 23, 23, 23, 23, 13, 13, 14, 14, 23, 13, 23, 23, 15, 23, 23, 23, 23, 23, 23, 13, 14, 23, 13, 13, 23, 23, 23, 23, 13, 14, 23, 23, 23, 23, 13, 14, 14, 15, 23],
    [23, 23, 23, 23, 23, 13, 13, 13, 23, 23, 13, 14, 23, 23, 15, 23, 23, 23, 23, 13, 14, 23, 23, 16, 23, 23, 23, 23, 17, 23, 23, 23, 13, 18, 23, 23, 23, 23, 19, 23, 23, 23, 23, 13, 13, 13, 20, 23, 23, 23, 13, 13, 21, 23, 23, 23, 23, 13, 13, 23, 23, 22, 23, 23, 23, 23, 13, 13, 14, 14, 23, 13, 23, 23, 15, 23, 23, 23, 23, 23, 23, 13, 14, 23, 13, 13, 23, 23, 23, 23, 13, 14, 23, 23, 23, 23, 13, 14, 14, 15, 23],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 20, 15, 10, 5, 2, 2, 2, 2],
    [0, 0, 0, 150, 80, 50, 30, 15, 5, 5, 5, 5],
    [0, 0, 0, 400, 300, 200, 100, 50, 20, 20, 20, 20],
];
var payLines = [
    [5, 6, 7, 8, 9],  //1
    [0, 1, 2, 3, 4],    //2
    [10, 11, 12, 13, 14],   //3
    [0, 6, 12, 8, 4],   //4
    [10, 6, 2, 8, 14],  //5
    [5, 1, 2, 3, 9],    //6
    [5, 11, 12, 13, 9], //7
    [0, 1, 7, 13, 14],  //8
    [10, 11, 7, 3, 4],  //9
    [5, 11, 7, 3, 9],   //10
    [5, 1, 7, 13, 9],   //11
    [0, 6, 7, 8, 4],    //12
    [10, 6, 7, 8, 14],  //13
    [5, 6, 2, 8, 9],    //14
    [5, 6, 12, 8, 9],   //15
    [0, 11, 2, 13, 4],  //16
    [10, 1, 12, 3, 14], //17
    [0, 1, 12, 3, 4],   //18
    [10, 11, 2, 13, 14],    //19
    [0, 11, 12, 13, 4], //20
];
var moneySymbolValues = [25, 50, 75, 100, 125, 150, 200, 250, 375, 625, 1250, 2500, 12500];
var multiArray = [2, 3, 5];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 40; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0].view;
        this.moneyCache = this.freeSpinCacheList[0].moneyCache;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    //                             
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinCount;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    this.moneyTotalValue = MoneyWinFromCache(this.view, this.moneyCache, player.betPerLine);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalValue;
    this.winLines = winLines;
    this.moneyPositions = GetWinMoneyPositions(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;
    this.freeSpinIndex++;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
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
        bpl: bpl,
    };

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        newJpType = "FREE";//this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        default:
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var freeSpinView = RandomScatterView(baseReels, bpl);

    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, 5);
    freeSpinCacheList.push(freeSpinView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + freeSpinViewWin,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView,
        tmpWin,
        calcCount = 0,
        bottomLimit = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels,bpl);
        }
    }

    var result = {
        view: tmpView,
        win: tmpWin,
    };

    return result;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);

        if (tmpWin == 0) {
            break;
        }
    }

    var result = {
        view: tmpView,
        win: tmpWin,
    };

    return result;
};

var RandomView = function (reels) {
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

        if (!isFreeSpinWin(resultView)) {
            break;
        }
    }
    return resultView;
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
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;
        var tmpWin = 0;

        while (true) {
            tmpView = RandomView(reels);
            tmpWin = WinFromFreeView(tmpView, bpl);

            var freeSpinData = {
                view: tmpView,
                moneyCache: moneyCache,
            };

            freeSpinCacheList.push(freeSpinData);
            freeSpinTotalWin += tmpWin;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin,
        };


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

var GetWinMoneyPositions = function (view) {
    var moneyPositions = [];
    for (var i = 2; i < slotWidth; i++) {
        var noMoneyReel = true;
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (view[pos] >= moneySymbol) {
                moneyPositions.push(pos);
                noMoneyReel = false;
            }
        }
        if (noMoneyReel) {
            break;
        }
    }
    return moneyPositions;
};

var MoneySymbolPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var RandomMoneySymbols = function (view) {
    if (NumberOfMoneySymbols(view) == 0) return null;

    var moneyTable = DefaultMoneyCache().moneyTable;
    var moneyValues = DefaultMoneyCache().moneyValues;
    var moneyPositions = MoneySymbolPositions(view);

    for (var i = 0; i < moneyPositions.length; i++) {
        //                                                5                      
        var index = 0;
        if (Util.probability(70)) {
            index = Util.random(0, moneySymbolValues.length - 3);
        } else if (Util.probability(70)) {
            index = Util.random(3, moneySymbolValues.length - 3);
        } else {
            index = Util.random(6, moneySymbolValues.length - 3);
        }
        var value = moneySymbolValues[index];

        var pos = moneyPositions[i];
        moneyValues[pos] = value;
        moneyTable[pos] = "v";
    }

    var lastReelMoneys = [];
    //                                           
    for (var i = 0; i < slotHeight; i++) {
        var pos = 4 + i * slotWidth;
        var reelSymbol = view[pos];
        if (isMoneySymbol(reelSymbol)) {
            lastReelMoneys.push(pos);
        }
    }

    //                                            5                                   
    //                                                                  .
    if (lastReelMoneys.length > 0 && Util.probability(5)) {
        var pos = lastReelMoneys[Util.random(0, lastReelMoneys.length)];
        //             
        var value = 0,
            valueStr;
        if (Util.probability(70)) {
            value = 1250;
            valueStr = "jp3";
        } else if (Util.probability(70)) {
            value = 2500;
            valueStr = "jp2";
        } else {
            value = 12500;
            valueStr = "jp1";
        }
        moneyValues[pos] = value;
        moneyTable[pos] = valueStr;
    }

    if (lastReelMoneys.length > 0 && Util.probability(5)) {
        var pos = lastReelMoneys[Util.random(0, lastReelMoneys.length)];
        //             
        moneyValues[pos] = multiArray[Util.random(0, multiArray.length)];
        moneyTable[pos] = "ma";
    }

    var result = {
        table: moneyTable,
        values: moneyValues,
    };
    return result;
};

var DefaultMoneyCache = function () {
    var moneyValues = [];
    var moneyTable = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyValues[i] = 0;
        moneyTable[i] = "r";
    }

    var result = {
        moneyValues: moneyValues,
        moneyTable: moneyTable,
    };
    return result;
};

var WinFromFreeView = function(view, bpl) {
    var totalTimes = 0;
    for (var i = 0; i < slotHeight; i++) {
        var times = 0;
        for (var j = 1; j < slotWidth; j++) {
            var pos = j + i * slotWidth;
            if (view[pos] == 23) {
                continue;
            }
            if (times == 0) {
                if (view[pos] == 23) {
                    continue;
                }
                else {
                    // times = view[pos] - 
                }
                
            }

        }
    }
};

var RandomFreeView = function(reels) {

};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var MoneyWinFromCache = function (view, moneyCache, bpl) {
    if (!isCollectWin(view)) {
        return 0;
    }

    var moneyWin = 0;

    //                                      
    for (var i = 2; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r") {
            moneyWin += moneyCache.values[i];
        }
    }

    var hasMoney = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 3];
        if (isMoneySymbol(reelSymbol)) {
            hasMoney = true;
            break;
        }
    }
    if (!hasMoney) {
        return moneyWin * bpl;
    }

    //                                      
    for (var i = 3; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r") {
            moneyWin += moneyCache.values[i];
        }
    }

    hasMoney = false;
    //                                           ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 4];
        if (isMoneySymbol(reelSymbol)) {
            hasMoney = true;
            break;
        }
    }
    if (!hasMoney) {
        return moneyWin * bpl;
    }

    //                                         
    var multi = 1;
    for (var i = 4; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r" && moneyCache.table[i] != "ma") {
            moneyWin += moneyCache.values[i];
        } else if (moneyCache.table[i] == "ma") {
            multi = moneyCache.values[i];
        }
    }

    return moneyWin * bpl * multi;
};

var WinFromView = function (view, bpl) {
    var winMoney = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        winMoney += linePay;
    }

    return winMoney;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                       
    var symbol = lineSymbols[0];

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
        var linePay = WinFromLine(lineSymbols, bpl);

        if (linePay > 0) {
            winLines.push(
                `${lineId}~${linePay}~${line
                    .filter(function (item, index, arr) {
                        return lineSymbols[index] != -1;
                    })
                    .join("~")}`
            );
        }
    }

    return winLines;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    //                           ,                                               
    if (symbolId == empty || symbolId == moneySymbol) {
        return 0;
    }

    var winMoney = 0;

    //                                                             
    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId];
        winLines.push(`0~${winMoney}~${history.join("~")}`);
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        //                                
        if (symbolId == wild) {
            positionsByStep.push(pos);
        } else {
            //                                          
            if (view[pos] == symbolId || isWild(view[pos])) {
                positionsByStep.push(pos);
            }
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = 0;
        for (var i = 0; i < history.length; i++) {
            if (history[i] >= 0) {
                matchCount++;
            }
        }
        var money = bpl * payTable[matchCount][symbolId];
        if (money > 0) {
            var lineResult = [];
            for (var i = 0; i < history.length; i++) {
                if (history[i] < 0) {
                    break;
                }
                lineResult.push(history[i]);
            }
            winLines.push(`0~${money}~${lineResult.join("~")}`);
        }
        return money;
    }

    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        //                                                           
        var newSymbolId = symbolId;
        if (symbolId == wild) {
            newSymbolId = view[positionsByStep[i]];
        }
        winMoney += RecursiveSearch(view, step + 1, historyTmp, newSymbolId, bpl);
    }
    return winMoney;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    var scatterCnt = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            ++scatterCnt;
        }
    }

    if (scatterCnt < 3) {
        return false;
    }
    return true;
};

var isCollectWin = function (view) {
    var hasWild = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth];
        if (isWild(reelSymbol)) {
            hasWild = true;
            break;
        }
    }
    if (!hasWild) {
        return false;
    }

    hasWild = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 1];
        if (isWild(reelSymbol)) {
            hasWild = true;
            break;
        }
    }
    if (!hasWild) {
        return false;
    }

    var hasMoney = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 2];
        if (isMoneySymbol(reelSymbol)) {
            hasMoney = true;
            break;
        }
    }
    if (!hasMoney) {
        return false;
    }

    return true;
};

var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result++;
        }
    }
    return result;
};

module.exports = SlotMachine;