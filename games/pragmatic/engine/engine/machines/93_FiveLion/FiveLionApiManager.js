var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "14,14,14,14,14,8,9,5,10,3,9,1,13,5,8,6,12,7,12,5",
        balance: "0.00",
        cfgs: "2211",
        nas: "14",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "6,7,7,9,7",
        def_sa: "3,5,4,13,9",
        balance_bonus: "0.00",
        wrlm_sets: "2~0~1,2,3,5,8,10,15,30,40~1~2,3,5~2~3,5,8~3~5,8,10~4~8,10,15~5~10,15,30~6~15,30,40",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646036253071",
        sa: "3,5,4,13,9",
        sb: "6,7,7,9,7",
        sc: "5.00,10.00,20.00,50.00,100.00,200.00,500.00,1000.00,2200.00",
        defc: "50.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "50.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,100,50,0,0;800,100,35,0,0;800,100,30,0,0;300,50,20,0,0;300,35,15,0,0;200,30,10,0,0;200,20,10,0,0;100,15,10,0,0;100,15,10,0,0;100,15,5,0,0;100,10,5,0,0;0,0,0,0,0",
        l: "50",
        rtp: "95.51",
        reel_set0: "4,8,7,10,13,3,8,1,5,11,13,6,12,9,4,8,7,10,13,3,8,1,5,11,13,6,12,9~5,9,11,2,13,11,3,10,4,8,6,1,7,12,5,9,2,10,13,11,3,10,4,8,6,1,7,12~4,2,3,10,5,13,7,9,1,8,5,12,6,11,4,9,3,10,5,13,7,2,4,8,5,12,6,11~6,11,2,13,11,4,9,5,12,3,10,7,8,1,6,11,5,13,11,4,9,5,12,3,10,7,8,3~9,3,8,5,9,13,6,8,10,4,11,1,7,12,9,3,8,5,9,13,6,8,10,4,11,3,7,12",
        s: "14,14,14,14,14,8,9,5,10,3,9,1,13,5,8,6,12,7,12,5",
        t: "243",
        reel_set1: "4,8,7,10,13,3,8,1,5,11,13,6,12,9,4,8,7,10,13,3,8,1,5,11,13,6,12,9~5,9,11,2,13,11,3,10,4,8,6,1,7,12,5,9,2,10,13,11,3,10,4,8,6,1,7,12~4,2,3,10,5,13,7,9,1,8,5,12,6,11,4,9,3,10,5,13,7,2,4,8,5,12,6,11~6,11,2,13,11,4,9,5,12,3,10,7,8,1,6,11,5,13,11,4,9,5,12,3,10,7,8,3~9,3,8,5,9,13,6,8,10,4,11,1,7,12,9,3,8,5,9,13,6,8,10,4,11,3,7,12",
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
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0",
        na: "s",
        n_reel_set: "0",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: "4",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
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

    result["wrlm_cs"] = player.machine.wrlm_cs;
    result["wrlm_res"] = player.machine.wrlm_res;

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

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs_opt_mask"] = "fs,m,ts,rm";
            result["fs_opt"] = "25,1,2,2;3;5~20,1,2,3;5;8~15,1,2,5;8;10~13,1,2,8;10;15~10,1,2,10;15;30~6,1,2,15;30;40~-1,-1,2,-1";
            result["na"] = "fso";
            result["n_reel_set"] = 0;
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["fsopt_i"] = player.machine.freeSpinType;
        result["n_reel_set"] = 1;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsc_total"] = player.machine.freeSpinLength;
            result["fsc_mul_total"] = 1;
            result["fsc_win_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsc_res_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["w"] = player.machine.freeSpinWinMoney;
            result["n_reel_set"] = 0;
        }
    }

    // console.log(result);

    return result;
};

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
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

ApiManager.prototype.FreeSpinOptionApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "1",
        fs_opt_mask: "fs,m,ts,rm",
        fs: "1",
        fsmax: "25",
        fsmul: "1",
        fsopt_i: "0",
        fsres: "0.00",
        fswin: "0.00",
        index: "1",
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["fs_opt"] = `25,1,2,2;3;5~20,1,2,3;5;8~15,1,2,5;8;10~13,1,2,8;10;15~10,1,2,10;15;30~6,1,2,15;30;40~${player.machine.freeSpinLength},1,2,${player.machine.wildMultiSet.join(";")}`;
    result["fsopt_i"] = player.machine.freeSpinType;
    result["fs"] = 1;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fsmul"] = 1;
    result["fsres"] = 0.0;
    result["fswin"] = 0.0;
    result["n_reel_set"] = 1;

    return result;
};

module.exports = ApiManager;