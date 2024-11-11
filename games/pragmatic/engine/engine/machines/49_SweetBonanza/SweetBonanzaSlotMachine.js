var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    //          
    this.tumbleIndex = 0;
    this.tumbleViewList = [];
    this.tumbles = [];
    this.tmb_win = 0;
    this.tmb_res = 0;
    this.apwa = 0;
    this.tmb = "";
    this.rmul = "";
    this.tumbleMulti = 1;
    //                           
    this.freeSpinCount = 10;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMulti = 0;
    this.totalMulti = 0;
    this.freeSpinMore = 0;

    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;

    this.betPerLine = 0;
    this.totalBet = 0;

    this.lineCount = 20;
    this.jackpotType = ["FREE"];

    //                   
    this.doubleMulti = 0.25;
    this.buyMulti = 100;
    this.buyPatternCount = 30;
};

var scatter = 1;
var multiSymbol = 12;
var slotWidth = 6;
var slotHeight = 5;
var baseReels = [
    [4, 11, 4, 4, 9, 9, 11, 8, 8, 10, 10, 5, 5, 8, 8, 11, 4, 7, 9, 9, 10, 10, 4, 4, 1, 3, 3, 11, 5, 5, 4, 7, 11, 6, 6, 9, 9, 10, 10, 9, 5, 4, 6, 8, 8, 10, 4, 10, 8, 11, 6, 6, 10, 10, 10, 8, 8, 10, 10, 4, 7, 7, 7],
    [5, 5, 8, 8, 11, 6, 6, 10, 10, 9, 9, 4, 4, 1, 3, 3, 11, 5, 5, 4, 7, 10, 10, 9, 5, 4, 6, 10, 10, 8, 8, 11, 4, 7, 9, 5, 4, 6, 8, 8, 10, 10, 9, 9, 11, 4, 4, 9, 9, 11, 8, 8, 10, 10, 4, 7, 11, 11, 11],
    [11, 11, 4, 4, 7, 9, 9, 10, 10, 4, 4, 11, 6, 6, 4, 4, 9, 9, 11, 8, 8, 10, 10, 1, 8, 8, 10, 4, 10, 8, 11, 6, 6, 4, 7, 7, 7, 5, 5, 8, 8, 11, 10, 10, 9, 5, 4, 6, 3, 3, 8, 8, 5, 5, 4, 7, 8, 8, 10, 10, 3, 3, 3],
    [10, 4, 8, 8, 10, 4, 10, 8, 11, 5, 5, 10, 10, 9, 5, 4, 6, 10, 10, 4, 4, 7, 11, 6, 6, 9, 9, 1, 3, 3, 11, 3, 3, 6, 6, 10, 10, 10, 8, 8, 11, 5, 5, 4, 7, 9, 9, 10, 4, 10, 8, 11, 4, 4, 9, 9, 11, 5, 5, 6, 6, 11, 11, 11, 6],
    [10, 10, 4, 4, 9, 9, 8, 8, 4, 4, 9, 9, 5, 5, 8, 8, 11, 4, 7, 9, 9, 3, 3, 11, 1, 10, 10, 9, 9, 5, 5, 4, 7, 7, 7, 10, 10, 9, 9, 11, 9, 5, 4, 6, 8, 8, 11, 6, 6, 8, 8, 10, 4, 10, 8, 11, 6, 6, 5, 5, 9, 9, 9],
    [9, 9, 8, 8, 10, 4, 10, 8, 11, 4, 7, 9, 9, 10, 10, 9, 5, 4, 6, 11, 9, 9, 10, 10, 4, 4, 4, 3, 3, 9, 9, 5, 5, 8, 8, 11, 6, 6, 4, 4, 9, 9, 8, 8, 6, 6, 1, 11, 5, 5, 4, 7, 8, 8, 10, 4, 10, 8, 11, 6, 6, 4, 4, 4, 7, 7],
];
var freeReels = [
    [11, 11, 4, 4, 9, 9, 8, 8, 11, 10, 10, 5, 5, 8, 8, 11, 4, 7, 9, 9, 10, 10, 4, 4, 1, 3, 3, 11, 5, 5, 4, 7, 9, 5, 4, 6, 11, 10, 10, 9, 5, 4, 6, 8, 8, 10, 4, 10, 8, 11, 6, 6, 10, 10, 10, 8, 8, 12, 6],
    [4, 5, 5, 8, 8, 11, 6, 6, 10, 10, 9, 9, 4, 4, 12, 3, 3, 11, 5, 5, 10, 10, 4, 7, 9, 5, 4, 6, 10, 10, 8, 8, 11, 4, 7, 9, 5, 4, 6, 8, 8, 1, 11, 9, 9, 10, 10, 4, 4, 9, 9, 11, 8, 8, 10, 10, 12],
    [11, 11, 4, 4, 7, 9, 9, 10, 10, 4, 4, 3, 3, 6, 6, 4, 4, 9, 9, 10, 10, 8, 8, 11, 1, 8, 8, 10, 4, 10, 8, 11, 6, 6, 4, 7, 7, 7, 5, 5, 8, 8, 11, 10, 10, 9, 5, 4, 6, 8, 8, 3, 3, 5, 5, 4, 7, 8, 8, 12, 6],
    [4, 8, 8, 10, 4, 10, 8, 11, 5, 5, 3, 3, 9, 5, 4, 6, 10, 10, 4, 4, 7, 11, 6, 6, 9, 9, 1, 10, 4, 10, 8, 11, 3, 3, 6, 6, 10, 10, 10, 8, 8, 11, 5, 5, 4, 7, 9, 9, 11, 10, 10, 4, 4, 9, 9, 11, 5, 5, 12, 6],
    [10, 10, 4, 4, 9, 9, 8, 8, 4, 4, 5, 5, 9, 9, 8, 8, 11, 4, 7, 9, 9, 3, 3, 11, 1, 10, 10, 9, 9, 5, 5, 4, 7, 7, 7, 9, 9, 10, 4, 10, 8, 11, 6, 6, 8, 8, 9, 9, 11, 6, 6, 8, 8, 10, 4, 10, 8, 11, 6, 6, 12],
    [6, 9, 9, 8, 8, 10, 10, 5, 5, 4, 7, 11, 10, 10, 9, 9, 1, 6, 6, 11, 9, 9, 10, 10, 4, 4, 12, 3, 3, 9, 9, 5, 5, 8, 8, 11, 6, 6, 4, 4, 9, 9, 8, 8, 6, 6, 11, 9, 9, 4, 7, 8, 8, 10, 4, 10, 8, 11, 12, 6],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 50, 40, 30, 20, 16, 10, 8, 5, 0],
    [0, 0, 0, 200, 50, 40, 30, 20, 16, 10, 8, 5, 0],
    [0, 0, 0, 500, 200, 100, 40, 30, 24, 20, 18, 15, 0],
    [0, 0, 0, 500, 200, 100, 40, 30, 24, 20, 18, 15, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
];
// 100                   
var multiList = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 50];
var percentList = {
    hugeMultiPercent: 10,
    bigMultiPercent: 20,
    mediumMultiPercent: 30,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

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
    var view;

    if (viewCache.type == "BASE") {
        this.tumbleViewList = viewCache.view;
        view = this.tumbleViewList[0];
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.tumbleViewList = this.freeSpinCacheList[0];
        view = this.tumbleViewList[0];

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.view = GetFinalView(view);
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.tmb = GetTmbStr(view, player.betPerLine);
    // this.rmul = GetRmulStr(view);

    this.freeSpinMulti = 0;
    this.tumbleMulti = GetTumbleMulti(this.view).totalMulti;
    this.tmb_win = 0;
    this.tmb_res = 0;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney;
    }

    if (isFreeSpinWin(this.view)) {
        this.currentGame = "FREE";
        this.freeSpinIndex = 1;
        this.freeSpinLength = this.freeSpinCount;

        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinBeforeMoney = this.winMoney;
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var view = this.tumbleViewList[this.tumbleIndex];
    this.view = GetFinalView(view);

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.tmb = GetTmbStr(view, player.betPerLine);
    this.rmul = GetRmulStr(view);

    this.tmb_win += this.winMoney;
    this.tumbleIndex++;

    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
        this.tmb_res = this.tmb_win;
        var multi = GetTumbleMulti(view).totalMulti;
        if (multi > 0) {
            this.freeSpinMulti = multi;
            this.tmb_res = this.tmb_win * this.freeSpinMulti;
        }

        if (this.currentGame == "FREE") {
            if (NumberOfScatters(this.view) >= 3) {
                this.freeSpinMore = 5;
                this.freeSpinLength += this.freeSpinMore;
            } else {
                this.freeSpinMore = 0;
            }
        }

        this.apwa = this.tmb_res - this.tmb_win;
        this.winMoney = this.apwa;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        //                 
        if (this.tumbleStatus == "NOTUMBLE") {
            this.freeSpinWinMoney += this.tmb_res;
            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleViewList = this.freeSpinCacheList[this.freeSpinIndex];
    var view = this.tumbleViewList[0];
    this.view = GetFinalView(view);

    this.tmb_win = 0;
    this.tmb_res = 0;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    if (this.winMoney == 0) {
        if (NumberOfScatters(this.view) >= 3) {
            this.freeSpinMore = 5;
            this.freeSpinLength += this.freeSpinMore;
        } else {
            this.freeSpinMore = 0;
        }
    }

    this.tmb = GetTmbStr(view, player.betPerLine);
    this.rmul = GetRmulStr(view);

    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney;
        this.tumbleMulti = this.freeSpinMulti;
        this.tumbleMulti += GetTumbleMulti(view).totalMulti;
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

    if (baseWin > 0) {
        var { viewList, tumbleWinMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
    } else {
        var { viewList, tumbleWinMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
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
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);

    //                          
    var freeSpinCacheList = [];
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, 10);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);

    //                          
    var freeSpinCacheList = [];
    var fsCache = BuyBonusViewCache(freeReels, bpl, 10, (totalBet * this.buyMulti) / 5);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var tumbleWinMoney = 0;
        var view = RandomView(reels);
        var tumbleWinMoney = WinFromView(view, bpl);

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }


        if (tumbleWinMoney == 0) {
            continue;
        }

        var viewList = [view];

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var tumbles = GetTumbles(lastView, bpl);
            var newView = GetNextViewByTumble(lastView, tumbles);

            if (isFreeSpinWin(newView) || isDoubleScatterView(newView)) {
                continue;
            }

            var nWinMoney = WinFromView(newView, bpl);
            viewList.push(newView);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            return { viewList, tumbleWinMoney };
        }


    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var winMoney = WinFromView(view, bpl);

        if (winMoney == 0) {
            var viewList = [];
            viewList.push(view);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
        }
    }
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

        if (!isFreeSpinWin(view) && !isDoubleScatterView(view)) {
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

        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0 && !isDoubleScatterView(view)) {
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
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen);

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

var BuyBonusViewCache = function (reels, bpl, fsLen, lowLimit = 0) {
    while (true) {
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinWinMoney = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tumbleTotalMulti = 0;

        while (true) {
            var view = RandomFreeView(reels);
            var viewList = [view];
            var tumbleWinMoney = WinFromView(view, bpl);

            //                       
            if (tumbleWinMoney > 0) {
                while (true) {
                    var lastView = viewList[viewList.length - 1];
                    var tumbles = GetTumbles(lastView, bpl);
                    var newView = GetNextViewByTumble(lastView, tumbles);

                    if (isDoubleScatterView(newView)) {
                        continue;
                    }

                    var winMoney = WinFromView(newView, bpl);
                    viewList.push(newView);
                    tumbleWinMoney += winMoney;

                    //                 
                    if (winMoney == 0) {
                        var multi = GetTumbleMulti(newView).totalMulti;
                        tumbleTotalMulti = multi;
                        //                                                        
                        if (multi > 0) {
                            tumbleWinMoney *= tumbleTotalMulti;
                        }

                        if (NumberOfScatters(newView) >= 3) {
                            freeSpinLength += 5;
                        }

                        break;
                    }
                }
            } else {
                if (NumberOfScatters(view) >= 3) {
                    freeSpinLength += 5;
                }
            }

            freeSpinCacheList.push(viewList);
            freeSpinWinMoney += tumbleWinMoney;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        freeSpinData = {
            win: freeSpinWinMoney,
            cache: freeSpinCacheList,
        };

        if (freeSpinData.win > lowLimit) {
            return freeSpinData;
        }
    }
};

var RandomFreeView = function (_reels) {
    var view = [];

    var reels = _reels;

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

        if (NumberOfScatters(view) < 4 && !isDoubleScatterView(view)) {
            break;
        }
    }

    //                                                                                    .
    //                 12,              100          10012                    50       5012          
    //                 12    100                                
    for (var i = 0; i < view.length; i++) {
        if (view[i] == multiSymbol) {
            var multi;
            if (Util.probability(percentList.hugeMultiPercent)) {
                multi = multiList[Util.random(0, multiList.length)];
            } else if (Util.probability(percentList.bigMultiPercent)) {
                multi = multiList[Util.random(0, 12)];
            } else if (Util.probability(percentList.mediumMultiPercent)) {
                multi = multiList[Util.random(0, 10)];
            } else if (Util.probability(percentList.mediumMultiPercent)) {
                multi = multiList[Util.random(0, 7)];
            } else {
                multi = multiList[Util.random(0, 4)];
            }
            view[i] = multiSymbol + multi * 100;
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

var WinFromView = function (view, bpl) {
    var symbolCount = payTable[0].length;
    var symbolCounts = [];
    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = 0;
    }
    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }
    var winMoney = 0;
    for (var i = 0; i < symbolCount; i++) {
        winMoney += payTable[symbolCounts[i]][i] * bpl;
    }
    return winMoney;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var symbolCount = payTable[0].length;
    var symbolCounts = [];
    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = 0;
    }
    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }
    for (var i = 0; i < symbolCount; i++) {
        var money = payTable[symbolCounts[i]][i] * bpl;
        if (money > 0) {
            var winSymbolPositions = SymbolPositions(view, i);
            winLines.push(`0~${money}~${winSymbolPositions.join("~")}`);
        }
    }
    return winLines;
};

var GetTmbStr = function (view, bpl) {
    var tumbling = [];

    var symbolCount = payTable[0].length;
    var symbolCounts = [];
    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = 0;
    }
    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }
    for (var i = 0; i < symbolCount; i++) {
        var money = payTable[symbolCounts[i]][i] * bpl;
        if (money > 0) {
            var winSymbolPositions = SymbolPositions(view, i);
            for (var j = 0; j < winSymbolPositions.length; j++) {
                tumbling.push(`${winSymbolPositions[j]},${i}`);
            }
        }
    }
    return tumbling.join("~");
};

var GetRmulStr = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] > 100) {
            var multi = Math.floor(view[i] / 100);
            result.push(`${multiSymbol}~${i}~${multi}`);
        }
    }
    return result.join(";");
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 4;
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

var SymbolPositions = function (view, symbol) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == symbol) {
            result.push(i);
        }
    }
    return result;
};

var ScatterPositions = function (view) {
    return SymbolPositions(view, scatter);
};

var ScatterWinFromView = function (view, bet) {
    switch (NumberOfScatters(view)) {
        case 6:
            return bet * 100;
        case 5:
            return bet * 5;
        case 4:
            return bet * 3;
    }
    return 0;
};

var GetFinalView = function (view) {
    var finalView = [...view];
    for (var i = 0; i < view.length; i++) {
        if (finalView[i] > 100) {
            finalView[i] = multiSymbol;
        }
    }
    return finalView;
};

var RandomTumbleNextView = function (reels) {
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

var GetTumbles = function (view, bpl) {
    var tumbles = [];
    var symbolCount = payTable[0].length;

    var symbolCounts = [];
    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = 0;
    }
    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }
    for (var i = 0; i < symbolCount; i++) {
        var money = payTable[symbolCounts[i]][i] * bpl;
        if (money > 0) {
            var winSymbolPositions = SymbolPositions(view, i);
            for (var j = 0; j < winSymbolPositions.length; j++) {
                tumbles.push(winSymbolPositions[j]);
            }
        }
    }
    return tumbles;
};

var GetNextViewByTumble = function (view, tumbles) {
    var nextView = Util.clone(view);
    var tumbleSymbols = [];
    var stickyTumbles = [];

    //                                    
    for (var k = 0; k < slotWidth; k++) {
        if (tumbles.indexOf(k) > -1) {
            var nextDownPos = k + slotWidth;

            //                         
            if (tumbles.indexOf(nextDownPos) == -1) {
                //                                                                         
                var downCount = 0;

                for (var m = 2; m < slotHeight; m++) {
                    var downTmbPos = m * slotWidth + k;
                    if (tumbles.indexOf(downTmbPos) > -1) {
                        downCount++;
                    }
                }

                var stickyPos = downCount * slotWidth + k;
                stickyTumbles.push({
                    pos: stickyPos,
                    symbol: view[k],
                });
            }
        }
    }

    for (var j = 0; j < tumbles.length; j++) {
        if (tumbleSymbols.indexOf(view[tumbles[j]]) == -1) {
            tumbleSymbols.push(view[tumbles[j]]);
        }
    }

    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (tumbles.indexOf(pos) >= 0) {
                for (var k = j - 1; k >= 0; k--) {
                    nextView[i + (k + 1) * slotWidth] = nextView[i + k * slotWidth];
                }
                nextView[i] = -1;
            }
        }
    }

    //                                            
    while (true) {
        var overView = RandomTumbleNextView(baseReels);
        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == -1 && tumbleSymbols.indexOf(overView[i]) == -1) {
                nextView[i] = overView[i];
            }
        }

        if (Util.count(nextView, -1) == 0) {
            break;
        }
    }

    for (var p = 0; p < stickyTumbles.length; p++) {
        var cache = stickyTumbles[p];
        nextView[cache.pos] = cache.symbol;
    }

    return nextView;
};

var GetTumbleMulti = function (view) {
    var totalMulti = 0;
    var multiPositions = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] > 100) {
            var multi = Math.floor(view[i] / 100);
            totalMulti += multi;
            multiPositions.push(i);
        }
    }
    return { totalMulti, multiPositions };
};

var isDoubleScatterView = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var scatterCount = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (isScatter(view[i + j * slotWidth])) {
                scatterCount++;
            }
        }

        if (scatterCount > 1) {
            return true;
        }
    }

    return false;
};

module.exports = SlotMachine;