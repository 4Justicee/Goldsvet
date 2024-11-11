var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.maskView = [];
    //                           
    this.randomSpinCache = [];
    this.randomSpinMode = 0;
    this.randomSpinIndex = 0;
    this.randomSpinLength = 0;
    this.randomInd = 0;
    this.changedArr = [];
    this.changedSymbol = 3;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    //                    
    this.buyMulti = 80;
    this.buyPatternCount = 100;

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 4;
var freeSpinCount = 5;
var mystery = 13;
var baseReels = [
    [2, 2, 2, 2, 7, 10, 8, 12, 3, 3, 12, 3, 8, 8, 5, 5, 12, 12, 11, 11, 11, 8, 8, 11, 11, 12, 12, 6, 12, 6, 6, 12, 11, 11, 12, 12, 9, 12, 4],
    [2, 2, 2, 2, 7, 12, 12, 12, 9, 9, 8, 8, 11, 11, 10, 10, 9, 6, 6, 4, 9, 4, 4, 8, 9, 10, 3, 10, 5, 9, 4, 11, 6, 8, 7, 7, 12, 12, 7, 7, 3, 3, 8, 3, 3, 11, 8, 8, 5, 5, 11, 5, 11, 12, 12, 4, 4, 10, 4, 9, 11, 11, 9, 5, 5, 12, 7, 1],
    [2, 2, 2, 2, 9, 10, 1, 10, 4, 4, 8, 4, 3, 7, 3, 3, 8, 4, 8, 4, 12, 9, 9, 5, 5, 10, 5, 9, 6, 6, 10, 3, 3, 11],
    [2, 2, 2, 2, 8, 5, 5, 9, 7, 1, 9, 4, 4, 9, 8, 12, 6, 3, 3, 9, 12, 6, 6, 8, 11, 4, 11, 4, 10],
    [5, 7, 6, 12, 6, 10, 8, 11, 8, 2, 2, 2, 2, 7, 4, 4, 9, 3]
];
var freeReels = [
    [
        [5, 12, 12, 8, 11, 11, 11, 8, 13, 13, 13, 13, 8, 4, 9, 4, 9, 11, 3, 3, 13, 13, 13, 13, 7, 12, 8, 11, 12, 7, 12, 7, 13, 13, 13, 13, 13, 9, 12, 12, 11, 4, 11, 6, 6, 11, 4, 11, 2, 2, 2, 2, 7, 10],
        [2, 2, 2, 2, 12, 7, 13, 13, 13, 13, 3, 3, 8, 11, 4, 8, 4, 8, 5, 13, 13, 13, 13, 6, 6, 9, 10],
        [3, 7, 4, 4, 11, 5, 5, 8, 9, 2, 2, 2, 2, 9, 10, 4, 11, 4, 4, 10, 11, 7, 12, 6, 6, 10, 13, 13, 13, 13],
        [4, 6, 2, 2, 2, 2, 11, 12, 10, 8, 5, 5, 9, 9, 9, 7, 7, 9, 13, 13, 13, 13, 3],
        [2, 2, 2, 2, 11, 8, 4, 7, 7, 10, 5, 5, 9, 8, 3, 3, 8, 11, 6, 6, 8, 7, 11, 11, 9, 12, 10, 13, 13, 13, 13]
    ],
    [
        [5, 12, 12, 8, 11, 11, 11, 8, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 8, 4, 9, 4, 9, 11, 3, 3, 13, 13, 13, 13, 13, 7, 12, 8, 11, 12, 7, 12, 7, 13, 13, 13, 13, 13, 9, 12, 12, 11, 4, 11, 6, 6, 11, 4, 11, 2, 2, 2, 2, 7, 10],
        [4, 8, 10, 2, 2, 2, 2, 2, 10, 9, 11, 8, 7, 7, 12, 12, 7, 7, 13, 13, 13, 13, 11, 5, 11, 3, 13, 13, 13, 13, 12, 10, 7, 10, 6],
        [2, 2, 2, 2, 6, 11, 10, 4, 4, 10, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 12, 9, 9, 5, 5, 10, 13, 13, 13, 13, 13, 3, 3, 8, 10, 3, 8, 3, 3, 6, 7],
        [8, 12, 10, 4, 4, 11, 4, 4, 12, 4, 13, 13, 13, 13, 13, 5, 12, 5, 5, 12, 7, 2, 2, 2, 2, 2, 10, 9, 5, 5, 12, 12, 6, 6, 12, 3],
        [6, 8, 2, 2, 2, 2, 2, 8, 11, 12, 9, 4, 4, 7, 3, 7, 13, 13, 13, 13, 13, 8, 8, 4, 9, 12, 12, 10, 5]
    ],
    [
        [5, 12, 12, 8, 11, 11, 11, 8, 13, 13, 13, 13, 8, 4, 9, 4, 9, 11, 3, 3, 13, 13, 13, 13, 13, 7, 12, 8, 11, 12, 7, 12, 7, 13, 13, 13, 13, 9, 12, 12, 11, 4, 11, 6, 6, 11, 4, 11, 2, 2, 2, 2, 7, 10],
        [6, 13, 13, 13, 13, 13, 10, 12, 11, 13, 13, 13, 13, 13, 4, 4, 8, 9, 10, 10, 2, 2, 2, 2, 12, 7, 13, 13, 13, 13, 4, 8, 5],
        [2, 2, 2, 2, 6, 11, 10, 4, 4, 10, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 12, 9, 9, 5, 5, 10, 13, 13, 13, 13, 13, 3, 3, 8, 10, 3, 8, 3, 3, 6, 7],
        [9, 13, 13, 13, 13, 11, 4, 11, 4, 10, 6, 11, 6, 6, 12, 10, 2, 2, 2, 2, 8, 12, 10, 4, 4, 11, 4, 4, 12, 4, 13, 13, 13, 13, 13, 5, 12, 5, 5, 12, 7, 2, 2, 2, 2, 12, 6, 6, 12, 3],
        [6, 8, 7, 11, 11, 9, 13, 13, 13, 13, 13, 13, 13, 13, 13, 10, 8, 11, 8, 2, 2, 2, 2, 2, 7, 4, 4, 9, 3, 3, 7, 9, 8, 3, 13, 13, 13, 13, 4, 12, 4, 10, 5]
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 20, 10, 10, 10, 4, 4, 4, 4, 2, 2, 0],
    [0, 0, 100, 50, 40, 30, 30, 20, 20, 10, 10, 5, 5, 0],
    [0, 0, 250, 200, 100, 75, 75, 50, 50, 40, 40, 20, 20, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],        // 1
    [10, 11, 12, 13, 14],   // 2
    [0, 1, 2, 3, 4],        // 3
    [15, 16, 17, 18, 19],   // 4
    [15, 11, 7, 13, 19],    // 5
    [10, 6, 2, 8, 14],      // 6
    [0, 6, 12, 8, 4],       // 7
    [5, 11, 17, 13, 9],     // 8
    [15, 11, 17, 13, 19],   // 9
    [10, 6, 12, 8, 14],     // 10
    [5, 1, 7, 3, 9],        // 11
    [0, 6, 2, 8, 4],        // 12
    [5, 11, 7, 13, 9],      // 13
    [10, 16, 12, 18, 14],   // 14
    [5, 6, 2, 8, 9],        // 15
    [10, 11, 7, 13, 14],    // 16
    [15, 16, 12, 18, 19],   // 17
    [10, 11, 17, 13, 14],   // 18
    [5, 6, 12, 8, 9],       // 19
    [0, 1, 7, 3, 4],        // 20
    [15, 16, 2, 18, 19],    // 21
    [15, 16, 7, 18, 19],    // 22
    [10, 11, 2, 13, 14],    // 23
    [0, 1, 17, 3, 4],       // 24
    [0, 1, 12, 3, 4],       // 25
    [5, 6, 17, 8, 9],       // 26
    [15, 6, 17, 8, 19],     // 27
    [10, 1, 12, 3, 14],     // 28
    [0, 11, 2, 13, 4],      // 29
    [5, 16, 7, 18, 9],      // 30
    [0, 6, 7, 8, 4],        // 31
    [5, 11, 12, 13, 9],     // 32
    [10, 16, 17, 18, 14],   // 33
    [15, 11, 12, 13, 19],   // 34
    [10, 6, 7, 8, 14],      // 35
    [5, 1, 2, 3, 9],        // 36
    [0, 11, 12, 13, 4],     // 37
    [5, 16, 17, 18, 14],    // 38
    [10, 1, 2, 3, 14],      // 39
    [15, 6, 7, 8, 19]       // 40
];
var percentList = {
    randomSpinPercent: 34,
    fortHexPercent: 34,
    SuperFreePercent: 12,
    MegaFreePercent: 0,
    freeWinPercent: 50
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.randomSpinMode) {
        if (this.RandomSpin(player)) {
            return;
        }
    }

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    this.randomSpinMode = 0;
    this.randomSpinIndex = 0;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    var viewCache = player.viewCache;

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0].view;
        this.freeSpinType = this.freeSpinCacheList[0].type;
        this.freeSpinLength = freeSpinCount;
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = 0;
        this.currentGame = "FREE";
    } else if (viewCache.mode) {
        this.randomSpinMode = viewCache.mode;
        this.randomSpinCache = viewCache.view;

        if (viewCache.mode == 1) {
            this.view = this.randomSpinCache.view;
            this.changedArr = this.randomSpinCache.wildAddArr;
        } else {
            this.view = this.randomSpinCache[0];
        }
    } else {
        this.view = viewCache.view;
    }

    if (this.randomSpinMode != 2) {
        this.winMoney = WinFromView(this.view, player.betPerLine); //                             
        this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                        
    }


};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.randomInd = Number(param.ind);
}

SlotMachine.prototype.RandomSpin = function (player) {
    if (this.randomSpinMode == 1) {
        if (this.randomSpinIndex == 1) {
            this.randomSpinMode = 0;
            return false;
        }
        this.maskView = [...this.view];
        this.view = GetFinalView(this.maskView, this.changedArr, wild);
        this.randomSpinIndex = 1;   //                                              0                                 .
    } else {
        if (this.randomSpinIndex >= this.randomSpinCache.length) {
            this.randomSpinMode = 0;
            return false;
        }

        this.view = this.randomSpinCache[this.randomSpinIndex];
        this.changedArr = GetLowPosArr(this.view);
        ++this.randomSpinIndex;
    }

    if (this.randomSpinMode == 1 || this.randomSpinMode == 2 && this.randomSpinIndex >= this.randomSpinCache.length) {
        this.winMoney = WinFromView(this.view, player.betPerLine);     //                             
        this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                        
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    return true;
}

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.maskView = cache.view;
    this.changedSymbol = cache.changedSymbol;
    this.changedArr = Util.positionsFromView(this.maskView, function (item) { return item == mystery });
    this.view = GetFinalView(this.maskView, this.changedArr, this.changedSymbol);

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    for (var i = 0; i < slotWidth; ++i) {
        if (this.maskView[i] == mystery) {
            this.virtualReels.above[i] = mystery;
        }

        if (this.maskView[i + slotWidth * 3] == mystery) {
            this.virtualReels.below[i] = mystery;
        }
    }

    // if(this.freeSpinIndex != 0){
    //     this.virtualReels = {
    //         above: [13,7,5,13,5],
    //         below: [11,7,13,3,2]
    //     };
    // }

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    this.isFreeSpinAdd = 0;

    if (this.freeSpinIndex > this.freeSpinLength) {
        if (this.freeSpinWinMoney < GetFreeSpinMin(this.freeSpinType, Number(player.virtualBet))) {
            this.freeSpinLength += freeSpinCount;
            this.isFreeSpinAdd = 1;
        } else {
            this.currentGame = "BASE";
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {};
    var tmpView, tmpWin = 0;
    //                            [      ] *                                                             ~~                 .

    if (baseWin >= 0) {
        if (baseWin > totalBet * 12 && Util.probability(percentList.randomSpinPercent)) {
            pattern.mode = 1;

            if (baseWin > totalBet * 34 && Util.probability(percentList.fortHexPercent)) {
                pattern.mode = 2;
            }

            var randomSpinData = RandomSpinViewCache(baseReels, bpl, baseWin, pattern.mode);

            tmpView = randomSpinData.cache;
            tmpWin = randomSpinData.win;
        } else {
            tmpView = RandomWinView(baseReels, bpl, baseWin);
            tmpWin = WinFromView(tmpView, bpl);
        }
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }

    pattern.view = tmpView;
    pattern.win = tmpWin;
    pattern.type = "BASE";
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
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsType = 0;

    if (Util.probability(percentList.MegaFreePercent)) {
        fsType = 2;
    } else if (Util.probability(percentList.SuperFreePercent)) {
        fsType = 1;
    }

    var fsCache = RandomFreeViewCache(freeReels[fsType], bpl, fsWin, fsType, totalBet);

    freeSpinCacheList.push({
        view: scatterView,
        type: fsType
    });

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: fsType,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinCacheList = [];
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsType = 0;

    if (Util.probability(percentList.MegaFreePercent)) {
        fsType = 2;
    } else if (Util.probability(percentList.SuperFreePercent)) {
        fsType = 1;
    }

    var fsCache = BuyBonusViewCache(freeReels[fsType], bpl, totalBet, fsType);

    freeSpinCacheList.push({
        view: scatterView,
        type: fsType
    });

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: fsType,
        type: "FREE",
        isCall: 0
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
    return tmpView
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

        if (!isFreeSpinWin(view) && NumberOfScatters(view) < 2 /*&& Util.count(view, mystery) == 0*/) {
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

        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsType, totalBet) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, totalBet, fsType);

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

var RandomSpinViewCache = function (reels, bpl, maxWin, mode, step = 0) {
    var randomSpinData = {};
    var view = [];

    while (true) {
        view = RandomView(reels);

        if (NumberOfScatters(view) == 0) {
            view[1 + Util.random(0, slotHeight) * slotWidth] = scatter;
            view[2 + Util.random(0, slotHeight) * slotWidth] = scatter;

            break;
        }
    }

    if (mode == 1) {
        var cache = {};

        var wildCount = Util.random(5, 9);
        var randomPosArr = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight);

        cache.view = view;
        cache.wildAddArr = randomPosArr.slice(0, wildCount);

        var finalView = GetFinalView(cache.view, cache.wildAddArr, wild);

        randomSpinData.cache = cache;
        randomSpinData.win = WinFromView(finalView, bpl);
    } else if (mode == 2) {
        var viewList = [];
        var lowPosArr = [];

        viewList.push(view);

        while (true) {
            var prevView = [...viewList[viewList.length - 1]];

            lowPosArr = GetLowPosArr(prevView);

            if (lowPosArr.length == 0) {
                break;
            }

            view = RandomView(reels);
            viewList.push(GetTumbleView(view, prevView, lowPosArr));
        }

        randomSpinData.cache = viewList;
        randomSpinData.win = WinFromView(viewList[viewList.length - 1], bpl);
    }

    if (randomSpinData.win < maxWin || step > 34) {
        return randomSpinData;
    }

    return RandomSpinViewCache(reels, bpl, maxWin, mode, step + 1);
};

var BuyBonusViewCache = function (reels, bpl, totalBet, fsType) {
    var freeSpinCacheList = [];
    var tmpView;
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = freeSpinCount;
    var changedSymbol = 3;

    while (freeSpinIndex <= freeSpinLength) {

        if (fsType == 2) {
            changedSymbol = Util.random(2, 7);
        } else {
            changedSymbol = Util.random(2, 13);
        }

        tmpView = RandomView(reels);
        var mysteryPosArr = Util.positionsFromView(tmpView, function (item) { return item == mystery });
        var finalView = GetFinalView(tmpView, mysteryPosArr, changedSymbol);

        tmpWin = WinFromView(finalView, bpl);

        freeSpinCacheList.push({
            view: tmpView,
            changedSymbol: changedSymbol
        });

        freeSpinTotalWin += tmpWin;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength && freeSpinTotalWin < GetFreeSpinMin(fsType, totalBet)) {
            freeSpinLength += freeSpinCount;
        }
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
    };
};

var GetTumbleView = function (view, prevView, tumblePosArr) {
    var res = [...prevView];

    for (var i = 0; i < tumblePosArr.length; ++i) {
        res[tumblePosArr[i]] = view[tumblePosArr[i]];
    }

    return res;
};

var GetFreeSpinMin = function (type, totalBet) {
    switch (type) {
        case 0:
            return totalBet * 10;
        case 1:
            return totalBet * 25;
        case 2:
            return totalBet * 50;
    }
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var GetFinalView = function (view, posArr, changedSymbol) {
    var res = [...view];

    for (var i = 0; i < posArr.length; ++i) {
        res[posArr[i]] = changedSymbol;
    }

    return res;
};

var GetLowPosArr = function (view) {
    var res = [];

    for (var i = 0; i < view.length; ++i) {
        if (view[i] > 6 || view[i] == scatter) {
            res.push(i);
        }
    }

    return res;
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

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }
    return money;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) { //                                       
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                          
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                                           
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) { //                                         -1          
        lineSymbols[i] = -1;
    }
    return payTable[matchCount][symbol] * bpl; //                                      
}

module.exports = SlotMachine;