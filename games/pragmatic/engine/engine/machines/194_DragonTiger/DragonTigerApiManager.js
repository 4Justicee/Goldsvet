var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "9,12,13,9,9,4,5,7,4,7,11,8,13,10,13,13,5,3,4,7",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "10,9,3,13,5",
        reel_set_size: "2",
        def_sa: "10,8,6,5,5",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~20,10,2,0,0~20,15,8,0,0~1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{props:{max_rnd_sim:"1",max_rnd_hr:"90909090",max_rnd_win:"5000"}}',
        stime: "1647586970702",
        sa: "10,8,6,5,5",
        sb: "10,9,3,13,5",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;150,50,25,5,0;75,50,25,0,0;75,50,25,0,0;60,40,10,0,0;60,40,10,0,0;50,25,5,0,0;50,25,5,0,0;50,10,3,0,0;50,10,3,0,0;50,5,2,0,0;50,5,2,1,0",
        l: "20",
        rtp: "96.50",
        reel_set0: "10,3,3,3,9,11,3,3,10,3,3,12,10,9,6,11,13,10,4,9,11,5,10,7,10,11,10,9,11,10,9,10,9,6,10,9,11,1,8,10,9,4,11,12,10,7~6,12,5,8,7,13,5,12,2,10,5,12,6,8,5,12,5,11,12,2,4,8,12,5,3,3,3,8,5,9,12,5,13,12,3,3,5,9,5,12,11,5,12,7,8,5,9,1,12,5,11,5~5,13,6,11,7,13,2,8,5,12,6,13,7,13,3,3,11,6,12,7,3,3,3,8,5,12,4,1,3,13,11,6,13,7,8,13,12,2,8,4,13,5,9,13,8,5,13,11,5,8,12,9,6,13,8,1,9,7,13,4,10,5,13,6,8,7,10,7~7,12,6,9,3,3,3,10,3,3,8,3,3,3,10,11,9,5,10,4,11,7,9,6,3,10,2,10,6,9,1,5,10,4,6,10,6,4,13,7,9,7,6,10,7,8,6,11,7,9,4,2,10,13~5,9,7,13,7,5,12,7,9,4,9,4,5,11,7,12,1,10,7,9,4,3,3,3,7,12,5,8,4,10,3,7,9,4,13,5,4,8,6,10,7,9,4,9,4,10,7,9,4,10,7,9,1,10,7,9,4,13",
        s: "9,12,13,9,9,4,5,7,4,7,11,8,13,10,13,13,5,3,4,7",
        t: "243",
        reel_set1: "10,3,3,3,9,11,3,3,10,3,3,12,10,9,10,9,5,11,10,13,9,10,9,6,10,9,11,1,8,10,9,4,11,12,10,7~6,12,5,8,7,13,5,4,12,2,10,5,12,6,8,9,3,3,12,4,5,13,12,5,9,3,3,3,5,12,11,5,12,7,8,5,9,1,12,5,11,5~5,13,6,11,7,13,3,3,3,4,8,5,12,6,13,7,13,11,6,3,13,7,8,13,12,2,8,13,5,9,8,5,3,3,13,11,5,8,12,2,9,6,13,8,1,9,7,13,4,10,5,13,6,8,7,10,7~7,12,6,9,3,3,3,10,3,3,8,3,3,3,2,10,6,9,1,5,10,3,4,6,10,6,4,13,7,9,7,6,10,7,8,6,11,7,9,4,2,10,13~5,9,7,13,7,5,12,7,9,4,9,4,5,11,4,10,3,7,9,4,13,5,4,8,6,10,7,9,4,9,3,3,3,4,10,7,9,4,10,7,9,1,10,7,9,4,13",
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
        balance: 0,
        index: 1,
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        reel_set: 0,
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 4,
        sver: 5,
        c: player.betPerLine,
        counter: 1,
        l: 20, // ----------------                                 
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

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["reel_set"] = 0;
            result["na"] = "s";
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.wildPosition.length > 0) {
            result["gwm"] = player.machine.freeSpinMulti;
            result["wdrm_m"] = "s~p~m";
            result["wdrm_v"] = `2~${player.machine.wildPosition[0]}~${player.machine.freeSpinMulti}`;
        }

        if (player.machine.freeSpinMore > 0) {
            result["fsmore"] = player.machine.freeSpinMore;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["reel_set"] = 1;
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
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
