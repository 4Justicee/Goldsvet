var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "8,11,7,9,14,8,10,4,2,14,4,10,7,2,14",
        balance: "0.00",
        cfgs: "5601",
        reel1: "9,10,6,2,2,2,12,7,9,10,8,11,3,7,13,4,9,11,5,6,13,7,10,4,6,14,14,14,6,8,9,10,11,6,9,7,10,8,5,11,12,7,9,6,10,5,11,8,3",
        ver: "2",
        reel0: "11,8,13,2,2,2,7,11,9,13,7,12,10,7,13,9,8,12,11,10,7,12,4,13,6,10,12,11,14,14,14,13,6,12,8,11,3,6,5,9,7,12,4,13,6",
        index: "1",
        balance_cash: "0.00",
        def_sb: "13,7,4,10,8",
        def_sa: "14,14,7,14,8",
        reel3: "5,12,8,2,2,2,10,8,9,12,5,11,6,10,3,12,4,9,7,11,3,13,14,14,14,7,10,5,11,12,4,6,10,5,13,4,8,11,12,10,5,11,13,6,12,10,6,13,9,8,12,6,11,10,5,8,13",
        reel2: "8,12,11,2,2,2,6,13,8,10,13,6,14,14,14,8,12,9,6,10,7,13,3,6,9,8,4,10,9,7,13,12,10,9,5,13,6,7,12,9,8,10,13,9,12,14,14,14,6,13",
        bonusInit: "[{bgid:0,bgt:33,bg_i:\"1,2,8,25,50,150,500,1000,2500,5000,25000\",bg_i_mask:\"wp,wp,wp,wp,wp,wp,wp,wp,wp,wp,wp\"}]",
        reel4: "11,8,12,2,2,2,13,4,12,8,10,13,9,7,11,10,6,13,3,9,8,12,5,13,7,11,6,10,4,11,8,10,12,7,11,8,14,14,14,12",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{regular:\"94.50\"}}",
        stime: "1646036543804",
        sa: "14,14,7,14,8",
        sb: "13,7,4,10,8",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~2000,500,250,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,300,150,0,0;500,200,100,0,0;300,150,75,0,0;250,100,30,0,0;200,80,25,0,0;150,60,20,0,0;125,50,15,0,0;100,40,10,0,0;100,40,10,0,0;50,20,5,0,0;50,20,5,0,0;0,0,0,0,0",
        l: "10",
        s: "8,11,7,9,14,8,10,4,2,14,4,10,7,2,14",
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
        balance: player.balance,
        index: param.index,
        balance_cash: player.balance,
        balance_bonus: "0.00",
        stime: new Date().getTime(),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "3",
        c: player.betPerLine,
        sver: "5",
        counter: ++param.counter,
        l: "10",
        s: Util.view2String(player.machine.view),
    };

    result["tw"] = player.machine.winMoney;

    if (player.machine.winSymbols.length > 0) {

        result["com"] = player.machine.winSymbols.join();

    }

    if (player.machine.winLines.length > 0) {

        for (var i = 0; i < player.machine.winLines.length; i++) {
            result[`l${i}`] = player.machine.winLines[i];
        }
    }

    if (player.machine.jackpotMoney > 0) {

        result["bgid"] = 0;
        result["coef"] = param.c * player.machine.lineCount;
        result["w"] = player.machine.winMoney - player.machine.jackpotMoney;
        result["rw"] = player.machine.jackpotMoney;
        result["bgt"] = 33;
        result["bw"] = 1;
        result["wp"] = Math.floor(Number(player.machine.jackpotMoney) / Number(param.c * player.machine.lineCount));
        result["end"] = 1;

    } else {

        result["w"] = player.machine.winMoney;
    }

    if (player.machine.winMoney > 0) {
        result["na"] = "c";
    } else {
        result["na"] = "s";
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