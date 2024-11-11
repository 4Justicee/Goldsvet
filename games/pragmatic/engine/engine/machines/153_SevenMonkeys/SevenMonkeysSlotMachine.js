var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 7;
    this.freeSpinCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 5, 5, 5, 5, 5, 6, 5, 5, 6, 3, 3, 3, 3, 3, 6, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 3, 7, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 7, 2, 6, 7, 4, 7, 3, 5, 4, 6, 7, 4, 7, 3, 7, 5, 5, 7, 4, 7, 4],
    [5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 6, 7, 7, 7, 7, 7, 7, 7, 7, 6, 4, 4, 4, 4, 4, 4, 7, 7, 1, 3, 3, 3, 3, 3, 4, 4, 5, 6, 7, 5, 4, 4, 7, 7, 6, 6, 7, 6, 7, 6, 5, 3, 7, 5, 7, 3, 4, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 3, 6, 4, 4, 4, 4, 4, 7, 5, 5, 5, 5, 5, 7, 4, 5, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 6, 3, 1, 6, 7, 7, 7, 7, 6, 5, 2, 4, 3, 6, 6, 5, 4, 4, 7, 6, 5, 5, 4, 3, 6, 7, 7, 6],
    [7, 7, 7, 7, 7, 7, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 7, 7, 7, 1, 5, 3, 3, 3, 3, 5, 4, 3, 5, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 5, 7, 6, 6, 7, 3, 7, 5, 6, 6, 4, 7, 2, 6, 4, 7, 6, 4, 6, 6, 7, 6, 3],
    [7, 7, 7, 7, 7, 7, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 2, 6, 4, 4, 5, 5, 5, 5, 5, 6, 7, 5, 7, 6, 6, 1, 4, 5, 7, 7, 3, 3, 3, 3, 5, 6, 5, 7, 3, 7, 4, 7, 4, 6, 4, 7, 7, 6, 3, 5, 3, 7, 6, 5, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 50, 20, 5, 5, 3, 3],
    [0, 0, 400, 50, 15, 15, 5, 5],
    [0, 0, 1500, 150, 50, 50, 15, 15]
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 3
    [10, 11, 12, 13, 14], // 2
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [5, 1, 2, 3, 9], // 6
    [5, 11, 12, 13, 9] // 7
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
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.view = this.freeSpinCacheList[0];
    } else if (viewCache.type == "BONUS") {
        this.moneyBonusCacheList = viewCache.view;
        var firstCache = this.moneyBonusCacheList[0];
        this.view = firstCache.view;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += ScatterWinFromView(this.view, player.betPerLine * this.lineCount)
        this.freeSpinLength = GetCountFromScatterView(this.view);
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
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
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);
    var sccaterCount = GetCountFromScatterView(scatterView)
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(baseReels, bpl, fsWin, sccaterCount);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
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

        if (isFreeSpinWin(view) && NumberOfScatters(view) < 5) {
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
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);
                fsWin = WinFromView(fsview, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsview);

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

var WinFromView = function (view, bpl, isBonus = false) {
    var winMoney = 0;
    var defaultpayLines = [];
    if (isBonus) {
        defaultpayLines = bonusPayLine;
    } else {
        defaultpayLines = payLines;
    }

    for (var lineId = 0; lineId < defaultpayLines.length; lineId++) {
        var line = defaultpayLines[lineId];
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

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
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
    switch (NumberOfScatters(view)) {
        case 3:
            return totalBet * 1;
        case 4:
            return totalBet * 2;
        case 5:
            return totalBet * 3;
        default:
            break;
    }
};

var GetCountFromScatterView = function (view) {
    switch (NumberOfScatters(view)) {
        case 3:
            return 50;
        case 4:
            return 100;
        case 5:
            return 150;
        default:
            break;
    }
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);

        if (linePay > 0) {
            winLines.push(
                `${lineId}~${linePay}~${line
                    .filter(function (item, index, arr) {
                        return lineSymbols[index] != -1;
                    })
                    .join("~")}`
            );
        }
    }

    return winLines;
};

module.exports = SlotMachine;