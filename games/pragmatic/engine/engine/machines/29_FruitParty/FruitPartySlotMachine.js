var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";
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
    this.multiPositions = [];
    this.multiValues = [];
    this.totalMulti = 1;
    this.multiLineIndex = -1;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;

    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;

    this.totalBet = 0;
    this.betPerLine = 0;

    this.lineCount = 20;
    this.jackpotType = ["FREE"];

    this.buyMulti = 100;
    this.buyPatternCount = 30;
};

var scatter = 1;
var slotWidth = 7;
var slotHeight = 7;
var freeSpinCount = 10;
var winLines = [];
var tumbling = [];
var baseReels = [
    [9, 9, 9, 3, 3, 3, 3, 6, 7, 6, 7, 5, 1, 6, 9, 4, 4, 5, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 4, 4, 4, 8, 8, 7, 7, 7, 9, 9, 9, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 9, 9, 8, 3, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8, 6, 6, 6],
    [9, 9, 9, 3, 3, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 1, 8, 8, 4, 6, 9, 9, 5, 5, 4, 4, 4, 8, 8, 7, 7, 7, 9, 9, 9, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 9, 9, 8, 3, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8, 6, 6, 6],
    [9, 9, 9, 3, 3, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 9, 1, 8, 4, 6, 9, 9, 5, 5, 4, 4, 4, 8, 8, 7, 7, 7, 9, 9, 9, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 9, 9, 8, 3, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 8, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8, 6, 6, 6],
    [9, 9, 9, 3, 3, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 9, 8, 8, 4, 6, 9, 1, 5, 5, 4, 4, 4, 8, 8, 7, 7, 7, 9, 9, 9, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 9, 9, 8, 3, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8, 6, 6, 6],
    [9, 9, 9, 3, 3, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 1, 8, 8, 4, 6, 9, 9, 5, 5, 4, 4, 4, 8, 8, 7, 7, 7, 9, 9, 9, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 9, 9, 8, 3, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 1, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8],
    [9, 9, 9, 3, 3, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 9, 8, 8, 1, 6, 9, 9, 5, 5, 4, 4, 4, 8, 8, 7, 7, 7, 9, 9, 9, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 9, 9, 8, 3, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8],
    [9, 9, 9, 3, 3, 3, 3, 6, 7, 6, 7, 5, 9, 5, 9, 4, 4, 5, 3, 1, 8, 8, 4, 6, 9, 9, 5, 5, 4, 4, 4, 8, 8, 7, 7, 7, 9, 9, 9, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 9, 9, 8, 3, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8],
];
var freeReels = [
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 4, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 4, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 4, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 4, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 5, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 5, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 3, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 5, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 5, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 3, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 10, 8, 6, 5, 4],
    [0, 0, 0, 30, 20, 15, 10, 8, 6, 5],
    [0, 0, 0, 35, 25, 20, 15, 10, 8, 6],
    [0, 0, 0, 40, 30, 25, 20, 15, 10, 8],
    [0, 0, 0, 50, 40, 30, 25, 20, 15, 10],
    [0, 0, 0, 100, 80, 60, 40, 30, 25, 20],
    [0, 0, 0, 150, 120, 90, 60, 50, 40, 30],
    [0, 0, 0, 300, 250, 200, 100, 70, 60, 50],
    [0, 0, 0, 700, 600, 500, 400, 300, 200, 100],
    [0, 0, 0, 1400, 1200, 1000, 800, 600, 400, 200],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400],
];
var tumbleMultiArr = [2, 4, 8, 16, 32, 64, 128, 256];

SlotMachine.prototype.Init = function () {
    this.highPercent = 5; //(0-5)                       (                                .),
    this.normalPercent = 50; //                                 ,                                               ,                                     .
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
    var multiView;

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        multiView = this.tumbleCacheList[0];
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.tumbleCacheList = this.freeSpinCacheList[0];
        multiView = this.tumbleCacheList[0];
    }

    var result = GetFinalView(multiView, player.betPerLine);
    this.view = result.view;
    this.multiPositions = result.multiPositions;
    this.multiValues = result.multiValues;
    this.totalMulti = result.totalMulti;
    this.multiLineIndex = result.multiLineIndex;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.winMoney = WinFromView(multiView, player.betPerLine);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumbling);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = 0;
        this.freeSpinLength = GetFreeSpinCountFromView(this.view);
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var multiView = this.tumbleCacheList[this.tumbleIndex];
    var result = GetFinalView(multiView, player.betPerLine);

    this.winMoney = WinFromView(multiView, player.betPerLine);
    this.winLines = winLines;

    this.tmb_res += this.winMoney;

    this.view = result.view;
    this.multiPositions = result.multiPositions;
    this.multiValues = result.multiValues;
    this.totalMulti = result.totalMulti;
    this.multiLineIndex = result.multiLineIndex;
    this.tumbles = GetTumbles(this.view, tumbling);

    this.tumbleIndex++;
    //                 
    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);

        if (this.tumbleStatus == "NOTUMBLE") {
            //                              
            this.freeSpinWinMoney += this.tmb_res;
            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    var multiView = this.tumbleCacheList[0];

    var result = GetFinalView(multiView, player.betPerLine);
    this.view = result.view;
    this.multiPositions = result.multiPositions;
    this.multiValues = result.multiValues;
    this.totalMulti = result.totalMulti;
    this.multiLineIndex = result.multiLineIndex;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.winMoney = WinFromView(multiView, player.betPerLine);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumbling);

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
            break;
        case "BONUS":
            //return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
            break;
        default:
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCount = GetFreeSpinCountFromView(scatterView);

    //                           
    var freeSpinCacheList = [];
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCount = GetFreeSpinCountFromView(scatterView);

    //                           
    var freeSpinCacheList = [];
    var fsCache = BuyBonusViewCache(freeReels, bpl, fsCount);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0,
        calcCount = 0;
    while (true) {
        var tumbleWinMoney = 0;
        var view = RandomView(reels);
        var tumbleWinMoney = WinFromView(view, bpl);


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
            var lastTumbling = Util.clone(tumbling);
            var newView = GetTumbleView(lastView, lastTumbling);
            if (isFreeSpinWin(newView)) {
                continue;
            }

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
        var view = RandomView(reels);
        var winMoney = WinFromView(view, bpl);

        if (winMoney == 0) {
            var viewList = [];
            viewList.push(view);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
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

        if (!isFreeSpinWin(resultView)) {
            break;
        }
    }

    return resultView;
};

var RandomScatterView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        if (NumberOfScatters(view) == 0 && WinFromView(view, bpl) == 0) {
            break;
        }
    }

    var reelsPos = [];
    for (var i = 0; i < slotWidth; i++) {
        reelsPos.push(i);
    }
    Util.shuffle(reelsPos);

    if (Util.probability(5)) {
        nScatters = 5;
    } else if (Util.probability(10)) {
        nScatters = 4;
    } else {
        nScatters = 3;
    }

    for (var i = 0; i < nScatters; i++) {
        var reelNo = reelsPos[i];
        var pos = reelNo + Util.random(0, slotHeight) * slotWidth;
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
    var freeSpinIndex = 1;
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;

    while (true) {
        var view = RandomView(reels);
        var multiView = GetMultiView(view, tumbleMultiArr[Util.random(0, tumbleMultiArr.length)], bpl);
        var tumbleWinMoney = WinFromView(multiView, bpl);
        var viewList = [multiView];

        //                       
        if (tumbleWinMoney > 0) {
            while (true) {
                var lastView = viewList[viewList.length - 1];
                var lastTumbling = Util.clone(tumbling);
                var newView = GetTumbleView(lastView, lastTumbling);
                var newMultiView = GetMultiView(newView, tumbleMultiArr[Util.random(0, tumbleMultiArr.length)], bpl);
                if (isFreeSpinWin(newMultiView)) {
                    continue;
                }

                var nWinMoney = WinFromView(newMultiView, bpl);
                viewList.push(newMultiView);
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
        cache: freeSpinCacheList,
    };

    return freeSpinData;
};

var GetFreeSpinCountFromView = function (view) {
    // switch (NumberOfScatters(view)) {
    //     case 7:
    //         return 14;
    //     case 6:
    //         return 13;
    //     case 5:
    //         return 12;
    //     case 4:
    //         return 11;
    //     case 3:
    //         return 10;
    // }
    return 10;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var GetMultiView = function (view, multi, bpl) {
    var multiView = Util.clone(view);
    var winMoney = WinFromView(multiView, bpl);
    if (winMoney == 0) {
        return multiView;
    }

    var lines = winLines,
        multiLine,
        maxMoney = 0;
    for (var i = 0; i < lines.length; i++) {
        var lineMoney = Number(lines[i].split("~")[1]);
        if (maxMoney < lineMoney) {
            multiLine = lines[i];
        }
    }

    var lineArr = multiLine.split("~");
    lineArr = lineArr.slice(2);
    var multiArr = [],
        indexArr = [];
    for (var i = 0; i < lineArr.length; i++) {
        multiArr[i] = 1;
        indexArr[i] = i;
    }
    while (multi > 1) {
        var randomIndex = Util.random(0, indexArr.length);
        var index = indexArr[randomIndex];
        //                                   
        // if (multiArr[index] == tumbleMultiArr[tumbleMultiArr.length - 1]) {
        if (multiArr[index] == 4) {
            //                                     4X                      
            indexArr = Util.remove(indexArr, randomIndex);
            continue;
        }
        multiArr[index] *= 2;
        multi /= 2;
    }
    for (var i = 0; i < lineArr.length; i++) {
        var pos = lineArr[i];
        multiView[pos] += multiArr[i] * 10;
    }
    return multiView;
};

var GetFinalView = function (multiView, bpl) {
    var view = Util.clone(multiView);
    var multiPositions = [],
        multiValues = [],
        totalMulti = 1,
        multiLineIndex = -1;
    for (var i = 0; i < multiView.length; i++) {
        var symbol = multiView[i];
        var symbolMulti = Math.floor(symbol / 10);
        if (symbolMulti > 1) {
            multiPositions.push(i);
            multiValues.push(symbolMulti);
            totalMulti *= symbolMulti;
        }
        view[i] = symbol % 10;
    }
    if (multiPositions.length > 0) {
        WinFromView(multiView, bpl);
        for (var i = 0; i < winLines.length; i++) {
            var lines = winLines[i].split("~");
            lines = lines.slice(2);
            if (lines.indexOf(String(multiPositions[0])) >= 0) {
                multiLineIndex = i;
                break;
            }
        }
    }
    return {
        view: view,
        multiPositions: multiPositions,
        multiValues: multiValues,
        totalMulti: totalMulti,
        multiLineIndex: multiLineIndex,
    };
};

var WinFromView = function (view, bpl) {
    winLines = [];
    tumbling = [];
    var winLineIndex = 0;
    var winMoney = 0;
    for (var i = 0; i < view.length; i++) {
        if (tumbling.indexOf(i) < 0) {
            var line = [i];
            var symbolId = view[i] % 10;
            RecursiveSearch(view, i, line, symbolId);

            var matchCount = line.length;
            var money = payTable[matchCount][symbolId] * bpl;
            if (money > 0) {
                var multi = 1;
                for (var j = 0; j < matchCount; j++) {
                    var pos = line[j];
                    var symbolMulti = Math.floor(view[pos] / 10);
                    if (symbolMulti > 1) {
                        multi *= symbolMulti;
                    }
                }

                money *= multi;
                winLines.push(`${winLineIndex++}~${money}~${line.join("~")}`);
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
        var symbol = view[nextPos] % 10;
        if (symbol == symbolId) {
            if (line.indexOf(nextPos) < 0) {
                line.push(nextPos);
                RecursiveSearch(view, nextPos, line, symbolId);
            }
        }
    }
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

    while (true) {
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

        var randomView = RandomView(freeReels);
        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
            }
        }

        if (!isDoubleScatterInLine(tumbleView)) {
            break;
        }
    }

    return tumbleView;
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

var isScatter = function (symbol) {
    return symbol == scatter;
};

module.exports = SlotMachine;