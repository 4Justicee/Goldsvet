var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        acci: 0,
        accInit: `[{id:0,mask:"cp;mp"}]`,
        accm: "cp",
        accv: "0",
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bl: "0",
        bls: "20,25",
        bonuses: "0",
        c: "100.00",
        cfgs: "1",
        counter: "2",
        def_s: "9,5,11,10,10,9,9,5,11,10,10,9,8,8,4,11,4,8,8,8,4,11,4,8,11,3,7,5,9,10",
        def_sa: "4,10,8,8,6,11",
        def_sb: "11,3,7,5,9,10",
        defc: "100.00",
        fsbonus: "",
        gameInfo: `{rtps:{ante:"96.50",purchase:"96.50",regular:"96.50"},props:{max_rnd_sim:"1",max_rnd_hr:"697350",max_rnd_win:"5000",max_rnd_win_a:"4000"}}`,
        gmb: "0,0,0",
        index: "1",
        l: "20",
        na: "s",
        paytable: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,500,500,200,200,0,0,0,0,0,0,0;500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,200,200,50,50,0,0,0,0,0,0,0;300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,100,100,40,40,0,0,0,0,0,0,0;240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,40,40,30,30,0,0,0,0,0,0,0;200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,30,30,20,20,0,0,0,0,0,0,0;160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,24,24,16,16,0,0,0,0,0,0,0;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,20,20,10,10,0,0,0,0,0,0,0;80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,18,18,8,8,0,0,0,0,0,0,0;40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,15,15,5,5,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
        prm: "12~2,3,4,5,6,8,10,12,15,20,25,50,100,250,500",
        purInit: `[{type:"fsbl",bet:2000,bet_level:0}]`,
        reel_set_size: 8,
        reel_set: 0,
        reel_set0: "3,1,10,11,9,7,5,11,11,11,4,10,10,10,8,6,8,8,8,1,8,5,4,8,5,1,10,1,8,4,10,1,8~11,11,11,5,7,8,4,1,10,10,10,10,11,9,3,9,9,9,6,4,10,4,9,4,10,4,10,4,6,1,9,3,9,4,3,4,9,6,9,3,10,1,10,1,3,8,10,3,10,1,9,6,3,6~5,5,5,5,1,4,8,6,8,8,8,3,7,7,7,9,7,11,10,7,8,6,7,4,6,8,11,10,4,11,7,8,6,4,11,8,7,11,10,8,4,9,6,7,8,11,7,4,9,11,8,6,8,11,7,8~4,9,7,10,10,10,6,3,3,3,10,8,7,7,7,1,11,3,5,6,6,6,10,7,11,10,5,6,10,7,10,1,7,6,3,6,1,3,1,7,10~7,8,5,10,3,9,11,8,8,8,4,9,9,9,6,1,4,4,4,7,7,7,11,11,11,8,11,9,3,1,8,3,9,6,8,6,9,6,9,11,9,11,8,6,4,9,8,9,1,8,9,8,9,4,1,11,9,8,1,6,8,9,8~6,6,6,6,9,9,9,11,5,8,3,10,10,10,7,4,10,11,11,11,9,1,4,4,4,8,10,9,11,4,8,11,4,10,11,9,5,8,4,8,4,10,9,4,9,5,9,11,7,11,9",
        reel_set1: "6,5,8,3,11,1,7,10,4,9,5,10,4,9,10,9,7,10,5,9,5,10,7,10,4,10,7,4,5,9,5,10~5,1,6,7,8,10,9,3,4,11,8,9,4,7,9,4,6,8,11,3,6,10,3,9,8,10,8,11,6,9,1,7,6,7,11,6,11,4,11,7,11,9,6,4,8,3,11,1,9,7,10,11,4,11,3,4,9,11,9,8~10,1,8,11,9,5,6,4,3,7,8,11,6,11,4,11,6,7,5,8,7,11,3~10,4,5,8,8,8,1,8,3,7,11,9,6,9,3,8,4,7,8,3,8,3,9,1,9,7,8,9,8,11,9,1,9,7,8,11,3,7,8,1,7,8~3,9,8,6,5,10,11,1,4,7,4,5,4,1,4,8,5,4,5,7,5,9,11,10,5,10,6,10,4,10,7,5,10,6,7,9,10,5,10,7,1,11,5,10,9,4,8,10,1,4,5,4,10~9,9,9,9,3,1,8,4,10,7,5,11,6,3,8,3,4,3,5,8,3,11,3,5,3,11,3,11,3,1,3,5,3,7,4,5,3,5,8,11",
        reel_set2: "4,5,7,11,11,11,6,9,10,10,10,3,8,8,8,8,10,11,12,10,8,6,11,6,11,6,10,11~6,9,9,9,12,10,11,11,11,4,9,7,5,4,4,4,8,11,3,10,10,10,3,8,7,11,9,11,3,11,4,8,3,4,9,12,8,11,9,11,9,12,11,10,3,9,12,9,8,10,4,11,9,12,7,9,7,8,11,4~8,8,8,7,5,5,5,5,7,7,7,12,4,11,3,6,9,8,10,7,5,10,5,12,7,10,7,3,10,7,5,7,11,10,6,5,10,5,7,12,10,12,11,10,3,5,10,5,11,5,7,10,5,11,5,7,12,3,7,3,7,10~12,6,6,6,8,6,10,11,7,7,7,7,9,3,3,3,3,4,5,10,10,10,6,10,3,10~12,10,8,9,11,11,11,11,5,6,7,9,9,9,3,4,8,8,8,7,7,7,4,4,4,9,11,9,7,9,7,6~4,4,4,4,8,11,11,11,12,7,10,10,10,9,5,3,10,6,11,6,6,6,9,9,9,7,5,6,10,6,5,9,10,12,6,3,7,10,11,10,7,9,12,6",
        reel_set3: "8,8,8,7,9,10,10,10,11,8,11,11,11,4,12,6,1,5,3,10,1,10,9,10,11,10,11,1,11,10,11,4,1,4,11,6,12,11,10,11,10~4,9,9,9,9,6,11,11,11,1,3,10,10,10,5,12,8,10,7,11,12,1,8,9,11,12,9,11,10,12,9,6,9,11,5,12,9,11,12,11,12,9,11,10,11,5,9,1,10,9,11,5,11,5,12,9,11,5,1,12,9,11~5,5,5,6,8,8,8,12,7,7,7,8,7,10,4,11,3,5,9,1,11,9,7~1,5,12,6,6,6,4,7,7,7,9,11,3,3,3,10,10,10,10,8,6,3,7,6,9,3,10,3,9,7,11,3,10,9,10,6,11,10,7,3,6,3,6,7,10,6,3,8,3,9,7,10~4,1,7,11,11,11,10,8,9,9,9,6,9,11,12,3,5,8,8,8,7,7,7,4,4,4,1,7,9,5,9,7,12,6,8,12,9,8,11,7,8,10,11,8,11,7~10,6,5,9,6,6,6,1,4,8,7,12,3,11,9,9,9,10,10,10,4,4,4,11,11,11,4,5,3,6,1",
        reel_set4: "10,11,11,11,8,10,10,10,7,8,8,8,3,11,4,9,6,12,5,7,8,11,8,11,7,8,11,4,11,4,7,8,5,8,7,6,7,11~3,10,10,10,11,9,9,9,4,12,11,11,11,5,7,8,6,10,9,10,11,9,11,10,6,10,9,11,9,10,11,5~5,11,8,8,8,9,12,7,7,7,6,3,5,5,5,7,8,4,10,7,12,8,7,6,7,10,8,12,7,8,12,11,7,8,10,8,7~6,6,6,5,10,6,11,10,10,10,8,7,4,12,3,7,7,7,9,3,3,3,8,12,10,7,3,9,3,4,3,8,7,5,3,10,4,10,3,5,3,10,12,11,7,10,3~5,7,9,9,9,3,12,6,10,11,4,8,9,11,11,11,8,8,8,4,4,4,7,7,7,9,6,7,11,4,10,12,11,8,9,7,4,3,4,7,9,4,11,4,12,9,4,12~9,10,10,10,6,4,4,4,12,7,5,6,6,6,8,4,9,9,9,11,10,3,11,11,11,7,4,8,4,12,7,11,3,11,12,6,11,5,3,7,5,10,12,4,10,5,12,10,6,11",
        reel_set5: "10,10,10,9,10,7,12,4,3,5,5,5,5,11,8,6,6,6,6,4,4,4,3,3,3,7,7,7,9,9,9,8,8,8,11,11,11,4,5,6,5,4,3,7,6,3,7,4,6,4,5,3,11,5,6,5,4,6,3,5,4,6,4,3,11,4,5,4,5,4,5,7,5,11,4,11,3,4,6,7,6,9,12~4,4,4,9,5,10,9,9,9,11,11,11,11,3,6,6,6,7,6,3,3,3,4,7,7,7,12,8,8,8,8,10,10,10,5,5,5,3,5,6,3~10,6,6,6,11,8,5,9,6,4,12,3,7,7,7,7,3,3,3,5,5,5,9,9,9,10,10,10,8,8,8,11,11,11,4,4,4,3,5,3,9,6,3,6,8,5,11,4,7,4,3,11,6,5,11,3,6,9,3,11,3,5,11,4,9,6,3,4,6,5,3,7,5,7,11,8,4,11,6,3,5,4~5,12,3,3,3,10,4,6,8,7,11,9,3,9,9,9,7,7,7,8,8,8,5,5,5,10,10,10,11,11,11,6,6,6,4,4,4,8,4,3,10,11,3,10,9,10,3,6,8,10,9,11,9,6,9,8,3,4,8,11,10,8,11,8,11,3,9,3,9,8,10,7,9,8,10,8,11,8,7,3,4,3,11,3,8,6,10,3,4,3,8~3,7,7,7,7,9,5,3,3,3,6,4,12,10,10,10,8,10,9,9,9,11,11,11,11,4,4,4,6,6,6,5,5,5,8,8,8,9,4~8,4,3,3,3,3,5,6,6,6,11,9,9,9,7,6,8,8,8,9,10,10,10,12,10,11,11,11,5,5,5,7,7,7,4,4,4,11,4,6,9,3,5,3,7,3,12,5,3,9,11,3,9,6,4,6,3,4,3,5,4,5,7,4,11,3,7,5,3,9,6,9,4,12",
        reel_set6: "7,8,4,9,3,6,11,10,5,6,10,6,11,3,5,6,10,6,3,10,11,8,4,11,6,10,4,8,3,6,9~10,9,4,3,6,8,7,5,11,5,11,4,3,4~11,5,3,6,9,10,8,7,4,9,3,9,4,9~4,7,5,6,9,3,8,11,10,8,10,8,10,5,10,9,10~11,9,7,8,10,4,5,6,3,8,9,5,7,9,5,4,10,6,4~10,4,5,8,6,7,3,11,9,8,3",
        reel_set7: "7,3,10,5,9,4,8,1,11,6,4,11,3,4,9,4,8,10,8,10,9,8,3,4,11,4~10,9,4,8,11,1,5,3,7,6,9,5,11,6,11,7,11,8,7,11,6,7,9,3,11,4,7,8,6~8,6,7,5,11,9,10,1,4,11,11,11,3,6,7,3,7,3,11,7,5,11,5,10,4~4,8,11,9,7,3,1,6,5,10,7,8,10,1,5,10,6,10,1,7,6,10,1,8,6,10,6,7,10,8,6,7,10,6,10,7,1,6,10,8,7,8,10,6,10,11,6,10,8,6,11,7,10,6,7,6~4,11,3,6,7,1,10,8,9,5,3,10,1,3,7,10,7,11,3,5,7,10,1,3,10,3,10,7~9,9,9,11,8,9,7,5,3,1,10,6,4,8,3,11,8,5",
        rt: "d",
        rtp: "96.50",
        s: "9,5,11,10,10,9,9,5,11,10,10,9,8,8,4,11,4,8,8,8,4,11,4,8,11,3,7,5,9,10",
        sa: "4,10,8,8,6,11",
        sb: "11,3,7,5,9,10",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        scatters: "1~2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,100,60,0,0,0~15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,0~1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1",
        sh: "5",
        stime: "1629939208592",
        sver: "5",
        t: "symbol_count",
        total_bet_max: "10,000,000.00",
        total_bet_min: "10.00",
        wilds: "2~0,0,0,0,0,0~1,1,1,1,1,1",
        wl_i: "tbm~5000;tbm_a~4000",
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
        acci: "0",
        accm: "cp",
        accv: "0",
        balance_bonus: "0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bl: "0",
        c: "100.00",
        counter: "1",
        index: "1",
        l: "20",
        na: "s",
        reel_set: 1,
        s: "6,6,7,3,10,10,6,6,8,7,11,8,11,11,8,7,7,5,8,10,11,10,1,6,8,8,7,10,9,11",
        sa: "7,9,10,11,5,7",
        sb: "9,8,8,1,10,10",
        sh: "5",
        stime: new Date().getTime(),
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

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    if (player.machine.tumbleMulti > 1) {
        result["accv"] = player.machine.tumbleMulti;
    }
    if (player.machine.rmul.length > 0) {
        result["rmul"] = player.machine.rmul;
    }
    if (player.machine.tmb.length > 0) {
        result["tmb"] = player.machine.tmb;
    }
    if (player.machine.winMoney > 0) {
        result["tmb_win"] = player.machine.tmb_win;
    }

    if (player.machine.apwa > 0) {
        result["accv"] = player.machine.freeSpinMulti;
        result["apt"] = "tumbling_win_mul";
        result["apv"] = player.machine.freeSpinMulti;
        result["apwa"] = player.machine.apwa;
    }

    if (player.machine.prevTumbleStatus == "NOTUMBLE" && player.machine.tumbleStatus == "TUMBLE") {
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "mc";

    }
    if (player.machine.prevTumbleStatus == "TUMBLE") {
        result["na"] = "s";
        result["tw"] = player.machine.tmb_win;
        if (player.machine.tumbleStatus == "TUMBLE") {
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.tumbleIndex;
            result["rs"] = "mc";
        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["rs_t"] = player.machine.tumbleIndex;
            result["tw"] = player.machine.tmb_res;
            result["w"] = player.machine.winMoney;
            result["na"] = "c";
        }
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = "0.00";
            result["fsres"] = "0.00";
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(',')}`;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
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
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
        }
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

module.exports = ApiManager;