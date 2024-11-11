var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '3,5,4,7,3,5,6,4,7',
        c_paytable: '9~any~3,4~10,0,0~2',
        balance: '100,000.00',
        cfgs: '1',
        reel1: '2,3,3,3,3,7,5,6,6,6,8,4,4,4,6,4,7,7,7,5,5,5,4,3,5,3,7,4,3,4,6,5,6,4',
        ver: '2',
        reel0: '6,6,6,2,5,5,5,5,4,3,7,6,8,3,3,3,4,4,4,7,7,7,4,7,5,8,7',
        mo_s: '8',
        index: '1',
        balance_cash: '100,000.00',
        def_sb: '3,4,5',
        mo_v: '5,8,18,28,58,68,88,108,128,288,888,900,2250',
        def_sa: '3,4,5',
        reel2: '4,2,3,6,5,8,4,4,4,7,6,6,6,5,5,5,7,7,7,5,7,5,6,7,6,5,7,5,6,5,6,5,7,3,6,2,5,8,5,2,3,5,3,5,7,5,6,5,6,2,7,2,5,6,5,3,5,6',
        bonusInit: '[{bgid:2,bgt:42,bg_i:\"18,28,58,88,108,128,188,288,388,100,250,500,1000\",bg_i_mask:\"w,w,w,w,w,w,w,w,w,w,w,w,w\"},{bgid:3,bgt:42,bg_i:\"2,3,5,8,10\",bg_i_mask:\"wlm,wlm,wlm,wlm,wlm\"}]',
        mo_jp: '900;2250;0',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0~0,0,0~1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{props:{max_rnd_sim:\"1\",max_rnd_hr:\"27027027\",jp1:\"9000\",max_rnd_win:\"3000\",jp-units:\"coin\",jp3:\"2250\",jp2:\"4500\",jp4:\"900\"}}',
        mo_jp_mask: 'jp4;jp3;jp1',
        stime: '1646205250594',
        sa: '3,4,5',
        sb: '3,4,5',
        sc: '20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,8000.00,10000.00,12000.00',
        defc: '200.00',
        sh: '3',
        wilds: '2~250,0,0~1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '200.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0;0,0,0;0,0,0;88,0,0;58,0,0;28,0,0;18,0,0;8,0,0;0,0,0;0,0,0',
        l: '9',
        rtp: '96.50',
        s: '3,5,4,7,3,5,6,4,7',
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
        balance_bonus: `0.00`,
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: `9`,
        na: (player.machine.winMoney > 0) ? `c` : `s`,
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: `3`,
        sver: `5`,  ///          
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    if (winLines.length)
        result["com"] = player.machine.winSymbols.join();

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS") {
            result["bgid"] = 0;
            result["bgt"] = 11;
            result["bpw"] = player.machine.moneyBonusWin;
            result["bw"] = 1;
            result["end"] = 0;
            result["na"] = "b";
            result["rsb_c"] = 0;
            result["rsb_m"] = 3;
            result["rsb_s"] = '8,9';
        }
    }

    if (player.machine.moneyCache) {
        result["mo_t"] = player.machine.moneyCache.table.join();
        result["mo"] = player.machine.moneyCache.values.join();
    }

    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        index: param.index,
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
    };

    return result;
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: `0.00`,
        balance_cash: player.balance,
        balance: player.balance,
        bgid: 0,
        bgt: 11,
        counter: ++param.counter,
        end: 0,
        index: param.index,
        na: `b`,
        stime: new Date().getTime(),
        sver: `5`,
    }

    var maskSpinIndex = player.machine.maskSpinIndex;

    if (maskSpinIndex == 0) {
        result.bpw = player.machine.moneyBonusWin;
        result.mo_t = player.machine.moneyCache.table.join();
        result.mo = player.machine.moneyCache.values.join();
        result.rsb_c = player.machine.moneyBonusCache.count;
        result.rsb_m = 3;
        result.rsb_s = "8,9";
        result.s = player.machine.view.join();

        if (player.machine.currentGame == "BASE") {
            //                    
            result.bpw = 0;
            result.rw = player.machine.moneyBonusWin;
            result.tw = player.machine.moneyBonusWin;
            result.na = "cb";
            result.end = 1;
        } else if (player.machine.moneyBonusCache.count == 3) {
            result.bpw = 0;
            result.end = 1;
            result.rw = player.machine.moneyBonusWin;
            result.tw = result.rw;
        }
    } else {
        result.end = (maskSpinIndex - 1) % 2;
        result.level = result.end;
        result.lifes = maskSpinIndex % 2;
        result.rw = 0;
        result.tw = player.machine.moneyBonusWin;

        result["wp"] = 0;

        if (maskSpinIndex <= 2) {
            result.bgid = 1;
            result.bgt = 21;
            result.coef = player.virtualBet;

            if (maskSpinIndex == 1) {
                result["status"] = "0,0";
                result["wins_mask"] = "h,h";
                result["wins"] = "0,0";
            } else { // == 2
                result["status"] = "1,0";
                result["wins_mask"] = "mult,prize";
                result["wins"] = "1,1";
            }
        } else {
            result.bgid = 3;
            result.bgt = 42;
            result.coef = player.machine.moneyBonusWin;

            if (maskSpinIndex == 3) {
                result["wof_mask"] = "wlm,wlm,wlm,wlm,wlm";
                result["wof_set"] = "2,3,5,8,10";
                result["wof_status"] = "0,0,0,0,0";
            } else { // == 4
                var multi = player.machine.moneyBonusMulti;
                var idx = player.machine.moneyBonusMultiIndex;

                result["rw"] = player.machine.moneyBonusWin / multi * (multi - 1)
                result["wof_mask"] = "wlm,wlm,wlm,wlm,wlm";
                result["wof_set"] = "2,3,5,8,10";

                var wof_status = [0, 0, 0, 0, 0];

                wof_status[idx] = 1;
                result["wof_status"] = wof_status.join();
                result["wof_wi"] = idx;
                result["wp"] = multi - 1;
                result["na"] = "cb";
            }
        }
    }

    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance: player.balance,
        balance_cash: player.balance,
        na: "s",
        rw: player.machine.moneyBonusWin,
        stime: new Date().getTime(),
        sver: "5",
        counter: ++param.counter,
        index: param.index,
        coef: '1.00',
        wp: 0,
    };

    if (player.machine.maskSpinIndex > 0) {
        var multi = player.machine.moneyBonusMulti;
        var coef = player.machine.moneyBonusWin / multi;

        result["coef"] = coef;
        result["rw"] = coef * (multi - 1);
    }

    return result;
}

module.exports = ApiManager;
