var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    this.freeSpinCount = 10;
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
    //                          
    this.mysterySymbol = 0;
    this.mysteryPositions = [];
    this.mysteryView = [];
    this.expanding = "";
    this.expandingWinMoney = 0;
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
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [5, 8, 7, 10, 4, 7, 1, 9, 6, 9, 7, 6, 9, 5, 7, 9, 8, 7, 9, 5, 7, 9, 5, 10, 9, 8, 11, 9, 8, 3, 4, 8, 10, 7, 5, 10, 11, 8, 7, 11, 9, 7, 11, 8, 7, 11, 8, 7, 3, 8, 7, 9, 1, 8, 9, 5, 8, 7, 3, 9, 8, 7, 9, 8, 5, 9, 4, 11, 9, 8, 5, 9, 11, 3, 8, 10, 5, 8, 10, 9, 8, 4, 7, 9, 10, 6, 7, 10, 6, 7, 1, 5, 7, 8, 11, 10, 5, 8, 10, 9, 11],
    [9, 10, 7, 8, 4, 10, 8, 7, 11, 9, 7, 11, 3, 7, 8, 6, 7, 9, 6, 10, 9, 6, 11, 10, 7, 8, 9, 6, 1, 10, 6, 7, 10, 8, 4, 11, 8, 9, 6, 8, 5, 10, 8, 11, 9, 10, 8, 11, 9, 10, 5, 9, 11, 8, 7, 11, 8, 10, 11, 7, 10, 8, 11, 10, 6, 11, 10, 9, 11, 10, 8, 6, 3, 10, 11, 6, 10, 8, 11, 1, 10, 8, 11, 4, 10, 11, 6, 10, 8, 9, 11, 8, 3, 9, 8, 11, 4, 8, 1, 11, 7, 10],
    [9, 11, 3, 7, 9, 10, 8, 6, 7, 11, 3, 10, 11, 7, 9, 11, 10, 9, 11, 4, 9, 11, 3, 9, 11, 10, 9, 11, 3, 7, 11, 6, 1, 11, 7, 10, 11, 1, 10, 11, 5, 7, 11, 9, 7, 11, 4, 9, 11, 7, 10, 11, 9, 4, 5, 10, 7, 11, 5, 7, 10, 8, 7, 10, 4, 3, 7, 11, 9, 1, 7, 11, 10, 7, 11, 10, 9, 6, 10, 4, 5, 10, 7, 4, 10, 6, 8, 10, 4, 5, 10, 7, 6, 4, 11, 9, 7, 11, 9],
    [6, 4, 7, 9, 4, 5, 9, 11, 6, 8, 4, 9, 5, 4, 7, 3, 8, 9, 1, 8, 7, 5, 11, 9, 5, 11, 7, 8, 4, 7, 11, 5, 1, 10, 11, 9, 10, 8, 7, 11, 9, 7, 11, 9, 7, 8, 5, 7, 8, 11, 3, 9, 10, 6, 9, 4, 11, 1, 9, 10, 3, 7, 4, 11, 8, 10, 1, 8, 9, 7, 4, 9, 10, 11, 8, 9, 11, 6, 10, 8, 3, 5, 7, 1, 11, 7, 5, 9, 6, 8, 9, 5, 10, 9, 8, 6, 10],
    [4, 8, 10, 3, 4, 8, 7, 4, 11, 10, 3, 8, 10, 9, 5, 10, 9, 11, 5, 9, 1, 7, 11, 10, 8, 5, 10, 9, 8, 5, 6, 9, 7, 8, 3, 9, 11, 7, 9, 5, 7, 8, 5, 4, 11, 3, 4, 10, 6, 9, 10, 6, 8, 1, 6, 9, 3, 8, 9, 10, 11, 8, 6, 7, 11, 9, 7, 8, 1, 7, 10, 8, 7, 11, 8, 7, 9, 8, 7, 5, 8, 7, 9, 6, 11, 5, 7, 11, 5, 7, 10, 9, 7, 11, 6, 4, 11],
];
var freeReels = [
    [5, 8, 7, 5, 4, 7, 1, 9, 6, 9, 7, 6, 9, 5, 7, 9, 8, 7, 9, 5, 7, 9, 5, 10, 9, 8, 11, 9, 8, 3, 4, 8, 10, 7, 5, 10, 11, 8, 7, 11, 9, 7, 11, 8, 7, 11, 8, 7, 3, 8, 7, 9, 1, 8, 9, 5, 8, 7, 3, 9, 8, 7, 9, 8, 5, 9, 4, 11, 9, 8, 5, 9, 11, 3, 8, 10, 5, 8, 10, 9, 8, 4, 7, 9, 10, 6, 7, 10, 6, 7, 1, 5, 7, 8, 11, 10, 5, 8, 10, 9, 11],
    [9, 10, 7, 8, 4, 10, 8, 7, 5, 9, 7, 11, 4, 7, 8, 5, 7, 9, 6, 10, 9, 6, 11, 10, 7, 8, 9, 6, 1, 10, 6, 7, 10, 8, 4, 11, 8, 9, 6, 8, 5, 10, 8, 11, 9, 10, 8, 11, 9, 10, 5, 9, 11, 8, 7, 11, 8, 10, 11, 7, 10, 8, 11, 10, 6, 11, 10, 9, 11, 10, 8, 6, 3, 10, 11, 6, 10, 8, 11, 1, 10, 8, 11, 4, 10, 11, 6, 10, 8, 9, 11, 8, 3, 9, 8, 11, 4, 8, 1, 11, 7, 10],
    [9, 11, 3, 7, 9, 10, 8, 6, 7, 9, 5, 10, 11, 7, 9, 11, 10, 9, 11, 4, 9, 11, 5, 9, 11, 10, 9, 5, 3, 7, 11, 6, 1, 11, 7, 10, 11, 1, 10, 11, 5, 7, 11, 9, 7, 11, 4, 9, 11, 7, 10, 11, 9, 4, 5, 10, 7, 11, 5, 7, 10, 8, 7, 10, 4, 3, 7, 11, 9, 1, 7, 11, 10, 7, 11, 10, 9, 6, 10, 4, 5, 10, 7, 4, 10, 6, 8, 10, 4, 5, 10, 7, 6, 4, 11, 9, 7, 11, 9, 7],
    [6, 4, 7, 9, 4, 5, 9, 11, 6, 8, 4, 9, 5, 4, 7, 5, 8, 9, 1, 8, 7, 5, 11, 9, 5, 11, 7, 8, 4, 7, 11, 5, 1, 10, 11, 9, 10, 8, 7, 11, 9, 7, 11, 9, 7, 8, 5, 7, 8, 11, 3, 9, 10, 6, 9, 4, 11, 1, 9, 10, 3, 7, 4, 11, 8, 10, 1, 8, 9, 7, 4, 9, 10, 11, 8, 9, 11, 6, 10, 8, 3, 5, 7, 1, 11, 7, 5, 9, 6, 8, 9, 5, 10, 9, 8, 6, 10],
    [4, 8, 10, 3, 4, 5, 7, 4, 11, 5, 6, 8, 10, 9, 5, 10, 9, 11, 5, 9, 1, 7, 11, 10, 8, 5, 10, 9, 8, 5, 6, 9, 7, 8, 3, 9, 11, 7, 9, 5, 7, 8, 5, 4, 11, 3, 4, 10, 6, 9, 10, 6, 8, 1, 6, 9, 3, 8, 9, 10, 11, 8, 6, 7, 11, 9, 7, 8, 1, 7, 10, 8, 7, 11, 8, 7, 9, 8, 7, 5, 8, 7, 9, 6, 11, 5, 7, 11, 5, 7, 10, 9, 7, 11, 6, 4, 11],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 5, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 40, 30, 30, 5, 5, 5, 5, 5],
    [0, 0, 0, 1000, 400, 100, 100, 40, 40, 25, 25, 25],
    [0, 0, 0, 5000, 2000, 750, 750, 150, 150, 100, 100, 100],
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
    [10, 11, 7, 3, 4], // 8
    [5, 11, 7, 3, 9], // 10
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

    this.mysterySymbol = 0;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0].view;
        this.mysterySymbol = this.freeSpinCacheList[0].mysterySymbol;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
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
        this.freeSpinIndex = 1;

        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    var result = MysterysFromView(this.view, this.mysterySymbol, player.betPerLine);
    this.mysteryView = result.view;
    this.mysteryPositions = result.positions;
    this.expanding = result.expanding;
    this.expandingWinMoney = result.win;

    this.winMoney = WinFromView(this.view, player.betPerLine) + this.expandingWinMoney;
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
    var scatterView = RandomScatterView(baseReels, bpl, totalBet);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);
    var scatterMysterySymbol = Util.random(3, 12);
    var scatterCache = {
        view: scatterView,
        mysterySymbol: scatterMysterySymbol,
    };
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length, scatterMysterySymbol);

    freeSpinData.viewList.push(scatterCache);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl, totalBet);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);
    var scatterMysterySymbol = Util.random(3, 12);
    var scatterCache = {
        view: scatterView,
        mysterySymbol: scatterMysterySymbol,
    };
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomBuyFreeViewCache(freeReels, bpl, freeSpinData.length, scatterMysterySymbol, (totalBet * this.buyMulti) / 5);

    freeSpinData.viewList.push(scatterCache);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0,
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

        if (!isFreeSpinWin(view) && !isDoubleSymbol(view)) {
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

        //              3                      .
        if (isFreeSpinWin(view) && WinFromView(view, bpl) < totalBet * 5) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, mysterySymbol) {
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
                fsview = RandomView(reels);

                fsWin = WinFromView(fsview, bpl);
                var temp = MysterysFromView(fsview, mysterySymbol, bpl);
                fsWin += temp.win;

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

var RandomBuyFreeViewCache = function (reels, bpl, fsLen, mysterySymbol, lowLimit) {
    while (true) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);

                fsWin = WinFromView(fsview, bpl);
                var temp = MysterysFromView(fsview, mysterySymbol, bpl);
                fsWin += temp.win;

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

        if (freeSpinData.win > lowLimit) {
            return freeSpinData;
        }
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
    return symbol == wild || symbol == scatter;
};

var isScatter = function (symbol) {
    return symbol == scatter || symbol == wild;
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

var isDoubleSymbol = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var first = i + slotWidth;
        var second = i + slotWidth * 2;

        if (view[i] == view[first] || view[first] == view[second] || view[i] == view[second]) {
            return true;
        }
    }

    return false;
};

var ScatterWinFromView = function (view, totalBet) {
    var win = 0;

    var nScatters = NumberOfScatters(view);
    if (nScatters == 3) {
        win = totalBet * 2;
    } else if (nScatters == 4) {
        win = totalBet * 20;
    } else if (nScatters == 5) {
        win = totalBet * 200;
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

var MysterysFromView = function (view, mysterySymbol, bpl) {
    var mysteryView = Util.clone(view);
    var count = 0;
    var afterExpanding = [];

    var positions = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == mysterySymbol) {
            positions.push(i);
        }
    }

    for (var i = 0; i < slotWidth; i++) {
        var isMysteryReel = false;
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            if (mysteryView[viewPos] == mysterySymbol) {
                count++;
                isMysteryReel = true;
                break;
            }
        }
        if (isMysteryReel) {
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                mysteryView[viewPos] = mysterySymbol;
                //                                                                                 
                if (view[viewPos] != mysterySymbol) afterExpanding.push(viewPos);
            }
        }
    }

    var expanding = `${mysterySymbol}~${positions.join()}~${afterExpanding.join()}`;
    var winMoney = payTable[count][mysterySymbol] * bpl * payLines.length;

    if (winMoney == 0) {
        mysteryView = [];
        expanding = "";
        positions = [];
    }

    var result = {
        view: mysteryView,
        positions: positions.join(),
        expanding: expanding,
        win: winMoney,
    };
    return result;
};

module.exports = SlotMachine;