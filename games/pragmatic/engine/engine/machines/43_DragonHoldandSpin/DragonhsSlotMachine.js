var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 5;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                   
    this.changeView = [];
    this.changePositions = [];
    //                              
    this.moneyBonusBeforeMoney = 0;
    this.moneyBonusWin = 0;
    this.moneyCacheIndex = 0;
    this.moneyCache = {};
    this.moneyCacheList = [];
    this.moneyBonusStr = "";
    //                        
    this.bigMoneyIndex = 0;
    this.bigMoneyWin = 0;
    this.bigMoneyCacheList = [];
    this.bigMoneyCache = {};

    //                       
    this.patternCount = 2000; //                   
    this.lowLimit = 10; //                          
    this.prevBalance = 0; //                        (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"]; //FREE, BONUS

    this.highPercent = 1;
    this.normalPercent = 30;
};

var scatter = 1, wild = 2, moneySymbol = 11, noMoneySymbol = 12, silverCoinSymbol = 13, goldCoinSymbol = 14, diamondSymbol = 15;
var slotWidth = 5, slotHeight = 3;
//                     ,           3                          
var baseReels = [
    [6, 9, 9, 9, 9, 8, 7, 7, 7, 10, 3, 10, 10, 10, 5, 13, 7, 1, 3, 8, 4, 6, 6, 6, 8, 8, 8, 13, 13, 13, 8, 9, 4, 9, 10, 3, 10, 9, 10, 1, 5, 4, 7, 4, 3, 9, 4, 9, 10, 13, 9, 9, 7, 8, 9, 4, 10, 4, 4, 8, 4, 9, 4, 7, 10, 9, 10, 4, 3, 8, 10, 4, 9, 4, 1, 9, 10, 9, 10, 10, 7, 9, 8, 10, 8, 9, 3, 10, 9, 8, 7, 10, 7, 9],
    [10, 7, 7, 7, 7, 6, 8, 13, 13, 9, 5, 5, 5, 3, 1, 10, 10, 10, 13, 8, 8, 8, 5, 4, 9, 9, 9, 5, 7, 5, 4, 9, 3, 8, 9, 5, 13, 9, 4, 7, 8, 13, 6, 9, 8, 3, 7, 5, 6, 13, 7, 9, 13, 7, 9, 5, 7, 9, 6, 7, 4, 3, 9, 5, 8, 6, 5, 8, 13, 6, 7, 9, 13, 8, 13, 9, 5, 13, 3, 9, 13, 8, 7, 5, 4, 7, 3, 8, 9, 13, 4, 13, 8, 9, 8, 5, 9, 5, 4, 13, 9, 13, 5, 13, 8, 7, 5, 3, 13, 9, 5, 8, 9, 13, 9, 5, 13, 8, 13],
    [8, 8, 8, 4, 8, 10, 9, 4, 4, 4, 13, 6, 6, 6, 6, 7, 10, 10, 10, 1, 7, 7, 7, 3, 5, 9, 9, 9, 13, 4, 9],
    [7, 9, 8, 7, 7, 7, 3, 5, 4, 9, 9, 9, 1, 5, 5, 5, 13, 6, 3, 7, 10, 8, 8, 8, 10, 10, 10, 13, 13, 10, 9, 10, 5, 9, 3, 4, 9, 10, 13, 9, 13, 4, 5, 10, 9, 13, 3, 5, 4, 9, 5, 10, 9, 3, 10, 9, 5, 1, 10, 9, 13, 9, 5, 10, 5, 3, 9, 13, 4, 10, 1, 8, 13, 9, 5, 8, 5, 13, 9, 10, 8, 9, 10, 13, 10, 3, 4, 13, 9, 10, 5, 9, 8, 10, 1, 3, 10, 9, 8, 9, 13, 10, 9, 13, 4, 5],
    [5, 8, 6, 10, 10, 10, 5, 5, 5, 4, 9, 13, 13, 13, 7, 3, 4, 4, 4, 10, 1, 8, 8, 8, 6, 6, 6, 10, 13, 10, 4, 1, 6, 10, 4, 8, 10, 6, 4, 10, 6, 7, 10, 4]
];
var payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 100, 50, 20, 20, 20, 2, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 1000, 1000, 200, 50, 50, 50, 10, 10, 10, 0, 0, 0, 0, 0],
    [0, 0, 5000, 5000, 500, 200, 200, 200, 50, 50, 50, 0, 0, 0, 0, 0]
];
var payLines = [
    [5, 6, 7, 8, 9], // 1
    [0, 1, 2, 3, 4], // 2
    [10, 11, 12, 13, 14], // 3
    [0, 6, 12, 8, 4], // 4
    [10, 6, 2, 8, 14], // 5
];
var moneySymbolValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 500, 1000, 1500, 2000, 2500, 5000];
var moneySymbols = [13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15];
var silverCoinIndex = 9,
    goldCoinIndex = 20;
var bigMoneyValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 5000];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .), 
    this.normalPercent = 40; //                                 ,                                               ,                                     .
};

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];
    this.scatterWin = 0;
    this.scatterPosition = [];
    this.changeView = [];
    this.changePositions = [];

    if (this.currentGame == "BONUS") {
        this.BonusSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        var cache = viewCache.view;
        this.view = cache.view;
        this.changeView = cache.changeView;
        this.changePositions = cache.changePositions;
    }

    if (viewCache.type == "BONUS") {
        this.moneyCacheList = viewCache.moneyCacheList;
        this.bigMoneyCacheList = viewCache.bigMoneyCacheList;
        this.view = this.moneyCacheList[0].maskView;

        var bonusWinMoney = viewCache.win / viewCache.bpl * player.betPerLine;
        // console.log(`....................[Bonus Spin] ${bonusWinMoney}`);
    }

    var view = this.view;
    if (this.changePositions.length > 0) {
        view = this.changeView;
    }

    this.winMoney = WinFromView(view, player.betPerLine);
    this.winLines = WinLinesFromView(view, player.betPerLine);
    this.scatterPosition = ScatterPositions(view);
    this.scatterWin = ScatterWinFromView(view, player.betPerLine * this.lineCount);
    this.moneyCache = RandomMoneyCache(view);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    if (isMoneyBonusWin(this.view)) {
        this.moneyCacheIndex = 1;
        this.moneyCache = this.moneyCacheList[0].cache;
        this.moneyBonusBeforeMoney = this.winMoney;
        this.moneyBonusWin = GetTotalMoney(this.moneyCache.values) * player.betPerLine + this.winMoney;
        this.currentGame = "BONUS";

        var positionsBySymbol = [];
        for (var symbol = scatter; symbol < moneySymbol; symbol++) {
            var positions = [];
            for (var i = 0; i < this.view.length; i++) {
                if (this.view[i] == symbol) {
                    positions.push(i);
                }
            }
            if (positions.length > 0) {
                positionsBySymbol.push(`${symbol}~${noMoneySymbol}~${positions.join()}`);
            }
        }
        this.moneyBonusStr = positionsBySymbol.join(';');
    }
};

SlotMachine.prototype.BonusSpin = function (player) {
    this.gameSort = this.currentGame;
    this.winMoney = 0;

    if (this.currentGame == "BONUS") {
        var cache = this.moneyCacheList[this.moneyCacheIndex];
        this.view = cache.view;
        this.moneyCache = cache.cache;
        this.moneyBonusWin = this.moneyBonusBeforeMoney + GetTotalMoney(this.moneyCache.values) * player.betPerLine;
        this.moneyCacheIndex++;

        if (this.moneyCacheIndex >= this.moneyCacheList.length) {
            if (this.bigMoneyCacheList.length == 0) {
                this.winMoney = this.moneyBonusWin;
                this.currentGame = "BASE";
            } else {
                this.currentGame = "BonusEnd";
            }
        }
    } else if (this.currentGame == "BonusEnd") {
        this.bigMoneyIndex = 0;
        this.bigMoneyWin = 0;
        this.bigMoneyCache = this.bigMoneyCacheList[0];
        this.currentGame = "BigMoneyBonus";
    } else if (this.currentGame == "BigMoneyBonus") {
        this.bigMoneyCache = this.bigMoneyCacheList[this.bigMoneyIndex];
        this.bigMoneyWin += this.bigMoneyCache.wheels[this.bigMoneyCache.wheelIndex] * player.betPerLine * this.lineCount;
        this.bigMoneyIndex++;

        if (this.bigMoneyIndex >= this.bigMoneyCacheList.length) {
            this.moneyBonusWin += this.bigMoneyWin;
            this.winMoney = this.moneyBonusWin;
            this.currentGame = "BASE";
        }
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var cache, win;

    if (baseWin > 0) {
        cache = RandomWinView(baseReels, bpl, baseWin);
    } else {
        cache = RandomZeroView(baseReels, bpl);
    }

    if (cache.changeView.length > 0) {
        win = WinFromView(cache.changeView, bpl);
    } else {
        win = WinFromView(cache.view, bpl);
    }

    var pattern = {
        view: cache,
        win: win,
        type: "BASE",
        bpl: bpl
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
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin, totalBet, isCall)

    var pattern = {
        win: bonusSpinData.win,
        moneyCacheList: bonusSpinData.moneyCacheList,
        bigMoneyCacheList: bonusSpinData.bigMoneyCacheList,
        bpl: bpl,
        type: "BONUS",
        isCall: isCall ? 1 : 0
    }

    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin) {
    var wildFlag = false;
    var bottomLimit = 0;
    var calcCount = 0;

    if (Util.probability(3)) {
        wildFlag = true;
    }

    while (true) {
        var view = RandomView(reels);

        if (isMoneyBonusWin(view)) {
            continue;
        }

        var win = WinFromView(view, bpl);

        var changeView = [],
            changePositions = [];
        if (wildFlag) {
            var wildView = GetWildView(view);
            changeView = wildView.changeView;
            changePositions = wildView.changePositions;
            win = WinFromView(changeView, bpl);
        }

        if (win > bottomLimit && win <= maxWin) {
            var result = {
                view: view,
                changeView: changeView,
                changePositions: changePositions
            };
            return result;
        }

        calcCount++;
        if (calcCount > 100) {
            return RandomZeroView(reels, bpl);
        }
    }
};

var RandomZeroView = function (reels, bpl) {
    var wildFlag = false;
    if (Util.probability(2)) {
        wildFlag = true;
    }

    while (true) {
        var view = RandomView(reels);

        if (isMoneyBonusWin(view)) {
            continue;
        }

        var win = WinFromView(view, bpl);

        var changeView = [],
            changePositions = [];
        if (wildFlag) {
            var wildView = GetWildView(view);
            changeView = wildView.changeView;
            changePositions = wildView.changePositions;
            win = WinFromView(changeView, bpl);
        }

        if (win == 0) {
            var result = {
                view: view,
                changeView: changeView,
                changePositions: changePositions
            };
            return result;
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

var RandomBonusViewCache = function (reels, bpl, bsWin, totalBet, isCall) {
    var patternCount = 100,
        goldCoinPercent = 0,
        diamondPercent = 0;

    if (isCall) {
        patternCount = 200;
        goldCoinPercent = 5;
        diamondPercent = 1;
    }

    var minMoney = bsWin * 0.8;
    var maxMoney = bsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < patternCount; patternIndex++) {
        //                        
        var view, win;
        while (true) {
            view = RandomView(reels);
            if (isMoneyBonusWin(view)) {
                break;
            }
        }

        win = WinFromView(view, bpl);

        var values = DefaultMoneyCache().values,
            table = DefaultMoneyCache().table,
            moneyView = [],
            noMoneyPositions = [];
        var respinCount = 1;

        for (var i = 0; i < view.length; i++) {
            if (isMoneySymbol(view[i])) {
                if (view[i] == silverCoinSymbol) {
                    var index = GetRandomCoinIndex(0, silverCoinIndex);
                    values[i] = moneySymbolValues[index];
                } else if (view[i] == goldCoinSymbol) {
                    var index = GetRandomCoinIndex(silverCoinIndex, goldCoinIndex);
                    values[i] = moneySymbolValues[index];
                } else if (view[i] == diamondSymbol) {
                    var index = GetRandomCoinIndex(goldCoinIndex, moneySymbolValues.length);
                    values[i] = moneySymbolValues[index];
                }
                table[i] = "v";
                moneyView[i] = view[i];
                view[i] = moneySymbol;
            } else {
                noMoneyPositions.push(i);
                moneyView[i] = noMoneySymbol;
            }
        }

        var moneyData = {
            maskView: view,
            view: moneyView,
            cache: {
                table: table,
                values: values,
            },
            respinCount: respinCount,
        };

        var moneyBonusWin = win + GetTotalMoney(values) * bpl,
            bigMoneyWin = 0,
            moneyCacheList = [moneyData],
            bigMoneyCacheList = [];

        //                 
        while (true) {
            var addedMoneyCount = 0;
            if (Util.probability(30)) {
                addedMoneyCount = Util.random(1, 3);
            }

            var prevCache = moneyCacheList[moneyCacheList.length - 1];
            var tmpTable = Util.clone(prevCache.cache.table),
                tmpValues = Util.clone(prevCache.cache.values),
                tmpMoneyView = Util.clone(prevCache.view);

            if (addedMoneyCount > 0) {
                for (var i = 0; i < addedMoneyCount; i++) {
                    var posIndex = Util.random(0, noMoneyPositions.length);
                    var randomPos = noMoneyPositions[posIndex];
                    noMoneyPositions = Util.remove(noMoneyPositions, posIndex);

                    var index = Util.random(0, silverCoinIndex);
                    if (Util.probability(goldCoinPercent)) {
                        index = Util.random(silverCoinIndex, goldCoinIndex);
                        if (Util.probability(diamondPercent)) {
                            index = Util.random(goldCoinIndex, moneySymbolValues.length);
                        }
                    }
                    tmpTable[randomPos] = "v";
                    tmpValues[randomPos] = moneySymbolValues[index];
                    tmpMoneyView[randomPos] = moneySymbols[index];
                }
                respinCount = 1;
            } else {
                respinCount++;
            }

            var cache = {
                view: tmpMoneyView,
                cache: {
                    table: tmpTable,
                    values: tmpValues,
                },
                respinCount: respinCount,
            };

            moneyCacheList.push(cache);
            moneyBonusWin = win + GetTotalMoney(tmpValues) * bpl;

            if (respinCount == 5 || noMoneyPositions.length == 0) {
                break;
            }
        }

        if (moneyCacheList.length <= 5) continue;

        if (noMoneyPositions.length == 0) { //                      
            var wheelLength = 10;

            while (true) {
                var wheelIndex = Util.random(1, wheelLength),
                    wheels = [],
                    wheelMarks = [];

                for (var i = 0; i < wheelLength; i++) {
                    var index = 0;
                    if (Util.probability(70)) {
                        index = Util.random(0, 10);
                    } else {
                        index = Util.random(0, bigMoneyValues.length);
                    }
                    wheels[i] = bigMoneyValues[index];
                }

                var zeroPos = [];
                var count = Util.random(1, 4);

                if (Util.probability(20)) { //                           
                    zeroPos.push(wheelIndex)
                }

                while (true) {
                    var rand = Util.random(1, wheelLength - 1);
                    if (zeroPos.indexOf(rand - 1) == -1 && zeroPos.indexOf(rand + 1) == -1) {
                        zeroPos.push(rand);
                    }
                    if (zeroPos.length >= count) {
                        break;
                    }
                }

                for (var j = 0; j < zeroPos.length; j++) {
                    wheels[zeroPos[j]] = 0;
                }

                for (var i = 0; i < wheelLength; i++) {
                    wheelMarks[i] = "w";
                    if (wheels[i] == 0) {
                        wheelMarks[i] = "go";
                    }
                }

                var wheelData = {
                    wheelIndex: wheelIndex,
                    wheelMark: wheelMarks,
                    wheels: wheels,
                };

                bigMoneyCacheList.push(wheelData);
                bigMoneyWin += wheels[wheelIndex] * totalBet;

                if (wheels[wheelIndex] == 0) {
                    break;
                }
            }
        }

        moneyBonusWin += bigMoneyWin;

        if (moneyBonusWin >= minMoney && moneyBonusWin <= maxMoney) {
            return {
                win: moneyBonusWin,
                moneyCacheList: moneyCacheList,
                bigMoneyCacheList: bigMoneyCacheList,
            };
        }

        if (moneyBonusWin > lowerLimit && moneyBonusWin < minMoney) {
            lowerLimit = moneyBonusWin;
            lowerView = {
                win: moneyBonusWin,
                moneyCacheList: moneyCacheList,
                bigMoneyCacheList: bigMoneyCacheList,
            };
        }

        if (moneyBonusWin > maxMoney && moneyBonusWin < upperLimit) {
            upperLimit = moneyBonusWin;
            upperView = {
                win: moneyBonusWin,
                moneyCacheList: moneyCacheList,
                bigMoneyCacheList: bigMoneyCacheList,
            };
        }
    }

    return lowerView ? lowerView : upperView;
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

    money += ScatterWinFromView(view, bpl * 20);

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

var isWild = function (symbol) {
    return symbol == wild;
};

var isScatter = function (symbol) {
    return symbol == scatter;
};

var GetTotalMoney = function (values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        total += values[i];
    }
    return total;
};

var isMoneySymbol = function (symbol) {
    return symbol == moneySymbol || symbol == silverCoinSymbol || symbol == goldCoinSymbol || symbol == diamondSymbol;
};

var NumberOfMoneySymbols = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isMoneySymbol(view[i])) {
            result++;
        }
    }
    return result;
};

var isMoneyBonusWin = function (view) {
    return NumberOfMoneySymbols(view) >= 5;
};

var DefaultMoneyCache = function () {
    var moneyValues = [];
    var moneyTable = [];
    for (var i = 0; i < slotWidth * slotHeight; i++) {
        moneyValues[i] = 0;
        moneyTable[i] = "r";
    }

    var result = {
        values: moneyValues,
        table: moneyTable,
    };
    return result;
};

var RandomMoneyCache = function (view) {
    if (NumberOfMoneySymbols(view) == 0) {
        return null;
    }

    var values = DefaultMoneyCache().values;
    var table = DefaultMoneyCache().table;

    for (var i = 0; i < view.length; i++) {
        if (view[i] == silverCoinSymbol) {
            var index = GetRandomCoinIndex(0, silverCoinIndex);
            table[i] = "v";
            values[i] = moneySymbolValues[index];
        } else if (view[i] == goldCoinSymbol) {
            var index = GetRandomCoinIndex(silverCoinIndex, goldCoinIndex);
            table[i] = "v";
            values[i] = moneySymbolValues[index];
        } else if (view[i] == diamondSymbol) {
            var index = GetRandomCoinIndex(goldCoinIndex, moneySymbolValues.length);
            table[i] = "v";
            values[i] = moneySymbolValues[index];
        }
    }

    var result = {
        table: table,
        values: values
    };
    return result;
};

var GetRandomCoinIndex = function (startIndex, endIndex) {
    var index = startIndex;

    if (Util.probability(50)) {
        index = startIndex;
    } else if (Util.probability(50)) {
        index = startIndex + 1;
    } else if (Util.probability(50)) {
        index = startIndex + 2;
    } else if (Util.probability(50)) {
        index = startIndex + 3;
    } else if (Util.probability(50)) {
        index = Util.random(startIndex + 4, endIndex);
    }

    return index;
};

var GetWildView = function (view) {
    var positions = [],
        wildChangePositions = [];
    var wildCount = 0;

    if (Util.probability(70)) {
        wildCount = 3;
    } else if (Util.probability(40)) {
        wildCount = 4;
    } else if (Util.probability(20)) {
        wildCount = 5;
    } else {
        wildCount = 6;
    }

    while (true) {
        var rand = Util.random(0, view.length);
        if (positions.indexOf(rand) == -1) {
            positions.push(rand);
        }
        if (positions.length >= wildCount) {
            break;
        }
    }

    var changeView = Util.clone(view);
    for (var j = 0; j < wildCount; j++) {
        var pos = positions[j];
        wildChangePositions.push(pos);
        changeView[pos] = wild;
    }

    var result = {
        changeView: changeView,
        changePositions: wildChangePositions
    };

    return result;
};

var ScatterWinFromView = function (view, bet) {
    var win = 0;
    var nScatters = NumberOfScatters(view);
    if (nScatters == 5) {
        win = bet * 100;
    } else if (nScatters == 4) {
        win = bet * 20;
    } else if (nScatters == 3) {
        win = bet * 1;
    }

    return win;
};

var ScatterPositions = function (view) {
    var result = [];
    for (var i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
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

module.exports = SlotMachine;