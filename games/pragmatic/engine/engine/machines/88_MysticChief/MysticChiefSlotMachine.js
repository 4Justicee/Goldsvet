var Util = require("../../../utils/slot_utils");

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
    this.wildsArr = [];
    this.expandWildPos = 0;
    this.expandMulti = 0;
    this.wildReelIndex = 0;
    this.baseType = "NORMAL";

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMore = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1;
var wild = 2;
var wildExpand = 14;
var bonus = 15;
var empty = 13;
var slotWidth = 5;
var slotHeight = 4;
var baseWildPercent = 10;
var baseReels = [
    [11, 7, 8, 10, 5, 9, 6, 4, 3, 12, 15, 8, 6, 12, 3, 4, 6, 8, 10, 7, 3, 8, 9, 4, 3, 8, 6, 12, 4, 3, 8, 6, 5, 3, 8, 6, 9, 4, 3, 8, 5, 4, 8, 12, 3, 6, 8, 12, 3, 6, 5, 4, 15, 9, 6, 3, 8, 7, 6, 4, 8, 5, 6, 4, 12, 8, 6, 9, 3, 5, 6, 4, 3, 7, 8, 6, 9, 4, 10, 8, 6, 5],
    [9, 3, 12, 7, 8, 4, 6, 10, 5, 11, 7, 12, 8, 10, 7, 11, 9, 12, 8, 3, 1, 11, 8, 3, 12, 10, 7, 8, 12, 10, 7, 8, 12, 3, 7, 8, 4, 10, 11, 12, 6, 8, 11, 7, 12, 5, 8, 10, 7, 11, 5, 6, 4, 12, 8, 1, 7, 9, 8, 3, 7, 12, 6, 8, 10, 12, 7, 11, 6, 4, 3, 7, 6, 8, 11, 12, 10, 5, 7, 6, 8],
    [8, 4, 12, 7, 9, 3, 6, 5, 11, 10, 9, 4, 11, 10, 9, 1, 6, 11, 9, 4, 10, 12, 7, 9, 4, 12, 10, 9, 4, 12, 10, 9, 4, 12, 11, 1, 4, 9, 10, 11, 4, 9, 10, 6, 11, 4, 9, 10, 11, 5, 12],
    [12, 7, 11, 8, 6, 9, 3, 5, 10, 1, 4, 7, 6, 3, 9, 7, 11, 4, 3, 7, 6, 4, 3, 9, 11, 6, 10, 4, 8, 6, 7, 9, 11, 10, 5, 7, 6, 4, 3, 7, 6, 10, 4, 3, 11, 6, 4, 10, 11, 8, 4, 1, 3, 11, 6, 9, 4, 10, 3, 9, 4, 6, 10, 7, 3, 6, 10, 9, 7, 3],
    [5, 3, 9, 12, 7, 6, 15, 10, 11, 8, 4, 7, 11, 10, 4, 6, 11, 9, 4, 6, 3, 11, 7, 15, 8, 9, 5, 4, 3, 9, 7, 4, 10, 9, 11, 6, 4, 11, 3, 9, 10, 4],
];
var freeReels = [
    [3, 11, 7, 4, 10, 5, 6, 15, 12, 9, 8, 4, 10, 11, 12, 8, 4, 7, 5, 10, 9, 11, 6, 4, 10, 11, 9, 7, 5, 8, 11, 4, 10, 6, 11, 8, 10, 5, 9, 6, 4, 11, 5, 6, 8, 4, 9, 6, 7, 5, 9, 8, 4, 5, 12, 11, 7, 4, 5, 10, 6, 11, 9, 8, 4, 11, 10, 5, 4, 9, 6, 11, 10, 4, 7, 11, 10, 6, 5, 9, 4, 6, 7, 11, 4, 10, 6, 11, 5, 10, 15, 11, 6, 10, 8, 5, 12, 6, 11, 5, 8, 10, 9, 11, 8, 10, 5, 11, 6, 4, 5, 7, 6, 4, 5, 9, 11, 6, 4, 5, 11, 6, 7],
    [6, 8, 10, 4, 12, 8, 10, 9, 3, 8, 4, 10, 12, 8, 5, 6, 10, 8, 12, 7, 10, 3, 6, 8, 10, 12, 11, 8, 4, 10, 12, 3, 5, 9, 4, 12],
    [7, 9, 5, 11, 3, 9, 5, 11, 3, 9, 5, 11, 3, 9, 5, 11, 3, 9, 5, 11, 3, 9, 5, 11, 3, 9, 5, 11, 3, 9, 5, 11, 3, 9, 5, 11, 3, 9, 4, 11, 5, 9, 3, 11, 5, 9, 3, 11, 5],
    [9, 5, 3, 10, 12, 6, 4, 11, 7, 8, 3, 10, 4, 6, 3, 12, 8, 11, 6, 7, 3, 12, 6, 7, 3, 12, 6, 7, 4, 3, 6, 7, 10, 4, 6, 3, 7, 12, 6, 10, 4, 3, 12, 7, 11, 3, 6, 8, 7, 4],
    [3, 8, 5, 9, 6, 11, 12, 10, 7, 4, 12, 5, 10, 15, 8, 9, 10, 6, 8, 5, 10, 6, 7, 9, 12, 10, 7, 6, 9, 5, 8, 10, 12, 7, 4, 9, 12, 6, 8, 10, 7, 12, 9, 10, 8, 5, 15, 10, 9, 12, 6, 10, 8, 7, 4, 10, 12, 6, 5, 11, 8, 6, 10, 7, 8, 12, 5, 10, 7, 8, 12, 10, 9, 7, 8, 5, 9, 10, 12, 5, 8, 7, 10, 5, 8, 12, 10, 6, 8, 5, 10, 7, 8, 9, 10, 5],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 20, 12, 12, 10, 10, 7, 7, 5, 5, 5, 0, 0, 0],
    [0, 0, 0, 100, 60, 50, 40, 30, 25, 25, 20, 20, 20, 0, 0, 0],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;

        this.view = cache.view;
        this.maskView = cache.mask;
        this.baseType = cache.type;

        if (cache.type == "NORMAL") {
            this.wildsArr = [];
            this.expandWildPos = 0;
            this.expandMulti = 1;
            this.wildReelIndex = 0;
        } else if (cache.type == "WILD") {
            this.expandWildPos = cache.pos;
            this.wildsArr = cache.wilds;
            this.expandMulti = cache.multi;
            this.wildReelIndex = cache.index;
        } else if (cache.type == "BONUS") {
            this.wildsArr = cache.wilds;
            this.expandMulti = 1;
        }
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;

        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;
        this.view = this.freeSpinCacheList[0];

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    }

    var result = WinFromView(this.view, player.betPerLine, this.expandMulti);
    this.winMoney = result.win;
    this.winLines = result.lines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    this.maskView = cache.mask;
    this.baseType = cache.type;

    this.expandWildPos = cache.pos;
    this.wildsArr = cache.wilds;
    this.expandMulti = cache.multi;
    this.wildReelIndex = cache.index;

    var result = WinFromView(this.view, player.betPerLine, this.expandMulti);
    this.winMoney = result.win;
    this.winLines = result.lines;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    if (NumberOfBonus(this.view) > 0) {
        this.freeSpinMore = 1;
        this.freeSpinLength++;
    } else {
        this.freeSpinMore = 0;
    }

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpCache, tmpWin;

    if (baseWin > 0) {
        tmpCache = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpCache = RandomZeroView(baseReels, bpl);
    }

    tmpWin = tmpCache.win;
    delete tmpCache["win"];

    var pattern = {
        view: tmpCache,
        win: tmpWin,
        type: "BASE",
        bpl: bpl,
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
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinData = {
        length: 8,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var cache = {};
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var multi = 1;
        tmpView = RandomView(reels);

        if (isBonusView(tmpView)) {
            cache = GetBonusView(tmpView);
        } else if (Util.probability(baseWildPercent)) {
            cache = GetExpandWildView(tmpView);
            multi = cache.multi;
        } else {
            cache.view = tmpView;
            cache.mask = [];
            cache.type = "NORMAL";
        }

        tmpWin = WinFromView(cache.view, bpl, multi).win;
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    cache.win = tmpWin;
    return cache;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;
    var cache = {};

    while (true) {
        var multi = 1;
        tmpView = RandomView(reels);

        if (isBonusView(tmpView)) {
            cache = GetBonusView(tmpView);
        } else {
            cache.view = tmpView;
            cache.mask = [];
            cache.type = "NORMAL";
        }

        tmpWin = WinFromView(cache.view, bpl, multi).win;
        if (tmpWin == 0) {
            break;
        }
    }

    cache.win = tmpWin;
    return cache;
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

        view[0] = empty;
        view[4] = empty;

        if (!isFreeSpinWin(view) && !isDoubleScatterView(view) && (!isBonusView(view) || Util.probability(70))) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl) {
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

        if (isFreeSpinWin(view) && WinFromView(view, bpl).win == 0 && !isDoubleScatterView(view) && !isBonusView(view)) {
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

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        freeSpinData.viewList = [];

        while (true) {
            var fsview, fsWin, fsCache;
            while (true) {
                fsview = RandomFreeView(reels);
                fsCache = GetExpandWildView(fsview);

                fsWin = WinFromView(fsCache.view, bpl, fsCache.multi).win;
                if (Util.probability(70) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsCache);

            if (NumberOfBonus(fsCache.view) > 0) {
                freeSpinLength++;
            }

            freeSpinWinMoney += fsWin;
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

var RandomFreeView = function (reels) {
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

        view[0] = empty;
        view[4] = empty;

        var bonusCount = NumberOfBonus(view);

        if (!isFreeSpinWin(view) && bonusCount < 2 && (bonusCount == 0 || Util.probability(10))) {
            break;
        }
    }
    return view;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl, wMulti = 1) {
    var money = 0;
    var lines = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        var result = RecursiveSearch(view, 1, history, view[pos], wMulti, bpl);
        money += result.win;
        lines = lines.concat(result.lines);
    }

    return { win: money, lines: lines };
};

var RecursiveSearch = function (view, step, history, symbolId, wMulti, bpl) {
    var winLines = [];
    var result = {};

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId] * wMulti;

        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join("~")}`);
        }

        result.win = winMoney;
        result.lines = winLines;
        return result;
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
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId] * wMulti;

        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join("~")}`);
        }

        result.win = winMoney;
        result.lines = winLines;
        return result;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        var tempRes = RecursiveSearch(view, step + 1, historyTmp, symbolId, wMulti, bpl);

        winMoney += tempRes.win;
        winLines = winLines.concat(tempRes.lines);
    }

    result.win = winMoney;
    result.lines = winLines;
    return result;
};

var GetBonusView = function (view) {
    var newView = Util.clone(view);

    var wildCount = Util.random(1, 6);
    var wildPos = [];
    var exceptList = [0, 5, 10, 15, 4, 9, 14, 19];

    //                                 
    while (true) {
        var rand = Util.random(0, view.length);
        if (wildPos.indexOf(rand) == -1 && exceptList.indexOf(rand) == -1) {
            wildPos.push(rand);
        }
        if (wildPos.length >= wildCount) {
            break;
        }
    }

    for (var i = 0; i < wildPos.length; i++) {
        newView[wildPos[i]] = wildExpand;
    }

    var cache = {
        mask: view,
        view: newView,
        wilds: wildPos,
        type: "BONUS",
    };

    return cache;
};

var GetExpandWildView = function (view) {
    var startView = Util.clone(view);
    var wildView = Util.clone(view);

    var wildReelIndex = Util.random(1, 4);
    var wildPos = Util.random(0, 4) * slotWidth + wildReelIndex;
    var wildArr = [];

    startView[wildPos] = wildExpand;

    for (var i = 0; i < 4; i++) {
        var pos = i * slotWidth + wildReelIndex;
        wildView[pos] = wildExpand;
        wildArr.push(pos);
    }

    var multi = Util.random(1, 7);

    var cache = {
        mask: startView,
        view: wildView,
        wilds: wildArr,
        pos: wildPos,
        multi: multi,
        index: wildReelIndex,
        type: "WILD",
    };

    return cache;
};

var isWild = function (symbol) {
    return symbol == wild || symbol == wildExpand;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isBonus = function (symbol) {
    return symbol == bonus;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isBonusView = function (view) {
    var flag1 = false;
    for (var i = 1; i < 4; i++) {
        var pos = i * slotWidth;
        if (isBonus(view[pos])) {
            flag1 = true;
        }
    }

    var flag2 = false;
    for (var j = 1; j < 4; j++) {
        var pos = j * slotWidth + 4;
        if (isBonus(view[pos])) {
            flag2 = true;
        }
    }

    return flag1 && flag2;
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

var NumberOfWilds = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result++;
        }
    }
    return result;
};

var NumberOfBonus = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isBonus(view[i])) {
            result++;
        }
    }
    return result;
};

var isDoubleScatterView = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var scatterCount = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (isScatter(view[i + j * slotWidth])) {
                scatterCount++;
            }
        }

        if (scatterCount > 1) {
            return true;
        }
    }

    return false;
};

module.exports = SlotMachine;