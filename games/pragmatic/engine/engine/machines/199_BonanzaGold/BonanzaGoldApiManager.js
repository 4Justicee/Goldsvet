var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,8,4,8,1,10,6,10,5,7,8,9,6,9,8,7,4,5,3,4,3,8,4,8,1,10,6,10,5,7",
        prg_m: "wm",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        prg: "1",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "5",
        def_sb: "5,10,11,8,1,7",
        prm: "12~2,3,4,5,6,8,10,12,15,20,25,50,100;12~2,3,4,5,6,8,10,12,15,20,25,50,100;12~2,3,4,5,6,8,10,12,15,20,25,50,100",
        def_sa: "8,3,4,3,11,3",
        reel_set: "0",
        prg_cfg_m: "wm",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,100,60,0,0,0~10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0,0,0~1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{ante:\"96.50\",purchase:\"96.60\",regular:\"96.49\"}}",
        bl: "0",
        stime: "1643365334406",
        sa: "8,3,4,3,11,3",
        sb: "5,10,11,8,1,7",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        prg_cfg: "1",
        sh: "5",
        fspps: "2000~10~0",
        wilds: "2~0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0~1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        bls: "20,25",
        counter: "2",
        paytable: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,500,500,200,200,0,0,0,0,0,0,0;500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,200,200,50,50,0,0,0,0,0,0,0;300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,100,100,40,40,0,0,0,0,0,0,0;240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,40,40,30,30,0,0,0,0,0,0,0;200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,30,30,20,20,0,0,0,0,0,0,0;160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,24,24,16,16,0,0,0,0,0,0,0;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,20,20,10,10,0,0,0,0,0,0,0;80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,18,18,8,8,0,0,0,0,0,0,0;40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,15,15,5,5,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
        l: "20",
        fspps_mask: "bet~fs_count~bet_level",
        total_bet_max: "10,000,000.00",
        reel_set0: "4,11,4,4,9,9,11,8,8,10,10,5,5,8,8,11,4,7,9,9,10,10,4,4,1,3,3,11,5,5,4,7,11,6,6,9,9,10,10,9,5,4,6,8,8,10,4,10,8,11,6,6,10,10,10,8,8,10,10,4,7,7,7~5,5,8,8,11,6,6,10,10,9,9,4,4,1,3,3,11,5,5,4,7,10,10,9,5,4,6,10,10,8,8,11,4,7,9,5,4,6,8,8,10,10,9,9,11,4,4,9,9,11,1,8,8,10,10,4,7,11,11,11~11,11,4,4,7,9,9,10,10,4,4,11,6,6,4,4,9,9,11,8,8,10,10,1,8,8,10,4,10,8,11,6,6,4,7,7,7,5,5,8,8,11,10,10,9,5,4,6,3,3,8,8,5,5,4,7,8,8,10,10,3,3,3~10,4,8,8,10,4,10,8,11,5,5,10,10,9,5,4,6,10,10,4,4,7,11,6,6,9,9,1,3,3,11,3,3,6,6,10,10,10,8,8,11,5,5,4,7,9,9,10,4,10,8,11,4,4,9,9,11,5,5,6,6,11,11,11,6~10,10,4,4,9,9,8,8,4,4,9,9,5,5,8,8,11,4,7,9,9,3,3,11,1,10,10,9,9,5,5,4,7,7,7,10,10,9,9,11,9,5,4,6,8,8,11,6,6,8,8,10,4,10,8,11,6,6,5,5,9,9,9~9,9,8,8,10,4,10,8,11,4,7,9,9,10,10,9,5,4,6,11,9,9,10,10,4,4,4,3,3,9,9,5,5,8,8,11,6,6,4,4,9,9,8,8,6,6,1,11,5,5,4,7,8,8,10,4,10,8,11,6,6,4,4,4,7,7",
        s: "3,8,4,8,1,10,6,10,5,7,8,9,6,9,8,7,4,5,3,4,3,8,4,8,1,10,6,10,5,7",
        reel_set2: "4,11,4,4,9,9,11,8,8,10,10,5,5,8,8,11,4,7,9,9,10,10,4,4,1,3,3,11,5,5,4,7,11,6,6,9,9,10,10,9,5,4,6,8,8,10,4,10,8,11,6,6,10,10,10,8,8,10,10,4,7,7,7,6~7,5,5,8,8,11,6,6,10,10,9,9,4,4,1,3,3,11,5,5,4,7,10,10,9,5,4,6,10,10,8,8,11,4,7,9,5,4,6,8,8,10,10,9,9,11,4,4,9,9,11,1,8,8,10,10,4,7,11,11,11~4,11,4,4,7,9,9,10,10,4,4,11,6,6,4,4,9,9,11,8,8,10,10,1,8,8,10,4,10,8,11,6,6,4,7,7,7,5,5,8,8,11,10,10,9,5,4,6,3,3,8,8,5,5,4,7,8,8,10,10,3,3,3,1,6~8,8,10,4,10,8,11,5,5,10,10,9,5,4,6,10,10,4,4,7,11,6,6,9,9,1,3,3,11,3,3,6,6,10,10,10,8,8,11,5,5,4,7,9,9,10,4,10,8,11,4,4,9,9,11,5,5,6,6,9,9,9~4,10,10,4,4,9,9,8,8,4,4,9,9,5,5,8,8,11,4,7,9,9,3,3,11,1,10,10,9,9,5,5,4,7,7,7,10,10,9,9,11,9,5,4,6,8,8,11,6,6,8,8,10,4,10,8,11,6,6,5,5,1~9,9,8,8,10,4,10,8,11,4,7,9,9,10,10,9,5,4,6,11,9,9,10,10,4,4,4,3,3,9,9,5,5,8,8,11,6,6,4,4,9,9,8,8,6,6,1,11,5,5,4,7,8,8,10,4,10,8,11,6,6,4,4,4,6",
        t: "symbol_count",
        reel_set1: "4,11,4,4,9,9,8,8,11,10,10,5,5,8,8,11,4,7,9,9,10,10,4,4,1,3,3,11,5,5,4,7,9,5,4,6,11,10,10,9,5,4,6,8,8,10,4,10,8,11,6,6,10,10,10,8,8,12~5,5,8,8,11,6,6,10,10,9,9,4,4,12,3,3,11,5,5,10,10,4,7,9,5,4,6,10,10,8,8,11,4,7,9,5,4,6,8,8,1,11,9,9,10,10,4,4,9,9,11,8,8,10,10,12,6~11,11,4,4,7,9,9,10,10,4,4,3,3,6,6,4,4,9,9,10,10,8,8,11,1,8,8,10,4,10,8,11,6,6,4,7,7,7,5,5,8,8,11,10,10,9,5,4,6,8,8,3,3,5,5,4,7,8,8,12~4,8,8,10,4,10,8,11,5,5,3,3,9,5,4,6,10,10,4,4,7,11,6,6,9,9,1,10,4,10,8,11,3,3,6,6,10,10,10,8,8,11,5,5,4,7,9,9,11,10,10,4,4,9,9,11,5,5,12,6~9,10,10,4,4,9,9,8,8,4,4,5,5,9,9,8,8,11,4,7,9,9,3,3,11,1,10,10,9,9,5,5,4,7,7,7,9,9,10,4,10,8,11,6,6,8,8,9,9,11,6,6,8,8,10,4,10,8,11,6,6,12~9,9,8,8,10,10,5,5,4,7,11,10,10,9,9,1,6,6,11,9,9,10,10,4,4,12,3,3,9,9,5,5,8,8,11,6,6,4,4,9,9,8,8,6,6,11,9,9,4,7,8,8,10,4,10,8,11,12",
        reel_set4: "4,11,4,4,9,9,11,8,8,10,10,5,5,8,8,11,4,7,9,9,10,10,4,4,3,3,11,5,5,4,7,11,6,6,9,9,10,10,9,5,4,6,8,8,10,4,10,8,11,6,6,10,10,10,8,8,10,10,4,7,7,7~5,5,8,8,11,6,6,10,10,9,9,4,4,4,3,3,11,5,5,4,7,10,10,9,5,4,6,10,10,8,8,11,4,7,9,5,4,6,8,8,8,10,10,9,9,11,4,4,9,9,11,8,8,10,10,4,7,11,11,11~11,11,4,4,7,9,9,10,10,4,4,11,6,6,4,4,9,9,11,8,8,10,10,8,8,10,4,10,8,11,6,6,4,7,7,7,5,5,8,8,11,10,10,10,9,5,4,6,3,3,8,8,5,5,4,7,8,8,10,10,3,3,3~10,4,8,8,10,4,10,8,11,5,5,10,10,9,5,4,6,10,10,4,4,7,11,6,6,9,9,3,3,11,3,3,6,6,10,10,10,8,8,11,5,5,4,7,9,9,9,10,4,10,8,11,4,4,9,9,11,5,5,6,6,11,11,11,6~10,10,4,4,9,9,8,8,4,4,9,9,5,5,8,8,11,4,7,9,9,3,3,11,10,10,9,9,5,5,4,7,7,7,10,10,9,9,11,11,11,9,5,4,6,8,8,11,6,6,8,8,10,4,10,8,11,6,6,5,5,9,9,9~9,9,8,8,10,4,10,8,11,4,7,9,9,10,10,9,5,4,6,11,9,9,10,10,4,4,4,3,3,9,9,5,5,8,8,11,6,6,4,4,9,9,8,8,6,6,6,11,5,5,4,7,8,8,10,4,10,8,11,6,6,4,4,4,7,7",
        reel_set3: "11,11,4,4,9,9,8,8,11,10,10,5,5,8,8,11,4,7,9,9,10,10,4,4,1,3,3,11,5,5,4,7,9,5,4,6,11,10,10,9,5,4,6,8,8,10,4,10,8,11,6,6,10,10,10,8,8,12,6~4,5,5,8,8,11,6,6,10,10,9,9,4,4,12,3,3,11,5,5,10,10,4,7,9,5,4,6,10,10,8,8,11,4,7,9,5,4,6,8,8,1,11,9,9,10,10,4,4,9,9,11,8,8,10,10,12~11,11,4,4,7,9,9,10,10,4,4,3,3,6,6,4,4,9,9,10,10,8,8,11,1,8,8,10,4,10,8,11,6,6,4,7,7,7,5,5,8,8,11,10,10,9,5,4,6,8,8,3,3,5,5,4,7,8,8,12,6~4,8,8,10,4,10,8,11,5,5,3,3,9,5,4,6,10,10,4,4,7,11,6,6,9,9,1,10,4,10,8,11,3,3,6,6,10,10,10,8,8,11,5,5,4,7,9,9,11,10,10,4,4,9,9,11,5,5,12,6~10,10,4,4,9,9,8,8,4,4,5,5,9,9,8,8,11,4,7,9,9,3,3,11,1,10,10,9,9,5,5,4,7,7,7,9,9,10,4,10,8,11,6,6,8,8,9,9,11,6,6,8,8,10,4,10,8,11,6,6,12~6,9,9,8,8,10,10,5,5,4,7,11,10,10,9,9,1,6,6,11,9,9,10,10,4,4,12,3,3,9,9,5,5,8,8,11,6,6,4,4,9,9,8,8,6,6,11,9,9,4,7,8,8,10,4,10,8,11,12,6",
        total_bet_min: "200.00"
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
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "20",
        na: "s",
        reel_set: 0,
        s: Util.view2String(player.machine.view),
        sa: "7,9,3,9,4,8",
        sb: "5,7,9,7,3,8",
        sh: "5",
        stime: new Date().getTime(),
        sver: "5",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    if (player.machine.prevTumbleStatus == "NOTUMBLE" && player.machine.tumbleStatus == "TUMBLE") {
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "mc";
        result["tmb"] = player.machine.tmb;
        result["tmb_win"] = player.machine.tmb_win;
    }
    if (player.machine.prevTumbleStatus == "TUMBLE") {
        result["na"] = "s";
        result["tw"] = player.machine.tmb_win;
        if (player.machine.tumbleStatus == "TUMBLE") {
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.tumbleIndex;
            result["rs"] = "mc";
            result["rs_win"] = player.machine.tmb_win;
            result["tmb"] = player.machine.tmb;
            result["tmb_win"] = player.machine.tmb_win;
        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["rs_t"] = player.machine.tumbleIndex;
            result["tw"] = player.machine.tmb_res;
            result["w"] = 0;
            result["tmb_res"] = player.machine.tmb_res;
            result["tmb_win"] = player.machine.tmb_win;
            result["na"] = "c";
        }
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs_bought"] = player.machine.freeSpinLength;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = "0.00";
            result["fsres"] = "0.00";
            result["prg_m"] = "wm";
            result["prg"] = 1;
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["fs_bought"] = player.machine.freeSpinLength;
        result["prg_m"] = "wm";
        result["prg"] = 1;
        if (player.machine.rmul.length > 0) {
            result["rmul"] = player.machine.rmul;
        }
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
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
