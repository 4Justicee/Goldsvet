var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,11,13,14,8,12,7,10,4,3,9,4,5,4,3",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        mo_s: "14",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "2,7,5,3,5",
        mo_v: "8,18,28,38,58,68,78,88,118,138,188,238,288,588,888,1888",
        def_sa: "6,2,7,3,8",
        bonusInit: '[{bgid:1,bgt:15,bg_i:\"1000,100,50,25\",bg_i_mask:\"pw,pw,pw,pw\"}]',
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{props:{max_rnd_sim:\"1\",max_rnd_hr:\"16666666\",max_rnd_win:\"2000\"}}',
        stime: "1645353317405",
        sa: "6,2,7,3,8",
        sb: "2,7,5,3,5",
        sc: "8.00,10.00,20.00,40.00,60.00,80.00,100.00,200.00,400.00,800.00,1000.00,2000.00,3000.00,4000.00",
        defc: "100",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;15~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;150,50,30,0,0;100,30,25,0,0;75,30,20,0,0;60,25,15,0,0;50,20,15,0,0;25,15,12,0,0;25,15,12,0,0;20,12,8,0,0;20,12,8,0,0;20,12,8,0,0;20,12,8,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.50",
        reel_set0: "11,8,8,3,9,5,7,5,3,3,3,4,10,6,3,4,4,8,8,10,6,11,7,11,6,14,14,14,10,6,3,11,7,12,6,13,4,4,4~14,14,14,11,3,2,11,5,10,13,3,3,13,9,3,3,13,9,7,5,13,6,13,2,3,4,4,6,9,2,12,8~3,13,9,7,9,8,14,14,4,13,12,12,5,10,12,13,8,6,2,4,4,4,5,5,12,5,11,5,2,11,11,10,6,3,12,7,8,8~5,11,4,14,14,10,7,13,3,14,14,13,13,8,4,5,5,13,4,9,5,11,5,10,9,4,10,2,12,9,9,6,8,9,2,10~8,6,6,9,4,7,9,9,6,9,8,14,14,9,10,5,13,4,9,3,11,10,5,9,5,10,9,11,5,14,14,3,5,9,4,9,3,11,3,13,4,6,6,14,14,12",
        s: "6,11,13,14,8,12,7,10,4,3,9,4,5,4,3",
        t: "243",
        reel_set1: "3,7,3,3,3,6,3,5,4,7,7,4,5,5,3,3,5,5,3,6,6,7,3,4,4,4,4,7,6,3,4,6,4,3,5,6,4,4,4,3,7,4,4,7,6,5,5,5,3~5,7,4,6,5,5,3,6,6,3,3,6,6,4,6,3,15,15,4,7,6,6,6,5,5,5,4,6,7,5,6,4,4,3,7,4,4,3,7,3~4,6,5,5,5,7,7,7,3,3,5,4,5,15,15,4,5,7,3,7,4,4,5,5,3,7,4,3,3,7,3,7,7,5,3,7,7,7,6,7,6~6,6,4,4,4,4,7,5,6,4,6,3,15,15,6,6,5,5,5,4,6,4,7,3,7,4,6,4,4,3,4,7,4,7,3,4,5,6,7,6,4,5~5,4,3,3,3,6,6,5,7,6,6,3,4,5,5,5,6,3,7,7,6,6,6,5,6,4,5,4,3,6,5,7,7,7,7,6,6,6,4",
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
        n_reel_set: 0,
        stime: new Date().getTime(),
        sa: "1,2,3,4,5",
        sb: "1,2,3,4,5",
        sh: 3,
        sver: 5,   
        c: player.betPerLine,
        l: 25,
        w: player.machine.winMoney,
        rtp: "96.06",
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
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.moneyCache != null) {
        result["mo_c"] = 0;
        result["mo_iv"] = 0;
        result["mo_tv"] = 0;
        result["mo_tw"] = 0;
        result["mo_s"] = 14;
        result["mo_t"] = player.machine.moneyCache.table;
        result["mo"] = player.machine.moneyCache.values;
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS") {
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;

            result["rw"] = 0;
            result["na"] = "b";

            if (player.machine.bonusType == 2) {
                //                                 ,                    
                result["bgid"] = 1;
                result["bgt"] = 15;
                result["bg_i_mask"] = "pw,pw,pw,pw";
                result["bg_i"] = "1000, 100, 50, 25";
                result["bgid"] = 1;
                result["bgt"] = 15;
                result["bw"] = 1;

                var cache = player.machine.jackpotCache[0];

                result["wins_mask"] = cache.wins_mask.join(',');
                result["wins"] = cache.wins.join(',');
                result["status"] = cache.status.join(',');
            } else {  //                                            
                result["bgid"] = 0;
                result["bgt"] = 21;
                result["bw"] = 1;
                result["status"] = "0,0";
                result["wins_mask"] = "h,h";
                result["wins"] = "0,0";

                var totalMoney = player.machine.moneyCache.values.reduce((total, value) => total + value, 0);

                result["mo_iv"] = totalMoney;
                result["mo_tv"] = totalMoney;
            }

            result["wp"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.currentGame == "FREE") {
            result["n_reel_set"] = 1;
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
        counter: "2",
        rtp: "96.06"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    return result;
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_cash: "99,991.20",
        balance_bonus: "0.00",
        balance: "99,991.20",
        bgid: "0",
        bgt: "",
        coef: "",
        counter: "228",
        end: "0",
        index: "114",
        level: "1",
        lifes: "",
        na: "b",
        rw: "0.00",
        status: "",
        stime: "1629855874179",
        lifes: "1",
        sver: "5",
        wp: "0",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["counter"] = ++param.counter;
    result["index"] = param.index;
    result["stime"] = new Date().getTime();

    if (player.machine.bonusType == 0) {
        //                          
        result["bgid"] = 0;
        result["bgt"] = 21;
        result["coef"] = player.virtualBet;
        result["n_reel_set"] = 1;
        result["fs"] = 1; // player.machine.freeSpinIndex;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = 1;
        result["fsres"] = 0.00;
        result["fswin"] = 0.00;
        result["na"] = "s";
        result["end"] = 1;
        result["level"] = 1;
        result["lifes"] = 0;
        result["rw"] = 0;

        if (player.machine.param_ind) {
            result["status"] = "0,1";
            result["wins_mask"] = "rsb,nff";
            result["wins"] = "1,8";
        }
        else {
            result["status"] = "1,0";
            result["wins_mask"] = "nff,rsb";
            result["wins"] = "8,1";
        }
    }
    else if (player.machine.bonusType == 1) {
        //                              
        result["bgid"] = 0;
        result["bgt"] = 21;
        result["coef"] = player.virtualBet;
        result["end"] = 1;
        result["level"] = 1;
        result["lifes"] = 0;
        result["rw"] = 0;

        if (player.machine.param_ind) {
            result["status"] = "0,1";
            result["wins_mask"] = "nff,rsb";
            result["wins"] = "8,1";
        }
        else {
            result["status"] = "1,0";
            result["wins_mask"] = "rsb,nff";
            result["wins"] = "1,8";
        }

        player.machine.bonusType = 3;
    }
    else if (player.machine.bonusType == 2) {
        //               
        result["bgid"] = 1;
        result["bgt"] = 15;
        result["coef"] = player.virtualBet;
        var level = player.machine.jackpotLevel;
        var cache = player.machine.jackpotCache[level];
        result["level"] = level;
        result["wins_mask"] = cache.wins_mask.join(',');
        result["wins"] = cache.wins.join(',');
        result["status"] = cache.status.join(',');

        if (player.machine.currentGame == "BASE") {
            //                    
            var wpInd = cache.status.indexOf(level);
            result["wp"] = cache.wins[wpInd];

            result["rw"] = player.machine.bonusWin;
            result["tw"] = player.machine.moneyBonusWin;
            result["na"] = "cb";
            result["lifes"] = 0;
            result["end"] = 1;
        }
    } else if (player.machine.bonusType == 3) {
        //                  
        result["bgid"] = 2;
        result["bgt"] = 31;
        result["coef"] = player.betPerLine;
        result["end"] = 0;

        result["mo_t"] = player.machine.moneyCache.table.join();
        result["mo"] = player.machine.moneyCache.values.join();
        result["rs_s"] = Util.view2String(player.machine.view);
        result["rsb_c"] = player.machine.moneyBonusCache.count;
        result["rsb_m"] = player.machine.moneyBonusLength;
        result["rsb_s"] = 14;
        result["rw"] = player.machine.moneyBonusWin;
        result["wp"] = player.machine.moneyCache.values.reduce((total, value) => total + value, 0);


        if (player.machine.currentGame == "BASE") {
            //                 
            result["bpw"] = "0.00";
            result["tw"] = player.machine.moneyBonusWin;
            result["na"] = "cb";
            result["end"] = 1;
        }
    }


    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        rw: "100,000",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        wp: 0,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    if (player.machine.bonusType == 2) {
        result["coef"] = player.virtualBet;
        result["rw"] = player.machine.bonusWin;
    } else {
        result["coef"] = player.betPerLine;
        result["rw"] = player.machine.moneyBonusWin;
    }
    return result;
}

module.exports = ApiManager;