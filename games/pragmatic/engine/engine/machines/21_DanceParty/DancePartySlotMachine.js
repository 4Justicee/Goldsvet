var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.basewin = 0;
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinCount = 15;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinMulti = 0;
    this.freeSpinMultiAdd = 0;
    this.freeSpinAddIndex = -1;
    this.isFreeSpinAdd = false;
    //                          
    this.freeSpinTargetMoney = 0;
    //       
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 20;
    this.jackpotType = ["FREE"];
    this.highPercent = 2;
    this.normalPercent = 20;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [3, 3, 3, 9, 9, 9, 1, 4, 4, 4, 7, 7, 7, 1, 7, 5, 5, 5, 8, 8, 8, 6, 9, 8, 6, 10, 10, 10, 10, 10, 1, 9, 9, 5, 3, 4, 6, 6, 6],
    [9, 9, 9, 4, 4, 4, 5, 5, 5, 4, 3, 3, 3, 10, 10, 10, 10, 7, 7, 7, 8, 8, 8, 6, 6, 6, 5, 1, 2, 2, 2, 9, 7, 8, 7, 6, 9, 1, 5, 5, 5],
    [7, 7, 7, 1, 2, 2, 2, 9, 9, 9, 10, 10, 10, 2, 8, 8, 8, 5, 9, 3, 3, 3, 3, 6, 6, 6, 10, 7, 4, 4, 4, 1, 5, 8, 5, 5, 5],
    [4, 4, 4, 6, 6, 6, 8, 8, 8, 3, 3, 3, 10, 10, 10, 3, 7, 7, 7, 10, 8, 5, 5, 5, 7, 9, 9, 9, 7, 10, 6, 8, 1, 2, 2, 2, 9],
    [1, 1, 1, 2, 2, 2, 10, 10, 10, 10, 3, 3, 3, 4, 4, 4, 1, 3, 5, 5, 5, 6, 6, 6, 3, 9, 9, 9, 2, 4, 6, 4, 7, 7, 1, 8, 8, 8, 7, 5, 7, 7, 7]
];
var freeReels = [
    [6, 6, 6, 4, 4, 4, 9, 9, 9, 9, 8, 8, 8, 10, 10, 10, 9, 8, 8, 10, 7, 7, 7, 1, 10, 7, 3, 3, 3, 5, 5, 5, 4, 3, 7, 1],
    [6, 6, 6, 6, 4, 4, 4, 5, 5, 5, 6, 8, 10, 10, 10, 1, 2, 7, 7, 7, 4, 3, 3, 3, 4, 3, 1, 5, 9, 9, 9, 3, 8, 8, 8],
    [10, 10, 10, 9, 9, 9, 7, 7, 7, 6, 8, 8, 8, 3, 9, 1, 5, 8, 4, 3, 5, 2, 10, 6, 4, 7, 7, 9],
    [4, 4, 4, 9, 9, 9, 10, 10, 10, 7, 7, 7, 6, 6, 6, 6, 3, 3, 3, 2, 8, 8, 8, 1, 5, 5, 5, 5, 10, 3, 9],
    [7, 7, 7, 1, 10, 10, 10, 10, 2, 7, 9, 9, 9, 6, 6, 6, 9, 8, 8, 8, 4, 4, 4, 7, 3, 3, 3, 6, 5, 5, 5, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 30, 20, 16, 10, 6, 6, 4, 4],
    [0, 0, 0, 60, 60, 40, 30, 10, 10, 8, 8],
    [0, 0, 0, 150, 120, 100, 80, 50, 50, 40, 40]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 10; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.basewin = 0;
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
        this.view = cache.scatterView;
    }

    var { money, winLines } = WinFromView(this.view, player.betPerLine);
    this.basewin = money;
    this.winMoney = this.basewin;
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 0;
        this.freeSpinLength = this.freeSpinCount;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinMultiAdd = MultiFromScatterView(this.view);
        this.freeSpinMulti = this.freeSpinMultiAdd;
        this.currentGame = "FREE";
    }

};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    var { money, winLines } = WinFromView(this.view, player.betPerLine);
    this.basewin = money;
    this.winMoney = this.basewin * this.freeSpinMulti;
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    this.freeSpinMulti = (this.freeSpinIndex + 1) * this.freeSpinMultiAdd;

    if (this.freeSpinIndex >= this.freeSpinLength) {
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    if (baseWin > 0) {
        var { view, winMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = winMoney;
        pattern.view = view;
    } else {
        var { view, winMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = winMoney;
        pattern.view = view;
    }

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
        default: break;
    }

}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWin = WinFromView(scatterView, bpl).money;
    var freeMulti = MultiFromScatterView(scatterView);
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin, this.freeSpinCount, freeMulti);

    freeSpinData.scatterView = scatterView;

    return {
        win: scatterWin + freeSpinData.win,
        view: freeSpinData,
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {

        var view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        var winMoney = WinFromView(view, bpl).money;

        if (winMoney == 0) {
            continue;
        }

        if (winMoney > 0 && winMoney <= maxWin) {
            return { view, winMoney };
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

        if (isFreeSpinWin(view)) {
            continue;
        }

        var winMoney = WinFromView(view, bpl).money;

        if (winMoney == 0) {

            return { view, winMoney };
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
    while (true) {
        var view = RandomView(reels);
        if (isFreeSpinWin(view)) {
            return view;
        }
    }
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, freeMulti) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1, upperLimit = 100000000000000;
    var lowerView = null, upperView = null;

    for (var stepIndex = 0; stepIndex < 200; stepIndex++) {
        var viewList = [];

        var freeSpinIndex = 0;
        var freeSpinLength = fsLen;
        var freeSpinWinMoney = 0;
        var freeSpinMultiAdd = freeMulti;
        var freeSpinMulti = freeSpinMultiAdd;

        while (true) {

            var view = RandomView(reels);

            if (isFreeSpinWin(view)) {
                continue;
            }

            viewList.push(view);

            var winMoney = WinFromView(view, bpl).money * freeSpinMulti;
            freeSpinWinMoney += winMoney;

            freeSpinIndex++;
            freeSpinMulti = freeSpinMultiAdd * (freeSpinIndex + 1);
            if (freeSpinMulti >= 30) {
                freeSpinMulti = 30;
            }

            if (freeSpinIndex >= freeSpinLength) {
                break;
            }
        }

        var pattern = {
            win: freeSpinWinMoney,
            viewList
        };

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return pattern;
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = pattern;
        }
        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = pattern;
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

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 5;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isWild = function (symbol) {
    return symbol == wild;
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

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    for (var i = 0; i < slotHeight; i++) {
        var history = [-1, -1, -1, -1, -1];
        var pos = i * slotWidth;
        history[0] = pos;
        money += RecursiveSearch(view, bpl, 1, history, view[pos], winLines);
    }
    return { money, winLines };
};

var RecursiveSearch = function (view, bpl, step, history, symbolId, winLines) {
    var winMoney = 0;

    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId];
        winLines.push(`0~${winMoney}~${history.join('~')}`);
        return winMoney;
    }

    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

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
        winMoney += RecursiveSearch(view, bpl, step + 1, historyTmp, symbolId, winLines);
    }

    return winMoney;
};

var MultiFromScatterView = function (view) {

    switch (NumberOfScatters(view)) {
        case 5: return 1;
        case 6: return 2;
        case 7: return 3;
    }
    return 1;
}

module.exports = SlotMachine;