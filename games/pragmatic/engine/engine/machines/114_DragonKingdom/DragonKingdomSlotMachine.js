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
    //                           
    this.freeSpinType = -1;
    this.freeSpinMulti = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 5;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [3, 3, 3, 8, 8, 8, 8, 8, 4, 4, 4, 7, 7, 7, 1, 5, 5, 5, 5, 5, 9, 9, 9, 2, 2, 2, 2, 1, 6, 6, 6, 10, 10, 10, 10],
    [3, 3, 3, 3, 8, 8, 8, 1, 4, 4, 4, 4, 7, 7, 7, 7, 5, 5, 5, 5, 5, 9, 9, 9, 2, 2, 2, 2, 1, 6, 6, 6, 6, 6, 10, 10, 10],
    [3, 3, 3, 3, 8, 8, 8, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 5, 5, 5, 5, 9, 9, 9, 2, 2, 2, 1, 6, 6, 6, 10, 10, 10, 10],
    [3, 3, 3, 3, 3, 8, 8, 8, 1, 4, 4, 4, 4, 4, 4, 7, 7, 7, 5, 5, 5, 5, 5, 9, 9, 2, 2, 2, 2, 6, 6, 6, 6, 6, 10, 10, 10],
    [3, 3, 3, 3, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 7, 7, 7, 5, 5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 2, 2, 2, 2, 1, 6, 6, 6, 6, 6, 10, 10, 10, 10, 10],
];
var freeReels = [
    [
        [2, 2, 2, 2, 2, 2, 6, 10, 1, 3, 8, 4, 7, 5, 9, 6, 10, 3, 8, 4, 7, 5, 9],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 10, 1, 3, 8, 4, 7, 5, 9, 6, 10, 3, 8, 4, 7, 5, 9],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 10, 1, 3, 8, 4, 7, 5, 9, 6, 10, 3, 8, 4, 7, 5, 9],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 10, 1, 3, 8, 4, 7, 5, 9, 6, 10, 3, 8, 4, 7, 5, 9],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 10, 1, 3, 8, 4, 7, 5, 9, 6, 10, 3, 8, 4, 7, 5, 9, 6],
    ],
    [
        [3, 3, 3, 3, 3, 3, 3, 6, 10, 1, 6, 8, 4, 7, 5, 9, 2, 10, 4, 7, 5, 9],
        [3, 3, 3, 3, 6, 10, 1, 6, 8, 4, 7, 5, 9, 2, 10, 8, 7, 5, 9],
        [3, 3, 3, 3, 3, 3, 3, 6, 1, 6, 8, 4, 7, 5, 9, 2, 10, 8, 4, 7, 5, 9],
        [3, 3, 3, 3, 3, 3, 3, 6, 10, 1, 6, 8, 4, 7, 5, 9, 2, 10, 8, 4, 7, 5, 9],
        [3, 3, 3, 3, 6, 10, 1, 6, 8, 4, 7, 5, 9, 2, 10, 8, 4, 7, 5, 9],
    ],
    [
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 10, 1, 3, 8, 2, 7, 5, 9, 6, 10, 3, 8, 7, 5, 9],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 1, 3, 8, 2, 7, 5, 9, 6, 10, 3, 8, 7, 5, 9],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 10, 1, 3, 8, 2, 7, 5, 9, 6, 10, 3, 8, 7, 5, 9],
        [4, 4, 4, 4, 6, 10, 1, 3, 8, 2, 7, 5, 9, 6, 10, 3, 8, 7, 5, 9],
        [4, 4, 4, 4, 4, 4, 4, 6, 10, 1, 3, 8, 2, 7, 5, 9, 6, 10, 3, 8, 7, 5, 9],
    ],
    [
        [5, 5, 5, 5, 6, 10, 1, 3, 8, 4, 7, 2, 9, 6, 10, 3, 8, 4, 7, 9],
        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 10, 1, 3, 8, 4, 7, 2, 9, 6, 10, 3, 8, 4, 7, 9],
        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 10, 1, 3, 8, 4, 7, 2, 9, 6, 10, 3, 8, 4, 7, 9],
        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 10, 1, 3, 8, 4, 7, 2, 9, 6, 10, 3, 8, 4, 7, 9],
        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 10, 1, 3, 8, 4, 7, 2, 9, 6, 10, 8, 4, 7, 9],
    ],
    [
        [6, 6, 6, 6, 6, 10, 1, 3, 8, 4, 7, 5, 9, 2, 10, 3, 8, 4, 7, 5, 9],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 1, 3, 8, 4, 7, 5, 9, 2, 10, 3, 8, 4, 7, 5, 9],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 1, 3, 8, 4, 7, 5, 9, 2, 10, 3, 8, 4, 7, 5, 9],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 1, 3, 8, 4, 7, 5, 9, 2, 10, 3, 8, 4, 7, 5, 9],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 1, 3, 8, 4, 7, 5, 9, 2, 10, 3, 8, 4, 7, 5, 9, 3],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 10, 3, 2, 2, 1, 0, 0, 0, 0],
    [0, 0, 30, 10, 8, 7, 5, 3, 3, 2, 2],
    [0, 0, 100, 40, 25, 20, 15, 10, 10, 8, 8],
    [0, 0, 400, 100, 50, 30, 25, 15, 15, 13, 13],
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [5, 1, 2, 3, 9], // 6
    [5, 11, 12, 13, 9], // 7
    [0, 1, 7, 13, 14], // 8
    [10, 11, 7, 3, 4], // 9
    [5, 11, 7, 3, 9], // 10
    [5, 1, 7, 13, 9], // 11
    [0, 6, 7, 8, 4], // 12
    [10, 6, 7, 8, 14], // 13
    [0, 6, 2, 8, 4], // 14
    [10, 6, 12, 8, 14], // 15
    [5, 6, 2, 8, 9], // 16
    [5, 6, 12, 8, 9], // 17
    [0, 1, 12, 3, 4], // 18
    [10, 11, 2, 13, 14], // 19
    [0, 11, 12, 13, 4], // 20
    [10, 1, 2, 3, 14], // 21
    [5, 11, 2, 13, 9], // 22
    [5, 1, 12, 3, 9], // 23
    [0, 11, 2, 13, 4], // 24
    [10, 1, 12, 3, 14], // 25
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
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0][0].view;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        // console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
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
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpinOption = async function (player, select) {
    this.freeSpinType = Number(select);

    this.freeSpinMulti = this.freeSpinType + 1;
    this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine) * this.freeSpinMulti;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels[this.freeSpinType]),
        below: RandomLineFromReels(freeReels[this.freeSpinType]),
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
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
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    // FS                
    var freeSpinStore = [];
    var moneyList = [];

    //                    
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    for (var i = 0; i < 5; i++) {
        //                                     
        var reelIndex = i;

        freeSpinStore[i] = [];

        var scatterCache = {
            view: scatterView,
            freeSpinLength: 5,
        };

        freeSpinStore[i] = [scatterCache];

        var result = RandomFreeViewCache(freeReels[reelIndex], bpl, fsWin, 5, i);

        freeSpinStore[i] = freeSpinStore[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: freeSpinStore,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
        type: "FREE",
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
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin;

            while (true) {
                fsview = RandomFreeView(reels);
                fsWin = WinFromView(fsview, bpl) * (fsType + 1);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsview);
            freeSpinWinMoney += fsWin;

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

        if (NumberOfScatters(view) == 0) {
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
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

module.exports = SlotMachine;