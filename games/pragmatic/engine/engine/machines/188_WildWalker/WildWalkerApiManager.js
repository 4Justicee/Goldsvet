var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "2,3,11,6,6,13,13,13,2,10,5,3,10,13,13,13,2,10,11,4,10,13,13,13",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "3,4,7,4,6,13,13,13",
        reel_set_size: "5",
        def_sa: "8,7,5,3,3,13,13,13",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0,0,0,0~0,0,0,0,0,0,0,0~1,1,1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{props:{max_rnd_sim:"1",max_rnd_hr:"52631578",max_rnd_win:"2000"}}',
        stime: "1645792014472",
        sa: "8,7,5,3,3,13,13,13",
        sb: "3,4,7,4,6,13,13,13",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,150,30,0,0~1,1,1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0;10000,4500,1500,500,150,30,0,0;7000,3000,1200,400,100,25,0,0;5000,2000,900,300,75,20,0,0;3000,1500,500,200,50,15,0,0;2000,900,300,120,30,10,0,0;1500,500,200,75,20,8,0,0;500,200,90,30,10,4,0,0;500,200,90,30,10,4,0,0;500,200,90,30,10,4,0,0;500,200,90,30,10,4,0,0;0,0,0,0,0,0,0,0",
        l: "25",
        rtp: "96.55",
        reel_set0: "10,10,10,4,7,9,8,3,12,12,12,5,11,10,12,6,1,11,11,11,5~1,11,11,11,9,8,5,10,11,7,10,10,10,3,6,12,12,12,12,4,11,12,8,7,12,11,6,10,6,7,10,11,10,7,11,7,11,10,7,12,11,6,12,4,12,7,11,7,10,11,6,12~4,10,10,10,7,12,11,5,9,12,12,12,10,11,11,11,3,8,1,6,8,11,10,8,12,11,12,11,10,6,11,12,11,12,6,7,11,8,11,5,11,8,10,9,11,12,11,10,12,11,3,7,3,8,11,12,11,10,9,11,12,10,12,11,9,7,12,8,10,8,10,12,5,3,9,1,8,10,7,9,12,7,12,10,11,9,12,10,9,11,7,12~4,4,4,4,8,12,9,11,5,6,1,3,7,11,11,11,10,5,5,5,6,6,6,12,12,12,11,5,12,6,11,12,7,5,6,5,12,5,12,11,6,12,11,5,3,12,3,7,3,12,6,7,3,6,12,5,11,12,11,3,5,11,3,12,6,7,12,3,5,12,5,11,5,11,12,11,8,11,8,3,11,5,12,11,5,11~10,6,7,7,7,1,3,4,4,4,8,12,12,12,5,9,4,11,11,11,12,7,11,12,9,12,9,7,12,9,7,12,9,5,12,4,12,7,9,7,9,4,9,11,9,12,4,11,5~13,13,13,13,13~13,13,13,13,13~13,13,13,13,13",
        s: "2,3,11,6,6,13,13,13,2,10,5,3,10,13,13,13,2,10,11,4,10,13,13,13",
        accInit: '[{id:0,mask:"cp;tp;lvl;sc;cl"}]',
        reel_set2: "2,2,2,2,2~9,3,10,10,10,1,7,11,11,11,11,12,12,12,12,6,5,4,10,8,10,12,4,10,11,7,6,8,12,10,1,12,11,10,7,12,7,10,11,12,11,12,10,8,12,3,11,10,3,11,10,12,7,8,12,7,12,10,8,11,12,11,12,3,12,7,10,11,10,8,7,12,4,12,10,11,12,3,12,10,11,10,12,8,7,8,7,10,8,12,1,8,10~11,11,11,11,7,8,10,10,10,3,12,12,12,9,1,10,4,6,5,12,4,12~3,1,8,11,11,11,11,10,10,10,10,7,6,12,12,12,9,5,4,12,10,4,12,11,6,9,12,10,11,9,6,12,9,6,12,8,11,10,11,10,11,6,11,10,6,9,12,11,10,9,10,11,10,1,9,12,5,11,12,11,12,10,9,10,9,10,6,11,12,8,6,8,11,10,12,11,4,9,11,8,1,4,6,11,6,10,11,9,11,10,11,12,10,6,11,12,8,10,11,12~6,7,12,12,12,5,10,10,10,1,11,11,11,4,8,11,12,10,9,3,12~5,7,1,4,11,11,11,9,11,12,12,12,10,10,10,10,3,6,12,8,9,10,11,9,12,11,12,10,8,10,4,12,7,8,10,12,4,11,9,10,7~13,13,13,13,13~13,13,13,13,13",
        reel_set1: "11,1,8,10,10,10,6,11,11,11,4,12,12,12,12,5,7,3,10,9,12,1,10,3,5,12,5,10,5,8,4,12,10,8,4,10,5,12,5,10,5~10,10,10,4,12,12,12,3,6,12,9,8,11,1,7,10,5,11,11,11,7,8,7,12,6,5,11,12,1,5,8,6,11,1,8,11,12,9,12~9,12,12,12,11,6,10,12,3,1,11,11,11,7,8,10,10,10,5,4,11,7,11,7,11,8,1,10,12,1,12,5,11,12,11,5,1,10,12,10,12,7,5,12,10,5,11,10,7,11,3,12,7,3,1,7,11,7,12,11,7,1,5,12,11,5,11,12,10~12,12,12,1,9,8,12,6,5,11,4,11,11,11,7,3,10,10,10,10,11,5,10,5,11,5,11,1,9,4,7,5,9,10,11,10,11,9,11,9,11,10,11,9~11,11,11,5,12,12,12,4,10,10,10,10,12,3,6,7,11,9,1,8,10,8,10,12,10,12,10,12,10,12,10,12,10,9,12,10,7,8,12,9,8,12,7,10,12,8,3,8,12,4,12,10,12,8,12,7,12,10,12,9,10,12,10,8,10,12,10,12,3,10,6,8,12~13,13,13,13,13~13,13,13,13,13~13,13,13,13,13",
        reel_set4: "2,2,2,2,2~2,2,2,2,2~2,2,2,2,2~11,11,11,6,7,10,3,4,10,10,10,8,12,12,12,9,12,11,1,5,12,8,5,9,12,9,10,1,9,12,1,10,12,10,9,8,10,6,12,8,12,7,9,12,8,12,8,12~11,11,11,12,11,12,12,12,7,4,3,9,6,1,10,10,10,5,8,10,1,10,12,10,12,10,12,8,10,7,10,9,12,7,3,4,8,10,3,4,5,12,4~9,12,12,12,8,11,11,11,6,10,3,1,12,5,7,10,10,10,4,11,6,10,7,1,7,6,10,11,10,11,8,7,10,11,12,3,12,5,10,1,10,6~5,11,10,10,10,10,9,12,12,12,12,7,1,11,11,11,4,8,3,6,1,4,11,4,9,11,3,9,11,12,11,12,9,7,6,12,10,11,10,11,4,11,12,10,11~12,12,12,4,11,11,11,12,5,10,10,10,6,7,3,8,9,10,1,11,1,10,8,3,1,11,1,10,7,11,9,10,9,3,11,10,9,10,3,10,3,9,10,6,1,6,3,6,11,10,9,7,11,10,6,4,1,6,10,3,11,9,11,4,6,11,1,11,3,10,1,3,1,6,1,3,10,3,10,1,10,9,7,3,1,3,1,10,6,1,7,11,1,11,1,10,1,11,6,10,6,9",
        reel_set3: "2,2,2,2,2~2,2,2,2,2~11,11,11,8,10,1,11,12,12,12,9,4,10,10,10,3,12,5,7,6,12,8,12,9,10,9,12,9,6,1,6,8,9,3,10,7,8,10,7,5,7,12,9,12,8,9,8,7,8,4,6,12,10,4,10,3,5,10,7,4,9,10,5,10,3,12,3~1,9,8,5,6,4,12,10,10,10,11,10,12,12,12,7,11,11,11,3,11,7,12,11,7,11,4,12,10,7,11,12,11,12,11,10,11,4,11,10,11,8,9,11,8,11,10,11,10,11,7,11,7,4,9,11,7,11,7,10,11,7,11~11,11,11,8,5,11,12,12,12,6,10,4,10,10,10,3,1,12,9,7,4,10,8,6,4,8,6,8,6,10,4,8,6,4,9,3~9,6,4,3,8,7,11,11,11,1,10,11,12,5,10,10,10,12,12,12,11,5,6,4,10,12,6,11,5,12,7,4,11,7,1,11~12,12,12,12,10,11,6,4,10,10,10,8,5,11,11,11,3,7,9,1,11,4,10,3,11,9,4,10,9,6,4,9,11,8,4~13,13,13,13,13",
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
        balance: "99,750.00",
        index: "2",
        balance_cash: "99,750.00",
        is: Util.view2String(player.machine.maskView),
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        rwd: "2~3,11,19",
        stime: new Date().getTime(),
        sa: "4,10,10,11,8,13,13,13",
        sb: "5,12,12,5,7,13,13,13",
        sh: "3",
        c: player.betPerLine,
        sver: "5",
        counter: "4",
        l: "25",
        s: Util.view2String(player.machine.view),
        w: player.machine.winMoney,
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

    result["rwd"] = `2~${player.machine.wilds.join()}`;

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["acci"] = 0;
            result["accm"] = "cp~tp~lvl~sc";
            result["accv"] = "0~3~1~0";
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
            result["reel_set"] = 0;
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["acci"] = 0;
        if (player.machine.freeSpinLevelUp) {
            result["reel_set"] = player.machine.freeSpinLevel - 1;
            result["accm"] = "cp~tp~lvl~sc~cl";
            result["accv"] = `${player.machine.freeSpinBTotalCount}~3~${player.machine.freeSpinLevel}~${player.machine.freeSpinBCount}~${player.machine.freeSpinLevel - 1}`;
        } else {
            result["reel_set"] = player.machine.freeSpinLevel;
            result["accm"] = "cp~tp~lvl~sc";
            result["accv"] = `${player.machine.freeSpinBTotalCount}~3~${player.machine.freeSpinLevel}~${player.machine.freeSpinBCount}`;
        }

        if (player.machine.freeSpinMore > 0) {
            result["fsmore"] = player.machine.freeSpinMore;
        }

        result["tw"] = player.machine.freeSpinWinMoney;
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

    result["index"] = param.index;
    result["counter"] = ++param.counter;

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
