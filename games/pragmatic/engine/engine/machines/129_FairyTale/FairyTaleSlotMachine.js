var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.gameType = "";
    this.lineCount = 15;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];

    //                        
    this.bonusGameWins = {};
    this.bonusGameEnd = true;
    this.bonusGameEntranced = false;

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinCacheList = [];
    this.freeSpinWinMoney = 0;
    this.freeSpinWin = 0;

    this.pourWildPos = [];
    this.superWildCount = 0;
    this.superWildPos = [];
    this.totalWin = 0;
    this.bonusMulti = 0;
    this.bonusWheelIndex = 0;

    //          
    this.gambleLimit = 0;
    this.gambleIndex = 0;
    this.gambleMulti = 1;
    this.gambleWinIndex = 0;
    this.gambleWinMoney = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var scatter = 0;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var gambleMultiArray = [1, 2, 3, 4, 5];
var bonusWheelMultiAr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
var wheelSet = [5, 50, 10, 30, 25, 45, 20, 40, 35, 15, 50];
var baseReels = [
    [2, 2, 2, 2, 9, 3, 0, 9, 2, 4, 3, 7, 11, 5, 8, 4, 9, 11, 6, 3, 6, 12, 12, 0, 10, 5, 8, 7],
    [11, 6, 6, 7, 5, 2, 2, 2, 10, 11, 12, 10, 8, 12, 7, 9, 2, 10, 3, 11, 4],
    [3, 2, 2, 2, 7, 8, 10, 5, 10, 5, 9, 4, 0, 11, 4, 6, 9, 10, 9, 12, 4, 11, 0, 8, 2, 6],
    [2, 2, 2, 2, 7, 8, 10, 7, 11, 12, 8, 12, 11, 10, 3, 11, 8, 9, 10, 7, 3, 4, 6, 5, 10, 2],
    [9, , 7, 11, 12, 11, 3, 6, 0, 5, 11, 10, 10, 5, 11, 7, 2, 2, 2, 2, 8, 2, 12, 0, 8, 4],
];
var pourReels = [
    [9, 5, 8, 7, 9, 6, 11, 11, 3, 10, 4, 11, 12, 8],
    [4, 5, 10, 12, 9, 10, 7, 12, 9, 6, 9, 2, 11, 12, 3, 8],
    [12, 4, 10, 11, 12, 3, 6, 8, 11, 7, 6, 8, 5, 9, 2, 12, 8],
    [7, 10, 10, 7, 3, 5, 2, 11, 8, 12, 4, 10, 6, 9, 9, 9],
    [6, 11, 7, 5, 8, 4, 5, 8, 8, 3, 10, 9, 12, 11],
];
var superReels = [
    [5, 3, 7, 8, 9, 4, 11, 12, 3, 2, 10, 5, 6, 7, 4, 3],
    [7, 9, 3, 10, 6, 5, 2, 3, 11, 4, 12, 4, 8],
    [3, 5, 11, 3, 4, 4, 8, 10, 12, 5, 3, 9, 2, 6, 7],
    [6, 5, 8, 12, 3, 3, 10, 9, 2, 6, 3, 7, 11, 4],
    [4, 11, 2, 4, 8, 5, 12, 7, 4, 5, 6, 3, 9, 7, 3, 10],
];
var progReels = [
    [
        [4, 3, 12, 13, 5, 11, 8, 9, 7, 10, 6, 2, 2, 2, 2, 2, 2],
        [11, 13, 4, 12, 4, 5, 7, 11, 8, 7, 5, 3, 3, 9, 6, 10],
        [13, 8, 6, 11, 3, 4, 10, 12, 9, 7, 5],
        [5, 5, 12, 11, 4, 4, 4, 6, 13, 8, 7, 9, 7, 10, 3],
        [12, 6, 7, 13, 7, 5, 9, 8, 4, 5, 3, 11, 3, 12, 8, 10, 6],
    ],
    [
        [6, 4, 3, 13, 8, 9, 11, 10, 12, 5, 7, 2, 2, 2, 2, 2, 2, 2],
        [12, 7, 6, 11, 3, 4, 10, 3, 5, 8, 9, 13, 2, 2, 2, 2, 2, 2],
        [5, 12, 4, 7, 9, 6, 11, 3, 4, 13, 10, 8],
        [6, 5, 5, 8, 7, 11, 13, 7, 4, 10, 12, 3, 4, 9, 4],
        [3, 3, 7, 5, 8, 11, 10, 6, 7, 6, 12, 8, 9, 4, 4, 13, 12, 5],
    ],
    [
        [6, 4, 3, 13, 8, 9, 11, 10, 12, 5, 7, 2, 2, 2, 2, 2, 2, 2],
        [12, 7, 6, 11, 3, 4, 10, 3, 5, 8, 9, 13, 2, 2, 2, 2, 2, 2],
        [3, 4, 11, 6, 7, 13, 10, 12, 8, 9, 2, 2, 2, 2, 2],
        [9, 8, 13, 9, 6, 12, 4, 10, 3, 7, 7, 11, 5, 5, 4],
        [7, 10, 6, 3, 4, 13, 9, 11, 7, 3, 8, 5, 5, 8, 12, 4, 6, 12],
    ],
    [
        [6, 4, 3, 13, 8, 9, 11, 10, 12, 5, 7, 2, 2, 2, 2, 2, 2, 2],
        [12, 7, 6, 11, 3, 4, 10, 3, 5, 8, 9, 13, 2, 2, 2, 2, 2, 2],
        [3, 4, 11, 6, 7, 13, 10, 12, 8, 9, 2, 2, 2, 2, 2],
        [9, 8, 13, 9, 6, 12, 4, 10, 3, 7, 7, 11, 5, 5, 4, 2, 2, 2, 2, 2, 2, 2],
        [7, 10, 6, 3, 4, 13, 9, 11, 7, 3, 8, 5, 5, 8, 12, 4, 6, 12],
    ],
    [
        [6, 4, 3, 8, 9, 11, 10, 12, 5, 7, 2, 2, 2, 2, 2, 2, 2],
        [12, 7, 6, 11, 3, 4, 10, 3, 5, 8, 9, 2, 2, 2, 2, 2, 2],
        [3, 4, 11, 6, 7, 10, 5, 12, 8, 9, 2, 2, 2, 2, 2],
        [9, 8, 9, 6, 12, 4, 10, 3, 7, 7, 11, 5, 5, 4, 2, 2, 2, 2, 2, 2, 2],
        [7, 10, 6, 3, 4, 9, 11, 7, 3, 8, 5, 5, 8, 12, 4, 6, 12, 2, 2, 2, 2, 2, 2, 2],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 50, 30, 30, 20, 20, 20, 5, 5, 5, 5, 5, 0],
    [0, 0, 100, 60, 60, 40, 40, 40, 15, 15, 10, 10, 10, 0],
    [0, 0, 500, 300, 300, 200, 200, 200, 100, 100, 50, 50, 50, 0],
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
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    //                                                              
    if (this.bonusGameEnd) {
        this.currentGame = "BASE";
        this.bonusGameEntranced = false;
    }

    //                                              
    //                                   ,             ,                                 3                                                gamesort                
    if (this.currentGame == "BASE" || this.currentGame == "FREE") {
        this.gameSort = this.currentGame;
    } else {
        this.gameSort = "BONUS";
    }

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
        this.freeSpinLength = cache.length;
        this.gambleLimit = viewCache.gamble;

        this.view = this.freeSpinCacheList[0];
        this.gameType = viewCache.freeType;
    } else if (viewCache.type == "BONUS") {
        var cache = viewCache.view;

        this.view = cache.view;
        this.bonusMulti = cache.multi;
        this.gameType = "WHEEL";
        this.gambleLimit = viewCache.gamble;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.currentGame = "BONUS_SELECT";
        this.bonusGameEnd = false;
        this.totalWin = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.gameType == "POUR") {
        this.PourFreeSpin(player);
    } else if (this.gameType == "SUPER") {
        this.SuperFreeSpin(player);
    } else if (this.gameType == "PROG") {
        this.ProgFreeSpin(player);
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = "BONUS";

    if (this.currentGame == "BONUS_SELECT") {
        this.BonusEntrance(player, param);
    } else {
        this.bonusGameEntranced = true;
        if (param.ind) {
            this.BonusWheelSpin(player, param);
        }
    }
};

SlotMachine.prototype.BonusEntrance = function () {
    //                     
    var wins_mask, wins;

    if (this.gameType == "POUR") {
        wins_mask = ["rwf", "psf", "prf", "wof"];
        wins = [10, 11, 20, 1];
    } else if (this.gameType == "SUPER") {
        wins_mask = ["psf", "wof", "prf", "rwf"];
        wins = [11, 1, 20, 10];
    } else if (this.gameType == "PROG") {
        wins_mask = ["rwf", "psf", "prf", "wof"];
        wins = [10, 11, 20, 1];
    } else if (this.gameType == "WHEEL") {
        wins_mask = ["wof", "psf", "rwf", "prf"];
        wins = [1, 11, 10, 20];
    }

    if (this.gameType != "WHEEL") {
        this.currentGame = "FREE";
        this.freeSpinIndex = 1;
    } else {
        this.currentGame = "BONUS";
    }
    this.bonusGameWins = { wins_mask, wins };
    this.totalWin = 0;
};

SlotMachine.prototype.PourFreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    this.maskView = cache.mask;
    this.pourWildPos = cache.wilds;

    this.freeSpinWin = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(pourReels),
        below: RandomLineFromReels(pourReels),
    };

    this.totalWin += this.freeSpinWin;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.bonusGameEnd = true;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SuperFreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    if (this.freeSpinIndex == 11) {
        this.maskView = cache.mask;
        this.superWildPos = cache.wilds;
    } else {
        this.superWildCount = cache.count;
    }

    this.freeSpinWin = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(pourReels),
        below: RandomLineFromReels(pourReels),
    };

    this.totalWin += this.freeSpinWin;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.bonusGameEnd = true;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.ProgFreeSpin = function (player) { };

SlotMachine.prototype.BonusWheelSpin = function (player, param) {
    this.bonusWheelIndex = wheelSet.indexOf(this.bonusMulti);
    this.totalWin = player.betPerLine * this.lineCount * this.bonusMulti;
    this.bonusGameEnd = true;
};

SlotMachine.prototype.GamblingOption = function (player, param) {
    var optionId = Number(param.g_o_ind);
    this.winMoney = 0;
    this.gambleWinMoney = 0;

    //                 
    if (optionId >= 0) {
        this.gambleMulti = optionId + 2;
    } else {
        //                       
        this.gambleMulti = 1;
        this.gambleWinMoney = this.totalWin;

        // PlayModel                                                                       .
        this.moneyBonusWin = this.gambleWinMoney;
        this.freeSpinWinMoney = this.gambleWinMoney;
        this.winMoney = this.gambleWinMoney;
    }
};

SlotMachine.prototype.Gambling = function (player, param) {
    var gambleIndex = Number(param.g_ind);
    this.gambleIndex = gambleIndex;

    //                       
    if (this.gambleIndex < 0) {
        this.gambleWinMoney = this.totalWin;

        this.winMoney = this.gambleWinMoney;

        //                                 
        var indexList = [];
        for (var i = 0; i < this.gambleMulti; i++) {
            if (i != this.gambleIndex) {
                indexList.push(i);
            }
        }
        this.gambleWinIndex = indexList[Util.random(0, indexList.length)];
    } else {
        //                        
        if (this.gambleMulti <= this.gambleLimit) {
            this.gambleWinMoney = this.totalWin * this.gambleMulti;
            this.gambleWinIndex = this.gambleIndex;
            this.winMoney = this.gambleWinMoney;
        } //                     
        else {
            this.winMoney = 0;

            //                                 
            this.gambleWinMoney = 0;
            var indexList = [];
            for (var i = 0; i < this.gambleMulti; i++) {
                if (i != this.gambleIndex) {
                    indexList.push(i);
                }
            }
            this.gambleWinIndex = indexList[Util.random(0, indexList.length)];
        }
    }

    // PlayModel                                                                       .
    this.moneyBonusWin = this.gambleWinMoney;
    this.freeSpinWinMoney = this.gambleWinMoney;

    //                                        
    var gambleSuccess = player.machine.gambleWinMoney > 0;
    if (!gambleSuccess) {
        this.currentGame = "BASE";
        this.bonusGameEnd = true;
        this.bonusGameEntranced = false;
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

    var gambleLimit, pattern;
    gambleLimit = gambleMultiArray[Util.random(0, gambleMultiArray.length)];
    jpWin = jpWin / gambleLimit;

    if (isCall) {
        console.log(`                : ${gambleLimit}`);
    }

    if (jpType === "RANDOM") {
        if (Util.probability(60)) {
            newJpType = "FREE";
        } else {
            newJpType = "BONUS";
        }
    }

    switch (newJpType) {
        case "FREE":
            pattern = this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
            break;
        case "BONUS":
            pattern = this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default:
            break;
    }

    pattern.gamble = gambleLimit;
    pattern.win *= gambleLimit;

    return pattern;
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinCount = 0;
    var freeType = "";
    var cache;

    var gameType = Util.random(1, 3);

    if (gameType == 1) {
        //                    
        freeSpinCount = 10;
        freeType = "POUR";
        cache = RandomPourFreeViewCache(pourReels, bpl, fsWin, freeSpinCount);
    } else if (gameType == 2) {
        //                
        freeSpinCount = 11;
        freeType = "SUPER";
        cache = RandomSuperFreeViewCache(superReels, bpl, fsWin, freeSpinCount - 1);
    } else if (gameType == 3) {
        //                   
        freeSpinCount = 20;
        freeType = "PROG";
        cache = RandomProgFreeViewCache(progReels, bpl, fsWin, freeSpinCount);
    }
    var freeSpinData = {
        length: freeSpinCount,
        viewList: [],
    };

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        freeType: freeType,
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var totalWin = 0;

    //                
    var multi = bsWin / totalBet;
    var value = 0;
    var maxPrize = bonusWheelMultiAr[bonusWheelMultiAr.length - 1];
    if (multi >= maxPrize) {
        multi = maxPrize;
    } else {
        for (var i = 0; i < bonusWheelMultiAr.length; i++) {
            if (multi <= bonusWheelMultiAr[i]) {
                multi = bonusWheelMultiAr[i - 1 >= 0 ? i - 1 : 0];
                break;
            }
        }
    }

    value = multi > bonusWheelMultiAr[0] ? multi : bonusWheelMultiAr[0];
    totalWin = value * totalBet;

    return {
        view: {
            view: scatterView,
            multi: value,
        },
        bpl: bpl,
        type: "BONUS",
        win: totalWin,
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

        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0 && NumberOfWilds(view) < 2 && !isDoubleScatterView(view)) {
            break;
        }
    }
    return view;
};

var RandomPourFreeViewCache = function (reels, bpl, fsWin, fsLen) {
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
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        freeSpinData.viewList = [];

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomPourView(reels);
                var fsCache = RandomWildView(fsview);

                fsWin = WinFromView(fsCache.view, bpl);
                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push({
                view: fsCache.view,
                mask: fsview,
                wilds: fsCache.wilds,
            });

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

var RandomSuperFreeViewCache = function (reels, bpl, fsWin, fsLen) {
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
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        var fsWildCount = 0;
        freeSpinData.viewList = [];

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomSuperView(reels);
                fsWin = WinFromView(fsview, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            fsWildCount += NumberOfWilds(fsview);
            freeSpinData.viewList.push({
                view: fsview,
                count: fsWildCount,
            });

            freeSpinWinMoney += fsWin;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
        }

        if (fsWildCount > 10 || fsWildCount < 3) {
            continue;
        } else {
            var newView = RandomPourView(reels);
            var wildCache = RandomWildView(newView, fsWildCount);
            var wildWin = WinFromView(wildCache.view, bpl);

            freeSpinData.win += wildWin;
            freeSpinData.viewList.push({
                view: wildCache.view,
                mask: newView,
                wilds: wildCache.wilds,
            });
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

var RandomProgFreeViewCache = function (reels, bpl, fsWin, fsLen) {
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
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        freeSpinData.viewList = [];

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);
                fsWin = WinFromView(fsview, bpl) * multi;

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

//                                              ,                    0              
var RandomPourView = function (reels) {
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

        if (NumberOfWilds(view) == 0) {
            break;
        }
    }
    return view;
};

//                                          ,                    3                    
var RandomSuperView = function (reels) {
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

        if (NumberOfWilds(view) < 4) {
            break;
        }
    }
    return view;
};

var RandomWildView = function (view, count = 0) {
    var newView = [...view];

    var randomCount = 0;
    if (Util.probability(5)) {
        randomCount = Util.random(5, 11);
    } else {
        randomCount = Util.random(3, 6);
    }
    var wildCount = count > 0 ? count : randomCount;
    var wildPos = [];

    while (true) {
        var rand = Util.random(0, view.length);
        if (wildPos.indexOf(rand) == -1) {
            wildPos.push(rand);
        }

        if (wildPos.length >= wildCount) {
            break;
        }
    }

    for (var i = 0; i < wildPos.length; i++) {
        newView[wildPos[i]] = wild;
    }

    return {
        view: newView,
        wilds: wildPos,
    };
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        var symbol = reels[i][index];
        result[i] = symbol > 0 ? symbol : 3;
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
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

var NumberOfWilds = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result++;
        }
    }
    return result;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
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