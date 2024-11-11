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

    this.jackpotStatus = "NOJACKPOT";
    this.jackpotMoney = 0;
    this.jackpotBeforeMoney = 0;
    this.jackpotSymbols = [];
    this.jackpotMulti = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "JACKPOT"];
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var jackpotMultiArr = [50, 200, 1250];
var baseReels = [
    [4, 4, 4, 5, 5, 5, 14, 3, 3, 3, 9, 12, 10, 3, 3, 3, 10, 8, 9, 6, 12, 13, 9, 10, 11, 8, 6, 1, 4, 4, 4, 5, 5, 5, 3, 3, 3, 12, 11, 6, 13, 9, 7, 11, 7, 13, 5, 5, 5, 14, 10, 1, 6, 8, 4, 4, 4, 7, 11],
    [9, 4, 4, 4, 13, 10, 7, 10, 9, 5, 5, 5, 11, 2, 2, 2, 14, 3, 3, 3, 3, 4, 4, 4, 8, 12, 12, 7, 14, 5, 5, 5, 8, 2, 2, 2, 13, 11, 6, 3, 3, 3, 2, 2, 2, 7, 11, 13, 10, 3, 3, 3, 6, 13, 5, 5, 5, 8, 9, 12, 6, 4, 4, 4, 11, 12],
    [9, 9, 4, 4, 4, 8, 2, 2, 2, 7, 14, 12, 3, 3, 3, 5, 5, 5, 10, 6, 1, 4, 4, 4, 9, 5, 5, 5, 8, 12, 14, 2, 2, 2, 11, 3, 3, 3, 13, 5, 5, 5, 10, 11, 2, 2, 2, 1, 7, 14, 3, 3, 3, 13, 12, 1, 10, 13, 12, 5, 5, 5, 5, 4, 4, 4, 6, 7, 8],
    [4, 4, 4, 7, 12, 5, 5, 5, 9, 12, 2, 2, 2, 2, 14, 10, 11, 8, 2, 2, 2, 12, 5, 5, 5, 8, 7, 4, 4, 4, 3, 3, 3, 5, 5, 5, 8, 10, 11, 14, 3, 3, 3, 13, 6, 12, 13, 11, 5, 5, 5, 12, 4, 4, 4, 13, 2, 2, 2, 7, 3, 3, 3, 6, 8, 9, 10],
    [1, 5, 5, 5, 5, 10, 11, 1, 7, 6, 8, 4, 4, 4, 12, 6, 13, 7, 3, 3, 3, 2, 2, 2, 13, 6, 11, 6, 5, 5, 5, 9, 13, 9, 7, 10, 1, 13, 8, 2, 2, 2, 14, 3, 3, 3, 4, 4, 4, 5, 5, 5, 12, 10, 11, 11, 3, 3, 3, 14, 4, 4, 4, 6, 2, 2, 2, 4],
];
var freeReels = [
    [
        [10, 3, 3, 3, 6, 9, 14, 5, 5, 5, 7, 7, 12, 10, 9, 4, 4, 4, 11, 6, 1, 6, 13, 13, 8, 10, 3, 3, 3, 8, 11, 4, 4, 4, 11, 5, 5, 5, 12, 13, 1, 7, 10, 14, 6, 9, 4, 4, 4, 14, 3, 3, 3, 11, 8, 9, 5, 5, 5, 13, 1],
        [8, 13, 6, 9, 17, 17, 17, 14, 12, 13, 14, 2, 2, 2, 3, 3, 3, 4, 4, 4, 13, 6, 8, 8, 7, 9, 10, 9, 3, 3, 3, 11, 8, 14, 11, 11, 2, 2, 2, 3, 3, 3, 7, 12, 4, 4, 4, 2, 2, 2, 17, 17, 17, 10, 12, 10, 17, 17, 17, 12, 13, 13, 10, 11],
        [8, 13, 14, 13, 2, 2, 2, 17, 17, 17, 17, 1, 6, 3, 3, 3, 7, 1, 9, 17, 17, 17, 13, 4, 4, 4, 12, 9, 8, 2, 2, 2, 3, 3, 3, 9, 4, 4, 4, 6, 17, 17, 17, 10, 11, 6, 1, 9, 10, 12, 8, 3, 3, 3, 11, 2, 2, 2, 14, 13, 4, 4, 4, 10, 7, 11, 7],
        [3, 3, 3, 11, 11, 10, 8, 13, 2, 2, 2, 3, 3, 3, 12, 8, 13, 9, 4, 4, 4, 7, 9, 11, 13, 12, 14, 2, 2, 2, 17, 17, 17, 9, 4, 4, 4, 12, 12, 7, 6, 6, 13, 4, 4, 4, 3, 3, 3, 17, 17, 17, 6, 8, 13, 14, 7, 7, 2, 2, 2, 8, 17, 17, 17, 9],
        [2, 2, 2, 11, 8, 3, 3, 3, 17, 17, 17, 9, 10, 6, 11, 11, 1, 4, 4, 4, 4, 14, 13, 17, 17, 17, 13, 14, 2, 2, 2, 4, 4, 4, 7, 3, 3, 3, 6, 10, 13, 6, 7, 4, 4, 4, 2, 2, 2, 3, 3, 3, 9, 13, 11, 8, 6, 12, 17, 17, 17, 1, 12, 7, 13, 10],
    ],
    [
        [11, 9, 9, 4, 4, 4, 13, 8, 1, 6, 8, 11, 10, 1, 5, 5, 5, 12, 9, 11, 4, 4, 4, 3, 3, 3, 1, 13, 7, 13, 6, 12, 6, 5, 5, 5, 13, 4, 4, 4, 8, 9, 8, 7, 7, 3, 3, 3, 6, 11, 7, 14, 4, 10, 12, 5, 5, 5, 14, 3, 3, 3, 13, 10, 1],
        [12, 14, 3, 3, 3, 3, 10, 2, 2, 2, 16, 16, 16, 14, 11, 8, 8, 8, 14, 12, 3, 3, 3, 13, 16, 16, 16, 11, 17, 17, 17, 13, 11, 9, 7, 12, 7, 2, 2, 2, 9, 7, 16, 16, 16, 2, 2, 2, 17, 17, 17, 6, 13, 6, 10, 9, 3, 3, 3, 13, 17, 17, 17, 12, 11, 9, 10],
        [14, 17, 17, 17, 3, 3, 3, 3, 8, 1, 2, 2, 2, 6, 6, 11, 12, 13, 11, 8, 7, 2, 2, 2, 17, 17, 17, 12, 9, 16, 16, 16, 16, 13, 14, 1, 3, 3, 3, 2, 2, 2, 16, 16, 16, 7, 12, 14, 7, 10, 17, 17, 10, 14, 10, 13, 8, 3, 3, 3, 12, 8, 16, 16, 16, 9, 1],
        [9, 14, 7, 14, 12, 12, 12, 11, 2, 2, 2, 10, 3, 3, 3, 9, 16, 16, 16, 6, 3, 3, 3, 6, 17, 17, 17, 17, 12, 16, 16, 16, 14, 13, 12, 7, 13, 7, 13, 8, 2, 2, 2, 17, 17, 17, 11, 16, 16, 16, 3, 3, 3, 8, 11, 9, 17, 17, 17, 8, 11, 7, 2, 2, 2, 10],
        [1, 6, 14, 10, 6, 8, 7, 13, 3, 3, 3, 14, 16, 16, 16, 11, 17, 17, 17, 2, 2, 2, 11, 9, 12, 2, 2, 2, 17, 17, 17, 16, 16, 16, 12, 3, 3, 3, 8, 11, 9, 6, 11, 9, 13, 17, 17, 17, 12, 1, 10, 3, 3, 3, 10, 16, 16, 16, 2, 2, 2, 1, 6, 11],
    ],
    [
        [11, 4, 4, 4, 7, 5, 5, 5, 6, 13, 11, 8, 6, 9, 8, 7, 3, 3, 3, 8, 5, 5, 5, 9, 13, 14, 3, 3, 3, 4, 4, 4, 7, 6, 12, 6, 7, 1, 11, 10, 10, 4, 4, 4, 11, 12, 13, 9, 5, 5, 5, 12, 14, 3, 3, 3, 10, 1, 12, 9, 11, 8, 1],
        [13, 13, 8, 2, 2, 2, 17, 17, 17, 2, 2, 2, 7, 11, 11, 8, 16, 16, 16, 17, 17, 17, 13, 12, 9, 10, 9, 10, 15, 15, 15, 17, 17, 17, 6, 16, 16, 16, 10, 2, 6, 15, 15, 15, 11, 12, 9, 14, 8, 16, 16, 16, 12, 15, 15, 15, 13, 14, 6, 11, 12, 10],
        [6, 16, 16, 16, 2, 2, 2, 13, 8, 8, 10, 15, 15, 15, 17, 17, 17, 2, 15, 15, 15, 14, 13, 9, 2, 2, 2, 9, 12, 13, 1, 7, 8, 16, 16, 16, 17, 17, 17, 6, 7, 10, 11, 14, 8, 1, 15, 15, 15, 2, 2, 2, 11, 7, 14, 14, 16, 16, 16, 12, 17, 17, 17],
        [7, 2, 2, 2, 7, 12, 17, 17, 17, 15, 15, 15, 8, 11, 6, 16, 16, 16, 13, 10, 6, 7, 2, 2, 2, 12, 17, 17, 17, 9, 8, 16, 16, 16, 10, 8, 15, 15, 15, 8, 12, 12, 14, 10, 13, 7, 17, 17, 17, 11, 11, 14, 9, 16, 16, 16, 11, 13, 13, 12, 6, 2, 2, 2],
        [12, 15, 15, 15, 14, 2, 2, 2, 6, 16, 16, 16, 6, 14, 10, 17, 17, 17, 11, 15, 15, 15, 11, 11, 14, 6, 9, 16, 16, 16, 2, 2, 2, 12, 11, 10, 1, 10, 11, 13, 17, 17, 17, 7, 1, 15, 15, 15, 13, 9, 13, 8, 1, 2, 2, 2, 7, 16, 16, 16, 6, 9, 17, 17, 7],
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
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.jackpotStatus = "NOJACKPOT";
    this.jackpotMoney = 0;

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

        this.view = this.freeSpinCacheList[0][0].view;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        // console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    } else if (viewCache.type == "JACKPOT") {
        this.view = viewCache.view;
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

    //                      
    if (isJackpotWin(this.view)) {
        var fullStacks = GetFullStacks(this.view);
        this.jackpotBeforeMoney = this.winMoney;
        this.jackpotMoney = jackpotMultiArr[fullStacks.length - 3] * player.betPerLine * this.lineCount;
        this.winMoney += this.jackpotMoney;
        this.jackpotStatus = "JACKPOT";
        this.jackpotMulti = jackpotMultiArr[fullStacks.length - 3];

        this.jackpotSymbols = [];
        for (var i = 0; i < fullStacks.length; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = j * slotWidth + i;
                this.jackpotSymbols.push(pos);
            }
        }
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

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }
    tmpWin = WinFromView(tmpView, bpl);

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
        if (totalBet * jackpotMultiArr[0] <= jpWin && Util.probability(20)) {
            newJpType = "JACKPOT";
        } else {
            newJpType = "FREE";
        }
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        case "JACKPOT":
            return this.SpinForJackpotGen(bpl, totalBet, jpWin, isCall);
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

SlotMachine.prototype.SpinForJackpotGen = function (bpl, totalBet, jpWin, isCall = false) {
    var view = [];

    //              
    var multi = jpWin / totalBet;
    var value = 0;
    var maxPrize = jackpotMultiArr[jackpotMultiArr.length - 1];

    if (multi >= maxPrize) {
        multi = maxPrize;
    } else {
        for (var i = 0; i < jackpotMultiArr.length; i++) {
            if (multi <= jackpotMultiArr[i]) {
                multi = jackpotMultiArr[i - 1 >= 0 ? i - 1 : 0];
                break;
            }
        }
    }

    value = multi > jackpotMultiArr[0] ? multi : jackpotMultiArr[0];

    var fullStackCount = jackpotMultiArr.indexOf(value) + 3;

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = baseReels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = baseReels[i][reelPos];
            }
        }

        if (isJackpotWin(view) && GetFullStacks(view).length == fullStackCount && WinFromView(view, bpl) == 0) {
            break;
        }
    }

    var pattern = {
        view: view,
        bpl: bpl,
        win: value * totalBet,
        type: "JACKPOT",
        comment: "      ",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
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

        if (!isFreeSpinWin(view) && !isJackpotWin(view)) {
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

        if (isFreeSpinWin(view)) {
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

        if (NumberOfScatters(view) < 3 && !isJackpotWin(view)) {
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

//                    15,16,17                                
var ChangeViewForFree = function (view, type) {
    var result = Util.clone(view);
    for (var i = 0; i < result.length; i++) {
        var reelNo = i % slotWidth;
        //                                                                         .
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

var isJackpotWin = function (view) {
    var flagArray = [];

    for (var i = slotWidth - 1; i >= 0; i--) {
        // i                                               
        var symbol = view[i];

        if (isFairySymbol(symbol)) {
            //                                          
            var count = 0;
            for (var j = 0; j < slotHeight; j++) {
                var pos = j * slotWidth + i;
                if (view[pos] == symbol) {
                    count++;
                }
            }

            if (count >= 3) {
                flagArray[i] = true;
            } else {
                flagArray[i] = false;
            }
        } else {
            flagArray[i] = false;
        }
    }

    flagArray.reverse();
    if (flagArray[0] && flagArray[1] && flagArray[2]) {
        return true;
    } else {
        return false;
    }
};

var isFairySymbol = function (symbol) {
    //                   
    if (symbol == 3 || symbol == 4 || symbol == 5) {
        return true;
    }
    //                
    if (symbol == 15 || symbol == 16 || symbol == 17) {
        return true;
    }
    return false;
};

var GetFullStacks = function (view) {
    var fullStackReelIndex = [];

    for (var i = 0; i < slotWidth; i++) {
        var startSymbol = view[i];
        if (isFairySymbol(startSymbol)) {
            var isFullStack = true;
            for (var j = 0; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                if (view[pos] != startSymbol) {
                    isFullStack = false;
                    break;
                }
            }

            if (isFullStack) {
                fullStackReelIndex.push(i);
            }
        }
    }

    return fullStackReelIndex;
};

module.exports = SlotMachine;