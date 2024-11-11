var Util = require('../../../utils/slot_utils');

function SlotMachine() {
      //                 
      this.spinIndex = 0;
      this.currentGame = "BASE";
      this.gameSort = "BASE";
      this.lineCount = 15;
      //                                 
      this.view = [];
      this.virtualReels = {};
      this.winMoney = 0;
      this.winLines = [];
      this.scatterPosition = [];
      this.scatterWin = 0;
    
      this.gsf_r = [];      //                              
      this.jackpotPositions = [];
      this.jackpotCache = [];
      this.jackpotLevel = 0;
      this.diamondCache = [];
  
      //                           
      this.freeSpinIndex = 0;
      this.freeSpinLength = 0;
      this.freeSpinWinMoney = 0;
      this.freeSpinCacheList = [];
      this.isFreeSpinAdd = 0;

      this.patternCount = 2000;  //                  
      this.lowLimit = 10;   //                         
      this.prevBalance = 0; //                       (                         )
      this.bonusBuyMoney = 0; //                                               (                                  )

      this.betPerLine = 0;
      this.totalBet = 0;
      this.jackpotType = ["FREE", "BONUS"];
};

var slotWidth = 5;
var slotHeight = 3;
var scatter = 1;
var wild = 2;
var baseReels = [
    [6, 5, 7, 8, 6, 2, 2, 2, 7, 3, 1, 4, 7, 8, 4, 7, 2, 1, 2, 7, 6, 6, 7, 6, 4, 6],
    [6, 8, 4, 8, 5, 5, 3, 8, 2, 2, 8, 8, 8, 5, 4, 5, 8, 4, 6, 8, 5, 4, 5, 2, 2, 2, 7],
    [7, 3, 6, 1, 5, 2, 2, 2, 8, 5, 6, 5, 2, 2, 5, 4, 5, 5, 7, 1],
    [6, 4, 3, 6, 8, 4, 7, 6, 5, 6, 2, 2, 2, 7, 5, 8, 6, 7, 6, 4, 6, 8, 4, 2],
    [4, 5, 6, 5, 6, 4, 5, 1, 7, 5, 2, 2, 2, 7, 5, 7, 5, 8, 7, 1, 4, 5, 6, 7, 5, 7, 7, 5, 7, 3, 5, 4, 7, 4, 5, 7]
];
var noSevenReels = [
    [6, 5, 7, 8, 6, 2, 2, 2, 7, 6, 5, 4, 7, 8, 4, 7, 2, 2, 2, 7, 6, 5, 6, 7, 6, 4, 6],
    [6, 8, 4, 8, 5, 5, 5, 8, 2, 2, 8, 4, 8, 8, 5, 4, 5, 8, 4, 6, 8, 7, 5, 4, 5, 2, 2, 2, 7],
    [7, 4, 6, 5, 2, 2, 2, 8, 5, 6, 5, 2, 2, 5, 4, 5, 5, 7, 8],
    [6, 4, 5, 6, 8, 4, 7, 6, 5, 6, 2, 2, 2, 7, 5, 8, 6, 7, 6, 4, 6, 8, 4, 2],
    [4, 5, 6, 5, 6, 4, 5, 8, 7, 5, 2, 2, 2, 7, 5, 7, 6, 5, 8, 7, 4, 5, 6, 2, 2, 2, 2, 7, 5, 7, 4, 7, 5, 7, 6, 5, 4, 7, 4, 5, 7]
];
var freeReels = [
    [4, 8, 2, 2, 2, 7, 6, 2, 2, 4, 6, 1, 4, 6, 2, 2, 2, 7, 4, 5, 7, 8, 5, 7, 4, 6, 8, 2, 2, 5],
    [3, 4, 6, 4, 8, 5, 2, 2, 6, 4, 4, 5, 2, 2, 2, 6, 7, 8, 4, 8, 5, 2, 2, 2],
    [7, 2, 2, 6, 4, 1, 6, 2, 2, 2, 3, 4, 5, 4, 5, 8, 7, 2, 2, 2, 4, 5, 6, 8],
    [8, 6, 6, 4, 2, 2, 2, 4, 8, 4, 5, 7, 6, 2, 2, 5, 5, 8, 6, 4, 7],
    [8, 6, 2, 2, 2, 5, 4, 8, 7, 4, 2, 2, 1, 2, 5, 4, 7, 4, 2, 2, 5, 6, 8, 7, 8, 2, 2, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 20, 10, 10, 5, 5, 5, 5],
    [0, 0, 60, 20, 20, 10, 10, 10, 10],
    [0, 0, 300, 200, 100, 40, 40, 40, 40]
];
var payLines = [
    [5, 6, 7, 8, 9],  // 1
    [0, 1, 2, 3, 4],  // 2
    [10, 11, 12, 13, 14],  // 3
    [0, 6, 12, 8, 4],  // 4
    [10, 6, 2, 8, 14],  // 5
    [5, 1, 2, 3, 9],  // 6
    [5, 11, 12, 13, 9],  // 7
    [0, 1, 7, 13, 14],  // 8
    [10, 11, 7, 3, 4],  // 9
    [5, 11, 7, 3, 9],  // 10
    [5, 1, 7, 13, 9],  // 11
    [0, 6, 7, 8, 4],  // 12
    [10, 6, 7, 8, 14],  // 13
    [0, 6, 2, 8, 4],  // 14
    [10, 6, 12, 8, 14],  // 15
];
var percentList = {
    freeWinPercent: 50,
    freeRespinPercent: 0
};

var jackpotSymbol = 3;
var jackpots = [1000, 100, 30, 10];
var freeSpinCount = 8;

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
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

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        
        this.freeSpinLength = freeSpinCount;
        this.isFreeSpinAdd = 0;
        this.view = this.freeSpinCacheList[0].view;
        this.gsf_r = this.freeSpinCacheList[0].gsf_r;

        this.freeSpinIndex = 1;
        this.currentGame = "FREE";
    }
    else{
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
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if(viewCache.type == "FREE"){
        this.freeSpinWinMoney = this.winMoney;
    }
    if (viewCache.type == "BONUS"){
        this.moneyBonusWin =  this.winMoney;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex].view;
    this.gsf_r = this.freeSpinCacheList[this.freeSpinIndex].gsf_r;

    if(isFreeSpinWin(this.view))
    {
        this.freeSpinLength += freeSpinCount;
        this.isFreeSpinAdd = 1;
    }
    else {
        this.isFreeSpinAdd = 0;
    }

    this.jackpotPositions = JackpotPositionsFromView(this.view, this.gsf_r);
    this.winMoney = WinFromView(this.view, player.betPerLine);
    // WinFromView                                       .
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels)
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinCacheList.length - 1) {
        this.currentGame = "BASE";
        return;
    }
};

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

    if (baseWin > 0) {
        tmpView = RandomWinView(noSevenReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(noSevenReels, bpl);
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
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
            break;
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(noSevenReels, bpl);
    freeSpinCacheList.push({
        view: scatterView,
        gsf_r: JackpotReelsFromView(scatterView, false)
    });
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin, freeSpinCount);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var jackpotView = RandomJackpotView(noSevenReels, bpl);
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
    var tmpView, tmpWin, jackpot = [];
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
    var tmpView, tmpWin, jackpot = [];

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView
};

var RandomView = function (reels, isJackpotGame = 0, nScatters = -1) {
    var view = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[viewPos] = reels[i][reelPos]; 
            if(isScatter(view[viewPos]))
                view[viewPos] = Util.random(4, 9);
        }
    }

    //                     
    var scatterReels = [0, 2, 4];

    Util.random(scatterReels);
    if(nScatters < 0 && Util.probability(22))
    {
        nScatters = Util.random(0, 2);
    }

    for (var i = 0; i < nScatters; i++) {
        var reelNo = scatterReels[i];
        var pos = reelNo + Util.random(0, slotHeight) * slotWidth;
        view[pos] = scatter;
    }
    //                   
    var sevenReels = [0, 1, 2, 3, 4];
    var nJackpots = 0;

    Util.shuffle(sevenReels);
    if(!isJackpotGame && Util.probability(50)){
        nJackpots = Util.random(0, 3);
    }

    for (var i = 0; i < nJackpots; i++) {
        var viewPos = sevenReels[i] + Util.random(0, slotHeight) * slotWidth;
        if(!isScatter(view[viewPos]) || isJackpotGame){
            view[viewPos] = jackpotSymbol;
        }
    }
    return view;
};

var RandomScatterView = function (reels, bpl) {
    var view = [];

    while (true) {
        view = RandomView(reels, 0, 3);
        if (WinFromView(view, bpl) == 0)
            break;
    }

    return view;
}
///                         ,           n                    
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
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var tmpWin = 0;
        var freeSpinTotalWin = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tmpView;

        while (freeSpinIndex <= freeSpinLength) {
            tmpView = RandomView(reels);
            tmpWin = WinFromView(tmpView, bpl);

            // if(freeSpinLength < 32 && Util.probability(percentList.freeRespinPercent)){
            //     tmpView = RandomView(reels, 0, 3);
            //     tmpWin = WinFromView(tmpView, bpl);
            // }

            var cache = {
                view: tmpView,
                gsf_r: JackpotReelsFromView(tmpView, false)
            }

            freeSpinCacheList.push(cache);
            freeSpinTotalWin += tmpWin;

            if (NumberOfScatters(tmpView) >= 3) {
                freeSpinLength += freeSpinCount;
            }
            freeSpinIndex++;
        }

        freeSpinData = {
            cache: freeSpinCacheList,
            win: freeSpinTotalWin,
        };


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

var RandomJackpotView = function (reels, bpl) {
    var view = [];

    while (true) {
        view = RandomView(reels, true);

        var count = 3 + Util.random(0, 3);

        var reelNoArr = [0, 1, 2, 3, 4];
        Util.shuffle(reelNoArr);

        for (var i = 0; i < count; i++) {
            var viewPos = reelNoArr[i] + Util.random(0, slotHeight) * slotWidth;
            view[viewPos] = jackpotSymbol;
        }
        if (WinFromView(view, bpl) == 0)
            break;
    }

    return view;
}

var JackpotRandomCache = function (totalBet, targetMoney) {
    var targetJackpot = 10;

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

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
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

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
}

var isJackpotSymbol = function (symbol) {
    return symbol == jackpotSymbol;
}

var JackpotPositionsFromView = function (view, jackpotReels) {
    var jackpotPositions = [];

    for(var i = 0; i < jackpotReels.length; ++i)
    {
        for(var j = 0; j < slotHeight; ++j){
            var pos = j * slotWidth + jackpotReels[i];

            if(isJackpotSymbol(view[pos])){
                jackpotPositions.push(pos);
                break;
            }
        }
    }    
    return jackpotPositions;
}

var JackpotReelsFromView = function(view, isJackpotGame){
    var yes7reelNoArr = [];
    var no7reelNoArr = [];
    var jackpotReels = [];

    for(var i = 0; i < slotWidth; ++i){
        var hasSeven = 0;

        for(j = 0; j < slotHeight; ++j){
            var pos = j * slotWidth + i;

            if(isJackpotSymbol(view[pos])){
                hasSeven = 1;
                yes7reelNoArr.push(i);
                break;
            }            
        }

        if(!hasSeven)
            no7reelNoArr.push(i);
    }

    Util.random(yes7reelNoArr);
    Util.random(no7reelNoArr);

    var randomCount = 0;
    var idx = 0;

    if(isJackpotGame)
        randomCount = 3;
    else   
        randomCount = Util.random(0, 3);

    while(idx < randomCount && yes7reelNoArr.length > 0){
        jackpotReels.push(yes7reelNoArr.shift());
        ++idx;
    }

    while(idx < 3 && no7reelNoArr.length > 0){
        jackpotReels.push(no7reelNoArr.shift());
        ++idx;
    }

    jackpotReels.sort();
    return jackpotReels;
}

var JackpotMoneyFromCache = function (cache, bpl) {
    var len = cache.length;
    return cache[len - 1] * bpl * payLines.length;
}

var JackpotFirstCache = function () {
    var status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var wins_mask = ["h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h"];
    var wins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var firstJackpot = {
        status: status,
        wins_mask: wins_mask,
        wins: wins
    };

    return firstJackpot;
}

module.exports = SlotMachine;