var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    this.winSymbols = [];
    this.jackpotMoney = 0;

    //       
    this.view = [];
    this.winMoney = 0;
    this.winLines = [];
    this.virtualReels = {};
    this.gameSort = "BASE";
    this.currentGame = "BASE";
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 10;
    this.jackpotType = ["JACKPOT"];
};

var wild = 2, bubblepop = 14;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [11, 8, 13, 2, 2, 2, 7, 11, 9, 13, 7, 12, 10, 7, 13, 9, 8, 12, 11, 10, 7, 12, 4, 13, 6, 10, 12, 11, 14, 14, 14, 13, 6, 12, 8, 11, 3, 6, 5, 9, 7, 12, 4, 13, 6],
    [9, 10, 6, 2, 2, 2, 12, 7, 9, 10, 8, 11, 3, 7, 13, 4, 9, 11, 5, 6, 13, 7, 10, 4, 6, 14, 14, 14, 6, 8, 9, 10, 11, 6, 9, 7, 10, 8, 5, 11, 12, 7, 9, 6, 10, 5, 11, 8, 3],
    [8, 12, 11, 2, 2, 2, 6, 13, 8, 10, 13, 6, 14, 14, 14, 8, 12, 9, 6, 10, 7, 13, 3, 6, 9, 8, 4, 10, 9, 7, 13, 12, 10, 9, 5, 13, 6, 7, 12, 9, 8, 10, 13, 9, 12, 14, 14, 14, 6, 13],
    [5, 12, 8, 2, 2, 10, 8, 9, 12, 5, 11, 6, 10, 3, 12, 4, 9, 7, 11, 3, 13, 14, 14, 14, 7, 10, 5, 11, 12, 4, 6, 10, 5, 13, 4, 8, 11, 12, 10, 5, 11, 13, 6, 12, 10, 6, 13, 9, 8, 12, 6, 11, 10, 5, 8, 13],
    [11, 8, 12, 2, 2, 2, 13, 4, 12, 8, 10, 13, 9, 7, 11, 10, 6, 13, 3, 9, 8, 12, 5, 13, 7, 11, 6, 10, 4, 11, 8, 10, 12, 7, 11, 8, 14, 14, 14, 12]
];
var payTable = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 150, 300, 1000],
    [0, 0, 0, 100, 200, 500],
    [0, 0, 0, 75, 150, 300],
    [0, 0, 0, 30, 100, 250],
    [0, 0, 0, 25, 80, 200],
    [0, 0, 0, 20, 60, 150],
    [0, 0, 0, 15, 50, 125],
    [0, 0, 0, 10, 40, 100],
    [0, 0, 0, 10, 40, 100],
    [0, 0, 0, 5, 20, 50],
    [0, 0, 0, 5, 20, 50],
    [0, 0, 0, 0, 0, 0]
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
];
var jackpotMultiAry = [0, 0, 0, 0, 0, 0, 10, 20, 80, 250, 500, 1500, 5000, 10000, 25000, 50000];

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
    this.winSymbols = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.jackpotMoney = JackpotMoneyFromView(this.view, player.betPerLine);
    this.winMoney += this.jackpotMoney;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.winSymbols = winSymbolsFromView(this.view, player.betPerLine);

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

    pattern.win = viewInfo.winMoney;
    pattern.view = viewInfo.view;

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {

    if (jpWin > bpl * this.lineCount * 2500) {
        jpWin = bpl * this.lineCount * 2500;
    }

    var calcCount = 0;

    var minMoney = jpWin * 0.8;
    var maxMoney = jpWin;

    while (true) {
        pattern = this.SpinForBaseGen(bpl, totalBet, jpWin);

        if (pattern.win >= minMoney && pattern.win <= maxMoney) {
            pattern.comment = "      ";
            pattern.isCall = isCall ? 1 : 0;
            return pattern;
        }

        calcCount++;

        if (calcCount > 1000) {
            minMoney = jpWin * 0.5;
        }
    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    var view = null;
    var winMoney = null;

    while (true) {

        view = RandomView(reels);

        winMoney = WinFromView(view, bpl) + JackpotMoneyFromView(view, bpl);

        if (winMoney > bottomLimit && winMoney <= maxWin) {
            return { view, winMoney };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    var view = null;
    var winMoney = null;

    while (true) {

        view = RandomView(reels);

        winMoney = WinFromView(view, bpl) + JackpotMoneyFromView(view, bpl);

        if (winMoney == 0) {

            return { view, winMoney };
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

    return view;
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

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {

        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);

        var lineMoney = WinFromLine(lineSymbols, bpl);

        if (lineMoney > 0) {

            winLines.push(
                `${lineId}~${lineMoney}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }

    return winLines;
};

var winSymbolsFromView = function (view, bpl) {
    var winSymbols = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {

        var line = payLines[lineId];

        var lineSymbols = Util.symbolsFromLine(view, line);

        var lineMoney = WinFromLine(lineSymbols, bpl);

        if (lineMoney > 0) {
            winSymbols.push(lineSymbols[0]);
        }
    }

    return winSymbols;
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

    return payTable[symbol][matchCount] * bpl;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var JackpotMoneyFromView = function (view, bpl) {
    var bubblepopCount = 0;

    for (var i = 0; i < view.length; i++) {
        if (view[i] == wild || view[i] == bubblepop) {
            bubblepopCount++;
        }
    }

    return jackpotMultiAry[bubblepopCount] * bpl;
}

module.exports = SlotMachine;