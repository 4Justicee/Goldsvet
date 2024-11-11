var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinOption = 0;
    this.scatterCount = 0;
    this.wildPositions = [];
    this.wildPosinitStr = [];
    //                        
    this.baseSpinIndex = 0;
    this.lotusPositions = [];
    this.lotusCacheList = {};

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

var scatter = 1, wild = 2, lotus = 3;
var slotWidth = 5, slotHeight = 4;
var baseReels = [
    [12, 12, 12, 12, 15, 15, 15, 15, 7, 7, 7, 7, 8, 8, 8, 8, 12, 13, 13, 13, 13, 11, 11, 11, 11, 6, 6, 6, 6, 11, 12, 14, 7, 14, 11, 14, 10, 10, 10, 10, 9, 9, 9, 9, 12, 13, 10, 11, 8, 14, 15, 9, 6, 14, 13, 15, 5, 5, 5, 5, 15, 7, 14, 14, 11, 8, 7, 13, 8, 15, 11, 15, 10, 4, 4, 4, 4, 8, 11, 13, 9, 13, 11, 12, 10, 8, 11, 13, 6, 9, 15, 13, 14, 6, 12, 10, 6, 15, 11, 5, 12, 13, 14, 15, 7, 14, 11, 14, 13, 12, 15, 13, 15, 7, 15, 7, 9, 11, 12, 5, 1, 12, 15, 13, 13, 12, 15, 12, 12, 14, 4, 9, 10, 10, 13, 14, 1, 14, 11, 10],
    [7, 7, 7, 7, 15, 15, 15, 15, 7, 15, 15, 9, 9, 9, 9, 13, 13, 13, 13, 10, 10, 10, 10, 11, 11, 11, 11, 11, 10, 13, 14, 14, 14, 14, 5, 5, 5, 5, 8, 8, 8, 8, 14, 14, 14, 8, 12, 12, 12, 12, 6, 6, 6, 6, 8, 7, 12, 11, 14, 14, 10, 10, 12, 7, 13, 13, 5, 15, 10, 10, 10, 12, 15, 12, 12, 9, 5, 13, 13, 13, 14, 11, 11, 6, 10, 9, 7, 15, 13, 12, 7, 9, 11, 11, 7, 11, 13, 9, 1, 6, 13, 12, 11, 8, 15, 6, 8, 9, 10, 15, 8, 11, 12, 8, 12, 11, 5, 13, 5, 12, 13, 13, 13, 14, 14, 7, 4, 4, 4, 4, 7, 8, 10, 14, 7, 14, 15, 9, 6, 1, 15, 4, 10, 9],
    [15, 15, 15, 15, 14, 14, 14, 14, 1, 9, 9, 9, 9, 11, 11, 11, 11, 7, 7, 7, 7, 13, 13, 13, 13, 15, 4, 4, 4, 4, 14, 9, 13, 11, 11, 8, 8, 8, 8, 8, 11, 10, 10, 10, 10, 15, 7, 5, 5, 5, 5, 13, 12, 12, 12, 12, 8, 9, 14, 11, 9, 13, 9, 5, 10, 6, 6, 6, 6, 7, 8, 13, 15, 12, 12, 7, 14, 12, 10, 11, 15, 9, 14, 7, 7, 8, 11, 12, 7, 8, 14, 15, 6, 15, 6, 10, 14, 5, 9, 12, 8, 14, 10, 10, 8, 9, 13, 12, 15, 11, 10, 9, 14, 12, 13, 15, 11, 1, 13, 15, 13, 14, 11, 5, 15, 12, 8, 13, 11, 13, 5, 8, 13, 12, 6, 6, 13, 13, 15, 13, 7, 14, 12],
    [7, 7, 7, 7, 14, 14, 14, 14, 8, 8, 8, 8, 5, 5, 5, 5, 8, 14, 11, 11, 11, 13, 13, 13, 13, 14, 14, 13, 8, 11, 7, 12, 12, 12, 12, 14, 13, 12, 11, 9, 9, 9, 9, 12, 13, 5, 11, 10, 10, 10, 10, 14, 5, 15, 15, 15, 15, 15, 1, 11, 7, 6, 6, 6, 6, 10, 6, 12, 7, 13, 15, 13, 8, 9, 15, 11, 11, 11, 8, 15, 12, 13, 9, 15, 10, 13, 5, 1, 6, 15, 7, 7, 8, 13, 4, 4, 4, 4, 14, 12, 6, 13, 7, 7, 10, 14, 12, 6, 10, 15, 8, 1, 12, 15, 13, 14, 13, 14, 12, 12, 9, 13, 11, 13, 9, 12, 9, 14, 11, 12, 10, 15, 5, 5, 10, 10, 6, 10, 11, 5, 8, 8, 12, 9, 11],
    [10, 10, 10, 10, 5, 5, 5, 5, 6, 6, 6, 6, 6, 12, 12, 12, 12, 12, 9, 9, 9, 9, 15, 15, 15, 15, 6, 12, 13, 13, 13, 13, 14, 14, 14, 14, 7, 7, 7, 7, 10, 13, 15, 10, 12, 7, 15, 11, 11, 11, 11, 8, 8, 8, 8, 12, 13, 5, 12, 4, 4, 4, 4, 5, 7, 15, 5, 15, 15, 15, 13, 14, 11, 14, 6, 15, 6, 12, 15, 7, 15, 6, 11, 13, 8, 5, 12, 9, 10, 8, 12, 11, 5, 13, 8, 14, 9, 13, 1, 14, 7, 11, 15, 14, 13, 6, 12, 10, 14, 11, 11, 7, 8, 7, 11, 10, 8, 8, 13, 10, 10, 14, 9, 14, 1, 5, 12, 9, 11, 9, 6, 13, 8, 4, 11, 14, 14, 12, 10, 5, 11, 13, 7]

];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 20, 10, 10, 8, 8, 5, 5, 3, 3, 3, 3, 3],
    [0, 0, 0, 0, 60, 25, 25, 20, 20, 12, 12, 7, 7, 7, 7, 7],
    [0, 0, 0, 0, 250, 125, 125, 75, 75, 50, 50, 20, 20, 20, 20, 20]
];
var payLines = [
    [0, 1, 2, 3, 4], // 1
    [5, 6, 7, 8, 9], // 2
    [5, 11, 17, 13, 9], // 3
    [10, 11, 12, 13, 14], // 4
    [15, 16, 17, 18, 19], // 5
    [0, 6, 12, 18, 19], // 6
    [5, 1, 2, 3, 9], // 7
    [10, 6, 2, 8, 14], // 8
    [15, 11, 7, 3, 4], // 9
    [10, 16, 17, 18, 14], // 10
    [0, 1, 7, 3, 4], // 11
    [5, 6, 12, 13, 9], // 12
    [5, 6, 12, 8, 9], // 13
    [10, 11, 7, 13, 14], // 14
    [15, 16, 12, 18, 19], // 15
    [0, 6, 12, 8, 4], // 16
    [0, 1, 2, 8, 4], // 17
    [10, 11, 7, 3, 9], // 18
    [15, 11, 7, 13, 19], // 19
    [15, 16, 17, 13, 19], // 20
    [0, 6, 2, 8, 4], // 21
    [0, 1, 7, 8, 4], // 22
    [5, 11, 12, 8, 9], // 23
    [15, 11, 17, 13, 19], // 24
    [15, 16, 12, 13, 19], // 25
    [5, 1, 7, 3, 9], // 26
    [5, 6, 2, 8, 9], // 27
    [10, 6, 7, 13, 14], // 28
    [10, 11, 17, 13, 14], // 29
    [10, 16, 12, 18, 14], // 30
    [0, 6, 7, 8, 4], // 31
    [5, 11, 7, 3, 9], // 32
    [10, 6, 12, 18, 14], // 33
    [15, 16, 12, 8, 4], // 34
    [15, 11, 12, 13, 19], // 35
    [0, 1, 12, 3, 4], // 36
    [0, 1, 7, 13, 19], // 37
    [0, 6, 7, 3, 4], // 38
    [15, 11, 12, 18, 19], // 39
    [15, 16, 7, 18, 19], // 40
    [0, 6, 2, 3, 4], // 41
    [5, 11, 7, 13, 9], // 42
    [5, 11, 12, 13, 9], // 43
    [10, 6, 7, 8, 14], // 44
    [15, 11, 17, 18, 19], // 45
    [5, 1, 7, 13, 9], // 46
    [5, 6, 17, 8, 9], // 47
    [10, 6, 12, 8, 14], // 48
    [10, 16, 12, 8, 14], // 49
    [10, 11, 2, 13, 14], // 50
    [5, 6, 7, 3, 9], // 51
    [5, 1, 7, 8, 9], // 52
    [5, 11, 7, 8, 9], // 53
    [10, 6, 12, 13, 14], // 54
    [10, 16, 12, 13, 14], // 55
    [5, 6, 7, 8, 4], // 56
    [5, 6, 7, 13, 9], // 57
    [10, 11, 12, 13, 19], // 58
    [10, 11, 12, 18, 14], // 59
    [10, 11, 12, 8, 14], // 60
    [0, 6, 12, 18, 14], // 61
    [0, 6, 7, 8, 9], // 62
    [5, 11, 17, 13, 19], // 63
    [10, 6, 2, 8, 4], // 64
    [15, 11, 7, 3, 9], // 65
    [5, 1, 2, 3, 4], // 66
    [5, 11, 12, 13, 14], // 67
    [10, 6, 7, 8, 9], // 68
    [10, 16, 17, 18, 19], // 69
    [15, 11, 12, 13, 14], // 70
    [0, 6, 7, 8, 14], // 71
    [5, 1, 7, 8, 4], // 72
    [10, 6, 7, 8, 4], // 73
    [5, 11, 12, 13, 19], // 74
    [15, 11, 12, 13, 9], // 75
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 50; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    if (player.prevTotalBet != player.virtualBet) {
        var lotusCache = this.lotusCacheList[player.virtualBet];
        if (lotusCache) {
            this.baseSpinIndex = lotusCache.baseSpinIndex;
            this.lotusPositions = lotusCache.lotusPositions;
        } else {
            this.baseSpinIndex = 0;
            this.lotusPositions = [];
        }
    }

    this.winMoney = 0;
    this.winLines = [];

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

        // var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // var freeSpinMoneyList = [];
        // for (var i = 0; i < viewCache.moneyList.length; i++) {
        //     freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        // }

        // // console.log(`....................[Free Spin] ${freeSpinMoney}....................[Win Money By Option] :: ${freeSpinMoneyList.join(",")}`);
    }

    this.baseSpinIndex++;
    if (this.baseSpinIndex > 10) {
        this.baseSpinIndex = 1;
        this.lotusPositions = [];
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    var {
        winMoney,
        winLines
    } = WinFromView(this.view, player.betPerLine);

    this.winMoney = winMoney;
    this.winLines = winLines;

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.scatterCount = NumberOfScatters(this.view);
        this.currentGame = "FREE";
    } else {
        //                                                         
        if (this.baseSpinIndex != 10 && Util.probability(30)) {
            while (true) {
                var randpos = Util.random(0, slotWidth * slotHeight);
                if (this.lotusPositions.indexOf(randpos) != -1) continue;
                this.view[randpos] = lotus;
                this.lotusPositions.push(randpos);
                break;
            }
            var {
                winMoney,
                winLines
            } = WinFromView(this.view, player.betPerLine);
            this.winMoney = winMoney;
            this.winLines = winLines;

        } else if (this.baseSpinIndex == 10) {

            this.maskView = Util.clone(this.view);
            for (var i = 0; i < this.lotusPositions.length; i++) {
                this.view[this.lotusPositions[i]] = wild;
            }
            var {
                winMoney,
                winLines
            } = WinFromView(this.view, player.betPerLine);
            this.winMoney = winMoney;
            this.winLines = winLines;
        }
    }

    this.lotusCacheList[player.virtualBet] = {
        baseSpinIndex: this.baseSpinIndex,
        lotusPositions: this.lotusPositions
    };
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex - 1];
    this.maskView = GetMaskView(this.view, wild);
    this.wildPositions = [];
    this.wildPosinitStr = [];

    for (var i = 0; i < this.view.length; i++) {
        if (this.view[i] == wild)
            this.wildPositions.push(i);
        this.wildPosinitStr.push(1);
    }

    var {
        winMoney,
        winLines
    } = WinFromView(this.view, player.betPerLine);

    this.winMoney = winMoney;
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

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
    tmpWin = WinFromView(tmpView, bpl).winMoney;

    var pattern = {
        view: tmpView,
        win: tmpWin,
        type: "BASE",
        bpl: bpl
    };

    return pattern;
};

SlotMachine.prototype.FreeSpinOption = function (player, index) {
    this.freeSpinCacheList = this.freeSpinCacheList[Number(index) + 1];
    this.freeSpinLength = this.freeSpinCacheList.length;
    this.freeSpinOption = index;
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
            break;
    }

    var result = {
        error: 1,
        msg: "Jackpot Type Error"
    };

    return result;
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin);
    var pattern = {
        view: fsCache.cache,
        win: fsCache.win,
        moneyList: fsCache.moneyList,
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        if (isFreeSpinWin(tmpView)) continue;
        tmpWin = WinFromView(tmpView, bpl).winMoney;
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
        if (isFreeSpinWin(tmpView)) continue;
        tmpWin = WinFromView(tmpView, bpl).winMoney;
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView
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
    var view;
    while (true) {
        view = RandomView(reels);
        if (isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var view = RandomScatterView(reels);

        var freeSpinIndex = 1,
            freeSpinLevels = GetFreeSpinType(NumberOfScatters(view)),
            freeSpinLevel = 1,
            freeSpinLength = freeSpinLevels[freeSpinLevel - 1][0],
            winMoney = WinFromView(view, bpl).winMoney,
            freeSpinBeforeMoney = winMoney,
            freeSpinWinMoney = winMoney,
            freeSpinCacheList = [view],
            moneyList = [];

        freeSpinCacheList[freeSpinLevel] = [];

        while (true) {
            view = RandomView(reels);
            if (isFreeSpinWin(view)) {
                continue;
            }

            view = GetWildView(view, freeSpinLevels[freeSpinLevel - 1][1]);

            //                       
            winMoney = WinFromView(view, bpl).winMoney;
            freeSpinCacheList[freeSpinLevel].push(view);

            freeSpinIndex++;
            freeSpinWinMoney += winMoney;

            if (freeSpinIndex > freeSpinLength) {
                moneyList.push(freeSpinWinMoney);
                freeSpinLevel++;
                if (freeSpinLevel > 2) {
                    break;
                } else {
                    freeSpinWinMoney = freeSpinBeforeMoney;
                    freeSpinIndex = 1;
                    freeSpinLength = freeSpinLevels[freeSpinLevel - 1][0];
                    freeSpinCacheList[freeSpinLevel] = [];
                    continue;
                }
            }
        }

        var pattern = {
            cache: freeSpinCacheList,
            win: Util.maxInArr(moneyList).value,
            moneyList: moneyList
        };

        if (pattern.win >= minMoney && pattern.win <= maxMoney) {
            return pattern;
        }

        if (pattern.win > lowerLimit && pattern.win < minMoney) {
            lowerLimit = pattern.win;
            lowerView = pattern;
        }
        if (pattern.win > maxMoney && pattern.win < upperLimit) {
            upperLimit = pattern.win;
            upperView = pattern;
        }
    }

    return lowerView ? lowerView : upperView;
};

var GetWildView = function (view, wildcounts) {
    var cloneView = Util.clone(view);
    var wildPositions = [];
    for (var i = 0; i < wildcounts; i++) {
        var randomPosition;
        while (true) {
            randomPosition = Util.random(0, cloneView.length);
            if (wildPositions.indexOf(randomPosition) == -1)
                break;
        }
        wildPositions.push(randomPosition);
        cloneView[randomPosition] = wild;
    }
    return cloneView;
};

var GetMaskView = function (view, symbol) {
    var maskView = Util.clone(view);
    for (var i = 0; i < maskView.length; i++) {
        if (maskView[i] == symbol) {
            maskView[i] = Util.random(5, 16);
        }
    }
    return maskView;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var GetFreeSpinType = function (scatterCnt) {
    switch (scatterCnt) {
        case 5:
            return [
                [45, 4],
                [15, 7]
            ];
        case 4:
            return [
                [30, 4],
                [10, 7]
            ];
        case 3:
            return [
                [15, 4],
                [5, 7]
            ];
        default:
            return [
                [15, 4],
                [5, 7]
            ];
    }
};

var WinFromView = function (view, bpl) {
    var winMoney = 0;
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        winMoney += linePay;

        if (linePay > 0) {
            winLines.push(
                `${lineId}~${linePay}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }

    return {
        winMoney,
        winLines
    };
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                    
    for (var i = 0; i < lineSymbols.length; i++) {
        //                                               
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    //                                 
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    //                                              -1   ,     lineSymbols                        . 
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;

    return winPay;
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

module.exports = SlotMachine;