var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 50;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];
    //                           
    this.freeReels = []; //                                 
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinMore = 0; //                                                 
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

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
var slotWidth = 5, slotHeight = 4;
var freeSpinLength = 6;
var baseReels = [
    [3, 3, 3, 3, 3, 3, 3, 6, 3, 7, 10, 7, 12, 4, 3, 11, 8, 5, 9],
    [8, 3, 3, 3, 3, 3, 3, 6, 4, 3, 1, 11, 10, 7, 3, 5, 2, 12, 9],
    [3, 3, 3, 3, 3, 3, 3, 11, 1, 10, 5, 4, 12, 3, 7, 8, 2, 6, 9],
    [4, 3, 3, 3, 3, 7, 9, 3, 10, 5, 1, 6, 12, 2, 11, 8, 3],
    [3, 3, 3, 3, 8, 12, 9, 5, 3, 11, 7, 3, 6, 4, 3, 10]
];
var freeReels = [
    [3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
    [2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
    [2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
    [2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8],
    [3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 20, 20, 20, 10, 5, 5, 2, 2],
    [0, 0, 0, 200, 120, 80, 80, 80, 50, 25, 25, 10, 10],
    [0, 0, 0, 800, 400, 300, 300, 300, 150, 100, 100, 50, 50]
];
var payLines = [
    [0, 1, 2, 3, 4], // 1
    [15, 16, 17, 18, 19], // 2
    [5, 6, 7, 8, 9], // 3
    [10, 11, 12, 13, 14], // 4
    [0, 6, 12, 8, 4], // 5
    [15, 11, 7, 13, 19], // 6
    [10, 6, 2, 8, 14], // 7
    [5, 11, 17, 13, 9], // 8
    [0, 6, 2, 8, 4], // 9
    [15, 11, 17, 13, 19], // 10
    [5, 1, 7, 3, 9], // 11
    [10, 16, 12, 18, 14], // 12
    [5, 11, 7, 13, 9], // 13
    [10, 6, 12, 8, 14], // 14
    [0, 6, 7, 8, 4], // 15
    [15, 11, 12, 13, 19], // 16
    [5, 1, 2, 3, 9], // 17
    [10, 16, 17, 18, 14], // 18
    [5, 11, 12, 13, 9], // 19
    [10, 6, 7, 8, 14], // 20
    [0, 1, 7, 3, 4], // 21
    [15, 16, 12, 18, 19], // 22
    [5, 6, 2, 8, 9], // 23
    [10, 11, 17, 13, 14], // 24
    [5, 6, 12, 8, 9], // 25
    [10, 11, 7, 13, 14], // 26
    [0, 1, 12, 3, 4], // 27
    [15, 16, 7, 18, 19], // 28
    [10, 11, 2, 13, 14], // 29
    [5, 6, 17, 8, 9], // 30
    [0, 11, 12, 13, 4], // 31
    [15, 6, 7, 8, 19], // 32
    [10, 1, 2, 3, 14], // 33
    [5, 16, 17, 18, 9], // 34
    [5, 1, 12, 3, 9], // 35
    [10, 16, 7, 18, 14], // 36
    [5, 11, 2, 13, 9], // 37
    [10, 6, 17, 8, 14], // 38
    [0, 11, 2, 13, 4], // 39
    [15, 6, 17, 8, 19], // 40
    [10, 1, 12, 3, 14], // 41
    [5, 16, 7, 18, 9], // 42
    [0, 11, 7, 13, 4], // 43
    [15, 6, 12, 8, 19], // 44
    [10, 1, 7, 3, 14], // 45
    [5, 16, 12, 18, 9], // 46
    [0, 1, 7, 13, 19], // 47
    [15, 16, 12, 8, 4], // 48
    [0, 6, 12, 18, 19], // 49
    [15, 11, 7, 3, 4], // 50
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
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
        this.view = viewCache.view;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isFreeSpinWin(this.view)) { //                          
        this.freeReels = [
            [3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
            [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
            [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
            [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8],
            [3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8]
        ];

        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinLength;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
    this.freeSpinMore = NumberOfScatters(this.view);
    this.freeSpinLength += this.freeSpinMore;

    for (var i = 1; i < 4; i++) {
        this.freeReels[i].unshift(wild);
    }

    this.virtualReels = {
        above: RandomLineFromReels(this.freeReels),
        below: RandomLineFromReels(this.freeReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.freeReels = Util.clone(freeReels);
        this.currentGame = "BASE";
    }
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
    var scatterView = RandomScatterView(baseReels);
    var scatterWin = WinFromView(scatterView, bpl);
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin);
    var freeSpinCacheList = [scatterView];

    return {
        win: scatterWin + freeSpinData.win,
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
        var win = WinFromView(view, bpl);

        if (isFreeSpinWin(view)) {
            continue;
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

        if (isFreeSpinWin(view)) {
            continue;
        }

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

var RandomScatterView = function (reels) {
    var view;

    while (true) {
        view = RandomView(reels);
        if (isFreeSpinWin(view)) {
            break;
        }
    }

    return view;
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
            freeSpinLength = 6,
            freeSpinWinMoney = 0,
            freeSpinCacheList = [];

        var fReels = [
            [3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
            [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
            [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
            [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8],
            [3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8]
        ];

        while (true) {
            for (var i = 1; i < 4; i++) {
                fReels[i].unshift(wild);
            }

            view = RandomView(fReels);

            if (isFreeSpinWin(view)) {
                for (var i = 1; i < 4; i++) {
                    fReels[i].shift();
                }
                continue;
            }

            win = WinFromView(view, bpl);

            freeSpinCacheList.push(view);
            freeSpinWinMoney += win;
            freeSpinLength += NumberOfScatters(view);
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

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    money += ScatterWinFromView(view, bpl * 50);

    return money;
};

var WinFromLine = function (lineSymbols, bpl) {
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

var ScatterWinFromView = function (view, bet) {
    if (isFreeSpinWin(view))
        return bet * 2;
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

module.exports = SlotMachine;