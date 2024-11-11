var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    this.view = [];
    this.virtualReels = {};
    this.baseWin = 0;
    this.mysterySymbol = 0;
    this.winLines = [];
    this.maskView = [];
    this.goldPositiosForApi = [];
    this.jackpotMoneyInfo = 0;
    this.jackpotMultiInfo = 0;
    this.jackpotSymbolInfo = [];
    this.freeSpinLength = 0;
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.freeSpinIndex = 0;
    this.freeSpinWinMoney = 0;
    this.beforeFreeSpinWinMoney = 0;
    this.jackpotMoney = 0;
    this.freeSpinCacheList = [];
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
    this.jackpotType = ["FREE"];
};

var slotWidth = 5, slotHeight = 3;

var scatter = 1, wild = 2, lightSymbol = 14;

var baseReels = [
    [11, 6, 13, 8, 9, 1, 4, 10, 3, 10, 9, 6, 12, 13, 5, 11, 5, 7, 12],
    [7, 3, 7, 11, 13, 10, 12, 6, 2, 2, 2, 4, 8, 1, 9, 7, 5, 2, 12, 4],
    [6, 7, 3, 11, 9, 1, 9, 12, 4, 5, 2, 2, 2, 2, 2, 13, 8, 6, 4, 11, 10],
    [10, 2, 2, 2, 2, 4, 2, 8, 13, 10, 7, 6, 13, 2, 8, 11, 13, 4, 12, 5, 10, 1, 3, 12, 9],
    [10, 12, 2, 2, 2, 2, 2, 2, 2, 2, 4, 5, 10, 8, 13, 8, 6, 9, 1, 9, 11, 2, 3, 1, 3, 7, 12]
];

var freeReels = [
    [6, 12, 8, 1, 7, 8, 11, 10, 12, 9, 11, 3, 9, 5, 4, 5, 13],
    [7, 9, 13, 10, 2, 2, 2, 2, 2, 14, 14, 14, 14, 14, 6, 7, 11, 12, 5, 12, 3, 14, 8, 1, 2, 4, 14, 4, 14, 2],
    [2, 2, 2, 2, 2, 2, 2, 1, 2, 6, 2, 14, 14, 14, 4, 8, 9, 14, 2, 4, 11, 13, 12, 11, 10, 9, 2, 5, 2, 3, 2, 7, 2, 6, 9, 14, 7],
    [9, 13, 6, 10, 2, 2, 2, 2, 2, 2, 2, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 11, 14, 14, 12, 13, 12, 2, 14, 4, 5, 3, 14, 11, 2, 8, 13, 4, 14, 10, 1, 7],
    [8, 10, 1, 3, 9, 2, 2, 2, 14, 14, 14, 2, 2, 3, 10, 5, 12, 4, 1, 2, 9, 2, 8, 13, 6, 12, 11, 2, 7, 14, 14]
];

var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0],
    [0, 0, 0, 50, 50, 20, 20, 20, 15, 15, 10, 10, 10, 10, 0],
    [0, 0, 0, 200, 150, 100, 100, 100, 50, 50, 50, 50, 50, 50, 0]
];

var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],          // 3
    [0, 6, 12, 8, 4],          // 4
    [10, 6, 2, 8, 14],          // 5
    [5, 1, 2, 3, 9],          // 6
    [5, 11, 12, 13, 9],          // 7
    [0, 1, 7, 13, 14],          // 8
    [10, 11, 7, 3, 4],          // 9
    [5, 11, 7, 3, 9],          // 10
    [5, 1, 7, 13, 9],          // 11
    [0, 6, 7, 8, 4],          // 12
    [10, 6, 7, 8, 14],          // 13
    [0, 6, 2, 8, 4],          // 14
    [10, 6, 12, 8, 14],          // 15
    [5, 6, 2, 8, 9],          // 16
    [5, 6, 12, 8, 9],          // 17
    [0, 1, 12, 3, 4],          // 18
    [10, 11, 2, 13, 14],          // 19
    [0, 11, 12, 13, 4],          // 20
    [10, 1, 2, 3, 14],          // 21
    [5, 11, 2, 13, 9],          // 22
    [5, 1, 12, 3, 9],          // 23
    [0, 11, 2, 13, 4],          // 24
    [10, 1, 12, 3, 14],          // 25
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevGameMode = this.currentGame;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.maskView = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    // ===== GET VIEW ========================
    var viewInfo = null;
    if (viewCache.type == "BASE") {
        viewInfo = viewCache.view;

    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view.viewList;
        viewInfo = viewCache.view.scatterView;
    }
    this.view = viewInfo.s;
    this.goldPositiosForApi = GetGoldPosStr(viewInfo);
    this.mysterySymbol = RandomSymbol();
    // ======================================

    // ===== CALCULATE MONEY ==========================================
    this.baseWin = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    // =============================
    var jackpotWinInfo = JackpotFromView(viewInfo, player.betPerLine);
    this.jackpotMoney = jackpotWinInfo.jackpotMoney;
    this.jackpotMoneyInfo = jackpotWinInfo.jackpotMoneyInfo;
    this.jackpotMultiInfo = jackpotWinInfo.jackpotMultiInfo;
    this.jackpotSymbolInfo = jackpotWinInfo.jackpotSymbolInfo;
    // =============================
    this.winMoney = this.baseWin + this.jackpotMoney;
    // ================================================================

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 0;
        this.freeSpinLength = FreeSpinCountsFromView(this.view);
        this.scatterPositions = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.baseWin += this.scatterWin;
        this.winMoney += this.scatterWin;
        this.beforeFreeSpinWinMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var _view = this.freeSpinCacheList[this.freeSpinIndex];

    if (ExistLight(_view.s.s)) {

        this.maskView = _view.s.s;
        this.mysterySymbol = _view.ls;
        this.view = GetRealFromLightView(this.maskView, _view.ls);

    } else {

        this.view = _view.s.s;
    }
    this.goldPositiosForApi = GetGoldPosStr(_view.s);
    this.mysterySymbol = _view.ls;

    // ===== CALCULATE MONEY ==========================================
    this.baseWin = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    // =============================
    var jackpotWinInfo = JackpotFromView({
        s: this.view,
        g: _view.s.g
    }, player.betPerLine);
    this.jackpotMoney = jackpotWinInfo.jackpotMoney;
    this.jackpotMoneyInfo = jackpotWinInfo.jackpotMoneyInfo;
    this.jackpotMultiInfo = jackpotWinInfo.jackpotMultiInfo;
    this.jackpotSymbolInfo = jackpotWinInfo.jackpotSymbolInfo;
    // =============================
    this.winMoney = this.baseWin + this.jackpotMoney;
    // ================================================================

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.scatterWin = ScatterWinFromView(this.view, player.virtualBet);
    this.baseWin += this.scatterWin;
    this.winMoney += this.scatterWin;

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;

    if (this.scatterWin > 0) {
        this.freeSpinLength += 5;
        this.isFreeSpinMore = 1;
        this.scatterPositions = ScatterPositions(this.view);
    } else {
        this.isFreeSpinMore = 0;
    }

    if (this.freeSpinIndex >= this.freeSpinLength) {
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

    if (viewInfo.comment) {

        pattern.comment = viewInfo.comment;
    }

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        // newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
        newJpType = "FREE";
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        case "JACKPOT":
            return this.SpinForBaseJackpot(bpl, totalBet, jpWin, isCall);
        default:
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWin =
        ScatterWinFromView(scatterView.s, bpl * this.lineCount) +
        WinFromView(scatterView.s, bpl) +
        JackpotFromView(scatterView, bpl).jackpotMoney;
    var fsLen = FreeSpinCountsFromView(scatterView.s);
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, fsLen);

    freeSpinData.scatterView = scatterView;

    var pattern = {
        win: freeSpinData.win + scatterWin,
        view: freeSpinData,
        bpl: bpl,
        type: "FREE",
        comment: freeSpinData.comment,
        isCall: isCall ? 1 : 0
    };

    return pattern;
}

SlotMachine.prototype.SpinForBaseJackpot = function (bpl, totalBet, fsWin, isCall) {
    var maxPattern = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {

        var pattern = this.SpinForBaseGen(bpl, totalBet, fsWin);
        pattern.isCall = isCall ? 1 : 0;
        pattern.comment = "      ";

        if (!maxPattern) {
            maxPattern = pattern;
            continue;
        }

        if (maxPattern.win > fsWin && pattern.win < maxPattern.win) {
            maxPattern = pattern;
            continue;
        }

        if (maxPattern.win < fsWin && pattern.win > maxPattern.win && pattern.win < fsWin) {
            maxPattern = pattern;
            continue;
        }
    }

    return maxPattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {

        var comment = null;

        var viewInfo = RandomView(reels);

        if (Util.probability(80) && ExistScatter(viewInfo.s)) {
            continue;
        }

        if (isFreeSpinWin(viewInfo.s)) {
            continue;
        }

        var winMoney = WinFromView(viewInfo.s, bpl);
        var jackopWinInfo = JackpotFromView(viewInfo, bpl);

        if (jackopWinInfo.jackpotSymbolInfo.length > 2) {
            continue;
        }

        if (jackopWinInfo.jackpotMoney > 0) {
            comment = "      ";
        }

        winMoney += jackopWinInfo.jackpotMoney;

        if (winMoney > bottomLimit && winMoney <= maxWin) {

            return {
                view: viewInfo,
                winMoney,
                comment: comment
            };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {

    while (true) {

        var viewInfo = RandomView(reels);

        if (isFreeSpinWin(viewInfo.s)) {
            continue;
        }

        if (Util.probability(80) && ExistScatter(viewInfo.s)) {
            continue;
        }

        var winMoney = WinFromView(viewInfo.s, bpl);

        if (winMoney == 0) {

            return {
                view: viewInfo,
                winMoney: 0
            };
        }

    }
};

var RandomView = function (reels) {
    var randView = [];
    var goldpositions = [];

    for (var i = 0; i < slotWidth; i++) {

        var len = reels[i].length;
        var randomIndex = Util.random(0, len);

        for (var j = 0; j < slotHeight; j++) {

            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            randView[viewPos] = reels[i][reelPos];
        }
    }

    var reel = 4;

    for (var i = 0; i < slotHeight; i++) {
        if (BeCanGoldSymbol(randView[i * slotWidth + reel])) {
            if (Util.probability(50)) {
                goldpositions.push(i * slotWidth + reel);
            }
        }
    }

    return {
        s: randView,
        g: goldpositions
    };
};

var RandomScatterView = function (reels) {

    while (true) {

        var viewInfo = RandomView(reels);

        var jackopWinInfo = JackpotFromView(viewInfo);

        if (jackopWinInfo.jackpotMoney > 0) {
            continue;
        }

        var scatterCount = NumberOfScatters(viewInfo.s);

        if (scatterCount >= 3 && scatterCount <= 4) {
            return viewInfo;
        }
    }
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var maxPattern = null;

    for (var patternIndex = 0; patternIndex < 200 || !maxPattern; patternIndex++) {

        var comment = null;

        var viewList = [];

        var freeSpinIndex = 0;
        var freeSpinLength = fsLen;
        var freeSpinWinMoney = 0;

        var majorJackpot = 0;
        var minorJackpot = 0;

        while (true) {

            var freeViewInfo = RandomView(reels);

            if (Util.probability(80) && ExistScatter(freeViewInfo.s)) {
                continue;
            }

            if (isFreeSpinWin(freeViewInfo.s)) {
                continue;
            }

            var symbolForLight = RandomSymbol();

            var viewForMoney = [...freeViewInfo.s];

            for (var i = 0; i < viewForMoney.length; i++) {

                if (viewForMoney[i] == lightSymbol) {

                    viewForMoney[i] = symbolForLight;
                }
            }

            var jackpotWinInfo = JackpotFromView({ s: viewForMoney, g: freeViewInfo.g }, bpl);

            if (jackpotWinInfo.jackpotSymbolInfo.length > 5 || jackpotWinInfo.grandJackpot) {
                continue;
            }

            majorJackpot += jackpotWinInfo.majorJackpot;
            minorJackpot += jackpotWinInfo.minorJackpot;

            if (jackpotWinInfo.jackpotMoney > 0) {
                comment = "                        ";
            }

            var winMoney = WinFromView(viewForMoney, bpl) + jackpotWinInfo.jackpotMoney;

            freeSpinWinMoney += winMoney;

            viewList.push({
                s: freeViewInfo,
                ls: symbolForLight,
            });

            freeSpinIndex++;

            if (freeSpinIndex >= freeSpinLength) {
                break;
            }
        }

        var pattern = {
            win: freeSpinWinMoney,
            viewList,
            comment: comment
        };


        if (!maxPattern && (Util.probability(3) ? majorJackpot < 2 : majorJackpot < 1) && minorJackpot < 5) {
            maxPattern = pattern;
            continue;
        }

        if (maxPattern) {
            if (maxPattern.win > fsWin && pattern.win < maxPattern.win) {
                maxPattern = pattern;
                continue;
            }

            if (maxPattern.win < fsWin && pattern.win > maxPattern.win && pattern.win < fsWin) {
                maxPattern = pattern;
                continue;
            }
        }
    }

    return maxPattern;
}

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {

        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var BeCanGoldSymbol = function (symbol) {
    if (symbol >= 2 && symbol <= 13) {
        return true;
    }
    return false;
};

var WinFromView = function (view, bpl) {
    var winMoney = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {

        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        winMoney += linePay;
    }

    return winMoney;
};

var WinFromLine = function (lineSymbols, bpl = 10) {
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
        var linepay = WinFromLine(lineSymbols, bpl);

        if (linepay > 0) {
            winLines.push(
                `${lineId}~${linepay}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }

    return winLines;
};

var JackpotFromView = function (viewInfo, bpl = 10) {
    var jackpotMoney = 0;
    var jackpotSymbolInfo = [];
    var jackpotMultiInfo = 0;
    var jackpotMoneyInfo = 0;
    var grandJackpot = 0;
    var majorJackpot = 0;
    var minorJackpot = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {

        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(viewInfo.s, line);
        var lineSymbolsTmp = [...lineSymbols];
        var linePay = WinFromLine(lineSymbolsTmp);

        if (linePay > 0) {

            var filterLine = line.filter(function (item, index, arr) {

                return lineSymbolsTmp[index] != -1;
            });

            if (filterLine.length == slotWidth && viewInfo.g.indexOf(filterLine[filterLine.length - 1]) != -1) {

                if (lineSymbols.indexOf(wild) != -1) {

                    jackpotMoney += bpl * 625;
                    jackpotSymbolInfo.push(`${lineSymbols[0]}~25`);
                    jackpotMultiInfo += 25;
                    jackpotMoneyInfo += bpl * 625;
                    ++minorJackpot;

                } else if (lineSymbols[0] >= 8 && lineSymbols[0] <= 13) {

                    jackpotMoney += bpl * 5000;
                    jackpotSymbolInfo.push(`${lineSymbols[0]}~200`);
                    jackpotMultiInfo += 200;
                    jackpotMoneyInfo += bpl * 5000;
                    ++majorJackpot;
                } else if (lineSymbols[0] >= 3 && lineSymbols[0] <= 7) {

                    jackpotMoney += bpl * 20000;
                    jackpotSymbolInfo.push(`${lineSymbols[0]}~800`);
                    jackpotMultiInfo += 800;
                    jackpotMoneyInfo += bpl * 20000;
                    ++grandJackpot;
                }
            }
        }
    }

    return {
        jackpotMoney,
        jackpotMultiInfo,
        jackpotSymbolInfo,
        jackpotMoneyInfo,
        grandJackpot,
        majorJackpot,
        minorJackpot
    };
};

var FreeSpinCountsFromView = function (view) {

    switch (NumberOfScatters(view)) {
        case 3: return 8;
        case 4: return 10;
        case 5: return 15;
    }
    return 0;
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

var RandomSymbol = function () {
    return Util.random(2, 14);
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 3: return totalBet * 2;
        case 4: return totalBet * 15;
        case 5: return totalBet * 100;
    }
    return 0;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var GetGoldPosStr = function (viewInfo) {
    var goldSymbolInfo = [];

    for (var i = 0; i < viewInfo.s.length; i++) {

        if (viewInfo.g.indexOf(i) != -1) {

            goldSymbolInfo.push(`${viewInfo.s[i]}~${i}`);
        }
    }

    return goldSymbolInfo;
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

var GetRealFromLightView = function (lightView, symbol) {
    var realView = [...lightView];

    for (var i = 0; i < realView.length; i++) {
        if (realView[i] == lightSymbol) {
            realView[i] = symbol;
        }
    }

    return realView;
};

var ExistLight = function (view) {
    for (var i = 0; i < view.length; i++) {
        if (view[i] == lightSymbol) {
            return true;
        }
    }
    return false;
};

var ExistScatter = function (view) {

    for (var i = 0; i < view.length; i++) {

        if (isScatter(view[i])) {

            return true;
        }
    }

    return false;
}

module.exports = SlotMachine;