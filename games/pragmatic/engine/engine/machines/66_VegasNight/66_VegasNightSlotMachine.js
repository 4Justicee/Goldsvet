var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                    
    this.multiPositions = [];
    this.multiValues = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinCountArr = [];
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.wdrm_v = "";

    //                        
    this.reSpinIndex = 0;
    this.reSpinLength = 0;
    this.reSpinBeforeMoney = 0;
    this.respinWinMoney = 0;
    this.reSpinCacheList = [];
    this.respinStatus = "NORESPIN";
    this.prevRespinStatus = "NORESPIN";

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, royalWild = 12, superWild = 13;
var slotWidth = 5, slotHeight = 3;
var freeSpinLength = 5, reSpinLength = 3;
var baseReels = [
    [8, 6, 10, 9, 6, 5, 11, 6, 4, 9, 10, 11, 10, 5, 11, 7, 11, 5, 3],
    [7, 8, 4, 1, 11, 10, 7, 4, 9, 8, 2, 2, 2, 2, 2, 5, 7, 3, 5, 1, 6, 9, 2, 11, 4, 8, 8],
    [8, 3, 7, 9, 7, 6, 1, 7, 8, 7, 10, 3, 1, 4, 11, 2, 2, 2, 2, 2, 2, 2, 4, 11, 5, 4],
    [8, 1, 11, 7, 11, 1, 5, 10, 2, 2, 2, 2, 3, 9, 4, 2, 9, 3, 6, 7, 2],
    [7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 7, 4, 5, 7, 4, 3, 9, 6, 2, 2, 3, 11, 11, 13, 2, 2, 8, 4, 6, 9, 3, 10, 8, 10, 11, 6, 7, 5, 5, 8, 8, 9, 5, 10, 7, 4, 6, 4, 10, 9]
];
var freeReels = [
    [8, 9, 6, 10, 9, 4, 10, 7, 5, 5, 11, 7, 3, 8, 8, 4, 6, 9, 9, 6, 11, 10],
    [11, 1, 7, 5, 4, 11, 4, 11, 8, 4, 7, 11, 2, 2, 1, 9, 3, 3, 10, 9, 6, 2, 2, 5],
    [7, 3, 5, 2, 2, 11, 2, 2, 11, 9, 10, 4, 4, 6, 3, 3, 8, 1, 11, 5, 7, 1, 7],
    [2, 11, 5, 6, 8, 9, 3, 7, 3, 7, 6, 11, 10, 8, 10, 2, 2, 4, 9, 1],
    [9, 4, 4, 2, 2, 7, 10, 2, 2, 4, 10, 10, 11, 5, 7, 8, 4, 7, 9, 3, 11, 5, 13, 8, 9, 9, 6, 10, 7, 6, 7, 8, 7, 6, 3, 11, 11, 2, 2, 5, 3]
];
var reSpinReels = [
    [6, 3, 9, 5, 6, 10, 4, 7, 11, 8, 6, 9, 5, 3, 11, 11, 9, 10, 5, 5],
    [12, 12, 3, 6, 5, 2, 2, 2, 2, 2, 12, 12, 4, 12, 5, 6, 12, 7, 4, 12, 7],
    [4, 3, 12, 12, 6, 12, 7, 12, 12, 7, 2, 2, 2, 2, 2, 2, 4, 2, 3, 7, 12, 3, 7, 4, 5],
    [4, 6, 2, 2, 2, 2, 7, 3, 5, 12, 7, 6, 12, 2, 12, 12, 4, 2],
    [12, 12, 6, 4, 6, 5, 6, 2, 2, 2, 2, 2, 2, 12, 12, 2, 4, 7, 3, 2, 12, 12, 7, 2, 3, 2, 5, 7, 5, 3, 7, 5, 7, 2, 12, 12]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0],
    [0, 0, 0, 75, 50, 25, 25, 20, 20, 10, 10, 10, 0, 0],
    [0, 0, 0, 150, 125, 100, 100, 75, 50, 50, 50, 50, 0, 0]
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
var wildMultiRandomArray = [2, 2, 2, 2, 2, 2, 2, 3, 3, 3];
var wildMultiInfos = []; //             (      ,          ,       )      
var usedWildMultis = []; //                                           

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 25; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevRespinStatus = this.respinStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];

    wildMultiInfos = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }
    if (this.respinStatus == "RESPIN") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
    }

    if (viewCache.type == "BONUS") {
        this.reSpinCacheList = viewCache.view;
        this.view = this.reSpinCacheList[0].view;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.respinWinMoney = this.winMoney;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isFreeSpinWin(this.view)) { //                          
        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinLength;
        this.winMoney += this.scatterWin;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = 0;
        this.currentGame = "FREE";
    }

    if (isReSpinWin(this.view)) { //                       
        this.reSpinIndex = 1;
        this.reSpinLength = reSpinLength;
        this.reSpinBeforeMoney = this.winMoney;
        this.respinWinMoney = 0;
        this.respinStatus = "RESPIN";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;
    wildMultiInfos = this.freeSpinCacheList[this.freeSpinIndex].wildMultiInfos;

    this.wdrm_v = "";
    for (var i = 0; i < wildMultiInfos.length; i++) {
        if (i > 0) {
            this.wdrm_v += ";";
        }
        this.wdrm_v += `${wildMultiInfos[i].symbol}~${wildMultiInfos[i].position}~${wildMultiInfos[i].multi}`;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.respinWinMoney = this.winMoney;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.totalBet);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;
    this.view = this.reSpinCacheList[this.reSpinIndex].view;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.totalBet);

    this.virtualReels = {
        above: RandomLineFromReels(reSpinReels),
        below: RandomLineFromReels(reSpinReels)
    };

    this.reSpinIndex++;
    this.respinWinMoney += this.winMoney;

    if (this.reSpinIndex > this.reSpinLength) {
        this.respinStatus = "NORESPIN";
    }
}

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
            break;
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default: break;
    }

    var result = {
        error: 1,
        msg: "Jackpot Type Error"
    };
    return result;
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var view = RandomScatterView(baseReels, bpl);
    var winMoney = WinFromView(view, bpl) + ScatterWinFromView(view, totalBet);

    freeSpinCacheList = [view];
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + winMoney,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var reSpinCacheList = [];
    var view = RadomeBonusView(baseReels, bpl);
    var winMoney = WinFromView(view, bpl);
    var obj = {
        view: view
    }
    reSpinCacheList.push(obj);
    var fsCache = RandomBonusViewCache(reSpinReels, bpl, bsWin);

    var pattern = {
        view: reSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + winMoney,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    };
    return pattern;
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
    var resultView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        if (!isFreeSpinWin(resultView) && !isReSpinWin(resultView)) {
            break;
        }
    }

    return resultView;
};

var RandomScatterView = function (reels, bpl) {
    var resultView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        if (isFreeSpinWin(resultView) && !isReSpinWin(resultView)) {
            break;
        }
    }

    return resultView;
};

var RadomeBonusView = function (reels, bpl) {
    var resultView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        if (!isFreeSpinWin(resultView) && isReSpinWin(resultView)) {
            break;
        }
    }

    return resultView;
};

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var pattern;
        var freeSpinCacheList = [],
            freeSpinIndex = 1,
            freeSpinLength = 5,
            freeSpinWinMoney = 0;


        while (freeSpinIndex <= freeSpinLength) {
            var view = RandomView(reels);

            wildMultiInfos = [];
            usedWildMultis = [];

            GetWildMultiInfos(view);

            var win = WinFromView(view, bpl);

            var temp = [];
            for (var i = 0; i < wildMultiInfos.length; i++) {
                if (usedWildMultis.indexOf(wildMultiInfos[i].position) > -1) {
                    temp.push(wildMultiInfos[i]);
                }
            }
            wildMultiInfos = temp;

            freeSpinWinMoney += win;
            freeSpinIndex++;

            var cacheData = {
                view: view,
                wildMultiInfos: wildMultiInfos
            };

            freeSpinCacheList.push(cacheData);
        }


        pattern = {
            cache: freeSpinCacheList,
            win: freeSpinWinMoney
        };

        if (pattern.win >= minMoney && pattern.win <= maxMoney) {
            return pattern;
        }

        if (pattern.win > lowerLimit && pattern.win < minMoney) {
            lowerLimit = pattern.win;
            lowerView = pattern;
        }
        if (pattern.win > maxMoney && pattern.win < upperLimit) {
            upperLimit = pattern.win;
            upperView = pattern;
        }
    }

    return lowerView ? lowerView : upperView;
};

var RandomBonusViewCache = function (reels, bpl, bsWin) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var pattern;
        var reSpinCacheList = [],
            reSpinIndex = 1,
            reSpinLength = 3,
            reSpinWinMoney = 0;

        while (reSpinIndex <= reSpinLength) {
            var view = RandomView(reels);

            wildMultiInfos = [];

            var win = WinFromView(view, bpl);

            reSpinWinMoney += win;
            reSpinIndex++;

            var cacheData = {
                view: view
            };

            reSpinCacheList.push(cacheData);
        }

        pattern = {
            cache: reSpinCacheList,
            win: reSpinWinMoney
        };

        if (pattern.win >= minMoney && pattern.win <= maxMoney) {
            return pattern;
        }

        if (pattern.win > lowerLimit && pattern.win < minMoney) {
            lowerLimit = pattern.win;
            lowerView = pattern;
        }
        if (pattern.win > maxMoney && pattern.win < upperLimit) {
            upperLimit = pattern.win;
            upperView = pattern;
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
        var linePay = WinFromLine(lineSymbols, line, bpl);
        money += linePay;
    }
    return money;
}
var WinFromLine = function (lineSymbols, line, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                                                                  
    var wildPosInLine = [0, 0, 0, 0, 0];
    //                                              
    var wildMulti = 1;
    //                                                             
    var usedWilds = [];


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
        if (wildPosInLine[i] == 1) {
            for (var j = 0; j < wildMultiInfos.length; j++) {
                if (wildMultiInfos[j].position == line[i]) {
                    wildMulti *= wildMultiInfos[j].multi;
                    usedWilds.push(wildMultiInfos[j].position); //                                                            
                }
            }
        }
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        . 
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl * wildMulti;

    if (winPay == 0) {
        usedWilds = []; //                                                     
    }

    for (var i = 0; i < usedWilds.length; i++) {
        if (usedWildMultis.indexOf(usedWilds[i]) == -1) {
            usedWildMultis.push(usedWilds[i]);
        }
    }
    return winPay;
}
var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line, line);
        var money = WinFromLine(lineSymbols, line, bpl);
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
    return symbol == wild || symbol == superWild || symbol == royalWild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
}
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
}
var ScatterWinFromView = function (view, totalBet) {
    if (isFreeSpinWin(view))
        return totalBet * 2;
    return 0;
};

var isReSpinWin = function (view) {
    return view[9] == superWild;
};

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
}

var GetWildMultiInfos = function (view) {
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i]) && view[i] != royalWild) {
            var wmInfo = {
                symbol: view[i],
                position: i,
                multi: wildMultiRandomArray[Util.random(0, wildMultiRandomArray.length)]
            };
            wildMultiInfos.push(wmInfo);
        }
    }

    return wildMultiInfos;
}

module.exports = SlotMachine;