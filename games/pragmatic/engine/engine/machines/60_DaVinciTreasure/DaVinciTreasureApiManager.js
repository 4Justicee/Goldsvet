var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,8,10,6,3,3,1,12,5,3,3,10,4,9,3",
        balance: "0.00",
        cfgs: "2431",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "10,11,8,1,7",
        def_sa: "8,3,2,3,13",
        prg_cfg_m: "wm",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646038148172",
        sa: "8,3,2,3,13",
        sb: "10,11,8,1,7",
        prg_cfg: "0",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,4000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;800,200,50,10,0;500,150,30,5,0;500,150,30,5,0;300,100,20,0,0;300,100,20,0,0;150,15,5,0,0;150,15,5,0,0;150,15,5,0,0;100,10,5,0,0;100,10,5,0,0;100,10,5,0,0",
        l: "25",
        rtp: "94.02",
        reel_set0: "4,13,13,10,11,8,10,13,6,6,6,11,8,7,11,12,8,12,6,5,11,13,10,4,12,9,3,3,3~11,4,7,10,10,2,12,6,8,12,11,13,8,5,9,1,10,3,3,3~13,13,11,13,11,9,5,10,7,1,9,1,11,8,9,13,6,9,10,2,9,12,4,11,10,10,4,9,1,11,2,6,3,3,3~9,12,9,5,8,12,7,13,10,11,1,12,8,9,2,10,12,8,7,6,1,4,5,9,3,3,3~5,5,13,10,11,8,9,11,12,6,13,2,4,7,7,4,13,3,3,3",
        s: "3,8,10,6,3,3,1,12,5,3,3,10,4,9,3",
        reel_set1: "6,11,7,5,4,4,8,10,13,9,6,12,3,3,3,3,3~9,8,8,5,12,2,12,1,7,11,2,7,10,10,13,4,6,5,1,3,3,3,3,3~4,2,11,13,11,10,5,13,9,5,8,13,5,2,1,6,13,11,9,9,11,7,12,3,3,3,3,3~13,12,11,1,11,5,12,10,5,8,7,13,10,9,5,10,11,6,4,1,2,3,3,3,3,3~9,7,7,6,13,13,9,13,8,7,4,5,10,10,12,2,4,5,11,4,3,3,3,3,3",
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
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: "100.00",
        counter: "1",
        index: "1",
        l: "25",
        na: "s",
        n_reel_set: "0",
        stime: new Date().getTime(),
        s: "14,6,4,11,8,9,7,6,9,10,8,11,7,5,4",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "3",
        sver: "5",
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);
    result["s"] = Util.view2String(player.machine.view);
    result["c"] = player.betPerLine;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS_SELECT") {
            result["bgid"] = "0";
            result["bgt"] = "21";
            result["bw"] = "1";
            result["coef"] = player.virtualBet;
            result["end"] = "0";
            result["level"] = "0";
            result["lifes"] = "1";
            result["na"] = "b";
            result["rw"] = player.machine.bonusWinMoney;
            result["status"] = "0,0,0";
            result["wins_mask"] = "h,h,h";
            result["wins"] = "0,0,0";
            result["wp"] = "0";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.bonusWinMoney;
        result["w"] = player.machine.freeSpinWin;

        result["n_reel_set"] = 1;
        result["prg_m"] = "wm,mwm";
        result["prg"] = `${player.machine.freeSpinMulti},60`;
        result["gwm"] = player.machine.freeSpinMulti;

        if (player.machine.currentGame == "BASE") {
            //                     ->                 
            result["fs_total"] = player.machine.freeSpinLength;
            result["fslim"] = 60;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.bonusWinMoney;
            result["fsres_total"] = player.machine.bonusWinMoney;
            result["na"] = "go";
            result["g_ra"] = player.machine.bonusWinMoney;
            result["g_t"] = "multiplier";
            result["go_i_mask"] = "m,m,m,m";
            result["go_i"] = "2,3,4,5";
        } else if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fslim"] = 60;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.bonusWinMoney;
            result["fsres"] = player.machine.bonusWinMoney;
        }
    }

    return result;
};

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "2",
        index: "3",
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        rw: "100,000",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        wp: "0",
        coef: player.virtualBet,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = player.machine.gambleWinMoney;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

ApiManager.prototype.BonusEntranceApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,004.60",
        balance: "100,004.60",
        bgid: "0",
        bgt: "21",
        coef: "0.25",
        counter: "206",
        end: "1",
        index: "103",
        level: "1",
        lifes: "0",
        na: "b",
        rw: "0.00",
        status: "1,0,0",
        stime: "1639305639770",
        sver: "5",
        tw: "0.05",
        wins_mask: "pbf,psm,mbf",
        wins: "1,12,1",
        wp: "0",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["coef"] = player.virtualBet;

    result["tw"] = player.machine.bonusWinMoney;
    result["rw"] = player.machine.bonusWinMoney;

    if (player.machine.currentGame == "FREE") {
        result["fs"] = 1;
        result["fslim"] = 60;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = 1;
        result["fsres"] = "0.00";
        result["fswin"] = "0.00";

        result["n_reel_set"] = 1;
        result["na"] = "s";
        result["prg_m"] = "wm,mwm";
        result["prg"] = "0,60";
    } else {
        result["na"] = "b";
    }

    result["wins_mask"] = player.machine.bonusGameWins.wins_mask.join();
    result["wins"] = player.machine.bonusGameWins.wins.join();

    return result;
};

ApiManager.prototype.PrizePickerApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,004.60",
        balance: "100,004.60",
        bgid: "2",
        bgt: "9",
        coef: "0.25",
        counter: "206",
        end: "0",
        index: "103",
        level: "0",
        lifes: "1",
        na: "b",
        rw: "0.00",
        status: "0,0,0",
        stime: "1639305639770",
        sver: "5",
        wins_mask: "h,h,h",
        wins: "0,0,0",
        wp: "0",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["coef"] = player.virtualBet;

    if (param.ind) {
        result["end"] = 1;
        result["g_ra"] = player.machine.bonusWinMoney;
        result["g_t"] = "multiplier";
        result["go_i_mask"] = "m,m,m,m";
        result["go_i"] = "2,3,4,5";
        result["level"] = 1;
        result["lifes"] = 0;

        result["status"] = player.machine.bonusGameWins.status;
        result["wins_mask"] = "w,w,w";
        result["wins"] = player.machine.bonusGameWins.wins;
        result["wp"] = player.machine.bonusGameWins.wp;

        result["na"] = "go";
        result["tw"] = "0.00";
        result["rw"] = player.machine.bonusWinMoney;
    }

    return result;
};

ApiManager.prototype.MapQuestApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,004.60",
        balance: "100,004.60",
        bgid: "1",
        bgt: "23",
        coef: "0.25",
        counter: "206",
        end: "0",
        index: "103",
        level: "0",
        na: "b",
        tw: "0.00",
        rw: "0.00",
        stime: "1639305639770",
        sver: "5",
        wp: "0",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["coef"] = player.virtualBet;

    result["level"] = player.machine.bonusLevel;
    var cache = player.machine.bonusCacheList[player.machine.bonusLevel];
    result["wof_map"] = "1,2,3,4,5,6,7,8,9,10,12,15,20,25,30,35,40,45,50,60,75,90,100";
    result["wof_mask"] = "p,p,p,p,p,pc";
    result["wof_mi"] = cache.mi;
    result["wof_p"] = cache.p;
    result["wof_set"] = "1,2,3,4,5,collect";
    result["wp"] = cache.wp;
    result["rw"] = player.machine.bonusWinMoney;

    if (player.machine.bonusGameEnd) {
        result["end"] = 1;
        result["na"] = "go";
        result["g_ra"] = player.machine.bonusWinMoney;
        result["g_t"] = "multiplier";
        result["go_i_mask"] = "m,m,m,m";
        result["go_i"] = "2,3,4,5";
    }

    return result;
};

ApiManager.prototype.GamblingOptionApi = function (player, param) {
    var result = {
        balance: "99,990.80",
        balance_bonus: "0.00",
        balance_cash: "99,990.80",
        counter: "162",
        g_ra: "7.95",
        index: "81",
        na: "g",
        stime: "1639305564832",
        sver: "5",
        tw: "7.95",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    var gambleIndex = param.g_o_ind;
    if (gambleIndex >= 0) {
        result["g_o"] = param.g_o_ind;
        result["na"] = "g";
    } else if (player.machine.currentGame == "BASE") {
        //                                   .
        result["na"] = "c";
    } else {
        result["na"] = "cb";
    }

    result["g_ra"] = player.machine.bonusWinMoney;
    result["tw"] = player.machine.bonusWinMoney;

    if (player.machine.currentGame == "BASE") {
        //                                   .
        result["prg_m"] = "wm,mwm";
        result["prg"] = `${player.machine.freeSpinMulti},60`;
    }

    return result;
};

ApiManager.prototype.GamblingApi = function (player, param) {
    var result = {
        balance: "99,990.80",
        balance_bonus: "0.00",
        balance_cash: "99,990.80",
        counter: "164",
        g_end: "1",
        g_l: "1",
        g_mul: "2",
        g_r: "1",
        g_ra: "7.95",
        g_si: "1",
        g_w: "15.90",
        g_wi: "1",
        index: "82",
        na: "c",
        prg_m: "wm,mwm",
        prg: "12,60",
        stime: "1639305571461",
        sver: "5",
        tw: "15.90",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["g_ra"] = player.machine.bonusWinMoney;
    result["g_mul"] = player.machine.gambleMulti;
    result["g_l"] = "1";
    result["g_si"] = player.machine.gambleIndex;
    result["g_wi"] = player.machine.gambleWinIndex;

    result["g_r"] = player.machine.gambleWinMoney > 0 ? 1 : 0;
    result["g_w"] = player.machine.gambleWinMoney;
    result["tw"] = player.machine.gambleWinMoney;

    //                 
    if (result["g_r"] == 0) {
        result["na"] = "s";
    } else if (player.machine.currentGame == "BASE") {
        //                                   .
        result["prg_m"] = "wm,mwm";
        result["prg"] = `${player.machine.freeSpinMulti},60`;
        result["na"] = "c";
    } else {
        result["na"] = "cb";
    }

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    if (!player.machine.bonusGameEntranced) {
        return this.BonusEntranceApi(player, param);
    } else if (player.machine.currentGame == "PICK") {
        return this.PrizePickerApi(player, param);
    } else if (player.machine.currentGame == "MAPQ") {
        return this.MapQuestApi(player, param);
    }
};

module.exports = ApiManager;