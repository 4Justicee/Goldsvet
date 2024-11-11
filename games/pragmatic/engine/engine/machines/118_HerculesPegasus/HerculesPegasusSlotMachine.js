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
    this.multi = 1;
    //             
    this.randomSpinCache = {};
    this.randomSpinMode = 0;
    this.randomSpinIndex = 0;
    this.randomSpinLength = 0;
    this.randomInd = 0;
    //                           
    this.bottlePos = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinLevel = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [2, 9, 10, 11, 3, 3, 3, 9, 10, 8, 6, 10, 4, 9, 8, 5, 9, 0, 7, 8],
    [5, 9, 8, 4, 7, 4, 9, 11, 4, 7, 5, 2, 10, 9, 5, 11, 6, 9, 10, 11, 3, 3, 3, 10, 6, 9, 8],
    [11, 10, 5, 7, 6, 11, 4, 7, 11, 3, 3, 3, 9, 11, 0, 9, 10, 4, 8, 5, 10, 2, 7, 0],
    [11, 10, 7, 6, 10, 11, 3, 3, 3, 8, 5, 9, 7, 2, 4, 9, 8, 5, 9],
    [6, 10, 9, 3, 3, 3, 9, 10, 2, 8, 10, 5, 8, 6, 11, 9, 6, 11, 9, 13, 4, 11, 6, 7, 8, 11, 4, 9, 8, 5, 10, 7, 14, 4, 11, 10, 2, 8]
];
var freeReels = [
    [9, 2, 7, 10, 11, 3, 3, 3, 9, 10, 8, 6, 10, 4, 9, 8, 5, 9, 10],
    [5, 9, 8, 4, 7, 11, 4, 8, 10, 2, 7, 11, 8, 2, 3, 3, 3, 10, 6, 9, 8, 7, 9, 6, 11],
    [7, 11, 8, 7, 2, 10, 7, 2, 8, 9, 2, 7, 4, 8, 5, 10, 6, 9, 8, 3, 3, 3],
    [11, 10, 7, 6, 10, 11, 5, 5, 8, 3, 3, 3, 11, 9, 5, 8, 10, 2, 8, 10, 9, 7, 4, 11, 5, 9, 8, 6, 9],
    [6, 10, 9, 7, 6, 9, 11, 3, 10, 6, 7, 0, 10, 5, 8, 3, 11, 8, 5, 10, 0, 7, 8, 9, 2, 5, 10, 0, 4, 11, 10, 8, 5, 0, 10, 3, 7, 9]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 40, 20, 20, 8, 8, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 140, 100, 100, 20, 20, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 400, 300, 200, 200, 100, 100, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],          // 3
    [0, 6, 12, 8, 4],          // 4
    [10, 6, 2, 8, 14],          // 5
    [5, 1, 2, 3, 9],          // 6
    [5, 11, 12, 13, 9],          // 7
    [0, 1, 7, 13, 14],          // 8
    [10, 11, 7, 3, 4],          // 9
    [5, 11, 7, 3, 9],          // 10
    [5, 1, 7, 13, 9],          // 11
    [0, 6, 7, 8, 4],          // 12
    [10, 6, 7, 8, 14],          // 13
    [0, 6, 2, 8, 4],          // 14
    [10, 6, 12, 8, 14],          // 15
    [5, 6, 2, 8, 9],          // 16
    [5, 6, 12, 8, 9],          // 17
    [0, 1, 12, 3, 4],           // 18
    [10, 11, 2, 13, 14],           // 19
    [0, 11, 12, 13, 4],         // 20
];
var bonus = 0;
var zeus = 12;
var pegasus = 13, hercules = 14;
var hercBottle = 15, pegaBottle = 16;
var hercWild = 17, pegaWild = 18;
var percentList = {
    randomSpinPercent: 34,
    hercRespinPercent: 7,
    pegaWinPercent: 70,
    pegaMultiPercent: 12,
    hercWildAppearPercent: 12,
    bonusSelectPercent: 12,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.stackSymbol = Util.random(3, 12);
    this.multi = 1;

    if (this.randomSpinMode) {
        if (this.RandomSpin(player)) {
            return;
        }
    }

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    this.randomSpinMode = 0;
    this.randomSpinIndex = 0;

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.FreeSpinInit();
    }
    else if (viewCache.mode) {
        this.randomSpinCache = viewCache.view;
        this.randomSpinMode = viewCache.mode;
        this.view = Util.sameArray(slotWidth * slotHeight, 19);
    } else { //               
        this.view = viewCache.view;

        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winLines = WinLinesFromView(this.view, 1, player.betPerLine);
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.randomInd = Number(param.ind);
}

SlotMachine.prototype.RandomSpin = function (player) {
    if (this.randomSpinIndex == this.randomSpinCache.length) {
        this.randomSpinMode = 0;
        return false;
    }

    if (this.randomSpinMode == 4) {
        if (this.randomSpinIndex == 0) {
            this.randomSpinIndex++;
            this.freeSpinCacheList = this.randomSpinCache;
            this.FreeSpinInit();

            return true;
        }

        return false;
    }

    this.view = this.randomSpinCache[this.randomSpinIndex++].view;

    if (this.randomSpinMode == 3) {
        this.stackSymbol = this.randomSpinCache[0].msr;
        this.maskView = getZeusView(this.view, this.stackSymbol);
    } else {
        this.wPosArr = Util.positionsFromView(this.view, isWild);
        this.maskView = Util.getMaskView(this.view, 12, isWild);
    }

    if (this.randomSpinCache[0].multi) {
        this.multi = this.randomSpinCache[0].multi;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine) * this.multi;
    this.winLines = WinLinesFromView(this.view, this.multi, player.betPerLine);

    return true;
}

SlotMachine.prototype.FreeSpinInit = function () {
    this.freeSpinType = this.freeSpinCacheList[0].type;
    this.view = this.freeSpinCacheList[0].view;
    this.freeSpinIndex = 1;
    this.freeSpinLength = this.freeSpinCacheList.length;
    this.freeSpinLevel = 0;
    this.freeSpinWinMoney = 0;
    this.currentGame = "FREE";
}

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex++];
    this.maskView = [];

    if (this.freeSpinType == 2) {
        this.multi = this.freeSpinLevel + 1;
    }

    this.bottlePos = this.view.indexOf(this.freeSpinType == 1 ? hercBottle : pegaBottle);

    if (this.bottlePos >= 0) {
        this.freeSpinLevel++;
        this.maskView = [...this.view];
        this.maskView[this.bottlePos] = bonus;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine) * this.multi;
    this.winLines = WinLinesFromView(this.view, this.multi, player.betPerLine);

    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex >= this.freeSpinLength) {
        this.randomSpinMode = 0;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {};
    var tmpView, tmpWin = 0;
    //                            [      ] *                                                             ~~                 .

    if (baseWin >= 0) {
        if (baseWin > totalBet * 12 && Util.probability(percentList.randomSpinPercent)) {
            pattern.mode = Util.random(1, 4);

            if (Util.probability(percentList.bonusSelectPercent)) {
                pattern.mode = 4;
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
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin);
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin, Util.random(1, 3));

    return {
        win: freeSpinData.win,
        bpl: bpl,
        view: freeSpinData.cache,
        type: "FREE",
        isCall: isCall ? 1 : 0
    }
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
        if (!isFreeSpinWin(view)) {
            break;
        }
    }

    return view;
};

var getZeusView = function (view, msr) {
    var res = [...view];

    for (var i = 0; i < view.length; ++i) {
        if (view[i] == msr) {
            res[i] = zeus;
        }
    }

    return res;
};

var MsrFromMode = function (mode) {
    switch (mode) {
        case 1:
            return hercWild;
        case 2:
            return pegaWild;
        case 3:
            return Util.random(3, 12);
        default:
            break;
    }
};

var RandomSpinView = function (reels, mode, msr) {
    var tmpView = RandomView(reels);

    var changeCount = Util.random(4, 8);

    if (mode == 3) {
        changeCount = Util.random(6, 10);
    }

    var randomPosArr = Util.randomPositionArray(slotWidth, slotHeight, changeCount);

    for (var i = 0; i < randomPosArr.length; ++i) {
        tmpView[randomPosArr[i]] = msr;
    }

    return tmpView;
};

var RandomSpinViewCache = function (reels, bpl, maxWin, mode, step = 0) {
    if (mode == 4) {
        return RandomFreeViewCache(freeReels, bpl, maxWin, Util.random(1, 3));
    }

    var randomSpinData = {};
    var msr = MsrFromMode(mode);
    var tmpView = RandomSpinView(reels, mode, msr);
    var tmpWin = WinFromView(tmpView, bpl);
    var viewList = [];

    if (mode == 1) {      //                  
        viewList.push({
            view: tmpView
        });

        if (Util.probability(percentList.hercRespinPercent)) {

            tmpView = RandomSpinView(reels, mode, msr);
            tmpWin += WinFromView(tmpView, bpl);
            viewList.push({
                view: tmpView
            });
        }
    } else {
        var cache = {
            view: tmpView
        };

        if (mode == 2) {  //                  

            if (Util.probability(percentList.pegaMultiPercent)) {
                cache.multi = 2;
                tmpWin *= randomSpinData.multi;
            }
        }

        if (mode == 3) {   //            
            cache.msr = msr;
        }

        viewList.push(cache);

    }
    randomSpinData.cache = viewList;
    randomSpinData.win = tmpWin;

    if (tmpWin <= maxWin || step > 100) {
        return randomSpinData;
    }

    return RandomSpinViewCache(reels, bpl, maxWin, mode, step + 1);
};

var RandomScatterView = function (reels, bpl, symbol) {
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
        if (isFreeSpinWin(view, symbol) && WinFromView(view, bpl) == 0) {
            break;
        }
    }

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsType = 1) {
    var minMoney = Util.max(fsWin * 0.8, 0);
    var maxMoney = Util.max(fsWin * 1.2, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = {};

        if (fsType == 1) {
            freeSpinData = RandomHerculesViewCache(reels, bpl);
        } else if (fsType == 2) {
            freeSpinData = RandomPegasusViewCache(reels, bpl);
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

var RandomHerculesViewCache = function (reels, bpl) {
    var scatterView = RandomScatterView(baseReels, bpl, hercules);
    var freeSpinCacheList = [{
        view: scatterView,
        type: 1
    }];
    var freeSpinTotalWin = 0;
    var tmpView = 0;
    var freeSpinLevel = 1;

    while (freeSpinLevel <= 5) {
        while (true) {
            tmpView = RandomView(reels);

            if (Util.count(tmpView, wild) == 0) {
                break;
            }
        }

        if (Util.probability(percentList.hercWildAppearPercent * freeSpinLevel)) {
            var randomPosArr = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight);
            var wildCount = Util.random(3, freeSpinLevel + 3);

            for (var i = 0; i < wildCount; ++i) {
                var pos = randomPosArr.shift();

                if (tmpView[pos] != bonus) {
                    tmpView[pos] = wild;
                }
            }
        }

        var bonusPos = tmpView.indexOf(bonus);

        if (bonusPos >= 0) {
            tmpView[bonusPos] = hercBottle;
            ++freeSpinLevel;
        }

        freeSpinCacheList.push(tmpView);
        freeSpinTotalWin += WinFromView(tmpView, bpl);
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
    }
};

var RandomPegasusViewCache = function (reels, bpl) {
    var scatterView = RandomScatterView(baseReels, bpl, pegasus);
    var freeSpinCacheList = [{
        view: scatterView,
        type: 2
    }];
    var freeSpinTotalWin = 0;
    var tmpView = 0;
    var freeSpinLevel = 1;

    while (freeSpinLevel <= 5) {
        while (true) {
            tmpView = RandomView(reels);
            tmpWin = WinFromView(tmpView, bpl);

            if (tmpWin && Util.probability(percentList.pegaWinPercent) || tmpWin == 0) {
                break;
            }
        }

        freeSpinCacheList.push(tmpView);
        freeSpinTotalWin += tmpWin * freeSpinLevel;

        var bonusPos = tmpView.indexOf(bonus);

        if (bonusPos >= 0) {
            tmpView[bonusPos] = pegaBottle;
            ++freeSpinLevel;
        }

    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
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

var WinLinesFromView = function (view, multi, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl) * multi;
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
    return symbol == wild || symbol == hercWild || symbol == pegaWild;
};

var isFreeSpinWin = function (view, symbol = 0) {
    if (symbol == 0) {
        return Util.count(view, bonus) == 2 && (Util.count(view, hercules) || Util.count(view, pegasus));
    }

    return Util.count(view, bonus) == 2 && Util.count(view, symbol);
}

module.exports = SlotMachine;