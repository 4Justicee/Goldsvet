var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,7,4,3,8,9,8,5,6,7,8,6,7,3,9",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "3",
        def_sb: "9,3,7,11,12",
        def_sa: "2,4,2,3,9",
        reel_set: "0",
        prg_cfg_m: "s",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,8,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1645602945656",
        sa: "2,4,2,3,9",
        sb: "9,3,7,11,12",
        sc: "10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,150.00,250.00,500.00,1000.00,2500.00,5000.00",
        defc: "50.00",
        prg_cfg: "2",
        sh: "3",
        wilds: "2~500,250,100,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "50.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;250,150,50,0,0;200,120,25,0,0;200,120,25,0,0;150,100,15,0,0;150,100,10,0,0;125,100,10,0,0;125,50,10,0,0;120,25,5,0,0;100,20,5,0,0;100,20,5,0,0",
        l: "20",
        rtp: "95.50",
        reel_set0: "6,11,6,9,9,9,2,9,8,8,8,3,1,6,9,6,11,9,3,11,7,10,12,5,4~4,7,11,12,3,11,11,11,5,9,10,2,7,10,10,2,4,8,10,2,5,5,7,11,7,10,11,6,4,10,11,10,5,7~6,3,12,7,12,2,9,8,1,12,4,2,7,10,2,8,4,6,6,6,12,2,5,8,1,12,3,6,7,12,12,7,12,1,10,11,7,12,12,10~2,12,11,12,11,9,9,9,8,8,12,7,3,11,11,4,12,12,11,7,12,10,12,4,11,3,11,12,4,6,11,10,11,6,10,5,12,12,10,11,10,10,10,7,11,10,11,10,11,11,7,6,10,7,12,7~6,7,12,2,11,12,11,9,7,9,10,12,4,11,1,7,12,5,11,10,11,10,10,6,12,12,10,11,10,7,11,6,9,8,9,10,11,5,3,12,7,12,8,8,8,12,7,12,11,10,5",
        s: "6,7,4,3,8,9,8,5,6,7,8,6,7,3,9",
        reel_set2: "6,11,6,9,2,9,8,8,8,3,12,8,10,6,5,8,10,8,5,5,5,8,4,5,8,9,9,6,9,9,9,11,3,12,11,6,9,6,11,9,3,11,7~4,10,10,4,10,5,3,12,4,8,8,8,11,5,9,11,12,5,9,10,10,4,9,5,5,5,9,6,7,11,11,2,5,11,7,10,7,11,7,11,7,11,7,10,11,4,10,11,10,5,7~6,6,6,3,12,7,12,2,9,8,12,4,7,10,8,4,7,12,10,11,7,12,12,10,5~2,12,11,12,11,9,7,6,9,8,8,8,9,5,6,3,7,5,9,4,9,10,10,5,9,9,6,9,5,3,11,11,12,4,6,11,10,11,6,10,5,12,12,10,11,10,7,11,10,11,10,11,7~6,7,12,2,3,11,12,11,9,7,9,8,7,12,5,11,10,11,10,10,6,12,12,10,11,10,7,4,11,10,11,10,11,11,6,9,8,8,8,9,10,11,5,12,7,12,10,5",
        reel_set1: "6,11,6,9,2,9,8,3,12,8,10,6,5,5,5,2,8,9,8,6,8,8,8,9,6,4,6,9,9,6,9,9,9,11,3,12,11,6,9,6,11,9,3,11,7~4,7,11,12,11,5,5,5,3,9,10,10,10,2,7,11,7,11,6,7,11,7,10,11,11,11,4,10,11,10,5,7,8,8,8~6,6,6,3,12,7,12,2,9,8,12,4,7,12,10,11,5,7,12,12,10~2,12,11,12,11,9,9,9,8,8,12,7,10,10,6,8,2,8,10,7,8,6,12,6,3,11,11,4,12,12,11,7,12,10,12,4,11,3,11,12,4,6,11,10,11,6,10,5,12,12,10,11,10,7,11,10,11,10,11,11,7,6,10,7,12,7~6,7,12,2,11,12,11,9,7,9,8,12,2,10,3,8,4,5,12,4,10,3,8,8,9,8,12,12,11,7,10,12,4,11,7,12,5,11,10,11,10,10,6,12,10,11,11,6,9,8,9,10,11,5,12,7,12,8,12,7,12,11,10,5",
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
        tw: player.machine.winMoney,
        balance: "100,116.81",
        index: "10",
        balance_cash: "100,116.81",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "11,9,6,9,4",
        sb: "7,3,9,8,10",
        sh: "3",
        c: player.betPerLine,
        sver: "5",
        counter: "20",
        l: "25",
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

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
            result["sn"] = player.machine.nugeStr;
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fsmore"] = player.machine.fs_more;
            result["prg_m"] = "cp,lvl,tp";
            result["prg"] = player.machine.prgStr;

            if (player.machine.rwdStr != "") {
                result["rwd"] = player.machine.rwdStr;
                result["is"] = player.machine.preView;
            }
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["prg_m"] = "cp,lvl,tp";
            result["prg"] = player.machine.prgStr;

            if (player.machine.rwdStr != "") {
                result["rwd"] = player.machine.rwdStr;
                result["is"] = player.machine.preView;
            }
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

module.exports = ApiManager;