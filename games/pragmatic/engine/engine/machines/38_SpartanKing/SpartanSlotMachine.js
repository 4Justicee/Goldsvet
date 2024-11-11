var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.basewin = 0;
    this.winMoney = 0;
    this.winLines = [];
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    this.wildSheilds = [];
    this.totalMulti = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //       
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    // this.lineCount = 40;
    this.lineCount = 20;
    this.jackpotType = ["FREE"];
    this.highPercent = 2;
    this.normalPercent = 20;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 4;
var baseReels = [
    [11, 6, 8, 9, 9, 9, 9, 3, 10, 6, 6, 6, 4, 7, 7, 7, 7, 1, 8, 8, 8, 5, 11, 11, 11, 4, 5],
    [7, 10, 10, 10, 2, 3, 4, 9, 9, 9, 1, 5, 5, 5, 5, 6, 6, 6, 11, 6, 10, 8, 9, 5, 9, 5, 9, 6, 5, 9, 11, 9, 6, 10, 5, 11, 10, 6, 5, 4, 5, 9, 6, 9, 5, 8, 6, 9, 10, 4, 9, 5, 6, 9],
    [3, 10, 8, 8, 8, 2, 10, 10, 10, 5, 6, 4, 6, 6, 6, 8, 11, 7, 11, 11, 11, 9, 1, 11, 10, 6, 10, 2, 1, 8, 9, 11, 9, 8, 11, 10, 11, 9, 11, 10, 2, 8, 1, 11, 6, 11, 4, 7, 10, 2, 10, 11, 10, 8, 1, 11, 9, 6, 7, 8, 10, 9, 10, 7, 1],
    [3, 9, 7, 4, 6, 4, 4, 4, 10, 5, 11, 1, 8, 2, 4, 10, 9, 4, 6, 2, 1, 9, 11, 4, 10, 11, 4, 7, 4, 5, 4],
    [11, 11, 11, 11, 3, 6, 6, 6, 8, 4, 6, 9, 9, 9, 5, 10, 10, 10, 10, 9, 7, 2, 1, 10, 10, 6, 5, 6, 5, 6, 9, 5, 9, 6, 5, 9, 2, 9, 6, 10, 6, 5, 6, 3, 6, 10, 3, 5, 6, 8, 10, 6, 3, 9, 5, 10, 6, 3, 9, 6, 10, 8, 9, 3, 2, 5, 6, 10, 8, 6, 2, 6, 9, 6, 9, 6, 10, 9, 1, 9, 5, 9, 5]
];
var freeReels = [
    [11, 11, 11, 4, 9, 1, 5, 8, 3, 7, 10, 11, 6, 8, 3, 9, 8, 10, 1, 3, 4, 8, 8, 7, 4, 3, 10, 3, 1, 5, 3, 3, 10, 9, 3, 1, 3, 3, 7, 9, 3, 8, 3, 4, 1, 7, 9, 10, 3, 10, 5, 8, 10, 7, 10, 7, 9, 3, 8, 1, 10, 3, 10, 8],
    [9, 8, 5, 5, 5, 10, 11, 3, 10, 10, 10, 5, 6, 6, 6, 1, 4, 7, 6, 10, 6, 5, 11, 6],
    [11, 11, 11, 4, 10, 11, 7, 5, 8, 3, 9, 6, 1, 8, 6, 5, 10, 6, 3, 1, 8, 3, 5, 8, 5, 3, 7, 8, 5],
    [8, 9, 4, 4, 4, 5, 1, 7, 11, 6, 3, 4, 10, 3, 6, 7, 4, 1, 5, 11, 4, 3, 7, 3, 1, 3, 10, 3, 4, 11, 7],
    [5, 1, 11, 11, 11, 6, 10, 6, 6, 6, 9, 7, 11, 8, 3, 4, 10, 6, 11, 6, 11, 9, 11, 6, 11, 3, 6, 8, 11, 6, 11, 6, 8, 6, 11, 6, 11, 4, 6, 4, 7, 11, 6, 11, 4, 11, 6, 3, 11, 6, 11, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 20, 10, 10, 5, 3, 3, 2, 2],
    [0, 0, 0, 75, 60, 50, 40, 20, 10, 10, 10, 10],
    [0, 0, 0, 150, 125, 100, 80, 50, 40, 40, 40, 40]
];
var payLines = [
    [0, 1, 2, 3, 4],        // 1
    [15, 16, 17, 18, 19],   // 2
    [5, 6, 7, 8, 9],        // 3
    [10, 11, 12, 13, 14],   // 4
    [0, 6, 12, 8, 4],        // 5
    [15, 11, 7, 13, 19],        // 6
    [10, 6, 2, 8, 14],        // 7
    [5, 11, 7, 13, 9],        // 8
    [0, 6, 2, 8, 4],        // 9
    [15, 11, 17, 13, 19],        // 10
    [5, 1, 7, 3, 9],        // 11
    [10, 16, 12, 18, 14],        // 12
    [5, 11, 17, 13, 9],        // 13
    [10, 6, 12, 8, 14],        // 14
    [0, 6, 7, 8, 4],        // 15
    [15, 11, 12, 13, 19],        // 16
    [5, 1, 2, 3, 9],        // 17
    [10, 16, 17, 18, 14],        // 18
    [5, 11, 12, 13, 9],        // 19
    [10, 6, 7, 8, 14],        // 20
    [0, 1, 7, 3, 4],        // 21
    [15, 16, 12, 18, 19],        // 22
    [5, 6, 2, 8, 9],        // 23
    [10, 11, 17, 13, 14],        // 24
    [5, 6, 12, 8, 9],        // 25
    [10, 11, 7, 13, 14],        // 26
    [0, 1, 12, 3, 4],        // 27 
    [15, 16, 2, 18, 19],        // 28
    [10, 11, 2, 13, 14],        // 29
    [5, 6, 17, 8, 9],        // 30
    [0, 11, 12, 13, 4],        // 31
    [15, 6, 7, 8, 19],        // 32
    [10, 1, 2, 3, 14],        // 33
    [5, 16, 17, 18, 9],        // 34
    [5, 1, 12, 3, 9],        // 35
    [10, 16, 7, 18, 14],        // 36
    [5, 11, 2, 13, 9],        // 37
    [10, 6, 17, 8, 14],        // 38
    [0, 11, 2, 13, 4],        // 39
    [15, 6, 17, 8, 19],        // 40
];
var percentList = {
    baseSpinShieldHit: 3,
    freeSpinShieldHit: 30,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.maskView = [];
    this.wildSheilds = [];

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
        this.view = cache.scatterView;
    }

    this.basewin = WinFromView(this.view, player.betPerLine);
    this.winMoney = this.basewin;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.wildSheilds = GetShieldPositions(this.view);

    this.maskView = GetMaskView(this.view, this.wildSheilds);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 0;
        this.freeSpinLength = FreeSpinCountsFromView(this.view);

        this.scatterPositions = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinBeforeMoney = this.winMoney;

        this.currentGame = "FREE";
    }

};

SlotMachine.prototype.FreeSpin = function (player) {
    var _view = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = _view.s;
    this.totalMulti = _view.m;

    this.basewin = WinFromView(this.view, player.betPerLine);
    this.winMoney = this.basewin * this.totalMulti;

    this.wildSheilds = GetShieldPositions(this.view);
    this.maskView = GetMaskView(this.view, this.wildSheilds);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;

    if (this.freeSpinIndex >= this.freeSpinLength) {
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    if (baseWin > 0) {
        var { view, winMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = winMoney;
        pattern.view = view;
    } else {
        var { view, winMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = winMoney;
        pattern.view = view;
    }

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
        default: break;
    }

}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWin = WinFromView(scatterView, bpl) + ScatterWinFromView(scatterView, bpl * this.lineCount);
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, FreeSpinCountsFromView(scatterView));

    freeSpinData.scatterView = scatterView;

    return {
        win: freeSpinData.win + scatterWin,
        view: freeSpinData,
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    var shieldFlag = false;
    var shieldCount = Util.random(1, 3);

    if (Util.probability(percentList.baseSpinShieldHit)) {
        shieldFlag = true;
    }

    while (true) {

        var view;

        if (shieldFlag)
            view = RandomSheildView(reels, shieldCount);
        else
            view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        var winMoney = WinFromView(view, bpl);

        if (winMoney == 0) {
            continue;
        }

        if (winMoney > bottomLimit && winMoney <= maxWin) {
            return { view, winMoney };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    var shieldFlag = false;
    var shieldCount = Util.random(1, 3);

    if (Util.probability(percentList.baseSpinShieldHit)) {
        shieldFlag = true;
    }

    while (true) {

        var view;

        if (shieldFlag)
            view = RandomSheildView(reels, shieldCount);
        else
            view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        var winMoney = WinFromView(view, bpl);

        if (winMoney == 0) {

            return { view, winMoney };
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

var RandomScatterView = function (reels) {
    var view = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[pos] = reels[i][reelPos];
            if (isScatter(view[pos])) {
                view[pos] = Util.random(3, 12);
            }
        }
    }

    var reelNoArr = [0, 1, 2, 3, 4];

    Util.shuffle(reelNoArr);

    for (var i = 0; i < 3; i++) {
        var height = Util.random(0, slotHeight);
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

    var lowerLimit = -1, upperLimit = 100000000000000;
    var lowerView = null, upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var viewList = [];
        var freeSpinIndex = 0;
        var freeSpinLength = fsLen;
        var freeSpinWinMoney = 0;

        while (true) {

            var shieldFlag = false;
            var shieldCount = Util.random(1, 3);

            if (Util.probability(percentList.freeSpinShieldHit)) {
                shieldFlag = true;
            }

            var view;

            while (true) {

                if (shieldFlag)
                    view = RandomSheildView(reels, shieldCount);
                else
                    view = RandomView(reels);

                if (!isFreeSpinWin(view)) {
                    break;
                }

            }

            var basewin = WinFromView(view, bpl);

            var multi = MultiFromSheildView(view);

            var winMoney = basewin * multi;

            viewList.push({
                s: view,
                m: multi,
            });

            freeSpinWinMoney += winMoney;

            freeSpinIndex++;

            if (freeSpinIndex >= freeSpinLength) {
                break;
            }
        }

        var pattern = {
            win: freeSpinWinMoney,
            viewList
        };

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return pattern;
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = pattern;
        }
        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = pattern;
        }
    }

    return lowerView ? lowerView : upperView;
}

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;

    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) {

        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

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
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
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

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 5: return totalBet * 20;
        case 4: return totalBet * 5;
        case 3: return totalBet;
    }
    return 0;
};

var FreeSpinCountsFromView = function (view) {
    switch (NumberOfScatters(view)) {
        case 5: return 12;
        case 4: return 10;
        case 3: return 8;
    }
    return 0;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isWild = function (symbol) {
    return symbol == wild;
};

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
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var RandomSheildView = function (reels, targetShieldCount = 1) {
    var view = RandomView(reels);

    var tmpView = [...view];
    var shieldCount = 0;
    var shieldPositions = [];

    while (true) {

        var pos_x = Util.random(0, slotWidth - 1);
        var pos_y = Util.random(0, slotHeight - 1);

        if (shieldPositions.indexOf(pos_y * slotWidth + pos_x) != -1 ||
            shieldPositions.indexOf(pos_y * slotWidth + pos_x + 1) != -1 ||
            shieldPositions.indexOf((pos_y + 1) * slotWidth + pos_x) != -1 ||
            shieldPositions.indexOf((pos_y + 1) * slotWidth + pos_x + 1) != -1
        ) {
            shieldPositions = [];
            tmpView = [...view];
            shieldCount = 0;
        } else {

            tmpView[pos_y * slotWidth + pos_x] = wild;
            tmpView[pos_y * slotWidth + pos_x + 1] = wild;
            tmpView[(pos_y + 1) * slotWidth + pos_x] = wild;
            tmpView[(pos_y + 1) * slotWidth + pos_x + 1] = wild;

            shieldPositions.push(pos_y * slotWidth + pos_x);
            shieldPositions.push(pos_y * slotWidth + pos_x + 1);
            shieldPositions.push((pos_y + 1) * slotWidth + pos_x);
            shieldPositions.push((pos_y + 1) * slotWidth + pos_x + 1);

            shieldCount++;

            if (shieldCount >= targetShieldCount) {

                return tmpView;
            }
        }
    }

};

var MultiFromSheildView = function (view) {
    var multiAry = [2, 3, 5, 10, 25];

    for (var i = 0; i < slotHeight; i++) {
        for (var j = 0; j < slotWidth; j++) {
            if (!isWild(view[i * slotWidth + j]) ||
                !isWild(view[i * slotWidth + j + 1]) ||
                !isWild(view[(i + 1) * slotWidth + j]) ||
                !isWild(view[(i + 1) * slotWidth + j + 1])
            )
                continue;
            return multiAry[Util.random(0, multiAry.length)];
        }

    }

    return 1;
};

var RandomSymbol = function () {
    return Util.random(3, 12);
};

var GetShieldPositions = function (view) {
    var shieldPositions = [];

    for (var i = 0; i < slotHeight - 1; i++) {
        for (var j = 0; j < slotWidth - 1; j++) {

            if (shieldPositions.indexOf(i * slotWidth + j) != -1) {

                continue;
            }

            if (isWild(view[i * slotWidth + j]) &&
                isWild(view[i * slotWidth + j + 1]) &&
                isWild(view[(i + 1) * slotWidth + j]) &&
                isWild(view[(i + 1) * slotWidth + j + 1])
            ) {
                shieldPositions.push(i * slotWidth + j);
                shieldPositions.push(i * slotWidth + j + 1);
                shieldPositions.push((i + 1) * slotWidth + j);
                shieldPositions.push((i + 1) * slotWidth + j + 1);
            }
        }
    }

    return shieldPositions;
};

var GetMaskView = function (view, shieldPositions) {
    var maskView = [...view];

    for (var i = 0; i < shieldPositions.length; i++) {
        maskView[shieldPositions[i]] = RandomSymbol();
    }

    return maskView;
}

module.exports = SlotMachine;