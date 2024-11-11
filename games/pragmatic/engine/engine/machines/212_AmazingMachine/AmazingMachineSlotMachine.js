var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.isView = [];

    this.wildSrf = "";

    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};

    //                   
    this.jackPotList = [];
    this.jackPotIndex = 0;
    this.isJackPot = false;
    this.status = [];
    this.winMask = [];
    this.wins = [];
    this.moneyBonusWin = 0;
    this.jackPotVal = 0;
    //                              
    this.moneyBonusLength = 0;
    this.totalBonusLength = 0;
    this.moneyBonusCacheList = [];
    this.moneyBonusCache = {};
    this.bonusIndex = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS", "JACKPOT"]; // "BONUS"
};

var scatter = 1;
var wild = 2;
var moneySymbol = 15;
var slotWidth = 5;
var slotHeight = 5;
var empty = 19;
var baseReels = [
    [12, 11, 2, 8, 6, 15, 4, 3, 5, 2, 10, 9, 13, 7, 8, 2, 11, 7, 3, 2],
    [11, 9, 2, 7, 8, 13, 6, 1, 3, 12, 15, 10, 5, 4, 8, 4, 8, 6, 9, 13, 2, 15, 7, 12, 13, 6, 5, 7, 3, 9, 8, 10, 2, 9, 13, 7, 8, 5, 8, 2, 13, 10, 15, 13],
    [15, 15, 15, 13, 8, 3, 15, 10, 12, 6, 4, 1, 5, 9, 11, 7, 6, 4, 3, 12, 10, 11, 3, 2, 13, 3, 11, 10, 9, 10, 3, 13, 5, 10, 3, 6, 1, 11, 13, 12, 6, 9, 2, 10, 3, 3, 5, 8, 11, 13, 11, 13, 12],
    [13, 1, 9, 15, 4, 7, 3, 12, 6, 10, 4, 11, 5, 2, 8, 10, 11, 1, 15, 2, 10, 1, 10, 10, 5, 10, 9, 2, 9, 5, 10, 10, 1, 5, 1, 8, 9, 2, 5, 1, 5, 10, 5, 10, 5, 10, 6, 5, 10, 9, 5, 8, 10, 8, 2, 5, 10, 11, 11, 11, 12, 5, 11, 5, 2, 15, 10, 5, 5, 10, 15, 10, 2, 5, 8, 12, 10, 15, 5, 5, 2, 5, 8, 1, 11, 8, 7, 8, 10, 5, 10, 2, 15, 7, 1, 10, 5, 8, 10, 11, 2, 10, 15, 5, 10, 5, 1, 12, 1, 5, 9, 5, 2, 1, 12, 10, 11, 15, 1, 9, 7, 11, 8, 2, 11, 8, 15, 10, 8, 5, 11, 10, 10, 5, 2, 8, 9, 8, 5, 10, 8, 12, 12, 9, 1, 9, 8, 5, 2, 11, 1, 8, 10, 5, 15, 1],
    [13, 4, 2, 9, 15, 12, 8, 6, 11, 7, 5, 10, 3, 10, 2, 9, 11, 11, 11]
];
var bonusReels = [
    [13, 9, 6, 5, 7, 10, 15, 4, 12, 11, 8, 3, 4],
    [5, 6, 8, 4, 7, 10, 12, 9, 15, 11, 3, 13, 15, 10, 9, 3, 9, 5, 11, 3, 13, 15, 13, 15, 10, 15, 10, 9, 5, 10, 3, 15, 5, 10, 5, 4, 12, 13],
    [3, 8, 4, 5, 7, 10, 12, 15, 11, 13, 6, 9, 11, 9, 9, 10, 11, 9, 15, 7, 6, 9, 9],
    [13, 4, 9, 5, 12, 3, 15, 8, 7, 10, 6, 11, 9, 9, 15, 6, 15, 7, 10, 5, 15, 7, 5, 15, 15, 7, 9, 5, 15, 4],
    [8, 3, 7, 6, 12, 5, 13, 10, 4, 9, 15, 11, 10, 9, 11]
];
var respinReels = [
    [13, 9, 6, 5, 7, 10, 4, 12, 11, 8, 3, 4],
    [5, 6, 8, 4, 7, 10, 12, 9, 11, 3, 13, 10, 9, 3, 9, 5, 11, 3, 13, 13, 10, 10, 9, 5, 10, 3, 5, 10, 5, 4, 12, 13],
    [3, 8, 4, 5, 7, 10, 12, 11, 13, 6, 9, 11, 9, 9, 10, 11, 9, 7, 6, 9, 9],
    [13, 4, 9, 5, 12, 3, 8, 7, 10, 6, 11, 9, 9, 6, 7, 10, 5, 7, 5, 7, 9, 5, 4],
    [8, 3, 7, 6, 12, 5, 13, 10, 4, 9, 11, 10, 9, 11]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 15, 10, 10, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 50, 30, 30, 20, 20, 15, 15, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 150, 100, 100, 50, 50, 40, 40, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0]
];
var payLines = [
    [15, 16, 17, 18, 19],
    [10, 11, 12, 13, 14],
    [20, 21, 22, 23, 24],
    [10, 16, 22, 18, 14],
    [20, 16, 12, 18, 24],
    [15, 11, 12, 13, 19],
    [15, 21, 22, 23, 19],
    [20, 21, 17, 13, 14],
    [10, 11, 17, 23, 24],
    [20, 16, 17, 18, 14]
];
var moneySymbolValues = [20, 25, 40, 50, 75, 100, 125, 150, 200, 250, 500, 800, 1000, 1500, 2000, 2500, 4000, 5000];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "BONUS") {
        this.FreeSpin(player);
        return;
    }

    if (this.currentGame == "JACKPOT") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        if (cache.isView.length > 0) {
            this.isView = cache.isView;
        }
        this.view = cache.view
        this.moneyCache = cache.moneyCache;
    } else if (viewCache.type == "BONUS") {
        this.moneyBonusCacheList = viewCache.view;
        var firstCache = this.moneyBonusCacheList[0];
        this.view = firstCache.view;
        this.moneyCache = firstCache.moneyCache;
    } else if (viewCache.type == "JACKPOT") {
        this.view = viewCache.view;
        this.jackPotList = viewCache.jack;
        this.isJackPot = true;
    }

    //                               
    if (this.isView.length > 0) {
        this.wildSrf = GetWildPosFromView(this.view);
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (isBonusSymbolWin(this.view)) {
        this.bonusIndex = 1;
        this.moneyBonusLength = NumberOfBonus(this.view);
        this.totalBonusLength = NumberOfBonus(this.moneyBonusCacheList[this.moneyBonusCacheList.length - 1].view)
        var finalRes = GetFinalBonusResult(this.view, this.view, this.moneyCache);
        this.bonusCache = finalRes;
        this.currentGame = "BONUS";
    }

    if (this.isJackPot) {
        this.jackPotIndex = 1;
        this.currentGame = "JACKPOT";
        this.moneyBonusWin = this.winMoney;

        this.status = [];
        this.winMask = [];
        this.wins = [];

        for (var i = 0; i < 12; i++) {
            this.status.push(0);
            this.winMask.push("h");
            this.wins.push(0);
        }
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.gameSort = this.currentGame;
    var cache = this.moneyBonusCacheList[this.bonusIndex];

    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    if (this.bonusIndex >= this.totalBonusLength) {
        var finalRes = GetFinalBonusResult(this.moneyBonusCacheList[this.bonusIndex - 1].view, this.view, this.moneyCache, true);
    } else {
        var finalRes = GetFinalBonusResult(this.moneyBonusCacheList[this.bonusIndex - 1].view, this.view, this.moneyCache);
    }

    this.moneyBonusLength += finalRes.rs_more;

    this.bonusCache = finalRes;

    this.view = finalRes.view;

    this.bonusIndex++;

    this.winMoney = 0;

    if (this.bonusIndex > this.moneyBonusLength) {
        this.bonusWinmoney = WinFromBonusView(this.moneyCache.values, player.betPerLine);
        this.winMoney = this.bonusWinmoney;
        this.moneyBonusWin = this.winMoney;
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var select = param.ind;

    this.status[select] = this.jackPotIndex;
    this.winMask[select] = "pw";
    this.wins[select] = this.jackPotList[this.jackPotIndex - 1];

    var jackPotValue = GetJackPotValue(this.jackPotList);
    this.jackPotVal = jackPotValue;

    var counter = 0;
    for (var i = 0; i < this.wins.length; i++) {
        if (this.wins[i] == this.jackPotVal) {
            counter++;
        }
    }

    var endJackPot = false;
    if (counter == 3) {
        endJackPot = true;
    } else {
        this.jackPotIndex++;
    }

    if (this.jackPotIndex > 6 || endJackPot) {
        this.moneyBonusWin += player.betPerLine * this.lineCount * jackPotValue;
        this.winMoney = this.moneyBonusWin;
        this.currentGame = "BASE";
        this.isJackPot = false;
    }
}

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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        case "JACKPOT":
            return this.SpinForJackpotGen(bpl, totalBet, jpWin, isCall);
        default:
            return;
    }
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, fsWin, isCall = false) {
    var moneyBonusCache = RandomBonusViewCache(bonusReels, bpl, fsWin);

    var pattern = {
        view: moneyBonusCache.cache,
        bpl: bpl,
        win: moneyBonusCache.win,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForJackpotGen = function (bpl, totalBet, bsWin, isCall = false) {
    var view = GeneJackPotView(baseReels, bpl);
    // 25                                   
    if (bpl * this.lineCount * 5000 <= bsWin) {
        var jackPotList = [500, 25, 5000, 500, 5000, 5000];
        jackPotList = Util.shuffle(jackPotList);

        // 5000                            
        var pattern = {
            view: view,
            jack: jackPotList,
            bpl: bpl,
            win: bpl * this.lineCount * 5000,
            type: "JACKPOT",
            comment: '      ',
            isCall: isCall ? 1 : 0,
        };

        return pattern;
    } else if (bpl * this.lineCount * 500 <= bsWin && bsWin < bpl * this.lineCount * 5000) {
        var jackPotList = [500, 25, 500, 500, 5000, 50];
        jackPotList = Util.shuffle(jackPotList);

        // 500                            
        var pattern = {
            view: view,
            jack: jackPotList,
            bpl: bpl,
            win: bpl * this.lineCount * 500,
            type: "JACKPOT",
            comment: '      ',
            isCall: isCall ? 1 : 0,
        };

        return pattern;
    } else if (bpl * this.lineCount * 25 <= bsWin && bsWin < bpl * this.lineCount * 50) {
        var jackPotList = [25, 25, 25, 500, 5000, 50];
        jackPotList = Util.shuffle(jackPotList);

        // 25                            
        var pattern = {
            view: view,
            jack: jackPotList,
            bpl: bpl,
            win: bpl * this.lineCount * 25,
            type: "JACKPOT",
            comment: '      ',
            isCall: isCall ? 1 : 0,
        };

        return pattern;
    } else if (bpl * this.lineCount * 50 <= bsWin && bsWin < bpl * this.lineCount * 500) {
        var jackPotList = [50, 50, 25, 500, 25, 50];
        jackPotList = Util.shuffle(jackPotList);

        // 50             
        var pattern = {
            view: view,
            jack: jackPotList,
            bpl: bpl,
            win: bpl * this.lineCount * 50,
            type: "JACKPOT",
            comment: '      ',
            isCall: isCall ? 1 : 0,
        };

        return pattern;
    } else {
        var jackPotList = [25, 25, 25, 500, 5000, 50];
        jackPotList = Util.shuffle(jackPotList);

        // 25                            
        var pattern = {
            view: view,
            jack: jackPotList,
            bpl: bpl,
            win: bpl * this.lineCount * 25,
            type: "JACKPOT",
            comment: '      ',
            isCall: isCall ? 1 : 0,
        };

        return pattern;
    }
}

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, wildView = [], isView = [];
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);

        //                         
        if (Util.probability(10)) {
            isView = [...tmpView];

            var wildNum = Util.random(2, 5);
            var wildPos = [];

            for (var i = 0; i < wildNum; i++) {
                while (true) {
                    var pos = Util.random(10, 25);
                    if (wildPos.indexOf(pos) == -1) {
                        wildPos.push(pos);
                        break;
                    }
                }
            }

            for (var i = 0; i < wildPos.length; i++) {
                tmpView[wildPos[i]] = 20;
                isView[wildPos[i]] = 2;
            }
        }

        tmpWin = WinFromView(tmpView, bpl);

        var tmpMoneyCache = RandomMoneySymbols(tmpView);

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            var cache = {
                isView: isView,
                view: tmpView,
                moneyCache: tmpMoneyCache
            }

            var result = {
                view: cache,
                win: tmpWin
            }

            return result;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;
    var tmpMoneyCache = {};

    while (true) {
        tmpView = RandomView(reels);
        var tmpMoneyCache = RandomMoneySymbols(tmpView);
        tmpWin = WinFromView(tmpView, bpl);

        if (tmpWin == 0) {
            var cache = {
                isView: [],
                view: tmpView,
                moneyCache: tmpMoneyCache
            }

            return {
                view: cache,
                win: tmpWin
            };
        }
    }
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
        // 3*5                                                 
        // if (Util.probability(5)) {
        //     var topLimit = 0; // 5 * 5          
        // }else{
        var topLimit = 10; // 3 * 5          
        // }

        for (var i = 0; i < topLimit; i++) {
            view[i] = empty;
        }
        if (!isBonusSymbolWin(view) && isJackpotView(view) == false) {
            break;
        }
    }

    return view;
};

var RandomBonusView = function (reels, bpl) {
    var bonusView = [], bonusViewList = [];
    var boxSize = Util.random(3, 6);

    //                
    while (true) {
        bonusView = RandomBonusGenView(reels, boxSize);
        var moneyBonusCache = RandomMoneySymbols(bonusView);
        if (isBonusSymbolWin(bonusView) && WinFromView(bonusView, bpl) == 0) {
            break;
        }
    }

    var bonusObj = {
        view: bonusView,
        moneyCache: moneyBonusCache
    }

    bonusViewList = [bonusObj];

    var bonusLength = NumberOfBonus(bonusView);
    var bonusIndex = 1;

    while (true) {
        var addBonusNum = 0;
        if (Util.probability(20)) {
            addBonusNum = Util.random(1, 2);
            bonusLength += addBonusNum;
        }

        var cache = AddMoneyBonusCache(bonusViewList[bonusViewList.length - 1], addBonusNum, boxSize, bonusView);
        bonusView = [...cache.view]; //                                       

        var newBObj = {
            view: [...bonusView],
            moneyCache: cache.cache
        }

        bonusViewList.push(newBObj);

        bonusIndex++;
        if (bonusIndex > bonusLength) {
            break;
        }
    }

    return bonusViewList;
};

var RandomBonusViewCache = function (reels, bpl, bsWin) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var moneyBonusSpinCache = {};
        var bonusSpinWinMoney = 0;
        var bonusSpinCacheList = [];

        bonusSpinCacheList = RandomBonusView(reels, bpl);

        //                                                             .
        var lastBonus = bonusSpinCacheList[bonusSpinCacheList.length - 1].moneyCache.values;
        bonusSpinWinMoney = WinFromBonusView(lastBonus, bpl);

        moneyBonusSpinCache = {
            cache: bonusSpinCacheList,
            win: bonusSpinWinMoney
        }

        //                                    
        if (moneyBonusSpinCache.win >= minMoney && moneyBonusSpinCache.win <= maxMoney) {
            return moneyBonusSpinCache;
        }

        if (moneyBonusSpinCache.win > lowerLimit && moneyBonusSpinCache.win < minMoney) {
            lowerLimit = moneyBonusSpinCache.win;
            lowerView = moneyBonusSpinCache;
        }
        if (moneyBonusSpinCache.win > maxMoney && moneyBonusSpinCache.win < upperLimit) {
            upperLimit = moneyBonusSpinCache.win;
            upperView = moneyBonusSpinCache;
        }

    }

    return lowerView ? lowerView : upperView;
};

var RandomBonusGenView = function (reels, boxSize) {
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

    var emptyArray = 0;
    if (boxSize == 3) {
        emptyArray = 10;
    } else if (boxSize == 4) {
        emptyArray = 5;
    } else if (boxSize == 5) {
        emptyArray = 0;
    }

    for (var i = 0; i < emptyArray; i++) {
        view[i] = empty;
    }

    return view;
};

var AddMoneyBonusCache = function (moneyCache, addNum, boxSize, bonusView) {
    var resultView = Util.clone(bonusView);
    var resultMoneyCache = moneyCache.moneyCache;
    var moneyPos = [], newMoneyPos = [];

    for (var i = 0; i < resultMoneyCache.values.length; i++) {
        if (resultMoneyCache.values[i] != 0) {
            moneyPos.push(i);
        }
    }

    //                                          
    for (var i = 0; i < addNum; i++) {
        while (true) {
            if (boxSize == 3) {
                var pos = Util.random(10, 25);
            } else if (boxSize == 4) {
                var pos = Util.random(5, 25);
            } else if (boxSize == 5) {
                var pos = Util.random(0, 25);
            }

            if (moneyPos.indexOf(pos) == -1) {
                resultView[pos] = 15;
                newMoneyPos.push(pos);
                moneyPos.push(pos);
                break;
            }
        }
    }

    //                                           
    for (var i = 0; i < newMoneyPos.length; i++) {
        resultMoneyCache.values[newMoneyPos[i]] = moneySymbolValues[Util.random(2, 10)];
        resultMoneyCache.table[newMoneyPos[i]] = "v";
    }

    return {
        view: resultView,
        cache: resultMoneyCache
    };
}

var GetFinalBonusResult = function (preView, view, moneyCache, isEnd = false) {
    var preView = Util.clone(preView);
    var resView = Util.clone(view);
    var newsrf = [],
        styStr = [],
        wildPos = [],
        isView = [],
        rs_more = 0,
        bonusWinmoney = 0;


    for (var i = 0; i < resView.length; i++) {
        if (preView[i] != resView[i]) {
            newsrf.push(`15~15~${i}`);
            rs_more++;
        }
        if (resView[i] == 15) {
            bonusWinmoney += moneyCache.values[i];
            if (isEnd) {
                wildPos.push(i);
                styStr.push([i, -1]);
            } else {
                styStr.push([i, i]);
            }
        }
    }

    var isView = RandomBonusGenView(respinReels, 0);
    var newView = [...isView];
    for (var i = 0; i < resView.length; i++) {
        if (resView[i] == moneySymbol) {
            newView[i] = moneySymbol;
        }
        if (resView[i] == empty) {
            newView[i] = empty;
        }
    }

    return {
        isView: isView,
        view: newView,
        wildPos: wildPos,
        rs_more: rs_more,
        srf: newsrf.join(";"),
        sty: styStr.join("~"),
        pw: bonusWinmoney
    }
};

var WinFromBonusView = function (values, bpl) {
    var win = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] != 0) {
            win += values[i];
        }
    }

    return win * bpl;
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
                index = Util.random(0, 5);
                //                        1                    
                if (Util.probability(1)) {
                    index = Util.random(0, moneySymbolValues.length);
                } else if (Util.probability(10)) {
                    index = Util.random(0, moneySymbolValues.length - 3);
                }
            }

            values[i] = moneySymbolValues[index];
            if (values[i] == 1250) {
                table[i] = "jp3";
            }
            if (values[i] == 6250) {
                table[i] = "jp2";
            }
            if (values[i] == 250000) {
                table[i] = "jp1";
            }

            table[i] = "v";
        }
    }

    var result = {
        table: table,
        values: values
    }
    return result;
}

var GetWildPosFromView = function (view) {
    var wildPos = [];

    for (var i = 0; i < view.length; i++) {
        if (view[i] == 20) {
            wildPos.push(`2~20~${i}`)
        }
    }

    return wildPos.join(';')
};

var GetJackPotValue = function (list) {
    var counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i] == 25) {
            counter1++;
        }
        if (list[i] == 50) {
            counter2++;
        }
        if (list[i] == 500) {
            counter3++;
        }
        if (list[i] == 5000) {
            counter4++;
        }
    }

    if (counter1 == 3) {
        return 25;
    } else if (counter2 == 3) {
        return 50;
    } else if (counter3 == 3) {
        return 500;
    } else if (counter4 == 3) {
        return 5000;
    }
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
    return symbol == wild || symbol == 20;
};

var isBonusSymbolWin = function (view) {
    var bonusSymbolNum = NumberOfBonus(view);
    if (bonusSymbolNum >= 5) {
        return true;
    } else {
        return false;
    }
};

var isJackpotView = function (view) {
    var bonusSymbolNum = NumberOfScatter(view);
    if (bonusSymbolNum >= 3) {
        return true;
    } else {
        return false;
    }
};

var NumberOfBonus = function (view) {
    var bonusNum = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == moneySymbol) {
            bonusNum++;
        }
    }
    return bonusNum;
};

var GeneJackPotView = function (reels, bpl) {
    while (true) {
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
        // 3*5                                                 
        // if (Util.probability(5)) {
        //     var topLimit = 0; // 5 * 5          
        // }else{
        var topLimit = 10; // 3 * 5          
        // }

        for (var i = 0; i < topLimit; i++) {
            view[i] = empty;
        }

        var counter = NumberOfScatter(view);
        if (counter == 3 && WinFromView(view, bpl) == 0) {
            break;
        }
    }

    return view;
};

var NumberOfScatter = function (view) {
    var counter = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == scatter) {
            counter++;
        }
    }
    return counter;
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

module.exports = SlotMachine;