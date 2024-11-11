var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        accInit: `[{id:0,mask:"cp"},{id:2,mask:"cp;mp"},{id:3,mask:"cp;mp"}]`,
        balance_bonus: "0.00",
        balance_cash: "102,200.00",
        balance: "102,200.00",
        bonuses: "0",
        c: "200.00",
        cfgs: "1",
        counter: "2",
        def_s: "5,6,9,6,6,8,11,8,9,9,6,9,12,6,6,6,9,12,6,6",
        def_sa: "11,10,7,10,4",
        def_sb: "10,7,7,8,11",
        defc: "200.00",
        fsbonus: "",
        gameInfo: `{props:{max_rnd_sim:"1",max_rnd_hr:"981884",max_rnd_win:"4000"}}`,
        gmb: "0,0,0",
        index: "1",
        l: "12",
        mo_s: "7",
        mo_v: "24,60,120,180,240,300,600,48000",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;2400,240,60,6,0;1200,180,36,0,0;600,120,24,0,0;600,120,24,0,0;0,60,12,0,0;120,30,6,0,0;120,30,6,0,0;120,30,6,0,0;120,30,6,0,0;120,30,6,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        prg_cfg_m: "s",
        prg_cfg: "2",
        prg_m: "cp,tp,lvl",
        prg: "0,4,0",
        reel_set_size: "4",
        reel_set: "0",
        reel_set0: "9,1,5,8,7,10,9,8,11,9,7,3,7,7,7,7,11,7,12,6,11,7,5,9,6,6,4,5,8,4,11,7~12,7,8,4,6,11,5,1,7,7,7,12,7,9,7,10,3,10,6,8,5~5,4,7,6,11,10,9,7,7,7,8,9,7,12,3,10,6,7,1~4,7,7,6,9,11,1,7,7,7,12,5,9,6,7,5,3,8,8,10~4,5,10,9,6,9,10,5,6,1,7,6,7,7,7,3,8,7,12,9,11,8,5,7,8,7,4,12,11,7",
        reel_set1: "10,7,11,5,8,7,1,8,7,7,7,7,11,4,5,7,1,11,7,1,8,4~12,6,7,10,9,10,12,7,4,10,10,12,3,6,7,6,7,7,7,7,12,9,7,3,12,6,6,4,6,4,7,7,10,10,4,6,7,7~12,9,9,11,9,6,3,9,5,5,8,6,12,6,8,8,3,3,11,6,11,8,6,5,9,3,12,8,5,6,9,11,11,6,12~6,1,3,12,6,7,4,5,11,10,6,1,9,11,9,1,12,4,12,6,6,8,7,7,7,3,8,8,7,7,9,10,6,9,8,10,1,5,7,11,1,1,4,7,5,7,6,7,12~3,6,5,11,4,10,9,12,8,7,6,4,6,9,9,12,7,7,7,7,5,5,7,10,10,6,11,6,11,9,6,4,8,7,12,8,7,7",
        reel_set2: "10,3,7,4,3,7,4,4,9,6,7,10,12,6,6,7,6,7,7,7,12,7,10,3,12,9,6,7,10,7,12,7,12,10,7,6,6,12,10~11,11,7,10,8,8,7,1,5,4,7,8,7,11,7,7,7,1,7,1,1,4,5,7,10,4,11,7,11,5,7,1,5~5,6,9,3,6,3,11,6,12,5,9,9,3,6,3,8,11,12,1,8,1,5,11,12,12,11,1,9,9,5,9,1,11,1,8,6,1,8,6,6,8~8,7,10,5,8,7,9,12,12,4,6,8,10,9,6,9,8,5,7,7,7,11,7,3,7,6,9,12,6,7,5,6,11,4,3,7,11,7,10,4,6,12~3,12,7,11,8,10,6,6,7,11,10,7,12,8,7,7,7,4,5,6,12,6,9,4,8,5,11,10,7,9,7,9,6",
        reel_set3: "12,4,12,10,7,8,6,3,8,11,4,12,10,7,7,7,7,10,12,5,8,9,10,7,12,11,9,8,10,8,6~11,10,4,6,11,9,5,11,3,11,7,7,11,12,10,9,5,12,3,8,9,9,8,7,9~4,10,12,3,6,6,7,10,4,7,9,12,4,8,5,11,11,7,4,5,9,7,8,6,6,5,5~7,6,5,4,5,3,6,3,8,10,7,11,5,9,12,6,7,4~6,11,3,7,9,8,4,12,10,7,5,7",
        rt: "d",
        rtp: "96.71",
        s: "5,6,9,6,6,8,11,8,9,9,6,9,12,6,6,6,9,12,6,6",
        sa: "11,10,7,10,4",
        sb: "10,7,7,8,11",
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        scatters: "1~0,0,0,0,0~20,15,10,0,0~1,1,1,1,1",
        sh: "4",
        stime: "1630994912604",
        sver: "5",
        ver: "2",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        wl_i: "tbm~4000",
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
        l: 12,
        mo_t: "",
        mo: "",
        na: "s",
        prg_m: "cp,lvl,tp",
        prg: "0,0,4",
        reel_set: 0,
        s: Util.view2String(player.machine.view),
        sa: "5,4,7,6,11",
        sb: "9,12,7,11,8",
        sh: 4,
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
    result["mo"] = player.machine.moneyCache.values;
    result["mo_t"] = player.machine.moneyCache.table;

    if (player.machine.fishMatchWinLine != "") {
        result["np_l"] = player.machine.fishMatchWinLine;
    }
    if (player.machine.mo_wpos != "") {
        result["mo_wpos"] = player.machine.mo_wpos;
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
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 3;
        result["acci"] = "0;2;3";
        result["accm"] = "cp;cp~mp;cp~mp";

        // TODO
        var freeSpinLevel = player.machine.freeRespinLevel - 1;
        result["accv"] = `${player.machine.freeSpinWildCount};0~1;${player.machine.freeSpinCounter * 3}~100`;
        result["prg"] = `${player.machine.freeSpinWildCount},${freeSpinLevel},${(freeSpinLevel + 1) * 4}`;

        if (player.machine.trail.length > 0) {
            result["trail"] = player.machine.trail;
        }
        if (player.machine.maskView.length > 0) {
            result["is"] = Util.view2String(player.machine.maskView);
        }
        if (player.machine.stf.length > 0) {
            result["stf"] = player.machine.stf;
        }
        if (player.machine.srf.length > 0) {
            result["srf"] = player.machine.srf.join(';');
        }

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

            if (player.machine.moneyTotalValue > 0) {
                result["mo_c"] = 1;
                result["mo_tv"] = player.machine.moneyTotalValue;
                result["mo_tw"] = player.machine.moneyTotalValue * player.betPerLine;
                result["mo_wpos"] = player.machine.mo_wpos;
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

module.exports = ApiManager;