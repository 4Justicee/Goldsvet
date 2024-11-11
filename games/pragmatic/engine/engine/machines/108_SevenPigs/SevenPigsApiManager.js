var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,4,4,2,5,3,4,4,2,5,3,4,4,2,5",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "6,6,6,6,6",
        def_sa: "4,4,4,4,4",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1644573116033",
        sa: "4,4,4,4,4",
        sb: "6,6,6,6,6",
        // sc:"10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00,10000.00,11500.00",
        sc: "30.00,50.00,100.00,250.00,300.00,500.00,1000.00,3000.00,5000.00,10000.00,15000.00",
        defc: "300.00",
        sh: "3",
        wilds: "2~1500,400,50,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "300.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;150,50,20,0,0;50,15,5,0,0;50,15,5,0,0;15,5,3,0,0;15,5,3,0,0",
        l: "7",
        rtp: "95.99",
        reel_set0: "7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,1,6,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,2,2,2,2,2~7,7,7,7,7,7,7,1,4,4,4,4,4,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,4,4,4,4,4,7,7,7,7,7,2,2,2,2,2,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5~7,7,7,7,7,4,4,4,4,6,6,6,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,4,4,4,4,4,7,7,7,7,7,7,7,7,2,2,2,2,2,2,2,2,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5~7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,3,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,4,4,4,4,7,7,7,7,7,7,7,7,2,2,2,2,2,2,2,2,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5~7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,2,2,2,2,2",
        s: "3,4,4,2,5,3,4,4,2,5,3,4,4,2,5",
        reel_set1: "7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,1,6,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,2,2,2,2,2~7,7,7,7,7,7,7,1,4,4,4,4,4,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,4,4,4,4,4,7,7,7,7,7,2,2,2,2,2,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5~7,7,7,7,7,4,4,4,4,6,6,6,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,4,4,4,4,4,7,7,7,7,7,7,7,7,2,2,2,2,2,2,2,2,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5~7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,3,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,4,4,4,4,7,7,7,7,7,7,7,7,2,2,2,2,2,2,2,2,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5~7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,2,2,2,2,2",
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
        l: "7",
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
        if (player.machine.currentGame == "BONUS") {
            result["bw"] = 1;
            result["end"] = 0;
            result["i_pos"] = `${player.machine.scatterPositions.join(",")}`;
            result["level"] = player.machine.bonusSpinIndex;
            result["n_reel_set"] = 0;
            result["na"] = "b";
            result["status"] = player.machine.status.join(",");
            result["win_fs"] = player.machine.freeSpinLength;
            result["win_mul"] = player.machine.freeSpinMulti;
            result["wins_mask"] = player.machine.bonusMaskStr;
            result["wins"] = player.machine.bonusWinStr;
        }
    } //                       
    else if (prevGameMode == "BONUS") {
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {
            result["end"] = 1;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = player.machine.freeSpinMulti;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
        } //                                     ->                       
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        result["w"] = player.machine.winMoney / player.machine.freeSpinMulti;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = player.machine.freeSpinMulti;
            result["fswin"] = player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = player.machine.freeSpinMulti;
            result["fswin_total"] = player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["n_reel_set"] = 0;
        }
    }

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        index: param.index,
        na: "b",
        stime: new Date().getTime(),
        sver: "5",
    };


    result["end"] = 0;
    result["i_pos"] = `${player.machine.scatterPositions.join(",")}`;
    result["level"] = player.machine.bonusSpinIndex;
    result["status"] = player.machine.status.join(",");
    result["win_fs"] = player.machine.freeSpinLength;
    result["win_mul"] = player.machine.freeSpinMulti;
    result["wins_mask"] = player.machine.bonusMaskStr;
    result["wins"] = player.machine.bonusWinStr;

    if (player.machine.currentGame == "FREE") {
        //                    
        result["end"] = 1;
        result["fs"] = 1;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = player.machine.freeSpinMulti;
        result["fsres"] = 0.0;
        result["fswin"] = 0.0;
        result["na"] = "s";
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
