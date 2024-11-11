var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];

    this.level = 1;
    this.zeroSpinCount = 0;
    this.winSpinCount = 0;
    this._level = 1;
    this._zeroSpinCount = 0;
    this._winSpinCount = 0;
    this.winMulti = 1;
    this.accm = "";
    this.accv = "";

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = []; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var wild = 2;
var slotWidth = 3, slotHeight = 3;
var baseReels = [
    [9, 9, 9, 4, 3, 4, 4, 4, 6, 9, 8, 2, 7, 7, 7, 7, 5, 2, 2, 2, 3, 3, 3, 5, 5, 5, 8, 8, 8, 6, 6, 6, 4, 5, 7, 2, 5],
    [8, 9, 9, 9, 7, 2, 5, 7, 7, 7, 6, 5, 5, 5, 3, 3, 3, 3, 4, 9, 8, 8, 8, 2, 2, 2, 4, 4, 4, 6, 6, 6, 2, 6, 3, 6, 9, 3, 6, 5, 9, 2, 7, 4, 6, 3, 6, 3, 4, 7, 5, 3, 7, 3, 6, 3, 7, 9, 2, 9, 3, 7, 6, 2, 7, 6, 3, 9, 7, 9, 7, 6, 2, 3, 4, 2, 6, 3, 9, 6, 9, 6, 7, 6, 2, 9, 2],
    [6, 6, 6, 4, 4, 4, 4, 8, 6, 3, 7, 2, 8, 8, 8, 9, 5, 5, 5, 5, 9, 9, 9, 3, 3, 3, 7, 7, 7, 2, 2, 2, 5, 2, 8, 5, 2, 8, 3, 4, 5, 4, 2, 3, 8, 2, 8, 5, 7, 3]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 20, 15, 10, 8, 5, 3, 2]
];
var payLines = [
    [3, 4, 5], // 1
    [0, 1, 2], // 2
    [6, 7, 8], // 3
    [0, 4, 8], // 4
    [6, 4, 2], // 5
];
var levelUpArray = [4, 9, 14, 19, 25]; //                                          
var winMultiList = [ //                                 
    [2, 3, 5],
    [3, 5, 8],
    [5, 8, 10],
    [8, 10, 15],
    [10, 15, 50],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    if (this.winMoney > 0) {
        this.zeroSpinCount = 0;
        this.level = 1;
    }

    var viewCache = player.viewCache;

    this.view = viewCache.view;
    this.winMulti = viewCache.winMulti;

    this.winMoney = WinFromView(this.view, player.betPerLine) * this.winMulti;
    this.winLines = WinLinesFromView(this.view, player.betPerLine, this.winMulti);

    this.zeroSpinCount++;

    this.accv = `${this.zeroSpinCount};`;
    if (levelUpArray.indexOf(this.zeroSpinCount) > -1) {
        this.level++;
        this.accm = "cp;cp~tp~lvl~sc~cl;cp~pp";
        this.accv += `0~1~${this.level}~1~${this.level - 1};`
    } else {
        this.accm = "cp;cp~tp~lvl~sc;cp~pp";
        this.accv += `0~1~${this.level}~0;`
    }

    var prevWinSpinCount = this.winSpinCount;
    if (this.winMoney > 0) {
        this.winSpinCount++;
    } else {
        this.winSpinCount = 0;
    }

    this.accv += `${this.winSpinCount}~${prevWinSpinCount}`;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    if (this._level > 1) {
        var winMultiSet = winMultiList[this._level - 2];
        this._winMulti = winMultiSet[Util.random(0, winMultiSet.length)];
    } else {
        this._winMulti = 1;
    }

    pattern.winMulti = this._winMulti;

    if (baseWin > 0) {  //                                  
        Object.assign(pattern, RandomWinView(baseReels, bpl, baseWin, this._winMulti));
    } else {
        Object.assign(pattern, RandomZeroView(baseReels, bpl));
    }

    if (pattern.win > 0) {
        this._winSpinCount++;
        this._zeroSpinCount = 0;
        this._level = 1;
    } else {
        this._winSpinCount = 0;
        this._zeroSpinCount++;
    }

    if (levelUpArray.indexOf(this._zeroSpinCount) >= 0) {
        this._level++;
    }

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    if (jpType == "RANDOM") {
        return this.SpinForBaseGen(bpl, totalBet, jpWin);
    } else {
        return null;
    }
};

var RandomWinView = function (reels, bpl, maxWin, winMulti) {
    var tmpView = [], tmpWin = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl) * winMulti;

        if (tmpWin > 0 && tmpWin <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return { view: tmpView, win: tmpWin };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView = [], tmpWin = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);

        if (tmpWin == 0) {
            break;
        }
    }

    return {
        view: tmpView,
        win: 0
    }
};

var RandomView = function (reels) {
    var resultView = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            resultView[viewPos] = reels[i][reelPos];
        }
    }

    return resultView;
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

var WinLinesFromView = function (view, bpl, multi) {
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
    return symbol == wild;
};

module.exports = SlotMachine;