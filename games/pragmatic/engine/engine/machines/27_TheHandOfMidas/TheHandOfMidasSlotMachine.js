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
    this.scatterPositions = [];
    this.scatterExpanding = "";
    this.scatterExpandView = [];
    //                    
    this.multiPositions = [];
    this.multiValues = [];
    this.multiTotal = 1;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCountValues = "";
    this.freeSpinCountTable = "";
    this.freeSpinCacheList = [];

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE

    //                    
    this.buyMulti = 100;
    this.buyPatternCount = 50;

    this.doubleMulti = 0.25;
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [10, 11, 4, 6, 8, 9, 3, 7, 13, 5, 12, 8, 8, 5, 8, 13, 7, 8, 9, 8, 3, 8, 11, 11, 5, 8, 7, 6, 1, 8, 12, 5, 8, 11, 8, 4, 6, 8, 8, 7, 3, 6, 8, 4, 5, 9, 8, 12, 7, 8, 11, 6, 10, 8, 6, 9, 8, 6, 8, 4, 8, 6, 8, 12, 5, 6, 4],
    [12, 13, 7, 11, 8, 2, 5, 10, 9, 6, 4, 9, 5, 7, 4, 3, 13, 9, 2, 7, 4, 2, 7, 6, 1, 9, 7, 7, 8, 9, 10, 4, 13, 7, 8, 9, 7, 2, 7, 7, 9, 3, 8, 2, 9, 8, 7, 2, 10, 13, 2, 6, 1, 10],
    [3, 8, 4, 5, 11, 10, 2, 13, 6, 7, 9, 12, 8, 11, 8, 6, 9, 8, 7, 13, 3, 8, 5, 12, 10, 8, 6, 8, 12, 11, 12, 9, 5, 12, 8, 10, 11, 8, 5, 9, 6, 11, 8, 11, 8, 1, 8, 11, 12, 9, 3, 8, 12, 10, 2, 12, 8, 2, 9, 8, 12, 9, 8, 7, 5, 11, 12],
    [11, 3, 6, 2, 9, 5, 10, 13, 8, 4, 7, 12, 2, 8, 6, 4, 6, 8, 9, 4, 5, 8, 4, 1, 13, 4, 5, 3, 8, 9, 8, 9, 12, 2, 2, 10, 2, 2, 7, 9, 2, 12, 9, 12, 13, 8, 12, 8, 9, 8, 10, 4, 9, 6, 9, 12, 8, 6, 9, 1, 9, 5, 6, 2, 8, 6, 13],
    [6, 12, 10, 3, 7, 13, 11, 9, 5, 8, 4, 10, 7, 9, 7, 13, 7, 13, 11, 7, 11, 4, 9, 8, 1, 8, 9, 5, 10, 13, 7, 13, 8, 10, 6, 10, 13, 7, 13, 7, 3, 13, 7, 4, 13, 4, 5, 7, 13, 7, 13, 4, 8, 13, 8, 4, 11, 3, 10, 4, 10, 4, 7, 10, 13, 10, 11, 9, 10, 13, 12, 13, 9, 7, 11]
];
var freeReels = [
    [4, 4, 4, 5, 6, 8, 3, 5, 7, 5, 5, 5, 9, 10, 4, 12, 13, 7, 11, 8, 11, 12, 8, 12, 13, 12, 8, 3, 8, 11, 12, 12, 5, 8, 11, 5, 7, 12, 5, 8, 5, 13, 8, 13, 9, 13, 13, 12, 8, 13, 5, 13, 12, 3, 6, 12, 7, 13, 5, 6, 11, 12, 10, 13, 8, 13, 8, 3, 8, 12, 8, 12, 8, 12, 8, 11, 8, 12, 8, 11, 12, 11, 9, 3, 10, 12, 7, 11],
    [12, 7, 9, 2, 10, 5, 6, 8, 13, 3, 4, 11, 7, 5, 13, 7, 5, 13, 6, 10, 5, 4, 10, 5, 4, 13, 5, 9, 13, 10, 5, 5, 4, 10, 13, 3, 10, 13, 7, 10, 4, 11, 13, 4, 8, 13, 11, 3, 13, 5, 13, 4, 7, 4, 13, 11, 13, 5, 13, 4, 6, 13, 8, 13, 10, 5, 13],
    [5, 12, 4, 9, 11, 3, 10, 2, 6, 7, 13, 8, 10, 2, 13, 2, 8, 12, 4, 13, 6, 12, 6, 11, 6, 10, 11, 13, 2, 10, 6, 11, 9, 11, 10, 9, 12, 7, 6, 2, 13, 10, 11, 2, 11, 13, 2, 8, 12, 10, 7, 3, 2, 11, 12, 11, 10, 9, 10],
    [12, 2, 8, 9, 4, 13, 10, 5, 6, 3, 7, 11, 9, 13, 8, 5, 11, 10, 11, 10, 8, 9, 13, 2, 13, 2, 13, 8, 9, 10, 8, 3, 5, 9, 8, 7, 9, 13, 7, 7, 6, 13],
    [12, 4, 9, 7, 9, 6, 10, 5, 8, 11, 4, 13, 4, 4, 4, 5, 5, 5, 3, 6, 9, 4, 4, 10, 5, 7, 5, 9, 5, 9, 4, 4, 5, 9, 4, 11, 9, 4, 13, 4, 11, 4, 5, 4, 9, 6, 9, 9, 4, 5, 5, 10, 3, 4, 6, 11, 6, 5, 4, 13, 11, 5, 4, 5, 9, 4, 5, 9, 5, 11, 5, 6, 4, 6, 5, 3, 10, 4, 9, 10, 9, 4, 5, 9, 4, 7, 5, 4, 4, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 30, 25, 20, 15, 10, 5, 5, 2, 2, 2],
    [0, 0, 0, 120, 90, 70, 50, 35, 20, 10, 10, 5, 5, 5],
    [0, 0, 0, 400, 300, 250, 200, 150, 100, 50, 50, 25, 25, 25]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],          // 3
    [0, 6, 12, 8, 4],          // 4
    [10, 6, 2, 8, 14],          // 5
    [5, 11, 12, 13, 9],          // 6
    [5, 1, 2, 3, 9],          // 7
    [0, 1, 7, 13, 14],          // 8
    [10, 11, 7, 3, 4],          // 9
    [5, 11, 7, 3, 9],          // 10
    [5, 1, 7, 13, 9],          // 11
    [0, 6, 7, 8, 4],          // 12
    [10, 6, 7, 8, 14],          // 13
    [5, 6, 2, 8, 9],          // 14
    [5, 6, 12, 8, 9],          // 15
    [0, 11, 2, 13, 4],          // 16
    [10, 1, 12, 3, 14],          // 17
    [0, 1, 12, 3, 4],           // 18
    [10, 11, 2, 13, 14],           // 19
    [0, 11, 12, 13, 4],         // 20
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 15; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player, param) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;


    //                   
    if (viewCache.type == "FREE") {
        if (param.pur != null) {
            this.isBuyBonus = 1;
            this.puri = param.pur;
        }
        else {
            this.isBuyBonus = 0;
            this.puri = 0;
        }
        this.freeSpinCacheList = viewCache.view[this.puri];
        this.view = this.freeSpinCacheList[0].view;

        this.freeSpinIndex = 1;
        this.freeSpinLength = this.freeSpinCacheList[0].fsLenInfo.total;
        this.freeSpinCountValues = this.freeSpinCacheList[0].fsLenInfo.values;
        this.freeSpinCountTable = this.freeSpinCacheList[0].fsLenInfo.table;
        this.freeSpinWinMoney = 0;
        var expanding = ScatterExpanding(this.view);
        this.scatterExpandView = expanding.view;
        this.scatterExpanding = expanding.expanding;

        this.currentGame = "FREE";
    }
    else { //               
        this.view = viewCache.view;

        this.multiPositions = viewCache.positions;
        this.multiValues = viewCache.values;
        this.multiTotal = viewCache.total;

        this.winMoney = WinFromView(this.view, player.betPerLine) * viewCache.total;
        this.winLines = WinLinesFromView(this.view, viewCache.total, player.betPerLine);
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.maskView = GetMaskView(cache.view, this.view);
    this.view = cache.view;

    this.multiPositions = cache.positions;
    this.multiValues = cache.values;
    this.multiTotal = cache.total;

    var stickys = [];
    for (var i = 0; i < this.multiPositions.length; i++) {
        stickys.push(`${this.multiPositions[i]},${this.multiPositions[i]}`);
    }
    this.freeSpinSticky = stickys.join(`~`);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine) * cache.total;
    this.winLines = WinLinesFromView(this.view, cache.total, player.betPerLine);
    this.freeSpinWinMoney += this.winMoney;

    //                                                  
    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";

        //                                 
        stickys = [];
        for (var i = 0; i < this.multiPositions.length; i++) {
            stickys.push(`${this.multiPositions[i]},-1`);
        }
        this.freeSpinSticky = stickys.join(`~`);
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin, result;

    if (baseWin > 0) {
        tmpCache = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpCache = RandomZeroView(baseReels, bpl);
    }

    tmpView = tmpCache.view;
    result = tmpCache.result;
    tmpWin = tmpCache.win;

    var pattern = {
        view: tmpView,
        win: tmpWin,
        positions: result.positions,
        values: result.values,
        total: result.total,
        type: "BASE",
        bpl: bpl
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
        case "BONUS":
            //return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default:
            return this.SpinForBaseGen(bpl, totalBet, jpWin);
    }

}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl, 3);

    //                                  
    var fsLenInfo = RandomFreeSpinCounts(scatterView, 3);
    //                                 
    var freeSpinData = [];

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, fsLenInfo.total, GetFreeSpinMin(scatterView, totalBet), totalBet);

    freeSpinData.push({
        view: scatterView,
        fsLenInfo: fsLenInfo
    });

    return {
        win: cache.win,
        bpl: bpl,
        view: [freeSpinData.concat(cache.view)],
        type: "FREE",
        isCall: isCall ? 1 : 0
    }
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinStore = [];

    var max = 0;

    for (var i = 0; i < 3; ++i) {
        //                    
        var scatterView = RandomScatterView(baseReels, bpl, i + 3); //             3, 4, 5                       
        var min = GetFreeSpinMin(scatterView, totalBet);

        //                                  
        var fsLenInfo = RandomFreeSpinCounts(scatterView, i + 3);
        //                                 
        var freeSpinData = [];
        var cache = {};

        //min                                        
        while (true) {
            cache = BuyBonusViewCache(freeReels, bpl, fsLenInfo.total, totalBet);
            if (cache.win > min)
                break;
        }

        if (cache.win > max)
            max = cache.win;

        freeSpinData.push({
            view: scatterView,
            fsLenInfo: fsLenInfo,
            win: cache.win
        });

        freeSpinStore.push(freeSpinData.concat(cache.view));
    }
    return {
        win: max,
        bpl: bpl,
        view: freeSpinStore,
        type: "FREE",
        isCall: 0
    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;
    var result;

    while (true) {
        tmpView = RandomView(reels);
        result = RandomMultiFromView(tmpView);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin * result.total > bottomLimit && tmpWin * result.total <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return {
        result: result,
        view: tmpView,
        win: tmpWin * result.total
    };
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin, result;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        result = RandomMultiFromView(tmpView);
        if (tmpWin == 0) {
            break;
        }
    }
    return {
        result: result,
        view: tmpView,
        win: 0
    };
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

        var crowns = NumberOfSymbols(view, 3);

        if (!isFreeSpinWin(view) && crowns < 4 && (crowns == 0 || Util.probability(10))) {
            break;
        }
    }

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, fsMin, totalBet) {
    var minMoney = Util.max(fsMin, fsWin * 0.8);
    var maxMoney = Util.max(fsMin, fsWin) * 1.2;

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;


    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen, totalBet);
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

var BuyBonusViewCache = function (reels, bpl, fsLen, totalBet) {
    var freeSpinStore = [];
    var freeSpinWinMoney = 0;
    var freeSpinWilds = RandomFreeSpinStickyWilds(totalBet, fsLen);

    //                                              
    var result = RandomFreeViewResult(reels, freeSpinWilds[0]);
    var money = WinFromView(result.view, bpl) * result.total;
    freeSpinWinMoney += money;

    var firstCache = {
        view: result.view,
        wildCount: freeSpinWilds[0],
        values: result.values,
        positions: result.positions,
        total: result.total,
        money: money
    }
    freeSpinStore.push(firstCache);

    for (var freeSpinIndex = 1; freeSpinIndex < fsLen; ++freeSpinIndex) {
        //                            
        var lastCache = freeSpinStore[freeSpinIndex - 1];
        var wildCount = freeSpinWilds[freeSpinIndex];

        var newValues = Util.clone(lastCache.values);
        var newPositions = Util.clone(lastCache.positions);
        var newTotal = lastCache.total;
        var newView = Util.clone(lastCache.view);

        //                                  
        if (wildCount != lastCache.wildCount) {
            var addWildCount = wildCount - lastCache.wildCount;                //                          
            for (var i = 0; i < addWildCount; i++) {
                var addIdx = 1;
                while (true) //                                                                          
                {
                    addIdx = Util.random(0, slotHeight) * slotWidth + Util.random(1, 4);
                    if (newView[addIdx] != wild)
                        break;
                }
                if (Util.probability(12))
                    newValues.push(3);
                else if (Util.probability(22))
                    newValues.push(2);
                else
                    newValues.push(1);
                newTotal += newValues[newValues.length - 1];
                newPositions.push(addIdx);
                newView[addIdx] = wild;
            }
        }

        var newCache = {
            view: newView,
            values: newValues,
            positions: newPositions,
            total: newTotal,
        };

        var result = RandomFreeViewResult(reels, wildCount, newCache);
        var money = WinFromView(result.view, bpl) * result.total;

        freeSpinWinMoney += money;

        var multiCache = {
            view: result.view,
            wildCount: wildCount,
            values: result.values,
            positions: result.positions,
            total: result.total,
            money: money
        }
        freeSpinStore.push(multiCache);
    }

    var freeSpinData = {
        view: freeSpinStore,
        win: freeSpinWinMoney
    };
    return freeSpinData;
};

var RandomMultiFromView = function (view) {
    var wildPositions = [], multiValues = [], total = 1;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            wildPositions.push(i);
        }
    }

    if (wildPositions.length > 0) {
        for (var i = 0; i < wildPositions.length; i++) {
            if (Util.probability(22)) {
                multiValues[i] = 3;
            } else if (Util.probability(50)) {
                multiValues[i] = 2;
            } else {
                multiValues[i] = 1;
            }
            total += multiValues[i];
        }
    }

    var result = {
        view: view,
        values: multiValues,
        positions: wildPositions,
        total: total
    }
    return result;
};

var RandomFreeSpinStickyWilds = function (totalBet, freeSpinLength, targetMoney = 0) {
    var freeSpinStickWilds = [];
    //                        
    if (targetMoney >= totalBet * 3000) {
        maxWildCount = Util.random(7, 9);
    } else if (targetMoney >= totalBet * 1000) {
        maxWildCount = Util.random(6, 8);
    } else if (targetMoney >= totalBet * 500) {
        maxWildCount = Util.random(5, 7);
    } else {
        maxWildCount = Util.random(1, 5);
    }
    maxWildCount++;

    var wildCounts = [];
    for (var i = 0; i < maxWildCount; i++) {
        wildCounts.push(1);
    }
    var total = freeSpinLength - maxWildCount;

    while (total > 0) {
        var index = Util.random(0, maxWildCount);
        wildCounts[index]++; //                       
        total--;
    }

    for (var i = 0; i < maxWildCount; i++) {
        for (var j = 0; j < wildCounts[i]; j++) {
            freeSpinStickWilds.push(i);
        }
    }

    freeSpinStickWilds.push(maxWildCount - 1);
    return freeSpinStickWilds;
};

var RandomFreeViewResult = function (reels, wildCount, multiCache = null) {
    //                                                                     
    if (multiCache == null) {
        var view = RandomFreeViewWithWilds(reels, wildCount);
        var result = RandomMultiFromView(view);
    } //    ,       (                  )             
    else {
        var result = multiCache;
        var newView = Util.clone(result.view);
        var wildCount = NumberOfWilds(result.view);
        //                                                                   
        var view = RandomFreeViewWithWilds(reels, 0);
        for (var j = 0; j < newView.length; j++) {
            //                                           
            if (result.positions.indexOf(j) < 0) {
                newView[j] = view[j];
            }
        }
        result["view"] = newView;
    }
    return result;
};

var RandomFreeViewWithWilds = function (reels, wildCount) {
    var view = [];
    while (true) {
        view = RandomView(reels);
        if (NumberOfWilds(view) == 0) {
            break;
        }
    }

    if (wildCount == 0) {
        return view;
    }

    //    1,    5                                                       
    var positions = [];
    for (var i = 0; i < view.length; i++) {
        var reelNo = i % slotWidth;
        if (reelNo == 0 || reelNo == 4) {
            continue;
        }
        positions.push(i);
    }

    Util.shuffle(positions);
    for (var j = 0; j < wildCount; j++) {
        var pos = positions[j];
        view[pos] = wild;
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

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) //                                              
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

var WinLinesFromView = function (view, multi, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl) * multi;
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var NumberOfWilds = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result++;
        }
    }
    return result;
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

var RandomScatterView = function (reels, bpl, nScatters = -1) {
    var view = [];
    var reelsPos = [0, 1, 2, 3, 4];

    while (true) {
        view = RandomView(reels);
        if (WinFromView(view, bpl) == 0 && NumberOfScatters(view) == 0)
            break;
    }
    Util.shuffle(reelsPos);

    if (nScatters < 0) {
        if (Util.probability(22)) {
            nScatters = 5;
        } else if (Util.probability(30)) {
            nScatters = 4;
        } else {
            nScatters = 3;
        }
    }

    for (var i = 0; i < nScatters; i++) {
        var reelNo = reelsPos[i];
        var pos = reelNo + Util.random(0, slotHeight) * slotWidth;
        view[pos] = scatter;
    }
    return view;
};

var ScatterExpanding = function (view) {
    var scatterPositions = ScatterPositions(view);
    var expandPositions = [];
    var expandView = Util.clone(view);
    for (var i = 0; i < scatterPositions.length; i++) {
        var pos = scatterPositions[i];
        var reelNo = pos % slotWidth;
        for (var j = 0; j < slotHeight; j++) {
            var expandPos = reelNo + j * slotWidth;
            expandPositions.push(expandPos);
            expandView[expandPos] = scatter;
        }
    }
    return {
        view: expandView,
        expanding: `${scatter}~${scatterPositions.join()}~${expandPositions.join()}`,
    };
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

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
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

var GetFreeSpinMin = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 3: return totalBet * 10;
        case 4: return totalBet * 20;
        case 5: return totalBet * 30;
    }
    return 0;
};

var RandomFreeSpinCounts = function (view, nScatters) {
    var miniReelPositions = ScatterExpanding(view).expanding.split('~')[2].split(',');
    var freeSpinCountValues = [], freeSpinCountTable = [];
    var totalCount = 0;

    while (true) {
        freeSpinCountValues = [], freeSpinCountTable = [];
        totalCount = 0;

        for (var i = 0; i < miniReelPositions.length; i++) {
            var pos = miniReelPositions[i];
            var value = 0;
            if (Util.probability(7)) {
                value = 3;
            } else if (Util.probability(12)) {
                value = 2;
            } else {
                value = 1;
            }
            freeSpinCountValues.push(`${scatter}~${pos}~${value}`);
            freeSpinCountTable.push(`s~p~n`);
            totalCount += value;
        }
        if (nScatters < 0)
            break;

        if (nScatters == 3 && totalCount >= 9 && totalCount <= 16)
            break;

        if (nScatters == 4 && totalCount >= 16 && totalCount <= 22)
            break;

        if (nScatters == 5 && totalCount >= 22 && totalCount <= 32)
            break;
    }

    var result = {
        values: freeSpinCountValues.join(';'),
        table: freeSpinCountTable.join(';'),
        total: totalCount
    }
    return result;
};

var GetMaskView = function (view, prevView) {
    var maskView = Util.clone(view);
    for (var i = 0; i < maskView.length; i++) {
        if (isWild(maskView[i]) && isWild(prevView[i])) {
            maskView[i] = Util.random(3, 13);
        }
    }
    return maskView;
}

module.exports = SlotMachine;