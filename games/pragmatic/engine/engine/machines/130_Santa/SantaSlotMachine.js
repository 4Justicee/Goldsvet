var Util = require('../../../utils/slot_utils');

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
    this.scatterWin = 0;

    this.jackpotCache = [];
    this.jackpotLevel = 0;
    this.diamondCache = [];
    this.jackpotMoney = 0;

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.isFreeSpinAdd = 0;

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var slotWidth = 5;
var slotHeight = 3;
var scatter = 1;
var wild = 2;
var bonus = 0;
var baseReels = [
    [8, 5, 0, 5, 3, 9, 10, 7, 4, 10, 11, 4, 6, 6, 9, 5],
    [5, 8, 6, 4, 9, 3, 2, 10, 7, 1, 11, 6, 3, 4, 11, 7, 9],
    [1, 8, 0, 6, 7, 2, 9, 5, 8, 1, 8, 7, 2, 2, 9, 4, 10, 3, 5, 10, 0, 4, 11, 11, 8, 6],
    [9, 10, 11, 1, 2, 2, 2, 2, 6, 6, 5, 4, 8, 7, 7, 3, 9, 2, 10, 5, 3, 8, 11, 1],
    [7, 8, 2, 2, 2, 0, 9, 7, 9, 3, 3, 7, 11, 5, 10, 0, 8, 4, 6, 10]
];
var freeReels = [
    [8, 7, 7, 4, 8, 10, 6, 11, 5, 9, 3, 9],
    [10, 6, 11, 3, 4, 9, 11, 8, 5, 8, 3, 7, 2, 2, 7],
    [4, 3, 10, 8, 9, 5, 2, 6, 8, 7, 11, 7, 9, 8, 3, 4, 6, 8, 8],
    [8, 6, 9, 11, 6, 5, 2, 7, 11, 4, 10, 3, 9, 10, 7],
    [3, 7, 7, 6, 11, 8, 4, 4, 5, 2, 9, 10, 6, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 15, 10, 10, 10, 5, 5, 5, 5],
    [0, 0, 0, 125, 100, 50, 50, 25, 10, 10, 10, 10],
    [0, 0, 0, 400, 300, 200, 150, 100, 50, 50, 50, 50]
];
var payLines = [
    [5, 6, 7, 8, 9],        // 1
    [0, 1, 2, 3, 4],        // 2
    [10, 11, 12, 13, 14],   // 3
    [0, 6, 12, 8, 4],       // 4
    [10, 6, 2, 8, 14],      // 5
    [5, 1, 2, 3, 9],        // 6
    [5, 11, 12, 13, 9],     // 7
    [0, 1, 7, 13, 14],      // 8
    [10, 11, 7, 3, 4],      // 9
    [5, 11, 7, 3, 9],       // 10
    [5, 1, 7, 13, 9],       // 11
    [0, 6, 7, 8, 4],        // 12
    [10, 6, 7, 8, 14],      // 13
    [0, 6, 2, 8, 4],        // 14
    [10, 6, 12, 8, 14],     // 15
    [5, 6, 2, 8, 9],        // 16
    [5, 6, 12, 8, 9],       // 17
    [0, 1, 12, 3, 4],       // 18
    [10, 11, 2, 13, 14],    // 19
    [0, 11, 12, 13, 4]      // 20
];
var percentList = {
    freeWinPercent: 50,
    moneyHighPercent: 22,
    moneyLowPercent: 34,
};
var moneyValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var jackpots = [10, 25, 50, 250];
var freeSpinCount = 6;

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];


    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        this.freeSpinLength = freeSpinCount;
        this.isFreeSpinAdd = 0;
        this.view = this.freeSpinCacheList[0].view;
        this.scatterWin = this.lineCount * player.betPerLine * 2;
        this.freeSpinIndex = 1;
        this.scatterPositions = ScatterPositions(this.view);
        this.currentGame = "FREE";
    }
    else {
        this.view = viewCache.view;
    }

    if (viewCache.type == "BONUS") {
        this.jackpotLevel = 0;
        this.jackpotMoney = 0;
        this.diamondCache = viewCache.cache;
        this.jackpotCache = [];
        this.jackpotCache[0] = JackpotFirstCache();
        this.currentGame = "BONUS";
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "FREE") {
        this.freeSpinWinMoney = this.winMoney;
        this.winMoney += this.scatterWin;
    }
    if (viewCache.type == "BONUS") {
        this.moneyBonusWin = this.winMoney;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;

    if (isFreeSpinWin(this.view)) {
        this.freeSpinLength += freeSpinCount;
        this.isFreeSpinAdd = 1;
    }
    else {
        this.isFreeSpinAdd = 0;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    // WinFromView                                       .
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinCacheList.length - 1) {
        this.freeSpinWinMoney += this.scatterWin;
        this.currentGame = "BASE";
        return;
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var select = param.ind;
    var index = this.jackpotLevel++;
    var status = this.jackpotCache[index].status;
    var wins_mask = this.jackpotCache[index].wins_mask;
    var wins = this.jackpotCache[index].wins;

    status[select] = this.jackpotLevel;
    wins_mask[select] = "w";
    wins[select] = this.diamondCache[index];

    this.jackpotMoney += this.diamondCache[index];
    this.moneyBonusWin = this.jackpotMoney * player.betPerLine * this.lineCount;

    var jackpotObj = {
        status: status,
        wins_mask: wins_mask,
        wins: wins
    };

    this.jackpotCache.push(jackpotObj);

    if (this.jackpotLevel >= this.diamondCache.length) {
        //                    
        jackpotObj.wins_mask[select] = "ma";
        this.winMoney += this.moneyBonusWin;
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
    var scatterWin = totalBet * 2;

    freeSpinCacheList.push({
        view: scatterView,
    });

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
    var jackpotView = RandomJackpotView(baseReels, bpl);
    var bsCache = JackpotRandomCache(totalBet, bsWin);

    var pattern = {
        view: jackpotView,
        bpl: bpl,
        cache: bsCache.cache,
        win: bsCache.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, jackpot = [];
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
    var tmpView, tmpWin, jackpot = [];

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

        if (!isFreeSpinWin(view) && !isBonusSpinWin(view)) {
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

        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0 && !isBonusSpinWin(view)) {
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
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (freeSpinIndex <= freeSpinLength) {
            while (true) {
                tmpView = RandomView(reels);
                tmpWin = WinFromView(tmpView, bpl);
                if (Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                    break;
                }
            }

            var cache = {
                view: tmpView,
            }

            freeSpinCacheList.push(cache);
            freeSpinTotalWin += tmpWin;

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

var RandomJackpotView = function (reels, bpl) {
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

        if (isBonusSpinWin(view) && WinFromView(view, bpl) == 0 && !isFreeSpinWin(view)) {
            break;
        }
    }

    return view;
};

var JackpotRandomCache = function (totalBet, targetMoney) {
    var minMoney = targetMoney * 0.8;
    var maxMoney = targetMoney;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var bonusSpinData = {};
        var diamondCache = [];
        var totalMoney = 0;
        var bonusSpinIndex = 1;
        var bonusSpinLength = Util.random(2, 13);

        while (bonusSpinIndex < bonusSpinLength) {
            var value = RandomMoneyFromArr(moneyValues);

            totalMoney += value;
            diamondCache.push(value);

            bonusSpinIndex++;
        }

        var jackpot = jackpots[Util.random(0, jackpots.length)];

        totalMoney += jackpot;
        diamondCache.push(jackpot);

        bonusSpinData = {
            cache: diamondCache,
            win: totalMoney * totalBet,
        };

        if (bonusSpinData.win >= minMoney && bonusSpinData.win <= maxMoney) {
            return bonusSpinData;
        }

        if (bonusSpinData.win > lowerLimit && bonusSpinData.win < minMoney) {
            lowerLimit = bonusSpinData.win;
            lowerView = bonusSpinData;
        }
        if (bonusSpinData.win > maxMoney && bonusSpinData.win < upperLimit) {
            upperLimit = bonusSpinData.win;
            upperView = bonusSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
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

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
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
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isBonusSpinWin = function (view) {
    return NumberOfBonus(view) >= 3;
};

var NumberOfBonus = function (view) {
    var res = 0;

    for (var i = 0; i < view.length; ++i) {
        if (isBonus(view[i])) {
            ++res;
        }
    }

    return res;
};

var isBonus = function (symbol) {
    return symbol == bonus;
};

var RandomMoneyFromArr = function (moneyValueList) {
    var value = moneyValueList[0];

    if (Util.probability(percentList.moneyHighPercent)) {
        value = moneyValueList[Util.random(0, moneyValueList.length / 2)];
    } else if (Util.probability(percentList.moneyLowPercent)) {
        value = moneyValueList[Util.random(0, moneyValueList.length / 3)];
    } else {
        value = moneyValueList[Util.random(0, moneyValueList.length / 4)];
    }

    return value;
};

var JackpotFirstCache = function () {
    var status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var wins_mask = ["h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h"];
    var wins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var firstJackpot = {
        status: status,
        wins_mask: wins_mask,
        wins: wins
    };

    return firstJackpot;
}

module.exports = SlotMachine;