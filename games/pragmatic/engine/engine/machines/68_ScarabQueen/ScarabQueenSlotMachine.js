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
    this.collectSymbol = 0;
    this.moneyView = [];
    this.moneyFactors = [];
    this.moneyTotalFactor = 0;
    this.moneyTable = [];
    this.moneyExpanding = "";
    this.moneyRespin = "";
    this.moneyCacheList = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 8;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinBonusPot = 0;
    this.isBonusPotWin = false;

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

var scatter = 1, wild = 2, moneySymbol = 11, collectSymbol = 12;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [5, 7, 6, 4, 10, 9, 4, 5, 7, 6, 9, 7, 11, 11, 11, 11, 10, 8, 4, 7, 6, 9, 5, 10, 6, 8, 3, 4, 10, 5, 7, 9, 6, 10, 4, 9, 5, 8, 9, 6, 10, 3, 7, 6, 10, 8, 9, 10, 6, 9, 5, 3, 10],
    [7, 2, 2, 2, 2, 2, 4, 8, 5, 9, 1, 10, 6, 9, 4, 7, 8, 11, 11, 11, 11, 10, 6, 9, 4, 8, 3, 9, 5, 10, 4, 9, 1, 7, 5, 9, 3, 8, 5, 4, 9, 8, 3, 7, 4, 8, 5, 9, 6, 10, 1, 8],
    [3, 2, 2, 2, 2, 2, 8, 5, 9, 1, 10, 4, 8, 7, 3, 8, 6, 5, 8, 4, 7, 1, 8, 5, 9, 6, 8, 9, 2, 2, 2, 8, 10, 6, 8, 5, 7, 1, 8, 6, 9, 11, 11, 11, 11, 8, 6, 3, 9, 5, 8, 10],
    [10, 2, 2, 2, 2, 5, 6, 4, 7, 10, 3, 7, 11, 11, 11, 11, 9, 5, 7, 3, 10, 1, 7, 6, 9, 4, 7, 8, 9, 3, 7, 4, 10, 6, 7, 1, 8, 7, 3, 9, 5, 7, 8, 6, 7, 9, 6, 7, 4, 5, 8, 3, 10, 4, 9, 1, 7, 3, 5, 8, 6, 9, 7, 4, 10, 3, 9, 1],
    [7, 2, 2, 6, 4, 3, 9, 5, 8, 6, 4, 7, 6, 10, 7, 6, 12, 9, 4, 5, 7, 6, 10, 5, 7, 4, 10, 6, 7, 4, 9, 6, 8, 3, 6, 9, 5, 3, 10, 6, 7, 5, 4, 8, 9, 6, 10, 4, 7, 6, 8, 4, 9, 12, 10, 6, 7, 4, 10, 9, 5, 6, 10, 8, 4, 7, 8, 10, 4, 8, 5, 9, 6, 10, 9, 4, 7, 8]
];
var freeReels = [
    [5, 7, 6, 3, 10, 9, 4, 5, 7, 6, 9, 7, 11, 11, 11, 11, 11, 9, 5, 10, 6, 8, 3, 4, 10, 5, 7, 9, 6, 10, 4, 9, 5, 8, 9, 6, 10, 3, 7, 6, 8, 10, 9, 6, 11, 11, 11, 11, 11, 7, 4, 10],
    [7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 8, 5, 9, 1, 10, 6, 9, 4, 11, 11, 11, 11, 11, 5, 10, 6, 9, 4, 8, 3, 9, 5, 10, 4, 9, 1, 7, 5, 9, 11, 11, 11, 11, 11, 8, 3, 7, 4, 8, 5, 9, 6, 10, 1, 8],
    [8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 9, 1, 10, 4, 8, 7, 9, 8, 6, 5, 8, 4, 7, 1, 8, 5, 9, 11, 11, 11, 11, 11, 4, 10, 8, 6, 5, 8, 7, 1, 8, 6, 9, 11, 11, 11, 11, 11, 6, 8, 9, 5, 8, 3],
    [10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 3, 7, 11, 11, 11, 11, 11, 5, 7, 3, 10, 1, 7, 6, 9, 4, 7, 8, 9, 3, 7, 4, 10, 6, 7, 1, 8, 7, 3, 9, 5, 7, 8, 6, 11, 11, 11, 11, 11, 11, 5, 8, 10, 4, 9, 1, 7, 3, 5, 8, 6, 9, 7, 4, 10, 3, 9, 1],
    [7, 2, 2, 8, 6, 10, 3, 9, 5, 12, 3, 4, 7, 6, 10, 7, 6, 12, 9, 4, 8, 7, 6, 12, 5, 7, 4, 10, 6, 7, 12, 9, 6, 8, 3, 6, 9, 5, 4, 10, 6, 7, 12, 4, 8, 9, 6, 10, 12, 7, 6, 8, 4, 9, 12, 10, 6, 7, 3, 10, 9, 12, 6, 10, 4, 8, 7, 12, 10, 4, 8, 5, 9, 6, 12, 10, 4, 7, 8]
];
var bigMoneyReels = [
    [18, 18, 18, 18],
    [18, 18, 18, 18],
    [18, 18, 18, 18],
    [18, 18, 18, 18],
    [7, 2, 2, 2, 4, 8, 6, 10, 3, 9, 5, 12, 3, 4, 7, 6, 10, 9, 5, 10, 7, 6, 9, 4, 3, 7, 6, 5, 10, 7, 12, 10, 6, 7, 4, 9, 6, 8, 7, 6, 9, 5, 3, 10, 6, 7, 5, 3, 8, 9, 12, 10, 4, 7, 3, 9, 4, 8, 9, 4, 10, 6, 5, 3, 10, 9, 5, 6, 9]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 30, 25, 25, 20, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 800, 175, 150, 125, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0]
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
var freeSpinLength = 8;
var moneySymbolFactors = [25, 50, 75, 125, 200, 250, 300, 375, 450, 500, 625, 750, 875];
var percentList = {
    collectWinPercent: 75, //                                            
    normalCollectPercent: 75, //                                      
    moneySymbolPercent: [5, 10, 20] //                             
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 50; //                                 ,                                               ,                                     .
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

    var moneyCache = {};

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
        moneyCache = viewCache.moneyCache[0];
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
        this.moneyCacheList = viewCache.moneyCache;
        moneyCache = this.moneyCacheList[0];
    }

    this.collectSymbol = moneyCache.collectSymbol;
    this.moneyView = moneyCache.moneyView;
    this.moneyTable = moneyCache.moneyTable;
    this.moneyFactors = moneyCache.moneyFactors;
    this.moneyTotalFactor = moneyCache.moneyTotalFactor;
    this.moneyExpanding = moneyCache.moneyExpanding;
    this.moneyRespin = moneyCache.moneyRespin;

    this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalFactor * player.betPerLine;
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
        this.freeSpinBonusPot = 0;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];
    var moneyCache = this.moneyCacheList[this.freeSpinIndex];

    if (this.freeSpinIndex <= freeSpinLength) {
        this.collectSymbol = moneyCache.collectSymbol;
        this.moneyView = moneyCache.moneyView;
        this.moneyTable = moneyCache.moneyTable;
        this.moneyFactors = moneyCache.moneyFactors;
        this.moneyTotalFactor = moneyCache.moneyTotalFactor;
        this.moneyExpanding = moneyCache.moneyExpanding;
        this.moneyRespin = moneyCache.moneyRespin;
        this.freeSpinBonusPot = moneyCache.freeSpinBonusPot;

        this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalFactor * player.betPerLine;
        this.winLines = WinLinesFromView(this.view, player.betPerLine);

        this.virtualReels = {
            above: RandomLineFromReels(freeReels),
            below: RandomLineFromReels(freeReels)
        };
    } else { //                            
        this.moneyView = [];
        this.moneyTable = [];
        this.moneyFactors = [];
        this.moneyTotalFactor = 0;
        this.moneyExpanding = "";
        this.moneyRespin = "";

        this.collectSymbol = moneyCache.collectSymbol;
        this.isBonusPotWin = moneyCache.isBonusPotWin;
        this.freeSpinBonusPot = moneyCache.freeSpinBonusPot;

        this.winMoney = 0;
        if (this.isBonusPotWin) {
            this.winMoney = this.freeSpinBonusPot * player.betPerLine;
        }

        this.virtualReels = {
            above: RandomLineFromReels(bigMoneyReels),
            below: RandomLineFromReels(bigMoneyReels)
        };
    }

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > freeSpinLength + 1) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var view, win, moneyCache;

    if (baseWin > 0) {
        var result = RandomWinView(baseReels, bpl, baseWin);
        view = result.view;
        win = result.win;
        moneyCache = result.moneyCache;
    } else {
        var result = RandomZeroView(baseReels, bpl);
        view = result.view;
        win = result.win;
        moneyCache = result.moneyCache;
    }

    var pattern = {
        view: view,
        win: win,
        moneyCache: [moneyCache],
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
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinCacheList = [scatterView.view];
    var moneyCacheList = [scatterView.moneyCache];
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin);

    return {
        win: freeSpinData.win + scatterView.win,
        view: freeSpinCacheList.concat(freeSpinData.cache),
        moneyCache: moneyCacheList.concat(freeSpinData.moneyCache),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var calcCount = 0, bottomLimit = 0;
    while (true) {
        var result = GetBaseView(reels, bpl);

        if (result.win > bottomLimit && result.win <= maxWin && !isFreeSpinWin(result.view)) {
            return result;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var result = GetBaseView(reels, bpl);

        if (result.win == 0 && !isFreeSpinWin(result.view)) {
            return result;
        }
    }
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

var GetBaseView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (!Util.probability(percentList.collectWinPercent) && isCollectView(view)) { //                                                     
            continue;
        }

        var moneyCache = {
            collectSymbol: RandomCollectSymbol(),
            moneyView: [],
            moneyTable: [],
            moneyFactors: [],
            moneyTotalFactor: 0,
            moneyExpanding: "",
            moneyRespin: ""
        };

        var moneyValues = RandomMoneyValues(view);
        if (moneyValues != null) {
            moneyCache.moneyFactors = moneyValues.factors;
            moneyCache.moneyTable = moneyValues.table;
        }

        if (HasCollectSymbol(view) > 0) {
            moneyCache.moneyView = view;
            moneyCache.moneyView[HasCollectSymbol(view)] = moneyCache.collectSymbol;
        }

        if (isCollectView(view)) { //                       
            var result = MoneyCollect(view, moneyCache.collectSymbol, moneyCache.moneyTable, moneyCache.moneyFactors);

            moneyCache.moneyView = result.view;
            moneyCache.moneyTable = result.table;
            moneyCache.moneyFactors = result.factors;
            moneyCache.moneyTotalFactor = result.totalFactor;
            moneyCache.moneyExpanding = result.expanding;
            moneyCache.moneyRespin = result.respin;

            win += moneyCache.moneyTotalFactor * bpl;
        }

        var result = {
            view: view,
            win: win,
            moneyCache: moneyCache
        };

        return result;
    }
};

var RandomScatterView = function (reels, bpl) {
    var scatterView;

    while (true) {
        scatterView = GetBaseView(reels, bpl);

        if (isFreeSpinWin(scatterView.view)) {
            return scatterView;
        }
    }
}

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinIndex = 1,
            freeSpinWinMoney = 0,
            freeSpinBonusPot = 0,
            freeSpinCacheList = [],
            moneyCacheList = [];
        var freeSpinData = {};
        while (true) {
            var result = GetFreeView(reels, bpl, freeSpinBonusPot);

            freeSpinCacheList.push(result.view);
            moneyCacheList.push(result.moneyCache);
            freeSpinWinMoney += result.win;
            freeSpinBonusPot = result.freeSpinBonusPot;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        var result = GetFinalFreeView(bpl, freeSpinBonusPot);

        freeSpinCacheList.push(result.view);
        moneyCacheList.push(result.moneyCache);
        freeSpinWinMoney += result.win;

        freeSpinData = {
            win: freeSpinWinMoney,
            cache: freeSpinCacheList,
            moneyCache: moneyCacheList
        };

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return freeSpinData;
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = freeSpinData;
        }

        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = freeSpinData;
        }

    }

    return lowerView ? lowerView : upperView;
}

var GetFreeView = function (reels, bpl, fsBonusPot) {
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (isFreeSpinWin(view)) {
            continue;
        }

        var moneyCache = {
            collectSymbol: RandomCollectSymbol(),
            moneyView: [],
            moneyTable: [],
            moneyFactors: [],
            moneyTotalFactor: 0,
            moneyExpanding: "",
            moneyRespin: "",
            freeSpinBonusPot: 0
        };

        var moneyValues = RandomMoneyValues(view);
        if (moneyValues != null) {
            moneyCache.moneyFactors = moneyValues.factors;
            moneyCache.moneyTable = moneyValues.table;
        }

        for (var i = 0; i < moneyCache.moneyFactors.length; i++) {
            fsBonusPot += moneyCache.moneyFactors[i];
        }
        moneyCache.freeSpinBonusPot = fsBonusPot;

        if (HasCollectSymbol(view) > 0) {
            moneyCache.moneyView = view;
            moneyCache.moneyView[HasCollectSymbol(view)] = moneyCache.collectSymbol;
        }

        if (isCollectView(view)) { //                       
            var result = MoneyCollect(view, moneyCache.collectSymbol, moneyCache.moneyTable, moneyCache.moneyFactors);

            moneyCache.moneyView = result.view;
            moneyCache.moneyTable = result.table;
            moneyCache.moneyFactors = result.factors;
            moneyCache.moneyTotalFactor = result.totalFactor;
            moneyCache.moneyExpanding = result.expanding;
            moneyCache.moneyRespin = result.respin;

            win += moneyCache.moneyTotalFactor * bpl;
        }

        var result = {
            view: view,
            win: win,
            moneyCache: moneyCache,
            freeSpinBonusPot: fsBonusPot
        };

        return result;
    }
};

var GetFinalFreeView = function (bpl, fsBonusPot) {
    var view = RandomView(bigMoneyReels);
    var win = 0;
    var isBonusPotWin = false;

    if (HasCollectSymbol(view) >= 0) {
        isBonusPotWin = true;
        win = fsBonusPot * bpl;
    }

    var moneyCache = {
        collectSymbol: 17,
        isBonusPotWin: isBonusPotWin,
        freeSpinBonusPot: fsBonusPot
    };

    var result = {
        view: view,
        win: win,
        moneyCache: moneyCache
    };

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

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    money += ScatterWinFromView(view, bpl * 25);

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
        return bet;
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

var HasCollectSymbol = function (view) {
    var collectReel = 4; //                                                .
    for (var i = 0; i < slotHeight; i++) {
        var pos = collectReel + i * slotWidth;
        if (view[pos] >= collectSymbol) {
            return pos;
        }
    }
    return -1;
};


var RandomCollectSymbol = function () {
    if (Util.probability(percentList.normalCollectPercent)) {
        return 17;
    } else {
        return Util.random(13, 17);
    }
};

// 13:                   , 14:                   , 15:                   , 16:                      , 17:                   
var CollectSymbolFromText = function (text) {
    switch (text) {
        case "Extra":
            return 13;
        case "Multiplier":
            return 14;
        case "Expanding":
            return 15;
        case "Respin":
            return 16;
        case "Normal":
            return 17;
    }
    return 0;
};

var CollectTextFromSymbol = function (collect) {
    switch (collect) {
        case 13:
            return "Extra";
        case 14:
            return "Multiplier";
        case 15:
            return "Expanding";
        case 16:
            return "Respin";
        case 17:
            return "Normal";
    }
    return 0;
};


var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result++;
        }
    }
    return result;
};

var MoneySymbolPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var isCollectView = function (view) {
    var collect = HasCollectSymbol(view);
    var moneys = NumberOfMoneySymbols(view);
    if (collect >= 0 && moneys > 0)
        return true;
    return false;
};

var DefaultMoneyCache = function () {
    var moneyFactors = [];
    var moneyTable = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyFactors[i] = 0;
        moneyTable[i] = "r";
    }

    var result = {
        moneyFactors: moneyFactors,
        moneyTable: moneyTable,
    };
    return result;
};

var RandomMoneyValues = function (view) {
    if (NumberOfMoneySymbols(view) == 0)
        return null;

    var moneyFactors = DefaultMoneyCache().moneyFactors;
    var moneyTable = DefaultMoneyCache().moneyTable;

    var moneyPositions = MoneySymbolPositions(view);

    for (var i = 0; i < moneyPositions.length; i++) {
        var factor = RandomMoneyFactor();
        var pos = moneyPositions[i];

        moneyFactors[pos] = factor;
        moneyTable[pos] = "v";
    }
    var result = {
        table: moneyTable,
        factors: moneyFactors
    }
    return result;
};

var RandomMoneyFactor = function () {
    var index = 0;

    if (Util.probability(percentList.moneySymbolPercent[0])) {
        index = Util.random(0, moneySymbolFactors.length);
    } else if (Util.probability(percentList.moneySymbolPercent[1])) {
        index = Util.random(0, moneySymbolFactors.length / 2);
    } else if (Util.probability(percentList.moneySymbolPercent[2])) {
        index = Util.random(0, moneySymbolFactors.length / 4);
    }

    return moneySymbolFactors[index];
};

//                                                     (   ,                ,             )
var MoneyCollect = function (view, cSymbol, mTable, mFactors) {
    var result = {};

    switch (CollectTextFromSymbol(cSymbol)) {
        case "Extra":
            result = ExtraCollect(view, mTable, mFactors);
            break;
        case "Multiplier":
            result = MultiplierCollect(view, mTable, mFactors);
            break;
        case "Expanding":
            result = ExpandingCollect(view, mTable, mFactors);
            break;
        case "Respin":
            result = RespinCollect(view, mTable, mFactors);
            break;
        case "Normal":
            result = NormalCollect(view, mTable, mFactors);
            break;
    }

    return result;
};

var ExtraCollect = function (view, mTable, mFactors) {
    var collectPosition = HasCollectSymbol(view);
    var moneyView = Util.clone(view);
    var moneyTable = Util.clone(mTable);
    var moneyFactors = Util.clone(mFactors);
    var mTotalFactor = 0;

    var extraFactor = RandomMoneyFactor();

    moneyView[collectPosition] = CollectSymbolFromText("Extra");
    moneyTable[collectPosition] = "ea";
    moneyFactors[collectPosition] = extraFactor;

    for (var i = 0; i < moneyFactors.length; i++) {
        if (i == collectPosition) continue;
        if (moneyFactors[i] > 0) {
            mTotalFactor += moneyFactors[i] + extraFactor;
        }
    }

    var result = {
        view: moneyView,
        table: moneyTable,
        factors: moneyFactors,
        totalFactor: mTotalFactor
    }
    return result;
};

var MultiplierCollect = function (view, mTable, mFactors) {
    var collectPosition = HasCollectSymbol(view);
    var moneyView = Util.clone(view);
    var moneyTable = Util.clone(mTable);
    var moneyFactors = Util.clone(mFactors);
    var mTotalFactor = 0;

    var moneyMultiArray = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 10, 10, 25]
    var multiFactor = moneyMultiArray[Util.random(0, moneyMultiArray.length)];

    moneyView[collectPosition] = CollectSymbolFromText("Multiplier");
    moneyTable[collectPosition] = "ma";
    moneyFactors[collectPosition] = multiFactor;

    for (var i = 0; i < moneyFactors.length; i++) {
        if (i == collectPosition) continue;
        if (moneyFactors[i] > 0) {
            mTotalFactor += moneyFactors[i] * multiFactor;
        }
    }

    var result = {
        view: moneyView,
        factors: moneyFactors,
        table: moneyTable,
        totalFactor: mTotalFactor
    }
    return result;
};

var ExpandingCollect = function (view, mTable, mFactors) {
    var collectPosition = HasCollectSymbol(view);
    var moneyView = Util.clone(view);
    var moneyTable = Util.clone(mTable);
    var moneyFactors = Util.clone(mFactors);
    var mTotalFactor = 0;

    moneyView[collectPosition] = CollectSymbolFromText("Expanding");

    var moneyReels = [];
    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            if (isMoneySymbol(view[viewPos])) {
                moneyReels.push(i);
                break;
            }
        }
    }

    var beforeExpanding = [],
        afterExpanding = [];
    for (var i = 0; i < moneyReels.length; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = moneyReels[i] + j * slotWidth;
            if (isMoneySymbol(moneyView[viewPos])) {
                beforeExpanding.push(viewPos);
                afterExpanding.push(viewPos);
            } else {
                moneyView[viewPos] = moneySymbol;
                moneyTable[viewPos] = "v";
                moneyFactors[viewPos] = moneySymbolFactors[Util.random(0, moneySymbolFactors.length)];
                afterExpanding.push(viewPos);
            }
        }
    }

    var moneyExpanding = `${moneySymbol}~${beforeExpanding.join(',')}~${afterExpanding.join(',')}`;

    for (var i = 0; i < moneyFactors.length; i++) {
        mTotalFactor += moneyFactors[i];
    }

    var result = {
        view: moneyView,
        table: moneyTable,
        factors: moneyFactors,
        totalFactor: mTotalFactor,
        expanding: moneyExpanding
    }
    return result;
};

var RespinCollect = function (view, mTable, mFactors) {
    var collectPosition = HasCollectSymbol(view);
    var moneyView = Util.clone(view);
    var moneyTable = Util.clone(mTable);
    var moneyFactors = Util.clone(mFactors);
    var mTotalFactor = 0;

    moneyView[collectPosition] = CollectSymbolFromText("Respin");

    var respinPositions = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i]) || i % 5 == 4) {
            continue;
        }
        respinPositions.push(i);
    }

    Util.shuffle(respinPositions);

    var moneyRespin = [];
    var moneyCount = Util.random(1, respinPositions.length + 1);

    for (var i = 0; i < moneyCount; i++) {
        var pos = respinPositions[i];
        var respinChange = `${moneyView[pos]}~${moneySymbol}~${pos}`;

        moneyView[pos] = moneySymbol;
        moneyTable[pos] = "v";
        moneyFactors[pos] = moneySymbolFactors[Util.random(0, moneySymbolFactors.length)];

        moneyRespin.push(respinChange);
    }

    for (var i = 0; i < moneyFactors.length; i++) {
        mTotalFactor += moneyFactors[i];
    }

    var result = {
        view: moneyView,
        table: moneyTable,
        factors: moneyFactors,
        totalFactor: mTotalFactor,
        respin: moneyRespin.join(';')
    }
    return result;
};

var NormalCollect = function (view, mTable, mFactors) {
    var collectPosition = HasCollectSymbol(view);
    var moneyView = Util.clone(view);
    var mTotalFactor = 0;

    moneyView[collectPosition] = CollectSymbolFromText("Normal");

    for (var i = 0; i < mFactors.length; i++) {
        mTotalFactor += mFactors[i];
    }

    var result = {
        view: moneyView,
        table: mTable,
        factors: mFactors,
        totalFactor: mTotalFactor
    }
    return result;
};

module.exports = SlotMachine;