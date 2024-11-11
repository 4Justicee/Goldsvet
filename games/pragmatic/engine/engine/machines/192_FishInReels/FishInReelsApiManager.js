var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '5,8,7,9,8,8,7,3,4,4,11,6,8,11,10',
        balance: '0.00',
        cfgs: '4708',
        ver: '2',
        mo_s: '13',
        index: '1',
        balance_cash: '0.00',
        def_sb: '5,3,4,6,7',
        mo_v: '5,10,20,30,40,50,60,80,100,120,150,200,250,300,400,500,1000,2000,2500',
        reel_set_size: '4',
        def_sa: '11,5,10,8,9',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{props:{max_rnd_sim:"1",max_rnd_hr:"243956075",max_rnd_win:"1200"}}',
        wl_i: 'tbm~1200',
        stime: '1646038403841',
        sa: '11,5,10,8,9',
        sb: '5,3,4,6,7',
        sc: '10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,9000.00,10000.00',
        defc: '200.00',
        sh: '3',
        wilds: '2~0,0,0,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '200.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,200,50,5,0;500,150,25,0,0;400,125,20,0,0;300,100,15,0,0;200,50,10,0,0;200,50,10,0,0;150,20,5,0,0;150,20,5,0,0;100,20,5,0,0;100,20,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0',
        l: '10',
        rtp: '94.50',
        reel_set0: '5,3,6,7,4,9,12,10,11,1,8,6,9,3,11,9,6,9,6,3,7,3,7,11,8,9~11,12,3,10,2,6,8,7,1,5,4,9,7,12,8,2,6,1,8,6,1,7,2,1,3,2,8,12,3,10,1,2,1,3,10~10,3,12,11,6,9,7,4,1,8,5,2,5,12,3,7,5,7,11,2,9,12~4,8,9,3,6,12,1,11,7,5,10,2,5,6,10,5,8,5,6,8,5,1,11,6,8,5,6,5,6,8,7,2~12,9,1,3,6,4,7,5,11,8,10,8,10,1,8,1,3,1,3,1,5,10,7,9,7,1,4,1,8,1,4,1,3,5,1,8,1,7,1,11,6,7',
        s: '5,8,7,9,8,8,7,3,4,4,11,6,8,11,10',
        reel_set2: '13,13,13,10,3,11,4,5,8,9,7,13,12,6,3,9,4,3,12,3,12,9,12,4,11,4,12,9,8,10,12,11,9,8,12,6,10,12,11,10,11,10,4,11,12,10,6~13,13,13,2,12,11,7,6,8,9,4,10,13,3,5,10,3,10,8,3,2,10,3,8,2,10,2,10,7,9,3,10,3,8,10,9,8,3~4,7,10,9,12,13,11,13,13,13,2,3,5,8,6,13,3,2,13,3,6,13,3,13,2,13,11,3,13,5,13,3,13,11,2,13,5,13,5,2,8,2,13,2~13,13,13,8,10,10,10,4,5,3,2,12,6,13,11,7,9,10,11,9,11,10,5,4,10,12,5,10,9,11,9,10,4,6,10,6,4,9,10,7,12~9,8,11,6,7,10,5,14,4,12,3,5,3,6,3,10,6,4,12,5,12,8,10,3,11,8,14,11,10,14,11,10,6,4,11,8,7,4,10,3,5,11,4,5,6',
        reel_set1: '5,11,12,10,6,7,4,9,8,3,4,7,11,9,7,8,12,4,11,10,8,10,3,7,10,8,11,9,4,7~9,6,5,2,3,12,8,10,7,4,11,12,10,6,5,7,2,12,10,7,10,6,7,6,10,2~6,4,7,8,5,2,12,11,10,9,3,9,12,11,10,9,4,5,7,8,7,4,11,10,11,4,11,8,9,4,12,9~5,2,10,10,10,4,3,8,11,9,6,10,12,7,12,6,8,11,10,7,4,7,12,11,10,12,3,10,12~12,3,5,7,8,10,9,4,6,11,6,4,11,8,10,3,10,3,9,5,10,6,5,10,11,4',
        reel_set3: '10,3,12,7,11,8,9,3,11,9,7,12,3,9,3,7,3,11,8,11,9,3,11,3,8,7,9,7,3,9,8,7,9,12,11,3,8,12~2,11,12,10,3,8,7,9,8,3,8,11,10,11,8,3,7,3,8,10,8,3,8,10,3,10,7,9,8,10,8,10,3,8,10,3,10,8,3,10,8,10,11,3,8,10,3,11,8,7,10,3,8,3,11,10,7,10,3,8,10,7,11,3,10,7,9,10,11,7,8,10,8,3,10,11,3,12,10,3,10,3,10,11,3,10,3,11,10,8,3,10,3,10,3,8,11,7,8~8,7,10,9,12,3,11,2,3,9,2,3,10,3,2,12,2,12,2,3,2,3,2,3,2,12,9,12,2,12,10,3,10,12,2,3,9,7,12,3,2,12,2,10,2,9,2,9,12,3,12,9,3,12,3,12,2,3,2,3,2,9,2,10,3,12,3,9,3,12,2,3,2,11,3,9,10,3,12,11,2,9,12,3,9,12,10,12,3,9~10,7,11,8,2,9,3,12,9,7,8,2,7,8,9,8,7,8,9,8,7,8,12,7,9,2,9,7,9,7,8,9,2,8,7,3,12,3,7,2,8,12,2,7,8,12,8,9,8,12,7,2,7,8,11,12,9,8,12,9,8,7,9,8,7,9,2,8,7,2,7,2,8,2,7,2,9,2,7,8,9,2,9~8,3,11,7,12,10,12,10,7,10,7,12,7,10,12,11,7,12,10,11,10,12,7,12,7,12,10,11,7,12,7,10,12,7,10,7,12,7,10,3,12,10,12,7,12,11,12,10,11,10',
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
        balance: 0,
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        reel_set: 0,    //                              
        stime: new Date().getTime(),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: 3,
        sver: 5,   
        c: player.betPerLine,
        counter: 1,
        l: 10,
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };
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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["na"] = "b";
            result["bgid"] = 0;
            result["bgt"] = 30;
            result["bw"] = 1;

            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["rw"] = 0;

            result["status"] = "0,0";
            result["wins_mask"] = "frenzy_fishing,big_catch";
            result["wins"] = "1,1";
            result["wp"] = "0";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        if (player.machine.currentGame == "FREE") {
            result["tw"] = player.machine.freeSpinWinMoney + player.machine.scatterWin;
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;


            if (player.machine.isFreeSpinAdd) {
                result["fsmore"] = player.machine.freeSpinAddCount;
                player.machine.isFreeSpinAdd = false;
            }


            if (player.machine.freeSpinType) {
                result["reel_set"] = 1;

                if (player.machine.bigSymbolCache.table.length) {
                    var ds = [];
                    var dsa = [];
                    var dsam = [];
                    player.machine.bigSymbolCache.table.forEach(function (item) {
                        ds.push(`15~${item}`)
                        dsa.push(`1`);
                        dsam.push(`v`);
                    });
                    result["ds"] = ds.join(';');
                    result["dsa"] = dsa.join(';');
                    result["dsam"] = dsam.join(';');
                }

                if (player.machine.bigSymbolCache.table.length == 3) {
                    var ra2_avl_awd = [];
                    player.machine.fishValuesCache.forEach(function (item) {
                        var type = "t";
                        if (item.multiValue > 10)
                            type = "f";
                        if (item.multiValue > 500)
                            type = "gf";
                        ra2_avl_awd.push(`${item.multiIndex}~coin_mul~${item.multiValue}~` + type);
                    });

                    player.machine.fishValuesCache.shift();

                    result["ra2_avl_awd"] = ra2_avl_awd.join(';');
                    result["ra2_awd_id"] = player.machine.bigSymbolCache.catchedMultiIndex;

                    var trail = [];
                    player.machine.catchedFishes.forEach(function (item) {
                        var type = "t";
                        if (item.multiValue > 10)
                            type = "f";
                        if (item.multiValue > 500)
                            type = "gf";
                        trail.push(`bch_f${item.index}~${item.multiIndex},coin_mul,${item.multiValue},` + type);
                    });
                    result["trail"] = trail.join(';');
                }
            } else {
                result["reel_set"] = 2;
                //             api
                if (player.machine.moneyCache.values != undefined) {
                    result["mo"] = player.machine.moneyCache.values;
                    result["mo_t"] = player.machine.moneyCache.table;
                }
                if (player.machine.winMoney > 0) {
                    result["mo_c"] = 1;
                    result["mo_tv"] = player.machine.winMoney / player.betPerLine;
                    result["mo_tw"] = player.machine.winMoney;
                }
            }
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.scatterWin;
            result["tw"] = player.machine.freeSpinWinMoney;

            if (!player.machine.freeSpinType) {
                result["mo"] = player.machine.moneyCache.values;
                result["mo_t"] = player.machine.moneyCache.table;
                if (player.machine.winMoney > 0) {
                    result["mo_c"] = 1;
                    result["mo_tv"] = player.machine.winMoney / player.betPerLine;
                    result["mo_tw"] = player.machine.winMoney;
                }
            }
        }
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;

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
        counter: "2"
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
        balance_bonus: '0.0',
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        index: param.index,
        na: 's',
        stime: new Date().getTime(),
        sver: '5',
        coef: player.virtualBet,
        rw: 0,
        wins_mask: "frenzy_fishing,big_catch",
        wins: "1,1",
        wp: "0",
    }
    result["bgid"] = 0;
    result["bgt"] = 30;
    //                   
    result["end"] = 1;
    result["fs"] = 1;
    result["fsmax"] = player.machine.freeSpinLength;
    result["fsmul"] = 1;
    result["fsres"] = 0.00;
    result["fswin"] = 0.00;
    result["level"] = 1;
    result["lifes"] = 0;
    //                         
    if (player.machine.freeSpinType)
        result["status"] = "0,1";   //            
    else
        result["status"] = "1,0";   //            
    return result;
}

module.exports = ApiManager;
