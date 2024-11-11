var Util = require("../../../utils/slot_utils");

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "11,13,14,10,12,8,7,5,13,7,13,9,15,14,11,14,9,15,7,10",
        balance: "100,000.00",
        cfgs: "1",
        accm: "cp~tp",
        ver: "2",
        acci: "0",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "4",
        def_sb: "15,3,4,6,7",
        def_sa: "11,12,14,8,9",
        balance_bonus: "0.00",
        na: "s",
        accv: "0~10",
        scatters: "1~0,0,0,0,0,0~0,0,0,0,0~1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"21739130\",max_rnd_win:\"250\"}}",
        stime: new Date().getTime(),
        sa: "11,12,14,8,9",
        sb: "15,3,4,6,7",
        sc: "10,20,40,80,160,240,400,560,640,800,1200,1600,2000,3200,4000,5600,6400,8000,10000,12000,16000,24000,40000",
        defc: "0.08",
        sh: "4",
        wilds: "2~70,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "0.08",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;70,15,5,1,0;30,8,4,0,0;30,8,4,0,0;25,6,3,0,0;25,6,3,0,0;20,4,2,0,0;20,4,2,0,0;8,2,1,0,0;8,2,1,0,0;8,2,1,0,0;8,2,1,0,0;8,2,1,0,0",
        l: "25",
        rtp: "96.44",
        reel_set0: "15,15,15,15,10,10,10,10,12,12,12,12,14,8,8,8,8,4,4,4,4,11,11,11,11,13,13,13,13,14,7,7,7,7,12,3,3,3,3,15,12,12,8,9,9,9,9,10,8,12,9,8,4,13,4,12,7,12,9,15,11,1,13,11,13,11,10,14,7,15,5,5,5,5,13,3,9,3,6,6,6,6,13,13,14,11,5,14,14,10,15,15~12,12,12,12,9,9,9,9,10,10,10,10,12,10,14,14,14,14,13,13,13,13,12,15,15,15,15,3,3,3,12,6,6,6,6,8,8,8,8,5,5,5,5,7,7,7,7,7,14,12,6,13,13,14,14,11,11,11,11,9,11,11,10,8,8,15,11,12,15,9,11,9,15,15,4,4,4,4,14,3,7,10,3,4,1,13,7,13,11~12,12,12,12,11,11,11,11,8,8,8,8,6,6,6,6,4,4,4,4,13,13,13,13,10,10,10,10,11,15,15,15,15,7,7,7,7,11,11,15,13,10,3,3,3,5,5,5,5,11,13,12,8,14,14,14,14,12,6,6,5,9,9,9,9,15,14,3,12,9,13,1,14,15,11,7,9,13,5,9,4,13,8,7,12,15,3,9,14,8,4,14,13,12~15,15,15,15,9,9,9,9,14,14,14,14,8,8,8,8,13,13,13,13,11,11,11,11,9,8,12,12,12,12,6,6,6,6,11,15,11,14,12,7,7,7,7,15,13,13,5,5,5,5,7,12,14,12,4,4,4,4,8,1,14,10,10,10,10,15,10,13,3,3,3,6,10,5,8,3,5,6,9,15,11,6,14,9,14,11,13,7,12,15,11,10,12,7,13,3,4~6,6,6,6,11,11,11,11,8,8,8,8,13,13,13,12,12,12,12,10,10,10,10,8,13,14,14,14,14,5,5,5,5,15,15,15,15,5,12,6,15,13,15,9,9,9,9,10,11,14,5,3,3,3,3,11,12,8,13,10,14,9,9,7,7,7,7,10,3,7,15,5,3,4,4,4,4,12,14,5,12,11,15,1,11,15,1,14,6,7,13,13,6,4,12",
        s: "11,13,14,10,12,8,7,5,13,7,13,9,15,14,11,14,9,15,7,10",
        accInit: "[{id:0,mask:\"cp;tp;s;sp\"}]",
        reel_set2: "15,13,5,8,11,13,10,9,15,8,14,4,4,4,4,10,6,11,12,12,7,15,8,1,11,12,11,13,14,13,5,14,13,10,7,14,7,13,14,12,12,15,15,9,15,13,11,12,1,9,15,11,12,14,14,11~13,14,9,6,12,14,12,7,14,4,4,4,4,11,8,10,12,13,8,11,9,9,6,13,10,4,14,7,15,1,10,11,8,11,13,14,15,15,8,13,9,5,11,9,8,5,15,12,14,6,7,10,12,10,12~15,13,12,12,10,6,14,14,15,5,15,11,11,10,10,15,13,10,9,15,11,1,11,13,8,4,4,4,4,6,14,13,8,14,5,6,5,10,12,10,4,7,13,13,12,9,9,8,13,7,13,12,7,1,7,11,14,12,14,11,8,9~13,13,11,9,14,11,13,13,9,11,9,7,15,14,12,12,11,12,10,15,10,11,10,15,9,14,14,7,6,10,13,10,15,13,13,14,5,7,6,14,4,4,4,4,8,11,12,12,13,10,15,8,7,8,11,1,8,12,15,12~15,12,13,10,1,12,8,8,13,9,7,10,12,11,5,9,13,14,8,14,14,9,11,7,8,9,11,11,15,15,12,12,6,13,15,15,5,14,1,14,15,13,4,4,4,4,11,12,10,14,14,12,11,11,10,13,8,7,13",
        reel_set1: "8,8,1,4,4,4,4,12,8,11,14,12,9,9,14,11,9,9,8,13,14,12,13,13,14,5,12,14,12,7,13,13,7,15,13,12,4,14,10,6,15,11,7,10,15,8,10,10,6,1,10,12,13,13,5,12,11,11,15~14,4,4,4,4,14,8,15,12,10,14,9,7,15,13,14,10,13,1,4,7,5,11,9,15,11,13,5,12,13,6,15,9,13,11,4,6,9,12,8,12,8,15,12,14,13,12,11,5,13,10,15,8,7,11,14,10,8,13~15,6,15,5,8,13,12,12,14,14,12,13,13,11,12,7,7,8,6,8,7,11,10,5,4,4,4,4,8,8,13,10,13,13,11,10,1,9,7,7,15,9,13,13,14,12,11,15,14,1,10,8,12,9,6,15,9,10,9,4~8,13,12,10,11,1,14,6,13,12,9,10,9,14,15,4,4,4,4,13,7,10,8,7,13,6,8,5,9,5,9,11,14,6,11,7,7,11,12,13,11,1,9,8,14,10,12,14,10,13,13,14,15,10,12,12,15,15,11~15,11,12,7,10,8,14,12,11,13,15,9,7,15,5,10,12,13,8,13,10,12,14,13,8,12,9,9,12,13,11,11,10,7,4,4,4,4,11,9,14,9,6,12,14,10,1,15,8,11,5,8,15,14,13,15,15,9",
        reel_set3: "10,14,14,9,15,11,5,12,13,15,15,13,9,6,14,1,8,11,8,11,12,11,12,4,4,4,4,11,14,12,12,11,13,14,8,7,15,10,14,10,5,12,11,12,1,13,12,13,14,13,13,6,15,7,13,7,4~15,13,1,12,15,13,7,13,7,11,14,7,5,13,11,4,4,4,4,15,15,10,15,11,14,10,14,11,11,12,10,6,9,11,8,13,15,12,11,5,14,12,10,14,9,6,9,12,9,14,8,14,12,13,13,12,9,8,8,4~10,15,8,7,7,13,12,10,1,9,4,4,4,4,15,13,8,5,9,12,8,15,14,11,10,11,15,15,13,12,11,9,12,14,5,14,12,6,7,7,15,14,11,6,10,13,11,9,10,1,9,4,6,10,13,14,12,12~12,12,6,14,11,13,9,15,9,14,13,8,11,5,11,13,10,13,13,8,6,14,12,13,12,9,7,10,12,15,15,7,10,12,1,11,15,4,4,4,4,14,7,14,13,11,11,9,10,14,8,15,8,5,10,12,10,14~11,14,11,11,7,10,15,15,4,4,4,4,1,12,5,15,11,8,14,1,12,14,14,15,14,4,9,12,13,6,12,9,12,13,10,8,12,7,10,8,14,13,14,11,5,8,9,9,12,15,15,11,11,9,14,15,10",
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
        tw: "0.00", //                    tw    w          .
        ls: "0", //           0
        balance: "99,998.00",
        accm: "cp~tp", //                           cp~tp~s~sp
        acci: "0", //           0
        index: "2",
        balance_cash: "99,998.00",
        balance_bonus: "0.00", //           0
        na: "s",
        accv: "1~10",
        stime: "1638881685902",
        sa: "7,13,11,14,7",
        sb: "4,13,4,15,15",
        sh: "4",
        c: "0.08",
        sver: "5",
        n_reel_set: "0",
        counter: "4",
        l: "25",
        s: "14,13,7,10,9,4,13,9,8,10,4,1,12,12,8,4,15,4,10,12",
        w: "0.00",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["stime"] = new Date().getTime();
    result["c"] = param.c;
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);

    // accm, accv
    if (player.machine.lotusPositions.length > 0) {
        result["accm"] = "cp~tp~s~sp";
        result["accv"] = `${player.machine.baseSpinIndex}~10~3~${player.machine.lotusPositions.join()}`;
    } else {
        result["accm"] = "cp~tp";
        result["accv"] = `${player.machine.baseSpinIndex}~10`;
    }

    // na
    result["na"] = "s";
    if (prevGameMode == "BASE" && player.machine.currentGame == "FREE") {
        result["na"] = "fso";
    }
    if ((prevGameMode == "BASE" && player.machine.currentGame == "BASE" && player.machine.winMoney > 0) || (prevGameMode == "FREE" && player.machine.currentGame == "BASE" && player.machine.freeSpinWinMoney > 0)) {
        result["na"] = "c";
    }

    // fs, fsmax, fsmul, fsopt_i, fsres, fswin, fs_total
    if (prevGameMode == "FREE") {
        result["fs"] = player.machine.freeSpinIndex;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = 1;
        result["fsopt_i"] = player.machine.freeSpinOption;
        result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        if (player.machine.currentGame == "BASE") {
            result["fs_total"] = player.machine.freeSpinLength;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsmul_total"] = 1;
            result["fsc_win_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsc_res_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsc_mul_total"] = 1;
            result["w"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    // tw, w
    result["w"] = player.machine.winMoney;
    if (prevGameMode == "BASE") {
        result["tw"] = player.machine.winMoney;
    } else {
        result["tw"] = player.machine.freeSpinWinMoney;
    }

    // s, is
    result["s"] = Util.view2String(player.machine.view);
    if (player.machine.baseSpinIndex == 10 || prevGameMode == "FREE") {
        result["is"] = Util.view2String(player.machine.maskView);
    }

    // l
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    // rwd
    if (prevGameMode == "FREE") {
        result["rwd"] = `2~${player.machine.wildPositions.join()}`;
    } else if (player.machine.baseSpinIndex == 10) {
        result["rwd"] = `2~${player.machine.lotusPositions.join()}`;
    }

    // 
    if (prevGameMode == "BASE" && player.machine.currentGame == "FREE") {
        result["fs_opt_mask"] = "fs,m,wn";
        switch (player.machine.scatterCount) {
            case 3:
                result["fs_opt"] = "15,1,5~10,1,7~5,1,10";
            case 4:
                result["fs_opt"] = "30,1,5~20,1,7~10,1,10";
            case 5:
                result["fs_opt"] = "45,1,5~30,1,7~15,1,10";
            default:
                result["fs_opt"] = "15,1,5~10,1,7~5,1,10";
        }
    }

    return result;
};

ApiManager.prototype.FreeSpinOptionApi = function (player, param) {
    var result = {
        fsmul: "1",
        ls: "0",
        fs_opt_mask: "fs,m,wn",
        balance: "99,981.52",
        accm: "cp~tp",
        fsmax: "30",
        acci: "0",
        index: "16",
        balance_cash: "99,981.52",
        balance_bonus: "0.00",
        na: "s",
        accv: "1~10",
        fswin: "0.00",
        stime: "1638881767492",
        fs: "1",
        fs_opt: "30,1,5~20,1,7~10,1,10",
        fsres: "0.00",
        sver: "5",
        n_reel_set: "1",
        counter: "32",
        fsopt_i: "0"
    };

    // accm, accv
    if (player.machine.lotusPositions.length > 0) {
        result["accm"] = "cp~tp~s~sp";
        result["accv"] = `${player.machine.baseSpinIndex}~10~3~${player.machine.lotusPositions.join()}`;
    } else {
        result["accm"] = "cp~tp";
        result["accv"] = `${player.machine.baseSpinIndex}~10`;
    }

    // fs, fsmax, fsmul, fsopt_i, fsres, fswin
    result["fs"] = player.machine.freeSpinIndex;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fsopt_i"] = player.machine.freeSpinOption;
    result["fswin"] = 0;
    result["fsres"] = 0;

    result["fsopt_i"] = param.ind;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["stime"] = new Date().getTime();

    result["fs_opt_mask"] = "fs,m,wn";
    switch (player.machine.scatterCount) {
        case 3:
            result["fs_opt"] = "15,1,5~10,1,7~5,1,10";
        case 4:
            result["fs_opt"] = "30,1,5~20,1,7~10,1,10";
        case 5:
            result["fs_opt"] = "45,1,5~30,1,7~15,1,10";
        default:
            result["fs_opt"] = "15,1,5~10,1,7~5,1,10";
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