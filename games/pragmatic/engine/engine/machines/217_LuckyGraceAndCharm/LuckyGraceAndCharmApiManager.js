var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '1,2,3,4,5,6,7,8,9,10,11,12,13,13,13',
        balance: '100,000.00',
        screenOrchInit: '{type:\"mini_slots\"}',
        cfgs: '1',
        ver: '2',
        index: '1',
        balance_cash: '100,000.00',
        def_sb: '12,8,3,12,12',
        reel_set_size: '6',
        def_sa: '7,7,13,5,5',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~500,20,5,2,0~12,12,12,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{rtps:{regular:\"96.71\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"4549025\",max_rnd_win:\"10000\"}}',
        wl_i: 'tbm~10000',
        stime: '1645784329298',
        sa: '7,7,13,5,5',
        sb: '12,8,3,12,12',
        sc: '10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,7000.00,8000.00,10000.00,12000.00,15000.00,18000.00,20000.00,25000.00',
        defc: '200.00',
        sh: '3',
        wilds: '2~9000,2500,250,10,0~2,2,2,2,2',
        bonuses: '0;14',
        fsbonus: '',
        st: 'rect',
        c: '200.00',
        sw: '5',
        sver: '5',
        g: '{respin_screen:{def_s:\"15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15\",def_sa:\"15,15,15,15,15\",def_sb:\"15,15,15,15,15\",s:\"15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15\",sa:\"15,15,15,15,15\",sb:\"15,15,15,15,15\",sh:\"20\",st:\"rect\",sw:\"5\"}}',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;9000,2500,250,10,0;750,125,25,2,0;750,125,25,2,0;250,75,15,0,0;250,75,15,0,0;400,100,20,0,0;125,50,10,0,0;125,50,10,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,0,0;100,25,5,2,0;0,0,0,0,0;0,0,0,0,0',
        l: '10',
        rtp: '96.71',
        reel_set0: '11,9,5,11,9,5,13,1,11,7,13,11,7,12,9,5,11,9,5,13,11,6,8,9,4,11,9,1,11,9,3,11,9,2,13,11,10,9,11,14,14,14~10,8,6,10,1,8,6,12,10,7,12,10,7,8,10,6,8,10,6,13,12,5,11,10,1,8,10,3,11,10,4,9,8,2,12,10,8,14,14~5,11,9,5,11,9,5,11,1,13,5,11,9,3,11,9,3,13,11,5,13,11,5,13,9,7,13,9,7,11,13,1,11,9,2,11,9,7,11,9,7,13,3,5,14,14,14,12,4,6,10,8~11,9,5,11,9,5,13,1,9,5,13,9,5,12,10,4,12,10,4,11,9,4,11,8,3,11,13,1,11,10,7,11,13,2,11,12,3,11,9,7,11,8,6,14,14,14,14~11,9,5,11,1,9,5,13,9,5,13,9,5,12,10,4,12,10,4,11,9,4,11,8,3,11,13,1,11,10,7,11,1,13,2,11,12,3,11,9,7,11,8,6,14,14,14',
        s: '1,2,3,4,5,6,7,8,9,10,11,12,13,13,13',
        accInit: '[{id:0,mask:\"cp;tp;lvl;sc;cl\"},{id:1,mask:\"cp;tp;lvl;sc;cl\"}]',
        reel_set2: '11,9,5,11,9,5,13,1,11,7,13,11,7,12,9,5,11,9,5,13,11,6,8,9,4,11,9,1,11,9,3,11,9,2,13,11,10,9,11,14,14,14~10,8,6,10,1,8,6,12,10,7,12,10,7,8,10,6,8,10,6,13,12,5,11,10,1,8,10,3,11,10,4,9,8,2,12,10,8,14,14~5,11,9,5,11,9,5,11,1,13,5,11,9,3,11,9,3,13,11,5,13,11,5,13,9,7,13,9,7,11,13,1,11,9,2,11,9,7,11,9,7,13,3,5,14,14,14,12,4,6,10,8~11,9,5,11,9,5,13,1,9,5,13,9,5,12,10,4,12,10,4,11,9,4,11,8,3,11,13,1,11,10,7,11,13,2,11,12,3,11,9,7,11,8,6,14,14,14,14~11,9,5,11,1,9,5,13,9,5,13,9,5,12,10,4,12,10,4,11,9,4,11,8,3,11,13,1,11,10,7,11,1,13,2,11,12,3,11,9,7,11,8,6,14,14,14',
        reel_set1: '11,9,5,11,9,5,13,1,11,7,13,11,7,12,9,5,11,9,5,13,11,6,8,9,4,11,9,1,11,9,3,11,9,2,13,11,10,9,11,14,14,14~10,8,6,10,1,8,6,12,10,7,12,10,7,8,10,6,8,10,6,13,12,5,11,10,1,8,10,3,11,10,4,9,8,2,12,10,8,14,14~5,11,9,5,11,9,5,11,1,13,5,11,9,3,11,9,3,13,11,5,13,11,5,13,9,7,13,9,7,11,13,1,11,9,2,11,9,7,11,9,7,13,3,5,14,14,14,12,4,6,10,8~11,9,5,11,9,5,13,1,9,5,13,9,5,12,10,4,12,10,4,11,9,4,11,8,3,11,13,1,11,10,7,11,13,2,11,12,3,11,9,7,11,8,6,14,14,14,14~11,9,5,11,1,9,5,13,9,5,13,9,5,12,10,4,12,10,4,11,9,4,11,8,3,11,13,1,11,10,7,11,1,13,2,11,12,3,11,9,7,11,8,6,14,14,14',
        reel_set4: '13,12,7,11,10,6,9,8,1,13,10,7,12,8,5,11,9,7,13,9,1,10,12,1,6,8,11,5,13,12,4,11,9,3,10,8,2,1~12,10,6,12,10,1,12,8,6,12,10,5,8,10,6,10,8,1,12,10,5,12,10,6,12,8,6,12,10,5,12,10,5,12,10,8,1,4,2,13,11,9,7,3~13,11,7,13,11,7,13,11,4,13,9,3,11,13,1,11,9,4,11,1,13,9,7,11,9,4,13,11,3,13,9,7,11,9,3,1,2,12,10,8,6,5~13,12,7,11,10,6,9,8,3,11,12,5,13,8,1,9,10,7,11,12,1,13,9,3,10,12,4,13,9,2,11,8,5,11,8,6,13,10,7,1~13,12,7,11,1,10,6,9,8,3,13,9,1,8,10,7,12,8,5,11,9,2,13,9,1,8,10,4,13,11,5,12,10,7,12,11,6,1',
        reel_set3: '11,9,5,11,9,5,13,1,11,7,13,11,7,12,9,5,11,9,5,13,11,6,8,9,4,11,9,1,11,9,3,11,9,2,13,11,10,9,11,14,14,14~10,8,6,10,1,8,6,12,10,7,12,10,7,8,10,6,8,10,6,13,12,5,11,10,1,8,10,3,11,10,4,9,8,2,12,10,8,14,14~5,11,9,5,11,9,5,11,1,13,5,11,9,3,11,9,3,13,11,5,13,11,5,13,9,7,13,9,7,11,13,1,11,9,2,11,9,7,11,9,7,13,3,5,14,14,14,12,4,6,10,8~11,9,5,11,9,5,13,1,9,5,13,9,5,12,10,4,12,10,4,11,9,4,11,8,3,11,13,1,11,10,7,11,13,2,11,12,3,11,9,7,11,8,6,14,14,14,14~11,9,5,11,1,9,5,13,9,5,13,9,5,12,10,4,12,10,4,11,9,4,11,8,3,11,13,1,11,10,7,11,1,13,2,11,12,3,11,9,7,11,8,6,14,14,14',
        reel_set5: '13,12,7,11,10,6,9,8,1,13,10,7,12,8,5,11,9,7,13,9,1,10,12,1,6,8,11,5,13,12,4,11,9,3,10,8,2,1~12,10,6,12,10,1,12,8,6,12,10,5,8,10,6,10,8,1,12,10,5,12,10,6,12,8,6,12,10,5,12,10,5,12,10,8,1,4,2,13,11,9,7,3~13,11,7,13,11,7,13,11,4,13,9,3,11,13,1,11,9,4,11,1,13,9,7,11,9,4,13,11,3,13,9,7,11,9,3,1,2,12,10,8,6,5~13,12,7,11,10,6,9,8,3,11,12,5,13,8,1,9,10,7,11,12,1,13,9,3,10,12,4,13,9,2,11,8,5,11,8,6,13,10,7,1~13,12,7,11,1,10,6,9,8,3,13,9,1,8,10,7,12,8,5,11,9,2,13,9,1,8,10,4,13,11,5,12,10,7,12,11,6,1',
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
        tw: player.machine.winMoney,
        balance: 0,
        index: 1,  
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        reel_set: 0,    //                              
        stime: new Date().getTime(),
        sver: 5,   
        c: player.betPerLine,
        counter: 1,
        l: 10,
        ls: 0,
        w: player.machine.winMoney,
        wmt: "pr",
        wmv: 1,
    };
    if (prevGameMode != "BONUS") {
        //          ,                          
        var screenAbove = Util.view2String(player.machine.virtualReels.above);
        var screenBelow = Util.view2String(player.machine.virtualReels.below);

        result["sa"] = screenAbove;
        result["sb"] = screenBelow;
    }
    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.scatterPositions.length) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions}`;
    }

    if (player.machine.moneyCache != null) {
        result["mo_t"] = player.machine.moneyCache.table;
        result["mo"] = player.machine.moneyCache.values;
    }

    if (prevGameMode != "BONUS") {
        result["sh"] = 3;
        result["st"] = "rect";
        result["sw"] = 5;
        result["s"] = Util.view2String(player.machine.view);
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.00;
            result["fswin"] = 0.00;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            result["reel_set"] = 3;
            result["rs_c"] = 1;
            result["rs_m"] = 4;
            result["rs_p"] = 0;
            result["rs"] = "mc";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["reel_set"] = 5;
        result["gwm"] = 3;
        result["wmv"] = 3;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["tw"] = player.machine.freeSpinWinMoney + player.machine.freeSpinBeforeMoney;
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["tw"] = player.machine.freeSpinWinMoney;
        }
    } else if (prevGameMode == "BONUS") {
        //                  
        var level = player.machine.moneyBonusLevel;

        result["acci"] = '0;1';

        if (player.machine.isMoneyLevelUp == 0) {
            result["accm"] = 'cp~tp~lvl~sc;cp~tp~lvl~sc';
            result["accv"] = `0~1~${level * 2}~0;0~1~${level}~0`;
        } else {
            result["accm"] = 'cp~tp~lvl~sc~cl;cp~tp~lvl~sc~cl';
            result["accv"] = `0~1~${level * 2}~2~${level * 2 - 2},${level * 2 - 1};0~1~${level}~1~${level - 1}`;
        }

        result["g"] = `{respin_screen:{s:"${player.machine.moneyCache.values.map((item) => (item > 0) ? 14 : 15)}",sa:"15,15,15,15,15",sb:"15,15,15,15,15",sh:"20",st:"rect",sw:"5"}}`;

        result["mo_t"] = player.machine.moneyCache.table;
        result["mo"] = player.machine.moneyCache.values;
        result["mo_tv"] = player.machine.moneyBonusWin / player.betPerLine;
        result["mo_tw"] = player.machine.moneyBonusWin

        result["sn_i"] = "respin_screen";
        result["sn_mult"] = 1;
        result["sn_pd"] = 0;

        if (player.machine.currentGame == "BONUS") {
            result["rs_c"] = player.machine.moneyBonusCache.count;
            result["rs_m"] = 4;
            result["rs_p"] = player.machine.moneyBonusIndex - 1;
            if (result["rs_c"] == 1) {
                result["rs"] = "mc";
            }
        } else {
            result["mo_c"] = 1;
            result["rs_t"] = player.machine.moneyBonusIndex;
            result["trail"] = `s~${player.machine.view}`;
        }

        result["reel_set"] = 3;
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance: player.balance,
        index: param.index,
        balance_cash: player.balance,
        balance_bonus: "0.0",
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
        counter: ++param.counter
    };

    return result;
}

module.exports = ApiManager;
