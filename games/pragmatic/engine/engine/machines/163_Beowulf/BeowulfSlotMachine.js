var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 40;
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
    this.moneyBonusWin = 0;
    this.moneyCacheIndex = 0;
    this.moneyBonusLength = 0;
    this.moneyBonusCacheList = [];
    this.moneyBonusCache = {};

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"]; // "BONUS"
};

var scatter = 1, wild = 2, veoSymbol = 3;
var slotWidth = 5, slotHeight = 4;
var emptySymbol = 13;
var bonusSpinLen = 3;
var baseReels = [
    [1, 7, 7, 7, 9, 9, 9, 6, 6, 10, 3, 3, 3, 3, 9, 11, 12, 12, 12, 5, 8, 12, 11, 4, 12, 7, 5, 3, 4, 8],
    [10, 3, 1, 4, 6, 8, 5, 10, 11, 12, 7, 7, 9, 2, 12, 6, 11, 11],
    [1, 5, 3, 4, 5, 7, 11, 10, 10, 10, 11, 11, 7, 6, 12, 12, 12, 12, 3, 9, 2, 10, 8, 6],
    [6, 5, 7, 3, 12, 9, 1, 10, 3, 9, 11, 2, 12, 4, 6, 8, 8, 4, 12],
    [3, 8, 10, 9, 7, 12, 10, 6, 12, 8, 11, 1, 5, 7, 12, 8, 4, 11]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 40, 30, 25, 20, 15, 10, 10, 5, 5, 0],
    [0, 0, 0, 500, 400, 300, 200, 150, 100, 75, 50, 25, 15, 0],
    [0, 0, 0, 2500, 1500, 800, 500, 400, 300, 200, 100, 75, 50, 0]
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
    [5, 6, 12, 8, 9.], // 25
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
    [15, 6, 17, 8, 19] // 40
];
var bonusPayLine = [
    [19, 8, 17, 6, 15],
    [4, 13, 2, 11, 0],
    [14, 8, 17, 6, 10],
    [9, 13, 2, 11, 5],
    [14, 18, 7, 16, 10],
    [9, 3, 12, 1, 5],
    [9, 18, 17, 16, 5],
    [14, 3, 2, 1, 10],
    [19, 8, 7, 6, 15],
    [4, 13, 12, 11, 0],
    [9, 8, 17, 6, 5],
    [14, 13, 2, 11, 10],
    [19, 18, 7, 16, 15],
    [4, 3, 12, 1, 0],
    [14, 13, 7, 11, 10],
    [9, 8, 12, 6, 5],
    [14, 13, 17, 11, 10],
    [9, 8, 2, 6, 5],
    [19, 18, 12, 16, 15],
    [4, 3, 7, 1, 0],
    [14, 8, 7, 6, 10],
    [9, 13, 12, 11, 5],
    [14, 18, 17, 16, 10],
    [9, 3, 2, 1, 5],
    [19, 13, 12, 11, 15],
    [4, 8, 7, 6, 0],
    [14, 8, 12, 6, 10],
    [9, 13, 7, 11, 5],
    [14, 18, 12, 16, 10],
    [9, 3, 7, 1, 5],
    [19, 13, 17, 11, 15],
    [4, 8, 2, 6, 0],
    [9, 13, 17, 11, 5],
    [14, 8, 2, 6, 10],
    [19, 13, 7, 11, 15],
    [4, 8, 12, 6, 0],
    [14, 13, 12, 11, 10],
    [9, 8, 7, 6, 5],
    [19, 18, 17, 16, 15],
    [4, 3, 2, 1, 0],
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
    [5, 6, 12, 8, 9.], // 25
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
    [15, 6, 17, 8, 19] // 40
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

    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
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

    if (isBonusSymbolWin(this.view)) {
        this.bonusIndex = 1;
        this.moneyBonusLength = this.moneyBonusCacheList.length;
        this.currentGame = "BONUS";
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

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;
    var cache = this.moneyBonusCacheList[this.bonusIndex];

    this.bonusIndex++;
    this.view = cache.view;

    if (this.bonusIndex >= this.moneyBonusCacheList.length) {
        this.winMoney = WinFromView(this.view, player.betPerLine, true);
        this.winLines = WinLinesFromView(this.view, player.betPerLine, true);
        this.moneyBonusWin = this.winMoney;
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
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

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusView = RandomBonusView();
    var bonusCache = {
        view: bonusView,
    }
    var moneyBonusCache = RandomBonusViewCache(bpl, bsWin, bonusCache);

    var pattern = {
        view: moneyBonusCache.cache,
        bpl: bpl,
        win: moneyBonusCache.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    };
    return pattern;
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

        if (!isFreeSpinWin(view) && !isBonusSymbolWin(view)) {
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

        if (isBonusSymbolWin(view)) {
            continue;
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

var RandomBonusView = function () {
    var result = [];

    for (var i = 0; i < slotWidth * slotHeight; i++) {
        result[i] = emptySymbol;
    }

    for (var i = 0; i < slotHeight; i++) {
        result[i * slotWidth] = veoSymbol;
    }

    while (true) {
        var pos = Util.random(1, 20);
        if (result[pos] != veoSymbol) {
            result[pos] = veoSymbol;
            break;
        }
    }

    return result;
};

var RandomBonusViewCache = function (bpl, bsWin, initView) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var moneyBonusSpinCache = {};
        var bonusSpinLength = 3;
        var bonusSpinWinMoney = 0;
        var bonusSpinIndex = 0;
        var bonusSpinCacheList = [initView];

        while (true) {
            var lastCache = bonusSpinCacheList[bonusSpinCacheList.length - 1];
            var lastView = Util.clone(lastCache.view);

            lastView = GenerateBonusView(lastView);

            var newCache = {
                view: lastView
            };

            bonusSpinCacheList.push(newCache);

            if (bonusSpinIndex == bonusSpinLength - 1) {
                if (Util.probability(30)) {
                    bonusSpinLength++;
                }
            }

            bonusSpinIndex++;
            if (bonusSpinIndex == bonusSpinLength) {
                bonusSpinCacheList.push(newCache);
                break;
            }
        }

        //                                                             .
        bonusSpinWinMoney = WinFromView(bonusSpinCacheList[bonusSpinCacheList.length - 1].view, bpl, true)

        moneyBonusSpinCache = {
            cache: bonusSpinCacheList,
            win: bonusSpinWinMoney
        }

        //                                    
        if (moneyBonusSpinCache.win >= minMoney && moneyBonusSpinCache.win <= maxMoney) {
            return moneyBonusSpinCache;
        }

        if (moneyBonusSpinCache.win > lowerLimit && moneyBonusSpinCache.win < minMoney) {
            lowerLimit = moneyBonusSpinCache.win;
            lowerView = moneyBonusSpinCache;
        }
        if (moneyBonusSpinCache.win > maxMoney && moneyBonusSpinCache.win < upperLimit) {
            upperLimit = moneyBonusSpinCache.win;
            upperView = moneyBonusSpinCache;
        }

    }

    return lowerView ? lowerView : upperView;
};

var GenerateBonusView = function (view) {
    var result = view;

    //                              1                                                                   
    //                                                        
    while (true) {
        while (true) {
            pos = Util.random(1, 20);
            if (result[pos] != veoSymbol) {
                result[pos] = veoSymbol;
                break;
            }
        }

        if (NumberOfBonus(result) < slotHeight * slotWidth) {
            break;
        }
    }
    return result;
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

var isBonusSymbolWin = function (view) {
    var bonusSymbolNum = 0;
    for (var i = 0; i < slotHeight; i++) {
        if (view[slotWidth * i] == veoSymbol) {
            bonusSymbolNum++;
        }
    }
    return bonusSymbolNum >= 4;
};

var NumberOfBonus = function (view) {
    var bonusNum = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == veoSymbol) {
            bonusNum++;
        }
    }
    return bonusNum;
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
            return totalBet * 5;
        case 5:
            return totalBet * 25;
        default:
            break;
    }
};

var GetCountFromScatterView = function (view) {
    switch (NumberOfScatters(view)) {
        case 3:
            return 15;
        case 4:
            return 15;
        case 5:
            return 20;
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

var WinLinesFromView = function (view, bpl, isBonus = false) {
    var defaultpayLines = [];
    var winLines = [];

    if (isBonus) {
        defaultpayLines = bonusPayLine;
    } else {
        defaultpayLines = payLines;
    }

    for (var lineId = 0; lineId < defaultpayLines.length; lineId++) {
        var line = defaultpayLines[lineId];
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