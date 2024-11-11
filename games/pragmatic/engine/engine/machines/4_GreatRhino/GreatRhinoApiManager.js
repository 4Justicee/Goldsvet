var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,9,8,4,7,7,3,4,11,11,10,11,6,5,10",
        balance: "0.00",
        cfgs: "2529",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "8,4,2,8,7",
        def_sa: "5,7,3,3,3",
        bonusInit: `[{bgid:0,bgt:26,bg_i:"375, 500",bg_i_mask:"psw, psw"}]`,
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,2,0,0~0,0,10,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        bg_i: "375,500",
        rt: "d",
        stime: "1646037287251",
        sa: "5,7,3,3,3",
        sb: "8,4,2,8,7",
        sc: "10.00,25.00,50.00,125.00,250.00,500.00,1500.00,2500.00,5000.00",
        defc: "50.00",
        sh: "3",
        wilds: "2~500,150,50,4,0~1,1,1,1,1;14~500,150,50,4,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "50.00",
        sver: "5",
        n_reel_set: "0",
        bg_i_mask: "psw,psw",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,150,50,2,0;200,50,15,0,0;150,40,10,0,0;100,30,10,0,0;50,25,10,0,0;25,10,5,0,0;20,10,5,0,0;20,10,5,0,0;20,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "95.48",
        reel_set0: "5,7,3,3,3,11,11,4,9,2,2,10,7,8,9,4,10,5,9,11,10,7,5,6,8,3,10,10,9~11,8,10,3,3,3,11,9,11,4,7,4,2,2,7,10,10,11,1,8,6,8,11,3,5,6,3~4,10,3,3,3,11,9,10,6,7,11,7,2,2,8,4,8,3,6,9,10,9,1,5,2,2,3,5,9,2,2,8,8~8,7,7,9,9,9,2,2,11,10,1,9,6,5,4,5,8,8,10,4,3,3,3,11,11,6,2,2,11~8,4,2,2,8,7,6,3,3,3,11,10,8,11,4,10,11,9,3,10,5,10,9,6,9,9,7,5,7",
        s: "6,9,8,4,7,7,3,4,11,11,10,11,6,5,10",
        reel_set1: "9,10,10,11,2,2,9,10,14,14,9,11,8,5,9,5,11,9,7,6,7,14,14,7,10,4~8,8,14,14,11,11,5,4,6,14,14,11,5,7,10,10,6,11,10,4,9,2,2,9~8,2,2,14,14,10,7,9,11,8,10,9,14,14,9,7,4,6,6,5,7,10~2,2,14,14,11,6,7,4,5,10,14,14,6,11,9,8,7,8,9,8,4,6,10~11,14,14,7,9,11,7,5,5,4,9,9,10,6,2,2,14,14,7,11,8,6,8,10,9",
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
        n_reel_set: "0",
        na: "s",
        l: "20",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: "10,9,8,7,9",
        sb: "8,9,8,7,6",
        sh: "3",
        sver: "5",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
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
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.0;
            result["fsres"] = 0.0;
            result["n_reel_set"] = 1;
            result["na"] = "s";

            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        } else if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bgid"] = "0";
            result["bgt"] = "26";
            result["bpw"] = "0.00";
            result["bw"] = "1";
            result["end"] = "0";
            result["rsb_c"] = "0";
            result["rsb_m"] = "3";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["n_reel_set"] = 1;
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        bgid: "0",
        bgt: "26",
        bpw: "0.00",
        counter: "1",
        end: "0",
        index: "1",
        na: "b",
        rsb_c: player.machine.superBonusCount,
        rsb_m: player.machine.superBonusMax,
        s: "13,3,3,3,13,13,3,3,3,13,13,13,3,3,13",
        stime: "1616530497566",
        sver: "5",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;
    result["s"] = Util.view2String(player.machine.view);
    result["bpw"] = player.machine.moneyBonusWin;

    if (player.machine.currentGame == "BASE") {
        //                                 
        var winLines = player.machine.winLines;
        for (var i = 0; i < winLines.length; i++) {
            result[`l${i}`] = winLines[i];
        }
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;
        result["coef"] = player.betPerLine;
        result["na"] = "cb";
        result["end"] = 1;
    }

    return result;
};

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        rw: "100,000",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        wp: "0",
        coef: player.betPerLine,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;