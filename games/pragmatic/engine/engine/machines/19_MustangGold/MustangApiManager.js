var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {};
    result.def_s = "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9";
    result.bgid = "0";
    result.balance = "0.00";
    result.cfgs = "2491";
    result.ver = "2";
    result.mo_s = "11";
    result.index = "1";
    result.balance_cash = "0.00";
    result.reel_set_size = "2";
    result.def_sb = "10,11,9,6,8";
    result.mo_v = "25,50,75,125,200,250,300,375,450,500,625,750,875,0";
    result.def_sa = "7,5,4,4,3";
    result.bonusInit = '[{bgid:0,bgt:18,bg_i:"1000,200,100,50",bg_i_mask:"pw,pw,pw,pw"}]';
    result.mo_jp = "0";
    result.balance_bonus = "0.00";
    result.na = "s";
    result.scatters = "1~0,0,1,0,0~0,0,8,0,0~1,1,1,1,1";
    result.gmb = "0,0,0";
    result.bg_i = "1000,200,100,50";
    result.rt = "d";
    result.mo_jp_mask = "jpb";
    result.stime = "1631408415416";
    result.bgt = "18";
    result.sa = "7,5,4,4,3";
    result.sb = "10,11,9,6,8";
    result.sc = "10.00,20.00,40.00,60.00,80.00,100.00,200.00,400.00,800.00,1000.00,2000.00,3000.00,4000.00";
    result.defc = "100.00";
    result.sh = "3";
    result.wilds = "2~0,0,0,0,0~1,1,1,1,1";
    result.bonuses = "0";
    result.fsbonus = "";
    result.c = "100.00";
    result.sver = "5";
    result.n_reel_set = "0";
    result.bg_i_mask = "pw,pw,pw,pw";
    result.counter = "2";
    result.paytable = "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,50,10,0,0;300,50,10,0,0;250,25,10,0,0;200,25,10,0,0;100,15,5,0,0;100,15,5,0,0;100,15,5,0,0;100,15,5,0,0;0,0,0,0,0;0,0,0,0,0";
    result.l = "25";
    result.rtp = "95.54";
    result.reel_set0 = "5,7,6,3,10,9,4,5,7,6,9,7,11,11,11,11,8,10,6,9,5,10,6,8,3,4,10,5,7,9,6,10,4,9,5,8,9,6,10,3,7,6,8,10,8,4,7,10,6,9,5,3,10,7~7,2,2,2,2,2,9,3,8,5,9,1,10,6,9,4,7,8,11,11,11,11,7,9,4,8,3,9,5,10,4,9,1,7,5,9,3,8,5,4,9,10,6,9,3,7,4,8,5,9,6,10~3,2,2,2,2,2,8,5,9,1,10,4,8,7,3,8,6,5,8,4,7,6,8,5,9,6,3,9,8,3,10,2,2,2,2,2,8,6,8,5,7,1,8,6,9,3,10,11,11~10,2,2,2,2,2,9,8,5,4,7,1,10,3,7,11,11,11,11,4,9,3,10,1,7,6,9,4,7,8,6,9,3,7,4,10,6,7,1,8,7,3,9,5,7,1,8,6,7,9,5,7,9,6,7,4,5,8,3~7,2,2,2,2,8,6,10,3,9,5,8,3,4,7,6,10,9,5,10,7,6,9,4,3,7,6,10,5,7,12,10,6,7,4,9,6,8,7,6,9,5,3,10,6,7,5,3,8,9,6,10,4,7,3,9,4,9,8";
    result.s = "6,7,4,2,8,9,8,5,6,7,8,6,7,3,9";
    result.reel_set1 = "5,7,6,3,10,9,4,5,7,6,9,7,11,11,11,5,8,10,6,9,5,6,10,8,3,4,10,11,11~7,2,2,2,2,2,9,3,8,5,9,1,10,6,9,4,7,8,11,11,11,5,7,9,4,8,3,9~3,2,2,2,2,2,8,5,9,1,10,4,8,11,11,11,6,5,8,4,7,1,8,5,9,6,3,9~10,2,2,2,2,2,2,2,2,4,7,1,10,3,7,5,11,11,11,4,9,3,10,1,7,6,9,4,8~12,2,2,9,6,10,12,9,5,8,3,4,9,6,10,3,9,10,12,6,9,3,7,12,10,8,8,3";

    // API          
    result["stime"] = new Date().getTime();

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
        s: Util.view2String(player.machine.view)
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

    if (player.machine.moneyCache != null) {
        result["mo"] = player.machine.moneyCache.values;
        result["mo_t"] = player.machine.moneyCache.table;
    }
    if (player.machine.moneyTotalValue / player.betPerLine > 0) {
        result["mo_c"] = 1;
        result["mo_tv"] = player.machine.moneyTotalValue / player.betPerLine;
        result["mo_tw"] = player.machine.moneyTotalValue;
    }

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
            result["n_reel_set"] = 1;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
            result["na"] = "s";
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
        result["n_reel_set"] = 1;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
        }
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

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
}

module.exports = ApiManager;