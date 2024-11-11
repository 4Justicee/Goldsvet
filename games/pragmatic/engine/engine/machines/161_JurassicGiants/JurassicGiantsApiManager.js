var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,5,4,8,1,10,6,10,5,7,8,9,6,9,8,3,5,4,8,1,10,6,10,5",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "13,6,1,1,1,1",
        def_sa: "12,13,7,8,12,10",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0~250,100,80,50,45,40,35,30,25,20,15,0,0,0,0,0,0,0,0,0~1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1",
        fs_aw: "m~2;m~3;m~4",
        gmb: "0,0,0",
        rt: "d",
        stime: "1647478821443",
        sa: "12,13,7,8,12,10",
        sb: "13,6,1,1,1,1",
        sc: "5,10,20,40,50,100,250,500,1000,2000",
        defc: "40",
        sh: "4",
        wilds: "2~0,0,0,0,0,0~1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "40",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;400,200,60,15,0,0;400,200,60,15,0,0;250,120,50,0,0,0;250,120,50,0,0,0;200,80,40,0,0,0;200,80,40,0,0,0;150,70,30,0,0,0;100,60,25,0,0,0;100,60,25,0,0,0;80,45,15,0,0,0;80,45,15,0,0,0",
        l: "50",
        rtp: "96.01",
        reel_set0: "12,13,7,8,12,10,9,1,1,1,1,11,4,4,4,1,9,8,3,3,3,10,13,12,3,6,5,4~13,7,12,6,8,4,4,4,5,7,11,2,3,9,6,10,4,8,5,7,11,10,1,1,1,1,1~7,12,5,2,8,9,5,6,11,11,12,10,12,3,3,3,10,3,4,13,1,1,1,1,7~11,13,6,4,4,4,7,12,8,10,5,9,11,1,1,1,1,13,7,6,4,2,3,9,12,5,12,1~4,4,4,13,3,12,1,1,1,1,5,12,6,6,7,5,8,1,11,7,9,4,10,2,9,11,10~13,6,1,1,1,1,1,4,4,4,1,12,4,10,7,10,3,3,3,11,11,9,8,5,12,3,7,13,8",
        s: "3,5,4,8,1,10,6,10,5,7,8,9,6,9,8,3,5,4,8,1,10,6,10,5",
        t: "243",
        reel_set1: "1,1,1,1,4,4,4,12,12,10,9,10,7,5,8,3,3,3,3,6,13,13,13,9,8,1,11~6,4,4,4,10,13,9,12,4,3,8,10,8,2,6,11,5,7,7,11,5,8,1,1,1,1,7~12,13,7,1,1,1,1,5,7,11,5,2,11,1,10,4,3,3,3,12,3,6,9,13,8,8~13,3,9,10,2,7,13,8,12,11,4,4,4,1,1,1,1,6,1,7,12,5,4,8,12,11,10,9~12,6,6,11,2,4,4,4,11,5,8,10,8,3,10,1,1,1,1,12,4,9,13,7,1,9,13,7~13,10,4,4,4,11,1,1,1,1,1,10,9,7,5,13,6,1,8,12,7,4,3,3,3,11",
        awt: "rfm"
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
        sh: "4",
        c: player.betPerLine,
        sver: "5",
        counter: "20",
        l: "50",
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
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
            result["n_reel_set"] = 1;
        }

    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        result["awt"] = "rfm";
        result["aw"] = 1;
        result["n_reel_set"] = 1;
        result["gwm"] = 1;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
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
