var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9",
        balance: "0.00",
        cfgs: "4548",
        ver: "2",
        mo_s: "11",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        def_sb: "10,7,5,9,10",
        mo_v: "25,50,75,100,125,150,175,200,250,350,400,450,500,600,750,2500",
        def_sa: "8,7,5,4,7",
        mo_jp: "750;2500;25000",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~1,1,1,0,0~0,0,5,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        mo_jp_mask: "jp3;jp2;jp1",
        stime: "1646035458369",
        sa: "8,7,5,4,7",
        sb: "10,7,5,9,10",
        sc: "10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00",
        defc: "80.00",
        sh: "3",
        wilds: "2~500,250,25,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "80.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,250,25,0,0;400,150,20,0,0;300,100,15,0,0;200,50,10,0,0;50,20,10,0,0;50,20,5,0,0;50,20,5,0,0;50,20,5,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.00",
        reel_set0: "7,4,6,1,10,10,9,2,2,2,5,6,3,6,9,11,11,11,7,8,5,1,10,5,6,8,2,4,10~8,6,9,2,2,2,7,9,10,5,4,9,6,4,5,8,10,11,11,11,3,7,9~9,2,2,2,4,3,5,8,11,11,11,7,4,5,8,10,8,6,2,7,5,2,1,3,10,8~11,11,10,5,7,4,7,7,8,9,2,2,2,7,5,3,2,3,4,10,3,8,4,6,10,6,6,7~3,8,4,7,1,10,3,2,2,2,5,6,1,6,4,6,7,4,10,7,11,11,11,9,3,7,10,6,8,5,9,10,5",
        s: "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9",
        reel_set1: "4,3,5,10,6,4,6,2,2,2,4,6,7,5,8,3,6,9~5,5,5,10,10,10,3,3,3,1,1,1,4,4,4,7,9,9,9,6,6,6,11,11,11,6,7,7,7,3,4,2,2,2,8,8,8,3~2,2,2,8,8,8,3,5,5,5,4,4,4,7,9,9,9,6,6,6,11,11,11,6,7,7,7,3,4,10,10,10,3,3,3,1,1,1~1,1,1,8,8,8,3,5,5,5,4,4,4,7,9,9,9,6,6,6,11,11,11,3,4,10,10,10,3,3,3,2,2,2,6,7,7,7~5,1,6,9,2,2,2,6,8,10,3,3,4,7,6,5,4",
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
        n_reel_set: 0,
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
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["n_reel_set"] = 1;
            result["na"] = "s";
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        } else if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bgid"] = 0;
            result["bgt"] = 11;
            result["bpw"] = "50.00";
            result["bw"] = 1;
            result["end"] = 0;
            result["rsb_c"] = 0;
            result["rsb_m"] = 3;
            result["rsb_s"] = "11,12";
            result["bgid"] = 0;
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["n_reel_set"] = 1;
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    if (player.machine.moneyCache != null && Object.keys(player.machine.moneyCache).length > 0) {
        result["mo"] = player.machine.moneyCache.values.join();
        result["mo_t"] = player.machine.moneyCache.table.join();
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "99,991.20",
        balance: "99,991.20",
        bgid: "0",
        bgt: "11",
        bpw: "57.50",
        counter: "1",
        end: "0",
        index: "1",
        mo_t: "",
        mo: "",
        na: "b",
        rsb_c: "",
        rsb_m: "3",
        rsb_s: "11,12",
        s: "",
        stime: "",
        sver: "5",
    };

    result["balance_cash"] = player.balance;
    result["balance"] = player.balance;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["index"] = param.index;
    result["bpw"] = player.machine.moneyBonusWin;
    result["s"] = Util.view2String(player.machine.view);

    result["mo_t"] = player.machine.moneyCache.table.join();
    result["mo"] = player.machine.moneyCache.values.join();
    result["rsb_c"] = player.machine.moneyBonusCount;

    if (player.machine.currentGame == "BASE") {
        //                    
        result["bpw"] = "0.00";
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;
        result["na"] = "cb";
        result["end"] = 1;
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
