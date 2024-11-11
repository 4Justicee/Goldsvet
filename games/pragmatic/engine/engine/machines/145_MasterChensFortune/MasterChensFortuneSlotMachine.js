var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 9;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];
    this.hasWildInScatterWin = false;

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["JACKPOT"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [7, 11, 5, 12, 9, 8, 4, 8, 7, 10, 8, 10, 6, 8, 10, 7, 12, 12, 8, 3, 12, 7, 8, 11, 6, 11, 11, 1, 9, 8, 8, 10, 5, 11, 9],
    [9, 10, 12, 4, 7, 6, 1, 11, 9, 7, 3, 9, 10, 2, 12, 12, 12, 10, 11, 9, 9, 5, 12, 9, 7, 11, 8, 9, 5, 10, 8, 8, 9, 9],
    [3, 9, 11, 8, 5, 7, 10, 11, 10, 6, 7, 7, 12, 10, 2, 12, 11, 8, 9, 2, 9, 1, 12, 4, 12, 12, 10, 8, 10, 9, 10, 10, 6],
    [8, 1, 11, 8, 11, 7, 11, 12, 2, 11, 10, 11, 8, 4, 10, 10, 9, 2, 9, 4, 5, 7, 7, 11, 12, 9, 11, 7, 6, 3, 6, 11, 8, 11],
    [4, 12, 8, 8, 12, 9, 7, 7, 6, 9, 11, 12, 12, 10, 5, 8, 12, 5, 12, 11, 7, 12, 6, 11, 12, 10, 7, 1, 8, 9, 5, 3, 12],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 3, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 20, 20, 10, 5, 5, 5, 5, 5],
    [0, 0, 0, 500, 250, 100, 100, 30, 25, 20, 20, 15, 15],
    [0, 0, 0, 5000, 2500, 1250, 750, 500, 300, 200, 150, 125, 100]
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
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 40; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    var scatterInfo = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
    this.scatterWin = scatterInfo.win;
    this.scatterPosition = scatterInfo.positions;
    this.hasWildInScatterWin = scatterInfo.hasWild;


    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var view, win;

    if (baseWin > 0) {
        view = RandomWinView(baseReels, bpl, baseWin);
    } else {
        view = RandomZeroView(baseReels, bpl);
    }
    win = WinFromView(view, bpl);

    var pattern = {
        view: view,
        win: win,
        type: "BASE",
        bpl: bpl
    };

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var newJpType = jpType;
    if (jpType == "RANDOM" || jpType == "JACKPOT") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "JACKPOT":
            return RandomFreeViewCache(baseReels, bpl, jpWin, totalBet, isCall);
        default:
            return;
    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (win > bottomLimit && win <= maxWin) {
            return view;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(baseReels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (win == 0) {
            return view;
        }
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

var RandomFreeViewCache = function (reels, bpl, fsWin, totalBet, isCall) {
    var patternCount = 500;
    if (isCall) {
        patternCount = 100000;
    }
    var minMoney = fsWin * 0.9;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < patternCount; patternIndex++) {
        var view = RandomView(reels);

        if (fsWin / totalBet >= 300) {
            for (var i = 0; i < 10; i++) {
                var pos = Util.random(0, view.length);
                if (pos % slotWidth == 0 || pos % slotWidth == 4) {
                    view[pos] = Util.random(3, 7);
                } else {
                    view[pos] = Util.random(2, 7);
                }
            }
        }

        var win = WinFromView(view, bpl);

        if (win >= minMoney && win <= maxMoney) {
            return {
                win: win,
                view: view,
                bpl: bpl,
                type: "BASE",
                isCall: isCall ? 1 : 0
            };
        }

        if (win > lowerLimit && win < minMoney) {
            lowerLimit = win;
            lowerView = {
                win: win,
                view: view,
                bpl: bpl,
                type: "BASE",
                isCall: isCall ? 1 : 0
            };
        }

        if (win > maxMoney && win < upperLimit) {
            upperLimit = win;
            upperView = {
                win: win,
                view: view,
                bpl: bpl,
                type: "BASE",
                isCall: isCall ? 1 : 0
            };
        }
    }

    return lowerView ? lowerView : upperView;
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

        var resultFromLeft = WinFromLineFromLeft(lineSymbols, bpl),
            linePayFromLeft = resultFromLeft.win;

        var resultFromRight = WinFromLineFromRight(lineSymbols, bpl),
            linePayFromRight = resultFromRight.win;

        money += linePayFromLeft + linePayFromRight;
    }

    money += ScatterWinFromView(view, bpl * 9).win;

    return money;
};

var WinFromLineFromLeft = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                                                                  
    var wildPosInLine = [0, 0, 0, 0, 0];
    //                                                            
    var winLineHasWild = false;


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
            wildPosInLine[i] = 1;
        }
    }

    //                                
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        if (wildPosInLine[i] == 1) winLineHasWild = true;
        matchCount++;
    }

    //                                             -1    
    var clonedLineSymbols = Util.clone(lineSymbols);
    for (var i = matchCount; i < lineSymbols.length; i++) {
        clonedLineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;

    if (winLineHasWild) winPay *= 2; //                                                     2             

    var result = {
        win: winPay,
        lineSymbols: clonedLineSymbols
    }

    return result;
};

var WinFromLineFromRight = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                                                                  
    var wildPosInLine = [0, 0, 0, 0, 0];
    //                                                            
    var winLineHasWild = false;


    //                   
    for (var i = lineSymbols.length - 1; i >= 0; i--) {
        if (isWild(lineSymbols[i])) //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    //                                                   
    for (var i = lineSymbols.length - 1; i >= 0; i--) {
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
            wildPosInLine[i] = 1;
        }
    }

    //                                
    for (var i = lineSymbols.length - 1; i >= 0; i--) {
        if (lineSymbols[i] != symbol) break;
        if (wildPosInLine[i] == 1) winLineHasWild = true;
        matchCount++;
    }

    //                                             -1    
    var clonedLineSymbols = Util.clone(lineSymbols);
    for (var i = lineSymbols.length - matchCount - 1; i >= 0; i--) {
        clonedLineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;
    if (matchCount == lineSymbols.length) {
        winPay = 0; //           5                                                                              
    }

    if (winLineHasWild) winPay *= 2; //                                                     2             

    var result = {
        win: winPay,
        lineSymbols: clonedLineSymbols
    }

    return result;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);

        var resultFromLeft = WinFromLineFromLeft(lineSymbols, bpl),
            linePayFromLeft = resultFromLeft.win,
            lineSymbolsFromLeft = resultFromLeft.lineSymbols;

        var resultFromRight = WinFromLineFromRight(lineSymbols, bpl),
            linePayFromRight = resultFromRight.win,
            lineSymbolsFromRight = resultFromRight.lineSymbols;

        if (linePayFromLeft > 0) {
            winLines.push(
                `${lineId}~${linePayFromLeft}~${line.filter(function (item, index, arr) {
                    return lineSymbolsFromLeft[index] != -1
                }).join('~')}`);
        }

        if (linePayFromRight > 0) {
            winLines.push(
                `${lineId}~${linePayFromRight}~${line.filter(function (item, index, arr) {
                    return lineSymbolsFromRight[index] != -1
                }).join('~')}`);
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

var GetScatterInfoFromLeft = function (view) {
    var count = 0,
        positions = [],
        hasWild = false;

    for (var i = 0; i < slotWidth; i++) {
        var hasScatter = false;

        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (isScatter(view[pos]) || isWild(view[pos])) {
                hasScatter = true;
                positions.push(pos);
                if (isWild(view[pos])) {
                    hasWild = true;
                }
                break;
            }
        }

        if (hasScatter) {
            count++;
        } else {
            break;
        }
    }

    var result = {
        count: count,
        positions: positions,
        hasWild: hasWild
    }

    return result;
};

var GetScatterInfoFromRight = function (view) {
    var count = 0,
        positions = [],
        hasWild = false;

    for (var i = slotWidth - 1; i >= 0; i++) {
        var hasScatter = false;

        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (isScatter(view[pos]) || isWild(view[pos])) {
                hasScatter = true;
                positions.push(pos);
                if (isWild(view[pos])) {
                    hasWild = true;
                }
                break;
            }
        }

        if (hasScatter) {
            count++;
        } else {
            break;
        }
    }

    var result = {
        count: count,
        positions: positions,
        hasWild: hasWild
    }

    return result;
};

var ScatterWinFromView = function (view, bet) {
    var win = 0,
        positions = [],
        hasWild = false;

    var resultFromLeft = GetScatterInfoFromLeft(view),
        scatterCountFromLeft = resultFromLeft.count,
        scatterPositionsFromLeft = resultFromLeft.positions,
        hasWildFromLeft = resultFromLeft.hasWild;

    var resultFromRight = GetScatterInfoFromRight(view),
        scatterCountFromRight = resultFromRight.count,
        scatterPositionsFromRight = resultFromRight.positions,
        hasWildFromRight = resultFromRight.hasWild;

    if (scatterCountFromLeft == 5) {
        win += bet * 100;
    } else if (scatterCountFromLeft == 4) {
        win += bet * 10;
    } else if (scatterCountFromLeft == 3) {
        win += bet * 5;
    } else if (scatterCountFromLeft == 2) {
        win += bet * 1;
    }

    if (scatterCountFromLeft > 1) {
        positions = positions.concat(scatterPositionsFromLeft);
        hasWild = hasWild || hasWildFromLeft;
    }

    if (scatterCountFromRight == 4) {
        win += bet * 10;
    } else if (scatterCountFromRight == 3) {
        win += bet * 5;
    } else if (scatterCountFromRight == 2) {
        win += bet * 1;
    }

    if (scatterCountFromRight > 1 && scatterCountFromRight < 5) {
        positions = positions.concat(scatterPositionsFromRight);
        hasWild = hasWild || hasWildFromRight;
    }

    var result = {
        win: win,
        positions: positions,
        hasWild: hasWild
    }

    return result;
};

module.exports = SlotMachine;