var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 50;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinType = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.scatterWin = 0;
    this.scatterPositions = [];

    this.wildMulti = 0;
    this.wildMultiSet = [];
    this.wrlm_cs = "";
    this.wrlm_res = "";

    //                 
    this.bonusCacheList = [];
    this.bonusSpinIndex = 0;
    this.bonusMaskList = [];
    this.bonusWinsList = [];
    this.bonusStatusList = [];
    this.moneyBonusWin = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1;
var wild = 2;
var emptySymbol = 14;
var slotWidth = 5;
var slotHeight = 4;
var baseReels = [
    [4, 8, 7, 10, 13, 3, 8, 1, 5, 11, 13, 6, 12, 9, 4, 8, 7, 10, 13, 3, 8, 1, 5, 11, 13, 6, 12, 9],
    [5, 9, 11, 2, 13, 11, 3, 10, 4, 8, 6, 1, 7, 12, 5, 9, 2, 10, 13, 11, 3, 10, 4, 8, 6, 1, 7, 12],
    [4, 2, 3, 10, 5, 13, 7, 9, 1, 8, 5, 12, 6, 11, 4, 9, 3, 10, 5, 13, 7, 2, 4, 8, 5, 12, 6, 11],
    [6, 11, 2, 13, 11, 4, 9, 5, 12, 3, 10, 7, 8, 1, 6, 11, 5, 13, 11, 4, 9, 5, 12, 3, 10, 7, 8, 3],
    [9, 3, 8, 5, 9, 13, 6, 8, 10, 4, 11, 1, 7, 12, 9, 3, 8, 5, 9, 13, 6, 8, 10, 4, 11, 3, 7, 12],
];
var freeReels = [
    [4, 8, 7, 10, 13, 3, 8, 1, 5, 11, 13, 6, 12, 9, 4, 8, 7, 10, 13, 3, 8, 1, 5, 11, 13, 6, 12, 9],
    [5, 9, 11, 2, 13, 11, 3, 10, 4, 8, 6, 1, 7, 12, 5, 9, 2, 10, 13, 11, 3, 10, 4, 8, 6, 1, 7, 12],
    [4, 2, 3, 10, 5, 13, 7, 9, 1, 8, 5, 12, 6, 11, 4, 9, 3, 10, 5, 13, 7, 2, 4, 8, 5, 12, 6, 11],
    [6, 11, 2, 13, 11, 4, 9, 5, 12, 3, 10, 7, 8, 1, 6, 11, 5, 13, 11, 4, 9, 5, 12, 3, 10, 7, 8, 3],
    [9, 3, 8, 5, 9, 13, 6, 8, 10, 4, 11, 1, 7, 12, 9, 3, 8, 5, 9, 13, 6, 8, 10, 4, 11, 3, 7, 12],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 35, 30, 20, 15, 10, 10, 10, 10, 5, 5, 0],
    [0, 0, 0, 100, 100, 100, 50, 35, 30, 20, 15, 15, 15, 10, 0],
    [0, 0, 0, 1000, 800, 800, 300, 300, 200, 200, 100, 100, 100, 100, 0],
];
var wildMultiArray = [1, 2, 3, 5, 8, 10, 15, 30, 40];

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
        this.wildMulti = cache.wildMulti;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        var cache = this.freeSpinCacheList[0][0].view;

        this.view = cache.view;
        this.wildMulti = cache.wildMulti;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }

        console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    }

    var res = WinFromView(this.view, player.betPerLine, this.wildMulti);

    this.winMoney = res.win;
    this.winLines = res.lines;
    this.scatterWin = ScatterWinFromView(this.view, Number(player.betPerLine * this.lineCount));
    this.winMoney += this.scatterWin;

    var wildPositions = GetWildPositions(this.view);

    this.wrlm_cs = `${wild}~0`;
    if (this.winMoney > 0 && wildPositions.length > 0) {
        this.wrlm_res = `${wild}~${this.wildMulti}~${wildPositions}`;
    } else {
        this.wrlm_res = `${wild}~${this.wildMulti}`;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;

        this.scatterPositions = ScatterPositions(this.view);
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpinOption = async function (player, select) {
    this.freeSpinType = Number(select);

    this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
    this.freeSpinLength = this.freeSpinCacheList[0].freeSpinLength;
    this.wildMultiSet = this.freeSpinCacheList[0].wildMultiSet;
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    var wildMulti = cache.wildMulti;
    var wildMultiSetIndex = this.freeSpinCacheList[0].wildMultiSetIndex;

    var res = WinFromView(this.view, player.betPerLine, wildMulti);
    this.winMoney = res.win;
    this.winLines = res.lines;

    var wildPositions = GetWildPositions(this.view);

    this.wrlm_cs = `${wild}~${this.freeSpinType + 1}`;
    if (this.winMoney > 0 && wildPositions.length > 0) {
        this.wrlm_res = `${wild}~${wildMulti}~${wildPositions}`;
    } else {
        this.wrlm_res = `${wild}~${wildMulti}`;
    }

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

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
    tmpCache.win = null;

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
    // FS                
    var viewList = [];
    var moneyList = [];

    var scatterViewCache = RandomScatterView(baseReels);
    var wildMulti = LuckyPick(wildMultiArray);
    var scatterWinMoney = WinFromView(scatterViewCache.view, bpl, wildMulti).win + ScatterWinFromView(scatterViewCache.view, totalBet);

    var lengthArray = [25, 20, 15, 13, 10, 6];
    var wildMultiSetArray = [
        [2, 3, 5],
        [3, 5, 8],
        [5, 8, 10],
        [8, 10, 15],
        [10, 15, 30],
        [15, 30, 40],
    ];

    for (var i = 0; i < 7; i++) {
        var freeSpinLength = 0; //             
        var wildMultiSet = []; //              
        var wildMultiSetIndex = 0;

        //                                                     
        if (i == 6) {
            wildMultiSetIndex = Util.random(0, wildMultiSetArray.length);
            freeSpinLength = lengthArray[Util.random(0, lengthArray.length)];
            wildMultiSet = wildMultiSetArray[wildMultiSetIndex];
        } else {
            wildMultiSetIndex = i;
            freeSpinLength = lengthArray[i];
            wildMultiSet = wildMultiSetArray[i];
        }

        viewList[i] = [];

        var scatterCache = {
            view: scatterViewCache,
            freeSpinLength: freeSpinLength,
            wildMultiSet: wildMultiSet,
            wildMultiSetIndex: wildMultiSetIndex,
        };

        viewList[i] = [scatterCache];

        var result = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinLength, wildMultiSet);
        viewList[i] = viewList[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: viewList,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, wildMulti;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        wildMulti = LuckyPick(wildMultiArray);
        tmpWin = WinFromView(tmpView, bpl, wildMulti).win;

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return {
        view: tmpView,
        wildMulti: wildMulti,
        win: tmpWin,
    };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin, wildMulti;

    while (true) {
        tmpView = RandomView(reels);
        wildMulti = LuckyPick(wildMultiArray);
        tmpWin = WinFromView(tmpView, bpl, wildMulti).win;

        if (tmpWin == 0) {
            break;
        }
    }
    return {
        view: tmpView,
        wildMulti: wildMulti,
        win: tmpWin,
    };
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

                if (j == 0) view[viewPos] = emptySymbol;
                else view[viewPos] = reels[i][reelPos];
            }
        }

        if (!isFreeSpinWin(view) && CheckThirdReel(view)) {
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

                if (j == 0) view[viewPos] = emptySymbol;
                else view[viewPos] = reels[i][reelPos];
            }
        }

        if (isFreeSpinWin(view) && CheckThirdReel(view)) {
            break;
        }
    }

    var wildMulti = LuckyPick(wildMultiArray);

    return {
        view: view,
        wildMulti: wildMulti,
    };
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, wildMultiSet) {
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
            var fsview, fsWin, wildMulti;
            while (true) {
                fsview = RandomFreeView(reels);
                wildMulti = wildMultiSet[Util.random(0, wildMultiSet.length)];
                fsWin = WinFromView(fsview, bpl, wildMulti).win;

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push({
                view: fsview,
                wildMulti: wildMulti,
            });

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

        if (!isFreeSpinWin(view) && CheckThirdReel(view)) {
            break;
        }
    }

    view[0] = emptySymbol;
    view[4] = emptySymbol;

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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var GetWildPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var isFreeSpinWin = function (view) {
    var flagArray = [];

    for (var i = 0; i < slotWidth; i++) {
        var flag = false;
        for (var j = 0; j < slotHeight; j++) {
            var pos = j * slotWidth + i;
            if (isScatter(view[pos])) {
                flag = true;
            }
        }

        flagArray.push(flag);
    }

    var scatterCount = GetOrderCount(flagArray, true);
    return scatterCount >= 3;
};

var CheckThirdReel = function (view) {
    let nSpecials = 0;
    for (let j = 0; j < slotHeight; ++j) {
        const pos = 2 + slotWidth * j;
        if (view[pos] >= 2 && view[pos] <= 4) {
            ++nSpecials;
        }
    }
    return nSpecials <= 1;
}

var ScatterWinFromView = function (view, totalBet) {
    var win = 0;

    var flagArray = [];

    for (var i = 0; i < slotWidth; i++) {
        var flag = false;
        for (var j = 0; j < slotHeight; j++) {
            var pos = j * slotWidth + i;
            if (isScatter(view[pos])) {
                flag = true;
            }
        }

        flagArray.push(flag);
    }

    var nScatters = GetOrderCount(flagArray, true);
    if (nScatters == 3) {
        win = totalBet * 2;
    } else if (nScatters == 4) {
        win = totalBet * 5;
    } else if (nScatters == 5) {
        win = totalBet * 20;
    }

    return win;
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

var LuckyPick = function (inputArray) {
    var index = 0;
    var max = inputArray.length;

    if (Util.probability(80)) {
        index = Util.random(0, Math.floor(max / 2));
    } else if (Util.probability(20)) {
        index = Util.random(0, Math.floor((max * 2) / 3));
    } else if (Util.probability(10)) {
        index = Util.random(0, max);
    }

    return inputArray[index];
};

var GetOrderCount = function (arr, value) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            count++;
        } else {
            break;
        }
    }

    return count;
};

module.exports = SlotMachine;