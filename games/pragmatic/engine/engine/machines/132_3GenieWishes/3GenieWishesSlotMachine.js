var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 50;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinType = "";

    this.rainingWildPos = []; //                                            
    this.stickyWildPos = []; //                                             (                   )
    this.stickys = []; //                              (      )
    this.selectCache = {};

    //                             
    this.bonusStatus = "NOBONUS";
    this.bonusMulti = 0;
    this.moneyBonusWin = 0;
    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 4;
var baseReels = [
    [11, 7, 8, 4, 11, 7, 9, 5, 5, 1, 11, 4, 6, 2, 2, 2, 2, 10, 6, 7, 3, 7, 9, 9, 4, 11, 7, 8, 4, 11, 7, 9, 5, 5, 11, 4, 6, 2, 2, 2, 2, 10, 6, 1, 10, 3, 7, 9, 9, 4],
    [9, 3, 10, 10, 5, 4, 2, 2, 2, 2, 8, 11, 6, 8, 7, 8, 10, 6, 8, 9, 3, 10, 10, 5, 4, 2, 2, 2, 2, 8, 11, 6, 8, 7, 8, 10, 6, 8],
    [11, 11, 8, 1, 3, 3, 7, 8, 6, 11, 10, 9, 4, 8, 7, 8, 2, 2, 2, 2, 2, 5, 11, 11, 8, 10, 3, 9, 1, 7, 8, 6, 11, 10, 9, 4, 8, 7, 8, 2, 2, 2, 2, 2, 5],
    [8, 10, 11, 6, 5, 7, 2, 2, 2, 2, 10, 4, 5, 3, 10, 9, 11, 9, 11, 8, 3, 6, 8, 10, 11, 6, 5, 7, 2, 2, 2, 2, 10, 4, 5, 3, 10, 9, 11, 9, 11, 8, 3, 6],
    [7, 10, 7, 11, 9, 3, 4, 5, 8, 6, 5, 7, 9, 4, 1, 6, 10, 2, 2, 2, 2, 11, 8, 11, 7, 10, 7, 11, 9, 3, 1, 4, 5, 8, 6, 5, 7, 9, 5, 7, 10, 2, 2, 2, 2, 11, 8, 11],
];
var freeReels = [
    [6, 10, 3, 9, 6, 11, 10, 9, 10, 11, 8, 4, 5, 7, 5, 4, 10],
    [10, 6, 11, 7, 10, 9, 4, 8, 11, 10, 11, 9, 6, 7, 3, 8, 5],
    [9, 3, 10, 11, 6, 10, 11, 5, 7, 4, 6, 5, 8, 11, 8],
    [10, 4, 8, 9, 9, 3, 8, 11, 7, 9, 11, 10, 5, 6, 3, 4, 11, 7, 10],
    [5, 7, 11, 10, 5, 3, 7, 8, 6, 3, 6, 4, 4, 8, 9, 11],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 15, 10, 10, 10, 10, 5, 5, 5],
    [0, 0, 0, 80, 70, 60, 50, 40, 30, 25, 20, 12],
    [0, 0, 0, 300, 200, 150, 125, 90, 80, 70, 60, 50],
];
var payLines = [
    [0, 1, 2, 3, 4], // 1
    [15, 16, 17, 18, 19], // 2
    [5, 6, 7, 8, 9], // 3
    [10, 11, 12, 13, 14], // 4
    [0, 6, 12, 8, 4], // 5
    [15, 11, 7, 13, 19], // 6
    [10, 6, 2, 8, 14], // 7
    [5, 11, 17, 13, 9], // 8
    [0, 6, 2, 8, 4], // 9
    [15, 11, 17, 13, 19], // 10
    [5, 1, 7, 3, 9], // 11
    [10, 16, 12, 18, 14], // 12
    [5, 11, 7, 13, 9], // 13
    [10, 6, 12, 8, 14], // 14
    [0, 6, 7, 8, 4], // 15
    [15, 11, 12, 13, 19], // 16
    [5, 1, 2, 3, 9], // 17
    [10, 16, 17, 18, 14], // 18
    [5, 11, 12, 13, 9], // 19
    [10, 6, 7, 8, 14], // 20
    [0, 1, 7, 3, 4], // 21
    [15, 16, 12, 18, 19], // 22
    [5, 6, 2, 8, 9], // 23
    [10, 11, 17, 13, 14], // 24
    [5, 6, 12, 8, 9], // 25
    [10, 11, 7, 13, 14], // 26
    [0, 1, 12, 3, 4], // 27
    [15, 16, 7, 18, 19], // 28
    [10, 11, 2, 13, 14], // 29
    [5, 6, 17, 8, 9], // 30
    [0, 11, 12, 13, 4], // 31
    [15, 6, 7, 8, 19], // 32
    [10, 1, 2, 3, 14], // 33
    [5, 16, 17, 18, 9], // 34
    [5, 1, 12, 3, 9], // 35
    [10, 16, 7, 18, 14], // 36
    [5, 11, 2, 13, 9], // 37
    [10, 6, 17, 8, 14], // 38
    [0, 11, 2, 13, 4], // 39
    [15, 6, 17, 8, 19], // 40
    [10, 1, 12, 3, 14], // 41
    [5, 16, 7, 18, 9], // 42
    [0, 11, 7, 13, 4], // 43
    [15, 6, 12, 8, 19], // 44
    [10, 1, 7, 3, 14], // 45
    [5, 16, 12, 18, 9], // 46
    [0, 1, 7, 13, 19], // 47
    [15, 16, 12, 8, 4], // 48
    [0, 6, 12, 18, 19], // 49
    [15, 11, 7, 3, 4], // 50
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
    this.scatterWin = 0;
    this.winLines = [];
    this.bonusStatus = "NOBONUS";

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

        this.view = this.freeSpinCacheList[0];
        this.freeSpinType = viewCache.freeType;
    } else if (viewCache.type == "BONUS") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.bonusMulti = cache.multi;
        this.bonusStatus = "BONUS";
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.scatterPositions = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, Number(player.betPerLine * this.lineCount));
    this.winMoney += this.scatterWin;

    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        if (this.bonusStatus == "BONUS") {
            this.moneyBonusWin = this.winMoney;
        } else {
            this.freeSpinIndex = 1;
            this.freeSpinBeforeMoney = this.winMoney;
            this.freeSpinWinMoney = this.winMoney;
            this.currentGame = "FREE";
        }
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.freeSpinType == "RAINING") {
        this.RainingFreeSpin(player);
    } else if (this.freeSpinType == "STICKY") {
        this.StickyFreeSpin(player);
    }
};

SlotMachine.prototype.RainingFreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    this.maskView = cache.mask;
    this.rainingWildPos = cache.wilds;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.StickyFreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    this.maskView = cache.mask;
    this.stickyWildPos = cache.wilds;
    this.stickys = cache.stickys;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    this.winMoney = 0;

    var selectId = Number(param.ind);

    var status = [0, 0, 0];
    var wins_mask = ["w", "w", "w"];
    var wins = [0, 0, 0];
    status[selectId] = 1;

    var randomPos = Util.random(1, 3); // 1        2
    var pos1 = (selectId + randomPos) % 3;
    var pos2 = (selectId + randomPos + randomPos) % 3;

    if (this.bonusStatus == "BONUS") {
        wins[selectId] = this.bonusMulti;

        if (this.bonusMulti == 1) {
            wins[pos2] = Util.random(10, 201);
        } else {
            wins[pos2] = 1;
        }

        if (Util.probability(50)) {
            wins[pos1] = 10;
            wins_mask[pos1] = "rwf";
        } else {
            wins[pos1] = 6;
            wins_mask[pos1] = "swf";
        }

        this.winMoney = Number(player.betPerLine * this.lineCount) * this.bonusMulti;
        this.moneyBonusWin += this.winMoney;
    } else if (this.currentGame == "FREE") {
        if (this.freeSpinType == "RAINING") {
            wins_mask[selectId] = "rwf";
            wins[selectId] = 10;
        } else if (this.freeSpinType == "STICKY") {
            wins_mask[selectId] = "swf";
            wins[selectId] = 6;
        }
        wins[pos1] = Util.random(10, 201);
        wins[pos2] = 1;
    }

    this.selectCache = {
        status: status,
        wins_mask: wins_mask,
        wins: wins,
    };
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl, totalBet);
    var scatterWin = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);

    var freeSpinCount = 0;
    var freeType = "";

    var gameType = Util.random(0, 2);

    if (gameType == 0) {
        //                    
        freeSpinCount = 10;
        freeType = "RAINING";
    } else if (gameType == 1) {
        //                    
        freeSpinCount = 6;
        freeType = "STICKY";
    }

    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, freeSpinCount, freeType);
    var freeSpinData = {
        length: freeSpinCount,
        viewList: [],
    };

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(fsCache.viewList);

    return {
        win: fsCache.win + scatterWin,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        freeType: freeType,
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl, totalBet);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);

    var bonusCache = {
        view: scatterView,
    };

    //              
    var multi = 1;

    //                               1                             
    if (Util.probability(50) && !isCall) {
        multi = 1;
    } else {
        multi = Math.floor(bsWin / totalBet);

        if (multi < 10) {
            multi = 10;
        }
        if (multi > 500) {
            multi = 500;
        }
    }

    bonusCache.multi = multi;

    return {
        win: multi * totalBet + scatterWinMoney,
        bpl: bpl,
        view: bonusCache,
        type: "BONUS",
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

var RandomScatterView = function (reels, bpl, totalBet) {
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

        if (NumberOfScatters(view) == 3 && WinFromView(view, bpl) <= totalBet * 5) {
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
        var freeSpinData = {};

        if (fsType == "RAINING") {
            freeSpinData = RandomRainingFreeViewCache(reels, bpl, fsWin, fsLen);
        } else {
            freeSpinData = RandomStickyFreeViewCache(reels, bpl, fsWin, fsLen);
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

var RandomRainingFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var freeSpinIndex = 1;
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;
    var viewList = [];
    
    //                    
    while (true) {
        //                 
        var fsview, fsWin;
        while (true) {
            fsview = RandomView(reels);
            var fsCache = RandomWildView(fsview);

            fsWin = WinFromView(fsCache.view, bpl);
            if (Util.probability(50) || fsWin == 0) {
                break;
            }
        }

        viewList.push({
            view: fsCache.view,
            mask: fsview,
            wilds: fsCache.wilds,
        });

        freeSpinWinMoney += fsWin;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            break;
        }
    }

    return {
        win: freeSpinWinMoney,
        viewList
    };
};

var RandomStickyFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var freeSpinIndex = 1;
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;
    var stickys = [];
    var viewList = [];

    while (true) {
        //                 
        var fsview, fsWin;
        while (true) {
            fsview = RandomView(reels);
            var fsCache = RandomStickyWildView(fsview, stickys);

            fsWin = WinFromView(fsCache.view, bpl);
            if (Util.probability(50) || fsWin == 0) {
                break;
            }
        }

        stickys = fsCache.stickys;

        viewList.push({
            view: fsCache.view,
            mask: fsview,
            wilds: fsCache.wilds,
            stickys: fsCache.stickys,
        });

        freeSpinWinMoney += fsWin;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            break;
        }
    }


    return lowerView ? lowerView : upperView;
};

var RandomWildView = function (view) {
    var newView = [...view];

    var wildCount = Util.random(4, 11);
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

var RandomStickyWildView = function (view, stickys) {
    var newView = [...view];

    var wildCount = Util.random(1, 3);
    var wildPos = [];

    while (true) {
        var rand = Util.random(0, view.length);
        if (wildPos.indexOf(rand) == -1 && stickys.indexOf(rand) == -1) {
            wildPos.push(rand);
        }

        if (wildPos.length >= wildCount) {
            break;
        }
    }

    stickys = stickys.concat(wildPos);

    for (var i = 0; i < stickys.length; i++) {
        newView[stickys[i]] = wild;
    }

    return {
        view: newView,
        wilds: wildPos,
        stickys: stickys,
    };
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
        if (isWild(lineSymbols[i]))
            //                                              
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
                `${lineId}~${money}~${line
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

var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var ScatterWinFromView = function (view, totalBet) {
    var win = 0;

    var nScatters = NumberOfScatters(view);
    if (nScatters == 3) {
        win = totalBet * 1;
    }

    return win;
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

module.exports = SlotMachine;