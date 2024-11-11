var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '3,6,4,4,3,6,5,4,3',
        balance: '100,000.00',
        cfgs: '1',
        ver: '2',
        index: '1',
        balance_cash: '100,000.00',
        reel_set_size: '2',
        def_sb: '4,6,5',
        def_sa: '8,9,6',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0~8,0,0~1,1,1',
        fs_aw: 'm~2;m~3;m~4;m~5;m~6',
        gmb: '0,0,0',
        rt: 'd',
        stime: '1644572926683',
        sa: '8,9,6',
        sb: '4,6,5',
        sc: '10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00',
        defc: '100',
        sh: '3',
        wilds: '2~1000,0,0~1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '100',
        sver: '5',
        n_reel_set: '0',
        counter: '2',
        paytable: '0,0,0;0,0,0;0,0,0;400,0,0;150,0,0;75,0,0;40,0,0;20,0,0;10,0,0;5,0,0',
        l: '18',
        rtp: '96.52',
        reel_set0: '9,6,3,9,1,8,5,4,8,2,7,9,8,6,7,8,5,1,2,5,8,4,3,8~7,1,8,3,9,5,6,7,2,8,8,1,3,4,5,2,6,8,1~5,3,9,2,6,8,1,7,9,3,2,9,4,6,8,1,5,7,2',
        s: '3,6,4,4,3,6,5,4,3',
        reel_set1: '5,7,7,7,4,5,5,5,6,3,3,3,1,9,8,8,8,4,4,4,7,6,6,6,1,8,5,3,2,2,2,9,9,9,8,3,8~4,1,9,9,9,6,6,6,5,2,2,2,8,6,7,4,9,3,1,6,5,5,5,8,8,8,2,7,7,7,3,9,7,4,4,4,3,3,3~1,8,4,2,9,6,7,3,9,9,9,5,3,3,3,8,8,8,2,2,2,8,6,6,6,9,1,8,6,5,5,5,9,4,7,7,7',
        awt: '6rl',
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
        l: "18",
        na: "s",
        n_reel_set: "0",
        stime: new Date().getTime(),
        s: "9,4,12,11,12,12,4,11,10,10,4,12,4,7,5,4,2,4,7,5",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "3",
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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0;
            result["fsres"] = 0;
            result["n_reel_set"] = 1;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["n_reel_set"] = 1;
        result["tw"] = player.machine.freeSpinWinMoney;
        result["aw"] = player.machine.multi - 2;
        result["awt"] = "6rl";
        result["gwm"] = player.machine.multi;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";

            if (player.machine.freeSpinAddCount) {
                result["fsmore"] = player.machine.freeSpinAddCount;
            }

            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
        }
    }

    if (player.machine.moneyCache != null) {
        result["mo_t"] = player.machine.moneyCache.table;
        result["mo"] = player.machine.moneyCache.values;
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
