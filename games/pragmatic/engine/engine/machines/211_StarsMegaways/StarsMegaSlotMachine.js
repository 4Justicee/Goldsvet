var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 20;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];

    this.wildViewCache = {};

    this.rwdStr = "";
    this.epStr = "";
    this.srfStr = "";
    this.isView = [];
    this.wildFlag = false;
    this.stickyStr = "";
    this.stickySpinCacheList = [];
    //                           
    this.freeSpinType = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinData = {};
    this.freeSpinCacheList = [];

    this.addedScatterNum = 0;
    this.nugeStr = "";

    //             
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.jackpotType = ["FREE"];

    this.highPercent = 2;
    this.normalPercent = 20;
};

var scatter = 1, wild = 2, empty = 14;
var slotWidth = 6, slotHeight = 7;
var baseReels = [
    [3, 3, 7, 7, 6, 6, 8, 9, 9, 6, 6, 7, 7, 11, 11, 3, 3, 5, 5, 1, 11, 11, 12, 12, 9, 9, 10, 10, 8, 8, 9, 9, 11, 11, 4, 4, 8, 8, 10, 10, 11, 11, 8, 8, 4, 4, 11, 11, 5, 5, 1, 9, 9, 11, 11, 8, 8, 3, 3, 6, 6, 8, 8, 11, 11, 12, 12, 7, 7, 10, 10, 1, 9, 9, 7, 7, 6, 6, 12, 12, 12, 10, 10, 10, 5, 5, 8, 8],
    [3, 3, 10, 10, 9, 9, 8, 5, 5, 10, 10, 10, 4, 4, 11, 11, 6, 6, 11, 11, 11, 10, 10, 12, 12, 12, 9, 9, 9, 5, 5, 11, 11, 11, 7, 7, 1, 8, 8, 11, 11, 7, 7, 8, 8, 6, 6, 7, 7, 7, 8, 8, 9, 9, 7, 7, 4, 4, 11, 11, 11, 9, 9, 9, 5, 5, 6, 6, 6, 1, 5, 5, 3, 3, 12, 12, 12, 7, 7, 7, 4, 4, 8, 8],
    [3, 3, 6, 6, 10, 10, 10, 4, 10, 10, 8, 8, 8, 1, 12, 12, 10, 10, 3, 3, 7, 7, 8, 8, 7, 7, 7, 12, 12, 10, 10, 11, 11, 6, 6, 1, 8, 8, 11, 11, 11, 6, 6, 12, 12, 12, 5, 5, 5, 4, 4, 10, 10, 10, 5, 5, 7, 7, 9, 9, 9, 5, 5, 1, 11, 11, 9, 9, 10, 10, 10, 8, 8, 11, 11, 7, 7, 7, 7, 11, 11, 11, 6, 6, 6],
    [3, 3, 6, 6, 12, 12, 12, 4, 10, 10, 8, 8, 8, 1, 12, 12, 10, 10, 3, 3, 7, 7, 8, 8, 7, 7, 7, 12, 12, 10, 10, 11, 11, 6, 6, 1, 8, 8, 11, 11, 11, 6, 6, 12, 12, 12, 5, 5, 5, 4, 4, 10, 10, 10, 5, 5, 7, 7, 9, 9, 9, 5, 5],
    [3, 3, 10, 10, 9, 9, 8, 5, 5, 10, 10, 10, 4, 4, 11, 11, 6, 6, 11, 11, 11, 10, 10, 12, 12, 12, 9, 9, 9, 5, 5, 12, 12, 12, 7, 7, 1, 8, 8, 12, 12, 7, 7, 8, 8, 6, 6, 7, 7, 7, 8, 8, 9, 9, 7, 7, 4, 4, 12, 12, 12, 9, 9, 9, 5, 5, 6, 6, 6, 1, 5, 5, 3, 3, 12, 12, 12, 7, 7, 7, 4, 4, 8, 8],
    [3, 3, 7, 7, 6, 6, 8, 9, 9, 6, 6, 7, 7, 11, 11, 3, 3, 5, 5, 11, 11, 12, 12, 9, 9, 10, 10, 8, 8, 9, 9, 12, 12, 4, 4, 8, 8, 10, 10, 12, 12, 8, 8, 4, 4, 12, 12, 5, 5, 1, 9, 9, 12, 12, 8, 8, 3, 3, 6, 6, 8, 8, 11, 11, 12, 12, 7, 7, 10, 10, 1, 9, 9, 7, 7, 6, 6, 12, 12, 12, 10, 10, 10, 5, 5, 8, 8]
];
var freeReels = [
    [7, 7, 6, 6, 9, 9, 6, 6, 7, 7, 8, 8, 12, 12, 5, 5, 11, 11, 12, 12, 10, 10, 8, 8, 9, 9, 12, 12, 12, 12, 4, 4, 8, 8, 6, 6, 11, 11, 8, 8, 4, 4, 5, 5, 9, 9, 11, 11, 9, 9, 3, 3, 8, 8, 6, 6, 11, 11, 7, 7, 10, 10, 9, 9, 7, 7, 6, 6, 10, 10, 10, 5, 5, 8, 8, 10, 10, 11, 11, 8, 8],
    [11, 11, 11, 6, 6, 5, 5, 12, 12, 4, 4, 10, 10, 6, 6, 8, 8, 8, 10, 10, 12, 12, 12, 5, 5, 10, 10, 10, 7, 7, 7, 8, 8, 7, 7, 8, 8, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 7, 7, 4, 4, 9, 9, 9, 6, 6, 6, 6, 5, 5, 5, 5, 3, 3, 12, 12, 12, 4, 4, 8, 8, 9, 9, 11, 11, 11, 12, 12, 12],
    [10, 10, 8, 8, 8, 5, 5, 3, 3, 12, 12, 8, 8, 7, 7, 7, 10, 10, 11, 11, 12, 12, 8, 8, 11, 11, 11, 11, 6, 6, 5, 5, 5, 4, 4, 10, 10, 10, 5, 5, 7, 7, 7, 9, 9, 9, 5, 5, 9, 9, 12, 12, 10, 10, 10, 10, 11, 11, 12, 12, 7, 7, 7, 7, 6, 6, 6, 4, 4, 3, 3, 6, 6, 6, 4, 4],
    [10, 10, 8, 8, 8, 5, 5, 3, 3, 12, 12, 8, 8, 7, 7, 7, 10, 10, 11, 11, 12, 12, 8, 8, 11, 11, 11, 11, 6, 6, 5, 5, 5, 4, 4, 10, 10, 10, 5, 5, 7, 7, 7, 9, 9, 9, 5, 5, 9, 9, 12, 12, 10, 10, 10, 10, 11, 11, 12, 12, 7, 7, 7, 7, 6, 6, 6, 4, 4, 3, 3, 6, 6, 6, 4, 4],
    [11, 11, 11, 6, 6, 5, 5, 12, 12, 4, 4, 9, 9, 6, 6, 8, 8, 8, 10, 10, 12, 12, 12, 5, 5, 10, 10, 10, 7, 7, 7, 8, 8, 7, 7, 8, 8, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 7, 7, 4, 4, 9, 9, 9, 6, 6, 6, 6, 5, 5, 5, 5, 3, 3, 12, 12, 12, 4, 4, 8, 8, 9, 9, 11, 11, 11, 12, 12, 12],
    [7, 7, 6, 6, 9, 9, 6, 6, 7, 7, 8, 8, 12, 12, 5, 5, 11, 11, 12, 12, 10, 10, 8, 8, 9, 9, 12, 12, 12, 12, 4, 4, 8, 8, 6, 6, 11, 11, 8, 8, 4, 4, 5, 5, 9, 9, 11, 11, 9, 9, 3, 3, 8, 8, 6, 6, 11, 11, 7, 7, 10, 10, 9, 9, 7, 7, 6, 6, 10, 10, 10, 5, 5, 8, 8, 10, 10, 11, 11, 8, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 8, 6, 5, 5, 4, 4, 2, 2, 2, 0, 0],
    [0, 0, 0, 15, 12, 10, 8, 8, 6, 6, 5, 5, 5, 0, 0],
    [0, 0, 0, 30, 15, 12, 10, 10, 8, 8, 7, 7, 7, 0, 0],
    [0, 0, 0, 50, 20, 15, 12, 12, 10, 10, 8, 8, 8, 0, 0]
];
var percentList = {
    freeWinPercent: 30,
    longReelPercent: 50,
    shortReelPercent: 10,
    reelChangePercent: 50,
};
var reelSizeList = [2, 3, 4, 5, 6, 7];

SlotMachine.prototype.Init = function () {
    this.highPercent = 0; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;


    this.wildFlag = false;
    this.winMoney = 0;
    this.winLines = [];

    this.stickyStr = "";
    this.rwdStr = "";
    this.epStr = "";
    this.srfStr = "";

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        if (viewCache.view.s && viewCache.view.s != null) {
            this.wildViewCache = viewCache.view;
            this.view = this.wildViewCache.s;
            this.wildFlag = true;
        } else {
            this.view = viewCache.view;
            this.wildFlag = false;
        }
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.stickySpinCacheList = viewCache.stickyList && viewCache.stickyList;
        this.view = this.freeSpinCacheList[0];
        this.addedScatterNum = viewCache.plusNum;
        this.nugeStr = viewCache.nugeStr;
    }

    if (this.wildFlag) {
        this.rwdStr = this.wildViewCache.rwdStr;
        this.epStr = this.wildViewCache.epStr;
        this.srfStr = this.wildViewCache.srfStr;
        this.isView = this.wildViewCache.is;
    }

    var { winMoney, winLines } = WinFromView(this.view, player.betPerLine);
    this.winMoney = winMoney;

    var lines = [];
    for (var i = 0; i < winLines.length; i++) {
        var cache = winLines[i];
        if (i == winLines.length - 1) {
            lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~r`);
        } else {
            lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~l`);
        }
    }
    this.winLines = lines.join(';');

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
        this.freeSpinLength = FreeSpinCountsFromView(this.view, this.addedScatterNum);
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    if (this.view.s && this.view.s != null) {
        this.wildViewCache = this.view;
        this.view = this.wildViewCache.s;
        this.wildFlag = true;
        if (this.stickySpinCacheList.length > 0) {
            this.stickyStr = this.stickySpinCacheList[this.freeSpinIndex - 1];
        }
    } else {
        this.view = this.view;
        this.wildFlag = false;
    }

    var { winMoney, winLines } = WinFromView(this.view, player.betPerLine);
    this.winMoney = winMoney;

    var lines = [];
    for (var i = 0; i < winLines.length; i++) {
        var cache = winLines[i];
        lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~r`);
    }
    this.winLines = lines.join(';');

    if (this.wildFlag) {
        this.rwdStr = this.wildViewCache.rwdStr;
        this.epStr = this.wildViewCache.epStr;
        this.srfStr = this.wildViewCache.srfStr;
        this.isView = this.wildViewCache.is;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength) {
        this.stickyStr = "";
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    if (baseWin > 0) {
        var { view, winMoney } = RandomWinView(baseReels, bpl, baseWin);
        pattern.win = winMoney;
        pattern.view = view;
    } else {
        var { view, winMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = winMoney;
        pattern.view = view;
    }

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
        default: break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl).winMoney;

    var nugeStr = null;

    if (Util.probability(20)) {
        nugeStr = AddScatterByNuge(scatterView);
        var sccaterCount = FreeSpinCountsFromView(scatterView, nugeStr.plusNum);
    } else {
        var sccaterCount = FreeSpinCountsFromView(scatterView, 0);
    }

    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           
    var cache = RandomFreeViewCache(freeReels, bpl, fsWin, sccaterCount);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        stickyList: cache.stickyList,
        nugeStr: nugeStr ? nugeStr.res : "",
        plusNum: nugeStr ? nugeStr.plusNum : 0,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };

}

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin, wildRes = null;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels);
        if (isFreeSpinWin(tmpView)) {
            continue;
        }

        if (Util.probability(40)) {
            wildRes = GenerateRandomWildView(tmpView);
            tmpWin = WinFromView(wildRes.s, bpl).winMoney;
        } else {
            tmpWin = WinFromView(tmpView, bpl).winMoney;
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return {
        view: wildRes ? wildRes : tmpView,
        winMoney: tmpWin
    };
};

var RandomZeroView = function (reels, bpl) {

    while (true) {
        var view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        var winMoney = WinFromView(view, bpl).winMoney;

        if (winMoney == 0) {
            return { view, winMoney };
        }
    }
};

var RandomView = function (reels, reelSizes = []) {
    while (true) {
        var view = [];
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            var reelSize;
            if (reelSizes.length > 0) {
                reelSize = reelSizes[i];
                if (Util.probability(percentList.reelChangePercent)) {
                    reelSize = Util.random(reelSize, slotHeight);
                }
            } else if (Util.probability(percentList.longReelPercent)) {
                reelSize = reelSizeList[Util.random(0, reelSizeList.length)];
            } else if (Util.probability(percentList.shortReelPercent)) {
                reelSize = reelSizeList[Util.random(0, reelSizeList.length / 3 * 2)];
            } else {
                reelSize = reelSizeList[Util.random(0, reelSizeList.length / 3)];
            }

            for (var j = 0; j < reelSize; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view[viewPos] = reels[i][reelPos];
            }
            for (var j = reelSize; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                view[viewPos] = empty;
            }
        }

        if (isIncludeWild(view)) {
            continue;
        } else {
            return view;
        }
    }
};

var RandomScatterView = function (reels) {
    while (true) {
        var view = RandomView(reels);

        if (isFreeSpinWin(view) && isIncludeWild(view) == false) {
            return view;
        }
    }
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
        freeSpinData.viewList = [],
            freeSpinData.stickyList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        var stickyView = [];
        while (true) {
            var fsview, fsWin;

            //                                       
            if (stickyView.length > 0) {
                fsview = GenerateStickyView(stickyView);
            } else {
                fsview = RandomView(reels);
            }

            if (Util.probability(10)) {
                var wildRes = GenerateRandomWildView(fsview, true);

                fsWin = WinFromView(wildRes.s, bpl).winMoney;

                stickyView = wildRes.s;

                var stickyStr = GenerateStickyStr(stickyView);

                freeSpinData.viewList.push(wildRes);

                freeSpinData.stickyList.push(stickyStr);
            } else {
                var stickyStr = GenerateStickyStr(stickyView);

                freeSpinData.viewList.push(fsview);

                freeSpinData.stickyList.push(stickyStr);

                fsWin = WinFromView(fsview, bpl).winMoney;
            }

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

//                               
var GenerateRandomWildView = function (view, isfree = false) {
    var initResultView = Util.clone(view);
    var resultView = Util.clone(view);
    var initViewPos = [];
    var rwdStr = ""; //                                                     
    var srfStr = ""; //                                                  
    var epStr = ""; //                                                           

    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] != empty) {
            initViewPos.push(i); //                                              
        }
    }

    var randWildNum = Util.random(1, 2); //                      
    var randWildPosArr = []; //                                        

    for (var i = 0; i < randWildNum; i++) {
        while (true) {
            var pos = Util.random(0, initViewPos.length); //                                       
            //                       1                                                           .
            if (initViewPos[pos] % slotWidth == 5 || initViewPos[pos] % slotWidth == 0) {
                continue;
            }

            var randVal = initViewPos[pos];

            if (randWildPosArr.indexOf(randVal) == -1) {
                if (isfree) {
                    if (randVal != wild) {
                        randWildPosArr.push(randVal); //                                                                                                                                 .
                    } else {
                        continue;
                    }
                } else {
                    randWildPosArr.push(randVal);
                }
                break;
            }
        }
    }

    var tempSelectedWildReel = []; //                              

    //                                                                  
    for (var i = 0; i < randWildPosArr.length; i++) {
        var selectWildReel = [];
        for (var j = 0; j < slotHeight; j++) {
            var selectWildPos = j * slotWidth + randWildPosArr[i] % slotWidth;
            if (resultView[selectWildPos] != empty) {
                selectWildReel.push(selectWildPos);
                tempSelectedWildReel.push(selectWildPos);
            }
        }
        for (var k = 0; k < selectWildReel.length; k++) {
            // if (resultView[selectWildReel[k]] != empty) {
            resultView[selectWildReel[k]] = wild;
            // }
        }
    }

    //                          
    for (var i = 0; i < randWildPosArr.length; i++) {
        var str = `13~${randWildPosArr[i]};`;
        rwdStr = rwdStr.concat(str);
    }

    rwdStr = rwdStr.slice(0, rwdStr.length - 1);

    //           
    epStr = `13~${randWildPosArr.join()}~${tempSelectedWildReel.join()}`;

    //                                 

    srfStr = `13~2~${tempSelectedWildReel.sort(function (a, b) { return a - b }).join()}`;

    return {
        rwdStr: rwdStr,
        epStr: epStr,
        srfStr: srfStr,
        is: initResultView,
        s: resultView
    }
}

//                                                                                
var GenerateStickyView = function (stickyView) {
    var newView = RandomView(freeReels);
    var initStickyView = Util.clone(stickyView);
    var initStickyPos = [];

    for (var i = 0; i < initStickyView.length; i++) {
        if (initStickyView[i] == wild) {
            initStickyPos.push(i);
        }
    }

    for (var i = 0; i < initStickyPos.length; i++) {
        newView[initStickyPos[i]] = wild;
    }

    return newView;
}

//                                                   
var AddScatterByNuge = function (scatterView) {
    var initScatterNum = NumberOfScatters(scatterView);
    var initView = Util.clone(scatterView);
    var initScatterPos = []; //                        
    var initScatterReel = []; //                                  
    var resultScatterReel = []; //                  

    for (var i = 0; i < initView.length; i++) {
        if (initView[i] == scatter) {
            initScatterPos.push(i); //                       
        }
    }

    for (var i = 0; i < initScatterPos.length; i++) {
        initScatterReel.push(initScatterPos[i] % slotWidth);
    }

    // [1.3.5]
    var reelArr = [0, 1, 2, 3, 4, 5];
    for (var i = 0; i < initScatterReel.length; i++) {
        reelArr.splice(reelArr.indexOf(initScatterReel[i]), 1);
    }

    // 1~1~7,1,14,14,14,14,14~64~-1;
    var result = [];
    var addScatterNum = Util.random(1, 6 - initScatterNum);

    for (var i = 0; i < addScatterNum; i++) {
        var randSymNum = Util.random(2, 6);
        var nugeStr = [];

        for (var j = 0; j < randSymNum; j++) {
            var randSymbol = Util.random(3, 13);
            nugeStr.push(randSymbol);
        }

        nugeStr[Util.random(0, randSymNum)] = scatter; //                                                           

        for (var k = 0; k < slotHeight - randSymNum; k++) {
            nugeStr.push(empty);
        }
        var resultNugeStr = `${reelArr[i]}~1~${nugeStr.join()}~${Util.random(0, 100)}~-1`;

        result.push(resultNugeStr);
    }

    return {
        res: result.join(";"),
        plusNum: addScatterNum
    };
}

//                                                 
var GenerateStickyStr = function (stickyView) {
    var initView = Util.clone(stickyView);
    var resultView = [];
    for (var i = 0; i < initView.length; i++) {
        if (initView[i] == wild) {
            resultView.push(i);
        }
    }

    resultView.sort(function (a, b) { return a - b });

    var stickyResult = [];
    for (var i = 0; i < resultView.length; i++) {
        stickyResult.push(`${resultView[i]},${resultView[i]}`)
    }

    return stickyResult.join('~');
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

//                   
// 4~900.00~1~3~7,8,12~r;6~900.00~1~4~0,3,7,8~r;13~120.00~2~3~2,6,7,8~r
// 4~900.00~1~3~7,8,12~r;
// 6~900.00~1~4~0,3,7,8~r;
// 13~120.00~2~3~2,6,7,8~r
//           4,6,13                                 .
//                          
//                                                                          .                           
//                                                                                      
//                                                                  (               )
//              r                             .
var WinFromView = function (view, bpl) {
    var winMoney = 0;
    var winLines = [];
    var searchedLeft = [false, false, false, false, false, false, false]; //                                       
    var searchedRight = [false, false, false, false, false, false, false]; //                                          

    //                                                             
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (searchedLeft[i]) {
            continue;
        }

        var history = [pos];
        searchedLeft[i] = true;
        var symbolId = view[pos];
        var count = 1;

        for (var j = i + 1; j < slotHeight; j++) {
            var searchPos = j * slotWidth;
            if (view[searchPos] == symbolId && !searchedLeft[j]) {
                history.push(searchPos);
                searchedLeft[j] = true;
                count++;
            }
        }

        winMoney += RecursiveSearchLeftToRight(view, bpl, 1, count, history, symbolId, winLines);
    }

    //                                                                
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth + slotWidth - 1;
        if (searchedRight[i]) {
            continue;
        }

        var history = [pos];
        searchedRight[i] = true;
        var symbolId = view[pos];
        var count = 1;

        for (var j = i + 1; j < slotHeight; j++) {
            var searchPos = j * slotWidth + slotWidth - 1;
            if (view[searchPos] == symbolId && !searchedRight[j]) {
                history.push(searchPos);
                searchedRight[j] = true;
                count++;
            }
        }

        winMoney += RecursiveSearchRightToLeft(view, bpl, 1, count, history, symbolId, winLines);
    }

    return { winMoney, winLines };
}

var RecursiveSearchLeftToRight = function (view, bpl, length, count, history, symbolId, winLines) {
    //                                                             
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (length == slotWidth) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
        }

        var winMoney = bpl * payTable[length][symbolId] * count * wildMulti;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);
        }
        return winMoney;
    }

    //                                                                                            
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = length + i * slotWidth;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
        }

        var winMoney = bpl * payTable[length][symbolId] * count * wildMulti;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);
        }
        return winMoney;
    }

    var matchCount = 0;
    var historyTmp = [...history];
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;
    return RecursiveSearchLeftToRight(view, bpl, length + 1, matchCount, historyTmp, symbolId, winLines);
}

//                                   ....
var RecursiveSearchRightToLeft = function (view, bpl, length, count, history, symbolId, winLines) {
    //                                                             
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (length == slotWidth) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
        }

        var winMoney = bpl * payTable[length][symbolId] * count * wildMulti;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);
        }
        return winMoney;
    }

    //                                                                                            
    var positionsByStep = [];

    for (var i = 1; i < slotHeight + 2; i++) {
        var pos = i * slotWidth - length - 1;
        //                                          
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
        }

        var winMoney = bpl * payTable[length][symbolId] * count * wildMulti;
        if (winMoney > 0) {
            var winLineCache = {
                length: length,
                count: count,
                lines: history,
                money: winMoney,
                symbol: symbolId,
            };
            winLines.push(winLineCache);
        }
        return winMoney;
    }

    var matchCount = 0;
    var historyTmp = [...history];
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;
    return RecursiveSearchRightToLeft(view, bpl, length + 1, matchCount, historyTmp, symbolId, winLines);
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

var isIncludeWild = function (view) {
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            return true;
        }
    }
    return false;
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

var FreeSpinCountsFromView = function (view, addedNum) {
    var len = NumberOfScatters(view) + addedNum;
    switch (len) {
        case 3: return 6;
        case 4: return 8;
        case 5: return 10;
        case 6: return 15;
    }
}

module.exports = SlotMachine;