var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "5,6,9,6,6,8,11,8,9,9,6,9,12,6,6", //         
        balance: "100,000.00",     //                             
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "10,7,7,8,11",     //                              
        reel_set_size: "4",
        def_sa: "11,10,7,10,4",    //                             
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",       //             
        scatters: "1~0,0,0,0,0~20,15,10,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{purchase:\"96.71\",regular:\"96.71\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"3880481\",max_rnd_win:\"2100\"}}",
        wl_i: "tbm~2100",
        stime: "1643263752035",
        sa: "11,10,7,10,4",
        sb: "10,7,7,8,11",
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,10000.00,15000.00,20000.00,25000.00", //         
        defc: "200.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",   //                   
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;2000,200,50,5,0;1000,150,30,0,0;500,100,20,0,0;500,100,20,0,0;200,50,10,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0",
        l: "10",
        total_bet_max: "250,000,000.00",
        reel_set0: "6,7,8,10,10,5,6,12,7,11,6,5,10,6,1,5,8,7,7,12,4,10,5,8,4,10,3,12,8,10,4,8,9,9,12,10,9,4,3,10,5,8,12,3,6,8,12,6,4,10,11,12,8,7,7,7,7,7~4,3,9,7,11,3,8,6,3,9,7,11,5,10,6,3,1,9,7,7,12,3,4,11,3,6,8,9,5,11,9,6,11,4,9,3,5,4,11,6,3,5,11,9,12,9,10,4,3,11,5,9,9,8,7,7,7,7,7~12,3,3,6,7,11,3,5,7,10,4,3,5,10,9,4,5,1,6,7,7,12,9,5,4,3,8,5,6,11,4,6,5,10,3,6,4,3,8,7,7,7,7,7~5,7,6,4,12,5,4,8,7,6,4,11,3,9,7,7,10,1,6,3,5,3,7,7,7,7,7~4,6,7,11,11,4,8,8,7,5,3,12,1,7,7,10,8,6,9,7,7,7,7,7",
        s: "5,6,9,6,6,8,11,8,9,9,6,9,12,6,6",  //                
        accInit: "[{id:0,mask:\"cp\"},{id:1,mask:\"cp;mp\"}]",
        reel_set2: "6,7,8,10,10,5,6,12,7,11,6,5,10,6,1,5,8,7,7,12,4,10,5,8,4,10,3,12,8,10,4,8,9,9,12,10,9,4,3,10,5,8,12,3,6,8,12,6,4,10,11,12,8,7,7,7,7,7~4,3,9,7,11,3,8,6,3,9,7,11,5,10,6,3,1,9,7,7,12,3,4,11,3,6,8,9,5,11,9,6,11,4,9,3,5,4,11,6,3,5,11,9,12,9,10,4,3,11,5,9,9,8,7,7,7,7,7~12,3,3,6,7,11,3,5,7,10,4,3,5,10,9,4,5,1,6,7,7,12,9,5,4,3,8,5,6,11,4,6,5,10,3,6,4,3,8,7,7,7,7,7~5,7,6,4,12,5,4,8,7,6,4,11,3,9,7,7,10,1,6,3,5,3,7,7,7,7,7~4,6,7,11,11,4,8,8,7,5,3,12,1,7,7,10,8,6,9,7,7,7,7,7",
        reel_set1: "6,7,8,10,10,5,6,12,7,11,6,5,10,6,1,5,8,7,7,12,4,10,5,8,4,10,3,12,8,10,4,8,9,9,12,10,9,4,3,10,5,8,12,3,6,8,12,6,4,10,11,12,8,7,7,7,7,7~4,3,9,7,11,3,8,6,3,9,7,11,5,10,6,3,1,9,7,7,12,3,4,11,3,6,8,9,5,11,9,6,11,4,9,3,5,4,11,6,3,5,11,9,12,9,10,4,3,11,5,9,9,8,7,7,7,7,7~12,3,3,6,7,11,3,5,7,10,4,3,5,10,9,4,5,1,6,7,7,12,9,5,4,3,8,5,6,11,4,6,5,10,3,6,4,3,8,7,7,7,7,7~5,7,6,4,12,5,4,8,7,6,4,11,3,9,7,7,10,1,6,3,5,3,7,7,7,7,7~4,6,7,11,11,4,8,8,7,5,3,12,1,7,7,10,8,6,9,7,7,7,7,7",
        purInit: "[{type:\"fsbl\",bet:1000,bet_level:0}]",
        reel_set3: "6,7,8,10,2,5,6,12,7,11,6,5,10,6,5,8,7,7,12,4,10,5,8,4,10,3,12,8,10,4,8,9,2,12,10,9,4,3,10,5,8,12,3,6,8,12,6,4,10,11,12,8,7,7,7,7,7~4,3,9,7,11,3,8,6,3,9,7,11,5,10,6,3,9,7,7,12,3,4,11,3,6,2,9,5,11,9,6,11,4,9,3,5,4,11,6,3,5,11,2,12,9,10,4,3,11,5,2,9,8,7,7,7,7,7~12,2,3,6,7,11,3,5,7,10,4,3,5,2,9,4,5,6,7,7,12,9,5,4,3,8,5,6,11,4,6,2,10,3,6,4,3,8,7,7,7,7,7~5,7,6,2,12,5,2,8,7,6,4,11,3,9,7,7,10,6,3,5,2,7,7,7,7,7~4,6,7,11,2,4,8,2,7,5,3,12,7,7,10,2,6,9,7,7,7,7,7",
        total_bet_min: "200.00"
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
        reel_set: 0,    //                              
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
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    //             api
    if (player.machine.moneyCache != null) {
        result["mo"] = player.machine.moneyCache.values;
        result["mo_t"] = player.machine.moneyCache.table;
    }

    if (prevGameMode == "BASE") {
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
        result["reel_set"] = 1;
        result["acci"] = "0;1";
        result["accm"] = "cp;cp~mp";
        // TODO
        result["accv"] = `${player.machine.freeSpinWildCount};${player.machine.freeRespinLevel}~4`;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;

            if (player.machine.isFreeSpinAdd) {
                result["fsmore"] = 10;
            }

            if (player.machine.winMoney > 0) {
                result["mo_c"] = 1;
                result["mo_tv"] = player.machine.winMoney / player.betPerLine;
                result["mo_tw"] = player.machine.winMoney;
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