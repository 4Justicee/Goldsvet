var Util = require('../../../utils/slot_utils');
//                                                                                        rmul             !
function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus = "NOTUMBLE";

    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    //          
    this.tumbleIndex = 0;
    this.tumbles = [];
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    this.eggSize = 0;
    this.eggMulti = 1;
    this.srf = "";
    this.rwd = "";
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinEnd = false;
    this.freeSpinEggSize = 2;
    this.freeSpinEggMulti = 1;
    this.freeSpinCacheList = [];
    //                          
    this.freeSpinTargetMoney = 0;
    this.isBonusBuy = false;

    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 20;
    this.jackpotType = ["FREE"];

    this.buyMulti = 100;
    this.buyPatternCount = 100;

    this.realPatterCount = 500;
};

var scatter = 1, sizeUpgradeSymbol = 10, multiUpgradeSymbol = 11;
var slotWidth = 7, slotHeight = 7;
var baseReels = [
    [3, 6, 7, 8, 3, 9, 7, 4, 8, 8, 5, 6, 8, 9, 6, 4, 6, 3, 1, 6, 9, 9, 9, 4, 7, 8, 6, 4, 4, 3, 7, 7, 5, 7, 8, 9, 8, 9, 5, 8, 7, 6, 3, 5, 5, 5, 4, 3, 9, 8, 9, 7, 6, 5, 9, 6, 4, 5, 8, 7, 9, 7, 5, 8, 4, 6, 4, 4, 4, 9, 9, 7, 6, 9, 6, 9, 7, 9, 6, 8, 6, 6, 3, 7, 6, 7, 5, 6, 5, 8, 8, 8, 7, 9, 4, 9, 5, 9, 9, 6, 8, 3, 4, 6, 3, 3, 7, 9, 6, 8, 9, 8, 3, 3, 3, 1, 7, 4, 4, 9, 7, 5, 8, 4, 8, 7, 4, 7, 8, 9, 3, 9, 8, 5, 9, 3, 7, 7, 7, 3, 9, 9, 8, 5, 5, 8, 9, 7, 7, 6, 8, 4, 3, 6, 6, 8, 3, 9, 4, 6, 6, 6, 5, 9, 8, 7, 5, 1, 8, 5, 8, 9, 7, 6, 6, 8, 9, 5, 6, 9, 7, 8, 4, 7],
    [9, 8, 5, 4, 6, 9, 1, 7, 8, 6, 6, 9, 3, 9, 5, 4, 9, 9, 9, 9, 9, 8, 9, 7, 5, 6, 7, 8, 6, 4, 8, 6, 7, 8, 8, 3, 9, 9, 8, 5, 5, 5, 4, 6, 4, 6, 5, 4, 9, 7, 1, 8, 4, 7, 8, 6, 9, 4, 8, 4, 6, 4, 4, 4, 5, 8, 3, 9, 8, 3, 5, 7, 3, 7, 6, 7, 3, 7, 3, 7, 7, 9, 8, 8, 8, 3, 6, 7, 8, 6, 9, 5, 8, 8, 6, 9, 3, 6, 6, 5, 9, 5, 9, 3, 3, 3, 3, 7, 9, 7, 8, 5, 9, 4, 9, 5, 3, 6, 8, 8, 6, 7, 7, 5, 7, 7, 7, 9, 8, 4, 5, 8, 4, 7, 3, 6, 3, 6, 7, 7, 9, 4, 8, 5, 7, 6, 6, 6, 6, 9, 4, 9, 8, 7, 6, 8, 9, 3, 9, 6, 6, 9, 7, 7, 8, 5, 4, 9],
    [7, 4, 9, 9, 9, 6, 5, 7, 5, 5, 5, 9, 4, 8, 4, 4, 1, 4, 7, 4, 5, 8, 8, 8, 9, 3, 6, 3, 3, 3, 8, 7, 6, 7, 7, 7, 8, 6, 5, 6, 6, 6, 9, 9, 3, 9, 8],
    [7, 3, 6, 6, 9, 3, 9, 9, 8, 8, 9, 8, 9, 9, 9, 4, 7, 8, 8, 4, 9, 7, 4, 9, 8, 9, 6, 4, 5, 5, 5, 9, 5, 9, 9, 6, 4, 7, 9, 4, 4, 7, 6, 9, 4, 4, 4, 6, 8, 9, 6, 3, 6, 5, 6, 4, 9, 8, 7, 3, 8, 8, 8, 8, 6, 9, 9, 5, 5, 4, 3, 8, 3, 7, 5, 6, 3, 3, 3, 4, 8, 9, 5, 5, 7, 4, 6, 9, 3, 3, 7, 6, 7, 7, 7, 8, 7, 9, 5, 8, 8, 6, 7, 9, 5, 8, 8, 7, 6, 6, 6, 3, 6, 5, 7, 3, 5, 7, 7, 6, 8, 6, 7, 7, 8],
    [9, 6, 3, 7, 3, 3, 9, 9, 9, 1, 6, 5, 5, 4, 9, 3, 8, 9, 5, 5, 5, 8, 9, 8, 9, 5, 5, 7, 6, 8, 8, 8, 9, 6, 9, 8, 9, 7, 4, 8, 3, 3, 3, 9, 5, 4, 4, 7, 7, 9, 7, 7, 7, 7, 9, 6, 8, 7, 8, 5, 5, 4, 4, 4, 4, 3, 1, 7, 6, 8, 8, 7, 6, 7, 6, 6, 6, 4, 6, 6, 4, 3, 9, 8, 8, 6],
    [4, 9, 9, 9, 4, 9, 5, 5, 5, 6, 7, 8, 8, 8, 9, 8, 1, 5, 3, 3, 3, 7, 6, 7, 7, 7, 6, 3, 4, 4, 4, 7, 3, 6, 6, 6, 8, 5, 9, 8],
    [9, 6, 7, 8, 7, 4, 8, 3, 7, 6, 9, 3, 9, 9, 9, 9, 8, 5, 9, 8, 5, 6, 6, 8, 8, 9, 6, 9, 5, 5, 5, 5, 9, 6, 6, 9, 1, 8, 9, 6, 9, 5, 7, 9, 6, 8, 8, 8, 4, 3, 7, 4, 7, 5, 8, 7, 9, 3, 8, 5, 7, 3, 3, 3, 9, 6, 6, 7, 4, 5, 6, 9, 4, 9, 4, 6, 3, 7, 7, 7, 7, 3, 5, 9, 8, 4, 8, 3, 6, 7, 4, 8, 4, 4, 4, 4, 4, 1, 7, 6, 8, 5, 7, 8, 8, 7, 9, 4, 7, 6, 6, 6, 6, 5, 8, 3, 8, 7, 3, 3, 5, 7, 5, 9, 9, 3, 8]
];
var freeReels = [
    [3, 6, 7, 8, 3, 9, 7, 4, 8, 8, 5, 6, 8, 9, 6, 4, 6, 3, 6, 9, 9, 9, 4, 7, 8, 6, 4, 4, 3, 7, 7, 5, 7, 8, 9, 8, 9, 5, 8, 7, 6, 3, 5, 5, 5, 4, 3, 9, 8, 9, 7, 6, 5, 9, 6, 4, 5, 8, 7, 9, 7, 5, 8, 4, 6, 4, 4, 4, 9, 9, 7, 6, 9, 6, 9, 7, 9, 6, 8, 6, 6, 3, 7, 6, 7, 5, 6, 5, 8, 8, 8, 7, 9, 4, 9, 5, 9, 9, 6, 8, 3, 4, 6, 3, 3, 7, 9, 6, 8, 9, 8, 3, 3, 3, 7, 4, 4, 9, 7, 5, 8, 4, 8, 7, 4, 7, 8, 9, 3, 9, 8, 5, 9, 3, 7, 7, 7, 3, 9, 9, 8, 5, 5, 8, 9, 7, 7, 6, 8, 4, 3, 6, 6, 8, 3, 9, 4, 6, 6, 6, 5, 9, 8, 7, 5, 8, 5, 8, 9, 7, 6, 6, 8, 9, 5, 6, 9, 7, 8, 4, 7],
    [9, 8, 5, 4, 6, 9, 7, 8, 6, 6, 9, 3, 9, 5, 4, 9, 9, 9, 9, 9, 8, 9, 7, 5, 6, 7, 8, 6, 4, 8, 6, 7, 8, 8, 3, 9, 9, 8, 5, 5, 5, 4, 6, 4, 6, 5, 4, 9, 7, 8, 4, 7, 8, 6, 9, 4, 8, 4, 6, 4, 4, 4, 5, 8, 3, 9, 8, 3, 5, 7, 3, 7, 6, 7, 3, 7, 3, 7, 7, 9, 8, 8, 8, 3, 6, 7, 8, 6, 9, 5, 8, 8, 6, 9, 3, 6, 6, 5, 9, 5, 9, 3, 3, 3, 3, 7, 9, 7, 8, 5, 9, 4, 9, 5, 3, 6, 8, 8, 6, 7, 7, 5, 7, 7, 7, 9, 8, 4, 5, 8, 4, 7, 3, 6, 3, 6, 7, 7, 9, 4, 8, 5, 7, 6, 6, 6, 6, 9, 4, 9, 8, 7, 6, 8, 9, 3, 9, 6, 6, 9, 7, 7, 8, 5, 4, 9],
    [7, 4, 9, 9, 9, 6, 5, 7, 5, 5, 5, 9, 4, 8, 4, 4, 4, 7, 4, 5, 8, 8, 8, 9, 3, 6, 3, 3, 3, 8, 7, 6, 7, 7, 7, 8, 6, 5, 6, 6, 6, 9, 9, 3, 9, 8],
    [7, 3, 6, 6, 9, 3, 9, 9, 8, 8, 9, 8, 9, 9, 9, 4, 7, 8, 8, 4, 9, 7, 4, 9, 8, 9, 6, 4, 5, 5, 5, 9, 5, 9, 9, 6, 4, 7, 9, 4, 4, 7, 6, 9, 4, 4, 4, 6, 8, 9, 6, 3, 6, 5, 6, 4, 9, 8, 7, 3, 8, 8, 8, 8, 6, 9, 9, 5, 5, 4, 3, 8, 3, 7, 5, 6, 3, 3, 3, 4, 8, 9, 5, 5, 7, 4, 6, 9, 3, 3, 7, 6, 7, 7, 7, 8, 7, 9, 5, 8, 8, 6, 7, 9, 5, 8, 8, 7, 6, 6, 6, 3, 6, 5, 7, 3, 5, 7, 7, 6, 8, 6, 7, 7, 8],
    [9, 6, 3, 7, 3, 3, 9, 9, 9, 6, 5, 5, 4, 9, 3, 8, 9, 5, 5, 5, 8, 9, 8, 9, 5, 5, 7, 6, 8, 8, 8, 9, 6, 9, 8, 9, 7, 4, 8, 3, 3, 3, 9, 5, 4, 4, 7, 7, 9, 7, 7, 7, 7, 9, 6, 8, 7, 8, 5, 5, 4, 4, 4, 4, 3, 7, 6, 8, 8, 7, 6, 7, 6, 6, 6, 4, 6, 6, 4, 3, 9, 8, 8, 6],
    [4, 9, 9, 9, 4, 9, 5, 5, 5, 6, 7, 8, 8, 8, 9, 8, 5, 3, 3, 3, 7, 6, 7, 7, 7, 6, 3, 4, 4, 4, 7, 3, 6, 6, 6, 8, 5, 9, 8],
    [9, 6, 7, 8, 7, 4, 8, 3, 7, 6, 9, 3, 9, 9, 9, 9, 8, 5, 9, 8, 5, 6, 6, 8, 8, 9, 6, 9, 5, 5, 5, 5, 9, 6, 6, 9, 8, 9, 6, 9, 5, 7, 9, 6, 8, 8, 8, 4, 3, 7, 4, 7, 5, 8, 7, 9, 3, 8, 5, 7, 3, 3, 3, 9, 6, 6, 7, 4, 5, 6, 9, 4, 9, 4, 6, 3, 7, 7, 7, 7, 3, 5, 9, 8, 4, 8, 3, 6, 7, 4, 8, 4, 4, 4, 4, 4, 7, 6, 8, 5, 7, 8, 8, 7, 9, 4, 7, 6, 6, 6, 6, 5, 8, 3, 8, 7, 3, 3, 5, 7, 5, 9, 9, 3, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 10, 4, 4, 3, 3, 0, 0],
    [0, 0, 0, 30, 25, 15, 8, 8, 4, 4, 0, 0],
    [0, 0, 0, 50, 40, 25, 12, 12, 6, 6, 0, 0],
    [0, 0, 0, 100, 60, 50, 25, 25, 15, 15, 0, 0],
    [0, 0, 0, 150, 100, 75, 50, 50, 25, 25, 0, 0],
    [0, 0, 0, 150, 100, 75, 50, 50, 25, 25, 0, 0],
    [0, 0, 0, 150, 100, 75, 50, 50, 25, 25, 0, 0],
    [0, 0, 0, 150, 100, 75, 50, 50, 25, 25, 0, 0],
    [0, 0, 0, 150, 100, 75, 50, 50, 25, 25, 0, 0],
    [0, 0, 0, 400, 200, 150, 100, 100, 50, 50, 0, 0],
    [0, 0, 0, 400, 200, 150, 100, 100, 50, 50, 0, 0],
    [0, 0, 0, 400, 200, 150, 100, 100, 50, 50, 0, 0],
    [0, 0, 0, 400, 200, 150, 100, 100, 50, 50, 0, 0],
    [0, 0, 0, 400, 200, 150, 100, 100, 50, 50, 0, 0],
    [0, 0, 0, 2000, 600, 400, 240, 240, 120, 120, 0, 0],
    [0, 0, 0, 2000, 600, 400, 240, 240, 120, 120, 0, 0],
    [0, 0, 0, 2000, 600, 400, 240, 240, 120, 120, 0, 0],
    [0, 0, 0, 2000, 600, 400, 240, 240, 120, 120, 0, 0],
    [0, 0, 0, 2000, 600, 400, 240, 240, 120, 120, 0, 0],
    [0, 0, 0, 2000, 600, 400, 240, 240, 120, 120, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 5000, 1000, 750, 500, 500, 250, 250, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0],
    [0, 0, 0, 20000, 10000, 5000, 2000, 2000, 1000, 1000, 0, 0]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 0; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.totalBet = player.totalBet;
    this.prevTumbleStatus = this.tumbleStatus;
    this.betPerLine = player.betPerLine;

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(false, player);
        return;
    }

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    var view;
    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        view = this.tumbleCacheList[0];

    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view.viewList;
        this.tumbleCacheList = this.freeSpinCacheList[0];
        view = viewCache.view.scatterView;

    }

    this.view = GetFinalView(view).view;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    var winInfo = WinFromView(view, player.betPerLine);
    this.winMoney = winInfo.winMoney;
    this.winLines = winInfo.winLines;
    this.tumbles = GetTumbles(this.view, winInfo.tumbling);

    this.eggSize = 0;
    this.eggMulti = 1;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 0;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinLength = GetFreeSpinCountFromView(this.view);
        this.freeSpinEnd = false;
        this.currentGame = "FREE";
        this.eggSize = 2;
        this.eggMulti = 1;
    }
};

SlotMachine.prototype.Tumbling = function (isFreeSpin = false, player) {
    this.tumbleIndex = Util.min(this.tumbleIndex + 1, this.tumbleCacheList.length - 1);
    var multiView = this.tumbleCacheList[this.tumbleIndex];

    this.maskView = [];
    //           
    if (multiView.length > slotWidth * slotHeight) {
        // slotWidth * slotHeight = 49                              
        //                        49 * 3       3                              
        //                                                                                                                                                                                            
        //                                                                                                                          
        //                                                                               
        this.maskView = multiView.slice(slotWidth * slotHeight * 2, multiView.length);
        multiView = multiView.slice(slotWidth * slotHeight, slotWidth * slotHeight * 2);
        this.maskView = GetFinalView(this.maskView).view;
    }

    var srf = [];
    var result = GetFinalView(multiView);

    this.view = result.view;
    if (this.maskView.length == 0) {
        this.maskView = Util.clone(this.view);
    }

    var upgrades = GetEggUpgrades(multiView);
    for (var i = 0; i < upgrades.sizeUpgrades.length; i++) {
        var pos = upgrades.sizeUpgrades[i];
        this.maskView[pos] = Util.random(3, 10);
        srf.push(`${this.maskView[pos]}~${sizeUpgradeSymbol}~${pos}`);
        if (this.eggSize == 0) {
            this.eggSize = 2;
        } else {
            this.eggSize++;
        }
    }
    for (var i = 0; i < upgrades.multiUpgrades.length; i++) {
        var pos = upgrades.multiUpgrades[i];
        this.maskView[pos] = Util.random(3, 10);
        srf.push(`${this.maskView[pos]}~${multiUpgradeSymbol}~${pos}`);
        this.eggMulti++;
    }

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    var winInfo = WinFromView(multiView, player.betPerLine);
    this.winMoney = winInfo.winMoney;
    this.winLines = winInfo.winLines;

    this.rwd = "";
    //                       
    if (result.rwd.length > 0) {
        this.rwd = `${result.symbol}~${result.rwd.join()}`;
        var pos = result.rwd[0];
        srf.push(`${this.maskView[pos]}~${result.symbol}~${pos}`);
        //                                                              
        var scatterPositions = ScatterPositions(this.maskView);
        for (var i = 0; i < scatterPositions.length; i++) {
            var pos = scatterPositions[i];
            srf.push(`${this.view[pos]}~${this.maskView[pos]}~${pos}`);
            this.view[pos] = scatter;
        }
    }

    if (srf.length == 0) {
        this.maskView = [];
    }
    this.srf = srf.join(';');

    this.tumbles = GetTumbles(this.view, winInfo.tumbling);
    this.tmb_res += this.winMoney;


    //                 
    if (this.winMoney == 0 && this.tumbleIndex >= this.tumbleCacheList.length - 1) {
        this.tumbleStatus = "NOTUMBLE";
        if (!isFreeSpin) {
            this.eggSize = 0;
            this.eggMulti = 1;
        }
    }
}

SlotMachine.prototype.FreeSpin = function (player) {

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(true, player);

        if (this.tumbleStatus == "NOTUMBLE") {
            //                              
            if (this.freeSpinEnd) {
                this.currentGame = "BASE";

                this.eggSize = 0;
                this.eggMulti = 1;
            }
        }

        this.freeSpinWinMoney += this.winMoney;
        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex - 1];

    var multiView = this.tumbleCacheList[0];

    var result = GetFinalView(multiView);
    this.view = result.view;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };


    var winInfo = WinFromView(multiView, player.betPerLine);
    this.winMoney = winInfo.winMoney;
    this.winLines = winInfo.winLines;
    this.tumbles = GetTumbles(this.view, winInfo.tumbling);

    this.freeSpinWinMoney += this.winMoney;

    //                       
    this.tumbleIndex = 0;
    this.tmb_res = this.winMoney;
    this.tumbleStatus = "TUMBLE";

    this.freeSpinIndex++;
    if (this.freeSpinIndex >= this.freeSpinLength + 1) {
        this.freeSpinIndex = this.freeSpinLength;
        this.freeSpinEnd = true;
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
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1, upperLimit = 100000000000000;
    var lowerView = null, upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = this.SpinForBuyBonus(bpl, totalBet);
        freeSpinData.isCall = isCall ? 1 : 0;

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
}

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinWinMoney = 0;
    var freeSpinEggSize = 2;
    var freeSpinEggMulti = 1;
    var freeSpinData = {};

    var scatterView = RandomScatterView(baseReels, bpl);
    freeSpinData.scatterView = scatterView;
    freeSpinData.viewList = [];

    freeSpinWinMoney += ScatterWinFromView(scatterView, bpl * this.lineCount);
    var freeSpinLength = GetFreeSpinCountFromView(scatterView);

    for (var i = 0; i < freeSpinLength; i++) {
        // Tumble View Cache
        var freeViewCache = RandomFreeViewCache(freeReels, bpl, freeSpinEggSize, freeSpinEggMulti);
        // Tumble View Cache List
        freeSpinData.viewList.push(freeViewCache.tumbleViewList);
        // FreeSpin Info
        freeSpinEggSize = freeViewCache.upgradedInfo.eggSize;
        freeSpinEggMulti = freeViewCache.upgradedInfo.eggMulti;
        // FreeSpin Money
        freeSpinWinMoney += freeViewCache.tumbleWinMoney;
    }

    return {
        win: freeSpinWinMoney,
        view: freeSpinData,
        bpl: bpl,
        type: "FREE",
        isCall: 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    var tumbleViewCache = null;

    while (true) {

        tumbleViewCache = RandomBaseViewCache(bpl, reels);

        if (tumbleViewCache.tumbleWinMoney > bottomLimit && tumbleViewCache.tumbleWinMoney <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    return {
        view: tumbleViewCache.viewList,
        winMoney: tumbleViewCache.tumbleWinMoney
    }

};

var RandomZeroView = function (reels, bpl) {

    while (true) {
        var view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        var winInfo = WinFromView(view, bpl);

        if (winInfo.winMoney == 0) {
            return {
                view: [view],
                winMoney: 0,
            };
        }
    }

};

var RandomView = function (reels) {
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
    return resultView;
};

var RandomBaseViewCache = function (bpl, reels) {
    var tumbleWinMoney = 0;
    var tumbleViewList = [];


    // Origin View
    var originView = null;
    while (true) {
        originView = RandomView(reels);
        if (!isFreeSpinWin(originView)) {
            break;
        }
    }

    var originWinInfo = WinFromView(originView, bpl);

    tumbleWinMoney += originWinInfo.winMoney;

    // ==================
    tumbleViewList.push(originView);
    // ==================

    var eggSize = 1, eggMulti = 1;
    var upgradedEggSize = 1, upgradedEggMulti = 1;

    if (originWinInfo.winMoney == 0 && originWinInfo.tumbling.length == 0) {
        return {
            viewList: tumbleViewList,
            tumbleWinMoney: tumbleWinMoney,
        }
    }

    // Generate Tumble View List
    while (true) {

        var lastView = tumbleViewList[tumbleViewList.length - 1];

        if (lastView.length > slotWidth * slotHeight) {
            lastView = lastView.slice(0, slotWidth * slotHeight);
        }

        var lastWinInfo = WinFromView(lastView, bpl);

        var lastTumbling = Util.clone(lastWinInfo.tumbling);

        // ================================ Hit Leaf And Copper 10%
        var isSizeUpgrade = false, isMultiUpgrade = false;

        if (upgradedEggSize < 6 && Util.probability(20)) {
            isSizeUpgrade = true;
        }
        if (upgradedEggMulti < 11 && Util.probability(0)) {
            isMultiUpgrade = true;
        }
        // ================================

        var nextView = null;
        var nextWinInfo = null;

        while (true) {

            nextView = GetTumbleView_New(reels, lastView, lastTumbling, isSizeUpgrade, isMultiUpgrade);

            if (!isFreeSpinWin(nextView)) {
                nextWinInfo = WinFromView(nextView, bpl);
                break;
            }

        }

        // ==================
        tumbleViewList.push(nextView);
        // ==================
        tumbleWinMoney += nextWinInfo.winMoney;

        // ================== Upgrade
        var upgrades = GetEggUpgrades(nextView);
        upgradedEggSize += upgrades.sizeUpgrades.length;
        upgradedEggMulti += upgrades.multiUpgrades.length;
        // ==================


        if (nextWinInfo.winMoney == 0 && nextWinInfo.tumbling.length == 0) {
            //           ,                                                           
            if (upgradedEggSize == eggSize && upgradedEggMulti == eggMulti) {
                break;
            }

            eggSize = upgradedEggSize;
            eggMulti = upgradedEggMulti;
            var lastViewForEgg = tumbleViewList[tumbleViewList.length - 1];

            var eggView = RandomEggView_New(lastViewForEgg, eggSize, eggMulti);

            // ==================
            var eggWinInfo = WinFromView(eggView, bpl);
            // ==================

            tumbleWinMoney += eggWinInfo.winMoney;

            var finalEggView = GetFinalEggView(eggView, lastViewForEgg);
            var eggViewResult = finalEggView.concat(eggView, lastViewForEgg);

            // ==================
            tumbleViewList.push(eggViewResult); // finalEggView ~ eggView ~ lastView
            // ==================

            // tumblingLength = tumbleViewList.length + Util.random(2, maxTumbling);
            if (eggWinInfo.winMoney == 0) {
                break;
            }
        }
    }

    // console.log(`[Sven] Base TumbleMoney: ${tumbleWinMoney}`)

    return {
        viewList: tumbleViewList,
        tumbleWinMoney: tumbleWinMoney
    };
};

var RandomScatterView = function (reels, bpl) {

    while (true) {
        var view = RandomView(reels);
        if (isFreeSpinWin(view) && WinFromView(view, bpl).winMoney == 0) {
            return view;
        }
    }

};

var RandomFreeViewCache = function (reels, bpl, startSize, startMulti) {
    var tumbleWinMoney = 0;
    var tumbleViewList = [];

    // Origin View
    var originView = null;
    while (true) {
        originView = RandomView(reels);
        if (!isFreeSpinWin(originView)) {
            break;
        }
    }

    var originWinInfo = WinFromView(originView, bpl);

    tumbleWinMoney += originWinInfo.winMoney;

    // ==================
    tumbleViewList.push(originView);
    // ==================

    var eggSize = 1, eggMulti = 1;
    var upgradedEggSize = startSize, upgradedEggMulti = startMulti;

    if (originWinInfo.winMoney == 0 && originWinInfo.tumbling.length == 0) {
        //                                                                                                   
        eggSize = upgradedEggSize;
        eggMulti = upgradedEggMulti;

        var lastView = tumbleViewList[tumbleViewList.length - 1];
        var eggView = RandomEggView_New(lastView, eggSize, eggMulti);

        var eggWinInfo = WinFromView(eggView, bpl);

        tumbleWinMoney += eggWinInfo.winMoney;

        var finalEggView = GetFinalEggView(eggView, lastView);
        var eggViewResult = finalEggView.concat(eggView, lastView);

        // ==================
        tumbleViewList.push(eggViewResult); // finalEggView ~ eggView ~ lastView
        // ==================

        if (eggWinInfo.winMoney == 0) {
            return {
                tumbleViewList,
                tumbleWinMoney,
                upgradedInfo: {
                    eggSize: upgradedEggSize,
                    eggMulti: upgradedEggMulti
                }
            };
        }
    }

    // var tumblingLength = Util.random(1, maxTumbling);

    //                   
    while (true) {

        var lastView = tumbleViewList[tumbleViewList.length - 1];

        if (lastView.length > slotWidth * slotHeight) {
            lastView = lastView.slice(0, slotWidth * slotHeight);
        }

        var lastWinInfo = WinFromView(lastView, bpl);

        var lastTumbling = Util.clone(lastWinInfo.tumbling);

        // ================================ Hit Leaf And Copper 10%
        var isSizeUpgrade = false, isMultiUpgrade = false;

        if (upgradedEggSize < 6 && Util.probability(5)) {
            isSizeUpgrade = true;
        }
        if (upgradedEggMulti < 11 && Util.probability(20)) {
            isMultiUpgrade = true;
        }
        // ================================

        var nextView = null;
        var nextWinInfo = null;

        while (true) {

            nextView = GetTumbleView_New(reels, lastView, lastTumbling, isSizeUpgrade, isMultiUpgrade);

            if (!isFreeSpinWin(nextView)) {
                nextWinInfo = WinFromView(nextView, bpl);
                break;
            }

        }

        // ==================
        tumbleViewList.push(nextView);
        // ==================
        tumbleWinMoney += nextWinInfo.winMoney;


        // ================== Upgrade
        var upgrades = GetEggUpgrades(nextView);
        upgradedEggSize += upgrades.sizeUpgrades.length;
        upgradedEggMulti += upgrades.multiUpgrades.length;
        // ==================


        if (nextWinInfo.winMoney == 0 && nextWinInfo.tumbling.length == 0) {
            //           ,                                                           
            if (upgradedEggSize == eggSize && upgradedEggMulti == eggMulti) {
                break;
            }

            eggSize = upgradedEggSize;
            eggMulti = upgradedEggMulti;
            var lastViewForEgg = tumbleViewList[tumbleViewList.length - 1];

            var eggView = RandomEggView_New(lastViewForEgg, eggSize, eggMulti);

            // ==================
            var eggWinInfo = WinFromView(eggView, bpl);
            // ==================

            tumbleWinMoney += eggWinInfo.winMoney;

            var finalEggView = GetFinalEggView(eggView, lastViewForEgg);
            var eggViewResult = finalEggView.concat(eggView, lastViewForEgg);

            // ==================
            tumbleViewList.push(eggViewResult); // finalEggView ~ eggView ~ lastView
            // ==================

            // tumblingLength = tumbleViewList.length + Util.random(2, maxTumbling);
            if (eggWinInfo.winMoney == 0) {
                break;
            }
        }
    }



    return {
        tumbleViewList,
        tumbleWinMoney,
        upgradedInfo: {
            eggSize: upgradedEggSize,
            eggMulti: upgradedEggMulti
        }
    };
};

var GetFinalView = function (multiView) {
    var view = Util.clone(multiView);
    var eggMulti = 1;
    for (var i = 0; i < view.length; i++) {
        if (multiView[i] > 100) {
            view[i] = multiView[i] % 100;
            var multi = Math.floor(multiView[i] / 100);
            if (multi > eggMulti) {
                eggMulti = multi;
            }
        }
    }

    var rwd = [], eggSymbol;
    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (multiView[pos] > 100 * eggMulti) {
                rwd.push(pos);
                eggSymbol = multiView[pos] % 100;
            }
        }
    }
    // srf
    return {
        view: view,
        multi: eggMulti,
        rwd: rwd,
        symbol: eggSymbol
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
    var winLines = [];
    var tumbling = [];
    var winLineIndex = 0;
    var winMoney = 0;
    try {
        var length = view.length;
    } catch (e) {
        return 0;
    }

    for (var i = 0; i < view.length; i++) {
        if (tumbling.indexOf(i) < 0) {
            var line = [i];
            var symbolId = view[i] % 100;
            RecursiveSearch(view, i, line, symbolId);

            var matchCount = line.length;
            var money = payTable[matchCount][symbolId] * bpl;
            if (money > 0) {
                var multi = 1;
                for (var j = 0; j < matchCount; j++) {
                    var pos = line[j];
                    var symbolMulti = Math.floor(view[pos] / 100);
                    if (symbolMulti > multi) {
                        multi = symbolMulti;
                    }
                }

                money *= multi;

                winLines.push(`${winLineIndex++}~${money}~${line.join('~')}`);
                for (var i = 0; i < line.length; i++) {
                    if (tumbling.indexOf(line[i]) < 0) {
                        tumbling.push(line[i]);
                    }
                }
            }

            winMoney += money;
        }
    }

    //                                                                        
    var upgrades = GetEggUpgrades(view);
    for (var i = 0; i < upgrades.sizeUpgrades.length; i++) {
        tumbling.push(upgrades.sizeUpgrades[i]);
    }
    for (var i = 0; i < upgrades.multiUpgrades.length; i++) {
        tumbling.push(upgrades.multiUpgrades[i]);
    }

    return { winMoney, winLines, tumbling };
};

var RecursiveSearch = function (view, pos, line, symbolId) {
    //                                                         
    var newPositions = [];
    var x = pos % slotWidth;
    var y = Math.floor(pos / slotWidth);
    if (x < slotWidth - 1) {
        var newPos = (x + 1) + slotWidth * y;
        newPositions.push(newPos);
    }
    if (y < slotHeight - 1) {
        var newPos = x + slotWidth * (y + 1);
        newPositions.push(newPos);
    }
    if (x > 0) {
        var newPos = (x - 1) + slotWidth * y;
        newPositions.push(newPos);
    }
    if (y > 0) {
        var newPos = x + slotWidth * (y - 1);
        newPositions.push(newPos);
    }

    for (var i = 0; i < newPositions.length; i++) {
        var nextPos = newPositions[i];
        var symbol = view[nextPos] % 100;
        if (symbol == symbolId) {
            if (line.indexOf(nextPos) < 0) {
                line.push(nextPos);
                RecursiveSearch(view, nextPos, line, symbolId);
            }
        }
    }
};

var GetEggUpgrades = function (view) {
    var sizeUpgradeArr = [], multiUpgradeArr = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == sizeUpgradeSymbol) {
            sizeUpgradeArr.push(i);
        }
        if (view[i] == multiUpgradeSymbol) {
            multiUpgradeArr.push(i);
        }
    }
    return {
        sizeUpgrades: sizeUpgradeArr,
        multiUpgrades: multiUpgradeArr
    };
};

var GetTumbles = function (view, tumbling) {
    var tumbles = [];
    for (var i = 0; i < tumbling.length; i++) {
        var tumblePos = tumbling[i];
        if (view[tumblePos] == scatter) {
            continue;
        }
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    return tumbles;
};

var GetTumbleView = function (view, tumbles, size = false, multi = false) {
    if (tumbles.length == 0) {
        return view;
    }

    var tumbleView = Util.clone(view);

    while (true) {
        //           
        for (var i = 0; i < slotWidth; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                //                                    
                if (tumbles.indexOf(pos) >= 0) {
                    for (var k = j - 1; k >= 0; k--) {
                        tumbleView[i + (k + 1) * slotWidth] = tumbleView[i + k * slotWidth];
                    }
                    tumbleView[i] = -1;
                }
            }
        }
        var positions = [];
        var randomView = RandomView(freeReels);
        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
                positions.push(i);
            }
        }
        Util.shuffle(positions);

        if (size && multi && positions.length > 1) {
            tumbleView[positions[0]] = sizeUpgradeSymbol;
            tumbleView[positions[1]] = multiUpgradeSymbol;
        } else if (size && positions.length > 1) {
            tumbleView[positions[0]] = sizeUpgradeSymbol;
        } else if (multi && positions.length > 1) {
            tumbleView[positions[0]] = multiUpgradeSymbol;
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

var GetTumbleView_New = function (reels, view, tumbles, size = false, multi = false) {

    if (tumbles.length == 0) {
        return view;
    }

    var tumbleView = Util.clone(view);

    while (true) {
        //           
        for (var i = 0; i < slotWidth; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                //                                    
                if (tumbles.indexOf(pos) >= 0) {
                    for (var k = j - 1; k >= 0; k--) {
                        tumbleView[i + (k + 1) * slotWidth] = tumbleView[i + k * slotWidth];
                    }
                    tumbleView[i] = -1;
                }
            }
        }
        var positions = [];
        var randomView = RandomView(reels);
        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
                positions.push(i);
            }
        }
        Util.shuffle(positions);

        if (size && multi && positions.length > 1) {
            tumbleView[positions[0]] = sizeUpgradeSymbol;
            tumbleView[positions[1]] = multiUpgradeSymbol;
        } else if (size && positions.length > 1) {
            tumbleView[positions[0]] = sizeUpgradeSymbol;
        } else if (multi && positions.length > 1) {
            tumbleView[positions[0]] = multiUpgradeSymbol;
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

var GetRandomEggTumbleView = function (view, tumbles, size, multi) {
    if (size == "yes") {
        size = true;
    } else if (size == "no") {
        size = false;
    } else {
        size = Util.probability(25);
    }

    if (multi == "yes") {
        multi = true;
    } else if (multi == "no") {
        multi = false;
    } else {
        multi = Util.probability(20);
    }

    return GetTumbleView(view, tumbles, size, multi);
};

var RandomEggView_New = function (view, _eggSize, _eggMulti) {
    var symbolArr = [3, 4, 5, 6, 7, 8, 9];

    var eggSize = _eggSize;
    var eggMulti = _eggMulti;

    if (eggSize == 0) {
        eggSize = 1;
    }

    var noScatterChange = false;
    //        2                                                       .                                  .
    if (eggSize == 2) {
        noScatterChange = true;
    }

    var positions = [];
    for (var i = 0; i < slotWidth - eggSize + 1; i++) {
        for (var j = 0; j < slotHeight - eggSize + 1; j++) {
            var pos = i + j * slotWidth;
            positions.push(pos);
        }
    }

    Util.shuffle(positions);

    for (var posId = 0; posId < positions.length; posId++) {

        var pos = positions[posId];
        var i = pos % slotWidth;
        var j = Math.floor(pos / slotWidth);

        if (noScatterChange) {
            var scatterInvolved = false;
            for (var k = i; k < i + eggSize; k++) {
                for (var l = j; l < j + eggSize; l++) {
                    var pos = k + l * slotWidth;
                    if (view[pos] == scatter) {
                        scatterInvolved = true;
                        break;
                    }
                }
            }
            if (scatterInvolved) {
                continue;
            }
        }

        Util.shuffle(symbolArr);

        var eggView = Util.clone(view);
        var symbol = symbolArr[0];

        for (var k = i; k < i + eggSize; k++) {
            for (var l = j; l < j + eggSize; l++) {
                var pos = k + l * slotWidth;
                eggView[pos] = symbol + eggMulti * 100;
            }
        }

        return eggView;

    }

};

var GetFinalEggView = function (eggView, maskView) {
    var finalEggView = Util.clone(eggView);
    for (var i = 0; i < maskView.length; i++) {
        if (isScatter(maskView[i])) {
            finalEggView[i] = scatter;
        }
    }
    return finalEggView;
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

var isScatter = function (symbol) {
    return symbol == scatter;
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 7: return totalBet * 100;
        case 6: return totalBet * 20;
        case 5: return totalBet * 5;
        case 4: return totalBet * 3;
    }
    return 0;
};

var GetFreeSpinCountFromView = function (view) {
    switch (NumberOfScatters(view)) {
        case 7: return 20;
        case 6: return 20;
        case 5: return 15;
        case 4: return 10;
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
}

module.exports = SlotMachine;