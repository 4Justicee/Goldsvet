var Util = require('../../../utils/slot_utils');

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
    this.moneyCache = {};

    //bonusType     0                    1                      , 2             , 3                      
    this.bonusType = 0;
    this.param_ind;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.isFreeSpinAdd = 0;
    //                        
    this.moneyBonusWin = 0;
    this.moneyCacheIndex = 0;
    this.moneyBonusLength = 6;
    this.moneyBonusCacheList = [];
    this.moneyBonusCache = {};

    this.moneyBonusMultiIndex = 0;
    this.moneyBonusMulti = 0;
    this.moneyBonusCacheIndex = 0;
    //                    
    this.jackpotCache = [];
    this.jackpotLevel = 0;
    this.diamondCache = [];

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var slotWidth = 5;
var slotHeight = 3;
var wild = 2, freeWild = 15;
var moneySymbol = 14;
var respinSymbol = 16;
var emptySymbol = 17;
var winLines = [];
var baseReels = [
    [11, 8, 8, 3, 9, 5, 7, 5, 3, 3, 3, 4, 10, 6, 3, 4, 4, 8, 8, 10, 6, 11, 7, 11, 6, 14, 14, 14, 10, 6, 3, 11, 7, 12, 6, 13, 4, 4, 4],
    [14, 14, 14, 11, 3, 2, 11, 5, 10, 13, 3, 3, 13, 9, 3, 3, 13, 9, 7, 5, 13, 6, 13, 2, 3, 4, 4, 6, 9, 2, 12, 8],
    [3, 13, 9, 7, 9, 8, 14, 14, 4, 13, 12, 12, 5, 10, 12, 13, 8, 6, 2, 4, 4, 4, 5, 5, 12, 5, 11, 5, 2, 11, 11, 10, 6, 3, 12, 7, 8, 8],
    [5, 11, 4, 14, 14, 10, 7, 13, 3, 14, 14, 13, 13, 8, 4, 5, 5, 13, 4, 9, 5, 11, 5, 10, 9, 4, 10, 2, 12, 9, 9, 6, 8, 9, 2, 10],
    [8, 6, 6, 9, 4, 7, 9, 9, 6, 9, 8, 14, 14, 9, 10, 5, 13, 4, 9, 3, 11, 10, 5, 9, 5, 10, 9, 11, 5, 14, 14, 3, 5, 9, 4, 9, 3, 11, 3, 13, 4, 6, 6, 14, 14, 12]
];
var freeReels = [
    [3, 7, 3, 3, 3, 6, 3, 5, 4, 7, 7, 4, 5, 5, 3, 3, 5, 5, 3, 6, 6, 7, 3, 4, 4, 4, 4, 7, 6, 3, 4, 6, 4, 3, 5, 6, 4, 4, 4, 3, 7, 4, 4, 7, 6, 5, 5, 5, 3],
    [5, 7, 4, 6, 5, 5, 3, 6, 6, 3, 3, 6, 6, 4, 6, 3, 15, 4, 7, 6, 6, 6, 5, 5, 5, 4, 6, 7, 5, 6, 4, 4, 3, 7, 4, 4, 3, 7, 3],
    [4, 6, 5, 5, 5, 7, 7, 7, 3, 3, 5, 4, 5, 15, 4, 5, 7, 3, 7, 4, 4, 5, 5, 3, 7, 4, 3, 3, 7, 3, 7, 7, 5, 3, 7, 7, 7, 6, 7, 6],
    [6, 6, 4, 4, 4, 4, 7, 5, 6, 4, 6, 3, 15, 6, 6, 5, 5, 5, 4, 6, 4, 7, 3, 7, 4, 6, 4, 4, 3, 4, 7, 4, 7, 3, 4, 5, 6, 7, 6, 4, 5],
    [5, 4, 3, 3, 3, 6, 6, 5, 7, 6, 6, 3, 4, 5, 5, 5, 6, 3, 7, 7, 6, 6, 6, 5, 6, 4, 5, 4, 3, 6, 5, 7, 7, 7, 7, 6, 6, 6, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 30, 25, 20, 15, 15, 12, 12, 8, 8, 8, 8, 0, 0, 0, 0],
    [0, 0, 0, 50, 30, 30, 25, 20, 15, 15, 12, 12, 12, 12, 0, 0, 0, 0],
    [0, 0, 0, 150, 100, 75, 60, 50, 25, 25, 20, 20, 20, 20, 0, 0, 0, 0]
];
var moneyValueList = [8, 18, 28, 38, 58, 68, 78, 88, 118, 138, 188, 238, 288, 588, 888, 1888];
var moneyBagTypeArray = ['mo1', 'mo1', 'mo1', 'mo2', 'mo2',];
var jackpots = [1000, 100, 50, 25];
var freeSpinCount = 6;
var percentList = {
    freeWinPercent: 50,
    moneyJackpotPercent: 5,
    moneyHighPercent: 7,
    moneyMediumPercent: 10,
    moneyLowPercent: 20,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
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

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }

    if (viewCache.type == "FREE") {
        this.spinCache = viewCache.view;
        this.view = this.spinCache[0].view;
        this.bonusType = viewCache.bonusType;

        if (viewCache.bonusType == 0)
            this.moneyCache = RandomMoneySymbols(this.view);
        else
            this.moneyCache = this.spinCache[0].moneyCache;

        this.currentGame = "BONUS";
    }
    else {
        this.moneyCache = RandomMoneySymbols(this.view);
    }

    if (viewCache.type == "BONUS") {
        this.bonusType = viewCache.bonusType;

        this.view = viewCache.view;
        this.jackpotLevel = 0;
        this.diamondCache = viewCache.cache;
        this.jackpotCache = [];
        this.jackpotCache[0] = JackpotFirstCache();
        this.currentGame = "BONUS";
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "FREE") {
        this.freeSpinWinMoney = this.winMoney;
    }
    if (viewCache.type == "BONUS") {
        this.moneyBonusWin = this.winMoney;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;

    if (isFreeSpinWin(this.view)) {
        this.freeSpinLength += freeSpinCount;
        this.isFreeSpinAdd = 1;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinCacheList.length - 1) {
        this.currentGame = "BASE";
        return;
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;

    if (this.bonusType == 0) {    //                  
        this.param_ind = Number(param.ind);
        this.freeSpinCacheList = this.spinCache;

        this.freeSpinLength = freeSpinCount;
        this.view = this.freeSpinCacheList[0].view;
        this.moneyCache = RandomMoneySymbols(this.view);
        this.freeSpinIndex = 1;
        this.currentGame = "FREE";
    } else if (this.bonusType == 1) {
        //                         
        this.param_ind = Number(param.ind);
        this.moneyBonusCacheList = this.spinCache;
        // this.freeSpinLength = cache.length;

        var firstCache = this.moneyBonusCacheList[0];

        this.view = firstCache.view;
        this.moneyCache = firstCache.moneyCache;

        this.moneyCacheIndex = 1;
        this.moneyBonusLength = freeSpinCount;
        this.moneyBonusWin = MoneyWinFromCache(this.moneyCache, player.betPerLine);
    } else if (this.bonusType == 3) {
        //               
        var cache = this.moneyBonusCacheList[this.moneyCacheIndex];
        this.moneyBonusCache = cache;

        this.view = cache.view;
        this.moneyCache = cache.moneyCache;

        this.moneyBonusLength += NumberOfRespinSymbols(this.view);

        this.moneyBonusWin = MoneyWinFromCache(cache.moneyCache, player.betPerLine);

        this.moneyCacheIndex++;
        if (this.moneyCacheIndex >= this.moneyBonusCacheList.length) {
            this.winMoney = this.moneyBonusWin;
            this.currentGame = "BASE";
        }
    } else if (this.bonusType == 2) {
        //                  
        var select = param.ind;
        var index = this.jackpotLevel++;
        var status = this.jackpotCache[index].status;
        var wins_mask = this.jackpotCache[index].wins_mask;
        var wins = this.jackpotCache[index].wins;

        this.winMoney = 0;

        status[select] = this.jackpotLevel;
        wins_mask[select] = "pw";
        wins[select] = this.diamondCache[index];

        var jackpotObj = {
            status: status,
            wins_mask: wins_mask,
            wins: wins
        };

        this.jackpotCache.push(jackpotObj);

        if (this.jackpotLevel >= this.diamondCache.length) {
            //                    
            this.bonusWin = JackpotMoneyFromCache(this.diamondCache, player.betPerLine * this.lineCount);
            this.winMoney = this.bonusWin;
            this.moneyBonusWin = this.bonusWin + WinFromView(this.view, player.betPerLine);
            this.currentGame = "BASE";
        }
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    //                            [      ] *                                                             ~~                 .

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
        bpl: bpl
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
            if (Util.probability(50))
                return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
            else
                return this.SpinForRespinGen(bpl, totalBet, jpWin, isCall);
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var scatterView = RandomScatterView(baseReels, bpl);

    freeSpinCacheList.push({
        view: scatterView,
    });
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinCount);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: "FREE",
        bonusType: 0,
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForRespinGen = function (bpl, totalBet, rsWin, isCall = false) {
    var bsCache = RandomRespinViewCache(baseReels, rsWin, bpl, isCall);
    var win = bsCache.win;

    var pattern = {
        view: bsCache.cache,
        bpl: bpl,
        win: win,
        type: "FREE",
        bonusType: 1,
        isCall: isCall ? 1 : 0,
    };

    return pattern;
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var jackpotView = RandomJackpotView(baseReels, bpl);
    var jackpotWin = WinFromView(jackpotView, bpl);
    var diamondCache = JackpotRandomCache(totalBet, bsWin - jackpotWin);

    var pattern = {
        view: jackpotView,
        bpl: bpl,
        cache: diamondCache,
        win: jackpotWin + JackpotMoneyFromCache(diamondCache, totalBet),
        type: "BONUS",
        bonusType: 2,
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
        if (!isFreeSpinWin(view))
            break;
    }
    return view;
};

var RandomScatterView = function (reels, bpl) {
    var view = [];

    while (true) {
        view = RandomView(reels);
        if (WinFromView(view, bpl) == 0 && NumberOfMoneySymbols(view) == 0)
            break;
    }

    var posistions = [];

    for (var i = 0; i < view.length; ++i)
        posistions.push(i);

    Util.shuffle(posistions);

    for (var i = 0; i < 6; i++) {
        var pos = posistions[i];
        view[pos] = moneySymbol;
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
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (freeSpinIndex <= freeSpinLength) {
            while (true) {
                tmpView = RandomView(reels);
                tmpWin = WinFromView(tmpView, bpl);
                if (Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                    break;
                }
            }

            var cache = {
                view: tmpView,
            }

            freeSpinCacheList.push(cache);
            freeSpinTotalWin += tmpWin;

            freeSpinIndex++;
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin,
        };


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

var RandomRespinViewCache = function (reels, bsWin, bpl, isCall) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;
    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var moneyBonusCacheList = []; //                
        var moneyBonusIndex = 0; //                                    
        var moneyBonusLength = freeSpinCount;

        var isRespinAdd = false;
        var tmpView = [];
        var moneyCache = DefaultMoneyCache(); //                  

        while (true) {
            tmpView = RandomView(reels);
            if (WinFromView(tmpView, bpl) == 0 && NumberOfMoneySymbols(tmpView) == 0) {
                break;
            }
        }

        var randomPosArray = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight); //                                      
        var pos = 0; //randomPosArray[i], multied                                               

        moneyWinCount = Util.random(6, 8);

        for (var i = 0; i < moneyWinCount; i++) {
            pos = randomPosArray.shift();
            tmpView[pos] = moneySymbol;
            moneyCache.table[pos] = 'v';
            moneyCache.values[pos] = moneyValueList[Util.random(0, moneyValueList.length / 4)];
        }

        var currentMulti = moneyCache.values.reduce((total, value) => total + value, 0);

        moneyBonusCacheList.push({
            count: 0,
            view: tmpView,
            moneyCache: {
                values: [...moneyCache.values],
                table: [...moneyCache.table],
            },
        })

        while (moneyBonusIndex < moneyBonusLength) {
            lastCache = moneyBonusCacheList[moneyBonusCacheList.length - 1];
            tmpView = Util.clone(lastCache.view);
            moneyCache = {
                values: [...moneyCache.values],
                table: [...moneyCache.table]
            };

            //                                                                
            for (var i = 0; moneyBonusIndex == 0 && i < tmpView.length; ++i)
                if (!isMoney(tmpView[i])) {
                    tmpView[i] = emptySymbol;
                }

            if (isRespinAdd) {
                isRespinAdd = false;
                tmpView[pos] = emptySymbol;    //                                       ...
            }

            moneyBonusIndex++;

            if (randomPosArray.length > 1) {      //                                     
                if (Util.probability(34)) {
                    pos = randomPosArray.shift();

                    moneyCache.table[pos] = moneyBagTypeArray[Util.random(0, moneyBagTypeArray.length)];

                    if (moneyCache.table[pos] == "mo1")
                        moneyCache.values[pos] = currentMulti;
                    else
                        moneyCache.values[pos] = moneyCache.values.reduce((total, value) => total + value, 0);

                    tmpView[pos] = moneySymbol;
                } else if (Util.probability(12)) {
                    ++moneyBonusLength;

                    pos = randomPosArray[Util.random(1, randomPosArray.length)];
                    isRespinAdd = true;
                    tmpView[pos] = respinSymbol;
                }
            }

            moneyBonusCacheList.push({
                count: moneyBonusIndex,
                view: tmpView,
                moneyCache: moneyCache
            });
        }

        var moneyBonusData = {
            win: moneyCache.values.reduce((total, value) => total + value, 0) * bpl,
            cache: moneyBonusCacheList
        };

        if (moneyBonusData.win >= minMoney && moneyBonusData.win <= maxMoney) {
            return moneyBonusData;
        }

        if (moneyBonusData.win > lowerLimit && moneyBonusData.win < minMoney) {
            lowerLimit = moneyBonusData.win;
            lowerView = moneyBonusData;
        }
        if (moneyBonusData.win > maxMoney && moneyBonusData.win < upperLimit) {
            upperLimit = moneyBonusData.win;
            upperView = moneyBonusData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var RandomJackpotView = function (reels, bpl) {
    var view = [];

    while (true) {
        view = RandomView(reels);

        if (NumberOfWilds(view) > 0)
            break;
    }

    return view;
};

var JackpotRandomCache = function (totalBet, targetMoney) {
    var targetJackpot = jackpots[jackpots.length - 1];

    for (var i = 0; i < jackpots.length; i++) {
        if (targetMoney >= totalBet * jackpots[i]) {
            targetJackpot = jackpots[i];
            break;
        }
    }

    //                              
    var diamondCache = [];
    for (var i = 0; i < jackpots.length; i++) {
        if (jackpots[i] == targetJackpot) {
            continue;
        }
        var count = Util.random(0, 3);
        for (var j = 0; j < count; j++) {
            diamondCache.push(jackpots[i]);
        }
    }
    for (var j = 0; j < 2; j++) {
        diamondCache.push(targetJackpot);
    }
    Util.shuffle(diamondCache);
    diamondCache.push(targetJackpot);
    return diamondCache;
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

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    var winMoney = 0;

    //                                                             
    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId];
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
        var matchCount = 0;
        for (var i = 0; i < history.length; i++) {
            if (history[i] >= 0) {
                matchCount++;
            }
        }
        var money = bpl * payTable[matchCount][symbolId];
        if (money > 0) {
            var lineResult = [];
            for (var i = 0; i < history.length; i++) {
                if (history[i] < 0) {
                    break;
                }
                lineResult.push(history[i]);
            }
            winLines.push(`0~${money}~${lineResult.join('~')}`);
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
    return symbol == wild || symbol == freeWild;
};

var isFreeSpinWin = function (view) {
    return NumberOfMoneySymbols(view) >= 6;
};

var DefaultMoneyCache = function () {
    var moneyValues = [];
    var moneyTable = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyValues[i] = 0;
        moneyTable[i] = "r";
    }

    var result = {
        values: moneyValues,
        table: moneyTable,
    };
    return result;
};

var isMoney = function (symbol) {
    return symbol == moneySymbol;
};

var isRespin = function (symbol) {
    return symbol == respinSymbol;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;

    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
            result++;
        }
    }

    return result;
};

var NumberOfRespinSymbols = function (view) {
    var result = 0;

    for (var i = 0; i < view.length; i++) {
        if (isRespin(view[i])) {
            result++;
        }
    }

    return result;
};

var RandomMoneyFromArr = function (moneyValueList, isBonus = 1) {
    var value = moneyValueList[0];

    if (Util.probability(percentList.moneyJackpotPercent) && isBonus) {
        value = moneyValueList[Util.random(0, moneyValueList.length)];
    } else
        if (Util.probability(percentList.moneyHighPercent) && isBonus) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 2)];
        } else if (Util.probability(percentList.moneyMediumPercent)) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 3)];
        } else if (Util.probability(percentList.moneyLowPercent)) {
            value = moneyValueList[Util.random(0, moneyValueList.length / 4)];
        }

    return value;
};

var RandomMoneySymbols = function (view) {
    var values = [];
    for (var i = 0; i < view.length; i++) {
        if (!isMoney(view[i])) {
            values[i] = 0;
            continue;
        }
        values[i] = RandomMoneyFromArr(moneyValueList, 0);
    }

    var table = GetTableFromValues(values);
    return { table, values };
};

var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        if (moneyCache.table[i] != "m")
            win += moneyCache.values[i];
    }
    return win * bpl;
};

var GetTableFromValues = function (values) {
    var table = [];
    for (var i = 0; i < values.length; i++) {
        table[i] = tableFromValue(values[i])
    }
    return table;
};

var tableFromValue = function (value) {
    switch (Number(value)) {
        case 25000: return "jp1";
        case 2500: return "jp2";
        case 1250: return "jp3";
        case 625: return "jp4";
        case 0: return "r";
    }
    return "v";
};

var JackpotMoneyFromCache = function (cache, totalBet) {
    var len = cache.length;
    return cache[len - 1] * totalBet;
};

var JackpotFirstCache = function () {
    var status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var wins_mask = ["h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h"];
    var wins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var firstJackpot = {
        status: status,
        wins_mask: wins_mask,
        wins: wins
    };

    return firstJackpot;
}

module.exports = SlotMachine;