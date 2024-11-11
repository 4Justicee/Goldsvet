var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,4,11,9,10,9,6,5,6,7,9,10,8,10,8,6,7,8,3,7",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        mo_s: "14",
        index: "1",
        balance_cash: "100,000.00",
        mo_v: "100,200,250,500,1000,2000,5000,10944,3344,1064",
        def_sb: "5,3,4,6,7",
        reel_set_size: "2",
        def_sa: "11,11,10,8,9",
        reel_set: "0",
        mo_jp: "10944;3344;1064",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{purchase:\"96.49\",regular:\"96.55\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"8568980\",jwt_jp:\"jp1,jp2,jp3,jp4\",max_rnd_win:\"9000\",ma_jp:\"337744,10944,3344,1064\"}}",
        wl_i: "tbm~9000",
        mo_jp_mask: "jp2;jp3;jp4",
        stime: "1638796710584",
        sa: "11,11,10,8,9",
        sb: "5,3,4,6,7",
        sc: "5,10,20,30,40,50,100,200,300,400,500,750,1000,2000,3000,4000,5000",
        defc: "50",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "50",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;100,40,20,0,0;25,15,10,0,0;15,10,5,0,0;10,5,3,0,0;10,5,3,0,0;5,3,2,0,0;5,3,2,0,0;5,3,2,0,0;5,3,2,0,0;5,3,2,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "38",
        rtp: "96.55",
        total_bet_max: "19,000,000",
        reel_set0: "8,8,8,6,10,10,10,10,9,3,13,5,4,7,7,7,8,12,12,12,12,11,9,9,9,7,11,11,11,5,5,5,6,6,6,13,13,13,12,7,9,5,10,11,7,11,10,7,6,10,9,10,7,10,11,6~9,7,12,12,12,1,3,2,5,10,10,10,13,10,6,9,9,9,8,11,12,4,7,7,7,13,13,13,2,2,2,3,3,3,5,13,2,3,12,5,3,5,3,10,7,10,3,2,3~10,1,7,12,5,5,5,2,2,2,2,6,5,9,8,13,13,13,11,8,8,8,3,13,11,11,11,4,4,4,4,7,7,7,4,3,11,2,4,2,6,2,11,9,5,11,7,4,8,1,8,11,7,12,8,11,7,5,13,4,13,6~13,13,13,2,12,12,12,7,4,9,9,9,10,11,4,4,4,8,6,12,2,2,2,1,5,9,13,10,10,10,3,10,7,12,2,4,9,2,10,2,10,9,10,9,1,10,2,4,2,4,10,2,10,9,3,9,10,2,4,10,9,10,9,4,12,2,10,12,2,10,9,5,2,1,2,9,12,10,1,4,2,10,3,10,2,12,10,8,10,3~3,13,13,13,7,11,10,10,10,5,11,11,11,4,13,8,6,9,10,12,4,6,12,13,10,13,9,7,13,4",
        s: "3,4,11,9,10,9,6,5,6,7,9,10,8,10,8,6,7,8,3,7",
        t: "243",
        reel_set1: "7,10,10,10,11,9,5,4,10,6,11,11,11,12,13,3,3,3,3,13,13,13,8,7,7,7,5,5,5,3,10~12,2,2,2,3,4,13,5,5,5,5,11,6,4,4,4,10,13,13,13,7,8,8,8,14,9,2,8,12,12,12,4,7,5,4,10,6,4,9,14,4,2,9,11,13,4,8,9,7,9,7,11,9,4,9,2,4,8,2,9,4,7,4,7,9,6,7,4,11~4,11,7,7,7,14,2,12,9,9,9,3,2,2,2,8,6,5,10,9,7,3,3,3,13,11,11,11,13,13,13,12,12,12,2,7,3,7,10,14,2,6,3,7,9,11,9,11,2,3,11,6,2,13~8,5,7,2,2,2,11,10,10,10,9,12,11,11,11,4,13,13,13,10,3,13,6,14,2,13,10,11,2,11,5,11,5,13,2,13,10,5,2,10,4,9,10,9,13,2,7,6,3,5,7,5,11,5,3,4,5,10,2~12,6,6,6,10,7,13,6,9,9,9,8,5,3,9,7,7,7,4,12,12,12,11,8,8,8,11,11,11,13,13,13,10,10,10,13,8,13,11,13,9,13,11",
        purInit: "[{type:\"d\",bet:3800}]",
        total_bet_min: "10.00"
    };

    // API          
    result["stime"] = new Date().getTime();

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
        tw: "0.00",
        balance: "99,998.10",
        index: "2",
        balance_cash: "99,998.10",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        stime: "1638796720041",
        sa: "9,12,11,13,11",
        sb: "10,1,2,10,8",
        sh: "4",
        c: "0.05",
        sver: "5",
        counter: "4",
        l: "38",
        s: "9,12,4,12,3,9,7,4,6,3,9,7,8,6,7,10,8,2,10,7",
        w: "0.00",
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    result["s"] = Util.view2String(player.machine.view);
    result["c"] = player.betPerLine;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    if (player.machine.winMoney > 0) {
        result["wlc_v"] = player.machine.winLines;
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    var nextAction = "s";
    if (player.machine.winMoney > 0 && prevGameMode != "FREE") {
        nextAction = "c";
    }

    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.currentGame == "BONUS") {

        result["g"] = `{whn:{whm:\"jp1,cv,fg,cv,jp3,cv,fg,cv,jp2,cv,fg,cv,jp4,cv,fg,cv\",whw:\"337744,114,7,304,3344,76,6,152,10944,38,7,380,1064,190,6,38\"}}`;
        result['bw'] = 1;
        result["na"] = 'b';

    } else if (prevGameMode == "BASE" || prevGameMode == "FREE") {

        if (prevGameMode == "FREE") {
            result['wmt'] = 'pr';
            result['wmv'] = 1;
            result['reel_set'] = 1;
            result["tw"] = player.machine.freeSpinWinMoney;

            //                              
            if (player.machine.moneyCache.table.indexOf('rt') != -1) {
                result['fsmore'] = player.machine.freespinMore;
                result['mo_t'] = player.machine.moneyCache.table;
                result['mo'] = player.machine.moneyCache.values;
                result["mo_c"] = player.machine.freespinMoC;
            }

            //                      
            if (player.machine.moneyCache.table.indexOf('ma') != -1) {
                result["ds"] = player.machine.freespinDs;
                result["dsa"] = player.machine.freespinDsa;
                result["dsam"] = player.machine.freespinDsam;
                result["gwm"] = player.machine.freespinGwm;
                result["wmv"] = player.machine.freespinGwm;
                result['mo_t'] = player.machine.moneyCache.table;
                result['mo'] = player.machine.moneyCache.values;
                result["mo_c"] = player.machine.freespinMoC;
            }

            //                        
            if (player.machine.moneyCache.table.indexOf('jp1') != -1 || player.machine.moneyCache.table.indexOf('jp2') != -1 || player.machine.moneyCache.table.indexOf('jp3') != -1 || player.machine.moneyCache.table.indexOf('jp4') != -1 || player.machine.moneyCache.table.indexOf('v') != -1) {
                result["mo_tv"] = player.machine.freespinMotv;
                result["mo_tw"] = player.machine.freespinMotw;
                result['mo_t'] = player.machine.moneyCache.table;
                result['mo'] = player.machine.moneyCache.values;
                result["mo_c"] = player.machine.freespinMoC;
            }

            if (player.machine.currentGame == "BASE") {
                result["na"] = "c";
                result['fs_total'] = player.machine.freeSpinIndex;
                result['fsend_total'] = 1;
                result['fsmul_total'] = 1;
                result['fsres_total'] = player.machine.freeSpinWinMoneyExceptForBonus;
                result['fswin_total'] = player.machine.freeSpinWinMoneyExceptForBonus;
            } else {
                result["na"] = "s";
                result['fs'] = player.machine.freeSpinIndex + 1;
                result['fsmax'] = player.machine.freeSpinLength;
                result['fsmul'] = 1;
                result["fswin"] = player.machine.freeSpinWinMoney;
                result["fsres"] = player.machine.freeSpinWinMoney;
            }
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        bmw: "0.00",
        bgid: "0",
        balance: "99,991.80",
        coef: "0.05",
        level: "0",
        index: "9",
        balance_cash: "99,991.80",
        balance_bonus: "0.00",
        na: "b",
        rw: "0.00",
        stime: "1638796725141",
        bgt: "50",
        lifes: "1",
        wp: "0", //                                       
        end: "0",
        sver: "5",
        counter: "18",
    };

    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["na"] = "b";
    result['rw'] = "0.00";
    result['tw'] = "0.00";

    // bonusIndex    machine       ++                          bonusIndex              -1              .
    if (player.machine.bonusIndex - 1 != 0) {
        result["g"] = `{whc:{whi:"${player.machine.bonusG.whc.whi}",whm:"${player.machine.bonusG.whc.whm.join()}",whw:"${player.machine.bonusG.whc.whw.join()}"},whn:{whm:"${player.machine.bonusG.whn.whm.join()}",whw:"${player.machine.bonusG.whn.whw.join()}"}}`;
        result['rw'] = Number(player.machine.bonusWp);
        result['tw'] = Number(player.machine.bonusWp);
        result["level"] = player.machine.bonusIndex - 1;
    }
    //                                                    
    if (player.machine.currentGame == "FREE") {
        result["na"] = "s";
        result["end"] = 1;
        result["lifes"] = 0;
        result["fs"] = 1;
        result['fsmax'] = player.machine.freeSpinLength;
        result['fsmul'] = 1;
        result["fsres"] = "0.00";
        result["fswin"] = "0.00";
    }

    result["wp"] = player.machine.bonusWp;


    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();


    return result;
}

module.exports = ApiManager;