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
    this.scatterPosition = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 15;
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
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [9, 4, 6, 8, 10, 8, 13, 7, 13, 9, 12, 6, 10, 12, 13, 9, 3, 5, 5, 12, 11, 2, 7, 10, 1, 11, 11],
    [2, 11, 8, 2, 12, 11, 7, 8, 5, 6, 7, 12, 4, 1, 5, 6, 10, 12, 10, 9, 13, 3, 6, 9, 9, 11, 10],
    [7, 10, 5, 9, 2, 13, 8, 4, 4, 11, 6, 10, 11, 10, 7, 13, 12, 13, 3, 12, 6, 3, 12, 9, 7, 11, 1, 8, 5],
    [1, 12, 8, 11, 13, 12, 9, 9, 13, 10, 3, 11, 11, 13, 5, 10, 9, 10, 8, 6, 12, 8, 2, 12, 4, 13, 7, 5],
    [9, 1, 8, 12, 11, 13, 11, 12, 3, 10, 8, 2, 8, 13, 7, 10, 10, 4, 9, 6, 5, 10, 11, 4, 9, 13, 12, 11, 9, 6, 8, 13, 5, 12, 7]
];
var freeReels = [
    [6, 10, 9, 11, 12, 1, 9, 12, 12, 2, 7, 10, 6, 5, 11, 5, 2, 4, 8, 7, 13, 13, 9, 8, 11, 13, 10, 3],
    [2, 5, 12, 10, 13, 7, 12, 8, 10, 12, 10, 9, 7, 1, 4, 5, 9, 6, 11, 11, 2, 3, 6, 2, 8, 11],
    [3, 4, 11, 2, 7, 6, 5, 13, 10, 6, 12, 11, 9, 7, 9, 13, 3, 8, 13, 10, 12, 12, 5, 10, 1, 8, 11, 4],
    [11, 8, 2, 11, 8, 10, 3, 12, 10, 1, 5, 13, 4, 12, 8, 13, 11, 9, 13, 9, 12, 12, 5, 7, 10, 9, 6, 13],
    [8, 9, 13, 6, 12, 2, 5, 1, 10, 12, 9, 12, 3, 13, 11, 7, 8, 8, 10, 10, 11, 4, 9, 11, 8, 5, 13, 11, 10, 13, 4, 6, 7, 12, 9]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 10, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 250, 25, 25, 20, 15, 15, 10, 10, 5, 5, 5, 5],
    [0, 0, 2500, 125, 125, 100, 75, 75, 50, 50, 25, 25, 25, 25],
    [0, 0, 9000, 750, 750, 400, 250, 250, 125, 125, 100, 100, 100, 100]
];
var payLines = [
    [5, 6, 7, 8, 9],  // 1
    [0, 1, 2, 3, 4],  // 2
    [10, 11, 12, 13, 14],  // 3
    [0, 6, 12, 8, 4],  // 4
    [10, 6, 2, 8, 14],  // 5
    [5, 1, 2, 3, 9],  // 6
    [5, 11, 12, 13, 9],  // 7
    [0, 1, 7, 13, 14],  // 8
    [10, 11, 7, 3, 4],  // 9
    [5, 11, 7, 3, 9],  // 10
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
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];
    this.winMoney = WinFromView(this.view, player.betPerLine) * 3;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
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
    let view, win;

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
    let newJpType = jpType;
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
    var freeSpinCacheList = [];
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var freeCache = RandomFreeViewCache(freeReels, bpl, fsWin, this.freeSpinLength, isCall);

    freeSpinCacheList.push(scatterView);

    return {
        win: scatterWinMoney + freeCache.win,
        view: freeSpinCacheList.concat(freeCache.view),
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

    for (let i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (let j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            resultView[viewPos] = reels[i][reelPos];
        }
    }

    return resultView;
};

var RandomScatterView = function (reels) {
    var view = [];

    while (true) {
        view = RandomView(reels);
        if (isFreeSpinWin(view)) {
            break;
        }
    }

    return view
}

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, isCall) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var view, win;
        var freeSpinIndex = 1,
            freeSpinWinMoney = 0,
            freeSpinCacheList = [];

        while (true) {
            view = RandomView(reels);

            if (isFreeSpinWin(view)) {
                continue;
            }

            win = WinFromView(view, bpl) * 3;

            freeSpinCacheList.push(view);
            freeSpinWinMoney += win;
            freeSpinIndex++;

            if (freeSpinIndex > fsLen) {
                break;
            }
        }

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
        }

        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
        }
    }

    return lowerView ? lowerView : upperView;
}

var RandomLineFromReels = function (reels) {
    var result = [];

    for (let i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl) {
    let money = 0;

    for (let lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        let lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    money += ScatterWinFromView(view, bpl * 10);

    return money;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    let matchCount = 0;

    //                                              
    let symbol = wild;

    //                                                                  
    let wildPosInLine = [0, 0, 0, 0, 0];
    //                                                            
    let winLineHasWild = false;


    //                   
    for (let i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    //                                                   
    for (let i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
            wildPosInLine[i] = 1;
        }
    }

    //                                
    for (let i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        if (wildPosInLine[i] == 1) winLineHasWild = true;
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        . 
    for (let i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;

    if (winLineHasWild) return winPay * 2; //                                                                                  2             

    return winPay;
};

var WinLinesFromView = function (view, bpl) {
    let winLines = [];

    for (let lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        let lineSymbols = Util.symbolsFromLine(view, line);
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
    let result = 0;
    for (let i = 0; i < view.length; i++) {
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
    let win = 0;
    var nScatters = NumberOfScatters(view);
    if (nScatters == 5) {
        win = bet * 500;
    } else if (nScatters == 4) {
        win = bet * 20;
    } else if (nScatters == 3) {
        win = bet * 5;
    } else if (nScatters == 2) {
        win = bet * 2;
    }

    return win;
};

var ScatterPositions = function (view) {
    let result = [];
    for (let i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
};

module.exports = SlotMachine;