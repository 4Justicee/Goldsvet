var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "7,3,9,11,8,5,12,3,7,4,11,9,10,3,12",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "9,10,12,4,7,6,1,11,9,7,3,9,10,2,12,12,12,10,11,9,9,5,12,9,7,11,8,9,5,10,8,8,9,9",
        ver: "2",
        reel0: "7,11,5,12,9,8,4,8,7,10,8,10,6,8,10,7,12,12,8,3,12,7,8,11,6,11,11,1,9,8,8,10,5,11,9",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "8,10,8,11,7",
        def_sa: "8,9,10,11,12",
        reel3: "8,1,11,8,11,7,11,12,2,11,10,11,8,4,10,10,9,2,9,4,5,7,7,11,12,9,11,7,6,3,6,11,8,11",
        reel2: "3,9,11,8,5,7,10,11,10,6,7,7,12,10,2,12,11,8,9,2,9,1,12,4,12,12,10,8,10,9,10,10,6",
        reel4: "4,12,8,8,12,9,7,7,6,9,11,12,12,10,5,8,12,5,12,11,7,12,6,11,12,10,7,1,8,9,5,3,12",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~100,10,5,1,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: new Date().getTime(),
        sa: "8,9,10,11,12",
        sb: "8,10,8,11,7",
        sc: "20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00,10000.00",
        defc: "20.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~2,2,2,2,2",
        bonuses: "0",
        fsbonus: "",
        c: "20.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;5000,500,100,10,2;2500,250,50,5,0;1250,100,20,3,0;750,100,20,3,0;500,30,10,0,0;300,25,5,0,0;200,20,5,0,0;150,20,5,0,0;125,15,5,0,0;100,15,5,0,0",
        l: "9",
        rtp: "96.48",
        s: "7,3,9,11,8,5,12,3,7,4,11,9,10,3,12"
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
        l: "9",
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

    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
        if (player.machine.hasWildInScatterWin) {
            result["psyme"] = "1~2~wild_mul";
        }
    }

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

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

module.exports = ApiManager;