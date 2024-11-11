var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus == "NOTUMBLE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.winMoney = 0;
    this.winLines = [];
    this.topView = [];
    this.boxView = [];
    this.topTumble = "";
    this.boxTumble = "";
    this.topLineAbove = 12;
    //          
    this.tumbleIndex = 0;
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    this.tumbleMulti = 1;

    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

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

var scatter = 1, wild = 2, empty = 13;
var slotWidth = 6, slotHeight = 8, winMulti = 1;
var winLines = [], tumblingPositions = [];
var baseReels = [
    [10, 12, 7, 4, 7, 4, 1, 10, 9, 6, 4, 8, 11, 9, 3, 11, 6, 10, 12, 12, 3, 7, 5, 5, 8, 12, 3, 3, 3, 3, 10, 4, 4, 11, 4, 9, 7, 5, 11, 7, 4, 9, 4, 10, 5, 3, 5, 12, 6, 12, 7, 11, 4, 4, 12, 9, 9, 5, 5, 5, 5, 6, 5, 9, 5, 10, 6, 8, 10, 6, 9, 4, 9, 11, 1, 10, 12, 7, 12, 4, 6, 6, 7, 12, 3, 9, 11, 8, 4, 4, 4, 4, 7, 4, 10, 6, 9, 7, 4, 4, 5, 3, 9, 9, 8, 8, 9, 7, 10, 12, 8, 7, 7, 10, 9, 6, 12, 3, 9, 7, 7, 7, 7, 5, 8, 3, 8, 7, 11, 10, 6, 12, 8, 3, 5, 10, 12, 5, 7, 8, 9, 12, 6, 10, 9, 10, 7, 12, 10, 12, 6, 10, 10, 10, 10, 11, 4, 10, 9, 10, 7, 8, 11, 8, 6, 8, 11, 5, 11, 12, 5, 8, 11, 8, 10, 9, 7, 10, 3, 9, 4, 4, 6, 6, 6, 6, 3, 10, 6, 3, 7, 11, 3, 5, 11, 4, 8, 5, 10, 12, 10, 8, 3, 10, 7, 11, 5, 3, 5, 8, 11, 10, 9, 4, 8, 8, 8, 8, 10, 12, 6, 10, 4, 12, 5, 7, 12, 11, 8, 5, 7, 9, 11, 4, 6, 12, 5, 7, 10, 9, 10, 6, 12, 10, 10, 9, 9, 9, 9, 5, 7, 3, 3, 11, 11, 12, 11, 4, 6, 4, 8, 7, 11, 9, 7, 12, 6, 8, 11, 5, 9, 6, 4, 11, 11, 4, 9, 12, 12, 12, 8, 12, 8, 12, 9, 7, 3, 12, 5, 8, 8, 7, 5, 9, 12, 5, 7, 5, 9, 10, 7, 4, 6, 6, 12, 10, 10, 11, 11, 11, 6, 12, 8, 12, 11, 6, 6, 8, 3, 1, 3, 7, 12, 3, 8, 5, 9, 11, 11, 4, 3, 3, 8, 6, 6, 8, 11, 1, 11],
    [10, 12, 4, 3, 12, 10, 5, 9, 3, 10, 7, 9, 11, 7, 4, 7, 5, 3, 4, 4, 11, 3, 3, 3, 3, 7, 7, 12, 8, 5, 9, 4, 6, 7, 5, 4, 11, 8, 12, 9, 5, 10, 8, 6, 8, 10, 6, 5, 5, 5, 5, 9, 4, 5, 8, 12, 9, 7, 5, 5, 6, 6, 12, 7, 9, 8, 10, 6, 8, 4, 8, 6, 8, 8, 4, 4, 4, 4, 11, 3, 9, 6, 3, 11, 12, 8, 6, 12, 6, 9, 8, 4, 12, 12, 9, 5, 10, 4, 12, 10, 7, 7, 7, 7, 12, 3, 12, 7, 12, 4, 8, 10, 9, 3, 6, 6, 10, 8, 7, 7, 10, 9, 7, 5, 12, 10, 10, 10, 10, 12, 11, 11, 12, 1, 5, 12, 7, 12, 3, 11, 3, 11, 9, 8, 7, 6, 6, 7, 11, 5, 1, 7, 6, 6, 6, 6, 11, 12, 3, 3, 10, 5, 11, 9, 5, 11, 10, 3, 10, 9, 4, 4, 6, 9, 12, 9, 11, 8, 8, 8, 8, 11, 7, 8, 3, 9, 10, 12, 3, 3, 9, 5, 4, 6, 10, 9, 1, 10, 8, 12, 10, 10, 11, 9, 9, 9, 9, 11, 4, 9, 9, 8, 6, 3, 10, 6, 4, 10, 6, 10, 8, 11, 5, 8, 4, 6, 4, 5, 9, 11, 12, 12, 12, 9, 7, 3, 10, 10, 12, 3, 12, 11, 12, 11, 6, 8, 7, 6, 4, 8, 11, 5, 10, 4, 8, 11, 11, 11, 6, 4, 11, 11, 5, 5, 8, 11, 7, 10, 10, 7, 5, 12, 10, 4, 7, 4, 12, 7, 5, 5, 9, 7],
    [8, 6, 3, 9, 12, 6, 6, 10, 7, 12, 6, 11, 10, 7, 5, 4, 7, 7, 4, 4, 11, 11, 8, 7, 3, 3, 3, 3, 12, 11, 9, 5, 9, 5, 5, 6, 8, 10, 8, 7, 7, 4, 10, 11, 10, 7, 10, 5, 8, 12, 5, 5, 9, 1, 5, 5, 5, 5, 12, 5, 3, 6, 8, 12, 4, 9, 9, 11, 8, 4, 10, 11, 6, 6, 12, 4, 11, 3, 6, 6, 9, 9, 10, 4, 4, 4, 4, 7, 6, 5, 11, 12, 8, 11, 1, 4, 5, 11, 8, 9, 7, 4, 11, 6, 10, 12, 8, 11, 4, 10, 11, 8, 3, 7, 7, 7, 7, 10, 4, 1, 3, 6, 8, 12, 3, 6, 5, 4, 10, 10, 8, 8, 12, 5, 9, 7, 8, 12, 7, 8, 4, 10, 10, 10, 10, 5, 4, 9, 12, 12, 9, 11, 7, 10, 6, 9, 12, 10, 7, 3, 3, 8, 4, 12, 12, 3, 8, 4, 10, 6, 6, 6, 6, 12, 4, 6, 8, 3, 3, 5, 7, 8, 7, 12, 10, 9, 8, 6, 11, 4, 12, 12, 7, 12, 12, 4, 4, 10, 8, 8, 8, 8, 7, 3, 4, 7, 11, 5, 3, 7, 5, 12, 7, 11, 10, 6, 12, 6, 9, 10, 9, 12, 9, 9, 3, 6, 10, 4, 9, 9, 9, 9, 11, 7, 8, 4, 6, 5, 9, 6, 5, 3, 3, 9, 12, 3, 8, 11, 9, 5, 12, 5, 8, 5, 11, 9, 11, 12, 12, 12, 6, 3, 10, 3, 4, 10, 8, 4, 11, 5, 3, 10, 10, 12, 10, 7, 9, 12, 8, 7, 10, 10, 5, 5, 10, 12, 11, 11, 11, 9, 11, 10, 8, 11, 11, 9, 7, 9, 11, 11, 7, 8, 6, 9, 8, 9, 7, 9, 5, 6, 11, 10, 4, 12, 5, 7],
    [11, 5, 7, 3, 9, 6, 3, 4, 5, 11, 7, 10, 9, 11, 4, 3, 9, 5, 7, 12, 6, 11, 3, 3, 3, 3, 6, 7, 8, 8, 4, 9, 12, 5, 6, 4, 9, 4, 10, 5, 10, 3, 3, 6, 4, 9, 7, 9, 8, 5, 5, 5, 5, 3, 10, 7, 10, 12, 8, 3, 6, 4, 10, 8, 8, 6, 4, 4, 3, 7, 9, 8, 7, 4, 11, 5, 4, 4, 4, 4, 6, 5, 8, 9, 4, 6, 9, 10, 11, 10, 8, 5, 10, 3, 7, 5, 12, 6, 11, 10, 11, 6, 9, 9, 7, 7, 7, 7, 4, 10, 7, 5, 7, 5, 5, 12, 3, 10, 7, 9, 3, 4, 10, 6, 12, 11, 5, 12, 9, 8, 8, 9, 10, 10, 10, 10, 8, 1, 7, 11, 10, 7, 11, 8, 7, 12, 10, 5, 7, 9, 4, 11, 8, 8, 7, 8, 8, 3, 6, 6, 6, 6, 11, 11, 6, 9, 6, 4, 9, 7, 5, 6, 12, 8, 9, 12, 12, 5, 9, 12, 8, 6, 11, 10, 9, 9, 8, 8, 8, 8, 7, 10, 12, 7, 6, 10, 11, 12, 3, 8, 4, 8, 4, 12, 5, 12, 9, 6, 7, 12, 10, 11, 11, 4, 9, 9, 9, 9, 6, 12, 4, 8, 10, 8, 3, 5, 5, 7, 12, 5, 7, 12, 9, 4, 8, 5, 10, 12, 4, 10, 12, 12, 12, 6, 11, 3, 11, 9, 7, 10, 12, 10, 8, 6, 3, 8, 6, 12, 9, 4, 10, 12, 9, 11, 6, 11, 7, 11, 11, 11, 8, 10, 4, 4, 10, 12, 1, 10, 11, 12, 11, 12, 7, 12, 3, 7, 10, 5, 6, 5, 11, 3, 3, 11],
    [7, 3, 7, 12, 9, 11, 8, 12, 7, 4, 5, 8, 10, 5, 4, 6, 10, 4, 7, 6, 11, 3, 5, 8, 8, 3, 3, 3, 3, 9, 5, 11, 4, 10, 10, 12, 8, 8, 11, 10, 9, 5, 6, 11, 5, 6, 8, 3, 6, 8, 4, 5, 1, 7, 11, 5, 5, 5, 5, 12, 11, 5, 3, 6, 12, 12, 4, 8, 8, 6, 12, 7, 8, 5, 10, 3, 4, 12, 12, 11, 3, 4, 11, 3, 7, 9, 4, 4, 4, 4, 9, 12, 5, 11, 7, 12, 7, 10, 3, 6, 5, 7, 12, 3, 8, 10, 4, 9, 3, 7, 8, 4, 9, 8, 6, 10, 7, 7, 7, 7, 5, 12, 9, 11, 1, 7, 3, 12, 8, 12, 9, 5, 11, 6, 7, 9, 9, 3, 7, 6, 9, 11, 12, 8, 8, 11, 10, 10, 10, 10, 12, 10, 8, 8, 6, 7, 11, 10, 3, 4, 6, 9, 10, 8, 7, 11, 10, 9, 3, 7, 10, 7, 9, 8, 12, 9, 6, 6, 6, 6, 9, 5, 9, 9, 5, 12, 12, 3, 7, 11, 9, 11, 10, 6, 6, 8, 11, 11, 3, 5, 4, 4, 11, 10, 5, 7, 11, 8, 8, 8, 8, 4, 5, 6, 12, 4, 4, 5, 10, 5, 9, 4, 5, 7, 11, 10, 12, 6, 8, 5, 10, 11, 9, 4, 10, 12, 10, 9, 9, 9, 9, 6, 7, 12, 8, 10, 4, 4, 12, 9, 12, 11, 7, 11, 3, 6, 8, 6, 11, 12, 10, 12, 4, 12, 10, 9, 4, 3, 12, 12, 12, 5, 8, 10, 12, 7, 9, 6, 7, 11, 6, 9, 4, 3, 3, 8, 7, 7, 8, 12, 11, 5, 5, 9, 6, 5, 4, 11, 11, 11, 12, 7, 9, 6, 8, 10, 7, 4, 6, 4, 9, 6, 10, 9, 10, 10, 4, 10, 12, 7, 8, 10, 3, 5, 10, 6, 10, 11],
    [6, 8, 7, 3, 7, 5, 6, 4, 7, 11, 6, 4, 8, 10, 4, 6, 4, 9, 9, 3, 3, 3, 3, 4, 11, 8, 10, 11, 8, 4, 4, 6, 3, 11, 10, 12, 5, 7, 9, 8, 8, 12, 5, 5, 5, 5, 3, 9, 3, 10, 7, 11, 7, 5, 6, 12, 8, 5, 10, 12, 5, 10, 3, 1, 8, 9, 4, 4, 4, 4, 10, 7, 8, 7, 3, 11, 6, 9, 10, 7, 7, 9, 6, 7, 10, 10, 7, 12, 10, 5, 7, 7, 7, 7, 10, 5, 10, 11, 10, 12, 9, 7, 10, 12, 5, 6, 9, 12, 6, 11, 5, 5, 10, 9, 10, 10, 10, 10, 9, 11, 1, 5, 7, 7, 9, 12, 11, 9, 6, 8, 8, 12, 8, 5, 4, 7, 8, 5, 6, 6, 6, 6, 12, 3, 7, 4, 4, 10, 11, 7, 11, 6, 4, 4, 9, 11, 4, 10, 3, 8, 12, 8, 8, 8, 8, 11, 3, 12, 7, 7, 8, 12, 8, 3, 8, 10, 11, 4, 11, 6, 4, 8, 8, 4, 3, 9, 9, 9, 9, 6, 9, 12, 11, 8, 6, 12, 6, 10, 9, 3, 9, 8, 4, 5, 10, 11, 12, 8, 12, 9, 12, 12, 12, 4, 11, 7, 11, 12, 4, 10, 5, 12, 12, 11, 9, 10, 12, 3, 9, 11, 5, 5, 11, 11, 11, 12, 10, 4, 7, 3, 6, 5, 6, 12, 6, 7, 4, 12, 6, 9, 9, 6, 5, 3, 9, 3, 10],
];
var freeReels = [
    [12, 8, 9, 10, 4, 10, 10, 9, 6, 5, 8, 7, 7, 6, 12, 9, 10, 5, 11, 11, 11, 6, 5, 7, 10, 11, 6, 6, 3, 9, 10, 7, 11, 12, 6, 11, 11, 4, 8, 3, 3, 3, 3, 12, 5, 8, 6, 12, 8, 9, 10, 12, 5, 11, 10, 3, 10, 7, 9, 11, 7, 11, 5, 5, 5, 5, 11, 11, 3, 8, 11, 6, 10, 10, 7, 9, 4, 11, 3, 12, 4, 6, 7, 12, 8, 4, 4, 4, 4, 7, 8, 5, 8, 12, 12, 11, 11, 6, 4, 12, 9, 3, 9, 11, 11, 5, 6, 4, 7, 7, 7, 7, 12, 9, 3, 3, 8, 4, 7, 4, 7, 8, 12, 10, 7, 6, 8, 5, 9, 3, 12, 6, 10, 10, 10, 10, 4, 5, 11, 9, 10, 12, 3, 11, 3, 9, 12, 4, 8, 8, 12, 8, 3, 6, 3, 6, 6, 6, 6, 11, 8, 12, 6, 5, 7, 5, 9, 7, 11, 11, 7, 6, 8, 8, 6, 1, 10, 12, 8, 8, 8, 8, 4, 12, 4, 9, 11, 7, 4, 10, 10, 12, 8, 5, 11, 10, 1, 4, 8, 10, 7, 8, 9, 9, 9, 9, 5, 12, 11, 9, 9, 3, 9, 9, 5, 9, 9, 10, 7, 6, 10, 4, 9, 4, 5, 12, 12, 12, 11, 3, 1, 10, 5, 7, 3, 5, 4, 12, 5, 5, 6, 7, 12, 3, 10, 8, 6, 3, 4],
    [4, 5, 9, 4, 3, 12, 12, 1, 6, 8, 8, 11, 9, 4, 7, 12, 8, 11, 11, 11, 4, 10, 5, 11, 12, 7, 4, 8, 7, 6, 4, 10, 12, 4, 8, 11, 7, 8, 6, 3, 3, 3, 3, 5, 8, 9, 10, 9, 8, 5, 8, 11, 9, 11, 5, 12, 12, 11, 10, 11, 11, 7, 11, 5, 5, 5, 5, 11, 9, 1, 12, 4, 9, 12, 7, 8, 12, 5, 10, 7, 11, 8, 6, 3, 1, 9, 4, 4, 4, 4, 10, 4, 7, 7, 3, 9, 7, 6, 3, 9, 3, 6, 5, 11, 9, 12, 6, 10, 11, 7, 7, 7, 7, 5, 7, 3, 12, 7, 9, 4, 8, 7, 10, 4, 6, 12, 9, 8, 11, 9, 7, 11, 12, 10, 10, 10, 10, 8, 8, 10, 10, 7, 3, 10, 8, 4, 6, 10, 9, 8, 12, 8, 12, 5, 12, 5, 6, 6, 6, 6, 5, 10, 10, 6, 7, 10, 10, 12, 6, 11, 10, 9, 9, 4, 3, 12, 11, 6, 7, 8, 8, 8, 8, 7, 10, 6, 9, 6, 10, 12, 5, 10, 9, 5, 11, 10, 3, 11, 8, 6, 5, 8, 9, 9, 9, 9, 12, 11, 11, 4, 12, 9, 5, 3, 8, 7, 3, 3, 11, 5, 12, 8, 3, 6, 3, 12, 12, 12, 6, 5, 4, 4, 3, 6, 3, 3, 6, 6, 5, 5, 7, 5, 4, 11, 9, 3, 12, 10, 4],
    [10, 11, 7, 12, 10, 7, 8, 11, 3, 6, 12, 12, 6, 6, 11, 11, 11, 3, 11, 10, 7, 12, 3, 9, 9, 5, 9, 3, 12, 11, 4, 7, 3, 3, 3, 3, 7, 4, 11, 7, 6, 10, 6, 5, 9, 7, 10, 3, 10, 5, 10, 5, 5, 5, 5, 8, 3, 7, 8, 1, 9, 4, 5, 6, 12, 5, 9, 4, 12, 7, 4, 4, 4, 4, 8, 6, 8, 11, 3, 9, 5, 11, 3, 5, 11, 10, 12, 3, 6, 7, 7, 7, 7, 8, 3, 8, 8, 4, 9, 7, 8, 5, 10, 5, 9, 10, 7, 5, 4, 10, 10, 10, 10, 8, 3, 12, 5, 4, 8, 9, 12, 10, 12, 11, 6, 11, 9, 4, 6, 6, 6, 6, 9, 11, 6, 5, 8, 9, 12, 6, 11, 8, 10, 5, 7, 4, 4, 8, 8, 8, 8, 9, 8, 12, 6, 11, 3, 6, 11, 4, 10, 11, 12, 3, 7, 12, 9, 9, 9, 9, 11, 12, 7, 12, 6, 5, 6, 10, 6, 11, 10, 9, 3, 8, 4, 12, 12, 12, 10, 10, 9, 11, 7, 4, 5, 8, 9, 5, 1, 4, 7, 12, 12, 11, 8],
    [3, 10, 10, 12, 10, 7, 11, 10, 5, 6, 7, 7, 5, 11, 3, 10, 3, 9, 12, 11, 11, 11, 9, 7, 8, 10, 6, 11, 5, 11, 9, 5, 5, 6, 4, 12, 9, 12, 4, 4, 1, 3, 3, 3, 3, 10, 11, 9, 9, 10, 4, 6, 6, 11, 4, 3, 4, 5, 10, 6, 4, 5, 5, 6, 5, 5, 5, 5, 1, 7, 3, 10, 10, 3, 12, 8, 12, 8, 12, 9, 8, 7, 4, 8, 9, 5, 11, 7, 5, 4, 4, 4, 4, 8, 6, 5, 9, 10, 12, 12, 3, 8, 7, 9, 8, 10, 5, 7, 4, 11, 4, 1, 4, 7, 7, 7, 7, 4, 12, 9, 7, 10, 11, 11, 8, 10, 11, 3, 12, 8, 8, 9, 3, 10, 8, 5, 11, 10, 10, 10, 10, 6, 12, 10, 4, 8, 9, 11, 6, 11, 8, 10, 6, 3, 11, 11, 9, 6, 7, 7, 11, 6, 6, 6, 6, 7, 9, 9, 5, 3, 4, 11, 10, 3, 8, 10, 5, 6, 12, 12, 6, 5, 11, 6, 12, 8, 8, 8, 8, 3, 7, 8, 8, 10, 12, 12, 7, 3, 3, 9, 3, 6, 11, 7, 7, 3, 6, 12, 5, 9, 9, 9, 9, 6, 12, 9, 10, 5, 9, 8, 10, 12, 7, 3, 5, 8, 9, 4, 11, 8, 9, 4, 7, 12, 12, 12, 8, 6, 12, 7, 11, 11, 4, 8, 4, 9, 6, 7, 12, 11, 12, 4, 12, 6, 3, 12, 5, 9],
    [12, 3, 7, 12, 8, 4, 4, 3, 8, 12, 10, 6, 6, 4, 4, 6, 8, 9, 12, 12, 6, 3, 8, 10, 5, 11, 11, 11, 10, 12, 3, 5, 11, 10, 12, 3, 9, 9, 5, 10, 11, 12, 10, 7, 12, 4, 4, 10, 12, 8, 11, 5, 7, 3, 3, 3, 3, 8, 6, 12, 6, 9, 4, 4, 6, 11, 5, 1, 7, 12, 12, 8, 12, 7, 8, 5, 4, 10, 9, 9, 7, 3, 4, 5, 5, 5, 5, 10, 6, 5, 11, 9, 12, 11, 1, 9, 8, 10, 9, 10, 6, 3, 10, 12, 5, 9, 5, 1, 3, 4, 7, 9, 10, 4, 4, 4, 4, 5, 12, 10, 3, 9, 10, 11, 6, 10, 3, 8, 5, 5, 8, 4, 7, 3, 3, 6, 7, 10, 8, 3, 8, 9, 10, 7, 7, 7, 7, 8, 8, 10, 8, 12, 5, 8, 7, 12, 5, 9, 7, 12, 10, 11, 7, 9, 11, 5, 9, 7, 7, 6, 8, 11, 6, 10, 10, 10, 10, 5, 12, 11, 7, 10, 4, 5, 9, 6, 7, 6, 5, 4, 7, 7, 5, 6, 12, 7, 5, 3, 4, 6, 11, 11, 10, 6, 6, 6, 6, 7, 4, 6, 5, 3, 8, 4, 11, 7, 5, 12, 10, 9, 11, 10, 4, 11, 12, 8, 7, 9, 11, 12, 12, 9, 7, 8, 8, 8, 8, 3, 5, 11, 11, 6, 3, 10, 9, 11, 3, 11, 5, 9, 12, 10, 11, 3, 6, 11, 12, 12, 3, 10, 11, 7, 9, 9, 9, 9, 10, 5, 11, 9, 8, 9, 4, 3, 6, 5, 3, 11, 9, 8, 7, 6, 12, 8, 11, 8, 7, 3, 6, 9, 11, 12, 12, 12, 4, 6, 9, 10, 8, 11, 8, 9, 7, 10, 6, 4, 9, 12, 9, 11, 4, 8, 4, 6, 6, 8, 8, 3, 5, 11, 4],
    [10, 10, 8, 7, 3, 12, 3, 11, 10, 5, 1, 8, 11, 11, 10, 9, 8, 3, 12, 6, 11, 11, 11, 10, 6, 12, 11, 9, 7, 12, 3, 9, 10, 9, 5, 8, 5, 7, 5, 12, 4, 4, 5, 7, 10, 12, 3, 3, 3, 3, 11, 8, 11, 10, 7, 4, 9, 12, 11, 4, 12, 8, 8, 10, 3, 4, 5, 9, 5, 7, 11, 4, 5, 5, 5, 5, 4, 9, 4, 7, 11, 8, 8, 10, 12, 8, 6, 6, 9, 4, 12, 4, 7, 12, 12, 7, 8, 6, 11, 4, 4, 4, 4, 5, 3, 3, 10, 11, 3, 3, 11, 3, 11, 5, 11, 10, 11, 7, 3, 10, 8, 7, 10, 10, 9, 7, 7, 7, 7, 6, 9, 3, 12, 9, 10, 11, 9, 11, 8, 5, 12, 3, 6, 6, 10, 4, 5, 11, 6, 4, 11, 8, 10, 10, 10, 10, 4, 6, 7, 11, 12, 4, 9, 5, 9, 4, 6, 7, 4, 5, 10, 7, 5, 6, 3, 6, 8, 9, 6, 6, 6, 6, 8, 5, 5, 8, 5, 8, 9, 12, 12, 3, 9, 3, 4, 6, 12, 12, 9, 4, 4, 8, 8, 10, 12, 8, 8, 8, 8, 12, 4, 10, 4, 7, 3, 6, 12, 10, 6, 12, 9, 1, 9, 11, 9, 9, 7, 8, 6, 6, 11, 9, 9, 9, 9, 7, 5, 7, 5, 6, 9, 5, 10, 9, 3, 6, 12, 7, 10, 6, 12, 5, 11, 8, 11, 8, 6, 10, 12, 12, 12, 9, 7, 11, 12, 3, 11, 8, 6, 11, 7, 7, 12, 10, 11, 7, 8, 8, 3, 9, 3, 5, 10, 5],
];
var topReels = [11, 5, 6, 11, 9, 5, 11, 7, 9, 5, 11, 9, 3, 4, 9, 9, 7, 3, 5, 9, 5, 3, 11, 5, 7, 5, 9, 3, 5, 3, 7, 11, 5, 7, 7, 3, 11, 11, 9, 7, 11, 5, 3, 11, 3, 7, 11, 9, 3, 9, 5, 11, 7, 5, 9, 5, 9, 7, 5, 4, 8, 9, 11, 3, 9, 3, 9, 7, 7, 5, 9, 7, 11, 9, 5, 7, 3, 3, 5, 3, 3, 5, 11, 3, 3, 9, 9, 5, 7, 7, 5, 11, 3, 11, 5, 5, 9, 3, 7, 11, 9, 9, 11, 11, 5, 5, 9, 7, 5, 9, 11, 3, 5, 9, 11, 5, 3, 9, 5, 9, 9, 5, 3, 11, 11, 7, 5, 5, 11, 9, 9, 11, 3, 11, 7, 9, 11, 5, 7, 3, 5, 7, 9, 9, 11, 9, 11, 9, 7, 11, 7, 9, 11, 11, 7, 11, 9, 3, 9, 3, 9, 5, 7, 3, 7, 5, 9, 9, 7, 11];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 14, 12, 10, 8, 6, 6, 6, 4, 4, 0],
    [0, 0, 0, 40, 24, 16, 14, 12, 10, 8, 8, 6, 6, 0],
    [0, 0, 0, 100, 50, 30, 24, 20, 14, 12, 10, 8, 8, 0],
    [0, 0, 0, 500, 100, 50, 40, 30, 20, 18, 16, 12, 10, 0],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

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

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        this.view = this.tumbleCacheList[0];
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;

        this.view = this.freeSpinCacheList[0];

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    }

    winMulti = 1;
    this.tumbleMulti = 1;

    this.maskView = GetMaskView(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.scatterWin = ScatterWinFromView(this.view, Number(player.betPerLine * this.lineCount));
    this.winMoney += this.scatterWin;
    this.winLines = GetWinLines(winLines);

    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    var topTumblePositions = [],
        boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);
    this.topLineAbove = Util.random(wild, empty);

    //                       
    if (this.winMoney - this.scatterWin > 0) {
        this.tumbleMulti = 1;
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    if (isFreeSpinWin(this.view)) {
        this.tumbleMulti = 1;
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.scatterPositions = ScatterPositions(this.view);
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player, true);

        if (this.tumbleStatus == "NOTUMBLE") {
            this.freeSpinWinMoney += this.tmb_res;

            if (this.freeSpinIndex >= this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }

        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = this.tumbleCacheList[0];
    this.maskView = GetMaskView(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    winMulti = this.tumbleMulti;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = GetWinLines(winLines);

    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    var topTumblePositions = [];
    var boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);

    this.topLineAbove = Util.random(wild, empty);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

    winMulti = 1;
    if (baseWin > 0) {
        var { viewList, tumbleWinMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
    } else {
        var { viewList, tumbleWinMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
    }

    return pattern;
};

SlotMachine.prototype.Tumbling = function (player, isFreeSpin = false) {
    this.view = this.tumbleCacheList[this.tumbleIndex];
    this.maskView = [];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.tumbleMulti++;
    winMulti = this.tumbleMulti;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = GetWinLines(winLines);

    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    var topTumblePositions = [],
        boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);

    this.tmb_res += this.winMoney;
    this.topLineAbove = Util.random(wild, empty);

    this.tumbleIndex++;

    //                 
    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
    }
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
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);
    var freeSpinCount = GetFreeSpinCount(scatterView);
    var freeSpinData = {
        length: freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWinMoney, freeSpinData.length);

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
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);
    var freeSpinCount = GetFreeSpinCount(scatterView);
    var freeSpinData = {
        length: freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = BuyBonusViewCache(freeReels, bpl, freeSpinData.length, (totalBet * this.buyMulti) / 5 - scatterWinMoney);

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
    var bottomLimit = 0,
        calcCount = 0;
    while (true) {
        var tumbleWinMoney = 0;
        var tempView = RandomView(reels);
        var view = GetWildView(tempView);

        tumbleWinMoney = WinFromView(view, bpl);
        winMulti = 1;
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
        
        if (tumbleWinMoney == 0) {
            continue;
        }
        var viewList = [view];

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumblingPositions);
            var newView = GetTumbleView(lastView, lastTumbling);
            if (isFreeSpinWin(newView)) {
                continue;
            }

            winMulti++;
            var nWinMoney = WinFromView(newView, bpl);
            viewList.push(newView);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            return { viewList, tumbleWinMoney };
        }
        
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var tempView = RandomView(reels);
        var view = GetWildView(tempView);

        var winMoney = WinFromView(view, bpl);
        if (winMoney == 0) {
            var viewList = [];
            viewList.push(view);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
        }
    }
};

var RandomView = function (reels, reelSizes = [], isFreeSpin = false) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(2, slotHeight) + 1;
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

        var topIndex = Util.random(0, topReels.length);
        for (var i = 0; i < slotWidth; i++) {
            randomView[i] = topReels[(topIndex + i) % topReels.length];
        }

        randomView[0] = empty;
        randomView[slotWidth - 1] = empty;

        if (isDoubleScatterInLine(randomView)) {
            continue;
        }

        if (isFreeSpin) {
            if (!isScatterWin(randomView)) {
                break;
            }
        } else {
            if (!isFreeSpinWin(randomView)) {
                break;
            }
        }
    }

    return randomView;
};

var RandomScatterView = function (reels, bpl) {
    var view = [];
    while (true) {
        view = RandomView(reels);
        if (NumberOfScatters(view) == 0 && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    var reelPos = [0, 1, 2, 3, 4, 5];
    Util.shuffle(reelPos);

    var nScatters;
    if (Util.probability(80)) {
        nScatters = 4;
    } else if (Util.probability(80)) {
        nScatters = 5;
    } else {
        nScatters = 6;
    }

    for (var i = 0; i < nScatters; i++) {
        var reelNo = reelPos[i];
        var reelSize;
        for (reelSize = 1; reelSize < slotHeight; reelSize++) {
            var pos = reelNo + reelSize * slotWidth;
            if (view[pos] == empty) {
                break;
            }
        }
        // var top = 0;
        // if (reelNo == 0 || reelNo == slotWidth - 1) {
        //     top = 1;
        // }
        var top = 1;
        var pos = reelNo + Util.random(top, reelSize) * slotWidth;
        view[pos] = scatter;
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
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen)

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
        var freeSpinCacheList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        winMulti = 1;

        while (true) {
            var tempView = RandomView(reels, [], true);
            var view = GetWildView(tempView);

            var tumbleWinMoney = WinFromView(view, bpl);
            var viewList = [view];
            //                       
            if (tumbleWinMoney > 0) {
                while (true) {
                    var lastView = viewList[viewList.length - 1];
                    var lastTumbling = Util.clone(tumblingPositions);
                    var newView = GetTumbleView(lastView, lastTumbling);

                    if (isScatterWin(newView)) {
                        continue;
                    }

                    winMulti++;
                    var nWinMoney = WinFromView(newView, bpl);
                    viewList.push(newView);
                    tumbleWinMoney += nWinMoney;

                    //                 
                    if (nWinMoney == 0) {
                        break;
                    }
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
            viewList: freeSpinCacheList,
        };

        if (freeSpinData.win > lowLimit) {
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
    tumblingPositions = [];
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
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (length == slotWidth) {
        var winMoney = bpl * payTable[length][symbolId] * count * winMulti;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
                multi: winMulti,
            };
            winLines.push(winLineCache);

            for (var i = 0; i < history.length; i++) {
                var pos = history[i];
                if (tumblingPositions.indexOf(pos) < 0) {
                    tumblingPositions.push(pos);
                }
            }
        }
        return winMoney;
    }

    //                                                                                            
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = length + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var winMoney = bpl * payTable[length][symbolId] * count * winMulti;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
                multi: winMulti,
            };
            winLines.push(winLineCache);

            for (var i = 0; i < history.length; i++) {
                var pos = history[i];
                if (tumblingPositions.indexOf(pos) < 0) {
                    tumblingPositions.push(pos);
                }
            }
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

var GetTumbles = function (view, positions) {
    var tumbles = [];
    for (var i = 0; i < positions.length; i++) {
        var tumblePos = positions[i];
        if (tumblePos < 0 || tumblePos >= view.length) {
            continue;
        }
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    if (tumbles.length == 0) {
        return "";
    }
    return tumbles.join("~");
};

var GetTumbleView = function (view, tumbles) {
    while (true) {
        var tumbleView = Util.clone(view);

        //                                
        for (var i = slotWidth - 1; i >= 1; i--) {
            //                                    
            if (tumbles.indexOf(i) >= 0 && tumbleView[i] != empty) {
                for (var j = i + 1; j < slotWidth - 1; j++) {
                    tumbleView[j - 1] = tumbleView[j];
                }
                tumbleView[slotWidth - 2] = -1;
            }
        }

        //                                             
        for (var i = 0; i < slotWidth; i++) {
            //                                         
            for (var j = 1; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                if (view[pos] == empty) {
                    break;
                }
                //                                    
                if (tumbles.indexOf(pos) >= 0 && tumbleView[pos] != empty) {
                    for (var k = j - 1; k >= 1; k--) {
                        tumbleView[i + (k + 1) * slotWidth] = tumbleView[i + k * slotWidth];
                    }
                    tumbleView[i + slotWidth] = -1;
                }
            }
        }

        var reelSizes = [8, 8, 8, 8, 8, 8];
        var randomView = RandomView(baseReels, reelSizes, true);

        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
            }
        }
        tumbleView[0] = empty;
        tumbleView[slotWidth - 1] = empty;

        if (isDoubleScatterInLine(tumbleView)) {
            continue;
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

var GetWildView = function (view) {
    var finalView = Util.clone(view);

    if (Util.probability(5)) {
        var wildReelIndex = Util.random(1, slotWidth);
        for (var i = 1; i < slotHeight; i++) {
            var pos = i * slotWidth + wildReelIndex;
            if (view[pos] != empty) finalView[pos] = wild;
        }
    }

    return finalView;
};

var GetMaskView = function (view) {
    var maskView = [];

    for (var i = 0; i < slotWidth; i++) {
        var pos = i + slotWidth;
        if (view[pos] == wild) {
            var wildArr = [];
            maskView = Util.clone(view);

            for (var j = 1; j < slotHeight; j++) {
                var wildPos = j * slotWidth + i;
                if (view[wildPos] != empty) {
                    wildArr.push(wildPos);
                    maskView[wildPos] = Util.random(3, 13);
                }
            }

            var randPos = wildArr[Util.random(0, wildArr.length)];
            maskView[randPos] = wild;
        }
    }

    return maskView;
};

var GetWinLines = function (winLines) {
    var lines = [];
    for (var i = 0; i < winLines.length; i++) {
        var cache = winLines[i];
        lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~${cache.multi}`);
    }
    return lines.join(";");
};

var ScatterWinFromView = function (view, totalBet) {
    var win = 0;

    var nScatters = NumberOfScatters(view);
    if (nScatters == 4) {
        win = totalBet * 5;
    } else if (nScatters == 5) {
        win = totalBet * 10;
    } else if (nScatters == 6) {
        win = totalBet * 100;
    }

    return win;
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

var GetFreeSpinCount = function (scatterView) {
    var freeSpinCount = 0;
    var scatterCount = NumberOfScatters(scatterView);

    if (scatterCount == 4) {
        freeSpinCount = 12;
    } else if (scatterCount == 5) {
        freeSpinCount = 16;
    } else if (scatterCount == 6) {
        freeSpinCount = 20;
    }

    return freeSpinCount;
};

var isDoubleScatterInLine = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var numberOfScattersOfLine = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (isScatter(view[i + j * slotWidth])) {
                numberOfScattersOfLine++;
            }
        }
        if (numberOfScattersOfLine > 1) {
            return true;
        }
    }
    return false;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 4;
};

var isScatterWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isWild = function (symbol) {
    return symbol == wild;
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

var isScatter = function (symbol) {
    return symbol == scatter;
};

module.exports = SlotMachine;