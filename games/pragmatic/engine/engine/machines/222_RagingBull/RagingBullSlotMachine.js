var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 18;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinType = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                     
    this.goldenReels = [];
    this.wildMultiSet = [];
    this.wrlm_cs = "";
    this.wrlm_res = "";
    this.jackpotStatus = "NOJACKPOT";
    this.jackpotMulti = 0;
    //                 
    this.bonusCacheList = [];
    this.bonusSpinIndex = 0;
    this.bonusMaskList = [];
    this.bonusWinsList = [];
    this.bonusStatusList = [];
    this.moneyBonusWin = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var jackpotMultiArr = [15, 150, 2000];
var baseReels = [
    [9, 8, 10, 5, 10, 13, 5, 7, 13, 8, 12, 5, 4, 7, 7, 3, 4, 9, 9, 8, 5, 5, 12, 3, 3, 6, 6, 4, 4, 11, 11, 13, 4, 8, 8, 13, 3, 9, 7, 11, 13, 7, 6, 11, 7, 12, 9, 13, 13, 3, 8, 6, 12, 13, 4, 11, 7, 8, 11, 10, 10, 3, 6, 12, 10, 12, 5, 6, 11, 10, 6, 10, 13, 9, 10, 7, 12, 8, 12, 11, 9, 11, 8, 9, 13, 12, 5, 9, 6, 10, 4],
    [4, 6, 9, 9, 1, 11, 11, 13, 2, 7, 8, 8, 12, 6, 10, 2, 3, 13, 7, 11, 9, 3, 9, 12, 8, 6, 5, 5, 3, 7, 11, 13, 8, 1, 5, 8, 9, 4, 6, 10, 4, 4, 13, 13, 1, 5, 10, 10, 3, 6, 9, 11, 1, 10, 6, 4, 12, 2, 6, 6, 4, 9, 13, 8, 1, 3, 10, 12, 12, 11, 5, 3, 12, 13, 2, 4, 12, 7, 7, 10, 13, 9, 2, 11, 5, 5, 9, 8, 1, 6, 7, 11, 2, 10, 12, 10, 8, 1, 7, 4, 13, 12, 7, 8],
    [4, 12, 9, 13, 11, 6, 2, 7, 4, 4, 5, 8, 3, 12, 9, 9, 1, 8, 11, 8, 10, 11, 2, 12, 4, 3, 10, 11, 12, 5, 1, 8, 6, 4, 13, 13, 13, 11, 11, 2, 6, 8, 3, 7, 10, 5, 5, 3, 10, 7, 6, 6, 4, 1, 3, 6, 7, 10, 9, 13, 1, 12, 5, 12, 12, 2, 8, 8, 5, 12, 11, 9, 2, 6, 7, 13, 13, 4, 6, 2, 7, 13, 12, 3, 6, 7, 7, 10, 10, 8, 1, 5, 10, 8, 7, 13, 9, 9, 13, 11, 1, 9, 9, 10, 11],
    [13, 6, 13, 7, 7, 10, 6, 1, 8, 9, 9, 6, 10, 2, 12, 13, 10, 10, 8, 11, 2, 12, 6, 5, 13, 7, 2, 5, 9, 5, 4, 1, 11, 11, 11, 12, 12, 4, 7, 4, 6, 8, 1, 9, 13, 13, 12, 6, 3, 10, 5, 10, 7, 3, 8, 4, 9, 3, 4, 6, 6, 12, 1, 8, 8, 12, 7, 3, 10, 10, 9, 11, 2, 12, 10, 5, 9, 2, 13, 11, 8, 11, 11, 2, 13, 9, 5, 5, 3, 12, 9, 8, 11, 3, 7, 4, 4, 13, 6, 7, 13, 8, 12, 4, 5, 7, 11],
    [13, 8, 10, 13, 5, 13, 5, 5, 9, 11, 10, 6, 13, 6, 10, 10, 11, 9, 9, 13, 13, 11, 6, 3, 8, 10, 7, 7, 5, 3, 12, 7, 10, 4, 12, 12, 11, 8, 11, 13, 12, 4, 6, 8, 11, 6, 6, 3, 8, 12, 7, 13, 4, 6, 9, 3, 12, 4, 4, 9, 12, 11, 11, 7, 8, 8, 10, 5, 4, 12, 3, 13, 7, 11, 6, 9, 8, 7, 3, 9, 10, 5, 9, 7, 4, 12, 10, 9, 8],
];
var freeReels = [
    [
        [9, 8, 10, 5, 10, 13, 5, 7, 7, 13, 8, 12, 12, 5, 4, 7, 3, 4, 9, 8, 5, 12, 3, 6, 4, 11, 13, 4, 8, 13, 3, 9, 7, 11, 13, 7, 6, 11, 7, 12, 9, 13, 3, 8, 8, 6, 12, 13, 13, 4, 11, 7, 8, 11, 10, 3, 6, 12, 10, 12, 5, 5, 6, 6, 11, 10, 6, 10, 13, 9, 10, 7, 12, 8, 12, 11, 9, 11, 8, 9, 13, 12, 5, 9, 6, 10, 4],
        [4, 6, 9, 1, 11, 11, 13, 2, 7, 8, 12, 6, 10, 2, 3, 13, 7, 11, 9, 3, 9, 12, 8, 6, 6, 5, 5, 3, 3, 7, 11, 13, 8, 1, 5, 8, 9, 4, 6, 10, 4, 13, 13, 1, 5, 10, 3, 6, 9, 9, 11, 1, 10, 6, 4, 12, 2, 6, 6, 4, 9, 13, 8, 1, 3, 10, 12, 12, 11, 5, 3, 12, 13, 13, 13, 2, 4, 12, 7, 7, 10, 13, 9, 2, 11, 5, 5, 9, 8, 1, 6, 7, 11, 2, 10, 12, 10, 8, 1, 7, 4, 13, 12, 7, 8],
        [4, 12, 9, 13, 11, 6, 2, 7, 4, 5, 8, 3, 12, 9, 1, 8, 11, 8, 10, 11, 2, 12, 4, 3, 10, 11, 12, 5, 1, 8, 6, 4, 13, 11, 11, 2, 6, 8, 3, 7, 10, 5, 5, 3, 10, 10, 7, 6, 4, 1, 3, 6, 7, 10, 9, 13, 1, 12, 5, 12, 2, 8, 5, 12, 11, 9, 2, 6, 7, 13, 13, 4, 6, 6, 2, 7, 13, 12, 3, 6, 7, 10, 8, 1, 5, 10, 8, 7, 7, 13, 9, 9, 13, 11, 1, 9, 9, 10, 11],
        [13, 6, 13, 7, 10, 6, 1, 8, 9, 6, 10, 2, 12, 13, 10, 8, 11, 2, 12, 6, 5, 13, 7, 2, 5, 9, 5, 4, 1, 11, 12, 12, 4, 7, 4, 6, 8, 8, 1, 9, 13, 13, 6, 3, 10, 5, 10, 7, 3, 8, 4, 9, 3, 4, 6, 12, 1, 8, 12, 7, 7, 3, 10, 10, 9, 9, 11, 2, 12, 10, 5, 9, 2, 13, 11, 8, 11, 2, 13, 9, 5, 3, 12, 9, 8, 11, 3, 7, 4, 4, 13, 6, 7, 13, 8, 12, 4, 5, 7, 11],
        [13, 8, 10, 13, 5, 13, 5, 5, 9, 11, 10, 6, 13, 6, 10, 11, 9, 13, 11, 11, 6, 3, 8, 10, 10, 7, 5, 3, 12, 7, 10, 4, 4, 12, 11, 8, 11, 13, 12, 4, 6, 8, 11, 6, 6, 6, 3, 8, 12, 7, 7, 13, 4, 6, 9, 3, 12, 4, 9, 9, 12, 11, 7, 8, 10, 5, 4, 12, 3, 13, 7, 11, 6, 9, 8, 7, 3, 9, 10, 5, 9, 7, 4, 12, 10, 9, 8],
    ],
    [
        [9, 8, 10, 5, 10, 13, 5, 7, 7, 13, 8, 12, 12, 5, 4, 7, 3, 4, 9, 8, 5, 12, 3, 6, 4, 11, 13, 4, 8, 13, 3, 9, 7, 11, 13, 7, 6, 11, 7, 12, 9, 13, 3, 8, 8, 6, 12, 13, 13, 4, 11, 7, 8, 11, 10, 3, 6, 12, 10, 12, 5, 5, 6, 6, 11, 10, 6, 10, 13, 9, 10, 7, 12, 8, 12, 11, 9, 11, 8, 9, 13, 12, 5, 9, 6, 10, 4],
        [4, 6, 9, 1, 11, 11, 13, 2, 7, 8, 12, 6, 10, 2, 3, 13, 7, 11, 9, 3, 9, 12, 8, 6, 6, 5, 5, 3, 3, 7, 11, 13, 8, 1, 5, 8, 9, 4, 6, 10, 4, 13, 13, 1, 5, 10, 3, 6, 9, 9, 11, 1, 10, 6, 4, 12, 2, 6, 6, 4, 9, 13, 8, 1, 3, 10, 12, 12, 11, 5, 3, 12, 13, 13, 13, 2, 4, 12, 7, 7, 10, 13, 9, 2, 11, 5, 5, 9, 8, 1, 6, 7, 11, 2, 10, 12, 10, 8, 1, 7, 4, 13, 12, 7, 8],
        [4, 12, 9, 13, 11, 6, 2, 7, 4, 5, 8, 3, 12, 9, 1, 8, 11, 8, 10, 11, 2, 12, 4, 3, 10, 11, 12, 5, 1, 8, 6, 4, 13, 11, 11, 2, 6, 8, 3, 7, 10, 5, 5, 3, 10, 10, 7, 6, 4, 1, 3, 6, 7, 10, 9, 13, 1, 12, 5, 12, 2, 8, 5, 12, 11, 9, 2, 6, 7, 13, 13, 4, 6, 6, 2, 7, 13, 12, 3, 6, 7, 10, 8, 1, 5, 10, 8, 7, 7, 13, 9, 9, 13, 11, 1, 9, 9, 10, 11],
        [13, 6, 13, 7, 10, 6, 1, 8, 9, 6, 10, 2, 12, 13, 10, 8, 11, 2, 12, 6, 5, 13, 7, 2, 5, 9, 5, 4, 1, 11, 12, 12, 4, 7, 4, 6, 8, 8, 1, 9, 13, 13, 6, 3, 10, 5, 10, 7, 3, 8, 4, 9, 3, 4, 6, 12, 1, 8, 12, 7, 7, 3, 10, 10, 9, 9, 11, 2, 12, 10, 5, 9, 2, 13, 11, 8, 11, 2, 13, 9, 5, 3, 12, 9, 8, 11, 3, 7, 4, 4, 13, 6, 7, 13, 8, 12, 4, 5, 7, 11],
        [13, 8, 10, 13, 5, 13, 5, 5, 9, 11, 10, 6, 13, 6, 10, 11, 9, 13, 11, 11, 6, 3, 8, 10, 10, 7, 5, 3, 12, 7, 10, 4, 4, 12, 11, 8, 11, 13, 12, 4, 6, 8, 11, 6, 6, 6, 3, 8, 12, 7, 7, 13, 4, 6, 9, 3, 12, 4, 9, 9, 12, 11, 7, 8, 10, 5, 4, 12, 3, 13, 7, 11, 6, 9, 8, 7, 3, 9, 10, 5, 9, 7, 4, 12, 10, 9, 8],
    ],
    [
        [9, 8, 10, 5, 10, 13, 5, 7, 7, 13, 8, 12, 12, 5, 4, 7, 3, 4, 9, 8, 5, 12, 3, 6, 4, 11, 13, 4, 8, 13, 3, 9, 7, 11, 13, 7, 6, 11, 7, 12, 9, 13, 3, 8, 8, 6, 12, 13, 13, 4, 11, 7, 8, 11, 10, 3, 6, 12, 10, 12, 5, 5, 6, 6, 11, 10, 6, 10, 13, 9, 10, 7, 12, 8, 12, 11, 9, 11, 8, 9, 13, 12, 5, 9, 6, 10, 4],
        [4, 6, 9, 1, 11, 11, 13, 2, 7, 8, 12, 6, 10, 2, 3, 13, 7, 11, 9, 3, 9, 12, 8, 6, 6, 5, 5, 3, 3, 7, 11, 13, 8, 1, 5, 8, 9, 4, 6, 10, 4, 13, 13, 1, 5, 10, 3, 6, 9, 9, 11, 1, 10, 6, 4, 12, 2, 6, 6, 4, 9, 13, 8, 1, 3, 10, 12, 12, 11, 5, 3, 12, 13, 13, 13, 2, 4, 12, 7, 7, 10, 13, 9, 2, 11, 5, 5, 9, 8, 1, 6, 7, 11, 2, 10, 12, 10, 8, 1, 7, 4, 13, 12, 7, 8],
        [4, 12, 9, 13, 11, 6, 2, 7, 4, 5, 8, 3, 12, 9, 1, 8, 11, 8, 10, 11, 2, 12, 4, 3, 10, 11, 12, 5, 1, 8, 6, 4, 13, 11, 11, 2, 6, 8, 3, 7, 10, 5, 5, 3, 10, 10, 7, 6, 4, 1, 3, 6, 7, 10, 9, 13, 1, 12, 5, 12, 2, 8, 5, 12, 11, 9, 2, 6, 7, 13, 13, 4, 6, 6, 2, 7, 13, 12, 3, 6, 7, 10, 8, 1, 5, 10, 8, 7, 7, 13, 9, 9, 13, 11, 1, 9, 9, 10, 11],
        [13, 6, 13, 7, 10, 6, 1, 8, 9, 6, 10, 2, 12, 13, 10, 8, 11, 2, 12, 6, 5, 13, 7, 2, 5, 9, 5, 4, 1, 11, 12, 12, 4, 7, 4, 6, 8, 8, 1, 9, 13, 13, 6, 3, 10, 5, 10, 7, 3, 8, 4, 9, 3, 4, 6, 12, 1, 8, 12, 7, 7, 3, 10, 10, 9, 9, 11, 2, 12, 10, 5, 9, 2, 13, 11, 8, 11, 2, 13, 9, 5, 3, 12, 9, 8, 11, 3, 7, 4, 4, 13, 6, 7, 13, 8, 12, 4, 5, 7, 11],
        [13, 8, 10, 13, 5, 13, 5, 5, 9, 11, 10, 6, 13, 6, 10, 11, 9, 13, 11, 11, 6, 3, 8, 10, 10, 7, 5, 3, 12, 7, 10, 4, 4, 12, 11, 8, 11, 13, 12, 4, 6, 8, 11, 6, 6, 6, 3, 8, 12, 7, 7, 13, 4, 6, 9, 3, 12, 4, 9, 9, 12, 11, 7, 8, 10, 5, 4, 12, 3, 13, 7, 11, 6, 9, 8, 7, 3, 9, 10, 5, 9, 7, 4, 12, 10, 9, 8],
    ],
    [
        [9, 8, 10, 5, 10, 13, 5, 7, 7, 13, 8, 12, 12, 5, 4, 7, 3, 4, 9, 8, 5, 12, 3, 6, 4, 11, 13, 4, 8, 13, 3, 9, 7, 11, 13, 7, 6, 11, 7, 12, 9, 13, 3, 8, 8, 6, 12, 13, 13, 4, 11, 7, 8, 11, 10, 3, 6, 12, 10, 12, 5, 5, 6, 6, 11, 10, 6, 10, 13, 9, 10, 7, 12, 8, 12, 11, 9, 11, 8, 9, 13, 12, 5, 9, 6, 10, 4],
        [4, 6, 9, 1, 11, 11, 13, 2, 7, 8, 12, 6, 10, 2, 3, 13, 7, 11, 9, 3, 9, 12, 8, 6, 6, 5, 5, 3, 3, 7, 11, 13, 8, 1, 5, 8, 9, 4, 6, 10, 4, 13, 13, 1, 5, 10, 3, 6, 9, 9, 11, 1, 10, 6, 4, 12, 2, 6, 6, 4, 9, 13, 8, 1, 3, 10, 12, 12, 11, 5, 3, 12, 13, 13, 2, 4, 12, 7, 7, 10, 13, 9, 2, 11, 5, 5, 9, 8, 1, 6, 7, 11, 2, 10, 12, 10, 8, 1, 7, 4, 13, 12, 7, 8],
        [4, 12, 9, 13, 11, 6, 2, 7, 4, 5, 8, 3, 12, 9, 1, 8, 11, 8, 10, 11, 2, 12, 4, 3, 10, 11, 12, 5, 1, 8, 6, 4, 13, 11, 11, 2, 6, 8, 3, 7, 10, 5, 5, 3, 10, 10, 7, 6, 4, 1, 3, 6, 7, 10, 9, 13, 1, 12, 5, 12, 2, 8, 5, 12, 11, 9, 2, 6, 7, 13, 13, 4, 6, 6, 2, 7, 13, 12, 3, 6, 7, 10, 8, 1, 5, 10, 8, 7, 7, 13, 9, 9, 13, 11, 1, 9, 9, 10, 11],
        [13, 6, 13, 7, 10, 6, 1, 8, 9, 6, 10, 2, 12, 13, 10, 8, 11, 2, 12, 6, 5, 13, 7, 2, 5, 9, 5, 4, 1, 11, 12, 12, 4, 7, 4, 6, 8, 8, 1, 9, 13, 13, 6, 3, 10, 5, 10, 7, 3, 8, 4, 9, 3, 4, 6, 12, 1, 8, 12, 7, 7, 3, 10, 10, 9, 9, 11, 2, 12, 10, 5, 9, 2, 13, 11, 8, 11, 2, 13, 9, 5, 3, 12, 9, 8, 11, 3, 7, 4, 4, 13, 6, 7, 13, 8, 12, 4, 5, 7, 11],
        [13, 8, 10, 13, 5, 13, 5, 5, 9, 11, 10, 6, 13, 6, 10, 11, 9, 13, 11, 11, 6, 3, 8, 10, 10, 7, 5, 3, 12, 7, 10, 4, 4, 12, 11, 8, 11, 13, 12, 4, 6, 8, 11, 6, 6, 3, 8, 12, 7, 7, 13, 4, 6, 9, 3, 12, 4, 9, 9, 12, 11, 7, 8, 10, 5, 4, 12, 3, 13, 7, 11, 6, 9, 8, 7, 3, 9, 10, 5, 9, 7, 4, 12, 10, 9, 8],
    ],
    [
        [9, 8, 10, 5, 10, 13, 5, 7, 7, 13, 8, 12, 12, 5, 4, 7, 3, 4, 9, 8, 5, 12, 3, 6, 4, 11, 13, 4, 8, 13, 3, 9, 7, 11, 13, 7, 6, 11, 7, 12, 9, 13, 3, 8, 8, 6, 12, 13, 13, 4, 11, 7, 8, 11, 10, 3, 6, 12, 10, 12, 5, 5, 6, 6, 11, 10, 6, 10, 13, 9, 10, 7, 12, 8, 12, 11, 9, 11, 8, 9, 13, 12, 5, 9, 6, 10, 4],
        [4, 6, 9, 1, 11, 11, 13, 2, 7, 8, 12, 6, 10, 2, 3, 13, 7, 11, 9, 3, 9, 12, 8, 6, 6, 5, 5, 3, 3, 7, 11, 13, 8, 1, 5, 8, 9, 4, 6, 10, 4, 13, 13, 1, 5, 10, 3, 6, 9, 9, 11, 1, 10, 6, 4, 12, 2, 6, 6, 4, 9, 13, 8, 1, 3, 10, 12, 12, 11, 5, 3, 12, 13, 13, 2, 4, 12, 7, 7, 10, 13, 9, 2, 11, 5, 5, 9, 8, 1, 6, 7, 11, 2, 10, 12, 10, 8, 1, 7, 4, 13, 12, 7, 8],
        [4, 12, 9, 13, 11, 6, 2, 7, 4, 5, 8, 3, 12, 9, 1, 8, 11, 8, 10, 11, 2, 12, 4, 3, 10, 11, 12, 5, 1, 8, 6, 4, 13, 11, 11, 2, 6, 8, 3, 7, 10, 5, 5, 3, 10, 10, 7, 6, 4, 1, 3, 6, 7, 10, 9, 13, 1, 12, 5, 12, 2, 8, 5, 12, 11, 9, 2, 6, 7, 13, 13, 4, 6, 6, 2, 7, 13, 12, 3, 6, 7, 10, 8, 1, 5, 10, 8, 7, 7, 13, 9, 9, 13, 11, 1, 9, 9, 10, 11],
        [13, 6, 13, 7, 10, 6, 1, 8, 9, 6, 10, 2, 12, 13, 10, 8, 11, 2, 12, 6, 5, 13, 7, 2, 5, 9, 5, 4, 1, 11, 12, 12, 4, 7, 4, 6, 8, 8, 1, 9, 13, 13, 6, 3, 10, 5, 10, 7, 3, 8, 4, 9, 3, 4, 6, 12, 1, 8, 12, 7, 7, 3, 10, 10, 9, 9, 11, 2, 12, 10, 5, 9, 2, 13, 11, 8, 11, 2, 13, 9, 5, 3, 12, 9, 8, 11, 3, 7, 4, 4, 13, 6, 7, 13, 8, 12, 4, 5, 7, 11],
        [13, 8, 10, 13, 5, 13, 5, 5, 9, 11, 10, 6, 13, 6, 10, 11, 9, 13, 11, 11, 6, 3, 8, 10, 10, 7, 5, 3, 12, 7, 10, 4, 4, 12, 11, 8, 11, 13, 12, 4, 6, 8, 11, 6, 6, 3, 8, 12, 7, 7, 13, 4, 6, 9, 3, 12, 4, 9, 9, 12, 11, 7, 8, 10, 5, 4, 12, 3, 13, 7, 11, 6, 9, 8, 7, 3, 9, 10, 5, 9, 7, 4, 12, 10, 9, 8],
    ],
    [
        [9, 8, 10, 5, 10, 13, 5, 7, 7, 13, 8, 12, 12, 5, 4, 7, 3, 4, 9, 8, 5, 12, 3, 6, 4, 11, 13, 4, 8, 13, 3, 9, 7, 11, 13, 7, 6, 11, 7, 12, 9, 13, 3, 8, 8, 6, 12, 13, 13, 4, 11, 7, 8, 11, 10, 3, 6, 12, 10, 12, 5, 5, 6, 6, 11, 10, 6, 10, 13, 9, 10, 7, 12, 8, 12, 11, 9, 11, 8, 9, 13, 12, 5, 9, 6, 10, 4],
        [4, 6, 9, 1, 11, 11, 13, 2, 7, 8, 12, 6, 10, 2, 3, 13, 7, 11, 9, 3, 9, 12, 8, 6, 6, 5, 5, 3, 3, 7, 11, 13, 8, 1, 5, 8, 9, 4, 6, 10, 4, 13, 13, 1, 5, 10, 3, 6, 9, 9, 11, 1, 10, 6, 4, 12, 2, 6, 6, 4, 9, 13, 8, 1, 3, 10, 12, 12, 11, 5, 3, 12, 13, 13, 2, 4, 12, 7, 7, 10, 13, 9, 2, 11, 5, 5, 9, 8, 1, 6, 7, 11, 2, 10, 12, 10, 8, 1, 7, 4, 13, 12, 7, 8],
        [4, 12, 9, 13, 11, 6, 2, 7, 4, 5, 8, 3, 12, 9, 1, 8, 11, 8, 10, 11, 2, 12, 4, 3, 10, 11, 12, 5, 1, 8, 6, 4, 13, 11, 11, 2, 6, 8, 3, 7, 10, 5, 5, 3, 10, 10, 7, 6, 4, 1, 3, 6, 7, 10, 9, 13, 1, 12, 5, 12, 2, 8, 5, 12, 11, 9, 2, 6, 7, 13, 13, 4, 6, 6, 2, 7, 13, 12, 3, 6, 7, 10, 8, 1, 5, 10, 8, 7, 7, 13, 9, 9, 13, 11, 1, 9, 9, 10, 11],
        [13, 6, 13, 7, 10, 6, 1, 8, 9, 6, 10, 2, 12, 13, 10, 8, 11, 2, 12, 6, 5, 13, 7, 2, 5, 9, 5, 4, 1, 11, 12, 12, 4, 7, 4, 6, 8, 8, 1, 9, 13, 13, 6, 3, 10, 5, 10, 7, 3, 8, 4, 9, 3, 4, 6, 12, 1, 8, 12, 7, 7, 3, 10, 10, 9, 9, 11, 2, 12, 10, 5, 9, 2, 13, 11, 8, 11, 2, 13, 9, 5, 3, 12, 9, 8, 11, 3, 7, 4, 4, 13, 6, 7, 13, 8, 12, 4, 5, 7, 11],
        [13, 8, 10, 13, 5, 13, 5, 5, 9, 11, 10, 6, 13, 6, 10, 11, 9, 13, 11, 11, 6, 3, 8, 10, 10, 7, 5, 3, 12, 7, 10, 4, 4, 12, 11, 8, 11, 13, 12, 4, 6, 8, 11, 6, 6, 3, 8, 12, 7, 7, 13, 4, 6, 9, 3, 12, 4, 9, 9, 12, 11, 7, 8, 10, 5, 4, 12, 3, 13, 7, 11, 6, 9, 8, 7, 3, 9, 10, 5, 9, 7, 4, 12, 10, 9, 8],
    ],
    [
        [9, 8, 10, 5, 10, 13, 5, 7, 7, 13, 8, 12, 12, 5, 4, 7, 3, 4, 9, 8, 5, 12, 3, 6, 4, 11, 13, 4, 8, 13, 3, 9, 7, 11, 13, 7, 6, 11, 7, 12, 9, 13, 3, 8, 8, 6, 12, 13, 13, 4, 11, 7, 8, 11, 10, 3, 6, 12, 10, 12, 5, 5, 6, 6, 11, 10, 6, 10, 13, 9, 10, 7, 12, 8, 12, 11, 9, 11, 8, 9, 13, 12, 5, 9, 6, 10, 4],
        [4, 6, 9, 1, 11, 11, 13, 2, 7, 8, 12, 6, 10, 2, 3, 13, 7, 11, 9, 3, 9, 12, 8, 6, 6, 5, 5, 3, 3, 7, 11, 13, 8, 1, 5, 8, 9, 4, 6, 10, 4, 13, 13, 1, 5, 10, 3, 6, 9, 9, 11, 1, 10, 6, 4, 12, 2, 6, 6, 4, 9, 13, 8, 1, 3, 10, 12, 12, 11, 5, 3, 12, 13, 13, 2, 4, 12, 7, 7, 10, 13, 9, 2, 11, 5, 5, 9, 8, 1, 6, 7, 11, 2, 10, 12, 10, 8, 1, 7, 4, 13, 12, 7, 8],
        [4, 12, 9, 13, 11, 6, 2, 7, 4, 5, 8, 3, 12, 9, 1, 8, 11, 8, 10, 11, 2, 12, 4, 3, 10, 11, 12, 5, 1, 8, 6, 4, 13, 11, 11, 2, 6, 8, 3, 7, 10, 5, 5, 3, 10, 10, 7, 6, 4, 1, 3, 6, 7, 10, 9, 13, 1, 12, 5, 12, 2, 8, 5, 12, 11, 9, 2, 6, 7, 13, 13, 4, 6, 6, 2, 7, 13, 12, 3, 6, 7, 10, 8, 1, 5, 10, 8, 7, 7, 13, 9, 9, 13, 11, 1, 9, 9, 10, 11],
        [13, 6, 13, 7, 10, 6, 1, 8, 9, 6, 10, 2, 12, 13, 10, 8, 11, 2, 12, 6, 5, 13, 7, 2, 5, 9, 5, 4, 1, 11, 12, 12, 4, 7, 4, 6, 8, 8, 1, 9, 13, 13, 6, 3, 10, 5, 10, 7, 3, 8, 4, 9, 3, 4, 6, 12, 1, 8, 12, 7, 7, 3, 10, 10, 9, 9, 11, 2, 12, 10, 5, 9, 2, 13, 11, 8, 11, 2, 13, 9, 5, 3, 12, 9, 8, 11, 3, 7, 4, 4, 13, 6, 7, 13, 8, 12, 4, 5, 7, 11],
        [13, 8, 10, 13, 5, 13, 5, 5, 9, 11, 10, 6, 13, 6, 10, 11, 9, 13, 11, 11, 6, 3, 8, 10, 10, 7, 5, 3, 12, 7, 10, 4, 4, 12, 11, 8, 11, 13, 12, 4, 6, 8, 11, 6, 6, 3, 8, 12, 7, 7, 13, 4, 6, 9, 3, 12, 4, 9, 9, 12, 11, 7, 8, 10, 5, 4, 12, 3, 13, 7, 11, 6, 9, 8, 7, 3, 9, 10, 5, 9, 7, 4, 12, 10, 9, 8],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 12, 12, 9, 9, 4, 4, 3, 3, 2, 2],
    [0, 0, 0, 45, 30, 30, 24, 24, 12, 12, 9, 9, 6, 6],
    [0, 0, 0, 126, 81, 81, 63, 63, 36, 36, 27, 27, 18, 18],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;
    this.jackpotStatus = "NOJACKPOT";

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.goldenReels = cache.golden;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        var cache = this.freeSpinCacheList[0][0].view;
        this.view = cache.view;
        this.goldenReels = cache.golden;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }

        console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    } else if (viewCache.type == "BONUS") {
        this.currentGame = "BONUS";
        var cache = viewCache.view;
        this.view = cache.view;
        this.goldenReels = cache.golden;
        this.jackpotMulti = cache.multi;
        this.bonusSpinIndex = 0;
        this.bonusCacheList = cache.jackpotList;

        //                                 
        this.bonusMaskList = ["h", "h", "h", "h", "h", "h", "h", "h", "h"];
        this.bonusWinsList = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.bonusStatusList = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        console.log(`[                ] ${this.jackpotMulti * player.betPerLine * this.lineCount}`);
    }

    var res = WinFromView(this.view, player.betPerLine);

    this.winMoney = res.win;
    this.winLines = res.lines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }

    //             
    if (isGoldenJackpot(this.goldenReels)) {
        this.jackpotStatus = "JACKPOT";
        this.jackpotMulti = jackpotMultiArr[this.goldenReels.length - 3];
        this.winMoney = MoneyGoldenJackpot(this.goldenReels, player.betPerLine * this.lineCount);
    }
};

SlotMachine.prototype.FreeSpinOption = async function (player, select) {
    this.freeSpinType = Number(select);

    this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
    this.freeSpinLength = this.freeSpinCacheList[0].freeSpinLength;
    this.wildMultiSet = this.freeSpinCacheList[0].wildMultiSet;
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view.view;
    var wildMulti = this.freeSpinCacheList[this.freeSpinIndex].wildMulti;
    var wildMultiSetIndex = this.freeSpinCacheList[0].wildMultiSetIndex;

    this.goldenReels = this.freeSpinCacheList[this.freeSpinIndex].view.golden;

    var res = WinFromView(this.view, player.betPerLine, wildMulti);
    this.winMoney = res.win;
    this.winLines = res.lines;

    this.wrlm_cs = `${wild}~${wildMultiSetIndex}`;
    if (res.wilds.length > 0) {
        this.wrlm_res = `${wild}~${wildMulti}~${res.wilds}`;
    } else {
        this.wrlm_res = `${wild}~${wildMulti}`;
    }

    this.virtualReels = {
        above: RandomLineFromReels(freeReels[this.freeSpinType]),
        below: RandomLineFromReels(freeReels[this.freeSpinType]),
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;

    //                       0:                   
    //                       1:                                    
    // 2                                         
    if (this.bonusSpinIndex > 1) {
        var selected = Number(param.ind);
        this.bonusStatusList[selected] = this.bonusSpinIndex - 1;
        this.bonusMaskList[selected] = "pw";
        this.bonusWinsList[selected] = this.bonusCacheList[this.bonusSpinIndex - 2];

        if (this.bonusSpinIndex >= this.bonusCacheList.length + 1) {
            this.winMoney = this.jackpotMulti * player.betPerLine * this.lineCount;
            this.moneyBonusWin = this.winMoney;

            this.currentGame = "BASE";
        }
    }

    this.bonusSpinIndex++;
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpCache;

    if (baseWin > 0) {
        // 5                                   
        if (Util.probability(3)) {
            tmpCache = RandomJackpotView(baseReels, bpl, totalBet, baseWin);
        } else {
            tmpCache = RandomWinView(baseReels, bpl, baseWin);
        }
    } else {
        tmpCache = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: {
            view: tmpCache.view,
            golden: tmpCache.golden,
        },
        win: tmpCache.win,
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    // FS                
    var viewList = [];
    var moneyList = [];

    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl).win;
    var scatterGoldenReels = RandomGoldenReels(Util.random(0, 3));

    var lengthArray = [25, 20, 15, 13, 10, 6];
    var wildMultiSetArray = [
        [2, 3, 5],
        [3, 5, 8],
        [5, 8, 10],
        [8, 10, 15],
        [10, 15, 30],
        [15, 30, 40],
    ];

    for (var i = 0; i < 7; i++) {
        var freeSpinLength = 0; //             
        var wildMultiSet = []; //              
        var wildMultiSetIndex = 0;

        //                                                     
        if (i == 6) {
            wildMultiSetIndex = Util.random(0, wildMultiSetArray.length);
            freeSpinLength = lengthArray[Util.random(0, lengthArray.length)];
            wildMultiSet = wildMultiSetArray[wildMultiSetIndex];
        } else {
            wildMultiSetIndex = i;
            freeSpinLength = lengthArray[i];
            wildMultiSet = wildMultiSetArray[i];
        }

        viewList[i] = [];

        var scatterCache = {
            view: {
                view: scatterView,
                golden: scatterGoldenReels,
            },
            freeSpinLength: freeSpinLength,
            wildMultiSet: wildMultiSet,
            wildMultiSetIndex: wildMultiSetIndex,
        };

        viewList[i] = [scatterCache];

        var result = RandomFreeViewCache(freeReels[i], bpl, fsWin, freeSpinLength, totalBet, wildMultiSet);
        viewList[i] = viewList[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: viewList,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    //                    
    var temp = RandomZeroView(baseReels, bpl);
    var bonusView = temp.view;
    var bonusGoldenReels = [];

    //              
    var multi = bsWin / totalBet;
    var value = 0;
    var maxPrize = jackpotMultiArr[jackpotMultiArr.length - 1];
    if (multi >= maxPrize) {
        multi = maxPrize;
    } else {
        for (var i = 0; i < jackpotMultiArr.length; i++) {
            if (multi <= jackpotMultiArr[i]) {
                multi = jackpotMultiArr[i - 1 >= 0 ? i - 1 : 0];
                break;
            }
        }
    }

    value = multi > jackpotMultiArr[0] ? multi : jackpotMultiArr[0];
    //                                                  
    var other1 = jackpotMultiArr[(jackpotMultiArr.indexOf(value) + 1) % 3];
    var other2 = jackpotMultiArr[(jackpotMultiArr.indexOf(value) + 2) % 3];

    //                                
    var jackpot, jackpotList;
    while (true) {
        jackpotList = [];
        while (true) {
            if (Util.count(jackpotList, other1) == 2 || Util.count(jackpotList, other2) == 2) {
                jackpot = value;
            } else {
                jackpot = jackpotMultiArr[Util.random(0, jackpotMultiArr.length)];
            }

            jackpotList.push(jackpot);

            if (Util.count(jackpotList, value) == 3) {
                break;
            }
        }

        if (jackpotList.length < 10) {
            break;
        }
    }

    var cache = {
        view: bonusView,
        golden: bonusGoldenReels,
        jackpotList: jackpotList,
        multi: value,
    };

    var pattern = {
        view: cache,
        bpl: bpl,
        win: multi * totalBet,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, goldenReels;
    goldenReels = RandomGoldenReels(Util.random(0, 3));
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl).win;

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
        golden: goldenReels,
        win: tmpWin,
    };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin, goldenReels;
    goldenReels = RandomGoldenReels(Util.random(0, 3));

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl).win;

        if (tmpWin == 0) {
            break;
        }
    }
    return {
        view: tmpView,
        golden: goldenReels,
        win: tmpWin,
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

        if (!isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels) {
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

        if (isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, totalBet, wildMultiSet) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin, wildMulti, goldenReels;
            while (true) {
                fsview = RandomView(reels);
                wildMulti = wildMultiSet[Util.random(0, wildMultiSet.length)];
                fsWin = WinFromView(fsview, bpl, wildMulti).win;

                goldenReels = RandomGoldenReels(Util.random(0, 3));
                fsWin += MoneyGoldenJackpot(goldenReels, totalBet);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push({
                view: {
                    view: fsview,
                    golden: goldenReels,
                },
                wildMulti: wildMulti,
            });

            freeSpinWinMoney += fsWin;

            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
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

var RandomJackpotView = function (reels, bpl, totalBet, maxWin) {
    var tmpView, goldenReels, jackpotMoney;

    while (true) {
        tmpView = RandomView(reels);
        if (WinFromView(tmpView, bpl).win == 0) {
            break;
        }
    }

    //                                               
    goldenReels = RandomGoldenReels(3);
    jackpotMoney = totalBet * 15;

    return {
        view: tmpView,
        golden: goldenReels,
        win: jackpotMoney,
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

var RandomGoldenReels = function (count) {
    var goldenReels;
    var reelCount = count;

    var reelNoArray = [0, 1, 2, 3, 4];
    goldenReels = Util.shuffle(reelNoArray).slice(0, reelCount);

    return goldenReels;
};

var WinFromView = function (view, bpl, wMulti = 1) {
    var money = 0;
    var lines = [];
    var wilds = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        var result = RecursiveSearch(view, 1, history, view[pos], wMulti, bpl);
        money += result.win;
        lines = lines.concat(result.lines);
        wilds = wilds.concat(result.wilds);
    }

    return { win: money, lines: lines, wilds: wilds };
};

var MoneyGoldenJackpot = function (goldenReels, totalBet) {
    var count = goldenReels.length;
    var jackpotMoney = 0;

    if (count == 3) {
        jackpotMoney = 15 * totalBet;
    } else if (count == 4) {
        jackpotMoney = 150 * totalBet;
    } else if (count == 5) {
        jackpotMoney = 2000 * totalBet;
    }

    return jackpotMoney;
};

var RecursiveSearch = function (view, step, history, symbolId, wMulti, bpl) {
    var winLines = [];
    var result = {};
    var wildPositions = [];

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId];

        var hasWild = false;
        for (var i = 0; i < history.length; i++) {
            if (view[history[i]] == wild) {
                hasWild = true;
                if (wildPositions.indexOf(history[i]) == -1) {
                    wildPositions.push(history[i]);
                }
                break;
            }
        }
        if (hasWild) {
            winMoney *= wMulti;
        }

        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join("~")}`);
        }

        result.win = winMoney;
        result.lines = winLines;
        result.wilds = wildPositions;

        return result;
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
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId];

        var hasWild = false;
        for (var i = 0; i < history.length; i++) {
            if (view[history[i]] == wild) {
                hasWild = true;
                if (wildPositions.indexOf(history[i]) == -1) {
                    wildPositions.push(history[i]);
                }
                break;
            }
        }
        if (hasWild) {
            winMoney *= wMulti;
        }

        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join("~")}`);
        }

        result.win = winMoney;
        result.lines = winLines;
        result.wilds = wildPositions;

        return result;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        var tempRes = RecursiveSearch(view, step + 1, historyTmp, symbolId, wMulti, bpl);

        winMoney += tempRes.win;
        winLines = winLines.concat(tempRes.lines);
        wildPositions = wildPositions.concat(tempRes.wilds);
    }

    result.win = winMoney;
    result.lines = winLines;
    result.wilds = wildPositions;

    return result;
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
};

var isGoldenJackpot = function (goldenReels) {
    return goldenReels.length > 2;
};

module.exports = SlotMachine;