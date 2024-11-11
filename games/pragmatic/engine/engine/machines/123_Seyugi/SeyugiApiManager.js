var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,4,5,6,3,3,4,5,6,3,3,4,5,6,3",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "6",
        def_sb: "7,7,7,7,7",
        def_sa: "3,3,3,3,3",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        stime: "1645244943249",
        sa: "3,3,3,3,3",
        sb: "7,7,7,7,7",
        sc: "10.00,20.00,50.00,80.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "80.00",
        sh: "3",
        wilds: "2~400,100,30,10,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "80.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;100,40,10,3,0;50,25,8,2,0;30,20,7,2,0;25,15,5,1,0;15,10,3,0,0;15,10,3,0,0;13,8,2,0,0;13,8,2,0,0",
        l: "25",
        rtp: "96.47",
        reel_set0: "3,3,3,8,8,8,8,8,4,4,4,7,7,7,1,5,5,5,5,5,9,9,9,2,2,2,2,1,6,6,6,10,10,10,10~3,3,3,3,8,8,8,1,4,4,4,4,7,7,7,7,5,5,5,5,5,9,9,9,2,2,2,2,1,6,6,6,6,6,10,10,10~3,3,3,3,8,8,8,1,4,4,4,4,4,4,4,4,4,7,7,7,7,7,5,5,5,5,9,9,9,2,2,2,1,6,6,6,10,10,10,10~3,3,3,3,3,8,8,8,1,4,4,4,4,4,4,7,7,7,5,5,5,5,5,9,9,2,2,2,2,6,6,6,6,6,10,10,10~3,3,3,3,8,8,8,8,4,4,4,4,4,4,7,7,7,5,5,5,5,5,5,9,9,9,9,9,2,2,2,2,1,6,6,6,6,6,10,10,10,10,10",
        s: "3,4,5,6,3,3,4,5,6,3,3,4,5,6,3",
        reel_set2: "3,3,3,3,3,3,3,6,10,1,6,8,4,7,5,9,2,10,4,7,5,9~3,3,3,3,6,10,1,6,8,4,7,5,9,2,10,8,7,5,9~3,3,3,3,3,3,3,6,1,6,8,4,7,5,9,2,10,8,4,7,5,9~3,3,3,3,3,3,3,6,10,1,6,8,4,7,5,9,2,10,8,4,7,5,9~3,3,3,3,6,10,1,6,8,4,7,5,9,2,10,8,4,7,5,9",
        reel_set1: "2,2,2,2,2,2,6,10,1,3,8,4,7,5,9,6,10,3,8,4,7,5,9~2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,10,1,3,8,4,7,5,9,6,10,3,8,4,7,5,9~2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,10,1,3,8,4,7,5,9,6,10,3,8,4,7,5,9~2,2,2,2,2,2,2,2,2,2,2,2,2,6,10,1,3,8,4,7,5,9,6,10,3,8,4,7,5,9~2,2,2,2,2,2,2,2,2,2,6,10,1,3,8,4,7,5,9,6,10,3,8,4,7,5,9,6",
        reel_set4: "5,5,5,5,6,10,1,3,8,4,7,2,9,6,10,3,8,4,7,9~5,5,5,5,5,5,5,5,5,5,5,5,5,6,10,1,3,8,4,7,2,9,6,10,3,8,4,7,9~5,5,5,5,5,5,5,5,5,5,5,5,5,6,10,1,3,8,4,7,2,9,6,10,3,8,4,7,9~5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,10,1,3,8,4,7,2,9,6,10,3,8,4,7,9~5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,10,1,3,8,4,7,2,9,6,10,8,4,7,9",
        reel_set3: "4,4,4,4,4,4,4,4,4,6,10,1,3,8,2,7,5,9,6,10,3,8,7,5,9~4,4,4,4,4,4,4,4,4,4,4,4,6,1,3,8,2,7,5,9,6,10,3,8,7,5,9~4,4,4,4,4,4,4,4,4,4,4,4,6,10,1,3,8,2,7,5,9,6,10,3,8,7,5,9~4,4,4,4,6,10,1,3,8,2,7,5,9,6,10,3,8,7,5,9~4,4,4,4,4,4,4,6,10,1,3,8,2,7,5,9,6,10,3,8,7,5,9",
        reel_set5: "6,6,6,6,6,10,1,3,8,4,7,5,9,2,10,3,8,4,7,5,9~6,6,6,6,6,6,6,6,6,6,6,10,1,3,8,4,7,5,9,2,10,3,8,4,7,5,9~6,6,6,6,6,6,6,6,6,6,6,6,10,1,3,8,4,7,5,9,2,10,3,8,4,7,5,9~6,6,6,6,6,6,6,6,6,10,1,3,8,4,7,5,9,2,10,3,8,4,7,5,9~6,6,6,6,6,6,6,6,6,10,1,3,8,4,7,5,9,2,10,3,8,4,7,5,9,3",
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
        tw: player.machine.winMoney,
        balance: "100,116.81",
        index: "10",
        balance_cash: "100,116.81",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "11,9,6,9,4",
        sb: "7,3,9,8,10",
        sh: "3",
        c: player.betPerLine,
        sver: "5",
        counter: "20",
        l: "25",
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
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
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs_opt_mask"] = "fs,m,ss";
            result["fs_opt"] = "5,1,2~5,2,3~5,3,4~5,4,5~5,5,6";
            result["na"] = "fso";
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex + 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    return result;
};

ApiManager.prototype.FreeSpinOptionApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "1",
        fs: "1",
        fsmax: "10",
        fsmul: "1",
        fsres: "0.00",
        fswin: "0.00",
        index: "1",
        n_reel_set: "5",
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fs"] = 1;
    result["fsmul"] = player.machine.freeSpinType + 1;
    result["stime"] = new Date().getTime();
    result["n_reel_set"] = player.machine.freeSpinType + 1;
    result["index"] = param.index;
    result["counter"] = ++param.counter;

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

module.exports = ApiManager;