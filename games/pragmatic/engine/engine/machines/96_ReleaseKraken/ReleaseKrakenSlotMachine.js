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
    //                        
    this.krakenMode = 0;    // 0                    
    this.krakenStep = 0;    // 0                 , 1                   ,
    this.krakenInd = 0;     //                              
    this.krakenLevel = 0;
    this.krakenSubLevel = 0;
    this.krakenCacheList = [];
    this.lockingMode = "";  //                                              
    this.lockingInd = 0;
    //                        
    this.wPosArr = [];
    this.wPosAddArr = [];
    //              
    this.multi = 1;
    this.totalMulti = 1;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.fsSelectInd = 0; //                                                
    this.fsCountList = [];
    this.fsSelectCache = {};
    //                              ,       ,              krakenLevel       
    this.moneyBonusWin = 0;
    this.bonusInd = 0;
    this.bonusSpinCacheList = [];

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
    this.baseWinPercent = 20;
    //             
    this.buyMulti = 100;
    this.buyPatternCount = 34;
};

var wild = 2;
var baseReels = [
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 0, 7, 9, 4, 10, 11, 11, 2, 5, 8, 8, 9, 6, 0, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10],
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 7, 9, 4, 10, 11, 11, 2, 5, 8, 8, 9, 6, 3, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10],
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 0, 7, 9, 4, 10, 11, 11, 2, 5, 8, 8, 9, 6, 0, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10],
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 7, 9, 4, 10, 11, 11, 2, 5, 8, 8, 9, 6, 3, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10],
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 7, 9, 4, 10, 13, 11, 11, 2, 5, 8, 8, 9, 6, 14, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 14, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10]
];
var freeReels = [
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 7, 9, 4, 10, 11, 11, 5, 8, 8, 9, 6, 3, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10],
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 7, 9, 4, 10, 11, 11, 5, 8, 8, 9, 6, 3, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10],
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 7, 9, 4, 10, 11, 11, 5, 8, 8, 9, 6, 3, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10],
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 7, 9, 4, 10, 11, 11, 5, 8, 8, 9, 6, 3, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10],
    [9, 11, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 8, 7, 9, 4, 10, 11, 11, 5, 8, 8, 9, 6, 3, 10, 11, 7, 5, 5, 8, 10, 6, 6, 11, 10, 9, 5, 8, 7, 7, 8, 10, 9, 9, 11, 5, 4, 4, 9, 10]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 40, 40, 20, 20, 10, 10, 5, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 100, 80, 60, 60, 20, 20, 10, 10, 0, 0, 0, 0, 0],
    [0, 0, 0, 500, 250, 200, 150, 100, 80, 80, 40, 40, 0, 0, 0, 0, 0]
];
var payLines = [
    [0, 1, 2, 3, 4],        // 1
    [15, 16, 17, 18, 19],   // 2
    [5, 6, 7, 8, 9],        // 3
    [10, 11, 12, 13, 14],   // 4
    [0, 6, 12, 8, 4],       // 5
    [15, 11, 7, 13, 19],    // 6
    [10, 6, 2, 8, 14],      // 7
    [5, 11, 17, 13, 9],     // 8
    [0, 6, 2, 8, 4],        // 9
    [15, 11, 17, 13, 19],   // 10
    [5, 1, 7, 3, 9],        // 11
    [10, 16, 12, 18, 14],   // 12
    [5, 11, 7, 13, 9],      // 13
    [10, 6, 12, 8, 14],     // 14
    [0, 6, 7, 8, 4],        // 15
    [15, 11, 12, 13, 19],   // 16
    [5, 1, 2, 3, 9],        // 17
    [10, 16, 17, 18, 14],   // 18
    [5, 11, 12, 13, 9],     // 19
    [10, 6, 7, 8, 14],      // 20
    [0, 1, 7, 3, 4],        // 21
    [15, 16, 12, 18, 19],   // 22
    [5, 6, 2, 8, 9],        // 23
    [10, 11, 17, 13, 14],   // 24
    [5, 6, 12, 8, 9],       // 25
    [10, 11, 7, 13, 14],    // 26
    [0, 1, 12, 3, 4],       // 27
    [15, 16, 7, 18, 19],    // 28
    [10, 11, 2, 13, 14],    // 29
    [5, 6, 17, 8, 9],       // 30
    [0, 11, 12, 13, 4],     // 31
    [15, 6, 7, 8, 19],      // 32
    [10, 1, 2, 3, 14],      // 33
    [5, 16, 17, 18, 14],    // 34
    [5, 1, 12, 3, 9],       // 35
    [10, 16, 7, 18, 14],    // 36
    [5, 11, 2, 13, 9],      // 37
    [10, 6, 17, 8, 14],     // 38
    [0, 11, 2, 13, 4],      // 39
    [15, 6, 17, 8, 19],     // 40
];
var bonus = 0;
var freeBonus = 14;
var chestBonus = 13;
var kraken = 15;
var infectiousKraken = 16;
var slotWidth = 5, slotHeight = 4;
var bonusMultiList = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 22, 25];
var lockingBoxValues = ["s", "c", "wc", "ws", "mc"];
var percentList = {
    randomSpinPercent: 34,
    freeWinPercent: 50,
    freeWildAddPercnet: 34,
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

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }
    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = {};

    if (this.krakenMode && this.krakenStep == 1) {       //doBonus                                  
        this.krakenStep = 2;
        this.view = this.krakenView;    //                                   ...

        if (this.krakenMode == 1) {
            this.krakenLevel = 0;
            this.krakenSubLevel = 0;
            this.multi = 1;
            this.totalMulti = 1;
            this.wPosArr = this.krakenCacheList[0].wPosArr;
            return;
        } else if (this.krakenMode == 2) {
            this.wPosArr = GetWildsFromView(this.view).wPosArr;
            this.maskView = GetMaskView(this.view, this.wPosArr);
        } else if (this.krakenMode == 3) {
            var infectedCache = GetInfectedView(this.view);

            this.view = infectedCache.view;
            this.wPosArr = infectedCache.wPosArr;
            this.iPosArr = infectedCache.iPosArr;
            this.maskView = GetMaskView(this.view, this.wPosArr);
            this.maskView = GetMaskView(this.maskView, this.iPosArr);
        }
    } else {
        viewCache = player.viewCache;
        this.krakenMode = 0;
        this.krakenCacheList = [];
    }

    if (viewCache.type == "BASE") {
        if (viewCache.krakenMode) {
            this.krakenStep = 0;
            this.krakenView = viewCache.view;
            this.krakenMode = viewCache.krakenMode;

            for (var i = 0; i < slotWidth * slotHeight; ++i) {
                this.view[i] = kraken;
            }

            if (this.krakenMode == 1) {
                this.krakenCacheList = viewCache.krakenCache;
            }
        } else {
            //                    
            this.view = viewCache.view;
        }
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.fsCountList = this.freeSpinCacheList[0].fsCountList;
        this.view = this.freeSpinCacheList[0].view;

        this.freeSpinIndex = 0;
        this.freeSpinLength = 0;
        this.krakenLevel = 0;
        this.freeSpinWinMoney = 0;

        this.fsSelectCache = {
            status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wins_mask: ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h'],
            wins: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        this.currentGame = "FREE";
    }

    if (viewCache.type == "BONUS") {
        this.bonusSpinCacheList = viewCache.view;
        this.view = this.bonusSpinCacheList[0];
        this.krakenLevel = 1;
        this.krakenSubLevel = 0;
        this.totalMulti = 0;

        this.currentGame = "BONUS";
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                        
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex++].view;
    this.wPosArr = GetWildsFromView(this.view).wPosArr;
    this.maskView = GetMaskView(this.view, this.wPosArr);
    this.totalMulti = this.wPosArr.length + 1;

    this.winMoney = WinFromView(this.view, player.betPerLine, 1, this.totalMulti); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine, 1, this.totalMulti); //                                        

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex >= this.freeSpinCacheList.length) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;

    if (this.krakenMode) {
        if (this.krakenStep == 0) {
            this.krakenStep = 1;
            this.krakenInd = Number(param.ind);
            return;
        }
        //                                         ...
        if (this.krakenSubLevel == 0) {
            var cache = this.krakenCacheList[this.krakenLevel + 1];     //                                              0                   ..                                                           +1...

            this.krakenSubLevel = 1;
            this.lockingMode = cache.lockingMode;
            this.lockingInd = Number(param.ind);
            this.multi = 1;

            if (cache.multi) {
                this.multi = cache.multi;
                this.totalMulti *= this.multi;
            }

            if (cache.wPosArr) {
                this.wPosAddArr = cache.wPosArr;
                this.wPosArr = this.wPosArr.concat(this.wPosAddArr);
                this.view = GetWildAddedView(this.view, this.wPosAddArr);
            }

            if (this.lockingMode.includes('c')) {
                this.moneyBonusWin = WinFromView(this.view, player.betPerLine) * this.totalMulti;
                this.winMoney = this.moneyBonusWin;
                this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                        
                this.krakenStep = 3;
            }
        } else {
            this.krakenSubLevel = 0;
            this.krakenLevel++;
        }
        return;
    }

    if (this.currentGame == "FREE") {
        this.fsSelectInd = Number(param.ind);
        var spinAddCount = this.fsCountList[this.krakenLevel++];
        this.freeSpinLength += spinAddCount;

        this.fsSelectCache.status[this.fsSelectInd] = this.krakenLevel;
        this.fsSelectCache.wins_mask[this.fsSelectInd] = "nff";
        this.fsSelectCache.wins[this.fsSelectInd] = spinAddCount;

        if (this.krakenLevel >= this.fsCountList.length) {
            this.fsSelectCache.wins_mask[this.fsSelectInd] = "np_fn";
            this.fsSelectCache.wins[this.fsSelectInd] = 1;
            this.freeSpinIndex = 1;
        }
        return;
    }
    //                          
    if (this.krakenSubLevel == 0) {
        this.krakenSubLevel = 1;
        this.bonusInd = Number(param.ind);

        if (this.krakenLevel < this.bonusSpinCacheList.length) {
            this.multi = this.bonusSpinCacheList[this.krakenLevel];
            this.totalMulti += this.multi;
        } else {
            this.moneyBonusWin = this.totalMulti * player.betPerLine * this.lineCount;
            this.winMoney = this.moneyBonusWin;
            this.multi = 0;
            this.currentGame = "BASE";
        }

    } else {
        this.krakenSubLevel = 0;
        this.krakenLevel++;
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {};
    var tmpView, tmpWin = 0;
    //                            [      ] *                                                             ~~                 .

    if (baseWin >= 0) {
        if (baseWin > totalBet * 12 && Util.probability(percentList.randomSpinPercent)) {
            var ksCache = RandomKrakenViewCache(freeReels, bpl, baseWin);

            tmpView = ksCache.view;
            tmpWin = ksCache.win;
            pattern.krakenMode = ksCache.mode;

            if (pattern.krakenMode == 1) {
                pattern.krakenCache = ksCache.cache;
            }
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin);
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCountCache = RandomFreeViewCounts();
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCountCache.len);

    freeSpinCacheList.push({
        fsCountList: fsCountCache.cache,
        view: scatterView
    });

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusViewCacheList = [];
    var bonusView = RandomBonusView(baseReels, bpl);
    var bsCache = RandomBonusViewCache(baseReels, bpl, bsWin, totalBet);

    bonusViewCacheList.push(bonusView);

    var pattern = {
        view: bonusViewCacheList.concat(bsCache.cache),
        bpl: bpl,
        win: bsCache.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinCacheList = [];
    var scatterView = RandomScatterView(baseReels, bpl, true);
    var fsCountCache = RandomFreeViewCounts(1);
    var fsCache = BuyBonusViewCache(freeReels, bpl, fsCountCache.len);

    freeSpinCacheList.push({
        fsCountList: fsCountCache.cache,
        view: scatterView
    });

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: "FREE",
        isCall: 0
    };
    return pattern;
}

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
        if (!isFreeSpinWin(view) && !isBonusSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl, isBuy = false) {
    if (isBuy) {
        return [8, 9, 4, 7, 9, 0, 6, 10, 10, 14, 11, 6, 0, 3, 11, 5, 10, 9, 11, 6];
    }

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
        //                                                                                      .
        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0) {
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

var BuyBonusViewCache = function (reels, bpl, fsLen) {
    var freeSpinCacheList = [];
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var tmpView;
    var wildCnt = 0;

    while (freeSpinIndex <= freeSpinLength) {
        while (true) {
            tmpView = RandomView(reels);
            tmpWin = WinFromView(tmpView, bpl, 1, 1);

            if (Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                break;
            }
        }

        if (Util.probability(percentList.freeWildAddPercnet) && wildCnt < 10) {
            ++wildCnt;
        }

        var randomPosArray = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight);

        for (var i = 0; i < wildCnt; ++i) {
            tmpView[randomPosArray.shift()] = wild;
        }

        freeSpinCacheList.push({
            view: tmpView
        });

        tmpWin = WinFromView(tmpView, bpl, 1, 1 + wildCnt);
        freeSpinTotalWin += tmpWin;

        freeSpinIndex++;
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
    }
};

var RandomBonusView = function (reels, bpl) {
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
        //                                                                                         .
        if (isBonusSpinWin(view) && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin, totalBet) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;
    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var bonusSpinData = {};
        var bonusSpinCacheList = []; //                
        var bonusSpinLength = Util.random(4, 12);
        var bonusSpinIndex = 0; //                                    
        var totalMulti = 0;

        while (bonusSpinIndex < bonusSpinLength) {
            var multi = bonusMultiList[Util.random(0, bonusMultiList.length)];

            totalMulti += multi;
            bonusSpinCacheList.push(multi);
            bonusSpinIndex++;
        }

        bonusSpinData = {
            win: totalMulti * totalBet,
            cache: bonusSpinCacheList
        };

        if (bonusSpinData.win >= minMoney && bonusSpinData.win <= maxMoney) {
            return bonusSpinData;
        }

        if (bonusSpinData.win > lowerLimit && bonusSpinData.win < minMoney) {
            lowerLimit = bonusSpinData.win;
            lowerView = bonusSpinData;
        }
        if (bonusSpinData.win > maxMoney && bonusSpinData.win < upperLimit) {
            upperLimit = bonusSpinData.win;
            upperView = bonusSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var GetInfectedView = function (view) {
    var iView = [...view];
    var steps = [{ h: 1, v: 0 }, { h: -1, v: 0 }, { h: 0, v: 1 }, { h: 0, v: -1 }];

    var wPosArr = [];
    var infectedPosArr = [];

    for (var i = 0; i < slotWidth; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = i + j * slotWidth;

            if (isWild(view[pos])) {
                iView[pos] = infectiousKraken;
                wPosArr.push(pos);

                for (var k = 0; k < 4; ++k) {
                    var ii = i + steps[k].h;
                    var ij = j + steps[k].v;
                    var iPos = ii + ij * slotWidth;

                    if (ii >= 0 && ii < slotWidth && ij >= 0 && ij < slotHeight && !isWild(view[iPos])) {
                        iView[iPos] = wild;
                        infectedPosArr.push(iPos);
                    }
                }
            }
        }
    }

    return {
        view: iView,
        wPosArr: wPosArr,
        iPosArr: infectedPosArr
    };
};

var SetWildsToView = function (view) {
    var wCnt = Util.random(1, 3);
    var wPosArr = [];

    if (GetWildsFromView(view).wCnt > 12) {
        wCnt = 0;
    }

    for (var i = 0; i < wCnt; ++i) {
        var pos = 0;

        while (true) {
            pos = Util.random(0, slotWidth * slotHeight);

            if (!isWild(view[pos])) {
                break;
            }
        }

        view[pos] = wild;
        wPosArr.push(pos);
    }

    return wPosArr;
};

var RandomKrakenViewCache = function (reels, bpl, maxWin, step = 0) {
    var krakenSpinData = {};

    var mode = Util.random(1, 4);

    var tmpView = RandomView(reels);
    var tmpWin = 0;

    if (mode == 1) {
        var wPosArr = SetWildsToView(tmpView);
        var finalView = [...tmpView];
        var ksCacheList = [];

        ksCacheList.push({
            wPosArr: wPosArr,
        });

        //                                            
        while (true) {
            var lockingMode = lockingBoxValues[Util.random(0, lockingBoxValues.length)];

            var ksCache = {
                lockingMode: lockingMode
            }
            var totalMulti = 1;

            if (lockingMode.includes('w')) {
                var wPosArr = SetWildsToView(finalView);

                ksCache.wPosArr = wPosArr;
            }

            if (lockingMode.includes('m')) {
                ksCache.multi = 2;
                totalMulti *= 2;
            }

            ksCacheList.push(ksCache);

            if (lockingMode.endsWith('c')) {
                tmpWin = WinFromView(finalView, bpl) * totalMulti;
                break;
            }
        }

        krakenSpinData.cache = ksCacheList;
    } else if (mode == 2) {
        var si = Util.random(0, slotWidth - 1);
        var sj = Util.random(0, slotHeight);
        //                                             
        for (var i = 0; i < 3; ++i) {
            for (j = 0; j < 4; ++j) {
                if (si + i < slotWidth && sj + j < slotHeight) {
                    tmpView[si + i + (sj + j) * slotWidth] = wild;
                }
            }
        }

        tmpWin = WinFromView(tmpView, bpl);
    } else if (mode == 3) {
        var wildCnt = Util.random(1, 4);
        var randomPosArray = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight);
        //                                   
        for (var i = 0; i < wildCnt; ++i) {
            tmpView[randomPosArray.shift()] = wild;
        }

        var finalView = GetInfectedView(tmpView).view;

        tmpWin = WinFromView(finalView, bpl);
    }

    krakenSpinData.view = tmpView;
    krakenSpinData.win = tmpWin;
    krakenSpinData.mode = mode;

    if (tmpWin <= maxWin) {
        return krakenSpinData;
    } else if (step > 100) {
        return RandomKrakenViewCache(reels, bpl, 100000000000000, step + 1);
    } else {
        return RandomKrakenViewCache(reels, bpl, maxWin, step + 1);
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

var WinFromView = function (view, bpl, isFreeSpin = 0, multi = 1) {
    var money = 0;
    var payLineLength = isFreeSpin ? 40 : 20;

    for (var lineId = 0; lineId < payLineLength; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay * multi;
    }
    return money;
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

    return payTable[matchCount][symbol] * bpl;
};

var WinLinesFromView = function (view, bpl, isFreeSpin = 0, multi = 1) {
    var winLines = [];
    var payLineLength = isFreeSpin ? 40 : 20;

    for (var lineId = 0; lineId < payLineLength; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl) * multi;
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var RandomFreeViewCounts = function (isBuy = 0) {
    var totalCount = 0;
    var res = [];
    var limitCount = Util.random(isBuy ? 9 : 5, isBuy ? 13 : 9);

    while (totalCount < limitCount) {
        var cnt = Util.random(1, isBuy ? 4 : 3);

        if (totalCount + cnt > limitCount) {
            cnt = limitCount - totalCount;
        }

        res.push(cnt);
        totalCount += cnt;
    }

    res.push(0);

    return {
        cache: res,
        len: totalCount
    };
};

var GetMaskView = function (view, wPosArr) {
    var res = [...view];

    for (var i = 0; i < wPosArr; ++i) {
        res[wPosArr[i]] = Util.random(3, 12);
    }

    return res;
};

var GetWildAddedView = function (view, wPosAddArr) {
    var res = [...view];

    for (var i = 0; i < wPosAddArr.length; ++i) {
        res[wPosAddArr[i]] = wild;
    }

    return res;
};

var GetWildsFromView = function (view) {
    var wPosArr = [];
    var cnt = 0;

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            wPosArr.push(i);
            ++cnt;
        }
    }

    return {
        wPosArr: wPosArr,
        wCnt: cnt
    }

};

var isWild = function (symbol) {
    return symbol == wild || symbol == infectiousKraken;
};

var isBonusWin = function (view, modeSymbol) {
    var bonusCnt = 0;
    var hasModeBonus = false;

    for (var j = 0; j < slotHeight; ++j) {
        for (var i = 0; i < slotWidth; ++i) {
            var pos = i + slotWidth * j;

            if (view[pos] == bonus) {
                ++bonusCnt;
            } else if (view[pos] == modeSymbol) {
                hasModeBonus = true;
            }
        }
    }

    return bonusCnt == 2 && hasModeBonus;
};

var isFreeSpinWin = function (view) {
    return isBonusWin(view, freeBonus);
};

var isBonusSpinWin = function (view) {
    return isBonusWin(view, chestBonus);
}

module.exports = SlotMachine;