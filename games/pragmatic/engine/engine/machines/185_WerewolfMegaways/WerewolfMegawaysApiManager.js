var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "10,6,11,6,9,3,5,6,7,11,9,3,4,9,7,11,4,11,4,9,11,5,15,11,15,12,11,5,15,7,15,15,10,15,15,5",
        balance: "100,000.00",
        nas: "15",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "5,4,10,9,8,10",
        reel_set_size: "9",
        def_sa: "10,10,11,6,2,9",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0,0~15,12,10,8,0,0~1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{props:{max_rnd_sim:"1",max_rnd_hr:"62500000",max_rnd_win:"8000"}}',
        stime: "1645246542880",
        sa: "10,10,11,6,2,9",
        sb: "5,4,10,9,8,10",
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,10000.00",
        defc: "200.00",
        sh: "6",
        wilds: "2~0,0,0,0,0,0~1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;100,50,25,10,5,0;50,25,10,5,0,0;25,10,5,3,0,0;20,8,4,3,0,0;15,6,3,2,0,0;10,5,3,2,0,0;10,5,3,2,0,0;5,3,2,1,0,0;5,3,2,1,0,0;5,3,2,1,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0",
        l: "10",
        rtp: "96.50",
        total_bet_max: "10,000,000.00",
        reel_set0: "3,10,10,1,8,8,8,9,9,11,7,13,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11,11~3,10,10,1,8,8,8,9,9,11,7,13,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11~3,10,10,1,8,8,9,9,11,7,13,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11,11~3,10,10,1,8,8,8,9,9,11,7,13,12,12,6,6,2,5,5,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,8,8,12,9,10,13,13,13,11,11~3,10,10,1,8,8,9,9,11,7,13,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11~3,10,10,1,8,8,9,9,11,7,13,12,12,6,6,2,5,5,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11",
        s: "10,6,11,6,9,3,5,6,7,11,9,3,4,9,7,11,4,11,4,9,11,5,15,11,15,12,11,5,15,7,15,15,10,15,15,5",
        accInit: '[{id:0,mask:"cp;tp;lvl;sc;cl"}]',
        reel_set2: "3,10,10,8,8,8,9,9,11,7,13,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11,11~3,10,10,8,8,8,9,9,11,7,13,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11,11~3,10,10,8,8,8,9,9,11,7,13,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11,11~3,10,10,8,8,8,9,9,11,7,13,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11,11~3,10,10,8,8,8,9,9,11,7,13,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11,11~3,10,10,8,8,8,9,9,11,7,13,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,13,13,6,8,4,5,10,10,10,8,8,12,9,10,13,13,13,11,11,11",
        t: "243",
        reel_set1: "3,10,10,1,8,8,8,9,9,7,7,7,13,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,4,4,7,7,12,12,12,12,13,13,6,6,6,6,5,5,5,5,10,10,10,8,8,13,13,13,11,11,11,11~3,10,10,1,8,8,8,9,9,7,7,13,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,4,4,7,7,12,12,12,12,13,13,6,6,5,5,5,5,10,10,10,8,8,13,13,13,11,11~3,10,10,1,8,8,8,9,9,7,7,7,7,13,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,4,4,7,7,12,12,13,13,6,6,6,5,5,5,5,10,10,10,8,8,13,13,13,11,11,11~3,10,10,1,8,8,8,9,7,7,7,13,12,12,6,6,2,5,5,9,9,3,3,11,11,4,4,4,4,7,7,12,12,12,12,13,13,6,6,5,5,5,5,10,10,10,8,8,13,13,13,11,11,11~3,10,10,1,8,8,9,9,7,7,7,7,13,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,4,4,7,7,12,12,12,12,13,13,6,6,5,5,5,5,10,10,10,8,8,13,13,13,11,11~3,10,10,1,8,8,8,9,9,7,7,7,7,13,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,4,4,7,7,12,12,12,12,13,13,6,6,6,5,5,5,5,10,10,10,8,8,13,13,13,11,11",
        reel_set4: "3,10,10,1,8,8,8,9,9,11,12,12,3,3,6,6,5,5,9,9,9,3,3,11,11,4,4,3,3,12,12,6,3,3,8,4,5,10,10,3,3,8,8,12,9,10,11,11~3,10,10,1,8,8,8,9,9,11,12,12,3,3,6,6,2,5,5,9,9,9,3,3,11,11,4,4,12,12,12,6,3,3,8,4,5,10,10,10,3,3,8,8,12,9,10,11,11,11~3,10,10,8,8,9,9,11,12,12,3,3,6,6,2,5,5,9,9,3,3,11,11,4,4,12,12,6,8,4,5,3,3,10,10,10,3,3,8,8,12,3,3,9,10,11,11~3,3,10,10,1,8,8,8,9,9,11,12,12,3,3,6,6,2,5,5,9,9,3,3,11,11,4,4,4,3,3,12,12,12,6,8,4,4,5,10,10,3,3,8,8,12,9,10,11,11,11~3,3,10,10,8,8,8,9,9,11,12,12,3,3,6,6,2,5,5,9,9,9,3,3,3,11,11,4,4,3,3,12,12,6,8,4,5,10,10,10,3,3,8,8,12,9,10,11,11~3,10,10,1,8,8,8,9,9,11,12,12,3,3,6,6,2,5,5,9,9,3,11,11,4,4,4,3,12,12,6,8,4,4,5,10,10,10,3,3,8,8,12,9,10,11,11",
        purInit: '[{type:"fs",bet:1000}]',
        reel_set3: "3,10,10,1,8,8,8,3,3,9,9,11,7,12,12,3,3,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,3,3,3,3,12,12,12,3,3,6,8,4,5,10,10,3,3,8,8,12,9,10,11,11~3,10,10,8,8,8,3,3,9,9,11,7,12,12,3,3,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,6,8,4,5,3,3,10,10,10,3,3,8,8,12,9,10,11,11,11~3,10,10,1,8,8,3,3,9,9,11,7,12,12,3,3,6,6,2,5,5,9,9,9,3,3,3,11,11,4,4,7,7,12,12,6,8,4,5,3,3,10,10,10,3,3,8,8,12,9,10,11,11~3,3,10,10,8,8,8,3,3,9,9,11,7,12,12,3,3,6,6,2,5,5,9,9,3,3,11,11,4,4,4,7,7,12,12,12,6,8,4,4,3,3,5,10,10,3,3,8,8,12,9,10,11,11,11~3,3,10,10,1,8,8,3,3,9,9,11,7,12,12,3,3,6,6,2,5,5,9,9,9,3,3,3,3,11,11,4,4,7,7,12,12,6,8,4,3,3,5,10,10,10,3,3,8,8,12,9,10,11,11~3,10,10,1,8,8,3,3,9,9,11,7,12,12,3,3,6,6,2,5,5,9,9,3,3,11,11,4,4,4,7,7,3,3,3,3,12,12,6,8,3,3,4,4,5,10,10,10,3,3,8,8,12,9,10,11,11",
        reel_set6: "3,10,10,1,8,8,8,3,3,9,9,11,12,9,9,9,3,3,11,11,4,4,12,8,3,3,4,10,10,3,3,8,8,12,9,10,3,3,11,11,11~3,10,10,1,8,8,8,3,3,9,9,11,12,12,2,9,9,3,3,11,11,4,4,12,12,8,4,10,10,10,3,3,8,8,12,9,10,3,3,11,11,11~3,10,10,1,8,8,8,3,3,9,9,11,12,12,2,9,9,9,3,3,11,11,4,4,12,12,8,4,10,10,10,3,3,8,8,12,9,10,3,3,11,11~3,3,10,10,1,8,8,8,3,3,9,9,11,12,12,2,9,9,3,3,11,11,4,4,4,12,12,8,4,4,10,10,3,3,8,8,12,9,10,3,3,11,11,11~3,3,10,10,1,8,8,8,3,3,9,9,12,12,12,2,9,9,9,3,3,4,4,12,12,8,4,10,10,10,3,3,8,8,12,9,3,3,10~3,10,10,1,8,8,3,3,9,9,9,4,11,12,12,12,2,9,9,3,3,11,11,11,4,4,3,3,12,12,8,4,4,10,10,10,3,3,8,8,12,9,10,3,3,11,11",
        reel_set5: "3,10,10,8,8,8,3,3,9,9,11,12,12,5,5,9,9,9,3,3,11,11,4,4,8,3,3,12,5,12,3,3,8,4,5,10,10,3,3,8,8,12,9,10,11,11~3,10,10,8,8,8,3,3,9,9,11,12,12,2,5,5,9,9,3,3,11,11,4,4,12,12,12,8,4,3,3,5,10,10,10,3,3,8,8,12,9,10,11,11~3,10,10,1,8,8,3,3,9,9,11,12,12,2,5,5,9,9,9,3,3,11,11,4,4,12,12,8,4,5,3,3,10,10,10,3,3,8,8,12,9,10,11,11~3,3,10,10,1,8,8,8,3,3,9,9,11,12,12,2,5,5,9,9,9,3,3,11,11,4,4,4,12,12,12,3,3,8,4,4,5,10,10,3,3,8,8,12,9,10,11,11,11~3,3,10,10,1,8,8,8,3,3,9,9,11,12,12,2,5,5,9,9,9,3,3,11,11,4,4,12,12,8,8,3,3,4,5,10,10,10,3,3,8,8,12,9,10,11,11~3,10,10,1,8,8,3,3,9,9,9,11,12,12,2,5,5,9,9,3,3,11,11,11,4,4,4,3,3,12,12,8,4,4,3,3,5,10,10,10,3,3,8,8,12,9,10,11,11",
        reel_set8: "3,10,10,1,8,8,8,9,9,11,7,12,12,6,6,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,6,8,4,5,10,10,10,8,8,12,9,10,11,11,11~3,10,10,1,8,8,8,9,9,11,7,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,6,8,4,5,10,10,10,8,8,12,9,10,11,11,11~3,10,10,1,8,8,8,9,9,11,7,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,6,8,4,5,10,10,10,8,8,12,9,10,11,11,11~3,10,10,1,8,8,8,9,9,11,7,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,6,8,4,5,10,10,10,8,8,12,9,10,11,11,11~3,10,10,1,8,8,8,9,9,11,7,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,6,8,4,5,10,10,10,8,8,12,9,10,11,11,11~3,10,10,1,8,8,8,9,9,11,7,12,12,6,6,2,5,5,9,9,9,3,3,11,11,4,4,7,7,12,12,12,6,8,4,5,10,10,10,8,8,12,9,10,11,11,11",
        reel_set7: "3,10,10,1,8,8,8,3,3,9,9,11,12,9,9,9,3,3,11,11,3,3,3,12,3,12,8,10,10,10,3,3,8,8,12,9,10,3,3,11,11~3,10,10,1,8,8,8,3,3,9,9,11,3,3,12,12,2,9,9,3,3,11,11,12,12,12,8,10,10,10,3,3,8,8,12,9,10,3,3,11,11,11~3,10,10,1,8,8,8,3,3,9,9,11,3,3,12,12,2,9,9,3,3,11,11,12,12,12,8,10,10,10,3,3,8,8,12,9,10,3,3,11,11~3,3,10,10,1,8,8,8,3,3,9,9,11,3,3,12,12,2,9,9,3,3,3,11,11,12,12,8,10,10,3,3,8,8,12,9,10,3,3,11,11,11~3,3,10,10,1,8,8,3,3,9,9,11,3,3,12,12,2,9,9,9,3,3,3,3,11,11,12,12,8,10,10,10,3,3,8,8,12,9,10,3,3,11,11~3,10,10,1,8,8,3,3,9,9,11,3,3,12,12,2,9,9,3,3,11,11,3,3,3,3,12,12,8,10,10,10,3,3,8,8,12,9,10,3,3,11,11",
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
        tw: "0.00",
        trail: "mode~b",
        balance: "97,920.00",
        index: "2",
        balance_cash: "97,920.00",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        stime: "1645246601811",
        sa: "11,6,8,7,4,8",
        sb: "12,9,11,11,10,4",
        sh: "6",
        c: "208.00",
        sver: "5",
        counter: "4",
        l: "10",
        s: "11,10,1,3,4,2,9,10,9,10,9,10,9,10,9,10,9,10,1,5,9,15,5,10,12,15,15,15,15,15,12,15,15,15,15,15",
        w: "0.00",
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    result["s"] = Util.view2String(player.machine.view);
    result["c"] = player.betPerLine;

    //                                 
    result["wlc_v"] = player.machine.winLines;

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

    if (player.machine.maskView.length > 0) {
        result["is"] = Util.view2String(player.machine.maskView);
        result["srf"] = player.machine.mysterySRF;
    }

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["reel_set"] = 0;
            result["na"] = "s";
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        result["trail"] = null;
        result["acci"] = 0;

        var aavSTR = [];
        var aamSTR = [];
        var totalTime = 0;
        for (var i = 0; i < player.machine.freeSpinAttackPos.length; i++) {
            aavSTR.push(`14~${player.machine.freeSpinAttackPos[i]}~${player.machine.freeSpinAttackTime[i]}~1`);
            aamSTR.push("s~p~n");
            totalTime += player.machine.freeSpinAttackTime[i];
        }

        result["aav"] = aavSTR.join(";");
        result["aam"] = aamSTR.join(";");
        result["accv"] = `${player.machine.freeSpinLife}~5~${player.machine.freeSpinLevel}~${totalTime}`;
        if (player.machine.freeSpinLevelUp) {
            result["accm"] = "cp~tp~lvl~sc";
        } else {
            result["accm"] = "cp~tp~lvl~sc~cl";
            result["accv"] += "~0";
        }

        if (player.machine.freeSpinMore > 0) {
            result["fsmore"] = player.machine.freeSpinMore;
        }

        result["reel_set"] = player.machine.freeSpinLevel + 1;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

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
