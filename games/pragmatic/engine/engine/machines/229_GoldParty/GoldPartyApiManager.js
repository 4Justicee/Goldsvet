var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,4,5,6,7,8,9,10,3,4,5,6,7,8,9",
        balance: "100,000.00",
        screenOrchInit: '{type:"mini_slots"}',
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "4,5,6,7,8",
        reel_set_size: "2",
        def_sa: "4,5,6,7,8",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{rtps:{purchase:"96.50",regular:"96.50"},props:{max_rnd_sim:"1",max_rnd_hr:"20408163",jp1:"125000",max_rnd_win:"5163",jp3:"1250",jp2:"5000",jp4:"500"}}',
        wl_i: "tbm~5163",
        stime: "1648283100849",
        sa: "4,5,6,7,8",
        sb: "4,5,6,7,8",
        sc: "10.00,20.00,30.00,40.00,50.00,80.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "80.00",
        sh: "3",
        wilds: "2~0,0,0,0,0,0,0~1,1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        st: "rect",
        c: "80.00",
        sw: "5",
        sver: "5",
        g: '{gp:{def_s:"3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3",reel_set:"1",sh:"6",st:"rect",sw:"10"}}',
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;100,40,20,5,0;50,25,15,0,0;30,20,10,0,0;30,15,5,0,0;30,15,5,0,0;25,15,5,0,0;25,15,5,0,0;20,10,5,0,0;20,10,5,0,0;15,10,5,0,0;15,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        total_bet_max: "12,500,000.00",
        reel_set0: "13,15,15,15,11,9,4,14,10,8,14,14,14,3,6,3,3,3,7,12,15,5,14,3,14,15,4,3,14,5,3,12,3,10,11,14,6,9,3,5,3,14,9,15,10,9,3,14,3,9,15,3,6,3,14,3,9,15,6,9,5,6,15,14,7,15,3,14,9,15,14,10,11,8,3,15,3,14,10,3,8,9,15,11,12,6,3,9,3,15,7,3,5,12,3,14,6,7,11,3,6,10,4,9,15,3,5,15,10,15,3,14,3,10,14,3~15,15,15,14,9,3,13,4,3,3,3,6,14,14,14,10,2,2,2,12,2,15,8,11,5,7,14,2,10,2,7,4,2,13,10,14,12,2,9,14,4,7,2,14,2,7,12,2,10,3,14,3,2,14,2,7,14,2,3,14,2,14,13,3,2,7,2,3,14,6,4,13,5,2,14,7,12,7,12,14,13,2,8,12,14,6,14,7,2,7,3,14,13,14,2~6,2,2,2,5,2,8,10,13,12,9,15,15,15,11,14,14,14,4,14,7,15,3,3,3,3,13,7,14,3,15,13,2,7,4,5,7,2,15,7,13,14,3,7,9,15,3,7,2,15,13,7,3,15,2,15,14,13,5,7,9,15,2,8,5,15,13,5,10,2,14,2,3,13,14,3,13,7,4,3,13,14,15,2,3,4,5,15,2,14,12,14,7,15,7,2,3,14,9,13,14,2,10,15,14,7,3,14,4,13,5,3,13,15,5,8,9,13,2,13,15,2,9,14,3,13,12,11,2,9,15,4,14~16,15,15,15,10,2,6,3,3,3,5,3,14,14,14,14,4,2,2,2,15,12,9,7,11,13,8,2,15,2,3,2,15,4,5,4,15,11,3,14,2,15,9,2,5,15,14,4,12,2,4,3,9~10,10,10,16,15,13,8,5,7,15,15,15,12,11,3,3,3,6,10,14,14,14,4,14,3,9,3,15,11,4,3,15,3,12,15,4,8,16,7,12,3,15,7,3,15,9,12,14,15,4,7,3,14,12,9,12,3,12,15,3,15,3,12,7,15,4,3,11,7,3,11,3,7,3,11,4,11,3,15,4,3,11,3,16,15,3,16,3,14,3,12,14,11,14,3,4,7,3,15,3,9,15,3,9,11,3,14",
        s: "3,4,5,6,7,8,9,10,3,4,5,6,7,8,9",
        reel_set1: "5,11,4,8,5,6,10,4,11,15,15,8,6,5,9,6,17,3,10,6,9,5,4,8,15,15,15,11,6,9,7,4,11,3,7,8,18,6,7,11,5,3,10,7,9,4,5,9,15,10,7,3,8",
        purInit: '[{type:"d",bet:2500}]',
        total_bet_min: "10.00",
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
        balance: 0,
        index: 1,
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        reel_set: 0,
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 3,
        sver: 5,
        c: player.betPerLine,
        counter: 1,
        l: 25, // ----------------                                 
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
        st: "rect",
        sw: 5,
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;

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
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    if (player.machine.copySymbol > -1) {
        result["trail"] = `rp~${player.machine.copySymbol}`;
    }

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
            result["g"] = Buffer.from(player.machine.freeSpinViewSTR, "base64").toString("ascii");
            result["puri"] = 0;
            result["purtr"] = 1;
            result["pw"] = player.machine.moneyTotalSum * player.betPerLine;
            result["sn_i"] = "gp";
            result["sn_mult"] = 1;
            result["sn_pd"] = 0;
            result["st"] = "rect";
            result["sw"] = 5;
        }
    } else if (prevGameMode == "FREE") {
        result["g"] = Buffer.from(player.machine.freeSpinViewSTR, "base64").toString("ascii");
        result["sn_i"] = "gp";
        result["sn_mult"] = 1;
        result["sn_pd"] = 0;
        result["st"] = "rect";
        result["sw"] = 5;
        result["puri"] = 0;

        if (player.machine.freeSpinMore > 0) {
            result["fsmore"] = player.machine.freeSpinMore;
        }

        if (Object.keys(player.machine.freeSpinMultiInfo).length > 0) {
            var multiInfo = player.machine.freeSpinMultiInfo;
            result["trail"] = `crp~${multiInfo.rand};crb~${multiInfo.prev};mp~${multiInfo.pos};cra~${multiInfo.after};mv~${multiInfo.multi}`;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["tw"] = player.machine.winMoney;
            result["w"] = player.machine.winMoney;
            result["pw"] = player.machine.moneyTotalSum * player.betPerLine;
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["pw"] = 0;
            result["tw"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.winMoney;
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
