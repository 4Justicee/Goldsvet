var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.lines = [];
    //                        
    this.respinIndex = 0;
    this.respinLength = 0;
    this.respinBeforeMoney = 0;
    this.respinWinMoney = 0;
    this.respinMask = [];           //            
    this.respinCacheList = [];
    this.respinCompass = {};         //                         ,             
    this.respinPrevWildList = [];
    this.respinNewWildList = [];
    this.respinStatus = "NORESPIN";
    this.prevRespinStatus = "NORESPIN";
    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];  //                                                         
}
var wild = 2
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [3, 3, 3, 9, 9, 9, 8, 8, 8, 4, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5, 7, 7, 7, 6, 6, 6, 5, 5, 5],
    [9, 9, 9, 8, 8, 3, 3, 7, 7, 7, 6, 6, 3, 3, 3, 8, 8, 8, 4, 4, 4, 6, 6, 6, 5, 5, 5, 6, 6, 6, 2],
    [9, 9, 8, 8, 8, 9, 9, 4, 4, 4, 9, 9, 7, 7, 9, 9, 5, 5, 9, 3, 3, 9, 9, 3, 3, 3, 9, 9, 9, 7, 7, 7, 5, 5, 5, 6, 6, 6, 7, 7, 7, 6, 6, 6, 2],
    [9, 9, 9, 8, 8, 9, 9, 9, 3, 3, 3, 8, 8, 3, 3, 3, 7, 7, 7, 6, 6, 8, 8, 9, 9, 9, 8, 8, 6, 6, 3, 3, 3, 8, 8, 8, 4, 4, 4, 6, 6, 6, 5, 5, 5, 6, 6, 6, 2],
    [9, 9, 9, 8, 8, 8, 3, 3, 3, 9, 9, 9, 8, 8, 8, 4, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5]
];
var respinReels = [
    [9, 9, 9, 8, 8, 8, 3, 3, 3, 9, 9, 9, 8, 8, 8, 4, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5, 2, 2, 2, 9, 9, 9],
    [9, 9, 9, 8, 8, 8, 3, 3, 3, 9, 9, 9, 8, 8, 8, 4, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5, 2, 2, 2, 9, 9, 9],
    [9, 9, 9, 8, 8, 8, 3, 3, 3, 9, 9, 9, 8, 8, 8, 4, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5, 2, 2, 2, 9, 9, 9],
    [9, 9, 9, 8, 8, 8, 3, 3, 3, 9, 9, 9, 8, 8, 8, 4, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5, 2, 2, 2, 9, 9, 9],
    [9, 9, 9, 8, 8, 8, 3, 3, 3, 9, 9, 9, 8, 8, 8, 4, 4, 4, 7, 7, 7, 6, 6, 6, 5, 5, 5, 2, 2, 2, 9, 9, 9]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 12, 6, 4, 2, 1, 1],
    [0, 0, 0, 60, 30, 12, 10, 4, 2, 2],
    [0, 0, 0, 150, 80, 30, 24, 20, 12, 12]
];
var payLines = [
    [5, 6, 7, 8, 9],  // 1
    [9, 8, 7, 6, 5],
    [0, 1, 2, 3, 4],  // 2
    [4, 3, 2, 1, 0],
    [10, 11, 12, 13, 14],  // 3
    [14, 13, 12, 11, 10],
    [5, 1, 2, 3, 9],  // 4
    [9, 3, 2, 1, 5],
    [5, 11, 12, 13, 9],  // 5
    [9, 13, 12, 11, 5],
    [10, 6, 2, 8, 14],  // 6
    [14, 8, 2, 6, 10],
    [0, 6, 12, 8, 4],  // 7
    [4, 8, 12, 6, 0],
    [10, 11, 7, 3, 4],  // 8
    [4, 3, 7, 11, 10],
    [0, 1, 7, 13, 14],  // 9
    [14, 13, 7, 1, 0],
    [10, 6, 7, 8, 4],  // 10
    [4, 8, 7, 6, 10],
];
var compassPosList = [1, 2, 3, 6, 7, 8, 11, 12, 13];
//dirList    compassPosList                   ~~~
var compassDirList = [
    ["e", "s", "se"],
    ["w", "s", "e"],
    ["w", "s", "sw"],
    ["e", "s", "n"],
    ["e", "w", "s", "n", "se", "sw", "ne", "nw"],
    ["w", "s", "n"],
    ["e", "n", "ne"],
    ["w", "e", "n"],
    ["w", "n", "nw"],
];
var stepInfo = {
    s: {
        h: 0,
        v: 1
    },
    n: {
        h: 0,
        v: -1
    },
    w: {
        h: -1,
        v: 0
    },
    e: {
        h: 1,
        v: 0
    },
    se: {
        h: 1,
        v: 1
    },
    sw: {
        h: -1,
        v: 1
    },
    ne: {
        h: 1,
        v: -1
    },
    nw: {
        h: -1,
        v: -1
    }
};
var percentList = {
    compassStackPercent: 34,        //                                                             
    respinAddPercent: 34,           //                                               
}

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 40; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevRespinStatus = this.respinStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.respinStatus == "RESPIN") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }

    if (viewCache.type == "BONUS") {
        this.respinCacheList = viewCache.view;
        this.respinMask = this.respinCacheList[0].mask;
        this.respinCompass = this.respinCacheList[0].comp;
        this.view = [...this.respinMask];
        this.respinPrevWildList = [];
        this.respinNewWildList = SetWildToView(this.view, this.respinCompass);
        this.respinIndex = 0;
        this.respinStatus = "RESPIN";
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.lines = WinLinesFromView(this.view, player.betPerLine); //                                    
    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.respinWinMoney = this.winMoney;
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.respinIndex++;
    this.respinMask = this.respinCacheList[this.respinIndex].mask;
    this.respinPrevWildList = GetWildList(this.view);

    if (this.respinIndex < this.respinCacheList.length - 1) {
        this.respinCompass = this.respinCacheList[this.respinIndex].comp;
        this.respinNewWildList = SetWildToView(this.view, this.respinCompass);
    } else {
        this.respinStatus = "NORESPIN";
        this.respinNewWildList = [];
    }
    MakeFinalView(this.view, this.respinMask);

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.lines = WinLinesFromView(this.view, player.betPerLine); //                                    
    this.virtualReels = {
        above: RandomLineFromReels(respinReels),
        below: RandomLineFromReels(respinReels)
    };

    this.respinWinMoney += this.winMoney;
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    //                            [      ] *                                                             ~~                 .

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
    }
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var rsCache = RandomBonusViewCache(respinReels, bpl, bsWin);

    var pattern = {
        view: rsCache.cache,
        bpl: bpl,
        win: rsCache.win,
        type: "BONUS",
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

        if (!HasWild(view)) {
            break;
        }
    }
    return view;
};
///                            ,           n                    
var RandomBonusViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var respinData = {};
        var respinCacheList = [];
        var respinTotalWin = 0;
        var respinCompass = {};         //                         ,             ,                              GetFinalView             ...
        var respinIndex = 0;
        var tmpMask = [];
        var tmpView = [];

        while (true) {

            if (!Util.probability(percentList.respinAddPercent)) {
                break;
            }

            tmpMask = RandomView(reels);
            if (!respinIndex) {           //                                
                tmpView = [...tmpMask];
            }
            respinCompass = RandomCompassFromView(tmpView);
            tmpMask[respinCompass.pos] = wild;

            SetWildToView(tmpView, respinCompass);          //                                                
            MakeFinalView(tmpView, tmpMask);               //                                               
            respinTotalWin += WinFromView(tmpView, bpl);

            var cache = {
                mask: tmpMask,
                comp: respinCompass,
            }

            respinCacheList.push(cache);

            ++respinIndex;
        }

        tmpMask = RandomView(reels);            //                   
        MakeFinalView(tmpView, tmpMask);
        respinTotalWin += WinFromView(tmpView, bpl);

        respinCacheList.push({
            mask: tmpMask,
            comp: null
        });

        respinData = {
            cache: respinCacheList,
            win: respinTotalWin
        };
        if (respinData.win >= minMoney && respinData.win <= maxMoney) {
            return respinData;
        }

        if (respinData.win > lowerLimit && respinData.win < minMoney) {
            lowerLimit = respinData.win;
            lowerView = respinData;
        }
        if (respinData.win > maxMoney && respinData.win < upperLimit) {
            upperLimit = respinData.win;
            upperView = respinData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var RandomCompassFromView = function (view) {
    var compassPos = 0;
    var compassDir = "";
    var arrIdx;

    while (true) {
        arrIdx = Util.random(0, compassPosList.length);
        compassPos = compassPosList[arrIdx];

        if (isWild(view[compassPos])) {
            if (Util.probability(percentList.compassStackPercent))
                break;
        } else {
            break;
        }
    }

    compassDir = compassDirList[arrIdx][Util.random(0, compassDirList[arrIdx].length)];

    return {
        pos: compassPos,
        dir: compassDir
    }
};

var MultiFromLine = function (lineSymbols) {
    var multi = 1;

    for (var i = 0; i < lineSymbols.length; ++i) {
        if (isWild(lineSymbols[i]))
            multi *= Math.floor(lineSymbols[i] / 100);
    }

    return multi;
};

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]); //lineSymbols:                                    
        var linePay = WinFromLine(lineSymbols, bpl) * MultiFromLine(lineSymbols);
        money += linePay;
    }
    return money;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var multiLineIds = [];
    var multiLineVals = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var multi = MultiFromLine(lineSymbols);
        var money = WinFromLine(lineSymbols, bpl) * multi;
        var rLineId = lineId / 2;   //                      

        if (money > 0) {
            winLines.push(
                `${rLineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
        if (multi == 0) {
            console.log("BUG");
        }
        if (multi > 1 && multiLineIds.indexOf(rLineId) < 0) {
            multiLineIds.push(rLineId);
            multiLineVals.push(multi);
        }
    }
    return {
        winLines: winLines,
        multiLines: {
            ids: multiLineIds,
            vals: multiLineVals
        }
    };
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
}
//
var SetWildToView = function (view, comp) {    //      ,                      ,          
    var step = stepInfo[comp.dir];
    var i = comp.pos % slotWidth;
    var j = Math.floor(comp.pos / slotWidth);
    var newWildPos = [];

    while (true) {
        var pos = i + j * slotWidth;

        newWildPos.push(pos);
        if (isWild(view[pos])) {
            view[pos] += 100;       //                                  
        } else {
            view[pos] = wild + 100; //                                     
        }

        i += step.h, j += step.v;

        if (i >= 4 || j >= slotHeight || i < 1 || j < 0)
            break;
    }

    return newWildPos;
}
//
var MakeFinalView = function (preView, maskView) {
    for (var i = 0; i < preView.length; ++i) {
        if (!isWild(preView[i])) {
            preView[i] = maskView[i];
        }
    }
}
//
var GetWildList = function (view) {
    var res = [];

    for (var i = 0; i < view.length; ++i) {
        if (isWild(view[i])) {
            res.push(i);
        }
    }

    return res;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var isWild = function (symbol) {
    return symbol % 100 == wild;
};

var HasWild = function (view) {
    if (view.indexOf(wild) < 0) {
        return 0;
    }

    return 1;
}

module.exports = SlotMachine;