var Util = require('../../../utils/slot_utils');

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
    this.maskView = [];
    //                           
    this.randomSpinCache = [];
    this.randomSpinMode = 0;
    this.randomInd = 0;
    this.changedArr = [];
    this.changedSymbol = 3;
    this.moneyBonusWin = 0; //                         
    this.multi;
    //                           
    this.freeSpinType = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.selectList = [];
    this.selectIndex = 0;
    this.selectCache = {};

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [9, 8, 6, 3, 11, 5, 10, 5, 2, 4, 3, 10, 1, 7, 7, 8, 11, 1, 9, 10, 6],
    [7, 10, 9, 7, 11, 4, 3, 10, 8, 3, 11, 9, 10, 6, 11, 5, 2, 8, 9, 6],
    [2, 9, 4, 11, 1, 6, 10, 9, 7, 7, 4, 3, 8, 10, 8, 11, 5, 10, 5, 6],
    [8, 7, 3, 10, 7, 6, 11, 10, 7, 11, 8, 11, 4, 9, 7, 11, 9, 5, 10, 8, 6, 8, 9, 2, 9, 10],
    [1, 11, 4, 9, 7, 11, 8, 10, 10, 5, 6, 6, 8, 2, 7, 11, 9, 9, 11, 7, 8, 8, 10, 7, 3, 10, 9]
];
var freeReels = [
    [
        [4, 10, 2, 11, 5, 10, 9, 6, 8, 11, 7, 7, 8, 3, 3, 3, 10, 9, 5],
        [2, 10, 6, 8, 3, 3, 3, 11, 4, 8, 6, 7, 9, 10, 3, 3, 3, 11, 11, 9, 5, 9, 10],
        [4, 11, 7, 8, 9, 10, 5, 4, 5, 8, 3, 3, 3, 10, 6, 11, 2, 11, 9],
        [6, 8, 4, 8, 11, 7, 7, 11, 5, 9, 6, 11, 10, 3, 3, 3, 11, 9, 10, 8, 7, 2, 9, 7, 10, 10, 9, 8],
        [8, 10, 9, 10, 6, 3, 3, 3, 11, 6, 5, 8, 4, 9, 8, 10, 4, 9, 7, 11, 11, 2, 7, 11, 8, 9, 8, 7, 7]
    ],
    [
        [7, 9, 11, 2, 8, 6, 12, 10, 9, 10, 4, 12, 11, 6, 7, 8, 3, 3, 3, 5, 3, 8, 10],
        [9, 3, 3, 3, 7, 5, 10, 4, 9, 6, 11, 9, 10, 8, 8, 11, 11, 2, 10, 6],
        [3, 3, 3, 11, 10, 12, 10, 6, 9, 4, 8, 11, 10, 9, 2, 7, 4, 5, 5, 8],
        [10, 4, 6, 8, 8, 9, 9, 6, 3, 3, 3, 5, 2, 8, 7, 9, 10, 7, 8, 9, 7, 10, 11, 11, 10, 11, 7, 11],
        [6, 2, 7, 8, 4, 11, 10, 11, 9, 10, 3, 3, 3, 9, 10, 7, 11, 9, 12, 8, 7, 9, 12, 8, 10, 8, 4, 6, 11, 7, 5]
    ],
    [
        [2, 7, 4, 2, 5, 6, 2, 10, 8, 2, 11, 9, 3],
        [2, 4, 9, 2, 10, 3, 2, 5, 8, 2, 11, 7, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        [2, 11, 9, 2, 7, 6, 2, 8, 10, 2, 5, 4, 3],
        [2, 8, 3, 10, 5, 2, 6, 7, 11, 4, 2, 5, 6, 8, 7, 9, 9, 11, 10]
    ],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 40, 30, 20, 10, 10, 8, 6, 4, 0],
    [0, 0, 0, 200, 150, 100, 75, 50, 30, 20, 10, 10, 0],
    [0, 0, 0, 1000, 500, 250, 200, 175, 150, 125, 100, 100, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],     // 3
    [0, 6, 12, 8, 4],         // 4
    [10, 6, 2, 8, 14],        // 5
    [5, 1, 2, 3, 9],          // 6
    [5, 11, 12, 13, 9],       // 7
    [0, 1, 7, 13, 14],        // 8
    [10, 11, 7, 3, 4],        // 9
    [5, 11, 7, 3, 9],         // 10
    [5, 1, 7, 13, 9],         // 11
    [0, 6, 7, 8, 4],          // 12
    [10, 6, 7, 8, 14],        // 13
    [0, 6, 2, 8, 4],          // 14
    [10, 6, 12, 8, 14],       // 15
    [5, 6, 2, 8, 9],          // 16
    [5, 6, 12, 8, 9],         // 17
    [0, 1, 12, 3, 4],         // 18
    [10, 11, 2, 13, 14],      // 19
    [0, 11, 12, 13, 4],       // 20
];
var coin = 12;
var piddleMultiArry = [5, 10, 15, 20, 50];
var fsCountsArr = [20, 15, 3];
var fsMultiArr = [3, 4, 1];
var percentList = {
    randomSpinPercent: 34,
    piddleHighPercent: 22,
    CoinCollectorPercent: 22,
    CoinAddPercent: 34,
    GiantFreePercent: 0,
    NudgeFreePercent: 34,
    freeWinPercent: 50
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
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

    this.randomSpinMode = 0;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    var viewCache = player.viewCache;

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0].view;
        this.freeSpinType = this.freeSpinCacheList[0].type;
        this.freeSpinNudge = this.freeSpinCacheList[0].isNudge;
        this.multi = fsMultiArr[this.freeSpinType];
        this.freeSpinLength = fsCountsArr[this.freeSpinType];
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = 0;
        this.freeSpinSelectLevel = 0;
        this.nCoins = 0;
        if (this.freeSpinType == 0) {
            this.selectList = this.freeSpinCacheList[0].selectList;
            this.selectIndex = 0;
            this.selectCache = {
                status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                wins_mask: ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h'],
                wins: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            };
        }

        if (this.freeSpinCacheList[0].isNudge) {  //             
            var pos = Util.random(0, 2);

            if (pos) {
                this.virtualReels.above[slotWidth - 1] = scatter;
                this.virtualReels.below[slotWidth - 1] = Util.random(3, 12);
            } else {
                this.virtualReels.above[slotWidth - 1] = Util.random(3, 12);
                this.virtualReels.below[slotWidth - 1] = scatter;
            }
        }

        this.currentGame = "FREE";
    } else if (viewCache.mode) {
        this.randomSpinMode = viewCache.mode;
        this.randomSpinCache = viewCache.view;

        if (this.randomSpinMode != 2) {
            this.maskView = this.randomSpinCache.view;
            this.changedSymbol = this.randomSpinCache.changedSymbol;
            this.changedArr = this.randomSpinCache.changedArr;
            this.view = GetFinalView(this.maskView, this.changedArr, this.changedSymbol);
        } else {
            this.view = this.randomSpinCache.view;
            this.multi = this.randomSpinCache.multi;
        }
    } else {
        this.view = viewCache.view;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                        

    if (this.randomSpinMode == 2) {
        this.moneyBonusWin = this.winMoney;
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.randomInd = Number(param.ind);

    if (this.randomSpinMode == 2) {
        this.moneyBonusWin += this.multi * Number(player.virtualBet);
    }

    if (this.currentGame == "FREE") {    //                            
        if (this.freeSpinSelectLevel == 0) {
            this.freeSpinSelectLevel = 1;
            return;
        }

        this.freeSpinSelectLevel++;

        if (this.freeSpinType == 0) {
            if (this.selectIndex == 0) {
                this.selectIndex = 1;
                return;
            }

            var cache = this.selectList[this.selectIndex - 1];

            if (cache.wins_mask == 'm') {
                this.multi += 1;
                this.selectCache.wins[this.randomInd] = 1;
            } else {
                this.freeSpinLength += cache.value;
                this.selectCache.wins[this.randomInd] = cache.value;
            }

            this.selectCache.status[this.randomInd] = this.selectIndex;
            this.selectCache.wins_mask[this.randomInd] = cache.wins_mask;

            this.selectIndex++;
        }
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;

    this.winMoney = WinFromView(this.view, player.betPerLine) * this.multi;
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.isFreeSpinAdd = 0;

    if (this.freeSpinType == 1) {
        this.winLines = WinLinesFromView(this.view, player.betPerLine, this.multi); //                                    
        this.nCoins += NumberOfCoins(this.view);

        if (this.nCoins >= 5) {
            this.nCoins -= 5;

            if (this.multi < 6) {
                ++this.multi;
            }

            this.freeSpinLength += 5;
            this.isFreeSpinAdd = 1;
        }
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;


    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {};
    var tmpView, tmpWin = 0;
    //                            [      ] *                                                             ~~                 .

    if (baseWin >= 0) {
        if (baseWin > totalBet * 12 && Util.probability(percentList.randomSpinPercent)) {
            pattern.mode = Util.random(1, 4);

            var randomSpinData = RandomSpinViewCache(baseReels, bpl, totalBet, baseWin, pattern.mode);

            tmpView = randomSpinData.cache;
            tmpWin = randomSpinData.win;
        } else {
            tmpView = RandomWinView(baseReels, bpl, baseWin);
            tmpWin = WinFromView(tmpView, bpl);
        }
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }

    pattern.view = tmpView;
    pattern.win = tmpWin;
    pattern.type = "BASE";
    pattern.bpl = bpl;

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
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinStore = [];    
    var isNudge = 0;

    if (Util.probability(percentList.NudgeFreePercent)) {
        isNudge = 1;
    }

    var scatterView = RandomScatterView(baseReels, bpl, isNudge);
    var fsType = 0;
    var multi = fsMultiArr[fsType];
    var fsCount = fsCountsArr[fsType];

    var scatterCache = {
        view: scatterView,
    };

    if (Util.probability(percentList.CoinCollectorPercent)) {
        fsType = 1;
        fsCount = fsCountsArr[fsType];
        multi = fsMultiArr[fsType];

    } else if (Util.probability(percentList.GiantFreePercent)) {
        fsType = 2;
        fsCount = fsCountsArr[fsType];
        multi = fsMultiArr[fsType];
    } else {    //                            doBonus             
        var fsDetail = GetFreeSpinDetail();
        fsCount += fsDetail.count;
        multi += fsDetail.multi;
        scatterCache.selectList = fsDetail.selectList;
    }

    scatterCache.type = fsType;
    scatterCache.isNudge = isNudge;
    scatterCache.count = fsCount;
    scatterCache.multi = multi;

    var fsCache = RandomFreeViewCache(freeReels[fsType], bpl, fsWin, scatterCache);

    freeSpinStore.push(scatterCache);

    var pattern = {
        view: freeSpinStore.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: fsType,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
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
            bottomLimit = -1;
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
    return tmpView
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

var RandomScatterView = function (reels, bpl, isNudge = 0) {
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
        if (WinFromView(view, bpl) == 0 && isFreeSpinWin(view)) {
            if (!isNudge) {
                break;
            }

            if (isNudge) {
                for (var j = 0; j < slotHeight; ++j) {
                    var pos = slotWidth - 1 + slotWidth * j;

                    if (isScatter(view[pos])) {
                        view[pos] = Util.random(3, 12);
                        break;
                    }
                }

                if (WinFromView(view, bpl) == 0) {
                    break;
                }
            }
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, scatterCache) {
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

        if (scatterCache.type == 0) {
            freeSpinData = SelectedFreeViewCache(reels, bpl, scatterCache.count, scatterCache.multi);
        } else if (scatterCache.type == 1) {
            freeSpinData = CoinCollectorViewCache(reels, bpl, scatterCache.count, scatterCache.multi);
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

var GetFreeSpinDetail = function () {
    var multi = 0;
    var fsCount = 0;
    var selectList = [];

    var selectArr = ['m', 'nff', 'm', 'nff', 'nff', 'nff'];

    Util.shuffle(selectArr);

    var count = Util.random(1, 4);

    for (var i = 0; i < count; ++i) {
        var select = selectArr[i];

        if (select == 'm') {
            selectList.push({
                wins_mask: 'm',
                multi: 1
            });

            multi += 1;
        }

        if (select == 'nff') {
            var value = Util.random(1, 3);

            selectList.push({
                wins_mask: 'nff',
                value: value
            });

            fsCount += value;
        }
    }
    var value = Util.random(1, 3);

    selectList.push({
        wins_mask: 'nff_fn',
        value: value,
    });

    fsCount += value;

    return {
        selectList: selectList,
        count: fsCount,
        multi: multi
    };
};

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }
    return money;
};

var WinLinesFromView = function (view, bpl, multi = 1) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl) * multi;
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var WinFromLine = function (lineSymbols, bpl) {
    var matchCount = 0;
    var symbol = wild;

    for (var i = 0; i < lineSymbols.length; i++) { //                                       
        if (isWild(lineSymbols[i])) {
            continue;
        }

        symbol = lineSymbols[i];
        break;
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                          
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
        }
    }

    for (var i = 0; i < lineSymbols.length; i++) {  //                                           
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (var i = matchCount; i < lineSymbols.length; i++) { //                                         -1          
        lineSymbols[i] = -1;
    }
    return payTable[matchCount][symbol] * bpl; //                                      
};

var RandomSpinViewCache = function (reels, bpl, totalBet, maxWin, mode, step = 0) {
    var randomSpinData = {};
    var view = [];
    var cache = {};

    if (mode == 2) {     //      
        view = RandomZeroView(reels, bpl);

        if (Util.probability(percentList.piddleHighPercent)) {
            cache.multi = piddleMultiArry[Util.random(0, piddleMultiArry.length)];
        } else {
            cache.multi = piddleMultiArry[Util.random(0, piddleMultiArry.length / 2)];
        }

        cache.view = view;

        randomSpinData.win = totalBet * cache.multi;
    } else {
        if (mode == 1) {  //                   
            var wildCount = Util.random(5, 7);
            var randomPosArr = Util.randomPositionArray(slotWidth, slotHeight, slotWidth * slotHeight);

            while (true) {
                view = RandomView(reels);

                if (NumberOfWilds(view) == 0) {
                    break;
                }
            }
            cache.view = view;
            cache.changedArr = randomPosArr.slice(0, wildCount);
            cache.changedSymbol = wild;


        } else if (mode == 3) { //            
            cache.view = RandomView(reels);
            cache.changedArr = GetGiantPosArr(Util.random(0, 3));
            cache.changedSymbol = Util.random(3, 12);
        }

        var finalView = GetFinalView(cache.view, cache.changedArr, cache.changedSymbol);

        randomSpinData.win = WinFromView(finalView, bpl);
    }

    randomSpinData.cache = cache;

    if (randomSpinData.win <= maxWin || step > 34) {
        return randomSpinData;
    }

    return RandomSpinViewCache(reels, bpl, totalBet, maxWin, mode, step + 1);
};

var GetGiantPosArr = function (startPos) {
    var res = [];

    for (var i = 0; i < 3; ++i) {
        for (var j = 0; j < 3; ++j) {
            res.push(startPos + i + slotWidth * j);
        }
    }

    return res;
};

var GetFinalView = function (view, posArr, changedSymbol) {
    var res = [...view];

    for (var i = 0; i < posArr.length; ++i) {
        res[posArr[i]] = changedSymbol;
    }

    return res;
};

var SelectedFreeViewCache = function (reels, bpl, fsLen, multi) {
    var freeSpinCacheList = [];
    var tmpView;
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;

    while (freeSpinIndex <= freeSpinLength) {
        while (true) {
            tmpView = RandomView(reels);
            tmpWin = WinFromView(tmpView, bpl);

            if (tmpWin && Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                break;
            }
        }

        freeSpinCacheList.push({
            view: tmpView,
        });

        freeSpinTotalWin += tmpWin * multi;
        freeSpinIndex++;
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
    };
};

var CoinCollectorViewCache = function (reels, bpl, fsLen, multi) {
    var freeSpinCacheList = [];
    var tmpView;
    var tmpWin = 0;
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var freeSpinMulti = multi;
    var nConis = 0;
    var tmpCoinCount = 0;

    while (freeSpinIndex <= freeSpinLength) {
        while (true) {
            tmpView = RandomView(reels);
            tmpWin = WinFromView(tmpView, bpl);
            tmpCoinCount = NumberOfCoins(tmpView);

            if (tmpWin && Util.probability(percentList.freeWinPercent) || tmpWin == 0) {
                if (tmpCoinCount) {
                    if (tmpCoinCount < 3 && Util.probability(percentList.CoinAddPercent)) {
                        break;
                    }
                } else {
                    break;
                }
            }
        }

        nConis += tmpCoinCount;
        freeSpinTotalWin += tmpWin * freeSpinMulti;

        if (nConis >= 5) {
            nConis -= 5;

            if (freeSpinMulti < 6) {
                ++freeSpinMulti;
            }

            freeSpinLength += 5;
        }

        freeSpinCacheList.push({
            view: tmpView,
        });
        freeSpinIndex++;
    }

    return {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
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

var NumberOfWilds = function (view) {
    var res = 0;

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            ++res;
        }
    }

    return res;
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

var isCoin = function (symbol) {
    return symbol == coin;
};

var NumberOfCoins = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isCoin(view[i])) {
            result++;
        }
    }
    return result;
}

module.exports = SlotMachine;