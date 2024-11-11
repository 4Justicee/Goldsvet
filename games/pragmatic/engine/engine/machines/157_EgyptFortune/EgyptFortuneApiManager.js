var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "11,12,10,11,12,1,3,1,2,2,7,10,12,12,7",
        balance: "100,000.00",
        rs_cfg_mask: "type,sym,sym_count,rs_count,game_stage",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "11",
        def_sb: "10,11,9,6,8",
        def_sa: "7,5,4,4,3",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~1,1,1,0,0~6,6,6,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"71428571\",max_rnd_win:\"500\"}}",
        stime: "1645609578120",
        rs_cfg_type: "aggregate",
        sa: "7,5,4,4,3",
        sb: "10,11,9,6,8",
        reel_set10: "10,4,10,3,10,4,10,4,10,3,10,4,10,4,10,3,10,4,10,4~10,3,10,4,10,3,10,3,10,3,10,4,10,3,10,3,10,4,10,3~3,4,10,4,3,4,10,4,3,4,10,4,3,4,10,4,3,10,3,4~10,4,10,3,10,3,10,2,10,3,10,4,10,3,10,3,10,3,10,4~3,4,10,4,10,4,10,4,10,4,10,4,3,4,10,4,3,10,3,4",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~5000,1000,100,25,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,600,50,0,0;800,400,25,0,0;500,200,20,0,0;400,100,15,0,0;300,90,15,0,0;200,80,12,0,0;150,70,10,0,0;100,60,8,0,0;60,50,5,0,0;50,40,4,0,0",
        l: "20",
        rtp: "96.50",
        rs_cfg: "l~2~2~2~bs;l~3~3~3~bs;l~4~3~3~bs;l~5~3~3~bs;l~6~4~4~bs;l~7~4~4~bs;l~8~4~4~bs;l~9~4~4~bs;l~10~5~5~bs;l~11~5~5~bs;l~12~5~5~bs;l~2~2~2~rs;l~3~3~3~rs;l~4~3~3~rs;l~5~3~3~rs;l~6~4~4~rs;l~7~4~4~rs;l~8~4~4~rs;l~9~4~4~rs;l~10~5~5~rs;l~11~5~5~rs;l~12~5~5~rs",
        reel_set0: "12,8,6,12,9,6,7,12,2,9,4,12,9,5,6,7,11,1,7,11,12,5,11,12,5,1,10,12,4,8,11,3,12,10,4,8~6,12,9,10,11,5,9,8,2,7,10,8,11,4,7,8,12,7,6,12,9,11,10,3,11,8,9,10,12,3,10,11,4,8,11,6~3,11,8,12,10,11,7,8,2,6,7,9,11,3,9,6,5,10,1,12,10,5,12,1,5,6,9,10,12,9,4,1,7,10,3,9~12,8,9,6,12,3,5,11,2,12,5,10,8,9,10,12,11,10,4,12,6,10,9,5,3,9,11,4,8,7,10,6,5,10,3,6~4,8,7,6,8,4,10,3,2,7,11,4,1,6,4,9,8,10,9,11,12,9,11,10,9,1,5,8,12,9,10,7,8,1,11,7",
        s: "11,12,10,11,12,1,3,1,2,2,7,10,12,12,7",
        reel_set2: "9,4,6,9,4,6,9,4,6,9,4,6,9,4,6,9,4,6,9,4~9,6,9,6,9,6,9,2,6,4,6,4,6,9,6,4,9,4,9,6~9,4,9,6,9,4,9,4,9,6,9,4,9,6,9,4,9,4,9,4~6,9,4,9,6,9,4,9,2,9,6,4,6,4,6,9,6,4,6,9~9,6,9,4,9,6,9,6,9,6,9,4,9,6,9,4,9,6,9,6",
        reel_set1: "9,7,12,9,7,12,9,7,12,9,7,12,9,7,12,9,7,12,9,7~7,12,9,12,9,7,12,2,12,7,12,7,9,7,12,7,12,7,12,7~9,7,12,9,7,12,9,7,12,9,7,12,9,7,12,9,7,12,9,7~12,9,12,9,12,7,9,2,12,9,12,9,12,9,12,9,12,9,12,9~9,7,12,9,7,12,9,7,12,9,7,12,9,7,12,9,7,12,9,7",
        reel_set4: "9,8,12,9,8,12,9,8,12,9,8,12,9,8,12,9,8,12,9,8~12,9,12,9,12,9,12,2,9,12,8,12,9,8,12,9,8,12,9,8~9,8,12,9,8,12,9,8,12,9,8,12,9,8,12,9,8,12,9,8~12,8,12,9,12,8,12,2,12,8,12,9,12,8,12,9,12,8,12,9~9,8,12,9,8,12,9,8,12,9,8,12,9,8,12,9,8,12,9,8",
        reel_set3: "11,5,11,3,11,3,11,5,3,11,3,11,5,11,3,11,5,3,11,5~5,11,5,3,5,11,5,2,5,11,5,11,5,11,3,11,5,11,5,11~11,5,11,5,11,5,11,3,11,5,11,5,11,3,11,5,11,5,11,3~11,5,11,5,11,5,11,2,5,11,3,11,5,11,3,11,5,11,3,11~11,3,11,3,11,5,11,3,11,5,11,3,11,3,11,3,11,3,11,3",
        reel_set6: "10,6,12,10,6,12,10,6,12,10,6,12,10,6,12,10,6,12,10,6~10,12,10,12,10,12,10,2,10,12,10,12,10,6,12,6,12,6,10,12~10,6,12,10,6,12,10,6,12,10,6,12,10,6,12,10,6,12,10,6~10,12,10,12,10,12,10,2,12,10,12,10,6,12,10,12,6,12,10,12~10,6,12,10,6,12,10,6,12,6,10,6,12,6,12,10,6,12,10,6",
        reel_set5: "10,11,4,10,11,4,10,11,4,10,11,4,10,11,4,10,11,4,10,11~10,11,10,11,10,11,10,2,10,11,10,11,10,11,4,11,10,11,10,11~10,11,4,10,11,4,10,11,4,10,11,4,10,11,4,10,11,4,10,11~10,11,10,11,10,11,10,11,10,11,10,11,10,4,2,11,10,11,10,11~10,11,4,10,11,4,10,11,4,10,11,4,10,11,4,10,11,4,10,11",
        reel_set8: "4,6,4,6,4,3,4,6,4,6,4,3,4,6,4,6,4,3,4,6~3,6,4,6,3,6,3,6,3,6,4,6,3,6,3,6,4,6,3,6~4,3,4,6,4,3,4,6,4,3,4,6,4,3,6,3,4,6,4,3~3,6,4,6,4,6,3,2,3,6,4,6,4,6,3,6,4,6,3,4~4,6,4,6,4,3,4,6,3,6,4,3,4,6,3,6,4,3,4,3",
        reel_set7: "5,4,5,3,5,4,5,3,5,4,5,3,5,4,5,4,5,3,5,4~3,4,3,4,5,4,3,4,3,4,5,4,3,4,3,4,5,4,3,4~5,3,5,3,5,4,5,3,5,3,5,3,5,4,3,4,5,3,5,4~5,4,5,3,5,4,5,3,5,2,5,3,5,4,5,3,5,3,5,3~5,4,5,3,5,4,5,3,5,4,5,3,5,4,3,4,5,3,5,4",
        reel_set9: "5,7,5,7,5,3,5,7,5,7,5,7,5,7,5,3,5,7,5,3~7,3,7,3,7,2,7,5,7,3,7,3,7,5,7,3,7,3,7,5~3,5,7,5,3,5,7,5,3,5,7,5,3,5,7,5,3,7,3,5~7,5,7,3,5,2,7,5,7,3,5,3,7,5,7,3,7,3,7,5~3,5,7,5,7,5,7,5,3,5,7,5,7,5,7,5,3,7,3,5",
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
        l: "20",
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
        if (player.machine.wildRespin == false && player.machine.prevRespinState == false && player.machine.currentGame != "FREE") {
            nextAction = "c";
        }
    }
    result["na"] = nextAction;
    // -----------------------------------------------------------
    if (player.machine.prevRespinState == false) {
        if (player.machine.wildRespin == true) {
            result["tw"] = player.machine.winMoney;
            result["w"] = player.machine.respinWinMoney;
            result["rs_win"] = player.machine.respinWinMoney;
            result["na"] = "s";
        }
    }

    if (player.machine.prevRespinState == true) {
        if (player.machine.wildRespin == true) {
            result["tw"] = player.machine.winMoney;
            result["w"] = player.machine.respinWinMoney;
            result["rs_win"] = player.machine.respinWinMoney;
            result["na"] = "s";
        }
    }

    if (player.machine.prevRespinState == true) {
        if (player.machine.wildRespin == false) {
            result["tw"] = player.machine.winMoney;
            result["w"] = player.machine.respinWinMoney;
            result["rs_win"] = player.machine.respinWinMoney;
            result["na"] = "c";
        }
    }
    // -----------------------------------------------------------

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.wildRespin) {
        result["rs_c"] = player.machine.respinIndex;
        result["rs_m"] = player.machine.respinMore;
        result["rs_p"] = player.machine.respinIndex - 1;
        if (player.machine.addRespinMore != 0) {
            result["rs_p"] = player.machine.addRespinMore;
        }
    }

    if (player.machine.rsStr != "") {
        result["rs"] = player.machine.rsStr;
    }

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
            result["n_rsl"] = player.machine.n_rsl.join();
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
            result["com"] = player.machine.freeSpinCom.join();
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["com"] = player.machine.freeSpinCom.join();
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
