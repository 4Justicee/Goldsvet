var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 7;
    this.freeSpinCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 5;
    this.freeSpinMulti = 1;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];
    //                        
    this.bonusSpinIndex = 0;
    this.bonusMaskStr = "";
    this.bonusWinStr = "";
    this.bonusMaskArr = [];
    this.status = [];
    this.resultMaskLen = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 3;
var bonusFreeSpinArray = [3, 5, 8, 10], bonusMultiArray = [1, 2, 3, 5];
var baseReels = [
    [7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 1, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 5, 5, 5, 5, 5, 1, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
    [7, 7, 7, 7, 7, 7, 7, 1, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 5, 5, 5, 5, 5, 1, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 1, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 5, 5, 5],
    [7, 7, 7, 7, 7, 4, 4, 4, 4, 6, 6, 6, 3, 3, 3, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 5, 5, 5, 5, 5, 1, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 1, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 5, 5, 5],
    [7, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 3, 3, 3, 3, 5, 5, 5, 5, 5, 1, 6, 6, 6, 6, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 1, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 5, 5, 5],
    [7, 7, 7, 7, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 1, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 5, 5, 5, 5, 5, 1, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 1, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 5, 5, 3, 3],
    [0, 0, 0, 50, 15, 15, 5, 5],
    [0, 0, 0, 150, 50, 50, 15, 15]
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 3
    [10, 11, 12, 13, 14], // 2
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [5, 1, 2, 3, 9], // 6
    [5, 11, 12, 13, 9] // 7
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .), 
    this.normalPercent = 30; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }
    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.bonusMaskArr = cache.resultMaskArr;
        this.view = this.freeSpinCacheList[0];
        this.currentGame = "BONUS";
        this.resultMaskLen = this.bonusMaskArr.length;
        for (var i = 0; i < this.resultMaskLen; i++) {
            this.status.push(0);
        }
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (this.currentGame == "BONUS") {
        this.freeSpinBeforeMoney = 0;
        //                              
        this.bonusSpinIndex = 0;
        this.freeSpinMulti = 1;
        this.freeSpinLength = 5;
        this.freeSpinWinMoney = this.winMoney;
        var bonusStrs = GetBonusMaskStr(this.bonusMaskArr);
        this.bonusMaskStr = bonusStrs.maskStr;
        this.bonusWinStr = bonusStrs.winStr;
        this.scatterPositions = ScatterPositions(this.view);
    }

};

SlotMachine.prototype.BonusSpin = function (player, param) {

    for (var i = 0; i < this.resultMaskLen; i++) {
        if (this.bonusMaskArr[i].fsId == Number(param.ind)) {
            var bonusStrs = this.bonusMaskArr[i];
            this.status[i] = this.bonusSpinIndex + 1;
        }
    }

    if (bonusStrs.id == "nff") {
        this.freeSpinLength += bonusStrs.value;
    } else {
        this.freeSpinMulti += bonusStrs.value;
    }

    this.bonusSpinIndex++;

    if (this.bonusSpinIndex > this.resultMaskLen - 1) {
        this.freeSpinIndex = 1;
        this.currentGame = "FREE";
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.freeSpinBeforeMoney += this.winMoney;
    this.winMoney *= this.freeSpinMulti;

    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.status = [];
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

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
    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = WinFromView(scatterView, bpl);
    var scatterPos = ScatterPositions(scatterView);
    //                              
    var resultMaskArr = GetRandomBonusArray(scatterPos);
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
        resultMaskArr: resultMaskArr
    };

    //                           
    var cache = RandomFreeViewCache(baseReels, bpl, fsWin, resultMaskArr);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
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
    return tmpView;
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

        if (!isFreeSpinWin(view)) {
            break;
        }
    }
    return view;
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

        if (isFreeSpinWin(view) && NumberOfScatters(view) < 7 && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, resultMaskArr) {
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
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = 5;
        var freeSpinMulti = 1;

        if (resultMaskArr != null) {
            for (var i = 0; i < resultMaskArr.length; i++) {
                if (resultMaskArr[i].id == "nff") {
                    freeSpinLength += resultMaskArr[i].value;
                } else {
                    freeSpinMulti += resultMaskArr[i].value;
                }
            }
        }

        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(reels);
                fsWin = WinFromView(fsview, bpl);
                fsWin *= freeSpinMulti;

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            freeSpinData.viewList.push(fsview);

            freeSpinWinMoney += fsWin;

            freeSpinIndex++;

            if (freeSpinIndex > freeSpinLength) {
                freeSpinData.win = freeSpinWinMoney;
                break;
            }
        }

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

var WinFromView = function (view, bpl, isBonus = false) {
    var winMoney = 0;
    var defaultpayLines = [];
    if (isBonus) {
        defaultpayLines = bonusPayLine;
    } else {
        defaultpayLines = payLines;
    }

    for (var lineId = 0; lineId < defaultpayLines.length; lineId++) {
        var line = defaultpayLines[lineId];
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

//                                                                             
var GetRandomBonusArray = function (scatterPos) {
    var len = scatterPos.length;
    var bonusScatterNum = Util.random(0, len + 1);
    var bonusMultiNum = len - bonusScatterNum;
    var resultMaskArr = [];

    for (var i = 0; i < bonusScatterNum; i++) {
        var n_Scnum = Util.random(0, 4);
        var obj = {
            id: "nff",
            value: bonusFreeSpinArray[n_Scnum]
        }
        resultMaskArr.push(obj);
    }

    for (var i = 0; i < bonusMultiNum; i++) {
        var n_Mlnum = Util.random(0, 4);
        var obj = {
            id: "m",
            value: bonusMultiArray[n_Mlnum]
        }
        resultMaskArr.push(obj);
    }

    for (var i = 0; i < scatterPos.length; i++) {
        resultMaskArr[i].fsId = scatterPos[i];
    }

    return resultMaskArr;
};

var GetBonusMaskStr = function (maskArr) {
    var maskStrArr = [], winStrArr = [];
    for (var i = 0; i < maskArr.length; i++) {
        maskStrArr.push(maskArr[i].id);
        winStrArr.push(maskArr[i].value);
    }

    var maskStr = maskStrArr.toString();
    var winStr = winStrArr.toString();
    return { maskStr, winStr };
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
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

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
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