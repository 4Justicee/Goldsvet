var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 50;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinType = -1;
    this.freeSpinMulti = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];

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
var slotWidth = 5;
var slotHeight = 4;
var baseReels = [
    [4, 9, 10, 10, 10, 9, 6, 12, 12, 12, 12, 10, 7, 11, 11, 11, 11, 8, 8, 8, 11, 3, 1, 7, 3, 9, 5, 8, 8, 10],
    [12, 12, 12, 8, 8, 8, 10, 10, 10, 6, 4, 8, 10, 9, 7, 5, 1, 12, 11, 11, 11, 3, 11, 12, 9, 7],
    [5, 8, 8, 8, 12, 6, 12, 5, 6, 7, 4, 10, 12, 11, 1, 9, 3, 2, 10, 10, 6, 8, 4, 9, 10, 6, 11, 4, 7, 8, 9, 3, 12, 11, 7],
    [8, 8, 8, 3, 5, 10, 10, 10, 10, 9, 10, 11, 11, 11, 11, 10, 5, 7, 12, 12, 12, 8, 3, 11, 7, 1, 9, 4, 6, 12, 7],
    [6, 11, 11, 11, 4, 10, 10, 10, 3, 12, 12, 12, 9, 8, 8, 8, 8, 9, 1, 11, 4, 12, 7, 11, 7, 3, 6, 4, 5, 10],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 90, 75, 70, 60, 30, 25, 20, 20, 20],
    [0, 0, 0, 300, 150, 125, 100, 80, 60, 60, 50, 50, 50],
    [0, 0, 0, 1000, 500, 250, 150, 100, 80, 80, 75, 75, 75],
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
        var cache = viewCache.view;

        this.view = cache.view;
        this.maskView = cache.mask;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        var cache = this.freeSpinCacheList[0][0].view;
        this.view = cache.view;
        this.maskView = cache.mask;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        // console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

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
    this.freeSpinMulti = this.freeSpinCacheList[0].multi;
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.maskView = cache.mask;

    this.winMoney = WinFromView(this.view, player.betPerLine) * this.freeSpinMulti;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

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
    tmpWin = WinFromView(tmpView.view, bpl);

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
    // FS                
    var freeSpinStore = [];
    var moneyList = [];

    //                    
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    var lengthArray = [40, 13, 8, 5];
    var multiArray = [1, 3, 5, 8];

    for (var i = 0; i < 4; i++) {
        //                                     
        var freeSpinLength = lengthArray[i];
        var multi = multiArray[i];

        freeSpinStore[i] = [];

        var scatterCache = {
            view: {
                view: scatterView,
                mask: [],
            },
            freeSpinLength: freeSpinLength,
            multi: multi,
        };

        freeSpinStore[i] = [scatterCache];

        var result = RandomFreeViewCache(baseReels, bpl, fsWin, freeSpinLength, i, multi);

        freeSpinStore[i] = freeSpinStore[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: freeSpinStore,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, expandingView, tmpWin, expanding;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        expandingView = GetWildExpandingView(tmpView);
        tmpWin = WinFromView(expandingView, bpl);
        expanding = hasExpandingWild(tmpView);

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    var cache = {};
    if (expanding) {
        cache.mask = tmpView;
        cache.view = expandingView;
    } else {
        cache.mask = [];
        cache.view = tmpView;
    }

    return cache;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, expangindView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        expangindView = GetWildExpandingView(tmpView);

        tmpWin = WinFromView(expangindView, bpl);
        if (tmpWin == 0) {
            break;
        }
    }
    return {
        view: tmpView,
        mask: [],
    };
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

        if (isFreeSpinWin(view) && !hasExpandingWild(view)) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, fsType, multi) {
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
            var fsview, fsWin, expandingView, expanding;

            while (true) {
                fsview = RandomFreeView(reels);
                expandingView = GetWildExpandingView(fsview);
                expanding = hasExpandingWild(fsview);

                fsWin = WinFromView(expandingView, bpl) * multi;

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            var cache = {};
            if (fsWin > 0 && expanding) {
                cache.mask = fsview;
                cache.view = expandingView;
            } else {
                cache.mask = [];
                cache.view = fsview;
            }

            freeSpinData.viewList.push(cache);
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

var RandomFreeView = function (reels) {
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

        if (NumberOfScatters(view) < 3) {
            break;
        }
    }
    return view;
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

var GetWildExpandingView = function (view) {
    var result = Util.clone(view);
    var wildFlag = false;

    //                                           
    for (var i = 0; i < 4; i++) {
        var pos = i * 5 + 2;
        if (isWild(view[pos])) {
            wildFlag = true;
        }
    }

    //                           
    if (wildFlag) {
        for (var i = 0; i < 4; i++) {
            var pos = i * 5 + 2;
            result[pos] = wild;
        }
    }

    return result;
};

var hasExpandingWild = function (view) {
    //                                           
    for (var i = 0; i < 4; i++) {
        var pos = i * 5 + 2;
        if (isWild(view[pos])) {
            return true;
        }
    }

    return false;
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

module.exports = SlotMachine;