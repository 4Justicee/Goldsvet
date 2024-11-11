var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "5,8,7,3,8,10,11,3,8,3,11,7,8,5,9",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "4",
        def_sb: "7,2,2,2,2",
        def_sa: "8,6,10,9,6",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,2,0,0~5,5,5,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: new Date().getTime(),
        sa: "8,6,10,9,6",
        sb: "7,2,2,2,2",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;12~0,0,0,0,0~1,1,1,1,1;13~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;150,75,10,0,0;125,50,5,0,0;100,25,5,0,0;100,25,5,0,0;75,20,5,0,0;50,20,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.05",
        reel_set0: "8,6,10,9,6,5,11,6,4,9,10,11,10,5,11,7,11,5,3~7,8,4,1,11,10,7,4,9,8,2,2,2,2,2,5,7,3,5,1,6,9,2,11,4,8,8~8,3,7,9,7,6,1,7,8,7,10,3,1,4,11,2,2,2,2,2,2,2,4,11,5,4~8,1,11,7,11,1,5,10,2,2,2,2,3,9,4,2,9,3,6,7,2~7,2,2,2,2,2,2,2,2,2,7,7,4,5,7,4,3,9,6,2,2,3,11,11,13,2,2,8,4,6,9,3,10,8,10,11,6,7,5,5,8,8,9,5,10,7,4,6,4,10,9",
        s: "5,8,7,3,8,10,11,3,8,3,11,7,8,5,9",
        reel_set2: "8,9,6,10,9,4,10,7,5,5,11,7,3,8,8,4,6,9,9,6,11,10~11,1,7,5,4,11,4,11,8,4,7,11,2,2,1,9,3,3,10,9,6,2,2,5~7,3,5,2,2,11,2,2,11,9,10,4,4,6,3,3,8,1,11,5,7,1,7~2,11,5,6,8,9,3,7,3,7,6,11,10,8,10,2,2,4,9,1~9,4,4,2,2,7,10,2,2,4,10,10,11,5,7,8,4,7,9,3,11,5,13,8,9,9,6,10,7,6,7,8,7,6,3,11,11,2,2,5,3",
        reel_set1: "6,3,9,5,6,10,4,7,11,8,6,9,5,3,11,11,9,10,5,5~12,12,3,6,5,2,2,2,2,2,12,12,4,12,5,6,12,7,4,12,7~4,3,12,12,6,12,7,12,12,7,2,2,2,2,2,2,4,2,3,7,12,3,7,4,5~4,6,2,2,2,2,7,3,5,12,7,6,12,2,12,12,4,2~12,12,6,4,6,5,6,2,2,2,2,2,2,12,12,2,4,7,3,2,12,12,7,2,3,2,5,7,5,3,7,5,7,2,12,12",
        reel_set3: "11,9,7,8,6,10,10,8,7,9,5,6,3,5,9,3,11,4,4,9~12,7,12,5,5,2,2,6,12,12,3,2,2,4,7,7,4,12~2,12,4,4,2,2,12,5,7,12,12,6,7,12,4,7,2,2,3,5,3~4,6,12,12,2,2,12,3,7,12,5,7,4,2,3,12,2,12~7,12,2,12,12,2,2,4,2,7,3,12,4,7,12,3,7,12,6,12,12,3,12,5,12,2,4,4,7,2,12,12,3,6,5,7,6,12,5"
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

    if (player.machine.prevRespinStatus == "NORESPIN" && player.machine.respinStatus == "RESPIN") {
        result["na"] = "s";
        result["rs_c"] = player.machine.reSpinIndex;
        result["rs_m"] = player.machine.reSpinLength;
        result["rs_p"] = player.machine.reSpinIndex - 1;
        result["rs"] = "s~13";
    }
    if (player.machine.prevRespinStatus == "RESPIN") {
        //                    
        result["tw"] = player.machine.respinWinMoney + player.machine.reSpinBeforeMoney;
        result["rs_win"] = player.machine.respinWinMoney;
        result['reel_set'] = 1;
        if (player.machine.respinStatus == "RESPIN") {
            result["na"] = "s";
            result["rs_c"] = player.machine.reSpinIndex;
            result["rs_m"] = player.machine.reSpinLength;
            result["rs_p"] = player.machine.reSpinIndex - 1;
        } else if (player.machine.respinStatus == "NORESPIN") {
            //                               ->                       
            result["na"] = "c";
            result["rs_t"] = player.machine.reSpinLength;
        }
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") { //                                   ,                    
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fswin"] = player.machine.freeSpinWinMoney;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney + player.machine.freeSpinBeforeMoney;
        result['reel_set'] = 2;
        if (player.machine.wdrm_v != "") {
            result["wdrm_m"] = "s~p~m";
            result["wdrm_v"] = player.machine.wdrm_v;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fswin"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.freeSpinWinMoney;
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
        counter: "2"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

module.exports = ApiManager;