var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                
    this.cp = 0;
    this.greenCnt = 0;
    //                        
    this.bonusSpinCacheList = [];
    this.bonusMode = 0;
    this.bonusSpinLevel = 0;
    this.bonusSubLevel = 0;
    this.bonusInd = 0;
    this.bonusSpinCache = [];
    this.bonusSpinLength = 0;
    this.miniView = [];
    this.moneyBonusWin = 0;
    //                     
    this.miniSpinCacheList = [];
    this.miniSlotList = [];
    this.miniViewCache = [];
    this.isMiniSpin = 0;
    this.miniSpinIndex = 0;
    this.miniSpinLength = 0;
    this.freeSpinWinMoney = 0;
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];   //FREE, BONUS, TUMBLE
};

var wild = 2, slotWidth = 5, slotHeight = 3;
var eliminator = 9;
var rainbow = 10;
var mapLocationList = [5, 6, 7, 8, 1, 9, 10, 11, 12, 13, 1, 14, 15, 16, 18, 20, 1, 22, 25, 30, 40, 50];
var miniLocations = [4, 10, 16];  //mapLocationList              1             
var rainbowLevelLimit = 6;
var percentList = {
    miniWinPercent: 68,
    manyScatterPercent: 22,
    rainbowWinPercent: 68,
    miniLocationPercent: 34
};
var baseReels = [
    [9, 4, 3, 3, 3, 7, 6, 3, 10, 5, 8, 2, 7, 6, 3, 7, 2, 5, 3, 2, 7, 6, 7, 3, 7, 4, 5, 7, 3, 7, 3, 6, 7, 3, 4, 7, 3, 2, 4, 8, 5, 4, 3, 4, 2],
    [8, 4, 6, 7, 3, 9, 3, 3, 3, 2, 5, 10, 2, 2, 2, 3, 6, 10, 3, 2, 3, 10, 5, 3, 10, 2, 3, 6, 3, 4, 3, 6, 2, 5, 10, 3, 9, 7, 4, 5, 3, 6, 9, 10, 3, 5, 2, 3, 10, 7, 2, 3, 10, 6, 5, 3, 10, 6, 3, 3, 5, 2, 4, 2, 10, 3, 9],
    [3, 3, 3, 9, 10, 5, 4, 3, 7, 6, 4, 7, 10, 9, 6, 7, 6, 4, 7, 6, 6, 9, 4, 10, 7, 6, 4, 10, 4, 7, 6, 10, 6, 7, 4, 6, 7],
    [10, 3, 3, 3, 3, 9, 8, 4, 5, 2, 6, 7, 10, 3, 7, 6, 3, 7, 2, 8, 7, 6, 8, 7, 3, 5, 3, 10, 4, 3, 9, 6, 8, 3, 8, 6, 8, 8, 7, 3, 9, 6, 3, 7, 9, 4, 5, 9, 5, 4, 7, 2, 8, 7, 8, 3],
    [10, 3, 3, 3, 5, 7, 4, 9, 3, 8, 6, 2, 3, 4, 3, 10, 8, 3, 7, 8, 9, 7, 8, 3, 4, 9, 3, 4, 8, 7, 8, 3, 4, 2, 3, 8, 4, 3]
];
var miniReels = [
    [11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14],
    [12, 12, 12, 13, 13, 13, 14, 12, 14, 11, 11, 11, 11, 11],
    [13, 13, 13, 14, 14, 11, 11, 11, 12, 11, 11, 12, 12, 12]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 20, 20, 10, 10, 10],
    [0, 0, 300, 100, 100, 20, 20, 20],
    [0, 0, 500, 300, 300, 200, 200, 200]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],     // 3
    [0, 6, 12, 8, 4],         // 4
    [10, 6, 2, 8, 14],        // 5
    [5, 1, 7, 13, 9],         // 6
    [0, 1, 7, 13, 14],        // 7
    [10, 11, 7, 3, 4],        // 8
    [0, 6, 7, 8, 14],         // 9
    [10, 6, 7, 8, 4],         // 10
    [5, 11, 7, 4, 9],         // 11
    [5, 1, 2, 8, 14],         // 12
    [5, 6, 2, 8, 14],         // 13
    [5, 6, 12, 8, 4],         // 14
    [0, 1, 2, 8, 14],         // 15
    [0, 1, 7, 13, 9],         // 16
    [10, 11, 7, 3, 9],        // 17
    [5, 1, 7, 13, 14],        // 18
    [10, 11, 7, 3, 4],        // 19
    [5, 11, 12, 8, 4],        // 20
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 15; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player, param) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    this.cp = (this.cp + 1) % 16;

    if (this.currentGame == "BONUS") {
        this.BonusSpin(player, param);
        return;
    }

    if (this.currentGame == "FREE") {
        this.MiniSpin(player);
        return;
    }

    this.miniSpinIndex = 0;

    var viewCache = player.viewCache;

    if (viewCache.type == "BONUS") {
        this.bonusSpinCacheList = viewCache.view;
        this.view = this.bonusSpinCacheList[0].view;
        this.bonusMode = this.bonusSpinCacheList[0].mode;
        this.moneyBonusWin = 0;
        this.bonusSpinLevel = 0;
        this.bonusSubLevel = 0
        this.bonusSpinLength = this.bonusSpinCacheList.length;

        if (this.bonusMode == 1) {
            this.bonusSpinCache = {
                status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                whi: 0,
                wi: -1
            };
        } else if (this.bonusMode == 2) {
            var nScatters = NumberOfScatters(this.view, eliminator);

            this.bonusSpinCache = {
                status: [],
                wins: [],
                wins_mask: []
            };

            for (var i = 0; i < nScatters; ++i) {
                this.bonusSpinCache.status.push(0);
                this.bonusSpinCache.wins.push(0);
                this.bonusSpinCache.wins_mask.push('h');
            }
        }

        this.currentGame = "BONUS";
    }
    else if (viewCache.type == "FREE") { //                   
        this.greenCnt = 5;
        this.miniSpinCacheList = viewCache.view;
        this.miniSlotList = this.miniSpinCacheList[0].list;
        this.view = this.miniSpinCacheList[0].view;
        this.freeSpinWinMoney = 0;
        this.miniSpinIndex = 1;
        this.miniSpinLength = this.miniSpinCacheList.length;
        this.currentGame = "FREE";
    }
    else { //                      
        this.greenCnt = Util.random(0, 5);
        this.view = viewCache.view;
    }
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;

    if (this.bonusMode == 1) {    //                      
        var tmpMiniWin = 0;

        if (this.bonusSpinLevel > 0) {
            var cache = {};

            if (this.bonusSubLevel == 0 || this.bonusSubLevel > 0 && this.bonusSubLevel >= this.bonusSubLength) {
                this.bonusSubLevel = 0;
                ++this.bonusSpinLevel;
                cache = this.bonusSpinCacheList[this.bonusSpinLevel - 1];

                this.bonusSpinCache.whi = cache.step;
                this.bonusSpinCache.wi += cache.step;
                this.bonusSpinCache.status[this.bonusSpinCache.wi] = this.bonusSpinLevel - 1;
            }

            cache = this.bonusSpinCacheList[this.bonusSpinLevel - 1];

            if (cache.sn_lay) {
                this.bonusSpinCache.sn_lay = cache.sn_lay;
                this.bonusSubLength = cache.miniViewCache.length;

                if (this.bonusSubLevel > 0) {
                    this.miniView = cache.miniViewCache[this.bonusSubLevel];
                    tmpMiniWin = WinFromMiniView(this.miniView, Number(player.virtualBet));
                    this.moneyBonusWin += tmpMiniWin;
                }

                ++this.bonusSubLevel;
            }
        } else {
            ++this.bonusSpinLevel;
        }
    } else {   //               
        if (this.bonusSpinLevel > 0) {
            this.bonusInd = Number(param.ind);
            this.bonusSpinCache.status[this.bonusInd] = this.bonusSpinLevel;
            this.bonusSpinCache.wins[this.bonusInd] = this.bonusSpinCacheList[this.bonusSpinLevel];
            this.bonusSpinCache.wins_mask[this.bonusInd] = "ma";
        }

        ++this.bonusSpinLevel;
    }

    if (this.bonusSpinLevel >= this.bonusSpinCacheList.length) {
        if (this.bonusMode == 1) {
            this.bonusSpinCache.wp = mapLocationList[this.bonusSpinCache.wi];
            if (this.bonusSpinCache.wp != 1) {
                this.moneyBonusWin += this.bonusSpinCache.wp * Number(player.virtualBet);
            }
        } else {
            this.moneyBonusWin = this.bonusSpinCacheList[this.bonusSpinLength - 1] * Number(player.virtualBet);
        }
        this.winMoney = this.moneyBonusWin;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.MiniSpin = function (player) {
    this.miniViewCache = this.miniSpinCacheList[this.miniSpinIndex++];
    this.winMoney = 0;

    for (var i = 0; i < this.miniViewCache.length; ++i) {
        this.winMoney += WinFromMiniView(this.miniViewCache[i].view, player.betPerLine * this.lineCount);
    }

    this.freeSpinWinMoney += this.winMoney;

    if (this.miniSpinIndex >= this.miniSpinCacheList.length) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
        tmpWin = WinFromView(tmpView, bpl);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
        tmpWin = 0;
    }
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
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin);
    }

}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var bonusView = RandomZeroView(baseReels, bpl);
    var miniSpinCacheList = [];

    var msCache = RandomMiniSlotCache(miniReels, totalBet, fsWin);

    miniSpinCacheList.push({
        view: bonusView,
        list: msCache.miniSlotList
    });

    return {
        view: miniSpinCacheList.concat(msCache.cache),
        win: msCache.win,
        type: "FREE",
        bpl: bpl,
        isCall: isCall ? 1 : 0
    };
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bsCache = RandomBonusViewCache(baseReels, bpl, bsWin, totalBet);

    return {
        view: bsCache.cache,
        win: bsCache.win,
        type: "BONUS",
        bpl: bpl,
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels, slotWidth, slotHeight);
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
        tmpView = RandomView(reels, slotWidth, slotHeight);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView;
};

var RandomView = function (reels, width, height) {
    var view = [];

    while (true) {
        for (var i = 0; i < width; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < height; j++) {
                var viewPos = i + j * width;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
            }
        }
        if (!isScatterView(view, rainbow) && !isScatterView(view, eliminator)) {
            break;
        }
    }

    return view;
};

var RandomScatterView = function (reels, bpl, scatter) {
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

        if (isScatterView(view, scatter) && WinFromView(view, bpl) == 0) {
            if (NumberOfScatters(view, scatter) > 3) {
                if (Util.probability(percentList.manyScatterPercent)) {
                    break;
                }
            } else {
                break;
            }
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

    var mode = 0;

    if (Util.probability(100)) {
        mode = 1;
    } else {
        mode = 2;
    }

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var bonusSpinData = {};

        if (mode == 1) {
            bonusSpinData = RandomRainbowViewCache(reels, bpl, totalBet);
        } else {
            bonusSpinData = RandomEliminatorViewCache(reels, bpl, totalBet);
        }

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

var RandomMiniSlotCache = function (reels, totalBet, bsWin) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var miniSpinData = {};
        var miniSlotCacheList = [];
        var miniSlotList = [];
        var miniSlotCount = Util.random(2, 5);
        var miniSlotEnded = GetSameValueArray(miniSlotCount, 0);
        var endedSlotCount = 0;
        var miniSlotTotalWin = 0;

        var randomPosArray = Util.randomPositionArray(5, 1, 5);

        while (miniSlotList.length < miniSlotCount) {
            miniSlotList.push(randomPosArray.shift());
        }

        while (endedSlotCount < miniSlotCount) {
            var miniViewCache = [];

            for (var i = 0; i < miniSlotCount; ++i) {
                if (miniSlotEnded[i] == 0) {
                    var tmpMiniView = [];
                    var tmpMiniWin = 0;

                    while (true) {
                        tmpMiniView = RandomView(reels, 3, 1);
                        tmpMiniWin = WinFromMiniView(tmpMiniView, totalBet);

                        if (Util.probability(percentList.miniWinPercent) && tmpMiniWin || Util.probability(100 - percentList.miniWinPercent) && tmpMiniWin == 0) {
                            break;
                        }
                    }

                    if (tmpMiniWin == 0) {
                        miniSlotEnded[i] = 1;
                        ++endedSlotCount;
                    }

                    miniViewCache.push({
                        id: i,
                        view: tmpMiniView
                    })

                    miniSlotTotalWin += tmpMiniWin;
                }
            }

            miniSlotCacheList.push(miniViewCache);
        }

        miniSpinData = {
            miniSlotList: miniSlotList,
            cache: miniSlotCacheList,
            win: miniSlotTotalWin
        };

        if (miniSpinData.win >= minMoney && miniSpinData.win <= maxMoney) {
            return miniSpinData;
        }

        if (miniSpinData.win > lowerLimit && miniSpinData.win < minMoney) {
            lowerLimit = miniSpinData.win;
            lowerView = miniSpinData;
        }
        if (miniSpinData.win > maxMoney && miniSpinData.win < upperLimit) {
            upperLimit = miniSpinData.win;
            upperView = miniSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var RandomRainbowViewCache = function (reels, bpl, totalBet) {
    var tmpView = RandomScatterView(reels, bpl, Util.probability(22) ? eliminator : rainbow);
    var bonusSpinCacheList = [];
    var bonusSpinTotalWin = 0;
    var bonusSpinLevel = 1;
    var currentLocation = -1;
    var stepArr = RandomStepArray(21);

    bonusSpinCacheList.push({
        view: tmpView,
        mode: 1
    });

    while (bonusSpinLevel < rainbowLevelLimit) {
        currentLocation += stepArr[bonusSpinLevel];

        var cache = {
            step: stepArr[bonusSpinLevel]
        };

        if (mapLocationList[currentLocation] == 1) {
            cache.sn_lay = 3 - miniLocations.indexOf(currentLocation);

            var tmpMiniView = [];
            var tmpMiniWin = 0;
            var miniViewCache = [[14, 14, 14]];

            while (true) {
                while (true) {
                    tmpMiniView = RandomView(miniReels, 3, 1);
                    tmpMiniWin = WinFromMiniView(tmpMiniView, totalBet);

                    if (Util.probability(percentList.rainbowWinPercent) || tmpMiniWin == 0) {
                        break;
                    }
                }

                bonusSpinTotalWin += tmpMiniWin;
                miniViewCache.push(tmpMiniView);

                if (tmpMiniWin == 0) {
                    break;
                }
            }

            cache.miniViewCache = miniViewCache;
        }

        ++bonusSpinLevel;
        bonusSpinCacheList.push(cache);
    }

    bonusSpinCacheList.push({
        step: 0
    });

    if (mapLocationList[currentLocation] != 1) {
        bonusSpinTotalWin += mapLocationList[currentLocation] * totalBet;
    }

    return {
        cache: bonusSpinCacheList,
        win: bonusSpinTotalWin
    }
};

var RandomEliminatorViewCache = function (reels, bpl, totalBet) {
    var tmpView = RandomScatterView(reels, bpl, eliminator);
    var nScatters = NumberOfScatters(tmpView, eliminator);
    var minMulti = 0;
    var maxMulti = 0;
    var bonusSpinCacheList = [];

    switch (nScatters) {
        case 3:
            minMulti = 5;
            maxMulti = 20;
            break;
        case 4:
            minMulti = 10;
            maxMulti = 40;
            break;
        case 5:
            minMulti = 50;
            maxMulti = 200;
            break;
    }

    bonusSpinCacheList.push({
        view: tmpView,
        mode: 2                 //                         2
    });

    for (var i = 0; i < nScatters; ++i) {
        bonusSpinCacheList.push(Util.random(minMulti, maxMulti));
    }

    return {
        cache: bonusSpinCacheList,
        win: bonusSpinCacheList[nScatters] * totalBet
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

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
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
        if (isWild(lineSymbols[i])) //                                              
            continue;

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
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatterView = function (view, scatter) {
    return NumberOfScatters(view, scatter) >= 3;
};

var NumberOfScatters = function (view, scatter) {
    var res = 0;

    for (var i = 0; i < view.length; ++i) {
        if (view[i] == scatter) {
            ++res;
        }
    }

    return res;
};

var RandomStepArray = function (limit) {
    var res = [];

    while (true) {
        var total = -1;

        res = [0, Util.random(1, 6)];       //                                        ~~~
        total += res[1];

        for (var i = 2; i <= rainbowLevelLimit; ++i) {
            var step = 0;

            if (mapLocationList[total] == 1) {
                step = Util.random(1, 5);
            } else {
                step = Util.random(0, 7);
            }

            for (var j = 0; j < miniLocations.length; ++j) {
                if (total < miniLocations[j] && miniLocations[j] - total < 4 && Util.probability(percentList.miniLocationPercent)) {
                    step = miniLocations[j] - total;
                    break;
                }
            }

            total += step;
            res.push(step);
        }

        if (total < limit) {
            break;
        }
    }

    return res;
};

var GetSameValueArray = function (len, value) {
    var res = [];

    for (var i = 0; i < len; ++i) {
        res.push(value);
    }

    return res;
};

var WinFromMiniView = function (view, totalBet) {
    var multi = 0;

    if (view[0] == view[1] && view[1] == view[2]) {
        switch (view[0]) {
            case 11:
                multi = 15;
                break;
            case 12:
                multi = 10;
                break;
            case 13:
                multi = 5;
                break;
        }
    } else if (view[0] != 14 && view[1] != 14 && view[2] != 14) {
        multi = 1;
    }

    return totalBet * multi;
}

module.exports = SlotMachine;