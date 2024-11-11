var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    this.freeSpinCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.copySymbol = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinMore = 0;
    this.freeSpinCacheList = [];
    this.freeSpinViewSTR = "";
    this.freeSpinMultiInfo = {};

    this.moneyTotalSum = 0;
    this.jackpotFlag = false;

    //                    
    this.buyMulti = 100;
    this.buyPatternCount = 30;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];

    this.maxLimit = 500;
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var copySymbol = 14;
var moneySymbol = 15;
var doubleMoneySymbol = 16;
var extraSymbol = 17;
var multiSymbol = 18;
var moneyValueList = [5, 10, 15, 20, 25, 30, 35, 50, 60, 75, 100, 125, 250, 500];
var multiArray = [2, 3, 5, 10, 25];
var jackpotMultiArray = [500, 1250, 5000, 125000];
var jackpotPosArray = [
    [35, 36, 37, 38, 39, 45, 46, 47, 48, 49, 55, 56, 57, 58, 59],
    [30, 31, 32, 33, 34, 40, 41, 42, 43, 44, 50, 51, 52, 53, 54],
    [5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29],
    [0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24],
];
var baseReels = [
    [13, 15, 15, 15, 11, 9, 4, 14, 10, 8, 14, 14, 14, 6, 3, 3, 3, 7, 12, 15, 5, 14, 14, 15, 4, 14, 5, 3, 12, 3, 10, 11, 14, 6, 9, 5, 14, 9, 15, 10, 9, 3, 14, 9, 15, 6, 14, 9, 15, 6, 9, 5, 6, 15, 14, 7, 15, 14, 9, 15, 14, 10, 11, 8, 3, 15, 3, 14, 10, 8, 9, 15, 11, 12, 6, 9, 3, 15, 7, 5, 12, 14, 6, 7, 11, 6, 10, 4, 9, 15, 5, 15, 10, 15, 14, 10, 14, 3],
    [15, 15, 15, 14, 9, 13, 4, 3, 3, 3, 6, 14, 14, 14, 10, 2, 2, 2, 12, 2, 15, 8, 11, 5, 7, 14, 2, 10, 2, 7, 4, 2, 13, 10, 14, 12, 2, 9, 14, 4, 7, 2, 14, 2, 7, 12, 2, 10, 3, 14, 3, 2, 14, 2, 7, 14, 2, 14, 2, 14, 13, 2, 7, 2, 14, 6, 4, 13, 5, 2, 14, 7, 12, 7, 12, 14, 13, 2, 8, 12, 14, 6, 14, 7, 2, 7, 3, 14, 13, 14, 2],
    [6, 2, 2, 2, 5, 2, 8, 10, 13, 12, 9, 15, 15, 15, 11, 14, 14, 14, 4, 14, 7, 15, 3, 3, 3, 13, 7, 14, 15, 13, 2, 7, 4, 5, 7, 2, 15, 7, 13, 14, 3, 7, 9, 15, 7, 2, 15, 13, 7, 15, 2, 15, 14, 13, 5, 7, 9, 15, 2, 8, 5, 15, 13, 5, 10, 2, 14, 2, 13, 14, 3, 13, 7, 4, 13, 14, 15, 2, 4, 5, 15, 2, 14, 12, 14, 7, 15, 7, 2, 14, 9, 13, 14, 2, 10, 15, 14, 7, 14, 4, 13, 5, 13, 15, 5, 8, 9, 13, 2, 13, 15, 2, 9, 14, 3, 13, 12, 11, 2, 9, 15, 4, 14],
    [16, 15, 15, 15, 10, 2, 6, 3, 3, 3, 5, 14, 14, 14, 14, 4, 2, 2, 2, 15, 12, 9, 7, 11, 13, 8, 2, 15, 2, 3, 2, 15, 4, 5, 4, 15, 11, 14, 2, 15, 9, 2, 5, 15, 14, 4, 12, 2, 4, 9],
    [10, 10, 10, 16, 15, 13, 8, 5, 7, 15, 15, 15, 12, 11, 3, 3, 3, 6, 10, 14, 14, 14, 4, 14, 3, 9, 3, 15, 11, 4, 15, 12, 15, 4, 8, 16, 7, 12, 15, 7, 15, 9, 12, 14, 15, 4, 7, 14, 12, 9, 12, 12, 15, 15, 12, 7, 15, 4, 11, 7, 11, 7, 11, 4, 11, 3, 15, 4, 11, 16, 15, 16, 14, 12, 14, 11, 14, 4, 7, 15, 9, 15, 9, 11, 14],
];
var freeReels = [5, 11, 4, 8, 5, 6, 10, 4, 11, 15, 15, 8, 6, 5, 9, 6, 17, 3, 10, 6, 9, 5, 4, 8, 15, 15, 15, 11, 6, 9, 7, 4, 11, 3, 7, 8, 18, 6, 7, 11, 5, 3, 10, 7, 9, 4, 5, 9, 15, 10, 7, 3, 8];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 10, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 25, 20, 15, 15, 15, 15, 10, 10, 10, 10, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 30, 30, 30, 25, 25, 20, 20, 15, 15, 0, 0, 0, 0, 0],
];
var payLines = [
    [5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4],
    [10, 11, 12, 13, 14],
    [0, 6, 12, 8, 4],
    [10, 6, 2, 8, 14],
    [0, 1, 7, 3, 4],
    [10, 11, 7, 13, 14],
    [5, 1, 7, 3, 9],
    [5, 11, 7, 13, 9],
    [0, 6, 7, 8, 4],
    [10, 6, 7, 8, 14],
    [0, 6, 2, 8, 4],
    [10, 6, 12, 8, 14],
    [5, 1, 2, 3, 9],
    [5, 11, 12, 13, 9],
    [5, 6, 2, 8, 9],
    [5, 6, 12, 8, 9],
    [0, 11, 2, 13, 4],
    [10, 1, 12, 3, 14],
    [0, 11, 12, 13, 4],
    [10, 1, 2, 3, 14],
    [10, 11, 2, 13, 14],
    [0, 1, 12, 3, 4],
    [0, 1, 7, 13, 14],
    [10, 11, 7, 3, 4],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
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
        this.view = cache.view;
        this.copySymbol = cache.copy;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.copySymbol = -1;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        var fsCache = this.freeSpinCacheList[0];

        this.view = cache.scatterView;
        this.moneyTotalSum = GetMoneyTotalSum(fsCache.money);

        var temp = GetViewSTR(fsCache, player.betPerLine);
        this.freeSpinViewSTR = Buffer.from(temp).toString("base64");

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    }

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
        this.jackpotMulti = 0;
        this.jackpotFlag = false;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = 0;
    this.moneyTotalSum = GetMoneyTotalSum(cache.money);

    var jackpotWin = GetJackpotTotalSum(cache.money);
    if (!this.jackpotFlag && jackpotWin > 0) {
        this.jackpotFlag = true;
        this.winMoney = JackpotWinFromCache(cache.money, player.betPerLine);
    }

    var temp = GetViewSTR(cache, player.betPerLine, jackpotWin);
    this.freeSpinViewSTR = Buffer.from(temp).toString("base64");

    if (cache.more && cache.more > 0) {
        this.freeSpinMore = cache.more;
        this.freeSpinLength += this.freeSpinMore;
    } else {
        this.freeSpinMore = 0;
    }

    if (cache.multi && Object.keys(cache.multi).length > 0) {
        this.freeSpinMultiInfo = cache.multi;
    } else {
        this.freeSpinMultiInfo = {};
    }

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
        this.winMoney = MoneyWinFromCache(cache.money, player.betPerLine);
        this.freeSpinWinMoney += this.winMoney;
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpCache, tmpWin;

    if (baseWin > 0) {
        tmpCache = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpCache = RandomZeroView(baseReels, bpl);
    }
    tmpWin = WinFromView(tmpCache.view, bpl);

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

    var maxWin = totalBet * this.maxLimit;
    var limitWin = maxWin < jpWin ? maxWin : jpWin;

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, limitWin, isCall);
        default:
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);

    var firstCache = {};
    firstCache.view = RandomFreeView(freeReels, true);
    firstCache.money = RandomMoneyCache(firstCache.view);
    var freeSpinData = {
        length: 8,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length, firstCache);
    freeSpinData.viewList = cache.viewList;
    freeSpinData.scatterView = scatterView;

    return {
        win: cache.win,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);

    var firstCache = {};
    firstCache.view = RandomFreeView(freeReels, true);
    firstCache.money = RandomMoneyCache(firstCache.view);
    
    var freeSpinData = {
        length: 8,
        viewList: [],
    };

    //                           
    var cache = BuyBonusViewCache(freeReels, bpl, freeSpinData.length, firstCache, (totalBet * this.buyMulti) / 5);
    freeSpinData.viewList = cache.viewList;
    freeSpinData.scatterView = scatterView;

    return {
        win: cache.win,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpCache, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpCache = GetFinalView(tmpView);

        tmpWin = WinFromView(tmpCache.view, bpl);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels,bpl);
        }
    }
    return tmpCache;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpCache, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpCache = GetFinalView(tmpView);

        tmpWin = WinFromView(tmpCache.view, bpl);
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpCache;
};

var RandomView = function (reels) {
    var view = [];

    var moneySymbolCount = 0;
    if (Util.probability(5)) moneySymbolCount = 1;
    else if (Util.probability(5)) moneySymbolCount = 2;
    else if (Util.probability(5)) moneySymbolCount = 3;
    else if (Util.probability(5)) moneySymbolCount = 4;

    //                                    
    var stackReelCount = 0;
    var stackReelIndex = [];
    if (Util.probability(3)) stackReelCount = 2;
    else if (Util.probability(3)) stackReelCount = 3;

    if (stackReelCount > 0) {
        stackReelIndex.push(0);
        if (stackReelIndex.length < stackReelCount) {
            while (true) {
                var rand = Util.random(0, slotWidth);
                if (stackReelIndex.indexOf(rand) == -1) stackReelIndex.push(rand);
                if (stackReelIndex.length >= stackReelCount) break;
            }
        }
    }

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

        var doubleCount = NumberOfDoubleSymbols(view);
        var moneyCount = NumberOfMoneySymbols(view);

        if (moneyCount == moneySymbolCount && doubleCount < 2 && (doubleCount == 0 || Util.probability(5))) {
            break;
        }
    }

    if (stackReelCount > 0) {
        for (var i = 0; i < stackReelIndex.length; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = j * slotWidth + stackReelIndex[i];
                view[pos] = 3;
            }
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

        if (NumberOfMoneySymbols(view) == 0 && WinFromView(view, bpl) == 0) {
            break;
        }
    }

    var moneyCount = 6;
    if (Util.probability(10)) moneyCount = 7;
    else if (Util.probability(10)) moneyCount = 8;
    else if (Util.probability(10)) moneyCount = 9;

    var stackReelCount = Math.floor(moneyCount / slotHeight);

    var stackReelIndex = [];
    var moneySymbols = [];

    while (true) {
        var rand = Util.random(0, slotWidth);
        if (stackReelIndex.indexOf(rand) == -1) stackReelIndex.push(rand);
        if (stackReelIndex.length >= stackReelCount) break;
    }

    for (var i = 0; i < stackReelIndex.length; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = j * slotWidth + stackReelIndex[i];
            moneySymbols.push(pos);
        }
    }

    while (true) {
        var rand = Util.random(0, view.length);
        if (moneySymbols.indexOf(rand)) moneySymbols.push(rand);
        if (moneySymbols.length >= moneyCount) break;
    }

    for (var k = 0; k < moneySymbols.length; k++) {
        view[moneySymbols[k]] = moneySymbol;
    }

    return view;
};

//                                                             
var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, firstCache) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen, firstCache)

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

//                                                             
var BuyBonusViewCache = function (reels, bpl, fsLen, firstCache, lowLimit = 0) {
    var jackpotFlag = false;

    while (true) {
        var freeSpinData = {};
        var freeSpinIndex = 0;
        var freeSpinLength = fsLen;
        var freeSpinViewList = [];

        freeSpinViewList.push(firstCache);

        while (true) {
            var fsCache = {};
            fsCache.view = RandomFreeView(reels);
            fsCache.money = RandomMoneyCache(fsCache.view);

            //                                    
            var finalCache = GetFinalCache(fsCache, freeSpinViewList[freeSpinViewList.length - 1]);

            if (finalCache.more && finalCache.more > 0) freeSpinLength += finalCache.more;

            freeSpinViewList.push(finalCache);

            freeSpinIndex++;
            if (freeSpinIndex >= freeSpinLength) {
                freeSpinData.viewList = freeSpinViewList;
                freeSpinData.win = MoneyWinFromCache(finalCache.money, bpl);
                freeSpinData.win += JackpotWinFromCache(finalCache.money, bpl);

                //                                 
                jackpotFlag = isOnlyOneJackpot(finalCache.money);
                break;
            }
        }

        if (jackpotFlag && freeSpinData.win >= lowLimit) {
            return freeSpinData;
        }
    }
};

var RandomFreeView = function (reel, isFirst = false) {
    var view = [];
    var subView = [];

    while (true) {
        view = [];

        for (var k = 0; k < 4; k++) {
            subView = [];
            for (var i = 0; i < slotWidth; i++) {
                var len = reel.length;
                var randomIndex = Util.random(0, len);
                for (var j = 0; j < slotHeight; j++) {
                    var viewPos = i + j * slotWidth;
                    var reelPos = (randomIndex + j) % len;
                    subView[viewPos] = reel[reelPos];
                }
            }
            view = view.concat(subView);
        }

        var extraCount = NumberOfExtraSymbols(view);
        var multiCount = NumberOfMultiSymbols(view);

        var extraFlag, multiFalg;
        if (isFirst) {
            extraFlag = extraCount == 0;
            multiFalg = multiCount == 0;
        } else {
            extraFlag = extraCount < 3 && (extraCount == 0 || Util.probability(30));
            multiFalg = multiCount < 2 && (multiCount == 0 || Util.probability(5));
        }

        if (extraFlag && multiFalg) {
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

var RandomMoneyCache = function (view) {
    var values = [];
    var table = [];

    for (var i = 0; i < view.length; i++) {
        if (view[i] == moneySymbol) {
            table[i] = "v";
            if (Util.probability(80)) {
                values[i] = moneyValueList[Util.random(0, 8)];
            } else {
                values[i] = moneyValueList[Util.random(0, moneyValueList.length)];
            }
        } else if (view[i] == extraSymbol) {
            table[i] = "fs";
            values[i] = 1;
        } else if (view[i] == multiSymbol) {
            table[i] = "m";
            values[i] = multiArray[Util.random(0, 2)];
        } else {
            table[i] = "r";
            values[i] = 0;
        }
    }

    return { table, values };
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

var GetFinalView = function (view) {
    var newView = Util.clone(view);
    var cache = {};
    var copyCount = NumberOfCopySymbols(view);

    if (copyCount > 0) {
        var randomSymbol = Util.random(3, 14);
        for (var i = 0; i < newView.length; i++) {
            if (view[i] == copySymbol) {
                newView[i] = randomSymbol;
            }
        }

        cache.view = newView;
        if (randomSymbol != 3) cache.copy = randomSymbol;
    } else {
        cache.view = newView;
        cache.copy = -1;
    }

    return cache;
};

var GetViewSTR = function (cache, bpl, jackpotWin) {
    var view = cache.view;
    var table = cache.money.table;
    var values = cache.money.values;

    var totalMulti = GetMoneyTotalSum(cache.money);
    var totalWin = MoneyWinFromCache(cache.money, bpl);

    var jackpotInfo = "";
    if (jackpotWin > 0) {
        jackpotInfo = `apt:"ma",apv:"${jackpotWin}",apwa:"${jackpotWin * bpl}",`;
    }

    var result = `{gp:{${jackpotInfo}mo:"${values.join()}",mo_t:"${table.join()}",mo_tv:"${totalMulti}",mo_tw:"${totalWin}",reel_set:"1",s:"${view.join()}",sh:"6",st:"rect",sw:"10"}}`;
    return result;
};

var GetFinalCache = function (currCache, prevCache) {
    var finalCache = {};
    var finalView = [];
    var finalTable = [];
    var finalValues = [];

    var fsMoreCount = 0;
    var multiSymbolPos = -1;

    for (var i = 0; i < currCache.view.length; i++) {
        var prevSymbol = prevCache.view[i];
        var currSymbol = currCache.view[i];

        if (prevSymbol == moneySymbol || prevSymbol == extraSymbol || prevSymbol == multiSymbol) {
            finalView[i] = prevCache.view[i];
            finalTable[i] = prevCache.money.table[i];
            finalValues[i] = prevCache.money.values[i];
        } else {
            finalView[i] = currCache.view[i];
            finalTable[i] = currCache.money.table[i];
            finalValues[i] = currCache.money.values[i];
        }

        if (isNormalSymbol(prevSymbol)) {
            if (currSymbol == extraSymbol) {
                fsMoreCount++;
            } else if (currSymbol == multiSymbol) {
                multiSymbolPos = i;
            }
        }
    }

    finalCache = {
        view: finalView,
        money: {
            table: finalTable,
            values: finalValues,
        },
    };

    if (fsMoreCount > 0) {
        finalCache.more = fsMoreCount;
    }

    if (multiSymbolPos > -1) {
        var rand;
        while (true) {
            rand = Util.random(0, currCache.view.length);
            if (finalCache.view[rand] == moneySymbol) break;
        }

        var prevMulti = finalCache.money.values[rand];
        var multiValue = finalCache.money.values[multiSymbolPos];
        var afterMulti = prevMulti * multiValue;
        finalCache.money.values[rand] = afterMulti;

        finalCache.multi = {
            rand: rand,
            prev: prevMulti,
            after: afterMulti,
            pos: multiSymbolPos,
            multi: multiValue,
        };
    }

    return finalCache;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isNormalSymbol = function (symbol) {
    if (symbol >= 3 && symbol <= 13) {
        return true;
    } else {
        return false;
    }
};

var isFreeSpinWin = function (view) {
    return NumberOfMoneySymbols(view) >= 6;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == moneySymbol) {
            result++;
        } else if (view[i] == doubleMoneySymbol) {
            result += 2;
        }
    }
    return result;
};

var NumberOfDoubleSymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == doubleMoneySymbol) {
            result++;
        }
    }
    return result;
};

var NumberOfCopySymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == copySymbol) {
            result++;
        }
    }
    return result;
};

var NumberOfExtraSymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == extraSymbol) {
            result++;
        }
    }
    return result;
};

var NumberOfMultiSymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == multiSymbol) {
            result++;
        }
    }
    return result;
};

var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;

    for (var i = 0; i < moneyCache.values.length; i++) {
        if (moneyCache.table[i] == "v") {
            win += moneyCache.values[i];
        }
    }
    return win * bpl;
};

var JackpotWinFromCache = function (moneyCache, bpl) {
    var win = 0;

    //              
    for (var k = 0; k < jackpotPosArray.length; k++) {
        var count = 0;
        for (var p = 0; p < jackpotPosArray[k].length; p++) {
            if (moneyCache.table[jackpotPosArray[k][p]] != "r") {
                count++;
            }
        }

        if (count >= 15) {
            win += jackpotMultiArray[k];
        }
    }

    return win * bpl;
};

var GetMoneyTotalSum = function (moneyCache) {
    var result = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        if (moneyCache.table[i] == "v") {
            result += moneyCache.values[i];
        }
    }

    return result;
};

var GetJackpotTotalSum = function (moneyCache) {
    var result = 0;

    //              
    for (var k = 0; k < jackpotPosArray.length; k++) {
        var count = 0;
        for (var p = 0; p < jackpotPosArray[k].length; p++) {
            if (moneyCache.table[jackpotPosArray[k][p]] != "r") {
                count++;
            }
        }

        if (count >= 15) {
            result += jackpotMultiArray[k];
        }
    }

    return result;
};

//                    , Mini    Minor          
var isOnlyOneJackpot = function (moneyCache) {
    var result = [];

    //              
    for (var k = 0; k < jackpotPosArray.length; k++) {
        var count = 0;
        for (var p = 0; p < jackpotPosArray[k].length; p++) {
            if (moneyCache.table[jackpotPosArray[k][p]] != "r") {
                count++;
            }
        }

        if (count >= 15) {
            result.push(k);
        }
    }

    var typeFlag = true;
    for (var m = 0; m < result.length; m++) {
        if (result[m] > 1) typeFlag = false;
    }

    return result.length < 2 && typeFlag;
};

module.exports = SlotMachine;