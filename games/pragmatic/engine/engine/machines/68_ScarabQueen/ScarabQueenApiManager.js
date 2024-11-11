var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: "12",
        def_s: "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9",
        msr: "17",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        mo_s: "11",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "3",
        def_sb: "10,11,9,6,8",
        mo_v: "25,50,75,125,200,250,300,375,450,500,625,750,875",
        def_sa: "7,5,4,4,3",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,1,0,0~0,0,8,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: new Date().getTime(),
        sa: "7,5,4,4,3",
        sb: "10,11,9,6,8",
        sc: "10.00,20.00,30.00,40.00,50.00,80.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "80.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "80.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;800,50,10,0,0;175,30,5,0,0;150,25,5,0,0;125,25,5,0,0;100,20,5,0,0;100,10,5,0,0;100,10,5,0,0;100,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.50",
        reel_set0: "5,7,6,4,10,9,4,5,7,6,9,7,11,11,11,11,10,8,4,7,6,9,5,10,6,8,3,4,10,5,7,9,6,10,4,9,5,8,9,6,10,3,7,6,10,8,9,10,6,9,5,3,10~7,2,2,2,2,2,4,8,5,9,1,10,6,9,4,7,8,11,11,11,11,10,6,9,4,8,3,9,5,10,4,9,1,7,5,9,3,8,5,4,9,8,3,7,4,8,5,9,6,10,1,8~3,2,2,2,2,2,8,5,9,1,10,4,8,7,3,8,6,5,8,4,7,1,8,5,9,6,8,9,2,2,2,8,10,6,8,5,7,1,8,6,9,11,11,11,11,8,6,3,9,5,8,10~10,2,2,2,2,5,6,4,7,10,3,7,11,11,11,11,9,5,7,3,10,1,7,6,9,4,7,8,9,3,7,4,10,6,7,1,8,7,3,9,5,7,8,6,7,9,6,7,4,5,8,3,10,4,9,1,7,3,5,8,6,9,7,4,10,3,9,1~7,2,2,6,4,3,9,5,8,6,4,7,6,10,7,6,12,9,4,5,7,6,10,5,7,4,10,6,7,4,9,6,8,3,6,9,5,3,10,6,7,5,4,8,9,6,10,4,7,6,8,4,9,12,10,6,7,4,10,9,5,6,10,8,4,7,8,10,4,8,5,9,6,10,9,4,7,8",
        s: "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9",
        reel_set2: "18,18,18,18~18,18,18,18~18,18,18,18~18,18,18,18~7,2,2,2,4,8,6,10,3,9,5,12,3,4,7,6,10,9,5,10,7,6,9,4,3,7,6,5,10,7,12,10,6,7,4,9,6,8,7,6,9,5,3,10,6,7,5,3,8,9,12,10,4,7,3,9,4,8,9,4,10,6,5,3,10,9,5,6,9",
        reel_set1: "5,7,6,3,10,9,4,5,7,6,9,7,11,11,11,11,11,9,5,10,6,8,3,4,10,5,7,9,6,10,4,9,5,8,9,6,10,3,7,6,8,10,9,6,11,11,11,11,11,7,4,10~7,2,2,2,2,2,2,2,2,2,3,8,5,9,1,10,6,9,4,11,11,11,11,11,5,10,6,9,4,8,3,9,5,10,4,9,1,7,5,9,11,11,11,11,11,8,3,7,4,8,5,9,6,10,1,8~8,2,2,2,2,2,2,2,2,2,2,2,5,9,1,10,4,8,7,9,8,6,5,8,4,7,1,8,5,9,11,11,11,11,11,4,10,8,6,5,8,7,1,8,6,9,11,11,11,11,11,6,8,9,5,8,3~10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,3,7,11,11,11,11,11,5,7,3,10,1,7,6,9,4,7,8,9,3,7,4,10,6,7,1,8,7,3,9,5,7,8,6,11,11,11,11,11,11,5,8,10,4,9,1,7,3,5,8,6,9,7,4,10,3,9,1~7,2,2,8,6,10,3,9,5,12,3,4,7,6,10,7,6,12,9,4,8,7,6,12,5,7,4,10,6,7,12,9,6,8,3,6,9,5,4,10,6,7,12,4,8,9,6,10,12,7,6,8,4,9,12,10,6,7,3,10,9,12,6,10,4,8,7,12,10,4,8,5,9,6,12,10,4,7,8"
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
        balance: "100,000.00",
        balance_cash: "100,000.00",
        index: 1,
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
        l: 25,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
        msr: 17
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

    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
    }

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

    result["msr"] = player.machine.collectSymbol;
    if (player.machine.moneyFactors.length > 0) {
        result["mo"] = player.machine.moneyFactors.join(',');
        result["mo_t"] = player.machine.moneyTable.join(',');
    }
    if (player.machine.moneyView.length > 0) {
        result["s"] = Util.view2String(player.machine.moneyView);
        result["is"] = Util.view2String(player.machine.view);
    }
    if (player.machine.moneyTotalFactor > 0) {
        result["mo_c"] = 1;
        result["mo_tv"] = player.machine.moneyTotalFactor;
        result["mo_tw"] = player.machine.moneyTotalFactor * player.betPerLine;
    }
    if (player.machine.moneyExpanding != "" && player.machine.moneyExpanding != undefined) {
        result["ep"] = player.machine.moneyExpanding;
    }
    if (player.machine.moneyRespin != "" && player.machine.moneyRespin != undefined) {
        result["srf"] = player.machine.moneyRespin;
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 1;
        result["prg_m"] = "cp,acw";
        result["prg"] = `${player.machine.freeSpinBonusPot},${player.machine.freeSpinBonusPot * player.betPerLine}`;

        if (player.machine.currentGame == "FREE") {
            if (player.machine.freeSpinIndex <= player.machine.freeSpinLength) {
                result["na"] = "s";
                result["fs"] = player.machine.freeSpinIndex;
                result["fsmax"] = player.machine.freeSpinLength;
                result["fsmul"] = 1;
                result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
                result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            } else {
                //                 ->                 
                result["na"] = "s";
                result["fs_total"] = player.machine.freeSpinLength;
                result["fsmul_total"] = 1;
                result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
                result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
                result["w"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
                result["rs_c"] = 1;
                result["rs_m"] = 1;
                result["rs_p"] = 0;
                result["rs"] = "t";
            }
        } else if (player.machine.currentGame == "BASE") {
            //                                            
            result["na"] = "c";
            result["reel_set"] = 2;
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["prg_m"] = "cp,acw";
            result["prg"] = `${player.machine.freeSpinBonusPot},${player.machine.freeSpinBonusPot * player.betPerLine}`;
            result["rs_t"] = 1;
            result["rs_win"] = player.machine.winMoney;
            result["tw"] = player.machine.freeSpinWinMoney;
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
        counter: "2"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;