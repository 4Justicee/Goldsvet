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
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.topView = [];
    this.boxView = [];
    this.topTumble = "";
    this.boxTumble = "";
    this.topMultiStr = "";
    this.boxMultiStr = "";
    this.topLineAbove = 12;
    //          
    this.tumbleIndex = 0;
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    this.tumbleMulti = 1;
    this.lastTumbleMulti = 1;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;

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
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1;
var wild = 2, wild2X = 14, wild3X = 15, wild5X = 16;
var empty = 13;
var slotWidth = 6;
var slotHeight = 8;
var winLines = [];
var tumblingPositions = [];
var baseReels = [
    [11, 3, 4, 4, 4, 8, 9, 7, 6, 8, 8, 8, 4, 5, 5, 5, 1, 7, 7, 7, 5, 12, 10, 3, 3, 3, 6, 6, 6, 10, 10, 10, 9, 9, 9, 11, 11, 11, 12, 12, 12, 8, 9, 12, 5, 3, 6, 5, 3, 9, 5, 6, 4, 7, 10, 8, 5, 6, 7, 9, 3, 9, 3, 8, 10, 9, 4, 6, 7, 6, 12, 9, 3, 12, 7, 1, 8, 10, 3],
    [11, 11, 11, 9, 10, 10, 10, 6, 4, 4, 4, 12, 9, 9, 9, 4, 11, 5, 1, 7, 2, 8, 8, 8, 8, 10, 3, 3, 3, 3, 5, 5, 5, 12, 12, 12, 6, 6, 6, 7, 7, 7, 8, 10, 5, 10, 6, 12, 5, 9, 10, 8, 10, 4, 3, 7, 8, 5, 3, 6, 10, 5, 6, 12, 6, 10, 6, 12, 4, 12, 10, 4, 10, 12, 8, 10, 3, 1, 12, 10, 7, 10, 8, 4, 3, 10, 3, 12, 7, 10, 2, 7, 12, 3, 10, 12, 3, 10, 9, 7, 9, 10, 12, 10, 12, 10, 6, 7, 5, 3, 9, 7, 3, 7, 6, 10, 12, 8, 10, 9, 3, 12, 4, 10, 12, 6, 12, 6, 9, 4, 5, 3, 6, 12, 10, 7, 8, 12, 7, 10, 12, 10, 12, 5, 4, 12, 2, 6, 10, 8, 12, 8, 10, 9, 6, 4, 10, 12, 10, 7, 4, 10, 3, 12, 8, 6, 2, 7, 12, 3, 12, 10, 7, 3, 10, 4, 3, 12, 7, 10, 8, 5, 3, 7, 8, 7, 9, 2, 12, 7, 3, 5, 10, 3, 12, 3, 5, 10, 12, 5, 10, 3, 7, 3, 6, 7, 3, 7, 12, 7, 6, 3, 10, 3, 8, 10, 2, 6, 7, 3, 12, 10, 7, 2, 1, 5, 4, 12, 9, 5, 12, 6, 7, 10, 12, 7, 6, 12, 5, 6, 1, 6, 9, 12, 4, 3, 9, 10, 6, 5, 10, 4, 3, 12, 10, 12, 6, 5, 12, 9, 12, 10, 6, 4, 9, 7, 3, 8, 5, 6, 7, 10, 6, 7, 8, 12, 4, 7, 6, 8, 4, 9, 12, 9, 8, 6, 5, 12, 10, 7, 10],
    [4, 4, 4, 10, 5, 5, 5, 8, 5, 6, 10, 10, 10, 9, 7, 11, 12, 8, 8, 8, 2, 7, 7, 7, 4, 3, 6, 6, 6, 11, 11, 11, 12, 12, 12, 9, 9, 9, 3, 3, 3, 11, 10, 9, 10, 5, 12, 9, 6, 8, 7, 3, 6, 8, 5, 9, 12, 9, 5, 9, 7, 12, 5, 2, 11, 8, 5, 10, 9, 5, 11, 3, 5, 3, 9, 3, 9, 6, 10, 12, 10, 7, 11, 5, 6, 3, 12, 6, 5, 7, 8, 10, 7, 3, 9, 6, 12, 1, 5, 10, 12, 11, 5, 11, 10, 7, 9, 3, 9, 6, 3, 9, 7, 10, 5, 7, 6, 3, 8, 3, 10, 6, 8, 12, 9, 11, 7, 3, 6, 3, 9, 8, 9, 3, 5, 3, 2, 11, 3, 8, 10, 7, 11, 8, 2, 11, 10, 3, 5, 3, 3, 12, 8, 9, 8, 5, 9, 3, 12, 3, 11, 10, 3, 7, 6, 7, 11, 6, 10, 5, 7, 10, 3, 6, 3, 5, 3, 11, 3, 8, 9, 3, 12, 11, 5, 9, 7, 1, 12, 11, 10, 9, 6, 5, 8, 7, 10, 2, 6, 9, 10, 7, 10, 12, 10, 3, 5, 10, 3, 11, 3, 9, 7, 12, 10, 12, 10, 8, 9, 10, 3, 10, 2, 5, 6, 5, 9, 11, 7, 5, 9, 12, 9, 7, 5, 8, 3, 2, 9, 10, 3, 10, 12, 11, 5, 3, 9, 7, 2, 3, 7, 5, 12, 2, 9, 5, 10, 5, 2, 7, 3, 10, 7, 5, 6, 3, 10, 6, 11, 10, 9, 12, 7, 8, 11, 3, 8, 9, 3, 9, 7, 1, 11, 7, 10, 3, 5, 6, 5, 3, 9, 5, 10, 2, 3, 8, 10, 7, 10, 8, 10, 8, 11, 5, 10, 12, 10, 9, 3, 2, 9, 7, 9, 3, 12, 6, 10],
    [4, 3, 3, 3, 5, 10, 9, 9, 9, 8, 11, 12, 12, 12, 12, 3, 7, 11, 11, 11, 9, 6, 6, 6, 2, 1, 10, 10, 10, 6, 7, 7, 7, 8, 8, 8, 5, 5, 5, 4, 4, 4, 3, 11, 7, 6, 5, 8, 5, 10, 3, 6, 12, 5, 12, 5, 9, 8, 3, 7, 5, 8, 3, 5, 9, 7, 6, 8, 11, 9, 6, 8, 6, 7, 5, 7, 3, 10, 9, 8, 7, 3, 10, 9, 5, 7, 5, 6, 7, 3, 11, 3, 9, 8, 12, 6, 7, 8, 7, 3, 5, 12, 5, 7, 8, 3, 7, 3, 7, 3, 7, 12, 3, 9, 7, 5, 7, 8, 7, 11, 8, 7, 10, 7, 12, 3, 6, 7, 5, 7, 3, 7, 5, 8, 3, 9, 8, 12, 8, 3, 6, 8, 6, 9, 7, 6, 8, 9, 3, 6, 3, 8, 5, 7, 3, 9, 2, 11, 2, 9, 8, 5, 7, 5, 8, 3, 9, 3, 5, 6, 8, 7, 11, 7, 3, 7, 8, 1, 7, 9, 8, 3, 6, 8, 9, 5, 3, 6, 9, 7, 9, 7, 6, 3, 5, 11, 5, 10, 7, 5, 3, 11, 12, 7, 8, 7, 9, 7, 8, 9, 3, 8, 11, 5],
    [3, 10, 4, 12, 12, 12, 8, 10, 10, 10, 1, 11, 11, 11, 11, 7, 5, 9, 9, 9, 12, 9, 2, 6, 3, 3, 3, 4, 4, 4, 6, 6, 6, 5, 5, 5, 8, 8, 8, 7, 7, 7, 5, 7, 10, 11, 10, 6, 8, 7, 6, 8, 5, 4, 11, 6],
    [12, 12, 12, 10, 6, 9, 3, 7, 4, 5, 1, 9, 9, 9, 11, 8, 12, 4, 4, 4, 6, 6, 6, 8, 8, 8, 5, 5, 5, 10, 10, 10, 7, 7, 7, 3, 3, 3, 11, 11, 11, 6, 10, 4, 6, 4, 11, 10, 11, 7, 8, 3, 6, 7, 9, 5, 4, 6, 7, 11, 9, 6, 3, 11, 6, 4, 9, 8, 7, 10, 7, 3, 11, 3, 5, 6, 7, 9, 11, 7, 3, 6, 8, 6, 4, 9, 7, 10, 7, 4, 11, 10, 9, 10, 4, 10, 6, 11, 6, 11, 7, 11, 3, 6, 11, 9, 7, 9, 10, 6, 10, 9, 3, 10, 7, 6, 4, 10, 7, 10, 11, 6, 8, 6, 5, 10, 4, 10, 6, 10, 6, 9, 3, 8, 10, 8, 10, 9, 6, 9, 10, 6, 4, 3, 11, 8, 4, 6, 4, 6, 4, 7, 6]
];
var topReels = [5, 11, 9, 8, 7, 9, 11, 5, 11, 7, 3, 8, 9, 12, 4, 8, 12, 8, 9, 12, 2, 7, 8, 5, 9, 4, 3, 11, 6, 10, 12, 3, 12, 4, 12, 9, 5, 7, 11, 8, 10, 6, 10, 6, 8, 6, 4, 9, 8, 10, 6, 3, 5, 9, 10, 6, 12, 8, 7, 11, 4];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 15, 10, 6, 6, 4, 4, 2, 2, 2, 0],
    [0, 0, 0, 80, 25, 15, 10, 10, 6, 6, 4, 4, 4, 0],
    [0, 0, 0, 200, 50, 25, 15, 15, 10, 10, 8, 8, 8, 0],
    [0, 0, 0, 400, 125, 75, 30, 30, 20, 20, 15, 12, 12, 0]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 0; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
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
        this.freeSpinCacheList = viewCache.view;
        this.tumbleCacheList = this.freeSpinCacheList[0];
        this.view = this.tumbleCacheList[0];
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
    this.tumbleMulti = 1;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    if (isFreeSpinWin(this.view)) {
        this.scatterPositions = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinIndex = 1;
        this.freeSpinLength = GetFreeSpinCountFromView(this.view);
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var multiView = this.tumbleCacheList[this.tumbleIndex];
    this.view = GetFinalView(multiView);

    var prevMultiView = this.tumbleCacheList[this.tumbleIndex - 1];
    var prevWin = WinFromView(prevMultiView, player.betPerLine);
    this.tumbleMulti *= GetTumbleMulti(prevMultiView);
    // console.log(this.tumbleIndex + " : " + prevWin + " : " + tumblingPositions.join() + " : " + this.tumbleMulti);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(multiView, player.betPerLine);
    this.winLines = winLines;

    var topMultiView = multiView.slice(1, slotWidth - 1).reverse();
    var boxMultiView = multiView.slice(slotWidth, slotWidth * slotHeight);

    this.topView = GetFinalView(topMultiView);
    this.boxView = GetFinalView(boxMultiView);

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

    this.topMultiStr = GetMultiStrFromView(topMultiView);
    this.boxMultiStr = GetMultiStrFromView(boxMultiView);

    this.tmb_res += this.winMoney;
    this.topLineAbove = Util.random(wild, empty);

    this.tumbleIndex++;

    //                 
    if (this.winMoney == 0) {
        this.lastTumbleMulti = GetLastTumbleMulti(multiView);
        this.tumbleMulti *= this.lastTumbleMulti;
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);

        if (this.tumbleStatus == "NOTUMBLE") {
            //                              
            var tumbleTotalWin = this.tmb_res * this.tumbleMulti;
            this.winMoney = tumbleTotalWin - this.tmb_res;
            this.freeSpinWinMoney += tumbleTotalWin;

            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }

        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    var multiView = this.tumbleCacheList[0];

    this.view = GetFinalView(multiView);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(multiView, player.betPerLine);
    this.winLines = winLines;

    var topMultiView = multiView.slice(1, slotWidth - 1).reverse();
    var boxMultiView = multiView.slice(slotWidth, slotWidth * slotHeight);

    this.topView = GetFinalView(topMultiView);
    this.boxView = GetFinalView(boxMultiView);

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

    this.topMultiStr = GetMultiStrFromView(topMultiView);
    this.boxMultiStr = GetMultiStrFromView(boxMultiView);

    this.topLineAbove = Util.random(wild, empty);
    this.tumbleMulti = 1;
    this.lastTumbleMulti = 1;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
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
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet);

    var fsCount = GetFreeSpinCountFromView(scatterView);

    //                           
    var freeSpinCacheList = [];
    var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet);

    var fsCount = GetFreeSpinCountFromView(scatterView);

    //                           
    var freeSpinCacheList = [];
    var fsCache = BuyBonusViewCache(baseReels, bpl, fsCount);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: 0,
    };
}

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
            if (!isScatterWin(randomView) && !isDoubleWildView(randomView)) {
                break;
            }
        } else {
            if (!isFreeSpinWin(randomView) && !isDoubleWildView(randomView)) {
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
    if (Util.probability(90)) {
        nScatters = 4;
    } else if (Util.probability(90)) {
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

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen);

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

var BuyBonusViewCache = function (reels, bpl, fsLen) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;

    while (true) {
        var view = RandomView(reels, [], true);
        var multiView = GetMultiView(view);
        var tumbleWinMoney = WinFromView(multiView, bpl);
        var viewList = [multiView];
        var tumbleMulti = GetTumbleMulti(multiView);
        //                       
        if (tumbleWinMoney > 0) {
            while (true) {
                var lastView = viewList[viewList.length - 1];
                var lastTumbling = Util.clone(tumblingPositions);
                var newView = GetTumbleView(lastView, lastTumbling);

                if (isScatterWin(newView)) {
                    continue;
                }

                var newMultiView = GetMultiView(newView);
                var nWinMoney = WinFromView(newMultiView, bpl);
                tumbleMulti *= GetTumbleMulti(newMultiView);
                viewList.push(newMultiView);
                tumbleWinMoney += nWinMoney;

                //                 
                if (nWinMoney == 0) {
                    tumbleMulti *= GetLastTumbleMulti(newMultiView);
                    break;
                }
            }
        }

        freeSpinCacheList.push(viewList);
        freeSpinWinMoney += tumbleWinMoney * tumbleMulti;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            break;
        }
    }

    freeSpinData = {
        win: freeSpinWinMoney,
        cache: freeSpinCacheList,
    };

    return freeSpinData;
};

var GetFinalView = function (multiView) {
    var view = Util.clone(multiView);
    for (var i = 0; i < multiView.length; i++) {
        if (isWild(multiView[i])) {
            view[i] = wild;
        }
    }
    return view;
};

var GetMultiStrFromView = function (multiView) {
    var multiArr = [];
    // 2~1~3;2~10~2
    for (var i = 0; i < multiView.length; i++) {
        if (isWild(multiView[i]) && multiView[i] != wild) {
            var multi = 2;
            switch (multiView[i]) {
                case wild2X: multi = 2; break;
                case wild3X: multi = 3; break;
                case wild5X: multi = 5; break;
            }
            multiArr.push(`${wild}~${i}~${multi}`);
        }
    }
    var str = multiArr.join(';');
    if (multiArr.length == 0) {
        str = "";
    }
    return str;
};

var GetFreeSpinCountFromView = function (view) {
    switch (NumberOfScatters(view)) {
        case 6: return 22;
        case 5: return 17;
        case 4: return 12;
    }
    return 0;
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 6: return totalBet * 100;
        case 5: return totalBet * 20;
        case 4: return totalBet * 5;
    }
    return 0;
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

var GetMultiView = function (view) {
    var multiView = Util.clone(view);
    for (var i = 0; i < view.length; i++) {
        if (view[i] == wild) {
            var multiSymbol;
            if (Util.probability(70)) {
                multiSymbol = wild2X;
            } else if (Util.probability(70)) {
                multiSymbol = wild3X;
            } else {
                multiSymbol = wild5X;
            }
            multiView[i] = multiSymbol;
        }
    }
    return multiView;
}

var GetTumbleMulti = function (multiView) {
    var tumbleMulti = 1;
    for (var i = 0; i < tumblingPositions.length; i++) {
        if (isWild(multiView[tumblingPositions[i]])) {
            tumbleMulti *= GetMulti(multiView[tumblingPositions[i]]);
        }
    }

    return tumbleMulti;
};

var GetMulti = function (symbol) {
    switch (symbol) {
        case wild2X: return 2;
        case wild3X: return 3;
        case wild5X: return 5;
    }
    return 0;
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
        for (var j = 1; j < slotHeight; j++) {
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

var isWild = function (symbol) {
    return symbol == wild || symbol == wild2X || symbol == wild3X || symbol == wild5X;
};

var isScatter = function (symbol) {
    return symbol == scatter;
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

var isDoubleWildView = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var wildCount = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (isWild(view[i + j * slotWidth])) {
                wildCount++;
            }
        }

        if (wildCount > 1) {
            return true;
        }
    }

    return false;
};

var isScatterWin = function (view) {
    return NumberOfScatters(view) >= 3;
}

var GetLastTumbleMulti = function (multiView) {
    var tumbleMulti = 1;
    for (var i = 0; i < multiView.length; i++) {
        if (tumblingPositions.indexOf(i) < 0 && isWild(multiView[i])) {
            tumbleMulti *= GetMulti(multiView[i]);
        }
    }
    return tumbleMulti;
}

module.exports = SlotMachine;