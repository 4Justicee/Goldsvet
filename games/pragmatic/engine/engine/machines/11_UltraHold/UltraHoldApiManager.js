var Util = require("../../../utils/slot_utils");

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "9,3,11,6,6,11,5,9,11",
        balance: player.balance,
        cfgs: "1",
        reel_set_size: 2,
        reel_set: 0,
        ver: "2",
        index: "1",
        balance_cash: player.balance,
        def_sb: "3,4,7",
        def_sa: "8,7,5",
        bonusInit: `[{bgid:0,bgt:48,mo_s:\"13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,15,15,15,15,15\",mo_v:\"5,10,15,20,25,30,35,40,45,50,55,60,70,80,90,100,500,1000,1500,2000,2500\"}]`,
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0~0,0,0~1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: `{props:{max_rnd_sim:\"1\",max_rnd_hr:\"82182\",max_rnd_win:\"500\"}}`,
        stime: new Date().getTime(),
        sa: "8,7,5",
        sb: "3,4,7",
        sc: "40.00,80.00,120.00,200.00,300.00,400.00,1000.00,2000.00,4000.00,6000.00,8000.00,10000.00,20000.00",
        defc: "400.00",
        sh: 3,
        wilds: "2~250,0,0~1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "400.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0;0,0,0;0,0,0;250,0,0;150,0,0;100,0,0;80,0,0;80,0,0;20,0,0;20,0,0;20,0,0;20,0,0;0,0,0;0,0,0;0,0,0;0,0,0",
        l: 5,
        rtp: "96.06",
        reel_set0: "9,9,9,6,10,10,10,11,5,9,8,3,8,8,8,2,11,11,11,10,7,4,5,2,8,11,6,8,10,6,8,7,8,11,8,10,6,10~5,3,6,0,0,0,11,11,7,6,6,6,6,3,4,9,10,9,9,9,2,3,6,0,0,0,11,11,8,10,10,10,11,11,11,8,8,8,4,11~8,8,8,5,3,10,9,9,9,4,11,11,11,11,7,6,8,10,10,10,2,9,10,11,5,10,9,5,11,10,11,5,10,9,10,11,10,11,9,5,6,5,7,5,9,10,3,5,10,5,11,10",
        s: "9,3,11,6,6,11,5,9,11",
        reel_set1: "10,10,10,10,9,5,7,11,11,11,8,6,8,8,8,4,9,9,9,2,11,3,9,2,9,11,2,3,11,3,11,8,11,2,11,2,9,11,9,2,11,2,11,9,11,9,11,2,9,2,11,2,11,9,2,11,8,11,2,6,9,6,11,2,11,8,11,9,11,8,3,11,8,2,6,8,2,3,11,2,9,2,8,9,2,9,2,8,11,6,8,11,3,11,2,5,2,11,2,3,11,3,2,8,2,11,2,8,11,8,11,2,11,2,11,6~9,6,6,6,5,10,6,8,9,9,9,3,11,3,6,0,0,0,11,11,4,8,8,8,7,2,10,10,10,11,11,11,8,10,3,6,0,0,0,11,11,3,8,10,11,6,3,11,7,3,10,11,5,8,11,8,6,8,3,11,3,6,0,0,0,11,11,6,5,10,11,5,11,11,8,11,10,6,8,3,6,0,0,0,11,11,6,10,6,11,10,11,2,8,5,11,7,3,11~8,7,3,8,8,8,6,11,11,11,2,9,9,9,9,10,11,10,10,10,5,4,5,10,2,4,11,3,11,5"
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
        index: 1,  
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        stime: new Date().getTime(),
        sa: "8,7,9",
        sb: "8,7,9",
        sh: 3,
        sver: 5,   
        c: player.betPerLine,
        counter: 1,
        reel_set: 0,
        l: 5,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);
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
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    if (player.machine.moneySymbols.length > 0) {
        result["mo_t"] = player.machine.moneySymbols;
        result["mo"] = player.machine.moneyFactors;
    }

    if (player.machine.wildPositions.length > 0) {
        result["is"] = Util.view2String(player.machine.view);
        result["s"] = Util.view2String(player.machine.expandView);
        result["ep"] = `2~${player.machine.wildPositions.join(",")}~${player.machine.expandPositions.join(",")}`;
    }

    if (player.machine.currentGame == "BONUS") {
        //                       
        result["na"] = "b";
        result["bgid"] = 0;
        result["bgt"] = 48;
        result["bw"] = 1;
        result["coef"] = player.betPerLine;
        result["end"] = 0;
        result["rw"] = player.machine.moneyBonusWin;
        result["wp"] = player.machine.moneyBonusWin / player.betPerLine;
        result["w"] = 0;
        result["tw"] = 0;
        result["rsb_rt"] = 0;
        result["lifes"] = 4;
    }

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
        counter: "2"
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
        balance: 0,
        index: 1,  
        balance_cash: 0,
        balance_bonus: 0,
        na: "b",
        stime: new Date().getTime(),
        sver: 5,   
        c: player.betPerLine,
        counter: 1,
        s: Util.view2String(player.machine.view)
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["na"] = "b";
    result["bgid"] = 0;
    result["bgt"] = 48;
    result["coef"] = player.betPerLine;
    result["end"] = 0;
    result["rw"] = player.machine.moneyBonusWin;
    result["wp"] = player.machine.moneyBonusWin / player.betPerLine;
    result["mo_t"] = player.machine.moneySymbols;
    result["mo"] = player.machine.moneyFactors;
    result["lifes"] = player.machine.lifes;
    if (player.machine.lifes == 4) {
        result["rsb_rt"] = 1;
    } else {
        result["rsb_rt"] = 0;
    }

    if (player.machine.currentGame == "BASE") {
        //                       
        result["na"] = "cb";
        result["tw"] = player.machine.moneyBonusWin;
        result["end"] = 1;
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
        stime: "1629939208592",
        sver: "5",
        rw: "0",
        counter: "2",
        coef: player.betPerLine,
    };

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