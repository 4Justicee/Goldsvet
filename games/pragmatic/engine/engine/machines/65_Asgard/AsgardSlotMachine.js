var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];
    //                           
    this.spinType = 0; // 0:       , 1:       , 2:             , 3:       , 4:          
    this.maskView = []; //                  
    this.mystery = 0; //                    
    this.randomWildPosition = []; //                                               
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 5;
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
var baseReels = [ //              
    [11, 10, 7, 9, 4, 5, 11, 10, 6, 4, 8, 7, 5, 3, 8, 9, 2, 2, 10, 6],
    [3, 8, 6, 9, 7, 4, 8, 10, 1, 9, 4, 11, 5, 10, 6, 11, 2, 2, 7, 5],
    [4, 9, 11, 5, 6, 8, 1, 9, 11, 5, 10, 7, 4, 8, 6, 3, 2, 2, 7, 10],
    [10, 3, 11, 5, 9, 6, 5, 10, 1, 8, 3, 7, 9, 4, 8, 7, 2, 2, 6, 11],
    [3, 9, 6, 10, 7, 4, 8, 5, 11, 3, 8, 4, 9, 5, 11, 7, 2, 2, 10, 6]
];
var freeReels1 = [ //                 
    [5, 4, 13, 17, 6, 4, 3, 5, 4, 16, 3, 5, 6, 15, 14, 4, 6, 5, 3, 6],
    [6, 3, 14, 13, 5, 3, 4, 15, 17, 6, 4, 3, 6, 5, 16, 13, 5, 6, 4, 5],
    [3, 4, 6, 17, 4, 5, 3, 15, 13, 3, 6, 4, 5, 3, 6, 5, 14, 16, 5, 6],
    [15, 16, 5, 4, 6, 5, 3, 6, 14, 13, 6, 4, 5, 3, 6, 4, 13, 17, 3, 4],
    [3, 6, 5, 4, 6, 4, 5, 16, 15, 4, 3, 6, 4, 14, 17, 3, 5, 6, 13, 5]
];
var freeReels2 = [ //                    
    [5, 2, 9, 8, 4, 12, 12, 12, 11, 6, 12, 12, 12, 3, 8, 12, 12, 12, 10, 7],
    [12, 12, 12, 5, 4, 6, 12, 12, 12, 7, 2, 11, 3, 5, 12, 12, 12, 10, 8, 9],
    [11, 12, 12, 12, 4, 5, 9, 12, 12, 12, 3, 10, 5, 12, 12, 12, 7, 6, 2, 8],
    [8, 11, 12, 12, 12, 10, 9, 2, 5, 10, 6, 12, 12, 12, 7, 3, 12, 12, 12, 4],
    [3, 2, 10, 4, 12, 12, 12, 7, 5, 11, 9, 12, 12, 12, 6, 8, 12, 12, 12, 5]
];
var freeReels3 = [ //                 
    [8, 4, 5, 9, 2, 8, 10, 3, 11, 7, 6, 8, 4, 10, 7, 6, 5, 11, 2, 9],
    [6, 4, 10, 5, 2, 9, 7, 10, 11, 6, 8, 3, 5, 7, 9, 8, 5, 2, 11, 4],
    [9, 4, 5, 10, 7, 4, 9, 2, 3, 10, 11, 6, 8, 6, 8, 9, 5, 11, 7, 2],
    [8, 7, 4, 10, 6, 2, 11, 9, 5, 4, 10, 3, 7, 10, 5, 9, 11, 3, 8, 6],
    [3, 7, 8, 6, 9, 5, 4, 10, 5, 8, 3, 11, 6, 5, 10, 2, 11, 4, 7, 9]
];
var freeReels4 = [ //                    
    [8, 4, 11, 9, 5, 7, 10, 3, 9, 4, 7, 11, 6, 8, 9, 3, 6, 8, 10, 5],
    [10, 9, 6, 5, 10, 8, 4, 11, 3, 7, 11, 3, 10, 9, 4, 11, 6, 8, 7, 5],
    [9, 4, 9, 3, 7, 8, 5, 10, 11, 6, 3, 11, 9, 4, 10, 5, 7, 8, 6, 7],
    [8, 3, 7, 11, 5, 3, 9, 4, 8, 10, 3, 6, 9, 4, 11, 10, 6, 5, 7, 11],
    [3, 4, 8, 6, 5, 7, 9, 4, 9, 11, 6, 10, 5, 11, 4, 7, 8, 3, 10, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 15, 15, 15, 15, 10, 10, 10, 5, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 75, 60, 50, 40, 20, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0],
    [0, 0, 500, 250, 200, 150, 100, 50, 50, 50, 50, 50, 0, 0, 0, 0, 0, 0]
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
    [5, 1, 7, 13, 9], // 11
    [0, 6, 7, 8, 4], // 12
    [10, 6, 7, 8, 14], // 13
    [0, 6, 2, 8, 4], // 14
    [10, 6, 12, 8, 14], // 15
    [5, 6, 2, 8, 9], // 16
    [5, 6, 12, 8, 9], // 17
    [0, 1, 12, 3, 4], // 18
    [10, 11, 2, 13, 14], // 19
    [0, 11, 12, 13, 4], // 20
    [10, 1, 2, 3, 14], // 21
    [5, 11, 2, 13, 9], // 22
    [5, 1, 12, 3, 9], // 23
    [0, 11, 2, 13, 4], // 24
    [10, 1, 12, 3, 14], // 25
];
var percentList = {
    characterAppearPercent: 20, //                                             
};

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

    var cache = {};

    if (viewCache.type == "BASE") {
        cache = viewCache.view;
        this.spinType = cache.spinType;
        this.view = cache.view;
        this.maskView = cache.maskView;
        this.mystery = cache.mystery;
        this.randomWildPosition = cache.randomWildPosition;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        cache = this.freeSpinCacheList[0];
        this.spinType = cache.spinType;
        this.view = cache.view;
        this.maskView = cache.maskView;
        this.mystery = cache.mystery;
        this.randomWildPosition = cache.randomWildPosition;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine, this.spinType);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = GetVirtualReels(this.spinType);

    if (isFreeSpinWin(this.view)) { //                          
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.maskView = cache.maskView;
    this.mystery = cache.mystery;
    this.randomWildPosition = cache.randomWildPosition;

    this.winMoney = WinFromView(this.view, player.betPerLine, this.spinType);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = GetVirtualReels(this.spinType);

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    this.winMoney = 0;
    this.spinType = this.freeSpinCacheList[1].spinType;
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var cache;

    if (baseWin > 0) {
        cache = RandomWinView(baseReels, bpl, baseWin);
    } else {
        cache = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: cache,
        win: cache.win,
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
    var freeViewCacheList = []
    var scatterCache = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = WinFromView(scatterCache.view, bpl, scatterCache.spinType);
    var freeViewCache = RandomFreeViewCache(freeReels1, bpl, fsWin, this.freeSpinLength)
    freeViewCacheList.push(scatterCache);

    var pattern = {
        win: scatterWinMoney + freeViewCache.win,
        view: freeViewCacheList.concat(freeViewCache.view),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    }

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var view, win, spinType, maskView, mystery, randomWildPosition;

    var calcCount = 0, bottomLimit = 0;
    while (true) {
        spinType = RandomSpinType();

        var result = GetRandomView(spinType);
        view = result.resultView;
        maskView = result.maskView;
        mystery = result.mystery;
        randomWildPosition = result.randomWildPosition;

        if (isFreeSpinWin(view)) {
            continue;
        }

        win = WinFromView(view, bpl, spinType);
        if (win > bottomLimit && win <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            console.log("[vs25asgard] RandomWinView       bottomLimit = -1       ");
            return RandomZeroView(reels, bpl);
        }
    }

    return {
        spinType: spinType,
        view: view,
        maskView: maskView,
        mystery: mystery,
        randomWildPosition: randomWildPosition,
        win: win
    };
};

var RandomZeroView = function (reels, bpl) {
    var view, win, spinType, maskView, mystery, randomWildPosition;

    while (true) {
        spinType = RandomSpinType();

        var result = GetRandomView(spinType);
        view = result.resultView;
        maskView = result.maskView;
        mystery = result.mystery;
        randomWildPosition = result.randomWildPosition;

        if (isFreeSpinWin(view)) {
            continue;
        }

        win = WinFromView(view, bpl, spinType);
        if (win == 0) {
            break;
        }
    }

    return {
        spinType: spinType,
        view: view,
        maskView: maskView,
        mystery: mystery,
        randomWildPosition: randomWildPosition,
        win: 0
    };
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

var RandomScatterView = function (reels, bpl) {
    var view, spinType, maskView, mystery, randomWildPosition;

    while (true) {
        spinType = RandomSpinType();

        var result = GetRandomView(spinType);
        view = result.resultView;
        maskView = result.maskView;
        mystery = result.mystery;
        randomWildPosition = result.randomWildPosition;

        if (isFreeSpinWin(view)) {
            break;
        }
    }

    var cache = {
        spinType: spinType,
        view: view,
        maskView: maskView,
        mystery: mystery,
        randomWildPosition: randomWildPosition
    };

    return cache;
}

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var view, win, spinType, maskView, mystery, randomWildPosition;

        var freeSpinIndex = 1,
            freeSpinWinMoney = 0,
            freeSpinLength = fsLen,
            freeSpinCacheList = [];

        spinType = Util.random(1, 5); //                                   

        while (true) {
            var result = GetRandomView(spinType);
            view = result.resultView;
            maskView = result.maskView;
            mystery = result.mystery;
            randomWildPosition = result.randomWildPosition;

            if (isFreeSpinWin(view)) {
                continue;
            }

            win = WinFromView(view, bpl, spinType);

            cache = {
                spinType: spinType,
                view: view,
                maskView: maskView,
                mystery: mystery,
                randomWildPosition: randomWildPosition
            };

            freeSpinCacheList.push(cache);
            freeSpinWinMoney += win;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
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
};

var GetRandomView = function (spinType) {
    var maskView = [];
    var resultView = [];
    var mystery = 0;
    var randomWildPosition = [];

    switch (spinType) {
        case 1:
            maskView = RandomView(freeReels1);
            for (var i = 0; i < maskView.length; i++) {
                if (maskView[i] > 12) { //              (13, 14, 15, 16, 17)                    (2)          
                    resultView[i] = wild;
                } else {
                    resultView[i] = maskView[i];
                }
            }
            break;
        case 2:
            maskView = RandomView(freeReels2);
            mystery = Util.random(2, 12);
            for (var i = 0; i < maskView.length; i++) {
                if (maskView[i] == 12) { //                              
                    resultView[i] = mystery;
                } else {
                    resultView[i] = maskView[i];
                }
            }
            break;
        case 3:
            maskView = RandomView(freeReels3);
            var randomStackCount = Util.random(1, 4); //                            - 1, 2, 3
            var randomStackArray = Util.shuffle([0, 1, 2, 3, 4]);
            for (var i = 0; i < randomStackCount; i++) {
                for (var j = 0; j < 3; j++) {
                    randomWildPosition.push(randomStackArray[i] + 5 * j);
                }
            }
            for (var i = 0; i < maskView.length; i++) {
                if (randomWildPosition.indexOf(i) >= 0) { //                           
                    resultView[i] = wild;
                } else {
                    resultView[i] = maskView[i];
                }
            }
            break;
        case 4:
            maskView = RandomView(freeReels4);
            var randomRainingCount = Util.random(3, 6); //                                            - 3, 4, 5
            var randomRainingArray = Util.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
            for (var i = 0; i < randomRainingCount; i++) {
                randomWildPosition.push(randomRainingArray[i]);
            }
            for (var i = 0; i < maskView.length; i++) {
                if (randomWildPosition.indexOf(i) >= 0) { //                           
                    resultView[i] = wild;
                } else {
                    resultView[i] = maskView[i];
                }
            }
            break;
        default:
            maskView = RandomView(baseReels);
            resultView = maskView;
            break;
    }

    var result = {
        maskView: maskView,
        resultView: resultView,
        mystery: mystery,
        randomWildPosition: randomWildPosition,
    };

    return result;
};

var RandomSpinType = function () {
    if (Util.probability(percentList.characterAppearPercent)) {
        return Util.random(1, 5);
    } else {
        return 0;
    }
};

var GetVirtualReels = function (spinType) {
    var reels = baseReels;
    if (spinType == 1) {
        reels = freeReels1;
    } else if (spinType == 2) {
        reels = freeReels2;
    } else if (spinType == 3) {
        reels = freeReels3;
    } else if (spinType == 4) {
        reels = freeReels4;
    }

    var virtualReels = {
        above: RandomLineFromReels(reels),
        below: RandomLineFromReels(reels)
    };

    return virtualReels;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl, spinType = 0) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    money += ScatterWinFromView(view, bpl * 25);

    if (money == 0 && spinType > 0) { //                                              0                                
        money = bpl * 25;
    }

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