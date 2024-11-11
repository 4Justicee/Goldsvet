var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,12,12,7,11,10,3,3,8,11,10,6,13,8,11,4,6,10,8,13",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "10,10,10,8,5",
        reel_set_size: "2",
        def_sa: "12,3,3,7,11",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,1,0,0~0,0,10,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"41666666\",max_rnd_win:\"2000\"}}",
        base_aw: "ap~5;ap~10;ap~15;ap~5;ap~20;ap~10;ap~25;ap~5;ap~10;ap~5;ap~10;ap~20;ap~15;ap~5;ap~25;ap~5;ap~10;ap~5;ap~10;ap~15;ap~20;ap~5;ap~10;ap~100;ap~25;ap~50;ap~5;ap~10;ap~75;ap~100;ap~15;ap~200;ap~20;ap~25;ap~5;ap~150;ap~15;ap~25;ap~50;ap~5;ap~20;ap~15;ap~25;ap~20;ap~75;ap~10;ap~15;ap~5;ap~15;ap~20",
        stime: new Date().getTime(),
        sa: "12,3,3,7,11",
        sb: "10,10,10,8,5",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,80,20,0,0;160,60,10,0,0;160,60,10,0,0;80,30,8,0,0;80,30,8,0,0;60,20,4,0,0;60,20,4,0,0;40,8,2,0,0;40,8,2,0,0;40,8,2,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.50",
        reel_set0: "10,5,9,3,7,12,12,12,12,11,7,7,7,4,1,6,8,6,6,6,8,8,8,4,8,6,8,6,8,12,4,7,4,8,12,6,9,4~3,9,5,10,4,4,4,4,7,7,7,1,5,5,5,6,3,3,3,8,7,11,12,6,6,6,2,5,8,4,6,7,5,6,4,5,1,11,6,4,5,1,8,5,8,1,12,4,7,5,1,5,7,4,5,4~11,13,2,5,10,6,9,8,7,12,1,4,3,1,13,10,7,8,3,7,10,13,6,1,6,1,13,12,10,3,12,6,7,4,7,12,13,4,13,3,12,7,12,13,1,3,1,8,12,7~5,11,11,11,3,6,8,9,9,9,4,12,12,12,7,11,10,10,10,12,9,2,10,13,12~3,4,5,12,11,11,11,13,9,2,8,11,8,8,8,7,7,7,7,10,10,10,10,6,9,9,9,6,6,6,7,6,7,9,7,6,9,6,13,8,11,6,7,11,8,7,9,13,11,6,7,9,6,7,10,6,8,10,11",
        s: "3,12,12,7,11,10,3,3,8,11,10,6,13,8,11,4,6,10,8,13",
        t: "243",
        reel_set1: "4,12,6,8,8,8,8,1,9,3,5,7,10,11,12,12,12,8,12,8,12,5,8,12,5,8,1,8,12,8,6,9,7,5,6,9,12,3,7,8~12,12,12,8,3,4,10,10,10,10,12,7,9,6,11,2,5,1,10,4,5,9,4,7,5,4,7,4,7,9,3,5,4,6,3,9,8,4,9,4,5,10,5,3,10,4,10~10,10,10,9,12,1,12,12,12,2,7,8,11,4,5,10,6,3,12,4,2,4,2,12,7,8,2,4,12,2,9,12,8,12,8,1,8,9,8,2,11,2,8,12,2,12,1,12,2,9,8,2,8,1,11,9,2,5~7,12,4,9,8,8,8,8,2,3,11,10,10,10,10,6,5,8,6,5,8,10,8,6~11,11,11,3,9,9,9,8,12,10,6,5,2,7,4,9,11,2,9,5,9,5,9,2,5,4,9,5,7",
        awt: "6rl"
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
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0",
        na: "s",
        reel_set: "0",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: "4",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "20",
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

    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
    }

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

    if (player.machine.bonusMulti > 0) {
        result["apt"] = "total_bet_mul";
        result["apv"] = player.machine.bonusMulti;
        result["apwa"] = player.machine.bonusMulti * player.virtualBet;
        result["aw"] = player.machine.bonusMultiPosition;
        result["awt"] = "6rl";
    }

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 1;

        if (player.machine.newView.length > 0) {
            result["s"] = player.machine.newView;
            result["is"] = player.machine.view;
            result["ts"] = player.machine.view;
            result["srf"] = player.machine.srf;
            result["lg"] = player.machine.lg;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsend_total"] = 1;
            result["fsmul_total"] = 1;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
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
        counter: "2"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;