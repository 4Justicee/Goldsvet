var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    tMoney = 0;
    tLines = [];
    //                           
    this.freeSpinType = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                           
    this.mysterySymbol = 0;
    this.newView = [];
    //                               
    this.wildMulti = 1;
    this.wildMultiSet = [];
    this.wildPositions = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1;
var wild = 2;
var mystery = 14;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [6, 4, 14, 14, 14, 14, 4, 12, 10, 11, 6, 14, 14, 14, 14, 12, 13, 9, 5, 7, 5, 9, 7, 3, 8, 1, 3, 11],
    [5, 11, 10, 10, 3, 7, 9, 14, 14, 14, 14, 14, 6, 12, 4, 11, 14, 14, 14, 14, 4, 3, 2, 2, 6, 12, 8, 9, 8, 1, 13],
    [14, 14, 14, 14, 14, 14, 14, 8, 1, 7, 5, 13, 11, 10, 14, 14, 14, 14, 9, 10, 1, 12, 5, 6, 2, 2, 4, 3, 6, 12, 9, 8],
    [7, 12, 4, 4, 1, 9, 10, 2, 2, 7, 14, 14, 14, 14, 14, 14, 14, 5, 2, 2, 11, 6, 6, 8, 14, 14, 14, 14, 14, 11, 5, 3, 13],
    [11, 9, 1, 10, 6, 7, 13, 14, 14, 14, 14, 14, 14, 6, 8, 4, 3, 7, 5, 14, 14, 14, 14, 14, 9, 12, 10, 11, 4],
];
var freeReels = [
    [5, 6, 3, 11, 7, 13, 11, 8, 8, 1, 12, 5, 3, 4, 9, 10, 7, 12, 13, 6, 14, 14, 14, 14, 14, 14, 14, 14, 9],
    [5, 11, 7, 3, 2, 2, 1, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 8, 2, 2, 8, 10, 6, 6, 13, 9, 9, 12, 10, 4],
    [11, 13, 2, 2, 9, 14, 14, 14, 14, 14, 14, 14, 1, 3, 2, 2, 13, 5, 4, 4, 8, 10, 7, 2, 2, 12, 10, 12, 6, 9],
    [5, 6, 11, 4, 13, 3, 6, 3, 2, 2, 12, 10, 14, 14, 14, 14, 14, 14, 9, 1, 2, 2, 12, 5, 4, 8, 8, 7, 2, 2],
    [3, 10, 8, 5, 14, 14, 14, 14, 14, 6, 1, 12, 7, 6, 9, 9, 10, 11, 11, 7, 13, 4, 3],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 15, 10, 10, 10, 10, 5, 5, 5, 5, 0],
    [0, 0, 0, 100, 50, 50, 25, 25, 20, 20, 15, 15, 10, 10, 0],
    [0, 0, 0, 500, 130, 100, 70, 70, 50, 50, 50, 50, 40, 40, 0],
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
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view.view;
        this.mysterySymbol = viewCache.view.mysterySymbol;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0][0].view;
        this.mysterySymbol = this.freeSpinCacheList[0][0].mysterySymbol;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    }

    if (HasWildStack(this.view)) {
        this.wildMulti = 2;
    } else {
        this.wildMulti = 1;
    }

    this.wildPositions = GetWildPositions(this.view);

    if (HasMysteryInView(this.view)) {
        this.newView = GetNewView(this.view, this.mysterySymbol);
        this.winMoney = WinFromView(this.newView, player.betPerLine, this.wildMulti);
        this.winLines = WinLinesFromView(this.newView, player.betPerLine, this.wildMulti);
    } else {
        this.newView = [];
        this.winMoney = WinFromView(this.view, player.betPerLine, this.wildMulti);
        this.winLines = WinLinesFromView(this.view, player.betPerLine, this.wildMulti);
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (isFreeSpinWin(this.view)) {
        //                          
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpinOption = async function (player, select) {
    this.freeSpinType = Number(select);

    this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
    this.freeSpinLength = this.freeSpinCacheList[0].freeSpinLength;
    this.wildMultiSet = this.freeSpinCacheList[0].wildMultiSet;
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;
    this.wildMulti = this.freeSpinCacheList[this.freeSpinIndex].wildMulti;
    this.mysterySymbol = this.freeSpinCacheList[this.freeSpinIndex].mysterySymbol;

    this.wildPositions = GetWildPositions(this.view);

    if (HasMysteryInView(this.view)) {
        this.newView = GetNewView(this.view, this.mysterySymbol);
        this.winMoney = WinFromView(this.newView, player.betPerLine, this.wildMulti);
        this.winLines = WinLinesFromView(this.newView, player.betPerLine, this.wildMulti);
    } else {
        this.newView = [];
        this.winMoney = WinFromView(this.view, player.betPerLine, this.wildMulti);
        this.winLines = WinLinesFromView(this.view, player.betPerLine, this.wildMulti);
    }

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var result;

    if (baseWin > 0) {
        result = RandomWinView(baseReels, bpl, baseWin);
    } else {
        result = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: result.cache,
        win: result.win,
        moneyList: [],
        type: "BASE",
        bpl: bpl,
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
    // FS                
    var viewList = [];
    var moneyList = [];

    var scatterView = RandomScatterView(baseReels);
    var mysterySymbol = Util.random(3, 14);
    var scatterWinMoney, wildMulti, newView;

    if (HasWildStack(scatterView)) {
        wildMulti = 2;
    } else {
        wildMulti = 1;
    }

    if (HasMysteryInView(scatterView)) {
        newView = GetNewView(scatterView, mysterySymbol);
        scatterWinMoney = WinFromView(newView, wildMulti);
    } else {
        newView = [];
        scatterWinMoney = WinFromView(scatterView, wildMulti);
    }

    var lengthArray = [5, 8, 15, 20];

    var wildMultiSetArray = [
        [8, 10, 15],
        [6, 8, 10],
        [3, 4, 6],
        [2, 3, 4],
    ];

    for (var i = 0; i < 5; i++) {
        var freeSpinLength = 0; //             
        var wildMultiSet = []; //              
        var wildMultiSetIndex = 0;

        //                                                     
        if (i == 4) {
            wildMultiSetIndex = Util.random(0, wildMultiSetArray.length);
            freeSpinLength = lengthArray[Util.random(0, lengthArray.length)];
            wildMultiSet = wildMultiSetArray[wildMultiSetIndex];
        } else {
            wildMultiSetIndex = i;
            freeSpinLength = lengthArray[i];
            wildMultiSet = wildMultiSetArray[i];
        }

        viewList[i] = [];

        var scatterCache = {
            view: scatterView,
            freeSpinLength: freeSpinLength,
            wildMultiSet: wildMultiSet,
            wildMultiSetIndex: wildMultiSetIndex,
            mysterySymbol: mysterySymbol,
        };

        viewList[i] = [scatterCache];

        var result = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinLength, wildMultiSet);
        viewList[i] = viewList[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: viewList,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, wildMulti, newView, viewCache;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);

        var mysterySymbol = Util.random(3, 14);
        viewCache = {
            view: tmpView,
            mysterySymbol: mysterySymbol,
        };

        if (HasWildStack(tmpView)) {
            wildMulti = 2;
        } else {
            wildMulti = 1;
        }

        if (HasMysteryInView(tmpView)) {
            newView = GetNewView(tmpView, mysterySymbol);
            tmpWin = WinFromView(newView, bpl, wildMulti);
        } else {
            newView = [];
            tmpWin = WinFromView(tmpView, bpl, wildMulti);
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return { cache: viewCache, win: tmpWin };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin, wildMulti, newView, viewCache;

    while (true) {
        tmpView = RandomView(reels);

        tmpView = RandomView(reels);

        var mysterySymbol = Util.random(3, 14);
        viewCache = {
            view: tmpView,
            mysterySymbol: mysterySymbol,
        };

        if (HasWildStack(tmpView)) {
            wildMulti = 2;
        } else {
            wildMulti = 1;
        }

        if (HasMysteryInView(tmpView)) {
            newView = GetNewView(tmpView, mysterySymbol);
            tmpWin = WinFromView(newView, bpl, wildMulti);
        } else {
            newView = [];
            tmpWin = WinFromView(tmpView, bpl, wildMulti);
        }

        if (tmpWin == 0) {
            break;
        }
    }
    return { cache: viewCache, win: tmpWin };
};

var RandomView = function (reels) {
    var view = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
            }
        }

        if (!isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels) {
    var view = [];
    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
            }
        }

        if (isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, wildMultiSet) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin;
            var wildMulti, mysterySymbol, newView;

            while (true) {
                fsview = RandomView(reels);
                mysterySymbol = Util.random(3, 14);

                if (HasWildStack(fsview)) {
                    wildMulti = wildMultiSet[Util.random(0, wildMultiSet.length)];
                } else {
                    wildMulti = 1;
                }

                if (HasMysteryInView(fsview)) {
                    newView = GetNewView(fsview, mysterySymbol);
                    fsWin = WinFromView(newView, bpl, wildMulti);
                } else {
                    newView = [];
                    fsWin = WinFromView(fsview, bpl, wildMulti);
                }

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push({
                view: fsview,
                wildMulti: wildMulti,
                mysterySymbol: mysterySymbol,
            });

            freeSpinWinMoney += fsWin;

            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
        }

        if (freeSpinData.win >= minMoney && freeSpinData.win <= maxMoney) {
            return freeSpinData;
        }

        if (freeSpinData.win > lowerLimit && freeSpinData.win < minMoney) {
            lowerLimit = freeSpinData.win;
            lowerView = freeSpinData;
        }
        if (freeSpinData.win > maxMoney && freeSpinData.win < upperLimit) {
            upperLimit = freeSpinData.win;
            upperView = freeSpinData;
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

var WinFromView = function (view, bpl, wMulti = 1) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl, wMulti);
        money += linePay;
    }

    return money;
};

var WinLinesFromView = function (view, bpl, wMulti) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl, wMulti);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line
                    .filter(function (item, index, arr) {
                        return lineSymbols[index] != -1;
                    })
                    .join("~")}`
            );
        }
    }
    return winLines;
};

var WinFromLine = function (lineSymbols, bpl, wMulti) {
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

    var winPay = payTable[matchCount][symbol] * bpl * wMulti;

    return winPay;
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

var isMystery = function (symbol) {
    return symbol == mystery;
};

var HasMysteryInView = function (view) {
    for (var i = 0; i < view.length; i++) {
        if (isMystery(view[i])) {
            return true;
        }
    }
    return false;
};

//                                             
var GetNewView = function (view, newSymbol) {
    var newView = Util.clone(view);

    for (var i = 0; i < newView.length; i++) {
        if (isMystery(newView[i])) {
            newView[i] = newSymbol;
        }
    }

    return newView;
};

//                                                      
var HasWildStack = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        if ((isWild(view[i]) && isWild(view[i + slotWidth])) || (isWild(view[i + slotWidth]) && isWild(view[i + slotWidth * 2]))) {
            return true;
        }
    }
    return false;
};

//                                            
var GetWildPositions = function (view) {
    var positions = [];

    for (var i = 0; i < slotWidth; i++) {
        if (isWild(view[i]) && isWild(view[i + slotWidth])) {
            positions.push(i);
            positions.push(i + slotWidth);
        }
        if (isWild(view[i + slotWidth]) && isWild(view[i + slotWidth * 2])) {
            positions.push(i + slotWidth);
            positions.push(i + slotWidth * 2);
        }
    }

    return positions;
};

module.exports = SlotMachine;