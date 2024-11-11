var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "7,7,5,9,3,4,7,5,9,8,4,7,6,8,6",
        balance: "0.00",
        cfgs: "3744",
        reel1: "3,8,4,3,4,9,1,6,6,6,7,7,7,5,3,8,8,8,9,9,9,1,7,4,7,5,8",
        ver: "2",
        reel0: "5,1,8,8,8,4,7,7,7,3,6,6,6,3,5,1,9,9,9,4,7,6,5",
        index: "1",
        balance_cash: "0.00",
        def_sb: "8,6,6,9,6",
        def_sa: "7,5,9,9,9",
        reel3: "3,8,4,3,4,9,1,6,6,6,7,7,7,5,3,8,8,8,9,9,9,1,7,4,7,5,8",
        reel2: "3,8,4,3,4,9,1,6,6,6,7,7,7,5,3,8,8,8,9,9,9,1,7,4,7,5,8",
        reel4: "3,8,4,3,4,9,1,6,6,6,7,7,7,5,3,8,8,8,9,9,9,1,7,4,7,5,8",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~50,10,2,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646044100182",
        sa: "7,5,9,9,9",
        sb: "8,6,6,9,6",
        sc: "40.00,50.00,80.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,5000.00,10000.00,15000.00,20000.00",
        defc: "400",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "400",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;5000,1000,100,0,0;500,200,50,0,0;500,200,50,0,0;200,50,20,0,0;200,50,20,0,0;200,50,20,0,0;200,50,20,5,0",
        l: "5",
        rtp: "95.67",
        s: "7,7,5,9,3,4,7,5,9,8,4,7,6,8,6",
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

    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
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