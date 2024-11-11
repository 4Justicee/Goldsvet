var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //          
    this.tumbleIndex = 0;
    this.tumbles = [];
    this.tmb_res = 0;
    this.tumbleViewList = [];
    this.multiPositions = DefaultMoneyCache();

    //                           
    this.scatterCounter = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;

    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;

    this.totalBet = 0;
    this.betPerLine = 0;

    this.lineCount = 20;
    this.jackpotType = ["FREE"];
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [7, 3, 8, 4, 9, 5, 6, 5, 4, 9, 4, 5, 9, 4, 5, 1, 5, 9, 8, 5, 8, 9, 4, 9, 4, 8, 9, 8, 4, 5, 8, 9, 8, 9, 8, 5, 8, 9, 5, 9, 5, 8, 6, 8, 9, 5, 9, 5, 4, 9, 5, 8, 4, 8, 4, 8, 5, 9, 4, 5, 5, 9, 5, 3, 5, 9, 5, 8, 5, 9, 3, 5, 8, 8, 9, 9, 6, 4, 8, 6],
    [6, 2, 4, 7, 8, 3, 9, 5, 2, 7, 3, 7, 4, 7, 8, 3, 8, 2, 5, 3, 8, 2, 4, 3, 5, 8, 7, 2, 5, 9, 8, 7, 4, 3, 5, 2, 5, 3, 3, 1, 7, 5, 2, 3, 8, 4, 7, 2, 5, 8, 7, 7, 5, 7, 8, 5, 8, 3, 9, 5, 3, 1],
    [8, 4, 6, 9, 7, 3, 2, 5, 7, 6, 9, 3, 4, 3, 5, 7, 6, 3, 9, 5, 3, 1, 9, 7, 2, 7, 3, 3, 5, 3, 3, 2, 3, 3, 7, 3, 5, 9, 3, 5, 7, 5, 3, 2, 4, 1],
    [8, 3, 5, 2, 4, 9, 6, 7, 6, 3, 4, 9, 1, 3, 2, 9, 5, 4, 9, 2, 4, 3, 4, 9, 5, 4, 2, 9, 3, 5, 9, 9, 3, 2, 4, 9, 4, 5, 2, 9, 4, 9, 3, 3, 9, 5, 6, 9, 2, 3, 4, 3, 5, 9, 3, 3, 2, 4, 5, 4, 4, 9, 7, 6, 3, 4, 9, 4, 9, 4, 5, 4, 2, 9, 3, 5, 9, 4, 7, 5, 4, 5, 6, 4, 2, 9, 5, 4, 3, 4, 3, 5, 2, 4, 5, 3, 9, 3, 9, 5, 5, 4, 2, 3, 4, 3, 9, 4, 9, 9, 3, 4, 4, 3, 4, 3, 4, 3, 3, 9, 4, 9, 4, 3, 9, 2, 5, 3, 5, 9, 4, 9, 3, 5, 9, 4, 9, 6, 5, 4, 5, 3, 9, 2, 4, 9, 3, 4, 1],
    [7, 6, 8, 9, 4, 5, 3, 8, 9, 8, 3, 6, 9, 6, 9, 8, 3, 4, 8, 3, 8, 3, 9, 8, 3, 8, 6, 8, 3, 8, 9, 8, 9, 8, 9, 1, 8, 6, 8, 9, 3, 4, 5, 9, 8, 6, 5, 8, 6, 5, 8, 9, 4, 9, 6, 9, 9, 8, 9, 5, 3, 8, 9, 6, 9, 4, 3, 6, 8, 8, 6, 3, 9, 5, 9, 4, 8, 3, 8, 3, 8, 5, 9, 8, 3, 8, 4, 3, 8, 6, 4, 8, 9, 6, 8, 6, 9, 4, 8, 3, 6, 3, 9, 5, 9, 4, 8, 9, 8, 6, 4, 8, 9, 8, 6, 9, 6, 9, 6, 3, 8, 3, 9, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 20, 15, 8, 8, 3, 3],
    [0, 0, 0, 100, 80, 50, 25, 25, 10, 10],
    [0, 0, 0, 500, 400, 250, 100, 100, 75, 75]
];
var payLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [0, 6, 12, 8, 4],
    [10, 6, 2, 8, 14],
    [5, 1, 2, 3, 9],
    [5, 11, 12, 13, 9],
    [0, 1, 7, 13, 14],
    [10, 11, 7, 3, 4],
    [5, 11, 7, 3, 9],
    [5, 1, 7, 13, 9],
    [0, 6, 7, 8, 4],
    [10, 6, 7, 8, 14],
    [0, 6, 2, 8, 4],
    [10, 6, 12, 8, 14],
    [5, 6, 2, 8, 9],
    [5, 6, 12, 8, 9],
    [0, 1, 12, 3, 4],
    [10, 11, 2, 13, 14],
    [0, 11, 12, 13, 4]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

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
    var view;

    if (viewCache.type == "BASE") {
        this.tumbleViewList = viewCache.view;
        view = this.tumbleViewList[0].view;
        this.view = view;
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        view = this.freeSpinCacheList[0];
        this.view = view[0];
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.tmb_win = 0;
    this.tmb_res = 0;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney; //                    
        this.tumbles = GetTumbles(view, player.betPerLine);
    }

    if (isFreeSpinWin(this.view)) {
        this.currentGame = "FREE";
        this.freeSpinIndex = 1;
        this.scatterCounter = NumberOfScatters(this.view);
        this.freeSpinLength = GetFreeSpinCountFromView(this.view);

        this.scatterWin = ScatterWinFromView(this.view, player.betPerLine * this.lineCount);
        this.scatterPositions = ScatterPositions(this.view);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
    }
}

SlotMachine.prototype.Tumbling = function (player) {
    var multiView = this.tumbleViewList[this.tumbleIndex];
    this.view = multiView.view;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.tumbles = GetTumbles(this.view, player.betPerLine);
    this.multiPositions = multiView.multiValue;

    if (this.winMoney > 0) {
        var nextTumble = GetTumbles(this.view, player.betPerLine); //                       
        var multiNextPos = [];
        var multi = 0;

        multiNextPos = RemoveSameValueFromTmb(nextTumble);
        //                                                              ...
        var prevmulti = this.tumbleViewList[this.tumbleIndex - 1].multiValue;

        for (var i = 0; i < multiNextPos.length; i++) {
            multi += prevmulti[multiNextPos[i]];
        }
        //                                               
        if (multi != 0) {
            this.winMoney = this.winMoney * multi;
        }
    }

    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.tmb_win += this.winMoney;
    this.tumbleIndex++;

    if (this.currentGame == "FREE") {
        this.freeSpinWinMoney += this.winMoney;
    }

    //                 
    if (this.winMoney == 0) {
        this.multiPositions = DefaultMoneyCache();
        this.tmb_res += this.tmb_win;
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);

        if (this.tumbleStatus == "NOTUMBLE") {
            //                              
            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleViewList = this.freeSpinCacheList[this.freeSpinIndex];
    var multiView = this.tumbleViewList[0];
    this.multiPositions = multiView.multiValue;
    this.view = multiView.view;

    this.tmb_win = 0;
    this.tmb_res = 0;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);
    this.tumbles = GetTumbles(this.view, player.betPerLine);

    this.freeSpinWinMoney += this.winMoney;
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
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

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
}

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
    var scatterView = RandomScatterView(baseReels, bpl, isCall);
    var scatterWinMoney = ScatterWinFromView(scatterView, totalBet) + WinFromView(scatterView, bpl);
    var fsCount = GetFreeSpinCountFromView(scatterView);

    //                           
    var freeSpinCacheList = [];
    var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin, fsCount);
    freeSpinCacheList.push([scatterView]);

    return {
        win: fsCache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
}

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;
    var multiLineValue = DefaultMoneyCache();

    while (true) {
        var cache = {};
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

        cache = {
            view: [...view],
            multiValue: [...multiLineValue],
            win: tumbleWinMoney
        }
        var viewList = [];
        viewList.push(cache)

        //                       
        while (true) {
            var lastResult = viewList[viewList.length - 1];
            var lastView;
            if (lastResult.view != undefined) {
                lastView = lastResult.view;
            }
            //                           
            var tumbles = GetTumbles(lastView, bpl);
            //                                 
            multiLineValue = getMultiPosFromWinView(tumbles, multiLineValue);
            //                                      
            var newView = GetNextViewByTumble(lastView, tumbles);
            //                           
            var nWinMoney = WinFromView(newView, bpl);
            //                                                  
            if (nWinMoney > 0) {
                var nextTumble = GetTumbles(newView, bpl); //                       
                var multiNextPos = [];
                var multi = 0;

                multiNextPos = RemoveSameValueFromTmb(nextTumble);

                for (var i = 0; i < multiNextPos.length; i++) {
                    multi += multiLineValue[multiNextPos[i]];
                }
                //                                               
                if (multi != 0) {
                    nWinMoney = nWinMoney * multi;
                }
            }

            var multiPos = multiLineValue;
            cache = {
                view: [...newView], //                     
                multiValue: [...multiPos], //                                           
                win: nWinMoney
            }

            viewList.push(cache);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                multiPos = DefaultMoneyCache();
                multiLineValue = DefaultMoneyCache();
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            return { viewList, tumbleWinMoney };
        }


    }
}

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var winMoney = WinFromView(view, bpl);

        if (winMoney == 0) {
            if (Util.probability(50)) {
                view[Util.random(0, 15)] = scatter;
            }

            var viewList = [];
            var cache = {
                view: view,
                win: winMoney
            }
            viewList.push(cache);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
        }
    }
}

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

        if (NumberOfScatters(resultView) == 0) {
            break;
        }
    }

    return resultView;
};

var RandomScatterView = function (reels, bpl, isCall) {
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
        if (WinFromView(resultView, bpl) == 0) {
            if (NumberOfScatters(resultView) == 3) {
                break;
            } else {
                continue;
            }
        }
    }

    return resultView;
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
        var freeSpinIndex = 1;
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;
        var multiLineValue = DefaultMoneyCache();

        while (true) {
            var viewList = [];
            var cache = {};
            var tumbleWinMoney = 0;
            var view = RandomView(reels);
            var tumbleWinMoney = WinFromView(view, bpl);

            if (tumbleWinMoney == 0) {
                continue;
            }

            cache = {
                view: [...view],
                multiValue: [...multiLineValue],
                win: tumbleWinMoney
            }
            viewList.push(cache)

            //                       
            while (true) {
                var lastResult = viewList[viewList.length - 1];
                var lastView;
                if (lastResult.view != undefined) {
                    lastView = lastResult.view;
                }
                //                           
                var tumbles = GetTumbles(lastView, bpl);
                //                                      
                var newView = GetNextViewByTumble(lastView, tumbles);
                //                           
                var nWinMoney = WinFromView(newView, bpl);
                //                                                  
                if (nWinMoney > 0) {
                    var multiNextPos = [];
                    var multi = 0;

                    var nextTumble = GetTumbles(newView, bpl); //                       
                    multiNextPos = RemoveSameValueFromTmb(nextTumble); //                              

                    for (var i = 0; i < multiNextPos.length; i++) {
                        multi += multiLineValue[multiNextPos[i]];
                    }
                    //                                               
                    if (multi != 0) {
                        nWinMoney = nWinMoney * multi;
                    }
                }
                //                                 
                multiLineValue = getMultiPosFromWinView(tumbles, multiLineValue);

                cache = {
                    view: [...newView], //                     
                    multiValue: [...multiLineValue], //                                           
                    win: nWinMoney
                }

                viewList.push(cache);
                tumbleWinMoney += nWinMoney;

                //                 
                if (nWinMoney == 0) {
                    break;
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
            cache: freeSpinCacheList,
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

    return tumbles;
}

var GetNextViewByTumble = function (view, tumbles) {
    while (true) {
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
        var newView = Util.clone(tumbleView);
        var randomView = RandomView(baseReels);
        //                                 
        for (var i = 0; i < tumbleView.length; i++) {
            //                             
            if (tumbleView[i] < 0) {
                newView[i] = randomView[i];
            }
        }
        if (NumberOfScatters(newView) == 0) {
            break;
        }
    }
    return newView;
};

var ScatterWinFromView = function (view, totalBet) {
    switch (NumberOfScatters(view)) {
        case 3:
            return totalBet * 2;
        case 4:
            return totalBet * 5;
        case 5:
            return totalBet * 20;
        default:
            break;
    }
};

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
}

var getMultiPosFromWinView = function (tumbles, multiValue) {
    var result = multiValue;
    //                                                                
    tumblePositions = RemoveSameValueFromTmb(tumbles);

    for (var i = 0; i < tumblePositions.length; i++) {
        result[tumblePositions[i]] += 1;
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

var DefaultMoneyCache = function () {
    var moneyValues = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyValues[i] = 0;
    }
    return moneyValues;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var RemoveSameValueFromTmb = function (tumbles) {
    var array = [];
    for (var i = 0; i < tumbles.length; i++) {
        var tumble = tumbles[i].split(',')[0];
        array.push(Number(tumble));
    }

    array.sort();
    for (var i = array.length; i > 0; i--) {
        if (array[i] == array[i - 1]) {
            array.splice(i, 1);
        }
    }
    return array;
}

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var GetFreeSpinCountFromView = function (scatterView) {
    switch (NumberOfScatters(scatterView)) {
        case 3:
            return 10;
        case 4:
            return 15;
        case 5:
            return 20;
        default:
            break;
    }
}

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

var isWild = function (symbol) {
    return symbol == wild;
}

module.exports = SlotMachine;