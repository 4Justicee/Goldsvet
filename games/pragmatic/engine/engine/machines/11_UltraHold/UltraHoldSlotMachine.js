var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.expandView = [];
    this.wildPositions = [];
    this.expandPositions = [];

    //                      
    this.moneyCacheIndex = 0;
    this.lifes = 4;
    this.moneyFactors = [];
    this.moneySymbols = [];
    this.moneyBonusWin = 0;
    this.moneyCacheList = [];

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var wild = 2, moneySymbol = 0, noMoneySymbol = 12, silverCoinSymbol = 13, goldCoinSymbol = 14, diamondSymbol = 15;
var slotWidth = 3, slotHeight = 3;
var moneySymbolValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 500, 1000, 1500, 2000, 2500];
var silverCoinIndex = 9,
    goldCoinIndex = 20;
var emptyPositions = [0, 2, 3, 5, 6, 8];
var baseReels = [
    [9, 9, 9, 6, 10, 10, 10, 11, 5, 9, 8, 3, 8, 8, 8, 2, 11, 11, 11, 10, 7, 4, 5, 2, 8, 11, 6, 8, 10, 6, 8, 7, 8, 11, 8, 10, 6, 10],
    [5, 3, 6, 11, 11, 7, 6, 6, 6, 6, 3, 4, 9, 10, 9, 9, 9, 2, 3, 6, 0, 0, 0, 11, 11, 8, 10, 10, 10, 11, 11, 11, 8, 8, 8, 4, 11, 5, 3, 6, 11, 11, 7, 6, 6, 6, 6, 3, 4, 9, 10, 9, 9, 9, 2, 3, 6, 11, 11, 8, 10, 10, 10, 11, 11, 11, 8, 8, 8, 4, 11, 5, 3, 6, 11, 11, 7, 6, 6, 6, 6, 3, 4, 9, 10, 9, 9, 9, 2, 3, 6, 0, 0, 0, 11, 11, 8, 10, 10, 10, 11, 11, 11, 8, 8, 8, 4, 11],
    [8, 8, 8, 5, 3, 10, 9, 9, 9, 4, 11, 11, 11, 11, 7, 6, 8, 10, 10, 10, 2, 9, 10, 11, 5, 10, 9, 5, 11, 10, 11, 5, 10, 9, 10, 11, 10, 11, 9, 5, 6, 5, 7, 5, 9, 10, 3, 5, 10, 5, 11, 10]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 250, 250, 150, 100, 80, 80, 20, 20, 20, 20, 0, 0, 0, 0],
];
var payLines = [
    [3, 4, 5], // 1
    [0, 1, 2], // 2
    [6, 7, 8], // 3
    [0, 4, 8], // 4
    [6, 4, 2], // 5
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.expandView = [];
    this.expandPositions = [];
    this.wildPositions = [];

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.expandView = cache.expandView;
        this.expandPositions = cache.expandPositions;
        this.wildPositions = cache.wildPositions;

        this.winMoney = WinFromView(this.expandView, player.betPerLine);
        this.winLines = WinLinesFromView(this.expandView, player.betPerLine);

        var result = RandomMoneyCache(this.view);
        this.moneySymbols = result.table;
        this.moneyFactors = result.values;
        this.view = result.view;
    }

    if (viewCache.type == "BONUS") {
        this.moneyCacheList = viewCache.moneyCacheList;
        this.view = this.moneyCacheList[0].view;

        var bonusWinMoney = viewCache.win / viewCache.bpl * player.betPerLine;
        // console.log(`....................[Bonus Spin] ${bonusWinMoney}`);
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isMoneyBonusWin(this.view)) {
        //                                
        var cache = this.moneyCacheList[0];
        this.view = cache.view;
        this.lifes = cache.lifes;
        this.moneySymbols = cache.cache.table;
        this.moneyFactors = cache.cache.values;
        this.moneyBonusWin = GetTotalMoney(this.moneyFactors) * player.betPerLine;
        this.moneyCacheIndex = 1;
        this.currentGame = "BONUS";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    this.winMoney = 0;

    var cache = this.moneyCacheList[this.moneyCacheIndex];
    this.view = cache.view;
    this.lifes = cache.lifes;
    this.moneySymbols = cache.cache.table;
    this.moneyFactors = cache.cache.values;
    if (cache.lifes == 4) {
        this.moneyBonusWin += GetTotalMoney(this.moneyFactors) * player.betPerLine;
    }
    this.moneyCacheIndex++;

    if (this.moneyCacheIndex >= this.moneyCacheList.length) {
        this.winMoney = this.moneyBonusWin;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var cache, win;

    if (baseWin > 0 && Util.probability(30)) {
        cache = RandomWinView(baseReels, bpl, Util.max(baseWin, totalBet * 4));
    } else {
        cache = RandomZeroView(baseReels, bpl);
    }

    win = WinFromView(cache.expandView, bpl);

    var pattern = {
        view: cache,
        win: win,
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
        default:
            return;
    }
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin, isCall);

    var pattern  = {
        win: bonusSpinData.win,
        moneyCacheList: bonusSpinData.moneyCacheList,
        bpl: bpl,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    }

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var view = RandomView(reels);

        if (isMoneyBonusWin(view)) {
            continue;
        }

        var expandCache = GetExpandWildView(view);
        var win = WinFromView(expandCache.view, bpl);

        if (win > bottomLimit && win <= maxWin) {
            var result = {
                view: view,
                expandView: expandCache.view,
                expandPositions: expandCache.expandPos,
                wildPositions: expandCache.wildPos
            };
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
        var view = RandomView(reels);

        if (isMoneyBonusWin(view)) {
            continue;
        }

        var expandCache = GetExpandWildView(view);
        var win = WinFromView(expandCache.view, bpl);

        if (win == 0) {
            var result = {
                view: view,
                expandView: view,
                expandPositions: [],
                wildPositions: []
            };
            return result;
        }
    }
};

var RandomView = function (reels) {

    while (true) {

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

        if (resultView.indexOf(wild) != -1 && resultView.indexOf(moneySymbol) != -1) {
            continue;
        }

        return resultView;
    }

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
        var view;

        while (true) {
            view = RandomView(reels);

            if (isMoneyBonusWin(view)) {
                break;
            }
        }

        var result = RandomMoneyCache(view);
        var lifes = 4;

        var moneyData = {
            view: result.view,
            cache: {
                table: result.table,
                values: result.values,
            },
            lifes: lifes,
        };

        var moneyBonusWin = GetTotalMoney(result.values) * bpl,
            moneyCacheList = [moneyData];

        //                 
        while (true) {
            var addedMoneyCount = 0;
            if (Util.probability(30)) {
                addedMoneyCount = Util.random(1, 7);
            }

            var tmpTable = Util.clone(moneyData.cache.table),
                tmpValues = Util.clone(moneyData.cache.values),
                tmpMoneyView = Util.clone(moneyData.view);

            for (var i = 0; i < tmpMoneyView.length; i++) {
                if (tmpMoneyView[i] < noMoneySymbol) {
                    tmpMoneyView[i] = noMoneySymbol;
                }
            }

            if (addedMoneyCount > 0) {
                var noMoneyPositions = Util.clone(emptyPositions);
                for (var i = 0; i < addedMoneyCount; i++) {
                    var posIndex = Util.random(0, noMoneyPositions.length);
                    var randomPos = noMoneyPositions[posIndex];
                    noMoneyPositions = Util.remove(noMoneyPositions, posIndex);

                    var index = Util.random(0, silverCoinIndex);
                    if (Util.probability(20)) {
                        index = Util.random(silverCoinIndex, goldCoinIndex);
                    } else if (Util.probability(5)) {
                        index = Util.random(goldCoinIndex, moneySymbolValues.length);
                    }

                    tmpValues[randomPos] = moneySymbolValues[index];
                    if (index < silverCoinIndex) {
                        tmpTable[randomPos] = "sc";
                        tmpMoneyView[randomPos] = silverCoinSymbol;
                    } else if (index < goldCoinIndex) {
                        tmpTable[randomPos] = "gc";
                        tmpMoneyView[randomPos] = goldCoinSymbol;
                    } else {
                        tmpTable[randomPos] = "d";
                        tmpMoneyView[randomPos] = diamondSymbol;
                    }
                }
                lifes = 4;
                moneyBonusWin += GetTotalMoney(tmpValues) * bpl;
            } else {
                lifes--;
            }

            var cache = {
                view: tmpMoneyView,
                cache: {
                    table: tmpTable,
                    values: tmpValues,
                },
                lifes: lifes,
            };

            moneyCacheList.push(cache);

            if (lifes == 0) {
                break;
            }
        }

        if (moneyCacheList.length <= 5) continue;

        if (moneyBonusWin >= minMoney && moneyBonusWin <= maxMoney) {
            return {
                win: moneyBonusWin,
                moneyCacheList: moneyCacheList,
            };
        }

        if (moneyBonusWin > lowerLimit && moneyBonusWin < minMoney) {
            lowerLimit = moneyBonusWin;
            lowerView = {
                win: moneyBonusWin,
                moneyCacheList: moneyCacheList,
            };
        }

        if (moneyBonusWin > maxMoney && moneyBonusWin < upperLimit) {
            upperLimit = moneyBonusWin;
            upperView = {
                win: moneyBonusWin,
                moneyCacheList: moneyCacheList,
            };
        }
    }

    return lowerView ? lowerView : upperView;
}

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

    return money;
};

var WinFromLine = function (lineSymbols, bpl = 1) {
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

var GetWildPositions = function (view) {
    var positions = [];

    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            positions.push(i);
        }
    }

    return positions;
};

var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol || symbol == silverCoinSymbol || symbol == goldCoinSymbol || symbol == diamondSymbol;
};

var isMoneyBonusWin = function (view) {
    var reelNo = 1; //                       2              3                         .
    for (var i = 0; i < slotHeight; i++) {
        var viewPos = reelNo + i * slotWidth;
        var symbol = view[viewPos];
        if (!isMoneySymbol(symbol))
            return false;
    }
    return true;
};

var DefaultMoneyCache = function () {
    var moneyValues = [],
        moneyTable = [];

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

var RandomMoneyCache = function (view) {
    var moneyValues = DefaultMoneyCache().values,
        moneyTable = DefaultMoneyCache().table,
        moneyView = Util.clone(view),
        moneyCount = 0;

    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            var index;
            if (Util.probability(10)) {
                index = Util.random(0, goldCoinIndex);
            } else {
                index = Util.random(0, Math.floor(goldCoinIndex / 2));
            }

            moneyValues[i] = moneySymbolValues[index];
            if (index < silverCoinIndex) {
                moneyTable[i] = "sc";
                moneyView[i] = silverCoinSymbol;
            } else {
                moneyTable[i] = "gc";
                moneyView[i] = goldCoinSymbol;
            }
            moneyCount++;
        }
    }

    if (moneyCount == 0) {
        moneyValues = [];
        moneyTable = [];
    }

    var result = {
        view: moneyView,
        values: moneyValues,
        table: moneyTable
    }

    return result;
};

var GetTotalMoney = function (values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        total += values[i];
    }
    return total;
};

var GetExpandWildView = function (view) {
    var expandView = Util.clone(view);
    var wildPos = GetWildPositions(view);
    var expandPos = [];

    if (wildPos.length > 0) {
        for (var i = 0; i < wildPos.length; i++) {
            var lineIndex = wildPos[i] % 3;
            for (var j = 0; j < slotHeight; j++) {
                var pos = j * slotWidth + lineIndex;
                if (!isWild(expandView[pos])) {
                    expandView[pos] = wild;
                    expandPos.push(pos);
                }
            }
        }
    }

    return {
        view: expandView,
        wildPos: wildPos,
        expandPos: expandPos
    };
}

module.exports = SlotMachine;