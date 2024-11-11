var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "10,4,6,11,6,10,5,12,6,4,3,11,12,1,5,9,11,3,12,7",
        balance: "0.00",
        cfgs: "2738",
        reel1: "12,12,12,8,8,8,10,10,10,6,4,8,10,9,7,5,1,12,11,11,11,3,11,12,9,7",
        ver: "2",
        reel0: "4,9,10,10,10,9,6,12,12,12,12,10,7,11,11,11,11,8,8,8,11,3,1,7,3,9,5,8,8,10",
        index: "1",
        balance_cash: "0.00",
        def_sb: "6,11,11,11,4",
        def_sa: "4,9,10,10,10",
        reel3: "8,8,8,3,5,10,10,10,10,9,10,11,11,11,11,10,5,7,12,12,12,8,3,11,7,1,9,4,6,12,7",
        reel2: "5,8,8,8,12,6,12,5,6,7,4,10,12,11,1,9,3,1,2,10,10,6,8,4,9,10,6,11,4,7,8,9,3,12,11,7",
        reel4: "6,11,11,11,4,10,10,10,3,12,12,12,9,8,8,8,8,9,1,11,4,12,7,11,7,3,6,4,5,10",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646035701289",
        sa: "4,9,10,10,10",
        sb: "6,11,11,11,4",
        sc: "4.00,5.00,10.00,20.00,30.00,40.00,50.00,100.00,250.00,500.00,1000.00,2000.00",
        defc: "40.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "40.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,300,100,0,0;500,150,90,0,0;250,125,75,0,0;150,100,70,0,0;100,80,60,0,0;80,60,30,0,0;80,60,25,0,0;75,50,20,0,0;75,50,20,0,0;75,50,20,0,0",
        l: "50",
        rtp: "94.00",
        s: "10,4,6,11,6,10,5,12,6,4,3,11,12,1,5,9,11,3,12,7",
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
        balance_bonus: 0,
        balance_cash: 0,
        balance: 0,
        c: player.betPerLine,
        l: 50,
        na: "s",
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 4,
        sver: 5,
        tw: player.machine.winMoney,
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
    if (player.machine.maskView.length > 0) {
        result["is"] = Util.view2String(player.machine.maskView);
        result["ep"] = "2~17~2,7,12,17";
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
        if (player.machine.currentGame == "FREE") {
            result["fs_opt_mask"] = "fs,m";
            result["fs_opt"] = "40,1~13,3~8,5~5,8";
            result["na"] = "fso";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = player.machine.freeSpinMulti;
            result["fswin"] = (player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney) / player.machine.freeSpinMulti;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["w"] = player.machine.winMoney / player.machine.freeSpinMulti;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = player.machine.freeSpinMulti;
            result["fswin_total"] = (player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney) / player.machine.freeSpinMulti;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;

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
        fsmax: "5",
        fsmul: "1",
        fsres: "0.00",
        fswin: "0.00",
        index: "1",
        n_reel_set: "3",
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["fsmul"] = player.machine.freeSpinMulti;
    result["fsmax"] = player.machine.freeSpinLength;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;