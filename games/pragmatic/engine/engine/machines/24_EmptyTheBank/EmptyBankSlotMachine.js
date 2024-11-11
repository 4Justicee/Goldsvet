var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                              
    this.respinCacheList = [];
    this.respinCache = {};
    this.respinTotalWin = 0;
    this.respinIndex = 0;
    //              
    this.bLineCount = 25;
    this.isBonusBuy = false;
    //       
    this.totalBet = 0;
    this.prevBalance = 0;
    this.patternCount = 2000;
    this.lowLimit = 10;
    this.betPerLine = 0;
    this.lineCount = 20;
    this.jackpotType = ["BONUS"];

    this.buyMulti = 80;
    this.buyPatternCount = 50;
    this.doubleMulti = 0.25;
};

var scatter = 1, wild = 2;
var slotWidth = 5, slotHeight = 4;
var baseReels = [
    [9, 1, 11, 10, 4, 5, 5, 7, 8, 8, 9, 3, 10, 3, 8, 8, 11, 10, 6, 11, 7, 3, 4, 3, 3, 3, 10, 7, 2, 9, 4, 10, 4, 10, 8, 11, 9, 6, 6, 9, 11, 11, 9, 5, 8, 10, 5, 6, 9, 3, 2],
    [3, 10, 11, 8, 11, 6, 6, 2, 7, 8, 10, 11, 3, 5, 3, 9, 10, 2, 3, 5, 3, 3, 3, 8, 9, 7, 10, 3, 11, 5, 4, 9, 8, 10, 4, 7, 6, 4, 9, 11, 5, 11, 9, 9, 8],
    [10, 5, 11, 3, 4, 8, 10, 6, 4, 6, 3, 3, 3, 3, 11, 1, 9, 8, 9, 5, 7, 2, 10, 7, 11],
    [8, 4, 11, 9, 11, 9, 8, 5, 3, 10, 3, 3, 3, 10, 8, 11, 9, 6, 4, 7, 6, 10, 3, 7, 2],
    [6, 8, 7, 3, 9, 6, 10, 7, 1, 10, 11, 6, 5, 9, 8, 11, 5, 8, 3, 3, 3, 10, 11, 4, 1, 6, 2, 10, 8, 9, 11, 10, 9, 3, 8, 7, 9, 11, 8, 11, 5, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 40, 40, 20, 20, 10, 10, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 100, 80, 60, 60, 20, 20, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 400, 200, 100, 100, 80, 60, 60, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var payLines = [
    [0, 1, 2, 3, 4], // 1
    [15, 16, 17, 18, 19], // 2
    [5, 6, 7, 8, 9], // 3
    [10, 11, 12, 13, 14], // 4
    [0, 6, 12, 8, 4], // 5
    [15, 11, 7, 13, 19], // 6
    [10, 6, 2, 8, 14], // 7
    [5, 11, 17, 13, 9], // 8
    [0, 6, 2, 8, 4], // 9
    [15, 11, 17, 13, 19], // 10
    [5, 1, 7, 3, 9], // 11
    [10, 16, 12, 18, 14], // 12
    [5, 11, 7, 13, 9], // 13
    [10, 6, 12, 8, 14], // 14
    [0, 6, 7, 8, 4], // 15
    [15, 11, 12, 13, 19], // 16
    [5, 1, 2, 3, 9], // 17
    [10, 16, 17, 18, 14], // 18
    [5, 11, 12, 13, 9], // 19
    [10, 6, 7, 8, 14], // 20
];
var respinWidth = 7,
    respinHeight = 6;
var empty = { symbol: 12, mark: "r" };
var locked = { symbol: 13, mark: "r" };
var moneyBag = { symbol: 14, mark: "v" };
var alarm = { symbol: 15, mark: "al" };
var ladder = { symbol: 16, mark: "ld" };
var drill = { symbol: 17, mark: "dr" };
var hammer = { symbol: 18, mark: "hm" };
var safeDoor = { symbol: 19, mark: "sd" };
var wokitoki = { symbol: 20, mark: "ea" };
var computer = { symbol: 21, mark: "pc" };
var burglar = { symbol: 22, mark: "bv" };
var moneySymbolValues = [20, 40, 60, 80, 100, 120, 140, 160, 200];

SlotMachine.prototype.Init = function () {
    this.highPercent = 0; //(0-5)                       (                                .), 
    this.normalPercent = 20; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;
    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;

    } else if (viewCache.type == "BONUS") {
        var cache = viewCache.view;
        this.respinCacheList = cache.respinCacheList;
        this.view = cache.scatterView;
    }

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    if (isFreeSpinWin(this.view)) {
        this.top = 2;
        this.left = 1;
        this.bottom = respinHeight;
        this.right = respinWidth - 1;
        this.respinTotalWin = 0;
        this.respinIndex = 0;
        this.respinCache = this.respinCacheList[0];
        this.currentGame = "BONUS";
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.respinIndex = Util.min(this.respinIndex + 1, this.respinCacheList.length - 1);
    this.winMoney = 0;

    this.respinCache = this.respinCacheList[this.respinIndex];

    if (this.respinIndex >= this.respinCacheList.length - 1) {
        this.winMoney = this.respinCache.moneyTotal * player.betPerLine;
        this.moneyBonusWin = this.respinCache.moneyTotal * player.betPerLine;
        this.currentGame = "BASE";
    }
}

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var pattern = {
        type: "BASE",
        bpl: bpl
    };

    var viewInfo = null;

    if (baseWin > 0) {
        viewInfo = RandomWinView(baseReels, bpl, baseWin);

    } else {
        viewInfo = RandomZeroView(baseReels, bpl);
    }

    pattern.win = viewInfo.winMoney;
    pattern.view = viewInfo.view;

    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, jpWin, isCall = false, jpType) {
    var newJpType = jpType;
    if (jpType === "RANDOM") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }

    switch (newJpType) {
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
            break;
        default: break;
    }

}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin);

    return {
        win: bonusSpinData.win,
        view: bonusSpinData.view,
        bpl: bpl,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    }
}

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var bsWin = Util.random(bpl * this.lineCount * this.buyMulti / 5, bpl * this.lineCount * this.buyMulti * 2);
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin);

    return {
        win: bonusSpinData.win,
        view: bonusSpinData.view,
        bpl: bpl,
        type: "BONUS",
        isCall: 0
    }
};

var RandomWinView = function (reels, bpl, maxWin) {
    var bottomLimit = 0;
    var calcCount = 0;

    var view = null;
    var winMoney = null;

    while (true) {

        view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        winMoney = WinFromView(view, bpl);

        if (winMoney > bottomLimit && winMoney <= maxWin) {
            return { view, winMoney };
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }

    }

};

var RandomZeroView = function (reels, bpl) {
    var view = null;
    var winMoney = null;

    while (true) {
        view = RandomView(reels);

        if (isFreeSpinWin(view)) {
            continue;
        }

        winMoney = WinFromView(view, bpl);

        if (winMoney == 0) {
            return { view, winMoney };
        }
    }

};

var RandomView = function (reels) {
    var resultView = [];

    for (var i = 0; i < slotWidth; i++) {
        var len = reels[i].length;
        var randomIndex = Util.random(0, len);
        for (var j = 0; j < slotHeight; j++) {
            var viewPos = i + j * slotWidth;
            var reelPos = (randomIndex + j) % len;
            resultView[viewPos] = reels[i][reelPos];
        }
    }
    return resultView;
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
                if (isScatter(view[viewPos])) {
                    view[viewPos] = Util.random(3, 12);
                }
            }
        }

        var reelNoArr = [0, 2, 4];

        for (var i = 0; i < reelNoArr.length; i++) {
            var height = Util.random(0, 3);
            var pos = height * slotWidth + reelNoArr[i];
            view[pos] = scatter;
        }

        if (WinFromView(view, bpl) == 0) {
            break;
        }
    }

    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin) {
    var bonusSpinCache = {};

    bonusSpinCache.scatterView = RandomScatterView(reels, bpl);

    bonusSpinCache.respinCacheList = [];

    var multi = bsWin / bpl;
    var top = 2,
        bottom = respinHeight,
        left = 1,
        right = respinWidth - 1;

    var alarmCount = 1,
        ladderCount = 2,
        drillCount = 1,
        hammerCount = 1,
        safeDoorCount = 2,
        burglarCount = 1;

    var alarmAdded = 0,
        ladderAdded = 0,
        drillAdded = 0,
        hammerAdded = 0,
        safeDoorAdded = 0,
        burglarAdded = 0,
        computerAdded = 0;

    //                                                        
    if (Util.probability(100) || money >= bet * 1500) {
        ladderCount = 2;
        drillCount = 1;
        ahmmerCount = 1;
    } else if (Util.probability(15) || money >= bet * 1000) {
        ladderCount = 1;
        drillCount = 1;
        hammerCount = 1;
    } else if (Util.probability(30) || money >= bet * 500) {
        if (Util.probability(30)) {
            ladderCount = 1;
            drillCount = 0;
            hammerCount = 1;
        } else if (Util.probability(30)) {
            ladderCount = 1;
            drillCount = 1;
            hammerCount = 0;
        } else {
            ladderCount = 0;
            drillCount = 1;
            hammerCount = 1;
        }
    } else if (Util.probability(50) || money >= bet * 100) {
        if (Util.probability(30)) {
            ladderCount = 1;
            drillCount = 0;
            hammerCount = 0;
        } else if (Util.probability(30)) {
            ladderCount = 0;
            drillCount = 1;
            hammerCount = 0;
        } else {
            ladderCount = 0;
            drillCount = 0;
            hammerCount = 1;
        }
    } else {
        ladderCount = 0;
        drillCount = 0;
        hammerCount = 0;
    }

    //          
    if (Util.probability(30)) {
        alarmCount = 1;
    } else {
        alarmCount = 0;
    }

    //             
    if (Util.probability(10)) {
        safeDoorCount = 2;
    } else if (Util.probability(20)) {
        safeDoorCount = 1;
    } else {
        safeDoorCount = 0;
    }

    // playingUser.printLog(`                            :          (${alarmCount})/         (${ladderCount})/      (${drillCount})/      (${hammerCount})/            (${safeDoorCount})`);

    //                     
    var firstRespinData = {
        moneyValues: [],
        moneyTable: [],
        moneyTotal: 0,
        respinView: [],
        respinStr: "",
        respinMax: 3,
    };

    //                                                     
    for (var i = 0; i < respinWidth; i++) {
        for (var j = 0; j < respinHeight; j++) {
            var pos = i + j * respinWidth;
            firstRespinData.moneyValues[pos] = 0;
            firstRespinData.moneyTable[pos] = locked.mark;
            firstRespinData.respinView[pos] = locked.symbol;
        }
    }
    //                                    
    for (var i = left; i < right; i++) {
        for (var j = top; j < bottom; j++) {
            var pos = i + j * respinWidth;
            firstRespinData.moneyTable[pos] = empty.mark;
            firstRespinData.respinView[pos] = empty.symbol;
        }
    }

    //                                                              .
    for (var i = 0; i < slotWidth; i++) {
        for (var j = 0; j < slotHeight; j++) {
            var pos = i + j * slotWidth;
            if (isScatter(bonusSpinCache.scatterView[pos])) {
                var respinPos = (i + left) + (j + top) * respinWidth;
                firstRespinData.moneyTable[respinPos] = moneyBag.mark;
                firstRespinData.respinView[respinPos] = moneyBag.symbol;
                var value = moneySymbolValues[Util.random(0, 2)];
                firstRespinData.moneyValues[respinPos] = value;
                firstRespinData.moneyTotal += value;
                multi -= value;
            }
        }
    }

    var respinCount = 1;
    var interval = Util.random(1, 4);
    for (var j = 0; j < interval; j++) {
        var cache = {};
        cache.moneyTable = firstRespinData.moneyTable;
        cache.moneyValues = firstRespinData.moneyValues;
        cache.respinView = firstRespinData.respinView;
        cache.moneyTotal = firstRespinData.moneyTotal;
        cache.respinCount = respinCount++;
        cache.respinStr = "";
        cache.respinMax = 3;
        bonusSpinCache.respinCacheList.push(cache);
    }

    while (multi >= moneySymbolValues[0]) {
        var respinStr = [];
        //                    
        var prevCache = bonusSpinCache.respinCacheList[bonusSpinCache.respinCacheList.length - 1];
        var prevView = Util.clone(prevCache.respinView);
        var prevMoneyValues = Util.clone(prevCache.moneyValues);
        var prevMoneyTable = Util.clone(prevCache.moneyTable);
        var emptyPositions = [];
        var total = prevCache.moneyTotal;
        var afterMoney = false;

        //                                                            
        for (var i = left; i < right; i++) {
            for (var j = top; j < bottom; j++) {
                var respinPos = i + j * respinWidth;
                //                       
                if (prevView[respinPos] == empty.symbol) {
                    emptyPositions.push(respinPos);
                }
            }
        }

        var specialSymbolPercent = 40;
        var addSymbolCount = Util.random(1, 4);

        if (bsWin >= bpl * this.lineCount * 3000) {
            addSymbolCount = Util.random(5, 8);
            specialSymbolPercent = 80;
        } else if (bsWin >= bpl * this.lineCount * 1000) {
            addSymbolCount = Util.random(4, 7);
            specialSymbolPercent = 70;
        } else if (bsWin >= bpl * this.lineCount * 500) {
            addSymbolCount = Util.random(3, 6);
            specialSymbolPercent = 60;
        } else if (bsWin >= bpl * this.lineCount * 200) {
            addSymbolCount = Util.random(2, 5);
            specialSymbolPercent = 50;
        }

        if (emptyPositions.length < addSymbolCount) {
            addSymbolCount = emptyPositions.length - 2;
        }

        var randomEmptyLimit = Util.random(2, 4);
        //                                                                 
        if (emptyPositions.length <= randomEmptyLimit) {
            afterMoney = true;
            var index = Util.random(0, emptyPositions.length);
            var specialSymbolPosition = emptyPositions[index];
            emptyPositions = Util.remove(emptyPositions, index);
            addSymbolCount = 0;
        }

        if (!afterMoney && Util.probability(specialSymbolPercent)) {
            var specialSymbol = false;

            var index = Util.random(0, emptyPositions.length);
            var specialSymbolPosition = emptyPositions[index];
            emptyPositions = Util.remove(emptyPositions, index);
            var bet1x = 20;

            //                                            
            if (burglarCount > 0 && Util.probability(30)) {
                afterMoney = true;
            }
            //                  15
            else if (ladderAdded < ladderCount && Util.probability(15)) {
                prevView[specialSymbolPosition] = ladder.symbol;
                prevMoneyTable[specialSymbolPosition] = ladder.mark;
                prevMoneyValues[specialSymbolPosition] = bet1x;
                respinStr.push(`ld:${empty.symbol}~${ladder.symbol}~${specialSymbolPosition}`);
                ladderAdded++;
                specialSymbol = true;

                top--;
                var unlocks = [];
                for (var i = 1; i < respinWidth - 1; i++) {
                    var pos = i + top * respinWidth;
                    prevView[pos] = empty.symbol;
                    unlocks.push(`${locked.symbol}~${empty.symbol}~${pos}`);
                }
                respinStr.push(`ld_u:${unlocks.join(';')}`);
                //                                              /             
                if (drillAdded > 0) {
                    var pos = left + top * respinWidth;
                    respinStr.push(`lddr_u:${locked.symbol}~${empty.symbol}~${pos}`);
                    prevView[pos] = empty.symbol;
                }
                //                                              /             
                if (hammerAdded > 0) {
                    var pos = top * respinWidth + respinWidth - 1;
                    respinStr.push(`ldhm_u:${locked.symbol}~${empty.symbol}~${pos}`);
                    prevView[pos] = empty.symbol;
                }
            }
            //               20
            else if (drillAdded < drillCount && Util.probability(20)) {
                prevView[specialSymbolPosition] = drill.symbol;
                prevMoneyTable[specialSymbolPosition] = drill.mark;
                prevMoneyValues[specialSymbolPosition] = bet1x;
                respinStr.push(`dr:${empty.symbol}~${drill.symbol}~${specialSymbolPosition}`);
                drillAdded++;
                specialSymbol = true;

                left--;
                var unlocks = [];
                for (var i = 2; i < bottom; i++) {
                    var pos = i * respinWidth + 0;
                    prevView[pos] = empty.symbol;
                    unlocks.push(`${locked.symbol}~${empty.symbol}~${pos}`);
                }
                respinStr.push(`dr_u:${unlocks.join(';')}`);
                if (ladderAdded > 0) {
                    var ladderAdd = [];
                    for (var i = top; i < 2; i++) {
                        var pos = i * respinWidth;
                        ladderAdd.push(`${locked.symbol}~${empty.symbol}~${pos}`);
                        prevView[pos] = empty.symbol;
                    }
                    respinStr.push(`lddr_u:${ladderAdd.join(';')}`);
                }
            }
            //               20
            else if (hammerAdded < hammerCount && Util.probability(20)) {
                prevView[specialSymbolPosition] = hammer.symbol;
                prevMoneyTable[specialSymbolPosition] = hammer.mark;
                prevMoneyValues[specialSymbolPosition] = bet1x;
                respinStr.push(`hm:${empty.symbol}~${hammer.symbol}~${specialSymbolPosition}`);
                hammerAdded++;
                specialSymbol = true;

                right++;
                var unlocks = [];
                for (var i = 2; i < bottom; i++) {
                    var pos = i * respinWidth + respinWidth - 1;
                    prevView[pos] = empty.symbol;
                    unlocks.push(`${locked.symbol}~${empty.symbol}~${pos}`);
                }
                respinStr.push(`hm_u:${unlocks.join(';')}`);
                if (ladderAdded > 0) {
                    var ladderAdd = [];
                    for (var i = top; i < 2; i++) {
                        var pos = i * respinWidth + respinWidth - 1;
                        ladderAdd.push(`${locked.symbol}~${empty.symbol}~${pos}`);
                        prevView[pos] = empty.symbol;
                    }
                    respinStr.push(`ldhm_u:${ladderAdd.join(';')}`);
                }
            }
            //               20
            else if (alarmAdded < alarmCount && Util.probability(20)) {
                prevView[specialSymbolPosition] = alarm.symbol;
                prevMoneyTable[specialSymbolPosition] = alarm.mark;
                prevMoneyValues[specialSymbolPosition] = bet1x;
                respinStr.push(`al:${empty.symbol}~${alarm.symbol}~${specialSymbolPosition}`);
                alarmAdded++;
                hasAlarm = true;
                specialSymbol = true;
            }
            //                     10
            else if (safeDoorAdded < safeDoorCount && Util.probability(10)) {
                prevView[specialSymbolPosition] = safeDoor.symbol;
                prevMoneyTable[specialSymbolPosition] = safeDoor.mark;
                prevMoneyValues[specialSymbolPosition] = bet1x;
                respinStr.push(`sd:${empty.symbol}~${safeDoor.symbol}~${specialSymbolPosition}`);
                safeDoorAdded++;
                specialSymbol = true;
            }
            //       /                 ;                                                           
            else {
                afterMoney = true;
            }

            if (specialSymbol) {
                addSymbolCount--;
                total += bet1x;
                multi -= bet1x;
            }
        }

        //                       
        if (addSymbolCount > 0) {
            var moneyCount = Util.min(addSymbolCount, multi / 20);
            if (moneyCount < 0) {
                break;
            }
            if (moneyCount >= emptyPositions.length) {
                moneyCount = emptyPositions.length - 1;
            }

            if (emptyPositions.length > 0) {
                Util.shuffle(emptyPositions);
            } else {
                break;
            }
            var moneyAdd = [];
            for (var i = 0; i < moneyCount && multi >= moneySymbolValues[0]; i++) {
                var respinPos = emptyPositions[i];
                prevMoneyTable[respinPos] = moneyBag.mark;
                prevView[respinPos] = moneyBag.symbol;

                var valueIndex = Util.random(0, 5);
                if (bsWin >= bpl * this.lineCount * 3000) {
                    valueIndex = Util.random(5, moneySymbolValues.length);
                } else if (bsWin >= bpl * this.lineCount * 1000) {
                    valueIndex = Util.random(4, moneySymbolValues.length);
                } else if (bsWin >= bpl * this.lineCount * 500) {
                    valueIndex = Util.random(3, moneySymbolValues.length);
                } else if (bsWin >= bpl * this.lineCount * 200) {
                    valueIndex = Util.random(2, moneySymbolValues.length);
                } else if (Util.probability(20)) {
                    valueIndex = Util.random(1, moneySymbolValues.length);
                }

                var value = moneySymbolValues[valueIndex];
                if (multi - value < 0) {
                    for (var j = valueIndex - 1; j >= 0; j--) {
                        value = moneySymbolValues[j];
                        if (multi - value >= 0) {
                            break;
                        }
                    }
                }
                prevMoneyValues[respinPos] = value;
                total += value;
                multi -= value;
                moneyAdd.push(`${empty.symbol}~${moneyBag.symbol}~${respinPos}`);
            }

            respinStr.push(`coin:${moneyAdd.join(';')}`);
        }

        var burglarMade = false;
        if (afterMoney) {
            var moneyBagTotal = 0;
            var moneyBagCount = 0;
            for (var i = left; i < right; i++) {
                for (var j = top; j < bottom; j++) {
                    var pos = i + j * respinWidth;
                    if (prevMoneyTable[pos] == moneyBag.mark) {
                        moneyBagTotal += prevMoneyValues[pos];
                        moneyBagCount++;
                    }
                }
            }

            var computerPercent = 50;
            var moneyBagCountLimit = 5;

            if (bsWin >= bpl * this.lineCount * 3000) {
                computerPercent = 90;
                moneyBagCountLimit = Util.random(6, 12);
            } else if (bsWin >= bpl * this.lineCount * 1000) {
                computerPercent = 80;
                moneyBagCountLimit = Util.random(6, 10);
            } else if (bsWin >= bpl * this.lineCount * 500) {
                computerPercent = 70;
                moneyBagCountLimit = Util.random(6, 8);
            } else if (bsWin >= bpl * this.lineCount * 200) {
                computerPercent = 60;
                moneyBagCountLimit = Util.random(5, 7);
            }

            if (moneyBagCount >= moneyBagCountLimit) {
                //                                                        1x                            
                //          
                if (multi >= moneyBagTotal + 20 && Util.probability(computerPercent) && emptyPositions.length > 1) {
                    var bet1x = 20;
                    total += bet1x;
                    multi -= bet1x;

                    total += moneyBagTotal;
                    multi -= moneyBagTotal;
                    prevView[specialSymbolPosition] = computer.symbol;
                    prevMoneyTable[specialSymbolPosition] = computer.mark;
                    prevMoneyValues[specialSymbolPosition] = 20;
                    respinStr.push(`pc:${empty.symbol}~${computer.symbol}~${specialSymbolPosition}`);
                    computerAdded++;

                    for (var i = left; i < right; i++) {
                        for (var j = top; j < bottom; j++) {
                            var pos = i + j * respinWidth;
                            if (prevMoneyTable[pos] == moneyBag.mark) {
                                prevMoneyValues[pos] *= 2;
                            }
                        }
                    }
                } //       
                else if ((burglarCount > 0 && moneyBagCount >= 3 && moneyBagCount <= 7) || emptyPositions.length <= 2) {

                    var bet1x = 20;
                    total += bet1x;
                    multi -= bet1x;

                    var burglarCollect = [];
                    var burglarValue = 20;
                    for (var i = left; i < right; i++) {
                        for (var j = top; j < bottom; j++) {
                            var pos = i + j * respinWidth;
                            //                                                 
                            if (prevView[pos] == moneyBag.symbol || prevView[pos] == burglar.symbol) {
                                burglarValue += prevMoneyValues[pos];
                                //                                                    
                                burglarCollect.push(`${prevView[pos]}~${empty.symbol}~${pos}`);
                                prevView[pos] = empty.symbol;
                            }
                        }
                    }

                    burglarMade = true;
                    burglarAdded++;
                    burglarCount--;

                    prevView[specialSymbolPosition] = burglar.symbol;
                    prevMoneyTable[specialSymbolPosition] = burglar.mark;
                    respinStr.push(`bur:${empty.symbol}~${burglar.symbol}~${specialSymbolPosition}`);
                    prevMoneyValues[specialSymbolPosition] = burglarValue;
                    respinStr.push(`bur_col:${burglarCollect.join(';')}`);
                }
            }
        }

        var burglarMoneyTable = Util.clone(prevMoneyTable);
        var burglarMoneyValues = Util.clone(prevMoneyValues);
        var burglarMoneyView = Util.clone(prevView);

        if (burglarMade) {
            for (var i = 0; i < respinWidth; i++) {
                for (var j = 0; j < respinHeight; j++) {
                    var pos = i + j * respinWidth;
                    if (pos == specialSymbolPosition) {
                        continue;
                    }
                    if (burglarMoneyTable[pos] == moneyBag.mark || burglarMoneyTable[pos] == burglar.mark) {
                        burglarMoneyView[pos] = empty.symbol;
                        burglarMoneyTable[pos] = empty.mark;
                        burglarMoneyValues[pos] = 0;
                    }
                }
            }
        }

        //                                                                                            
        var respinMax = (alarmAdded > 0 ? 4 : 3);
        var interval = Util.random(1, respinMax + 1);
        if (bpl * this.lineCount >= bpl * this.lineCount * 3000) {
            if (Util.probability(1)) {
                interval = 2;
            } else {
                interval = 1;
            }
        } else if (bpl * this.lineCount >= bpl * this.lineCount * 1000) {
            if (Util.probability(5)) {
                interval = 2;
            } else {
                interval = 1;
            }
        } else {
            if (Util.probability(20)) {
                interval = 2;
            } else if (Util.probability(40)) {
                interval = 1;
            }
        }

        if (burglarMade) {
            interval = Util.max(2, interval);
            if (Util.probability(60)) {
                interval = 2;
            }
        }

        respinCount = 1;
        var respinAdd = true;
        for (var j = 0; j < interval; j++) {
            var cache = {};
            cache.moneyTable = prevMoneyTable;
            cache.moneyValues = prevMoneyValues;
            cache.respinView = prevView;
            cache.moneyTotal = total;
            cache.respinMax = respinMax;

            if (respinAdd) {
                cache.respinStr = respinStr.join();
            } else {
                cache.respinStr = "";
                if (burglarMade) {
                    cache.moneyTable = burglarMoneyTable;
                    cache.moneyValues = burglarMoneyValues;
                    cache.respinView = burglarMoneyView;
                }
            }
            cache.respinCount = respinCount++;
            bonusSpinCache.respinCacheList.push(cache);
            respinAdd = false;
        }
    }

    // playingUser.printLog(`                      :          (${alarmAdded})/         (${ladderAdded})/      (${drillAdded})/      (${hammerAdded})/            (${safeDoorAdded})/         (${computerAdded})/      (${burglarAdded})`);

    var lastCache = bonusSpinCache.respinCacheList[bonusSpinCache.respinCacheList.length - 1];
    for (var i = lastCache.respinCount; i <= respinMax; i++) {
        var cache = {};
        cache.moneyTable = lastCache.moneyTable;
        cache.moneyValues = lastCache.moneyValues;
        cache.respinView = lastCache.respinView;
        cache.moneyTotal = lastCache.moneyTotal;
        cache.respinStr = "";
        cache.respinCount = i + 1;
        cache.respinMax = respinMax;
        bonusSpinCache.respinCacheList.push(cache);
    }

    return {
        win: lastCache.moneyTotal * bpl,
        view: bonusSpinCache
    }
}

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl) {
    var money = 0;

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay;
    }

    return money;
};

var WinFromLine = function (lineSymbols, bpl) {
    //                     
    var matchCount = 0;

    //                                              
    var symbol = wild;

    //                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) //                                              
            continue;

        symbol = lineSymbols[i];
        break;
    }

    //                                                   
    for (var i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
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

var WinLinesFromView = function (view, bpl) {
    var winLines = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
};

var isWild = function (symbol) {
    return symbol == wild;
};

var NumberOfScatters = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
}

module.exports = SlotMachine;