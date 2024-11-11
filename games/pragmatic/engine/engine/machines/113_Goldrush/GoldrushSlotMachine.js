var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    this.freeSpinCount = 10;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.fs_more = 0;
    this.goldSymbolCount = 0;
    this.freeSpinLevel = 0;
    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var scatter = 1, wild = 2, gold = 13;
var slotWidth = 5, slotHeight = 3;
var initFreespinCount = 10;
var baseReels = [
    [12, 9, 6, 11, 3, 8, 11, 9, 10, 7, 12, 4, 5, 4, 5, 10, 3],
    [9, 5, 11, 2, 7, 5, 1, 2, 3, 4, 6, 8, 12, 11, 10, 1, 6, 10, 4, 8, 7],
    [8, 5, 7, 8, 4, 8, 11, 12, 3, 6, 10, 3, 4, 8, 12, 10, 1, 9, 3, 6, 7, 11, 2, 2],
    [9, 1, 7, 6, 3, 9, 5, 8, 1, 12, 10, 7, 4, 11, 11, 3, 11, 10, 6, 2, 2, 2, 3, 12, 8],
    [5, 12, 10, 7, 2, 6, 9, 10, 4, 12, 11, 6, 3, 10, 8, 2, 11, 9, 7]
];
var freespinReels = [
    [
        [5, 8, 8, 11, 9, 3, 6, 12, 4, 10, 5, 7, 3, 12, 9, 3, 11, 3],
        [11, 7, 9, 8, 12, 5, 1, 10, 12, 7, 6, 4, 4, 2, 5, 8, 3, 13, 10, 3, 3],
        [7, 5, 5, 6, 8, 10, 12, 11, 3, 1, 4, 13, 4, 2, 3, 3, 2, 9, 6, 12, 11, 9, 10],
        [11, 2, 8, 5, 10, 4, 7, 8, 3, 11, 9, 4, 3, 13, 12, 6, 1, 10, 11, 12],
        [2, 6, 3, 9, 4, 10, 4, 12, 2, 9, 10, 11, 10, 7, 12, 7, 11, 5, 6, 7, 5, 8]
    ],
    [
        [4, 9, 5, 3, 9, 11, 3, 3, 8, 12, 4, 11, 10, 6, 3, 5, 3, 3, 8, 9],
        [11, 11, 1, 12, 3, 8, 6, 4, 5, 4, 10, 13, 5, 12, 8, 9, 3, 3, 2],
        [9, 2, 8, 4, 6, 6, 10, 4, 8, 3, 3, 1, 10, 3, 11, 5, 12, 11, 13],
        [1, 4, 3, 9, 5, 12, 5, 5, 12, 13, 11, 4, 4, 8, 11, 2, 6, 3, 6, 11, 8, 10, 10],
        [8, 6, 5, 6, 10, 2, 5, 3, 9, 10, 4, 10, 8, 4, 11, 12, 2, 6, 11, 5, 9, 12]
    ],
    [
        [5, 9, 10, 12, 5, 10, 3, 3, 11, 11, 9, 3, 12, 3, 4, 8, 9, 3],
        [3, 5, 8, 3, 10, 11, 3, 13, 9, 10, 11, 1, 2, 12, 9, 3, 4, 5, 8, 2],
        [2, 3, 11, 9, 13, 5, 8, 5, 3, 3, 1, 4, 10, 5, 4, 2, 3, 8, 12],
        [5, 10, 5, 3, 9, 11, 3, 9, 4, 3, 4, 9, 11, 2, 1, 8, 12],
        [9, 11, 4, 12, 12, 4, 10, 9, 2, 11, 3, 10, 2, 5, 9, 3, 5, 3, 10, 8]
    ],
    [
        [10, 4, 3, 11, 4, 10, 8, 3, 8, 9, 3, 3, 4, 3, 12, 11, 3, 9, 3, 12],
        [3, 8, 3, 11, 12, 11, 8, 9, 1, 12, 9, 10, 3, 2, 3, 2, 4, 11, 4],
        [10, 8, 8, 3, 12, 4, 3, 4, 11, 9, 3, 3, 2, 9, 10, 12, 1],
        [3, 1, 3, 4, 12, 10, 12, 9, 4, 11, 11, 9, 4, 2, 10, 8, 3, 11, 3, 9],
        [11, 3, 4, 3, 10, 12, 2, 12, 8, 11, 4, 8, 10, 4, 4, 9, 9]
    ]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 25, 25, 20, 20, 10, 10, 5, 5, 5, 0],
    [0, 0, 0, 200, 150, 125, 100, 50, 20, 20, 20, 20, 20, 0],
    [0, 0, 0, 500, 400, 300, 200, 100, 75, 50, 50, 50, 50, 0]
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
    [10, 1, 12, 3, 14] // 25
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
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.view = this.freeSpinCacheList[0];
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.fs_more = 0;
        this.goldSymbolCount = 0;
        this.freeSpinLevel = 0;
        this.freeSpinIndex = 1;
        this.freeSpinLength = 10;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }

};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.fs_more = CheckScatterView(this.view); //                      .
    this.goldSymbolCount += CheckGoldenSymbolView(this.view); //                   .

    this.freeSpinLength += this.fs_more;

    if (0 < this.goldSymbolCount && this.goldSymbolCount <= 4) {
        this.freeSpinLevel = 0;
    } else if (5 <= this.goldSymbolCount && this.goldSymbolCount <= 9) {
        this.freeSpinLevel = 1;
    } else if (10 <= this.goldSymbolCount && this.goldSymbolCount <= 14) {
        this.freeSpinLevel = 2;
    } else if (15 <= this.goldSymbolCount) {
        this.freeSpinLevel = 3;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
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
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var sccaterCount = initFreespinCount;
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(baseReels, bpl, fsWin, sccaterCount);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
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

        if (Util.probability(25)) {
            if (!isFreeSpinWin(view)) {
                break;
            }
        } else {
            if (CheckScatterView(view) > 1) {
                continue;
            } else {
                if (!isFreeSpinWin(view)) {
                    break;
                }
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

        if (isFreeSpinWin(view) && NumberOfScatters(view) < 5) {
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
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        var freeSpinLevel = 0;
        var goldSymbolCount = 0;

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(freespinReels[freeSpinLevel]);
                fsWin = WinFromView(fsview, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsview);

            freeSpinWinMoney += fsWin;

            freeSpinIndex++;

            freeSpinLength += CheckScatterView(fsview); //                      .
            goldSymbolCount += CheckGoldenSymbolView(fsview); //                   .

            if (0 < goldSymbolCount && goldSymbolCount <= 4) {
                freeSpinLevel = 0;
            } else if (5 < goldSymbolCount && goldSymbolCount <= 9) {
                freeSpinLevel = 1;
            } else if (10 < goldSymbolCount && goldSymbolCount <= 14) {
                freeSpinLevel = 2;
            } else if (15 < goldSymbolCount) {
                freeSpinLevel = 3;
            }

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

//                                                                              ?
var CheckScatterView = function (view) {
    var resultView = Util.clone(view);
    var counter = 0;
    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] == scatter) {
            counter++;
        }
    }
    return counter * 2;
};

var CheckGoldenSymbolView = function (view) {
    var resultView = Util.clone(view);
    var counter = 0;
    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] == gold) {
            counter++;
        }
    }
    return counter;
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinLinesFromView = function (view, bpl, isBonus = false) {
    var defaultpayLines = [];
    var winLines = [];

    if (isBonus) {
        defaultpayLines = bonusPayLine;
    } else {
        defaultpayLines = payLines;
    }

    for (var lineId = 0; lineId < defaultpayLines.length; lineId++) {
        var line = defaultpayLines[lineId];
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

module.exports = SlotMachine;