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
    this.moneyCache = {};
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                              
    this.moneyBonusWin = 0;
    this.moneyCacheIndex = 0;
    this.moneyBonusLength = 3;
    this.moneyBonusCacheList = [];
    this.moneyBonusCache = {};

    this.moneyBonusMultiIndex = 0;
    this.moneyBonusMulti = 0;
    this.moneyBonusCacheIndex = 0;

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
    this.baseWinPercent = 20;
};

var scatter = 1;
var wild = 2;
var baseReels = [
    [3, 7, 6, 11, 9, 7, 4, 4, 9, 10, 10, 5, 5, 10, 7, 8, 8, 11, 6, 3, 6, 6],
    [4, 9, 6, 1, 9, 10, 8, 5, 5, 8, 3, 4, 8, 9, 4, 1, 7, 2, 2, 2, 2, 2, 10, 9, 6, 11, 11, 11],
    [10, 8, 6, 8, 1, 2, 2, 2, 2, 2, 2, 3, 5, 11, 11, 11, 8, 4, 11, 8, 2, 10, 9, 3, 7, 2, 8, 4, 5, 6, 1],
    [3, 7, 11, 11, 11, 3, 5, 10, 8, 7, 8, 7, 2, 2, 2, 2, 2, 2, 2, 2, 1, 9, 10, 6, 6, 10, 4, 7, 4, 3, 5, 11, 8, 6, 9, 1, 2, 7],
    [6, 10, 3, 7, 6, 5, 3, 4, 11, 11, 11, 8, 8, 4, 5, 3, 6, 10, 2, 2, 2, 2, 7, 9, 10, 7, 7, 10, 9, 5, 4, 6, 11]
];
var freeReels = [
    [5, 6, 5, 11, 4, 6, 6, 11, 3, 3, 4],
    [3, 5, 6, 6, 11, 11, 11, 2, 2, 2, 11, 4, 3, 5, 4, 2, 1, 3],
    [6, 2, 2, 2, 2, 6, 4, 4, 5, 6, 4, 1, 5, 2, 11, 11, 11, 2, 3, 5, 11],
    [4, 5, 1, 5, 6, 11, 11, 11, 2, 2, 2, 3, 6, 3, 4, 4, 1, 11, 5, 2],
    [2, 2, 2, 6, 5, 4, 3, 2, 6, 3, 6, 3, 11, 5, 6, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 5, 5, 5, 5, 5, 5, 0, 0],
    [0, 0, 0, 50, 30, 25, 25, 10, 10, 10, 10, 0, 0],
    [0, 0, 0, 200, 150, 125, 100, 50, 50, 50, 50, 0, 0]
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
var moneySymbol = 11;
var freeSpinCount = 8; //                          
var slotWidth = 5, slotHeight = 3;
var moneyWinCount = 6;
var moneyBonusLength = 3;
var moneyValueList = [25, 50, 75, 100, 125, 150, 175, 200, 250, 350, 400, 450, 500, 600, 750];
var percentList = {
    freeWinPercent: 50,
    moneyJackpotPercent: 5,
    moneyHighPercent: 7,
    moneyMediumPercent: 10,
    moneyLowPercent: 20,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

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
    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.freeSpinLength = this.freeSpinCacheList.length - 1;
        this.view = this.freeSpinCacheList[0];

        this.freeSpinIndex = 1;
        this.scatterWin = ScatterWinFromView(player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);

        this.currentGame = "FREE";
    }

    if (viewCache.type == "BONUS") {
        this.moneyBonusCacheList = viewCache.view;
        // this.freeSpinLength = cache.length;

        var firstCache = this.moneyBonusCacheList[0];

        this.view = firstCache.view;
        this.moneyCache = {
            table: GetTableFromValues(firstCache.values),
            values: firstCache.values,
        };
        this.moneyCacheIndex = 1;
        this.moneyBonusLength = moneyBonusLength;
        this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine);
        this.currentGame = "BONUS";
    }
    else {
        this.moneyCache = RandomMoneySymbols(this.view);
    }
    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "FREE") {
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = 0;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.moneyCache = this.freeSpinCacheList[this.freeSpinIndex].moneyCache;
    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.freeSpinWinMoney += this.scatterWin;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var cache = this.moneyBonusCacheList[this.moneyCacheIndex];
    this.moneyBonusCache = cache;

    this.view = cache.view;

    var table = GetTableFromValues(cache.values);
    var moneyCache = {
        table: table,
        values: cache.values,
    };
    this.moneyCache = moneyCache;

    this.moneyBonusWin = MoneyWinFromCache(moneyCache, player.betPerLine);

    this.moneyCacheIndex++;
    if (this.moneyCacheIndex >= this.moneyBonusCacheList.length) {
        this.winMoney = this.moneyBonusWin;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    //                            [      ] *                                                             ~~                 .

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
            break;
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWin = ScatterWinFromView(totalBet);

    freeSpinCacheList.push(scatterView);
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, freeSpinCount);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWin,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bsCache = RandomBonusViewCache(baseReels, bpl, bsWin);
    var win = bsCache.win;

    var pattern = {
        view: bsCache.cache,
        bpl: bpl,
        win: win,
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
            bottomLimit = -1;
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
    return tmpView
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
        var moneyCache = {};
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (freeSpinIndex <= freeSpinLength) {
            while (true) {
                tmpView = RandomView(reels);
                var win = WinFromView(tmpView, bpl);
                if (Util.probability(percentList.freeWinPercent) || win == 0) {
                    break;
                }
            }

            moneyCache = RandomMoneySymbols(tmpView);
            tmpWin = WinFromView(tmpView, bpl);

            var cache = {
                view: tmpView,
                moneyCache: moneyCache,
            }

            freeSpinCacheList.push(cache);
            freeSpinTotalWin += tmpWin;

            if (NumberOfScatters(tmpView) >= 3) {
                freeSpinLength += freeSpinCount;
            }
            freeSpinIndex++;
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

var RandomBonusViewCache = function (reels, bpl, bsWin) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;
    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var moneyBonusCacheList = []; //                
        var moneyBonusIndex = 0; //                                    

        var tmpView = [];
        var values = DefaultMoneyCache().values; //                  

        while (true) {
            tmpView = RandomView(reels);
            if (WinFromView(tmpView, bpl) == 0 && NumberOfMoneySymbols(tmpView) == 0) {
                break;
            }
        }

        var randomPosArray = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight); //                                      
        var pos = 0; //randomPosArray[i], multied                                               

        moneyWinCount = Util.random(6, 8);

        for (var i = 0; i < moneyWinCount; i++) {
            pos = randomPosArray.shift();
            tmpView[pos] = moneySymbol;
            values[pos] = moneyValueList[Util.random(0, moneyValueList.length / 4)];
        }

        moneyBonusCacheList.push({
            count: 0,
            view: [...tmpView],
            values: [...values],
        })

        while (moneyBonusIndex < moneyBonusLength) {
            lastCache = moneyBonusCacheList[moneyBonusCacheList.length - 1];
            tmpView = Util.clone(lastCache.view);
            values = [...lastCache.values];

            moneyBonusIndex++;

            if (randomPosArray.length > 1) {      //                                     
                if (Util.probability(34)) {
                    moneyBonusIndex = 0;        //                                             

                    pos = randomPosArray.shift();
                    values[pos] = RandomMoneyFromArr(moneyValueList);
                    tmpView[pos] = moneySymbol;
                }
            }

            moneyBonusCacheList.push({
                count: moneyBonusIndex,
                view: tmpView,
                values: values
            });
        }

        var moneyBonusData = {
            win: values.reduce((total, value) => total + value, 0) * bpl,
            cache: moneyBonusCacheList
        };

        if (moneyBonusData.win >= minMoney && moneyBonusData.win <= maxMoney) {
            return moneyBonusData;
        }

        if (moneyBonusData.win > lowerLimit && moneyBonusData.win < minMoney) {
            lowerLimit = moneyBonusData.win;
            lowerView = moneyBonusData;
        }
        if (moneyBonusData.win > maxMoney && moneyBonusData.win < upperLimit) {
            upperLimit = moneyBonusData.win;
            upperView = moneyBonusData;
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
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }
    return money;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                    
    for (var i = 0; i < lineSymbols.length; i++) {
        //                                               
        if (isWild(lineSymbols[i])) {
            continue;
        }

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

    //                                              -1   ,     lineSymbols                        . 
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    return payTable[matchCount][symbol] * bpl;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var ScatterWinFromView = function (totalBet) {
    return totalBet * 3;
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

var DefaultMoneyCache = function () {
    var moneyValues = [];
    var moneyTable = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyValues[i] = 0;
        moneyTable[i] = "r";
    }

    var result = {
        values: moneyValues,
        table: moneyTable,
    };
    return result;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
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

var isMoney = function (symbol) {
    return symbol == moneySymbol;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;

    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
            result++;
        }
    }

    return result;
};

var RandomMoneyFromArr = function (moneyValueList, isBonus = 1) {
    var value = moneyValueList[0];

    if (Util.probability(percentList.moneyJackpotPercent) && isBonus) {
        value = moneyValueList[Util.random(0, moneyValueList.length)];
    } else
        if (Util.probability(percentList.moneyHighPercent) && isBonus) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 2)];
        } else if (Util.probability(percentList.moneyMediumPercent)) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 3)];
        } else if (Util.probability(percentList.moneyLowPercent)) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 4)];
        }

    return value;
};

var RandomMoneySymbols = function (view) {
    var values = [];
    for (var i = 0; i < view.length; i++) {
        if (!isMoney(view[i])) {
            values[i] = 0;
            continue;
        }
        values[i] = RandomMoneyFromArr(moneyValueList, 0);
    }

    var table = GetTableFromValues(values);
    return { table, values };
};

var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        if (moneyCache.table[i] != "m")
            win += moneyCache.values[i];
    }
    return win * bpl;
};

var GetTableFromValues = function (values) {
    var table = [];
    for (var i = 0; i < values.length; i++) {
        table[i] = tableFromValue(values[i])
    }
    return table;
};

var tableFromValue = function (value) {
    switch (Number(value)) {
        case 25000: return "jp1";
        case 2500: return "jp2";
        case 750: return "jp3";
        case 0: return "r";
    }
    return "v";
}

module.exports = SlotMachine;