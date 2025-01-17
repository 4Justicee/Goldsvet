var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "8,10,5,8,5,8,10,4,7,1,3,7,4,7,1",
        balance: "0.00",
        cfgs: "3040",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "3",
        def_sb: "4,3,5,7,1",
        def_sa: "1,10,8,3,5",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646036305171",
        sa: "1,10,8,3,5",
        sb: "4,3,5,7,1",
        sc: "20.00,50.00,100.00,200.00,500.00,1000.00,3000.00,5000.00,6000.00,8000.00,10000.00",
        defc: "200.00",
        sh: "3",
        wilds: "2~1000,150,25,0,0~1,1,1,1,1;19~1000,150,25,0,0~1,1,1,1,1;20~1000,150,25,0,0~1,1,1,1,1;21~1000,150,25,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;800,125,25,0,0;800,125,25,0,0;300,75,15,0,0;300,75,15,0,0;180,50,10,0,0;180,50,10,0,0;100,30,8,0,0;60,20,6,0,0;50,15,5,0,0;30,12,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,150,25,0,0;1000,150,25,0,0;1000,150,25,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "10",
        rtp: "94.34,94.45",
        reel_set0: "7,9,12,7,5,9,1,1,1,7,2,5,11,7,10,11,5,4,11,6,4,11,8,6,4,1,1,1,10,3,5,4,9,3,4,7,11,12,8,4,6,9,10,11,2,6,11,7,6,10,3,8,11,2,7,11,3,5,12,2,6,12,10,11,1,1,1,12,4,11,12,9,5,12,9,3,8,12,9,10,5,12,10,3,9,6,12,8,10,3,8,6,9,12,6,10,2,7,12,10,7,9,10,2,7,8,11,10,8,12,5,2,12,5,8,4,11,8,3~12,11,10,2,10,8,9,11,4,5,11,12,8,3,6,9,3,8,12,6,2,12,5,8,4,10,7,9,11,5,12,10,4,11,12,5,6,12,3,7,12,2,9,11,7,9,3,6,7,12,10,11,12,6,3,12,2,9,3,8,2,9,8,12,9,8,11,4,7,9,5,12,7,6,10,11,5,10,3,4,7,8,6,7,5,10,4,5~8,9,12,10,9,5,12,8,10,12,7,3,12,2,4,12,8,11,12,6,7,11,12,8,10,4,12,10,9,2,10,7,4,3,6,10,9,6,3,11,10,2,10,8,4,9,7,8,12,2,7,12,10,7,5,10,3,8,9,11,10,3,8,11,2,7,11,3,9,6,5,4,9,6,12,4,11,8,5,2,9,5,7,9,5,11,6,5,11,12,7~11,8,12,4,5,12,4,8,10,6,2,10,12,6,7,2,3,10,9,12,6,2,12,6,7,11,6,10,8,11,4,8,7,4,12,9,10,8,6,11,7,6,11,9,4,10,9,12,4,3,5,7,2,5,10,3,7,11,6,3,9,5,2,9,5,8,7,4,10,3,9,11,10,12,8,4,9,12,11,9,12,6,8,2,11,12,5~8,5,10,12,5,8,9,10,7,5,2,7,5,3,10,11,1,1,1,12,9,2,8,12,7,10,6,2,9,6,7,8,11,4,9,12,11,8,12,9,3,12,6,1,1,1,11,10,3,11,4,10,12,4,10,11,7,10,5,8,10,3,12,7,6,9,7,3,2,4,6,12,7,8,12,7,1,1,1,9,6,7,11,8,9,5,2,9,8,3,4,11,3,5,12,11,6,10,11,6",
        s: "8,10,5,8,5,8,10,4,7,1,3,7,4,7,1",
        reel_set2: "8,7,11,7,9,12,5,9,11,11,7,10,5,11,7,5,12,7,4,8,5,10,3,6,10,4,3,8,11,11,8,6,9,10,6,2,11,6,12,6,7,10,3,8,11,11,2,7,4,5,12,12,6,5,12,10,11,11,4,9,9,12,3,9,12,9,10,12,5,12,10,9,6,8,9,10,3,8,6~12,11,10,3,6,4,8,12,10,11,8,10,11,4,5,12,4,3,7,10,4,8,12,6,12,2,6,8,12,5,3,10,11,12,4,7,10,11,5,12,10,6,11,5,6,12,3,12,7,2,9,9,11,7,4,6,8,12,12,10,11,7,3,6,11,11,9,12,5,10,7,9,8~8,10,12,11,10,5,12,9,11,12,7,3,4,12,5,8,12,11,6,12,5,11,7,5,12,7,8,9,7,8,11,12,9,11,5,12,11,9,8,5,4,7,11,10,7,3,12,11,10,12,11,10,4,7,2,6,11,9,10,8,9,12,8,11,7,10,6,3,10,3,4,9,9~12,9,8,11,9,11,6,9,11,10,12,6,9,7,11,12,7,8,11,10,12,7,8,9,7,12,10,6,9,8,10,9,7,10,3,12,4,2,11,12,5,11,9,7,12,11,8,7,10,11,10,11,7,8,11,5,8,12,7,3,10,5,10,9,8,11,10,12,11,11~6,9,11,6,10,3,11,9,6,4,7,5,11,4,12,6,9,3,5,9,11,9,6,7,10,9,12,10,12,11,9,3,10,5,12,6,5,8,12,5,10,12,6,11,12,5,2,9,11,8,11,9,5,11,4,6,12,11,9,7,11,9,12,8,10,5,7,4,2,12,12,11,10,12,10,12,10,10,3,9,6,5,12,12,3,8,11,12,6,12,4,12,10",
        reel_set1: "11,6,4,11,8,18,6,4,10,16,17,4,9,16,4,18,11,12,8,6,9,16,10,11,2,6,11,18,6,10,16,8,11,2,18,11,16,17,12,2,6,12,10,11,12,4,12,10,16,9,6,12,8,10,16,8,6,9,12,6,10,2,18,12,10,18,9,10,2,9,18,8,12,17,2,12,17,8,4,11,8,16~12,11,10,4,6,18,10,11,2,10,8,9,11,4,17,11,12,8,16,6,9,18,16,8,12,6,2,12,17,8,11,17,16,10,2,4,10,16,18,9,11,17,12,10,11,12,17,6,12,16,18,12,2,9,11,18,9,16,6,18,12,10,17,11,12,6,16,12,2,6,10,11,9,12,4,10,18,8,2~8,9,12,4,10,9,17,12,8,10,12,18,16,12,2,4,12,8,11,12,17,18,11,4,6,11,4,6,11,18,8,6,18,11,12,8,10,16,4,12,10,9,2,10,18,4,6,10,9,6,16,11,10,2,11,9,16,6,2,17,10,8,17,16,9,18,8,12,2,18,12,10,18,17,10,16,8,9,11,10,8~11,8,12,4,18,10,17,18,8,10,16,9,12,4,17,12,4,8,10,6,2,18,10,12,6,18,2,16,10,9,12,6,2,12,6,18,11,16,6,10,8,11,4,8,18,4,12,9,8,17,9,11,10,2,11,16,10,8,6,11,18,6,17,11,9,4,10,9,12,4,16,17,18,2,17,10,16,18,11,6,9,17,2,9,17,8,18,4,10,16,9,11,10,12~17,11,9,4,17,2,8,17,10,12,17,8,9,10,18,17,2,18,17,16,10,18,11,12,9,2,8,12,18,10,6,2,9,6,18,8,11,16,9,12,11,6,16,11,10,16,11,4,10,8,11,4,12,8,10,12,18,8,12,18,9,6,18,11,8,9,17,2,9,8,16,4,11,16,17,12,11,6,10,11,6,10,2,12,4,11,12,6,9",
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
        balance_bonus: 0,
        balance_cash: 0,
        balance: 0,
        c: player.betPerLine,
        l: 10,
        reel_set: 0,
        na: "s",
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 3,
        sver: 5,
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["bgid"] = 0;
            result["bgt"] = 30;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["na"] = "b";
            result["rw"] = 0.0;
            result["status"] = "0,0";
            result["wins_mask"] = "aph,swf";
            result["wins"] = "14,8";
            result["wp"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = player.machine.freeSpinType;

        if (player.machine.freeSpinType == 0) {
            result["fstype"] = "aph";
        } else if (player.machine.freeSpinType == 1) {
            result["fstype"] = "swf";
            result["sty"] = player.machine.freeSpinSticky.join("~");
            if (player.machine.addedSticky != "") {
                result["srf"] = player.machine.addedSticky;
            }
            if (player.machine.maskView.length > 0) {
                result["is"] = Util.view2String(player.machine.maskView);
            }
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
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

    result["index"] = param.index;
    result["counter"] = ++param.counter;

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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        fsmul: "1",
        bgid: "0",
        balance: "99,997.75",
        fstype: "aph",
        wins: "14,8",
        coef: "0.10",
        fsmax: "14",
        level: "1",
        index: "84",
        balance_cash: "99,997.75",
        balance_bonus: "0.00",
        na: "s",
        fswin: "0.00",
        status: "1,0",
        rw: "0.00",
        stime: "1645604928318",
        fs: "1",
        bgt: "30",
        lifes: "0",
        wins_mask: "aph,swf",
        wp: "0",
        end: "1",
        fsres: "0.00",
        sver: "5",
        counter: "168",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;
    result["coef"] = player.virtualBet;

    result["fsmax"] = player.machine.freeSpinLength;
    if (player.machine.freeSpinType == 0) {
        result["fstype"] = "aph";
        result["status"] = "1,0";
    } else if (player.machine.freeSpinType == 1) {
        result["fstype"] = "swf";
        result["status"] = "0,1";
    }

    return result;
};

module.exports = ApiManager;