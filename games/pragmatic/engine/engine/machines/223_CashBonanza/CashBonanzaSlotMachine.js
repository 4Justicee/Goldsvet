var Util = require('../../../utils/slot_utils');

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

    //                           
    this.freeSpinType = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinData = {};
    this.freeSpinCacheList = [];
    this.freeFlag = false;
    this.freeSpinTmbWinMoney = 0;
    this.isfirstScatterView = false;

    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus == "NOTUMBLE";
    this.isView = [];
    this.tmb_res = 0;
    this.stsResStr = "";
    this.styResStr = "";
    //             
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1, wild = 2, empty = 13;
var slotWidth = 6, slotHeight = 8;
var winLines = []; //                              
var tmbAdditionPos = [];  //                                          
var tumblingPositions = []; //                                                  
var initScatterReel = []; //                              
var prevWinMoney = 0;
var initFreeSpinLength = 8;
var initResetScatterReel = [];
var wildPos = [];
var baseReels = [
    [5, 10, 7, 9, 7, 3, 4, 9, 8, 9, 4, 2, 1, 10, 6, 8, 5, 8, 6, 11, 11, 3, 12, 12, 11, 12, 10],
    [9, 6, 7, 8, 11, 3, 10, 1, 10, 5, 12, 12, 11, 5, 8, 12, 8, 2, 9, 12, 7, 4, 9, 6, 10, 4, 11, 3, 8, 9, 11, 3, 10, 12, 5, 9, 7, 11, 4, 8, 10, 6],
    [12, 12, 5, 6, 4, 10, 10, 11, 7, 12, 5, 8, 1, 9, 4, 7, 12, 8, 10, 12, 8, 10, 11, 3, 9, 2, 9, 6, 7, 11, 9, 3, 11, 5, 10, 3, 9, 4, 8, 6, 11, 8],
    [7, 8, 6, 10, 9, 8, 4, 9, 2, 12, 3, 11, 4, 8, 6, 10, 11, 10, 7, 12, 11, 1, 3, 12, 5, 9, 5],
    [1, 8, 2, 10, 5, 8, 4, 9, 12, 7, 6, 9, 8, 5, 10, 10, 11, 8, 12, 11, 7, 9, 11, 8, 11, 11, 12, 5, 3, 12, 4, 11, 10, 8, 7, 6, 3, 6, 12, 9, 12, 10, 3, 4, 9, 10, 9],
    [12, 11, 12, 1, 10, 5, 12, 8, 9, 4, 6, 11, 3, 10, 11, 7, 11, 9, 12, 8, 10, 5, 4, 6, 3, 8, 10, 2, 9, 8, 9, 7]
];
var freeReels = [
    [
        [5, 10, 7, 9, 7, 3, 4, 9, 8, 9, 4, 2, 1, 10, 6, 8, 5, 8, 6, 11, 11, 3, 12, 12, 11, 12, 10],
        [9, 6, 7, 8, 11, 3, 10, 1, 10, 5, 12, 12, 11, 5, 8, 12, 8, 2, 9, 12, 7, 4, 9, 6, 10, 4, 11, 3, 8, 9, 11, 3, 10, 12, 5, 9, 7, 11, 4, 8, 10, 6],
        [12, 12, 5, 6, 4, 10, 10, 11, 7, 12, 5, 8, 1, 9, 4, 7, 12, 8, 10, 12, 8, 10, 11, 3, 9, 2, 9, 6, 7, 11, 9, 3, 11, 5, 10, 3, 9, 4, 8, 6, 11, 8],
        [7, 8, 6, 10, 9, 8, 4, 9, 2, 12, 3, 11, 4, 8, 6, 10, 11, 10, 7, 12, 11, 1, 3, 12, 5, 9, 5],
        [1, 8, 2, 10, 5, 8, 4, 9, 12, 7, 6, 9, 8, 5, 10, 10, 11, 8, 12, 11, 7, 9, 11, 8, 11, 11, 12, 5, 3, 12, 4, 11, 10, 8, 7, 6, 3, 6, 12, 9, 12, 10, 3, 4, 9, 10, 9],
        [12, 11, 12, 1, 10, 5, 12, 8, 9, 4, 6, 11, 3, 10, 11, 7, 11, 9, 12, 8, 10, 5, 4, 6, 3, 8, 10, 2, 9, 8, 9, 7]
    ],
    [
        [9, 12, 6, 10, 5, 10, 4, 6, 5, 4, 12, 11, 11, 5, 9, 7, 12, 8, 9, 6, 7, 5, 11, 9, 4, 12, 11, 11, 5, 3, 11, 11, 12, 10, 12, 8, 10, 10, 12, 6, 6, 12, 12, 10, 5, 9, 12, 10, 8, 12, 6, 6, 9, 11, 11, 8, 11, 10, 7, 12, 11, 12, 12, 8, 12, 11, 9, 4, 5, 7, 10, 5, 7, 12, 10, 9, 9, 11, 12, 5, 9, 7, 3, 7, 8, 4, 7, 3, 9, 11, 5, 9, 5, 12, 11, 10, 12, 9, 11, 8, 10, 7, 4, 11, 4, 7, 10, 6, 10, 10, 12, 7, 12, 7, 1, 12, 11, 8, 4, 7, 9, 6, 9, 9, 6, 10, 8, 12, 8, 5, 9, 8, 12, 10, 4, 3, 12, 7, 10, 6, 11, 10, 11, 8, 5, 9, 4, 6, 10, 1, 5, 6, 3, 8, 12, 8, 11, 12, 8, 6, 8, 7, 11, 10, 11, 7, 6, 6, 12, 10, 12, 5, 7, 7, 9, 3, 10, 9, 3, 11, 9, 9, 11, 6, 10, 5, 6, 3],
        [1, 12, 9, 9, 8, 8, 4, 5, 10, 12, 12, 11, 5, 6, 10, 12, 6, 6, 12, 11, 9, 11, 5, 11, 10, 11, 6, 11, 6, 12, 11, 4, 6, 8, 10, 9, 6, 3, 5, 6, 10, 10, 5, 7, 7, 9, 10, 7, 9, 8, 10, 8, 2, 7, 7, 12, 9, 9, 12, 4, 10, 5, 3, 6, 5, 11, 12, 5, 6, 3, 8, 5, 9, 5, 8, 7, 12, 7, 10, 8, 11, 9, 11, 10, 9, 10, 11, 3, 12, 6, 9, 10, 12, 9, 12, 11, 12, 9, 9, 1, 9, 4, 11, 11, 10, 10, 8, 6, 12, 5, 7, 12, 2, 12, 8, 7, 8, 4, 9, 12, 4, 11, 10, 4, 7, 11, 12, 8, 12, 7, 3, 12, 11, 7, 11, 10, 5, 4, 12, 11, 10, 6, 11, 12, 6, 3],
        [5, 7, 11, 11, 3, 11, 11, 7, 4, 7, 11, 7, 11, 12, 12, 11, 8, 7, 7, 11, 6, 9, 3, 7, 8, 10, 8, 12, 3, 6, 12, 6, 6, 8, 9, 10, 8, 5, 11, 11, 9, 5, 12, 9, 10, 8, 12, 12, 5, 10, 12, 8, 8, 3, 6, 6, 8, 6, 12, 6, 6, 5, 12, 11, 5, 11, 6, 7, 10, 5, 12, 10, 12, 9, 5, 4, 10, 12, 3, 8, 10, 3, 9, 9, 2, 12, 4, 7, 5, 11, 8, 10, 4, 3, 11, 11, 3, 7, 5, 9, 2, 12, 6, 9, 4, 12, 10, 6, 11, 12, 12, 4, 12, 5, 9, 12, 12, 11, 9, 10, 7, 11, 9, 12, 10, 10, 9, 5, 9, 3, 12, 6, 4, 6, 12, 11, 6, 11, 10, 6, 7, 9, 10, 11, 12, 9, 5, 7, 6, 12, 10, 1, 1, 10, 12, 8, 11, 11, 9, 9, 10, 10, 12, 7, 8, 9, 8, 5, 1, 10, 8, 6, 9, 4, 10, 4, 7, 12, 8, 5, 8, 10, 12, 7, 10, 10, 12, 11, 8, 12, 11, 10, 11, 5, 9, 9, 11, 10, 6, 8, 7, 2, 10, 4, 11, 12, 12, 5, 12, 10, 9, 9, 11, 7, 5, 7, 4, 11, 5, 11, 6, 4, 9, 6, 3, 9],
        [10, 10, 8, 12, 1, 7, 6, 5, 9, 8, 9, 7, 2, 11, 6, 5, 11, 11, 12, 10, 4, 12, 9, 3],
        [12, 10, 12, 9, 1, 6, 8, 10, 12, 5, 12, 11, 3, 2, 5, 12, 6, 10, 6, 7, 6, 5, 8, 7, 9, 12, 9, 10, 10, 9, 3, 4, 8, 11, 10, 9, 7, 6, 4, 10, 8, 5, 9, 7, 12, 12, 11, 12, 11, 7, 8, 11, 5, 11, 11, 3, 4, 11],
        [8, 12, 5, 9, 12, 12, 8, 4, 11, 9, 10, 11, 10, 4, 4, 10, 10, 6, 9, 6, 10, 5, 7, 11, 7, 4, 5, 1, 9, 5, 10, 6, 6, 3, 4, 3, 9, 8, 9, 6, 10, 6, 10, 11, 5, 5, 11, 12, 12, 6, 5, 11, 11, 10, 12, 12, 7, 12, 12, 7, 6, 9, 5, 8, 12, 4, 4, 10, 3, 1, 8, 8, 9, 7, 5, 9, 12, 11, 11, 5, 5, 11, 10, 4, 2, 11, 10, 12, 7, 7, 6, 10, 8, 9, 11, 3, 12, 12, 8, 10, 9, 3, 12, 6, 12, 4, 10, 3, 11, 7, 11, 4, 10, 11, 10, 9, 12, 10, 10, 12, 8, 9, 12, 11, 10, 5, 8, 3, 6, 12, 5, 3, 6, 11, 9, 12, 12, 6, 5, 9, 12, 8, 12, 7, 7, 10, 7, 11, 9, 6, 3, 12, 7, 7, 9, 7, 12, 11, 10, 7, 11, 12, 8, 9, 8, 9, 8, 6, 11, 6, 12, 9, 12, 6, 10, 12, 2, 8, 2, 11, 12, 8, 10, 11, 8, 5, 10, 6, 11, 7, 11, 7, 11, 11, 6, 5, 9, 5, 1, 4, 9, 9]

    ],
    [
        [6, 6, 11, 12, 5, 6, 10, 10, 11, 9, 10, 10, 12, 10, 11, 11, 9, 6, 10, 10, 9, 7, 5, 4, 11, 3, 10, 6, 7, 4, 12, 7, 3, 12, 11, 5, 6, 11, 7, 12, 12, 5, 7, 11, 4, 12, 5, 6, 7, 11, 8, 5, 12, 6, 12, 10, 8, 8, 3, 12, 7, 8, 12, 12, 5, 9, 7, 11, 11, 8, 10, 10, 8, 5, 11, 12, 8, 12, 6, 4, 12, 10, 9, 6, 5, 5, 12, 5, 12, 9, 8, 9, 7, 10, 11, 9, 7, 6, 11, 6, 6, 12, 11, 3, 11, 10, 6, 7, 9, 11, 8, 11, 8, 6, 11, 9, 6, 4, 12, 4, 9, 7, 9, 9, 5, 5, 9, 3, 10, 8, 9, 4, 12, 7, 6, 7, 7, 8, 6, 12, 12, 4, 10, 9, 7, 12, 10, 12, 5, 3, 11, 12, 10, 9, 1, 7, 11, 10, 9, 8, 9, 11, 9, 5, 5, 11, 3, 8, 10, 12, 9, 7, 8, 11, 10, 4, 1, 11, 4, 12, 3, 9, 12, 12, 10, 10, 8],
        [11, 5, 3, 11, 11, 3, 9, 5, 11, 5, 3, 11, 7, 9, 5, 11, 9, 7, 9, 3, 7, 11, 9, 11, 7, 3, 11, 9, 7, 5, 7, 9, 9, 11, 9, 11, 5, 5, 7, 7, 3, 11, 11, 11, 11, 9, 11, 7, 9, 5, 7, 11, 7, 11, 7, 7, 9, 5, 11, 5, 3, 9, 9, 11, 9, 3, 9, 5, 11, 11, 7, 9, 5, 11, 5, 9, 11, 9, 9, 7, 11, 11, 7, 11, 5, 5, 7],
        [6, 6, 10, 6, 4, 6, 10, 10, 6, 10, 8, 8, 12, 12, 12, 8, 8, 4, 10, 12, 6, 8, 6, 12, 10, 12, 10, 6, 6, 8, 6, 10, 10, 8, 12, 12, 8, 12, 8, 4, 8, 10, 12, 4, 10, 10, 12, 6, 6, 12, 12, 12, 6, 10, 12, 8, 10, 10, 8, 8, 10, 8, 6, 12, 8, 6, 10, 12, 12, 12, 10, 4, 4, 10, 10, 12, 4, 12, 12, 10, 12, 12, 12, 6, 8, 12, 6, 6, 10, 12, 12, 8, 8, 12, 12, 12, 4, 8, 8, 4, 12, 12, 10, 8, 6, 10, 12, 12, 12, 10, 10, 12, 8, 8, 10, 12, 12, 10, 6, 6, 4, 12, 6, 6, 4, 8, 4, 4, 6, 6, 12, 8, 10, 8, 10, 12, 12, 10, 8, 10, 10],
        [12, 11, 5, 11, 10, 8, 5, 12, 3, 12, 8, 5, 9, 2, 7, 12, 12, 6, 9, 12, 12, 6, 4, 12, 11, 8, 6, 11, 11, 6, 10, 11, 5, 9, 7, 11, 11, 10, 7, 9, 10, 12, 9, 8, 5, 10, 10, 12, 11, 9, 11, 3, 4, 10, 8, 11, 10, 5, 12, 3, 11, 9, 9, 12, 9, 6, 5, 11, 12, 8, 8, 3, 9, 10, 5, 9, 5, 7, 7, 12, 7, 12, 11, 5, 10, 5, 8, 8, 5, 12, 12, 4, 12, 11, 6, 6, 10, 4, 10, 7, 12, 11, 12, 6, 9, 10, 10, 11, 4, 7, 12, 3, 4, 2, 9, 10, 5, 9, 8, 5, 12, 9, 12, 9, 7, 11, 12, 3, 6, 9, 6, 11, 10, 12, 7, 4, 4, 10, 7, 9, 4, 10, 8, 10, 6, 3, 6, 10, 11, 5, 10, 9, 12, 7, 3, 12, 6, 11, 9, 7, 4, 11, 10, 11, 11, 6, 12, 10, 8, 6, 7, 9, 8, 10, 11, 6, 10, 8, 8, 6, 7],
        [10, 12, 10, 12, 4, 8, 6, 11, 5, 9, 10, 9, 12, 12, 11, 9, 5, 7, 8, 5, 11, 2, 5, 5, 9, 12, 6, 6, 5, 11, 6, 11, 12, 12, 9, 10, 10, 6, 6, 12, 11, 7, 12, 11, 9, 12, 9, 12, 4, 8, 7, 7, 5, 11, 8, 12, 9, 6, 12, 12, 9, 9, 12, 7, 3, 9, 6, 3, 11, 3, 11, 8, 4, 5, 10, 10, 7, 12, 4, 12, 8, 7, 10, 5, 4, 3, 9, 11, 5, 7, 8, 3, 10, 8, 10, 11, 8, 2, 3, 11, 10, 10, 7, 9, 6, 4, 11, 12, 10, 12, 12, 11, 10, 7, 6, 4, 10, 5, 6, 6, 9, 10, 11, 11, 9, 10, 8, 8, 7],
        [10, 12, 9, 12, 10, 8, 10, 8, 6, 2, 5, 12, 8, 7, 10, 12, 9, 11, 7, 11, 12, 11, 9, 9, 7, 7, 10, 10, 9, 5, 11, 11, 4, 3, 6, 10, 12, 12, 5, 11, 9, 12, 9, 12, 9, 12, 9, 6, 4, 12, 12, 6, 12, 4, 11, 6, 11, 7, 7, 4, 10, 11, 3, 4, 7, 8, 4, 8, 6, 8, 5, 5, 10, 5, 6, 10, 2, 9, 10, 3, 8, 8, 5, 11, 11, 7, 7, 10, 11, 3, 7, 3, 10, 12, 8, 7, 9, 10, 11, 6, 11, 11, 9, 6, 10, 8, 11, 9, 6, 6, 4, 5, 11, 6, 8, 5, 12, 10, 12, 10, 12, 12, 9, 5, 5, 3, 12]
    ],
    [
        [9, 8, 11, 10, 12, 7, 4, 11, 9, 8, 10, 8, 4, 11, 8, 5, 5, 3, 12, 8, 6, 9, 9, 7, 8, 10, 8, 1, 8, 5, 12, 9, 10, 6, 7, 6, 5, 10, 7, 3, 12, 9, 5, 11, 7, 7, 12, 8, 12, 10, 7, 11, 11, 12, 6, 8, 8, 12, 12, 9, 10, 5, 11, 9, 7, 7, 10, 11, 10, 11, 12, 10, 6, 8, 6, 4, 11, 10, 11, 10, 5, 7, 3, 11, 3, 12, 6, 6, 11, 11, 12, 6, 11, 12, 10, 7, 6, 12, 9, 9, 8, 5, 6, 12, 11, 9, 1, 11, 9, 5, 9, 11, 7, 6, 4, 7, 7, 5, 5, 11, 12, 9, 9, 7, 10, 11, 11, 10, 4, 10, 5, 6, 9, 3, 11, 8, 12, 11, 11, 3, 6, 8, 9, 12, 6, 11, 11, 6, 11, 9, 8, 7, 4, 9, 10, 12, 6, 5, 4, 10, 12, 5, 10, 9, 10, 12, 9, 6, 10, 4, 12, 10, 7, 5, 12, 12, 10, 10, 3, 12, 10, 11, 8, 8, 4, 6, 3, 12, 6, 7, 11, 7, 11, 9, 8, 12, 9, 12, 5, 12, 7, 8, 7, 11, 9, 10, 12, 12, 5, 4, 3, 10, 6, 12, 4, 10, 3, 10, 9, 12, 11, 7, 4, 10, 9, 12, 12, 1, 5, 11, 12, 9, 6, 9, 6, 12, 7, 4, 5, 12, 5],
        [10, 8, 8, 10, 6, 10, 12, 12, 10, 10, 8, 12, 10, 12, 10, 4, 12, 10, 4, 6, 10, 12, 12, 8, 8, 10, 12, 8, 8, 10, 6, 10, 12, 8, 6, 12, 4, 6, 10, 4, 4, 12, 12, 6, 12, 12, 4, 6, 8, 6, 10, 8, 10, 10, 8, 10, 12, 10, 10, 12, 10, 6, 6, 12, 10, 12, 12, 8, 4, 10, 10, 12, 6, 10, 4, 8, 8, 6, 12, 12, 12, 8, 10, 8, 12, 6, 6, 12, 8, 6, 6, 8, 12, 4, 10, 10, 8, 12, 12, 8, 10, 12, 12, 6, 6, 10, 12, 10, 12, 8, 6, 4, 6, 6, 8, 6, 8, 4, 10, 6, 10, 6, 12, 10, 12, 8, 10, 12, 4, 6, 8, 10, 10, 12, 8, 12, 10, 12, 8, 8, 6, 12, 4, 8, 12, 12, 12, 6, 12, 6, 4, 12, 10, 12, 8, 10, 10, 4, 12, 6, 12, 8, 12, 12, 12],
        [11, 9, 11, 11, 11, 5, 5, 9, 9, 7, 7, 9, 11, 7, 11, 9, 3, 5, 7, 9, 5, 9, 11, 11, 5, 9, 11, 11, 7, 5, 5, 9, 3, 9, 9, 11, 5, 9, 3, 9, 11, 9, 11, 7, 7, 9, 7, 5, 11, 9, 7, 11, 9, 9, 11, 7, 5, 3, 9, 5, 9, 11, 5, 9, 11, 7, 11, 11, 11, 7, 7, 9, 11, 11, 5, 3, 7, 11, 5, 11, 3, 11, 5, 5, 3, 9, 9, 7, 3, 5, 7, 11, 9, 7, 3, 11, 7, 9, 7, 5, 11, 11, 5, 9, 7, 5, 5, 9, 11, 3, 11, 7, 5, 7, 5, 9, 9, 3, 11, 11, 7, 11, 11, 11, 7, 7, 11, 3, 3, 11, 9, 11, 7, 11, 9],
        [8, 12, 3, 11, 5, 12, 10, 11, 10, 9, 12, 9, 10, 6, 7, 8, 9, 3, 9, 11, 5, 6, 9, 2, 8, 6, 8, 4, 7, 10, 7, 4, 5, 12, 10, 12, 6, 12, 11, 4, 11, 12, 10, 7, 11, 5],
        [8, 12, 9, 7, 8, 8, 11, 9, 8, 11, 5, 8, 6, 4, 7, 9, 3, 6, 10, 10, 7, 10, 12, 7, 10, 11, 6, 9, 7, 11, 9, 5, 7, 7, 9, 5, 9, 4, 12, 6, 3, 12, 12, 9, 3, 9, 6, 5, 4, 10, 11, 12, 11, 4, 3, 7, 9, 5, 10, 11, 9, 12, 4, 11, 9, 12, 9, 6, 5, 7, 8, 7, 12, 7, 10, 5, 12, 12, 9, 5, 9, 10, 6, 12, 12, 7, 10, 7, 9, 5, 5, 10, 4, 10, 11, 9, 11, 12, 11, 5, 9, 10, 11, 6, 9, 10, 10, 4, 4, 8, 3, 12, 12, 5, 10, 10, 11, 8, 11, 12, 11, 2, 8, 11, 11, 12, 4, 10, 6, 12, 12, 8, 10, 9, 10, 8, 8, 12, 5, 12, 8, 8, 3, 10, 11, 10, 2, 8, 10, 11, 12, 6, 5, 7, 6, 11, 3, 4, 4, 10, 12, 11, 12, 7, 12, 12, 9, 6, 10, 11, 9, 6, 6, 11, 10, 3, 8, 7, 11, 12, 12, 11, 12, 9, 10, 11, 5, 7, 11, 6, 8, 6, 6, 5, 10, 3, 12, 9, 5, 12, 10, 11, 2, 6, 6],
        [2, 7, 12, 9, 10, 10, 9, 11, 12, 9, 3, 10, 3, 4, 9, 9, 7, 8, 8, 12, 6, 10, 10, 12, 6, 12, 12, 9, 10, 6, 11, 10, 5, 12, 9, 11, 10, 5, 7, 9, 8, 5, 12, 7, 5, 5, 6, 10, 7, 5, 12, 10, 12, 10, 12, 6, 12, 4, 10, 9, 12, 11, 10, 9, 6, 11, 11, 8, 9, 5, 2, 4, 12, 11, 12, 7, 10, 10, 6, 10, 3, 8, 11, 6, 4, 7, 5, 4, 5, 7, 11, 7, 10, 11, 5, 8, 11, 12, 11, 9, 6, 11, 9, 8, 11, 4, 11, 8, 8, 6, 11, 12, 9, 3, 12, 5, 7, 12, 8, 6, 9, 4, 3, 12, 11, 9, 7, 3, 8, 10, 12, 11, 6, 6]
    ]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 6, 6, 6, 4, 2, 2, 1, 1, 1, 0],
    [0, 0, 0, 50, 10, 10, 8, 6, 4, 4, 2, 2, 2, 0],
    [0, 0, 0, 100, 20, 20, 16, 12, 6, 6, 4, 4, 4, 0],
    [0, 0, 0, 200, 50, 50, 40, 20, 10, 10, 8, 8, 8, 0]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .), 
    this.normalPercent = 40; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.stsResStr = "";
    this.styResStr = "";
    this.isView = []

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;
    var view;

    if (viewCache.type == "BASE") {
        this.tumbleViewList = viewCache.view;
        if (this.tumbleViewList[0].view != undefined) {
            view = this.tumbleViewList[0];
            this.view = view.view;
        } else {
            view = this.tumbleViewList;
            this.view = view;
        }
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view.viewList;
        view = this.freeSpinCacheList[0];
        this.view = view.view;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.tmb_win = 0;
    this.tmb_res = 0;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_res = this.winMoney;
        this.stsResStr = view.stsResStr;
        this.styResStr = view.styResStr;
        this.tmb_win = this.winMoney; //                    
    }

    if (isFreeSpinWin(this.view)) {
        this.currentGame = "FREE";
        this.freeSpinIndex = 1;
        this.freeSpinLength = initFreeSpinLength;
        this.freeSpinWinMoney = this.winMoney;
        this.stsResStr = view.stsResStr;
        this.styResStr = view.styResStr;
        this.isfirstScatterView = true;
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var view = this.tumbleViewList[this.tumbleIndex];
    this.view = view.view;

    if (this.freeFlag) {
        this.freeSpinTmbWinMoney = WinFromView(this.view, player.betPerLine);
    } else {
        this.winMoney = WinFromView(this.view, player.betPerLine);
    }

    this.winLines = winLines;

    this.isView = view.isView;
    this.stsResStr = view.stsResStr;
    this.styResStr = view.styResStr;

    this.tumbleIndex++;

    if (this.tumbleIndex == this.tumbleViewList.length) {
        if (this.freeFlag) {
            this.winMoney = this.freeSpinTmbWinMoney;
            this.tmb_res = this.freeSpinTmbWinMoney;
        } else {
            this.tmb_res = this.winMoney;
        }
        this.tumbleStatus = "NOTUMBLE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);

        if (this.tumbleStatus == "NOTUMBLE") {
            //                              
            this.freeSpinWinMoney += this.tmb_res;
            if (this.freeSpinIndex >= this.freeSpinLength) {
                this.currentGame = "BASE";
                this.freeFlag = false;
            }
        }
        return;
    }


    if (!this.isfirstScatterView) {
        this.freeSpinIndex++;
    }
    this.tumbleViewList = this.freeSpinCacheList[this.freeSpinIndex];
    var view = [];

    //                                    
    if (this.isfirstScatterView) {
        view = this.tumbleViewList;
        this.isView = view.isView;
        this.view = view.view;
        this.stsResStr = view.stsResStr;
        this.styResStr = view.styResStr;
    }

    if (this.tumbleViewList.length == undefined) {
        view = this.tumbleViewList;
        this.view = view.view;
    } else {
        view = this.tumbleViewList[0];
        this.view = view.view;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinTmbWinMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;
    this.tmb_res = 0;
    //                       
    if (this.freeSpinTmbWinMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_res = this.freeSpinTmbWinMoney;
        this.stsResStr = view.stsResStr;
        this.styResStr = view.styResStr;
        this.tmb_win = this.freeSpinTmbWinMoney; //                    
        this.freeFlag = true;
        return;
    }


    this.isfirstScatterView = false;

    if (this.freeSpinIndex >= this.freeSpinLength) {
        this.stsResStr = "";
        this.styResStr = "";
        this.isView = [];
        this.currentGame = "BASE";
        this.freeFlag = false;
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    if (baseWin > 0) {
        var { viewList, tumbleWinMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tumbleWinMoney;
        pattern.view = viewList;
    } else {
        var { view, winMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = winMoney;
        pattern.view = view;
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
        default: break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterPos = ScatterPositions(scatterView);
    var initScatterView = GetScatterIncreaseView(bpl, scatterPos, true, false, 0);
    var freeSpinData = {
        length: initFreeSpinLength,
        viewList: [],
    };

    initScatterView.view = scatterView;
    //                           
    var cache = RandomFreeViewCache(freeReels[Util.random(0, 4)], bpl, fsWin, initFreeSpinLength, scatterPos);

    freeSpinData.viewList.push(initScatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);
    initScatterReel = [];
    return {
        win: cache.win,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var tumbleWinMoney = 0;
        var view = RandomView(reels);
        view = RandomMaskView(view);

        tumbleWinMoney = WinFromView(view, bpl); //                          .

        if (tumbleWinMoney > 0) {
            prevWinMoney = tumbleWinMoney;
            var firstTumbling = Util.clone(tmbAdditionPos); //                       
            var firstView = GetIncreaseView(bpl, firstTumbling, true); //                                                  
            firstView.view = view; //                                                                     .
            var viewList = [firstView];

            //                (                      )             
            while (true) {
                prevWinMoney = tumbleWinMoney;
                var lastTumbling = Util.clone(tmbAdditionPos);
                var newView = GetIncreaseView(bpl, lastTumbling, false);

                tumbleWinMoney = newView.winMoney;
                viewList.push(newView);
                if (newView.winMoney == prevWinMoney) {
                    //                                                       .
                    tmbAdditionPos = [];
                    prevWinMoney = 0;
                    break;
                }
            }

            if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
                return { viewList, tumbleWinMoney };
            }
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
        view = RandomMaskView(view);

        var winMoney = WinFromView(view, bpl);

        if (winMoney == 0) {
            return { view, winMoney };
        }
    }
};

var RandomView = function (reels) {
    var resultView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        if (NumberOfScatters(resultView) == 0 && CheckWildFirstReel(resultView)) {
            break;
        }
    }

    return resultView;
};

var RandomScatterView = function (reels, bpl) {
    var resultView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        resultView = RandomMaskView(resultView);

        if (isFreeSpinWin(resultView) && CheckWildFirstReel(resultView)) {
            if (WinFromView(resultView, bpl) == 0) {
                return resultView;
            }
        }
    }
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, scatterPos) {
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
        var initScatterPos = scatterPos;
        tmbAdditionPos = initScatterPos;
        var firstScatter = true;

        initScatterReel = [...initResetScatterReel];

        while (true) {
            var fsview, fsWin = 0;
            prevWinMoney = 0;

            var scatterTumblePos = Util.clone(tmbAdditionPos); //                       
            var fsview = GetScatterIncreaseView(bpl, scatterTumblePos, false, firstScatter, 0);

            firstScatter = false;

            fsWin = fsview.winMoney;
            var viewList = [fsview];

            if (fsWin > 0) {
                var tmbDeep = 0;
                while (true) {
                    prevWinMoney = fsWin;
                    var lastTumbling = Util.clone(tmbAdditionPos);
                    var newView = GetScatterIncreaseView(bpl, lastTumbling, false, false, tmbDeep);

                    fsWin = newView.winMoney;
                    viewList.push(newView);

                    tmbDeep++;
                    if (newView.winMoney == prevWinMoney) {
                        tmbDeep = 0;
                        //                                                       .
                        tmbAdditionPos = [];
                        prevWinMoney = 0;
                        break;
                    }
                }
                freeSpinData.viewList.push(viewList);
            } else {
                freeSpinData.viewList.push(fsview);
                tmbAdditionPos = [];
            }

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

var RandomMaskView = function (view) {
    var view = Util.clone(view);

    for (var i = 0; i < 24; i++) {
        view[i] = empty;
    }

    return view;
}

//                                           
// bpl                          
// tumblePosition                               
// islast                         
// isfirst                         
var GetIncreaseView = function (bpl, tumblePosition, isfirst = false) {
    //                                                                                 .                .
    var initTumblePos = Util.clone(tumblePosition);
    var removedup = initTumblePos.filter(function (a) {
        if (!(a.pos in this)) {
            this[a.pos] = true;
            return true;
        }
    }, Object.create(null));

    initTumblePos = removedup;

    var isView = [];
    var resultView = [];
    var reel = [0, 0, 0, 0, 0, 0];
    var stsResultStr = [];
    var styResultStr = [];

    for (var i = 0; i < initTumblePos.length; i++) {
        switch (initTumblePos[i].pos % slotWidth) {
            case 0:
                reel[0]++;
                break;
            case 1:
                reel[1]++;
                break;
            case 2:
                reel[2]++;
                break;
            case 3:
                reel[3]++;
                break;
            case 4:
                reel[4]++;
                break;
            case 5:
                reel[5]++;
                break;
        }
    }

    if (isfirst == false) {
        var newView = RandomView(baseReels);
        for (var i = 0; i < reel.length; i++) {
            if (reel[i] < 4) {
                for (var j = 0; j < 4 - reel[i]; j++) {
                    newView[j * slotWidth + i] = empty;
                }
            }
        }

        isView = [...newView];
        resultView = [...newView];

        //                                        
        for (var i = 0; i < initTumblePos.length; i++) {
            resultView[initTumblePos[i].pos] = initTumblePos[i].symbol;
        }

        var resWinMoney = WinFromView(resultView, bpl);
        initTumblePos = Util.clone(tmbAdditionPos);
    }


    //                                           
    for (var i = 0; i < initTumblePos.length; i++) {
        stsResultStr.push(initTumblePos[i].symbol);
    }

    //                                                    
    if (prevWinMoney == resWinMoney) {
        for (var i = 0; i < initTumblePos.length; i++) {
            styResultStr.push([initTumblePos[i].pos, -1]);
        }
    } else {
        for (var i = 0; i < initTumblePos.length; i++) {
            styResultStr.push([initTumblePos[i].pos, initTumblePos[i].pos]);
        }
    }

    return {
        isView: isfirst ? null : isView,
        view: resultView,
        stsResStr: stsResultStr.join("~"),
        styResStr: styResultStr.join("~"),
        winMoney: resWinMoney
    }
};

var GetScatterIncreaseView = function (bpl, tumblePosition, isfirst = false, isSecond = false, tmbDeep) {
    //                                                                                 .                .
    var initTumblePos = Util.clone(tumblePosition); //                                                 .
    var removedup = initTumblePos.filter(function (a) {
        if (!(a.pos in this)) {
            this[a.pos] = true;
            return true;
        }
    }, Object.create(null));

    initTumblePos = removedup;

    var isView = [];
    var resultView = [];
    var stsResultStr = [];
    var styResultStr = [];
    //                                                                  
    var ScatterAddedReel = isfirst ? [0, 0, 0, 0, 0, 0] : [...initScatterReel];

    if (isSecond == false) {
        for (var i = 0; i < initTumblePos.length; i++) {
            switch (initTumblePos[i].pos % slotWidth) {
                case 0:
                    ScatterAddedReel[0]++;
                    break;
                case 1:
                    ScatterAddedReel[1]++;
                    break;
                case 2:
                    ScatterAddedReel[2]++;
                    break;
                case 3:
                    ScatterAddedReel[3]++;
                    break;
                case 4:
                    ScatterAddedReel[4]++;
                    break;
                case 5:
                    ScatterAddedReel[5]++;
                    break;
            }
        }
    }

    if (isfirst) {
        initResetScatterReel = [...ScatterAddedReel];
    }
    initScatterReel = [...ScatterAddedReel];

    if (isfirst == false) {
        if (isSecond) {
            while (true) {
                var newView = RandomView(freeReels[Util.random(0, 4)]);

                for (var i = 0; i < ScatterAddedReel.length; i++) {
                    if (ScatterAddedReel[i] < 4) {
                        for (var j = 0; j < 4 - ScatterAddedReel[i]; j++) {
                            newView[j * slotWidth + i] = empty;
                        }
                    }
                }

                isView = [...newView];
                resultView = [...newView];

                //                                                                 .
                for (var i = 0; i < initTumblePos.length; i++) {
                    resultView[initTumblePos[i].pos] = initTumblePos[i].symbol;
                }

                var resWinMoney = WinFromView(resultView, bpl);

                if (resWinMoney == 0) {
                    for (var i = 0; i < initTumblePos.length; i++) {
                        styResultStr.push([initTumblePos[i].pos, -1]);
                    }
                    break;
                }
            }
        } else {
            var newView = RandomView(freeReels[Util.random(0, 4)]);

            for (var i = 0; i < ScatterAddedReel.length; i++) {
                if (ScatterAddedReel[i] < 4) {
                    for (var j = 0; j < 4 - ScatterAddedReel[i]; j++) {
                        newView[j * slotWidth + i] = empty;
                    }
                }
            }

            isView = [...newView];
            resultView = [...newView];

            //                                        
            for (var i = 0; i < initTumblePos.length; i++) {
                resultView[initTumblePos[i].pos] = initTumblePos[i].symbol;
            }

            var resWinMoney = WinFromView(resultView, bpl);

            initTumblePos = Util.clone(tmbAdditionPos);
        }
    }


    //                                           
    for (var i = 0; i < initTumblePos.length; i++) {
        stsResultStr.push(initTumblePos[i].symbol);
    }

    if (isSecond == false) {
        //                                                    
        if (prevWinMoney == resWinMoney) {
            for (var i = 0; i < initTumblePos.length; i++) {
                styResultStr.push([initTumblePos[i].pos, -1]);
            }
        } else {
            for (var i = 0; i < initTumblePos.length; i++) {
                styResultStr.push([initTumblePos[i].pos, initTumblePos[i].pos]);
            }
        }
    }

    return {
        isView: isfirst ? null : isView,
        view: resultView,
        stsResStr: stsResultStr.join("~"),
        styResStr: styResultStr.join("~"),
        winMoney: resWinMoney
    }
};

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            var obj = {
                pos: i,
                symbol: scatter
            }
            result.push(obj);
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

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    initTumblingPos = [];
    tumblingPositions = [];
    var searched = [false, false, false, false, false, false, false, false];
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

        money += RecursiveSearch(view, bpl, 1, count, history, symbolId);
    }

    tmbAdditionPos = tumblingPositions;
    return money;
};

var RecursiveSearch = function (view, bpl, length, count, history, symbolId) {
    // view, bpl, length, count, history, symbolId
    //                                                             
    if (symbolId == empty) {
        return 0;
    }
    //                                                             
    if (length == slotWidth) {
        var winMoney = bpl * payTable[length][symbolId] * count;
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                //                                              
                var tmbObjPos = {}
                tmbObjPos.pos = history[i];
                tmbObjPos.symbol = symbolId;

                for (var j = 0; j < wildPos.length; j++) {
                    if (history[i] == wildPos[j].pos && symbolId == wildPos[j].sym) {
                        tmbObjPos.symbol = wild;
                    }
                }
                tumblingPositions.push(tmbObjPos);
            }
            wildPos = [];
            winLines.push(`${symbolId}~${count}~${length}~${winMoney}~${history.sort(function (a, b) { return a - b }).join()}~1`);
        }
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    // for (var i = slotHeight - 1; i >= 0; i--) {
    for (var i = 0; i < slotHeight; i++) {
        var pos = length + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            if (isWild(view[pos])) {
                var wildObj = {
                    pos: pos,
                    sym: symbolId
                }
                wildPos.push(wildObj);
            }
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var winMoney = bpl * payTable[length][symbolId] * count
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                //                                              
                var tmbObjPos = {}

                tmbObjPos.pos = history[i];
                tmbObjPos.symbol = symbolId;

                for (var j = 0; j < wildPos.length; j++) {
                    if (history[i] == wildPos[j].pos && symbolId == wildPos[j].sym) {
                        tmbObjPos.symbol = wild;
                    }
                }
                tumblingPositions.push(tmbObjPos);
            }
            wildPos = [];
            winLines.push(`${symbolId}~${count}~${length}~${winMoney}~${history.sort(function (a, b) { return a - b }).join()}~1`);
        }
        return winMoney;
    }

    var matchCount = 0;
    var historyTmp = [...history];
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;

    return RecursiveSearch(view, bpl, length + 1, matchCount, historyTmp, symbolId);
};

var CheckWildFirstReel = function (view) {
    var counter = 0;
    for (var i = 0; i < slotHeight; i++) {
        if (view[i * slotWidth] == wild) {
            counter++;
        }
    }
    if (counter == 0) {
        return true;
    } else {
        return false;
    }
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) == 3;
};

var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
}

module.exports = SlotMachine;