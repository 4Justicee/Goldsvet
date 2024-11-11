var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 40;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.moneyCache = {};
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];
    //                              
    this.moneyBonusWin = 0;
    this.moneyCacheIndex = 0;
    this.moneyBonusLength = 3;
    this.moneyBonusCacheList = [];
    this.moneyBonusCache = {};

    this.moneyBonusMultiIndex = 0;
    this.moneyBonusMulti = 0;
    this.moneyBonusCacheIndex = 0;
    this.rsb_mu = 0;

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
    this.baseWinPercent = 20;
};

var scatter = 1;
var wild = 2;
var baseReels = [
    [8, 10, 3, 3, 3, 3, 11, 9, 8, 8, 6, 6, 5, 5, 7, 7, 4, 4, 4, 4, 9, 6, 6, 13, 13, 13, 10, 12, 5, 5, 11, 8, 8, 7, 7],
    [11, 10, 9, 1, 12, 5, 5, 7, 7, 6, 6, 2, 2, 11, 9, 7, 7, 3, 3, 3, 3, 10, 8, 8, 6, 6, 13, 13, 13, 13, 4, 4, 4, 4, 5, 5, 8, 8],
    [8, 10, 6, 6, 7, 7, 3, 3, 3, 3, 1, 11, 9, 5, 5, 8, 8, 13, 13, 13, 13, 6, 6, 2, 2, 11, 4, 4, 4, 4, 5, 5, 12, 9, 8, 8, 10, 7, 7],
    [8, 11, 13, 13, 13, 13, 3, 3, 3, 3, 10, 9, 1, 12, 7, 7, 7, 7, 6, 6, 6, 6, 2, 2, 2, 2, 10, 4, 4, 4, 4, 5, 5, 5, 5, 9, 8, 8, 8, 8, 11],
    [8, 11, 9, 10, 6, 6, 6, 6, 2, 2, 2, 2, 10, 12, 4, 4, 4, 4, 9, 3, 3, 3, 3, 13, 13, 13, 13, 13, 5, 5, 5, 5, 11, 8, 8, 8, 8, 7, 7, 7, 7]
];
var freeReels = [
    [8, 10, 3, 3, 3, 3, 11, 9, 8, 8, 6, 6, 5, 5, 7, 7, 4, 4, 4, 4, 9, 6, 6, 13, 13, 13, 10, 12, 5, 5, 11, 8, 8, 7, 7],
    [11, 10, 9, 1, 12, 5, 5, 7, 7, 6, 6, 2, 2, 11, 15, 15, 15, 15, 9, 7, 7, 16, 16, 16, 16, 10, 8, 8, 6, 6, 13, 13, 13, 13, 5, 5, 8, 8],
    [8, 10, 16, 16, 16, 16, 6, 6, 7, 7, 1, 11, 9, 15, 15, 15, 15, 5, 5, 8, 8, 13, 13, 13, 13, 6, 6, 2, 2, 11, 5, 5, 12, 9, 8, 8, 10, 7, 7],
    [8, 11, 13, 13, 13, 13, 10, 16, 16, 16, 16, 9, 1, 12, 7, 7, 7, 7, 6, 6, 6, 6, 15, 15, 15, 15, 2, 2, 2, 2, 10, 5, 5, 5, 5, 9, 8, 8, 8, 8, 11],
    [8, 11, 9, 10, 6, 6, 6, 6, 2, 2, 2, 2, 10, 16, 16, 16, 16, 12, 9, 13, 13, 13, 13, 13, 5, 5, 5, 5, 11, 15, 15, 15, 15, 8, 8, 8, 8, 7, 7, 7, 7]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 20, 15, 15, 10, 10, 5, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 100, 100, 50, 50, 40, 40, 25, 25, 15, 15, 0, 0, 0, 0],
    [0, 0, 0, 500, 500, 300, 300, 200, 200, 75, 75, 50, 50, 0, 0, 0, 0]
];
var payLines = [
    [0, 1, 2, 3, 4],        // 1
    [15, 16, 17, 18, 19],   // 2
    [5, 6, 7, 8, 9],        // 3
    [10, 11, 12, 13, 14],   // 4
    [0, 6, 12, 8, 4],       // 5
    [15, 11, 7, 13, 19],    // 6
    [10, 6, 2, 8, 14],      // 7
    [5, 11, 17, 13, 9],     // 8
    [0, 6, 2, 8, 4],        // 9
    [15, 11, 17, 13, 19],   // 10
    [5, 1, 7, 3, 9],        // 11
    [10, 16, 12, 18, 14],   // 12
    [5, 11, 7, 13, 9],      // 13
    [10, 6, 12, 8, 14],     // 14
    [0, 6, 7, 8, 4],        // 15
    [15, 11, 12, 13, 19],   // 16
    [5, 1, 2, 3, 9],        // 17
    [10, 16, 17, 18, 14],   // 18
    [5, 11, 12, 13, 9],     // 19
    [10, 6, 7, 8, 14],      // 20
    [0, 1, 7, 3, 4],        // 21
    [15, 16, 12, 18, 19],   // 22
    [5, 6, 2, 8, 9],        // 23
    [10, 11, 17, 13, 14],   // 24
    [5, 6, 12, 8, 9],       // 25
    [10, 11, 7, 13, 14],    // 26
    [0, 1, 12, 3, 4],       // 27
    [15, 16, 7, 18, 19],    // 28
    [10, 11, 2, 13, 14],    // 29
    [5, 6, 17, 8, 9],       // 30
    [0, 11, 12, 13, 4],     // 31
    [15, 6, 7, 8, 19],      // 32
    [10, 1, 2, 3, 14],      // 33
    [5, 16, 17, 18, 14],    // 34
    [5, 1, 12, 3, 9],       // 35
    [10, 16, 7, 18, 14],    // 36
    [5, 11, 2, 13, 9],      // 37
    [10, 6, 17, 8, 14],     // 38
    [0, 11, 2, 13, 4],      // 39
    [15, 6, 17, 8, 19],     // 40
];
var pirateMale = 3, pirateFemale = 4;
var wildMale = 15, wildFemale = 16;
var moneySymbol = 13;
var freeSpinCount = 10;
var slotWidth = 5, slotHeight = 4;
var moneyWinCount = 8;
var moneyBonusLength = 3;
//var moneyValueList = [40, 60, 80, 100, 160, 200, 240, 280, 320, 400, 560, 640, 720, 800, 960, 2000];
var moneyValueList = [40, 80, 120, 160, 200, 240, 280, 320, 400, 560, 640, 720, 800, 960, 2000];
var moneyMultiArray = [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5,];

var percentList = {
    freeWinPercent: 50,
    moneyJackpotPercent: 5,
    moneyHighPercent: 7,
    moneyMediumPercent: 10,
    moneyLowPercent: 20,
    moneyAppearPercent: 20,     //                                                    
};

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
    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.freeSpinLength = this.freeSpinCacheList.length - 1;
        this.view = this.freeSpinCacheList[0];

        this.freeSpinIndex = 1;
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);

        this.currentGame = "FREE";
    }

    if (viewCache.type == "BONUS") {
        this.moneyBonusCacheList = viewCache.view;
        // this.freeSpinLength = cache.length;

        var firstCache = this.moneyBonusCacheList[0];

        this.view = firstCache.view;
        this.moneyCache = {
            table: GetTableFromValues(firstCache.values),
            values: firstCache.values,
        };
        this.rsb_mu = 0;

        this.moneyCacheIndex = 1;
        this.moneyBonusLength = moneyBonusLength;
        this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine);
        this.currentGame = "BONUS";
    }
    else {
        this.moneyCache = RandomMoneySymbols(this.view);
    }


    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "FREE") {
        this.winMoney += this.scatterWin;       //                          
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = 0;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.moneyCache = this.freeSpinCacheList[this.freeSpinIndex].moneyCache;
    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.freeSpinWinMoney += this.freeSpinBeforeMoney;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var cache = this.moneyBonusCacheList[this.moneyCacheIndex];
    this.moneyBonusCache = cache;

    this.view = cache.view;

    var table = GetTableFromValues(cache.values);
    var moneyCache = {
        table: table,
        values: cache.values,
    };
    this.moneyCache = moneyCache;

    if (table.includes("m")) {
        this.rsb_mu += cache.values[table.indexOf('m')];
    }
    var multi = 1;
    if (this.rsb_mu > 0) {
        multi = this.rsb_mu;
    }

    this.moneyBonusWin = MoneyWinFromCache(moneyCache, player.betPerLine) * multi;

    this.moneyCacheIndex++;
    if (this.moneyCacheIndex >= this.moneyBonusCacheList.length) {
        this.winMoney = this.moneyBonusWin;
        this.currentGame = "BASE";
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = WinFromView(scatterView, bpl) + totalBet;

    freeSpinCacheList.push(scatterView);
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWinMoney, freeSpinCount);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bsCache = RandomBonusViewCache(baseReels, bpl, bsWin, isCall);
    var win = bsCache.win;

    var pattern = {
        view: bsCache.cache,
        bpl: bpl,
        win: win,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
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
        if (!isFreeSpinWin(view) && !isMoneyBonusWin(view)) {
            if (NumberOfMoneySymbols(view)) {
                if (Util.probability(percentList.moneyAppearPercent)) {
                    break;
                }
            }
            else
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
                var pos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[pos] = reels[i][reelPos];
                if (isScatter(view[pos])) {
                    view[pos] = Util.random(3, 13);
                }
            }
        }

        var reelNoArr = [1, 2, 3];

        for (var i = 0; i < reelNoArr.length; i++) {
            var height = Util.random(0, slotHeight);
            var pos = height * slotWidth + reelNoArr[i];
            view[pos] = scatter;
        }

        if (WinFromView(view, bpl)) {
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
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var moneyCache = {};
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (freeSpinIndex <= freeSpinLength) {
            while (true) {
                tmpView = RandomView(reels);
                for (var i = 1; i < slotWidth; i++) {
                    for (var j = 0; j < slotHeight; j++) {
                        var pos = i + j * slotWidth;
                        if (tmpView[pos] == pirateMale) {
                            tmpView[pos] = wildMale;
                        } else if (tmpView[pos] == pirateFemale) {
                            tmpView[pos] = wildFemale;
                        }
                    }
                }
                var win = WinFromView(tmpView, bpl);
                if (Util.probability(percentList.freeWinPercent) || win == 0) {
                    break;
                }
            }

            moneyCache = RandomMoneySymbols(tmpView);
            tmpWin = WinFromView(tmpView, bpl);

            var cache = {
                view: tmpView,
                moneyCache: moneyCache,
            }

            freeSpinCacheList.push(cache);
            freeSpinTotalWin += tmpWin;

            if (NumberOfScatters(tmpView) >= 3) {
                freeSpinLength += freeSpinCount;
            }
            freeSpinIndex++;
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

var RandomBonusViewCache = function (reels, bpl, bsWin, isCall) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;
    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var moneyBonusCacheList = []; //                
        var moneyBonusIndex = 0; //                                    

        var totalMulti = 0;
        var multied = false; //                                          ...    
        var tmpView = [];
        var values = DefaultMoneyCache().values; //                  


        while (true) {
            tmpView = RandomView(reels);
            if (WinFromView(tmpView, bpl) == 0 && NumberOfMoneySymbols(tmpView) == 0) {
                break;
            }
        }

        var randomPosArray = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight); //                                      
        var pos = 0; //randomPosArray[i], multied                                               
        var moneyAddCount = 0;

        moneyWinCount = Util.random(8, 10);

        for (var i = 0; i < moneyWinCount; i++) {
            pos = randomPosArray.shift();
            tmpView[pos] = moneySymbol;
            values[pos] = moneyValueList[Util.random(0, moneyValueList.length / 4)];
        }

        moneyBonusCacheList.push({
            count: 0,
            view: [...tmpView],
            values: [...values],
        })

        while (moneyBonusIndex < moneyBonusLength) {
            lastCache = moneyBonusCacheList[moneyBonusCacheList.length - 1];
            tmpView = Util.clone(lastCache.view);
            values = [...lastCache.values];

            if (multied) {
                multied = false;
                values[pos] = 0;
                tmpView[pos] = moneyBonusCacheList[moneyBonusCacheList.length - 2].view[pos];    //                                       ...
            }

            moneyBonusIndex++;

            if (randomPosArray.length > 1) {      //                                     
                if (Util.probability(34)) {
                    ++moneyAddCount;
                    moneyBonusIndex = 0;        //                                             

                    pos = randomPosArray.shift();
                    values[pos] = RandomMoneyFromArr(moneyValueList);
                    tmpView[pos] = moneySymbol;
                }
                if (isCall && Util.probability(22) && moneyAddCount >= 4) { //                          4                       
                    pos = randomPosArray[Util.random(1, randomPosArray.length)];
                    values[pos] = moneyMultiArray[Util.random(0, moneyMultiArray.length)];

                    totalMulti += values[pos];
                    multied = true;
                    tmpView[pos] = moneySymbol;
                }
            }

            moneyBonusCacheList.push({
                count: moneyBonusIndex,
                view: tmpView,
                values: values
            });
        }

        var moneyBonusData = {
            win: values.reduce((total, value) => total + value, 0) * (totalMulti > 0 ? totalMulti : 1) * bpl,
            cache: moneyBonusCacheList
        };

        if (moneyBonusData.win >= minMoney && moneyBonusData.win <= maxMoney) {
            return moneyBonusData;
        }

        if (moneyBonusData.win > lowerLimit && moneyBonusData.win < minMoney) {
            lowerLimit = moneyBonusData.win;
            lowerView = moneyBonusData;
        }
        if (moneyBonusData.win > maxMoney && moneyBonusData.win < upperLimit) {
            upperLimit = moneyBonusData.win;
            upperView = moneyBonusData;
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

    //                    
    for (var i = 0; i < lineSymbols.length; i++) {
        //                                               
        if (isWild(lineSymbols[i])) {
            continue;
        }

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

    //                                              -1   ,     lineSymbols                        . 
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    return payTable[matchCount][symbol] * bpl;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var ScatterWinFromView = function (view, totalBet) {
    if (isFreeSpinWin(view)) {
        return totalBet * 1;
    }
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

var isWild = function (symbol) {
    return symbol == wild || symbol == wildFemale || symbol == wildMale;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isMoneyBonusWin = function (view) {
    return NumberOfMoneySymbols(view) >= 8;
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

var isMoney = function (symbol) {
    return symbol == moneySymbol;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;

    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
            result++;
        }
    }

    return result;
};

var RandomMoneyFromArr = function (moneyValueList, isBonus = 1) {
    var value = moneyValueList[0];

    if (Util.probability(percentList.moneyJackpotPercent) && isBonus) {
        value = moneyValueList[Util.random(0, moneyValueList.length)];
    } else
        if (Util.probability(percentList.moneyHighPercent) && isBonus) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 2)];
        } else if (Util.probability(percentList.moneyMediumPercent)) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 3)];
        } else if (Util.probability(percentList.moneyLowPercent)) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 4)];
        }

    return value;
};

var RandomMoneySymbols = function (view) {
    var values = [];
    for (var i = 0; i < view.length; i++) {
        if (!isMoney(view[i])) {
            values[i] = 0;
            continue;
        }
        values[i] = RandomMoneyFromArr(moneyValueList, 0);
    }

    var table = GetTableFromValues(values);
    return { table, values };
};

var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        if (moneyCache.table[i] != "m")
            win += moneyCache.values[i];
    }
    return win * bpl;
};

var GetTableFromValues = function (values) {
    var table = [];
    for (var i = 0; i < values.length; i++) {
        table[i] = tableFromValue(values[i])
    }
    return table;
};

var tableFromValue = function (value) {
    switch (Number(value)) {
        case 40000: return "jp1";
        case 8000: return "jp2";
        case 2000: return "jp3";
        case 5: return "m";
        case 3: return "m";
        case 2: return "m";
        case 0: return "r";
    }
    return "v";
}

module.exports = SlotMachine;