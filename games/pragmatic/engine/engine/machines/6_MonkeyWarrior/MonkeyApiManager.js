var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "10,3,6,8,9,9,7,10,3,5,4,5,8,4,10",
        balance: "0.00",
        cfgs: "2998",
        ver: "2",
        mo_s: "11",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "5,9,3,10,3",
        mo_v: "25,50,75,100,125,150,175,200,250,350,400,450,500,600,750,1250,2500,5000",
        def_sa: "4,9,7,9,10",
        mo_jp: "750;1250;2500;5000",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,2,0,0~8,8,8,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        mo_jp_mask: "jp4;jp3;jp2;jp1",
        stime: "1646033960706",
        sa: "4,9,7,9,10",
        sb: "5,9,3,10,3",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,50,25,0,0;300,40,25,0,0;200,35,20,0,0;150,30,20,0,0;50,20,10,0,0;50,20,10,0,0;50,15,10,0,0;50,15,10,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "95.50",
        reel_set0: "6,4,10,9,4,5,8,7,6,9,7,11,10,11,11,9,10,6,9,5,3,10,7,4,10,5,8,6,10,9~2,9,3,7,5,9,6,5,8,9,1,10,8,5,7,4,8,11,11,11,5,9,6,10,8,1,9,7,5,8,6,9,10~2,7,6,10,8,3,7,9,1,10,4,8,6,9,11,11,11,8,6,3,9,5,8,1,10,8,3,7,9,4~2,9,8,3,4,10,8,4,9,7,1,10,1,7,4,9,7,11,11,11,10,9,6,7,4,5,8,1,9,3,10,4,8,7,3,9,7,5,10,9,3,7,4,10,6,4,7,8~2,10,9,5,10,3,9,5,8,3,4,7,5,4,10,8,5,10,4,6,7,3,8,10,11,11,11,8,4,9",
        s: "10,3,6,8,9,9,7,10,3,5,4,5,8,4,10",
        t: "243",
        reel_set1: "3,5,11,11,5,5,4,4,5,5,6,6,4,4,5,5,6,6,11,11,6,6,4,4,5,5,6,6,6,4~5,6,3,1,5,6,4,5,1,5,5,11,11,6,6,5,5,5,1,6,3,3,4,11,11,11,5,6,6,6,6,5,5,6~6,6,3,1,3,3,4,4,4,3,3,4,4,3,11,11,3,6,6,6,5,3,3,5,11,11,11,3,3,6,6,6,6~3,4,3,4,4,4,4,1,5,3,3,3,11,11,11,4,4,1,3,4,4,3,3,4,4,3,3,6,6,1,6,5~4,3,3,4,4,5,5,3,3,11,11,11,3,3,4,4,5,5,4,4,3,3,4,4,5,5,6,6,11,11,4,4",
        l0: "~" //     api                                                       
    }


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
        n_reel_set: "0",
        na: "s",
        l: "25",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),//          ,                          
        sb: Util.view2String(player.machine.virtualReels.below),//          ,                          
        sh: "3",
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

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
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result['psym'] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions}`;
            result["n_reel_set"] = 1;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bgid"] = 0;
            result["bgt"] = 37;
            result["bpw"] = player.machine.moneyBonusWin;
            result["bw"] = 1;
            result["rsb_c"] = 0;
            result["rsb_m"] = 5;
            result["rsb_more"] = 0;
            result["rsb_s"] = "11,12";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel_set"] = 1;

        if (player.machine.currentGame == "FREE") {
            result["n_reel_set"] = 1;
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
        }
    }

    if (player.machine.moneyCache != null) {
        result["mo"] = player.machine.moneyCache.values;
        result["mo_t"] = player.machine.moneyCache.table;
    }

    return result;
}

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
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        bgid: "0",
        bgt: "37",
        bpw: player.machine.moneyBonusWin,
        counter: "1",
        end: "0",
        index: "1",
        mo_t: "",
        mo: "",
        na: "b",
        rsb_c: player.machine.moneyCacheIndex,
        rsb_m: player.machine.moneyBonusCache.max,
        rsb_s: "11,12",
        rsb_more: player.machine.moneyBonusCache.more,
        s: "",
        stime: "",
        sver: "5"
    };

    if (player.machine.moneyBonusCache.status && player.machine.moneyBonusCache.status.length > 0) {
        result["status"] = player.machine.moneyBonusCache.status;
        result["wins"] = player.machine.moneyBonusCache.wins;
        result["wins_mask"] = player.machine.moneyBonusCache.wins_mask;
    }

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;
    result["bpw"] = player.machine.moneyBonusWin;
    result["s"] = Util.view2String(player.machine.view);

    result["mo_t"] = player.machine.moneyCache.table.join();
    result["mo"] = player.machine.moneyCache.values.join();

    if (player.machine.currentGame == "BASE") {
        //                    
        result["bpw"] = "0.00";
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;
        result["na"] = "cb";
        result["end"] = 1;
    }

    return result;
}

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
    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

module.exports = ApiManager;
