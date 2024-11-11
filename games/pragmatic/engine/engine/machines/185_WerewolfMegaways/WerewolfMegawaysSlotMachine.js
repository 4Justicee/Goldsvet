var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.mysterySRF = "";
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinLevel = 0;
    this.freeSpinLife = 0;
    this.freeSpinAttackPos = [];
    this.freeSpinAttackTime = [];
    this.freeSpinMore = 0;
    this.freeSpinLevelUp = false;
    //                    
    this.buyMulti = 100;
    this.buyPatternCount = 30;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2;
var emptySymbol = 15, mysterySymbol = 13, attackSymbol = 14;
var slotWidth = 6, slotHeight = 6;
var winLines = [];
var baseReels = [
    [
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11],
        [3, 10, 10, 1, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11],
        [3, 10, 10, 1, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11],
        [3, 10, 10, 1, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11],
    ],
    [
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 7, 7, 7, 13, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 4, 4, 7, 7, 12, 12, 12, 12, 13, 13, 6, 6, 6, 6, 5, 5, 5, 5, 10, 10, 10, 8, 8, 13, 13, 13, 11, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 7, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 4, 4, 7, 7, 12, 12, 12, 12, 13, 13, 6, 6, 5, 5, 5, 5, 10, 10, 10, 8, 8, 13, 13, 13, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 7, 7, 7, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 4, 4, 7, 7, 12, 12, 13, 13, 6, 6, 6, 5, 5, 5, 5, 10, 10, 10, 8, 8, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 9, 7, 7, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 3, 3, 11, 11, 4, 4, 4, 4, 7, 7, 12, 12, 12, 12, 13, 13, 6, 6, 5, 5, 5, 5, 10, 10, 10, 8, 8, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 9, 9, 7, 7, 7, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 4, 4, 7, 7, 12, 12, 12, 12, 13, 13, 6, 6, 5, 5, 5, 5, 10, 10, 10, 8, 8, 13, 13, 13, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 7, 7, 7, 7, 13, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 4, 4, 7, 7, 12, 12, 12, 12, 13, 13, 6, 6, 6, 5, 5, 5, 5, 10, 10, 10, 8, 8, 13, 13, 13, 11, 11],
    ],
    [
        [3, 10, 10, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11, 11],
        [3, 10, 10, 8, 8, 8, 9, 9, 11, 7, 13, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 13, 13, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 13, 13, 13, 11, 11, 11],
    ],
];
var freeReels = [
    [
        [3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 7, 12, 12, 3, 3, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 3, 3, 3, 3, 12, 12, 12, 3, 3, 6, 8, 4, 5, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 10, 10, 8, 8, 8, 3, 3, 9, 9, 11, 7, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 6, 8, 4, 5, 3, 3, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 3, 3, 9, 9, 11, 7, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 6, 8, 4, 5, 3, 3, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 3, 10, 10, 8, 8, 8, 3, 3, 9, 9, 11, 7, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 3, 3, 11, 11, 4, 4, 4, 7, 7, 12, 12, 12, 6, 8, 4, 4, 3, 3, 5, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11, 11],
        [3, 3, 10, 10, 1, 8, 8, 3, 3, 9, 9, 11, 7, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 6, 8, 4, 3, 3, 5, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 10, 10, 1, 8, 8, 3, 3, 9, 9, 11, 7, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 3, 3, 11, 11, 4, 4, 4, 7, 7, 3, 3, 3, 3, 12, 12, 6, 8, 3, 3, 4, 4, 5, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
    ],
    [
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 12, 12, 3, 3, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 3, 3, 12, 12, 6, 3, 3, 8, 4, 5, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 12, 12, 12, 6, 3, 3, 8, 4, 5, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11, 11],
        [3, 10, 10, 8, 8, 9, 9, 11, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 3, 3, 11, 11, 4, 4, 12, 12, 6, 8, 4, 5, 3, 3, 10, 10, 10, 3, 3, 8, 8, 12, 3, 3, 9, 10, 11, 11],
        [3, 3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 3, 3, 11, 11, 4, 4, 4, 3, 3, 12, 12, 12, 6, 8, 4, 4, 5, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11, 11],
        [3, 3, 10, 10, 8, 8, 8, 9, 9, 11, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 3, 11, 11, 4, 4, 3, 3, 12, 12, 6, 8, 4, 5, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 12, 12, 3, 3, 6, 6, 2, 5, 5, 9, 9, 3, 11, 11, 4, 4, 4, 3, 12, 12, 6, 8, 4, 4, 5, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
    ],
    [
        [3, 10, 10, 8, 8, 8, 3, 3, 9, 9, 11, 12, 12, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 8, 3, 3, 12, 5, 12, 3, 3, 8, 4, 5, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 10, 10, 8, 8, 8, 3, 3, 9, 9, 11, 12, 12, 2, 5, 5, 9, 9, 3, 3, 11, 11, 4, 4, 12, 12, 12, 8, 4, 3, 3, 5, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 10, 10, 1, 8, 8, 3, 3, 9, 9, 11, 12, 12, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 12, 12, 8, 4, 5, 3, 3, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 12, 12, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 4, 12, 12, 12, 3, 3, 8, 4, 4, 5, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11, 11],
        [3, 3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 12, 12, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 12, 12, 8, 8, 3, 3, 4, 5, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
        [3, 10, 10, 1, 8, 8, 3, 3, 9, 9, 9, 11, 12, 12, 2, 5, 5, 9, 9, 3, 3, 11, 11, 11, 4, 4, 4, 3, 3, 12, 12, 8, 4, 4, 3, 3, 5, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 11, 11],
    ],
    [
        [3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 12, 9, 9, 9, 3, 3, 11, 11, 4, 4, 12, 8, 3, 3, 4, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 12, 12, 2, 9, 9, 3, 3, 11, 11, 4, 4, 12, 12, 8, 4, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 12, 12, 2, 9, 9, 9, 3, 3, 11, 11, 4, 4, 12, 12, 8, 4, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11],
        [3, 3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 12, 12, 2, 9, 9, 3, 3, 11, 11, 4, 4, 4, 12, 12, 8, 4, 4, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11, 11],
        [3, 3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 12, 12, 12, 2, 9, 9, 9, 3, 3, 4, 4, 12, 12, 8, 4, 10, 10, 10, 3, 3, 8, 8, 12, 9, 3, 3, 10],
        [3, 10, 10, 1, 8, 8, 3, 3, 9, 9, 9, 4, 11, 12, 12, 12, 2, 9, 9, 3, 3, 11, 11, 11, 4, 4, 3, 3, 12, 12, 8, 4, 4, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11],
    ],
    [
        [3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 12, 9, 9, 9, 3, 3, 11, 11, 3, 3, 3, 12, 3, 12, 8, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 3, 3, 12, 12, 2, 9, 9, 3, 3, 11, 11, 12, 12, 12, 8, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11, 11],
        [3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 3, 3, 12, 12, 2, 9, 9, 3, 3, 11, 11, 12, 12, 12, 8, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11],
        [3, 3, 10, 10, 1, 8, 8, 8, 3, 3, 9, 9, 11, 3, 3, 12, 12, 2, 9, 9, 3, 3, 3, 11, 11, 12, 12, 8, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11, 11],
        [3, 3, 10, 10, 1, 8, 8, 3, 3, 9, 9, 11, 3, 3, 12, 12, 2, 9, 9, 9, 3, 3, 3, 3, 11, 11, 12, 12, 8, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11],
        [3, 10, 10, 1, 8, 8, 3, 3, 9, 9, 11, 3, 3, 12, 12, 2, 9, 9, 3, 3, 11, 11, 3, 3, 3, 3, 12, 12, 8, 10, 10, 10, 3, 3, 8, 8, 12, 9, 10, 3, 3, 11, 11],
    ],
    // [
    //     [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 12, 12, 6, 6, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 11, 11, 11],
    //     [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 11, 11, 11],
    //     [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 11, 11, 11],
    //     [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 11, 11, 11],
    //     [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 11, 11, 11],
    //     [3, 10, 10, 1, 8, 8, 8, 9, 9, 11, 7, 12, 12, 6, 6, 2, 5, 5, 9, 9, 9, 3, 3, 11, 11, 4, 4, 7, 7, 12, 12, 12, 6, 8, 4, 5, 10, 10, 10, 8, 8, 12, 9, 10, 11, 11, 11]
    // ]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 25, 10, 5, 4, 3, 3, 3, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 50, 25, 10, 8, 6, 5, 5, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 100, 50, 25, 20, 15, 10, 10, 5, 5, 5, 0, 0, 0],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
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

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;

        this.view = cache.view;
        this.maskView = cache.mask;
        this.mysterySRF = cache.srf;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0];
        this.maskView = [];
        this.mysterySRF = "";
        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // // console.log(`[            ] ${freeSpinMoney}`);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = GetWinLines(winLines);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels[0]),
        below: RandomLineFromReels(baseReels[0]),
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;

        this.freeSpinLevel = 0;
        this.freeSpinLife = 0;
        this.freeSpinAttackPos = [];
        this.freeSpinAttackTime = [];
        this.freeSpinMore = 0;
        this.freeSpinLevelUp = false;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.view = cache.view;
    this.freeSpinLevel = cache.level;
    this.freeSpinLife = cache.life;
    this.freeSpinAttackPos = cache.attackPos;
    this.freeSpinAttackTime = cache.attackTime;
    this.freeSpinLevelUp = cache.levelUp;

    var finalView = GetFinalFreeView(this.view);
    this.winMoney = WinFromView(finalView, player.betPerLine);
    this.winLines = GetWinLines(winLines);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels[this.freeSpinLevel]),
        below: RandomLineFromReels(freeReels[this.freeSpinLevel]),
    };

    this.freeSpinWinMoney += this.winMoney;

    if (isFreeSpinMoreWin(this.view)) {
        this.freeSpinMore = GetFreeSpinMoreCount(this.view);
        this.freeSpinLength += this.freeSpinMore;
    } else if (this.freeSpinLevelUp) {
        this.freeSpinMore += 1;
        this.freeSpinLength += 1;
    } else {
        this.freeSpinMore = 0;
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpResult;

    if (baseWin > 0) {
        tmpResult = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpResult = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: tmpResult.view,
        win: tmpResult.win,
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
    var scatterView = RandomScatterView(baseReels[0]);
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var fsCount = GetFreeSpinCount(scatterView);
    var freeSpinData = {
        length: fsCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels[0]);
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var fsCount = GetFreeSpinCount(scatterView);
    var freeSpinData = {
        length: fsCount,
        viewList: [],
    };

    //                           
    var cache = BuyBonusViewCache(freeReels, bpl, fsCount, (totalBet * this.buyMulti) / 5);
    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, mysteryView, tmpWin, viewCache, paySymbol;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        mysteryView = RandomView(reels[Util.random(0, reels.length)]);
        paySymbol = Util.random(3, 13);
        var result = GetFinalView(mysteryView, paySymbol);

        tmpView = result.view;
        tmpWin = WinFromView(tmpView, bpl);

        viewCache = {
            view: tmpView,
            mask: mysteryView,
            srf: result.srf,
        };

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    return {
        view: viewCache,
        win: tmpWin,
    };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, mysteryView, tmpWin, viewCache, paySymbol;

    while (true) {
        mysteryView = RandomView(reels[Util.random(0, reels.length)]);
        paySymbol = Util.random(3, 13);
        var result = GetFinalView(mysteryView, paySymbol);

        tmpView = result.view;
        tmpWin = WinFromView(tmpView, bpl);

        viewCache = {
            view: tmpView,
            mask: mysteryView,
            srf: result.srf,
        };

        if (tmpWin == 0) {
            break;
        }
    }

    return {
        view: viewCache,
        win: tmpWin,
    };
};

var RandomView = function (reels) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(2, 7);

            for (var j = 0; j < reelSize; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                randomView[viewPos] = reels[i][reelPos];
            }
            for (var j = reelSize; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                randomView[viewPos] = emptySymbol;
            }
        }

        var mysteryCount = NumberOfMysterys(randomView);
        if (mysteryCount > 0 && mysteryCount < 9) {
            continue;
        }

        if (!isFreeSpinWin(randomView)) {
            break;
        }
    }

    return randomView;
};

var RandomScatterView = function (reels) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(2, 7);

            for (var j = 0; j < reelSize; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                randomView[viewPos] = reels[i][reelPos];
            }
            for (var j = reelSize; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                randomView[viewPos] = emptySymbol;
            }
        }

        if (isFreeSpinWin(randomView) && NumberOfMysterys(randomView) == 0 && !isDoubleScatterView(randomView)) {
            break;
        }
    }

    return randomView;
};

var RandomFreeView = function (reels) {
    var randomView = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);

        var reelSize = Util.random(2, 7);

        for (var j = 0; j < reelSize; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            randomView[viewPos] = reels[i][reelPos];
        }
        for (var j = reelSize; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            randomView[viewPos] = emptySymbol;
        }
    }

    return randomView;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
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

var BuyBonusViewCache = function (reels, bpl, fsLen, lowLimit = 0) {
    while (true) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        var level = 0;
        var life = 0;
        var levelUp = false;

        while (true) {
            var fsview, fsFreeWin;
            var attackPos = [];
            var attackTime = [];
            var attackCount = 0;
            var attackTimeTotal = 0;

            while (true) {
                fsview = RandomFreeView(reels[level]);
                fsFreeWin = WinFromView(fsview, bpl);

                attackCount = 0;
                attackTimeTotal = 0;
                attackPos = [];
                attackTime = [];

                //                          
                var wolfPos = GetWolfPositions(fsview);

                if (level < 4) {
                    while (true) {
                        attackCount = Util.random(0, 4);
                        attackTimeTotal = 0;
                        attackTime = [];

                        for (var i = 0; i < attackCount; i++) {
                            if (Util.probability(20)) {
                                attackTime.push(2);
                                attackTimeTotal += 2;
                            } else {
                                attackTime.push(1);
                                attackTimeTotal += 1;
                            }
                        }

                        //              Life                                                                         
                        if (attackTimeTotal <= 5 - life && wolfPos.length >= attackCount) {
                            break;
                        }
                    }

                    wolfPos = Util.shuffle(wolfPos);
                    for (var j = 0; j < attackCount; j++) {
                        attackPos.push(wolfPos[j]);
                    }
                }

                if (Util.probability(50) || fsFreeWin == 0) {
                    break;
                }
            }

            life += attackTimeTotal;
            if (level < 4 && life >= 5) {
                level++;
                life = 0;
                freeSpinLength++;
                levelUp = true;
            } else {
                levelUp = false;
            }

            for (var k = 0; k < attackPos.length; k++) {
                fsview[attackPos[k]] = attackSymbol;
            }

            freeSpinData.viewList.push({
                view: fsview,
                attackPos: attackPos,
                attackTime: attackTime,
                life: life,
                level: level,
                levelUp: levelUp,
            });

            if (isFreeSpinMoreWin(fsview)) {
                freeSpinLength += GetFreeSpinMoreCount(fsview);
            }

            freeSpinWinMoney += fsFreeWin;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
        }

        if (freeSpinData.win >= lowLimit) {
            return freeSpinData;
        }
    }
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
    var searched = [false, false, false, false, false, false, false];
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

        money += RecursiveSearch(view, 1, count, history, symbolId, bpl);
    }

    return money;
};

var RecursiveSearch = function (view, length, count, history, symbolId, bpl) {
    //                                                             
    if (symbolId == emptySymbol) {
        return 0;
    }

    //                                                             
    if (length == slotWidth) {
        var winMoney = bpl * payTable[length][symbolId] * count;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);
        }
        return winMoney;
    }

    //                                                                                            
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = length + i * slotWidth;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var winMoney = bpl * payTable[length][symbolId] * count;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);
        }
        return winMoney;
    }

    var matchCount = 0;
    var historyTmp = Util.clone(history);
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;
    return RecursiveSearch(view, length + 1, matchCount, historyTmp, symbolId, bpl);
};

var GetFinalView = function (mysteryView, paySymbol) {
    var finalView = Util.clone(mysteryView);
    var changedSymbols = [];
    var srfSTR = "";

    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (isMysterySymbol(finalView[pos])) {
                finalView[pos] = paySymbol;
                changedSymbols.push(pos);
            }
        }
    }

    if (changedSymbols.length > 0) {
        srfSTR = `${mysterySymbol}~${paySymbol}~${changedSymbols.join()}`;
    }

    return {
        view: finalView,
        srf: srfSTR,
    };
};

var GetFinalFreeView = function (view) {
    var result = Util.clone(view);

    for (var i = 0; i < result.length; i++) {
        if (result[i] == attackSymbol) {
            result[i] = 3;
        }
    }

    return result;
};

var GetWinLines = function (winLines) {
    var lines = [];
    for (var i = 0; i < winLines.length; i++) {
        var cache = winLines[i];
        lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~l`);
    }
    return lines.join(";");
};

var GetFreeSpinCount = function (scatterView) {
    var freeSpinCount = 0;
    var scatterCount = NumberOfScatters(scatterView);

    if (scatterCount == 3) {
        freeSpinCount = 8;
    } else if (scatterCount == 4) {
        freeSpinCount = 10;
    } else if (scatterCount == 5) {
        freeSpinCount = 12;
    } else if (scatterCount == 6) {
        freeSpinCount = 15;
    }

    return freeSpinCount;
};

var GetFreeSpinMoreCount = function (view) {
    var freeSpinCount = 0;
    var scatterCount = NumberOfScatters(view);

    if (scatterCount == 2) {
        freeSpinCount = 2;
    } else if (scatterCount == 3) {
        freeSpinCount = 3;
    } else if (scatterCount == 4) {
        freeSpinCount = 4;
    } else if (scatterCount == 5) {
        freeSpinCount = 5;
    } else if (scatterCount == 6) {
        freeSpinCount = 10;
    }

    return freeSpinCount;
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

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isMysterySymbol = function (symbol) {
    return symbol == mysterySymbol;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isFreeSpinMoreWin = function (view) {
    return NumberOfScatters(view) >= 2;
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

var NumberOfMysterys = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMysterySymbol(view[i])) {
            result++;
        }
    }
    return result;
};

var GetWolfPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == 3) {
            result.push(i);
        }
    }
    return result;
};

module.exports = SlotMachine;