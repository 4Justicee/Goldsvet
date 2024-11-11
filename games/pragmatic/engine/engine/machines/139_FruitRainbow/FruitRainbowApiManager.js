var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "8,4,10,5,9,8,4,10,5,9,8,4,10,5,9,8,4,10,5,9",
        balance: "0.00",
        cfgs: "3742",
        reel1: "7,7,7,11,11,11,11,11,1,10,10,10,10,8,8,8,4,4,4,4,9,9,9,6,6,6,3,3,5,5",
        ver: "2",
        reel0: "3,6,6,6,8,8,8,8,1,4,4,9,9,9,9,11,11,11,5,5,5,7,7,7,10,10,10,10",
        index: "1",
        balance_cash: "0.00",
        def_sb: "5,7,5,3,5",
        def_sa: "6,5,7,3,8",
        reel3: "6,6,6,3,3,3,1,8,8,8,8,9,9,9,9,7,7,7,4,4,4,10,10,10,11,11,11,11,5,5,5,5",
        reel2: "5,5,5,9,9,9,1,11,11,11,4,4,4,10,10,10,10,8,8,8,7,7,7,6,6,6,3",
        reel4: "5,5,5,1,7,7,7,6,6,6,9,9,9,9,11,11,11,11,4,4,4,4,10,10,10,10,3,3,3,7,7,7,8,8,8",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~500,125,5,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: "1646037206051",
        sa: "6,5,7,3,8",
        sb: "5,7,5,3,5",
        sc: "5.00,10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "50.00",
        sh: "4",
        wilds: "2~2000,1000,100,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "50.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;2000,500,90,0,0;600,200,50,0,0;500,150,40,0,0;400,100,30,0,0;300,90,20,0,0;250,80,15,0,0;200,60,10,0,0;140,50,10,0,0;100,50,5,0,0",
        l: "40",
        rtp: "94.50",
        s: "8,4,10,5,9,8,4,10,5,9,8,4,10,5,9,8,4,10,5,9",
    };

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
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "40",
        s: player.machine.view.join(),
        sa: player.machine.virtualReels.above.join(),
        sb: player.machine.virtualReels.below.join(),
        sh: "4",
        stime: new Date().getTime(),
        sver: "5",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    if (player.machine.maskView.length > 0) {

        result["is"] = player.machine.maskView.join();
    }

    for (var i = 0; i < player.machine.winLines.length; i++) {
        result[`l${i}`] = player.machine.winLines[i];
    }

    if (player.machine.winMoney > 0) {
        result["na"] = "c";
    } else {
        result["na"] = "s";
    }

    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
    }

    return result;
}

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
}

module.exports = ApiManager;