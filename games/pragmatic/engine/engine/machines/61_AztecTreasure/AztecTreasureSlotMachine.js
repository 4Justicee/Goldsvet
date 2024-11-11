var Util = require('../../../utils/slot_utils');

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
    this.wins = [];
    this.status = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.aw_p = 0;
    this.freeSpinMulti = 1;

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, empty = 15;
var slotWidth = 5, slotHeight = 6;
var multipleFactors = [2, 3, 5, 10, 25];
var baseReels = [
    [7, 6, 7, 8, 12, 4, 5, 5, 8, 8, 10, 11, 11, 6, 10, 4, 9, 9, 7, 7, 7, 3, 3, 8, 5, 8, 10, 11, 11, 11, 8, 9, 6, 6, 10, 10, 12, 12, 6, 9, 9, 9, 9, 1, 7, 8, 7, 7, 10, 12, 12, 5, 12, 5, 8, 4, 11, 7, 3],
    [11, 10, 9, 5, 9, 10, 10, 2, 11, 12, 12, 12, 1, 3, 3, 5, 5, 10, 10, 8, 11, 11, 9, 9, 8, 8, 7, 7, 7, 8, 8, 8, 11, 11, 11, 12, 4, 4, 12, 12, 6, 6, 9, 9, 9, 5, 5, 7, 7, 6, 6, 6, 2, 2, 5, 10, 10, 1, 10, 3, 4, 4, 7, 6, 8, 6, 5, 4, 8, 8, 10, 4, 4],
    [7, 9, 11, 9, 4, 4, 11, 11, 8, 8, 2, 2, 9, 1, 3, 3, 11, 8, 7, 7, 11, 12, 12, 6, 6, 9, 9, 4, 4, 1, 7, 10, 10, 11, 2, 9, 7, 12, 7, 9, 9, 9, 5, 3, 8, 5, 12, 12, 4, 4, 10, 11, 1, 8, 5, 5, 11, 8, 6, 8, 4, 10, 10, 10, 4, 5, 12, 12, 6],
    [10, 6, 11, 9, 6, 6, 8, 8, 12, 5, 5, 5, 5, 11, 1, 9, 9, 8, 8, 11, 3, 3, 4, 4, 2, 2, 4, 6, 11, 11, 5, 5, 12, 12, 7, 7, 6, 3, 3, 4, 4, 9, 9, 7, 8, 10, 10, 2, 11, 4, 11, 10, 10, 1, 6, 11, 11, 12, 12, 12, 6, 8, 8, 5, 7, 10, 4],
    [4, 5, 10, 8, 4, 4, 7, 12, 12, 8, 8, 9, 3, 6, 6, 4, 7, 7, 6, 8, 1, 10, 8, 8, 8, 9, 5, 5, 7, 7, 7, 6, 6, 6, 3, 3, 4, 10, 5, 12, 11, 11, 11, 5, 5, 9, 10, 10, 9, 9, 12, 12, 11, 4, 11, 11, 5, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 12, 10, 8, 8, 5, 5, 5, 4, 4, 0, 0, 0],
    [0, 0, 0, 30, 25, 15, 12, 12, 10, 8, 8, 6, 6, 0, 0, 0],
    [0, 0, 0, 80, 50, 30, 20, 20, 15, 10, 10, 8, 8, 0, 0, 0]
];
var reelSizeArray = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 6];
var freeSpinCountList = [5, 10, 15, 20, 25];
var freeSpinMultiList = [2, 3, 5, 7, 10];
var winMulti = 1;
var winLines = [];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .),
    this.normalPercent = 40; //                                 ,                                               ,                                     .
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
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "BONUS";
        this.freeSpinLength = this.freeSpinCacheList.length - 1;
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;
    var freeSpinCountArr = [...freeSpinCountList];
    Util.shuffle(freeSpinCountArr);
    if (freeSpinCountArr[0] != this.freeSpinLength) {
        var index = freeSpinCountArr.indexOf(this.freeSpinLength);
        var tmp = freeSpinCountArr[0];
        freeSpinCountArr[0] = freeSpinCountArr[index];
        freeSpinCountArr[index] = tmp;
    }

    this.wins = freeSpinCountArr.join();
    this.status = [1, 0, 0, 0, 0];
    this.currentGame = "FREE";
}

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    this.freeSpinMulti = cache.multi;
    this.aw_p = freeSpinMultiList.indexOf(this.freeSpinMulti);
    this.winMoney = WinFromView(this.view, player.betPerLine) * this.freeSpinMulti;
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.freeSpinWinMoney += this.winMoney;
    this.freeSpinIndex++;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpResult;

    if (baseWin > 0) {
        tmpResult = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpResult = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: tmpResult.view,
        win: tmpResult.win,
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
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var fsCount = freeSpinCountList[Util.random(0, freeSpinCountList.length)];

    var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, bottomLimit = 0, calcCount = 0;
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

    var result = {
        view: tmpView,
        win: tmpWin
    }
    return result;
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

    var result = {
        view: tmpView,
        win: tmpWin
    }
    return result;
};

var RandomView = function (reels, isRandomReelSize = false) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = reelSizeArray[Util.random(0, reelSizeArray.length)];
            if (isRandomReelSize) {
                reelSize = Util.random(2, 7);
            }

            for (var j = 0; j < reelSize; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                randomView[viewPos] = reels[i][reelPos];
            }
            for (var j = reelSize; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                randomView[viewPos] = empty;
            }
        }
        if (!isFreeSpinWin(randomView)) {
            break;
        }
    }

    return randomView;
};

var RandomScatterView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        if (NumberOfScatters(view) != 0 || WinFromView(view, bpl) != 0) {
            continue;
        }
        var reelsPos = [0, 1, 2, 3, 4];
        Util.shuffle(reelsPos);
        var nScatters = 3;
        for (var i = 0; i < nScatters; i++) {
            var reelNo = reelsPos[i];
            var reelSize;
            for (reelSize = 0; reelSize < slotHeight; reelSize++) {
                var pos = reelNo + reelSize * slotWidth;
                if (view[pos] == empty) {
                    break;
                }
            }
            var pos = reelNo + Util.random(0, reelSize) * slotWidth;
            view[pos] = scatter;
        }
        return view;
    }
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
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView, tmpWin = 0;

        while (true) {
            tmpView = RandomView(reels);
            var multi = freeSpinMultiList[Util.random(0, freeSpinMultiList.length)];
            tmpWin = WinFromView(tmpView, bpl) * multi;

            var cache = {
                view: tmpView,
                multi: multi
            };
            freeSpinCacheList.push(cache);
            freeSpinTotalWin += tmpWin;

            freeSpinIndex++;
            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin
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
    winLines = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (view[pos] == empty) {
            continue;
        }
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    //                           ,                                               
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId] * winMulti;
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
        var winMoney = bpl * payTable[matchCount][symbolId] * winMulti;
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

var isWild = function (symbol) {
    return symbol == wild;
}

module.exports = SlotMachine;