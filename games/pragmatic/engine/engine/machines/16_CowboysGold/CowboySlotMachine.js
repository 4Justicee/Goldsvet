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
    this.freeSpinLevel = 1;
    this.freeSpinBonusCount = 1;
    this.freeRespinCount = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, renegade = 3, cowboy = 8;
var slotWidth = 5, slotHeight = 3;
var freeSpinCount = 10, freeSpinAddCount = 5;
var baseReels = [
    [8, 10, 7, 4, 12, 6, 11, 9, 5, 2, 4, 12, 9, 4, 5, 9, 4, 2, 11, 12, 5, 4, 5, 4, 9, 5, 4, 7, 9, 7, 9],
    [2, 5, 12, 1, 8, 10, 4, 7, 11, 9, 6, 9, 11, 9, 12, 1, 4, 5, 1, 7, 9, 5, 12, 8, 1],
    [10, 11, 1, 4, 5, 8, 12, 9, 6, 7, 2, 8, 5, 8, 7, 9, 6, 2, 8],
    [6, 8, 12, 5, 4, 7, 10, 2, 1, 11, 9, 10, 5, 12, 10, 4, 8, 11, 8, 10, 4, 5, 8, 9, 8, 12, 4, 11, 10, 1, 11, 8, 12, 5, 10, 8, 11, 5, 9, 5, 11, 5, 4, 7, 11, 4, 10, 9, 8, 12, 8, 4, 9, 5, 8, 4, 5, 11, 8, 11, 1, 8, 9, 11, 1, 7, 4, 9, 11, 8, 4, 10, 11, 10, 4, 5],
    [12, 7, 10, 8, 4, 6, 5, 3, 2, 11, 9, 5, 8, 3, 9, 6, 10],
];
var freeReels = [
    [
        [10, 8, 8, 8, 9, 12, 7, 8, 4, 2, 5, 11, 6, 7, 4, 8],
        [8, 8, 8, 12, 4, 9, 10, 11, 1, 7, 6, 2, 5, 8, 9, 4, 9, 7, 11, 6, 12, 6, 4, 11, 12, 9, 7, 6],
        [6, 8, 8, 8, 4, 2, 11, 9, 7, 8, 5, 12, 10, 8, 10, 2, 8, 7, 12, 8, 12, 2, 8, 2, 9, 8],
        [5, 8, 8, 8, 7, 8, 1, 4, 9, 2, 11, 12, 6, 10, 1, 8, 4, 8, 10, 1, 11, 6, 8, 10, 9, 8, 7, 12, 10, 12, 10, 8],
        [8, 9, 11, 4, 5, 9, 3, 9, 12, 7, 7, 9, 3, 10, 2, 12, 8, 12, 12, 4, 9, 2, 11, 5, 12, 8, 8, 8, 11, 6, 4, 11, 3, 12, 5, 11, 10, 12, 4, 9],
    ],
    [
        [4, 11, 8, 12, 2, 10, 7, 6, 5, 9, 11, 12, 11, 12, 5, 7, 12],
        [5, 10, 9, 2, 6, 7, 11, 4, 8, 12, 6, 2, 4, 6, 2, 6, 2, 11, 2, 11, 4, 2, 9, 6, 8, 10, 2, 4, 6, 10, 2, 8, 6, 9, 8, 10, 6, 2, 4, 2],
        [7, 6, 10, 9, 2, 12, 11, 8, 5, 4, 9, 10, 9, 8, 12, 9, 12, 10, 11, 10, 9, 4, 10, 11, 10, 6, 10, 8, 6, 8, 6, 8, 9, 2, 9, 8, 10, 2, 8, 2, 10],
        [4, 5, 9, 7, 12, 8, 11, 6, 10, 2, 8, 10, 11, 10],
        [8, 9, 11, 4, 5, 9, 3, 9, 12, 7, 7, 9, 3, 10, 2, 12, 8, 12, 12, 4, 9, 2, 11, 5, 12, 8, 8, 8, 11, 6, 4, 11, 3, 12, 5, 11, 10, 12, 4, 9],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 50, 30, 25, 20, 10, 5, 5, 5, 5, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 0, 200, 150, 100, 100, 50, 25, 25, 10, 10, 0, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
    [0, 0, 0, 0, 750, 500, 250, 200, 100, 50, 50, 25, 25, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
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
var moneySymbolValues = [0, 10, 20, 30, 40, 50, 80, 100, 150, 200, 250, 500, 750, 1000];

SlotMachine.prototype.Init = function() {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
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

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.moneyCache = cache.moneyCache;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0].view;
        this.moneyCache = this.freeSpinCacheList[0].moneyCache;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.moneyTotalValue = MoneyWinFromCache(this.view, this.moneyCache, player.betPerLine);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalValue;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    //                             
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinCount;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinBonusCount = 1;
        this.freeSpinLevel = 1;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    this.moneyTotalValue = MoneyWinFromCache(this.view, this.moneyCache, player.betPerLine);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalValue;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (isFreeSpinWin(this.view)) {
        this.freeSpinBonusCount++;
    }

    this.freeSpinWinMoney += this.winMoney;
    this.freeSpinIndex++;
    // console.log("freeSpinIndex : " + this.freeSpinIndex);
    if (this.freeSpinIndex > this.freeSpinLength) {
        if (this.freeSpinBonusCount > this.freeSpinLevel && this.freeSpinLevel < 4) {
            this.freeSpinLevel++;
            this.freeSpinLength += freeSpinAddCount;
        } else {
            this.currentGame = "BASE";
        }
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {};

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

    var freeSpinView = RandomScatterView(baseReels);
    var freeSpinViewWin = WinFromView(freeSpinView, bpl);
    var result = {};
    result.moneyCache = RandomMoneySymbols(freeSpinView);
    result.view = GetCowboyView(freeSpinView, result.moneyCache);
    freeSpinViewWin += MoneyWinFromCache(freeSpinView, result.moneyCache, bpl);
    freeSpinView = result;

    var fsCount = freeSpinCount;
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push(freeSpinView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + freeSpinViewWin,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView,
        tmpMoneyCache,
        tmpWin,
        calcCount = 0,
        bottomLimit = 0;

    while (true) {
        tmpView = RandomView(reels);
        if (isFreeSpinWin(tmpView)) {
            continue;
        }
        var scatterCnt = NumberOfScatters(tmpView);
        if (scatterCnt >= 2) {
            if (Util.probability(80)) {
                continue;
            }
        } else if (scatterCnt >= 1) {
            if (Util.probability(70)) {
                continue;
            }
        }

        tmpMoneyCache = RandomMoneySymbols(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, tmpMoneyCache, bpl);

        // Renegade                                                            
        if (NumberOfRenegade(tmpView) > 0) {
            if (Util.probability(70)) {
                continue;
            }
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    var result = {
        view: {
            view: GetCowboyView(tmpView, tmpMoneyCache),
            moneyCache: tmpMoneyCache,
        },
        win: tmpWin,
    };

    return result;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpMoneyCache, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        if (isFreeSpinWin(tmpView)) {
            continue;
        }
        var scatterCnt = NumberOfScatters(tmpView);
        if (scatterCnt >= 2) {
            if (Util.probability(90)) {
                continue;
            }
        } else if (scatterCnt >= 1) {
            if (Util.probability(80)) {
                continue;
            }
        }
        tmpMoneyCache = RandomMoneySymbols(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, tmpMoneyCache, bpl);

        if (tmpWin == 0) {
            break;
        }
    }

    var result = {
        view: {
            view: GetCowboyView(tmpView, tmpMoneyCache),
            moneyCache: tmpMoneyCache,
        },
        win: tmpWin,
    };

    return result;
};

var RandomView = function (reels) {
    var view = [];
    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
        }
    }

    return view;
};

var RandomScatterView = function (reels) {
    while (true) {
        var view = RandomView(reels);
        if (isFreeSpinWin(view)) {
            return view;
        }
    }
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
        var moneyCache = {};
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinLevel = 1;
        var freeSpinIndex = 1;
        var freeRespinCount = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (true) {
            var isRespin = false;
            if (freeSpinIndex == freeSpinLength) {
                if (Util.probability(50)) {
                    isRespin = true;
                    freeSpinLevel++;
                }
            }

            while (true) {
                var _freeReels = Util.probability(20) ? reels[1] : reels[0];
                tmpView = RandomView(_freeReels);

                if (isRespin == true && freeSpinLevel < 4) {
                    if (isFreeSpinWin(tmpView)) {
                        break;
                    }
                } else {
                    if (!isFreeSpinWin(tmpView)) {
                        break;
                    }
                }
            }

            moneyCache = RandomMoneySymbols(tmpView, freeRespinCount);
            tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, moneyCache, bpl);
            tmpView = GetCowboyView(tmpView, moneyCache, true);

            var freeSpinData = {
                view: tmpView,
                moneyCache: moneyCache,
            };

            freeSpinCacheList.push(freeSpinData);
            freeSpinTotalWin += tmpWin;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                //                 
                if (freeSpinLevel > freeRespinCount && freeSpinLevel < 4) {
                    freeSpinLength += freeSpinAddCount;
                    freeRespinCount++;
                } else {
                    break;
                }
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


var GetCowboyView = function (view, moneyCache, isFreeSpin = false) {
    var cowboyView = Util.clone(view);
    var moneyValues = moneyCache.values;

    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
            var cowboy = 18; //       
            switch (moneyValues[i]) {
                case 1000:
                    cowboy = 17;
                    break;
                case 750:
                    cowboy = 16;
                    break;
                case 500:
                    cowboy = 15;
                    break;
                case 250:
                    cowboy = 14;
                    break;
                case 20:
                case 100:
                    cowboy = 18;
                    break;
                case 10:
                case 40:
                case 80:
                case 200:
                    cowboy = 20;
                    break;
                case 30:
                case 50:
                case 150:
                    cowboy = 22;
                    break;
                default:
                    //                                    
                    var cowboys = [19, 21, 23];
                    cowboy = cowboys[Util.random(0, 3)];

                    if(isFreeSpin & i % 5 == 4) {
                        cowboys = [19, 21];
                        cowboy = cowboys[Util.random(0, 2)];
                    }

                    break;
            }
            cowboyView[i] = cowboy;
        }
    }
    return cowboyView;
};

var RandomMoneySymbols = function (view, level = 0) {
    var table = [],
        values = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i]) && i % slotWidth != 4) {
            table[i] = "v";
            var value = 0;
            if (Util.probability(50)) {
                value = moneySymbolValues[Util.random(0, 5)];
            } else if (Util.probability(80)) {
                value = moneySymbolValues[Util.random(0, 10)];
            } else {
                value = moneySymbolValues[Util.random(0, moneySymbolValues.length)];
            }
            values[i] = value;
        } else if (isRenegade(view[i])) {
            values[i] = FreeSpinMultiByLevel(level);
            if (values[i] > 1) {
                table[i] = "ma";
            } else {
                table[i] = "v";
                values[i] = 0;
            }
        } else {
            table[i] = "r";
            values[i] = 0;
        }
    }

    return { table, values };
};

var WinFromView = function (view, bpl) {
    var money = 0;
    var normalView = GetNormalView(view);

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(normalView, line);
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
    var normalView = GetNormalView(view);
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(normalView, line);
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

var isRenegade = function (symbol) {
    return symbol == renegade;
};

var isFreeSpinWin = function (view) {
    var scatterCount = NumberOfScatters(view);
    if (scatterCount == 3) {
        return true;
    }
    if (scatterCount >= 1 && NumberOfRenegade(view) > 0) {
        return true;
    }
    return false;
};

var isMoney = function (symbol) {
    return symbol == cowboy;
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
            return 5;
    }
    return 0;
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

var NumberOfRenegade = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isRenegade(view[i])) {
            result++;
        }
    }
    return result;
};

var MoneyWinFromCache = function (view, moneyCache, bpl) {
    var hasRenegade = false;
    for (var i = 0; i < view.length; i++) {
        if (isRenegade(view[i])) {
            hasRenegade = true;
            break;
        }
    }
    if (!hasRenegade) {
        return 0;
    }

    var moneyWin = 0,
        multi = 1;
    for (var i = 0; i < moneyCache.table.length; i++) {
        if (moneyCache.table[i] == "v") {
            moneyWin += moneyCache.values[i];
        } else if (moneyCache.table[i] == "ma") {
            multi = moneyCache.values[i];
        }
    }
    moneyWin *= multi;
    return moneyWin * bpl;
};

var GetNormalView = function (view) {
    var resultView = [...view];
    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] >= 14 && resultView[i] <= 23) {
            resultView[i] = cowboy;
        }
    }
    return resultView;
};

module.exports = SlotMachine;