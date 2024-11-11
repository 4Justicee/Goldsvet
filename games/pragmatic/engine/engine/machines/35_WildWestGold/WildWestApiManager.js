var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "11,5,7,7,5,1,6,9,9,6,12,11,9,9,11,12,11,5,5,11",
        apvi: "10",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "8,2,6,6,1",
        def_sa: "11,9,5,3,9",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,8,0,0~1,1,1,1,1;14~0,0,0,0,0~0,0,8,0,0~1,1,1,1,1",
        cls_s: "-1",
        gmb: "0,0,0",
        mbri: "1,2,3",
        rt: "d",
        gameInfo: `{props:{max_rnd_sim:"1",max_rnd_hr:"106382978",max_rnd_win:"4500"}}`,
        wl_i: "tbm~10000",
        apti: "bet_mul",
        stime: "1635481393160",
        sa: "11,9,5,3,9",
        sb: "8,2,6,6,1",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,100,30,0,0;250,75,25,0,0;150,40,15,0,0;100,25,10,0,0;75,15,7,0,0;50,10,5,0,0;30,6,3,0,0;30,6,3,0,0;20,5,2,0,0;20,5,2,0,0;20,5,2,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.51",
        total_bet_max: "10,000,000.00",
        reel_set0: "7,11,11,1,12,12,6,8,4,10,10,5,11,11,9,9,3,13,13,5,8,12,12,1,13,13,6,10,10~7,11,11,2,12,12,6,8,4,9,9,5,13,13,3,11,11,5,8,12,12,2,13,13,6,10,10~9,7,11,11,2,13,13,6,8,4,9,9,5,10,10,1,6,8,3,11,11,5,8,12,12,2,13,13,6~7,10,10,2,12,12,6,8,11,11,4,9,9,5,6,7,3,11,11,5,6,12,12,7,13,13,6~7,10,10,1,12,12,6,8,4,9,9,5,6,7,3,11,11,5,6,13,13,7,13,13,6,10,10",
        s: "11,5,7,7,5,1,6,9,9,6,12,11,9,9,11,12,11,5,5,11",
        reel_set1: "10,5,9,9,7,10,10,8,12,12,6,13,13,8,9,9,4,9,9,5,6,8,3,3,3,3,11,11~7,10,10,2,12,12,6,8,4,9,9,5,6,3,11,11,5,6,12,12,7,13,13,2,10,10,7,4~7,10,10,2,12,12,6,8,4,9,9,5,6,3,11,11,5,6,12,12,8,13,13,2,10,10,7,4~7,10,10,2,12,12,6,8,4,9,9,5,6,7,3,11,11,5,6,12,12,7,13,13,6,10,10,7~10,10,6,12,12,8,4,9,9,5,6,7,3,3,3,3,11,11,6,12,12,7,13,13,6,10,10,7",
        purInit: `[{type:"fs",bet:2000,fs_count:8}]`,
        mbr: "1,1,1",
        total_bet_min: "200.00",
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
        c: "50.00",
        counter: "1",
        index: "1",
        l: "20",
        ls: "0",
        na: "s",
        reel_set: "0",
        stime: new Date().getTime(),
        s: "8,13,12,8,9,13,13,12,11,9,13,6,8,11,5,4,10,1,4,6",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "4",
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

    result['mbr'] = "1,1,1";
    result['mbri'] = "1,2,3";
    if (player.machine.multiPositions.length > 0) {
        result['mbp'] = player.machine.multiPositions.join();
        result['mbv'] = player.machine.multiValues.join();
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.00;
            result["fsres"] = 0.00;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 1;
        if (player.machine.maskView.length > 0) {
            result["is"] = Util.view2String(player.machine.maskView);
        }
        if (player.machine.freeSpinSticky.length > 0) {
            result["sty"] = player.machine.freeSpinSticky;
        }
        if (player.machine.scatterOverlays.length > 0) {
            result["ds"] = player.machine.scatterOverlays.join(';');
            var dsa = [], dsam = [];
            for (var i = 0; i < player.machine.scatterOverlays.length; i++) {
                dsa.push("1");
                dsam.push("v");
            }
            result["dsa"] = dsa.join(';');
            result["dsam"] = dsam.join(';');
        }
        if (player.machine.freeSpinAdd > 0) {
            result["fsmore"] = player.machine.freeSpinAdd;
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