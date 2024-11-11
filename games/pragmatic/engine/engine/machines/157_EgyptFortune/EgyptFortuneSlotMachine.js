var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    this.freeSpinCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.n_rsl = [];
    this.freeSpinCom = [];

    this.respinMore = 0;
    this.respinStr = [];
    this.wildRespin = false;
    this.addRespinMore = 0;
    this.respinWinMoney = 0;
    this.prevRespinState = false;
    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var addSpinList = [
    { symbol: 2, cnt: 2 },
    { symbol: 3, cnt: 3 },
    { symbol: 4, cnt: 3 },
    { symbol: 5, cnt: 3 },
    { symbol: 6, cnt: 4 },
    { symbol: 7, cnt: 4 },
    { symbol: 8, cnt: 4 },
    { symbol: 9, cnt: 4 },
    { symbol: 10, cnt: 5 },
    { symbol: 11, cnt: 5 },
    { symbol: 12, cnt: 5 },
]
var baseReels = [
    [12, 8, 6, 12, 9, 6, 7, 12, 2, 9, 4, 12, 9, 5, 6, 7, 11, 1, 7, 11, 12, 5, 11, 12, 5, 1, 10, 12, 4, 8, 11, 3, 12, 10, 4, 8],
    [6, 12, 9, 10, 11, 5, 9, 8, 2, 7, 10, 8, 11, 4, 7, 8, 12, 7, 6, 12, 9, 11, 10, 3, 11, 8, 9, 10, 12, 3, 10, 11, 4, 8, 11, 6],
    [3, 11, 8, 12, 10, 11, 7, 8, 2, 6, 7, 9, 11, 3, 9, 6, 5, 10, 1, 12, 10, 5, 12, 1, 5, 6, 9, 10, 12, 9, 4, 1, 7, 10, 3, 9],
    [12, 8, 9, 6, 12, 3, 5, 11, 2, 12, 5, 10, 8, 9, 10, 12, 11, 10, 4, 12, 6, 10, 9, 5, 3, 9, 11, 4, 8, 7, 10, 6, 5, 10, 3, 6],
    [4, 8, 7, 6, 8, 4, 10, 3, 2, 7, 11, 4, 1, 6, 4, 9, 8, 10, 9, 11, 12, 9, 11, 10, 9, 1, 5, 8, 12, 9, 10, 7, 8, 1, 11, 7]
];
var freeSpinReels = [
    [   // 9,7,12
        [9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7],
        [7, 12, 9, 12, 9, 7, 12, 2, 12, 7, 12, 7, 9, 7, 12, 7, 12, 7, 12, 7],
        [9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7],
        [12, 9, 12, 9, 12, 7, 9, 2, 12, 9, 12, 9, 12, 9, 12, 9, 12, 9, 12, 9],
        [9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7, 12, 9, 7]
    ],
    [   // 10, 4, 3
        [10, 4, 10, 3, 10, 4, 10, 4, 10, 3, 10, 4, 10, 4, 10, 3, 10, 4, 10, 4],
        [10, 3, 10, 4, 10, 3, 10, 3, 10, 3, 10, 4, 10, 3, 10, 3, 10, 4, 10, 3],
        [3, 4, 10, 4, 3, 4, 10, 4, 3, 4, 10, 4, 3, 4, 10, 4, 3, 10, 3, 4],
        [10, 4, 10, 3, 10, 3, 10, 2, 10, 3, 10, 4, 10, 3, 10, 3, 10, 3, 10, 4],
        [3, 4, 10, 4, 10, 4, 10, 4, 10, 4, 10, 4, 3, 4, 10, 4, 3, 10, 3, 4]
    ],
    [   // 9,4,6
        [9, 4, 6, 9, 4, 6, 9, 4, 6, 9, 4, 6, 9, 4, 6, 9, 4, 6, 9, 4],
        [9, 6, 9, 6, 9, 6, 9, 2, 6, 4, 6, 4, 6, 9, 6, 4, 9, 4, 9, 6],
        [9, 4, 9, 6, 9, 4, 9, 4, 9, 6, 9, 4, 9, 6, 9, 4, 9, 4, 9, 4],
        [6, 9, 4, 9, 6, 9, 4, 9, 2, 9, 6, 4, 6, 4, 6, 9, 6, 4, 6, 9],
        [9, 6, 9, 4, 9, 6, 9, 6, 9, 6, 9, 4, 9, 6, 9, 4, 9, 6, 9, 6]
    ],
    [   // 11,5,3
        [11, 5, 11, 3, 11, 3, 11, 5, 3, 11, 3, 11, 5, 11, 3, 11, 5, 3, 11, 5],
        [5, 11, 5, 3, 5, 11, 5, 2, 5, 11, 5, 11, 5, 11, 3, 11, 5, 11, 5, 11],
        [11, 5, 11, 5, 11, 5, 11, 3, 11, 5, 11, 5, 11, 3, 11, 5, 11, 5, 11, 3],
        [11, 5, 11, 5, 11, 5, 11, 2, 5, 11, 3, 11, 5, 11, 3, 11, 5, 11, 3, 11],
        [11, 3, 11, 3, 11, 5, 11, 3, 11, 5, 11, 3, 11, 3, 11, 3, 11, 3, 11, 3]
    ],
    [   // 9,8,12
        [9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8],
        [12, 9, 12, 9, 12, 9, 12, 2, 9, 12, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8],
        [9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8],
        [12, 8, 12, 9, 12, 8, 12, 2, 12, 8, 12, 9, 12, 8, 12, 9, 12, 8, 12, 9],
        [9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8, 12, 9, 8]
    ],
    [   // 10,11,4
        [10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11],
        [10, 11, 10, 11, 10, 11, 10, 2, 10, 11, 10, 11, 10, 11, 4, 11, 10, 11, 10, 11],
        [10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11],
        [10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 4, 2, 11, 10, 11, 10, 11],
        [10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11, 4, 10, 11]
    ],
    [   // 10,6, 12
        [10, 6, 12, 10, 6, 12, 10, 6, 12, 10, 6, 12, 10, 6, 12, 10, 6, 12, 10, 6],
        [10, 12, 10, 12, 10, 12, 10, 2, 10, 12, 10, 12, 10, 6, 12, 6, 12, 6, 10, 12],
        [10, 6, 12, 10, 6, 12, 10, 6, 12, 10, 6, 12, 10, 6, 12, 10, 6, 12, 10, 6],
        [10, 12, 10, 12, 10, 12, 10, 2, 12, 10, 12, 10, 6, 12, 10, 12, 6, 12, 10, 12],
        [10, 6, 12, 10, 6, 12, 10, 6, 12, 6, 10, 6, 12, 6, 12, 10, 6, 12, 10, 6]
    ],
    [   // 5,4,3
        [5, 4, 5, 3, 5, 4, 5, 3, 5, 4, 5, 3, 5, 4, 5, 4, 5, 3, 5, 4],
        [3, 4, 3, 4, 5, 4, 3, 4, 3, 4, 5, 4, 3, 4, 3, 4, 5, 4, 3, 4],
        [5, 3, 5, 3, 5, 4, 5, 3, 5, 3, 5, 3, 5, 4, 3, 4, 5, 3, 5, 4],
        [5, 4, 5, 3, 5, 4, 5, 3, 5, 2, 5, 3, 5, 4, 5, 3, 5, 3, 5, 3],
        [5, 4, 5, 3, 5, 4, 5, 3, 5, 4, 5, 3, 5, 4, 3, 4, 5, 3, 5, 4]
    ],
    [   // 4,6,3
        [4, 6, 4, 6, 4, 3, 4, 6, 4, 6, 4, 3, 4, 6, 4, 6, 4, 3, 4, 6],
        [3, 6, 4, 6, 3, 6, 3, 6, 3, 6, 4, 6, 3, 6, 3, 6, 4, 6, 3, 6],
        [4, 3, 4, 6, 4, 3, 4, 6, 4, 3, 4, 6, 4, 3, 6, 3, 4, 6, 4, 3],
        [3, 6, 4, 6, 4, 6, 3, 2, 3, 6, 4, 6, 4, 6, 3, 6, 4, 6, 3, 4],
        [4, 6, 4, 6, 4, 3, 4, 6, 3, 6, 4, 3, 4, 6, 3, 6, 4, 3, 4, 3]
    ],
    [   // 5,7,3
        [5, 7, 5, 7, 5, 3, 5, 7, 5, 7, 5, 7, 5, 7, 5, 3, 5, 7, 5, 3],
        [7, 3, 7, 3, 7, 2, 7, 5, 7, 3, 7, 3, 7, 5, 7, 3, 7, 3, 7, 5],
        [3, 5, 7, 5, 3, 5, 7, 5, 3, 5, 7, 5, 3, 5, 7, 5, 3, 7, 3, 5],
        [7, 5, 7, 3, 5, 2, 7, 5, 7, 3, 5, 3, 7, 5, 7, 3, 7, 3, 7, 5],
        [3, 5, 7, 5, 7, 5, 7, 5, 3, 5, 7, 5, 7, 5, 7, 5, 3, 7, 3, 5]
    ]
];
var freeSpinSettingReel = [
    //                                                                                          
    [
        [9, 7, 12],
        [9, 12, 7],
        [7, 9, 12],
        [7, 12, 9],
        [12, 7, 9],
        [12, 9, 7]
    ],
    [
        [10, 4, 3],
        [10, 3, 4],
        [3, 10, 4],
        [3, 4, 10],
        [4, 10, 3],
        [4, 3, 10]
    ],
    [
        [9, 4, 6],
        [9, 6, 4],
        [4, 9, 6],
        [4, 6, 9],
        [6, 4, 9],
        [6, 9, 4]
    ],
    [
        [11, 5, 3],
        [11, 3, 5],
        [5, 11, 3],
        [5, 3, 11],
        [3, 5, 11],
        [3, 11, 5]
    ],
    [
        [9, 8, 12],
        [9, 12, 8],
        [8, 9, 12],
        [8, 12, 9],
        [12, 8, 9],
        [12, 9, 8]
    ],
    [
        [10, 11, 4],
        [10, 4, 11],
        [11, 10, 4],
        [11, 4, 10],
        [4, 11, 10],
        [4, 10, 11]
    ],
    [
        [10, 6, 12],
        [10, 12, 6],
        [6, 10, 12],
        [6, 12, 10],
        [12, 6, 10],
        [12, 10, 6]
    ],
    [
        [5, 4, 3],
        [5, 3, 4],
        [4, 5, 3],
        [4, 3, 5],
        [3, 4, 5],
        [3, 5, 4]
    ],
    [
        [4, 6, 3],
        [4, 3, 6],
        [6, 4, 3],
        [6, 3, 4],
        [3, 6, 4],
        [3, 4, 6]
    ],
    [
        [5, 7, 3],
        [5, 3, 7],
        [3, 7, 5],
        [3, 5, 7],
        [7, 5, 3],
        [7, 3, 5]
    ]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 20, 15, 15, 12, 10, 8, 5, 4],
    [0, 0, 0, 600, 400, 200, 100, 90, 80, 70, 60, 50, 40],
    [0, 0, 0, 1000, 800, 500, 400, 300, 200, 150, 100, 60, 50]
];
var payLines = [
    [5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4],
    [10, 11, 12, 1, 14],
    [0, 6, 12, 8, 4],
    [10, 6, 2, 8, 14],
    [5, 1, 2, 3, 9],
    [5, 11, 12, 1, 9],
    [0, 1, 7, 1, 14],
    [10, 11, 7, 3, 4],
    [5, 11, 7, 3, 9],
    [5, 1, 7, 1, 9],
    [0, 6, 7, 8, 4],
    [10, 6, 7, 8, 14],
    [0, 6, 2, 8, 4],
    [10, 6, 12, 8, 14],
    [5, 6, 2, 8, 9],
    [5, 6, 12, 8, 9],
    [0, 1, 12, 3, 4],
    [10, 11, 2, 1, 14],
    [0, 11, 12, 1, 4]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .),
    this.normalPercent = 40; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.prevRespinState = this.wildRespin;

    if (!this.wildRespin) {
        this.winMoney = 0;
    }

    this.winLines = [];
    this.addRespinMore = 0;
    this.rsStr = "";

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    if (this.wildRespin) {
        if (this.respinIndex == this.respinMore) {
            this.wildRespin = false;
            this.respinWinMoney = 0;
            return;
        }
        this.respinIndex++;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.n_rsl = viewCache.n_rsl;
        this.freeSpinCacheList = cache.viewList;
        this.view = this.freeSpinCacheList[0];
    }

    var winResult = WinFromView(this.view, player.betPerLine);

    //                                                                        
    if (this.wildRespin) {
        this.respinWinMoney = winResult.win;
    } else {
        this.winMoney = winResult.win;
    }

    var winLineResult = WinLinesFromView(this.view, player.betPerLine);
    this.winLines = winLineResult.winLines;

    if (this.winMoney > 0) {
        //                                                                  
        var addResult = getAdditionRespin(winLineResult.winningPos, winLineResult.winPosSymbol, winLineResult.winLineNo);
        if (addResult.rs_more > 0) {
            if (this.wildRespin) {
                this.respinMore += addResult.rs_more;
                this.addRespinMore = addResult.rs_more;
                this.rsStr = addResult.rsStr;
            } else {
                this.respinIndex = 1;
                this.respinMore = addResult.rs_more;
                this.wildRespin = true;
                this.rsStr = addResult.rsStr;
            }
        }

        //                                                                   
        if (this.wildRespin) {
            this.winMoney += this.respinWinMoney;
        }

    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };


    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += ScatterWinFromView(this.view, player.betPerLine * this.lineCount)
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
        this.freeSpinLength = 6;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine).win;
    var winResult = WinLinesFromView(this.view, player.betPerLine);
    this.winLines = winResult.winLines;

    for (var i = 0; i < winResult.winPosSymbol.length; i++) {
        this.freeSpinCom.push(winResult.winPosSymbol[i].sym);
    }

    var arr = this.freeSpinCom;
    var firstElem = arr[0];
    var secondIndex = arr.indexOf(firstElem, 1);
    var newArr = (secondIndex != -1) ? arr.slice(0, secondIndex) : arr;
    this.freeSpinCom = newArr;

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
    var tmpView, tmpWin;

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }
    tmpWin = WinFromView(tmpView, bpl).win;

    var pattern = {
        view: tmpView,
        win: tmpWin,
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
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl).win;
    var sccaterCount = 6;

    var index = Util.random(0, freeSpinSettingReel.length);
    var randFreeReel = freeSpinSettingReel[index];
    randFreeReel = randFreeReel[Util.random(0, freeSpinSettingReel[index].length)];
    //                                 
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeSpinReels[index], bpl, fsWin, sccaterCount);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        n_rsl: randFreeReel,
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl).win;
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return tmpView;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);

        tmpWin = WinFromView(tmpView, bpl).win;
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView;
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
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);
                fsWin = WinFromView(fsview, bpl).win;

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

var WinFromView = function (view, bpl) {
    var winMoney = 0;
    var matchingList = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);

        var payResult = WinFromLine(lineSymbols, bpl);

        var linePay = payResult.winMoney;

        if (linePay > 0) {
            var matchedSymbol = payResult.matchSymbol;
            matchingList.push(matchedSymbol);
        }
        winMoney += linePay;
    }

    return {
        win: winMoney,
        match: matchingList
    };
};

//                                                                                 
var getAdditionRespin = function (winPosArray, winPosSymNum, winLineNo) {
    // cnt: matchCount,
    // sym: symbol l~ 4;2;10,11,12,13 ~ 4;6;5,11,12,13

    var initWinPos = Util.clone(winPosArray); //                              
    var initWinPosSymbol = Util.clone(winPosSymNum); //                                       
    var initWinLineNum = Util.clone(winLineNo); //                   

    var resultStr = [];
    var addRespinCnt = 0;

    for (var i = 0; i < initWinPosSymbol.length; i++) {
        for (var j = 0; j < addSpinList.length; j++) {
            if (initWinPosSymbol[i].sym == addSpinList[j].symbol) {
                if (initWinPosSymbol[i].cnt == addSpinList[j].cnt) {
                    var str = `${initWinPosSymbol[i].cnt};${initWinLineNum[i]};${initWinPos.join()}`;
                    resultStr.push(str);
                    addRespinCnt += initWinPosSymbol[i].cnt;
                }
            }
        }
    }

    var rsStr = `l~${resultStr.join('~')}`;

    return {
        rsStr: rsStr,
        rs_more: addRespinCnt
    }

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

    var hasWild = false;
    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            hasWild = true;
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

    if (winPay > 0) {
        var matchingSymbol = {
            cnt: matchCount,
            sym: symbol
        }

        return {
            winMoney: winPay,
            matchSymbol: matchingSymbol
        };
    } else {
        var matchingSymbol = {
            cnt: 0,
            sym: 0
        }

        return {
            winMoney: winPay,
            matchSymbol: matchingSymbol
        };
    }
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
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

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 3:
            return totalBet * 1;
        default:
            break;
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

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var winPosArr = []; //                             
    var winPosSymbol = []; //                                                
    var winLineNo = []; //                       


    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);

        if (linePay.winMoney > 0) {
            var initWinPosArr = [];

            winLines.push(
                `${lineId}~${linePay.winMoney}~${line.filter(function (item, index, arr) {
                    if (lineSymbols[index] != -1) {
                        initWinPosArr.push(line[index]);
                    }
                    return lineSymbols[index] != -1;
                })
                    .join("~")}`
            );

            winLineNo.push(lineId);
            winPosArr.push(initWinPosArr);
            winPosSymbol.push(linePay.matchSymbol);
        }
    }

    return {
        winLines: winLines,
        winLineNo: winLineNo,
        winningPos: winPosArr,
        winPosSymbol: winPosSymbol
    };
};

module.exports = SlotMachine;