var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.winMulti = 1;
    this.scatterWin = 0;
    this.scatterPosition = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 10;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                       
    this.expansiblePositions = [];
    this.expandedView = [];
    this.rainingWildPositions = [];

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [12, 10, 4, 4, 11, 6, 12, 1, 9, 6, 3, 7, 8, 5, 5, 10, 11, 9, 8, 2],
    [12, 6, 9, 10, 10, 2, 5, 11, 3, 9, 8, 8, 11, 7, 6, 8, 7, 11, 4, 10],
    [2, 1, 11, 3, 10, 3, 9, 10, 7, 6, 4, 5, 12, 7, 8, 9, 9, 5, 1, 6],
    [11, 7, 11, 4, 5, 9, 10, 10, 4, 8, 3, 2, 12, 3, 6, 12, 8, 12, 10],
    [1, 8, 9, 12, 9, 8, 1, 2, 6, 7, 3, 4, 7, 5, 10, 11, 12]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 25, 20, 15, 10, 10, 5, 5, 4, 3, 3],
    [0, 0, 50, 50, 40, 30, 25, 25, 20, 15, 15, 15, 10],
    [0, 0, 400, 400, 250, 200, 150, 100, 75, 50, 40, 30, 25]
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

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var view_cache = viewCache.view;
        this.view = view_cache.view;
        this.expandedView = view_cache.expandedView;
        this.expansiblePositions = view_cache.expansiblePositions;
        this.rainingWildPositions = view_cache.rainingWildPositions;
        this.winMulti = view_cache.winMulti;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        var view_cache = this.freeSpinCacheList[0];
        this.view = view_cache.view;
        this.expandedView = view_cache.expandedView;
        this.expansiblePositions = view_cache.expansiblePositions;
        this.rainingWildPositions = view_cache.rainingWildPositions;
        this.winMulti = view_cache.winMulti;
    }

    this.winMoney = WinFromView(this.expandedView, player.betPerLine, this.winMulti);
    this.winLines = WinLinesFromView(this.expandedView, player.betPerLine, this.winMulti);
    this.scatterPosition = ScatterPositions(this.expandedView);
    this.scatterWin = ScatterWinFromView(this.expandedView, player.betPerLine * this.lineCount, this.winMulti);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isFreeSpinWin(this.expandedView)) { //                          
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var view_cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = view_cache.view;
    this.expandedView = view_cache.expandedView;
    this.expansiblePositions = view_cache.expansiblePositions;
    this.rainingWildPositions = view_cache.rainingWildPositions;
    this.winMulti = view_cache.winMulti;

    this.winMoney = WinFromView(this.expandedView, player.betPerLine, this.winMulti);
    this.winLines = WinLinesFromView(this.expandedView, player.betPerLine, this.winMulti);
    this.scatterPosition = ScatterPositions(this.expandedView);
    this.scatterWin = ScatterWinFromView(this.expandedView, player.betPerLine * this.lineCount, this.winMulti);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var result;

    if (baseWin > 0) {
        result = RandomWinView(baseReels, bpl, baseWin);
    } else {
        result = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: result,
        win: result.win,
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
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinData = RandomFreeViewCache(baseReels, bpl, fsWin - scatterView.win);
    var freeSpinCacheList = [scatterView];

    return {
        win: freeSpinData.win + scatterView.win,
        view: freeSpinCacheList.concat(freeSpinData.cache),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        var viewCache = GetRandomViewCache(view, bpl, true);

        if (viewCache.win > bottomLimit && viewCache.win <= maxWin) {
            return viewCache;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        var viewCache = GetRandomViewCache(view, bpl, false);

        if (viewCache.win == 0) {
            return viewCache;
        }
    }
};

var RandomView = function (reels) {
    var resultView = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            resultView[viewPos] = reels[i][reelPos];
        }
    }

    return resultView;
};

var RandomScatterView = function (reels, bpl) {
    var view, viewCache;

    while (true) {
        view = RandomView(baseReels);
        viewCache = GetRandomViewCache(view, bpl, false);
        if (isFreeSpinWin(viewCache.expandedView)) {
            break;
        }
    }

    return viewCache;
}

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinIndex = 1,
        freeSpinLength = 10,
        freeSpinWinMoney = 0,
        freeSpinCacheList = [];

        while (true) {
            view = RandomView(reels);

            if (isFreeSpinWin(view)) {
                continue;
            }

            viewCache = GetRandomViewCache(view, bpl, true);

            freeSpinCacheList.push(viewCache);
            freeSpinWinMoney += viewCache.win;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        var freeSpinData = {
            win: freeSpinWinMoney,
            cache: freeSpinCacheList
        };

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return freeSpinData;
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = freeSpinData;
        }

        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = freeSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
}

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl, wMulti) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl, wMulti);
        money += linePay;
    }

    money += ScatterWinFromView(view, bpl * 25, wMulti);

    return money;
};

var WinFromLine = function (lineSymbols, bpl, wMulti) {
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

    var winPay = payTable[matchCount][symbol] * bpl * wMulti;

    return winPay;
};

var WinLinesFromView = function (view, bpl, wMulti) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl, wMulti);
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

var ScatterWinFromView = function (view, bet, wMulti) {
    if (isFreeSpinWin(view))
        return bet * wMulti;
    return 0;
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

var GetExpansiblePositions = function (view) {
    var result = [];
    for (var i = 0; i < slotWidth; i++) {
        var pos = i + 5;
        if (isWild(view[pos])) {
            result.push(pos);
        }
    }
    return result;
};

var GetRandomViewCache = function (view, bpl, isSuperWildBonus) {
    var expandedView = Util.clone(view);

    var winMulti = 1;
    var rainingWildPositions = [];
    if (isSuperWildBonus && Util.probability(5)) {
        for (var i = 0; i < slotWidth; i++) {
            var randPos = Util.random(0, slotHeight);
            for (var j = 0; j < slotHeight; j++) {
                if (j == randPos) {
                    expandedView[i + j * slotWidth] = wild;
                    rainingWildPositions.push(i + j * slotWidth);
                    break;
                }
            }
        }
    } else {
        winMulti = Util.random(1, 11);
    }

    var expansiblePositions = GetExpansiblePositions(expandedView);
    for (var i = 0; i < expansiblePositions.length; i++) {
        expandedView[expansiblePositions[i] - 5] = wild;
        expandedView[expansiblePositions[i] + 5] = wild;
    }

    if (expansiblePositions.length == 5) {
        winMulti = 10;
    }

    var win = WinFromView(expandedView, bpl, winMulti);

    var result = {
        view: view,
        expandedView: expandedView,
        expansiblePositions: expansiblePositions,
        rainingWildPositions: rainingWildPositions,
        winMulti: winMulti,
        win: win
    }

    return result;
};

module.exports = SlotMachine;