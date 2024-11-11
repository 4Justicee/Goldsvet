var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 50;
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
    this.fsMore = 0;
    //                    
    this.multiPositions = [];
    this.multiValues = [];
    this.isSuperFreeSpin = false;
    //                                
    this.isSecondChance = false;
    this.isSuperSecondChance = false;
    this.bonusChanceStatus = "";
    this.bonusChanceWinsMask = "";
    this.bonusChanceWins = "";
    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var scatter = 1, superScatter = 14;
var wild = 2, wild2X = 15, wild3X = 16;
var slotWidth = 5, slotHeight = 4;
var winLines = [];
var isSuperScatterChance = false;
var baseReels = [
    [7, 6, 9, 8, 12, 6, 3, 3, 3, 3, 3, 3, 3, 3, 7, 4, 11, 13, 7, 13, 13, 8, 10, 10, 10, 8, 6, 11, 9, 6, 12, 11, 4, 7, 8, 13, 4, 11, 13, 5, 13, 13, 6, 7, 1, 9, 7, 6, 8, 8, 9, 11, 12, 5, 11, 1, 10, 10, 5, 5, 10, 12, 7, 4, 6, 13, 4, 8, 4, 5, 9, 13, 11, 13, 13, 12, 12, 10, 9, 13, 10, 9, 10, 8, 8, 10, 11, 13, 10, 8, 13, 12, 12, 6, 4, 7, 6, 6, 4, 9, 8, 1, 8, 5, 13, 13, 10, 13, 7, 10, 10, 7, 9, 4, 13, 13, 10, 13, 8, 4, 6, 4, 11, 5, 9, 6, 5, 5, 7, 11, 8, 9, 1, 9, 11, 11, 10, 11, 13, 6, 7, 8, 11, 11, 7, 11, 12, 10, 7, 10, 7, 5, 5, 13, 10, 13, 1, 8, 5, 10, 4, 7, 5, 6, 10, 5, 8, 12, 9, 12, 12, 10, 4, 11, 13, 10, 13, 7, 3, 3, 3, 3, 3, 3, 3, 3, 9, 8, 4, 8, 11, 13, 10, 6, 5, 4, 11, 1, 7, 6, 8, 8, 12, 6, 12, 5, 10, 7, 10, 6, 8, 13, 6, 9, 4, 8, 12, 11, 4, 6, 10, 5, 7, 9, 11, 5, 6, 5, 7, 1, 4, 8, 11, 11, 6, 7, 5, 8, 4, 5, 11, 8, 8, 10, 7, 4, 9, 8, 5, 1, 4, 12, 10, 8, 4, 5, 4, 13, 8, 13, 10, 4, 10, 12, 8, 9, 11, 9, 4, 8, 11, 5, 13, 4, 11, 11, 12, 7, 10, 13],
    [6, 11, 6, 8, 4, 11, 3, 3, 3, 3, 3, 3, 3, 3, 11, 6, 7, 9, 6, 11, 8, 2, 6, 10, 10, 13, 6, 6, 13, 7, 13, 6, 10, 12, 2, 5, 13, 7, 4, 5, 6, 5, 5, 4, 1, 5, 7, 9, 4, 10, 9, 9, 8, 5, 12, 1, 12, 5, 13, 13, 8, 7, 9, 13, 6, 6, 11, 8, 2, 5, 8, 7, 6, 11, 8, 4, 11, 4, 8, 12, 7, 11, 10, 13, 13, 10, 2, 10, 9, 5, 12, 7, 8, 9, 5, 9, 12, 7, 9, 6, 6, 1, 8, 12, 12, 10, 10, 5, 4, 11, 4, 4, 11, 11, 12, 5, 2, 12, 4, 7, 4, 8, 9, 12, 10, 12, 5, 8, 11, 5, 12, 6, 1, 11, 6, 13, 13, 12, 13, 7, 5, 10, 12, 2, 12, 7, 4, 10, 5, 11, 9, 6, 11, 6, 9, 11, 1, 9, 11, 13, 5, 7, 4, 13, 5, 13, 13, 2, 8, 5, 7, 13, 11, 11, 9, 13, 10, 10, 3, 3, 3, 3, 3, 3, 3, 3, 6, 4, 10, 8, 5, 13, 4, 6, 13, 8, 13, 1, 12, 13, 13, 12, 11, 2, 11, 5, 7, 6, 9, 2, 10, 8, 12, 10, 4, 12, 8, 11, 13, 13, 11, 2, 9, 9, 8, 13, 9, 4, 10, 1, 5, 9, 10, 12, 5, 4, 2, 9, 7, 13, 6, 13, 7, 9, 5, 10, 5, 6, 11, 1, 12, 11, 9, 11, 6, 11, 5, 2, 4, 4, 9, 8, 4, 11, 11, 9, 5, 4, 12, 2, 6, 9, 13, 4, 6, 10, 4, 7, 5, 13],
    [10, 8, 13, 10, 12, 4, 3, 3, 3, 3, 3, 3, 3, 3, 12, 6, 8, 13, 13, 12, 12, 2, 7, 5, 10, 13, 9, 5, 9, 6, 13, 5, 10, 8, 2, 13, 13, 4, 11, 4, 8, 12, 12, 13, 1, 12, 8, 9, 13, 6, 7, 5, 9, 13, 7, 1, 11, 12, 10, 10, 12, 11, 11, 6, 9, 4, 6, 6, 2, 11, 5, 13, 13, 9, 11, 9, 7, 4, 12, 5, 10, 4, 10, 11, 11, 13, 2, 12, 13, 12, 7, 11, 7, 13, 8, 7, 13, 13, 13, 8, 5, 1, 12, 12, 4, 9, 9, 9, 7, 11, 6, 4, 6, 8, 4, 7, 2, 11, 5, 10, 8, 11, 12, 12, 6, 6, 5, 9, 9, 10, 7, 5, 1, 6, 10, 6, 9, 12, 7, 13, 12, 4, 5, 2, 5, 10, 9, 4, 5, 4, 7, 5, 12, 10, 12, 11, 1, 11, 12, 6, 6, 12, 6, 6, 4, 6, 11, 2, 9, 10, 8, 7, 11, 11, 13, 9, 10, 13, 3, 3, 3, 3, 3, 3, 3, 3, 7, 6, 13, 12, 11, 13, 4, 7, 11, 13, 13, 1, 4, 13, 4, 7, 12, 2, 9, 7, 10, 12, 7, 2, 5, 10, 12, 5, 10, 12, 6, 11, 7, 11, 6, 2, 7, 7, 9, 12, 5, 8, 5, 1, 13, 11, 6, 12, 9, 6, 2, 8, 10, 8, 10, 11, 12, 10, 8, 8, 12, 7, 10, 1, 13, 5, 4, 12, 6, 11, 12, 2, 12, 10, 5, 8, 9, 9, 7, 6, 8, 7, 5, 2, 7, 10, 12, 12, 6, 9, 8, 11, 10, 13],
    [13, 9, 8, 13, 12, 6, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 8, 7, 10, 10, 4, 2, 11, 11, 9, 10, 13, 10, 5, 7, 4, 10, 8, 13, 2, 4, 11, 6, 5, 11, 8, 12, 10, 12, 1, 9, 11, 8, 8, 12, 11, 7, 9, 9, 10, 1, 6, 7, 13, 13, 7, 8, 4, 12, 5, 8, 13, 13, 8, 7, 9, 6, 9, 9, 11, 11, 12, 6, 6, 12, 8, 4, 11, 7, 12, 6, 2, 5, 11, 12, 12, 13, 8, 8, 5, 10, 6, 6, 12, 8, 10, 1, 8, 11, 9, 9, 9, 13, 10, 9, 13, 12, 11, 7, 13, 13, 2, 11, 7, 6, 6, 11, 5, 12, 11, 10, 8, 4, 4, 12, 4, 8, 1, 8, 10, 7, 6, 7, 9, 7, 6, 5, 4, 2, 7, 8, 7, 5, 12, 11, 9, 7, 4, 6, 6, 9, 1, 11, 10, 8, 6, 12, 12, 10, 10, 4, 10, 2, 13, 12, 7, 4, 10, 6, 13, 13, 4, 13, 3, 3, 3, 3, 3, 3, 3, 3, 10, 11, 4, 5, 9, 13, 5, 6, 5, 4, 5, 1, 13, 9, 6, 12, 12, 2, 9, 9, 13, 13, 5, 2, 13, 13, 8, 11, 10, 9, 12, 10, 9, 13, 7, 2, 5, 5, 8, 10, 7, 9, 13, 1, 13, 5, 12, 10, 7, 4, 2, 4, 13, 5, 4, 12, 8, 7, 10, 10, 5, 11, 12, 1, 11, 11, 5, 13, 12, 11, 12, 2, 8, 13, 6, 13, 11, 11, 4, 10, 5, 4, 5, 2, 6, 10, 13, 12, 6, 5, 4, 11, 10, 13],
    [13, 4, 9, 6, 6, 12, 3, 3, 3, 3, 3, 3, 3, 3, 5, 7, 13, 4, 7, 11, 10, 12, 12, 5, 6, 5, 5, 8, 12, 11, 6, 5, 4, 8, 5, 7, 12, 7, 9, 6, 11, 9, 11, 12, 9, 13, 8, 8, 13, 10, 7, 13, 6, 5, 9, 14, 7, 12, 6, 7, 4, 6, 8, 10, 12, 13, 7, 12, 7, 12, 9, 13, 12, 10, 6, 7, 10, 4, 5, 8, 8, 9, 13, 5, 5, 10, 13, 11, 6, 11, 9, 7, 4, 13, 7, 10, 12, 8, 12, 13, 13, 8, 11, 13, 5, 6, 6, 6, 13, 12, 10, 9, 11, 12, 13, 8, 12, 7, 12, 10, 6, 13, 5, 8, 9, 12, 9, 12, 12, 6, 10, 5, 13, 13, 4, 12, 6, 4, 8, 9, 6, 12, 10, 11, 11, 10, 10, 12, 6, 5, 13, 11, 7, 8, 13, 11, 1, 10, 6, 12, 9, 10, 10, 9, 4, 5, 11, 13, 10, 6, 8, 5, 5, 10, 12, 8, 4, 9, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 6, 13, 12, 12, 9, 11, 10, 4, 13, 12, 11, 9, 13, 10, 13, 6, 13, 8, 10, 11, 5, 11, 13, 7, 8, 8, 4, 8, 12, 8, 13, 11, 8, 9, 6, 4, 9, 6, 12, 5, 13, 7, 7, 11, 8, 13, 13, 9, 8, 12, 11, 12, 7, 7, 9, 10, 8, 12, 7, 11, 5, 1, 9, 10, 7, 4, 11, 5, 10, 4, 12, 11, 8, 12, 13, 10, 7, 13, 10, 11, 13, 8, 11, 9, 13, 4, 11, 10, 4, 11, 10, 13]
];
var freeReels = [
    [7, 6, 9, 8, 12, 6, 3, 3, 3, 3, 3, 3, 3, 3, 7, 4, 11, 13, 7, 13, 13, 8, 10, 10, 10, 8, 6, 11, 9, 6, 12, 11, 4, 7, 8, 13, 4, 11, 13, 5, 13, 13, 6, 7, 1, 9, 7, 6, 8, 8, 9, 11, 12, 5, 11, 1, 10, 10, 5, 5, 10, 12, 7, 4, 6, 13, 4, 8, 4, 5, 9, 13, 11, 13, 13, 12, 12, 10, 9, 13, 10, 9, 10, 8, 8, 10, 11, 13, 10, 8, 13, 12, 12, 6, 4, 7, 6, 6, 4, 9, 8, 1, 8, 5, 13, 13, 10, 13, 7, 10, 10, 7, 9, 4, 13, 13, 10, 13, 8, 4, 6, 4, 11, 5, 9, 6, 5, 5, 7, 11, 8, 9, 1, 9, 11, 11, 10, 11, 13, 6, 7, 8, 11, 11, 7, 11, 12, 10, 7, 10, 7, 5, 5, 13, 10, 13, 1, 8, 5, 10, 4, 7, 5, 6, 10, 5, 8, 12, 9, 12, 12, 10, 4, 11, 13, 10, 13, 7, 3, 3, 3, 3, 3, 3, 3, 3, 9, 8, 4, 8, 11, 13, 10, 6, 5, 4, 11, 1, 7, 6, 8, 8, 12, 6, 12, 5, 10, 7, 10, 6, 8, 13, 6, 9, 4, 8, 12, 11, 4, 6, 10, 5, 7, 9, 11, 5, 6, 5, 7, 1, 4, 8, 11, 11, 6, 7, 5, 8, 4, 5, 11, 8, 8, 10, 7, 4, 9, 8, 5, 1, 4, 12, 10, 8, 4, 5, 4, 13, 8, 13, 10, 4, 10, 12, 8, 9, 11, 9, 4, 8, 11, 5, 13, 4, 11, 11, 12, 7, 10, 13],
    [6, 11, 6, 8, 4, 11, 3, 3, 3, 3, 3, 3, 3, 3, 11, 6, 7, 9, 6, 11, 8, 2, 6, 10, 10, 13, 6, 6, 13, 7, 13, 6, 10, 12, 2, 5, 13, 7, 4, 5, 6, 5, 5, 4, 1, 5, 7, 9, 4, 10, 9, 9, 8, 5, 12, 1, 12, 5, 13, 13, 8, 7, 9, 13, 6, 6, 11, 8, 13, 5, 8, 7, 6, 11, 8, 4, 11, 4, 8, 12, 7, 11, 10, 13, 13, 10, 13, 10, 9, 5, 12, 7, 8, 9, 5, 9, 12, 7, 9, 6, 6, 1, 8, 12, 12, 10, 10, 5, 4, 11, 4, 4, 11, 11, 12, 5, 2, 12, 4, 7, 4, 8, 9, 12, 10, 12, 5, 8, 11, 5, 12, 6, 1, 11, 6, 13, 13, 12, 13, 7, 5, 10, 12, 7, 12, 7, 4, 10, 5, 11, 9, 6, 11, 6, 9, 11, 1, 9, 11, 13, 5, 7, 4, 13, 5, 13, 13, 2, 8, 5, 7, 13, 11, 11, 9, 13, 10, 10, 3, 3, 3, 3, 3, 3, 3, 3, 6, 4, 10, 8, 5, 13, 4, 6, 13, 8, 13, 1, 12, 13, 13, 12, 11, 2, 11, 5, 7, 6, 9, 2, 10, 8, 12, 10, 4, 12, 8, 11, 13, 13, 11, 2, 9, 9, 8, 13, 9, 4, 10, 1, 5, 9, 10, 12, 5, 4, 2, 9, 7, 13, 6, 13, 7, 9, 5, 10, 5, 6, 11, 1, 12, 11, 9, 11, 6, 11, 5, 2, 4, 4, 9, 8, 4, 11, 11, 9, 5, 4, 12, 2, 6, 9, 13, 4, 6, 10, 4, 7, 5, 13],
    [10, 8, 13, 10, 12, 4, 3, 3, 3, 3, 3, 3, 3, 3, 12, 6, 8, 13, 13, 12, 12, 2, 7, 5, 10, 13, 9, 5, 9, 6, 13, 5, 10, 8, 6, 13, 13, 4, 11, 4, 8, 12, 12, 13, 1, 12, 8, 9, 13, 6, 7, 5, 9, 13, 7, 1, 11, 12, 10, 10, 12, 11, 11, 6, 9, 4, 6, 6, 13, 11, 5, 13, 13, 9, 11, 9, 7, 4, 12, 5, 10, 4, 10, 11, 11, 13, 6, 12, 13, 12, 7, 11, 7, 13, 8, 7, 13, 13, 13, 8, 5, 1, 12, 12, 4, 9, 9, 9, 7, 11, 6, 4, 6, 8, 4, 7, 2, 11, 5, 10, 8, 11, 12, 12, 6, 6, 5, 9, 9, 10, 7, 5, 1, 6, 10, 6, 9, 12, 7, 13, 12, 4, 5, 5, 5, 10, 9, 4, 5, 4, 7, 5, 12, 10, 12, 11, 1, 11, 12, 6, 6, 12, 6, 6, 4, 6, 11, 2, 9, 10, 8, 7, 11, 11, 13, 9, 10, 13, 3, 3, 3, 3, 3, 3, 3, 3, 7, 6, 13, 12, 11, 13, 4, 7, 11, 13, 13, 1, 4, 13, 4, 7, 12, 2, 9, 7, 10, 12, 7, 2, 5, 10, 12, 5, 10, 12, 6, 11, 7, 11, 6, 2, 7, 7, 9, 12, 5, 8, 5, 1, 13, 11, 6, 12, 9, 6, 7, 8, 10, 8, 10, 11, 12, 10, 8, 8, 12, 7, 10, 1, 13, 5, 4, 12, 6, 11, 12, 2, 12, 10, 5, 8, 9, 9, 7, 6, 8, 7, 5, 2, 7, 10, 12, 12, 6, 9, 8, 11, 10, 13],
    [13, 9, 8, 13, 12, 6, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 8, 7, 10, 10, 4, 8, 11, 11, 9, 10, 13, 10, 5, 7, 4, 10, 8, 13, 7, 4, 11, 6, 5, 11, 8, 12, 10, 12, 1, 9, 11, 8, 8, 12, 11, 7, 9, 9, 10, 1, 6, 7, 13, 13, 7, 8, 4, 12, 5, 8, 13, 13, 8, 7, 9, 6, 9, 9, 11, 11, 12, 6, 6, 12, 8, 4, 11, 7, 12, 6, 5, 5, 11, 12, 12, 13, 8, 8, 5, 10, 6, 6, 12, 8, 10, 1, 8, 11, 9, 9, 9, 13, 10, 9, 13, 12, 11, 7, 13, 13, 2, 11, 7, 6, 6, 11, 5, 12, 11, 10, 8, 4, 4, 12, 4, 8, 1, 8, 10, 7, 6, 7, 9, 7, 6, 5, 4, 7, 7, 8, 7, 5, 12, 11, 9, 7, 4, 6, 6, 9, 1, 11, 10, 8, 6, 12, 12, 10, 10, 4, 10, 2, 13, 12, 7, 4, 10, 6, 13, 13, 4, 13, 3, 3, 3, 3, 3, 3, 3, 3, 10, 11, 4, 5, 9, 13, 5, 6, 5, 4, 5, 1, 13, 9, 6, 12, 12, 2, 9, 9, 13, 13, 5, 2, 13, 13, 8, 11, 10, 9, 12, 10, 9, 13, 7, 2, 5, 5, 8, 10, 7, 9, 13, 1, 13, 5, 12, 10, 7, 4, 2, 4, 13, 5, 4, 12, 8, 7, 10, 10, 5, 11, 12, 1, 11, 11, 5, 13, 12, 11, 12, 2, 8, 13, 6, 13, 11, 11, 4, 10, 5, 4, 5, 2, 6, 10, 13, 12, 6, 5, 4, 11, 10, 13],
    [13, 4, 9, 6, 6, 12, 3, 3, 3, 3, 3, 3, 3, 3, 5, 7, 13, 4, 7, 11, 10, 12, 12, 5, 6, 5, 5, 8, 12, 11, 6, 5, 4, 8, 5, 7, 12, 7, 9, 6, 11, 9, 11, 12, 9, 13, 8, 8, 13, 10, 7, 13, 6, 5, 9, 1, 7, 12, 6, 7, 4, 6, 8, 10, 12, 13, 7, 12, 7, 12, 9, 13, 12, 10, 6, 7, 10, 4, 5, 8, 8, 9, 13, 5, 5, 10, 13, 11, 6, 11, 9, 7, 4, 13, 7, 10, 12, 8, 12, 13, 13, 8, 11, 13, 5, 6, 6, 6, 13, 12, 10, 9, 11, 12, 13, 8, 12, 7, 12, 10, 6, 13, 5, 8, 9, 12, 9, 12, 12, 6, 10, 5, 13, 13, 4, 12, 6, 4, 8, 9, 6, 12, 10, 11, 11, 10, 10, 12, 6, 5, 13, 11, 7, 8, 13, 11, 1, 10, 6, 12, 9, 10, 10, 9, 4, 5, 11, 13, 10, 6, 8, 5, 5, 10, 12, 8, 4, 9, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 6, 13, 12, 12, 9, 11, 10, 4, 13, 12, 11, 9, 13, 10, 13, 6, 13, 8, 10, 11, 5, 11, 13, 7, 8, 8, 4, 8, 12, 8, 13, 11, 8, 9, 6, 4, 9, 6, 12, 5, 13, 7, 7, 11, 8, 13, 13, 9, 8, 12, 11, 12, 7, 7, 9, 10, 8, 12, 7, 11, 5, 1, 9, 10, 7, 4, 11, 5, 10, 4, 12, 11, 8, 12, 13, 10, 7, 13, 10, 11, 13, 8, 11, 9, 13, 4, 11, 10, 4, 11, 10, 13]
];
var superReels = [
    [7, 6, 9, 8, 12, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 11, 5, 7, 4, 13, 3, 3, 3, 3, 3, 3, 8, 5, 10, 4, 8, 5, 11, 4, 6, 12, 11, 4, 7, 8, 13, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 13, 5, 13, 13, 6, 7, 1, 9, 3, 3, 3, 3, 3, 3, 3, 5, 3, 1, 10, 10, 5, 5, 10, 12, 7, 4, 6, 13, 4, 8, 4, 5, 9, 13, 11, 13, 13, 12, 12, 10, 9, 13, 10, 9, 10, 8, 8, 10, 3, 11, 13, 10, 8, 13, 12, 12, 6, 4, 7, 6, 6, 4, 9, 8, 1, 8, 5, 13, 13, 3, 3, 3, 3, 3, 3, 3, 10, 10, 7, 9, 4, 13, 13, 10, 13, 8, 4, 6, 4, 11, 5, 3, 3, 3, 3, 3, 7, 11, 8, 9, 1, 9, 11, 11, 10, 11, 13, 6, 7, 8, 3, 11, 11, 7, 11, 12, 10, 7, 10, 7, 5, 5, 13, 10, 13, 1, 8, 5, 10, 4, 7, 5, 6, 10, 3, 5, 8, 12, 9, 12, 12, 10, 4, 11, 13, 10, 13, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 8, 4, 8, 11, 13, 10, 6, 5, 4, 3, 3, 11, 3, 3, 3, 1, 3, 3, 7, 6, 8, 8, 12, 6, 12, 5, 10, 7, 10, 6, 8, 13, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 6, 10, 5, 7, 9, 11, 5, 6, 5, 7, 1, 4, 8, 11, 11, 6, 7, 5, 8, 4, 5, 11, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 8, 3, 10, 3, 7, 4, 9, 8, 5, 1, 4, 12, 10, 8, 4, 5, 4, 13, 8, 13, 10, 4],
    [6, 11, 6, 8, 4, 11, 3, 3, 3, 3, 3, 3, 3, 3, 11, 3, 3, 9, 6, 11, 8, 3, 3, 3, 3, 3, 3, 3, 6, 10, 10, 13, 6, 6, 13, 7, 13, 6, 10, 12, 7, 3, 5, 3, 3, 3, 3, 13, 3, 3, 3, 3, 7, 3, 4, 5, 6, 5, 5, 4, 1, 3, 3, 3, 3, 3, 3, 9, 3, 3, 8, 5, 12, 1, 12, 5, 13, 13, 8, 7, 9, 3, 13, 3, 3, 6, 11, 8, 13, 5, 8, 7, 6, 11, 8, 4, 11, 4, 8, 12, 7, 11, 10, 13, 13, 10, 13, 10, 9, 5, 12, 7, 8, 9, 5, 9, 12, 7, 9, 6, 6, 1, 3, 3, 3, 3, 3, 3, 3, 4, 11, 4, 4, 11, 11, 12, 5, 3, 12, 4, 7, 4, 8, 3, 3, 3, 3, 3, 3, 5, 8, 11, 5, 12, 6, 1, 11, 6, 13, 13, 12, 13, 7, 5, 10, 12, 7, 12, 7, 4, 10, 5, 11, 9, 6, 11, 6, 9, 11, 1, 9, 11, 13, 5, 7, 4, 13, 5, 13, 13, 3, 8, 5, 7, 13, 11, 11, 9, 13, 10, 10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 4, 10, 8, 5, 13, 4, 6, 13, 8, 3, 13, 1, 12, 3, 13, 13, 12, 11, 3, 11, 5, 7, 6, 9, 3, 10, 8, 12, 10, 4, 12, 8, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 8, 13, 9, 4, 10, 3, 1, 5, 9, 10, 3, 3, 3, 3, 3, 3, 3, 7, 13, 6, 13, 3, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 5, 10, 5, 6, 11, 1, 12, 11, 9, 11, 6, 11, 5, 2, 5, 4, 9, 8, 4, 11],
    [10, 8, 13, 10, 12, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 8, 13, 13, 12, 12, 3, 3, 3, 3, 3, 3, 8, 7, 5, 10, 13, 9, 5, 9, 6, 13, 5, 10, 8, 6, 13, 3, 3, 3, 3, 3, 13, 3, 3, 3, 3, 4, 3, 11, 4, 8, 1, 12, 13, 3, 3, 3, 3, 3, 3, 9, 13, 6, 7, 5, 9, 13, 7, 1, 11, 12, 10, 10, 12, 11, 6, 9, 11, 6, 9, 4, 6, 6, 13, 11, 5, 13, 13, 9, 11, 9, 7, 4, 12, 5, 3, 10, 4, 10, 3, 3, 3, 3, 3, 6, 12, 13, 12, 7, 11, 7, 13, 8, 7, 3, 13, 3, 3, 3, 3, 3, 3, 3, 3, 4, 9, 9, 9, 7, 11, 6, 4, 6, 8, 4, 11, 3, 3, 3, 3, 3, 3, 11, 12, 12, 6, 6, 5, 9, 9, 10, 7, 5, 1, 6, 10, 6, 9, 12, 7, 3, 3, 3, 3, 13, 12, 4, 5, 5, 5, 10, 9, 4, 5, 4, 3, 7, 5, 12, 3, 10, 12, 11, 1, 11, 12, 6, 6, 12, 6, 6, 4, 6, 3, 3, 9, 10, 8, 7, 11, 11, 13, 9, 10, 13, 3, 3, 3, 3, 3, 3, 3, 3, 7, 6, 13, 12, 11, 13, 3, 4, 7, 11, 13, 13, 1, 4, 13, 4, 7, 12, 9, 9, 7, 10, 12, 3, 3, 5, 10, 12, 5, 10, 3, 3, 3, 3, 3, 3, 3, 7, 7, 9, 3, 3, 3, 3, 3, 5, 1, 13, 11, 6, 12, 9, 6, 7, 8, 10, 8, 3, 10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 3, 3, 12, 10, 8, 8, 12, 7, 10, 1, 13, 5, 4, 12, 6, 11, 12, 2, 12, 3, 5],
    [13, 9, 8, 13, 12, 6, 3, 3, 3, 3, 3, 3, 3, 3, 7, 3, 8, 7, 10, 10, 4, 3, 3, 3, 3, 3, 3, 7, 11, 11, 9, 10, 13, 10, 5, 7, 4, 10, 8, 13, 3, 3, 7, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 11, 6, 5, 11, 8, 12, 10, 12, 1, 9, 11, 3, 3, 3, 3, 3, 3, 11, 7, 9, 9, 10, 1, 6, 7, 13, 13, 7, 8, 4, 12, 6, 5, 8, 13, 13, 3, 8, 7, 9, 6, 9, 9, 11, 11, 12, 6, 6, 12, 8, 4, 11, 7, 5, 12, 6, 5, 5, 11, 12, 12, 13, 8, 8, 5, 10, 6, 6, 12, 8, 10, 1, 8, 11, 9, 9, 9, 13, 10, 9, 13, 12, 11, 7, 13, 13, 11, 3, 3, 3, 3, 3, 3, 3, 12, 11, 10, 8, 4, 4, 12, 4, 8, 1, 8, 10, 7, 6, 7, 9, 7, 6, 5, 4, 3, 7, 7, 8, 7, 5, 12, 11, 9, 7, 4, 6, 6, 3, 9, 1, 11, 10, 8, 6, 12, 12, 10, 10, 4, 10, 6, 13, 12, 7, 4, 10, 6, 13, 13, 4, 13, 3, 3, 3, 3, 3, 3, 3, 3, 3, 10, 11, 4, 5, 9, 13, 5, 6, 5, 4, 5, 1, 13, 3, 3, 3, 9, 6, 12, 12, 8, 9, 9, 13, 13, 5, 3, 3, 13, 8, 11, 10, 9, 12, 10, 9, 13, 7, 9, 5, 5, 8, 10, 7, 3, 3, 3, 3, 3, 3, 3, 12, 10, 3, 3, 7, 4, 8, 4, 13, 5, 4, 12, 8, 3, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 10, 3, 10, 5, 11, 12, 1, 11, 11, 5, 13, 12, 11, 3, 2, 8, 13, 6, 13, 11, 11],
    [13, 4, 9, 6, 6, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 13, 4, 7, 11, 10, 3, 3, 3, 3, 3, 3, 12, 12, 5, 6, 5, 6, 8, 12, 11, 6, 5, 4, 8, 5, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 7, 9, 1, 11, 9, 11, 12, 9, 3, 3, 3, 3, 3, 3, 3, 7, 13, 6, 5, 9, 4, 7, 12, 6, 7, 4, 6, 8, 10, 12, 13, 7, 12, 7, 12, 9, 13, 12, 10, 6, 7, 10, 4, 5, 8, 8, 9, 13, 5, 3, 3, 3, 3, 3, 11, 6, 11, 9, 7, 4, 13, 7, 10, 12, 8, 12, 13, 13, 8, 11, 13, 5, 5, 10, 13, 11, 6, 13, 12, 10, 9, 11, 12, 13, 8, 12, 7, 12, 10, 6, 13, 6, 5, 8, 9, 3, 12, 9, 12, 12, 6, 10, 5, 13, 13, 4, 12, 3, 3, 6, 4, 8, 9, 6, 12, 10, 11, 11, 10, 10, 12, 6, 5, 13, 11, 7, 8, 13, 11, 3, 3, 3, 1, 10, 6, 3, 12, 9, 10, 10, 9, 4, 5, 11, 13, 10, 6, 8, 5, 5, 3, 10, 3, 3, 12, 3, 8, 4, 9, 3, 3, 3, 3, 3, 3, 3, 3, 9, 3, 9, 3, 6, 13, 3, 12, 12, 9, 11, 10, 4, 13, 12, 11, 9, 13, 10, 13, 6, 13, 8, 10, 11, 5, 11, 13, 7, 8, 8, 4, 8, 12, 8, 13, 11, 8, 9, 6, 4, 9, 6, 12, 5, 13, 7, 3, 3, 11, 8, 13, 13, 9, 8, 12, 11, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 3, 7, 9, 10, 8, 12, 7, 11, 5, 1, 9, 10, 7, 4, 11, 5, 10, 4, 12, 11, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 25, 25, 25, 15, 15, 10, 10, 5, 5, 5, 5, 0],
    [0, 0, 0, 50, 50, 50, 30, 30, 25, 25, 10, 10, 10, 10, 0],
    [0, 0, 0, 100, 75, 75, 75, 75, 50, 50, 50, 50, 50, 50, 0]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 50; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.fsMore = 0;
    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.view = this.freeSpinCacheList[0];
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (isSecondChanceBonusView(this.view)) {
        this.isSecondChance = true;
    }

    //                   ;
    if (isFreeSpinWin(this.view) || isSuperFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
        if (isSuperFreeSpinWin(this.view)) {
            this.isSuperFreeSpin = true;
            this.freeSpinLength = CountOfScatterSuperView(this.view)
        } else {
            this.freeSpinLength = CountOfScatterFreeView(this.view)
        }
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    var id = Number(param.ind);
    var maskArr = [];
    var maskScatterWins = [0, 0, 0];
    var status = [0, 0, 0];
    var pos = [];

    for (var i = 0; i < 3; i++) {
        if (i != id) {
            pos.push(i);
        }
    }

    if (isSuperScatterChance) {
        maskArr = ['sff', 'sff', 'sff'];
        maskScatterWins[pos[0]] = 7;
        maskScatterWins[pos[1]] = 10;
    } else {
        maskArr = ['nff', 'nff', 'nff'];
        maskScatterWins[pos[0]] = 6;
        maskScatterWins[pos[1]] = 10;
    }

    maskArr[id] = "l";
    maskScatterWins[id] = 0;
    status[id] = 1;

    this.bonusChanceStatus = status.join();
    this.bonusChanceWinsMask = maskArr.join();
    this.bonusChanceWins = maskScatterWins.join();
    this.isSecondChance = false;
    isSuperScatterChance = false;
}

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    if (isSecondChanceBonusView(this.view)) {
        //                                                                      .
        freeSpinLength += 5;
        this.fsMore = 5;
    }

    var multi = GetWildMultisFromView(this.view);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.view = GetFinalView(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.isSuperFreeSpin = false;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

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
    var scatterView = [],
        scatterWinMoney = 0,
        isSuperFree = false,
        sccaterCount = 0;

    if (Util.probability(55)) {
        scatterView = RandomSuperScatterView(baseReels);
        sccaterCount = CountOfScatterSuperView(scatterView);
        isSuperFree = true;
    } else {
        scatterView = RandomScatterView(baseReels);
        sccaterCount = CountOfScatterFreeView(scatterView);
    }

    var scatterWinMoney = WinFromView(scatterView, bpl);
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(isSuperFree ? superReels : freeReels, bpl, fsWin, sccaterCount);
    isSuperFree = false;
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
    return tmpView;
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
    return tmpView;
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

        if (isFreeSpinWin(view) && NumberOfScatters(view) < 5) {
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
        var freeSpinIndex = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);
                fsWin = WinFromView(fsview, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            if (Util.probability(60)) {
                fsview = GetWildStickyView(fsview); //                      
            }

            if (isSecondChanceBonusView(fsview)) {
                //                                                                      .
                freeSpinLength = freeSpinLength + 5;
            }

            fsWin = WinFromView(fsview, bpl);
            freeSpinData.viewList.push(fsview);
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

var RandomSuperScatterView = function (reels) {
    var view = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
        }
    }

    for (var i = 0; i < view.length; i++) {
        if (view[i] == scatter || view[i] == superScatter) {
            view[i] = Util.random(3, 13); //                                             
        }
    }

    var superPos = [4, 9, 14, 19];
    var scatterPos = [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18];
    var scatterNum = 2; //                                            
    for (var i = 0; i < scatterNum; i++) {
        while (true) {
            var pos = Util.random(0, scatterPos.length);
            if (view[scatterPos[pos]] != scatter) {
                view[scatterPos[pos]] = scatter;
                break;
            }
        }
    }

    view[superPos[Util.random(0, superPos.length)]] = superScatter;

    return view;
};

//                                  ?
var isSecondChanceBonusView = function (view) {
    var scatterPos = [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18],
        superPos = [4, 9, 14, 19];

    if (isFreeSpinWin(view) == false && isSuperFreeSpinWin(view) == false) {
        for (var i = 0; i < scatterPos.length; i++) {
            if (view[scatterPos[i]] == scatter) {
                for (var j = 0; j < superPos.length; j++) {
                    if (view[superPos[j]] == superScatter) {
                        isSuperScatterChance = true;
                        return true;
                    } else if (view[superPos[j]] == scatter) {
                        isSuperScatterChance = false;
                        return true;
                    }
                }
            }
        }
    }
};

var GetWildStickyView = function (view) {
    var resultView = [...view];
    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] == wild) {
            resultView[i] = Util.random(0, 10) % 2 == 0 ? wild2X : wild3X;
            break;
        }
    }
    return resultView;
};

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    for (var i = 0; i < slotHeight; i++) {
        var history = [-1, -1, -1, -1];
        var pos = i * slotWidth;
        history[0] = pos;
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    var winMoney = 0;

    //                                                             
    if (step == slotWidth) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
            if (isWild(view[pos])) {
                wildMulti *= GetWildMulti(view[pos]);
            }
        }

        winMoney = bpl * payTable[step][symbolId] * wildMulti;
        winLines.push(`0~${winMoney}~${history.join('~')}`);
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
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
        var matchCount = 0;
        for (var i = 0; i < history.length; i++) {
            if (history[i] >= 0) {
                matchCount++;
            }
        }

        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
            if (isWild(view[pos])) {
                wildMulti *= GetWildMulti(view[pos]);
            }
        }

        var money = bpl * payTable[matchCount][symbolId] * wildMulti;
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
        //                                                           
        var newSymbolId = symbolId;
        if (symbolId == wild) {
            newSymbolId = view[positionsByStep[i]];
        }
        winMoney += RecursiveSearch(view, step + 1, historyTmp, newSymbolId, bpl);
    }
    return winMoney;
};

var GetWildMultisFromView = function (multiView) {
    var multiPositions = [],
        multiValues = [];
    for (var i = 0; i < multiView.length; i++) {
        var symbol = multiView[i];
        if (isWildMulti(symbol)) {
            multiPositions.push(i);
            var multi = GetWildMulti(symbol);
            multiValues.push(multi);
        }
    }
    return {
        positions: multiPositions,
        values: multiValues
    };
};

var GetFinalView = function (view) {
    var finalView = [...view];
    for (var i = 0; i < finalView.length; i++) {
        if (isWildMulti(finalView[i])) {
            finalView[i] = wild;
        }
    }
    return finalView;
};

var isWild = function (symbol) {
    return symbol == wild || symbol == wild2X || symbol == wild3X;
};

var isWildMulti = function (symbol) {
    return symbol == wild2X || symbol == wild3X;
};

var GetWildMulti = function (symbol) {
    switch (symbol) {
        case wild: return 1;
        case wild2X: return 2;
        case wild3X: return 3;
    }
    return 1;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isSuperFreeSpinWin = function (view) {
    var scatterPos = [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18],
        superPos = [4, 9, 14, 19];
    var counter = 0;

    for (var i = 0; i < scatterPos.length; i++) {
        if (view[scatterPos[i]] == scatter) {
            counter++;
        }
    }
    for (var i = 0; i < superPos.length; i++) {
        if (view[superPos[i]] == superScatter) {
            if (counter >= 2) {
                return true;
            }
        }
    }
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

var NumberOfSuperScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == superScatter) {
            result++;
        }
    }
    return result;
};

var CountOfScatterFreeView = function (view) {
    switch (NumberOfScatters(view)) {
        case 3:
            return 8;
        case 4:
            return 15;
        case 5:
            return 20;
        default:
            break;
    }
};

var CountOfScatterSuperView = function (view) {
    if (NumberOfSuperScatters(view) == 1) {
        switch (NumberOfScatters(view)) {
            case 2:
                return 8;
            case 3:
                return 15;
            case 4:
                return 25;
            default:
                break;
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

module.exports = SlotMachine;