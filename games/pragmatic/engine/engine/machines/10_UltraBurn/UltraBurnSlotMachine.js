var Util = require('../../../utils/slot_utils');

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

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["JACKPOT"]; //FREE, BONUS

};

var slotWidth = 3, slotHeight = 3;
var baseReels = [
    [6, 6, 6, 8, 8, 8, 4, 4, 4, 10, 10, 10, 7, 7, 7, 10, 9, 9, 9, 9, 5, 5, 5, 4, 10, 6, 7, 10, 3, 3, 3],
    [6, 6, 6, 5, 5, 5, 7, 7, 7, 9, 9, 9, 8, 8, 8, 10, 10, 10, 10, 6, 3, 3, 3, 10, 7, 5, 4, 4, 4, 5, 4, 10, 9, 3],
    [9, 9, 9, 9, 5, 3, 3, 3, 4, 4, 4, 6, 6, 6, 7, 7, 7, 3, 10, 10, 8, 8, 8, 5, 7, 9, 9, 10, 10, 5, 5, 5]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
    [0, 0, 0, 500, 50, 50, 20, 20, 20, 20, 5]
];
var payLines = [
    [3, 4, 5], // 1
    [0, 1, 2], // 2
    [6, 7, 8], // 3
    [0, 4, 8], // 4
    [6, 4, 2], // 5
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var view, win;

    if (baseWin > 0) {
        view = RandomWinView(baseReels, bpl, baseWin);
    } else {
        view = RandomZeroView(baseReels, bpl);
    }
    win = WinFromView(view, bpl);

    var pattern = {
        view: view,
        win: win,
        type: "BASE",
        bpl: bpl
    };

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    if (jpType == "RANDOM" || jpType == "JACKPOT") {
        var patternCount = jpType == "JACKPOT" ? 100000 : 500;

        var bonusSpinData =  RandomBonusViewCache(baseReels, bpl, jpWin, patternCount);

        return {
            win: bonusSpinData.win,
            view: bonusSpinData.view,
            bpl: bpl,
            type: "BASE",
            isCall: isCall ? 1 : 0
        };
    } else {
        return null;
    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var calcCount = 0, bottomLimit = 0;
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (win > bottomLimit && win <= maxWin) {
            return view;
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
        var win = WinFromView(view, bpl);

        if (win == 0) {
            return view;
        }
    }
};

var RandomView = function (reels) {
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

    return resultView;
};

var RandomBonusViewCache = function (reels, bpl, bsWin, patCount = 500) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < patCount; patternIndex++) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);
        var bonusSpinData = { view, win };

        if (bonusSpinData.win >= minMoney && bonusSpinData.win <= maxMoney) {
            return bonusSpinData;
        }

        if (bonusSpinData.win > lowerLimit && bonusSpinData.win < minMoney) {
            lowerLimit = bonusSpinData.win;
            lowerView = bonusSpinData;
        }

        if (bonusSpinData.win > maxMoney && bonusSpinData.win < upperLimit) {
            upperLimit = bonusSpinData.win;
            upperView = bonusSpinData;
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

var WinFromLine = function (lineSymbols, bpl) {
    var symbol = lineSymbols[0]; //                                    
    var matchCount = 0;

    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

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
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
}

module.exports = SlotMachine;