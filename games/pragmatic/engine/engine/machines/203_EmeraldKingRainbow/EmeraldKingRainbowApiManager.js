var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '3,4,5,6,7,3,4,5,6,7,3,4,5,6,7',
        balance: '100,000.00',
        cfgs: '1',
        accm: 'cp~tp~lvl~sc',
        ver: '2',
        acci: '0',
        index: '1',
        balance_cash: '100,000.00',
        def_sb: '5,7,7,8,2',
        reel_set_size: '12',
        def_sa: '8,3,4,3,3',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        accv: '0~16~0~0',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{props:{max_rnd_sim:\"1\",max_rnd_hr:\"402928\",max_rnd_win:\"20000\"}}',
        wl_i: 'tbm~20000',
        stime: '1645597827248',
        sa: '8,3,4,3,3',
        sb: '5,7,7,8,2',
        reel_set10: '7,5,3,3,3,10,3,10,3,5,3,10,5,3,10,3,5,3,10,3~8,6,9,3,3,3,3,4,9,3,9,3,9,3,9,3,9~3,3,3,3,6,4,5,7,9,8,5,8,4,9,8,9,4,5,9,8,5,4,8,4,8,4,9,8,9,4,8,4~3,3,3,3,7,5,6,8,4,10,6,7,10,5,6,10,6,5,6~3,3,3,5,7,6,8,3,4,6,8',
        sc: '10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,9000.00,10000.00,12000.00',
        defc: '100.00',
        reel_set11: '9,3,8,4,3,3,3,6,3,4,3,4,3,4,3,6,3,4,3,4,3,4,8~4,3,3,3,3,6,8,5,7,9,3,7,3,7,9,3,6,3,9~7,10,5,3,3,3,3,5~3,3,3,7,5,6,3,8,10,4,7,5,10,5,7,5,4,6,4~3,3,3,7,5,8,3,4,6,4,6,8,5,8,5,4,6,8,6,4,6,8',
        sh: '3',
        wilds: '2~0,0,0,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        st: 'rect',
        c: '100.00',
        sw: '5',
        sver: '5',
        g: '{ms01:{def_s:\"14,14,14\",sh:\"1\",st:\"rect\",sw:\"3\"},ms02:{def_s:\"14,14,14\",sh:\"1\",st:\"rect\",sw:\"3\"},ms03:{def_s:\"14,14,14\",sh:\"1\",st:\"rect\",sw:\"3\"},ms04:{def_s:\"14,14,14\",sh:\"1\",st:\"rect\",sw:\"3\"},ms05:{def_s:\"14,14,14\",sh:\"1\",st:\"rect\",sw:\"3\"},mss:{screenOrchInit:\"{type:\\\"mini_slots\\\",layout_h:1,layout_w:5}\"}}',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,300,100,0,0;300,100,20,0,0;300,100,20,0,0;200,20,10,0,0;200,20,10,0,0;200,20,10,0,0;0,0,0,0,0;0,0,0,0,0;300,0,0;200,0,0;100,0,0;0,0,0',
        l: '20',
        rtp: '96.71',
        reel_set0: '9,4,3,3,3,7,6,3,10,5,8,2,7,6,3,7,2,5,3,2,7,6,7,3,7,4,5,7,3,7,3,6,7,3,4,7,3,2,4,8,5,4,3,4,2~8,4,6,7,3,9,3,3,3,2,5,10,2,2,2,3,6,10,3,2,3,10,5,10,3,10,2,3,6,3,4,3,6,2,5,10,3,9,7,4,5,3,9,6,9,10,3,10,5,2,10,3,10,7,2,3,10,6,5,3,10,6,10,3,10,3,5,10,2,10,4,2,10,3,9~3,3,3,9,10,5,4,3,7,6,4,7,10,9,6,7,6,9,4,9,7,6,9,6,9,10,9,4,10,7,9,6,9,4,10,4,7,6,10,6,7,4,6,7~10,3,3,3,3,9,8,4,5,2,6,7,3,7,6,3,7,2,8,7,6,8,7,3,5,3,4,3,9,6,8,3,8,6,8,9,8,7,3,9,6,3,7,9,4,5,9,5,4,7,2,8,7,8,3~10,3,3,3,5,7,4,9,3,8,6,2,3,4,3,8,3,7,8,9,7,8,3,4,9,3,4,8,7,8,3,4,2,3,8,4,3',
        s: '3,4,5,6,7,3,4,5,6,7,3,4,5,6,7',
        accInit: '[{id:0,mask:\"cp;tp;lvl;sc;cl\"}]',
        reel_set2: '10,7,3,3,3,4,2,6,3,5,8,9,3,2,7,4,5,3,9,4,3,9,8,3,7,9,7,8,5,3,4,3,6,7,3,7,8,4,8,7,8,5,3,7,6,4,3,8,4,6,7,4,9,8,7,8,7,8,3,7,3,4,7,3,6,7,8,4,6,8,6,8,3,4,7,4,3,4,6,8,3,8,9,3,8,7,4,8,3,4,8,3,8,3,4,3,4,3,2,7,8,6,4,5,4,8,9,3,6,7,5,3,7,8,4,8,3~3,3,3,5,4,9,6,10,7,3,6,7,5,6,7,6,7,4,6,5,10,7,6,5,6,10,4,5,7,4,10,6,7,10,4,10,6,7,9,7,10,5,7,10,7,10,9,10,4,6,10,9,5,6,5,10,5,10,9,6,4,6,5,10,7,6,5,6,5,10,4,6,7,6,4,6,10,6~3,3,3,6,2,2,2,10,3,9,2,8,7,5,4,8,6,8,2,5,2,8,2,9,6,4,5,2,9,4,5,8,4,8,9,2,10,8,9,2,8,2,8,6,4,6,8,5,10,9,2,9,6,7,5,9,8,5,2,5,9,8,9,5,9,2,6,9,8,5,8,6,9,2,10,9,8,9,8,2,4,5,9,8,9,10,5,2,10,8,9,8,10,9,6,9,5,4,9,8,9,2,6,8,5,2,8,2,9,5,2,9,5,2,9,8,2,8,2,4,8,4,9,8,4,2,8,9,8,2,5,9,2~2,3,3,3,6,10,7,8,4,9,5,3,6,10,6,3,5,10,5,3,6,7,3,6,10,9,7,3,6,10,5,3,6,5,9,4,3,6,10,9,10,9,3,9,7,3,10,3,10,9,10,6,5,6,9,7,9,6,9,6,4,9,10,6,5,10,6,3~9,10,3,3,3,3,5,7,4,8,6,2,6,10,8,4,6,8,3,6,3,8,3,8,7,3,8,3,4,3,8,10,3,8,6,3,8,6,3,8,3,4,7,3,6,3,7,3,7,3,8,4,6,8,4,8,3,8,7,3,4,6,4,2,4,7,8,3,2,8,4,8,5,3,4,5,3,4,3,10,3',
        reel_set1: '2,2,2,6,8,3,3,3,9,4,10,2,7,3,5,3,10,6,9,8,3,6,10,6,9,3,8,4,9,3,9,4,6,3,10,9,6,3,5,3,4,10,4,9,3,10,3,9,3,10,8,3,9,6,8,3,5,3,8,6,10,3,6,10,8,10,3,5,8,9,5,7,5,9,3,5,3,7,3,4,3,6,3,5,6,9,6,9,10,3,4,3,5,9,8,10,7,6,4,10,8,6,3,9~3,7,3,3,3,8,4,6,9,5,10,2,5~3,3,3,10,4,7,6,5,3,9,10,7,10,5,4,7,10,5,10,7,10,4,10,7,5,7,5,7,5,4,10,7,4,6,7,10,5,10,5,10,4,5,4,7,10,6,5,7,4,10,4,7,5,7,5,10,5,10,4,5,7,4,7,10,5,10,5,10,4,10,5,7~8,9,10,7,4,6,3,5,3,3,3,2,6,7,3,4,7,2,6,3,4,6,10,7,5,6,4,2,3,4,3,6,7,2,3,6,3,9,7,3,2,3,7,2,6,2,6,2,3,4,3,6,3,7,6,3,4,6,3,2,7,3,7,9,4,3,10,3,4,7,2,7,10,7,6,3~3,3,3,4,7,8,5,9,2,6,3,10,9,7,8,7,9,10,7,6,2,9,7,4,10,9,10,7,2,4,9,2,7,9,10,9,4,7,4,6,2,8,7,6,7,2,4,7,2,4,7,9,5,9,7,2,10,2,8,2,7,4,9,2,9,6,2,10,9,8,2,4,7,2,4,8,10,2,9,2,8,9,10,9,8,4,10,7,9,2,9,4,9,7,9,2,9,4,10,4,10,4,2,9,2,4,9,7,2,6,7,6,10,8,7,6,2',
        reel_set4: '3,3,3,6,9,4,3,8,5,10,4,5,4,8,4,8,4,10,8,4,8,4,10,9,10,8,9,4,10,8,4,10,5,4,8,10,9,10,4,8,4,10,4,10,4,10,4,8,10,4,10,4,9,4,10,4,8,4,10,6,4,8,9,10,4,6,10~3,3,3,2,9,8,4,5,7,3,10,4,8,4,7,8,7,8,9,10,4,8,7,4,10,2,4,5,7,4,7,8,4,5,4,8,7,4,10~9,3,3,3,2,6,3,5,8,4,7,3,6,3,6,2,7,3,6,2,6,8~3,3,3,7,6,10,9,2,5,8,4,3,8,5,10,8,10,7,9,8,9,10,2,5,9,5,6,8,9,6,5~3,3,3,6,9,2,10,5,8,3,7,4,8,10,8,2,4,6,8,4,2,5,9,2,10,6,9,4,6,2,8,7,2,6,8,9,4,10,2,4,2,5,8,6,5,2,8,2,5,8,2,4,5,2,7,5,2,5,2,5,4,6,5,4,8,10',
        reel_set3: '3,3,3,8,10,2,3,7,4,5,9,8,10,5,4,10,8,10,8,7,8,5,8,4,8,4,8,7,8,4,5,8,9,5,7,5,8,4,8,4,9,5,9,7,4,7,4,8,7,8,2,4,5,7,9~4,6,9,10,3,3,3,5,8,3,6,3,9,3,10,8,3,6,3,10,6,3,9,3,8,6,9,8,3,10,8,9,10,6,8,3,8,10,9,10,3,9,3,6,3,10,8,9,3,6,9,6,3,6,3~8,3,3,3,9,7,5,6,3,2,4,6,3,7,9,3,7,6,3,9,3,9,3,7,6,3,5,7,3,7,3,7,3,4,7,3,7,3,5,7,3,7,3,7,9,5,7,9,3,7,3,7,3,5,9,3,7,3,7,3,5~4,3,3,3,2,3,6,8,9,7,10,5,7,6,7,9,2,7,5,6,7,3,7,5,9,3,8,7,6,8,6,2,3,7,10,3,7,6,3,10,7,8,2,7,3,7,8,5,7,3,7,2,7,3,7,3,7,2,3,6,2,7,2,3,7,3,2,3,6,3,8,2,9,2,7,3,8,7,6,3,8,7,2,9,7,8,3,8,3,8,3,7,10,7,10,7,2,10,6~3,3,3,7,10,9,5,2,8,4,3,6,10,7,10,7,2,5,10,7,9,8,10,8,10,4,10,4,6,7,6,8,2,7,10,8,4,8,7,10,8,7,5,4,10,8,10,8,4,8,6,10,8,10,8,10,8,5,10,8,10,7,8,10,8,7,8,10,8,7,4,8,10,7,10,4,10,4,5,10,7,2,7,10,2,8,4,10,4',
        reel_set6: '5,10,7,9,2,6,4,10,7,4,9,7,2,7,10,2,7,10,2,10,7,10,2,10,7,9,7,9,10,7,10,2,7,10,2,7,4,10,7,2,10,7,10,7~6,8,3,4,10,3,4,8,4,8,3,8,4,3,4,8,3,4,8,3,8,3,8,3,8,10,3,8,4,8,4,3,10,3,8,4,3,8,3,8,3,8,3,8,4,3,8,4,8,3,4,10,8,4,3,4,8,3,8,3,8,3,8,4,3,8,3,4,10,3,4,8,3,4,8,3,8,3,8,4,8,4,8,3,4,10,4,3~3,5,9,7,8,3,3,3,7,8,9,8,7,8,7,8,7,8,7,5,8,7,8,7,9,8,9,7,8,7,8,9,8,5,8,5,8,7,8,9,8,7,8,7,5,8,5,8,7,8,7,8,9,5,7,8,7,5,7,8,7,9,7,8,7,8,7,8,7,9,7,9~2,2,2,10,8,6,3,4,5,2,7,10,4,5,10,3,10,5,6,7,4,7,8,7,3,7,5,6,4,3,5,7,4,10,4,5,7,3,10,3,5,7,3,10,7,5,7,6,7,5,3,8,10,7,5,8,3,7,10,7,10,8,7,5,4,10,6,3,5,6,5,7,4,6,5,7,3,10,3,7,8,5,10,7,4,3,5~2,2,2,6,4,7,5,2,3,8,10,3,3,3,4,10,3,7',
        reel_set5: '3,3,3,2,4,7,3,5,10,9,8,4,5,7,8,9,8,5,7,4,10,4,5~3,3,3,9,6,5,4,2,3,8,7,2,8,7,9,8,4,7,9,4,8,9,7,9,8,9,8,2,8,4,7,9,4,8,9,4,9,8,4,7,9,7,8,2,9,8,9,7,4,7,4,2,7,8,9,4,9,4,8,7,4,9,8,5,7,4,8,7,4,8,4,9,7,2,5,4,9,4,9,8,7,8,9,8,4~3,3,3,4,3,8,6,5,10,9,10,4,6,4,8,10,8,10,8,10,4,10,4,8,4,10,4,10,4,10,8,10,4,8,4,6,10,4,10,6,10,6,8,4,10,4,6,5,10,6,10,8,6,4,8,10,4,8,4,6,10,6,8,4,6,10,4,6,8,10,8,4,10,8,6,4,8,4,6,10,4~2,3,3,3,10,9,3,8,5,6,4,7,3,5,3,9,5,7,8,3,7~3,8,7,3,3,3,2,6,10,4,5,9,7,9,4,9,5,7,4,7,10,5,4,10,8,4,5,10,8,4,6,9,5,4,5,8,5,8,4,6,7,10,4,7,9,7,10,7,5,4,5,4,5,4,10,6,7,9,5,7,5',
        reel_set8: '10,2,6,9,5,7,4,5,7,9,2,9,5,9,7,2,5,9,5,6,2,9,7,2,5,2,5,2,4,5,2,9,5,9,7,9,7,2,9,2,5,2,9,2,9,5,2,5,7,2,7,2,7,9,2,9,2,7,5,9,2,9,7,5,9,5,2,9~3,3,3,9,7,5,3,8,5,7,5,8,5,8,5,8,5,8,5,9,5~4,3,10,6,8,10,3,10,3,10,8,10,8,3,8,10,8,3,8~2,4,2,2,2,5,10,6,3,7,8,3,6,3,5,3,8,3,6,3,6,3,6,3,6,3,6,5,8,3,10,3,5,6,3,6,3,8,3,7,5,8,7,6,8,6,8,10,6,7,6,5,3,6,3,6,3,5,7,6,4,7,5,7,6,3,6,5,6,5,3,4,8,5,3,6,5,3,6,3,6,7,6,3,6,10,8,6,3,6,5,3,6,7,6,3,8,3,7~2,2,2,5,2,7,3,3,3,4,10,3,8,6,5,4,6,4,3,5,8,5,7,8,3,4,6,8,7,6,5,7,5,3,5,8,5,7,8,6,5,6,5,8,5,7,6,8,6,5,7,5,6,7,5,3,8,5,6,7,8,5,6,8,6,5,4,3,5,10,7,8,5,6,3,4',
        reel_set7: '10,3,4,6,8,6~6,2,7,5,9,10,4,10,7,5,9,2,10,2,7,10,7,9,7,2,7,5,2,7,9,7,2,7,10,9,5,2,7,10,2,7,2,5,2,7,4,7,9,10,7,4,2,7,9,2,7,9,2,4,10,7,10,2,10,2,10,2,9,7,10,7,10,9~7,3,3,3,3,9,8,5,9~2,2,2,5,4,6,3,8,2,10,7,6,8,4,8,7,8,7,8,10,4,7,10,5,10,7,8,10,6,7,4,7,8,10,8,5~2,2,2,5,4,3,3,3,10,3,2,7,6,8,4,7,3,6,3,5,3,5,4,7,6,5,8,5,4,3,5,6,3,5,4,5,3,4,5,3,4,5,8,3,7,3,5,7,3,4,6,3,4,8,5,4,6,4,5,3,5,4,7,6,3,8,7,6,4',
        reel_set9: '3,3,3,8,6,9,3,4,9,6,9,4,9,4,6,4,8,4,8,4,6,9,8~5,7,3,3,3,10,3,10,3,7,10,3,10,3,10,3,10,3,10,3,10,3~3,3,3,4,5,3,9,6,7,8,5,6,9,5~4,10,8,3,3,3,3,7,5,6,10,3,7,3,5,7,10,7,5,7,5,3,7,3,7,5,7~7,3,3,3,5,4,6,3,8,4,3,6,4,3,6,3,6,4,3,4,6,3',
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
        acci: 0,
        accm: "cp~tp~lvl~sc",
        accv: `${player.machine.cp}~16~1~1`,
        balance_bonus: "0",
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "20",
        ls: "0",
        na: player.machine.winMoney > 0 ? "c" : "s",
        reel_set: "0",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "3",
        st: "rect",
        sw: "5",
        sver: "5",   
        trail: `grc~${player.machine.greenCnt}`,
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };
    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    if (player.machine.miniSpinIndex > 0) {
        var g = '{mss:{';

        result["na"] = 's';
        result["trail"] = 'grc~5';

        var cache = player.machine.miniViewCache;
        var sn_lay = player.machine.miniSlotList;
        var miniSpinIndex = player.machine.miniSpinIndex;

        var sn_i = [];
        var sn_mult = [];
        var sn_pd = [];

        for (var i = 0; i < sn_lay.length; ++i) {
            sn_i.push(`ms0${i}`);
            sn_mult.push(1);
            sn_pd.push(1);
        }

        var len = 0;


        if (player.machine.miniSpinIndex > 1) {    //                       
            len = cache.length;

            for (var i = 0; i < len; ++i) {
                if (WinFromMiniView(cache[i].view, Number(player.virtualBet)) > 0) {
                    sn_pd[cache[i].id] = 0;
                }
            }
        } else {
            len = sn_lay.length;

            for (var i = 0; i < len; ++i) {
                sn_pd[i] = 0;
            }

        }

        g += 'sn_i:"' + sn_i.join(';') + '",';
        g += 'sn_lay:"' + sn_lay.join(';') + '",';
        g += 'sn_mult:"' + sn_mult.join(';') + '",';
        g += 'sn_pd:"' + sn_pd.join(';') + '"}';

        for (var i = 0; i < len; ++i) {
            if (player.machine.miniSpinIndex == 1) {
                g += ',' + sn_i[i] + ':{';
                g += 's:"' + '14,14,14' + '",';
            } else {
                g += ',' + sn_i[cache[i].id] + ':{';
                g += 's:"' + cache[i].view.join() + '",';

                var win = WinFromMiniView(cache[i].view, Number(player.virtualBet));

                if (win > 0) {
                    g += `l0:"0~${win}~0~1~2",`;
                }
            }
            g += 'sh:"1",st:"rect",sw:"3"';
            g += '}'
        }

        g += '}';

        result["g"] = g;
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.currentGame == "FREE") {
            result["ls"] = 1;
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = miniSpinIndex - 1;
            result["rs"] = "mc";
        } else {
            //   
            result["rs_t"] = player.machine.miniSpinLength;
            result["w"] = 0;
            result["na"] = 'c';
            //tw      !!!
        }

        if (player.machine.miniSpinIndex == 1) {
            result["ls"] = 0;
        }
    }

    if (player.machine.currentGame == "BONUS") {
        result["bw"] = 1;
        result["na"] = 'b';
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: '0.00',
        balance_cash: player.balance,
        balance: player.balance,
        bgt: 50,
        coef: player.virtualBet,
        counter: ++param.counter,
        end: 0,
        index: param.index,
        lifes: 1,
        ls: 1,
        na: 'b',
        rw: 0,
        stime: new Date().getTime(),
        sver: '5',
        wp: 0,
    }

    if (player.machine.bonusMode == 1) {
        result["bgid"] = 1;
        result["bmw"] = player.machine.moneyBonusWin;

        result["level"] = player.machine.bonusSpinLevel - 1;

        var cache = player.machine.bonusSpinCache;
        var g = `{rrb:{
            whm:"c,st,st,st,st,st,st",
            whw:"0,1,2,3,4,5,6",
            wins:"5,6,7,8,1,9,10,11,12,13,1,14,15,16,18,20,1,22,25,30,40,50,60,70,80,90,100,125,150,200,300,400,1000,20000",
            wins_mask:"ma,ma,ma,ma,ms,ma,ma,ma,ma,ma,ms,ma,ma,ma,ma,ma,ms,ma,ma,ma,ma,wma,wma,wma,wma,wma,wma,wma,wma,wma,wma,wma,wma,wma",
            status:"${cache.status.join()}"`;

        if (player.machine.bonusSpinLevel > 1) {
            g += `,whi:"${cache.whi}",wi:"${Util.max(0, cache.wi)}"`;
        }
        g += '}';

        if (cache.sn_lay) {
            g += `,ms01:{sh:"1",st:"rect",sw:"3",
                s:"${player.machine.bonusSubLevel > 1 ? player.machine.miniView.join() : Array([14, 14, 14]).join()}"`;

            var sn_pd = 0;

            if (player.machine.bonusSubLevel == 1) {
                result["rs_c"] = 1;
                result["rs_m"] = 1;
                result["rs_p"] = 0;
                result["rs"] = 'mc';
            } else if (player.machine.bonusSubLevel > 1) {
                var win = WinFromMiniView(player.machine.miniView, Number(player.virtualBet));

                if (win > 0) {
                    g += `,l0:"0~${win}~0~1~2"`;

                    result["rs_c"] = 1;
                    result["rs_m"] = 1;
                    result["rs_p"] = player.machine.bonusSubLevel - 1;
                    result["rs"] = 'mc';
                } else {
                    sn_pd = 1;

                    result["rs_t"] = player.machine.bonusSubLevel - 1;
                }
            }

            g += `},mss:{
                sn_i:"ms01",sn_lay:"${cache.sn_lay}",sn_mult:"1",sn_pd:"${sn_pd}"}`;
        }

        g += '}';

        result["g"] = g;
        result["rw"] = player.machine.moneyBonusWin;

        if (player.machine.currentGame == "BASE") {
            //                    
            result["end"] = 1;
            result["lifes"] = 0;
            result["tw"] = player.machine.moneyBonusWin;
            result["wp"] = player.machine.bonusSpinCache.wp;
            result["na"] = "cb";
        }
    } else {
        var g = '{eb:{';
        var cache = player.machine.bonusSpinCache;

        result["bgid"] = 0;

        if (player.machine.bonusSpinLevel > 1) {
            g += 'ch:"ind~' + player.machine.bonusInd + '",';
        }

        g += `status:"${cache.status.join()}",wins:"${cache.wins.join()}",wins_mask:"${cache.wins_mask.join()}"}}`;

        result["g"] = g;
        result["level"] = player.machine.bonusSpinLevel - 1;
        result["lifes"] = player.machine.bonusSpinLength - player.machine.bonusSpinLevel;

        if (player.machine.currentGame == "BASE") {
            result["end"] = 1;
            result["lifes"] = 0;
            result["na"] = 'cb';
            result["rw"] = player.machine.moneyBonusWin;
            result["tw"] = player.machine.moneyBonusWin;
            result["wp"] = cache.wins[player.machine.bonusInd];
        }
    }

    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: player.balance,
        balance_cash: player.balance,
        balance_bonus: "0.0",
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
        counter: ++param.counter,
        index: param.index,
    };

    return result;
};

var WinFromMiniView = function (view, totalBet) {
    var multi = 0;

    if (view[0] == view[1] && view[1] == view[2]) {
        switch (view[0]) {
            case 11:
                multi = 15;
                break;
            case 12:
                multi = 10;
                break;
            case 13:
                multi = 5;
                break;
        }
    } else if (view[0] != 14 && view[1] != 14 && view[2] != 14) {
        multi = 1;
    }

    return totalBet * multi;
}

module.exports = ApiManager;