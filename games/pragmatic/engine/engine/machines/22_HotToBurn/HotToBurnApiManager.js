var Util = require("../../../utils/slot_utils");

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bonuses: "0",
        bonusInit: `[{bgid:1,bgt:51,mo_s:"13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15",mo_v:"20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,2000,4000,6000,8000,10000,20000"}]`,
        c: "100.00",
        cfgs: "4163",
        counter: "2",
        def_s: "5,8,7,9,8,8,7,3,4,4,11,6,8,11,10",
        def_sa: "7,4,4,4,11",
        def_sb: "11,13,3,3,3",
        defc: "100.00",
        fsbonus: "",
        gameInfo: `{props:{max_rnd_sim:"1",max_rnd_hr:"2000000",max_rnd_win:"20000"}}`,
        gmb: "0,0,0",
        index: "1",
        l: "20",
        mo_s: "11",
        mo_v: "20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,2000,4000,6000,8000,10000,20000",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;5000,1000,100,0,0;500,200,50,0,0;200,50,20,0,0;200,50,20,0,0;200,50,20,0,0;50,10,2,0,0;50,10,2,1,0;50,10,2,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        reel_set_size: 2,
        reel_set: 0,
        reel_set0: "6,9,9,9,9,8,7,7,7,10,3,10,10,10,5,11,7,1,3,3,3,4,6,6,6,8,8,8,11,11,11,8,11,9,4,9,10,3,10,3,9,10,3,1,3,5,3,4,7,4,3,9,4,9,3,10,11,9,3,9,3,7,8,9,3,4,10,4,11,4,3,8,4,9,4,7,3,10,3,9,10,11,4,3,8,3,8,3,10,4,9,3,4,3,1,9,3,10,9,3,10,3,10,7,9,8,10,8,9,3,10,9,8,3,7,10,7,9~10,7,7,7,7,6,8,11,11,11,9,5,5,5,3,1,10,10,10,11,8,8,8,5,4,9,9,9,5,7,5,4,9,3,8,3,9,5,11,3,9,4,7,8,11,6,9,8,3,7,5,6,11,7,9,11,7,11,9,5,7,9,6,7,4,3,9,3,5,3,8,3,11,6,5,8,11,6,7,9,11,8,11,9,5,11,3,9,11,8,7,5,4,7,3,8,9,11,4,11,8,9,8,5,9,5,3,4,11,3,9,11,5,11,8,7,5,3,11,3,9,5,8,9,11,9,5,11,8,11~8,8,8,4,8,10,9,4,4,4,11,6,6,6,6,7,10,10,10,1,7,7,7,3,5,9,9,9,3,3,3,11,11,11,4,9~7,9,8,7,7,7,3,5,4,9,9,9,1,5,5,5,11,6,3,3,3,10,8,8,8,10,10,10,11,11,11,10,9,10,5,9,3,4,9,10,11,9,11,4,11,5,10,9,11,3,5,4,9,5,10,9,3,10,9,5,1,10,9,11,9,5,10,5,3,9,3,11,4,3,10,1,8,11,9,5,8,5,11,9,10,8,9,10,11,10,3,4,11,9,10,5,9,8,10,11,1,3,10,9,3,8,9,11,10,9,11,4,5~5,8,6,10,10,10,11,5,5,5,4,9,11,11,11,7,3,4,4,4,10,1,8,8,8,6,6,6,10,11,10,4,1,6,10,4,8,10,6,4,10,6,7,11,10,4",
        reel_set1: "6,6,6,1,5,3,9,8,7,4,6,3,5,10,4,9,7,9,5,4~9,3,10,10,10,6,8,1,6,4,8,8,8,10,7,5,6,3,9,8,10,8,7,10,1,5,3,10,3,10~6,6,6,1,8,8,8,8,4,7,10,9,5,10,9,6,7,10,3,8,9,7,3,8,5,6,8,9,8,5,8,9,4,8,1,9,3,5,8,1,9,4,9,10,5,8,7,5,8~10,5,9,6,8,8,8,8,5,1,3,8,9,7,10,4,8,1,8,3,5,8,4,6~10,3,7,5,1,8,3,9,8,8,8,5,4,6,10,7,1,6,8,3,5,8,5,8,6,4,5,1,8,1,3,4,3,6,8,1,3,8,6,4,1,7,1,9,5,4,8,6,3,4",
        rt: "d",
        rtp: "96.06",
        s: "9,10,3,7,5,7,10,6,3,9,5,4,6,9,7",
        sa: "7,4,4,4,11",
        sb: "11,13,3,3,3",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,9000.00,10000.00,12000.00",
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
        tw: player.machine.winMoney,
        balance: 0,
        index: 1,
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        reel_set: 0,
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 3,
        sver: 5,
        c: player.betPerLine,
        counter: 1,
        l: 20, // ----------------                                 
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);
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
            changes.push(`${symbols[k]}~2~${symbolPositions.join()}`);
        }

        result["srf"] = changes.join(";");
    }

    if (player.machine.moneyCache != null) {
        result["mo"] = player.machine.moneyCache.values;
        result["mo_t"] = player.machine.moneyCache.table;
    }

    //                                                
    if (player.machine.currentGame == "BONUS") {
        result["na"] = "b";
        result["bgid"] = 1;
        result["bgt"] = 51;
        result["bw"] = 1;
        result["lifes"] = 4;
        result["end"] = 0;
        result["s"] = Util.view2String(player.machine.moneyCacheList[0].view);
        result["is"] = Util.view2String(player.machine.view);
        result["rw"] = player.machine.moneyBonusWin;
        result["bpw"] = player.machine.moneyBonusWin;
        result["wp"] = player.machine.moneyBonusWin / player.betPerLine;
        result["srf"] = player.machine.moneyBonusStr;
        result["w"] = 0;
        result["tw"] = 0;
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
        counter: "2"
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
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        bgid: "1",
        bgt: "51",
        bpw: "32.00",
        coef: "1",
        counter: "1",
        end: "0",
        index: "1",
        lifes: "4",
        na: "b",
        rw: "32.00",
        s: "",
        stime: new Date().getTime(),
        sver: "5",
        wp: "320",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["counter"] = ++param.counter;
    result["index"] = param.index;

    if (player.machine.gameSort == "BONUS") {
        result["bgid"] = 1;
        result["bgt"] = 51;
        result["coef"] = player.betPerLine;
        result["rw"] = player.machine.moneyBonusWin;
        result["wp"] = player.machine.moneyBonusWin / player.betPerLine;
        result["end"] = 0;

        var prevIndex = player.machine.moneyCacheIndex - 1;
        var cache = player.machine.moneyCacheList[prevIndex];
        result["s"] = Util.view2String(cache.view);
        result["mo_t"] = cache.cache.table.join();
        result["mo"] = cache.cache.values.join();
        result["lifes"] = cache.lifes;

        if (player.machine.currentGame == "BASE") {
            //                    
            result["na"] = "cb";
            result["tw"] = player.machine.moneyBonusWin;
            result["end"] = 1;
        } else if (player.machine.currentGame == "BonusEnd") {
            result["tw"] = player.machine.moneyBonusWin;
            result["end"] = 1;
        } else {
            result["bpw"] = player.machine.moneyBonusWin;
        }

    } else if (player.machine.gameSort == "BonusEnd") {
        result["bgid"] = 0;
        result["bgt"] = 50;
        result["bmw"] = 0;
        result["coef"] = player.virtualBet;
        result["level"] = 0;
        result["lifes"] = 1;
        result["wp"] = 0;
        result["rw"] = 0;
        result["end"] = 0;

        var nextCache = player.machine.bigMoneyCacheList[0];
        result["g"] = `{nwi:{whm:"${nextCache.wheelMark.join()}",whw:"${nextCache.wheels.join()}"}}`;
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