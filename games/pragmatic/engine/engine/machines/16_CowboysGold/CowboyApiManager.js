var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        accInit: `[{id:0,mask:"cp;mp"}]`,
        tw: "0.00",
        def_s: "5,6,5,11,7,10,9,4,9,12,11,7,5,7,7",
        balance: "102,200.00",
        action: "doSpin",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "102,200.00",
        def_sb: "10,7,7,8,11",
        def_sa: "11,10,7,10,4",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '',
        wl_i: "tbm~2100",
        stime: "1630994912604",
        sa: "10,7,9,1,10",
        sb: "6,3,10,7,11",
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "200.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",
        sver: "5",
        counter: "2",
        l: "10",
        mo_s: "8",
        mo_v: "0,10,20,30,40,50,80,100,150,200,250,500,750,1000",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;750,200,50,5,0;500,150,30,0,0;250,100,25,0,0;200,100,20,0,0;100,50,10,0,0;50,25,5,0,0;50,25,5,0,0;25,10,5,0,0;25,10,5,0,0;0,0,0,0,0;100,50,10,0,0;100,50,10,0,0;100,50,10,0,0;100,50,10,0,0;100,50,10,0,0;100,50,10,0,0;100,50,10,0,0;100,50,10,0,0;100,50,10,0,0;100,50,10,0,0",
        rtp: "95.67",
        s: "5,6,5,11,7,10,9,4,9,12,11,7,5,7,7",
        reel_set: "0",
        reel_set_size: "4",
        reel_set0: "7,9,8,8,8,2,12,8,6,5,10,11,4,8,5,8,11,8,9,8~11,4,2,8,8,8,5,8,10,6,9,7,1,12,5,2,1,10,12,10,8~8,8,8,10,2,7,9,8,1,11,12,6,5,4,5,6,1,9,2,5,12,9,12,2,4,12,1,12,9,5,2,4,7,1,9,5,10,9,12,7~2,10,11,9,7,12,8,8,8,1,5,8,6,4,7,1,7,1,8,7,4,7~10,3,7,9,6,12,4,5,11,2,5,9,12,5,4,12,4,7,12,7,11,3,12,4,12,9,9,7,4,9,7,12,9,12,11,4,4,9,4,12,12,9",
        reel_set1: "8,10,7,4,12,6,11,9,5,2,4,12,9,4,5,9,4,2,11,12,5,4,5,4,9,5,4,7,9,7,9~2,5,12,1,8,10,4,7,11,9,6,9,11,9,12,1,4,5,1,7,9,5,12,8,1~10,11,1,4,5,8,12,9,6,7,2,8,5,8,7,9,6,2,8~6,8,12,5,4,7,10,2,1,11,9,10,5,12,10,4,8,11,8,10,4,5,8,9,8,12,4,11,10,1,11,8,12,5,10,8,11,5,9,5,11,5,4,7,11,4,10,9,8,12,8,4,9,5,8,4,5,11,8,11,1,8,9,11,1,7,4,9,11,8,4,10,11,10,4,5~12,7,10,4,6,5,3,2,11,9,5,3,9,6,10",
        reel_set2: "11,8,8,8,4,2,9,8,5,6,10,7,12,9,5,6,4,6,5,6,5,4,5,6,9,5,9~8,8,8,8,7,5,9,6,11,12,10,2,4,10,6~8,8,8,8,11,10,2,6,7,12,1,9,5,4,11,6,9,6,9,10,7,6,9,6,9,10,11~11,6,1,2,12,7,8,8,8,8,9,5,10,4,8,6,8,7,8,2,8,2,8,2,8,6,4,7,5,6~9,11,4,5,9,3,9,12,7,7,9,3,10,2,12,12,12,4,9,2,11,5,12,11,6,4,11,3,12,5,11,10,12,4,9",
        reel_set3: "10,8,8,8,9,12,7,8,4,2,5,11,6,7,4,8~8,8,8,12,4,9,10,11,1,7,6,2,5,8,9,4,9,7,11,6,12,6,4,11,12,9,7,6~6,8,8,8,4,2,11,9,7,8,5,12,10,8,10,2,8,7,12,8,12,2,8,2,9,8~5,8,8,8,7,8,1,4,9,2,11,12,6,10,1,8,4,8,10,1,11,6,8,10,9,8,7,12,10,12,10,8~9,11,4,5,9,3,9,12,7,7,9,3,10,2,12,12,12,4,9,2,11,5,12,11,6,4,11,3,12,5,11,10,12,4,9",
        w: "0.00",
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
        reel_set: 1,
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 3,
        sver: 5,   
        c: player.betPerLine,
        counter: 1,
        l: 10,
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
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    //             api
    if (player.machine.moneyCache != null) {
        result["mo"] = player.machine.moneyCache.values.join();
        result["mo_t"] = player.machine.moneyCache.table.join();
    }
    if (player.machine.moneyTotalValue / player.betPerLine > 0) {
        result["mo_c"] = 1;
        result["mo_tv"] = player.machine.moneyTotalValue / player.betPerLine;
        result["mo_tw"] = player.machine.moneyTotalValue;
    }

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (prevGameMode == "BASE") {
        //                          
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 3;
        result["acci"] = "0";
        result["accm"] = "cp~mp";
        result["accv"] = `${player.machine.freeSpinBonusCount}~4`;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;

            if (player.machine.isFreeSpinAdd) {
                result["fsmore"] = 5;
            }
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
        }
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;
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