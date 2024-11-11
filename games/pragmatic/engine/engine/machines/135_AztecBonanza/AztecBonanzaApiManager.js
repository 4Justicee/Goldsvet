var Util = require('../../../utils/slot_utils');

function ApiManager() {};

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: "11",
        def_s: "12,12,8,12,12,12,3,4,8,12,7,5,4,3,3,7,5,3,3,3,12,9,6,9,12,12,12,6,12,12",
        balance: "100,000.00",
        cfgs: "1",
        nas: "12",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "13",
        def_sb: "5,9,3,10,3",
        def_sa: "4,9,7,9,10",
        reel_set: "0",
        prg_cfg_m: "cp",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{props:{max_rnd_sim:\"1\",max_rnd_hr:\"125000000\",max_rnd_win:\"3000\"}}",
        stime: new Date().getTime(),
        sa: "4,9,7,9,10",
        sb: "5,9,3,10,3",
        reel_set10: "11,11,4,4,4,7,7,7,6,6,10,10,10,3,3,6,6,6,11,11,5,5,8,8,7,7,11,11,7,7,7,11,11,5,5,5,9,9~9,9,6,6,9,9,9,3,3,7,7,11,11,10,10,10,8,8,11,11,9,9,9,5,5,4,4,4,6,6,6,11,11,5,5,5,11,11~6,6,5,5,5,10,10,10,8,8,11,11,7,7,7,9,9,11,11,5,5,11,11,10,10,10,3,3,4,4,4,11,11,6,6,6,10,10~11,11,5,5,5,6,6,9,9,6,6,6,3,3,5,5,10,10,7,7,3,7,7,7,4,4,4,10,10,10,8,8,11,11,9,9,4,4~9,9,10,10,10,4,4,6,6,6,4,4,4,5,5,11,11,6,6,5,5,5,8,8,7,7,9,9,9,3,3,10,10,7,7,7",
        sc: "6.00,10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00",
        defc: "60.00",
        prg_cfg: "1",
        reel_set11: "3,3,7,7,11,11,7,7,7,6,6,11,11,4,4,4,5,5,6,6,6,11,11,9,9,11,11,10,10,10,8,8,7,7,7,5,5,5~4,4,4,11,11,8,8,8,3,3,7,7,5,5,11,11,9,9,10,10,10,11,11,6,6,11,11,6,6,6,8,8,5,5,5,8,8,8~6,6,6,11,11,3,3,11,11,10,10,10,5,5,10,10,10,5,5,5,7,7,7,4,4,4,10,10,6,6,9,9,11,11,8,8,11,11~3,3,11,11,4,4,10,10,9,9,11,11,4,4,4,5,5,5,7,7,3,3,3,8,8,7,7,7,6,6,6,6,8,8,6,6,10,10,10,5,5~8,8,3,3,3,4,4,3,3,8,8,8,10,10,10,6,6,9,9,4,4,4,10,10,5,5,5,11,11,7,7,6,6,6,7,7,7,8,8,5,5",
        reel_set12: "7,7,10,3,3,5,5,11,11,11,6,6,6,7,7,11,11,8,8,6,6,5,5,5,9,9,9,7,7,7,11,11,4,4,4,11,11~6,6,6,11,11,10,10,11,11,11,8,8,8,3,3,8,8,8,5,5,4,4,4,11,11,6,6,7,7,8,8,5,5,5,11,11,9,9,9~3,3,11,11,9,9,9,4,4,4,10,10,11,11,8,8,9,9,9,7,7,7,6,6,6,11,11,5,5,9,9,6,6,11,11,5,5,5~11,11,3,3,3,6,6,6,7,7,5,5,9,9,9,4,4,7,7,7,9,9,5,5,5,4,4,4,3,3,6,6,11,11,8,8~9,9,6,6,6,5,5,5,11,11,3,3,3,7,7,10,10,8,8,8,6,6,9,9,9,7,7,7,4,4,4,3,3,8,8,4,4,8,8,5,5",
        sh: "6",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "60.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;75,30,15,0,0;30,15,10,0,0;30,15,10,0,0;15,8,5,0,0;15,8,5,0,0;10,5,3,0,0;10,5,3,0,0;10,5,3,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "30",
        rtp: "96.53",
        reel_set0: "7,7,10,10,4,10,10,7,7,10,6,5,7,7,9,9,3,8,8,6,6,10,10~9,9,9,6,9,9,3,3,6,5,5,7,8,8,9,9,8,4,10,10,7,5,5~6,4,4,8,8,4,4,8,9,8,8,6,6,6,9,9,6,6,3,7,7,10,10,10,6,6,7,10,8,8,5,4~6,6,3,3,9,9,4,4,8,8,4,4,7,7,4,4,4,6,6,7,7,8,8,5,5,10,10,6,6,8,8,3,3,9,9,10,10,5,5,8,8,5,5,10,10,6,6,7,7,10,10,6,6,10,10,3,3,4,4,5,5,8,8,9,9,7,7,9,9,10,10,9,9,3,3,4,4,7,7,3,3~3,3,7,7,6,6,5,5,8,8,6,6,9,9,8,8,10,10,7,7,3,3,10,10,5,5,4,4,8,8,4,4,5,5,9,9,10,10,6,6,8,8,7,7,6,6,10,10,9,9,4,4,4,3,3,5,5,10,10,3,3,7,7,8,8,10,10,7,7,9,9,3,3,6,6,4,4,9,9",
        s: "12,12,8,12,12,12,3,4,8,12,7,5,4,3,3,7,5,3,3,3,12,9,6,9,12,12,12,6,12,12",
        reel_set2: "6,6,9,6,6,6,4,6,5,8,8,3,4,4,10,10,10,9,9,8,8,7,7,10,4,4,8,7~7,7,10,10,7,7,6,10,4,6,6,4,8,8,5,3,10,10,9,9,5~8,7,5,5,9,9,4,3,3,5,5,9,9,9,10,10,7,9,9,8,8,4,3,3,6~4,4,9,9,6,6,10,10,6,6,3,3,10,10,4,4,8,8,6,6,9,9,10,10,5,5,6,6,5,5,6,6,3,3,9,9,10,10,7,7,10,10,8,8,7,7,5,5,4,4,4,8,8,6,6,3,3,9,9,3,3,4,4,7,7,3,3,4,4,5,5,7,7,10,10,8,8,7,7,8,8,9,9~10,10,7,7,4,4,8,8,9,9,8,8,5,5,7,7,3,3,6,6,9,9,10,10,8,8,5,5,6,6,4,4,5,5,7,7,8,8,4,4,7,7,6,6,8,8,9,9,3,3,9,9,10,10,9,9,10,10,3,3,6,6,3,3,5,5,10,10,7,7,4,4,7,7,9,9,3,3,6,6,4,4,4,10,10,8,8",
        t: "243",
        reel_set1: "4,5,5,9,9,3,3,6,8,8,5,5,8,3,3,7,9,9,9,4,10,10,9,9~9,9,5,4,4,7,10,10,10,6,6,6,8,8,4,8,8,6,6,3,8,5,6,7,7,9,10,6,6~5,3,7,7,6,10,10,9,9,6,6,10,4,8,8,5,4,10,10,7,7~4,4,10,10,7,7,3,3,7,7,3,3,6,6,7,7,9,9,8,8,7,7,8,8,10,10,8,8,10,10,9,9,5,5,4,4,6,6,4,4,6,6,7,7,9,9,5,5,10,10,8,8,9,9,8,8,6,6,4,4,3,3,6,6,9,9,6,6,10,10,9,9,10,10,7,7,3,3,5,5,4,4,4,3,3,5,5~10,10,3,3,8,8,7,7,3,3,7,7,8,8,9,9,7,7,6,6,4,4,7,7,10,10,3,3,9,9,4,4,4,6,6,9,9,4,4,5,5,4,4,8,8,10,10,6,6,10,10,5,5,6,6,10,10,8,8,3,3,6,6,9,9,7,7,9,9,3,3,5,5,6,6,8,8,10,10,9,9,5,5,7,7",
        reel_set4: "5,5,5,8,8,4,4,4,8,8,8,10,10,10,10,6,6,6,5,5,8,8,8,7,7,7,3,3,3,9,9,9,9~4,4,10,10,10,6,6,6,10,10,10,8,8,8,8,4,4,4,10,10,5,5,5,9,9,9,9,3,3,3,7,7,7~7,7,7,9,9,4,4,4,9,9,9,10,10,10,10,3,3,3,5,5,5,7,7,6,6,6,8,8,8,8~6,6,6,3,3,3,7,7,7,10,10,10,8,8,8,5,5,5,9,9,9,4,4,4,5,5,3,3,3~4,4,10,10,10,9,9,9,8,8,8,5,5,5,7,7,7,4,4,4,3,3,3,6,6,6",
        reel_set3: "6,6,7,7,6,6,9,9,7,7,6,6,9,9,7,7,10,10,4,4,9,9,4,4,7,7,6,6,9,9,7,7,8,8,4,4,6,6,3,3,5,5,9,9,8,8,10,10~9,9,3,3,9,9,4,4,6,6,7,7,9,9,10,10,6,6,7,7,5,5,9,9,8,8,6,6,4,4,9,9,10,10,6,6,7,7,4,4,7,7~8,8,3,3,8,8,8,10,10,9,8,8,5,5,4,4,10,10,6,6,9,9,9,5,5,7,7,10,10~8,8,7,7,8,8,9,9,4,4,9,9,8,8,10,10,6,6,8,8,5,5,3,3,10,10,7,7~5,5,8,8,6,6,4,4,6,6,3,3,6,6,9,9,8,8,3,3,10,10,9,9,8,8,7,7,10,10,7,7,8,8",
        reel_set6: "11,11,8,8,8,11,11,9,9,6,6,3,11,11,8,8,7,7,7,5,5,5,7,7,4,4,10,10,10,8,8,8,11,11,11,6,6,6~11,11,9,9,8,8,11,11,10,10,10,11,11,4,4,7,7,6,6,6,11,11,11,5,5,5,3,3,9,9,9,6,6,11,11,9,9,9~7,7,7,11,11,5,5,11,11,11,6,6,8,8,8,10,10,10,7,7,10,10,6,6,6,9,9,10,10,10,3,3,11,11,4,4,11,11~10,10,10,11,11,5,5,9,9,6,6,6,3,3,8,8,8,10,10,7,7,4,4,3,3,3,9,9,7,7,7,8,8,6,6,5,5,5~3,3,3,6,6,9,9,5,5,5,9,9,7,7,9,9,9,6,6,6,7,7,7,10,10,10,8,8,10,10,8,8,8,5,5,3,3,4,4,11,11",
        reel_set5: "8,8,8,11,11,7,7,3,3,6,6,6,7,7,7,10,10,10,11,11,8,8,11,11,6,6,4,4,8,8,8,9,9,11,11,5,5,5~5,5,5,8,8,11,11,7,7,7,6,6,7,7,4,4,11,11,9,9,11,11,6,6,6,10,10,10,3,3,9,9,9,11,11,9,9,9~11,11,6,6,6,11,11,10,10,6,6,10,10,10,7,7,3,3,11,11,5,5,5,8,8,8,7,7,7,11,11,4,4,10,10,10,9,9~9,9,10,10,8,8,8,7,7,7,8,8,6,6,5,5,5,9,9,3,3,10,10,10,7,7,4,4,11,11,4,4,4,6,6,6,5,5~4,4,4,7,7,7,5,5,5,10,10,10,6,6,6,9,9,5,5,7,7,9,9,11,11,8,8,8,4,4,10,10,3,3,8,8,9,9,9,6,6",
        reel_set8: "8,8,8,7,7,11,11,6,6,5,5,11,11,11,4,4,8,8,11,11,3,3,10,10,10,8,8,8,9,9,5,5,5,11,11~9,9,7,7,7,11,11,8,8,4,4,6,6,9,9,9,11,11,9,9,9,10,10,10,11,11,3,3,5,5,11,11,11,5,5,5,9,9,7,7~10,10,11,11,7,7,7,6,6,4,4,4,10,10,10,5,5,11,11,8,8,8,11,11,11,7,7,10,10,10,3,3,11,11,9,9,11,11~4,4,11,11,8,8,8,9,9,6,6,9,9,7,7,7,3,3,10,10,10,4,4,4,5,5,5,8,8,3,3,3,5,5,7,7,10,10~10,10,10,9,9,4,4,4,3,3,3,5,5,3,3,8,8,9,9,9,7,7,7,5,5,5,7,7,11,11,9,9,6,6,4,4,10,10,8,8,8",
        reel_set7: "8,8,11,11,10,10,10,11,11,6,6,3,3,9,9,11,11,11,7,7,7,5,5,8,8,8,4,4,4,6,6,6,11,11,8,8,8,7,7~9,9,9,11,11,9,9,9,11,11,11,10,10,10,7,7,7,6,6,5,5,9,9,3,3,11,11,9,9,7,7,8,8,11,11,4,4,4~5,5,4,4,4,7,7,7,11,11,3,3,11,11,6,6,11,11,7,7,10,10,10,9,9,11,11,10,10,10,6,6,6,8,8,8,10,10~9,9,4,4,4,6,6,6,11,11,6,6,5,5,7,7,7,10,10,3,3,10,10,10,8,8,8,4,4,8,8,9,9,7,7,3,3,3~9,9,9,3,3,3,11,11,4,4,4,10,10,5,5,3,3,10,10,10,8,8,8,7,7,7,8,8,9,9,6,6,6,7,7,9,9,6,6,4,4",
        reel_set9: "11,11,9,9,11,11,5,5,5,11,11,11,8,8,4,4,6,6,10,10,10,7,7,8,8,8,3,3,5,5,11,11,8,8,8,6,6,6~5,5,5,9,9,9,8,8,9,9,9,10,10,10,3,6,6,11,11,11,6,6,6,9,9,11,11,7,7,4,4,4,11,11,5,5,11,11,9,9~6,6,6,11,11,11,7,11,11,9,9,10,10,10,4,4,4,3,3,5,5,8,8,8,11,11,10,10,10,5,5,5,6,6,10,10,11,11~4,4,8,8,8,7,7,8,3,3,3,9,9,4,4,4,3,3,10,10,5,5,5,6,6,9,9,11,11,11,10,10,10,11,11,6,6,6,5,5~6,6,9,9,6,6,6,10,10,5,5,5,3,3,3,4,4,3,3,5,5,11,11,11,8,9,9,9,10,10,10,4,4,4,9,9,7,7,8,8,8"
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
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0",
        na: "s",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: "6",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "30",
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

    if (player.machine.prevTumbleStatus == "NOTUMBLE") {
        result["reel_set"] = player.machine.reelNo;
    }

    if (player.machine.tumbleStatus == "TUMBLE") {
        result["na"] = "s";
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = player.machine.tumbleIndex;
        result["rs"] = "t";
        result["tmb_win"] = player.machine.tmb_res;
        result["tmb"] = player.machine.tumbles;
        result["tw"] = player.machine.tmb_res;
    } else if (player.machine.prevTumbleStatus == "TUMBLE") {
        if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
        } else {
            result["na"] = "s";
        }
        result["rs_t"] = player.machine.tumbleIndex;
        result["tmb_res"] = player.machine.tmb_res;
        result["tmb_win"] = player.machine.tmb_res;
        result["tw"] = player.machine.tmb_res;
    }

    if (prevGameMode == "BASE") {
        result["prg_m"] = "cp";
        result["prg"] = player.machine.tumbleIndex + 1;

        if (player.machine.tumbleIndex == 2) {
            result["ds"] = player.machine.brokenSymbolInfos;
            result["dsa"] = "0;0;0";
            result["dsam"] = "v;v;v";
            result["msr"] = player.machine.mysterySymbol;
            result["is"] = Util.view2String(player.machine.originView);
        } else if (player.machine.tumbleIndex == 4) {
            result["ds"] = player.machine.brokenSymbolInfos;
            result["dsa"] = "0;0;0";
            result["dsam"] = "v;v;v";
            result["srf"] = player.machine.replacingInfos;
            result["is"] = Util.view2String(player.machine.originView);
        } else if (player.machine.tumbleIndex == 6) {
            result["ds"] = player.machine.brokenSymbolInfos;
            result["dsa"] = "0;0;0";
            result["dsam"] = "v;v;v";
        } else if (player.machine.tumbleIndex == 8) {
            result["ds"] = player.machine.brokenSymbolInfos;
            result["dsa"] = "0;0;0";
            result["dsam"] = "v;v;v";
        }

        //                    
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.fsWinMoney;
            result["fswin"] = player.machine.fsWinMoney;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.prevTumbleStatus == "NOTUMBLE") {
            if (player.machine.mysterySymbol > 0) {
                result["msr"] = player.machine.mysterySymbol;
            }
            if (player.machine.replacingInfos.length > 0) {
                result["srf"] = player.machine.replacingInfos;
            }
            if (player.machine.originView.length > 0) {
                result["is"] = player.machine.originView;
            }
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            if (player.machine.freeSpinIndex <= 5) {
                result["fs"] = player.machine.freeSpinIndex;
                result["fsmax"] = player.machine.freeSpinLength;
                result["fsmul"] = 1;
                result["fsres"] = player.machine.fsWinMoney;
                result["fswin"] = player.machine.fsWinMoney;
            } else {
                result["fs_total"] = player.machine.freeSpinLength;
                result["fsend_total"] = 0;
                result["fsmul_total"] = 1;
                result["fsres_total"] = player.machine.fsWinMoney;
                result["fswin_total"] = player.machine.fsWinMoney;
            }

        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsend_total"] = 1;
            result["fsmul_total"] = 1;
            result["fsres_total"] = player.machine.fsWinMoney;
            result["fswin_total"] = player.machine.fsWinMoney;
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