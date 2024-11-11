var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "4,11,5,2,7,8,4,1,11,3,5,7,11,5,11,4,9,5,9,11",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "9,2,2,2,2",
        def_sa: "5,11,9,7,5",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~1,1,1,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1645596153864",
        sa: "5,11,9,7,5",
        sb: "9,2,2,2,2",
        sc: "4.00,5.00,10.00,20.00,30.00,40.00,50.00,100.00,250.00,500.00,1000.00,2000.00",
        defc: "40.00",
        sh: "4",
        wilds: "2~400,100,20,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "40.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;300,80,15,0,0;200,70,15,0,0;150,60,10,0,0;125,50,10,0,0;90,40,10,0,0;80,30,10,0,0;70,25,5,0,0;60,20,5,0,0;50,12,5,0,0",
        l: "50",
        rtp: "96.53",
        reel_set0: "11,7,8,4,11,7,9,5,5,1,11,6,1,2,2,2,2,10,6,7,3,7,9,9,4~9,3,10,10,5,4,2,2,2,2,8,11,6,8,7,8,10,6,8~11,11,8,10,3,3,7,8,6,11,10,1,9,4,8,7,8,2,2,2,2,2,5~8,10,11,6,5,7,2,2,2,2,10,4,5,3,10,9,11,9,11,8,3,6~7,10,7,11,9,3,4,5,8,6,5,7,9,5,1,7,10,2,2,2,2,11,8,11",
        s: "4,11,5,2,7,8,4,1,11,3,5,7,11,5,11,4,9,5,9,11",
        reel_set1: "6,10,3,9,6,11,10,9,10,11,8,4,5,7,5,4,10~10,6,11,7,10,9,4,8,11,10,11,9,6,7,3,8,5~9,3,10,11,6,10,11,5,7,4,6,5,8,11,8~10,4,8,9,9,3,8,11,7,9,11,10,5,6,3,4,11,7,10~5,7,11,10,5,3,7,8,6,3,6,4,4,8,9,11",
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
    result["stime"] = new Date().getTime();

    if (player.betPerLine > 0) {
        result["c"] = player.betPerLine;
        result["defc"] = player.betPerLine;
    }
    return result;
};

ApiManager.prototype.GameApi = function (player, prevGameMode, param) {
    var result = {
        tw: player.machine.winMoney,
        balance: "99,999.50",
        index: "2",
        balance_cash: "99,999.50",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "4,9,7,11,1",
        sb: "2,8,7,10,8",
        sh: "4",
        c: player.betPerLine,
        sver: "5",
        n_reel_set: "0",
        counter: "4",
        l: "50",
        s: Util.view2String(player.machine.view),
        w: player.machine.winMoney,
    };

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE" || player.machine.bonusStatus == "BONUS") {
            //                                   ,                    
            result["bgid"] = "0";
            result["bgt"] = "9";
            result["bw"] = "1";
            result["coef"] = player.virtualBet;
            result["end"] = "0";
            result["level"] = "0";
            result["lifes"] = "1";
            result["rw"] = "0";
            result["status"] = "0,0,0";
            result["wins_mask"] = "h,h,h";
            result["wins"] = "0,0,0";
            result["wp"] = "0";
            result["na"] = "b";
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel_set"] = "1";
        result["s"] = Util.view2String(player.machine.view);

        //                       
        //                                 
        if (player.machine.freeSpinType == "RAINING") {
            result["fstype"] = "rwf";
            result["rwd"] = `2~${player.machine.rainingWildPos.join()}`;
            result["is"] = Util.view2String(player.machine.maskView);
        }
        //                                 
        else if (player.machine.freeSpinType == "STICKY") {
            result["fstype"] = "swf";
            result["rwd"] = `2~${player.machine.stickyWildPos.join()}`;
            result["is"] = Util.view2String(player.machine.maskView);
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;

            if (player.machine.freeSpinType == "STICKY") {
                var stickys = [];
                for (var i = 0; i < player.machine.stickys.length; i++) {
                    stickys.push(`${player.machine.stickys[i]}~${player.machine.stickys[i]}`);
                }
                result["sty"] = stickys.join();
            }
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;

            if (player.machine.freeSpinType == "STICKY") {
                var stickys = [];
                for (var i = 0; i < player.machine.stickys.length; i++) {
                    stickys.push(`${player.machine.stickys[i]},-1`);
                }
                result["sty"] = stickys.join("~");
            }
        }
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
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bgid: "0",
        bgt: "9",
        coef: player.virtualBet,
        counter: "1",
        end: "1",
        level: "1",
        lifes: "0",
        index: "1",
        rw: "0",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    var cache = player.machine.selectCache;
    result["status"] = cache.status.join();
    result["wins_mask"] = cache.wins_mask.join();
    result["wins"] = cache.wins.join();
    result["wp"] = "0";

    if (player.machine.bonusStatus == "BONUS") {
        result["na"] = "cb";
        result["tw"] = player.machine.moneyBonusWin;
        result["rw"] = player.machine.winMoney;
    } else if (player.machine.currentGame == "FREE") {
        result["fsmax"] = player.machine.freeSpinLength;
        result["na"] = "s";
        result["fs"] = "1";
        result["fsmul"] = "1";
        result["fsres"] = "0.00";
        result["fswin"] = "0.00";
        result["n_reel_set"] = 1;
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.freeSpinType == "RAINING") {
            result["fstype"] = "rwf";
        } else if (player.machine.freeSpinType == "STICKY") {
            result["fstype"] = "swf";
        }
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