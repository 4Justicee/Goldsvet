var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,5,4,8,1,10,6,10,5,7,8,9,6,9,8",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "8,9,3,10,9,10,5,9,2,6,1,4,3,7,8",
        ver: "2",
        reel0: "9,3,7,1,2,5,6,9,8,8,4,5,7,3,10,7,10,4",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "10,9,8,4,7",
        def_sa: "9,8,9,7,3",
        reel3: "5,10,6,8,5,8,8,2,7,9,3,9,4,1,7,10",
        reel2: "7,9,3,10,5,9,5,4,1,8,6,8,6,2",
        reel4: "6,10,3,9,8,5,6,7,4,2,9,8,8,5,3,7,1,4,7",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~25,20,15,0,0~3,3,3,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1645525374977",
        sa: "9,8,9,7,3",
        sb: "10,9,8,4,7",
        sc: "6.00,10.00,20.00,30.00,40.00,50.00,60.00,100.00,150.00,200.00,300.00,500.00,1000.00,2000.00,3000.00,3500.00",
        defc: "60.00",
        sh: "3",
        wilds: "2~750,200,50,0,0~2,2,2,2,2",
        bonuses: "0",
        fsbonus: "",
        c: "60.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;250,75,30,0,0;200,60,20,0,0;150,50,15,0,0;100,30,10,0,0;30,15,5,0,0;30,15,5,0,0;20,10,3,0,0;20,10,3,0,0",
        l: "30",
        rtp: "96.36",
        s: "3,5,4,8,1,10,6,10,5,7,8,9,6,9,8",
        t: "243",
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
        tw: player.machine.winMoney,
        balance: 0,
        index: 1,
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 3,
        sver: 5,
        c: player.betPerLine,
        counter: 1,
        l: 25, // ----------------                                 
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
            result["fsmul"] = 3;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 3;
            result["fswin"] = (player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney) / 3;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["w"] = player.machine.winMoney / 3;
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = (player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney) / 3;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["w"] = player.machine.freeSpinWinMoney;
        }
    }

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
