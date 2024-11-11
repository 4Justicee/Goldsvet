var Util = require('../../../utils/slot_utils');

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
    this.lines = {};      //                                       

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinData = [];
    this.freeSpinCacheList = [];
    this.scatterCount = 0;    //             cp          
    this.scatterLimit = 5;    //             tp          
    this.freeSpinLevel = 1;   //             lvl          
    this.freeSpinMaxLevel = 1;
    this.scatterAddCount = 0; //             sc          
    this.freeSpinLevelAddCount = 0;   //             cl          
    this.freeSpinAdd = 0;

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
    //             
    this.buyMulti = 100;
    this.buyPatternCount = 34;
};

var slotWidth = 5;
var slotHeight = 3;
var scatter = 1;
var wild = 2;
var baseReels = [
    [5, 8, 10, 7, 11, 6, 9, 11, 4, 5, 5, 3, 10, 10, 9, 6, 4, 6, 8, 9, 10, 1, 11, 9, 10, 8, 8, 7, 7, 9, 8, 3, 11, 3],
    [7, 5, 4, 1, 10, 2, 7, 10, 4, 8, 6, 11, 9, 7, 10, 3, 8, 11, 9, 5, 4, 9, 10, 11, 9, 11, 3, 4, 9, 5, 6, 8, 11, 11, 6, 2, 8, 4, 11, 8, 10, 1, 5, 7, 6, 9],
    [10, 7, 9, 4, 3, 11, 3, 6, 2, 11, 7, 5, 9, 10, 1, 9, 4, 7, 2, 5, 11, 11, 8, 10, 3, 2, 10, 6, 9, 9, 8, 1, 5, 5, 9, 10, 2, 10, 11, 4, 4, 7, 8, 9, 5, 8, 8, 4, 8, 7],
    [10, 3, 8, 2, 2, 9, 10, 3, 5, 4, 1, 8, 9, 4, 6, 9, 3, 9, 11, 7, 10, 4, 6, 11, 5, 11, 8],
    [9, 10, 6, 9, 11, 9, 4, 7, 9, 4, 8, 6, 4, 1, 10, 7, 5, 6, 3, 3, 8, 11, 5, 9, 8, 11, 10, 3, 8, 10, 5, 3, 8]
];
var freeReels = [   //                                                
    [9, 8, 8, 11, 5, 11, 6, 10, 3, 11, 1, 3, 5, 10, 4, 7, 9, 9, 4, 8, 4, 10, 7],
    [8, 9, 11, 7, 10, 2, 6, 11, 5, 10, 10, 11, 3, 11, 5, 3, 2, 7, 9, 9, 2, 8, 11, 6, 9, 8, 2, 6, 11, 4, 6, 3, 5, 10, 4, 2, 8, 11, 5, 1, 9, 9],
    [1, 2, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11],
    [7, 1, 6, 7, 10, 1, 3, 9, 11, 5, 2, 3, 11, 3, 9, 5, 8, 9, 8, 11, 11, 2, 8, 9, 4, 2, 10, 8, 4, 6, 10],
    [10, 8, 9, 8, 1, 3, 4, 7, 10, 10, 7, 9, 9, 10, 6, 10, 11, 9, 6, 5, 8, 4, 3, 9, 4, 8, 6, 3, 5, 5, 7, 11]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 20, 12, 10, 6, 6, 5, 5],
    [0, 0, 0, 100, 50, 40, 25, 20, 12, 12, 10, 10],
    [0, 0, 0, 600, 300, 200, 150, 100, 60, 60, 50, 50]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],          // 3
    [0, 6, 12, 8, 4],          // 4
    [10, 6, 2, 8, 14],          // 5
    [5, 11, 12, 13, 9],          // 6
    [5, 1, 2, 3, 9],          // 7
    [0, 1, 7, 13, 14],          // 8
    [10, 11, 7, 3, 4],          // 9
    [5, 11, 7, 3, 9],          // 10
    [5, 1, 7, 13, 9],          // 11
    [0, 6, 7, 8, 4],          // 12
    [10, 6, 7, 8, 14],          // 13
    [0, 6, 2, 8, 4],          // 14
    [10, 6, 12, 8, 14],          // 15
    [5, 6, 2, 8, 9],            //16
    [5, 6, 12, 8, 9],           //17
    [0, 1, 12, 3, 4],           // 18
    [10, 11, 2, 13, 14],           // 19
    [0, 11, 12, 13, 4],         // 20
];
var percentList = {
    freeWinPercent: 50,
    multiHighPercent: 1,
    multiLowPercent: 2,
    megaAddPercent: 22,
    ultraAddPercent: 34,
};
var wildMultiValues = [2, 3, 4, 5, 6, 8, 10, 12, 15, 25, 50, 100];    //                          
var freeMultiValues = [
    [2, 5, 10, 100],   //                             
    [3, 6, 12, 50]     //                                
];
var freeSpinCount = 5;      //                          

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.FreeSpinOption = function (player, select) {
    this.freeSpinType = Number(select);
    this.freeSpinCacheList = this.freeSpinData[this.freeSpinType + 1];
    this.freeSpinLength = freeSpinCount;
    this.freeSpinIndex = 1;
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.lines = {};


    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        this.freeSpinData = viewCache.view;
        this.view = this.freeSpinData[0];

        this.freeSpinWinMoney = 0;
        this.scatterCount = NumberOfScatters(this.view);
        this.freeSpinLevel = 1;
        this.freeSpinMaxLevel = 1;
        this.scatterAddCount = this.scatterCount;
        this.freeSpinLevelAddCount = 0;
        this.currentGame = "FREE";
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.lines = WinLinesFromView(this.view, player.betPerLine); //                                    
    this.view = GetFinalView(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.FreeSpin = function (player) {
    var multiView = this.freeSpinCacheList[this.freeSpinIndex - 1];

    this.winMoney = WinFromView(multiView, player.betPerLine);
    this.lines = WinLinesFromView(multiView, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinWinMoney += this.winMoney;
    this.view = GetFinalView(multiView);

    this.scatterAddCount = NumberOfScatters(this.view);
    this.scatterCount += this.scatterAddCount;
    this.freeSpinLevelAddCount = 0;
    this.freeSpinAdd = 0;

    if (this.scatterCount >= this.scatterLimit) {
        this.freeSpinLevelAddCount = Math.floor(this.scatterCount / this.scatterLimit);
        this.freeSpinMaxLevel = Util.min(this.freeSpinMaxLevel + this.freeSpinLevelAddCount, 4);
        this.scatterCount = this.scatterCount % this.scatterLimit;
    }

    this.freeSpinIndex++;

    if (this.freeSpinIndex > this.freeSpinLength) {
        if (this.freeSpinMaxLevel * freeSpinCount > this.freeSpinLength) {       //                            ...
            this.freeSpinLength += freeSpinCount;
            this.freeSpinLevel++;
            this.freeSpinAdd = 1;
        }
        else
            this.currentGame = "BASE";
    }
};

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
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin);
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinStore = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterCount = NumberOfScatters(scatterView);

    freeSpinStore.push(scatterView);

    var MegaCache = RandomFreeViewCache(freeReels, bpl, fsWin, scatterCount, 0);
    var UltraCache = RandomFreeViewCache(freeReels, bpl, fsWin, scatterCount, 1);

    freeSpinStore.push(MegaCache.cache);
    freeSpinStore.push(UltraCache.cache);

    var pattern = {
        view: freeSpinStore,
        bpl: bpl,
        win: Util.max(MegaCache.win, UltraCache.win),
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinStore = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterCount = NumberOfScatters(scatterView);

    freeSpinStore.push(scatterView);

    var MegaCache = BuyBonusViewCache(freeReels, bpl, scatterCount, 0);
    var UltraCache = BuyBonusViewCache(freeReels, bpl, scatterCount, 1);

    freeSpinStore.push(MegaCache.cache);
    freeSpinStore.push(UltraCache.cache);

    var pattern = {
        view: freeSpinStore,
        bpl: bpl,
        win: Util.max(MegaCache.win, UltraCache.win),
        type: "FREE",
        isCall: 0
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
    var tmpView, tmpWin, jackpot = [];

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView
};

var RandomView = function (reels, freeSpinMulti = 0) {
    var view = [];


    while (true) {
        var multi = 1;  //                              ...

        if (freeSpinMulti) {
            multi = freeSpinMulti;
        }
        else if (Util.probability(percentList.multiHighPercent))
            multi = wildMultiValues[Util.random(0, wildMultiValues.length)];
        else if (Util.probability(percentList.multiLowPercent))
            multi = wildMultiValues[Util.random(0, wildMultiValues.length / 2)];
        else
            multi = wildMultiValues[Util.random(0, wildMultiValues.length / 4)];

        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];

                if (view[viewPos] == wild) {      //                             

                    view[viewPos] = wild + 100 * multi;
                }
            }
        }

        if (!isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl) {
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

        if (WinFromView(view, bpl) == 0 && isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
}

///                         ,           n                    
var RandomFreeViewCache = function (reels, bpl, fsWin, scatterCount, freeSpinType) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, scatterCount, freeSpinType);

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

var BuyBonusViewCache = function (reels, bpl, _scatterCount, freeSpinType) {
    var freeSpinCacheList = [];
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = freeSpinCount;
    var scatterCount = _scatterCount;
    var scatterLimit = 5;
    var freeSpinLevel = 1;
    var freeSpinMaxLevel = 1;
    var scatterAddCount = scatterCount;
    var freeSpinLevelAddCount = 0;

    var tmpView;

    while (true) {
        while (true) {
            tmpView = RandomView(reels, freeMultiValues[freeSpinType][freeSpinLevel - 1]);
            tmpWin = WinFromView(tmpView, bpl);
            if (NumberOfScatters(tmpView) && Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                if (NumberOfScatters(tmpView)) {  //                      
                    if (!freeSpinType && Util.probability(percentList.megaAddPercent))   //                          
                        break;
                    if (freeSpinType && Util.probability(percentList.ultraAddPercent))   //                             
                        break;
                }
                else
                    break;
            }
        }
        scatterAddCount = NumberOfScatters(tmpView);
        scatterCount += scatterAddCount;
        if (scatterCount >= scatterLimit) {
            freeSpinLevelAddCount = Math.floor(scatterCount / scatterLimit);
            freeSpinMaxLevel = Util.min(freeSpinLevel + freeSpinLevelAddCount, 4);
            scatterCount = scatterCount % scatterLimit;
        }

        freeSpinCacheList.push(tmpView);
        freeSpinTotalWin += tmpWin;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            if (freeSpinMaxLevel * freeSpinCount > freeSpinLength) {
                freeSpinLength += freeSpinCount;
                freeSpinLevel++;
            }
            else
                break;
        }
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin,
    };
};

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
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

    var multi = MultiFromArr(lineSymbols);

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    //                                
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol && !isWild(lineSymbols[i]))
            break;  //                                                    
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        . 
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl * multi;
    return winPay;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var wildLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
            var multi = MultiFromArr(lineSymbols);
            if (multi > 1) {
                wildLines.push(`${lineId}~${multi}`);
            }
        }
    }
    return {
        winLines: winLines,
        wildLines: wildLines
    };
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
    return (symbol % 100) == wild;
};

var MultiFromArr = function (arr) {
    var result = 1;
    for (var i = 0; i < arr.length; i++) {
        if (isWild(arr[i])) {
            result = Math.floor(arr[i] / 100);
            break;
        }
    }
    return result;
};

var GetFinalView = function (view) {
    var result = Util.clone(view);
    for (var i = 0; i < view.length; i++) {
        if (isWild(result[i])) {
            result[i] %= 100;
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

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
}

module.exports = SlotMachine;