var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "12,7,3,11,3,7,9,3,5,3,5,1,4,6,3,6,8,12,10,3",
        balance: "0.00",
        cfgs: "2736",
        reel1: "8,3,3,3,3,3,3,6,4,3,1,11,10,7,3,5,2,12,9",
        ver: "2",
        reel0: "3,3,3,3,3,3,3,6,3,7,10,7,12,4,3,11,8,5,9",
        index: "1",
        balance_cash: "0.00",
        def_sb: "7,11,4,6,3",
        def_sa: "12,5,7,6,7",
        reel3: "4,3,3,3,3,7,9,3,10,5,1,6,12,2,11,8,3",
        reel2: "3,3,3,3,3,3,3,11,1,10,5,4,12,3,7,8,2,6,9",
        reel4: "3,3,3,3,8,12,9,5,3,11,7,3,6,4,3,10",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~2,2,2,0,0~6,6,6,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646042899810",
        sa: "12,5,7,6,7",
        sb: "7,11,4,6,3",
        sc: "4.00,10.00,20.00,30.00,40.00,50.00,100.00,250.00,500.00,1000.00,2000.00",
        defc: "40.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "40.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;800,200,50,10,0;400,120,25,0,0;300,80,20,0,0;300,80,20,0,0;300,80,20,0,0;150,50,10,0,0;100,25,5,0,0;100,25,5,0,0;50,10,2,0,0;50,10,2,0,0",
        l: "50",
        rtp: "94.00",
        s: "12,7,3,11,3,7,9,3,5,3,5,1,4,6,3,6,8,12,10,3",
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
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: "4",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "50",
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
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["na"] = "s";
            result["n_reel0"] = `rl~${player.machine.freeReels[0].join(',')}`;
            result["n_reel1"] = `rl~${player.machine.freeReels[1].join(',')}`;
            result["n_reel2"] = `rl~${player.machine.freeReels[2].join(',')}`;
            result["n_reel3"] = `rl~${player.machine.freeReels[3].join(',')}`;
            result["n_reel4"] = `rl~${player.machine.freeReels[4].join(',')}`;
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel0"] = `rl~${player.machine.freeReels[0].join(',')}`;
        result["n_reel1"] = `rl~${player.machine.freeReels[1].join(',')}`;
        result["n_reel2"] = `rl~${player.machine.freeReels[2].join(',')}`;
        result["n_reel3"] = `rl~${player.machine.freeReels[3].join(',')}`;
        result["n_reel4"] = `rl~${player.machine.freeReels[4].join(',')}`;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            if (player.machine.freeSpinMore > 0) {
                result["fsmore"] = player.machine.freeSpinMore;
            }
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["w"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
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