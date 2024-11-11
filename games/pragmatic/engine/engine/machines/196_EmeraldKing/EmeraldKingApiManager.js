var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '3,4,5,6,7,3,4,5,6,7,3,4,5,6,7',
        balance: '100,000.00',
        cfgs: '1',
        accm: 'cp~pp;cp~pp',
        ver: '2',
        acci: '0;1',
        index: '1',
        balance_cash: '100,000.00',
        def_sb: '5,7,7,8,2',
        reel_set_size: '3',
        def_sa: '8,3,4,3,3',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        accv: '1~1;0~0',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{props:{max_rnd_sim:\"1\",max_rnd_hr:\"4854369\",max_rnd_win:\"4000\"}}',
        wl_i: 'tbm~20000',
        cpri: '2',
        stime: '1645531220118',
        sa: '8,3,4,3,3',
        sb: '5,7,7,8,2',
        sc: '10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00',
        defc: '100.00',
        sh: '3',
        wilds: '2~500,100,50,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        st: 'rect',
        c: '100.00',
        sw: '5',
        sver: '5',
        g: '{comm:{reel_set:\"2\",screenOrchInit:\"{type:\\\"mini_slots\\\",layout_h:3,layout_w:5}\"},ms00:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms01:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms02:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms03:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms04:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms05:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms06:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms07:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms08:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms09:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms10:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms11:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms12:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms13:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"},ms14:{def_s:\"13,13,13\",sh:\"1\",st:\"rect\",sw:\"3\"}}',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,100,50,0,0;100,50,30,0,0;50,30,20,0,0;30,20,10,0,0;30,20,10,0,0;20,10,5,0,0;20,10,5,0,0;400,0,0;300,0,0;200,0,0;0,0,0',
        l: '20',
        rtp: '96.51',
        reel_set0: '3,6,8,9,7,7,9,9,9,7,9,9,9,5,5,7,9,4,6,5,5,5,7,8,7,8,7,5,7,7,7,3,9,9,9,9,2,5,6,9,9,9,7,7,7,7~3,8,8,8,9,9,4,4,4,8,8,8,6,6,6,8,8,6,6,6,4,4,8,5,8,8,6,6,8,8,8,8,6,6,6,2,6,6,8,4,7,3,3~3,9,9,9,7,9,7,9,7,7,7,4,4,4,9,9,9,5,9,9,8,8,8,6,6,6,5,5,5,9,7,2,9,3,3~3,7,8,6,6,8,8,8,6,5,5,5,8,8,8,6,5,9,7,7,7,7,4,4,4,2,8,9,9,9,4,8,3,3,3,6,6,6~3,9,5,7,7,7,4,4,4,9,9,7,7,7,9,9,9,8,8,8,7,5,5,5,5,9,9,5,5,5,6,9,9,9,6,6,6,2,5,2,3,3,3,5',
        s: '3,4,5,6,7,3,4,5,6,7,3,4,5,6,7',
        accInit: '[{id:0,mask:\"cp;pp;mp\"},{id:1,mask:\"cp;pp;mp\"}]',
        reel_set2: '10,12,12,12,11,11,10,12,12,10,10,11,13,13,13,10,10,10,12,12,11,11,11,11,13~10,12,12,12,10,10,10,11,13,13,11,11,10,10,10,11,11,11,12,12,12,12,13~10,12,12,12,13,13,10,10,13,13,13,11,11,10,10,10,11',
        reel_set1: '3,3,3,6,6,2,4,4,4,9,9,2,2,2,5,5,5,7,2,3,2,2,2,9,8,8,8,8,7,9,9,9,9,7,7,7,2,2,9,7,9~3,3,3,8,8,2,9,6,4,4,4,8,8,8,9,9,9,6,6,6,2,2,4,5,5,5,8,8,7,7,7,6,2,2,2,3~3,3,3,6,6,6,2,7,3,8,7,7,7,5,5,9,8,8,8,2,2,2,4,4,4,2,6,6,5,5,5,2,2,9,9,9,9,7~3,3,3,7,8,9,9,9,7,8,2,2,8,5,8,8,8,6,2,2,2,7,7,7,2,2,2,8,6,6,6,6,4,4,7,4,4,4,8~3,3,3,9,5,7,7,4,4,4,6,2,2,2,8,7,9,9,8,8,8,5,3,9,2,6,5,2,2,2,9,9,9,7,7,7,2,9,9',
        cpri_mask: 'tbw',
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
        accm: "cp~pp;cp~pp",
        accv: `${player.machine.nextMulti}~${player.machine.multi};${player.machine.nextGreenCnt}~${player.machine.greenCnt}`,
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
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };
    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    if (player.machine.multi > 1) {
        result["gwm"] = player.machine.multi;
    }

    if ((player.machine.currentGame == "BONUS" || prevGameMode == "BONUS") && player.machine.miniSpinIndex) {
        var g = '{comm:{';
        var miniSymbols = [13, 12, 11, 10];
        var sa = [];
        var sb = [];

        result["na"] = 's';

        for (var i = 0; i < 3; ++i) {
            sa.push(miniSymbols[Util.random(0, miniSymbols.length)]);
            sb.push(miniSymbols[Util.random(0, miniSymbols.length)]);
        }

        var cache = player.machine.miniViewCache;
        var list = player.machine.miniSlotList;
        var miniSpinIndex = player.machine.miniSpinIndex;

        var sn_i = [];
        var sn_lay = [];
        var sn_mult = [];
        var sn_pd = [];

        for (var i = 0; i < list.length; ++i) {
            if (i >= 10) {
                sn_i.push(`ms${i}`);
            } else {
                sn_i.push(`ms0${i}`);
            }

            sn_lay.push(list[i].join());
            sn_mult.push(1);
            sn_pd.push(1);
        }

        var len = 0;

        var WinFromMiniView = function (view, totalBet) {
            var multi = 0;

            if (view[0] == view[1] && view[1] == view[2]) {
                switch (view[0]) {
                    case 10:
                        multi = 20;
                        break;
                    case 11:
                        multi = 15;
                        break;
                    case 12:
                        multi = 10;
                        break;
                }
            } else if (view[0] != 13 && view[1] != 13 && view[2] != 13) {
                multi = 2;
            }

            return totalBet * multi;
        }

        if (prevGameMode == "BONUS") {
            len = cache.length;

            for (var i = 0; i < len; ++i) {
                if (WinFromMiniView(cache[i].view, Number(player.virtualBet)) > 0) {
                    sn_pd[cache[i].id] = 0;
                }
            }

            if (miniSpinIndex == 2) {
                result.accv = `${player.machine.nextMulti}~${player.machine.multi};0~5`;
            } else {
                result.accv = `${player.machine.nextMulti}~${player.machine.multi};0~0`;
            }
        } else {
            len = list.length;

            for (var i = 0; i < len; ++i) {
                sn_pd[i] = 0;
            }

        }

        g += 'reel_set:"2",';
        g += 'sn_i:"' + sn_i.join(';') + '",';
        g += 'sn_lay:"' + sn_lay.join(';') + '",';
        g += 'sn_mult:"' + sn_mult.join(';') + '",';
        g += 'sn_pd:"' + sn_pd.join(';') + '"}';

        for (var i = 0; i < len; ++i) {
            if (prevGameMode == "BASE") {
                g += ',' + sn_i[i] + ':{';
                g += 's:"' + '13,13,13' + '",';
            } else {
                g += ',' + sn_i[cache[i].id] + ':{';
                g += 's:"' + cache[i].view.join() + '",';
                g += 'sa:"' + sa.join() + '",';
                g += 'sb:"' + sb.join() + '",';

                var win = WinFromMiniView(cache[i].view, Number(player.virtualBet)) * player.machine.multi;

                if (win > 0) {
                    g += `l0:"0~${win}~0~1~2",`;
                }
            }
            g += 'sh:"1",st:"rect",sw:"3"';
            g += '}'
        }

        g += '}';

        result["g"] = g;
        result["tw"] = player.machine.moneyBonusWin;

        if (player.machine.currentGame == "BONUS") {
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

        if (prevGameMode == "BASE") {
            result["ls"] = 0;
        }
    }

    result["wmt"] = "pr";
    result["wmv"] = player.machine.multi;

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
