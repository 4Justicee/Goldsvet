var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.respinStatus = "NORESPIN";
    this.prevRespinStatus == "NORESPIN";
    this.lineCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.winSymbols = [];
    //              
    this.respinIndex = 0;
    this.respinCacheList = [];
    this.respinWinMoney = 0;
    this.respinSticky = [];
    this.respinStickyPos = [];
    this.respinMask = [];
    //                      
    this.patternCount = 2000;   //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];       //                                      
};

var slotWidth = 3;
var slotHeight = 3;
var wild = 11;
var baseReels = [
    [3, 3, 3, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 9, 9, 9, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 9, 9, 9, 9, 9, 9, 8, 8, 8, 10, 10, 10, 10, 10, 10, 4, 4, 4],
    [3, 3, 3, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 10, 10, 10, 10, 10, 10, 9, 9, 9, 7, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 4, 10, 10, 10, 10, 10, 10, 8, 8, 8, 5, 5, 5],
    [3, 3, 3, 10, 10, 10, 10, 10, 10, 9, 9, 9, 6, 6, 6, 6, 6, 6, 10, 10, 10, 10, 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 8, 8, 8, 9, 9, 9, 9, 9, 9, 6, 6, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 300, 200, 100, 50, 25, 15, 10, 5, 1000]
];
var payLines = [
    [3, 4, 5],
    [0, 1, 2],
    [6, 7, 8],
    [6, 4, 2],
    [0, 4, 8]
];
//com                               ...
//rs                                uw
//srf   3~11~                  
var percentList = {
    superRespinPercent: 7,  //                                      
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 10; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevRespinStatus = this.respinStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (this.respinStatus == "RESPIN") {
        this.ReSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BONUS" || viewCache.type == "RESPIN") { //                       
        this.respinIndex = 1;
        this.respinCacheList = viewCache.view;
        this.view = this.respinCacheList[0];
        this.respinSticky = GetStickyReels(this.view);
        this.respinStickyPos = GetStickyPos(this.respinSticky);
        this.respinWinMoney = 0;
        this.respinStatus = "RESPIN";
    }
    else {
        this.view = viewCache.view;
        this.winMoney = WinFromView(this.view, player.betPerLine);
        var { winLines, winSymbols } = WinLinesFromView(this.view, player.betPerLine); //                                        
        this.winLines = winLines;
        this.winSymbols = winSymbols;
        this.respinStickyPos = [];      //                                      
        this.respinWinMoney = this.winMoney;
    }
};

SlotMachine.prototype.ReSpin = function (player) {
    this.respinMask = this.respinCacheList[this.respinIndex];
    this.view = GetFinalView(this.view, this.respinMask, this.respinSticky);

    var finalStickyReels = GetStickyReels(this.view);

    this.winMoney = WinFromView(this.view, player.betPerLine);
    var { winLines, winSymbols } = WinLinesFromView(this.view, player.betPerLine); //                                        
    this.winLines = winLines;
    this.winSymbols = winSymbols;

    if (finalStickyReels.length > this.respinSticky.length && this.winMoney == 0) {
        this.respinSticky = finalStickyReels;
        this.respinStickyPos = GetStickyPos(this.respinSticky);
    }

    this.respinIndex++;

    //                 
    if (this.winMoney > 0) {
        this.respinWinMoney = this.winMoney;
        this.respinStatus = "NORESPIN";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    //                            [      ] *                                                             ~~                 .

    if (baseWin > 0) {
        if (Util.probability(percentList.superRespinPercent))
            return RandomBonusViewCache(baseReels, bpl, baseWin, 1);
        else
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
    return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall) {
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin, 0);

    return {
        win: bonusSpinData.win,
        view: bonusSpinData.view,
        type: "BONUS",
        bpl: bpl,
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
        if (tmpWin > bottomLimit && tmpWin <= maxWin && !isRespinView(tmpView))
            break;

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
        if (tmpWin == 0 && !isRespinView(tmpView)) {
            break;
        }
    }
    return tmpView;
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

var RandomBonusViewCache = function (reels, bpl, bsWin, isRespin) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var bonusSpinData = RespinViewCache(reels, bpl, isRespin);

        if (bonusSpinData.win >= minMoney && bonusSpinData.win <= maxMoney) {
            return bonusSpinData;
        }

        if (bonusSpinData.win > lowerLimit && bonusSpinData.win < minMoney) {
            lowerLimit = bonusSpinData.win;
            lowerView = bonusSpinData;
        }
        if (bonusSpinData.win > maxMoney && bonusSpinData.win < upperLimit) {
            upperLimit = bonusSpinData.win;
            upperView = bonusSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var RespinViewCache = function (reels, bpl, isRespin = 0) {
    var tmpView = [];
    var tmpWin = 0;

    while (true) {
        var stickyReels = [];
        var sReelNo = Util.random(0, 3);

        tmpView = RandomZeroView(reels, bpl);

        for (var j = 0; j < slotHeight; ++j) {
            tmpView[sReelNo + slotWidth * j] = 3;
        }

        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0)
            break;
    }
    stickyReels = GetStickyReels(tmpView);

    var viewList = [tmpView];

    while (tmpWin == 0) {
        var maskView = RandomView(reels);
        var finalView = GetFinalView(tmpView, maskView, stickyReels);
        var finalStickyReels = GetStickyReels(finalView);

        tmpWin = WinFromView(finalView, bpl);

        if (finalStickyReels.length > stickyReels.length && tmpWin == 0)
            stickyReels = [...finalStickyReels];

        viewList.push(maskView);
    }

    return {
        view: viewList,
        win: tmpWin,
        bpl: bpl,
        type: isRespin ? "RESPIN" : "BONUS",
        isCall: isRespin ? 0 : 1
    };
};

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }
    return money;
};

var getBaseSymbol = function (reelSymbols) {
    var symbol = wild;

    for (var i = 0; i < reelSymbols.length; i++) {
        if (isWild(reelSymbols[i])) {
            continue;
        }

        symbol = reelSymbols[i];
        break;
    }
    return symbol;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var winSymbols = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);

        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
            winSymbols.push(getBaseSymbol(lineSymbols));
        }
    }
    return { winLines, winSymbols };
};

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) { //                                       
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                          
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                                           
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) { //                                         -1          
        lineSymbols[i] = -1;
    }
    return payTable[matchCount][symbol] * bpl; //                                      
};

var isEqual = function (a, b) {
    return a == b || b == wild || a == wild;
};

var GetStickyReels = function (view) {
    var res = [];

    for (var i = 0; i < slotWidth; ++i) {
        var isReelSame = true;
        var base = 3;   //3                               .
        for (var j = 0; j < slotHeight; ++j) {
            isReelSame &= isEqual(base, view[i + j * slotWidth]);
        }
        if (isReelSame)
            res.push(i);
    }

    return res;
};

var GetStickyPos = function (stickyReels) {
    var res = [];

    for (var i = 0; i < stickyReels.length; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = j * slotWidth + stickyReels[i];

            res.push(pos);
        }
    }

    return res;
};

var GetFinalView = function (view, maskView, stickyReels) {
    var tmpView = [...view];

    for (var i = 0; i < slotWidth; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = j * slotWidth + i;

            if (stickyReels.indexOf(i) < 0) {
                tmpView[pos] = maskView[pos];
            }

            if (tmpView[pos] == 3)
                tmpView[pos] = wild;
        }
    }

    return tmpView;
};

var isRespinView = function (view) {
    var res = GetStickyReels(view);

    return res.length > 0;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

module.exports = SlotMachine;