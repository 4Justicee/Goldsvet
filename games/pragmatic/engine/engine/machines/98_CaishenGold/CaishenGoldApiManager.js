var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,7,4,2,8,9,3,5,6,7,8,5,7,3,9",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "5,6,1,4,8",
        def_sa: "6,7,5,4,4",
        bonusInit: '[{bgid:0,bgt:15,bg_i:\"1000,100,50,30\",bg_i_mask:\"pw,pw,pw,pw\"}]',
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~1900,380,190,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        bg_i: "1000,100,50,30",
        rt: "d",
        gameInfo: '{props:{max_rnd_sim:\"1\",max_rnd_hr:\"22222222\",max_rnd_win:\"1050\"}}',
        stime: "1645263396420",
        sa: "6,7,5,4,4",
        sb: "5,6,1,4,8",
        sc: "5.00,10.00,20.00,40.00,50.00,60.00,80.00,100.00,200.00,400.00,800.00,1000.00,2000.00,2500.00",
        defc: "50",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "50",
        sver: "5",
        n_reel_set: "0",
        bg_i_mask: "pw,pw,pw,pw",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,75,25,0,0;150,50,20,0,0;125,30,15,0,0;100,25,10,0,0;75,20,10,0,0;50,10,5,0,0;50,10,5,0,0;25,10,5,0,0;25,10,5,0,0;25,10,5,0,0;25,10,5,0,0",
        l: "38",
        rtp: "97.08",
        reel_set0: "6,7,5,4,4,4,10,4,13,9,1,8,7,12,5,3,3,3,6,5,6,5,10,8,3,9,3,12,8,10,3,9,5,4,11,3,12,3,6,4,13,7,11,4,13~9,13,10,8,13,6,10,3,11,7,3,5,9,8,2,11,6,12,3,5,10,3,1,1,7,8,2,13,5,3,5,11,6,9,4,10,7,2,1,5,4,4,4,4~7,13,3,7,5,12,4,4,4,8,4,5,11,13,9,1,1,7,4,12,3,10,5,1,3,5,2,3,2,7,11,6,8,6,12,4,6,13,5,1,3,8,4,10,9,7,11~7,9,12,10,4,12,13,2,5,11,10,9,11,10,13,3,5,3,7,10,8,8,8,6,3,2,4,4,6,8,4,11,11,8,9,5,12,1,13,9,13,5~5,6,1,4,8,9,10,9,4,11,13,3,5,13,6,9,6,13,8,5,6,1,2,5,9,11,6,8,4,7,3,13,7,10,12,11,9,10,12,2,8,5,9,12,3,4",
        s: "6,7,4,2,8,9,3,5,6,7,8,5,7,3,9",
        t: "243",
        reel_set1: "3,6,3,6,5,5,5,5,4,5,3,3,1,7,7,7,3,5,5,4,7,6,4,3,7,6,7,6,7,6,3,4,7,4,3,4,4,5,4,4,7,7,5,7,3,1~3,3,3,3,6,7,7,7,1,6,3,5,5,5,3,4,4,4,3,6,7,4,5,7,5,3,7,3,4,5,6,5,7,6,6,6,4,4,7,7,7,3,5,4,2,5,6,4,1,2,4,6~6,6,6,7,7,7,3,3,3,4,4,4,7,4,7,6,1,2,3,1,4,6,5,5,5,4,3,4,3,5,7,3,4,5,5,6,3,7,5,7,3,5,4,3,3,6,7,4,4,7,6~6,5,5,5,2,4,4,4,4,7,4,6,3,3,3,6,6,4,5,4,4,5,6,4,6,6,3,3,3,3,3,1,7,3,3,1,4,7,4,5,7,3,5,7,3,7,2,5,4~4,6,6,6,1,4,4,5,5,5,4,6,5,4,6,6,7,7,7,7,5,5,7,3,3,3,3,4,3,4,5,6,7,5,7,4,6,6,6,7,5,7,4,6,3,5,1,4,3,3,5,3",
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
        l: 38,
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
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
            result["n_reel_set"] = 1;
            result["fs"] = 1; // player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            //                                 ,                    
            result["bg_i_mask"] = "pw,pw,pw,pw";
            result["bg_i"] = "1000,100,50,30";
            result["bgid"] = 0;
            result["bgt"] = 15;
            result["bw"] = 1;
            result["na"] = "b";
            result["level"] = 0;
            result["lifes"] = 1;
            result["n_reel_set"] = 0;
            result["rw"] = 0;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            var cache = player.machine.jackpotCache[0];
            result["wins_mask"] = cache.wins_mask.join(',');
            result["wins"] = cache.wins.join(',');
            result["status"] = cache.status.join(',');
            result["wp"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        if (player.machine.isFreeSpinAdd) {
            result["fsmore"] = 8;
        }

        if (player.machine.currentGame == "FREE") {
            result["tw"] = player.machine.freeSpinWinMoney + player.machine.scatterWin;
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["n_reel_set"] = 1;
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["tw"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["n_reel_set"] = 0;
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
        bgid: "0",
        balance: "99,991.20",
        coef: "0.15",
        level: "1",
        index: "114",
        balance_cash: "99,991.20",
        balance_bonus: "0.00",
        na: "b",
        rw: "0.00",
        stime: "1629855874179",
        bgt: "15",
        lifes: "1",
        wp: "0",
        end: "0",
        sver: "5",
        counter: "228",
        rtp: "96.06"
    };

    result["coef"] = player.virtualBet;
    var level = player.machine.jackpotLevel;
    var cache = player.machine.jackpotCache[level];
    result["level"] = level;
    result["wins_mask"] = cache.wins_mask.join(',');
    result["wins"] = cache.wins.join(',');
    result["status"] = cache.status.join(',');
    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;

    if (player.machine.currentGame == "BASE") {
        //                    
        var wpInd = cache.status.indexOf(level);
        result["wp"] = cache.wins[wpInd];

        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;
        result["na"] = "cb";
        result["lifes"] = 0;
        result["end"] = 1;
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
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = player.machine.moneyBonusWin;
    result["tw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    return result;
}

module.exports = ApiManager;