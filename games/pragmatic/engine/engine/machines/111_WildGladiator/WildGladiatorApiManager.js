var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "4,11,5,2,7,8,4,1,11,3,5,7,11,5,11",
        balance: "0.00",
        cfgs: "2710",
        reel1: "12,8,9,4,5,11,2,7,11,6,11,6,8,7,10,8,3,9,12,10,10",
        ver: "2",
        reel0: "11,5,2,9,10,9,6,12,5,1,8,8,12,3,6,12,11,4,7",
        index: "1",
        balance_cash: "0.00",
        def_sb: "6,7,3,12,9",
        def_sa: "11,5,2,9,10",
        reel3: "4,11,12,5,6,8,10,3,3,9,10,8,2,5,10,12,12,4,7,11",
        reel2: "8,5,9,6,3,11,7,12,11,1,9,5,8,1,2,4,10,7,6,3",
        reel4: "6,7,3,12,9,4,1,11,8,10,8,9,12,2,7,8,5",
        balance_bonus: "0.00",
        na: "s",
        aw: "6",
        scatters: "1~1,1,1,0,0~10,10,10,0,0~1,1,1,1,1",
        fs_aw: "m~1;m~2;m~3;m~4;m~5;m~6;m~7;m~8;m~9;m~10;t",
        gmb: "0,0,0",
        rt: "d",
        base_aw: "m~1;m~2;m~3;m~4;m~5;m~6;m~7;m~8;m~9;m~10;t",
        stime: "1646042133184",
        sa: "11,5,2,9,10",
        sb: "6,7,3,12,9",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,4000.00",
        defc: "100.00",
        def_aw: "6",
        sh: "3",
        wilds: "2~400,50,25,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,50,25,0,0;250,40,20,0,0;200,30,15,0,0;150,25,10,0,0;100,25,10,0,0;75,20,5,0,0;50,15,5,0,0;40,15,4,0,0;30,15,3,0,0;25,10,3,0,0",
        l: "25",
        rtp: "94.07",
        s: "4,11,5,2,7,8,4,1,11,3,5,7,11,5,11",
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
        sa: "",
        sb: "",
        sh: "3",
        sver: "5",
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

    result["awt"] = "6rl";
    if (player.machine.rainingWildPositions.length > 0) {
        result["aw"] = 10;
        result["rwd"] = `2~${player.machine.rainingWildPositions}`;
        if (player.machine.expansiblePositions.length == 5) {
            result["gwm"] = 10;
        }
        result["is"] = Util.view2String(player.machine.view);
        result["s"] = Util.view2String(player.machine.expandedView);
    } else {
        result["aw"] = player.machine.winMulti - 1;
        if (player.machine.winMulti > 1) {
            result["gwm"] = player.machine.winMulti;
        }
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
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;

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