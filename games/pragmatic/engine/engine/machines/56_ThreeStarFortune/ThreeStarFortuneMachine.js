var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.totalWin = 0;
    this.winLines = [];
    this.sticky = [];
    this.srf = "";
    this.ep = "";
    this.msr = "";
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinBeforeMoney = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var slotWidth = 5;
var slotHeight = 3;
var wild = 2;
var starSymbol = 17;
var mysterySymbols = [3, 4, 5, 6, 7, 8, 9];
var baseReels = [
    [9, 9, 9, 9, 9, 6, 6, 6, 6, 6, 7, 7, 9, 9, 5, 5, 5, 7, 6, 6, 7, 7, 7, 6, 6, 6, 5, 5, 8, 9, 9, 9, 4, 4, 6, 6, 6, 3, 3, 3, 6, 6, 6, 9, 9, 7, 7, 7, 3, 6, 8, 8, 6, 6, 4, 4, 4, 7, 7, 7, 9, 9, 9, 8, 8, 8, 8],
    [3, 3, 3, 5, 5, 4, 4, 4, 8, 8, 8, 6, 6, 6, 6, 8, 8, 5, 5, 5, 4, 6, 6, 7, 7, 7, 8, 8, 8, 2, 5, 5, 8, 6, 6, 8, 8, 8, 8, 3, 9, 9, 9, 5, 5, 5, 9, 6, 6, 7, 7, 6, 6, 6, 7, 8, 8, 8, 5],
    [8, 8, 8, 9, 9, 4, 4, 4, 4, 4, 8, 8, 8, 8, 5, 5, 5, 9, 6, 9, 9, 9, 4, 9, 7, 7, 7, 7, 7, 4, 4, 4, 7, 7, 7, 5, 7, 3, 2, 6, 6, 5, 5, 5, 3, 3, 3, 3, 8, 8, 7, 7, 7, 7, 8, 8, 8, 6, 6, 6, 8, 7, 7, 9, 9],
    [5, 5, 4, 4, 4, 5, 5, 5, 3, 3, 4, 4, 8, 4, 9, 8, 3, 3, 5, 5, 3, 3, 3, 3, 3, 4, 4, 4, 8, 8, 8, 2, 3, 3, 3, 5, 5, 9, 9, 6, 6, 8, 8, 7, 7, 7, 7, 5, 9, 9, 9, 8, 8, 8, 4, 4, 4, 5, 5, 7, 8, 8, 8],
    [6, 6, 9, 9, 7, 7, 6, 7, 7, 6, 6, 6, 9, 9, 9, 9, 7, 7, 7, 4, 9, 7, 7, 9, 9, 7, 4, 4, 6, 6, 6, 5, 7, 7, 8, 8, 8, 5, 5, 5, 7, 7, 9, 9, 9, 6, 6, 6, 7, 7, 7, 3, 3, 3, 8, 8, 8, 6, 6, 9, 9, 9],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 10, 8, 7, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 60, 25, 20, 15, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 250, 120, 60, 50, 40, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0],
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [0, 1, 7, 3, 4], // 6
    [10, 11, 7, 13, 14], // 7
    [5, 11, 12, 13, 9], // 8
    [5, 1, 2, 3, 9], // 9
    [5, 1, 7, 3, 9], // 10

    [9, 8, 7, 6, 5], // 1
    [4, 3, 2, 1, 0], // 2
    [14, 13, 12, 11, 10], // 3
    [4, 8, 12, 6, 0], // 4
    [14, 8, 2, 6, 10], // 5
    [4, 3, 7, 1, 0], // 6
    [14, 13, 7, 11, 10], // 7
    [9, 13, 12, 11, 5], // 8
    [9, 3, 2, 1, 5], // 9
    [9, 3, 7, 1, 5], // 10
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
    } else if (viewCache.type == "WILD" || viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0].view;
        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.totalWin = this.winMoney;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinBeforeMoney = this.winMoney;
        this.currentGame = "FREE";

        var cacheData = this.freeSpinCacheList[0];
        this.maskView = cacheData.maskView;
        this.srf = `${wild}~${starSymbol}~${cacheData.starPositions.join()}`;
        this.sticky = [];
        for (var i = 0; i < cacheData.starPositions.length; i++) {
            this.sticky.push(`${cacheData.starPositions[i]},${cacheData.starPositions[i]}`);
        }
        var expandingSource = [];
        for (var i = 0; i < cacheData.expands.length; i++) {
            var viewPos = cacheData.expands[i];
            if (this.maskView[viewPos] == wild) {
                expandingSource.push(viewPos);
            }
        }
        this.ep = `${wild}~${expandingSource.join()}~${cacheData.expands.join()}`;
        this.msr = "";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cacheData = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cacheData.view;
    this.maskView = cacheData.maskView;

    this.sticky = [];
    this.srf = "";
    this.ep = "";

    this.msr = cacheData.msr.join("~");
    this.freeSpinIndex++;

    if (this.maskView.includes(wild)) {
        for (var i = 0; i < cacheData.starPositions.length; i++) {
            this.sticky.push(`${cacheData.starPositions[i]},${cacheData.starPositions[i]}`);
        }

        this.srf = `${wild}~${starSymbol}~${cacheData.expands.join()}`;

        var expandingSource = [];
        for (var i = 0; i < cacheData.expands.length; i++) {
            var viewPos = cacheData.expands[i];
            if (this.maskView[viewPos] == wild) {
                expandingSource.push(viewPos);
            }
        }
        this.ep = `${wild}~${expandingSource.join()}~${cacheData.expands.join()}`;
    } else {
        for (var i = 0; i < cacheData.starPositions.length; i++) {
            this.sticky.push(`${cacheData.starPositions[i]},-1`);
        }
        this.currentGame = "BASE";
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.freeSpinWinMoney += this.winMoney;
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var result;

    if (baseWin > 0 && Util.probability(50)) {
        result = RandomWinView(baseReels, bpl, baseWin);
    } else {
        result = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: result.view,
        win: result.win,
        type: result.type,
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
    var scatterView = RandomScatterView(baseReels);

    var result = RandomFreeViewCache(baseReels, bpl, fsWin, scatterView);

    var pattern = {
        view: result.view,
        win: result.win,
        type: "FREE",
        bpl: bpl,
        isCall: isCall ? 1 : 0,
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var result = {};
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        result = RandomBaseView(reels, bpl);

        if (result.win > bottomLimit && result.win <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return result;
};

var RandomZeroView = function (reels, bpl) {
    var result = {};

    while (true) {
        result = RandomBaseView(reels, bpl);

        if (result.win == 0) {
            break;
        }
    }
    return result;
};

var RandomBaseView = function (reels, bpl) {
    var result = {};
    while (true) {
        result.view = RandomView(reels);
        if (Util.probability(50) || !isFreeSpinWin(result.view)) {
            break;
        }
    }

    if (isFreeSpinWin(result.view)) {
        result = RandomFreeViewCacheList(reels, bpl, result.view, false);
        result.type = "WILD";
    } else {
        result.win = WinFromView(result.view, bpl);
        result.type = "BASE";
    }

    return result;
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

        if (NumberOfWilds(view) < 2) {
            break;
        }
    }

    return view;
};

var RandomFreeViewCacheList = function (reels, bpl, firstView, isCall = false) {
    var cacheList = [];
    var totalWin = 0;

    var firstResult = GetFinalView(firstView);
    totalWin += WinFromView(firstResult.view, bpl);

    var firstCache = {
        view: firstResult.view,
        maskView: firstView,
        msr: [],
        expands: firstResult.expands,
        starPositions: firstResult.starPositions,
    };

    cacheList.push(firstCache);

    while (true) {
        var lastView = cacheList[cacheList.length - 1].view;

        var newView = GetNextView(reels, lastView, isCall);
        var maskView = [...newView];

        var _mysterySymbols = [...mysterySymbols];
        var msr = Util.shuffle(_mysterySymbols);
        for (var i = 0; i < maskView.length; i++) {
            if (maskView[i] == starSymbol) {
                maskView[i] = msr[Util.random(0, msr.length)];
            } else if (maskView[i] != wild) {
                // 10 11 12 13 14 15 16
                var index = msr.indexOf(maskView[i]);
                maskView[i] = index + 10;
            }
        }

        var result = GetFinalView(newView);
        var newCache = {
            view: result.view,
            maskView: maskView,
            msr: msr,
            expands: result.expands,
            starPositions: result.starPositions,
        };

        cacheList.push(newCache);
        totalWin += WinFromView(result.view, bpl);

        if (!isFreeSpinWin(maskView)) {
            break;
        }
    }

    return { view: cacheList, win: totalWin };
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

        if (isFreeSpinWin(view) && NumberOfWilds(view) == 1) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, firstView) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var result = RandomFreeViewCacheList(reels, bpl, firstView, true);


        if (result.win >= minMoney && result.win <= maxMoney) {
            return result;
        }

        if (result.win > lowerLimit && result.win < minMoney) {
            lowerLimit = result.win;
            lowerView = result;
        }
        if (result.win > maxMoney && result.win < upperLimit) {
            upperLimit = result.win;
            upperView = result;
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

var isWild = function (symbol) {
    return symbol == wild || symbol == starSymbol;
};

var NumberOfWilds = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result++;
        }
    }
    return result;
};

var isFreeSpinWin = function (view) {
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            return true;
        }
    }
    return false;
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

var GetFinalView = function (maskView) {
    var finalView = [...maskView];
    var wildPositions = [],
        expands = [],
        starPositions = [];

    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            if (maskView[viewPos] == wild) {
                wildPositions.push(viewPos);
                break;
            }
        }
    }

    for (var i = 0; i < wildPositions.length; i++) {
        var reelNo = wildPositions[i] % slotWidth;
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = reelNo + j * slotWidth;
            finalView[viewPos] = starSymbol;
            expands.push(viewPos);
        }
    }

    for (var i = 0; i < finalView.length; i++) {
        if (finalView[i] == starSymbol) {
            starPositions.push(i);
        }
    }

    return {
        view: finalView,
        expands: expands,
        starPositions: starPositions,
    };
};

var GetNextView = function (reels, view, isCall = false) {
    var nextView = [...view];
    var randomView;

    //                                                      
    if (!isCall) {
        while (true) {
            randomView = RandomView(reels);
            if (!isFreeSpinWin(randomView)) {
                break;
            }
        }
    } else {
        randomView = RandomView(reels);
    }

    for (var i = 0; i < nextView.length; i++) {
        if (nextView[i] != starSymbol) {
            nextView[i] = randomView[i];
        }
    }
    return nextView;
};

module.exports = SlotMachine;