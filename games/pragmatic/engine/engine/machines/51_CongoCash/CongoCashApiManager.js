var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "6,7,4,10,8,9,8,5,6,7,8,6,7,3,9,10,4,3,7,8",
        balance: "0.00",
        nas: "15",
        cfgs: "4531",
        accm: "def~jwt~ma~fgc~h",
        ver: "2",
        acci: "0",
        index: "1",
        balance_cash: "0.00",
        def_sb: "10,11,3,4,7",
        reel_set_size: "9",
        def_sa: "8,7,5,6,5",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        accv: "1~cv,cv,fg,cv,fg,cv,jp3,cv,fg,cv,cv,cv,cv,fg,cv,cv,fg,jp2~125,300,20,125,20,1000,500,400,20,125,800,1500,125,20,1000,300,20,2000~0,0,50,0,15,0,0,0,20,0,0,0,0,15,0,0,10,0~6",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: `{props:{max_rnd_sim:"1",max_rnd_hr:"4224757",jwt_jp:"jp1, jp2, jp3",max_rnd_win:"2200",ma_jp:"40000, 2000, 500"}}`,
        wl_i: "tbm~2200",
        stime: "1646037767328",
        sa: "8,7,5,6,5",
        sb: "10,11,3,4,7",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,50,20,10,0;50,20,10,0,0;40,20,10,0,0;20,15,5,0,0;20,15,5,0,0;15,10,5,0,0;15,10,5,0,0;15,10,5,0,0;15,10,5,0,0;15,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "94.50",
        reel_set0: "8,13,13,13,13,10,11,5,3,6,12,1,9,4,7,13,10,5,13,7,3,7,5,11,7,13,12,13,11,5,12,13,10,7,10,12,13,12,13,12,5,13,10,7,11,10,13,12,13,5,7,12,13,10,5,10,6,13,5,13,7,13,5,11,10,6,3,13,10,13,12,9,13,11,13,11,13,12,11,10,12,13,12,10,12,10,12,5,10,7,5,7,10,7,3,10,13,10,5,10,11,12,3,10~5,13,13,13,7,12,13,10,8,3,9,6,11,2,4,14,13,10,2,13,2,7,11,6,8,2,13,8,10,3,12,8,13,12,2,6,10,2,13,3,8,13,2,11,10,2,8,2,11,8,3,10,11,2,3,13,2,13,2,14,3,13,8,10,12,2,11,7,11,13,10,2,13,8,12,8,13,11,12,13,14,8,10,13,12,6,13,4,13,11,14,3,6,11,12,10,8,2,14,10,6,10,2,13,11,12,10,8,14,9,3,8,10,2,13,12,2,9,7,2,11,14,13,10,4,6,9,13,11~13,13,13,13,10,2,3,12,4,7,6,5,11,14,8,9,11,10,2,3,12,11,12,14,8,12,2,11,6,11,14,10,2,14,12,6,12,3,12,11,12,14,3,11,14,12,14,12,8,12,3,14,12,8,14,3,4,8,10,8,12,6,2,3,6,14,8,5~2,10,3,13,13,13,4,5,9,7,8,6,14,13,12,11,14,3,12,14,3,13,12,13,8,4,7,5,6,14,4,8,7,12,6,7,14,11,14,11,6,13,3,14,6,3,9,13,14,11,9,4,7,3,6,11,13,14,3,13,7,4,13,14,10,13,6,13,11,3,8,12,14,10,3,13,12,13,14,6,13,14,4,14,4,7,6,5~10,3,4,8,1,12,13,9,7,6,11,2,5,3,9,3,2,8,2,11,3,7,6,8,3,2,3,6,11,12,3,12,5,6,12,9,4,3,12,3,7,4,2,9,8,7,5",
        s: "6,7,4,10,8,9,8,5,6,7,8,6,7,3,9,10,4,3,7,8",
        accInit: `[{id:0,mask:"jwt; ma; fgc",fgc:"15, 12, 10, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 100, 50, 0, 0, 0, 0",ma:"20, 20, 20, 20, 2000, 500, 1000, 500, 400, 300, 240, 200, 150, 125, 100, 20, 800, 600, 320, 20, 20, 40000, 4000, 2000, 1500",jwt:"fg, fg, fg, fg, jp2, jp3, cv, cv, cv, cv, cv, cv, cv, cv, cv, fg, cv, cv, cv, fg, fg, jp1, cv, cv, cv"},{id:1,mask:"jwt; ma",ma:"2000, 500, 1000, 500, 400, 300, 240, 200, 150, 125, 100, 800, 600, 320, 40000, 4000, 2000, 1500",jwt:"jp2, jp3, cv, cv, cv, cv, cv, cv, cv, cv, cv, cv, cv, cv, jp1, cv, cv, cv"}]`,
        reel_set2: "3,11,12,7,10,1,6,5,9,4,8,12,5,9,8,11,5,12,9,12,1,7,6,5,11,6,12,1,6,10,7,4,12,7,12,5,10,4,11,9,7,5,8,9,12,9,7,9,12,9,5,11,12,5,12,1,11,5,12,9~2,2,2,5,3,9,11,14,4,2,10,12,7,8,6,3,12,10,5,11,5,10,11,5,10,11,5,12,11,6~14,12,4,9,10,8,5,11,6,2,7,3,11,5,11,2,3,10,11,7,2,11,8,11,3,8,10,2,11,7,2,6,5,2,5,8,4,11,2,7,4,6,12,2,10~2,5,8,7,9,3,11,12,10,14,4,6,14,6,14,5,14,11,9,11,4,14,11,9,11,14,11,8,14,9,14,9,11,12,10,14,12,9,14,6,14,9,5,8,11,9,12,6,14,6,14,11,9,7,8,5,11,14~2,4,1,6,8,5,9,12,7,11,10,3,1,3,11,4,7,4,7,6,7,11,10,8,7,1,11,6,11,7,10,11,7,11,3,6,4,7,10,1,6,1,8,1,3,6,4,10,6,7,6,10,7,4,3,1,6,8,6,10,3,11,10,1,3",
        t: "243",
        reel_set1: "4,11,13,13,13,6,8,7,9,5,12,13,3,1,10,5,13,7,10,7,13,5,10,13,5,13,6,13,10,13,5,6,8,6,13,5,1,5,7,3,8,7,5~8,13,13,13,6,5,3,11,2,7,10,14,13,4,12,9,2,10,13,2,13,5,13,3,4,2,7,13,10,7,2,7,6,13,11,3,13,11,3,13,9,13,2,4,13,7,13,6,2,13,2,13,7,14,11,7,11,4,7,13,2,7,13,3,2,13,7,3~5,3,13,13,13,2,14,12,8,11,13,6,10,4,9,7,8,12,11,12,2,10,11,13,14,11,2,11,8,13,12,14,11,8,4,2,10,4,13,2,10,14,10,2,11,13,8,10,11,13,11,10,6,11,12,2,3,12,10,8,7,14,13,3,12,2,11,10,11,8,13,2,11,12,8,12,13,8,14,2,10,8,10,3,8,10,13,10,8,2~13,13,13,3,10,12,9,8,13,7,11,5,14,4,6,2,5,3,11,5,6,7,14,3,8,5,3,5,10,8,6,11,5,11,5,3,5,7,11,7,8,11,8,14,10,5,9,3,11,9,14,3,7,6,11,3,4,14,5,3,11,3,7,11,8,9,3,5,11,10,4,5,14,8,11,5,14,8,3,11,10,3,8,11,8~1,3,4,7,11,5,2,13,12,12,12,9,12,8,10,6,12,5,2,8,12,11,3,2,6,2,5,8,6,5,12,2,4,2,12,5,12,2,12,6,10,5,12,8,6,2,12,11,12,2,12,2,12,2,9,5,12,8,11,12,9,2,5,12,2,12,6,11,6,12,8,3,2,4,6,12,5,12,3,6,12,6,12,10,4,12,11,12,9,5,12,2,3,12,6,3,5,8,12,2,11,2,12,7,11,4,5,12,3,4,6,4,3,11,12,3,11,12,6,3,12,4,6,12,8,5,2,12,3,12,10,3,2",
        reel_set4: "8,7,4,5,1,9,10,6,11,3,12,7,5,3,11,5,3,5,10,1,7,3,7,12,5~12,11,5,10,6,9,2,7,4,3,14,8,3,8,2,3,4,6,5,4~9,2,3,14,10,4,5,11,7,6,8,12,14,4,8,4,14,2,3,2,14,8,2,7,14,7,11,2,4,2,10,2,14,2,14,11,7,14,6,7,2,10,14,8,2,8,2,14,7,14,8,10,6,4,7,2,14,2,7,6,14,8,14,2,8,14,2,14,4,10~12,2,2,2,7,14,3,9,5,2,6,8,10,4,11,2,7,2,8,4,6,8,4,7,10,11,4,8,2~10,12,8,5,3,11,4,2,7,1,9,6,4,8,4,6,2,8,4,6,1,8,2,4,1,6,8,6,4,1,2,12,8,6,1,12,8,6,3,9,11,2,3,12,11,12,6,12,1,11,1,8,4,8,12,7,4,8,1,11,1,8,6,5,8,1,8,2,8,1,12,6,4,11,6,3",
        reel_set3: "7,11,8,5,6,4,3,1,9,10,12,4,5,1,11,1,4,10,11,10,5,11,5,11,4,5,10,11,10,1,5,10,1~14,10,4,8,2,6,5,7,9,12,11,3,12,2,8,9,12,2,9,6,9,8,6,9,4,12,2,10,2,10,12,8,12,9,10,3,8,12,9,10,6,2,12,2,9,2,6,8,5,10,2,12,2,9,8,9,11,2,9,6,2,4,5,2,8,2,9,6,12,3,9,10,3,9,12,9~5,3,8,2,2,2,2,6,10,4,12,7,9,11,14,10,6,12,6,2,14,6,2,7,14,6,2,8,12,6,2,7,14,2,14,4,6,8,2,4,6,7,8,14,2,6,3~10,8,2,9,3,5,6,11,4,14,7,12,5,8,2,11,9,11,2,11,9,2,11,9,2,11,12,11,9,4,9,11,14,2,4,2,5,2,3,11,4,12,2,12,2,12,11,4,8,9,4,3,11,4,3,4,5,9,11,9,2,4,3,2,7,11,9,11,2,4,9,2,11,3,11,2,11,9,11,4~10,6,12,3,5,8,4,1,2,7,11,9,12,5,7,11,12,1,8,5,1,11,6,5,11,9,1,6,1,8,12,6,5,1,12,7,9,5",
        reel_set6: "3,5,9,6,4,1,7,10,8,12,11,9,7,11,4,7,5,9,7,8,4,12,4,7,10,12,4,12,11,4,12,10,7,12,7,12,7,1,4,9,8,12,8,4,7,4,12,8,1,12,4,12,7~2,2,2,6,9,3,2,8,14,4,10,5,11,7,12,9,5,7,14,5,7~12,7,5,11,14,6,3,4,2,9,10,8,6,5,4,2,4,5,4,6,2,4,5,4,5,2,9,5,7,9,5,3,11,5,9,14,4,6,11,3,8,14,3,7,9,4,5,9,5,6,5,4,6,4,7,3,4,7,11,2,9,4,5,14,7,9,2,4,5,9,6,9,3,4,6,5,3,6,4~5,2,2,2,4,12,2,8,7,9,11,3,6,14,10,12,2,4,3,12,2,12,2,10,2,12,8,2,4,8,6,2,4~11,7,1,3,5,9,2,12,4,6,8,10,2,1,9,4,6,8,1,2,4,9,2,9,2,12,9,8,4,10,12,6,2",
        reel_set5: "8,12,10,7,3,5,11,6,1,4,9,12,9,5,4,7,12,7,3,7,12,7,3,7,12,3,12,5,7,12,7,12,9,3,7,5,7,12,3,12,7~2,2,2,2,11,14,5,10,7,6,8,3,12,4,9,11,6,11,4~14,2,2,2,6,7,11,12,2,4,10,3,5,9,8,2,7,10,4,8,2,5,2,10,8,12,8,10,11,7,2,11,5,4,5,4,11,12,2,5,12,2,4,11,5,12~5,14,2,3,4,12,9,10,11,7,8,6,2,14,2,4,12,7,2,14,7,2,7,12,7,2,12,2,12,7,12,3,12,4,2,11,7,2,6,7,2,7,12,7,11,7,2,7,11,12,7,12,11,2,7,4,2,8,7,4,11,7,4,7,4,7,12,8,11,12,7,4,2,11,2,11,12~11,3,6,4,8,9,5,12,1,2,7,10,6,2,10,6,10,6,5,10,5,7,6,5,10,4,5,12,2,6,7,2,9,6,2,5,7,10,12,5,6,10,6,5,2,9,5,1,2,10,7,9,2,4,2,12,6,9,5,9,7,5,10,9,10,2,6,7,5,9,6,7,5,8,5,2,6,7,4,2,6,5,10,6",
        reel_set8: "4,10,6,9,12,1,11,7,3,8,5,3,5,12,11,9,5,9,5,9,1,5,1,9,7,9,5,12,1,8,11,6,11,5,10,3,6,11,8,1,5,7,9,11,9,11,1,9,5,9,1,12,5,3,12,9,11,3,5,1,5,11,7,5,12,9,5,9,11,10,5,9,10,6,11,5,3,9,5,9,10,11,9,5,9,5~11,2,2,2,3,7,6,12,5,2,8,14,9,4,10,2,9,3,7,2~2,2,2,8,11,6,10,4,14,12,9,3,7,2,5,4,9,5,8,6,3,7,4,8,4,9,4,10,8,6,5,3,8,12,6,5,3,12,14,10,7,5,8,12,4,8,6~2,2,2,9,5,14,11,12,10,6,8,7,2,4,3,4,6,8,3,7,4,3,11,6,3,5,11,14,12,9,3~9,1,3,6,10,7,8,12,2,11,5,4,6,12,5,10,8,12,6,10,1,10,5,8,12,8,2,6,12,5,4,6,7,6",
        reel_set7: "4,7,10,3,1,5,6,12,8,11,9,8,6,5,11,8,11,3,1,6,1,10,12,10,12~6,3,14,4,2,7,8,10,9,12,11,5,10,9,10,4,10,14,9,7,10,5,9,14,3,9,5,10,9,14,10,11,10,11,8,5,14,5~5,2,2,2,14,12,6,10,7,2,8,4,3,11,9,12,2,9~7,2,2,2,2,10,12,11,8,5,3,9,6,4,14,2,11,4,5~3,2,5,4,9,1,11,12,8,6,7,10,8,11,9,8,6,11,10,9,5,11,12,5,11,7,8,2,6,11,8,1,6,10,11,8,6,11,12,5,6,12,8,11,7,6,1,12,7,11,8,10,11,7,11,6,12,8,11,8,1,10,6,1,10,6,5,4,11,1,9,5,11,12,8,6,7,6,12,8",
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
        balance_bonus: "0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "20",
        na: "s",
        reel_set: "0",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "8,13,7,4,8",
        sb: "8,13,7,4,8",
        sh: "4",
        sver: "5",
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
    result["wlc_v"] = player.machine.winLines;

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }

    result["na"] = nextAction;

    result.acci = "0";
    result.accm = "jwt~ma~fgc~h";
    result.accv = `${player.machine.moneyTable.join()}~${player.machine.moneyValues.join()}~${player.machine.moneyFSList.join()}~6`;

    if (prevGameMode == "BASE") {
        var multi = [20, 20];
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.0;
            result["fsres"] = 0.0;
            result["na"] = "s";

            result.acci = "0;1";
            result.accm = "jwt~ma~fgc~pl~h;jwt~ma~h";
            result.apt = "ma,ma";
            result.apv = multi.join();
            result.apwa = multi.map((value) => value * player.betPerLine).join();
            result.accv = `${player.machine.moneyTable.join()}~${player.machine.moneyValues.join()}~${player.machine.moneyFSList.join()}~${player.machine.fsList.join()}~6;${player.machine.fsTable.join()}~${player.machine.fsValues.join()}~6`;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 3;

        result.acci = "0;1";
        result.accm = "jwt~ma~fgc~pl~h;jwt~ma~h";
        result.accv = `${player.machine.moneyTable.join()}~${player.machine.moneyValues.join()}~${player.machine.moneyFSList.join()}~${player.machine.fsList.join()}~6;${player.machine.fsTable.join()}~${player.machine.fsValues.join()}~6`;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;

            if (player.machine.freeSpinAPT.length > 0) {
                result.accv = `${player.machine.moneyTable.join()}~${player.machine.moneyValues.join()}~${player.machine.moneyFSList.join()}~${player.machine.fsList.join()}~6;${player.machine.fsTable.join()}~${player.machine.fsValues.join()}~${player.machine.freeSpinPList}~6`;
                result["apt"] = player.machine.freeSpinAPT.join();
                result["apv"] = player.machine.freeSpinAPV.join();
                result["apwa"] = player.machine.freeSpinAPWA.join();
                result["accm"] = "jwt~ma~fgc~pl~h;jwt~ma~pl~h";
            }
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsend_total"] = 1;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    //                         
    if (player.machine.prevJewelStatus == "JEWELWIN" && player.machine.jewelStatus == "NOJEWEL") {
        var pList = [];
        for (var i = 0; i < 18; i++) {
            pList.push(0);
        }
        pList[15 + player.machine.jewelReelNo - 1] = 1;

        result.accv = `${player.machine.moneyTable.join()}~${player.machine.moneyValues.join()}~${player.machine.moneyFSList.join()}~${pList.join()}~6`;
        result["accm"] = "jwt~ma~fgc~pl~h";
        result["apt"] = "ma";
        result["apv"] = player.machine.jewelValue;
        result["apwa"] = player.machine.winMoney;
        result["na"] = "c";
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

// accm : jwt~ma~fgc~h
//
// cv,cv,cv,fg,cv,cv,fg,cv,cv,fg,cv,cv,cv,fg,cv,cv,fg,jp3~ (jwt)
// 100,300,400,20,400,400,20,400,500,20,400,400,100,20,400,100,20,500~ (ma)                    (20                      )
// 0,0,0,10,0,0,10,0,0,8,0,0,0,10,0,0,20,0~ (fgc)                             
// 6 (h)       (   )             
//
// cv                       , fg                                      , jp                