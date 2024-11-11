var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 25;
    this.freeSpinCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPositions = [];
    this.moneyCache = {};
    this.spinIndex = 1;
    //                           
    this.bonusSpinIndex = 0;
    this.moneyBonusWin = 0;
    this.status = [];
    this.wins_mask = [];
    this.wins = 0;
    this.bonusMulti = 0;
    this.freeSpinCacheList = [];
    //                      
    this.patternCount = 2000; //                  
    this.lowLimit = 10; //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"]; // "BONUS"
};

var bonus = 0, wild = 2;
var slotWidth = 5, slotHeight = 3;
var baseReels = [
    [10, 7, 2, 6, 4, 9, 5, 4, 8, 6, 9, 10, 2, 8, 6, 10],
    [9, 5, 7, 0, 4, 8, 7, 6, 5, 10, 7, 4, 2, 9, 8, 5],
    [7, 4, 5, 0, 9, 7, 8, 5, 9, 7, 6, 10, 2, 8, 5, 9],
    [7, 8, 6, 0, 7, 9, 7, 5, 6, 8, 7, 4, 2, 8, 7, 6],
    [10, 6, 7, 2, 4, 10, 8, 5, 10, 6, 8, 7, 2, 9, 10, 6]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 50, 30, 25, 25, 15, 5, 5, 5],
    [0, 0, 0, 200, 100, 50, 40, 25, 25, 20, 20],
    [0, 0, 0, 500, 250, 200, 150, 125, 100, 100, 100]
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
    [5, 1, 2, 3, 9], // 6
    [5, 11, 12, 13, 9], // 7
    [0, 1, 7, 13, 14], // 8
    [10, 11, 7, 3, 4], // 9
    [5, 11, 7, 3, 9], // 10
    [5, 1, 7, 13, 9], // 11
    [0, 6, 7, 8, 4], // 12
    [10, 6, 7, 8, 14], // 13
    [0, 6, 2, 8, 4], // 14
    [10, 6, 12, 8, 14], // 15
    [5, 6, 2, 8, 9], // 16
    [5, 6, 12, 8, 9], // 17
    [0, 1, 12, 3, 4], // 18
    [10, 11, 2, 13, 14], // 19
    [0, 11, 12, 13, 4], // 20
    [10, 1, 2, 3, 14], // 21
    [5, 11, 2, 13, 9], // 22
    [5, 1, 12, 3, 9], // 23
    [0, 11, 2, 13, 4], // 24
    [10, 1, 12, 3, 14] // 25
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 1; //(0-5)                       (                                .),
    this.normalPercent = 30; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player, param) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;
    } else if (viewCache.type == "BONUS") {
        var cache = viewCache.view;
        this.freeSpinCacheList = cache;
        this.view = cache[0].view;
    }

    this.winMoney = WinFromView(this.view, player.betPerLine);
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels),
    };

    if (this.spinIndex >= 10) {
        this.spinIndex = 1;
    } else {
        if ((Util.probability(80) && this.winMoney == 0) && !isBonusSpinWin(this.view)) {
            var resView = RandomBallView(Number(param.prg_i), player.betPerLine);
            this.view = resView;
        }
        this.spinIndex++;
    }

    //                   ;
    if (isBonusSpinWin(this.view)) {
        this.bonusSpinIndex = 1;
        this.currentGame = "BONUS";
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;

    var cache = this.freeSpinCacheList[this.bonusSpinIndex];
    this.status = cache.status;
    this.wins = cache.wins;
    this.wins_mask = cache.win_mask;
    this.bonusMulti = Util.maxInArr(this.wins).value;

    this.winMoney = 0;

    this.bonusSpinIndex++;
    this.moneyBonusWin = player.virtualBet * this.bonusMulti;

    if (this.bonusSpinIndex > 5) {
        this.winMoney = player.virtualBet * this.bonusMulti;
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
        case "BONUS":
            return this.SpinForBonusGen(bpl, totalBet, jpWin, isCall);
        default:
            return;
    }
};

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {

    //                           
    var cache = RandomBonusViewCache(baseReels, bpl, bsWin, totalBet);

    return {
        win: cache.win,
        bpl: bpl,
        view: cache.view,
        type: "BONUS",
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

        if (!isBonusSpinWin(view)) {
            break;
        }
    }
    return view;
};

var RandomBonusViewCache = function (reels, bpl, bsWin, totalBet) {
    var goalNum = 0, win = 0;

    if (bsWin >= totalBet * 100) {
        win = totalBet * 100;
        goalNum = 5;
    } else if (bsWin >= totalBet * 25 && bsWin < totalBet * 100) {
        win = totalBet * 25;
        goalNum = 4;
    } else if (bsWin >= totalBet * 15 && bsWin < totalBet * 25) {
        win = totalBet * 15;
        goalNum = 3;
    } else if (bsWin >= totalBet * 10 && bsWin < totalBet * 15) {
        win = totalBet * 10;
        goalNum = 2;
    } else if (bsWin >= totalBet * 5 && bsWin < totalBet * 10) {
        win = totalBet * 5;
        goalNum = 1;
    }

    var bonusViewList = [],
        wins_mask = [],
        wins = [],
        status = [],
        goalPosList = [];

    //          
    for (var i = 0; i < 20; i++) {
        wins.push(0);
        status.push(0);
        wins_mask.push("h");
    }

    //                                     -------------------------------- //
    var bonusView = RandomBonusView(baseReels, bpl);

    var initObj = {
        view: bonusView,
        status: [...status],
        wins: [...wins],
        win_mask: [...wins_mask]
    }
    bonusViewList.push(initObj);

    // ------------------------------------------------------- //

    //                                 
    for (var i = 0; i < goalNum; i++) {
        while (true) {
            var pos = Util.random(1, 6);
            if (goalPosList.indexOf(pos) == -1) {
                goalPosList.push(pos);
                break;
            }
        }
    }

    //                                    
    var bonusSpinPosList = [];
    for (var i = 0; i < 5; i++) {
        while (true) {
            var pos = Util.random(0, 20);
            if (bonusSpinPosList.indexOf(pos) == -1) {
                bonusSpinPosList.push(pos);
                break;
            }
        }
    }

    //                               
    goalPosList.sort(function (a, b) { return a - b });
    bonusSpinPosList.sort(function (a, b) { return a - b });
    //                      
    var multi = 5, multiIndex = 0;
    for (var i = 1; i < 6; i++) {
        if (goalPosList.indexOf(i) != -1) {
            //                       
            for (var j = 0; j < bonusSpinPosList[i - 1]; j++) {
                if (wins_mask[j] == "h") {
                    wins_mask[j] = "np";
                }
            }
            wins_mask[bonusSpinPosList[i - 1]] = "w"
            wins[bonusSpinPosList[i - 1]] = multi;
            status[bonusSpinPosList[i - 1]] = i;

            multiIndex++;
            if (multiIndex > 2) {
                multi = 25
            } else {
                multi += 5;
            }

            var bonusObj = {
                status: [...status],
                wins: [...wins],
                win_mask: [...wins_mask]
            }

            bonusViewList.push(bonusObj);
        } else {
            for (var k = 0; k < bonusSpinPosList[i - 1]; k++) {
                if (wins_mask[k] == "h") {
                    wins_mask[k] = "np"
                }
            }

            status[bonusSpinPosList[i - 1]] = i;

            var bonusObj = {
                status: [...status],
                wins: [...wins],
                win_mask: [...wins_mask]
            }

            bonusViewList.push(bonusObj);
        }
    }

    return {
        win: win,
        view: bonusViewList
    }

};

var RandomBallView = function (msPoint, bpl) {
    var bonusView = RandomZeroView(baseReels, bpl);
    var ballList = [];
    var cursourPoint = msPoint;
    var ballNum = Util.random(1, 3);

    for (var i = 0; i < ballNum; i++) {
        while (true) {
            var pos = Util.random(0, 14);
            if (ballList.indexOf(pos) == -1) {
                ballList.push(pos);
                break;
            }
        }
    }

    for (var i = 0; i < ballList.length; i++) {
        if (ballList[i] == cursourPoint) {
            ballList[i]++;
        }
    }

    for (var i = 0; i < ballList.length; i++) {
        bonusView[ballList[i]] = 3;
    }

    return bonusView;
};

var WinFromView = function (view, bpl, isBonus = false) {
    var winMoney = 0;
    var defaultpayLines = [];
    if (isBonus) {
        defaultpayLines = bonusPayLine;
    } else {
        defaultpayLines = payLines;
    }

    for (var lineId = 0; lineId < defaultpayLines.length; lineId++) {
        var line = defaultpayLines[lineId];
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

var isBonus = function (symbol) {
    return symbol == bonus;
};

var isBonusSpinWin = function (view) {
    return NumberOfBonus(view) >= 3;
};

var NumberOfBonus = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isBonus(view[i])) {
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

var RandomBonusView = function (reels, bpl) {
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

        if (isBonusSpinWin(view) && WinFromView(view, bpl) == 0) {
            break;
        }
    }
    return view;
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