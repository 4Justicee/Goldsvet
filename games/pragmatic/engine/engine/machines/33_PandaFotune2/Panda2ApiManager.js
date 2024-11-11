var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,7,4,3,8,4,3,5,6,7,8,5,7,3,4",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "4,13,4,7,8",
        reel_set_size: "3",
        def_sa: "10,3,5,3,7",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~100,15,2,0,0~12,12,12,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        bg_i: "3,0,2,1,1,2,2,3,1,4,3,5,2,6,1,7,2,8,1,9,5,10,15,20,25,50,75,100,150,200,250,500,1000,2500,4998,10,5,10,15,20,25,50,75,100,150,200,250,500,1000,2500,4998,11",
        rt: "d",
        gameInfo: "{rtps:{regular:\"96.51\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"953591\",max_rnd_win:\"5000\"}}",
        wl_i: "tbm~5000",
        stime: new Date().getTime(),
        sa: "10,3,5,3,7",
        sb: "4,13,4,7,8",
        sc: "10.00,20.00,30.00,40.00,50.00,80.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "80.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "80.00",
        sver: "5",
        bg_i_mask: "pw,ic,pw,ic,pw,ic,pw,ic,pw,ic,pw,ic,pw,ic,pw,ic,pw,ic,pw,ic,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,ic,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,pw,ic",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,50,25,0,0;150,50,10,0,0;100,20,5,0,0;100,20,5,0,0;100,20,5,0,0;50,15,5,0,0;50,15,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0",
        l: "25",
        rtp: "96.51",
        s: "6,7,4,3,8,4,3,5,6,7,8,5,7,3,4",
        reel_set0: "10,6,12,4,8,12,6,12,6~7,5,11,13,3,9,3,11,13,3,11,3,9,3,11,3,5,9,11,13,5,3,9,13,11,9,3~10,13,3,9,5,6,7,4,11,8,12,9,11,3,7,3,7,11,5,11,8,11,3,11,7,8,11,3,6,9~3,7,11,6,9,8,4,12,5,13,10,11,9,13,7,6,12,6,12,7,12,5,13,9,6,9,7,11,9,6,7,6~9,3,2,1,4,5,10,13,6,7,8,11,12,11,1,4,6,12,11,1,11,12,2,1,11,3,1,11,3,1,4",
        reel_set2: "9,5,13,12,1,8,10,6,4,7,3,11,7,12,4,7,12,10,4,8,6,4,8,6,7,4,5,7,5~10,5,4,12,2,2,2,7,9,3,2,11,6,8,13,1,6,2,12,2,5,8,2,6,11,3,11,2,12,2,3,12,8,6,12,3~2,2,2,11,6,9,2,8,13,7,3,1,5,12,4,10,4,6,12,13,12,11,3,4,12,6,13,12,6,12,3,12,3,12,13,10,12,3,4,3,13~12,10,7,8,11,5,2,2,2,3,4,1,13,2,9,6,8,2,11,2,13,2,5,2,5,2,1,2,8,5,2,5~2,2,2,11,4,1,8,6,7,2,3,12,5,13,10,9,1,10,6,1,7,6,10,8,6,11,1,9,5,6,9,7,9,6,8,5,11,6,8,10,11,10,5,6,13,8,1,6,9",
        reel_set1: "1,8,11,13,4,12,7,5,9,10,6,3,6,11,7,11,6,8,6,13,5~2,2,2,7,9,10,4,13,11,12,2,8,1,6,5,3,6,1,10,7,10,12,6,8,10,12,10,11,1,9,7,6,8,7,10~2,2,2,12,6,3,7,13,4,1,11,5,8,10,2,9,6,10,12,10,9,13,12~2,2,2,2,6,8,9,12,1,13,3,11,5,7,10,4,12,7,12,3,12,8,12,7,8~11,2,10,8,13,12,3,4,1,5,7,6,9,13,8,1,9,4,10",
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
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "25",
        na: "s",
        reel_set: "1",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "3",
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.basewin;

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

    if (player.machine.goldSymbolPositions.length > 0) {
        result["gsf"] = player.machine.goldSymbolPositions;
    }

    if (player.machine.goldAlives.length > 0) {
        result["bw"] = 1;
        result["coef"] = player.betPerLine * player.machine.lineCount;
        result["end"] = 1;
        result["gsf_a"] = player.machine.goldAlives;
        var jackPotWin = player.machine.winMoney - player.machine.basewin;
        result["rw"] = jackPotWin;
        result["wp"] = player.machine.wp;
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["reel_set"] = 1;
            result['na'] = 's';
            result['psym'] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.00;
            result["fsres"] = 0.00;
        }
    } else if (prevGameMode == "FREE") {
        result["reel_set"] = 2;
        result["tw"] = player.machine.freeSpinWinMoney;
        result["w"] = player.machine.basewin;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex + 1;
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