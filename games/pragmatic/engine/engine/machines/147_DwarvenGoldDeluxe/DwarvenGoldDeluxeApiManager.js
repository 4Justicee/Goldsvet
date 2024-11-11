var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "12,7,11,10,8,9,8,5,6,7,8,6,12,11,9",
        balance: "0.00",
        cfgs: "2708",
        reel1: "10,7,6,4,9,5,12,1,8,3,3,3,3,11,2",
        ver: "2",
        reel0: "10,4,6,12,3,3,3,3,3,9,11,8,5,7",
        index: "1",
        balance_cash: "0.00",
        def_sb: "3,3,3,7,8",
        def_sa: "10,4,6,12,3",
        reel3: "9,10,6,5,1,3,3,3,12,11,3,8,7,2,4",
        reel2: "5,4,10,3,3,3,8,3,6,11,12,7,2,9,1",
        reel4: "3,3,3,7,8,11,3,6,2,9,5,10,12,4",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~7,7,7,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646042339218",
        sa: "10,4,6,12,3",
        sb: "3,3,3,7,8",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,4000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,200,75,0,0;400,120,25,0,0;300,80,20,0,0;300,80,20,0,0;300,80,20,0,0;150,50,10,0,0;100,25,5,0,0;100,25,5,0,0;50,10,2,0,0;50,10,2,0,0",
        l: "25",
        rtp: "94.41",
        s: "12,7,11,10,8,9,8,5,6,7,8,6,12,11,9",
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
        sh: "3",
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