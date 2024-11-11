var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        n_aw_reel: "0",
        def_s: "9,6,3,4,5,4,8,6,9,8,5,3,8,8,7",
        prg_m: "ca,ta,cp,tp,lvl,r",
        prg_i: "7",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "9,5,7,0,3,4,8,7,6,5,10,7,4,2,9,8,5",
        ver: "2",
        reel0: "10,3,7,2,6,4,9,5,4,8,6,9,10,2,8,6,10",
        prg: "0,10,0,1,0,0",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "3,4,7,6,8",
        def_sa: "8,7,5,3,7",
        reel3: "7,8,6,0,7,3,9,7,5,6,8,7,4,2,8,7,6",
        reel2: "7,4,5,0,9,7,3,8,5,9,7,6,10,2,8,5,9",
        reel4: "10,6,7,2,4,10,8,5,3,10,6,8,7,2,9,10,6",
        prg_cfg_m: "s",
        balance_bonus: "0.00",
        aw_reel10: "m~20",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        aw_reel: "0",
        bg_i: "5,10,15,25,100",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"35714285\",max_rnd_win:\"450\"}}",
        stime: "1646792688654",
        sa: "8,7,5,3,7",
        sb: "3,4,7,6,8",
        sc: "10,20,40,50,80,100,250,500,1000,3000,5000",
        defc: "80",
        prg_cfg: "3",
        aw_reel_count: "11",
        sh: "3",
        wilds: "2~1000,500,80,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "80",
        aw_reel0: "m~1",
        aw_reel2: "m~4",
        sver: "5",
        aw_reel1: "m~2",
        bg_i_mask: "pw,pw,pw,pw,pw",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,200,50,0,0;250,100,30,0,0;200,50,25,0,0;150,40,25,0,0;125,25,15,0,0;100,25,5,0,0;100,20,5,0,0;100,20,5,0,0",
        l: "25",
        rtp: "96.51",
        s: "9,6,3,4,5,4,8,6,9,8,5,3,8,8,7",
        aw_reel4: "m~8",
        aw_reel3: "m~6",
        aw_reel6: "m~12",
        aw_reel5: "m~10",
        aw_reel8: "m~16",
        aw_reel7: "m~14",
        aw_reel9: "m~18"
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
        balance: "100,116.81",
        index: "10",
        balance_cash: "100,116.81",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "11,9,6,9,4",
        sb: "7,3,9,8,10",
        sh: "3",
        c: player.betPerLine,
        sver: "5",
        counter: "20",
        prg_m: "ca,ta,cp,tp,lvl,r",
        l: "25",
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
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
    result["prg"] = `${player.machine.spinIndex},10,0,1,0,1`;

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";

            result["coef"] = player.virtualBet;
            result["bgid"] = 0;
            result["bgt"] = 27;
            result["bw"] = 1;

            result["level_opts"] = 4;
            result["level"] = 0;
            result["lifes"] = 5;
            result["n_aw_reel"] = 0;

            result["end"] = 0;
            result["status"] = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
            result["wins_mask"] = "h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h";
            result["wins"] = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
            result["wp"] = 0;

        }
    } //                       

    return result;
};

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
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        counter: "1",
        index: param.index,
        na: "b",
        stime: new Date().getTime(),
        sver: "5",
    };

    result["counter"] = ++param.counter;
    result["na"] = "b";

    result["coef"] = player.virtualBet;
    result["bgid"] = 0;
    result["bgt"] = 27;
    result["end"] = 0;

    result["level_opts"] = 4;
    result["level"] = player.machine.bonusSpinIndex - 1;
    result["lifes"] = 6 - player.machine.bonusSpinIndex;

    result["rw"] = player.machine.moneyBonusWin;
    result["status"] = player.machine.status.join();
    result["wins_mask"] = player.machine.wins_mask.join();
    result["wins"] = player.machine.wins.join();
    result["wp"] = player.machine.bonusMulti;

    if (player.machine.currentGame == "BASE") {
        result["end"] = 1;
        result["tw"] = player.machine.moneyBonusWin;
        result["na"] = "cb";
    }

    return result;
};

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "99,986.50",
        coef: "1.00",
        index: "90",
        balance_cash: "99,986.50",
        balance_bonus: "0.00",
        na: "s",
        rw: "2.00",
        stime: "1643365512789",
        wp: "0",
        sver: "5",
        counter: "180",
    };

    result["coef"] = player.virtualBet;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["rw"] = player.machine.moneyBonusWin;
    result["wp"] = 0;
    return result;
};

module.exports = ApiManager;
