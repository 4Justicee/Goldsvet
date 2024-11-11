var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bg_i_mask: "bgm,bgm,bgm,fgm,fgm,fgm",
        bg_i: "2,3,5,2,3,5",
        bonuses: "0",
        cfgs: "1",
        counter: "2",
        def_s: "6,7,4,2,8,4,3,5,6,7,8,5,7,3,4,4,3,5,6,7",
        def_sa: "8,7,5,3,7",
        def_sb: "3,4,7,6,8",
        fsbonus: "",
        gameInfo: `{ props: { max_rnd_sim: "1", max_rnd_hr: "62500000", max_rnd_win: "7000" } }`,
        gmb: "0,0,0",
        index: "1",
        l: "40",
        mo_jp_mask: "jp3;jp2;jp1",
        mo_jp: "2000;8000;40000",
        mo_s: "13",
        mo_v: "40,80,120,160,200,240,280,320,400,560,640,720,800,960,2000,8000",
        n_reel_set: "0",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,100,20,2,0;500,100,20,2,0;300,50,15,2,0;300,50,15,2,0;200,40,10,2,0;200,40,10,2,0;75,25,5,0,0;75,25,5,0,0;50,15,5,0,0;50,15,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        reel_set_size: "2",
        reel_set0: "8,10,3,3,3,3,11,9,8,8,6,6,5,5,7,7,4,4,4,4,9,6,6,13,13,13,10,12,5,5,11,8,8,7,7~11,10,9,1,12,5,5,7,7,6,6,2,2,11,9,7,7,3,3,3,3,10,8,8,6,6,13,13,13,13,4,4,4,4,5,5,8,8~8,10,6,6,7,7,3,3,3,3,1,11,9,5,5,8,8,13,13,13,13,6,6,2,2,11,4,4,4,4,5,5,12,9,8,8,10,7,7~8,11,13,13,13,13,3,3,3,3,10,9,1,12,7,7,7,7,6,6,6,6,2,2,2,2,10,4,4,4,4,5,5,5,5,9,8,8,8,8,11~8,11,9,10,6,6,6,6,2,2,2,2,10,12,4,4,4,4,9,3,3,3,3,13,13,13,13,13,5,5,5,5,11,8,8,8,8,7,7,7,7",
        reel_set1: "8,10,3,3,3,3,11,9,8,8,6,6,5,5,7,7,4,4,4,4,9,6,6,13,13,13,10,12,5,5,11,8,8,7,7~11,10,9,1,12,5,5,7,7,6,6,2,2,11,15,15,15,15,9,7,7,16,16,16,16,10,8,8,6,6,13,13,13,13,5,5,8,8~8,10,16,16,16,16,6,6,7,7,1,11,9,15,15,15,15,5,5,8,8,13,13,13,13,6,6,2,2,11,5,5,12,9,8,8,10,7,7~8,11,13,13,13,13,10,16,16,16,16,9,1,12,7,7,7,7,6,6,6,6,15,15,15,15,2,2,2,2,10,5,5,5,5,9,8,8,8,8,11~8,11,9,10,6,6,6,6,2,2,2,2,10,16,16,16,16,12,9,13,13,13,13,13,5,5,5,5,11,15,15,15,15,8,8,8,8,7,7,7,7",
        rt: "d",
        rtp: "96.50",
        s: "6,7,4,2,8,4,3,5,6,7,8,5,7,3,4,4,3,5,6,7",
        sa: "8,7,5,3,7",
        sb: "3,4,7,6,8",
        sc: "5.00,10.00,20.00,30.00,40.00,50.00,80.00,100.00,200.00,400.00,800.00,1500.00,2500.00",
        c: "50.00",
        defc: "50.00",
        scatters: "1~0,0,1,0,0~10,10,10,0,0~1,1,1,1,1",
        sh: "4",
        stime: new Date().getTime(),
        sver: "5",
        ver: "2",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;15~0,0,0,0,0~1,1,1,1,1;16~0,0,0,0,0~1,1,1,1,1",
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
        l: "40",
        na: "s",
        n_reel_set: "0",
        stime: new Date().getTime(),
        s: "9,4,12,11,12,12,4,11,10,10,4,12,4,7,5,4,2,4,7,5",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "4",
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
            result['psym'] = `1~${player.machine.scatterWin - player.machine.winMoney}~${player.machine.scatterPositions.join()}`;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0;
            result["fsres"] = 0;
            result["n_reel_set"] = 1;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bpw"] = player.machine.moneyBonusWin;
            result["bw"] = 1;
            result["e_aw"] = "0.00";
            result["n_reel_set"] = 0;
            result["rsb_c"] = 0;
            result["rsb_m"] = 3;    //             3             
            result["rsb_mu"] = "0";
            result["rsb_rt"] = "0";
            result["rsb_s"] = "13,14";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["n_reel_set"] = 1;

        if (player.machine.currentGame == "FREE") {
            result["tw"] = player.machine.freeSpinWinMoney + player.machine.freeSpinBeforeMoney;
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["tw"] = player.machine.freeSpinWinMoney;
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
        rsb_c: player.machine.moneyCacheIndex,
        rsb_m: "3",
        rsb_mu: player.machine.rsb_mu,
        rsb_s: "13,14",
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
        result["is"] = Util.view2String(player.machine.view);
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;
        result["na"] = "cb";
    }
    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        index: "3",
        wp: "0",
        coef: "1",
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