var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus == "NOTUMBLE";
    this.lineCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                                 
    this.tumbleIndex = 0;
    this.tumbleCacheList = [];
    this.tmb_res = 0;
    this.tumbleSticky = [];     //                   
    this.tumbleStickyPos = [];  //                         ...
    this.tumbleMask = [];       //          is                 
    //          
    this.moneyBonusWin = 0;
    this.wof_set = [];
    this.multiIndex = 0;
    this.totalMulti = 0;
    this.moenyBonusCache = [];
    this.moneyBonusCacheIndex = 0;
    this.moneyBonusLevel = 0;
    //                      
    this.patternCount = 2000;   //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];
};

var slotWidth = 3, slotHeight = 3;
var wild = 2;
var baseReels = [
    [6, 2, 7, 8, 8, 8, 2, 2, 2, 5, 5, 5, 6, 6, 6, 7, 7, 7, 4, 4, 4, 9, 9, 9, 8, 8, 8, 3, 3, 3, 6, 2, 8, 7, 7, 7, 10, 10, 10, 6, 6, 6, 2, 2, 2, 8, 8, 8, 9, 9, 9, 4, 4, 4],
    [2, 2, 2, 6, 6, 6, 7, 7, 7, 10, 10, 10, 5, 5, 5, 6, 6, 6, 9, 9, 9, 9, 4, 5, 7, 7, 7, 4, 10, 9, 8, 8, 8, 2, 2, 2, 5, 5, 5, 4, 4, 4, 8, 8, 8, 5, 2, 4, 3, 3, 3, 6, 6, 6, 8, 8, 8, 5, 5, 5],
    [10, 10, 10, 3, 3, 3, 7, 7, 7, 9, 9, 9, 6, 6, 6, 2, 2, 2, 5, 5, 5, 8, 2, 7, 8, 8, 8, 6, 6, 6, 8, 9, 7, 4, 4, 4, 9, 9, 9, 7, 7, 7, 2, 2, 2, 5, 5, 5, 9, 9, 9, 8, 8, 8, 4, 4, 4]
];
var tumbleReels = [   //                                             ,                                                            .
    [8, 8, 9, 5, 5, 5, 3, 6, 3, 3, 3, 7, 9, 8, 9, 10, 7, 3, 5, 10, 6, 4, 4, 4, 6, 7, 6, 2, 2, 2, 4, 4, 4, 8, 8, 9, 4, 6, 4, 4, 4, 7, 9, 8, 2, 2, 2, 9, 10, 7, 4, 3, 10, 6, 5, 5, 5, 3, 3, 3, 6, 7, 6, 8, 8, 9, 5, 5, 5, 3, 6, 3, 3, 3, 7, 9, 8, 9, 10, 7, 3, 5, 10, 6, 4, 4, 4, 6, 7, 6, 2, 2, 2, 4, 4, 4, 8, 8, 9, 5, 5, 5, 4, 3, 7, 9, 8, 9, 10, 7, 4, 5, 10, 3, 6, 6, 6, 3, 7, 3, 2, 2, 2, 4, 4, 4,],
    [8, 8, 9, 3, 6, 5, 5, 5, 3, 3, 3, 4, 4, 4, 7, 9, 8, 9, 10, 7, 3, 5, 10, 6, 4, 4, 4, 6, 7, 6, 2, 2, 2, 8, 8, 9, 2, 2, 2, 3, 3, 3, 4, 6, 4, 4, 4, 7, 9, 8, 9, 10, 7, 4, 3, 10, 6, 5, 5, 5, 6, 7, 6, 8, 8, 9, 3, 6, 5, 5, 5, 3, 3, 3, 4, 4, 4, 7, 9, 8, 9, 10, 7, 3, 5, 10, 6, 4, 4, 4, 6, 7, 6, 2, 2, 2, 8, 8, 9, 2, 2, 2, 5, 5, 5, 4, 3, 4, 4, 4, 7, 9, 8, 9, 10, 7, 4, 5, 10, 3, 6, 6, 6, 3, 7, 3],
    [8, 8, 9, 3, 6, 3, 3, 3, 4, 4, 4, 5, 5, 5, 7, 9, 8, 2, 2, 2, 9, 10, 7, 3, 5, 10, 6, 4, 4, 4, 6, 7, 6, 8, 8, 9, 3, 3, 3, 4, 6, 5, 5, 5, 7, 9, 8, 9, 10, 7, 4, 3, 10, 6, 5, 5, 5, 4, 4, 4, 6, 7, 6, 2, 2, 2, 8, 8, 9, 3, 6, 3, 3, 3, 4, 4, 4, 5, 5, 5, 7, 9, 8, 2, 2, 2, 9, 10, 7, 3, 5, 10, 6, 4, 4, 4, 6, 7, 6, 8, 8, 9, 5, 5, 5, 4, 3, 6, 6, 6, 7, 9, 8, 2, 2, 2, 9, 10, 7, 4, 5, 10, 3, 3, 7, 3, 4, 4, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 75, 25, 15, 10, 7, 6, 5, 3, 2]
];
var payLines = [
    [3, 4, 5],
    [0, 1, 2],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2]
];
var wof_set = [
    [1, 4, 2, 5, 3, 1, 5, 2, 3, 4, 1, 3, 4, 5, 2],
    [7, 10, 8, 7, 12, 7, 10, 8, 12, 7, 10, 8, 20, 7, 8],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.tumbleStickyPos = [];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BONUS") {
        this.wof_set = [...wof_set[0]];
        this.view = viewCache.view;
        this.moneyBonusCacheIndex = 0;
        this.moneyBonusCache = viewCache.cache;
        this.currentGame = "BONUS";
    }
    else {
        this.tumbleCacheList = viewCache.view;
        this.view = this.tumbleCacheList[0];
        //                       2                                
        if (this.tumbleCacheList.length > 1) {
            this.tumbleIndex = 1;
            this.tumbleSticky = GetStickyReels(this.view);
            this.tumbleStickyPos = GetStickyPos(this.tumbleSticky);
            this.tumbleStatus = "TUMBLE";
        }
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    
    this.tmb_res = this.winMoney;

    if (viewCache.type == "BONUS") {
        this.moneyBonusWin = this.winMoney;
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    this.tumbleMask = this.tumbleCacheList[this.tumbleIndex];

    this.view = GetFinalView(this.view, this.tumbleMask, this.tumbleSticky);

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.tumbleIndex++;

    //                 
    if (this.winMoney > 0) {
        this.tmb_res = this.winMoney;
        this.tumbleStickyPos = GetStickyPos(this.tumbleSticky, 0);
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;
    this.moneyBonusLevel = 1;
    this.multiIndex = this.moneyBonusCache[this.moneyBonusCacheIndex];
    this.winMoney = 0;

    if (this.multiIndex < 0) {
        this.moneyBonusLevel = 0;
        this.wof_set = [...wof_set[1]];
    }
    else {
        this.totalMulti = this.wof_set[this.multiIndex];
    }

    this.moneyBonusCacheIndex++;

    if (this.moneyBonusCacheIndex >= this.moneyBonusCache.length) {
        this.winMoney = this.moneyBonusWin;
        this.moneyBonusWin *= this.totalMulti;
        this.winMoney = this.moneyBonusWin - this.winMoney;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

    if (baseWin > 0) {
        var { viewList, tmpWin } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tmpWin;
        pattern.view = viewList;
    } else {
        var { viewList, tmpWin } = RandomZeroView(baseReels, bpl);
        pattern.win = tmpWin;
        pattern.view = viewList;
    }

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin);

    return {
        view: bonusSpinData.view,
        win: bonusSpinData.win,
        cache: bonusSpinData.cache,
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
        var stickyReels = [];

        tmpView = RandomView(reels);
        stickyReels = GetStickyReels(tmpView);
        tmpWin = WinFromView(tmpView, bpl);

        if (tmpWin == 0 && stickyReels.length == 2) {
            var viewList = [tmpView];

            while (tmpWin == 0) {
                var maskView = RandomView(tumbleReels);
                var finalView = GetFinalView(tmpView, maskView, stickyReels);

                if (GetStickyReels(finalView).length == 3 && NumberOfWilds(finalView) > 0)
                    continue;

                tmpWin = WinFromView(finalView, bpl);
                viewList.push(maskView);
            }

            return { viewList, tmpWin };
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin && stickyReels.length < 3) {
            var viewList = [tmpView];

            return { viewList, tmpWin };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }

    }
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0 && GetStickyReels(tmpView).length < 2) {
            break;
        }
    }
    var viewList = [];
    viewList.push(tmpView);
    return { viewList, tmpWin };
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
        var bonusView = [];

        while (true) {
            bonusView = RandomView(reels);
            if (GetStickyReels(bonusView).length == 3 && NumberOfWilds(bonusView) > 0) {
                break;
            }
        }

        var bonusWin = WinFromView(bonusView, bpl);

        var multiIndex = Util.random(0, wof_set[0].length);
        var cache = [];

        cache.push(multiIndex);

        if (wof_set[0][multiIndex] == 1) {
            cache.push(-1); //                               
            multiIndex = Util.random(0, wof_set[1].length);
            cache.push(multiIndex);
            bonusWin *= wof_set[1][multiIndex];
        } else {
            bonusWin *= wof_set[0][multiIndex];
        }

        var bonusSpinData = {
            view: bonusView,
            win: bonusWin,
            cache: cache
        };

        if (bonusWin >= minMoney && bonusWin <= maxMoney) {
            return bonusSpinData;
        }

        if (bonusWin > lowerLimit && bonusWin < minMoney) {
            lowerLimit = bonusWin;
            lowerView = bonusSpinData;
        }
        if (bonusWin > maxMoney && bonusWin < upperLimit) {
            upperLimit = bonusWin;
            upperView = bonusSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
}

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }
    return money;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);

        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
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
}

//                                       
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

var isReelsSame = function (reelSymbols1, reelSymbols2) {
    var symbol1 = getBaseSymbol(reelSymbols1);
    var symbol2 = getBaseSymbol(reelSymbols2);

    return isEqual(symbol1, symbol2);
};

var symbolsFromReel = function (view, reelNo) {
    var result = [];

    for (var j = 0; j < slotHeight; ++j)
        result.push(view[reelNo + j * slotWidth]);

    return result;
}

//                                                               
var GetStickyReels = function (view) {
    var res = [];

    for (var i = 0; i < slotWidth; ++i) {
        var isReelSame = true;
        var base = getBaseSymbol(symbolsFromReel(view, i));
        for (var j = 0; j < slotHeight; ++j) {
            isReelSame &= isEqual(base, view[i + j * slotWidth]);
        }
        if (isReelSame)
            res.push(i);
    }

    if (res.length == 3) {
        if (isReelsSame(symbolsFromReel(view, res[0]), symbolsFromReel(view, res[1]))) {
            if (isReelsSame(symbolsFromReel(view, res[0]), symbolsFromReel(view, res[2])) && isReelsSame(symbolsFromReel(view, res[1]), symbolsFromReel(view, res[2]))) {
                return res;
            }
            res.pop();
        } else if (isReelsSame(symbolsFromReel(view, res[1]), symbolsFromReel(view, res[2]))) {
            res.shift();
        } else if (isReelsSame(symbolsFromReel(view, res[0]), symbolsFromReel(view, res[2]))) {
            res.push(res.shift());
            res.shift();
        }
    }

    if (res.length == 2) {
        if (!isReelsSame(symbolsFromReel(view, res[0]), symbolsFromReel(view, res[1])))
            res.pop();
    }

    return res;
}

//                                          
var GetStickyPos = function (stickyReels, status = 1) {
    var res = [];

    for (var i = 0; i < stickyReels.length; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = j * slotWidth + stickyReels[i];

            res.push(pos + "," + (status ? pos : "-1"));
        }
    }

    return res;
}

//                                                             
var GetFinalView = function (view, maskView, stickyReels) {
    var tmpView = [...view];

    for (var i = 0; i < slotWidth; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            if (stickyReels.indexOf(i) < 0) {
                var pos = j * slotWidth + i;

                tmpView[pos] = maskView[pos];
            }
        }
    }

    return tmpView;
};

var NumberOfWilds = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result++;
        }
    }
    return result;
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