var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.nudgeStatus = "NONUDGE";
    this.prevNudgeStatus = "NONUDGE";
    this.lineCount = 10;
    this.winMoney = 0;
    this.winLines = [];
    //                                 

    this.view = [];
    this.virtualReels = {};
    this.virtualReelsList = [];
    this.prevWinReelStartIndex = 0;
    this.prevWinReelEndIndex = 0;
    this.scatterCntList = [];
    this.scatterPositionsList = [];
    this.scatterCnt = 0;
    this.scatterPositions = [];
    //       
    this.nudgeIndex = 0;
    this.nudgeCacheList = [];
    this.nudges = [];
    this.nudge_win = 0;
    this.nudge_res = 0;
    this.nudge = "";
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinVirtualReelsList = [];
    this.freeSpinScatterCntList = [];
    this.freeSpinScatterPositionsList = [];
    this.fsMulti = 0;
    this.fsTotalMoney = 0;

    this.buyMulti = 80;
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

var slotWidth = 5, slotHeight = 3;
var freeSpinCount = 8;
var baseReels = [
    [5, 5, 5, 3, 8, 8, 8, 8, 9, 9, 9, 5, 6, 7, 7, 7, 7, 4, 3, 3, 3, 9, 4, 4, 4, 6, 6, 6, 7, 3, 4, 6, 7, 8, 9, 8, 9, 4, 3, 8, 4, 6, 9, 7, 6, 4, 8, 4, 3, 8, 6, 3, 8, 3, 6, 9, 4, 6, 7, 9, 7, 4, 8, 7, 8, 9],
    [9, 4, 6, 9, 9, 9, 5, 8, 7, 3, 6, 6, 6, 7, 7, 7, 5, 5, 5, 4, 4, 4, 8, 8, 8, 3, 3, 3, 7, 5, 6, 5, 7, 5, 8, 5, 4, 6, 4, 6, 4, 5, 8, 6, 5, 4, 3, 4, 6, 3, 5, 8, 5, 8, 6, 7, 4, 8, 5],
    [9, 5, 5, 5, 5, 7, 8, 8, 8, 3, 6, 6, 6, 8, 9, 9, 9, 6, 4, 3, 3, 3, 7, 7, 7, 4, 4, 4, 8, 5, 6, 5, 7, 3, 5, 7, 4, 7, 3, 5, 6, 4, 3, 5, 6, 5, 3, 8, 5, 6, 7, 6, 7, 5, 7, 3, 6, 7, 5, 3, 7, 5, 6, 3, 6, 3, 7, 6, 4, 7, 5, 8, 6, 7, 3, 6, 3, 5, 6, 3, 4, 6, 3, 8, 7, 6, 5, 6, 5, 3, 7, 8, 6, 4, 7, 6, 7, 6, 8, 6, 7, 6, 5, 6, 5, 7, 6, 3, 6, 8, 6, 7, 8, 7, 8, 4, 7, 5, 7, 5],
    [9, 8, 8, 8, 5, 3, 9, 9, 9, 6, 7, 8, 4, 3, 3, 3, 5, 5, 5, 4, 4, 4, 7, 7, 7, 6, 6, 6, 5, 8, 6, 7, 4, 5, 3, 6, 3, 6, 3, 6, 8, 3, 7, 3, 7, 4, 3, 7, 8, 5, 8, 6, 7, 3, 6, 5, 8, 7, 5, 3, 5, 3, 6, 8, 5, 3, 6],
    [3, 5, 5, 5, 9, 6, 6, 6, 7, 6, 4, 5, 7, 7, 7, 8, 3, 3, 3, 9, 9, 9, 4, 4, 4, 8, 8, 8, 4, 6, 7, 6, 7, 5, 6, 4, 5, 6, 8, 5, 9, 6, 4, 9, 8, 4, 5, 6, 4, 7, 4, 5, 6, 5, 6, 8, 4, 5, 4, 9, 6, 4, 8, 9, 4, 6, 9, 4, 6, 5, 4, 7, 4, 5],
];
var freeReels = [
    // 23                             
    [
        [6, 4, 9, 6, 3, 8, 3, 3, 3, 3, 5, 7, 3, 8, 3, 3, 5, 7, 7, 7, 6, 4, 8, 9, 6, 7, 3, 3, 5, 5, 5, 6, 7, 3, 3, 8, 9, 7, 3, 6, 6, 6, 3, 5, 5, 6, 4, 3, 3, 7, 9, 9, 9, 6, 5, 3, 8, 3, 5, 8, 9, 8, 8, 8, 4, 3, 3, 9, 3, 8, 9, 3, 4, 4, 4, 7, 5, 3, 3, 7, 9, 3, 3, 4],
        [9, 8, 4, 6, 6, 6, 9, 3, 8, 6, 3, 3, 3, 5, 8, 3, 6, 9, 9, 9, 3, 7, 3, 4, 5, 7, 7, 7, 3, 3, 6, 7, 4, 4, 4, 3, 7, 3, 7, 8, 8, 8, 9, 9, 3, 4, 5, 5, 5, 5, 3, 3, 6, 4, 8],
        [3, 3, 5, 4, 3, 3, 4, 4, 4, 6, 9, 5, 6, 9, 3, 9, 5, 3, 3, 3, 3, 5, 3, 7, 3, 6, 3, 6, 6, 6, 7, 3, 3, 9, 9, 6, 8, 8, 9, 9, 9, 3, 8, 8, 3, 7, 9, 8, 9, 8, 8, 8, 5, 6, 7, 5, 3, 7, 4, 7, 7, 7, 5, 3, 8, 3, 6, 4, 3, 3, 5, 5, 5, 7, 3, 8, 6, 3, 7, 3, 3, 4],
        [9, 5, 5, 6, 6, 6, 6, 9, 4, 7, 8, 4, 5, 7, 7, 7, 8, 9, 4, 8, 3, 8, 8, 8, 6, 8, 7, 4, 6, 9, 9, 9, 9, 9, 8, 7, 9, 7, 5, 5, 5, 6, 5, 7, 5, 4, 9, 3, 3, 3, 8, 8, 5, 6, 4, 4, 4, 4, 8, 7, 3, 9, 7, 6, 7],
        [8, 6, 5, 7, 9, 7, 7, 7, 5, 9, 4, 7, 6, 6, 8, 8, 8, 8, 7, 9, 5, 7, 3, 6, 6, 6, 6, 9, 4, 7, 9, 3, 5, 5, 5, 5, 8, 6, 9, 4, 6, 8, 9, 9, 9, 4, 8, 8, 5, 7, 7, 4, 4, 4, 5, 9, 8, 6, 9, 6, 3, 3, 3, 4, 8, 8, 7, 9, 6, 5, 7],
    ],
    [
        [9, 7, 8, 8, 6, 6, 6, 7, 9, 7, 3, 5, 7, 7, 7, 7, 8, 8, 6, 3, 9, 8, 8, 8, 5, 9, 4, 7, 5, 9, 9, 9, 9, 7, 9, 9, 6, 5, 5, 5, 5, 4, 8, 5, 8, 9, 6, 3, 3, 3, 5, 4, 6, 4, 4, 4, 4, 4, 6, 4, 8, 8, 7, 6, 7],
        [5, 3, 3, 6, 6, 6, 7, 4, 8, 3, 6, 3, 3, 3, 3, 9, 8, 7, 9, 9, 9, 3, 3, 8, 3, 4, 7, 7, 7, 9, 9, 6, 8, 3, 4, 4, 4, 7, 7, 6, 3, 8, 8, 8, 9, 3, 4, 6, 4, 5, 5, 5, 3, 3, 5, 3, 3, 5],
        [4, 3, 3, 6, 5, 8, 4, 4, 4, 6, 3, 3, 7, 3, 7, 8, 9, 3, 3, 3, 7, 8, 3, 9, 8, 9, 4, 6, 6, 6, 3, 8, 3, 4, 8, 6, 6, 3, 9, 9, 9, 3, 7, 6, 3, 9, 5, 3, 9, 8, 8, 8, 8, 9, 3, 3, 5, 3, 4, 7, 7, 7, 3, 5, 5, 3, 7, 3, 3, 9, 5, 5, 5, 6, 7, 5, 3, 3, 5, 6, 3, 7],
        [5, 3, 7, 3, 3, 3, 3, 8, 7, 8, 3, 7, 7, 7, 4, 3, 3, 4, 5, 5, 5, 3, 3, 6, 9, 5, 6, 6, 6, 6, 5, 6, 8, 9, 9, 9, 3, 9, 5, 3, 3, 8, 8, 8, 9, 3, 9, 8, 4, 4, 4, 3, 4, 3, 6, 7, 7],
        [8, 8, 7, 7, 4, 7, 7, 7, 7, 5, 9, 6, 7, 5, 8, 7, 8, 8, 8, 8, 9, 6, 6, 9, 4, 9, 5, 6, 6, 6, 3, 9, 7, 8, 7, 6, 6, 8, 5, 5, 5, 9, 3, 6, 4, 4, 5, 8, 5, 9, 9, 9, 5, 7, 9, 8, 6, 3, 9, 4, 4, 4, 9, 7, 4, 8, 5, 6, 6, 7, 3, 3, 3, 6, 4, 8, 8, 9, 9, 6, 5, 7],
    ],
    [
        [5, 5, 4, 7, 7, 9, 9, 6, 6, 6, 4, 5, 8, 5, 4, 9, 7, 9, 7, 7, 7, 7, 9, 6, 6, 7, 8, 6, 4, 8, 8, 8, 5, 9, 8, 4, 8, 4, 8, 9, 8, 9, 9, 9, 6, 7, 7, 8, 4, 6, 9, 4, 5, 5, 5, 6, 3, 9, 5, 3, 6, 4, 8, 3, 3, 3, 7, 8, 6, 8, 5, 3, 5, 8, 4, 4, 4, 6, 7, 7, 9, 5, 9, 8, 7, 7, 9],
        [6, 7, 7, 7, 9, 3, 6, 8, 8, 8, 7, 9, 5, 6, 6, 6, 8, 7, 7, 5, 5, 5, 6, 8, 9, 9, 9, 8, 4, 4, 4, 4, 4, 5, 5, 7, 3, 3, 3, 6, 8, 9, 9],
        [7, 5, 7, 3, 8, 7, 3, 4, 4, 4, 8, 6, 5, 3, 3, 9, 6, 9, 9, 3, 3, 3, 6, 3, 3, 4, 4, 6, 3, 9, 9, 6, 6, 6, 3, 3, 8, 3, 8, 7, 4, 5, 8, 9, 9, 9, 5, 7, 9, 7, 3, 6, 3, 3, 8, 8, 8, 8, 3, 3, 5, 5, 3, 3, 6, 3, 7, 7, 7, 8, 6, 7, 4, 3, 3, 8, 7, 9, 5, 5, 5, 4, 3, 3, 6, 3, 9, 3, 3, 5, 5],
        [3, 8, 6, 3, 7, 5, 3, 3, 3, 7, 8, 3, 8, 3, 9, 5, 3, 7, 7, 7, 5, 7, 3, 3, 4, 8, 9, 6, 5, 5, 5, 9, 9, 3, 3, 8, 6, 7, 8, 6, 6, 6, 3, 4, 3, 3, 6, 3, 5, 3, 9, 9, 9, 5, 3, 3, 5, 7, 7, 3, 4, 8, 8, 8, 3, 8, 9, 4, 4, 3, 9, 3, 4, 4, 4, 7, 3, 3, 9, 6, 5, 3, 6, 6],
        [4, 6, 8, 3, 6, 6, 6, 4, 7, 3, 3, 7, 3, 3, 3, 3, 5, 3, 3, 4, 5, 7, 9, 9, 9, 6, 6, 3, 9, 4, 9, 7, 7, 7, 3, 5, 3, 6, 3, 4, 4, 4, 8, 3, 4, 9, 3, 3, 8, 8, 8, 8, 3, 6, 7, 3, 5, 5, 5, 5, 8, 9, 7, 8, 3, 3, 9],
    ],
    [
        [3, 6, 4, 9, 7, 4, 4, 4, 5, 5, 7, 4, 7, 9, 6, 7, 7, 7, 6, 4, 3, 4, 4, 8, 4, 5, 5, 5, 5, 8, 4, 8, 6, 9, 3, 6, 6, 6, 8, 4, 9, 4, 9, 4, 9, 9, 9, 5, 4, 4, 6, 7, 7, 4, 8, 8, 8, 5, 9, 4, 5, 6, 4, 4, 3, 3, 3, 7, 4, 4, 3, 8, 4, 4, 8],
        [6, 6, 6, 7, 4, 4, 4, 4, 9, 9, 9, 4, 7, 7, 7, 3, 3, 3, 3, 4, 8, 8, 8, 5, 5, 5, 5, 9, 8, 6],
        [4, 7, 3, 3, 3, 9, 8, 5, 4, 4, 4, 4, 5, 7, 6, 6, 6, 9, 3, 9, 9, 9, 9, 7, 8, 4, 8, 8, 8, 3, 4, 6, 7, 7, 7, 4, 4, 5, 5, 5, 5, 6, 4, 6, 8, 4],
        [8, 7, 3, 4, 6, 6, 6, 6, 6, 3, 6, 7, 9, 6, 8, 9, 7, 7, 7, 9, 6, 7, 9, 9, 5, 7, 8, 8, 8, 8, 3, 9, 7, 5, 8, 9, 9, 9, 9, 6, 7, 5, 6, 8, 8, 3, 5, 5, 5, 3, 9, 6, 3, 8, 3, 7, 4, 4, 4, 3, 7, 5, 5, 8, 4, 7, 3, 3, 3, 7, 8, 5, 9, 5, 9, 8, 5, 4],
        [5, 6, 8, 7, 7, 7, 6, 8, 6, 4, 7, 8, 8, 8, 9, 7, 9, 5, 5, 6, 6, 6, 8, 7, 3, 8, 7, 5, 5, 5, 6, 3, 3, 5, 9, 9, 9, 9, 7, 6, 5, 9, 9, 3, 3, 3, 8, 8, 6, 4, 8, 4, 4, 4, 9, 9, 7, 3, 6, 7],
    ],
    [
        [3, 5, 6, 6, 6, 5, 4, 3, 7, 7, 7, 7, 8, 8, 7, 8, 8, 8, 8, 9, 8, 9, 9, 9, 9, 9, 7, 7, 3, 5, 5, 5, 5, 3, 9, 4, 4, 4, 8, 6, 4, 9, 3, 3, 3, 6, 5, 6, 6, 7],
        [3, 4, 4, 6, 4, 7, 8, 4, 6, 6, 6, 8, 8, 4, 4, 5, 4, 4, 3, 4, 4, 4, 4, 8, 7, 6, 9, 8, 4, 9, 6, 5, 9, 9, 9, 6, 9, 6, 4, 4, 6, 5, 4, 4, 7, 7, 7, 8, 5, 7, 7, 4, 5, 7, 4, 3, 3, 3, 3, 9, 4, 9, 7, 4, 9, 9, 4, 3, 8, 8, 8, 3, 4, 6, 3, 3, 4, 6, 4, 8, 5, 5, 5, 4, 9, 3, 4, 5, 7, 7, 4, 8, 4, 4],
        [4, 3, 5, 9, 7, 4, 3, 3, 3, 4, 8, 6, 3, 4, 9, 4, 6, 4, 4, 4, 8, 4, 8, 6, 4, 9, 3, 4, 6, 6, 6, 8, 6, 4, 8, 9, 3, 5, 4, 9, 9, 9, 8, 7, 9, 6, 6, 4, 9, 8, 8, 8, 4, 7, 4, 7, 4, 5, 9, 4, 7, 7, 7, 5, 4, 4, 5, 4, 5, 4, 8, 5, 5, 5, 4, 3, 7, 7, 4, 7, 4, 6, 5],
        [5, 9, 8, 4, 3, 4, 8, 4, 4, 4, 4, 8, 6, 4, 9, 4, 9, 5, 7, 4, 7, 7, 7, 5, 7, 9, 5, 4, 6, 8, 8, 6, 5, 5, 5, 4, 4, 6, 4, 4, 5, 4, 9, 9, 6, 6, 6, 7, 4, 4, 3, 7, 6, 4, 4, 8, 9, 9, 9, 4, 3, 4, 4, 7, 3, 9, 4, 4, 8, 8, 8, 6, 5, 8, 5, 6, 4, 4, 6, 7, 3, 3, 3, 8, 5, 7, 4, 4, 3, 9, 4, 4, 7],
        [8, 3, 7, 8, 6, 8, 4, 7, 7, 7, 7, 3, 7, 5, 9, 7, 6, 9, 8, 8, 8, 8, 5, 9, 7, 7, 6, 9, 8, 6, 6, 6, 6, 9, 9, 7, 6, 8, 4, 8, 5, 5, 5, 5, 6, 5, 3, 5, 4, 5, 7, 5, 9, 9, 9, 6, 9, 9, 5, 3, 6, 3, 9, 3, 3, 3, 7, 5, 7, 7, 8, 8, 6, 3, 4, 4, 4, 6, 9, 6, 8, 9, 8, 9, 7, 8, 6],
    ],
    [
        [9, 6, 9, 6, 6, 6, 3, 5, 7, 8, 7, 7, 7, 7, 8, 7, 4, 8, 8, 8, 6, 8, 7, 3, 9, 9, 9, 8, 6, 9, 7, 5, 5, 5, 3, 8, 9, 8, 4, 4, 4, 6, 5, 9, 7, 3, 3, 3, 9, 5, 4, 3, 5],
        [6, 9, 5, 9, 8, 4, 7, 7, 7, 8, 7, 8, 3, 6, 3, 8, 6, 8, 8, 8, 7, 9, 3, 4, 8, 7, 5, 6, 6, 6, 8, 8, 6, 7, 5, 5, 8, 9, 5, 5, 5, 6, 9, 7, 8, 5, 9, 3, 7, 9, 9, 9, 6, 7, 6, 4, 7, 6, 5, 3, 3, 3, 9, 9, 5, 3, 7, 6, 7, 8, 4, 4, 4, 7, 9, 6, 9, 6, 9, 5, 3, 8],
        [3, 3, 3, 3, 5, 4, 4, 4, 4, 6, 4, 6, 6, 6, 8, 4, 8, 9, 9, 9, 4, 5, 8, 8, 8, 6, 9, 7, 7, 7, 4, 4, 5, 5, 5, 9, 7, 3, 7],
        [4, 8, 4, 4, 4, 4, 4, 3, 7, 6, 8, 7, 7, 7, 7, 5, 6, 4, 5, 5, 5, 8, 4, 8, 4, 4, 6, 6, 6, 6, 5, 6, 9, 9, 9, 9, 9, 4, 4, 9, 4, 8, 8, 8, 9, 5, 4, 4, 7, 3, 3, 3, 4, 3, 7, 4, 3, 5],
        [4, 4, 3, 9, 5, 6, 6, 6, 4, 9, 9, 4, 6, 4, 9, 4, 4, 4, 7, 4, 4, 3, 6, 8, 9, 9, 9, 3, 3, 7, 4, 3, 8, 8, 7, 7, 7, 7, 7, 4, 4, 6, 8, 3, 3, 3, 9, 4, 4, 5, 4, 8, 4, 8, 8, 8, 5, 7, 5, 9, 8, 4, 5, 5, 5, 6, 4, 6, 6, 7, 4, 4, 3],
    ],
    [
        [3, 5, 9, 8, 5, 6, 5, 5, 5, 5, 5, 8, 5, 6, 6, 7, 4, 5, 9, 7, 7, 7, 7, 3, 3, 5, 5, 6, 8, 9, 5, 3, 3, 3, 7, 5, 3, 5, 5, 9, 8, 8, 7, 6, 6, 6, 9, 8, 6, 5, 6, 5, 3, 9, 5, 9, 9, 9, 5, 7, 5, 5, 4, 3, 5, 5, 8, 8, 8, 8, 7, 6, 5, 9, 7, 5, 8, 5, 5, 4, 4, 4, 4, 3, 7, 5, 3, 9, 5, 4, 6, 4],
        [9, 5, 6, 6, 6, 5, 4, 5, 5, 5, 5, 6, 5, 7, 7, 9, 9, 9, 5, 4, 9, 7, 7, 7, 5, 9, 5, 4, 4, 4, 8, 6, 8, 5, 8, 8, 8, 4, 5, 5, 3, 3, 3, 7, 3, 6, 3, 8],
        [8, 5, 9, 4, 4, 4, 7, 7, 5, 5, 5, 5, 5, 3, 7, 3, 5, 5, 6, 6, 6, 9, 3, 5, 5, 9, 9, 9, 4, 5, 6, 5, 8, 8, 8, 5, 3, 5, 6, 4, 7, 7, 7, 6, 7, 8, 9, 3, 3, 3, 9, 4, 6, 8, 8, 5],
        [9, 8, 4, 6, 6, 6, 6, 8, 7, 4, 7, 9, 7, 7, 7, 3, 7, 4, 7, 7, 8, 8, 8, 6, 4, 9, 6, 8, 7, 9, 9, 9, 8, 6, 8, 3, 9, 5, 5, 5, 3, 5, 9, 6, 8, 4, 4, 4, 9, 9, 7, 8, 6, 3, 3, 3, 7, 5, 9, 4, 3, 4, 8],
        [6, 3, 8, 7, 5, 7, 7, 7, 3, 6, 8, 6, 7, 8, 3, 8, 8, 8, 9, 5, 9, 4, 6, 8, 8, 6, 6, 6, 4, 9, 4, 6, 6, 9, 7, 5, 5, 5, 4, 7, 7, 3, 9, 5, 8, 9, 9, 9, 7, 9, 9, 6, 7, 5, 9, 3, 3, 3, 8, 9, 6, 7, 6, 8, 4, 4, 4, 4, 8, 8, 6, 9, 5, 7, 7, 3],
    ],
    [
        [4, 8, 8, 6, 8, 8, 6, 6, 6, 7, 8, 6, 9, 9, 7, 7, 4, 7, 7, 7, 4, 8, 9, 7, 8, 5, 9, 8, 8, 8, 3, 9, 7, 4, 9, 7, 6, 7, 9, 9, 9, 5, 7, 4, 3, 9, 7, 6, 3, 3, 3, 6, 4, 4, 7, 8, 6, 6, 9, 5, 5, 5, 8, 4, 9, 9, 3, 7, 3, 4, 4, 4, 3, 8, 3, 8, 9, 3, 3, 6, 5],
        [6, 6, 6, 5, 5, 5, 5, 9, 9, 9, 9, 3, 6, 7, 7, 7, 8, 4, 4, 4, 5, 8, 8, 8, 4, 3, 3, 3, 5, 5, 7],
        [5, 7, 5, 3, 4, 4, 4, 5, 6, 5, 6, 3, 5, 5, 5, 5, 3, 5, 4, 8, 6, 6, 6, 9, 6, 8, 7, 7, 9, 9, 9, 9, 8, 5, 5, 4, 8, 8, 8, 8, 5, 9, 5, 5, 4, 7, 7, 7, 5, 6, 9, 6, 9, 3, 3, 3, 7, 5, 5, 8, 5, 5, 7],
        [5, 5, 5, 5, 9, 3, 7, 7, 7, 7, 5, 6, 6, 6, 5, 4, 9, 9, 9, 5, 9, 3, 3, 3, 5, 5, 8, 8, 8, 6, 7, 4, 4, 4, 6, 8, 8],
        [6, 7, 7, 7, 6, 7, 8, 8, 8, 8, 6, 6, 6, 6, 7, 4, 3, 3, 3, 4, 9, 9, 9, 9, 8, 9, 4, 4, 4, 5, 8, 5, 5, 5, 3, 3, 7, 9],
    ],
    [
        [8, 6, 6, 6, 7, 4, 8, 7, 7, 7, 9, 8, 5, 8, 8, 8, 6, 3, 5, 9, 9, 9, 9, 3, 3, 3, 3, 9, 8, 4, 5, 5, 5, 7, 6, 7, 4, 4, 4, 6, 4, 7, 9],
        [6, 9, 9, 7, 8, 3, 7, 7, 7, 4, 6, 6, 9, 3, 8, 5, 8, 8, 8, 8, 6, 8, 8, 7, 8, 6, 3, 8, 6, 6, 6, 3, 9, 7, 6, 9, 4, 8, 7, 9, 9, 9, 7, 6, 6, 7, 8, 7, 7, 6, 3, 3, 3, 7, 4, 7, 9, 3, 7, 5, 3, 4, 4, 4, 9, 6, 9, 4, 9, 9, 5, 4, 5, 5, 5, 7, 4, 9, 8, 8, 6, 8, 9, 6],
        [5, 7, 4, 4, 4, 4, 3, 6, 9, 4, 5, 5, 5, 5, 9, 5, 5, 3, 6, 6, 6, 3, 5, 5, 6, 6, 9, 9, 9, 9, 7, 8, 8, 8, 8, 8, 7, 9, 5, 5, 7, 7, 7, 7, 5, 4, 5, 5, 3, 3, 3, 8, 3, 5, 8, 6, 5],
        [4, 5, 5, 3, 7, 3, 5, 6, 3, 5, 5, 5, 5, 5, 8, 3, 5, 3, 8, 7, 5, 4, 7, 7, 7, 5, 8, 5, 5, 8, 5, 6, 3, 5, 5, 3, 3, 3, 6, 9, 8, 5, 7, 7, 5, 9, 3, 9, 6, 6, 6, 7, 6, 5, 5, 9, 5, 6, 6, 3, 5, 9, 9, 9, 6, 8, 4, 5, 9, 5, 5, 9, 5, 5, 8, 8, 8, 9, 5, 5, 8, 4, 7, 6, 5, 8, 5, 4, 4, 4, 7, 7, 8, 5, 4, 6, 9, 9, 7, 3, 5, 4],
        [5, 4, 9, 7, 6, 6, 6, 7, 5, 5, 4, 5, 5, 5, 5, 5, 6, 5, 9, 9, 8, 9, 9, 9, 5, 5, 3, 7, 4, 7, 7, 7, 5, 8, 3, 5, 6, 4, 4, 4, 8, 5, 6, 8, 7, 5, 8, 8, 8, 4, 5, 8, 9, 9, 3, 3, 3, 6, 7, 5, 3, 5, 4, 6],
    ],
    [
        [7, 8, 6, 6, 5, 6, 6, 6, 6, 7, 6, 5, 9, 4, 7, 7, 7, 7, 7, 8, 5, 5, 7, 5, 5, 5, 5, 6, 8, 6, 6, 9, 9, 3, 3, 3, 6, 4, 9, 9, 6, 9, 9, 9, 9, 6, 4, 6, 6, 8, 5, 4, 8, 8, 8, 7, 6, 3, 3, 6, 8, 4, 4, 4, 6, 3, 6, 6, 3, 6, 6, 8],
        [7, 3, 6, 5, 7, 4, 9, 3, 3, 3, 3, 5, 6, 4, 6, 8, 8, 4, 8, 4, 6, 6, 6, 6, 6, 9, 9, 3, 5, 8, 6, 5, 6, 9, 9, 9, 6, 8, 6, 6, 7, 6, 7, 3, 4, 6, 7, 7, 7, 3, 7, 6, 4, 6, 6, 4, 8, 9, 4, 4, 4, 6, 6, 9, 6, 5, 6, 3, 6, 6, 4, 8, 8, 8, 6, 9, 8, 9, 6, 6, 8, 8, 5, 5, 5, 5, 9, 6, 6, 7, 9, 7, 6, 6, 7, 4, 7],
        [6, 8, 9, 5, 6, 4, 4, 4, 5, 5, 6, 4, 8, 7, 8, 6, 6, 6, 3, 6, 7, 6, 3, 9, 3, 3, 3, 6, 4, 6, 4, 6, 6, 9, 9, 9, 9, 5, 6, 6, 5, 6, 7, 8, 8, 8, 7, 6, 7, 9, 7, 6, 9, 7, 7, 7, 6, 3, 6, 8, 6, 8, 5, 5, 5, 5, 6, 6, 8, 4, 6, 3, 9],
        [9, 3, 3, 3, 3, 7, 9, 7, 7, 7, 4, 7, 6, 8, 8, 8, 9, 4, 8, 9, 9, 9, 5, 9, 5, 5, 5, 7, 7, 8, 6, 6, 6, 8, 3, 5, 4, 4, 4, 4, 3, 5, 8],
        [7, 6, 9, 7, 7, 7, 9, 7, 9, 7, 8, 8, 8, 5, 8, 6, 7, 3, 3, 3, 9, 8, 4, 8, 6, 6, 6, 6, 4, 8, 8, 9, 9, 9, 3, 4, 3, 5, 5, 5, 5, 5, 3, 3, 5, 4, 4, 4, 7, 9, 8, 7, 9],
    ],
    [
        [7, 7, 6, 3, 3, 3, 8, 9, 7, 5, 7, 7, 7, 8, 4, 9, 7, 8, 8, 8, 7, 9, 4, 7, 9, 9, 9, 3, 4, 8, 5, 5, 5, 5, 9, 6, 9, 9, 6, 6, 6, 4, 5, 5, 3, 4, 4, 4, 3, 8, 3, 8, 8],
        [9, 6, 3, 3, 3, 3, 6, 8, 6, 6, 6, 9, 5, 7, 9, 9, 9, 8, 6, 6, 7, 7, 7, 8, 3, 6, 4, 4, 4, 9, 5, 6, 8, 8, 8, 7, 6, 4, 5, 5, 5, 4, 6, 7, 4, 6],
        [7, 9, 6, 6, 4, 4, 4, 8, 7, 6, 6, 5, 8, 6, 6, 6, 6, 6, 3, 3, 6, 8, 8, 8, 9, 5, 5, 6, 9, 8, 9, 9, 9, 6, 5, 4, 6, 8, 6, 3, 3, 3, 6, 4, 6, 6, 7, 7, 7, 7, 9, 4, 6, 8, 3, 6, 5, 5, 5, 3, 4, 9, 5, 7, 6, 7],
        [8, 4, 8, 9, 6, 6, 6, 6, 8, 6, 6, 9, 6, 7, 7, 7, 7, 7, 6, 6, 7, 6, 6, 4, 5, 5, 5, 9, 5, 6, 6, 5, 6, 9, 9, 9, 6, 8, 6, 5, 9, 6, 8, 8, 8, 9, 6, 5, 6, 3, 8, 3, 4, 4, 4, 5, 6, 4, 5, 4, 7, 3, 3, 3, 9, 8, 3, 7, 3, 6, 7, 6],
        [9, 7, 7, 7, 7, 9, 3, 8, 8, 8, 8, 3, 5, 5, 5, 4, 5, 8, 9, 9, 9, 7, 5, 8, 3, 3, 3, 7, 7, 4, 4, 4, 5, 8, 3, 6, 6, 6, 4, 9, 9, 6],
    ],
    [
        [3, 3, 3, 6, 7, 7, 7, 7, 7, 8, 8, 8, 4, 4, 6, 6, 6, 9, 9, 9, 9, 9, 5, 5, 5, 5, 5, 4, 4, 4, 8, 8, 3],
        [9, 4, 4, 3, 6, 5, 7, 7, 7, 7, 8, 5, 9, 5, 3, 9, 7, 8, 8, 8, 5, 7, 8, 8, 9, 3, 8, 8, 3, 3, 3, 7, 8, 7, 8, 8, 3, 6, 3, 5, 5, 5, 7, 5, 3, 7, 9, 9, 6, 4, 9, 9, 9, 5, 9, 8, 4, 5, 7, 9, 8, 4, 4, 4, 4, 3, 7, 4, 8, 3, 7, 9, 6, 6, 6, 3, 7, 9, 8, 9, 7, 5, 9, 5],
        [9, 6, 9, 7, 5, 6, 6, 4, 4, 4, 8, 6, 6, 4, 6, 4, 7, 6, 9, 6, 6, 6, 6, 8, 6, 5, 7, 4, 7, 6, 3, 3, 3, 6, 7, 8, 6, 6, 9, 6, 3, 7, 9, 9, 9, 6, 7, 9, 8, 3, 9, 4, 6, 8, 8, 8, 3, 6, 3, 5, 6, 8, 8, 6, 4, 7, 7, 7, 5, 6, 5, 9, 7, 9, 8, 6, 5, 5, 5, 5, 6, 5, 3, 6, 8, 6, 6, 5, 6],
        [5, 6, 6, 6, 7, 3, 7, 7, 7, 5, 7, 5, 5, 5, 9, 6, 6, 3, 3, 3, 4, 9, 9, 9, 9, 6, 6, 8, 8, 8, 4, 6, 4, 4, 4, 6, 3, 8, 8],
        [3, 3, 3, 6, 6, 6, 6, 5, 9, 9, 9, 8, 7, 7, 7, 4, 4, 4, 4, 3, 8, 8, 8, 9, 5, 5, 5, 6, 6, 7],
    ],
    [
        [4, 3, 8, 7, 5, 7, 3, 6, 7, 7, 7, 7, 5, 7, 8, 5, 5, 9, 3, 7, 7, 3, 3, 3, 9, 7, 9, 7, 9, 7, 7, 3, 7, 4, 5, 5, 5, 6, 8, 7, 7, 8, 6, 7, 7, 4, 9, 6, 6, 6, 6, 8, 8, 9, 6, 5, 6, 5, 7, 9, 9, 9, 3, 7, 4, 6, 4, 7, 8, 5, 7, 8, 8, 8, 8, 9, 7, 5, 7, 4, 7, 3, 7, 7, 9, 4, 4, 4, 7, 8, 7, 9, 7, 5, 6, 7, 6, 7, 7],
        [6, 7, 6, 6, 6, 9, 9, 3, 7, 7, 7, 7, 3, 7, 9, 9, 9, 7, 4, 7, 3, 3, 3, 5, 7, 6, 4, 4, 4, 9, 4, 6, 8, 8, 8, 7, 8, 8, 5, 5, 5, 4, 5, 7, 8],
        [4, 5, 6, 8, 7, 7, 5, 6, 4, 4, 4, 7, 6, 7, 8, 7, 8, 7, 7, 5, 4, 7, 7, 7, 7, 6, 5, 7, 4, 8, 7, 7, 4, 6, 6, 6, 4, 7, 5, 9, 7, 3, 9, 7, 9, 3, 9, 9, 9, 9, 8, 6, 7, 4, 5, 7, 7, 3, 9, 8, 8, 8, 9, 7, 7, 6, 7, 6, 7, 8, 3, 3, 3, 3, 7, 3, 5, 9, 8, 6, 8, 7, 5, 9, 5, 5, 5, 7, 7, 3, 7, 7, 6, 9, 8, 7, 7, 5],
        [5, 4, 8, 4, 6, 6, 6, 6, 8, 7, 7, 3, 3, 6, 3, 3, 3, 8, 4, 4, 9, 3, 3, 8, 8, 8, 8, 6, 7, 4, 8, 6, 8, 9, 9, 9, 5, 3, 6, 9, 8, 9, 5, 5, 5, 9, 4, 6, 9, 9, 5, 3, 7, 7, 7, 5, 9, 7, 8, 3, 9, 4, 4, 4, 5, 9, 8, 5, 7, 5, 6, 4],
        [6, 5, 5, 9, 4, 8, 3, 3, 3, 5, 7, 4, 6, 8, 4, 9, 8, 8, 8, 9, 6, 8, 7, 3, 7, 7, 6, 6, 6, 6, 8, 4, 6, 9, 4, 9, 5, 5, 5, 6, 7, 3, 6, 9, 8, 8, 9, 9, 9, 5, 9, 9, 8, 8, 5, 8, 7, 7, 7, 5, 8, 6, 3, 9, 3, 3, 4, 4, 4, 5, 5, 9, 6, 3, 6, 3, 3],
    ],
    [
        [8, 6, 4, 3, 7, 8, 6, 6, 6, 5, 8, 7, 8, 3, 9, 8, 9, 3, 3, 3, 9, 4, 3, 7, 4, 5, 8, 8, 8, 8, 9, 8, 9, 4, 3, 9, 4, 6, 9, 9, 9, 4, 3, 5, 3, 5, 3, 8, 5, 5, 5, 6, 9, 7, 5, 6, 9, 8, 6, 7, 7, 7, 6, 5, 7, 9, 6, 9, 9, 4, 4, 4, 4, 7, 4, 6, 5, 8, 5, 8, 3],
        [7, 5, 4, 9, 7, 6, 6, 6, 6, 4, 9, 7, 9, 3, 7, 8, 7, 7, 7, 5, 6, 8, 7, 7, 4, 7, 9, 9, 9, 7, 6, 7, 4, 8, 7, 9, 3, 3, 3, 4, 5, 8, 8, 4, 7, 7, 4, 4, 4, 6, 6, 5, 6, 7, 7, 3, 8, 8, 8, 3, 7, 7, 8, 3, 7, 7, 5, 5, 5, 9, 7, 6, 4, 7, 9, 9, 7, 8],
        [7, 5, 6, 4, 4, 4, 8, 7, 7, 9, 7, 7, 7, 9, 8, 7, 7, 9, 6, 6, 6, 6, 3, 5, 7, 9, 9, 9, 3, 7, 6, 7, 8, 8, 8, 7, 4, 4, 9, 5, 3, 3, 3, 8, 3, 8, 7, 5, 5, 5, 7, 4, 7, 5, 7, 6],
        [9, 7, 5, 9, 7, 5, 7, 7, 7, 5, 7, 3, 3, 6, 7, 8, 7, 3, 3, 3, 4, 7, 6, 4, 9, 8, 9, 5, 5, 5, 7, 5, 4, 7, 9, 9, 7, 5, 6, 6, 6, 7, 7, 9, 7, 6, 3, 4, 7, 9, 9, 9, 7, 5, 8, 7, 3, 6, 7, 8, 8, 8, 7, 8, 5, 7, 7, 8, 7, 6, 4, 4, 4, 7, 4, 6, 8, 7, 6, 3, 7, 8],
        [9, 3, 3, 3, 5, 6, 6, 8, 8, 8, 4, 8, 7, 6, 6, 6, 9, 4, 6, 5, 5, 5, 6, 7, 7, 7, 7, 8, 8, 5, 9, 9, 9, 3, 5, 8, 4, 4, 4, 9, 3, 3, 9],
    ],
    [
        [6, 8, 5, 7, 5, 3, 6, 6, 6, 8, 4, 8, 4, 9, 9, 3, 4, 3, 3, 3, 9, 6, 4, 6, 9, 9, 8, 8, 8, 8, 5, 5, 7, 9, 6, 6, 7, 9, 9, 9, 9, 5, 4, 4, 9, 9, 8, 5, 5, 5, 5, 9, 3, 9, 8, 7, 7, 8, 7, 7, 7, 7, 6, 3, 8, 5, 3, 5, 6, 4, 4, 4, 3, 4, 8, 4, 6, 8, 8, 3, 3],
        [6, 3, 3, 3, 5, 4, 8, 8, 8, 8, 8, 6, 6, 6, 5, 6, 5, 5, 5, 4, 8, 9, 9, 9, 3, 6, 7, 7, 7, 7, 9, 4, 4, 4, 9, 3, 9, 7],
        [7, 7, 5, 9, 4, 4, 4, 7, 8, 7, 9, 4, 7, 7, 7, 3, 7, 9, 5, 8, 6, 6, 6, 7, 9, 5, 7, 4, 6, 9, 9, 9, 5, 4, 3, 5, 7, 8, 8, 8, 8, 7, 7, 8, 7, 3, 3, 3, 7, 6, 8, 7, 3, 5, 5, 5, 6, 7, 9, 7, 7, 6, 6],
        [5, 8, 6, 7, 7, 7, 7, 7, 4, 7, 3, 3, 3, 7, 9, 3, 4, 9, 5, 5, 5, 3, 6, 7, 9, 6, 6, 6, 5, 7, 7, 6, 9, 9, 9, 8, 7, 7, 4, 6, 8, 8, 8, 7, 3, 7, 9, 4, 4, 4, 8, 7, 5, 8, 5, 7],
        [7, 6, 6, 6, 9, 8, 7, 7, 7, 7, 3, 6, 9, 9, 9, 9, 6, 3, 3, 3, 7, 5, 4, 4, 4, 7, 7, 4, 8, 8, 8, 8, 7, 5, 5, 5, 3, 5, 4, 7],
    ],
    [
        [6, 3, 8, 8, 8, 8, 8, 7, 8, 7, 5, 3, 7, 7, 7, 8, 5, 8, 6, 5, 5, 5, 5, 8, 6, 8, 6, 8, 8, 6, 6, 6, 4, 8, 4, 8, 9, 9, 9, 9, 8, 6, 8, 9, 3, 3, 3, 3, 8, 9, 5, 4, 7, 4, 4, 4, 9, 7, 9, 7, 5, 8, 8],
        [4, 6, 6, 6, 8, 4, 8, 8, 8, 8, 5, 9, 9, 9, 6, 8, 7, 7, 7, 7, 7, 4, 4, 4, 3, 8, 5, 5, 5, 8, 9, 3, 3, 3, 6, 9, 8],
        [9, 8, 6, 8, 7, 7, 6, 8, 4, 4, 4, 4, 5, 7, 6, 5, 6, 8, 7, 5, 4, 8, 8, 8, 6, 8, 8, 4, 8, 8, 4, 7, 5, 6, 6, 6, 8, 8, 9, 5, 8, 9, 8, 8, 3, 8, 9, 9, 9, 8, 5, 8, 5, 9, 6, 3, 8, 3, 8, 3, 3, 3, 8, 6, 8, 4, 7, 8, 9, 8, 6, 7, 7, 7, 8, 8, 9, 7, 7, 5, 9, 8, 6, 8, 5, 5, 5, 3, 9, 3, 9, 8, 4, 8, 3, 5, 7, 8],
        [9, 6, 6, 6, 7, 3, 5, 7, 7, 7, 3, 9, 9, 3, 3, 3, 7, 4, 5, 9, 9, 9, 5, 4, 5, 5, 5, 6, 7, 9, 8, 8, 8, 8, 4, 6, 4, 4, 4, 6, 7, 3, 8],
        [3, 6, 8, 6, 4, 7, 7, 7, 3, 9, 6, 4, 5, 3, 3, 3, 3, 9, 3, 7, 5, 9, 8, 8, 6, 6, 6, 6, 6, 4, 4, 9, 4, 5, 5, 5, 7, 8, 3, 7, 5, 7, 9, 9, 9, 5, 8, 7, 9, 9, 6, 5, 8, 8, 8, 7, 3, 5, 5, 9, 6, 4, 4, 4, 7, 3, 9, 6, 9, 7, 6, 7],
    ],
    [
        [5, 9, 6, 7, 6, 6, 6, 6, 9, 7, 4, 5, 9, 7, 7, 7, 7, 8, 9, 5, 4, 6, 6, 5, 3, 3, 3, 8, 9, 3, 7, 3, 5, 9, 9, 9, 8, 7, 6, 7, 9, 4, 5, 5, 5, 5, 4, 3, 8, 3, 4, 7, 8, 8, 8, 3, 5, 9, 6, 4, 4, 4, 4, 4, 8, 9, 3, 6, 7, 3, 7, 9],
        [8, 4, 6, 7, 6, 8, 6, 6, 6, 8, 9, 9, 3, 3, 9, 5, 5, 8, 8, 8, 7, 8, 5, 7, 8, 6, 8, 8, 9, 9, 9, 4, 7, 8, 8, 4, 4, 7, 9, 7, 7, 7, 8, 8, 9, 8, 8, 9, 4, 4, 4, 4, 5, 8, 8, 3, 8, 8, 6, 8, 5, 5, 5, 8, 6, 3, 8, 9, 6, 7, 8, 3, 3, 3, 4, 3, 4, 8, 8, 6, 5, 7, 8],
        [9, 5, 4, 4, 4, 6, 8, 8, 4, 8, 8, 8, 3, 7, 8, 8, 6, 6, 6, 3, 7, 9, 9, 9, 9, 9, 8, 5, 8, 6, 3, 3, 3, 5, 7, 9, 8, 7, 7, 7, 4, 7, 8, 6, 5, 5, 5, 8, 5, 8, 6, 8],
        [7, 8, 6, 5, 8, 3, 8, 8, 8, 7, 8, 7, 8, 8, 7, 8, 4, 7, 7, 7, 3, 8, 6, 3, 8, 4, 8, 4, 5, 5, 5, 4, 8, 9, 6, 8, 8, 5, 6, 6, 6, 6, 8, 8, 6, 7, 5, 9, 8, 9, 9, 9, 9, 8, 4, 7, 5, 8, 8, 6, 3, 3, 3, 8, 7, 9, 8, 8, 9, 5, 8, 4, 4, 4, 9, 9, 5, 5, 8, 8, 3, 3, 6],
        [4, 6, 7, 7, 7, 9, 3, 6, 9, 8, 8, 8, 6, 5, 4, 6, 6, 6, 5, 9, 7, 3, 5, 5, 5, 9, 5, 6, 7, 9, 9, 9, 3, 7, 7, 3, 3, 3, 8, 9, 8, 5, 4, 4, 4, 4, 3, 8, 7, 6],
    ],
    [
        [7, 6, 6, 6, 7, 9, 4, 7, 7, 7, 8, 5, 5, 3, 3, 3, 4, 9, 3, 9, 9, 9, 5, 6, 5, 5, 5, 7, 3, 9, 8, 8, 8, 6, 3, 9, 4, 4, 4, 7, 6, 8, 4],
        [8, 7, 7, 7, 5, 6, 8, 3, 3, 3, 7, 4, 5, 6, 6, 6, 9, 9, 5, 5, 5, 5, 6, 7, 9, 9, 9, 6, 3, 7, 8, 8, 8, 9, 4, 3, 4, 4, 4, 9, 7, 3, 6],
        [5, 3, 3, 9, 4, 4, 4, 7, 6, 6, 8, 6, 8, 8, 8, 8, 5, 5, 9, 8, 6, 6, 6, 7, 8, 9, 9, 8, 9, 9, 9, 9, 8, 3, 8, 8, 7, 3, 3, 3, 8, 8, 5, 7, 8, 7, 7, 7, 4, 7, 8, 5, 8, 5, 5, 5, 8, 6, 4, 8, 4, 8, 6],
        [9, 5, 8, 6, 3, 8, 8, 8, 7, 8, 8, 9, 8, 7, 7, 7, 7, 7, 4, 8, 5, 8, 4, 5, 5, 5, 5, 3, 5, 9, 8, 8, 9, 6, 6, 6, 6, 8, 8, 4, 7, 8, 9, 9, 9, 4, 8, 6, 3, 8, 6, 6, 4, 4, 4, 8, 3, 5, 7, 8, 9, 3, 3, 3, 7, 8, 6, 8, 8, 9, 5, 8],
        [8, 9, 6, 6, 6, 8, 6, 7, 8, 8, 8, 9, 4, 8, 9, 9, 9, 6, 8, 8, 7, 7, 7, 4, 7, 8, 4, 4, 4, 3, 9, 7, 5, 5, 5, 3, 8, 5, 3, 3, 3, 5, 8, 6, 4],
    ],
    [
        [9, 9, 9, 9, 9, 8, 7, 7, 7, 9, 7, 5, 5, 5, 9, 9, 6, 6, 6, 5, 9, 3, 3, 3, 5, 4, 8, 8, 8, 7, 3, 4, 4, 4, 6, 8, 6],
        [8, 8, 7, 9, 9, 6, 6, 6, 6, 9, 9, 3, 9, 9, 5, 9, 9, 9, 9, 8, 7, 6, 9, 9, 8, 5, 3, 3, 3, 9, 6, 4, 4, 8, 7, 9, 7, 7, 7, 8, 9, 9, 6, 8, 6, 9, 4, 4, 4, 9, 4, 3, 4, 3, 6, 5, 8, 8, 8, 7, 3, 4, 7, 9, 7, 4, 5, 5, 5, 9, 9, 4, 9, 7, 5, 6, 9, 9],
        [3, 3, 4, 6, 4, 4, 4, 5, 3, 9, 4, 9, 7, 9, 9, 9, 9, 4, 5, 7, 8, 6, 6, 6, 8, 9, 9, 8, 5, 9, 8, 8, 8, 5, 7, 9, 9, 6, 8, 7, 7, 7, 6, 9, 9, 6, 9, 3, 3, 3, 7, 9, 5, 3, 9, 8, 5, 5, 5, 9, 4, 9, 7, 9, 9, 6],
        [6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 7, 4, 5, 5, 5, 4, 5, 9, 9, 9, 5, 3, 3, 3, 9, 8, 4, 4, 4, 8, 3, 3],
        [6, 5, 6, 8, 9, 7, 7, 7, 9, 8, 6, 7, 6, 3, 8, 8, 8, 8, 3, 8, 7, 3, 8, 6, 6, 6, 5, 7, 6, 7, 8, 4, 5, 5, 5, 8, 6, 7, 3, 5, 3, 9, 9, 9, 7, 4, 5, 6, 9, 7, 3, 3, 3, 9, 4, 6, 4, 7, 8, 4, 4, 4, 6, 5, 4, 8, 9, 5, 3, 7],
    ],
    [
        [9, 4, 6, 6, 6, 6, 9, 3, 8, 4, 7, 7, 7, 4, 5, 7, 5, 6, 8, 8, 8, 5, 7, 9, 3, 5, 5, 5, 8, 6, 5, 8, 9, 9, 9, 5, 3, 4, 7, 7, 3, 3, 3, 3, 4, 8, 8, 4, 4, 4, 3, 6, 6, 7, 7, 8],
        [6, 6, 6, 9, 8, 9, 9, 9, 7, 4, 7, 7, 7, 9, 3, 4, 4, 4, 5, 4, 8, 8, 8, 6, 9, 3, 3, 3, 9, 7, 5, 5, 5, 8, 9, 6],
        [4, 4, 4, 9, 9, 9, 9, 9, 7, 8, 6, 6, 6, 6, 4, 8, 8, 8, 5, 9, 7, 7, 7, 6, 5, 3, 3, 3, 9, 7, 5, 5, 5, 3, 9, 8],
        [3, 8, 9, 9, 9, 9, 5, 4, 7, 7, 7, 6, 6, 9, 5, 5, 5, 8, 7, 9, 6, 6, 6, 7, 9, 9, 3, 3, 3, 6, 9, 9, 8, 8, 8, 8, 5, 3, 4, 4, 4, 5, 9, 4, 7, 9],
        [9, 6, 5, 8, 3, 7, 7, 7, 6, 3, 6, 4, 3, 7, 8, 8, 8, 3, 7, 9, 8, 5, 3, 5, 6, 6, 6, 5, 7, 9, 6, 8, 5, 5, 5, 5, 3, 4, 8, 7, 7, 4, 3, 3, 3, 3, 4, 6, 8, 6, 4, 7, 9, 9, 9, 8, 9, 7, 6, 8, 8, 4, 4, 4, 5, 6, 8, 7, 6, 5, 9, 7],
    ],
    [
        [4, 3, 4, 6, 6, 6, 7, 5, 6, 9, 5, 7, 7, 7, 9, 4, 7, 5, 8, 8, 8, 8, 3, 3, 4, 5, 4, 5, 5, 5, 8, 7, 7, 6, 9, 9, 9, 8, 7, 6, 6, 5, 3, 3, 3, 8, 3, 8, 6, 9, 4, 4, 4, 3, 8, 9, 7, 7, 8],
        [4, 7, 6, 7, 7, 7, 8, 6, 4, 8, 5, 4, 4, 4, 4, 8, 7, 6, 8, 8, 8, 8, 7, 7, 5, 3, 3, 6, 6, 6, 8, 5, 9, 3, 5, 5, 5, 3, 5, 6, 6, 7, 3, 3, 3, 8, 7, 6, 4, 3, 9, 9, 9, 5, 4, 9, 6, 8, 7],
        [9, 9, 4, 4, 4, 6, 9, 9, 9, 9, 9, 7, 8, 8, 6, 6, 6, 9, 3, 7, 9, 8, 8, 8, 7, 9, 8, 7, 7, 7, 9, 5, 4, 3, 3, 3, 9, 5, 3, 5, 5, 5, 6, 4, 9, 6, 5],
        [9, 5, 3, 6, 5, 9, 9, 9, 9, 8, 3, 7, 6, 9, 7, 7, 7, 9, 8, 5, 6, 7, 6, 9, 5, 5, 5, 6, 9, 4, 7, 4, 3, 6, 6, 6, 9, 7, 9, 7, 8, 6, 3, 3, 3, 9, 8, 9, 9, 5, 9, 3, 8, 8, 8, 9, 9, 8, 5, 9, 8, 4, 4, 4, 9, 7, 5, 9, 4, 9, 4, 9],
        [6, 9, 4, 9, 6, 6, 6, 3, 6, 6, 8, 7, 9, 9, 9, 6, 5, 4, 9, 6, 7, 7, 7, 4, 9, 7, 8, 8, 9, 4, 4, 4, 9, 5, 7, 3, 9, 8, 8, 8, 9, 4, 9, 9, 5, 3, 3, 3, 9, 8, 9, 9, 8, 5, 5, 5, 7, 9, 7, 9, 4, 9, 3],
    ],
    [
        [4, 6, 4, 3, 3, 5, 5, 5, 9, 6, 8, 9, 9, 3, 9, 9, 9, 9, 4, 9, 8, 6, 8, 7, 8, 4, 4, 4, 4, 9, 8, 4, 8, 8, 6, 8, 8, 8, 4, 8, 5, 7, 6, 9, 9, 3, 3, 3, 8, 4, 3, 8, 3, 8, 3, 7, 7, 7, 9, 6, 9, 4, 9, 9, 8, 6, 6, 6, 8, 5, 6, 9, 4, 9, 4, 9],
        [7, 7, 5, 7, 9, 9, 9, 6, 6, 7, 8, 6, 4, 6, 6, 6, 8, 7, 5, 6, 6, 5, 5, 5, 5, 6, 5, 8, 3, 8, 7, 7, 7, 6, 8, 4, 5, 7, 9, 4, 4, 4, 8, 7, 5, 3, 7, 8, 8, 8, 6, 8, 3, 8, 7, 8, 3, 3, 3, 5, 3, 9, 5, 3, 3, 6],
        [5, 9, 7, 9, 9, 9, 9, 8, 9, 3, 7, 4, 7, 7, 7, 7, 9, 4, 9, 4, 9, 3, 3, 3, 9, 7, 9, 4, 5, 5, 5, 5, 4, 7, 7, 9, 7, 4, 4, 4, 9, 9, 7, 7, 5, 5, 6, 6, 6, 6, 5, 3, 5, 5, 8, 8, 8, 7, 6, 4, 9, 7, 8, 9],
        [6, 6, 6, 7, 8, 8, 8, 8, 9, 4, 4, 4, 8, 9, 9, 9, 9, 6, 3, 3, 3, 4, 3, 7, 7, 7, 8, 5, 5, 5, 9, 6, 5],
        [8, 7, 7, 7, 3, 5, 6, 6, 6, 3, 6, 5, 5, 5, 6, 3, 3, 3, 3, 8, 7, 9, 9, 9, 5, 4, 8, 8, 8, 6, 5, 4, 4, 4, 7, 9, 8, 7],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 9, 6, 5, 3, 2, 1],
    [0, 0, 0, 40, 30, 20, 15, 8, 5, 3],
    [0, 0, 0, 120, 100, 70, 50, 25, 15, 10],
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [5, 1, 2, 3, 9], // 6
    [5, 11, 12, 13, 9], // 7
    [0, 1, 7, 13, 14], // 8
    [10, 11, 7, 3, 4], // 9
    [5, 11, 7, 3, 9], // 10
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevNudgeStatus = this.nudgeStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.nudgeStatus == "NUDGE") {
        this.Nudging(player);
        return;
    }

    var viewCache = player.viewCache;

    var cache;
    if (viewCache.type == "BASE") {
        this.nudgeCacheList = viewCache.view;
        cache = this.nudgeCacheList[0];
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.nudgeCacheList = this.freeSpinCacheList[0];
        cache = this.nudgeCacheList[0];
    }

    this.view = cache.view;
    this.virtualReels = cache.virtualReels;
    this.scatterCnt = cache.scatterCnt;
    this.scatterPositions = cache.scatterPositions;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.fsMulti = 0;

    //                    
    if (this.winMoney > 0) {
        this.nudgeIndex = 1;
        this.nudgeStatus = "NUDGE";
        this.nudge_res = this.winMoney;
        this.nudge_win = 0;
        var temp = getPrevWinReelIndexAndCount(this.winLines);
        this.prevWinReelStartIndex = temp.start;
        this.prevWinReelEndIndex = temp.end;
    }

    if (this.scatterCnt >= 3) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinCount;
        this.currentGame = "FREE";
        this.freeSpinWinMoney = this.winMoney;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.nudgeStatus == "NUDGE") {
        this.Nudging(player, true);
        //              
        if (this.nudgeStatus == "NONUDGE") {
            this.freeSpinWinMoney += this.nudge_res;
            // console.log("Total1: " + this.freeSpinWinMoney);
            if (this.freeSpinIndex > this.freeSpinLength) {
                // console.log("Total2: " + this.freeSpinWinMoney);
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.nudgeCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    var cache = this.nudgeCacheList[0];
    this.view = cache.view;
    this.virtualReels = cache.virtualReels;
    this.scatterPositions = cache.scatterPositions;
    this.scatterCnt = cache.scatterCnt;

    this.fsMulti++;
    this.winMoney = WinFromView(this.view, player.betPerLine) * this.fsMulti;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    if (this.winMoney > 0) {
        this.nudgeIndex = 1;
        this.nudgeStatus = "NUDGE";
        this.nudge_res = this.winMoney;
        this.nudge_win = 0;
        var temp = getPrevWinReelIndexAndCount(this.winLines);
        this.prevWinReelStartIndex = temp.start;
        this.prevWinReelEndIndex = temp.end;
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.Nudging = function (player, isFreeSpin = false) {
    var cache = this.nudgeCacheList[this.nudgeIndex];
    this.view = cache.view;
    this.nudge = GetNudgeStr(this.view, this.prevWinReelStartIndex, this.prevWinReelEndIndex);
    this.scatterPositions = cache.scatterPositions;
    this.scatterCnt = cache.scatterCnt;
    this.virtualReels = cache.virtualReels;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.nudgeIndex++;

    if (isFreeSpin) {
        this.fsMulti++;
        this.winMoney *= this.fsMulti;
    }

    this.nudge_win += this.winMoney;
    this.nudge_res += this.winMoney;

    if (this.winMoney == 0) {
        this.nudgeStatus = "NONUDGE";
        if (this.scatterCnt >= 3) {
            this.freeSpinIndex = 1;
            this.freeSpinLength = freeSpinCount;
            this.currentGame = "FREE";
            this.freeSpinWinMoney = this.nudge_res;
        }
    }

    var temp = getPrevWinReelIndexAndCount(this.winLines);
    this.prevWinReelStartIndex = temp.start;
    this.prevWinReelEndIndex = temp.end;
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpResult;

    if (baseWin > 0) {
        tmpResult = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpResult = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: tmpResult.nudgeCacheList,
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
            break;
        case "BONUS":
            // return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default:
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterCache;
    if (Util.probability(50)) {
        scatterCache = RandomScatterView(baseReels, bpl);
    } else {
        scatterCache = RandomScatterNudgeView(baseReels, bpl);
    }

    var fsCount = freeSpinCount;
    var fsCache = RandomFreeViewCache(freeReels[Util.random(0, freeReels.length)], bpl, fsWin, fsCount);
    freeSpinCacheList.push(scatterCache.cache);
    // console.log("First: " + scatterCache.win);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterCache.win,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinCacheList = [];

    var scatterCache;
    if (Util.probability(50)) {
        scatterCache = RandomScatterView(baseReels, bpl);
    } else {
        scatterCache = RandomScatterNudgeView(baseReels, bpl);
    }

    var fsCount = freeSpinCount;
    var fsCache = BuyBonusViewCache(freeReels[Util.random(0, freeReels.length)], bpl, fsCount);
    freeSpinCacheList.push(scatterCache.cache);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + scatterCache.win,
        type: "FREE",
        isCall: 0,
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0,
        calcCount = 0;
    while (true) {
        var view = RandomView(reels);
        var scatterPositions = RandomScatterPositions();
        var nudgeWinMoney = WinFromView(view, bpl);
        if (isFreeSpinWin(scatterPositions) || nudgeWinMoney == 0) {
            continue;
        }
        var winLines = WinLinesFromView(view, bpl);
        var virtualReels = {
            above: RandomLineFromReels(baseReels),
            below: RandomLineFromReels(baseReels),
        };
        var cache = {
            view: view,
            virtualReels: virtualReels,
            scatterPositions: scatterPositions,
            scatterCnt: scatterPositions.length,
        };
        var temp = getPrevWinReelIndexAndCount(winLines);
        var prevWinReelStartIndex = temp.start;
        var prevWinReelEndIndex = temp.end;

        var nudgeCacheList = [cache];

        //              
        while (true) {
            var lastCache = nudgeCacheList[nudgeCacheList.length - 1];
            var lastView = lastCache.view;
            var newVirtualReels = lastCache.virtualReels;
            for (var i = prevWinReelStartIndex; i <= prevWinReelEndIndex; i++) {
                newVirtualReels.below[i] = lastView[i + 10];
            }

            var newScatterPositions = [];
            var scatterPositions = lastCache.scatterPositions;
            for (var i = 0; i < scatterPositions.length; i++) {
                var position = scatterPositions[i];
                if (position % 5 >= prevWinReelStartIndex && position % 5 <= prevWinReelEndIndex) {
                    var newPos = position + 5;
                    if (newPos <= 14) {
                        newScatterPositions.push(newPos);
                    }
                } else {
                    newScatterPositions.push(position);
                }
            }

            var newView = GetNextViewByNudging(lastView, newVirtualReels.above, prevWinReelStartIndex, prevWinReelEndIndex);
            var newVirtualReels = {
                above: RandomLineFromReels(baseReels),
                below: newVirtualReels.below,
            };

            var nWinMoney = WinFromView(newView, bpl);
            winLines = WinLinesFromView(newView, bpl);

            var newCache = {
                view: newView,
                virtualReels: newVirtualReels,
                scatterPositions: newScatterPositions,
                scatterCnt: lastCache.scatterCnt,
            };

            nudgeCacheList.push(newCache);
            nudgeWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }

            var newTemp = getPrevWinReelIndexAndCount(winLines);
            prevWinReelStartIndex = newTemp.start;
            prevWinReelEndIndex = newTemp.end;
        }

        if (nudgeWinMoney > bottomLimit && nudgeWinMoney <= maxWin) {
            return {
                nudgeCacheList: nudgeCacheList,
                win: nudgeWinMoney,
            };
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
        var scatterPositions = RandomScatterPositions();

        var winMoney = WinFromView(view, bpl);
        if (isFreeSpinWin(scatterPositions)) {
            continue;
        }
        if (winMoney != 0) {
            continue;
        }
        var virtualReels = {
            above: RandomLineFromReels(baseReels),
            below: RandomLineFromReels(baseReels),
        };
        var cache = {
            view: view,
            virtualReels: virtualReels,
            scatterPositions: scatterPositions,
            scatterCnt: scatterPositions.length,
        };

        var nudgeCacheList = [cache];
        return {
            nudgeCacheList: nudgeCacheList,
            win: winMoney,
        };
    }
};

var RandomView = function (reels) {
    var view = [];
    var _reels = reels;

    for (var i = 0; i < slotWidth; i++) {
        var len = _reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = _reels[i][reelPos];
        }
    }

    return view;
};

var RandomScatterView = function (reels, bpl) {
    var view, scatterPositions, winMoney;
    while (true) {
        view = RandomView(reels);
        winMoney = WinFromView(view, bpl);

        scatterPositions = [];
        scatterPositions = RandomScatterPositions(true);

        if (isFreeSpinWin(scatterPositions) && winMoney == 0) {
            break;
        }
    }
    var virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };
    var cache = {
        view: view,
        virtualReels: virtualReels,
        scatterPositions: scatterPositions,
        scatterCnt: scatterPositions.length,
    };
    var cacheList = [cache];
    return {
        cache: cacheList,
        win: winMoney,
    };
};

var RandomScatterNudgeView = function (reels, bpl) {
    while (true) {
        var totalScatterCount = 0;
        var view = RandomView(reels);
        var scatterPositions = RandomScatterPositions();
        var nudgeWinMoney = WinFromView(view, bpl);
        if (scatterPositions.length >= 3 || scatterPositions.length < 1 || nudgeWinMoney == 0) {
            continue;
        }
        var winLines = WinLinesFromView(view, bpl);
        var virtualReels = {
            above: RandomLineFromReels(baseReels),
            below: RandomLineFromReels(baseReels),
        };
        var cache = {
            view: view,
            virtualReels: virtualReels,
            scatterPositions: scatterPositions,
            scatterCnt: scatterPositions.length,
        };
        var temp = getPrevWinReelIndexAndCount(winLines);
        var prevWinReelStartIndex = temp.start;
        var prevWinReelEndIndex = temp.end;

        totalScatterCount += scatterPositions.length;
        var nudgeCacheList = [cache];
        var isFreeSpin = true;

        //                       
        while (true) {
            var lastCache = nudgeCacheList[nudgeCacheList.length - 1];
            var lastView = lastCache.view;
            var newVirtualReels = lastCache.virtualReels;
            for (var i = prevWinReelStartIndex; i <= prevWinReelEndIndex; i++) {
                newVirtualReels.below[i] = lastView[i + 10];
            }

            var newScatterPositions = [];
            var scatterPositions = lastCache.scatterPositions;
            for (var i = 0; i < scatterPositions.length; i++) {
                var position = scatterPositions[i];
                if (position % 5 >= prevWinReelStartIndex && position % 5 <= prevWinReelEndIndex) {
                    var newPos = position + 5;
                    if (newPos <= 14) {
                        newScatterPositions.push(newPos);
                    }
                } else {
                    newScatterPositions.push(position);
                }
            }

            var extraScatterPositions = [],
                scatterCnt = 0;
            if (isFreeSpin) {
                extraScatterPositions = RandomScatterLinePositions(prevWinReelStartIndex, prevWinReelEndIndex, 3 - totalScatterCount);
                if (extraScatterPositions.length > 0) {
                    for (var i = 0; i < extraScatterPositions.length; i++) {
                        var newPos = extraScatterPositions[i];
                        if (getSameItemsCnt(newPos, newScatterPositions) < 1) {
                            newScatterPositions.push(newPos);
                            scatterCnt++;
                        }
                    }
                }
                totalScatterCount += scatterCnt;
                if (totalScatterCount >= 3) {
                    isFreeSpin = false;
                }
            }

            var newView = GetNextViewByNudging(lastView, newVirtualReels.above, prevWinReelStartIndex, prevWinReelEndIndex);
            var newVirtualReels = {
                above: RandomLineFromReels(baseReels),
                below: newVirtualReels.below,
            };

            var nWinMoney = WinFromView(newView, bpl);
            winLines = WinLinesFromView(newView, bpl);

            var newCache = {
                view: newView,
                virtualReels: newVirtualReels,
                scatterPositions: newScatterPositions,
                scatterCnt: totalScatterCount,
            };

            nudgeCacheList.push(newCache);
            nudgeWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }

            var newTemp = getPrevWinReelIndexAndCount(winLines);
            prevWinReelStartIndex = newTemp.start;
            prevWinReelEndIndex = newTemp.end;
        }

        return {
            cache: nudgeCacheList,
            win: nudgeWinMoney,
        };
    }
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

var BuyBonusViewCache = function (reels, bpl, fsLen) {
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var freeSpinMulti = 0;

    while (true) {
        while (true) {
            var view = RandomView(reels);
            var scatterPositions = RandomScatterPositions();
            if (!isFreeSpinWin(scatterPositions)) {
                break;
            }
        }
        var virtualReels = {
            above: RandomLineFromReels(baseReels),
            below: RandomLineFromReels(baseReels),
        };
        var cache = {
            view: view,
            virtualReels: virtualReels,
            scatterPositions: scatterPositions,
            scatterCnt: scatterPositions.length,
        };

        var winLines = WinLinesFromView(view, bpl);
        var temp = getPrevWinReelIndexAndCount(winLines);
        var prevWinReelStartIndex = temp.start;
        var prevWinReelEndIndex = temp.end;
        var nudgeCacheList = [cache];

        freeSpinMulti++;
        var nudgeWinMoney = WinFromView(view, bpl) * freeSpinMulti;

        // console.log(freeSpinIndex + ": " + freeSpinMulti + " * " + WinFromView(view, bpl) + " = " + nudgeWinMoney);

        //                       
        if (nudgeWinMoney > 0) {
            while (true) {
                var lastCache = nudgeCacheList[nudgeCacheList.length - 1];
                var lastView = lastCache.view;
                var newVirtualReels = lastCache.virtualReels;
                for (var i = prevWinReelStartIndex; i <= prevWinReelEndIndex; i++) {
                    newVirtualReels.below[i] = lastView[i + 10];
                }

                var newScatterPositions = [];
                var scatterPositions = lastCache.scatterPositions;
                for (var i = 0; i < scatterPositions.length; i++) {
                    var position = scatterPositions[i];
                    if (position % 5 >= prevWinReelStartIndex && position % 5 <= prevWinReelEndIndex) {
                        var newPos = position + 5;
                        if (newPos <= 14) {
                            newScatterPositions.push(newPos);
                        }
                    } else {
                        newScatterPositions.push(position);
                    }
                }

                var newView = GetNextViewByNudging(lastView, newVirtualReels.above, prevWinReelStartIndex, prevWinReelEndIndex);
                var newVirtualReels = {
                    above: RandomLineFromReels(baseReels),
                    below: newVirtualReels.below,
                };

                var nWinMoney = WinFromView(newView, bpl);
                winLines = WinLinesFromView(newView, bpl);

                var newCache = {
                    view: newView,
                    virtualReels: newVirtualReels,
                    scatterPositions: newScatterPositions,
                    scatterCnt: lastCache.scatterCnt,
                };

                nudgeCacheList.push(newCache);
                freeSpinMulti++;
                nudgeWinMoney += nWinMoney * freeSpinMulti;
                // console.log(freeSpinIndex + ": " + freeSpinMulti + " * " + nWinMoney + " = " + nWinMoney * freeSpinMulti);

                //                 
                if (nWinMoney == 0) {
                    // console.log("NudgeTotal: " + nudgeWinMoney);
                    break;
                }

                var newTemp = getPrevWinReelIndexAndCount(winLines);
                prevWinReelStartIndex = newTemp.start;
                prevWinReelEndIndex = newTemp.end;
            }
        }

        freeSpinCacheList.push(nudgeCacheList);
        freeSpinTotalWin += nudgeWinMoney;

        freeSpinIndex++;
        if (freeSpinIndex > freeSpinLength) {
            break;
        }
    }

    freeSpinData = {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin,
    };

    return freeSpinData;
};

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    return money;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line
                    .filter(function (item, index, arr) {
                        return lineSymbols[index] != -1;
                    })
                    .join("~")}`
            );
        }
    }
    return winLines;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;
    //                    
    var symbol, i, j;
    for (i = 0; i < lineSymbols.length - 2; i++) {
        symbol = lineSymbols[i];

        //                                 
        for (j = i; j < lineSymbols.length; j++) {
            if (lineSymbols[j] != symbol) break;
            matchCount++;
        }
        if (matchCount >= 3) break;
        matchCount = 0;
    }

    //                                            -1   ,     lineSymbols    WinLines             
    for (j = 0; j < i; j++) {
        lineSymbols[j] = -1;
    }

    for (j = i + matchCount; j < lineSymbols.length; j++) {
        lineSymbols[j] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;
    return winPay;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var RandomScatterPositions = function (isFreeSpin = false) {
    var positions = [],
        scatterCnt = 0;
    if (isFreeSpin) {
        scatterCnt = 3;
    } else {
        if (Util.probability(30)) {
            var random = Util.random(1, 100);
            if (random > 90) {
                scatterCnt = 3;
            } else if (random > 60) {
                scatterCnt = 2;
            } else {
                scatterCnt = 1;
            }
        }
    }

    if (scatterCnt > 0) {
        while (true) {
            var position = Util.random(0, 14);
            if (getSameItemsCnt(position, positions) < 1) {
                positions.push(position);
            }

            if (positions.length == scatterCnt) {
                break;
            }
        }
    }

    return positions;
};

var RandomScatterLinePositions = function (min, max, cnt) {
    var positions = [];
    if (cnt > 0) {
        while (true) {
            var position = Util.random(min, max);
            if (getSameItemsCnt(position, positions) < 1) {
                positions.push(position);
            }
            if (positions.length == cnt) {
                break;
            }
        }
    }

    return positions;
};

var getSameItemsCnt = function (value, array) {
    var cnt = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            cnt++;
        }
    }
    return cnt;
};

var GetNudgeStr = function (view, start, end) {
    var str = "";

    for (var j = start; j <= end; j++) {
        str = str + j + "~" + "0~";
        for (var i = 0; i < 3; i++) {
            str = str + view[j + 5 * i] + ",";
        }
        str = str.slice(0, str.length - 1) + "~0~-1;";
    }
    return str.slice(0, str.length - 1);
};

var GetNextViewByNudging = function (view, virtualReels, start, end) {
    var nextView = Util.clone(view);

    for (var j = 1; j < 3; j++) {
        for (var i = start; i <= end; i++) {
            nextView[i + j * 5] = view[(j - 1) * 5 + i];
        }
    }

    for (var i = start; i <= end; i++) {
        nextView[i] = virtualReels[i];
    }

    return nextView;
};

var getPrevWinReelIndexAndCount = function (winLines) {
    var temp = {
        start: 0,
        end: 0,
    };
    var winReelIndex = 0,
        winReelCount = 0;
    var startIndex = 4,
        endIndex = 0;
    for (var i = 0; i < winLines.length; i++) {
        var items = winLines[i];
        winReelIndex = items.split("~")[2] % 5;
        winReelCount = items.split("~").length - 2;
        if (winReelIndex < startIndex) {
            startIndex = winReelIndex;
        }
        if (winReelIndex + winReelCount > endIndex) {
            endIndex = winReelIndex + winReelCount - 1;
        }
    }

    if (winLines.length > 0) {
        temp = {
            start: startIndex,
            end: endIndex,
        };
    }

    return temp;
};

//                                                
var isFreeSpinWin = function (positions) {
    return positions.length >= 3;
};

module.exports = SlotMachine;