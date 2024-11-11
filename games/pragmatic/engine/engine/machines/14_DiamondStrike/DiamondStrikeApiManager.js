var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        bg_i_mask: "pw,pw,pw,pw",
        bg_i: "1000,100,30,10",
        bgt: 18,
        bgid: 0,
        bonuses: "0",
        bonusInit: `[{bgid:0,bgt:18,bg_i:"1000,100,30,10",bg_i_mask:"pw,pw,pw,pw"}]`,
        c: "100.00",
        cfgs: "1",
        counter: "2",
        def_s: "6,7,4,2,8,4,3,5,6,7,8,5,7,3,4",
        def_sb: "7,4,7,5,7",
        def_sa: "3,6,6,8,8",
        defc: "100.00",
        fsbonus: "",
        gameInfo: `{props:{max_rnd_sim:"1",max_rnd_hr:"477304",max_rnd_win:"1000"}}`,
        gmb: "0,0,0",
        index: "1",
        l: 15,
        n_reel_set: 0,
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,20,10,0,0;100,20,10,0,0;40,10,5,0,0;40,10,5,0,0;40,10,5,0,0;40,10,5,0,0",
        reel_set_size: 2,
        reel_set0: "6,5,7,8,6,2,2,2,7,3,1,4,7,8,4,7,2,2,7,6,3,6,7,6,4,6~6,8,4,8,5,5,3,8,2,2,8,3,8,8,5,4,5,8,4,6,8,3,5,4,5,2,2,2,7~7,3,6,5,2,2,2,8,5,6,5,2,2,5,4,5,5,7,1~6,4,3,6,8,4,7,6,5,6,2,2,2,7,5,8,6,7,6,4,6,8,4,2~4,5,6,5,6,4,5,1,7,5,2,2,2,7,5,7,1,5,8,7,4,5,6,7,5,7,3,7,5,7,3,5,4,7,4,5,7",
        reel_set1: "4,8,3,7,6,4,6,1,4,6,2,2,2,7,4,1,5,7,8,5,7,4,6,8,2,2,5,3~3,4,6,4,3,8,5,2,2,3,6,4,4,5,2,2,2,6,7,8,4,8,5~7,2,2,6,4,3,1,6,2,2,2,3,4,5,4,5,8,7,4,5,6,8~8,6,3,6,4,2,2,2,4,8,4,5,7,6,2,2,5,5,8,6,4,7~8,1,6,2,2,2,5,4,8,7,4,5,4,7,4,1,5,6,8,7,8,2,2,3,6",
        rt: "d",
        rtp: "96.06",
        s: "6,7,4,2,8,4,3,5,6,7,8,5,7,3,4",
        sa: "3,6,6,8,8",
        sb: "7,4,7,5,7",
        sc: "15.00,20.00,40.00,60.00,100.00,120.00,150.00,400.00,600.00,1000.00,2000.00,3000.00,4000.00,6000.00",
        scatters: "1~0,0,0,0,0~0,0,8,0,0~1,1,1,1,1",
        sh: "3",
        stime: "166626594",
        sver: "5",
        ver: "2",
        wilds: "2~300,60,20,0,0~1,1,1,1,1",
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
        l: 15,
        w: player.machine.winMoney,
        gsf_r: player.machine.gsf_r,
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
    //        7              
    var goldenSevens = [];
    for (var i = 0; i < player.machine.jackpotPositions.length; i++) {
        goldenSevens.push(`3~${player.machine.jackpotPositions[i]}`);
    }
    if (goldenSevens.length > 0)
        result["gsf"] = goldenSevens.join(";");

    result["na"] = nextAction;
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["n_reel_set"] = 1;
            //                                   ,                    
            // result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
            result["fs"] = 1; // player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            //                                 ,                    
            result["bg_i"] = "1000, 100, 30, 10";
            result["bgid"] = 0;
            result["bgt"] = 18;
            result["bw"] = 1;
            result["bg_i_mask"] = "pw,pw,pw,pw";
            result["na"] = "b";
            result["lifes"] = 1;
            result["end"] = 0;
            result["level"] = 0;
            result["rw"] = 0;
            result["wp"] = 0;
            result["coef"] = player.virtualBet;
            var cache = player.machine.jackpotCache[0];
            result["wins_mask"] = cache.wins_mask.join(',');
            result["wins"] = cache.wins.join(',');
            result["status"] = cache.status.join(',');
        }
    } else if (prevGameMode == "FREE") {
        result["n_reel_set"] = 1;
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.isFreeSpinAdd) {
            result["fsmore"] = 8;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fswin"] = player.machine.freeSpinWinMoney;
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["n_reel_set"] = 0;
            result["w"] = player.machine.freeSpinWinMoney;
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
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        bg_i_mask: "pw,pw,pw,pw",
        bg_i: "1000,100,30,10",
        bgid: "0",
        bgt: "18",
        coef: "0.15",
        counter: "228",
        end: "0",
        index: "114",
        level: "1",
        lifes: "1",
        na: "b",
        rw: "0.00",
        status: "0,0,0,0,0,0,0,0,0,0,0,0",
        stime: "1629855874179",
        sver: "5",
        wins: "0,0,0,0,0,0,100,0,0,0,0,0",
        wins_mask: "h,h,h,h,h,h,h,h,h,h,h,h",
        wp: "0",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;

    result["coef"] = player.virtualBet;
    var level = player.machine.jackpotLevel;
    result["level"] = level;

    var cache = player.machine.jackpotCache[level];
    result["wins_mask"] = cache.wins_mask.join(',');
    result["wins"] = cache.wins.join(',');
    result["status"] = cache.status.join(',');

    if (player.machine.currentGame == "BASE") {
        //                    
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.winMoney;
        result["na"] = "cb";
        result["lifes"] = 0;
        result["end"] = 1;

        var wpInd = cache.status.indexOf(level);
        result["wp"] = cache.wins[wpInd];
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
        wp: "0",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    result["coef"] = player.virtualBet;

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    return result;
}

module.exports = ApiManager;