var Util = require("../../../utils/slot_utils");

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
    this.multiPositions = [];
    this.multiValues = [];
    //                           
    this.freeSpinType = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinData = {};
    this.freeSpinCacheList = [];
    this.freeSpinStickyArr = [];
    this.freeSpinSticky = "";
    this.freeSpinOption = "";
    this.rainningWild = "";
    //             
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 20;
    this.jackpotType = ["FREE"];
    this.highPercent = 2;
    this.normalPercent = 20;

    this.buyMulti = 100;
    this.buyPatternCount = 50;
};

var scatter = 1, wild = 2, wild2X = 15, wild3X = 16, empty = 14;
var slotWidth = 6, slotHeight = 7;
var baseReels = [
    [4, 4, 4, 1, 10, 3, 13, 13, 13, 12, 6, 12, 12, 12, 8, 11, 11, 11, 11, 5, 8, 8, 8, 7, 4, 9, 9, 9, 9, 13, 5, 5, 5, 6, 6, 6, 7, 1, 8, 13, 6, 8, 12, 6, 9, 8, 9, 8, 5, 6, 1, 11, 12, 11, 13, 8, 9, 8, 12, 6, 11, 8, 13, 6],
    [8, 9, 9, 9, 13, 7, 11, 13, 13, 13, 6, 11, 11, 11, 9, 1, 12, 5, 10, 5, 5, 5, 4, 8, 8, 8, 12, 12, 12, 4, 4, 4, 9, 13, 12, 4, 11, 3, 13, 12, 4, 2, 9, 5, 12, 9, 4, 5, 4, 6, 4, 13, 5, 13, 12, 13],
    [11, 11, 11, 8, 7, 1, 13, 13, 3, 13, 13, 12, 12, 12, 9, 9, 9, 9, 4, 5, 5, 5, 10, 4, 4, 4, 11, 5, 12, 6, 12, 4, 9, 12, 2, 13, 5, 2],
    [4, 4, 4, 4, 9, 9, 9, 11, 13, 13, 13, 5, 7, 12, 12, 3, 12, 12, 1, 5, 5, 5, 8, 13, 11, 11, 11, 6, 10, 9, 5, 13, 9, 11, 9, 9, 12, 9, 5, 13, 5, 7, 9, 5, 5, 9, 13, 5, 13],
    [11, 12, 12, 12, 1, 10, 9, 12, 11, 11, 3, 11, 13, 5, 5, 5, 8, 7, 4, 5, 2, 6, 4, 4, 4, 13, 13, 13, 9, 9, 9, 12, 7, 4, 5],
    [10, 12, 12, 12, 11, 8, 8, 8, 3, 8, 6, 1, 11, 11, 11, 9, 5, 5, 5, 5, 13, 12, 6, 6, 6, 7, 4, 13, 13, 13, 9, 9, 9, 4, 4, 4, 6, 12, 5, 4, 8, 5, 12, 6, 5, 4, 5, 4, 6, 5, 8, 7, 9, 8, 9, 13, 4, 6, 13, 8, 4, 12, 6, 12, 7, 1, 13, 11, 5, 8, 9, 6, 8, 5, 9, 5, 9, 5, 12],
];
var freeReels = [
    [3, 6, 6, 6, 12, 13, 13, 13, 11, 7, 4, 9, 11, 11, 11, 8, 10, 9, 9, 3, 9, 13, 8, 8, 8, 6, 5, 5, 5, 5, 12, 12, 12, 4, 4, 4, 13, 12, 11, 13, 9, 11, 5],
    [12, 12, 12, 3, 6, 7, 8, 2, 8, 8, 10, 4, 4, 4, 2, 13, 4, 13, 13, 13, 8, 9, 12, 9, 9, 9, 2, 11, 11, 11, 11, 5, 5, 5, 7, 13, 5, 7, 5, 13, 2, 5, 6, 13, 5, 4, 8, 7, 5, 11, 5, 9, 5, 11, 8, 3],
    [6, 13, 7, 11, 11, 2, 11, 10, 12, 12, 12, 5, 12, 4, 4, 4, 4, 2, 11, 9, 9, 9, 8, 3, 9, 5, 5, 2, 5, 13, 13, 13, 8, 8, 2, 8, 12, 10, 9, 12, 11, 7, 4, 5, 10, 12, 2, 8, 9, 4, 9, 13, 5, 8, 13, 5, 4, 8, 12, 7, 9, 10, 13, 7, 10, 11, 4, 5, 4, 7, 4, 5, 4, 7, 8, 5, 7, 9, 5, 7, 13, 4],
    [4, 4, 4, 5, 8, 9, 9, 9, 6, 3, 9, 8, 8, 8, 12, 10, 5, 5, 5, 11, 12, 12, 12, 7, 4, 13, 11, 11, 11, 2, 13, 13, 13, 8, 8, 6, 11, 12, 8, 9],
    [13, 5, 4, 2, 4, 4, 8, 11, 9, 9, 9, 9, 10, 3, 2, 12, 4, 6, 7, 5, 5, 2, 5, 11, 11, 11, 13, 13, 13, 8, 8, 2, 8, 12, 12, 12, 8, 2, 9, 10, 4, 10, 12, 8, 5],
    [4, 9, 9, 9, 10, 12, 12, 12, 7, 11, 6, 12, 9, 5, 13, 13, 13, 13, 11, 11, 11, 8, 8, 8, 8, 4, 4, 4, 5, 5, 5, 6, 6, 6, 13, 8, 5, 12, 13, 12, 11, 10, 11, 8, 6, 5, 10, 9, 13, 5, 13, 5, 12, 13, 8, 5, 8, 13, 5, 12, 13, 5, 12, 8, 3, 6, 5, 6, 5, 11, 5, 10, 8, 13, 5, 8, 5, 12, 8, 11, 5, 8, 5, 8, 13, 11, 10, 5, 12, 13, 12, 13, 12, 6],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 15, 10, 7, 4, 3, 3, 2, 2, 2, 1, 1, 0, 0, 0],
    [0, 0, 0, 40, 20, 15, 10, 8, 8, 4, 4, 4, 2, 2, 0, 0, 0],
    [0, 0, 0, 60, 30, 20, 15, 10, 10, 6, 6, 6, 4, 4, 0, 0, 0],
    [0, 0, 0, 150, 60, 40, 30, 30, 30, 20, 20, 20, 10, 10, 0, 0, 0],
];
var percentList = {
    freeWinPercent: 30,
    longReelPercent: 50,
    shortReelPercent: 10,
    reelChangePercent: 50,
    wild3XPercent: 10,
    wild2XPercent: 35,
    // wildPercent : 10
};
var reelSizeList = [2, 3, 4, 5, 6, 7];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

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

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "FREE") {
        this.freeSpinData = viewCache.view;

        this.view = this.freeSpinData.scatterView;
        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
    }

    var result = MultisFromView(this.view);
    this.multiPositions = result.positions;
    this.multiValues = result.values;

    var { winMoney, winLines } = WinFromView(this.view, player.betPerLine);
    this.winMoney = winMoney;
    var lines = [];
    for (var i = 0; i < winLines.length; i++) {
        var cache = winLines[i];
        lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~l`);
    }
    this.winLines = lines.join(";");

    this.view = GetFinalView(this.view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = 0;
        this.currentGame = "FREE";

        var rainningCount = FreeSpinCountsFromView(this.view, 0);
        var stickyCount = FreeSpinCountsFromView(this.view, 1);
        this.freeSpinOption = `${rainningCount},1,0~${stickyCount},1,0`;
    }
};

SlotMachine.prototype.FreeSpinOption = function (player, index) {
    this.freeSpinType = Number(index);
    this.freeSpinLength = FreeSpinCountsFromView(this.view, index);

    var cache;
    if (index == 1) {
        cache = this.freeSpinData.sticky;
    } else {
        cache = this.freeSpinData.raining;
    }

    //                                        
    this.freeSpinCacheList = cache.viewList;
    this.multiPositions = [];
    this.multiValues = [];
    this.freeSpinSticky = "";
    this.freeSpinStickyArr = [];
};

SlotMachine.prototype.FreeSpin = function (player) {
    freeView = this.freeSpinCacheList[this.freeSpinIndex - 1];
    var multi = MultisFromView(freeView);
    this.multiPositions = multi.positions;
    this.multiValues = multi.values;

    var { winMoney, winLines } = WinFromView(freeView, player.betPerLine);
    this.winMoney = winMoney;
    var lines = [];
    for (var i = 0; i < winLines.length; i++) {
        var cache = winLines[i];
        lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~l`);
    }
    this.winLines = lines.join(";");

    this.rainningWild = "";
    var newWilds = GetNewWilds(this.view, freeView);

    this.view = GetFinalView(freeView);
    this.maskView = GetMaskView(freeView);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    var wildPositions = [];
    for (var i = 0; i < this.view.length; i++) {
        if (isWild(this.view[i])) {
            wildPositions.push(i);
        }
    }

    if (this.freeSpinType == 1) {
        if (newWilds.length > 0) {
            var wilds = [];
            for (var i = 0; i < newWilds.length; i++) {
                wilds.push(`${freeView[newWilds[i]]}~${newWilds[i]}`);
                this.freeSpinStickyArr.push(newWilds[i]);
            }
            this.rainningWild = wilds.join(";");
        }

        var stickys = [];
        for (var i = this.freeSpinStickyArr.length - 1; i >= 0; i--) {
            stickys.push(`${this.freeSpinStickyArr[i]},${this.freeSpinStickyArr[i]}`);
        }
        this.freeSpinSticky = stickys.join(`~`);
    } else {
        var wildArr = [],
            wild2XArr = [],
            wild3XArr = [];
        for (var i = 0; i < wildPositions.length; i++) {
            var pos = wildPositions[i];
            switch (freeView[pos]) {
                case wild:
                    wildArr.push(pos);
                    break;
                case wild2X:
                    wild2XArr.push(pos);
                    break;
                case wild3X:
                    wild3XArr.push(pos);
                    break;
            }
        }
        var wilds = [];
        if (wildArr.length > 0) {
            wilds.push(`${wild}~${wildArr.join()}`);
        }
        if (wild2XArr.length > 0) {
            wilds.push(`${wild2X}~${wild2XArr.join()}`);
        }
        if (wild3XArr.length > 0) {
            wilds.push(`${wild3X}~${wild3XArr.join()}`);
        }
        this.rainningWild = wilds.join(";");
    }

    // if (this.freeSpinSticky.length > 0) {
    //     playingUser.printLog(`sty = ${this.freeSpinSticky}`);
    // }
    // if (this.rainningWild.length > 0) {
    //     playingUser.printLog(`rwd = ${this.rainningWild}`);
    // }

    this.freeSpinWinMoney += this.winMoney;

    // playingUser.printLog(`             ${this.freeSpinIndex}       / (${this.freeSpinLength}) :              (${this.winMoney})`)

    this.freeSpinIndex++;

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";

        //                       
        if (this.freeSpinType == 1) {
            stickys = [];
            for (var i = this.freeSpinStickyArr.length - 1; i >= 0; i--) {
                stickys.push(`${this.freeSpinStickyArr[i]},-1`);
            }
            this.freeSpinSticky = stickys.join(`~`);
            this.rainningWild = "";
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
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
        default:
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl).winMoney;

    var freeSpinData = {
        scatterView: scatterView,
    };

    var freeSpinStickyCache = RandomFSStickyPattern(freeReels, bpl, fsWin, FreeSpinCountsFromView(freeSpinData.scatterView, 1));
    var freeSpinRainingCache = RandomFSRainingPattern(freeReels, bpl, fsWin, FreeSpinCountsFromView(freeSpinData.scatterView, 0));

    freeSpinData.sticky = freeSpinStickyCache;
    freeSpinData.raining = freeSpinRainingCache;

    var pattern = {
        win: Util.max(freeSpinStickyCache.win + scatterWinMoney, freeSpinRainingCache.win + scatterWinMoney),
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };

    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels);
    var scatterWinMoney = WinFromView(scatterView, bpl).winMoney;

    var freeSpinData = {
        scatterView: scatterView,
    };

    var freeSpinStickyCache;

    while (true) {
        freeSpinStickyCache = FSStickyPattern(freeReels, bpl, FreeSpinCountsFromView(freeSpinData.scatterView, 1));

        if (freeSpinStickyCache.win > bpl * this.lineCount * 20) {
            break;
        }
    }

    var freeSpinRainingCache = RandomFSRainingPattern(freeReels, bpl, freeSpinStickyCache.win, FreeSpinCountsFromView(freeSpinData.scatterView, 0));

    freeSpinData.sticky = freeSpinStickyCache;
    freeSpinData.raining = freeSpinRainingCache;

    var pattern = {
        win: Util.max(freeSpinStickyCache.win + scatterWinMoney, freeSpinRainingCache.win + scatterWinMoney),
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: 0,
    };

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels, []);
        if (isFreeSpinWin(tmpView)) {
            continue;
        }
        if (Util.probability(10) && isIncludeWild(tmpView)) {
            continue;
        }

        tmpWin = WinFromView(tmpView, bpl).winMoney;

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return { view: tmpView, winMoney: tmpWin };
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels, []);

        if (isFreeSpinWin(view)) {
            continue;
        }

        if (Util.probability(10) && isIncludeWild(view)) {
            continue;
        }

        var winMoney = WinFromView(view, bpl).winMoney;

        if (winMoney == 0) {
            return { view, winMoney };
        }
    }
};

var RandomView = function (reels, reelSizes = [], rainingview = false) {
    while (true) {
        var view = [];

        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            var reelSize;
            if (reelSizes.length > 0) {
                reelSize = reelSizes[i];
                if (Util.probability(percentList.reelChangePercent)) {
                    reelSize = Util.random(reelSize, slotHeight + 1);
                }
            } else if (Util.probability(percentList.longReelPercent)) {
                reelSize = reelSizeList[Util.random(0, reelSizeList.length)];
            } else if (Util.probability(percentList.shortReelPercent)) {
                reelSize = reelSizeList[Util.random(0, (reelSizeList.length / 3) * 2)];
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

        if (!rainingview) {
            for (var i = 0; i < view.length; i++) {
                if (isWild(view[i])) {
                    if (Util.probability(percentList.wild2XPercent)) {
                        view[i] = wild2X;
                    } else if (Util.probability(percentList.wild3XPercent)) {
                        view[i] = wild3X;
                    }
                }
            }
        } else {
            for (var i = 0; i < view.length; i++) {
                if (isWild(view[i])) {
                    if (Util.probability(percentList.wild2XPercent)) {
                        view[i] = wild2X;
                    } else {
                        view[i] = wild3X;
                    }
                }
            }
        }

        //                                                        
        if (ExistWild2(view)) {
            continue;
        }

        if (rainingview) {
            for (var i = 0; i < view.length; i++) {
                if (Util.probability(25) && !isWild(view[i]) && view[i] != empty && i % slotWidth != 0 && i % slotWidth != slotWidth - 1) {
                    if (Util.probability(percentList.wild2XPercent)) {
                        view[i] = wild2X;
                    } else {
                        view[i] = wild3X;
                    }
                }
            }
        }

        return view;
    }
};

var RandomScatterView = function (reels) {
    var scatterCnt = 3;
    // if (Util.probability(10)) {
    //     scatterCnt = 4;
    // }

    while (true) {
        var view = RandomView(reels, []);

        if (isFreeSpinWin(view) && NumberOfScatters(view) >= scatterCnt) {
            return view;
        }
    }
};

var RandomFSStickyPattern = function (reels, bpl, fsWin, fsLen) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 1000; patternIndex++) {
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var freeSpinWinMoney = 0;

        var wildMultiPositions = [];
        var wildMultiValues = [];

        var freeSpinStickyCache = {};
        freeSpinStickyCache.viewList = [];

        var reelSizes = [];
        //                 1,2                    3                                                
        var wildReelList = [-1, 1, 2];
        // var wildReelList = [-1, -1];
        Util.shuffle(wildReelList);
        // index                           
        wildReelList.unshift(-999999);

        for (; freeSpinIndex <= freeSpinLength; freeSpinIndex++) {
            var freeView;

            while (true) {
                freeView = RandomView(reels, reelSizes);

                // if (freeSpinIndex == freeSpinLength - 5 && !checkWild2and3(freeView)) {
                //     continue;
                // }

                // if (freeSpinIndex == freeSpinLength - 5) {
                //     wildReelList = [];
                // }

                if (freeSpinIndex < wildReelList.length) {
                    var wildReelIndex = wildReelList[freeSpinIndex];

                    if (wildReelIndex < 0 && isIncludeWild(freeView)) {
                        continue;
                    }

                    if (wildReelIndex > 0) {
                        var validView = false;
                        for (var i = 0; i < slotHeight; i++) {
                            var viewPos = wildReelIndex + i * slotWidth;
                            if (isWild(freeView[viewPos])) {
                                validView = true;
                                break;
                            } else if (freeView[viewPos] == empty) {
                                break;
                            }
                        }
                        if (!validView) {
                            continue;
                        }
                    }
                } else {
                    // if (freeSpinIndex == freeSpinLength - 5 && !checkWild2and3(freeView)) {
                    //     continue;
                    // }
                }
                //                                                                                             

                break;
            }

            var view = GetWildStickyView(freeView, wildMultiPositions, wildMultiValues);
            for (var i = 0; i < slotWidth; i++) {
                var j = slotHeight;
                for (; j >= 1; j--) {
                    var viewPos = i + (j - 1) * slotWidth;
                    if (isWild(view[viewPos])) {
                        break;
                    }
                }
                reelSizes[i] = j > 2 ? j : 2;
            }

            freeSpinStickyCache.viewList.push(view);
            var winMoney = WinFromView(view, bpl).winMoney;

            var multi = GetWildMultisFromView(view);
            wildMultiPositions = multi.positions;
            wildMultiValues = multi.values;

            freeSpinWinMoney += winMoney;
        }

        freeSpinStickyCache.win = freeSpinWinMoney;
        freeSpinStickyCache.bpl = bpl;

        if (freeSpinStickyCache.win >= minMoney && freeSpinStickyCache.win <= maxMoney) {
            return freeSpinStickyCache;
        }

        if (freeSpinStickyCache.win > lowerLimit && freeSpinStickyCache.win < minMoney) {
            lowerLimit = freeSpinStickyCache.win;
            lowerView = freeSpinStickyCache;
        }
        if (freeSpinStickyCache.win > maxMoney && freeSpinStickyCache.win < upperLimit) {
            upperLimit = freeSpinStickyCache.win;
            upperView = freeSpinStickyCache;
        }
    }

    return lowerView ? lowerView : upperView;
};

var RandomFSRainingPattern = function (reels, bpl, fsWin, fsLen) {
    // var minMoney = fsWin * 0.5;
    // var maxMoney = fsWin;

    // minMoney = Util.max(minMoney, 0);
    // maxMoney = Util.max(maxMoney, 0);

    // var lowerLimit = -1,
    //     upperLimit = 100000000000000;
    // var lowerView = null,
    //     upperView = null;

    var maxPattern = null;

    var wildReelList = [-1, 1, 2, -1];
    Util.shuffle(wildReelList);
    wildReelList.unshift(-999999);

    for (var patternIndex = 0; patternIndex < 100; patternIndex++) {
        // while(true) {

        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var freeSpinWinMoney = 0;

        var freeSpinRainingCache = {};
        freeSpinRainingCache.viewList = [];

        for (; freeSpinIndex <= freeSpinLength; freeSpinIndex++) {
            var view;
            while (true) {
                view = RandomView(reels, [], true);

                var invalidView = false;

                // if (freeSpinIndex < wildReelList.length) {

                //     var wildReelIndex = wildReelList[freeSpinIndex];

                //     if (wildReelIndex < 0 && isIncludeWild(view)) {
                //         invalidView = true;
                //     }

                //     if (wildReelIndex > 0) {
                //         var validView = false;
                //         for (var i = 0; i < slotHeight; i++) {
                //             var viewPos = wildReelIndex + i * slotWidth;
                //             if (isWild(view[viewPos])) {
                //                 validView = true;
                //                 break;
                //             } else if (view[viewPos] == empty) {
                //                 break;
                //             }
                //         }
                //         if (!validView) {
                //             invalidView = true;
                //         }
                //     }
                // }

                //                                                                                             

                for (var i = 0; i < slotWidth; i++) {
                    var wildCountPerReel = 0;
                    for (var j = 0; j < slotHeight; j++) {
                        var viewPos = i + j * slotWidth;
                        if (isWild(view[viewPos])) {
                            wildCountPerReel++;
                        } else if (view[viewPos] == empty) {
                            break;
                        }
                    }
                    if (wildCountPerReel > 1) {
                        invalidView = true;
                        break;
                    }
                }

                if (invalidView) {
                    continue;
                }

                var win = WinFromView(view, bpl).winMoney;
                if (Util.probability(percentList.freeWinPercent) || win == 0) {
                    break;
                }
            }

            freeSpinRainingCache.viewList.push(view);
            var winMoney = WinFromView(view, bpl).winMoney;
            freeSpinWinMoney += winMoney;
        }

        freeSpinRainingCache.win = freeSpinWinMoney;
        freeSpinRainingCache.bpl = bpl;

        if (!maxPattern) {
            maxPattern = freeSpinRainingCache;
            continue;
        }

        if (maxPattern.win > fsWin && freeSpinRainingCache.win < maxPattern.win) {
            maxPattern = freeSpinRainingCache;
            continue;
        }

        if (maxPattern.win < fsWin && freeSpinRainingCache.win > maxPattern.win && freeSpinRainingCache.win < fsWin) {
            maxPattern = freeSpinRainingCache;
            continue;
        }
    }

    return maxPattern;
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
// 4~900.00~1~3~7,8,12~l;6~900.00~1~4~0,3,7,8~l;13~120.00~2~3~2,6,7,8~l

// 4~900.00~1~3~7,8,12~l;
// 6~900.00~1~4~0,3,7,8~l;
// 13~120.00~2~3~2,6,7,8~l
//           4,6,13                                 .
//                          
//                                                                          .                           
//                                                                                      
//                                                                  (               )
//              l                             .

var WinFromView = function (view, bpl) {
    var winMoney = 0;
    var winLines = [];
    var searched = [false, false, false, false, false, false, false];
    //                                          
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        if (searched[i]) {
            continue;
        }

        var history = [pos];
        searched[i] = true;
        var symbolId = view[pos];
        var count = 1;

        for (var j = i + 1; j < slotHeight; j++) {
            var searchPos = j * slotWidth;
            if (view[searchPos] == symbolId && !searched[j]) {
                history.push(searchPos);
                searched[j] = true;
                count++;
            }
        }

        winMoney += RecursiveSearch(view, bpl, 1, count, history, symbolId, winLines);
    }

    return { winMoney, winLines };
};

var RecursiveSearch = function (view, bpl, length, count, history, symbolId, winLines) {
    //                                                             
    if (symbolId == empty) {
        return 0;
    }

    //                                                             
    if (length == slotWidth) {
        var wildMulti = 1;
        for (var i = 0; i < history.length; i++) {
            var pos = history[i];
            if (isWild(view[pos])) {
                wildMulti *= GetWildMulti(view[pos]);
            }
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
            if (isWild(view[pos])) {
                wildMulti *= GetWildMulti(view[pos]);
            }
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
    return RecursiveSearch(view, bpl, length + 1, matchCount, historyTmp, symbolId, winLines);
};

var isWild = function (symbol) {
    return symbol == wild || symbol == wild2X || symbol == wild3X;
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

var FreeSpinCountsFromView = function (view, mode) {
    if (mode == 1) {
        switch (NumberOfScatters(view)) {
            case 3:
                return 7;
            case 4:
                return 12;
            case 5:
                return 15;
            case 6:
                return 20;
        }
    } else {
        switch (NumberOfScatters(view)) {
            case 3:
                return 15;
            case 4:
                return 18;
            case 5:
                return 25;
            case 6:
                return 30;
        }
    }
    return 10;
};

var MultisFromView = function (multiView) {
    var positions = [],
        values = [];
    for (var i = 0; i < multiView.length; i++) {
        if (isWild(multiView[i])) {
            var multi = GetWildMulti(multiView[i]);
            if (multi > 1) {
                positions.push(i);
                values.push(multi);
            }
        }
    }
    return { positions, values };
};

var GetFinalView = function (multiView) {
    var finalView = Util.clone(multiView);
    for (var i = 0; i < multiView.length; i++) {
        if (isWild(multiView[i])) {
            finalView[i] = wild;
        }
    }
    return finalView;
};

var GetMaskView = function (view) {
    var wildCount = 0;
    var maskView = Util.clone(view);
    for (var i = 0; i < maskView.length; i++) {
        if (isWild(maskView[i])) {
            maskView[i] = Util.random(3, empty);
            wildCount++;
        }
    }
    if (wildCount == 0) {
        return [];
    }
    return maskView;
};

var GetWildMulti = function (symbol) {
    switch (symbol) {
        case wild:
            return 1;
        case wild2X:
            return 2;
        case wild3X:
            return 3;
    }
    return 1;
};

var GetNewWilds = function (prevView, currentView) {
    var newWildPositions = [];
    for (var i = 0; i < prevView.length; i++) {
        if (isWild(currentView[i]) && !isWild(prevView[i])) {
            newWildPositions.push(i);
        }
    }
    return newWildPositions;
};

var FSStickyPattern = function (reels, bpl, fsLen) {
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var freeSpinWinMoney = 0;

    var wildMultiPositions = [];
    var wildMultiValues = [];

    var freeSpinStickyCache = {};
    freeSpinStickyCache.viewList = [];

    var reelSizes = [];
    //                 1,2                    3                                                
    var wildReelList = [-1, 1, 2];
    // var wildReelList = [-1, -1];
    Util.shuffle(wildReelList);
    // index                           
    wildReelList.unshift(-999999);

    for (; freeSpinIndex <= freeSpinLength; freeSpinIndex++) {
        var freeView;
        while (true) {
            freeView = RandomView(reels, reelSizes);

            // if (freeSpinIndex == freeSpinLength - 5 && !checkWild2and3(freeView)) {
            //     continue;
            // }

            // if (freeSpinIndex == freeSpinLength - 5) {
            //     wildReelList = [];
            // }

            if (freeSpinIndex < wildReelList.length) {
                var wildReelIndex = wildReelList[freeSpinIndex];

                if (wildReelIndex < 0 && isIncludeWild(freeView)) {
                    continue;
                }

                if (wildReelIndex > 0) {
                    var validView = false;
                    for (var i = 0; i < slotHeight; i++) {
                        var viewPos = wildReelIndex + i * slotWidth;
                        if (isWild(freeView[viewPos])) {
                            validView = true;
                            break;
                        } else if (freeView[viewPos] == empty) {
                            break;
                        }
                    }
                    if (!validView) {
                        continue;
                    }
                }
            }
            //                                                                                             

            break;
        }

        var view = GetWildStickyView(freeView, wildMultiPositions, wildMultiValues);
        for (var i = 0; i < slotWidth; i++) {
            var j = slotHeight - 1;
            for (; j >= 0; j--) {
                var viewPos = i + j * slotWidth;
                if (isWild(view[viewPos])) {
                    break;
                }
            }
            reelSizes[i] = j > 2 ? j : 2;
        }

        freeSpinStickyCache.viewList.push(view);
        var winMoney = WinFromView(view, bpl).winMoney;

        var multi = GetWildMultisFromView(view);
        wildMultiPositions = multi.positions;
        wildMultiValues = multi.values;

        freeSpinWinMoney += winMoney;
    }

    freeSpinStickyCache.win = freeSpinWinMoney;
    freeSpinStickyCache.bpl = bpl;

    return freeSpinStickyCache;
};

var GetWildStickyView = function (view, wildMultiPositions, wildMultiValues) {
    var resultView = [...view];
    for (var i = 0; i < wildMultiPositions.length; i++) {
        var pos = wildMultiPositions[i];
        switch (wildMultiValues[i]) {
            case 2:
                resultView[pos] = wild2X;
                break;
            case 3:
                resultView[pos] = wild3X;
                break;
            default:
                resultView[pos] = wild;
                break;
        }
    }
    return resultView;
};

var GetWildMultisFromView = function (view) {
    var multiPositions = [],
        multiValues = [];
    for (var i = 0; i < view.length; i++) {
        var symbol = view[i];
        if (isWild(symbol)) {
            multiPositions.push(i);
            var multi = GetWildMulti(symbol);
            multiValues.push(multi);
        }
    }
    return {
        positions: multiPositions,
        values: multiValues,
    };
};

var ExistWild2 = function (view) {
    var wildCnt = 0;

    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            wildCnt++;
        }
    }

    if (wildCnt > 1) {
        return true;
    } else if (wildCnt == 1) {
        return Util.probability(0);
    } else {
        return false;
    }
};

module.exports = SlotMachine;