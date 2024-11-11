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
    this.winLines = [];      //                                       
    this.winSymbols = [];
    this.moneyBonusWin = 0;
    this.bonusMulti = 0;

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];    //doBonus                           
};

var slotWidth = 5;
var slotHeight = 3;
var wild = 2;
var baseReels = [
    [11, 8, 13, 2, 2, 2, 7, 11, 9, 13, 7, 12, 10, 7, 13, 9, 8, 12, 11, 10, 7, 12, 4, 13, 6, 10, 12, 11, 14, 14, 14, 13, 6, 12, 8, 11, 3, 6, 5, 9, 7, 12, 4, 13, 6],
    [9, 10, 6, 2, 2, 2, 12, 7, 9, 10, 8, 11, 3, 7, 13, 4, 9, 11, 5, 6, 13, 7, 10, 4, 6, 14, 14, 14, 6, 8, 9, 10, 11, 6, 9, 7, 10, 8, 5, 11, 12, 7, 9, 6, 10, 5, 11, 8, 3],
    [8, 12, 11, 2, 2, 2, 6, 13, 8, 10, 13, 6, 14, 14, 14, 8, 12, 9, 6, 10, 7, 13, 3, 6, 9, 8, 4, 10, 9, 7, 13, 12, 10, 9, 5, 13, 6, 7, 12, 9, 8, 10, 13, 9, 12, 14, 14, 14, 6, 13],
    [5, 12, 8, 2, 2, 2, 10, 8, 9, 12, 5, 11, 6, 10, 3, 12, 4, 9, 7, 11, 3, 13, 14, 14, 14, 7, 10, 5, 11, 12, 4, 6, 10, 5, 13, 4, 8, 11, 12, 10, 5, 11, 13, 6, 12, 10, 6, 13, 9, 8, 12, 6, 11, 10, 5, 8, 13],
    [11, 8, 12, 2, 2, 2, 13, 4, 12, 8, 10, 13, 9, 7, 11, 10, 6, 13, 3, 9, 8, 12, 5, 13, 7, 11, 6, 10, 4, 11, 8, 10, 12, 7, 11, 8, 14, 14, 14, 12]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 150, 100, 75, 30, 25, 20, 15, 10, 10, 5, 5, 0, 0],
    [0, 0, 0, 300, 200, 150, 100, 80, 60, 50, 40, 40, 20, 20, 0, 20],
    [0, 0, 0, 1000, 500, 300, 250, 200, 150, 125, 100, 100, 50, 50, 0, 50]
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
var bonusMultiArry = [1, 2, 8, 25, 50, 150, 500, 1000, 2500, 5000];
var any = 14;

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 15; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;

    this.winMoney = WinFromView(this.view, player.betPerLine); //                                     
    var { winLines, winSymbols } = WinLinesFromView(this.view, player.betPerLine); //                                        
    this.winLines = winLines;
    this.winSymbols = winSymbols;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "BONUS") {
        this.bonusMulti = viewCache.multi;
        this.moneyBonusWin = player.betPerLine * this.lineCount * this.bonusMulti;
        this.winMoney += this.moneyBonusWin;
    } else {
        this.moneyBonusWin = 0;
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
        bpl: bpl,
    };

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusCache = RandomBonusViewCache(baseReels, bpl, bsWin, totalBet);

    return {
        view: bonusCache.view,
        win: bonusCache.win,
        multi: bonusCache.multi,
        type: "BONUS",
        bpl: bpl,
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin > bottomLimit && tmpWin <= maxWin && NumberOfAny(tmpView) < 6) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
            maxWin = 100000000000000;
        }

    }
    return tmpView;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0 && NumberOfAny(tmpView) < 6) {
            break;
        }
    }
    return tmpView
};

var RandomView = function (reels) {
    var view = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
        }
    }
    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin, totalBet) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;

    var lowerView = null,
        upperView = null;
    var lowerMulti = null,
        upperMulti = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var bonusView = [];
        var bonusWin = 0;
        var bonusMulti = 0;
        var anyCount = 0;

        while (true) {
            bonusView = RandomView(reels);

            anyCount = NumberOfAny(bonusView);
            if (anyCount >= 6 && anyCount < 15)
                break;
        }
        bonusMulti = bonusMultiArry[anyCount - 6];
        bonusWin = totalBet * bonusMulti;

        var bonusSpinData = {
            view: bonusView,
            multi: bonusMulti,
            win: bonusWin
        };

        if (bonusWin >= minMoney && bonusWin <= maxMoney) {
            return bonusSpinData;
        }

        if (bonusWin > lowerLimit && bonusWin < minMoney) {
            lowerView = bonusSpinData;
        }
        if (bonusWin > maxMoney && bonusWin < upperLimit) {
            upperView = bonusSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
}

var NumberOfAny = function (view) {
    var result = 0;

    for (var i = 0; i < view.length; ++i)
        if (view[i] == any || isWild(view[i]))
            result++;

    return result;
};

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
        if (linePay == 0)
            money += AnyWinFromLine(lineSymbols, bpl);
    }
    return money;
};

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
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var winSymbols = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);

        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
            winSymbols.push(getBaseSymbol(lineSymbols));
        } else {
            money = AnyWinFromLine(lineSymbols, bpl);
            if (money > 0) {
                winLines.push(
                    `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                        return lineSymbols[index] != -1
                    }).join('~')}`);
                winSymbols.push(15);
            }
        }
    }
    return { winLines, winSymbols };
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

var isSeven = function (symbol) {
    return symbol == 3 || symbol == 4 || symbol == 5;
};

var AnyWinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) { //                                       
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    if (!isSeven(symbol))
        return 0;

    for (var i = 0; i < lineSymbols.length; i++) {  //                          
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                                           
        if (!isSeven(lineSymbols[i])) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) { //                                         -1          
        lineSymbols[i] = -1;
    }
    return payTable[matchCount][15] * bpl; //                                      
};

var isWild = function (symbol) {
    return symbol == wild;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

module.exports = SlotMachine;