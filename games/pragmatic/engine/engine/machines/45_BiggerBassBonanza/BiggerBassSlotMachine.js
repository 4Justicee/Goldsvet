var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 12;

    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    this.moneyTotalValue = 0;
    this.fishMatchWinLine = "";

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinCounter = 0;

    this.srf = [];
    this.stf = "";
    this.trail = "";
    this.mo_wpos = "";

    //                       
    this.isFreeSpinAdd = false;
    this.freeRespinLevel = 1;
    this.freeSpinWildCount = 0;

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, fish = 7;
var slotWidth = 5, slotHeight = 4;
var freeSpinCount = 10, respinWildCount = 4;
var dynamiteBang = 4;
var baseReels = [
    [6, 7, 8, 10, 10, 5, 6, 12, 7, 11, 6, 5, 10, 6, 1, 5, 8, 7, 7, 12, 4, 10, 5, 8, 4, 10, 3, 12, 8, 10, 4, 8, 9, 9, 12, 10, 9, 4, 3, 10, 5, 8, 12, 3, 6, 8, 12, 6, 4, 10, 11, 12, 8, 7, 7, 7, 7, 7],
    [4, 3, 9, 7, 11, 3, 8, 6, 3, 9, 7, 11, 5, 10, 6, 3, 1, 9, 7, 7, 12, 3, 4, 11, 3, 6, 8, 9, 5, 11, 9, 6, 11, 4, 9, 3, 5, 4, 11, 6, 3, 5, 11, 9, 12, 9, 10, 4, 3, 11, 5, 9, 9, 8, 7, 7, 7, 7, 7],
    [12, 3, 3, 6, 7, 11, 3, 5, 7, 10, 4, 3, 5, 10, 9, 4, 5, 1, 6, 7, 7, 12, 9, 5, 4, 3, 8, 5, 6, 11, 4, 6, 5, 10, 3, 6, 4, 3, 8, 7, 7, 7, 7, 7],
    [5, 7, 6, 4, 12, 5, 4, 8, 7, 6, 4, 11, 3, 9, 7, 7, 10, 1, 6, 3, 5, 3, 7, 7, 7, 7, 7],
    [4, 6, 7, 11, 11, 4, 8, 8, 7, 5, 3, 12, 1, 7, 7, 10, 8, 6, 9, 7, 7, 7, 7, 7]
];
var freeReels = [
    [6, 7, 8, 10, 2, 5, 6, 12, 7, 11, 6, 5, 10, 6, 5, 8, 7, 7, 12, 4, 10, 5, 8, 4, 10, 3, 12, 8, 10, 4, 8, 9, 2, 12, 10, 9, 4, 3, 10, 5, 8, 12, 3, 6, 8, 12, 6, 4, 10, 11, 12, 8, 7, 7, 7, 7, 7],
    [4, 3, 9, 7, 11, 3, 8, 6, 3, 9, 7, 11, 5, 10, 6, 3, 9, 7, 7, 12, 3, 4, 11, 3, 6, 2, 9, 5, 11, 9, 6, 11, 4, 9, 3, 5, 4, 11, 6, 3, 5, 11, 2, 12, 9, 10, 4, 3, 11, 5, 2, 9, 8, 7, 7, 7, 7, 7],
    [12, 2, 3, 6, 7, 11, 3, 5, 7, 10, 4, 3, 5, 2, 9, 4, 5, 6, 7, 7, 12, 9, 5, 4, 3, 8, 5, 6, 11, 4, 6, 2, 10, 3, 6, 4, 3, 8, 7, 7, 7, 7, 7],
    [5, 7, 6, 2, 12, 5, 2, 8, 7, 6, 4, 11, 3, 9, 7, 7, 10, 6, 3, 5, 2, 7, 7, 7, 7, 7],
    [4, 6, 7, 11, 2, 4, 8, 2, 7, 5, 3, 12, 7, 7, 10, 2, 6, 9, 7, 7, 7, 7, 7]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 60, 36, 24, 24, 12, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0],
    [0, 0, 0, 240, 180, 120, 120, 60, 30, 30, 30, 30, 30, 0, 0, 0, 0, 0],
    [0, 0, 0, 2400, 1200, 600, 600, -1, 120, 120, 120, 120, 120, 0, 0, 0, 0, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],  // 1
    [10, 11, 12, 13, 14],  // 2
    [0, 1, 2, 3, 4],  // 3
    [15, 16, 17, 18, 19],  // 4
    [0, 6, 12, 8, 4],  // 5
    [5, 11, 17, 13, 9],  // 6
    [10, 6, 2, 8, 14],  // 7
    [15, 11, 7, 13, 19],  // 8
    [0, 1, 7, 13, 14],  // 9
    [5, 6, 12, 18, 19],  // 10
    [10, 11, 7, 3, 4],  // 11
    [15, 16, 12, 8, 9],  // 12
];
var moneySymbolValues = [24, 60, 120, 180, 240, 300, 600];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .),
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
        var viewData = viewCache.view;
        this.view = viewData.view;
        this.moneyCache = viewData.moneyCache;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        var viewData = this.freeSpinCacheList[0];
        this.view = viewData.view;
        this.moneyCache = viewData.moneyCache;
        this.freeSpinLength = GetFreeSpinCounts(this.view);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine, this.moneyCache);
    var { winLines, fishMatchWinLine, moWpos } = WinLinesFromView(this.view, player.betPerLine);
    this.winLines = winLines;
    this.fishMatchWinLine = fishMatchWinLine;
    this.mo_wpos = moWpos;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinCounter = 1;
        this.freeRespinLevel = 1;
        this.freeSpinWildCount = 0;
        this.scatterPositions = ScatterPositions(this.view);
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    this.winMoney = WinFromView(this.view, player.betPerLine, this.moneyCache) + MoneyWinFromCache(this.moneyCache, player.betPerLine);
    var { winLines, fishMatchWinLine, moWpos } = WinLinesFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.trail = "";
    var multi = FreeSpinMultiByLevel(this.freeRespinLevel);
    if (multi > 1) {
        this.trail = `multiplier~${multi}`;
    }

    var addWildCount = Util.symbolCountFromView(this.view, wild);
    this.freeSpinWildCount += addWildCount;
    this.maskView = [];
    this.srf = [];
    this.stf = "";
    var _stf = [];

    if (addWildCount > 0) {
        this.maskView = Util.clone(this.view);
        for (var i = 0; i < this.maskView.length; i++) {
            if (isWild(this.maskView[i])) {
                this.mo_wpos = i;
                this.maskView[i] = fish;
                _stf.push(`${fish}~${wild}~${i}`);
            }
        }
        this.stf = `fisherman:${_stf.join(';')}`;

        if (Util.symbolCountFromView(this.view, fish) >= dynamiteBang && Util.probability(50)) {
            for (var i = 0; i < this.view.length; i++) {
                if (isMoney(this.view[i])) {
                    var symbols = [3, 4, 5, 6, 8, 9, 10, 11, 12];
                    this.maskView[i] = symbols[Util.random(0, symbols.length)];
                    this.srf.push(`${this.maskView[i]}~${fish}~${i}`);
                }
            }
            console.log(`                      ! srf = ${this.srf.join(';')},              = ${this.winMoney}`);
            this.trail += ";visual_feature~dynamite";
        }
    }

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

}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpResult;

    if (baseWin > 0) {
        tmpResult = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpResult = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: tmpResult.view,
        win: tmpResult.win,
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
            break;
        case "BONUS":
            // return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(baseReels);
    var scatterMoneyCache = RandomMoneySymbolsForMachine(scatterView);
    var scatterWinMoney = WinFromView(scatterView, bpl, scatterMoneyCache);

    var fsCount = GetFreeSpinCounts(scatterView);
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    var scatterViewData = {
        view: scatterView,
        moneyCache: scatterMoneyCache
    };
    freeSpinCacheList.push(scatterViewData);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, tmpMoneyCache, bottomLimit = 0, calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpMoneyCache = RandomMoneySymbolsForMachine(tmpView);
        tmpWin = WinFromView(tmpView, bpl, tmpMoneyCache);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    return {
        view: {
            view: tmpView,
            moneyCache: tmpMoneyCache
        },
        win: tmpWin
    };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin, tmpMoneyCache;

    while (true) {
        tmpView = RandomView(reels);
        tmpMoneyCache = RandomMoneySymbolsForMachine(tmpView);
        tmpWin = WinFromView(tmpView, bpl, tmpMoneyCache);
        if (tmpWin == 0) {
            break;
        }
    }

    return {
        view: {
            view: tmpView,
            moneyCache: tmpMoneyCache
        },
        win: tmpWin
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

        if (isFreeSpinWin(view)) {
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

    for (var patternIndex = 0; patternIndex < 12000; patternIndex++) {
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
        var numWilds = 0;

        while (true) {
            while (true) {
                tmpView = RandomView(reels);
                numWilds = Util.symbolCountFromView(tmpView, wild);
                var numMoneys = Util.symbolCountFromView(tmpView, fish);

                if (numWilds >= 2 && numMoneys > 0 || numWilds == 1 && numMoneys == 0) {
                    continue;
                }
                if (isFishMatchView(tmpView)) {
                    continue;
                }
                if (Util.probability(20) || numWilds == 0) {
                    break;
                }
            }

            freeSpinWildCount += numWilds;
            moneyCache = RandomMoneySymbols(tmpView, freeSpinLevel);
            tmpWin = WinFromView(tmpView, bpl, moneyCache) + MoneyWinFromCache(moneyCache, bpl);

            var freeSpinData = {
                view: tmpView,
                moneyCache: moneyCache,
            }
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
            win: freeSpinTotalWin
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

var WinFromView = function (view, bpl, moneyCache) {
    var money = 0, fishFiveMatchMoneyCnt = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
        var linePay = WinFromLine(lineSymbols, bpl);
        if (linePay < 0) {
            fishFiveMatchMoneyCnt++;
            var payLine = payLines[lineId];
            var lineWin = 0;
            for (var i = 0; i < payLine.length; i++) {
                lineWin += moneyCache.values[payLine[i]] * bpl;
            }
            money += lineWin;
        } else {
            money += linePay;
        }
    }

    if (fishFiveMatchMoneyCnt > 1) {
        money = -1;
    }
    return money;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [], fishMatchWinLine = "", moWpos = "";
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        } else if (money < 0) {
            fishMatchWinLine = `${lineId}~${fish}~${line.join(',')}`;
            var moWposArray = [];
            for (var i = 0; i < line.length; i++) {
                if (line.includes(i)) {
                    moWposArray.push(i);
                }
            }
            moWpos = moWposArray.join(',');
        }
    }

    return { winLines, fishMatchWinLine, moWpos };
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

var isFishMatchView = function (view) {
    var fishMatchCnt = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
        if (isSameSymbolArray(lineSymbols, fish)) {
            fishMatchCnt++;
        }
    }
    if (fishMatchCnt == 0) {
        return false;
    } else {
        return true;
    }
};

var isSameSymbolArray = function (lineSymbols, symbol) {
    var ret = true;
    lineSymbols.forEach(e => {
        if (e != symbol) {
            return ret = false;
        }
    });
    return ret;
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
    return Util.symbolCountFromView(view, scatter) >= 3;
};

var GetFreeSpinCounts = function (view) {
    var nScatters = Util.symbolCountFromView(view, scatter);
    switch (nScatters) {
        case 3: return 10;
        case 4: return 15;
        case 5: return 20;
    }
    return 0;
};

var FreeSpinMultiByLevel = function (level) {
    switch (level) {
        case 1: return 1;
        case 2: return 2;
        case 3: return 3;
        case 4: return 10;
    }
    return 1;
};

var isMoney = function (symbol) {
    return symbol == fish;
};

var RandomMoneySymbols = function (view, level) {
    var table = [], values = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
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

var RandomMoneySymbolsForMachine = function (view) {
    var table = [], values = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
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
            //                                                              .                                             
            // table[i] = "mma";
            // values[i] = FreeSpinMultiByLevel(level);
        } else {
            table[i] = "r";
            values[i] = 0;
        }
    }

    return { table, values };
};

var MoneyWinFromCache = function (moneyCache, bpl) {
    var moneyWin = 0, multi = 0;
    for (var i = 0; i < moneyCache.table.length; i++) {
        if (moneyCache.table[i] == "v") {
            moneyWin += moneyCache.values[i];
        } else if (moneyCache.table[i] == "mma") {
            multi = moneyCache.values[i];
        }
    }
    moneyWin *= multi;
    return moneyWin * bpl;
}

module.exports = SlotMachine;