var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        wof_mask: "w,w,w,w,w,w,w,w,w,w,w,w",
        wof_set: "10,15,20,25,30,35,40,50,75,150,250,1000",
        def_s: "2,3,4,3,2,2,3,4,3,2,2,3,4,3,2",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "6,5,9,7,10",
        def_sa: "10,4,7,11,9",
        balance_bonus: "0.00",
        na: "s",
        pb_imw: "0.00;0.00;0.00",
        scatters: "1~0,0,0,0,0,0,0,0,0~12,11,10,9,8,0,0,0,0~1,1,1,1,1,1,1,1,1;12~0,0,0,0,0,0,0,0,0,0,0,0,0,0,0~15,14,13,12,11,10,9,8,7,6,5,0,0,0,0~1,1,1,1,1,1,1,1,1,1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        pb_iv: "2~aw~50;3~fs~8;4~bg~0",
        pb_iw: "0;0;0",
        gameInfo: '{props:{max_rnd_sim:"1",max_rnd_hr:"17241379",max_rnd_win:"1500"}}',
        pb_im: "r;r;r",
        stime: "1645594232179",
        sa: "10,4,7,11,9",
        sb: "6,5,9,7,10",
        sc: "10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;150,60,25,0,0;125,50,20,0,0;100,40,10,0,0;75,30,10,0,0;50,25,5,0,0;50,20,5,0,0;50,20,5,0,0;50,15,5,0,0;50,15,5,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.50",
        reel_set0: "7,4,4,10,9,5,7,6,11,4,4,8,10,7,9,10,4,4,3,3,10,11,5,10,6,7,8,6~2,2,9,5,11,5,9,4,4,8,5,8,6,11,9,5,11,9,5,11,2,2,11,9,5,8,11,9,8,3,3,5,8,9,10,7,5,10,9~11,7,10,8,7,7,8,3,3,11,6,8,1,1,1,8,10,6,8,3,3,4,4,8,11,11,6,11,9,3,3,5,6,10~2,2,2,2,3,3,8,10,4,4,7,1,1,1,7,10,11,7,5,7,11,7,5,10,9,4,4,5,8,5,6,7,4,4,3,3,10,4,8,11~10,10,3,5,8,3,3,10,1,1,1,7,9,4,4,5,3,3,7,5,9,10,10,9,3,3,10,6,11,4,4,8,5,10,4,5,11,8",
        s: "2,3,4,3,2,2,3,4,3,2,2,3,4,3,2",
        t: "243",
        reel_set1: "7,4,4,11,7,9,12,12,12,7,4,4,9,5,6,5,7,6,10,9,4,4,9,10,3,3,12,12,12,10,6,5,11,10,6,10,5,8,10~2,2,2,2,5,11,8,5,4,4,11,8,6,9,11,5,2,2,9,12,12,12,8,11,9,5,8,3,3,2,2,8,5,8,12,12,12,7,10~11,6,10,8,4,7,3,3,11,6,8,12,12,12,10,3,3,8,9,12,12,12,4,8,11,6,3,3,11,9,5,6~2,2,2,2,11,3,3,8,9,5,10,4,4,8,12,12,12,7,7,9,4,2,2,11,6,9,10,9,12,12,12,7,11,12,12,12,7,9,4,4,3,3,11,8~10,5,8,10,3,8,3,3,9,12,12,12,10,9,4,4,7,10,3,3,7,12,12,12,8,5,10,3,3,6,7,11,4,4,8,9,10,12,12,12,5",
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
        tw: "0.00",
        balance: "97,500.00",
        index: "2",
        balance_cash: "97,500.00",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "4,7,10,9,5",
        sb: "5,11,8,3,7",
        pb_mw: "5000.00;7500.00;15000.00",
        pb_m: "r;r;r",
        sh: "3",
        pb_v: "2~aw~2;3~aw~3;4~aw~6",
        pb_w: "0;0;0",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "4",
        s: Util.view2String(player.machine.view),
        w: "0.00",
    };

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    result["c"] = player.betPerLine;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }

    result["na"] = nextAction;

    //             
    var pb_m = [];
    var pb_mw = [];
    var pb_v = [];
    var pb_w = [];

    for (var i = 0; i < player.machine.jewelTable.length; i++) {
        if (player.machine.jewelTable[i] != "") {
            var multi = player.machine.jewelMulti[i];
            if (player.machine.jewelTable[i] == "bg") multi = 0;

            pb_v.push(`${i}~${player.machine.jewelTable[i]}~${multi}`);
            pb_mw.push(player.virtualBet * multi);
            pb_w.push(player.machine.jewelWins[i]);
            pb_m.push("r");
        }
    }

    result["pb_m"] = pb_m.join(";");
    result["pb_mw"] = pb_mw.join(";");
    result["pb_v"] = pb_v.join(";");
    result["pb_w"] = pb_w.join(";");

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS") {
            //                       
            result["bgid"] = "0";
            result["bgt"] = "22";
            result["bw"] = "1";
            result["coef"] = player.virtualBet;
            result["end"] = "0";
            result["level"] = "0";
            result["lifes"] = "1";
            result["rw"] = "0";
            result["wof_mask"] = "w,w,w,w,w,w,w,w,w,w,w,w";
            result["wof_set"] = "10,15,20,25,30,35,40,50,75,150,250,1000";
            result["wp"] = "0";
            result["na"] = "b";
        } else if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["n_reel_set"] = 1;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.freeSpinMore > 0) {
            result["fsmore"] = player.machine.freeSpinMore;
        }

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

        //                             
        if (player.machine.freeBonusFlag) {
            result["bgid"] = "0";
            result["bgt"] = "22";
            result["bw"] = "1";
            result["coef"] = player.virtualBet;
            result["end"] = "0";
            result["level"] = "0";
            result["lifes"] = "1";
            result["rw"] = "0";
            result["wof_mask"] = "w,w,w,w,w,w,w,w,w,w,w,w";
            result["wof_set"] = "10,15,20,25,30,35,40,50,75,150,250,1000";
            result["wp"] = "0";
            result["na"] = "b";
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        tw: "50,000.00",
        wof_mask: "w,w,w,w,w,w,w,w,w,w,w,w",
        wof_set: "10,15,20,25,30,35,40,50,75,150,250,1000",
        bgid: "0",
        balance: "210,000.00",
        coef: "2500.00",
        level: "1",
        index: "94",
        balance_cash: "210,000.00",
        balance_bonus: "0.00",
        na: "cb",
        rw: "50,000.00",
        stime: "1645596116947",
        bgt: "22",
        lifes: "0",
        wp: "20",
        end: "1",
        sver: "5",
        counter: "188",
        wof_wi: "2",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["rw"] = player.machine.winMoney;
    result["tw"] = player.machine.moneyBonusWin;

    result["wof_wi"] = player.machine.bonusIndex;
    result["wp"] = player.machine.bonusMulti;

    //                             
    if (player.machine.freeBonusFlag) {
        result["na"] = "s";
        result["fs"] = player.machine.freeSpinIndex;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = 1;
        result["fswin"] = 0;
        result["fsres"] = 0;
        result["n_reel_set"] = 1;
        result["tw"] = player.machine.freeSpinWinMoney;
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