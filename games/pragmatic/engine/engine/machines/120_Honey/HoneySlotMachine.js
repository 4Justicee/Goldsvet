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
    this.randomSpinCache = [];
    this.randomSpinMode = 0;
    this.randomSpinIndex = 0;
    this.randomSpinLength = 0;
    this.randomInd = 0;
    this.strikeLevel = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinLevel = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [4, 8, 7, 3, 3, 3, 3, 10, 6, 2, 11, 5, 9, 1, 8, 5, 7, 10, 6, 11, 4, 9, 2, 8, 10, 4, 7, 6, 1, 5, 9, 8, 5, 7],
    [4, 8, 7, 3, 3, 3, 3, 10, 6, 2, 11, 5, 9, 8, 5, 7, 10, 6, 11, 4, 9, 8, 2, 10, 4, 7, 6, 11, 5, 9, 8, 5, 7],
    [4, 8, 7, 3, 3, 3, 3, 10, 6, 2, 11, 5, 9, 1, 8, 5, 7, 10, 6, 11, 4, 9, 2, 8, 10, 4, 7, 6, 1, 5, 9, 8, 5, 7],
    [4, 8, 7, 3, 3, 3, 3, 10, 6, 2, 11, 5, 9, 8, 5, 7, 10, 6, 11, 4, 9, 8, 2, 10, 4, 7, 6, 11, 5, 9, 8, 5, 7],
    [4, 8, 7, 3, 3, 3, 3, 10, 6, 2, 11, 5, 9, 1, 8, 5, 7, 10, 6, 11, 4, 9, 2, 8, 10, 4, 7, 6, 1, 5, 9, 8, 5, 7]
];
var freeReels = [
    [
        [11, 9, 5, 8, 10, 3, 11, 4, 8, 9, 7, 5, 10, 6],
        [3, 11, 4, 8, 9, 7, 5, 10, 6, 11, 9, 5, 8, 10],
        [6, 11, 9, 5, 8, 10, 3, 11, 4, 8, 9, 7, 5, 10],
        [8, 9, 7, 5, 10, 6, 11, 9, 5, 8, 10, 3, 11, 4],
        [5, 8, 10, 3, 11, 4, 8, 9, 7, 5, 10, 6, 11, 9]
    ],
    [
        [4, 8, 7, 3, 3, 3, 3, 10, 6, 11, 5, 9, 2, 8, 5, 7, 10, 6, 11, 4, 9, 8, 10, 4, 2, 7, 6, 11, 5, 9, 8, 5, 7],
        [4, 8, 7, 3, 3, 3, 3, 10, 6, 11, 5, 9, 2, 8, 5, 7, 10, 6, 11, 4, 9, 8, 10, 4, 2, 7, 6, 11, 5, 9, 8, 5, 7],
        [4, 8, 7, 3, 3, 3, 3, 10, 6, 11, 5, 9, 2, 8, 5, 7, 10, 6, 11, 4, 9, 8, 10, 4, 2, 7, 6, 11, 5, 9, 8, 5, 7],
        [4, 8, 7, 3, 3, 3, 3, 10, 6, 11, 5, 9, 2, 8, 5, 7, 10, 6, 11, 4, 9, 8, 10, 4, 2, 7, 6, 11, 5, 9, 8, 5, 7],
        [4, 8, 7, 3, 3, 3, 3, 10, 6, 11, 5, 9, 2, 8, 5, 7, 10, 6, 11, 4, 9, 8, 10, 4, 2, 7, 6, 11, 5, 9, 8, 5, 7]
    ]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 50, 40, 30, 20, 20, 8, 8, 4, 4, 4, 0, 0, 0, 0, 0],
    [0, 0, 200, 200, 100, 80, 80, 40, 40, 10, 10, 10, 0, 0, 0, 0, 0],
    [0, 0, 500, 400, 300, 200, 200, 150, 150, 100, 100, 100, 0, 0, 0, 0, 0]
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
    [0, 1, 12, 3, 4],           // 18
    [10, 11, 2, 13, 14],           // 19
    [0, 11, 12, 13, 4],         // 20
];
var honeyWild = 13, respinWild = 14;
var queenWild = 12;
var strikeWild = 15;
var percentList = {
    freeWinPercent: 50,
    randomSpinPercent: 34,
    honeyRespinPercent: 7,
    wildViewPercent: 12,
    bonusSelectPercent: 12,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (this.randomSpinMode) {
        if (this.RandomSpin(player)) {
            return;
        }
    }

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    this.randomSpinMode = 0;
    this.randomSpinIndex = 0;
    this.freeSpinIndex = 0;

    if (viewCache.type == "FREE") {
        this.randomSpinCache = viewCache.view;
        this.view = this.randomSpinCache[0];
        this.currentGame = "FREE";
    }
    else if (viewCache.mode) {
        this.randomSpinCache = viewCache.view;
        this.randomSpinMode = viewCache.mode;
        this.randomSpinWin = 0;
        this.msrPosArr = [];
        this.view = Util.sameArray(slotWidth * slotHeight, 16);
    } else { //               
        this.view = viewCache.view;

        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winLines = WinLinesFromView(this.view, player.betPerLine);
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    if (this.randomSpinMode && this.randomSpinIndex == 0) {
        this.randomInd = Number(param.ind);
        if (this.randomSpinMode == 5) {
            this.currentGame = "BONUS";
        }
        return;
    }
    //                  
    if (this.randomSpinMode == 2 || this.freeSpinIndex > 0) {
        this.msrAdds = this.strikeList[this.strikeLevel];
        this.msrPosArr = this.msrPosArr.concat(this.msrAdds);

        for (var i = 0; i < this.msrAdds.length; ++i) {
            this.view[this.msrAdds[i]] = this.stackSymbol;
        }

        this.strikeLevel++;

        if (this.strikeLevel == this.strikeList.length) {
            this.winMoney = WinFromView(this.view, player.betPerLine);
            this.winLines = WinLinesFromView(this.view, player.betPerLine);

            if (this.freeSpinIndex > 1) {
                this.freeSpinWinMoney += this.winMoney;

                if (this.freeSpinIndex > this.freeSpinLength) {
                    this.randomSpinMode = 0;
                    this.currentGame = "BASE";
                }
            } else {
                this.moneyBonusWin = this.winMoney;
            }
        }
        return;
    }
    //               
    if (this.freeSpinIndex == 0) {
        this.freeSpinType = Number(param.ind);
        this.FreeSpinInit();
    }
}

SlotMachine.prototype.RandomSpin = function (player) {
    if (this.randomSpinIndex == this.randomSpinCache.length) {
        this.randomSpinMode = 0;
        return false;
    }

    if (this.randomSpinMode == 5) {
        if (this.randomSpinIndex == 0) {
            this.randomSpinIndex++;
            this.view = this.randomSpinCache[0];
            this.freeSpinIndex = 0;
            this.currentGame = "FREE";
            return true;
        }

        return false;
    }

    this.maskView = [];
    this.view = this.randomSpinCache[this.randomSpinIndex++].view;
    this.stackSymbol = this.randomSpinCache[0].msr;
    var msr = this.stackSymbol;
    var isMsr = function (item) { return item == msr };

    if (this.randomSpinMode == 1) {
        this.msrPosArr = Util.positionsFromView(this.view, isWild);
        this.maskView = Util.getMaskView(this.view, 12, isWild);
    }

    if (this.randomSpinMode == 2) {
        this.msrPosArr = Util.positionsFromView(this.view, isMsr);
        this.strikeLevel = 0;
        this.strikeList = this.randomSpinCache[0].addList;
        return true;
    }

    if (this.randomSpinMode == 3) {
        this.msrPosArr = Util.positionsFromView(this.view, isMsr);
        this.maskView = Util.getMaskView(this.view, 12, isMsr);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.randomSpinWin += this.winMoney;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    return true;
}

SlotMachine.prototype.FreeSpinInit = function () {
    this.freeSpinCacheList = this.randomSpinCache[1][this.freeSpinType];
    this.freeSpinIndex = 1;
    this.freeSpinLength = this.freeSpinCacheList.length;
    this.freeSpinLevel = 0;
    this.freeSpinWinMoney = 0;
}

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex - 1];

    this.view = cache.view;
    this.maskView = [];
    this.stackSymbol = cache.msr;
    this.msrPosArr = [];
    var msr = this.stackSymbol;
    var isMsr = function (item) { return item == msr || item == strikeWild };

    if (this.freeSpinType == 0) {
        if (cache.msr) {
            this.msrPosArr = Util.positionsFromView(this.view, isMsr);
            this.strikeLevel = 0;
            this.strikeList = cache.addList;
        }
    } else {
        if (cache.msr) {
            this.maskView = Util.getMaskView(this.view, 12, isMsr);
            this.msrPosArr = Util.positionsFromView(this.view, isMsr);
        }

        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winLines = WinLinesFromView(this.view, player.betPerLine);

        this.freeSpinWinMoney += this.winMoney;
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        if (this.freeSpinType == 0 && cache.msr) {
            return;
        }
        this.randomSpinMode = 0;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {};
    var tmpView, tmpWin = 0;
    //                            [      ] *                                                             ~~                 .

    if (baseWin >= 0) {
        if (baseWin > totalBet * 12 && Util.probability(percentList.randomSpinPercent)) {
            pattern.mode = Util.random(1, 5);

            if (Util.probability(percentList.bonusSelectPercent)) {
                pattern.mode = 5;
            }

            var randomSpinData = RandomSpinViewCache(baseReels, bpl, baseWin, pattern.mode);

            tmpView = randomSpinData.cache;
            tmpWin = randomSpinData.win;
        } else {
            tmpView = RandomWinView(baseReels, bpl, baseWin);
            tmpWin = WinFromView(tmpView, bpl);
        }
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }

    pattern.view = tmpView;
    pattern.win = tmpWin;
    pattern.type = "BASE";
    pattern.bpl = bpl;

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
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin);
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinStore = GenerateFreeSpinStore(bpl, fsWin);

    return {
        win: freeSpinStore.win,
        bpl: bpl,
        view: freeSpinStore.cache,
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
        if (!isFreeSpinWin(view)) {
            break;
        }
    }

    return view;
};

var MsrFromMode = function (mode) {
    switch (mode) {
        case 1:
            if (Util.probability(percentList.honeyRespinPercent)) {
                return respinWild;
            }
            return honeyWild;
        case 3:
            return 3;
        default:
            return Util.random(7, 11);
    }
};

var CountFromMode = function (mode) {
    switch (mode) {
        case 1:
            return Util.random(2, 8);
        case 2:
            return 3;
        case 3:
            return Util.random(7, 9);
        case 4:
            return 5;
    }
};

var GenerateFreeSpinStore = function (bpl, fsWin) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var strikeCache = RandomFreeViewCache(freeReels[0], bpl, fsWin, 0);
    var queenCache = RandomFreeViewCache(freeReels[1], bpl, fsWin, 1);
    var freeSpinStore = [scatterView];
    var win = Util.max(strikeCache.win, queenCache.win);

    freeSpinStore.push([strikeCache.cache, queenCache.cache]);

    return {
        cache: freeSpinStore,
        win: win
    };
};

var RandomSpinViewCache = function (reels, bpl, maxWin, mode, step = 0) {
    if (mode == 5) {
        return GenerateFreeSpinStore(bpl, maxWin);
    }

    var randomSpinData = {};
    var msr = MsrFromMode(mode);
    var changeCount = CountFromMode(mode);
    var tmpView = RandomView(reels);
    var randomPosArr = [];
    //              
    if (mode == 1) {
        randomPosArr = Util.randomPositionArray(slotWidth, slotHeight, changeCount);
    } else if (mode == 2 || mode == 4) {
        randomPosArr = payLines[Util.random(0, payLines.length)];

        while (WinFromView(tmpView, bpl) == 0) {
            tmpView = RandomZeroView(reels, bpl);

            for (var i = 0; i < tmpView.length; ++i) {
                if (tmpView[i] == msr || isWild(tmpView[i])) {
                    tmpView[i] = msr + 1;
                }
            }
        }
    } else if (mode == 3) {
        for (var i = 0; i < 3; ++i) {
            for (var j = 0; j < 3; ++j) {
                randomPosArr.push(i + slotWidth * j);
            }
        }

        Util.shuffle(randomPosArr);
    }

    for (var i = 0; i < changeCount; ++i) {
        tmpView[randomPosArr[i]] = msr;
        // 5                                                       
        // if(mode == 4 && Util.probability(percentList.wildViewPercent)){
        //     tmpView[randomPosArr[i]] = wild;
        // }
    }

    var tmpWin = WinFromView(tmpView, bpl);
    var viewList = [];
    //                                             
    if (mode == 1) {      //                  
        viewList.push({
            msr: msr,
            view: [...tmpView]
        });

        if (msr == respinWild) {  //         
            tmpView = RandomView(reels);

            for (var i = 0; i < changeCount; ++i) {
                tmpView[randomPosArr[i]] = msr;
            }

            tmpWin += WinFromView(tmpView, bpl);

            viewList.push({
                view: [...tmpView]
            });
        }
    } else if (mode == 2) {
        var cache = StrikeViewCache(tmpView, msr, bpl);
        viewList.push(cache);
        tmpWin = cache.win;
    }
    else {
        var cache = {
            view: [...tmpView],
            msr: msr,
        };

        viewList.push(cache);
    }

    randomSpinData.cache = viewList;
    randomSpinData.win = tmpWin;

    if (tmpWin <= maxWin || step > 34) {
        return randomSpinData;
    }

    return RandomSpinViewCache(reels, bpl, maxWin, mode, step + 1);
};

var RandomScatterView = function (reels, bpl) {
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
        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0) {
            break;
        }
    }

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsType = 0) {
    var minMoney = Util.max(fsWin * 0.8, 0);
    var maxMoney = Util.max(fsWin * 1.2, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = {};

        if (fsType == 0) {
            freeSpinData = RandomStrikeViewCache(reels, bpl);
        } else if (fsType == 1) {
            freeSpinData = RandomQueenViewCache(reels, bpl);
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

var StrikeViewCache = function (view, msr, bpl) {
    var tmpView = [...view];

    var randomCountsArr = [];
    var changeCount = Util.positionsFromView(tmpView, function (item) { return item == msr || item == strikeWild }).length;
    var totalCount = Util.random(8, 11);

    var randomPosArr = Util.positionsFromView(tmpView, function (item) { return item != msr && item != strikeWild });
    var addList = [];

    Util.shuffle(randomPosArr);

    while (changeCount < totalCount) {
        var cnt = Util.random(1, 5);

        randomCountsArr.push(cnt);
        changeCount += cnt;
    }

    if (changeCount > totalCount) {
        randomCountsArr[randomCountsArr.length - 1] -= (changeCount - totalCount);
    }

    randomCountsArr.push(0);

    for (var i = 0; i < randomCountsArr.length; ++i) {
        var cnt = randomCountsArr[i];
        var msrAdds = [];

        for (var j = 0; j < cnt; ++j) {
            var pos = randomPosArr.shift();

            tmpView[pos] = msr;
            msrAdds.push(pos);
        }

        addList.push(msrAdds);
    }

    tmpWin = WinFromView(tmpView, bpl);

    return {
        msr: msr,
        addList: addList,
        view: view,
        win: tmpWin
    }
};

var RandomStrikeViewCache = function (reels, bpl) {
    var freeSpinTotalWin = 0;
    var tmpView = [];
    var freeSpinIndex = 1;
    var freeSpinCacheList = [];

    while (freeSpinIndex <= 8) {
        tmpView = RandomZeroView(reels, bpl);

        for (var j = 0; j < 3; ++j) {
            tmpView[2 + j * slotWidth] = strikeWild;
        }

        if (Util.probability(percentList.freeWinPercent)) {
            var line = payLines[Util.random(0, payLines.length)];
            var msr = Util.random(3, 12);

            for (var i = 0; i < 2; ++i) {
                tmpView[line[i]] = msr;
            }

            var cache = StrikeViewCache(tmpView, msr, bpl);

            freeSpinCacheList.push(cache);
            freeSpinTotalWin += cache.win;
        } else if (WinFromView(tmpView, bpl) == 0) {
            freeSpinCacheList.push({
                view: tmpView
            });
        } else {
            continue;
        }


        freeSpinIndex++;
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
    }
};

var RandomQueenViewCache = function (reels, bpl) {
    var freeSpinTotalWin = 0;
    var tmpView = [];
    var freeSpinIndex = 1;
    var freeSpinCacheList = [];

    while (freeSpinIndex <= 5) {
        tmpView = RandomView(reels);

        var cache = {};

        if (Util.probability(percentList.bigSymbolPercent)) {
            cache.msr = Util.random(3, 13);

            var size = Util.random(2, 4);
            var si = Util.random(0, 6 - size);
            var sj = Util.random(0, 5 - size);

            for (var i = 0; i < size; ++i) {
                for (var j = 0; j < size; ++j) {
                    if (si + i < slotWidth && sj + j < slotHeight) {
                        tmpView[si + i + slotWidth * (sj + j)] = cache.msr;
                    }
                }
            }
        }

        cache.view = tmpView;
        freeSpinCacheList.push(cache);
        freeSpinTotalWin += WinFromView(tmpView, bpl);
        freeSpinIndex++;
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
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
    return symbol == wild || symbol == honeyWild || symbol == respinWild || symbol == queenWild || symbol == strikeWild;
};

var isFreeSpinWin = function (view) {
    return Util.count(view, scatter) >= 3;
}

module.exports = SlotMachine;