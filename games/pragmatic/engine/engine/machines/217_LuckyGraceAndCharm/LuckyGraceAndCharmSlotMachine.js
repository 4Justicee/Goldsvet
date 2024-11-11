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
    //                           
    this.scatterWin = 0;
    this.scatterPositions = [];

    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];
    //                        
    this.moneyBonusWin = 0;
    this.moneyBonusIndex = 0;
    this.moneyBonusLevel = 0;
    this.isMoneyLevelUp = 0;
    this.moneyBonusView = [];       // 5 * 20              
    this.moneyBonusValues = [];      // 5 * 20                    
    this.moneyBonusCacheList = [];
    this.moneyBonusCache = {};
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [11, 9, 5, 11, 9, 5, 13, 1, 11, 7, 13, 11, 7, 12, 9, 5, 11, 9, 5, 13, 11, 6, 8, 9, 4, 11, 9, 1, 11, 9, 3, 11, 9, 2, 13, 11, 10, 9, 11, 14, 14, 14],
    [10, 8, 6, 10, 1, 8, 6, 12, 10, 7, 12, 10, 7, 8, 10, 6, 8, 10, 6, 13, 12, 5, 11, 10, 1, 8, 10, 3, 11, 10, 4, 9, 8, 2, 12, 10, 8, 14, 14],
    [5, 11, 9, 5, 11, 9, 5, 11, 1, 13, 5, 11, 9, 3, 11, 9, 3, 13, 11, 5, 13, 11, 5, 13, 9, 7, 13, 9, 7, 11, 13, 1, 11, 9, 2, 11, 9, 7, 11, 9, 7, 13, 3, 5, 14, 14, 14, 12, 4, 6, 10, 8],
    [11, 9, 5, 11, 9, 5, 13, 1, 9, 5, 13, 9, 5, 12, 10, 4, 12, 10, 4, 11, 9, 4, 11, 8, 3, 11, 13, 1, 11, 10, 7, 11, 13, 2, 11, 12, 3, 11, 9, 7, 11, 8, 6, 14, 14, 14, 14],
    [11, 9, 5, 11, 1, 9, 5, 13, 9, 5, 13, 9, 5, 12, 10, 4, 12, 10, 4, 11, 9, 4, 11, 8, 3, 11, 13, 1, 11, 10, 7, 11, 1, 13, 2, 11, 12, 3, 11, 9, 7, 11, 8, 6, 14, 14, 14]
];
var freeReels = [
    [13, 12, 7, 11, 10, 6, 9, 8, 1, 13, 10, 7, 12, 8, 5, 11, 9, 7, 13, 9, 1, 10, 12, 1, 6, 8, 11, 5, 13, 12, 4, 11, 9, 3, 10, 8, 2, 1],
    [12, 10, 6, 12, 10, 1, 12, 8, 6, 12, 10, 5, 8, 10, 6, 10, 8, 1, 12, 10, 5, 12, 10, 6, 12, 8, 6, 12, 10, 5, 12, 10, 5, 12, 10, 8, 1, 4, 2, 13, 11, 9, 7, 3],
    [13, 11, 7, 13, 11, 7, 13, 11, 4, 13, 9, 3, 11, 13, 1, 11, 9, 4, 11, 1, 13, 9, 7, 11, 9, 4, 13, 11, 3, 13, 9, 7, 11, 9, 3, 1, 2, 12, 10, 8, 6, 5],
    [13, 12, 7, 11, 10, 6, 9, 8, 3, 11, 12, 5, 13, 8, 1, 9, 10, 7, 11, 12, 1, 13, 9, 3, 10, 12, 4, 13, 9, 2, 11, 8, 5, 11, 8, 6, 13, 10, 7, 1],
    [13, 12, 7, 11, 1, 10, 6, 9, 8, 3, 13, 9, 1, 8, 10, 7, 12, 8, 5, 11, 9, 2, 13, 9, 1, 8, 10, 4, 13, 11, 5, 12, 10, 7, 12, 11, 6, 1]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 10, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 250, 25, 25, 15, 15, 20, 10, 10, 5, 5, 5, 5, 0, 0],
    [0, 0, 2500, 125, 125, 75, 75, 100, 50, 50, 25, 25, 25, 25, 0, 0],
    [0, 0, 9000, 750, 750, 250, 250, 400, 125, 125, 100, 100, 100, 100, 0, 0]
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [5, 1, 2, 3, 9], // 4
    [5, 11, 12, 13, 9], // 5
    [10, 6, 2, 8, 14], // 6
    [0, 6, 12, 8, 4], // 7
    [10, 11, 7, 3, 4], // 8
    [0, 1, 7, 13, 14], // 9
    [10, 6, 7, 8, 4], // 10
];
var moneyValueList = [5, 10, 20, 30, 60];
var freeSpinCount = 12;
var moneySymbol = 14, emptySymbol = 15;
var moneyBonusLength = 4;
var percentList = {
    scatterWinPercent: 22,
    scatterManyPercent: 34,
    freeWinPercent: 12,
    moneyHighPercent: 7,
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
        this.view = this.freeSpinCacheList[0];
        this.freeSpinLength = freeSpinCount;
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = 0;
        this.currentGame = "FREE";
    }

    if (viewCache.type == "BONUS") {
        this.moneyBonusCacheList = viewCache.view;
        this.view = this.moneyBonusCacheList[0].view;
        this.moneyBonusIndex = 1;
        this.moneyBonusWin = 0;
        this.moneyBonusLevel = 0;
        this.moneyCache = {
            table: GetTableFromValues(this.moneyBonusCacheList[0].values),
            values: this.moneyBonusCacheList[0].values
        };
        this.currentGame = "BONUS";
    } else {
        this.moneyCache = RandomMoneySymbols(this.view);
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.SpinProcess(player);
    //                   
    if (viewCache.type == "FREE") {
        this.freeSpinBeforeMoney = this.winMoney;
    }
};

SlotMachine.prototype.SpinProcess = function (player) {
    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.scatterWin = ScatterWinFromView(this.view, Number(player.virtualBet));

    if (this.scatterWin) {
        this.scatterPositions = ScatterPositions(this.view);
    } else {
        this.scatterPositions = [];
    }

    this.winMoney += this.scatterWin;
}

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.SpinProcess(player);
    this.moneyCache = RandomMoneySymbols(this.view);

    this.scatterWin *= 3;
    this.winMoney *= 3;

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.freeSpinWinMoney += this.freeSpinBeforeMoney;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    var cache = this.moneyBonusCacheList[this.moneyBonusIndex];
    this.moneyBonusCache = cache;
    this.view = cache.view;

    if (this.moneyBonusIndex == 1) {
        this.moneyCache.table = Util.sameArray(slotWidth * 20, 'r');
        this.moneyCache.values = Util.sameArray(slotWidth * 20, 0);
    }

    for (var i = 0; i < slotHeight * slotWidth; ++i) {
        if (cache.values[i]) {
            var pos = i + this.moneyBonusLevel * 10;  //                                    

            if (this.moneyCache.values[pos] == 0) {   //                            
                this.moneyCache.table[pos] = 'v';
                this.moneyCache.values[pos] = cache.values[i];
                this.moneyBonusWin += cache.values[i] * player.betPerLine;
            }
        }
    }

    this.isMoneyLevelUp = 0;

    if (cache.isMoneyLevelUp) {
        ++this.moneyBonusLevel;
        this.isMoneyLevelUp = 1;
    }

    this.moneyBonusIndex++;

    if (this.moneyBonusIndex >= this.moneyBonusCacheList.length) {
        this.winMoney = this.moneyBonusWin;
        while (true) {
            this.view = RandomZeroView(baseReels, player.betPerLine);
            if (NumberOfMoneySymbols(this.view) == 0) {
                break;
            }
        }
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var scatterCount = 3;

    if (fsWin > totalBet * 50 && Util.probability(percentList.scatterManyPercent)) {
        scatterCount = Util.random(3, 5);
    }

    var scatterView = RandomScatterView(baseReels, bpl, scatterCount);
    var scatterWin = ScatterWinFromView(scatterView, totalBet);

    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, freeSpinCount);

    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWin,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var moneyBonusData = RandomBonusViewCache(baseReels, bpl, bsWin, isCall);

    var pattern = {
        view: moneyBonusData.cache,
        bpl: bpl,
        win: moneyBonusData.win,
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
        tmpWin = WinFromView(tmpView, bpl) + ScatterWinFromView(tmpView);

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            if (NumberOfScatters(tmpView)) {
                if (Util.probability(percentList.scatterWinPercent)) {
                    break;
                }
            } else {
                break;
            }
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
        tmpWin = WinFromView(tmpView, bpl) + ScatterWinFromView(tmpView);

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

        if (!isFreeSpinWin(view) && !isMoneySpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl, nScatters = 3) {
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

        if (isFreeSpinWin(view) && !isMoneySpinWin(view) && WinFromView(view, bpl) == 0 && NumberOfScatters(view) == nScatters) {
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
        var tmpView;
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;

        while (freeSpinIndex <= freeSpinLength) {
            while (true) {
                tmpView = RandomView(reels);
                tmpWin = WinFromView(tmpView, bpl) + ScatterWinFromView(tmpView);

                if (tmpWin > 0 && Util.probability(percentList.freeWinPercent) || WinFromView(tmpView) == 0) {
                    break;
                }
            }

            freeSpinCacheList.push({
                view: tmpView
            }
            );

            freeSpinTotalWin += tmpWin * 3;
            freeSpinIndex++;
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin
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
        var moneyBonusIndex = 1; //                                    
        var moneyBonusTotal = 0;
        var moneyBonusLevel = 0;

        var totalMulti = 0;
        var multied = false; //                                          ...    
        var tmpView = [];
        var values = DefaultMoneyCache().values; //                  

        while (true) {
            tmpView = RandomView(reels);
            if (WinFromView(tmpView, bpl) == 0 && NumberOfMoneySymbols(tmpView) == 0 && NumberOfScatters(tmpView) == 0) {
                break;
            }
        }

        var randomPosArray = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight); //                                      
        var pos = 0; //randomPosArray[i], multied                                               
        var moneyAddCount = 0;

        moneyWinCount = Util.random(5, 7);

        for (var i = 0; i < moneyWinCount; i++) {
            pos = randomPosArray.shift();
            tmpView[pos] = moneySymbol;
            values[pos] = moneyValueList[Util.random(0, moneyValueList.length / 4)];
            moneyBonusTotal += values[pos];
        }

        moneyBonusCacheList.push({
            view: [...tmpView],
            values: [...values],
        })

        for (var i = 0; i < tmpView.length; ++i) {
            if (!isMoney(tmpView[i])) {
                tmpView[i] = emptySymbol;
            }
        }
        //                  
        var isMoneyLevelUp = 0;

        while (moneyBonusIndex <= moneyBonusLength) {
            if (multied) {
                multied = false;
                values[pos] = 0;
                tmpView[pos] = moneyBonusCacheList[moneyBonusCacheList.length - 2].view[pos];    //                                       ...
            }

            moneyBonusIndex++;

            if (Util.probability(34) && moneyBonusLevel < 5) {
                var addCount = Util.random(1, 3);

                if (randomPosArray.length == 1) {
                    addCount = 1;
                }

                while (addCount) {
                    ++moneyAddCount;
                    moneyBonusIndex = 1;        //                                             

                    pos = randomPosArray.shift();
                    values[pos] = RandomMoneyFromArr(moneyValueList);
                    tmpView[pos] = moneySymbol;
                    moneyBonusTotal += values[pos];

                    --addCount;
                }
            }
            // if (isCall && Util.probability(12) && moneyAddCount >= 4) { //                          4                       
            //     pos = randomPosArray[Util.random(1, randomPosArray.length)];
            //     values[pos] = moneyMultiArray[Util.random(0, moneyMultiArray.length)];

            //     totalMulti += values[pos];
            //     multied = true;
            //     tmpView[pos] = moneySymbol;
            // }

            var cache = {
                count: moneyBonusIndex,
                view: [...tmpView],
                values: [...values]
            };

            if (isMoneyLevelUp) {
                cache.isMoneyLevelUp = 1;
                isMoneyLevelUp = 0;
            }

            moneyBonusCacheList.push(cache);

            if (randomPosArray.length == 0) {
                for (var i = slotWidth; i < slotWidth * slotHeight; ++i) {
                    randomPosArray.push(i);
                }

                Util.shuffle(randomPosArray);
                tmpView = GetMovedView(tmpView, 15);
                values = GetMovedView(values, 0);
                ++moneyBonusLevel;
                isMoneyLevelUp = 1;
            }
        }

        var moneyBonusData = {
            win: moneyBonusTotal * (totalMulti > 0 ? totalMulti : 1) * bpl,
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

var GetMovedView = function (view, value) {
    var res = [];

    for (var i = 0; i < 5; ++i) {
        res.push(view[i + 10]);
    }

    for (var i = 5; i < 15; ++i) {
        res.push(value);
    }

    return res;
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
                `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;
    var multi = 1;

    for (var i = 0; i < lineSymbols.length; i++) { //                                       
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                          
        if (isWild(lineSymbols[i])) {
            multi = 2;  //                           
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

    return payTable[matchCount][symbol] * bpl * (symbol == wild ? 1 : multi); //                                      
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
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

var ScatterWinFromView = function (view, totalBet) {
    var nScatters = NumberOfScatters(view);
    switch (nScatters) {
        case 2: return totalBet * 2;
        case 3: return totalBet * 5;
        case 4: return totalBet * 20;
        case 5: return totalBet * 500;
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

var isMoneySpinWin = function (view) {
    return NumberOfMoneySymbols(view) >= 5;
}

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

var RandomMoneyFromArr = function (moneyValueList) {
    var value = moneyValueList[0];

    if (Util.probability(percentList.moneyHighPercent)) {
        value = moneyValueList[Util.random(0, moneyValueList.length)];
    } else {
        value = moneyValueList[Util.random(0, moneyValueList.length / 2)];
    }

    return value;
}

//                             
var RandomMoneySymbols = function (view) {
    var values = [];
    for (var i = 0; i < view.length; i++) {
        if (!isMoney(view[i])) {
            values[i] = 0;
            continue;
        }
        values[i] = RandomMoneyFromArr(moneyValueList);
    }

    var table = GetTableFromValues(values);
    return { table, values };
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
        case 0: return "r";
    }
    return "v";
}

module.exports = SlotMachine;