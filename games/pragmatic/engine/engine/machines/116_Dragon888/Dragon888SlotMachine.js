var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.gameSort = "BASE";
    this.currentGame = "BASE";
    this.lineCount = 1;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];

    this.betPerLine = 0;
    this.totalBet = 0;

    this.patternCount = 2000;
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.jackpotType = ["FREE"];
};

var slotWidth = 3, slotHeight = 3;
var baseReels = [
    [5, 6, 3, 6, 3, 6, 4, 6, 4, 6, 4, 6, 5, 6],
    [3, 6, 5, 6, 3, 6, 4, 6, 5, 6, 5, 6, 3, 6, 3, 6, 3, 6],
    [4, 6, 4, 6, 3, 6, 4, 6, 5, 6, 5, 6, 5, 6],
];
var payTable = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 25]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .), 
    this.normalPercent = 10; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    if (this.winMoney > 0) {
        this.winLines = "0~" + `${this.winMoney}` + "~3,4,5";
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

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
    var tmpView, tmpWin = 0;

    tmpView = RandomFreeViewGen(bpl, jpWin);
    tmpWin = WinFromView(tmpView, bpl);

    var pattern = {
        view: tmpView,
        win: tmpWin,
        type: "BASE",
        bpl: bpl,
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

var RandomFreeViewGen = function (bpl, jpWin) {
    var minMoney = jpWin * 0.8;
    var maxMoney = jpWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var fsview, fsWin;
        while (true) {
            fsview = RandomView(baseReels);
            fsWin = WinFromView(fsview, bpl);
            if (fsWin > jpWin * 0.5) {
                break;
            }
        }

        if (fsWin >= minMoney && fsWin <= maxMoney) {
            return fsview;
        }

        if (fsWin > lowerLimit && fsWin < minMoney) {
            lowerLimit = fsWin;
            lowerView = fsview;
        }
        if (fsWin > maxMoney && fsWin < upperLimit) {
            upperLimit = fsWin;
            upperView = fsview;
        }
    }

    return lowerView ? lowerView : upperView;
};

var WinFromView = function (view, bpl) {
    var multi = 0;
    if (view[3] == view[4] && view[4] == view[5]) {
        if (view[3] == 3) {
            multi = 100;
        } else if (view[4] == 4) {
            multi = 50;
        } else if (view[5] == 5) {
            multi = 25;
        } else {
            multi = 0;
        }
    } else if (view[3] != 6 && view[4] != 6 && view[5] != 6) {
        multi = 5;
    } else {
        multi = 0;
    }
    return bpl * multi;
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