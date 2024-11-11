var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '3,4,5,6,7,8,9,10,2,11,7,6,1,4,3',
        balance: '99,639.00',
        cfgs: '1',
        ver: '2',
        index: '1',
        balance_cash: '99,639.00',
        def_sb: '1,2,3,4,5',
        reel_set_size: '10',
        def_sa: '1,2,3,4,5',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{rtps:{purchase:\"96.47\",regular:\"96.47\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"836890\",max_rnd_win:\"5000\"}}',
        wl_i: 'tbm~5000',
        stime: '1631064563157',
        sa: '1,2,3,4,5',
        sb: '1,2,3,4,5',
        sc: '10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00',
        sh: '3',
        wilds: '2~0,0,0,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '0',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;600,100,50,0,0;300,50,25,0,0;200,40,20,0,0;150,25,12,0,0;100,20,10,0,0;60,12,6,0,0;60,12,6,0,0;50,10,5,0,0;50,10,5,0,0',
        l: '20',
        rtp: '96.47',
        reel_set0: '5,8,10,7,11,6,9,11,4,5,5,3,10,10,9,6,4,6,8,9,10,1,11,9,10,8,8,7,7,9,8,3,11,3~7,5,4,1,10,2,7,10,4,8,6,11,9,7,10,3,8,11,9,5,4,9,10,11,9,11,3,4,9,5,6,8,11,11,6,2,8,4,11,8,10,1,5,7,6,9~10,7,9,4,3,11,3,6,2,11,7,5,9,10,1,9,4,7,2,5,11,11,8,10,3,2,10,6,9,9,8,1,5,5,9,10,2,10,11,4,4,7,8,9,5,8,8,4,8,7~10,3,8,2,2,9,10,3,5,4,1,8,9,4,6,9,3,9,11,7,10,4,6,11,5,11,8~9,10,6,9,11,9,4,7,9,4,8,6,4,1,10,7,5,6,3,3,8,11,5,9,8,11,10,3,8,10,5,3,8',
        s: '1,2,3,4,5,6,7,8,9,10,11,1,2,3,4',
        accInit: '[{id:0,mask:\"cp;tp;lvl;sc;cl\"}]',
        purInit: '[{type:\"fs\",bet:1500}]',
        reel_set1: '10,9,7,7,8,10,11,8,4,5,11,11,9,4,3,8,6,10,10,3,8,10,7,11,8,5,3,5,10,9,4,4,5,9,6,6,3,9,4,9,11,8,7~11,2,2,11,11,8,10,2,9,8,10,9,2,10~7,11,9,9,8,10,9,4,11,5,9,5,4,10,4,3,9,9,10,11,3,6,6,5,8,6,7,4,8,8,3,6,7,7,5,4,8,5,10,10,8,5,10,2,3,2,2,11~4,10,3,10,4,7,9,11,9,3,11,10,8,7,4,5,8,9,5,8,6,2,9,3,5,11,3,8,6,2,11~11,8,10,5,5,3,10,9,5,8,7,5,4,6,9,11,4,6,10,8,5,9,8,3,9,8,11,10,3,9,10,11,4,6,8,11,7,7,9,6,3,7,4',
        reel_set2: '5,10,9,3,7,4,11,8,7,10,8,6,8,4,10,8,7,3,6,9,6,8,9,5,5,4,9,10,10,8,4,3,4,9,7,11,10,10,9,11,5,11,3,9,11~6,7,9,4,3,2,8,8,9,7,9,5,8,2,11,11,7,10,9,6,6,5,11,10,11,4,11,3,4,11,9,2,10,3,5~9,2,9,11,8,2,10,10,2,11,8~10,7,6,3,5,3,10,11,4,3,9,3,3,9,6,9,10,9,8,11,8,3,11,5,2,5,11,2,8,6,9,5,4,8,7,10,11,9,7,9,5,4,11,8,8,4,10~8,5,10,8,9,9,4,8,9,11,9,3,10,4,11,7,8,5,11,6,7,3,9,4,11,10,6,3,5,6,6,4,10,3,9,8,5,5,10,7,8,7,10,11',
        reel_set3: '10,6,8,5,7,9,11,3,6,3,9,10,4,10,4,11,7,8,9,8,5~10,4,3,8,6,2,11,5,3,6,7,11,9,4,7,10,8,5,11,2,9,9~2,8,7,6,5,9,4,9,8,10,3,2,11,8,9,10,10,11,3,6,6,2,10,7,4,11,5,5,3,5,8,9,4~9,11,9,2,8,2,10,11,10,8,2~7,8,3,9,6,9,8,3,4,9,11,11,5,11,6,4,8,7,6,3,11,7,9,5,8,5,8,4,10,8,8,7,3,8,9,10,7,10,4,8,10,3,6,5,9,10,9,4,11,10,7,5,10,11,11,9,4,6,3,10,9,5,6,5',
        reel_set4: '9,8,8,11,5,11,6,10,3,11,1,3,5,10,4,7,9,9,4,8,4,10,7~8,9,11,7,10,2,6,11,5,10,10,11,3,11,5,3,2,7,9,9,2,8,11,6,9,8,2,6,11,4,6,3,5,10,4,2,8,11,5,1,9,9~1,2,2,3,4,4,5,5,6,7,8,8,9,9,10,10,11,11~7,1,6,7,10,1,3,9,11,5,2,3,11,3,9,5,8,9,8,11,11,2,8,9,4,2,10,8,4,6,10~10,8,9,8,1,3,4,7,10,10,7,9,9,10,6,10,11,9,6,5,8,4,3,9,4,8,6,3,5,5,7,11',
        reel_set5: '6,11,8,5,3,8,6,4,9,10,5,8,5,8,10,8,9,5,8,11,4,9,9,10,10,3,10,1,9,3,10,9,4,9,7,6,7,4,3,11,7,10,11~1,9,11,5,9,7,5,4,2,2,3,6,11,2,8,11,10,7,11,10,8,5,5,3,2,4,3,9,3,4,10,6,8,9,10,8,11~9,7,5,1,4,8,11,10,6,4,10,8,3,1,8,2,3,4,5,10,11,8,7,9,11,9,7,3,9,5,6,5,9,2,10,11,10,5,2,6,2,8,4,11~1,2,2,3,3,4,5,6,7,8,8,9,9,10,10,11,11~1,3,3,4,5,6,7,8,8,9,9,10,11,11',
        reel_set6: '8,10,8,10,9,5,11,4,3,7,7,3,11,11,8,6,5,9,9,7,10,6,11,10,10,9,8,4,3,9,4,5,4,1~10,11,8,9,10,5,10,9,2,2,11,9,6,3,9,3,6,11,7,8,9,11,5,4,8,11,2,6,5,11,7,5,4,1,2,8,11,10,9,2,6,4~4,2,3,4,9,9,8,4,9,3,5,2,5,8,7,7,6,10,11,2,1,6,10,5,8,8,9,10,11,10,11~9,3,3,4,10,8,2,11,7,11,2,9,8,9,1,6,5,10~9,11,7,9,3,5,7,10,8,10,8,9,6,11,6,10,3,5,8,4,8,5,6,11,9,1,3,4',
        reel_set7: '9,7,8,4,11,5,3,1,9,8,3,6,10,10,4,9,8~8,4,2,8,11,6,9,3,9,9,11,4,10,2,2,3,5,9,4,10,6,9,11,11,9,10,6,7,8,5,3,1,5,2,8,7,11,6,11,2,10~2,11,8,9,5,10,11,11,7,2,9,10,3,4,1,6,8,2,8,9,6,10,9,3,5,4,6,7,5,4,5,3,10,5~1,2,2,3,3,4,5,6,7,8,8,9,9,10,10,11,11~9,4,7,11,5,5,8,11,7,4,5,6,11,9,7,9,8,8,5,6,10,10,6,4,8,1,9,10,11,3,9,8,4,6,1,10,7,8,8,11,3,3,9,10,3,10,8,6,8,5,10,9,3,3',
        reel_set8: '5,4,11,8,10,5,6,7,1,7,4,10,9,10,8,7,9,9,3,3,8,10,9,5,5,8,11,11,7,9,10,9,10,9,10,4,3,4,4,8,11,11,8,6,3~9,2,11,5,6,1,10,11,3,11,2,5,6,8,4,2,7,4,9,11,10,9,8~10,11,11,7,3,5,11,9,10,4,9,4,11,5,9,5,1,7,5,4,8,10,10,9,9,6,2,8,3,1,10,4,8,5,8,6,2,3,7,6,2,8,2~2,3,8,11,9,5,5,6,10,8,3,9,7,4,11,1,2,4,10,11,6,8,9~1,10,8,11,9,4,4,3,10,8,9,3,8,10,6,7,3,6,11,6,8,10,3,6,7,10,5,1,5,7,9,8,9,3,8,11,5,9,5,9,8,9,3,11,5,4,7,6,11,10,4',
        reel_set9: '8,9,5,10,9,10,8,4,11,1,6,10,4,11,7,5,3,9,3~9,9,10,8,9,8,10,11,5,9,2,4,11,6,1,3,2,6,11,11,5,2,7~4,6,6,10,2,10,9,9,5,9,3,11,3,2,11,7,7,2,5,9,4,8,2,1,6,4,11,1,10,10,8,4,3,5,4,3,2,10,8,8,9,5,10,11,11,6,7,9,9,5,8,8,6,11~4,2,7,2,10,6,9,3,8,11,1,5,11,6,5,8,3,10,9,11,9,10,2~3,7,8,4,5,8,9,1,5,5,8,7,11,11,9,10,9,3,6,6,10,7,8,8,3,11,9,9,8,3,6,10,6,9,1,11,4,8,5,10,11,4,10,9,9,10,5,10,11,4,3,10,4,7,6',
        defc: '100',
        c: '100',
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
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        reel_set: 0,
        stime: new Date().getTime(),
        sa: "1,2,3,4,5",
        sb: "1,2,3,4,5",
        sh: 3,
        sver: 5,   
        c: player.betPerLine,
        l: 20,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    //                                 
    var winLines = player.machine.lines.winLines;
    var wildLines = player.machine.lines.wildLines;

    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    result["ls"] = 0;

    if (wildLines.length) {
        result["lm_m"] = "l~m";
        result["lm_v"] = wildLines.join(';');
    }
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }

    result["na"] = nextAction;
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["acci"] = 0;
            result["accm"] = "cp~tp~lvl~sc";
            result["accv"] = `${player.machine.scatterCount}~${player.machine.scatterLimit}~${player.machine.freeSpinLevel}~${player.machine.scatterAddCount}`;
            result["fs_opt_mask"] = "fs,m,msk";
            result["fs_opt"] = "5,1,0~5,1,0";
            result["na"] = "fso";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["acci"] = 0;
        result["fsopt_i"] = player.machine.freeSpinType;

        if (player.machine.freeSpinLevelAddCount) {
            result["accm"] = "cp~tp~lvl~sc~cl";
            result["accv"] = `${player.machine.scatterCount}~${player.machine.scatterLimit}~${player.machine.freeSpinMaxLevel}~${player.machine.scatterAddCount}~${player.machine.freeSpinLevelAddCount}`;
        } else {
            result["accm"] = "cp~tp~lvl~sc";
            result["accv"] = `${player.machine.scatterCount}~${player.machine.scatterLimit}~${player.machine.freeSpinMaxLevel}~${player.machine.scatterAddCount}`;
        }

        if (player.machine.freeSpinAdd > 0) {
            result["fsmore"] = 5;
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
            result["fsend_total"] = 1;
            result["fsmul_total"] = 1;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
        }
    }

    return result;
}

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
        rtp: "96.06"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    return result;
}

ApiManager.prototype.FreeSpinOptionApi = function (player, param) {
    var result = {
        balance_bonus: '0.00',
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        fs_opt_mask: "fs,m,msk",
        fs_opt: "5,1,0~5,1,0",
        fs: '1',
        fsmax: '5',
        fsopt_i: player.machine.freeSpinType,
        fsmul: '1',
        fsres: '0.00',
        fswin: '0.00',
        index: param.index,
        na: 's',
        stime: new Date().getTime(),
        sver: '5',
    };
    return result;
}

module.exports = ApiManager;