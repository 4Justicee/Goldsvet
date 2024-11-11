var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        wsc: "1~bg~200,20,2,0,0~10,10,10,0,0",
        def_s: "5,8,7,9,8,8,7,3,4,4,11,6,8,11,10",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        ms: "10",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "5,3,4,6,7",
        reel_set_size: "12",
        def_sa: "11,5,10,8,9",
        reel_set: "7",
        balance_bonus: "0.00",
        na: "s",
        scatters: "",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{rtps:{purchase:"96.50",regular:"96.50"},props:{max_rnd_sim:"1",max_rnd_hr:"83333333",max_rnd_win:"5500"}}',
        stime: "1647246923940",
        sa: "11,5,10,8,9",
        sb: "5,3,4,6,7",
        reel_set10: "11,3,10,8,9,4,6,5,7,10,4,10,9,10,5,4~10,4,5,9,7,3,6,11,8,3,6,3,9,6,3,6,7,6,5,6,9,5,9,5,7,6,5,3,9,5,6,7,6~10,11,8,9,6,7,5,4,3,7,11,7,11,6,3,5,3,6,4,3,8,11,3,6,9,3,11,3,9,4,3,11~10,4,3,9,11,5,7,8,6,8~10,9,8,4,5,3,7,11,6,4,9,4,11,4,11,7,9,6,11,5,3,7,11,4,3,4,9",
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,9000.00,10000.00",
        defc: "200.00",
        reel_set11: "8,10,6,5,4,1,9,3,7,11,9,3,4,1,4,1,7,4,9,3,9,3,1,9,4,1,9,3~11,3,9,6,8,5,1,10,7,4,3,10,6,4,10,6,9,3,6~6,4,8,9,11,5,1,3,7,10,4,1,4,10~8,10,5,7,4,6,11,3,1,9,5,7,5,1,4,5,4,7,10,7,1,11,5,7,9,4,10,5,10,3,10,5,7,5,9,5,3,5,4,9,7,5,6~1,11,10,9,7,6,4,8,5,3,8,5,11,7,5,6,8,5,9,4,5,3,8,5,7,5,7",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;5000,1000,100,10,0;2000,400,40,5,0;750,100,30,5,0;750,100,30,5,0;150,40,5,0,0;150,40,5,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0",
        l: "10",
        rtp: "96.50",
        total_bet_max: "10,000,000.00",
        reel_set0: "9,1,7,4,6,10,3,8,5,11,7,1,10,1,10,1,5,1,5,3,7,6,3,5,1,5,4,6,10,5,6,1,5,6,1,10~10,1,7,5,11,8,9,4,3,6,3,1,11,5,8,7,6,4,11,8,6,3,1,4,7,3~4,5,11,1,7,3,8,10,6,9,3,8,6,10,8,6~1,7,4,10,8,5,11,3,9,6,4,7,4,8,4,6,10,4,7,8,11,7,8~6,1,9,11,5,8,4,3,7,10,11,5,11,3,1,9,11,3",
        s: "5,8,7,9,8,8,7,3,4,4,11,6,8,11,10",
        reel_set2: "1,11,6,5,4,3,10,8,7,9,8,11,6,3,10,11,3,10,8,11,4,11,8,10,11,8,9~10,3,6,8,1,9,5,7,4,11,4,1,5,1,4,1,9,4,1,3,1,5,8,1,5,11,5,1,5,7,3,1,4,1,5,1,4,1,4,1,4,5,7,1~5,11,4,6,8,9,7,1,3,10,11,1,7,4,11,3,6,11,10,11,9,7,11,3,11,7,11,3,6,8,11,4,11,3,4,8,10,3,11,7,11,9,4,9,3,4,3,11,8,3,9,3,4,8,11,9,11,3,11,7,10,11,10,3~5,8,6,11,7,4,10,3,9,1,6,3,11,6,7,6,10,11,10,9,6,9,7,8,6,4,6,10,6,9,6,7,6,3,11,1,3,11,6,10,9,8,7,8,11,8,9,10,7,3~10,8,7,9,11,1,4,5,3,6,1,9,11,7,1,7,8,9,4,1,9,1,7,11,9,4,9,6,1,9,11,1,11,8,9,4,9,7,9,4",
        reel_set1: "8,6,1,10,3,7,5,4,9,11,5,3~11,10,7,8,5,6,3,9,4,1,6,8,5,6,8,1,6,3,6,8,6,7,6,4,5,1,6,9,7,9,7,5,4,6,5,7,6,8~8,6,5,1,9,10,11,7,3,4,6,9,4,10,4,7,9,10,11,10,9,7,9,10,7,10,9,6,11,9,7,4~9,8,10,3,6,5,7,11,4,1,4,11,10,4,5,4,1,11,4,10,4,6,4,10,3,10,4,10,6,10,6,11,5,3,10,1,4,5,6,4,3,10,4,3,4,10~8,1,5,10,7,4,9,11,6,3,5,3,6,11,9,5,1,9,4,11,6,4,3,6,1,6,11",
        reel_set4: "4,7,11,5,3,6,9,8,1,10,6,10,9,8,10,8,10,8,3,11,9,8,10,6,10,11,8,6,10,9,6,11,9,6,11,10,11,5,11,6,8,9~9,8,4,1,3,7,5,11,6,10,11,10,5,7,11,10,1,6,5,6,5,3,11,10,7,10,5,6,11~3,5,4,6,10,8,7,9,1,11,7,8,7,5,9,5,7,1,8,4,5,11,8,5,9,7,5~4,10,11,1,8,9,3,6,7,5,11,8~8,3,4,5,1,7,9,6,11,10,1",
        purInit: '[{type:"fs",bet:1000}]',
        reel_set3: "11,5,10,6,1,9,7,8,3,4,5,9,3,10,8,6,10,9~3,7,8,11,6,9,10,5,1,4,11,10,1,6,11,9,1,6,4,1,4,6,9,4,6,11,6,1,6,4,6,10,1,6,8,4,1,11,6,9,11,9,6,8,6,8,6,1,6,5,9,1~5,3,9,6,7,1,11,10,8,4,6,1,7,1,7,1,7,10,8,10,6,1,8,1,6,8,4,1,8,7,4,3,8,1,7,3,9,7,1,10,6,1,7,1,4,1,8,1,4~11,1,10,4,3,7,5,6,9,8,9,1,5,8,5,1,3,1,6,5,10,1,3,8,6,5,3,9,7,1,9,8,1,5,6,7,1,3,9,10,6,1,3,6,9,4,3,4,9,1,6,9,8,1,10,5,1,5,3~6,8,10,9,5,4,11,1,3,7,5",
        reel_set6: "10,9,1,5,3,11,8,4,7,6,8,9,11,7,3,4,3,8,7,6,7,4,5,7,6,4,8,4,8,9,8,4~10,6,4,1,3,11,7,8,5,9,11,9,11,5,9,8,6,8,7,11,9,5,9,5,6,5,3,5,8,11,6,4,9,11,8,9,11,4,5,9,5,8~4,6,5,3,7,8,1,11,9,10,6,8,1,3,8,7,9,7,5,9,10,5,3,7,3~1,8,7,9,3,5,6,11,10,4,7,5,6,8,6,9,6,7,3,6,5,6,3,7,6,7,8,3,6,10,6,3,5,7,8,6,3,7,3,10,6,4,3,6,3,6,3,5,7,3,6,3,10~5,3,11,10,4,8,9,1,7,6,3,11,3,9,11,9,1,8,1,4,9,11,1,4,9,11,9,11,9,8,9,11,9,8,1,11,9,11,4",
        reel_set5: "4,8,5,9,3,6,11,1,10,7,10,11,3,11,8,9,10,1,6,1,7,3,9,8,11,1,11~8,6,11,1,7,4,3,9,10,5,4,7,3,6,9,1,9,3,1,3,10,9,1,7,6,9,10,11,9,4,7,3,9,7,11,9,7,3,7,3,7,10,4,7,3,1,6~3,6,5,1,10,9,4,11,8,7,9,1,10,7,6,11,1,6,11,1,4,9,10,1,9,7,11,8,9,10,9~4,10,3,11,7,9,5,8,1,6,1,6,9,8,11,10,6,1,6,1,7,11,10,11,8,1,11,1,10,6~4,11,3,7,5,10,8,6,9,1,8,5,9,8,6,8,10,8,9,8,11,6,8,10,3,8,5",
        reel_set8: "9,8,5,6,4,10,7,1,11,3,11,6,10,6,5,7,10,1,7,10,7,10,7,1,10,1,11~9,8,5,1,3,6,4,10,7,11,3,1,4,10,1,3,8,1,4,3,6,4,5,8,1,6,5,1,4,1,10,6,1,5,4,1,3,8,6,10,8,5~6,1,7,5,8,10,11,3,4,9,3,5,11,8,11,5,11,8,11,8,1,11~7,9,8,3,11,4,10,1,5,6,3,5,6,10,5,8,10,3,9,10,1,10,9,10,1,10,1,10,5,1,10,9,10,5,8,3,5,1,4,5~8,10,3,7,5,11,6,4,1,9,11,7,5,4,11,7,10,5,10,4,10,5,10,5,11,5,11,1,10,1,5,4,10,11,1,11",
        reel_set7: "10,8,9,11,7,6,4,1,3,5,9,7,1,11,4,1,5,1,11,6,7,1,9,7,1,5~11,5,6,7,9,10,4,3,8,1,6,8,6,7,9,7,8,9,10,9,7,8,9,10,5,9,10,9,4,9,8,10,9,4,8,10,7,5,10,1,4,1~9,1,3,7,5,6,8,4,10,11,10,6,10,3,5,4,7,6,4,7,6,1,8,4,10,7,6,10,4,6,5,6,5,10,6,10,3,4,6,4,5,6,1,4,8,3~8,9,4,1,6,7,11,3,5,10,4,3,6,3,5,9,5,6,9,3,1,10,6,3,5,10,5,4,6,5,7,11,5,3,9,10,3,10,4,11,9,3,9~7,3,4,1,6,11,5,8,10,9,5,3,4,1,10,3,8,9,8,4,11,3,1,4,8,3,5,11,1,3,5,3,9",
        reel_set9: "9,7,10,11,1,6,5,3,4,8,11~10,9,5,4,1,3,11,8,7,6,7,4,3,7,4,9,3,4,7,1,7,3~7,9,1,5,10,4,8,6,3,11,4,1,3,10~6,10,8,1,5,7,9,3,4,11,5,11,9,5~5,4,6,11,3,1,7,10,9,8,11",
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
        balance: "97,920.00",
        ms: "9",
        index: "2",
        balance_cash: "97,920.00",
        reel_set: "6",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "3,1,4,6,6",
        sb: "4,10,4,6,5",
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

    //                 
    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
    }

    result["ms"] = player.machine.mysterySymbol.join();

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = "0.00";
            result["fswin"] = "0.00";
            result["puri"] = 0;
            result["purtr"] = 1;
            result["na"] = "m";
            delete result["ms"];
        }
    } else if (prevGameMode == "FREE") {
        result["puri"] = 0;
        result["reel_set"] = 11;
        result["tw"] = player.machine.freeSpinWinMoney;

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
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    if (player.machine.expandingWinMoney > 0) {
        //                   
        result["me"] = player.machine.expanding.join(";");
        result["mes"] = player.machine.mysteryView.join(";");
        result["psym"] = player.machine.mysteryPositions.join(";");
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
        ms: "11",
        n_reel_set: "1",
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["ms"] = player.machine.mysterySymbol.join();

    return result;
};

module.exports = ApiManager;
