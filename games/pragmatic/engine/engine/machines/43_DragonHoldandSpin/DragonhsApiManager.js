var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bonuses: "0",
        c: "400.00",
        cfgs: "4951",
        counter: "2",
        def_s: "9,10,3,7,5,7,10,6,3,9,5,4,6,9,7",
        def_sa: "8,10,3,10,5",
        def_sb: "8,7,6,10,10",
        defc: "400.00",
        fsbonus: "",
        gameInfo: `{rtps:{regular:"94.64"},props:{max_rnd_sim:"1",max_rnd_hr:"2000000",max_rnd_win:"20000"}}`,
        gmb: "0,0,0",
        index: "1",
        l: "5",
        mo_s: "13;14;15",
        mo_v: "5,10,15,20,25,30,35,40,45;50,55,60,65,70,75,80,85,90,95,100;500,1000,1500,2000,2500,5000",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;5000,1000,100,0,0;500,200,50,0,0;200,50,20,0,0;200,50,20,0,0;200,50,20,0,0;50,10,2,0,0;50,10,2,1,0;50,10,2,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        reel_set_size: 3,
        reel_set: 0,
        reel_set0: "6,9,9,9,9,8,7,7,7,10,3,10,10,10,5,13,7,1,3,3,3,4,6,6,6,8,8,8,13,13,13,8,14,9,4,9,10,3,10,3,9,10,3,1,3,5,3,4,7,4,3,9,4,9,3,10,13,9,3,9,3,7,8,9,3,4,10,4,14,4,3,8,4,9,4,7,3,10,3,9,10,15,4,3,8,3,8,3,10,4,9,3,4,3,1,9,3,10,9,3,10,3,10,7,9,8,10,8,9,3,10,9,8,3,7,10,7,9~10,7,7,7,7,6,8,13,13,14,9,5,5,5,3,1,10,10,10,13,8,8,8,5,4,9,9,9,5,7,5,4,9,3,8,3,9,5,13,3,9,4,7,8,13,6,9,8,3,7,5,6,13,7,9,13,7,14,9,5,7,9,6,7,4,3,9,3,5,3,8,3,15,6,5,8,13,6,7,9,13,8,13,9,5,13,3,9,13,8,7,5,4,7,3,8,9,13,4,13,8,9,8,5,9,5,3,4,13,3,9,13,5,13,8,7,5,3,13,3,9,5,8,9,13,9,5,13,8,13~8,8,8,4,8,10,9,4,4,4,13,6,6,6,6,7,10,10,10,1,7,7,7,3,5,9,9,9,3,3,3,15,13,14,4,9~7,9,8,7,7,7,3,5,4,9,9,9,1,5,5,5,13,6,3,3,3,10,8,8,8,10,10,10,15,13,13,10,9,10,5,9,3,4,9,10,13,9,13,4,14,5,10,9,13,3,5,4,9,5,10,9,3,10,9,5,1,10,9,13,9,5,10,5,3,9,3,13,4,3,10,1,8,13,9,5,8,5,13,9,10,8,9,10,13,10,3,4,13,9,10,5,9,8,10,14,1,3,10,9,3,8,9,13,10,9,13,4,5~5,8,6,10,10,10,14,5,5,5,4,9,13,13,13,7,3,4,4,4,10,1,8,8,8,6,6,6,10,13,10,4,1,6,10,4,8,10,6,4,10,6,7,15,10,4",
        reel_set1: "6,6,6,1,5,3,9,8,7,4,6,3,5,10,4,9,7,9,5,4~9,3,10,10,10,6,8,1,6,4,8,8,8,10,7,5,6,3,9,8,10,8,7,10,1,5,3,10,3,10~6,6,6,1,8,8,8,8,4,7,10,9,5,10,9,6,7,10,3,8,9,7,3,8,5,6,8,9,8,5,8,9,4,8,1,9,3,5,8,1,9,4,9,10,5,8,7,5,8~10,5,9,6,8,8,8,8,5,1,3,8,9,7,10,4,8,1,8,3,5,8,4,6~10,3,7,5,1,8,3,9,8,8,8,5,4,6,10,7,1,6,8,3,5,8,5,8,6,4,5,1,8,1,3,4,3,6,8,1,3,8,6,4,1,7,1,9,5,4,8,6,3,4",
        reel_set2: "12,12,12,12,12,15,13,13,12,13,13,13,12,13,12,12,14~12,12,13,12,12,12,12,12,13,12,12,12,13,12,13,13,13,14,15,12,12,12,13,13,13,12,12,13,12,13,13,12,14,15,14,12~13,13,12,15,12,12,12,12,13,13,12,14,13,13,13,12,12,13,12,14,12,12~12,12,12,12,12,13,14,12,12,13,12,12,13,13,13,13,12,12,15~15,12,13,12,13,15,12,12,12,12,12,12,13,13,12,12,13,12,13,12,13,14,12,13,13,13,12,13,14,12,13,14,12,12,12,12,12,12",
        rt: "d",
        s: "9,10,3,7,5,7,10,6,3,9,5,4,6,9,7",
        sa: "8,10,3,10,5",
        sb: "8,7,6,10,10",
        sc: "40.00,50.00,80.00,100.00,150.00,250.00,200.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,5000.00,10000.00,15000.00,20000.00,25000.00,30000.00,35000.00,40000.00,50000.00",
        scatters: "1~100,20,1,0,0~0,0,0,0,0~1,1,1,1,1",
        sh: "3",
        stime: "1629939208592",
        sver: "5",
        ver: "2",
        wilds: "2~5000,1000,100,0,0~1,1,1,1,1",
        wl_i: "tbm~20000",
    };

    //              api            
    if (player.lastPattern) {
        for (var key in player.lastPattern) {
            result[key] = player.lastPattern[key];
        }
    }

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["stime"] = new Date().getTime();

    if (player.betPerLine > 0) {
        result["c"] = player.betPerLine;
        result["defc"] = player.betPerLine;
    }

    return result;
};

ApiManager.prototype.GameApi = function (player, prevGameMode, param) {
    var result = {
        balance_bonus: "0",
        balance_cash: "2,003,061.00",
        balance: "2,003,061.00",
        c: player.betPerLine,
        counter: 1,
        index: 1,
        l: 5,
        na: "s",
        reel_set: 0,
        s: "6,8,8,5,7,6,8,8,6,10,8,9,10,7,10",
        sa: "5,8,10,5,9",
        sb: "10,9,8,13,10",
        sh: 3,
        stime: new Date().getTime(),
        sver: 5,
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);
    result["s"] = Util.view2String(player.machine.view);

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
    }

    if (player.machine.changePositions.length > 0) {
        result["reel_set"] = 1;
        result["s"] = Util.view2String(player.machine.changeView);
        result["is"] = Util.view2String(player.machine.view);

        var changes = [],
            symbols = [];
        for (var j = 0; j < player.machine.changePositions.length; j++) {
            var pos = player.machine.changePositions[j];
            var symbol = player.machine.view[pos];
            if (symbols.indexOf(symbol) < 0) {
                symbols.push(symbol);
            }
        }
        for (var k = 0; k < symbols.length; k++) {
            var symbolPositions = [];
            for (var j = 0; j < player.machine.changePositions.length; j++) {
                var pos = player.machine.changePositions[j];
                if (player.machine.view[pos] == symbols[k]) {
                    symbolPositions.push(pos);
                }
            }
            changes.push(`${symbols[k]}~2~${symbolPositions.join(",")}`);
        }

        result["srf"] = changes.join(";");
    }

    if (player.machine.moneyCache != null) {
        result["mo"] = player.machine.moneyCache.values;
        result["mo_t"] = player.machine.moneyCache.table;
    }

    if (prevGameMode == "BASE") {
        //                                                
        if (player.machine.currentGame == "BONUS") {
            result["na"] = "s";
            result["reel_set"] = 2;
            result["s"] = Util.view2String(player.machine.moneyCacheList[0].view);
            result["is"] = Util.view2String(player.machine.view);
            result["pw"] = player.machine.moneyBonusWin - player.machine.moneyBonusBeforeMoney;
            result["srf"] = player.machine.moneyBonusStr;
            result["rs_c"] = 1;
            result["rs_m"] = 4;
            result["rs_p"] = 0;
            result["rs"] = "mc";
            result["tw"] = player.machine.moneyBonusBeforeMoney;
            result["w"] = player.machine.moneyBonusBeforeMoney;

            var view = player.machine.view;
            var moneyPosStr = [];
            for (var i = 0; i < view.length; i++) {
                if (view[i] == 11) {
                    moneyPosStr.push(`${i},${i}`);
                }
            }
            result["sty"] = moneyPosStr.join("~");
        }
    } else if (prevGameMode == "BONUS") {
        result["reel_set"] = 2;
        result["pw"] = player.machine.moneyBonusWin - player.machine.moneyBonusBeforeMoney;

        var prevIndex = player.machine.moneyCacheIndex - 1;
        var cache = player.machine.moneyCacheList[prevIndex];
        result["s"] = Util.view2String(cache.view);
        result["mo_t"] = cache.cache.table.join();
        result["mo"] = cache.cache.values.join();

        if (player.machine.currentGame == "BONUS") {
            result["na"] = "s";
            result["rs_c"] = cache.respinCount;
            result["rs_m"] = 4;
            result["rs_p"] = player.machine.moneyCacheIndex;
            if (cache.respinCount == 1) {
                result["rs"] = "mc";
            }
            result["tw"] = player.machine.moneyBonusBeforeMoney;
            result["w"] = 0;

            var view = player.machine.view;
            var moneyPosStr = [];
            for (var i = 0; i < view.length; i++) {
                if (view[i] == 13 || view[i] == 14 || view[i] == 15) {
                    moneyPosStr.push(`${i},${i}`);
                }
            }
            result["sty"] = moneyPosStr.join("~");
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["pw"] = 0;
            result["rs_t"] = player.machine.moneyCacheIndex;
            result["mo_c"] = 1;
            result["mo_tw"] = player.machine.moneyBonusWin - player.machine.moneyBonusBeforeMoney;
            result["mo_tv"] = (player.machine.moneyBonusWin - player.machine.moneyBonusBeforeMoney) / player.betPerLine;
            result["tw"] = player.machine.moneyBonusWin;
            result["w"] = player.machine.moneyBonusWin - player.machine.moneyBonusBeforeMoney;

            var view = player.machine.view;
            var moneyPosStr = [];
            for (var i = 0; i < view.length; i++) {
                if (view[i] == 13 || view[i] == 14 || view[i] == 15) {
                    moneyPosStr.push(`${i},-1`);
                }
            }
            result["sty"] = moneyPosStr.join("~");
        } else if (player.machine.currentGame == "BonusEnd") {
            result["na"] = "b";
            result["pw"] = 0;
            result["bw"] = 1;
            result["mo_c"] = 1;
            result["mo_tw"] = player.machine.moneyBonusWin - player.machine.moneyBonusBeforeMoney;
            result["mo_tv"] = (player.machine.moneyBonusWin - player.machine.moneyBonusBeforeMoney) / player.betPerLine;
            result["tw"] = player.machine.moneyBonusWin;
            result["w"] = player.machine.moneyBonusWin - player.machine.moneyBonusBeforeMoney;

            var view = player.machine.view;
            var moneyPosStr = [];
            for (var i = 0; i < view.length; i++) {
                if (view[i] == 13 || view[i] == 14 || view[i] == 15) {
                    moneyPosStr.push(`${i},-1`);
                }
            }
            result["sty"] = moneyPosStr.join("~");
        }
    }

    return result;
};

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        bmw: "0",
        bgid: "0",
        balance: "1,340,260.00",
        coef: "200",
        level: "0",
        index: "53",
        balance_cash: "1,340,260.00",
        balance_bonus: "0.00",
        na: "b",
        rw: "0",
        stime: new Date().getTime(),
        bgt: "50",
        lifes: "1",
        wp: "0",
        end: "0",
        sver: "5",
        g: '{nwi:{whm:"w,w,w,w,w,w,w,w,w,w",whw:"20,10,30,20,10,70,20,10,30,70"}}',
        counter: "106",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["counter"] = ++param.counter;
    result["index"] = param.index;

    if (player.machine.gameSort == "BonusEnd") {
        result["bgid"] = 0;
        result["bgt"] = 50;
        result["bmw"] = 0;
        result["coef"] = player.virtualBet;
        result["level"] = 0;
        result["lifes"] = 1;
        result["wp"] = 0;
        result["rw"] = 0;
        result["end"] = 0;
    } else if (player.machine.gameSort == "BigMoneyBonus") {
        result["bgid"] = 0;
        result["bgt"] = 50;
        result["bmw"] = 0;
        result["coef"] = player.virtualBet;
        result["level"] = player.machine.bigMoneyIndex;
        result["lifes"] = 1;
        result["wp"] = player.machine.bigMoneyWin / player.virtualBet;
        result["rw"] = player.machine.bigMoneyWin;
        result["end"] = 0;

        var cache = player.machine.bigMoneyCache;
        result["whi"] = cache.wheelIndex;
        result["whm"] = cache.wheelMark;
        result["whw"] = cache.wheels;

        if (player.machine.currentGame == "BASE") {
            result["na"] = "cb";
            result["lifes"] = 0;
            result["rw"] = player.machine.bigMoneyWin;
            result["tw"] = player.machine.moneyBonusWin;
            result["g"] = `{nwi:{whm:"go",whw:"0"}}`;
            result["end"] = 1;
        } else {
            var nextCache = player.machine.bigMoneyCacheList[player.machine.bigMoneyIndex];
            result["g"] = `{nwi:{whm:"${nextCache.wheelMark.join()}",whw:"${nextCache.wheels.join()}"}}`;
        }
    }

    return result;
};

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    if (player.machine.gameSort == "BONUS") {
        result["rw"] = player.machine.moneyBonusWin;
        result["coef"] = player.betPerLine;
        result["wp"] = 0;
    }

    return result;
};

module.exports = ApiManager;