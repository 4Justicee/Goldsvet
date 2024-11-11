var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinType = -1;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];

    //          
    this.trophyScore = 0;
    this.trophyWin = 0;
    this.trophyScoreForPT = 0;
    this.trophyWinForPT = 0;
    this.trophyMultiArray = [];
    this.trophyMulti = 0;
    this.trophyStatus = "NOTROPHY";
    this.statusCode = [];
    this.moneyBonusWin = 0;

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
var trophyMultiArray = [2, 4, 6, 8, 10, 20, 50, 100];
var baseReels = [
    [12, 13, 5, 5, 5, 11, 5, 12, 13, 7, 8, 8, 9, 9, 3, 3, 3, 10, 13, 6, 8, 14, 3, 6, 1, 5, 9, 4, 4, 4, 4, 6, 14, 4, 11, 5, 9, 1, 7, 9, 5, 4, 7, 14, 6, 7, 1, 4, 10, 11, 10, 3, 10, 4, 11, 12],
    [5, 5, 5, 3, 3, 3, 9, 5, 4, 4, 4, 8, 3, 8, 10, 10, 11, 3, 2, 2, 2, 12, 2, 6, 13, 13, 3, 11, 5, 10, 12, 6, 13, 4, 5, 14, 6, 14, 9, 9, 4, 11, 3, 3, 7, 12, 4, 9, 12, 5, 8, 7, 13, 2, 12, 13, 14, 8, 2],
    [13, 14, 8, 9, 4, 4, 4, 10, 7, 8, 11, 5, 5, 5, 6, 3, 3, 3, 2, 2, 2, 14, 2, 4, 6, 14, 1, 14, 12, 1, 3, 5, 3, 1, 2, 3, 13, 3, 10, 5, 4, 9, 5, 5, 2, 12, 2, 4, 4, 13, 12, 11, 4],
    [14, 9, 3, 3, 3, 5, 5, 5, 4, 4, 4, 12, 3, 12, 5, 7, 4, 11, 8, 8, 5, 4, 11, 3, 12, 4, 3, 12, 5, 4, 6, 13, 4, 13, 3, 13, 12, 5, 11, 2, 2, 2, 14, 7, 8, 10, 7, 14, 2, 10, 13, 2, 9, 11, 8, 2, 10, 6],
    [1, 5, 5, 5, 12, 5, 6, 2, 2, 2, 14, 10, 11, 3, 3, 3, 6, 6, 13, 1, 7, 3, 14, 7, 3, 4, 4, 4, 3, 9, 13, 5, 5, 13, 10, 2, 8, 14, 3, 3, 13, 5, 11, 11, 6, 1, 12, 4, 4, 4, 9, 2, 4, 2, 9],
];
var freeReels = [
    [
        [7, 1, 10, 5, 5, 5, 4, 4, 4, 5, 3, 3, 3, 11, 5, 4, 4, 10, 9, 10, 4, 13, 13, 1, 6, 13, 1, 6, 7, 3, 3, 12, 10, 5, 11, 14, 4, 7, 5, 9, 11, 3, 8, 8, 5, 6, 11, 5, 12, 4, 3, 9, 13, 11],
        [12, 4, 4, 4, 13, 17, 17, 17, 8, 8, 6, 3, 3, 3, 3, 14, 10, 14, 11, 4, 2, 2, 2, 17, 9, 17, 17, 3, 10, 3, 4, 3, 13, 3, 12, 10, 6, 11, 7, 4, 17, 11, 12, 2, 9, 12, 17, 8, 14, 14, 4, 13, 12, 2, 11, 13, 10],
        [8, 4, 4, 4, 13, 17, 17, 17, 12, 14, 1, 14, 11, 2, 2, 2, 1, 9, 10, 8, 12, 9, 6, 4, 7, 17, 2, 9, 11, 4, 1, 2, 17, 3, 3, 3, 7, 3, 8, 17, 13, 10, 3, 2, 3, 6, 13, 8, 3, 17, 3, 12, 1, 8, 4, 4],
        [11, 10, 2, 2, 2, 11, 17, 17, 17, 8, 12, 14, 17, 9, 10, 3, 3, 3, 4, 4, 4, 2, 9, 2, 3, 17, 4, 12, 12, 7, 14, 11, 17, 13, 7, 3, 17, 7, 13, 4, 12, 4, 2, 9, 13, 3, 17, 3, 7, 3, 6, 4, 4, 12, 8, 6, 3, 11],
        [3, 3, 3, 8, 14, 9, 11, 17, 17, 17, 12, 8, 10, 6, 2, 2, 2, 7, 13, 6, 6, 3, 17, 1, 2, 4, 4, 4, 1, 7, 3, 14, 4, 3, 17, 10, 2, 11, 4, 17, 1, 3, 10, 4, 10, 4, 11, 12, 17, 6, 4, 13, 14, 8],
    ],
    [
        [6, 8, 13, 13, 9, 3, 3, 3, 8, 9, 4, 4, 4, 1, 5, 5, 5, 4, 14, 12, 1, 10, 5, 1, 3, 4, 6, 13, 5, 5, 8, 11, 5, 5, 11, 10, 4, 3, 6, 3, 12, 3, 11, 11, 1, 6, 7, 7, 4, 10, 11, 9],
        [3, 3, 3, 3, 12, 16, 16, 16, 9, 10, 6, 2, 2, 2, 13, 6, 16, 17, 17, 17, 11, 16, 14, 17, 13, 13, 2, 3, 10, 10, 13, 9, 8, 8, 16, 8, 17, 16, 16, 3, 12, 11, 17, 3, 11, 12, 14, 2, 2, 10, 12, 13, 7, 17],
        [2, 2, 2, 12, 3, 3, 3, 11, 10, 2, 13, 2, 17, 17, 17, 12, 9, 16, 16, 16, 9, 1, 3, 3, 17, 16, 16, 2, 9, 7, 17, 8, 1, 13, 8, 8, 3, 14, 17, 12, 17, 16, 9, 6, 13, 1, 7, 14, 10, 8, 16, 3],
        [12, 12, 11, 3, 3, 3, 16, 16, 16, 10, 14, 3, 12, 13, 8, 16, 3, 3, 11, 7, 16, 17, 17, 17, 2, 2, 2, 13, 7, 12, 9, 13, 7, 14, 17, 10, 2, 17, 9, 11, 6, 3, 16, 6, 8, 2, 17, 14, 6, 9, 9, 16, 13, 8, 11, 16, 7, 17, 3, 8],
        [9, 10, 16, 16, 16, 12, 6, 1, 7, 16, 8, 3, 3, 3, 16, 14, 3, 17, 17, 17, 11, 17, 14, 10, 9, 3, 16, 1, 13, 9, 2, 2, 2, 2, 13, 12, 3, 7, 3, 11, 6, 17, 1, 10, 16, 8, 17, 11, 8, 6, 12, 17, 13],
    ],
    [
        [9, 5, 5, 5, 3, 3, 3, 1, 4, 4, 4, 10, 4, 13, 1, 6, 4, 7, 13, 4, 3, 14, 11, 3, 8, 5, 1, 7, 8, 3, 3, 7, 5, 4, 10, 4, 3, 11, 6, 3, 12, 11, 9, 5, 8, 13, 5, 6, 4, 13, 14, 5, 10, 11, 5],
        [11, 10, 15, 15, 15, 11, 16, 16, 16, 17, 17, 17, 8, 2, 2, 2, 12, 6, 13, 9, 15, 7, 13, 16, 12, 17, 15, 2, 15, 2, 13, 17, 8, 10, 6, 6, 16, 16, 16, 12, 12, 17, 17, 12, 14, 10, 11, 17, 2, 16, 14, 15, 2, 15, 15, 9, 13],
        [15, 15, 15, 15, 14, 13, 8, 10, 8, 16, 16, 16, 1, 17, 17, 17, 2, 2, 2, 16, 17, 17, 10, 2, 16, 9, 14, 8, 15, 7, 9, 6, 1, 13, 11, 2, 11, 16, 10, 2, 13, 8, 9, 15, 1, 15, 16, 17, 9, 15, 17, 16, 17, 12],
        [12, 11, 7, 15, 15, 15, 16, 16, 16, 15, 15, 9, 17, 17, 17, 10, 8, 16, 13, 17, 16, 11, 17, 17, 11, 9, 2, 2, 2, 17, 16, 13, 13, 14, 15, 12, 17, 10, 14, 2, 7, 7, 16, 15, 12, 7, 12, 9, 16, 2, 13, 6, 15, 8, 2, 6],
        [10, 11, 6, 1, 12, 15, 15, 15, 9, 6, 10, 14, 10, 2, 2, 2, 15, 17, 17, 17, 6, 16, 16, 16, 15, 17, 17, 1, 7, 16, 13, 16, 8, 11, 12, 14, 15, 17, 17, 11, 8, 2, 6, 7, 14, 16, 2, 15, 12, 16, 15, 1, 13, 10, 16, 6],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 30, 20, 15, 10, 10, 10, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 0, 100, 60, 50, 30, 30, 30, 15, 15, 10, 10, 10, 10, 0, 0, 0],
    [0, 0, 0, 200, 125, 100, 60, 60, 60, 40, 40, 30, 30, 30, 30, 0, 0, 0],
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [5, 1, 2, 3, 9], // 6
    [5, 11, 12, 13, 9], // 7
    [0, 1, 7, 13, 14], // 8
    [10, 11, 7, 3, 4], // 9
    [5, 11, 7, 3, 9], // 10
    [5, 1, 7, 13, 9], // 11
    [0, 6, 7, 8, 4], // 12
    [10, 6, 7, 8, 14], // 13
    [0, 6, 2, 8, 4], // 14
    [10, 6, 12, 8, 14], // 15
    [5, 6, 2, 8, 9], // 16
    [5, 6, 12, 8, 9], // 17
    [0, 1, 12, 3, 4], // 18
    [10, 11, 2, 13, 14], // 19
    [0, 11, 12, 13, 4], // 20
    [10, 1, 2, 3, 14], // 21
    [5, 11, 2, 13, 9], // 22
    [5, 1, 12, 3, 9], // 23
    [0, 11, 2, 13, 4], // 24
    [10, 1, 12, 3, 14], // 25
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 0; //                                0                       ,
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;
    this.trophyStatus = "NOTROPHY";

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;

        this.trophyScore = viewCache.score;
        this.trophyWin = viewCache.winm;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        this.view = this.freeSpinCacheList[0][0].view;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        // console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    } else if (viewCache.type == "BONUS") {
        var cache = viewCache.view;

        this.view = cache.view;
        this.trophyMultiArray = cache.multiArr;
        this.trophyMulti = cache.multi;
        this.trophyStatus = "TROPHY";

        this.trophyScore = viewCache.score;
        this.trophyWin = viewCache.winm;
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

        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpinOption = async function (player, select) {
    this.freeSpinType = Number(select);

    this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
    this.freeSpinLength = this.freeSpinCacheList[0].freeSpinLength;
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];
    var changedView = ChangeViewForFree(this.view, this.freeSpinType);

    this.winMoney = WinFromView(changedView, player.betPerLine);
    this.winLines = WinLinesFromView(changedView, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels[this.freeSpinType]),
        below: RandomLineFromReels(freeReels[this.freeSpinType]),
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = "BONUS";
    var select = Number(param.ind);

    this.statusCode = [0, 0, 0, 0, 0, 0, 0, 0];
    this.statusCode[select] = 1;
    this.winMoney = (this.trophyMulti * this.trophyWin * player.betPerLine * this.lineCount * 2) / 100;
    this.moneyBonusWin = this.winMoney;

    while (true) {
        this.trophyMultiArray = Util.shuffle(this.trophyMultiArray);
        if (this.trophyMultiArray[select] == this.trophyMulti) {
            break;
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    while (true) {
        if (baseWin > 0) {
            tmpView = RandomWinView(baseReels, bpl, baseWin);
        } else {
            tmpView = RandomZeroView(baseReels, bpl);
        }

        if (this.trophyScoreForPT >= 40 && isTrophyView(tmpView)) {
            continue;
        }

        if (!isTrophyView(tmpView) || Util.probability(20)) {
            break;
        }
    }

    tmpWin = WinFromView(tmpView, bpl);

    //          
    if (this.trophyScoreForPT >= 40) {
        this.trophyWinForPT = 0;
        this.trophyScoreForPT = 0;
    } else {
        this.trophyWinForPT++;
        if (isTrophyView(tmpView)) {
            this.trophyScoreForPT++;
        }
    }

    var pattern;

    if (this.trophyScoreForPT >= 40) {
        var cache = GenerateTrophyViewCache(bpl, totalBet, baseWin, this.trophyWinForPT);

        tmpWin = cache.win;
        cache.win = null;

        pattern = {
            view: cache,
            score: this.trophyScoreForPT,
            winm: this.trophyWinForPT,
            win: tmpWin,
            type: "BONUS",
            bpl: bpl,
        };
    } else {
        pattern = {
            view: tmpView,
            score: this.trophyScoreForPT,
            winm: this.trophyWinForPT,
            win: tmpWin,
            type: "BASE",
            bpl: bpl,
        };
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
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    // FS                
    var freeSpinStore = [];
    var moneyList = [];

    //                    
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    var lengthArray = [20, 10, 5];
    var wildArray = [[17], [16, 17], [15, 16, 17]];

    for (var i = 0; i < 3; i++) {
        //                                     
        var freeSpinLength = lengthArray[i]; //             
        var reelIndex = i;
        var wildSet = wildArray[i];

        freeSpinStore[i] = [];

        var scatterCache = {
            view: scatterView,
            freeSpinLength: freeSpinLength,
        };

        freeSpinStore[i] = [scatterCache];

        var result = RandomFreeViewCache(freeReels[reelIndex], bpl, fsWin, freeSpinLength, i);

        freeSpinStore[i] = freeSpinStore[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: freeSpinStore,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
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
    return tmpView;
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

        if (isFreeSpinWin(view) && !isTrophyView(view)) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, fsType) {
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
                fsview = RandomFreeView(reels);
                var changedView = ChangeViewForFree(fsview, fsType);

                fsWin = WinFromView(changedView, bpl);

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

var GenerateTrophyViewCache = function (bpl, totalBet, maxWin, trophyWin) {
    var trophyView = RandomTrophyView(baseReels, bpl);

    var wp = trophyMultiArray[Util.random(0, 4)];

    //                                        
    var wins = [];
    wins[0] = wp; //                              

    while (true) {
        var rand = trophyMultiArray[Util.random(0, trophyMultiArray.length)];
        if (wins.indexOf(rand) == -1) {
            wins.push(rand);
        }
        if (wins.length > 7) {
            break;
        }
    }

    return {
        view: trophyView,
        win: (wp * trophyWin * totalBet * 2) / 100,
        multiArr: wins,
        multi: wp,
    };
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

        if (NumberOfScatters(view) == 0) {
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

var RandomTrophyView = function (reels, bpl) {
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

        if (!isFreeSpinWin(view) && isTrophyView(view) && WinFromView(view, bpl) == 0) {
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

var ChangeViewForFree = function (view, type) {
    var result = Util.clone(view);
    for (var i = 0; i < result.length; i++) {
        var reelNo = i % slotWidth;
        //                                                                   .
        if (reelNo == 0) {
            continue;
        }

        if (result[i] == 15) {
            result[i] = 3;
        } else if (result[i] == 16) {
            result[i] = 4;
        } else if (result[i] == 17) {
            result[i] = 5;
        }

        //                                             
        if (type == 2 && result[i] >= 3 && result[i] <= 5) {
            result[i] = wild;
        } else if (type == 1 && result[i] >= 4 && result[i] <= 5) {
            result[i] = wild;
        } else if (type == 0 && result[i] == 5) {
            result[i] = wild;
        }
    }

    return result;
};

var isTrophyView = function (view) {
    var flag1 = false;
    var flag2 = false;
    var flag3 = false;

    for (var i = 0; i < view.length; i++) {
        if (view[i] == 3) {
            flag1 = true;
        } else if (view[i] == 4) {
            flag2 = true;
        } else if (view[i] == 5) {
            flag3 = true;
        }
    }

    return flag1 && flag2 && flag3;
};

module.exports = SlotMachine;