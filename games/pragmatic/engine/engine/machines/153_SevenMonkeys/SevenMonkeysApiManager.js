var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "2,3,4,3,2,2,3,4,3,2,2,3,4,3,2",
        balance: "100,000.00",
        cfgs: "1",
        reel1: "7,7,7,7,7,7,7,1,4,4,4,4,4,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,4,4,4,4,4,7,7,7,7,7,7,7,7,2,2,2,2,2,2,2,2,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5",
        ver: "2",
        reel0: "7,7,7,7,7,7,7,7,4,4,4,4,4,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5,1,7,7,7,7,7,7,7,7,4,4,4,4,4,1,6,6,6,6,6,6,6,5,5,5,5,5,1,7,7,7,7,7,7,7,7,3,3,3,3,5,5,5,5,5,1,6,6,6,6,6,6,6,6,4,4,4,4,4,7,7,7,7,7,7,7,7,2,2,2,2,2,2,2,2,4,4,4,4,4,1,6,6,6,6,6,6,6,6,3,3,3,3,5,5,5,5,5",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "7,7,7,7,7",
        def_sa: "6,6,6,6,6",
        reel3: "7,7,7,7,7,7,7,7,2,2,2,2,2,2,2,2,4,4,4,4,4,5,5,5,5,5,7,7,7,1,5,3,3,3,3,5,4,3,5,4,4,6,6,6,6,6,6,6,6,5,7,6,6,7,3,7,5,6,6,4,7,2,6,4,7,6,4,1,6,6,7,6,3",
        reel2: "7,7,7,7,7,7,7,7,3,3,3,3,6,6,6,6,6,6,6,6,3,6,4,4,4,4,4,7,5,5,5,5,5,7,4,5,2,2,2,2,2,2,2,2,7,2,6,3,1,6,7,7,7,7,6,5,2,4,3,6,6,5,4,4,7,6,5,5,4,3,6,1,7,7,6",
        reel4: "7,7,7,7,7,7,7,7,2,2,2,2,2,2,2,2,6,6,6,6,6,6,6,6,4,4,4,4,4,1,2,6,4,4,5,5,5,5,5,6,7,5,7,6,6,1,4,5,7,7,3,3,3,3,5,6,5,7,3,7,4,7,4,6,4,7,7,6,3,5,3,7,6,5,6",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~150,100,50,0,0~3,2,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1644572866999",
        sa: "6,6,6,6,6",
        sb: "7,7,7,7,7",
        // sc:"10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        sc: "30.00,50.00,100.00,250.00,300.00,500.00,1000.00,3000.00,5000.00,10000.00,15000.00",
        defc: "300.00",
        sh: "3",
        wilds: "2~1500,400,50,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "300.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;1500,400,50,0,0;150,50,20,0,0;50,15,5,0,0;50,15,5,0,0;15,5,3,0,0;15,5,3,0,0",
        l: "7",
        rtp: "92.71",
        s: "2,3,4,3,2,2,3,4,3,2,2,3,4,3,2"
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
        l: "7",
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
            result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
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
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
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
