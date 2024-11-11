var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    this.freeSpinCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.wildStickStr = null;
    this.misteryStr = [];
    this.freespinRwd = [];
    this.misterySymbol = 0;

    this.bonusSpinLength = 0;
    this.bonusCacheList = [];
    this.bonusSpinIndex = 0;
    this.bonusSpinLevel = 0;
    this.rsb_cIndex = 0;
    this.rsb_w = [];
    this.bonusMo_T = [];
    this.bonusMo = [];
    this.rs_s = [];
    this.isView = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"

    this.buyMulti = 100;
    this.buyPatternCount = 30;
};

var scatter = 1, empty = 20;
var wild = 2, freeWild = 19, freeMistery = 12;
var slotWidth = 5, slotHeight = 5;
var winLines = [];
var baseReels = [
    [9, 10, 11, 3, 3, 3, 3, 9, 10, 8, 6, 10, 4, 9, 8, 5, 9, 10, 8, 4, 10, 9, 6, 11, 4, 10, 9, 3, 6, 9, 4, 10, 4, 11, 9, 7, 5, 8, 9, 10, 6, 3, 10],
    [5, 9, 8, 5, 7, 9, 5, 8, 9, 6, 7, 11, 8, 2, 11, 8, 7, 9, 11, 7, 7, 6, 8, 9, 5, 11, 6, 9, 8, 11, 7, 8, 5, 6, 10, 6, 9, 5, 9, 8, 5, 7, 11, 5, 8, 9, 6, 7, 11, 8, 7, 11, 8, 11, 9, 11, 7, 7, 6, 8, 9, 5, 11, 6, 9, 7, 11, 3, 4, 5, 6, 11, 6, 9, 5, 9, 8, 5, 7, 9, 5, 8, 9, 6, 7, 11, 8, 3, 11, 8, 7, 9, 11, 7, 7, 6, 8, 9, 5, 11, 6, 9, 8, 11, 7, 8, 5, 6, 10, 6, 9, 5, 9, 8, 5, 7, 11, 5, 8, 9, 6, 7, 11, 8, 7, 11, 8, 11, 9, 11, 7, 7, 6, 8, 9, 5, 11, 6, 9, 7, 11, 3, 4, 5, 6, 11, 6, 9],
    [7, 11, 8, 6, 11, 10, 5, 7, 3, 11, 4, 7, 11, 3, 4, 5, 4, 10, 11, 3, 8, 10, 4, 8, 5, 10, 7, 2, 10, 7, 11, 5, 10, 4, 7, 10, 8, 7, 11, 8, 6, 11, 10, 5, 7, 8, 11, 4, 7, 11, 3, 4, 5, 4, 11, 11, 3, 8, 10, 4, 8, 5, 10, 7, 9, 10, 7, 11, 8, 10, 4, 7, 10, 8],
    [11, 10, 7, 6, 10, 11, 6, 9, 3, 3, 3, 3, 9, 7, 4, 9, 7, 6, 7, 4, 11, 6, 10, 2, 8, 7, 3, 4, 5, 6, 11, 2, 10, 7, 10, 6, 9, 2, 9, 7, 4, 6, 11, 10, 7, 6, 10, 11, 6, 9, 7, 11, 3, 10, 9, 7, 4, 9, 7, 6, 7, 4, 11, 6, 10, 9, 8, 7, 3, 4, 5, 6, 11, 10],
    [6, 10, 11, 3, 3, 3, 3, 9, 10, 7, 11, 10, 5, 8, 6, 10, 9, 4, 8, 5, 9, 10, 8, 9, 6, 7, 8, 3, 3, 9, 8, 5, 10, 9, 7, 8, 9, 6, 10, 5, 8, 4, 7, 11, 4, 8, 10, 5, 7, 6, 9, 7, 5, 11, 6, 7, 4, 8, 11, 7, 5, 9, 11, 10]
];
var freeReels = [
    [7, 6, 9, 8, 12, 6, 3, 3, 3, 3, 3, 3, 3, 3, 7, 4, 11, 13, 7, 13, 13, 8, 10, 10, 10, 8, 6, 11, 9, 6, 12, 11, 4, 7, 8, 13, 4, 11, 13, 5, 13, 13, 6, 7, 9, 7, 6, 8, 8, 9, 11, 12, 5, 11, 10, 10, 5, 5, 10, 12, 7, 4, 6, 13, 4, 8, 4, 5, 9, 13, 11, 13, 13, 12, 12, 10, 9, 13, 10, 9, 10, 8, 8, 10, 11, 13, 10, 8, 13, 12, 12, 6, 4, 7, 6, 6, 4, 9, 8, 8, 5, 13, 13, 10, 13, 7, 10, 10, 7, 9, 4, 13, 13, 10, 13, 8, 4, 6, 4, 11, 5, 9, 6, 5, 5, 7, 11, 8, 9, 9, 11, 11, 10, 11, 13, 6, 7, 8, 11, 11, 7, 11, 12, 10, 7, 10, 7, 5, 5, 13, 10, 13, 8, 5, 10, 4, 7, 5, 6, 10, 5, 8, 12, 9, 12, 12, 10, 4, 11, 13, 10, 13, 7, 3, 3, 3, 3, 3, 3, 3, 3, 9, 8, 4, 8, 11, 13, 10, 6, 5, 4, 11, 7, 6, 8, 8, 12, 6, 12, 5, 10, 7, 10, 6, 8, 13, 6, 9, 4, 8, 12, 11, 4, 6, 10, 5, 7, 9, 11, 5, 6, 5, 7, 4, 8, 11, 11, 6, 7, 5, 8, 4, 5, 11, 8, 8, 10, 7, 4, 9, 8, 5, 4, 12, 10, 8, 4, 5, 4, 13, 8, 13, 10, 4, 10, 12, 8, 9, 11, 9, 4, 8, 11, 5, 13, 4, 11, 11, 12, 7, 10, 13],
    [6, 11, 6, 8, 4, 11, 3, 3, 3, 3, 3, 3, 3, 3, 11, 6, 7, 9, 6, 11, 8, 2, 6, 10, 10, 13, 6, 6, 13, 7, 13, 6, 10, 12, 2, 5, 13, 7, 4, 5, 6, 5, 5, 4, 5, 7, 9, 4, 10, 9, 9, 8, 5, 12, 12, 5, 13, 13, 8, 7, 9, 13, 6, 6, 11, 8, 13, 5, 8, 7, 6, 11, 8, 4, 11, 4, 8, 12, 7, 11, 10, 13, 13, 10, 13, 10, 9, 5, 12, 7, 8, 9, 5, 9, 12, 7, 9, 6, 6, 8, 12, 12, 10, 10, 5, 4, 11, 4, 4, 11, 11, 12, 5, 2, 12, 4, 7, 4, 8, 9, 12, 10, 12, 5, 8, 11, 5, 12, 6, 11, 6, 13, 13, 12, 13, 7, 5, 10, 12, 7, 12, 7, 4, 10, 5, 11, 9, 6, 11, 6, 9, 11, 9, 11, 13, 5, 7, 4, 13, 5, 13, 13, 2, 8, 5, 7, 13, 11, 11, 9, 13, 10, 10, 3, 3, 3, 3, 3, 3, 3, 3, 6, 4, 10, 8, 5, 13, 4, 6, 13, 8, 13, 12, 13, 13, 12, 11, 2, 11, 5, 7, 6, 9, 2, 10, 8, 12, 10, 4, 12, 8, 11, 13, 13, 11, 2, 9, 9, 8, 13, 9, 4, 10, 5, 9, 10, 12, 5, 4, 2, 9, 7, 13, 6, 13, 7, 9, 5, 10, 5, 6, 11, 12, 11, 9, 11, 6, 11, 5, 2, 4, 4, 9, 8, 4, 11, 11, 9, 5, 4, 12, 2, 6, 9, 13, 4, 6, 10, 4, 7, 5, 13],
    [10, 8, 13, 10, 12, 4, 3, 3, 3, 3, 3, 3, 3, 3, 12, 6, 8, 13, 13, 12, 12, 2, 7, 5, 10, 13, 9, 5, 9, 6, 13, 5, 10, 8, 6, 13, 13, 4, 11, 4, 8, 12, 12, 13, 12, 8, 9, 13, 6, 7, 5, 9, 13, 7, 11, 12, 10, 10, 12, 11, 11, 6, 9, 4, 6, 6, 13, 11, 5, 13, 13, 9, 11, 9, 7, 4, 12, 5, 10, 4, 10, 11, 11, 13, 6, 12, 13, 12, 7, 11, 7, 13, 8, 7, 13, 13, 13, 8, 5, 12, 12, 4, 9, 9, 9, 7, 11, 6, 4, 6, 8, 4, 7, 2, 11, 5, 10, 8, 11, 12, 12, 6, 6, 5, 9, 9, 10, 7, 5, 6, 10, 6, 9, 12, 7, 13, 12, 4, 5, 5, 5, 10, 9, 4, 5, 4, 7, 5, 12, 10, 12, 11, 11, 12, 6, 6, 12, 6, 6, 4, 6, 11, 2, 9, 10, 8, 7, 11, 11, 13, 9, 10, 13, 3, 3, 3, 3, 3, 3, 3, 3, 7, 6, 13, 12, 11, 13, 4, 7, 11, 13, 13, 4, 13, 4, 7, 12, 2, 9, 7, 10, 12, 7, 2, 5, 10, 12, 5, 10, 12, 6, 11, 7, 11, 6, 2, 7, 7, 9, 12, 5, 8, 5, 13, 11, 6, 12, 9, 6, 7, 8, 10, 8, 10, 11, 12, 10, 8, 8, 12, 7, 10, 13, 5, 4, 12, 6, 11, 12, 2, 12, 10, 5, 8, 9, 9, 7, 6, 8, 7, 5, 2, 7, 10, 12, 12, 6, 9, 8, 11, 10, 13],
    [13, 9, 8, 13, 12, 6, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 8, 7, 10, 10, 4, 8, 11, 11, 9, 10, 13, 10, 5, 7, 4, 10, 8, 13, 7, 4, 11, 6, 5, 11, 8, 12, 10, 12, 9, 11, 8, 8, 12, 11, 7, 9, 9, 10, 6, 7, 13, 13, 7, 8, 4, 12, 5, 8, 13, 13, 8, 7, 9, 6, 9, 9, 11, 11, 12, 6, 6, 12, 8, 4, 11, 7, 12, 6, 5, 5, 11, 12, 12, 13, 8, 8, 5, 10, 6, 6, 12, 8, 10, 8, 11, 9, 9, 9, 13, 10, 9, 13, 12, 11, 7, 13, 13, 2, 11, 7, 6, 6, 11, 5, 12, 11, 10, 8, 4, 4, 12, 4, 8, 8, 10, 7, 6, 7, 9, 7, 6, 5, 4, 7, 7, 8, 7, 5, 12, 11, 9, 7, 4, 6, 6, 9, 11, 10, 8, 6, 12, 12, 10, 10, 4, 10, 2, 13, 12, 7, 4, 10, 6, 13, 13, 4, 13, 3, 3, 3, 3, 3, 3, 3, 3, 10, 11, 4, 5, 9, 13, 5, 6, 5, 4, 5, 13, 9, 6, 12, 12, 2, 9, 9, 13, 13, 5, 2, 13, 13, 8, 11, 10, 9, 12, 10, 9, 13, 7, 2, 5, 5, 8, 10, 7, 9, 13, 13, 5, 12, 10, 7, 4, 2, 4, 13, 5, 4, 12, 8, 7, 10, 10, 5, 11, 12, 11, 11, 5, 13, 12, 11, 12, 2, 8, 13, 6, 13, 11, 11, 4, 10, 5, 4, 5, 2, 6, 10, 13, 12, 6, 5, 4, 11, 10, 13],
    [13, 4, 9, 6, 6, 12, 3, 3, 3, 3, 3, 3, 3, 3, 5, 7, 13, 4, 7, 11, 10, 12, 12, 5, 6, 5, 5, 8, 12, 11, 6, 5, 4, 8, 5, 7, 12, 7, 9, 6, 11, 9, 11, 12, 9, 13, 8, 8, 13, 10, 7, 13, 6, 5, 9, 7, 12, 6, 7, 4, 6, 8, 10, 12, 13, 7, 12, 7, 12, 9, 13, 12, 10, 6, 7, 10, 4, 5, 8, 8, 9, 13, 5, 5, 10, 13, 11, 6, 11, 9, 7, 4, 13, 7, 10, 12, 8, 12, 13, 13, 8, 11, 13, 5, 6, 6, 6, 13, 12, 10, 9, 11, 12, 13, 8, 12, 7, 12, 10, 6, 13, 5, 8, 9, 12, 9, 12, 12, 6, 10, 5, 13, 13, 4, 12, 6, 4, 8, 9, 6, 12, 10, 11, 11, 10, 10, 12, 6, 5, 13, 11, 7, 8, 13, 11, 10, 6, 12, 9, 10, 10, 9, 4, 5, 11, 13, 10, 6, 8, 5, 5, 10, 12, 8, 4, 9, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 6, 13, 12, 12, 9, 11, 10, 4, 13, 12, 11, 9, 13, 10, 13, 6, 13, 8, 10, 11, 5, 11, 13, 7, 8, 8, 4, 8, 12, 8, 13, 11, 8, 9, 6, 4, 9, 6, 12, 5, 13, 7, 7, 11, 8, 13, 13, 9, 8, 12, 11, 12, 7, 7, 9, 10, 8, 12, 7, 11, 5, 9, 10, 7, 4, 11, 5, 10, 4, 12, 11, 8, 12, 13, 10, 7, 13, 10, 11, 13, 8, 11, 9, 13, 4, 11, 10, 4, 11, 10, 13]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 20, 15, 10, 8, 6, 6, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 40, 25, 20, 10, 8, 8, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 100, 50, 40, 20, 15, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 60; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.bonusSpinLength = viewCache.bonusView.length;
        this.bonusCacheList = viewCache.bonusView;
        this.freeSpinCacheList = cache.viewList;
        this.view = this.bonusCacheList[0].resultView;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   
    if (isBonusView(this.view)) {
        this.currentGame = "BONUS";
        var initBonus = this.bonusCacheList[0];
        this.bonusSpinIndex = 1;
        this.rs_s = initBonus.rs_s;
        this.rsb_w = initBonus.rsb_w;
        this.bonusMo_T = initBonus.mo_t;
        this.bonusMo = initBonus.mo;
        this.isView = initBonus.isView;
        this.freeSpinWinMoney = this.winMoney;
    }

};

SlotMachine.prototype.FreeSpin = function (player) {
    var freeCache = this.freeSpinCacheList[this.freeSpinIndex];
    // isView: view, //                     
    // sView: resultView //                        

    this.view = freeCache.sView;
    this.isView = freeCache.isView;

    if (this.freeSpinIndex == this.freeSpinLength - 1) {
        var styStr = GetStickWildStr(this.view, true);
    } else {
        var styStr = GetStickWildStr(this.view, false);
    }

    this.wildStickStr = styStr;

    if (this.freeSpinIndex > 1) {
        var misterySym = GetMisterySymbolPos(this.isView, freeCache.misSym);
        this.misterySymbol = misterySym.sym;
        this.misteryStr = misterySym.misteryPos;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength - 1) {
        this.isSuperFreeSpin = false;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    var initBonus = this.bonusCacheList[this.bonusSpinIndex];

    if (this.bonusSpinIndex != 1) {
        var preView = this.bonusCacheList[this.bonusSpinIndex - 1];
        if (Util.view2String(preView.rs_s) == Util.view2String(initBonus.rs_s)) {
            this.bonusSpinLevel += 1;
        } else {
            this.bonusSpinLevel = 0;
        }
    }

    this.rs_s = initBonus.rs_s;
    this.rsb_w = initBonus.rsb_w;
    this.freespinRwd = this.rsb_w;
    this.bonusMo_T = initBonus.mo_t;
    this.bonusMo = initBonus.mo;

    this.bonusSpinIndex++;
    this.winMoney = 0;

    if (this.bonusSpinIndex >= this.bonusSpinLength) {
        this.freeSpinIndex = 0;
        this.freeSpinLength = this.freeSpinCacheList.length;
        this.currentGame = "FREE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {

    if (baseWin > 0) {
        var { tmpView, tmpWin } = RandomWinView(baseReels, bpl, baseWin);
    } else {
        var { tmpView, tmpWin } = RandomZeroView(baseReels, bpl);
    }
    tmpWin = WinFromView(tmpView, bpl);

    var pattern = {
        view: tmpView,
        win: tmpWin,
        type: "BASE",
        bpl: bpl,
    };
    return pattern;
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = [];

    scatterView = GenerateFreeSpinDetail(baseReels, bpl);

    var freeSet = scatterView.freeSet;
    //                                 
    var freeSpinData = {
        viewList: [],
    };
    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSet);

    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterView.scatterWin,
        bonusView: scatterView.bonusView,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
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
            return;
    }
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = [];

    scatterView = GenerateFreeSpinDetail(baseReels, bpl, isBuyBonus = true);

    var freeSet = scatterView.freeSet;
    //                                 
    var freeSpinData = {
        viewList: [],
    };
    //                           
    var cache = BuyBonusViewCache(freeReels, bpl, freeSet);

    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterView.scatterWin,
        bonusView: scatterView.bonusView,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0,
    };
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
    return { tmpView, tmpWin };
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
    return { tmpView, tmpWin };
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

        if (!isFreeSpinWin(view) && !CheckCornerSymbols(view)) {
            break;
        }
    }

    var pos = [21, 22, 23];
    for (var i = 0; i < pos.length; i++) {
        view[pos[i]] = empty;
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsSet) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(baseReels, bpl, fsSet)

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

var BuyBonusViewCache = function (reels, bpl, fsSet) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    freeSpinData.viewList = [];
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsSet.freeLen,
        freeWildNum = fsSet.wildCount,
        freeMisterNum = fsSet.misteryCount;

    //                                  
    var wildPos = [];
    while (true) {
        var prevWildPos = [0, 5, 10, 15];
        wildPos = [];

        for (var i = 0; i < freeWildNum; i++) {
            while (true) {
                var randWildPos = Util.random(0, 21);
                if (prevWildPos.indexOf(randWildPos) == -1) {
                    prevWildPos.push(randWildPos);
                    wildPos.push(randWildPos);
                    break;
                }
            }
        }

        var noWildReelCount = 0;
        for (var j = 0; j < slotWidth; ++j) {
            var hasWild = 0;

            for (var k = 0; k < slotHeight; ++k) {
                if (wildPos.indexOf(j + k * slotWidth) >= 0) {
                    hasWild = 1;
                    break;
                }
            }

            if (!hasWild) {
                ++noWildReelCount;
            }
        }

        if (noWildReelCount >= 2) {
            break;
        }
    }
    //                    
    while (true) {
        //                 
        var fsView, fsWin;

        if (freeSpinIndex > 2 && freeMisterNum != 0) {
            fsView = GenerateFreeMisteryView(wildPos);
            fsWin = WinFromView(fsView.sView, bpl);
        } else {
            fsView = GenerateFreeWildView(wildPos);
            fsWin = WinFromView(fsView.sView, bpl);
        }

        freeSpinData.viewList.push(fsView);

        freeSpinWinMoney += fsWin;

        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            freeSpinData.win = freeSpinWinMoney;
            break;
        }
    }

    return freeSpinData;
}

var GenerateFreeSpinDetail = function (baseReels, bpl, isBuyBonus = false) {
    var wildCount = 0, //                 
        freeLen = 0, //                    
        misteryCount = 0, //                          
        multiVal = 0; //          

    var initRSS = [],  //                                       
        initMO_T = [],  //                    
        initMO = [],  // ....
        initView = [],  //          
        resultView = [], //             
        rsb_w = [0, 0, 0, 1],
        bonusSpinIndex = 3,
        bonusSpinLen = 3,
        scatterWin = 0,
        isFirstBonus = false;

    var bonusViewList = [];

    //          
    for (var i = 0; i < slotHeight * slotWidth; i++) {
        initRSS.push(13);
        initMO.push(0);
        initMO_T.push("r");
    }
    //                 
    while (true) {
        initView = RandomView(baseReels);
        scatterWin = WinFromView(initView, bpl);
        if (scatterWin == 0) {
            break;
        } else {
            continue;
        }
    }

    resultView = [...initView];
    //                   
    var pos = [0, 4, 20, 24];
    for (var i = 0; i < pos.length; i++) {
        resultView[pos[i]] = scatter;
    }
    //                
    var initPos = [21, 22, 23];
    for (var i = 0; i < initPos.length; i++) {
        initRSS[initPos[i]] = empty;
    }

    var initBonusCView = {
        isView: [...initView],
        resultView: [...resultView],
        mo_t: [...initMO_T],
        mo: [...initMO],
        rs_s: [...initRSS],
        rsb_w: [...rsb_w],
    }

    bonusViewList = [initBonusCView]; //                

    var maxMisteryCount = Util.random(12, 22);
    var posList = [21, 22, 23];
    while (true) {
        var maskArr = ['wd', 'ms', 'fs', 'm'];

        isFirstBonus = true;

        if (posList.length < 12 && (Util.probability(22) || isFirstBonus)) {
            //                          
            var spinPerNum = Util.random(1, 4);

            //                                  
            var newPosList = [];
            for (var i = 0; i < spinPerNum; i++) {
                while (true) {
                    var randpos = Util.random(0, 25);
                    if (posList.indexOf(randpos) == -1) {
                        posList.push(randpos);
                        newPosList.push(randpos);
                        break;
                    }
                }
            }

            //                                                      isFirstBonus ? 2 :
            for (var i = 0; i < newPosList.length; i++) {

                if (freeLen > 5) {
                    if (misteryCount < maxMisteryCount) {
                        var randomAdditionValue = maskArr[1]; //                    
                    } else if (wildCount < 2) {
                        var randomAdditionValue = maskArr[0]; //                 
                    } else {
                        var randomAdditionValue = maskArr[Util.random(0, 3)]; //              
                    }
                } else {
                    var randomAdditionValue = maskArr[Util.random(0, 3)]; //                    
                }

                switch (randomAdditionValue) {
                    case 'wd': //                  
                        var wildNum = Util.random(1, 3);
                        rsb_w[0] += wildNum;
                        initMO_T[newPosList[i]] = "wd";
                        initRSS[newPosList[i]] = 16;
                        initMO[newPosList[i]] = wildNum;
                        wildCount += wildNum;
                        break;
                    case 'ms': //                          
                        var msNum = Util.random(3, 6);
                        rsb_w[1] += msNum;
                        initMO_T[newPosList[i]] = "ms";
                        initRSS[newPosList[i]] = 17;
                        initMO[newPosList[i]] = msNum;
                        misteryCount += msNum;
                        break;
                    case 'fs': //                   
                        var fsNum = Util.random(1, 3);
                        rsb_w[2] += fsNum;
                        initMO_T[newPosList[i]] = "fs";
                        initRSS[newPosList[i]] = 15;
                        initMO[newPosList[i]] = fsNum;
                        freeLen += fsNum;
                        break;
                    default:
                        break;
                }
            }

            var bonusObj = {
                mo_t: [...initMO_T],
                mo: [...initMO],
                rs_s: [...initRSS],
                rsb_w: [...rsb_w],
                bonusIndex: bonusSpinIndex
            }

            bonusViewList.push(bonusObj);

            isFirstBonus = false;
            bonusSpinIndex = 3;
        } else {
            var bonusObj = {
                mo_t: [...bonusViewList[bonusViewList.length - 1].mo_t],
                mo: [...bonusViewList[bonusViewList.length - 1].mo],
                rs_s: [...bonusViewList[bonusViewList.length - 1].rs_s],
                rsb_w: [...bonusViewList[bonusViewList.length - 1].rsb_w],
                bonusIndex: bonusSpinIndex
            }

            bonusViewList.push(bonusObj);
        }

        if (isBuyBonus) {
            //                                                                    .
            if (wildCount < 3) {
                isFirstBonus = true;
            } else {
                if (freeLen < 4) {
                    isFirstBonus = true;
                } else {
                    bonusSpinIndex--;
                }
            }
        } else {
            if (freeLen < 5 || wildCount < 3) {
                isFirstBonus = true;
            } else {
                bonusSpinIndex--;
            }
        }

        bonusSpinIndex--;

        if (bonusSpinIndex == 1) {
            break;
        }
    }

    //                                      
    for (var i = 0; i < 3; i++) {
        bonusViewList.push(bonusViewList[bonusViewList.length - 1]);
    }


    var freeSpinObj = {
        wildCount: wildCount,
        freeLen: freeLen,
        misteryCount: misteryCount,
        multiVal: multiVal
    }

    return {
        freeSet: freeSpinObj,
        bonusView: bonusViewList,
        scatterWin: scatterWin
    }
}

//                          
var GenerateFreeWildView = function (wildPos) {
    var randWildPos = Util.clone(wildPos);

    var view = RandomView(baseReels);
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            view[i] = Util.random(3, 10);
        }
    }

    var resultView = [...view];



    for (var i = 0; i < randWildPos.length; i++) {
        resultView[randWildPos[i]] = freeWild;
    }

    return {
        isView: view, //                     
        sView: resultView //                        
    };
}

//                              
var GenerateFreeMisteryView = function (wildPos) {
    var misteryPos = [...wildPos], newMisteryPos = [];
    //                                                             
    var misterySymNum = Util.random(2, 4);

    for (var i = 0; i < misterySymNum; i++) {
        while (true) {
            var randMisPos = Util.random(0, 20);
            if (misteryPos.indexOf(randMisPos) == -1) {
                newMisteryPos.push(randMisPos);
                misteryPos.push(randMisPos);
                break;
            }
        }
    }

    var isView = GenerateFreeWildView(wildPos).sView;

    for (var i = 0; i < newMisteryPos.length; i++) {
        isView[newMisteryPos[i]] = freeMistery;
    }

    var resultView = [...isView];
    var randSymbol = Util.random(3, 10); //                                                    
    for (var i = 0; i < newMisteryPos.length; i++) {
        resultView[newMisteryPos[i]] = randSymbol;
    }

    return {
        isView: isView, //                              
        sView: resultView, //                     
        misSym: randSymbol
    }

};

var GetStickWildStr = function (view, isend) {
    var wildPos = [], rwdPos = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == freeWild) {
            if (isend) {
                wildPos.push([i, -1]);
            } else {
                rwdPos.push(`19~${i}`);
                wildPos.push([i, i]);
            }
        }
    }

    return {
        rwd: rwdPos.join(";"),
        wildPos: wildPos.join("~")
    }
}

//                                      
var GetMisterySymbolPos = function (view, symbol) {
    var misteryPos = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == freeMistery) {
            misteryPos.push(i);
        }
    }

    return {
        sym: symbol,
        misteryPos: misteryPos
    }
}

// [0, 4, 20, 24]                                                      
var CheckCornerSymbols = function (view) {
    var symbols = [3, 4, 5, 6];
    var cornerPos = [0, 4, 20, 24];
    var symCount = [0, 0, 0, 0];

    for (var i = 0; i < cornerPos.length; i++) {
        if (view[cornerPos[i]] == symbols[0]) {
            symCount[0]++;
        } else if (view[cornerPos[i]] == symbols[1]) {
            symCount[1]++;
        } else if (view[cornerPos[i]] == symbols[2]) {
            symCount[2]++;
        } else if (view[cornerPos[i]] == symbols[3]) {
            symCount[3]++;
        }
    }

    for (var i = 0; i < symCount.length; i++) {
        if (symCount[i] >= 4) {
            return true;
        }
    }
};

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    var searched = [false, false, false, false, false];
    //                                          

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (searched[i]) {
            continue;
        }

        var history = [pos];
        searched[i] = true;
        var symbolId = view[pos];
        var count = 1;

        for (var j = i + 1; j < slotHeight; j++) {
            var searchPos = j * slotWidth;
            if (view[searchPos] == symbolId && !searched[j]) {
                history.push(searchPos);
                searched[j] = true;
                count++;
            }
        }

        money += RecursiveSearch(view, bpl, 1, count, history, symbolId);

    }

    return money;
};

var RecursiveSearch = function (view, bpl, length, count, history, symbolId) {
    //                                                             
    if (symbolId == empty) {
        return 0;
    }
    //                                                              3~5000.00~1~4~2,6,8,10~l
    if (length == slotWidth) {
        var winMoney = bpl * payTable[length][symbolId] * count;
        if (winMoney > 0) {

            winLines.push(`${symbolId}~${winMoney}~${length}~${count}~${history.sort(function (a, b) { return a - b }).join()}~l`);
        }
        return winMoney;
    }


    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = length + i * slotWidth;
        //                                
        if (symbolId == wild) {
            positionsByStep.push(pos);
        } else {
            //                                          
            if (view[pos] == symbolId || isWild(view[pos])) {
                positionsByStep.push(pos);
            }
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var winMoney = bpl * payTable[length][symbolId] * count
        if (winMoney > 0) {

            winLines.push(`${symbolId}~${count}~${length}~${winMoney}~${history.sort(function (a, b) { return a - b }).join()}~1`);
        }
        return winMoney;
    }

    var matchCount = 0;
    var historyTmp = [...history];
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;

    return RecursiveSearch(view, bpl, length + 1, matchCount, historyTmp, symbolId, winLines);
};

var isWild = function (symbol) {
    return symbol == wild || symbol == freeWild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isBonusView = function (view) {
    var counter = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == scatter) {
            counter++;
        }
    }

    if (counter == 4) {
        return true;
    }
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

module.exports = SlotMachine;