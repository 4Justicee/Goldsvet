var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: "10~11~12~13~14~15~16",
        def_s: "3,4,5,6,7,8,9,8,7,6,5,4,3,4,5",
        balance: "0.00",
        cfgs: "3791",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "3,4,5,6,7",
        def_sa: "3,4,5,6,7",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646037866668",
        sa: "3,4,5,6,7",
        sb: "3,4,5,6,7",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,7000.00,10000.00",
        defc: "200.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;17~0,0,0,0,0~1,1,1,1,1;18~0,0,0,0,0~1,1,1,1,1;19~0,0,0,0,0~1,1,1,1,1;20~0,0,0,0,0~1,1,1,1,1;21~0,0,0,0,0~1,1,1,1,1;22~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;250,200,50,0,0;120,60,25,0,0;60,25,10,0,0;50,20,8,0,0;40,15,7,0,0;25,10,5,0,0;25,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "10",
        rtp: "94.49",
        reel_set0: "9,9,9,9,9,6,6,6,6,6,7,7,9,9,5,5,5,7,6,6,7,7,7,6,6,6,5,5,8,9,9,9,4,4,6,6,6,3,3,3,6,6,6,9,9,7,7,7,3,6,8,8,6,6,4,4,4,7,7,7,9,9,9,8,8,8,8~3,3,3,5,5,4,4,4,8,8,8,6,6,6,6,8,8,5,5,5,4,6,6,7,7,7,8,8,8,17,5,5,8,6,6,8,8,8,8,3,9,9,9,5,5,5,9,6,6,7,7,6,6,6,7,8,8,8,5~8,8,8,9,9,4,4,4,4,4,8,8,8,8,5,5,5,9,6,9,9,9,4,9,7,7,7,7,7,4,4,4,7,7,7,5,7,3,18,6,6,5,5,5,3,3,3,3,8,8,7,7,7,7,8,8,8,6,6,6,8,7,7,9,9~5,5,4,4,4,5,5,5,3,3,4,4,8,4,9,8,3,3,5,5,3,3,3,3,3,4,4,4,8,8,8,19,3,3,3,5,5,9,9,6,6,8,8,7,7,7,7,5,9,9,9,8,8,8,4,4,4,5,5,7,8,8,8~6,6,9,9,7,7,6,7,7,6,6,6,9,9,9,9,7,7,7,4,9,7,7,9,9,7,4,4,6,6,6,5,7,7,8,8,8,5,5,5,7,7,9,9,9,6,6,6,7,7,7,3,3,3,8,8,8,6,6,9,9,9",
        s: "3,4,5,6,7,8,9,8,7,6,5,4,3,4,5",
        reel_set1: "10,10,10,10,10,10,10,10,10,10,15,10,10,15,10,10,10,10,10,15,10,15,10,10,15,10,10,15,10,10,15,10,10,10,15,10,10,10,15,10,10,10,10,10,10,10,10,10,15,10,10,10,10,10,15,10,10,10,10,15,10,10,10,10,15,10,10,15,15~15,11,11,15,15,11,11,11,15,11,11,15,11,11,15,11,11,15,11,11,11,11,15,11,11,11,11,11,11,11,11,11,15,11,11,11,11,11,17,11,11,11,11,11,15,11,15,11,11,15,11,11,15,11,11,15,11,11,11,11,11,11,11,11,11,11~12,12,15,12,15,12,12,15,12,12,18,12,12,12,12,12,12,12,12,12,12,15,12,12,12,12,15,12,12,15,12,12,15,12,12,12,12,12,15,12,12,12,12,12,12,12,12,12,15,15,12,12,12,15,12,12,12,15,12,12,15,12,12,15~13,13,16,13,19,13,13,16,13,13,13,16,13,13,13,13,13,13,13,16,13,13,13,13,13,16,13,13,16,13,13,13,13,13,13,16,16,13,13,13,13,16,13,13,16,13,13,13,13,13,13,13,13,13,16,13,13,13,16,16~14,14,14,16,14,16,16,14,14,16,16,14,14,16,14,14,14,16,14,14,14,14,14,14,16,14,14,14,14,14,14,14,14,14,16,16,14,16,14,14,14,14,14,14,14,16,14,14,14,16,14,14,14,14,14,14,14,14,14,14,16,14,14,14,14,16",
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
        tw: player.machine.winMoney,
        balance: "97,920.00",
        index: "2",
        balance_cash: "97,920.00",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "4,9,7,6,3",
        sb: "9,3,7,5,6",
        sh: "3",
        c: player.betPerLine,
        sver: "5",
        counter: "4",
        l: "10",
        s: Util.view2String(player.machine.view),
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

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }

    result["na"] = nextAction;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["ep"] = player.machine.ep;
            result["is"] = Util.view2String(player.machine.maskView);
            result["srf"] = player.machine.srf;
            result["sty"] = player.machine.sticky.join("~");
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = 0;
            result["rs"] = "t";
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        result["na"] = "s";
        result["msr"] = player.machine.msr;
        result["sty"] = player.machine.sticky.join("~");
        result["is"] = Util.view2String(player.machine.maskView);
        result["rs_win"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        if (player.machine.currentGame == "FREE") {
            result["ep"] = player.machine.ep;
            result["srf"] = player.machine.srf;
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.freeSpinIndex;
            result["rs"] = "t";
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["rs_t"] = player.machine.freeSpinIndex;
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
        counter: "2",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;