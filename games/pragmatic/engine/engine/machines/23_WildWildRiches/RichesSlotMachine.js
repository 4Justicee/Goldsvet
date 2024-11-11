var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.moneyCache = {};
    this.moneyTotalValue = 0;
    this.moneyPositions = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    this.doubleMulti = 0.2;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1;
var wild = 2;
var moneySymbol = 12;
var empty = 13;
var slotWidth = 5;
var slotHeight = 4;
var freeSpinCount = 10;
var baseReels = [
    [11, 11, 11, 5, 5, 8, 8, 3, 9, 8, 8, 5, 5, 7, 6, 6, 9, 9, 2, 10, 9, 8, 6, 6, 7, 7, 5, 5, 10, 6, 10, 11, 2, 8, 8, 9, 4, 4, 7, 10, 10, 7, 10, 4, 7, 7, 5, 5, 11, 5, 11, 11, 9, 9, 11, 2, 7, 11, 7, 7, 6, 6, 11, 10, 10, 2, 10, 4, 4, 11, 6, 11, 4, 11, 9, 9, 3, 3, 11, 9, 2, 11, 8, 9, 11, 7, 9, 9, 10, 3, 3, 10, 9, 8, 10, 8, 8, 2, 8, 9, 4, 9, 8, 8, 2, 8, 4, 4, 10, 9, 7, 10, 7, 7, 2, 7, 5, 5, 11, 11, 5, 5, 10, 10, 7, 2, 7, 7, 6, 7, 10, 6, 6, 10, 10, 2, 4, 10, 9, 4, 11, 11, 7, 8, 8, 3, 3, 11, 5, 7, 7, 6, 9, 6, 10, 4, 10, 10, 6, 10, 4, 11, 3, 11, 11, 4, 11, 9, 9, 3, 9, 8, 9, 11, 9, 9, 11, 9, 9, 3, 8, 7, 9, 10, 7, 8, 10, 5, 10, 9, 8, 2, 10, 11, 7, 8, 9, 4, 10, 8, 5, 10, 7, 10],
    [7, 7, 8, 8, 5, 5, 7, 7, 2, 8, 8, 11, 11, 3, 5, 9, 4, 11, 6, 11, 11, 9, 2, 6, 10, 3, 9, 6, 6, 8, 8, 11, 9, 9, 6, 6, 10, 10, 7, 5, 5, 10, 7, 11, 11, 11, 2, 9, 9, 5, 5, 7, 9, 6, 6, 7, 7, 4, 7, 7, 9, 6, 8, 2, 9, 8, 8, 3, 6, 9, 11, 10, 11, 2, 9, 9, 6, 10, 2, 10, 10, 6, 6, 4, 4, 7, 2, 7, 7, 4, 4, 6, 6, 10, 10, 2, 10, 10, 11, 11, 11, 3, 11, 10, 9, 5, 4, 9, 5, 3, 11, 8, 9, 2, 11, 3, 6, 10, 11, 7, 10, 2, 7, 8, 9],
    [11, 10, 3, 11, 4, 12, 12, 12, 12, 10, 11, 6, 6, 6, 6, 1, 7, 10, 3, 3, 3, 3, 10, 7, 10, 9, 9, 10, 12, 10, 9, 12, 12, 6, 8, 12, 12, 8, 11, 3, 3, 3, 3, 12, 7, 5, 5, 12, 11, 3, 4, 11, 7, 8, 3, 10, 9, 9, 5, 4, 7, 12, 12, 7, 3, 3, 10, 6, 11, 1, 7, 4, 5, 3, 3, 3, 7, 12, 12, 12, 10, 7, 10, 10, 4, 5, 3, 3, 3, 7, 12, 12, 12, 12, 8, 12, 12],
    [7, 7, 12, 12, 12, 12, 6, 6, 11, 11, 11, 12, 12, 7, 7, 12, 12, 4, 4, 9, 9, 12, 6, 6, 6, 6, 12, 12, 10, 10, 12, 8, 8, 4, 4, 4, 12, 12, 12, 10, 8, 8, 8, 5, 5, 5, 5, 10, 10, 10, 12, 12, 12, 3, 3, 8, 8, 8, 12, 12, 9, 9, 9, 9, 11, 11, 11, 5, 5, 5, 5, 12, 12, 12, 12, 4, 4, 4, 4, 7, 7, 7, 7, 6, 6, 6, 12, 12, 9, 9, 12, 12, 12, 4, 4, 11, 11, 11, 12, 12, 6, 6, 6, 8, 8, 12, 12, 3, 3, 3, 3, 8, 8, 12, 12, 12, 7, 12, 12, 5, 5, 5, 5, 7, 7, 7, 12, 12, 8, 8, 8, 12, 12, 12, 10, 8, 12, 12, 12, 12, 8, 5, 6, 7, 3, 8, 5, 4, 8, 3, 6, 8, 3, 5, 6, 9, 11, 12, 12, 12, 7, 4, 7, 5, 8, 7, 3, 8, 5, 6, 3, 8, 10, 9, 6, 8, 4, 7, 11, 6, 5, 11, 6, 3, 8, 9, 7, 5, 9, 12, 12, 12, 12, 12, 12, 12, 12, 9, 5, 6, 9],
    [11, 11, 11, 11, 3, 3, 3, 3, 8, 8, 8, 8, 10, 10, 10, 9, 9, 9, 9, 12, 12, 12, 12, 4, 4, 4, 4, 7, 7, 7, 7, 9, 5, 9, 11, 8, 5, 10, 11, 7, 10, 12, 12, 4, 4, 12, 12, 9, 9, 7, 7, 7, 5, 5, 5, 5, 12, 12, 12, 12, 12, 12, 10, 11, 11, 11, 3, 11, 10, 9, 5, 4, 9, 11, 7, 6, 11, 10, 3, 8, 11, 3, 9, 12, 12, 12, 12, 11, 10, 9, 11, 8, 5, 10, 11, 7, 10, 8, 12, 12, 12, 12, 12, 12, 12, 12, 5, 9, 9, 9, 9, 7, 7, 7, 7, 12, 12, 12, 12, 10, 10, 11, 11, 11, 3, 11, 10, 9, 5, 4, 9, 11, 7, 6, 11, 10, 3, 8, 11, 12, 12, 12, 12, 3, 6, 11, 10, 9, 11, 8, 5, 10, 11, 7, 10, 9, 4, 8, 10, 9, 6, 10, 9, 11, 12, 12, 8, 11, 9, 4, 12, 12, 12, 12, 7, 8, 10, 7, 8, 6, 5, 8, 12, 12, 12, 12, 12, 12, 12, 5, 9, 3, 10, 9, 5, 12, 12, 12, 12, 12, 12],
];
var noMoneyReels = [
    [11, 11, 11, 5, 5, 8, 8, 3, 9, 8, 8, 5, 5, 7, 6, 6, 9, 9, 2, 10, 9, 8, 6, 6, 7, 7, 5, 5, 10, 6, 10, 11, 2, 8, 8, 9, 4, 4, 7, 10, 10, 7, 10, 4, 7, 7, 5, 5, 11, 5, 11, 11, 9, 9, 11, 2, 7, 11, 7, 7, 6, 6, 11, 10, 10, 2, 10, 4, 4, 11, 6, 11, 4, 11, 9, 9, 3, 3, 11, 9, 2, 11, 8, 9, 11, 7, 9, 9, 10, 3, 3, 10, 9, 8, 10, 8, 8, 2, 8, 9, 4, 9, 8, 8, 2, 8, 4, 4, 10, 9, 7, 10, 7, 7, 2, 7, 5, 5, 11, 11, 5, 5, 10, 10, 7, 2, 7, 7, 6, 7, 10, 6, 6, 10, 10, 2, 4, 10, 9, 4, 11, 11, 7, 8, 8, 3, 3, 11, 5, 7, 7, 6, 9, 6, 10, 4, 10, 10, 6, 10, 4, 11, 3, 11, 11, 4, 11, 9, 9, 3, 9, 8, 9, 11, 9, 9, 11, 9, 9, 3, 8, 7, 9, 10, 7, 8, 10, 5, 10, 9, 8, 2, 10, 11, 7, 8, 9, 4, 10, 8, 5, 10, 7, 10],
    [7, 7, 8, 8, 5, 5, 7, 7, 2, 8, 8, 11, 11, 3, 5, 9, 4, 11, 6, 11, 11, 9, 2, 6, 10, 3, 9, 6, 6, 8, 8, 11, 9, 9, 6, 6, 10, 10, 7, 5, 5, 10, 7, 11, 11, 11, 2, 9, 9, 5, 5, 7, 9, 6, 6, 7, 7, 4, 7, 7, 9, 6, 8, 2, 9, 8, 8, 3, 6, 9, 11, 10, 11, 2, 9, 9, 6, 10, 2, 10, 10, 6, 6, 4, 4, 7, 2, 7, 7, 4, 4, 6, 6, 10, 10, 2, 10, 10, 11, 11, 11, 3, 11, 10, 9, 5, 4, 9, 5, 3, 11, 8, 9, 2, 11, 3, 6, 10, 11, 7, 10, 2, 7, 8, 9],
    [11, 10, 3, 11, 4, 6, 7, 8, 9, 10, 11, 6, 6, 6, 6, 7, 7, 10, 3, 3, 3, 3, 10, 7, 10, 9, 9, 10, 10, 10, 9, 9, 6, 6, 8, 8, 8, 8, 11, 3, 3, 3, 3, 7, 7, 5, 5, 11, 11, 3, 4, 11, 7, 8, 3, 10, 9, 9, 5, 4, 7, 8, 6, 7, 3, 3, 10, 6, 11, 7, 7, 4, 5, 3, 3, 3, 7, 4, 4, 10, 10, 7, 10, 10, 4, 5, 3, 3, 3, 7, 11, 11, 9, 9, 8, 7, 7],
    [7, 7, 8, 9, 10, 11, 6, 6, 11, 11, 11, 10, 9, 7, 7, 8, 6, 4, 4, 9, 9, 5, 6, 6, 6, 6, 7, 7, 10, 10, 10, 8, 8, 4, 4, 4, 6, 6, 10, 10, 8, 8, 8, 5, 5, 5, 5, 10, 10, 10, 5, 5, 5, 3, 3, 8, 8, 8, 4, 4, 9, 9, 9, 9, 11, 11, 11, 5, 5, 5, 5, 8, 8, 9, 9, 4, 4, 4, 4, 7, 7, 7, 7, 6, 6, 6, 11, 11, 9, 9, 10, 10, 4, 4, 4, 11, 11, 11, 5, 5, 6, 6, 6, 8, 8, 6, 6, 3, 3, 3, 3, 8, 8, 9, 9, 7, 7, 10, 10, 5, 5, 5, 5, 7, 7, 7, 9, 9, 8, 8, 8, 5, 5, 6, 10, 8, 6, 6, 5, 5, 8, 5, 6, 7, 3, 8, 5, 4, 8, 3, 6, 8, 3, 5, 6, 9, 11, 7, 8, 9, 7, 4, 7, 5, 8, 7, 3, 8, 5, 6, 3, 8, 10, 9, 6, 8, 4, 7, 11, 6, 5, 11, 6, 3, 8, 9, 7, 5, 9, 9, 8, 8, 7, 7, 6, 6, 9, 9, 5, 6, 9],
    [11, 11, 11, 11, 3, 3, 3, 3, 8, 8, 8, 8, 10, 10, 10, 9, 9, 9, 9, 3, 3, 5, 5, 4, 4, 4, 4, 7, 7, 7, 7, 9, 5, 9, 11, 8, 5, 10, 11, 7, 10, 10, 7, 4, 4, 6, 6, 9, 9, 7, 7, 7, 5, 5, 5, 5, 8, 8, 9, 9, 6, 6, 10, 11, 11, 11, 3, 11, 10, 9, 5, 4, 9, 11, 7, 6, 11, 10, 3, 8, 11, 3, 9, 8, 5, 10, 7, 11, 10, 9, 11, 8, 5, 10, 11, 7, 10, 8, 8, 9, 9, 10, 10, 11, 11, 11, 5, 9, 9, 9, 9, 7, 7, 7, 7, 5, 5, 5, 5, 10, 10, 11, 11, 11, 3, 11, 10, 9, 5, 4, 9, 11, 7, 6, 11, 10, 3, 8, 11, 3, 4, 5, 6, 3, 6, 11, 10, 9, 11, 8, 5, 10, 11, 7, 10, 9, 4, 8, 10, 9, 6, 10, 9, 11, 4, 4, 8, 11, 9, 4, 4, 5, 5, 7, 7, 8, 10, 7, 8, 6, 5, 8, 11, 11, 10, 10, 10, 8, 8, 5, 9, 3, 10, 9, 5, 5, 9, 10, 10, 11, 9],
];
var freeReels = [
    [11, 11, 11, 5, 5, 8, 10, 10, 2, 8, 8, 5, 5, 2, 6, 6, 8, 9, 2, 8, 9, 8, 6, 6, 7, 7, 5, 5, 2, 6, 10, 5, 7, 11, 7, 7, 6, 6, 10, 11, 10, 2, 10, 4, 4, 11, 6, 11, 4, 11, 2, 9, 3, 3, 11, 9, 2, 11, 3, 9, 11, 3, 9, 10, 9, 3, 3, 10, 9, 2, 10, 8, 8, 2, 8, 9, 4, 9, 8, 8, 2, 8, 4, 4, 10, 9, 7, 2, 7, 7, 2, 7, 5, 5, 11, 2, 5, 5, 10, 10, 7, 2, 7, 7, 6, 7, 2, 6, 6, 10, 10, 2, 4, 10, 9, 4, 11, 11, 3, 11, 2, 3, 3, 8, 5, 9, 7, 6, 2, 6, 10, 4, 10, 10, 6, 10, 4, 11, 3, 11, 11, 4, 11, 3, 2, 3, 9, 8, 9, 11, 9, 2, 11, 9, 9, 3, 8, 3, 9, 10, 7, 2, 10, 5, 10, 9, 8, 2, 10, 11, 7, 8, 9, 4, 10, 2, 5, 10, 7, 10],
    [7, 7, 2, 8, 5, 5, 7, 7, 2, 8, 8, 11, 2, 11, 5, 9, 9, 2, 6, 11, 11, 9, 2, 6, 10, 10, 2, 6, 6, 8, 8, 5, 7, 4, 7, 2, 9, 6, 8, 2, 8, 9, 8, 3, 3, 2, 9, 11, 11, 2, 9, 3, 9, 10, 2, 10, 10, 6, 2, 4, 4, 7, 2, 7, 7, 4, 4, 6, 6, 10, 10, 2, 10, 10, 11, 2, 11, 3, 11, 10, 2, 5, 4, 9, 3, 3, 11, 8, 9, 2, 11, 3, 6, 10, 11, 7, 10, 2, 7, 8, 9],
    [11, 10, 3, 11, 4, 12, 12, 12, 12, 10, 11, 6, 6, 6, 6, 1, 7, 10, 7, 3, 3, 3, 10, 7, 10, 9, 9, 12, 12, 12, 9, 10, 9, 1, 5, 4, 7, 12, 12, 7, 3, 3, 10, 6, 11, 1, 7, 4, 5, 3, 3, 3, 7, 12, 12, 12, 12, 12, 12, 12, 10, 7, 10, 12, 12, 12, 12, 10, 4, 5, 3, 3, 3, 7, 12, 12, 12, 12, 8, 12, 12],
    [7, 7, 12, 12, 12, 12, 6, 6, 11, 11, 11, 12, 12, 7, 7, 12, 12, 4, 4, 9, 9, 12, 6, 6, 6, 6, 12, 12, 10, 10, 12, 12, 8, 8, 12, 12, 9, 9, 11, 11, 11, 5, 5, 5, 5, 12, 12, 12, 12, 10, 10, 10, 4, 4, 4, 4, 7, 12, 7, 7, 6, 6, 6, 12, 12, 9, 9, 9, 9, 12, 12, 12, 4, 4, 12, 11, 11, 12, 12, 6, 6, 6, 8, 8, 12, 12, 3, 3, 3, 3, 8, 8, 12, 12, 12, 7, 12, 12, 5, 5, 5, 5, 7, 7, 7, 12, 12, 8, 8, 8, 12, 12, 12, 10, 8, 12, 12, 12, 12, 8, 5, 6, 7, 3, 8, 5, 4, 8, 3, 6, 8, 3, 5, 6, 9, 11, 12, 12, 12, 7, 4, 7, 5, 8, 7, 3, 8, 5, 6, 3, 8, 10, 9, 6, 8, 4, 7, 11, 6, 5, 11, 6, 3, 8, 9, 7, 5, 9, 12, 12, 12, 12, 12, 12, 12, 12, 9, 5, 6, 9],
    [11, 11, 11, 11, 3, 3, 3, 3, 8, 8, 8, 8, 10, 10, 10, 9, 9, 9, 9, 12, 12, 12, 12, 4, 4, 4, 4, 7, 7, 7, 7, 12, 12, 12, 12, 12, 12, 12, 10, 11, 11, 11, 3, 11, 12, 9, 5, 4, 12, 11, 7, 6, 11, 10, 3, 8, 11, 3, 9, 12, 12, 12, 12, 11, 10, 9, 11, 8, 5, 10, 11, 7, 10, 8, 12, 12, 12, 12, 12, 12, 12, 12, 5, 5, 5, 5, 9, 9, 9, 12, 12, 7, 7, 7, 12, 12, 12, 12, 10, 10, 11, 11, 11, 3, 11, 10, 9, 5, 4, 9, 11, 7, 6, 11, 10, 3, 8, 11, 12, 12, 12, 12, 3, 6, 11, 10, 9, 11, 8, 5, 10, 11, 7, 10, 9, 4, 8, 10, 9, 6, 10, 9, 11, 12, 12, 8, 11, 9, 4, 12, 12, 12, 12, 7, 8, 10, 7, 8, 6, 5, 8, 12, 12, 12, 12, 12, 12, 12, 5, 9, 3, 10, 9, 5, 12, 12, 12, 12, 12, 12],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 20, 10, 8, 4, 4, 2, 2, 2, 0, 0],
    [0, 0, 0, 75, 50, 25, 10, 8, 8, 5, 5, 5, 0, 0],
    [0, 0, 0, 200, 100, 50, 25, 20, 15, 10, 10, 10, 0, 0],
];
var moneySymbolValues = [25, 50, 75, 100, 125, 150, 200, 250, 375, 625, 1250, 2500, 12500];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 40; //                                 ,                                               ,                                     .
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
        var cache = viewCache.view;
        this.view = cache.view;
        this.moneyCache = cache.moneyCache;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0].view;
        this.moneyCache = this.freeSpinCacheList[0].moneyCache;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.moneyTotalValue = MoneyWinFromCache(this.view, this.moneyCache, player.betPerLine);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalValue;
    this.winLines = winLines;
    this.moneyPositions = GetWinMoneyPositions(this.view);

    //                             
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinLength = freeSpinCount;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    this.moneyTotalValue = MoneyWinFromCache(this.view, this.moneyCache, player.betPerLine);
    this.winMoney = WinFromView(this.view, player.betPerLine) + this.moneyTotalValue;
    this.winLines = winLines;
    this.moneyPositions = GetWinMoneyPositions(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;
    this.freeSpinIndex++;

    if (this.freeSpinIndex > this.freeSpinLength) {
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
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var freeSpinView = RandomScatterView(noMoneyReels);
    var freeSpinViewWin = WinFromView(freeSpinView, bpl);
    var result = {
        view: freeSpinView,
        moneyCache: RandomMoneySymbols(freeSpinView),
    };
    freeSpinViewWin += MoneyWinFromCache(freeSpinView, result.moneyCache, bpl);
    freeSpinView = result;

    var fsCount = freeSpinCount;
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push(freeSpinView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win + freeSpinViewWin,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView,
        tmpMoneyCache,
        tmpWin,
        calcCount = 0,
        bottomLimit = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpMoneyCache = RandomMoneySymbols(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, tmpMoneyCache, bpl);

        if (isCollectWin(tmpView)) {
            if (Util.probability(50)) {
                continue;
            }
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    var result = {
        view: {
            view: tmpView,
            moneyCache: tmpMoneyCache,
        },
        win: tmpWin,
    };

    return result;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpMoneyCache, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpMoneyCache = RandomMoneySymbols(tmpView);
        tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, tmpMoneyCache, bpl);

        if (tmpWin == 0) {
            break;
        }
    }

    var result = {
        view: {
            view: tmpView,
            moneyCache: tmpMoneyCache,
        },
        win: tmpWin,
    };

    return result;
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
        //                 15,16                      
        resultView[15] = empty;
        resultView[16] = empty;

        if (!isFreeSpinWin(resultView)) {
            break;
        }
    }
    return resultView;
};

var RandomScatterView = function (reels) {
    //                               
    var view = RandomView(reels);

    var hasWild = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth];
        if (isWild(reelSymbol)) {
            hasWild = true;
            break;
        }
    }
    //                                                         
    if (!hasWild) {
        //                                                     13                                                  
        var randomPos = Util.random(0, slotHeight - 1) * slotWidth;
        view[randomPos] = wild;
    }

    hasWild = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 1];
        if (isWild(reelSymbol)) {
            hasWild = true;
            break;
        }
    }
    //                                                         
    if (!hasWild) {
        //                                           
        var randomPos = Util.random(0, slotHeight - 1) * slotWidth + 1;
        view[randomPos] = wild;
    }

    var randomPos = Util.random(0, slotHeight - 1) * slotWidth + 2;
    view[randomPos] = scatter;
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
        var moneyCache = {};
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (true) {
            tmpView = RandomView(reels);
            moneyCache = RandomMoneySymbols(tmpView);
            tmpWin = WinFromView(tmpView, bpl) + MoneyWinFromCache(tmpView, moneyCache, bpl);

            var freeSpinData = {
                view: tmpView,
                moneyCache: moneyCache,
            };

            freeSpinCacheList.push(freeSpinData);
            freeSpinTotalWin += tmpWin;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin,
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

var GetWinMoneyPositions = function (view) {
    var moneyPositions = [];
    for (var i = 2; i < slotWidth; i++) {
        var noMoneyReel = true;
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (view[pos] >= moneySymbol) {
                moneyPositions.push(pos);
                noMoneyReel = false;
            }
        }
        if (noMoneyReel) {
            break;
        }
    }
    return moneyPositions;
};

var MoneySymbolPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var RandomMoneySymbols = function (view) {
    if (NumberOfMoneySymbols(view) == 0) return null;

    var moneyTable = DefaultMoneyCache().moneyTable;
    var moneyValues = DefaultMoneyCache().moneyValues;
    var moneyPositions = MoneySymbolPositions(view);

    for (var i = 0; i < moneyPositions.length; i++) {
        //                                                5                      
        var index = 0;
        if (Util.probability(50)) {
            index = Util.random(0, moneySymbolValues.length - 3);
        } else if (Util.probability(50)) {
            index = Util.random(5, moneySymbolValues.length - 3);
        } else {
            index = Util.random(8, moneySymbolValues.length - 3);
        }
        var value = moneySymbolValues[index];

        var pos = moneyPositions[i];
        moneyValues[pos] = value;
        moneyTable[pos] = "v";
    }

    var lastReelMoneys = [];
    //                                           
    for (var i = 0; i < slotHeight; i++) {
        var pos = 4 + i * slotWidth;
        var reelSymbol = view[pos];
        if (isMoneySymbol(reelSymbol)) {
            lastReelMoneys.push(pos);
        }
    }

    //                                            5                                   
    //                                                                  .
    if (lastReelMoneys.length > 0 && Util.probability(10)) {
        var pos = lastReelMoneys[Util.random(0, lastReelMoneys.length)];
        //             
        var value = 0,
            valueStr;
        if (Util.probability(70)) {
            value = 1250;
            valueStr = "jp3";
        } else if (Util.probability(70)) {
            value = 2500;
            valueStr = "jp2";
        } else {
            value = 12500;
            valueStr = "jp1";
        }
        moneyValues[pos] = value;
        moneyTable[pos] = valueStr;
    }

    var result = {
        table: moneyTable,
        values: moneyValues,
    };
    return result;
};

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
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var MoneyWinFromCache = function (view, moneyCache, bpl) {
    if (!isCollectWin(view)) {
        return 0;
    }

    var moneyWin = 0;

    //                                      
    for (var i = 2; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r") {
            moneyWin += moneyCache.values[i];
        }
    }

    var hasMoney = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 3];
        if (isMoneySymbol(reelSymbol)) {
            hasMoney = true;
            break;
        }
    }
    if (!hasMoney) {
        return moneyWin * bpl;
    }

    //                                      
    for (var i = 3; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r") {
            moneyWin += moneyCache.values[i];
        }
    }

    hasMoney = false;
    //                                           ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 4];
        if (isMoneySymbol(reelSymbol)) {
            hasMoney = true;
            break;
        }
    }
    if (!hasMoney) {
        return moneyWin * bpl;
    }

    //                                         
    for (var i = 4; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r") {
            moneyWin += moneyCache.values[i];
        }
    }

    return moneyWin * bpl;
};

var winLines = [];
var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    for (var i = 0; i < slotHeight; i++) {
        var history = [-1, -1, -1, -1, -1];
        var pos = i * slotWidth;
        history[0] = pos;
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    //                           ,                                               
    if (symbolId == empty || symbolId == moneySymbol) {
        return 0;
    }

    var winMoney = 0;

    //                                                             
    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId];
        winLines.push(`0~${winMoney}~${history.join("~")}`);
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
        var money = bpl * payTable[matchCount][symbolId];
        if (money > 0) {
            var lineResult = [];
            for (var i = 0; i < history.length; i++) {
                if (history[i] < 0) {
                    break;
                }
                lineResult.push(history[i]);
            }
            winLines.push(`0~${money}~${lineResult.join("~")}`);
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    var hasWild = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth];
        if (isWild(reelSymbol)) {
            hasWild = true;
            break;
        }
    }
    if (!hasWild) {
        return false;
    }

    hasWild = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 1];
        if (isWild(reelSymbol)) {
            hasWild = true;
            break;
        }
    }
    if (!hasWild) {
        return false;
    }

    var hasBonus = false;
    //                                           ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 2];
        if (isScatter(reelSymbol)) {
            hasBonus = true;
            break;
        }
    }
    if (!hasBonus) {
        return false;
    }

    return true;
};

var isCollectWin = function (view) {
    var hasWild = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth];
        if (isWild(reelSymbol)) {
            hasWild = true;
            break;
        }
    }
    if (!hasWild) {
        return false;
    }

    hasWild = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 1];
        if (isWild(reelSymbol)) {
            hasWild = true;
            break;
        }
    }
    if (!hasWild) {
        return false;
    }

    var hasMoney = false;
    //                                        ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 2];
        if (isMoneySymbol(reelSymbol)) {
            hasMoney = true;
            break;
        }
    }
    if (!hasMoney) {
        return false;
    }

    return true;
};


var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol;
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

module.exports = SlotMachine;