var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,4,5,6,7,3,4,5,6,7,3,4,5,6,7",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "6,6,6,6,6,6,6,6,6,6,6,6,8,8,8,8,8,3,3,3,3,3,3,3,3,3,8,2,2,2,2,4,4,4,4,4,4,4,4,4,4,10,5,5,5,5,5,5,5,5,5,5,5,7,7,7,7,7,5,3,4,5,10,10,10,10,6,9,9,9,9,9,3,1,9",
        ver: "2",
        reel0: "7,7,7,7,7,5,5,5,5,5,5,5,5,5,2,2,2,2,7,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,3,9,9,9,9,4,5,4,5,6,6,6,6,6,6,6,6,10,9,8,8,8,8,5,6,1,4,6,10,10,10,10,2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "4,4,4,4,4",
        def_sa: "7,7,7,7,7",
        reel3: "1,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,3,3,3,3,3,5,4,4,4,4,4,4,6,5,3,4,2,2,2,2,6,4,10,3,8,8,8,8,8,7,7,7,7,7,9,9,9,9,9,10,10,10,10,7,4,9",
        reel2: "1,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,8,8,8,8,8,6,2,2,2,5,3,3,3,3,3,3,3,3,3,6,5,3,4,4,4,4,4,4,4,4,4,9,9,9,9,9,4,9,7,7,7,7,7,10,10,10,10,7,4,1,8,4,5",
        reel4: "4,4,4,4,4,4,1,3,3,3,3,3,3,3,3,3,6,6,6,6,6,6,6,6,6,10,4,3,9,9,9,9,10,10,10,10,5,5,5,5,5,8,8,8,8,8,4,7,7,7,7,7,5,2,2,2,2,4,7,8,5,6,5,3,9",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        stime: "1645242881412",
        sa: "7,7,7,7,7",
        sb: "4,4,4,4,4",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~400,100,30,10,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;100,40,10,3,0;50,25,8,2,0;30,20,7,2,0;25,15,5,1,0;15,10,3,0,0;15,10,3,0,0;13,8,2,0,0;13,8,2,0,0",
        l: "20",
        rtp: "96.54",
        s: "3,4,5,6,7,3,4,5,6,7,3,4,5,6,7",
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
        tw: "0",
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
        l: "20",
        w: "0",
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
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;
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
            result["fs_opt_mask"] = "fs,m";
            result["fs_opt"] = "30,1~15,2~10,3~5,6";
            result["na"] = "fso";
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        result["w"] = player.machine.freeSpinMultiMoney;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex + 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = player.machine.freespinMulti;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fswin"] = player.machine.freeSpinBeforeMoney;

        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinIndex;
            result["fsmul_total"] = player.machine.freespinMulti;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["fswin_total"] = player.machine.freeSpinBeforeMoney;
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
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fsmul"] = player.machine.freespinMulti;
    result["fs"] = 1;
    result["stime"] = new Date().getTime();
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
