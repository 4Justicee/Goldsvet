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

    this.jewelMulti = [];
    this.jewelWins = [];
    this.jewelTable = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMore = 0;
    this.freeBonusFlag = false;

    //                              
    this.moneyBonusWin = 0;
    this.bonusIndex = 0;
    this.bonusMulti = 0;
    this.bonusCache = {};

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"]; //FREE, BONUS, TUMBLE
};

var scatter = 1, scatterFree = 12, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [7, 4, 4, 10, 9, 5, 7, 6, 11, 4, 4, 8, 10, 7, 9, 10, 4, 4, 3, 3, 10, 11, 5, 10, 6, 7, 8, 6],
    [2, 2, 9, 5, 11, 5, 9, 4, 4, 8, 5, 8, 6, 11, 9, 5, 11, 9, 5, 11, 2, 2, 11, 9, 5, 8, 11, 9, 8, 3, 3, 5, 8, 9, 10, 7, 5, 10, 9],
    [11, 7, 10, 8, 7, 7, 8, 3, 3, 11, 6, 8, 1, 1, 1, 8, 10, 6, 8, 3, 3, 4, 4, 8, 11, 11, 6, 11, 9, 3, 3, 5, 6, 10],
    [2, 2, 2, 2, 3, 3, 8, 10, 4, 4, 7, 1, 1, 1, 7, 10, 11, 7, 5, 7, 11, 7, 5, 10, 9, 4, 4, 5, 8, 5, 6, 7, 4, 4, 3, 3, 10, 4, 8, 11],
    [10, 10, 3, 5, 8, 3, 3, 10, 1, 1, 1, 7, 9, 4, 4, 5, 3, 3, 7, 5, 9, 10, 10, 9, 3, 3, 10, 6, 11, 4, 4, 8, 5, 10, 4, 5, 11, 8],
];
var freeReels = [
    [7, 4, 4, 11, 7, 9, 12, 12, 12, 7, 4, 4, 9, 5, 6, 5, 7, 6, 10, 9, 4, 4, 9, 10, 3, 3, 12, 12, 12, 10, 6, 5, 11, 10, 6, 10, 5, 8, 10],
    [2, 2, 2, 2, 5, 11, 8, 5, 4, 4, 11, 8, 6, 9, 11, 5, 2, 2, 9, 12, 12, 12, 8, 11, 9, 5, 8, 3, 3, 2, 2, 8, 5, 8, 12, 12, 12, 7, 10],
    [11, 6, 10, 8, 4, 7, 3, 3, 11, 6, 8, 12, 12, 12, 10, 3, 3, 8, 9, 12, 12, 12, 4, 8, 11, 6, 3, 3, 11, 9, 5, 6],
    [2, 2, 2, 2, 11, 3, 3, 8, 9, 5, 10, 4, 4, 8, 12, 12, 12, 7, 7, 9, 4, 2, 2, 11, 6, 9, 10, 9, 12, 12, 12, 7, 11, 12, 12, 12, 7, 9, 4, 4, 3, 3, 11, 8],
    [10, 5, 8, 10, 3, 8, 3, 3, 9, 12, 12, 12, 10, 9, 4, 4, 7, 10, 3, 3, 7, 12, 12, 12, 8, 5, 10, 3, 3, 6, 7, 11, 4, 4, 8, 9, 10, 12, 12, 12, 5],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 20, 10, 10, 5, 5, 5, 5, 5, 0],
    [0, 0, 0, 60, 50, 40, 30, 25, 20, 20, 15, 15, 0],
    [0, 0, 0, 150, 125, 100, 75, 50, 50, 50, 50, 50, 0],
];
var bonusMultiArr = [10, 15, 20, 25, 30, 35, 40, 50, 75, 150, 250, 1000];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.currentGame = this.currentGame == "BONUS" ? "BASE" : this.currentGame;
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

    var jewelCache = {};

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        jewelCache = cache.jewel;

        this.view = cache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;

        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0].view;
        jewelCache = this.freeSpinCacheList[0].jewel;
    } else if (viewCache.type == "BONUS") {
        this.currentGame = "BONUS";
        var cache = viewCache.view;
        jewelCache = cache.jewel;

        this.view = cache.view;
        this.bonusCache = jewelCache;
    }

    this.jewelMulti = jewelCache.multi;
    this.jewelTable = jewelCache.table;
    this.jewelWins = jewelCache.wins;

    var res = WinFromView(this.view, player.betPerLine);
    this.winMoney = res.win;
    this.winLines = res.lines;

    var jWinInfo = JewelWin(this.view, jewelCache, player.betPerLine * this.lineCount, true);
    this.winMoney += jWinInfo.win;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view) || jWinInfo.fsCount > 0) {
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }

    //                       
    if (this.currentGame == "BONUS") {
        this.moneyBonusWin = this.winMoney;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.jewelMulti = cache.jewel.multi;
    this.jewelTable = cache.jewel.table;
    this.jewelWins = cache.jewel.wins;

    var res = WinFromView(this.view, player.betPerLine);
    this.winMoney = res.win;
    this.winLines = res.lines;

    var jWinInfo = JewelWin(this.view, cache.jewel, player.betPerLine * this.lineCount, true);
    this.winMoney += jWinInfo.win;

    //                    
    this.freeSpinMore = 0;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinMore += NumberOfScatters(this.view);
    }
    if (jWinInfo.fsCount > 0) {
        this.freeSpinMore += jWinInfo.fsCount;
    }

    //                       
    this.freeBonusFlag = false;
    if (jWinInfo.bGame > 0) {
        this.freeBonusFlag = true;
        this.bonusCache = cache.jewel;
    }

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinLength += this.freeSpinMore;
    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    this.winMoney = 0;

    var winIndex;
    for (var i = 0; i < this.bonusCache.multi.length; i++) {
        if (this.bonusCache.wins[i] == 1 && this.bonusCache.table[i] == "bg") {
            winIndex = i;
        }
    }

    this.bonusMulti = this.bonusCache.multi[winIndex];
    this.bonusIndex = bonusMultiArr.indexOf(this.bonusMulti);

    this.winMoney = this.bonusMulti * player.betPerLine * this.lineCount;

    if (this.freeBonusFlag) {
        this.freeSpinWinMoney += this.winMoney;
    } else {
        this.moneyBonusWin += this.winMoney;
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpCache, tmpWin;

    if (baseWin > 0) {
        //             
        if (Util.probability(10)) {
            tmpCache = GenerateJewelWinView(bpl, totalBet, baseWin);
        } else {
            tmpCache = RandomWinView(baseReels, bpl, baseWin);
        }
    } else {
        tmpCache = RandomZeroView(baseReels, bpl);
    }
    tmpWin = tmpCache.win;
    delete tmpCache.win;

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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl, totalBet, fsWin);

    var freeSpinCount = scatterView.fsCount;
    var scatterWin = scatterView.win;

    delete scatterView["win"];
    delete scatterView["fsCount"];
    var freeSpinData = {
        length: freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, freeSpinData.length, totalBet);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWin,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

//                       
SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var stackIndex = Util.random(2, 5);
    var bonusView = RandomStackedView(baseReels, stackIndex, bpl);
    var jewelCache = RandomJewelCache(false, true);
    var totalWin = 0;

    //                
    var multi = bsWin / totalBet;
    var value = 0;
    var maxPrize = bonusMultiArr[bonusMultiArr.length - 1];
    if (multi >= maxPrize) {
        multi = maxPrize;
    } else {
        for (var i = 0; i < bonusMultiArr.length; i++) {
            if (multi <= bonusMultiArr[i]) {
                multi = bonusMultiArr[i - 1 >= 0 ? i - 1 : 0];
                break;
            }
        }
    }

    value = multi > bonusMultiArr[0] ? multi : bonusMultiArr[0];
    totalWin = value * totalBet + WinFromView(bonusView, bpl).win;

    jewelCache.table[stackIndex] = "bg";
    jewelCache.multi[stackIndex] = value;
    jewelCache.wins[stackIndex] = 1;

    return {
        view: {
            view: bonusView,
            jewel: jewelCache,
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
        tmpWin = WinFromView(tmpView, bpl).win;
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    var jewelCache = RandomJewelCache();

    return {
        view: tmpView,
        jewel: jewelCache,
        win: tmpWin,
    };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);

        tmpWin = WinFromView(tmpView, bpl).win;
        if (tmpWin == 0) {
            break;
        }
    }

    var jewelCache = RandomJewelCache();

    return {
        view: tmpView,
        jewel: jewelCache,
        win: tmpWin,
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

        if (!isFreeSpinWin(view) && !isScatterStacked(view)) {
            break;
        }
    }

    return view;
};

var RandomScatterView = function (reels, bpl, totalBet, fsWin) {
    var tempView = [];
    var jewel = {};
    var totalWin = 0;
    var fsCount = 0;

    var freeFlag;
    if (Util.probability(50)) {
        freeFlag = true; //                                 
    } else {
        freeFlag = false; //                              
    }

    while (true) {
        totalWin = 0;
        fsCount = 0;

        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                tempView[viewPos] = reels[i][reelPos];
            }
        }

        jewel = RandomJewelCache(false, false);
        var jWinInfo = JewelWin(tempView, jewel, totalBet);

        var bonusGameFlag = false;

        //                       wins          1          
        if (jWinInfo.index.length > 0) {
            for (var i = 0; i < jWinInfo.index.length; i++) {
                var index = jWinInfo.index[i];
                jewel.wins[index] = 1;
                if (jewel.table[index] == "bg") bonusGameFlag = true;
            }
        }

        //                                                                                
        if (bonusGameFlag) continue;

        totalWin = jWinInfo.win + WinFromView(tempView, bpl).win;

        //                                                                 
        if (totalWin < fsWin) {
            if (freeFlag) {
                if (isFreeSpinWin(tempView) && jWinInfo.fsCount == 0) {
                    fsCount = 8 + NumberOfScatters(tempView) - 5;
                    break;
                }
            } else {
                if (!isFreeSpinWin(tempView) && jWinInfo.fsCount > 0) {
                    fsCount = jWinInfo.fsCount;
                    break;
                }
            }
        }
    }

    return {
        view: tempView,
        jewel: jewel,
        win: totalWin,
        fsCount: fsCount,
    };
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, totalBet) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
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
            var fsview, fsWin, jewel, fsMore;
            while (true) {
                fsview = RandomFreeView(reels);
                jewel = RandomJewelCache(true, false);
                fsWin = WinFromView(fsview, bpl).win;
                fsMore = 0;

                var jWinInfo = JewelWin(fsview, jewel, totalBet);
                fsWin += jWinInfo.win;

                //                    
                if (isFreeSpinWin(fsview)) {
                    fsMore += NumberOfScatters(fsview);
                }

                if (jWinInfo.fsCount > 0) {
                    fsMore += jWinInfo.fsCount;
                }

                //                       wins          1          
                if (jWinInfo.index.length > 0) {
                    for (var i = 0; i < jWinInfo.index.length; i++) {
                        jewel.wins[jWinInfo.index[i]] = 1;
                    }
                }

                //                       20                 
                if (freeSpinLength > 20 && fsMore > 0) {
                    continue;
                }

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push({
                view: fsview,
                jewel: jewel,
            });

            freeSpinWinMoney += fsWin;
            freeSpinLength += fsMore;

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

        var count = NumberOfScatters(view);

        if (count < 6) {
            if (count >= 5) {
                if (Util.probability(20)) break;
            } else {
                break;
            }
        }
    }

    return view;
};

var RandomStackedView = function (reels, index, bpl) {
    var view = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            if (i == index) {
                for (var k = 0; k < slotHeight; k++) {
                    var viewPos = i + k * slotWidth;
                    view[viewPos] = scatter;
                }
            } else {
                var len = reels[i].length;
                var randomIndex = Util.random(0, len);
                for (var j = 0; j < slotHeight; j++) {
                    var viewPos = i + j * slotWidth;
                    var reelPos = (randomIndex + j) % len;
                    view[viewPos] = reels[i][reelPos];
                }
            }
        }

        if (!isFreeSpinWin(view) && WinFromView(view, bpl).win == 0) {
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

var RandomJewelCache = function (isFree = false, isOnlyMoney = false) {
    var jewelCache = {};

    while (true) {
        var jewelTables = [];
        var jewelWins = [];
        var jewelMulti = [];

        for (var i = 0; i < 5; i++) {
            if (isOnlyMoney) {
                jewelTables.push("aw");
            } else {
                if (Util.probability(10)) {
                    jewelTables.push("fs");
                } else if (Util.probability(10)) {
                    jewelTables.push("bg");
                } else {
                    jewelTables.push("aw");
                }
            }

            jewelWins.push(0);
        }

        if (!isFree) {
            for (var j = 0; j < 2; j++) {
                jewelTables[j] = "";
                jewelWins[j] = -1;
            }
        }

        for (var j = 0; j < 5; j++) {
            if (jewelTables[j] == "aw") {
                if (Util.probability(10)) {
                    jewelMulti[j] = Util.random(1, 21);
                } else {
                    jewelMulti[j] = Util.random(1, 11);
                }
            } else if (jewelTables[j] == "fs") {
                if (isFree) {
                    jewelMulti[j] = 5;
                } else {
                    jewelMulti[j] = 8;
                }
            } else if (jewelTables[j] == "bg") {
                if (Util.probability(20)) {
                    jewelMulti[j] = bonusMultiArr[Util.random(0, bonusMultiArr.length)];
                } else {
                    jewelMulti[j] = bonusMultiArr[Util.random(0, 5)];
                }
            } else if (jewelTables[j] == "") {
                jewelMulti[j] = -1;
            }
        }

        if (Util.count(jewelTables, "fs") < 2 && Util.count(jewelTables, "bg") < 2) {
            jewelCache.table = jewelTables;
            jewelCache.wins = jewelWins;
            jewelCache.multi = jewelMulti;
            break;
        }
    }

    return jewelCache;
};

var GenerateJewelWinView = function (bpl, totalBet, baseWin) {
    var stackIndex = Util.random(2, 5);
    var stackedView = RandomStackedView(baseReels, stackIndex, bpl);
    var jewelCache = RandomJewelCache();

    //                 
    var multi = Math.floor(baseWin / totalBet);

    if (multi < 1) {
        multi = 1;
    }
    if (multi > 50) {
        multi = 50;
    }

    jewelCache.table[stackIndex] = "aw";
    jewelCache.multi[stackIndex] = multi;
    jewelCache.wins[stackIndex] = 1;

    return {
        view: stackedView,
        jewel: jewelCache,
        win: multi * totalBet,
    };
};

var JewelWin = function (view, jewel, totalBet, isFree = false) {
    var stackIndex = [];

    for (var i = 0; i < slotWidth; i++) {
        var flag = true;
        for (var j = 0; j < slotHeight; j++) {
            flag &= isScatter(view[i + j * slotWidth]);
        }

        if (flag) stackIndex.push(i);
    }

    var totalWin = 0;
    var freeSpinCount = 0;
    var bonusGame = 0;

    for (var j = 0; j < stackIndex.length; j++) {
        if (jewel.table[stackIndex[j]] == "aw") {
            totalWin += jewel.multi[stackIndex[j]] * totalBet;
        } else if (jewel.table[stackIndex[j]] == "fs") {
            freeSpinCount += jewel.multi[stackIndex[j]];
        } else if (jewel.table[stackIndex[j]] == "bg") {
            bonusGame++;
            if (!isFree) {
                totalWin += jewel.multi[stackIndex[j]] * totalBet;
            }
        }
    }

    return {
        win: totalWin,
        fsCount: freeSpinCount,
        bGame: bonusGame,
        index: stackIndex,
    };
};

var WinFromView = function (view, bpl) {
    var money = 0;
    var lines = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        var result = RecursiveSearch(view, 1, history, view[pos], bpl);
        money += result.win;
        lines = lines.concat(result.lines);
    }

    return { win: money, lines: lines };
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    var winLines = [];
    var result = {};

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId];

        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join("~")}`);
        }

        result.win = winMoney;
        result.lines = winLines;
        return result;
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
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId];

        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join("~")}`);
        }

        result.win = winMoney;
        result.lines = winLines;
        return result;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        var tempRes = RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);

        winMoney += tempRes.win;
        winLines = winLines.concat(tempRes.lines);
    }

    result.win = winMoney;
    result.lines = winLines;
    return result;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter || symbol == scatterFree;
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

var isScatterStacked = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var result = true;
        for (var j = 0; j < slotHeight; j++) {
            result &= isScatter(view[i + j * slotWidth]);
        }

        if (result) return true;
    }

    return false;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 5;
};

module.exports = SlotMachine;