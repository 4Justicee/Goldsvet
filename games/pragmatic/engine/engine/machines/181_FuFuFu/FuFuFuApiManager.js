var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,6,5,6,3,6,4,6,4",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "3,6,5,6,3,6,4,6,5,6,5,6,3,6,3,6,3,6",
        ver: "2",
        reel0: "5,6,3,6,3,6,4,6,4,6,4,6,5,6",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "6,5,4",
        def_sa: "6,3,3",
        reel2: "4,6,4,6,3,6,4,6,5,6,5,6,5,6",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1655023705622",
        sa: "6,3,3",
        sb: "6,5,4",
        sc: "50.00,60.00,80.00,100.00,250.00,500.00,750.00,1000.00,2500.00,5000.00,10000.00,15000.00,25000.00,50000.00,75000.00,100000.00",
        defc: "250.00",
        sh: "3",
        wilds: "2~0,0,0~1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "250.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;100,0,0;50,0,0;25,0,0;0,0,0",
        l: "1",
        rtp: "96.84",
        s: "3,6,5,6,3,6,4,6,4",
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
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "1",
        na: (player.machine.winMoney > 0) ? `c` : `s`,
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "3",
        stime: new Date().getTime(),
        sver: "5",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        index: param.index,
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
    };

    return result;
}

module.exports = ApiManager;
