var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '9,6,3,4,5,4,8,6,9,8,5,3,8,8,7',
        balance: '0.00',
        cfgs: '2522',
        ver: '2',
        index: '1',
        balance_cash: '0.00',
        reel_set_size: '2',
        def_sb: '7,8,2,2,2',
        def_sa: '8,5,0,5,3',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,2,0,0~0,0,6,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        bg_i: '1,2,3,4,5,6,7,8,9,10,25,50,250',
        rt: 'd',
        stime: '1646040347847',
        sa: '8,5,0,5,3',
        sb: '7,8,2,2,2',
        sc: '10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00',
        defc: '100.00',
        sh: '3',
        wilds: '2~0,0,0,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '100.00',
        sver: '5',
        n_reel_set: '0',
        bg_i_mask: 'pw,pw,pw,pw,pw,pw,pw,pw,pw,ma,ma,ma,ma',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,125,25,2,0;300,100,15,2,0;200,50,10,0,0;150,50,10,0,0;100,25,10,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0',
        l: '20',
        rtp: '94.09',
        reel_set0: '8,5,0,5,3,9,10,7,4,10,11,4,6,6,9,5~5,8,6,4,9,3,2,10,7,1,11,6,3,4,11,7,9~1,8,0,6,7,2,9,5,8,1,8,7,2,2,9,4,10,3,5,10,0,4,11,11,8,6~9,10,11,1,2,2,2,2,6,6,5,4,8,7,7,3,9,2,10,5,3,8,11,1~7,8,2,2,2,0,9,7,9,3,3,7,11,5,10,0,8,4,6,10',
        s: '9,6,3,4,5,4,8,6,9,8,5,3,8,8,7',
        reel_set1: '8,7,7,4,8,10,6,11,5,9,3,9~10,6,11,3,4,9,11,8,5,8,3,7,2,2,7~4,3,10,8,9,5,2,6,8,7,11,7,9,8,3,4,6,8,8~8,6,9,11,6,5,2,7,11,4,10,3,9,10,7~3,7,7,6,11,8,4,4,5,2,9,10,6,8',
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
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        reel_set: 0,
        stime: new Date().getTime(),
        sa: "1,2,3,4,5",
        sb: "1,2,3,4,5",
        sh: 3,
        sver: 5,   
        c: player.betPerLine,
        l: 20,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
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
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
            result["fs"] = 1; // player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            //                                 ,                    
            result["bw"] = 1;
            result["na"] = "b";
            result["lifes"] = 1;
            result["end"] = 0;
            result["level"] = 0;
            result["rw"] = 0;
            result["wp"] = 0;
            result["coef"] = player.virtualBet;
            var cache = player.machine.jackpotCache[0];
            result["wins_mask"] = cache.wins_mask.join(',');
            result["wins"] = cache.wins.join(',');
            result["status"] = cache.status.join(',');
        }
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney + player.machine.scatterWin;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fswin"] = player.machine.freeSpinWinMoney;
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["tw"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
        }
    }

    return result;
}

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
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        coef: "0.15",
        counter: "228",
        end: "0",
        index: "114",
        level: "1",
        lifes: "1",
        na: "b",
        rw: "0.00",
        status: "0,0,0,0,0,0,0,0,0,0,0,0",
        stime: "1629855874179",
        sver: "5",
        wins: "0,0,0,0,0,0,100,0,0,0,0,0",
        wins_mask: "h,h,h,h,h,h,h,h,h,h,h,h",
        wp: "0",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;

    result["coef"] = player.virtualBet;
    var level = player.machine.jackpotLevel;
    result["level"] = level;

    var cache = player.machine.jackpotCache[level];
    result["wins_mask"] = cache.wins_mask.join(',');
    result["wins"] = cache.wins.join(',');
    result["status"] = cache.status.join(',');
    result["wp"] = player.machine.jackpotMoney;
    result["rw"] = player.machine.moneyBonusWin;

    if (player.machine.currentGame == "BASE") {
        //                    
        result["na"] = "cb";
        result["lifes"] = 0;
        result["end"] = 1;
    }

    return result;
}

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
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    result["coef"] = player.virtualBet;

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    return result;
}

module.exports = ApiManager;