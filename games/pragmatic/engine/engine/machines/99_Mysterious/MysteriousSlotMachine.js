var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.currentType = 0;
    this.prevType = 0;
    this.randomCount = 1;     // prg          
    this.randomType = 1;      //                        
    this.randomIndex = 0;     //                        
    this.randomLimit = 90;
    //                 
    this.lg = [];
    this.trailView = [];      //ts          
    this.stackSymbol = 3;

    this.multi = 1;
    this.wildArr = [];
    this.wildExArr = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinStore = [];
    this.freeSpinCacheList = [];
    this.freeSpinType = 0;
    this.isFreeSpinAdd = 0;
    this.scatterPositions = [];
    this.lockingCount = -1;   //                   
    this.clocks = [];         //                   
    this.movingCount = 0;     //                             

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var slotWidth = 6;
var slotHeight = 4;
var scatter = 1;
var winLines = [];
var baseReels = [
    [
        [10, 7, 3, 3, 11, 11, 7, 11, 3, 8, 11, 9, 4, 9, 9, 5, 10, 10, 3, 7, 4, 6, 7, 3, 4, 7, 5],
        [8, 4, 5, 1, 10, 8, 5, 4, 6, 8, 10, 6, 10, 5, 10, 5, 8, 11, 8, 8, 11, 11, 6, 5, 8, 8, 10, 9, 10, 10, 2, 4, 6, 5, 5, 4, 7, 6, 10, 4, 6, 6, 10, 3, 10, 6, 11, 8, 5, 8, 8, 4, 5],
        [6, 7, 9, 1, 7, 5, 3, 8, 8, 11, 11, 6, 8, 9, 6, 8, 5, 11, 9, 7, 9, 3, 7, 11, 6, 8, 7, 5, 2, 7, 9, 5, 11, 8, 8, 9, 9, 7, 6, 8, 10, 8, 7, 7, 4, 5, 11, 9, 3],
        [7, 9, 4, 3, 4, 10, 3, 2, 10, 6, 10, 7, 9, 8, 8, 6, 5, 3, 4, 6, 4, 3, 8, 3, 10, 3, 10, 8, 7, 6, 4, 6, 9, 3, 4, 8, 10, 10, 7, 8, 10, 9, 9, 7, 9, 11, 9, 4],
        [13, 13, 13, 13],
        [13, 13, 13, 13]
    ],
    [
        [7, 9, 7, 4, 3, 10, 10, 8, 4, 7, 11, 4, 6, 7, 5, 3, 11, 11, 9, 9, 11, 11, 10],
        [11, 11, 4, 1, 4, 10, 10, 4, 8, 3, 5, 11, 11, 5, 4, 10, 6, 7, 11, 12, 6, 8, 8, 9, 9],
        [7, 11, 9, 1, 4, 9, 9, 9, 10, 10, 7, 12, 8, 8, 5, 3, 7, 5, 6, 11, 11, 7, 9, 9],
        [6, 8, 8, 9, 10, 4, 7, 5, 9, 9, 6, 4, 8, 3, 6, 11, 7, 4, 12, 10, 10, 3],
        [13, 13, 13, 13],
        [13, 13, 13, 13]
    ],
    [
        [11, 11, 7, 4, 7, 11, 7, 5, 4, 9, 9, 3, 6, 9, 7, 10, 8, 4, 11, 11, 10, 10, 3],
        [5, 10, 7, 9, 1, 9, 6, 14, 8, 8, 6, 4, 10, 10, 4, 4, 3, 10, 10, 5, 11, 8, 11, 11],
        [11, 11, 7, 1, 5, 8, 8, 11, 14, 10, 10, 9, 7, 3, 9, 9, 7, 6, 4, 5, 9, 9, 9, 7],
        [4, 3, 10, 10, 4, 7, 3, 10, 14, 8, 9, 6, 4, 5, 9, 9, 11, 6, 10, 3, 8, 8, 6, 7],
        [13, 13, 13, 13],
        [13, 13, 13, 13]
    ]
];
var freeReels = [
    [
        [7, 9, 9, 3, 7, 5, 9, 3, 16, 10, 10, 7, 4, 3, 8, 4, 10, 11, 11, 11, 11, 4, 7, 16, 11, 11, 11, 6, 11, 11],
        [5, 11, 10, 10, 10, 10, 16, 8, 8, 8, 10, 10, 10, 4, 10, 11, 11, 6, 3, 11, 11, 11, 11, 4, 9, 9, 16, 8, 8, 4, 5, 7, 5, 6],
        [5, 7, 4, 7, 16, 8, 8, 11, 11, 9, 7, 11, 10, 10, 8, 11, 11, 16, 6, 9, 5, 3, 9, 9, 7],
        [5, 16, 10, 4, 7, 9, 9, 9, 10, 6, 3, 8, 8, 16, 7, 6, 3, 4, 6, 11, 9, 9, 8, 4, 9, 10, 10],
        [10, 9, 10, 7, 16, 5, 11, 6, 6, 8, 3, 9, 8, 4, 10, 11, 16, 5, 7, 3, 6, 7, 10, 9, 8, 4],
        [9, 7, 5, 16, 11, 9, 10, 11, 6, 6, 3, 9, 4, 5, 8, 11, 16, 7, 10, 9, 7, 10, 4, 6, 10, 11]
    ],
    [
        [11, 11, 11, 4, 7, 9, 10, 10, 11, 11, 11, 11, 3, 9, 9, 3, 3, 8, 6, 4, 5, 7, 11, 11, 4, 4, 10, 7, 7],
        [5, 3, 3, 6, 4, 11, 11, 11, 11, 10, 10, 10, 10, 5, 11, 6, 4, 5, 5, 10, 10, 10, 18, 8, 8, 4, 4, 10, 9, 9, 7],
        [5, 5, 11, 7, 9, 7, 8, 8, 10, 10, 8, 7, 6, 18, 9, 9, 11, 11, 3, 3, 4, 5, 9, 9, 7, 7],
        [6, 6, 10, 9, 6, 8, 11, 7, 4, 3, 3, 8, 8, 3, 7, 7, 10, 5, 9, 18, 4, 6, 9, 3, 4, 10, 10],
        [4, 9, 8, 10, 18, 8, 7, 4, 8, 10, 3, 9, 4, 9, 7, 5, 5, 10, 11, 6, 10, 6, 6, 5, 7],
        [3, 3, 9, 5, 11, 10, 8, 6, 6, 10, 11, 9, 10, 11, 7, 6, 4, 4, 9, 5, 4, 9, 11, 3, 10, 7]
    ]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 10, 10, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 20, 15, 10, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 40, 30, 20, 15, 15, 10, 10, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 250, 100, 60, 50, 30, 25, 25, 20, 20, 0, 0, 0, 0, 0, 0, 0]
];
var percentList = {
    baronAppearPercent: 10,
    scatterAppearPercent: 7,
    wildAppearPercent: 2,
    freeWinPercent: 50,
    wildAddPercent: 22,
    lockingPercent: 22,
    multiPercent: 22
};
var freeSpinCounts = [8, 12];
var lord = 2, lady = 12, baron = 14;
var infected = 15, added = 16, moving = 17, locking = 18;
var extendPositions = [4, 10, 16, 22, 5, 11, 17, 23];         //                                             

SlotMachine.prototype.Init = function () {
    this.highPercent = 4; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
    this.randomLimit = 88 + Util.random(0, 12);
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;


    //              ,          ,                                  
    this.prevType = this.currentType;
    this.currentType = viewCache.random;
    ++this.randomCount;
    //                               (api                             )


    if (this.prevType != this.currentType) {
        this.randomCount = 1;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinStore = viewCache.view;

        this.maskView = this.freeSpinStore[0].view;
        this.view = GetMaskView(this.maskView, extendPositions);
        this.scatterPositions = ScatterPositions(this.view);
        this.freeSpinLength = freeSpinCounts[NumberOfScatters(this.view) - 3];
        this.currentGame = "FREE";

        if (this.currentType == 1) {
            this.stackSymbol = Util.random(3, 12);
        }
        return;
    }

    this.multi = 1;
    this.trailView = viewCache.view;
    this.scatterPositions = ScatterPositions(this.trailView);

    if (this.currentType == 0) {
        var res = GetLordResult(this.trailView);

        this.view = res.view;
        this.multi = res.multi;

    }
    this.wildArr = GetWildArr(this.trailView);
    //          ,                                       
    if (this.currentType == 1) {
        this.wildExArr = GetLadyExArr(this.wildArr);
    } else if (this.currentType == 2) {
        this.wildExArr = GetBaronExArr(this.wildArr);
    }

    if (this.currentType < 2) {
        this.winMoney = WinFromView(this.trailView, player.betPerLine);
        this.winLines = winLines;

        if (this.currentType == 1) {
            this.stackSymbol = viewCache.msr;
            this.lg = [];

            if (this.winMoney) {
                this.lg.push(0);
            } else {
                this.lg.push(-1);
            }
        }
    }

    if (this.currentType) {
        this.view = GetFinalView(this.trailView, this.wildExArr, this.currentType == 1 ? this.stackSymbol : infected);
        this.maskView = GetMaskView(this.view, this.wildExArr);

        if (this.currentType == 1 && this.wildArr.length || this.currentType == 2) {
            this.winMoney += WinFromView(this.view, player.betPerLine); //                                 
        }

        if (this.currentType == 1) {
            if (winLines.length > 0) {
                this.lg.push(this.winLines.length);
            } else {
                this.lg.push(-1);
            }
        }

        this.winLines = this.winLines.concat(winLines);
    }
    this.virtualReels = {
        above: RandomLineFromReels(baseReels[this.currentType]),
        below: RandomLineFromReels(baseReels[this.currentType])
    };
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.freeSpinType = Number(param.ind);
    this.freeSpinCacheList = this.freeSpinStore[1][this.freeSpinType];

    this.freeSpinIndex = 0;
    this.isFreeSpinAdd = 0;
    this.freeSpinWinMoney = 0;

    if (this.freeSpinType) {
        this.lockingCount = -1;
    } else {
        this.movingCount = 0;
    }
    this.multi = 1;
}

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;

    if (this.freeSpinType == 0) {
        this.wildArr = GetSymbolArr(this.view, added);
        this.wildExArr = [];

        if (this.wildArr.length) {
            this.wildExArr = GetSymbolArr(this.view, moving);
            this.maskView = GetMaskView(this.view, this.wildArr);
            this.maskView = GetMaskView(this.maskView, this.wildExArr);
            this.movingCount += this.wildArr.length;
        }
    } else {
        this.clocks = [];
        this.isFreeSpinAdd = false;

        if (this.lockingCount <= 0) {
            this.multi = 1;
            this.lockingCount = -1;
        } else {
            --this.lockingCount;
        }

        if (cache.clocks) {
            this.clocks = cache.clocks;
            this.multi = cache.multi;
            this.lockingCount = 0;

            if (cache.clocks.length == 2) {
                this.lockingCount = 3;
                this.isFreeSpinAdd = true;
                this.freeSpinLength += 3;
            }
        }

    }

    this.winMoney = WinFromView(this.view, player.betPerLine) * this.multi;
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels[this.freeSpinType]),
        below: RandomLineFromReels(freeReels[this.freeSpinType])
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex >= this.freeSpinCacheList.length) {
        this.currentGame = "BASE";
        return;
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    this.SetPatternType();

    var pattern = {};

    if (baseWin > 0) {
        pattern = RandomWinView(baseReels[this.randomType], bpl, baseWin, this.randomType);
    } else {
        pattern = RandomZeroView(baseReels[this.randomType], bpl, this.randomType);
    }

    pattern.type = "BASE";
    pattern.random = this.randomType;
    pattern.bpl = bpl;

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
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    this.SetPatternType();

    var freeSpinStore = [];
    var currentType = this.randomType;

    if (isCall) {
        currentType = Util.random(0, 3);
    }
    var scatterView = RandomScatterView(baseReels[currentType], bpl);
    var fsCount = freeSpinCounts[NumberOfScatters(scatterView) - 3];

    freeSpinStore.push({
        view: scatterView,
    });

    var movingCache = RandomFreeViewCache(freeReels[0], bpl, fsWin, fsCount, 0);
    var lockingCache = RandomFreeViewCache(freeReels[1], bpl, fsWin, fsCount, 1);

    freeSpinStore.push([movingCache.cache, lockingCache.cache]);

    var pattern = {
        view: freeSpinStore,
        bpl: bpl,
        win: Util.max(movingCache.win, lockingCache.win),
        random: currentType,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

//                                            ,          ,                                            2022-03-10 JackSon
SlotMachine.prototype.SetPatternType = function () {
    ++this.randomIndex;

    if (this.randomIndex > this.randomLimit) {
        this.randomIndex = 0;
        this.randomType += Util.random(1, 3);
        this.randomType %= 3;

        if (this.randomType == 2 && !Util.probability(percentList.baronAppearPercent)) {
            this.randomType = Util.random(0, 2);
        }
    }
};

var RandomWinView = function (reels, bpl, maxWin, type) {
    var pattern = {};
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        pattern = RandomView(reels, bpl, type);

        if (pattern.win > bottomLimit && pattern.win <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return pattern;
};

var RandomZeroView = function (reels, bpl, type) {
    var pattern = {};

    while (true) {
        pattern = RandomView(reels, bpl, type);

        if (pattern.win == 0) {
            break;
        }
    }
    return pattern;
};

var RandomView = function (reels, bpl = 10, type = 0, isFree = false) {
    var view = [];
    var pattern = {};
    var tmpWin = 0;

    while (true) {
        pattern = {};

        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
            }
        }

        if (isFree) {
            return view;
        }

        if (NumberOfScatters(view) && !Util.probability(percentList.scatterAppearPercent)) {
            continue;
        }

        if (NumberOfWilds(view) && !Util.probability(percentList.wildAppearPercent)) {
            continue;
        }

        if (type == 0) {
            if (NumberOfWilds(view) > 1) {
                continue;
            }

            var multi = Util.random(2, 4);

            for (var i = 0; i < view.length; ++i) {
                if (isWild(view[i])) {
                    view[i] += multi * 100;
                    break;
                }
            }

            tmpWin = WinFromView(view, bpl);
        } else if (type == 1) {
            pattern.msr = Util.random(3, 12);
            tmpWin = WinFromView(view, bpl);

            if (NumberOfWilds(view)) {
                var ladyArr = GetWildArr(view);
                var ladyExArr = GetLadyExArr(ladyArr);
                var ladyView = GetFinalView(view, ladyExArr, pattern.msr);

                tmpWin += WinFromView(ladyView, bpl);
            }
        } else if (type == 2) {
            var baronArr = GetWildArr(view);
            var baronExAr = GetBaronExArr(baronArr);
            var baronView = GetFinalView(view, baronExAr, infected);

            tmpWin = WinFromView(baronView, bpl);
        }

        pattern.view = view;
        pattern.win = tmpWin;
        return pattern;
    }
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

        if (!NumberOfScatters(view) && WinFromView(view, bpl) == 0 && !NumberOfWilds(view)) {
            break;
        }
    }

    var nScatters = Util.random(3, 5);
    var reels = Util.randomPositionArray(nScatters, 1, nScatters);

    for (var i = 0; i < nScatters; ++i) {
        view[reels[i] + slotWidth * Util.random(0, slotHeight)] = scatter;
    }

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, fsType = 0) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = {};

        if (!fsType) {
            freeSpinData = RandomFreeMovingViewCache(reels, bpl, fsLen);
        } else {
            freeSpinData = RandomFreeLockingViewCache(reels, bpl, fsLen);
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

var RandomFreeMovingViewCache = function (reels, bpl, fsLen) {
    var freeSpinCacheList = [];
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var tmpView;
    var movingCount = 0;

    while (freeSpinIndex <= freeSpinLength) {
        while (true) {
            tmpView = RandomView(reels, bpl, -1, true);

            tmpWin = WinFromView(tmpView, bpl);
            if (tmpWin && Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                var addedCount = NumberOfWilds(tmpView);

                if (addedCount) {
                    if (movingCount + addedCount <= 12 && Util.probability(percentList.wildAddPercent)) {
                        break;
                    }
                } else {
                    break;
                }
            }
        }

        var wildArr = GetSymbolArr(tmpView, added);

        if (wildArr.length) {
            for (var i = 0; i < movingCount; ++i) {
                var pos = 0;

                while (true) {
                    pos = Util.random(1, 5) + Util.random(0, slotHeight) * slotWidth;

                    if (tmpView[pos] != added && tmpView[pos] != moving) {
                        break;
                    }
                }

                tmpView[pos] = moving;
            }

            movingCount += wildArr.length;
        }

        var cache = {
            view: tmpView,
        }

        freeSpinCacheList.push(cache);
        freeSpinTotalWin += WinFromView(tmpView, bpl);

        freeSpinIndex++;
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin,
    };
};

var RandomFreeLockingViewCache = function (reels, bpl, fsLen) {
    var freeSpinCacheList = [];
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var lockingCount = -1;
    var tmpView;
    var multi = 1;

    while (freeSpinIndex <= freeSpinLength) {
        while (true) {
            tmpView = RandomView(reels, bpl, -1, true);
            tmpWin = WinFromView(tmpView, bpl);
            if (tmpWin && Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                break;
            }
        }

        var cache = {
            view: tmpView,
        }

        if (lockingCount <= 0) {
            var clockCount = 0;
            var clocks = [];

            if (Util.probability(percentList.lockingPercent)) {
                clockCount = 2;
            } else if (Util.probability(percentList.multiPercent)) {
                clockCount = 1;
            }

            if (clockCount) {
                for (var i = 0; i < clockCount; ++i) {
                    clocks.push(i * 5 + Util.random(0, slotHeight) * slotWidth);
                }

                cache.clocks = clocks;
                multi = Util.random(1, 3) * 3;
                lockingCount = 0;
            }

            if (clockCount == 2) {
                lockingCount = 3;
            }
        }

        if (lockingCount >= 0) {
            cache.multi = multi;
            tmpWin *= multi;
        }

        freeSpinCacheList.push(cache);
        freeSpinTotalWin += tmpWin;

        if (lockingCount <= 0) {
            multi = 1;
            lockingCount = -1;
            ++freeSpinIndex;
        } else {
            --lockingCount;
        }
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin,
    };
};

var GetSymbolArr = function (view, symbol) {
    var res = [];

    for (var i = 0; i < view.length; ++i) {
        if (view[i] == symbol) {
            res.push(i);
        }
    }

    return res;
};

var GetMaskView = function (view, posArr) {
    var res = [...view];

    for (var i = 0; i < posArr.length; ++i) {
        res[posArr[i]] = Util.random(3, 12);
    }

    return res;
};

var GetLordResult = function (view) {
    var res = [...view];
    var multi = 1;

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            multi = Math.floor(res[i] / 100);
            res[i] %= 100;
        }
    }

    return {
        view: res,
        multi: multi
    };
};

var GetWildArr = function (view) {
    var res = [];

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            res.push(i);
        }
    }

    return res;
};

var GetLadyExArr = function (ladyArr) {
    var res = [];

    for (var i = 0; i < ladyArr.length; ++i) {
        var reelNo = ladyArr[i] % slotWidth;

        for (var j = 0; j < slotHeight; ++j) {
            res.push(reelNo + slotWidth * j);
        }
    }

    return res;
};

var GetFinalView = function (view, wildExArr, msr) {
    var res = [...view];

    for (var i = 0; i < wildExArr.length; ++i) {
        res[wildExArr[i]] = msr;
    }

    return res;
};

var GetBaronExArr = function (baronArr) {
    var res = [];

    for (var i = 0; i < baronArr.length; ++i) {
        var baronPos = baronArr[i];

        if (baronPos - slotWidth >= 0) {
            res.push(baronPos - slotWidth);
        }

        if (baronPos + slotWidth < slotHeight * slotWidth) {
            res.push(baronPos + slotWidth);
        }
    }

    return res;
};

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var GetLordMulti = function (view, history) {
    var multi = 1;

    for (var i = 0; i < history.length; i++) {
        var pos = history[i];

        if (view[pos] > 100) {
            multi = Math.floor(view[pos] / 100);
            break;
        }
    }

    return multi;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    var winMoney = 0;

    //                                                             
    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId] * GetLordMulti(view, history);
        winLines.push(`0~${winMoney}~${history.join('~')}`);
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }
    //                                                                              
    if (positionsByStep.length == 0) {
        var money = bpl * payTable[step][symbolId];

        if (money > 0) {
            money *= GetLordMulti(view, history);

            winLines.push(`0~${money}~${history.join('~')}`);
        }
        return money;
    }

    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var NumberOfWilds = function (view) {
    var res = 0;

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            ++res;
        }
    }

    return res;
};

var isWild = function (symbol) {
    return symbol > 100 || symbol == lord || symbol == lady || symbol >= baron;
};

var NumberOfScatters = function (view) {
    var result = 0;

    for (var i = 0; i < view.length; ++i) {
        if (isScatter(view[i])) {
            ++result;
        }
    }

    return result;
};

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var isScatter = function (symbol) {
    return symbol == scatter;
}

module.exports = SlotMachine;