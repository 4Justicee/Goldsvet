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
    this.moneyCache = {};
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinBeforeMoney = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.firstIndex = 0;
    this.totalStep = 0;

    this.gambleWin = false;
    this.gambleIndex = 0;

    this.bonusTotalLen = 0; //                                 
    this.bonusSpinIndex = 0;
    this.isFirstRoad = 1;
    this.preRoadWinMoney = 0;

    this.currentSelectBonus = "";
    this.bonusStatus = "";

    //                         
    this.isBox = false;
    this.boxStatus = [];
    this.boxValue = null;
    this.boxSelectIndex = 0;
    this.totalMulti = 0;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; // 
};

var scatter = 1;
var wild = 2;
var slotWidth = 5;
var slotHeight = 3;
var baseReels = [
    [9, 7, 11, 10, 9, 2, 3, 3, 3, 3, 11, 1, 8, 11, 9, 9, 11, 9, 8, 10, 7, 7, 5, 4, 5, 8, 5, 8, 10, 8, 6, 6, 11, 2, 6, 6, 7, 11, 4, 4, 10, 5, 3, 3, 9, 10],
    [9, 7, 10, 10, 2, 11, 5, 5, 11, 7, 11, 8, 4, 4, 9, 6, 6, 9, 3, 3, 3, 3, 6, 10, 11, 5, 11, 7, 1, 6, 7, 7, 9, 8, 10, 8, 4, 2, 8, 9, 9, 11, 10, 8],
    [11, 8, 11, 5, 9, 4, 10, 7, 3, 2, 9, 7, 6, 4, 10, 8, 3, 3, 3, 3, 5, 1, 7, 4, 5, 11, 7, 8, 8, 6, 5, 9, 11, 8, 10, 3, 3, 10, 10, 8, 4, 9, 5, 9, 6, 11, 1],
    [4, 4, 11, 10, 8, 5, 6, 6, 8, 11, 3, 3, 3, 3, 6, 1, 4, 9, 5, 5, 8, 9, 4, 5, 11, 6, 9, 2, 10, 6, 8, 5, 8, 11, 10, 7, 7, 10, 9, 10, 9, 3, 3, 11, 9, 7, 8, 8, 11, 10],
    [11, 5, 3, 3, 3, 3, 3, 4, 8, 5, 1, 10, 11, 9, 10, 8, 6, 6, 10, 4, 4, 10, 8, 7, 7, 11, 4, 10, 8, 11, 11, 10, 9, 9, 11, 7, 2, 6, 7, 7, 5, 6, 11, 9, 10, 9, 9, 10, 8, 6, 9, 10, 6, 10, 10, 9, 8, 5, 11, 4, 8, 9, 8, 11, 11, 4, 6, 2, 5, 5, 7, 6, 9, 8, 8]
];
var freeReels = [
    [9, 7, 11, 10, 9, 15, 3, 3, 3, 3, 11, 8, 11, 9, 9, 11, 9, 8, 10, 7, 7, 5, 4, 5, 8, 5, 8, 10, 8, 6, 6, 11, 15, 6, 6, 7, 11, 4, 4, 10, 5, 3, 3, 9, 10],
    [9, 7, 10, 10, 15, 11, 5, 5, 11, 7, 11, 8, 4, 4, 9, 6, 6, 9, 3, 3, 3, 3, 6, 10, 11, 5, 11, 7, 6, 7, 7, 9, 8, 10, 8, 4, 15, 8, 9, 9, 11, 10, 8],
    [11, 8, 11, 5, 9, 4, 10, 7, 3, 15, 9, 7, 6, 4, 10, 8, 3, 3, 3, 3, 5, 7, 4, 5, 11, 7, 8, 8, 6, 5, 9, 11, 8, 10, 3, 3, 10, 10, 8, 4, 9, 5, 9, 6, 11],
    [4, 4, 11, 10, 8, 5, 6, 6, 8, 11, 3, 3, 3, 3, 6, 4, 9, 5, 5, 8, 9, 4, 5, 11, 6, 9, 15, 10, 6, 8, 5, 8, 11, 10, 7, 7, 10, 9, 10, 9, 3, 3, 11, 9, 7, 8, 8, 11, 10],
    [11, 5, 3, 3, 3, 3, 3, 4, 8, 5, 10, 11, 9, 10, 8, 6, 6, 10, 4, 4, 10, 8, 7, 7, 11, 4, 10, 8, 11, 11, 10, 9, 9, 11, 7, 15, 6, 7, 7, 5, 6, 11, 9, 10, 9, 9, 10, 8, 6, 9, 10, 6, 10, 10, 9, 8, 5, 11, 4, 8, 9, 8, 11, 11, 4, 6, 15, 5, 5, 7, 6, 9, 8, 8]
]
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 20, 20, 10, 10, 8, 8, 4, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 200, 100, 100, 60, 60, 20, 20, 10, 10, 0, 0, 0, 0, 0],
    [0, 0, 0, 500, 300, 300, 200, 200, 100, 100, 80, 80, 0, 0, 0, 0, 0]
];
var payLines = [
    [5, 6, 7, 8, 9],          // 1
    [0, 1, 2, 3, 4],          // 2
    [10, 11, 12, 13, 14],          // 3
    [0, 6, 12, 8, 4],          // 4
    [10, 6, 2, 8, 14],          // 5
    [5, 1, 2, 3, 9],          // 6
    [5, 11, 12, 13, 9],          // 7
    [0, 1, 7, 13, 14],          // 8
    [10, 11, 7, 3, 4],          // 9
    [5, 11, 7, 3, 9],          // 10
    [5, 1, 7, 13, 9],          // 11
    [0, 6, 7, 8, 4],          // 12
    [10, 6, 7, 8, 14],          // 13
    [0, 6, 2, 8, 4],          // 14
    [10, 6, 12, 8, 14],          // 15
    [5, 6, 2, 8, 9],          // 16
    [5, 6, 12, 8, 9],          // 17
    [0, 1, 12, 3, 4],           // 18
    [10, 11, 2, 13, 14],           // 19
    [0, 11, 12, 13, 4],         // 20
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
    this.viewStatus = null;

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
        var cache = viewCache.view;
        if (cache.status == undefined) {
            this.view = cache;
        } else {
            this.view = cache.isView;
            this.viewStatus = cache;
        }
    } else if (viewCache.type == "FREE") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.view = this.freeSpinCacheList[0];
    }

    //       

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    //                   ;
    if (isFreeSpinWin(this.view)) {
        //                                        
        this.totalStep = 0;
        this.gambleWin = false;
        this.currentSelectBonus = "";
        this.bonusEnd = false;
        this.moneyBonusWin = 0;
        this.isFirstRoad = 1;
        this.firstIndex = 0;
        this.preRoadWinMoney = 0;
        this.bonusTotalLen = 0;
        this.bonusSpinIndex = 0;
        this.totalMulti = 0;

        this.freeSpinIndex = 0;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "BONUS";
        this.bonusEnd = false;
        this.gambleIndex = 0;
    }
};

SlotMachine.prototype.FreeSpin = function (player) {
    this.view = this.freeSpinCacheList[this.freeSpinIndex];

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.totalMulti += GetMultiFromView(this.view);

    this.winMoney *= (this.totalMulti + 1);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex >= this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.BonusSpin = function (player, param) {
    this.gameSort = this.currentGame;
    this.prevBonusIndex = this.firstIndex;
    this.winMoney = 0;

    if (this.firstIndex == 0) {
        //                                                 . spbf,spbf,swfof,swrssf,cbf
        var maskArr = ["", "", "", "", ""], defaultMask = ["spbf", "mbf", "swfof", "swrssf", "cbf"], status = [0, 0, 0, 0, 0];
        var index = Number(param.ind);
        var selectVal = defaultMask[Util.random(0, 2)];
        // var selectVal = "swfof";
        maskArr[index] = selectVal;
        status[index] = 1;

        this.bonusLevel = defaultMask.indexOf(selectVal);

        //                          
        defaultMask = defaultMask.filter(function (val, index, arr) { return val != selectVal });

        var j = 0;
        for (var i = 0; i < maskArr.length; i++) {
            if (maskArr[i] == "") {
                maskArr[i] = defaultMask[j];
                j++;
            }
        }

        this.statusStr = status.join();
        this.bonusStatus = maskArr.join();
        this.currentSelectBonus = selectVal;

        this.firstIndex = 1;

    } else if (this.firstIndex == 1) {
        this.firstIndex = 2;
    } else {
        //                                       .
        this.gambleIndex++;
        var gambleSelectFlag = Number(param.ind);

        if (gambleSelectFlag && this.firstIndex == 2) {
            //                              
            this.gambleWin = false;

            var winPercent = 0;
            if (this.bonusLevel == 0) {
                winPercent = 55;
            } else if (this.bonusLevel == 1) {
                winPercent = 50;
            } else if (this.bonusLevel == 2) {
                winPercent = 0;
            } else if (this.bonusLevel == 3) {
                winPercent = 0;
            }

            var gambleWin = Util.probability(winPercent);
            if (gambleWin) {
                var defaultMask = ["spbf", "mbf", "swfof", "swrssf", "cbf"];
                this.bonusLevel++;
                this.gambleWin = true;

                this.currentSelectBonus = defaultMask[this.bonusLevel];

                if (this.bonusLevel == 4) {
                    this.bonusLevel--;
                    this.gambleWin = false;
                    this.currentGame = "BASE";
                    this.bonusEnd = true;
                }
            } else {
                this.moneyBonusWin = player.betPerLine * 20 * 14;
                this.winMoney = player.betPerLine * 20 * 14;
                this.currentGame = "BASE";
                this.bonusEnd = true;
            }

        } else {
            this.firstIndex = 3;

            if (this.currentSelectBonus == "swfof") {
                //                              
                this.freeSpinIndex = 0;
                this.currentGame = "FREE";
                this.freeSpinLength = 10;
                this.freeSpinCacheList = this.freeSpinCacheList[this.bonusLevel + 1].viewList;
            } else if (this.currentSelectBonus == "swrssf") {
                //                              
                this.freeSpinIndex = 0;
                this.currentGame = "FREE";
                this.freeSpinLength = 10;
                this.freeSpinCacheList = this.freeSpinCacheList[this.bonusLevel + 1].viewList;
            }
        }

        if (this.firstIndex == 3 && this.prevBonusIndex == 3) {
            //                                
            if (this.currentSelectBonus == "spbf") {
                //                                    
                this.boxStatus = this.freeSpinCacheList[this.bonusLevel + 1].multiList;
                this.bonusTotalLen = this.boxStatus.length;
                this.boxSelectIndex = Number(param.ind);

                if (this.bonusSpinIndex >= this.bonusTotalLen) {
                    this.bonusEnd = true;
                    this.winMoney = 0;
                    if (this.isBox) {
                        this.currentGame = "BASE";
                        this.winMoney = 0;
                        this.moneyBonusWin = this.totalMulti * player.betPerLine * 20;
                        this.currentSelectBonus = "spbf";
                    }
                    this.isBox = !this.isBox;
                } else {
                    this.winMoney = 0;
                    if (this.isBox) {
                        this.boxValue = this.boxStatus[this.bonusSpinIndex];
                        this.totalMulti += this.boxValue;

                        var currentMoney = this.totalMulti * player.betPerLine * 20;
                        this.winMoney = currentMoney - this.preRoadWinMoney;
                        this.preRoadWinMoney = currentMoney; //                                        

                        this.bonusSpinIndex++;
                    }
                    this.isBox = !this.isBox;
                }
            } else if (this.currentSelectBonus == "mbf") {
                //                                              
                if (this.isFirstRoad >= 2) {
                    this.boxStatus = this.freeSpinCacheList[this.bonusLevel + 1].step;
                    this.bonusTotalLen = this.boxStatus.length;

                    if (this.bonusSpinIndex >= this.bonusTotalLen) {
                        this.moneyBonusWin = this.totalMulti * player.betPerLine * 20;
                        this.currentGame = "BASE";
                        this.currentSelectBonus = "mbf";
                        this.winMoney = 0;
                    } else {
                        var multiList = [1, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 19, 20, 22, 25, 30, 35, 40, 50, 0];

                        this.boxValue = this.boxStatus[this.bonusSpinIndex];
                        this.totalStep += this.boxValue;
                        this.totalMulti = multiList[this.totalStep];

                        var currentMoney = this.totalMulti * player.betPerLine * 20;

                        this.winMoney = currentMoney - this.preRoadWinMoney;

                        this.preRoadWinMoney = currentMoney; //                                        

                        this.bonusSpinIndex++;
                    }

                }

                if (this.isFirstRoad == 1 || this.isFirstRoad == 2) {
                    this.isFirstRoad++; //                                           
                }

            }
        }
    }

};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {


    if (baseWin > 0) {
        var { tmpView, tmpWin } = RandomWinView(baseReels, bpl, baseWin);
    } else {
        var { tmpView, tmpWin } = RandomZeroView(baseReels, bpl);
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
    var sccaterCount = 10;
    var freeSpinData = {
        length: this.freeSpinCount,
        viewList: [],
    };

    //                           

    var viewList = [], moneyList = [];
    var baseRoseGambleWin = bpl * 20 * 14; //                                      14             
    moneyList.push(baseRoseGambleWin);

    var spdfView = RandomFreeBoxCache(bpl);

    viewList.push({
        isfree: "spbf",
        multiList: spdfView.multiList
    })
    moneyList.push(spdfView.win);

    var mdfView = RandomFreeRoadCache(bpl);

    viewList.push({
        isfree: "mbf",
        step: mdfView.step
    })
    moneyList.push(mdfView.win);

    var cache = RandomFreeViewCache(baseReels, bpl, fsWin, sccaterCount);

    viewList.push({
        isfree: "swfof",
        viewList: cache.viewList
    })
    moneyList.push(cache.win);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(viewList);

    var maxWin = Util.maxInArr(moneyList).value;

    return {
        win: maxWin + scatterWinMoney,
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

        if (Util.probability(6)) {
            if (Util.probability(40)) {
                tmpView = GenRandomEggView(baseReels); //                
                tmpWin = WinFromView(tmpView.isView, bpl);
            } else {
                tmpView = GenRandWildView(baseReels); //                          
                tmpWin = WinFromView(tmpView.isView, bpl);
            }
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    return { tmpView, tmpWin };
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
    return { tmpView, tmpWin };
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

        if (NumberOfScatters(view) == 3 && WinFromView(view, bpl) == 0) {
            break;
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
        var totalMulti = 1;
        while (true) {
            var fsview, fsWin;
            while (true) {
                fsview = RandomView(freeReels);
                fsWin = WinFromView(fsview, bpl);

                if (Util.probability(50) || fsWin == 0) {
                    break;
                }
            }

            totalMulti += GetMultiFromView(fsview);
            fsWin *= totalMulti;

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

// spbf                                         1            
var RandomFreeBoxCache = function (bpl) {
    var randMultiCount = Util.random(3, 5);
    var multiList = [], totalMulti = 0;

    for (var i = 0; i < randMultiCount; i++) {
        var mVal = Util.random(3, 10);
        totalMulti += mVal;
        multiList.push(mVal);
    }

    var resMoney = bpl * totalMulti * 20; //              * bpl

    return {
        win: resMoney,
        multiList: multiList
    }
}

// mbf                                      2             
var RandomFreeRoadCache = function (bpl) {
    var stepCount = Util.random(3, 5);
    var stepList = [];
    var totalMulti = 0, totalStep = 0;
    var multiList = [1, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 19, 20, 22, 25, 30, 35, 40, 50, 0];

    for (var i = 0; i < stepCount; i++) {
        var multi = Util.random(2, 5); //                                 
        totalStep += multi;
        stepList.push(multi); //                    
    }

    totalMulti = multiList[totalStep];

    return {
        win: totalMulti * bpl * 20, //              * bpl
        step: stepList
    }
}

//                       
var GenRandomEggView = function (reels) {
    var view = RandomView(reels);
    var randEggsNum = Util.random(5, 8);
    var isView = [...view];
    var randSymbol = Util.random(3, 12);

    var posList = [];

    for (var i = 0; i < randEggsNum; i++) {
        var pos = Util.random(0, 15);
        if (posList.indexOf(pos) == -1) {
            posList.push(pos);
        } else {
            continue;
        }
        isView[pos] = randSymbol;
    }

    var resEggObj = {
        status: "egg",
        sym: randSymbol, //                           
        pos: posList, //                        
        isView: isView
    }
    return resEggObj;
};

var GenRandWildView = function (reels) {
    var view = RandomView(reels);
    var reelCount = Util.random(2, 4);
    var isView = [...view];
    var reelArr = [];

    for (var i = 0; i < reelCount; i++) {
        var reelPos = Util.random(1, 5);
        if (reelArr.indexOf(reelPos) == -1) {
            reelArr.push(reelPos);
        } else {
            continue;
        }
        for (var j = 0; j < slotHeight; j++) {
            isView[j * slotWidth + reelPos] = 14;
        }
    }

    var resWildObj = {
        status: "wild",
        pos: reelArr, //                   
        isView: isView
    }

    return resWildObj;
};

var GetMultiFromView = function (view) {
    var multiCount = 0;
    for (var i = 0; i < view.length; i++) {
        if (view[i] == 15) {
            multiCount++;
        }
    }

    return multiCount;
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
    return symbol == wild || symbol == 14;
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