var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];      //                                       
    this.bonusWin = 0;
    this.bonusPositions = [];

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];    //doBonus                           
};

var slotWidth = 5;
var slotHeight = 3;
var bonus = 1;
var wild = 0;
var baseReels = [
    [8, 8, 8, 7, 7, 7, 4, 6, 6, 6, 5, 7, 6, 1, 4, 3, 6, 8, 9, 8, 7, 9],
    [8, 3, 6, 6, 6, 7, 7, 7, 4, 4, 4, 3, 4, 7, 5, 1, 7, 8, 6, 9, 9, 9, 8, 9, 9, 4, 4],
    [4, 9, 9, 9, 9, 8, 8, 8, 3, 6, 8, 9, 5, 4, 7, 8, 5, 6, 1, 7, 6, 8, 7, 8],
    [6, 6, 6, 9, 9, 9, 7, 6, 6, 8, 8, 8, 4, 8, 3, 5, 9, 9, 9, 6, 6, 5, 4, 8, 1],
    [9, 9, 9, 5, 6, 6, 6, 3, 9, 6, 9, 3, 5, 6, 7, 8, 8, 8, 6, 3, 1, 8, 6, 8, 4, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [0, 50, 0, 100, 50, 50, 20, 20, 20, 20],
    [0, 250, 0, 1000, 200, 200, 50, 50, 40, 40],
    [0, 1250, 0, 5000, 1000, 1000, 200, 200, 200, 200]
];
var payLines = [
    [5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4],
    [10, 11, 12, 13, 14],
    [0, 6, 12, 8, 4],
    [10, 6, 2, 8, 14]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 5; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;

    this.bonusWin = payTable[NumberOfBonus(this.view)][bonus] * player.betPerLine;
    if (this.bonusWin) {
        this.bonusPositions = BonusPositions(this.view);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
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
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin);

    return {
        view: bonusSpinData.view,
        win: bonusSpinData.win,
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

var RandomBonusViewCache = function (reels, bpl, bsWin) {
    var minMoney = bsWin * 0.9;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    var callSymbolArr = [3, 1, 4, 6, 3];
    var callCountArr = [5, 5, 5, 5, 4];
    var callMultiArr = [5000, 1250, 1000, 1000, 1000];
    var bonusView = [];
    var bonusWin = 0;

    for (var patternIndex = 0; patternIndex < 1000; patternIndex++) {

        if (bsWin >= bpl * 1000) {
            var randPos = Util.random(0, 5);
            var randReelNo = Util.random(0, 5);
            var symbol = callSymbolArr[randPos];
            symbol = 1;

            bonusView = RandomView(reels);
            var preBonusCount = (symbol == 1) ? NumberOfBonus(bonusView) : 0;

            if (symbol == bonus) {
                var posArr = [];
                while (posArr.length < callCountArr[randPos] - preBonusCount) {
                    var viewPos = Util.random(0, slotWidth * slotHeight);
                    if (bonusView[viewPos] != bonus) {
                        bonusView[viewPos] = bonus;
                        posArr.push(bonus);
                    }
                }
            } else {
                for (var i = 0; i < callCountArr[randPos] - preBonusCount; ++i) {
                    var viewPos = payLines[randReelNo][i];

                    bonusView[viewPos] = symbol;
                }
            }
        } else {
            bonusView = RandomWinView(reels, bpl, bsWin, 1);
        }

        bonusWin = WinFromView(bonusView, bpl);

        var bonusSpinData = {
            view: bonusView,
            win: bonusWin,
        };

        if (bonusWin >= minMoney && bonusWin <= maxMoney) {
            return bonusSpinData;
        }

        if (bonusWin > lowerLimit && bonusWin < minMoney) {
            lowerLimit = bonusWin;
            lowerView = bonusSpinData;
        }
        if (bonusWin > maxMoney && bonusWin < upperLimit) {
            upperLimit = bonusWin;
            upperView = bonusSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
}

var BonusPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if ((view[i]) == bonus) {
            result.push(i);
        }
    }
    return result;
};

var NumberOfBonus = function (view) {
    var result = 0;

    for (var i = 0; i < view.length; ++i)
        if (view[i] == bonus)
            result++;

    return result;
};

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    var bonusCount = NumberOfBonus(view);

    if (bonusCount >= 3) {
        money += payTable[bonusCount][bonus] * bpl;
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