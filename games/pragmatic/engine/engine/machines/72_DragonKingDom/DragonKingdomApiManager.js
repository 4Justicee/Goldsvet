var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "4,3,5,6,4,9,7,5,3",
        balance: "100,000.00",
        cfgs: "1",
        accm: "cp;cp~tp~lvl~sc;cp~pp",
        reel1: "8,9,9,9,7,2,5,7,7,7,6,5,5,5,3,3,3,3,4,9,8,8,8,2,2,2,4,4,4,6,6,6,2,6,3,6,9,3,6,5,9,2,7,4,6,3,6,3,4,7,5,3,7,3,6,3,7,9,2,9,3,7,6,2,7,6,3,9,7,9,7,6,2,3,4,2,6,3,9,6,9,6,7,6,2,9,2",
        ver: "2",
        reel0: "9,9,9,4,3,4,4,4,6,9,8,2,7,7,7,7,5,2,2,2,3,3,3,5,5,5,8,8,8,6,6,6,4,5,7,2,5",
        acci: "0;1;2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "7,4,6",
        def_sa: "7,5,4",
        reel2: "6,6,6,4,4,4,4,8,6,3,7,2,8,8,8,9,5,5,5,5,9,9,9,3,3,3,7,7,7,2,2,2,5,2,8,5,2,8,3,4,5,4,2,3,8,2,8,5,7,3",
        balance_bonus: "0.00",
        na: "s",
        accv: "0;0~1~0~0;0~0",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{lvls:\"1:1,2:5,3:10,4:15,5:20,6:25\"}}",
        stime: new Date().getTime(),
        sa: "7,5,4",
        sb: "7,4,6",
        // sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        sc: "40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,9000.00,10000.00,15000.00,20000.00,25000.00",
        // defc: "100.00",
        defc: "200.00",
        sh: "3",
        wilds: "2~25,0,0~1,1,1",
        bonuses: "0",
        fsbonus: "",
        // c: "100.00",
        c: "200.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;20,0,0;15,0,0;10,0,0;8,0,0;5,0,0;3,0,0;2,0,0",
        l: "5",
        rtp: "96.49",
        s: "4,3,5,6,4,9,7,5,3",
        accInit: "[{id:0,mask:\"cp;mp\"},{id:1,mask:\"cp;tp;lvl;sc;cl\"},{id:2,mask:\"cp;pp;mp\"}]"
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
        l: "5",
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

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

    result["acci"] = "0;1;2";
    result["accm"] = player.machine.accm;
    result["accv"] = player.machine.accv;
    result["wmt"] = "pr";
    result["wmv"] = player.machine.winMulti;
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