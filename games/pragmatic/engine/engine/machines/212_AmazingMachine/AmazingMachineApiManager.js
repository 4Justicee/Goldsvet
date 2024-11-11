var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: "14",
        def_s: "19,19,19,19,19,19,19,19,19,19,5,10,3,13,7,4,8,10,7,6,3,8,9,11,5",
        msr: "2",
        bgid: "0",
        balance: "100,000.00",
        nas: "19",
        cfgs: "1",
        ver: "2",
        mo_s: "16;17;18;15",
        index: "1",
        balance_cash: "100,000.00",
        mo_v: "20,25,40,50,75,100,125,150,200,250,500,800,1000,1500,2000,2500,4000,5000;20,25,40,50,75,100,125,150,200,250,500,800,1000,1500,2000,2500,4000,5000;20,25,40,50,75,100,125,150,200,250,500,800,1000,1500,2000,2500,4000,5000;20,25,40,50,75,100,125,150,200,250,500,800,1000,1500,2000,2500,4000,5000",
        def_sb: "4,13,4,7,8",
        reel_set_size: "3",
        def_sa: "10,3,5,3,7",
        reel_set: "0",
        bonusInit: "[{bgid:0,bgt:18,bg_i:\"5000,500,50,25\",bg_i_mask:\"pw,pw,pw,pw\"}]",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        bg_i: "5000,500,50,25",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"13315579\",max_rnd_win:\"5100\"}}",
        wl_i: "tbm~5100",
        stime: "1647320865813",
        bgt: "18",
        sa: "10,3,5,3,7",
        sb: "4,13,4,7,8",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "5",
        wilds: "2~1000,200,50,0,0~1,1,1,1,1;16~1000,200,50,0,0~1,1,1,1,1;20~1000,200,50,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        bg_i_mask: "pw,pw,pw,pw",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,100,20,0,0;150,50,15,0,0;100,30,10,0,0;100,30,10,0,0;50,20,5,0,0;50,20,5,0,0;40,15,5,0,0;40,15,5,0,0;25,10,5,0,0;25,10,5,0,0;25,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.42",
        reel_set0: "12,14,14,14,11,2,2,2,8,6,14,15,4,3,5,2,10,9,13,7,14,8,2,11,14,2,14,7,14,2,3,2~11,9,2,2,2,7,8,14,2,13,6,1,3,12,15,14,14,14,10,5,4,2,4,8,6,2,9,13,14,2,15,14,7,12,13,2,5,7,3,14,9,8,10,2,9,13,2,8,2,5,8,2,13,10,15,13~15,15,15,13,8,3,15,10,12,6,4,1,14,14,14,5,14,9,2,2,2,2,11,7,2,6,4,2,3,2,12,10,14,2,11,14,2,14,3,2,14,2,14,2,13,3,11,10,2,10,3,13,5,14,2,14,2,14,10,3,6,14,1,11,14,13,14,12,6,9,2,10,3,14,3,2,14,5,14,2,8,14,11,13,11,2,14,2,13,12~13,1,9,15,2,2,2,7,3,12,6,10,4,11,5,2,14,14,14,8,14,10,11,14,1,15,2,10,2,1,10,2,10,2,5,10,9,2,9,5,14,10,2,10,1,5,1,8,9,2,5,1,5,10,5,10,14,2,10,6,5,2,10,2,14,5,8,2,10,14,8,2,5,10,11,14,2,11,12,14,5,11,5,2,15,2,10,2,5,2,5,10,15,10,14,2,5,8,14,12,10,15,5,14,5,2,5,8,1,11,14,8,2,8,10,5,14,10,2,15,14,7,1,10,5,2,10,11,2,10,15,5,10,14,5,1,12,1,5,9,14,5,2,14,1,12,2,14,2,14,10,2,15,14,1,9,7,11,8,2,11,8,15,10,2,8,5,11,10,2,14,2,10,14,5,2,8,14,9,8,5,14,2,14,10,8,2,12,2,14,12,9,14,1,14,9,8,5,2,11,1,8,14,10,5,15,1~13,14,14,14,4,2,2,2,9,15,14,12,8,2,6,11,7,5,10,3,10,2,9,11,2,14,11,2,11",
        s: "19,19,19,19,19,19,19,19,19,19,5,10,3,13,7,4,8,10,7,6,3,8,9,11,5",
        accInit: "[{id:0,mask:\"cp;mp\"}]",
        reel_set2: "13,5,8,10,3,12,7,11,6,9,4,4,3,9,3,4,10,11,4,3,4,6,7,3,7,10,4,7,3,5,3,4,12,7,4,7,4,12,4,4~13,5,8,10,3,12,7,11,6,9,4,4,3,9,3,4,10,11,4,3,4,6,7,3,7,10,4,7,3,5,3,4,12,7,4,7,4,12,4,4~13,5,8,10,3,12,7,11,6,9,4,4,3,9,3,4,10,11,4,3,4,6,7,3,7,10,4,7,3,5,3,4,12,7,4,7,4,12,4,4~13,5,8,10,3,12,7,11,6,9,4,4,3,9,3,4,10,11,4,3,4,6,7,3,7,10,4,7,3,5,3,4,12,7,4,7,4,12,4,4~13,5,8,10,3,12,7,11,6,9,4,4,3,9,3,4,10,11,4,3,4,6,7,3,7,10,4,7,3,5,3,4,12,7,4,7,4,12,4,4",
        reel_set1: "13,9,6,5,7,10,15,4,2,2,2,12,14,11,14,14,14,8,2,3,14,4~14,14,14,5,6,2,2,2,8,4,7,10,14,12,9,2,15,11,3,13,15,10,9,3,9,5,11,3,13,2,15,13,15,10,15,10,2,9,5,2,10,3,15,5,10,5,4,12,13~3,8,2,2,2,4,5,14,14,14,7,2,10,12,15,11,13,6,9,14,11,9,14,2,9,14,2,10,11,9,14,15,14,2,7,6,9,2,9~13,4,14,14,14,9,5,12,2,2,2,3,15,8,7,14,10,6,11,2,9,2,9,15,6,15,2,14,7,10,5,2,15,2,7,5,15,14,2,15,7,2,14,9,2,5,2,14,2,15,4~14,2,2,2,8,3,7,6,12,14,14,14,5,13,10,4,2,9,15,11,2,10,9,11"
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
        balance_bonus: "0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bl: "0",
        c: "100.00",
        counter: "1",
        index: "1",
        l: "20",
        na: "s",
        reel_set: "0",
        s: "",
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sver: "5",
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

    //             api
    if (player.machine.moneyCache.values.length > 0) {
        result["mo"] = player.machine.moneyCache.values.join();
        result["mo_t"] = player.machine.moneyCache.table.join();
    }

    //                 
    if (player.machine.wildSrf != "") {
        result["srf"] = player.machine.wildSrf;
        result["is"] = player.machine.isView;
    }

    if (prevGameMode == "BASE") {
        // rs_more: rs_more,
        // srf: newsrf.join(";"),
        // sty: styStr.join("~"),
        // pw: bonusWinmoney

        if (player.machine.currentGame == "BONUS") {
            result["msr"] = 3;
            result["pw"] = player.machine.bonusCache.pw;
            result["rs_c"] = 1;
            result["rs_m"] = player.machine.moneyBonusLength;
            result["rs_p"] = 0;
            result["rs"] = "mc";
            result["ls"] = 3;
            result["is"] = player.machine.view;
            result["sty"] = player.machine.bonusCache.sty;
        } else if (player.machine.currentGame == "JACKPOT") {
            result["na"] = "b";
            result["wins_mask"] = "h,h,h,h,h,h,h,h,h,h,h,h";
            result["wins"] = "0,0,0,0,0,0,0,0,0,0,0,0";
            result["wp"] = 0;
            result["status"] = "0,0,0,0,0,0,0,0,0,0,0,0";
            result["bg_i_mask"] = "pw,pw,pw,pw";
            result["bg_i"] = "5000,500,50,25";
            result["bgid"] = 0;
            result["bgt"] = 18;
            result["bw"] = 1;
            result["end"] = 0;
            result["coef"] = player.virtualBet;
            result["rw"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
        }
    } else if (prevGameMode == "BONUS") {
        if (player.machine.currentGame == "BONUS") {
            result["msr"] = 3;
            result["ls"] = 3;
            result["pw"] = player.machine.bonusCache.pw * player.betPerLine;
            result["rs_c"] = player.machine.bonusIndex;
            result["rs_m"] = player.machine.moneyBonusLength;
            result["rs_p"] = player.machine.bonusIndex - 1;
            result["rs"] = "mc";
            result["sty"] = player.machine.bonusCache.sty;
            result["is"] = player.machine.view;
            result["acci"] = 0;
            result["accm"] = 'cp~mp';
            result["accv"] = '0~3';
            result["na"] = "s";

            if (player.machine.bonusCache.rs_more != 0) {
                result["rs_more"] = player.machine.bonusCache.rs_more;
                result["srf"] = player.machine.bonusCache.srf;
            }

        } else if (player.machine.currentGame == "BASE") {
            result["msr"] = 3;
            result["ls"] = 3;
            result["pw"] = player.machine.bonusCache.pw * player.betPerLine;
            result["rs_t"] = player.machine.moneyBonusLength;
            result["rs"] = "mc";
            result["sty"] = player.machine.bonusCache.sty;
            result["is"] = player.machine.view;
            result["acci"] = 0;
            result["accm"] = 'cp~mp';
            result["accv"] = '0~3';
            result["na"] = "c";

            result["mo_tw"] = player.machine.bonusWinmoney;
            result["mo_tv"] = player.machine.bonusWinmoney / player.betPerLine;
            result["mo_wpos"] = player.machine.bonusCache.wildPos.join()
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


ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        bg_i_mask: "pw,pw,pw,pw",
        bg_i: "5000,500,50,25",
        bgid: "0",
        bgt: "18",
        coef: player.virtualBet,
        counter: "1",
        end: "0",
        index: "1",
        na: "b",
        stime: "",
        sver: "5",
        rw: 0,
        level: 1,
        lifes: 1
    };

    result["wins_mask"] = player.machine.winMask.join();
    result["wins"] = player.machine.wins.join();
    result["status"] = player.machine.status.join();
    result["coef"] = player.virtualBet;
    result["level"] = player.machine.jackPotIndex - 1;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["wp"] = 0;

    if (player.machine.currentGame == "BASE") {
        //                    
        result["level"] = player.machine.jackPotIndex;
        result["end"] = 1;
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;
        result["na"] = "cb";
        result["wp"] = player.machine.jackPotVal;
        result["lifes"] = 0;
        result["wins_mask"] = player.machine.winMask.join();
        result["wins"] = player.machine.wins.join();
        result["status"] = player.machine.status.join();
        result["coef"] = player.virtualBet;
    }

    return result;
};

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
        coef: player.virtualBet,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};


module.exports = ApiManager;