var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 10;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.newView = [];
    this.srf = "";
    this.lg = "";
    //                                     
    this.bonusMultiPosition = -1;
    this.bonusMulti = 0;

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var scatter = 1, wild = 2, lionReelSymbol = 13;
var slotWidth = 5, slotHeight = 4;
var baseReels = [
    [10, 5, 9, 3, 7, 12, 12, 12, 12, 11, 7, 7, 7, 4, 1, 6, 8, 6, 6, 6, 8, 8, 8, 4, 8, 6, 8, 6, 8, 12, 4, 7, 4, 8, 12, 6, 9, 4],
    [3, 9, 5, 10, 4, 4, 4, 4, 7, 7, 7, 1, 5, 5, 5, 6, 3, 3, 3, 8, 7, 11, 12, 6, 6, 6, 2, 5, 8, 4, 6, 7, 5, 6, 4, 5, 1, 11, 6, 4, 5, 1, 8, 5, 8, 1, 12, 4, 7, 5, 1, 5, 7, 4, 5, 4],
    [11, 13, 2, 5, 1, 10, 6, 9, 8, 7, 12, 1, 4, 3, 13, 10, 7, 8, 3, 7, 10, 13, 6, 1, 6, 13, 12, 10, 3, 12, 6, 7, 4, 1, 7, 12, 13, 4, 3, 12, 7, 12, 13, 3, 1, 8, 12, 7],
    [5, 11, 11, 11, 3, 6, 8, 9, 9, 9, 4, 12, 12, 12, 7, 11, 10, 10, 10, 12, 9, 2, 10, 13, 12],
    [3, 4, 5, 12, 11, 11, 11, 13, 9, 2, 8, 11, 8, 8, 8, 7, 7, 7, 7, 10, 10, 10, 10, 6, 9, 9, 9, 6, 6, 6, 7, 6, 7, 9, 7, 6, 9, 6, 13, 8, 11, 6, 7, 11, 8, 7, 9, 13, 11, 6, 7, 9, 6, 7, 10, 6, 8, 10, 11]
];
var freeReels = [
    [4, 12, 6, 8, 8, 8, 8, 1, 9, 3, 5, 7, 10, 11, 12, 12, 12, 8, 12, 8, 12, 5, 8, 12, 5, 8, 1, 8, 12, 8, 6, 9, 7, 5, 6, 9, 12, 3, 7, 8],
    [12, 12, 12, 8, 3, 4, 10, 10, 10, 10, 12, 7, 9, 6, 11, 2, 5, 1, 10, 4, 5, 9, 4, 7, 5, 4, 7, 4, 7, 9, 3, 5, 4, 6, 3, 9, 8, 4, 9, 4, 5, 10, 5, 3, 10, 4, 10],
    [10, 10, 10, 9, 12, 1, 12, 12, 12, 2, 7, 8, 11, 4, 5, 10, 6, 3, 12, 4, 2, 4, 2, 12, 7, 8, 2, 4, 12, 2, 9, 12, 8, 12, 8, 1, 8, 9, 8, 2, 11, 2, 8, 12, 2, 12, 1, 12, 2, 9, 8, 2, 8, 1, 11, 9, 2, 5],
    [7, 12, 4, 9, 8, 8, 8, 8, 2, 3, 11, 10, 10, 10, 10, 6, 5, 8, 6, 5, 8, 10, 8, 6],
    [11, 11, 11, 3, 9, 9, 9, 8, 12, 10, 6, 5, 2, 7, 4, 9, 11, 2, 9, 5, 9, 5, 9, 2, 5, 4, 9, 5, 7]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 10, 10, 8, 8, 4, 4, 2, 2, 2, 0, 0],
    [0, 0, 0, 80, 60, 60, 30, 30, 20, 20, 8, 8, 8, 0, 0],
    [0, 0, 0, 400, 160, 160, 80, 80, 60, 60, 40, 40, 40, 0, 0]
];
var bonusMultiList = [5, 10, 15, 5, 20, 10, 25, 5, 10, 5, 10, 20, 15, 5, 25, 5, 10, 5, 10, 15, 20, 5, 10, 100, 25, 50, 5, 10, 75, 100, 15, 200, 20, 25, 5, 150, 15, 25, 50, 5, 20, 15, 25, 20, 75, 10, 15, 5, 15, 20];
var winLines = [];
var freeSpinLength = 10;

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
    this.scatterWin = 0;
    this.scatterPosition = [];
    this.bonusMultiPosition = -1;
    this.bonusMulti = 0;

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }

    if (viewCache.type == "BONUS") {
        var cache = viewCache.view;

        this.view = cache.view;
        this.bonusMultiPosition = cache.bonusMultiPosition;
        this.bonusMulti = cache.bonusMulti;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isFreeSpinWin(this.view)) { //                          
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }

    if (isBonusWin(this.view)) { //                                     
        this.winMoney += this.bonusMulti * player.betPerLine * this.lineCount;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;
    var newLionSymbol = this.freeSpinCacheList[this.freeSpinIndex].newLionSymbol;

    this.newView = [];
    winLines = [];
    this.winMoney = WinFromView(this.view, player.betPerLine);

    if (isLionReplaceable(this.view)) {
        if (winLines.length > 0) {
            this.lg = `0,${winLines.length}`;
        } else {
            this.lg = "-1,0";
        }

        var lionSymbolsInView = [];
        for (var i = 0; i < this.view.length; i++) {
            if (isLionSymbol(this.view[i]) && lionSymbolsInView.indexOf(this.view[i]) == -1 && this.view[i] != newLionSymbol) {
                lionSymbolsInView.push(this.view[i]);
            }
        }

        this.srf = "";
        for (var i = 0; i < lionSymbolsInView.length; i++) {
            var positions = [];
            for (var j = 0; j < this.view.length; j++) {
                if (this.view[j] == lionSymbolsInView[i]) {
                    positions.push(j);
                }
            }
            this.srf += `${lionSymbolsInView[i]}~${newLionSymbol}~${positions.join(",")}`;
            if (i < lionSymbolsInView.length - 1) {
                this.srf += ";";
            }
        }

        this.newView = GetReplacedView(this.view, newLionSymbol);
        this.winMoney += WinFromView(this.newView, player.betPerLine, false);
    }

    this.winLines = winLines;

    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
}

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
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWin = WinFromView(scatterView, bpl);
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin);
    var freeSpinCacheList = [scatterView];

    return {
        win: freeSpinData.win + scatterWin,
        view: freeSpinCacheList.concat(freeSpinData.cache),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin, totalBet);

    return {
        win: bonusSpinData.win,
        view: bonusSpinData,
        bpl: bpl,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var calcCount = 0, bottomLimit = 0;
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (isFreeSpinWin(view)) {
            continue;
        }
        if (isBonusWin(view)) {
            continue;
        }

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

        if (isFreeSpinWin(view)) {
            continue;
        }
        if (isBonusWin(view)) {
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

var RandomScatterView = function (reels) {
    var view;

    while (true) {
        view = RandomView(reels);
        if (isFreeSpinWin(view)) {
            break;
        }
    }

    return view;
}

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var view = [], win = 0;
        var freeSpinIndex = 1,
            freeSpinWinMoney = 0,
            freeSpinCacheList = [0];

        while (true) {
            while (true) {
                view = RandomView(reels);
                if (!isFreeSpinWin(view) && !isBonusWin(view)) {
                    break;
                }
            }
            win = WinFromView(view, bpl);

            var newLionSymbol = 0;
            if (isLionReplaceable(view)) {
                newLionSymbol = Util.random(3, 8);
                var newView = GetReplacedView(view, newLionSymbol);
                win += WinFromView(newView, bpl, false);
            }

            var cache = {
                view: view,
                newLionSymbol: newLionSymbol
            };

            freeSpinCacheList.push(cache);
            freeSpinWinMoney += win;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        var freeSpinData = {
            win: freeSpinWinMoney,
            cache: freeSpinCacheList
        };

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return freeSpinData;
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = freeSpinData;
        }

        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = freeSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
}

var RandomBonusViewCache = function (reels, bpl, bsWin, totalBet) {
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
            if (isBonusWin(view)) {
                break;
            }
        }

        var bonusMultiPosition = Util.random(0, bonusMultiList.length);
        var bonusMulti = bonusMultiList[bonusMultiPosition];

        win = WinFromView(view, bpl) + totalBet * bonusMulti;

        var bonusSpinData = {
            win,
            view,
            bonusMultiPosition,
            bonusMulti
        }

        if (win >= minMoney && win <= maxMoney) {
            return bonusSpinData;
        }

        if (win > lowerLimit && win < minMoney) {
            lowerLimit = win;
            lowerView = bonusSpinData;
        }

        if (win > maxMoney && win < upperLimit) {
            upperLimit = win;
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

var WinFromView = function (view, bpl, isNormal = true) {
    var money = 0;
    if (isNormal) winLines = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }

    money += ScatterWinFromView(view, bpl * 20);

    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId];
        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId];
        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
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

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var ScatterWinFromView = function (view, bet) {
    if (isFreeSpinWin(view))
        return bet;
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

//                                                   
var isBonusWin = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isLionReelSymbol(view[i])) {
            result++;
        }
    }
    return result >= 3;
};

//                            
var isLionReelSymbol = function (symbol) {
    return symbol == lionReelSymbol;
};

//                            
var isLionSymbol = function (symbol) {
    var lionSymbols = [3, 4, 5, 6, 7];
    return lionSymbols.indexOf(symbol) > -1;
};

//                                                                 ->                          3                             
var isLionReplaceable = function (view) {
    var linkedLionCount = 0;
    for (var i = 0; i < slotWidth; i++) {
        var hasLion = false;
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (isLionSymbol(view[pos]) || isWild(view[pos])) {
                hasLion = true;
                break;
            }
        }
        if (hasLion) {
            linkedLionCount++;
        } else {
            break;
        }
    }

    return linkedLionCount >= 3;
};

//                                                   
var GetReplacedView = function (view, newSymbol) {
    var replacedView = Util.clone(view);

    for (var i = 0; i < replacedView.length; i++) {
        if (isLionSymbol(replacedView[i])) {
            replacedView[i] = newSymbol;
        } else if (isWild(replacedView[i])) {
            replacedView[i] = wild;
        } else {
            replacedView[i] = 14;
        }
    }

    return replacedView;
};

module.exports = SlotMachine;