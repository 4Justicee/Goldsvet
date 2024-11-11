var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.positions = []; //                                      (                       )
    this.winMoney = 0;
    this.winLines = [];
    this.winMulti = 1;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 5;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                       
    this.expansiblePositions = [];
    this.expandedView = [];

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
    [12, 8, 6, 12, 9, 6, 7, 9, 2, 9, 4, 12, 9, 5, 6, 7, 11, 12, 7, 11, 12, 5, 11, 12, 5, 9, 10, 12, 4, 8, 11, 3, 12, 10, 4, 8, 12, 4, 10, 7],
    [6, 12, 9, 10, 11, 5, 10, 8, 2, 8, 10, 7, 11, 4, 7, 8, 12, 7, 6, 12, 9, 11, 10, 3, 11, 8, 9, 10, 11, 3, 10, 11, 4, 8, 11, 6, 8, 10, 11, 5],
    [3, 11, 8, 12, 10, 8, 7, 6, 2, 6, 7, 9, 11, 3, 9, 8, 5, 10, 11, 12, 10, 5, 12, 8, 5, 6, 9, 10, 12, 9, 8, 11, 7, 10, 3, 9, 10, 12, 9, 4],
    [12, 8, 9, 6, 12, 3, 5, 11, 2, 11, 5, 10, 8, 9, 10, 12, 11, 10, 4, 12, 6, 10, 9, 5, 3, 9, 12, 4, 8, 7, 10, 6, 5, 10, 3, 6, 7, 12, 6, 4],
    [4, 8, 7, 6, 8, 4, 10, 12, 2, 12, 7, 4, 12, 6, 4, 9, 8, 10, 9, 11, 7, 9, 11, 10, 9, 12, 5, 8, 12, 9, 10, 11, 8, 12, 11, 7, 3, 11, 8, 3]
];
var freeReels = [
    [12, 8, 6, 12, 10, 6, 7, 10, 2, 11, 4, 12, 10, 5, 6, 12, 9, 10, 7, 12, 6, 10, 11, 12, 6, 9, 10, 12, 9, 8, 10, 3, 12, 10, 4, 8, 12, 4, 10, 7],
    [6, 6, 6, 11, 11, 11, 9, 9, 9, 10, 10, 10, 11, 11, 11, 9, 9, 9, 5, 5, 5, 8, 8, 8, 9, 9, 9, 2, 2, 2, 8, 8, 8, 9, 9, 9, 11, 11, 11, 5, 5, 5, 7, 7, 7, 8, 8, 8, 9, 9, 9, 7, 7, 7, 11, 11, 11, 12, 12, 12, 10, 10, 10, 11, 11, 11, 12, 12, 12, 9, 9, 9, 11, 11, 11, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 3, 3, 3, 9, 9, 9, 11, 11, 11, 4, 4, 4, 8, 8, 8, 11, 11, 11, 5, 5, 5, 8, 8, 8, 9, 9, 9, 11, 11, 11, 5, 5, 5],
    [6, 6, 6, 11, 11, 11, 9, 9, 9, 10, 10, 10, 11, 11, 11, 9, 9, 9, 5, 5, 5, 8, 8, 8, 9, 9, 9, 2, 2, 2, 8, 8, 8, 9, 9, 9, 11, 11, 11, 5, 5, 5, 7, 7, 7, 8, 8, 8, 9, 9, 9, 7, 7, 7, 11, 11, 11, 12, 12, 12, 10, 10, 10, 11, 11, 11, 12, 12, 12, 9, 9, 9, 11, 11, 11, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 3, 3, 3, 9, 9, 9, 11, 11, 11, 4, 4, 4, 8, 8, 8, 11, 11, 11, 5, 5, 5, 8, 8, 8, 9, 9, 9, 11, 11, 11, 5, 5, 5],
    [6, 6, 6, 11, 11, 11, 9, 9, 9, 10, 10, 10, 11, 11, 11, 9, 9, 9, 5, 5, 5, 8, 8, 8, 9, 9, 9, 2, 2, 2, 8, 8, 8, 9, 9, 9, 11, 11, 11, 5, 5, 5, 7, 7, 7, 8, 8, 8, 9, 9, 9, 7, 7, 7, 11, 11, 11, 12, 12, 12, 10, 10, 10, 11, 11, 11, 12, 12, 12, 9, 9, 9, 11, 11, 11, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 3, 3, 3, 9, 9, 9, 11, 11, 11, 4, 4, 4, 8, 8, 8, 11, 11, 11, 5, 5, 5, 8, 8, 8, 9, 9, 9, 11, 11, 11, 5, 5, 5],
    [12, 8, 7, 6, 8, 11, 10, 8, 2, 12, 7, 4, 12, 6, 5, 9, 12, 10, 9, 11, 7, 9, 11, 10, 9, 12, 5, 7, 12, 9, 10, 11, 8, 12, 11, 7, 10, 11, 8, 3]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 25, 20, 15, 10, 10, 5, 5, 5, 4, 3],
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

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var view_cache = viewCache.view;
        this.view = view_cache.view;
        this.positions = view_cache.positions;
        this.expandedView = view_cache.expandedView;
        this.expansiblePositions = view_cache.expansiblePositions;
        this.winMulti = view_cache.winMulti;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        var view_cache = this.freeSpinCacheList[0];
        this.view = view_cache.view;
        this.positions = view_cache.positions;
        this.expandedView = view_cache.expandedView;
        this.expansiblePositions = view_cache.expansiblePositions;
        this.winMulti = view_cache.winMulti;
    }

    this.winMoney = WinFromView(this.expandedView, player.betPerLine, this.winMulti);
    this.winLines = WinLinesFromView(this.expandedView, player.betPerLine, this.winMulti);

    if (this.winMulti == 11) { //                          
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var view_cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = view_cache.view;
    this.positions = view_cache.positions;
    this.expandedView = view_cache.expandedView;
    this.expansiblePositions = view_cache.expansiblePositions;
    this.winMulti = view_cache.winMulti;

    this.winMoney = WinFromView(this.expandedView, player.betPerLine, this.winMulti);
    this.winLines = WinLinesFromView(this.expandedView, player.betPerLine, this.winMulti);

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
    scatterView.winMulti = 11;
    var scatterWin = WinFromView(scatterView.expandedView, bpl, 1);
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, 5);
    var freeSpinCacheList = [scatterView];

    return {
        win: freeSpinData.win + scatterWin,
        view: freeSpinCacheList.concat(freeSpinData.cache),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var calcCount = 0;
    var bottomLimit = 0;

    while (true) {
        var result = RandomView(reels);
        var viewCache = GetRandomViewCache(result.view, bpl);
        viewCache.positions = result.positions;

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
        var result = RandomView(reels);
        var viewCache = GetRandomViewCache(result.view, bpl);
        viewCache.positions = result.positions;

        if (viewCache.win == 0) {
            return viewCache;
        }
    }
};

var RandomView = function (reels) {
    var resultView = [];
    var positions = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            resultView[viewPos] = reels[i][reelPos];
        }
        positions.push((randomIndex + 1) % len);
    }

    var result = {
        view: resultView,
        positions: positions
    }

    return result;
};

var RandomScatterView = function (reels, bpl) {
    var viewCache;

    while (true) {
        var result = RandomView(reels);
        viewCache = GetRandomViewCache(result.view, bpl);
        viewCache.positions = result.positions;
        if (viewCache.expansiblePositions.length < 5) {
            break;
        }
    }

    return viewCache;
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
        var freeSpinIndex = 1,
            freeSpinLength = fsLen,
            freeSpinWinMoney = 0,
            freeSpinCacheList = [];

        while (true) {
            var result = RandomFreeView(reels);

            var freeViewCache = {};
            freeViewCache.view = result.view;
            freeViewCache.positions = result.positions;
            freeViewCache.expandedView = result.view;
            freeViewCache.expansiblePositions = [];
            freeViewCache.winMulti = Util.random(1, 11);
            freeViewCache.win = WinFromView(freeViewCache.view, bpl, freeViewCache.winMulti)

            freeSpinCacheList.push(freeViewCache);
            freeSpinWinMoney += freeViewCache.win;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        var freeSpinData = {
            win: freeSpinWinMoney,
            cache: freeSpinCacheList,
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
};

var RandomFreeView = function (reels) {
    var resultView = [];
    var positions = [];

    var randomIndex;
    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        if (i == 0 || i == 4) {
            randomIndex = Util.random(0, len);
        } else if (i == 1) {
            randomIndex = Util.random(0, len / 3) * 3;
        }
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            resultView[viewPos] = reels[i][reelPos];
        }
        positions.push((randomIndex + 1) % len);
    }

    var result = {
        view: resultView,
        positions: positions
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

var GetRandomViewCache = function (view, bpl) {
    var expandedView = Util.clone(view);
    var expansiblePositions = GetExpansiblePositions(expandedView);

    var winMulti = Util.random(1, 11);

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
        winMulti: winMulti,
        win: win
    }

    return result;
};

module.exports = SlotMachine;