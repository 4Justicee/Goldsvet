var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,7,4,2,8,4,3,5,6,7,8,5,7,3,4,4,3,5,6,7",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        mo_s: "13",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "3,4,7,6,8",
        mo_v: "2,4,8,12,16,20,40,60,80,100,160,200,240,300,400,1000,4000,20000",
        reel_set_size: "2",
        def_sa: "8,7,5,3,7",
        reel_set: "0",
        mo_jp: "1000;4000;20000",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: `{rtps:{purchase:"96.45",regular:"96.48"},props:{max_rnd_sim:"1",max_rnd_hr:"18248200",max_rnd_win:"15000"}}`,
        wl_i: "tbm~15000",
        mo_jp_mask: "jp3;jp2;jp1",
        stime: "1649379315893",
        sa: "8,7,5,3,7",
        sb: "3,4,7,6,8",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;250,50,10,2,0;250,50,10,2,0;150,25,10,1,0;150,25,10,1,0;100,20,6,1,0;100,20,6,1,0;40,10,4,0,0;40,10,4,0,0;20,8,4,0,0;20,8,4,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.48",
        total_bet_max: "10,000,000.00",
        reel_set0: "11,8,8,3,9,5,7,5,3,3,3,4,10,6,6,6,4,8,8,10,6,11,7,11,6,13,13,13,10,6,3,11,7,12,6,13,4,4,4~13,13,13,11,3,2,2,2,11,5,10,3,3,3,13,9,3,3,13,9,7,5,13,2,4,4,4,6,9,2,12,8~3,3,3,13,9,7,9,8,4,13,13,13,5,10,12,13,8,8,8,6,2,2,2,4,4,4,5,5,12,5,11,5,2,11,11,10,6,3,12,7,8,8~5,5,5,11,4,4,4,10,7,7,7,13,3,3,3,13,13,13,13,8,8,8,4,5,5,13,4,9,5,11,5,10,9,4,10,2,2,2,12,9,9,6,6,6,8,9,2,10~8,8,8,8,6,6,9,4,7,7,7,9,9,6,9,8,13,13,13,9,12,5,5,5,13,4,4,4,9,3,3,3,11,10,5,9,5,10,9,11,5,3,5,9,4,9,3,11,3,13,6,6,6,2,2,2",
        s: "6,7,4,2,8,4,3,5,6,7,8,5,7,3,4,4,3,5,6,7",
        reel_set1: "3,7,3,3,3,5,7,5,5,3,3,5,5,3,7,3,7,7,7,5,5,5,3,9,11~8,8,8,10,12,4,6,6,6,6,4,6,4,4,4,6,6,6,4,6,6,4,4,4,4~8,9,10,11,12,4,6,5,7,7,3,3,3,5,4,4,4,5,4,5,7,3,7,4,4,5,5,3,7,4,3,3,7,3,7,7,5,3,7,6~8,8,8,9,10,11,12,6,6,4,4,4,4,7,5,6,4,6,6,6,5,5,5,4,4,4,7,7,7,3,3,3,7,4,6,4,4,3,4,7,4,7,3,4,5,6,7,6,4,5~8,8,8,4,4,4,5,4,3,3,3,6,6,5,7,6,6,3,4,5,5,5,6,3,7,7,6,6,6,5,6,4,5,4,3,6,5,7,7,7,7,6,6,6,4,9,10,11,12",
        purInit: `[{type:"wbg",bet:2000,game_ids:[2]}]`,
        total_bet_min: "10.00",
    };
    //              api            
    if (player.lastPattern) {
        for (var key in player.lastPattern) {
            result[key] = player.lastPattern[key];
        }
        if (player.machine.gameSort != "BONUS" && player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bmo"] = result["mo"];
            result["bmo_t"] = result["mo_t"];
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
        balance_bonus: `0.00`,
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: `20`,
        ls: "0",
        na: (player.machine.winMoney > 0) ? `c` : `s`,
        reel_set: `0`,
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: `4`,
        sver: `5`,  ///          
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS") {
            result["bgid"] = 0;
            result["bgt"] = 49;
            result["bmo_t"] = player.machine.moneyCache.table.join();
            result["bmo"] = player.machine.moneyCache.values.join();
            result["bpw"] = player.machine.moneyBonusWin;
            result["bw"] = 1;
            result["coef"] = player.betPerLine;
            result["e_aw"] = "0.00";
            result["end"] = 0;
            result["na"] = "b";
            result["rs_s"] = Util.view2String(player.machine.view.map((item) => (item === 13) ? 13 : 14));
            result["rsb_c"] = 0;
            result["rsb_m"] = 3;
            result["rsb_mu"] = 0;
            result["rsb_rt"] = 0;
            result["wp"] = player.machine.moneyBonusWin / player.betPerLine;
        }
    }

    if (player.machine.moneyCache) {
        result["mo_t"] = player.machine.moneyCache.table.join();
        result["mo"] = player.machine.moneyCache.values.join();
    }

    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        index: param.index,
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
    };

    return result;
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: `0.00`,
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        e_aw: `0`,
        index: param.index,
        na: `b`,
        stime: new Date().getTime(),
        sver: `5`,
    }

    result.bmo_t = player.machine.moneyCache.table.join();
    result.bmo = player.machine.moneyCache.values.join();
    result.rsb_c = player.machine.moneyBonusCache.count;
    result.rsb_m = 3;
    result.rsb_mu = player.machine.rsb_mu;
    result.rsb_rt = "0";
    result.rs_s = Util.view2String(player.machine.view.map((item) => (item === 13) ? 13 : 14));
    result.bpw = player.machine.moneyBonusWin;
    result.coef = player.betPerLine;
    result.wp = player.machine.moneyBonusWin / result.coef;

    if (player.machine.currentGame == "BASE") {
        //                    
        result.bpw = 0;
        result.rw = player.machine.moneyBonusWin;
        result.tw = player.machine.moneyBonusWin;
        result.na = "cb";
        result.end = 1;
    }

    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance: player.balance,
        balance_cash: player.balance,
        na: "s",
        rw: player.machine.moneyBonusWin,
        stime: new Date().getTime(),
        sver: "5",
        counter: ++param.counter,
        index: param.index,
        wp: "0",
        coef: player.betPerLine,
    };

    return result;
}

module.exports = ApiManager;