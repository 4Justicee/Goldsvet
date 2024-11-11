var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 40;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.lineMultiIndexList = [];
    this.lineMultiValueList = [];
    this.multiPositions = [];
    this.multiValues = [];
    //                    
    this.buyMulti = 75;
    this.buyPatternCount = 30;

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, wild2X = 14, wild3X = 15, wild5X = 16;
var slotWidth = 6, slotHeight = 4;
var freeSpinAddCount = 5;

var baseReels = [
    [3, 8, 7, 10, 9, 3, 9, 4, 11, 8, 3, 8, 10, 6, 9, 1, 11, 3, 11, 5, 5, 10, 12, 10, 11, 6, 6, 4, 13, 13, 7, 6, 7, 7, 12, 10, 6, 13, 11, 4, 11, 10, 12, 5, 13, 12, 1, 12, 3, 11, 8, 11, 10, 6, 9, 6, 9, 5, 10, 5, 10, 12, 7, 5, 7, 13, 11, 4, 13, 4, 10, 4, 10, 9, 7, 13, 5, 9, 8, 12, 13, 12],
    [12, 8, 9, 5, 13, 12, 13, 7, 9, 10, 4, 10, 4, 11, 13, 4, 13, 7, 12, 10, 7, 10, 12, 6, 12, 6, 13, 6, 13, 7, 11, 7, 5, 8, 13, 6, 9, 12, 3, 3, 11, 8, 8, 7, 7, 13, 7, 13, 5, 5, 6, 12, 12, 4, 5, 4, 8, 3, 8, 11, 10, 7, 9, 9, 10, 5, 5, 11, 3, 11, 1, 9, 6, 10, 8, 2, 11, 4, 9, 9, 7, 8, 8, 3, 3],
    [3, 3, 8, 3, 8, 7, 9, 9, 4, 11, 6, 8, 10, 6, 9, 1, 11, 3, 11, 5, 5, 10, 6, 6, 12, 10, 11, 4, 13, 13, 7, 7, 6, 7, 12, 10, 6, 2, 4, 11, 11, 10, 12, 5, 13, 1, 12, 12, 3, 8, 11, 11, 10, 6, 6, 9, 9, 5, 5, 10, 5, 10, 12, 7, 7, 13, 13, 11, 4, 4, 10, 4, 10, 9, 7, 13, 13, 5, 9, 8, 12, 12],
    [12, 12, 8, 9, 5, 13, 13, 7, 9, 10, 10, 4, 4, 11, 13, 4, 13, 7, 7, 12, 10, 10, 12, 12, 6, 6, 13, 6, 13, 7, 11, 7, 5, 8, 13, 6, 9, 12, 3, 3, 11, 8, 8, 13, 13, 7, 7, 5, 7, 5, 5, 6, 12, 12, 4, 4, 8, 8, 11, 10, 7, 9, 3, 9, 10, 5, 5, 11, 11, 1, 9, 6, 10, 8, 2, 11, 4, 9, 3, 9, 7, 8, 8, 3, 3],
    [3, 3, 8, 3, 8, 7, 9, 9, 4, 11, 6, 8, 10, 6, 9, 1, 11, 3, 11, 5, 7, 5, 10, 12, 10, 11, 4, 13, 3, 13, 7, 7, 12, 10, 6, 2, 4, 11, 11, 10, 6, 6, 12, 5, 13, 1, 12, 12, 3, 8, 11, 11, 10, 6, 6, 9, 6, 9, 5, 5, 10, 10, 12, 7, 5, 7, 13, 13, 11, 4, 4, 10, 10, 9, 7, 13, 4, 13, 5, 9, 8, 12, 12],
    [12, 10, 12, 8, 9, 5, 13, 7, 9, 10, 13, 10, 4, 5, 4, 11, 5, 4, 5, 13, 7, 13, 7, 12, 10, 12, 6, 12, 6, 13, 13, 7, 11, 7, 5, 8, 13, 6, 9, 12, 3, 6, 3, 11, 7, 7, 8, 7, 8, 13, 6, 12, 12, 4, 8, 4, 8, 11, 10, 7, 9, 13, 9, 10, 5, 11, 3, 11, 1, 9, 6, 10, 8, 2, 11, 4, 9, 5, 9, 7, 8, 3, 8, 3, 3]
];

var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 80, 60, 60, 40, 40, 20, 20, 10, 10, 10, 10],
    [0, 0, 0, 200, 100, 100, 80, 80, 40, 40, 30, 30, 20, 20],
    [0, 0, 0, 250, 200, 200, 120, 120, 80, 50, 60, 60, 40, 40],
    [0, 0, 0, 300, 250, 250, 200, 200, 120, 120, 100, 100, 80, 80]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

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

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = GetFreeSpinCounts(this.view);
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.lineMultiIndexList = [];
    this.lineMultiValueList = [];
    this.multiPositions = [];
    this.multiValues = [];
    // this.isFreeSpinAdd = false;

    var multiView = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = GetFinalView(multiView);

    var multi = MultisFromView(multiView);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    this.winMoney = WinFromView(multiView, player.betPerLine);
    this.winLines = winLines;
    this.lineMultiIndexList = lineMultiArr.lineIndexList;
    this.lineMultiValueList = lineMultiArr.lineValueList;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinLength += AdditionFreeCount(this.view)

    // if (isScatterWin(this.view)) {
    //     this.freeSpinLength += freeSpinAddCount;
    //     this.isFreeSpinAdd = true;
    // }

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

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

    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    var fsCount = GetFreeSpinCounts(scatterView);
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

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    var fsCount = GetFreeSpinCounts(scatterView);
    var fsCache = RandomBuyFreeViewCache(baseReels, bpl, (totalBet * this.buyMulti) / 5, fsCount);
    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: 0,
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, calcCount = 0, bottomLimit = 0;
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

        if (!isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels) {
    while (true) {
        var view = RandomView(reels);
        if (NumberOfScatters(view) == 0) {
            break;
        }
    }

    var nScatters;
    if (Util.probability(90)) {
        nScatters = 3;
    } else if (Util.probability(90)) {
        nScatters = 4;
    } else {
        nScatters = 5;
    }
    // else {
    //     nScatters = 6;
    // }

    var scatterReels = [0, 1, 2, 3, 4, 5];
    Util.shuffle(scatterReels);

    for (var i = 0; i < nScatters; i++) {
        var reelNo = scatterReels[i];
        var viewPos = reelNo + Util.random(0, slotHeight) * slotWidth;
        view[viewPos] = scatter;
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
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView, tmpWin = 0;

        while (true) {
            tmpView = RandomView(reels);

            if (Util.probability(40)) {
                if (isScatterWin(tmpView)) {
                    continue;
                }
            }

            freeSpinLength += AdditionFreeCount(tmpView);

            var multiView = GetMultiView(tmpView);
            tmpWin = WinFromView(multiView, bpl);

            freeSpinCacheList.push(multiView);
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

var RandomBuyFreeViewCache = function (reels, bpl, lowLimit, fsLen) {
    while (true) {
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView, tmpWin = 0;

        while (true) {
            tmpView = RandomView(reels);
            if (isScatterWin(tmpView)) {
                continue;
            }
            var multiView = GetMultiView(tmpView);
            tmpWin = WinFromView(multiView, bpl);

            freeSpinCacheList.push(multiView);
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

        if (freeSpinData.win > lowLimit) {
            return freeSpinData;
        }
    }
};

var MultisFromView = function (multiView) {
    var multiPositions = [], multiValues = [];
    for (var i = 0; i < multiView.length; i++) {
        if (multiView[i] == wild2X) {
            multiPositions.push(i);
            multiValues.push(2);
        }
        if (multiView[i] == wild3X) {
            multiPositions.push(i);
            multiValues.push(3);
        }
        if (multiView[i] == wild5X) {
            multiPositions.push(i);
            multiValues.push(5);
        }
    }
    var result = {
        positions: multiPositions,
        values: multiValues
    }
    return result;
};

var GetFinalView = function (multiView) {
    var finalView = Util.clone(multiView);
    for (var i = 0; i < multiView.length; i++) {
        if (isWildInMultiView(multiView[i])) {
            finalView[i] = wild;
        }
    }
    return finalView;
};

var GetFreeSpinCounts = function (view) {
    switch (NumberOfScatters(view)) {
        case 6: return 100;
        case 5: return 25;
        case 4: return 15;
        case 3: return 8;
    }
    return 0;
};

var AdditionFreeCount = function (view) {
    var freeSymCnt = NumberOfScatters(view);
    switch (freeSymCnt) {
        case 2:
            return 5;
        case 3:
            return 8;
        case 4:
            return 15;
        case 5:
            return 25;
        case 6:
            return 100;
        default:
            return 0;
    }
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var winLines = [], winLineIndex = 0, lineMultiArr = {};
var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    lineMultiArr.lineIndexList = [];
    lineMultiArr.lineValueList = [];

    winLineIndex = 0;
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], 1, bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, multi, bpl) {
    var winMoney = 0;

    //                                                             
    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId] * multi;
        winLines.push(`${winLineIndex}~${winMoney}~${history.join('~')}`);
        if (multi > 1) {
            lineMultiArr.lineIndexList.push(winLineIndex);
            lineMultiArr.lineValueList.push(multi);
        }
        winLineIndex++;
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos]) || isWildInMultiView(view[pos])) {
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
        var money = bpl * payTable[matchCount][symbolId] * multi;
        if (money > 0) {
            var lineResult = [];
            for (var i = 0; i < history.length; i++) {
                if (history[i] < 0) {
                    break;
                }
                lineResult.push(history[i]);
            }

            winLines.push(`${winLineIndex}~${money}~${lineResult.join('~')}`);
            if (multi > 1) {
                lineMultiArr.lineIndexList.push(winLineIndex);
                lineMultiArr.lineValueList.push(multi);
            }
            winLineIndex++;
        }
        return money;
    }

    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        var newMulti = multi * GetMultiFromWild(view[positionsByStep[i]]);
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, newMulti, bpl);
    }
    return winMoney;
};

var GetMultiFromWild = function (multiSymbol) {
    switch (multiSymbol) {
        case wild2X:
            return 2;
        case wild3X:
            return 3;
        case wild5X:
            return 5;
    }
    return 1;
};

var GetMultiView = function (view) {
    var multiView = Util.clone(view);
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            var symbol = wild2X;
            if (Util.probability(50)) {
                symbol = wild3X;
            } else if (Util.probability(20)) {
                symbol = wild5X;
            }
            multiView[i] = symbol;
        }
    }
    return multiView;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isScatterWin = function (view) {
    return NumberOfScatters(view) >= 2;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isWildInMultiView = function (symbol) {
    return symbol == wild2X || symbol == wild3X || symbol == wild5X;
};

var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
}

module.exports = SlotMachine;