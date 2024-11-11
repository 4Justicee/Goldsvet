var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        bonuses: "0",
        c: "200.00",
        cfgs: "1",
        counter: "2",
        def_s: "5,6,7,8,6,5,6,7,8,6,9,3,4,6,5",
        def_sa: "8,3,2,3,4",
        def_sb: "9,6,8,1,7",
        defc: "200.00",
        fsbonus: "",
        gameInfo: `{props:{max_rnd_sim:\"1\",max_rnd_hr:\"100000000\",max_rnd_win:\"7000\"}}`,
        gmb: "0,0,0",
        index: "1",
        l: "10",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,500,50,0,0;500,250,30,0,0;250,100,20,0,0;150,50,12,0,0;100,20,8,0,0;50,10,4,0,0;20,5,2,0,0",
        prg_cfg: "0",
        prg_cfg_m: "wm",
        reel_set_size: 13,
        n_reel_set: "0",
        reel_set0: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set1: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set2: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set3: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set4: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set5: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set6: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set7: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set8: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set9: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set10: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set11: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        reel_set12: "9,8,8,8,6,5,5,5,9,3,3,3,7,7,7,5,4,4,4,4,8,7,9,8,7,8,5,1,6,6,6,5,8,4,9,9,9,3,8~7,8,4,4,4,8,8,8,9,3,3,3,5,6,7,8,8,9,9,9,3,4,4,7,7,7,6,6,6,5,5,5,6,8~5,9,6,8,5,5,5,3,3,3,7,7,7,1,6,6,6,7,9,8,8,8,3,3,9,4,4,4,4,8,9,9,9,5,7,7~9,7,3,3,3,3,9,9,9,6,6,6,9,5,5,5,8,8,8,3,7,7,7,8,4,4,4,7,5,6,4,5,8,9~8,8,8,1,6,6,6,3,3,3,9,9,9,5,5,5,9,6,7,7,7,4,9,8,4,4,4,3,7,5,8,5,9,1,7",
        rt: "d",
        rtp: "96.06",
        s: "5,6,7,8,6,5,6,7,8,6,9,3,4,6,5",
        sa: "8,3,2,3,4",
        sb: "9,6,8,1,7",
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,10000.00",
        scatters: "1~2,2,2,0,0~12,12,12,0,0~1,1,1,1,1",
        sh: "3",
        stime: new Date().getTime(),
        sver: "5",
        ver: "2",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
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
        c: "100.00",
        counter: "1",
        index: "1",
        l: "10",
        na: "s",
        n_reel_set: "0",
        stime: new Date().getTime(),
        s: "14,6,4,11,8,9,7,6,9,10,8,11,7,5,4",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "3",
        sver: "5",
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);
    result["s"] = Util.view2String(player.machine.view);
    result["c"] = player.betPerLine;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    
    if (player.machine.scatterPositions.length) {
        result['psym'] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["n_reel_set"] = 1;
            result["fs"] = 1;
            result["fslim"] = 60;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.00;
            result["fsres"] = 0.00;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel_set"] = 1;
        result["prg_m"] = "wm,mwm";
        result["prg"] = `${player.machine.freeSpinMulti},60`;
        if (player.machine.freeSpinMulti > 1) {
            result["gwm"] = player.machine.freeSpinMulti;
        }

        if (player.machine.isFreeSpinAdd) {
            result["fsmore"] = 12;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fslim"] = 60;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["n_reel_set"] = 0;
            result["fs_total"] = player.machine.freeSpinLength;
            result["fslim"] = 60;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["w"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
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