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
    this.topView = [];
    this.boxView = [];
    this.topTumble = "";
    this.boxTumble = "";
    this.topLineAbove = 12;
    //          
    this.tumbleIndex = 0;
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    this.tumbleMulti = 1;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinStartMulti = 1;
    this.freeSpinRandomMode = {};
    this.freeSpinSelect = [];
    this.freeSpinData;

    this.buyMulti = 100;
    this.buyPatternCount = 30;
    this.doubleMulti = 0.25;
    //             
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2;
var empty = 14, slotWidth = 6, slotHeight = 8;
var winMulti = 1;
var winLines = [];
var tumblingPositions = [];
var baseReels = [
    [12, 11, 6, 8, 9, 7, 1, 12, 4, 5, 7, 8, 5, 9, 7, 11, 12, 12, 12, 6, 12, 11, 11, 10, 9, 7, 12, 8, 12, 6, 10, 6, 10, 10, 4, 8, 6, 6, 7, 8, 6, 12, 6, 4, 7, 6, 5, 7, 6, 6, 6, 12, 12, 5, 10, 8, 8, 8, 12, 12, 11, 11, 5, 11, 5, 9, 5, 5, 1, 6, 12, 8, 12, 8, 9, 9, 5, 12, 11, 5, 5, 10, 5, 10, 12, 10, 9, 11, 12, 5, 9, 8, 5, 12, 4, 6, 12, 6, 11, 8, 9, 5, 12, 8, 9, 3, 8, 11, 11, 6, 9, 11, 8, 8, 6, 6, 9, 3, 8, 3, 4, 6, 12, 8, 11, 6, 6, 11, 6, 12, 12, 5, 5, 5, 5, 7, 8, 3, 8, 8, 4, 7, 1, 9, 7, 12, 5, 10, 9, 6, 9, 7, 3, 3, 4, 6, 8, 10, 5, 10, 8, 7, 5, 9, 9, 9, 8, 7, 7, 8, 7, 8, 8, 10, 7, 5],
    [3, 3, 9, 5, 1, 4, 4, 5, 10, 7, 7, 12, 5, 12, 4, 3, 7, 7, 12, 8, 10, 11, 7, 11, 4, 4, 10, 9, 6, 4, 1, 7, 7, 7, 5, 5, 8, 7, 7, 7, 10, 5, 4, 12, 11, 10, 8, 5, 10, 7, 3, 7, 7, 8, 10, 10, 10, 4, 9, 5, 1, 11, 11, 11, 11, 11, 4, 10, 6, 5, 9, 9, 5, 8, 9, 8, 11, 11, 10, 7, 6, 4, 10, 7, 7, 10, 10, 1, 5, 11, 11, 4, 4, 10, 7, 7, 10, 10, 10, 7, 7, 10, 10, 6, 9, 3, 9, 6, 10, 10, 10, 6, 12, 1, 5, 7, 5, 9, 5, 12, 4, 9, 5, 10, 9, 4, 10, 11, 11, 12, 12, 7, 6, 11, 9, 10, 7, 9, 10, 11, 10, 7, 9, 9, 4, 3, 5, 1, 7, 11, 6, 9, 4, 6, 4, 10, 10, 4, 7, 10, 12, 4, 10, 11, 5, 7, 5, 8, 3, 10, 6],
    [11, 3, 10, 4, 4, 10, 8, 9, 10, 1, 9, 7, 11, 6, 9, 10, 10, 10, 11, 11, 7, 4, 11, 12, 11, 5, 11, 11, 1, 11, 11, 12, 5, 7, 7, 6, 10, 5, 9, 10, 3, 5, 4, 6, 5, 8, 8, 12, 9, 12, 1, 8, 3, 4, 6, 8, 4, 5, 10, 8, 9, 9, 8, 11, 10, 8, 4, 9, 8, 11, 6, 8, 5, 6, 9, 9, 9, 1, 9, 9, 9, 7, 7, 7, 10, 4, 6, 12, 11, 9, 9, 7, 7, 6, 9, 7, 1, 11, 11, 11, 11, 6, 4, 4, 11, 11, 8, 4, 4, 6, 4, 8, 6, 5, 8, 8, 12, 3, 1, 4, 12, 4, 6, 9, 6, 7, 7, 12, 11, 6, 5, 5, 4, 12, 3, 6, 5, 3, 1, 4, 6, 9, 6, 6, 6, 6, 6, 7, 11, 12, 12, 11, 11, 11, 9, 8, 12, 12, 9, 10, 1, 9, 12, 12, 5, 7, 4, 10, 10, 4, 4, 6, 12, 1],
    [3, 3, 3, 12, 8, 7, 6, 9, 12, 12, 7, 7, 12, 7, 8, 9, 10, 10, 4, 12, 12, 12, 4, 4, 11, 11, 11, 8, 12, 8, 8, 4, 10, 7, 1, 10, 10, 7, 10, 3, 8, 11, 11, 12, 9, 10, 9, 10, 7, 9, 4, 9, 10, 9, 12, 7, 3, 8, 7, 6, 9, 12, 4, 5, 6, 10, 10, 10, 10, 10, 11, 9, 11, 12, 12, 12, 12, 6, 7, 1, 8, 8, 8, 8, 8, 8, 8, 11, 12, 12, 9, 9, 4, 5, 12, 10, 5, 5, 11, 7, 8, 5, 9, 4, 5, 11, 10, 6, 12, 12, 7, 4, 10, 5, 11, 12, 8, 8, 8, 5, 12, 12, 1, 12, 8, 8, 5, 3, 5, 8, 3, 7, 10, 11, 9, 9, 9, 6, 7, 3, 6, 9, 4, 10, 10, 12, 11, 9, 11, 11, 8, 8, 8, 4, 3, 12, 7, 1, 9, 4, 9, 8, 8, 9, 9, 8, 8, 8, 6, 7, 7, 7],
    [3, 3, 5, 5, 9, 10, 1, 7, 7, 9, 3, 5, 12, 10, 6, 8, 4, 12, 5, 9, 6, 7, 11, 7, 8, 12, 10, 7, 8, 10, 6, 7, 8, 11, 3, 7, 6, 7, 12, 1, 10, 8, 8, 4, 11, 10, 10, 4, 11, 11, 12, 5, 7, 6, 9, 12, 5, 9, 9, 3, 3, 12, 6, 11, 9, 3, 6, 11, 10, 1, 9, 11, 3, 11, 12, 11, 5, 4, 8, 4, 6, 10, 12, 5, 9, 3, 11, 3, 4, 7, 6, 8, 4, 12, 4, 7, 9, 5, 10, 9, 8, 1, 11, 12, 7, 9, 4, 11, 12, 11, 10, 10, 6, 7, 5, 4, 7, 6, 8, 3, 7, 12, 7, 5, 12, 10, 12, 6, 12, 12, 11, 1, 5, 12, 9, 10, 9, 8, 10, 9, 5, 11, 8, 8, 4, 7, 3, 8, 9, 6, 7, 6, 5, 9, 6, 8, 12, 7, 10, 11, 8, 6, 11, 3, 4, 3, 11, 9, 12, 11, 11, 5],
    [3, 9, 12, 4, 10, 9, 12, 9, 12, 8, 5, 7, 6, 6, 7, 8, 6, 8, 5, 12, 5, 7, 9, 8, 12, 10, 5, 6, 11, 4, 10, 7, 11, 11, 6, 7, 7, 10, 5, 6, 10, 5, 7, 9, 10, 12, 6, 8, 6, 10, 1, 12, 11, 10, 12, 6, 12, 5, 12, 6, 4, 11, 12, 6, 6, 10, 8, 7, 10, 12, 5, 12, 9, 4, 7, 12, 6, 6, 6, 8, 9, 12, 4, 6, 11, 5, 7, 5, 7, 10, 6, 8, 5, 8, 11, 5, 9, 3, 9, 12, 3, 11, 12, 12, 5, 12, 11, 9, 3, 3, 3, 10, 12, 12, 7, 11, 8, 8, 11, 12, 12, 7, 7, 12, 5, 6, 6, 11, 12, 12, 12, 11, 10, 4, 10, 12, 1, 7, 12, 8, 12, 12, 8, 7, 7, 3, 4, 10, 8, 4, 4, 12, 5, 12, 9, 11, 9, 4, 10, 3, 3, 8, 4, 10, 7, 10, 4, 11, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 20, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0],
    [0, 0, 0, 200, 40, 10, 10, 8, 8, 8, 4, 4, 4, 0, 0],
    [0, 0, 0, 500, 50, 20, 16, 12, 12, 12, 8, 8, 8, 0, 0],
    [0, 0, 0, 1000, 100, 50, 40, 30, 30, 30, 20, 20, 20, 0, 0]
];
var topReels = [8, 11, 12, 5, 10, 9, 7, 10, 10, 9, 6, 3, 2, 12, 5, 9, 12, 11, 10, 11, 11, 11, 10, 2, 11, 10, 12, 4, 12, 8, 11, 10, 8, 8, 6, 10, 12, 8, 9, 3, 5, 12, 3, 9, 12, 2, 9, 7, 8, 6, 11, 10, 12, 8, 9, 9, 3, 8, 11, 11, 5, 3, 8, 12, 11, 9, 4, 11, 11, 12, 3, 9, 11, 10, 8, 10, 12, 7, 8, 9, 2, 11, 8, 11, 3, 8, 12, 8, 3, 3, 9, 8, 12, 2, 7, 10, 7, 12, 2, 12, 11, 3, 3, 7, 7, 12, 3, 12, 9, 11, 10, 11, 8, 2, 7, 3, 11, 7, 10, 12, 5, 11, 2, 10, 12, 6, 7, 3, 12, 11, 9, 8, 6, 7, 12, 11, 8, 2, 12, 10, 12, 3, 3, 10, 11, 4, 4, 11, 10, 11, 11, 5, 8, 12, 10, 12, 5, 2, 9, 7, 11, 9, 8, 7, 8, 6];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 25; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

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

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        this.view = this.tumbleCacheList[0];
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.view = cache.scatterView;
        this.freeSpinData = cache.cache;
        this.freeSpinSelect = cache.selectMode;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    winMulti = 1;
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
        this.tumbleMulti = 1;
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 0;
        this.freeSpinWinMoney = 0;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.Tumbling = function (player, isFreeSpin = false) {
    this.view = this.tumbleCacheList[this.tumbleIndex];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isFreeSpin) {
        this.tumbleMulti++;
        winMulti = this.tumbleMulti;
    }

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

SlotMachine.prototype.FreeSpinOption = function (player, select) {
    this.freeSpinType = Number(select);
    this.freeSpinLength = this.freeSpinSelect[this.freeSpinType].count;
    this.freeSpinStartMulti = this.freeSpinSelect[this.freeSpinType].multi;
    this.tumbleMulti = this.freeSpinStartMulti;
    this.freeSpinCacheList = this.freeSpinData[this.freeSpinType];
    console.log(`             : ${this.tumbleMulti} /              ${this.freeSpinLength}   `);
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player, true);

        if (this.tumbleStatus == "NOTUMBLE") {
            this.freeSpinWinMoney += this.tmb_res;

            if (this.freeSpinIndex >= this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }

        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = this.tumbleCacheList[0];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    winMulti = this.tumbleMulti;
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

    this.freeSpinIndex++;
    if (this.freeSpinIndex >= this.freeSpinLength && this.winMoney == 0) {
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

    winMulti = 1;
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
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinData = {};
    freeSpinData.scatterView = scatterView;
    freeSpinData.cache = [];
    freeSpinData.selectMode = [];
    var freeSpinDataWin = 0;

    var freeSpinSelect = [];
    for (var i = 0; i < 3; i++) {
        var selectMode = {
            count: FreeSpinCountsFromView(scatterView, i),
            multi: FreeSpinMultiByType(i)
        };
        freeSpinSelect.push(selectMode);
    }
    var countArr = FreeSpinCountMultiFromView(scatterView);
    var multiArr = [1, 5, 10];
    var randomSelectMode = {
        count: countArr[Util.random(0, countArr.length)],
        multi: multiArr[Util.random(0, multiArr.length)]
    }
    freeSpinSelect.push(randomSelectMode);

    for (var i = 0; i < freeSpinSelect.length; i++) {
        var fsLen = freeSpinSelect[i].count;
        var startMulti = freeSpinSelect[i].multi;

        //                           
        var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin, fsLen, startMulti);
        if (freeSpinDataWin < fsCache.win) {
            freeSpinDataWin = fsCache.win;
        }
        freeSpinData.cache.push(fsCache.cache);
        freeSpinData.selectMode.push(freeSpinSelect[i]);
    }

    return {
        win: freeSpinDataWin,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinData = {};
    freeSpinData.scatterView = scatterView;
    freeSpinData.cache = [];
    freeSpinData.selectMode = [];
    var freeSpinDataWin = 0;

    var freeSpinSelect = [];
    for (var i = 0; i < 3; i++) {
        var selectMode = {
            count: FreeSpinCountsFromView(scatterView, i),
            multi: FreeSpinMultiByType(i)
        };
        freeSpinSelect.push(selectMode);
    }
    var countArr = FreeSpinCountMultiFromView(scatterView);
    var multiArr = [1, 5, 10];
    var randomSelectMode = {
        count: countArr[Util.random(0, countArr.length)],
        multi: multiArr[Util.random(0, multiArr.length)]
    }
    freeSpinSelect.push(randomSelectMode);

    for (var i = 0; i < freeSpinSelect.length; i++) {
        var fsLen = freeSpinSelect[i].count;
        var startMulti = freeSpinSelect[i].multi;

        //                           
        var fsCache = BuyBonusViewCache(baseReels, bpl, fsLen, startMulti);
        if (freeSpinDataWin < fsCache.win) {
            freeSpinDataWin = fsCache.win;
        }
        freeSpinData.cache.push(fsCache.cache);
        freeSpinData.selectMode.push(freeSpinSelect[i]);
    }

    return {
        win: freeSpinDataWin,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0,
    };
}

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0, calcCount = 0;
    while (true) {
        var tumbleWinMoney = 0;
        var view = RandomView(reels);


        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }

        var tumbleWinMoney = WinFromView(view, bpl);
        if (tumbleWinMoney == 0) {
            continue;
        }
        var viewList = [view];

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumblingPositions);
            var newView = GetTumbleView(lastView, lastTumbling);
            if (isFreeSpinWin(newView)) {
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

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
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

var RandomView = function (reels, reelSizes = [], isFreeSpin = false) {
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

        if (isFreeSpin) {
            if (!isScatterWin(randomView)) {
                break;
            }
        } else {
            if (!isFreeSpinWin(randomView)) {
                break;
            }
        }
    }

    return randomView;
};

var RandomScatterView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        if (NumberOfScatters(view) == 0 && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    var reelsPos = [0, 1, 2, 3, 4, 5];
    Util.shuffle(reelsPos);

    var nScatters;
    if (Util.probability(80)) {
        nScatters = 4;
    } else if (Util.probability(80)) {
        nScatters = 5;
    } else {
        nScatters = 6;
    }

    for (var i = 0; i < nScatters; i++) {
        var reelNo = reelsPos[i];
        var reelSize;
        for (reelSize = 1; reelSize < slotHeight; reelSize++) {
            var pos = reelNo + reelSize * slotWidth;
            if (view[pos] == empty) {
                break;
            }
        }
        // var top = 0;
        // if (reelNo == 0 || reelNo == slotWidth - 1) {
        //     top = 1;
        // }
        var top = 1;
        var pos = reelNo + Util.random(top, reelSize) * slotWidth;
        view[pos] = scatter;
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, startMulti) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen, startMulti)

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

var BuyBonusViewCache = function (reels, bpl, fsLen, startMulti) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;
    winMulti = startMulti;

    while(true) {
        while (true) {
            var view = RandomView(reels, [], true);
            var tumbleWinMoney = WinFromView(view, bpl);
            var viewList = [view];
            //                       
            if (tumbleWinMoney > 0) {
                while (true) {
                    var lastView = viewList[viewList.length - 1];
                    var lastTumbling = Util.clone(tumblingPositions);
                    var newView = GetTumbleView(lastView, lastTumbling);
    
                    if (isScatterWin(newView)) {
                        continue;
                    }
    
                    winMulti++;
                    var nWinMoney = WinFromView(newView, bpl);
                    viewList.push(newView);
                    tumbleWinMoney += nWinMoney;
    
                    //                 
                    if (nWinMoney == 0) {
                        break;
                    }
                }
            }
    
            freeSpinCacheList.push(viewList);
            freeSpinWinMoney += tumbleWinMoney;
            freeSpinIndex++;
    
            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }
        
        if (freeSpinWinMoney > 0) {
            break;
        }
    }

    freeSpinData = {
        win: freeSpinWinMoney,
        cache: freeSpinCacheList,
    };

    return freeSpinData;
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
        var winMoney = bpl * payTable[step][symbolId] * winMulti;
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
        var winMoney = bpl * payTable[matchCount][symbolId] * winMulti;
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
        var randomView = RandomView(baseReels, reelSizes, true);

        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
            }
        }
        tumbleView[0] = empty;
        tumbleView[slotWidth - 1] = empty;

        if (isDoubleScatterInLine(tumbleView)) {
            continue;
        }

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

var isDoubleScatterInLine = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var numberOfScattersOfLine = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (isScatter(view[i + j * slotWidth])) {
                numberOfScattersOfLine++;
            }
        }
        if (numberOfScattersOfLine > 1) {
            return true;
        }
    }
    return false;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 4;
};

var isScatterWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isWild = function (symbol) {
    return symbol == wild;
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

var isScatter = function (symbol) {
    return symbol == scatter;
};

var FreeSpinCountsFromView = function (view, type) {
    var nScatters = NumberOfScatters(view);
    if (type == 0) {
        switch (nScatters) {
            case 4: return 15;
            case 5: return 19;
            case 6: return 23;
        }
    } else if (type == 1) {
        switch (nScatters) {
            case 4: return 10;
            case 5: return 14;
            case 6: return 18;
        }
    } else if (type == 2) {
        switch (nScatters) {
            case 4: return 5;
            case 5: return 9;
            case 6: return 13;
        }
    }
    return 10;
};

var FreeSpinCountMultiFromView = function (view) {
    var nScatters = NumberOfScatters(view);
    if (nScatters == 4) {
        return [5, 10, 15];
    } else if (nScatters == 5) {
        return [9, 14, 19];
    } else if (nScatters == 6) {
        return [13, 18, 23];
    }

    return [5, 10, 15];
};

var FreeSpinMultiByType = function (type) {
    switch (type) {
        case 0: return 1;
        case 1: return 5;
        case 2: return 10;
    }
    return 1;
}

module.exports = SlotMachine;