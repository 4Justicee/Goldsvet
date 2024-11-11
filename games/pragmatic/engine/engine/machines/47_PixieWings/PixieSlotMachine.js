var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 50;
    //                                 
    this.view = [];
    this.maskView = [];
    this.mysterySymbols = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                           
    this.freeSpinType = -1;
    this.freeSpinReelIndex = 0;
    this.freeSpinStackSymbol = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var scatter = 1;
var wild = 2;
var mysterySymbol = 12;
var slotWidth = 5;
var slotHeight = 4;
var baseReels = [
    [11, 7, 9, 3, 11, 10, 1, 5, 4, 5, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 6, 3, 11, 7, 5, 11, 1, 11, 3, 11, 9, 11, 8, 9, 3, 5, 9, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 3, 11, 1, 5, 11, 9, 11, 5, 2, 7, 9, 5],
    [8, 6, 8, 3, 8, 11, 1, 6, 5, 8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 7, 4, 8, 6, 4, 8, 1, 6, 10, 4, 6, 8, 6, 4, 9, 10, 8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 6, 4, 8, 1, 6, 4, 8, 6, 8, 2, 6, 8, 6, 10, 8, 10],
    [11, 7, 9, 3, 11, 10, 1, 11, 4, 5, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 6, 3, 5, 7, 11, 7, 1, 7, 3, 7, 11, 9, 8, 11, 3, 11, 9, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 9, 3, 11, 1, 7, 5, 9, 7, 11, 2, 9, 7, 5, 7, 9, 5, 1, 7, 9, 5, 9],
    [10, 6, 10, 3, 10, 11, 1, 6, 5, 8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 7, 6, 8, 6, 4, 10, 1, 8, 4, 6, 4, 6, 4, 10, 9, 8, 4, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 4, 6, 10, 1, 4, 10, 8, 10, 8, 2, 8, 10, 4, 8, 6, 8, 1, 8, 10, 6],
    [11, 9, 5, 3, 5, 10, 1, 11, 4, 9, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 6, 3, 11, 9, 11, 7, 1, 11, 3, 9, 11, 7, 8, 11, 3, 11, 4, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 7, 3, 7, 1, 7, 11, 7, 5, 7, 2, 7, 9, 11, 7, 9, 7, 9, 11, 7, 9],
];
var freeReels = [
    [
        [10, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 3, 10, 7, 6, 3, 6, 6, 4, 4, 3, 3, 3, 3, 3, 3, 5, 1, 2, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 11, 11, 8, 5, 10, 8],
        [8, 3, 3, 3, 3, 3, 3, 3, 3, 7, 11, 11, 1, 6, 3, 3, 3, 3, 3, 3, 7, 6, 2, 8, 3, 3, 3, 3, 3, 3, 3, 6, 6, 7, 5, 10, 4, 4, 3, 9, 3, 3, 3, 3, 3, 3, 3, 10, 8, 6, 3],
        [3, 3, 3, 3, 3, 3, 3, 1, 2, 10, 6, 9, 7, 8, 2, 3, 5, 8, 11, 7, 9, 8, 3, 11, 4, 7, 7, 3, 3, 3, 3, 3, 3, 3, 4, 11, 9, 3, 5, 10, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 4, 5, 10, 3, 3, 3, 3, 3, 3, 3, 11, 9, 10, 3, 2, 7, 8, 7, 10, 6, 11, 4, 5, 8, 6, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 7, 9, 7, 3, 9, 11, 8, 5, 6, 6, 10, 3, 3, 3, 3, 3, 3, 3, 3, 11, 10, 5, 5, 4, 5, 3, 3, 3, 3, 3, 3, 9, 2, 4, 10, 10, 7],
    ],
    [
        [10, 9, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 2, 4, 3, 7, 4, 4, 4, 4, 4, 4, 4, 3, 11, 6, 6, 6, 4, 5, 7, 1, 8, 4, 4, 4, 4, 4, 10, 9, 7, 11],
        [1, 9, 2, 4, 4, 4, 4, 4, 4, 4, 4, 6, 11, 10, 4, 4, 4, 4, 4, 4, 3, 11, 4, 4, 4, 4, 5, 6, 6, 4, 10, 5, 7, 6, 8, 7, 9, 4, 4, 4, 4, 4, 4, 4, 4, 3, 10],
        [4, 4, 4, 4, 4, 4, 4, 4, 9, 8, 9, 1, 11, 5, 4, 9, 7, 4, 4, 4, 4, 4, 4, 4, 11, 7, 8, 3, 7, 4, 10, 5, 8, 4, 4, 4, 4, 4, 4, 4, 2, 6, 8, 3],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 8, 11, 6, 4, 4, 4, 4, 4, 4, 4, 3, 10, 4, 7, 5, 10, 11, 1, 8, 4, 8, 6, 5, 2, 7, 7, 10, 4, 4, 4, 4, 4, 11],
        [10, 7, 5, 4, 4, 4, 4, 4, 4, 4, 4, 9, 9, 1, 4, 4, 4, 4, 4, 4, 4, 7, 5, 4, 10, 8, 11, 2, 5, 11, 6, 3, 5, 3, 10, 3, 6, 8, 4, 4, 4, 4, 4, 4],
    ],
    [
        [6, 5, 5, 5, 5, 5, 5, 5, 5, 7, 3, 7, 11, 3, 9, 1, 7, 11, 5, 5, 5, 5, 5, 5, 5, 9, 4, 6, 9, 10, 8, 10, 6, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 8, 4],
        [11, 5, 5, 5, 5, 5, 5, 5, 5, 9, 7, 6, 9, 10, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 11, 5, 5, 5, 5, 5, 1, 11, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 8, 10, 3, 3, 8],
        [7, 5, 5, 5, 5, 5, 5, 5, 5, 9, 10, 11, 8, 3, 4, 4, 5, 3, 7, 8, 5, 5, 5, 5, 5, 5, 5, 5, 8, 2, 6, 9, 9, 7, 5, 5, 5, 5, 5, 5, 5, 5, 11, 6, 1, 3, 8],
        [4, 9, 5, 5, 5, 5, 5, 5, 4, 10, 8, 5, 5, 5, 5, 5, 5, 7, 3, 2, 5, 11, 1, 7, 5, 3, 4, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 7, 10, 10, 9, 11, 6],
        [5, 5, 5, 5, 5, 5, 5, 5, 1, 7, 6, 11, 4, 9, 5, 5, 5, 5, 5, 5, 4, 5, 3, 9, 8, 5, 10, 8, 3, 2, 5, 5, 5, 5, 5, 5, 11, 10, 10, 3, 10, 7],
    ],
    [
        [10, 10, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 10, 11, 11, 5, 4, 6, 6, 6, 6, 6, 6, 6, 3, 8, 2, 11, 8, 7, 7, 9, 5, 6, 6, 6, 6, 6, 6, 6, 3, 7, 9, 4],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11, 5, 7, 3, 11, 10, 6, 6, 6, 6, 6, 6, 6, 10, 7, 4, 9, 5, 1, 8, 8, 7, 11, 4, 9, 6, 6, 6, 6, 6, 6, 6, 6, 10, 3, 8, 2, 3],
        [8, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 9, 4, 10, 5, 11, 6, 6, 6, 6, 6, 6, 6, 4, 8, 11, 7, 11, 8, 9, 7, 6, 6, 6, 6, 6, 6, 9, 7, 3, 8, 3, 10, 2, 1, 5, 4, 10],
        [3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 8, 9, 11, 4, 1, 4, 11, 5, 11, 6, 6, 6, 6, 6, 6, 7, 9, 7, 10, 7, 3, 10, 6, 6, 6, 6, 6, 6, 8, 2],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 9, 3, 5, 10, 7, 7, 4, 7, 3, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 11, 10, 8, 5, 9, 6, 6, 6, 6, 6, 6, 1, 5, 2],
    ],
    [
        [1, 4, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 10, 10, 9, 10, 9, 6, 11, 7, 2, 2, 2, 2, 2, 2, 11, 4, 5, 5, 8, 8, 5, 2, 2, 2, 2, 3, 4, 6],
        [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 9, 7, 5, 7, 7, 6, 10, 8, 2, 2, 2, 2, 2, 2, 3, 6, 9, 7, 8, 6, 11, 11, 2, 2, 2, 2, 2, 2, 2, 2, 8, 3, 4, 3, 10, 6, 1],
        [9, 2, 2, 2, 2, 2, 2, 2, 11, 3, 8, 9, 2, 2, 2, 2, 2, 2, 8, 7, 9, 9, 11, 8, 4, 8, 5, 10, 4, 3, 1, 2, 2, 2, 2, 8, 6, 7, 10, 5],
        [10, 8, 6, 3, 2, 2, 2, 2, 2, 2, 3, 11, 8, 11, 10, 1, 5, 2, 2, 2, 2, 2, 8, 11, 8, 10, 6, 9, 11, 6, 2, 2, 2, 2, 2, 2, 7, 9, 7, 4, 9, 4],
        [4, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 7, 10, 3, 7, 2, 2, 2, 2, 2, 9, 10, 4, 3, 10, 6, 7, 2, 2, 2, 2, 2, 2, 3, 5, 1, 9, 2, 2, 2, 2, 3, 5, 8],
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 10, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 40, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    [0, 0, 150, 30, 20, 18, 15, 12, 10, 9, 8, 7, 0],
    [0, 0, 500, 75, 45, 30, 25, 20, 15, 14, 13, 12, 0],
];
var payLines = [
    [0, 1, 2, 3, 4], // 1
    [15, 16, 17, 18, 19], // 2
    [5, 6, 7, 8, 9], // 3
    [10, 11, 12, 13, 14], // 4
    [0, 6, 12, 8, 4], // 5
    [15, 11, 7, 13, 19], // 6
    [10, 6, 2, 8, 14], // 7
    [5, 11, 17, 13, 9], // 8
    [0, 6, 2, 8, 4], // 9
    [15, 11, 17, 13, 19], // 10
    [5, 1, 7, 3, 9], // 11
    [10, 16, 12, 18, 14], // 12
    [5, 11, 7, 13, 9], // 13
    [10, 6, 12, 8, 14], // 14
    [0, 6, 7, 8, 4], // 15
    [15, 11, 12, 13, 19], // 16
    [5, 1, 2, 3, 9], // 17
    [10, 16, 17, 18, 14], // 18
    [5, 11, 12, 13, 9], // 19
    [10, 6, 7, 8, 14], // 20
    [0, 1, 7, 3, 4], // 21
    [15, 16, 12, 18, 19], // 22
    [5, 6, 2, 8, 9], // 23
    [10, 11, 17, 13, 14], // 24
    [5, 6, 12, 8, 9], // 25
    [10, 11, 7, 13, 14], // 26
    [0, 1, 12, 3, 4], // 27
    [15, 16, 7, 18, 19], // 28
    [10, 11, 2, 13, 14], // 29
    [5, 6, 17, 8, 9], // 30
    [0, 11, 12, 13, 4], // 31
    [15, 6, 7, 8, 19], // 32
    [10, 1, 2, 3, 14], // 33
    [5, 16, 17, 18, 9], // 34
    [5, 1, 12, 3, 9], // 35
    [10, 16, 7, 18, 14], // 36
    [5, 11, 2, 13, 9], // 37
    [10, 6, 17, 8, 14], // 38
    [0, 11, 2, 13, 4], // 39
    [15, 6, 17, 8, 19], // 40
    [10, 1, 12, 3, 14], // 41
    [5, 16, 7, 18, 9], // 42
    [0, 11, 7, 13, 4], // 43
    [15, 6, 12, 8, 19], // 44
    [10, 1, 7, 3, 14], // 45
    [5, 16, 12, 18, 9], // 46
    [0, 1, 7, 13, 19], // 47
    [15, 16, 12, 8, 4], // 48
    [0, 6, 12, 18, 19], // 49
    [15, 11, 7, 3, 4], // 50
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 10; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

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
        this.maskView = cache.mystery;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        this.view = this.freeSpinCacheList[0][0].view;
        this.maskView = this.freeSpinCacheList[0][0].mystery;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);
    }

    // msi_p                                                      
    this.mysterySymbols = [];
    for (var i = 0; i < slotWidth; i++) {
        this.mysterySymbols[i] = Util.random(wild, mysterySymbol);
    }

    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (isMysterySymbol(this.maskView[pos])) {
                this.mysterySymbols[i] = this.view[pos];
                break;
            }
        }
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (isFreeSpinWin(this.view)) {
        //                          
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpinOption = async function (player, select) {
    this.freeSpinType = Number(select);

    this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
    this.freeSpinLength = this.freeSpinCacheList[0].freeSpinLength;
    this.freeSpinReelIndex = this.freeSpinCacheList[0].reelIndex;
    this.freeSpinStackSymbol = this.freeSpinCacheList[0].stackSymbol;
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var result;

    if (baseWin > 0) {
        result = RandomWinView(baseReels, bpl, baseWin);
    } else {
        result = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: result.cache,
        win: result.win,
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
    // FS                
    var viewList = [];
    var moneyList = [];

    //                    
    var mysteryView = RandomScatterView(baseReels);
    var scatterView = GetFinalView(mysteryView);
    var scatterWinMoney = WinFromView(scatterView, bpl);

    var lengthArray = [5, 7, 9, 11];
    var symbolArray = [3, 4, 5, 6];

    for (var i = 0; i < 5; i++) {
        var freeSpinLength = 0; //             
        var stackSymbol = 0;
        var reelIndex = i;

        //                                                     
        if (i == 4) {
            freeSpinLength = Util.random(3, 12);
            stackSymbol = Util.random(2, 6);
        } else {
            freeSpinLength = lengthArray[i];
            stackSymbol = symbolArray[i];
        }

        viewList[i] = [];

        var scatterCache = {
            view: scatterView,
            mystery: mysteryView,
            freeSpinLength: freeSpinLength,
            stackSymbol: stackSymbol,
            reelIndex: reelIndex,
        };

        viewList[i] = [scatterCache];

        var result = RandomFreeViewCache(freeReels[reelIndex], bpl, fsWin, freeSpinLength, reelIndex, stackSymbol);

        viewList[i] = viewList[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: viewList,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, mysteryView, tmpWin, viewCache;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        mysteryView = RandomView(reels);
        tmpView = GetFinalView(mysteryView);

        tmpWin = WinFromView(tmpView, bpl);

        viewCache = {
            view: tmpView,
            mystery: mysteryView,
        };

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return { cache: viewCache, win: tmpWin };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, mysteryView, tmpWin, viewCache;

    while (true) {
        mysteryView = RandomView(reels);
        tmpView = GetFinalView(mysteryView);

        tmpWin = WinFromView(tmpView, bpl);

        viewCache = {
            view: tmpView,
            mystery: mysteryView,
        };

        if (tmpWin == 0) {
            break;
        }
    }
    return { cache: viewCache, win: tmpWin };
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

        if (isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, reelIndex, stackSymbol) {
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
                //                              
                if (reelIndex == 4) {
                    var tmpView = RandomFreeView(reels);
                    fsview = GetFinalViewForFree(tmpView, stackSymbol);
                } else {
                    fsview = RandomFreeView(reels);
                }

                fsWin = WinFromView(fsview, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

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

var RandomFreeView = function (reels) {
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
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i]))
            //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    //                                
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        .
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;
    return winPay;
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

var isMysterySymbol = function (symbol) {
    return symbol == mysterySymbol;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var GetFinalView = function (mysteryView) {
    var finalView = Util.clone(mysteryView);

    for (var i = 0; i < slotWidth; i++) {
        var paySymbol = Util.random(wild, mysterySymbol);
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (isMysterySymbol(finalView[pos])) {
                finalView[pos] = paySymbol;
            }
        }
    }
    var result = finalView;
    return result;
};

var GetFinalViewForFree = function (baseView, symbol) {
    var result = Util.clone(baseView);

    for (var i = 0; i < baseView.length; i++) {
        if (result[i] == 2) {
            result[i] = symbol;
        }
    }
    return result;
};

module.exports = SlotMachine;