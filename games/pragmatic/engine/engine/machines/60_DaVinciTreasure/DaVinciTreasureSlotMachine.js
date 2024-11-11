var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    this.freeSpinCount = 12;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                        
    this.bonusType = "";
    this.bonusGameWins = {};
    this.bonusGameEnd = true;
    this.bonusGameEntranced = false;
    //                    
    this.bonusMulti = 0;
    this.prizePickedIndex = 0;
    //              
    this.bonusCacheList = [];
    this.bonusLevel = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMulti = 1;
    this.freeSpinWin = 0;
    //           2          
    this.bonusWinMoney = 0;
    this.bonusTargetMoney = 0;
    this.gambleLimit = 0;
    this.gambleIndex = 0;
    this.gambleMulti = 1;
    this.gambleWinIndex = 0;
    this.gambleWinMoney = 0;
    //                           
    this.moneyBonusWin = 0;
    this.freeSpinWinMoney = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE", "BONUS"];
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var mapPointMulti = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90, 100];
var gambleMultiArray = [1, 2, 3, 4, 5];
var prizeMultiArray = [4, 8, 10, 12, 16, 20];
var baseReels = [
    [4, 13, 13, 10, 11, 8, 10, 13, 6, 6, 6, 11, 8, 7, 11, 12, 8, 12, 6, 5, 11, 13, 10, 4, 12, 9, 3, 3, 3],
    [11, 4, 7, 10, 10, 2, 12, 6, 8, 12, 11, 13, 8, 5, 9, 1, 10, 3, 3, 3],
    [13, 13, 11, 13, 11, 9, 5, 10, 7, 1, 9, 11, 8, 9, 13, 6, 9, 10, 2, 9, 12, 4, 11, 10, 10, 4, 9, 1, 11, 2, 6, 3, 3, 3],
    [9, 12, 9, 5, 8, 12, 7, 13, 10, 11, 1, 12, 8, 9, 2, 10, 12, 8, 7, 6, 1, 4, 5, 9, 3, 3, 3],
    [5, 5, 13, 10, 11, 8, 9, 11, 12, 6, 13, 2, 4, 7, 7, 4, 13, 3, 3, 3],
];
var freeReels = [
    [6, 11, 7, 5, 4, 4, 8, 10, 13, 9, 6, 12, 3, 3, 3, 3, 3],
    [9, 8, 8, 5, 12, 2, 12, 1, 7, 11, 2, 7, 10, 10, 13, 4, 6, 5, 1, 3, 3, 3, 3, 3],
    [4, 2, 11, 13, 11, 10, 5, 13, 9, 5, 8, 13, 5, 2, 1, 6, 13, 11, 9, 9, 11, 7, 12, 3, 3, 3, 3, 3],
    [13, 12, 11, 1, 11, 5, 12, 10, 5, 8, 7, 13, 10, 9, 5, 10, 11, 6, 4, 1, 2, 3, 3, 3, 3, 3],
    [9, 7, 7, 6, 13, 13, 9, 13, 8, 7, 4, 5, 10, 10, 12, 2, 4, 5, 11, 4, 3, 3, 3, 3, 3],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 30, 30, 20, 20, 5, 5, 5, 5, 5, 5],
    [0, 0, 0, 200, 150, 150, 100, 100, 15, 15, 15, 10, 10, 10],
    [0, 0, 0, 800, 500, 500, 300, 300, 150, 150, 150, 100, 100, 100],
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [5, 1, 2, 3, 9], // 6
    [5, 11, 12, 13, 9], // 7
    [0, 1, 7, 13, 14], // 8
    [10, 11, 7, 3, 4], // 9
    [5, 11, 7, 3, 9], // 10
    [5, 1, 7, 13, 9], // 11
    [0, 6, 7, 8, 4], // 12
    [10, 6, 7, 8, 14], // 13
    [0, 6, 2, 8, 4], // 14
    [10, 6, 12, 8, 14], // 15
    [5, 6, 2, 8, 9], // 16
    [5, 6, 12, 8, 9], // 17
    [0, 1, 12, 3, 4], // 18
    [10, 11, 2, 13, 14], // 19
    [0, 11, 12, 13, 4], // 20
    [10, 1, 2, 3, 14], // 21
    [5, 11, 2, 13, 9], // 22
    [5, 1, 12, 3, 9], // 23
    [0, 11, 2, 13, 4], // 24
    [10, 1, 12, 3, 14], // 25
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    //                                                              
    if (this.bonusGameEnd) {
        this.currentGame = "BASE";
        this.bonusGameEntranced = false;
    }

    //                                              
    //                                   ,             ,                                 3                                                gamesort                
    if (this.currentGame == "BASE" || this.currentGame == "FREE") {
        this.gameSort = this.currentGame;
    } else {
        this.gameSort = "BONUS";
    }

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
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;

        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;
        this.gambleLimit = viewCache.gamble;

        this.view = this.freeSpinCacheList[0];
        this.bonusType = "FREE";
    } else if (viewCache.type == "BONUS") {
        var cache = viewCache.view;

        this.gambleLimit = viewCache.gamble;
        this.view = cache.viewList[0];
        this.bonusType = viewCache.bonusType;

        if (this.bonusType == "PICK") {
            this.pickBonusCache = cache;
        } else if (this.bonusType == "MAPQ") {
            this.bonusLevel = -1;
            this.bonusCacheList = cache.cacheList;
        }
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        this.bonusGameEnd = false;
        this.currentGame = "BONUS_SELECT";
        this.bonusWinMoney = this.winMoney;
    }
};

SlotMachine.prototype.BonusEntrance = function () {
    //                               
    var wins_mask, wins;

    if (this.bonusType == "PICK") {
        wins_mask = ["pbf", "mbf", "psm"];
        wins = [1, 1, 12];
    } else if (this.bonusType == "MAPQ") {
        wins_mask = ["mbf", "pbf", "psm"];
        wins = [1, 12, 1];
    } else if (this.bonusType == "FREE") {
        this.freeSpinIndex = 1;
        this.freeSpinMulti = 0;

        wins_mask = ["psm", "mbf", "pbf"];
        wins = [12, 1, 1];
    }

    this.currentGame = this.bonusType;
    this.bonusGameWins = { wins_mask, wins };
    this.bonusWinMoney = 0;
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];
    this.freeSpinMulti = Util.min(this.freeSpinMulti + 1, this.freeSpinLength);

    // this.winMoney                           .                                       .
    this.freeSpinWin = WinFromView(this.view, player.betPerLine) * this.freeSpinMulti;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.bonusWinMoney += this.freeSpinWin;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.bonusGameEnd = true;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.PrizePickerSpin = function (player, param) {
    var selectIndex = Number(param.ind);
    var status = [0, 0, 0];
    status[selectIndex] = 1;

    var wins = this.pickBonusCache.multiArr;
    var wp = this.pickBonusCache.multi;

    while (true) {
        Util.shuffle(wins);
        if (wins[selectIndex] == wp) {
            break;
        }
    }

    this.bonusGameWins = { status, wins, wp };
    this.bonusWinMoney = wp * Number(player.betPerLine * this.lineCount);
    this.bonusGameEnd = true;
};

SlotMachine.prototype.MapQuestSpin = function (player, param) {
    this.bonusLevel++;

    this.bonusWinMoney = this.bonusCacheList[this.bonusLevel].wp * Number(player.betPerLine * this.lineCount);
    //                                       
    if (this.bonusLevel == this.bonusCacheList.length - 1) {
        this.bonusGameEnd = true;
    }
};

SlotMachine.prototype.GamblingOption = function (player, param) {
    var optionId = Number(param.g_o_ind);
    this.winMoney = 0;
    this.gambleWinMoney = 0;

    //                 
    if (optionId >= 0) {
        this.gambleMulti = optionId + 2;
    } else {
        //                       
        this.gambleMulti = 1;
        this.gambleWinMoney = this.bonusWinMoney;

        // PlayModel                                                                       .
        this.moneyBonusWin = this.gambleWinMoney;
        this.freeSpinWinMoney = this.gambleWinMoney;
        this.winMoney = this.gambleWinMoney;
    }
};

SlotMachine.prototype.Gambling = function (player, param) {
    var gambleIndex = Number(param.g_ind);
    this.gambleIndex = gambleIndex;

    //                       
    if (this.gambleIndex < 0) {
        this.gambleWinMoney = this.bonusWinMoney;

        this.winMoney = this.gambleWinMoney;

        //                                 
        var indexList = [];
        for (var i = 0; i < this.gambleMulti; i++) {
            if (i != this.gambleIndex) {
                indexList.push(i);
            }
        }
        this.gambleWinIndex = indexList[Util.random(0, indexList.length)];
    } else {
        //                        
        if (this.gambleMulti <= this.gambleLimit) {
            this.gambleWinMoney = this.bonusWinMoney * this.gambleMulti;
            this.gambleWinIndex = this.gambleIndex;
            this.winMoney = this.gambleWinMoney;
        } //                     
        else {
            this.winMoney = 0;

            //                                 
            this.gambleWinMoney = 0;
            var indexList = [];
            for (var i = 0; i < this.gambleMulti; i++) {
                if (i != this.gambleIndex) {
                    indexList.push(i);
                }
            }
            this.gambleWinIndex = indexList[Util.random(0, indexList.length)];
        }
    }

    // PlayModel                                                                       .
    this.moneyBonusWin = this.gambleWinMoney;
    this.freeSpinWinMoney = this.gambleWinMoney;

    //                                        
    var gambleSuccess = player.machine.gambleWinMoney > 0;
    if (!gambleSuccess) {
        this.currentGame = "BASE";
        this.bonusGameEnd = true;
        this.bonusGameEntranced = false;
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = "BONUS";

    if (this.currentGame == "BONUS_SELECT") {
        this.BonusEntrance(player, param);
    } else {
        this.bonusGameEntranced = true;
        if (this.currentGame == "PICK") {
            if (param.ind) {
                this.PrizePickerSpin(player, param);
            }
        } else if (this.currentGame == "MAPQ") {
            this.MapQuestSpin(player, param);
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }
    tmpWin = WinFromView(tmpView, bpl);

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

    var gambleLimit, pattern;
    gambleLimit = gambleMultiArray[Util.random(0, gambleMultiArray.length)];
    jpWin = jpWin / gambleLimit;

    if (isCall) {
        console.log(`                : ${gambleLimit}`);
    }

    if (jpType === "RANDOM") {
        var gameSelect = Util.random(1, 4);

        //                           
        if (gameSelect == 1) {
            pattern = this.SpinForPickGen(bpl, totalBet, jpWin, isCall);
        }
        //                     
        else if (gameSelect == 2) {
            pattern = this.SpinForMapQGen(bpl, totalBet, jpWin, isCall);
        }
        //                                       
        else {
            pattern = this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        }
    } else {
        switch (newJpType) {
            case "FREE":
                pattern = this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
                break;
            case "BONUS":
                //                                                               
                if (Util.probability(50)) {
                    pattern = this.SpinForMapQGen(bpl, totalBet, jpWin, isCall);
                } else {
                    pattern = this.SpinForPickGen(bpl, totalBet, jpWin, isCall);
                }
                break;
            default:
                break;
        }
    }

    pattern.gamble = gambleLimit;
    pattern.win *= gambleLimit;

    return pattern;
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForPickGen = function (bpl, totalBet, fsWin, isCall = false) {
    var pickMulti = fsWin / totalBet;

    var scatterView = RandomScatterView(baseReels, bpl);

    var pickPrizeCache = {
        viewList: [scatterView],
    };

    var maxPrize = prizeMultiArray[prizeMultiArray.length - 1];
    //                           
    if (pickMulti >= maxPrize) {
        pickMulti = maxPrize;
    } else {
        for (var i = 0; i < prizeMultiArray.length; i++) {
            if (pickMulti <= prizeMultiArray[i]) {
                pickMulti = prizeMultiArray[i - 1 >= 0 ? i - 1 : 0];
                break;
            }
        }
    }

    var wp = pickMulti > prizeMultiArray[0] ? pickMulti : prizeMultiArray[0];
    var multiArray = [...prizeMultiArray].slice(0, prizeMultiArray.length - 1);
    Util.shuffle(multiArray);

    //                                        
    var wins = [];
    wins[0] = wp; //                              

    while (true) {
        var rand = prizeMultiArray[Util.random(0, prizeMultiArray.length)];
        if (wins.indexOf(rand) == -1) {
            wins.push(rand);
        }
        if (wins.length > 2) {
            break;
        }
    }

    pickPrizeCache.multiArr = wins;
    pickPrizeCache.multi = wp;

    return {
        win: wp * totalBet,
        bpl: bpl,
        view: pickPrizeCache,
        type: "BONUS",
        bonusType: "PICK",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForMapQGen = function (bpl, totalBet, fsWin, isCall = false) {
    var mapQuestMulti = fsWin / totalBet;

    var scatterView = RandomScatterView(baseReels, bpl);

    var mapQuestCache = {
        viewList: [scatterView],
    };

    var mapQuestCacheList = GetMapQuestCacheList(mapQuestMulti);

    mapQuestCache.cacheList = mapQuestCacheList;

    return {
        win: totalBet * mapQuestCacheList[mapQuestCacheList.length - 1].wp,
        bpl: bpl,
        view: mapQuestCache,
        type: "BONUS",
        bonusType: "MAPQ",
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

        if (!isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl) {
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

        if (isFreeSpinWin(view) && WinFromView(view, bpl) == 0) {
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
        var multi = 1;
        var freeSpinData = {};
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);
                fsWin = WinFromView(fsview, bpl) * multi;

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsview);

            freeSpinWinMoney += fsWin;

            freeSpinIndex++;
            multi++;

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

//                             
var GetMapQuestCacheList = function (multi) {
    var targetIndex = 10;
    for (var i = 0; i < mapPointMulti.length; i++) {
        if (multi < mapPointMulti[i]) {
            targetIndex = Util.max(0, i - 1);
            break;
        }
    }

    //                                            
    var wheelAddAmounts = [1, 2, 3, 4, 5];
    var wheelList = [];
    while (targetIndex) {
        var randomWheelAmount = wheelAddAmounts[Util.random(0, wheelAddAmounts.length)];
        if (targetIndex - randomWheelAmount < 0) {
            randomWheelAmount = targetIndex;
        }
        wheelList.push(randomWheelAmount);
        targetIndex -= randomWheelAmount;
    }

    //        api                                           
    var mi = 0;
    var mapQuestCacheList = [
        {
            mi: 0,
            p: 0,
            wp: 0,
        },
    ];
    for (var i = 0; i < wheelList.length; i++) {
        var wheelAmount = wheelList[i];
        var wheelIndex = wheelAddAmounts.indexOf(wheelAmount);
        mi += wheelAmount;
        var wp = mapPointMulti[mi];
        var newCache = {
            mi: mi,
            p: wheelIndex,
            wp: wp,
        };
        mapQuestCacheList.push(newCache);
    }

    mapQuestCacheList.push({
        mi: mi,
        p: 5,
        wp: mapPointMulti[mi],
    });

    return mapQuestCacheList;
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
    var winMoney = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        winMoney += linePay;
    }

    return winMoney;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);

        if (linePay > 0) {
            winLines.push(
                `${lineId}~${linePay}~${line
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
    return winPay;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
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

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

module.exports = SlotMachine;