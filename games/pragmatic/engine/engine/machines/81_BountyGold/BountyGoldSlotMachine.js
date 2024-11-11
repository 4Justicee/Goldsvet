var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    this.moneySignals = [];
    this.moneyValues = [];
    this.newTarget = false;
    this.prevBonusLevel = 0;
    this.bonusSpinCounter = 0;
    this.targetMoneySymbolCount = 0;
    this.bonusLevel = 0;
    this.newMoneySymbolCount = 0;
    this.bonusSpinIndex = 0;
    this.stickySymbols = [];
    this.stickyPositions = [];
    this.viewBeforeBonus = [];
    this.bonusSpinCacheList = [];
    this.currentCollect = 0;
    this.moneyBonusWin = 0;
    this.bonusTotalCount = 0;
    this.jackpotMultiAry = [];
    this.jackpotMoneyAry = [];

    // Required
    this.view = [];
    this.winMoney = 0;
    this.winLines = [];
    this.virtualReels = {};
    this.gameSort = "BASE";
    this.currentGame = "BASE";
    this.prevGameMode = "BASE";
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 25;
    this.jackpotType = ["BONUS"];
};

var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [7, 8, 6, 8, 5, 6, 4, 8, 10, 9, 7, 10, 11, 10, 3, 6, 8, 9, 11, 9, 4, 9, 4, 7, 3, 10, 6, 7, 5, 6, 11, 6, 7, 10, 9, 11, 10, 4, 5, 7, 5, 4, 7, 4, 10, 9, 10, 6, 8, 5, 10, 9, 10, 5, 8, 6],
    [10, 4, 8, 4, 6, 10, 3, 5, 4, 10, 11, 7, 9, 7, 6, 2, 2, 2, 2, 2, 6, 8, 4, 9, 2, 8, 5, 2, 11, 3, 9, 3, 4, 5, 10, 9, 5, 10, 11, 11, 11, 2, 2, 9, 3, 7, 9, 7, 8, 3, 4, 7, 2, 8, 11, 6, 9, 8, 2, 11],
    [8, 7, 3, 8, 9, 6, 5, 8, 2, 5, 4, 3, 10, 8, 2, 2, 2, 6, 8, 7, 3, 9, 2, 6, 9, 4, 7, 10, 2, 4, 4, 11, 11, 11, 6, 7, 11, 11, 6, 9, 5, 8, 2, 10, 3, 2, 9, 8, 5],
    [11, 2, 5, 9, 10, 8, 5, 8, 6, 2, 8, 7, 5, 7, 11, 6, 10, 8, 2, 2, 2, 2, 2, 7, 9, 11, 7, 8, 7, 2, 7, 8, 7, 11, 6, 7, 10, 3, 4, 8, 9, 11, 11, 11, 6, 5, 4, 5, 10, 9, 7, 3, 7, 9, 4, 6, 3, 9, 11, 4, 3, 9, 4, 3],
    [5, 11, 10, 2, 6, 7, 3, 9, 7, 5, 8, 9, 2, 3, 2, 2, 2, 2, 11, 4, 9, 10, 8, 4, 10, 6, 9, 3, 5, 3, 6, 10, 7, 10, 11, 11, 11, 7, 6, 2, 3, 4, 8, 6, 5, 2, 7, 4, 10, 5, 8, 4, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 50, 30, 25, 25, 10, 10, 10, 10, 0, 0, 0, 0],
    [0, 0, 0, 200, 150, 125, 75, 50, 50, 50, 50, 0, 0, 0, 0]
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
    [5, 11, 12, 3, 9], // 23
    [0, 11, 2, 13, 4], // 24
    [10, 1, 12, 3, 14], // 25
];
var moneyValueList = [25, 50, 75, 100, 125, 150, 175, 200, 250, 375, 500];
var wild = 2, moneySymbol = 11, bonusEmpty = 13, baseEmpty = 14;
var percentList = {
    highMoneyHit: 15
}

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevGameMode = this.currentGame;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    var baseView = null;

    if (viewCache.type == "BASE") {

        baseView = viewCache.view;
    } else if (viewCache.type == "BONUS") {

        baseView = viewCache.view.bonusView;
        this.bonusSpinCacheList = viewCache.view.viewList;
    }

    this.view = ExpendBaseView(baseView);
    this.moneySignals = GetMoneySignals(this.view);
    this.moneyValues = GetMoneyValues(this.view);
    this.view = GetFinalView(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(baseView, player.betPerLine);
    this.winLines = WinLinesFromView(baseView, player.betPerLine);

    if (isBonusWin(baseView)) {

        this.bonusTotalCount = 0;

        this.viewBeforeBonus = baseView;
        this.moneyBonusWin = this.winMoney;
        this.currentCollect = this.moneyBonusWin;

        this.bonusSpinIndex = 0;
        this.bonusSpinCounter = 1;

        var moneySymbolCount = NumberOfMoneySymbols(baseView);

        this.newMoneySymbolCount = moneySymbolCount - this.bonusTotalCount;
        this.bonusTotalCount = moneySymbolCount;

        this.prevBonusLevel = 0;
        this.bonusLevel = GetBonusLevel(this.bonusTotalCount);
        this.targetMoneySymbolCount = GetMoneySymbolCountPerLevel(this.bonusLevel + 1) - this.bonusTotalCount;

        if (this.prevBonusLevel != this.bonusLevel) {

            this.newTarget = true;
        } else {

            this.newTarget = false;
        }

        this.stickyPositions = GetMoneySymbolPositions(baseView);
        this.stickySymbols = GetStikySymbols(baseView);

        this.currentGame = "BONUS";
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    var nextView = this.bonusSpinCacheList[this.bonusSpinIndex];
    var nextMoneySymbolCount = NumberOfMoneySymbols(nextView);
    var prevMoneySymbolCount = this.bonusTotalCount;


    this.newMoneySymbolCount = nextMoneySymbolCount - this.bonusTotalCount;
    this.bonusTotalCount = nextMoneySymbolCount;
    this.targetMoneySymbolCount = GetMoneySymbolCountPerLevel(this.bonusLevel + 1) - this.bonusTotalCount;

    this.prevBonusLevel = this.bonusLevel;
    this.bonusLevel = GetBonusLevel(this.bonusTotalCount);

    if (this.prevBonusLevel != this.bonusLevel) {

        this.newTarget = true;
    } else {

        this.newTarget = false;
    }

    this.stickyPositions = GetMoneySymbolPositions(nextView);
    this.stickySymbols = GetStikySymbols(nextView);
    this.moneySignals = GetMoneySignals(nextView);
    this.moneyValues = GetMoneyValues(nextView);
    this.view = GetFinalView(nextView);

    var matrix1 = nextView.slice(0, 15);
    var matrix2 = nextView.slice(15, 30);
    var matrix3 = nextView.slice(30, 45);
    var matrix4 = nextView.slice(45, 60);

    this.currentCollect = WinFromView(this.viewBeforeBonus, player.betPerLine);

    if (this.bonusTotalCount >= 44) {

        this.currentCollect +=
            CollectMoney(matrix1, player.betPerLine) * 5 +
            CollectMoney(matrix2, player.betPerLine) * 5 +
            CollectMoney(matrix3, player.betPerLine) * 5 +
            CollectMoney(matrix4, player.betPerLine) * 5;
    } else {

        this.currentCollect +=
            CollectMoney(matrix1, player.betPerLine) * 1 +
            CollectMoney(matrix2, player.betPerLine) * 2 +
            CollectMoney(matrix3, player.betPerLine) * 3 +
            CollectMoney(matrix4, player.betPerLine) * 4;
    }

    var jackpotMoneyInfo = JackpotMoneyFromMatrixGroup(matrix1.concat(matrix2, matrix3, matrix4), player.betPerLine * this.lineCount);
    this.currentCollect += jackpotMoneyInfo.jackpotMoney;
    this.jackpotMultiAry = jackpotMoneyInfo.jackpotMultiAry;
    this.jackpotMoneyAry = jackpotMoneyInfo.jackpotMoneyAry;

    this.bonusSpinIndex++;
    this.bonusSpinCounter++;

    if (nextMoneySymbolCount != prevMoneySymbolCount) {

        this.bonusSpinCounter = 1;
    }

    // console.log(this.currentCollect);

    if (this.bonusSpinCounter >= 4) {

        this.winMoney = this.currentCollect;
        this.moneyBonusWin = this.currentCollect;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    var viewInfo = null;

    if (baseWin > 0) {
        viewInfo = RandomWinView(baseReels, bpl, baseWin);

    } else {
        viewInfo = RandomZeroView(baseReels, bpl);
    }

    pattern.win = viewInfo.winMoney;
    pattern.view = viewInfo.view;

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
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
    }

}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusSpinCache = {}, bonusWinMoney = 0;

    bonusSpinCache.bonusView = RandomBonusView(baseReels, bpl);
    bonusWinMoney = WinFromView(bonusSpinCache.bonusView, bpl);
    
    var bonusCache = RandomBonusViewCache(baseReels, bpl, bsWin, bonusSpinCache.bonusView);
    
    bonusSpinCache.viewList = bonusCache.view;

    var pattern = {
        win: bonusWinMoney + bonusCache.win, 
        view: bonusSpinCache,
        bpl: bpl,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    var view = null;
    var winMoney = null;

    while (true) {

        view = RandomView(reels);

        if (isBonusWin(view)) {

            continue;
        }

        winMoney = WinFromView(view, bpl);

        if (winMoney > bottomLimit && winMoney <= maxWin) {

            return {
                view: view,
                winMoney: winMoney
            };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    var view = null;
    var winMoney = null;

    while (true) {

        view = RandomView(reels);

        if (isBonusWin(view)) {

            continue;
        }

        winMoney = WinFromView(view, bpl);

        if (winMoney == 0) {

            return {
                view: view,
                winMoney: 0
            };
        }
    }
};

var RandomView = function (reels, width = slotWidth, heigth = slotHeight) {
    var view = [];

    for (var i = 0; i < width; i++) {

        var len = reels[i].length;
        var randomIndex = Util.random(0, len);

        for (var j = 0; j < heigth; j++) {

            var viewPos = i + j * width;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
        }
    }

    for (var i = 0; i < view.length; i++) {

        if (view[i] == moneySymbol) {

            if (Util.probability(percentList.highMoneyHit)) {
                view[i] = view[i] * 10000 + moneyValueList[Util.random(0, moneyValueList.length)];
            } else {
                view[i] = view[i] * 10000 + moneyValueList[Util.random(0, Math.floor(moneyValueList.length / 3))];
            }
        }
    }

    return view;
};

var RandomBonusView = function (reels, bpl) {
    var view = null;

    while (true) {
        view = RandomView(reels);
        if (isBonusWin(view) && WinFromView(view, bpl)) {
            break;
        }
    }

    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin, bsView) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1, upperLimit = 100000000000000;
    var lowerView = null, upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var viewList = [];
        var bonusSpinWinMoney = 0;
        var bonusSpinLeft = 3;

        var bonusTotalCount = NumberOfMoneySymbols(bsView);
        var bonusMatrix1 = GetOriginViewFromBonusView(bsView);
        var bonusMatrix2 = GetEmptyBonusView(bsView);
        var bonusMatrix3 = GetEmptyBonusView(bsView);
        var bonusMatrix4 = GetEmptyBonusView(bsView);

        while (bonusSpinLeft > 0) {

            bonusSpinLeft--;

            var nextBonusMatrix1 = [...bonusMatrix1];
            var nextBonusMatrix2 = [...bonusMatrix2];
            var nextBonusMatrix3 = [...bonusMatrix3];
            var nextBonusMatrix4 = [...bonusMatrix4];

            if (bonusTotalCount >= 6) {

                var bonusView1 = RandomView(reels);
                nextBonusMatrix1 = OverLay2View(bonusMatrix1, bonusView1);
            }

            if (bonusTotalCount >= 9) {

                var bonusView2 = RandomView(reels);
                nextBonusMatrix2 = OverLay2View(bonusMatrix2, bonusView2);
            }

            if (bonusTotalCount >= 18) {

                var bonusView3 = RandomView(reels);
                nextBonusMatrix3 = OverLay2View(bonusMatrix3, bonusView3);
            }

            if (bonusTotalCount >= 26) {

                var bonusView4 = RandomView(reels);
                nextBonusMatrix4 = OverLay2View(bonusMatrix4, bonusView4);
            }

            var prevMatrixGroup = bonusMatrix1.concat(bonusMatrix2, bonusMatrix3, bonusMatrix4);
            var matrixGroup = nextBonusMatrix1.concat(nextBonusMatrix2, nextBonusMatrix3, nextBonusMatrix4);

            viewList.push(matrixGroup);

            bonusTotalCount = NumberOfMoneySymbols(matrixGroup);
            bonusMatrix1 = nextBonusMatrix1;
            bonusMatrix2 = nextBonusMatrix2;
            bonusMatrix3 = nextBonusMatrix3;
            bonusMatrix4 = nextBonusMatrix4;

            if (NumberOfMoneySymbols(prevMatrixGroup) != NumberOfMoneySymbols(matrixGroup)) {

                bonusSpinLeft = 3;
            }
        }

        if (bonusTotalCount >= 44) {

            bonusSpinWinMoney +=
                CollectMoney(bonusMatrix1, bpl) * 5 +
                CollectMoney(bonusMatrix2, bpl) * 5 +
                CollectMoney(bonusMatrix3, bpl) * 5 +
                CollectMoney(bonusMatrix4, bpl) * 5;
        } else {

            bonusSpinWinMoney +=
                CollectMoney(bonusMatrix1, bpl) * 1 +
                CollectMoney(bonusMatrix2, bpl) * 2 +
                CollectMoney(bonusMatrix3, bpl) * 3 +
                CollectMoney(bonusMatrix4, bpl) * 4;
        }

        var jackpotMoneyInfo = JackpotMoneyFromMatrixGroup(bonusMatrix1.concat(bonusMatrix2, bonusMatrix3, bonusMatrix4), bpl * this.lineCount);
        bonusSpinWinMoney += jackpotMoneyInfo.jackpotMoney;

        var pattern = {
            win: bonusSpinWinMoney,
            view: viewList
        };

        if (bonusSpinWinMoney >= minMoney && bonusSpinWinMoney <= maxMoney) {

            return pattern;
        }

        if (bonusSpinWinMoney > lowerLimit && bonusSpinWinMoney < minMoney) {

            lowerLimit = bonusSpinWinMoney;
            lowerView = pattern;
        }

        if (bonusSpinWinMoney > maxMoney && bonusSpinWinMoney < upperLimit) {

            upperLimit = bonusSpinWinMoney;
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

var isMoneySymbol = function (symbol) {

    return Math.floor(symbol / 10000) == 11;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isBonusWin = function (view) {

    return NumberOfMoneySymbols(view) >= 6;
};

var NumberOfMoneySymbols = function (view) {
    var moneySymbolCount = 0;

    for (var i = 0; i < view.length; i++) {

        if (isMoneySymbol(view[i])) {

            moneySymbolCount++;
        }
    }

    return moneySymbolCount;
};

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {

        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    return money;
};

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

    return payTable[matchCount][symbol] * bpl;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {

        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);

        var lineMoney = WinFromLine(lineSymbols, bpl);

        if (lineMoney > 0) {

            winLines.push(
                `${lineId}~${lineMoney}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }

    return winLines;
};

var GetOriginViewFromBonusView = function (view) {
    var originBonusView = [...view];

    for (var i = 0; i < view.length; i++) {

        if (!isMoneySymbol(view[i])) {

            originBonusView[i] = bonusEmpty;
        }
    }

    return originBonusView;
};

var GetEmptyBonusView = function () {
    var emptyBonusView = [];

    for (var i = 0; i < slotWidth * slotHeight; i++) {

        emptyBonusView.push(baseEmpty);
    }

    return emptyBonusView;
};

var OverLay2View = function (view1, view2) {
    var overlayView = [...view1];

    for (var i = 0; i < overlayView.length; i++) {

        if (overlayView[i] == baseEmpty) {

            overlayView[i] = bonusEmpty;
        }

        if (isMoneySymbol(view2[i]) && overlayView[i] == bonusEmpty) {

            overlayView[i] = view2[i];
        }
    }

    return overlayView;
};

var CollectMoney = function (view, bpl) {
    var bounusWinMoney = 0;

    for (var i = 0; i < view.length; i++) {

        if (isMoneySymbol(view[i])) {

            bounusWinMoney += bpl * (view[i] % 10000);
        }
    }

    return bounusWinMoney;
};

var JackpotMoneyFromMatrixGroup = function (matrixGroup, totalBet) {
    var jackpotMoney = 0;
    var jackpotMultiAry = [];
    var jackpotMoneyAry = [];

    for (var i = 0; i < 4; i++) {

        var matrix = matrixGroup.slice(i * 15, i * 15 + 15);

        if (NumberOfMoneySymbols(matrix) == matrix.length) {

            jackpotMoney += GetJackpotMulti(i + 1) * totalBet;
            jackpotMultiAry.push(GetJackpotMulti(i + 1));
            jackpotMoneyAry.push(GetJackpotMulti(i + 1) * totalBet);
        }
    }

    return {
        jackpotMoney,
        jackpotMultiAry,
        jackpotMoneyAry
    };
};

var GetJackpotMulti = function (param) {

    switch (param) {

        case 1:

            return 25;

        case 2:

            return 50;

        case 3:

            return 500;

        case 4:

            return 5000;
    }
};

var ExpendBaseView = function (view) {
    var expendedView = [...view];

    for (var i = 0; i < slotWidth * slotHeight * 4; i++) {

        expendedView.push(baseEmpty);
    }

    return expendedView;
};

var GetMoneySignals = function (view) {
    var moneySignals = [];

    for (var i = 0; i < view.length; i++) {

        if (isMoneySymbol(view[i])) {

            moneySignals.push('v');
        } else {

            moneySignals.push('r');
        }
    }

    return moneySignals;
};

var GetMoneyValues = function (view) {
    var moneyValues = [];

    for (var i = 0; i < view.length; i++) {

        if (isMoneySymbol(view[i])) {

            moneyValues.push(view[i] % 10000);
        } else {

            moneyValues.push(0);
        }
    }

    return moneyValues;
};

var GetFinalView = function (view) {
    var finalView = [...view];

    for (var i = 0; i < finalView.length; i++) {

        if (isMoneySymbol(finalView[i])) {

            finalView[i] = moneySymbol;
        }
    }

    return finalView;
};

var GetBonusLevel = function (moneySymbolCount) {

    if (moneySymbolCount >= 44) {

        return 5;
    }

    if (moneySymbolCount >= 26) {

        return 4;
    }

    if (moneySymbolCount >= 18) {

        return 3;
    }

    if (moneySymbolCount >= 9) {

        return 2;
    }

    if (moneySymbolCount >= 6) {

        return 1;
    }

    return 5;
};

var GetMoneySymbolCountPerLevel = function (moneySymbolCount) {

    switch (moneySymbolCount) {

        case 5:

            return 44;

        case 4:

            return 26;

        case 3:

            return 18;

        case 2:

            return 9;

        case 1:

            return 6;

        default:

            return 44;
    }
};

var GetMoneySymbolPositions = function (view) {
    var moneySymbolPositions = [];

    for (var i = 0; i < view.length; i++) {

        if (isMoneySymbol(view[i])) {

            moneySymbolPositions.push(i);
        }
    }

    return moneySymbolPositions;
};

var GetStikySymbols = function (view) {
    var moneySymbols = [];

    for (var i = 0; i < view.length; i++) {

        if (isMoneySymbol(view[i])) {

            moneySymbols.push(moneySymbol);
        }
    }

    return moneySymbols;
}

module.exports = SlotMachine;