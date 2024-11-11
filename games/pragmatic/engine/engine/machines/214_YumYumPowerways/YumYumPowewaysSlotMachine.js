var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";

    //                                 
    this.view = [];
    this.winMoney = 0;
    this.winLines = [];

    //          
    this.tumbleIndex = 0;
    this.tumbleViewList = [];
    this.tumbles = [];
    this.tmb_win = 0;
    this.tmb_res = 0;
    this.tmb_multi = 1;

    this.viewSTR = "";
    this.tumbleSTR = "";

    //                           
    this.freeSpinCount = 10;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinStartLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMore = 0;

    this.bonusLevel = 0;
    this.bonusEnd = false;

    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;

    this.betPerLine = 0;
    this.totalBet = 0;

    this.lineCount = 20;
    this.jackpotType = ["FREE"];

    this.buyMulti = 100;
    this.buyPatternCount = 30;
};

var scatter = 1;
var wild = 2;
var empty = 14;
var slotWidth = 6, slotHeight = 6;
var sidePosArr = [4, 3, 2, 1, 6, 12, 18, 24, 31, 32, 33, 34, 29, 23, 17, 11];
var arrowArr = ["", "r", "l", "b", "t"];
var baseReels = [
    [11, 3, 3, 3, 6, 7, 6, 8, 8, 8, 4, 13, 10, 9, 9, 9, 8, 3, 12, 7, 7, 7, 7, 6, 10, 10, 10, 4, 10, 11, 11, 11, 11, 11, 9, 10, 12, 12, 12, 13, 5, 5, 6, 6, 6, 12, 13, 13, 13, 12, 11, 8, 5, 5, 5, 13, 7, 12, 4, 4, 4, 9, 9, 8, 13],
    [10, 3, 3, 3, 4, 6, 8, 8, 8, 9, 8, 9, 9, 9, 8, 7, 7, 7, 7, 5, 10, 10, 10, 10, 7, 12, 11, 11, 11, 11, 12, 11, 12, 12, 12, 12, 5, 6, 6, 6, 11, 3, 13, 13, 13, 6, 13, 5, 5, 5, 13, 4, 4, 4, 13, 8, 4, 9],
    [9, 3, 3, 3, 13, 11, 5, 8, 8, 8, 12, 10, 6, 9, 9, 9, 9, 9, 7, 7, 7, 5, 8, 10, 10, 10, 7, 11, 4, 11, 11, 11, 12, 11, 7, 12, 12, 12, 8, 3, 12, 6, 6, 6, 13, 8, 13, 13, 13, 12, 10, 10, 5, 5, 5, 6, 13, 11, 4, 4, 4, 13, 6, 7, 4],
    [11, 11, 4, 8, 6, 4, 3, 3, 3, 11, 4, 5, 10, 10, 9, 7, 8, 8, 8, 12, 9, 11, 12, 9, 7, 11, 8, 9, 9, 9, 11, 12, 8, 13, 7, 13, 13, 3, 7, 7, 7, 11, 8, 13, 13, 10, 13, 6, 10, 10, 10, 10, 8, 13, 6, 13, 11, 6, 11, 7, 11, 11, 11, 12, 7, 11, 9, 10, 5, 3, 8, 12, 12, 12, 12, 7, 9, 5, 7, 12, 6, 12, 6, 6, 6, 8, 5, 10, 12, 13, 9, 9, 12, 13, 13, 13, 6, 13, 8, 9, 7, 6, 8, 8, 5, 5, 5, 6, 5, 10, 7, 4, 13, 13, 9, 4, 4, 4, 12, 4, 11, 10, 11, 10, 5, 9, 10],
];
var sideReels = [
    [5, 3, 3, 3, 7, 10, 9, 8, 8, 8, 8, 11, 12, 9, 9, 9, 13, 13, 6, 7, 7, 7, 10, 7, 10, 10, 10, 5, 13, 13, 11, 11, 11, 4, 11, 12, 12, 12, 12, 3, 4, 12, 6, 6, 6, 6, 8, 13, 13, 13, 6, 8, 11, 5, 5, 5, 12, 1, 9, 4, 4, 4, 9, 10, 11, 7],
    [11, 12, 3, 3, 3, 6, 3, 5, 11, 8, 8, 8, 10, 13, 8, 12, 9, 9, 9, 7, 1, 4, 7, 7, 7, 4, 5, 7, 7, 10, 10, 10, 12, 9, 5, 6, 11, 11, 11, 11, 7, 13, 12, 12, 12, 10, 6, 10, 8, 6, 6, 6, 11, 12, 6, 10, 13, 13, 13, 12, 13, 13, 5, 5, 5, 9, 8, 9, 11, 4, 4, 4, 12, 9, 8, 13, 10],
    [11, 3, 3, 3, 7, 7, 8, 8, 8, 11, 8, 11, 9, 9, 9, 10, 13, 7, 7, 7, 4, 13, 9, 10, 10, 10, 1, 13, 11, 11, 11, 12, 6, 12, 12, 12, 7, 5, 8, 6, 6, 6, 10, 10, 13, 13, 13, 4, 12, 3, 5, 5, 5, 6, 8, 4, 4, 4, 5, 12, 9, 9],
    [6, 7, 13, 10, 4, 11, 5, 6, 7, 13, 3, 3, 3, 11, 12, 5, 12, 7, 7, 5, 5, 10, 13, 12, 8, 8, 8, 7, 13, 9, 7, 3, 12, 13, 9, 10, 6, 7, 9, 9, 9, 5, 11, 9, 10, 9, 12, 10, 13, 13, 11, 8, 10, 7, 7, 7, 4, 10, 8, 12, 13, 9, 5, 6, 11, 4, 7, 10, 10, 10, 5, 8, 11, 11, 13, 13, 12, 10, 13, 4, 13, 11, 11, 11, 12, 1, 7, 13, 10, 9, 8, 12, 8, 6, 12, 12, 12, 11, 7, 5, 8, 9, 8, 12, 11, 4, 11, 12, 6, 6, 6, 6, 10, 13, 11, 8, 10, 11, 9, 13, 9, 12, 5, 13, 13, 13, 6, 7, 6, 4, 6, 9, 13, 3, 9, 13, 11, 5, 5, 5, 10, 9, 8, 6, 10, 11, 7, 4, 3, 8, 4, 4, 4, 6, 12, 12, 9, 11, 10, 8, 12, 11, 12, 11, 12, 7],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 8, 6, 4, 3, 2, 2, 2, 1, 1, 1, 0],
    [0, 0, 0, 15, 12, 9, 7, 5, 3, 3, 3, 2, 2, 2, 0],
    [0, 0, 0, 30, 18, 12, 10, 8, 5, 5, 5, 4, 4, 4, 0],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

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

    if (viewCache.type == "BASE") {
        this.tumbleViewList = viewCache.view;
        this.view = this.tumbleViewList[0];
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
        this.freeSpinStartLength = GetFreeSpinCount(this.view);
    }

    var virtuals = RandomLineFromReels(sideReels);
    var temp = ConvertView(this.view, virtuals);
    this.viewSTR = Buffer.from(temp).toString("base64");

    var res = WinFromView(this.view, player.betPerLine);
    this.winMoney = res.win;
    this.winLines = res.lines;
    this.tumbles = res.tumbles;

    this.tmb_multi = 1;
    this.tmb_win = 0;
    this.tmb_res = 0;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_res = this.winMoney;
    }

    if (isFreeSpinWin(this.view)) {
        this.freeSpinLength = 0;
        this.freeSpinWinMoney = this.winMoney;
        this.freeSpinBeforeMoney = this.winMoney;

        if (this.freeSpinStartLength < 12) {
            this.currentGame = "BONUS";
            this.freeSpinStartLength = GetFreeSpinCount(this.view);
            this.bonusLevel = this.freeSpinStartLength / 2 - 2;
            this.bonusEnd = false;
        } else {
            this.freeSpinIndex = 1;
            this.currentGame = "FREE";
            this.freeSpinLength = this.freeSpinStartLength;
            this.tmb_multi = 3;
        }
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    if (this.currentGame == "FREE") {
        this.tmb_multi += 3;
    } else {
        this.tmb_multi++;
    }

    var prevView = this.tumbleViewList[this.tumbleIndex - 1];
    this.view = this.tumbleViewList[this.tumbleIndex];

    var res = WinFromView(this.view, player.betPerLine, this.tmb_multi);
    this.winMoney = res.win;
    this.winLines = res.lines;
    this.tumbles = res.tumbles;

    var virtuals = RandomLineFromReels(sideReels);
    this.tumbleSTR = ConvertTumbles(prevView, this.view, this.tumbles);
    var temp = ConvertView(this.view, virtuals);
    this.viewSTR = Buffer.from(temp).toString("base64");

    this.tmb_win += this.winMoney;
    this.tmb_res += this.winMoney;
    this.tumbleIndex++;

    if (this.winMoney == 0) {
        this.tumbleStatus = "NOTUMBLE";

        if (this.currentGame == "FREE") {
            if (NumberOfScatters(this.view) > 0) {
                this.freeSpinMore = 2;
                this.freeSpinLength += this.freeSpinMore;
            } else {
                this.freeSpinMore = 0;
            }
        }
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);
        //                 
        if (this.tumbleStatus == "NOTUMBLE") {
            this.freeSpinWinMoney += this.tmb_res;
            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleViewList = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = this.tumbleViewList[0];

    this.tmb_win = 0;
    this.tmb_res = 0;

    var virtuals = RandomLineFromReels(sideReels);
    var temp = ConvertView(this.view, virtuals);
    this.viewSTR = Buffer.from(temp).toString("base64");

    var res = WinFromView(this.view, player.betPerLine, this.tmb_multi);
    this.winMoney = res.win;
    this.winLines = res.lines;
    this.tumbles = res.tumbles;

    if (this.winMoney == 0) {
        if (NumberOfScatters(this.view) > 0) {
            this.freeSpinMore = 2;
            this.freeSpinLength += this.freeSpinMore;
        } else {
            this.freeSpinMore = 0;
        }
    }

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_res = this.winMoney;
    }

    this.freeSpinIndex++;
    if (this.freeSpinIndex > this.freeSpinLength && this.winMoney == 0) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;

    var gambleSelectFlag = Number(param.ind);

    //                          
    if (gambleSelectFlag == 0) {
        this.currentGame = "FREE";
        this.tmb_multi = 3;
        this.freeSpinIndex = 1;
        this.freeSpinLength = (this.bonusLevel + 2) * 2;
        this.bonusEnd = true;
    } else {
        var winPercent = 0;
        if (this.bonusLevel == 0) {
            winPercent = 60;
        } else if (this.bonusLevel == 1) {
            winPercent = 55;
        } else if (this.bonusLevel == 2) {
            winPercent = 55;
        } else if (this.bonusLevel == 3) {
            winPercent = 50;
        }

        var gambleWin = Util.probability(winPercent);
        if (gambleWin) {
            this.bonusLevel++;
            // 22          
            if (this.bonusLevel == 4) {
                this.currentGame = "FREE";
                this.tmb_multi = 3;
                this.freeSpinIndex = 1;
                this.freeSpinLength = 12;
                this.bonusEnd = true;
            }
        } else {
            this.bonusLevel--;
            if (this.bonusLevel < 0) {
                this.currentGame = "BASE";
                this.bonusEnd = true;
            }
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl,
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
    var scatterView = RandomScatterView(baseReels, bpl, sideReels);

    //                          
    var freeSpinCacheList = [];
    var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin, 12, sideReels);
    freeSpinCacheList.push(scatterView);

    return {
        win: fsCache.win,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl, sideReels);

    //                          
    var freeSpinCacheList = [];
    var fsCache = BuyBonusViewCache(baseReels, bpl, 12, sideReels, (totalBet * this.buyMulti) / 5);
    freeSpinCacheList.push(scatterView);

    return {
        win: fsCache.win,
        bpl: bpl,
        view: freeSpinCacheList.concat(fsCache.cache),
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;
    var tumbles = [];

    while (true) {
        var tumbleWinMoney = 0;
        var tumbleMulti = 1;
        var view = RandomView(reels, sideReels);
        var res = WinFromView(view, bpl, tumbleMulti);
        tumbleWinMoney = res.win;
        tumbles = res.tumbles;

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(baseReels, bpl);
        }

        if (tumbleWinMoney == 0) {
            continue;
        }

        var viewList = [view];

        //                       
        while (true) {
            tumbleMulti++;
            var lastView = viewList[viewList.length - 1];
            var newView = GetNextViewByTumble(lastView, tumbles);

            if (isFreeSpinWin(newView)) {
                continue;
            }

            var res = WinFromView(newView, bpl, tumbleMulti);
            var nWinMoney = res.win;
            tumbles = res.tumbles;

            viewList.push(newView);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                break;
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            return { viewList, tumbleWinMoney };
        }

    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels, sideReels);
        var winMoney = WinFromView(view, bpl).win;

        if (winMoney == 0) {
            var viewList = [];
            viewList.push(view);
            var tumbleWinMoney = 0;
            return { viewList, tumbleWinMoney };
        }
    }
};

var RandomView = function (reels, sideReels, isFree = false) {
    var view = [];

    while (true) {
        var mainView = [];
        var sideView = [];

        for (var i = 0; i < 4; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < 4; j++) {
                var viewPos = i + j * 4;
                var reelPos = (randomIndex + j) % len;
                mainView[viewPos] = reels[i][reelPos];
            }
        }

        for (var i = 0; i < 4; i++) {
            var len = sideReels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < 4; j++) {
                var viewPos = i + j * 4;
                var reelPos = (randomIndex + j) % len;
                sideView[viewPos] = sideReels[i][reelPos];
            }
        }

        view = GetFinalView(mainView, sideView);

        //                              ,                                              
        if (Util.probability(10) && !isFree) {
            var randPos = RandomWildPos();
            view[randPos] = wild;
        }

        var scatterCount = NumberOfScatters(view);
        if (scatterCount < 2 && (scatterCount == 0 || Util.probability(10))) {
            break;
        }
    }

    return view;
};

var RandomScatterView = function (reels, bpl, sideReels) {
    var view = [];

    while (true) {
        var mainView = [];
        var sideView = [];

        for (var i = 0; i < 4; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < 4; j++) {
                var viewPos = i + j * 4;
                var reelPos = (randomIndex + j) % len;
                mainView[viewPos] = reels[i][reelPos];
            }
        }

        for (var i = 0; i < 4; i++) {
            var len = sideReels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < 4; j++) {
                var viewPos = i + j * 4;
                var reelPos = (randomIndex + j) % len;
                sideView[viewPos] = sideReels[i][reelPos];
            }
        }

        view = GetFinalView(mainView, sideView);

        if (isFreeSpinWin(view) && WinFromView(view, bpl).win == 0 && !isDoubleScatterView(view)) {
            break;
        }
    }

    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, sideFReels) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen, sideFReels)

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

var BuyBonusViewCache = function (reels, bpl, fsLen, sideFReels, lowLimit = 0) {
    while (true) {
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinWinMoney = 0;
        var freeSpinIndex = 1;
        var freeSpinLength = fsLen;
        var tumbleMulti = 3;
        var tumbles = [];

        while (true) {
            var fsView = RandomView(reels, sideFReels, true);
            var wildPos = RandomWildPos();
            fsView[wildPos] = wild;

            var res = WinFromView(fsView, bpl, tumbleMulti);
            var tumbleWinMoney = res.win;
            tumbles = res.tumbles;

            if (tumbleWinMoney > 0 && Util.probability(70)) {
                continue;
            }

            var viewList = [fsView];

            //                       
            if (tumbleWinMoney > 0) {
                while (true) {
                    var lastView = viewList[viewList.length - 1];
                    var newView = GetNextViewByTumble(lastView, tumbles, true);

                    if (NumberOfScatters(newView) > 1) {
                        continue;
                    }

                    tumbleMulti += 3;
                    var res = WinFromView(newView, bpl, tumbleMulti);
                    var winMoney = res.win;
                    tumbles = res.tumbles;

                    viewList.push(newView);
                    tumbleWinMoney += winMoney;

                    //                 
                    if (winMoney == 0) {
                        if (NumberOfScatters(newView) > 0) {
                            freeSpinLength += 2;
                        }

                        break;
                    }
                }
            } else {
                if (NumberOfScatters(fsView) > 0) {
                    freeSpinLength += 2;
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

        if (freeSpinData.win >= lowLimit) {
            return freeSpinData;
        }
    }
};

var RandomWildPos = function () {
    var xPos = Util.random(1, 5);
    var yPos = Util.random(1, 5);

    return yPos * slotWidth + xPos;
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < 4; i++) {
        var index = Util.random(0, reels[i].length - 1);
        result.push(reels[i][index]);
        result.push(reels[i][index + 1]);
    }

    return result;
};

var WinFromView = function (view, bpl, multi = 1) {
    var winMoney = 0;
    var winLines = [];
    var tumbles = [];

    // 1:          , 2:       , 3:          , 4:       
    for (var arrow = 1; arrow <= 4; arrow++) {
        var histroy = []; //             
        var startSymbol = 0; //             

        for (var i = 1; i <= 4; i++) {
            var countArr = [];
            var posArr = [];
            startSymbol = GetStartSymbol(arrow, i, view);

            if (histroy.indexOf(startSymbol) == -1) {
                histroy.push(startSymbol);

                for (var j = 0; j < 6; j++) {
                    var count = 0;
                    for (var k = 1; k <= 4; k++) {
                        var pos = GetNextPos(arrow, j, k);
                        if (view[pos] == startSymbol || isWild(view[pos])) {
                            count++;
                            posArr.push(pos);
                        }
                    }

                    if (count > 0) {
                        countArr.push(count);
                    } else {
                        break;
                    }
                }

                if (countArr.length > 1) {
                    var lineCount = GetLineCount(countArr);
                    var money = payTable[countArr.length][startSymbol] * lineCount * multi * bpl;
                    winMoney += money;

                    if (money > 0) {
                        winLines.push(`${startSymbol}~${money}~${lineCount}~${countArr.length}~${posArr.join()}~${arrowArr[arrow]}~${multi}`);
                        tumbles = tumbles.concat(posArr);
                    }
                } else {
                    posArr = [];
                }
            }
        }
    }

    return {
        win: winMoney,
        lines: winLines,
        tumbles: tumbles,
    };
};

var GetFinalView = function (mainView, sideView) {
    var result = [];

    //                             
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        result[i] = empty;
    }

    //          
    for (var j = 0; j < mainView.length; j++) {
        var yPos = Math.floor(j / 4);
        var xPos = j % 4;
        var realPos = (yPos + 1) * slotWidth + xPos + 1;
        result[realPos] = mainView[j];
    }

    //          
    for (var k = 0; k < sideView.length; k++) {
        result[sidePosArr[k]] = sideView[k];
    }

    return result;
};

var GetLineCount = function (countArr) {
    var result = 1;
    for (var i = 0; i < countArr.length; i++) {
        result *= countArr[i];
    }

    return result;
};

var GetStartSymbol = function (arrow, index, view) {
    var pos;

    if (arrow == 1) {
        pos = index * slotWidth; // right
    } else if (arrow == 2) {
        pos = index * slotWidth + slotWidth - 1; // left
    } else if (arrow == 3) {
        pos = index; // below
    } else if (arrow == 4) {
        pos = (slotHeight - 1) * slotWidth + index; // top
    }

    return view[pos];
};

var GetNextPos = function (arrow, index1, index2) {
    var pos;

    if (arrow == 1) {
        pos = index2 * 6 + index1; // right
    } else if (arrow == 2) {
        pos = index2 * 6 + 5 - index1; // left
    } else if (arrow == 3) {
        pos = index1 * 6 + index2; // below
    } else if (arrow == 4) {
        pos = (5 - index1) * 6 + index2; // top
    }

    return pos;
};

var GetNextViewByTumble = function (view, tumbles, isFree = false) {
    var nextView = Util.clone(view);

    //                                       
    for (var i = 0; i < tumbles.length; i++) {
        if (sidePosArr.indexOf(tumbles[i]) == -1) {
            if (!isFree || nextView[tumbles[i]] != wild) {
                nextView[tumbles[i]] = -1;
            }
        }
    }

    //                                                       
    for (var j = 0; j < 4; j++) {
        var sidePos = sidePosArr.slice(j * 4, (j + 1) * 4).reverse();
        var sideView = [];
        //                                        
        for (var k = 0; k < sidePos.length; k++) {
            if (tumbles.indexOf(sidePos[k]) == -1 || (isFree && view[sidePos[k]] == wild)) {
                sideView.push(view[sidePos[k]]);
            }
        }

        //           -1             
        if (sideView.length < 4) {
            while (true) {
                sideView.push(-1);
                if (sideView.length >= 4) break;
            }
        }

        //                                     
        for (var m = 0; m < sidePos.length; m++) {
            nextView[sidePos[m]] = sideView[m];
        }
    }

    //                        
    overView = RandomView(baseReels, sideReels, isFree);

    for (var p = 0; p < nextView.length; p++) {
        if (nextView[p] == -1) {
            nextView[p] = overView[p];
        }
    }

    return nextView;
};

var ConvertTumbles = function (prevView, nowView, tumbles) {
    var result = "";

    var symbols = [];
    for (var i = 0; i < tumbles.length; i++) {
        var pos = tumbles[i];
        if (sidePosArr.indexOf(pos) == -1) {
            var nextPos = (Math.floor(pos / 6) - 1) * 4 + ((pos % 6) - 1);
            symbols.push(`${prevView[pos]}~${nowView[pos]}~${nextPos}`);
        }
    }

    if (symbols.length > 0) {
        result = `s:${symbols.join(";")}`;
    }

    return result;
};

var ConvertView = function (view, virtuals) {
    var mainView = [];
    var sideView = [[], [], [], []];

    //                 
    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 5; j++) {
            var pos = i * slotWidth + j;
            mainView.push(view[pos]);
        }
    }

    //                 
    for (var i = 0; i < 4; i++) {
        var sidePos = sidePosArr.slice(i * 4, (i + 1) * 4);
        for (var j = 0; j < sidePos.length; j++) {
            sideView[i].push(view[sidePos[j]]);
        }
    }

    var resultArr = [];
    //          
    for (var k = 0; k < 4; k++) {
        resultArr.push(`s${k}:{reel_set:"0",s:"${sideView[k].join()}",sa:"${virtuals[k * 2]}",sb:"${virtuals[k * 2 + 1]}",sh:"4",st:"rect",sw:"1"}`);
    }
    //          
    resultArr.push(`s4:{s:"${mainView.join()}",sa:"14,14,14,14",sb:"14,14,14,14",sh:"4",st:"rect",sw:"4"}`);

    var result = `{${resultArr.join()}}`;
    return result;
};

var isDoubleScatterView = function (view) {
    for (var j = 0; j < 4; j++) {
        var sidePos = sidePosArr.slice(j * 4, (j + 1) * 4);
        var sideView = [];
        for (var k = 0; k < sidePos.length; k++) {
            sideView.push(view[sidePos[k]]);
        }
        if (NumberOfScatters(sideView) > 1) {
            return true;
        }
    }

    return false;
};

var GetFreeSpinCount = function (view) {
    var scatterCount = NumberOfScatters(view);

    return scatterCount * 2;
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

module.exports = SlotMachine;