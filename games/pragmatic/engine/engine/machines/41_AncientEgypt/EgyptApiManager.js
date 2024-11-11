var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        wsc: "1~bg~50,10,1,0,0~0,0,0,0,0~fs~50,10,1,0,0~10,10,10,0,0",
        def_s: "5,8,7,9,8,8,7,3,4,4,11,6,8,11,10",
        balance: "0.00",
        cfgs: "2502",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "10",
        def_sb: "8,8,7,5,9",
        def_sa: "9,1,8,4,10",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646037579980",
        sa: "9,1,8,4,10",
        sb: "8,8,7,5,9",
        sc: "20.00,50.00,100.00,200.00,500.00,1000.00,3000.00,5000.00,10000.00",
        defc: "200.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;5000,1000,100,10,0;2000,400,40,5,0;500,100,15,2,0;500,100,15,2,0;150,40,5,0,0;150,40,5,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0",
        l: "10",
        rtp: "95.64",
        reel_set0: "9,1,8,4,10,9,7,6,8,7,5,7,10,11,11,8,6,10,8,3~1,8,10,11,4,6,5,3,7,5,11,8,9,10,7,9~7,9,9,10,11,11,4,8,4,6,1,10,5,9,6,10,3,8~7,8,11,9,4,6,10,8,3,7,1,10,9,4,5,6,10,5~8,8,7,5,9,10,6,4,3,1,11,10,1,4,7,6,10,3,8,9",
        s: "5,8,7,9,8,8,7,3,4,4,11,6,8,11,10",
        reel_set2: "8,7,9,9,10,4,1,4,6,3,7,10,5,11,11~9,11,1,8,10,6,11,4,3,4,7,10,5~10,7,6,10,6,1,5,3,11,4,7,9,11,8~6,8,7,9,11,5,10,10,3,8,1,4,10,11,6,9,5~1,6,9,7,3,10,6,9,11,11,8,7,8,4,5,10",
        reel_set1: "6,7,5,10,7,9,3,3,8,4,10,11,6,7,1~9,3,5,4,8,11,7,6,8,1,10,10~3,11,6,9,8,7,6,10,4,5,7,9,1~8,1,5,9,3,5,7,8,10,10,11,11,6,10,4~8,11,7,6,5,3,1,11,6,4,9,8,3,7,10,10",
        reel_set4: "4,11,7,10,9,7,6,3,10,8,1,5,11,8,8,6~7,8,3,6,1,11,10,11,5,6,10,4,5,7,9~9,7,4,3,6,8,11,1,8,7,10,6,4,7,10,5~7,4,11,10,10,9,7,6,5,3,11,5,1,8~10,8,6,5,11,7,5,6,9,8,8,7,1,10,4,3,10",
        reel_set3: "11,10,8,5,7,7,11,9,6,4,9,1,3~11,10,1,3,7,5,9,6,8,9,4,5~5,7,4,11,8,10,4,11,1,6,7,5,9,3,10~7,3,11,6,9,10,10,9,8,5,1,5,11,4~5,6,3,5,11,8,10,1,10,9,7,7,8,7,4",
        reel_set6: "10,6,8,8,6,10,9,11,7,3,5,9,4,1~8,3,1,4,7,5,8,8,11,9,6,10,11~10,11,3,9,7,8,10,1,6,8,9,10,4,5,4,7~11,8,9,10,1,5,7,5,4,3,5,10,11,10,7,6~7,8,5,3,5,6,4,10,11,10,11,9,1,9,10,6,7",
        reel_set5: "11,7,5,6,6,9,7,6,4,3,7,8,10,10,1,9~11,7,9,1,10,3,8,6,5,4,9,11,11~10,7,6,9,1,7,9,7,4,10,5,4,3,11,11,8~11,7,6,11,8,5,7,1,3,6,4,9,10,10,5,5~10,9,11,7,1,10,8,10,7,6,4,8,5,6,3,9,11,5",
        reel_set8: "1,11,5,8,6,11,9,3,4,9,6,7,8,10,10,9~5,6,9,11,8,3,7,8,1,11,7,4,5,9,6,9,10~5,6,9,7,3,9,11,4,4,11,1,8,10,9~9,11,8,10,11,9,7,5,5,10,4,3,5,6,1,6,10~8,5,4,11,1,7,10,10,5,9,3,6,7",
        reel_set7: "6,10,8,9,4,8,7,11,9,10,9,1,6,5,3,6~8,11,4,10,8,7,3,5,7,1,10,9,8,6,9~11,10,11,6,9,8,3,1,4,10,6,4,5,7,7,9~9,7,6,3,10,8,1,11,4,9,5,7,11,10,5,10,9,6~5,9,9,10,4,7,8,7,5,11,6,3,1,10,11,8",
        reel_set9: "10,4,3,9,8,8,11,11,10,6,5,11,7,6,1~7,8,7,4,6,11,10,8,1,3,10,8,6,5,9,9,10~3,8,11,6,4,9,5,10,7,4,6,11,1~9,10,6,4,11,9,10,8,11,5,3,11,1,7,5,6~7,5,3,10,10,11,8,8,6,9,6,7,4,1,9,5",
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
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0",
        na: "s",
        n_reel_set: "0",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: "3",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "10",
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
        if (player.machine.currentGame == "FREE" || player.machine.bonusStatus == "BONUS") {
            //                                   ,                    
            result["bgid"] = "0";
            result["bgt"] = "9";
            result["bw"] = "1";
            result["coef"] = player.virtualBet;
            result["end"] = "0";
            result["level"] = "0";
            result["lifes"] = "1";
            result["rw"] = "0";
            result["status"] = "0,0,0";
            result["wins_mask"] = "h,h,h";
            result["wins"] = "0,0,0";
            result["wp"] = "0";
            result["na"] = "b";
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel_set"] = "6";
        result["s"] = Util.view2String(player.machine.view);
        if (player.machine.expanding.length > 0) {
            //                                   
            result["me"] = player.machine.expanding;
            result["mes"] = Util.view2String(player.machine.mysteryView);
            result["psym"] = `${player.machine.mysterySymbol}~${player.machine.expandingWinMoney}~${player.machine.mysteryPositions}`;
        }

        result["ms"] = player.machine.mysterySymbol;

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
            result["fsend_total"] = 1;
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bgid: "0",
        bgt: "9",
        coef: player.virtualBet,
        counter: "1",
        end: "1",
        level: "1",
        lifes: "0",
        index: "1",
        rw: "0",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    var cache = player.machine.selectCache;
    result["status"] = cache.status;
    result["wins_mask"] = cache.wins_mask;
    result["wins"] = cache.wins;
    result["wp"] = "0";

    if (player.machine.bonusStatus == "BONUS") {
        result["na"] = "cb";
        result["tw"] = player.machine.moneyBonusWin;
        result["rw"] = player.machine.winMoney;
    } else if (player.machine.currentGame == "FREE") {
        result["fsmax"] = player.machine.freeSpinLength;
        result["na"] = "m";
        result["fs"] = "1";
        result["fsmul"] = "1";
        result["fsres"] = "0.00";
        result["fswin"] = "0.00";
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

ApiManager.prototype.MysteryApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "1",
        fs: "1",
        fsmax: "10",
        fsmul: "1",
        fsres: "0.00",
        fswin: "0.00",
        index: "1",
        ms: "6",
        n_reel_set: "6",
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["fsmax"] = player.machine.freeSpinLength;
    result["ms"] = player.machine.mysterySymbol;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;