var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.basewin = 0;
    this.winMoney = 0;
    this.winLines = [];
    this.goldSymbolPositions = [];
    this.goldAlives = "";
    this.totalWin = 0;
    this.wp = 0;
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinCount = 12;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.maskView = [];
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //       
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 25;
    this.jackpotType = ["FREE"];
    this.highPercent = 2;
    this.normalPercent = 20;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [9, 5, 13, 12, 1, 8, 10, 6, 4, 7, 3, 11, 7, 12, 4, 7, 12, 10, 4, 8, 6, 4, 8, 6, 7, 4, 5, 7, 5],
    [10, 5, 4, 12, 2, 2, 2, 7, 9, 3, 2, 11, 6, 8, 13, 1, 6, 2, 12, 2, 5, 8, 2, 6, 11, 3, 11, 2, 12, 2, 5, 12, 8, 6, 12, 4],
    [2, 2, 2, 11, 6, 9, 2, 8, 13, 7, 3, 1, 5, 12, 4, 10, 4, 6, 12, 13, 12, 11, 5, 4, 12, 6, 13, 12, 6, 12, 11, 12, 3, 12, 13, 10, 12, 4, 7, 13],
    [12, 10, 7, 8, 11, 5, 2, 2, 2, 3, 4, 1, 13, 2, 9, 6, 8, 2, 11, 2, 13, 2, 5, 2, 5, 2, 1, 2, 8, 5, 2, 5],
    [2, 2, 2, 11, 4, 1, 8, 6, 7, 2, 3, 12, 5, 13, 10, 9, 1, 10, 6, 1, 7, 6, 10, 8, 6, 11, 1, 9, 5, 6, 9, 7, 9, 6, 8, 5, 11, 6, 8, 10, 11, 10, 5, 6, 13, 8, 1, 6, 9]
];
var freeReels = [
    [9, 5, 13, 12, 1, 8, 10, 6, 4, 7, 3, 11, 7, 12, 4, 7, 12, 10, 4, 8, 6, 4, 8, 6, 7, 4, 5, 7, 5],
    [10, 5, 4, 12, 2, 2, 2, 7, 9, 3, 2, 11, 6, 8, 13, 1, 6, 2, 12, 2, 5, 8, 2, 6, 11, 3, 11, 2, 12, 2, 3, 12, 8, 6, 12, 3],
    [2, 2, 2, 11, 6, 9, 2, 8, 13, 7, 3, 1, 5, 12, 4, 10, 4, 6, 12, 13, 12, 11, 3, 4, 12, 6, 13, 12, 6, 12, 3, 12, 3, 12, 13, 10, 12, 3, 4, 3, 13],
    [12, 10, 7, 8, 11, 5, 2, 2, 2, 3, 4, 1, 13, 2, 9, 6, 8, 2, 11, 2, 13, 2, 5, 2, 5, 2, 1, 2, 8, 5, 2, 5],
    [2, 2, 2, 11, 4, 1, 8, 6, 7, 2, 3, 12, 5, 13, 10, 9, 1, 10, 6, 1, 7, 6, 10, 8, 6, 11, 1, 9, 5, 6, 9, 7, 9, 6, 8, 5, 11, 6, 8, 10, 11, 10, 5, 6, 13, 8, 1, 6, 9]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [0, 0, 0, 50, 50, 20, 20, 20, 15, 15, 10, 10, 10, 10],
    [0, 0, 0, 200, 150, 100, 100, 100, 50, 50, 50, 50, 50, 50]
];
var payLines = [
    [0, 1, 2, 3, 4],          // 2
    [5, 6, 7, 8, 9],          // 1
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
    this.highPercent = 0; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.view = [];
    this.goldSymbolPositions = [];
    this.basewin = 0;
    this.winMoney = 0;
    this.winLines = [];
    this.maskView = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view.s;
        this.goldSymbolPositions = viewCache.view.g;

    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.view = cache.scatterView.s;
        this.goldSymbolPositions = cache.scatterView.g;
    }

    this.basewin = WinFromView(this.view, player.betPerLine);
    this.winMoney =
        WinFromView(this.view, player.betPerLine) +
        JackPotFromView({
            s: this.view,
            g: this.goldSymbolPositions
        }, player.betPerLine);

    if (this.basewin != this.winMoney) {
        console.log();
    }

    this.goldAlives = GoldWinInfoFromView({
        s: this.view,
        g: this.goldSymbolPositions
    }, player.betPerLine, this.lineCount);

    this.goldSymbolPositions = GoldPositionsToStr({
        s: this.view,
        g: this.goldSymbolPositions
    });
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.wp = (this.winMoney - this.basewin) / (player.betPerLine * this.lineCount);


    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 0;
        this.freeSpinLength = this.freeSpinCount;

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

    // this.mysterySymbol = 0;
    // if (Util.probability(40)) {
    //     var mystery = GetMysteryView(this.view);
    //     this.maskView = mystery.view;
    //     this.mysterySymbol = mystery.symbol;
    // }

    this.view = _view.s;
    this.goldSymbolPositions = _view.g;

    this.basewin = WinFromView(_view.s, player.betPerLine);

    this.winMoney =
        WinFromView(_view.s, player.betPerLine) +
        JackPotFromView(_view, player.betPerLine);

    this.goldAlives = GoldWinInfoFromView({
        s: this.view,
        g: this.goldSymbolPositions
    }, player.betPerLine, this.lineCount);

    this.goldSymbolPositions = GoldPositionsToStr({
        s: this.view,
        g: this.goldSymbolPositions
    });
    this.wp = (this.winMoney - this.basewin) / (player.betPerLine * this.lineCount);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
    // this.goldJackpot = "";

    // var jackpotWin = 0;
    // if (_view.jackPot >= 0) {
    //     this.goldJackpot = `${_view.symbol}~${goldPay[_view.jackPot]}`;
    //     jackpotWin = bet * goldPay[_view.jackPot];
    // }


    // this.totalWin = this.winMoney + jackpotWin;

    // playingUser.printLog(`            (${this.freeSpinIndex})       / (${this.freeSpinLength})              (${this.totalWin})`);

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
    var scatterView = RandomScatterView(baseReels)
    var scatterWin =
        ScatterWinFromView(scatterView.s, bpl * this.lineCount) +
        WinFromView(scatterView.s, bpl) +
        JackPotFromView(scatterView, bpl);
    var freeSpinData = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, this.freeSpinCount);

    freeSpinData.scatterView = scatterView;

    var pattern = {
        win: freeSpinData.win + scatterWin,
        view: freeSpinData,
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {

        var view = RandomView(reels);

        if (isFreeSpinWin(view.s)) {
            continue;
        }

        var winMoney =
            WinFromView(view.s, bpl) +
            JackPotFromView(view, bpl);

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
    while (true) {

        var view = RandomView(reels);

        if (isFreeSpinWin(view.s)) {
            continue;
        }

        var winMoney =
            WinFromView(view.s, bpl) +
            JackPotFromView(view, bpl);

        if (winMoney == 0) {

            return { view, winMoney };

        }

    }
};

var RandomView = function (reels) {
    var view = {};

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

    view.s = resultView;
    view.g = TakeGoldPositions(view.s);

    return view;
};

var RandomScatterView = function (reels) {
    while (true) {

        var view = RandomView(reels);

        if (!isFreeSpinWin(view.s)) {

            continue;
        }

        // 1, 2                                             
        // if (EXistScatterCouple(view.s)) {

        //     continue;
        // }

        return view;

    }
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1, upperLimit = 100000000000000;
    var lowerView = null, upperView = null;

    for (var stepIndex = 0; stepIndex < 200; stepIndex++) {
        var viewList = [];
        var freeSpinIndex = 0;
        var freeSpinLength = fsLen;
        var freeSpinWinMoney = 0;
        var goldPositions = [];

        while (true) {
            var view = RandomView(reels);

            if (isFreeSpinWin(view.s)) {
                continue;
            }

            if (!CheckCanBeGoldSymbols(view, goldPositions)) {
                continue;
            }

            goldPositions = view.g;

            viewList.push(view);

            var winMoney =
                WinFromView(view.s, bpl) +
                JackPotFromView(view, bpl);

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

var JackPotFromView = function (view, bpl) {
    var s = view.s;
    var g = view.g;
    var jackpotMoney = 0;

    for (var i = 0; i < payLines.length; i++) {

        var line = payLines[i];
        var lineSymbols = Util.symbolsFromLine(s, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            var matchCount = line.filter(function (item, index, arr) {
                return lineSymbols[index] != -1
            }).length;

            for (var j = 0; j < matchCount; j++) {

                if (g.indexOf(line[j]) == -1) continue;

                jackpotMoney += MultiFromGoldSymbol(s[line[j]], matchCount) * bpl;

            }

        }
    }

    return jackpotMoney;
};

var MultiFromGoldSymbol = function (symbol, matchCount) {
    var multiAry = [124950, 62500, 25000, 12500, 6250, 5000, 3750, 2500, 1875, 1250, 625, 500, 375, 250, 125];
    var multiArr = [125, 250, 375, 500, 625, 1250];

    if (matchCount == 5) {
        if (Util.probability(2)) {
            return multiArr[Util.random(0, multiArr.length)];
        }
        if (Util.probability(12)) {
            return multiArr[Util.random(0, multiArr.length / 2)];
        }
        return 125;
    }

    if (matchCount == 3 || matchCount == 4) {

        if (isWild(symbol)) {
            return 75;
        }

        if (isHighGoldSymbol(symbol)) {
            return 50;
        }

        if (isLowGoldSymbol(symbol)) {
            return 25;
        }

    }

    return 0;
};

var isLowGoldSymbol = function (symbol) {
    return symbol >= 8 && symbol <= 13
};

var isHighGoldSymbol = function (symbol) {
    return symbol >= 2 && symbol <= 7
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
    switch (NumberOfScatters(view)) {
        case 3: return totalBet * 2;
        case 4: return totalBet * 15;
        case 5: return totalBet * 100;
    }
    return 0;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isWild = function (symbol) {
    return symbol == wild;
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

var TakeGoldPositions = function (s) {
    var goldPositions = [];

    for (var i = 0; i < s.length; i++) {
        if (BeCanGoldSymbol(s[i])) {
            if (Util.probability(5)) {
                goldPositions.push(i);
            }
        }
    }

    return goldPositions;
};

var CheckCanBeGoldSymbols = function (view, goldPositions) {
    for (var i = 0; i < goldPositions.length; i++) {

        if (!BeCanGoldSymbol(view.s[goldPositions[i]])) {
            return false;
        }
        if (view.g.indexOf(goldPositions[i]) == -1) {
            view.g.push(goldPositions[i]);
        }

    }

    return true;
};

var GoldPositionsToStr = function (view) {
    var s = view.s;
    var g = view.g;
    var strAry = [];

    for (var i = 0; i < g.length; i++) {
        strAry.push(`${s[g[i]]}~${g[i]}`);
    }

    return strAry.join(';');
};

var GoldWinInfoFromView = function (view, bpl, lineCount) {
    var s = view.s;
    var g = view.g;
    var jackpotMoney = 0;

    var goldwins = [];

    for (var i = 0; i < payLines.length; i++) {

        var line = payLines[i];
        var lineSymbols = Util.symbolsFromLine(s, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            var matchCount = line.filter(function (item, index, arr) {
                return lineSymbols[index] != -1
            }).length;

            for (var j = 0; j < matchCount; j++) {

                if (g.indexOf(line[j]) == -1) continue;

                goldwins.push(`${s[line[j]]}~${MultiFromGoldSymbol(s[line[j]], matchCount) / lineCount}`);

            }

        }
    }

    return goldwins.join(';');
}

module.exports = SlotMachine;