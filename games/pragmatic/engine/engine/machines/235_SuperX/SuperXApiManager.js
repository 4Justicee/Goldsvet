var Util = require('../../../utils/slot_utils');

function ApiManager() {

}

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "8,9,7,3,4,5,6,7,8,9,5,3,4,5,6",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "4,5,6,7,8",
        reel_set_size: "1",
        def_sa: "6,7,8,9,3",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{ante:\"96.48\",regular:\"96.56\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"279546174\",max_rnd_win:\"9000\"}}",
        wl_i: "tbm~9000;tbm_a~900",
        bl: "0",
        stime: "1649206193425",
        sa: "6,7,8,9,3",
        sb: "4,5,6,7,8",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        st: "rect",
        c: "100.00",
        sw: "5",
        sver: "5",
        bls: "20,200",
        counter: "2",
        paytable: "0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;400,150,25,0,0;300,80,20,0,0;200,50,15,0,0;100,30,10,0,0;50,15,5,0,0;20,5,2,0,0;20,5,2,0,0;20,5,2,0,0;20,5,2,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        total_bet_max: "1,000,000.00",
        reel_set0: "4,10,4,11,8,6,11,11,10,7,8,5,11,9,9,4,4,7,6,6,6,6,6,5,8,10,10,11,10,9,10,8,3,10,9,9,8,8,7,4,9,7,8,8,8,10,8,5,8,9,10,10,4,8,10,9,5,8,1,1,10,11,8,7,4,8,5,5,5,3,10,1,7,3,11,5,3,9,1,3,9,9,6,9,8,12,5,4,8,9,9,9,5,6,5,7,7,11,12,5,8,9,8,1,8,6,11,11,4,10,8,10,11,11,11,12,7,10,11,10,10,6,4,7,7,9,10,7,11,11,9,10,11,3,3,5,10,10,10,11,9,11,6,8,6,10,3,7,9,8,8,5,11,8,10,9,5,8,10,3,3,3,9,7,6,8,1,6,1,9,1,12,10,8,4,8,9,10,12,11,7,6,7,7,7,1,5,11,10,10,11,5,9,1,7,1,9,7,4,11,9,7,9,11,1,11,4,4,4,5,3,8,11,11,6,9,7,6,9,1,10,5,11,7,6,4,10,5,11,12,12,12,10,9,7,6,6,1,5,8,6,7,11,8,3,4,9,5,6,8,11,11,9,7~2,8,6,6,6,7,9,8,9,8,8,8,2,9,6,10,2,2,2,10,4,3,9,9,9,11,10,10,5,11,11,11,8,7,11,6,10,10,10,8,11,6,9,3,3,3,11,8,2,7,7,7,2,5,9,4,5,5,5,2,11,7,3,4,4,4,11,8,10,7,9~7,11,6,6,6,5,8,9,2,8,8,8,8,3,9,9,5,5,5,11,11,2,8,9,9,9,7,9,5,5,11,11,11,10,10,7,10,10,10,10,8,5,1,3,3,3,11,4,10,6,7,7,7,1,8,11,4,2,2,2,11,6,9,10,4,4,4,6,3,2,2,9~11,6,6,6,11,8,8,8,8,7,8,5,5,5,5,11,9,9,9,8,6,11,11,11,9,5,10,10,10,9,4,3,3,3,6,2,2,2,2,3,10,4,4,4,10,4,7,7,7,7,9,10~4,6,6,11,9,6,6,6,9,11,7,5,5,11,8,8,8,10,4,9,9,5,9,5,5,5,3,10,3,8,7,8,9,9,9,7,7,9,4,8,4,10,11,11,11,10,6,1,1,8,11,10,10,10,6,11,1,9,10,5,3,3,3,3,11,5,11,6,7,7,7,7,9,9,10,7,6,10,4,4,4,5,4,8,11,11,8,9,8",
        s: "8,9,7,3,4,5,6,7,8,9,5,3,4,5,6",
        total_bet_min: "10.00",
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
        tw: "0.00",
        balance: "95,600.00",
        index: "5",
        balance_cash: "95,600.00",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        bl: "0",
        stime: "1649206211778",
        sa: "10,9,11,11,11",
        sb: "6,5,6,10,3",
        sh: "3",
        st: "rect",
        c: "100.00",
        sw: "5",
        sver: "5",
        counter: "10",
        l: "20",
        s: "10,9,11,6,11,6,5,6,6,3,6,5,6,6,3",
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
    result["bl"] = player.machine.bl == true ? 1 : 0;

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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = "0.00";
            result["fsres"] = "0.00";
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 2;

        if (player.machine.isFreeSpinAdd) {
            result["fsmore"] = 10;
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
        balance: "100,700.00",
        index: "3",
        balance_cash: "100,700.00",
        balance_bonus: "0.00",
        na: "s",
        stime: "1644495957672",
        sver: "5",
        counter: "6",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

module.exports = ApiManager;