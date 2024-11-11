var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.prevTumbleStatus = "NOTUMBLE";
    this.tumbleStatus = "NOTUMBLE";
    //                                 
    this.rocketView = [];
    this.rocketFlag = false;
    this.rwd = "";
    this.srf = "";

    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //          
    this.tumbleIndex = 0;
    this.tumbles = [];
    this.tmb_res = 0;
    this.tumbleViewList = [];

    //                           
    this.scatterCounter = 0;
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];

    this.isScatterView = [];
    this.scatterViewList = [];
    this.rwdStr = [];
    this.wlm_p = [];
    this.wlm_v = [];

    this.totalBet = 0;
    this.betPerLine = 0;

    this.lineCount = 20;
    this.jackpotType = ["FREE"];

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         

    //                   
    this.buyMulti = 75;
    this.buyPatternCount = 30;
};

var scatter = 1, wild = 2;
var rocketWild = 3, slotWidth = 6, slotHeight = 4;
var winLines = [];
var tumblingPositions = [];
var baseReels = [
    [12, 9, 15, 12, 13, 6, 4, 11, 10, 14, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8, 1, 14, 8, 11, 9, 5, 4, 12, 9, 15, 12, 13, 6, 4, 11, 10, 14, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8],
    [12, 9, 15, 12, 13, 6, 4, 11, 3, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8, 1, 14, 8, 11, 9, 5, 4, 12, 9, 15, 12, 13, 6, 4, 11, 3, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8],
    [12, 9, 15, 12, 13, 6, 4, 11, 3, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8, 1, 14, 8, 11, 9, 5, 4, 12, 9, 15, 12, 13, 6, 4, 11, 3, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8,],
    [12, 9, 15, 12, 13, 6, 4, 11, 3, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8, 1, 14, 8, 11, 9, 5, 4, 12, 9, 15, 12, 13, 6, 4, 11, 3, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8,],
    [12, 9, 15, 12, 13, 6, 4, 11, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8, 1, 14, 8, 11, 9, 5, 4, 12, 9, 15, 12, 13, 6, 4, 11, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8],
    [12, 9, 15, 12, 13, 6, 4, 11, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8, 1, 14, 8, 11, 9, 5, 4, 12, 9, 15, 12, 13, 6, 4, 11, 10, 14, 2, 6, 15, 6, 15, 7, 13, 12, 5, 14, 11, 5, 13, 8, 4, 10, 7, 9, 7, 10, 8]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 20, 16, 12, 12, 8, 8, 4, 4, 2, 2, 1, 1, 0, 0],
    [0, 0, 0, 0, 40, 24, 20, 20, 12, 12, 6, 6, 4, 4, 2, 2, 0, 0],
    [0, 0, 0, 0, 150, 60, 40, 40, 30, 30, 16, 16, 10, 10, 8, 8, 0, 0],
    [0, 0, 0, 0, 300, 200, 100, 100, 60, 60, 40, 40, 30, 30, 20, 20, 0, 0]
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.prevTumbleStatus = this.tumbleStatus;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.rocketFlag = false;

    if (this.currentGame == "FREESPINCOUNT") {
        this.isScatterView = this.scatterViewList[this.freeSpinCntIndex];
        this.view = this.scatterViewList[this.freeSpinCntIndex + 1];
        this.rwd = this.rwdStr[this.freeSpinCntIndex - 1];
        this.freeSpinCntIndex++;
        if (this.rwd == null) {
            this.freeSpinIndex = 1;
            this.currentGame = "FREE";
        }
        return;
    }

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
        this.tumbleCacheList = viewCache.view;
        this.view = this.tumbleCacheList;
    } else if (viewCache.type == "FREE") {
        this.scatterViewList = viewCache.scatterViewList;
        this.rwdStr = viewCache.rwdStr;
        this.freeSpinCacheList = viewCache.view;
        this.tumbleCacheList = this.freeSpinCacheList;
        this.view = this.scatterViewList[0];
        this.freeSpinLength = viewCache.fsLen;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (viewCache.type != "FREE") {
        if (this.view.view) {
            this.view = this.view.view; //                 .
        } else {
            this.view = this.view[0];
            if (this.view.rocket) {
                this.rocketFlag = true;
                this.rocketView = this.view.view[0];
                this.view = this.view.view[1];
                var rocketStr = GetRwdSrfStr(this.rocketView, this.view);
                this.rwd = rocketStr.rwdStr;
                this.srf = rocketStr.srfStr;
            } else {
                this.view = this.view.view;
            }
        }
    }

    this.freeSpinWinMoney = 0;
    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = winLines;

    this.tmb_win = 0;
    this.tmb_res = 0;

    //                       
    if (this.winMoney > 0) {
        this.tumbleIndex = 1;
        this.tumbleStatus = "TUMBLE";
        this.tmb_win = this.winMoney;
        this.tumbles = GetTumbles(this.view, tumblingPositions);
    }

    if (isFreeSpinWin(this.view)) {
        this.currentGame = "FREESPINCOUNT";
        this.freeSpinCntIndex = 1;
    }
};

SlotMachine.prototype.Tumbling = function (player) {
    var multiView = this.tumbleCacheList[this.tumbleIndex];
    this.rocketFlag = false;

    if (multiView.rocket) {
        this.rocketFlag = true;
        this.rocketView = multiView.view[0];
        this.view = multiView.view[1];
        var rocketStr = GetRwdSrfStr(this.rocketView, this.view);
        this.rwd = rocketStr.rwdStr;
        this.srf = rocketStr.srfStr;
        //                                              
        var prevmulti = this.tumbleCacheList[this.tumbleIndex].multi;
        if (prevmulti.length > 0) {
            for (var i = 0; i < prevmulti.length; i++) {
                this.wlm_p.push(prevmulti[i].pos);
                this.wlm_v.push(prevmulti[i].value);
            }
        }
    } else {
        this.view = multiView.view;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);

    if (this.winMoney > 0) {
        var tumblePos = Util.clone(tumblingPositions);
        if (multiView.rocket) {
            var prevmulti1 = multiView.multi;
            if (prevmulti1.length > 0) {
                var multi = 0;
                for (var i = 0; i < prevmulti1.length; i++) {
                    for (var j = 0; j < tumblePos.length; j++) {
                        if (prevmulti1[i].pos == tumblePos[j]) {
                            multi += prevmulti1[i].value;
                        }
                    }
                }
                //                                               
                if (multi != 0) {
                    this.winMoney = this.winMoney * multi;
                }
            }
        }
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winLines = winLines;
    this.tumbles = GetTumbles(this.view, tumblingPositions);
    this.tumbleIndex++;
    this.tmb_win += this.winMoney;

    if (this.currentGame == "FREE") {
        this.freeSpinWinMoney += this.winMoney;
    }
    //                 
    if (this.winMoney == 0) {
        this.tmb_res += this.tmb_win;
        this.tumbleStatus = "NOTUMBLE";
    }
}

SlotMachine.prototype.FreeSpin = function (player) {
    if (this.tumbleStatus == "TUMBLE") {
        this.Tumbling(player);

        if (this.tumbleStatus == "NOTUMBLE") {
            //                              
            // this.freeSpinWinMoney += this.tmb_res;
            if (this.freeSpinIndex > this.freeSpinLength) {
                this.currentGame = "BASE";
            }
        }
        return;
    }

    this.tumbleCacheList = this.freeSpinCacheList[this.freeSpinIndex - 1];
    var multiView = this.tumbleCacheList[0];
    if (multiView.rocket) {
        this.rocketFlag = true;
        this.rocketView = multiView.view[0];
        this.view = multiView.view[1];
        var rocketStr = GetRwdSrfStr(this.rocketView, this.view);
        this.rwd = rocketStr.rwdStr;
        this.srf = rocketStr.srfStr;
        //                                              
        var prevmulti = this.tumbleCacheList[0].multi;
        if (prevmulti.length > 0) {
            for (var i = 0; i < prevmulti.length; i++) {
                this.wlm_p.push(prevmulti[i].pos);
                this.wlm_v.push(prevmulti[i].value);
            }
        }
    } else {
        //                                                                 
        if (this.tumbleCacheList[0].multi && this.tumbleCacheList[0].multi.length > 0) {
            var prevmulti = this.tumbleCacheList[0].multi;
            if (prevmulti.length > 0) {
                for (var i = 0; i < prevmulti.length; i++) {
                    this.wlm_p.push(prevmulti[i].pos);
                    this.wlm_v.push(prevmulti[i].value);
                }
            }
        }
        this.view = multiView.view;
    }

    this.tmb_res = 0;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    if (this.winMoney > 0) {
        var tumblePos = Util.clone(tumblingPositions);
        if (multiView.rocket) {
            var prevmulti1 = multiView.multi;
            if (prevmulti1.length > 0) {
                var multi = 0;
                for (var i = 0; i < prevmulti1.length; i++) {
                    for (var j = 0; j < tumblePos.length; j++) {
                        if (prevmulti1[i].pos == tumblePos[j]) {
                            multi += prevmulti1[i].value;
                        }
                    }
                }
                //                                               
                if (multi != 0) {
                    this.winMoney = this.winMoney * multi;
                }
            }
        }
    }
    this.tumbles = GetTumbles(this.view, tumblingPositions);
    this.winLines = winLines;

    this.freeSpinWinMoney += this.winMoney;
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
}

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
        var { obj, tumbleWinMoney } = RandomZeroView(baseReels, bpl);
        pattern.win = tumbleWinMoney;
        pattern.view = obj;
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
        default: break;
    }

}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCount = Util.random(6, 10);

    var freeSpinScatterViewList = [];
    freeSpinScatterViewList.push(scatterView);
    var scatterViewList = GenerateScatterView(scatterView, fsCount);

    for (var i = 0; i < scatterViewList.resultScatterViewList.length; i++) {
        freeSpinScatterViewList.push(scatterViewList.resultScatterViewList[i]);
    }

    //                           
    var fsCache = RandomFreeViewCache(baseReels, bpl, fsWin, fsCount);

    return {
        win: fsCache.win,
        bpl: bpl,
        scatterViewList: freeSpinScatterViewList,
        view: fsCache.cache,
        rwdStr: scatterViewList.rwdStr,
        fsLen: fsCount,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
}

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCount = Util.random(6, 11);

    var freeSpinScatterViewList = [];
    freeSpinScatterViewList.push(scatterView);
    var scatterViewList = GenerateScatterView(scatterView, fsCount);

    for (var i = 0; i < scatterViewList.resultScatterViewList.length; i++) {
        freeSpinScatterViewList.push(scatterViewList.resultScatterViewList[i]);
    }

    //                           
    var fsCache = BuyBonusViewCache(baseReels, bpl, fsCount,  (totalBet * this.buyMulti) / 5);

    return {
        win: fsCache.win,
        bpl: bpl,
        scatterViewList: freeSpinScatterViewList,
        view: fsCache.cache,
        rwdStr: scatterViewList.rwdStr,
        fsLen: fsCount,
        type: "FREE",
        isCall: 0,
    };
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0, calcCount = 0;
    while (true) {
        var tumbleWinMoney = 0;
        var view = RandomView(reels);
        //                                         
        var initObj = {
            rocket: false,
            view: view,
        }
        //                                 
        var initRocketView = RandomRocketView(initObj, null);
        if (initRocketView.rocket) {
            //                                      
            var initView = initRocketView.view[1];
            var viewList = [initRocketView];
        } else {
            //                              
            initView = initRocketView.view;
            var viewList = [initObj];
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }

        var tumbleWinMoney = WinFromView(initView, bpl);

        if (tumbleWinMoney == 0) {
            continue;
        }

        //                       
        while (true) {
            var lastView = viewList[viewList.length - 1];
            var lastTumbling = Util.clone(tumblingPositions);
            if (lastView.rocket) {
                var newView = GetNextViewByTumble(lastView.view[1], lastTumbling);
            } else {
                var newView = GetNextViewByTumble(lastView.view, lastTumbling);
            }
            var nWinMoney = WinFromView(newView, bpl);

            //                                                                                 
            var obj1 = {
                rocket: false,
                view: newView
            }
            var rocketView = RandomRocketView(obj1, null);

            viewList.push(rocketView);
            tumbleWinMoney += nWinMoney;

            //                 
            if (nWinMoney == 0) {
                if (rocketView.rocket) {
                    continue;
                } else {
                    break;
                }
            }
        }

        if (tumbleWinMoney > bottomLimit && tumbleWinMoney <= maxWin) {
            return { viewList, tumbleWinMoney };
        }

    }
};

var RandomZeroView = function (reels, bpl) {
    while (true) {
        var view = RandomView(reels);
        var winMoney = WinFromView(view, bpl);
        if (isRocktView(view)) {
            continue;
        }
        if (winMoney == 0) {
            var obj = {
                rocket: false,
                view: view,
            }
            var tumbleWinMoney = 0;
            return { obj, tumbleWinMoney };
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

        if (NumberOfScatters(resultView) == 0 && NumberOfRocket(resultView) <= 1) {
            break;
        } else {
            continue;
        }
    }

    return resultView;
};

var RandomScatterView = function (reels, bpl) {
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
        if (WinFromView(resultView, bpl) == 0 && !isNullRocketView(resultView)) {
            if (NumberOfScatters(resultView) >= 3 && NumberOfScatters(resultView) < 24) {
                break;
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
        var freeSpinData = {};
        freeSpinData = BuyBonusViewCache(reels, bpl, fsLen)

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

var BuyBonusViewCache = function (reels, bpl, fsLen, lowLimit = 0) {
    while (true) {
        var freeSpinIndex = 1;
        var freeSpinData = {};
        var freeSpinCacheList = [];
        var freeSpinWinMoney = 0;
        var freeSpinLength = fsLen;

        while (true) {
            var tumbleWinMoney = 0;
            var multiTumPos = []; //                                       
            var selMultiPos = []; //                                           
            var view = RandomView(reels);
            //                                         
            var initObj = {
                rocket: false,
                view: view,
            }
            //              
            var initRocketView = RandomRocketView(initObj, null, true);
            if (initRocketView.rocket) {
                //                                      
                var initView = initRocketView.view[1];
                var viewList = [initRocketView];
            } else {
                //                              
                initView = initRocketView.view;
                var viewList = [initObj];
            }

            var tumbleWinMoney = WinFromView(initView, bpl);

            if (tumbleWinMoney == 0) {
                continue;
            }

            //                                                                                 
            if (tumbleWinMoney > 0) {
                var lastTumblePos = Util.clone(tumblingPositions);
                if (initRocketView.rocket) {
                    if (initRocketView.multi.length > 0) {
                        multiTumPos = initRocketView.multi; //                              
                        var multi = 0;
                        for (var i = 0; i < multiTumPos.length; i++) {
                            for (var j = 0; j < lastTumblePos.length; j++) {
                                if (multiTumPos[i].pos == lastTumblePos[j]) {
                                    multi += multiTumPos[i].value;
                                    selMultiPos.push(multiTumPos[i].pos); //                                                               
                                }
                            }
                        }

                        //                                               
                        if (multi != 0) {
                            tumbleWinMoney = tumbleWinMoney * multi;
                        }
                    }
                }
            }

            if (multiTumPos && multiTumPos.length > 0) {
                if (selMultiPos && selMultiPos.length > 0) {
                    for (var i = 0; i < selMultiPos.length; i++) {
                        multiTumPos = multiTumPos.filter(function (a) { return a.pos != selMultiPos[i] })
                    }
                }
            }

            //                       
            while (true) {
                var lastView = viewList[viewList.length - 1]; //                                                                        
                var lastTumbling = Util.clone(tumblingPositions);
                if (lastView.rocket) {
                    var newView = GetNextViewByTumble(lastView.view[1], lastTumbling);
                } else {
                    var newView = GetNextViewByTumble(lastView.view, lastTumbling);
                }
                //                                                                                 
                var obj1 = {
                    rocket: false,
                    view: newView
                }
                var rocketFreeView = [];
                rocketFreeView = RandomRocketView(obj1, multiTumPos, true);
                if (rocketFreeView.rocket) {
                    var newRocketView = rocketFreeView.view[1];
                } else {
                    var newRocketView = rocketFreeView.view;
                }
                var nWinMoney = WinFromView(newRocketView, bpl);

                if (nWinMoney > 0) {
                    //                                                                                                             
                    var lastTumblePos = Util.clone(tumblingPositions);
                    if (rocketFreeView.rocket) {
                        if (rocketFreeView.multi.length > 0) {

                            multiTumPos = rocketFreeView.multi; //          
                            selMultiPos = [];
                            var multi = 0;
                            for (var i = 0; i < multiTumPos.length; i++) {
                                for (var j = 0; j < lastTumblePos.length; j++) {
                                    if (multiTumPos[i].pos == lastTumblePos[j]) {
                                        multi += multiTumPos[i].value;
                                        selMultiPos.push(multiTumPos[i].pos); //                                                               
                                    }
                                }
                            }
                            //                                               
                            if (multi != 0) {
                                nWinMoney = nWinMoney * multi;
                            }

                        }
                    }
                }

                //                                                                                                                                   .
                if (multiTumPos && multiTumPos.length > 0) {
                    if (selMultiPos && selMultiPos.length > 0) {
                        for (var i = 0; i < selMultiPos.length; i++) {
                            multiTumPos = multiTumPos.filter(function (a) { return a.pos != selMultiPos[i] })
                        }
                    }
                }

                viewList.push(rocketFreeView);
                tumbleWinMoney += nWinMoney;

                //                 
                if (nWinMoney == 0) {
                    multiTumPos = [];
                    selMultiPos = [];
                    //                                                                                             
                    if (rocketFreeView.rocket) {
                        continue;
                    } else {
                        break;
                    }
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

        if (freeSpinData.win > lowLimit) {
            return freeSpinData;
        }
    }
}

var GetNextViewByTumble = function (view, tumbles) {
    while (true) {
        var tumbleView = Util.clone(view);
        var tumblePositions = Util.clone(tumblingPositions);

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
        if (!isFreeSpinWin(newView)) {
            break;
        }
    }
    return newView;
};

var GenerateScatterView = function (scatterView, fsCount) {
    var resultView = Util.clone(scatterView);
    var scatterPointList = [], initScatterPointList = [];
    var resultScatterViewList = [];
    var rwdStr = [];

    //                             
    for (var i = 0; i < resultView.length; i++) {
        if (resultView[i] == scatter) {
            scatterPointList.push(i);
            initScatterPointList.push(i);
        }
    }
    //             
    var spinScatterView = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        spinScatterView[i] = 16;
    }
    //                          
    for (var i = 0; i < scatterPointList.length; i++) {
        spinScatterView[scatterPointList[i]] = scatter;
    }
    //              
    resultScatterViewList.push(spinScatterView);

    for (var index = scatterPointList.length; index < fsCount;) {
        var counter = 0;
        //                                                
        var cloneView = Util.clone(resultScatterViewList[resultScatterViewList.length - 1]);
        while (true) {
            var posNum = Util.random(1, fsCount - index + 1); //                          
            var pos = [];

            for (var k = 0; k < posNum; k++) {
                pos.push(Util.random(0, 24));
            }

            //                    
            for (var l = 0; l < posNum; l++) {
                for (var j = 0; j < initScatterPointList.length; j++) {
                    if (initScatterPointList[j] == pos[l]) {
                        counter++;
                    }
                }
            }

            //                                                                          
            if (counter == 0) {
                for (var m = 0; m < posNum; m++) {
                    initScatterPointList.push(pos[m]);
                    cloneView[pos[m]] = scatter;
                }
                var str = `1~${pos.join(',')}`;
                rwdStr.push(str);
                resultScatterViewList.push(cloneView);
                index += posNum;
                break;
            } else {
                counter = 0;
                continue;
            }
        }
    }

    resultScatterViewList.push(resultScatterViewList[resultScatterViewList.length - 1]);
    return { resultScatterViewList, rwdStr };
}

//                                  
var RandomRocketView = function (view, preMultiVal, isfreeflag = false) {
    if (isRocktView(view.view)) {
        var resultView = Util.clone(view.view);
        var rocketPos = [];
        var viewList = [view.view];
        //                                       
        for (var i = 0; i < resultView.length; i++) {
            if (resultView[i] == rocketWild) {
                rocketPos.push(i);
            }
        }

        //                                    
        var randomWildSymbolPosNum = Util.random(1, 3);
        var multiValuePos = [];
        var mulitValue = 0;

        for (var i = 0; i < randomWildSymbolPosNum; i++) {
            while (true) {
                var pos = Util.random(0, 24);
                if (isFirstReel(pos)) {
                    continue; //                                     1                                          .
                }
                if (pos != rocketPos[0] && resultView[pos] != wild) {
                    if (isfreeflag === true) {
                        resultView[pos] = 17;
                        //                                                 
                        if (Util.probability(60)) {
                            mulitValue = Util.random(2, 4);
                            var multiObj = {
                                pos: pos,
                                value: mulitValue
                            }
                            multiValuePos.push(multiObj);
                        }
                    } else {
                        resultView[pos] = 17;
                    }
                    break;
                }
            }
        }
        resultView[rocketPos[0]] = 17;

        if (isfreeflag) {
            //                                                                          (                                   )
            if (preMultiVal != null && preMultiVal.length > 0) {
                for (var i = 0; i < preMultiVal.length; i++) {
                    multiValuePos.push(preMultiVal[i]);
                }
            }
        }

        viewList.push(resultView);
        if (isfreeflag) {
            return {
                rocket: true,
                view: viewList,
                multi: multiValuePos
            };
        } else {
            return {
                rocket: true,
                view: viewList,
                multi: multiValuePos
            };
        }

    } else {
        var prevMultiValPos = [];
        if (isfreeflag) {
            if (preMultiVal != null && preMultiVal.length > 0) {
                for (var i = 0; i < preMultiVal.length; i++) {
                    prevMultiValPos.push(preMultiVal[i]);
                }
            }
        }
        return {
            rocket: false,
            multi: prevMultiValPos,
            view: view.view
        };
    }
};

var WinFromView = function (view, bpl) {
    var money = 0;
    winLines = [];
    tumblingPositions = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = i * slotWidth;
        var history = [pos];
        money += RecursiveSearch(view, 1, history, view[pos], bpl);
    }
    return money;
};

var RecursiveSearch = function (view, step, history, symbolId, bpl) {

    //                                                             
    if (step == slotWidth) {
        var winMoney = bpl * payTable[step][symbolId];
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                if (tumblingPositions.indexOf(history[i]) < 0) {
                    tumblingPositions.push(history[i]);
                }
            }
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    //                                                                                         
    var positionsByStep = [];
    for (var i = 0; i < slotHeight; i++) {
        var pos = step + i * slotWidth;
        if (view[pos] == symbolId || isWild(view[pos])) {
            positionsByStep.push(pos);
        }
    }

    //                                                                              
    if (positionsByStep.length == 0) {
        var matchCount = history.length;
        var winMoney = bpl * payTable[matchCount][symbolId];
        if (winMoney > 0) {
            for (var i = 0; i < history.length; i++) {
                if (tumblingPositions.indexOf(history[i]) < 0) {
                    tumblingPositions.push(history[i]);
                }
            }
            winLines.push(`0~${winMoney}~${history.join('~')}`);
        }
        return winMoney;
    }

    var winMoney = 0;
    for (var i = 0; i < positionsByStep.length; i++) {
        var historyTmp = Util.clone(history);
        historyTmp[step] = positionsByStep[i];
        winMoney += RecursiveSearch(view, step + 1, historyTmp, symbolId, bpl);
    }
    return winMoney;
};

var GetTumbles = function (view, positions) {
    var tumbles = [];
    for (var i = 0; i < positions.length; i++) {
        var tumblePos = positions[i];
        if (tumblePos < 0 || tumblePos >= view.length) {
            continue;
        }
        tumbles.push(`${tumblePos},${view[tumblePos]}`);
    }
    if (tumbles.length == 0) {
        return "";
    }
    return tumbles.join('~');
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var GetRwdSrfStr = function (firstView, lastView) {
    var rocketPos = null;
    var newRocktPos = [];
    for (var i = 0; i < firstView.length; i++) {
        if (firstView[i] == rocketWild) {
            rocketPos = i;
        }
    }

    for (var i = 0; i < lastView.length; i++) {
        if ((rocketPos != i) && (lastView[i] == 17)) {
            newRocktPos.push(i);
        }
    }

    var srfStr = `3~17~${rocketPos}`;
    var rwdStr = `17~${newRocktPos.join(',')}`

    return { srfStr, rwdStr };
};

var isFirstReel = function (pos) {
    var reel = [0, 6, 12, 18];
    for (var i = 0; i < reel.length; i++) {
        if (reel[i] == pos) {
            return true;
        }
    }
    return false;
};

var NumberOfRocket = function (view) {
    var counter = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == rocketWild) {
            counter++;
        }
    }
    return counter;
};

var isRocktView = function (view) {
    var view = Util.clone(view);
    var counter = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == rocketWild) {
            counter++
        }
    }
    if (counter == 0) {
        return false;
    } else {
        return true;
    }
};

var isNullRocketView = function (view) {
    var view = Util.clone(view);
    for (var i = 0; i < view.length; i++) {
        if (view[i] == rocketWild) {
            return true;
        }
    }
    return false;
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

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isWild = function (symbol) {
    return symbol == 17 || symbol == wild;
}

module.exports = SlotMachine;