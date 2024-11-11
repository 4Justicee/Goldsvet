var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 3;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                       
    this.upgradeCount = 0;
    this.bonusMoreArray = [];
    this.bonusTypeArray = [];
    this.bonusValueArray = [];
    this.moneyBonusWin = 0;
    this.bonusLength = 10;

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

var scatter = 0, upgrade = 1, wild = 2;
var slotWidth = 3, slotHeight = 3;
var baseReels = [
    [0, 9, 3, 3, 3, 9, 5, 7, 6, 9, 3, 9, 4, 3, 8, 2, 5, 3, 3, 7],
    [4, 8, 0, 8, 6, 7, 5, 0, 9, 9, 2, 3, 3, 3, 6],
    [7, 2, 8, 4, 1, 3, 6, 8, 4, 8, 5, 9, 3, 3, 3, 9, 0, 8, 0, 7, 8, 9, 8, 5, 3, 7, 8, 6, 5, 9, 3, 3, 5, 0]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 4, 3, 3, 1, 1, 0, 0],
    [0, 0, 500, 30, 24, 20, 15, 10, 8, 5]
];
var payLines = [
    [0, 1, 2], // 1
    [3, 4, 5], // 2
    [6, 7, 8], // 3
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

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }

    if (viewCache.type == "BONUS") {
        this.view = viewCache.view;
        this.bonusMoreArray = viewCache.bonusMoreArray;
        this.bonusTypeArray = viewCache.bonusTypeArray;
        this.bonusValueArray = viewCache.bonusValueArray;

        var bonusWinMoney = viewCache.win / viewCache.bpl * player.betPerLine;
        // console.log(`....................[Bonus] ${bonusWinMoney}`);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.upgradeCount += NumberOfUpgrades(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isBonusWin(this.view)) { //                          
        this.moneyBonusWin = 0;
        this.bonusLength = 10;
        for (var i = 0; i < this.bonusMoreArray.length; i++) {
            this.bonusLength += this.bonusMoreArray[i];
        }

        this.currentGame = "BONUS";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    for (var i = 0; i < this.bonusTypeArray.length; i++) {
        if (this.bonusTypeArray[i] == "w") {
            this.moneyBonusWin += this.bonusValueArray[i] * player.betPerLine;
        } else if (this.bonusTypeArray[i] == "pf") {
            this.bonusLength += this.bonusValueArray[i];
        }
    }

    this.winMoney = this.moneyBonusWin;

    this.upgradeCount = 0;
    this.currentGame = "BASE";
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var view, win;

    if (baseWin > 0) {
        view = RandomWinView(baseReels, bpl, baseWin);
    } else {
        view = RandomZeroView(baseReels, bpl);
    }
    win = WinFromView(view, bpl);

    this.upgradeCount += NumberOfUpgrades(view);

    var pattern = {
        view: view,
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

    return {
        win: bonusSpinData.win,
        view: bonusSpinData.view,
        bonusMoreArray: bonusSpinData.bonusMoreArray,
        bonusTypeArray: bonusSpinData.bonusTypeArray,
        bonusValueArray: bonusSpinData.bonusValueArray,
        bpl: bpl,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (isBonusWin(view)) {
            continue;
        }
        if (NumberOfUpgrades(view) > 0 && Util.probability(80)) {
            continue;
        }

        if (win > bottomLimit && win <= maxWin) {
            return view;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(baseReels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (isBonusWin(view)) {
            continue;
        }
        if (NumberOfUpgrades(view) > 0 && Util.probability(80)) {
            continue;
        }

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

var RandomBonusViewCache = function (reels, bpl, bsWin, isCall) {
    var extraLengthPercent, lowValuePercent;
    if (isCall) {
        extraLengthPercent = 10;
        lowValuePercent = 80;
    } else {
        extraLengthPercent = 5;
        lowValuePercent = 95;
    }

    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var view, win;

        while (true) {
            view = RandomView(reels);
            win = WinFromView(view, bpl);

            if (isBonusWin(view) && win == 0 && NumberOfUpgrades(view) == 0) {
                break;
            }
        }

        var bonusLength = 10;
        var bonusMoreArray = [];

        for (var i = 0; i < this.upgradeCount; i++) {
            bonusMoreArray[i] = Util.random(4, 11);
            bonusLength += bonusMoreArray[i];
        }

        var index = 0;
        var bonusTypeArray = [],
            bonusValueArray = [];

        while (index < bonusLength) {
            if (Util.probability(extraLengthPercent)) {
                bonusTypeArray[index] = "pf";
                bonusValueArray[index] = Util.random(4, 11);
                bonusLength += bonusValueArray[index];
            } else {
                bonusTypeArray[index] = "w";
                if (Util.probability(lowValuePercent)) {
                    bonusValueArray[index] = Util.random(2, 6);
                } else {
                    var randomArray = [10, 10, 10, 10, 10, 15, 15, 15, 15, 20, 20, 20, 30, 30, 50];
                    bonusValueArray[index] = randomArray[Util.random(0, randomArray.length - 1)];
                }
            }

            index++;
        }

        var bonusWinMoney = 0;
        for (var i = 0; i < bonusTypeArray.length; i++) {
            if (bonusTypeArray[i] == "w") {
                bonusWinMoney += bonusValueArray[i] * bpl;
            }
        }

        var bonusSpinData = {
            win: bonusWinMoney,
            view: view,
            bonusMoreArray,
            bonusTypeArray,
            bonusValueArray
        };

        if (bonusWinMoney >= minMoney && bonusWinMoney <= maxMoney) {
            this.upgradeCount = 0;
            return bonusSpinData;
        }

        if (bonusWinMoney > lowerLimit && bonusWinMoney < minMoney) {
            lowerLimit = bonusWinMoney;
            lowerView = bonusSpinData;
        }

        if (bonusWinMoney > maxMoney && bonusWinMoney < upperLimit) {
            upperLimit = bonusWinMoney;
            upperView = bonusSpinData;
        }
    }

    this.upgradeCount = 0;

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

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isUpgrade = function (symbol) {
    return symbol == upgrade;
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

//                                     
var NumberOfUpgrades = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isUpgrade(view[i])) {
            result++;
        }
    }
    return result;
};

var isBonusWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

module.exports = SlotMachine;