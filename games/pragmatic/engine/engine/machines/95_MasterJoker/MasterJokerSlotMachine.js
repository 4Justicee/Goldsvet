var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.gameSort = "BASE";
    this.currentGame = "BASE";
    this.lineCount = 1;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.lm_v = [];

    this.betPerLine = 0;
    this.totalBet = 0;

    this.patternCount = 2000;
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.jackpotType = ["FREE"];
};

var slotWidth = 5, slotHeight = 1;
var wild = 2;
var baseReels = [
    [3, 4, 5, 6, 4, 5, 6, 7, 8, 4, 5, 6, 4, 5, 9],
    [3, 7, 4, 7, 3, 6, 7, 6, 7, 6, 7, 6, 8, 8, 8, 6, 7, 6, 7, 5, 9, 8],
    [8, 7, 5, 8, 2, 4, 8, 7, 3, 8, 7, 2, 6, 7, 8, 6, 8, 6, 8, 4, 5, 6, 8, 6, 9, 8, 6, 8],
    [9, 9, 9, 8, 7, 8, 7, 8, 7, 8, 7, 8, 8, 7, 8, 7, 8, 3, 8, 4, 8, 5, 8, 6, 8, 7],
    [8, 8, 3, 8, 8, 4, 8, 8, 5, 8, 8, 5, 8, 8, 6, 8, 5, 8, 8, 5, 7, 9],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 10, 8, 5, 4, 2, 1],
    [0, 0, 0, 50, 25, 15, 10, 8, 5, 3],
    [0, 0, 0, 100, 50, 25, 15, 12, 10, 8]
];
var wildMultiArray = [2, 3, 5, 10, 15, 25, 50, 100];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 15; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;


    var result = GetFinalView(viewCache.view);
    this.view = result.view;

    this.winMoney = WinFromView(viewCache.view, player.betPerLine);
    this.winLines = WinLinesFromView(viewCache.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.lm_v = "";

    if (result.multi > 1) {
        var lineMulti = [];
        for (var i = 0; i < this.winLines.length; i++) {
            lineMulti.push(`${i}~${result.multi}`);
        }
        this.lm_v = lineMulti.join(';');
    }
};

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
    var tmpView, tmpWin;
    //                            [      ] *                                                             ~~                 .

    tmpView = RandomWildView(baseReels, bpl, jpWin);
    tmpWin = WinFromView(tmpView, bpl);

    var pattern = {
        view: tmpView,
        win: tmpWin,
        type: "FREE",
        bpl: bpl,
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
    return tmpView
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

    if (view[2] == wild) {
        var multi = wildMultiArray[Util.random(0, wildMultiArray.length)];
        view[2] = wild + multi * 10;
    }
    return view;
};

var RandomWildView = function (reels, bpl, maxWin) {
    var tmpView;

    while (true) {
        tmpView = RandomWinView(reels, bpl, maxWin);
        if (tmpView[2] > 10) {
            break;
        }
    }
    return tmpView;
};

var WinFromView = function (view, bpl) {
    var symbolCount = payTable[0].length;
    var symbolCounts = [];

    var wildCount = view[2] % 10 == wild ? 1 : 0;
    var wildMulti = view[2] > 10 ? Math.floor(view[2] / 10) : 1;

    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = wildCount;
    }

    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }

    var winMoney = 0;
    for (var i = 0; i < symbolCount; i++) {
        var matchCount = symbolCounts[i];
        winMoney += payTable[matchCount][i] * bpl;
    }

    winMoney *= wildMulti;
    return winMoney;
};

var WinLinesFromView = function (view, bpl) {
    var symbolCount = payTable[0].length;
    var symbolCounts = [];

    var wildCount = view[2] % 10 == wild ? 1 : 0;
    var wildMulti = view[2] > 10 ? Math.floor(view[2] / 10) : 1;

    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = wildCount;
    }

    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }

    var winLines = [];
    var lineId = 0;
    for (var i = 0; i < symbolCount; i++) {
        var money = payTable[symbolCounts[i]][i] * bpl * wildMulti;
        if (money > 0) {
            var winSymbolPositions = SymbolPositions(view, i);
            winLines.push(`${lineId++}~${money}~${winSymbolPositions.join('~')}`);
        }
    }
    return winLines;
};

var SymbolPositions = function (view, symbol) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == symbol || view[i] % 10 == wild) {
            result.push(i);
        }
    }
    return result;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var GetFinalView = function (wildView) {
    if (wildView[2] < 10) {
        return {
            view: wildView,
            multi: 1
        };
    }

    var view = [...wildView];
    var multi = Math.floor(wildView[2] / 10);
    view[2] = wild;
    return {
        view: view,
        multi: multi
    };
}

module.exports = SlotMachine;