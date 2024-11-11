var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinMulti = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    //                        
    this.bonusState = 0; // 1:                                 , 2:                                 
    this.selectCache = {};

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [6, 9, 9, 2, 2, 2, 11, 9, 12, 5, 9, 11, 6, 11, 5, 9, 11, 4, 12, 10, 5, 9, 8, 7, 6, 6, 3, 11, 11, 8, 13, 10, 7, 12, 4, 13, 3, 11, 1, 8],
    [3, 2, 2, 2, 9, 6, 13, 7, 10, 10, 11, 9, 13, 10, 11, 10, 6, 5, 1, 12, 10, 12, 7, 10, 5, 11, 4, 12, 7, 13, 3, 12, 8, 11, 6, 12, 13, 10, 8, 10, 4, 5, 13, 13, 7, 10],
    [3, 12, 13, 10, 7, 7, 4, 13, 12, 5, 7, 9, 12, 8, 13, 12, 12, 10, 8, 4, 5, 6, 10, 13, 7, 9, 11, 3, 12, 5, 2, 2, 2, 9, 11, 13, 3, 8, 6, 12, 6, 4, 9, 12, 11, 6, 13, 8, 1],
    [8, 4, 5, 5, 12, 2, 2, 2, 6, 11, 12, 8, 13, 8, 10, 7, 13, 7, 13, 6, 9, 8, 7, 10, 12, 1, 11, 8, 5, 8, 3, 5, 3, 12, 3, 13, 11, 4, 11, 10, 11, 10, 8, 1, 9],
    [12, 9, 10, 10, 4, 6, 13, 1, 6, 11, 13, 10, 10, 7, 9, 6, 13, 9, 11, 3, 12, 7, 11, 11, 5, 8, 10, 2, 2, 2, 3, 3, 8, 13, 9, 9, 4, 5, 12, 13, 9, 6, 1, 8, 13, 13, 6, 10, 10, 12],
];
var freeReels = [
    [6, 7, 2, 2, 2, 4, 11, 13, 10, 11, 11, 12, 1, 12, 6, 5, 8, 9, 7, 7, 11, 5, 10, 9, 4, 13, 9, 8, 13, 12, 3, 9, 11, 3, 10, 8],
    [4, 12, 12, 10, 3, 13, 10, 4, 9, 13, 10, 12, 8, 7, 5, 8, 2, 2, 2, 13, 7, 1, 12, 7, 11, 6, 13, 10, 6, 9, 13, 10, 13, 10, 5, 11, 3, 7, 6, 13],
    [11, 2, 2, 2, 12, 3, 13, 5, 8, 6, 9, 13, 13, 8, 12, 11, 7, 11, 13, 7, 4, 7, 1, 4, 12, 13, 10, 8, 13, 10, 11, 6, 12, 9, 6, 8, 4, 8, 3, 12, 6, 5, 9, 5, 10],
    [5, 9, 4, 3, 5, 7, 11, 7, 8, 5, 12, 12, 2, 2, 2, 3, 9, 3, 5, 12, 11, 1, 6, 6, 8, 8, 13, 8, 8, 11, 13, 4, 10, 1, 12, 13, 10, 11, 8, 11, 8, 10, 7, 8, 10],
    [9, 10, 8, 1, 12, 5, 11, 12, 10, 10, 4, 13, 11, 5, 5, 3, 8, 6, 4, 13, 1, 3, 10, 7, 2, 2, 2, 9, 7, 3, 12, 11, 11, 9, 13, 13, 12, 9, 10, 8, 3, 6, 13, 6, 9, 12, 9, 6, 10, 6, 10, 13, 10],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 20, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 500, 30, 25, 20, 15, 15, 10, 10, 5, 5, 5, 5],
    [0, 0, 4000, 125, 100, 80, 75, 60, 50, 40, 30, 30, 25, 25],
    [0, 0, 10000, 750, 500, 400, 300, 250, 200, 150, 125, 100, 100, 100],
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
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    }

    if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;

        cache = this.freeSpinCacheList[0];
        this.view = cache.view;
        this.freeSpinLength = cache.freeSpinLength;
        this.freeSpinMulti = cache.freeSpinMulti;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (isFreeSpinWin(this.view)) {
        //                          
        this.freeSpinIndex = 1;
        this.freeSpinBeforeMoney = this.winMoney;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];
    this.winMoney = WinFromView(this.view, player.betPerLine) * this.freeSpinMulti;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.scatterPosition = ScatterPositions(this.view);
    this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels),
        below: RandomLineFromReels(freeReels),
    };

    this.freeSpinIndex++;
    this.freeSpinWinMoney += this.winMoney;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    this.winMoney = 0;

    if (this.bonusState != 1) {
        this.bonusState = 1;
    } else {
        this.bonusState = 2;
    }

    var selectId = Number(param.ind);
    var status, wins_mask, wins;

    if (this.bonusState == 1) {
        //                                 
        status = [0, 0, 0, 0, 0, 0];
        wins_mask = "nff,nff,nff,nff,nff,nff";
        wins = [8, 12, 15, 18, 28, 38];

        status[selectId] = 1;

        Util.shuffle(wins);

        for (var i = 0; i < wins.length; i++) {
            if (wins[i] == this.freeSpinLength) {
                var temp = wins[i];
                wins[i] = wins[selectId];
                wins[selectId] = temp;
                break;
            }
        }
    } else {
        //                                 
        status = [0, 0, 0, 0, 0, 0];
        wins_mask = "m,m,m,m,m,m";
        wins = [2, 3, 5, 8, 10, 18];

        status[selectId] = 2;

        Util.shuffle(wins);

        for (var i = 0; i < wins.length; i++) {
            if (wins[i] == this.freeSpinMulti) {
                var temp = wins[i];
                wins[i] = wins[selectId];
                wins[selectId] = temp;
                break;
            }
        }
    }

    this.selectCache = {
        status: status.join(","),
        wins_mask: wins_mask,
        wins: wins.join(","),
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var view, win;

    if (baseWin > 0) {
        view = RandomWinView(baseReels, bpl, baseWin);
    } else {
        view = RandomZeroView(baseReels, bpl);
    }
    win = WinFromView(view, bpl);

    var pattern = {
        view: view,
        win: win,
        type: "BASE",
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

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWin = WinFromView(scatterView, bpl);

    var randomLengthArray = [8, 12, 15, 18, 28, 38];
    var randomMultiArray = [2, 3, 5, 8, 10, 18];
    var freeSpinLength = randomLengthArray[Util.random(0, randomLengthArray.length)];
    var freeSpinMulti = randomMultiArray[Util.random(0, randomLengthArray.length)];
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin - scatterWin, freeSpinLength, freeSpinMulti);
    var freeSpinCacheList = [{
        view: scatterView,
        freeSpinLength: freeSpinLength,
        freeSpinMulti: freeSpinMulti,
    }];

    return {
        win: fsCache.win + scatterWin,
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var calcCount = 0, bottomLimit = 0;
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (isFreeSpinWin(view)) {
            continue;
        }

        if (win > bottomLimit && win <= maxWin) {
            return view;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var win = WinFromView(view, bpl);

        if (isFreeSpinWin(view)) {
            continue;
        }

        if (win == 0) {
            return view;
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

        if (!isDoubleScatterView(view)) {
            break;
        }
    }
    return view;
};

var RandomScatterView = function (reels) {
    var view = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            view[pos] = reels[i][reelPos];
            if (isScatter(view[pos])) {
                view[pos] = Util.random(3, 14);
            }
        }
    }

    var reelNoArr = [0, 1, 2, 3, 4];
    var nScatters = Util.probability(2) ? 4 : 3;
    Util.shuffle(reelNoArr);

    for (var i = 0; i < nScatters; i++) {
        var height = Util.random(0, slotHeight);
        var pos = height * slotWidth + reelNoArr[i];
        view[pos] = scatter;
    }

    return view;
}

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, fsMulti) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinLength = fsLen;
        var freeSpinMulti = fsMulti;
        var freeSpinIndex = 1,
            freeSpinWinMoney = 0,
            freeSpinCacheList = [];
        var freeSpinData = {};
        var view = [], win = 0;
        while (true) {
            view = RandomView(reels);

            if (isFreeSpinWin(view)) {
                continue;
            }

            win = WinFromView(view, bpl) * freeSpinMulti;

            freeSpinCacheList.push(view);
            freeSpinWinMoney += win;
            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                break;
            }
        }

        freeSpinData = {
            win: freeSpinWinMoney,
            cache: freeSpinCacheList
        };

        if (freeSpinWinMoney >= minMoney && freeSpinWinMoney <= maxMoney) {
            return freeSpinData;
        }

        if (freeSpinWinMoney > lowerLimit && freeSpinWinMoney < minMoney) {
            lowerLimit = freeSpinWinMoney;
            lowerView = freeSpinData;
        }

        if (freeSpinWinMoney > maxMoney && freeSpinWinMoney < upperLimit) {
            upperLimit = freeSpinWinMoney;
            upperView = freeSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
}

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

    money += ScatterWinFromView(view, bpl * 25);

    return money;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                                                                  
    var wildPosInLine = [0, 0, 0, 0, 0];
    //                                                            
    var winLineHasWild = false;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i]))
            //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            lineSymbols[i] = symbol;
            wildPosInLine[i] = 1;
        }
    }

    //                                
    for (var i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        if (wildPosInLine[i] == 1) winLineHasWild = true;
        matchCount++;
    }

    //                                             -1   ,     lineSymbols                        .
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    var winPay = payTable[matchCount][symbol] * bpl;

    if (winLineHasWild) return winPay * 2; //                                                                               2             

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
                `${lineId}~${money}~${line
                    .filter(function (item, index, arr) {
                        return lineSymbols[index] != -1;
                    })
                    .join("~")}`
            );
        }
    }

    return winLines;
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

var isDoubleScatterView = function (view) {
    for (var i = 0; i < slotWidth; i++) {
        var scatterCount = 0;
        for (var j = 0; j < slotHeight; j++) {
            if (isScatter(view[i + j * slotWidth])) {
                scatterCount++;
            }
        }

        if (scatterCount > 1) {
            return true;
        }
    }

    return false;
};

var ScatterWinFromView = function (view, bet) {
    var win = 0;
    var nScatters = NumberOfScatters(view);
    if (nScatters == 5) {
        win = bet * 250;
    } else if (nScatters == 4) {
        win = bet * 10;
    } else if (nScatters == 3) {
        win = bet * 3;
    } else if (nScatters == 2) {
        win = bet * 1;
    }

    return win;
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