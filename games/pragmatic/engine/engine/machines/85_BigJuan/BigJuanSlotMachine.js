var Util = require('../../../utils/slot_utils');

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 40;
    //                                 
    this.view = [];
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    this.moneyCache = {};
    //               
    this.switchMask = [];   //                         is
    this.switchPositions = [];
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinAdd = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.gView = [];
    this.sReel = [];
    this.moneyCache = {};
    this.nCollects = [0, 0, 0, 0];
    this.addCollects = [0, 0, 0, 0];
    this.collectLevels = [0, 0, 0, 0];
    this.collectAddLevels = [0, 0, 0, 0];
    this.isShowAddLevel = 0;
    this.collectMoney = 0;
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )
    this.bonusBuyMoney = 0; //                                               (                                  )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];
    this.baseWinPercent = 20;

    this.buyMulti = 100;
    this.buyPatternCount = 50;
};

var scatter = 1;
var wild = 2;
var baseReels = [   //                           13                    .
    [8, 7, 7, 11, 7, 1, 12, 11, 9, 5, 4, 3, 11, 12, 3, 6, 3, 3, 3, 3, 12, 11, 12, 11, 8, 8, 5, 6, 8, 12, 5, 3, 5, 2, 11, 2, 3, 12, 8, 10, 8, 7],
    [12, 3, 6, 8, 8, 11, 5, 9, 9, 9, 9, 10, 8, 10, 6, 10, 5, 11, 10, 4, 9, 8, 7, 10, 6, 6, 7, 9, 3, 8, 8, 8, 8, 2, 11, 11, 10, 4, 4, 6, 12, 8, 11, 11, 11, 11, 9, 1, 5, 2, 11, 9, 10, 6, 1, 4, 10, 10, 10, 10, 5, 8, 8, 11, 11, 2, 4, 9, 9, 11, 5, 6, 6, 6, 6, 5, 10, 9, 10, 2, 10, 8, 4, 4],
    [3, 10, 9, 12, 7, 2, 10, 7, 12, 7, 9, 5, 3, 12, 9, 12, 1, 5, 11, 8, 6, 5, 12, 4, 2, 9, 9, 9, 9, 10, 5, 3, 11, 12, 9, 7, 12, 2, 10, 10, 9, 12, 12, 12, 8, 9, 9, 10, 9, 1, 3, 9, 12, 4, 10, 6, 9, 10, 3],
    [6, 7, 5, 7, 2, 7, 7, 11, 4, 8, 10, 6, 1, 8, 6, 2, 9, 7, 11, 11, 11, 11, 7, 12, 11, 1, 3, 10, 8, 11, 6, 4, 6, 6, 6, 11, 4, 4, 8, 8, 4, 8, 10, 11, 8, 8, 8, 8, 11, 7, 10, 3, 8, 10, 6, 11, 10, 5, 7, 7, 7, 7, 6, 9, 6, 4, 12, 11, 6, 7, 8, 4, 2, 10, 10],
    [12, 3, 9, 11, 5, 11, 3, 11, 8, 3, 9, 6, 2, 5, 2, 12, 9, 8, 6, 8, 9, 12, 10, 7, 11, 11, 5, 6, 3, 6, 7, 2, 10, 7, 6, 6, 3, 3, 3, 3, 11, 9, 5, 6, 11, 12, 10, 12, 5, 3, 9, 5, 10, 3, 3, 9, 12, 5, 11, 9, 12, 8, 5, 7, 2, 3, 7, 3, 4, 5, 12, 11, 6, 7, 4, 5, 9, 12, 2, 7, 3, 11, 1, 3, 6, 7, 11, 6, 9, 3, 12, 4, 12, 5, 1, 10, 7, 2, 3, 7, 12, 8, 8, 12, 10, 12, 11, 7, 12, 6, 9, 5, 12, 6, 7, 5, 11, 1, 6, 13]
];
var fsCollectReels = [
    [23, 22, 14, 23, 14, 23, 23, 23, 22, 22, 14, 14, 23, 14, 23, 22, 22, 22, 14, 22, 22, 14, 23, 14, 14]
];
var payTable = [    //                   
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 50, 25, 20, 15, 10, 10, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 150, 100, 80, 40, 20, 20, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 500, 250, 200, 150, 100, 100, 40, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var payLines = [
    [0, 1, 2, 3, 4],        //1
    [0, 1, 2, 8, 14],       //2
    [0, 1, 7, 13, 14],      //3
    [0, 1, 7, 3, 4],        //4
    [0, 6, 7, 8, 4],        //5
    [0, 6, 7, 8, 14],       //6
    [0, 6, 12, 8, 4],       //7
    [5, 1, 2, 3, 9],        //8
    [5, 1, 7, 3, 9],        //9
    [5, 1, 7, 13, 9],       //10
    [5, 6, 7, 13, 19],      //11
    [5, 6, 7, 8, 9],        //12
    [5, 6, 12, 8, 9],       //13
    [5, 6, 12, 18, 19],     //14
    [5, 11, 7, 13, 9],      //15
    [5, 11, 7, 3, 9],       //16
    [5, 11, 12, 13, 9],     //17
    [5, 11, 12, 13, 19],    //18
    [5, 11, 17, 13, 9],     //19
    [5, 11, 17, 18, 19],    //20
    [10, 16, 17, 18, 14],   //21
    [10, 16, 12, 18, 14],   //22
    [10, 16, 12, 8, 14],    //23
    [10, 11, 12, 8, 4],     //24
    [10, 11, 12, 13, 14],   //25
    [10, 11, 7, 13, 14],    //26
    [10, 11, 7, 3, 4],      //27
    [10, 6, 12, 8, 14],     //28
    [10, 6, 12, 18, 14],    //29
    [10, 6, 7, 8, 14],      //30
    [10, 6, 7, 8, 4],       //31
    [10, 6, 2, 3, 4],       //32
    [10, 6, 2, 8, 14],      //33
    [15, 11, 7, 13, 19],    //34
    [15, 11, 12, 13, 19],   //35
    [15, 11, 12, 13, 9],    //36
    [15, 16, 12, 18, 19],   //37
    [15, 16, 12, 8, 9],     //38
    [15, 16, 17, 13, 9],    //39
    [15, 16, 17, 18, 19]    //40
];
/*
0.json
218,233,250                   

20                                     

                     
                sa,sb    14          

acci    1;2;3;4
accm  cp~tp~lvl~sc
accv   0~5~0~0;0~5~0~0;0~4~0~0;0~3~0~0       
      5,5,4,3             ,         ,         ,                                   
      cp                                       , sc                                     , lvl                           
                             sc                                           
      cl    (                - 1)       [      ,                                                                 .]                                          .

               
apt             ma    (money add          )
apv                       
apwa                 

            
puri 0
purtr 1

stf:    wild_switch_1: 9~2~1;9~2~3               ~2~      

fs_main                              mo_c: "1"

14:fs      
15:      
16:         
17:         
18:         
19:         
20:      
21:            
22:   
23:         
24:      
25:      ,                        

{
    fs_collect:{
        reel_set:"2",s:"14,22,23",
        sa:"22",
        sb:"14",
        sh:"3",
        st:"rect",
        sw:"1"
    },
    fs_main:{
        mo:"0,0,0,0,40,0,0,0,0",
        mo_c:"1",
        mo_t:"r,r,r,r,v,r,r,r,r",
        mo_tv:"40",
        mo_tw:"400.00",
        mo_wpos:"4",
        reel_set:"1",
        s:"17,14,14,14,16,14,14,20,21",
        sa:"14,14,14",
        sb:"14,14,14",
        sh:"3",
        st:"rect",
        sw:"3"
    }
}
*/
var gBagPos = 4;      //                   
var moneySymbol = 15;
var fsEmptySymbol = 14;
var collectSymbols = [20, 19, 18, 17];
var collectValues = [500, 2000, 10000, 100000];
var collectLimits = [3, 4, 5, 5];
var extraSymbol = 21;
var winSymbol = 22;
var boostSymbol = 23;
var bsEmptySymbol = 25;
var slotWidth = 5, slotHeight = 4;
var moneyValueList = [20, 40, 80, 120, 200, 320, 400];
var symbolArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var swithCount = 6;
var percentList = {
    moneyHighPercent: 22,
    moneyLowPercent: 34,
    respinAddPercent: 12,
    stickyManyPercent: 7,
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 2; //(0-5)                       (                                .), 
    this.normalPercent = 34; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.totalBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    this.switchMask = [];
    this.switchPositions = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin(player);
        return;
    }

    var viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        this.view = viewCache.view;

        if (this.view[12] > 100) {     //                  
            var symbol = Math.floor(this.view[12] / 100);

            this.view[12] %= 100;
            this.switchMask = [...this.view];
            this.switchPositions = GetSymbolPositions(this.view, symbol, 1);
            MakeFinalView(this.view, this.switchPositions);
        }
    } else if (viewCache.type == "FREE") {
        this.freeSpinCacheList = viewCache.view;
        this.view = this.freeSpinCacheList[0];
        this.freeSpinLength = GetFreeSpinCounts(this.view);
        this.freeSpinIndex = 1;
        this.freeSpinWinMoney = 0;

        this.nCollects = [0, 0, 0, 0];
        this.addCollects = [0, 0, 0, 0];
        this.collectLevels = [0, 0, 0, 0];
        this.isShowAddLevel = 0;

        this.currentGame = "FREE";
    }

    this.winMoney = WinFromView(this.view, player.betPerLine); //                             
    this.winLines = WinLinesFromView(this.view, player.betPerLine); //                                    

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };
};

SlotMachine.prototype.FreeSpin = function (player) {
    var cache = this.freeSpinCacheList[this.freeSpinIndex];

    this.gView = cache.gView;
    this.sReel = cache.sReel;
    this.moneyCache = cache.moneyCache;
    this.freeSpinAdd = 0;
    //                                                            
    for (var i = 0; i < slotWidth; ++i) {
        for (var j = 0; j < slotHeight; ++j) {
            var pos = i + slotWidth * j;

            if (i < 3 && j < 3) {
                this.view[pos] = this.gView[i + j * 3];

                if (this.view[pos] == extraSymbol) {
                    this.freeSpinAdd++;
                    this.freeSpinLength++;
                }
            } else if (i == 3 && j < 3) {
                this.view[pos] = this.sReel[j];
            } else {
                this.view[pos] = bsEmptySymbol;
            }
        }
    }

    var collected = 0;  //            
    this.collectMoney = 0;
    this.collectAddLevels = [0, 0, 0, 0];

    if (this.sReel[1] == winSymbol) {
        this.addCollects = [0, 0, 0, 0];

        //                                   
        for (var i = 0; i < 3; ++i) {
            for (var j = 0; j < 3; ++j) {
                idx = collectSymbols.indexOf(this.gView[i + j * 3]);

                if (idx >= 0) {
                    this.addCollects[idx]++;
                }
            }
        }
        //                                                                                               

        for (var i = 0; i < 4; ++i) {
            this.nCollects[i] += this.addCollects[i];

            if (this.nCollects[i] >= collectLimits[i]) {
                collected = 1;
                this.collectAddLevels[i] = Math.floor(this.nCollects[i] / collectLimits[i]);
                this.nCollects[i] %= collectLimits[i];

                this.collectLevels[i] += this.collectAddLevels[i];
                this.collectMoney += collectValues[i] * this.collectAddLevels[i];
                this.winMoney += this.collectMoney * player.betPerLine;
            }
        }

        this.winMoney += MoneyWinFromCache(this.moneyCache, player.betPerLine);
    } else if (this.sReel[1] == boostSymbol) {
        this.moneyCache.values[gBagPos] = this.moneyCache.values.reduce((total, value) => total + value, 0);
    }
    //                                                                                                                .
    if (collected) {
        this.isShowAddLevel = 1;
    } else if (this.winMoney) {
        this.isShowAddLevel = 0;
    }

    if (this.isShowAddLevel) {
        for (var i = 0; i < 4; ++i) {
            this.collectAddLevels = Math.max(0, this.collectLevels[i] - 1);
        }
    }

    this.virtualReels = {
        above: [14, 14, 14, 14, 14],
        below: [14, 14, 14, 14, 14]
    };

    this.freeSpinWinMoney += this.winMoney;

    this.freeSpinIndex++;
    if (this.freeSpinIndex >= this.freeSpinCacheList.length) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {
    //                            [      ] *                                                             ~~                 .
    var pattern = {
        type: "BASE",
        bpl: bpl,
    };

    if (baseWin > 0) {
        var { tmpView, tmpWin } = RandomWinView(baseReels, bpl, baseWin, totalBet);
    } else {
        var { tmpView, tmpWin } = RandomZeroView(baseReels, bpl);
    }

    pattern.win = tmpWin;
    pattern.view = tmpView;

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
        default: break;
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    var freeSpinCacheList = [];
    var stickyCount = 3; //                      

    if (Util.probability(percentList.stickyManyPercent)) {
        stickyCount = 4;
    }

    var scatterView = RandomScatterView(baseReels, bpl, stickyCount);

    freeSpinCacheList.push(scatterView);
    var fsCount = GetFreeSpinCounts(scatterView);
    var fsCache = RandomFreeViewCache(fsCollectReels, bpl, fsWin, fsCount);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: "FREE",
        isCall: isCall ? 1 : 0
    };
    return pattern;
};

SlotMachine.prototype.SpinForBuyBonus = function (bpl, totalBet) {
    var freeSpinCacheList = [];
    var stickyCount = 3; //                      

    if (Util.probability(percentList.stickyManyPercent)) {
        stickyCount = 4;
    }

    var scatterView = RandomScatterView(baseReels, bpl, stickyCount);

    freeSpinCacheList.push(scatterView);
    var fsCount = GetFreeSpinCounts(scatterView);
    var fsCache = BuyBonusViewCache(fsCollectReels, bpl, fsCount);

    var pattern = {
        view: freeSpinCacheList.concat(fsCache.cache),
        bpl: bpl,
        win: fsCache.win,
        type: "FREE",
        isCall: 0
    };
    return pattern;
};

var RandomWinView = function (reels, bpl, maxWin, totalBet) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;
    var isSwitch = maxWin > totalBet * 12 ? 1 : 0;
    var symbolInfo = {};

    while (true) {
        tmpView = RandomView(reels, slotWidth, slotHeight);

        if (isSwitch) {   //6                                      ..
            symbolInfo = MaxMatchSymbolInfo(tmpView);
            var positions = GetSymbolPositions(tmpView, symbolInfo.symbol, 0);

            Util.shuffle(positions);

            for (var i = symbolInfo.count; i < swithCount; ++i) {
                tmpView[positions.pop()] = symbolInfo.symbol;
            }

            var finalView = [...tmpView];

            MakeFinalView(finalView, positions);
            tmpWin = WinFromView(finalView, bpl);

        } else {
            tmpWin = WinFromView(tmpView, bpl);
        }

        if (tmpWin > bottomLimit && tmpWin <= maxWin) {
            if (isSwitch) {   //                   SpinFromPattern                      ~
                tmpView[12] += 100 * symbolInfo.symbol;
            }
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
        tmpView = RandomView(reels, slotWidth, slotHeight);
        tmpWin = WinFromView(tmpView, bpl);
        if (tmpWin == 0 && MaxMatchSymbolInfo(tmpView).count < 6) {
            break;
        }
    }
    return { tmpView, tmpWin: 0 };
};

var RandomView = function (reels, width, height) {
    var view = [];

    while (true) {
        for (var i = 0; i < width; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < height; j++) {
                var viewPos = i + j * width;
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

var RandomScatterView = function (reels, bpl, nScatters) {
    var view = [];
    while (true) {
        view = RandomView(reels, slotWidth, slotHeight);

        if (NumberOfScatters(view) == 0 && WinFromView(view, bpl) == 0) {
            break;
        }
    }

    var scatterReels = [0, 1, 2, 3, 4];
    Util.shuffle(scatterReels);

    for (var i = 0; i < nScatters; i++) {
        var reelNo = scatterReels[i];
        var pos = reelNo + Util.random(0, slotHeight) * slotWidth;
        view[pos] = scatter;
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
        var freeSpinData = BuyBonusViewCache(reels, bpl, fsLen);

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

var BuyBonusViewCache = function (reels, bpl, fsLen) {
    var freeSpinCacheList = [];
    var moneyCache = {};
    var freeSpinIndex = 1;
    var freeSpinLength = fsLen;
    var gridView = [];
    var gHeight = 3;        //                   
    var gWidth = 3;         //                   
    var vMoneyBag = 40;
    var sReel = [];
    var nCollects = [0, 0, 0, 0];   //         ,          ,          ,              
    var collectLevels = [0, 0, 0, 0];
    var totalMoney = 0;

    while (freeSpinIndex <= freeSpinLength) {
        //3*3       
        gridView = [14, 14, 14, 14, 16, 14, 14, 14, 14];
        moneyCache = DefaultMoneyCache(gHeight * gWidth);
        //                
        moneyCache.table[gBagPos] = "v";
        moneyCache.values[gBagPos] = vMoneyBag;
        //   4   
        sReel = RandomView(reels, 1, 3);

        var moneyCount = Util.random(1, 3); //1          2                   
        var collectCount = 0;

        if (sReel[1] == winSymbol) {
            collectCount = Util.random(1, 3);
        } else {
            collectCount = Util.random(2, 4);
            if (Util.probability(1)) {
                collectCount += 1;
            }
        }

        //            
        var viewMoney = 0;

        for (var i = 0; i < moneyCount; ++i) {
            var value = RandomMoneyFromArr(moneyValueList);
            var pos = GetRandomPosFromView(gridView, fsEmptySymbol);

            gridView[pos] = moneySymbol;
            moneyCache.table[pos] = "v";
            moneyCache.values[pos] = value;
            viewMoney += value;
        }

        if (sReel[1] == winSymbol) {  //                         
            viewMoney += moneyCache.values[gBagPos];
            totalMoney += viewMoney;        //                   
        } else if (sReel[1] == boostSymbol) { //                                 
            vMoneyBag += viewMoney;         //                                                             
        }

        //                  
        for (var i = 0; i < collectCount; ++i) {
            var value = 0;

            if (sReel[1] == winSymbol) {
                if (nCollects[3] < collectLimits[3] - 1 && Util.probability(22)) {
                    value = collectValues[3];
                } else if (nCollects[2] < collectLimits[2] - 1 && Util.probability(34)) {
                    value = collectValues[2];
                } else if (nCollects[1] < collectLimits[1] && Util.probability(56)) {
                    value = collectValues[1];
                } else {
                    value = collectValues[Util.random(0, 4)];
                }
            } else {
                value = collectValues[Util.random(0, 3)];
            }

            var idx = collectValues.indexOf(value);
            var pos = GetRandomPosFromView(gridView, fsEmptySymbol);

            gridView[pos] = collectSymbols[idx];

            if (sReel[1] == winSymbol) {
                ++nCollects[idx];

                if (nCollects[idx] == collectLimits[idx]) {
                    ++collectLevels[idx];
                    nCollects[idx] = 0;
                }
            }
        }
        //            
        if (Util.probability(percentList.respinAddPercent)) {
            var pos = GetRandomPosFromView(gridView, fsEmptySymbol);

            gridView[pos] = extraSymbol;
            ++freeSpinLength;
        }

        var cache = {
            gView: gridView,
            sReel: sReel,
            moneyCache: moneyCache,
        }

        freeSpinCacheList.push(cache);
        freeSpinIndex++;
    }
    //                         
    for (var i = 0; i < collectLevels.length; ++i) {
        totalMoney += collectLevels[i] * collectValues[i];
    }

    return {
        cache: freeSpinCacheList,
        win: totalMoney * bpl,
    };
};

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
        var lineSymbols = Util.symbolsFromLine(view, payLines[lineId]);
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
        //                                               
        if (isWild(lineSymbols[i])) {
            continue;
        }

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

    //                                              -1   ,     lineSymbols                        . 
    for (var i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    return payTable[matchCount][symbol] * bpl;
};

var WinLinesFromView = function (view, bpl) {
    var winLines = [];
    for (var lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        var lineSymbols = Util.symbolsFromLine(view, line);
        var money = WinFromLine(lineSymbols, bpl);
        if (money > 0) {
            winLines.push(
                `${lineId}~${money}~${line.filter(function (item, index) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
};

var MaxMatchSymbolInfo = function (view) {
    var max = 0;
    var symbol = 3;

    for (var k = 0; k < symbolArr.length; ++k) {
        var matchCount = 0;
        //2,3,4             
        for (var i = 1; i < 4; ++i) {
            for (var j = 0; j < slotHeight; ++j) {
                var pos = i + slotWidth * j;

                if (view[pos] == symbolArr[k]) {
                    ++matchCount;
                }
            }
        }

        if (max < matchCount) {
            max = matchCount;
            symbol = symbolArr[k];
        }
    }

    return {
        symbol: symbol,
        count: max
    };
};

var GetSymbolPositions = function (view, symbol, equal) {
    var positions = [];

    for (var j = 0; j < slotHeight; ++j) {
        for (var i = 1; i < 4; ++i) {
            var pos = i + slotWidth * j;

            if (equal && view[pos] == symbol || !equal && view[pos] != symbol) {
                positions.push(pos);
            }
        }
    }

    return positions;
};

var MakeFinalView = function (view, positions) {
    for (var i = 0; i < positions.length; ++i) {
        view[positions[i]] = wild;
    }
};

var GetRandomPosFromView = function (view, symbol) {
    var pos = 0;

    while (true) {
        pos = Util.random(0, view.length);

        if (view[pos] == symbol) {
            break;
        }
    }

    return pos;
};

var DefaultMoneyCache = function (len) {
    var moneyValues = [];
    var moneyTable = [];

    for (var i = 0; i < len; i++) {
        moneyValues[i] = 0;
        moneyTable[i] = "r";
    }

    return {
        values: moneyValues,
        table: moneyTable,
    };
};

var isWild = function (symbol) {
    return symbol == wild;
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

var GetFreeSpinCounts = function (view) {
    var nScatters = NumberOfScatters(view);
    switch (nScatters) {
        case 3: return 10;
        case 4: return 12;
        case 5: return 15;
    }
    return 0;
};

var isMoney = function (symbol) {
    return symbol == moneySymbol;
};

var RandomMoneyFromArr = function (moneyValueList) {
    var value = moneyValueList[0];

    if (Util.probability(percentList.moneyHighPercent)) {
        value = moneyValueList[Util.random(0, moneyValueList.length)];
    } else if (Util.probability(percentList.moneyLowPercent)) {
        value = moneyValueList[Util.random(0, moneyValueList.length / 2)];
    }

    return value;
}
//                               
var MoneyWinFromCache = function (moneyCache, bpl) {
    var win = 0;
    for (var i = 0; i < moneyCache.values.length; i++) {
        win += moneyCache.values[i];
    }
    return win * bpl;
}

module.exports = SlotMachine;