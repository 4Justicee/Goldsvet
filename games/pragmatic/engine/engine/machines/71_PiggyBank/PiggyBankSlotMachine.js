var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.sr = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 8;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.scatterCount = 0; //                                    
    this.multiTable = []; //                                                           

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var scatter = 1, wild = 2;
var slotWidth = 6, slotHeight = 3;
var baseReels = [
    [12, 11, 12, 10, 2, 5, 12, 11, 12, 1, 11, 11, 12, 8, 12, 6, 11, 11, 12, 12, 9, 12, 12, 11, 11, 11, 12, 5, 1, 12, 12, 12, 11, 12, 10, 12, 8, 12, 11, 8, 12, 12, 12, 12, 11, 9, 7, 1, 12, 10, 11, 12, 12, 12, 12, 10, 11, 8, 11, 11, 11, 4, 12, 12, 10, 11, 11, 6, 12, 11, 12, 11, 12, 7, 12, 12, 12, 11, 11, 9],
    [4, 10, 12, 8, 8, 11, 9, 8, 8, 9, 9, 8, 10, 1, 10, 10, 9, 9, 12, 8, 12, 9, 10, 8, 9, 9, 8, 1, 7, 11, 8, 9, 9, 10, 11, 10, 9, 9, 9, 9, 10, 1, 9, 8, 12, 8, 9, 8, 9, 11, 10, 9, 9, 8, 8, 2, 12, 10, 9, 10, 12, 8, 8, 11, 9, 6, 10, 9, 8, 10, 12, 8, 8, 10, 5, 9, 10],
    [12, 12, 12, 12, 12, 11, 11, 11, 12, 10, 5, 1, 12, 7, 11, 11, 11, 12, 8, 11, 12, 12, 12, 12, 12, 12, 11, 12, 1, 11, 2, 9, 11, 11, 10, 11, 4, 12, 11, 9, 10, 10, 10, 7, 12, 1, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 11, 12, 6, 12, 12, 11, 8, 11, 12, 10, 12, 10, 12, 12, 12, 12, 11],
    [10, 8, 8, 9, 9, 1, 11, 8, 8, 9, 8, 8, 11, 12, 9, 9, 9, 8, 9, 7, 10, 8, 10, 12, 12, 8, 6, 10, 8, 4, 9, 9, 8, 8, 8, 10, 2, 9, 10, 11, 10, 9, 10, 9, 1, 10, 9, 9, 12, 5, 1, 8],
    [11, 8, 12, 11, 12, 11, 11, 12, 4, 1, 11, 9, 12, 10, 12, 12, 12, 12, 1, 6, 2, 11, 10, 12, 12, 11, 12, 9, 11, 1, 12, 12, 5, 12, 7, 12, 12],
    [9, 9, 12, 7, 8, 1, 11, 8, 9, 9, 9, 9, 10, 8, 8, 9, 2, 10, 4, 9, 8, 1, 8, 8, 8, 9, 9, 10, 12, 9, 10, 6, 11, 10, 10, 10, 11, 10, 10, 8, 8, 12, 1, 5, 10, 8, 8]
];
var freeReels = [
    [12, 11, 12, 10, 2, 5, 12, 11, 12, 11, 11, 12, 8, 12, 6, 11, 11, 12, 12, 9, 12, 12, 11, 11, 11, 12, 5, 12, 12, 12, 11, 12, 10, 12, 8, 12, 11, 8, 12, 12, 12, 12, 11, 9, 7, 12, 10, 11, 12, 12, 12, 12, 10, 11, 8, 11, 11, 11, 4, 12, 12, 10, 11, 11, 6, 12, 11, 12, 11, 12, 7, 12, 12, 12, 11, 11, 9],
    [4, 10, 12, 8, 8, 11, 9, 8, 8, 9, 9, 8, 10, 10, 10, 9, 9, 12, 8, 12, 9, 10, 8, 9, 9, 8, 7, 11, 8, 9, 9, 10, 11, 10, 9, 9, 9, 9, 10, 9, 8, 12, 8, 9, 8, 9, 11, 10, 9, 9, 8, 8, 2, 12, 10, 9, 10, 12, 8, 8, 11, 9, 6, 10, 9, 8, 10, 12, 8, 8, 10, 5, 9, 10],
    [12, 12, 12, 12, 12, 11, 11, 11, 12, 10, 5, 12, 7, 11, 11, 11, 12, 8, 11, 12, 12, 12, 12, 12, 12, 11, 12, 11, 2, 9, 11, 11, 10, 11, 4, 12, 11, 9, 10, 10, 10, 7, 12, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 11, 12, 6, 12, 12, 11, 8, 11, 12, 10, 12, 10, 12, 12, 12, 12, 11],
    [10, 8, 8, 9, 9, 11, 8, 8, 9, 8, 8, 11, 12, 9, 9, 9, 8, 9, 7, 10, 8, 10, 12, 12, 8, 6, 10, 8, 4, 9, 9, 8, 8, 8, 10, 2, 9, 10, 11, 10, 9, 10, 9, 10, 9, 9, 12, 5, 8],
    [11, 8, 12, 11, 12, 11, 11, 12, 4, 11, 9, 12, 10, 12, 12, 12, 12, 6, 2, 11, 10, 12, 12, 11, 12, 9, 11, 12, 12, 5, 12, 7, 12, 12],
    [9, 9, 12, 7, 8, 11, 8, 9, 9, 9, 9, 10, 8, 8, 9, 2, 10, 4, 9, 8, 8, 8, 8, 9, 9, 10, 12, 9, 10, 6, 11, 10, 10, 10, 11, 10, 10, 8, 8, 12, 5, 10, 8, 8]
];
var payTable = [0, 0, 0, 20000, 2000, 1000, 400, 200, 100, 40, 20, 10, 5];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.sr = Util.shuffle([0, 1, 2, 3, 4, 5]);

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isFreeSpinWin(this.view)) { //                          
        this.scatterCount = NumberOfScatters(this.view);
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;
    this.multiTable = this.freeSpinCacheList[this.freeSpinIndex].multiTable;

    this.winMoney = WinFromView(this.view, player.betPerLine, this.multiTable);
    this.winLines = WinLinesFromView(this.view, player.betPerLine, this.multiTable);

    //                                  1000                                         
    var mFreeReels = GetNewReels(Util.max(13 - this.scatterCount - Math.floor(this.freeSpinIndex / 2), 8));
    this.virtualReels = {
        above: RandomLineFromReels(mFreeReels),
        below: RandomLineFromReels(mFreeReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var view, win;

    if (baseWin > 0) {
        view = RandomWinView(baseReels, bpl, baseWin);
    } else {
        view = RandomZeroView(baseReels, bpl);
    }
    win = WinFromView(view, bpl);

    var pattern = {
        view: view,
        win: win,
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
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    freeSpinCacheList.push(scatterView);

    var freeCache = RandomFreeViewCache(baseReels, bpl, fsWin, this.freeSpinLength, NumberOfScatters(scatterView));

    var pattern = {
        win: scatterWinMoney + freeCache.win,
        view: freeSpinCacheList.concat(freeCache.view),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var calcCount = 0, bottomLimit = 0;

    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (hasFullWild(view)) { //           2                           json                                                
            continue;
        }
        if (isFreeSpinWin(view)) {
            continue;
        }

        if (win > bottomLimit && win <= maxWin) {
            return view;
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
        var win = WinFromView(view, bpl);

        if (hasFullWild(view)) { //           2                           json                                                
            continue;
        }
        if (isFreeSpinWin(view)) {
            continue;
        }

        if (win == 0) {
            return view;
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

var RandomScatterView = function (reels, bpl) {
    var view;

    while (true) {
        view = RandomView(reels);

        if (hasFullWild(view)) { //           2                           json                                                
            continue;
        }
        if (isFreeSpinWin(view)) {
            break;
        }
    }

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, scatterCnt) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var view, win;

        var freeSpinIndex = 1,
            freeSpinWinMoney = 0,
            freeSpinCacheList = [];

        var scatterCount = scatterCnt;

        while (true) {
            //                                  1000                                         
            var mFreeReels = GetNewReels(Util.max(13 - scatterCount - Math.floor(freeSpinIndex / 2), 8));

            view = RandomView(mFreeReels);

            if (hasFullWild(view)) { //           2                           json                                                
                continue;
            }
            if (isFreeSpinWin(view)) {
                continue;
            }

            //                                                           
            var multiCount = Util.random(0, 4),
                multiPositions = [];

            var index = 0;
            while (index < multiCount) {
                var multiPos = Util.random(0, 18);
                if (multiPositions.indexOf(multiPos) == -1) {
                    multiPositions.push(multiPos);
                    index++;
                }
            }

            var multiTable = [];
            for (var i = 0; i < 18; i++) {
                if (multiPositions.indexOf(i) > -1) {
                    multiTable[i] = Util.random(2, 4);
                } else {
                    multiTable[i] = 1;
                }
            }

            win = WinFromView(view, bpl, multiTable);

            var cache = {
                view: view,
                multiTable: multiTable
            };

            freeSpinCacheList.push(cache);
            freeSpinWinMoney += win;
            freeSpinIndex++;

            if (freeSpinIndex > fsLen) {
                break;
            }
        }

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
        }

        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
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

var WinFromView = function (view, bpl, mTable = []) {
    var money = 0;

    for (var i = 0; i < view.length; i += 2) {
        var pairWin = 0;

        if (view[i] == view[i + 1]) {
            pairWin = payTable[view[i]] * bpl;
        } else if (isWild(view[i]) && !isWild(view[i + 1])) {
            pairWin = payTable[view[i + 1]] * bpl;
        } else if (!isWild(view[i]) && isWild(view[i + 1])) {
            pairWin = payTable[view[i]] * bpl;
        }

        if (mTable.length > 0) {
            pairWin *= mTable[i] * mTable[i + 1];
        }

        money += pairWin;
    }

    return money;
};

var WinLinesFromView = function (view, bpl, mTable = []) {
    var winLines = [];

    for (var i = 0; i < view.length; i += 2) {
        var pairWin = 0;

        if (view[i] == view[i + 1]) {
            pairWin = payTable[view[i]] * bpl;
        } else if (isWild(view[i]) && !isWild(view[i + 1])) {
            pairWin = payTable[view[i + 1]] * bpl;
        } else if (!isWild(view[i]) && isWild(view[i + 1])) {
            pairWin = payTable[view[i]] * bpl;
        }

        if (mTable.length > 0) {
            pairWin *= mTable[i] * mTable[i + 1];
        }

        if (pairWin > 0) {
            winLines.push(`${i / 2}~${pairWin}~${i}~${i + 1}`);
        }
    }

    return winLines;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i += 2) {
        if (isScatter(view[i]) && isScatter(view[i + 1])) {
            result++;
        }
    }
    return result;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 1;
};

var GetNewReels = function (limit) {
    var newReels = [];

    for (var i = 0; i < freeReels.length; i++) {
        newReels[i] = [3];
        for (var j = 0; j < freeReels[i].length; j++) {
            if (freeReels[i][j] <= limit) {
                newReels[i].push(freeReels[i][j]);
            }
        }
    }

    return newReels;
};

var hasFullWild = function (view) {
    for (var i = 0; i < view.length; i += 2) {
        if (isWild(view[i]) && isWild(view[i + 1])) {
            return true;
        }
    }
    return false;
};

module.exports = SlotMachine;