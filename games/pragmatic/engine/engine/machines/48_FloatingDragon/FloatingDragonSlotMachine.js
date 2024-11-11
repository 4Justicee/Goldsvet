var Util = require("../../../utils/slot_utils");

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
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    this.moneyTotalValue = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                       
    this.isFreeSpinAdd = false;
    this.freeRespinLevel = 1;
    this.freeSpinWildCount = 0;

    //                             
    this.bonusSpinCacheList = [];
    this.bonusSpinIndex = 0;
    this.bonusSpinLength = 3;
    this.moneyBonusWin = 0;
    this.bonusWin = 0;
    this.lifes = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"]; //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, fish = 8, coin = 0;
var slotWidth = 5, slotHeight = 3;
var freeSpinCount = 10, respinWildCount = 4;

var baseReels = [
    [13, 7, 8, 9, 11, 1, 6, 7, 13, 8, 12, 7, 6, 11, 7, 6, 9, 8, 8, 13, 5, 11, 6, 9, 5, 11, 4, 13, 9, 11, 5, 9, 10, 1, 13, 11, 10, 5, 4, 11, 6, 9, 13, 4, 7, 9, 13, 7, 5, 11, 12, 13, 9, 8, 8, 8, 8, 8],
    [7, 5, 4, 10, 8, 12, 4, 9, 7, 4, 10, 8, 12, 6, 11, 7, 4, 10, 8, 8, 13, 4, 5, 12, 4, 7, 1, 10, 6, 12, 10, 7, 12, 5, 10, 4, 6, 5, 12, 7, 4, 6, 12, 1, 13, 10, 11, 5, 4, 12, 6, 1, 10, 9, 8, 8, 8, 8, 8],
    [7, 13, 1, 4, 7, 8, 0, 0, 0, 12, 4, 6, 8, 11, 5, 4, 6, 1, 10, 5, 6, 7, 8, 8, 13, 10, 6, 5, 4, 9, 6, 7, 12, 5, 7, 1, 11, 4, 7, 5, 4, 9, 8, 8, 8, 8, 8],
    [5, 6, 8, 7, 1, 13, 6, 1, 9, 8, 7, 5, 12, 4, 10, 8, 8, 11, 7, 4, 6, 1, 8, 8, 8, 8, 8],
    [6, 5, 7, 8, 12, 1, 5, 9, 8, 6, 4, 13, 1, 8, 8, 11, 1, 7, 10, 8, 8, 8, 8, 8],
];

var freeReels = [
    [13, 7, 8, 9, 11, 2, 6, 7, 13, 8, 12, 7, 6, 11, 7, 6, 9, 8, 8, 13, 5, 11, 6, 9, 5, 11, 4, 13, 9, 11, 5, 9, 10, 2, 13, 11, 10, 5, 4, 11, 6, 9, 13, 4, 7, 9, 13, 7, 5, 11, 12, 13, 9, 8, 8, 8, 8, 8],
    [7, 5, 4, 10, 8, 12, 4, 9, 7, 4, 10, 8, 12, 6, 11, 7, 4, 10, 8, 8, 13, 4, 5, 12, 4, 7, 2, 10, 6, 12, 10, 7, 12, 5, 10, 4, 6, 5, 12, 7, 4, 6, 12, 2, 13, 10, 11, 5, 4, 12, 6, 2, 10, 9, 8, 8, 8, 8, 8],
    [7, 13, 2, 4, 7, 8, 12, 4, 6, 8, 11, 5, 4, 6, 2, 10, 5, 6, 7, 8, 8, 13, 10, 6, 5, 4, 9, 6, 7, 12, 5, 7, 2, 11, 4, 7, 5, 4, 9, 8, 8, 8, 8, 8],
    [5, 6, 8, 7, 2, 13, 6, 2, 9, 8, 7, 5, 12, 4, 10, 8, 8, 11, 7, 4, 6, 2, 8, 8, 8, 8, 8],
    [6, 5, 7, 8, 12, 2, 5, 9, 2, 8, 6, 4, 13, 8, 8, 11, 2, 7, 10, 8, 8, 8, 8, 8],
];

var holdAndSpinReels = [
    [3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [0],
    [3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 3, 0, 0, 0]
];

var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 50, 30, 20, 20, 10, 5, 5, 5, 5, 5, 0, 0],
    [0, 0, 0, 0, 200, 150, 100, 100, 50, 25, 25, 25, 25, 25, 0, 0],
    [0, 0, 0, 0, 2000, 1000, 500, 500, 200, 100, 100, 100, 100, 100, 0, 0],
];

var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [5, 1, 2, 3, 9], // 4
    [5, 11, 12, 13, 9], // 5
    [10, 6, 2, 8, 14], // 6
    [0, 6, 12, 8, 4], // 7
    [10, 11, 7, 3, 4], // 8
    [0, 1, 7, 13, 14], // 9
    [10, 6, 7, 8, 4], // 10
];

var moneySymbolValues = [10, 20, 30, 40, 50, 100, 150, 200, 250, 500];
var coinSymbols = [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15];
var coinSymbolValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 140, 160, 180, 200, 1000, 2000, 3000, 4000, 49930];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 25; //                                 ,                                               ,                                     .
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
        this.moneyCache = RandomMoneySymbols(this.view);
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
        this.freeSpinLength = GetFreeSpinCounts(this.view);
    } else {
        this.bonusSpinCacheList = viewCache.view;
        this.view = this.bonusSpinCacheList[0].view;
        this.moneyCache = this.bonusSpinCacheList[0].moneyCache;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeRespinLevel = 1;
        this.freeSpinWildCount = 0;
        this.scatterPositions = ScatterPositions(this.view);
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }

    //                        
    if (isHoldAndSpinWin(this.view)) {
        this.bonusSpinIndex = 1;
        this.bonusSpinLength = 3;
        this.lifes = 3;
        this.bonusWin = MoneyCoinWinFromCache(this.moneyCache, player.betPerLine, true);
        this.moneyBonusWin = this.bonusWin;
        this.currentGame = "BONUS";

        for (var i = 0; i < slotHeight; i++) {
            this.view[2 + i * slotWidth] = 14;
        }
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    this.winMoney = WinFromView(this.view, player.betPerLine) + MoneyWinFromCache(this.moneyCache, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinWildCount += NumberOfWilds(this.view);
    this.freeSpinWinMoney += this.winMoney;
    this.isFreeSpinAdd = false;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        if (this.freeSpinWildCount >= this.freeRespinLevel * 4 && this.freeRespinLevel < 4) {
            this.freeRespinLevel++;
            this.freeSpinLength += freeSpinCount;
            this.isFreeSpinAdd = true;
        } else {
            this.currentGame = "BASE";
        }
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var cache = this.bonusSpinCacheList[this.bonusSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    this.bonusWin = MoneyCoinWinFromCache(this.moneyCache, player.betPerLine);

    if (this.bonusWin == 0) {
        this.lifes--;
    } else {
        this.lifes = 3;
        this.bonusWin += MoneyCoinWinFromCache(this.moneyCache, player.betPerLine, true);
    }

    this.bonusSpinIndex++;
    this.moneyBonusWin += this.bonusWin;

    if (this.lifes == 0 && this.moneyBonusWin < (this.lineCount * player.betPerLine * 20)) {
        this.lifes = 3;
    }

    if (this.bonusSpinIndex > this.bonusSpinCacheList.length - 1) {
        this.currentGame = "BASE";
        this.winMoney = this.moneyBonusWin;
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
            break;
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default:
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    var fsCount = GetFreeSpinCounts(scatterView);
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var holdAndSpinView = RandomBonusView(baseReels, bpl);
    var moneyCache = RandomMoneySymbols(holdAndSpinView);
    var bonusWin = MoneyCoinWinFromCache(moneyCache, bpl, true);
    var bonusView = {
        view: holdAndSpinView,
        moneyCache: moneyCache
    }
    var bonusSpinData = RandomBonusViewCache(holdAndSpinReels, bpl, bsWin, moneyCache, totalBet);
    var bonusCacheList = [bonusView];

    var pattern = {
        view: bonusCacheList.concat(bonusSpinData.cache),
        bpl: bpl,
        win: bonusSpinData.win + bonusWin,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView,
        tmpWin,
        bottomLimit = 0,
        calcCount = 0;

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

var RandomView = function (reels, isHoldAndSpin = false) {
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

        if (isHoldAndSpin) {
            break;
        } else {
            if (!isFreeSpinWin(view) && !isHoldAndSpinWin(view)) {
                break;
            }
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

        if (isFreeSpinWin(view) && !isHoldAndSpinWin(view)) {
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
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinWildCount = 0;
        var moneyCache = {};
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinLevel = 1;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (true) {
            while (true) {
                tmpView = RandomView(reels);
                if (NumberOfWilds(tmpView) >= 2 && NumberOfMoneySymbols(tmpView) > 0) {
                    continue;
                }
                if (NumberOfWilds(tmpView) == 1 && NumberOfMoneySymbols(tmpView) == 0) {
                    continue;
                }
                if (Util.probability(30) || NumberOfWilds(tmpView) == 0) {
                    break;
                }
            }

            freeSpinWildCount += NumberOfWilds(tmpView);
            moneyCache = RandomMoneySymbols(tmpView, freeSpinLevel);
            tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(moneyCache, bpl);

            var freeSpinData = {
                view: tmpView,
                moneyCache: moneyCache,
            };
            freeSpinCacheList.push(freeSpinData);

            freeSpinTotalWin += tmpWin;

            freeSpinIndex++;
            if (freeSpinIndex > freeSpinLength) {
                //                 
                if (freeSpinWildCount >= respinWildCount * freeSpinLevel && freeSpinLevel < 4) {
                    freeSpinLength += freeSpinCount;
                    freeSpinLevel++;
                    continue;
                } else {
                    break;
                }
            } else {
                continue;
            }
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

        if (isHoldAndSpinWin(view) && WinFromView(view, bpl) == 0 && !isFreeSpinWin(view)) {
            break;
        }
    }

    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin, moneyCache, totalBet) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var bonusSpinCacheList = [];
        var bonusSpinIndex = 1;
        var bonusSpinLength = 3;
        var bonusSpinWin = 0;
        var lifes = 3;

        while (true) {
            var view = RandomView(reels, true);
            var viewData = RandomCoinCache(view, moneyCache);
            var winMoney = MoneyCoinWinFromCache(viewData.moneyCache, bpl);

            if (winMoney > 0 && Util.probability(40)) {
                continue;
            }

            bonusSpinCacheList.push(viewData);

            if (winMoney == 0) {
                bonusSpinIndex++;
                lifes--;
            } else {
                bonusSpinIndex = 1;
                winMoney += MoneyCoinWinFromCache(viewData.moneyCache, bpl, true);
            }

            bonusSpinWin += winMoney;

            if (lifes == 0 && bonusSpinWin < totalBet * 20) {
                bonusSpinIndex = 1;
                lifes = 3;
            }

            if (bonusSpinIndex > bonusSpinLength) {
                break;
            }
        }

        holdAndSpinData = {
            cache: bonusSpinCacheList,
            win: bonusSpinWin,
        };


        if (holdAndSpinData.win >= minMoney && holdAndSpinData.win <= maxMoney) {
            return holdAndSpinData;
        }

        if (holdAndSpinData.win > lowerLimit && holdAndSpinData.win < minMoney) {
            lowerLimit = holdAndSpinData.win;
            lowerView = holdAndSpinData;
        }
        if (holdAndSpinData.win > maxMoney && holdAndSpinData.win < upperLimit) {
            upperLimit = holdAndSpinData.win;
            upperView = holdAndSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
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

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }
    return payTable[matchCount][symbol] * bpl;
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

var RandomCoinCache = function (view, moneyCache) {
    var tmpView = Util.clone(view);
    var table = [], values = [];
    var diamondAdd = true;
    for (var i = 0; i < tmpView.length; i++) {
        if (isCoin(tmpView[i])) {
            if (i % slotWidth != 2) {
                table[i] = "c";
                var coinIndex;
                if (Util.probability(70)) {
                    coinIndex = Util.random(0, 5);
                } else if (Util.probability(80)) {
                    coinIndex = Util.random(5, coinSymbolValues.length - 5);
                } else {
                    if (diamondAdd) {
                        coinIndex = Util.random(coinSymbolValues.length - 5, coinSymbolValues.length);
                        diamondAdd = false;
                    }
                }
                values[i] = coinSymbolValues[coinIndex];
                tmpView[i] = coinSymbols[coinIndex];
            } else {
                table[i] = "c";
                values[i] = moneyCache.values[i];
                tmpView[i] = 14;
            }
        } else {
            table[i] = "r";
            values[i] = 0;
        }
    }

    return {
        view: tmpView,
        moneyCache: {
            table: table,
            values: values
        }
    }
};

var MoneyCoinWinFromCache = function (moneyCache, bpl, isFirst = false) {
    var winMoney = 0;
    if (isFirst) {
        for (var i = 0; i < slotHeight; i++) {
            winMoney += moneyCache.values[i * slotWidth + 2] * bpl;
        }
    } else {
        for (var i = 0; i < moneyCache.table.length; i++) {
            if (moneyCache.table[i] == "c" && i % slotWidth != 2) {
                winMoney += moneyCache.values[i] * bpl;
            }
        }
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isHoldAndSpinWin = function (view) {
    for (var i = 0; i < slotHeight; i++) {
        if (!isCoin(view[2 + i * slotWidth])) {
            return false;
        }
    }
    return true;
};

var GetFreeSpinCounts = function (view) {
    var nScatters = NumberOfScatters(view);
    switch (nScatters) {
        case 3:
            return 10;
        case 4:
            return 15;
        case 5:
            return 20;
    }
    return 0;
};

var FreeSpinMultiByLevel = function (level) {
    switch (level) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
            return 3;
        case 4:
            return 10;
    }
    return 1;
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


var isMoney = function (symbol) {
    return symbol == fish;
};

var isCoin = function (symbol) {
    return symbol == coin;
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

var RandomMoneySymbols = function (view, level) {
    var table = [],
        values = [];
    for (var i = 0; i < view.length; i++) {
        if (isCoin(view[i])) {
            table[i] = "c";
            var coin = 0;
            if (Util.probability(90)) {
                coin = coinSymbolValues[Util.random(0, 5)];
            } else if (Util.probability(90)) {
                coin = coinSymbolValues[Util.random(0, 8)];
            } else {
                coin = coinSymbolValues[Util.random(0, 10)];
            }
            values[i] = coin;
        } else if (isMoney(view[i])) {
            table[i] = "v";
            var value = 0;
            if (Util.probability(5)) {
                value = moneySymbolValues[Util.random(0, moneySymbolValues.length)];
            } else if (Util.probability(10)) {
                value = moneySymbolValues[Util.random(0, moneySymbolValues.length / 2)];
            } else {
                value = moneySymbolValues[Util.random(0, moneySymbolValues.length / 4)];
            }
            values[i] = value;
        } else if (isWild(view[i])) {
            table[i] = "mma";
            values[i] = FreeSpinMultiByLevel(level);
        } else {
            table[i] = "r";
            values[i] = 0;
        }
    }

    return { table, values };
};

var MoneyWinFromCache = function (moneyCache, bpl) {
    var moneyWin = 0,
        multi = 0;
    for (var i = 0; i < moneyCache.table.length; i++) {
        if (moneyCache.table[i] == "v") {
            moneyWin += moneyCache.values[i];
        } else if (moneyCache.table[i] == "mma") {
            multi = moneyCache.values[i];
        }
    }
    moneyWin *= multi;
    return moneyWin * bpl;
};

module.exports = SlotMachine;