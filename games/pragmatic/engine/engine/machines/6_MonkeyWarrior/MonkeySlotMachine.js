var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                              
    this.moneyBonusWin = 0;
    this.moneyCacheIndex = 0;
    this.moneyBonusLength = 5;
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

var scatter = 1, wild = 2, moneySymbol = 11;
var slotWidth = 5, slotHeight = 3;
var freeSpinCount = 8;
var winLines = [];
var baseReels = [
    [6, 4, 10, 9, 4, 5, 8, 7, 6, 9, 7, 11, 10, 11, 11, 9, 10, 6, 9, 5, 3, 10, 7, 4, 10, 5, 8, 6, 10, 9],
    [2, 9, 3, 7, 5, 9, 6, 5, 8, 9, 1, 10, 8, 5, 7, 4, 8, 11, 11, 11, 5, 9, 6, 10, 8, 1, 9, 7, 5, 8, 6, 9, 10],
    [2, 7, 6, 10, 8, 3, 7, 9, 1, 10, 4, 8, 6, 9, 11, 11, 11, 8, 6, 3, 9, 5, 8, 1, 10, 8, 3, 7, 9, 4],
    [2, 9, 8, 3, 4, 10, 8, 4, 9, 7, 1, 10, 7, 4, 9, 7, 11, 11, 11, 10, 9, 6, 7, 4, 5, 8, 1, 9, 3, 10, 4, 8, 7, 3, 9, 7, 5, 10, 9, 3, 7, 4, 10, 6, 4, 7, 8],
    [2, 10, 9, 5, 10, 3, 9, 5, 8, 3, 4, 7, 5, 4, 10, 8, 5, 10, 4, 6, 7, 3, 8, 10, 11, 11, 11, 8, 4, 9]
];
var freeReels = [
    [3, 5, 11, 11, 5, 5, 4, 4, 5, 5, 6, 6, 4, 4, 5, 5, 6, 6, 11, 11, 6, 6, 4, 4, 5, 5, 6, 6, 6, 4],
    [5, 6, 3, 1, 5, 6, 4, 5, 1, 5, 5, 11, 11, 6, 6, 5, 5, 5, 1, 6, 3, 3, 4, 11, 11, 11, 5, 6, 6, 6, 6, 5, 5, 6],
    [6, 6, 3, 1, 3, 3, 4, 4, 4, 3, 3, 4, 4, 3, 11, 11, 3, 6, 6, 6, 5, 3, 3, 5, 11, 11, 11, 3, 3, 6, 6, 6, 6],
    [3, 4, 3, 4, 4, 4, 4, 1, 5, 3, 3, 3, 11, 11, 11, 4, 4, 1, 3, 4, 4, 3, 3, 4, 4, 3, 3, 6, 6, 1, 6, 5],
    [4, 3, 3, 4, 4, 5, 5, 3, 3, 11, 11, 11, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 4, 4, 5, 5, 6, 6, 11, 11, 4, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 25, 20, 20, 10, 10, 10, 10, 0, 0],
    [0, 0, 0, 50, 40, 35, 30, 20, 20, 15, 15, 0, 0],
    [0, 0, 0, 500, 300, 200, 150, 50, 50, 50, 50, 0, 0]
];
var moneyValueList = [25, 50, 75, 100, 125, 150, 175, 200, 250, 350, 400, 450, 500, 600, 750, 1250, 2500, 5000];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.moneyCacheIndex = 0;

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }

    if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0];
    }

    if (viewCache.type == "BONUS") {
        this.moneyBonusCacheList = viewCache.view;
        var firstCache = this.moneyBonusCacheList[0];
        this.view = firstCache.view;
        this.moneyCache = firstCache.moneyCache;

        var bonusWinMoney = viewCache.win / viewCache.bpl * player.betPerLine;
        console.log(`....................[Money Bonus] ${bonusWinMoney}`);
    } else {
        this.moneyCache = RandomMoneyCache(this.view);
    }

    var view = this.view;
    this.winMoney = WinFromView(view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.scatterPositions = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }

    if (isMoneyBonusWin(this.view)) {
        this.moneyCacheIndex = 0;

        this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine);
        this.currentGame = "BONUS";

        this.moneyBonusCache = {
            status: "",
            wins: "",
            wins_mask: "",
            more: 0,
            max: 5
        }
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];
    this.winMoney = WinFromView(this.view, player.betPerLine);
    // WinFromView                                       .
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;
    this.moneyCache = RandomMoneyCache(this.view);

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var selected = -1;
    if (param.ind != undefined) {
        selected = Number(param.ind);
    }

    this.moneyBonusCache = {
        more: 0,
        max: this.moneyBonusCacheList[this.moneyCacheIndex].max
    }

    if (selected >= 0) {
        var status = [0, 0, 0];
        status[selected] = 1;
        var wins = [0, 0, 0];
        var more = this.moneyBonusCacheList[this.moneyCacheIndex + 1].max - this.moneyBonusCacheList[this.moneyCacheIndex].max;
        wins[selected] = more;
        var wins_mask = ["h", "h", "h"];
        wins_mask[selected] = "rs";
        this.moneyBonusCache.status = status.join();
        this.moneyBonusCache.wins = wins.join();
        this.moneyBonusCache.wins_mask = wins_mask.join();
        this.moneyBonusCache.more = more;
        this.moneyBonusCache.max = this.moneyBonusCacheList[this.moneyCacheIndex + 1].max;
        return;
    }

    this.moneyCacheIndex++;

    var cache = this.moneyBonusCacheList[this.moneyCacheIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;
    this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine);
    this.moneyBonusCache.max = cache.max;

    if (this.moneyCacheIndex >= this.moneyBonusCacheList.length - 1) {
        if (NumberOfmoneyValueList(this.moneyBonusCacheList[this.moneyBonusCacheList.length - 1].view) == slotHeight * slotWidth) {
            this.moneyBonusWin *= 2;
            this.moneyCacheIndex = cache.max;
        }
        this.winMoney = this.moneyBonusWin;
        this.currentGame = "BASE";
    } else if (this.moneyCacheIndex >= cache.max) {
        this.moneyBonusCache.status = "0,0,0";
        this.moneyBonusCache.wins = "0,0,0";
        this.moneyBonusCache.wins_mask = "h,h,h";
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
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);

    var freeSpinCacheList = [];
    var fsCount = freeSpinCount;
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: {
            length: fsCount,
            viewList: freeSpinCacheList.concat(fsCache.viewList)
        },
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusView = RandomBonusView(baseReels, bpl);
    var bonusViewMoneyCache = RandomMoneyCache(bonusView);
    var bonusCache = {
        view: bonusView,
        moneyCache: bonusViewMoneyCache,
        max: 5
    }
    var moneyBonusCache = RandomBonusViewCache(baseReels, bpl, bsWin, bonusCache);

    var pattern = {
        view: moneyBonusCache.cache,
        bpl: bpl,
        win: moneyBonusCache.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0
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

        if (!isFreeSpinWin(view) && !isMoneyBonusWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels) {
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

        if (isFreeSpinWin(view)) {
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
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview = RandomView(reels);
            freeSpinData.viewList.push(fsview);
            var winMoney = WinFromView(fsview, bpl);

            freeSpinWinMoney += winMoney;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
        }

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

var RandomBonusView = function (reels, bpl) {
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

        if (WinFromView(view, bpl) == 0 && isMoneyBonusWin(view)) {
            break;
        }
    }
    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin, bonusCache) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var moneyBonusSpinCache = {};
        var bonusSpinCacheList = [bonusCache];
        var bonusSpinIndex = 0;
        var bonusSpinLength = 5;
        var bonusSpinWinMoney = 0;
        var respinCnt = 0;

        while (true) {
            var lastCache = bonusSpinCacheList[bonusSpinCacheList.length - 1];
            var newView = Util.clone(lastCache.view);
            var newMoneyCacheValues = Util.clone(lastCache.moneyCache.values);
            var lastMoneySymbolPositions = MoneySymbolPositions(lastCache.view);

            var randomView = RandomView(reels);
            var newMoneySymbolPositions = MoneySymbolPositions(randomView);
            for (var i = 0; i < newMoneySymbolPositions.length; i++) {
                if (lastMoneySymbolPositions.indexOf(newMoneySymbolPositions[i]) < 0) {
                    newView[newMoneySymbolPositions[i]] = moneySymbol;
                    var newMoneyValue = moneyValueList[Util.random(0, moneyValueList.length)];
                    newMoneyCacheValues[newMoneySymbolPositions[i]] = newMoneyValue;

                }
            }
            newMoneyCacheTable = GetTableFromValues(newMoneyCacheValues);
            var newMoneyCache = {
                table: newMoneyCacheTable,
                values: newMoneyCacheValues
            }
            var newCache = {
                view: newView,
                moneyCache: newMoneyCache,
                max: bonusSpinLength
            };
            bonusSpinCacheList.push(newCache);

            if (bonusSpinIndex == bonusSpinLength - 1) {
                if (respinCnt < 3) {
                    bonusSpinLength += Util.random(1, 4);
                    respinCnt++;
                } else {
                    if (Util.probability(20)) {
                        bonusSpinLength += Util.random(1, 4);
                    }
                }
            }

            bonusSpinIndex++;

            if (bonusSpinIndex >= bonusSpinLength || NumberOfmoneyValueList(newView) == slotWidth * slotHeight) {
                bonusSpinWinMoney = NumberOfmoneyValueList(newView) == slotWidth * slotHeight ? MoneyWinFromCache(newMoneyCache, bpl) * 2 : MoneyWinFromCache(newMoneyCache, bpl);
                break;
            }
        }

        moneyBonusSpinCache = {
            cache: bonusSpinCacheList,
            win: bonusSpinWinMoney
        }

        //                                    
        if (moneyBonusSpinCache.win >= minMoney && moneyBonusSpinCache.win <= maxMoney) {
            return moneyBonusSpinCache;
        }

        if (moneyBonusSpinCache.win > lowerLimit && moneyBonusSpinCache.win < minMoney) {
            lowerLimit = moneyBonusSpinCache.win;
            lowerView = moneyBonusSpinCache;
        }
        if (moneyBonusSpinCache.win > maxMoney && moneyBonusSpinCache.win < upperLimit) {
            upperLimit = moneyBonusSpinCache.win;
            upperView = moneyBonusSpinCache;
        }

    }

    return lowerView ? lowerView : upperView;
};

var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        win += moneyCache.values[i];
    }
    return win * bpl;
};

var MoneySymbolPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var RandomMoneyCache = function (view) {
    var values = [];
    for (var i = 0; i < view.length; i++) {
        if (!isMoneySymbol(view[i])) {
            values[i] = 0;
            continue;
        }

        var moneyValue;
        if (Util.probability(99)) {
            moneyValue = moneyValueList[Util.random(0, 3)];
        } else if (Util.probability(90)) {
            moneyValue = moneyValueList[Util.random(0, moneyValueList.length - 4)];
        } else {
            moneyValue = moneyValueList[Util.random(0, moneyValueList.length)];
        }

        values[i] = moneyValue;
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
        case 5000: return "jp1";
        case 2500: return "jp2";
        case 1250: return "jp3";
        case 750: return "jp4";
        case 0: return "r";
    }
    return "v";
};

var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol;
};

var isMoneyBonusWin = function (view) {
    return NumberOfmoneyValueList(view) >= 6;
};

var NumberOfmoneyValueList = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result++;
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) == 3;
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

var ScatterWinFromView = function (view, totalBet) {
    if (isFreeSpinWin(view)) {
        return totalBet * 2;
    }
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
}


module.exports = SlotMachine;