var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
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
    this.multiPositions = [];
    this.multiValues = [];
    this.lineMultiIndex = [];
    this.lineMultiValues = [];
    //                           
    this.freeSpinType = -1;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCountArr = [];
    this.freeSpinWildArr = [];
    this.freeSpinSticky = "";

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.buyMulti = 100;
    this.buyPatternCount = 30;
    this.doubleMulti = 0.4;

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, wild2X = 14, wild3X = 15, wild5X = 16;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [8, 7, 12, 9, 3, 5, 6, 10, 13, 11, 4, 2, 1, 6, 11, 9, 1, 9, 3, 9, 7, 9, 4, 5, 6, 1, 9, 4, 13, 6, 12, 7, 13, 4, 11, 7, 5, 9, 7, 5, 13, 4, 9, 13, 4, 9, 12, 4, 12, 11, 6, 7, 1, 7, 6, 12, 11, 9, 12, 3, 11, 4, 7, 9],
    [3, 13, 8, 7, 6, 2, 10, 9, 11, 5, 4, 12, 9, 6, 9],
    [1, 3, 13, 12, 2, 11, 7, 10, 9, 5, 4, 6, 8, 13, 8, 6, 5, 8, 5, 6, 8, 13, 10, 5, 10, 13, 6, 10, 7, 10, 8, 5, 13, 2, 5, 10, 3, 10, 8, 7, 13, 2, 7, 8, 11, 10, 5, 10, 12, 5],
    [6, 3, 12, 7, 13, 9, 11, 5, 8, 2, 4, 10, 12, 8, 12, 8, 13, 4, 8, 11, 4, 9, 12, 4, 12],
    [10, 5, 12, 9, 6, 7, 1, 2, 8, 11, 13, 3, 4, 11, 1, 11, 7, 1, 11, 5, 11, 7, 4, 1, 7, 11, 8, 11, 6, 7, 8, 11, 1, 6, 7, 9, 6, 13, 6, 7, 1, 5, 11, 7, 11, 1, 9, 12, 11, 8, 9, 13, 3, 13, 11, 7, 5, 7, 11, 1, 9, 8]
];
var freeReels = [
    [3, 3, 3, 8, 3, 13, 2, 6, 12, 11, 5, 7, 9, 4, 10, 13, 10, 5, 8, 12, 7, 12, 9, 4, 13, 11, 9, 2, 11, 13, 9, 11, 4, 12, 7, 13, 5, 9, 11, 7, 13, 8, 12, 4, 11],
    [11, 13, 7, 8, 3, 12, 9, 5, 6, 4, 10, 5, 10, 7, 10, 4, 3, 2, 10, 8, 10, 4, 12, 10, 12, 9, 10, 12, 5, 10, 4, 2, 10, 4, 3, 13, 10, 7, 10],
    [5, 8, 9, 2, 3, 12, 6, 13, 4, 10, 7, 11, 8, 12, 6, 7, 6, 11, 12],
    [8, 9, 12, 11, 3, 13, 10, 6, 7, 5, 4, 2, 3, 7, 5, 3, 9, 3, 4, 5, 3, 13, 6, 9, 3, 4, 5, 6, 9, 5, 2, 13, 9, 7],
    [12, 6, 13, 8, 2, 5, 3, 7, 10, 3, 3, 3, 9, 11, 4, 8, 4, 3, 8, 13, 3, 4, 11, 13, 3, 13, 11, 5, 13, 5, 11, 10, 3, 10, 7, 2, 8, 6, 5, 11, 3, 5, 11, 5, 3, 5, 8, 5, 3, 13, 7, 5, 6, 11, 10, 5, 3, 4, 13, 2, 11, 4, 8, 7, 10]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 50, 50, 35, 25, 20, 12, 8, 5, 5, 2, 2, 2, 0, 0, 0],
    [0, 0, 250, 150, 100, 60, 40, 25, 20, 10, 10, 5, 5, 5, 0, 0, 0],
    [0, 0, 1000, 750, 500, 300, 200, 150, 100, 50, 50, 25, 25, 25, 0, 0, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],      // 1
    [0, 1, 2, 3, 4],      // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4],     // 4
    [10, 6, 2, 8, 14],    // 5
    [5, 1, 2, 3, 9],      // 6
    [5, 11, 12, 13, 9],   // 7
    [0, 1, 7, 13, 14],    // 8
    [10, 11, 7, 3, 4],    // 9
    [5, 11, 7, 3, 9],     // 10
    [5, 1, 7, 13, 9],     // 11
    [0, 6, 7, 8, 4],      // 12
    [10, 6, 7, 8, 14],    // 13
    [0, 6, 2, 8, 4],      // 14
    [10, 6, 12, 8, 14],   // 15
    [5, 6, 2, 8, 9],      // 16
    [5, 6, 12, 8, 9],     // 17
    [0, 1, 12, 3, 4],     // 18
    [10, 11, 2, 13, 14],  // 19
    [0, 11, 12, 13, 4],   // 20
    [10, 1, 2, 3, 14],    // 21
    [5, 11, 2, 13, 9],    // 22
    [5, 1, 12, 3, 9],     // 23
    [0, 11, 2, 13, 4],    // 24
    [10, 1, 12, 3, 14],   // 25
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

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
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinCountArr = cache.countArray;
        this.freeSpinLength = cache.length;
        this.view = this.freeSpinCacheList[0];
    }

    var view = this.view;
    this.view = view;

    var multi = GetWildMultisFromView(this.view);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    this.winMoney = WinFromView(view, player.betPerLine);
    this.winLines = WinLinesFromView(view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.scatterPositions = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
        this.freeSpinSticky = "";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.freeSpinSticky = cache.stickys.join('~');
    this.maskView = cache.maskView;

    var multi = GetWildMultisFromView(this.view);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    var lineMulti = GetLineMultisFromWinLines(this.view, this.winLines);
    this.lineMultiIndex = lineMulti.lineMultiIndex;
    this.lineMultiValues = lineMulti.lineMultiValues;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";

        var stickys = [];
        for (var i = 0; i < this.multiPositions.length; i++) {
            stickys.push(`${this.multiPositions[i]},-1`);
        }
        this.freeSpinSticky = stickys.join(`~`);
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

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
            break;
        case "BONUS":
            //return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
            break;
        default:
            break;
    }

    var result = {
        error: 1,
        msg: "Jackpot Type Error",
    };
    return result;
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);

    //                           
    var fsLenInfo = RandomFreeSpinCounts();
    var freeSpinData = {
        length: fsLenInfo.total,
        countArray: fsLenInfo.arr,
        viewList: []
    }

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0
    }
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);

    //                           
    var fsLenInfo = RandomFreeSpinCounts();
    var freeSpinData = {
        length: fsLenInfo.total,
        countArray: fsLenInfo.arr,
        viewList: []
    }

    //                           
    var cache = BuyBonusViewCache(freeReels, bpl, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0
    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0, calcCount = 0;

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
    return tmpView;
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

        for (var i = 0; i < view.length; i++) {
            if (isWild(view[i])) {
                var multiSymbol;
                if (Util.probability(60)) {
                    multiSymbol = wild2X;
                } else if (Util.probability(30)) {
                    multiSymbol = wild3X;
                } else {
                    multiSymbol = wild5X;
                }
                view[i] = multiSymbol;
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

        for (var i = 0; i < view.length; i++) {
            if (isWild(view[i])) {
                var multiSymbol;
                if (Util.probability(60)) {
                    multiSymbol = wild2X;
                } else if (Util.probability(30)) {
                    multiSymbol = wild3X;
                } else {
                    multiSymbol = wild5X;
                }
                view[i] = multiSymbol;
            }
        }

        if (isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

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
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen);

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

var BuyBonusViewCache = function (reels, bpl, fsLen) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    freeSpinData.viewList = [];
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;
    var wildMultiPositions = [];
    var wildMultiValues = [];

    while (true) {
        //                 
        var fsview;
        while (true) {
            fsview = RandomView(reels);
            //                                                                                             
            var win = WinFromView(fsview, bpl);
            if (Util.probability(30) || win == 0) {
                break;
            }
        }

        fsview = GetWildMoveView(fsview, wildMultiPositions, wildMultiValues);
        var maskView = GetMaskView(fsview, wildMultiPositions);

        var multi = GetNewWildMultisFromView(fsview);
        wildMultiPositions = multi.positions;
        wildMultiValues = multi.values;
        wildStickys = multi.stickys;

        var cache = {
            view: fsview,
            maskView: maskView,
            stickys: wildStickys
        }

        freeSpinData.viewList.push(cache);
        var winMoney = WinFromView(fsview, bpl);

        freeSpinWinMoney += winMoney;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            freeSpinData.win = freeSpinWinMoney;
            break;
        }
    }
    return freeSpinData;
};

var GetLineMultisFromWinLines = function (view, winLines) {
    var lineMultiIndex = [], lineMultiValues = [];
    for (var i = 0; i < winLines.length; i++) {
        var winLine = winLines[i].split('~');
        var lineMulti = 0;
        for (var j = 2; j < winLine.length; j++) {
            lineMulti += GetWildMulti(view[winLine[j]]);
        }
        if (lineMulti > 0) {
            lineMultiIndex.push(winLine[0]);
            lineMultiValues.push(lineMulti);
        }
    }
    return {
        lineMultiIndex: lineMultiIndex,
        lineMultiValues: lineMultiValues
    }
};

var GetMaskView = function (view, wildMultiPositions) {
    var maskView = Util.clone(view);
    if (wildMultiPositions.length == 0) {
        return [];
    }
    for (var i = 0; i < maskView.length; i++) {
        if (isWildMulti(view[i])) {
            if (wildMultiPositions.includes(i)) {
                maskView[i] = Util.random(3, 13);
            }
        }
    }

    return maskView;
};

var RandomFreeSpinCounts = function () {
    var length = 3 * 3;
    var freeSpinCountArr = [];

    var totalCount = Util.random(9, 17);

    var leftIndexs = [];
    for (var i = 0; i < length; i++) {
        freeSpinCountArr[i] = 1;
        leftIndexs[i] = i;
        totalCount--;
    }

    while (totalCount > 0) {
        var randomIndex = Util.random(0, leftIndexs.length);
        var index = leftIndexs[randomIndex];
        //                
        if (freeSpinCountArr[index] == 3) {
            leftIndexs = Util.remove(leftIndexs, randomIndex);
            continue;
        }
        freeSpinCountArr[index]++;
        totalCount--;
    }

    var total = 0;
    for (var i = 0; i < freeSpinCountArr.length; i++) {
        total += freeSpinCountArr[i];
    }

    return {
        arr: freeSpinCountArr,
        total: total
    };
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
    //                     
    var matchCount = 0;
    //                                              
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWildMulti(lineSymbols[i])) //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }


    //                                                                                                  
    var lineMulti = 0;
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWildMulti(lineSymbols[i])) {
            lineMulti += GetWildMulti(lineSymbols[i]);
            lineSymbols[i] = symbol;
        }
    }

    if (lineMulti == 0) {
        lineMulti = 1;
    }

    //                                 
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    //                                              -1   ,     lineSymbols    WinLines             
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl * lineMulti;
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isWildMulti = function (symbol) {
    return symbol == wild2X || symbol == wild3X || symbol == wild5X;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) == 3;
};

var isWildView = function (view) {
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            return true;
        }
        if (isWildMulti(view[i])) {
            return true;
        }
    }
    return false;
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

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var ScatterWinFromView = function (view, totalBet) {
    var win = 0;
    if (isFreeSpinWin(view)) {
        win = totalBet * 3;
    }
    return win;
};

var GetWildMultisFromView = function (multiView) {
    var multiPositions = [],
        multiValues = [];
    for (var i = 0; i < multiView.length; i++) {
        var symbol = multiView[i];
        if (isWildMulti(symbol)) {
            multiPositions.push(i);
            var multi = GetWildMulti(symbol);
            multiValues.push(multi);
        }
    }

    return {
        positions: multiPositions,
        values: multiValues
    };
};

var GetNewWildMultisFromView = function (multiView) {
    var multiPositions = [],
        multiValues = [];
    for (var i = 0; i < multiView.length; i++) {
        var symbol = multiView[i];
        if (isWildMulti(symbol)) {
            multiPositions.push(i);
            var multi = GetWildMulti(symbol);
            multiValues.push(multi);
        }
    }

    var newWildMultiPositions = [];
    for (var i = 0; i < multiPositions.length; i++) {
        var wildPos;
        while (true) {
            wildPos = Util.random(0, slotHeight * slotWidth)
            if (newWildMultiPositions.indexOf(wildPos) < 0) {
                break;
            }
        }
        newWildMultiPositions.push(wildPos);
    }

    var stickys = [];
    for (var i = 0; i < newWildMultiPositions.length; i++) {
        stickys.push(`${multiPositions[i]},${newWildMultiPositions[i]}`);
    }

    return {
        stickys: stickys,
        positions: newWildMultiPositions,
        values: multiValues
    };
};

var GetWildMulti = function (symbol) {
    switch (symbol) {
        case wild2X:
            return 2;
        case wild3X:
            return 3;
        case wild5X:
            return 5;
    }
    return 0;
};

var GetWildMoveView = function (view, wildMultiPositions, wildMultiValues) {
    var resultView = Util.clone(view);
    for (var i = 0; i < wildMultiPositions.length; i++) {
        var pos = wildMultiPositions[i];
        if (wildMultiValues[i] == 2) {
            resultView[pos] = wild2X;
        } else if (wildMultiValues[i] == 3) {
            resultView[pos] = wild3X;
        } else {
            resultView[pos] = wild5X;
        }
    }

    return resultView;
};

module.exports = SlotMachine;