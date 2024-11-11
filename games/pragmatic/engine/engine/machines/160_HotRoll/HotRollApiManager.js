var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "8,4,8,3,8,3,8,4,8",
        c_paytable: "9~explicit~5,2,5~5000;10~explicit~5,3,5~3000;11~explicit~5,4,5~2000;12~explicit~5,5,5~1000;13~any_with_added_wild_multiplier~6~100,0,0;14~any_with_added_wild_multiplier~7~75,0,0;15~any_with_added_wild_multiplier~6,7~50,0,0;16~any_with_added_wild_multiplier~8~30,0,0;17~any_with_added_wild_multiplier~9~20,0,0;18~any_with_added_wild_multiplier~10~10,0,0;19~any_with_added_wild_multiplier~8,9,10~5,0,0;20~anywhere_on_line~11~10,5,2",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "6,12,9,12,7,12,11,12,8,12,10,12,8,12,8,12,6,12,9,12,7,12,9,12,10,12,4,12,9,12,8,12,9,12,10,12,7,12,9,12,6,2,6,12,9,12,8,12,9,12,9,12,8,12,10,12,9,12,3,12,9,12,7,12,8,12,6,12",
        ver: "2",
        reel0: "6,12,8,12,10,12,5,12,6,12,10,12,9,12,7,12,7,12,10,12,8,12,11,12,10,12,7,12,7,12,10,12,7,12,8,12,10,12,6,5,6,12,10,12,9,12,7,12,10,12,9,12,10,12,8,12",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "8,9,10",
        def_sa: "5,6,7",
        reel2: "10,12,9,12,10,12,8,12,8,12,5,12,10,12,9,12,10,12,10,12,7,12,9,12,8,12,11,12,10,12,8,12,6,5,6,12,10,12,7,12,8,12,10,12,9,12,8,12,9,12,8,12,10,12,6,12,11,12,8,12,7,12,10,12,8,12,10,12,8,12,9,12",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1654598537056",
        sa: "5,6,7",
        sb: "8,9,10",
        sc: "100,200,500,1000,2500,5000,10000,30000,50000",
        defc: "100",
        sh: "3",
        wilds: "2~0,0,0~1,1,5;3~0,0,0~1,1,4;4~0,0,0~1,1,3;5~0,0,0~1,1,2",
        bonuses: "0",
        fsbonus: "",
        c: "100",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;0,0,0;0,0,0;0,0,0;0,0,0;0,0,0;0,0,0;0,0,0;0,0,0;0,0,0;0,0,0",
        l: "9",
        rtp: "96.52",
        s: "8,4,8,3,8,3,8,4,8",
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
        l: "9",
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

    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    if (winLines.length) {
        result["com"] = player.machine.coms.join();
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
