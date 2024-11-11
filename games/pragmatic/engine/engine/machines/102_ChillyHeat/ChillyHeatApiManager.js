var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        mo_s: "11",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "6,10,3,7,6",
        mo_v: "25,50,75,100,125,150,175,200,250,350,400,450,500,600,750,2500",
        def_sa: "3,7,6,11,9",
        mo_jp: "750;2500;25000",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,1,0,0~0,0,8,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{props:{max_rnd_sim:\"1\",max_rnd_hr:\"6289308\",max_rnd_win:\"1100\"}}',
        mo_jp_mask: "jp3;jp2;jp1",
        stime: "1645354308067",
        sa: "3,7,6,11,9",
        sb: "6,10,3,7,6",
        sc: "10.00,20.00,40.00,60.00,80.00,100.00,200.00,400.00,800.00,1000.00,2000.00,3000.00,4000.00",
        defc: "100",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,50,10,0,0;150,30,5,0,0;125,25,5,0,0;100,25,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.50",
        reel_set0: "3,7,6,11,9,7,4,4,9,10,10,5,5,10,7,8,8,11,6,3,6,6~4,9,6,1,9,10,8,5,5,8,3,4,8,9,4,1,7,2,2,2,2,2,10,9,6,11,11,11~10,8,6,8,1,2,2,2,2,2,2,3,5,11,11,11,8,4,11,8,2,10,9,3,7,2,8,4,5,6,1~3,7,11,11,11,3,5,10,8,7,8,7,2,2,2,2,2,2,2,2,1,9,10,6,6,10,4,7,4,3,5,11,8,6,9,1,2,7~6,10,3,7,6,5,3,4,11,11,11,8,8,4,5,3,6,10,2,2,2,2,7,9,10,7,7,10,9,5,4,6,11",
        s: "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9",
        reel_set1: "5,6,5,11,4,6,6,11,3,3,4~3,5,6,6,11,11,11,2,2,2,11,4,3,5,4,2,1,3~6,2,2,2,2,6,4,4,5,6,4,1,5,2,11,11,11,2,3,5,11~4,5,1,5,6,11,11,11,2,2,2,3,6,3,4,4,1,11,5,2~2,2,2,6,5,4,3,2,6,3,6,3,11,5,6,4",
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
        s: "9,4,12,11,12,12,4,11,10,10,4,12,4,7,5,4,2,4,7,5",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "3",
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
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
        if (player.machine.currentGame == "FREE") {
            result['psym'] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["n_reel_set"] = 1;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bpw"] = player.machine.moneyBonusWin;
            result["bw"] = 1;
            result["e_aw"] = "0.00";
            result["rsb_c"] = 0;
            result["rsb_m"] = 3;    //             3             
            result["rsb_rt"] = "0";
            result["rsb_s"] = "11,12";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        if (player.machine.currentGame == "FREE") {
            result["tw"] = player.machine.freeSpinWinMoney + player.machine.scatterWin;
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["n_reel_set"] = 1;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["tw"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["n_reel_set"] = 0;
        }
    }

    if (player.machine.moneyCache != null) {
        result["mo_t"] = player.machine.moneyCache.table;
        result["mo"] = player.machine.moneyCache.values;
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
        balance_bonus: '0.00',
        balance_cash: '100,000.00',
        balance: '100,000.00',
        bpw: "10.00",
        counter: '1',
        e_aw: "0.00",
        index: '1',
        na: 'b',
        rsb_c: "0",
        rsb_m: "3",
        rsb_s: "11,12",
        rsb_rt: "0",
        s: "",
        stime: "1629939208592",
        sver: '5',
    }

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["bpw"] = player.machine.moneyBonusWin;
    result["s"] = Util.view2String(player.machine.view);

    result["mo_t"] = player.machine.moneyCache.table.join();
    result["mo"] = player.machine.moneyCache.values.join();
    result["rsb_c"] = player.machine.moneyBonusCache.count;


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
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        rw: "100,000",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        index: "3",
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