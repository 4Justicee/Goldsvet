var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "5,3,0,3,7,8,6,5,7",
        prg_m: "cp,r",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "4,8,0,8,6,7,5,0,9,9,2,3,3,3,6",
        ver: "2",
        reel0: "0,9,3,3,3,9,5,7,6,9,3,9,4,3,8,2,5,3,3,7",
        prg: "0,0",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "5,4,9",
        def_sa: "9,0,9",
        reel2: "7,2,8,4,1,3,6,8,4,8,5,9,3,3,3,9,0,8,0,7,8,9,8,5,3,7,8,6,5,9,3,3,5,0",
        prg_cfg_m: "s",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        stime: new Date().getTime(),
        sa: "9,0,9",
        sb: "5,4,9",
        sc: "60.00,100.00,200.00,500.00,600.00,1000.00,2500.00,5000.00,10000.00,20000.00,30000.00,36000.00",
        defc: "600.00",
        prg_cfg: "1",
        sh: "3",
        wilds: "2~500,5,0~1,1,1",
        bonuses: "0;1",
        fsbonus: "",
        c: "600.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;30,4,0;24,3,0;20,3,0;15,1,0;10,1,0;8,0,0;5,0,0",
        l: "3",
        rtp: "97.16",
        s: "5,3,0,3,7,8,6,5,7"
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
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0",
        na: "s",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: "3",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "3",
        tw: player.machine.winMoney,
        w: player.machine.winMoney
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

    if (player.machine.currentGame == "BASE") {
        result["prg_m"] = "cp,r";
        if (player.machine.upgradeCount > 0) {
            result["prg"] = `${player.machine.upgradeCount},1`;
        } else {
            result["prg"] = "0,0";
        }
    } else if (player.machine.currentGame == "BONUS") {
        result["na"] = "b";

        result["bg_i_mask"] = "ic";
        result["bg_i"] = "10";
        for (var i = 0; i < player.machine.bonusMoreArray.length; i++) {
            result["bg_i_mask"] += ",uc";
            result["bg_i"] += `,${player.machine.bonusMoreArray[i]}`;
        }

        result["bw"] = 1;
        result["coef"] = player.betPerLine;
        result["end"] = 0;
        result["level"] = 0;
        result["lifes"] = 1;
        result["prg_m"] = "cp,r";
        result["prg_r"] = 1;
        result["prg"] = `${player.machine.upgradeCount},0`;
        result["rw"] = 0;
        result["wp"] = 0;

        var statusArray = [],
            winsMaskArray = [],
            winsArray = [];
        for (var i = 0; i < player.machine.bonusLength; i++) {
            statusArray.push(0);
            winsMaskArray.push("h");
            winsArray.push(0);
        }
        result["status"] = statusArray.join(",");
        result["wins_mask"] = winsMaskArray.join(",");
        result["wins"] = winsArray.join(",");
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
        counter: "2"
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
        counter: "1",
        index: "1",
        na: "cb",
        stime: "",
        sver: "5"
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;

    result["na"] = "cb";

    result["bg_i_mask"] = "ic";
    result["bg_i"] = "10";
    for (var i = 0; i < player.machine.bonusMoreArray.length; i++) {
        result["bg_i_mask"] += ",uc";
        result["bg_i"] += `,${player.machine.bonusMoreArray[i]}`;
    }

    result["coef"] = player.betPerLine;
    result["end"] = 1;
    result["level"] = 1;
    result["lifes"] = 0;
    result["rw"] = player.machine.moneyBonusWin;
    result["tw"] = player.machine.moneyBonusWin;
    result["wp"] = player.machine.moneyBonusWin / player.betPerLine;

    var statusArray = [];
    for (var i = 0; i < player.machine.bonusLength; i++) {
        statusArray.push(1);
    }
    result["status"] = statusArray.join(",");
    result["wins_mask"] = player.machine.bonusTypeArray.join(",");
    result["wins"] = player.machine.bonusValueArray.join(",");

    return result;
};

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        stime: "1629939208592",
        sver: "5",
        counter: "2"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["na"] = "s";
    result["coef"] = player.betPerLine;
    result["rw"] = player.machine.moneyBonusWin;
    result["wp"] = 0;

    return result;
};

module.exports = ApiManager;
