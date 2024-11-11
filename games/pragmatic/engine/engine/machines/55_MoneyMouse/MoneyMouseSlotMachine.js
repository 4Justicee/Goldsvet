var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    this.freeSpinCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                              
    this.moneyBonusWin = 0;
    this.moneyCacheIndex = 0;
    this.moneyBonusCacheList = [];
    this.moneyBonusCount = -1;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var moneySymbol = 11;
var baseReels = [
    [7, 4, 6, 1, 10, 10, 9, 2, 2, 2, 5, 6, 3, 6, 9, 11, 11, 11, 7, 8, 5, 1, 10, 5, 6, 8, 2, 4, 10],
    [8, 6, 9, 2, 2, 2, 7, 9, 10, 5, 4, 9, 6, 4, 5, 8, 10, 11, 11, 11, 3, 7, 9],
    [9, 2, 2, 2, 4, 3, 5, 8, 11, 11, 11, 7, 4, 5, 8, 10, 8, 6, 2, 7, 5, 2, 1, 3, 10, 8],
    [11, 11, 10, 5, 7, 4, 7, 7, 8, 9, 2, 2, 2, 7, 5, 3, 2, 3, 4, 10, 3, 8, 4, 6, 10, 6, 6, 7],
    [3, 8, 4, 7, 1, 10, 3, 2, 2, 2, 5, 6, 1, 6, 4, 6, 7, 4, 10, 7, 11, 11, 11, 9, 3, 7, 10, 6, 8, 5, 9, 10, 5],
];
var freeReels = [
    [4, 3, 5, 10, 6, 4, 6, 2, 2, 2, 4, 6, 7, 5, 8, 3, 6, 9],
    [5, 5, 5, 10, 10, 10, 3, 3, 3, 1, 1, 1, 4, 4, 4, 7, 9, 9, 9, 6, 6, 6, 11, 11, 11, 6, 7, 7, 7, 3, 4, 2, 2, 2, 8, 8, 8, 3],
    [2, 2, 2, 8, 8, 8, 3, 5, 5, 5, 4, 4, 4, 7, 9, 9, 9, 6, 6, 6, 11, 11, 11, 6, 7, 7, 7, 3, 4, 10, 10, 10, 3, 3, 3, 1, 1, 1],
    [1, 1, 1, 8, 8, 8, 3, 5, 5, 5, 4, 4, 4, 7, 9, 9, 9, 6, 6, 6, 11, 11, 11, 3, 4, 10, 10, 10, 3, 3, 3, 2, 2, 2, 6, 7, 7, 7],
    [5, 1, 6, 9, 2, 2, 2, 6, 8, 10, 3, 3, 4, 7, 6, 5, 4],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 25, 20, 15, 10, 10, 5, 5, 5, 0, 0],
    [0, 0, 250, 250, 150, 100, 50, 20, 20, 20, 20, 0, 0],
    [0, 0, 500, 500, 400, 300, 200, 50, 50, 50, 50, 0, 0],
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [5, 1, 2, 3, 9], // 6
    [5, 11, 12, 13, 9], // 7
    [0, 1, 7, 13, 14], // 8
    [10, 11, 7, 3, 4], // 9
    [5, 11, 7, 3, 9], // 10
    [5, 1, 7, 13, 9], // 11
    [0, 6, 7, 8, 4], // 12
    [10, 6, 7, 8, 14], // 13
    [0, 6, 2, 8, 4], // 14
    [10, 6, 12, 8, 14], // 15
    [5, 6, 2, 8, 9], // 16
    [5, 6, 12, 8, 9], // 17
    [0, 1, 12, 3, 4], // 18
    [10, 11, 2, 13, 14], // 19
    [0, 11, 12, 13, 4], // 20
    [10, 1, 2, 3, 14], // 21
    [5, 11, 2, 13, 9], // 22
    [5, 1, 12, 3, 9], // 23
    [0, 11, 2, 13, 4], // 24
    [10, 1, 12, 3, 14], // 25
];
var moneyValueList = [25, 50, 75, 100, 125, 150, 175, 200, 250, 350, 400, 450, 500, 600, 750, 2500];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
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
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0];

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    } else if (viewCache.type == "BONUS") {
        var cache = viewCache.view;

        this.moneyBonusCacheList = viewCache.view;
        var firstCache = this.moneyBonusCacheList[0];

        this.view = firstCache.view;
        this.moneyCache = firstCache.moneyCache;
        this.moneyBonusCount = firstCache.count;

        var bonusSpinMoney = MoneyWinFromCache(this.moneyCache, player.betPerLine);
        console.log(`[               ] ${bonusSpinMoney}`);
    }

    if (viewCache.type != "BONUS") {
        this.moneyCache = RandomMoneyCache(this.view);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.scatterWin = ScatterWinFromView(this.view, Number(player.betPerLine * this.lineCount));
    this.winMoney += this.scatterWin;

    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;

        this.scatterPositions = ScatterPositions(this.view);
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }

    if (isMoneyBonusWin(this.view)) {
        this.moneyCacheIndex = 1;
        this.currentGame = "BONUS";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;
    var cache = this.moneyBonusCacheList[this.moneyCacheIndex];

    this.view = cache.view;
    this.moneyCache = cache.moneyCache;
    this.moneyBonusCount = cache.count;

    this.moneyCacheIndex++;

    if (this.moneyCacheIndex >= this.moneyBonusCacheList.length) {
        var moneyCount = NumberOfMoneySymbols(this.view);
        if (moneyCount == 15) {
            this.winMoney = player.betPerLine * this.lineCount * 1000;
        } else {
            this.winMoney = MoneyWinFromCache(this.moneyCache, player.betPerLine);
        }
        this.moneyBonusWin = this.winMoney;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }
    tmpWin = WinFromView(tmpView, bpl);

    var pattern = {
        view: tmpView,
        win: tmpWin,
        type: "BASE",
        bpl: bpl,
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusView = RandomBonusView(baseReels, bpl);
    var bonusViewMoneyCache = RandomMoneyCache(bonusView);
    var bonusCache = {
        view: bonusView,
        moneyCache: bonusViewMoneyCache,
        count: 0,
    };

    var moneyBonusCache = RandomBonusViewCache(baseReels, bpl, bsWin, totalBet, bonusCache);

    var pattern = {
        view: moneyBonusCache.cache,
        bpl: bpl,
        win: moneyBonusCache.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return tmpView;
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
    return tmpView;
};

var RandomView = function (reels) {
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

        if (!isFreeSpinWin(view) && !isMoneyBonusWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels) {
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

        if (isMoneyBonusWin(view)) {
            continue;
        }

        if (isFreeSpinWin(view)) {
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

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomFreeView(reels);

                fsWin = WinFromView(fsview, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsview);

            freeSpinWinMoney += fsWin;

            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
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

var RandomBonusView = function (reels, bpl) {
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

        if (isMoneyBonusWin(view) && WinFromView(view, bpl) == 0 && !isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin, totalBet, bonusCache) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var moneyBonusSpinCache = {};
        var bonusSpinCacheList = [bonusCache];
        var bonusSpinIndex = 0;
        var bonusSpinLength = 3;
        var bonusSpinWinMoney = 0;

        while (true) {
            bonusSpinIndex++;

            var lastCache = bonusSpinCacheList[bonusSpinCacheList.length - 1];
            var newView = Util.clone(lastCache.view);
            var newMoneyCacheValues = Util.clone(lastCache.moneyCache.values);
            var lastMoneySymbolPositions = MoneySymbolPositions(lastCache.view);

            var randomView = RandomBonusCacheView(reels);
            var newMoneySymbolPositions = MoneySymbolPositions(randomView);

            var isAdded = false;

            for (var i = 0; i < newMoneySymbolPositions.length; i++) {
                if (lastMoneySymbolPositions.indexOf(newMoneySymbolPositions[i]) < 0) {
                    isAdded = true;
                    newView[newMoneySymbolPositions[i]] = moneySymbol;
                    var newMoneyValue = moneyValueList[Util.random(0, moneyValueList.length)];
                    newMoneyCacheValues[newMoneySymbolPositions[i]] = newMoneyValue;
                }
            }

            //                                           0             
            if (isAdded) {
                bonusSpinIndex = 0;
            }

            newMoneyCacheTable = GetTableFromValues(newMoneyCacheValues);
            var newMoneyCache = {
                table: newMoneyCacheTable,
                values: newMoneyCacheValues,
            };
            var newCache = {
                view: newView,
                moneyCache: newMoneyCache,
                count: bonusSpinIndex,
            };

            bonusSpinCacheList.push(newCache);

            var moneyCount = NumberOfMoneySymbols(newView);

            if (bonusSpinIndex == bonusSpinLength || moneyCount == 15) {
                if (moneyCount == 15) {
                    bonusSpinWinMoney = totalBet * 1000; //       
                } else {
                    bonusSpinWinMoney = MoneyWinFromCache(newMoneyCache, bpl);
                }
                break;
            }
        }

        moneyBonusSpinCache = {
            cache: bonusSpinCacheList,
            win: bonusSpinWinMoney,
        };

        //                                    
        if (moneyBonusSpinCache.win >= minMoney && moneyBonusSpinCache.win <= maxMoney) {
            return moneyBonusSpinCache;
        }

        if (moneyBonusSpinCache.win > lowerLimit && moneyBonusSpinCache.win < minMoney) {
            lowerLimit = moneyBonusSpinCache.win;
            lowerView = moneyBonusSpinCache;
        }
        if (moneyBonusSpinCache.win > maxMoney && moneyBonusSpinCache.win < upperLimit) {
            upperLimit = moneyBonusSpinCache.win;
            upperView = moneyBonusSpinCache;
        }
    }

    return lowerView ? lowerView : upperView;
};

var RandomBonusCacheView = function (reels) {
    var view = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
        }
    }

    return view;
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
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i]))
            //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    var hasWild = false;
    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            hasWild = true;
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isMoneyBonusWin = function (view) {
    return NumberOfMoneySymbols(view) >= 6;
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

var NumberOfMoneySymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
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

var ScatterWinFromView = function (view, totalBet) {
    if (isFreeSpinWin(view)) {
        return totalBet;
    }
    return 0;
};

var RandomMoneyCache = function (view) {
    var values = [];
    for (var i = 0; i < view.length; i++) {
        if (!isMoneySymbol(view[i])) {
            values[i] = 0;
            continue;
        }

        if (Util.probability(99)) {
            values[i] = moneyValueList[Util.random(0, 3)];
        } else if (Util.probability(90)) {
            values[i] = moneyValueList[Util.random(0, moneyValueList.length - 4)];
        } else {
            values[i] = moneyValueList[Util.random(0, moneyValueList.length)];
        }
    }

    var table = GetTableFromValues(values);
    return { table, values };
};

var GetTableFromValues = function (values) {
    var table = [];
    for (var i = 0; i < values.length; i++) {
        table[i] = tableFromValue(values[i]);
    }
    return table;
};

var tableFromValue = function (value) {
    switch (Number(value)) {
        case 25000:
            return "jp1";
        case 2500:
            return "jp2";
        case 750:
            return "jp3";
        case 0:
            return "r";
    }
    return "v";
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
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

var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        win += moneyCache.values[i];
    }
    return win * bpl;
};

var RandomFreeView = function (reels) {
    //         ,                 
    var centerSymbol = Util.random(2, 11);
    var centerArray = [1, 2, 3];

    var resultView = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            if (centerArray.indexOf(i) >= 0) {
                resultView[viewPos] = centerSymbol;
            } else {
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }
    }
    return resultView;
};

module.exports = SlotMachine;