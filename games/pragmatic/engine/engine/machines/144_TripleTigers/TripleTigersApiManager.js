var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "11,11,11,3,4,5,11,11,11",
        c_paytable: "12~any~8,9,10~10,0,0~2",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "11,8,11,10,11,8,11,6,11,8,11,3,11,9,11,7,11,5,11,9,11,8,11,9,11,8,11,4,11,10,11,8,11,7,11,6",
        ver: "2",
        reel0: "10,11,5,11,8,11,6,8,7,11,3,11,8,11,4,11,9,11,9,11,10,6,11,9",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "6,7,8",
        def_sa: "11,8,9",
        reel2: "4,11,8,11,10,11,9,11,8,11,6,11,8,11,10,11,9,11,3,11,8,11,10,11,7,11,8,11,10,11,5,11,4,11,7",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1655023438683",
        sa: "11,8,9",
        sb: "6,7,8",
        sc: "100,200,500,1000,2500,5000,10000,30000,50000",
        defc: "100",
        sh: "3",
        wilds: "2~0,0,0~1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;500,0,0;300,0,0;200,0,0;100,0,0;80,0,0;50,0,0;30,0,0;20,0,0;0,0,0",
        l: "1",
        rtp: "97.52",
        s: "11,11,11,3,4,5,11,11,11",
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
    if (winLines.length)
        result["com"] = player.machine.winSymbols.join();

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
