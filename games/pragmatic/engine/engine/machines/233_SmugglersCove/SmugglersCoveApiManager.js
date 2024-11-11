var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "4,9,4,6,8,3,7,9,4,7,5,8,7,5,8",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "4,7,8,5,10",
        prm: "12~2,3,5,10;13~2,3,5,10",
        reel_set_size: "8",
        def_sa: "5,10,7,6,8",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{ante:\"96.50\",regular:\"96.50\"},props:{max_rnd_sim:\"0\",max_rnd_hr:\"1662665\",max_rnd_win:\"10000\",max_rnd_win_a:\"8000\"}}",
        wl_i: "tbm~10000;tbm_a~8000",
        bl: "0",
        stime: "1649204843102",
        sa: "5,10,7,6,8",
        sb: "4,7,8,5,10",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~2000,200,100,0,0~1,1,1,1,1;12~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        bls: "20,25",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;2000,200,100,0,0;1000,100,50,0,0;500,50,20,0,0;200,40,10,0,0;50,20,8,0,0;50,20,8,0,0;50,20,8,0,0;50,20,8,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        reel_set0: "11,8,10,11,8,4,3,4,11,2,4,4,4,2,3,11,3,7,6,9,7,6,10,11,9,3,3,3,8,3,4,7,7,5,3,5,4,8,7,8,5,5,5,6,10,9,8,4,9,7,9,3,4,11,11,11,9,8,6,11,11,8,7,4,11,5,5,10,7~10,6,4,6,8,10,9,4,4,4,5,10,2,1,5,10,9,7,5,3,3,3,11,11,3,11,5,9,4,9,8,2,5,5,5,6,8,6,4,8,11,7,9,8,11,11,11,3,8,11,4,7,4,11,1,9,6,5~10,8,8,11,6,7,5,11,3,9,10,11,10,7,1,5,5,5,2,3,7,10,3,6,11,7,11,9,10,11,3,9,5,6,4,4,4,9,8,10,11,3,5,8,8,11,10,2,8,10,4,7,9,1,3,3,3,10,7,5,8,10,7,8,11,11,6,8,8,11,7,10,6,11,11,11,5,5,3,10,4,7,6,8,7,11,5,8,5,11,1,9,11,4~7,11,10,6,8,9,8,9,1,4,7,7,3,10,2,7,5,10,11,7,3,10,7,5,6,9,8,8,10,3,4,7,4,7,6,7,10,11,3,6,11,11,11,8,11,3,7,3,7,9,8,8,3,10,8,4,5,11,9,8,4,11,8,11,7,2,8,4,3,1,11,9,10,9,5,1,3,10,5,8~4,10,10,3,8,10,7,3,6,10,5,4,8,13,7,6,9,3,5,12,7,6,9,6,11,8,5,7,8,7,8,10,3,9,3,11,11,13,11,10,2,8,9,10,11,11,4,7,11,7,9,8,7,11,7,5,7,9,10,8,9,4,10,3,6,4,10,3,5,7,11,5,11",
        s: "4,9,4,6,8,3,7,9,4,7,5,8,7,5,8",
        reel_set2: "9,4,5,8,8,8,7,8,10,8,9,5,5,5,10,8,5,11,8,10,3,11,5,6,7,10,4,4,4,3,11,8,8,3,9,10,11,10,6,10,11,11,11,5,5,7,10,6,7,8,10,9,7,6,5,3,3,3,7,7,11,11,4,6,7,7,10,7,3,8,8,6,8,3,8,7,7,10,7,11,4,10,8,7,8~6,3,3,9,7,4,7,6,4,4,4,8,1,9,6,4,8,8,4,7,3,3,3,4,11,10,4,7,7,8,9,4,5,5,5,8,5,9,8,11,10,3,5,9,8,11,11,11,10,7,9,3,3,7,8,9,3,9,1~5,9,10,9,10,5,1,11,7,4,4,4,6,10,9,11,10,1,10,8,6,8,7,11,11,11,6,11,10,5,7,9,10,3,5,9,1,3,3,3,9,3,9,4,6,8,10,1,4,6,3,10,5,5,5,10,11,4,8,6,9,10,6,9,7,11,10,9~5,8,6,11,10,4,11,5,1,11,6,5,10,1,11,11,11,8,7,8,1,9,10,11,4,9,7,5,6,11,6,11,10,3,3,3,10,8,7,1,10,7,11,8,4,9,8,3,11,10,3,9,4,4,4,10,3,6,11,5,4,6,4,7,9,4,11,8,11,11,3,3,5,5,5,7,11,9,11,11,3,9,4,3,11,11,8,3,10,4,7,3~10,5,11,13,10,8,4,7,10,3,3,3,8,7,8,5,4,7,9,7,10,3,8,11,11,11,9,5,5,8,6,4,8,4,7,3,13,8,4,4,4,7,9,7,8,4,3,10,7,4,10,9,5,5,5,7,10,8,3,6,5,6,3,8,7,10,9,10",
        reel_set1: "2,7,6,10,4,9,4,9,3,11,11,11,9,9,6,7,11,3,4,4,9,7,4,4,4,7,5,9,5,5,6,4,10,7,11,3,3,3,10,9,7,10,7,9,10,3,6,9,5,5,5,10,3,8,5,3,7,10,8,4,10,6~10,5,8,4,1,3,5,5,5,9,8,3,8,5,10,5,8,4,4,4,8,9,8,2,7,1,7,3,11,11,11,10,6,11,10,11,11,8,5,3,3,3,10,9,9,10,9,3,8,10,10,10,6,11,6,9,9,4,6,11~7,6,1,6,8,4,4,4,3,8,5,7,9,6,5,8,3,3,3,5,8,1,6,8,6,7,8,5,5,5,2,7,11,10,1,4,9,2,3,11,11,11,10,8,5,4,7,5,8,4,11,4,1~6,8,9,3,7,3,7,9,7,6,3,8,4,11,5,4,3,1,6,3,7,11,8,10,7,9,5,6,4,5,7,1,8,6,10,9,7,11,11,11,8,10,9,2,3,9,6,8,5,8,4,9,7,1,3,4,10,3,6,5,1,10,5,11,5,3,8,7,7,8,5,3,4,7,7,10,7,4,10~10,11,6,5,9,6,3,13,8,6,7,3,6,12,9,10,4,10,4,8,2,9,7,5,9,7,11,11,11,3,10,8,9,7,8,7,8,11,5,3,5,2,7,8,9,4,3,11,6,11,10,4,10,5,8,3,4",
        reel_set4: "11,8,10,11,8,4,3,4,11,2,4,4,2,3,11,3,7,6,9,7,6,10,11,9,3,8,3,4,7,7,5,3,5,4,8,7,8,5,5,6,10,9,8,4,9,7,9,3,4,11,11,11,9,8,6,11,11,8,7,4,11,5,5,10,7~10,6,4,6,8,10,9,4,4,5,10,2,1,5,10,9,7,5,3,3,11,11,3,11,5,9,4,9,8,2,5,6,8,6,4,8,11,7,9,8,11,11,11,3,8,11,4,7,4,11,1,9,6,5~10,8,8,11,6,7,5,11,3,9,10,11,10,7,1,5,5,2,3,7,10,3,6,11,7,11,9,10,11,3,9,5,6,4,9,8,10,11,3,5,8,8,11,10,2,8,10,4,7,9,1,3,3,10,7,5,8,10,7,8,11,11,6,8,8,11,7,10,6,11,11,11,5,5,3,10,4,7,6,8,7,11,5,8,5,11,1,9,11,4~7,11,10,6,8,9,8,9,1,4,7,7,3,10,2,7,5,10,11,7,3,10,7,5,6,9,8,8,10,3,4,7,4,7,6,7,10,11,3,6,11,11,11,8,11,3,7,3,7,9,8,8,3,10,8,4,5,11,9,8,4,11,8,11,7,2,8,4,3,1,11,9,10,9,5,1,3,10,5,8~4,10,10,3,8,10,7,3,6,10,5,4,8,13,7,6,9,3,5,2,7,6,9,6,11,8,5,7,8,7,8,10,3,9,3,11,11,13,11,10,2,8,9,10,13,11,4,7,11,7,9,8,7,11,7,5,7,9,10,8,9,4,10,3,6,4,10,3,5,7,11,5,11",
        reel_set3: "11,8,10,11,8,4,3,4,11,2,4,4,2,3,11,3,7,6,9,7,6,10,11,9,3,3,8,3,4,7,7,5,3,5,4,8,7,8,5,5,6,10,9,8,4,9,7,9,3,4,11,11,9,8,6,11,11,8,7,4,11,5,5,10,7~10,6,4,6,8,10,9,4,5,10,2,1,5,10,9,7,5,3,3,11,11,3,11,5,9,4,9,8,2,5,6,8,6,4,8,11,7,9,8,11,3,8,11,4,7,4,11,1,9,6,5~10,8,8,11,6,7,5,11,3,9,10,11,10,7,1,5,5,2,3,7,10,3,6,11,7,11,9,10,11,3,9,5,6,4,9,8,10,11,3,5,8,8,11,10,2,8,10,4,7,9,1,3,10,7,5,8,10,7,8,11,11,6,8,8,11,7,10,6,11,5,5,3,10,4,7,6,8,7,11,5,8,5,11,1,9,11,4~7,11,10,6,8,9,8,9,1,4,7,7,3,10,2,7,5,10,11,7,3,10,7,5,6,9,8,8,10,3,4,7,4,7,6,7,10,11,3,6,11,11,8,11,3,7,3,7,9,8,8,3,10,8,4,5,11,9,8,4,11,8,11,7,2,8,4,3,1,11,9,10,9,5,1,3,10,5,8~4,10,10,3,8,10,7,3,6,10,5,4,8,11,7,6,9,3,5,12,7,6,9,6,13,8,5,7,8,7,8,10,3,9,3,11,10,2,8,9,10,11,11,4,7,11,7,9,8,7,13,7,5,7,9,10,8,9,4,10,3,6,4,10,3,5,7,11,5,11",
        reel_set6: "11,8,10,11,8,4,3,4,11,2,4,4,2,3,11,3,7,6,9,7,6,10,11,9,3,3,8,3,4,7,7,5,3,5,4,8,7,8,5,5,6,10,9,8,4,9,7,9,3,4,11,11,11,9,8,6,11,11,8,7,4,11,5,5,10,7~10,6,4,6,8,10,9,4,4,4,5,10,2,1,5,10,9,7,5,3,3,3,11,11,3,11,5,9,4,9,8,2,5,5,5,6,8,6,4,8,11,7,9,8,11,11,11,3,8,11,4,7,4,11,1,9,6,5~10,8,8,11,6,7,5,11,3,9,10,11,10,7,1,5,2,3,7,10,3,6,11,7,11,9,10,11,3,9,5,6,4,4,9,8,10,11,3,5,8,8,11,10,2,8,10,4,7,9,1,3,3,10,7,5,8,10,7,8,11,11,6,8,8,11,7,10,6,11,11,11,5,5,3,10,4,7,6,8,7,11,5,8,5,11,1,9,11,4~7,11,10,6,8,9,8,9,1,4,7,7,3,10,2,7,5,10,11,7,3,10,7,5,6,9,8,8,10,3,4,7,4,7,6,7,10,11,3,6,11,11,11,8,11,3,7,3,7,9,8,8,3,10,8,4,5,11,9,8,4,11,8,11,7,2,8,4,3,1,11,9,10,9,5,1,3,10,5,8~4,10,10,3,8,10,7,3,6,10,5,4,8,11,7,6,9,3,5,12,7,6,9,6,13,8,5,7,8,7,8,10,3,9,3,11,11,13,11,10,2,8,9,10,11,11,4,7,11,7,9,8,7,11,7,5,7,9,10,8,9,4,10,3,6,4,10,3,5,7,11,5,11",
        reel_set5: "11,8,10,11,8,4,3,4,11,2,4,4,4,2,3,11,3,7,6,9,7,6,10,11,9,3,8,3,4,7,7,5,3,5,4,8,7,8,5,5,5,6,10,9,8,4,9,7,9,3,4,11,11,9,8,6,11,11,8,7,4,11,5,5,10,7~10,6,4,6,8,10,9,4,4,4,5,10,2,1,5,10,9,7,5,3,3,3,11,11,3,11,5,9,4,9,8,2,5,5,5,6,8,6,4,8,11,7,9,8,11,11,3,8,11,4,7,4,11,1,9,6,5~10,8,8,11,6,7,5,11,3,9,10,11,10,7,1,5,5,5,2,3,7,10,3,6,11,7,11,9,10,11,3,9,5,6,4,4,4,9,8,10,11,3,5,8,8,11,10,2,8,10,4,7,9,1,3,3,3,10,7,5,8,10,7,8,11,11,6,8,8,11,7,10,6,11,11,11,5,5,3,10,4,7,6,8,7,11,5,8,5,11,1,9,11,4~7,11,10,6,8,9,8,9,1,4,7,7,3,10,2,7,5,10,11,7,3,10,7,5,6,9,8,8,10,3,4,7,4,7,6,7,10,11,3,6,11,11,11,8,11,3,7,3,7,9,8,8,3,10,8,4,5,11,9,8,4,11,8,11,7,2,8,4,3,1,11,9,10,9,5,1,3,10,5,8~4,10,10,3,8,10,7,3,6,10,5,4,8,11,7,6,9,3,5,2,7,6,9,6,13,8,5,7,8,7,8,10,3,9,3,11,11,13,11,10,2,8,9,10,11,11,4,7,11,7,9,8,7,11,7,5,7,9,10,8,9,4,10,12,3,6,4,10,3,5,7,11,5,11",
        reel_set7: "4,7,5,10,11,3,9,7,9,7,9,8,5,6,9,3,10,9,11,4,7,2,7,6,10,11,11,11,3,9,10,5,7,6,2,7,3,11,8,6,10,11,8,9,8,7,4,10,3,8,11,8,4,8,4,8~6,5,11,8,3,6,1,10,1,3,11,5,7,10,8,5,8,4,10,4,8,10,9,7,7,10,3,5,8,10,7,11,11,11,9,8,6,7,2,10,7,7,11,11,9,7,9,5,11,9,7,11,11,4,3,9,8,6,2,11,1,9,11,4,10,8,5~1,10,8,2,5,7,9,11,11,8,11,8,1,6,2,9,4,10,3,11,11,11,7,5,4,10,7,6,3,4,9,7,10,7,9,8,11,11,10,11,2,11,5,10,1~10,11,10,4,3,5,9,10,4,9,5,3,5,6,7,8,6,7,3,8,10,8,1,11,5,11,3,10,1,10,9,6,4,9,11,1,2,7,3,1,7,9,7,6,7,10,11,4,8,9,10,4,8,6,5,7,10,7,5,2,3~6,5,8,10,7,11,8,3,5,11,6,3,11,3,6,5,7,4,5,10,7,4,9,6,7,11,11,11,4,9,10,9,7,5,10,3,4,5,10,3,11,2,3,8,11,8,7,9,8,2,9,7,8,4"
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
        nextAction = "c";   
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    var resultView = player.machine.view;
    var multiStr = [], multiValue = 0;
    for (var i = 0; i < resultView.length; i ++) {
        if (resultView[i] > 13) {
            multiStr.push(`13~${i}~${resultView[i] / 13}`);
            multiValue += resultView[i] / 13;
            resultView[i] = 13;
        }
    }

    result["s"] = resultView.join();
    result["rmul"] = multiStr.join(";");

    if (player.machine.isCoin) {
        result["apt"] = "ma";
        result["apv"] = player.virtualBet * (multiValue == 0 ? 1 : multiValue);
        result["apwa"] = player.machine.coinWinMoney;
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
            result["ls"] = 0;
            result["bl"] = 0;
            var freeNumList = [8,10,12,15,20];
            result["iaw"] = `fs~${player.machine.freeSpinLength}~${freeNumList.indexOf(player.machine.freeSpinLength)}~8,10,12,15,20`
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
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
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