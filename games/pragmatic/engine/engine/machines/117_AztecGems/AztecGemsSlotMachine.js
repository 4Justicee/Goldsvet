var Util = require("../../../utils/slot_utils");

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
    this.multi = 0;
    this.multiIndex = 0;
    this.com = [];

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS
};

var slotWidth = 3, slotHeight = 3, wild = 2;
var winSymPos = [];
var multiList = [1, 2, 3, 5, 10, 15];
var baseReels = [
    [8, 8, 8, 8, 7, 7, 7, 6, 6, 6, 6, 6, 8, 8, 4, 4, 4, 4, 8, 6, 5, 5, 5, 7, 8, 8, 6, 9, 9, 9, 9, 9, 8, 6, 8, 4, 3, 3, 3, 3, 9, 8, 9, 4, 3, 2, 2, 2, 9, 5, 2, 2, 6, 6, 7],
    [4, 4, 4, 9, 9, 9, 7, 7, 7, 7, 7, 7, 2, 2, 2, 8, 8, 8, 9, 7, 7, 4, 7, 7, 5, 5, 5, 5, 5, 6, 6, 6, 9, 2, 3, 3, 3, 9, 9, 9, 8, 5, 8, 9, 5, 3, 6, 4],
    [4, 4, 4, 4, 8, 8, 8, 9, 9, 9, 9, 7, 7, 7, 7, 5, 5, 5, 3, 3, 3, 7, 7, 3, 8, 9, 5, 3, 8, 4, 9, 7, 9, 5, 5, 9, 9, 6, 6, 6, 6, 7, 2, 2, 2, 9, 2]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 12, 10, 8, 5, 2]
];
var payLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.multi = cache.multi;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.multi = cache.multi;
    }

    this.multiIndex = multiList.indexOf(this.multi);
    winSymPos = [];
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winMoney = this.winMoney * this.multi;
    this.winLines = WinLinesFromView(this.view, player.betPerLine, this.multi);
    this.com = winSymPos;

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
    win = WinFromView(view.view, bpl);

    var pattern = {
        view: view,
        win: win * view.multi,
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
    var freeCache = RandomFreeViewCache(baseReels, bpl, fsWin)

    var pattern = {
        win: freeCache.win,
        view: freeCache.view,
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, multi = 0;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        multi = multiList[Util.random(0, 6)];

        if (tmpWin * multi > bottomLimit && tmpWin * multi <= maxWin) {
            break;
        }

        calcCount++;

        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    var obj = {
        view: tmpView,
        multi: multi
    }

    return obj;
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (win == 0) {
            var obj = {
                view: view,
                multi: multiList[Util.random(0, 6)]
            }
            return obj;
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

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 500; patternIndex++) {
        var tmpView = [], tmpWin = 0, multi = 0;

        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);

        multi = multiList[Util.random(3, 6)];

        var obj = {
            view: tmpView,
            multi: multi
        }

        if (tmpWin * multi >= minMoney && tmpWin * multi <= maxMoney) {
            return {
                win: tmpWin * multi,
                view: obj
            };
        }

        if (tmpWin * multi > lowerLimit && tmpWin * multi < minMoney) {
            lowerLimit = tmpWin * multi;
            lowerView = {
                win: tmpWin * multi,
                view: obj
            };
        }

        if (tmpWin * multi > maxMoney && tmpWin * multi < upperLimit) {
            upperLimit = tmpWin * multi;
            upperView = {
                win: tmpWin * multi,
                view: obj
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
    var winMoney = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        winMoney += linePay;
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
    if (winPay > 0) {
        winSymPos.push(symbol);
    }
    return winPay;
};

var WinLinesFromView = function (view, bpl, multi = 1) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);

        if (linePay > 0) {
            winLines.push(
                `${lineId}~${linePay * multi}~${line
                    .filter(function (item, index, arr) {
                        return lineSymbols[index] != -1;
                    })
                    .join("~")}`
            );
        }
    }

    return winLines;
};

var isWild = function (symbol) {
    return symbol == wild;
};

module.exports = SlotMachine;