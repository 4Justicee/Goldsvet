var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus == "NOTUMBLE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.moneyCache = {};
    this.topView = [];
    this.boxView = [];
    this.topTumble = "";
    this.boxTumble = "";
    this.topLineAbove = 12;
    //          
    this.tumbleIndex = 0;
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    //                           
    this.moneyBonusCacheList = [];
    this.moneyBonusCache = {};
    this.moneyBonusIndex = 0;
    this.moneyBonusWin = 0;
    this.moneySpecialCount = 0;

    this.doubleMulti = 0.25;
    this.buyMulti = 100;
    this.buyPatternCount = 30;
    //             
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];   //FREE, BONUS, TUMBLE
};

var wild = 2;
var empty = 13;   //                      
var slotWidth = 6, slotHeight = 8;
var winLines = [];
var tumblingPositions = [];
var moneyValueList = [20, 40, 60, 80, 100, 120, 140, 160, 200, 300, 400, 500, 1000];
var topReels = [12, 12, 12, 12, 6, 3, 10, 5, 9, 2, 8, 7, 4, 11, 7, 2, 8, 4, 2, 7, 4, 7, 8, 2, 11, 8, 7, 6, 10, 4, 7, 3, 11, 4, 3, 7, 5, 11, 2, 4, 6, 2, 11, 2, 8, 6, 11, 4, 7, 2, 3, 7];
var moneySymbol = 1, emptySymbol = 14, lockedSymbol = 15;    //                       
var moneyMultiArray = [2, 3, 5];
var moneyBonusLength = 3;
var percentList = {
    moneyHighPercent: 22,
    moneyAddPercent: 22,
    specialAppearPercenet: 34,
    reelUnlockPercent: 22,
    reelExtendPercent: 22,
    reelCollectPercent: 34,
    moneyMultiPercent: 22
};
var baseReels = [
    [12, 8, 8, 8, 8, 6, 5, 10, 6, 6, 6, 9, 3, 7, 7, 7, 4, 10, 10, 10, 11, 11, 11, 11, 7, 3, 3, 3, 5, 5, 5, 4, 4, 4, 9, 9, 9, 12, 12, 12, 8, 4, 10, 7, 4, 3, 7, 4, 8, 7, 3, 4, 6, 11, 7, 8, 5, 9, 7, 9, 4, 7, 9, 3, 6, 4, 3, 8, 3, 7, 8, 10, 5, 3, 4, 11, 4, 10, 8, 5, 7, 4, 10, 7, 9, 8, 5, 9, 10, 7, 9, 7, 8, 4, 3, 9, 5, 3, 5, 8, 3, 4, 9, 7, 5, 4, 10, 5, 6, 9, 5, 7, 4, 8, 7, 8, 10, 6, 5, 8, 3, 9, 7, 3, 4, 11, 3, 6, 8, 7, 3, 7, 4, 7, 9, 3, 4, 7, 5, 10, 8, 9, 8, 10, 4, 8, 10, 3, 7, 8, 3, 10, 7, 8, 7, 8, 11, 8, 3, 8, 3, 11, 4, 5, 7, 10, 3, 4, 7, 8, 4, 6, 9, 8, 10, 7, 3, 6, 7, 8, 9, 5, 8, 4, 10, 5, 3, 7, 6, 8, 9, 10, 4, 8, 5, 7, 9, 7, 5, 8, 7, 9, 3, 10, 4, 11, 7, 10, 8, 3, 8, 4, 7, 3, 8, 5, 11, 9, 8, 4, 8, 9, 3, 5, 9, 3, 8, 11, 7, 10, 5, 7, 9, 3, 9, 10, 8, 11, 8, 5, 3, 7, 8, 7, 3, 10, 4, 8, 10, 6, 9, 8, 9, 5, 3, 7, 4, 6, 7, 5, 8, 9, 11, 10, 11, 10, 8, 9, 5, 3, 9, 7, 3, 11, 8, 10, 7, 9, 3, 8, 5, 4, 3, 8, 7, 8, 9, 4, 9, 11, 3, 7, 3, 4, 5, 9, 3, 5, 3, 6, 11, 9, 3, 7, 9, 5],
    [2, 3, 3, 3, 11, 10, 6, 10, 10, 10, 12, 1, 7, 7, 7, 4, 8, 8, 8, 7, 5, 6, 6, 6, 8, 9, 3, 5, 5, 5, 11, 11, 11, 1, 1, 1, 4, 4, 4, 12, 12, 12, 9, 9, 9, 7, 11, 4, 12, 8, 6, 12, 3, 12, 9, 6, 7, 3, 12, 1, 7, 9, 7, 9, 11, 7, 9, 8, 4, 5, 4, 7, 9],
    [5, 7, 8, 9, 6, 10, 10, 10, 12, 11, 1, 1, 1, 10, 2, 4, 3, 1, 6, 6, 6, 4, 4, 4, 9, 9, 9, 8, 8, 8, 12, 12, 12, 5, 5, 5, 3, 3, 3, 11, 11, 11, 7, 7, 7, 9, 10, 11, 10, 11, 10, 9, 3, 4, 11, 10, 3, 11, 9, 4, 6, 9, 3, 11, 1, 10, 1, 7, 6, 9, 3, 1, 11, 4, 10, 1, 11, 9, 1, 11, 6, 11, 7, 8, 1, 11, 10, 11, 3, 11, 8, 1, 3, 11, 7, 9, 11, 1, 10, 7, 1, 9, 10, 3, 9, 11, 3, 7, 11, 4, 3, 9, 11, 3, 4, 7, 6, 8, 9, 11, 8, 10, 3, 9, 7, 4, 9, 4, 7, 6, 11, 2, 4, 10, 1, 3, 11, 4, 10, 1, 12, 7, 10, 3, 9, 8, 11, 10, 3, 8, 9, 12, 3, 12, 1, 3, 10, 4, 8, 3, 9, 1, 7, 10, 4, 3, 11, 8, 10, 11, 3, 8, 9, 3, 10, 1, 3, 9, 11, 4, 10, 7, 10, 11, 9, 1, 6, 3, 10, 1, 4, 3, 7, 1, 12, 1, 8, 11, 3, 4, 7, 10, 2, 9, 1, 3, 7, 3, 12, 1, 3, 7, 3, 11, 3, 1, 11, 7, 8, 7, 3, 11, 3, 8, 1, 11, 12, 9, 3, 8, 11, 3, 7, 9, 7, 8, 7, 10, 9, 2, 4, 11, 9, 1, 3, 9, 3, 11, 12, 7, 3, 11, 1, 4, 12, 11, 7, 1, 8, 6, 4, 9, 4, 7, 10, 11, 4, 1, 6, 10, 1, 3, 6, 3, 12, 3, 12, 3, 6, 2, 3, 1, 7, 3, 1, 3, 1, 11, 1, 11, 8, 4, 11, 4, 1, 10, 1, 2, 11, 3, 4, 3, 7, 10, 8, 12, 1, 7, 10, 1, 12, 9, 4, 10, 11, 8, 4, 11, 10, 3, 4, 9, 7, 3, 11, 7, 10],
    [7, 3, 3, 3, 8, 11, 4, 7, 7, 7, 5, 12, 12, 12, 9, 11, 11, 11, 6, 1, 1, 1, 1, 2, 4, 4, 4, 10, 3, 8, 8, 8, 12, 10, 10, 10, 6, 6, 6, 9, 9, 9, 5, 5, 5, 12, 11, 3, 11, 2, 4, 1, 6, 3, 11, 2, 5, 3, 10, 11, 1, 6, 11, 9, 11, 5, 12, 5, 11, 2, 8, 4, 8, 5, 12, 3, 9],
    [6, 7, 12, 4, 12, 12, 12, 2, 5, 10, 7, 7, 7, 1, 5, 5, 5, 9, 11, 9, 9, 9, 8, 6, 6, 6, 3, 4, 4, 4, 11, 11, 11, 1, 1, 1, 3, 3, 3, 8, 8, 8, 10, 10, 10, 4, 11, 1, 11, 4, 8, 5, 11, 5, 12, 3, 2, 10, 4, 8, 9, 10, 5, 3, 4, 9, 11, 12, 9, 10, 5, 9, 11, 4, 9, 5, 12, 10, 1, 4, 7, 12, 11, 3, 4, 10, 9, 11, 10, 11, 5, 2, 11, 1, 11, 4, 9, 11, 12, 11, 5, 11, 2, 3, 1, 8, 3, 10, 3, 10, 5, 9, 5, 4, 12, 1, 8, 11, 4, 1, 12, 8, 12, 4, 10, 4, 11, 2, 12, 9, 8, 5, 1, 5, 4, 1, 5, 7, 10, 1, 3, 11, 4, 11, 10, 9, 2, 9, 1, 4, 1, 4, 12, 11, 2, 7, 3, 4, 9, 10, 4, 9, 5, 8, 11, 10, 4, 10, 12, 11, 10, 1, 12, 4, 2, 11, 2, 4, 1, 4, 5, 11, 4, 5, 11, 10, 9, 8, 11, 10, 4, 11, 3, 1, 9, 12, 5, 10, 11, 3, 11, 2, 9, 5, 4, 8, 10, 2, 8, 5, 9, 4, 8, 11, 5, 3, 9, 8, 4, 10, 3, 11, 8, 4, 12, 5, 7, 4, 10, 9, 11, 8, 4, 5, 8, 12, 4, 1, 4, 3, 11, 3, 4, 9, 11, 4, 11, 9, 11, 1, 5, 4, 12, 1, 11, 1, 12, 11, 8, 2, 4, 11, 3, 4, 1, 9, 4, 11, 3, 11, 4, 1, 5, 4, 12, 3, 12, 9, 4, 2, 4, 11, 9, 7, 1, 3, 4, 11, 7, 11, 9, 11, 9, 3, 10, 11, 5, 11, 5, 10, 9, 2, 1, 4, 11, 9, 2, 10, 12, 10, 1, 9, 7, 11, 10, 5, 4, 7, 8, 3],
    [11, 11, 11, 8, 3, 3, 3, 5, 6, 6, 6, 9, 6, 9, 9, 9, 7, 10, 10, 10, 4, 4, 4, 4, 3, 12, 11, 7, 7, 7, 10, 5, 5, 5, 8, 8, 8, 12, 12, 12, 6, 5, 12, 6, 12, 6, 7, 12, 5, 10, 12, 8, 3, 12, 10, 9, 12, 10, 6, 9, 10, 12, 8, 6, 9, 5, 6, 4, 8, 10, 7, 5, 7, 10, 5, 8, 3, 10, 9, 8, 10, 12, 5, 3, 10, 12, 7, 10, 8, 5, 3, 8, 12, 8, 6, 10, 6, 7, 9, 5, 3, 10, 5, 3, 8, 12]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 10, 6, 6, 4, 4, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 25, 15, 10, 10, 6, 6, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 25, 15, 15, 10, 10, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 125, 75, 30, 30, 20, 20, 15, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        this.view = this.tumbleCacheList[0];
        this.moneyCache = RandomMoneySymbols(this.view);
    } else if (viewCache.type == "BONUS") {
        this.moneyBonusCacheList = viewCache.view;
        var cache = this.moneyBonusCacheList[0];

        this.view = cache.view;
        this.moneyCache = {
            table: GetTableFromValues(cache.values),
            values: cache.values
        };
        this.moneyBonusIndex = 1;
        this.moneyBonusTotal = 0;
        this.moneyBonusWin = 0;
        this.moneySpecialCount = 0;
        this.currentGame = "BONUS";
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    var topTumblePositions = [], boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);
    this.topLineAbove = Util.random(wild, empty);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

};

SlotMachine.prototype.Tumbling = function (player) {
    this.view = this.tumbleCacheList[this.tumbleIndex];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    var topTumblePositions = [], boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);

    this.tmb_res += this.winMoney;
    this.topLineAbove = Util.random(wild, empty);

    this.tumbleIndex++;

    //                 
    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.BonusSpin = function (player) {
    var cache = this.moneyBonusCacheList[this.moneyBonusIndex];
    this.moneyBonusCache = cache;

    this.view = cache.view;
    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    this.moneySpecialCount += Util.positionsFromView(this.topView, function (item) { return item != 14 }).length;
    this.moneyCache = {
        table: GetTableFromValues(cache.values),
        values: cache.values
    }
    this.moneyBonusTotal = cache.values.reduce((total, value) => total + value, 0) * player.betPerLine;

    for (var i = 1; i < slotWidth - 1; ++i) {
        if (this.view[i] == 19) {
            for (var j = 1; j < slotHeight; ++j) {
                this.winMoney += cache.values[i + j * slotWidth] * player.betPerLine;
            }

            this.moneyBonusWin += this.winMoney;
        }
    }

    this.moneyBonusIndex++;

    if (this.moneyBonusIndex >= this.moneyBonusCacheList.length) {
        this.winMoney = this.moneyBonusTotal;
        this.moneyBonusWin += this.winMoney;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin);
    }
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var moneyBonusData = RandomBonusViewCache(baseReels, bpl, bsWin);

    var pattern = {
        view: moneyBonusData.cache,
        bpl: bpl,
        win: moneyBonusData.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
}

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var bsCache = BuyBonusViewCache(baseReels, bpl, 1);

    return {
        win: bsCache.win,
        bpl: bpl,
        view: bsCache.cache,
        type: "BONUS",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0, calcCount = 0;
    while (true) {
        var tumbleWinMoney = 0;
        var view = RandomView(reels);
        var tumbleWinMoney = WinFromView(view, bpl);

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
        if (tumbleWinMoney == 0) {
            continue;
        }

        var viewList = [view];

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumblingPositions);
            var newView = GetTumbleView(lastView, lastTumbling);
            if (isBonusSpinWin(newView)) {
                continue;
            }

            var nWinMoney = WinFromView(newView, bpl);
            viewList.push(newView);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin && NumberOfMoneySymbols(viewList[0]) == 0) {
            return { viewList, tumbleWinMoney };
        }

    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var winMoney = WinFromView(view, bpl);
        if (winMoney == 0) {
            var viewList = [];
            viewList.push(view);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
        }
    }
};

var RandomView = function (reels, reelSizes = []) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(2, slotHeight) + 1;
            if (reelSizes.length > 0) {
                reelSize = reelSizes[i];
            }

            for (var j = 0; j < reelSize; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                randomView[viewPos] = reels[i][reelPos];
            }
            for (var j = reelSize; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                randomView[viewPos] = empty;
            }
        }

        var topIndex = Util.random(0, topReels.length);
        for (var i = 0; i < slotWidth; i++) {
            randomView[i] = topReels[(topIndex + i) % topReels.length];
        }

        randomView[0] = empty;
        randomView[slotWidth - 1] = empty;


        if (!isBonusSpinWin(randomView)) {
            break;
        }
    }

    return randomView;
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
        var moneyBonusData = BuyBonusViewCache(reels, bpl);

        if (moneyBonusData.win >= minMoney && moneyBonusData.win <= maxMoney) {
            return moneyBonusData;
        }

        if (moneyBonusData.win > lowerLimit && moneyBonusData.win < minMoney) {
            lowerLimit = moneyBonusData.win;
            lowerView = moneyBonusData;
        }
        if (moneyBonusData.win > maxMoney && moneyBonusData.win < upperLimit) {
            upperLimit = moneyBonusData.win;
            upperView = moneyBonusData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var BuyBonusViewCache = function (reels, bpl, isBuy = 0) {
    var moneyBonusCacheList = []; //                
    var moneyBonusIndex = 1; //                                    
    var moneyBonusWin = 0;

    var totalMulti = 0;
    var tmpView = [];
    var values = DefaultMoneyCache().values; //                  


    while (true) {
        tmpView = RandomView(reels);
        if (WinFromView(tmpView, bpl) == 0 && NumberOfMoneySymbols(tmpView) == 0) {
            break;
        }
    }

    var randomPosArray = [];

    for (var i = 1; i < slotWidth - 1; ++i) {
        for (var j = 1; j < slotHeight; ++j) {
            var pos = i + slotWidth * j;
            if (tmpView[pos] != empty) {
                randomPosArray.push(pos);
            }
        }
    }

    Util.shuffle(randomPosArray);

    var pos = 0; //randomPosArray[i], multied                                               
    var moneyAddCount = 0;

    moneyWinCount = Util.random(6, 8);

    for (var i = 0; i < moneyWinCount; i++) {
        pos = randomPosArray.shift();
        tmpView[pos] = moneySymbol;
        values[pos] = moneyValueList[Util.random(0, moneyValueList.length / 3)];
    }

    moneyBonusCacheList.push({
        count: 0,
        view: [...tmpView],
        values: [...values],
    })
    var lockStatus = [1, 1];
    var extendStatus = [0, 0, 0, 0, 0, 0];
    //                              1,6             
    for (j = 1; j < slotHeight; ++j) {
        if (tmpView[j * slotWidth] != empty) {
            tmpView[j * slotWidth] = lockedSymbol;
        }
        if (tmpView[slotWidth - 1 + j * slotWidth] != empty) {
            tmpView[slotWidth - 1 + j * slotWidth] = lockedSymbol;
        }
    }
    //                                                            
    for (var i = 1; i < slotWidth - 1; ++i) {
        for (var j = 1; j < slotHeight; ++j) {
            var pos = i + slotWidth * j;
            if (tmpView[pos] != empty && tmpView[pos] != moneySymbol) {
                tmpView[pos] = emptySymbol;
            }
        }
    }

    while (moneyBonusIndex <= moneyBonusLength) {
        moneyBonusIndex++;
        //                              
        var randomTopPosArray = [];

        for (var i = 1; i < slotWidth - 1; ++i) {
            values[i] = 0;
            tmpView[i] = emptySymbol;
            randomTopPosArray.push(i);
        }

        Util.shuffle(randomTopPosArray);

        if (Util.probability(percentList.moneyAddPercent) && randomPosArray.length > 1) {
            ++moneyAddCount;
            moneyBonusIndex = 1;        //                                             

            pos = randomPosArray.shift();
            values[pos] = RandomMoneyFromArr(moneyValueList);
            tmpView[pos] = moneySymbol;
        }
        if (Util.probability(percentList.specialAppearPercenet)) {
            if (Util.probability(percentList.reelUnlockPercent)) {
                var special = Util.random(16, 18);

                if (lockStatus[special - 16]) {
                    pos = randomTopPosArray.shift();

                    tmpView[pos] = special;
                    lockStatus[special - 16] = 0;
                    moneyBonusIndex = 1;

                    for (var j = 1; j < slotHeight; ++j) {
                        var viewPos = j * slotWidth + (special - 16) * (slotWidth - 1);

                        if (tmpView[viewPos] == lockedSymbol) {
                            tmpView[viewPos] = emptySymbol;
                            randomPosArray.push(viewPos);
                        }
                    }

                    Util.shuffle(randomPosArray);
                }
            }
            if (Util.probability(percentList.reelExtendPercent)) {
                pos = randomTopPosArray.shift();

                if (extendStatus[pos] == 0) {
                    tmpView[pos] = 18;
                    extendStatus[pos] = 1;
                    moneyBonusIndex = 1;

                    for (var j = 1; j < slotHeight; ++j) {
                        var viewPos = j * slotWidth + pos;

                        if (tmpView[viewPos] == empty) {
                            tmpView[viewPos] = emptySymbol;
                            randomPosArray.push(viewPos);
                        }
                    }

                    Util.shuffle(randomPosArray);
                }
            }

            pos = randomTopPosArray.shift();
            var count = 0;

            for (j = 1; j < slotHeight; ++j) {
                var viewPos = pos + j * slotWidth;
                if (isMoney(tmpView[viewPos])) {
                    ++count;
                    break;
                }
            }
            if (count) {
                if (Util.probability(percentList.reelCollectPercent)) {
                    tmpView[pos] = 19;
                    moneyBonusIndex = 1;

                    for (var j = 1; j < slotHeight; ++j) {
                        moneyBonusWin += values[j * slotWidth + pos] * bpl;
                    }
                } else if (Util.probability(percentList.moneyMultiPercent)) {
                    tmpView[pos] = 21;
                    values[pos] = moneyMultiArray[Util.random(0, moneyMultiArray.length)];
                    moneyBonusIndex = 1;

                    for (j = 1; j < slotHeight; ++j) {
                        values[pos + j * slotWidth] *= values[pos];
                    }
                }
            }
        }

        moneyBonusCacheList.push({
            count: moneyBonusIndex,
            view: [...tmpView],
            values: [...values]
        });
    }

    moneyBonusWin += values.reduce((total, value) => total + value, 0) * bpl;

    return {
        win: moneyBonusWin,
        cache: moneyBonusCacheList
    };
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
    winLines = [];
    tumblingPositions = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (view[pos] == empty) {
            continue;
        }
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    //                           ,                                               
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId];
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                if (tumblingPositions.indexOf(history[i]) < 0) {
                    tumblingPositions.push(history[i]);
                }
            }
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId];
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                if (tumblingPositions.indexOf(history[i]) < 0) {
                    tumblingPositions.push(history[i]);
                }
            }
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var GetTumbles = function (view, positions) {
    var tumbles = [];
    for (var i = 0; i < positions.length; i++) {
        var tumblePos = positions[i];
        if (tumblePos < 0 || tumblePos >= view.length) {
            continue;
        }
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    if (tumbles.length == 0) {
        return "";
    }
    return tumbles.join('~');
};

var GetTumbleView = function (view, tumbles) {
    while (true) {
        var tumbleView = Util.clone(view);

        //                                
        for (var i = slotWidth - 1; i >= 1; i--) {
            //                                    
            if (tumbles.indexOf(i) >= 0 && tumbleView[i] != empty) {
                for (var j = i + 1; j < slotWidth - 1; j++) {
                    tumbleView[j - 1] = tumbleView[j];
                }
                tumbleView[slotWidth - 2] = -1;
            }
        }

        //                                             
        for (var i = 0; i < slotWidth; i++) {
            //                                         
            for (var j = 1; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                if (view[pos] == empty) {
                    break;
                }
                //                                    
                if (tumbles.indexOf(pos) >= 0 && tumbleView[pos] != empty) {
                    for (var k = j - 1; k >= 1; k--) {
                        tumbleView[i + (k + 1) * slotWidth] = tumbleView[i + k * slotWidth];
                    }
                    tumbleView[i + slotWidth] = -1;
                }
            }
        }

        var reelSizes = [8, 8, 8, 8, 8, 8];
        var randomView = RandomView(baseReels, reelSizes);

        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
                if (tumbleView[i] == moneySymbol) {
                    tumbleView[i] = Util.random(3, 13);
                }
            }
        }

        tumbleView[0] = empty;
        tumbleView[slotWidth - 1] = empty;

        var otherView = false;
        for (var i = 0; i < tumbleView.length; i++) {
            if (view[i] != tumbleView[i]) {
                otherView = true;
                break;
            }
        }

        if (otherView) {
            return tumbleView;
        }
    }
};

var isWild = function (symbol) {
    return symbol == wild;
}

var DefaultMoneyCache = function () {
    var moneyValues = [];
    var moneyTable = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyValues[i] = 0;
        moneyTable[i] = "r";
    }

    var result = {
        values: moneyValues,
        table: moneyTable,
    };
    return result;
};


var isMoney = function (symbol) {
    return symbol == moneySymbol;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;

    for (var i = 0; i < view.length; i++) {
        if (isMoney(view[i])) {
            result++;
        }
    }

    return result;
};

var isBonusSpinWin = function (view) {
    return NumberOfMoneySymbols(view) >= 6;
};

var RandomMoneyFromArr = function (moneyValueList, isBonus = 1) {
    var value = moneyValueList[0];
    if (Util.probability(percentList.moneyHighPercent) && isBonus) {
        value = moneyValueList[Util.random(0, moneyValueList.length / 2)];
    } else {
        value = moneyValueList[Util.random(0, moneyValueList.length / 3)];
    }
    return value;
}

//                             
var RandomMoneySymbols = function (view) {
    var values = [];
    for (var i = 0; i < view.length; i++) {
        if (!isMoney(view[i])) {
            values[i] = 0;
            continue;
        }
        values[i] = RandomMoneyFromArr(moneyValueList, 0);
    }

    var table = GetTableFromValues(values);
    return { table, values };
};

var GetTableFromValues = function (values) {
    var table = [];
    for (var i = 0; i < values.length; i++) {
        table[i] = tableFromValue(values[i])
    }
    return table;
};

var tableFromValue = function (value) {
    switch (Number(value)) {
        case 5:
        case 3:
        case 2: return "m";
        case 0: return "r";
    }
    return "v";
}

module.exports = SlotMachine;