var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "5,7,5,8,6,2,4,3,3",
        bgid: "0",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "2,4,7,5,6,4,8,6,6,7,7,6,2,5,5,7,6,8,4,7,3,6,7,7",
        ver: "2",
        reel0: "3,8,7,2,6,6,6,4,4,8,8,7,8,6,5,7,8,8,8,4,7",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "3,4,7",
        def_sa: "3,8,7",
        reel2: "3,4,7,5,8,3,8,8,7,2,8,6,5,5,8,5,5,8,8,3,8,6",
        bonusInit: '[{bgid:0,bgt:18,bg_i:\"888,88,38\",bg_i_mask:\"pw,pw,pw\"}]',
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        bg_i: "888,88,38",
        rt: "d",
        stime: "1645248060114",
        bgt: "18",
        sa: "3,8,7",
        sb: "3,4,7",
        sc: "30.00,50.00,100.00,200.00,500.00,700, 1000.00,2000.00,3000.00,5000.00,10000.00, 13000",
        defc: "100",
        sh: "3",
        wilds: "2~250,0,0~1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100",
        sver: "5",
        bg_i_mask: "pw,pw,pw",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;100,0,0;60,0,0;30,0,0;15,0,0;6,0,0;3,0,0",
        l: "7",
        rtp: "96.45",
        s: "5,7,5,8,6,2,4,3,3",
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
        sa: "1,2,3,4,5",
        sb: "1,2,3,4,5",
        sh: 3,
        sver: 5,   
        c: player.betPerLine,
        l: 7,
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
    if (winLines.length)
        result["com"] = player.machine.winSymbols.join();
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

    if (player.machine.prevRespinStatus == "NORESPIN" && player.machine.respinStatus == "RESPIN") {
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "s~2";
    } else if (player.machine.prevRespinStatus == "RESPIN") {
        result["is"] = player.machine.respinMask.join();

        if (player.machine.respinStatus == "NORESPIN") {
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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS") {
            //                                 ,                    
            result["bg_i"] = "888,88,38";
            result["bgid"] = 0;
            result["bgt"] = 18;
            result["bw"] = 1;
            result["bg_i_mask"] = "pw,pw,pw";
            result["na"] = "b";
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["rw"] = 0;
            result["wp"] = 0;
            result["coef"] = player.virtualBet;
            var cache = player.machine.jackpotCache[0];
            result["wins_mask"] = cache.wins_mask.join(',');
            result["wins"] = cache.wins.join(',');
            result["status"] = cache.status.join(',');
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
        balance: "99,991.20",
        coef: "0.15",
        level: "1",
        index: "114",
        balance_cash: "99,991.20",
        balance_bonus: "0.00",
        na: "b",
        status: "0,0,0,0,0,0,0,0,0",
        bg_i: "888,88,38",
        bg_i_mask: "pw,pw,pw",
        bgid: "0",
        bgt: "18",
        stime: "1629855874179",
        lifes: "1",
        rw: "0.00",
        end: "0",
        sver: "5",
        counter: "228",
        rtp: "96.06",
        wins_mask: "h,h,h,h,h,h,h,h,h",
        wins: "0,0,0,0,0,0,0,0,0",
        wp: "0",
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
        result["tw"] = player.machine.winMoney;
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
        wp: "0"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["coef"] = player.virtualBet;
    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    return result;
}

module.exports = ApiManager;