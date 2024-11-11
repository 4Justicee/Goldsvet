var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 1;
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

var slotWidth = 3, slotHeight = 3;
var winLines = [];
var wild = 2;
var baseReels = [
    [6, 5, 6, 5, 6, 4, 6, 2, 6, 5, 6, 5, 6, 4, 6, 5, 6, 5, 6, 4, 6, 5, 6, 5, 6, 4, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 2, 6, 5, 6, 5, 6, 4, 6, 5, 6, 4, 6, 5, 6, 5, 6, 4, 6, 5, 6, 4, 6, 3, 6, 4, 6, 5, 6, 4, 6, 5, 6, 4],
    [6, 5, 6, 3, 6, 5, 6, 2, 6, 5, 6, 4, 6, 5, 6, 5, 6, 3, 6, 5, 6, 5, 6, 3, 6, 5, 6, 2, 6, 5, 6, 5, 6, 3, 6, 5, 6, 5, 6, 3, 6, 5, 6, 5, 6, 3, 6, 5, 6, 5, 6, 3, 6, 5, 6, 5, 6, 2, 6, 5, 6, 5, 6, 3, 6, 5, 6, 5, 6, 3, 6, 3],
    [6, 3, 6, 4, 6, 3, 6, 5, 6, 4, 6, 4, 6, 2, 6, 4, 6, 3, 6, 4, 6, 4, 6, 3, 6, 4, 6, 4, 6, 4, 6, 3, 6, 4, 6, 4, 6, 4, 6, 2, 6, 3, 6, 4, 6, 4, 6, 4, 6, 3, 6, 4, 6, 3, 6, 4, 6, 4, 6, 3, 6, 4, 6, 4, 6, 2, 6, 3, 6, 4, 6, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 288, 88, 58, 28, 0]
];
var payLines = [
    [3, 4, 5]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 5; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    if (this.winLines.length == 0 && this.winMoney > 0) {
        this.winLines = winLines;
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
    var view, win;
    view = RandomJackpotView(jpWin);
    win = WinFromView(view, bpl);
    var pattern = {
        view: view,
        win: win,
        type: "BASE",
        bpl: bpl
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

        var wildCnt = 0;
        for (var i = 0; i < slotWidth * slotHeight; i++) {
            if (resultView[i] == wild) {
                wildCnt++;
            }
        }

        if (wildCnt < 2) {
            break;
        }
    }

    return resultView;
};

var RandomJackpotView = function (targetWin) {
    var view = [6, 6, 6, 5, 5, 5, 6, 6, 6];
    if (targetWin > 580) {
        view = [6, 6, 6, 4, 4, 4, 6, 6, 6];
    }
    if (targetWin > 880) {
        view = [6, 6, 6, 3, 3, 3, 6, 6, 6];
    }
    if (targetWin > 2880) {
        view = [6, 6, 6, 2, 2, 2, 6, 6, 6];
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
    var winMoney = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        winMoney += linePay;
    }

    if (winMoney == 0) {
        var aniView = [];
        for (var i = 0; i < 3; i++) {
            if (view[i + 3] != 6) {
                aniView.push(view[i + 3]);
            }
        }

        if (aniView.length == 3) {
            winMoney = bpl * 5;
            winLines = [`0~${winMoney}~3~4~5`];
        }
    }

    return winMoney;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i]))
            //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    var hasWild = false;
    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            hasWild = true;
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

var isWild = function (symbol) {
    return symbol == wild;
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
}

module.exports = SlotMachine;