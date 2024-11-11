var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '5,6,3,6,8',
        balance: '0.00',
        cfgs: '3560',
        reel1: '3,7,4,7,3,6,7,6,7,6,7,6,8,8,8,6,7,6,7,5,9,8',
        ver: '2',
        reel0: '3,4,5,6,4,5,6,7,8,4,5,6,4,5,9',
        index: '1',
        balance_cash: '0.00',
        def_sb: '5,7,8,5,4',
        def_sa: '4,8,7,6,5',
        reel3: '9,9,9,8,7,8,7,8,7,8,7,8,8,7,8,7,8,3,8,4,8,5,8,6,8,7',
        reel2: '8,7,5,8,2,4,8,7,3,8,7,2,6,7,8,6,8,6,8,4,5,6,8,6,9,8,6,8',
        reel4: '8,8,3,8,8,4,8,8,5,8,8,5,8,8,6,8,5,8,8,5,7,9',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0,0~0,0,0,0,0~0,0,0,0,0,0',
        gmb: '0,0,0',
        rt: 'd',
        stime: '1646037650222',
        sa: '4,8,7,6,5',
        sb: '5,7,8,5,4',
        // sc: '10.00,20.00,50.00,80.00,100.00,150.00,200.00,300.00,400.00,500.00,700.00,800.00,1000.00,1250.00,1500.00,1750.00,2000.00,2250.00,2500.00,2750.00,3000.00,4000.00,4500.00,5000.00,8000.00,10000.00,15000.00,20000.00,25000.00,35000.00,50000.00,100000.00',
        sc: '200.00,300.00,400.00,500.00,700.00,800.00,1000.00,1250.00,1500.00,1750.00,2000.00,2250.00,2500.00,2750.00,3000.00,4000.00,4500.00,5000.00,8000.00,10000.00,15000.00,20000.00,25000.00,35000.00,50000.00,100000.00',
        defc: '2000.00',
        sh: '1',
        wilds: '2~0,0,0,0,0,0~1,1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '2000.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;100,50,15,0,0;50,25,10,0,0;25,15,8,0,0;15,10,5,0,0;12,8,4,0,0;10,5,2,0,0;8,3,1,0,0',
        l: '1',
        rtp: '95.49',
        s: '5,6,3,6,8',
        t: 'symbol_count',
    }
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
        balance_bonus: `0.00`,
        balance: player.balance,
        balance_cash: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: `1`,
        na: (player.machine.winMoney > 0) ? `c` : `s`,
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: `1`,
        sver: `5`,
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    }

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    if (player.machine.lm_v.length > 0) {
        result["lm_v"] = player.machine.lm_v;
        result["lm_m"] = "l~m";
    }
    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: `0.00`,
        balance: player.balance,
        balance_cash: player.balance,
        index: param.index,
        counter: ++param.counter,
        na: `s`,
        stime: new Date().getTime(),
        sver: `5`,
    }
    return result;
}

module.exports = ApiManager;