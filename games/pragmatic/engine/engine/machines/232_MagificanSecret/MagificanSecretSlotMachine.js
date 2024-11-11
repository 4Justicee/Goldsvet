var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 10;
    //                                 
    this.view = [];
    this.maskView = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.baseType = 0;
    this.viewToMask = "s:"

    //                           
    this.freeSpinType = -1;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.reSpinCount = 0;
    this.psym = "";

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];

    //                    
    this.buyMulti = 100;
    this.buyPatternCount = 100;
};

var scatter = 1, wild = 2;
var slotWidth = 6, slotHeight = 4;
var winLines = [];
var NORMALBASE = 0, WILDBASE = 1, MULTIWILDBASE = 2, EXTENWILD = 0, STICKYWILD = 1;
var percentList = {
    freeWinPercent: 50,
}
var baseReels = [
    [11,9,5,8,11,8,9,5,4,8,9,7,10,12,5,7,8,9,9,9,11,6,12,12,3,12,10,8,11,8,4,8,9,8,1,5,3,9,11,10,10,10,10,12,9,8,3,8,12,5,12,12,4,12,9,4,5,4,10,12,11,11,11,12,3,6,10,8,12,7,3,12,11,8,8,7,11,5,9,11,3,10,12,12,12,3,10,12,7,6,5,11,12,4,10,4,10,11,8,9,6,8,11,7,7,7,10,4,8,11,12,1,7,9,7,8,11,8,6,12,4,11,7,12,10,8,8,8,4,11,3,9,7,7,10,11,10,8,10,11,12,8,8,12,10,6,6,10],
    [6,9,10,10,11,5,9,4,5,11,9,5,9,11,11,11,8,6,9,12,9,12,8,1,6,12,10,10,11,3,12,12,12,6,10,10,11,11,10,11,9,5,11,9,7,6,12,9,9,9,11,9,11,8,12,5,11,6,7,5,11,8,6,8,10,10,10,6,9,6,4,11,4,7,7,9,8,4,11,11,8,8,8,8,12,4,9,12,9,7,10,9,11,8,11,10,12,7,12,9],
    [9,10,10,12,12,9,11,5,10,10,10,10,10,7,8,4,9,12,8,5,6,12,12,12,10,12,3,9,9,12,9,11,8,3,8,8,8,12,9,10,1,3,8,9,6,6,9,9,9,11,12,3,9,12,6,8,7,3,11,11,11,11,11,5,6,3,12,11,12,7,5,10,7,7,7,10,8,9,12,6,6,12,11,12,10,12],
    [9,9,7,7,9,12,9,8,11,9,9,11,4,12,3,6,7,7,6,11,6,9,5,9,8,9,4,12,10,8,12,9,8,10,12,11,12,4,10,4,8,8,8,8,3,11,9,8,5,8,11,3,8,6,8,9,9,6,7,11,6,5,8,12,8,6,4,6,9,8,4,9,3,9,4,8,4,12,4,8,3,12,10,11,11,9,12,9,9,9,10,11,1,8,12,8,10,10,11,4,5,9,10,12,7,6,10,11,4,3,6,4,9,8,10,5,9,4,9,7,9,7,10,4,6,12,5,9,9,12,11,12,10,10,10,5,10,9,3,1,10,8,4,8,5,11,3,10,12,9,9,4,11,3,11,3,8,8,3,8,9,3,10,12,6,11,9,9,8,4,8,7,12,10,9,7,9,3,12,12,12,8,3,6,12,6,10,4,10,5,4,10,6,11,8,11,4,9,7,8,8,4,12,9,6,8,3,9,1,3,9,4,10,8,9,11,8,5,5,11,3,3,4,11,11,11,8,11,10,7,6,8,6,5,6,8,12,12,5,4,11,10,3,11,4,8,7,8,10,9,12,9,4,7,9,12,12,8,9,12,9,12,7,10,4,7,10,10,5,10],
    [9,12,8,8,8,7,12,4,10,10,10,11,5,6,12,12,12,7,11,8,9,11,11,11,10,10,8,3,3,3,11,12,8,9,9,9,6,8,1,11,3],
    [10,1,12,4,7,7,7,9,11,11,6,10,10,10,10,7,9,10,7,11,12,12,12,8,12,9,12,7,9,9,9,9,3,6,5,9,5,5,5,5,12,10,5,11,4,8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 10, 5, 4, 3, 3, 1, 1, 1, 1, 1],
    [0, 0, 0, 30, 10, 10, 8, 7, 2, 2, 2, 2, 2],
    [0, 0, 0, 100, 30, 25, 20, 15, 3, 3, 3, 3, 3],
    [0, 0, 0, 500, 100, 40, 30, 20, 8, 7, 6, 5, 4]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 20; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.baseType = 0;

    this.multisPos = [];
    this.multisValue = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
        this.baseType = GetBaseType(this.view);

        this.BaseSpin(player);
    } else if (viewCache.type == "FREE") {
        this.currentGame = "FREE";
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0][0].view;

        this.freeSpinIndex = 1;
        this.totalRespinCount = 0;
        this.respinCount = 0;

        var freeSpinMoney = (viewCache.win / viewCache.bpl) * player.betPerLine;
        var freeSpinMoneyList = [];
        for (var i = 0; i < viewCache.moneyList.length; i++) {
            freeSpinMoneyList[i] = (viewCache.moneyList[i] / viewCache.bpl) * player.betPerLine;
        }
        console.log(`[            ]  ${freeSpinMoney} [                   ] :  ${freeSpinMoneyList.join(",")}`);

        var scatterCnt = NumberOfScatters(this.view);
        this.scatterWin = WinFromScatterView(this.view, this.totalBet);
        if (this.scatterCnt > 0) {
            var scatterPos = [];
            if (this.totalBet > 100000) {
                this.totalBet /= 100;
            }
            for (var i = 0; i < this.view.length; i++) {
                if (this.view[i] == 1) scatterPos.push(i);
            }
            this.psym = `${scatterCnt-3}~` + `${this.scatterWin}~` + scatterPos.join();
        }

        this.winMoney = this.scatterWin;
        this.totalWin = this.winMoney;
        this.freeSpinWinMoney = 0;

        this.stFullFlag = [0,0,0,0,0];
    } 

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;

    if (this.currentGame == "FREE") {
        var select = Number(param.ind);
        this.freeSpinType = select;
        this.freeSpinCacheList = this.freeSpinCacheList[this.freeSpinType];
        this.freeSpinLength = this.freeSpinCacheList[0].freeSpinLength;
        this.specialSymbol = this.freeSpinCacheList[0].symbol;
    }
};

SlotMachine.prototype.BaseSpin = function (player) {
    if (this.baseType == 2) {
        var view = MultiViewGen(this.view);
        this.winMoney = WinFromView(view, player.betPerLine);
        this.winLines = winLines;
        this.maskView = Util.clone(this.view);
        this.view = Util.clone(view);
        
        this.viewToMask = "s:";
        var multi = GetMultiInfo(this.maskView);
        var reelPos = multi.Pos % slotWidth;
        for (var i = 0; i < slotHeight; i++) {
            var pos = reelPos + i * slotWidth;
            this.view[pos] = 2;
            if (pos == multi.Pos) {
                this.maskView[pos] = 2;
                continue;
            }
            this.viewToMask += `${this.maskView[pos]}` + "~2~" +`${pos}` + ";";
        }
        this.viewToMask = this.viewToMask.slice(0, -1);

        this.multiValue = multi.Wildx - 12;
        this.multiReelPos = multi.Pos % slotWidth;

        var multis = GetMultisInfo(view, this.multiValue);
        this.multisPos = Util.clone(multis.Poses);
        this.multisValue = Util.clone(multis.Values);
    } else {
        if (this.baseType == 1) {
            var multis = GetMultisInfo(this.view, 1);
            this.multisPos = Util.clone(multis.Poses);
            this.multisValue = Util.clone(multis.Values);
        }
        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winLines = winLines;
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.freeSpinType == EXTENWILD) {
        var view = this.freeSpinCacheList[this.freeSpinIndex + this.totalRespinCount];
        this.winMoney = WinFromView(view, player.betPerLine);
        this.winLines = winLines;
        this.totalWin += this.winMoney;
        
        var poscnt = 0;
        for (var i = 0; i < view.length; i++) {
            if (view[i] < 13) {
                ++poscnt;
            }
        }
        
        this.freeWildType = -1;
        if (poscnt == 24) {
            this.freeWildType = 0;
        } else if (poscnt == 23) {
            this.freeWildType = 1;
        } else if (poscnt == 20) {
            this.freeWildType = 2;
        }
        
        if (this.freeWildType == 0) {
            this.view = Util.clone(view);
            this.freeSpinIndex++;
            this.freeSpinWinMoney += this.winMoney;
        } else if (this.freeWildType == 1) {
            this.freeSpinIndex++;
            this.maskView = Util.clone(view);
            this.view = Util.clone(view);
            this.viewToMask = "s:";

            var multi = GetMultiInfo(view);
            this.multiPos = multi.Pos;
            this.multiValue = multi.Wildx - 12;
            this.maskView[this.multiPos] = 2;
            for (var i = 0; i < slotHeight; i++) {
                var pos = this.multiPos % slotWidth + i * slotWidth;
                this.view[pos] = 2;
                this.viewToMask += `${this.maskView[pos]}` + "~2~" + `${pos}` + ";";
            }
            this.viewToMask = this.viewToMask.slice(0, -1);

            var multis = GetMultisInfo(view, 1);
            this.multisPos = Util.clone(multis.Poses);
            this.multisValue = Util.clone(multis.Values);
            
            this.respinCount = 0;
//            this.respinMulti = 0;
            this.respinWin = this.winMoney;
        } else if (this.freeWildType == 2) {
            this.totalRespinCount++;
            ++this.respinCount;
//            ++this.respinMulti;
            if (this.respinCount > 10) {
                this.respinCount = 10;
            }

            this.view = Util.clone(view);
            for (var i = 0; i < view.length; i++) {
                if (view[i] >= 13) {
                    this.view[i] = 2;
                }
            }

            var multis = GetMultisInfo(view, this.respinCount);
            this.multisPos = Util.clone(multis.Poses);
            this.multisValue = Util.clone(multis.Values);
            
            this.respinWin += this.winMoney;
            if (this.winMoney == 0) {
                this.freeWildType = 3;
                this.freeSpinWinMoney += this.respinWin;
            }
        }
    } else if (this.freeSpinType == STICKYWILD) {
        var view = this.freeSpinCacheList[this.freeSpinIndex];

        var tmp = GetSTFullFlag(view, this.stFullFlag);
        this.stFullFlag = Util.clone(tmp);

        for (var i = 1; i < 5; i++) {
            if (this.stFullFlag[i] == 1) {
                this.freeSpinLength += 3;
                this.stFullFlag[i] = 23;
            }
        }

        this.view = Util.clone(view);
        this.maskView = Util.clone(view);

        this.winMoney = WinFromView(this.view, player.betPerLine);
        this.winLines = winLines;
        this.totalWin += this.winMoney;
        this.freeSpinWinMoney += this.winMoney;

        var tmpView = Util.clone(view);
        this.viewToMask = "s:";

        this.stickyFlag = false;
        for (var i = 0; i < tmpView.length; i++) {
            if (tmpView[i] == 13) {
                this.stickyFlag = true;
                this.viewToMask += `${this.specialSymbol}` + "~2~" + `${i}` + ";";
                this.view[i] = 2;
                this.maskView[i] = this.specialSymbol;
            }
        }
        this.viewToMask = this.viewToMask.slice(0, -1);

        this.stWildsPos = [];
        this.stWildsValue = [];
        for (var i = 0; i < this.view.length; i++) {
            if (this.view[i] == wild) {
                this.stWildsPos.push(i);
                this.stWildsValue.push(1);
            }
        }

        this.freeSpinIndex++;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (this.freeSpinIndex > this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;
    var baseType = NORMALBASE;

    if (Util.probability(80)) {
        baseType = NORMALBASE;
    } else if (Util.probability(80)) {
        baseType = WILDBASE;
    } else if (Util.probability(80)) {
        baseType = MULTIWILDBASE;
    }

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin, baseType);
    } else {
        tmpView = RandomZeroView(baseReels, bpl, baseType);
    }

    if (baseType == 2) {
        var view = MultiViewGen(tmpView);
        tmpWin = WinFromView(view, bpl);
    } else {
        tmpWin = WinFromView(tmpView, bpl);
    }

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
            newJpType = "FREE";
    }

    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, jpWin, isCall);
        default:
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    // FS                
    var viewList = [];
    var moneyList = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var scatterWinMoney = WinFromScatterView(scatterView, totalBet);
    fsWin = fsWin - scatterWinMoney;

    var lengthArray = [10, 8];
    for (var i = 0; i < 2; i++) {
        var freeSpinLength = lengthArray[i];

        viewList[i] = [];

        var scatterCache = {
            view: scatterView,
            win: scatterWinMoney,
            freeSpinLength: freeSpinLength,
            isBuy: 0
        };

        viewList[i] = [scatterCache];

        var result = RandomFreeViewCache(baseReels, bpl, fsWin, lengthArray[i], i);
        if (i == 1) {
            viewList[i][0].symbol = result.stickySymbol;
        }

        viewList[i] = viewList[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: viewList,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    // FS                
    var viewList = [];
    var moneyList = [];

    var scatterView;
    var scatterWinMoney;
    while (true) {
        scatterView = RandomScatterView(baseReels, bpl);
        scatterWinMoney = WinFromScatterView(scatterView, totalBet);
        if (scatterWinMoney == 0) {
            break;
        }
    }
    var lengthArray = [10, 8];

    for (var i = 0; i < 2; i++) {
        var freeSpinLength = lengthArray[i];

        viewList[i] = [];

        var scatterCache = {
            view: scatterView,
            win: scatterWinMoney,
            freeSpinLength: freeSpinLength,
            isBuy: 1
        };

        viewList[i] = [scatterCache];

        var result = {};

        if ( i == 0 ) {
            result = WildFreeViewCache(baseReels, bpl, lengthArray[i]);
        } else {
            result = RandomFreeViewCache(baseReels, bpl, moneyList[0], lengthArray[i], 1);
            viewList[i][0].symbol = result.stickySymbol;
        }

        viewList[i] = viewList[i].concat(result.viewList);
        moneyList[i] = result.win + scatterWinMoney;
    }

    return {
        view: viewList,
        moneyList: moneyList,
        bpl: bpl,
        win: Util.maxInArr(moneyList).value,
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin, bType) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels, bType);

        if (bType == 2) {
            var view = MultiViewGen(tmpView);
            tmpWin = WinFromView(view, bpl);
        } else {
            tmpWin = WinFromView(tmpView, bpl);
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels,bpl);
        }
    }
    return tmpView;
};

var RandomZeroView = function (reels, bpl, bType) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels, bType);
        if (bType == 2) {
            var view = MultiViewGen(tmpView);
            tmpWin = WinFromView(view, bpl);
        } else {
            tmpWin = WinFromView(tmpView, bpl);
        }
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView;
};

var RandomView = function (reels, bType) {
    var view = RandomBaseView(reels, 2);

    if (bType == 1) {
        view = RandomWildView(view);
    }
    if (bType == 2) {
        if (Util.probability(30)) {
            view = RandomWildView(view);
        }
        var reelPos;
        while (true) {
            var check = 0;
            reelPos = Util.random(1, 5);
            for (var i = 0; i < slotHeight; i++) {
                var pos = reelPos + i * slotWidth;
                if (view[pos] == 2) {
                    ++check;
                    break;
                }
            }
            if (check == 0) {
                break;
            }
        }
        var multiWild = GetMultiWild(); // 14 ~ 22 : 2x ~ 10x
        var pos = reelPos + Util.random(0, 4) * slotWidth;
        view[pos] = multiWild;
    }

    return view;
};

var RandomScatterView = function (reels, bpl) {
    var tmpView = [];
    var tmpWin = 1000;

    while (true) {
        tmpView = RandomBaseView(reels, 0);

        var nScatters = 3;
        if (Util.probability(95)) {
            nScatters = 3;
        } else if (Util.probability(5)) {
            nScatters = 4;
        } 

        var scaReel = [0, 1, 2, 3, 4, 5];
        Util.shuffle(scaReel);

        for (var i = 0; i < nScatters; i++) {
            var reelNo = scaReel[i];
            var viewPos = reelNo + Util.random(0, slotHeight) * slotWidth;
            tmpView[viewPos] = scatter;
        }

        tmpWin = WinFromView(tmpView, bpl)
        if (tmpWin == 0) {
            break;
        }
    }
    return tmpView;
};

var RandomFreeViewCache = function (reels, bpl, fsWin, fsLen, fsType) {
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
        if (fsType) {
            freeSpinData = StickyFreeViewCache(reels, bpl, fsLen);
        } else {
            freeSpinData = WildFreeViewCache(reels, bpl, fsLen);
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

var MultiViewGen = function (preView) {
    var multiView = Util.clone(preView);
    var reelPos = 0, multiwild = 0;
    for (var i = 0; i < multiView.length; i++) {
        if (multiView[i] > 13) {
            reelPos = i % slotWidth;
            multiwild = multiView[i];
            break;
        }
    }
    for (var i = 0; i < slotHeight; i++) {
        var pos = reelPos + i * slotWidth;
        multiView[pos] = multiwild;
    }
    return multiView;
};

var RandomWildView = function(view) {
    var wildView = Util.clone(view);
    var wildCnt = 1;
    if (Util.probability(60)) {
        wildCnt = 1;
    } else if (Util.probability(60)) {
        wildCnt = 2;
    } else if (Util.probability(40)) {
        wildCnt = 3;
    }
    var reelPos = [1, 2, 3, 4, 5];
    Util.shuffle(reelPos);
    for (var i = 0; i < wildCnt; i++) {
        var wildPos = reelPos[i] + Util.random(0, 4) * slotWidth;
        wildView[wildPos] = wild;
    }
    return wildView;
};

var WildFreeViewCache = function (reels, bpl, fsLen) {
    var freeSpinIndex = 1;
    var freeSpinData = {};
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;
    freeSpinData.viewList = [];

    var rsFlag = 0, respin_multi = 0;
    var pos = 0;

    while (true) {
        //                 
        var tmpView, tmpWin = 0;

        while (true) {
            tmpView = RandomBaseView(reels, 2);

            if (rsFlag == 0 && Util.probability(5) && freeSpinIndex < freeSpinLength) {
                respin_multi = 0;
                pos = Util.random(2, 4) + Util.random(0, 4) * slotWidth;
                tmpView[pos] = 13;
                rsFlag = 1;
            }

            tmpWin = WinFromView(tmpView, bpl);
            if (tmpWin == 0 || Util.probability(percentList.freeWinPercent) || rsFlag == 1) {
                break;
            }
        }

        if (rsFlag == 0 || respin_multi == 0) {
            freeSpinIndex++;
        } else {

            for (var j = 0; j < slotHeight; ++j) {
                tmpView[pos % slotWidth + j * slotWidth] = respin_multi + 12;
            }

            tmpWin = WinFromView(tmpView, bpl);

            if (tmpWin == 0) {
                rsFlag = 0; respin_multi = 0;
            }
        }

        if (rsFlag) {
            ++respin_multi;
            if (respin_multi > 10) {
                respin_multi = 10;
            }
        }

        freeSpinWinMoney += tmpWin;
        freeSpinData.viewList.push(tmpView);

        if (freeSpinIndex > freeSpinLength) {
            freeSpinData.win = freeSpinWinMoney;
            break;
        }
    }
    
    return freeSpinData;
};

var StickyFreeViewCache = function (reels, bpl, fsLen) {
    var stSymbol = Util.random(3, 12);
    var freeSpinIndex = 1;
    var freeSpinData = {
        stickySymbol: stSymbol
    };
    var freeSpinWinMoney = 0;
    var freeSpinLength = fsLen;
    freeSpinData.viewList = [];

    var stFullFlag = [0, 0, 0, 0, 0];

    while (true) {
        var tmpView, tmpWin = 0;
        var stFlag = Util.probability(30);
        var wdFlag = Util.probability(10);
        
        // if (stFlag == true && wdFlag == true) {
        //     continue;
        // }

        while (true) {
            tmpView = RandomView(reels, 0);

            for (var i = 0; i < tmpView.length; i++) {
                if (tmpView[i] == stSymbol) {
                    ++tmpView[i];
                    if (tmpView[i] == 13) tmpView[i] = 3;
                }
            }

            tmpWin = WinFromView(tmpView, bpl);
            if (tmpWin == 0 || Util.probability(50)) {
                break;
            }
        }

        if (stFlag == true) {
            var stCnt = 1;
            if (Util.probability(50)) {
                stCnt = 2;
            } else if (Util.probability(50)) {
                stCnt = 3;
            } else if (Util.probability(30)) {
                stCnt = 4;
            }
            while (stCnt > 0) {
                var stPos = Util.random(0, 24);
                var stPosCheck = stPos % slotWidth;
                if (stPosCheck == 0 || stPosCheck == 5) {
                    continue;
                }
                tmpView[stPos] = 13;
                --stCnt;
            }
        }

        if (wdFlag == true) {
            var wdCnt = 1;
            if (Util.probability(50)) {
                wdCnt = 2;
            } else if (Util.probability(50)) {
                wdCnt = 3;
            } else if (Util.probability(30)) {
                wdCnt = 4;
            }
            while (wdCnt > 0) {
                var wdPos = Util.random(0, 24);
                var wdPosCheck = wdPos % slotWidth;
                if (wdPosCheck == 0 || wdPosCheck == 5) {
                    continue;
                }
                tmpView[wdPos] = 2;
                --wdCnt;
            }
        }

        //check view//
        if (freeSpinIndex > 1) {
            if (stFlag == true) {
                var check = 0;
                for (var i = 0; i < tmpView.length; i++) {
                    if (tmpView[i] == 13) {
                        if (preView[i] == 2) {
                            ++check;
                        }
                    }
                }
                if (check > 0) {
                    continue;
                }
            }
            if (wdFlag == true) {
                var check = 0;
                for (var i = 0; i < tmpView.length; i++) {
                    if (tmpView[i] == 2) {
                        if (preView[i] == 2) {
                            ++check;
                        }
                    }
                }
                if (check > 0) {
                    continue;
                }
            }

            for (var i = 0; i < tmpView.length; i++) {
                if (preView[i] == wild) {
                    tmpView[i] = wild;
                }
            }

            var tmp = GetSTFullFlag(tmpView, stFullFlag);
            stFullFlag = Util.clone(tmp);
        }

        preView = Util.clone(tmpView);
        for (var i = 0; i < tmpView.length; i++) {
            if (tmpView[i] == 13) {
                preView[i] = 2;
            }
        }

        tmpWin = WinFromView(tmpView, bpl);

        freeSpinIndex++;
        for (var i = 1; i < 5; i++) {
            if (stFullFlag[i] == 1) {
                freeSpinLength += 3;
                stFullFlag[i] = 23;
            }
        }

        freeSpinWinMoney += tmpWin;

        freeSpinData.viewList.push(tmpView);

        if (freeSpinIndex > freeSpinLength) {
            freeSpinData.win = freeSpinWinMoney;
            break;
        }
    }
    
    return freeSpinData;
};

var RandomBaseView = function (reels, scatterCnt) {
    var baseView = [];

    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                baseView[viewPos] = reels[i][reelPos];
            }
        }

        if (NumberOfScatters(baseView) <= scatterCnt) {
            break;
        }
    }
    return baseView;
};

var WinFromView = function (view, bpl) {
    var winMoney = 0;
    winLines = [];

    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        winMoney += PayLineSearch(view, 1, history, view[pos], 1, bpl);
    }
    return winMoney;
};

var PayLineSearch = function (view, step, history, symbolId, multi, bpl) {
    var winMoney = 0;

    if (step == slotWidth) {
        winMoney = bpl * payTable[step][symbolId] * multi;
        winLines.push(`0~${winMoney}~${history.join('~')}`);
        return winMoney;
    }

    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos]) || view[pos] >= 13) {
            positionsByStep.push(pos);
        }
    }

    if (positionsByStep.length == 0) {
        var matchCount = 0;
        for (var i = 0; i < history.length; i++) {
            if (history[i] >= 0) {
                matchCount++;
            }
        }
        var money = bpl * payTable[matchCount][symbolId] * multi;
        if (money > 0) {
            var lineResult = [];
            for (var i = 0; i < history.length; i++) {
                if (history[i] < 0) {
                    break;
                }
                lineResult.push(history[i]);
            }
            winLines.push(`0~${money}~${lineResult.join('~')}`);
        }
        return money;
    }

    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        var newMulti;
        if (multi > 1) newMulti = multi;
        else newMulti = 1;
        if (view[positionsByStep[i]] >= 13) {
            newMulti = newMulti * (view[positionsByStep[i]] - 12);
        }
        winMoney += PayLineSearch(view, step + 1, historyTmp, symbolId, newMulti, bpl);
    }
    return winMoney;
};

var WinFromScatterView = function(view, totalB) {
    var scatterCnt = NumberOfScatters(view);
    if(scatterCnt == 3) return 0;
    else if(scatterCnt == 4) return totalB * 20;
    else if (scatterCnt == 5) return totalB * 200;
    else if (scatterCnt == 6) return totalB * 2000;
    return 0;
};

var GetSTFullFlag = function (view, stFlag) {
    var stFullFlag = Util.clone(stFlag);
    for (var i = 1; i < slotWidth - 1; i++) {
        var j = 0;
        for (j = 0; j < slotHeight; j++) {
            pos = i + j * slotWidth;
            if (view[pos] != 13 && view[pos] != wild) {
                break;
            }
        }
        if (j < slotHeight) {
            continue;
        } else {
            if (stFullFlag[i] != 23) {
                stFullFlag[i] = 1;
            }
        }
    }
    return stFullFlag;
};

var GetBaseType = function (view) {
    var bType = NORMALBASE;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == 2) {
            bType = WILDBASE;
        } else if (view[i] > 13) {
            bType = MULTIWILDBASE;
            break;
        }
    }
    return bType;
};

var GetMultiWild = function () {
    var multiWild = 14;
    if (Util.probability(90)) {
        multiWild = 14;
    } else if (Util.probability(90)) {
        multiWild = 15;
    } else if (Util.probability(90)) {
        multiWild = 16;
    } else if (Util.probability(90)) {
        multiWild = 17;
    } else if (Util.probability(90)) {
        multiWild = 18;
    } else if (Util.probability(90)) {
        multiWild = 19;
    } else if (Util.probability(90)) {
        multiWild = 20;
    } else if (Util.probability(90)) {
        multiWild = 21;
    } else if (Util.probability(90)) {
        multiWild = 22;
    }
    return multiWild;
};

var GetMultiInfo = function(view) {
    var multiPos, multiwild;
    for (var i = 0; i < view.length; i++) {
        if (view[i] >= 13) {
            multiPos = i;
            multiwild = view[i];
            break;
        }
    }
    var multi = {
        Pos: multiPos,
        Wildx: multiwild,
    }
    return multi;
};

var GetMultisInfo = function(view, multiValue){
    var multisPos = [], multisValue = [];
    for (var i = 0; i < view.length; i++) {
        if ((i % 6) == 5) {
            continue;
        }
        if (view[i] == 2) {
            multisPos.push(i);
            multisValue.push(1);
        } else if (view[i] >= 13) {
            multisPos.push(i);
            multisValue.push(multiValue);
        }
    }
    var result = {
        Poses: multisPos,
        Values: multisValue,
    }
    return result;
};

var isWild = function (symbol) {
    return symbol == wild || symbol > 12;
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

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

module.exports = SlotMachine;