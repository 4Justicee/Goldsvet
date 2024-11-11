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

    this.doubleMulti = 0.25;
    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var scatter = 1, wild = 2, coinSymbol = 11, superCoinSymbol = 13;
var slotWidth = 5, slotHeight = 3;
var freeSpinLenList = [8, 10, 12, 15, 20];
var baseCoinMultiList = [1, 2, 5, 20, 50, 100, 100, 500, 500, 500, 1000];
var baseMultiNumList = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var freeCoinMultiList = [1, 2, 5, 20, 50, 100, 500, 1000, 1000, 2500, 2500, 2500, 10000];
var freeMultiNumList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var baseReels = [
    [11, 8, 10, 11, 8, 4, 3, 4, 11, 2, 4, 4, 2, 3, 11, 3, 7, 6, 9, 7, 6, 10, 11, 9, 3, 8, 3, 4, 7, 7, 5, 3, 5, 4, 8, 7, 8, 5, 5, 6, 10, 9, 8, 4, 9, 7, 9, 3, 4, 11, 11, 11, 9, 8, 6, 11, 11, 8, 7, 4, 11, 5, 5, 10, 7],
    [10, 6, 4, 6, 8, 10, 9, 4, 4, 5, 10, 2, 1, 5, 10, 9, 7, 5, 3, 3, 11, 11, 3, 11, 5, 9, 4, 9, 8, 2, 5, 6, 8, 6, 4, 8, 11, 7, 9, 8, 11, 11, 11, 3, 8, 11, 4, 7, 4, 11, 1, 9, 6, 5],
    [10, 8, 8, 11, 6, 7, 5, 11, 3, 9, 10, 11, 10, 7, 1, 5, 5, 2, 3, 7, 10, 3, 6, 11, 7, 11, 9, 10, 11, 3, 9, 5, 6, 4, 9, 8, 10, 11, 3, 5, 8, 8, 11, 10, 2, 8, 10, 4, 7, 9, 1, 3, 3, 10, 7, 5, 8, 10, 7, 8, 11, 11, 6, 8, 8, 11, 7, 10, 6, 11, 11, 11, 5, 5, 3, 10, 4, 7, 6, 8, 7, 11, 5, 8, 5, 11, 1, 9, 11, 4],
    [7, 11, 10, 6, 8, 9, 8, 9, 1, 4, 7, 7, 3, 10, 2, 7, 5, 10, 11, 7, 3, 10, 7, 5, 6, 9, 8, 8, 10, 3, 4, 7, 4, 7, 6, 7, 10, 11, 3, 6, 11, 11, 11, 8, 11, 3, 7, 3, 7, 9, 8, 8, 3, 10, 8, 4, 5, 11, 9, 8, 4, 11, 8, 11, 7, 2, 8, 4, 3, 1, 11, 9, 10, 9, 5, 1, 3, 10, 5, 8],
    [4, 10, 10, 3, 8, 10, 7, 3, 6, 10, 5, 4, 8, 13, 7, 6, 9, 3, 5, 2, 7, 6, 9, 6, 11, 8, 5, 7, 8, 7, 8, 10, 3, 9, 3, 11, 11, 13, 11, 10, 2, 8, 9, 10, 13, 11, 4, 7, 11, 7, 9, 8, 7, 11, 7, 5, 7, 9, 10, 8, 9, 4, 10, 3, 6, 4, 10, 3, 5, 7, 11, 5, 11]
];
var freeReels = [
    [4, 7, 5, 10, 11, 3, 9, 7, 9, 7, 9, 8, 5, 6, 9, 3, 10, 9, 11, 4, 7, 2, 7, 6, 10, 11, 11, 11, 3, 9, 10, 5, 7, 6, 2, 7, 3, 11, 8, 6, 10, 11, 8, 9, 8, 7, 4, 10, 3, 8, 11, 8, 4, 8, 4, 8],
    [6, 5, 11, 8, 3, 6, 1, 10, 4, 3, 11, 5, 7, 10, 8, 5, 8, 4, 10, 4, 8, 10, 9, 7, 7, 10, 3, 5, 8, 10, 7, 11, 11, 11, 9, 8, 6, 7, 2, 10, 7, 7, 11, 11, 9, 7, 9, 5, 11, 9, 7, 11, 11, 4, 3, 9, 8, 6, 2, 11, 1, 9, 11, 4, 10, 8, 5],
    [1, 10, 8, 2, 5, 7, 9, 11, 11, 8, 11, 8, 1, 6, 2, 9, 4, 10, 3, 11, 11, 11, 7, 5, 4, 10, 7, 6, 3, 4, 9, 7, 10, 7, 9, 8, 11, 11, 10, 11, 2, 11, 5, 10, 1],
    [10, 11, 10, 4, 3, 5, 9, 10, 4, 9, 5, 3, 5, 6, 7, 8, 6, 7, 3, 8, 10, 8, 1, 11, 5, 11, 3, 10, 1, 10, 9, 6, 4, 9, 11, 3, 2, 7, 3, 1, 7, 9, 7, 6, 7, 10, 11, 4, 8, 9, 10, 4, 8, 6, 5, 7, 10, 7, 5, 2, 3],
    [6, 5, 8, 10, 7, 11, 8, 3, 5, 11, 6, 3, 11, 3, 6, 5, 7, 4, 5, 10, 7, 4, 9, 6, 7, 11, 11, 11, 4, 9, 10, 9, 7, 5, 10, 3, 4, 5, 10, 3, 11, 2, 3, 8, 11, 8, 7, 9, 8, 2, 9, 7, 8, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 20, 10, 8, 8, 8, 8, 0, 0, 0],
    [0, 0, 0, 200, 100, 50, 40, 20, 20, 20, 20, 0, 0, 0],
    [0, 0, 0, 2000, 1000, 500, 200, 50, 50, 50, 50, 0, 0, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],          // 3
    [0, 6, 12, 8, 4],          // 4
    [10, 6, 2, 8, 14],          // 5
    [5, 1, 2, 3, 9],          // 6
    [5, 11, 12, 13, 9],          // 7
    [0, 1, 7, 13, 14],          // 8
    [10, 11, 7, 3, 4],          // 9
    [5, 11, 7, 3, 9],          // 10
    [5, 1, 7, 13, 9],          // 11
    [0, 6, 7, 8, 4],          // 12
    [10, 6, 7, 8, 14],          // 13
    [0, 6, 2, 8, 4],          // 14
    [10, 6, 12, 8, 14],          // 15
    [5, 6, 2, 8, 9],          // 16
    [5, 6, 12, 8, 9],          // 17
    [0, 1, 12, 3, 4],           // 18
    [10, 11, 2, 13, 14],           // 19
    [0, 11, 12, 13, 4],         // 20
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
    }

    this.isCoin = false;
    this.coinWinMoney = GetCoinSumFromView(this.view, player.betPerLine * this.lineCount);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.coinWinMoney;
    if (this.coinWinMoney > 0) {
        this.isCoin = true;
    }
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = this.freeSpinCacheList.length - 1;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.isCoin = false;
    this.coinWinMoney = GetCoinSumFromView(this.view, player.betPerLine * this.lineCount, true);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.coinWinMoney;
    if (this.coinWinMoney > 0) {
        this.isCoin = true;
    }
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

    if (baseWin > 0) {
        var { tmpView, tmpWin } = RandomWinView(baseReels, bpl, baseWin);
    } else {
        var { tmpView, tmpWin } = RandomZeroView(baseReels, bpl);
    }

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
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl) + GetCoinSumFromView(scatterView, bpl * 20);
    var sccaterCount = freeSpinLenList[Util.random(0, 3)];
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, sccaterCount);

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
        tmpView = RegenSuperCoinView(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + GetCoinSumFromView(tmpView, bpl * 20);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels,bpl);
        }
    }
    return { tmpView, tmpWin };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpView = RegenSuperCoinView(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + GetCoinSumFromView(tmpView, bpl * 20);
        if (tmpWin == 0) {
            break;
        }
    }
    return { tmpView, tmpWin };
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
                fsWin = WinFromView(fsview, bpl) + GetCoinSumFromView(fsview, bpl * 20, true);

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

var RegenSuperCoinView = function (view) {
    var resultView = [...view];
    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] == superCoinSymbol) {
            resultView[i] = superCoinSymbol * Util.random(2, 4);
        }
    }

    return resultView;
};

var GetCoinSumFromView = function (view, bpl, isfree = false) {
    var coinCount = 0, superMulti = 0;
    for (var i = 0; i < view.length; i++) {
        if ((view[i] == coinSymbol || view[i] == wild)) {
            coinCount++;
        }
        if (view[i] % superCoinSymbol == 0) {
            coinCount++;
            superMulti += view[i] / superCoinSymbol;
        }
    }

    var multi = 0;
    var multiIndex = 0;
    if (isfree) {
        multiIndex = freeMultiNumList.indexOf(coinCount);
        if (multiIndex != -1) {
            multi = freeCoinMultiList[multiIndex];
        }
    } else {
        multiIndex = baseMultiNumList.indexOf(coinCount);
        if (multiIndex != -1) {
            multi = baseCoinMultiList[multiIndex];
        }
    }

    return multi * bpl * (superMulti == 0 ? 1 : superMulti);
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