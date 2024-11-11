var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 38;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin;
    this.scatterPosition = [];

    this.jackpotPositions = [];
    this.jackpotCache = [];
    this.jackpotLevel = 0;
    this.diamondCache = [];

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.isFreeSpinAdd = 0;

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var slotWidth = 5;
var slotHeight = 3;
var scatter = 1;
var wild = 2;
var winLines = [];
var baseReels = [
    [6, 7, 5, 4, 4, 4, 10, 4, 13, 9, 1, 8, 7, 12, 5, 3, 3, 3, 6, 5, 6, 5, 10, 8, 3, 9, 3, 12, 8, 10, 3, 9, 5, 4, 11, 3, 12, 3, 6, 4, 13, 7, 11, 4, 13],
    [9, 13, 10, 8, 13, 6, 10, 3, 11, 7, 3, 5, 9, 8, 2, 11, 6, 12, 3, 5, 10, 3, 1, 7, 8, 2, 13, 5, 3, 5, 11, 6, 9, 4, 10, 7, 2, 1, 5, 4, 4, 4, 4],
    [7, 13, 3, 7, 5, 12, 4, 4, 4, 8, 4, 5, 11, 13, 9, 1, 7, 4, 12, 3, 10, 5, 1, 3, 5, 3, 2, 7, 11, 6, 8, 6, 12, 4, 6, 13, 5, 1, 3, 8, 4, 10, 9, 7, 11],
    [7, 9, 12, 10, 4, 12, 13, 2, 5, 11, 10, 9, 11, 10, 13, 3, 5, 3, 7, 10, 8, 8, 8, 6, 3, 2, 4, 4, 6, 8, 4, 11, 11, 8, 9, 5, 12, 1, 13, 9, 13, 5],
    [5, 6, 1, 4, 8, 9, 10, 9, 4, 11, 13, 3, 5, 13, 6, 9, 6, 13, 8, 5, 6, 1, 2, 5, 9, 11, 6, 8, 4, 7, 3, 13, 7, 10, 12, 11, 9, 10, 12, 2, 8, 5, 9, 12, 3, 4]
];
var freeReels = [
    [3, 6, 3, 6, 5, 5, 5, 5, 4, 5, 3, 3, 1, 7, 7, 7, 3, 5, 5, 4, 7, 6, 4, 3, 7, 6, 7, 6, 7, 6, 3, 4, 7, 4, 3, 4, 4, 5, 4, 4, 7, 7, 5, 7, 3, 1],
    [3, 3, 3, 3, 6, 7, 7, 7, 1, 6, 3, 5, 5, 5, 3, 4, 4, 4, 3, 6, 7, 4, 5, 7, 5, 3, 7, 3, 4, 5, 6, 5, 7, 6, 6, 6, 4, 4, 7, 7, 7, 3, 5, 4, 2, 5, 6, 4, 1, 2, 4, 6],
    [6, 6, 6, 7, 7, 7, 3, 3, 3, 4, 4, 4, 7, 4, 7, 6, 1, 2, 3, 1, 4, 6, 5, 5, 5, 4, 3, 4, 3, 5, 7, 3, 4, 5, 5, 6, 3, 7, 5, 7, 3, 5, 4, 3, 3, 6, 7, 4, 4, 7, 6],
    [6, 5, 5, 5, 2, 4, 4, 4, 4, 7, 4, 6, 3, 3, 3, 6, 6, 4, 5, 4, 4, 5, 6, 4, 6, 6, 3, 3, 3, 3, 3, 1, 7, 3, 3, 1, 4, 7, 4, 5, 7, 3, 5, 7, 3, 7, 2, 5, 4],
    [4, 6, 6, 6, 1, 4, 4, 5, 5, 5, 4, 6, 5, 4, 6, 6, 7, 7, 7, 7, 5, 5, 7, 3, 3, 3, 3, 4, 3, 4, 5, 6, 7, 5, 7, 4, 6, 6, 6, 7, 5, 7, 4, 6, 3, 5, 1, 4, 3, 3, 5, 3]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 20, 15, 10, 10, 5, 5, 5, 5, 5, 5],
    [0, 0, 0, 75, 50, 30, 25, 20, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 200, 150, 125, 100, 75, 50, 50, 25, 25, 25, 25]
];
var percentList = {
    freeWinPercent: 50,
};
//var jackpots = [1000, 100, 50, 30];
var jackpots = [100, 50, 30];
var freeSpinCount = 10;

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 12; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];


    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        this.freeSpinLength = freeSpinCount;
        this.isFreeSpinAdd = 0;
        this.view = this.freeSpinCacheList[0].view;

        this.freeSpinIndex = 1;
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.freeSpinWinMoney = 0;
        this.currentGame = "FREE";
    }
    else {
        this.view = viewCache.view;
    }

    if (viewCache.type == "BONUS") {
        this.jackpotLevel = 0;
        this.diamondCache = viewCache.cache;
        this.jackpotCache = [];
        this.jackpotCache[0] = JackpotFirstCache();
        this.currentGame = "BONUS";
    }
    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "FREE") {
        this.winMoney += this.scatterWin;
    }

    if (viewCache.type == "BONUS") {
        this.moneyBonusWin = this.winMoney;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;

    if (isFreeSpinWin(this.view)) {
        this.freeSpinLength += freeSpinCount;
        this.isFreeSpinAdd = 1;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinCacheList.length - 1) {
        this.freeSpinWinMoney += this.scatterWin;
        this.currentGame = "BASE";
        return;
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var select = param.ind;
    var index = this.jackpotLevel++;
    var status = this.jackpotCache[index].status;
    var wins_mask = this.jackpotCache[index].wins_mask;
    var wins = this.jackpotCache[index].wins;

    status[select] = this.jackpotLevel;
    wins_mask[select] = "pw";
    wins[select] = this.diamondCache[index];

    var jackpotObj = {
        status: status,
        wins_mask: wins_mask,
        wins: wins
    };

    this.jackpotCache.push(jackpotObj);

    if (this.jackpotLevel >= this.diamondCache.length) {
        //                    
        this.moneyBonusWin = JackpotMoneyFromCache(this.diamondCache, player.betPerLine);
        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winMoney += this.moneyBonusWin;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

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

    var scatterView = RandomScatterView(baseReels, bpl, (fsWin > totalBet * 50 * 5) ? 5 : -1);
    var scatterWin = ScatterWinFromView(scatterView, totalBet);
    freeSpinCacheList.push({
        view: scatterView,
    });
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, freeSpinCount);

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
    var jackpotView = RandomJackpotView(baseReels, bpl);
    var jackpotWin = WinFromView(jackpotView, bpl);
    var diamondCache = JackpotRandomCache(totalBet, bsWin - jackpotWin);

    var pattern = {
        view: jackpotView,
        bpl: bpl,
        cache: diamondCache,
        win: jackpotWin + JackpotMoneyFromCache(diamondCache, bpl),
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
        if (!isFreeSpinWin(view))
            break;
    }
    return view;
};

var RandomScatterView = function (reels, bpl, nScatters = -1) {
    var view = [];

    while (true) {
        view = RandomView(reels);
        if (WinFromView(view, bpl) == 0 && ScatterCount(view) == 0)
            break;
    }

    if (nScatters < 0) {
        nScatters = 3;
    }

    for (var i = 0; i < nScatters; i++) {
        var pos = i + Util.random(0, slotHeight) * slotWidth;
        view[pos] = scatter;
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
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (freeSpinIndex <= freeSpinLength) {
            while (true) {
                tmpView = RandomView(reels);
                tmpWin = WinFromView(tmpView, bpl);
                if (Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                    break;
                }
            }

            var cache = {
                view: tmpView,
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

var RandomJackpotView = function (reels, bpl) {
    var view = [];

    while (true) {
        view = RandomZeroView(reels, bpl);

        if (NumberOfWilds(view) > 0)
            break;
    }

    return view;
};

var JackpotRandomCache = function (totalBet, targetMoney) {
    var targetJackpot = jackpots[jackpots.length - 1];

    for (var i = 0; i < jackpots.length; i++) {
        if (targetMoney >= totalBet * jackpots[i]) {
            targetJackpot = jackpots[i];
            break;
        }
    }

    //                              
    var diamondCache = [];
    for (var i = 0; i < jackpots.length; i++) {
        if (jackpots[i] == targetJackpot) {
            continue;
        }
        var count = Util.random(0, 3);
        for (var j = 0; j < count; j++) {
            diamondCache.push(jackpots[i]);
        }
    }
    for (var j = 0; j < 2; j++) {
        diamondCache.push(targetJackpot);
    }
    Util.shuffle(diamondCache);
    diamondCache.push(targetJackpot);
    return diamondCache;
};

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    var winMoney = 0;

    //                                                             
    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId];
        winLines.push(`0~${winMoney}~${history.join('~')}`);
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }
    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = 0;
        for (var i = 0; i < history.length; i++) {
            if (history[i] >= 0) {
                matchCount++;
            }
        }
        var money = bpl * payTable[matchCount][symbolId];
        if (money > 0) {
            var lineResult = [];
            for (var i = 0; i < history.length; i++) {
                if (history[i] < 0) {
                    break;
                }
                lineResult.push(history[i]);
            }
            winLines.push(`0~${money}~${lineResult.join('~')}`);
        }
        return money;
    }

    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var NumberOfWilds = function (view) {
    var res = 0;

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            ++res;
        }
    }

    return res;
};

var isWild = function (symbol) {
    return symbol == wild;
}
//                             
var ScatterCount = function (view) {
    var res = 0;

    for (var i = 0; i < view.length; ++i) {
        if (isScatter(view[i])) {
            ++res;
        }
    }

    return res;
};

var ScatterWinFromView = function (view, totalBet) {
    var nScatters = NumberOfScatters(view);

    switch (nScatters) {
        case 5:
            return totalBet * 50;
        case 4:
            return totalBet * 10;
        case 3:
            return totalBet * 5;
    }
}

//                                                                     
var NumberOfScatters = function (view) {
    var result = 0;

    for (var i = 0; i < slotWidth; ++i) {
        var isReelScatter = 0;

        for (var j = 0; j < slotHeight; ++j) {
            if (isScatter(view[i + j * slotWidth])) {
                isReelScatter = 1;
                break;
            }
        }

        if (isReelScatter) {
            ++result;
        } else {
            break;
        }
    }
    return result;
};

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
}
var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
}

var JackpotMoneyFromCache = function (cache, bpl) {
    var len = cache.length;
    return cache[len - 1] * bpl * 38;
}

var JackpotFirstCache = function () {
    var status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var wins_mask = ["h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h"];
    var wins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var firstJackpot = {
        status: status,
        wins_mask: wins_mask,
        wins: wins
    };

    return firstJackpot;
}

module.exports = SlotMachine;