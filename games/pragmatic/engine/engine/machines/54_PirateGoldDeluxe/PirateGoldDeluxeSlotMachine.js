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
    this.winLines = [];
    this.moneyCache = {};
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
    this.jackpotType = ["BONUS"];

    //                    
    this.buyMulti = 100;
    this.buyPatternCount = 100;
};

var wild = 2;
var slotWidth = 5, slotHeight = 4;
var baseReels = [
    [11, 8, 8, 3, 9, 5, 7, 5, 3, 3, 3, 4, 10, 6, 6, 6, 4, 8, 8, 10, 6, 11, 7, 11, 6, 13, 13, 13, 10, 6, 3, 11, 7, 12, 6, 13, 4, 4, 4],
    [13, 13, 13, 11, 3, 2, 2, 2, 11, 5, 10, 3, 3, 3, 13, 9, 3, 3, 13, 9, 7, 5, 13, 2, 4, 4, 4, 6, 9, 2, 12, 8],
    [3, 3, 3, 13, 9, 7, 9, 8, 4, 13, 13, 13, 5, 10, 12, 13, 8, 8, 8, 6, 2, 2, 2, 4, 4, 4, 5, 5, 12, 5, 11, 5, 2, 11, 11, 10, 6, 3, 12, 7, 8, 8],
    [5, 5, 5, 11, 4, 4, 4, 10, 7, 7, 7, 13, 3, 3, 3, 13, 13, 13, 13, 8, 8, 8, 4, 5, 5, 13, 4, 9, 5, 11, 5, 10, 9, 4, 10, 2, 2, 2, 12, 9, 9, 6, 6, 6, 8, 9, 2, 10],
    [8, 8, 8, 8, 6, 6, 9, 4, 7, 7, 7, 9, 9, 6, 9, 8, 13, 13, 13, 9, 12, 5, 5, 5, 13, 4, 4, 4, 9, 3, 3, 3, 11, 10, 5, 9, 5, 10, 9, 11, 5, 3, 5, 9, 4, 9, 3, 11, 3, 13, 6, 6, 6, 2, 2, 2]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 10, 10, 10, 6, 6, 4, 4, 4, 4, 0, 0],
    [0, 0, 0, 50, 50, 25, 25, 20, 20, 10, 10, 8, 8, 0, 0],
    [0, 0, 0, 250, 250, 150, 150, 100, 100, 40, 40, 20, 20, 0, 0]
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

var moneySymbol = 13;
var emptySymbol = 14;
var moneyWinCount = 8;
var moneyBonusLength = 3;
var moneyValueList = [2, 4, 8, 12, 16, 20, 40, 50, 60, 80, 100, 160, 200, 240, 300, 400, 1000];
var moneyBagTypeArray = ['mo1', 'mo1', 'mo1', 'mo2', 'mo2',];
var moneyMultiArray = [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5,];
var percentList = {
    moneyJackpotPercent: 3,
    moneyHighPercent: 5,
    moneyMediumPercent: 10,
    moneyLowPercent: 20,
    moneyAppearPercent: 15,     //                                                    
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
        this.moneyCache = RandomMoneySymbols(this.view);
    } else if (viewCache.type == "BONUS") {
        this.moneyBonusCacheList = viewCache.view;
        var firstCache = this.moneyBonusCacheList[0];

        this.view = firstCache.view;
        this.moneyCache = firstCache.moneyCache;

        this.rsb_mu = 0;
        this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine);

        this.moneyCacheIndex = 1;
        this.moneyBonusLength = moneyBonusLength;

        this.currentGame = "BONUS";

    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;

    this.moneyBonusCache = this.moneyBonusCacheList[this.moneyCacheIndex];
    this.view = this.moneyBonusCache.view;
    this.moneyCache = this.moneyBonusCache.moneyCache;

    if (this.moneyCache.table.includes("m")) {
        this.rsb_mu += this.moneyCache.values[this.moneyCache.table.indexOf('m')];
    }
    var multi = 1;
    if (this.rsb_mu > 0) {
        multi = this.rsb_mu;
    }

    this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine) * multi;

    if (++this.moneyCacheIndex >= this.moneyBonusCacheList.length) {
        this.winMoney = this.moneyBonusWin;
        this.currentGame = "BASE";
    }
}

//PlayerModel    GeneratePatterns                                                 2022-01-18 Julian
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
//PlayerModel                                    
SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default: break;
    }
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var moneyBonusData = RandomBonusViewCache(baseReels, bpl, bsWin);

    var pattern = {
        view: moneyBonusData.view,
        bpl: bpl,
        win: moneyBonusData.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
}

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var moneyBonusData = BuyBonusViewCache(baseReels, bpl);

    return {
        win: moneyBonusData.win,
        bpl: bpl,
        view: moneyBonusData.view,
        type: "BONUS",
        isCall: 0
    }
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
        if (!isMoneyBonusWin(view)) {
            if (NumberOfMoneySymbols(view)) {
                if (Util.probability(percentList.moneyAppearPercent / 7)) {
                    break;
                }
            }
            else
                break;
        }
    }
    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var moneyBonusData = BuyBonusViewCache(reels, bpl);

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

var BuyBonusViewCache = function (reels, bpl) {
    var moneyBonusCacheList = []; //                
    var moneyBonusIndex = 0; //                                    

    var totalMulti = 0;
    var multied = false; //                                          ...    

    var tmpView = [];
    var moneyCache = DefaultMoneyCache(); //                  


    while (true) {
        tmpView = RandomView(reels);
        if (WinFromView(tmpView, bpl) == 0 && NumberOfMoneySymbols(tmpView) == 0) {
            break;
        }
    }

    var randomPosArray = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight); //                                      
    var pos = 0; //randomPosArray[i], multied                                               

    moneyWinCount = Util.random(8, 10);

    for (var i = 0; i < moneyWinCount; i++) {
        pos = randomPosArray.shift();
        tmpView[pos] = moneySymbol;
        moneyCache.table[pos] = 'v';
        moneyCache.values[pos] = moneyValueList[Util.random(0, moneyValueList.length / 2)];
    }

    var currentMulti = moneyCache.values.reduce((total, value) => total + value, 0);    //                                                             
    var purpleMoneyLimit = Util.random(3, 7);   //                                                                                    
    var redMoneyLimit = Util.random(1, 4);      //                                                                                 
    var purpleMoneyCount = 0;
    var redMoneyCount = 0;

    moneyBonusCacheList.push({
        count: 0,
        view: tmpView,
        moneyCache: {
            values: [...moneyCache.values],
            table: [...moneyCache.table],
        },
    })

    while (moneyBonusIndex < moneyBonusLength) {
        lastCache = moneyBonusCacheList[moneyBonusCacheList.length - 1];
        tmpView = Util.clone(lastCache.view);
        moneyCache = {
            values: [...moneyCache.values],
            table: [...moneyCache.table]
        };

        if (multied) {
            multied = false;
            moneyCache.table[pos] = "r";
            moneyCache.values[pos] = 0;
            tmpView[pos] = emptySymbol;
        }

        moneyBonusIndex++;

        if (randomPosArray.length > 1) {      //                                     ,               2               ,                                 .
            if (Util.probability(34) && (purpleMoneyCount < purpleMoneyLimit || redMoneyCount < redMoneyLimit)) {
                moneyBonusIndex = 0;        //                                       
                pos = randomPosArray.shift();

                moneyCache.table[pos] = moneyBagTypeArray[Util.random(0, moneyBagTypeArray.length)];
                tmpView[pos] = moneySymbol;

                if (moneyCache.table[pos] == "mo1" && purpleMoneyCount >= purpleMoneyLimit) {
                    moneyCache.table[pos] = "mo2";
                } else if (moneyCache.table[pos] == "mo2" && redMoneyCount >= redMoneyLimit) {
                    moneyCache.table[pos] = "mo1";
                }

                if (moneyCache.table[pos] == "mo1") {
                    ++purpleMoneyCount;
                    moneyCache.values[pos] = currentMulti;
                } else {
                    ++redMoneyCount;
                    moneyCache.values[pos] = moneyCache.values.reduce((total, value) => total + value, 0);
                }
            }
            if (Util.probability(22) && NumberOfBags(moneyCache.table) >= 4) { //                                     4                       
                pos = randomPosArray[Util.random(1, randomPosArray.length)];

                moneyCache.table[pos] = "m";
                tmpView[pos] = moneySymbol;
                moneyCache.values[pos] = moneyMultiArray[Util.random(0, moneyMultiArray.length)];

                totalMulti += moneyCache.values[pos];
                multied = true;
            }
        }

        moneyBonusCacheList.push({
            count: moneyBonusIndex,
            view: tmpView,
            moneyCache: moneyCache
        });
    }

    return {
        win: MoneyWinFromCache(moneyCache, bpl) * (totalMulti > 0 ? totalMulti : 1),
        view: moneyBonusCacheList
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

var NumberOfBags = function (table) {
    var result = 0;

    for (var i = 0; i < table.length; ++i)
        if (table[i] == "mo1" || table[i] == 'mo2')
            ++result;
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isMoneyBonusWin = function (view) {
    return NumberOfMoneySymbols(view) >= 8;
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

var RandomMoneyFromArr = function (moneyValueList) {
    var value = moneyValueList[1];
    if (Util.probability(percentList.moneyJackpotPercent)) {
        value = moneyValueList[Util.random(1, moneyValueList.length)];
    } else
        if (Util.probability(percentList.moneyHighPercent)) {
            value = moneyValueList[Util.random(1, moneyValueList.length)];
        } else if (Util.probability(percentList.moneyMediumPercent)) {
            value = moneyValueList[Util.random(1, moneyValueList.length / 2)];
        } else if (Util.probability(percentList.moneyLowPercent)) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 4)];
        }
    return value;
};

var RandomMoneySymbols = function (view) {
    var values = [];
    var table = [];

    for (var i = 0; i < view.length; i++) {
        if (!isMoney(view[i])) {
            values[i] = 0;
            table[i] = "r";
            continue;
        }
        values[i] = RandomMoneyFromArr(moneyValueList);
        table[i] = tableFromValue(values[i]);
    }
    return { table, values };
};

var tableFromValue = function (value) {
    switch (Number(value)) {
        case 20000: return "jp1";
        case 4000: return "jp2";
        case 1000: return "jp3";
        case 0: return "r";
    }
    return "v";
};

var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        if (moneyCache.table[i] != "m")
            win += moneyCache.values[i];
    }
    return win * bpl;
}
module.exports = SlotMachine;