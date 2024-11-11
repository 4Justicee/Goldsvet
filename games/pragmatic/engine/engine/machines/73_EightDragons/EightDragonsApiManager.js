var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: "14",
        def_s: "8,5,7,4,3,10,1,13,9,10,4,13,12,7,11",
        msr: "3",
        balance: "0.00",
        cfgs: "5217",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        prm: "2~2",
        def_sb: "10,14,14,14,14",
        def_sa: "8,14,14,14,14",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646038281658",
        sa: "8,14,14,14,14",
        sb: "10,14,14,14,14",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,100,20,2,0;130,50,15,0,0;100,50,15,0,0;70,25,10,0,0;70,25,10,0,0;50,20,10,0,0;50,20,10,0,0;50,15,5,0,0;50,15,5,0,0;40,10,5,0,0;40,10,5,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.37,96.39",
        reel_set0: "6,4,14,14,14,14,4,12,10,11,6,14,14,14,14,12,13,9,5,7,5,9,7,3,8,1,3,11~5,11,10,10,3,7,9,14,14,14,14,14,6,12,4,11,14,14,14,14,4,3,2,2,6,12,8,9,8,1,13~14,14,14,14,1,14,14,14,8,7,5,13,11,10,14,14,14,14,9,10,12,5,6,1,2,2,4,3,6,12,9,8~7,12,4,4,1,9,10,2,2,7,14,14,14,14,14,14,14,5,2,2,11,6,6,8,14,14,14,14,14,11,5,3,13~11,9,1,10,6,7,13,14,14,14,14,14,14,6,8,4,3,7,5,14,14,14,14,14,9,12,10,11,4",
        s: "8,5,7,4,3,10,1,13,9,10,4,13,12,7,11",
        reel_set1: "5,6,3,11,7,13,11,8,8,1,12,5,3,4,9,10,7,12,13,6,14,14,14,14,14,14,14,14,9~5,11,7,3,2,2,1,14,14,14,14,14,14,14,14,14,12,8,2,2,8,10,6,6,13,9,9,12,10,4~11,13,2,2,9,14,14,14,14,14,14,14,1,3,2,2,13,5,4,4,8,10,7,2,2,12,10,12,6,9~5,6,11,4,13,3,6,3,2,2,12,10,14,14,14,14,14,14,9,1,2,2,12,5,4,8,8,7,2,2~3,10,8,5,14,14,14,14,14,6,1,12,7,6,9,9,10,11,11,7,13,4,3",
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
        sh: "3",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "20",
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

    result["msr"] = player.machine.mysterySymbol;
    if (player.machine.newView.length > 0) {
        result["is"] = player.machine.view;
        result["s"] = player.machine.newView;
    }

    result["prm"] = "2~2";
    if (player.machine.wildMulti > 1) {
        result["rmul"] = `2~${player.machine.wildPositions.join(",")}~${player.machine.wildMulti}`;
        result["gwm"] = player.machine.wildMulti;
    }

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["na"] = "fso";
            result["fs_opt_mask"] = "fs,m,ts,rm";
            result["fs_opt"] = "5,1,2,8;10;15~8,1,2,6;8;10~15,1,2,3;4;6~20,1,2,2;3;4~-1,-1,2,-1";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney + player.machine.freeSpinBeforeMoney;
        result["fsopt_i"] = player.machine.freeSpinType;
        result["n_reel_set"] = 1;
        result["prm"] = `2~${player.machine.wildMultiSet.join(",")}`;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["w"] = player.machine.freeSpinWinMoney;
            result["n_reel_set"] = 0;
        }
    }

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
        fs_opt: "5,1,2,8;10;15~8,1,2,6;8;10~15,1,2,3;4;6~20,1,2,2;3;4~8,1,2,2;3;4",
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

    result["fs_opt"] = `5,1,2,8;10;15~8,1,2,6;8;10~15,1,2,3;4;6~20,1,2,2;3;4~${player.machine.freeSpinLength},1,2,${player.machine.wildMultiSet.join(";")}`;
    result["fsopt_i"] = player.machine.freeSpinType;
    result["fs"] = player.machine.freeSpinIndex;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fsmul"] = 1;
    result["fsres"] = player.machine.freeSpinWinMoney;
    result["fswin"] = player.machine.freeSpinWinMoney;

    result["n_reel_set"] = 1;
    result["prm"] = "";

    return result;
};

module.exports = ApiManager;