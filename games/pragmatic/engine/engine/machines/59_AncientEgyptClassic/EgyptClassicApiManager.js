var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        wsc: "1~bg~200,20,2,0,0~0,0,0,0,0",
        def_s: "6,7,10,4,9,5,11,1,8,3,8,4,8,10,6",
        balance: "0.00",
        cfgs: "2479",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "5,3,4,6,7",
        def_sa: "11,11,10,8,9",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646038105290",
        sa: "11,11,10,8,9",
        sb: "5,3,4,6,7",
        sc: "20.00,50.00,100.00,200.00,500.00,1000.00,3000.00,5000.00,10000.00",
        defc: "200.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;5000,1000,100,10,0;2000,400,40,5,0;750,100,25,5,0;750,100,25,5,0;150,40,5,0,0;150,40,5,0,0;150,40,5,0,0;100,25,5,0,0;100,25,5,0,0",
        l: "10",
        rtp: "95.50",
        reel_set0: "9,6,9,5,4,10,8,7,9,8,7,11,8,5,1,10,5,11,8,4,3,8~7,8,9,10,5,11,6,10,7,10,8,8,11,1,3,4,4,11,6,8,10,11~5,10,9,6,8,11,1,11,7,9,11,3,10,3,9,4,10,8,5,7,7~9,7,3,10,10,11,11,9,1,3,8,11,7,5,6,4,5,10,8,9~10,1,10,11,9,6,4,9,8,3,7,5,8,5,9,1,7,10",
        s: "6,7,10,4,9,5,11,1,8,3,8,4,8,10,6",
        reel_set1: "5,7,5,1,9,8,11,4,4,11,7,6,6,5,3,9,8,3,10,10,8~4,1,9,6,8,6,7,4,9,11,3,5,8,7,3,10,11,7,10,10~11,1,4,10,9,11,3,9,3,8,8,6,10,9,6,5,5,10,4,11,11,7~4,11,9,9,10,7,11,5,8,11,4,7,3,10,6,1,7,10~9,9,8,4,7,4,6,5,3,11,11,10,7,3,7,10,10,1,9,1,8,6",
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
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0",
        na: "s",
        n_reel_set: "0",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: "3",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "10",
        tw: player.machine.winMoney,
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
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["na"] = "m";
            result["n_reel_set"] = 0;
            result["mb"] = 0;
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel_set"] = 1;
        result["ms"] = player.machine.mysterySymbol;

        if (player.machine.expandingWinMoney > 0) {
            //                                   
            result["me"] = player.machine.expanding;
            result["mes"] = Util.view2String(player.machine.mysteryView);
            result["psym"] = `${player.machine.mysterySymbol}~${player.machine.expandingWinMoney}~${player.machine.mysteryPositions}`;
        }

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
            result["w"] = player.machine.freeSpinWinMoney;
            // result['fsend_total'] = 1;
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

ApiManager.prototype.MysteryApi = function (player, param) {
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
        ms: "11",
        n_reel_set: "1",
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["ms"] = player.machine.mysterySymbol;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fsmul"] = 1;
    result["fswin"] = 0;
    result["fsres"] = 0;

    return result;
};

module.exports = ApiManager;