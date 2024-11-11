var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi_p: "2,2,2,2,2",
        msi: "12",
        def_s: "5,8,1,4,7,5,6,11,4,11,5,8,4,7,7,5,6,5,6,5",
        balance: "0.00",
        cfgs: "3364",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "6",
        def_sb: "7,12,12,12,12",
        def_sa: "10,12,12,12,12",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646037623354",
        sa: "10,12,12,12,12",
        sb: "7,12,12,12,12",
        sc: "5.00,10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "4",
        wilds: "2~500,150,40,10,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;75,30,10,4,0;45,20,8,3,0;30,18,7,2,0;25,15,6,1,0;20,12,5,0,0;15,10,4,0,0;14,9,3,0,0;13,8,2,0,0;12,7,1,0,0;0,0,0,0,0",
        l: "50",
        rtp: "95.64,95.66",
        reel_set0: "11,7,9,3,11,10,1,5,4,5,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,6,3,11,7,5,11,1,11,3,11,9,11,8,9,3,5,9,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,11,3,11,1,5,11,9,11,5,2,7,9,5~8,6,8,3,8,11,1,6,5,8,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,7,4,8,6,4,8,1,6,10,4,6,8,6,4,9,10,8,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,6,4,8,1,6,4,8,6,8,2,6,8,6,10,8,10~11,7,9,3,11,10,1,11,4,5,12,12,12,12,12,12,12,12,12,12,6,3,5,7,11,7,1,7,3,7,11,9,8,11,3,11,9,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,9,3,11,1,7,5,9,7,11,2,9,7,5,7,9,5,1,7,9,5,9~10,6,10,3,10,11,1,6,5,8,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,7,6,8,6,4,10,1,8,4,6,4,6,4,10,9,8,4,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,4,6,10,1,4,10,8,10,8,2,8,10,4,8,6,8,1,8,10,6~11,9,5,3,5,10,1,11,4,9,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,6,3,11,9,11,7,1,11,3,9,11,7,8,11,3,11,4,12,12,12,12,12,12,12,12,12,12,12,12,12,12,7,3,7,1,7,11,7,5,7,2,7,9,11,7,9,7,9,11,7,9",
        s: "5,8,1,4,7,5,6,11,4,11,5,8,4,7,7,5,6,5,6,5",
        reel_set2: "10,9,5,4,4,4,4,4,4,4,4,4,8,8,2,4,3,7,4,4,4,4,4,4,4,3,11,6,6,6,4,5,7,1,8,4,4,4,4,4,10,9,7,11~1,9,2,4,4,4,4,4,4,4,4,6,11,10,4,4,4,4,4,4,3,11,4,4,4,4,5,6,6,4,10,5,7,6,8,7,9,4,4,4,4,4,4,4,4,3,10~4,4,4,4,4,4,4,4,9,8,9,1,11,5,4,9,7,4,4,4,4,4,4,4,11,7,8,3,7,4,10,5,8,4,4,4,4,4,4,4,2,6,8,3~4,4,4,4,4,4,4,4,4,4,4,4,9,8,11,6,4,4,4,4,4,4,4,3,10,4,7,5,10,11,1,8,4,8,6,5,2,7,7,10,4,4,4,4,4,11~10,7,5,4,4,4,4,4,4,4,4,9,9,1,4,4,4,4,4,4,4,7,5,4,10,8,11,2,5,11,6,3,5,3,10,3,6,8,4,4,4,4,4,4",
        reel_set1: "10,9,3,3,3,3,3,3,3,3,3,3,9,9,3,10,7,6,3,6,6,4,4,3,3,3,3,3,3,5,1,2,5,3,3,3,3,3,3,3,3,3,7,11,11,8,5,10,8~8,3,3,3,3,3,3,3,3,7,11,11,1,6,3,3,3,3,3,3,7,6,2,8,3,3,3,3,3,3,3,6,6,7,5,10,4,4,3,9,3,3,3,3,3,3,3,10,8,6,3~3,3,3,3,3,3,3,1,2,10,6,9,7,8,2,3,5,8,11,7,9,8,3,11,4,7,7,3,3,3,3,3,3,3,4,11,9,3,5,10,3,3,3,3,3,3,3,3~3,3,3,3,3,3,3,3,3,11,4,5,10,3,3,3,3,3,3,3,11,9,10,3,2,7,8,7,10,6,11,4,5,8,6,1,3,3,3,3,3,3,3,3,3~3,3,3,3,3,3,3,3,3,3,3,1,7,9,7,3,9,11,8,5,6,6,10,3,3,3,3,3,3,3,3,11,10,5,5,4,5,3,3,3,3,3,3,9,2,4,10,10,7",
        reel_set4: "10,10,9,6,6,6,6,6,6,6,6,6,6,6,6,6,1,10,11,11,5,4,6,6,6,6,6,6,6,3,8,2,11,8,7,7,9,5,6,6,6,6,6,6,6,3,7,9,4~6,6,6,6,6,6,6,6,6,6,6,6,6,11,5,7,3,11,10,6,6,6,6,6,6,6,10,7,4,9,5,1,8,8,7,11,4,9,6,6,6,6,6,6,6,6,10,3,8,2,3~8,9,6,6,6,6,6,6,6,6,6,6,3,9,4,10,5,11,6,6,6,6,6,6,6,4,8,11,7,11,8,9,7,6,6,6,6,6,6,9,7,3,8,3,10,2,1,5,4,10~3,4,5,6,6,6,6,6,6,6,6,6,6,6,5,8,9,11,4,1,4,11,5,11,6,6,6,6,6,6,7,9,7,10,7,3,10,6,6,6,6,6,6,8,2~6,6,6,6,6,6,6,6,6,3,9,3,5,10,7,7,4,7,3,10,6,6,6,6,6,6,6,6,6,8,11,10,8,5,9,6,6,6,6,6,6,1,5,2",
        reel_set3: "6,5,5,5,5,5,5,5,5,7,3,7,11,3,9,1,7,11,5,5,5,5,5,5,5,9,4,6,9,10,8,10,6,3,5,5,5,5,5,5,5,5,5,2,8,4~11,5,5,5,5,5,5,5,5,9,7,6,9,10,5,5,5,5,5,5,5,5,6,4,11,5,5,5,5,5,1,11,2,5,5,5,5,5,5,5,5,5,6,8,10,3,3,8~7,5,5,5,5,5,5,5,5,9,10,11,8,3,4,4,5,3,7,8,5,5,5,5,5,5,5,5,8,2,6,9,9,7,5,5,5,5,5,5,5,5,11,6,1,3,8~4,9,5,5,5,5,5,5,4,10,8,5,5,5,5,5,5,7,3,2,5,11,1,7,5,3,4,6,5,5,5,5,5,5,5,5,5,11,7,10,10,9,11,6~5,5,5,5,5,5,5,5,1,7,6,11,4,9,5,5,5,5,5,5,4,5,3,9,8,5,10,8,3,2,5,5,5,5,5,5,11,10,10,3,10,7",
        reel_set5: "1,4,7,2,2,2,2,2,2,2,2,2,6,10,10,9,10,9,6,11,7,2,2,2,2,2,2,11,4,5,5,8,8,5,2,2,2,2,3,4,6~5,2,2,2,2,2,2,2,2,2,2,10,9,7,5,7,7,6,10,8,2,2,2,2,2,2,3,6,9,7,8,6,11,11,2,2,2,2,2,2,2,2,8,3,4,3,10,6,1~9,2,2,2,2,2,2,2,11,3,8,9,2,2,2,2,2,2,8,7,9,9,11,8,4,8,5,10,4,3,1,2,2,2,2,8,6,7,10,5~10,8,6,3,2,2,2,2,2,2,3,11,8,11,10,1,5,2,2,2,2,2,8,11,8,10,6,9,11,6,2,2,2,2,2,2,7,9,7,4,9,4~4,11,2,2,2,2,2,2,2,2,2,8,7,10,3,7,2,2,2,2,2,9,10,4,3,10,6,7,2,2,2,2,2,2,3,5,1,9,2,2,2,2,3,5,8",
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
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "50",
        reel_set: "0",
        na: "s",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: "11,8,11,6,12",
        sb: "10,10,10,9,9",
        sh: "4",
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

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

    result["is"] = Util.view2String(player.machine.maskView);
    result["msi_p"] = player.machine.mysterySymbols.join();

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs_opt_mask"] = "fs,m,ss";
            result["fs_opt"] = "5,1,3~7,1,4~9,1,5~11,1,6~-1,-1,-1";
            result["na"] = "fso";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = player.machine.freeSpinType + 1;
        result["rss"] = player.machine.freeSpinType + 3;
        result["fsopt_i"] = player.machine.freeSpinType;

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

ApiManager.prototype.FreeSpinOptionApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "1",
        fs: "1",
        fsmax: "8",
        fsmul: "1",
        fsopt_i: "4",
        fsres: "0.00",
        fswin: "0.00",
        index: "1",
        n_reel_set: "1",
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["fs_opt_mask"] = "fs,m,ss";
    result["fs_opt"] = `5,1,3~7,1,4~9,1,5~11,1,6~${player.machine.freeSpinLength},1,${player.machine.freeSpinStackSymbol}`;
    result["fsopt_i"] = player.machine.freeSpinType;
    result["fs"] = player.machine.freeSpinIndex;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fsmul"] = 1;
    result["fsres"] = 0.0;
    result["fswin"] = 0.0;

    result["n_reel_set"] = player.machine.freeSpinType + 1;
    result["n_rss"] = player.machine.freeSpinType + 3;

    return result;
};

module.exports = ApiManager;