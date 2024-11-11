var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "8,6,9,6,10,10,7,6,9,11,5,11,5,5,4",
        balance: "0.00",
        cfgs: "4028",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "11,2,10,9,9",
        def_sa: "8,1,1,7,8",
        reel_set: "0",
        bonusInit: `[{bgid:0,bgt:26,bg_i:"375, 500",bg_i_mask:"psw, psw"},{bgid:1,bgt:47,bg_i:"375, 500",bg_i_mask:"psw, psw"}]`,
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,2,0,0~0,0,10,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646037722774",
        sa: "8,1,1,7,8",
        sb: "11,2,10,9,9",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~500,150,50,4,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,150,50,2,0;200,50,15,0,0;150,40,10,0,0;100,30,10,0,0;50,25,10,0,0;25,10,5,0,0;20,10,5,0,0;20,10,5,0,0;20,10,5,0,0;0,0,0,0,0",
        l: "20",
        rtp: "94.54",
        reel_set0: "10,9,3,3,11,9,7,5,8,10,2,2,11,9,6,8,10,5,7,11,9,4,5,10,9,6,11,10,3,3,11,4,7,9,11,5,10,9,7,6,8,9,2,2,10,11,5,10,9,4,5,10,9,7,3,3,3,11,10~10,11,4,7,8,6,7,11,1,10,9,2,2,10,11,4,5,8,7,6,10,11,1,8,7,4,11,3,3,3,10,11,4,6,8,7,5,11,1,9,11,6,4,11,8,3,3,3,11,6,5,8,11,1~4,7,8,9,6,5,10,8,1,11,6,7,10,2,2,2,8,3,3,3,9,10,1,8,6,5,9,7,4,8,10,6,7,10,8,6,9,10,5,4,9,1,8,10,7,6,8,11,5,4,8,7,6,9,3,3,3,8~2,2,2,8,7,6,9,5,7,8,11,1,9,8,6,7,11,5,4,8,3,3,11,8,1,9,11,7,6,8,10,5,9,11,5,7,9,8,4,5,11,9,8,11,5,6,10,4,7,11,8,3,3,3,9,11~7,8,9,4,6,10,9,5,8,11,7,6,9,8,7,10,11,4,10,9,3,3,3,8,9,7,4,10,8,7,11,9,6,10,7,11,9,2,2,8,11,7,5,9,10,7,11,9,6,7,10,9,4,8,9",
        s: "8,6,9,6,10,10,7,6,9,11,5,11,5,5,4",
        accInit: `[{id:0,mask:"cp; tp; s; sp"}]`,
        reel_set1: "10,9,3,3,11,9,7,5,8,10,8,4,11,9,6,8,10,5,2,2,9,4,5,10,9,6,11,10,6,5,11,4,7,9,11,5,10,9,7,6,8,9,4,7,10,11,5,10,9,4,5,10,9,3,3,3,7,11,10~10,11,4,7,8,6,7,11,9,8,9,4,10,7,11,4,5,8,7,6,10,11,6,8,7,4,11,3,3,2,2,2,4,6,8,7,5,11,10,9,11,6,4,11,8,3,3,3,11,6,5,8,11,8~4,7,8,9,6,5,10,8,10,11,6,7,10,2,2,9,8,3,3,3,9,10,7,8,6,5,9,7,4,8,10,6,7,10,11,6,9,10,5,4,9,7,8,10,7,6,8,2,2,5,8,7,6,9,4,3,5,8~2,2,11,8,7,6,9,5,7,8,11,8,9,8,6,7,11,5,4,6,2,2,11,8,5,9,11,7,6,8,10,5,9,11,5,7,9,2,2,2,11,9,8,11,5,6,10,4,7,2,8,3,3,3,9,11~7,8,9,4,6,10,9,5,8,11,7,6,9,8,2,2,11,4,10,9,3,3,5,8,9,7,4,10,8,7,11,9,6,10,7,11,9,2,2,2,11,7,5,9,10,7,11,9,6,7,10,9,4,8,9",
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
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        n_reel_set: "0",
        na: "s",
        l: "20",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: "10,9,8,7,9",
        sb: "8,9,8,7,6",
        sh: "3",
        sver: "5",
        tw: player.machine.winMoney,
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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.0;
            result["fsres"] = 0.0;
            result["reel_set"] = 0;
            result["na"] = "s";

            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        } else if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bgid"] = "1";
            result["bgt"] = "47";
            result["bpw"] = "0.00";
            result["bw"] = "1";
            result["end"] = "0";
            result["rsb_c"] = "0";
            result["rsb_m"] = "3";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 1;
        result["acci"] = 0;
        result["accm"] = "cp~tp";
        result["accv"] = player.machine.freeSpinIndex - 1 + "~" + player.machine.freeSpinLength;

        if (player.machine.stickyPositions.length > 0) {
            result["accm"] = "cp~tp~s~sp";
            result["accv"] += "~" + 3 + "~" + player.machine.stickyPositions.join();
        }

        //                         
        if (!player.machine.sticyStatus) {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else {
            result["na"] = "b";
            result["end"] = 0;
            result["bgid"] = "0";
            result["bgt"] = "26";
            result["bpw"] = "0.00";
            result["bw"] = "1";
            result["rsb_c"] = "0";
            result["rsb_m"] = "1";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsend_total"] = 1;
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
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        bgid: "0",
        bgt: "26",
        bpw: "0.00",
        counter: "1",
        end: "0",
        index: "1",
        na: "c",
        rsb_c: 1,
        rsb_m: 1,
        s: "13,3,3,3,13,13,3,3,3,13,13,13,3,3,13",
        stime: "1616530497566",
        sver: "5",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;
    result["s"] = Util.view2String(player.machine.view);

    //                      
    if (player.machine.prevGame == "FREE") {
        result["acci"] = 0;
        result["accm"] = "cp~tp";
        result["accv"] = player.machine.freeSpinIndex - 1 + "~" + player.machine.freeSpinLength;

        if (player.machine.stickyPositions.length > 0) {
            result["accm"] = "cp~tp~s~sp";
            result["accv"] += "~" + 3 + "~" + player.machine.stickyPositions.join();
        }

        //                                 
        var winLines = player.machine.winLines;
        for (var i = 0; i < winLines.length; i++) {
            result[`l${i}`] = winLines[i];
        }
        result["rw"] = player.machine.winMoney;
        result["tw"] = player.machine.freeSpinWinMoney;
        result["coef"] = player.betPerLine;
        result["na"] = "c";
        result["end"] = 1;
    } else if (player.machine.currentGame == "BONUS") {
        //                      
        result["bgid"] = "1";
        result["bgt"] = "47";
        result["bpw"] = player.machine.moneyBonusWin;
        result["rsb_c"] = player.machine.superBonusCount;
        result["rsb_m"] = player.machine.superBonusMax;
        result["end"] = "0";
        result["na"] = "b";

        //             
        if (player.machine.superMultiList.length > 0) {
            result["bg_mp"] = player.machine.superMultiList.join();
            var multiValueList = [];
            for (var i = 0; i < player.machine.superMultiList.length; i++) {
                multiValueList.push(2);
            }
            result["bg_mv"] = multiValueList.join();
        }
        result["bg_mp"] = player.machine.superMultiList.join();
    } else if (player.machine.currentGame == "BASE") {
        result["bgid"] = "1";
        result["bgt"] = "47";
        result["rsb_c"] = player.machine.superBonusCount;
        result["rsb_m"] = player.machine.superBonusMax;

        //                                 
        var winLines = player.machine.winLines;
        for (var i = 0; i < winLines.length; i++) {
            result[`l${i}`] = winLines[i];
        }

        result["bpw"] = 0;
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;
        result["coef"] = player.betPerLine;
        result["na"] = "cb";
        result["end"] = 1;

        //             
        if (player.machine.superMultiList.length > 0) {
            result["bg_mp"] = player.machine.superMultiList.join();
            var multiValueList = [];
            for (var i = 0; i < player.machine.superMultiList.length; i++) {
                multiValueList.push(2);
            }
            result["bg_mv"] = multiValueList.join();
        }
    }

    return result;
};

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        rw: "100,000",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        wp: "0",
        coef: player.virtualBet,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;