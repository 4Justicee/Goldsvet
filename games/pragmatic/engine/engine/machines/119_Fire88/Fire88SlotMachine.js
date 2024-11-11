var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.respinStatus = "NORESPIN";
    this.prevRespinStatus == "NORESPIN";
    this.lineCount = 7;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.winSymbols = [];

    this.gsf_r = [];      //                              
    this.jackpotPositions = [];
    this.jackpotCache = [];
    this.jackpotLevel = 0;
    this.diamondCache = [];

    //                        
    this.respinIndex = 0;
    this.respinCacheList = [];
    this.respinWinMoney = 0;
    this.respinSticky = [];
    this.respinStickyPos = [];
    this.respinMask = [];

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];
};

var slotWidth = 3;
var slotHeight = 3;
var wild = 2;
var baseReels = [
    [3, 8, 7, 2, 6, 6, 6, 4, 4, 8, 8, 7, 8, 6, 5, 7, 8, 8, 8, 4, 7],
    [2, 4, 7, 5, 6, 4, 8, 6, 6, 7, 7, 6, 2, 5, 5, 7, 6, 8, 4, 7, 3, 6, 7, 7],
    [3, 4, 7, 5, 8, 3, 8, 8, 7, 2, 8, 6, 5, 5, 8, 5, 5, 8, 8, 3, 8, 6]
];
var noEightReels = [
    [8, 7, 2, 6, 6, 6, 4, 4, 8, 8, 7, 8, 6, 5, 7, 8, 8, 8, 4, 7],
    [2, 4, 7, 5, 6, 4, 8, 6, 6, 7, 7, 6, 2, 5, 5, 7, 6, 8, 4, 7, 6, 7, 7],
    [4, 7, 5, 8, 8, 8, 7, 2, 8, 6, 5, 5, 8, 5, 5, 8, 8, 8, 6]
];
//          ,                                                     .                                                  .
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 250, 100, 60, 30, 15, 6, 3]
];
var payLines = [
    [3, 4, 5],
    [0, 1, 2],
    [6, 7, 8],
    [6, 4, 2],
    [0, 4, 8],
    [3, 1, 5],
    [3, 7, 5]
];
var percentList = {
    superRespinPercent: 7,  //                                      
};
var jackpotSymbol = 3;
var jackpots = [888, 88, 38];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevRespinStatus = this.respinStatus;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.respinStatus == "RESPIN") {
        this.ReSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "RESPIN") {
        this.respinIndex = 1;
        this.respinCacheList = viewCache.view;
        this.view = this.respinCacheList[0].view;
        this.gsf_r = this.respinCacheList[0].gsf_r;
        this.respinSticky = GetStickyReels(this.view);
        this.respinStickyPos = GetStickyPos(this.respinSticky);
        this.respinWinMoney = 0;
        this.respinStatus = "RESPIN";
    }
    else {
        this.respinStickyPos = [];
        this.view = viewCache.view;
        this.gsf_r = viewCache.gsf_r;
    }

    if (viewCache.type == "BONUS") {
        this.jackpotLevel = 0;
        this.diamondCache = viewCache.cache;
        this.jackpotCache = [];
        this.jackpotCache[0] = JackpotFirstCache();
        this.currentGame = "BONUS";
    }

    this.jackpotPositions = JackpotPositionsFromView(this.view, this.gsf_r);

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    var { winLines, winSymbols } = WinLinesFromView(this.view, player.betPerLine); //                                        
    this.winLines = winLines;
    this.winSymbols = winSymbols;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (viewCache.type == "BONUS") {
        this.moneyBonusWin = this.winMoney;
    } else {
        this.respinWinMoney = this.winMoney;
    }
};

SlotMachine.prototype.ReSpin = function (player) {
    this.respinMask = this.respinCacheList[this.respinIndex].view;
    this.gsf_r = this.respinCacheList[this.respinIndex].gsf_r;

    this.view = GetFinalView(this.view, this.respinMask, this.respinSticky);
    this.jackpotPositions = JackpotPositionsFromView(this.view, this.gsf_r);

    this.winMoney += WinFromView(this.view, player.betPerLine);
    var { winLines, winSymbols } = WinLinesFromView(this.view, player.betPerLine); //                                        
    this.winLines = winLines;
    this.winSymbols = winSymbols;

    this.respinWinMoney = this.winMoney;
    this.respinStatus = "NORESPIN";
}

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    var select = param.ind;
    var index = this.jackpotLevel++;
    var status = this.jackpotCache[index].status;
    var wins_mask = this.jackpotCache[index].wins_mask;
    var wins = this.jackpotCache[index].wins;

    status[select] = this.jackpotLevel;
    wins_mask[select] = "pw";
    wins[select] = this.diamondCache[index];

    var jackpotObj = {
        status: status,
        wins_mask: wins_mask,
        wins: wins
    };

    this.jackpotCache.push(jackpotObj);

    if (this.jackpotLevel >= this.diamondCache.length) {
        //                    
        this.jackpotPositions = [];
        this.moneyBonusWin = JackpotMoneyFromCache(this.diamondCache, player.betPerLine);
        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winMoney += this.moneyBonusWin;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    //                            [      ] *                                                             ~~                 .
    this.totalBet = totalBet;
    this.betPerLine = bpl;

    if (baseWin > 0) {
        if (Util.probability(percentList.superRespinPercent))
            return this.SpinForRespinGen(baseReels, bpl, totalBet, baseWin);
        else
            tmpView = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }
    tmpWin = WinFromView(tmpView, bpl);

    var pattern = {
        view: tmpView,
        gsf_r: JackpotReelsFromView(tmpView, false),
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
        default: break;
    }
}

SlotMachine.prototype.SpinForRespinGen = function (reels, bpl, _totalBet, bsWin) {
    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin * 1.2;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var respinData = RespinViewCache(reels, bpl);

        if (respinData.win >= minMoney && respinData.win <= maxMoney) {
            return respinData;
        }

        if (respinData.win > lowerLimit && respinData.win < minMoney) {
            lowerLimit = respinData.win;
            lowerView = respinData.view;
        }
        if (respinData.win > maxMoney && respinData.win < upperLimit) {
            upperLimit = respinData.win;
            upperView = respinData.view;
        }
    }

    return {
        view: lowerView ? lowerView : upperView,
        win: lowerView ? lowerLimit : upperLimit,
        type: "RESPIN",
        bpl: bpl,
        isCall: 0
    };
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var jackpotView = RandomJackpotView(noEightReels, bpl);
    var jackpotWin = WinFromView(jackpotView, bpl);
    var diamondCache = JackpotRandomCache(totalBet, bsWin - jackpotWin);

    var pattern = {
        view: jackpotView,
        gsf_r: JackpotReelsFromView(jackpotView, true),
        bpl: bpl,
        cache: diamondCache,
        win: jackpotWin + JackpotMoneyFromCache(diamondCache, bpl),
        type: "BONUS",
        isCall: isCall ? 1 : 0,
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
        if (tmpWin > bottomLimit && tmpWin <= maxWin && !isRespinView(tmpView)) {
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
        if (tmpWin == 0 && !isRespinView(tmpView)) {
            break;
        }
    }
    return tmpView
};

var RandomView = function (reels, isJackpotGame = 0) {
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
    //                   
    var eightReels = [0, 1, 2];
    var nJackpots = 0;

    Util.shuffle(eightReels);
    if (!isJackpotGame && Util.probability(50)) {
        nJackpots = Util.random(0, 2);
    }

    for (var i = 0; i < nJackpots; i++) {
        var viewPos = eightReels[i] + Util.random(0, slotHeight) * slotWidth;
        view[viewPos] = jackpotSymbol;
    }
    return view;
};

var RespinViewCache = function (reels, bpl) {
    var tmpView = [];
    var tmpWin = 0;

    var stickyReels = [];
    var nsReelNo = Util.random(0, 3);

    while (true) {
        tmpView = RandomView(reels);

        if (NumberOfWilds(tmpView) == 0) {
            break;
        }
    }

    for (var i = 0; i < slotWidth; ++i) {
        if (i != nsReelNo) {
            tmpView[i + slotWidth * Util.random(0, slotHeight)] = wild;
        }
    }

    tmpWin = WinFromView(tmpView, bpl);

    stickyReels = GetStickyReels(tmpView);

    var viewList = [];
    var maskView = RandomView(reels);
    var finalView = GetFinalView(tmpView, maskView, stickyReels);

    tmpWin += WinFromView(finalView, bpl);

    viewList.push({
        view: tmpView,
        gsf_r: JackpotReelsFromView(tmpView, false)
    })
    viewList.push({
        view: maskView,
        gsf_r: JackpotReelsFromView(maskView, false)
    });

    return {
        view: viewList,
        win: tmpWin,
        bpl: bpl,
        type: "RESPIN",
        isCall: 0
    };
};

var RandomJackpotView = function (reels, bpl) {
    var view = [];

    while (true) {
        view = RandomView(reels, true);

        var count = 3;

        for (var i = 0; i < count; i++) {
            var viewPos = i + Util.random(0, slotHeight) * slotWidth;
            view[viewPos] = jackpotSymbol;
        }

        if (WinFromView(view, bpl) == 0)
            break;
    }

    return view;
};

var JackpotRandomCache = function (totalBet, targetMoney) {
    var targetJackpot = 38;

    for (var i = 0; i < jackpots.length; i++) {
        if (targetMoney >= totalBet * jackpots[i]) {
            targetJackpot = jackpots[i];
            break;
        }
    }

    //                              
    var diamondCache = [];
    for (var i = 0; i < jackpots.length; i++) {
        if (jackpots[i] == targetJackpot) {
            continue;
        }
        var count = Util.random(0, 3);
        for (var j = 0; j < count; j++) {
            diamondCache.push(jackpots[i]);
        }
    }
    for (var j = 0; j < 2; j++) {
        diamondCache.push(targetJackpot);
    }
    Util.shuffle(diamondCache);
    diamondCache.push(targetJackpot);
    return diamondCache;
};

var GetStickyReels = function (view) {
    var res = [];

    for (var i = 0; i < slotWidth; ++i) {
        var wildCount = 0;

        for (var j = 0; j < slotHeight; ++j) {
            if (isWild(view[i + j * slotWidth]))
                ++wildCount;
        }
        if (wildCount == 1)
            res.push(i);
    }

    return res;
};

var GetStickyPos = function (stickyReels) {
    var res = [];

    for (var i = 0; i < stickyReels.length; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = j * slotWidth + stickyReels[i];

            res.push(pos);
        }
    }

    return res;
};

var GetFinalView = function (view, maskView, stickyReels) {
    var tmpView = [...view];

    for (var i = 0; i < slotWidth; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = j * slotWidth + i;

            if (stickyReels.indexOf(i) < 0) {
                tmpView[pos] = maskView[pos];
            }
        }
    }

    return tmpView;
};

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
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

var getBaseSymbol = function (reelSymbols) {
    var symbol = wild;

    for (var i = 0; i < reelSymbols.length; i++) {
        if (isWild(reelSymbols[i])) {
            continue;
        }

        symbol = reelSymbols[i];
        break;
    }
    return symbol;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var winSymbols = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);

        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (_item, index, _arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
            winSymbols.push(getBaseSymbol(lineSymbols));
        }
    }
    return { winLines, winSymbols };
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var isRespinView = function (view) {
    var res = GetStickyReels(view);

    return res.length == 2;
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

var isWild = function (symbol) {
    return symbol == wild;
};

var isJackpotSymbol = function (symbol) {
    return symbol == jackpotSymbol;
};

var JackpotPositionsFromView = function (view, jackpotReels) {
    var jackpotPositions = [];

    for (var i = 0; i < jackpotReels.length; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = j * slotWidth + jackpotReels[i];

            if (isJackpotSymbol(view[pos])) {
                jackpotPositions.push(pos);
                break;
            }
        }
    }
    return jackpotPositions;
};

var JackpotReelsFromView = function (view, isJackpotGame) {
    var eightReels = [];
    var jackpotReels = [];

    for (var i = 0; i < slotWidth; ++i) {
        var hasSeven = 0;

        for (j = 0; j < slotHeight; ++j) {
            var pos = j * slotWidth + i;

            if (isJackpotSymbol(view[pos])) {
                hasSeven = 1;
                eightReels.push(i);
                break;
            }
        }

        // if (!hasSeven)
        //     noEightReels.push(i);
    }

    Util.random(eightReels);

    var randomCount = 0;
    var idx = 0;

    if (isJackpotGame)
        randomCount = 3;
    else
        randomCount = Util.random(0, 2);

    while (idx < randomCount && eightReels.length > 0) {
        jackpotReels.push(eightReels.shift());
        ++idx;
    }

    jackpotReels.sort();
    return jackpotReels;
};

var JackpotMoneyFromCache = function (cache, bpl) {
    var len = cache.length;
    return cache[len - 1] * bpl * payLines.length;
};

var JackpotFirstCache = function () {
    var status = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var wins_mask = ["h", "h", "h", "h", "h", "h", "h", "h", "h"];
    var wins = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    var firstJackpot = {
        status: status,
        wins_mask: wins_mask,
        wins: wins
    };

    return firstJackpot;
}

module.exports = SlotMachine;