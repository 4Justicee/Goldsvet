var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    this.freeSpinCount = 10;
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
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    this.preView = [];
    this.nugefalg = false;
    this.nugeStr = null;
    this.prgStr = null;
    this.rwdStr = null;
    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // "BONUS"
};

var scatter = 1;
var wild = 2;
var gold = 13;
var slotWidth = 5;
var slotHeight = 3;
var initFreespinCount = 8;
var baseReels = [
    [6, 11, 6, 9, 9, 9, 2, 9, 8, 8, 8, 3, 1, 6, 9, 6, 11, 9, 3, 11, 7, 10, 12, 5, 4],
    [4, 7, 11, 12, 3, 11, 11, 11, 5, 9, 10, 2, 7, 10, 10, 2, 4, 8, 10, 2, 5, 5, 7, 11, 7, 10, 11, 6, 4, 10, 11, 10, 5, 7],
    [6, 3, 12, 7, 12, 2, 9, 8, 1, 12, 4, 2, 7, 10, 2, 8, 4, 6, 6, 6, 12, 2, 5, 8, 1, 12, 3, 6, 7, 12, 12, 7, 12, 1, 10, 11, 7, 12, 12, 10],
    [2, 12, 11, 12, 11, 9, 9, 9, 8, 8, 12, 7, 3, 11, 11, 4, 12, 12, 11, 7, 12, 10, 12, 4, 11, 3, 11, 12, 4, 6, 11, 10, 11, 6, 10, 5, 12, 12, 10, 11, 10, 10, 10, 7, 11, 10, 11, 10, 11, 11, 7, 6, 10, 7, 12, 7],
    [6, 7, 12, 2, 11, 12, 11, 9, 7, 9, 10, 12, 4, 11, 1, 7, 12, 5, 11, 10, 11, 10, 10, 6, 12, 12, 10, 11, 10, 7, 11, 6, 9, 8, 9, 10, 11, 5, 3, 12, 7, 12, 8, 8, 8, 12, 7, 12, 11, 10, 5]
];
var freespinReels = [
    [6, 11, 6, 9, 2, 9, 8, 8, 8, 3, 12, 8, 10, 6, 5, 8, 10, 8, 5, 5, 5, 8, 4, 5, 8, 9, 9, 6, 9, 9, 9, 11, 3, 12, 11, 6, 9, 6, 11, 9, 3, 11, 7],
    [4, 10, 10, 4, 10, 5, 3, 12, 4, 8, 8, 8, 11, 5, 9, 11, 12, 5, 9, 10, 10, 4, 9, 5, 5, 5, 9, 6, 7, 11, 11, 2, 5, 11, 7, 10, 7, 11, 7, 11, 7, 11, 7, 10, 11, 4, 10, 11, 10, 5, 7],
    [6, 6, 6, 3, 12, 7, 12, 2, 9, 8, 12, 4, 7, 10, 8, 4, 7, 12, 10, 11, 7, 12, 12, 10, 5],
    [2, 12, 11, 12, 11, 9, 7, 6, 9, 8, 8, 8, 9, 5, 6, 3, 7, 5, 9, 4, 9, 10, 10, 5, 9, 9, 6, 9, 5, 3, 11, 11, 12, 4, 6, 11, 10, 11, 6, 10, 5, 12, 12, 10, 11, 10, 7, 11, 10, 11, 10, 11, 7],
    [6, 7, 12, 2, 3, 11, 12, 11, 9, 7, 9, 8, 7, 12, 5, 11, 10, 11, 10, 10, 6, 12, 12, 10, 11, 10, 7, 4, 11, 10, 11, 10, 11, 11, 6, 9, 8, 8, 8, 9, 10, 11, 5, 12, 7, 12, 10, 5]
]
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 25, 25, 15, 10, 10, 10, 5, 5, 5],
    [0, 0, 0, 150, 120, 120, 100, 100, 100, 50, 25, 20, 20],
    [0, 0, 0, 250, 200, 200, 150, 150, 125, 125, 120, 100, 100]
];
var payLines = [
    [5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4],
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
    this.highPercent = 5; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.preView = [];
    this.nugefalg = false;
    this.nugeStr = null;
    this.prgStr = null;
    this.rwdStr = null;

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.view = this.freeSpinCacheList[0];

        this.nugefalg = cache.nugefalg;
        this.nugeStr = cache.nugeStr;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (viewCache.type == "FREE") {
        this.fs_more = 0;
        this.freeSpinIndex = 1;
        this.freeSpinLength = initFreespinCount;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";

        if (this.nugefalg) {
            this.virtualReels = {
                above: cache.scatterReel,
                below: RandomLineFromReels(baseReels),
            };
        } else {
            this.virtualReels = {
                above: RandomLineFromReels(baseReels),
                below: cache.scatterReel,
            };
        }
    }

};

SlotMachine.prototype.FreeSpin = function (player) {
    var viewCache = this.freeSpinCacheList[this.freeSpinIndex];
    if (viewCache.rwd.length > 0) {
        this.view = viewCache.s;
        this.preView = viewCache.is;
    } else {
        this.view = viewCache.is;
    }

    this.prgStr = viewCache.prg;
    this.rwdStr = viewCache.rwd;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.fs_more = viewCache.fs_more; //                      .

    this.freeSpinLength += this.fs_more;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
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
    var scatterView = RandomScatterView(baseReels); //    1    3                                      
    var nudgeReel = RandomNudgeScatterLine(); //    5                                          
    var sccaterCount = initFreespinCount;
    var nugefalg = false;
    if (Util.probability(65)) {
        nugefalg = true;
        var nugeStr = GenerateNudgeStr(scatterView, nugefalg);
    } else {
        nugefalg = false;
        var nugeStr = GenerateNudgeStr(scatterView, nugefalg);
    }
    //                                 
    var freeSpinData = {
        nugefalg: nugefalg,
        nugeStr: nugeStr,
        scatterReel: nudgeReel,
        length: sccaterCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freespinReels, bpl, fsWin, sccaterCount);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + WinFromView(scatterView, bpl),
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

var RandomScatterView = function (reels) {
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
        if (isFreeSpinWin(view)) {
            break;
        }
    }

    var reel3 = [4, 9, 14]; //                                                          .                         

    for (var i = 0; i < reel3.length; i++) {
        if (view[reel3[i]] == scatter) {
            view[reel3[i]] = Util.random(3, 13);
        }
    }

    return view;
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
        freeSpinData.viewList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        var wildFreeView = [];
        var wildSymbolCount = 0;
        var wildLevel = 0;
        var wildTPCount = 0;
        var rwdStr = "";
        var fs_more = 0;
        var randWildViewNum = 0;
        var wildCnt = 0;
        var isFreeSpinAdd = 0;
        // {
        //                                            json      
        // 
        //     prg: "1,2,0",
        //     rwd: "2~10,9,11,3", //                           
        //     is: "12,10,11,12,5,8,10,7,11,6,10,4,12,12,11",  //                    
        //     s: "12,10,11,2,5,8,10,7,11,2,2,2,12,12,11", //                                 
        //     
        // }

        //                  (                              )
        var genWildNum = Util.random(2, 4);
        while (true) {
            var fsview, fsWin;
            wildFreeView = null;
            rwdStr = "";
            fs_more = 0;
            wildCnt = 0;

            //                   
            fsview = RandomFreeWildView(reels, wildSymbolCount, genWildNum);

            if (wildLevel != 0) {
                wildFreeView = GenerateWildView(fsview, randWildViewNum);
                rwdStr = wildFreeView.rwdStr;
                wildCnt = CheckWildFreeSpinView(wildFreeView.view) - randWildViewNum;
                fsWin = WinFromView(wildFreeView.view, bpl);
            }

            //                                                           
            if (wildFreeView == null) {
                wildCnt = CheckWildFreeSpinView(fsview);
                fsWin = WinFromView(fsview, bpl);
            }


            wildSymbolCount += wildCnt;

            //                                              
            if (wildSymbolCount <= 6) {
                if (1 <= wildSymbolCount && wildSymbolCount < 2) {
                    wildTPCount = 2;
                    wildLevel = 0;
                } else if (2 <= wildSymbolCount && wildSymbolCount < 4) {
                    wildTPCount = 4;
                    if (wildLevel == 0) {
                        isFreeSpinAdd = 0;
                    }
                    wildLevel = 1;
                } else if (4 <= wildSymbolCount && wildSymbolCount < 6) {
                    wildTPCount = 6;
                    if (wildLevel == 1) {
                        isFreeSpinAdd = 0;
                    }
                    wildLevel = 2;
                } else if (wildSymbolCount == 6) {
                    if (wildLevel == 2) {
                        isFreeSpinAdd = 0;
                    }
                    wildLevel = 3;
                }
            }

            //                                             
            if (wildLevel == 1) {
                if (!isFreeSpinAdd) {
                    randWildViewNum = 2;
                    freeSpinLength += 2;
                    fs_more = 2;
                    isFreeSpinAdd = 1;
                }
            } else if (wildLevel == 2) {
                if (!isFreeSpinAdd) {
                    randWildViewNum = 4;
                    freeSpinLength += 2;
                    fs_more = 2;
                    isFreeSpinAdd = 1;
                }
            } else if (wildLevel == 3) {
                if (!isFreeSpinAdd) {
                    randWildViewNum = 6;
                    freeSpinLength += 2;
                    fs_more = 2;
                    isFreeSpinAdd = 1;
                }
            }

            var obj = {
                fs_more: fs_more,
                prg: `${wildSymbolCount},${wildTPCount},${wildLevel}`,
                rwd: rwdStr,
                is: fsview,
                s: wildFreeView && wildFreeView.view
            }

            freeSpinData.viewList.push(obj);

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

var RandomNudgeScatterLine = function () {
    var reel = RandomLineFromReels(baseReels);
    for (var i = 0; i < reel.length; i++) {
        if (reel[i] == scatter) {
            reel[i] = Util.random(3, 13);
        }
    }

    reel[4] = scatter;

    return reel;
};

var CheckWildFreeSpinView = function (view) {
    var resultView = Util.clone(view);
    var wildCount = 0;
    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] == wild) {
            wildCount++;
        }
    }
    return wildCount;
};

var GenerateNudgeStr = function (scatterView, nugefalg) {
    if (nugefalg) {
        var nugeStr = `4~1~1,${scatterView[4]},${scatterView[9]}~49~-1`; //                                       
    } else {
        var nugeStr = `4~1~${scatterView[9]},${scatterView[14]},1~47~1`; //                                           
    }
    return nugeStr;
};

var GenerateWildView = function (fsView, wildNum) {
    var randWildPos = [];
    var resultView = Util.clone(fsView);

    for (var i = 0; i < wildNum; i++) {
        while (true) {
            var pos = Util.random(0, 15);
            var counter = 0;
            for (var j = 0; j < randWildPos.length; j++) {
                if (randWildPos[j] == pos) {
                    counter++;
                }
            }
            if (counter == 0) {
                randWildPos.push(pos);
                break;
            }
        }
    }

    for (var i = 0; i < randWildPos.length; i++) {
        resultView[randWildPos[i]] = wild;
    }

    var rwdStr = `2~${randWildPos.join()}`;

    return {
        view: resultView,
        rwdStr: rwdStr
    };
};

var RandomFreeWildView = function (reels, num, genWildNum) {
    var wildPosList = [];
    var view = RandomView(reels);
    //                                 
    for (var i = 0; i < view.length; i++) {
        if (view[i] == wild) {
            view[i] = Util.random(3, 13);
        }
    }

    if (Util.probability(70)) {
        //                                              
        var leftWildSymNum = genWildNum - num;
        var randWildCnt = 0;
        if (leftWildSymNum != 0) {
            if (leftWildSymNum < 2) {
                randWildCnt = 1;
            } else {
                randWildCnt = Util.random(1, 2);
            }
        }

        //                                    
        for (var i = 0; i < randWildCnt; i++) {
            wildPosList.push(16);
        }
        for (var i = 0; i < randWildCnt; i++) {
            while (true) {
                var wildPos = Util.random(0, 15);
                var counter = 0;
                for (var j = 0; j < wildPosList.length; j++) {
                    if (wildPosList[j] == wildPos) {
                        counter++;
                    }
                }
                if (counter == 0) {
                    wildPosList[i] = wildPos;
                    break;
                }
            }
        }
        for (var i = 0; i < wildPosList.length; i++) {
            view[wildPosList[i]] = wild;
        }

        return view;
    } else {
        return view;
    }
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinLinesFromView = function (view, bpl, isBonus = false) {
    var defaultpayLines = [];
    var winLines = [];

    if (isBonus) {
        defaultpayLines = bonusPayLine;
    } else {
        defaultpayLines = payLines;
    }

    for (var lineId = 0; lineId < defaultpayLines.length; lineId++) {
        var line = defaultpayLines[lineId];
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