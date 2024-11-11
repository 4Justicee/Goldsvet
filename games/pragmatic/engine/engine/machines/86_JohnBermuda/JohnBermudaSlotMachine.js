var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];

    //          
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";
    this.tumbleIndex = 0;
    this.tumbleViewList = [];
    this.tumbles = [];
    this.tmb_win = 0;
    this.tmb_res = 0;

    //                       
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    this.sepcialSymbolVal = 0;
    this.trailMoney = 0;
    this.extraVal = 0;
    this.extraAddition = [];
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE

    this.buyMulti = 100;
};

var baseReels = [
    [6, 7, 10, 4, 6, 5, 5, 3, 6, 7, 7, 3, 8, 7, 6, 6, 3, 7, 9, 6, 6, 6, 9, 4, 7, 5, 8, 4, 9, 5, 8, 9, 3, 8, 9, 7, 7, 10, 9, 9, 9, 8, 3, 8, 7, 6, 7, 8, 10, 7, 6, 9, 7, 9, 7, 9, 6, 6, 7, 9, 7, 3, 9, 6, 8, 7, 7, 6, 7, 6, 9, 6, 6, 5, 9, 8, 7, 9, 8, 10, 8, 5, 5, 5, 5, 8, 2, 6, 9, 8, 7, 8, 3, 7, 7, 6, 6, 9, 9, 5, 9, 7, 7, 8, 4, 4, 4, 7, 9, 6, 4, 8, 6, 9, 9, 5, 9, 8, 5, 9, 6, 8, 6, 3, 9, 6, 6, 8, 8, 8, 8, 7, 9, 3, 8, 4, 8, 6, 7, 9, 7, 9, 8, 7, 4, 9, 7, 9, 6, 9, 10, 3, 3, 3, 8, 2, 4, 9, 7, 7, 5, 9, 8, 8, 9, 6, 3, 6, 6, 8, 9, 8, 8, 7, 7, 7, 4, 6, 9, 7, 6, 6, 3, 7, 6, 6, 8, 8, 7, 8, 6, 8, 6, 9, 6, 7],
    [7, 9, 8, 3, 6, 9, 7, 7, 6, 5, 6, 6, 5, 7, 9, 4, 4, 9, 9, 7, 9, 3, 6, 6, 6, 7, 7, 9, 7, 8, 10, 9, 8, 4, 7, 6, 3, 9, 9, 5, 9, 8, 3, 3, 9, 4, 4, 7, 6, 9, 7, 9, 9, 9, 8, 8, 9, 9, 8, 7, 9, 7, 9, 7, 10, 6, 5, 6, 8, 7, 6, 9, 6, 5, 6, 7, 9, 7, 7, 6, 3, 3, 6, 8, 3, 7, 6, 9, 3, 6, 8, 5, 9, 7, 5, 6, 9, 2, 9, 7, 8, 7, 5, 5, 5, 5, 9, 9, 7, 9, 7, 8, 7, 8, 7, 6, 5, 7, 9, 9, 7, 8, 7, 6, 7, 8, 8, 9, 9, 4, 4, 4, 8, 9, 6, 9, 7, 8, 3, 9, 6, 7, 6, 8, 8, 3, 6, 6, 2, 6, 7, 6, 8, 8, 8, 8, 6, 7, 7, 5, 7, 5, 9, 6, 9, 4, 10, 8, 7, 7, 5, 4, 3, 7, 6, 6, 8, 8, 4, 8, 7, 7, 3, 3, 3, 6, 7, 8, 6, 8, 6, 7, 6, 8, 6, 8, 8, 9, 5, 8, 8, 6, 6, 9, 7, 8, 9, 4, 3, 7, 7, 7, 9, 9, 7, 9, 6, 7, 6, 6, 7, 6, 6, 8, 8, 7, 9, 8, 8, 2, 3, 8, 6, 9, 4, 6],
    [9, 8, 8, 7, 9, 6, 9, 7, 8, 3, 6, 5, 8, 9, 8, 9, 6, 6, 6, 8, 9, 5, 6, 7, 7, 9, 5, 3, 8, 6, 6, 7, 6, 8, 8, 7, 10, 4, 8, 9, 9, 9, 8, 9, 8, 9, 8, 9, 8, 7, 6, 6, 9, 6, 6, 7, 6, 7, 3, 7, 5, 9, 7, 6, 8, 6, 4, 3, 2, 9, 10, 3, 8, 9, 9, 7, 9, 7, 6, 5, 5, 5, 5, 9, 9, 7, 5, 7, 7, 6, 7, 10, 3, 8, 6, 3, 6, 4, 5, 7, 7, 4, 4, 4, 9, 8, 9, 6, 5, 7, 9, 7, 6, 7, 6, 9, 9, 8, 6, 7, 8, 3, 8, 8, 8, 8, 7, 9, 7, 3, 9, 7, 7, 8, 9, 9, 6, 7, 8, 7, 7, 6, 9, 7, 3, 3, 3, 6, 6, 3, 8, 6, 7, 6, 9, 8, 4, 9, 6, 6, 2, 6, 7, 7, 7, 6, 5, 9, 5, 8, 8, 9, 3, 8, 7, 8, 9, 4, 6, 7, 8, 4, 4, 6, 7],
    [7, 6, 8, 7, 8, 4, 6, 3, 4, 9, 5, 9, 7, 8, 7, 8, 3, 6, 7, 7, 6, 6, 9, 5, 9, 6, 6, 6, 8, 6, 7, 8, 9, 7, 9, 6, 5, 9, 9, 7, 9, 9, 7, 3, 9, 8, 9, 8, 6, 9, 4, 7, 6, 9, 9, 9, 8, 6, 9, 9, 6, 7, 8, 3, 3, 7, 6, 4, 6, 10, 3, 7, 3, 4, 8, 9, 7, 5, 3, 9, 8, 8, 7, 9, 7, 3, 6, 2, 8, 8, 5, 9, 8, 9, 7, 9, 6, 7, 9, 6, 6, 9, 8, 8, 7, 8, 5, 6, 7, 5, 5, 5, 5, 8, 8, 6, 8, 3, 6, 9, 4, 9, 6, 7, 8, 10, 7, 9, 8, 6, 8, 9, 5, 6, 5, 8, 6, 9, 7, 4, 4, 4, 7, 5, 6, 7, 8, 7, 8, 9, 7, 4, 7, 8, 7, 9, 7, 7, 9, 4, 9, 6, 8, 7, 8, 6, 6, 8, 8, 8, 8, 6, 9, 2, 7, 7, 3, 7, 6, 6, 7, 9, 6, 7, 10, 6, 6, 8, 7, 9, 9, 5, 7, 6, 3, 3, 3, 7, 8, 7, 5, 7, 9, 7, 8, 6, 9, 7, 6, 9, 7, 6, 7, 3, 8, 9, 6, 6, 6, 8, 7, 7, 7, 9, 6, 5, 6, 3, 2, 9, 7, 8, 3, 8, 7, 7, 8, 9, 8, 6, 9, 3, 4, 9, 9, 4, 7, 6, 6],
    [6, 8, 4, 7, 6, 8, 6, 7, 7, 9, 8, 6, 2, 9, 8, 8, 4, 3, 6, 4, 10, 7, 3, 6, 9, 9, 6, 6, 6, 7, 6, 8, 7, 7, 8, 7, 6, 3, 7, 9, 6, 5, 3, 3, 7, 9, 8, 7, 5, 6, 7, 7, 9, 8, 9, 9, 9, 5, 3, 8, 8, 4, 9, 9, 6, 8, 9, 9, 7, 4, 7, 6, 3, 8, 9, 7, 7, 3, 8, 7, 5, 7, 7, 9, 9, 3, 9, 7, 7, 8, 7, 7, 6, 7, 3, 8, 6, 8, 7, 8, 7, 5, 8, 9, 7, 7, 8, 5, 5, 5, 8, 9, 6, 9, 6, 7, 9, 9, 8, 4, 8, 6, 6, 9, 6, 4, 7, 6, 7, 6, 9, 6, 9, 4, 2, 8, 8, 8, 8, 6, 3, 7, 9, 9, 4, 4, 8, 8, 6, 9, 8, 6, 7, 9, 8, 8, 7, 8, 6, 6, 3, 3, 3, 9, 6, 9, 6, 6, 8, 3, 9, 9, 6, 9, 6, 6, 5, 8, 5, 6, 5, 5, 6, 7, 9, 7, 8, 6, 7, 7, 7, 6, 7, 6, 6, 2, 8, 7, 8, 8, 5, 8, 9, 9, 8, 7, 7, 6, 5, 6, 7, 6, 7, 9, 7, 9, 9, 4, 4, 4, 8, 9, 3, 7, 6, 6, 9, 6, 7, 6, 9, 3, 7, 8, 5, 9, 9, 8, 9, 9, 6, 9, 6, 3, 5, 7, 7, 6],
    [4, 5, 9, 8, 9, 8, 9, 8, 10, 9, 6, 5, 8, 9, 7, 9, 8, 9, 3, 8, 3, 8, 8, 4, 7, 8, 6, 6, 6, 8, 7, 9, 3, 2, 3, 9, 8, 3, 4, 9, 6, 3, 3, 8, 8, 7, 6, 9, 8, 9, 3, 7, 7, 5, 9, 7, 9, 9, 9, 7, 9, 9, 7, 7, 6, 8, 7, 4, 9, 8, 7, 5, 6, 9, 7, 9, 7, 9, 6, 7, 7, 8, 3, 7, 9, 9, 6, 7, 7, 6, 6, 4, 8, 6, 8, 7, 9, 9, 7, 9, 9, 7, 4, 8, 8, 9, 7, 6, 8, 8, 7, 5, 5, 5, 8, 8, 9, 7, 9, 6, 8, 6, 9, 5, 10, 8, 8, 6, 7, 8, 2, 6, 7, 8, 7, 6, 6, 9, 9, 7, 6, 7, 8, 8, 8, 8, 5, 7, 6, 6, 6, 5, 9, 6, 8, 8, 7, 9, 6, 6, 6, 8, 8, 7, 7, 6, 6, 9, 6, 7, 3, 3, 3, 3, 7, 6, 9, 4, 7, 5, 6, 8, 8, 7, 6, 4, 5, 8, 4, 7, 6, 9, 6, 6, 7, 9, 8, 5, 9, 9, 7, 7, 7, 5, 6, 3, 8, 10, 5, 7, 6, 8, 7, 3, 7, 9, 7, 6, 8, 6, 2, 9, 3, 9, 7, 7, 8, 7, 7, 9, 8, 4, 4, 4, 6, 3, 6, 3, 7, 8, 6, 6, 7, 6, 4, 9, 6, 9, 7, 9, 6, 4, 7, 9, 6, 3, 9, 5, 6, 9, 6, 7, 7],
    [6, 6, 8, 6, 7, 6, 7, 7, 6, 9, 4, 7, 9, 8, 7, 8, 8, 9, 8, 3, 5, 6, 10, 3, 7, 8, 7, 7, 9, 7, 2, 8, 9, 9, 6, 3, 7, 6, 7, 8, 6, 9, 9, 9, 6, 6, 9, 8, 4, 3, 6, 7, 6, 8, 9, 8, 7, 8, 8, 6, 8, 7, 3, 9, 9, 8, 8, 8, 8, 6, 8, 9, 4, 4, 8, 5, 6, 8, 7, 7, 6, 7, 7, 9, 9, 5, 9, 4, 7, 6, 9, 3, 3, 3, 9, 9, 7, 7, 9, 7, 9, 7, 9, 8, 6, 7, 3, 9, 7, 2, 6, 7, 7, 7, 5, 5, 8, 8, 6, 6, 9, 8, 6, 6, 9, 9, 6, 7, 6, 4, 7, 7, 9, 3, 3, 5, 5, 5, 8, 8, 9, 8, 9, 9, 7, 6, 6, 3, 3, 6, 7, 6, 6, 4, 3, 7, 9, 9, 9, 4, 4, 4, 5, 5, 6, 6, 10, 7, 8, 8, 6, 8, 8, 5, 5, 6, 9, 7, 5, 9, 7, 9, 9, 6, 8, 6, 6, 6, 9, 6, 7, 8, 7, 6, 6, 7, 8, 7, 7, 6, 7, 7, 3, 4, 7, 9, 8, 9, 7]
];
var freeReels = [
    [8, 6, 8, 8, 5, 3, 9, 5, 10, 4, 8, 9, 2, 5, 9, 4, 7, 3, 9, 3, 3, 9, 7, 7, 7, 4, 6, 10, 9, 3, 9, 5, 9, 5, 8, 7, 7, 10, 6, 7, 5, 8, 8, 7, 8, 8, 7, 8, 8, 6, 3, 1, 7, 5, 8, 8, 10, 7, 9, 5, 9, 5, 7, 3, 9, 8, 7, 2, 6, 6, 4, 10, 5, 4, 9, 3, 9, 6, 6, 6, 7, 6, 9, 1, 5, 7, 9, 9, 6, 2, 9, 8, 10, 8, 7, 4, 6, 7, 3, 9, 9, 7, 9, 9, 8, 4, 7, 5, 4, 9, 8, 8, 7, 6, 7, 4, 7, 6, 7, 7, 8, 4, 4, 9, 8],
    [6, 5, 9, 10, 9, 6, 3, 8, 1, 4, 6, 5, 9, 4, 4, 7, 9, 9, 2, 5, 9, 6, 8, 7, 3, 7, 7, 10, 7, 3, 7, 3, 8, 7, 8, 8, 7, 6, 9, 7, 5, 8, 8, 4, 4, 8, 8, 5, 8, 9, 9, 2, 4, 9, 8, 3, 4, 9, 7, 6, 4, 6, 9, 7, 4, 8, 7, 5, 9, 6, 2, 8, 8, 5, 6, 7, 7, 9, 7, 5, 7, 8, 6, 6, 6, 4, 9, 9, 6, 8, 7, 5, 8, 8, 7, 5, 5, 9, 6, 5, 10, 8, 7, 3, 7, 8, 1, 7, 7, 9, 9, 4, 7, 7, 8, 5, 3, 7, 5, 4, 3, 9, 9, 3, 5, 8, 8, 8, 9, 9, 7, 6, 3, 6, 9, 7, 10, 9, 6, 7, 4],
    [9, 4, 3, 7, 4, 2, 3, 4, 6, 7, 10, 7, 8, 4, 5, 7, 8, 5, 7, 9, 6, 4, 8, 9, 8, 7, 4, 8, 6, 3, 5, 6, 9, 8, 7, 7, 7, 8, 3, 8, 9, 8, 9, 10, 5, 9, 4, 7, 9, 5, 3, 1, 6, 8, 8, 7, 6, 7, 9, 8, 5, 6, 9, 3, 3, 7, 2, 5, 4, 2, 7, 9, 4, 7, 9, 8, 7, 6, 8, 9, 6, 6, 7, 7, 7, 6, 9, 5, 9, 8, 4, 9, 5, 7, 8, 6, 3, 9, 7, 3, 9, 6, 6, 6, 7, 8, 3, 7, 7, 8, 7, 5, 9, 8, 6, 8, 4, 7, 8, 9, 5, 2, 9, 7, 7, 6, 8, 6, 9, 3, 7, 9, 4, 9, 9, 7, 8, 8, 10, 5, 5, 4, 5, 8, 4, 1, 8, 7, 5, 7, 5, 4, 9, 5, 8, 3, 6, 9, 7, 9, 8, 4, 7, 8, 9],
    [7, 4, 4, 7, 9, 7, 8, 6, 8, 9, 7, 9, 9, 7, 4, 3, 5, 8, 3, 7, 4, 8, 10, 6, 8, 9, 4, 5, 7, 8, 6, 10, 8, 7, 4, 7, 7, 7, 4, 9, 6, 7, 9, 3, 7, 2, 3, 7, 6, 8, 7, 8, 9, 1, 8, 9, 8, 5, 8, 8, 3, 3, 9, 4, 1, 9, 4, 8, 7, 10, 9, 8, 6, 4, 4, 5, 3, 4, 7, 9, 3, 8, 8, 9, 10, 8, 9, 9, 3, 3, 5, 4, 7, 9, 8, 3, 8, 7, 6, 8, 9, 3, 7, 6, 8, 8, 5, 8, 6, 10, 5, 6, 6, 6, 7, 5, 7, 8, 8, 5, 4, 6, 8, 3, 3, 4, 7, 5, 6, 5, 6, 7, 6, 2, 9, 7, 7, 9, 9, 8, 7, 7, 9, 7, 9, 7, 10, 5, 7, 8, 9, 9, 5, 2, 8, 6, 9, 4, 4, 2, 5, 10, 5, 6, 9, 7, 9, 9, 6, 6, 7, 5, 6, 5, 7, 9, 9, 5, 6, 10, 7, 8, 4, 5, 9, 9, 7, 5, 10, 6],
    [5, 3, 8, 4, 7, 8, 2, 4, 9, 3, 8, 9, 8, 7, 9, 7, 7, 6, 5, 9, 9, 7, 7, 8, 5, 8, 8, 6, 6, 9, 9, 7, 8, 7, 7, 7, 5, 7, 6, 7, 6, 1, 9, 3, 5, 8, 3, 9, 8, 4, 10, 5, 7, 9, 4, 6, 6, 9, 4, 9, 7, 6, 7, 7, 9, 8, 6, 8, 5, 9, 3, 9, 5, 3, 6, 7, 5, 9, 5, 2, 9, 4, 4, 6, 4, 6, 8, 7, 9, 8, 8, 5, 3, 9, 9, 10, 5, 3, 8, 4, 9, 4, 3, 8, 8, 3, 4, 9, 5, 4, 2, 8, 9, 9, 7, 8, 7, 5, 9, 4, 7, 7, 8, 5, 7, 7, 9, 8, 5, 4, 7, 8, 6, 9, 7, 8, 4, 9, 8, 7, 8, 6, 7, 9, 6, 3, 7, 1, 7, 3, 6, 9, 7, 7],
    [9, 7, 8, 8, 5, 4, 7, 8, 8, 5, 3, 9, 5, 7, 8, 6, 6, 5, 8, 5, 3, 9, 10, 7, 6, 6, 3, 6, 7, 6, 8, 8, 4, 9, 9, 5, 9, 8, 9, 7, 4, 7, 7, 7, 8, 7, 5, 7, 9, 7, 8, 5, 10, 4, 7, 8, 7, 9, 7, 8, 9, 8, 7, 10, 3, 3, 7, 7, 5, 7, 8, 6, 8, 5, 6, 9, 4, 9, 8, 4, 4, 7, 9, 6, 9, 9, 8, 6, 8, 3, 7, 4, 4, 9, 8, 5, 7, 9, 9, 4, 8, 1, 8, 8, 3, 7, 9, 3, 5, 8, 4, 4, 7, 9, 9, 7, 9, 10, 7, 5, 6, 9, 7, 4, 9, 9, 8, 4, 4, 5, 9, 7, 7, 2, 5, 7, 8, 9, 8, 6, 7, 2, 8, 3, 7, 5, 6, 3, 3, 9, 1, 9, 3, 6, 6, 9, 8, 5, 6, 9, 6, 4, 2],
    [9, 7, 4, 7, 8, 4, 7, 10, 5, 8, 4, 5, 3, 9, 7, 2, 5, 9, 4, 7, 7, 7, 6, 9, 3, 9, 10, 2, 7, 6, 6, 9, 7, 6, 7, 10, 7, 8, 8, 7, 3, 7, 6, 7, 7, 5, 6, 7, 9, 7, 6, 5, 7, 8, 6, 8, 9, 5, 7, 4, 8, 6, 8, 3, 4, 9, 9, 7, 9, 8, 4, 8, 6, 6, 5, 1, 8, 8, 9, 5, 7, 9, 3, 10, 9, 5, 4, 3, 9, 8, 8, 8, 9, 8, 8, 7, 9, 5, 1, 4, 9, 4, 10, 7, 6, 4, 9, 9, 3, 8, 5, 9, 7, 8, 5, 6, 6, 6, 3, 7, 4, 5, 5, 3, 2, 9, 7, 6, 7, 7, 10, 8, 4, 8, 9, 6, 8, 8, 3, 5, 7, 5, 9, 9, 6, 9, 7, 8, 3, 8, 8, 8, 3, 9, 8, 10, 7, 8, 8, 9, 4, 2, 5, 6, 6, 9, 4]
];
var freeSpinReels = [
    [9, 5, 9, 3, 9, 7, 1, 9, 5, 3, 7, 5, 7, 9, 5, 3, 5, 3, 5, 5, 7, 5, 5, 7, 3, 7, 9, 7, 3, 9, 7, 1, 3, 3, 9, 7, 3, 9],
    [4, 6, 6, 4, 8, 4, 4, 6, 4, 4, 4, 8, 4, 6, 4, 4, 8, 8, 4, 8, 6, 6, 6, 1, 4, 6, 4, 6, 4, 8, 8, 6, 6, 8, 8, 8, 6, 4, 6, 6, 8, 8, 6, 4, 6],
    [9, 9, 3, 7, 3, 5, 3, 9, 5, 3, 5, 7, 9, 7, 5, 5, 7, 9, 9, 7, 7, 3, 7, 5, 5, 9, 7, 3, 3, 5, 5, 7, 3, 9, 7, 9, 9, 1, 5, 3, 3],
    [6, 4, 6, 8, 6, 6, 4, 1, 4, 8, 8, 6, 4, 4, 4, 6, 8, 6, 6, 8, 6, 6, 4, 4, 8, 6, 6, 6, 4, 6, 8, 6, 8, 4, 6, 4, 4, 8, 6, 4, 8, 8, 8, 6, 4, 8, 8, 4, 4, 8, 8, 6, 6, 4, 8, 4, 8],
    [3, 5, 9, 3, 5, 9, 5, 9, 3, 7, 5, 7, 7, 9, 3, 7, 3, 7, 7, 5, 7, 3, 3, 7, 9, 9, 3, 5, 3, 5, 7, 7, 5, 3, 1, 9, 9, 3, 5, 9, 5, 9, 7, 9, 3, 3, 9, 5, 5, 7, 7, 5, 9, 5, 9, 1, 3, 7, 5, 9, 3, 7],
    [4, 6, 6, 4, 4, 8, 8, 6, 8, 4, 6, 4, 8, 1, 4, 4, 4, 6, 4, 4, 6, 6, 8, 8, 6, 6, 8, 4, 8, 4, 8, 6, 6, 6, 4, 6, 8, 8, 6, 4, 4, 8, 6, 4, 6, 8, 4, 6, 8, 8, 8, 6, 4, 8, 6, 6, 4, 8, 4, 6, 4, 6, 8, 6, 8, 8, 4],
    [5, 7, 3, 9, 5, 3, 7, 9, 3, 7, 1, 9, 5, 9, 7, 5, 3, 3, 9, 7, 5, 9, 5, 3, 7, 7, 5, 7, 5, 5, 3, 3, 7, 3, 9, 7, 9, 5, 3, 7, 3, 9, 3, 9, 1, 3, 5, 9, 7, 3, 9, 5, 9, 5, 7, 5, 9, 7]
]
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 10, 8, 6, 5, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 30, 20, 15, 10, 8, 6, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 35, 25, 20, 15, 10, 8, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 30, 25, 20, 15, 10, 8, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 40, 30, 25, 20, 15, 10, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 80, 60, 40, 30, 25, 20, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 150, 120, 90, 60, 50, 40, 30, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 300, 250, 200, 100, 70, 60, 50, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 700, 600, 500, 400, 300, 200, 100, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1400, 1200, 1000, 800, 600, 400, 200, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400, 0, 0, 0, 0, 0, 0]
];
var scatter = 1, wild = 2, moneySymbol = 10, collectSymbol = 12, extraCollectSymbol = 13, addSymbol = 15;
var slotWidth = 7;
var slotHeight = 7;
var winLines = [], tumbling = [];
var moneySymbolValues = [20, 40, 60, 100, 160, 200, 240, 300, 360, 400, 500, 600, 700];

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 50; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    var cachView;

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        cachView = this.tumbleCacheList[0];
        this.view = cachView.view
        this.moneyCache = cachView.moneyCache;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.tumbleCacheList = this.freeSpinCacheList[0];
        cachView = this.tumbleCacheList[0];
        this.view = cachView.view
        this.moneyCache = cachView.moneyCache;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumbling);

    this.tmb_win = 0;
    this.tmb_res = 0;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    if (isFreeSpinWin(this.view)) {
        this.currentGame = "FREE";
        this.freeSpinIndex = 1;
        this.freeSpinLength = 12;
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var multiView = this.tumbleCacheList[this.tumbleIndex];


    this.view = multiView.view;
    this.moneyCache = multiView.moneyCache;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumbling);

    this.tmb_win += this.winMoney;
    this.tumbleIndex++;

    if (this.currentGame == "FREE") {
        this.freeSpinWinMoney += this.winMoney;
    }
    //                 
    if (this.winMoney == 0) {
        var isCollectSymbol = isSpecialSymbolView(multiView.view);

        if (isCollectSymbol == collectSymbol) {
            //                
            var collectRes = GetCollectStrFromView(multiView.moneyCache, player.betPerLine);

            this.winMoney += collectRes.money;
            this.trailMoney += collectRes.money;
            this.freeSpinWinMoney += collectRes.money;
            this.sepcialSymbolVal = collectSymbol;

        } else if (isCollectSymbol == extraCollectSymbol) {
            //                

            this.extraAddition = multiView.extraCollect;

            var extraCollectRes = GetExtraCollectResFromView(multiView.moneyCache, this.extraVal, player.betPerLine);

            this.winMoney += extraCollectRes.money;
            this.trailMoney += extraCollectRes.money;
            this.freeSpinWinMoney += extraCollectRes.money;
            this.sepcialSymbolVal = extraCollectSymbol;

        } else if (isCollectSymbol == addSymbol) {
            //                      
            var addCollectRes = GetAddCollectResFromView(multiView.moneyCache, player.betPerLine);

            this.addisView = multiView.isView;
            this.addSym = multiView.addSym;

            this.winMoney += addCollectRes.money;
            this.trailMoney += addCollectRes.money;
            this.freeSpinWinMoney += addCollectRes.money;
            this.sepcialSymbolVal = addSymbol;
        }

        this.tmb_res += this.tmb_win;
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        //                 
        if (this.tumbleStatus == "NOTUMBLE") {
            if (this.freeSpinIndex > this.freeSpinLength) {
                this.sepcialSymbolVal = 0;
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    var multiView = this.tumbleCacheList[0];

    if (multiView.extraVal != undefined) {
        this.extraVal = multiView.extraVal
    }

    this.view = multiView.view;
    this.moneyCache = multiView.moneyCache;

    this.tmb_win = 0;
    this.tmb_res = 0;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.tumbles = GetTumbles(this.view, tumbling);
    this.winLines = winLines;

    this.freeSpinWinMoney += this.winMoney;

    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney;
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
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
        default:
            return;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(freeSpinReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet);
    var tmpMoneyCache = RandomMoneySymbols(scatterView);

    var cache = {
        view: scatterView,
        moneyCache: tmpMoneyCache
    }

    var freeSpinCacheList = [];
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, 12);
    freeSpinCacheList.push([cache]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
}

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(freeSpinReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet);
    var tmpMoneyCache = RandomMoneySymbols(scatterView);

    var cache = {
        view: scatterView,
        moneyCache: tmpMoneyCache
    }

    var freeSpinCacheList = [];
    var fsCache = BuyBonusViewCache(freeReels, bpl, 12, true);
    freeSpinCacheList.push([cache]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: 0
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0, calcCount = 0;
    while (true) {
        var viewList = [];
        var tumbleWinMoney = 0;
        var tmpView = RandomView(reels);
        var tmpMoneyValues = RandomMoneySymbols(tmpView);
        var tumbleWinMoney = WinFromView(tmpView, bpl);

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }

        if (tumbleWinMoney == 0) {
            continue;
        }

        var cache = {
            view: tmpView,
            moneyCache: tmpMoneyValues
        }

        viewList = [cache];

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumbling);
            var newView = GetTumbleView(lastView.view, lastTumbling);

            var nWinMoney = WinFromView(newView, bpl);
            var tmpMoneyValues = GetTumbleMoneyCache(lastView.moneyCache, lastTumbling);

            var cache = {
                view: newView,
                moneyCache: tmpMoneyValues
            }

            viewList.push(cache);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            var result = {
                view: viewList,
                win: tumbleWinMoney
            }

            return result;
        }


    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var tmpView = RandomView(reels);

        var tmpMoneyValues = RandomMoneySymbols(tmpView);
        var winMoney = WinFromView(tmpView, bpl);

        if (winMoney > 0) {
            continue;
        }

        var cache = {
            view: tmpView,
            moneyCache: tmpMoneyValues
        }

        viewList = [cache];
        if (winMoney == 0) {
            return {
                view: viewList,
                win: winMoney
            }
        }
    }
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

        if (NumberOfScatters(view) == 0) {
            break;
        }
    }

    return view;
};

var RandomScatterView = function (reels, bpl) {
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
        if (WinFromView(view, bpl) == 0) {
            if (isFreeSpinWin(view) && NumberOfScatters(view) <= 5) {
                break;
            }
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

var BuyBonusViewCache = function (reels, bpl, fsLen, isBuy = false) {
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinWinMoney = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;

    while (true) {
        var viewList = [];
        var tumbleWinMoney = 0;

        var tmpView = RandomView(reels);

        //                 60                                                     . 
        if (freeSpinIndex < freeSpinLength - 2) {
            if (Util.probability(70)) {
                var symbolArr = [12, 13, 15];
                symbolArr = Util.shuffle(symbolArr);
                tmpView[Util.random(0, 49)] = symbolArr[0];
            }
        }

        var tmpMoneyCache = RandomMoneySymbols(tmpView, isBuy);
        var tumbleWinMoney = WinFromView(tmpView, bpl);

        if (tumbleWinMoney == 0) {
            continue;
        }

        var cache = {
            view: tmpView,
            moneyCache: tmpMoneyCache
        }

        var extraCollect = moneySymbolValues[Util.random(0, 5)];

        if (tmpView.indexOf(13) != -1) {
            cache.extraVal = extraCollect;
        }

        viewList = [cache];

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumbling);
            var newView = GetTumbleView(lastView.view, lastTumbling);

            var nWinMoney = WinFromView(newView, bpl);
            var tmpMoneyCache = GetTumbleMoneyCache(lastView.moneyCache, lastTumbling);

            //                 
            if (nWinMoney == 0) {
                var extraSymbol = isSpecialSymbolView(newView);
                var moneyValue = tmpMoneyCache; //                          

                var cache = {
                    view: newView,
                    moneyCache: tmpMoneyCache
                }

                if (extraSymbol == collectSymbol) {
                    //                
                    var moneyTotalValue = 0;
                    for (var i = 0; i < moneyValue.length; i++) {
                        if (moneyValue[i] != 0) {
                            moneyTotalValue += moneyValue[i] * bpl;
                        }
                    }

                    tumbleWinMoney += moneyTotalValue;

                    viewList.push(cache);
                    break;

                } else if (extraSymbol == extraCollectSymbol) {
                    var moneyTotalValue = 0; //                    
                    var addedMoneyValue = []; //                             ,       
                    var moneyValues = Util.clone(cache.moneyCache);
                    //                                                         
                    for (var i = 0; i < moneyValues.length; i++) {
                        if (moneyValues[i] != 0) {
                            var bonus = moneySymbolValues[Util.random(0, 5)];

                            addedMoneyValue.push(bonus);

                            moneyValues[i] = moneyValues[i] + bonus; //                                    
                            moneyTotalValue += (moneyValues[i]) * bpl;
                        }
                    }

                    tumbleWinMoney += moneyTotalValue + extraCollect * bpl;

                    cache.extraCollect = addedMoneyValue;

                    cache.moneyCache = [...moneyValues];

                    viewList.push(cache);
                    break;
                } else if (extraSymbol == addSymbol) {
                    //                       ;7~10~2 {            }~10~{      }
                    var isView = [...newView];
                    var addSymNum = Util.random(2, 5);
                    var valueList = [], addSymList = [];
                    //                                             
                    for (var i = 0; i < addSymNum; i++) {
                        while (true) {
                            var randpos = Util.random(0, slotWidth * slotHeight);
                            if (valueList.indexOf(randpos) == -1) {
                                valueList.push(randpos);
                                break;
                            };
                        }
                    }
                    //                                 
                    for (var i = 0; i < valueList.length; i++) {
                        var bonus = moneySymbolValues[Util.random(0, 2)];
                        isView[valueList[i]] = 10;

                        var obj = {
                            symVal: newView[valueList[i]],
                            pos: valueList[i],
                            val: bonus,
                        }

                        cache.moneyCache[valueList[i]] = bonus;

                        addSymList.push(obj);
                    }

                    for (var i = 0; i < cache.moneyCache.length; i++) {
                        if (cache.moneyCache[i] != 0) {
                            tumbleWinMoney += cache.moneyCache[i] * bpl;
                        }
                    }

                    cache.addSym = addSymList;
                    cache.isView = isView;

                    viewList.push(cache);
                    break;

                } else {
                    viewList.push(cache);
                    break;
                }
            } else {
                var cache = {
                    view: newView,
                    moneyCache: tmpMoneyCache
                }

                viewList.push(cache);
                tumbleWinMoney += nWinMoney;
            }
        }

        freeSpinCacheList.push(viewList);
        freeSpinWinMoney += tumbleWinMoney;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            break;
        }
    }

    freeSpinData = {
        win: freeSpinWinMoney,
        cache: freeSpinCacheList
    };

    return freeSpinData;
};

var GetTumbles = function (view, tumbling) {
    var tumbles = [];
    for (var i = 0; i < tumbling.length; i++) {
        var tumblePos = tumbling[i];
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    return tumbles;
};

var GetTumbleView = function (view, tumbles) {
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

    // var randomView = RandomView(baseReels);
    for (var i = 0; i < tumbleView.length; i++) {
        if (tumbleView[i] < 0) {
            tumbleView[i] = Util.random(3, 10);
        }
    }
    return tumbleView;
};

var GetTumbleMoneyCache = function (moneyCache, tumbles) {
    var tumbleMoneyCacheValue = Util.clone(moneyCache);

    //           
    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            //                                    
            if (tumbles.indexOf(pos) >= 0) {
                for (var k = j - 1; k >= 0; k--) {
                    tumbleMoneyCacheValue[i + (k + 1) * slotWidth] = tumbleMoneyCacheValue[i + k * slotWidth];
                }
                tumbleMoneyCacheValue[i] = 0;
            }
        }
    }

    return tumbleMoneyCacheValue;
}
var DefaultMoneyCache = function () {
    var moneyValues = [];
    var moneyTable = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyValues[i] = 0;
        moneyTable[i] = "r";
    }

    var result = {
        moneyValues: moneyValues,
        moneyTable: moneyTable,
    };
    return result;
}

//                                
var GetCollectStrFromView = function (moneyCache, bpl) {
    var moneyValue = Util.clone(moneyCache);
    var resMoney = 0;

    for (var i = 0; i < moneyValue.length; i++) {
        if (moneyValue[i] != 0) {
            resMoney += moneyValue[i] * bpl;
        }
    }

    return {
        money: resMoney
    }
}

//                                   
var GetExtraCollectResFromView = function (moneyCache, extraCollect, bpl) {
    var moneyValue = Util.clone(moneyCache);
    var money = 0;

    for (var i = 0; i < moneyValue.length; i++) {
        if (moneyValue[i] != 0) {
            money += moneyValue[i] * bpl;
        }
    }

    money += extraCollect * bpl;

    return {
        money: money
    }
}

//                       
var GetAddCollectResFromView = function (moneyCache, bpl) {
    var moneyValue = Util.clone(moneyCache);
    var money = 0;

    for (var i = 0; i < moneyValue.length; i++) {
        if (moneyValue[i] != 0) {
            money += moneyValue[i] * bpl;
        }
    }


    return {
        money: money
    }
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 3:
            return totalBet * 3;
        case 4:
            return totalBet * 5;
        case 5:
            return totalBet * 10;
        case 6:
            return totalBet * 20;
        case 7:
            return totalBet * 100;
        default:
            break;
    }
};

//                                            
var isSpecialSymbolView = function (view) {
    var resultView = Util.clone(view);
    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] == collectSymbol) {
            return 12;
        } else if (resultView[i] == extraCollectSymbol) {
            return 13;
        } else if (resultView[i] == addSymbol) {
            return 15;
        }
    }
    return 0;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol;
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

var ScatterPositions = function (view) {
    return SymbolPositions(view, scatter);
};

var SymbolPositions = function (view, symbol) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (view[i] == symbol) {
            result.push(i);
        }
    }
    return result;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result++;
        }
    }
    return result;
};

var RandomMoneySymbols = function (view, isFreeSpin = false) {
    if (NumberOfMoneySymbols(view) == 0) {
        var values = [];
        return values;
    }

    var values = DefaultMoneyCache().moneyValues;

    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            var index = 0;
            index = Util.random(0, 3);

            if (isFreeSpin) {
                index = Util.random(0, 6);
                //                        1                    
                if (Util.probability(1)) {
                    index = Util.random(0, moneySymbolValues.length);
                } else if (Util.probability(10)) {
                    index = Util.random(0, moneySymbolValues.length - 3);
                }
            }

            values[i] = moneySymbolValues[index];
        }
    }

    return values;
};

var WinFromView = function (view, bpl) {
    winLines = [];
    tumbling = [];
    var winLineIndex = 0;
    var winMoney = 0;
    for (var i = 0; i < view.length; i++) {
        if (tumbling.indexOf(i) < 0) {
            var line = [i];
            var symbolId = view[i];
            RecursiveSearch(view, i, line, symbolId);

            var matchCount = line.length;
            var money = payTable[matchCount][symbolId] * bpl;
            if (money > 0) {
                winLines.push(`${winLineIndex++}~${money}~${line.join('~')}`);
                for (var i = 0; i < line.length; i++) {
                    if (tumbling.indexOf(line[i]) < 0) {
                        tumbling.push(line[i]);
                    }
                }
            }

            winMoney += money;
        }
    }
    return winMoney;
};

var RecursiveSearch = function (view, pos, line, symbolId) {
    //                                                         
    var newPositions = [];
    var x = pos % slotWidth;
    var y = Math.floor(pos / slotWidth);
    if (x < slotWidth - 1) {
        var newPos = (x + 1) + slotWidth * y;
        newPositions.push(newPos);
    }
    if (y < slotHeight - 1) {
        var newPos = x + slotWidth * (y + 1);
        newPositions.push(newPos);
    }
    if (x > 0) {
        var newPos = (x - 1) + slotWidth * y;
        newPositions.push(newPos);
    }
    if (y > 0) {
        var newPos = x + slotWidth * (y - 1);
        newPositions.push(newPos);
    }

    for (var i = 0; i < newPositions.length; i++) {
        var nextPos = newPositions[i];
        var symbol = view[nextPos];
        if (symbol == symbolId || isWild(symbol)) {
            if (line.indexOf(nextPos) < 0) {
                line.push(nextPos);
                RecursiveSearch(view, nextPos, line, symbolId);
            }
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