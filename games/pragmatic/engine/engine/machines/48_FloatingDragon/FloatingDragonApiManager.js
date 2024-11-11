var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: `9,6,11,5,10,7,6,10,9,9,11,7,5,6,12`,
        balance: `100,000.00`,
        cfgs: `1`,
        ver: `2`,
        index: `1`,
        balance_cash: `100,000.00`,
        def_sb: `7,8,8,9,5`,
        reel_set_size: `5`,
        def_sa: `12,9,8,9,5`,
        reel_set: `0`,
        bonusInit: `[{bgid:0,bgt:48,mo_s:\"14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15\",mo_v:\"10,20,30,40,50,60,70,80,90,100,110,120,140,160,180,200,1000,2000,3000,4000,49930\"}]`,
        balance_bonus: `0.00`,
        na: `s`,
        scatters: `1~0,0,0,0,0~20,15,10,0,0~1,1,1,1,1`,
        gmb: `0,0,0`,
        rt: `d`,
        gameInfo: `{rtps:{regular:\"96.71\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"608273\",max_rnd_win:\"5000\"}}`,
        wl_i: `tbm~5000`,
        stime: `1638797884247`,
        sa: `12,9,8,9,5`,
        sb: `7,8,8,9,5`,
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: `20`,
        sh: `3`,
        wilds: `2~0,0,0,0,0~1,1,1,1,1`,
        bonuses: `0`,
        fsbonus: ``,
        c: `200`,
        sver: `5`,
        counter: `2`,
        paytable: `0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;2000,200,50,5,0;1000,150,30,0,0;500,100,20,0,0;500,100,20,0,0;200,50,10,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0;0,0,0,0,0;0,0,0,0,0`,
        l: `10`,
        rtp: `96.71`,
        s: `9,6,11,5,10,7,6,10,9,9,11,7,5,6,12`,
        accInit: `[{id:0,mask:\"cp\"},{id:1,mask:\"cp;mp\"}]`,
        reel_set0: `13,7,8,9,11,1,6,7,13,8,12,7,6,11,7,6,9,8,8,13,5,11,6,9,5,11,4,13,9,11,5,9,10,1,13,11,10,5,4,11,6,9,13,4,7,9,13,7,5,11,12,13,9,8,8,8,8,8~7,5,4,10,8,12,4,9,7,4,10,8,12,6,11,7,4,10,8,8,13,4,5,12,4,7,1,10,6,12,10,7,12,5,10,4,6,5,12,7,4,6,12,1,13,10,11,5,4,12,6,1,10,9,8,8,8,8,8~7,13,1,4,7,8,0,0,0,12,4,6,8,11,5,4,6,1,10,5,6,7,8,8,13,0,10,6,5,4,9,6,7,12,5,7,1,11,4,7,5,4,9,8,8,8,8,8~5,6,8,7,1,13,6,1,9,8,7,5,12,4,10,8,8,11,7,4,6,1,8,8,8,8,8~6,5,7,8,12,1,5,9,8,6,4,13,1,8,8,11,1,7,10,8,8,8,8,8`,
        reel_set1: `13,7,8,9,11,1,6,7,13,8,12,7,6,11,7,6,9,8,8,13,5,11,6,9,5,11,4,13,9,11,5,9,10,1,13,11,10,5,4,11,6,9,13,4,7,9,13,7,5,11,12,13,9,8,8,8,8,8~7,5,4,10,8,12,4,9,7,4,10,8,12,6,11,7,4,10,8,8,13,4,5,12,4,7,1,10,6,12,10,7,12,5,10,4,6,5,12,7,4,6,12,1,13,10,11,5,4,12,6,1,10,9,8,8,8,8,8~7,13,1,4,7,8,0,0,0,12,4,6,8,11,5,4,6,1,10,5,6,7,8,8,13,0,10,6,5,4,9,6,7,12,5,7,1,11,4,7,5,4,9,8,8,8,8,8~5,6,8,7,1,13,6,1,9,8,7,5,12,4,10,8,8,11,7,4,6,1,8,8,8,8,8~6,5,7,8,12,1,5,9,8,6,4,13,1,8,8,11,1,7,10,8,8,8,8,8`,
        reel_set2: `13,7,8,9,11,1,6,7,13,8,12,7,6,11,7,6,9,8,8,13,5,11,6,9,5,11,4,13,9,11,5,9,10,1,13,11,10,5,4,11,6,9,13,4,7,9,13,7,5,11,12,13,9,8,8,8,8,8~7,5,4,10,8,12,4,9,7,4,10,8,12,6,11,7,4,10,8,8,13,4,5,12,4,7,1,10,6,12,10,7,12,5,10,4,6,5,12,7,4,6,12,1,13,10,11,5,4,12,6,1,10,9,8,8,8,8,8~7,13,1,4,7,8,0,0,0,12,4,6,8,11,5,4,6,1,10,5,6,7,8,8,13,0,10,6,5,4,9,6,7,12,5,7,1,11,4,7,5,4,9,8,8,8,8,8~5,6,8,7,1,13,6,1,9,8,7,5,12,4,10,8,8,11,7,4,6,1,8,8,8,8,8~6,5,7,8,12,1,5,9,8,6,4,13,1,8,8,11,1,7,10,8,8,8,8,8`,
        reel_set3: `13,7,8,9,11,1,6,7,13,8,12,7,6,11,7,6,9,8,8,13,5,11,6,9,5,11,4,13,9,11,5,9,10,1,13,11,10,5,4,11,6,9,13,4,7,9,13,7,5,11,12,13,9,8,8,8,8,8~7,5,4,10,8,12,4,9,7,4,10,8,12,6,11,7,4,10,8,8,13,4,5,12,4,7,1,10,6,12,10,7,12,5,10,4,6,5,12,7,4,6,12,1,13,10,11,5,4,12,6,1,10,9,8,8,8,8,8~7,13,1,4,7,8,0,0,0,12,4,6,8,11,5,4,6,1,10,5,6,7,8,8,13,0,10,6,5,4,9,6,7,12,5,7,1,11,4,7,5,4,9,8,8,8,8,8~5,6,8,7,1,13,6,1,9,8,7,5,12,4,10,8,8,11,7,4,6,1,8,8,8,8,8~6,5,7,8,12,1,5,9,8,6,4,13,1,8,8,11,1,7,10,8,8,8,8,8`,
        reel_set4: `13,7,8,9,11,2,6,7,13,8,12,7,6,11,7,6,9,8,8,13,5,11,6,9,5,11,4,13,9,11,5,9,10,2,13,11,10,5,4,11,6,9,13,4,7,9,13,7,5,11,12,13,9,8,8,8,8,8~7,5,4,10,8,12,4,9,7,4,10,8,12,6,11,7,4,10,8,8,13,4,5,12,4,7,2,10,6,12,10,7,12,5,10,4,6,5,12,7,4,6,12,2,13,10,11,5,4,12,6,2,10,9,8,8,8,8,8~7,13,2,4,7,8,12,4,6,8,11,5,4,6,2,10,5,6,7,8,8,13,10,6,5,4,9,6,7,12,5,7,2,11,4,7,5,4,9,8,8,8,8,8~5,6,8,7,2,13,6,2,9,8,7,5,12,4,10,8,8,11,7,4,6,2,8,8,8,8,8~6,5,7,8,12,2,5,9,2,8,6,4,13,8,8,11,2,7,10,8,8,8,8,8`,
    };

    // API          
    result["stime"] = new Date().getTime();

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

    if (player.betPerLine > 0) {
        result["c"] = player.betPerLine;
        result["defc"] = player.betPerLine;
    }
    return result;
};

ApiManager.prototype.GameApi = function (player, prevGameMode, param) {
    var result = {
        balance_bonus: 0,
        balance_cash: 0,
        balance: 0,
        c: player.betPerLine,
        counter: 1,
        index: 1,
        l: 10,
        mo_t: "",
        mo: "",
        na: "s",
        reel_set: 0,
        s: Util.view2String(player.machine.view),
        sa: "5,4,7,6,11",
        sb: "9,12,7,11,8",
        sh: 3,
        stime: new Date().getTime(),
        sver: 5,
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
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

    //             api
    if (player.machine.moneyCache != null) {
        result["mo"] = player.machine.moneyCache.values;
        result["mo_t"] = player.machine.moneyCache.table;
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            result["bgid"] = "0";
            result["bgt"] = "48";
            result["end"] = "0";
            result["lifes"] = player.machine.lifes;
            result["na"] = "b";
            result["rsb_rt"] = "0";
            result["rw"] = player.machine.moneyBonusWin;
            result["wp"] = player.machine.moneyBonusWin / player.betPerLine;
            result["w"] = "0.00";
            result["tw"] = "0.00";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 1;
        result["acci"] = "0;1";
        result["accm"] = "cp;cp~mp";

        // TODO
        result["accv"] = `${player.machine.freeSpinWildCount};${player.machine.freeRespinLevel}~4`;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;

            if (player.machine.isFreeSpinAdd) {
                result["fsmore"] = 10;
            }

            if (player.machine.winMoney > 0) {
                result["mo_c"] = 1;
                result["mo_tv"] = player.machine.winMoney;
                result["mo_tw"] = player.machine.winMoney * player.betPerLine;
            }
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
        }
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    return result;
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        rsb_rt: "0",
        bgid: "0",
        balance: "156,650.00",
        coef: "10.00",
        index: "196",
        balance_cash: "156,650.00",
        balance_bonus: "0.00",
        na: "b",
        rw: "2,300.00",
        stime: new Date().getTime(),
        bgt: "48",
        lifes: "2",
        wp: "230",
        end: "0",
        sver: "5",
        counter: "392",
        s: Util.view2String(player.machine.view),
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    //             api
    if (player.machine.moneyCache != null) {
        result["mo"] = player.machine.moneyCache.values;
        result["mo_t"] = player.machine.moneyCache.table;
    }
    if (player.machine.bonusWin > 0) {
        result["rsb_rt"] = "1";
    } else {
        result["rsb_rt"] = "0";
    }
    result["rw"] = player.machine.moneyBonusWin;
    result["wp"] = player.machine.moneyBonusWin / player.betPerLine;
    result["lifes"] = player.machine.lifes;
    if (player.machine.currentGame == "BONUS") {
        result["end"] = "0";
        result["na"] = "b";
    } else if (player.machine.currentGame == "BASE") {
        result["end"] = 1;
        result["na"] = "cb";
        result["tw"] = player.machine.moneyBonusWin;
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

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
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "164,550.00",
        coef: "10.00",
        index: "203",
        balance_cash: "164,550.00",
        balance_bonus: "0.00",
        na: "s",
        rw: "7,900.00",
        stime: "1241515",
        wp: "0",
        sver: "5",
        counter: "406",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}
module.exports = ApiManager;