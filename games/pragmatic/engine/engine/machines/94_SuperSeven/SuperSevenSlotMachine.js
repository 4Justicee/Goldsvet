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

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = []; //FREE, BONUS
};

var slotWidth = 5, slotHeight = 3, scatter = 1;
var baseReels = [
    [8, 8, 8, 7, 7, 7, 4, 6, 6, 6, 5, 7, 6, 1, 4, 3, 6, 8, 9, 8, 7, 9],
    [8, 3, 6, 6, 6, 7, 7, 7, 4, 4, 4, 3, 4, 7, 5, 1, 7, 8, 6, 9, 9, 9, 8, 9, 9, 4, 4],
    [4, 9, 9, 9, 9, 8, 8, 8, 3, 6, 8, 9, 5, 4, 7, 8, 5, 6, 1, 7, 6, 8, 7, 8],
    [6, 6, 6, 9, 9, 9, 7, 6, 6, 8, 8, 8, 4, 8, 3, 5, 3, 9, 9, 9, 6, 6, 5, 4, 8, 1],
    [9, 9, 9, 5, 6, 6, 6, 3, 9, 6, 9, 3, 5, 6, 7, 8, 8, 8, 6, 3, 1, 8, 6, 8, 4, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 100, 50, 50, 20, 20, 20, 20],
    [0, 0, 0, 1000, 200, 200, 50, 50, 40, 40],
    [0, 0, 0, 5000, 1000, 1000, 200, 200, 200, 200]
];
var payLines = [
    [5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4],
    [10, 11, 12, 13, 14],
    [0, 6, 12, 8, 4],
    [10, 6, 2, 8, 14]
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

    var viewCache = player.viewCache;

    this.view = viewCache.view;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    if (isFreeSpinWin(this.view)) {
        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winMoney += WinMoneyFromSacterview(this.view)
    } else {
        this.winMoney = WinFromView(this.view, player.betPerLine);
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var view, win;

    if (baseWin > 0) {
        view = RandomWinView(baseReels, bpl, baseWin);
    } else {
        view = RandomZeroView(baseReels, bpl);
    }
    win = WinFromView(view, bpl);

    var pattern = {
        view: view,
        win: win,
        type: "BASE",
        bpl: bpl
    };

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    if (jpType == "RANDOM") {
        var minMoney = jpWin * 0.8;
        var maxMoney = jpWin;

        minMoney = Util.max(minMoney, 0);
        maxMoney = Util.max(maxMoney, 0);

        var lowerLimit = -1,
            upperLimit = 100000000000000;
        var lowerView = null,
            upperView = null;

        for (var patternIndex = 0; patternIndex < 500; patternIndex++) {
            var view = RandomView(baseReels);
            var win = WinFromView(view, bpl);

            if (win >= minMoney && win <= maxMoney) {
                return {
                    win: win,
                    view: view,
                    bpl: bpl,
                    type: "BASE",
                    isCall: isCall ? 1 : 0
                };
            }

            if (win > lowerLimit && win < minMoney) {
                lowerLimit = win;
                lowerView = {
                    win: win,
                    view: view,
                    bpl: bpl,
                    type: "BASE",
                    isCall: isCall ? 1 : 0
                };
            }

            if (win > maxMoney && win < upperLimit) {
                upperLimit = win;
                upperView = {
                    win: win,
                    view: view,
                    bpl: bpl,
                    type: "BASE",
                    isCall: isCall ? 1 : 0
                };
            }
        }

        return lowerView ? lowerView : upperView;
    } else {
        return null;
    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var calcCount = 0, bottomLimit = 0;
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (isFreeSpinWin(view)) {
            win += WinMoneyFromSacterview(view, bpl)
        }

        if (win > bottomLimit && win <= maxWin) {
            return view;
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
        var win = WinFromView(view, bpl);

        if (win == 0) {
            return view;
        }
    }
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

        if (isFreeWinView(resultView) >= 3) {
            continue;
        } else {
            break;
        }
    }

    return resultView;
};

var isFreeWinView = function (view) {
    var counter = 0;

    for (var i = 0; i < view.length; i++) {
        if (view[i] == scatter) {
            counter++;
        }
    }

    return counter;
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
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    return money;
};

var WinFromLine = function (lineSymbols, bpl) {
    var symbol = lineSymbols[0]; //                                    
    var matchCount = 0;

    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

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
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
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

var WinMoneyFromSacterview = function (view, bpl) {
    switch (NumberOfScatters(view)) {
        case 3:
            return bpl * 10;
        case 4:
            return bpl * 50;
        case 5:
            return bpl * 250;
        default:
            break;
    }
}

module.exports = SlotMachine;