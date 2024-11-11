var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 30;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [9, 3, 7, 1, 2, 5, 6, 9, 8, 4, 5, 7, 3, 10, 7, 4, 9, 3, 7, 2, 5, 6, 9, 8, 4, 5, 7, 3, 10, 7, 4],
    [8, 9, 3, 10, 9, 5, 2, 6, 1, 4, 3, 7, 8, 9, 3, 10, 9, 5, 2, 6, 4, 3, 7],
    [7, 9, 3, 10, 5, 9, 4, 1, 8, 6, 2, 7, 9, 3, 10, 5, 9, 4, 8, 6, 2],
    [5, 10, 6, 8, 5, 2, 7, 9, 3, 4, 1, 7, 5, 10, 6, 8, 5, 2, 7, 9, 3, 4, 7],
    [6, 10, 3, 9, 8, 5, 6, 7, 4, 2, 9, 8, 5, 3, 7, 1, 4, 7, 6, 10, 3, 9, 8, 5, 6, 7, 4, 2, 9, 8, 5, 3, 7, 4, 7],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 50, 30, 20, 15, 10, 5, 5, 3, 3],
    [0, 0, 200, 75, 60, 50, 30, 15, 15, 10, 10],
    [0, 0, 750, 250, 200, 150, 100, 30, 30, 20, 20],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .),
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
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0];

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // // console.log(`[            ] ${freeSpinMoney}`);
    }

    var result = WinFromView(this.view, player.betPerLine);
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
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    var result = WinFromView(this.view, player.betPerLine);
    this.winMoney = result.win * 3;
    this.winLines = result.lines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }
    tmpWin = WinFromView(tmpView, bpl).win;

    var pattern = {
        view: tmpView,
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
    var freeSpinCount = GetFreeSpinCount(scatterView);
    var freeSpinData = {
        length: freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(baseReels, bpl, fsWin, freeSpinData.length);

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
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl).win * 3;
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

        tmpWin = WinFromView(tmpView, bpl).win;
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView;
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

        var scatterCount = NumberOfScatters(view);
        var wildCount = NumberOfWilds(view);

        if (!isDoubleSymbol(view) && scatterCount < 3 && (scatterCount == 0 || Util.probability(10)) && (wildCount == 0 || Util.probability(20)) && wildCount < 3) {
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

        if (WinFromView(view, bpl).win > 0 || isDoubleSymbol(view)) {
            continue;
        }

        if (NumberOfScatters(view) == 3) {
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
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);
                fsWin = WinFromView(fsview, bpl).win * 3;

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsview);
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
    var lines = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        var result = RecursiveSearch(view, 1, history, view[pos], bpl);
        money += result.win;
        lines = lines.concat(result.lines);
    }

    return { win: money, lines: lines };
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    var winLines = [];
    var result = {};

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId];

        if (winMoney > 0) {
            if (CheckWildWin(history, view)) winMoney *= 2;
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
        var winMoney = bpl * payTable[matchCount][symbolId];

        if (winMoney > 0) {
            if (CheckWildWin(history, view)) winMoney *= 2;
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
        var tempRes = RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);

        winMoney += tempRes.win;
        winLines = winLines.concat(tempRes.lines);
    }

    result.win = winMoney;
    result.lines = winLines;
    return result;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
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

var CheckWildWin = function (history, view) {
    for (var i = 0; i < history.length; i++) {
        if (view[history[i]] == wild) {
            return true;
        }
    }

    return false;
};

var isDoubleSymbol = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var first = i + slotWidth;
        var second = i + slotWidth * 2;

        if (view[i] == view[first] || view[first] == view[second] || view[i] == view[second]) {
            return true;
        }
    }

    return false;
};

var GetFreeSpinCount = function (scatterView) {
    var freeSpinCount = 0;
    var scatterCount = NumberOfScatters(scatterView);

    if (scatterCount == 3) {
        freeSpinCount = 15;
    } else if (scatterCount == 4) {
        freeSpinCount = 20;
    } else if (scatterCount == 5) {
        freeSpinCount = 25;
    }

    return freeSpinCount;
};

module.exports = SlotMachine;