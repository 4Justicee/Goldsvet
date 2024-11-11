var Util = require('../../../utils/slot_utils');

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
    this.scatterWin = 0;
    this.scatterPositions = [];
    //                    
    this.wildRespin = false;
    this.prevWildRespin = false;
    this.wildRespinView = [];
    this.wildRespinMoneyCache = {};
    this.wildRespinMoney = 0;
    this.boxSize = { width: 3, height: 3 };

    this.viewList = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    //                   
    this.buyMulti = 100;
    this.buyPatternCount = 50;
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE
};

var scatter = 1;
var wild = 2;
var moneySymbol = 20;
var empty = 14;
var slotWidth = 6;
var slotHeight = 4;
var freeSpinCount = 10;
var boxSize = {};
var baseReels = [
    [10, 7, 7, 7, 7, 5, 3, 3, 3, 12, 6, 6, 6, 4, 6, 11, 9, 2, 8, 4, 4, 4, 3, 1, 9, 6, 3],
    [4, 3, 3, 3, 3, 12, 7, 6, 6, 6, 9, 6, 7, 7, 7, 1, 5, 11, 10, 2, 8, 12, 7, 12, 3, 12, 7],
    [3, 3, 3, 7, 12, 3, 6, 4, 6, 6, 6, 11, 20, 20, 20, 20, 9, 1, 10, 5, 8, 6, 8, 20, 7, 6, 5, 20, 12, 20, 12, 20, 12, 20, 12, 11, 12, 20, 6, 20, 7, 20, 11, 20, 5, 10, 20, 12, 7, 9, 6, 12, 5, 8, 10, 11, 20, 12, 7, 6, 8, 20, 12, 20, 6, 7, 5, 12, 5, 6],
    [3, 7, 20, 12, 12, 12, 6, 20, 20, 20, 5, 1, 4, 20, 8, 11, 9, 12, 10, 6, 7, 6, 12, 10, 7, 10, 20, 7, 9, 20, 6, 5, 20, 7, 9, 4, 10, 12, 6, 12, 4, 9, 12, 5, 12, 4, 6, 20, 12, 6, 7, 4, 20, 9, 6, 8, 6, 12, 6, 11, 20, 9, 20, 10, 12, 20, 20, 20, 12, 7, 20, 9, 20, 6, 20, 12, 20, 20, 6, 6, 20, 12, 6, 20, 12, 7, 12, 20, 12, 20, 10],
    [6, 6, 6, 11, 4, 12, 6, 20, 7, 7, 7, 1, 20, 5, 5, 5, 3, 10, 9, 7, 5, 4, 4, 4, 8, 20, 20, 7, 5, 7, 5, 20, 1, 7, 20, 5, 7, 4, 5, 7, 4, 7, 20, 11, 20, 20, 4, 7, 5, 7, 4, 8, 7, 3, 5, 4, 7, 20, 3, 7, 20, 3, 20, 7, 4, 7, 5, 4, 20, 5, 11, 7],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 20, 10, 10, 10, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 125, 50, 25, 25, 25, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 250, 150, 100, 50, 50, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var moneySymbolValues = [25, 50, 75, 100, 150, 200, 250, 500, 1000, 1250, 2500, 5000, 6250, 10000, 12500, 250000];

SlotMachine.prototype.Init = function () {
    this.highPercent = 4; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevWildRespin = this.wildRespin;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    //                           
    if (this.wildRespin == true) {
        this.moneyCache = this.wildRespinMoneyCache;
        this.winMoney = this.wildRespinMoney;
        this.moneyPositions = GetWinMoneyPositions(this.wildRespinView);
        this.boxSize = { width: 3, height: 3 };
        boxSize = this.boxSize;
        this.wildRespin = false;
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        this.viewList = cache.viewList;
        this.boxSize = cache.boxSize;
        this.view = this.viewList[0].view;
        this.moneyCache = this.viewList[0].moneyCache;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0][0].view;
        this.moneyCache = this.freeSpinCacheList[0][0].moneyCache;

        if (viewCache.isBonus != undefined) {
            this.isBonusBuy = true;
        }
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;
    this.moneyPositions = GetWinMoneyPositions(this.view);

    //                                       ...
    if (isWildRespinView(this.view)) {
        boxSize = this.boxSize;

        this.maskView = [];
        if (boxSize.width == 4 && boxSize.height == 3) {
            this.maskView = Util.clone(this.view);
            for (var i = 0; i < this.maskView.length; i++) {
                if (isMoneySymbol(this.maskView[i])) {
                    this.maskView[i] = Util.random(15, 20);
                }
            }
        }

        this.wildRespinView = this.viewList[1].view;
        this.wildRespinMoneyCache = this.viewList[1].moneyCache;
        this.moneyTotalValue = MoneyWinFromCache(this.wildRespinView, this.wildRespinMoneyCache, player.betPerLine) / player.betPerLine;
        this.wildRespinMoney = this.winMoney + this.moneyTotalValue * player.betPerLine;

        this.sticky = [];
        var moneyPositions = MoneySymbolPositions(this.view);
        for (var i = 0; i < moneyPositions.length; i++) {
            var pos = moneyPositions[i];
            if (pos % slotWidth != slotWidth - 1) {
                this.sticky.push(pos);
            }
        }

        this.wildRespin = true;
    }

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        freeSpinCount = FreeSpinCountsFromView(this.view);
        this.freeSpinLength = freeSpinCount;

        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);

        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;

        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.wildRespin == true) {
        this.moneyCache = this.wildRespinMoneyCache;
        this.winMoney = this.moneyTotalValue;
        this.freeSpinWinMoney += this.winMoney;
        this.moneyPositions = GetWinMoneyPositions(this.wildRespinView);
        this.boxSize = { width: 3, height: 3 };
        boxSize = this.boxSize;
        this.wildRespin = false;
        return;
    }

    this.isBonusBuy = false;
    var cache = this.freeSpinCacheList[1][this.freeSpinIndex - 1];
    this.view = cache[0].view;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.moneyCache = cache[0].moneyCache;

    if (isWildRespinView(this.view)) {
        boxSize = cache[1].boxSize;

        this.maskView = [];
        if (boxSize.width == 4 && boxSize.height == 3) {
            this.maskView = Util.clone(this.view);
            for (var i = 0; i < this.maskView.length; i++) {
                if (isMoneySymbol(this.maskView[i])) {
                    this.maskView[i] = Util.random(15, 20);
                }
            }
        }

        this.wildRespinView = Util.clone(cache[1].view);
        this.wildRespinMoneyCache = cache[1].moneyCache;
        this.moneyTotalValue = MoneyWinFromCache(this.wildRespinView, this.wildRespinMoneyCache, player.betPerLine);

        this.sticky = [];
        var moneyPositions = MoneySymbolPositions(this.view);
        for (var i = 0; i < moneyPositions.length; i++) {
            var pos = moneyPositions[i];
            //                                                                
            if (pos % slotWidth != slotWidth - 1) {
                this.sticky.push(pos);
            }
        }
        this.wildRespin = true;
    } else {
        this.winLines = winLines;
        this.moneyPositions = MoneySymbolPositions(this.view);
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.boxSize = { width: 3, height: 3 };
        boxSize = this.boxSize;
        this.moneyPositions = [];
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
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var viewList = [];
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = WinFromView(scatterView, bpl) + ScatterWinFromView(scatterView, totalBet);
    var result = {
        view: scatterView,
        moneyCache: RandomMoneySymbols(scatterView)
    };
    viewList.push([result]);

    var fsCount = FreeSpinCountsFromView(scatterView);
    var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin, fsCount);
    viewList.push(fsCache.cache)

    var pattern = {
        view: viewList,
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var viewList = [];
    var scatterView = RandomScatterView(baseReels, bpl);

    // 3.8                                   . (                      )
    for (var i = 0; i < scatterView.length; i++) {
        if (scatterView[i] == scatter) {
            scatterView[i] = Util.random(3, 14);
        }
    }
    var reel1 = [6, 12, 18], reel2 = [7, 13, 19], reel3 = [8, 14, 20];
    var pos = [];
    pos[0] = reel1[Util.random(0, 3)];
    pos[1] = reel2[Util.random(0, 3)];
    pos[2] = reel3[Util.random(0, 3)];

    for (var i = 0; i < pos.length; i++) {
        scatterView[pos[i]] = scatter;
    }

    //---------------------------------------------//

    var scatterWinMoney = WinFromView(scatterView, bpl) + ScatterWinFromView(scatterView, totalBet);
    var result = {
        view: scatterView,
        moneyCache: RandomMoneySymbols(scatterView)
    };
    viewList.push([result]);

    var fsCount = FreeSpinCountsFromView(scatterView);
    var fsCache = BuyBonusViewCache(baseReels, bpl, fsCount, true);

    viewList.push(fsCache.cache)

    var pattern = {
        view: viewList,
        bpl: bpl,
        win: fsCache.win + scatterWinMoney,
        type: "FREE",
        isCall: 0,
        isBonus: 1
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var winMoney = 0, viewList = [], bottomLimit = 0, calcCount = 0;

    while (true) {
        viewList = [];
        //                                    
        boxSize = { width: 3, height: 3 };
        tmpView = RandomView(reels);
        if (isWildRespinView(tmpView)) {
            boxSize = RandomViewChangeSize(true);
            var randomView = RandomView(reels);
            for (var i = 0; i < slotHeight; i++) {
                for (var j = 2; j < slotWidth; j++) {
                    tmpView[j + i * slotWidth] = randomView[j + i * slotWidth];
                }
            }
        }
        var tmpMoneyCache = RandomMoneySymbols(tmpView);
        winMoney = WinFromView(tmpView, bpl);
        var cache = {
            view: tmpView,
            moneyCache: tmpMoneyCache
        }
        viewList = [cache];

        if (isWildRespinView(tmpView)) {
            //                                     
            var moneyPositions = MoneySymbolPositions(tmpView);
            var newView = Util.clone(tmpView);
            while (true) {
                var randomView = RandomView(reels);
                for (var i = 0; i < slotHeight; i++) {
                    for (var j = 2; j < slotWidth; j++) {
                        newView[j + i * slotWidth] = randomView[j + i * slotWidth];
                    }
                }
                if (WinFromView(newView, bpl) == 0) {
                    break;
                }
            }
            for (var i = 0; i < tmpMoneyCache.table.length; i++) {
                newView[moneyPositions[i]] = moneySymbol;
            }
            var newMoneyCache = RandomMoneySymbols(newView);
            for (var i = 0; i < tmpMoneyCache.table.length; i++) {
                if (tmpMoneyCache.table[i] != "r") {
                    newMoneyCache.values[i] = tmpMoneyCache.values[i];
                }
            }
            var newCache = {
                view: newView,
                moneyCache: newMoneyCache
            }
            var newMoney = MoneyWinFromCache(newView, newMoneyCache, bpl);
            winMoney += newMoney;
            viewList.push(newCache);
        }

        if (winMoney > bottomLimit && winMoney <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    var result = {
        view: {
            viewList: viewList,
            boxSize: boxSize
        },
        win: winMoney
    }

    return result;
};

var RandomZeroView = function (reels, bpl) {
    var winMoney = 0, viewList = [];

    while (true) {
        viewList = [];
        //                                    
        boxSize = { width: 3, height: 3 };
        tmpView = RandomView(reels);
        if (isWildRespinView(tmpView)) {
            boxSize = RandomViewChangeSize(true);
            var randomView = RandomView(reels);
            for (var i = 0; i < slotHeight; i++) {
                for (var j = 2; j < slotWidth; j++) {
                    tmpView[j + i * slotWidth] = randomView[j + i * slotWidth];
                }
            }
            if (isCollectWin(tmpView)) {
                continue;
            }
        }

        var tmpMoneyCache = RandomMoneySymbols(tmpView);
        winMoney = WinFromView(tmpView, bpl);
        if (winMoney > 0) {
            continue;
        }
        var cache = {
            view: tmpView,
            moneyCache: tmpMoneyCache
        }
        viewList = [cache];

        if (isWildRespinView(tmpView)) {
            //                                     
            var moneyPositions = MoneySymbolPositions(tmpView);
            var newView = Util.clone(tmpView);
            while (true) {
                var randomView = RandomView(reels);
                for (var i = 0; i < slotHeight; i++) {
                    for (var j = 2; j < slotWidth; j++) {
                        newView[j + i * slotWidth] = randomView[j + i * slotWidth];
                    }
                }
                if (WinFromView(newView, bpl) == 0) {
                    break;
                }
            }
            for (var i = 0; i < tmpMoneyCache.table.length; i++) {
                newView[moneyPositions[i]] = moneySymbol;
            }
            var newMoneyCache = RandomMoneySymbols(newView);
            for (var i = 0; i < tmpMoneyCache.table.length; i++) {
                if (tmpMoneyCache.table[i] != "r") {
                    newMoneyCache.values[i] = tmpMoneyCache.values[i];
                }
            }
            var newCache = {
                view: newView,
                moneyCache: newMoneyCache
            }
            var newMoney = MoneyWinFromCache(newView, newMoneyCache, bpl);
            winMoney += newMoney;
            viewList.push(newCache);
        }

        if (winMoney == 0) {
            break;
        }
    }

    var result = {
        view: {
            viewList: viewList,
            boxSize: boxSize
        },
        win: winMoney
    }

    return result;
};

var RandomView = function (reels) {
    var randomView = [], resultView = [];

    while (true) {
        // randomView    4 * 6             , resultView                                    
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                randomView[viewPos] = reels[i][reelPos];
                resultView[viewPos] = empty;
            }
        }

        //                           
        for (var i = 0; i < 2; i++) {
            for (var j = 1; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                resultView[viewPos] = randomView[viewPos];
            }
        }
        //                    
        for (var i = 2; i < 2 + boxSize.width; i++) {
            for (var j = slotHeight - boxSize.height; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                resultView[viewPos] = randomView[viewPos];
            }
        }

        if (!isFreeSpinWin(resultView)) {
            break;
        }
    }

    return resultView;
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
        var emptyPos = [0, 1, 2, 3, 4, 5, 11, 17, 23];
        for (var i = 0; i < emptyPos.length; i++) {
            view[emptyPos[i]] = empty;
        }
        if (NumberOfScatters(view) == 0 && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    var reelsPos = [0, 1, 2, 3, 4];
    Util.shuffle(reelsPos);
    var nScatters = 3;

    // if (Util.probability(1)) {
    //     nScatters = 5;
    // } else if (Util.probability(30)) {
    //     nScatters = 4;
    // }

    for (var i = 0; i < nScatters; i++) {
        var reelNo = reelsPos[i];
        var pos = reelNo + Util.random(1, slotHeight) * slotWidth;
        view[pos] = scatter;
    }

    return view;
}

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
}

var BuyBonusViewCache = function (reels, bpl, fsLen, isBuy = false) {
    var freeSpinData = {};
    var freeSpinCacheList = [];
    var viewList = [];
    var freeSpinTotalWin = 0;
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var tmpView = [];

    while (true) {
        viewList = [];
        boxSize = { width: 4, height: (isBuy ? 4 : 3) };

        //                                                                                   .
        if (freeSpinIndex > freeSpinLength - 2) {
            while (true) {
                tmpView = RandomView(reels);
                if (!isWildRespinView(tmpView)) {
                    break;
                }
            }
        } else {
            tmpView = RandomView(reels);
        }

        if (isWildRespinView(tmpView)) {
            boxSize = RandomViewChangeSize(false);
            var randomView = RandomView(reels);
            for (var i = 0; i < slotHeight; i++) {
                for (var j = 2; j < slotWidth; j++) {
                    tmpView[j + i * slotWidth] = randomView[j + i * slotWidth];
                }
            }

        }

        var tmpMoneyCache = RandomMoneySymbols(tmpView, true);

        winMoney = WinFromView(tmpView, bpl);
        var cache = {
            view: tmpView,
            moneyCache: tmpMoneyCache
        }
        viewList = [cache];

        if (isWildRespinView(tmpView)) {
            var moneyPositions = MoneySymbolPositions(tmpView);
            var newView = Util.clone(tmpView);
            while (true) {
                var randomView = RandomView(reels);
                for (var i = 0; i < slotHeight; i++) {
                    for (var j = 2; j < slotWidth; j++) {
                        newView[j + i * slotWidth] = randomView[j + i * slotWidth];
                    }
                }
                if (WinFromView(newView, bpl) == 0) {
                    break;
                }
            }
            for (var i = 0; i < tmpMoneyCache.table.length; i++) {
                newView[moneyPositions[i]] = moneySymbol;
            }
            var newMoneyCache = RandomMoneySymbols(newView, isBuy);
            for (var i = 0; i < tmpMoneyCache.table.length; i++) {
                if (tmpMoneyCache.table[i] != "r" || (!isBuy && tmpMoneyCache.table[i] == "jp3")) {
                    newMoneyCache.values[i] = tmpMoneyCache.values[i];
                }
            }
            var newCache = {
                view: newView,
                moneyCache: newMoneyCache,
                boxSize: boxSize
            }
            var newMoney = MoneyWinFromCache(newView, newMoneyCache, bpl);
            winMoney += newMoney;
            viewList.push(newCache);
        }

        freeSpinCacheList.push(viewList);
        freeSpinTotalWin += winMoney;
        freeSpinIndex++;

        if (freeSpinIndex > freeSpinLength) {
            break;
        }
    }

    freeSpinData = {
        cache: freeSpinCacheList,
        win: freeSpinTotalWin
    }

    return freeSpinData;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }
    result[slotWidth - 1] = 20;
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
            if (moneyCache.table[i] == "jp3") {
                moneyWin += 25 * bpl;
            } else {
                moneyWin += moneyCache.values[i] * bpl;
            }
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
        return moneyWin
    }

    //                                      
    for (var i = 3; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r") {
            if (moneyCache.table[i] == "jp3") {
                moneyWin += 25 * bpl;
            } else {
                moneyWin += moneyCache.values[i] * bpl;
            }
        }
    }

    var hasMoney = false;
    //                                           ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 4];
        if (isMoneySymbol(reelSymbol)) {
            hasMoney = true;
            break;
        }
    }
    if (!hasMoney) {
        return moneyWin
    }

    //                                         
    for (var i = 4; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r") {
            if (moneyCache.table[i] == "jp3") {
                moneyWin += 25 * bpl;
            } else {
                moneyWin += moneyCache.values[i] * bpl;
            }
        }
    }

    var hasMoney = false;
    //                                           ?
    for (var i = 0; i < slotHeight; i++) {
        var reelSymbol = view[i * slotWidth + 5];
        if (isMoneySymbol(reelSymbol)) {
            hasMoney = true;
            break;
        }
    }
    if (!hasMoney) {
        return moneyWin
    }

    //                                         
    for (var i = 5; i < moneyCache.table.length; i += slotWidth) {
        if (moneyCache.table[i] != "r") {
            if (moneyCache.table[i] == "jp3") {
                moneyWin += 25 * bpl;
            } else {
                moneyWin += moneyCache.values[i] * bpl;
            }
        }
    }

    return moneyWin;
};

var isWildRespinView = function (view) {
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
    return hasWild;
};

var RandomViewChangeSize = function (isBaseSpin) {
    if (isBaseSpin) {
        // 3 * 3 * 4 * 4 * 4 * 4
        if (Util.probability(10)) {
            return {
                width: 4,
                height: 4,
            }
        } // 3 * 6
        else if (Util.probability(30)) {
            return {
                width: 4,
                height: 3,
            }
        } // 3 * 3 * 4 * 4 * 4
        else if (Util.probability(50)) {
            return {
                width: 3,
                height: 4,
            }
        }
        // 3 * 5
        return {
            width: 3,
            height: 3,
        }
    } else {
        // 3 * 3 * 4 * 4 * 4 * 4
        if (Util.probability(70)) {
            return {
                width: 4,
                height: 4,
            }
        }
        // 3 * 6
        return {
            width: 4,
            height: 3,
        }
    }
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    var num = NumberOfScatters(view);
    return num >= 3;
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

var FreeSpinCountsFromView = function (view) {
    switch (NumberOfScatters(view)) {
        case 3:
            return 10;
        case 4:
            return 15;
        case 5:
            return 50;
    }
    return 10;
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 5: return totalBet * 100;
        case 4: return totalBet * 10;
        case 3: return totalBet * 2;
    }
    return 0;
};

var FreeSpinCountsFromView = function (view) {
    switch (NumberOfScatters(view)) {
        case 3:
            return 10;
        case 4:
            return 15;
        case 5:
            return 50;
    }
    return 10;
}
var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
}
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
}


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

var MoneySymbolPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result.push(i);
        }
    }
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

var RandomMoneySymbols = function (view, isFreeSpin = false) {
    if (NumberOfMoneySymbols(view) == 0) {
        return {
            table: [],
            values: []
        };
    }

    var table = DefaultMoneyCache().moneyTable;
    var values = DefaultMoneyCache().moneyValues;


    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            var index = 0;
            index = Util.random(0, 3);
            if (isFreeSpin) {
                index = Util.random(0, 7);
            }

            values[i] = moneySymbolValues[index];
            // if (values[i] == 1250) {
            //     table[i] = "jp3";
            // }
            // if (values[i] == 6250) {
            //     table[i] = "jp2";
            // }
            // if (values[i] == 250000) {
            //     table[i] = "jp1";
            // }

            table[i] = "v";
        }
    }

    var result = {
        table: table,
        values: values
    }
    return result;
};

var winLines = [];
var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    for (var i = 0; i < slotHeight; i++) {
        var history = [-1, -1, -1, -1, -1, -1];
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
        winLines.push(`0~${winMoney}~${history.join('~')}`);
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
            winLines.push(`0~${money}~${lineResult.join('~')}`);
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
}

module.exports = SlotMachine;