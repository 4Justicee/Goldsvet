var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bl: "0",
        bls: "25,35",
        bonuses: "0",
        c: "100.00",
        cfgs: "4209",
        counter: "2",
        def_s: "5,8,7,9,8,8,7,3,4,4,11,6,8,11,10",
        def_sa: "8,8,9,10,11",
        def_sb: "5,7,10,3,3",
        defc: "100.00",
        fsbonus: "",
        gameInfo: `{rtps:{ante:"96.53",purchase:"96.49",regular:"96.56"},props:{max_rnd_sim:"1",max_rnd_hr:"1000000",max_rnd_win:"5000",max_rnd_win_a:"5000"}}`,
        gmb: "0,0,0",
        index: "1",
        l: "25",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;750,150,50,0,0;500,100,35,0,0;300,60,25,0,0;200,40,20,0,0;150,25,12,0,0;100,20,8,0,0;50,10,5,0,0;50,10,5,0,0;25,5,2,0,0;25,5,2,0,0;25,5,2,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        purInit: `[{type:"fsbl",bet:2500,bet_level:0}]`,
        reel_set_size: 4,
        reel_set: "0",
        reel_set0: "8,7,12,9,3,5,6,10,13,11,4,2,1,6,11,9,1,9,3,9,7,9,4,5,6,1,9,4,13,6,12,7,13,4,11,7,5,9,7,5,13,4,9,13,4,9,12,4,12,11,6,7,1,7,6,12,11,9,12,3,11,4,7,9~3,13,8,7,6,2,10,9,11,5,4,12,9,6,9~1,3,13,12,2,11,7,10,9,5,4,6,8,13,8,6,5,8,5,6,8,13,10,5,10,13,6,10,7,10,8,5,13,2,5,10,3,10,8,7,13,2,7,8,11,10,5,10,12,5~6,3,12,7,13,9,11,5,8,2,4,10,12,8,12,8,13,4,8,11,4,9,12,4,12~10,5,12,9,6,7,1,2,8,11,13,3,4,11,1,11,7,1,11,5,1,7,4,1,7,11,8,11,6,7,1,11,1,6,7,9,6,13,6,7,1,5,11,7,11,1,9,12,11,8,9,13,3,13,11,7,5,7,11,1,9,8",
        reel_set1: "3,3,3,8,3,13,6,12,11,5,7,9,4,10,13,10,5,8,12,7,12,9,4,13,11,9,11,13,9,11,4,12,7,13,5,9,11,7,13,8,12,4,11~11,13,7,8,3,12,9,5,6,4,10,5,10,7,10,4,3,10,8,10,4,12,10,12,9,10,12,5,10,4,10,4,3,13,10,7,10~5,8,9,3,12,6,13,4,10,7,11,8,12,6,7,6,11,12~8,9,12,11,3,13,10,6,7,5,4,3,7,5,3,9,3,4,5,3,13,6,9,3,4,5,6,9,5,13,9,7~12,6,13,8,5,3,7,10,3,3,3,9,11,4,8,4,3,8,13,3,4,11,13,3,13,11,5,13,5,11,10,3,10,7,8,6,5,11,3,5,11,5,3,5,8,5,3,13,7,5,6,11,10,5,3,4,13,11,4,8,7,10",
        reel_set2: "6,8,13,9,11,5,3,5,9,3,11,9,5,8,11,8,11,9,11,5,9,13,11,5,11,8,11,5,1~12,7,10,4,10~3,13,9,5,6,8,11,6,8,13,1~4,10,12,7,10~8,3,6,13,9,5,11,5,1",
        reel_set3: "6,13,9,7,11,5,3,4,1,12,2,10,8,10,2,7,4,10,4,7,5,10,4,2,4,8,2,11,10,4,3,4,8,1,8,12,10,11,10,7,2,4,7,9,8,7,10,1,4,1,3,8,4,1,8,2,7,10,8,2,4,10,2,4,2,4~9,8,11,3,2,12,6,7,13,10,4,5,11,5,10,11,7,8,6,2,7,5,4,7,11,4,10,4,6~5,6,11,2,8,7,13,9,10,1,4,3,12,11,6,10,8,7,3,4,8,11,6,7,10,13,3,9,1,8,6,7,6,2,13,9,11,6,7,13,6,13,6,7,6,1,10,6,7,10,13,6,13,6,2,7,3,7,3,6,13,7,1,6,2,8,7,10,8,13,10,13,9~3,2,6,11,7,12,10,8,9,13,4,5,12,9,6,10,9,11,4,7,11,9,13,4,7,11,12,13,10,11,13,12,11,7,13,6,12,10,9,12,9,12,13,4,11,12,11,7,4,6,9,12,7,12,10,12,8,10,12,9,12,13,4,7,12,11,12,2,4,12~11,13,10,7,9,3,12,1,2,6,5,8,4,6",
        rt: "d",
        rtp: "96.06",
        s: "7,9,13,6,6,9,10,6,12,12,11,5,4,9,10",
        // s: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
        sa: "8,8,9,10,11",
        sb: "5,7,10,3,3",
        sc: "10.00,20.00,30.00,40.00,50.00,80.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        scatters: "1~0,0,3,0,0~0,0,0,0,0~1,1,1,1,1",
        sh: "3",
        stime: "1629939208592",
        sver: "5",
        total_bet_max: "12,500,000.00",
        total_bet_min: "10.00",
        ver: "2",
        wilds: "2~1000,250,50,0,0~1,1,1,1,1,1;14~1000,250,50,0,0~1,1,1,1,1,1;15~1000,250,50,0,0~1,1,1,1,1,1;16~1000,250,50,0,0~1,1,1,1,1,1",
        wl_i: "tbm~5000"
    };

    // API          
    result["stime"] = new Date().getTime();

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
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bl: "0",
        c: "100.00",
        counter: "1",
        index: "1",
        l: "25",
        ls: "0",
        na: "s",
        reel_set: "0",
        stime: new Date().getTime(),
        s: "14,6,4,11,8,9,7,6,9,10,8,11,7,5,4",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "3",
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    result["s"] = Util.view2String(player.machine.view);
    result["c"] = player.betPerLine;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.multiPositions.length > 0) {
        result["slm_mp"] = player.machine.multiPositions.join();
        result["slm_mv"] = player.machine.multiValues.join();
    }

    if (player.machine.lineMultiIndex.length > 0) {
        result["slm_lmi"] = player.machine.lineMultiIndex.join();
        result["slm_lmv"] = player.machine.lineMultiValues.join();
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["trail"] = `fs_counts~${player.machine.freeSpinCountArr.join()}`;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.00;
            result["fsres"] = 0.00;
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition.join()}`;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 1;
        if (player.machine.freeSpinSticky.length > 0) {
            result["sty"] = player.machine.freeSpinSticky;
        }
        if (player.machine.maskView.length > 0) {
            result["is"] = Util.view2String(player.machine.maskView);
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
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