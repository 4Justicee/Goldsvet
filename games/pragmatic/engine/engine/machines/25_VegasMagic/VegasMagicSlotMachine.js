var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.tumbleStatus = "NOTUMBLE";
    this.prevTumbleStatus = "NOTUMBLE";
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                
    this.wildExpandView = [];
    this.wildExpanding = [];
    //          
    this.tmb_res = 0;
    this.tmb_win = 0;
    this.tumbles = [];
    this.tumbleIndex = 0;
    this.tumbleMulti = 1;

    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;

    this.baseWinPercent = 30;
    this.lineCount = 20;
    this.jackpotType = ["VM_SCATTER"];
};

var scatter = 1;
var wild = 2;
var wild2 = 12;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7],
    [3, 2, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8],
    [8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 2, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 10, 4, 11, 8, 8, 8, 5, 6, 7],
    [10, 10, 10, 1, 9, 7, 8, 3, 2, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 10, 4, 11, 8, 8, 8, 5, 6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8],
    [6, 7, 8, 9, 9, 9, 7, 4, 5, 11, 11, 11, 3, 6, 7, 8, 10, 10, 10, 1, 9, 7, 8, 3, 10, 4, 11, 8, 8, 8, 5]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 20, 20, 10, 10, 5, 5, 5, 5, 0],
    [0, 0, 0, 150, 75, 75, 50, 50, 25, 25, 15, 15, 0],
    [0, 0, 0, 3000, 250, 250, 150, 150, 75, 75, 50, 50, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],          // 3
    [0, 6, 12, 8, 4],          // 4
    [10, 6, 2, 8, 14],          // 5
    [0, 1, 7, 13, 14],          // 6
    [10, 11, 7, 3, 4],          // 7
    [5, 11, 12, 13, 9],          // 8
    [5, 1, 2, 3, 9],          // 9
    [0, 6, 7, 8, 4],          // 10
    [10, 6, 7, 8, 14],          // 11
    [5, 11, 7, 3, 9],          // 12
    [5, 1, 7, 13, 9],          // 13
    [0, 6, 2, 8, 4],          // 14
    [10, 6, 12, 8, 14],          // 15
    [5, 6, 12, 8, 9],          // 16
    [5, 6, 2, 8, 9],          // 17
    [0, 11, 2, 13, 4],          // 18
    [10, 1, 12, 3, 14],          // 19
    [5, 1, 12, 3, 9],          // 20
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;
    this.wildExpandView = null;
    this.wildExpandings = null;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        return;
    }

    var viewCache = player.viewCache;

    var cache;
    if (viewCache.type == "BASE") {
        this.tumbleCacheList = viewCache.view;
        cache = this.tumbleCacheList[0];
        this.view = cache.view;
    }

    this.wildExpandView = cache.wildExpandView;
    this.wildExpandings = cache.wildExpandings;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    var view = this.view;
    if (this.wildExpandView != null) {
        view = this.wildExpandView;
    }

    this.winMoney = WinFromView(view, player.betPerLine);
    this.winLines = WinLinesFromView(view, player.betPerLine);

    if (this.winMoney == 0) {
        this.wildExpandView = null;
        this.wildExpandings = null;
    }

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tmb_res = this.winMoney;
        this.tmb_win = 0;
        this.tumbleMulti = 1;
        this.tumbleStatus = "TUMBLE";
        this.tumbles = GetTumbles(view, player.betPerLine);
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    this.tumbleMulti++;

    var cache = this.tumbleCacheList[this.tumbleIndex];
    this.view = cache.view;
    this.wildExpandView = cache.wildExpandView;
    this.wildExpandings = cache.wildExpandings;

    var view = this.view;
    if (this.wildExpandView != null) {
        view = this.wildExpandView;
    }

    this.winMoney = WinFromView(view, player.betPerLine) * this.tumbleMulti;
    this.winLines = WinLinesFromView(view, player.betPerLine);
    this.tumbles = GetTumbles(view, player.betPerLine);
    this.tmb_res += this.winMoney;
    this.tmb_win += this.winMoney;

    this.tumbleIndex++;

    //                 
    if (this.winMoney == 0) {
        this.wildExpandView = null;
        this.wildExpandings = null;
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    if (baseWin > 0) {
        var { tumbleCacheList, tumbleWinMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = tumbleWinMoney;
        pattern.view = tumbleCacheList;
    } else {
        var { viewList, winMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = winMoney;
        pattern.view = viewList;
    }

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var freeCache = RandomFreeViewCache(baseReels, bpl, jpWin);

    return {
        view: freeCache.view,
        win: freeCache.win,
        type: "BASE",
        scatter: freeCache.scatter, //                               
        bpl: bpl,
        isCall: isCall ? 1 : 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tumbleCacheList = [];
    var bottomLimit = 0, calcCount = 0;

    while (true) {
        var view = RandomView(reels);
        var scatterCount = NumberOfScatters(view);

        if (scatterCount == 3) {
            if (!Util.probability(70)) {
                continue;
            }
        } else if (scatterCount == 4) {
            if (!Util.probability(27)) {
                continue;
            }
        } else if (scatterCount == 5) {
            if (!Util.probability(3)) {
                continue;
            }
        }

        var wildExpandView = GetWildExpandView(view);
        var wildExpandings = GetWildExpandings(view);
        var tumbleMulti = 1;

        var tmpView = view;
        if (wildExpandView != null) {
            tmpView = wildExpandView;
        }


        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }


        var tumbleWinMoney = WinFromView(tmpView, bpl);
        if (tumbleWinMoney == 0) {
            continue;
        }

        var cache = {
            view: view,
            wildExpandView: wildExpandView,
            wildExpandings: wildExpandings
        }
        tumbleCacheList.push(cache);

        while (true) {
            var lastCache = tumbleCacheList[tumbleCacheList.length - 1];
            var lastView = lastCache.view;
            if (lastCache.wildExpandView != null) {
                lastView = lastCache.wildExpandView;
            }
            var tumbles = GetTumbles(lastView, bpl);
            var tumbleView = GetTumbleView(lastCache.view, tumbles);
            if (isOverflowOfScatters(tumbleView)) {
                continue;
            }

            var scatterCount = NumberOfScatters(view);

            if (scatterCount == 3) {
                if (!Util.probability(70)) {
                    continue;
                }
            } else if (scatterCount == 4) {
                if (!Util.probability(27)) {
                    continue;
                }
            } else if (scatterCount == 5) {
                if (!Util.probability(3)) {
                    continue;
                }
            }

            while (true) {
                var newView = Util.clone(tumbleView);
                var randomView = RandomView(reels);
                //                                 
                var newWildReels = [];
                for (var i = 0; i < tumbleView.length; i++) {
                    //                             
                    if (tumbleView[i] < 0) {
                        newView[i] = randomView[i];
                        if (isWild(randomView[i])) {
                            newWildReels.push(i % slotWidth);
                        }
                    }
                }
                if (!isDoubleScatterInLine(newView)) {
                    break;
                }
            }

            var newWildExpandView = GetWildExpandView(newView, newWildReels);
            var newWildExpandings = GetWildExpandings(newView, newWildReels);

            var tmpNewView = newView;
            if (newWildExpandView != null) {
                tmpNewView = newWildExpandView;
            }

            var newCache = {
                view: newView,
                wildExpandView: newWildExpandView,
                wildExpandings: newWildExpandings
            }
            tumbleCacheList.push(newCache);

            tumbleMulti++;
            var nWinMoney = WinFromView(tmpNewView, bpl) * tumbleMulti;
            tumbleWinMoney += nWinMoney;

            if (nWinMoney == 0) {
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            return { tumbleCacheList, tumbleWinMoney };
        }

        tumbleCacheList = [];

    }
};

var RandomZeroView = function (reels, bpl) {
    var viewList = [];

    while (true) {
        var view = RandomView(reels);
        var wildExpandView = GetWildExpandView(view);
        var wildExpandings = GetWildExpandings(view);

        var tmpView = view;
        if (wildExpandView != null) {
            tmpView = wildExpandView;
        }

        var winMoney = WinFromView(tmpView, bpl);

        if (winMoney == 0) {
            var cache = {
                view: view,
                wildExpandView: wildExpandView,
                wildExpandings: wildExpandings
            }
            viewList.push(cache);
            return { viewList, winMoney };
        }
    }
};

var RandomView = function (reels) {
    var resultView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        if (!isOverflowOfScatters(resultView)) {
            break;
        }
    }

    return resultView;
};

var RandomScatterView = function (reels) {
    var resultView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                resultView[viewPos] = reels[i][reelPos];
            }
        }

        if (NumberOfScatters(resultView) >= 3) {
            break;
        }
    }

    return resultView;
};

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    var scatterCnt = 0;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var view = RandomScatterView(reels);
        scatterCnt = NumberOfScatters(view);
        
        var tumbleWinMoney = 0, tumbleCacheList = [];

        var wildExpandView = GetWildExpandView(view);
        var wildExpandings = GetWildExpandings(view);
        var tumbleMulti = 1;

        var tmpView = view;
        if (wildExpandView != null) {
            tmpView = wildExpandView;
        }

        tumbleWinMoney = WinFromView(tmpView, bpl);
        if (tumbleWinMoney == 0) {
            continue;
        }

        var cache = {
            view: view,
            wildExpandView: wildExpandView,
            wildExpandings: wildExpandings
        }
        tumbleCacheList.push(cache);

        while (true) {
            var lastCache = tumbleCacheList[tumbleCacheList.length - 1];
            var lastView = lastCache.view;
            if (lastCache.wildExpandView != null) {
                lastView = lastCache.wildExpandView;
            }
            var tumbles = GetTumbles(lastView, bpl);
            var tumbleView = GetTumbleView(lastCache.view, tumbles);
            if (isOverflowOfScatters(tumbleView)) {
                continue;
            }

            while (true) {
                var newView = Util.clone(tumbleView);
                var randomView = RandomView(reels);
                //                                 
                var newWildReels = [];
                for (var i = 0; i < tumbleView.length; i++) {
                    //                             
                    if (tumbleView[i] < 0) {
                        newView[i] = randomView[i];
                        if (isWild(randomView[i])) {
                            newWildReels.push(i % slotWidth);
                        }
                    }
                }

                if (!isDoubleScatterInLine(newView)) {
                    break;
                }
            }

            var newWildExpandView = GetWildExpandView(newView, newWildReels);
            var newWildExpandings = GetWildExpandings(newView, newWildReels);

            var tmpNewView = newView;
            if (newWildExpandView != null) {
                tmpNewView = newWildExpandView;
            }

            var newCache = {
                view: newView,
                wildExpandView: newWildExpandView,
                wildExpandings: newWildExpandings
            }
            tumbleCacheList.push(newCache);

            tumbleMulti++;
            var nWinMoney = WinFromView(tmpNewView, bpl) * tumbleMulti;
            tumbleWinMoney += nWinMoney;

            if (nWinMoney == 0) {
                break;
            }
        }

        var pattern = {
            view: tumbleCacheList,
            win: tumbleWinMoney,
            scatter: scatterCnt //                               
        };

        if (pattern.win >= minMoney && pattern.win <= maxMoney) {
            return pattern;
        }

        if (pattern.win > lowerLimit && pattern.win < minMoney) {
            lowerLimit = pattern.win;
            lowerView = pattern;
        }
        if (pattern.win > maxMoney && pattern.win < upperLimit) {
            upperLimit = pattern.win;
            upperView = pattern;
        }
    }

    return lowerView ? lowerView : upperView;
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

    money += ScatterWinFromView(view, bpl);
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
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var isWild = function (symbol) {
    return symbol == wild || symbol == wild2;
};

var GetTumbles = function (view, bpl) {
    var tumbles = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            for (var i = 0; i < lineSymbols.length; i++) {
                if (lineSymbols[i] >= 0) {
                    var tumble = `${line[i]},${lineSymbols[i]}`;
                    if (tumbles.indexOf(tumble) < 0) {
                        tumbles.push(tumble);
                    }
                }
            }
        }
    }
    var scatterWin = ScatterWinFromView(view, bpl);
    if (scatterWin > 0) {
        var scatterPositions = ScatterPositions(view);
        for (var i = 0; i < scatterPositions.length; i++) {
            tumbles.push(`${scatterPositions[i]},${scatter}`);
        }
    }
    return tumbles;
};

var GetTumbleView = function (view, tumbles) {
    var tumbleView = Util.clone(view);
    var tumblePositions = [];
    for (var i = 0; i < tumbles.length; i++) {
        var tumble = tumbles[i].split(',')[0];
        tumblePositions.push(Number(tumble));
    }

    //           
    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            //                                    
            if (tumblePositions.indexOf(pos) >= 0) {
                for (var k = j - 1; k >= 0; k--) {
                    tumbleView[i + (k + 1) * slotWidth] = tumbleView[i + k * slotWidth];
                }
                tumbleView[i] = -1;
            }
        }
    }
    return tumbleView;
};

var isOverflowOfScatters = function (view) {
    return NumberOfScatters(view) > 5;
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

var GetWildExpandView = function (view, wildReels = []) {
    var wildExpandView = Util.clone(view);

    //                                        
    if (wildReels.length == 0) {
        for (var i = 0; i < slotWidth; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                if (isWild(view[pos])) {
                    wildReels.push(i);
                    break;
                }
            }
        }
    }
    //                                     
    if (wildReels.length == 0) {
        return null;
    }
    //                                         
    for (var i = 0; i < wildReels.length; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = wildReels[i] + j * slotWidth;
            wildExpandView[pos] = wild2;
        }
    }
    return wildExpandView;
};

var GetWildExpandings = function (view, wildReels = []) {
    //                                        
    var beforeExpanding = [];
    if (wildReels.length == 0) {
        for (var i = 0; i < slotWidth; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = i + j * slotWidth;
                if (isWild(view[pos])) {
                    if (wildReels.indexOf(i) < 0) {
                        wildReels.push(i);
                    }
                    beforeExpanding.push(pos);
                }
            }
        }
    } else {
        for (var i = 0; i < wildReels.length; i++) {
            for (var j = 0; j < slotHeight; j++) {
                var pos = wildReels[i] + j * slotWidth;
                if (isWild(view[pos])) {
                    beforeExpanding.push(pos);
                }
            }
        }
    }

    var afterExpanding = [];
    for (var i = 0; i < wildReels.length; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = wildReels[i] + j * slotWidth;
            afterExpanding.push(pos);
        }
    }
    var result = {
        before: beforeExpanding,
        after: afterExpanding,
    };

    return result;
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

var ScatterWinFromView = function (view, bpl) {
    var win = 0;
    var nScatters = NumberOfScatters(view);
    if (nScatters == 5) {
        win = bpl * 10000;
    } else if (nScatters == 4) {
        win = bpl * 1000;
    } else if (nScatters == 3) {
        win = bpl * 100;
    }
    return win;
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
}


module.exports = SlotMachine;