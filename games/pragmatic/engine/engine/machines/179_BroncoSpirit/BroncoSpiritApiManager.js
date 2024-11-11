var Util = require("../../../utils/slot_utils");

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "11,13,14,10,12,8,7,5,13,7,13,9,15,14,11,14,9,15,7,10",
        balance: "100,000.00",
        cfgs: "1",
        accm: "cp~tp~s~sa~msa",
        ver: "2",
        acci: "0",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "4",
        def_sb: "10,10,10,10,5",
        def_sa: "12,12,12,12,15",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        accv: "0~10~3~0~20",
        scatters: "1~0,0,0,0,0,0~0,0,0,0,0~1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"100000000\",max_rnd_win:\"900\"}}",
        stime: "1646791803956",
        sa: "12,12,12,12,15",
        sb: "10,10,10,10,5",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "4",
        wilds: "2~250,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;250,60,20,0,0;125,25,10,0,0;125,25,10,0,0;75,20,8,0,0;75,20,8,0,0;50,12,5,0,0;50,12,5,0,0;20,7,3,0,0;20,7,3,0,0;20,7,3,0,0;20,7,3,0,0;20,7,3,0,0",
        l: "25",
        rtp: "96.63",
        reel_set0: "12,12,12,12,15,15,15,15,7,7,7,7,8,8,8,8,12,13,13,13,13,11,11,11,11,6,6,6,6,11,12,14,7,14,11,14,10,10,10,10,9,9,9,9,12,13,10,11,8,14,15,9,6,14,13,15,5,5,5,5,15,7,14,14,11,8,7,13,3,8,15,11,15,10,4,4,4,4,8,11,13,9,13,11,12,10,8,11,13,6,9,15,13,14,6,12,10,3,6,15,11,5,12,13,14,15,7,14,11,14,13,12,15,13,15,3,7,15,7,9,11,12,5,1,12,15,13,13,12,15,12,12,14,4,9,10,10,13,14,1,14,11,10~7,7,7,7,15,15,15,15,7,15,15,9,9,9,9,13,13,13,13,3,10,10,10,10,11,11,11,11,11,10,13,14,14,14,14,5,5,5,5,8,8,8,8,14,14,14,8,12,12,12,12,3,6,6,6,6,8,7,12,11,14,14,10,10,12,7,13,13,5,15,10,10,10,12,15,12,12,9,5,13,13,13,14,11,11,6,10,9,7,15,13,12,7,9,11,11,7,11,13,9,1,6,13,12,11,8,15,6,8,9,3,10,15,8,11,12,8,12,11,5,13,5,12,13,13,13,14,14,7,4,4,4,4,7,8,10,14,7,14,15,9,6,1,15,4,1,10,9~15,15,15,15,14,14,14,14,1,9,9,9,9,11,11,11,11,7,7,7,7,13,13,13,13,15,4,4,4,4,3,14,9,13,11,11,8,8,8,8,8,11,10,10,10,10,15,7,5,5,5,5,13,12,12,12,12,8,9,14,11,9,13,9,5,10,6,6,6,6,7,8,13,15,12,12,7,14,12,10,11,15,9,3,14,7,7,3,8,11,12,7,8,14,15,6,15,6,10,14,5,9,12,8,14,10,10,8,9,13,12,15,11,10,9,14,12,13,15,11,1,13,15,13,3,14,11,5,15,12,8,13,11,13,5,8,13,12,6,6,13,13,15,13,7,14,12~7,7,7,7,14,14,14,14,8,8,8,8,5,5,5,5,8,14,11,11,11,13,13,13,13,14,14,13,8,11,7,12,12,12,12,14,13,12,11,9,9,9,9,12,13,5,11,10,10,10,10,14,5,15,15,15,15,15,1,11,7,6,6,6,6,10,6,12,7,3,13,15,3,13,8,9,15,11,3,11,11,8,15,12,13,9,15,10,13,5,1,6,15,7,7,8,13,4,4,4,4,14,12,6,13,7,7,10,14,12,6,10,15,8,1,12,15,13,14,13,14,12,3,12,9,13,11,13,9,12,9,14,11,12,10,15,5,5,10,10,6,10,11,5,8,8,12,9,11~10,10,10,10,5,5,5,5,6,6,6,6,6,12,12,12,12,12,9,9,9,9,15,15,15,15,6,12,13,13,13,13,14,14,14,14,7,7,7,7,10,13,15,10,12,7,15,11,11,11,11,8,8,8,8,12,13,5,12,4,4,4,4,5,7,15,5,15,15,15,13,3,14,11,14,6,15,6,12,15,7,15,6,11,13,8,5,12,9,10,3,8,12,11,5,13,8,14,9,13,1,14,7,11,15,14,13,6,12,10,14,11,11,7,8,7,11,10,8,8,13,10,10,14,9,14,1,5,12,9,3,11,9,6,1,13,8,4,11,14,14,12,10,5,11,13,7",
        s: "11,13,14,10,12,8,7,5,13,7,13,9,15,14,11,14,9,15,7,10",
        accInit: "[{id:0,mask:\"cp;tp;s;sa;msa\"}]",
        reel_set2: "9,11,9,10,5,4,4,4,4,11,7,1,13,13,8,12,10,13,11,9,8,10,12,14,14,11,4,15,6,15,8,14,11,14,15,7,7,12,12,13,11,8,13,10,14,8,12,12,14,9,13,9,13,12,15~13,8,7,6,8,14,11,7,14,10,10,9,15,12,13,15,4,4,4,4,14,13,11,12,10,11,7,5,14,15,14,13,13,15,12,6,8,15,9,1,11,12,12,10,4,13,1,9,11,15,4,13,6,12,10,12,11,5,8,14,5~13,8,15,12,11,15,8,4,4,4,4,8,13,10,14,9,15,9,5,7,12,6,14,13,10,7,13,7,9,12,1,11,9,8,7,8,11,5,15,8,11,6,4,9,7,14,12,13,12,15,5,10,13,10,13,10,6,12,14~10,11,8,12,15,9,15,11,11,10,7,8,15,12,7,13,6,11,4,4,4,4,13,11,10,6,7,7,15,14,12,5,10,13,14,14,12,13,14,11,5,13,9,9,12,11,10,9,6,8,13,8,14,7,10,14,13,1~10,9,8,14,11,13,4,4,4,4,13,15,7,9,10,9,15,11,8,8,12,14,14,11,12,9,6,15,10,7,12,13,9,14,15,12,5,12,11,12,13,5,7,15,8,13,9,13,1,4,11,8,14,15,13,10",
        reel_set1: "8,13,12,8,13,15,14,7,7,11,9,13,9,12,11,7,15,12,10,9,14,9,11,14,10,4,4,4,4,10,13,15,14,14,12,12,6,11,15,12,12,15,12,5,6,8,11,7,8,10,8,9,14,13,9,15,14,4,14,12,11,7,8,12,14,8,7,5,12,14,13,12,12,10,11,11,10,15,8,15,11,4,6,1,13,11,11,10,11,1,15,7,10,10,9,13,10,6,14,12,8,12,14,9,13,4,13,7,13,13~9,12,14,1,5,4,4,4,4,15,15,9,13,8,4,13,12,11,9,13,15,12,15,12,13,8,11,15,6,6,13,4,15,10,14,4,13,12,13,11,9,14,8,7,13,8,15,10,14,10,7,7,13,8,12,12,8,12,11,10,1,10,14,13,6,7,12,6,11,12,13,7,14,11,10,15,11,8,9,8,11,13,10,5,5,12,15,7,15,4,10,6,14,14,5,7,13,11,13,11,14,9,11,12,14,11,8,9,9,12~12,8,7,8,11,6,11,7,8,7,14,12,4,4,4,4,14,9,12,12,14,13,8,9,15,7,9,9,14,4,6,15,11,5,12,9,13,13,12,12,11,10,6,10,13,12,5,12,15,9,13,9,12,9,4,8,9,15,13,12,15,13,6,13,15,10,8,10,10,7,14,11,13,10,12,8,5,1,12,14,11,9,11,13,6,14,14,7,13,1,5,15,13,8,10,11,7,15,10,8,15,13,11,8,7,14,7,10,9,11,10,13,9~10,11,13,15,13,8,7,9,13,11,10,5,15,9,13,14,5,15,6,7,12,9,5,12,7,15,14,9,14,6,10,15,12,13,14,1,15,8,14,9,12,13,8,8,7,10,10,7,14,13,13,14,14,5,11,12,10,9,13,11,6,11,13,11,12,4,4,4,4,11,7,8,12,7,1,4,14,7,8,5,10,11,6,13,13,12,14,12,12,11,12,11,9,1,15,9,8,13,10,12,7,10,13,14,14,6,8,11,15,11,9,11~11,1,11,8,4,4,4,4,10,15,6,13,14,9,14,7,7,7,7,7,12,6,7,12,10,12,7,14,14,10,9,9,7,5,8,11,7,10,13,13,15,14,9,12,8,13,9,10,9,14,13,9,12,13,10,9,15,15,12,11,5,6,8,8,10,9,10,10,14,13,15,13,15,7,8,8,15,14,9,11,11,12,9,12,15,14,1,4,7,11,8,12,15,15,12,12,13,8,14,8,11,13,12,14,13,15,11,13,11,7,11,10,5,13,7,11,15,8",
        reel_set3: "11,14,11,14,11,12,6,14,12,11,14,13,14,12,13,7,13,11,14,15,10,13,8,5,4,4,4,4,12,14,11,14,11,1,14,15,14,13,15,9,12,15,11,15,13,11,15,4,15,13,13,15,13,7,15~8,13,12,11,11,11,13,11,12,14,15,15,8,1,14,15,13,14,11,12,13,11,10,15,14,13,12,15,12,9,13,13,11,10,14,15,10,9,12,11,14,9,7,12,11,4,4,4,4,15,6,15,13,14,5,15,11,13,13,12,7,14~15,11,11,7,9,15,12,13,14,10,12,14,13,12,11,10,11,5,15,11,13,12,6,11,13,12,11,9,13,13,8,11,15,15,9,12,4,4,4,4,1,14,14,15,12,13,9,15,7,13,8,11,14,12,12,15,14~15,5,14,7,15,14,15,14,7,11,12,9,15,9,11,10,8,11,12,13,7,13,11,11,12,11,14,14,1,13,8,15,10,12,13,11,7,12,13,11,10,13,14,8,13,14,12,14,4,4,4,4,15,12,12,10,6,14,15~12,12,11,12,12,11,15,13,4,4,4,4,13,12,10,11,10,7,13,8,14,11,14,7,9,9,6,14,14,11,12,1,5,8,15,13,15,11,12,14,14,10,9,15,15,12,11,13,14,15,14,15,14,13,13,11,15"
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
    result["accm"] = "cp~tp~s~sa~msa";
    result["accv"] = `${player.machine.baseSpinIndex}~10~3~${player.machine.lotusPositions.length}~20`;

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
        result["ls"] = 0;
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
        result["slm_mp"] = player.machine.wildPositions.join();
        result["slm_mv"] = player.machine.wildPosinitStr.join();
    } else if (player.machine.baseSpinIndex == 10) {
        result["rwd"] = `2~${player.machine.lotusPositions.join()}`;
    }

    // 
    if (prevGameMode == "BASE" && player.machine.currentGame == "FREE") {
        result["fs_opt_mask"] = "fs,m,wn";
        switch (player.machine.scatterCount) {
            case 3:
                result["fs_opt"] = "15,1,4~5,1,7";
            case 4:
                result["fs_opt"] = "30,1,4~10,1,7";
            case 5:
                result["fs_opt"] = "45,1,4~15,1,7";
            default:
                result["fs_opt"] = "15,1,4~5,1,7";
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
        accm: "cp~tp~s~sa~msa",
        fsmax: "30",
        acci: "0",
        index: "16",
        balance_cash: "99,981.52",
        balance_bonus: "0.00",
        na: "s",
        accv: "7~10~3~3~20",
        fswin: "0.00",
        stime: "1638881767492",
        fs: "1",
        fs_opt: "15,1,4~5,1,7",
        fsres: "0.00",
        sver: "5",
        n_reel_set: "1",
        counter: "32",
        fsopt_i: "0"
    };

    // accm, accv
    result["accm"] = "cp~tp~s~sa~msa";
    result["accv"] = `${player.machine.baseSpinIndex}~10~3~${player.machine.lotusPositions.length}~20`;

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
            result["fs_opt"] = "15,1,4~5,1,7";
        case 4:
            result["fs_opt"] = "30,1,4~10,1,7";
        case 5:
            result["fs_opt"] = "45,1,4~15,1,7";
        default:
            result["fs_opt"] = "15,1,4~5,1,7";
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