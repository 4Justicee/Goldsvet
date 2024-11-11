var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 50;
    this.freeSpinCount = 0;
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
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var scatter = 1, wild = 2;
var slotWidth = 6, slotHeight = 4;
var winLines = [];
var baseReels = [
    [12, 13, 7, 8, 12, 10, 9, 1, 1, 1, 1, 11, 4, 4, 4, 1, 9, 8, 3, 3, 3, 10, 13, 12, 3, 6, 5, 4],
    [13, 7, 12, 6, 8, 4, 4, 4, 5, 7, 11, 2, 3, 9, 6, 10, 4, 8, 5, 7, 11, 10, 1, 1, 1, 1, 1],
    [7, 12, 5, 2, 8, 9, 5, 6, 11, 11, 12, 10, 12, 3, 3, 3, 10, 3, 4, 13, 1, 1, 1, 1, 7],
    [11, 13, 6, 4, 4, 4, 7, 12, 8, 10, 5, 9, 11, 1, 1, 1, 1, 13, 7, 6, 4, 2, 3, 9, 12, 5, 12, 1],
    [4, 4, 4, 13, 3, 12, 1, 1, 1, 1, 5, 12, 6, 6, 7, 5, 8, 1, 11, 7, 9, 4, 10, 2, 9, 11, 10],
    [13, 6, 1, 1, 1, 1, 1, 4, 4, 4, 1, 12, 4, 10, 7, 10, 3, 3, 3, 11, 11, 9, 8, 5, 12, 3, 7, 13, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 60, 60, 50, 50, 40, 40, 30, 25, 25, 15, 15],
    [0, 0, 0, 200, 200, 120, 120, 80, 80, 70, 60, 60, 45, 45],
    [0, 0, 0, 400, 400, 250, 250, 200, 200, 150, 100, 100, 80, 80]
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
        this.view = this.freeSpinCacheList[0];
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.scatterPositions = ScatterPositions(this.view);
        this.freeSpinLength = GetCountFromScatterView(this.view);
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

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

    if (baseWin > 0) {
        var { tmpView, tmpWin } = RandomWinView(baseReels, bpl, baseWin);
    } else {
        var { tmpView, tmpWin } = RandomZeroView(baseReels, bpl);
    }

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
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var sccaterCount = GetCountFromScatterView(scatterView)
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(baseReels, bpl, fsWin, sccaterCount);

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
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return { tmpView, tmpWin };
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
    return { tmpView, tmpWin };
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

        if (isFreeSpinWin(view) && NumberOfScatters(view) < 13) {
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
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);
                fsWin = WinFromView(fsview, bpl);

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

var WinFromView = function (view, bpl) {
    var winMoney = 0;
    winLines = [];

    var searchedLeft = [false, false, false, false]; //                                       
    var searchedRight = [false, false, false, false]; //                                          

    //                                                             
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (searchedLeft[i]) {
            continue;
        }

        var history = [pos];
        searchedLeft[i] = true;
        var symbolId = view[pos];
        var count = 1;

        for (var j = i + 1; j < slotHeight; j++) {
            var searchPos = j * slotWidth;
            if (view[searchPos] == symbolId && !searchedLeft[j]) {
                history.push(searchPos);
                searchedLeft[j] = true;
                count++;
            }
        }

        winMoney += RecursiveSearchLeftToRight(view, bpl, 1, count, history, symbolId);
    }

    //                                                                
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth + slotWidth - 1;
        if (searchedRight[i]) {
            continue;
        }

        var history = [pos];
        searchedRight[i] = true;
        var symbolId = view[pos];
        var count = 1;

        for (var j = i + 1; j < slotHeight; j++) {
            var searchPos = j * slotWidth + slotWidth - 1;
            if (view[searchPos] == symbolId && !searchedRight[j]) {
                history.push(searchPos);
                searchedRight[j] = true;
                count++;
            }
        }

        winMoney += RecursiveSearchRightToLeft(view, bpl, 1, count, history, symbolId);
    }

    return winMoney;
}

var RecursiveSearchLeftToRight = function (view, bpl, length, count, history, symbolId) {

    //                                                             
    if (length == slotWidth) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
        }

        var winMoney = bpl * payTable[length][symbolId] * count * wildMulti;
        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    //                                                                                            
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = length + i * slotWidth;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
        }

        var winMoney = bpl * payTable[length][symbolId] * count * wildMulti;
        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    var matchCount = 0;
    var historyTmp = [...history];
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;
    return RecursiveSearchLeftToRight(view, bpl, length + 1, matchCount, historyTmp, symbolId);
}

var RecursiveSearchRightToLeft = function (view, bpl, length, count, history, symbolId) {

    //                                                             
    if (length == slotWidth) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
        }

        var winMoney = bpl * payTable[length][symbolId] * count * wildMulti;
        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    //                                                                                            
    var positionsByStep = [];

    for (var i = 1; i < slotHeight + 2; i++) {
        var pos = i * slotWidth - length - 1;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
        }

        var winMoney = bpl * payTable[length][symbolId] * count * wildMulti;
        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    var matchCount = 0;
    var historyTmp = [...history];
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;
    return RecursiveSearchRightToLeft(view, bpl, length + 1, matchCount, historyTmp, symbolId);
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 10;
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

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var GetCountFromScatterView = function (view) {
    switch (NumberOfScatters(view)) {
        case 10:
            return 15;
        case 11:
            return 20;
        case 12:
            return 25;
        default:
            break;
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

module.exports = SlotMachine;