var Util = require("../../../utils/slot_utils");

function SlotMachine() {
    //                 
    this.spinIndex = 0;
    this.currentGame = "BASE";
    this.gameSort = "BASE";
    this.lineCount = 40;
    //                                 
    this.view = [];
    this.prevView = [];//       view
    this.virtualReels = {};
    this.winMoney = 0;
    this.winLines = [];
    //                      
    this.wildArray = [];
    //                      
    this.scatterPositions = [];
    this.scatterWin = 0;
    //                           
    this.freeSpinIndex = 0;
    this.freeSpinMoreIndex = 0;
    this.freeSpinLength = 0;
    this.freeSpinWinMoney = 0;
    this.freeSpinCacheList = [];
    this.freeSpinMoreLength = 0;
    this.freeSpinMore = 0;

    //                      
    this.patternCount = 2000;  //                  
    this.lowLimit = 10;   //                         
    this.prevBalance = 0; //                       (                         )

    this.betPerLine = 0;
    this.totalBet = 0;
    this.jackpotType = ["FREE"];   //FREE, BONUS, TUMBLE

    this.baseWinPercent = 90;
}

const scatter = 1, wild = 2;
const slotWidth = 5, slotHeight = 4;
const baseReels = [
    [12, 10, 6, 12, 13, 8, 11, 10, 8, 5, 11, 5, 3, 3, 4, 11, 9, 8, 6, 11, 13, 8, 4, 5, 3, 4, 12, 9, 9, 6, 9, 4, 13, 7, 8, 1, 12, 12, 10, 10, 1, 4, 7, 11, 7, 6, 13, 10, 12, 3, 10, 13, 13, 8, 10, 9, 3, 5, 13, 12, 4, 7],
    [12, 7, 12, 10, 13, 13, 11, 3, 6, 10, 7, 12, 7, 4, 9, 11, 2, 9, 13, 13, 7, 5, 11, 11, 1, 3, 4, 3, 3, 4, 5, 5, 8, 1, 11, 10, 10, 9, 4, 6, 9, 10, 7, 8, 5, 10, 12, 2, 6, 4, 6, 9, 9, 13, 9, 7, 12, 8, 11, 13, 13, 9, 8, 12, 10, 13, 12, 6, 8, 11, 8, 12, 8, 10, 11, 3],
    [8, 13, 11, 3, 11, 6, 13, 6, 8, 11, 3, 4, 3, 11, 9, 6, 8, 3, 5, 4, 4, 3, 5, 7, 11, 11, 13, 10, 12, 3, 10, 10, 7, 12, 9, 4, 13, 6, 7, 8, 4, 13, 6, 12, 8, 11, 8, 13, 13, 5, 6, 4, 11, 9, 1, 7, 12, 2, 10, 12, 9, 5, 9, 5, 6, 9, 5, 7, 10, 1, 12, 8, 4, 9, 8, 13, 10, 6, 10, 11, 5, 13, 5, 8, 7, 12],
    [7, 5, 10, 7, 11, 10, 11, 9, 4, 8, 2, 7, 10, 8, 13, 7, 10, 4, 3, 9, 1, 2, 6, 3, 3, 5, 6, 4, 3, 3, 7, 13, 11, 3, 11, 5, 10, 6, 4, 9, 8, 9, 13, 13, 12, 8, 11, 13, 7, 10, 12, 5, 1, 4, 12, 12, 6, 10, 12, 11, 13],
    [10, 12, 7, 11, 8, 10, 5, 12, 5, 8, 9, 8, 11, 9, 6, 3, 3, 4, 1, 12, 6, 13, 9, 10, 13, 10, 2, 1, 12, 10, 3, 9, 3, 4, 3, 3, 5, 4, 4, 8, 6, 11, 3, 6, 3, 13, 13, 4, 6, 12, 12, 7, 12, 11, 8, 6, 5, 13, 4, 12, 12, 2, 4]
];
const freeReels = [
    [
        [12, 8, 11, 1, 8, 13, 13, 10, 13, 9, 11, 8, 7, 12, 11, 12, 10, 3, 11, 9, 11, 12, 6, 12, 7, 13, 12, 8, 11, 7, 13, 9, 3, 3, 3, 3, 10, 8, 4, 5, 3, 7, 6, 13, 10, 11, 8, 10, 4, 6, 13, 9, 9, 4, 9, 3, 7, 11, 10, 10, 5, 10, 8, 5, 12, 6, 11, 13, 12],
        [4, 2, 5, 3, 12, 12, 11, 1, 9, 5, 10, 9, 11, 6, 13, 2, 7, 9, 13, 12, 10, 12, 5, 8, 6, 3, 2, 10, 8, 11, 10, 11, 7, 11, 12, 13, 7, 9, 9, 8, 13, 4, 11, 13, 8, 6, 9, 13, 8, 13, 8, 13, 9, 10, 8, 9, 4, 12, 12, 13, 6, 7, 10, 7, 11, 12, 12, 10, 6, 13, 10],
        [3, 11, 12, 13, 11, 3, 8, 9, 12, 7, 6, 5, 11, 9, 6, 3, 9, 10, 11, 12, 1, 13, 2, 10, 10, 2, 8, 6, 9, 5, 8, 5, 7, 10, 13, 5, 10, 9, 12, 5, 13, 4, 8, 7, 13, 8, 4, 11, 7, 8, 7, 9, 6, 9, 11, 8, 7, 13, 10, 4, 12, 6, 13, 11, 6, 11, 9, 12, 12, 13, 10, 5],
        [4, 10, 8, 2, 6, 13, 9, 8, 13, 10, 7, 3, 9, 12, 9, 13, 11, 6, 11, 11, 13, 3, 5, 13, 9, 11, 11, 9, 7, 10, 6, 11, 5, 3, 13, 12, 7, 8, 5, 13, 11, 11, 6, 13, 4, 2, 12, 10, 8, 7, 10, 13, 12, 10, 7, 5, 4, 8, 6, 12, 10, 6, 10, 13, 10, 11, 10, 8, 9, 8, 4, 5, 12, 7, 12, 1, 11],
        [8, 4, 7, 9, 10, 10, 5, 3, 6, 10, 10, 9, 5, 2, 7, 11, 5, 13, 8, 11, 4, 13, 5, 13, 13, 6, 13, 5, 9, 13, 13, 6, 12, 11, 4, 11, 3, 7, 12, 6, 12, 13, 7, 9, 3, 12, 8, 11, 11, 9, 10, 9, 8, 9, 12, 2, 11, 8, 9, 6, 10, 5, 3, 7, 12, 3, 13, 8, 9, 7, 11, 4, 13, 11, 5, 12, 7, 6, 1, 10, 8]
    ],
    [
        [11, 13, 5, 11, 13, 13, 9, 13, 4, 9, 3, 10, 10, 13, 7, 5, 8, 6, 12, 6, 11, 12, 10, 5, 9, 7, 11, 13, 7, 3, 11, 8, 12, 10, 13, 8, 6, 7, 8, 3, 3, 3, 3, 12, 12, 8, 11, 10, 9, 12, 10, 9, 10, 6, 11, 6, 11, 12, 10, 10, 7, 8, 9, 8, 12, 7, 4, 7, 8, 13, 11, 10, 3, 8, 13, 9, 11, 4, 9, 10, 12, 3, 13, 12, 10, 4],
        [12, 7, 11, 11, 8, 9, 8, 9, 8, 9, 10, 13, 8, 11, 3, 9, 5, 8, 4, 10, 8, 13, 12, 9, 4, 6, 9, 8, 7, 13, 10, 7, 11, 10, 6, 13, 13, 5, 13, 12, 10, 8, 9, 7, 13, 2, 12, 11, 4, 6, 8, 9, 2, 13, 12, 12, 4, 11, 13, 13, 8, 4, 2, 13, 6, 8, 12, 10, 13, 11, 11, 7, 10, 7, 13, 6, 13, 5, 6, 10, 9, 10, 10, 9, 11, 2, 12, 11, 3, 10, 5, 7, 5, 10, 12, 10, 12, 11, 12, 13, 7, 11, 12, 13, 12, 12, 11, 9, 8, 3, 10, 13, 12, 12, 9, 9, 8, 9, 7, 13, 10, 11, 8, 4, 11, 4, 10, 7, 12, 11, 12, 9, 11, 13, 4, 13, 9, 12, 3, 9, 2],
        [5, 4, 8, 9, 5, 10, 10, 6, 13, 5, 9, 12, 6, 9, 5, 11, 6, 12, 13, 5, 8, 9, 6, 13, 13, 11, 11, 12, 13, 12, 9, 4, 12, 13, 5, 7, 11, 4, 3, 9, 8, 3, 4, 13, 8, 7, 8, 9, 11, 6, 9, 12, 9, 6, 10, 5, 12, 11, 13, 8, 11, 3, 7, 8, 7, 13, 2, 7, 9, 11, 8, 13, 11, 10, 7, 10, 2, 12, 10, 10, 11, 7, 10],
        [11, 12, 11, 3, 10, 5, 13, 9, 7, 6, 11, 6, 11, 10, 4, 7, 10, 13, 4, 7, 12, 11, 8, 7, 10, 9, 11, 10, 13, 5, 3, 6, 4, 6, 9, 6, 13, 13, 12, 12, 8, 9, 10, 11, 7, 8, 7, 4, 13, 10, 9, 8, 9, 6, 2, 5, 11, 13, 12, 5, 2, 10, 13, 12, 7, 10],
        [7, 4, 11, 10, 4, 11, 10, 5, 9, 10, 10, 12, 5, 13, 5, 11, 9, 3, 9, 5, 6, 9, 12, 12, 10, 3, 2, 2, 3, 7, 8, 12, 6, 7, 6, 4, 10, 5, 13, 11, 8, 11, 8, 7, 8, 13, 12, 4, 11, 13, 6, 13, 9, 6, 13, 8, 13, 12, 11, 11, 6, 13, 7, 3, 8, 9, 4]
    ]
];
const payTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 30, 25, 15, 10, 7, 5, 3, 3, 2, 2, 2],
    [0, 0, 0, 100, 75, 40, 25, 15, 10, 6, 6, 5, 5, 5],
    [0, 0, 0, 400, 250, 150, 100, 75, 50, 30, 30, 20, 20, 20]
];
const payLines = [
    [0, 1, 2, 3, 4], //1
    [15, 16, 17, 18, 19], //2
    [5, 6, 7, 8, 9], //3
    [10, 11, 12, 13, 14], //4
    [0, 6, 12, 8, 4], //5
    [15, 11, 7, 13, 19], //6
    [10, 6, 2, 8, 14], //7
    [5, 11, 17, 13, 9], //8
    [0, 6, 2, 8, 4], //9
    [15, 11, 17, 13, 19], //10
    [5, 1, 7, 3, 9], //11
    [10, 16, 12, 18, 14], //12
    [5, 11, 7, 13, 9], //13
    [10, 6, 12, 8, 14], //14
    [0, 6, 7, 8, 4], //15
    [15, 11, 12, 13, 19], //16
    [5, 1, 2, 3, 9], //17
    [10, 16, 17, 18, 14], //18
    [5, 11, 12, 13, 9], //19
    [10, 6, 7, 8, 14], //20
    [0, 1, 7, 3, 4], //21
    [15, 16, 12, 18, 19], //22
    [5, 6, 2, 8, 9], //23
    [10, 11, 17, 13, 14], //24
    [5, 6, 12, 8, 9], //25
    [10, 11, 7, 13, 14], //26
    [0, 1, 12, 3, 4], //27
    [15, 16, 7, 18, 19], //28
    [10, 11, 2, 13, 14], //29
    [5, 6, 17, 8, 9], //30
    [0, 11, 12, 13, 4], //31
    [15, 6, 7, 8, 19], //32
    [10, 1, 2, 3, 14], //33
    [5, 16, 17, 18, 9], //34
    [5, 1, 12, 3, 9], //35
    [10, 16, 7, 18, 14], //36
    [5, 11, 2, 13, 9], //37
    [10, 6, 17, 8, 14], //38
    [0, 11, 2, 13, 4], //39
    [15, 6, 17, 8, 19], //40
];
const percentList = {
    freeWinPercent: 30,
    lowCountPercent: 50
};

SlotMachine.prototype.Init = function () {
    this.highPercent = 0; //                                0                       ,
    this.normalPercent = 50; //                                 ,                                               ,                                     .
}

SlotMachine.prototype.SpinFromPattern = function (player) {
    this.gameSort = this.currentGame;

    this.totalBet = player.virtualBet;
    this.betPerLine = player.betPerLine;

    this.winMoney = 0;
    this.winLines = [];

    if (this.currentGame == "FREE") {
        this.FreeSpin();
        return;
    }

    const viewCache = player.viewCache;

    if (viewCache.type == "BASE") {
        const cache = viewCache.view;
        this.view = cache.changedView;
        this.prevView = cache.prevView;
        this.wildCache = cache.wilds;
        this.wildCount = cache.wildCount;
    } else if (viewCache.type == "FREE") {
        const cache = viewCache.view;
        this.freeSpinCacheList = cache.viewList;
        this.freeSpinLength = cache.length;
        this.freeReelsNo = cache.reelsNo;
        this.view = this.freeSpinCacheList[0].changedView;
        this.prevView = this.freeSpinCacheList[0].prevView;
        this.wildCount = this.freeSpinCacheList[0].wildCount;
        this.wildCache = this.freeSpinCacheList[0].wilds;
    }
    let stickys = [];
    for (let i = 0; i < this.wildCache.length; i++) {
        if (viewCache.type == "BASE") {
            if (this.wildCache[i] > 4)
                stickys.push(`${this.wildCache[i]},${this.wildCache[i] - 5}`);
            else
                stickys.push(`${this.wildCache[i]},${-1}`);
        } else if (viewCache.type == "FREE") {
            stickys.push(`${this.wildCache[i]},${-1}`);
        }

    }
    this.wildSticky = stickys.join(`~`);
    this.winMoney = WinFromView(this.view, player.betPerLine).money;
    this.winLines = WinLinesFromView(this.view, player.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(baseReels),
        below: RandomLineFromReels(baseReels)
    };

    //                  
    if (isFreeSpinWin(this.view)) {
        this.freeSpinIndex = 1;
        this.freeSpinMoreIndex = 1;
        this.moreLength = 0;
        this.freeSpinMulti = 0;
        this.scatterPositions = ScatterPositions(this.view);
        this.scatterWin = ScatterWinFromView(this.view, player.virtualBet);
        this.winMoney += this.scatterWin;
        this.freeSpinWinMoney = this.winMoney;
        this.currentGame = "FREE";
    }
};

SlotMachine.prototype.FreeSpin = function () {
    this.view = this.freeSpinCacheList[this.freeSpinMoreIndex].changedView;
    this.prevView = this.freeSpinCacheList[this.freeSpinMoreIndex].prevView;
    this.wildCount = this.freeSpinCacheList[this.freeSpinMoreIndex].wildCount;
    this.wildCache = this.freeSpinCacheList[this.freeSpinMoreIndex].wilds;

    let moreLength = 0;
    if (isFreeSpinWin(this.view)) {
        this.freeSpinMore = 5;
        this.freeSpinLength += this.freeSpinMore;
        this.freeSpinMulti = 0;
        this.freeSpinIndex++;
    } else {
        if (this.wildCache.length > 0) {
            if (this.freeSpinMoreIndex > 1) {
                this.wildPrevCache = this.freeSpinCacheList[this.freeSpinMoreIndex - 1].wilds;
                if (this.wildPrevCache.length > 0) {
                    moreLength = 1;
                } else {
                    this.freeSpinMulti = 0;
                    this.freeSpinIndex++;
                }
            } else {
                this.freeSpinIndex++;
            }
            this.moreLength++;
            this.freeSpinMulti++;
        } else if (this.freeSpinMoreIndex > 1) {
            this.wildPrevCache = this.freeSpinCacheList[this.freeSpinMoreIndex - 1].wilds;
            if (this.wildPrevCache.length > 0) {
                moreLength = 1;
                this.freeSpinMulti++;
            } else {
                this.freeSpinMulti = 0;
                this.freeSpinIndex++;
            }
        } else {
            this.freeSpinIndex++;
        }
    }

    this.freeSpinMoreLength = moreLength;
    let stickys = [];
    for (let i = 0; i < this.wildCache.length; i++) {
        if (this.wildCache[i] > 4)
            stickys.push(`${this.wildCache[i]},${this.wildCache[i] - 5}`);
        else
            stickys.push(`${this.wildCache[i]},${-1}`);
    }
    this.wildSticky = stickys.join(`~`);
    //is api      
    if (this.freeSpinMulti > 0)
        this.winMoney = WinFromView(this.view, this.betPerLine).money * this.freeSpinMulti;
    else
        this.winMoney = WinFromView(this.view, this.betPerLine).money;
    this.winLines = WinLinesFromView(this.view, this.betPerLine);

    this.virtualReels = {
        above: RandomLineFromReels(freeReels[this.freeReelsNo]),
        below: RandomLineFromReels(freeReels[this.freeReelsNo])
    };

    this.freeSpinWinMoney += this.winMoney;
    this.freeSpinMoreIndex++;
    if (this.freeSpinMoreIndex > this.freeSpinLength + this.moreLength) {
        this.currentGame = "BASE";
    }
};

SlotMachine.prototype.SpinForBaseGen = function (bpl, totalBet, baseWin) {

    var tmpView, tmpWin;
    if (baseWin > 0) {
        tmpView = RandomWinView(baseReels, bpl, baseWin, this.wildArray);
    } else {
        tmpView = RandomZeroView(baseReels, bpl, this.wildArray);
    }
    this.wildArray = tmpView.wilds;
    tmpWin = WinFromView(tmpView.changedView, bpl);
    tmpView.wildCount = tmpWin.wildCount;
    var pattern = {
        view: tmpView,
        win: tmpWin.money,
        type: "BASE",
        bpl: bpl
    };
    return pattern;
};

SlotMachine.prototype.SpinForJackpot = function (bpl, totalBet, fsWin, isCall = false, jpType) {
    let newJpType = jpType;
    if (jpType === "RANDOM") {
        newJpType = this.jackpotType[Util.random(0, this.jackpotType.length)];
    }
    switch (newJpType) {
        case "FREE":
            return this.SpinForFreeGen(bpl, totalBet, fsWin, isCall);
    }
}

SlotMachine.prototype.SpinForFreeGen = function (bpl, totalBet, fsWin, isCall = false) {
    let scatterView = RandomScatterView(baseReels, bpl, totalBet, this.wildArray);
    scatterView.wildCount = WinFromView(scatterView.changedView, bpl).wildCount;
    this.wildArray = [];
    let scatterWinMoney = ScatterWinFromView(scatterView.changedView, totalBet) + WinFromView(scatterView.changedView, bpl).money;
    let fslenInfo = FreeSpinCounts(scatterView.changedView);

    let freeSpinData = {
        length: fslenInfo,
        reelsNo: Util.random(0, 2),
        viewList: []
    }

    let cache = RandomFreeViewCache(freeReels[freeSpinData.reelsNo], bpl, fsWin, freeSpinData.length);

    freeSpinData.viewList.push(scatterView);
    freeSpinData.viewList = freeSpinData.viewList.concat(cache.viewList);

    return {
        win: cache.win + scatterWinMoney,
        bpl: bpl,
        view: freeSpinData,
        type: "FREE",
        isCall: isCall ? 1 : 0
    }
};

var RandomWinView = function (reels, bpl, maxWin, wilds) {
    var tmpView, tmpWin;
    var bottomLimit = 0;
    var calcCount = 0;

    while (true) {
        tmpView = RandomView(reels, wilds);
        tmpWin = WinFromView(tmpView.changedView, bpl);
        if (tmpWin.money > bottomLimit && tmpWin.money <= maxWin) {
            break;
        }
        calcCount++;
        if (calcCount > 100) {
            bottomLimit = -1;
        }
    }
    return tmpView;
};

var RandomZeroView = function (reels, bpl, wilds) {
    var tmpView, tmpWin;

    while (true) {
        tmpView = RandomView(reels, wilds);
        tmpWin = WinFromView(tmpView.changedView, bpl);
        if (tmpWin.money == 0) {
            break;
        }
    }
    return tmpView
};

var RandomView = function (reels, wilds) {
    let view = {};
    view.changedView = [];
    view.prevView = [];
    view.wilds = [];
    while (true) {
        let wildsCount = 0;
        for (let i = 0; i < slotWidth; i++) {
            const len = reels[i].length;
            const randomIndex = Util.random(0, len);
            for (let j = 0; j < slotHeight; j++) {
                const viewPos = i + j * slotWidth;
                const reelPos = (randomIndex + j) % len;
                view.prevView[viewPos] = reels[i][reelPos];
            }
        }

        view.changedView = [...view.prevView];
        for (let i = 0; i < wilds.length; i++) {
            let index = wilds[i] - 5;
            if (index > -1) {
                view.changedView[index] = wild;
            }
        }
        for (let i = 0; i < view.changedView.length; i++) {
            if (isWild(view.changedView[i])) {
                wildsCount++;
            }
        }
        if (!isFreeSpinWin(view.changedView) && wildsCount < 2) {
            break;
        }
    }
    for (let i = 0; i < view.changedView.length; i++) {
        if (isWild(view.changedView[i])) {
            view.wilds.push(i);
        }
    }

    return view;
};

var RandomScatterView = function (reels, bpl, totalBet, wilds) {
    let view = {};
    view.changedView = [];
    view.prevView = [];
    view.wilds = [];
    while (true) {
        for (var i = 0; i < slotWidth; i++) {
            var len = reels[i].length;
            var randomIndex = Util.random(0, len);
            for (var j = 0; j < slotHeight; j++) {
                var viewPos = i + j * slotWidth;
                var reelPos = (randomIndex + j) % len;
                view.prevView[viewPos] = reels[i][reelPos];
            }
        }
        view.changedView = [...view.prevView];
        for (let i = 0; i < wilds.length; i++) {
            let index = wilds[i] - 5;
            if (index > -1) {
                view.changedView[index] = wild;
            }
        }

        if (isFreeSpinWin(view.changedView) && WinFromView(view.changedView, bpl).money < totalBet * 3) {
            break;
        }
    }
    for (let i = 0; i < view.changedView.length; i++) {
        if (isWild(view.changedView[i])) {
            view.wilds.push(i);
        }
    }
    return view;
}

var RandomFreeViewCache = function (reels, bpl, fsWin, fslen) {

    let minMoney = fsWin * 0.8;
    let maxMoney = fsWin;

    minMoney = Util.max(minMoney, 0);
    maxMoney = Util.max(maxMoney, 0);

    let lowerLimit = -1,
        upperLimit = 100000000000000;
    let lowerView = null,
        upperView = null;

    for (let patternIndex = 0; patternIndex < 200; patternIndex++) {

        //                                     
        let freeSpinCache = {};
        //                    
        while (true) {
            freeSpinCache.viewList = [];
            let wildsLimit = 0;
            let freeSpinIndex = 1;
            let wilds = [];
            let freeSpinMulti = 0
            let freeSpinLength = fslen;
            let freeSpinWinMoney = 0;
            while (true) {
                //                
                let fsview;
                let wildsPrev = [];
                while (true) {
                    fsview = RandomFreeView(reels, wilds);
                    const win = WinFromView(fsview.changedView, bpl).money;
                    if (Util.probability(percentList.freeWinPercent) || win == 0) {
                        break;
                    }
                }
                wilds = fsview.wilds;
                fsview.wildCount = WinFromView(fsview.changedView, bpl).wildCount;
                freeSpinCache.viewList.push(fsview);

                if (wilds.length > 0) {
                    if (freeSpinIndex > 1) {
                        wildsPrev = freeSpinCache.viewList[freeSpinIndex - 2].wilds;
                        if (wildsPrev.length == 0) {
                            freeSpinMulti = 0;
                        }
                    }
                    freeSpinMulti++;
                } else if (freeSpinIndex > 1) {
                    wildsPrev = freeSpinCache.viewList[freeSpinIndex - 2].wilds;
                    if (wildsPrev.length > 0) {
                        freeSpinMulti++;
                    } else {
                        freeSpinMulti = 0;
                    }
                }
                let winMoney = 0;
                if (freeSpinMulti > 0)
                    winMoney = WinFromView(fsview.changedView, bpl).money * freeSpinMulti;
                else
                    winMoney = WinFromView(fsview.changedView, bpl).money;
                freeSpinWinMoney += winMoney;
                if (isFreeSpinWin(fsview)) {
                    freeSpinLength += 5;
                } else if (wilds.length > 0) {
                    freeSpinLength++;
                }
                freeSpinIndex++;
                if (freeSpinIndex > freeSpinLength) {
                    freeSpinCache.win = freeSpinWinMoney;
                    break;
                }
            }
            for (let i = 0; i < freeSpinCache.viewList.length; i++) {
                for (let j = 0; j < freeSpinCache.viewList[i].changedView.length; j++) {
                    if (isWild(freeSpinCache.viewList[i].changedView[j])) {
                        wildsLimit++;
                    }
                }
            }
            if (wildsLimit < 30) {
                break;
            }
        }

        if (freeSpinCache.win >= minMoney && freeSpinCache.win <= maxMoney) {
            return freeSpinCache;
        }

        if (freeSpinCache.win > lowerLimit && freeSpinCache.win < minMoney) {
            lowerLimit = freeSpinCache.win;
            lowerView = freeSpinCache;
        }
        if (freeSpinCache.win > maxMoney && freeSpinCache.win < upperLimit) {
            upperLimit = freeSpinCache.win;
            upperView = freeSpinCache;
        }

    }

    return lowerView ? lowerView : upperView;
}

var RandomFreeView = function (reels, wilds) {
    let view = {};
    view.changedView = [];
    view.prevView = [];
    view.wilds = [];
    for (let i = 0; i < slotWidth; i++) {
        const len = reels[i].length;
        const randomIndex = Util.random(0, len);
        for (let j = 0; j < slotHeight; j++) {
            const viewPos = i + j * slotWidth;
            const reelPos = (randomIndex + j) % len;
            view.prevView[viewPos] = reels[i][reelPos];
        }
    }
    view.changedView = [...view.prevView];
    for (let i = 0; i < wilds.length; i++) {
        let index = wilds[i] - 5;
        if (index > -1) {
            view.changedView[index] = wild;
        }
    }

    for (let i = 0; i < view.changedView.length; i++) {
        if (isWild(view.changedView[i])) {
            view.wilds.push(i);
        }
    }

    return view;
};

var RandomLineFromReels = function (reels) {
    const result = [];

    for (var i = 0; i < slotWidth; i++) {
        var index = Util.random(0, reels[i].length);
        result[i] = reels[i][index];
    }

    return result;
};

var WinFromView = function (view, bpl) {
    let winFromView = {};
    winFromView.money = 0;
    winFromView.wildCount = [];
    for (let lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        let lineSymbols = Util.symbolsFromLine(view, line);
        let linePay = WinFromLine(lineSymbols, bpl);
        winFromView.money += linePay.winPay;
        winFromView.wildCount.push(linePay.wildCount);
    }
    return winFromView;
}

var WinLinesFromView = function (view, bpl) {
    const winLines = [];

    for (let lineId = 0; lineId < payLines.length; lineId++) {
        var line = payLines[lineId];
        let lineSymbols = Util.symbolsFromLine(view, line);
        let winsFromLine = WinFromLine(lineSymbols, bpl);
        if (winsFromLine.winPay > 0) {
            winLines.push(
                `${lineId}~${winsFromLine.winPay}~${line.filter(function (item, index, arr) {
                    return lineSymbols[index] != -1
                }).join('~')}`);
        }
    }
    return winLines;
}

var WinFromLine = function (lineSymbols, bpl) {
    let matchCount = 0;
    let wildIndex = [];
    let wins = {};
    let wildCount = 0;
    let symbol = wild;

    for (let i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            continue;
        }
        symbol = lineSymbols[i];
        break;
    }

    for (let i = 0; i < lineSymbols.length; i++) {
        if (isWild(lineSymbols[i])) {
            wildIndex.push(i);
            lineSymbols[i] = symbol;
        }
    }

    for (let i = 0; i < lineSymbols.length; i++) {
        if (lineSymbols[i] != symbol) break;
        matchCount++;
    }

    for (let i = 0; i < wildIndex.length; i++) {
        if (wildIndex[i] < matchCount)
            wildCount++;
    }

    for (let i = matchCount; i < lineSymbols.length; i++) {
        lineSymbols[i] = -1;
    }

    wins.winPay = payTable[matchCount][symbol] * bpl * Math.pow(2, wildCount);
    wins.wildCount = wildCount;
    return wins;
}

var isWild = function (symbol) {
    return symbol == wild;
}

var isScatter = function (symbol) {
    return symbol == scatter;
}

var isFreeSpinWin = function (view) {
    return NumberOfScatters(view) >= 3;
}

var FreeSpinCounts = function (view) {
    switch (NumberOfScatters(view)) {
        case 3:
            return 6;
        case 4:
            return 9;
        case 5:
            return 12;
    }
}

var NumberOfScatters = function (view) {
    let result = 0;
    for (let i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result++;
        }
    }
    return result;
}

var ScatterWinFromView = function (view, totalBet) {
    if (isFreeSpinWin(view)) {
        switch (NumberOfScatters(view)) {
            case 3:
                return totalBet * 2;
            case 4:
                return totalBet * 15;
            case 5:
                return totalBet * 100;
        }
    }
    return 0;
};

var ScatterPositions = function (view) {
    let result = [];
    for (let i = 0; i < view.length; i++) {
        if (isScatter(view[i])) {
            result.push(i);
        }
    }
    return result;
}

module.exports = SlotMachine;