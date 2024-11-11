var Util = require("../../../utils/slot_utils");

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
    this.scatterViewIndex = 0;
    this.scatterViewList = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinPrepareStatus = false; // true:                      , false:             
    //                             
    this.freeSpinAPT = [];
    this.freeSpinAPV = [];
    this.freeSpinAPWA = [];
    this.freeSpinPList = [];
    //                            
    this.jewelSpinCacheList = [];
    this.jewelSpinIndex = 0;
    this.jewelStatus = "NOJEWEL";
    this.prevJewelStatus = "NOJEWEL";
    this.jewelValue = 0;
    this.jewelReelNo = -1;
    //           
    this.moneyTable = ["cv", "cv", "fg", "cv", "fg", "cv", "cv", "cv", "fg", "jp3", "cv", "cv", "cv", "fg", "cv", "cv", "fg", "jp2"];
    this.moneyValues = [125, 300, 20, 150, 20, 1000, 100, 1000, 20, 500, 400, 1500, 200, 20, 800, 300, 20, 2000];
    this.moneyFSList = [0, 0, 50, 0, 15, 0, 0, 0, 20, 0, 0, 0, 0, 15, 0, 0, 10, 0];
    this.fsTable = [];
    this.fsValues = [];
    this.fsList = [];

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
};

var wild = 2;
var empty = 15;
var butterfly = 1;
var congocash = 14;
var slotWidth = 5;
var slotHeight = 4;
var moneySymbol = "cv";
var freeSpinSymbol = "fg";
var jackPotValues = [40000, 2000, 500];
var jackPotMarks = ["jp1", "jp2", "jp3"];
var jewelValues = [100, 125, 150, 200, 240, 300, 320, 400, 500, 600, 800, 1000, 1500, 2000, 4000, 40000];
var freeSpinCountList = [8, 10, 12, 15, 20];
var winLines = [];
var baseReels = [
    [7, 11, 8, 5, 6, 4, 3, 1, 9, 10, 12, 4, 5, 1, 11, 4, 10, 11, 10, 5, 11, 5, 11, 4, 5, 10, 11, 1, 10, 5, 10, 1],
    [14, 10, 4, 8, 2, 6, 5, 7, 9, 12, 11, 3, 12, 2, 8, 9, 12, 2, 9, 6, 9, 8, 6, 9, 4, 12, 2, 10, 2, 10, 12, 8, 12, 9, 10, 3, 8, 12, 9, 10, 6, 2, 12, 2, 9, 2, 6, 8, 5, 10, 2, 12, 2, 9, 8, 9, 11, 2, 9, 6, 2, 4, 5, 2, 8, 2, 9, 6, 12, 3, 9, 10, 3, 9, 12, 9],
    [5, 3, 8, 2, 2, 2, 2, 6, 10, 4, 12, 7, 9, 11, 14, 10, 6, 12, 6, 2, 14, 6, 2, 7, 14, 6, 2, 8, 12, 6, 2, 7, 14, 2, 14, 4, 6, 8, 2, 4, 6, 7, 8, 14, 2, 6, 3],
    [10, 8, 2, 9, 3, 5, 6, 11, 4, 14, 7, 12, 5, 8, 2, 11, 9, 11, 2, 11, 9, 2, 11, 9, 2, 11, 12, 11, 9, 4, 9, 11, 14, 2, 4, 2, 5, 2, 3, 11, 4, 12, 2, 12, 2, 12, 11, 4, 8, 9, 4, 3, 11, 4, 3, 4, 5, 9, 11, 9, 2, 4, 3, 2, 7, 11, 9, 11, 2, 4, 9, 2, 11, 3, 11, 2, 11, 9, 11, 4],
    [10, 6, 12, 3, 5, 8, 4, 1, 2, 7, 11, 9, 12, 5, 7, 11, 12, 1, 8, 5, 11, 6, 5, 11, 9, 1, 6, 8, 12, 6, 5, 1, 12, 7, 9, 5],
];
var scatterReels = [
    [7, 11, 8, 5, 6, 4, 3, 9, 10, 12, 4, 5, 11, 4, 10, 11, 10, 5, 11, 5, 11, 4, 5, 10, 11, 10, 5, 10],
    [10, 4, 8, 2, 6, 5, 7, 9, 12, 11, 3, 12, 2, 8, 9, 12, 2, 9, 6, 9, 8, 6, 9, 4, 12, 2, 10, 2, 10, 12, 8, 12, 9, 10, 3, 8, 12, 9, 10, 6, 2, 12, 2, 9, 2, 6, 8, 5, 10, 2, 12, 2, 9, 8, 9, 11, 2, 9, 6, 2, 4, 5, 2, 8, 2, 9, 6, 12, 3, 9, 10, 3, 9, 12, 9],
    [5, 3, 8, 2, 2, 2, 2, 6, 10, 4, 12, 7, 9, 11, 10, 6, 12, 6, 2, 6, 2, 7, 6, 2, 8, 12, 6, 2, 7, 2, 4, 6, 8, 2, 4, 6, 7, 8, 2, 6, 3],
    [10, 8, 2, 9, 3, 5, 6, 11, 4, 7, 12, 5, 8, 2, 11, 9, 11, 2, 11, 9, 2, 11, 9, 2, 11, 12, 11, 9, 4, 9, 11, 2, 4, 2, 5, 2, 3, 11, 4, 12, 2, 12, 2, 12, 11, 4, 8, 9, 4, 3, 11, 4, 3, 4, 5, 9, 11, 9, 2, 4, 3, 2, 7, 11, 9, 11, 2, 4, 9, 2, 11, 3, 11, 2, 11, 9, 11, 4],
    [10, 6, 12, 3, 5, 8, 4, 2, 7, 11, 9, 12, 5, 7, 11, 12, 8, 5, 11, 6, 5, 11, 9, 6, 8, 12, 6, 5, 12, 7, 9, 5],
];
var freeReels = [
    [3, 11, 12, 7, 10, 6, 5, 9, 4, 8, 12, 5, 9, 8, 11, 5, 12, 9, 12, 1, 7, 6, 5, 11, 6, 12, 6, 10, 7, 4, 12, 7, 12, 5, 10, 4, 11, 9, 7, 5, 8, 9, 12, 9, 7, 9, 12, 9, 5, 11, 12, 5, 12, 1, 11, 5, 12, 9],
    [2, 2, 2, 5, 3, 9, 11, 14, 4, 2, 10, 12, 7, 8, 6, 3, 12, 10, 5, 11, 5, 10, 11, 5, 10, 11, 5, 12, 11, 6],
    [14, 12, 4, 9, 10, 8, 5, 11, 6, 2, 7, 3, 11, 5, 11, 2, 3, 10, 11, 7, 2, 11, 8, 11, 3, 8, 10, 2, 11, 7, 2, 6, 5, 2, 5, 8, 4, 11, 2, 7, 4, 6, 12, 2, 10],
    [2, 5, 8, 7, 9, 3, 11, 12, 10, 14, 4, 6, 6, 5, 11, 9, 11, 4, 14, 11, 9, 11, 14, 11, 8, 9, 9, 11, 12, 10, 14, 12, 9, 6, 9, 5, 8, 11, 9, 12, 6, 6, 11, 9, 7, 8, 5, 11, 14],
    [2, 4, 6, 8, 5, 9, 12, 7, 11, 10, 3, 3, 11, 4, 7, 4, 7, 6, 7, 11, 10, 8, 7, 1, 11, 6, 11, 7, 10, 11, 7, 11, 3, 6, 4, 7, 10, 1, 6, 8, 3, 6, 4, 10, 6, 7, 6, 10, 7, 4, 3, 6, 8, 6, 10, 3, 11, 10, 3],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 10, 10, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 0, 50, 20, 20, 15, 15, 10, 10, 10, 10, 10, 0, 0, 0],
    [0, 0, 0, 200, 50, 40, 20, 20, 15, 15, 15, 15, 15, 0, 0, 0],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 0; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevJewelStatus = this.jewelStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    //                    
    if (this.freeSpinPrepareStatus) {
        this.PrepareFreeSpin(player);
        return;
    }

    //             
    if (this.jewelStatus == "JEWELWIN") {
        this.JewelWinSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    //                       
    var newCache;
    var moneyCache = {
        table: [...this.moneyTable],
        values: [...this.moneyValues],
        fsList: [...this.moneyFSList],
    };

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
        newCache = AddBaseJewels(moneyCache);
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;

        this.freeSpinLength = cache.length;
        this.scatterViewList = cache.viewList[0];
        this.scatterViewIndex = 1;
        this.freeSpinCacheList = cache.viewList;

        this.view = this.scatterViewList[0].view;
        newCache = AddFreeJewels(moneyCache, cache.length, cache.reelNo);
        this.freeSpinPrepareStatus = true;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        // console.log(`[            ] ${freeSpinMoney}`);
    } else if (viewCache.type == "JEWEL") {
        var cache = viewCache.view;
        this.jewelSpinCacheList = cache.viewList;
        this.jewelSpinIndex = 1;

        this.view = this.jewelSpinCacheList[0];
        newCache = AddWinJewels(moneyCache, cache.value, cache.reelNo);
        this.jewelStatus = "JEWELWIN";
        this.jewelValue = cache.value;
        this.jewelReelNo = cache.reelNo;
    }

    this.moneyTable = newCache.moneyTable;
    this.moneyValues = newCache.moneyValues;
    this.moneyFSList = newCache.moneyFSList;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = GetWinLines(winLines);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.freeSpinAPT = [];
    this.freeSpinAPV = [];
    this.freeSpinAPWA = [];
    this.freeSpinPList = [];

    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = GetWinLines(winLines);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.fsTable = cache.jtables;
    this.fsValues = cache.jvalues;

    var result = MoneyJewels(this.view, this.fsValues, player.betPerLine);
    this.winMoney += result.win;

    if (result.values.length > 0) {
        //                                     
        for (var j = 0; j < 18; j++) {
            this.freeSpinPList.push(0);
        }
        for (var i = 0; i < result.values.length; i++) {
            this.freeSpinAPT.push("ma");
            this.freeSpinAPV.push(result.values[i]);
            this.freeSpinAPWA.push(result.values[i] * player.betPerLine);
            this.freeSpinPList[15 + result.congos[i] - 1] = 1;
        }
    }

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.PrepareFreeSpin = function (player) {
    var cache = this.scatterViewList[this.scatterViewIndex];
    this.view = cache.view;

    this.winMoney = WinFromView(this.view, player.betPerLine) + ScatterWinFromView(this.view, Number(player.betPerLine * this.lineCount));
    this.winLines = GetWinLines(winLines);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    var moneyCache = {
        table: [...this.moneyTable],
        values: [...this.moneyValues],
        fsList: [...this.moneyFSList],
    };

    var newCache = AddBaseJewels(moneyCache);

    this.moneyTable = newCache.moneyTable;
    this.moneyValues = newCache.moneyValues;
    this.moneyFSList = newCache.moneyFSList;

    this.scatterViewIndex++;
    if (this.scatterViewIndex >= 3) {
        this.freeSpinPrepareStatus = false; //                           
    }

    //                   
    if (isCongsoWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";

        var congoReels = GetCongoCashReels(this.view);

        this.fsList = [];
        for (var j = 0; j < 18; j++) {
            this.fsList.push(0);
        }
        for (var i = 0; i < congoReels.length; i++) {
            var reelNo = congoReels[i] - 1;
            this.fsList[15 + reelNo] = 1;
        }
        this.fsTable = cache.jtables;
        this.fsValues = cache.jvalues;
    }
};

SlotMachine.prototype.JewelWinSpin = function (player) {
    this.view = this.jewelSpinCacheList[this.jewelSpinIndex];

    if (isCongsoWin(this.view)) {
        this.winMoney = this.jewelValue * player.betPerLine;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    var moneyCache = {
        table: [...this.moneyTable],
        values: [...this.moneyValues],
        fsList: [...this.moneyFSList],
    };

    var newCache = AddBaseJewels(moneyCache);

    this.moneyTable = newCache.moneyTable;
    this.moneyValues = newCache.moneyValues;
    this.moneyFSList = newCache.moneyFSList;

    this.jewelSpinIndex++;
    if (this.jewelSpinIndex >= 3) {
        this.jewelStatus = "NOJEWEL";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView,
        tmpWin,
        pType = "BASE";

    if (baseWin > 0) {
        //                                                         
        if (Util.probability(3)) {
            var result = GenerateJewelWinViewCache(bpl, totalBet, baseWin);
            tmpView = result.viewCache;
            tmpWin = result.win;
            pType = "JEWEL";
        } else {
            tmpView = RandomWinView(baseReels, bpl, baseWin);
            tmpWin = WinFromView(tmpView, bpl);
        }
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
        tmpWin = 0;
    }

    var pattern = {
        view: tmpView,
        win: tmpWin,
        type: pType,
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

//                 3                                
SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    //        2                
    var scatterViewList = [];
    var totalFSValues = [];
    var totalFSTables = [];

    for (var i = 0; i < 2; i++) {
        var zeroView = RandomZeroView(baseReels, bpl);
        scatterViewList.push({
            view: zeroView,
        });
    }

    //                          
    var congoReelNo = Util.random(1, 4); //             
    var freeSpinLength = freeSpinCountList[Util.random(1, freeSpinCountList.length)];

    var scatterView = RandomScatterView(scatterReels, bpl, congoReelNo, true);
    var scatterWinMoney = WinFromView(scatterView, bpl) + ScatterWinFromView(scatterView, totalBet);
    var freeSpinData = {
        length: freeSpinLength,
        reelNo: congoReelNo, //                                  
        viewList: [],
    };

    //                             (                                             )
    for (var i = 0; i < freeSpinLength * 3 + 18; i++) {
        var moneyValue = jewelValues[Util.random(0, jewelValues.length)];
        totalFSValues.push(moneyValue);
        var jackpotIndex = jackPotValues.indexOf(moneyValue);
        var tableMark = moneySymbol;
        if (jackpotIndex >= 0) {
            tableMark = jackPotMarks[jackpotIndex];
        }
        totalFSTables.push(tableMark);
    }

    scatterViewList.push({
        view: scatterView,
        jvalues: totalFSValues.slice(totalFSValues.length - 18, totalFSValues.length),
        jtables: totalFSTables.slice(totalFSTables.length - 18, totalFSTables.length),
    });

    // 1          
    for (var i = 0; i < 3; i++) {
        totalFSTables.pop();
        totalFSValues.pop();
    }

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length, totalFSValues, totalFSTables);

    freeSpinData.viewList.push(scatterViewList);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
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
        tmpWin = WinFromView(tmpView, bpl);
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

        tmpWin = WinFromView(tmpView, bpl);
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

        view[1] = empty;
        view[2] = empty;
        view[3] = empty;

        if (!isCongsoWin(view)) {
            break;
        }
    }

    return view;
};

var RandomScatterView = function (reels, bpl, congoReelIndex, flag) {
    //                                                              
    var scatterView;
    if (flag) {
        scatterView = RandomView(reels);
    } else {
        scatterView = RandomZeroView(reels, bpl);
    }

    var butterflyPos1 = Util.random(0, slotHeight) * slotWidth;
    var butterflyPos2 = Util.random(0, slotHeight) * slotWidth + slotWidth - 1;
    var congoCashPos = Util.random(1, slotHeight) * slotWidth + congoReelIndex;
    scatterView[butterflyPos1] = butterfly;
    scatterView[butterflyPos2] = butterfly;
    scatterView[congoCashPos] = congocash;

    return scatterView;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, totalFSValues, totalFSTables) {
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

        //       
        var fsValues = [...totalFSValues];
        var fsTables = [...totalFSTables];

        while (true) {
            var fsView, fsWin, jvalues, jtables;
            while (true) {
                fsView = RandomFreeView(reels);
                fsWin = WinFromView(fsView, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            jvalues = fsValues.slice(fsValues.length - 18, fsValues.length);
            jtables = fsTables.slice(fsTables.length - 18, fsTables.length);

            //                      
            fsWin += MoneyJewels(fsView, jvalues, bpl).win;

            freeSpinData.viewList.push({
                view: fsView,
                jvalues: jvalues,
                jtables: jtables,
            });

            freeSpinWinMoney += fsWin;
            freeSpinIndex++;

            // 3                       
            for (var i = 0; i < 3; i++) {
                fsValues.pop();
                fsTables.pop();
            }

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

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);

        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos];
        }
    }

    view[1] = empty;
    view[2] = empty;
    view[3] = empty;

    return view;
};

//                              
var GenerateJewelWinViewCache = function (bpl, totalBet, jewelWin) {
    //                    
    var viewList = [];
    for (var i = 0; i < 2; i++) {
        var zeroView = RandomZeroView(baseReels, bpl);
        viewList.push(zeroView);
    }

    var congoReelNo = Util.random(1, 4); //                       

    //                
    var multi = jewelWin / bpl;
    var value = 0;
    var maxPrize = jewelValues[jewelValues.length - 1];
    if (multi >= maxPrize) {
        multi = maxPrize;
    } else {
        for (var i = 0; i < jewelValues.length; i++) {
            if (multi <= jewelValues[i]) {
                multi = jewelValues[i - 1 >= 0 ? i - 1 : 0];
                break;
            }
        }
    }

    value = multi > jewelValues[0] ? multi : jewelValues[0]; //                        100

    var jewelView = RandomScatterView(scatterReels, bpl, congoReelNo, false);
    viewList.push(jewelView);

    viewCache = {
        viewList: viewList,
        reelNo: congoReelNo,
        value: value,
    };

    return {
        viewCache: viewCache,
        win: value * bpl,
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

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
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
        var winMoney = bpl * payTable[length][symbolId] * count;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);
        }
        return winMoney;
    }

    //                                                                                            
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = length + i * slotWidth;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var winMoney = bpl * payTable[length][symbolId] * count;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);
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

var isWild = function (symbol) {
    return symbol == wild;
};

//                                                            (             )
var isCongsoWin = function (view) {
    var hasButterfly = false;

    var firstReel = 0;
    for (var i = 0; i < slotHeight; i++) {
        var viewPos = firstReel + i * slotWidth;
        if (view[viewPos] == butterfly) {
            hasButterfly = true;
            break;
        }
    }
    if (!hasButterfly) {
        return false;
    }

    hasButterfly = false;

    var lastReel = 4;
    for (var i = 0; i < slotHeight; i++) {
        var viewPos = lastReel + i * slotWidth;
        if (view[viewPos] == butterfly) {
            hasButterfly = true;
            break;
        }
    }
    if (!hasButterfly) {
        return false;
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            if (view[viewPos] == congocash) {
                return true;
            }
        }
    }
    return false;
};

var GetCongoCashReels = function (view) {
    var result = [];

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            if (view[viewPos] == congocash) {
                result.push(i);
                break;
            }
        }
    }
    return result;
};

//                          
var AddBaseJewels = function (moneyCache) {
    var moneyTable = moneyCache.table;
    var moneyValues = moneyCache.values;
    var moneyFSList = moneyCache.fsList;

    var table = [],
        values = [],
        fsList = [];
    for (var i = 0; i < 3; i++) {
        var value = jewelValues[Util.random(0, jewelValues.length)];
        values.push(value);
        fsList.push(0);
        var jackpotIndex = jackPotValues.indexOf(value);
        if (jackpotIndex >= 0) {
            table.push(jackPotMarks[jackpotIndex]);
        } else {
            table.push(moneySymbol);
        }
    }

    if (Util.probability(30)) {
        // 30                                      
        var randomIndexList = [0, 1, 2];
        Util.shuffle(randomIndexList);
        var indexList = randomIndexList.slice(0, Util.random(1, 4));
        for (var i = 0; i < indexList.length; i++) {
            var index = indexList[i];
            table[index] = freeSpinSymbol;
            values[index] = 20;
            fsList[index] = freeSpinCountList[Util.random(0, freeSpinCountList.length)];
        }
    }

    //                                            
    for (var i = 2; i >= 0; i--) {
        moneyTable.pop();
        moneyValues.pop();
        moneyFSList.pop();
        moneyTable.unshift(table[i]);
        moneyValues.unshift(values[i]);
        moneyFSList.unshift(fsList[i]);
    }
    return { moneyTable, moneyValues, moneyFSList };
};

//                                   
var AddFreeJewels = function (moneyCache, freeSpinCount, reelNo) {
    var moneyTable = moneyCache.table;
    var moneyValues = moneyCache.values;
    var moneyFSList = moneyCache.fsList;

    var table = [],
        values = [],
        fsList = [];
    for (var i = 0; i < 3; i++) {
        var value = jewelValues[Util.random(0, jewelValues.length)];
        values.push(value);
        fsList.push(0);
        var jackpotIndex = jackPotValues.indexOf(value);
        if (jackpotIndex >= 0) {
            table.push(jackPotMarks[jackpotIndex]);
        } else {
            table.push(moneySymbol);
        }
    }
    table[reelNo - 1] = freeSpinSymbol;
    values[reelNo - 1] = 20;
    fsList[reelNo - 1] = freeSpinCount;

    //                 
    for (var i = 0; i < 3; i++) {
        moneyTable.pop();
        moneyValues.pop();
        moneyFSList.pop();
    }

    for (var j = 2; j >= 0; j--) {
        //                                         
        moneyTable.splice(9, 0, table[j]);
        moneyValues.splice(9, 0, values[j]);
        moneyFSList.splice(9, 0, fsList[j]);
    }

    return { moneyTable, moneyValues, moneyFSList };
};

//                                    
var AddWinJewels = function (moneyCache, multiValue, reelNo) {
    var moneyTable = moneyCache.table;
    var moneyValues = moneyCache.values;
    var moneyFSList = moneyCache.fsList;

    var table = [],
        values = [],
        fsList = [];
    for (var i = 0; i < 3; i++) {
        var value = jewelValues[Util.random(0, jewelValues.length)];
        values.push(value);
        fsList.push(0);
        var jackpotIndex = jackPotValues.indexOf(value);
        if (jackpotIndex >= 0) {
            table.push(jackPotMarks[jackpotIndex]);
        } else {
            table.push(moneySymbol);
        }
    }

    table[reelNo - 1] = moneySymbol;
    values[reelNo - 1] = multiValue;
    fsList[reelNo - 1] = 0;

    //                 
    for (var i = 0; i < 3; i++) {
        moneyTable.pop();
        moneyValues.pop();
        moneyFSList.pop();
    }

    for (var j = 2; j >= 0; j--) {
        //                                         
        moneyTable.splice(9, 0, table[j]);
        moneyValues.splice(9, 0, values[j]);
        moneyFSList.splice(9, 0, fsList[j]);
    }

    return { moneyTable, moneyValues, moneyFSList };
};

var ScatterWinFromView = function (view, totalBet) {
    if (isCongsoWin(view)) {
        return totalBet;
    }
    return 0;
};

var MoneyJewels = function (view, values, bpl) {
    var money = 0;
    var valueList = [];
    var congos = [];

    //                      
    if (isCongsoWin(view)) {
        congos = GetCongoCashReels(view);
        for (var i = 0; i < congos.length; i++) {
            money += values[15 + congos[i] - 1] * bpl;
            valueList.push(values[15 + congos[i] - 1]);
        }
    }

    return {
        win: money,
        values: valueList,
        congos: congos,
    };
};

var GetWinLines = function (winLines) {
    var lines = [];
    for (var i = 0; i < winLines.length; i++) {
        var cache = winLines[i];
        lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~l`);
    }
    return lines.join(";");
};

module.exports = SlotMachine;