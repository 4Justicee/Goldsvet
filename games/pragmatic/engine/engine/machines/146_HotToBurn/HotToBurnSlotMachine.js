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
    this.scatterWin = 0;
    this.scatterPosition = [];

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["JACKPOT"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [5, 1, 8, 8, 8, 4, 7, 7, 7, 3, 6, 6, 6, 3, 5, 1, 9, 9, 9, 4, 7, 6, 5],
    [3, 8, 4, 3, 4, 9, 1, 6, 6, 6, 7, 7, 7, 5, 3, 8, 8, 8, 9, 9, 9, 1, 7, 4, 7, 5, 8],
    [3, 8, 4, 3, 4, 9, 1, 6, 6, 6, 7, 7, 7, 5, 3, 8, 8, 8, 9, 9, 9, 1, 7, 4, 7, 5, 8],
    [3, 8, 4, 3, 4, 9, 1, 6, 6, 6, 7, 7, 7, 5, 3, 8, 8, 8, 9, 9, 9, 1, 7, 4, 7, 5, 8],
    [3, 8, 4, 3, 4, 9, 1, 6, 6, 6, 7, 7, 7, 5, 3, 8, 8, 8, 9, 9, 9, 1, 7, 4, 7, 5, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 100, 50, 50, 20, 20, 20, 20],
    [0, 0, 0, 1000, 200, 200, 50, 50, 50, 50],
    [0, 0, 0, 5000, 500, 500, 200, 200, 200, 200]
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 40; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

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
    var newJpType = jpType;
    if (jpType == "RANDOM" || jpType == "JACKPOT") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "JACKPOT":
            return RandomFreeViewCache(baseReels, bpl, jpWin, isCall);
        default:
            return;
    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (win > bottomLimit && win <= maxWin) {
            return view;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(baseReels, bpl);
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

var RandomFreeViewCache = function (reels, bpl, fsWin, isCall) {
    var patternCount = 500;
    if (isCall) {
        patternCount = 100000;
    }

    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < patternCount; patternIndex++) {
        var view = RandomView(reels);
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

    money += ScatterWinFromView(view, bpl * 5);

    return money;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                    
    var symbol = lineSymbols[0];

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

var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
};

var ScatterWinFromView = function (view, bet) {
    var win = 0;
    var nScatters = NumberOfScatters(view);
    if (nScatters == 5) {
        win = bet * 50;
    } else if (nScatters == 4) {
        win = bet * 10;
    } else if (nScatters == 3) {
        win = bet * 2;
    }

    return win;
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

module.exports = SlotMachine;