var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "10,3,8,7,9,8,7,5,5",
        balance: player.balance,
        cfgs: "1",
        reel0: "6,6,6,8,8,8,4,4,4,10,10,10,7,7,7,10,9,9,9,9,5,5,5,4,10,6,7,10,3,3,3",
        reel1: "6,6,6,5,5,5,7,7,7,9,9,9,8,8,8,10,10,10,10,6,3,3,3,10,7,5,4,4,4,5,4,10,9,3",
        reel2: "9,9,9,9,5,3,3,3,4,4,4,6,6,6,7,7,7,3,10,10,8,8,8,5,7,9,9,10,10,5,5,5",
        ver: "2",
        index: "1",
        balance_cash: player.balance,
        def_sb: "9,6,9",
        def_sa: "6,5,6",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: `{props:{max_rnd_sim:\"1\",max_rnd_hr:\"82182\",max_rnd_win:\"500\"}}`,
        stime: new Date().getTime(),
        sa: "6,5,6",
        sb: "9,6,9",
        sc: "40.00,80.00,120.00,200.00,300.00,400.00,1000.00,2000.00,4000.00,6000.00,8000.00,10000.00,20000.00",
        defc: "400.00",
        sh: 3,
        wilds: "2~0,0,0~1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "400.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;500,0,0;50,0,0;50,0,0;20,0,0;20,0,0;20,0,0;20,5,0;5,0,0",
        l: 5,
        rtp: "96.06",
        s: "10,3,8,7,9,8,7,5,5",
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
        l: 5,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };

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
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
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