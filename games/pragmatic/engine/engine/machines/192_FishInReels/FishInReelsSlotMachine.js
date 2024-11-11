var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    this.moneyTotalValue = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinData = [];
    this.freeSpinType = 0;
    //                    
    this.isFreeSpinAdd = false;
    this.freeSpinAddCount = 0;
    //             
    this.fishValuesCache = [];
    this.bigSymbolCache = {};
    this.catchedFishes = [];
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //REET IT IN, BIT CATCH
};

var scatter = 1, wild = 2;  //                                                
var slotWidth = 5, slotHeight = 3;
var freeSpinDefaultAddCount = 2;
var fish = 13; fisherman = 14;
var baseReels = [
    [1, 10, 5, 6, 8, 9, 12, 4, 7, 11, 3, 10, 9, 11, 10, 5, 7, 11, 9, 5, 8, 5, 8],
    [1, 11, 7, 5, 8, 12, 4, 9, 6, 10, 3, 2, 3, 10, 2, 7, 12, 7, 4, 9, 2, 5, 2],
    [7, 3, 1, 4, 12, 9, 8, 10, 5, 6, 2, 11, 1, 4, 5, 12, 10, 12, 8, 3, 9, 11, 5, 4, 9, 1, 2, 12, 11, 10, 2, 4, 10, 3, 9, 11, 11, 5, 1, 4, 3, 11, 3, 8, 2, 5, 11, 2, 1, 5, 12, 4, 2, 11, 2, 3, 1],
    [7, 12, 11, 2, 6, 10, 9, 5, 4, 1, 8, 3, 2, 5, 8, 2, 8, 3, 8, 10, 6, 2, 1, 5, 10, 6, 5, 1, 9, 3, 6, 10, 3],
    [1, 8, 9, 4, 6, 5, 11, 3, 12, 7, 10, 6, 9, 3, 11, 5, 12, 5, 11, 3, 7, 5, 10, 5, 3, 6, 4, 7, 6, 5, 12, 6, 5, 12, 5, 12, 3, 10, 8, 9, 10]
];
var freeReels = [
    [13, 13, 13, 9, 11, 4, 8, 10, 6, 7, 12, 3, 5, 13],
    [6, 13, 13, 13, 5, 11, 10, 9, 4, 7, 8, 2, 3, 12, 13, 12, 3, 9, 3, 12, 13, 3, 10, 2, 7, 3, 8, 3, 13, 9, 12],
    [4, 13, 13, 13, 13, 7, 9, 11, 8, 2, 6, 10, 5, 3, 12, 13, 10, 5, 3, 11, 3, 13, 3, 13, 2, 6, 13, 10, 3, 13],
    [10, 12, 10, 10, 10, 6, 8, 3, 13, 13, 13, 7, 11, 5, 2, 9, 4, 13, 5, 13, 11, 13, 8, 2, 13, 11, 13, 8, 11, 7],
    [12, 6, 7, 14, 3, 11, 5, 10, 9, 4, 8, 5, 4, 8, 5, 4, 14, 5, 3, 5, 14, 4, 3, 4, 10, 3, 5, 8, 3, 4, 14, 4]
];
var catchReels = [
    [9, 4, 3, 6, 8, 7, 12, 5, 10, 11, 12, 8, 6, 12, 7, 12, 10, 3, 6, 3, 10, 3, 12, 4, 8, 12, 5, 6, 12],
    [10, 6, 5, 9, 7, 4, 12, 11, 3, 2, 8, 6, 3, 7, 3, 6, 8, 5, 7, 11, 3, 12, 5, 12],
    [8, 12, 11, 6, 10, 2, 4, 9, 3, 5, 7, 10, 6, 10, 3, 6, 9, 6, 3, 10, 2, 6, 10, 9, 10, 6, 9, 5, 10],
    [10, 10, 10, 9, 4, 7, 12, 8, 6, 10, 3, 11, 5, 2, 12, 8, 4, 6, 12, 6, 11, 3, 6, 12, 6, 3, 12, 8, 3, 4, 11, 3, 6, 12, 6, 3, 5, 7, 6, 3, 7, 8],
    [12, 4, 8, 10, 5, 7, 6, 3, 11, 9, 10, 4, 11, 8, 10, 8, 3, 8, 11, 5, 4, 10, 11, 10, 11, 8, 10, 8, 7, 10, 11, 10, 11, 10, 11]
]
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 20, 15, 10, 10, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 0, 200, 150, 125, 100, 50, 50, 20, 20, 20, 20, 0, 0, 0],
    [0, 0, 0, 1000, 500, 400, 300, 200, 200, 150, 150, 100, 100, 0, 0, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],  // 1
    [0, 1, 2, 3, 4],  // 2
    [10, 11, 12, 13, 14],  // 3
    [0, 6, 12, 8, 4],  // 4
    [10, 6, 2, 8, 14],  // 5
    [5, 1, 2, 3, 9],  // 6
    [5, 11, 12, 13, 9],  // 7
    [0, 1, 7, 13, 14],  // 8
    [10, 11, 7, 3, 4],  // 9
    [5, 11, 7, 3, 9],  // 10
];
var percentList = {
    freeWinPercent: 30,
    freeSpinAddPercent: 5, //+2                                 
    moneyHighPercent: 5,   //                       length/2                
    bigCatchPercent: 5
};
var moneySymbolValues = [5, 10, 20, 30, 40, 60, 100, 150, 300, 400, 1000];
var fishSymbolValues = [2, 5, 10, 20, 30, 40, 60, 100, 150, 300, 400, 1000];  //             12                                                                                           ...

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
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
        this.moneyCache = {}; //                                
    } else if (viewCache.type == "FREE") {
        this.freeSpinData = viewCache.view;
        this.view = viewCache.view[0];

        this.freeSpinLength = GetFreeSpinCounts(this.view);
        this.freeSpinIndex = 1;
    }
    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    
    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "FREE") {
        this.scatterWin = this.winMoney;
        this.freeSpinWinMoney = 0;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.freeSpinType) {
        //             freeSpinCacheList[0]     fishValuesCache       .
        var cache = this.freeSpinCacheList[this.freeSpinIndex];
        this.view = cache.view;
        this.bigSymbolCache = cache.bigSymbolCache;

        if (this.bigSymbolCache.table.length == 3) { //            ~~~
            this.catchedFishes.unshift({
                index: this.catchedFishes.length + 1,
                multiIndex: this.bigSymbolCache.catchedMultiIndex,
                multiValue: this.bigSymbolCache.catchedValue
            });
            this.isFreeSpinAdd = true;
            this.freeSpinAddCount = freeSpinDefaultAddCount;
            this.freeSpinLength += this.freeSpinAddCount;
            this.winMoney += this.bigSymbolCache.catchedValue * player.betPerLine;
        }
    }
    else {
        var cache = this.freeSpinCacheList[this.freeSpinIndex - 1];
        this.view = cache.view;
        this.moneyCache = cache.moneyCache;

        if (NumberOfFishermen(this.view)) {
            this.winMoney += MoneyWinFromCache(this.moneyCache, player.betPerLine);
            var addCount = AddCountFromCache(this.moneyCache);
            if (addCount > 0) {
                this.isFreeSpinAdd = true;
                this.freeSpinAddCount = addCount;
                this.freeSpinLength += addCount;
            }
        }
    }

    this.winMoney += WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.freeSpinWinMoney += this.scatterWin;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.freeSpinType = Number(param.ind);
    this.freeSpinCacheList = this.freeSpinData[this.freeSpinType + 1]; //                                       
    if (this.freeSpinType) {
        this.catchedFishes = [];
        this.fishValuesCache = this.freeSpinCacheList[0];
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    //                            [      ] *                                                             ~~                 .

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
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinStore = [];

    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    var fsCount = GetFreeSpinCounts(scatterView);                       //                                        
    var ReelItCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWinMoney, fsCount, 0);
    var BigCatchCache = RandomFreeViewCache(catchReels, bpl, fsWin - scatterWinMoney, fsCount, 1);
    var max = Util.max(ReelItCache.win, BigCatchCache.win);

    freeSpinStore.push(scatterView);

    freeSpinStore.push(ReelItCache.cache);
    freeSpinStore.push(BigCatchCache.cache);

    var pattern = {
        view: freeSpinStore,
        bpl: bpl,
        win: max + scatterWinMoney,
        type: "FREE",
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
    return tmpView
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

        if (NumberOfScatters(view) < 2) {
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

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, freeSpinType) {
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
        if (freeSpinType)    //param.ind                            1             
            freeSpinData = RandomBigCatchViewCache(reels, bpl, fsLen);
        else    //                                          
            freeSpinData = RandomReelItInViewCache(reels, bpl, fsLen);

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

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
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
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) { //                                       
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                          
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                                           
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) { //                                         -1          
        lineSymbols[i] = -1;
    }
    return payTable[matchCount][symbol] * bpl; //                                      
};

var RandomReelItInViewCache = function (reels, bpl, fsLen) {
    var freeSpinCacheList = [];
    var moneyCache = {};
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var tmpView;

    while (true) {
        while (true) {
            tmpView = RandomView(reels);
            if (NumberOfFishermen(tmpView) <= 1 && NumberOfMoney(tmpView) <= 2)
                break;
        }

        moneyCache = RandomMoneySymbols(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(moneyCache, bpl);

        var cache = {
            view: tmpView,
            moneyCache: moneyCache,
        }

        freeSpinLength += AddCountFromCache(moneyCache);
        freeSpinTotalWin += tmpWin;

        freeSpinCacheList.push(cache);

        freeSpinIndex++;
        if (freeSpinIndex > freeSpinLength)
            break;
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
    }
};

var RandomBigCatchViewCache = function (reels, bpl, fsLen) {
    var freeSpinCacheList = [];
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var tmpView;

    //8                       
    var cache = ShuffledArray(fishSymbolValues, 8);
    //                           
    var positions = Util.clone(cache.table);
    var values = Util.clone(cache.values);

    var fishValuesCache = [];
    for (var i = 0; i < positions.length; ++i) {
        fishValuesCache.push({
            multiIndex: positions[i],
            multiValue: values[i]
        });
    }
    freeSpinCacheList.push(fishValuesCache);

    while (true) {
        tmpView = RandomView(reels);
        var bigSymbolCache = {
            table: [],
            values: []
        };

        //                              
        if (positions.length) {
            bigSymbolCache = ShuffledArray(tmpView, Util.probability(percentList.bigCatchPercent) ? 3 : Util.random(1, 3));
            if (bigSymbolCache.table.length == 3) { //                 3                                             ...
                bigSymbolCache.catchedMultiIndex = positions.shift();
                bigSymbolCache.catchedValue = values.shift();

                freeSpinTotalWin += fishSymbolValues[bigSymbolCache.catchedMultiIndex] * bpl;
                freeSpinLength += freeSpinDefaultAddCount;
            }
        }

        var cache = {
            view: tmpView,
            bigSymbolCache: bigSymbolCache
        }

        tmpWin = WinFromView(tmpView, bpl);
        freeSpinTotalWin += tmpWin;

        freeSpinCacheList.push(cache);

        freeSpinIndex++;
        if (freeSpinIndex > freeSpinLength)
            break;
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
    }
};

var ShuffledArray = function (arr, len) { //arr:                 , len:                              
    var positions = [];
    for (var i = 0; i < arr.length; ++i)
        positions.push(i);

    Util.shuffle(positions);

    var table = [], values = [];

    for (var i = 0; i < len; ++i) {
        table.push(positions[i]);
        values.push(arr[positions[i]]);
    }

    return {
        table: table,   //                                
        values: values  //                                             
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

var isFisherman = function (symbol) {
    return symbol == fisherman;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) == 3;
};

var GetFreeSpinCounts = function (view) {
    var nScatters = NumberOfScatters(view);
    switch (nScatters) {
        case 3: return 10;
        case 4: return 12;
        case 5: return 15;
    }
    return 0;
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

var NumberOfFishermen = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isFisherman(view[i])) {
            result++;
        }
    }
    return result;
};

var NumberOfMoney = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
            result++;
        }
    }
    return result;
};

var isMoney = function (symbol) {
    return symbol == fish;
};

var RandomMoneySymbols = function (view) {
    var table = [], values = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
            if (Util.probability(percentList.freeSpinAddPercent)) {
                table[i] = "rt";
                values[i] = freeSpinDefaultAddCount;
            }
            else {
                table[i] = "v";
                var value = 0;
                if (NumberOfFishermen(view)) {
                    value = moneySymbolValues[Util.random(0, moneySymbolValues.length)];
                } else if (Util.probability(percentList.moneyHighPercent)) {
                    value = moneySymbolValues[Util.random(0, moneySymbolValues.length / 3)];
                } else {
                    value = moneySymbolValues[Util.random(0, moneySymbolValues.length / 4)];
                }
                values[i] = value;
            }
        } else {
            table[i] = "r";
            values[i] = 0;
        }
    }

    return { table, values };
}

//                               
var MoneyWinFromCache = function (moneyCache, bpl) {
    var moneyWin = 0;
    for (var i = 0; i < moneyCache.table.length; i++) {
        if (moneyCache.table[i] == "v")
            moneyWin += moneyCache.values[i];
    }
    return moneyWin * bpl;
};

var AddCountFromCache = function (moneyCache) {
    var addCount = 0;
    for (var i = 0; i < moneyCache.table.length; i++) {
        if (moneyCache.table[i] == "rt")
            addCount += moneyCache.values[i];
    }
    return addCount;
}

module.exports = SlotMachine;