var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //          
    this.tumbleIndex = 0;
    this.tumbles = [];
    this.tmb_res = 0;
    this.tumbleCacheList = [];

    this.score = 0;
    this.transPos = [];
    this.transStack = [];
    this.transCode = "";
    this.prevTransforming = -1;
    this.transforming = -1;
    this.maskView = [];
    this.level = 0;
    this.prevLevel = 0;
    this.freeSpinWinMoney = 0;
    this.maxScore = 0;
    this.multi = 1;
    this.levelEndFlag = false;

    //                    
    this.buyMulti = 100;
    this.buyPatternCount = 30;

    this.prevBalance = 0;
    this.patternCount = 1500;
    this.lowLimit = 10;

    this.totalBet = 0;
    this.betPerLine = 0;
    this.jackpotType = ["FREE"];
};

var wild = 2;
var slotWidth = 8;
var slotHeight = 8;
var multiArr = [1, 3, 6, 9, 12, 15];
var scoreArr = [140, 116, 120, 124, 132, 10000];
var baseReels = [
    [8, 9, 7, 9, 9, 8, 8, 9, 7, 9, 9, 8, 4, 8, 9, 9, 3, 7, 7, 4, 7, 5, 3, 7, 8, 4, 7, 5, 5, 9, 8, 8, 7, 4, 4, 5, 6, 6, 4, 6, 6, 7, 3, 7, 8, 5, 6, 7, 8, 5, 8, 8, 6, 7, 7, 6, 8, 3, 9, 4, 4, 5, 5, 5, 8, 4, 7, 6, 7, 4, 9, 5, 9, 7, 8, 7, 7, 8, 7, 3, 5, 7, 8, 3, 9, 4, 5, 3, 8, 7, 8, 9, 3, 3, 4, 8, 4, 9, 4, 3, 9],
    [9, 6, 6, 5, 5, 8, 6, 8, 8, 7, 8, 5, 8, 3, 8, 3, 6, 6, 8, 8, 7, 6, 8, 4, 5, 6, 9, 6, 9, 6, 8, 8, 6, 8, 6, 6, 8, 4, 8, 8, 5, 5, 7, 5, 8, 5, 7, 3, 5, 8, 5, 8, 5, 3, 5, 3, 7, 8, 9, 6, 6, 8, 4, 6, 6, 8, 3, 6, 3, 3, 5, 3, 5, 8, 3, 6, 7, 7, 5, 7, 7, 7, 8, 9, 6, 6, 3, 5, 8, 3, 8, 4, 6, 4, 9, 9, 4, 4, 6],
    [6, 7, 9, 7, 9, 4, 7, 9, 4, 4, 4, 8, 4, 7, 6, 8, 6, 7, 7, 7, 7, 6, 6, 8, 9, 9, 9, 5, 5, 9, 7, 9, 4, 7, 9, 6, 8, 9, 9, 7, 9, 4, 5, 4, 3, 3, 9, 6, 6, 7, 4, 4, 9, 3, 9, 5, 7, 6, 4, 7, 9, 7, 7, 4, 7, 8, 8, 7, 9, 4, 7, 7, 9, 9, 4, 4, 6, 9, 9, 7, 4, 9, 3, 8, 7, 5, 8, 4, 9, 5, 9, 4, 7, 9, 7, 8, 8, 3, 9, 6, 7, 5, 7],
    [8, 7, 8, 8, 5, 8, 6, 6, 5, 6, 6, 8, 6, 5, 8, 5, 8, 3, 8, 9, 5, 6, 8, 8, 6, 6, 7, 7, 3, 6, 8, 5, 9, 6, 3, 8, 9, 6, 8, 8, 6, 6, 5, 6, 6, 5, 3, 8, 6, 3, 8, 3, 6, 5, 8, 7, 8, 4, 4, 8, 3, 9, 9, 7, 6, 5, 5, 4, 8, 4, 7, 8, 8, 3, 6, 6, 4, 5, 5, 8, 4, 6, 3, 6, 3, 3, 9, 7, 5, 8, 3, 8, 5, 7, 7, 7, 3, 5, 9],
    [7, 4, 8, 7, 8, 9, 9, 8, 3, 8, 8, 5, 4, 8, 8, 6, 6, 8, 4, 8, 7, 9, 9, 3, 9, 5, 7, 9, 8, 4, 3, 9, 8, 4, 7, 8, 7, 4, 3, 4, 9, 5, 3, 7, 7, 3, 7, 3, 3, 7, 6, 4, 3, 7, 6, 7, 5, 5, 5, 8, 9, 4, 4, 7, 7, 5, 9, 5, 8, 9, 7, 7, 5, 5, 7, 8, 5, 7, 9, 9, 8, 9, 6, 5, 8, 3, 7, 8, 4, 5, 7, 9, 6, 6, 8, 8, 6, 7, 4, 4, 9, 3, 8],
    [7, 7, 9, 4, 7, 9, 7, 9, 7, 7, 7, 7, 5, 5, 9, 7, 8, 4, 7, 6, 9, 9, 6, 6, 5, 4, 9, 7, 3, 6, 6, 7, 4, 4, 7, 8, 8, 3, 6, 9, 7, 9, 4, 4, 4, 8, 8, 9, 4, 5, 9, 5, 4, 4, 9, 6, 6, 4, 5, 7, 8, 7, 7, 4, 7, 8, 7, 4, 7, 6, 8, 7, 6, 9, 6, 9, 9, 3, 3, 7, 8, 9, 5, 6, 9, 4, 5, 6, 7, 9, 4, 9, 9, 7, 8, 9, 4, 7, 9, 9, 9, 4, 3, 9],
    [3, 6, 8, 6, 6, 5, 6, 8, 3, 8, 5, 7, 7, 6, 6, 5, 7, 8, 6, 4, 7, 7, 7, 5, 8, 8, 3, 6, 6, 7, 8, 5, 5, 4, 3, 9, 8, 5, 8, 8, 3, 8, 4, 3, 8, 8, 4, 3, 6, 6, 4, 6, 5, 9, 8, 8, 6, 6, 8, 7, 4, 4, 5, 8, 6, 5, 9, 8, 6, 6, 3, 5, 3, 9, 9, 6, 8, 5, 8, 6, 7, 9, 7, 3, 3, 8, 5, 8, 6, 5, 8, 3, 6, 8, 3, 3, 6, 6, 9, 8, 6],
    [3, 9, 5, 3, 8, 3, 8, 6, 7, 8, 4, 8, 7, 8, 6, 8, 7, 8, 8, 7, 5, 6, 6, 7, 9, 8, 8, 6, 9, 9, 7, 7, 9, 9, 7, 3, 3, 7, 4, 9, 8, 4, 4, 9, 7, 8, 9, 7, 4, 3, 8, 5, 7, 7, 6, 6, 9, 7, 9, 6, 8, 7, 3, 8, 4, 5, 3, 5, 8, 5, 5, 4, 9, 8, 7, 4, 8, 7, 7, 4, 8, 7, 4, 5, 9, 5, 5, 5, 4, 3, 5, 3, 9, 7, 9, 9, 3, 8, 8, 4, 4],
];
var freeReels = [
    [7, 8, 8, 9, 8, 3, 8, 4, 8, 3, 6, 6, 7, 9, 7, 4, 9, 8, 9, 7, 4, 9, 4, 4, 5, 5, 9, 5, 4, 8, 7, 8, 8, 9, 7, 7, 9, 9, 8, 9, 7, 7, 5, 4, 7, 9, 5, 8, 7, 3, 5, 6, 7, 7, 8, 7, 6, 4, 7, 4, 7, 8, 5, 5, 5, 3, 8, 3, 7, 9, 6, 5, 7, 3, 7, 9, 9, 8, 4, 4, 3, 8, 9, 9, 8, 7, 6, 3, 3, 4, 5, 7, 5, 8, 8, 3, 4, 6, 6, 8],
    [9, 7, 9, 7, 9, 6, 7, 4, 9, 5, 9, 9, 9, 7, 9, 5, 5, 7, 5, 7, 9, 9, 6, 9, 8, 4, 7, 5, 6, 3, 7, 9, 9, 6, 6, 9, 9, 4, 9, 7, 4, 6, 4, 8, 9, 7, 9, 8, 4, 4, 9, 7, 5, 9, 8, 8, 6, 6, 4, 4, 7, 5, 4, 6, 4, 4, 4, 8, 7, 7, 4, 7, 9, 7, 4, 7, 8, 6, 3, 6, 6, 4, 9, 3, 5, 7, 6, 4, 9, 3, 3, 9, 8, 8, 7, 7, 7, 7, 9, 7, 7, 9, 7, 8, 4],
    [5, 6, 7, 6, 6, 8, 6, 6, 5, 6, 8, 3, 8, 3, 8, 9, 8, 4, 8, 8, 3, 6, 3, 4, 3, 4, 4, 5, 8, 5, 8, 3, 7, 8, 8, 3, 8, 5, 7, 8, 3, 5, 4, 6, 6, 8, 8, 3, 5, 3, 3, 4, 8, 8, 6, 6, 5, 6, 6, 9, 3, 9, 8, 6, 8, 6, 5, 8, 9, 9, 6, 6, 5, 6, 6, 7, 7, 7, 8, 9, 5, 6, 8, 7, 6, 7, 5, 6, 7, 8, 7, 7, 6, 9, 8, 5, 5, 6, 8],
    [8, 6, 3, 7, 5, 5, 7, 9, 7, 5, 7, 8, 5, 5, 5, 4, 4, 3, 3, 7, 7, 5, 7, 5, 7, 4, 6, 6, 3, 7, 8, 8, 7, 5, 3, 8, 5, 4, 4, 8, 8, 4, 9, 8, 4, 3, 4, 8, 6, 9, 3, 9, 8, 8, 3, 8, 4, 9, 7, 8, 9, 9, 7, 6, 4, 7, 9, 5, 8, 9, 9, 7, 7, 8, 7, 8, 5, 8, 9, 3, 9, 9, 7, 9, 4, 8, 9, 8, 4, 3, 4, 6, 6, 7, 8, 4, 6, 8, 9],
    [4, 4, 9, 4, 9, 9, 7, 9, 4, 9, 7, 7, 9, 4, 9, 6, 7, 6, 7, 6, 9, 7, 9, 9, 9, 6, 7, 4, 8, 9, 7, 6, 6, 3, 8, 5, 9, 7, 7, 7, 7, 4, 9, 7, 4, 6, 6, 8, 7, 5, 7, 8, 7, 7, 4, 4, 4, 7, 6, 9, 6, 6, 5, 9, 9, 8, 8, 9, 4, 4, 8, 8, 7, 4, 9, 9, 7, 8, 7, 3, 7, 6, 7, 9, 6, 9, 5, 3, 3, 9, 4, 9, 4, 3, 5, 5, 8, 7, 9, 4, 5, 9, 5, 4, 7],
    [5, 6, 8, 6, 6, 5, 8, 8, 5, 5, 8, 6, 6, 8, 6, 8, 3, 6, 6, 8, 9, 8, 5, 7, 8, 8, 6, 3, 5, 8, 8, 9, 4, 3, 9, 9, 6, 6, 7, 7, 7, 6, 5, 7, 5, 5, 8, 5, 8, 9, 8, 4, 5, 3, 6, 6, 8, 6, 4, 7, 7, 3, 3, 4, 4, 5, 3, 8, 5, 4, 6, 6, 8, 7, 3, 7, 9, 4, 6, 8, 5, 8, 5, 6, 8, 6, 8, 7, 6, 8, 8, 3, 6, 9, 3, 5, 3, 8, 3, 6, 6, 7],
    [6, 6, 5, 8, 9, 9, 3, 7, 9, 8, 4, 4, 5, 4, 9, 8, 8, 4, 5, 9, 8, 7, 8, 7, 4, 9, 4, 8, 9, 7, 8, 3, 3, 8, 7, 5, 6, 3, 7, 4, 5, 8, 9, 7, 3, 8, 7, 7, 8, 3, 7, 7, 8, 7, 9, 4, 5, 5, 8, 9, 5, 5, 5, 9, 9, 8, 8, 3, 7, 7, 3, 5, 7, 5, 7, 6, 3, 7, 9, 9, 4, 9, 4, 5, 6, 3, 6, 6, 4, 4, 8, 3, 7, 8, 8, 9, 7, 8, 6, 7, 4],
    [4, 7, 4, 4, 7, 4, 9, 7, 8, 9, 7, 9, 8, 9, 7, 9, 9, 8, 9, 4, 9, 6, 6, 9, 8, 8, 4, 9, 8, 6, 5, 6, 7, 3, 4, 7, 6, 8, 8, 7, 7, 7, 7, 6, 5, 4, 4, 9, 9, 6, 6, 7, 9, 3, 9, 4, 5, 7, 8, 3, 4, 4, 4, 7, 3, 3, 7, 9, 4, 9, 7, 6, 7, 7, 9, 4, 5, 5, 9, 7, 6, 9, 7, 7, 4, 9, 9, 9, 6, 4, 7, 4, 5, 7, 9, 9, 7, 5, 7, 8, 9],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 7, 5, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 12, 7, 4, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 12, 7, 6, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 125, 75, 37, 25, 20, 15, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 125, 75, 37, 25, 20, 15, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 125, 75, 37, 25, 20, 15, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 250, 125, 75, 50, 35, 25, 20, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 250, 125, 75, 50, 35, 25, 20, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 250, 125, 75, 50, 35, 25, 20, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 500, 250, 150, 100, 75, 50, 37, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 500, 250, 150, 100, 75, 50, 37, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 500, 250, 150, 100, 75, 50, 37, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 500, 250, 150, 100, 75, 50, 37, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 500, 250, 150, 100, 75, 50, 37, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2000, 1000, 500, 250, 200, 150, 100, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2000, 1000, 500, 250, 200, 150, 100, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2000, 1000, 500, 250, 200, 150, 100, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2000, 1000, 500, 250, 200, 150, 100, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2000, 1000, 500, 250, 200, 150, 100, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10000, 5000, 3000, 1500, 1000, 750, 500, 0, 0, 0, 0, 0, 0, 0, 0],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .),
    this.normalPercent = 50; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    var cache;

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        cache = this.tumbleCacheList[0];
    } else if (viewCache.type == "FREE") {
        this.currentGame = "FREE";
        this.tumbleCacheList = viewCache.view;
        cache = this.tumbleCacheList[0];
    }

    this.prevTransforming = -1;
    this.prevLevel = 0;

    this.view = cache.view;
    this.level = cache.level;
    this.maskView = cache.mask;
    this.transPos = cache.transPos;
    this.transStack = cache.transStack;
    this.transforming = cache.transforming;
    this.score = cache.score;
    this.transCode = cache.transCode;

    this.maxScore = scoreArr[this.level];
    this.multi = multiArr[this.level];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    var winInfo;
    if (this.prevTransforming != 10 && this.transforming == 10) {
        // Refresh                                                       .
        this.winMoney = 0;
        this.winLines = [];
    } else {
        winInfo = WinFromView(this.view, player.betPerLine, this.multi);
        this.winMoney = winInfo.winMoney;
        this.winLines = winInfo.winLines;
    }

    // Refresh                                                      
    if (this.prevTransforming != 10 && this.transforming == 10) {
        this.tumbles = GetRefreshTumbles(this.view);
    } else {
        this.tumbles = GetTumbles(this.view, winInfo.tumbling);
    }

    //                       
    if (this.winMoney > 0 || this.currentGame == "FREE") {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var cache = this.tumbleCacheList[this.tumbleIndex];

    this.prevTransforming = this.transforming;
    this.prevLevel = this.level;

    this.view = cache.view;
    this.maskView = cache.mask;
    this.transPos = cache.transPos;
    this.transStack = cache.transStack;
    this.transforming = cache.transforming;
    this.transCode = cache.transCode;
    this.score = cache.score;
    this.level = cache.level;

    this.maxScore = scoreArr[this.level];
    this.multi = multiArr[this.level];

    this.levelEndFlag = false;
    if (this.tumbleIndex + 1 < this.tumbleCacheList.length) {
        if (this.level != this.tumbleCacheList[this.tumbleIndex + 1].level) {
            this.levelEndFlag = true;
        }
    }

    var winInfo;
    if (this.prevTransforming != 10 && this.transforming == 10) {
        // Refresh                                                       .
        this.winMoney = 0;
        this.winLines = [];
    } else {
        winInfo = WinFromView(this.view, player.betPerLine, this.multi);
        this.winMoney = winInfo.winMoney;
        this.winLines = winInfo.winLines;
    }

    this.tmb_res += this.winMoney;

    // Refresh                                                      
    if (this.prevTransforming != 10 && this.transforming == 10) {
        this.tumbles = GetRefreshTumbles(this.view);
    } else {
        this.tumbles = GetTumbles(this.view, winInfo.tumbling);
    }

    this.tumbleIndex++;
    //                 
    if (this.tumbleIndex >= this.tumbleCacheList.length) {
        this.tumbleStatus = "NOTUMBLE";
        if (this.currentGame == "FREE") {
            this.currentGame = "BASE";
            this.freeSpinWinMoney = this.tmb_res;
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

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
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin);

    var pattern = {
        view: cache.viewList,
        win: cache.win,
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var cache = BuyBonusViewCache(freeReels, bpl, (totalBet * this.buyMulti) / 5);

    var pattern = {
        view: cache.viewList,
        win: cache.win,
        bpl: bpl,
        type: "FREE",
        isCall: 0,
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        var result = RandomCacheListForBase(reels, bpl);

        if (result.win > bottomLimit && result.win <= maxWin && result.score < scoreArr[0]) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return { viewList: result.cacheList, tumbleWinMoney: result.win };
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var winMoney = WinFromView(view, bpl).winMoney;
        var transPos = RandomTransform();
        var cache = GenCache(view, [], -1, transPos, [], 0, "", 0);

        if (winMoney == 0) {
            var viewList = [];
            viewList.push(cache);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
        }
    }
};

var RandomView = function (reels) {
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

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    // 140                                     
    var scatterViewList;
    var scatterWin = 0;
    var lastView = [];
    var scatterData;

    while (true) {
        scatterData = RandomCacheListForBase(reels, bpl);
        if (scatterData.score >= scoreArr[0] && scatterData.win < fsWin) {
            scatterViewList = scatterData.cacheList.slice(0, scatterData.cacheList.length - 1);
            scatterWin = scatterData.win;
            break;
        }
    }

    lastView = [...scatterData.cacheList[scatterData.cacheList.length - 1].view];

    var minMoney = (fsWin - scatterWin) * 0.8;
    var maxMoney = (fsWin - scatterWin) * 1.2;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = 0,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;
    var firstView;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = {};
        var viewList = [];
        var totalWin = 0;
        var level = 1;

        viewList = [...scatterViewList];
        firstView = [...lastView];

        //                              
        while (true) {
            var temp = RandomCacheListForFree(reels, bpl, level, scoreArr[level], firstView);
            totalWin += temp.win;

            if (temp.score < scoreArr[level]) {
                viewList = viewList.concat(temp.cacheList);
                break;
            } else {
                level++;
                if (level >= 6) {
                    viewList = viewList.concat(temp.cacheList);
                    break;
                } else {
                    viewList = viewList.concat(temp.cacheList.slice(0, temp.cacheList.length - 1));
                    firstView = [...temp.cacheList[temp.cacheList.length - 1].view];
                }
            }
        }

        freeSpinData.win = totalWin + scatterWin;
        freeSpinData.viewList = viewList;

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

var BuyBonusViewCache = function (reels, bpl, lowLimit) {
    while (true) {
        var freeSpinData = {};
        var viewList = [];
        var totalWin = 0;
        var level = 1;

        var firstView = RandomZeroViewForGen(reels, bpl);

        //                              
        while (true) {
            var temp = RandomCacheListForFree(reels, bpl, level, scoreArr[level], firstView);
            totalWin += temp.win;

            if (temp.score < scoreArr[level]) {
                viewList = viewList.concat(temp.cacheList);
                break;
            } else {
                level++;
                viewList = viewList.concat(temp.cacheList.slice(0, temp.cacheList.length - 1));
                firstView = [...temp.cacheList[temp.cacheList.length - 1].view];
                if (level >= 6) {
                    break;
                }
            }
        }

        freeSpinData.win = totalWin;
        freeSpinData.viewList = viewList;

        if (freeSpinData.win > lowLimit) {
            return freeSpinData;
        }
    }
};

var RandomTransform = function () {
    var transPos = [];

    while (true) {
        var rand = Util.random(0, slotHeight * slotWidth);
        if (transPos.indexOf(rand) == -1) {
            transPos.push(rand);
        }
        if (transPos.length >= 5) {
            break;
        }
    }

    return transPos;
};

var RandomCacheListForBase = function (reels, bpl) {
    var totalWin = 0;
    var viewCacheList = [];
    var transforming = -1;
    var transCode = "";
    var score = 0;
    var tumbling = [];
    var tmpWin = 0;
    var tmpView = [];
    var winInfo;

    var transPos = RandomTransform();
    var transStack = []; // 10~14

    //              
    var firstView = RandomWinViewForGen(reels, bpl);

    winInfo = WinFromView(firstView, bpl);
    tmpWin = winInfo.winMoney;
    tumbling = winInfo.tumbling;
    totalWin += tmpWin;

    //                                           
    score += tumbling.length;
    if (score > scoreArr[0]) score = scoreArr[0];

    var firstCache = GenCache(firstView, [], transforming, transPos, transStack, score, transCode, 0);
    viewCacheList.push(firstCache);

    //                                                  
    if (tumbling.length > 0) {
        for (var i = 0; i < transPos.length; i++) {
            if (tumbling.indexOf(transPos[i]) > -1) {
                transStack.push(i + 10);
                transPos[i] = -1;
            }
        }
    }

    //                       
    while (true) {
        var tmbLastView = viewCacheList[viewCacheList.length - 1].view;
        var lastTumbling = Util.clone(tumbling);
        tmpView = GetTumbleView(tmbLastView, lastTumbling);

        winInfo = WinFromView(tmpView, bpl);
        tmpWin = winInfo.winMoney;
        tumbling = winInfo.tumbling;
        totalWin += tmpWin;

        if (tmpWin > 0) {
            //                                        

            //                                           
            score += tumbling.length;
            if (score > scoreArr[0]) score = scoreArr[0];

            var cache = GenCache(tmpView, [], transforming, transPos, transStack, score, "", 0);
            viewCacheList.push(cache);

            //                                                  
            if (tumbling.length > 0) {
                for (var i = 0; i < transPos.length; i++) {
                    if (tumbling.indexOf(transPos[i]) > -1) {
                        transStack.push(i + 10);
                        transPos[i] = -1;
                    }
                }
            }
        } else {
            if (transStack.length > 0) {
                //                     

                transStack.sort();
                transforming = transStack.shift();

                var result = GetTransformedView(tmpView, transforming);
                tmpView = result.view;
                maskView = result.mask;
                transCode = result.transCode;

                var cache = {};
                if (transforming == 10) {
                    winInfo = { winMoney: 0, tumbling: [], winLines: [] };
                    tmpWin = 0;
                    tumbling = [];

                    cache = GenCache(maskView, maskView, transforming, transPos, transStack, score, transCode, 0);
                } else {
                    winInfo = WinFromView(tmpView, bpl);
                    tmpWin = winInfo.winMoney;
                    tumbling = winInfo.tumbling;
                    totalWin += tmpWin;

                    //                                           
                    score += tumbling.length;
                    if (score > scoreArr[0]) score = scoreArr[0];

                    cache = GenCache(tmpView, maskView, transforming, transPos, transStack, score, transCode, 0);
                }

                viewCacheList.push(cache);

                //                                                  
                if (tumbling.length > 0) {
                    for (var i = 0; i < transPos.length; i++) {
                        if (tumbling.indexOf(transPos[i]) > -1) {
                            transStack.push(i + 10);
                            transPos[i] = -1;
                        }
                    }
                }

                //                                                                                
                if (tmpWin == 0 && transStack.length == 0 && transforming != 10) {
                    break;
                }
            } else {
                maskView = [];
                transCode = "";

                var cache = GenCache(tmpView, maskView, transforming, transPos, transStack, score, transCode, 0);
                viewCacheList.push(cache);

                //                                                  
                break;
            }
        }
    }

    return {
        cacheList: viewCacheList,
        win: totalWin,
        score: score,
    };
};

var RandomCacheListForFree = function (reels, bpl, level, maxScore, firstView) {
    var totalWin = 0;
    var viewCacheList = [];
    var transforming = -1;
    var transCode = "";
    var score = 0;
    var tumbling = [];
    var tmpWin = 0;
    var tmpView = [];
    var winInfo;

    var transStack = [10, 11, 12, 13, 14]; // 10~14
    var transPos = [-1, -1, -1, -1, -1];

    //              
    var tmpView = [...firstView];

    while (true) {
        //                     
        if (transStack.length > 0) {
            transStack.sort();
            transforming = transStack.shift();

            var result = GetTransformedView(tmpView, transforming);
            tmpView = result.view;
            maskView = result.mask;
            transCode = result.transCode;

            // Refresh            
            if (transforming == 10) {
                //                           
                var cache = GenCache(maskView, maskView, transforming, transPos, transStack, score, transCode, level);
                viewCacheList.push(cache);
                maskView = [];
                transCode = "";
            }

            winInfo = WinFromView(tmpView, bpl, multiArr[level]);
            tmpWin = winInfo.winMoney;
            tumbling = winInfo.tumbling;
            totalWin += tmpWin;

            //                                           
            score += tumbling.length;
            if (score >= maxScore) score = maxScore;

            // refresh                 0                          
            if (transforming != 10 || tmpWin != 0) {
                var cache = GenCache(tmpView, maskView, transforming, transPos, transStack, score, transCode, level);
                viewCacheList.push(cache);
            }

            if (tmpWin > 0) {
                //                       
                while (true) {
                    var tmbLastView = viewCacheList[viewCacheList.length - 1].view;
                    var lastTumbling = Util.clone(tumbling);
                    tmpView = GetTumbleView(tmbLastView, lastTumbling);

                    winInfo = WinFromView(tmpView, bpl, multiArr[level]);
                    tmpWin = winInfo.winMoney;
                    tumbling = winInfo.tumbling;
                    totalWin += tmpWin;

                    if (tmpWin > 0) {
                        //                                        

                        //                                           
                        score += tumbling.length;
                        if (score >= maxScore) score = maxScore;

                        var cache = GenCache(tmpView, [], transforming, transPos, transStack, score, "", level);
                        viewCacheList.push(cache);
                    } else {
                        if (transStack.length == 0) {
                            var cache = GenCache(tmpView, [], transforming, transPos, transStack, score, transCode, level);
                            viewCacheList.push(cache);
                        }
                        break;
                    }
                }
            }
        } else {
            break;
        }
    }

    return {
        cacheList: viewCacheList,
        win: totalWin,
        score: score,
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

var RandomWinViewForGen = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl).winMoney;

        if (tmpWin > 0) {
            break;
        }
    }

    return tmpView;
};

var RandomZeroViewForGen = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl).winMoney;

        if (tmpWin == 0) {
            break;
        }
    }

    return tmpView;
};

var WinFromView = function (view, bpl, multi = 1) {
    var winLines = [];
    var tumbling = [];
    var winMoney = 0;
    try {
        var length = view.length;
    } catch (e) {
        return 0;
    }

    for (var i = 0; i < view.length; i++) {
        if (tumbling.indexOf(i) < 0) {
            var line = [i];
            var symbolId = view[i];
            RecursiveSearch(view, i, line, symbolId);

            var matchCount = line.length;
            var money = payTable[matchCount][symbolId] * bpl * multi;
            if (money > 0) {
                winLines.push(`0~${money}~${line.join("~")}`);
                for (var i = 0; i < line.length; i++) {
                    if (tumbling.indexOf(line[i]) < 0) {
                        tumbling.push(line[i]);
                    }
                }
            }

            winMoney += money;
        }
    }

    return { winMoney, winLines, tumbling };
};

var RecursiveSearch = function (view, pos, line, symbolId) {
    //                                                         
    var newPositions = [];
    var x = pos % slotWidth;
    var y = Math.floor(pos / slotWidth);
    if (x < slotWidth - 1) {
        var newPos = x + 1 + slotWidth * y;
        newPositions.push(newPos);
    }
    if (y < slotHeight - 1) {
        var newPos = x + slotWidth * (y + 1);
        newPositions.push(newPos);
    }
    if (x > 0) {
        var newPos = x - 1 + slotWidth * y;
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

var GetTransformedView = function (view, mode) {
    var result = [];

    if (mode == 10) {
        result = BlueTransform(view);
    } else if (mode == 11) {
        result = PurpleTransform(view);
    } else if (mode == 12) {
        result = YellowTransform(view);
    } else if (mode == 13) {
        result = RedTransform(view);
    } else if (mode == 14) {
        result = GreenTransform(view);
    }

    return result;
};

// Refresh
var BlueTransform = function (view) {
    //                                          
    var wildPositions = [];
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            wildPositions.push(i);
        }
    }

    //                    
    var newView = RandomView(baseReels);
    var cache = {};
    var sty = [];

    //                        
    if (wildPositions.length > 0) {
        for (var j = 0; j < wildPositions.length; j++) {
            newView[wildPositions[j]] = wild;
            sty.push(`${wildPositions[j]},${wildPositions[j]}`);
        }
        cache.view = newView;
    }

    cache.mask = view;
    cache.view = newView;
    cache.transCode = sty.join("~");

    return cache;
};

// Wild Santa
var PurpleTransform = function (view) {
    var newView = Util.clone(view);

    //                                 
    var symbols = [];
    for (var i = 0; i < view.length; i++) {
        if (symbols.indexOf(view[i]) == -1) {
            symbols.push(view[i]);
        }
    }

    //                                                  .                     3                                
    var randomSymbol;
    while (true) {
        randomSymbol = symbols[Util.random(0, symbols.length)];
        var count = NumberOfSymbols(view, randomSymbol);

        if (count >= 3) {
            break;
        }
    }

    var srf = [];
    //                    
    for (var j = 0; j < newView.length; j++) {
        if (newView[j] == randomSymbol) {
            newView[j] = wild;
            srf.push(`${randomSymbol}~2~${j}`);
        }
    }

    var cache = {};
    cache.mask = view;
    cache.view = newView;
    cache.transCode = srf.join(";");

    return cache;
};

// Blocks
var YellowTransform = function (view) {
    var newView = Util.clone(view);

    //              
    var count = Util.random(3, 6);
    var blockPositions = [];
    var randomSymbol = Util.random(3, 10);
    var rwd = [];

    for (var i = 0; i < count; i++) {
        var blocks;
        var step = 0;

        while (true) {
            var flag = false;
            var xPos = Util.random(0, slotWidth - 2 + 1); //                             
            var yPos = Util.random(0, slotHeight - 2 + 1); //                             
            blocks = [];

            for (var y = yPos; y < yPos + 2; y++) {
                for (var x = xPos; x < xPos + 2; x++) {
                    var index = y * slotWidth + x;
                    blocks.push(index);

                    //                                        ,                                              
                    if (blockPositions.indexOf(index) > -1 || view[index] == randomSymbol) {
                        flag = true;
                    }
                }
            }

            step++;

            if (!flag) {
                break;
            } else if (step > 200 && blockPositions.length >= 4) {
                break;
            }
        }

        blockPositions = blockPositions.concat(blocks);
        rwd.push(`${randomSymbol}~${blocks.join()}`);
    }

    for (var j = 0; j < blockPositions.length; j++) {
        newView[blockPositions[j]] = randomSymbol;
    }

    var cache = {};
    cache.mask = view;
    cache.view = newView;
    cache.transCode = rwd.join(";");

    return cache;
};

// Suprize
var RedTransform = function (view) {
    var newView = Util.clone(view);
    var rwd = [];

    //              
    var size = Util.random(3, 6);
    var randomSymbol = Util.random(3, 10);

    var xPos = Util.random(0, slotWidth - size + 1); //                             
    var yPos = Util.random(0, slotHeight - size + 1); //                             

    for (var y = yPos; y < yPos + size; y++) {
        for (var x = xPos; x < xPos + size; x++) {
            var index = y * slotWidth + x;
            newView[index] = randomSymbol;
            rwd.push(index);
        }
    }

    var cache = {};
    cache.mask = view;
    cache.view = newView;
    cache.transCode = `${randomSymbol}~${rwd.join()}`;

    return cache;
};

// Lucky Santa
var GreenTransform = function (view) {
    var newView = Util.clone(view);

    var wildCount = Util.random(5, 16);
    var wildPositions = [];

    while (true) {
        var rand = Util.random(0, 64);
        if (wildPositions.indexOf(rand) == -1) {
            wildPositions.push(rand);
        }

        if (wildPositions.length >= wildCount) {
            break;
        }
    }

    for (var i = 0; i < wildPositions.length; i++) {
        newView[wildPositions[i]] = wild;
    }

    var cache = {};
    cache.mask = view;
    cache.view = newView;
    cache.transCode = `2~${wildPositions.join()}`;

    return cache;
};

var GetTumbles = function (view, tumbling) {
    var tumbles = [];
    for (var i = 0; i < tumbling.length; i++) {
        var tumblePos = tumbling[i];
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    return tumbles;
};

var GetRefreshTumbles = function (view) {
    var tumbles = [];
    for (var i = 0; i < view.length; i++) {
        tumbles.push(`${i},${view[i]}`);
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

    var randomView = RandomView(baseReels);
    for (var i = 0; i < tumbleView.length; i++) {
        if (tumbleView[i] < 0) {
            tumbleView[i] = randomView[i];
        }
    }
    return tumbleView;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var NumberOfSymbols = function (view, symbol) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == symbol) {
            result++;
        }
    }
    return result;
};

var GenCache = function (view, mask, transforming, transPos, transStack, score, transCode, level) {
    var cache = {
        view: view,
        mask: mask,
        transforming: transforming,
        transPos: [...transPos],
        transStack: [...transStack],
        score: score,
        transCode: transCode,
        level: level,
    };

    return cache;
};

module.exports = SlotMachine;