var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    this.topView = [];
    this.highlightSymbolsForApi = "";
    this.belowView = [];
    this.topWinLines = [];
    this.prevRespinStatus = "NORESPIN";
    this.respinStatus = "NORESPIN";
    this.repspinIndex = 0;
    this.respinCacheList = [];
    this.prevTopWinLines = [];
    this.prevTopView = [];
    this.respinWinMoney = 0;
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
    this.lineCount = 20;
    this.jackpotType = ["JACKPOT"];
};

var slotWidth = 5, slotHeight = 1;
var keyForSymbol = 10;
var respinSymbol = 7;
var topDarkView = [
    3, 4, 5,
    6, 7, 8,
    9, 10, 11
];
var baseReels = [
    [12, 3, 12, 4, 12, 5, 12, 6, 12, 7, 12, 8, 12, 9, 12, 10, 12, 11, 12, 10, 12, 6, 12, 6, 12, 6, 12, 6, 12, 5, 12, 7, 12, 7, 12, 8, 12, 10, 12, 10, 12, 9, 12, 11, 12, 11, 12, 10, 12, 10, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 7, 12, 7, 12, 8, 12, 10, 12, 10, 12, 9, 12, 10, 12, 10, 12, 10, 12, 10, 12, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 7, 12, 7, 12, 8, 12, 10, 12, 10, 12, 9, 12, 10, 12, 10, 12, 10, 12, 10, 12, 6, 12, 6, 12, 6, 12, 6, 12, 12, 6, 12, 7, 12, 7, 12, 8, 12, 10, 12, 10, 12, 9, 12, 10, 12, 10, 12, 10, 12, 10, 12, 8, 12],
    [12, 6, 12, 7, 12, 9, 12, 9, 12, 9, 12, 9, 12, 4, 12, 11, 12, 11, 12, 11, 12, 8, 12, 8, 12, 8, 12, 8, 12, 5, 12, 12, 6, 12, 9, 12, 9, 12, 10, 12, 9, 12, 9, 12, 11, 12, 11, 12, 11, 12, 11, 12, 8, 12, 8, 12, 8, 12, 8, 12, 8, 12, 6, 12, 9, 12, 9, 12, 9, 12, 9, 12, 9, 12, 11, 12, 11, 12, 11, 12, 11, 12, 12, 8, 12, 8, 12, 8, 12, 8, 12, 8, 12, 6, 12, 5, 12, 9, 12, 9, 12, 9, 12, 9, 12, 11, 12, 11, 12, 11, 12, 11, 12, 8, 12, 8, 12, 8, 12, 8, 12, 12, 8, 12, 6, 12, 5, 12, 9, 12, 9, 12, 9, 12, 9, 12, 11, 12, 11, 12, 11, 12, 11, 12, 8, 12, 8],
    [12, 7, 12, 7, 12, 9, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 4, 12, 7, 12, 7, 12, 9, 12, 9, 12, 5, 12, 12, 9, 12, 7, 12, 8, 12, 10, 12, 5, 12, 5, 12, 6, 12, 11, 12, 8, 12, 6, 12, 9, 12, 9, 12, 9, 12, 9, 12, 9, 12, 9, 12, 7, 12, 8, 12, 5, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 12, 9, 12, 9, 12, 9, 12, 9, 12, 9, 12, 5, 12, 5, 12, 8, 12, 5, 12, 5, 12, 5, 12, 6, 12, 6, 12, 6, 12, 6, 12, 9, 12, 9, 12, 9, 12, 9, 12, 12, 9, 12, 5, 12, 5, 12, 8, 12, 5, 12, 8, 12, 5, 12, 6, 12, 6, 12, 6, 12, 6, 12, 9, 12, 9],
    [12, 7, 12, 9, 12, 5, 12, 10, 12, 10, 12, 10, 12, 4, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 12, 9, 12, 9, 12, 9, 12, 8, 12, 10, 12, 10, 12, 5, 12, 11, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 9, 12, 9, 12, 9, 12, 10, 12, 10, 12, 10, 12, 5, 12, 6, 12, 6, 12, 5, 12, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 5, 12, 9, 12, 9, 12, 10, 12, 10, 12, 10, 12, 5, 12, 6, 12, 6, 12, 5, 12, 6, 12, 6, 12, 6, 12, 6, 12, 12, 6, 12, 5, 12, 9, 12, 9, 12, 10, 12, 10, 12, 10, 12, 5, 12, 8, 12, 8, 12, 5, 12, 6],
    [12, 7, 12, 5, 12, 9, 12, 10, 12, 4, 12, 10, 12, 5, 12, 5, 12, 5, 12, 5, 12, 5, 12, 6, 12, 6, 12, 6, 12, 6, 12, 12, 7, 12, 8, 12, 9, 12, 10, 12, 8, 12, 10, 12, 5, 12, 11, 12, 5, 12, 5, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 7, 12, 8, 12, 9, 12, 10, 12, 8, 12, 10, 12, 5, 12, 5, 12, 5, 12, 5, 12, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 7, 12, 8, 12, 9, 12, 10, 12, 8, 12, 10, 12, 5, 12, 8, 12, 8, 12, 5, 12, 6, 12, 6, 12, 6, 12, 6, 12, 12, 6, 12, 7, 12, 8, 12, 9, 12, 10, 12, 8, 12, 10, 12, 5, 12, 5, 12, 8, 12, 8, 12, 6]
];
var payLines = [
    [0, 1, 2], // 0
    [3, 4, 5], // 1
    [6, 7, 8], // 2
    [0, 3, 6], // 3
    [1, 4, 7], // 4
    [2, 5, 8], // 5
    [0, 4, 8], // 6
    [6, 4, 2], // 7
];
var payTable = [0, 40, 100, 200, 300, 600, 2000, 0, 8000];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevGameMode = this.currentGame;
    this.prevRespinStatus = this.respinStatus;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    if (this.respinStatus == "RESPIN") {
        this.Respin(player);
        return;
    }

    this.winMoney = 0;
    this.respinWinMoney = 0;
    this.topView = topDarkView;
    this.prevTopView = topDarkView;
    this.prevTopWinLines = [];
    this.topWinLines = [];

    var viewCache = player.viewCache;

    this.respinCacheList = viewCache.view;
    this.belowView = this.respinCacheList[0];
    var topViewInfo = GetTopView(this.topView, this.belowView);
    this.topView = topViewInfo.topView;
    this.highlightSymbolsForApi = topViewInfo.hightLightSymbols;
    this.topWinLines = WinLinesFromView(this.topView);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (this.prevTopWinLines.length != this.topWinLines.length || ExistRespinSymbol(this.belowView)) {

        this.respinIndex = 0;
        this.respinStatus = "RESPIN";
    }
};

SlotMachine.prototype.Respin = function (player) {
    this.respinIndex++;

    this.prevTopView = this.topView;
    this.prevTopWinLines = this.topWinLines;

    this.belowView = this.respinCacheList[this.respinIndex];
    var topViewInfo = GetTopView(this.topView, this.belowView);
    this.topView = topViewInfo.topView;
    this.highlightSymbolsForApi = topViewInfo.hightLightSymbols;
    this.topWinLines = WinLinesFromView(this.topView);

    if (this.prevTopWinLines.length == this.topWinLines.length && !ExistRespinSymbol(this.belowView)) {

        this.winMoney = payTable[this.topWinLines.length] * player.betPerLine;
        this.respinWinMoney = this.winMoney;
        this.respinStatus = "NORESPIN";
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
    var maxPattern = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var pattern = this.SpinForBaseGen(bpl, totalBet, jpWin);
        pattern.isCall = isCall ? 1 : 0;
        pattern.comment = "      ";

        if (!maxPattern) {
            maxPattern = pattern;
            continue;
        }

        if (maxPattern.win > jpWin && pattern.win < maxPattern.win) {
            maxPattern = pattern;
            continue;
        }

        if (maxPattern.win < jpWin && pattern.win > maxPattern.win && pattern.win < jpWin) {
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

        var topView = topDarkView;
        var belowView = [];
        var prevWinLines = [];
        var winLines = [];
        var viewList = [];
        var winMoney = null;

        while (true) {

            prevWinLines = winLines;

            belowView = RandomView(reels);
            topView = GetTopView(topView, belowView).topView;

            winLines = WinLinesFromView(topView);

            // =================
            viewList.push(belowView);
            // =================

            if (prevWinLines.length == winLines.length && !ExistRespinSymbol(belowView)) {

                winMoney = payTable[winLines.length] * bpl;
                break;
            }
        }

        if (winMoney > bottomLimit && winMoney <= maxWin) {

            return {
                view: viewList,
                winMoney: winMoney
            };
        }

        calcCount++;
        if (calcCount > 100) {
            bottomLimit = -1;
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {

        var topView = topDarkView;
        var belowView = [];
        var winLines = [];

        belowView = RandomView(reels);

        if (ExistRespinSymbol(belowView)) {

            continue;
        }

        topView = GetTopView(topView, belowView).topView;
        winLines = WinLinesFromView(topView);

        if (winLines.length == 0) {

            return {
                view: [belowView],
                winMoney: 0
            };
        }
    }
};

var RandomView = function (reels, isFreeView = false) {
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {

        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinLinesFromView = function (view) {
    var winLines = [];

    for (var i = 0; i < payLines.length; i++) {

        var matchCnt = 0;
        var lineSymbols = Util.symbolsFromLine(view, payLines[i]);

        for (var j = 0; j < lineSymbols.length; j++) {

            if (isHighLightSymbol(lineSymbols[j])) {
                matchCnt++;
            }

        }

        if (matchCnt == 3) {
            winLines.push(`${i}~0.00~${payLines[i].join('~')}`);
        }
    }

    return winLines;
};

var isHighLightSymbol = function (symbol) {

    return symbol >= 13 && symbol <= 21;
};

var isDarkSymbol = function (symbol) {

    return symbol >= 3 && symbol <= 11;
};

var ExistRespinSymbol = function (belowView) {

    for (var i = 0; i < belowView.length; i++) {

        if (isRespinSymbol(belowView[i])) {

            return true;
        }
    }

    return false;
};

var GetTopView = function (prevTopView, belowView) {
    var nextTopView = [...prevTopView];
    var hightLightSymbols = [];

    for (var i = 0; i < nextTopView.length; i++) {

        if (isDarkSymbol(nextTopView[i]) && belowView.indexOf(nextTopView[i]) != -1) {

            hightLightSymbols.push(`${nextTopView[i]}~${nextTopView[i] + keyForSymbol}~${i}`);
            nextTopView[i] = nextTopView[i] + keyForSymbol;
        }
    }

    return {
        topView: nextTopView,
        hightLightSymbols
    };
};

var isRespinSymbol = function (symbol) {

    return symbol == respinSymbol;
}

module.exports = SlotMachine;