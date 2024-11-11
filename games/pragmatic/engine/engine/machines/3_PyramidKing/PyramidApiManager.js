var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "7,5,11,3,2,1,9,11,10,2,6,6,11,9,2",
        balance: "0.00",
        cfgs: "3871",
        ver: "2",
        mo_s: "11",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "11",
        def_sb: "5,9,3,10,3",
        mo_v: "25,50,75,100,125,150,175,200,250,350,400,450,500,600,750,2500",
        def_sa: "4,9,7,9,10",
        reel_set: "0",
        mo_jp: "750;2500;25000",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,1,0,0~0,0,10,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        mo_jp_mask: "jp3;jp2;jp1",
        stime: "1646037243601",
        sa: "4,9,7,9,10",
        sb: "5,9,3,10,3",
        reel_set10: "9,5,7,6,10,7,8,3,10,8,7,9,11,11,8,8,9,5,8,2,5,7,8,5,4,8,11,9,8,2,3,4,5,1,4,8,6,7,9~4,2,9,3,7,5,9,6,7,10,3,8,10,6,11,11,8,4,8,7,6,2,3,10,9,6,4,8,11,6,8,2,10,4,5,7,8,10,9,7,10~2,6,9,8,9,6,5,9,1,10,4,2,10,11,11,9,5,6,7,10,2,9,10,4,3,10,9,11,10,6,2,10,8,5,10,8,4,9,7,4~10,8,2,4,6,10,7,9,5,8,6,7,8,2,7,11,11,5,9,7,8,3,2,6,9,3,8,4,5,11,9,3,2,10,5,4,10,7,4,9,7,6~2,5,10,9,7,3,5,1,10,4,8,2,6,11,11,8,3,6,1,9,2,10,9,4,10,9,8,11,9,5,2,10,1,4,10,7,8,9,1",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~500,250,25,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,250,25,0,0;400,150,20,0,0;300,100,15,0,0;200,50,10,0,0;50,20,10,0,0;50,20,5,0,0;50,20,5,0,0;50,20,5,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "94.50",
        reel_set0: "6,8,7,1,6,9,4,5,8,4,2,2,2,7,6,10,7,3,10,8,7,9,11,11,11,8,9,8,9,5,7,8,5,6,8,5,9,8~9,7,8,10,9,7,2,2,7,5,9,6,7,10,3,8,6,11,11,11,4,8,7,6,9,3,10,9,6,4,8,10,8,5,10,4,5,7,8,9,7,10~7,1,10,8,6,9,10,3,2,2,2,8,9,5,9,1,10,4,6,10,11,11,11,5,6,7,10,6,9,4,3,10,9,4,10,6,9,10,8,5~9,7,3,10,8,5,7,9,10,8,2,2,3,10,7,9,5,8,6,7,8,10,7,11,11,6,9,7,8,3,4,6,9,3,8,4,5,6,9,3,6~7,9,1,10,7,5,3,9,10,3,2,2,2,9,7,3,5,1,10,4,8,10,6,11,11,11,3,6,1,9,5,10,9,4,10,9,8,10,9,5,4",
        s: "7,5,11,3,2,1,9,11,10,2,6,6,11,9,2",
        reel_set2: "8,3,9,8,7,9,11,10,3,8,9,5,8,9,5,7,2,5,3,8,5,11,11,5,3,8,5,1,4,6,2,7,9~5,8,11,11,7,4,2,10,9,7,5,3,6,7,10,3,8,6,10,11,6,10,4,8,7,6,9,3,10,2,6,4,8,10,11,8,5,2,3,5,7,8,2,9,7,6~10,4,2,3,8,4,9,6,5,9,1,10,4,6,10,11,9,10,3,6,7,4,6,9,10,2,3,10,6,4,11,11,9,10,3,5,10,8,2,5,7,6~11,11,10,8,2,4,3,5,7,3,5,8,6,7,2,10,7,9,11,7,9,6,7,3,4,6,9,2,8,4,5,6,11,3,2,10,5,4,10,7,2,9,7,6~3,2,8,4,9,2,6,5,1,10,4,2,10,6,11,9,3,10,6,1,9,5,3,9,2,10,4,8,10,11,11,2,10,1,4,6,2,7,9,1,8",
        reel_set1: "7,8,4,9,8,7,6,5,7,8,3,9,8,7,9,11,10,3,8,9,5,8,9,5,7,2,5,3,8,5,11,11,5,3,8,5,1,4,6,2,7,9~11,11,7,4,2,10,9,7,5,3,6,7,10,3,8,6,10,11,6,10,4,8,7,6,9,3,10,2,6,4,8,10,11,8,5,2,3,5,7,8,2,9,7,6~11,9,10,4,2,3,8,4,9,6,5,9,1,10,4,6,10,11,9,10,5,6,7,4,6,9,10,2,3,10,6,4,11,11,9,10,3,5,10,8,10,5,7,6~9,3,7,10,4,5,11,11,10,8,2,4,3,5,7,3,5,8,6,7,2,10,7,9,11,7,9,6,7,3,4,6,9,2,8,4,5,6~8,4,9,2,6,5,1,10,4,2,10,6,11,9,3,10,6,1,9,5,3,9,2,10,4,8,10,11,11,2,10,1,4,6,9,7,9,1,8",
        reel_set4: "7,8,4,9,8,7,6,5,7,8,3,9,8,7,9,11,5,3,8,9,5,10,8,9,5,7,2,5,3,8,5,11,11,5,3,8,5,1,4,6,2,7,9~9,8,7,10,5,8,11,11,7,5,6,10,11,6,10,4,8,7,6,9,3,10,2,6,4,8,10,11,8,5,2,3,5,7,8,2,9,7,6~9,10,4,2,3,8,4,9,6,5,9,1,10,5,6,10,11,9,10,5,6,7,4,6,9,10,2,3,10,6,4,11,11,9,10,3,5,10,8,2,5,7,6~9,3,7,10,4,5,11,11,6,8,2,4,9,11,7,9,6,7,3,4,6,9,2,8,4,5,6,11,3,2,10,5,4,10,7,2,9,7,6~9,10,3,2,8,4,9,2,6,5,1,10,4,2,10,6,11,9,5,10,6,1,9,5,3,9,2,10,4,8,10,11,11,2,10,1,4,6,2,7,9,1,8",
        reel_set3: "11,4,7,8,4,9,8,4,6,5,7,8,3,9,8,7,9,11,10,3,8,9,5,8,9,5,7,2,5,4,8,5,11,11,5,3,8,5,1,4,6,2,7,9~9,8,7,10,5,8,11,11,7,4,2,10,9,7,5,3,6,7,10,3,8,6,10,11,6,10,4,8,7,4,9,3,10,2,6,4,8,10~9,10,4,2,3,8,4,9,6,5,9,1,10,4,6,10,11,9,10,5,6,7,4,6,9,10,2,3,10,6,4,11,11,9,10,3,5,10,8,2,5,7,6~11,11,10,8,2,4,3,5,7,3,5,8,6,7,2,10,7,9,11,7,9,6,7,3,4,6,9,2,8,4,5,6,11,3,2,10,5,4,10,7,2,4,7,6~9,10,3,2,8,4,9,2,6,5,1,10,4,2,10,6,11,9,3,10,6,1,9,5,3,9,2,10,4,8,10,11,11,2,10,1,4,6,2,7,9,1,8",
        reel_set6: "4,7,8,4,9,8,7,6,5,7,8,3,9,8,7,9,11,10,3,8,9,7,8,9,5,7,2,5,3,8,5,11,11,5,3,8,5,1,4,6,2,7,9~11,11,7,4,2,10,9,7,5,3,6,7,10,3,8,6,10,11,7,10,4,8,7,6,9,3,10,7,6,4,8,7,11,8,5,2,3,5,7,8,2,9,7,6~9,10,4,2,3,8,4,9,6,5,9,1,10,4,6,10,11,9,10,5,6,7,4,6,7,10,2,3,10,6,4,11,11,9,10,3,5,7,8,2,5,7,6~11,11,10,7,2,4,3,5,7,3,5,8,6,7,2,10,7,9,11,7,9,6,7,3,4,6,9,2,8,4,5,6,11,3,2,10,5,4,10,7,2,9,7,6~9,10,3,2,8,4,9,2,6,7,1,10,4,2,10,6,11,9,3,10,6,1,9,5,7,9,2,10,4,7,10,11,11,2,10,1,4,6,2,7,9,1,8",
        reel_set5: "7,8,4,9,8,7,6,5,7,8,3,9,8,7,9,11,10,3,8,6,5,8,9,5,7,2,5,3,6,5,11,11,5,3,8,5,1,4,6,2,7,9~9,8,7,10,5,8,11,11,7,4,2,10,9,7,5,3,6,7,10,3,8,6,10,11,6,10,4,8,7,6,9,3,10,2,6,4,8,10~9,6,4,2,3,8,4,9,6,5,9,1,10,4,6,10,11,9,10,5,6,7,4,6,9,10,2,3,10,6,4,11,11,9,10,3,5,10,8,2,5,7,6~9,3,7,10,4,5,11,11,10,8,2,4,3,5,7,3,5,8,6,7,2,10,6,9,11,7,9,6,7,3,4,6,9~9,10,3,2,8,4,9,2,6,5,1,10,4,2,10,6,11,9,3,10,6,1,9,5,3,9,2,10,4,8,10,11,11,2,10,1,4,6,2,7,9,1,8",
        reel_set8: "9,7,8,4,9,8,7,6,9,7,8,3,9,8,7,9,11,10,3,8,9,5,8,9,5,7,2,9,3,8,5,11,11,5,3,8,9,1,4,9,2,7,9~11,11,7,4,2,10,9,7,5,9,6,7,10,3,8,9,10,11,6,10,4,9,7,6,9,3,10,2,6,4,8,10,11,9,5,2,3,5,9,8,2,9,7,6~9,10,4,2,3,8,4,9,6,5,9,1,10,4,6,10,11,9,10,5,6,7,4,6,9,10,2,3,10,6,9,11,11,9,10,3,5,10,8,2,5,7,6~11,11,10,8,2,4,3,5,7,3,5,8,6,7,2,10,7,9,11,7,9,6,7,3,4,6,9,2,8,4,5,6,11,3,2,10,5,9,10,7,2,9,7,6~9,10,3,2,8,4,9,2,6,5,1,10,9,2,10,6,11,9,3,10,6,1,9,5,3,9,2,10,4,8,10,11,11,2,10,1,4,6,2,7,9,1,8",
        reel_set7: "4,7,8,4,9,8,7,6,5,7,8,3,9,8,7,9,11,10,3,8,9,5,8,9,5,7,2,5,3,8,5,11,11,5,3,8,5,1,4,6,2,8,9~11,11,7,4,2,10,9,7,5,3,6,7,10,3,8,6,10,11,8,10,4,8,7,6,9,3,10,2,6,4,8,10,11,8,5,2,3,5,7,8,2,9,7,6~9,10,4,2,3,8,4,9,6,5,9,1,10,8,6,10,11,9,10,5,6,7,4,6,9,10,2,8,10,6,4,11,11,8,10,3,5,10,8,2,5,7,8~11,11,10,8,2,4,8,5,7,3,5,8,6,7,2,10,7,8,11,7,8,6,7,3,8,6,9,2,8,4,5,6,11,3,2,10,5,8,10,7,2,9,8,6~9,8,3,2,8,4,9,2,6,5,1,10,4,2,10,6,11,8,3,10,6,1,9,5,3,8,2,10,4,8,10,11,11,2,10,1,4,6,2,7,9,1,8",
        reel_set9: "11,10,4,9,10,7,6,5,7,8,3,9,10,7,9,11,10,3,8,10,5,8,9,10,7,2,5,3,8,10,11,11,5,3,8,10,1,4,6,2,7,9~11,11,7,4,2,10,9,7,5,3,6,7,10,3,8,6,10,11,6,10,4,8,7,6,9,3,10,2,6,4,8,10,11,8,5,2,3,5,7,8,2,9,7,6~9,10,4,2,3,8,4,10,6,5,9,1,10,4,6,10,11,9,10,5,6,7,4,6,9,10,2,3,10,6,4,11,11,9,10,3,5,10,8,2,5,7,6~11,11,10,8,2,4,10,5,7,3,5,10,6,7,2,10,7,9,11,10,9,6,7,3,10,6,9,2,8,4,5,10,11,3,2,10,5,4,10,7,2,9,7,6~9,10,3,2,8,4,9,2,6,5,1,10,4,2,10,6,11,9,3,10,6,1,9,5,3,9,2,10,4,8,10,11,11,2,10,1,4,6,2,7,9,1,8",
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
        l: "25",
        na: "s",
        reel_set: "0",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "3",
        sver: "5",
        tw: player.machine.winMoney,
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
            result["na"] = "m";
            result["mb"] = "1";
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.0;
            result["fsres"] = 0.0;
            result["reel_set"] = 0;
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        } else if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bgid"] = 0;
            result["bgt"] = 11;
            result["bpw"] = player.machine.moneyBonusWin;
            result["end"] = 0;
            result["rsb_c"] = 0;
            result["rsb_m"] = 3;
            result["rsb_s"] = "11,12";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 5;
        result["ms"] = player.machine.mysterySymbol;

        if (player.machine.expanding.length > 0) {
            //                                   
            result["me"] = player.machine.expanding;
            result["mes"] = Util.view2String(player.machine.mysteryView);
            result["psym"] = `${player.machine.mysterySymbol}~${player.machine.expandingWinMoney}~${player.machine.mysteryPositions}`;
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
            result["w"] = player.machine.freeSpinWinMoney;
        }
    }

    if (player.machine.moneyCache) {
        result["mo_t"] = player.machine.moneyCache.table.join();
        result["mo"] = player.machine.moneyCache.values.join();
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

ApiManager.prototype.MysteryApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "2",
        fs: "1",
        fsmax: "10",
        fsmul: "1",
        fsres: "0.00",
        fswin: "0.00",
        index: "3",
        na: "s",
        rw: "100,000",
        reel_set: "0",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["ms"] = player.machine.mysterySymbol;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fsmul"] = 1;
    result["fswin"] = player.machine.freeSpinWinMoney;
    result["fsres"] = player.machine.freeSpinWinMoney;

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "1",
        index: "1",
        na: "b",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["s"] = Util.view2String(player.machine.view);
    result["mo_t"] = player.machine.moneyCache.table.join();
    result["mo"] = player.machine.moneyCache.values.join();

    result["bgid"] = 0;
    result["bgt"] = 11;
    result["bpw"] = player.machine.moneyBonusWin;
    result["rsb_c"] = player.machine.moneyBonusCount;
    result["rsb_m"] = 3;
    result["rsb_s"] = "11,12";
    result["end"] = 0;

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
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        coef: player.virtualBet,
        counter: "2",
        index: "3",
        na: "s",
        rw: "100,000",
        stime: "1629939208592",
        sver: "5",
        wp: "0",
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
