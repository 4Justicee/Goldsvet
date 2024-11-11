var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                    
    this.multiPositions = [];
    this.multiValues = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.scatterOverlays = [];
    this.freeSpinAdd = 0;

    this.buyMulti = 100;
    this.buyPatternCount = 30;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, wild2X = 15, wild3X = 16, wild5X = 17;
var slotWidth = 5;
var slotHeight = 4;
var freeSpinCount = 8;
var baseReels = [
    [7, 11, 12, 11, 1, 12, 8, 12, 6, 8, 4, 7, 11, 10, 5, 11, 12, 11, 9, 9, 3, 8, 10, 13, 5, 8, 12, 9, 12, 1, 13, 11, 13, 6, 10, 8, 10],
    [7, 11, 11, 2, 12, 12, 6, 8, 4, 9, 9, 5, 13, 13, 3, 11, 11, 5, 8, 12, 12, 2, 13, 13, 6, 10, 10],
    [9, 7, 11, 11, 2, 13, 13, 6, 8, 4, 9, 9, 5, 10, 10, 1, 6, 8, 3, 11, 11, 5, 8, 12, 12, 2, 13, 13, 6],
    [7, 10, 10, 2, 12, 12, 6, 8, 11, 11, 4, 9, 9, 5, 6, 7, 3, 11, 11, 5, 6, 12, 12, 7, 13, 13, 6],
    [7, 10, 10, 1, 12, 12, 6, 8, 4, 9, 9, 5, 6, 7, 3, 11, 11, 5, 6, 13, 13, 7, 13, 13, 6, 10, 10],
];
var freeReels = [
    [10, 5, 9, 9, 7, 10, 10, 8, 12, 12, 6, 13, 13, 8, 9, 9, 4, 9, 9, 5, 6, 8, 3, 3, 3, 3, 11, 11],
    [7, 10, 10, 2, 12, 12, 6, 8, 4, 9, 9, 5, 6, 3, 11, 11, 5, 6, 12, 12, 7, 13, 13, 2, 10, 10, 7, 4],
    [7, 10, 10, 2, 12, 12, 6, 8, 4, 9, 9, 5, 6, 3, 11, 11, 5, 6, 12, 12, 8, 13, 13, 2, 10, 10, 7, 4],
    [7, 10, 10, 2, 12, 12, 6, 8, 4, 9, 9, 5, 6, 7, 3, 11, 11, 5, 6, 12, 12, 7, 13, 13, 6, 10, 10, 7],
    [10, 10, 6, 12, 12, 8, 4, 9, 9, 5, 6, 7, 3, 3, 3, 3, 11, 11, 6, 12, 12, 7, 13, 13, 6, 10, 10, 7],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 30, 25, 15, 10, 7, 5, 3, 3, 2, 2, 2, 0],
    [0, 0, 0, 100, 75, 40, 25, 15, 10, 6, 6, 5, 5, 5, 0],
    [0, 0, 0, 400, 250, 150, 100, 75, 50, 30, 30, 20, 20, 20, 0],
];
var payLines = [
    [0, 1, 2, 3, 4], // 1
    [5, 6, 7, 8, 9], // 2
    [10, 11, 12, 13, 14], // 3
    [15, 16, 17, 18, 19], // 4
    [0, 6, 2, 8, 4], // 5
    [5, 1, 7, 3, 9], // 6
    [5, 11, 7, 13, 9], // 7
    [10, 6, 12, 8, 14], // 8
    [10, 16, 12, 18, 14], // 9
    [15, 11, 17, 13, 19], // 10
    [0, 16, 2, 18, 4], // 11
    [15, 1, 17, 2, 19], // 12
    [0, 6, 12, 8, 4], // 13
    [5, 11, 17, 13, 9], // 14
    [10, 6, 2, 8, 14], // 15
    [15, 11, 7, 13, 19], // 16
    [0, 1, 7, 3, 4], // 17
    [5, 6, 12, 8, 9], // 18
    [10, 11, 17, 13, 14], // 19
    [15, 16, 2, 18, 19], // 20
    [15, 16, 12, 18, 19], // 21
    [10, 11, 7, 13, 14], // 22
    [5, 6, 2, 8, 9], // 23
    [0, 1, 17, 3, 4], // 24
    [0, 6, 7, 8, 4], // 25
    [5, 11, 12, 13, 9], // 26
    [10, 16, 17, 18, 14], // 27
    [15, 1, 2, 3, 19], // 28
    [15, 11, 12, 13, 19], // 29
    [10, 6, 7, 8, 14], // 30
    [5, 1, 2, 3, 9], // 31
    [0, 16, 17, 18, 4], // 32
    [5, 16, 7, 18, 9], // 33
    [0, 11, 2, 13, 4], // 34
    [10, 1, 12, 3, 14], // 35
    [15, 6, 17, 8, 19], // 36
    [15, 11, 7, 3, 9], // 37
    [0, 6, 12, 18, 14], // 38
    [15, 1, 7, 3, 19], // 39
    [0, 16, 12, 18, 4], // 40
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
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
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
    }

    var view = this.view;

    var multi = GetWildMultisFromView(view);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    this.view = GetFinalView(view);
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
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
        this.freeSpinLength = freeSpinCount;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var prevView = this.view;
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.scatterOverlays = cache.overlays ? cache.overlays : [];
    this.freeSpinAdd = GetFreeSpinLength(this.scatterOverlays.length);
    this.freeSpinLength += this.freeSpinAdd;

    var multi = GetWildMultisFromView(this.view);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    //is api      
    this.maskView = GetMaskView(this.view, prevView);

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.view = GetFinalView(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    var stickys = [];
    for (var i = 0; i < this.multiPositions.length; i++) {
        stickys.push(`${this.multiPositions[i]},${this.multiPositions[i]}`);
    }

    this.freeSpinSticky = stickys.join(`~`);
    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
        if (this.freeSpinWinMoney < player.betPerLine * this.lineCount * 10) {
            this.winMoney += player.betPerLine * this.lineCount * 10 - this.freeSpinWinMoney;
            this.freeSpinWinMoney = player.betPerLine * this.lineCount * 10;
        }

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
    var scatterWinMoney = WinFromView(scatterView, bpl);

    //                           
    var freeSpinCacheList = [];

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinCount);
    freeSpinCacheList.push(scatterView);

    //                                                               10                          10                              
    var totalWinMoney = cache.win + scatterWinMoney;
    if (totalWinMoney < totalBet * 10) {
        totalWinMoney = totalBet * 10;
    }

    return {
        win: totalWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(cache.viewList),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, true);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    //                           
    var freeSpinCacheList = [];

    //                           
    var cache = BuyBonusViewCache(freeReels, bpl, freeSpinCount);
    freeSpinCacheList.push(scatterView);

    //                                                               10                          10                              
    var totalWinMoney = cache.win + scatterWinMoney;
    if (totalWinMoney < totalBet * 10) {
        totalWinMoney = totalBet * 10;
    }

    return {
        win: totalWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(cache.viewList),
        type: "FREE",
        isCall: 0,
    };
}

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

var RandomScatterView = function (reels, isBuy = false) {
    if (isBuy) {
        return [11, 13, 11, 6, 1, 1, 6, 11, 7, 9, 12, 10, 7, 8, 9, 12, 10, 1, 10, 6];
    }

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
                view[i] = Util.random(3, 13);
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
    var freeSpinAddCount = 0;
    var isFreeSpinAdd = true;

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

        var scatterOverlays = [];
        scatterOverlays = RandomScatterOverlays(isFreeSpinAdd);
        freeSpinAddCount = GetFreeSpinLength(scatterOverlays.length);
        if (freeSpinAddCount > 0) {
            isFreeSpinAdd = false;
        }
        freeSpinLength += freeSpinAddCount;
        fsview = GetWildStickyView(fsview, wildMultiPositions, wildMultiValues);
        var cache = {
            view: fsview,
            overlays: scatterOverlays
        }
        freeSpinData.viewList.push(cache);
        var winMoney = WinFromView(fsview, bpl);

        var multi = GetWildMultisFromView(fsview);
        wildMultiPositions = multi.positions;
        wildMultiValues = multi.values;

        freeSpinWinMoney += winMoney;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            freeSpinData.win = freeSpinWinMoney;
            break;
        }
    }
    return freeSpinData;
};

var GetFreeSpinLength = function (overlayCount) {
    switch (overlayCount) {
        case 2: return 4;
        case 3: return 8;
        case 4: return 12;
        case 5: return 20;
        default: return 0;
    }
};

var RandomScatterOverlays = function (isFreeSpinAdd) {
    var scatterOverlays = [];
    if (Util.probability(50)) {
        if (isFreeSpinAdd && Util.probability(30)) {
            var new_reels = [0, 1, 2, 3, 4];
            var new_pos = [
                [0, 5, 10],
                [1, 6, 11],
                [2, 7, 12],
                [3, 8, 13],
                [4, 9, 14],
            ];

            Util.shuffle(new_reels);
            var overlayCount = Util.random(2, 6);
            for (var i = 0; i < overlayCount; i++) {
                var tmpIndex = Util.random(0, 3);
                var pos = new_pos[new_reels[i]][tmpIndex];
                scatterOverlays.push(`14~${pos}`);
            }
        } else {
            scatterOverlays.push(`14~${Util.random(0, slotWidth * slotHeight)}`);
        }
    }
    return scatterOverlays;
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
        //                                               
        if (isWildMulti(lineSymbols[i]) || isWild(lineSymbols[i])) {
            continue;
        }

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
        values: multiValues,
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

var GetFinalView = function (view) {
    var finalView = [...view];
    for (var i = 0; i < finalView.length; i++) {
        if (isWildMulti(finalView[i])) {
            finalView[i] = wild;
        }
    }
    return finalView;
};

var GetMaskView = function (view, prevView) {
    var wildCount = 0;
    var maskView = Util.clone(view);
    for (var i = 0; i < maskView.length; i++) {
        if (isWild(prevView[i])) {
            maskView[i] = Util.random(3, 13);
            wildCount++;
        } else if (isWildMulti(maskView[i])) {
            maskView[i] = wild;
        }
    }
    if (wildCount == 0) {
        return [];
    }
    return maskView;
};

var GetWildStickyView = function (view, wildMultiPositions, wildMultiValues) {
    var resultView = [...view];
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

var GetWildMultisFromView = function (view) {
    var multiPositions = [],
        multiValues = [];
    for (var i = 0; i < view.length; i++) {
        var symbol = view[i];
        if (isWildMulti(symbol)) {
            multiPositions.push(i);
            var multi = GetWildMulti(symbol);
            multiValues.push(multi);
        }
    }
    return {
        positions: multiPositions,
        values: multiValues,
    };
};

module.exports = SlotMachine;