var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "8",
        def_sb: "9,0,7,11,12",
        def_sa: "2,2,2,2,9",
        prg_cfg_m: "s,s",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1645525529801",
        sa: "2,2,2,2,9",
        sb: "9,0,7,11,12",
        sc: "10.00,20.00,50.00,100.00,200.00,300.00,500.00,1000.00,3000.00,4000.00,5000.00,6000.00,7000.00",
        defc: "100.00",
        prg_cfg: "13,2",
        sh: "3",
        wilds: "2~500,100,50,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;300,60,30,0,0;300,60,30,0,0;200,40,20,0,0;200,40,20,0,0;200,40,20,0,0;100,15,5,0,0;100,15,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;0,0,0,0,0",
        l: "15",
        rtp: "96.52",
        reel_set0: "2,2,2,2,9,0,4,9,2,4,3,7,11,5,8,4,9,11,0,6,3,6,12,12,10,5,8,7~11,6,6,7,5,2,2,2,10,11,12,10,8,12,7,9,2,10,3,11,4~3,2,2,2,7,8,10,5,10,5,9,4,11,0,4,6,9,10,9,0,12,4,11,8,2,6~2,2,2,2,7,8,10,7,11,12,8,12,11,10,3,11,8,9,10,7,3,4,6,5,10,2~9,0,7,11,12,11,3,6,5,11,10,10,5,11,7,2,2,2,2,8,2,12,8,0,4",
        s: "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9",
        reel_set2: "5,3,7,8,9,4,11,12,3,2,10,5,6,7,4,3~7,9,3,10,6,5,2,3,11,4,12,4,8~3,5,11,3,4,4,8,10,12,5,3,9,2,6,7~6,5,8,12,3,3,10,9,2,6,3,7,11,4~4,11,2,4,8,5,12,7,4,5,6,3,9,7,3,10",
        reel_set1: "9,5,8,7,9,6,11,11,3,10,4,11,12,8~4,5,10,12,9,10,7,12,9,6,9,2,11,12,3,8~12,4,10,11,12,3,6,8,11,7,6,8,5,9,2,12,8~7,10,10,7,3,5,2,11,8,12,4,10,6,9,9,9~6,11,7,5,8,4,5,8,8,3,10,9,12,11",
        reel_set4: "6,4,3,13,8,9,11,10,12,5,7,2,2,2,2,2,2,2~12,7,6,11,3,4,10,3,5,8,9,13,2,2,2,2,2,2~5,12,4,7,9,6,11,3,4,13,10,8~6,5,5,8,7,11,13,7,4,10,12,3,4,9,4~3,3,7,5,8,11,10,6,7,6,12,8,9,4,4,13,12,5",
        reel_set3: "4,3,12,13,5,11,8,9,7,10,6,2,2,2,2,2,2~11,13,4,12,4,5,7,11,8,7,5,3,3,9,6,10~13,8,6,11,3,4,10,12,9,7,5~5,5,12,11,4,4,4,6,13,8,7,9,7,10,3~12,6,7,13,7,5,9,8,4,5,3,11,3,12,8,10,6",
        reel_set6: "6,4,3,13,8,9,11,10,12,5,7,2,2,2,2,2,2,2~12,7,6,11,3,4,10,3,5,8,9,13,2,2,2,2,2,2~3,4,11,6,7,13,10,12,8,9,2,2,2,2,2~9,8,13,9,6,12,4,10,3,7,7,11,5,5,4,2,2,2,2,2,2,2~7,10,6,3,4,13,9,11,7,3,8,5,5,8,12,4,6,12",
        reel_set5: "6,4,3,13,8,9,11,10,12,5,7,2,2,2,2,2,2,2~12,7,6,11,3,4,10,3,5,8,9,13,2,2,2,2,2,2~3,4,11,6,7,13,10,12,8,9,2,2,2,2,2~9,8,13,9,6,12,4,10,3,7,7,11,5,5,4~7,10,6,3,4,13,9,11,7,3,8,5,5,8,12,4,6,12",
        reel_set7: "6,4,3,8,9,11,10,12,5,7,2,2,2,2,2,2,2~12,7,6,11,3,4,10,3,5,8,9,2,2,2,2,2,2~3,4,11,6,7,10,5,12,8,9,2,2,2,2,2~9,8,9,6,12,4,10,3,7,7,11,5,5,4,2,2,2,2,2,2,2~7,10,6,3,4,9,11,7,3,8,5,5,8,12,4,6,12,2,2,2,2,2,2,2",
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
        l: 15,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
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
            result["rw"] = player.machine.totalWin;
            result["status"] = "0,0,0,0";
            result["wins_mask"] = "h,h,h,h";
            result["wins"] = "0,0,0,0";
            result["wp"] = "0";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        //                                 
        if (player.machine.gameType == "POUR") {
            result["fstype"] = "rwf";
            result["rwd"] = `2~${player.machine.pourWildPos.join()}`;
            result["is"] = Util.view2String(player.machine.maskView);
        }
        //                             
        else if (player.machine.gameType == "SUPER") {
            result["fstype"] = "psf";
            if (player.machine.freeSpinIndex == 12) {
                result["is"] = Util.view2String(player.machine.maskView);
                result["rwd"] = `2~${player.machine.superWildPos.join()}`;
            } else {
                result["prg_m"] = "ca,ta,cp,tp,r";
                result["prg"] = `${player.machine.freeSpinIndex - 1},10,${player.machine.superWildCount},15,0`;
            }
        } else if (player.machine.gameType == "PROG") {
        }

        result["tw"] = player.machine.totalWin;
        result["w"] = player.machine.freeSpinWin;

        if (player.machine.currentGame == "BASE") {
            //                     ->                 
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.totalWin;
            result["fsres_total"] = player.machine.totalWin;
            result["na"] = "go";
            result["g_ra"] = player.machine.totalWin;
            result["g_t"] = "multiplier";
            result["go_i_mask"] = "m,m,m,m";
            result["go_i"] = "2,3,4,5";
        } else if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.totalWin;
            result["fsres"] = player.machine.totalWin;
        }
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;

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
        tw: "0.00",
        bgid: "0",
        balance: "99,985.15",
        wins: "1,11,10,20",
        coef: "0.15",
        level: "1",
        index: "244",
        balance_cash: "99,985.15",
        balance_bonus: "0.00",
        na: "b",
        status: "1,0,0,0",
        rw: "0.00",
        stime: "1645531375345",
        bgt: "21",
        lifes: "0",
        wins_mask: "wof,psf,rwf,prf",
        wp: "0",
        end: "1",
        sver: "5",
        counter: "488",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["coef"] = player.virtualBet;

    result["tw"] = player.machine.totalWin;
    result["rw"] = player.machine.totalWin;

    if (player.machine.gameType == "POUR") {
        result["fs"] = 1;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = 1;
        result["fsres"] = "0.00";
        result["fswin"] = "0.00";
        result["fstype"] = "rwf";
        result["reel_set"] = 0;
        result["na"] = "s";
    } else if (player.machine.gameType == "SUPER") {
        result["fs"] = 1;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = 1;
        result["fsres"] = "0.00";
        result["fswin"] = "0.00";
        result["fstype"] = "psf";
        result["reel_set"] = 0;
        result["na"] = "s";
        result["prg_m"] = "ca,ta,cp,tp,r";
        result["prg"] = "0,10,0,15,0";
    } else if (player.machine.gameType == "PROG") {
    } else if (player.machine.gameType == "WHEEL") {
        result["na"] = "b";
    }

    result["wins_mask"] = player.machine.bonusGameWins.wins_mask.join();
    result["wins"] = player.machine.bonusGameWins.wins.join();

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    if (!player.machine.bonusGameEntranced) {
        return this.BonusEntranceApi(player, param);
    } else {
        return this.BonusWheelApi(player, param);
    }
};

ApiManager.prototype.BonusWheelApi = function (player, param) {
    var result = {
        wof_mask: "w,w,w,w,w,w,w,w,w,w,wrs",
        wof_set: "5,50,10,30,25,45,20,40,35,15,50~1",
        bgid: "1",
        balance: "99,985.15",
        coef: "0.15",
        level: "0",
        index: "245",
        balance_cash: "99,985.15",
        balance_bonus: "0.00",
        na: "b",
        rw: "0.00",
        stime: "1645531384921",
        bgt: "22",
        lifes: "1",
        wp: "0",
        end: "0",
        sver: "5",
        counter: "490",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["coef"] = player.virtualBet;

    if (param.ind) {
        result["end"] = 1;
        result["g_ra"] = player.machine.totalWin;
        result["g_t"] = "multiplier";
        result["go_i_mask"] = "m,m,m,m";
        result["go_i"] = "2,3,4,5";
        result["level"] = 1;
        result["lifes"] = 0;

        result["wins_mask"] = "w,w,w,w,w,w,w,w,w,w,wrs";
        result["wof_set"] = "5,50,10,30,25,45,20,40,35,15,50~1";
        result["wof_wi"] = player.machine.bonusWheelIndex;
        result["wp"] = player.machine.bonusMulti;

        result["na"] = "go";
        result["tw"] = "0.00";
        result["rw"] = player.machine.totalWin;
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

    result["g_ra"] = player.machine.totalWin;
    result["tw"] = player.machine.totalWin;

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

    result["g_ra"] = player.machine.totalWin;
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
        result["na"] = "c";
    } else {
        result["na"] = "cb";
    }

    return result;
};

module.exports = ApiManager;