var Util = require("../../../utils/slot_utils");

function ApiManager() { };

var freeReels = [
    [3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
    [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
    [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 4, 12, 11, 5, 6, 10, 7, 9, 8],
    [2, 2, 3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 1, 8, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8],
    [3, 3, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8, 3, 3, 3, 3, 4, 12, 11, 5, 6, 10, 7, 9, 8],
];

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "12,7,3,11,3,7,9,3,5,3,5,1,4,6,3,6,8,12,10,3",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "9,2,5,10,3,3,3,3,3,3,3,12,6,8,7,1,4,11",
        ver: "2",
        reel0: "6,3,3,3,3,3,3,3,7,7,11,3,10,4,5,9,8,3,12",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "4,3,3,3,3",
        def_sa: "10,12,3,3,3",
        reel3: "12,3,3,3,3,7,4,1,5,2,3,10,9,11,6,3,8",
        reel2: "4,12,11,1,10,9,3,3,3,3,3,3,3,6,5,7,3,8,2",
        reel4: "10,12,9,7,3,3,3,3,4,8,5,3,3,11,6",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~2,2,2,0,0~6,6,6,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1647336947506",
        sa: "10,12,3,3,3",
        sb: "4,3,3,3,3",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "50.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "50.00",
        sver: "5",
        counter: "2",
        paytable:
            "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;800,200,50,10,0;400,120,25,0,0;300,80,20,0,0;300,80,20,0,0;300,80,20,0,0;150,50,10,0,0;100,25,5,0,0;100,25,5,0,0;50,10,2,0,0;50,10,2,0,0",
        l: "50",
        rtp: "95.19",
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

    if (player.betPerLine > 0) {
        result["c"] = player.betPerLine;
        result["defc"] = player.betPerLine;
    }
    return result;
};

ApiManager.prototype.GameApi = function (player, prevGameMode, param) {
    var result = {
        tw: player.machine.winMoney,
        balance: player.balance,
        index: param.index,
        balance_cash: player.balance,
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "4",
        c: player.betPerLine,
        sver: "5",
        counter: ++param.counter,
        l: "50",
        s: Util.view2String(player.machine.view),
        w: player.machine.winMoney,
    };

    //                                           
    if (player.machine.winMoney > 0) {
        result["na"] = "c";
    }

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }


    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0;
            result["fsres"] = 0;
            result['psym'] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
            result["tw"] = player.machine.totalWin;

            result["n_reel0"] = `rl~${freeReels[0].join()}`;
            result["n_reel1"] = `rl~${freeReels[1].join()}`;
            result["n_reel2"] = `rl~${freeReels[2].join()}`;
            result["n_reel3"] = `rl~${freeReels[3].join()}`;
            result["n_reel4"] = `rl~${freeReels[4].join()}`;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.totalWin;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            if (player.machine.freeSpinMore != 0) {
                result["fsmore"] = player.machine.freeSpinMore;
            }

            var reels = [];
            for (var i = 0; i < freeReels.length; i++) {
                reels[i] = [...freeReels[i]];
            }
            for (var i = 0; i < player.machine.freeSpinIndex - 1; i++) {
                reels[1].unshift(2);
                reels[2].unshift(2);
                reels[3].unshift(2);
            }
            result["n_reel0"] = `rl~${reels[0].join()}`;
            result["n_reel1"] = `rl~${reels[1].join()}`;
            result["n_reel2"] = `rl~${reels[2].join()}`;
            result["n_reel3"] = `rl~${reels[3].join()}`;
            result["n_reel4"] = `rl~${reels[4].join()}`;
        } else if (player.machine.currentGame == "BASE") {         //player.machine.freeSpinEnd == true ||
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;

            var reels = [];
            for (var i = 0; i < freeReels.length; i++) {
                reels[i] = [...freeReels[i]];
            }
            // reels[1].shift(); reels[2].shift(); reels[3].shift();

            for (var i = 0; i < player.machine.freeSpinIndex - 1; i++) {
                reels[1].unshift(2);
                reels[2].unshift(2);
                reels[3].unshift(2);
            }

            result["n_reel0"] = `rl~${reels[0].join()}`;
            result["n_reel1"] = `rl~${reels[1].join()}`;
            result["n_reel2"] = `rl~${reels[2].join()}`;
            result["n_reel3"] = `rl~${reels[3].join()}`;
            result["n_reel4"] = `rl~${reels[4].join()}`;

            // var time1, time2, time;
            // time1 = new Date().getTime();
            // while (true) {
            //   time2 = new Date().getTime();

            //   time = time2 - time1;

            //   if (time > 3000) {
            //     break;
            //   }
            // }

        }
    }

    // console.log(result);

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

module.exports = ApiManager;
