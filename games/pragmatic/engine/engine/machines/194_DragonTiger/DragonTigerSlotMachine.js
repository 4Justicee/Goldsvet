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
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMulti = 0;
    this.freeSpinMore = 0;
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.wildPosition = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 4;
var wildMultiArr = [2, 3, 5];
var baseReels = [
    [10, 3, 3, 3, 9, 11, 3, 3, 10, 3, 3, 12, 10, 9, 6, 11, 13, 10, 4, 9, 11, 5, 10, 7, 10, 11, 10, 9, 11, 10, 9, 10, 9, 6, 10, 9, 11, 1, 8, 10, 9, 4, 11, 12, 10, 7],
    [6, 12, 5, 8, 7, 13, 5, 12, 2, 10, 5, 12, 6, 8, 5, 12, 5, 11, 12, 2, 4, 8, 12, 5, 3, 3, 3, 8, 5, 9, 12, 5, 13, 12, 3, 3, 5, 9, 5, 12, 11, 5, 12, 7, 8, 5, 9, 1, 12, 5, 11, 5],
    [5, 13, 6, 11, 7, 13, 2, 8, 5, 12, 6, 13, 7, 13, 3, 3, 11, 6, 12, 7, 3, 3, 3, 8, 5, 12, 4, 1, 3, 13, 11, 6, 13, 7, 8, 13, 12, 2, 8, 4, 13, 5, 9, 13, 8, 5, 13, 11, 5, 8, 12, 9, 6, 13, 8, 1, 9, 7, 13, 4, 10, 5, 13, 6, 8, 7, 10, 7],
    [7, 12, 6, 9, 3, 3, 3, 10, 3, 3, 8, 3, 3, 3, 10, 11, 9, 5, 10, 4, 11, 7, 9, 6, 3, 10, 2, 10, 6, 9, 1, 5, 10, 4, 6, 10, 6, 4, 13, 7, 9, 7, 6, 10, 7, 8, 6, 11, 7, 9, 4, 2, 10, 13],
    [5, 9, 7, 13, 7, 5, 12, 7, 9, 4, 9, 4, 5, 11, 7, 12, 1, 10, 7, 9, 4, 3, 3, 3, 7, 12, 5, 8, 4, 10, 3, 7, 9, 4, 13, 5, 4, 8, 6, 10, 7, 9, 4, 9, 4, 10, 7, 9, 4, 10, 7, 9, 1, 10, 7, 9, 4, 13],
];
var freeReels = [
    [10, 3, 3, 9, 11, 10, 3, 12, 10, 9, 10, 9, 5, 11, 10, 13, 9, 10, 9, 6, 10, 9, 11, 1, 8, 10, 9, 4, 11, 12, 10, 7],
    [6, 12, 5, 8, 7, 13, 5, 4, 12, 2, 10, 5, 12, 6, 8, 9, 3, 12, 4, 5, 13, 12, 5, 9, 3, 3, 5, 12, 11, 5, 12, 7, 8, 5, 9, 1, 12, 5, 11, 5],
    [5, 13, 6, 11, 7, 13, 4, 8, 5, 12, 6, 13, 7, 13, 11, 6, 3, 13, 7, 8, 13, 12, 2, 8, 13, 5, 9, 8, 5, 3, 3, 13, 11, 5, 8, 12, 2, 9, 6, 13, 8, 1, 9, 7, 13, 4, 10, 5, 13, 6, 8, 7, 10, 7],
    [7, 12, 6, 9, 10, 3, 3, 8, 2, 10, 6, 9, 1, 5, 10, 3, 4, 6, 10, 6, 4, 13, 7, 9, 7, 6, 10, 7, 8, 6, 11, 7, 9, 4, 2, 10, 13],
    [5, 9, 7, 13, 7, 5, 12, 7, 9, 4, 9, 4, 5, 11, 4, 10, 3, 7, 9, 4, 13, 5, 4, 8, 6, 10, 7, 9, 4, 9, 3, 3, 4, 10, 7, 9, 4, 10, 7, 9, 1, 10, 7, 9, 4, 13],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 25, 25, 25, 10, 10, 5, 5, 3, 3, 2, 2],
    [0, 0, 0, 50, 50, 50, 40, 40, 25, 25, 10, 10, 5, 5],
    [0, 0, 0, 150, 75, 75, 60, 60, 50, 50, 50, 50, 50, 50],
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
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0];

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    }

    var res = WinFromView(this.view, player.betPerLine, this.wildMulti);
    this.winMoney = res.win;
    this.winLines = res.lines;

    this.scatterWin = ScatterWinFromView(this.view, Number(player.betPerLine * this.lineCount));
    this.winMoney += this.scatterWin;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinMulti = 1;
        this.freeSpinMore = 0;
        this.scatterPositions = ScatterPositions(this.view);
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.freeSpinMulti = cache.multi;

    this.wildPosition = GetWildPosition(this.view);

    var result = WinFromView(this.view, player.betPerLine, this.freeSpinMulti);
    this.winMoney = result.win;
    this.winLines = result.lines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinMore = GetFreeSpinMoreCount(this.view);
    this.freeSpinLength += this.freeSpinMore;

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
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl).win;

    var freeSpinCount = GetFreeSpinCount(scatterView);
    var freeSpinData = {
        length: freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
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
        tmpWin = WinFromView(tmpView, bpl).win;

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

        if (scatterCount < 3 && (scatterCount == 0 || Util.probability(10))) {
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
            var fsview, fsWin, wildMulti;
            while (true) {
                fsview = RandomFreeView(reels);

                //                        
                if (NumberOfWilds(fsview) > 0) {
                    wildMulti = wildMultiArr[Util.random(0, 2)];
                } else {
                    wildMulti = 1;
                }

                fsWin = WinFromView(fsview, bpl, wildMulti).win;
                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push({
                view: fsview,
                multi: wildMulti,
            });
            freeSpinWinMoney += fsWin;

            freeSpinLength += GetFreeSpinMoreCount(fsview);

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

        var wildCount = NumberOfWilds(view);
        var scatterCount = NumberOfScatters(view);

        if (wildCount < 2 && scatterCount < 3 && (scatterCount == 0 || Util.probability(30))) {
            break;
        }
    }
    return view;
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
        var winMoney = bpl * payTable[step][symbolId];

        var hasWild = false;
        for (var i = 0; i < history.length; i++) {
            if (view[history[i]] == wild) {
                hasWild = true;
                break;
            }
        }
        if (hasWild) {
            winMoney *= wMulti;
        }

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
        var winMoney = bpl * payTable[matchCount][symbolId];

        var hasWild = false;
        for (var i = 0; i < history.length; i++) {
            if (view[history[i]] == wild) {
                hasWild = true;
                break;
            }
        }
        if (hasWild) {
            winMoney *= wMulti;
        }

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

var GetFreeSpinCount = function (scatterView) {
    var freeSpinCount = 0;
    var scatterCount = NumberOfScatters(scatterView);

    if (scatterCount == 3) {
        freeSpinCount = 8;
    } else if (scatterCount == 4) {
        freeSpinCount = 15;
    } else if (scatterCount == 5) {
        freeSpinCount = 20;
    }

    return freeSpinCount;
};

var GetFreeSpinMoreCount = function (scatterView) {
    var freeSpinCount = 0;
    var scatterCount = NumberOfScatters(scatterView);

    if (scatterCount == 2) {
        freeSpinCount = 5;
    } else if (scatterCount == 3) {
        freeSpinCount = 8;
    } else if (scatterCount == 4) {
        freeSpinCount = 15;
    } else if (scatterCount == 5) {
        freeSpinCount = 20;
    }

    return freeSpinCount;
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

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var ScatterWinFromView = function (view, totalBet) {
    var scatterCount = NumberOfScatters(view);
    if (scatterCount == 3) {
        return totalBet * 2;
    } else if (scatterCount == 4) {
        return totalBet * 10;
    } else if (scatterCount == 5) {
        return totalBet * 20;
    }

    return 0;
};

var GetWildPosition = function (view) {
    var result = [];

    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result.push(i);
        }
    }

    return result;
};

module.exports = SlotMachine;