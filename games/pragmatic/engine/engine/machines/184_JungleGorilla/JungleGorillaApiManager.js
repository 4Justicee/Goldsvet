var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,9,10,8,8,9,8,5,11,11,11,11,8,7,7",
        balance: "100,000.00",
        cfgs: "1",
        accm: "cp~np~mp;cp~np~mp;cp~np~mp;cp~np~mp;cp~np~mp",
        reel1: "7,9,8,11,10,6,4,8,7,10,2,11,3,7,6,9,8,5",
        ver: "2",
        reel0: "11,3,9,11,10,8,7,9,5,10,4,11,7,8,2,9,6",
        acci: "0;1;2;3;4",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "10,10,11,9,5",
        def_sa: "11,7,3,4,6",
        reel3: "10,6,4,8,11,7,9,6,2,9,8,3,5",
        reel2: "2,9,10,11,5,9,7,11,6,10,9,11,4,3,10,5,8",
        reel4: "3,9,7,11,4,7,6,8,11,7,5,11,6,2,11,10",
        balance_bonus: "0.00",
        na: "s",
        accv: "1~1~5;1~1~5;1~1~5;1~1~5;1~1~5",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        mbri: "0,1,2,3,4",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"52631578\",max_rnd_win:\"2000\"}}",
        stime: "1647335674609",
        sa: "11,7,3,4,6",
        sb: "10,10,11,9,5",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~250,50,30,0,0~1,1,1,1,1",
        bonuses: "0",
        wll_i: "10000",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;250,50,30,0,0;90,40,25,0,0;70,35,20,0,0;60,30,15,0,0;50,24,12,0,0;40,20,10,0,0;35,18,10,0,0;30,16,8,0,0;25,12,6,0,0;20,10,5,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.57",
        s: "3,9,10,8,8,9,8,5,11,11,11,11,8,7,7",
        accInit: "[{id:0,mask:\"cp;np;mp\"},{id:1,mask:\"cp;np;mp\"},{id:2,mask:\"cp;np;mp\"},{id:3,mask:\"cp;np;mp\"},{id:4,mask:\"cp;np;mp\"}]",
        mbr: "1,1,1,1,1"
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
        balance: "100,116.81",
        index: "10",
        balance_cash: "100,116.81",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "11,9,6,9,4",
        sb: "7,3,9,8,10",
        sh: "3",
        c: player.betPerLine,
        sver: "5",
        counter: "20",
        l: "20",
        ls: 0,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
        acci: "0;1;2;3;4",
        mbri: "0,1,2,3,4",
        accm: "cp~np~mp;cp~np~mp;cp~np~mp;cp~np~mp;cp~np~mp"
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    result["accv"] = player.machine.multiInfo.accv;
    result["mbr"] = player.machine.multiInfo.mbrStr;

    if (player.machine.wildMultiPos.pos.length > 0) {
        result["mbp"] = player.machine.wildMultiPos.pos;
        result["mbv"] = player.machine.wildMultiPos.multi;
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
        counter: "2",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;
