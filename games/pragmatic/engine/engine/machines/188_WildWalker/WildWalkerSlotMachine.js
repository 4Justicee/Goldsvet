var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.maskView = [];
    this.wilds = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinLevel = 1;
    this.freeSpinBCount = 0;
    this.freeSpinBTotalCount = 0;
    this.freeSpinLevelUp = false;
    this.freeSpinMore = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1, wild = 2;
var slotWidth = 8, slotHeight = 3;
var baseReels = [
    [10, 10, 10, 4, 7, 9, 8, 3, 12, 12, 12, 5, 11, 10, 12, 6, 1, 11, 11, 11, 5],
    [1, 11, 11, 11, 9, 8, 5, 10, 11, 7, 10, 10, 10, 3, 6, 12, 12, 12, 12, 4, 11, 12, 8, 7, 12, 11, 6, 10, 6, 7, 10, 11, 10, 7, 11, 7, 11, 10, 7, 12, 11, 6, 12, 4, 12, 7, 11, 7, 10, 11, 6, 12],
    [4, 10, 10, 10, 7, 12, 11, 5, 9, 12, 12, 12, 10, 11, 11, 11, 3, 8, 1, 6, 8, 11, 10, 8, 12, 11, 12, 11, 10, 6, 11, 12, 11, 12, 6, 7, 11, 8, 11, 5, 11, 8, 10, 9, 11, 12, 11, 10, 12, 11, 3, 7, 3, 8, 11, 12, 11, 10, 9, 11, 12, 10, 12, 11, 9, 7, 12, 8, 10, 8, 10, 12, 5, 3, 9, 1, 8, 10, 7, 9, 12, 7, 12, 10, 11, 9, 12, 10, 9, 11, 7, 12],
    [4, 4, 4, 4, 8, 12, 9, 11, 5, 6, 1, 3, 7, 11, 11, 11, 10, 5, 5, 5, 6, 6, 6, 12, 12, 12, 11, 5, 12, 6, 11, 12, 7, 5, 6, 5, 12, 5, 12, 11, 6, 12, 11, 5, 3, 12, 3, 7, 3, 12, 6, 7, 3, 6, 12, 5, 11, 12, 11, 3, 5, 11, 3, 12, 6, 7, 12, 3, 5, 12, 5, 11, 5, 11, 12, 11, 8, 11, 8, 3, 11, 5, 12, 11, 5, 11],
    [10, 6, 7, 7, 7, 1, 3, 4, 4, 4, 8, 12, 12, 12, 5, 9, 4, 11, 11, 11, 12, 7, 11, 12, 9, 12, 9, 7, 12, 9, 7, 12, 9, 5, 12, 4, 12, 7, 9, 7, 9, 4, 9, 11, 9, 12, 4, 11, 5],
    [13, 13, 13, 13, 13],
    [13, 13, 13, 13, 13],
    [13, 13, 13, 13, 13],
];
var freeReels = [
    [
        [11, 1, 8, 10, 10, 10, 6, 11, 11, 11, 4, 12, 12, 12, 12, 5, 7, 3, 10, 9, 12, 1, 10, 3, 5, 12, 5, 10, 5, 8, 4, 12, 10, 8, 4, 10, 5, 12, 5, 10, 5],
        [10, 10, 10, 4, 12, 12, 12, 3, 6, 12, 9, 8, 11, 1, 7, 10, 5, 11, 11, 11, 7, 8, 7, 12, 6, 5, 11, 12, 1, 5, 8, 6, 11, 1, 8, 11, 12, 9, 12],
        [9, 12, 12, 12, 11, 6, 10, 12, 3, 1, 11, 11, 11, 7, 8, 10, 10, 10, 5, 4, 11, 7, 11, 7, 11, 8, 1, 10, 12, 1, 12, 5, 11, 12, 11, 5, 1, 10, 12, 10, 12, 7, 5, 12, 10, 5, 11, 10, 7, 11, 3, 12, 7, 3, 1, 7, 11, 7, 12, 11, 7, 1, 5, 12, 11, 5, 11, 12, 10],
        [12, 12, 12, 1, 9, 8, 12, 6, 5, 11, 4, 11, 11, 11, 7, 3, 10, 10, 10, 10, 11, 5, 10, 5, 11, 5, 11, 1, 9, 4, 7, 5, 9, 10, 11, 10, 11, 9, 11, 9, 11, 10, 11, 9],
        [11, 11, 11, 5, 12, 12, 12, 4, 10, 10, 10, 10, 12, 3, 6, 7, 11, 9, 1, 8, 10, 8, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 9, 12, 10, 7, 8, 12, 9, 8, 12, 7, 10, 12, 8, 3, 8, 12, 4, 12, 10, 12, 8, 12, 7, 12, 10, 12, 9, 10, 12, 10, 8, 10, 12, 10, 12, 3, 10, 6, 8, 12],
        [13, 13, 13, 13, 13],
        [13, 13, 13, 13, 13],
        [13, 13, 13, 13, 13],
    ],
    [
        [2, 2, 2, 2, 2],
        [9, 3, 10, 10, 10, 1, 7, 11, 11, 11, 11, 12, 12, 12, 12, 6, 5, 4, 10, 8, 10, 12, 4, 10, 11, 7, 6, 8, 12, 10, 1, 12, 11, 10, 7, 12, 7, 10, 11, 12, 11, 12, 10, 8, 12, 3, 11, 10, 3, 11, 10, 12, 7, 8, 12, 7, 12, 10, 8, 11, 12, 11, 12, 3, 12, 7, 10, 11, 10, 8, 7, 12, 4, 12, 10, 11, 12, 3, 12, 10, 11, 10, 12, 8, 7, 8, 7, 10, 8, 12, 1, 8, 10],
        [11, 11, 11, 11, 7, 8, 10, 10, 10, 3, 12, 12, 12, 9, 1, 10, 4, 6, 5, 12, 4, 12],
        [3, 1, 8, 11, 11, 11, 11, 10, 10, 10, 10, 7, 6, 12, 12, 12, 9, 5, 4, 12, 10, 4, 12, 11, 6, 9, 12, 10, 11, 9, 6, 12, 9, 6, 12, 8, 11, 10, 11, 10, 11, 6, 11, 10, 6, 9, 12, 11, 10, 9, 10, 11, 10, 1, 9, 12, 5, 11, 12, 11, 12, 10, 9, 10, 9, 10, 6, 11, 12, 8, 6, 8, 11, 10, 12, 11, 4, 9, 11, 8, 1, 4, 6, 11, 6, 10, 11, 9, 11, 10, 11, 12, 10, 6, 11, 12, 8, 10, 11, 12],
        [6, 7, 12, 12, 12, 5, 10, 10, 10, 1, 11, 11, 11, 4, 8, 11, 12, 10, 9, 3, 12],
        [5, 7, 1, 4, 11, 11, 11, 9, 11, 12, 12, 12, 10, 10, 10, 10, 3, 6, 12, 8, 9, 10, 11, 9, 12, 11, 12, 10, 8, 10, 4, 12, 7, 8, 10, 12, 4, 11, 9, 10, 7],
        [13, 13, 13, 13, 13],
        [13, 13, 13, 13, 13],
    ],
    [
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [11, 11, 11, 8, 10, 1, 11, 12, 12, 12, 9, 4, 10, 10, 10, 3, 12, 5, 7, 6, 12, 8, 12, 9, 10, 9, 12, 9, 6, 1, 6, 8, 9, 3, 10, 7, 8, 10, 7, 5, 7, 12, 9, 12, 8, 9, 8, 7, 8, 4, 6, 12, 10, 4, 10, 3, 5, 10, 7, 4, 9, 10, 5, 10, 3, 12, 3],
        [1, 9, 8, 5, 6, 4, 12, 10, 10, 10, 11, 10, 12, 12, 12, 7, 11, 11, 11, 3, 11, 7, 12, 11, 7, 11, 4, 12, 10, 7, 11, 12, 11, 12, 11, 10, 11, 4, 11, 10, 11, 8, 9, 11, 8, 11, 10, 11, 10, 11, 7, 11, 7, 4, 9, 11, 7, 11, 7, 10, 11, 7, 11],
        [11, 11, 11, 8, 5, 11, 12, 12, 12, 6, 10, 4, 10, 10, 10, 3, 1, 12, 9, 7, 4, 10, 8, 6, 4, 8, 6, 8, 6, 10, 4, 8, 6, 4, 9, 3],
        [9, 6, 4, 3, 8, 7, 11, 11, 11, 1, 10, 11, 12, 5, 10, 10, 10, 12, 12, 12, 11, 5, 6, 4, 10, 12, 6, 11, 5, 12, 7, 4, 11, 7, 1, 11],
        [12, 12, 12, 12, 10, 11, 6, 4, 10, 10, 10, 8, 5, 11, 11, 11, 3, 7, 9, 1, 11, 4, 10, 3, 11, 9, 4, 10, 9, 6, 4, 9, 11, 8, 4],
        [13, 13, 13, 13, 13],
    ],
    [
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [11, 11, 11, 6, 7, 10, 3, 4, 10, 10, 10, 8, 12, 12, 12, 9, 12, 11, 1, 5, 12, 8, 5, 9, 12, 9, 10, 1, 9, 12, 1, 10, 12, 10, 9, 8, 10, 6, 12, 8, 12, 7, 9, 12, 8, 12, 8, 12],
        [11, 11, 11, 12, 11, 12, 12, 12, 7, 4, 3, 9, 6, 1, 10, 10, 10, 5, 8, 10, 1, 10, 12, 10, 12, 10, 12, 8, 10, 7, 10, 9, 12, 7, 3, 4, 8, 10, 3, 4, 5, 12, 4],
        [9, 12, 12, 12, 8, 11, 11, 11, 6, 10, 3, 1, 12, 5, 7, 10, 10, 10, 4, 11, 6, 10, 7, 1, 7, 6, 10, 11, 10, 11, 8, 7, 10, 11, 12, 3, 12, 5, 10, 1, 10, 6],
        [5, 11, 10, 10, 10, 10, 9, 12, 12, 12, 12, 7, 1, 11, 11, 11, 4, 8, 3, 6, 1, 4, 11, 4, 9, 11, 3, 9, 11, 12, 11, 12, 9, 7, 6, 12, 10, 11, 10, 11, 4, 11, 12, 10, 11],
        [12, 12, 12, 4, 11, 11, 11, 12, 5, 10, 10, 10, 6, 7, 3, 8, 9, 10, 1, 11, 1, 10, 8, 3, 1, 11, 1, 10, 7, 11, 9, 10, 9, 3, 11, 10, 9, 10, 3, 10, 3, 9, 10, 6, 1, 6, 3, 6, 11, 10, 9, 7, 11, 10, 6, 4, 1, 6, 10, 3, 11, 9, 11, 4, 6, 11, 1, 11, 3, 10, 1, 3, 1, 6, 1, 3, 10, 3, 10, 1, 10, 9, 7, 3, 1, 3, 1, 10, 6, 1, 7, 11, 1, 11, 1, 10, 1, 11, 6, 10, 6, 9],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 30, 25, 20, 15, 10, 8, 4, 4, 4, 4, 0],
    [0, 0, 0, 150, 100, 75, 50, 30, 20, 10, 10, 10, 10, 0],
    [0, 0, 0, 500, 400, 300, 200, 120, 75, 30, 30, 30, 30, 0],
    [0, 0, 0, 1500, 1200, 900, 500, 300, 200, 90, 90, 90, 90, 0],
    [0, 0, 0, 4500, 3000, 2000, 1500, 900, 500, 200, 200, 200, 200, 0],
    [0, 0, 0, 10000, 7000, 5000, 3000, 2000, 1500, 500, 500, 500, 500, 0],
];
var payLines = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 10, 19, 20, 21, 22, 23],
    [16, 17, 10, 3, 4, 5, 6, 7],
    [16, 9, 2, 11, 20, 21, 22, 23],
    [0, 9, 18, 11, 4, 5, 6, 7],
    [16, 9, 10, 11, 20, 21, 22, 23],
    [8, 1, 2, 3, 12, 13, 14, 15],
    [0, 9, 10, 11, 4, 5, 6, 7],
    [8, 17, 18, 19, 12, 13, 14, 15],
    [8, 9, 18, 11, 12, 13, 14, 15],
    [8, 9, 2, 11, 12, 13, 14, 15],
    [8, 17, 10, 19, 12, 13, 14, 15],
    [8, 1, 10, 3, 12, 13, 14, 15],
    [0, 9, 2, 11, 4, 5, 6, 7],
    [16, 9, 18, 11, 20, 21, 22, 23],
    [0, 17, 2, 19, 4, 5, 6, 7],
    [16, 1, 18, 3, 20, 21, 22, 23],
    [0, 1, 10, 3, 4, 5, 6, 7],
    [16, 17, 10, 19, 20, 21, 22, 23],
    [8, 1, 10, 19, 12, 13, 14, 15],
    [8, 17, 10, 3, 12, 13, 14, 15],
    [0, 1, 18, 3, 4, 5, 6, 7],
    [16, 17, 2, 19, 20, 21, 22, 23],
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
        var cache = viewCache.view;

        this.view = cache.view;
        this.maskView = cache.mask;
        this.wilds = cache.wilds;
    } else if (viewCache.type == "FREE") {
        var freeCache = viewCache.view;
        this.freeSpinCacheList = freeCache.viewList;
        this.freeSpinLength = freeCache.length;

        var cache = this.freeSpinCacheList[0];
        this.view = cache.view;
        this.maskView = cache.mask;
        this.wilds = cache.wilds;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // // console.log(`[            ] ${freeSpinMoney}`);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLevel = 1;
        this.freeSpinBCount = 0;
        this.freeSpinBTotalCount = 0;
        this.freeSpinLevelUp = false;
        this.freeSpinMore = 0;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    this.maskView = cache.mask;
    this.wilds = cache.wilds;

    this.freeSpinBCount = NumberOfScatters(this.view);
    this.freeSpinBTotalCount += this.freeSpinBCount;

    this.freeSpinMore = 0;
    this.freeSpinLevelUp = false;

    if (this.freeSpinLevel < 4 && this.freeSpinBTotalCount >= 3) {
        this.freeSpinLevel++;
        this.freeSpinLevelUp = true;
        this.freeSpinBTotalCount -= 3;
        this.freeSpinMore = 2;
        this.freeSpinLength += this.freeSpinMore;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels[this.freeSpinLevel - 1]),
        below: RandomLineFromReels(freeReels[this.freeSpinLevel - 1]),
    };

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
    var scatterCache = RandomScatterView(baseReels, bpl);
    var freeSpinData = {
        length: 8,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterCache);
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
    var tmpView, tmpCache, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpCache = GetWildView(tmpView);

        tmpWin = WinFromView(tmpCache.view, bpl);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    tmpCache.win = tmpWin;
    return tmpCache;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpCache, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpCache = GetWildView(tmpView);

        tmpWin = WinFromView(tmpCache.view, bpl);
        if (tmpWin == 0) {
            break;
        }
    }

    tmpCache.win = tmpWin;
    return tmpCache;
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

        var cache = GetWildView(view);
        if (NumberOfScatters(cache.view) == 3 && WinFromView(cache.view, bpl) == 0) {
            break;
        }
    }

    return cache;
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
        var level = 1;
        var count = 0;

        while (true) {
            var fsview, fsWin, fsCache;
            while (true) {
                fsview = RandomFreeView(reels[level - 1]);
                fsCache = GetWildView(fsview, level);
                if (level == 4 && count > 0 && NumberOfScatters(fsCache.view) > 0) {
                    continue;
                }

                fsWin = WinFromView(fsCache.view, bpl);
                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            count += NumberOfScatters(fsCache.view);
            if (level < 4 && count >= 3) {
                level++;
                count -= 3;
                freeSpinLength += 2;
            }

            freeSpinData.viewList.push(fsCache);
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

        var bCount = NumberOfScatters(view);
        if (bCount < 3 && (bCount < 2 || Util.probability(20))) {
            break;
        }
    }
    return view;
};

var WinFromView = function (view, bpl) {
    var winMoney = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        winMoney += linePay;
    }

    return winMoney;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i]))
            //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    var hasWild = false;
    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            hasWild = true;
            lineSymbols[i] = symbol;
        }
    }

    //                                
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        .
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;
    return winPay;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);

        if (linePay > 0) {
            winLines.push(
                `${lineId}~${linePay}~${line
                    .filter(function (item, index, arr) {
                        return lineSymbols[index] != -1;
                    })
                    .join("~")}`
            );
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var GetWildView = function (view, fsLevel = 0) {
    var wilds = [];
    var newView = Util.clone(view);

    var wildReelIndex;
    if (fsLevel < 2) {
        wildReelIndex = Util.random(0, 5);
    } else if (fsLevel == 2) {
        wildReelIndex = Util.random(1, 6);
    } else if (fsLevel == 3) {
        wildReelIndex = Util.random(2, 7);
    } else if (fsLevel == 4) {
        wildReelIndex = Util.random(3, 8);
    }

    for (var i = 0; i < slotHeight; i++) {
        var wildPos = i * slotWidth + wildReelIndex;
        newView[wildPos] = wild;
        wilds.push(wildPos);
    }

    var cache = {
        mask: view,
        view: newView,
        wilds: wilds,
    };

    return cache;
};

module.exports = SlotMachine;