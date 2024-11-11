var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "9,6,3,4,5,4,8,6,9,8,5,3,8,8,7",
        balance: "0.00",
        cfgs: "2520",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "4",
        def_sb: "11,13,3,3,3",
        def_sa: "7,4,4,4,11",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        bg_i: "50,3,200,4,1250,5",
        rt: "d",
        stime: "1646037386624",
        sa: "7,4,4,4,11",
        sb: "11,13,3,3,3",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;15~200,100,30,3,0~1,1,1,1,1;16~125,60,20,3,0~1,1,1,1,1;17~100,50,15,3,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        bg_i_mask: "pw,ic,pw,ic,pw,ic",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,100,30,3,0;125,60,20,3,0;100,50,15,3,0;60,30,10,0,0;60,30,10,0,0;60,30,10,0,0;40,15,5,0,0;40,15,5,0,0;30,10,5,0,0;30,10,5,0,0;30,10,5,0,0;30,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "95.17",
        reel_set0: "4,4,4,5,5,5,14,3,3,3,9,12,10,3,3,3,10,8,9,6,12,13,9,10,11,8,6,1,4,4,4,5,5,5,3,3,3,12,11,6,13,9,7,11,7,13,5,5,5,14,10,1,1,8,4,4,4,7,11~9,4,4,4,13,10,7,10,9,5,5,5,11,2,2,2,14,3,3,3,3,4,4,4,8,12,12,7,14,5,5,5,8,2,2,2,13,11,6,3,3,3,2,2,2,7,11,13,10,3,3,3,6,13,5,5,5,8,9,12,6,4,4,4,11,12~9,9,4,4,4,8,2,2,2,7,14,12,3,3,3,5,5,5,10,6,1,4,4,4,1,5,5,5,8,12,14,2,2,2,11,3,3,3,13,5,5,5,10,11,2,2,2,1,7,14,3,3,3,13,12,1,10,13,12,5,5,5,5,4,4,4,6,7,8~4,4,4,7,12,5,5,5,9,12,2,2,2,2,14,10,11,8,2,2,2,12,5,5,5,8,7,4,4,4,3,3,3,5,5,5,8,10,11,14,3,3,3,13,6,12,13,11,5,5,5,12,4,4,4,13,2,2,2,7,3,3,3,6,8,9,10~1,5,5,5,5,10,11,1,1,6,8,4,4,4,12,6,13,7,3,3,3,2,2,2,13,6,11,6,5,5,5,9,13,9,7,10,1,13,8,2,2,2,14,3,3,3,4,4,4,5,5,5,12,10,11,11,3,3,3,14,4,4,4,6,2,2,2,4",
        s: "9,6,3,4,5,4,8,6,9,8,5,3,8,8,7",
        reel_set2: "11,9,9,4,4,4,13,8,1,6,8,11,10,1,5,5,5,12,9,11,4,4,4,3,3,3,1,13,7,13,6,12,6,5,5,5,13,4,4,4,8,9,8,7,7,3,3,3,6,11,7,14,4,10,12,5,5,5,14,3,3,3,13,10,1~12,14,3,3,3,3,10,2,2,2,16,16,16,14,11,8,8,8,14,12,3,3,3,13,16,16,16,11,17,17,17,13,11,9,7,12,7,2,2,2,9,7,16,16,16,2,2,2,17,17,17,6,13,6,10,9,3,3,3,13,17,17,17,12,11,9,10~14,17,17,17,3,3,3,3,8,1,2,2,2,6,6,11,12,13,11,8,7,2,2,2,17,17,17,12,9,16,16,16,16,13,14,1,3,3,3,2,2,2,16,16,16,7,12,14,7,10,17,17,10,14,10,13,8,3,3,3,12,8,16,16,16,9,1~9,14,7,14,12,12,12,11,2,2,2,10,3,3,3,9,16,16,16,6,3,3,3,6,17,17,17,17,12,16,16,16,14,13,12,7,13,7,13,8,2,2,2,17,17,17,11,16,16,16,3,3,3,8,11,9,17,17,17,8,11,7,2,2,2,10~1,6,14,10,6,8,7,13,3,3,3,14,16,16,16,11,17,17,17,2,2,2,11,9,12,2,2,2,17,17,17,16,16,16,12,3,3,3,8,11,9,6,11,9,13,17,17,17,12,1,10,3,3,3,10,16,16,16,2,2,2,1,6,1",
        reel_set1: "10,3,3,3,6,9,14,5,5,5,7,7,12,10,9,4,4,4,11,6,1,6,13,13,8,10,3,3,3,8,11,4,4,4,11,5,5,5,12,13,1,7,10,14,6,9,4,4,4,14,3,3,3,11,8,9,5,5,5,13,1~8,13,6,9,17,17,17,14,12,13,14,2,2,2,3,3,3,4,4,4,13,6,8,8,7,9,10,9,3,3,3,11,8,14,11,11,2,2,2,3,3,3,7,12,4,4,4,2,2,2,17,17,17,10,12,10,17,17,17,12,13,13,10,11~8,13,14,13,2,2,2,17,17,17,17,1,6,3,3,3,7,1,9,17,17,17,13,4,4,4,12,9,8,2,2,2,3,3,3,9,4,4,4,6,17,17,17,10,1,6,1,9,10,12,8,3,3,3,11,2,2,2,14,13,4,4,4,10,7,11,7~3,3,3,11,11,10,8,13,2,2,2,3,3,3,12,8,13,9,4,4,4,7,9,11,13,12,14,2,2,2,17,17,17,9,4,4,4,12,12,7,6,6,13,4,4,4,3,3,3,17,17,17,6,8,13,14,7,7,2,2,2,8,17,17,17,9~2,2,2,11,8,3,3,3,17,17,17,9,10,6,11,11,1,4,4,4,4,14,13,17,17,17,13,14,2,2,2,4,4,4,7,3,3,3,6,10,13,6,7,4,4,4,2,2,2,3,3,3,9,13,11,8,6,12,17,17,17,1,12,1,1,10",
        reel_set3: "11,4,4,4,7,5,5,5,6,13,11,8,6,9,8,7,3,3,3,8,5,5,5,9,13,14,3,3,3,4,4,4,7,6,12,6,7,1,11,10,10,4,4,4,11,12,13,9,5,5,5,12,14,3,3,3,10,1,1,9,11,8,1~13,13,8,2,2,2,17,17,17,2,2,2,7,11,11,8,16,16,16,17,17,17,13,12,9,10,9,10,15,15,15,17,17,17,6,16,16,16,10,2,6,15,15,15,11,12,9,14,8,16,16,16,12,15,15,15,13,14,6,11,12,10~6,16,16,16,2,2,2,13,8,8,10,15,15,15,17,17,17,2,15,15,15,14,13,9,2,2,2,9,12,13,1,7,1,16,16,16,17,17,17,6,7,10,11,14,8,1,15,15,15,2,2,2,11,7,14,14,16,16,16,12,17,17,17~7,2,2,2,7,12,17,17,17,15,15,15,8,11,6,16,16,16,13,10,6,7,2,2,2,12,17,17,17,9,8,16,16,16,10,8,15,15,15,8,12,12,14,10,13,7,17,17,17,11,11,14,9,16,16,16,11,13,13,12,6,2,2,2~12,15,15,15,14,2,2,2,6,16,16,16,6,14,10,17,17,17,11,15,15,15,11,11,14,6,9,16,16,16,2,2,2,12,11,10,1,10,11,1,17,17,17,7,1,15,15,15,13,9,13,8,1,2,2,2,7,16,16,16,6,9,17,17,7",
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

    if (player.machine.jackpotStatus == "JACKPOT") {
        result["bg_i_mask"] = "pw,ic,pw,ic,pw,ic,p,p,p,p,p,p,p,p,p";
        result["bg_i"] = `50,3,200,4,1250,5,${player.machine.jackpotSymbols}`;
        result["bw"] = 1;
        result["coef"] = player.virtualBet;
        result["end"] = 1;
        result["n_reel_set"] = 0;
        result["rw"] = player.machine.jackpotMoney;
        result["wp"] = player.machine.jackpotMulti;
        result["w"] = player.machine.jackpotBeforeMoney;
    }

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

module.exports = ApiManager;
