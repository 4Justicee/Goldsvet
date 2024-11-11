var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "4,11,5,3,7,8,4,2,11,3,5,7,11,5,11",
        balance: "0.00",
        cfgs: "1965",
        ver: "2",
        index: "1",
        balance_cash: "0.00",
        reel_set_size: "2",
        balance_bonus: "0.00",
        na: "s",
        aw: "4",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        fs_aw: "m~1;m~2;m~3;m~4;m~5;m~6;m~7;m~8;m~9;m~10;t",
        gmb: "0,0,0",
        base_aw: "m~1;m~2;m~3;m~4;m~5;m~6;m~7;m~8;m~9;m~10;t",
        stime: "1646042479069",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,4000.00",
        defc: "100.00",
        def_aw: "4",
        pos: "0,0,0,0,0",
        sh: "3",
        wilds: "2~400,50,25,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,50,25,0,0;250,40,20,0,0;200,30,15,0,0;150,25,10,0,0;100,25,10,0,0;75,20,5,0,0;50,15,5,0,0;40,15,5,0,0;30,15,4,0,0;25,10,3,0,0",
        l: "25",
        rtp: "94.00",
        reel_set0: "12,8,6,12,9,6,7,9,2,9,4,12,9,5,6,7,11,12,7,11,12,5,11,12,5,9,10,12,4,8,11,3,12,10,4,8,12,4,10,7~6,12,9,10,11,5,10,8,2,8,10,7,11,4,7,8,12,7,6,12,9,11,10,3,11,8,9,10,11,3,10,11,4,8,11,6,8,10,11,5~3,11,8,12,10,8,7,6,2,6,7,9,11,3,9,8,5,10,11,12,10,5,12,8,5,6,9,10,12,9,8,11,7,10,3,9,10,12,9,4~12,8,9,6,12,3,5,11,2,11,5,10,8,9,10,12,11,10,4,12,6,10,9,5,3,9,12,4,8,7,10,6,5,10,3,6,7,12,6,4~4,8,7,6,8,4,10,12,2,12,7,4,12,6,4,9,8,10,9,11,7,9,11,10,9,12,5,8,12,9,10,11,8,12,11,7,3,11,8,3",
        s: "4,11,5,3,7,8,4,2,11,3,5,7,11,5,11",
        reel_set1: "12,8,6,12,10,6,7,10,2,11,4,12,10,5,6,12,9,10,7,12,6,10,11,12,6,9,10,12,9,8,10,3,12,10,4,8,12,4,10,7~6,6,6,11,11,11,9,9,9,10,10,10,11,11,11,9,9,9,5,5,5,8,8,8,9,9,9,2,2,2,8,8,8,9,9,9,11,11,11,5,5,5,7,7,7,8,8,8,9,9,9,7,7,7,11,11,11,12,12,12,10,10,10,11,11,11,12,12,12,9,9,9,11,11,11,8,8,8,9,9,9,10,10,10,11,11,11,3,3,3,9,9,9,11,11,11,4,4,4,8,8,8,11,11,11,5,5,5,8,8,8,9,9,9,11,11,11,5,5,5~6,6,6,11,11,11,9,9,9,10,10,10,11,11,11,9,9,9,5,5,5,8,8,8,9,9,9,2,2,2,8,8,8,9,9,9,11,11,11,5,5,5,7,7,7,8,8,8,9,9,9,7,7,7,11,11,11,12,12,12,10,10,10,11,11,11,12,12,12,9,9,9,11,11,11,8,8,8,9,9,9,10,10,10,11,11,11,3,3,3,9,9,9,11,11,11,4,4,4,8,8,8,11,11,11,5,5,5,8,8,8,9,9,9,11,11,11,5,5,5~6,6,6,11,11,11,9,9,9,10,10,10,11,11,11,9,9,9,5,5,5,8,8,8,9,9,9,2,2,2,8,8,8,9,9,9,11,11,11,5,5,5,7,7,7,8,8,8,9,9,9,7,7,7,11,11,11,12,12,12,10,10,10,11,11,11,12,12,12,9,9,9,11,11,11,8,8,8,9,9,9,10,10,10,11,11,11,3,3,3,9,9,9,11,11,11,4,4,4,8,8,8,11,11,11,5,5,5,8,8,8,9,9,9,11,11,11,5,5,5~12,8,7,6,8,11,10,8,2,12,7,4,12,6,5,9,12,10,9,11,7,9,11,10,9,12,5,7,12,9,10,11,8,12,11,7,10,11,8,3",
        awt: "6rl",
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
        balance: "100.00,000.00",
        balance_cash: "100.00,000.00",
        balance_bonus: "0",
        na: "s",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sh: "3",
        sver: "5",
        n_reel_set: "0",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "25",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

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

    result["pos"] = player.machine.positions;

    result["awt"] = "6rl";
    result["aw"] = player.machine.winMulti - 1;
    if (player.machine.winMulti > 1 && player.machine.winMulti <= 10) {
        result["gwm"] = player.machine.winMulti;
    }

    if (player.machine.expansiblePositions.length > 0) {
        var expansiblePositions = player.machine.expansiblePositions,
            expandedPositions = [];
        for (var i = 0; i < expansiblePositions.length; i++) {
            expandedPositions.push(expansiblePositions[i] - 5);
            expandedPositions.push(expansiblePositions[i]);
            expandedPositions.push(expansiblePositions[i] + 5);
        }
        result["ep"] = `2~${expansiblePositions.join(',')}~${expandedPositions.join(',')}`;
        result["is"] = Util.view2String(player.machine.view);
        result["s"] = Util.view2String(player.machine.expandedView);
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["na"] = "s";
            result["n_reel_set"] = 1;
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel_set"] = 1;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["n_reel_set"] = 0;
            result["fs_total"] = player.machine.freeSpinLength;
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
        balance: "100.00,000.00",
        index: "3",
        balance_cash: "100.00,000.00",
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