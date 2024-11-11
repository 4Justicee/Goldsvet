var Util = require('../../../utils/slot_utils');

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
    //                 
    this.wildPosArr = [];
    this.wildExtendPosArr = [];
    this.maskView = [];
    //                           
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.freeSpinLevel = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var freeSpinCount = 12;
var baseReels = [
    [9, 9, 5, 5, 12, 12, 7, 9, 9, 6, 6, 6, 10, 10, 5, 5, 11, 11, 11, 8, 8, 10, 10, 4, 11, 11, 11, 1, 12, 12, 7, 9, 9, 6, 12, 12, 12, 7, 7, 9, 9, 5, 11, 11, 6, 10, 10, 10, 8, 8, 8, 9, 9, 3, 10, 10, 1, 12, 12, 12, 5, 5, 9, 9, 8, 12, 12, 7, 7, 7, 9, 9, 6, 6, 10, 10, 4, 12, 12, 3, 9, 9, 6, 6, 12, 12, 8, 8, 9, 9, 9, 4, 12, 12, 5, 5, 9, 9, 1, 12, 12, 4, 11, 11, 11, 7, 7, 9, 9, 3, 10, 10, 8, 11, 11, 11, 7],
    [11, 11, 11, 8, 8, 8, 11, 11, 11, 6, 6, 10, 10, 4, 4, 12, 12, 5, 5, 1, 12, 12, 8, 8, 8, 9, 9, 2, 10, 10, 4, 4, 12, 12, 8, 8, 11, 11, 6, 12, 12, 12, 1, 9, 9, 4, 4, 12, 12, 3, 9, 9, 4, 4, 10, 10, 8, 8, 8, 10, 10, 10, 4, 4, 11, 11, 1, 9, 9, 6, 6, 6, 12, 12, 3, 11, 11, 11, 7, 10, 10, 8, 8, 12, 12, 4, 4, 10, 10, 2, 11, 11, 11, 7, 9, 9, 1, 10, 10, 5, 5, 12, 12, 4, 11, 11, 11, 3, 9, 9, 9, 4, 10, 10, 1],
    [12, 12, 12, 2, 11, 11, 11, 8, 8, 10, 10, 5, 9, 9, 9, 3, 10, 10, 1, 11, 11, 3, 10, 10, 1, 11, 11, 6, 6, 12, 12, 7, 7, 10, 10, 10, 7, 7, 9, 9, 6, 5, 5, 10, 10, 7, 7, 7, 9, 9, 2, 11, 11, 3, 12, 12, 4, 9, 9, 6, 6, 6, 5, 5, 10, 10, 10, 1, 11, 11, 7, 7, 9, 9, 3, 12, 12, 12, 8, 8, 8, 10, 10, 10, 5, 5, 9, 9, 2, 11, 11, 11, 8, 8, 10, 10, 7, 11, 11, 5, 9, 9, 2, 12, 12, 7, 7, 7, 9, 9, 4, 4, 10, 10, 10, 8, 11, 11, 1],
    [7, 7, 12, 12, 12, 5, 5, 10, 10, 10, 1, 9, 9, 3, 12, 12, 12, 7, 7, 11, 11, 1, 10, 10, 5, 12, 12, 7, 7, 7, 11, 11, 11, 8, 8, 12, 12, 4, 10, 10, 10, 1, 12, 12, 12, 8, 8, 10, 10, 6, 9, 9, 9, 8, 8, 8, 10, 10, 10, 4, 11, 11, 6, 6, 6, 12, 12, 5, 10, 10, 1, 9, 9, 9, 6, 11, 11, 11, 2, 10, 10, 4, 11, 11, 7, 7, 10, 10, 8, 11, 11, 11, 5, 9, 9, 4, 4, 12, 12, 3, 11, 11, 1, 10, 10, 7, 11, 11, 11, 4, 4, 10, 10, 5, 11, 11],
    [12, 10, 10, 10, 6, 6, 9, 9, 9, 4, 4, 11, 11, 11, 8, 8, 8, 10, 10, 11, 11, 11, 1, 10, 10, 8, 8, 12, 12, 4, 4, 9, 9, 9, 11, 11, 11, 3, 12, 12, 4, 4, 10, 10, 10, 3, 9, 9, 7, 7, 7, 12, 12, 9, 9, 3, 12, 12, 5, 5, 10, 10, 1, 9, 9, 9, 6, 6, 6, 10, 10, 5, 9, 9, 8, 8, 12, 12, 12, 7, 11, 11, 11, 6, 6, 9, 9, 3, 11, 11, 11, 1, 12, 12, 12, 6, 6, 9, 9, 9, 7, 7, 11, 11, 11, 4, 4, 9, 9, 9, 3, 10, 10, 8, 12]
];
var freeReels = [
    [
        [9, 9, 5, 5, 12, 12, 7, 9, 9, 6, 6, 6, 10, 10, 8, 8, 11, 11, 11, 12, 12, 10, 10, 10, 10, 4, 11, 11, 11, 1, 12, 12, 7, 9, 9, 6, 12, 12, 12, 7, 7, 9, 9, 5, 11, 11, 6, 10, 10, 10, 8, 8, 8, 9, 9, 3, 10, 10, 10, 12, 12, 12, 5, 5, 9, 9, 8, 12, 12, 7, 7, 7, 9, 9, 8, 8, 10, 10, 4, 12, 12, 3, 9, 9, 6, 6, 12, 12, 8, 8, 9, 9, 9, 4, 12, 12, 5, 5, 9, 9, 1, 12, 12, 4, 11, 11, 11, 8, 8, 9, 9, 3, 10, 10, 8, 11, 11, 11, 7],
        [11, 11, 11, 8, 8, 8, 11, 11, 11, 6, 6, 10, 10, 4, 4, 12, 12, 8, 8, 11, 11, 2, 9, 8, 8, 8, 9, 9, 2, 10, 10, 4, 4, 12, 12, 8, 8, 11, 11, 6, 12, 12, 12, 9, 9, 9, 8, 8, 12, 12, 4, 4, 10, 10, 3, 9, 9, 8, 8, 8, 10, 10, 10, 4, 4, 11, 11, 1, 9, 9, 8, 8, 8, 12, 12, 3, 11, 11, 11, 7, 10, 10, 8, 8, 12, 12, 4, 4, 10, 10, 2, 11, 11, 11, 7, 9, 9, 1, 10, 10, 5, 5, 5, 12, 12, 4, 11, 11, 11, 3, 9, 9, 9, 4, 10, 10, 1],
        [12, 12, 12, 2, 11, 11, 11, 8, 8, 10, 10, 5, 9, 9, 9, 3, 10, 10, 1, 12, 12, 12, 3, 3, 10, 10, 11, 11, 11, 6, 6, 12, 12, 7, 7, 10, 10, 10, 7, 7, 9, 9, 6, 5, 5, 10, 10, 7, 7, 7, 9, 9, 2, 11, 11, 3, 12, 12, 4, 6, 6, 6, 9, 9, 5, 5, 10, 10, 10, 1, 11, 11, 7, 7, 9, 9, 3, 12, 12, 12, 8, 8, 8, 10, 10, 10, 5, 5, 9, 9, 2, 11, 11, 11, 8, 8, 10, 10, 7, 11, 11, 5, 9, 9, 2, 12, 12, 7, 7, 7, 9, 9, 4, 4, 10, 10, 10, 8, 11, 11, 1],
        [7, 7, 12, 12, 12, 5, 5, 10, 10, 10, 9, 9, 9, 3, 12, 12, 12, 7, 7, 10, 10, 6, 6, 1, 10, 10, 5, 12, 12, 7, 7, 7, 11, 11, 11, 8, 8, 8, 12, 12, 4, 10, 10, 10, 1, 12, 12, 12, 8, 8, 10, 10, 6, 9, 9, 9, 8, 8, 10, 10, 10, 4, 11, 11, 6, 6, 6, 12, 12, 5, 10, 10, 10, 9, 9, 9, 6, 11, 11, 11, 2, 10, 10, 4, 11, 11, 7, 7, 10, 10, 8, 11, 11, 11, 5, 9, 9, 4, 4, 12, 12, 3, 11, 11, 1, 10, 10, 7, 11, 11, 11, 4, 4, 10, 10, 5, 11, 11],
        [12, 10, 10, 10, 6, 6, 9, 9, 9, 4, 4, 11, 11, 11, 8, 8, 8, 10, 10, 10, 3, 12, 12, 11, 1, 10, 10, 8, 8, 12, 12, 4, 4, 9, 9, 9, 11, 11, 11, 3, 12, 12, 4, 4, 10, 10, 10, 3, 9, 9, 7, 7, 7, 12, 12, 9, 9, 3, 12, 12, 5, 5, 10, 10, 1, 9, 9, 9, 6, 6, 6, 10, 10, 5, 9, 9, 8, 8, 12, 12, 12, 7, 11, 11, 11, 6, 6, 9, 9, 3, 11, 11, 11, 1, 12, 12, 12, 6, 6, 9, 9, 9, 7, 7, 11, 11, 11, 4, 4, 9, 9, 9, 3, 10, 10, 8, 12]
    ],
    [
        [9, 9, 5, 5, 12, 12, 7, 9, 9, 6, 6, 6, 10, 10, 7, 7, 11, 11, 11, 12, 12, 10, 10, 7, 7, 12, 7, 7, 7, 10, 10, 4, 11, 11, 11, 1, 12, 12, 7, 9, 9, 6, 12, 12, 12, 7, 7, 9, 9, 5, 11, 11, 6, 10, 10, 10, 7, 7, 9, 9, 3, 10, 10, 10, 12, 12, 12, 5, 5, 9, 9, 7, 12, 12, 7, 7, 9, 9, 7, 7, 10, 10, 4, 12, 12, 3, 9, 9, 6, 6, 12, 12, 7, 7, 9, 9, 9, 4, 12, 12, 7, 7, 9, 9, 1, 12, 12, 4, 11, 11, 11, 7, 7, 9, 9, 3, 10, 10, 7, 11, 11, 11, 7],
        [11, 11, 11, 7, 7, 7, 11, 11, 11, 7, 7, 10, 10, 4, 4, 12, 12, 7, 7, 11, 11, 2, 9, 9, 6, 9, 1, 12, 12, 7, 7, 7, 9, 9, 2, 10, 10, 4, 4, 12, 12, 7, 7, 11, 11, 6, 12, 12, 12, 9, 9, 9, 4, 4, 12, 12, 7, 7, 10, 10, 3, 9, 9, 7, 7, 7, 10, 10, 10, 4, 4, 11, 11, 1, 9, 9, 7, 7, 7, 12, 12, 3, 11, 11, 11, 7, 10, 10, 7, 7, 12, 12, 4, 4, 10, 10, 2, 11, 11, 11, 7, 9, 9, 1, 10, 10, 7, 7, 5, 12, 12, 4, 11, 11, 11, 3, 9, 9, 9, 4, 10, 10, 1],
        [12, 12, 12, 2, 11, 11, 11, 7, 7, 10, 10, 5, 9, 9, 9, 3, 10, 10, 1, 12, 12, 12, 3, 9, 9, 7, 7, 11, 11, 3, 10, 10, 11, 11, 11, 6, 6, 12, 12, 7, 7, 10, 10, 10, 7, 7, 6, 9, 9, 5, 5, 10, 10, 7, 7, 7, 9, 9, 2, 11, 11, 3, 6, 6, 6, 12, 12, 4, 9, 9, 5, 5, 10, 10, 10, 1, 11, 11, 7, 7, 9, 9, 3, 12, 12, 12, 7, 7, 7, 10, 10, 10, 7, 7, 9, 9, 2, 11, 11, 11, 7, 7, 10, 10, 7, 11, 11, 5, 9, 9, 2, 12, 12, 7, 7, 7, 9, 9, 4, 4, 10, 10, 10, 7, 11, 11, 1],
        [7, 7, 12, 12, 12, 7, 7, 10, 10, 10, 9, 9, 9, 3, 12, 12, 12, 7, 7, 10, 10, 6, 6, 11, 11, 5, 5, 11, 11, 1, 10, 10, 5, 12, 12, 7, 7, 7, 11, 11, 11, 7, 7, 12, 12, 4, 10, 10, 10, 1, 12, 12, 12, 7, 7, 10, 10, 6, 9, 9, 9, 7, 7, 10, 10, 10, 4, 11, 11, 6, 6, 6, 12, 12, 5, 10, 10, 10, 9, 9, 9, 6, 11, 11, 11, 2, 10, 10, 4, 11, 11, 7, 7, 10, 10, 7, 11, 11, 11, 5, 9, 9, 7, 7, 12, 12, 3, 11, 11, 1, 10, 10, 7, 11, 11, 11, 4, 4, 10, 10, 5, 11, 11],
        [12, 10, 10, 10, 6, 6, 9, 9, 9, 4, 4, 11, 11, 11, 7, 7, 7, 10, 10, 10, 3, 12, 12, 7, 7, 9, 3, 11, 11, 11, 1, 10, 10, 7, 7, 12, 12, 4, 4, 9, 9, 9, 11, 11, 11, 3, 12, 12, 4, 4, 10, 10, 10, 3, 9, 9, 7, 7, 7, 12, 12, 9, 9, 3, 12, 12, 5, 5, 10, 10, 1, 9, 9, 9, 6, 6, 6, 10, 10, 5, 9, 9, 7, 7, 12, 12, 12, 7, 11, 11, 11, 6, 6, 9, 9, 3, 11, 11, 11, 1, 12, 12, 12, 6, 6, 9, 9, 9, 7, 7, 11, 11, 11, 4, 4, 9, 9, 9, 3, 10, 10, 7, 12]
    ],
    [
        [9, 9, 5, 5, 12, 12, 6, 9, 9, 6, 6, 6, 10, 10, 5, 5, 11, 11, 11, 12, 12, 10, 10, 6, 10, 10, 4, 11, 11, 11, 1, 12, 12, 6, 9, 9, 6, 12, 12, 12, 6, 6, 9, 9, 5, 11, 11, 6, 10, 10, 10, 6, 6, 9, 9, 3, 10, 10, 10, 12, 12, 12, 5, 5, 9, 9, 6, 12, 12, 6, 6, 9, 9, 6, 6, 10, 10, 4, 12, 12, 3, 9, 9, 6, 6, 12, 12, 6, 6, 9, 9, 9, 4, 12, 12, 5, 5, 9, 9, 1, 12, 12, 4, 11, 11, 11, 6, 6, 9, 9, 3, 10, 10, 6, 11, 11, 11, 6],
        [11, 11, 11, 6, 6, 6, 11, 11, 11, 6, 6, 10, 10, 4, 4, 12, 12, 5, 5, 11, 11, 2, 9, 9, 6, 6, 6, 9, 9, 2, 10, 10, 4, 4, 12, 12, 6, 6, 11, 11, 6, 12, 12, 12, 9, 9, 9, 4, 4, 12, 12, 4, 4, 10, 10, 3, 9, 9, 6, 6, 6, 10, 10, 10, 4, 4, 11, 11, 1, 9, 9, 6, 6, 6, 12, 12, 3, 11, 11, 11, 6, 10, 10, 6, 6, 12, 12, 4, 4, 10, 10, 2, 11, 11, 11, 6, 9, 9, 1, 10, 10, 5, 5, 5, 12, 12, 4, 11, 11, 11, 3, 9, 9, 9, 4, 10, 10, 1],
        [12, 12, 12, 2, 11, 11, 11, 6, 6, 10, 10, 5, 9, 9, 9, 3, 10, 10, 1, 12, 12, 12, 3, 9, 3, 10, 10, 11, 11, 11, 6, 6, 12, 12, 6, 6, 10, 10, 10, 6, 6, 9, 9, 5, 5, 10, 10, 6, 6, 6, 9, 9, 2, 11, 11, 3, 12, 12, 4, 9, 9, 5, 5, 10, 10, 10, 1, 11, 11, 6, 6, 9, 9, 3, 12, 12, 12, 6, 6, 6, 10, 10, 10, 5, 5, 9, 9, 2, 11, 11, 11, 6, 6, 10, 10, 6, 11, 11, 5, 9, 9, 2, 12, 12, 6, 6, 6, 9, 9, 4, 4, 10, 10, 10, 6, 11, 11, 1],
        [6, 6, 12, 12, 12, 5, 5, 10, 10, 10, 9, 9, 9, 3, 12, 12, 12, 6, 6, 10, 10, 6, 6, 11, 1, 10, 10, 5, 12, 12, 6, 6, 6, 11, 11, 11, 6, 6, 12, 12, 4, 10, 10, 10, 1, 12, 12, 12, 6, 6, 10, 10, 6, 9, 9, 9, 6, 6, 10, 10, 10, 4, 11, 11, 6, 6, 6, 12, 12, 5, 10, 10, 10, 9, 9, 9, 6, 11, 11, 11, 2, 10, 10, 4, 11, 11, 6, 6, 10, 10, 6, 11, 11, 11, 5, 9, 9, 4, 4, 12, 12, 3, 11, 11, 1, 10, 10, 6, 11, 11, 11, 4, 4, 10, 10, 5, 11, 11],
        [12, 10, 10, 10, 6, 6, 9, 9, 9, 4, 4, 11, 11, 11, 6, 6, 6, 10, 10, 10, 3, 12, 12, 6, 11, 1, 10, 10, 6, 6, 12, 12, 4, 4, 9, 9, 9, 11, 11, 11, 3, 12, 12, 4, 4, 10, 10, 10, 3, 9, 9, 6, 6, 6, 12, 12, 9, 9, 3, 12, 12, 5, 5, 10, 10, 1, 9, 9, 9, 6, 6, 6, 10, 10, 5, 9, 9, 6, 6, 12, 12, 12, 6, 11, 11, 11, 6, 6, 9, 9, 3, 11, 11, 11, 1, 12, 12, 12, 6, 6, 9, 9, 9, 6, 6, 11, 11, 11, 4, 4, 9, 9, 9, 3, 10, 10, 6, 12]
    ],
    [
        [9, 9, 5, 5, 12, 12, 5, 9, 9, 5, 5, 5, 10, 10, 5, 5, 11, 11, 11, 5, 5, 10, 10, 5, 5, 9, 11, 1, 11, 11, 5, 5, 9, 9, 9, 5, 5, 12, 12, 5, 5, 5, 9, 1, 11, 11, 5, 5, 10, 10, 5, 5, 9, 9, 3, 10, 10, 10, 12, 12, 5, 5, 5, 9, 9, 5, 12, 12, 5, 5, 9, 9, 5, 5, 10, 10, 4, 12, 12, 3, 9, 9, 5, 5, 12, 12, 5, 5, 5, 9, 9, 4, 12, 12, 5, 5, 9, 9, 1, 12, 12, 4, 11, 11, 5, 5, 5, 9, 9, 3, 10, 10, 5, 5, 11, 11, 5],
        [11, 11, 11, 5, 5, 5, 11, 11, 5, 5, 5, 10, 10, 4, 4, 12, 12, 5, 5, 11, 11, 2, 5, 5, 5, 10, 9, 2, 10, 10, 4, 4, 12, 12, 12, 5, 5, 11, 11, 5, 5, 12, 12, 9, 9, 9, 4, 4, 12, 12, 4, 4, 10, 10, 3, 9, 9, 5, 5, 5, 10, 10, 10, 4, 4, 11, 11, 1, 9, 9, 5, 5, 5, 12, 12, 3, 11, 11, 5, 5, 10, 10, 5, 5, 12, 12, 4, 4, 10, 10, 2, 11, 11, 5, 5, 9, 9, 1, 10, 10, 5, 5, 5, 12, 12, 5, 5, 11, 11, 3, 9, 9, 9, 4, 10, 10, 1],
        [12, 12, 12, 2, 11, 11, 5, 5, 5, 10, 10, 5, 5, 9, 9, 3, 10, 10, 1, 5, 5, 10, 10, 5, 5, 5, 11, 11, 11, 5, 5, 12, 12, 5, 5, 5, 10, 10, 5, 5, 9, 9, 5, 5, 10, 10, 5, 5, 5, 9, 9, 2, 5, 5, 5, 12, 12, 4, 9, 9, 5, 5, 10, 5, 5, 5, 11, 11, 5, 5, 9, 9, 5, 5, 12, 12, 5, 5, 5, 10, 10, 10, 5, 5, 9, 9, 2, 11, 11, 1, 5, 5, 10, 10, 5, 11, 11, 5, 5, 5, 2, 12, 12, 5, 5, 5, 9, 9, 4, 4, 10, 10, 5, 5, 11, 11, 1],
        [5, 5, 12, 12, 12, 5, 5, 10, 10, 10, 9, 9, 9, 3, 12, 12, 12, 9, 9, 10, 10, 5, 5, 11, 11, 11, 12, 12, 5, 5, 5, 11, 11, 11, 10, 10, 12, 12, 4, 10, 10, 10, 1, 12, 12, 12, 5, 5, 10, 10, 5, 9, 9, 9, 5, 5, 10, 10, 10, 4, 11, 11, 10, 10, 10, 12, 12, 5, 10, 10, 10, 9, 9, 9, 5, 11, 11, 11, 2, 10, 10, 4, 11, 11, 9, 9, 10, 10, 5, 11, 11, 11, 5, 9, 9, 4, 4, 12, 12, 3, 11, 11, 1, 10, 10, 5, 11, 11, 11, 4, 4, 10, 10, 5, 11, 11],
        [12, 10, 10, 10, 11, 11, 9, 9, 9, 4, 4, 11, 11, 11, 5, 5, 5, 10, 10, 10, 3, 12, 12, 5, 5, 5, 5, 5, 12, 12, 4, 4, 9, 9, 9, 11, 11, 11, 3, 12, 12, 4, 4, 10, 10, 10, 3, 9, 9, 4, 4, 4, 12, 12, 9, 9, 3, 12, 12, 5, 5, 10, 10, 1, 9, 9, 9, 3, 3, 3, 10, 10, 5, 9, 9, 5, 5, 12, 12, 12, 5, 11, 11, 11, 5, 5, 9, 9, 3, 11, 11, 11, 1, 12, 12, 12, 10, 10, 9, 9, 9, 5, 5, 11, 11, 11, 4, 4, 9, 9, 9, 3, 10, 10, 5, 12]
    ],
    [
        [9, 9, 4, 12, 12, 12, 4, 9, 9, 9, 4, 4, 10, 10, 4, 4, 11, 11, 11, 4, 4, 10, 4, 11, 11, 1, 11, 11, 4, 4, 9, 9, 4, 4, 12, 12, 4, 4, 4, 9, 1, 11, 11, 4, 4, 10, 10, 4, 4, 9, 9, 3, 10, 10, 10, 12, 12, 4, 4, 4, 9, 9, 4, 12, 12, 4, 4, 9, 9, 4, 4, 10, 10, 4, 12, 12, 3, 9, 9, 4, 4, 12, 12, 12, 4, 4, 9, 9, 4, 12, 12, 4, 4, 9, 9, 1, 12, 12, 4, 11, 11, 11, 4, 4, 9, 9, 3, 10, 10, 4, 4, 11, 11, 4],
        [11, 11, 11, 4, 4, 4, 11, 11, 11, 4, 4, 10, 10, 10, 4, 12, 12, 4, 4, 11, 11, 4, 4, 9, 9, 2, 10, 10, 4, 4, 12, 12, 4, 4, 11, 11, 4, 4, 12, 12, 9, 9, 9, 4, 4, 12, 12, 4, 4, 10, 10, 3, 9, 9, 9, 4, 4, 10, 10, 10, 4, 4, 11, 11, 9, 9, 9, 4, 4, 12, 12, 12, 3, 11, 11, 4, 4, 10, 10, 4, 4, 12, 12, 4, 4, 10, 10, 2, 11, 11, 11, 4, 9, 9, 1, 10, 10, 10, 4, 4, 12, 12, 4, 11, 11, 11, 3, 9, 9, 9, 4, 10, 10, 1],
        [12, 12, 12, 2, 11, 11, 4, 4, 4, 10, 10, 4, 4, 9, 9, 3, 10, 10, 1, 4, 4, 10, 10, 1, 11, 11, 4, 4, 12, 12, 4, 4, 10, 10, 10, 4, 4, 9, 9, 9, 4, 10, 10, 10, 4, 4, 9, 9, 2, 11, 4, 4, 12, 12, 4, 9, 9, 4, 10, 10, 4, 4, 12, 11, 11, 11, 4, 4, 9, 9, 4, 4, 12, 12, 4, 4, 4, 10, 10, 10, 4, 4, 9, 9, 2, 11, 11, 1, 4, 4, 10, 10, 4, 11, 11, 4, 4, 4, 2, 12, 12, 4, 4, 4, 9, 9, 4, 4, 10, 10, 10, 4, 11, 11, 1],
        [4, 4, 12, 12, 12, 4, 4, 10, 10, 10, 9, 9, 9, 3, 12, 12, 12, 9, 9, 10, 10, 10, 10, 4, 12, 12, 4, 4, 4, 11, 11, 11, 10, 10, 12, 12, 4, 10, 10, 10, 1, 12, 12, 12, 4, 4, 10, 10, 4, 9, 9, 9, 4, 4, 10, 10, 10, 4, 11, 11, 10, 10, 10, 12, 12, 4, 10, 10, 10, 9, 9, 9, 4, 11, 11, 11, 2, 10, 10, 4, 11, 11, 9, 9, 10, 10, 4, 11, 11, 11, 4, 9, 9, 4, 4, 12, 12, 3, 11, 11, 1, 10, 10, 4, 11, 11, 11, 4, 4, 10, 10, 4, 11, 11],
        [12, 10, 10, 10, 11, 11, 9, 9, 9, 4, 4, 11, 11, 11, 4, 4, 4, 10, 10, 10, 3, 1, 10, 10, 4, 4, 12, 12, 3, 3, 9, 9, 9, 11, 11, 11, 3, 12, 12, 4, 4, 10, 10, 10, 3, 9, 9, 4, 4, 4, 12, 12, 9, 9, 3, 12, 12, 4, 4, 10, 10, 1, 9, 9, 9, 3, 3, 3, 10, 10, 4, 9, 9, 4, 4, 12, 12, 12, 3, 11, 11, 11, 4, 4, 9, 9, 3, 11, 11, 11, 1, 12, 12, 12, 10, 10, 9, 9, 9, 4, 4, 11, 11, 11, 3, 3, 9, 9, 9, 3, 10, 10, 4, 12]
    ],
    [
        [9, 9, 3, 3, 12, 12, 3, 3, 9, 9, 3, 3, 10, 10, 3, 3, 11, 11, 11, 3, 3, 10, 10, 10, 3, 11, 11, 1, 11, 11, 3, 3, 9, 9, 3, 3, 12, 12, 3, 3, 3, 9, 1, 11, 11, 3, 3, 10, 10, 3, 3, 9, 9, 9, 3, 10, 10, 10, 12, 12, 3, 3, 3, 9, 9, 3, 12, 12, 3, 3, 9, 9, 3, 3, 10, 10, 3, 12, 12, 3, 9, 9, 3, 3, 12, 12, 12, 3, 3, 9, 9, 3, 12, 12, 3, 3, 9, 9, 1, 12, 12, 3, 11, 11, 11, 3, 3, 9, 9, 3, 10, 10, 3, 3, 11, 11, 3],
        [11, 11, 11, 3, 3, 3, 11, 11, 11, 3, 3, 10, 10, 10, 3, 12, 12, 3, 3, 1, 12, 12, 12, 3, 3, 9, 9, 2, 10, 10, 3, 3, 12, 12, 3, 3, 11, 11, 3, 3, 12, 12, 9, 9, 9, 3, 3, 12, 12, 3, 3, 10, 10, 3, 9, 9, 9, 3, 3, 10, 10, 10, 3, 3, 11, 11, 2, 9, 9, 3, 3, 12, 12, 12, 3, 11, 11, 3, 3, 10, 10, 3, 3, 12, 12, 3, 3, 10, 10, 2, 11, 11, 11, 3, 9, 9, 1, 10, 10, 10, 3, 3, 12, 12, 3, 11, 11, 11, 3, 9, 9, 9, 3, 10, 10, 1],
        [12, 12, 12, 2, 11, 11, 3, 3, 3, 10, 10, 3, 3, 9, 9, 3, 10, 10, 1, 3, 11, 11, 3, 10, 10, 1, 11, 11, 3, 3, 12, 12, 3, 3, 10, 10, 10, 3, 3, 9, 9, 9, 3, 10, 10, 10, 3, 3, 9, 9, 2, 11, 3, 3, 12, 12, 3, 9, 9, 3, 10, 10, 3, 3, 12, 11, 11, 11, 3, 3, 9, 9, 3, 3, 12, 12, 3, 3, 3, 10, 10, 10, 3, 3, 9, 9, 2, 11, 11, 1, 3, 3, 10, 10, 3, 11, 11, 3, 3, 3, 2, 12, 12, 3, 3, 3, 9, 9, 3, 3, 10, 10, 10, 3, 11, 11, 1],
        [3, 3, 12, 12, 12, 3, 3, 10, 10, 10, 9, 9, 9, 3, 12, 12, 12, 9, 9, 3, 11, 11, 1, 10, 10, 3, 12, 12, 3, 3, 3, 11, 11, 11, 10, 10, 12, 12, 3, 10, 10, 10, 1, 12, 12, 12, 3, 3, 10, 10, 3, 9, 9, 9, 3, 3, 10, 10, 10, 3, 11, 11, 10, 10, 10, 12, 12, 3, 10, 10, 10, 9, 9, 9, 3, 11, 11, 11, 2, 10, 10, 3, 11, 11, 9, 9, 10, 10, 3, 11, 11, 11, 3, 9, 9, 3, 3, 12, 12, 3, 11, 11, 1, 10, 10, 3, 11, 11, 11, 3, 3, 10, 10, 3, 11],
        [12, 10, 10, 10, 11, 11, 3, 9, 9, 3, 3, 11, 11, 11, 3, 3, 3, 10, 10, 3, 11, 11, 11, 1, 10, 10, 3, 3, 12, 12, 3, 3, 9, 9, 9, 11, 11, 11, 12, 12, 12, 3, 3, 10, 10, 10, 3, 9, 9, 3, 3, 3, 12, 12, 9, 9, 3, 12, 12, 3, 3, 10, 10, 1, 9, 9, 9, 3, 3, 3, 10, 10, 10, 9, 9, 3, 3, 12, 12, 12, 3, 11, 11, 11, 3, 3, 9, 9, 9, 11, 11, 11, 1, 12, 12, 12, 10, 10, 9, 9, 9, 3, 3, 11, 11, 11, 3, 3, 9, 9, 9, 3, 10, 3, 3, 12]
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 20, 20, 10, 10, 5, 5, 5, 5],
    [0, 0, 0, 250, 200, 125, 100, 50, 50, 20, 20, 20, 20],
    [0, 0, 0, 500, 400, 300, 250, 200, 200, 100, 100, 100, 100]
];
var payLines = [
    [5, 6, 7, 8, 9],  // 1
    [0, 1, 2, 3, 4],  // 2
    [10, 11, 12, 13, 14],  // 3
    [10, 6, 2, 8, 14],  // 4
    [0, 6, 12, 8, 4],  // 5
    [5, 1, 2, 3, 9],  // 6
    [5, 11, 12, 13, 9],  // 7
    [0, 1, 7, 13, 14],  // 8
    [10, 11, 7, 3, 4],  // 9
    [5, 11, 7, 3, 9],  // 10
];
var percentList = {
    wildViewPercent: 34,
    freeWinPercent: 12,
    freePictureWinPercent: 68,
    freeWildPercent: 5,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

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
        this.view = viewCache.view;
        this.WildProcess();
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
        this.freeSpinLevel = 0;
        this.WildProcess();
        this.freeSpinLength = freeSpinCount;
        this.freeSpinIndex = 1;
        this.scatterPositions = ScatterPositions(this.view);
        this.currentGame = "FREE";
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinWinMoney = this.winMoney;
        this.scatterWin = GetFreeSpinWin(this.view, Number(player.virtualBet));
        this.winMoney += this.scatterWin;
    }
}

SlotMachine.prototype.WildProcess = function () {
    this.maskView = [];
    this.wildCount = NumberOfWilds(this.view);
    this.isFreeSpinAdd = false;

    if (this.wildCount > 0) {
        this.maskView = [...this.view];
        this.wildPosArr = GetWildPosArr(this.maskView);
        this.wildExtendPosArr = GetWildExtendPosArr(this.wildPosArr);
        this.view = GetFinalView(this.maskView, this.wildExtendPosArr);

        this.isFreeSpinAdd = true;
        this.freeSpinLength += this.wildCount * 2 - 1;
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;
    this.WildProcess();

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(freeReels[this.freeSpinLevel]),
        below: RandomLineFromReels(freeReels[this.freeSpinLevel])
    };

    this.freeSpinLevel = Util.min(this.freeSpinLevel + this.wildCount, 5);
    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.freeSpinWinMoney += this.scatterWin;
        this.currentGame = "BASE";
    }
};

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
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var scatterCount = 3;

    var scatterView = RandomScatterView(baseReels, scatterCount);
    var scatterWin = WinFromView(scatterView, bpl) + GetFreeSpinWin(scatterView, totalBet);

    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, freeSpinCount);

    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterWin,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var wildCount = 0;

        tmpView = RandomView(reels);
        wildCount = NumberOfWilds(tmpView);

        if (wildCount) {
            var wildPosArr = GetWildPosArr(tmpView);
            var wildExtendPosArr = GetWildExtendPosArr(wildPosArr);
            var finalView = GetFinalView(tmpView, wildExtendPosArr);

            tmpWin = WinFromView(finalView, bpl);
        } else {
            tmpWin = WinFromView(tmpView, bpl);
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            if (wildCount) {
                if (Util.probability(percentList.wildViewPercent)) {
                    break;
                }
            } else {
                break;
            }
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
        var wildCount = 0;

        tmpView = RandomView(reels);
        wildCount = NumberOfWilds(tmpView);

        if (wildCount) {
            var wildPosArr = GetWildPosArr(tmpView);
            var wildExtendPosArr = GetWildExtendPosArr(wildPosArr);
            var finalView = GetFinalView(tmpView, wildExtendPosArr);

            tmpWin = WinFromView(finalView, bpl);
        } else {
            tmpWin = WinFromView(tmpView, bpl);
        }

        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView
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

var RandomScatterView = function (reels, nScatters) {
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

        if (isFreeSpinWin(view) && NumberOfScatters(view) == nScatters && NumberOfWilds(view) == 0) {
            break;
        }
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
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var tmpView;
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinLevel = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var wildCount = 0;

        while (freeSpinIndex <= freeSpinLength) {

            while (true) {
                tmpView = RandomView(reels[freeSpinLevel]);
                wildCount = NumberOfWilds(tmpView);

                if (wildCount) {
                    if (!Util.probability(percentList.freeWildPercent) || freeSpinLevel + wildCount > 5) {
                        continue;
                    }

                    var wildPosArr = GetWildPosArr(tmpView);
                    var wildExtendPosArr = GetWildExtendPosArr(wildPosArr);
                    var finalView = GetFinalView(tmpView, wildExtendPosArr);

                    tmpWin = WinFromView(finalView, bpl);
                } else {
                    tmpWin = WinFromView(tmpView, bpl);
                }

                var winSymbol = WinSymbolFromView(tmpView, bpl);

                if (tmpWin) {
                    if (winSymbol < (8 - freeSpinLevel)) {
                        continue;
                    }

                    if (winSymbol > 8 && Util.probability(percentList.freePictureWinPercent)) {
                        continue;
                    }
                }

                if (tmpWin > 0 && Util.probability(percentList.freeWinPercent) || WinFromView(tmpView) == 0) {
                    break;
                }

            }

            if (wildCount) {
                freeSpinLevel += wildCount;
                freeSpinLength += (wildCount * 2 - 1);
            }

            freeSpinCacheList.push({
                view: tmpView
            }
            );

            freeSpinTotalWin += tmpWin;
            freeSpinIndex++;
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin
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
};

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }
    return money;
};

var WinSymbolFromView = function (view, bpl) {
    var winSymbol = wild;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            for (var j = 0; j < lineSymbols.length; ++j) {
                if (lineSymbols[j] != -1 && lineSymbols[j] != wild) {
                    winSymbol = lineSymbols[j];
                    break;
                }
            }
            break;
        }
    }
    return winSymbol;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) { //                                       
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                          
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                                           
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) { //                                         -1          
        lineSymbols[i] = -1;
    }
    return payTable[matchCount][symbol] * bpl; //                                      
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
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

var GetFreeSpinWin = function (view, totalBet) {
    var nScatters = NumberOfScatters(view);
    switch (nScatters) {
        case 3: return totalBet * 2;
        case 4: return totalBet * 20;
        case 5: return totalBet * 50;
    }
    return 0;
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

var GetWildPosArr = function (view) {
    var res = [];

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            res.push(i);
        }
    }

    return res;
};

var GetWildExtendPosArr = function (wildPosArr) {
    var res = [];

    for (k = 0; k < wildPosArr.length; ++k) {
        var i = wildPosArr[k] % slotWidth;

        for (var j = 0; j < slotHeight; ++j) {
            res.push(i + slotWidth * j);
        }
    }

    return res;
};

var GetFinalView = function (view, wildPosArr) {
    var res = [...view];

    for (var i = 0; i < wildPosArr.length; ++i) {
        res[wildPosArr[i]] = wild;

        //                                                    
        if (view[wildPosArr[i]] == scatter) {
            view[wildPosArr[i]] = Util.random(7, 12);
            res[wildPosArr[i]] = view[wildPosArr[i]];
        }
    }

    return res;
};

module.exports = SlotMachine;