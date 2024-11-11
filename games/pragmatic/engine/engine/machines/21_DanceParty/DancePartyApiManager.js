var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bonuses: "0",
        c: "100.00",
        cfgs: "2813",
        counter: "2",
        def_s: "5,3,4,3,7,6,2,4,9,2,5,3,4,3,6",
        def_sa: "10,4,7,11,9",
        def_sb: "6,5,9,7,10",
        defc: "100.00",
        fsbonus: "",
        gameInfo: `{props:{max_rnd_sim:"1",max_rnd_hr:"100000000",max_rnd_win:"8500"}}`,
        gmb: "0,0,0",
        index: "1",
        l: "20",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;150,60,30,0,0;120,60,20,0,0;100,40,16,0,0;80,30,10,0,0;50,10,6,0,0;50,10,6,0,0;40,8,4,0,0;40,8,4,0,0",
        reel_set_size: 2,
        reel_set: "0",
        reel_set0: "3,3,3,9,9,9,1,4,4,4,7,7,7,1,7,5,5,5,8,8,8,6,9,8,6,10,10,10,10,10,1,9,9,5,3,4,6,6,6~9,9,9,4,4,4,5,5,5,4,3,3,3,10,10,10,10,7,7,7,8,8,8,6,6,6,5,1,2,2,2,9,7,8,7,6,9,1,5,5,5~7,7,7,1,2,2,2,9,9,9,10,10,10,2,8,8,8,5,9,3,3,3,3,6,6,6,10,7,4,4,4,1,5,8,5,5,5~4,4,4,6,6,6,8,8,8,3,3,3,10,10,10,3,7,7,7,10,8,5,5,5,7,9,9,9,7,10,6,8,1,2,2,2,9~1,1,1,2,2,2,10,10,10,10,3,3,3,4,4,4,1,3,5,5,5,6,6,6,3,9,9,9,2,4,6,4,7,7,1,8,8,8,7,5,7,7,7",
        reel_set1: "6,6,6,4,4,4,9,9,9,9,8,8,8,10,10,10,9,8,8,10,7,7,7,1,10,7,3,3,3,5,5,5,4,3,7,1~6,6,6,6,4,4,4,5,5,5,6,8,10,10,10,1,2,7,7,7,4,3,3,3,4,3,1,5,9,9,9,3,8,8,8~10,10,10,9,9,9,7,7,7,6,8,8,8,3,9,1,5,8,4,3,5,2,10,6,4,7,7,9~4,4,4,9,9,9,10,10,10,7,7,7,6,6,6,6,3,3,3,2,8,8,8,1,5,5,5,5,10,3,9~7,7,7,1,10,10,10,10,2,7,9,9,9,6,6,6,9,8,8,8,4,4,4,7,3,3,3,6,5,5,5,6",
        rt: "d",
        rtp: "96.06",
        s: "5,3,4,3,7,6,2,4,9,2,5,3,4,3,6",
        sa: "10,4,7,11,9",
        sb: "6,5,9,7,10",
        sc: "10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00",
        scatters: "1~0,0,0,0,0,0,0,0,0,0,0,0,0,0,0~0,0,0,0,0,0,0,0,15,15,15,0,0,0,0~1,1,1,1,1,1,1,1,1,1,1,1,1,1,1",
        sh: "3",
        stime: "1629939208592",
        sver: "5",
        t: "243",
        ver: "2",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
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
        balance_bonus: "0",
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "20",
        reel_set: "0",
        na: "s",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "3",
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["apt"] = "fs_inc_mul";
            result["apv"] = player.machine.freeSpinMultiAdd;
            result["apwa"] = "0.00";
            result["fs"] = 1;
            result["fslim"] = 60;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = "0.00";
            result["fsres"] = "0.00";
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["fslim"] = 60;
        result["apt"] = "fs_inc_mul";
        result["apv"] = player.machine.freeSpinMultiAdd;
        result["apwa"] = "0.00";
        result["gwm"] = player.machine.freeSpinMulti;
        result["reel_set"] = 1;

        if (player.machine.isFreeSpinAdd) {
            result["fsmore"] = 10;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex + 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machinefreeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machinefreeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["apt"] = "fs_inc_mul";
            result["apv"] = `${player.machine.freeSpinMultiAdd}`;
            result["apwa"] = "0.00";
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machinefreeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machinefreeSpinBeforeMoney;
            result["w"] = player.machine.freeSpinWinMoney;
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
