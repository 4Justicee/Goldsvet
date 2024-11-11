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
    this.scatterPosition = [];
    this.scatterWin = 0;
    this.moneyCache = {};
    this.moneyTotalValue = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1;
var wild = 2;
var moneySymbol = 11;
var collectSymbol = 12;
var freeSpinCount = 8;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [5, 7, 6, 3, 10, 9, 4, 5, 7, 6, 9, 7, 11, 11, 11, 11, 8, 10, 6, 9, 5, 10, 6, 8, 3, 4, 10, 5, 7, 9, 6, 10, 4, 9, 5, 8, 9, 6, 10, 3, 7, 6, 8, 10, 8, 4, 7, 10, 6, 9, 5, 3, 10, 7],
    [7, 2, 2, 2, 2, 2, 9, 3, 8, 5, 9, 1, 10, 6, 9, 4, 7, 8, 11, 11, 11, 11, 7, 9, 4, 8, 3, 9, 5, 10, 4, 9, 1, 7, 5, 9, 3, 8, 5, 4, 9, 10, 6, 9, 3, 7, 4, 8, 5, 9, 6, 10],
    [3, 2, 2, 2, 2, 2, 8, 5, 9, 1, 10, 4, 8, 7, 3, 8, 6, 5, 8, 4, 7, 6, 8, 5, 9, 6, 3, 9, 8, 3, 10, 2, 2, 2, 2, 2, 8, 6, 8, 5, 7, 1, 8, 6, 9, 3, 10, 11, 11],
    [10, 2, 2, 2, 2, 2, 9, 8, 5, 4, 7, 1, 10, 3, 7, 11, 11, 11, 11, 4, 9, 3, 10, 1, 7, 6, 9, 4, 7, 8, 6, 9, 3, 7, 4, 10, 6, 7, 1, 8, 7, 3, 9, 5, 7, 1, 8, 6, 7, 9, 5, 7, 9, 6, 7, 4, 5, 8, 3],
    [7, 2, 2, 2, 2, 8, 6, 10, 3, 9, 5, 8, 3, 4, 7, 6, 10, 9, 5, 10, 7, 6, 9, 4, 3, 7, 6, 10, 5, 7, 12, 10, 6, 7, 4, 9, 6, 8, 7, 6, 9, 5, 3, 10, 6, 7, 5, 3, 8, 9, 6, 10, 4, 7, 3, 9, 4, 9, 8],
];
var freeReels = [
    [5, 7, 6, 3, 10, 9, 4, 5, 7, 6, 9, 7, 11, 11, 11, 5, 8, 10, 6, 9, 5, 6, 10, 8, 3, 4, 10, 11, 11],
    [7, 2, 2, 2, 2, 2, 9, 3, 8, 5, 9, 1, 10, 6, 9, 4, 7, 8, 11, 11, 11, 5, 7, 9, 4, 8, 3, 9],
    [3, 2, 2, 2, 2, 2, 8, 5, 9, 1, 10, 4, 8, 11, 11, 11, 6, 5, 8, 4, 7, 1, 8, 5, 9, 6, 3, 9],
    [10, 2, 2, 2, 2, 2, 2, 2, 2, 4, 7, 1, 10, 3, 7, 5, 11, 11, 11, 4, 9, 3, 10, 1, 7, 6, 9, 4, 8],
    [12, 2, 2, 9, 6, 10, 12, 9, 5, 8, 3, 4, 9, 6, 10, 3, 9, 10, 12, 6, 9, 3, 7, 12, 10, 8, 8, 3],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 10, 10, 10, 5, 5, 5, 5, 0, 0],
    [0, 0, 0, 50, 50, 25, 25, 15, 15, 15, 15, 0, 0],
    [0, 0, 0, 500, 300, 250, 200, 100, 100, 100, 100, 0, 0],
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
var moneySymbolValues = [25, 50, 75, 125, 200, 250, 300, 375, 450, 500, 625, 750, 875];

SlotMachine.prototype.Init = function() {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 40; //                                 ,                                               ,                                     .
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
        var cache = viewCache.view;
        this.view = cache.view;
        this.moneyCache = cache.moneyCache;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0].view;
        this.moneyCache = this.freeSpinCacheList[0].moneyCache;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.moneyTotalValue = MoneyWinFromCache(this.view, this.moneyCache, player.betPerLine);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalValue;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    //                             
    if (isFreeSpinWin(this.view)) {
        this.scatterPosition = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinCount;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    this.moneyTotalValue = MoneyWinFromCache(this.view, this.moneyCache, player.betPerLine);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalValue;
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

SlotMachine.prototype.BonusSpin = function (player, param) {};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpResult;
    if (baseWin > 0) {
        tmpResult = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpResult = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: tmpResult.view,
        win: tmpResult.win,
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
    var freeSpinCacheList = [];

    var freeSpinView = RandomScatterView(baseReels, bpl);
    var freeSpinViewWin = WinFromView(freeSpinView, bpl);
    var result = {
        view: freeSpinView,
        moneyCache: RandomMoneyCache(freeSpinView),
    };
    freeSpinViewWin += MoneyWinFromCache(freeSpinView, result.moneyCache, bpl);
    freeSpinView = result;

    var fsCount = freeSpinCount;
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push(freeSpinView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + freeSpinViewWin,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView,
        tmpMoneyCache,
        tmpWin,
        calcCount = 0,
        bottomLimit = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpMoneyCache = RandomMoneyCache(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, tmpMoneyCache, bpl);

        if (isFreeSpinWin(tmpView)) {
            continue;
        }

        // Renegade                                                            
        if (NumberOfCollect(tmpView) > 0) {
            if (Util.probability(70)) {
                continue;
            }
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    var result = {
        view: {
            view: tmpView,
            moneyCache: tmpMoneyCache,
        },
        win: tmpWin,
    };

    return result;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpMoneyCache, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpMoneyCache = RandomMoneyCache(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, tmpMoneyCache, bpl);

        if (isFreeSpinWin(tmpView)) {
            continue;
        }

        if (tmpWin == 0) {
            break;
        }
    }

    var result = {
        view: {
            view: tmpView,
            moneyCache: tmpMoneyCache,
        },
        win: tmpWin,
    };

    return result;
};

var RandomView = function (reels) {
    var resultView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        if (!isFreeSpinWin(resultView)) {
            break;
        }
    }

    return resultView;
};

var RandomScatterView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        if (WinFromView(view, bpl) == 0 && NumberOfScatters(view) == 0) {
            break;
        }
    }
    var scatterReels = [1, 2, 3];
    Util.shuffle(scatterReels);

    for (var i = 0; i < 3; i++) {
        var reelNo = scatterReels[i];

        var positions = [];
        for (var j = 0; j < slotHeight; j++) positions[j] = reelNo + j * slotWidth;

        var randIndex = Util.random(0, slotHeight);
        var viewPos = positions[randIndex];
        view[viewPos] = scatter;
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
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var moneyCache = {};
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (true) {
            tmpView = RandomView(reels);
            moneyCache = RandomMoneyCache(tmpView);
            tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, moneyCache, bpl);

            var freeSpinData = {
                view: tmpView,
                moneyCache: moneyCache,
            };

            freeSpinCacheList.push(freeSpinData);
            freeSpinTotalWin += tmpWin;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin,
        };


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

var RandomMoneyCache = function (view) {
    var values = DefaultMoneyCache().values;
    var table = DefaultMoneyCache().table;

    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            var value = 0;
            if (Util.probability(50)) {
                value = moneySymbolValues[Util.random(0, moneySymbolValues.length - 1)];
            } else if (Util.probability(50)) {
                value = moneySymbolValues[Util.random(5, moneySymbolValues.length - 1)];
            } else {
                value = moneySymbolValues[Util.random(8, moneySymbolValues.length - 1)];
            }
            values[i] = value;
            table[i] = "v";
            if (values[i] == "875") {
                table[i] = "jpb";
            }
        }
    }

    var result = {
        table: table,
        values: values,
    };
    return result;
};

var DefaultMoneyCache = function () {
    var moneyValues = [];
    var moneyTable = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyValues[i] = 0;
        moneyTable[i] = "r";
    }

    var result = {
        values: moneyValues,
        table: moneyTable,
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

var isCollect = function (symbol) {
    return symbol == collectSymbol;
};

var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol;
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

var NumberOfCollect = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isCollect(view[i])) {
            result++;
        }
    }
    return result;
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
    //                                    1            
    var win = 0;
    if (isFreeSpinWin(view)) {
        win = totalBet;
    }

    return win;
};

var MoneyWinFromCache = function (view, moneyCache, bpl) {
    var hasCollectSymbol = false;
    for (var i = 0; i < view.length; i++) {
        if (isCollect(view[i])) {
            hasCollectSymbol = true;
            break;
        }
    }
    if (!hasCollectSymbol) {
        return 0;
    }

    var moneyWin = 0,
        multi = 1;
    for (var i = 0; i < moneyCache.table.length; i++) {
        if (moneyCache.table[i] == "v") {
            moneyWin += moneyCache.values[i];
        } else if (moneyCache.table[i] == "ma") {
            multi = moneyCache.values[i];
        }
    }
    moneyWin *= multi;
    return moneyWin * bpl;
};

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    money += ScatterWinFromView(view, 25 * bpl);
    return money;
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


module.exports = SlotMachine;