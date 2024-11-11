var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "5,8,7,3,8,10,11,3,8,3,11,7,8,5,9",
        prg_m: "cp,tp,lvl",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        prg: "0,5,0",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "5",
        def_sb: "5,12,10,7,2",
        def_sa: "12,9,6,11,3",
        prg_cfg_m: "s",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~10,10,10,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"140845070\",max_rnd_win:\"1000\"}}",
        stime: "1645601064181",
        sa: "12,9,6,11,3",
        sb: "5,12,10,7,2",
        sc: "10.00,20.00,50.00,80.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "80.00",
        prg_cfg: "13",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "80.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,200,25,0,0;400,150,25,0,0;300,125,25,0,0;200,100,20,0,0;100,50,20,0,0;75,20,10,0,0;50,20,10,0,0;50,20,5,0,0;50,20,5,0,0;50,20,5,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.50",
        reel_set0: "12,9,6,11,3,8,11,9,10,7,12,4,5,4,5,10,3~9,5,11,2,7,5,1,2,3,4,6,8,12,11,10,1,6,10,4,8,7~8,5,7,8,4,8,11,12,3,6,10,3,4,8,12,10,1,9,3,6,7,11,2,2~9,1,7,6,3,9,5,8,1,12,10,7,4,11,11,3,11,10,6,2,2,2,3,12,8~5,12,10,7,2,6,9,10,4,12,11,6,3,10,8,2,11,9,7",
        s: "5,8,7,3,8,10,11,3,8,3,11,7,8,5,9",
        reel_set2: "4,9,5,3,9,11,3,3,8,12,4,11,10,6,3,5,3,3,8,9~11,11,1,12,3,8,6,4,5,4,10,13,5,12,8,9,3,3,2~9,2,8,4,6,6,10,4,8,3,3,1,10,3,11,5,12,11,13~1,4,3,9,5,12,5,5,12,13,11,4,4,8,11,2,6,3,6,11,8,10,10~8,6,5,6,10,2,5,3,9,10,4,10,8,4,11,12,2,6,11,5,9,12",
        reel_set1: "5,8,8,11,9,3,6,12,4,10,5,7,3,12,9,3,11,3~11,7,9,8,12,5,1,10,12,7,6,4,4,2,5,8,3,13,10,3,3~7,5,5,6,8,10,12,11,3,1,4,13,4,2,3,3,2,9,6,12,11,9,10~11,2,8,5,10,4,7,8,3,11,9,4,3,13,12,6,1,10,11,12~2,6,3,9,4,10,4,12,2,9,10,11,10,7,12,7,11,5,6,7,5,8",
        reel_set4: "10,4,3,11,4,10,8,3,8,9,3,3,4,3,12,11,3,9,3,12~3,8,3,11,12,11,8,9,1,12,9,10,3,2,3,2,4,11,4~10,8,8,3,12,4,3,4,11,9,3,3,2,9,10,12,1~3,1,3,4,12,10,12,9,4,11,11,9,4,2,10,8,3,11,3,9~11,3,4,3,10,12,2,12,8,11,4,8,10,4,4,9,9",
        reel_set3: "5,9,10,12,5,10,3,3,11,11,9,3,12,3,4,8,9,3~3,5,8,3,10,11,3,13,9,10,11,1,2,12,9,3,4,5,8,2~2,3,11,9,13,5,8,5,3,3,1,4,10,5,4,2,3,8,12~5,10,5,3,9,11,3,9,4,3,4,9,11,2,1,8,12~9,11,4,12,12,4,10,9,2,11,3,10,2,5,9,3,5,3,10,8"
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

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
            result["prg_m"] = player.machine.freeSpinLevel >= 3 ? "cp,lvl" : "cp,lvl,tp";

            if (player.machine.freeSpinLevel == 0) {
                result["prg"] = `${player.machine.goldSymbolCount}, ${player.machine.freeSpinLevel}, 5`
            }
            if (player.machine.freeSpinLevel == 1) {
                result["prg"] = `${player.machine.goldSymbolCount}, ${player.machine.freeSpinLevel}, 10`;
            }
            if (player.machine.freeSpinLevel == 2) {
                result["prg"] = `${player.machine.goldSymbolCount}, ${player.machine.freeSpinLevel}, 15`;
            }
            if (player.machine.freeSpinLevel >= 3) {
                result["prg"] = "15,3";
            }
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fsmore"] = player.machine.fs_more;
            result["prg_m"] = player.machine.freeSpinLevel >= 3 ? "cp,lvl" : "cp,lvl,tp";

            if (player.machine.freeSpinLevel == 0) {
                result["prg"] = `${player.machine.goldSymbolCount}, ${player.machine.freeSpinLevel}, 5`
            }
            if (player.machine.freeSpinLevel == 1) {
                result["prg"] = `${player.machine.goldSymbolCount}, ${player.machine.freeSpinLevel}, 10`;
            }
            if (player.machine.freeSpinLevel == 2) {
                result["prg"] = `${player.machine.goldSymbolCount}, ${player.machine.freeSpinLevel}, 15`;
            }
            if (player.machine.freeSpinLevel >= 3) {
                result["prg"] = "15,3";
            }

        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
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
        prg_m: "cp,lvl,tp",
        prg: "0,0,5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;


    return result;
};

module.exports = ApiManager;