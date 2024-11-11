var Util = require('../../../utils/slot_utils');
var typeArr = ['nff', 'sff', 'mff'];
var typeNameArr = ['nfs', 'sfs', 'mfs'];

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '3,9,10,8,8,9,8,5,11,11,11,11,8,7,7,4,5,6,7,8',
        balance: '100,000.00',
        cfgs: '1',
        ver: '2',
        index: '1',
        balance_cash: '100,000.00',
        def_sb: '10,10,11,9,5',
        reel_set_size: '6',
        def_sa: '11,7,3,4,6',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        cls_s: '13',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{rtps:{purchase:\"96.49\",regular:\"96.50\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"109589\",max_rnd_win:\"1000\"}}',
        wl_i: 'tbm~1000',
        stime: '1647486400521',
        sa: '11,7,3,4,6',
        sb: '10,10,11,9,5',
        sc: '10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00',
        defc: '100.00',
        sh: '4',
        wilds: '2~250,100,25,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '100.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;250,100,25,0,0;200,50,20,0,0;100,40,10,0,0;75,30,10,0,0;75,30,10,0,0;50,20,4,0,0;50,20,4,0,0;40,10,4,0,0;40,10,4,0,0;20,5,2,0,0;20,5,2,0,0;0,0,0,0,0,0',
        l: '20',
        rtp: '96.50',
        total_bet_max: '8,000,000.00',
        reel_set0: '2,2,2,2,7,10,8,12,3,3,12,3,8,8,5,5,12,12,11,11,11,8,8,11,11,12,12,6,12,6,6,12,11,11,12,12,9,12,4~2,2,2,2,7,12,12,12,9,9,8,8,11,11,10,10,9,6,6,4,9,4,4,8,9,10,3,10,5,9,4,11,6,8,7,7,12,12,7,7,3,3,8,3,3,11,8,8,5,5,11,5,11,12,12,4,4,10,4,9,11,11,9,5,5,12,7,1~2,2,2,2,9,10,1,10,4,4,8,4,3,7,3,3,8,4,8,4,12,9,9,5,5,10,5,9,6,6,10,3,3,11~2,2,2,2,8,5,5,9,7,1,9,4,4,9,8,12,6,3,3,9,12,6,6,8,11,4,11,4,10~5,7,6,12,6,10,8,11,8,2,2,2,2,7,4,4,9,3',
        s: '3,9,10,8,8,9,8,5,11,11,11,11,8,7,7,4,5,6,7,8',
        reel_set2: '5,12,12,8,11,11,11,8,13,13,13,13,13,13,13,13,13,13,8,4,9,4,9,11,3,3,13,13,13,13,13,7,12,8,11,12,7,12,7,13,13,13,13,13,9,12,12,11,4,11,6,6,11,4,11,2,2,2,2,7,10~4,8,10,2,2,2,2,2,10,9,11,8,7,7,12,12,7,7,13,13,13,13,11,5,11,3,13,13,13,13,12,10,7,10,6~2,2,2,2,6,11,10,4,4,10,13,13,13,13,13,13,13,13,13,13,12,9,9,5,5,10,13,13,13,13,13,3,3,8,10,3,8,3,3,6,7~8,12,10,4,4,11,4,4,12,4,13,13,13,13,13,5,12,5,5,12,7,2,2,2,2,2,10,9,5,5,12,12,6,6,12,3~6,8,2,2,2,2,2,8,11,12,9,4,4,7,3,7,13,13,13,13,13,8,8,4,9,12,12,10,5',
        reel_set1: '5,12,12,8,11,11,11,8,13,13,13,13,8,4,9,4,9,11,3,3,13,13,13,13,7,12,8,11,12,7,12,7,13,13,13,13,13,9,12,12,11,4,11,6,6,11,4,11,2,2,2,2,7,10~2,2,2,2,12,7,13,13,13,13,3,3,8,11,4,8,4,8,5,13,13,13,13,6,6,9,10~3,7,4,4,11,5,5,8,9,2,2,2,2,9,10,4,11,4,4,10,11,7,12,6,6,10,13,13,13,13~4,6,2,2,2,2,11,12,10,8,5,5,9,9,9,7,7,9,13,13,13,13,3~2,2,2,2,11,8,4,7,7,10,5,5,9,8,3,3,8,11,6,6,8,7,11,11,9,12,10,13,13,13,13',
        reel_set4: '2,2,2,2,7,10,8,12,3,3,12,3,8,8,5,5,12,12,11,11,11,8,8,11,11,12,12,6,12,6,6,12,11,11,12,12,9,12,4~11,1,12,7,8,1,9,10,7,1,5,12,7,1,6~4,10,11,1,3,9,10,1,2~4,10,10,1,5,9,12,1,8,12,7,1,6,11~5,7,6,12,6,10,8,11,8,2,2,2,2,2,7,4,4,9,3',
        purInit: '[{type:\"fs\",bet:1600}]',
        reel_set3: '5,12,12,8,11,11,11,8,13,13,13,13,8,4,9,4,9,11,3,3,13,13,13,13,13,7,12,8,11,12,7,12,7,13,13,13,13,9,12,12,11,4,11,6,6,11,4,11,2,2,2,2,7,10~6,13,13,13,13,13,10,12,11,13,13,13,13,13,4,4,8,9,10,10,2,2,2,2,12,7,13,13,13,13,4,8,5~2,2,2,2,6,11,10,4,4,10,13,13,13,13,13,13,13,13,13,13,12,9,9,5,5,10,13,13,13,13,13,3,3,8,10,3,8,3,3,6,7~9,13,13,13,13,11,4,11,4,10,6,11,6,6,12,10,2,2,2,2,8,12,10,4,4,11,4,4,12,4,13,13,13,13,13,5,12,5,5,12,7,2,2,2,2,12,6,6,12,3~6,8,7,11,11,9,13,13,13,13,13,13,13,13,13,10,8,11,8,2,2,2,2,2,7,4,4,9,3,3,7,9,8,3,13,13,13,13,4,12,4,10,5',
        reel_set5: '5,9,11,11,11,11,7,3,3,3,3~6,1,8,12,12,12,10,10,10,1,4,4,4~2,2,2,1,10,10,4,1,4,8,4,1,7,3,3,1,4,8,4,1,9,9,5,1,10,5,9,1,6,10,3,1,11,12~2,2,2,8,5,1,9,7,9,1,4,4,9,1,12,6,3,1,9,12,6,1,8,11,4,1,4,10~5,7,6,12,6,10,8,11,8,2,2,2,2,7,4,4,9,3',
        total_bet_min: '200.00',
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
        sa: "",
        sb: "",
        sh: 4,
        sver: 5,   
        c: player.betPerLine,
        counter: 1,
        l: 20,
        ls: 0,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
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

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    var mode = player.machine.randomSpinMode;

    if (mode) {
        if (player.machine.randomSpinIndex == 0) {
            result["bgid"] = 0;
            result["bgt"] = 21;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["na"] = 'b';
            result["rw"] = 0;
            result["status"] = '0,0';
            result["wins_mask"] = 'h,h';
            result["wins"] = '0,0';
            result["wp"] = 0;
        } else {
            if (mode == 1) {
                result["is"] = player.machine.maskView;
                result["rs_t"] = 1;

                var srf = [];

                player.machine.changedArr.forEach(function (item) {
                    srf.push(`${player.machine.maskView[item]}~2~${item}`);
                });

                result["srf"] = srf.join(';');
            } else if (mode == 2) {
                if (player.machine.randomSpinIndex < player.machine.randomSpinCache.length) {
                    result["rs_c"] = player.machine.randomSpinIndex + 1;
                    result["rs_m"] = player.machine.randomSpinIndex + 1;
                    result["rs_more"] = 1;
                    result["rs_p"] = player.machine.randomSpinIndex;
                    result["rs"] = "mc";

                    var tmb = [];

                    player.machine.changedArr.forEach(function (item) {
                        tmb.push(`${item},${player.machine.view[item]}`);
                    })

                    result["tmb"] = tmb.join('~');
                } else {
                    result["rs_t"] = player.machine.randomSpinIndex;
                }

            }
        }

        return result;
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["bgid"] = 1;
            result["bgt"] = 21;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["puri"] = 0;
            result["purtr"] = 1;
            result["reel_set"] = player.machine.freeSpinType + 1;
            result["na"] = 'b';
            result["rw"] = 0;
            result["status"] = '0,0,0';
            result["wins_mask"] = 'h,h,h';
            result["wins"] = '0,0,0';
            result["wp"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        // result =  {
        //     tw: '400.00',
        //     fsmul: '1',
        //     ls: '0',
        //     balance: '89,350.00',
        //     fsmax: '5',
        //     index: '13',
        //     balance_cash: '89,350.00',
        //     is: '3,7,5,13,8,8,12,13,13,10,12,9,13,13,2,11,9,13,13,2',
        //     reel_set: '1',
        //     balance_bonus: '0.00',
        //     na: 's',
        //     fswin: '400.00',
        //     l0: '9~200.00~10~6~12~8~14',
        //     l1: '34~200.00~10~6~7~8~14',
        //     puri: '0',
        //     stime: '1647486527979',
        //     fs: '2',
        //     sa: '13,7,5,13,5',
        //     sb: '11,7,13,3,2',
        //     sh: '4',
        //     fsres: '400.00',
        //     c: '10.00',
        //     srf: '13~12~3,7,8,12,13,17,18',
        //     sver: '5',
        //     counter: '26',
        //     l: '20',
        //     s: '3,7,5,12,8,8,12,12,12,10,12,9,12,12,2,11,9,12,12,2',
        //     w: '400.00',
        // };

        // result["index"] = param.index;
        // result["counter"] = ++param.counter;

        // return result;
        //                       
        result["reel_set"] = player.machine.freeSpinType + 1;
        result["puri"] = 0;
        if (player.machine.changedArr.length) {
            result["is"] = Util.view2String(player.machine.maskView);
            result["srf"] = `13~${player.machine.changedSymbol}~${player.machine.changedArr}`;
        }
        if (player.machine.freeSpinType > 0) {
            result["fstype"] = typeNameArr[player.machine.freeSpinType];
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            if (player.machine.isFreeSpinAdd) {
                result["fsmore"] = 5;
            }
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["tw"] = player.machine.freeSpinWinMoney;
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["tw"] = player.machine.freeSpinWinMoney;
        }
    }
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: `0.00`,
        balance_cash: player.balance,
        balance: player.balance,
        bgid: 0,
        bgt: 21,
        coef: player.virtualBet,
        end: 1,
        level: 1,
        lifes: 0,
        rw: 0,
        counter: ++param.counter,
        index: param.index,
        na: `s`,
        stime: new Date().getTime(),
        sver: `5`,
    }

    if (player.machine.randomSpinMode) {
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "mc";
        result["status"] = [0, 0];
        result["status"][player.machine.randomInd] = 1;

        var modeArr = ['wild_cur', 'fort_hex'];
        var wins_mask = [];

        for (var i = 0; i < 2; ++i) {
            if (result["status"][i] == 1) {
                wins_mask.push(modeArr[player.machine.randomSpinMode - 1]);
            } else {
                wins_mask.push(modeArr[player.machine.randomSpinMode % 2]);
            }
        }
        result["wins_mask"] = wins_mask.join(',');
    }

    if (player.machine.currentGame == "FREE") {
        result["bgid"] = 1;
        result["fs"] = player.machine.freeSpinIndex;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = 1;
        result["fswin"] = 0;
        result["fsres"] = 0;

        result["status"] = [0, 0, 0];
        result["status"][player.machine.randomInd] = 1;

        var wins_mask = [];

        for (var i = 0; i < 3; ++i) {
            wins_mask.push(typeArr[(player.machine.freeSpinType + 3 - player.machine.randomInd + i) % 3]);
        }
        result["wins_mask"] = wins_mask.join(',');
        result["wins"] = '5,5,5';
        result["wp"] = 0;
    }

    return result;
}
module.exports = ApiManager;
