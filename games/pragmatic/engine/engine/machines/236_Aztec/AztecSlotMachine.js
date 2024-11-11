var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];

    this.winMulti = 1;

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = []; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var wild = 2;
var slotWidth = 3, slotHeight = 3;
var baseReels = [
    [8, 8, 8, 8, 7, 7, 7, 6, 6, 6, 6, 6, 8, 8, 4, 4, 4, 4, 8, 6, 5, 5, 5, 7, 8, 8, 6, 9, 9, 9, 9, 9, 8, 6, 8, 4, 3, 3, 3, 3, 9, 8, 9, 4, 3, 2, 2, 2, 9, 5, 2, 2, 6, 6, 7],
    [4, 4, 4, 9, 9, 9, 7, 7, 7, 7, 7, 7, 2, 2, 2, 8, 8, 8, 9, 7, 7, 4, 7, 7, 5, 5, 5, 5, 5, 6, 6, 6, 9, 2, 3, 3, 3, 9, 9, 9, 8, 5, 8, 9, 5, 3, 6, 4],
    [4, 4, 4, 4, 8, 8, 8, 9, 9, 9, 9, 7, 7, 7, 7, 5, 5, 5, 3, 3, 3, 7, 7, 3, 8, 9, 5, 3, 8, 4, 9, 7, 9, 5, 5, 9, 9, 6, 6, 6, 6, 7, 2, 2, 2, 9, 2]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 20, 15, 12, 10, 8, 5, 2]
];
var payLines = [
    [3, 4, 5], // 1
    [0, 1, 2], // 2
    [6, 7, 8], // 3
    [0, 4, 8], // 4
    [6, 4, 2], // 5
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    var viewCache = player.viewCache;

    var multiArr = [1, 2, 3, 5, 10, 15];
    this.view = viewCache.view;
    this.winMulti = viewCache.winMulti;
    this.winMultiIndex = multiArr.indexOf(this.winMulti);

    this.winMoney = WinFromView(this.view, player.betPerLine, this.winMulti);

    var winInfo = WinLinesFromView(this.view, player.betPerLine, this.winMulti);
    this.winLines = winInfo.winLines;
    this.winSymbols = winInfo.winSymbols;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    var winMultiArr = [1, 2, 3, 5, 10, 15];
    var winMulti = 1;

    var multiIndex = 0;
    if (Util.probability(50)) {
        multiIndex = 1;
    } else if (Util.probability(50)) {
        multiIndex = 2;
    } else if (Util.probability(50)) {
        multiIndex = 3;
    } else if (Util.probability(50)) {
        multiIndex = 4;
    } else if (Util.probability(50)) {
        multiIndex = 5;
    }

    winMulti = winMultiArr[multiIndex];

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin, winMulti);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }

    tmpWin = WinFromView(tmpView, bpl, winMulti);

    var pattern = {
        view: tmpView,
        win: tmpWin,
        type: "BASE",
        bpl: bpl,
        winMulti: winMulti
    };
    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    if (jpType == "RANDOM") {
        return this.SpinForBaseGen(bpl, totalBet, jpWin);
    } else {
        return null;
    }
};

var RandomWinView = function (reels, bpl, maxWin, winMulti) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);

        tmpWin = WinFromView(tmpView, bpl, winMulti);

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
        tmpWin = WinFromView(tmpView, bpl, 1);

        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView;
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl, winMulti) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl, winMulti);
        money += linePay;
    }

    return money;
};

var WinFromLine = function (lineSymbols, bpl, winMulti) {
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

    var winPay = payTable[matchCount][symbol] * bpl * winMulti;

    return winPay;
};

var WinLinesFromView = function (view, bpl, multi) {
    var winLines = [];
    var winSymbols = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl, multi);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
            winSymbols.push(lineSymbols[0]);
        }
    }

    var result = {
        winLines: winLines,
        winSymbols: winSymbols
    }
    return result;
};

var isWild = function (symbol) {
    return symbol == wild;
};

module.exports = SlotMachine;