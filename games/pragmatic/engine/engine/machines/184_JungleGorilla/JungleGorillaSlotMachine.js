var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    this.freeSpinCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.multiValue = [];

    this.wildMultiPos = null;
    this.multiInfo = null;
    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["JACKPOT"]; // "BONUS"

    this.prevMultiList = []; //                                                  
    this.currentMultiList = [];
};

var gorila = 12, wild = 2;
var slotWidth = 5, slotHeight = 3;
var initMultiList = [1, 1, 1, 1, 1];
var wildWinPos = [];
var baseReels = [
    [11, 3, 9, 11, 10, 8, 7, 9, 5, 10, 4, 11, 7, 8, 2, 9, 6],
    [7, 9, 8, 11, 10, 6, 4, 8, 7, 10, 2, 11, 3, 7, 6, 9, 8, 5],
    [2, 9, 10, 11, 5, 9, 7, 11, 6, 10, 9, 11, 4, 3, 10, 5, 8],
    [10, 6, 4, 8, 11, 7, 9, 6, 2, 9, 8, 3, 5],
    [3, 9, 7, 11, 4, 7, 6, 8, 11, 7, 5, 11, 6, 2, 11, 10]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 30, 25, 20, 15, 12, 10, 10, 8, 6, 5, 0],
    [0, 0, 50, 40, 35, 30, 24, 20, 18, 16, 12, 10, 0],
    [0, 0, 250, 90, 70, 60, 50, 40, 35, 30, 25, 20, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4],
    [10, 11, 12, 13, 14],
    [0, 1, 7, 13, 14],
    [10, 11, 7, 3, 9],
    [0, 6, 12, 8, 4],
    [10, 6, 2, 8, 14],
    [5, 11, 12, 13, 9],
    [5, 1, 2, 3, 4],
    [5, 1, 2, 8, 9],
    [0, 6, 7, 8, 4],
    [10, 6, 7, 8, 14],
    [0, 6, 2, 8, 4],
    [10, 6, 12, 8, 14],
    [5, 6, 2, 8, 9],
    [5, 6, 12, 8, 9],
    [10, 6, 2, 8, 9],
    [0, 6, 12, 8, 9],
    [0, 1, 2, 8, 14],
    [10, 11, 12, 8, 4],
];

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

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.multiValue = cache.multi;
        this.currentMultiList = cache.nextMulti;
    }
    //                                                  
    var wildStr = GetWildFinalStr(this.multiValue);
    var wildMultiPos = GetWildPosMulti(this.view, this.multiValue);

    initMultiList = this.multiValue;

    this.multiInfo = wildStr;
    this.wildMultiPos = wildMultiPos;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    initMultiList = this.prevMultiList.length > 0 ? this.prevMultiList : initMultiList;

    this.prevMultiList = [];

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
        if (tmpView.win > 0) {
            CheckWildMulti(); //                
        }
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }

    var nextMulti = [...initMultiList];

    var pattern = {
        nextMulti: nextMulti,
        view: tmpView,
        win: tmpView.win,
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
        case "JACKPOT":
            return RandomFreeViewCache(baseReels, bpl, jpWin, isCall);
        default: break;
    }

};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            var obj = {
                multi: [...initMultiList],
                view: tmpView,
                win: tmpWin
            }
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }

    return obj;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0) {
            //                                                
            //                                    5                                .
            if (Util.probability(60)) {
                var randPos = Util.random(0, 15);
                tmpView[randPos] = gorila;

                if (initMultiList[randPos % slotWidth] < 5) {
                    initMultiList[randPos % slotWidth]++;
                }
            }
            break;
        }
    }

    var obj = {
        multi: [...initMultiList],
        view: tmpView,
        win: tmpWin
    }
    return obj;
};

var RandomView = function (reels) {
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

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, isCall) {
    var patternCount = 500;

    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    var prevWildPos = [];

    for (var patternIndex = 0; patternIndex < patternCount; patternIndex++) {
        var view = RandomView(reels);
        var tmpWin = WinFromView(view, bpl);

        var tmpView = {
            multi: [...initMultiList],
            view: view,
            win: tmpWin
        }

        if (tmpWin >= minMoney && tmpWin <= maxMoney) {
            CheckWildMulti(); //                
            var nextMulti = [...initMultiList];
            return {
                nextMulti: nextMulti,
                win: tmpWin,
                view: tmpView,
                bpl: bpl,
                type: "BASE",
                isCall: isCall ? 1 : 0
            };
        }

        if (tmpWin > lowerLimit && tmpWin < minMoney) {
            prevWildPos = [...wildWinPos];
            lowerLimit = tmpWin;
            lowerView = {
                win: tmpWin,
                view: tmpView,
                bpl: bpl,
                type: "BASE",
                isCall: isCall ? 1 : 0
            };
        }

    }

    if (lowerView) {
        wildWinPos = [...prevWildPos];
        CheckWildMulti(); //                
        var nextMulti = [...initMultiList];
        lowerView.nextMulti = nextMulti;
        return lowerView;
    }
}

//                                                           
var GetMultiFromView = function (wildPos) {
    var pos = Util.clone(wildPos); //                            
    var multiNum = 0;

    for (var i = 0; i < pos.length; i++) {
        if (initMultiList[pos[i] % slotWidth] != 1) {
            multiNum += initMultiList[pos[i] % slotWidth];
        }
    }

    return multiNum;
}

//                                  
var CheckWildMulti = function () {
    var pos = Util.clone(wildWinPos);
    var res = pos.filter((item, index, array) => array.indexOf(item) === index);

    for (var i = 0; i < res.length; i++) {
        initMultiList[res[i] % slotWidth] = 1;
    }
}

//                                               
var GetWildFinalStr = function (multiValue) {
    var multiPos = Util.clone(multiValue);
    var accvStr = [];
    // 4~4~5;2~1~5;3~3~5;1~1~5;1~1~5

    for (var i = 0; i < multiPos.length; i++) {
        accvStr.push(`${multiPos[i]}~${multiPos[i]}~5`);
    }

    var objStr = {
        accv: accvStr.join(";"),
        mbrStr: multiPos.join()
    }

    return objStr;
}

//                                    
var GetWildPosMulti = function (view, multiValue) {
    var pos = [], multi = [];

    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            pos.push(i);
            multi.push(multiValue[i % slotWidth]);
        }
    }

    return {
        pos: pos,
        multi: multi
    }
};

var WinFromView = function (view, bpl) {
    var winMoney = 0;
    wildWinPos = [];

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
    var wildPos = []; //                                 
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
            wildPos.push(i);
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
    if (winPay > 0 && wildPos.length > 0) {
        var multi = GetMultiFromView(wildPos);
        if (multi != 0) {
            winPay = winPay * multi;
        }
        wildWinPos = wildWinPos.concat(wildPos);
    }
    return winPay;
};

var isWild = function (symbol) {
    return symbol == wild;
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