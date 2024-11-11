var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
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

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE

    this.baseWinPercent = 90;
};

var scatter = 1, wild = 2, wild2X = 15, wild3X = 16;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [9, 8, 12, 8, 10, 7, 5, 11, 4, 3, 7, 10, 13, 1, 6, 9, 13, 6, 11, 12],
    [3, 6, 8, 13, 7, 10, 9, 11, 10, 9, 6, 5, 12, 2, 4, 8, 11, 12, 13, 7, 3, 6, 8, 13, 7, 10, 9, 11, 10],
    [4, 9, 13, 12, 13, 7, 8, 12, 6, 1, 12, 10, 11, 7, 5, 11, 3, 10, 8, 9, 6, 4, 9, 13, 12, 13, 7, 8, 12],
    [2, 6, 10, 7, 11, 13, 12, 5, 9, 3, 6, 7, 12, 9, 13, 8, 10, 11, 4, 8, 6, 7, 12, 9, 13, 8, 10, 11,],
    [8, 11, 7, 6, 13, 9, 10, 5, 1, 12, 6, 3, 8, 4, 7, 10, 13, 12, 11, 9, 4, 7, 10, 13, 12, 11, 9]
];
var freeReels = [
    [12, 5, 11, 9, 13, 8, 13, 12, 5, 11, 9, 13, 8, 13, 10, 12, 11, 10, 13, 11, 3, 8, 8, 9, 6, 9, 10, 12, 6, 7, 4, 7, 5],
    [13, 11, 7, 9, 4, 12, 7, 13, 11, 7, 9, 4, 12, 7, 3, 10, 9, 8, 13, 11, 10, 13, 5, 6, 9, 2, 7, 6, 10, 12, 8, 11],
    [6, 12, 10, 13, 7, 12, 5, 10, 8, 7, 2, 13, 3, 6, 9, 8, 11, 8, 5, 12, 9, 4, 11, 10, 9, 13],
    [13, 9, 5, 7, 13, 6, 12, 11, 6, 10, 13, 12, 9, 7, 8, 10, 4, 2, 8, 7, 5, 9, 11, 3, 12, 8, 6, 10, 11, 13, 12, 9, 7, 8, 10, 4, 2, 8,],
    [13, 12, 11, 7, 10, 11, 7, 13, 4, 9, 12, 6, 10, 3, 8, 6, 11, 8, 9, 13, 7, 9, 5, 8, 12, 8, 6, 11, 8, 9, 13, 7, 9, 5, 8, 12]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 50, 35, 25, 20, 12, 8, 5, 5, 2, 2, 2],
    [0, 0, 0, 150, 100, 60, 40, 25, 20, 10, 10, 5, 5, 5],
    [0, 0, 0, 750, 500, 300, 200, 150, 100, 50, 50, 25, 25, 25]
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
];

var percentList = {
    freeWinPercent: 30,
    wild3XPercent: 40,
    // wild2XPercent : 100 - wild3XPercent
    lowCountPercent: 50,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 50; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    this.multiPositions = [];
    this.multiValues = [];

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
        this.freeSpinCountArr = cache.countArray;
        this.freeSpinLength = cache.length;
        this.view = this.freeSpinCacheList[0];
    }

    var view = this.view;

    var multi = GetWildMultisFromView(this.view);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    this.view = GetFinalView(view);
    this.winMoney = WinFromView(view, player.betPerLine);
    this.winLines = WinLinesFromView(view, player.betPerLine);

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
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var prevView = this.view;
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    var multi = GetWildMultisFromView(this.view);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    //is api      
    this.maskView = GetMaskView(this.view, prevView);

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    // console.log(this.view.join(",") + " = " + this.winMoney);

    this.view = GetFinalView(this.view);


    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    var stickys = [];
    for (var i = 0; i < this.multiPositions.length; i++) {
        stickys.push(`${this.multiPositions[i]},${this.multiPositions[i]}`);
    }
    this.freeSpinSticky = stickys.join(`~`);

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";

        var stickys = [];
        for (var i = 0; i < this.multiPositions.length; i++) {
            stickys.push(`${this.multiPositions[i]},-1`);
        }
        this.freeSpinSticky = stickys.join(`~`);
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {

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
            //return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
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
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);

    //                           
    var fsLenInfo = RandomFreeSpinCounts();
    var freeSpinData = {
        length: fsLenInfo.total,
        countArray: fsLenInfo.arr,
        viewList: []
    }

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0
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
    return tmpView
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

        for (var i = 0; i < view.length; i++) {
            if (isWild(view[i])) {
                view[i] = Util.probability(percentList.wild3XPercent) ? wild3X : wild2X;
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

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
            if (isScatter(view[viewPos]) || isWild(view[viewPos])) {
                view[viewPos] = Util.random(3, 13);
            }
        }
    }

    var reelNoArr = [0, 2, 4];

    for (var i = 0; i < reelNoArr.length; i++) {
        var height = Util.random(0, 3);
        var pos = height * slotWidth + reelNoArr[i];
        view[pos] = scatter;
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
        var wildMultiPositions = [];
        var wildMultiValues = [];

        while (true) {
            var fsview;
            while (true) {
                fsview = RandomView(reels);
                //                                                                                             
                var win = WinFromView(fsview, bpl);
                if (Util.probability(percentList.freeWinPercent) || win == 0) {
                    break;
                }
            }

            fsview = GetWildStickyView(fsview, wildMultiPositions, wildMultiValues);

            freeSpinData.viewList.push(fsview);
            var winMoney = WinFromView(fsview, bpl);

            var multi = GetWildMultisFromView(fsview);
            wildMultiPositions = multi.positions;
            wildMultiValues = multi.values;

            freeSpinWinMoney += winMoney;

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
        //                                               
        if (isWildMulti(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    //                                                                                                  
    var lineMulti = 0;
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWildMulti(lineSymbols[i])) {
            lineMulti += GetWildMulti(lineSymbols[i]);
            lineSymbols[i] = symbol;
        }
    }

    if (lineMulti == 0) {
        lineMulti = 1;
    }

    //                                 
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    //                                              -1   ,     lineSymbols    WinLines             
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl * lineMulti;
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

var isWildMulti = function (symbol) {
    return symbol == wild2X || symbol == wild3X;
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
        return totalBet * 5;
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

var GetWildMultisFromView = function (multiView) {
    var multiPositions = [],
        multiValues = [];
    for (var i = 0; i < multiView.length; i++) {
        var symbol = multiView[i];
        if (isWildMulti(symbol)) {
            multiPositions.push(i);
            var multi = GetWildMulti(symbol);
            multiValues.push(multi);
        }
    }
    return {
        positions: multiPositions,
        values: multiValues
    };
};

var GetWildMulti = function (symbol) {
    switch (symbol) {
        case wild2X:
            return 2;
        case wild3X:
            return 3;
    }
    return 0;
};

var GetFinalView = function (view) {
    var finalView = [...view];
    for (var i = 0; i < finalView.length; i++) {
        if (isWildMulti(finalView[i])) {
            finalView[i] = wild;
        }
    }
    return finalView;
};

var GetMaskView = function (currentView, prevView) {
    var wildCount = 0;
    var maskView = [...currentView];
    for (var i = 0; i < maskView.length; i++) {

        //                                               
        if (isWild(prevView[i])) {
            maskView[i] = Util.random(3, 13);
            wildCount++;
        } else if (isWildMulti(maskView[i])) { //             15,16        2   
            maskView[i] = wild;
        }
    }
    if (wildCount == 0) {
        return [];
    }
    return maskView;
};

var GetWildStickyView = function (view, wildMultiPositions, wildMultiValues) {
    var resultView = [...view];
    for (var i = 0; i < wildMultiPositions.length; i++) {
        var pos = wildMultiPositions[i];
        resultView[pos] = wildMultiValues[i] == 2 ? wild2X : wild3X;
    }
    return resultView;
};

var GetWildMultisFromView = function (view) {
    var multiPositions = [], multiValues = [];
    for (var i = 0; i < view.length; i++) {
        var symbol = view[i];
        if (isWildMulti(symbol)) {
            multiPositions.push(i);
            var multi = GetWildMulti(symbol);
            multiValues.push(multi);
        }
    }
    return {
        positions: multiPositions,
        values: multiValues
    };
};

var RandomFreeSpinCounts = function () {
    var length = 3 * 3;
    var freeSpinCountArr = [];

    var totalCount = Util.random(10, 18);
    if (Util.probability(percentList.lowCountPercent)) {
        totalCount = Util.random(9, 12);
    }

    var leftIndexs = [];
    for (var i = 0; i < length; i++) {
        freeSpinCountArr[i] = 1;
        leftIndexs[i] = i;
        totalCount--;
    }

    while (totalCount > 0) {
        var randomIndex = Util.random(0, leftIndexs.length);
        var index = leftIndexs[randomIndex];
        //                
        if (freeSpinCountArr[index] == 3) {
            leftIndexs = Util.remove(leftIndexs, randomIndex);
            continue;
        }
        freeSpinCountArr[index]++;
        totalCount--;
    }

    var total = 0;
    for (var i = 0; i < freeSpinCountArr.length; i++) {
        total += freeSpinCountArr[i];
    }

    return {
        arr: freeSpinCountArr,
        total: total
    };
}

module.exports = SlotMachine;