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

    this.isView = [];
    this.rwd = "";

    this.freeRwd = [];
    this.fightState = [];
    this.isEndFight = false;

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.winMethod = "";

    //                                         
    this.multiPosition = [];
    this.slm_lmi = []; //                             
    this.slm_lmv = []; //                          
    this.styWildPos = []; //                                    
    this.isAlaadinBonus = false;
    this.bonusIndex = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var baseReels = [
    [7, 10, 3, 8, 11, 5, 13, 4, 12, 6, 9, 8, 10, 5, 13, 11, 8, 9, 4, 12, 7, 10, 13, 11, 8, 9, 6, 11, 8, 7, 12, 3, 10, 13, 8, 6, 10, 12, 5, 9, 8, 11, 7, 10, 6, 8, 13, 12, 7, 9, 11, 4, 10, 8, 12, 9, 6, 11, 8, 12, 3, 10, 8, 4, 11, 7, 9, 12, 5, 10, 11, 6, 8, 13, 9, 11, 8, 10, 7, 9, 11, 10, 5, 12, 8, 11, 6, 12, 9, 10, 7, 11, 10, 4],
    [3, 10, 11, 4, 12, 8, 5, 9, 12, 6, 8, 7, 11, 9, 6, 10, 12, 5, 8, 12, 4, 11, 9, 3, 10, 8, 6, 12, 7, 11, 4, 10, 6, 12, 8, 7, 12, 6, 10, 9, 4, 11, 12, 5, 11, 10, 6, 12, 9, 6, 12, 4, 11, 12, 7, 11, 9, 3, 10, 12, 5, 8, 11, 7, 12, 9, 6, 10, 11, 7],
    [4, 11, 10, 5, 12, 8, 7, 9, 5, 8, 10, 6, 11, 9, 7, 12, 10, 5, 8, 11, 3, 12, 9, 7, 11, 12, 7, 11, 10, 5, 8, 4, 9, 12, 6, 11, 9, 7, 12, 5, 8, 11, 3, 10, 9, 6, 12, 7, 8, 11, 5, 10, 7, 12, 4, 9, 7, 11, 6, 8, 12, 3, 10, 8, 4, 9, 11, 6, 12, 7, 11, 5, 8, 6, 12],
    [5, 12, 11, 6, 12, 10, 7, 11, 8, 4, 12, 9, 6, 11, 10, 7, 12, 11, 5, 9, 12, 7, 11, 10, 6, 8, 12, 3, 11, 10, 7, 12, 9, 6, 10, 11, 4, 8, 12, 7, 9, 11, 5, 12, 10, 6, 12, 8, 7, 9, 10, 5, 11, 7, 12, 9, 3, 11, 8, 6, 10, 12, 4, 11, 10],
    [7, 10, 5, 8, 11, 3, 14, 4, 12, 6, 9, 8, 10, 5, 14, 11, 8, 9, 4, 12, 7, 10, 14, 11, 8, 9, 6, 10, 8, 7, 12, 3, 11, 14, 10, 6, 8, 12, 5, 9, 8, 11, 7, 10, 6, 8, 14, 12, 7, 9, 11, 4, 10, 8, 10, 9, 6, 11, 9, 12, 3, 10, 8, 14, 11, 7, 9, 12, 5, 10, 11, 6, 8, 12, 14, 11, 8, 10, 7, 9, 14, 12, 5, 11, 8, 10, 6, 12, 9]
];
var sorcererReels = [
    [7, 10, 3, 8, 11, 5, 4, 12, 6, 9, 8, 10, 5, 11, 8, 9, 4, 12, 7, 10, 11, 8, 9, 6, 11, 8, 7, 12, 3, 10, 8, 6, 10, 12, 5, 9, 8, 11, 7, 10, 6, 8, 12, 7, 9, 11, 4, 10, 8, 12, 9, 6, 11, 8, 12, 3, 10, 8, 4, 11, 7, 9, 12, 5, 10, 11, 6, 8, 13, 9, 11, 8, 10, 7, 9, 11, 10, 5, 12, 8, 11, 6, 12, 9, 10, 7, 11, 10, 4],
    [3, 10, 11, 4, 12, 8, 5, 9, 12, 6, 8, 7, 11, 9, 6, 10, 12, 5, 8, 12, 4, 11, 9, 3, 10, 8, 6, 12, 7, 11, 4, 10, 6, 12, 8, 7, 12, 6, 10, 9, 4, 11, 12, 5, 11, 10, 6, 12, 9, 6, 12, 4, 11, 12, 7, 11, 9, 3, 10, 12, 5, 8, 11, 7, 12, 9, 6, 10, 11, 7],
    [4, 11, 10, 5, 12, 8, 7, 9, 5, 8, 10, 6, 11, 9, 7, 12, 10, 5, 8, 11, 3, 12, 9, 7, 11, 12, 7, 11, 10, 5, 8, 4, 9, 12, 6, 11, 9, 7, 12, 5, 8, 11, 3, 10, 9, 6, 12, 7, 8, 11, 5, 10, 7, 12, 4, 9, 7, 11, 6, 8, 12, 3, 10, 8, 4, 9, 11, 6, 12, 7, 11, 5, 8, 6, 12],
    [5, 12, 11, 6, 12, 10, 7, 11, 8, 4, 12, 9, 6, 11, 10, 7, 12, 11, 5, 9, 12, 7, 11, 10, 6, 8, 12, 3, 11, 10, 7, 12, 9, 6, 10, 11, 4, 8, 12, 7, 9, 11, 5, 12, 10, 6, 12, 8, 7, 9, 10, 5, 11, 7, 12, 9, 3, 11, 8, 6, 10, 12, 4, 11, 10],
    [7, 10, 5, 8, 11, 3, 14, 4, 12, 6, 9, 8, 10, 5, 14, 11, 8, 9, 4, 12, 7, 10, 14, 11, 8, 9, 6, 10, 8, 7, 12, 3, 11, 14, 10, 6, 8, 12, 5, 9, 8, 11, 7, 10, 6, 8, 14, 12, 7, 9, 11, 4, 10, 8, 10, 14, 9, 6, 11, 9, 12, 3, 10, 8, 14, 11, 7, 9, 12, 5, 10, 11, 6, 8, 12, 14, 11, 8, 10, 7, 9, 14, 12, 5, 11, 8, 10, 6, 12, 9]
];
var aladdinReels = [
    [13, 7, 10, 3, 8, 11, 5, 13, 4, 12, 6, 9, 8, 10, 5, 13, 11, 8, 9, 4, 12, 7, 10, 13, 11, 8, 9, 6, 11, 8, 7, 12, 3, 10, 13, 8, 6, 10, 12, 5, 9, 8, 11, 7, 10, 6, 8, 13, 12, 7, 9, 11, 4, 10, 8, 12, 9, 6, 11, 8, 12, 13, 3, 10, 8, 4, 11, 7, 9, 12, 5, 10, 11, 6, 8, 13, 9, 11, 8, 10, 7, 9, 11, 10, 5, 12, 8, 11, 6, 13, 12, 9, 10, 7, 11, 10, 4],
    [3, 10, 11, 4, 12, 8, 5, 9, 12, 6, 8, 7, 11, 9, 6, 10, 12, 5, 8, 12, 4, 11, 9, 3, 10, 8, 6, 12, 7, 11, 4, 10, 6, 12, 8, 7, 12, 6, 10, 9, 4, 11, 12, 5, 11, 10, 6, 12, 9, 6, 12, 4, 11, 12, 7, 11, 9, 3, 10, 12, 5, 8, 11, 7, 12, 9, 6, 10, 11, 7],
    [4, 11, 10, 5, 12, 8, 7, 9, 5, 8, 10, 6, 11, 9, 7, 12, 10, 5, 8, 11, 3, 12, 9, 7, 11, 12, 7, 11, 10, 5, 8, 4, 9, 12, 6, 11, 9, 7, 12, 5, 8, 11, 3, 10, 9, 6, 12, 7, 8, 11, 5, 10, 7, 12, 4, 9, 7, 11, 6, 8, 12, 3, 10, 8, 4, 9, 11, 6, 12, 7, 11, 5, 8, 6, 12],
    [5, 12, 11, 6, 12, 10, 7, 11, 8, 4, 12, 9, 6, 11, 10, 7, 12, 11, 5, 9, 12, 7, 11, 10, 6, 8, 12, 3, 11, 10, 7, 12, 9, 6, 10, 11, 4, 8, 12, 7, 9, 11, 5, 12, 10, 6, 12, 8, 7, 9, 10, 5, 11, 7, 12, 9, 3, 11, 8, 6, 10, 12, 4, 11, 10],
    [7, 10, 5, 8, 11, 3, 4, 12, 6, 9, 8, 10, 5, 11, 8, 9, 4, 12, 7, 10, 11, 8, 9, 6, 10, 8, 7, 12, 3, 11, 10, 6, 8, 12, 5, 9, 8, 11, 7, 10, 6, 8, 12, 7, 9, 11, 4, 10, 8, 10, 9, 6, 11, 9, 12, 3, 10, 8, 14, 11, 7, 9, 12, 5, 10, 11, 6, 8, 12, 11, 8, 10, 7, 9, 12, 5, 11, 8, 10, 6, 12, 9]
];
var freeReels = [
    [3, 12, 3, 11, 10, 12, 7, 8, 12, 10, 11, 12, 7, 8, 12, 11, 9, 12, 7, 10, 11, 12, 8, 11, 12, 10, 11, 12, 6, 9, 8, 5, 12, 10, 7, 11, 12, 6, 8, 10, 4, 12, 9, 5, 10, 12, 8, 6, 12, 8, 9, 10, 12, 11, 6, 12, 8, 5, 12, 10, 7, 11, 12, 7, 10, 8, 6, 12, 9, 11, 10, 12, 5, 10, 11, 7, 12, 9, 11],
    [12, 8, 9, 6, 12, 11, 9, 12, 11, 9, 7, 8, 12, 11, 10, 12, 6, 11, 12, 3, 9, 11, 7, 12, 8, 5, 12, 11, 9, 12, 11, 10, 6, 12, 11, 5, 12, 9, 7, 11, 12, 9, 11, 12, 7, 11, 12, 9, 11, 12, 8, 11, 6, 9, 11, 5, 12, 9, 7, 12, 10, 11, 12, 9, 11, 12, 6, 9, 12, 7, 8, 12, 5, 11, 9, 7, 12, 10, 4, 9, 11, 7, 12, 11, 9, 6, 12, 11, 7, 12, 10, 4],
    [12, 7, 8, 12, 11, 5, 12, 11, 6, 12, 11, 5, 12, 10, 11, 12, 5, 9, 12, 7, 8, 12, 4, 10, 11, 6, 10, 11, 12, 10, 11, 12, 8, 11, 12, 10, 11, 12, 6, 11, 12, 5, 9, 11, 12, 4, 11, 8, 12, 11, 10, 12, 11, 8, 12, 11, 7, 12, 9, 6, 12, 11, 10, 12, 11, 8, 12, 9, 7, 11, 12, 3, 11, 8, 12, 6, 10, 12, 8, 5, 9, 12, 10, 7, 12, 8, 9, 11, 12, 10, 8, 7, 12, 10, 6],
    [11, 8, 9, 11, 6, 12, 11, 9, 12, 11, 7, 8, 11, 5, 10, 11, 6, 12, 11, 3, 9, 11, 7, 9, 11, 5, 8, 12, 11, 9, 12, 11, 6, 10, 11, 5, 9, 11, 7, 12, 11, 4, 9, 11, 8, 7, 9, 11, 4, 12, 11, 8, 6, 11, 9, 5, 11, 9, 7, 11, 10, 12, 11, 9, 12, 11, 6, 9, 11, 7, 8, 11, 5, 12, 9, 7, 11, 10, 12, 9, 11, 7, 12, 11, 9, 6, 12, 11, 7, 10, 11, 12, 9],
    [7, 12, 8, 5, 10, 12, 11, 3, 8, 3, 10, 12, 7, 8, 12, 5, 9, 12, 7, 10, 12, 5, 8, 11, 12, 10, 11, 12, 6, 9, 8, 5, 12, 10, 7, 11, 12, 6, 8, 10, 4, 12, 9, 5, 10, 12, 8, 6, 12, 11, 9, 10, 12, 11, 6, 12, 8, 5, 12, 10, 7, 11, 12, 7, 10, 8, 6, 12, 9, 11, 10, 12, 5, 10, 11, 7, 12, 9, 11]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 75, 40, 30, 25, 20, 15, 10, 7, 5, 3, 0, 0],
    [0, 0, 0, 200, 100, 75, 60, 40, 30, 25, 20, 15, 10, 0, 0],
    [0, 0, 0, 1000, 400, 250, 200, 150, 125, 100, 75, 50, 40, 0, 0]
];
var payLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [0, 1, 7, 13, 14],
    [10, 11, 7, 3, 4],
    [10, 6, 2, 8, 14],
    [0, 6, 12, 8, 4],
    [10, 6, 7, 8, 14],
    [5, 1, 2, 3, 9],
    [0, 6, 7, 8, 4],
    [5, 11, 12, 13, 9],
    [5, 6, 12, 8, 9],
    [5, 6, 2, 8, 9],
    [5, 11, 7, 13, 9],
    [5, 1, 7, 3, 9],
    [0, 6, 2, 8, 4],
    [10, 6, 12, 8, 14],
    [10, 1, 7, 3, 14],
    [10, 1, 12, 3, 14]
];
var wild = 2, sorcerer = 14, aladdin = 13;
var slotWidth = 5;
var slotHeight = 3;
var multiPositions = [], payLineIndexArr = [];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.isView = [];
    this.rwd = "";
    this.freeRwd = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        if (cache.view != undefined) {
            this.view = cache.view;
            this.isView = cache.isView;
            this.rwd = cache.rwd;
        } else {
            this.view = viewCache.view;
        }
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        var cache = this.freeSpinCacheList[0];
        this.view = cache.view;
        this.isView = cache.isView;
        this.rwd = cache.rwd;

        if (viewCache.method == "sorcer") {
            this.winMethod = "sorcer";
        } else if (viewCache.method == "aladdin") {
            this.winMethod = "aladdin";
        }
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (isRespinView(this.isView)) {
        this.currentGame = "FREE";
        this.fightState = [13, 3, 0, 14, 3, 0];
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinIndex = 1;
        this.isEndFight = false;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    //                                                            
    if (this.winMethod != "aladdinBonus") {
        if (cache.view != undefined) {
            this.view = cache.view;
            this.isView = cache.isView;
            this.freeRwd = cache.rwd;

            if (cache.who == "ala") {
                //                          
                this.fightState[4]--;
                if (this.fightState[4] == 0) {
                    this.isEndFight = true;
                    var styWildPos = [];
                    for (var i = 0; i < this.view.length; i++) {
                        if (this.view[i] == wild) {
                            styWildPos.push([i, i]);
                        }
                    }
                    this.styWildPos = styWildPos;
                    this.winMethod = "aladdinBonus";
                    this.bonusIndex = 1; //                                 
                }
            } else if (cache.who == "sor") {
                //                          
                this.fightState[1]--;
                if (this.fightState[1] == 0) {
                    this.isEndFight = true;
                }
            }
        } else {
            this.view = cache;
        }

    } else {
        this.isView = cache.isView;
        var multiView = cache.view;
        this.view = GetViewFromMulitView(cache.view);
        this.slm_lmi = cache.slm_lmi;
        this.slm_lmv = cache.slm_lmv;
        this.multiPosition = cache.multi;
        this.styWildPos = cache.styWild;
        this.freeRwd = cache.wildPos;
        this.bonusIndex++;
    }

    this.winMoney = WinFromView(multiView ? multiView : this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;

    if (this.isEndFight) {
        if (this.winMethod == "aladdinBonus") {
            if (this.bonusIndex == 4) {
                this.fightState = [];
                this.currentGame = "BASE";
            }
        } else if (this.winMethod == "sorcer") {
            this.currentGame = "BASE";
        }
    }
};
 
SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: tmpView.view,
        win: tmpView.win,
        type: "BASE",
        bpl: bpl,
    };
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
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var freeMethod = "";
    var scatterView = RandomScatterView(freeReels);
    var scatterWin = WinFromView(scatterView.view, bpl);

    if (Util.probability(60)) {
        var fsCache = RandomSorcerWinView(sorcererReels, bpl, fsWin);
        freeMethod = "sorcer";
    } else {
        var fsCache = RandomAladdinWinView(aladdinReels, bpl, fsWin);
        freeMethod = "aladdin";
    }

    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.viewList),
        bpl: bpl,
        win: fsCache.win + scatterWin,
        type: "FREE",
        isCall: isCall ? 1 : 0,
        method: freeMethod
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        if (isAladdinOrSorcerView(tmpView)) {
            var wildRes = GetAladdinOrSorcerView(tmpView);
            tmpView = wildRes;
            tmpWin = WinFromView(wildRes.view, bpl)
        } else {
            tmpWin = WinFromView(tmpView, bpl);
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);

        }
    }
    return {
        view: tmpView,
        win: tmpWin
    };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);

        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0 && !isAladdinOrSorcerView(tmpView)) {
            break;
        }
    }
    return {
        view: tmpView,
        win: 0
    };
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
        if (!isRespinView(view)) {
            break;
        }
    }

    return view;
};

var RandomScatterView = function (reels) {
    var isView = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            isView[viewPos] = reels[i][reelPos];
        }
    }

    var reel1 = [0, 5, 10], reel2 = [4, 9, 14];

    isView[reel1[Util.random(0, 3)]] = aladdin;
    isView[reel2[Util.random(0, 3)]] = sorcerer;

    var view = [...isView];

    var wildReel = [0, 5, 10, 4, 9, 14];

    for (var i = 0; i < wildReel.length; i++) {
        view[wildReel[i]] = wild;
    }

    var scatterObj = {
        isView: isView,
        view: view,
        rwd: `2~${wildReel.join()}`
    }

    return scatterObj;
};

var RandomSorcerWinView = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var sorcerWin = 3,
            aladdinWin = 3;

        while (true) {
            var fsview, fsWin;

            fsview = RandomView(reels);

            if (isAladdinOrSorcerView(fsview)) {
                //                                         
                var fightResult = GetFightFromView(fsview);

                if (fightResult.who == "ala") {
                    sorcerWin--;
                } else if (fightResult.who == "sor") {
                    aladdinWin--;
                }

                fsview = fightResult;
                fsWin = WinFromView(fightResult.view, bpl);

            } else {
                fsWin = WinFromView(fsview, bpl);
            }

            freeSpinData.viewList.push(fsview);

            freeSpinWinMoney += fsWin;

            if (aladdinWin == 0) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
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

//                    
var RandomAladdinWinView = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = {};
        freeSpinData.viewList = [],
            freeSpinData.bonusView = [];
        var freeSpinWinMoney = 0;
        var sorcerWin = 3,
            aladdinWin = 3;

        while (true) {
            var fsview, fsWin;

            fsview = RandomView(reels);

            if (isAladdinOrSorcerView(fsview)) {
                //                                         
                var fightResult = GetFightFromView(fsview);

                if (fightResult.who == "ala") {
                    sorcerWin--;
                } else if (fightResult.who == "sor") {
                    aladdinWin--;
                }

                fsview = fightResult;
                fsWin = WinFromView(fightResult.view, bpl);

            } else {
                fsWin = WinFromView(fsview, bpl);
            }

            freeSpinData.viewList.push(fsview);

            freeSpinWinMoney += fsWin;

            if (sorcerWin == 0) {
                var resBonus = RandomBonusView(freeReels, bpl, fightResult.rwd);
                freeSpinWinMoney += resBonus.win;
                freeSpinData.win = freeSpinWinMoney;

                for (var i = 0; i < resBonus.viewList.length; i++) {
                    freeSpinData.viewList.push(resBonus.viewList[i]);
                }

                break;
            }
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
}

//                   
var GetFightFromView = function (view) {
    var resView = Util.clone(view);

    var wildPos = []; //                                       
    var sorcerReel = [4, 9, 14],
        isSorcer = false,
        aladinReel = [0, 5, 10],
        isAladin = false;

    //                           ?
    for (var i = 0; i < sorcerReel.length; i++) {
        if (resView[sorcerReel[i]] == sorcerer) {
            isSorcer = true;
            wildPos.push(sorcerReel[i]);
        }
    }
    //                           ?
    for (var i = 0; i < aladinReel.length; i++) {
        if (resView[aladinReel[i]] == aladdin) {
            isAladin = true;
            wildPos.push(aladinReel[i]);
        }
    }

    var wildNum = Util.random(2, 4);

    for (var i = 0; i < wildNum; i++) {
        while (true) {
            var pos = Util.random(0, 15);
            if (wildPos.indexOf(pos) == -1) {
                wildPos.push(pos);
                break;
            }
        }
    }

    for (var i = 0; i < wildPos.length; i++) {
        resView[wildPos[i]] = wild;
    }

    if (isAladin == true && isSorcer == false) {
        //                          
        return {
            isView: view,
            view: resView,
            rwd: wildPos,
            who: "ala"
        }
    } else if (isAladin == false && isSorcer == true) {
        //                          
        return {
            isView: view,
            view: resView,
            rwd: wildPos,
            who: "sor"
        }
    } else if (isAladin == true && isSorcer == true) {
        //                       
        return {
            isView: view,
            view: resView,
            rwd: wildPos,
            who: "both"
        }
    }

}

//                            
var RandomBonusView = function (reels, bpl, wildPos) {
    var wildPos = Util.clone(wildPos),
        multiWild = [];
    var bonusViewList = [], bonusWinMoney = 0;

    for (var i = 0; i < wildPos.length; i++) {
        multiWild.push(0);
    }

    //                   
    for (var i = 0; i < 3; i++) {
        var isView = RandomView(reels);
        var view = [...isView];
        var styWildPos = [];

        for (var j = 0; j < wildPos.length; j++) {
            view[wildPos[j]] = wild * Math.pow(10, i);
            if (i == 2) {
                styWildPos.push([wildPos[j], -1]);
            } else {
                styWildPos.push([wildPos[j], wildPos[j]]);
            }
        }

        for (var k = 0; k < multiWild.length; k++) {
            multiWild[k]++;
        }

        bonusWinMoney += WinFromView(view, bpl);

        var bonusObj = {
            isView: isView,
            view: view,
            slm_lmv: multiPositions,
            slm_lmi: payLineIndexArr,
            multi: [...multiWild],
            styWild: styWildPos,
            wildPos: wildPos
        }
        bonusViewList.push(bonusObj);

        multiPositions = [];
        payLineIndexArr = [];


    }

    return {
        win: bonusWinMoney,
        viewList: bonusViewList
    }

}

//                          
var isRespinView = function (view) {
    var reelPos = [0, 5, 10, 4, 9, 14];
    var counter = 0;

    for (var i = 0; i < reelPos.length; i++) {
        if (view[reelPos[i]] == sorcerer || view[reelPos[i]] == aladdin) {
            counter++;
        }
    }

    if (counter >= 2) {
        return true;
    } else {
        return false;
    }
}

//   1 ,5                                                                  
var GetAladdinOrSorcerView = function (view) {
    var resultView = Util.clone(view);
    var reelPos = [0, 5, 10, 4, 9, 14];
    var wildPos = [], wildNum = 0;

    for (var i = 0; i < reelPos.length; i++) {
        if (resultView[reelPos[i]] == aladdin || resultView[reelPos[i]] == sorcerer) {
            wildPos.push(i);
        }
    }

    wildNum = Util.random(3, 6);

    for (var i = 0; i < wildNum; i++) {
        while (true) {
            var pos = Util.random(0, 15);
            if (wildPos.indexOf(pos) == -1) {
                wildPos.push(pos);
                break;
            }
        }
    }

    for (var i = 0; i < wildPos.length; i++) {
        resultView[wildPos[i]] = wild;
    }

    var resObj = {
        view: resultView,
        isView: view,
        rwd: `2~${wildPos.join()}`
    }

    return resObj;

}

//                                              ?
var isAladdinOrSorcerView = function (view) {
    var wildflag = false;
    var reelPos = [0, 5, 10, 4, 9, 14];

    for (var i = 0; i < reelPos.length; i++) {
        if (view[reelPos[i]] == aladdin || view[reelPos[i]] == sorcerer) {
            wildflag = true;
        }
    }

    return wildflag;
};

var WinFromView = function (view, bpl) {
    var winMoney = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl, lineId);
        winMoney += linePay;
    }

    return winMoney;
};

var WinFromLine = function (lineSymbols, bpl, line = null) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        //                                               
        if (isWildMulti(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    var hasWild = false;
    //                                                                                                  
    var lineMulti = 0;
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWildMulti(lineSymbols[i])) {
            lineMulti += GetWildMulti(lineSymbols[i]);
            lineSymbols[i] = symbol;
        }
    }

    if (lineMulti == 0) {
        lineMulti = 1;
    }

    //                                                   
    // for (var i = 0; i < lineSymbols.length; i++) {
    //     if (isWild(lineSymbols[i])) {
    //         hasWild = true;
    //         lineSymbols[i] = symbol;
    //     }
    // }

    //                                
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        .
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl * lineMulti;
    if (winPay > 0 && lineMulti >= 2) {
        multiPositions.push(lineMulti);
        payLineIndexArr.push(line);
    }
    return winPay;
};

var GetViewFromMulitView = function (view) {
    var resultView = Util.clone(view);

    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] == 20 || resultView[i] == 200) {
            resultView[i] = wild;
        }
    }

    return resultView;
};

var isWildMulti = function (symbol) {
    return symbol == 2 || symbol == 20 || symbol == 200 || symbol == aladdin || symbol == sorcerer;
};

var GetWildMulti = function (symbol) {
    switch (symbol) {
        case 20:
            return 2;
        case 200:
            return 3;
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

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);

        if (linePay > 0) {
            winLines.push(
                `${lineId}~${linePay}~${line
                    .filter(function (item, index, arr) {
                        return lineSymbols[index] != -1;
                    })
                    .join("~")}`
            );
        }
    }

    return winLines;
};

module.exports = SlotMachine;