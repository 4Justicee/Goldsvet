var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 50;
    this.freeSpinCount = 6;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinMore = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMoney = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE

    this.baseWinPercent = 90;
}

var scatter = 1,
    wild = 2;
var slotWidth = 5,
    slotHeight = 4;
var baseReels = [
    [6, 3, 3, 3, 3, 3, 3, 3, 7, 7, 11, 3, 10, 4, 5, 9, 8, 3, 12],
    [9, 2, 5, 10, 3, 3, 3, 3, 3, 3, 3, 12, 6, 8, 7, 1, 4, 11],
    [4, 12, 11, 1, 10, 9, 3, 3, 3, 3, 3, 3, 3, 6, 5, 7, 3, 8, 2],
    [12, 3, 3, 3, 3, 7, 4, 1, 5, 2, 3, 10, 9, 11, 6, 3, 8],
    [10, 12, 9, 7, 3, 3, 3, 3, 4, 8, 5, 3, 3, 11, 6]
];
var freeReels = [
    [
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        8,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        8
    ],
    [
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        1,
        8,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        8
    ],
    [
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        1,
        8,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        8
    ],
    [
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        1,
        8,
        3,
        3,
        3,
        3,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        8
    ],
    [
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        8,
        3,
        3,
        3,
        3,
        4,
        12,
        11,
        5,
        6,
        10,
        7,
        9,
        8
    ]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 20, 20, 20, 10, 5, 5, 2, 2],
    [0, 0, 0, 200, 120, 80, 80, 80, 50, 25, 25, 10, 10],
    [0, 0, 0, 800, 400, 300, 300, 300, 150, 100, 100, 50, 50]
];
var payLines = [
    [0, 1, 2, 3, 4], //1
    [15, 16, 17, 18, 19], //2
    [5, 6, 7, 8, 9], //3
    [10, 11, 12, 13, 14], //4
    [0, 6, 12, 8, 4], //5
    [15, 11, 7, 13, 19], //6
    [10, 6, 2, 8, 14], //7
    [5, 11, 17, 13, 9], //8
    [0, 6, 2, 8, 4], //9
    [15, 11, 17, 13, 19], //10
    [5, 1, 7, 3, 9], //11
    [10, 16, 12, 18, 14], //12
    [5, 11, 7, 13, 9], //13
    [10, 6, 12, 8, 14], //14
    [0, 6, 7, 8, 4], //15
    [15, 11, 12, 13, 19], //16
    [5, 1, 2, 3, 9], //17
    [10, 16, 17, 18, 14], //18
    [5, 11, 12, 13, 9], //19
    [10, 6, 7, 8, 14], //20
    [0, 1, 7, 3, 4], //21
    [15, 16, 12, 18, 19], //22
    [5, 6, 2, 8, 9], //23
    [10, 11, 17, 13, 14], //24
    [5, 6, 12, 8, 9], //25
    [10, 11, 7, 13, 14], //26
    [0, 1, 12, 3, 4], //27
    [15, 16, 7, 18, 19], //28
    [10, 11, 2, 13, 14], //29
    [5, 6, 17, 8, 9], //30
    [0, 11, 12, 13, 4], //31
    [15, 6, 7, 8, 19], //32
    [10, 1, 2, 3, 14], //33
    [5, 16, 17, 18, 9], //34
    [5, 1, 12, 3, 9], //35
    [10, 16, 7, 18, 14], //36
    [5, 11, 2, 13, 9], //37
    [10, 6, 17, 8, 14], //38
    [0, 11, 2, 13, 4], //39
    [15, 6, 17, 8, 19], //40
    [10, 1, 12, 3, 14], //41
    [5, 16, 7, 18, 9], //42
    [0, 11, 7, 13, 4], //43
    [15, 6, 12, 8, 19], //44
    [10, 1, 7, 3, 14], //45
    [5, 16, 12, 18, 9], //46
    [0, 1, 7, 13, 19], //47
    [15, 16, 12, 8, 4], //48
    [0, 6, 12, 18, 19], //49
    [15, 11, 7, 3, 4] //50
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 10; //                                 ,                                               ,                                     .
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
        this.freeSpinLength = cache.length;
        this.view = this.freeSpinCacheList[0].view;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.scatterPositions = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.totalBet);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = 0;
        this.totalWin = this.winMoney;
        this.currentGame = "FREE";

        this.virtualReels = {
            above: this.freeSpinCacheList[this.freeSpinIndex].viewHigh,
            below: this.freeSpinCacheList[this.freeSpinIndex].viewLow
        };

        this.freeSpinEndFlag = true;
        this.freeSpinEnd = false;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    // if (this.freeSpinEndFlag == false) {
    //   this.currentGame = "BASE";
    //   return;
    // }
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;

    var moreLength = NumberOfScatters(this.view);
    if (moreLength > 0) {
        this.freeSpinMore = moreLength;
        this.freeSpinLength += moreLength;
    } else {
        this.freeSpinMore = 0;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: this.freeSpinCacheList[this.freeSpinIndex].viewHigh,
        below: this.freeSpinCacheList[this.freeSpinIndex].viewLow
    };

    this.freeSpinWinMoney += this.winMoney;
    this.totalWin += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        // this.freeSpinEnd = true;
        // this.freeSpinEndFlag = false;
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
        bpl: bpl
    };
    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (
    bpl,
    totalBet,
    jpWin,
    isCall = false,
    jpType
) {
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        newJpType = "FREE"; //this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        default:
            break;
    }

    var result = {
        error: 1,
        msg: "Jackpot Type Error"
    };
    return result;
};

SlotMachine.prototype.SpinForFreeGen = function (
    bpl,
    totalBet,
    fsWin,
    isCall = false
) {
    var scatterView = RandomScatterView(freeReels);
    var scatterWinMoney =
        ScatterWinFromView(scatterView.view, totalBet) +
        WinFromView(scatterView.view, bpl);

    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: []
    };

    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0
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

        if (NumberOfScatters(view) < 3) break;
    }
    return view;
};

var RandomScatterView = function (reels) {
    var view = [];
    var viewHigh = [];
    var viewLow = [];
    while (true) {
        view = [];
        viewHigh = [];
        viewLow = [];
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var tmpPosHigh, tmpPosLow;
            if (randomIndex == 0) {
                tmpPosHigh = len - 1;
            } else {
                tmpPosHigh = randomIndex - 1;
            }

            if (randomIndex == len - slotHeight) {
                tmpPosLow = 0;
            } else {
                tmpPosLow = (randomIndex + slotHeight) % len;
            }

            viewHigh.push(reels[i][tmpPosHigh]);
            viewLow.push(reels[i][tmpPosLow]);
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

    var result = {
        view: view,
        viewHigh: viewHigh,
        viewLow: viewLow
    };

    return result;
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
        var scatterCnt = 0;

        while (true) {
            var updatedReels = UpdateFreeReels(reels, freeSpinIndex);
            var tmpView, tmpWin;
            while (true) {
                tmpView = RandomFreeView(updatedReels);
                tmpWin = WinFromView(tmpView.view, bpl);
                if (tmpWin == 0 || Util.probability(30)) {
                    break;
                }
            }
            scatterCnt = NumberOfScatters(tmpView.view);
            freeSpinLength += scatterCnt;
            freeSpinWinMoney += tmpWin;
            freeSpinData.viewList.push(tmpView);
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
    var viewHigh = [];
    var viewLow = [];
    while (true) {
        view = [];
        viewHigh = [];
        viewLow = [];
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var tmpPosHigh, tmpPosLow;
            if (randomIndex == 0) {
                tmpPosHigh = len - 1;
            } else {
                tmpPosHigh = randomIndex - 1;
            }

            if (randomIndex == len - slotHeight) {
                tmpPosLow = 0;
            } else {
                tmpPosLow = (randomIndex + slotHeight) % len;
            }

            viewHigh.push(reels[i][tmpPosHigh]);
            viewLow.push(reels[i][tmpPosLow]);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
            }
        }

        var scatterCnt = Util.random(0, 3);
        if (NumberOfScatters(view) <= scatterCnt) {
            break;
        }
    }

    var result = {
        view: view,
        viewHigh: viewHigh,
        viewLow: viewLow
    };

    return result;
};

var UpdateFreeReels = function (reels, index) {
    var reels = [];
    for (var i = 0; i < reels.length; i++) {
        reels[i] = [...reels[i]];
    }
    for (var i = 0; i < index; i++) {
        reels[1].unshift(2);
        reels[2].unshift(2);
        reels[3].unshift(2);
    }

    return reels;
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

        money += WinFromLine(lineSymbols, bpl);
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

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) == 3;
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

var ScatterWinFromView = function (view, totalBet) {
    if (isFreeSpinWin(view)) {
        return totalBet * 2;
    }
    return 0;
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