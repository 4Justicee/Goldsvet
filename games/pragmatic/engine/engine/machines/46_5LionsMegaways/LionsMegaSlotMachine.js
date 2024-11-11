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

    //                 
    this.wildIndex = 0;
    this.wrlm_c = ""; // wrlm_c          ~               (                )
    this.wrlm_cs = ""; // wrlm_cs             (2)~            (0,1,2,3,4,5,6)
    this.wrlm_res = ""; // wrlm_res             (2)~      ~               

    //          
    this.tumbleIndex = 0;
    this.tumbles = [];
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinData = [];
    this.freeSpinCacheList = [];
    //             
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE

    //             
    this.buyMulti = 100;
    this.buyPatternCount = 34;

    this.doubleMulti = 0.25;
};

var scatter = 1;
var wild = 2;
var slotWidth = 6;
var slotHeight = 7;
var empty = 13;
var winLines = [];
var tumblingPositions = [];
var wildMultiArr = [
    [1, 2, 3, 5, 8,/* 10, 15, 30, 40*/],    // 0
    [2, 3, 5],                          // 1
    [3, 5, 8],                          // 2
    [5, 8, 10],                         // 3
    [8, 10, 15],                        // 4
    [10, 15, 30],                       // 5
    [15, 30, 40]                        // 6
];
var freeSpinCounts = [25, 20, 15, 13, 10, 6];
var baseReels = [
    [12, 11, 11, 4, 6, 6, 8, 11, 11, 4, 11, 12, 12, 11, 9, 11, 9, 3, 3, 3, 4, 8, 11, 8, 3, 8, 5, 6, 8, 7, 7, 10, 7, 10, 10, 8, 1, 8, 10, 8, 8, 8, 5, 9, 6, 7, 12, 9, 9, 5, 4, 5, 12, 9, 8, 4, 8, 12, 12, 5, 9, 9, 9, 11, 3, 12, 4, 9, 3, 10, 8, 9, 8, 12, 5, 5, 11, 4, 6, 12, 9, 11, 11, 11, 11, 9, 10, 7, 9, 10, 8, 10, 11, 12, 3, 4, 12, 4, 10, 3, 9, 10, 12, 8, 10, 10, 10, 10, 8, 4, 11, 5, 8, 8, 6, 10, 3, 5, 10, 8, 4, 11, 11, 12, 6, 4, 4, 4, 7, 10, 1, 7, 6, 8, 5, 7, 10, 8, 9, 11, 10, 11, 8, 4, 9, 8, 6, 5, 5, 5, 3, 9, 8, 5, 11, 8, 11, 5, 4, 4, 8, 11, 6, 6, 11, 6, 3, 9, 9, 12, 12, 12, 11, 12, 6, 12, 10, 7, 12, 9, 10, 12, 10, 12, 8, 12, 9, 8, 10, 8, 7, 7, 7, 9, 9, 8, 11, 3, 9, 9, 5, 9, 9, 7, 5, 7, 11, 11, 4, 10, 10, 9, 6, 6, 6, 1, 9, 11, 11, 4, 10, 5, 4, 9, 7, 9, 7, 8, 3, 7, 3, 5, 7, 12, 5],
    [12, 4, 10, 5, 5, 5, 7, 5, 12, 10, 11, 11, 11, 10, 9, 11, 12, 9, 4, 4, 4, 4, 10, 11, 11, 8, 8, 8, 6, 8, 6, 7, 11, 12, 12, 12, 12, 7, 4, 8, 6, 6, 6, 8, 2, 6, 12, 8, 10, 10, 10, 5, 3, 6, 3, 9, 9, 9, 6, 10, 6, 2, 5, 7, 7, 7, 1, 12, 8, 11, 3, 3, 3, 6, 8, 5, 7, 4, 11],
    [11, 12, 10, 11, 8, 3, 11, 10, 5, 12, 10, 10, 11, 6, 9, 8, 6, 12, 10, 6, 10, 10, 10, 5, 8, 4, 11, 10, 3, 11, 3, 8, 12, 12, 10, 1, 10, 6, 10, 2, 8, 11, 6, 8, 9, 9, 9, 10, 3, 11, 8, 11, 12, 3, 12, 3, 8, 11, 10, 8, 1, 9, 11, 12, 11, 10, 6, 11, 12, 12, 12, 4, 12, 3, 6, 11, 11, 5, 3, 3, 9, 9, 12, 6, 11, 2, 5, 10, 3, 11, 5, 7, 1, 3, 3, 3, 9, 10, 12, 6, 8, 6, 8, 6, 12, 11, 6, 5, 10, 6, 11, 12, 6, 10, 9, 12, 6, 6, 6, 6, 10, 11, 5, 12, 12, 3, 6, 3, 11, 8, 3, 8, 12, 9, 8, 11, 5, 12, 7, 7, 11, 8, 8, 8, 4, 10, 3, 10, 5, 10, 4, 8, 5, 11, 11, 3, 8, 9, 7, 10, 6, 10, 5, 9, 10, 5, 5, 5, 5, 12, 11, 10, 9, 5, 11, 11, 8, 10, 3, 7, 9, 10, 11, 5, 7, 6, 7, 2, 3, 11, 11, 11, 11, 10, 12, 11, 6, 2, 8, 10, 11, 7, 8, 5, 12, 6, 4, 5, 6, 11, 5, 3, 11, 2, 4, 4, 4, 6, 11, 3, 9, 11, 6, 6, 10, 7, 9, 10, 9, 3, 12, 5, 9, 9, 5, 10, 11, 12, 7, 7, 7, 10, 12, 7, 10, 10, 9, 5, 6, 11, 12, 7, 3, 10, 9, 7, 10, 8, 7, 10, 11, 3, 11, 3],
    [8, 5, 4, 12, 6, 4, 7, 9, 4, 5, 5, 4, 8, 7, 5, 12, 6, 9, 8, 1, 9, 4, 4, 5, 11, 2, 12, 3, 9, 4, 9, 4, 4, 4, 6, 9, 10, 7, 9, 4, 12, 4, 5, 9, 7, 4, 3, 10, 12, 2, 12, 10, 9, 12, 3, 4, 8, 11, 5, 5, 3, 4, 8, 11, 4, 6, 9, 9, 9, 5, 7, 6, 5, 6, 9, 4, 10, 3, 9, 9, 6, 5, 4, 4, 9, 8, 11, 5, 7, 7, 10, 5, 8, 12, 10, 12, 8, 7, 12, 7, 5, 8, 8, 8, 11, 5, 6, 5, 9, 6, 4, 9, 9, 12, 8, 5, 4, 12, 5, 12, 12, 7, 4, 12, 4, 9, 12, 9, 1, 7, 11, 9, 7, 5, 3, 9, 5, 5, 5, 6, 12, 7, 5, 11, 8, 3, 8, 3, 11, 8, 11, 3, 6, 4, 9, 11, 4, 6, 9, 3, 4, 4, 8, 3, 8, 9, 12, 4, 9, 11, 12, 6, 6, 6, 9, 6, 9, 5, 10, 4, 9, 11, 6, 11, 1, 10, 3, 6, 8, 7, 6, 12, 5, 7, 8, 6, 4, 4, 3, 3, 4, 9, 10, 8, 6, 5, 12, 12, 12, 3, 4, 3, 4, 11, 5, 7, 12, 4, 12, 12, 2, 6, 8, 12, 2, 11, 12, 8, 6, 12, 9, 8, 10, 4, 7, 7, 3, 12, 9, 7, 10, 10, 10, 10, 2, 4, 9, 8, 10, 9, 11, 11, 9, 9, 10, 7, 11, 9, 12, 6, 9, 4, 9, 11, 12, 11, 9, 11, 5, 2, 10, 8, 4, 1, 3, 7, 11, 11, 11, 8, 10, 10, 6, 7, 10, 9, 12, 9, 9, 12, 6, 9, 4, 7, 3, 12, 6, 11, 8, 9, 8, 6, 12, 11, 9, 7, 9, 11, 9, 6, 8, 3, 3, 3, 5, 9, 4, 10, 3, 9, 9, 11, 9, 11, 4, 8, 4, 12, 3, 12, 7, 3, 11, 8, 4, 3, 12, 3, 8, 8, 12, 9, 12, 5, 5, 6, 7, 7, 7, 8, 3, 3, 8, 9, 12, 3, 4, 5, 11, 3, 8, 8, 3, 5, 12, 8, 4, 10, 6, 4, 11, 3, 11, 2, 4, 6, 12, 8, 8, 6, 2, 7],
    [12, 8, 11, 6, 11, 8, 8, 6, 12, 12, 10, 9, 6, 10, 8, 6, 12, 12, 6, 8, 8, 11, 9, 4, 12, 8, 6, 8, 2, 10, 6, 6, 12, 12, 12, 9, 10, 6, 11, 6, 11, 7, 6, 11, 11, 10, 11, 9, 9, 12, 12, 8, 8, 12, 10, 8, 7, 11, 8, 8, 10, 11, 7, 12, 8, 10, 6, 10, 6, 6, 6, 6, 7, 4, 12, 10, 11, 10, 9, 1, 7, 2, 6, 8, 1, 10, 10, 12, 10, 9, 12, 12, 10, 6, 4, 8, 9, 1, 10, 7, 8, 8, 8, 7, 5, 8, 8, 8, 11, 7, 12, 10, 5, 12, 6, 7, 4, 8, 9, 4, 8, 8, 8, 11, 12, 8, 9, 8, 11, 11, 12, 10, 4, 6, 8, 11, 2, 10, 4, 4, 4, 5, 10, 8, 8, 6, 8, 3, 6, 4, 11, 8, 8, 11, 7, 8, 10, 12, 3, 11, 7, 4, 8, 9, 6, 11, 11, 2, 12, 10, 11, 12, 12, 12, 10, 10, 10, 12, 5, 6, 9, 11, 12, 8, 8, 11, 10, 12, 6, 8, 10, 6, 10, 4, 3, 10, 6, 7, 11, 5, 8, 6, 2, 7, 9, 9, 12, 10, 11, 12, 12, 11],
    [5, 11, 5, 12, 9, 12, 4, 9, 9, 5, 7, 8, 11, 7, 5, 9, 9, 4, 9, 5, 10, 6, 12, 11, 7, 7, 7, 7, 4, 10, 6, 9, 10, 7, 9, 7, 10, 7, 7, 10, 9, 11, 7, 5, 7, 10, 3, 5, 11, 11, 5, 5, 12, 12, 4, 3, 3, 3, 9, 7, 12, 1, 7, 9, 12, 9, 11, 12, 6, 12, 5, 5, 3, 10, 11, 4, 12, 5, 12, 8, 9, 11, 9, 11, 5, 9, 9, 9, 9, 10, 3, 11, 5, 11, 7, 7, 11, 11, 10, 3, 5, 10, 9, 10, 4, 9, 11, 4, 11, 11, 9, 12, 8, 9, 1, 5, 5, 5, 11, 9, 11, 4, 11, 12, 6, 12, 9, 12, 7, 11, 3, 9, 12, 11, 11, 9, 12, 4, 5, 9, 12, 5, 9, 7, 4, 11, 11, 11, 5, 11, 10, 12, 11, 7, 9, 10, 9, 10, 5, 8, 12, 9, 5, 11, 9, 7, 10, 5, 9, 11, 7, 7, 3, 3, 7, 5]
];
var noWildReels = [
    [5, 11, 7, 5, 9, 11, 9, 9, 3, 11, 11, 7, 11, 11, 9, 3, 3, 3, 1, 7, 9, 9, 7, 9, 7, 11, 11, 9, 5, 3, 11, 5, 7, 9, 7, 7, 7, 7, 7, 5, 9, 7, 5, 9, 11, 7, 7, 3, 7, 9, 11, 3, 11, 11, 5],
    [4, 6, 6, 6, 6, 6, 8, 12, 8, 8, 8, 8, 12, 8, 4, 4, 4, 8, 4, 1, 12, 12, 12, 10, 12, 6, 10, 12],
    [6, 3, 3, 3, 6, 8, 9, 9, 9, 12, 12, 12, 12, 12, 10, 10, 8, 8, 8, 1, 4, 6, 6, 6, 5, 7, 5, 5, 5, 9, 11, 10, 10, 10, 11, 3, 3],
    [11, 6, 12, 3, 12, 9, 10, 9, 10, 10, 10, 12, 10, 7, 10, 9, 12, 10, 10, 9, 3, 3, 3, 8, 6, 4, 12, 8, 3, 3, 9, 4, 8, 8, 8, 4, 8, 6, 7, 4, 12, 10, 9, 11, 12, 12, 12, 4, 6, 3, 10, 6, 5, 3, 9, 4, 9, 9, 9, 6, 12, 1, 4, 8, 5, 10, 12, 8, 6, 6, 6, 4, 8, 9, 3, 8, 8, 11, 6, 9, 6],
    [6, 8, 10, 4, 11, 5, 7, 7, 3, 6, 9, 9, 9, 9, 6, 12, 9, 11, 12, 3, 12, 11, 10, 8, 6, 9, 7, 12, 12, 12, 1, 8, 12, 8, 6, 12, 5, 9, 9, 8, 10, 12, 5, 5, 5, 9, 11, 10, 7, 9, 6, 12, 9, 9, 8, 11, 8, 10, 6, 6, 6, 5, 11, 11, 8, 12, 11, 4, 10, 11, 7, 7, 9, 12, 12],
    [9, 7, 11, 7, 7, 7, 12, 10, 9, 10, 5, 3, 3, 3, 10, 8, 9, 11, 8, 10, 10, 10, 7, 9, 5, 12, 11, 11, 11, 7, 9, 11, 12, 7, 12, 12, 12, 3, 9, 7, 4, 4, 4, 4, 4, 12, 12, 9, 12, 9, 9, 9, 10, 8, 12, 10, 7, 8, 8, 8, 4, 7, 3, 4, 1, 11]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 10, 6, 6, 4, 4, 2, 2, 2, 0],
    [0, 0, 0, 40, 25, 15, 10, 10, 6, 6, 4, 4, 4, 0],
    [0, 0, 0, 80, 50, 30, 25, 20, 10, 10, 8, 8, 8, 0],
    [0, 0, 0, 500, 100, 100, 50, 50, 25, 25, 20, 20, 20, 0]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.FreeSpinOption = function (player, select) {
    var randomCount = this.freeSpinData[7].fsCount;
    var randomIndex = this.freeSpinData[7].arrIdx;

    this.freeSpinRandomMode = {
        count: randomCount,
        multiArr: wildMultiArr[randomIndex],
    };

    this.freeSpinType = Number(select);

    if (this.freeSpinType == 6) {
        this.wildIndex = randomIndex;
        this.freeSpinLength = randomCount;
    } else {
        this.wildIndex = this.freeSpinType + 1;
        this.freeSpinLength = freeSpinCounts[this.freeSpinType];
    }

    this.freeSpinCacheList = this.freeSpinData[this.freeSpinType];
    this.tumbleCacheList = this.freeSpinCacheList[0];
    this.freeSpinLength = this.freeSpinCacheList.length;
    this.freeSpinIndex = 0;
    this.freeSpinWinMoney = 0;
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.wrlm_c = "";
    this.wrlm_cs = "";
    this.wrlm_res = "";

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.wildIndex = 0;

    this.winMoney = 0;
    this.winLines = [];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "FREE") {
        //                                       
        this.freeSpinData = viewCache.view;
        this.view = viewCache.view[7].view;

        this.scatterPositions = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.winMoney = this.scatterWin;
        this.currentGame = "FREE";
        return;
    }
    //                      
    this.tumbleCacheList = viewCache.view;
    this.view = this.tumbleCacheList[0];

    var result = GetFinalView(this.view);
    this.winMoney = WinFromView(this.view, player.betPerLine, result.multi);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumblingPositions);

    this.view = result.view;

    setWildPos(this, result);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var tumbleCacheView = this.tumbleCacheList[this.tumbleIndex];

    var result = GetFinalView(tumbleCacheView);

    this.view = result.view;
    this.winMoney = WinFromView(tumbleCacheView, player.betPerLine, result.multi);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumblingPositions);
    this.tmb_res += this.winMoney;

    setWildPos(this, result);

    this.tumbleIndex++;

    //                 
    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);

        if (this.tumbleStatus == "NOTUMBLE") {
            //                              
            this.freeSpinWinMoney += this.tmb_res;

            if (this.freeSpinIndex >= this.freeSpinLength) {
                this.freeSpinWinMoney += this.scatterWin;
                this.currentGame = "BASE";
            }
        }

        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    var multiView = this.tumbleCacheList[0];

    var result = GetFinalView(multiView);

    this.view = result.view;

    this.winMoney = WinFromView(multiView, player.betPerLine, result.multi);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumblingPositions);

    setWildPos(this, result);   //WinFromView              tumblingPositions                

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex >= this.freeSpinLength && this.winMoney == 0) {
        this.freeSpinWinMoney += this.scatterWin;
        this.currentGame = "BASE";
    }
};

var setWildPos = function (machine, result) {

    if (result.positions.length > 0) {
        var wrlmPos = [];
        for (var i = 0; i < tumblingPositions.length; i++) {
            if (result.positions.indexOf(tumblingPositions[i]) < 0) {
                wrlmPos.push(tumblingPositions[i]);
            }
        }

        if (wrlmPos.length > 0) {
            machine.wrlm_c = `${result.multi}~${wrlmPos.join()}`;
            machine.wrlm_cs = `${wild}~${machine.wildIndex}`;
            machine.wrlm_res = `${wild}~${result.multi}~${result.positions.join()}`;
        }

    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

    if (baseWin > 0) {
        var { viewList, tmb_res } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tmb_res;
        pattern.view = viewList;
    } else {
        var { viewList, tmb_res } = RandomZeroView(baseReels, bpl);
        pattern.win = tmb_res;
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
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin / 10);
            ;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinStore = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet);

    var wildMultiArrIndex = Util.random(1, wildMultiArr.length);
    var fsCount = freeSpinCounts[Util.random(0, freeSpinCounts.length)];

    //                                                                    
    var fsRandomCache = RandomFreeViewCache(baseReels, bpl, fsWin - scatterWinMoney, fsCount, wildMultiArrIndex);
    var fsCache = {};

    var max = fsRandomCache.win;

    for (var i = 1; i <= 6; ++i) { //             6                                     

        fsCache = RandomFreeViewCache(baseReels, bpl, fsWin - scatterWinMoney, freeSpinCounts[i - 1], i);

        if (fsCache.win > max)
            max = fsCache.win;

        freeSpinStore.push(fsCache.cache);
    }

    freeSpinStore.push(fsRandomCache.cache);
    freeSpinStore.push({
        view: scatterView,
        arrIdx: wildMultiArrIndex,
        fsCount: fsCount
    });

    return {
        win: max + scatterWinMoney,
        bpl: bpl,
        view: freeSpinStore,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
}

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinStore = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet);

    var wildMultiArrIndex = Util.random(1, wildMultiArr.length);
    var fsCount = freeSpinCounts[Util.random(0, freeSpinCounts.length)];

    //                                                                    
    var fsRandomCache = BuyBonusViewCache(baseReels, bpl, fsCount, wildMultiArrIndex);
    var fsCache = {};

    var max = fsRandomCache.win;

    for (var i = 1; i < wildMultiArr.length; ++i) { //             6                                     

        fsCache = BuyBonusViewCache(baseReels, bpl, freeSpinCounts[i - 1], i);

        if (fsCache.win > max)
            max = fsCache.win;

        freeSpinStore.push(fsCache.cache);
    }

    freeSpinStore.push(fsRandomCache.cache);
    freeSpinStore.push({
        view: scatterView,
        arrIdx: wildMultiArrIndex,
        fsCount: fsCount
    });

    return {
        win: max + scatterWinMoney,
        bpl: bpl,
        view: freeSpinStore,
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0, calcCount = 0;
    while (true) {
        var tmb_res = 0;
        var view = RandomView(reels);

        var multiView = GetMultiView(view);
        var result = GetFinalView(multiView);
        var tmb_res = WinFromView(multiView, bpl, result.multi);

        if (tmb_res == 0) {
            continue;
        }

        var nWinMoney = tmb_res;
        var viewList = [multiView];

        //                       
        while (nWinMoney) {
            var lastMultiView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumblingPositions);
            var newMultiView = GetTumbleView(lastMultiView, lastTumbling);
            var newResult = GetFinalView(newMultiView);
            if (isFreeSpinWin(newMultiView)) {
                continue;
            }

            nWinMoney = WinFromView(newMultiView, bpl, newResult.multi);
            viewList.push(newMultiView);
            tmb_res += nWinMoney;
        }

        if (tmb_res > bottomLimit && tmb_res <= maxWin) {
            return { viewList, tmb_res };
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
        var multiView = GetMultiView(view);
        var winMoney = WinFromView(multiView, bpl, 1);
        if (winMoney == 0) {
            var viewList = [];
            viewList.push(multiView);
            var tmb_res = 0;
            return { viewList, tmb_res };
        }
    }
};

var RandomView = function (reels, reelSizes = [], wildMultiArrIndex = 0) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(2, slotHeight - 1) + 1;
            if (Util.probability(5)) {
                reelSize = Util.random(2, slotHeight) + 1;
            }

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

        if (!isFreeSpinWin(randomView) && !isDoubleScatterView(randomView)) {
            break;
        }
    }

    return randomView;
};

var RandomScatterView = function (reels, bpl) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(2, slotHeight - 1) + 1;
            if (Util.probability(5)) {
                reelSize = Util.random(2, slotHeight) + 1;
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

        if (isFreeSpinWin(randomView) && !isDoubleScatterView(randomView) && WinFromView(randomView, bpl, 1) == 0) {
            break;
        }
    }
    return randomView;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, wildMultiArrIndex) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen, wildMultiArrIndex)
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

var BuyBonusViewCache = function (reels, bpl, fsLen, wildMultiArrIndex) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinWinMoney = 0;

    while (freeSpinIndex <= fsLen) {
        var tmb_res = 0;
        var view = RandomView(reels);
        var multiView = GetMultiView(view, wildMultiArrIndex);
        var result = GetFinalView(multiView);
        var tmb_res = WinFromView(multiView, bpl, result.multi);

        var nWinMoney = tmb_res;
        var viewList = [multiView];

        //                       
        while (nWinMoney) {
            var lastMultiView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumblingPositions);
            var newMultiView = GetTumbleView(lastMultiView, lastTumbling, wildMultiArrIndex);
            var newResult = GetFinalView(newMultiView);
            if (isFreeSpinWin(newMultiView)) {
                continue;
            }

            nWinMoney = WinFromView(newMultiView, bpl, newResult.multi);
            viewList.push(newMultiView);
            tmb_res += nWinMoney;
        }

        ++freeSpinIndex;
        freeSpinCacheList.push(viewList);
        freeSpinWinMoney += tmb_res;
    }

    freeSpinData = {
        win: freeSpinWinMoney,
        cache: freeSpinCacheList,
    };

    return freeSpinData;
};

var GetFinalView = function (multiView) {
    var view = Util.clone(multiView);
    var wildPositions = [], multi = 1;
    for (var i = 0; i < multiView.length; i++) {
        if (isWild(multiView[i] % 100)) {
            wildPositions.push(i);
            multi = Math.floor(multiView[i] / 100);
            view[i] = wild;
        }
    }

    return {
        view: view,
        positions: wildPositions,
        multi: multi
    };
};

var isDoubleScatterView = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var scatterCount = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (isScatter(view[i + j * slotWidth])) {
                scatterCount++;
            }
        }

        if (scatterCount > 1) {
            return true;
        }
    }

    return false;
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 6: return totalBet * 100;
        case 5: return totalBet * 25;
        case 4: return totalBet * 5;
        case 3: return totalBet * 3;
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

var GetMultiView = function (view, wildMultiArrIndex = 0) { //                                          0                          
    var multiArr = wildMultiArr[wildMultiArrIndex];
    var multi = multiArr[Util.random(0, multiArr.length)];
    var multiView = Util.clone(view);
    for (var i = 0; i < multiView.length; i++) {
        if (isWild(multiView[i])) {
            multiView[i] = wild + multi * 100;
        }
    }
    return multiView;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl, multi) {
    var money = 0;
    winLines = [];
    tumblingPositions = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (view[pos] == empty) {
            continue;
        }
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl, multi);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl, multi = 1) {
    //                           ,                                               
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId];
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                var pos = history[i];
                if (tumblingPositions.indexOf(pos) < 0) {
                    tumblingPositions.push(pos);
                }
            }

            winMoney *= multi;
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos] % 100)) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId];
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                var pos = history[i];
                if (tumblingPositions.indexOf(pos) < 0) {
                    tumblingPositions.push(pos);
                }
            }

            winMoney *= multi;
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl, multi);
    }
    return winMoney;
};

var GetTumbles = function (view, tumbling) {
    var tumbles = [];
    for (var i = 0; i < tumbling.length; i++) {
        var tumblePos = tumbling[i];
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    return tumbles;
};

var GetTumbleView = function (view, tumbles, wildMultiArrIndex = 0) {
    if (tumbles.length == 0) {
        return view;
    }

    while (true) {
        var tumbleView = Util.clone(view);

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

        var reelSizes = [slotHeight, slotHeight, slotHeight, slotHeight, slotHeight, slotHeight];

        var randomView = RandomView(noWildReels, reelSizes);
        if (Util.probability(10)) {
            randomView = RandomView(baseReels, reelSizes);
        }

        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];

                if (isWild(tumbleView[i])) {
                    var multiArr = wildMultiArr[wildMultiArrIndex];
                    var multi = multiArr[Util.random(0, multiArr.length)];

                    tumbleView[i] = wild + multi * 100;
                }
            }
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

var isWild = function (symbol) {
    return symbol == wild;
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

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
}

module.exports = SlotMachine;