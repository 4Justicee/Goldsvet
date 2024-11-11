var Util = require('../../../utils/slot_utils');

function ApiManager() {}

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "7,5,4,3,6,7,9,3,3,8,6,6,4,9,8",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "3,8,4,7,3",
        reel_set_size: "8",
        def_sa: "7,4,6,3,3",
        reel_set: "0",
        bonusInit: "[{bgid:0,bgt:18,bg_i:\"1000,100,20,10\",bg_i_mask:\"pw,pw,pw,pw\"}]",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{regular_min:\"96.45\",regular_max:\"96.49\"},props:{max_rnd_hr_op5:\"50000000\",max_rnd_sim:\"1\",max_rnd_hr_op4:\"50000000\",max_rnd_hr_op1:\"561797\",max_rnd_hr_op3:\"50000000\",fs_options:\"0:S1_88;1:S2_98;2:S3_108;3:S4_118;4:S5_128\",max_rnd_win:\"2500\",max_rnd_hr_op2:\"724637\"}}",
        wl_i: "tbm~2500",
        stime: "1655024866953",
        sa: "7,4,6,3,3",
        sb: "3,8,4,7,3",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,800.00,900.00,1000.00,1500.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;750,150,100,0,0;450,100,50,0,0;300,80,40,0,0;200,50,20,0,0;138,25,10,0,0;30,10,5,0,0;30,10,5,0,0;25,10,5,0,0;25,10,5,0,0;20,10,5,0,0;20,10,5,0,0;4400,880,440,0,0",
        l: "88",
        reel_set0: "5,11,13,14,6,7,7,6,7,6,7,8,9,5,12,4,10,5,7,6,8,5,13,4,6,6,7,9,3,5,5,7,12,4,4,3,7,4,10,11,6,3,14,4~3,6,5,7,7,11,10,7,2,8,5,6,3,5,5,7,6,9,6,13,5,7,5,6,13,12,4,12,10,9,3,14,4,6,6,14,7,9,2,7,5,7,3,4,5,3,6,8,11,8~13,5,14,5,6,5,6,3,5,4,10,12,7,6,6,7,7,2,3,14,8,4,12,4,6,3,5,13,10,7,5,9,6,11,5,4,9,7,12,4,8,7,6,14,7,11~12,13,14,4,7,5,3,7,5,8,13,11,8,4,13,4,7,13,5,3,7,7,12,6,6,5,11,9,3,12,2,6,8,10,9,2,4,14,6~11,7,3,6,13,8,10,5,12,8,3,9,6,5,4,10,3,13,5,6,14,7,11,8,9,13,12,14,11,12,3,8,4,7,4,6,10,7,13,6,9,4",
        s: "7,5,4,3,6,7,9,3,3,8,6,6,4,9,8",
        reel_set2: "4,13,4,12,11,11,11,4,14,4,9,9,12,12,12,8,11,4,4,13,4,4,4,9,4,4,11,4,4,10,10,10,8,9,10,11,4,9,9,9,4,4,10,4,13,13,13,8,12,4,10,14,12,13~13,4,9,4,4,4,11,8,8,13,11,8,8,8,10,4,13,9,4,10,11,11,11,8,4,11,4,13,9,9,9,4,2,12,4,12,13,13,13,14,12,4,4,10,11,9~13,4,2,9,4,11,12,11,11,11,14,4,11,4,12,4,10,9,12,8,8,8,4,4,8,13,14,4,12,4,12,12,12,9,13,10,4,4,8,4,12,8,4,4,4,11,4,4,11,10,4,4,8,10,10,13,12,9,8,2,4,4,10,10,10,14,11~4,4,8,9,2,4,13,12,13,8,8,8,2,13,12,4,11,11,13,9,8,11,4,4,4,8,4,8,13,14,9,4,4,10,8,11,11,11,12,11,13,4,14,4,10,10,4,4,9~8,13,8,10,10,11,4,8,8,8,10,11,4,4,14,4,4,9,9,10,10,10,12,10,13,8,4,13,4,4,11,4,4,4,10,11,9,8,9,12,4,9,12,12,12,11,12,4,8,10,11,14,4,13,11,11,11,13,12,11,4,12,4,4,9,12,9,9,9,10,4,11,11,9,4,8,10,8,12",
        t: "243",
        reel_set1: "10,12,12,3,11,11,11,3,13,9,10,3,10,12,12,12,10,3,3,11,8,13,3,3,3,13,12,3,14,9,10,10,10,8,13,12,9,9,13,9,9,9,11,3,9,3,14,3,13,13,13,3,12,3,11,8,3,8,8,8,3,11,11,3,3,8,9~3,3,8,3,3,13,3,3,3,13,9,8,3,12,11,3,8,8,8,9,3,13,12,3,11,10,3,11,11,11,10,3,13,2,14,11,13,9,9,9,8,9,3,10,3,13,3,13,13,13,8,10,11,12,13,14,3,2,11,12~9,9,11,3,11,8,11,11,11,14,2,3,3,12,13,10,12,8,8,8,3,13,8,3,3,8,12,10,9,9,9,3,10,10,10,3,8,11,13,12,12,12,10,12,11,11,3,13,14,3,3,3,8,3,3,8,3,3,2,3,10,10,3,9,12,12,3,14,9,3,8~14,12,8,8,3,8,8,8,10,9,8,3,9,8,13,9,9,9,13,3,13,9,11,11,2,3,3,3,14,3,8,12,10,10,11,11,11,13,3,3,12,3,3,13,13,11,3,2,13,13,9,3,13,9~9,11,10,8,3,3,8,8,8,13,11,11,3,3,12,14,8,3,3,3,13,3,8,3,11,8,8,12,12,12,9,3,9,13,10,13,11,11,11,9,10,8,10,3,12,11,10,10,10,9,3,3,10,11,12,10,3,9,9,9,3,12,11,9,14,12,13,10,13,13,13,13,9,11,3,8,3,8,13,11,13",
        reel_set4: "10,8,6,6,9,6,6,6,9,6,11,6,12,8,12,11,13,10,10,10,6,11,6,9,6,6,10,6,6,13,13,13,8,12,13,6,10,6,9,14,6,13~13,13,10,6,11,6,6,9,6,6,6,10,6,2,8,14,6,6,11,13,6,8,11,11,11,6,13,12,10,6,12,8,14,13,6,6,13,13,13,2,12,6,11,6,6,11,6,6,9,6,9~8,12,6,9,6,10,6,14,11,11,11,6,6,8,12,11,8,6,12,6,6,6,13,12,13,6,10,13,6,6,11,12,12,12,6,14,6,11,2,10,6,9,9,6~13,6,10,13,6,6,13,12,6,14,9,11,12,6,6,6,8,6,9,6,10,11,9,2,9,6,11,10,6,6,14,11,11,11,12,6,6,8,6,11,6,8,9,6,13,13,8,10,8,2~11,6,12,6,9,12,13,8,6,13,8,8,8,6,11,14,6,12,6,10,9,6,6,13,8,6,6,6,12,10,6,8,6,13,10,6,11,6,9,10,10,10,6,8,6,12,6,6,11,8,6,13,11,6,9,9,9,14,6,6,12,13,8,6,13,10,10,6,13,13,13,13,9,10,11,10,6,9,8,13,9,11,10,9,11",
        reel_set3: "5,10,5,5,14,9,13,12,11,11,11,5,5,12,11,5,10,5,5,12,12,12,5,13,5,5,12,5,11,5,11,5,5,5,11,14,9,5,9,9,5,8,9,10,10,10,5,8,9,5,10,5,8,8,5,13,13,13,5,10,13,13,5,5,11,10,13,12,5~12,5,5,10,5,9,8,5,5,5,2,5,5,9,14,5,5,11,11,11,9,2,13,8,5,8,13,10,9,9,9,5,13,14,5,12,5,5,13,13,13,5,11,11,10,5,13,12,5~12,10,10,10,5,5,12,12,11,11,11,5,5,8,13,9,5,13,11,5,5,5,10,5,12,13,5,14,5,9,12,12,12,5,2,9,5,8,11,11,5,10,10,5,8,12,2,5,5,14,5,10~11,5,5,8,13,5,10,5,8,5,14,5,9,5,8,5,5,5,13,10,5,9,9,5,11,12,9,11,10,13,11,2,12,2,11,11,11,8,9,5,12,13,12,5,13,8,11,14,5,5,13,5,5,10,13~10,11,5,13,8,8,8,9,10,12,11,13,11,5,5,5,9,11,8,12,13,14,11,11,11,5,9,5,5,10,10,10,9,13,12,8,13,11,9,9,9,8,5,5,10,5,5,13,13,13,13,10,5,5,10,5,8,5",
        reel_set6: "12,10,3,3,11,11,11,12,3,9,3,3,11,12,12,12,3,3,11,8,3,3,3,9,8,12,11,13,12,10,10,10,3,9,13,3,10,9,9,9,3,13,12,8,14,13,13,13,11,8,3,9,11,13,8,8,8,10,3,13,3,3,14,10~3,8,11,11,3,3,3,8,13,10,12,8,8,8,2,8,14,10,11,13,11,11,11,3,12,13,3,3,9,9,9,12,9,3,3,9,13,13,13,3,13,10,3,9,3~3,14,3,8,11,11,11,3,12,12,3,8,12,8,8,8,9,11,9,3,13,9,9,9,3,8,12,3,3,2,12,12,12,8,14,11,3,10,12,3,3,3,11,8,9,3,3,2,10,10,11,3,10,10,10,13,13~8,11,3,13,8,3,10,8,8,8,3,13,10,12,10,11,14,3,8,9,9,9,12,9,3,3,14,3,8,12,3,3,3,8,13,13,9,10,2,8,3,9,11,11,11,2,3,13,3,9,11,13,11,3,11~11,13,3,9,9,8,3,8,8,8,12,8,12,9,11,13,9,12,3,3,3,9,8,10,11,3,3,8,9,12,12,12,11,13,11,12,9,8,3,3,10,11,11,11,10,12,13,3,3,8,11,10,10,10,8,12,11,3,13,13,3,3,11,9,9,9,11,3,10,3,8,14,13,13,13,13,10,10,3,13,10,12,3,12,14,8",
        reel_set5: "7,13,7,13,7,8,7,9,13,11,7,13,11,9,12,10,7,9,7,7,10,9,7,12,7,7,7,11,7,10,11,7,7,10,8,7,8,7,14,7,9,7,12,7,7,12,7,7,14,7,7,8,7,9,7~13,7,7,11,7,7,13,11,7,7,9,7,7,2,12,8,9,7,12,7,14,11,11,7,7,2,7,7,7,13,9,7,13,7,7,13,12,7,10,7,7,10,7,7,8,14,8,12,7,7,8,7,13,7,7,10,9,10,7~7,7,9,7,10,8,7,11,7,14,11,7,14,8,7,12,10,9,8,7,7,2,12,7,2,9,11,7,7,7,14,7,9,7,7,13,7,13,7,7,8,7,10,7,12,11,7,7,13,7,7,8,12,7,12,7,13,7,7,10~8,10,9,11,14,9,7,11,7,7,12,13,7,9,8,7,12,7,7,12,13,13,7,11,10,10,7,7,7,13,10,7,8,9,8,7,7,13,8,11,9,13,7,9,7,7,8,7,7,2,14,2,10,13,12,7,7~8,7,9,7,10,10,7,7,10,12,13,7,7,7,12,13,7,11,7,11,9,13,12,10,7,7,8,10,10,10,13,7,14,7,10,10,7,9,7,7,11,9,9,9,7,11,7,11,12,13,9,7,13,11,7,12,7,13,13,13,13,8,9,8,7,8,7,7,9,10,7,11,9,7,13",
        reel_set7: "13,9,4,9,4,10,11,11,11,10,4,4,8,13,10,13,11,12,12,12,4,4,12,14,9,12,4,9,4,4,4,9,4,4,11,9,12,13,4,10,10,10,4,10,4,12,8,8,4,4,9,9,9,10,13,12,4,4,14,4,9,13,13,13,4,11,4,4,11,8,4,11,4~9,4,13,4,4,4,13,4,9,13,4,4,8,8,8,14,13,11,8,4,9,11,11,11,4,12,4,13,11,9,9,9,10,12,4,8,11,8,13,13,13,11,10,2,12,4,4,10~4,8,4,4,12,11,11,11,4,10,13,4,8,4,10,10,10,8,8,8,4,9,11,4,13,4,12,12,12,9,11,12,12,14,8,4,4,4,2,12,9,2,12,13,10,10,4,4,14,11,11,8,4,10~14,4,4,11,10,8,4,4,13,13,4,8,8,8,4,9,12,4,14,8,10,10,4,9,13,4,4,4,13,9,9,2,11,8,4,11,11,4,4,12,11,11,11,8,12,4,10,13,4,13,8,8,12,4,9,11,2~12,4,9,13,8,11,10,8,8,8,11,4,4,11,10,8,10,12,10,10,10,13,12,8,4,13,10,4,12,4,4,4,9,4,13,8,8,4,4,12,12,12,4,11,4,10,9,8,4,11,11,11,10,4,11,14,10,9,9,13,9,9,9,4,4,14,11,8,4,13,12,9,9",
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

    if (player.betPerLine > 0) {
        result["c"] = player.betPerLine;
        result["defc"] = player.betPerLine;
    }
    return result;
};

ApiManager.prototype.GameApi = function (player, prevGameMode, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "88",
        na: (player.machine.winMoney > 0) ? `c` : `s`,
        n_reel_set: 0,
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "3",
        stime: new Date().getTime(),
        sver: "5",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS") {
            result["bg_i_mask"] = "pw,pw,pw,pw";
            result["bg_i"] = "1000, 100, 20, 10";
            result["bgid"] = 0;
            result["bgt"] = 18;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["na"] = "b";
            result["rw"] = 0;
            result["status"] = "0,0,0,0,0,0,0,0,0,0,0,0";
            result["wins_mask"] = "h,h,h,h,h,h,h,h,h,h,h,h"
            result["wins"] = "0,0,0,0,0,0,0,0,0,0,0,0";
            result["wp"] = 0;
        } else if (player.machine.currentGame == "FREE") {
            result["bgid"] = 1;
            result["bgt"] = 30;
            result["bw"] = 1;
            result["n_reel_set"] = 0;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["na"] = "b";
            result["rw"] = 0;
            result["status"] = "0,0,0,0,0";
            result["wins_mask"] = "nff,nff,nff,nff,nff",
                result["wins"] = "6,6,6,6,6";
            result["wp"] = 0;
            result["tw"] = player.machine.totalWin;
        }
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.totalWin;

        if (player.machine.currentGame == "FREE") {
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = 6;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["n_reel_set"] = player.machine.bonusType;
            result["na"] = "s";
            result["n_reel_set"] = player.machine.param_ind;
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsend_total"] = 1;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
        }
    }

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
        counter: "2",
        rtp: "96.06"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    return result;
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        index: param.index,
        rw: "0.00",
        stime: new Date().getTime(),
        sver: "5",
        wp: "0",
    };

    if (player.machine.bonusType == 0) {
        result["bgid"] = 1;
        result["bgt"] = 30;
        result["coef"] = player.virtualBet;
        result["end"] = 1;
        result["fs"] = 1;
        result["fsmax"] = 6;
        result["fsmul"] = 1;
        result["fsres"] = 0;
        result["fswin"] = 0;
        result["level"] = 1;
        result["lifes"] = 0;
        result["na"] = "s";
        result["trail"] = player.machine.trail;
        result["status"] = player.machine.status.join();
        result["wins_mask"] = "nff,nff,nff,nff,nff";
        result["wins"] = "6,6,6,6,6";
    } else if (player.machine.bonusType == 2) {
        result["bg_i_mask"] = "pw,pw,pw,pw";
        result["bg_i"] = "1000,100,20,10";
        result["bgid"] = 0;
        result["bgt"] = 18;
        result["coef"] = player.virtualBet;
        result["end"] = 0;
        result["level"] = player.machine.jackpotLevel;
        result["lifes"] = 1;
        result["na"] = "b";
        result["status"] = player.machine.status.join();
        result["wins_mask"] = player.machine.wins_mask.join();
        result["wins"] = player.machine.wins.join();

        if (player.machine.currentGame == "BASE") {
            //                    
            result["end"] = 1;
            result["lifes"] = 0;
            result["wp"] = player.machine.times;
            result["rw"] = player.machine.winMoney;
            result["tw"] = player.machine.winMoney;
            result["na"] = "cb";
        }
    }
    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        na: "s",
        sver: "5",
        wp: 0,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["coef"] = player.virtualBet;
    result["rw"] = player.machine.winMoney;
    return result;
}

module.exports = ApiManager;
