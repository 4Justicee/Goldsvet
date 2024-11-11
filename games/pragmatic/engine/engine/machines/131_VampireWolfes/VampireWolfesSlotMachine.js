var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    this.freeSpinCount = 5;
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
    this.freeSpinSticky = [];
    this.maskView = [];
    this.addedSticky = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var wolfSymbols = [16, 17, 18];
var vampireSymbols = [4, 6, 8]; // 19,20,21
var stickyVampire = [0, 0, 0, 0, 19, 0, 20, 0, 21];
var baseReels = [
    [7, 9, 12, 7, 5, 9, 1, 1, 1, 7, 2, 5, 11, 7, 10, 11, 5, 4, 11, 6, 4, 11, 8, 6, 4, 1, 1, 1, 10, 3, 5, 4, 9, 3, 4, 7, 11, 12, 8, 4, 6, 9, 10, 11, 2, 6, 11, 7, 6, 10, 3, 8, 11, 2, 7, 11, 3, 5, 12, 2, 6, 12, 10, 11, 1, 1, 1, 12, 4, 11, 12, 9, 5, 12, 9, 3, 8, 12, 9, 10, 5, 12, 10, 3, 9, 6, 12, 8, 10, 3, 8, 6, 9, 12, 6, 10, 2, 7, 12, 10, 7, 9, 10, 2, 7, 8, 11, 10, 8, 12, 5, 2, 12, 5, 8, 4, 11, 8, 3],
    [12, 11, 10, 2, 10, 8, 9, 11, 4, 5, 11, 12, 8, 3, 6, 9, 3, 8, 12, 6, 2, 12, 5, 8, 4, 10, 7, 9, 11, 5, 12, 10, 4, 11, 12, 5, 6, 12, 3, 7, 12, 2, 9, 11, 7, 9, 3, 6, 7, 12, 10, 11, 12, 6, 3, 12, 2, 9, 3, 8, 2, 9, 8, 12, 9, 8, 11, 4, 7, 9, 5, 12, 7, 6, 10, 11, 5, 10, 3, 4, 7, 8, 6, 7, 5, 10, 4, 5],
    [8, 9, 12, 10, 9, 5, 12, 8, 10, 12, 7, 3, 12, 2, 4, 12, 8, 11, 12, 6, 7, 11, 12, 8, 10, 4, 12, 10, 9, 2, 10, 7, 4, 3, 6, 10, 9, 6, 3, 11, 10, 2, 10, 8, 4, 9, 7, 8, 12, 2, 7, 12, 10, 7, 5, 10, 3, 8, 9, 11, 10, 3, 8, 11, 2, 7, 11, 3, 9, 6, 5, 4, 9, 6, 12, 4, 11, 8, 5, 2, 9, 5, 7, 9, 5, 11, 6, 5, 11, 12, 7],
    [11, 8, 12, 4, 5, 12, 4, 8, 10, 6, 2, 10, 12, 6, 7, 2, 3, 10, 9, 12, 6, 2, 12, 6, 7, 11, 6, 10, 8, 11, 4, 8, 7, 4, 12, 9, 10, 8, 6, 11, 7, 6, 11, 9, 4, 10, 9, 12, 4, 3, 5, 7, 2, 5, 10, 3, 7, 11, 6, 3, 9, 5, 2, 9, 5, 8, 7, 4, 10, 3, 9, 11, 10, 12, 8, 4, 9, 12, 11, 9, 12, 6, 8, 2, 11, 12, 5],
    [8, 5, 10, 12, 5, 8, 9, 10, 7, 5, 2, 7, 5, 3, 10, 11, 1, 1, 1, 12, 9, 2, 8, 12, 7, 10, 6, 2, 9, 6, 7, 8, 11, 4, 9, 12, 11, 8, 12, 9, 3, 12, 6, 1, 1, 1, 11, 10, 3, 11, 4, 10, 12, 4, 10, 11, 7, 10, 5, 8, 10, 3, 12, 7, 6, 9, 7, 3, 2, 4, 6, 12, 7, 8, 12, 7, 1, 1, 1, 9, 6, 7, 11, 8, 9, 5, 2, 9, 8, 3, 4, 11, 3, 5, 12, 11, 6, 10, 11, 6],
];
var freeReels = [
    [
        [11, 6, 4, 11, 8, 18, 6, 4, 10, 16, 17, 4, 9, 16, 4, 18, 11, 12, 8, 6, 9, 16, 10, 11, 2, 6, 11, 18, 6, 10, 16, 8, 11, 2, 18, 11, 16, 17, 12, 2, 6, 12, 10, 11, 12, 4, 12, 10, 16, 9, 6, 12, 8, 10, 16, 8, 6, 9, 12, 6, 10, 2, 18, 12, 10, 18, 9, 10, 2, 9, 18, 8, 12, 17, 2, 12, 17, 8, 4, 11, 8, 16],
        [12, 11, 10, 4, 6, 18, 10, 11, 2, 10, 8, 9, 11, 4, 17, 11, 12, 8, 16, 6, 9, 18, 16, 8, 12, 6, 2, 12, 17, 8, 11, 17, 16, 10, 2, 4, 10, 16, 18, 9, 11, 17, 12, 10, 11, 12, 17, 6, 12, 16, 18, 12, 2, 9, 11, 18, 9, 16, 6, 18, 12, 10, 17, 11, 12, 6, 16, 12, 2, 6, 10, 11, 9, 12, 4, 10, 18, 8, 2],
        [8, 9, 12, 4, 10, 9, 17, 12, 8, 10, 12, 18, 16, 12, 2, 4, 12, 8, 11, 12, 17, 18, 11, 4, 6, 11, 4, 6, 11, 18, 8, 6, 18, 11, 12, 8, 10, 16, 4, 12, 10, 9, 2, 10, 18, 4, 6, 10, 9, 6, 16, 11, 10, 2, 11, 9, 16, 6, 2, 17, 10, 8, 17, 16, 9, 18, 8, 12, 2, 18, 12, 10, 18, 17, 10, 16, 8, 9, 11, 10, 8],
        [11, 8, 12, 4, 18, 10, 17, 18, 8, 10, 16, 9, 12, 4, 17, 12, 4, 8, 10, 6, 2, 18, 10, 12, 6, 18, 2, 16, 10, 9, 12, 6, 2, 12, 6, 18, 11, 16, 6, 10, 8, 11, 4, 8, 18, 4, 12, 9, 8, 17, 9, 11, 10, 2, 11, 16, 10, 8, 6, 11, 18, 6, 17, 11, 9, 4, 10, 9, 12, 4, 16, 17, 18, 2, 17, 10, 16, 18, 11, 6, 9, 17, 2, 9, 17, 8, 18, 4, 10, 16, 9, 11, 10, 12],
        [17, 11, 9, 4, 17, 2, 8, 17, 10, 12, 17, 8, 9, 10, 18, 17, 2, 18, 17, 16, 10, 18, 11, 12, 9, 2, 8, 12, 18, 10, 6, 2, 9, 6, 18, 8, 11, 16, 9, 12, 11, 6, 16, 11, 10, 16, 11, 4, 10, 8, 11, 4, 12, 8, 10, 12, 18, 8, 12, 18, 9, 6, 18, 11, 8, 9, 17, 2, 9, 8, 16, 4, 11, 16, 17, 12, 11, 6, 10, 11, 6, 10, 2, 12, 4, 11, 12, 6, 9],
    ],
    [
        [8, 7, 11, 7, 9, 12, 5, 9, 11, 11, 7, 10, 5, 11, 7, 5, 12, 7, 4, 8, 5, 10, 3, 6, 10, 4, 3, 8, 11, 11, 8, 6, 9, 10, 6, 2, 11, 6, 12, 6, 7, 10, 3, 8, 11, 11, 2, 7, 4, 5, 12, 12, 6, 5, 12, 10, 11, 11, 4, 9, 9, 12, 3, 9, 12, 9, 10, 12, 5, 12, 10, 9, 6, 8, 9, 10, 3, 8, 6],
        [12, 11, 10, 3, 6, 4, 8, 12, 10, 11, 8, 10, 11, 4, 5, 12, 4, 3, 7, 10, 4, 8, 12, 6, 12, 2, 6, 8, 12, 5, 3, 10, 11, 12, 4, 7, 10, 11, 5, 12, 10, 6, 11, 5, 6, 12, 3, 12, 7, 2, 9, 9, 11, 7, 4, 6, 8, 12, 12, 10, 11, 7, 3, 6, 11, 11, 9, 12, 5, 10, 7, 9, 8],
        [8, 10, 12, 11, 10, 5, 12, 9, 11, 12, 7, 3, 4, 12, 5, 8, 12, 11, 6, 12, 5, 11, 7, 5, 12, 7, 8, 9, 7, 8, 11, 12, 9, 11, 5, 12, 11, 9, 8, 5, 4, 7, 11, 10, 7, 3, 12, 11, 10, 12, 11, 10, 4, 7, 6, 11, 9, 10, 8, 9, 12, 8, 11, 7, 10, 6, 3, 10, 3, 4, 9, 9],
        [12, 9, 8, 11, 9, 11, 6, 9, 11, 10, 12, 6, 9, 7, 11, 12, 7, 8, 11, 10, 12, 7, 8, 9, 7, 12, 10, 6, 9, 8, 10, 9, 7, 10, 3, 12, 4, 2, 11, 12, 5, 11, 9, 7, 12, 11, 8, 7, 10, 11, 10, 11, 7, 8, 11, 5, 8, 12, 7, 3, 10, 5, 10, 9, 8, 11, 10, 12, 11, 11],
        [6, 11, 10, 3, 6, 9, 11, 6, 10, 3, 11, 9, 6, 4, 7, 5, 11, 4, 12, 6, 9, 3, 5, 9, 11, 9, 6, 7, 10, 9, 12, 10, 12, 11, 9, 3, 10, 5, 12, 6, 5, 8, 12, 5, 10, 12, 6, 11, 12, 5, 2, 9, 11, 8, 11, 9, 5, 11, 4, 6, 12, 11, 9, 7, 11, 9, 12, 8, 10, 5, 7, 4, 2, 12, 12, 11, 10, 12, 10, 12, 10, 10, 3, 9, 6, 5, 12, 12, 3, 8, 11, 12, 6, 12, 4, 12, 10],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 25, 25, 15, 15, 10, 10, 8, 6, 5, 5, 0, 0, 0, 25, 25, 25, 0, 0, 0],
    [0, 0, 150, 125, 125, 75, 75, 50, 50, 30, 20, 15, 12, 0, 0, 0, 150, 150, 150, 0, 0, 0],
    [0, 0, 1000, 800, 800, 300, 300, 180, 180, 100, 60, 50, 30, 0, 0, 0, 1000, 1000, 1000, 0, 0, 0],
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
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0][0].view;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        // console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = GenerateLines(this.view, baseReels);

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;

        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.freeSpinType = Number(param.ind);

    this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
    this.freeSpinLength = this.freeSpinCacheList[0].freeSpinLength;
};

SlotMachine.prototype.FreeSpin = function (player) {
    var stickyPositions;

    //                           
    if (this.freeSpinType == 0) {
        this.view = this.freeSpinCacheList[this.freeSpinIndex];
        var wolfView = GetWolfView(this.view);

        this.winMoney = WinFromView(wolfView, player.betPerLine);
        this.winLines = WinLinesFromView(wolfView, player.betPerLine);
    } else if (this.freeSpinType == 1) {
        var cache = this.freeSpinCacheList[this.freeSpinIndex];
        this.freeSpinSticky = [];

        this.view = cache.view.view;
        this.maskView = cache.view.mask;

        stickyPositions = cache.stickyPos;
        for (var i = 0; i < stickyPositions.length; i++) {
            this.freeSpinSticky.push(`${stickyPositions[i]},${stickyPositions[i]}`);
        }

        var prevCache = this.freeSpinCacheList[this.freeSpinIndex - 1];
        if (this.freeSpinIndex > 1 && prevCache.newPos.length > 0) {
            this.addedSticky = `${prevCache.newSym[0]}~${stickyVampire[prevCache.newSym[0]]}~${prevCache.newPos.join()}`;
        } else {
            this.addedSticky = "";
        }

        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winLines = WinLinesFromView(this.view, player.betPerLine);
    }

    this.virtualReels = GenerateLines(this.view, freeReels[this.freeSpinType]);

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";

        //             
        if (this.freeSpinType == 1) {
            var vampirePos = GetVampirePositions(this.view);
            stickyPositions = stickyPositions.concat(vampirePos);
            for (var i = 0; i < stickyPositions.length; i++) {
                this.freeSpinSticky.push(`${stickyPositions[i]},-1`);
            }
        }
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

    var lengthArray = [14, 8];

    for (var i = 0; i < 2; i++) {
        //                                     
        var freeSpinLength = lengthArray[i]; //             

        freeSpinStore[i] = [];

        var scatterCache = {
            view: scatterView,
            freeSpinLength: freeSpinLength,
        };

        freeSpinStore[i] = [scatterCache];

        var result = RandomFreeViewCache(freeReels[i], bpl, fsWin, freeSpinLength, i);

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
        var stickyPositions = [];
        var stickySymbols = [];

        while (true) {
            var fsview, fsWin, newPositions, newSymbols, vampireView;

            while (true) {
                fsview = RandomFreeView(reels);

                //                            0:       , 1:             
                if (fsType == 0) {
                    var wolfView = GetWolfView(fsview);
                    fsWin = WinFromView(wolfView, bpl);
                } else if (fsType == 1) {
                    vampireView = GetVampireStickyView(fsview, stickyPositions, stickySymbols);
                    fsWin = WinFromView(vampireView, bpl);

                    //                 
                    var result = GetStickys(vampireView);
                    newPositions = result.positions;
                    newSymbols = result.symbols;
                }

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            if (fsType == 0) {
                freeSpinData.viewList.push(fsview);
            } else if (fsType == 1) {
                var cache = {};
                if (stickySymbols.length > 0) {
                    cache.view = vampireView;
                    cache.mask = fsview;
                } else {
                    cache.view = fsview;
                    cache.mask = [];
                }

                stickyPositions = stickyPositions.concat(newPositions);
                stickySymbols = stickySymbols.concat(newSymbols);

                freeSpinData.viewList.push({
                    view: cache,
                    stickyPos: stickyPositions,
                    stickySym: stickySymbols,
                    newPos: newPositions,
                    newSym: newSymbols,
                });
            }

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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
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

        if (!isFreeSpinWin(view)) {
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

//                                          
var GetWolfView = function (view) {
    var result = Util.clone(view);

    for (var i = 0; i < result.length; i++) {
        //                                                                  
        if (wolfSymbols.indexOf(result[i]) > -1) {
            result[i] = wolfSymbols[0];
        }
    }

    return result;
};

//                                                 
var GetVampireStickyView = function (view, pos, symbols) {
    var result = Util.clone(view);

    for (var i = 0; i < pos.length; i++) {
        result[pos[i]] = stickyVampire[symbols[i]];
    }

    return result;
};

//                       ,                                           .
var GetStickys = function (view) {
    var selectSymbol = vampireSymbols[Util.random(0, 3)];

    var stickySymbols = [];
    var stickyPos = [];

    for (var i = 0; i < view.length; i++) {
        if (view[i] == selectSymbol && Util.probability(50)) {
            stickySymbols.push(selectSymbol);
            stickyPos.push(i);
        }
    }

    return {
        symbols: stickySymbols,
        positions: stickyPos,
    };
};

var GetVampirePositions = function (view) {
    var result = [];

    for (var i = 0; i < view.length; i++) {
        if (vampireSymbols.indexOf(view[i]) > -1) {
            result.push(i);
        }
    }

    return result;
};

var isWild = function (symbol) {
    return symbol == wild || (symbol != 0 && stickyVampire.indexOf(symbol) > -1);
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    var flag1 = true;
    var flag2 = true;

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (!isScatter(view[pos])) flag1 = false;
    }

    for (var j = 0; j < slotHeight; j++) {
        var pos = j * slotWidth + 4;
        if (!isScatter(view[pos])) flag2 = false;
    }

    return flag1 && flag2;
};

//                                          .              ,                                           ..
var GenerateLines = function (view, reels) {
    var virtualReels = {
        above: RandomLineFromReels(reels),
        below: RandomLineFromReels(reels),
    };

    for (var i = 0; i < 5; i++) {
        //                  (0~4)
        if (isScatter(view[i])) {
            virtualReels.above[i] = scatter;
        }
        //                     (10~14)
        if (isScatter(view[i + 10])) {
            virtualReels.below[i] = scatter;
        }
    }

    return virtualReels;
};

module.exports = SlotMachine;