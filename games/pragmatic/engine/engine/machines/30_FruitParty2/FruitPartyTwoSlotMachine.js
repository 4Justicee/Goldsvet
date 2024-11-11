var Util = require('../../../utils/slot_utils');

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
    this.multiLineIndex = [];
    this.multiLineValues = [];
    this.wildTrail = "";
    this.wildMake = "";

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
var wild = 2;
var slotWidth = 7;
var slotHeight = 7;
var baseMulti = 2, freeMulti = 3;
var winLines = [];
var tumblingPositions = [];
var baseReels = [
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 1, 6, 9, 4, 4, 5, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 9, 6, 8, 7, 5, 5, 9, 8, 3, 3, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 8, 3, 5, 5, 3, 3, 4, 4, 4, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8, 6, 6, 6],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 1, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 9, 6, 8, 7, 5, 5, 9, 8, 3, 3, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 8, 3, 5, 5, 3, 3, 4, 4, 4, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8, 6, 6, 6],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 9, 1, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 9, 6, 8, 7, 5, 5, 9, 8, 3, 3, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 8, 3, 5, 5, 3, 3, 4, 4, 4, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 8, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8, 6, 6, 6],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 9, 8, 8, 4, 6, 9, 1, 5, 5, 8, 8, 7, 7, 9, 6, 8, 7, 5, 5, 9, 8, 3, 3, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 8, 3, 5, 5, 3, 3, 4, 4, 4, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8, 6, 6, 6],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 1, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 9, 6, 8, 7, 5, 5, 9, 8, 3, 3, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 8, 3, 5, 5, 3, 3, 4, 4, 4, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 1, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 9, 4, 4, 5, 3, 9, 8, 8, 1, 6, 9, 9, 5, 5, 8, 8, 7, 7, 9, 6, 8, 7, 5, 5, 9, 8, 3, 3, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 8, 3, 5, 5, 3, 3, 4, 4, 4, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 5, 9, 4, 4, 5, 3, 1, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 9, 6, 8, 7, 5, 5, 9, 8, 3, 3, 7, 9, 6, 4, 4, 4, 6, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 9, 4, 9, 9, 7, 6, 9, 9, 8, 3, 5, 5, 3, 3, 4, 4, 4, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 8, 4, 5, 3, 7, 8, 8, 7, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 8, 9, 8, 8, 4, 7, 9, 7, 6, 9, 9, 8, 5, 3, 7, 7, 8, 6, 9, 7, 6, 8, 5, 5, 4, 5, 3, 7, 7, 8, 4, 5, 7, 4, 8, 8]
];
var freeReels = [
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 4, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 4, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 4, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 4, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 5, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 9, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 6, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 5, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 3, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4],
    [9, 9, 3, 3, 6, 7, 6, 7, 5, 9, 5, 6, 9, 4, 3, 3, 9, 8, 8, 4, 6, 9, 9, 5, 5, 8, 8, 7, 7, 6, 6, 8, 7, 5, 5, 9, 8, 7, 9, 6, 4, 9, 9, 8, 7, 6, 6, 9, 9, 8, 6, 9, 8, 4, 9, 9, 9, 7, 6, 9, 9, 8, 5, 5, 5, 3, 3, 7, 7, 8, 6, 5, 7, 6, 8, 3, 5, 4, 4, 5, 5, 3, 7, 8, 8, 8, 8, 4, 5, 7, 4, 8, 8, 5, 4, 4, 3, 9, 9, 7, 8, 9, 3, 3, 3, 3, 8, 8, 4, 7, 7, 7, 6, 9, 9, 8, 3, 7, 7, 8, 6, 6, 9, 7, 6, 5, 5, 5, 7, 6, 6, 6, 8, 4, 4, 4]
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
    [0, 0, 0, 3000, 2000, 1800, 1600, 1200, 800, 400]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .),
    this.normalPercent = 40; //                                 ,                                               ,                                     .
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
    this.multiLineIndex = result.multiLineIndex;
    this.multiLineValues = result.multiLineValues;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(multiView, player.betPerLine);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumblingPositions);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
        this.wildTrail = GetWildTrail(this.tumbleCacheList[this.tumbleIndex]);
        this.wildMake = "";
    }

    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = GetFreeSpinCountFromView(this.view);
        this.currentGame = "FREE";

        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var tumbleCache = this.tumbleCacheList[this.tumbleIndex];

    var result = GetFinalView(tumbleCache.view, player.betPerLine);
    this.view = result.view;
    this.multiPositions = result.multiPositions;
    this.multiValues = result.multiValues;
    this.multiLineIndex = result.multiLineIndex;
    this.multiLineValues = result.multiLineValues;

    this.wildTrail = "";
    if (this.tumbleIndex < this.tumbleCacheList.length - 1) {
        this.wildTrail = GetWildTrail(this.tumbleCacheList[this.tumbleIndex + 1]);
    }
    var lastView = this.tumbleCacheList[this.tumbleIndex - 1];
    if (this.tumbleIndex > 1) {
        lastView = this.tumbleCacheList[this.tumbleIndex - 1].view;
    }

    this.wildMake = GetWildMake(lastView, this.tumbleCacheList[this.tumbleIndex]);

    this.winMoney = WinFromView(tumbleCache.view, player.betPerLine);
    this.winLines = winLines;

    this.tmb_res += this.winMoney;
    this.tumbles = GetTumbles(this.view, tumblingPositions);

    this.tumbleIndex++;
    //                 
    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
    }
}

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
    var firstView = this.tumbleCacheList[0];

    var result = GetFinalView(firstView, player.betPerLine);
    this.view = result.view;
    this.multiPositions = result.multiPositions;
    this.multiValues = result.multiValues;
    this.multiLineIndex = result.multiLineIndex;
    this.multiLineValues = result.multiLineValues;

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.winMoney = WinFromView(firstView, player.betPerLine);
    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumblingPositions);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
        this.wildTrail = GetWildTrail(this.tumbleCacheList[this.tumbleIndex]);
        this.wildMake = "";
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
        this.currentGame = "BASE";
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
        default: break;
    }

}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWin = ScatterWinFromView(scatterView, totalBet);
    var fsCount = GetFreeSpinCountFromView(scatterView);

    //                           
    var freeSpinCacheList = [];
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWin,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
}

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl, true);
    var scatterWin = ScatterWinFromView(scatterView, totalBet);
    var fsCount = GetFreeSpinCountFromView(scatterView);

    //                           
    var freeSpinCacheList = [];
    var fsCache = BuyBonusViewCache(freeReels, bpl, fsCount);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWin,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0, calcCount = 0;
    while (true) {
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
            var lastResult = viewList[viewList.length - 1];
            var lastView = lastResult;
            if (lastResult.view != undefined) {
                lastView = lastResult.view;
            }
            var lastTumblingPositions = Util.clone(tumblingPositions);
            var newResult = GetTumbleView(lastView, lastTumblingPositions, bpl, reels);
            if (isFreeSpinWin(newResult.view)) {
                continue;
            }

            var nWinMoney = WinFromView(newResult.view, bpl);
            viewList.push(newResult);
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
        var freeSpinCacheList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var view = RandomView(reels);
            var tumbleWinMoney = WinFromView(view, bpl);
            var viewList = [view];

            if (tumbleWinMoney > 0) {
                //                       
                while (true) {
                    var lastResult = viewList[viewList.length - 1];
                    var lastView = lastResult;
                    if (lastResult.view != undefined) {
                        lastView = lastResult.view;
                    }
                    var lastTumblingPositions = Util.clone(tumblingPositions);
                    var newResult = GetTumbleView(lastView, lastTumblingPositions, bpl, reels, true);
                    if (isFreeSpinWin(newResult.view)) {
                        continue;
                    }

                    var nWinMoney = WinFromView(newResult.view, bpl);
                    viewList.push(newResult);
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
        var tumbleWinMoney = WinFromView(view, bpl);
        var viewList = [view];

        if (tumbleWinMoney > 0) {
            //                       
            while (true) {
                var lastResult = viewList[viewList.length - 1];
                var lastView = lastResult;
                if (lastResult.view != undefined) {
                    lastView = lastResult.view;
                }
                var lastTumblingPositions = Util.clone(tumblingPositions);
                var newResult = GetTumbleView(lastView, lastTumblingPositions, bpl, reels, true);
                if (isFreeSpinWin(newResult.view)) {
                    continue;
                }

                var nWinMoney = WinFromView(newResult.view, bpl);
                viewList.push(newResult);
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var GetFinalView = function (multiView, bpl) {
    var view = Util.clone(multiView);
    var multiPositions = [], multiValues = [];
    for (var i = 0; i < multiView.length; i++) {
        var symbol = multiView[i];
        var symbolMulti = Math.floor(symbol / 10);
        if (symbolMulti > 1) {
            multiPositions.push(i);
            multiValues.push(symbolMulti);
        }
        view[i] = symbol % 10;
    }
    var multiLineIndex = [], multiLineValues = [];
    if (multiPositions.length > 0) {
        var group = GetTumbleGroup(multiView, bpl);
        for (var i = 0; i < group.length; i++) {
            for (var j = 0; j < multiPositions.length; j++) {
                if (group[i].indexOf(multiPositions[j])) {
                    //                              
                    var index = multiLineIndex.indexOf(i);
                    if (index >= 0) {
                        multiLineValues[index] += multiValues[index];
                    } else {
                        multiLineIndex.push(i);
                        multiLineValues.push(multiValues[j]);
                    }
                }
            }
        }
    }
    return {
        view: view,
        multiPositions: multiPositions,
        multiValues: multiValues,
        multiLineIndex: multiLineIndex,
        multiLineValues: multiLineValues
    };
};

var RandomScatterView = function (reels, bpl, isBuy = false) {
    while (true) {
        var view = RandomView(reels);
        if (WinFromView(view, bpl) == 0 && NumberOfScatters(view) == 0) {
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

    if (isBuy) {
        nScatters = 3;
    }

    for (var i = 0; i < nScatters; i++) {
        var reelNo = reelsPos[i];
        var pos = reelNo + Util.random(0, slotHeight) * slotWidth;
        view[pos] = scatter;
    }
    return view;
};

var GetFreeSpinCountFromView = function (view) {
    switch (NumberOfScatters(view)) {
        case 7: return 25;
        case 6: return 20;
        case 5: return 15;
        case 4: return 12;
        case 3: return 10;
    }
    return 0;
};

var WinFromView = function (view, bpl) {
    winLines = [];
    tumblingPositions = [];
    var winLineIndex = 0;
    var winMoney = 0;
    for (var i = 0; i < view.length; i++) {
        if (tumblingPositions.indexOf(i) < 0) {
            var line = [i];
            var symbolId = view[i] % 10;
            if (symbolId == wild) {
                continue;
            }

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
                winLines.push(`${winLineIndex++}~${money}~${line.join('~')}`);
                for (var i = 0; i < line.length; i++) {
                    if (tumblingPositions.indexOf(line[i]) < 0) {
                        tumblingPositions.push(line[i]);
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
        var symbol = view[nextPos] % 10;
        if (symbol == symbolId || symbol == wild) {
            if (line.indexOf(nextPos) < 0) {
                line.push(nextPos);
                RecursiveSearch(view, nextPos, line, symbolId);
            }
        }
    }
};

var GetTumbles = function (view, _tumblingPositions) {
    var tumbles = [];
    for (var i = 0; i < _tumblingPositions.length; i++) {
        var tumblePos = _tumblingPositions[i];
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    return tumbles;
};

var GetTumbleView = function (view, tumbles, bpl, reels, isFreeView = false) {
    var tumbleView = Util.clone(view);
    var wildPositions = [], multiValues = [];

    var tumbleGroup = GetTumbleGroup(view, bpl);
    for (var i = 0; i < tumbleGroup.length; i++) {
        wildPositions[i] = -1;
        multiValues[i] = 1;
        for (var j = 0; j < tumbleGroup[i].length; j++) {
            var pos = tumbleGroup[i][j];
            if (view[pos] % 10 == wild) {
                multiValues[i] = Math.floor(view[pos] / 10);
            }
        }
    }

    var p;
    if (Util.probability(80)) {
        p = 40;
    } else if (Util.probability(15)) {
        p = 80;
    } else if (Util.probability(4)) {
        p = 90;
    } else {
        p = 100;
    }

    //                                                            
    for (var i = 0; i < tumbleGroup.length; i++) {
        if (Util.probability(p)) {
            var randomPos = tumbleGroup[i][Util.random(0, tumbleGroup[i].length)];
            wildPositions[i] = randomPos;
            if (isFreeView) {
                multiValues[i] = Util.min(multiValues[i] * freeMulti, 729);
            } else {
                multiValues[i] = Util.min(multiValues[i] * baseMulti, 256);
            }
        }
    }

    while (true) {
        //           
        for (var i = 0; i < slotWidth; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                //                                    
                if (tumbles.indexOf(pos) >= 0) {
                    var tumbleGroupIndex = wildPositions.indexOf(pos);
                    if (tumbleGroupIndex >= 0) {
                        tumbleView[pos] = wild + 10 * multiValues[tumbleGroupIndex];
                        continue;
                    }
                    for (var k = j - 1; k >= 0; k--) {
                        tumbleView[i + (k + 1) * slotWidth] = tumbleView[i + k * slotWidth];
                    }
                    tumbleView[i] = -1;
                }
            }
        }

        var resultWild = [], resultMulti = [];
        for (var i = 0; i < wildPositions.length; i++) {
            if (wildPositions[i] >= 0) {
                resultWild.push(wildPositions[i]);
                resultMulti.push(multiValues[i]);
            }
        }

        var randomView = RandomView(reels);
        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
            }
        }

        if (!isDoubleScatterInLine(tumbleView)) {
            break;
        }
    }

    return {
        view: tumbleView,
        wildPositions: resultWild,  //                                      
        multiValues: resultMulti,   //                           
    };
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

var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
}
var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 7: return totalBet * 100;
        case 6: return totalBet * 20;
        case 5: return totalBet * 10;
        case 4: return totalBet * 5;
        case 3: return totalBet * 3;
    }
    return 0;
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

var GetTumbleGroup = function (view, bpl) {
    WinFromView(view, bpl);
    var result = [];
    for (var i = 0; i < winLines.length; i++) {
        var lines = winLines[i].split('~').slice(2);
        var group = [];
        for (var j = 0; j < lines.length; j++) {
            group.push(Number(lines[j]));
        }
        result.push(group);
    }
    return result;
};

var GetWildTrail = function (tumbleCache) {
    var wildPositions = tumbleCache.wildPositions;
    var multiValues = tumbleCache.multiValues;
    var trail = "";
    if (wildPositions.length > 0) {
        trail = `nmp~${wildPositions.join()};nmv~${multiValues.join()}`;
    }
    return trail;
};

var GetWildMake = function (prevView, tumbleCache) {
    var wildPositions = tumbleCache.wildPositions;
    var stf = "";
    if (wildPositions.length > 0) {
        var makeWilds = [];
        for (var i = 0; i < wildPositions.length; i++) {
            var pos = wildPositions[i];
            var symbol = prevView[pos];
            makeWilds.push(`${symbol}~${wild}~${pos}`);
        }
        stf = `w:${makeWilds.join()}`;
    }
    return stf;
}

module.exports = SlotMachine;