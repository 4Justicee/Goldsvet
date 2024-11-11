var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    //          
    this.tumbleIndex = 0;
    this.tumbleViewList = [];
    this.tumbles = [];
    this.tmb_win = 0;
    this.tmb_res = 0;
    this.apwa = 0;
    this.tmb = "";
    this.rmul = "";
    this.tumbleMulti = 1;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMulti = 0;

    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 1000;
    this.lowLimit = 10;
    this.betPerLine = 0;

    this.lineCount = 20;
    this.jackpotType = ["FREE"];

    this.buyMulti = 100;
    this.buyPatternCount = 30;
    this.doubleMulti = 0.25;
};

var scatter = 1, multiSymbol = 12;
var slotWidth = 6, slotHeight = 5;
var freeSpinCount = 15;
var baseReels = [
    [4, 5, 7, 7, 7, 11, 11, 11, 6, 9, 10, 10, 10, 3, 8, 8, 8, 8, 10, 11, 12, 10, 8, 6, 11, 6, 11, 6, 10, 11, 11, 10, 9, 6, 9, 11, 5, 9, 5, 9, 11],
    [6, 9, 9, 9, 12, 10, 11, 11, 11, 4, 4, 9, 7, 5, 8, 11, 3, 10, 10, 10, 8, 7, 11, 9, 11, 3, 11, 4, 8, 4, 9, 8, 11, 9, 11, 9, 11, 4, 3, 6, 6, 8, 4, 4, 11, 6, 7, 6, 7, 8, 11, 4],
    [8, 8, 8, 7, 5, 5, 5, 5, 7, 7, 7, 12, 4, 11, 3, 6, 9, 8, 10, 7, 5, 10, 5, 7, 10, 7, 10, 7, 5, 7, 11, 10, 6, 5, 10, 5, 7, 5, 11, 5, 3, 5, 5, 5, 11, 5, 7, 5, 5, 11, 5, 7, 3, 7, 7, 5],
    [5, 12, 6, 6, 6, 4, 7, 7, 7, 9, 11, 3, 3, 3, 10, 10, 10, 10, 8, 6, 3, 7, 6, 9, 3, 10, 3, 9, 7, 11, 3, 10, 9, 10, 6, 11, 10, 7, 3, 6, 3, 6, 7, 10, 6, 3, 8, 3, 9, 7, 10],
    [12, 10, 8, 9, 11, 11, 11, 11, 5, 6, 7, 9, 9, 9, 3, 4, 8, 8, 8, 7, 7, 7, 9, 11, 9, 7, 9, 7, 6, 7, 11, 11, 11, 10, 8, 9, 9, 9, 6, 9, 11, 3, 5, 8, 8, 8, 7, 7, 7, 4, 4, 4, 7, 9, 5, 9, 7, 6, 8, 9, 8, 11, 7, 8, 10, 11, 8, 11, 7],
    [4, 8, 11, 11, 11, 12, 7, 10, 10, 10, 9, 5, 3, 10, 6, 11, 6, 6, 6, 9, 9, 9, 7, 5, 6, 10, 6, 5, 9, 10, 6, 3, 7, 10, 11, 10, 7, 9, 6, 3, 6, 9, 8, 10, 7, 4, 9, 4, 6, 9, 10, 11, 8, 8, 4, 10, 11, 7, 8, 9, 3, 6, 9]
];
var freeReels = [
    [8, 8, 8, 7, 9, 10, 5, 5, 5, 11, 6, 6, 8, 8, 8, 7, 7, 7, 7, 8, 7, 7, 8, 7, 6, 9, 9, 9, 5, 5, 8, 8, 8, 9, 10, 8, 4, 12, 6, 5, 3, 3, 9, 9, 9, 7],
    [4, 9, 9, 9, 9, 6, 5, 5, 5, 5, 1, 3, 10, 3, 3, 10, 10, 5, 12, 8, 10, 7, 3, 3, 11, 9, 6, 4, 4, 4, 6, 6, 6, 5, 5, 5, 6, 7, 5, 4, 5, 8, 8, 9, 9, 7, 7, 6, 5, 6],
    [8, 8, 8, 7, 7, 7, 7, 4, 4, 6, 6, 6, 12, 4, 11, 3, 3, 3, 6, 9, 8, 10, 7, 7, 7, 4, 4, 4, 11, 11, 10, 10, 10, 9, 9, 9, 4, 4, 4, 5, 5, 8, 8, 8, 5, 5, 3, 7, 7],
    [5, 12, 6, 6, 6, 4, 4, 4, 7, 7, 7, 9, 11, 10, 1, 7, 7, 7, 6, 6, 6, 10, 10, 10, 8, 6, 3, 3, 3, 7, 6, 9, 3, 10, 3, 9, 7, 11, 6, 6, 6, 6, 7, 7, 10],
    [4, 1, 7, 10, 8, 9, 9, 9, 6, 9, 11, 7, 7, 7, 12, 8, 8, 8, 8, 5, 9, 9, 9, 10, 10, 10, 7, 7, 7, 7, 9, 3, 3, 5, 9, 7, 6, 6, 6, 8, 8, 8, 11, 7, 8, 10, 11, 8, 11, 7],
    [4, 6, 5, 9, 6, 6, 6, 4, 4, 8, 7, 12, 3, 11, 10, 9, 9, 9, 3, 3, 3, 9, 9, 9, 9, 8, 8, 8, 8, 8, 6, 6, 6, 7, 7, 7, 6, 6, 6, 8, 8, 8, 8, 9, 9, 5, 5, 5]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 50, 40, 30, 20, 16, 10, 8, 5, 0],
    [0, 0, 0, 200, 50, 40, 30, 20, 16, 10, 8, 5, 0],
    [0, 0, 0, 500, 200, 100, 40, 30, 24, 20, 18, 15, 0],
    [0, 0, 0, 500, 200, 100, 40, 30, 24, 20, 18, 15, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0],
    [0, 0, 0, 1000, 500, 300, 240, 200, 160, 100, 80, 40, 0]
];
// 100                   
var multiList = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20];
var percentList = {
    scatterManyPercent: 5,
    freeWinPercent: 60,
    hugeMultiPercent: 3,
    bigMultiPercent: 7,
    mediumMultiPercent: 12,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 34; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    playingUser = player;
    bet = player.totalBet;
    betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;
    var view;

    if (viewCache.type == "BASE") {
        this.tumbleViewList = viewCache.view;
        view = this.tumbleViewList[0];
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.tumbleViewList = this.freeSpinCacheList[0];
        view = this.tumbleViewList[0];

        var freeSpinMoney = viewCache.win / viewCache.bpl * player.betPerLine;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.view = GetFinalView(view);
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.tmb = GetTmbStr(view, player.betPerLine);
    this.rmul = GetRmulStr(view);

    this.freeSpinMulti = 0;
    this.tumbleMulti = GetTumbleMulti(this.view).totalMulti;
    this.tmb_win = 0;
    this.tmb_res = 0;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinCount;

        this.currentGame = "FREE";

        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var view = this.tumbleViewList[this.tumbleIndex];

    this.view = GetFinalView(view);

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.tmb = GetTmbStr(view, player.betPerLine);
    this.rmul = GetRmulStr(view);

    this.tmb_win += this.winMoney;
    this.tumbleIndex++;

    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
        this.tmb_res = this.tmb_win;
        var multi = GetTumbleMulti(view).totalMulti;
        if (multi > 0) {
            this.freeSpinMulti += multi;
            this.tmb_res = this.tmb_win * this.freeSpinMulti;
        }
        this.apwa = this.tmb_res - this.tmb_win;
        this.winMoney = this.apwa;
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        this.freeSpinWinMoney += this.winMoney;
        //                 
        if (this.tumbleStatus == "NOTUMBLE") {
            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleViewList = this.freeSpinCacheList[this.freeSpinIndex];
    var view = this.tumbleViewList[0];
    this.view = GetFinalView(view);

    this.tmb_win = 0;
    this.tmb_res = 0;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.freeSpinWinMoney += this.winMoney;

    this.tmb = GetTmbStr(view, player.betPerLine);
    this.rmul = GetRmulStr(view);

    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney;
        this.tumbleMulti = this.freeSpinMulti;
        this.tumbleMulti += GetTumbleMulti(view).totalMulti;
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    if (baseWin > 0) {
        var { viewList, tumbleWinMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
    } else {
        var { viewList, tumbleWinMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
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
        default: break;
    }

}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinCacheList = [[scatterView]];

    var buyBonusData = RandomFreeViewCache(freeReels, bpl, fsWin, totalBet);

    return {
        win: buyBonusData.win + ScatterWinFromView(scatterView, totalBet),
        view: freeSpinCacheList.concat(buyBonusData.view),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
}
var random_view = 0;
var tumbleNextViewCount = 0;

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinCacheList = [[scatterView]];

    var buyBonusData = BuyBonusViewCache(freeReels, bpl, totalBet);

    return {
        win: buyBonusData.win + ScatterWinFromView(scatterView, totalBet),
        view: freeSpinCacheList.concat(buyBonusData.view),
        bpl: bpl,
        type: "FREE",
        isCall: 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {

        var tumbleWinMoney = 0;
        var view = RandomView(reels);
        var tumbleWinMoney = WinFromView(view, bpl);

        if (tumbleWinMoney == 0 || NumberOfScatters(view) > 1) {
            continue;
        }

        var viewList = [view];
        var tumbleMulti = 0;

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var tumbles = GetTumbles(lastView, bpl);
            var newView = GetNextViewByTumble(lastView, tumbles, false);

            if (isFreeSpinWin(newView)) {
                continue;
            }

            var nWinMoney = WinFromView(newView, bpl);
            viewList.push(newView);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                var multi = GetTumbleMulti(newView).totalMulti;
                tumbleMulti += multi;
                if (multi > 0) {
                    tumbleWinMoney *= tumbleMulti;
                }
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            return { viewList, tumbleWinMoney };
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
        var winMoney = WinFromView(view, bpl);

        if (winMoney == 0 && !isFreeSpinWin(view)) {
            var viewList = [];
            viewList.push(view);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
        }

    }
};

var RandomView = function (reels, isFreeSpin = false) {
    ++random_view;
    while (true) {
        var view = [];
        var randomIndex = 0;
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
                // if(view[viewPos] == 3){
                //     view[viewPos] == 3 + randomIndex % 2;
                // }
                if (!isFreeSpin && view[viewPos] == multiSymbol) {
                    view[viewPos] = multiSymbol - randomIndex % 4;
                }
            }
        }

        //                 12,              100          10012                    50       5012          
        //                 12    100                                
        for (var i = 0; i < view.length; i++) {
            if (view[i] == multiSymbol) {
                var multi;
                if (Util.probability(percentList.hugeMultiPercent)) {
                    multi = multiList[Util.random(0, multiList.length)];
                } else if (Util.probability(percentList.bigMultiPercent)) {
                    multi = multiList[Util.random(0, Math.floor(multiList.length / 2))];
                } else if (Util.probability(percentList.mediumMultiPercent)) {
                    multi = multiList[Util.random(0, Math.floor(multiList.length / 3))];
                } else {
                    multi = multiList[Util.random(0, Math.floor(multiList.length / 4))];
                }
                view[i] = multiSymbol + multi * 100;
            }
        }
        return view;
    }
};

var RandomScatterView = function (reels, bpl) {
    while (true) {
        var view = [];

        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
                if (view[viewPos] == multiSymbol) {
                    view[viewPos] -= (randomIndex % 3 + 1);
                }
            }
        }

        for (var j = 1; j < 5; ++j) {
            view[j + slotWidth * Util.random(0, slotHeight)] = scatter;
        }

        if (Util.probability(percentList.scatterManyPercent)) {
            view[Util.random(0, 2) * 5 + slotWidth * Util.random(0, slotHeight)] = scatter;
        }

        if (WinFromView(view, bpl) == 0) {
            return view;
        }
    }
};

var RandomFreeViewCache = function (reels, bpl, fsWin, totalBet) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin * 1.0;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {

        var freeSpinData = BuyBonusViewCache(reels, bpl, totalBet);

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

var BuyBonusViewCache = function (reels, bpl, totalBet) {
    random_view = 0;
    tumbleNextViewCount = 0;
    var win_count = 0;

    var freeSpinCacheList = [];
    var freeSpinTotalMoney = 0;
    var freeSpinIndex = 1;
    var tumbleTotalMulti = 0;

    while (true) {
        var view = [];
        var winMoney = 0;
        while (true) {
            view = RandomView(reels, 1);
            winMoney = WinFromView(view, bpl);

            if (NumberOfScatters(view) == 0 && (winMoney == 0 || Util.probability(percentList.freeWinPercent))) {
                break;
            }
        }
        if (winMoney) { ++win_count; }
        var viewList = [view];
        var tumbleWinMoney = winMoney;

        //                       
        if (winMoney > 0) {
            while (true) {
                var lastView = viewList[viewList.length - 1];
                var tumbles = GetTumbles(lastView, bpl);
                var newView = GetNextViewByTumble(lastView, tumbles, true);
                var winMoney = WinFromView(newView, bpl);

                if (NumberOfScatters(newView) > 2) {
                    continue;
                }

                viewList.push(newView);
                tumbleWinMoney += winMoney;

                //                 
                if (winMoney == 0) {
                    var multi = GetTumbleMulti(newView).totalMulti;
                    tumbleTotalMulti += multi;
                    //                                                        
                    if (multi > 0) {
                        tumbleWinMoney *= tumbleTotalMulti;
                    }
                    break;
                }
            }
        }

        freeSpinCacheList.push(viewList);
        freeSpinTotalMoney += tumbleWinMoney;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinCount) {
            break;
        }
    }

    return {
        win: freeSpinTotalMoney,
        view: freeSpinCacheList
    }
};

var WinFromView = function (view, bpl) {
    var symbolCount = payTable[0].length;
    var symbolCounts = [];
    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = 0;
    }
    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }
    var winMoney = 0;
    for (var i = 0; i < symbolCount; i++) {
        winMoney += payTable[symbolCounts[i]][i] * bpl;
    }
    return winMoney;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var symbolCount = payTable[0].length;
    var symbolCounts = [];
    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = 0;
    }
    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }
    for (var i = 0; i < symbolCount; i++) {
        var money = payTable[symbolCounts[i]][i] * bpl;
        if (money > 0) {
            var winSymbolPositions = SymbolPositions(view, i);
            winLines.push(`0~${money}~${winSymbolPositions.join('~')}`);
        }
    }
    return winLines;
};

var GetFinalView = function (view) {
    var finalView = [...view];
    for (var i = 0; i < view.length; i++) {
        if (finalView[i] > 100) {
            finalView[i] = multiSymbol;
        }
    }
    return finalView;
};

var GetTmbStr = function (view, bpl) {
    var tumbling = [];

    var symbolCount = payTable[0].length;
    var symbolCounts = [];
    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = 0;
    }
    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }
    for (var i = 0; i < symbolCount; i++) {
        var money = payTable[symbolCounts[i]][i] * bpl;
        if (money > 0) {
            var winSymbolPositions = SymbolPositions(view, i);
            for (var j = 0; j < winSymbolPositions.length; j++) {
                tumbling.push(`${winSymbolPositions[j]},${i}`);
            }
        }
    }
    return tumbling.join('~');
};

var GetRmulStr = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] > 100) {
            var multi = Math.floor(view[i] / 100);
            result.push(`${multiSymbol}~${i}~${multi}`);
        }
    }
    return result.join(';');
};

var GetTumbleMulti = function (view) {
    var totalMulti = 0;
    var multiPositions = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] > 100) {
            var multi = Math.floor(view[i] / 100);
            totalMulti += multi;
            multiPositions.push(i);
        }
    }
    return { totalMulti, multiPositions };
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 4;
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

var SymbolPositions = function (view, symbol) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == symbol) {
            result.push(i);
        }
    }
    return result;
};

var ScatterPositions = function (view) {
    return SymbolPositions(view, scatter);
};

var ScatterWinFromView = function (view, bet) {
    switch (NumberOfScatters(view)) {
        case 6:
            return bet * 100;
        case 5:
            return bet * 5;
        case 4:
            return bet * 3;
    }
    return 0;
};

var GetTumbles = function (view, bpl) {
    var tumbles = [];
    var symbolCount = payTable[0].length;

    var symbolCounts = [];
    for (var i = 0; i < symbolCount; i++) {
        symbolCounts[i] = 0;
    }
    for (var j = 0; j < view.length; j++) {
        var symbol = view[j];
        symbolCounts[symbol]++;
    }
    for (var i = 0; i < symbolCount; i++) {
        var money = payTable[symbolCounts[i]][i] * bpl;
        if (money > 0) {
            var winSymbolPositions = SymbolPositions(view, i);
            for (var j = 0; j < winSymbolPositions.length; j++) {
                tumbles.push(winSymbolPositions[j]);
            }
        }
    }
    return tumbles;
};

var GetTumbleMulti = function (view) {
    var totalMulti = 0;
    var multiPositions = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] > 100) {
            var multi = Math.floor(view[i] / 100);
            totalMulti += multi;
            multiPositions.push(i);
        }
    }
    return { totalMulti, multiPositions };
};

var GetNextViewByTumble = function (view, tumbles, isFreeSpin = false) {

    while (true) {
        ++tumbleNextViewCount;

        var nextView = Util.clone(view);

        for (var i = 0; i < slotWidth; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                if (tumbles.indexOf(pos) >= 0) {
                    for (var k = j - 1; k >= 0; k--) {
                        nextView[i + (k + 1) * slotWidth] = nextView[i + k * slotWidth];
                    }
                    nextView[i] = -1;
                }
            }
        }

        var reels = baseReels;
        //                                                                       
        if (isFreeSpin) {
            reels = freeReels;
        }

        //                                            
        var overView = RandomView(reels, isFreeSpin);
        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == -1) {
                nextView[i] = overView[i];
            }
        }

        return nextView;
    }
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