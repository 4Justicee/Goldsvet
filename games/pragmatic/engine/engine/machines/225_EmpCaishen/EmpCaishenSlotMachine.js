var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 88;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.moneyCache = {};

    //bonusType     0                    1                      , 2             , 3                      
    this.bonusType = 0;
    this.param_ind;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinCnt = [88, 98, 108, 118, 128];
    //                    
    this.jackpotCache = [];
    this.jackpotLevel = 0;

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var winLines = [];
var slotWidth = 5, slotHeight = 3;
var wild = 2, scatter = 14, freeSpinCount = 6;
var jackpotList = [1000, 1000, 100, 100, 100, 20, 20, 20, 10, 10, 10, 10];
var baseReels = [
    [5, 11, 13, 14, 6, 7, 7, 6, 7, 6, 7, 8, 9, 5, 12, 4, 10, 5, 7, 6, 8, 5, 13, 4, 6, 6, 7, 9, 3, 5, 5, 7, 12, 4, 4, 3, 7, 4, 10, 11, 6, 3, 14, 4],
    [3, 6, 5, 7, 7, 11, 10, 7, 2, 8, 5, 6, 3, 5, 5, 7, 6, 9, 6, 13, 5, 7, 5, 6, 13, 12, 4, 12, 10, 9, 3, 14, 4, 6, 6, 14, 7, 9, 2, 7, 5, 7, 3, 4, 5, 3, 6, 8, 11, 8],
    [13, 5, 14, 5, 6, 5, 6, 3, 5, 4, 10, 12, 7, 6, 6, 7, 7, 2, 3, 14, 8, 4, 12, 4, 6, 3, 5, 13, 10, 7, 5, 9, 6, 11, 5, 4, 9, 7, 12, 4, 8, 7, 6, 14, 7, 11],
    [12, 13, 14, 4, 7, 5, 3, 7, 5, 8, 13, 11, 8, 4, 13, 4, 7, 13, 5, 3, 7, 7, 12, 6, 6, 5, 11, 9, 3, 12, 2, 6, 8, 10, 9, 2, 4, 14, 6],
    [11, 7, 3, 6, 13, 8, 10, 5, 12, 8, 3, 9, 6, 5, 4, 10, 3, 13, 5, 6, 14, 7, 11, 8, 9, 13, 12, 14, 11, 12, 3, 8, 4, 7, 4, 6, 10, 7, 13, 6, 9, 4]
];
var freeReels = [
    [
        [10, 12, 12, 3, 11, 11, 11, 3, 13, 9, 10, 3, 10, 12, 12, 12, 10, 3, 3, 11, 8, 13, 3, 3, 3, 13, 12, 3, 14, 9, 10, 10, 10, 8, 13, 12, 9, 9, 13, 9, 9, 9, 11, 3, 9, 3, 14, 3, 13, 13, 13, 3, 12, 3, 11, 8, 3, 8, 8, 8, 3, 11, 11, 3, 3, 8, 9],
        [3, 3, 8, 3, 3, 13, 3, 3, 3, 13, 9, 8, 3, 12, 11, 3, 8, 8, 8, 9, 3, 13, 12, 3, 11, 10, 3, 11, 11, 11, 10, 3, 13, 2, 14, 11, 13, 9, 9, 9, 8, 9, 3, 10, 3, 13, 3, 13, 13, 13, 8, 10, 11, 12, 13, 14, 3, 2, 11, 12],
        [9, 9, 11, 3, 11, 8, 11, 11, 11, 14, 2, 3, 3, 12, 13, 10, 12, 8, 8, 8, 3, 13, 8, 3, 3, 8, 12, 10, 9, 9, 9, 3, 10, 10, 10, 3, 8, 11, 13, 12, 12, 12, 10, 12, 11, 11, 3, 13, 14, 3, 3, 3, 8, 3, 3, 8, 3, 3, 2, 3, 10, 10, 3, 9, 12, 12, 3, 14, 9, 3, 8],
        [14, 12, 8, 8, 3, 8, 8, 8, 10, 9, 8, 3, 9, 8, 13, 9, 9, 9, 13, 3, 13, 9, 11, 11, 2, 3, 3, 3, 14, 3, 8, 12, 10, 10, 11, 11, 11, 13, 3, 3, 12, 3, 3, 13, 13, 11, 3, 2, 13, 13, 9, 3, 13, 9],
        [9, 11, 10, 8, 3, 3, 8, 8, 8, 13, 11, 11, 3, 3, 12, 14, 8, 3, 3, 3, 13, 3, 8, 3, 11, 8, 8, 12, 12, 12, 9, 3, 9, 13, 10, 13, 11, 11, 11, 9, 10, 8, 10, 3, 12, 11, 10, 10, 10, 9, 3, 3, 10, 11, 12, 10, 3, 9, 9, 9, 3, 12, 11, 9, 14, 12, 13, 10, 13, 13, 13, 13, 9, 11, 3, 8, 3, 8, 13, 11, 13]
    ],
    [
        [4, 13, 4, 12, 11, 11, 11, 4, 14, 4, 9, 9, 12, 12, 12, 8, 11, 4, 4, 13, 4, 4, 4, 9, 4, 4, 11, 4, 4, 10, 10, 10, 8, 9, 10, 11, 4, 9, 9, 9, 4, 4, 10, 4, 13, 13, 13, 8, 12, 4, 10, 14, 12, 13],
        [13, 4, 9, 4, 4, 4, 11, 8, 8, 13, 11, 8, 8, 8, 10, 4, 13, 9, 4, 10, 11, 11, 11, 8, 4, 11, 4, 13, 9, 9, 9, 4, 2, 12, 4, 12, 13, 13, 13, 14, 12, 4, 4, 10, 11, 9],
        [13, 4, 2, 9, 4, 11, 12, 11, 11, 11, 14, 4, 11, 4, 12, 4, 10, 9, 12, 8, 8, 8, 4, 4, 8, 13, 14, 4, 12, 4, 12, 12, 12, 9, 13, 10, 4, 4, 8, 4, 12, 8, 4, 4, 4, 11, 4, 4, 11, 10, 4, 4, 8, 10, 10, 13, 12, 9, 8, 2, 4, 4, 10, 10, 10, 14, 11],
        [4, 4, 8, 9, 2, 4, 13, 12, 13, 8, 8, 8, 2, 13, 12, 4, 11, 11, 13, 9, 8, 11, 4, 4, 4, 8, 4, 8, 13, 14, 9, 4, 4, 10, 8, 11, 11, 11, 12, 11, 13, 4, 14, 4, 10, 10, 4, 4, 9],
        [8, 13, 8, 10, 10, 11, 4, 8, 8, 8, 10, 11, 4, 4, 14, 4, 4, 9, 9, 10, 10, 10, 12, 10, 13, 8, 4, 13, 4, 4, 11, 4, 4, 4, 10, 11, 9, 8, 9, 12, 4, 9, 12, 12, 12, 11, 12, 4, 8, 10, 11, 14, 4, 13, 11, 11, 11, 13, 12, 11, 4, 12, 4, 4, 9, 12, 9, 9, 9, 10, 4, 11, 11, 9, 4, 8, 10, 8, 12]
    ],
    [
        [5, 10, 5, 5, 14, 9, 13, 12, 11, 11, 11, 5, 5, 12, 11, 5, 10, 5, 5, 12, 12, 12, 5, 13, 5, 5, 12, 5, 11, 5, 11, 5, 5, 5, 11, 14, 9, 5, 9, 9, 5, 8, 9, 10, 10, 10, 5, 8, 9, 5, 10, 5, 8, 8, 5, 13, 13, 13, 5, 10, 13, 13, 5, 5, 11, 10, 13, 12, 5],
        [12, 5, 5, 10, 5, 9, 8, 5, 5, 5, 2, 5, 5, 9, 14, 5, 5, 11, 11, 11, 9, 2, 13, 8, 5, 8, 13, 10, 9, 9, 9, 5, 13, 14, 5, 12, 5, 5, 13, 13, 13, 5, 11, 11, 10, 5, 13, 12, 5],
        [12, 10, 10, 10, 5, 5, 12, 12, 11, 11, 11, 5, 5, 8, 13, 9, 5, 13, 11, 5, 5, 5, 10, 5, 12, 13, 5, 14, 5, 9, 12, 12, 12, 5, 2, 9, 5, 8, 11, 11, 5, 10, 10, 5, 8, 12, 2, 5, 5, 14, 5, 10],
        [11, 5, 5, 8, 13, 5, 10, 5, 8, 5, 14, 5, 9, 5, 8, 5, 5, 5, 13, 10, 5, 9, 9, 5, 11, 12, 9, 11, 10, 13, 11, 2, 12, 2, 11, 11, 11, 8, 9, 5, 12, 13, 12, 5, 13, 8, 11, 14, 5, 5, 13, 5, 5, 10, 13],
        [10, 11, 5, 13, 8, 8, 8, 9, 10, 12, 11, 13, 11, 5, 5, 5, 9, 11, 8, 12, 13, 14, 11, 11, 11, 5, 9, 5, 5, 10, 10, 10, 9, 13, 12, 8, 13, 11, 9, 9, 9, 8, 5, 5, 10, 5, 5, 13, 13, 13, 13, 10, 5, 5, 10, 5, 8, 5]
    ],
    [
        [10, 8, 6, 6, 9, 6, 6, 6, 9, 6, 11, 6, 12, 8, 12, 11, 13, 10, 10, 10, 6, 11, 6, 9, 6, 6, 10, 6, 6, 13, 13, 13, 8, 12, 13, 6, 10, 6, 9, 14, 6, 13],
        [13, 13, 10, 6, 11, 6, 6, 9, 6, 6, 6, 10, 6, 2, 8, 14, 6, 6, 11, 13, 6, 8, 11, 11, 11, 6, 13, 12, 10, 6, 12, 8, 14, 13, 6, 6, 13, 13, 13, 2, 12, 6, 11, 6, 6, 11, 6, 6, 9, 6, 9],
        [8, 12, 6, 9, 6, 10, 6, 14, 11, 11, 11, 6, 6, 8, 12, 11, 8, 6, 12, 6, 6, 6, 13, 12, 13, 6, 10, 13, 6, 6, 11, 12, 12, 12, 6, 14, 6, 11, 2, 10, 6, 9, 9, 6],
        [13, 6, 10, 13, 6, 6, 13, 12, 6, 14, 9, 11, 12, 6, 6, 6, 8, 6, 9, 6, 10, 11, 9, 2, 9, 6, 11, 10, 6, 6, 14, 11, 11, 11, 12, 6, 6, 8, 6, 11, 6, 8, 9, 6, 13, 13, 8, 10, 8, 2],
        [11, 6, 12, 6, 9, 12, 13, 8, 6, 13, 8, 8, 8, 6, 11, 14, 6, 12, 6, 10, 9, 6, 6, 13, 8, 6, 6, 6, 12, 10, 6, 8, 6, 13, 10, 6, 11, 6, 9, 10, 10, 10, 6, 8, 6, 12, 6, 6, 11, 8, 6, 13, 11, 6, 9, 9, 9, 14, 6, 6, 12, 13, 8, 6, 13, 10, 10, 6, 13, 13, 13, 13, 9, 10, 11, 10, 6, 9, 8, 13, 9, 11, 10, 9, 11]
    ],
    [
        [7, 13, 7, 13, 7, 8, 7, 9, 13, 11, 7, 13, 11, 9, 12, 10, 7, 9, 7, 7, 10, 9, 7, 12, 7, 7, 7, 11, 7, 10, 11, 7, 7, 10, 8, 7, 8, 7, 14, 7, 9, 7, 12, 7, 7, 12, 7, 7, 14, 7, 7, 8, 7, 9, 7],
        [13, 7, 7, 11, 7, 7, 13, 11, 7, 7, 9, 7, 7, 2, 12, 8, 9, 7, 12, 7, 14, 11, 11, 7, 7, 2, 7, 7, 7, 13, 9, 7, 13, 7, 7, 13, 12, 7, 10, 7, 7, 10, 7, 7, 8, 14, 8, 12, 7, 7, 8, 7, 13, 7, 7, 10, 9, 10, 7],
        [7, 7, 9, 7, 10, 8, 7, 11, 7, 14, 11, 7, 14, 8, 7, 12, 10, 9, 8, 7, 7, 2, 12, 7, 2, 9, 11, 7, 7, 7, 14, 7, 9, 7, 7, 13, 7, 13, 7, 7, 8, 7, 10, 7, 12, 11, 7, 7, 13, 7, 7, 8, 12, 7, 12, 7, 13, 7, 7, 10],
        [8, 10, 9, 11, 14, 9, 7, 11, 7, 7, 12, 13, 7, 9, 8, 7, 12, 7, 7, 12, 13, 13, 7, 11, 10, 10, 7, 7, 7, 13, 10, 7, 8, 9, 8, 7, 7, 13, 8, 11, 9, 13, 7, 9, 7, 7, 8, 7, 7, 2, 14, 2, 10, 13, 12, 7, 7],
        [8, 7, 9, 7, 10, 10, 7, 7, 10, 12, 13, 7, 7, 7, 12, 13, 7, 11, 7, 11, 9, 13, 12, 10, 7, 7, 8, 10, 10, 10, 13, 7, 14, 7, 10, 10, 7, 9, 7, 7, 11, 9, 9, 9, 7, 11, 7, 11, 12, 13, 9, 7, 13, 11, 7, 12, 7, 13, 13, 13, 13, 8, 9, 8, 7, 8, 7, 7, 9, 10, 7, 11, 9, 7, 13]
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 40, 20, 10, 5, 5, 5, 5, 5, 5],
    [0, 0, 0, 150, 100, 80, 50, 25, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 750, 450, 300, 200, 130, 30, 30, 25, 25, 20, 20]
];
var percentList = {
    freeWinPercent: 50,
    moneyJackpotPercent: 5,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];


    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }


    if (viewCache.type == "FREE") {
        this.cacheList = viewCache.view;
        this.view = this.cacheList[0][0];
        this.bonusType = viewCache.bonusType;
        this.currentGame = "FREE";
    }

    if (viewCache.type == "BONUS") {
        this.bonusType = viewCache.bonusType;
        this.view = viewCache.view[0];
        this.jackpotSelect = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentGame = "BONUS";
        this.jackpotLevel = 0;
        this.jackpotList = viewCache.view[1];
        this.wins_mask = ["h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h"];
        this.wins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "FREE") {
        this.totalWin = this.winMoney;
        this.freeSpinWinMoney = 0;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinWinMoney += this.winMoney;
    this.totalWin += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
        return;
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;

    if (this.bonusType == 0) {    //                  
        this.param_ind = Number(param.ind);
        this.freeSpinCacheList = this.cacheList[this.param_ind];
        this.freeSpinLength = freeSpinCount;
        this.freeSpinIndex = 1;
        this.status = [0, 0, 0, 0, 0];
        this.status[this.param_ind] = 1;
        this.trail = `fs~S${this.param_ind}_${this.freeSpinCnt[this.param_ind]}`;
    } else if (this.bonusType == 2) {
        //                  
        var select = Number(param.ind);
        this.jackpotSelect[select] = 1;
        this.jackpotLevel++;

        this.status[select] = this.jackpotLevel;

        for (var i = 0; i < 12; i++) {
            if (this.jackpotSelect[i] == 1) {
                this.wins_mask[i] = "pw";
                this.wins[i] = this.jackpotList[i];
            }
        }

        var sameCnt = [0, 0, 0, 0];
        for (var i = 0; i < 12; i++) {
            if (this.wins[i] == 10) {
                sameCnt[0]++;
            } else if (this.wins[i] == 20) {
                sameCnt[1]++;
            } else if (this.wins[i] == 100) {
                sameCnt[2]++;
            } else if (this.wins[i] == 1000) {
                sameCnt[3]++;
            }
        }

        var times = 0, flag = false;
        for (var i = 0; i < 4; i++) {
            if (sameCnt[i] >= 3) {
                flag = true;
                switch (i) {
                    case 0:
                        times = 10;
                        break;
                    case 1:
                        times = 20;
                        break;
                    case 2:
                        times = 100;
                        break;
                    case 3:
                        times = 1000;
                        break;
                }
                break;
            }
        }

        this.winMoney = 0;

        if (this.jackpotLevel > 7 || flag == true) {
            //                    
            this.winMoney = this.betPerLine * this.lineCount * times;
            this.moneyBonusWin = this.winMoney;
            this.currentGame = "BASE";
            this.times = times;
        }
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    //                            [      ] *                                                             ~~                 .

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
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomView(baseReels, flag = true);
    var scatterWin = WinFromView(scatterView, bpl);


    var viewList = {};
    var tmpWin = 0;

    for (var i = 0; i < 5; i++) {
        viewList[i] = [scatterView];
        var fsCache = RandomFreeViewCache(freeReels[i], bpl, fsWin, freeSpinCount);
        viewList[i] = viewList[i].concat(fsCache.cache);

        if (tmpWin < fsCache.win) {
            tmpWin = fsCache.win;
        }
    }

    var pattern = {
        view: viewList,
        bpl: bpl,
        win: tmpWin + scatterWin,
        type: "FREE",
        bonusType: 0,
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var viewList = [];
    var jackpotView = RandomJackpotView(baseReels, bpl);
    viewList.push(jackpotView);

    var timesArr = [10, 20, 100, 1000];
    var times = bsWin / totalBet;
    if (times < 20) {
        times = 10;
    } else if (times >= 20 && times < 100) {
        times = 20;
    } else if (times >= 100 && times < 1000) {
        times = 100;
    } else {
        times = 1000;
    }

    var tmpIndex = timesArr.indexOf(times);
    var timesArray = [];
    for (var i = 0; i < 4; i++) {
        if (i == tmpIndex) continue;
        else timesArray.push(timesArr[i]);
    }

    timesArray = Util.shuffle(timesArray);
    // timesArr
    var jackpotList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < 7; i++) {
        var tmpPos = 0;
        while (true) {
            tmpPos = Util.random(0, 13);
            if (jackpotList[tmpPos] == 0) {
                break;
            }
        }
        jackpotList[tmpPos] = times;
    }

    var cnt = 0, index = 0;
    for (var i = 0; i < 12; i++) {
        if (jackpotList[i] != 0) {
            continue;
        }
        jackpotList[i] = timesArray[index];
        ++cnt;
        if (cnt == 2) {
            cnt = 0;
            index++;
        }
    }

    viewList.push(jackpotList);

    var pattern = {
        view: viewList,
        bpl: bpl,
        win: times * totalBet,
        type: "BONUS",
        bonusType: 2,
        isCall: isCall ? 1 : 0,
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels, flag = false);
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
        tmpView = RandomView(reels, flag = false);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView
};

var RandomView = function (reels, flag) {
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

        if (flag == isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

///                         ,           n                    
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
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;

        while (freeSpinIndex <= freeSpinLength) {
            var tmpView, tmpWin = 0;
            while (true) {
                tmpView = RandomView(reels, flag = false);
                tmpWin = WinFromView(tmpView, bpl);
                if (Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                    break;
                }
            }

            freeSpinCacheList.push(tmpView);
            freeSpinTotalWin += tmpWin;

            freeSpinIndex++;
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin,
        };


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
var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (view[pos] == scatter) continue;
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    // if (money == NaN) money = 0;
    return money;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var NumberOfWilds = function (view) {
    var res = 0;

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            ++res;
        }
    }

    return res;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    var winMoney = 0;

    //                                                             
    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId];
        winLines.push(`0~${winMoney}~${history.join('~')}`);
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }
    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = 0;
        for (var i = 0; i < history.length; i++) {
            if (history[i] >= 0) {
                matchCount++;
            }
        }
        var money = bpl * payTable[matchCount][symbolId];
        if (money > 0) {
            var lineResult = [];
            for (var i = 0; i < history.length; i++) {
                if (history[i] < 0) {
                    break;
                }
                lineResult.push(history[i]);
            }
            winLines.push(`0~${money}~${lineResult.join('~')}`);
        }
        return money;
    }

    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var isFreeSpinWin = function (view) {
    var i = 0;
    for (i = 0; i < slotWidth; i++) {
        var j = 0;
        for (j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (view[pos] == scatter || view[pos] == wild) {
                break;
            }
        }
        if (j >= 3) {
            break;
        }
    }
    if (i >= 3) {
        return true;
    } else {
        return false;
    }
}

var RandomJackpotView = function (reels, bpl) {
    var view = [];

    while (true) {
        view = RandomView(reels, flag = false);
        var tmpWin = WinFromView(view, bpl);
        if (NumberOfWilds(view) > 0 && tmpWin == 0)
            break;
    }

    return view;
}

module.exports = SlotMachine;