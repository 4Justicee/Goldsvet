var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "12,12,12,12,12",
        as_s: "3,4,5,6,7,8,9,10,11",
        as_sh: "3",
        balance: "0.00",
        cfgs: "3459",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "3,6,7,7,7",
        def_sa: "5,8,9,6,6",
        reel_set: "0",
        prg_cfg_m: "clc,mlc",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        as_paytable: "1~40;2~100;3~200;4~300;5~600;6~2000;8~8000",
        stime: "1646037132524",
        sa: "5,8,9,6,6",
        sb: "3,6,7,7,7",
        prg_cfg: "0,8",
        sc: "10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "1",
        wilds: "2~0,0,0,0,0,0~1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        as_def_s: "3,4,5,6,7,8,9,10,11",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "95.51",
        reel_set0: "12,3,12,4,12,5,12,6,12,7,12,8,12,9,12,10,12,11,12,10,12,6,12,6,12,6,12,6,12,5,12,7,12,7,12,8,12,10,12,10,12,9,12,11,12,11,12,10,12,10,12,6,12,6,12,6,12,6,12,6,12,7,12,7,12,8,12,10,12,10,12,9,12,10,12,10,12,10,12,10,12,12,6,12,6,12,6,12,6,12,6,12,7,12,7,12,8,12,10,12,10,12,9,12,10,12,10,12,10,12,10,12,6,12,6,12,6,12,6,12,12,6,12,7,12,7,12,8,12,10,12,10,12,9,12,10,12,10,12,10,12,10,12,8,12~12,6,12,7,12,9,12,9,12,9,12,9,12,4,12,11,12,11,12,11,12,8,12,8,12,8,12,8,12,5,12,12,6,12,9,12,9,12,10,12,9,12,9,12,11,12,11,12,11,12,11,12,8,12,8,12,8,12,8,12,8,12,6,12,9,12,9,12,9,12,9,12,9,12,11,12,11,12,11,12,11,12,12,8,12,8,12,8,12,8,12,8,12,6,12,5,12,9,12,9,12,9,12,9,12,11,12,11,12,11,12,11,12,8,12,8,12,8,12,8,12,12,8,12,6,12,5,12,9,12,9,12,9,12,9,12,11,12,11,12,11,12,11,12,8,12,8~12,7,12,7,12,9,12,6,12,6,12,6,12,6,12,6,12,6,12,4,12,7,12,7,12,9,12,9,12,5,12,12,9,12,7,12,8,12,10,12,5,12,5,12,6,12,11,12,8,12,6,12,9,12,9,12,9,12,9,12,9,12,9,12,7,12,8,12,5,12,6,12,6,12,6,12,6,12,6,12,6,12,12,9,12,9,12,9,12,9,12,9,12,5,12,5,12,8,12,5,12,5,12,5,12,6,12,6,12,6,12,6,12,9,12,9,12,9,12,9,12,12,9,12,5,12,5,12,8,12,5,12,8,12,5,12,6,12,6,12,6,12,6,12,9,12,9~12,7,12,9,12,5,12,10,12,10,12,10,12,4,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,12,9,12,9,12,9,12,8,12,10,12,10,12,5,12,11,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,9,12,9,12,9,12,10,12,10,12,10,12,5,12,6,12,6,12,5,12,12,6,12,6,12,6,12,6,12,6,12,5,12,9,12,9,12,10,12,10,12,10,12,5,12,6,12,6,12,5,12,6,12,6,12,6,12,6,12,12,6,12,5,12,9,12,9,12,10,12,10,12,10,12,5,12,8,12,8,12,5,12,6~12,7,12,5,12,9,12,10,12,4,12,10,12,5,12,5,12,5,12,5,12,5,12,6,12,6,12,6,12,6,12,12,7,12,8,12,9,12,10,12,8,12,10,12,5,12,11,12,5,12,5,12,6,12,6,12,6,12,6,12,6,12,7,12,8,12,9,12,10,12,8,12,10,12,5,12,5,12,5,12,5,12,12,6,12,6,12,6,12,6,12,6,12,7,12,8,12,9,12,10,12,8,12,10,12,5,12,8,12,8,12,5,12,6,12,6,12,6,12,6,12,12,6,12,7,12,8,12,9,12,10,12,8,12,10,12,5,12,5,12,8,12,8,12,6",
        s: "12,12,12,12,12",
        reel_set1: "12,3,12,4,12,5,12,6,12,7,12,8,12,9,12,10,12,11,12,10,12,6,12,6,12,6,12,6,12,5,12,11,12,7,12,8,12,10,12,10,12,9,12,11,12,11,12,10,12,10,12,6,12,6,12,6,12,6,12,6,12,7,12,7,12,8,12,10,12,10,12,9,12,10,12,10,12,10,12,10,12,12,6,12,6,12,6,12,6,12,6,12,7,12,7,12,8,12,10,12,10,12,9~12,6,12,11,12,9,12,9,12,9,12,9,12,4,12,11,12,11,12,11,12,8,12,8,12,8,12,8,12,5,12,12,6,12,9,12,9,12,10,12,9,12,9,12,11,12,11,12,11,12,11,12,8,12,8,12,8,12,8,12,8,12,6,12,9,12,9,12,9,12,9,12,9,12,11,12,11,12,11,12,11,12,12,8,12,8,12,8,12,8,12,8,12,6,12,5,12,9,12,9,12,9,12,9~12,7,12,11,12,9,12,11,12,6,12,6,12,11,12,6,12,6,12,4,12,7,12,11,12,9,12,9,12,5,12,12,9,12,11,12,8,12,10,12,5,12,5,12,6,12,11,12,8,12,6,12,9,12,9,12,9,12,9,12,9,12,9,12,3,12,8,12,5,12,6,12,6,12,6,12,6,12,6,12,6,12,12,9,12,9,12,9,12,9,12,9,12,5,12,5,12,8,12,5,12,5,12~12,7,12,9,12,5,12,10,12,10,12,10,12,4,12,6,12,6,12,4,12,6,12,6,12,6,12,6,12,6,12,12,9,12,9,12,9,12,8,12,10,12,10,12,5,12,11,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,9,12,9,12,9,12,10,12,10,12,10,12,5,12,6,12,6,12,5,12,12,6,12,6,12,6,12,6,12,6,12,5,12,9,12,9,12,10,12~12,7,12,5,12,9,12,10,12,4,12,10,12,5,12,5,12,5,12,5,12,5,12,4,12,6,12,6,12,6,12,12,11,12,8,12,9,12,10,12,8,12,10,12,5,12,11,12,5,12,5,12,6,12,6,12,6,12,6,12,6,12,7,12,8,12,9,12,10,12,8,12,10,12,5,12,5,12,5,12,5,12,12,6,12,6,12,6,12,6,12,6,12,3,12,8,12,9,12,10,12,8",
        as_paytable_m: "c~p;c~p;c~p;c~p;c~p;c~p;c~p",
    };

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
        balance_bonus: 0,
        balance_cash: player.balance,
        balance: player.balance,
        c: param.c,
        l: param.l,
        counter: ++param.counter,
        index: param.index,
        as_s: player.machine.topView.join(),
        as_sh: 3,
        s: player.machine.belowView.join(),
        sa: player.machine.virtualReels.above,
        sb: player.machine.virtualReels.below,
        sh: 1,
        stime: new Date().getTime(),
        sver: "5",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
        prg_m: "clc,mlc",
        prg: `${player.machine.topWinLines.length},8`,
    };

    if (player.machine.highlightSymbolsForApi.length > 0) {

        result["as_srf"] = player.machine.highlightSymbolsForApi.join(';');
    }

    for (var i = 0; i < player.machine.topWinLines.length; i++) {

        result[`as_l${i}`] = player.machine.topWinLines[i];
    }

    if (player.machine.prevRespinStatus == "NORESPIN") {

        result["as_is"] = player.machine.prevTopView;
        result["reel_set"] = 0;
        result["na"] = "s";

        if (player.machine.respinStatus == "RESPIN") {

            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = 0;
            result["rs"] = "mc";

        }

    } else if (player.machine.prevRespinStatus == "RESPIN") {

        if (player.machine.respinStatus == "NORESPIN") {

            result["as_lcw"] = player.machine.winMoney;
            result["as_lc"] = player.machine.topWinLines.length;
            result["reel_set"] = 1;
            if (player.machine.winMoney > 0) {
                result["na"] = "c";
            } else {
                result["na"] = "s";
            }
            result["rs_t"] = player.machine.repspinIndex;
            result["rs_win"] = player.machine.winMoney;

        } else if (player.machine.respinStatus == "RESPIN") {

            result["as_is"] = player.machine.prevTopView;
            result["na"] = "s";
            result["reel_set"] = 0;
            result["rs_c"] = 1 + player.machine.repspinIndex;
            result["rs_m"] = 1 + player.machine.repspinIndex;
            result["rs_p"] = player.machine.repspinIndex;
            result["rs"] = "mc";
            result["rs_more"] = 1;
            result["rs_win"] = 0;
        }

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

module.exports = ApiManager;