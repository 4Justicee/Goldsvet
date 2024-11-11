var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "9,6,3,4,5,4,8,6,9,8,5,3,8,8,7",
        prg_m: "cp,tp,r,acw",
        balance: "0.00",
        cfgs: "2716",
        ver: "2",
        prg: "0,40,0,0.00",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "4",
        def_sb: "12,13,4,4,4",
        def_sa: "11,12,6,14,4",
        prg_cfg_m: "s,s,s",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646036426927",
        sa: "11,12,6,14,4",
        sb: "12,13,4,4,4",
        prg_cfg: "3,4,5",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;15~200,100,30,3,0~1,1,1,1,1;16~125,60,20,3,0~1,1,1,1,1;17~100,50,15,3,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,100,30,3,0;125,60,20,3,0;100,50,15,3,0;60,30,10,0,0;60,30,10,0,0;60,30,10,0,0;40,15,5,0,0;40,15,5,0,0;30,10,5,0,0;30,10,5,0,0;30,10,5,0,0;30,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "94.01",
        reel_set0: "12,13,5,5,5,11,5,12,13,7,8,8,9,9,3,3,3,10,13,6,8,14,3,6,1,5,9,4,4,4,4,6,14,4,11,5,9,1,7,9,5,4,7,14,6,7,1,4,10,11,10,3,10,4,11,12~5,5,5,3,3,3,9,5,4,4,4,8,3,8,10,10,11,3,2,2,2,12,2,6,13,13,3,11,5,10,12,6,13,4,5,14,6,14,9,9,4,11,3,3,7,12,4,9,12,5,8,7,13,2,12,13,14,8,2~13,14,8,9,4,4,4,10,7,8,11,5,5,5,6,3,3,3,2,2,2,14,2,4,6,14,1,14,12,1,3,5,3,1,2,3,13,3,10,5,4,9,5,5,2,12,2,4,4,13,12,11,4~14,9,3,3,3,5,5,5,4,4,4,12,3,12,5,7,4,11,8,8,5,4,11,3,12,4,3,12,5,4,6,13,4,13,3,13,12,5,11,2,2,2,14,7,8,10,7,14,2,10,13,2,9,11,8,2,10,6~1,5,5,5,12,5,6,2,2,2,14,10,11,3,3,3,6,6,13,1,7,3,14,7,3,4,4,4,3,9,13,5,5,13,10,2,8,14,3,3,13,5,11,11,6,1,12,4,4,4,9,2,4,2,9",
        s: "9,6,3,4,5,4,8,6,9,8,5,3,8,8,7",
        reel_set2: "6,8,13,13,9,3,3,3,8,9,4,4,4,1,5,5,5,4,14,12,1,10,5,1,3,4,6,13,5,5,8,11,5,5,11,10,4,3,6,3,12,3,11,11,1,6,7,7,4,10,11,9~3,3,3,3,12,16,16,16,9,10,6,2,2,2,13,6,16,17,17,17,11,16,14,17,13,13,2,3,10,10,13,9,8,8,16,8,17,16,16,3,12,11,17,3,11,12,14,2,2,10,12,13,7,17~2,2,2,12,3,3,3,11,10,2,13,2,17,17,17,12,9,16,16,16,9,1,3,3,17,16,16,2,9,7,17,8,1,13,8,8,3,14,17,12,17,16,9,6,13,1,7,14,10,8,16,3~12,12,11,3,3,3,16,16,16,10,14,3,12,13,8,16,3,3,11,7,16,17,17,17,2,2,2,13,7,12,9,13,7,14,17,10,2,17,9,11,6,3,16,6,8,2,17,14,6,9,9,16,13,8,11,16,7,17,3,8~9,10,16,16,16,12,6,1,7,16,8,3,3,3,16,14,3,17,17,17,11,17,14,10,9,3,16,1,13,9,2,2,2,2,13,12,3,7,3,11,6,17,1,10,1,16,8,17,11,8,6,12,17,13",
        reel_set1: "7,1,10,5,5,5,4,4,4,5,3,3,3,11,5,4,4,10,9,10,4,13,13,1,6,13,1,6,7,3,3,12,10,5,11,14,4,7,5,9,11,3,8,8,5,6,11,5,12,4,3,9,13,11~12,4,4,4,13,17,17,17,8,8,6,3,3,3,3,14,10,14,11,4,2,2,2,17,9,17,17,3,10,3,4,3,13,3,12,10,6,11,7,4,17,11,12,2,9,12,17,8,14,14,4,13,12,2,11,13,10~8,4,4,4,13,17,17,17,12,14,1,14,11,2,2,2,1,9,10,8,12,9,6,4,7,17,2,9,11,4,1,2,17,3,3,3,7,3,8,17,13,10,3,2,3,6,13,8,3,17,3,12,1,8,4,4~11,10,2,2,2,11,17,17,17,8,12,14,17,9,10,3,3,3,4,4,4,2,9,2,3,17,4,12,12,7,14,11,17,13,7,3,17,7,13,4,12,4,2,9,13,3,17,3,7,3,6,4,4,12,8,6,3,11~3,3,3,8,14,9,11,17,17,17,12,8,10,6,2,2,2,7,13,6,6,3,17,1,2,4,4,4,1,7,1,3,14,4,3,17,10,2,11,4,17,1,3,10,4,10,4,11,12,17,6,4,13,14,8",
        reel_set3: "9,5,5,5,3,3,3,1,4,4,4,10,4,13,1,6,4,7,13,4,3,14,11,3,8,5,1,7,8,3,3,7,5,4,10,4,3,11,6,3,12,11,9,5,8,13,5,6,4,13,14,5,10,11,5~11,10,15,15,15,11,16,16,16,17,17,17,8,2,2,2,12,6,13,9,15,7,13,16,12,17,15,2,15,2,13,17,8,10,6,6,16,16,16,12,12,17,17,12,14,10,11,17,2,16,14,15,2,15,15,9,13~15,15,15,15,14,13,8,10,8,16,16,16,1,17,17,17,2,2,2,16,17,17,10,2,16,9,14,8,15,7,9,6,1,13,11,2,11,16,10,2,13,8,9,15,1,15,16,17,9,15,17,16,17,12~12,11,7,15,15,15,16,16,16,15,15,9,17,17,17,10,8,16,13,17,16,11,17,17,11,9,2,2,2,17,16,13,13,14,15,12,17,10,14,2,7,7,16,15,12,7,12,9,16,2,13,6,15,8,2,6~10,11,6,1,12,15,15,15,9,6,10,14,10,2,2,2,15,17,17,17,6,16,16,16,15,17,17,1,7,16,1,13,16,8,11,12,14,15,17,17,11,8,2,6,7,14,16,2,15,12,16,15,1,13,10,16,6",
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
        balance_bonus: 0,
        balance_cash: 0,
        balance: 0,
        c: player.betPerLine,
        l: 25,
        n_reel_set: 0,
        na: "s",
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 3,
        sver: 5,
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
        prg_m: "cp,tp,r,acw",
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

    result["prg"] = `${player.machine.trophyScore},40,0,${(player.machine.trophyWin * player.virtualBet * 2) / 100}`;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs_opt_mask"] = "fs,m,rs,rsv";
            result["fs_opt"] = "20,1,5,2~10,1,5;4,2~5,1,5;4;3,2";
            result["na"] = "fso";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel_set"] = player.machine.freeSpinType + 1;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    if (player.machine.trophyStatus == "TROPHY") {
        result["bw"] = 1;
        result["end"] = 0;
        result["level"] = 0;
        result["lifes"] = 1;
        result["n_reel_set"] = 0;
        result["rw"] = player.machine.trophyWin;
        result["status"] = "0,0,0,0,0,0,0,0";
        result["wins_mask"] = "h,h,h,h,h,h,h,h";
        result["wins"] = "0,0,0,0,0,0,0,0";
        result["na"] = "b";
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

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
};

ApiManager.prototype.FreeSpinOptionApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "1",
        fs: "1",
        fsmax: "10",
        fsmul: "1",
        fsres: "0.00",
        fswin: "0.00",
        index: "1",
        n_reel_set: "3",
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["fsmax"] = player.machine.freeSpinLength;
    result["stime"] = new Date().getTime();
    result["n_reel_set"] = player.machine.freeSpinType + 1;
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        tw: "6.12",
        balance: "99,987.09",
        wins: "20,100,2,8,6,50,10,4",
        level: "1",
        index: "307",
        balance_cash: "99,987.09",
        balance_bonus: "0.00",
        na: "cb",
        status: "0,0,0,0,0,0,0,0",
        rw: "6.12",
        stime: "1645602921882",
        lifes: "0",
        wins_mask: "m,m,m,m,m,m,m,m",
        end: "1",
        sver: "5",
        counter: "614",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;

    result["rw"] = player.machine.moneyBonusWin;
    result["tw"] = player.machine.moneyBonusWin;

    result["status"] = player.machine.statusCode.join();
    result["wins"] = player.machine.trophyMultiArray.join();

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
        counter: "2",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;