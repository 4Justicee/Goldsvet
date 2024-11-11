var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "7,4,9,7,4,9,7,4,9",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "4,4,4,9,9,9,7,7,7,7,7,7,2,2,2,8,8,8,9,7,7,4,7,7,5,5,5,5,5,6,6,6,9,2,3,3,3,9,9,9,8,5,8,9,5,3,6,4",
        ver: "2",
        reel0: "8,8,8,8,7,7,7,6,6,6,6,6,8,8,4,4,4,4,8,6,5,5,5,7,8,8,6,9,9,9,9,9,8,6,8,4,3,3,3,3,9,8,9,4,3,2,2,2,9,5,2,2,6,6,7",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "4,4,4",
        def_sa: "8,8,8",
        reel2: "4,4,4,4,8,8,8,9,9,9,9,7,7,7,7,5,5,5,3,3,3,7,7,3,8,9,5,3,8,4,9,7,9,5,5,9,9,6,6,6,6,7,2,2,2,9,2",
        balance_bonus: "0.00",
        na: "s",
        aw: "3",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        base_aw: "m~1;m~2;m~3;m~5;m~10;m~15",
        stime: "1647317158324",
        sa: "8,8,8",
        sb: "4,4,4",
        sc: "200,400,1000,2000,5000,10000,20000,60000,100000",
        defc: "200",
        def_aw: "3",
        sh: "3",
        wilds: "2~25,0,0~1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;20,0,0;15,0,0;12,0,0;10,0,0;8,0,0;5,0,0;2,0,0",
        l: "5",
        rtp: "96.52",
        s: "7,4,9,7,4,9,7,4,9",
        awt: "6rl",
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
        tw: "0.00",
        balance: "99,999.95",
        index: "2",
        balance_cash: "99,999.95",
        balance_bonus: "0.00",
        na: "s",
        aw: "1",
        stime: "1647317177702",
        sa: "8,8,7",
        sb: "6,9,8",
        sh: "3",
        c: "0.01",
        sver: "5",
        counter: "4",
        l: "5",
        s: "8,8,7,6,8,7,6,9,7",
        w: "0.00",
        gwm: "2",
        awt: "6rl",
    };

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["c"] = player.betPerLine;
    result["s"] = player.machine.view;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
        var winLines = player.machine.winLines;
        for (var i = 0; i < winLines.length; i++) {
            result[`l${i}`] = winLines[i];
        }
        result["com"] = player.machine.winSymbols.join();
    }
    result["na"] = nextAction;

    result["aw"] = player.machine.winMultiIndex;
    if (player.machine.winMulti > 1) {
        result["gwm"] = player.machine.winMulti;
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

module.exports = ApiManager;