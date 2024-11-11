var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '12,5,7,11,3,12,5,2,11,10,11,5,5,11,10,10,5,10,11,7',
        balance: '0.00',
        cfgs: '5431',
        accm: 'cp~tp~lvl~sc;cp~tp~lvl~sc;cp~tp~lvl~sc;cp~tp~lvl~sc',
        ver: '2',
        mo_s: '15',
        acci: '1;2;3;4',
        index: '1',
        balance_cash: '0.00',
        mo_v: '20,40,80,120,200,320,400,600,800,1000,1600,2000,4000,5000,8000,10000',
        def_sb: '4,10,10,7,8',
        reel_set_size: '4',
        def_sa: '8,8,9,6,3',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        accv: '0~5~0~0;0~5~0~0;0~4~0~0;0~3~0~0',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{rtps:{purchase:"94.50",regular:"94.60"},props:{max_rnd_sim:"1",max_rnd_hr:"3119152",jp1:"100000",max_rnd_win:"2600",jp3:"2000",jp2:"10000",jp4:"500"}}',
        wl_i: 'tbm~2600',
        stime: '1646039884459',
        sa: '8,8,9,6,3',
        sb: '4,10,10,7,8',
        sc: '5.00,10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00',
        defc: '50.00',
        sh: '4',
        wilds: '2~500,150,50,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        st: 'rect',
        c: '50.00',
        sw: '5',
        sver: '5',
        g: '{fs_collect:{def_s:"22,14,14",def_sa:"23",def_sb:"22",reel_set:"2",s:"22,14,14",sa:"23",sb:"22",sh:"3",st:"rect",sw:"1"},fs_main:{def_s:"15,15,18,14,16,14,15,14,20",def_sa:"14,14,14",def_sb:"14,14,14",reel_set:"1",s:"15,15,18,14,16,14,15,14,20",sa:"14,14,14",sb:"14,14,14",sh:"3",st:"rect",sw:"3"}}',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;250,100,25,0,0;200,80,20,0,0;150,40,15,0,0;100,20,10,0,0;100,20,10,0,0;40,10,5,0,0;40,10,5,0,0;40,10,5,0,0;40,10,5,0,0;40,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0',
        l: '40',
        total_bet_max: '20,000,000.00',
        reel_set0: '12,3,6,13,8,3,13,7,8,11,11,8,5,12,8,11,11,7,4,11,12,3,9,3,12,13,10,7,12,3,3,3,3,4,5,1,13,2,3,5,5,8,12,1,5,12,9,11,6,11,13,2,8,8,13,8,7,7,11,8,12,11,2,10,7~10,10,8,9,3,9,9,9,9,2,10,13,5,6,13,8,13,13,13,13,1,5,6,2,4,4,8,8,8,8,4,5,11,10,13,9,11,11,11,11,6,8,12,4,13,6,7,10,10,10,10,11,10,4,6,13,11,11,6,6,6,6,8,11,9,10,8,9,9,5~12,9,9,2,12,11,3,13,9,2,4,13,6,10,12,13,13,13,13,8,12,7,5,3,10,9,7,12,11,7,12,10,9,5,12,9,9,9,9,5,12,13,5,10,12,2,7,3,10,6,3,4,8,9,12,12,12,10,3,9,13,3,9,10,9,13,13,5,1,9,12,10,13,10~4,2,4,10,13,6,4,8,6,13,13,13,13,6,10,2,11,6,10,7,8,11,13,11,11,11,11,1,9,10,7,13,5,8,12,8,8,6,6,6,11,11,13,13,11,4,7,12,7,11,8,8,8,8,7,8,1,11,13,10,10,8,4,7,7,7,7,3,6,10,5,4,9,6,2,6,3,7~3,6,5,13,7,7,5,7,5,9,3,10,9,5,9,9,12,8,9,3,6,6,8,3,3,13,9,6,3,12,9,2,5,3,3,3,3,1,11,9,12,11,13,11,2,10,12,5,9,7,5,6,7,1,11,8,4,7,9,13,3,13,12,8,6,12,5,6,13,7,7,13,13,13,3,12,6,8,13,12,11,7,7,3,5,2,12,11,11,10,7,13,9,13,4,11,13,9,11,13,13,6,5,5,12,13,2,3,10',
        s: '12,5,7,11,3,12,5,2,11,10,11,5,5,11,10,10,5,10,11,7',
        accInit: '[{id:1,mask:"cp;tp;lvl;sc;cl"},{id:2,mask:"cp;tp;lvl;sc;cl"},{id:3,mask:"cp;tp;lvl;sc;cl"},{id:4,mask:"cp;tp;lvl;sc;cl"}]',
        reel_set2: '23,22,14,23,14,23,23,23,22,22,14,14,23,14,23,22,22,22,14,22,22,14,23,14,14',
        reel_set1: '14,14,14,14,14~14,14,14,14,14~14,14,14,14,14',
        purInit: '[{type:"fsbl",bet:4000,bet_level:0}]',
        reel_set3: '15,24,15,15,21,24,14,14,15,14,24,14,21,15,14,15,15,15,15,14,15,15,14,15,24,15,15,21,15,14,14,15,24,14,24,24,24,15,24,14,15,14,24,24,21,15,21,14,15,14,15,14,21,14',
        total_bet_min: '10.00',
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
        tw: "0.00",
        w: "0.00",
        acci: "1;2;3;4",
        accm: "cp~tp~lvl~sc;cp~tp~lvl~sc;cp~tp~lvl~sc;cp~tp~lvl~sc",
        accv: "0~5~0~0;0~5~0~0;0~4~0~0;0~3~0~0",
        balance_bonus: "0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: "100.00",
        counter: "1",
        index: "1",
        l: "40",
        na: "s",
        reel_set: 0,
        s: "9,4,12,11,12,12,4,11,10,10,4,12,4,7,5,4,2,4,7,5",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "4",
        sver: "5",   
        st: "rect",
        stime: new Date().getTime(),
        sw: "5",
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

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    var switchMask = player.machine.switchMask;

    if (switchMask.length > 0) {
        result["is"] = switchMask.join();

        var stf = [];

        player.machine.switchPositions.forEach(function (item) {
            stf.push(switchMask[item] + "~2~" + item);
        });

        result["stf"] = "wild_switch_1:" + stf.join(';');
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;

            if (player.machine.freeSpinAdd) {
                result["fsmore"] = player.machine.freeSpinAdd;
            }

            result["fsmul"] = 1;
            result["fswin"] = 0;
            result["fsres"] = 0;
            result["reel_set"] = 0;
            result["na"] = "s";
            result["puri"] = 0;
            result["purtr"] = 1;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;

        var accm = [];
        var accv = [];
        var collectLimits = [3, 4, 5, 5];

        for (var i = 3; i >= 0; --i) {
            var item = [];

            item.push(player.machine.nCollects[i]); //cp
            item.push(collectLimits[i]);            //tp
            item.push(player.machine.collectLevels[i]); //lvl
            item.push(player.machine.addCollects[i]);   //sc

            if (player.machine.collectAddLevels[i]) {
                accm.push("cp~tp~lvl~sc~cl");
                accv.push(player.machine.collectAddLevels[i]);  //cl
            } else {
                accm.push("cp~tp~lvl~sc");
            }

            accv.push(item.join('~'));
        }

        result["accm"] = accm.join(';');
        result["accv"] = accv.join(';');

        var collectMoney = player.machine.collectMoney;

        if (collectMoney) {
            result["apt"] = "ma";
            result["apv"] = collectMoney;
            result["apwa"] = collectMoney * player.betPerLine;
        }

        if (player.machine.currentGame == "FREE") {
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["na"] = "s";

        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["fs_total"] = player.machine.freeSpinLength;
            result["fs_endtotal"] = 1;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["na"] = "c";
        }

        // var g = {};
        // var sReel = [14, 22, 23];

        // g["fs_collect"] = {
        //     reel_set: "2",
        //     s: player.machine.sReel.join(),
        //     sa: sReel[Util.random(0, sReel.length)],
        //     sb: sReel[Util.random(0, sReel.length)],
        //     sh: "3",
        //     st: "rect",
        //     sw: "1"
        // };
        // g["fs_main"] = {
        //     mo_t: player.machine.moneyCache.table.join(),
        //     mo: player.machine.moneyCache.values.join(),
        //     reel_set: 1,
        //     s: player.machine.gView.join(),
        //     sa: "14,14,14",
        //     sb: "14,14,14",
        //     sh: "3",
        //     st: "rect",
        //     sw: "3"
        // };

        // if(player.machine.sReel[1] == 22){      //               
        //     var viewMoney = player.machine.moneyCache.values.reduce((total, value) => total + value, 0);

        //     g["fs_main"]["mo_c"] = 1;
        //     g["fs_main"]["mo_tv"] = viewMoney,
        //     g["fs_main"]["mo_tw"] = viewMoney * player.betPerLine;
        // var mo_wpos = [];

        // player.machine.moneyCache.values.filter(function(item){ return item > 0}).forEach(function(item, idx){
        //     mo_wpos.push(idx);
        // });

        // g["fs_main"]["mo_wpos"] = mo_wpos.join();

        // } else if (player.machine.sReel[1] == 23){
        //     g["fs_main"]["trail"] = "boost~" + (viewMoney - player.machine.moneyCache.values[4]);
        // }

        // result["g"] = JSON.stringify(g);


        var g = '{fs_collect:{';
        var sReel = [14, 22, 23];

        g += 'reel_set:"2",';
        g += 's:"' + player.machine.sReel.join() + '",';
        g += 'sa:"' + sReel[Util.random(0, sReel.length)] + '",';
        g += 'sb:"' + sReel[Util.random(0, sReel.length)] + '",';
        g += 'sh:"3",st:"rect",sw:"1"},';
        g += 'fs_main:{';
        g += 'mo_t:"' + player.machine.moneyCache.table + '",';
        g += 'mo:"' + player.machine.moneyCache.values + '",';
        g += 'reel_set:"1",sa:"14,14,14",sb:"14,14,14",sh:"3",st:"rect",sw:"3",';
        g += 's:"' + player.machine.gView + '"';

        if (player.machine.sReel[1] == 22) {      //               
            var viewMoney = player.machine.moneyCache.values.reduce((total, value) => total + value, 0);

            g += ',mo_c:"1"';
            g += ',mo_tv:"' + viewMoney + '"';
            g += ',mo_tw:"' + viewMoney * player.betPerLine + '"';

            var mo_wpos = [];
            player.machine.moneyCache.values.filter(function (item) { return item > 0 }).forEach(function (item, idx) {
                mo_wpos.push(idx);
            });
            g += ',mo_wpos:"' + mo_wpos + '"';
        } else if (player.machine.sReel[1] == 23) {
            var viewMoney = player.machine.moneyCache.values.reduce((total, value) => total + value, 0);

            g += ',trail:"boost~' + (viewMoney - player.machine.moneyCache.values[4]) + '"';
        }

        g += '}}';
        result["g"] = g;

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