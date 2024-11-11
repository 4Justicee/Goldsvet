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
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMoneyMulti = 0;
    this.freeSpinWildCount = 0;

    this.moneyTotalSum = 0;
    this.wildCount = 0;
    this.moneyWinFlag = false;

    //                    
    this.buyMulti = 100;
    this.buyPatternCount = 30;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var wild = 2;
var slotWidth = 5, slotHeight = 3;
var moneySymbol = 12;
var baseReels = [
    [12, 12, 12, 4, 11, 7, 8, 5, 11, 4, 8, 5, 10, 7, 11, 6, 5, 3, 6, 2, 2, 2, 7, 11, 9],
    [2, 2, 2, 8, 5, 9, 4, 8, 10, 6, 9, 5, 6, 8, 4, 5, 9, 7, 4, 9, 6, 10, 9, 8, 6, 10, 5, 12, 12, 12, 9, 3, 7, 10, 8, 3, 10, 9, 11],
    [5, 6, 9, 8, 2, 2, 2, 10, 4, 7, 10, 3, 11, 8, 7, 10, 11, 7, 8, 3, 7, 12, 12, 12],
    [12, 12, 12, 3, 6, 9, 5, 11, 10, 7, 8, 6, 11, 4, 9, 8, 6, 4, 8, 7, 9, 11, 7, 6, 8, 10, 5, 9, 6, 8, 11, 7, 9, 3, 5, 8, 7, 11, 10, 9, 4, 6, 9, 7, 4, 8, 3, 9, 7, 11, 8, 10, 5, 9, 4, 7, 8, 5, 2, 2, 2],
    [12, 12, 12, 12, 11, 6, 10, 7, 6, 10, 4, 9, 7, 8, 10, 6, 4, 5, 11, 10, 7, 4, 10, 11, 6, 8, 5, 6, 2, 2, 2, 8, 3],
];
var freeReels = [
    [2, 2, 2, 2, 4, 8, 10, 3, 7, 6, 11, 9, 4, 8, 11, 10, 3, 11, 9, 7, 11, 8, 5, 9, 7, 5, 4, 9, 3, 6, 10, 7, 4, 10, 7, 11, 8, 3, 9, 7, 4, 11, 10, 5, 9, 8, 7, 10, 5, 7, 8, 11, 4, 5, 11, 10, 8, 5, 9, 7, 4, 9, 5, 7, 10, 6, 11, 5, 4, 8, 10, 3, 7, 11, 12, 12, 12, 12],
    [11, 6, 10, 5, 8, 3, 4, 5, 9, 4, 6, 3, 9, 6, 8, 9, 4, 3, 2, 2, 2, 2, 9, 6, 5, 8, 3, 4, 7, 9, 12, 12, 12, 12],
    [12, 12, 12, 12, 7, 10, 11, 6, 9, 8, 6, 7, 10, 6, 5, 11, 6, 10, 7, 8, 11, 3, 10, 7, 11, 10, 6, 11, 10, 7, 6, 11, 10, 7, 9, 2, 2, 2, 2, 3, 7, 11, 6, 7, 5, 8, 7, 6, 9, 7, 6, 8, 4],
    [2, 2, 2, 2, 6, 3, 5, 6, 8, 4, 3, 5, 6, 4, 9, 8, 4, 3, 8, 6, 10, 4, 7, 6, 9, 11, 6, 9, 4, 3, 8, 6, 5, 12, 12, 12, 12],
    [8, 7, 10, 4, 2, 2, 2, 2, 7, 11, 6, 3, 10, 4, 11, 7, 3, 5, 10, 3, 11, 4, 9, 7, 12, 12, 12, 12],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 40, 40, 40, 25, 20, 15, 10, 6, 6, 5, 5, 0],
    [0, 100, 100, 100, 50, 40, 30, 20, 12, 12, 10, 10, 0],
    [0, 300, 300, 300, 150, 120, 90, 60, 36, 36, 30, 30, 0],
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
var moneyValueList = [10, 20, 30, 40, 60, 80, 100, 150, 200, 400, 1000];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player, param) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = Number(player.betPerLine);

    this.winMoney = 0;
    this.winLines = [];
    this.moneyWinFlag = false;

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.moneyCache = cache.money;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;

        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        if (param.pur == null) {
            this.view = this.freeSpinCacheList[0].view;
            this.moneyCache = this.freeSpinCacheList[0].money;
        } else {
            var select = Number(param.pur);
            if (select == 11) {
                select = Util.random(0, 6);
            }
            this.view = this.freeSpinCacheList[0][select].view;
            this.moneyCache = this.freeSpinCacheList[0][select].money;
        }

        this.freeSpinMoneyMulti = MoneyWinFromCache(this.moneyCache);
    }

    this.winMoney = WinFromView(this.view, Number(player.betPerLine));
    var moneyWin = WinFromMoneyView(this.view, this.moneyCache, Number(player.betPerLine));
    if (moneyWin > 0) {
        this.moneyTotalSum = MoneyWinFromCache(this.moneyCache);
        this.wildCount = NumberOfWilds(this.view);
        this.winMoney += moneyWin;
        this.moneyWinFlag = true;
    }

    this.winLines = WinLinesFromView(this.view, Number(player.betPerLine));

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.money;

    this.moneyWinFlag = false;
    this.winMoney = 0;
    this.winLines = [];

    this.freeSpinWildCount = NumberOfWilds(this.view);
    this.freeSpinMoneyMulti += MoneyWinFromCache(this.moneyCache);

    this.winMoney = WinFromView(this.view, Number(player.betPerLine));
    this.winLines = WinLinesFromView(this.view, Number(player.betPerLine));

    if (this.freeSpinWildCount > 0) {
        this.moneyWinFlag = true;
        this.winMoney += this.freeSpinWildCount * this.freeSpinMoneyMulti * Number(player.betPerLine);
    }

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpCache, tmpWin;

    if (baseWin > 0) {
        tmpCache = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpCache = RandomZeroView(baseReels, bpl);
    }

    tmpWin = tmpCache.win;
    delete tmpCache["win"];

    var pattern = {
        view: tmpCache,
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
    var scatterView = RandomScatterView(baseReels, bpl, 5);
    var scatterMoneyCache = RandomMoneyCache(scatterView);
    var scatterMoneySum = MoneyWinFromCache(scatterMoneyCache);
    var freeSpinData = {
        length: 9,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length, scatterMoneySum);

    freeSpinData.viewList.push({
        view: scatterView,
        money: scatterMoneyCache,
    });
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl, 5);
    var scatterMoneyCache = RandomMoneyCache(scatterView);
    var scatterMoneySum = MoneyWinFromCache(scatterMoneyCache);
    var freeSpinData = {
        length: 9,
        viewList: [],
    };

    //                           
    var cache = BuyBonusViewCache(freeReels, bpl, freeSpinData.length, scatterMoneySum, (totalBet * this.buyMulti) / 5);

    //                                              
    var scatterCacheList = GenerateScatterViewList(scatterView, scatterMoneyCache);

    var moneyList = GenerateMoneyList(scatterCacheList, cache.viewList, bpl);
    var percentList = [];
    for (var j = 0; j < moneyList.length; j++) {
        percentList.push(moneyList[j] / (totalBet * (100 + j * 10)));
    }

    // 12                                                                                                         .
    var avgWin = Number((Util.maxInArr(percentList).value * totalBet * this.buyMulti).toFixed(0));

    freeSpinData.viewList.push(scatterCacheList);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: avgWin,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, moneyCache;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        if (NumberOfMoneySymbols(tmpView) > 0 && Util.probability(80)) {
            continue;
        }

        moneyCache = RandomMoneyCache(tmpView);

        tmpWin = WinFromView(tmpView, bpl) + WinFromMoneyView(tmpView, moneyCache, bpl);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    return {
        view: tmpView,
        money: moneyCache,
        win: tmpWin,
    };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin, moneyCache;

    while (true) {
        tmpView = RandomView(reels);
        if (NumberOfMoneySymbols(tmpView) > 0 && Util.probability(80)) {
            continue;
        }

        moneyCache = RandomMoneyCache(tmpView);

        tmpWin = WinFromView(tmpView, bpl) + WinFromMoneyView(tmpView, moneyCache, bpl);
        if (tmpWin == 0) {
            break;
        }
    }

    return {
        view: tmpView,
        money: moneyCache,
        win: tmpWin,
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

        if (!isFreeSpinWin(view) && NumberOfWilds(view) < 4) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl, moneyCount = 5) {
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

        if (NumberOfMoneySymbols(view) == moneyCount && NumberOfWilds(view) == 0 && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, scatterMoneySum) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen, scatterMoneySum)
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

var BuyBonusViewCache = function (reels, bpl, fsLen, scatterMoneySum, lowLimit = 0) {
    while (true) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        var moneyTotalSum = scatterMoneySum;
        freeSpinData.viewList = [];

        while (true) {
            var fsview, fsWin, moneyCache, wildCount, moneySum;
            while (true) {
                fsview = RandomFreeView(reels);
                fsWin = WinFromView(fsview, bpl);
                moneyCache = RandomMoneyCache(fsview);

                moneySum = MoneyWinFromCache(moneyCache);
                wildCount = NumberOfWilds(fsview);

                if (wildCount > 0) {
                    fsWin += wildCount * (moneyTotalSum + moneySum) * bpl;
                }

                if (Util.probability(50) || fsWin == 0) {
                    moneyTotalSum += moneySum;
                    break;
                }
            }

            freeSpinData.viewList.push({
                view: fsview,
                money: moneyCache,
            });

            freeSpinWinMoney += fsWin;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
        }

        if (freeSpinData.win > lowLimit) {
            return freeSpinData;
        }
    }
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

        var wildCount = NumberOfWilds(view);
        if (wildCount < 4 && (wildCount == 0 || Util.probability(50))) {
            break;
        }
    }
    return view;
};

var RandomMoneyCache = function (view) {
    var values = [];
    for (var i = 0; i < view.length; i++) {
        if (!isMoneySymbol(view[i])) {
            values[i] = 0;
            continue;
        }

        if (Util.probability(99)) {
            values[i] = moneyValueList[Util.random(0, 4)];
        } else if (Util.probability(90)) {
            values[i] = moneyValueList[Util.random(0, moneyValueList.length - 4)];
        } else {
            values[i] = moneyValueList[Util.random(0, moneyValueList.length)];
        }
    }

    var table = GetTableFromValues(values);
    return { table, values };
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

var GetTableFromValues = function (values) {
    var table = [];
    for (var i = 0; i < values.length; i++) {
        table[i] = tableFromValue(values[i]);
    }
    return table;
};

var tableFromValue = function (value) {
    switch (Number(value)) {
        case 0:
            return "r";
    }
    return "v";
};

var WinFromMoneyView = function (view, moneyCache, bpl) {
    var wildCount = NumberOfWilds(view);
    var win = 0;

    if (wildCount > 0) {
        win = MoneyWinFromCache(moneyCache) * wildCount * bpl;
    }

    return win;
};

var MoneyWinFromCache = function (moneyCache) {
    var total = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        total += moneyCache.values[i];
    }
    return total;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol;
};

var isFreeSpinWin = function (view) {
    return NumberOfMoneySymbols(view) >= 5;
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

var NumberOfMoneySymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result++;
        }
    }
    return result;
};

var GenerateScatterViewList = function (firstView, firstCache) {
    var result = [];
    result.push({ view: firstView, money: firstCache });

    //                    
    var tempView = [...firstView];
    var tempTable = [...firstCache.table];
    var tempValues = [...firstCache.values];
    var addPosArr = [];
    for (var i = 0; i < firstView.length; i++) {
        if (!isMoneySymbol(firstView[i])) {
            addPosArr.push(i);
        }
    }

    //                 
    addPosArr = Util.shuffle(addPosArr);

    for (var j = 0; j < addPosArr.length; j++) {
        tempView[addPosArr[j]] = moneySymbol;
        tempTable[addPosArr[j]] = "v";
        tempValues[addPosArr[j]] = moneyValueList[Util.random(0, 4)];

        result.push({
            view: [...tempView],
            money: {
                table: [...tempTable],
                values: [...tempValues],
            },
        });
    }

    return result;
};

var GenerateMoneyList = function (scatterCacheList, viewList, bpl) {
    var moneyList = [];

    for (var i = 0; i < scatterCacheList.length; i++) {
        var sum = MoneyWinFromCache(scatterCacheList[i].money);
        var win = CaculateMoneyFromPattern(sum, viewList, bpl);
        moneyList.push(win);
    }

    return moneyList;
};

var CaculateMoneyFromPattern = function (startMoneySum, viewList, bpl) {
    var moneyList = [];
    var totalSum = startMoneySum;
    var totalWin = 0;

    for (var i = 0; i < viewList.length; i++) {
        var view = viewList[i].view;
        var cache = viewList[i].money;

        var win = WinFromView(view, bpl);
        var sum = MoneyWinFromCache(cache);
        var count = NumberOfWilds(view);

        totalSum += sum;
        if (count > 0) {
            win += count * totalSum * bpl;
        }

        totalWin += win;
    }

    return totalWin;
};

module.exports = SlotMachine;