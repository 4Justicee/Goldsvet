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
    this.reel_set = 0;
    this.multi = 1;
    this.greenCnt = 0;
    this.nextMulti = 1;
    this.nextGreenCnt = 0;
    this.multiCacheList = {};           //                                       
    //                     
    this.miniSpinCacheList = [];
    this.miniSlotList = [];
    this.miniViewCache = [];
    this.miniSpinIndex = 0;
    this.miniSpinLength = 0;
    this.moneyBonusWin = 0;
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];   //FREE, BONUS, TUMBLE
};

var wild = 2;
var slotWidth = 5, slotHeight = 3;
var multi = 1, prevWin = 0;
var baseReels = [
    [3, 6, 8, 9, 7, 7, 9, 9, 9, 7, 9, 9, 9, 5, 5, 7, 9, 4, 6, 5, 5, 5, 7, 8, 7, 8, 7, 5, 7, 7, 7, 3, 9, 9, 9, 9, 2, 5, 6, 9, 9, 9, 7, 7, 7, 7],
    [3, 8, 8, 8, 9, 9, 4, 4, 4, 8, 8, 8, 6, 6, 6, 8, 8, 6, 6, 6, 4, 4, 8, 5, 8, 8, 6, 6, 8, 8, 8, 8, 6, 6, 6, 2, 6, 6, 8, 4, 7, 3, 3],
    [3, 9, 9, 9, 7, 9, 7, 9, 7, 7, 7, 4, 4, 4, 9, 9, 9, 5, 9, 9, 8, 8, 8, 6, 6, 6, 5, 5, 5, 9, 7, 2, 9, 3, 3],
    [3, 7, 8, 6, 6, 8, 8, 8, 6, 5, 5, 5, 8, 8, 8, 6, 5, 9, 7, 7, 7, 7, 4, 4, 4, 2, 8, 9, 9, 9, 4, 8, 3, 3, 3, 6, 6, 6],
    [3, 9, 5, 7, 7, 7, 4, 4, 4, 9, 9, 7, 7, 7, 9, 9, 9, 8, 8, 8, 7, 5, 5, 5, 5, 9, 9, 5, 5, 5, 6, 9, 9, 9, 6, 6, 6, 2, 5, 2, 3, 3, 3, 5]
];
var wildReels = [
    [3, 3, 3, 6, 6, 2, 4, 4, 4, 9, 9, 2, 2, 2, 5, 5, 5, 7, 2, 3, 2, 2, 2, 9, 8, 8, 8, 8, 7, 9, 9, 9, 9, 7, 7, 7, 2, 2, 9, 7, 9],
    [3, 3, 3, 8, 8, 2, 9, 6, 4, 4, 4, 8, 8, 8, 9, 9, 9, 6, 6, 6, 2, 2, 4, 5, 5, 5, 8, 8, 7, 7, 7, 6, 2, 2, 2, 3],
    [3, 3, 3, 6, 6, 6, 2, 7, 3, 8, 7, 7, 7, 5, 5, 9, 8, 8, 8, 2, 2, 2, 4, 4, 4, 2, 6, 6, 5, 5, 5, 2, 2, 9, 9, 9, 9, 7],
    [3, 3, 3, 7, 8, 9, 9, 9, 7, 8, 2, 2, 8, 5, 8, 8, 8, 6, 2, 2, 2, 7, 7, 7, 2, 2, 2, 8, 6, 6, 6, 6, 4, 4, 7, 4, 4, 4, 8],
    [3, 3, 3, 9, 5, 7, 7, 4, 4, 4, 6, 2, 2, 2, 8, 7, 9, 9, 8, 8, 8, 5, 3, 9, 2, 6, 5, 2, 2, 2, 9, 9, 9, 7, 7, 7, 2, 9, 9]
];
var miniReels = [
    [10, 12, 12, 12, 12, 12, 12, 11, 11, 10, 12, 12, 12, 12, 12, 10, 10, 11, 13, 13, 13, 10, 10, 10, 12, 12, 11, 11, 11, 11, 13],
    [10, 12, 12, 12, 10, 10, 10, 12, 12, 12, 11, 13, 13, 11, 11, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13],
    [10, 12, 12, 12, 13, 13, 10, 12, 12, 12, 10, 13, 13, 13, 11, 11, 10, 10, 10, 11]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 50, 50, 30, 20, 10, 10, 5, 5],
    [0, 0, 100, 100, 50, 30, 20, 20, 10, 10],
    [0, 0, 500, 500, 100, 50, 30, 30, 20, 20]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],     // 3
    [0, 6, 12, 8, 4],         // 4
    [10, 6, 2, 8, 14],        // 5
    [0, 1, 7, 13, 14],        // 6
    [10, 11, 7, 3, 4],        // 7
    [5, 1, 2, 3, 9],          // 8
    [5, 11, 12, 13, 9],       // 9
    [0, 6, 7, 8, 4],          // 10
    [10, 6, 7, 8, 14],        // 11
    [5, 1, 7, 13, 9],         // 12
    [5, 11, 7, 3, 9],         // 13
    [0, 11, 2, 13, 4],        // 14
    [10, 1, 12, 3, 14],       // 15
    [0, 6, 2, 8, 4],          // 16
    [10, 6, 12, 8, 14],       // 17
    [0, 11, 12, 13, 14],      // 18
    [10, 1, 2, 3, 4],         // 19
    [5, 6, 2, 8, 9],          // 20
];
var percentList = {
    miniWinPercent: 50,
    zeroMultiAddPercent: 68,
    winMultiPercent: 34,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 15; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];


    if (this.currentGame == "BONUS" || this.beforeMiniSpinIndex) {
        this.BonusSpin(player);
        return;
    }

    this.miniSpinIndex = 0;
    this.beforeMiniSpinIndex = 0;

    var viewCache = player.viewCache;

    //                   
    if (viewCache.type == "BONUS") {
        this.miniSpinCacheList = viewCache.view;
        this.miniSlotList = this.miniSpinCacheList[0].list;
        this.viewList = this.miniSpinCacheList[0].viewList;
        this.view = this.viewList[0];
        this.miniSpinIndex = 0;
        this.miniSpinLength = this.miniSpinCacheList.length;
        this.beforeMiniSpinIndex = 1;
    }
    else { //               

        if (player.prevTotalBet != player.virtualBet) {
            var multiCache = this.multiCacheList[player.virtualBet];

            if (multiCache) {
                this.multi = multiCache.multi;
            } else {
                this.multi = 1;
            }
        } else {
            this.multi = this.nextMulti;
        }

        this.view = viewCache.view;
        this.reel_set = viewCache.reel_set;
    }

    this.greenCnt = this.nextGreenCnt;
    this.nextGreenCnt = Util.random(0, 5);

    if (player.gameMode == 1) {
        this.nextMulti = player.viewStack[0].multi;
    } else {
        this.nextMulti = Util.random(2, 5);
    }

    if (this.nextMulti - this.multi > 1) {
        this.nextMulti = this.multi + 1;
    } else if (this.nextMulti < this.multi && this.nextMulti != 1) {
        this.nextMulti = this.multi;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine) * this.multi;
    this.winLines = WinLinesFromView(this.view, this.multi, player.betPerLine);

    this.multiCacheList[player.virtualBet] = {
        multi: this.multi
    };

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (this.beforeMiniSpinIndex) {
        this.multi = this.nextMulti;
        this.nextMulti = 1;
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;

    if (this.miniSpinIndex == 0) {
        this.view = this.viewList[this.beforeMiniSpinIndex++];
        this.multi = this.nextMulti;
        this.nextMulti = this.multi + 1;

        this.greenCnt = this.nextGreenCnt;
        this.nextGreenCnt = Util.random(0, 5);

        if (this.beforeMiniSpinIndex >= this.viewList.length) {
            this.nextMulti = 1;
            this.nextGreenCnt = 5;
            this.winMoney = Number(player.virtualBet) * 2 * this.multi;
            this.moneyBonusWin = this.winMoney;
            this.miniSpinIndex = 1;
            this.beforeMiniSpinIndex = 0;
            this.currentGame = "BONUS";
        }

        return;
    }

    this.miniViewCache = this.miniSpinCacheList[this.miniSpinIndex++];
    this.winMoney = 0;

    for (var i = 0; i < this.miniViewCache.length; ++i) {
        this.winMoney += WinFromMiniView(this.miniViewCache[i].view, player.betPerLine * this.lineCount) * this.multi;
    }

    this.moneyBonusWin += this.winMoney;

    if (this.miniSpinIndex >= this.miniSpinCacheList.length) {
        this.nextGreenCnt = 0;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    var reel_set = 0;

    if (multi > 6 || prevWin > 0) {
        multi = 1;
    }

    if (baseWin > 0) {
        if (!Util.probability(percentList.winMultiPercent)) {
            multi = 1;
        }

        if (baseWin > totalBet * 7) {
            reel_set = 1;
            tmpView = RandomWinView(wildReels, bpl, baseWin / multi);
        } else {
            reel_set = 0;
            tmpView = RandomWinView(baseReels, bpl, baseWin / multi);
        }
        tmpWin = WinFromView(tmpView, bpl) * multi;
    } else {
        if (prevWin == 0 && Util.probability(percentList.zeroMultiAddPercent)) {
            ++multi;
        }

        tmpView = RandomZeroView(baseReels, bpl);
        tmpWin = 0;
    }

    prevWin = tmpWin;

    var pattern = {
        view: tmpView,
        win: tmpWin,
        multi: multi,
        reel_set: reel_set,
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin);
    }

}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    multi = Util.random(1, 5);

    if (!Util.probability(percentList.winMultiPercent)) {
        multi = 1;
    }

    var viewList = [];

    for (var i = 0; i <= multi; ++i) {
        viewList.push(RandomZeroView(baseReels, bpl));
    }
    var miniSpinCacheList = [];


    var msCache = RandomBonusViewCache(miniReels, totalBet, (bsWin - totalBet * 2) / multi, isCall);

    miniSpinCacheList.push({
        viewList: viewList,
        list: msCache.miniSlotList
    });

    prevWin = (msCache.win + totalBet * 2) * multi;

    return {
        view: miniSpinCacheList.concat(msCache.cache),
        win: prevWin,
        multi: multi,
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
        tmpView = RandomView(reels, slotWidth, slotHeight);
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
        tmpView = RandomView(reels, slotWidth, slotHeight);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView;
};

var RandomView = function (reels, width, height) {
    var view = [];

    for (var i = 0; i < width; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < height; j++) {
            var viewPos = i + j * width;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
        }
    }

    return view;
};

var SetMiniSlotToView = function (tmpView, size) {
    var posArr = [];

    while (true) {
        var si = Util.random(0, 6 - size);
        var sj = Util.random(0, 4 - size);
        var posArr = [];

        for (var i = 0; i < size; ++i) {
            for (var j = 0; j < size; ++j) {
                var pos = si + i + (sj + j) * slotWidth;

                if (tmpView[pos] == 0) {
                    posArr.push(pos);
                }
            }
        }

        if (posArr.length == size * size) {
            break;
        }
    }

    for (var i = 0; i < posArr.length; ++i) {
        tmpView[posArr[i]] = 1;
    }

    return posArr;
};

var RandomBonusViewCache = function (reels, totalBet, bsWin, isCall) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var miniSpinData = {};
        var miniSlotCacheList = [];
        var miniSlotList = [];
        var miniSlotCount = Util.random(4, 15);
        var miniSlotEnded = GetSameValueArray(miniSlotCount, 0);
        var endedSlotCount = 0;
        var miniSlotTotalWin = 0;

        var tmpView = GetSameValueArray(slotWidth * slotHeight, 0);

        if (isCall && Util.probability(34) && miniSlotCount <= 5) {
            var miniSlot = SetMiniSlotToView(tmpView, 3);

            miniSlotList.push(miniSlot);
        }

        var miniSlotCount2 = 0;

        if (miniSlotCount <= 5 && miniSlotList.length == 0) {
            miniSlotCount2 = Util.random(0, 3);
        }

        for (var i = 0; i < miniSlotCount2; ++i) {
            var miniSlot = SetMiniSlotToView(tmpView, 2);

            miniSlotList.push(miniSlot);
        }

        while (miniSlotList.length < miniSlotCount) {
            var miniSlot = SetMiniSlotToView(tmpView, 1);

            miniSlotList.push(miniSlot);
        }

        while (endedSlotCount < miniSlotCount) {
            var miniViewCache = [];

            for (var i = 0; i < miniSlotCount; ++i) {
                if (miniSlotEnded[i] == 0) {
                    var tmpMiniView = [];
                    var tmpMiniWin = 0;

                    while (true) {
                        tmpMiniView = RandomView(reels, 3, 1);
                        tmpMiniWin = WinFromMiniView(tmpMiniView, totalBet);

                        if (tmpMiniWin && Util.probability(percentList.miniWinPercent) || tmpMiniWin == 0) {
                            break;
                        }
                    }

                    if (tmpMiniWin == 0) {
                        miniSlotEnded[i] = 1;
                        ++endedSlotCount;
                    }

                    miniViewCache.push({
                        id: i,
                        view: tmpMiniView
                    })

                    miniSlotTotalWin += tmpMiniWin;
                }
            }

            miniSlotCacheList.push(miniViewCache);
        }

        miniSpinData = {
            miniSlotList: miniSlotList,
            cache: miniSlotCacheList,
            win: miniSlotTotalWin
        };

        if (miniSpinData.win >= minMoney && miniSpinData.win <= maxMoney) {
            return miniSpinData;
        }

        if (miniSpinData.win > lowerLimit && miniSpinData.win < minMoney) {
            lowerLimit = miniSpinData.win;
            lowerView = miniSpinData;
        }
        if (miniSpinData.win > maxMoney && miniSpinData.win < upperLimit) {
            upperLimit = miniSpinData.win;
            upperView = miniSpinData;
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

var WinLinesFromView = function (view, multi, bpl) {
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

var GetSameValueArray = function (len, value) {
    var res = [];

    for (var i = 0; i < len; ++i) {
        res.push(value);
    }

    return res;
};

var WinFromMiniView = function (view, totalBet) {
    var multi = 0;

    if (view[0] == view[1] && view[1] == view[2]) {
        switch (view[0]) {
            case 10:
                multi = 20;
                break;
            case 11:
                multi = 15;
                break;
            case 12:
                multi = 10;
                break;
        }
    } else if (view[0] != 13 && view[1] != 13 && view[2] != 13) {
        multi = 2;
    }

    return totalBet * multi;
}

module.exports = SlotMachine;