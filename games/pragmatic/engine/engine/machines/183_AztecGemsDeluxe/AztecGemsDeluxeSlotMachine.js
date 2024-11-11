var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 9;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.winSymbols = [];
    this.moneyCache = {};
    //                              
    this.moneyBonusWin = 0;
    this.moneyCacheIndex = 0;
    this.moneyBonusLength = 3;
    this.moneyBonusCacheList = [];
    this.moneyBonusCache = {};

    this.moneyBonusMultiIndex = 0;
    this.moneyBonusMulti = 1;
    this.maskSpinIndex = 0;

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];
};

var wild = 2;
var slotWidth = 3, slotHeight = 3;
var moneySymbol = 8;
var moneyWinCount = 8;
var moneyBonusLength = 3;
var moneyValueList = [5, 8, 18, 28, 58, 68, 88, 108, 128, 288, 900];
var multiValueList = [2, 3, 5, 8, 10];
var percentList = {
    moneyHighPercent: 34,
    moneyMediumPercent: 34,
    moneyLowPercent: 34,
    moneyAppearPercent: 15,     //                                                    
};
var baseReels = [
    [6, 6, 6, 2, 5, 5, 5, 5, 4, 3, 7, 6, 8, 3, 3, 3, 4, 4, 4, 7, 7, 7, 4, 7, 5, 8, 7],
    [2, 3, 3, 3, 3, 7, 5, 6, 6, 6, 8, 4, 4, 4, 6, 4, 7, 7, 7, 5, 5, 5, 4, 3, 5, 3, 7, 4, 3, 4, 6, 5, 6, 4],
    [4, 2, 3, 6, 5, 8, 4, 4, 4, 7, 6, 6, 6, 5, 5, 5, 7, 7, 7, 5, 7, 5, 6, 7, 6, 5, 7, 5, 6, 5, 6, 5, 7, 3, 6, 2, 5, 8, 5, 2, 3, 5, 3, 5, 7, 5, 6, 5, 6, 2, 7, 2, 5, 6, 5, 3, 5, 6],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 88, 58, 28, 18, 8, 0, 10]
];
var payLines = [
    [3, 4, 5],
    [0, 1, 2],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [3, 1, 5],
    [3, 7, 5],
    [0, 4, 2],
    [6, 4, 8]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 7; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
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

        this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine);

        this.moneyCacheIndex = 1;
        this.moneyBonusLength = moneyBonusLength;
        this.moneyBonusMulti = 1;
        player.machine.maskSpinIndex = 0;

        this.currentGame = "BONUS";

    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    var { winLines, winSymbols } = WinLinesFromView(this.view, player.betPerLine); //                                        
    this.winLines = winLines;
    this.winSymbols = winSymbols;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;

    if (this.moneyBonusMulti == 1) {  //          1                      
        this.moneyBonusCache = this.moneyBonusCacheList[this.moneyCacheIndex];
        this.view = this.moneyBonusCache.view;
        this.moneyCache = this.moneyBonusCache.moneyCache;

        this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine);

        if (this.moneyBonusCache.count == 3) {
            var lastIdx = this.moneyBonusCacheList.length - 1;
            if (this.moneyCacheIndex < lastIdx) { //                                      
                this.moneyBonusMulti = this.moneyBonusCacheList[lastIdx].multi;
                this.moneyBonusMultiIndex = this.moneyBonusCacheList[lastIdx].idx;
            }
        }
    } else {
        this.maskSpinIndex++;
    }

    if (this.moneyBonusMulti == 1 && ++this.moneyCacheIndex >= this.moneyBonusCacheList.length || this.maskSpinIndex >= 4) {
        this.moneyBonusWin *= this.moneyBonusMulti;
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

    moneyWinCount = Util.random(4, 5);

    for (var i = 0; i < moneyWinCount; i++) {
        pos = randomPosArray.shift();
        tmpView[pos] = moneySymbol;
        moneyCache.table[pos] = 'v';
        moneyCache.values[pos] = moneyValueList[Util.random(0, moneyValueList.length - 3)];
    }

    moneyBonusCacheList.push({
        count: 0,
        view: tmpView,
        moneyCache: {
            values: [...moneyCache.values],
            table: [...moneyCache.table],
        },
    })

    while (moneyBonusIndex < moneyBonusLength && randomPosArray.length) {
        lastCache = moneyBonusCacheList[moneyBonusCacheList.length - 1];
        tmpView = Util.clone(lastCache.view);
        moneyCache = {
            values: [...moneyCache.values],
            table: [...moneyCache.table]
        };

        moneyBonusIndex++;

        if (Util.probability(22)) {
            moneyBonusIndex = 0;        //                                       
            pos = randomPosArray.shift();

            moneyCache.values[pos] = RandomMoneyFromArr(moneyValueList);
            moneyCache.table[pos] = tableFromValue(moneyCache.values[pos]);
            tmpView[pos] = moneySymbol;
        }

        moneyBonusCacheList.push({
            count: moneyBonusIndex,
            view: tmpView,
            moneyCache: moneyCache
        });
    }

    var win = MoneyWinFromCache(moneyCache, bpl);

    if (!randomPosArray.length) {     //             ...
        moneyBonusCacheList[moneyBonusCacheList.length - 1].count = moneyBonusLength;

        var multiIndx = Util.random(0, multiValueList.length);
        var multi = multiValueList[multiIndx];

        win *= multi;

        moneyBonusCacheList.push({
            idx: multiIndx,
            multi: multi
        });
    }

    return {
        win: win,
        view: moneyBonusCacheList
    };
};

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;

        lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
        money += AnyWinFromLine(lineSymbols, bpl);
    }
    return money;
}

//                                       
var getBaseSymbol = function (reelSymbols) {
    var symbol = wild;

    for (var i = 0; i < reelSymbols.length; i++) {
        if (isWild(reelSymbols[i])) {
            continue;
        }

        symbol = reelSymbols[i];
        break;
    }
    return symbol;
}

//                                    
var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var winSymbols = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
            winSymbols.push(getBaseSymbol(lineSymbols));
        } else {
            lineSymbols = Util.symbolsFromLine(view, line);
            money = AnyWinFromLine(lineSymbols, bpl);

            if (money > 0) {
                winLines.push(
                    `${lineId}~${money}~${line.filter(function (item, index) {
                        return lineSymbols[index] != -1
                    }).join('~')}`);
                winSymbols.push(9);
            }
        }
    }
    return {
        winLines: winLines,
        winSymbols: winSymbols
    }
};

var AnyWinFromLine = function (lineSymbols, bpl) {
    var i = 0;

    for (i = 0; i < lineSymbols.length; ++i) {
        if (lineSymbols[i] > 4) {
            break;
        }
    }

    if (i == lineSymbols.length) {
        return payTable[3][9] * bpl;
    }
    return 0;
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

var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        if (moneyCache.table[i] != "m")
            win += moneyCache.values[i];
    }
    return win * bpl;
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
    return NumberOfMoneySymbols(view) >= 4;
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
    var value = moneyValueList[0];

    if (Util.probability(percentList.moneyHighPercent)) {
        value = moneyValueList[Util.random(1, moneyValueList.length)];
    } else if (Util.probability(percentList.moneyMediumPercent)) {
        value = moneyValueList[Util.random(1, moneyValueList.length / 2)];
    } else if (Util.probability(percentList.moneyLowPercent)) {
        value = moneyValueList[Util.random(0, moneyValueList.length / 3)];
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
        case 9000: return "jp1";
        case 4500: return "jp2";
        case 2250: return "jp3";
        case 900: return "jp4";
        case 0: return "r";
    }
    return "v";
}


module.exports = SlotMachine;