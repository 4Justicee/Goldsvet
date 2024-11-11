var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";
    this.boxView = [];
    this.boxVirtualRow = {};
    this.boxTumbleStr = "";
    this.reverseTopView = [];
    this.topVirtualSymbol = {};
    this.topTumbleStr = "";
    this.moneyValueList = [];
    this.moneySignalList = [];
    this.combineView = [];
    this.tmb_res = 0;
    this.winLinesStr = "";
    this.tumbleIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinFishermanCnt = 0;
    this.freeSpinLevel = 1;
    this.freeSpinIndex = 0;
    this.freeSpinMore = 0;
    this.freeSpinMulti = 1;
    this.freeSpinCollectMoney = 0;
    this.freeSpinCollectMulti = 0;
    this.freeSpinCollectPositions = [];
    this.tumbleViewList = [];
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
    this.lineCount = 20;
    this.jackpotType = ["FREE"];
};

var percentList = {
    fishermanHit: 30,
    highMultiHit: 20,
}
var baseReels = [
    [6, 8, 7, 5, 9, 7, 5, 9, 7, 9, 4, 11, 8, 12, 6, 7, 3, 8, 11, 12, 4, 7, 10, 7, 7, 7, 7, 7, 5, 1, 9, 6, 7, 1, 7, 6, 11, 7, 5, 9, 8, 9, 11, 7, 11, 6, 4, 3, 11, 4, 7, 8, 5, 6, 10],
    [10, 1, 12, 7, 8, 12, 3, 4, 6, 7, 7, 10, 6, 7, 8, 9, 10, 5, 11, 5, 6, 10, 7, 7, 7, 7, 7, 12, 11, 5, 4, 6, 8, 5, 12, 4, 7, 10, 11, 8, 7, 3, 12, 8, 10, 6, 12, 7, 6, 5, 4, 9],
    [1, 8, 5, 11, 8, 10, 5, 4, 12, 11, 7, 12, 3, 9, 6, 4, 7, 7, 7, 7, 3, 9, 12, 7, 9, 7, 9, 10, 6, 5, 8, 6, 10, 7, 3, 7, 4, 7, 7, 11],
    [7, 7, 6, 7, 9, 10, 11, 1, 8, 11, 5, 7, 7, 1, 7, 10, 4, 7, 7, 7, 7, 4, 5, 3, 6, 5, 12, 8, 5, 3, 4, 9, 11, 6, 9, 12, 8, 9, 6, 8, 10],
    [8, 6, 7, 9, 11, 6, 11, 12, 4, 7, 4, 6, 4, 9, 6, 7, 5, 12, 4, 1, 5, 7, 8, 12, 7, 7, 7, 7, 1, 11, 7, 9, 5, 10, 7, 7, 3, 9, 3, 10, 5, 9, 8, 6, 10, 11, 8, 10, 5, 12, 7, 7, 6, 7],
    [11, 12, 9, 6, 8, 3, 5, 7, 8, 7, 5, 12, 9, 3, 7, 4, 10, 9, 7, 1, 7, 7, 7, 7, 12, 9, 7, 6, 4, 1, 6, 7, 11, 8, 5, 7, 6, 7, 9, 6, 10, 5, 4]
];
var freeReels = [
    [9, 8, 6, 7, 10, 10, 3, 10, 4, 8, 10, 12, 9, 5, 9, 11, 12, 5, 6, 9, 12, 7, 10, 10, 14, 3, 8, 9, 11, 5, 7, 8, 11, 7, 11, 7, 10, 9, 12, 4, 10, 11, 7, 9],
    [11, 7, 4, 8, 10, 10, 12, 11, 8, 11, 10, 3, 7, 6, 11, 9, 3, 10, 11, 4, 6, 8, 12, 14, 12, 5, 7, 10],
    [8, 7, 4, 12, 10, 8, 8, 4, 5, 12, 14, 12, 3, 6, 11, 7, 9, 9, 6, 5, 10, 11, 7, 12, 11, 3, 10, 11, 5],
    [11, 7, 8, 9, 11, 4, 10, 12, 6, 12, 12, 12, 4, 7, 6, 9, 5, 3, 11, 12, 12, 10, 9, 10, 11, 11, 11, 8, 8, 5, 12, 5, 10, 11, 14, 6, 3, 11, 7],
    [10, 11, 6, 10, 9, 11, 5, 11, 12, 9, 9, 12, 12, 12, 12, 8, 3, 8, 7, 9, 14, 4, 4, 12, 9, 7, 6, 9, 9, 9, 10, 11, 11, 12, 12, 11, 3, 12, 7, 12, 5, 11, 11, 11, 4, 8, 6, 7, 12, 5, 11, 11, 10, 12, 5, 10, 12],
    [5, 7, 14, 10, 6, 7, 11, 11, 5, 6, 6, 6, 8, 10, 6, 11, 12, 9, 11, 7, 7, 11, 9, 9, 9, 4, 4, 12, 3, 9, 5, 14, 12, 11, 4, 3, 11, 11, 11, 6, 10, 11, 12, 8, 9, 12, 11, 6, 10]
];
var baseTopReel = [8, 11, 12, 5, 11, 12, 11, 5, 11, 10, 6, 11, 12, 7, 5, 6, 3, 3, 3, 9, 4, 2, 11, 9, 8, 11, 11, 4, 12, 12, 8, 5, 6, 7, 10, 9, 7, 10, 10, 10, 5, 3, 10, 4, 11, 11, 3, 5, 10, 8, 8, 3, 12, 7, 4, 12, 11, 6, 8, 8, 8, 3, 8, 7, 4, 12, 11, 8, 6, 8, 12, 12, 11, 10, 4, 9, 4, 5, 7, 7, 7, 12, 6, 11, 6, 9, 9, 10, 10, 4, 12, 11, 11, 12, 11, 11, 12, 6, 12, 11, 11, 11, 10, 8, 2, 7, 7, 11, 5, 2, 11, 9, 3, 9, 12, 7, 2, 3, 7, 10, 12];
var freeTopReel = [9, 7, 11, 3, 8, 9, 11, 6, 11, 2, 2, 9, 8, 5, 11, 10, 11, 12, 8, 12, 2, 3, 3, 3, 8, 9, 11, 8, 4, 6, 2, 4, 5, 9, 8, 7, 4, 5, 10, 12, 10, 9, 11, 6, 2, 12, 10, 10, 10, 2, 11, 11, 12, 12, 10, 11, 4, 10, 11, 10, 7, 6, 8, 8, 10, 12, 12, 2, 11, 11, 2, 12, 8, 8, 8, 3, 11, 2, 9, 12, 3, 9, 12, 11, 8, 11, 6, 2, 11, 12, 7, 3, 11, 7, 14, 10, 12, 7, 7, 7, 10, 7, 12, 7, 5, 3, 5, 8, 12, 2, 12, 11, 10, 11, 7, 6, 10, 12, 11, 4, 9, 4, 11, 11, 11, 14, 12, 8, 8, 4, 11, 7, 10, 4, 11, 5, 5, 4, 2, 6, 11, 10, 2, 12, 12, 2, 9, 8, 11];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 20, 5, 5, 4, 4, 4, 3, 3, 2, 0, 0],
    [0, 0, 0, 200, 40, 20, 10, 8, 8, 5, 5, 5, 4, 0, 0],
    [0, 0, 0, 500, 50, 30, 15, 12, 12, 12, 10, 10, 8, 0, 0],
    [0, 0, 0, 1000, 150, 40, 40, 35, 35, 20, 20, 18, 16, 0, 0]
]
var scatter = 1, wild = 2, fish = 7, empty = 13, fisherman = 14;
var keyForFish = 1000000;
var slotWidth = 6, slotHeight = 7;
var moneyValueAry = [40, 100, 200, 300, 400, 500, 1000, 80000];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevGameMode = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.boxView = [];
    this.boxTumbleStr = "";
    this.reverseTopView = [];
    this.topTumbleStr = "";
    this.combineView = [];
    this.winMoney = 0;
    this.winLinesStr = "";
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    this.boxVirtualRow = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.topVirtualSymbol = {
        right: RandomSymbol(baseTopReel),
        left: RandomSymbol(baseTopReel)
    };

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.tumbleViewList = viewCache.view;
        this.combineView = this.tumbleViewList[0];

    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view.viewList;
        this.combineView = viewCache.view.scatterView;
    }

    // handle corrent view
    var moneySymbolInfo = GetMoneySymbolInfo(this.combineView);
    this.combineView = moneySymbolInfo.view;
    this.moneySignalList = moneySymbolInfo.signalList;
    this.moneyValueList = moneySymbolInfo.multiList;

    // get top view and box view from combine view
    this.reverseTopView = this.combineView.slice(1, 5).reverse();
    this.boxView = this.combineView.slice(6, this.combineView.length + 1);

    // calculate win money
    var winInfo = WinFromView(this.combineView, player.betPerLine);
    this.winMoney = winInfo.winMoney;

    // handle winline
    this.winLines = winInfo.winLines;
    this.winLinesStr = MakeWinLineStrForApi(this.combineView, winInfo.winLines);

    // handle tumble win information
    var tumbleInfo = MakeTmbStrForApi(this.combineView, winInfo.winTumbles);
    this.topTumbleStr = tumbleInfo.topTmb.join('~');
    this.boxTumbleStr = tumbleInfo.boxTmb.join('~');

    this.tmb_res = this.winMoney;

    if (this.winMoney > 0) {

        this.tumbleIndex = 0;
        this.tumbleStatus = "TUMBLE";
        this.tmb_res = this.winMoney;
    }

    if (isFreeSpinWin(this.combineView)) {

        this.freeSpinIndex = 0;
        this.freeSpinLength = FreeSpinLengthFromView(this.combineView);
        this.freeSpinWinMoney = this.winMoney;
        this.beforeFreeSpinWinMoney = this.winMoney;
        this.freeSpinFishermanCnt = 0;
        this.freeSpinLevel = 1;
        this.freeSpinMulti = GetFreeSpinMulti(this.freeSpinLevel);
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.Tumbling = function (player, isFreeSpin = false) {
    this.tumbleIndex++;

    this.boxVirtualRow = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.topVirtualSymbol = {
        right: RandomSymbol(baseTopReel),
        left: RandomSymbol(baseTopReel)
    };

    // handle corrent view
    var viewIncludeMoney = this.tumbleViewList[this.tumbleIndex];
    var moneySymbolInfo = GetMoneySymbolInfo(viewIncludeMoney);
    this.combineView = moneySymbolInfo.view;
    this.moneySignalList = moneySymbolInfo.signalList;
    this.moneyValueList = moneySymbolInfo.multiList;

    // get top view and box view from combine view
    this.reverseTopView = this.combineView.slice(1, 5).reverse();
    this.boxView = this.combineView.slice(6, this.combineView.length + 1);

    // calculate win money
    var winInfo = WinFromView(this.combineView, player.betPerLine, isFreeSpin);
    this.winMoney = winInfo.winMoney;

    // handle winline
    this.winLines = winInfo.winLines;
    this.winLinesStr = MakeWinLineStrForApi(this.combineView, winInfo.winLines);

    // handle tumble win information
    var tumbleInfo = MakeTmbStrForApi(this.combineView, winInfo.winTumbles);
    this.topTumbleStr = tumbleInfo.topTmb.join('~');
    this.boxTumbleStr = tumbleInfo.boxTmb.join('~');

    this.tmb_res += this.winMoney;

    if (this.winMoney == 0) {

        this.tumbleStatus = "NOTUMBLE";

        if (isFreeSpin) {

            if (NumberOfFisherman(viewIncludeMoney) > 0 && NumberOfFish(viewIncludeMoney) > 0) {

                this.freeSpinFishermanCnt += NumberOfFisherman(viewIncludeMoney);
                if (this.freeSpinFishermanCnt > 12) {
                    this.freeSpinFishermanCnt = 12;
                }
                this.freeSpinCollectMulti = CollectFishMoney(viewIncludeMoney);
                this.winMoney += this.freeSpinCollectMulti * this.freeSpinMulti * player.betPerLine;
                this.freeSpinCollectMoney = this.winMoney;
                this.freeSpinCollectPositions = GetMoneySymbolPositions(this.combineView);
                this.tmb_res += this.winMoney;
            }
        }
    }
}

SlotMachine.prototype.FreeSpin = function (player) {

    if (this.tumbleStatus == "TUMBLE") {

        this.Tumbling(player, true);

        if (this.tumbleStatus == "NOTUMBLE") {

            this.freeSpinWinMoney += this.tmb_res;

            if (this.freeSpinIndex >= this.freeSpinLength) {

                if (this.freeSpinLevel * 4 <= this.freeSpinFishermanCnt && this.freeSpinLevel < 4) {

                    this.freeSpinLevel++;
                    this.freeSpinMulti = GetFreeSpinMulti(this.freeSpinLevel);
                    this.freeSpinMore = 10;
                    this.freeSpinLength += this.freeSpinMore;

                } else {

                    this.currentGame = "BASE";
                }
            }
        }

        return;
    }

    if (this.freeSpinMore > 0) {

        this.freeSpinMore = 0;
    }

    this.tumbleViewList = this.freeSpinCacheList[this.freeSpinIndex];

    var viewIncludeMoney = this.tumbleViewList[0];
    // handle corrent view
    var moneySymbolInfo = GetMoneySymbolInfo(viewIncludeMoney);
    this.combineView = moneySymbolInfo.view;
    this.moneySignalList = moneySymbolInfo.signalList;
    this.moneyValueList = moneySymbolInfo.multiList;

    // get top view and box view from combine view
    this.reverseTopView = this.combineView.slice(1, 5).reverse();
    this.boxView = this.combineView.slice(6, this.combineView.length + 1);

    // calculate win money
    var winInfo = WinFromView(this.combineView, player.betPerLine, true);
    this.winMoney = winInfo.winMoney;

    // handle winline
    this.winLines = winInfo.winLines;
    this.winLinesStr = MakeWinLineStrForApi(this.combineView, winInfo.winLines);

    // handle tumble win information
    var tumbleInfo = MakeTmbStrForApi(this.combineView, winInfo.winTumbles);
    this.topTumbleStr = tumbleInfo.topTmb.join('~');
    this.boxTumbleStr = tumbleInfo.boxTmb.join('~');

    this.tmb_res = 0;

    this.freeSpinIndex++;

    if (this.winMoney == 0) {

        if (NumberOfFisherman(viewIncludeMoney) > 0 && NumberOfFish(viewIncludeMoney) > 0) {

            this.freeSpinFishermanCnt += NumberOfFisherman(viewIncludeMoney);
            if (this.freeSpinFishermanCnt > 12) {
                this.freeSpinFishermanCnt = 12;
            }
            this.freeSpinCollectMulti = CollectFishMoney(viewIncludeMoney);
            this.winMoney += this.freeSpinCollectMulti * this.freeSpinMulti * player.betPerLine;
            this.freeSpinCollectMoney = this.winMoney;
            this.freeSpinCollectPositions = GetMoneySymbolPositions(this.combineView);
            this.tmb_res += this.winMoney;
        }

        this.freeSpinWinMoney += this.tmb_res;

        if (this.freeSpinIndex >= this.freeSpinLength) {

            if (this.freeSpinLevel * 4 <= this.freeSpinFishermanCnt && this.freeSpinLevel < 4) {

                this.freeSpinLevel++;
                this.freeSpinMulti = GetFreeSpinMulti(this.freeSpinLevel);
                this.freeSpinMore = 10;
                this.freeSpinLength += this.freeSpinMore;

            } else {

                this.currentGame = "BASE";
            }

        }
    } else {

        this.freeSpinCollectMoney = 0;
        this.tumbleIndex = 0;
        this.tumbleStatus = "TUMBLE";
        this.tmb_res = this.winMoney;
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    var viewInfo = null;

    if (baseWin > 0) {

        viewInfo = RandomWinView(baseReels, bpl, baseWin, baseTopReel);

    } else {

        viewInfo = RandomZeroView(baseReels, bpl, baseTopReel);
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
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        default:
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);

    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = { };

    var scatterView = RandomScatterView(baseReels, bpl, baseTopReel);
    var freeSpinLength = FreeSpinLengthFromView(scatterView);
    var freeCache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinLength);

    freeSpinCacheList.scatterView = scatterView;
    freeSpinCacheList.viewList = freeCache.view;

    var pattern = {
        win: freeCache.win,
        view: freeSpinCacheList,
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin, topReel) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {

        var tumbleWinMoney = 0;

        var originView = RandomView(reels, topReel);

        if (isFreeSpinWin(originView)) {

            continue;
        }

        var viewForCalc = GetViewForMoneyCalc(originView);
        var originWinInfo = WinFromView(viewForCalc, bpl);

        if (originWinInfo.winMoney == 0) {

            continue;
        }

        tumbleWinMoney += originWinInfo.winMoney;

        var viewList = [originView];

        var prevView = originView;
        var prevWinInfo = originWinInfo;

        while (true) {

            var nextView = RamdomViewByTumble(reels, topReel, prevView, prevWinInfo.winTumbles);

            if (isFreeSpinWin(nextView)) {

                continue;
            }

            var viewForCalc = GetViewForMoneyCalc(nextView);
            var nextWinInfo = WinFromView(viewForCalc, bpl);

            viewList.push(nextView);

            tumbleWinMoney += nextWinInfo.winMoney;

            if (nextWinInfo.winMoney == 0) {

                break;
            }

            prevView = nextView;
            prevWinInfo = nextWinInfo;
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {

            return {
                view: viewList,
                winMoney: tumbleWinMoney
            };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl, topReel);
        }
    }
};

var RandomZeroView = function (reels, bpl, topReel) {
    var originView = null;

    while (true) {

        originView = RandomView(reels, topReel);

        if (isFreeSpinWin(originView)) {

            continue;
        }

        var viewForCalc = GetViewForMoneyCalc(originView);
        var originWinInfo = WinFromView(viewForCalc, bpl);

        if (originWinInfo.winMoney == 0) {

            return {
                view: [originView],
                winMoney: 0
            };
        }

    }
};

var RandomView = function (reels, topReel = baseReels, reelSizeAry = [], isFreeSpin = false) {

    while (true) {

        var randView = [];

        for (var width = 0; width < slotWidth; width++) {

            // Get Length of Specific reel 
            var specReelLength = reels[width].length;

            // Handle Random Index in specific reel
            var randomIndex = Util.random(0, specReelLength);

            // Handle Random Reel Size
            var reelSize = Util.random(3, slotHeight);

            // If Reel Size Information is exist
            if (reelSizeAry.length > 0) {

                reelSize = reelSizeAry[width];
            }

            // Except First Row
            for (var height = 1; height < reelSize; height++) {

                var posInView = width + height * slotWidth;

                var posInReel = (randomIndex + height) % specReelLength;

                randView[posInView] = reels[width][posInReel];
            }

            for (var height = reelSize; height < slotHeight; height++) {

                var posInView = width + height * slotWidth;

                randView[posInView] = empty;
            }
        }

        // Handle Random Index In Top Reel
        var randIdxInTopReel = Util.random(0, topReel.length);

        for (var i = 1; i < slotWidth - 1; i++) {

            randView[i] = topReel[(randIdxInTopReel + i) % topReel.length];
        }

        randView[0] = empty;
        randView[slotWidth - 1] = empty;

        for (var i = 0; i < randView.length; i++) {

            if (randView[i] == fish) {

                var multi = moneyValueAry[Util.random(0, Math.floor(moneyValueAry.length / 2))];

                if (Util.probability(percentList.highMultiHit)) {

                    multi = moneyValueAry[Util.random(0, moneyValueAry.length)];
                }

                randView[i] = randView[i] * keyForFish + multi;
            }
        }

        if (NumberOfFish(randView) > 2) {

            continue;
        }

        // if (CheckDoubleScatterInAReel(randView) || CheckDoubleFishInAReel(randView)) {
        //     continue;
        // }

        if (CheckDoubleScatterInAReel(randView) || CheckDoubleFishInAReel(randView)) {
            continue;
        }

        var condition1 = isFreeSpin;
        var condition2 = NumberOfFisherman(randView) > 1;
        var condition3 = NumberOfFisherman(randView) > 0 && NumberOfFish(randView) == 0;
        var condition4 = NumberOfFisherman(randView) > 0 && ExistGoldFish(randView);

        if (condition1 && (condition2 || condition3 || condition4)) {

            continue;
        }

        return randView;
    }
};

var RandomScatterView = function (reels, bpl, topReel) {
    var randView = null;
    var randViewWinInfo = null;

    while (true) {

        randView = RandomView(reels, topReel);

        if (!isFreeSpinWin(randView)) {

            continue;
        }

        var viewForCalc = GetViewForMoneyCalc(randView);
        randViewWinInfo = WinFromView(viewForCalc, bpl);

        if (randViewWinInfo.winMoney > 0) {
            continue;
        }

        return randView;
    }
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var maxPattern = null;
    var viewForCalc = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {

        var freeSpinLength = null;
        var freeSpinData = [];
        var freeSpinWinMoney = null;
        var freeSpinIndex = 1;

        freeSpinLength = fsLen;
        freeSpinWinMoney = 0;

        // Special
        var prevFreeSpinFishermanCount = 0;
        var freeSpinFishermanCount = 0;
        var freeSpinLevel = 1;
        var freeSpinMulti = GetFreeSpinMulti(freeSpinLevel);

        while (true) {

            var viewList = null;
            var tumbleWinMoney = null;
            prevFreeSpinFishermanCount = freeSpinFishermanCount;

            while (true) {
                freeSpinFishermanCount = prevFreeSpinFishermanCount;

                var originView = RandomView(reels, freeTopReel, [], true);

                viewForCalc = GetViewForMoneyCalc(originView);
                var originWinInfo = WinFromView(viewForCalc, bpl);

                tumbleWinMoney = originWinInfo.winMoney;
                viewList = [originView];

                if (originWinInfo.winMoney > 0) {

                    var prevView = originView;
                    var prevWinInfo = originWinInfo;

                    while (true) {

                        var nextView = RamdomViewByTumble(reels, freeTopReel, prevView, prevWinInfo.winTumbles, true);

                        viewForCalc = GetViewForMoneyCalc(nextView);
                        var nextWinInfo = WinFromView(viewForCalc, bpl);

                        viewList.push(nextView);

                        tumbleWinMoney += nextWinInfo.winMoney;

                        if (nextWinInfo.winMoney == 0) {

                            freeSpinFishermanCount += NumberOfFisherman(nextView);
                            if (freeSpinFishermanCount > 12) {
                                freeSpinFishermanCount = 12;
                            }

                            if (NumberOfFisherman(nextView) > 0 && NumberOfFish(nextView) > 0) {

                                tumbleWinMoney += CollectFishMoney(nextView) * bpl * freeSpinMulti;
                            }

                            break;
                        }

                        prevView = nextView;
                        prevWinInfo = nextWinInfo;
                    }

                } else {

                    freeSpinFishermanCount += NumberOfFisherman(originView);
                    if (freeSpinFishermanCount > 12) {
                        freeSpinFishermanCount = 12;
                    }

                    if (NumberOfFisherman(originView) > 0 && NumberOfFish(originView) > 0) {

                        tumbleWinMoney += CollectFishMoney(originView) * bpl * freeSpinMulti;
                    }
                }

                if (Util.probability(percentList.fishermanHit) || prevFreeSpinFishermanCount == freeSpinFishermanCount) {

                    break;
                }
            }

            freeSpinData.push(viewList);
            freeSpinWinMoney += tumbleWinMoney;

            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {

                if (freeSpinFishermanCount >= freeSpinLevel * 4 && freeSpinLevel < 4) {

                    freeSpinLength += 10;
                    freeSpinLevel++;
                    freeSpinMulti = GetFreeSpinMulti(freeSpinLevel);

                } else {

                    break;
                }
            }
        }

        var pattern = {
            win: freeSpinWinMoney,
            view: freeSpinData
        }

        var condition1 = !maxPattern;
        if (condition1) {
            maxPattern = pattern;
            continue;
        }
        var condition2 = maxPattern.win > fsWin && pattern.win < maxPattern.win;
        if (condition2) {
            maxPattern = pattern;
            continue;
        }

        var condition3 = maxPattern.win < fsWin && pattern.win > maxPattern.win && pattern.win < fsWin;
        if (condition3) {
            maxPattern = pattern;
            continue;
        }
    }

    return maxPattern;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {

        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var RandomSymbol = function (reel) {

    return reel[Util.random(0, reel.length)];
};

var NumberOfScatters = function (view) {
    var scatterCnt = 0;

    for (var i = 0; i < view.length; i++) {

        if (view[i] == scatter) {

            scatterCnt++;
        }
    }

    return scatterCnt;
};

var NumberOfFisherman = function (view) {
    var fishermanCnt = 0;

    for (var i = 0; i < view.length; i++) {

        if (view[i] == fisherman) {

            fishermanCnt++;
        }
    }

    return fishermanCnt;
};

var NumberOfFish = function (view) {
    var fishCnt = 0;

    for (var i = 0; i < view.length; i++) {

        if (isFish(view[i])) {

            fishCnt++;
        }
    }

    return fishCnt;
};

var isFreeSpinWin = function (view) {

    return NumberOfScatters(view) >= 3;
};

var isFish = function (symbol) {

    return Math.floor(symbol / keyForFish) == fish;
};

var WinFromView = function (view, bpl, isFreeSpin = false) {
    var winMoney = 0;
    var winLines = [];
    var winTumbles = [];

    for (var i = 0; i < slotHeight; i++) {

        var posInView = i * slotWidth + 0;

        if (view[posInView] == empty) {

            continue;
        }

        if (isFreeSpin && view[posInView] == fish) {

            continue;
        }

        var history = [posInView];
        var matchCount = 1;

        winMoney += RecursiveSearch(view, 1, history, matchCount, view[posInView], bpl, winLines, winTumbles);
    }

    return {
        winMoney,
        winLines,
        winTumbles
    };
};

var RecursiveSearch = function (view, step, history, matchCount, symbolId, bpl, winLines, winTumbles) {

    if (symbolId == empty) {

        return 0;
    }

    if (step == slotWidth) {

        var winMoney = bpl * payTable[step][symbolId] * matchCount;

        if (winMoney > 0) {

            for (var i = 0; i < history.length; i++) {

                if (winTumbles.indexOf(history[i]) < 0) {

                    winTumbles.push(history[i]);
                }
            }

            winLines.push({
                symbol: symbolId,
                winMoney: winMoney,
                matchCount: matchCount,
                step: step,
                history: history
            });
        }

        return winMoney;
    }

    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    if (positionsByStep.length == 0) {

        var winMoney = bpl * payTable[step][symbolId];

        if (winMoney > 0) {

            for (var i = 0; i < history.length; i++) {

                if (winTumbles.indexOf(history[i]) == -1) {

                    winTumbles.push(history[i]);
                }
            }

            winLines.push({
                symbol: symbolId,
                winMoney: winMoney,
                matchCount: matchCount,
                step: step,
                history: history
            });
        }
        return winMoney;
    }

    var historyTmp = [...history];
    historyTmp = historyTmp.concat(positionsByStep);
    matchCount *= positionsByStep.length;

    return RecursiveSearch(view, step + 1, historyTmp, matchCount, symbolId, bpl, winLines, winTumbles);
};

var MakeWinLineStrForApi = function (combineView, winLines) {
    var winLinesStrAry = [];

    for (var i = 0; i < winLines.length; i++) {

        var winLineStr = `${winLines[i].symbol}~${winLines[i].winMoney}~${winLines[i].matchCount}~${winLines[i].step}~${winLines[i].history.join()}~l`;

        if (winLines.length > 1) {

            winLineStr += `~${winLines.length}`;
        }

        winLinesStrAry.push(winLineStr);
    }

    return winLinesStrAry.join(';');
};

var MakeTmbStrForApi = function (combineView, winTumbles) {
    var topTmb = [];
    var boxTmb = [];

    for (var i = 0; i < winTumbles.length; i++) {

        if (0 <= winTumbles[i] && winTumbles[i] <= 5) {

            topTmb.push(`${Math.abs(winTumbles[i] - 1 - (slotWidth - 2 - 1))},${combineView[winTumbles[i]]}`);

        } else {

            boxTmb.push(`${winTumbles[i] - slotWidth},${combineView[winTumbles[i]]}`);

        }
    }

    return {
        topTmb,
        boxTmb
    }
};

var GetMoneySymbolInfo = function (combineView) {
    var baseCombineView = [...combineView];
    var signalList = [];
    var multiList = [];

    for (var i = 0; i < baseCombineView.length; i++) {

        if (isFish(baseCombineView[i])) {

            signalList.push('v');
            multiList.push(baseCombineView[i] % keyForFish);
            baseCombineView[i] = fish;

        } else {

            signalList.push('r');
            multiList.push(0);
        }
    }

    if (signalList.indexOf('v') == -1) {

        signalList = [];
        multiList = [];
    }

    return {
        view: baseCombineView,
        signalList,
        multiList
    }
};

var GetMoneySymbolPositions = function (view) {
    var fishPositions = [];

    for (var i = 0; i < view.length; i++) {

        if (view[i] == fish) {

            fishPositions.push(i);
        }
    }

    return fishPositions;
};

var RamdomViewByTumble = function (reels, topReel, prevView, winTumbles, isFreeSpin = false) {

    while (true) {

        var nextView = [...prevView];

        for (var width = slotWidth - 1; width >= 1; width--) {

            if (winTumbles.indexOf(0 * slotWidth + width) >= 0 && nextView[0 * slotWidth + width] != empty) {

                for (var k = width + 1; k < slotWidth - 1; k++) {

                    nextView[k - 1] = nextView[k];
                }
                nextView[slotWidth - 2] = -1;
            }
        }

        for (var width = 0; width < slotWidth; width++) {

            for (var height = 1; height < slotHeight; height++) {

                var posInView = width + height * slotWidth;

                if (prevView[posInView] == empty) {

                    break;
                }

                if (winTumbles.indexOf(posInView) >= 0 && nextView[posInView] != empty) {

                    for (var k = height - 1; k >= 1; k--) {

                        nextView[width + (k + 1) * slotWidth] = nextView[width + k * slotWidth];
                    }

                    nextView[width + slotWidth] = -1;
                }
            }
        }

        var reelSizeAry = [slotHeight, slotHeight, slotHeight, slotHeight, slotHeight, slotHeight];

        var randView = RandomView(reels, topReel, reelSizeAry);

        for (var i = 0; i < nextView.length; i++) {

            if (nextView[i] == -1) {

                nextView[i] = randView[i];
            }
        }

        // check if next view is equal with previous view
        var isDiff = false;

        for (var i = 0; i < nextView.length; i++) {

            if (prevView[i] != nextView[i]) {

                isDiff = true;
                break;
            }
        }

        if (isDiff) {

            if (NumberOfFish(nextView) > 4) {

                continue;
            }

            if (CheckDoubleScatterInAReel(nextView) || CheckDoubleFishInAReel(nextView)) {
                continue;
            }

            var condition1 = isFreeSpin;
            var condition2 = NumberOfFisherman(nextView) > 1;
            var condition3 = NumberOfFisherman(nextView) > 0 && NumberOfFish(nextView) == 0;
            var condition4 = NumberOfFisherman(nextView) > 0 && ExistGoldFish(nextView);

            if (condition1 && (condition2 || condition3 || condition4)) {

                continue;
            }

            return nextView;
        }
    }
};

var isScatter = function (symbol) {

    return symbol == scatter;
};

var isWild = function (symbol) {

    return symbol == wild;
};

var FreeSpinLengthFromView = function (scatterView) {

    switch (NumberOfScatters(scatterView)) {

        case 3: return 10;
        case 4: return 15;
        case 5: return 20;
        case 6: return 25;
        default: return 10;
    }
};

var ExistGoldFish = function (view) {

    for (var i = 0; i < view.length; i++) {

        if (view[i] == 7080000) {

            return true;
        }
    }

    return false;
};

var MultiFromFishSymbol = function (fishSymbol) {
    var multi = 0;

    if (isFish(fishSymbol)) {

        multi = fishSymbol % keyForFish;
    }

    return multi;
};

var GetViewForMoneyCalc = function (view) {
    var viewForCalc = [...view];

    for (var i = 0; i < viewForCalc.length; i++) {

        if (isFish(viewForCalc[i])) {

            viewForCalc[i] = fish;
        }
    }

    return viewForCalc;
};

var CollectFishMoney = function (view) {
    var collectMoney = 0;

    for (var i = 0; i < view.length; i++) {

        if (isFish(view[i])) {

            collectMoney += MultiFromFishSymbol(view[i]);
        }
    }

    return collectMoney;
};

var GetFreeSpinMulti = function (freeSpinLevel) {

    switch (freeSpinLevel) {

        case 1: return 1;
        case 2: return 2;
        case 3: return 3;
        case 4: return 10;
        default: return 10;
    }
};

var CheckDoubleScatterInAReel = function (view) {
    var scatterPositions = [];

    // except top reel
    for (var i = slotWidth; i < view.length; i++) {

        if (isScatter(view[i])) {

            if (scatterPositions.indexOf(i % slotWidth) != -1) {

                // console.log(i % slotWidth, view);
                return true;
            }
            scatterPositions.push(i % slotWidth);
        }
    }
    return false;
};

var CheckDoubleFishInAReel = function (view) {
    var fishPositions = [];

    // except top reel
    for (var i = slotWidth; i < view.length; i++) {

        if (isFish(view[i])) {

            if (fishPositions.indexOf(i % slotWidth) != -1) {

                // console.log(i % slotWidth, view);
                return true;
            }
            fishPositions.push(i % slotWidth);
        }
    }
    return false;
}

module.exports = SlotMachine;