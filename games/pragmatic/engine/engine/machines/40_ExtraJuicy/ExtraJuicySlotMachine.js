var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinMulti = 1;
    this.freeSpinAddIndex = -1;
    this.isFreeSpinAdd = false;

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

var scatter = 1;
var freeSpinCount = 12;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [9, 8, 8, 8, 6, 5, 5, 5, 9, 3, 3, 3, 7, 7, 7, 5, 4, 4, 4, 4, 8, 7, 9, 8, 7, 8, 5, 1, 6, 6, 6, 5, 8, 4, 9, 9, 9, 3, 8],
    [7, 8, 4, 4, 4, 8, 8, 8, 9, 3, 3, 3, 5, 6, 7, 8, 8, 9, 9, 9, 3, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5, 6, 8],
    [5, 9, 6, 8, 5, 5, 5, 3, 3, 3, 7, 7, 7, 1, 6, 6, 6, 7, 9, 8, 8, 8, 3, 3, 9, 4, 4, 4, 4, 8, 9, 9, 9, 5, 7, 7],
    [9, 7, 3, 3, 3, 3, 9, 9, 9, 6, 6, 6, 9, 5, 5, 5, 8, 8, 8, 3, 7, 7, 7, 8, 4, 4, 4, 7, 5, 6, 4, 5, 8, 9],
    [8, 8, 8, 1, 6, 6, 6, 3, 3, 3, 9, 9, 9, 5, 5, 5, 9, 6, 7, 7, 7, 4, 9, 8, 4, 4, 4, 3, 7, 5, 8, 5, 9, 1, 7]
];
var freeReels = [
    [9, 8, 8, 8, 6, 5, 5, 5, 9, 3, 3, 3, 7, 7, 7, 5, 4, 4, 4, 4, 8, 7, 9, 8, 7, 8, 5, 1, 6, 6, 6, 5, 8, 4, 9, 9, 9, 3, 8],
    [7, 8, 4, 4, 4, 8, 8, 8, 9, 3, 3, 3, 5, 6, 7, 8, 8, 9, 9, 9, 3, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5, 6, 8],
    [5, 9, 6, 8, 5, 5, 5, 3, 3, 3, 7, 7, 7, 1, 6, 6, 6, 7, 9, 8, 8, 8, 3, 3, 9, 4, 4, 4, 4, 8, 9, 9, 9, 5, 7, 7],
    [9, 7, 3, 3, 3, 3, 9, 9, 9, 6, 6, 6, 9, 5, 5, 5, 8, 8, 8, 3, 7, 7, 7, 8, 4, 4, 4, 7, 5, 6, 4, 5, 8, 9],
    [8, 8, 8, 1, 6, 6, 6, 3, 3, 3, 9, 9, 9, 5, 5, 5, 9, 6, 7, 7, 7, 4, 9, 8, 4, 4, 4, 3, 7, 5, 8, 5, 9, 1, 7]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 30, 20, 12, 8, 4, 2],
    [0, 0, 0, 500, 250, 100, 50, 20, 10, 5],
    [0, 0, 0, 1000, 500, 250, 150, 100, 50, 20]
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

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinCount;
        this.freeSpinMulti = 0;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    if (isFreeSpinWin(this.view)) {
        this.freeSpinLength += freeSpinCount;
        this.isFreeSpinAdd = true;
    } else {
        this.isFreeSpinAdd = false;
    }

    this.freeSpinMulti++;
    this.winMoney = WinFromView(this.view, player.betPerLine, this.freeSpinMulti);
    this.winLines = WinLinesFromView(this.view, player.betPerLine, this.freeSpinMulti);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
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
    var freeSpinCacheList = [scatterView];
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin);

    return {
        win: freeSpinData.win + scatterWin,
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
    var view = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
            if (isScatter(view[viewPos])) {
                view[viewPos] = Util.random(3, 12);
            }
        }
    }

    var reelNoArr = [0, 2, 4];

    for (var i = 0; i < reelNoArr.length; i++) {
        var height = Util.random(0, 3);
        var pos = height * slotWidth + reelNoArr[i];
        view[pos] = scatter;
    }

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var view = [], win = 0;
        var freeSpinIndex = 1,
            freeSpinLength = freeSpinCount,
            freeSpinMulti = 0,
            freeSpinWinMoney = 0,
            freeSpinCacheList = [];
        var freeSpinData = {};
        while (true) {
            view = RandomView(freeReels);

            if (isFreeSpinWin(view)) {
                if (freeSpinLength < 60) {
                    freeSpinLength += freeSpinCount;
                } else {
                    continue;
                }
            }

            freeSpinMulti++;
            win = WinFromView(view, bpl, freeSpinMulti);

            freeSpinCacheList.push(view);
            freeSpinWinMoney += win;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        freeSpinData = {
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

var WinFromView = function (view, bpl, wMulti = 1) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl, wMulti);
        money += linePay;
    }

    money += ScatterWinFromView(view, bpl * 10);

    return money;
};

var WinFromLine = function (lineSymbols, bpl, wMulti) {
    //                     
    var matchCount = 0;

    //                   
    var symbol = lineSymbols[0];

    //                                 
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) {
            if (matchCount >= 3) {
                //                                              -1   ,     lineSymbols                        . 
                for (var j = i; j < lineSymbols.length; j++) {
                    lineSymbols[j] = -1;
                }
                break;
            } else {
                symbol = lineSymbols[i];
                matchCount = 0;
                for (var j = 0; j < i; j++) {
                    lineSymbols[j] = -1;
                }
            }
        }
        matchCount++;
    }

    var winPay = payTable[matchCount][symbol] * bpl * wMulti;

    return winPay;
};

var WinLinesFromView = function (view, bpl, wMulti = 1) {
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