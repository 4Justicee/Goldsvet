var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 30;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //           
    this.reelNo = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 5;
    this.freeSpinWinMoney = 0;
    this.fsWinMoney = 0;
    this.freeSpinCacheList = [];
    //                     
    this.tumbleStatus = "NOTUMBLE"
    this.prevTumbleStatus = "NOTUMBLE"
    this.tumbleIndex = 0;
    this.tumbles = "";
    this.tmb_res = 0;
    this.tumbleCacheList = [];

    this.originView = [];
    this.brokenSymbolInfos = "";
    this.mysterySymbol = 0;
    this.replacingInfos = "";

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var wild = 2;
var slotWidth = 5, slotHeight = 6;
var baseReels = [
    [
        [7, 7, 10, 10, 4, 10, 10, 7, 7, 10, 6, 5, 7, 7, 9, 9, 3, 8, 8, 6, 6, 10, 10],
        [9, 9, 9, 6, 9, 9, 3, 3, 6, 5, 5, 7, 8, 8, 9, 9, 8, 4, 10, 10, 7, 5, 5],
        [6, 4, 4, 8, 8, 4, 4, 8, 9, 8, 8, 6, 6, 6, 9, 9, 6, 6, 3, 7, 7, 10, 10, 10, 6, 6, 7, 10, 8, 8, 5, 4],
        [6, 6, 3, 3, 9, 9, 4, 4, 8, 8, 4, 4, 7, 7, 4, 4, 4, 6, 6, 7, 7, 8, 8, 5, 5, 10, 10, 6, 6, 8, 8, 3, 3, 9, 9, 10, 10, 5, 5, 8, 8, 5, 5, 10, 10, 6, 6, 7, 7, 10, 10, 6, 6, 10, 10, 3, 3, 4, 4, 5, 5, 8, 8, 9, 9, 7, 7, 9, 9, 10, 10, 9, 9, 3, 3, 4, 4, 7, 7, 3, 3],
        [3, 3, 7, 7, 6, 6, 5, 5, 8, 8, 6, 6, 9, 9, 8, 8, 10, 10, 7, 7, 3, 3, 10, 10, 5, 5, 4, 4, 8, 8, 4, 4, 5, 5, 9, 9, 10, 10, 6, 6, 8, 8, 7, 7, 6, 6, 10, 10, 9, 9, 4, 4, 4, 3, 3, 5, 5, 10, 10, 3, 3, 7, 7, 8, 8, 10, 10, 7, 7, 9, 9, 3, 3, 6, 6, 4, 4, 9, 9]
    ],
    [
        [4, 5, 5, 9, 9, 3, 3, 6, 8, 8, 5, 5, 8, 3, 3, 7, 9, 9, 9, 4, 10, 10, 9, 9],
        [9, 9, 5, 4, 4, 7, 10, 10, 10, 6, 6, 6, 8, 8, 4, 8, 8, 6, 6, 3, 8, 5, 6, 7, 7, 9, 10, 6, 6],
        [5, 3, 7, 7, 6, 10, 10, 9, 9, 6, 6, 10, 4, 8, 8, 5, 4, 10, 10, 7, 7],
        [4, 4, 10, 10, 7, 7, 3, 3, 7, 7, 3, 3, 6, 6, 7, 7, 9, 9, 8, 8, 7, 7, 8, 8, 10, 10, 8, 8, 10, 10, 9, 9, 5, 5, 4, 4, 6, 6, 4, 4, 6, 6, 7, 7, 9, 9, 5, 5, 10, 10, 8, 8, 9, 9, 8, 8, 6, 6, 4, 4, 3, 3, 6, 6, 9, 9, 6, 6, 10, 10, 9, 9, 10, 10, 7, 7, 3, 3, 5, 5, 4, 4, 4, 3, 3, 5, 5],
        [10, 10, 3, 3, 8, 8, 7, 7, 3, 3, 7, 7, 8, 8, 9, 9, 7, 7, 6, 6, 4, 4, 7, 7, 10, 10, 3, 3, 9, 9, 4, 4, 4, 6, 6, 9, 9, 4, 4, 5, 5, 4, 4, 8, 8, 10, 10, 6, 6, 10, 10, 5, 5, 6, 6, 10, 10, 8, 8, 3, 3, 6, 6, 9, 9, 7, 7, 9, 9, 3, 3, 5, 5, 6, 6, 8, 8, 10, 10, 9, 9, 5, 5, 7, 7]
    ],
    [
        [6, 6, 9, 6, 6, 6, 4, 6, 5, 8, 8, 3, 4, 4, 10, 10, 10, 9, 9, 8, 8, 7, 7, 10, 4, 4, 8, 7],
        [7, 7, 10, 10, 7, 7, 6, 10, 4, 6, 6, 4, 8, 8, 5, 3, 10, 10, 9, 9, 5],
        [8, 7, 5, 5, 9, 9, 4, 3, 3, 5, 5, 9, 9, 9, 10, 10, 7, 9, 9, 8, 8, 4, 3, 3, 6],
        [4, 4, 9, 9, 6, 6, 10, 10, 6, 6, 3, 3, 10, 10, 4, 4, 8, 8, 6, 6, 9, 9, 10, 10, 5, 5, 6, 6, 5, 5, 6, 6, 3, 3, 9, 9, 10, 10, 7, 7, 10, 10, 8, 8, 7, 7, 5, 5, 4, 4, 4, 8, 8, 6, 6, 3, 3, 9, 9, 3, 3, 4, 4, 7, 7, 3, 3, 4, 4, 5, 5, 7, 7, 10, 10, 8, 8, 7, 7, 8, 8, 9, 9],
        [10, 10, 7, 7, 4, 4, 8, 8, 9, 9, 8, 8, 5, 5, 7, 7, 3, 3, 6, 6, 9, 9, 10, 10, 8, 8, 5, 5, 6, 6, 4, 4, 5, 5, 7, 7, 8, 8, 4, 4, 7, 7, 6, 6, 8, 8, 9, 9, 3, 3, 9, 9, 10, 10, 9, 9, 10, 10, 3, 3, 6, 6, 3, 3, 5, 5, 10, 10, 7, 7, 4, 4, 7, 7, 9, 9, 3, 3, 6, 6, 4, 4, 4, 10, 10, 8, 8]
    ],
    [
        [6, 6, 7, 7, 6, 6, 9, 9, 7, 7, 6, 6, 9, 9, 7, 7, 10, 10, 4, 4, 9, 9, 4, 4, 7, 7, 6, 6, 9, 9, 7, 7, 8, 8, 4, 4, 6, 6, 3, 3, 5, 5, 9, 9, 8, 8, 10, 10],
        [9, 9, 3, 3, 9, 9, 4, 4, 6, 6, 7, 7, 9, 9, 10, 10, 6, 6, 7, 7, 5, 5, 9, 9, 8, 8, 6, 6, 4, 4, 9, 9, 10, 10, 6, 6, 7, 7, 4, 4, 7, 7],
        [8, 8, 3, 3, 8, 8, 8, 10, 10, 9, 8, 8, 5, 5, 4, 4, 10, 10, 6, 6, 9, 9, 9, 5, 5, 7, 7, 10, 10],
        [8, 8, 7, 7, 8, 8, 9, 9, 4, 4, 9, 9, 8, 8, 10, 10, 6, 6, 8, 8, 5, 5, 3, 3, 10, 10, 7, 7],
        [5, 5, 8, 8, 6, 6, 4, 4, 6, 6, 3, 3, 6, 6, 9, 9, 8, 8, 3, 3, 10, 10, 9, 9, 8, 8, 7, 7, 10, 10, 7, 7, 8, 8]
    ],
    [
        [5, 5, 5, 8, 8, 4, 4, 4, 8, 8, 8, 10, 10, 10, 10, 6, 6, 6, 5, 5, 8, 8, 8, 7, 7, 7, 3, 3, 3, 9, 9, 9, 9],
        [4, 4, 10, 10, 10, 6, 6, 6, 10, 10, 10, 8, 8, 8, 8, 4, 4, 4, 10, 10, 5, 5, 5, 9, 9, 9, 9, 3, 3, 3, 7, 7, 7],
        [7, 7, 7, 9, 9, 4, 4, 4, 9, 9, 9, 10, 10, 10, 10, 3, 3, 3, 5, 5, 5, 7, 7, 6, 6, 6, 8, 8, 8, 8],
        [6, 6, 6, 3, 3, 3, 7, 7, 7, 10, 10, 10, 8, 8, 8, 5, 5, 5, 9, 9, 9, 4, 4, 4, 5, 5, 3, 3, 3],
        [4, 4, 10, 10, 10, 9, 9, 9, 8, 8, 8, 5, 5, 5, 7, 7, 7, 4, 4, 4, 3, 3, 3, 6, 6, 6]
    ],
    [
        [8, 8, 8, 11, 11, 7, 7, 3, 3, 6, 6, 6, 7, 7, 7, 10, 10, 10, 11, 11, 8, 8, 11, 11, 6, 6, 4, 4, 8, 8, 8, 9, 9, 11, 11, 5, 5, 5],
        [5, 5, 5, 8, 8, 11, 11, 7, 7, 7, 6, 6, 7, 7, 4, 4, 11, 11, 9, 9, 11, 11, 6, 6, 6, 10, 10, 10, 3, 3, 9, 9, 9, 11, 11, 9, 9, 9],
        [11, 11, 6, 6, 6, 11, 11, 10, 10, 6, 6, 10, 10, 10, 7, 7, 3, 3, 11, 11, 5, 5, 5, 8, 8, 8, 7, 7, 7, 11, 11, 4, 4, 10, 10, 10, 9, 9],
        [9, 9, 10, 10, 8, 8, 8, 7, 7, 7, 8, 8, 6, 6, 5, 5, 5, 9, 9, 3, 3, 10, 10, 10, 7, 7, 4, 4, 11, 11, 4, 4, 4, 6, 6, 6, 5, 5],
        [4, 4, 4, 7, 7, 7, 5, 5, 5, 10, 10, 10, 6, 6, 6, 9, 9, 5, 5, 7, 7, 9, 9, 11, 11, 8, 8, 8, 4, 4, 10, 10, 3, 3, 8, 8, 9, 9, 9, 6, 6]
    ],
    [
        [11, 11, 8, 8, 8, 11, 11, 9, 9, 6, 6, 3, 11, 11, 8, 8, 7, 7, 7, 5, 5, 5, 7, 7, 4, 4, 10, 10, 10, 8, 8, 8, 11, 11, 11, 6, 6, 6],
        [11, 11, 9, 9, 8, 8, 11, 11, 10, 10, 10, 11, 11, 4, 4, 7, 7, 6, 6, 6, 11, 11, 11, 5, 5, 5, 3, 3, 9, 9, 9, 6, 6, 11, 11, 9, 9, 9],
        [7, 7, 7, 11, 11, 5, 5, 11, 11, 11, 6, 6, 8, 8, 8, 10, 10, 10, 7, 7, 10, 10, 6, 6, 6, 9, 9, 10, 10, 10, 3, 3, 11, 11, 4, 4, 11, 11],
        [10, 10, 10, 11, 11, 5, 5, 9, 9, 6, 6, 6, 3, 3, 8, 8, 8, 10, 10, 7, 7, 4, 4, 3, 3, 3, 9, 9, 7, 7, 7, 8, 8, 6, 6, 5, 5, 5],
        [3, 3, 3, 6, 6, 9, 9, 5, 5, 5, 9, 9, 7, 7, 9, 9, 9, 6, 6, 6, 7, 7, 7, 10, 10, 10, 8, 8, 10, 10, 8, 8, 8, 5, 5, 3, 3, 4, 4, 11, 11]
    ],
    [
        [8, 8, 11, 11, 10, 10, 10, 11, 11, 6, 6, 3, 3, 9, 9, 11, 11, 11, 7, 7, 7, 5, 5, 8, 8, 8, 4, 4, 4, 6, 6, 6, 11, 11, 8, 8, 8, 7, 7],
        [9, 9, 9, 11, 11, 9, 9, 9, 11, 11, 11, 10, 10, 10, 7, 7, 7, 6, 6, 5, 5, 9, 9, 3, 3, 11, 11, 9, 9, 7, 7, 8, 8, 11, 11, 4, 4, 4],
        [5, 5, 4, 4, 4, 7, 7, 7, 11, 11, 3, 3, 11, 11, 6, 6, 11, 11, 7, 7, 10, 10, 10, 9, 9, 11, 11, 10, 10, 10, 6, 6, 6, 8, 8, 8, 10, 10],
        [9, 9, 4, 4, 4, 6, 6, 6, 11, 11, 6, 6, 5, 5, 7, 7, 7, 10, 10, 3, 3, 10, 10, 10, 8, 8, 8, 4, 4, 8, 8, 9, 9, 7, 7, 3, 3, 3],
        [9, 9, 9, 3, 3, 3, 11, 11, 4, 4, 4, 10, 10, 5, 5, 3, 3, 10, 10, 10, 8, 8, 8, 7, 7, 7, 8, 8, 9, 9, 6, 6, 6, 7, 7, 9, 9, 6, 6, 4, 4]
    ],
    [
        [8, 8, 8, 7, 7, 11, 11, 6, 6, 5, 5, 11, 11, 11, 4, 4, 8, 8, 11, 11, 3, 3, 10, 10, 10, 8, 8, 8, 9, 9, 5, 5, 5, 11, 11],
        [9, 9, 7, 7, 7, 11, 11, 8, 8, 4, 4, 6, 6, 9, 9, 9, 11, 11, 9, 9, 9, 10, 10, 10, 11, 11, 3, 3, 5, 5, 11, 11, 11, 5, 5, 5, 9, 9, 7, 7],
        [10, 10, 11, 11, 7, 7, 7, 6, 6, 4, 4, 4, 10, 10, 10, 5, 5, 11, 11, 8, 8, 8, 11, 11, 11, 7, 7, 10, 10, 10, 3, 3, 11, 11, 9, 9, 11, 11],
        [4, 4, 11, 11, 8, 8, 8, 9, 9, 6, 6, 9, 9, 7, 7, 7, 3, 3, 10, 10, 10, 4, 4, 4, 5, 5, 5, 8, 8, 3, 3, 3, 5, 5, 7, 7, 10, 10],
        [10, 10, 10, 9, 9, 4, 4, 4, 3, 3, 3, 5, 5, 3, 3, 8, 8, 9, 9, 9, 7, 7, 7, 5, 5, 5, 7, 7, 11, 11, 9, 9, 6, 6, 4, 4, 10, 10, 8, 8, 8]
    ],
    [
        [11, 11, 9, 9, 11, 11, 5, 5, 5, 11, 11, 11, 8, 8, 4, 4, 6, 6, 10, 10, 10, 7, 7, 8, 8, 8, 3, 3, 5, 5, 11, 11, 8, 8, 8, 6, 6, 6],
        [5, 5, 5, 9, 9, 9, 8, 8, 9, 9, 9, 10, 10, 10, 3, 6, 6, 11, 11, 11, 6, 6, 6, 9, 9, 11, 11, 7, 7, 4, 4, 4, 11, 11, 5, 5, 11, 11, 9, 9],
        [6, 6, 6, 11, 11, 11, 7, 11, 11, 9, 9, 10, 10, 10, 4, 4, 4, 3, 3, 5, 5, 8, 8, 8, 11, 11, 10, 10, 10, 5, 5, 5, 6, 6, 10, 10, 11, 11],
        [4, 4, 8, 8, 8, 7, 7, 8, 3, 3, 3, 9, 9, 4, 4, 4, 3, 3, 10, 10, 5, 5, 5, 6, 6, 9, 9, 11, 11, 11, 10, 10, 10, 11, 11, 6, 6, 6, 5, 5],
        [6, 6, 9, 9, 6, 6, 6, 10, 10, 5, 5, 5, 3, 3, 3, 4, 4, 3, 3, 5, 5, 11, 11, 11, 8, 9, 9, 9, 10, 10, 10, 4, 4, 4, 9, 9, 7, 7, 8, 8, 8]
    ],
    [
        [11, 11, 4, 4, 4, 7, 7, 7, 6, 6, 10, 10, 10, 3, 3, 6, 6, 6, 11, 11, 5, 5, 8, 8, 7, 7, 11, 11, 7, 7, 7, 11, 11, 5, 5, 5, 9, 9],
        [9, 9, 6, 6, 9, 9, 9, 3, 3, 7, 7, 11, 11, 10, 10, 10, 8, 8, 11, 11, 9, 9, 9, 5, 5, 4, 4, 4, 6, 6, 6, 11, 11, 5, 5, 5, 11, 11],
        [6, 6, 5, 5, 5, 10, 10, 10, 8, 8, 11, 11, 7, 7, 7, 9, 9, 11, 11, 5, 5, 11, 11, 10, 10, 10, 3, 3, 4, 4, 4, 11, 11, 6, 6, 6, 10, 10],
        [11, 11, 5, 5, 5, 6, 6, 9, 9, 6, 6, 6, 3, 3, 5, 5, 10, 10, 7, 7, 3, 7, 7, 7, 4, 4, 4, 10, 10, 10, 8, 8, 11, 11, 9, 9, 4, 4],
        [9, 9, 10, 10, 10, 4, 4, 6, 6, 6, 4, 4, 4, 5, 5, 11, 11, 6, 6, 5, 5, 5, 8, 8, 7, 7, 9, 9, 9, 3, 3, 10, 10, 7, 7, 7]
    ],
    [
        [3, 3, 7, 7, 11, 11, 7, 7, 7, 6, 6, 11, 11, 4, 4, 4, 5, 5, 6, 6, 6, 11, 11, 9, 9, 11, 11, 10, 10, 10, 8, 8, 7, 7, 7, 5, 5, 5],
        [4, 4, 4, 11, 11, 8, 8, 8, 3, 3, 7, 7, 5, 5, 11, 11, 9, 9, 10, 10, 10, 11, 11, 6, 6, 11, 11, 6, 6, 6, 8, 8, 5, 5, 5, 8, 8, 8],
        [6, 6, 6, 11, 11, 3, 3, 11, 11, 10, 10, 10, 5, 5, 10, 10, 10, 5, 5, 5, 7, 7, 7, 4, 4, 4, 10, 10, 6, 6, 9, 9, 11, 11, 8, 8, 11, 11],
        [3, 3, 11, 11, 4, 4, 10, 10, 9, 9, 11, 11, 4, 4, 4, 5, 5, 5, 7, 7, 3, 3, 3, 8, 8, 7, 7, 7, 6, 6, 6, 6, 8, 8, 6, 6, 10, 10, 10, 5, 5],
        [8, 8, 3, 3, 3, 4, 4, 3, 3, 8, 8, 8, 10, 10, 10, 6, 6, 9, 9, 4, 4, 4, 10, 10, 5, 5, 5, 11, 11, 7, 7, 6, 6, 6, 7, 7, 7, 8, 8, 5, 5]
    ],
    [
        [7, 7, 10, 3, 3, 5, 5, 11, 11, 11, 6, 6, 6, 7, 7, 11, 11, 8, 8, 6, 6, 5, 5, 5, 9, 9, 9, 7, 7, 7, 11, 11, 4, 4, 4, 11, 11],
        [6, 6, 6, 11, 11, 10, 10, 11, 11, 11, 8, 8, 8, 3, 3, 8, 8, 8, 5, 5, 4, 4, 4, 11, 11, 6, 6, 7, 7, 8, 8, 5, 5, 5, 11, 11, 9, 9, 9],
        [3, 3, 11, 11, 9, 9, 9, 4, 4, 4, 10, 10, 11, 11, 8, 8, 9, 9, 9, 7, 7, 7, 6, 6, 6, 11, 11, 5, 5, 9, 9, 6, 6, 11, 11, 5, 5, 5],
        [11, 11, 3, 3, 3, 6, 6, 6, 7, 7, 5, 5, 9, 9, 9, 4, 4, 7, 7, 7, 9, 9, 5, 5, 5, 4, 4, 4, 3, 3, 6, 6, 11, 11, 8, 8],
        [9, 9, 6, 6, 6, 5, 5, 5, 11, 11, 3, 3, 3, 7, 7, 10, 10, 8, 8, 8, 6, 6, 9, 9, 9, 7, 7, 7, 4, 4, 4, 3, 3, 8, 8, 4, 4, 8, 8, 5, 5]
    ]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 10, 10, 5, 5, 3, 3, 3, 0, 0],
    [0, 0, 0, 30, 15, 15, 8, 8, 5, 5, 5, 0, 0],
    [0, 0, 0, 75, 30, 30, 15, 15, 10, 10, 10, 0, 0]
];
var cornerPositions = [
    [0, 1, 5],
    [3, 4, 9],
    [20, 25, 26],
    [24, 28, 29]
];
var winLines = [], tumblePositions = [];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.tumbles = "";
    this.prevTumbleStatus = this.tumbleStatus;

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    this.tumbleIndex = 0;

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        this.view = this.tumbleCacheList[0].view;
        this.reelNo = this.tumbleCacheList[0].reelNo;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.tumbleCacheList = this.freeSpinCacheList[0];
        this.view = this.tumbleCacheList[0].view;
        this.reelNo = this.tumbleCacheList[0].reelNo;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;
    for (var i = 0; i < tumblePositions.length; i++) {
        if (i > 0) {
            this.tumbles += "~";
        }
        this.tumbles += `${tumblePositions[i]},${this.view[tumblePositions[i]]}`;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels[this.reelNo]),
        below: RandomLineFromReels(baseReels[this.reelNo])
    };

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 0;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "NOTUMBLE") {
        this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];

        var cache = this.tumbleCacheList[0];
        this.view = cache.view;
        this.reelNo = cache.reelNo;
        this.originView = cache.originView;
        this.mysterySymbol = cache.mysterySymbol;
        this.replacingInfos = cache.replacingInfos;

        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winLines = winLines;
        this.tumbles = "";
        for (var i = 0; i < tumblePositions.length; i++) {
            if (i > 0) {
                this.tumbles += "~";
            }
            this.tumbles += `${tumblePositions[i]},${this.view[tumblePositions[i]]}`;
        }

        this.virtualReels = {
            above: RandomLineFromReels(baseReels[this.reelNo]),
            below: RandomLineFromReels(baseReels[this.reelNo])
        };

        //                       
        if (this.winMoney > 0) {
            this.tumbleIndex = 0;
            this.tmb_res = this.winMoney;
            this.tumbleStatus = "TUMBLE";
        }

        this.freeSpinIndex++;
        this.freeSpinWinMoney += this.winMoney;

        //                 
        if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
            this.currentGame = "BASE";
        }
    } else if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        this.freeSpinWinMoney += this.winMoney;
        //                 
        if (this.tumbleStatus == "NOTUMBLE") {
            this.fsWinMoney += this.tmb_res;
            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var cache = this.tumbleCacheList[this.tumbleIndex + 1];

    if (this.currentGame == "FREE") {
        this.view = cache;
    } else if (this.currentGame == "BASE") {
        this.view = cache.view;
        this.originView = cache.originView;
        this.brokenSymbolInfos = cache.brokenSymbolInfos;
        this.mysterySymbol = cache.mysterySymbol;
        this.replacingInfos = cache.replacingInfos;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;
    this.tumbles = "";
    for (var i = 0; i < tumblePositions.length; i++) {
        if (i > 0) {
            this.tumbles += "~";
        }
        this.tumbles += `${tumblePositions[i]},${this.view[tumblePositions[i]]}`;
    }

    this.tmb_res += this.winMoney;
    this.tumbleIndex++;

    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";

        if (this.currentGame == "BASE" && this.tumbleIndex >= 8) { //                    
            this.freeSpinIndex = 1;
            this.freeSpinWinMoney = this.tmb_res;
            this.fsWinMoney = 0;
            this.currentGame = "FREE";
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var view, win;

    if (baseWin > 0) {
        var result = RandomWinView(baseReels, bpl, baseWin);
        view = result.tumbleCacheList;
        win = result.tumbleWinMoney;
    } else {
        var result = RandomZeroView(baseReels, bpl);
        view = result.tumbleCacheList;
        win = result.tumbleWinMoney;
    }

    var pattern = {
        view: view,
        win: win,
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
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeCache = RandomFreeViewCache(baseReels, bpl, fsWin, this.freeSpinLength)

    freeSpinCacheList.push(scatterView.tumbleCacheList);

    var pattern = {
        win: scatterView.tumbleWinMoney + freeCache.win,
        view: freeSpinCacheList.concat(freeCache.view),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var result = GetTumbleCacheListForBase(reels, bpl);

        if (result.tumbleWinMoney > bottomLimit && result.tumbleWinMoney <= maxWin && result.tumbleCacheList.length <= 8) {
            return result;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var result = GetTumbleCacheListForBase(reels, bpl);

        if (result.tumbleWinMoney == 0) {
            return result;
        }
    }
};

var RandomView = function (reels) {
    var resultView = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            resultView[viewPos] = reels[i][reelPos];
        }
    }

    return resultView;
};

var RandomScatterView = function (reels, bpl) {
    var result = null;

    while (true) {
        result = GetTumbleCacheListForBase(reels, bpl);
        if (result.tumbleCacheList.length > 8) {
            break;
        }
    }

    return result;
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
        var tumbleCacheList = [],
            tumbleWinMoney = 0;
        var freeSpinCacheList = [],
            freeSpinWinMoney = 0,
            freeSpinIndex = 1;

        while (true) {
            var result = GetTumbleCacheListForFree(reels, bpl);
            tumbleCacheList = result.tumbleCacheList;
            tumbleWinMoney = result.tumbleWinMoney;

            freeSpinCacheList.push(tumbleCacheList);
            freeSpinWinMoney += tumbleWinMoney;
            freeSpinIndex++;

            if (freeSpinIndex > fsLen) {
                break;
            }
        }

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
        }

        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = {
                win: freeSpinWinMoney,
                view: freeSpinCacheList
            };
        }

    }

    return lowerView ? lowerView : upperView;
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
    tumblePositions = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }

    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId];
        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join('~')}`);
            for (var i = 0; i < history.length; i++) {
                if (tumblePositions.indexOf(history[i]) == -1) {
                    tumblePositions.push(history[i]);
                }
            }
        }
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId];
        if (winMoney > 0) {
            winLines.push(`0~${winMoney}~${history.join('~')}`);
            for (var i = 0; i < history.length; i++) {
                if (tumblePositions.indexOf(history[i]) == -1) {
                    tumblePositions.push(history[i]);
                }
            }
        }
        return winMoney;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var GetNextTumbleInfo = function (reels, view, tIndex, tPositions, reelNo) {
    var tumbleCache = {};
    var nextView = Util.clone(view);
    var overView = RandomView(reels[reelNo]); //                           

    //                                      -1             
    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (tPositions.indexOf(pos) >= 0) {
                for (var k = j - 1; k >= 0; k--) {
                    nextView[i + (k + 1) * slotWidth] = nextView[i + k * slotWidth];
                }
                nextView[i] = -1;
            }
        }
    }

    //                                   -1                               2X2                                       
    if (tIndex <= 5 && tIndex != 1) {
        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == -1) {
                nextView[i] = overView[i];
            }
        }
    } else if (tIndex > 5 && tIndex <= 7) {
        for (var j = 0; j < slotHeight; j += 2) {
            if (nextView[j * slotWidth] == -1) {
                var randomSymbol = Util.random(3, 11);
                for (var i = 0; i < 2; i++) {
                    nextView[i + j * slotWidth] = randomSymbol;
                    nextView[i + (j + 1) * slotWidth] = randomSymbol;
                }
            }
        }

        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == -1) {
                nextView[i] = overView[i];
            }
        }
    } else if (tIndex > 7) {
        for (var j = 0; j < slotHeight; j += 2) {
            if (nextView[j * slotWidth] == -1) {
                var randomSymbol = Util.random(3, 11);
                for (var i = 0; i < 2; i++) {
                    nextView[i + j * slotWidth] = randomSymbol;
                    nextView[i + (j + 1) * slotWidth] = randomSymbol;
                }
            }
            if (nextView[3 + j * slotWidth] == -1) {
                var randomSymbol = Util.random(3, 11);
                for (var i = 3; i < 5; i++) {
                    nextView[i + j * slotWidth] = randomSymbol;
                    nextView[i + (j + 1) * slotWidth] = randomSymbol;
                }
            }
        }

        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == -1) {
                nextView[i] = overView[i];
            }
        }
    }

    //                                                                  
    if ([1, 3, 5, 7].indexOf(tIndex) > -1) {
        var brokenSymbolInfos = "";
        for (var i = 0; i < 3; i++) {
            var pos = cornerPositions[(tIndex - 1) / 2][i];
            if (i > 0) {
                brokenSymbolInfos += ";";
            }
            brokenSymbolInfos += `${view[pos]}~${pos}`;
        }
        tumbleCache.brokenSymbolInfos = brokenSymbolInfos;
    }

    //                                                                  
    if (tIndex == 1) {
        var mysterySymbol = Util.random(3, 11);
        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == -1) {
                nextView[i] = 11;
            }
        }
        tumbleCache.originView = Util.clone(nextView);

        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == 11) {
                nextView[i] = mysterySymbol;
            }
        }

        tumbleCache.mysterySymbol = mysterySymbol;
    } else if (tIndex == 3) {
        tumbleCache.originView = Util.clone(nextView);

        var replacingCount = Util.random(1, 4);
        var originSymbols = Util.shuffle([8, 9, 10]).slice(0, replacingCount),
            replacingSymbols = [];

        for (var i = 0; i < replacingCount; i++) {
            var rSymbol = Util.random(3, 8);
            replacingSymbols.push(rSymbol);
        }

        var replacingInfos = "";
        for (var i = 0; i < replacingCount; i++) {
            var positions = [];
            for (var j = 0; j < nextView.length; j++) {
                if (nextView[j] == originSymbols[i] && cornerPositions[2].indexOf(j) == -1 && cornerPositions[3].indexOf(j) == -1) {
                    positions.push(j);
                }
            }

            if (i > 0) {
                replacingInfos += ";";
            }
            replacingInfos += `${originSymbols[i]}~${replacingSymbols[i]}`;
            if (positions.length > 0) {
                replacingInfos += `~${positions.join(",")}`;
            }
        }

        tumbleCache.replacingInfos = replacingInfos;

        for (var i = 0; i < nextView.length; i++) {
            for (var j = 0; j < replacingCount; j++) {
                if (nextView[i] == originSymbols[j]) {
                    nextView[i] = replacingSymbols[j];
                }
            }
        }
    } else if (tIndex == 5) {
        for (var j = 0; j < slotHeight; j += 2) {
            var randomSymbol = Util.random(3, 11);
            for (var i = 0; i < 2; i++) {
                nextView[i + j * slotWidth] = randomSymbol;
                nextView[i + (j + 1) * slotWidth] = randomSymbol;
            }
        }
    } else if (tIndex == 7) {
        for (var j = 0; j < slotHeight; j += 2) {
            var randomSymbol = Util.random(3, 11);
            for (var i = 3; i < 5; i++) {
                nextView[i + j * slotWidth] = randomSymbol;
                nextView[i + (j + 1) * slotWidth] = randomSymbol;
            }
        }
    }

    tumbleCache.view = nextView;

    return tumbleCache;
};

var GetNextTumbleView = function (reels, view, fsType, tPositions, reelNo, mSymbol) {
    var nextView = Util.clone(view);
    var overView = RandomView(reels[reelNo]); //                           

    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (tPositions.indexOf(pos) >= 0) {
                for (var k = j - 1; k >= 0; k--) {
                    nextView[i + (k + 1) * slotWidth] = nextView[i + k * slotWidth];
                }
                nextView[i] = -1;
            }
        }
    }

    if (fsType > 0) {
        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == -1) {
                nextView[i] = overView[i];
            }
            if (nextView[i] == 11) {
                nextView[i] = mSymbol;
            }
        }
    } else if (fsType == 0) {
        for (var j = 0; j < slotHeight; j += 2) {
            if (nextView[j * slotWidth] == -1) {
                var randomSymbol = Util.random(3, 11);
                for (var i = 0; i < 2; i++) {
                    nextView[i + j * slotWidth] = randomSymbol;
                    nextView[i + (j + 1) * slotWidth] = randomSymbol;
                }
            }
            if (nextView[3 + j * slotWidth] == -1) {
                var randomSymbol = Util.random(3, 11);
                for (var i = 3; i < 5; i++) {
                    nextView[i + j * slotWidth] = randomSymbol;
                    nextView[i + (j + 1) * slotWidth] = randomSymbol;
                }
            }
        }

        for (var i = 0; i < nextView.length; i++) {
            if (nextView[i] == -1) {
                nextView[i] = overView[i];
            }
        }
    }

    return nextView;
};

var GetTumbleCacheListForBase = function (reels, bpl) {
    var reelNo = Util.random(0, 3),
        maskView = RandomView(reels[reelNo]),
        view = Util.clone(maskView);

    for (var i = 0; i < view.length; i++) {
        for (var j = 0; j < cornerPositions.length; j++) {
            if (cornerPositions[j].indexOf(i) > -1) {
                view[i] = 12;
            }
        }
    }

    var tumbleWinMoney = WinFromView(view, bpl);

    var cache = {
        view: view,
        reelNo: reelNo
    };

    var tumbleCacheList = [cache],
        tumbleIndex = 0;

    if (tumbleWinMoney > 0) { //                       
        while (true) {
            var result = GetNextTumbleInfo(reels, maskView, tumbleIndex, tumblePositions, reelNo);

            maskView = result.view;
            view = Util.clone(maskView);
            for (var i = 0; i < view.length; i++) {
                for (var j = cornerPositions.length - 1; j > (tumbleIndex - 1) / 2; j--) {
                    if (cornerPositions[j].indexOf(i) > -1) {
                        view[i] = 12;
                    }
                }
            }

            //                            
            var cache = {
                view: view,
                originView: [],
                brokenSymbolInfos: "",
                mysterySymbol: 0,
                replacingInfos: ""
            };

            if (result.originView) {
                var originView = Util.clone(result.originView);
                for (var i = 0; i < originView.length; i++) {
                    for (var j = cornerPositions.length - 1; j > (tumbleIndex - 1) / 2; j--) {
                        if (cornerPositions[j].indexOf(i) > -1) {
                            originView[i] = 12;
                        }
                    }
                }
                cache.originView = originView;
            }
            if (result.brokenSymbolInfos) {
                cache.brokenSymbolInfos = result.brokenSymbolInfos;
            }
            if (result.mysterySymbol) {
                cache.mysterySymbol = result.mysterySymbol;
                mysterySymbol = result.mysterySymbol;
            }
            if (result.replacingInfos) {
                cache.replacingInfos = result.replacingInfos;
            }

            var winMoney = WinFromView(view, bpl);

            tumbleWinMoney += winMoney;
            tumbleCacheList.push(cache);
            tumbleIndex++;

            //                 
            if (winMoney == 0) {
                break;
            }
        }
    }

    var result = {
        tumbleCacheList: tumbleCacheList,
        tumbleWinMoney: tumbleWinMoney
    }

    return result;
};

//                                               
var GetTumbleCacheListForFree = function (reels, bpl) {
    var cache = {
        view: [],
        reelNo: 0,
        originView: [],
        mysterySymbol: 0,
        replacingInfos: ""
    };

    var freeSpinType = Util.random(0, 3);
    var reelNo, mysterySymbol;

    if (freeSpinType == 0) {
        reelNo = 3;
    } else if (freeSpinType == 1) {
        reelNo = 4;
    } else if (freeSpinType == 2) {
        reelNo = Util.random(5, 13);
    }

    var view = RandomView(reels[reelNo]);
    if (freeSpinType == 0) {
        for (var j = 0; j < slotHeight; j += 2) {
            var randomSymbol_left = Util.random(3, 11);
            for (var i = 0; i < 2; i++) {
                view[i + j * slotWidth] = randomSymbol_left;
                view[i + (j + 1) * slotWidth] = randomSymbol_left;
            }

            var randomSymbol_right = Util.random(3, 11);
            for (var i = 3; i < 5; i++) {
                view[i + j * slotWidth] = randomSymbol_right;
                view[i + (j + 1) * slotWidth] = randomSymbol_right;
            }
        }
    } else if (freeSpinType == 1) {
        cache.originView = Util.clone(view);

        var replacingCount = Util.random(1, 4);
        var originSymbols = Util.shuffle([8, 9, 10]).slice(0, replacingCount),
            replacingSymbols = [];

        for (var i = 0; i < replacingCount; i++) {
            var rSymbol = Util.random(3, 8);
            replacingSymbols.push(rSymbol);
        }

        var replacingInfos = "";
        for (var i = 0; i < replacingCount; i++) {
            var positions = [];
            for (var j = 0; j < view.length; j++) {
                if (view[j] == originSymbols[i]) {
                    positions.push(j);
                }
            }

            if (i > 0) {
                replacingInfos += ";";
            }
            replacingInfos += `${originSymbols[i]}~${replacingSymbols[i]}`;
            if (positions.length > 0) {
                replacingInfos += `~${positions.join(",")}`;
            }
        }

        cache.replacingInfos = replacingInfos;

        for (var i = 0; i < view.length; i++) {
            for (var j = 0; j < replacingCount; j++) {
                if (view[i] == originSymbols[j]) {
                    view[i] = replacingSymbols[j];
                }
            }
        }
    } else if (freeSpinType == 2) {
        mysterySymbol = Util.random(3, 11);
        for (var i = 0; i < view.length; i++) {
            if (view[i] == -1) {
                view[i] = 11;
            }
        }
        cache.originView = Util.clone(view);

        for (var i = 0; i < view.length; i++) {
            if (view[i] == 11) {
                view[i] = mysterySymbol;
            }
        }

        cache.mysterySymbol = mysterySymbol;
    }

    cache.view = view;
    cache.reelNo = reelNo;

    var tumbleCacheList = [cache],
        tumbleWinMoney = WinFromView(view, bpl);

    if (tumbleWinMoney > 0) { //                       
        while (true) {
            var nextView = GetNextTumbleView(reels, view, freeSpinType, tumblePositions, reelNo, mysterySymbol);
            view = nextView;

            var winMoney = WinFromView(nextView, bpl);

            tumbleWinMoney += winMoney;
            tumbleCacheList.push(nextView);

            //                 
            if (winMoney == 0) {
                break;
            }
        }
    }

    var result = {
        tumbleCacheList: tumbleCacheList,
        tumbleWinMoney: tumbleWinMoney
    }

    return result;
};

module.exports = SlotMachine;