var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        awt: "rsf",
        def_s: "8,7,4,9,8,6,7,4,9,8,3,7,7,6,6",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "1,7,5,3,5",
        def_sa: "6,2,3,11,8",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~500,20,5,2,0~15,15,15,0,0~3,3,3,1,1",
        gmb: "0,0,0",
        gameInfo: `{props:{max_rnd_sim:"1",max_rnd_hr:"18518518",max_rnd_win:"3000"}}`,
        stime: new Date().getTime(),
        sa: "6,2,3,11,8",
        sb: "1,7,5,3,5",
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,10000.00",
        defc: "200.00",
        sh: "3",
        wilds: "2~9000,2500,250,10,0~2,2,2,2,2",
        bonuses: "0",
        fsbonus: "",
        fs_aw: "t;t",
        c: "200.0",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;750,125,25,2,0;750,125,25,2,0;400,100,20,0,0;250,75,15,0,0;250,75,15,0,0;125,50,10,0,0;125,50,10,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,2,0",
        l: "10",
        rtp: "96.06",
        s: "8,7,4,9,8,6,7,4,9,8,3,7,7,6,6",
        reel_set: "0",
        reel_set_size: "3",
        reel_set0: "9,4,6,8,10,8,13,7,13,9,12,6,10,12,13,9,3,5,5,12,11,2,7,10,1,11,11~2,11,8,2,12,11,7,8,5,6,7,12,4,1,5,1,10,12,10,9,13,3,6,9,9,11,10~7,10,5,9,2,13,8,4,4,11,6,10,11,10,7,13,12,13,3,12,6,3,12,9,1,11,1,8,5~1,12,8,11,13,12,9,9,13,10,3,11,11,13,5,10,9,10,8,6,12,8,2,12,4,13,7,5~9,1,8,12,11,13,11,12,3,10,8,2,8,13,7,10,10,4,9,6,5,10,11,4,9,13,12,11,9,6,8,13,5,12,7",
        reel_set1: "6,10,9,11,12,1,9,12,12,2,7,10,6,5,11,5,2,4,8,7,13,13,9,8,11,13,10,3~2,5,12,10,13,7,12,8,10,12,10,9,7,1,4,5,9,6,11,11,2,3,6,2,8,11~3,4,11,2,7,6,5,13,10,6,12,11,9,7,9,13,3,8,13,10,12,12,5,10,1,8,11,4~11,8,2,11,8,10,3,12,10,1,5,13,4,12,8,13,11,9,13,9,12,12,5,7,10,9,6,13~8,9,13,6,12,2,5,1,10,12,9,12,3,13,11,7,8,8,10,10,11,4,9,11,8,5,13,11,10,13,4,6,7,12,9",
        reel_set2: "1,8,13,10,1,6,5,11,7,10,8,11,9,6,13,3,9,11,12,2,5,4,9,13,12,10,12,7~6,12,12,11,11,1,9,4,9,12,8,8,1,10,11,6,2,7,5,10,5,3,7,13,10~12,10,11,3,7,13,2,4,4,3,11,1,10,5,9,11,13,10,7,9,13,12,5,8,6,1,6,8,12~12,10,3,6,1,13,12,12,11,4,10,8,5,13,13,11,8,9,10,1,13,8,7,9,12,9,11,5,2~7,13,12,1,10,11,13,5,10,10,9,11,3,2,9,8,12,4,12,11,13,10,8,13,1,4,8,7,11,9,12,6,8,5,6,9",
        rt: "d",
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
        balance: 0,
        index: 1,  
        balance_cash: 0,
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
        l: 10,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);
    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    //                                              2                                      
    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
    }
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            //                                        3              mul       3                      
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 3;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["aw"] = "0";
        result["awt"] = "rsf";
        result["tw"] = player.machine.freeSpinWinMoney;
        result["w"] = player.machine.winMoney / 3;
        result["reel_set"] = 1;

        if (player.machine.currentGame == "FREE") {
            if (player.machine.winMoney > 0) {
                result["aw"] = "1";
            }
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 3;
            result["fswin"] = (player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney) / 3;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 3;
            result["fswin_total"] = (player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney) / 3;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
        // fsmul, fsmul_total    3                                                   
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