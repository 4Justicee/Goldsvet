var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '4,5,6,4,5,6,4,5,6',
        balance: '0.00',
        cfgs: '2858',
        reel1: '3,3,3,9,9,9,9,9,9,8,8,8,8,8,8,10,10,10,10,10,10,9,9,9,7,7,7,7,7,7,5,5,5,5,5,5,6,6,6,6,6,6,4,4,4,4,4,4,10,10,10,10,10,10,8,8,8,5,5,5',
        ver: '2',
        reel0: '3,3,3,4,4,4,4,4,4,8,8,8,8,8,8,7,7,7,7,7,7,9,9,9,10,10,10,10,10,10,5,5,5,5,5,5,6,6,6,6,6,6,9,9,9,9,9,9,8,8,8,10,10,10,10,10,10,4,4,4',
        index: '1',
        balance_cash: '0.00',
        def_sb: '4,5,6',
        def_sa: '4,5,6',
        reel2: '3,3,3,10,10,10,10,10,10,9,9,9,6,6,6,6,6,6,10,10,10,10,8,8,8,8,8,8,7,7,7,7,7,7,5,5,5,5,5,5,4,4,4,4,4,4,8,8,8,9,9,9,9,9,9,6,6,6',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0~0,0,0~1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        stime: '1646038263411',
        sa: '4,5,6',
        sb: '4,5,6',
        sc: '20.00,30.00,40.00,50.00,100.00,150.00,250.00,500.00,750.00,1000.00,1500.00,2500.00,5000.00,10000.00,15000.00,20000.00',
        defc: '100.00',
        sh: '3',
        wilds: '2~1000,0,0~1,1,1;11~1000,0,0~1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '100.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0;0,0,0;0,0,0;100,0,0;75,0,0;50,0,0;30,0,0;20,0,0;12,0,0;8,0,0;4,0,0;0,0,0',
        l: '5',
        rtp: '95.51',
        s: '4,5,6,4,5,6,4,5,6',
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
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        stime: new Date().getTime(),
        sh: 3,
        sver: 5,
        c: player.betPerLine,
        l: 5,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };

    //com                               ...
    //rs                                uw
    //srf   3~11~                  

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

    if (winLines.length)
        result["com"] = player.machine.winSymbols.join();
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }

    result["na"] = nextAction;
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.prevRespinStatus == "NORESPIN" && player.machine.respinStatus == "RESPIN") {
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "uw";
    } else if (player.machine.prevRespinStatus == "RESPIN") {
        result["is"] = player.machine.respinMask.join();
        result["srf"] = "3~11~" + player.machine.respinStickyPos.join();

        if (player.machine.respinStatus == "RESPIN") {
            ;
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.respinIndex - 1;
            result["rs_win"] = 0;
            result["rs"] = "uw";
        } else if (player.machine.respinStatus == "NORESPIN") {
            result["rs_t"] = player.machine.respinIndex - 1;
            result["rs_win"] = player.machine.respinWinMoney;
            result["na"] = "c";
        }
    }

    if (player.machine.respinStickyPos.length) {
        var sty = [];

        player.machine.respinStickyPos.forEach(function (item) {
            sty.push(item + "," + (player.machine.respinStatus == "RESPIN" ? item : "-1"));
        });

        result["sty"] = sty.join('~');
    }
    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        counter: "2",
        index: "3",
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    return result;
}

module.exports = ApiManager;
