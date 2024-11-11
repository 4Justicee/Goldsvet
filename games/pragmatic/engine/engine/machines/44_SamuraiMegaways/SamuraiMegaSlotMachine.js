var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus == "NOTUMBLE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.topView = [];
    this.boxView = [];
    this.topTumble = "";
    this.boxTumble = "";
    this.topLineAbove = 12;
    //          
    this.tumbleIndex = 0;
    this.tmb_res = 0;
    this.tumbleCacheList = [];
    //                           
    this.iaw = "";
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinMulti = 1;

    this.buyMulti = 100;
    this.buyPatternCount = 30;
    this.doubleMulti = 0.25;
    //             
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
var empty = 16;
var slotWidth = 6;
var slotHeight = 8;
var winMulti = 1;
var winLines = [];
var tumblingPositions = [];
var baseReels = [
    [12, 12, 12, 11, 6, 12, 11, 8, 10, 11, 11, 11, 3, 1, 9, 9, 9, 10, 7, 7, 7, 4, 6, 6, 6, 7, 5, 5, 5, 5, 10, 10, 10, 12, 9, 6, 10, 1, 9, 4, 11, 6, 10, 7, 5, 10],
    [8, 8, 8, 9, 3, 8, 4, 12, 5, 1, 12, 11, 10, 7, 10, 6, 11, 9, 5, 9, 12, 11, 5, 9, 11, 11, 4, 7, 11, 11, 12, 11, 12, 4, 5, 12, 11, 12, 1, 12, 11, 12, 10, 11, 12, 6, 11, 12, 11],
    [4, 10, 5, 6, 11, 11, 11, 9, 11, 10, 10, 10, 7, 12, 12, 12, 3, 10, 11, 12, 12, 8, 1, 10, 10, 12, 8, 8, 7, 10, 3, 8, 12, 3, 8, 12, 8, 5, 8, 1, 8, 9, 8, 5, 8, 12],
    [12, 3, 5, 7, 6, 11, 10, 8, 10, 11, 12, 4, 9, 1, 8, 9, 5, 9, 4, 11, 3, 9, 5, 9, 11, 5, 6, 10, 11, 5, 9, 10, 9, 10, 11, 5, 8, 9, 4, 10, 9, 7, 10, 9, 5, 11, 12],
    [12, 8, 4, 11, 12, 1, 11, 9, 10, 3, 6, 7, 10, 5, 11, 9, 4, 6, 4, 8, 8, 11, 5, 6, 11, 3, 6, 8, 5, 4, 10, 11, 1, 3, 8, 12, 6, 5, 11, 6],
    [4, 5, 12, 12, 11, 6, 7, 1, 3, 11, 8, 10, 9, 10, 10, 11, 6, 11, 1, 6, 9, 12, 6, 11, 12, 11, 3, 11, 12, 6, 10, 11, 11, 12, 3, 12, 11, 6, 11, 12, 3]
];
var topReels = [8, 12, 3, 6, 9, 11, 5, 10, 10, 11, 4, 12, 7, 12, 12, 11, 4, 7, 11, 9, 11, 4, 7, 12, 3, 11, 9];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 20, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 80, 40, 10, 10, 8, 8, 8, 4, 4, 4, 0, 0, 0, 0],
    [0, 0, 0, 200, 50, 20, 16, 10, 10, 10, 8, 8, 8, 0, 0, 0, 0],
    [0, 0, 0, 400, 75, 40, 30, 25, 25, 20, 20, 20, 20, 0, 0, 0, 0]
];
var freeSpinCounts = [5, 5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 8, 8, 8, 8, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12, 12, 12];
var freeSpinMultis = [2, 3, 5, 8, 10, 15, 20, 25, 2, 3, 5, 8, 10, 15, 20, 25, 2, 3, 5, 8, 10, 15, 2, 3, 5, 8, 10, 15];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
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

    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        this.view = this.tumbleCacheList[0];
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinMulti = cache.winMulti;
        this.freeSpinLength = cache.length;
        this.freeSpinCacheList = cache.viewList;
        this.tumbleCacheList = this.freeSpinCacheList[0];
        this.view = this.tumbleCacheList[0];
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    winMulti = 1;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    var topTumblePositions = [],
        boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);
    this.topLineAbove = Util.random(wild, 13);

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tumbleStatus = "TUMBLE";
    }

    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.currentGame = "FREE";
        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.iaw = `fs~${this.freeSpinLength}~23~${freeSpinCounts.join()};mul~${this.freeSpinMulti}~23~${freeSpinMultis.join()}`;
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    this.view = this.tumbleCacheList[this.tumbleIndex];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    var topTumblePositions = [],
        boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);

    this.tmb_res += this.winMoney;
    this.tumbleIndex++;

    this.topLineAbove = Util.random(wild, 13);

    //                 
    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        if (this.tumbleStatus == "NOTUMBLE") {
            this.freeSpinWinMoney += this.tmb_res;

            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }

        return;
    }

    winMulti = this.freeSpinMulti;

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = this.tumbleCacheList[0];

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.topView = this.view.slice(1, slotWidth - 1).reverse();
    this.boxView = this.view.slice(slotWidth, slotWidth * slotHeight);

    var topTumblePositions = [],
        boxTumblePositions = [];
    for (var i = 0; i < tumblingPositions.length; i++) {
        //                 [0,1,2,3,4,5]    [-1,3,2,1,0,-1]                    
        if (tumblingPositions[i] < slotWidth) {
            topTumblePositions.push(4 - tumblingPositions[i]);
        } //                      
        else {
            boxTumblePositions.push(tumblingPositions[i] - slotWidth);
        }
    }

    this.topTumble = GetTumbles(this.topView, topTumblePositions);
    this.boxTumble = GetTumbles(this.boxView, boxTumblePositions);

    this.topLineAbove = Util.random(wild, 13);

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
        bpl: bpl
    };

    winMulti = 1;
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
        default:
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet);

    //                           
    var freeSpinCacheList = [];
    var fsLen = freeSpinCounts[Util.random(0, freeSpinCounts.length)];
    winMulti = freeSpinMultis[Util.random(0, freeSpinMultis.length)];

    var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin, fsLen);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: {
            viewList: freeSpinCacheList.concat(fsCache.cache),
            length: fsLen,
            winMulti: winMulti
        },
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet);

    //                           
    var freeSpinCacheList = [];
    var fsLen = freeSpinCounts[Util.random(0, freeSpinCounts.length)];
    winMulti = freeSpinMultis[Util.random(0, freeSpinMultis.length)];

    var fsCache = BuyBonusViewCache(baseReels, bpl, fsLen);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: {
            viewList: freeSpinCacheList.concat(fsCache.cache),
            length: fsLen,
            winMulti: winMulti
        },
        type: "FREE",
        isCall: 0
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
            var lastTumbling = Util.clone(tumblingPositions);
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

var RandomView = function (reels, reelSizes = []) {
    var randomView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);

            var reelSize = Util.random(2, slotHeight - 1) + 1;
            if (Util.probability(5)) {
                reelSize = Util.random(2, slotHeight) + 1;
            }

            if (reelSizes.length > 0) {
                reelSize = reelSizes[i];
            }

            for (var j = 0; j < reelSize; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                randomView[viewPos] = reels[i][reelPos];
            }
            for (var j = reelSize; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                randomView[viewPos] = empty;
            }
        }

        var topIndex = Util.random(0, topReels.length);
        for (var i = 0; i < slotWidth; i++) {
            randomView[i] = topReels[(topIndex + i) % topReels.length];
        }

        randomView[0] = empty;
        randomView[slotWidth - 1] = empty;

        if (Util.probability(20)) {
            var wildPos = Util.random(0, slotWidth * slotHeight);
            if (wildPos % slotWidth > 0 && randomView[wildPos] != empty) {
                randomView[wildPos] = wild;
            }
        }

        if (!isFreeSpinWin(randomView)) {
            break;
        }
    }

    return randomView;
};

var RandomScatterView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        if (NumberOfScatters(view) == 0 && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    var reelsPos = [0, 1, 2, 3, 4, 5];
    Util.shuffle(reelsPos);

    var nScatters;
    if (Util.probability(80)) {
        nScatters = 3;
    } else if (Util.probability(80)) {
        nScatters = 4;
    } else if (Util.probability(80)) {
        nScatters = 5;
    } else {
        nScatters = 6;
    }

    for (var i = 0; i < nScatters; i++) {
        var reelNo = reelsPos[i];
        var reelSize;
        for (reelSize = 1; reelSize < slotHeight; reelSize++) {
            var pos = reelNo + reelSize * slotWidth;
            if (view[pos] == empty) {
                break;
            }
        }
        // var top = 0;
        // if (reelNo == 0 || reelNo == slotWidth - 1) {
        //     top = 1;
        // }
        var top = 1;
        var pos = reelNo + Util.random(top, reelSize) * slotWidth;
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

        if (isFreeSpinWin(view) || (NumberOfScatters(view) > 0 && Util.probability(90))) {
            continue;
        }

        var tumbleWinMoney = WinFromView(view, bpl);
        var viewList = [view];
        //                       
        if (tumbleWinMoney > 0) {
            while (true) {
                var lastView = viewList[viewList.length - 1];
                var lastTumbling = Util.clone(tumblingPositions);
                var newView = GetTumbleView(lastView, lastTumbling);

                if (isFreeSpinWin(newView) || (NumberOfScatters(newView) > 0 && Util.probability(90))) {
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
        cache: freeSpinCacheList
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

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    tumblingPositions = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (view[pos] == empty) {
            continue;
        }
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {
    //                           ,                                               
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId] * winMulti;
        if (winMoney > 0) {
            //                                               2   
            var hasWild = false;
            for (var i = 0; i < history.length; i++) {
                var pos = history[i];
                if (tumblingPositions.indexOf(pos) < 0) {
                    tumblingPositions.push(pos);
                }
                if (isWild(view[pos])) {
                    hasWild = true;
                }
            }
            if (hasWild) {
                winMoney *= 2;
            }
            winLines.push(`0~${winMoney}~${history.join("~")}`);
        }
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId] * winMulti;
        if (winMoney > 0) {
            //                                               2   
            var hasWild = false;
            for (var i = 0; i < history.length; i++) {
                var pos = history[i];
                if (tumblingPositions.indexOf(pos) < 0) {
                    tumblingPositions.push(pos);
                }
                if (isWild(view[pos])) {
                    hasWild = true;
                }
            }
            if (hasWild) {
                winMoney *= 2;
            }
            winLines.push(`0~${winMoney}~${history.join("~")}`);
        }
        return winMoney;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var GetTumbles = function (view, positions) {
    var tumbles = [];
    for (var i = 0; i < positions.length; i++) {
        var tumblePos = positions[i];
        if (tumblePos < 0 || tumblePos >= view.length) {
            continue;
        }
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    if (tumbles.length == 0) {
        return "";
    }
    return tumbles.join("~");
};

var GetTumbleView = function (view, tumbles) {
    while (true) {
        var tumbleView = Util.clone(view);

        //                                
        for (var i = slotWidth - 1; i >= 1; i--) {
            //                                    
            if (tumbles.indexOf(i) >= 0 && tumbleView[i] != empty) {
                for (var j = i + 1; j < slotWidth - 1; j++) {
                    tumbleView[j - 1] = tumbleView[j];
                }
                tumbleView[slotWidth - 2] = -1;
            }
        }

        //                                             
        for (var i = 0; i < slotWidth; i++) {
            //                                         
            for (var j = 1; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                if (view[pos] == empty) {
                    break;
                }
                //                                    
                if (tumbles.indexOf(pos) >= 0 && tumbleView[pos] != empty) {
                    for (var k = j - 1; k >= 1; k--) {
                        tumbleView[i + (k + 1) * slotWidth] = tumbleView[i + k * slotWidth];
                    }
                    tumbleView[i + slotWidth] = -1;
                }
            }
        }

        var reelSizes = [8, 8, 8, 8, 8, 8];
        var randomView = RandomView(baseReels, reelSizes);

        for (var i = 0; i < tumbleView.length; i++) {
            if (tumbleView[i] < 0) {
                tumbleView[i] = randomView[i];
            }
        }

        tumbleView[0] = empty;
        tumbleView[slotWidth - 1] = empty;

        if (isDoubleScatterInLine(tumbleView)) {
            continue;
        }

        var otherView = false;
        for (var i = 0; i < tumbleView.length; i++) {
            if (view[i] != tumbleView[i]) {
                otherView = true;
                break;
            }
        }

        if (otherView) {
            return tumbleView;
        }
    }
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

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 3:
            return totalBet * 5;
        case 4:
            return totalBet * 10;
        case 5:
            return totalBet * 20;
        case 6:
            return totalBet * 100;
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

module.exports = SlotMachine;