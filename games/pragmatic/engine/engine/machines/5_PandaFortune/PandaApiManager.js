var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: "14",
        def_s: "6,7,4,3,8,9,3,5,6,7,8,5,7,3,9",
        msr: "2",
        balance: "100,000,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000,000.00",
        reel_set_size: "2",
        def_sb: "10,3,2,2,2",
        def_sa: "6,10,5,8,10",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~100,15,2,0,0~15,10,8,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        bg_i: "800,0,200,1,25,2",
        rt: "d",
        stime: new Date().getTime(),
        sa: "6,10,5,8,10",
        sb: "10,3,2,2,2",
        //sc: "0.01,0.02,0.05,0.10,0.25,0.50,1.00,3.00,5.00",
        sc: "10.00,20.00,40.00,60.00,80.00,100.00,200.00,400.00,800.00,1000.00,2000.00,3000.00,4000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        bg_i_mask: "pw,ic,pw,ic,pw,ic",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,50,25,0,0;150,50,10,0,0;100,20,5,0,0;100,20,5,0,0;100,20,5,0,0;50,15,5,0,0;50,15,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.17",
        reel_set0: "11,6,13,8,8,9,1,4,10,3,10,9,6,12,13,5,11,5,7,12~7,3,7,11,13,10,12,6,2,2,2,4,8,1,9,7,5,2,12,4~6,7,3,11,9,1,9,9,12,4,5,2,2,2,2,2,13,8,6,4,11,10~10,2,2,2,2,4,2,8,13,10,7,6,13,2,8,11,11,13,4,12,5,10,1,3,12,9~10,12,2,2,2,2,2,2,2,2,4,5,10,8,13,8,6,9,1,9,11,11,2,3,1,3,7,12",
        s: "6,7,4,3,8,9,3,5,6,7,8,5,7,3,9",
        reel_set1: "6,12,8,1,7,8,11,10,10,12,9,11,3,9,5,4,5,13~7,9,13,10,2,2,2,2,2,14,14,14,14,14,6,7,11,12,5,12,3,14,8,1,2,4,14,4,14,2~2,2,2,2,2,2,2,1,2,6,2,14,14,14,4,8,9,14,2,4,11,13,12,11,10,9,2,5,2,3,2,7,2,6,9,14,7~9,13,6,10,10,2,2,2,2,2,2,2,14,14,14,14,14,14,14,14,14,14,14,14,11,14,14,12,13,12,2,14,4,5,3,14,11,2,8,13,4,14,10,1,1,7~8,10,1,3,9,2,2,2,2,2,2,2,14,14,14,14,14,14,14,14,2,2,3,10,5,12,4,1,2,9,8,13,6,12,11,2,7,14,14"
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
        balance_bonus: "0",
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "25",
        stime: new Date().getTime(),
        s: player.machine.view.join(),
        sa: player.machine.virtualReels.above.join(),
        sb: player.machine.virtualReels.below.join(),
        sh: "3",
        sver: "5",
        w: player.machine.baseWin
    };

    // GLobal API
    result["msr"] = player.machine.mysterySymbol;

    for (var i = 0; i < player.machine.winLines.length; i++) {

        result[`l${i}`] = player.machine.winLines[i];
    }

    if (player.machine.maskView.length > 0) {

        result["is"] = player.machine.maskView.join();
    }

    if (player.machine.goldPositiosForApi.length > 0) {

        result["gsf"] = player.machine.goldPositiosForApi.join(';');
    }

    if (player.machine.jackpotMoney > 0) {

        result["coef"] = param.c * param.l;
        result["rw"] = player.machine.jackpotMoneyInfo;
        result["wp"] = player.machine.jackpotMultiInfo;
        result["gsf_a"] = player.machine.jackpotSymbolInfo.join(';');
        result["bw"] = 1;
        result["end"] = 1;
    }

    // Special API
    if (player.machine.prevGameMode == "BASE") {

        if (player.machine.currentGame == "BASE") {

            result["n_reel_set"] = 0;
            result["tw"] = player.machine.winMoney;

            if (player.machine.winMoney > 0) {
                result["na"] = "c";
            } else {
                result["na"] = "s";
            }

        } else if (player.machine.currentGame == "FREE") {

            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;

            result["n_reel_set"] = 1;

            result["tw"] = player.machine.winMoney;
            result["na"] = "s";
            if (player.machine.scatterWin > 0) {
                result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
                result["fsmore"] = 5;
            }
        }

    } else if (player.machine.prevGameMode == "FREE") {
        if (player.machine.scatterWin > 0) {
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
            result["fsmore"] = 5;
        }

        if (player.machine.currentGame == "FREE") {

            result["fs"] = player.machine.freeSpinIndex + 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.beforeFreeSpinWinMoney;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.beforeFreeSpinWinMoney;
            result["n_reel_set"] = 1;
            result["na"] = "s";
            result["tw"] = player.machine.freeSpinWinMoney;

        } else if (player.machine.currentGame == "BASE") {

            result["fs_total"] = player.machine.freeSpinIndex;
            result["fsmul_total"] = 1;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.beforeFreeSpinWinMoney;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.beforeFreeSpinWinMoney;

            result["n_reel_set"] = 0;
            if (player.machine.freeSpinWinMoney > 0) {
                result["na"] = "c";
            } else {
                result["na"] = "s";
            }

            result["tw"] = player.machine.freeSpinWinMoney;
        }
    }

    return result;
}

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
}

module.exports = ApiManager;