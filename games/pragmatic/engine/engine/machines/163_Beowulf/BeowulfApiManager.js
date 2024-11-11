var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "12,7,11,10,8,9,8,5,6,7,8,6,12,11,9,11,7,6,5,9",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "10,3,1,4,6,8,5,10,11,12,7,7,9,2,12,6,11,11",
        ver: "2",
        reel0: "1,7,7,7,9,9,9,6,6,10,3,3,3,3,9,11,12,12,12,5,8,12,11,4,12,7,5,3,4,8",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "3,8,10,9,7",
        def_sa: "1,7,7,7,9",
        reel3: "6,5,7,3,12,9,1,10,3,9,11,2,12,4,6,8,8,4,12",
        reel2: "1,5,3,4,5,7,11,10,10,10,11,11,7,6,12,12,12,12,3,9,2,10,8,6",
        reel4: "3,8,10,9,7,12,10,6,12,8,11,1,5,7,12,8,4,11",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~25,5,1,0,0~20,15,10,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1643365396111",
        sa: "1,7,7,7,9",
        sb: "3,8,10,9,7",
        sc: "5.00,10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;2500,500,50,0,0;1500,400,40,0,0;800,300,30,0,0;500,200,25,0,0;400,150,20,0,0;300,100,15,0,0;200,75,10,0,0;100,50,10,0,0;75,25,5,0,0;50,15,5,0,0;0,0,0,0,0",
        l: "40",
        rtp: "96.66",
        s: "12,7,11,10,8,9,8,5,6,7,8,6,12,11,9,11,7,6,5,9"
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
        l: "40",
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
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        } else if (player.machine.currentGame == "BONUS") {
            result["bw"] = 1;
            result["na"] = "b";
            result["rsb_c"] = player.machine.bonusIndex;
            result["rsb_m"] = player.machine.moneyBonusLength;
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        counter: "1",
        index: param.index,
        na: "b",
        rsb_c: "",
        rsb_m: "3",
        s: "12,7,11,10,8,9,8,5,6,7,8,6,12,11,9,11,7,6,5,9",
        stime: new Date().getTime(),
        sver: "5",
    };

    result["counter"] = ++param.counter;
    result["s"] = Util.view2String(player.machine.view);
    // result["s"] = "3,13,13,13,3,3,13,3,13,13,3,13,13,13,13,3,3,13,3,13";
    result["rsb_c"] = player.machine.bonusIndex;
    result["rsb_m"] = player.machine.moneyBonusLength;

    if (player.machine.currentGame == "BASE") {
        var winLines = player.machine.winLines;
        for (var i = 0; i < winLines.length; i++) {
            result[`l${i}`] = winLines[i];
        }
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;
        result["na"] = "cb";
    }

    return result;
};

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "99,986.50",
        coef: "1.00",
        index: "90",
        balance_cash: "99,986.50",
        balance_bonus: "0.00",
        na: "s",
        rw: "2.00",
        stime: "1643365512789",
        wp: "0",
        sver: "5",
        counter: "180",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["rw"] = player.machine.moneyBonusWin;

    return result;
};

module.exports = ApiManager;
