var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,6,5,6,3,6,4,6,4",
        c_paytable: "7~any~3,4,5~8,0,0~2",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "5,6,4,6,5,6,4,6,5,6,3,6,5,6,4,6,5,6,3,6,5,6,4,6",
        ver: "2",
        reel0: "5,6,4,6,5,6,4,6,5,6,3,6,5,6,4,6,5,6,3,6,5,6,4,6",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "6,5,6",
        def_sa: "6,4,6",
        reel2: "5,6,4,6,5,6,4,6,5,6,3,6,5,6,4,6,5,6,3,6,5,6,4,6",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1644572004070",
        sa: "6,4,6",
        sb: "6,5,6",
        sc: "200.00,500.00,750.00,1000.00,2000.00,5000.00,10000.00,15000.00,25000.00,50000.00,75000.00,100000.00",
        defc: "2000.00",
        sh: "3",
        wilds: "2~0,0,0~1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "2000.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;88,0,0;58,0,0;28,0,0;0,0,0",
        l: "1",
        rtp: "97.09",
        s: "3,6,5,6,3,6,4,6,4"
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
        l: 1,
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