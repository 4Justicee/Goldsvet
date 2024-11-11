var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bonuses: "0",
        c: "100.00",
        cfgs: "1",
        counter: "2",
        def_s: "7,9,1,3,7,8,4,11,1,9,8,11,11,10,9",
        def_sa: "11,9,7,4,11",
        def_sb: "8,1,11,10,9",
        defc: "100.00",
        fsbonus: "",
        gmb: "0,0,0",
        index: "1",
        l: "20",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;3000,150,25,5,0;250,75,20,0,0;250,75,20,0,0;150,50,10,0,0;150,50,10,0,0;75,25,5,0,0;75,25,5,0,0;50,15,5,0,0;50,15,5,0,0;0,0,0,0,0",
        reel0: "4,5,11,11,11,3,6,7,8,10,10,10,1,9,7,8,3,10,4,11,8,8,8,5,6,7,8,9,9,9,7",
        reel1: "3,2,10,4,11,8,8,8,5,6,7,8,9,9,9,7,4,5,11,11,11,3,6,7,8,10,10,10,1,9,7,8",
        reel2: "8,9,9,9,7,4,5,11,11,11,3,6,7,8,10,10,10,1,9,7,8,3,2,10,4,11,8,8,8,5,6,7",
        reel3: "10,10,10,1,9,7,8,3,2,10,4,11,8,8,8,5,6,7,8,9,9,9,7,4,5,11,11,11,3,6,7,8",
        reel4: "6,7,8,9,9,9,7,4,5,11,11,11,3,6,7,8,10,10,10,1,9,7,8,3,10,4,11,8,8,8,5",
        rt: "d",
        rtp: "96.06",
        s: "7,9,1,3,7,8,4,11,1,9,8,11,11,10,9",
        sa: "11,9,7,4,11",
        sb: "8,1,11,10,9",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        scatters: "1~500,50,5,0,0~0,0,0,0,0~1,1,1,1,1",
        sh: "3",
        stime: "1629939208592",
        sver: "5",
        ver: "2",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;12~0,0,0,0,0~1,1,1,1,1",
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
        balance_bonus: "0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: "100.00",
        counter: "1",
        index: "1",
        l: "20",
        na: "s",
        s: "11,11,9,11,7,11,7,6,11,9,1,8,10,7,3",
        sa: "11,11,4,11,6",
        sb: "10,3,11,10,6",
        sh: "3",
        stime: new Date().getTime(),
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    result["s"] = Util.view2String(player.machine.view);
    result["c"] = player.betPerLine;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

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

    if (player.machine.wildExpandView != null) {
        result["is"] = Util.view2String(player.machine.view);
        result["s"] = Util.view2String(player.machine.wildExpandView);
        result["ep"] = `2~${player.machine.wildExpandings.before.join()}~${player.machine.wildExpandings.after.join()}`;
        result["srf"] = `2~12~${player.machine.wildExpandings.after.join()}`;
    }

    if (player.machine.prevTumbleStatus == "NOTUMBLE" && player.machine.tumbleStatus == "TUMBLE") {
        result["na"] = "s";
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "t";
        result["tmb"] = player.machine.tumbles.join('~');
    }

    if (player.machine.prevTumbleStatus == "TUMBLE") {
        result["gwm"] = player.machine.tumbleMulti;
        result["prg_m"] = "wm";
        result["prg"] = player.machine.tumbleMulti;
        result["rs_win"] = player.machine.tmb_win;
        result["tw"] = player.machine.tmb_res;
        if (player.machine.tumbleStatus == "TUMBLE") {
            result["na"] = "s";
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.tumbleMulti - 1;
            result["rs"] = "t";
            result["tmb"] = player.machine.tumbles.join('~');
        } else {
            result["rs_t"] = player.machine.tumbleMulti - 1;
            result["na"] = "c";
        }
    }

    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
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