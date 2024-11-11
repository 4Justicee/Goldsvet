var Util = require('../../../utils/slot_utils');

function ApiManager() {
}

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance: '100,000.00',
        cfgs: '1',
        ver: '2',
        index: '1',
        balance_cash: '100,000.00',
        reel_set_size: '3',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0~15,12,10,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{rtps:{purchase:\"96.60\",regular:\"96.46\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"5524862\",max_rnd_win:\"10000\"}}',
        wl_i: 'tbm~10000',
        stime: '1649036672947',
        sa: '3,6,5,5,6',
        sb: '3,7,3,4,7',
        sc: '10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00',
        defc: '100.00',
        sh: '5',
        wilds: '2~1500,100,20,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '100.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1500,100,20,0,0;400,50,10,0,0;200,25,10,0,0;100,20,6,0,0;70,10,4,0,0;50,10,4,0,0;50,10,4,0,0',
        l: '20',
        total_bet_max: '10,000,000.00',
        reel_set0: '3,3,7,6,6,3,6,4,1,7,7,8,5,6,7,2,6,8,6,5,2,5,6,6,4,5,8,5,9,5,3,9,5,7,8,3,4,3,6,8,9,9,5,5,6,9,7,6,8,7,5,7,9,4,6,9,6,4,8,6,9,7,8,1,9,7,6,7,6,1,9,5,3,5,8,8,5,4,4,4,8,9,6,7,8,6,9,7,8,6,4,8,6,4,7,3,8,4,8,5,8,4,9,4,8,5,5,6,6,7,7,5,3,6,9,4,6,4,8,5,3,7,9,8,8,7,8,6,6,9,5,4,6,9,4,3,3,9,8,7,6,3,5,5,7,6,4,6,8,5,6,8,7,4,5,6,8,4,8,5,5,5,8,6,4,6,5,9,7,5,3,4,9,4,5,3,8,5,3,4,5,6,4,7,6,8,3,3,6,4,9,6,5,8,5,5,9,6,6,4,8,7,5,4,8,4,4,6,8,5,5,6,6,3,4,5,7,8,3,5,3,7,5,6,6,9,7,9,6,7,4,9,6,8,7,3,9,2,8,9,4,7~3,9,3,7,7,3,9,9,6,5,8,8,6,9,9,8,7,7,9,3,9,7,9,6,7,7,4,7,8,1,3,8,7,3,9,3,7,9,9,6,6,4,7,3,7,9,9,4,9,9,8,7,8,9,4,9,5,3,7,7,5,9,8,5,6,7,9,5,9,3,7,7,4,8,5,7,5,2,8,4,4,7,7,8,9,1,5,7,9,7,5,7,4,6,5,7,8,4,3,8,8,7,7,3,5,5,7,6,7,4,1,6,7,9,9,8,8,6,3,7,4,7,8,7,9,9,9,4,9,3,8,7,9,5,6,9,8,9,9,7,3,5,7,8,7,6,8,3,3,9,7,9,2,8,7,7,3,6,8,5,7,9,9,7,9,7,9,9,7,6,7,7,3,9,7,9,9,7,3,9,9,7,9,6,6,9,9,8,9,7,7,2,3,3,9,7,7,9,4,9,8,4,9,7,7,9,7,5,5,9,9,6,7,9,3,9,9,4,7,9,9,8,7,9,9,7,9,4,9,5,9,7,7,8,9,8,9,7,7,8,9,6,9,3,9,7,8,7,3,3,8~9,7,7,3,4,6,5,3,8,6,5,5,6,9,3,8,5,3,7,9,4,9,8,7,5,4,5,3,2,7,6,9,4,9,5,7,8,8,5,9,5,9,4,8,8,5,3,8,5,4,8,3,4,8,5,4,5,3,7,4,5,8,6,8,7,8,6,8,4,8,3,9,9,4,9,6,8,6,5,7,5,4,8,6,8,4,7,5,1,4,8,7,9,7,6,3,6,7,9,6,1,4,9,9,7,8,8,5,8,6,8,6,3,8,5,8,9,5,8,2,4,4,7,9,4,6,9,6,7,4,4,5,8,4,5,8,7,4,6,9,8,9,3,5,4,7,4,3,5,4,5,6,6,5,4,9~4,7,9,3,9,7,7,6,4,6,9,7,4,6,5,7,9,7,6,3,7,7,8,9,3,5,8,6,7,9,4,9,8,9,9,4,9,2,7,3,9,4,3,3,9,9,3,4,8,7,6,7,9,7,4,3,9,8,9,5,9,9,3,3,9,6,6,8,4,7,9,7,1,7,6,9,7,6,9,7,3,3,9,7,7,9,1,9,8,7,7,7,7,7,4,3,5,7,5,9,9,6,9,7,9,6,9,7,2,9,9,3,7,7,8,7,8,7,9,6,6,7,9,8,3,8,9,9,3,7,4,7,3,3,5,3,9,5,7,9,4,8,7,6,7,4,7,3,9,7,3,9,3,3,9,3,5,5,3,8,7,5,5,9,6,7,9,7,3,9,7,9,5,8,7,9,7,3,7,3,8,7,5,9,5,9,7,3,4~4,7,6,7,4,4,7,5,8,5,7,3,4,7,7,5,7,9,8,9,6,4,4,8,7,5,6,5,7,6,8,6,9,6,5,6,6,5,9,9,7,3,4,2,3,4,6,4,4,8,6,6,4,6,6,5,8,4,8,7,8,8,6,5,8,4,5,9,5,8,7,7,5,6,1,4,4,5,5,7,8,3,5,6,6,6,5,6,9,7,5,6,4,3,6,8,8,4,4,9,9,6,4,6,7,8,7,9,9,3,4,7,9,6,7,7,3,4,7,6,9,8,3,4,3,8,7,6,3,9,6,1,4,9,6,8,3,1,8,4,9,7,4,5,8,4,3,5,4,8,2,9,6,8,9,6,4,2,6,4,8,4,8,8,5,8,6,4,5,8,6,5,5,5,3,9,9,6,8,5,4,4,6,6,3,5,3,8,8,6,5,9,3,5,9,8,7,6,6,4,6,5,4,6,4,6,5,6,9,4,4,9,6,5,5,9,7,3,5,5,6,6,8,9,7,8,8,9,4,5,8,6,8,6,4,8,8,5,6,7,6,9,4,6,3,4,9,8,7,6,8,5,5,7,5,8,3,8,5,6',
        s: '3,6,3,3,7,5,9,6,4,9,4,7,8,5,7,5,8,6,4,6,4,7,8,3,8',
        def_s: '3,6,3,3,7,5,9,6,4,9,4,7,8,5,7,5,8,6,4,6,4,7,8,3,8',
        accInit: '[{id:0,mask:\"cp;mp\"}]',
        reel_set2: '5,7,8,3,9,8,8,7,6,6,4,4,7,8,5,3,5,7,8,6,4,4,7,4,1,6,7,6,3,8,5,4,5,7,9,6,7,8,4,6,3,9,9,4,8,3,8,8,5,5,6,3,9,5,7,5,5,6,6,4,5,6,4,3,6,8,5,7,1,6,5,7,7,8,8,5,4,5,3,4,7,9,8,3,9,5,8,7,6,7,6,5,3,5,9,4,5,5,5,9,6,5,8,6,5,5,6,7,8,9,7,9,5,9,6,8,6,5,6,4,4,9,4,6,5,9,3,4,7,3,7,6,8,1,4,5,4,7,8,9,5,4,8,2,8,5,5,6,8,8,3,6,3,8,4,2,3,6,6,3,6,6,4,7,9,8,6,5,5,7,4,8,4,8,5,6,3,5,9,2,8,8,3,4,9,6,9,6,3,7,9,9,6,5,6,8,9,9,7,7~5,8,3,9,7,8,3,9,9,5,2,6,2,7,9,7,9,7,9,6,9,9,6,3,7,5,9,7,8,7,7,5,5,8,9,7,7,6,6,7,7,8,3,5,9,7,3,6,7,3,3,9,6,4,8,5,9,3,6,7,7,1,9,8,8,7,3,7,3,9,4,7,9,9,4,4,7,9,7,7,9,8,9,8,8,2,9,3,8,7,8,9,9,7,5,9,6,7,3,4,7,8,3,9,9,3,7,1,4,3,4,8,8,7,6,8,5,9,4,8,7,7,5,2,9,9,9,1,7,7,8,7,3,9,9,5,7,5,9,8,9,5,7,7,5,8,8,7,9,4,9,6,5,9,6,7,9,4,9,7,7,9,8,9,8,6,7,4,7,7,9,9,7,7,3,8,3,8,9,9,7,9,7,7,4,9,5,8,9,7,9,8,8,9,9,8,3,9,9,3,7,7,9,8,9,7,3,6,9,9,7,9,9,7,7,8,5,8,9,8,4,8,7,7,3,9,6,9,5,7,3,7,3,6,9,3,2,7,2,7,8,3,8,9,5,5,9,7,5,7,7,9,9,8~5,6,4,8,8,5,6,9,5,5,6,8,8,7,7,9,9,8,8,6,8,9,5,5,7,6,4,7,4,6,4,8,4,3,6,4,6,9,4,8,9,2,3,5,5,4,5,3,7,6,5,8,7,6,9,9,5,7,9,8,4,4,5,4,7,5,4,4,5,6,1,9,4,4,5,3,7,7,3,3,6,4,5,8,8,5,8,6,5,3,5,6,2,7,5,7,4,7,8,5,6,8,3,4,7,5,3,8,9,9,4,8,8,9,6,7,6,9,2,7,4,4,5,6,3,4,6,9,4,8,9,4,3,8,8,9,6,8,5,5,4,3,4,5,2,8,8,7,8,7,4,9,8,6,6,5,1,7,5,4,9,8,4,9,6,9,5,6,5,9,3,5,5,8,2,8,6,9,6,8,5,4,3,3,8,4,6,8,9,8,9,8,7,4,7,8,3,6,6,8,7,9,7,6,8,3,9,4,5,9,9,5,3,8,7,5,8,5,1,5,4,8,9,6,4,3,4,9,5,6,5,4,9,7,3,8~9,7,9,8,5,9,2,8,4,7,9,7,3,9,7,5,9,7,9,3,3,1,7,9,6,7,7,4,7,8,7,2,9,9,7,9,9,3,3,2,6,7,9,9,7,9,9,3,7,8,9,9,5,7,4,8,6,3,5,7,8,9,7,7,5,3,7,7,3,9,6,9,3,7,6,7,9,3,6,7,7,6,8,6,6,3,4,5,7,5,7,7,9,7,3,5,3,6,6,2,5,2,4,8,6,4,8,9,9,6,8,7,9,7,3,9,7,9,9,7,9,7,9,5,1,4,3,9,3,7,9,3,9,5,7,9,7,3,9,3,9,3,7,9,4,3,9,3,9,9,3,7,1,9,8,7,9,3,7,3,8,9,3,3,5,6,9,4,5,9,7,8,4,9,9,8,3,7,3,7,7,9,6,6,8,9,9,7,9,8,5,4,3,7,3,4,4,8,9,7,6,8,4,7,9,9,6,8,9,6,4,9,7,3,3,5,7,9,5,4,9,4,3,7,3,8,9,8,9,6,7,7,2,9,3,7,8,9,7,5,7,3,7,7,4,7,3,7,3,9,7,7,9,5,9,6,3,9,9,6,7,4,9,4,3,7~3,8,9,1,4,8,5,9,4,7,9,4,8,4,6,7,4,9,6,5,6,7,8,4,8,6,7,6,5,5,9,6,5,7,4,8,6,8,8,4,9,7,7,4,5,8,6,8,8,9,4,6,8,5,8,6,5,8,5,6,4,9,7,6,9,6,3,3,6,2,8,3,4,5,5,5,6,4,6,5,6,4,5,6,7,6,6,8,7,3,8,8,7,5,5,6,5,5,9,8,7,8,5,5,9,5,7,9,4,3,8,4,6,8,5,6,9,7,9,9,5,5,8,8,7,8,2,4,5,8,9,7,4,3,3,6,3,6,7,4,8,8,3,6,6,3,4,9,5,1,5',
        t: 'stack',
        reel_set1: '4,1,2,6,4,3,7,5,6,9,6,4,8,8,6,6,4,4,8,4,9,4,7,6,4,5,8,6,4,9,3,4,7,5,3,5,5,9,5,8,5,8,7,8,6,6,7,3,3,7,6,5,6,8,8,4,8,5,8,5,4,6,4,8,4,5,7,9,8,7,7,6,9,6,8,5,6,9,3,5,9,4,9,8,6,7,5,9,5,5,6,4,8,1,5,6,6,8,6,6,9,5,5,5,6,5,3,7,8,9,8,9,8,4,5,6,7,5,6,7,6,5,5,4,5,5,7,4,3,5,7,3,7,8,5,7,7,5,9,3,8,8,6,8,6,7,6,6,7,5,6,9,6,2,9,4,5,8,1,3,4,4,3,7,3,3,7,6,5,8,8,3,7,8,7,4,7,9,3,2,9,5,9,8,6,9,8,5,5,9,8,8,5,9,6,5,5,6,6,4,6,4,9,3,3,6,3~9,6,8,7,7,4,8,7,9,7,8,9,7,7,3,8,6,4,7,7,8,7,4,5,3,8,7,9,6,5,4,7,3,8,9,5,5,9,6,9,7,9,7,6,9,7,9,7,4,2,7,3,5,7,7,9,9,7,7,9,6,9,8,9,6,8,7,9,9,3,9,6,9,6,8,9,7,7,8,7,3,3,9,9,8,3,7,1,9,6,9,1,2,7,8,5,3,1,7,7,9,9,9,4,8,5,9,3,7,8,7,2,7,8,9,7,5,9,4,9,8,3,3,9,9,7,9,9,5,9,9,7,4,7,8,9,3,7,9,5,8,9,3,9,4,2,8,7,4,5,5,9,7,7,3,5,5,3,9,8,3,6,9,6,4,7,9,7,6,4,7,7,4,3,9,7,3,7,9,8,7,6,9,3,9,6,8,9,8,7,9,7,7,9,7,8,9,9,4,7,9,4,2,5,3,7~8,7,6,5,9,6,8,3,6,5,5,4,5,6,6,5,9,7,5,9,4,8,4,5,6,4,4,2,5,9,4,8,5,6,9,7,5,9,6,2,3,8,5,4,4,6,9,7,5,1,8,9,3,4,6,9,8,4,1,6,5,9,5,3,3,9,8,9,8,6,7,9,8,7,5,4,6,8,7,8,8,4,9,6,8,8,6,4,7,4,7,8,4,5,8,5,4,8,5,4,3,9,7,3,6,6,8,6,5,9,7,7,6,8,7,4,4,3,9,2,8,8,2,5,5,3,8,3,5,9,4,4,3,3,8,7,8,7,9,4,4,9,7,3,5,7,8,6~7,5,6,3,7,7,8,6,6,7,7,9,3,7,5,9,7,3,6,3,6,6,7,3,6,7,8,7,5,7,6,2,6,4,9,9,6,9,7,6,7,3,1,8,9,9,6,7,7,9,9,8,9,7,9,8,3,8,7,9,3,7,4,9,4,4,7,9,7,9,9,3,3,8,7,4,7,8,9,7,3,5,9,3,6,3,7,3,7,8,9,5,9,6,9,4,9,7,9,9,5,3,9,7,9,8,5,2,9,8,3,9,3,9,7,7,9,9,8,5,3,6,7,9,7,5,4,5,3,9,9,7,8,1,7,7,3,3,4,3,7,9,4,9,3,9,3,3,4,2,3,3,7,7,9,9,7,9,2,7,9,5,4,9,4,3,9,9,8,3,3,7,8,7,7,8,9,5,4,7,9,7,9,9,7,9,4,6~4,4,8,9,3,4,9,7,8,7,8,6,9,6,7,6,8,7,3,6,4,7,7,3,8,6,4,6,9,9,6,8,7,5,6,5,7,4,5,7,5,9,7,9,9,7,9,8,5,8,6,6,4,4,3,3,6,4,9,5,3,7,1,6,4,4,6,4,8,4,8,6,6,7,5,3,6,5,9,5,4,3,5,4,3,6,4,7,4,3,4,5,4,6,4,8,6,9,8,8,4,4,8,8,7,4,9,6,9,4,6,5,6,8,6,5,4,8,8,4,6,5,3,4,5,9,5,5,4,7,6,6,8,6,5,5,5,4,7,8,3,6,5,4,5,5,8,6,3,7,6,5,6,5,9,9,8,8,7,6,4,7,9,6,4,6,4,9,6,8,8,4,8,8,9,9,5,4,6,9,6,5,7,8,7,7,3,2,5,4,6,6,5,4,6,8,5,5,8,6,9,8,4,6,5,8,5,2,8,6,4,9,9,6,5,7,7,3,5,8,8,5,4,5,6,7,3,8,4,8,4,2,3,7,8,5,9,3,9,6,1,5,6,7,7,6,5,6,3,6,6,4,8,1,3,8,5,9,8,9,8,8,7,7,6,4,6,8,9,9,4,8',
        purInit: '[{type:\"fs\",bet:2000}]',
        total_bet_min: '10.00',
    };

    //             api            
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
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "20",
        na: "s",
        reel_set: 0,
        sh: 5,
        stime: new Date().getTime(),
        sver: "5",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
        sa: player.machine.virtualReels.above,
        sb: player.machine.virtualReels.below
    };

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    if (player.machine.slm_mp.length > 0) {
        result["slm_mp"] = player.machine.slm_mp.join();
        result["slm_mv"] = player.machine.slm_mv.join();
    }

    if (player.machine.multiWinLines.length > 0) {
        var slm_lmi = [];
        var slm_lmv = [];
        player.machine.multiWinLines.forEach(function (item) {
            slm_lmi.push(item[0]);
            slm_lmv.push(item[1]);
        });
        result["slm_lmi"] = slm_lmi.join();
        result["slm_lmv"] = slm_lmv.join();
    }

    if (player.machine.wildChangeArr.length > 0) {
        var sts = [];
        var sty = [];
        player.machine.wildChangeArr.forEach(function (item) {
            sts.push(2);

            sty.push(`${item[0]},${item[1]}`);
        });
        result["sts"] = sts.join('~');
        result["sty"] = sty.join('~');
    }

    if (player.machine.prevTumbleStatus == "NOTUMBLE" && player.machine.tumbleStatus == "TUMBLE") {
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "mc";
        result["tmb"] = player.machine.tumbles.join('~');
        result["tmb_win"] = player.machine.tmb_res;
    }
    if (player.machine.prevTumbleStatus == "TUMBLE") {
        result["na"] = "s";
        result["tw"] = player.machine.tmb_res;
        result["tmb_win"] = player.machine.tmb_res;
        if (player.machine.tumbleStatus == "TUMBLE") {
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.tumbleIndex - 1;
            result["tmb"] = player.machine.tumbles.join('~');
            result["tmb_win"] = player.machine.tmb_res;
            result["rs"] = "mc";
        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["rs_t"] = player.machine.tumbleIndex - 1;
            result["tw"] = player.machine.tmb_res;
            result["tmb_res"] = player.machine.tmb_res;
            result["tmb_win"] = player.machine.tmb_res;
            result["na"] = "c";
        }
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["puri"] = 0;
            result["purtr"] = 1;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        result["puri"] = 0;
        //                       
        if (player.machine.tumbleStatus == "TUMBLE") {
            result["tw"] = player.machine.freeSpinWinMoney + player.machine.tmb_res;
        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["tw"] = player.machine.freeSpinWinMoney;
        }
        result["acci"] = 0;
        result["accm"] = "cp";
        result["accv"] = player.machine.totalMulti;
        result["wmt"] = "pr2";
        result["wmv"] = player.machine.totalMulti;

        if (player.machine.totalMulti > 1) {
            result["gwm"] = player.machine.totalMulti
        }
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["tw"] = player.machine.freeSpinWinMoney;
        }
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