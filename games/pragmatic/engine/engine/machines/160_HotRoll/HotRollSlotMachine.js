var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 9;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];

    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["BONUS"];//"BONUS"
};

var wild5x = 2, wild4x = 3, wild3x = 4, wild2x = 5;
var emptySymbol = 12, specialSymbol = 11;
var slotWidth = 3, slotHeight = 3;
var baseReels = [
    [6, 12, 8, 12, 10, 12, 5, 12, 6, 12, 10, 12, 9, 12, 7, 12, 7, 12, 10, 12, 8, 12, 11, 12, 10, 12, 7, 12, 7, 12, 10, 12, 7, 12, 8, 12, 10, 12, 6, 5, 6, 12, 10, 12, 9, 12, 7, 12, 10, 12, 9, 12, 10, 12, 8, 12],
    [6, 12, 9, 12, 7, 12, 11, 12, 8, 12, 10, 12, 8, 12, 8, 12, 6, 12, 9, 12, 7, 12, 9, 12, 10, 12, 4, 12, 9, 12, 8, 12, 9, 12, 10, 12, 7, 12, 9, 12, 6, 2, 6, 12, 9, 12, 8, 12, 9, 12, 9, 12, 8, 12, 10, 12, 9, 12, 3, 12, 9, 12, 7, 12, 8, 12, 6, 12],
    [10, 12, 9, 12, 10, 12, 8, 12, 8, 12, 5, 12, 10, 12, 9, 12, 10, 12, 10, 12, 7, 12, 9, 12, 8, 12, 11, 12, 10, 12, 8, 12, 6, 5, 6, 12, 10, 12, 7, 12, 8, 12, 10, 12, 9, 12, 8, 12, 9, 12, 8, 12, 10, 12, 6, 12, 11, 12, 8, 12, 7, 12, 10, 12, 8, 12, 10, 12, 8, 12, 9, 12],
];
var payLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 4, 2],
    [3, 7, 8],
    [6, 4, 5],
    [0, 1, 5],
    [3, 4, 2],
];

SlotMachine.prototype.Init = function () {
    this.highPercent = 3; //(0-5)                       (                                .), 
    this.normalPercent = 70; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = Number(player.totalBet);
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    var viewCache = player.viewCache;

    this.view = viewCache.view;

    this.winMoney = WinFromView(this.view, player.betPerLine);
    var winInfo = WinLinesFromView(this.view, player.betPerLine); //                                        
    this.winLines = winInfo.winLines;
    this.coms = winInfo.winComs;

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    var tmpView, tmpWin;

    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin);
    } else {
        tmpView = RandomZeroView(baseReels, bpl);
    }

    var pattern = {
        view: tmpView.view,
        win: tmpView.win,
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
        default: break;
    }
}

SlotMachine.prototype.SpinForBonusGen = function (bpl, totalBet, bsWin, isCall = false) {
    var bonusSpinData = RandomBonusViewCache(baseReels, bpl, bsWin);

    return {
        view: bonusSpinData.view,
        win: bonusSpinData.win,
        bpl: bpl,
        type: "BONUS",
        isCall: isCall ? 1 : 0
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
    var result = {
        view: tmpView,
        win: tmpWin,
    }
    return result;
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
    var result = {
        view: tmpView,
        win: tmpWin,
    }
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
        if (NumberOfWilds(view) < 4) {
            break;
        }
    }
    return view;
};

var RandomBonusViewCache = function (reels, bpl, fsWin) {
    var minMoney = fsWin * 0.8;
    var maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    var lowerLimit = -1,
        upperLimit = 100000000000000;
    var lowerView = null,
        upperView = null;

    for (var patternIndex = 0; patternIndex < 200; patternIndex++) {
        var tmpView = [], tmpWin = 0;

        while (true) {
            for (var i = 0; i < slotWidth; i++) {
                var len = reels[i].length;
                var randomIndex = Util.random(0, len);
                for (var j = 0; j < slotHeight; j++) {
                    var viewPos = i + j * slotWidth;
                    var reelPos = (randomIndex + j) % len;
                    tmpView[viewPos] = reels[i][reelPos];
                }
            }
            if (NumberOfWilds(tmpView) >= 3 && NumberOfWilds(tmpView) <= 6) {
                break;
            }
        }

        tmpWin = WinFromView(tmpView, bpl);

        var bonusSpinData = {
            view: tmpView,
            win: tmpWin,
        }

        if (tmpWin >= minMoney && tmpWin <= maxMoney) {
            return bonusSpinData;
        }

        if (tmpWin > lowerLimit && tmpWin < minMoney) {
            lowerLimit = tmpWin;
            lowerView = bonusSpinData;
        }
        if (tmpWin > maxMoney && tmpWin < upperLimit) {
            upperLimit = tmpWin;
            upperView = bonusSpinData;
        }
    }

    return lowerView ? lowerView : upperView;
};

var WinFromView = function (view, bpl) {
    var money = 0;
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var linePay = WinFromLine(lineSymbols, bpl);
        money += linePay.money;
    }
    return money;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    var winComs = [];

    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money.money > 0) {
            winLines.push(
                `${lineId}~${money.money}~${line.filter(function (item, index) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
            winComs.push(money.com);
        }
    }
    var result = {
        winLines: winLines,
        winComs: winComs
    }
    return result;
};

var WinFromLine = function (lineSymbols, bpl) {
    var wildCnt = 0, emptyCnt = 0, specialCnt = 0;
    var remainSymbols = [], wildSymbols = [];
    var result;

    for (var i = 0; i < 3; i++) {
        if (isWild(lineSymbols[i])) {
            wildSymbols.push(lineSymbols[i]);
            wildCnt++;
        } else if (isEmpty(lineSymbols[i])) {
            emptyCnt++;
        } else if (isSpecial(lineSymbols[i])) {
            specialCnt++;
        } else {
            remainSymbols.push(lineSymbols[i]);
        }
    }

    if (specialCnt > 0) {
        for (var i = 0; i < 3; i++) {
            if (lineSymbols[i] != specialSymbol) {
                lineSymbols[i] = -1;
            }
        }
        if (specialCnt == 3) {
            result = {
                money: 10 * bpl,
                com: 20
            }
            return result;
        } else if (specialCnt == 2) {
            result = {
                money: 5 * bpl,
                com: 20
            }
            return result;
        } else if (specialCnt == 1) {
            result = {
                money: 2 * bpl,
                com: 20
            }
            return result;
        }
    }


    if (emptyCnt > 0) {
        result = {
            money: 0,
            com: 0
        }
        return result;
    }

    if (wildCnt == 3) {
        if (lineSymbols[0] == 5 && lineSymbols[1] == 2 && lineSymbols[2] == 5) {
            result = {
                money: 5000 * bpl,
                com: 9
            }
            return result;
        } else if (lineSymbols[0] == 5 && lineSymbols[1] == 3 && lineSymbols[2] == 5) {
            result = {
                money: 3000 * bpl,
                com: 10
            }
            return result;
        } else if (lineSymbols[0] == 5 && lineSymbols[1] == 4 && lineSymbols[2] == 5) {
            result = {
                money: 2000 * bpl,
                com: 11
            }
            return result;
        } else if (lineSymbols[0] == 5 && lineSymbols[1] == 5 && lineSymbols[2] == 5) {
            result = {
                money: 1000 * bpl,
                com: 12
            }
            return result;
        } else {
            result = {
                money: 0,
                com: 0,
            }
            return result;
        }
    } else if (wildCnt == 2) {
        var wildx = 1;
        if (wildSymbols[0] == 2) {
            wildx = 5;
        } else if (wildSymbols[0] == 3) {
            wildx = 4;
        } else if (wildSymbols[0] == 4) {
            wildx = 3;
        } else if (wildSymbols[0] == 5) {
            wildx = 2;
        }

        if (wildSymbols[1] == 2) {
            wildx *= 5;
        } else if (wildSymbols[1] == 3) {
            wildx *= 4;
        } else if (wildSymbols[1] == 4) {
            wildx *= 3;
        } else if (wildSymbols[1] == 5) {
            wildx *= 2;
        }

        if (remainSymbols[0] == 6) {
            result = {
                money: 100 * bpl * wildx,
                com: 13
            }
            return result;
        } else if (remainSymbols[0] == 7) {
            result = {
                money: 75 * bpl * wildx,
                com: 14
            }
            return result;
        } else if (remainSymbols[0] == 8) {
            result = {
                money: 30 * bpl * wildx,
                com: 16
            }
            return result;
        } else if (remainSymbols[0] == 9) {
            result = {
                money: 20 * bpl * wildx,
                com: 17
            }
            return result;
        } else if (remainSymbols[0] == 10) {
            result = {
                money: 10 * bpl * wildx,
                com: 18
            }
            return result;
        }
    } else if (wildCnt == 1) {
        var wildx = 1;
        if (wildSymbols[0] == 2) {
            wildx = 5;
        } else if (wildSymbols[0] == 3) {
            wildx = 4;
        } else if (wildSymbols[0] == 4) {
            wildx = 3;
        } else if (wildSymbols[0] == 5) {
            wildx = 2;
        }

        if (remainSymbols[0] == remainSymbols[1]) {
            if (remainSymbols[0] == 6) {
                result = {
                    money: 100 * bpl * wildx,
                    com: 13
                }
                return result;
            } else if (remainSymbols[0] == 7) {
                result = {
                    money: 75 * bpl * wildx,
                    com: 14
                }
                return result;
            } else if (remainSymbols[0] == 8) {
                result = {
                    money: 30 * bpl * wildx,
                    com: 16
                }
                return result;
            } else if (remainSymbols[0] == 9) {
                result = {
                    money: 20 * bpl * wildx,
                    com: 17
                }
                return result;
            } else if (remainSymbols[0] == 10) {
                result = {
                    money: 10 * bpl * wildx,
                    com: 18
                }
                return result;
            }
        } else if (remainSymbols[0] == 6 && remainSymbols[1] == 7 || remainSymbols[0] == 7 && remainSymbols[1] == 6) {
            result = {
                money: 50 * bpl * wildx,
                com: 15
            }
            return result;
        } else if (remainSymbols[0] == 8 && remainSymbols[1] == 9 || remainSymbols[0] == 9 && remainSymbols[1] == 8) {
            result = {
                money: 5 * bpl * wildx,
                com: 19
            }
            return result;
        } else if (remainSymbols[0] == 10 && remainSymbols[1] == 8 || remainSymbols[0] == 8 && remainSymbols[1] == 10) {
            result = {
                money: 5 * bpl * wildx,
                com: 19
            }
            return result;
        } else if (remainSymbols[0] == 9 && remainSymbols[1] == 10 || remainSymbols[0] == 10 && remainSymbols[1] == 9) {
            result = {
                money: 5 * bpl * wildx,
                com: 19
            }
            return result;
        } else {
            result = {
                money: 0,
                com: 0
            }
            return result;
        }
    }

    if (lineSymbols[0] == lineSymbols[1] && lineSymbols[0] == lineSymbols[2]) {
        if (lineSymbols[0] == 6) {
            result = {
                money: 100 * bpl,
                com: 13
            }
            return result;
        } else if (lineSymbols[0] == 7) {
            result = {
                money: 75 * bpl,
                com: 14
            }
            return result;
        } else if (lineSymbols[0] == 8) {
            result = {
                money: 30 * bpl,
                com: 16
            }
            return result;
        } else if (lineSymbols[0] == 9) {
            result = {
                money: 20 * bpl,
                com: 17
            }
            return result;
        } else if (lineSymbols[0] == 10) {
            result = {
                money: 10 * bpl,
                com: 18
            }
            return result;
        }
    } else {
        var i = 0;
        for (i = 0; i < 3; i++) {
            if (lineSymbols[i] >= 8 && lineSymbols[i] <= 10) {
                continue;
            } else {
                break;
            }
        }
        if (i == 3) {
            result = {
                money: 5 * bpl,
                com: 19
            }
            return result;
        }
        result = {
            money: 0,
            com: 0
        }
        return result;
    }
};

var RandomLineFromReels = function (reels) {
    var result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var isWild = function (symbol) {
    return symbol == wild2x || symbol == wild3x || symbol == wild4x || symbol == wild5x;
};

var isEmpty = function (symbol) {
    return symbol == emptySymbol;
};

var isSpecial = function (symbol) {
    return symbol == specialSymbol;
};

var NumberOfWilds = function (view) {
    var result = 0;
    for (var i = 0; i < view.length; i++) {
        if (isWild(view[i])) {
            result++;
        }
    }
    return result;
}

module.exports = SlotMachine;