var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "4,8,4,4,4,4,5,9,5,5,5,5,6,10,6,6,6,6,7,11,7,7,7,7",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "15,14,12,5,6,11",
        reel_set_size: "12",
        def_sa: "12,13,12,14,15,11",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0~24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,0,0~1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"71428571\",max_rnd_win:\"7000\"}}",
        stime: "1645604491697",
        sa: "12,13,12,14,15,11",
        sb: "15,14,12,5,6,11",
        reel_set10: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        reel_set11: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4",
        sh: "4",
        wilds: "2~0,0,0,0,0,0~1,1,1,1,1,1;3~0,0,0,0,0,0~1,1,1,1,1,1;17~0,0,0,0,0,0~1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;300,150,40,20,0,0;200,60,24,16,0,0;100,40,20,12,0,0;100,40,20,12,0,0;60,30,12,8,0,0;60,30,12,8,0,0;40,16,6,4,0,0;40,16,6,4,0,0;30,10,4,2,0,0;30,10,4,2,0,0;20,8,2,1,0,0;20,8,2,1,0,0;0,0,0,0,0,0;0,0,0,0,0,0",
        l: "20",
        rtp: "94.50",
        total_bet_max: "7,500,000.00",
        reel_set0: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        s: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9",
        accInit: "[{id:0,mask:\"cp;mp\"}]",
        reel_set2: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        t: "243",
        reel_set1: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        reel_set4: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        purInit: "[{type:\"fs\",bet:1500}]",
        reel_set3: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        reel_set6: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        reel_set5: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        reel_set8: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        reel_set7: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,1,14,8,11,9,5,4",
        reel_set9: "12,9,15,12,13,6,4,11,10,14,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,3,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4~12,9,15,12,13,6,4,11,10,14,2,6,15,6,15,7,13,12,5,14,11,5,13,8,4,10,7,9,7,10,8,14,8,11,9,5,4",
        total_bet_min: "10.00"
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
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "20",
        na: "s",
        reel_set: 1,
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "4",
        stime: new Date().getTime(),
        sver: "5",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    //                                 
    var winLines = player.machine.winLines;
    result["wlc_v"] = winLines.join(';')

    if (player.machine.wlm_p.length > 0) {
        result["wlm_p"] = player.machine.wlm_p.join();
    }
    if (player.machine.wlm_v.length > 0) {
        result["wlm_v"] = player.machine.wlm_v.join();
    }

    if (player.machine.rocketFlag) {
        result["is"] = player.machine.rocketView.join();
        result["rwd"] = player.machine.rwd;
        result["srf"] = player.machine.srf;
        result["s"] = player.machine.view.join();
        if (player.machine.wlm_p.length > 0) {
            result["wlm_p"] = player.machine.wlm_p.join();
        }
        if (player.machine.wlm_v.length > 0) {
            result["wlm_v"] = player.machine.wlm_v.join();
        }
    }

    if (player.machine.prevTumbleStatus == "NOTUMBLE" && player.machine.tumbleStatus == "TUMBLE") {
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "mc";
        result["tmb"] = player.machine.tumbles;
        result["tmb_win"] = player.machine.tmb_win;

    }

    if (player.machine.currentGame != "FREE" && player.machine.prevTumbleStatus == "TUMBLE") {
        result["na"] = "s";
        result["tw"] = player.machine.tmb_res;
        result["w"] = player.machine.tmb_win;

        if (player.machine.tumbleStatus == "TUMBLE") {
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.tumbleIndex;
            result["rs"] = "mc";
            result["tmb"] = player.machine.tumbles;
            result["tmb_win"] = player.machine.tmb_res;
        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["rs_t"] = player.machine.tumbleIndex;
            result["w"] = 0;
            result["tmb_res"] = player.machine.tmb_res;
            result["tmb_win"] = player.machine.tmb_res;
            result["na"] = "c";
        }
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREESPINCOUNT") {
            result["rs_c"] = player.machine.freeSpinCntIndex;
            result["rs_m"] = player.machine.freeSpinCntIndex;
            result["rs_p"] = player.machine.freeSpinCntIndex - 1;
            result["s"] = player.machine.view;
            result["rs"] = "mc";
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREESPINCOUNT") {
        result["acci"] = 0;
        result["accm"] = "cp";
        result["rs_more"] = "1";
        result["accv"] = player.machine.freeSpinCntIndex;
        if (player.machine.currentGame == "FREESPINCOUNT") {
            result["rs_c"] = player.machine.freeSpinCntIndex;
            result["rs_m"] = player.machine.freeSpinCntIndex;
            result["rs_p"] = player.machine.freeSpinCntIndex - 1;
            result["is"] = player.machine.isScatterView;
            result["s"] = player.machine.view;
            result["rwd"] = player.machine.rwd;
            result["rs"] = "mc";
            result["puri"] = 0;
            result["purtr"] = 1;
            result["na"] = "s";
        } else if (player.machine.currentGame == "FREE") {
            result["s"] = player.machine.view;
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = "0.00";
            result["fsres"] = "0.00";
            result["rs_t"] = 3;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.tumbleStatus == "TUMBLE") {
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.tumbleIndex;
            result["rs"] = "mc";
            result["tmb"] = player.machine.tumbles;
            result["tmb_win"] = player.machine.tmb_res;
            result["tw"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.tmb_win;

        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["rs_t"] = player.machine.tumbleIndex;
            result["w"] = 0;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsend_total"] = 0;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
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

module.exports = ApiManager;
