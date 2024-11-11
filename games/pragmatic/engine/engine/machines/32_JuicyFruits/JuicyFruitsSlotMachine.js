var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    this.freeSpinCount = 6;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.wildMake = ""; //                             
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.wildSize = 1; //                   
    this.scatterAdd = 0; //                             
    this.trail = "";
    this.scatterTotal = 0; //                             
    this.fsMore = 0; //                         

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE

    //                   
    this.doubleMulti = 0.2;
    this.buyMulti = 100;
    this.buyPatternCount = 30;
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 5;
var baseReels = [
    [10, 10, 10, 4, 10, 6, 6, 6, 1, 9, 10, 8, 8, 8, 7, 8, 5, 5, 5, 6, 11, 11, 11, 11, 13, 12, 12, 12, 13, 1, 7, 13, 13, 13, 8, 11, 4, 4, 4, 5, 3, 9, 9, 9, 12, 7, 7, 7, 7, 6, 12, 12],
    [13, 12, 10, 13, 13, 13, 11, 11, 8, 10, 11, 11, 11, 6, 6, 12, 9, 6, 1, 6, 6, 8, 5, 13, 9, 7, 8, 8, 8, 11, 6, 4, 13, 9, 9, 9, 11, 13, 8, 11, 7, 7, 7, 7, 6, 3, 9, 8, 3],
    [13, 9, 11, 11, 1, 10, 5, 12, 4, 8, 4, 3, 9, 8, 7, 10, 13, 11, 11, 11, 11, 13, 7, 13, 3, 4, 5, 12, 7, 9, 5, 6, 11, 7, 10, 4, 6, 7, 7, 7, 11, 9, 7, 10, 13, 1, 4, 11, 12, 12, 7, 12, 5, 9, 13, 11, 5, 12, 12, 12, 10, 5, 7, 9, 12, 4, 13, 10, 7, 7, 12, 4, 4, 7, 9, 7, 10, 1, 10, 10, 11, 9, 9, 7, 10, 13, 9, 9, 10, 9, 6, 12, 9, 12, 7, 5, 9, 9, 9, 9, 12, 10, 7, 7, 8, 10, 10, 8, 8, 12, 9, 5, 1, 6, 12, 12, 7, 5, 5, 6],
    [6, 10, 12, 6, 5, 4, 3, 9, 7, 6, 5, 11, 13, 13, 8, 8, 13, 10, 10, 10, 10, 11, 4, 11, 8, 11, 13, 1, 9, 7, 6, 12, 10, 8, 10, 11, 12, 7, 4, 11, 1, 11, 11, 8, 6, 9, 12, 5, 8, 3, 10, 7, 12, 12, 10, 9, 13, 11, 1, 13, 10, 3, 13, 9],
    [3, 4, 8, 8, 8, 5, 6, 6, 7, 13, 13, 13, 8, 8, 9, 9, 9, 9, 10, 11, 11, 1, 12, 13],
];
var freeReels = [
    [11, 12, 10, 9, 10, 12, 12, 13, 10, 10, 10, 4, 4, 7, 7, 13, 3, 4, 8, 9, 6, 6, 6, 9, 13, 4, 5, 13, 9, 10, 7, 8, 7, 8, 8, 8, 3, 6, 3, 1, 8, 7, 5, 11, 7, 5, 5, 5, 12, 7, 7, 13, 10, 11, 13, 5, 8, 11, 11, 11, 6, 11, 8, 8, 7, 12, 7, 13, 12, 10, 12, 12, 12, 6, 11, 9, 7, 11, 6, 8, 10, 5, 13, 13, 13, 4, 10, 13, 10, 6, 7, 12, 1, 6, 4, 4, 4, 10, 8, 12, 13, 12, 12, 5, 11, 13, 8, 9, 9, 9, 12, 13, 10, 8, 12, 8, 10, 3, 11, 7, 7, 7, 12, 8, 11, 13, 5, 10, 11, 6, 11, 11, 7],
    [8, 8, 5, 8, 8, 4, 13, 3, 8, 11, 6, 6, 13, 13, 13, 13, 9, 10, 12, 10, 12, 6, 8, 9, 11, 3, 12, 11, 11, 11, 11, 7, 12, 5, 11, 11, 6, 4, 10, 9, 13, 8, 11, 6, 6, 6, 6, 13, 8, 13, 6, 7, 9, 8, 8, 7, 10, 9, 6, 3, 8, 8, 8, 11, 11, 8, 12, 9, 12, 10, 13, 9, 12, 11, 6, 7, 9, 9, 9, 5, 11, 13, 6, 6, 13, 13, 10, 13, 1, 11, 6, 4, 7, 7, 7, 3, 8, 8, 9, 13, 11, 6, 11, 6, 11, 8, 13, 9, 10, 9],
    [9, 7, 5, 12, 1, 4, 10, 7, 9, 13, 7, 5, 10, 11, 7, 4, 11, 11, 11, 10, 11, 6, 7, 7, 11, 13, 9, 8, 7, 9, 7, 11, 5, 11, 6, 8, 7, 7, 7, 7, 7, 10, 12, 11, 4, 4, 12, 9, 12, 9, 12, 7, 3, 12, 10, 9, 4, 12, 12, 12, 10, 8, 5, 7, 5, 13, 13, 12, 8, 11, 9, 10, 4, 10, 9, 9, 4, 12, 10, 10, 10, 9, 7, 12, 12, 8, 13, 13, 5, 11, 4, 6, 9, 13, 7, 5, 6, 7, 9, 9, 9, 9, 10, 1, 12, 5, 5, 7, 12, 12, 10, 9, 6, 9, 12, 10, 5, 13, 3, 7],
    [11, 10, 12, 5, 13, 13, 5, 4, 13, 4, 5, 11, 8, 7, 10, 7, 13, 7, 13, 12, 11, 6, 5, 8, 11, 3, 10, 10, 7, 12, 7, 6, 8, 8, 9, 13, 10, 10, 10, 1, 4, 9, 6, 5, 13, 11, 13, 12, 7, 8, 9, 9, 3, 12, 10, 11, 1, 6, 11, 8, 13, 13, 8, 10, 8, 9, 6, 13, 12, 6, 8, 9, 12, 11, 8, 9, 11, 11, 11, 4, 10, 13, 10, 13, 10, 11, 9, 9, 12, 11, 3, 4, 8, 10, 9, 8, 5, 12, 11, 12, 7, 7, 12, 6, 6, 10, 3, 6, 10, 13, 10, 10, 12, 11, 3, 13, 7, 6],
    [12, 6, 5, 6, 12, 10, 7, 1, 3, 13, 12, 4, 8, 12, 5, 7, 8, 6, 13, 5, 11, 5, 8, 12, 4, 8, 5, 6, 4, 10, 10, 10, 13, 8, 6, 3, 9, 8, 11, 9, 1, 3, 8, 12, 11, 6, 6, 8, 5, 8, 10, 10, 6, 10, 9, 8, 8, 13, 7, 10, 10, 7, 8, 8, 8, 6, 5, 10, 13, 11, 12, 11, 11, 13, 11, 8, 9, 13, 12, 11, 9, 12, 11, 9, 11, 7, 6, 8, 13, 12, 4, 9, 9, 3, 12, 10, 13, 13, 13, 13, 12, 8, 11, 12, 12, 11, 4, 13, 10, 9, 9, 6, 4, 7, 7, 6, 3, 11, 5, 5, 4, 7, 11, 3, 7, 7, 13, 8, 8, 9, 9, 9, 5, 5, 6, 10, 5, 8, 3, 9, 6, 10, 13, 8, 10, 12, 10, 5, 7, 8, 6, 11, 6, 10, 7, 9, 10, 13, 9, 10, 8, 7, 4, 11],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 25, 18, 12, 10, 8, 8, 8, 5, 5, 5, 5],
    [0, 0, 125, 125, 100, 75, 40, 20, 20, 20, 12, 12, 12, 12],
    [0, 0, 600, 600, 375, 250, 150, 75, 75, 75, 50, 50, 50, 50],
];
var payLines = [
    [0, 1, 2, 3, 4], // 1
    [5, 6, 7, 8, 9], // 2
    [10, 11, 12, 13, 14], // 3
    [15, 16, 17, 18, 19], // 4
    [20, 21, 22, 23, 24], // 5
    [0, 6, 2, 8, 4], // 6
    [5, 11, 7, 13, 9], // 7
    [10, 16, 12, 18, 14], // 8
    [15, 21, 17, 23, 19], // 9
    [5, 1, 7, 3, 9], // 10
    [10, 6, 12, 8, 14], // 11
    [15, 11, 17, 13, 19], // 12
    [20, 16, 22, 18, 24], // 13
    [0, 1, 7, 3, 4], // 14
    [5, 6, 12, 8, 9], // 15
    [10, 11, 17, 13, 14], // 16
    [15, 16, 22, 18, 19], // 17
    [5, 6, 2, 8, 9], // 18
    [10, 11, 7, 13, 14], // 19
    [15, 16, 12, 18, 19], // 20
    [20, 21, 17, 23, 24], // 21
    [0, 6, 12, 8, 4], // 22
    [5, 11, 17, 13, 9], // 23
    [10, 16, 22, 18, 14], // 24
    [10, 6, 2, 8, 14], // 25
    [15, 11, 7, 13, 19], // 26
    [20, 16, 12, 18, 24], // 27
    [0, 6, 12, 18, 24], // 28
    [20, 16, 12, 8, 4], // 29
    [0, 11, 2, 13, 4], // 30
    [5, 16, 7, 18, 9], // 31
    [10, 21, 12, 23, 14], // 32
    [10, 1, 12, 3, 14], // 33
    [15, 6, 17, 8, 19], // 34
    [20, 11, 22, 13, 24], // 35
    [0, 6, 7, 8, 4], // 36
    [5, 11, 12, 13, 9], // 37
    [10, 16, 17, 18, 14], // 38
    [15, 21, 22, 23, 19], // 39
    [5, 1, 2, 3, 9], // 40
    [10, 6, 7, 8, 14], // 41
    [15, 11, 12, 13, 19], // 42
    [20, 16, 17, 18, 24], // 43
    [0, 6, 7, 8, 14], // 44
    [5, 11, 12, 13, 19], // 45
    [10, 16, 17, 18, 24], // 46
    [10, 6, 7, 8, 4], // 47
    [15, 11, 12, 13, 9], // 48
    [20, 16, 17, 18, 14], // 49
    [0, 21, 2, 23, 4], // 50
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
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
        this.view = cache.real;
        this.maskView = cache.mask;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0];
        this.maskView = [];

        //                      

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    }

    this.wildMake = GetWildMake(this.maskView, this.view);

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

        //                                       
        this.fsMore = 0;
        this.wildSize = 1;
        this.scatterTotal = 0;
        this.scatterAdd = 0;
        this.trail = "";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var freeSpinData = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = freeSpinData.real;
    this.maskView = freeSpinData.mask;
    this.fsMore = freeSpinData.fsMore;
    this.wildSize = freeSpinData.size;
    this.scatterTotal = freeSpinData.total;
    this.scatterAdd = freeSpinData.add;

    this.wildMake = GetWildMake(this.maskView, this.view);

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    if (this.fsMore > 0) {
        this.trail = `lvl${this.wildSize}~${this.fsMore}`;
        this.freeSpinLength += this.fsMore;
    }

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
    tmpWin = WinFromView(tmpCache.real, bpl);

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
    //                    
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var scatterCount = NumberOfScatters(scatterView);
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length, scatterCount);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    //                    
    var scatterView = RandomScatterView(freeReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var scatterCount = NumberOfScatters(scatterView);
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomBuyFreeViewCache(freeReels, bpl, freeSpinData.length, scatterCount, (totalBet * this.buyMulti) / 5, true);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var realView, maskView, winMoney;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var randomView, wildView;
        randomView = RandomView(reels);
        wildView = GenerateWildView(randomView);

        if (wildView.length > 0) {
            realView = wildView;
            maskView = randomView;
        } else {
            realView = randomView;
            maskView = [];
        }

        winMoney = WinFromView(realView, bpl);
        if (winMoney > bottomLimit && winMoney <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    return {
        real: realView,
        mask: maskView,
    };
};

var RandomZeroView = function (reels, bpl) {
    var realView, maskView, winMoney;

    while (true) {
        var randomView, wildView;
        randomView = RandomView(reels);
        wildView = GenerateWildView(randomView);

        if (wildView.length > 0) {
            realView = wildView;
            maskView = randomView;
        } else {
            realView = randomView;
            maskView = [];
        }

        winMoney = WinFromView(realView, bpl);
        if (winMoney == 0) {
            break;
        }
    }

    return {
        real: realView,
        mask: maskView,
    };
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

        if (NumberOfScatters(view) == 3) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, scatterCount) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = RandomBuyFreeViewCache(reels, bpl, fsLen, scatterCount);

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

var RandomBuyFreeViewCache = function (reels, bpl, fsLen, scatterCount, lowLimit = 0, isBuy = false) {
    while (true) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        var scatterTotal = scatterCount - 3; //                        
        var wildSize = 1;

        freeSpinData.viewList = [];

        while (true) {
            var fsview, fsWin, wildView, fsMore, scatterAdd;
            while (true) {
                fsMore = 0; //                                
                fsview = RandomFreeView(reels);
                wildView = GenerateWildView(fsview, wildSize);

                fsWin = WinFromView(wildView, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    //                               
                    scatterAdd = NumberOfScatters(wildView);
                    scatterTotal += scatterAdd;

                    //                              3                                       ,                       
                    if (wildSize < (isBuy ? 4 : 6) && scatterTotal == 3) {
                        scatterTotal = 0; //                  0         
                        wildSize++; //                        
                        fsMore = Util.random(1, 4); //                                         
                        freeSpinLength += fsMore;
                    }
                    break;
                }
            }

            freeSpinData.viewList.push({
                real: wildView,
                mask: fsview,
                fsMore: fsMore,
                total: scatterTotal,
                add: scatterAdd,
                size: wildSize,
            });

            freeSpinWinMoney += fsWin;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
        }

        if (freeSpinData.win > lowLimit) {
            return freeSpinData;
        }
    }
};

var RandomFreeView = function (reels) {
    var view = [];

    //                    70                   1          
    var scatterCount = Util.probability(80) ? 1 : 0;

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

        if (NumberOfScatters(view) == scatterCount) {
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

var GenerateWildView = function (view, wildSize = 0) {
    var wildView = Util.clone(view);
    var size = wildSize;

    //                 
    if (size == 0) {
        if (Util.probability(50)) {
            size = Util.random(1, 5); //                 
        }
    }

    if (size > 0) {
        var xPos = Util.random(0, slotWidth - size + 1); //                                 
        var yPos = Util.random(0, slotHeight - size + 1); //                                 

        for (var y = yPos; y < yPos + size; y++) {
            for (var x = xPos; x < xPos + size; x++) {
                var index = y * slotWidth + x;
                wildView[index] = wild;
            }
        }

        return wildView;
    } else {
        return [];
    }
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

var GetWildMake = function (maskView, wildView) {
    if (maskView.length == 0) {
        return "";
    }
    var srf = [];
    for (var i = 0; i < wildView.length; i++) {
        if (isWild(wildView[i])) {
            srf.push(`${maskView[i]}~${wild}~${i}`);
        }
    }
    return srf.join(";");
};

module.exports = SlotMachine;