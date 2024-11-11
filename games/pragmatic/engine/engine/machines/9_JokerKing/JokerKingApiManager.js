var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        bonuses: "0",
        c: "100.00",
        cfgs: "1",
        counter: "2",
        def_s: "3,6,6,6,6,6,7,6,6,6,6,6,7,6,6,6,6,6,7,6,6,6,6,6",
        def_sa: "8,8,8,8,8,8",
        def_sb: "8,8,8,8,3,8",
        defc: "100.00",
        fsbonus: "",
        prm: "1~2,3,5,10,25;1~25,25,25,25,25",
        wl_i: "tbm~5000",
        gmb: "0,0,0",
        index: "1",
        l: "25",
        n_reel_set: "0",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;125,40,15,10,0,0;125,40,15,8,0,0;50,25,12,6,0,0;40,15,10,5,0,0;30,12,8,4,0,0;25,10,5,3,0,0",
        reel_set_size: "2",
        reel_set0: "4,4,4,4,8,3,6,6,6,7,5,6,3,3,3,7,7,7,5,5,5,8,8,8,3,7,5,6,7,6,7,5,6,7,3,5,3,8,6,5,7,3,7,6,3,6,7,6,7,5,3,7,5,6,7,8,6,7,3,6,7,8,5,7,6,7,8,6,7,3,7,3,5,6,7,8,7,3,6,3,7,5,8,3,7,8,7,3,7,8,6,5,6,8,7,8,7,8,5,7,3,6,3,7,8,7,3,7,6,8,6,8,7,3,6,7,5,3,6,7,8,6,5,3,5,3,8,7,3,5,8,6,7,6,7,6,8,5,3,7,3,7,3,5,7,8,7,3,8,7,5,3,6,3,7,6,8,7,3,6,7,6,7,3,5,3,7,3,7,8,6,7,3,7,5,7,3,5,7,3,5,6,3,8,3,7,3,5,3,8,6,8,5,8,5,7,3,7,3,7,3,7,3,7,5,8,6,3,5,7,3,7~4,5,7,7,7,3,7,8,6,3,3,3,5,5,5,6,6,6,8,8,8,4,4,4,5,3,8,5,6,5,7,5,7,3,6,5,6,8,7,6,5,6,5,3,7,3,5,8,5,3,7,8,3,8,3,5,8,6,8,3,5,7,8,3,8,5,3,6,5,8,5,6,8,5,8,3,5,6,7,6,7,5,8,5,7,5,3,6,8,5,8,6,7,3,5,8,6,3,5,8,7,3,8,5,7,5,6,3,8,6,8,3,8,5,3,8,3,5,8,3,8,3,7,8,3,6,3,7,8,5,8,3~4,8,7,7,7,5,6,4,4,4,7,3,6,6,6,5,5,5,8,8,8,7,3,6,7,5,6,5,8,7,5,8,7,3,6,7,8,6,5,6,8,5,8,5,7,5,6,3,6,7,8,5,3,7,6,7,6,8,7,5,8,6,5,7,5,8,5,6,5,6,7,8~5,4,4,4,3,3,3,3,7,4,5,5,5,6,8,7,7,7,6,6,6,8,8,8,7,6~3,3,3,8,5,5,5,7,3,5,4,6,8,8,8,7,7,7,4,4,4,6,6,6,4,7,5,6,8,6,8,5,4,8,7,8,5,8,5,4,8,6,7,6,7,6,5,8,6,5,8,6,5,4,5,8,4,8,6,8,5,8,5,6,5,8,4,5,7,4,6,7,6,8,5,6,8,6,8,7,8,7,6,7,4,7,5,8,4,8,7,8,4,7,6,8,6,7,4,8,5,8,5,6,5,6,8,7,8,7,8,7,8,4,8,7,5,8,4,8,5,7,5,8,7,6,7,8,7,5,7,6,4,8,7,4,5,8,5,6,5,7,8,5,8,6,8,7,8,4,5,8,6,7,8,4,7,6,8,7,8,5,6,7,8,6,4,5,6,5,8,6,4,7,8,6,7,6,8,4,8,6,8,5,8,7,6,8,4~8,5,5,5,7,7,7,7,5,8,8,8,4,3,6,4,4,4,3,3,3,6,6,6,7,6,7,6,3,4,7,6,7,6,3,6,4,5,6,7,5,6,5,7,3,7,4,6,5,6,5,7,6,3,5,6,3,5,6,5,6,7,3,6,3,6,5,7,6,3,4,5,6,5,7,6,5,4,6,5,7,5,7,6,4,5,4,5,3,5,7,3,5,6,5,3,6,5,6,5,6",
        reel_set1: "6,8,6,6,6,4,7,4,4,4,5,3,7,7,7,8,8,8,5,5,5,4,8,7,8,5,4,5,7,8,5,8,5,7,8,7,8,7,4,8,4,8,4,8,5,7,5,8,4,5,4,7,4,8,5,8,5,4,7,4,5,7,8,4,8,4,5,8,5,7,8,5,8,5,8,5,4~3,8,8,8,4,7,4,4,4,6,8,7,7,7,5,3,3,3,6,6,6,5,5,5,6,5,6,7,5,7,5,6,4,5,6,7,6,4,7,5,4,8,5,4,7,8,5,4,5,7,4,6,5,8,7,8,4,5,4,5,4,5,4,7,4,6,5,7,5,6,5,7,6,8,5,7,4,6,4,7,5,6,8,5,6,8,6,8,6,5,7,4,8,4,6,7,8,4,5,4,5,4,8,5,7,5,6,8,7,6,7,5,8,6,4,8,5,8,4,6,7,6,7,4,7,5,6,4,8,5,4,7,5,8,6,7,4,8,4,7,5,4,8,4,6,5,4,8,4,8,5,7,4,5,6,4,8,4,8,7,4,8,7,4,8,7,5,6,7,4,7,4,5,4,5,8,5,4,8,7,5,8,4,5,8,4,6,5,6,5,4,6,7,5,4,8,5,8,5,7,8,4,6,4,5,4,6,5,6,7,4,7,4,7,4,5,8,7,5,8,5,8,7,5,4,7,8,7,8,5,7,8,6,4,5,8,5,8,5,4,7,4,8,5,6,4,7,4,6,7,8,7,8,5,8,6,8,6,4,6,7,4,8,7,5,4,8,5,8,4,8,7,8,7,4,8,5~4,6,7,5,8,3,8,8,8,7,7,7,4,4,4,5,5,5,6,6,6,5,7,8,5,8,7,8,7,8,3,8,3,7,8,6,7,5,8,7,6,7,8,5,7,8,7,8,3,8,5,7,5,3,6,7,8,5,6,5,7,5,8,7,5,7,6,5,7,5,7,5,8,5,7,8,5,6,8,5,7,5,3,5,6,7,8,3,6,7,5,8,5,7,8,7,8,7,3,7,5,7,5,7,6,8,7,5,7,8,7,6,5,7,5,6,8,5,3,8,5,7,5,7,6,7,6,7,8,6,5,6,8,5,8,7,3,5,6,5,8,5,7,5,7,8,3,6,7,5,3,8,5,6,5,8,7,8,3,6,5,6,5,7,8,7,8,5,6,8,5,8,6,7,3,8,7,5,6,7,8,5,8,5,7,8,5,8,6,8,5,8,5,7,8,5,7,3,8,7,5,6,8,5,6,8,6,8,5,8,5,8,7,6,8,7,6,5,8,5,8,7,6,7,3,8,5,8,7,5,8,3,5,7,6,5,7,5,7,8,6,7,5,6,7,6,8,5,8,5~4,7,5,6,3,8,8,8,8,3,3,3,7,7,7,6,6,6,5,5,5,4,4,4,7,3,7,5,7,8,6,7,6,7,6,3,6,3,5,7,3,7,8,7,6,3,8,6,3,7,5,7,6,7,6,8,6,7,5,7,6,7,3,6,7,6,7,6,3,7,5,3,7,8,6,7,3,7,3,6,8,3,7,5,3,6,3,7,6,7,5,7,3,7,3,6,3,7,5,7,8,7,3,7,6,3,8,7,8,7,3,6,3,7,8,7,5,3,5,7,6,8~6,4,4,4,5,5,5,5,7,3,4,8,3,3,3,6,6,6,7,7,7,8,8,8,5,3,4,5,7,5,4,5,8,5,7,3,7,5,7,4,5,7,8,7,4,8,4,5,8,7,3,4,5,3,8,4,7,8,7,5,7,8,4,7,5,3,8,5,4,5,7,4,7,5,3,7,3,8,5,7,3,4,5,7,4,5,8,7,8,4,5,8,4,7,3,5,3,5,8,5,7,3,8,5,7,4,8,4,7,8,3,8,5,4,5,8,7,4,5,3,7,5,4,3,4,8,5,3,4,7,5,8,5,3,7,3,7,3,7,5,3,4,7,5,4,3,7,5,8,5,4,3,4,3,5,7,4,7~4,8,8,8,7,3,3,3,3,6,6,6,5,6,8,7,7,7,5,5,5,4,4,4,5,6,3,5,8,7,6,8,3,6,8,6,5,7,8,7,5,6,8,6,3,6,8,6,3,8,6,7,5,8,3,6,5,3,8,3,5,7,3,6,3,7,3,6,5,8,6,3,8,3,6,7,8,5,6,8,6,5,6,3,5,8,3,6,8,6,3,5,6,5,8,6,8,3,8,6,8,5,7,6,7,5,8,3,7,3,6,3,7,5,8,3,5,8,5,6,3,8,7,5,3,8,7,8,7,3,7,5,8,3,8,7,8,6,5,6,3,7,8,3,6,3,7,8,7,5,3,5,6,5,8,7,8,3,5,6,7,8,7,8,6,3,6,7,8,6,8,6,3,5,8,6,3,6,8,7,6,3,6,5,8,5,8",
        rt: "d",
        rtp: "96.06",
        s: "3,6,6,6,6,6,7,6,6,6,6,6,7,6,6,6,6,6,7,6,6,6,6,6",
        sa: "8,8,8,8,8,8",
        sb: "8,8,8,8,3,8",
        sc: "10.00,20.00,40.00,60.00,80.00,100.00,200.00,400.00,800.00,1000.00,2000.00,3000.00,4000.00",
        scatters: "1~1,1,1,1,0,0~20,15,10,8,0,0~1,1,1,1,1,1",
        sh: "4",
        stime: new Date().getTime(),
        sver: "5",
        t: "243",
        ver: "2",
        wilds: "2~125,40,15,10,0,0~1,1,1,1,1,1",
    };

    // API          
    result["stime"] = new Date().getTime();

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
        reel_set: 0,
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 4,
        sver: 5,   
        c: player.betPerLine,
        counter: 1,
        l: 25,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
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

    //                        
    var totalMulti = 0;
    var multiples = [];
    if (player.machine.scatterPosition.length > 0) {
        for (var i = 0; i < player.machine.scatterPosition.length; i++) {
            var pos = player.machine.scatterPosition[i];
            var value = player.machine.multiValues[i];
            totalMulti += value;
            multiples.push(`1~${pos}~${value}`);
        }
    }
    if (totalMulti > 0) {
        result['rmul'] = multiples.join(";");
        if (prevGameMode == "Free" || player.machine.currentGame == "FREE") {
            result['gwm'] = totalMulti;
        }
    }
    result['wmt'] = "pr";
    result['wmv'] = totalMulti;

    if (player.machine.changedStr.length > 0) {
        result['is'] = Util.view2String(player.machine.view);
        result['s'] = Util.view2String(player.machine.changeView);
        result['srf'] = player.machine.changedStr;
    }

    if (prevGameMode == "BASE") {
        //                          
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
            result['reel_set'] = 0;
            result['ls'] = '0';
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = "1";
        result['ls'] = '0';

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result['fsend_total'] = 1;
        }
    }

    return result;
}

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
}

module.exports = ApiManager;