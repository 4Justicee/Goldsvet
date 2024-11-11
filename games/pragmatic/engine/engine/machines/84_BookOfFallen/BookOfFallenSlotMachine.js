var Util = require("../../../utils/slot_utils");

/*
                                                                                                              .
                                            
*/

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
    // this.buyMulti = 100;
    // this.buyPatternCount = 30;

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
    [9, 8, 11, 5, 8, 8, 10, 7, 8, 9, 6, 7, 5, 5, 7, 8, 11, 5, 1, 1, 9, 5, 9, 11, 7, 10, 7, 9, 8, 1, 6, 11, 3, 8, 10, 9, 10, 8, 9, 10, 7, 4, 8, 7, 8, 7, 7, 8, 7, 7, 9, 5, 11, 10, 9, 7, 10, 7, 11, 8, 9, 8, 9, 5, 8, 11, 9, 8, 9, 11, 4, 9, 10, 5, 6, 3, 6, 8, 8, 10, 3, 4, 7, 7, 9, 11, 4, 5, 9, 7, 3],
    [6, 10, 8, 6, 10, 3, 7, 8, 4, 6, 9, 11, 5, 7, 10, 8, 10, 9, 11, 8, 8, 6, 11, 10, 11, 8, 1, 7, 11, 11, 9, 11, 8, 9, 11, 6, 6, 8, 7, 7, 10, 11, 8, 8, 9, 11, 4, 9, 10, 8, 3, 8, 11, 10, 10, 4, 7, 8, 10, 11, 10, 10, 8, 3, 8, 10, 4, 5, 10, 8, 11, 7, 9, 6, 11, 6, 10, 10, 7, 8, 11, 11, 9],
    [7, 7, 5, 7, 1, 11, 10, 11, 7, 9, 11, 7, 4, 10, 7, 6, 7, 10, 5, 11, 7, 11, 6, 10, 11, 11, 5, 9, 4, 10, 9, 8, 9, 10, 6, 4, 8, 3, 7, 9, 8, 9, 10, 5, 7, 3, 4, 11, 8, 10, 1, 9, 9, 6, 11, 11, 4, 10, 8, 3, 10, 10, 7, 11, 9, 11, 11, 9, 10, 5, 6, 9],
    [1, 8, 9, 8, 5, 7, 6, 9, 10, 9, 7, 8, 10, 9, 9, 11, 11, 7, 9, 11, 8, 5, 7, 9, 11, 11, 7, 1, 9, 5, 8, 5, 4, 5, 7, 9, 11, 11, 7, 1, 9, 7, 5, 9, 8, 11, 5, 4, 6, 7, 5, 10, 6, 9, 9, 7, 10, 10, 3, 9, 5, 11, 8, 5, 11, 5, 11, 4, 4, 7, 9, 8, 10, 7, 8, 5, 3, 10, 6, 10, 10, 1, 9, 8, 9, 9, 7, 4, 8, 8, 9, 11, 3, 1, 6, 7, 11, 4, 4, 7, 8, 8, 10, 8, 3, 9, 7, 8, 6, 8, 11],
    [9, 8, 7, 5, 8, 10, 11, 7, 10, 9, 5, 5, 11, 6, 8, 3, 10, 11, 4, 11, 9, 4, 9, 7, 9, 6, 7, 11, 10, 10, 5, 10, 10, 7, 10, 5, 4, 9, 7, 9, 8, 11, 4, 1, 7, 9, 6, 5, 6, 9, 9, 6, 8, 4, 5, 11, 11, 10, 3, 7, 1, 8, 8, 4, 9, 10, 6, 6, 5, 3, 6, 7, 11, 9, 9, 5, 10, 6, 7, 7, 8, 3, 5, 4, 5, 6, 11, 1, 7, 7, 8, 11, 9, 3, 7, 6, 7, 9, 11, 9, 8, 10, 8, 8, 11, 5, 1, 8, 8, 5, 10, 3, 7]
];
var freeReels = [
    [7, 3, 4, 11, 7, 8, 4, 5, 8, 9, 7, 7, 5, 9, 9, 7, 10, 7, 5, 11, 9, 8, 4, 8, 10, 1, 7, 1, 10, 5, 10, 3, 9, 9, 11, 8, 5, 7, 7, 9, 11, 3, 9, 8, 9, 6, 8, 8, 10, 8, 11, 11, 6, 8, 6, 5],
    [10, 9, 11, 8, 10, 9, 8, 6, 8, 11, 8, 8, 11, 7, 10, 4, 8, 10, 1, 11, 3, 3, 11, 10, 10, 11, 11, 7, 5, 6, 8, 4, 6, 9, 11, 8, 4, 3, 9, 3, 10, 10, 8, 3, 8, 5, 10, 9, 8, 10, 11, 7, 11, 8, 6, 10, 7, 8, 4, 11, 7, 9, 9, 11, 11, 1, 8, 10, 10, 8, 11, 8, 8, 7, 11, 7, 10, 6, 9, 10, 6, 9, 11, 7, 6, 6, 10, 8, 11, 10],
    [9, 6, 5, 9, 11, 3, 6, 7, 9, 9, 5, 4, 8, 7, 7, 11, 7, 11, 10, 3, 10, 10, 8, 10, 4, 1, 11],
    [9, 10, 11, 1, 6, 11, 10, 9, 9, 6, 11, 9, 10, 6, 5, 8, 11, 10, 7, 11, 9, 10, 8, 4, 4, 5, 8, 9, 9, 7, 5, 3, 11, 6, 9, 7, 8, 8, 9, 7, 7, 3, 9, 11, 10, 10, 7, 8, 11, 1, 8, 1, 9, 4, 8, 10, 7, 8, 11, 11, 9, 8, 8, 11, 3, 7, 3, 5, 6, 7, 7, 3, 10, 5, 10, 6, 9, 8, 8, 10, 11, 7, 11, 7, 8, 5, 9, 3, 10, 4, 8, 11, 9, 8, 1, 4, 7, 4, 10, 5, 10, 10, 7, 7, 1, 5, 11, 5, 4, 5],
    [3, 7, 1, 6, 11, 10, 10, 8, 7, 10, 8, 11, 6, 1, 10, 5, 4, 11, 8, 9, 7, 4, 1, 9, 9, 7, 5, 6, 7, 4, 11, 10, 9, 9, 8, 8, 5, 11, 3, 8, 11, 5, 7, 9, 8, 10, 5, 4, 5, 9, 5, 9, 6, 3, 10, 6, 3, 6, 10, 5, 10, 9, 3, 11, 9, 6, 11, 7, 4, 8, 7, 7]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 5, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 40, 30, 30, 5, 5, 5, 5, 5],
    [0, 0, 0, 1000, 400, 100, 100, 40, 40, 25, 25, 25],
    [0, 0, 0, 5000, 2000, 750, 750, 150, 150, 100, 100, 100]
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
    [5, 11, 7, 3, 9] // 10
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
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.scatterPositions = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, Number(player.betPerLine * this.lineCount));
    this.winMoney += this.scatterWin;

    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;

        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
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

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var newJpType = jpType;

    if (jpType === "RANDOM") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
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

module.exports = SlotMachine;