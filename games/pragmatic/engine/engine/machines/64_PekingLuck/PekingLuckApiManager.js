var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,9,8,4,7,7,3,4,11,11,10,11,6,5,10",
        bgid: "0",
        sps_levels: "nff,m",
        sps_wins: "8,12,15,18,28,38,2,3,5,8,10,18",
        balance: "100,000.00",
        sps_wins_mask: "nff,nff,nff,nff,nff,nff,m,m,m,m,m,m",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "13,12,8,10,6",
        def_sa: "6,3,1,8,12",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~250,10,3,1,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"100000000\",max_rnd_win:\"21000\"}}",
        stime: new Date().getTime(),
        bgt: "28",
        sa: "6,3,1,8,12",
        sb: "13,12,8,10,6",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~10000,4000,500,20,0~2,2,2,2,2",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;750,125,30,2,0;500,100,25,2,0;400,80,20,0,0;300,75,15,0,0;250,60,15,0,0;200,50,10,0,0;150,40,10,0,0;125,30,5,0,0;100,30,5,0,0;100,25,5,0,0;100,25,5,2,0",
        l: "25",
        rtp: "96.50",
        reel_set0: "6,9,9,2,2,2,11,9,12,5,9,11,6,11,5,9,11,4,12,10,5,9,8,7,6,6,3,11,11,8,13,10,7,12,4,13,3,11,1,8~3,2,2,2,9,6,13,7,10,10,11,9,13,10,11,10,6,5,1,12,10,12,7,10,5,11,4,12,7,13,3,12,8,11,6,12,13,10,8,10,4,5,13,13,7,10~1,12,13,10,7,7,4,13,12,5,7,9,12,8,13,12,12,10,8,4,5,6,10,13,7,9,11,3,12,5,2,2,2,9,11,13,3,8,6,12,6,4,9,12,11,6,13,8,1~8,4,5,5,12,2,2,2,6,11,12,8,13,8,10,7,13,7,13,6,9,8,7,10,12,1,11,8,5,8,3,5,3,12,3,13,11,4,11,10,11,10,8,1,9~12,9,10,10,4,6,13,1,6,11,13,10,10,7,9,6,13,9,11,3,12,7,11,11,5,8,10,2,2,2,3,3,8,13,9,9,4,5,12,13,9,6,1,8,13,13,6,10,10,12",
        s: "6,9,8,4,7,7,3,4,11,11,10,11,6,5,10",
        reel_set1: "6,7,2,2,2,4,11,13,10,11,11,12,1,12,6,5,8,9,7,7,11,5,10,9,4,13,9,8,13,12,3,9,11,3,10,8~4,12,12,10,3,13,10,4,9,13,10,12,8,7,5,8,2,2,2,13,7,1,12,7,11,6,13,10,6,9,13,10,13,10,5,11,3,7,6,13~11,2,2,2,12,3,13,5,8,6,9,13,13,8,12,11,7,11,13,7,4,7,1,4,12,13,10,8,13,10,11,6,12,9,6,8,4,8,3,12,6,5,9,5,10~5,9,4,3,5,7,11,7,8,5,12,12,2,2,2,3,9,3,5,12,11,1,6,6,8,8,13,8,8,11,13,4,10,1,12,13,10,11,8,11,8,10,7,8,10~9,10,8,1,12,5,11,12,10,10,4,13,11,5,5,3,8,6,4,13,1,3,10,7,2,2,2,9,7,3,12,11,11,9,13,13,12,9,10,8,3,6,13,6,9,12,9,6,10,6,10,13,10"
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
        l: "25",
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

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["na"] = "b";
            result["bgid"] = 0;
            result["bgt"] = 28;
            result["bw"] = 1;
            result["end"] = 0;
            result["level"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = player.machine.freeSpinMulti;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fswin"] = (player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney) / player.machine.freeSpinMulti;
            result["w"] = player.machine.winMoney / player.machine.freeSpinMulti;
            result['n_reel_set'] = 1;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = player.machine.freeSpinMulti;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fswin_total"] = (player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney) / player.machine.freeSpinMulti;
            result["w"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result['n_reel_set'] = 0;
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        bgid: "0",
        bgt: "28",
        counter: "1",
        index: "1",
        stime: "",
        sver: "5"
    }

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;

    var cache = player.machine.selectCache;
    result["status"] = cache.status;
    result["wins_mask"] = cache.wins_mask;
    result["wins"] = cache.wins;

    if (player.machine.bonusState == 1) {
        //                                 
        result["na"] = "b";
        result["end"] = 0;
        result["level"] = 1;
    } else {
        //                                 
        result["na"] = "s";
        result["end"] = 1;
        result["level"] = 2;
        result["n_reel_set"] = 1;
        result["fs"] = player.machine.freeSpinIndex;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = player.machine.freeSpinMulti;
        result["fsres"] = 0;
        result["fswin"] = 0;
    }

    return result;
};

module.exports = ApiManager;