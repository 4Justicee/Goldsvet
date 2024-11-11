var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 38;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    this.moneyTotalValue = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoneyExceptForBonus = 0;
    this.freeSpinCacheList = [];
    this.freespinDs = "";
    this.freespinDsa = "";
    this.freespinDsam = "";
    this.freespinMore = 0;
    this.freespinGwm = 1;
    this.freeSpinWinMoney = 0; //                           
    this.freespinMotv = 0;
    this.freespinMotw = 0;
    this.freespinMoC = 0;

    //                          
    this.freeSpinTargetMoney = 0;
    //                 
    this.lineCount = 38;
    this.isBonusBuy = false;

    //                        
    this.bonusG = {};
    this.bonusWp = 0;
    this.bonusCacheList = [];
    this.bonusIndex = 0;

    //                              
    this.moneyBonusCount = 0;
    this.moneyCacheIndex = 0;
    this.moneyBonusLength = 0;
    this.moneyBonusWin = 0;
    this.moneyBonusCacheList = [];

    this.buyMulti = 100;
    this.buyPatternCount = 30;

    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"]; //FREE, BONUS, TUMBLE
};

var scatter = 1, wild = 2, firework = 14;
var slotWidth = 5, slotHeight = 4;
var baseReels = [
    [8, 8, 8, 6, 10, 10, 10, 10, 9, 3, 5, 4, 7, 7, 7, 8, 12, 12, 12, 12, 11, 9, 9, 9, 7, 11, 11, 11, 5, 5, 5, 6, 6, 6, 12, 7, 9, 5, 10, 11, 7, 11, 10, 7, 6, 10, 9, 10, 7, 10, 11, 6],
    [9, 7, 12, 12, 12, 1, 3, 2, 5, 10, 10, 10, 10, 6, 9, 9, 9, 8, 11, 12, 4, 7, 7, 7, 2, 2, 2, 3, 3, 3, 5, 2, 3, 12, 5, 3, 5, 3, 10, 7, 10, 3, 2, 3],
    [10, 1, 7, 12, 5, 5, 5, 2, 2, 2, 2, 6, 5, 9, 8, 11, 8, 8, 8, 3, 11, 11, 11, 4, 4, 4, 4, 7, 7, 7, 4, 3, 11, 2, 4, 2, 6, 2, 11, 9, 5, 11, 7, 4, 8, 1, 8, 11, 7, 12, 8, 11, 7, 5, 4, 6],
    [2, 12, 12, 12, 7, 4, 9, 9, 9, 10, 11, 4, 4, 4, 8, 6, 12, 2, 2, 2, 1, 5, 9, 10, 10, 10, 3, 10, 7, 12, 2, 4, 9, 2, 10, 2, 10, 9, 10, 9, 1, 10, 2, 4, 2, 4, 10, 2, 10, 9, 3, 9, 10, 2, 4, 10, 9, 10, 9, 4, 12, 2, 10, 12, 2, 10, 9, 5, 2, 1, 2, 9, 12, 10, 1, 4, 2, 10, 3, 10, 2, 12, 10, 8, 10, 3],
    [3, 7, 11, 10, 10, 10, 5, 11, 11, 11, 4, 8, 6, 9, 10, 12, 4, 6, 12, 10, 9, 7, 4],
];
var freeReels = [
    [7, 10, 10, 10, 11, 9, 5, 4, 10, 6, 11, 11, 11, 12, 13, 3, 3, 3, 3, 13, 13, 13, 8, 7, 7, 7, 5, 5, 5, 3, 10],
    [12, 2, 2, 2, 3, 4, 13, 5, 5, 5, 5, 11, 6, 4, 4, 4, 10, 13, 13, 13, 7, 8, 8, 8, 14, 9, 2, 8, 12, 12, 12, 4, 7, 5, 4, 10, 6, 4, 9, 14, 4, 2, 9, 11, 13, 4, 8, 9, 7, 9, 7, 11, 9, 4, 9, 2, 4, 8, 2, 9, 4, 7, 4, 7, 9, 6, 7, 4, 11],
    [4, 11, 7, 7, 7, 14, 2, 12, 9, 9, 9, 3, 2, 2, 2, 8, 6, 5, 10, 9, 7, 3, 3, 3, 13, 11, 11, 11, 13, 13, 13, 12, 12, 12, 2, 7, 3, 7, 10, 14, 2, 6, 3, 7, 9, 11, 9, 11, 2, 3, 11, 6, 2, 13],
    [8, 5, 7, 2, 2, 2, 11, 10, 10, 10, 9, 12, 11, 11, 11, 4, 13, 13, 13, 10, 3, 13, 6, 14, 2, 13, 10, 11, 2, 11, 5, 11, 5, 13, 2, 13, 10, 5, 2, 10, 4, 9, 10, 9, 13, 2, 7, 6, 3, 5, 7, 5, 11, 5, 3, 4, 5, 10, 2],
    [12, 6, 6, 6, 10, 7, 13, 6, 9, 9, 9, 8, 5, 3, 9, 7, 7, 7, 4, 12, 12, 12, 11, 8, 8, 8, 11, 11, 11, 13, 13, 13, 10, 10, 10, 13, 8, 13, 11, 13, 9, 13, 11],
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 10, 5, 3, 3, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 40, 15, 10, 5, 5, 3, 3, 3, 3, 3, 0, 0],
    [0, 0, 0, 100, 25, 15, 10, 10, 5, 5, 5, 5, 5, 0, 0],
];
var jackpat_mo_t = ["jp1", "jp2", "jp3", "jp4"];
var jackpat_mo = [337744, 10944, 3344, 1064];
var moneyValue = [100, 200, 250, 500, 1000, 2000, 5000];
var multiValue = [1, 2, 3, 5];
var whm = ["jp1", "cv", "fg", "cv", "jp3", "cv", "fg", "cv", "jp2", "cv", "fg", "cv", "jp4", "cv", "fg", "cv"];
var whw1 = [337744, 114, 7, 304, 3344, 76, 6, 152, 10944, 38, 7, 380, 1064, 190, 6, 38];
var whw2 = [337744, 114, 8, 380, 3344, 76, 6, 152, 10944, 38, 8, 760, 1064, 190, 6, 38];
var whw3 = [337744, 114, 9, 380, 3344, 76, 7, 304, 10944, 38, 9, 950, 1064, 190, 7, 38];
var whw4 = [337744, 114, 10, 760, 3344, 76, 8, 380, 10944, 304, 10, 1520, 1064, 190, 8, 38];
var whw5 = [337744, 114, 10, 760, 3344, 76, 8, 380, 10944, 304, 10, 1520, 1064, 190, 8, 38];
var wheelItemCount = 16;

SlotMachine.prototype.Init = function () {
    this.highPercent = 4; //(0-5)                       (                                .),
    this.normalPercent = 50; //                                 ,                                               ,                                     .
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
        this.currentGame = "BASE";
    } else if (viewCache.type == "FREE") {
        this.view = viewCache.view[0];
        this.currentGame = "BONUS";
    }

    var { winMoney, newFreeCnt, winLines } = WinFromView(this.view, player.betPerLine);
    this.winMoney = winMoney;
    this.winLines = winLines;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (this.currentGame == "BONUS") {
        // console.log("First: " + this.winMoney);
        this.freeSpinWinMoney = 0;
        this.freeSpinWinMoneyExceptForBonus = 0;
        this.bonusCacheList = viewCache.view[1]["bonus"];
        this.freeSpinCacheList = viewCache.view[1]["free"];
        this.freeSpinIndex = 0;
        this.bonusIndex = 0;
        this.bonusWp = 0;
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;

    if (this.bonusIndex == this.bonusCacheList.length) {
        this.currentGame = "FREE";
        this.freeSpinLength = this.bonusCacheList[this.bonusIndex - 1]["freespinLength"];
        this.winMoney = this.bonusWp;
        this.freeSpinWinMoney += this.winMoney;
        // console.log(this.winMoney);
    }

    if (this.bonusIndex != 0) {
        this.bonusG = {
            whc: {
                whi: this.bonusCacheList[this.bonusIndex - 1]["g"]["whc"]["whi"],
                whm: this.bonusCacheList[this.bonusIndex - 1]["g"]["whc"]["whm"],
                whw: this.bonusCacheList[this.bonusIndex - 1]["g"]["whc"]["whw"],
            },
            whn: {
                whm: this.bonusCacheList[this.bonusIndex - 1]["g"]["whn"]["whm"],
                whw: this.bonusCacheList[this.bonusIndex - 1]["g"]["whn"]["whw"],
            },
        };
        this.bonusWp = this.bonusCacheList[this.bonusIndex - 1]["wp"];
    }

    this.bonusIndex++;
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];
    this.view = cache.view;
    this.moneyCache = cache.moneyCache;

    var { winMoney, newFreeCnt, winLines } = WinFromView(this.view, player.betPerLine, this.moneyCache);
    this.winMoney = winMoney;
    this.winLines = winLines;

    // mo_c          
    var mo_c = 0;
    for (var i = 0; i < this.moneyCache.table.length; i++) {
        if (this.moneyCache.table[i] != 'r') {
            mo_c++;
        }
    }
    this.freespinMoC = mo_c;

    //                                    
    if (cache.moneyCache.table.indexOf("rt") != -1) {
        var rtWilds = cache.moneyCache.table
            .filter(function (type) {
                if (type == "rt") return true;
                else return false;
            })
            .map(function (type) {
                return cache.moneyCache.values[cache.moneyCache.table.indexOf(type)];
            });

        var cnt = 0;
        for (var i = 0; i < rtWilds.length; i++) cnt += Number(rtWilds[i]);

        this.freespinMore = cnt;
        this.freeSpinLength += cnt;
    }

    //                          
    var gwm = 1;
    if (cache.moneyCache.table.indexOf("ma") != -1) {
        // var maWilds = cache.moneyCache.table
        //     .filter(function (type) {
        //         if (type == "ma") return true;
        //         else return false;
        //     })
        //     .map(function (type) {
        //         gwm *= cache.moneyCache.values[cache.moneyCache.table.indexOf(type)];
        //         return cache.moneyCache.table.indexOf(type);
        //     });
        //     for (var i = 0; i < maWilds.length; i++) {
        // }

        var ds = [];
        var dsa = [];
        var dsam = [];

        for (var i = 0; i < cache.moneyCache.table.length; i++) {
            if (cache.moneyCache.table[i] == "ma") {
                ds.push(`2~${i}`);
                dsa.push(`0`);
                dsam.push(`v`);
                gwm *= cache.moneyCache.values[i];
            }
        }

        this.freespinDs = ds.join(";");
        this.freespinDsa = dsa.join(";");
        this.freespinDsam = dsam.join(";");
        this.freespinGwm = gwm;
    }

    //                        
    if (cache.moneyCache.table.indexOf("v") != -1 || cache.moneyCache.table.indexOf("jp1") != -1 || cache.moneyCache.table.indexOf("jp2") != -1 || cache.moneyCache.table.indexOf("jp3") != -1 || cache.moneyCache.table.indexOf("jp4") != -1) {
        cache.moneyCache.table.forEach((type) => {
            if (type == "v" || type == "jp1" || type == "jp2" || type == "jp3" || type == "jp4") {
                this.freespinMotv += cache.moneyCache.values[cache.moneyCache.table.indexOf(type)];
            }
        });

        this.freespinMotw = this.freespinMotv * player.betPerLine;
    }

    this.freeSpinWinMoney += this.winMoney;
    this.freeSpinWinMoneyExceptForBonus += this.winMoney;
    this.freeSpinIndex++;

    // console.log("      : " + this.winMoney + "         : " + this.freeSpinWinMoney);

    if (this.freeSpinIndex == this.freeSpinLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var result;

    if (baseWin > 0) {
        result = RandomWinView(baseReels, bpl, baseWin);
    } else {
        result = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: result.view,
        win: result.win,
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
            break;
    }
};

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCache = RandomFreeViewCache(freeReels, bpl, fsWin);
    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: "FREE",
        isCall: isCall ? 1 : 0,
    };
    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinCacheList = [];

    var scatterView = RandomScatterView(baseReels, bpl);
    var fsCache = BuyBonusViewCache(freeReels, bpl);
    freeSpinCacheList.push(scatterView);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
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
        tmpView = RandomView(reels);
        var { winMoney, newFreeCnt, winLines } = WinFromView(tmpView, bpl);
        tmpWin = winMoney;
        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
    var result = {
        view: tmpView,
        win: tmpWin,
    };
    return result;
};

var RandomZeroView = function (reels, bpl) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels);
        var { winMoney, newFreeCnt, winLines } = WinFromView(tmpView, bpl);
        tmpWin = winMoney;
        if (tmpWin == 0) {
            break;
        }
    }
    var result = {
        view: tmpView,
        win: tmpWin,
    };
    return result;
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

        if (!isFreeSpinWin(view) && !IsWildView(view)) {
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

        var { winMoney, newFreeCnt, winLines } = WinFromView(view, bpl);
        if (isFreeSpinWin(view) && winMoney == 0) {
            break;
        }
    }
    return view;
};

var RandomFreeViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var freeSpinData = BuyBonusViewCache(reels, bpl);


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

var BuyBonusViewCache = function (reels, bpl) {
    var freeSpinData = {};
    var freeSpinWinMoney = 0;
    var freeSpinLength = 0;
    var freeSpinCacheList = [];

    let bonusCnt = Util.random(1, 6);
    let bonusLevel = 1;
    let bonusApi = [];
    let freeApi = [];

    for (let bonusId = 0; bonusId < bonusCnt; bonusId++) {
        let index = GetFgIndex(false);
        //                                              
        if (bonusId == bonusCnt - 1) {
            index = GetFgIndex(true);
            let lastWhm = GetWhw(bonusLevel);
            freeSpinLength = lastWhm[index];
        } else {
            let whwTmp = GetWhw(bonusLevel); //                          
            freeSpinWinMoney += whwTmp[index] * bpl;
        }
        let bonusData = {
            g: {
                whc: {
                    whi: index,
                    whm: whm,
                    whw: GetWhw(bonusLevel),
                },
                whn: {
                    whm: whm,
                    whw: GetWhw(bonusLevel + 1),
                },
            },
            wp: freeSpinWinMoney,
        };

        if (bonusId == bonusCnt - 1) bonusData["freespinLength"] = freeSpinLength;

        bonusApi.push(bonusData);
        bonusLevel++;
    }

    // var fireworkCnt = 0;
    for (let freespinIndex = 0; freespinIndex < freeSpinLength; freespinIndex++) {
        let randview;
        while (true) {
            randview = RandomView(reels);
            if (hasFireworks(randview) || Util.probability(40)) {
                break;
            }
        }
        // if (hasFireworks(randview)) {
        //     fireworkCnt++;
        // }
        let { table, values } = RandomFireworkSymbols(randview);
        let { winMoney, newFreeCnt, winLines } = WinFromView(randview, bpl, { table, values });

        freeSpinWinMoney += winMoney;
        freeSpinLength += newFreeCnt;

        freeApi.push({
            view: randview,
            moneyCache: { table, values },
        });
    }
    // console.log("                   : " + freeSpinLength + ",                        : " + fireworkCnt);

    freeSpinCacheList.push({
        bonus: bonusApi,
        free: freeApi,
    });

    freeSpinData = {
        cache: freeSpinCacheList,
        win: freeSpinWinMoney,
    };
    return freeSpinData;
};

// true:                                 , false:                                 
var GetFgIndex = function (visible = true) {
    var randomIndex;

    while (true) {
        randomIndex = Util.random(0, wheelItemCount);
        if ((visible && whm[randomIndex] == "fg") || (!visible && whm[randomIndex] != "fg")) {
            //                            0      
            if (whm[randomIndex] != "jp1" || Util.probability(0)) {
                return randomIndex;
            }
        }
    }
};

var isFirework = function (symbol) {
    return symbol == firework;
};

var GetRealFirework = function (type) {
    switch (type) {
        case 0: //                           
            return { mo_t: "rt", mo: Util.random(1, 16) };
        case 1: //              
            while (true) {
                var randomIndex = Util.random(0, jackpat_mo_t.length);
                //                                0      
                if (jackpat_mo_t[randomIndex] == "jp1") continue;
                return {
                    mo_t: jackpat_mo_t[randomIndex],
                    mo: jackpat_mo[randomIndex],
                };
            }
        case 2: //                        
            var randomIndex = Util.random(0, multiValue.length);
            return {
                mo_t: "ma",
                mo: multiValue[randomIndex],
            };
        case 3: //              
            var randomIndex = Util.random(0, moneyValue.length);
            return {
                mo_t: "v",
                mo: moneyValue[randomIndex],
            };
        default:
            //                           
            var randomIndex = Util.random(0, moneyValue.length);
            return {
                mo_t: "v",
                mo: moneyValue[randomIndex],
            };
    }
};

var RandomFireworkSymbols = function (view) {
    var table = [],
        values = [];
    for (var i = 0; i < view.length; i++) {
        if (isFirework(view[i])) {
            //                     
            var firework;
            if (Util.probability(20)) firework = GetRealFirework(0);
            else if (Util.probability(50)) firework = GetRealFirework(2);
            else if (Util.probability(70)) firework = GetRealFirework(3);
            else firework = GetRealFirework(1);

            table[i] = firework.mo_t;
            values[i] = firework.mo;

            if (firework.mo_t == "ma") {
                view[i] = wild;
            }
        } else {
            table[i] = "r";
            values[i] = 0;
        }
    }

    return { table, values };
};

var GetWhw = function (level = 1) {
    switch (level) {
        case 2:
            return whw2;
        case 3:
            return whw3;
        case 4:
            return whw4;
        case 5:
            return whw5;
        default:
            return whw1;
    }
};

var hasFireworks = function (view) {
    var tmpView = Util.clone(view);
    for (var i = 0; i < tmpView.length; i++) {
        if (isFirework(tmpView[i])) {
            return true;
        }
    }
    return false;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) == 3;
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

var IsWildView = function (view) {
    var middleSymbols = [];
    for (var i = 0; i < slotHeight; i++) {
        for (var j = 1; j <= 3; j++) {
            middleSymbols.push(view[i * slotWidth + j]);
        }
    }

    for (var i = 0; i < middleSymbols.length; i++) {
        if (Util.count(middleSymbols, middleSymbols[i]) >= 6) return true;
    }

    return false;
};

var winLines = [];
var WinFromView = function (view, bpl, moneyCache = null) {
    var money = 0;
    var newFreeCnt = 0;
    winLines = [];
    var searched = [false, false, false, false];
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

        money += RecursiveSearch(view, 1, count, history, symbolId, bpl);
    }

    if (moneyCache != null) {
        var multi = 1;
        for (var i = 0; i < moneyCache.table.length; i++) {
            if (moneyCache.table[i] == "v") {
                money += moneyCache.values[i] * bpl;
            } else if (moneyCache.table[i] == "ma") {
                multi *= moneyCache.values[i];
            } else if (moneyCache.table[i] == "rt") {
                newFreeCnt += moneyCache.values[i];
            } else {
                money += moneyCache.values[i] * bpl;
            }
        }
        money *= multi;
    }

    var winMoney = money;
    winLines = GetWinLines(winLines);
    return { winMoney, newFreeCnt, winLines };
};

var RecursiveSearch = function (view, length, count, history, symbolId, bpl) {
    //                                                             
    if (length == slotWidth) {
        var winMoney = bpl * payTable[length][symbolId] * count;

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
        var winMoney = bpl * payTable[length][symbolId] * count;

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
    var historyTmp = Util.clone(history);
    for (var i = 0; i < positionsByStep.length; i++) {
        historyTmp.push(positionsByStep[i]);
        matchCount++;
    }
    matchCount = matchCount * count;
    return RecursiveSearch(view, length + 1, matchCount, historyTmp, symbolId, bpl);
};

var GetWinLines = function (winlinesParam) {
    var lines = [];
    for (var i = 0; i < winlinesParam.length; i++) {
        var cache = winlinesParam[i];
        lines.push(`${cache.symbol}~${cache.money}~${cache.count}~${cache.length}~${cache.lines.join()}~l`);
    }
    return lines.join(";");
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