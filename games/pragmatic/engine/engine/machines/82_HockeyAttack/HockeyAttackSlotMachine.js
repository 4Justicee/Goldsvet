var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleViewList = [];
    this.tmb = "";
    this.tmb_win = 0;
    this.tmb_res = 0;
    this.tumbleMulti = 1;

    this.scatterWin = 0;
    this.scatterPositions = [];

    this.scatterWin = 0;
    this.scatterPositions = [];
    this.freeSpinCacheList = [];
    this.freeSpinIndex = 0;
    this.freeSpinWinMoney = 0;
    this.beforeFreeSpinWinMoney = 0;

    // Required
    this.view = [];
    this.winMoney = 0;
    this.winLines = [];
    this.virtualReels = {};
    this.gameSort = "BASE";
    this.currentGame = "BASE";
    this.prevGameMode = "BASE";
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 88;
    this.jackpotType = ["FREE"];
};

var payLines = [
    [10, 11, 12, 13, 14], // 1
    [5, 6, 7, 8, 9], // 2
    [15, 16, 17, 18, 19], // 3
    [0, 1, 2, 3, 4], // 4
    [20, 21, 22, 23, 24], // 5
    [0, 6, 12, 18, 24], // 6
    [20, 16, 12, 8, 4], // 7
    [20, 1, 2, 3, 24], // 8
    [0, 21, 22, 23, 4], // 9
    [0, 1, 7, 3, 4], // 0
    [20, 21, 17, 23, 24], // 11
    [10, 11, 2, 13, 14], // 12
    [10, 11, 22, 13, 14], // 13
    [5, 1, 7, 3, 9], // 14
    [15, 21, 17, 23, 19], // 15
    [10, 21, 12, 23, 14], // 16
    [15, 1, 17, 3, 19], // 17
    [10, 16, 12, 18, 14], // 18
    [10, 6, 12, 8, 14], // 19
    [5, 11, 7, 13, 9], // 20
    [15, 11, 17, 13, 19], // 21
    [10, 21, 22, 23, 14], // 22
    [10, 1, 2, 3, 14], // 23
    [5, 11, 12, 13, 9], // 24
    [15, 11, 12, 13, 19], // 25
    [10, 16, 17, 18, 14], // 26
    [10, 6, 7, 8, 14], // 27
    [15, 21, 22, 23, 19], // 28
    [5, 1, 2, 3, 9], // 29
    [0, 6, 7, 8, 4], // 30
    [20, 16, 17, 18, 24], // 31
    [5, 11, 17, 13, 9], // 32
    [15, 11, 7, 13, 19], // 33
    [15, 6, 22, 8, 19], // 34
    [5, 16, 2, 18, 9], // 35
    [0, 16, 17, 18, 4], // 36
    [20, 6, 7, 8, 24], // 37
    [0, 11, 12, 13, 4], // 38
    [20, 11, 12, 13, 24], // 39
    [15, 6, 17, 8, 19], // 40
    [0, 16, 2, 18, 4], // 41
    [15, 16, 7, 18, 19], // 42
    [5, 6, 17, 8, 9], // 43
    [15, 1, 22, 3, 19], // 44
    [5, 21, 2, 23, 9], // 45
    [10, 11, 7, 13, 14], // 46
    [10, 11, 17, 13, 14], // 47
    [0, 1, 12, 3, 4], // 48
    [20, 21, 12, 23, 24], // 49
    [15, 1, 12, 3, 19], // 50
    [5, 21, 12, 23, 9], // 51
    [0, 11, 2, 13, 4], // 52
    [20, 11, 22, 13, 24], // 53
    [15, 6, 12, 8, 19], // 54
    [5, 16, 12, 18, 9], // 55
    [0, 16, 7, 18, 4], // 56
    [20, 6, 17, 8, 24], // 57
    [10, 16, 22, 18, 14], // 58
    [10, 6, 2, 8, 14], // 59
    [15, 6, 7, 8, 19], // 60
    [5, 16, 17, 18, 9], // 61
    [0, 1, 22, 3, 4], // 62
    [20, 21, 2, 23, 24], // 63
    [20, 1, 22, 3, 24], // 64
    [0, 21, 2, 23, 4], // 65
    [15, 1, 2, 3, 19], // 66
    [5, 21, 22, 23, 9], // 67
    [20, 16, 22, 18, 24], // 68
    [0, 6, 2, 8, 4], // 69
    [5, 16, 7, 18, 9], // 70
    [0, 21, 17, 23, 4], // 71
    [5, 1, 17, 3, 9], // 72
    [15, 21, 7, 23, 19], // 73
    [20, 6, 12, 8, 24], // 74
    [0, 16, 12, 18, 4], // 75
    [0, 11, 22, 13, 4], // 76
    [20, 11, 2, 13, 24], // 77
    [10, 1, 17, 3, 14], // 78
    [10, 21, 7, 23, 14], // 79
    [20, 21, 12, 23, 24], // 80
    [0, 1, 17, 3, 4], // 81
    [5, 6, 2, 8, 9], // 82
    [15, 16, 22, 18, 19], // 83
    [15, 21, 2, 23, 19], // 84
    [5, 1, 22, 3, 9], // 85
    [10, 16, 7, 18, 14], // 86
    [10, 6, 17, 8, 14], // 87
    [0, 11, 7, 13, 4], // 88
];

var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 28, 20, 18, 18, 15, 10, 8, 5, 2],
    [0, 0, 0, 128, 108, 88, 68, 58, 38, 38, 28, 18],
    [0, 0, 0, 588, 288, 208, 188, 158, 128, 108, 98, 88]
];

var slotWidth = 5, slotHeight = 5;
var baseReels = [
    [9, 10, 9, 10, 7, 6, 10, 5, 9, 6, 3, 1, 8, 6, 3, 3, 6, 11, 11, 10, 4, 1, 11, 6, 11, 9, 11, 5, 11, 10, 3, 6, 9, 6, 11, 6, 10, 8, 4, 7, 6, 3, 9, 8, 4, 3, 3, 8],
    [4, 5, 11, 11, 7, 8, 4, 11, 4, 9, 10, 5, 9, 3, 10, 5, 8, 8, 10, 6, 8, 7, 8, 4, 9, 7, 4, 7, 5, 10, 10, 9, 5, 7, 4, 1, 5, 8, 11, 9, 9, 11, 4, 11, 7, 5, 5, 10, 11, 3, 8, 9, 4, 11, 10, 7, 9, 8, 7],
    [6, 8, 7, 5, 4, 8, 3, 9, 10, 7, 3, 5, 4, 6, 9, 3, 8, 6, 7, 7, 9, 5, 3, 10, 5, 10, 6, 11, 8, 8, 5, 11, 9, 10, 11, 7, 10, 4, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11, 6, 5, 4, 3, 9, 4, 6, 8, 5, 9, 10, 7, 3, 7, 10, 8, 11, 8, 6, 3, 7, 1, 11, 9, 4, 6, 3, 8, 7, 3, 10, 8, 5, 7, 3],
    [10, 7, 3, 3, 5, 6, 11, 5, 4, 4, 5, 8, 6, 11, 6, 1, 9, 9, 4, 8, 4, 11, 5, 6, 9, 7, 4, 11, 3, 5, 6, 3, 8, 3, 8, 5, 8, 9, 10, 9, 7, 5, 6, 6, 4, 6, 9, 4, 6, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 8, 8, 10, 3, 9, 5, 10, 6, 6, 7, 7, 3, 10, 3, 7, 6, 8, 9, 4, 3, 5, 5, 4, 9, 5, 11, 11, 4, 4, 1, 5, 4, 5, 4, 10, 7, 6, 11, 5, 3, 8, 4, 7, 2],
    [7, 3, 9, 11, 9, 5, 11, 8, 8, 6, 6, 9, 10, 7, 6, 3, 5, 7, 9, 9, 6, 3, 8, 6, 10, 5, 4, 11, 5, 6, 10, 9, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 7, 11, 7, 4, 5, 10, 7, 10, 3, 5, 11, 6, 7, 8, 5, 7, 7, 4, 7, 6, 3, 9, 5, 10, 6, 5, 9, 3, 8, 10, 8, 4, 4, 11, 4, 1]
];

var freeReels = [
    [9, 8, 6, 10, 4, 3, 6, 5, 5, 11, 7, 4, 5, 7, 6, 4, 8, 10, 5, 4, 11, 10, 9, 3, 8, 3, 4, 4, 8, 3, 3, 11, 4, 5, 9, 6, 8, 7, 6, 5, 10, 11, 6, 3, 7, 9, 7, 4, 9, 4, 4, 6, 10, 5, 11, 3],
    [4, 10, 10, 8, 4, 5, 5, 4, 5, 9, 8, 11, 8, 3, 11, 4, 10, 8, 6, 3, 7, 2, 2, 2, 2, 2, 2, 4, 11, 3, 7, 6, 3, 6, 9, 4, 9, 6, 9, 10, 7, 6, 8, 5, 5, 3, 7, 11, 5],
    [10, 8, 3, 11, 4, 6, 6, 5, 10, 9, 9, 6, 3, 7, 6, 3, 4, 6, 3, 11, 8, 7, 8, 7, 4, 5, 8, 5, 7, 8, 6, 6, 3, 9, 5, 3, 4, 10, 10, 2, 2, 2, 2, 2, 2, 5, 11, 6, 9, 7, 9, 9, 4, 11, 7, 6, 11, 10, 6, 5, 10, 11, 7, 4, 5, 3, 5, 9, 3, 10, 3, 11, 8, 11, 5, 10, 8, 11, 4, 8, 7, 6, 7, 9, 10, 4, 4, 8],
    [9, 4, 6, 9, 10, 11, 4, 9, 5, 7, 6, 8, 11, 11, 10, 10, 7, 10, 9, 11, 5, 8, 8, 10, 3, 4, 7, 8, 8, 5, 8, 6, 3, 11, 9, 4, 9, 6, 10, 6, 5, 10, 4, 3, 10, 10, 9, 10, 4, 2, 2, 2, 2, 2, 2, 4, 3, 5, 11, 4, 6, 8, 9, 10, 4, 4, 7, 5, 9, 5, 5, 9, 10, 7, 4, 8, 6, 8, 10, 7, 5, 3, 8, 5, 8, 10, 3, 7, 10, 3, 10, 4, 4, 6, 5, 5, 7, 8, 9, 7, 5, 9, 5, 3, 5, 11, 6, 4, 10, 3],
    [11, 5, 5, 4, 11, 3, 11, 4, 11, 9, 11, 5, 8, 7, 9, 11, 4, 9, 7, 6, 7, 3, 6, 11, 6, 11, 11, 8, 6, 10, 4, 3, 4, 5, 4, 11, 6, 8, 7, 4, 10, 11, 5, 10, 9, 2, 2, 2, 2, 2, 2, 9, 5, 11, 9, 4, 11, 6, 7, 4, 4, 11, 10, 5, 10, 5, 6, 4, 4, 5, 11, 7, 4, 11, 9, 6, 3, 5, 5, 9, 5, 8, 11, 11, 7, 5, 6, 6, 5, 9, 10, 8, 4, 10, 4, 3, 5, 4, 5]
];

var scatter = 1, wild = 2;
var freeSpinLength = 12;

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 40; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevGameMode = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.tmb = "";
    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.tumbleViewList = viewCache.view;
        this.view = this.tumbleViewList[0];

    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view.viewList;
        this.view = viewCache.view.scatterView;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    var winInfo = WinFromView(this.view, player.betPerLine);
    this.winMoney = winInfo.winMoney;
    this.winLines = winInfo.winLines;
    this.tmb = GetTmbStr(this.view, winInfo.winTumbles);
    this.tmb_win = 0;
    this.tmb_res = 0;

    if (this.winMoney > 0) {

        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney;
    }

    if (isFreeSpinWin(this.view)) {

        this.freeSpinIndex = 0;
        this.freeSpinLength = 12;
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.beforeFreeSpinWinMoney = this.winMoney;
        this.reelSetIndex = 3;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.Tumbling = function (player, isFreeSpin = false) {

    if (isFreeSpin) {

        this.tumbleMulti++;

        if (this.tumbleMulti > 5) {

            this.tumbleMulti = 8;
        }
    }

    this.view = this.tumbleViewList[this.tumbleIndex];

    var winInfo = WinFromView(this.view, player.betPerLine);
    this.winMoney = winInfo.winMoney;
    this.winLines = winInfo.winLines;
    this.tmb = GetTmbStr(this.view, winInfo.winTumbles);
    this.tmb_win += this.winMoney;
    this.tumbleIndex++;

    if (this.winMoney == 0) {

        this.tumbleStatus = "NOTUMBLE";
        this.tmb_res = this.tmb_win;

        if (isFreeSpin) {

            this.tmb_res = this.tmb_win * this.tumbleMulti;
            this.winMoney = this.tmb_res - this.tmb_win;
        }
    }

    if (isFreeSpin) {

        this.freeSpinWinMoney += this.winMoney;
    }
}

SlotMachine.prototype.FreeSpin = function (player) {

    if (this.tumbleStatus == "TUMBLE") {

        this.Tumbling(player, true);

        if (this.tumbleStatus == "NOTUMBLE") {

            // this.freeSpinWinMoney += this.tmb_res;

            if (this.freeSpinIndex >= this.freeSpinLength) {

                this.currentGame = "BASE";
            }
        }

        return;
    }

    this.reelSetIndex++;
    this.tumbleViewList = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = this.tumbleViewList[0];

    this.tmb_win = 0;
    this.tmb_res = 0;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    var winInfo = WinFromView(this.view, player.betPerLine);
    this.winMoney = winInfo.winMoney;
    this.winLines = winInfo.winLines;
    this.tmb = GetTmbStr(this.view, winInfo.winTumbles);

    this.freeSpinIndex++;

    if (this.winMoney == 0) {

        if (this.freeSpinIndex >= this.freeSpinLength) {

            this.currentGame = "BASE";
        }
    } else {

        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney;
        this.tumbleMulti = 1;
    }

    this.freeSpinWinMoney += this.winMoney;
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    var viewInfo = null;

    if (baseWin > 0) {

        viewInfo = RandomWinView(baseReels, bpl, baseWin);

    } else {

        viewInfo = RandomZeroView(baseReels, bpl);
    }

    pattern.win = viewInfo.winMoney;
    pattern.view = viewInfo.view;

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
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWin = ScatterWinFromView(scatterView, totalBet);
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, freeSpinLength);

    freeSpinData.scatterView = scatterView;

    return {
        win: freeSpinData.win + scatterWin,
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

        var tumbleWinMoney = 0;

        var originView = RandomView(reels);

        if (isFreeSpinWin(originView)) {

            continue;
        }

        var originWinInfo = WinFromView(originView, bpl);

        if (originWinInfo.winMoney == 0) {

            continue;
        }

        tumbleWinMoney += originWinInfo.winMoney;

        var viewList = [originView];

        var prevView = originView;
        var prevWinInfo = originWinInfo;

        while (true) {

            var nextView = RamdomViewByTumble(baseReels, prevView, prevWinInfo.winTumbles);

            if (isFreeSpinWin(nextView)) {

                continue;
            }

            var nextWinInfo = WinFromView(nextView, bpl);

            viewList.push(nextView);

            tumbleWinMoney += nextWinInfo.winMoney;

            if (nextWinInfo.winMoney == 0) {

                break;
            }

            prevView = nextView;
            prevWinInfo = nextWinInfo;
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {

            return {
                view: viewList,
                winMoney: tumbleWinMoney
            };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    var originView = null;

    while (true) {

        originView = RandomView(reels);

        if (isFreeSpinWin(originView)) {

            continue;
        }

        var originWinInfo = WinFromView(originView, bpl);

        if (originWinInfo.winMoney == 0) {

            return {
                view: [originView],
                winMoney: 0
            };
        }

    }
};

var RandomView = function (reels, isFreeView = false) {
    var view = [];

    for (var i = 0; i < slotWidth; i++) {

        var len = reels[i].length;
        var randomIndex = Util.random(0, len);

        for (var j = 0; j < slotHeight; j++) {

            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
        }
    }

    return view;
};

var RandomScatterView = function (reels) {
    var view = null;
    var winMoeny = null;

    while (true) {

        view = RandomView(reels);

        if (!isFreeSpinWin(view)) {

            continue;
        }

        if (WinFromView(view).winMoney > 0) {

            continue;
        }

        return view;
    }
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1, upperLimit = 100000000000000;
    var lowerView = null, upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinLength = fsLen;
        var freeSpinWinMoney = 0;
        var viewList = [];

        while (freeSpinLength > 0) {

            freeSpinLength--;

            var originView = RandomView(reels);
            var originWinInfo = WinFromView(originView, bpl);
            var tumbleWinMoney = originWinInfo.winMoney;
            var tumbleMulti = 1;
            var tumbleList = [originView];

            if (originWinInfo.winMoney > 0) {

                var prevView = originView;
                var prevWinInfo = originWinInfo;

                while (true) {

                    tumbleMulti++;

                    if (tumbleMulti > 5) {

                        tumbleMulti = 8;
                    }

                    var nextView = RamdomViewByTumble(freeReels, prevView, prevWinInfo.winTumbles);
                    var nextWinInfo = WinFromView(nextView, bpl);

                    tumbleList.push(nextView);

                    if (nextWinInfo.winMoney == 0) {

                        tumbleWinMoney *= tumbleMulti;
                        break;
                    }

                    tumbleWinMoney += nextWinInfo.winMoney;

                    prevView = nextView;
                    prevWinInfo = nextWinInfo;
                }
            }

            viewList.push(tumbleList);
            freeSpinWinMoney += tumbleWinMoney;
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

    } // end for tag

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

var WinFromView = function (view, bpl) {
    var winMoney = 0;
    var winLines = [];
    var winTumbles = [];

    for (var i = 0; i < payLines.length; i++) {

        var linePositions = payLines[i];

        var lineSymbols = Util.symbolsFromLine(view, payLines[i]);

        var linePay = WinFromLine(lineSymbols, bpl);

        if (linePay > 0) {

            var winPositions = linePositions.filter(function (item, index, arr) {
                return lineSymbols[index] != -1
            });

            winLines.push(`${i}~${linePay}~${winPositions.join('~')}`);
            winTumbles = winTumbles.concat(winPositions);
        }

        winMoney += linePay;
    }

    return {
        winMoney,
        winLines,
        winTumbles
    };
};

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) {

        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {

        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    return payTable[matchCount][symbol] * bpl;
};

var isWild = function (symbol) {

    return symbol == wild;
};

var NumberOfScatters = function (view) {
    var scatterCount = 0;

    for (var i = 0; i < view.length; i++) {

        if (view[i] == scatter) {

            scatterCount++;
        }
    }

    return scatterCount;
};

var isFreeSpinWin = function (view) {

    return NumberOfScatters(view) >= 3;
};

var ScatterWinFromView = function (view, totalBet) {

    switch (NumberOfScatters(view)) {

        case 5: return totalBet * 250;
        case 4: return totalBet * 25;
        case 3: return totalBet * 5;
    }

    return 0;
};

var RamdomViewByTumble = function (reels, view, tumbles) {
    var nextView = [...view];

    for (var i = 0; i < slotWidth; i++) {

        for (var j = 0; j < slotHeight; j++) {

            var position = i + j * slotWidth;

            if (tumbles.indexOf(position) >= 0) {

                for (var k = j - 1; k >= 0; k--) {

                    nextView[i + (k + 1) * slotWidth] = nextView[i + k * slotWidth];
                }

                nextView[i] = -1;
            }
        }
    }

    var overlayView = RandomView(reels);

    for (var i = 0; i < nextView.length; i++) {

        if (nextView[i] == -1) {

            nextView[i] = overlayView[i];
        }
    }

    return nextView;
};

var GetTmbStr = function (view, tumblePositions) {
    var tmbArray = [];

    for (var i = 0; i < tumblePositions.length; i++) {

        tmbArray.push(`${tumblePositions[i]},${view[tumblePositions[i]]}`);
    }

    return tmbArray.join('~');
};

var ScatterPositions = function (view) {
    var scatterPositions = [];

    for (var i = 0; i < view.length; i++) {

        if (view[i] == scatter) {

            scatterPositions.push(i);
        }
    }

    return scatterPositions;
}

module.exports = SlotMachine;