var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.maskView = [];
    // Required
    this.view = [];
    this.winMoney = 0;
    this.winLines = [];
    this.virtualReels = {};
    this.gameSort = "BASE";
    this.prevGameMode = "BASE";
    this.currentGame = "BASE";
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 40;
    this.jackpotType = ["JACKPOT"];
};

var slotWidth = 5, slotHeight = 4;
var scatter = 1, wild = 2;
var baseReels = [
    [3, 6, 6, 6, 8, 8, 8, 8, 1, 4, 4, 9, 9, 9, 9, 2, 2, 2, 2, 11, 11, 11, 5, 5, 5, 7, 7, 7, 10, 10, 10, 10],
    [7, 7, 7, 11, 11, 11, 11, 11, 1, 10, 10, 10, 10, 8, 8, 8, 2, 2, 2, 2, 4, 4, 4, 4, 9, 9, 9, 6, 6, 6, 3, 3, 5, 5],
    [5, 5, 5, 2, 2, 2, 2, 9, 9, 9, 1, 11, 11, 11, 4, 4, 4, 10, 10, 10, 10, 8, 8, 8, 7, 7, 7, 6, 6, 6, 3],
    [6, 6, 6, 3, 3, 3, 1, 8, 8, 8, 8, 9, 9, 9, 9, 2, 2, 2, 2, 7, 7, 7, 4, 4, 4, 10, 10, 10, 11, 11, 11, 11, 5, 5, 5, 5],
    [5, 5, 5, 1, 7, 7, 7, 6, 6, 6, 9, 9, 9, 9, 11, 11, 11, 11, 4, 4, 4, 4, 2, 2, 2, 2, 10, 10, 10, 10, 3, 3, 3, 7, 7, 7, 8, 8, 8],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 90, 50, 40, 30, 20, 15, 10, 10, 5],
    [0, 0, 0, 500, 200, 150, 100, 90, 80, 60, 50, 50],
    [0, 0, 0, 2000, 600, 500, 400, 300, 250, 200, 140, 100]
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [10, 11, 12, 13, 14], // 2
    [0, 1, 2, 3, 4], // 3
    [15, 16, 17, 18, 19], // 4
    [0, 6, 12, 18, 19], // 5
    [15, 11, 7, 3, 4], // 6
    [10, 6, 2, 8, 14], // 7
    [5, 11, 17, 13, 9], // 8
    [15, 11, 7, 13, 19], // 9
    [0, 6, 12, 8, 4], // 10
    [10, 16, 12, 18, 14], // 11
    [5, 1, 7, 3, 9], // 12
    [10, 6, 12, 8, 14], // 13
    [15, 11, 17, 13, 19], // 14
    [0, 6, 7, 8, 4], // 15
    [5, 11, 12, 13, 9], // 16
    [10, 16, 17, 18, 14], // 17
    [5, 1, 2, 3, 9], // 18
    [10, 6, 7, 8, 14], // 19
    [15, 11, 12, 13, 19], // 20
    [0, 1, 7, 3, 4], // 21
    [5, 6, 12, 8, 9], // 22
    [10, 11, 17, 13, 14], // 23
    [5, 6, 2, 8, 9], // 24
    [10, 11, 7, 13, 14], // 25
    [15, 16, 12, 18, 19], // 26
    [0, 1, 7, 13, 19], // 27
    [15, 16, 12, 8, 4], // 28
    [15, 11, 7, 3, 9], // 29
    [0, 6, 12, 18, 14], // 30
    [0, 1, 12, 3, 4], // 31
    [5, 6, 17, 8, 9], // 32
    [10, 11, 2, 13, 14], // 33
    [15, 16, 7, 18, 19], // 34
    [5, 16, 17, 18, 9], // 35
    [10, 1, 2, 3, 14], // 36
    [5, 1, 12, 3, 9], // 37
    [10, 6, 17, 8, 14], // 38
    [5, 11, 2, 13, 9], // 39
    [10, 16, 7, 18, 14], // 40
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevGameMode = this.currentGame;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.view = [];
    this.maskView = [];
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;

    if (ExistWild(this.view)) {

        this.maskView = GetMaskView(this.view);
    }

    var winInfo = WinFromView(this.view, player.betPerLine);
    this.winMoney = winInfo.winMoney;
    this.winLines = winInfo.winLines;
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine);
    this.scatterPositions = ScatterPositions(this.view);
    this.winMoney += this.scatterWin;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    var viewInfo = null;

    if (baseWin > 0) {
        viewInfo = RandomWinView(baseReels, bpl, baseWin);

    } else {
        viewInfo = RandomZeroView(baseReels, bpl);
    }

    if (viewInfo.comment) {

        pattern.comment = viewInfo.comment;
    }

    pattern.win = viewInfo.winMoney;
    pattern.view = viewInfo.view;

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var maxPattern = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {

        var pattern = this.SpinForBaseGen(bpl, totalBet, jpWin);
        pattern.isCall = isCall ? 1 : 0;
        pattern.comment = "      ";

        if (!maxPattern) {
            maxPattern = pattern;
            continue;
        }

        if (maxPattern.win > jpWin && pattern.win < maxPattern.win) {
            maxPattern = pattern;
            continue;
        }

        if (maxPattern.win < jpWin && pattern.win > maxPattern.win && pattern.win < jpWin) {
            maxPattern = pattern;
            continue;
        }
    }

    return maxPattern;
};

var RandomZeroView = function (reels, bpl) {
    var view = null;
    var winMoney = null;

    while (true) {

        view = RandomView(reels);

        winMoney = WinFromView(view, bpl).winMoney + ScatterWinFromView(view, bpl);

        if (winMoney == 0) {

            return { view, winMoney };
        }

    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    var view = null;
    var winMoney = null;

    while (true) {

        var comment = null;

        view = RandomView(reels);

        winMoney = WinFromView(view, bpl).winMoney + ScatterWinFromView(view, bpl);

        if (winMoney > bpl * 1000) {

            comment = "      ";
        }

        if (winMoney > bottomLimit && winMoney <= maxWin) {
            return { view, winMoney, comment };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomView = function (reels) {
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

    return { view, winMoney: 0, comment: "      " };
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
    var winMoney = 0;
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {

        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
        var lineSymbolsTmp = [...lineSymbols];
        var linePay = WinFromLine(lineSymbolsTmp, bpl) + WildWinFronLine(lineSymbols, bpl);

        if (linePay > 0) {

            winLines.push(
                `${lineId}~${linePay}~${payLines[lineId].filter(function (item, index, arr) {
                    return lineSymbolsTmp[index] != -1
                }).join('~')}`);
        }

        winMoney += linePay;
    }

    return { winMoney, winLines };
};

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) {

        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {

        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    try {
        return payTable[matchCount][symbol] * bpl;
    } catch (error) {
        // console.log(error);
    }
};

var WildWinFronLine = function (lineSymbols, bpl) {
    switch (NumberOfWildInALine(lineSymbols)) {
        case 3: return bpl * 100;
        case 4: return bpl * 1000;
        case 5: return bpl * 2000;
    }
    return 0;
};

var NumberOfWildInALine = function (lineSymbols) {
    var subsequentWildCnt = 0;

    for (var i = 0; i < lineSymbols.length; i++) {

        if (isWild(lineSymbols[i])) {
            subsequentWildCnt++;
        }
    }

    return subsequentWildCnt;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var ScatterWinFromView = function (view, bpl) {
    switch (NumberOfScatters(view)) {
        case 3: return bpl * 200;
        case 4: return bpl * 5000;
        case 5: return bpl * 20000;
    }
    return 0;
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

var RandomSymbol = function () {
    return Util.random(3, 12);
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

var ExistWild = function (view) {

    for (var i = 0; i < view.length; i++) {

        if (isWild(view[i])) {

            return true;
        }
    }

    return false;
};

var GetMaskView = function (view) {
    var maskView = [...view];

    for (var i = 0; i < maskView.length; i++) {

        if (isWild(view[i])) {

            maskView[i] = RandomSymbol();
        }
    }

    return maskView;
}

module.exports = SlotMachine;