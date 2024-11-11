var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.baseType = 0;

    //                           
    this.freeSpinType = -1;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinWheelIndex = 0;
    this.freeSpinWilds = [];

    //                                                                                                 .
    // FS_BONUS_START:                , FS_BONUS_OPTION:             , FS_BONUS_END:                
    this.freeSpinBonusStep = "FS_BONUS_START"; //

    //                    
    this.bonusIndexArr = [];
    this.bonusMulti = 0;
    this.moneyBonusWin = 0;
    this.bonusWheelFlag = false;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var scatter = 1, wild = 2, empty = 13;
var slotWidth = 7, slotHeight = 7;
var NORMALBASE = 0; //                     
var WILDBASE = 1; //                           
var exceptArr = [
    [35, 36, 37, 38, 39, 42, 43, 44, 45, 46],
    [0, 1, 2, 4, 5, 6, 7, 8, 12, 13, 14, 20, 28, 34, 35, 36, 40, 41, 42, 43, 44, 46, 47, 48],
];
var bonusMultiArr = [1, 75, 150, 125, 250, 100, 1, 125, 100, 75, 150, 250, 1, 100, 75, 250, 150, 100, 1, 125, 250, 100, 150, 75, 1, 250, 125, 200, 100, 75];
var baseReels = [
    [
        [7, 7, 9, 9, 2, 11, 11, 8, 8, 4, 4, 10, 10, 7, 7, 6, 6, 12, 12, 3, 3, 9, 9, 7, 7, 10, 10, 5, 5, 11, 11, 7, 7, 8, 8, 10, 10, 4, 4, 12, 12, 7, 7, 9, 9, 6, 6, 8, 8, 11, 11, 7, 7, 10, 10, 2, 12, 12, 8, 8, 5, 5, 9, 9, 10, 10, 7, 7, 11, 11, 4, 4, 10, 10, 12, 12, 6, 6, 11, 11, 2, 12, 12, 5, 5, 9, 9, 11, 11, 6, 6, 10, 10, 3, 3, 12, 12, 8, 8, 9, 9],
        [4, 4, 10, 10, 6, 6, 1, 12, 12, 7, 7, 11, 11, 4, 4, 9, 9, 7, 7, 1, 11, 11, 5, 5, 12, 12, 8, 8, 2, 10, 10, 6, 6, 1, 5, 5, 4, 4, 9, 9, 8, 8, 3, 3, 12, 9, 6, 6, 1, 10, 10, 8, 8, 12, 12, 4, 4, 11, 11, 7, 7, 2, 9, 9, 6, 6, 11, 11, 1, 3, 3, 5, 5, 12, 12, 8, 8, 1, 9, 9, 6, 6, 10, 10, 4, 4, 11, 11, 7, 7, 1, 12, 12, 6, 6, 10, 10, 5, 5, 11, 11, 1, 6, 6, 9, 9, 2, 8, 8, 12, 12, 3, 3, 11, 11, 7, 7, 10],
        [3, 3, 6, 6, 12, 6, 7, 7, 9, 9, 1, 9, 9, 5, 5, 2, 11, 11, 8, 8, 12, 12, 6, 6, 9, 9, 1, 8, 8, 10, 10, 4, 4, 9, 9, 5, 5, 10, 10, 7, 7, 11, 11, 8, 9, 12, 12, 1, 9, 9, 8, 8, 2, 10, 10, 5, 5, 12, 12, 7, 7, 11, 11, 1, 8, 8, 9, 9, 5, 5, 1, 12, 12, 4, 4, 10, 10, 8, 8, 9, 9, 2, 11, 11, 6, 6, 12, 12, 1, 7, 7, 10, 10, 3, 3, 9, 9, 8, 8, 11, 11, 5, 5, 12, 12, 1, 10, 10, 8, 8, 9, 9, 6],
        [7, 7, 12, 12, 7, 7, 1, 9, 9, 5, 5, 8, 8, 10, 10, 3, 3, 5, 6, 12, 12, 4, 4, 9, 9, 7, 7, 11, 11, 2, 10, 10, 5, 5, 12, 12, 1, 6, 6, 11, 11, 7, 7, 3, 3, 9, 9, 8, 8, 5, 5, 10, 10, 6, 6, 1, 10, 10, 5, 5, 12, 12, 7, 5, 3, 9, 9, 8, 8, 11, 11, 5, 5, 12, 12, 1, 7, 7, 10, 10, 4, 4, 7, 7, 2, 9, 9, 5, 5, 6, 6, 11, 11, 8, 8, 3, 3, 12, 12, 7, 7, 10, 10, 5, 5, 9, 9, 6, 6, 1, 12, 12, 7, 7, 4, 4, 9, 9, 7, 7, 2, 12, 12, 6, 6, 3, 3, 11, 11, 7, 8],
        [8, 8, 11, 11, 4, 4, 6, 6, 9, 9, 5, 5, 2, 10, 10, 7, 7, 4, 4, 9, 9, 6, 6, 11, 11, 3, 3, 7, 7, 10, 10, 4, 7, 6, 6, 11, 11, 2, 9, 9, 8, 8, 5, 5, 11, 11, 4, 7, 10, 10, 7, 7, 8, 8, 12, 12, 5, 5, 6, 6, 10, 10, 7, 7, 8, 8, 9, 9, 4, 4, 11, 11, 8, 8, 10, 10, 6, 6, 12, 12, 3, 3, 9, 9, 6, 6, 8, 8, 12, 12, 6, 6, 10, 10, 2, 11, 11, 7, 7, 12, 12, 4, 4, 10, 10, 6, 6, 11, 11, 5, 5, 9, 9, 8, 8, 6, 6, 10, 10, 4, 4, 7, 7, 11, 6, 12],
        [13, 13, 13, 13, 13, 13, 13],
        [13, 13, 13, 13, 13, 13, 13],
    ],
    [
        [2, 2, 2, 2, 2, 2, 2],
        [3, 3, 9, 9, 10, 10, 8, 8, 12, 12, 7, 7, 9, 9, 5, 5, 10, 10, 8, 8, 9, 9, 6, 6, 11, 11, 4, 4, 10, 10, 8, 8, 9, 9, 7, 7, 12, 12, 6, 6, 11, 11, 8, 8, 9, 9, 10, 10, 7, 7, 11, 11, 9, 9, 3, 3, 12, 12, 8, 8, 10, 10, 7, 7, 9, 9, 10, 10, 5, 5, 11, 11, 6, 6, 10, 10, 2, 12, 12, 8, 8, 9, 9, 11, 11, 7, 7, 12, 12, 10, 10, 4, 4, 11, 11, 8, 8, 9, 9, 12, 12, 5, 5, 11, 11, 6, 6],
        [3, 3, 9, 7, 11, 11, 5, 5, 10, 10, 6, 6, 12, 12, 7, 7, 9, 9, 11, 11, 4, 4, 12, 12, 10, 10, 6, 6, 11, 11, 7, 7, 12, 12, 5, 5, 9, 9, 11, 11, 8, 6, 10, 10, 2, 12, 12, 7, 7, 11, 11, 3, 3, 12, 12, 8, 8, 9, 9, 4, 4, 7, 11, 6, 6, 4, 10, 8, 8, 12, 12, 7, 7, 11, 11, 12, 12, 2, 9, 9, 10, 10, 6, 6, 11, 11, 9, 9, 7, 7, 12, 12, 8, 8, 10, 10, 4, 4, 9, 9, 7, 7, 11, 11, 8, 8, 12, 12, 5],
        [2, 2, 2, 2, 2, 2, 2],
        [3, 3, 9, 9, 4, 4, 8, 8, 12, 12, 3, 3, 6, 6, 9, 9, 5, 5, 12, 4, 4, 5, 5, 10, 10, 3, 3, 8, 8, 9, 9, 5, 5, 4, 4, 12, 12, 5, 5, 7, 7, 9, 9, 2, 11, 11, 3, 3, 10, 10, 5, 5, 7, 7, 9, 9, 6, 6, 4, 4, 11, 11, 5, 5, 9, 9, 6, 6, 12, 12, 5, 5, 10, 10, 7, 7, 2, 11, 11, 5, 5, 8, 8, 12, 12, 7, 7, 4, 4, 10, 10, 6, 6, 9, 9, 7, 7, 3, 3, 11, 11, 8, 8, 7, 7, 9, 9, 6, 6, 10, 10, 7, 7, 12, 12, 8, 8, 11, 11, 12, 12],
        [4, 4, 5, 5, 9, 9, 7, 7, 11, 11, 8, 8, 10, 10, 4, 4, 9, 9, 3, 3, 12, 12, 6, 6, 11, 11, 7, 7, 5, 5, 11, 11, 8, 4, 10, 10, 2, 5, 5, 12, 12, 6, 6, 7, 7, 11, 11, 4, 4, 5, 5, 10, 10, 6, 7, 8, 8, 12, 12, 7, 7, 9, 9, 8, 8, 6, 6, 10, 5, 4, 4, 5, 5, 11, 11, 6, 6, 7, 7, 9, 9, 8, 8, 4, 4, 10, 10, 6, 6, 8, 8, 12, 12, 2, 11, 11, 6, 6, 8, 8, 10, 10, 3, 3, 9, 9, 6, 6, 7, 7, 10, 10, 5, 11, 11, 4, 10, 8, 8, 11, 11, 6, 6, 12, 12],
        [2, 2, 2, 2, 2, 2, 2],
    ],
];
var freeReels = [
    [
        [8, 8, 10, 10, 5, 5, 12, 12, 9, 9, 4, 4, 11, 11, 7, 7, 10, 10, 12, 12, 5, 5, 11, 11, 8, 8, 12, 12, 6, 6, 10, 10, 7, 7, 9, 9, 11, 11, 3, 3, 12, 12, 6, 6, 11, 11, 8, 8, 10, 10, 4, 4, 9, 9, 5, 5, 12, 12, 7, 7, 10, 10, 6, 6, 9, 9, 8, 8, 11, 11, 4, 4, 9, 9],
        [8, 8, 11, 11, 6, 6, 9, 9, 7, 7, 12, 12, 4, 4, 9, 9, 5, 5, 10, 10, 8, 8, 11, 11, 12, 12, 6, 6, 10, 10, 3, 3, 9, 9, 5, 5, 11, 11, 7, 7, 10, 10, 4, 4, 12, 12, 6, 6, 11, 11, 7, 7, 9, 9, 12, 12, 3, 3, 10, 7, 6, 6, 11, 11, 9, 9, 5, 5, 12, 12, 8, 11, 10, 10, 7, 7, 9, 9],
        [8, 8, 10, 10, 6, 6, 11, 11, 8, 8, 9, 9, 4, 4, 12, 12, 7, 7, 11, 11, 10, 10, 5, 5, 12, 12, 7, 7, 10, 10, 3, 3, 8, 10, 9, 9, 6, 6, 10, 10, 4, 4, 11, 11, 7, 7, 12, 12, 5, 5, 11, 11, 8, 8, 9, 9, 6, 6, 5, 10, 12, 12, 7, 7, 11, 11, 4, 8, 3, 3, 10, 10, 5, 5, 12, 12, 7, 7, 9, 9],
        [8, 8, 11, 11, 6, 5, 10, 10, 5, 5, 12, 12, 8, 8, 11, 11, 3, 4, 9, 9, 7, 7, 12, 12, 8, 8, 10, 10, 4, 4, 9, 9, 6, 6, 11, 11, 7, 7, 12, 12, 8, 8, 11, 11, 9, 9, 5, 5, 10, 10, 7, 7, 12, 12, 3, 3, 10, 7, 6, 6, 9, 9, 8, 8, 11, 10, 7, 7, 12, 12, 5, 5, 9, 9],
        [6, 6, 12, 12, 7, 7, 11, 11, 4, 4, 9, 9, 8, 8, 10, 10, 5, 5, 12, 12, 6, 6, 11, 11, 3, 3, 10, 10, 7, 7, 9, 9, 12, 12, 7, 8, 11, 11, 5, 5, 8, 10, 6, 6, 12, 12, 8, 8, 9, 9, 4, 4, 10, 10, 6, 9, 11, 11, 7, 7, 9, 9, 3, 3, 10, 12, 5, 5, 11, 11, 7, 7, 9, 9],
        [13, 13, 13, 13, 13, 13, 13],
        [13, 13, 13, 13, 13, 13, 13],
    ],
    [
        [2, 2, 2, 2, 2, 2, 2],
        [3, 3, 11, 11, 7, 7, 10, 10, 6, 6, 9, 9, 8, 8, 12, 12, 4, 4, 11, 11, 4, 8, 10, 10, 7, 7, 4, 9, 12, 12, 5, 5, 10, 10, 9, 9, 8, 8, 10, 10, 6, 6, 9, 9, 11, 11, 7, 7, 12, 12, 9, 9, 5, 5, 11, 11, 8, 8, 10, 10, 9, 9, 6, 6, 10, 10, 8, 8, 12, 12, 2, 7, 7, 10, 10, 8, 8, 11, 11, 9, 9, 3, 3, 12, 12, 5, 5, 11, 11, 9, 9, 6],
        [3, 3, 11, 5, 6, 6, 12, 12, 10, 10, 2, 11, 11, 4, 4, 12, 12, 9, 9, 7, 7, 11, 11, 5, 5, 12, 12, 8, 8, 10, 10, 2, 12, 12, 6, 6, 11, 11, 7, 7, 9, 9, 8, 8, 2, 10, 10, 4, 4, 12, 12, 6, 6, 11, 11, 8, 8, 9, 9, 2, 8, 10, 7, 7, 12, 12, 5, 5, 11, 11, 7, 7, 2, 9, 9, 8, 8, 10, 10, 6, 6, 12, 12, 4, 4, 11, 11, 2, 12, 12, 3, 11, 11, 5, 5, 12, 12, 7, 7, 2, 10, 10, 8, 8, 9, 9, 7, 7],
        [2, 2, 2, 2, 2, 2, 2],
        [3, 3, 12, 12, 6, 6, 7, 7, 10, 10, 4, 4, 8, 8, 9, 9, 5, 5, 7, 7, 12, 12, 6, 6, 11, 11, 7, 7, 9, 9, 5, 5, 12, 12, 4, 4, 10, 10, 7, 7, 9, 9, 3, 3, 8, 8, 12, 12, 7, 7, 4, 4, 11, 11, 6, 6, 7, 7, 9, 9, 3, 3, 5, 5, 12, 12, 7, 7, 10, 10, 6, 6, 8, 8, 9, 9, 5, 5, 7, 7, 11, 11, 2, 12, 12, 5, 5, 8, 8, 10, 10, 4, 5, 5, 6, 6, 12, 12, 4, 4, 11, 11, 5, 5, 10, 10, 8, 8, 9, 9, 3, 3, 6, 6, 11, 11, 4, 4, 12, 12, 5, 5, 9, 9, 4, 4],
        [3, 3, 9, 9, 8, 8, 10, 10, 5, 5, 6, 6, 11, 11, 8, 8, 7, 7, 10, 10, 4, 4, 8, 8, 11, 11, 5, 5, 4, 6, 9, 9, 4, 4, 7, 7, 10, 10, 2, 6, 6, 11, 4, 4, 12, 12, 7, 7, 6, 7, 9, 9, 8, 8, 4, 4, 11, 11, 5, 5, 10, 4, 6, 6, 7, 7, 8, 12, 4, 4, 8, 11, 6, 6, 10, 10, 5, 5, 8, 8, 12, 12, 3, 8, 8, 9, 9, 4, 4, 10, 10, 6, 6, 11, 11, 5, 5, 12, 12, 8, 8, 9, 9, 6, 6, 10, 10, 4, 4, 11, 11, 7, 7, 12, 12, 8, 8, 10, 10],
        [2, 2, 2, 2, 2, 2, 2],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 25, 10, 10, 5, 5, 5, 2, 2, 2, 2, 0],
    [0, 0, 200, 100, 75, 50, 25, 18, 12, 8, 8, 8, 8, 0],
    [0, 0, 500, 500, 250, 125, 100, 85, 75, 50, 50, 50, 50, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3500, 3500, 1000, 750, 600, 450, 375, 250, 250, 250, 250, 0],
];
var payLines = [
    [
        [0, 1, 2, 3, 4],
        [7, 8, 9, 10, 11],
        [14, 15, 16, 17, 18],
        [21, 22, 23, 24, 25],
        [28, 29, 30, 31, 32],
        [0, 8, 16, 24, 32],
        [7, 15, 23, 31, 25],
        [14, 22, 30, 24, 18],
        [21, 29, 23, 17, 11],
        [28, 22, 16, 10, 4],
        [21, 15, 9, 3, 11],
        [14, 8, 2, 10, 18],
        [7, 1, 9, 17, 25],
        [0, 8, 9, 10, 4],
        [7, 15, 16, 17, 11],
        [7, 1, 2, 3, 11],
        [14, 8, 9, 10, 18],
        [14, 22, 23, 24, 18],
        [21, 15, 16, 17, 25],
        [21, 29, 30, 31, 25],
        [28, 22, 23, 24, 32],
        [7, 1, 9, 3, 11],
        [7, 15, 9, 17, 11],
        [14, 8, 16, 10, 18],
        [14, 22, 16, 24, 18],
        [21, 15, 23, 17, 25],
        [21, 29, 23, 31, 25],
        [28, 22, 30, 24, 32],
        [0, 8, 2, 10, 4],
        [0, 1, 9, 3, 4],
        [7, 8, 16, 10, 11],
        [14, 15, 23, 17, 18],
        [21, 22, 30, 24, 25],
        [28, 29, 23, 31, 32],
        [21, 22, 16, 24, 25],
        [14, 15, 9, 17, 18],
        [7, 8, 2, 10, 11],
        [0, 29, 2, 31, 4],
        [28, 1, 30, 3, 32],
        [14, 1, 30, 3, 18],
    ],
    [
        [21, 15, 9, 3, 11, 19, 27],
        [21, 15, 9, 10, 11, 19, 27],
        [21, 15, 9, 17, 11, 19, 27],
        [21, 15, 16, 10, 18, 19, 27],
        [21, 15, 16, 17, 18, 19, 27],
        [21, 15, 16, 24, 18, 19, 27],
        [21, 15, 23, 17, 25, 19, 27],
        [21, 15, 23, 24, 25, 19, 27],
        [21, 15, 23, 31, 25, 19, 27],
        [21, 22, 16, 10, 18, 26, 27],
        [21, 22, 16, 17, 18, 26, 27],
        [21, 22, 16, 24, 18, 26, 27],
        [21, 22, 23, 17, 25, 26, 27],
        [21, 22, 23, 24, 25, 26, 27],
        [21, 22, 23, 31, 25, 26, 27],
        [21, 22, 30, 24, 32, 26, 27],
        [21, 22, 30, 31, 32, 26, 27],
        [21, 22, 30, 38, 32, 26, 27],
        [21, 29, 23, 17, 25, 33, 27],
        [21, 29, 23, 24, 25, 33, 27],
        [21, 29, 23, 31, 25, 33, 27],
        [21, 29, 30, 24, 32, 33, 27],
        [21, 29, 30, 31, 32, 33, 27],
        [21, 29, 30, 38, 32, 33, 27],
        [21, 29, 37, 31, 39, 33, 27],
        [21, 29, 37, 38, 39, 33, 27],
        [21, 29, 37, 45, 39, 33, 27],
        [21, 15, 16, 3, 18, 19, 27],
        [21, 29, 30, 45, 32, 33, 27],
        [21, 15, 23, 3, 25, 19, 27],
        [21, 29, 23, 45, 25, 33, 27],
        [21, 22, 23, 3, 25, 26, 27],
        [21, 22, 23, 45, 25, 26, 27],
        [21, 22, 16, 3, 18, 26, 27],
        [21, 22, 30, 45, 32, 26, 27],
        [21, 29, 16, 31, 18, 33, 27],
        [21, 15, 30, 17, 32, 19, 27],
        [21, 15, 30, 31, 32, 19, 27],
        [21, 22, 23, 10, 25, 26, 27],
        [21, 22, 23, 38, 25, 26, 27],
    ],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.bonusWheelFlag = false;
    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        this.currentGame = "FREE";
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0][0].view;

        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinBonusStep = "FS_BONUS_START";

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        // console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    } else if (viewCache.type == "BONUS") {
        this.currentGame = "BONUS";
        var cache = viewCache.view;

        this.view = cache.view;
        this.bonusIndexArr = cache.indexs;
        this.bonusWheelFlag = true;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.baseType = GetBaseType(this.view);
    this.virtualReels = {
        above: RandomLineFromReels(baseReels[this.baseType]),
        below: RandomLineFromReels(baseReels[this.baseType]),
    };
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    this.maskView = cache.mask;
    this.freeSpinWilds = cache.wilds;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

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

    if (this.currentGame == "BONUS") {
        //                 
        var totalMulti = 0;
        for (var i = 0; i < this.bonusIndexArr.length; i++) {
            if (this.bonusIndexArr[i] != 1) {
                totalMulti += bonusMultiArr[this.bonusIndexArr[i]];
            }
        }

        this.bonusMulti = totalMulti;
        this.winMoney = this.bonusMulti * player.betPerLine;
        this.moneyBonusWin = this.winMoney;
        this.currentGame = "BASE";
    } else if (this.currentGame == "FREE") {
        if (this.freeSpinBonusStep == "FS_BONUS_START") {
            while (true) {
                var index = Util.random(0, bonusMultiArr.length);
                if (bonusMultiArr[index] == 1) {
                    this.freeSpinWheelIndex = index;
                    break;
                }
            }
        } else if (this.freeSpinBonusStep == "FS_BONUS_OPTION") {
            //              
        } else if (this.freeSpinBonusStep == "FS_BONUS_END") {
            var select = Number(param.ind);

            this.freeSpinType = select;
            this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
            this.freeSpinLength = this.freeSpinCacheList[0].freeSpinLength;
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    var baseType;

    if (Util.probability(3)) {
        baseType = WILDBASE;
    } else {
        baseType = NORMALBASE;
    }

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin, baseType);
    } else {
        tmpView = RandomZeroView(baseReels, bpl, baseType);
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

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        if (Util.probability(70)) {
            newJpType = "BONUS";
        } else {
            newJpType = "FREE";
        }
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

    var scatterView = RandomScatterView(baseReels, bpl);

    var lengthArray = [8, 5];
    for (var i = 0; i < 2; i++) {
        var freeSpinLength = lengthArray[i];

        viewList[i] = [];

        var scatterCache = {
            view: scatterView,
            freeSpinLength: freeSpinLength,
        };

        viewList[i] = [scatterCache];

        var result;
        if (i == 0) {
            result = RandomGoldFreeViewCache(freeReels, bpl, fsWin, 8);
        } else {
            result = RandomDiamondFreeViewCache(freeReels, bpl, fsWin, 5);
        }

        viewList[i] = viewList[i].concat(result.viewList);
        moneyList[i] = result.win;
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
    var scatterView = RandomScatterView(baseReels, bpl);
    var cache = RandomBonusViewCache(baseReels, bpl, bsWin, isCall);

    var bonusCache = {
        view: scatterView,
        indexs: cache.indexs,
    };

    var pattern = {
        view: bonusCache,
        bpl: bpl,
        win: cache.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin, bType) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels, bType);
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

var RandomZeroView = function (reels, bpl, bType) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels, bType);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView;
};

var RandomView = function (reels, bType) {
    var _reels = reels[bType];
    var view = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = _reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = _reels[i][reelPos];
            }
        }

        for (var i = 0; i < exceptArr[bType].length; i++) {
            var pos = exceptArr[bType][i];
            view[pos] = empty;
        }

        if (!isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl) {
    var _reels = reels[0];
    var view = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = _reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = _reels[i][reelPos];
            }
        }

        for (var i = 0; i < exceptArr[0].length; i++) {
            var pos = exceptArr[0][i];
            view[pos] = empty;
        }

        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    return view;
};

var RandomGoldFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        freeSpinData.viewList = [];

        while (true) {
            var fsview, fsWin, fsCache;
            while (true) {
                fsview = RandomFreeView(reels, 0);
                fsCache = RandomGoldWildView(fsview);

                fsWin = WinFromView(fsCache.view, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsCache);

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

var RandomDiamondFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        freeSpinData.viewList = [];
        var wilds = [];

        while (true) {
            var fsview, fsWin;

            while (true) {
                fsview = RandomFreeView(reels, 1);
                fsCache = RandomDiamondWildView(fsview, wilds);

                fsWin = WinFromView(fsCache.view, bpl);
                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            wilds = [...fsCache.wilds];
            freeSpinData.viewList.push(fsCache);

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

var RandomBonusViewCache = function (reels, bpl, bsWin, isCall) {
    var minMoney = isCall ? bsWin * 0.8 : bsWin * 0.1;
    var maxMoney = bsWin;

    var lowLimit = 0;
    var highLimit = 100000000000000;
    var lowCache = null;
    var hightCache = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var totalMulti = 0;
        var indexArray = [];
        var bonusCache = {};

        var mIndex = 0;
        var mCount = Util.random(1, 6);
        var mArrow = Util.random(0, 2) > 0 ? 1 : -1;

        while (true) {
            mIndex = Util.random(0, bonusMultiArr.length);
            if (bonusMultiArr[mIndex] != 1) break;
        }

        for (var i = mIndex; i < mIndex + mCount; i += mArrow) {
            if (bonusMultiArr[i] == 1 || i >= bonusMultiArr.length || i < 0) break;

            indexArray.push(i);
            totalMulti += bonusMultiArr[i];
        }

        bonusCache.win = totalMulti * bpl;
        bonusCache.indexs = [...indexArray];

        if (bonusCache.win >= minMoney && bonusCache.win <= maxMoney) {
            return bonusCache;
        }

        if (bonusCache.win > lowLimit && bonusCache.win < minMoney) {
            lowLimit = bonusCache.win;
            lowCache = bonusCache;
        }

        if (bonusCache.win > maxMoney && bonusCache.win < highLimit) {
            highLimit = bonusCache.win;
            hightCache = bonusCache;
        }
    }

    if (lowCache) {
        return lowCache;
    } else {
        return hightCache;
    }
};

var RandomFreeView = function (_reels, bType) {
    var reels = _reels[bType];
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

        for (var i = 0; i < exceptArr[bType].length; i++) {
            var pos = exceptArr[bType][i];
            view[pos] = empty;
        }

        var wildCount = NumberOfWilds(view);
        if (bType == 0) {
            if (wildCount == 0) {
                break;
            }
        } else if (bType == 1) {
            if (wildCount < 11 && (wildCount == 9 || Util.probability(20))) {
                break;
            }
        }
    }
    return view;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var RandomGoldWildView = function (view) {
    var wildView = Util.clone(view);
    var wildPos = [];

    //                        
    var wildCount;
    if (Util.probability(95)) {
        wildCount = 2;
    } else {
        wildCount = 3;
    }

    //                              
    var wildReelIndexs = [];
    while (true) {
        var rand = Util.random(0, 5);
        if (wildReelIndexs.indexOf(rand) == -1) {
            wildReelIndexs.push(rand);
        }
        if (wildReelIndexs.length >= wildCount) break;
    }

    for (var i = 0; i < wildReelIndexs.length; i++) {
        for (var j = 0; j < 5; j++) {
            var pos = j * slotWidth + wildReelIndexs[i];
            wildView[pos] = wild;
            wildPos.push(pos);
        }
    }

    return {
        view: wildView,
        mask: view,
        wilds: wildPos,
    };
};

var RandomDiamondWildView = function (view, wilds) {
    var wildView = Util.clone(view);
    var newWilds = [];

    for (var i = 0; i < wilds.length; i++) {
        wildView[wilds[i]] = wild;
    }

    for (var j = 0; j < wildView.length; j++) {
        if (isWild(wildView[j])) {
            newWilds.push(j);
        }
    }

    var cache = {};
    if (wilds.length > 0) {
        cache.view = wildView;
        cache.mask = view;
        cache.wilds = newWilds;
    } else {
        cache.view = wildView;
        cache.mask = [];
        cache.wilds = newWilds;
    }

    return cache;
};

var WinFromView = function (view, bpl) {
    var winMoney = 0;
    var baseType = GetBaseType(view);

    for (var lineId = 0; lineId < payLines[baseType].length; lineId++) {
        var line = payLines[baseType][lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        winMoney += linePay;
    }

    return winMoney;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i]))
            //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    var hasWild = false;
    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            hasWild = true;
            lineSymbols[i] = symbol;
        }
    }

    //                                
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        .
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;
    return winPay;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var baseType = GetBaseType(view);

    for (var lineId = 0; lineId < payLines[baseType].length; lineId++) {
        var line = payLines[baseType][lineId];
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

var GetBaseType = function (view) {
    if (view[0] == empty) {
        return WILDBASE;
    } else {
        return NORMALBASE;
    }
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
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

var NumberOfWilds = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result++;
        }
    }
    return result;
};

module.exports = SlotMachine;