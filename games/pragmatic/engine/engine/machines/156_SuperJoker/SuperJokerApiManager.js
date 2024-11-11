var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '3,4,5,3,4,5,3,4,5',
        balance: '0.00',
        cfgs: '3178',
        ver: '2',
        index: '1',
        balance_cash: '0.00',
        reel_set_size: '17',
        def_sb: '3,4,5',
        def_sa: '3,4,5',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0~0,0,0~1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        stime: '1646038096404',
        sa: '3,4,5',
        sb: '3,4,5',
        reel_set10: '5,5,5,6,3,7,8,4,6,4,4,4,7,2,2,4,10,7,8,9,2,10,10,10,7,6,6,6,2,2,9,9,9,7,10,10,6,7,3,3,3~5,5,5,6,3,7,8,4,6,4,4,4,7,2,2,4,10,7,8,9,2,10,10,10,7,6,6,6,2,2,9,9,9,7,10,10,6,7,3,3,3~5,5,5,6,3,7,8,4,6,4,4,4,7,2,2,4,10,7,8,9,2,10,10,10,7,6,6,6,2,2,9,9,9,7,10,10,6,7,3,3,3',
        // sc: '20.00,30.00,40.00,50.00,100.00,150.00,250.00,500.00,750.00,1000.00,1500.00,2500.00,5000.00,10000.00,15000.00,20000.00',
        sc: '40.00,50.00,100.00,150.00,250.00,300.00,400.00,500.00,750.00,1000.00,1500.00,2500.00,5000.00,10000.00,15000.00,20000.00',
        defc: '400.00',
        reel_set11: '3,3,9,5,5,5,4,6,4,4,4,8,8,8,7,9,3,9,10,7,4,5,10,6,6,7,6,2,2,2~3,3,9,5,5,5,4,6,4,4,4,8,8,8,7,9,3,9,10,7,4,5,10,6,6,7,6,2,2,2~3,3,9,2,2,2,5,5,5,4,6,4,4,4,7,9,3,9,10,7,4,5,10,6,8,8,8,6,7,6',
        reel_set12: '6,7,8,3,4,6,8,2,2,4,5,5,5,10,8,3,9,2,10,10,10,8,4,4,4,2,6,6,6,2,9,9,9,8,10,10,6,8,7,7,7~6,7,8,3,4,6,8,2,2,4,5,5,5,10,8,3,9,2,10,10,10,8,4,4,4,2,6,6,6,2,9,9,9,8,10,10,6,8,7,7,7~6,7,8,3,4,6,8,2,2,4,5,5,5,10,8,3,9,2,10,10,10,8,4,4,4,2,6,6,6,2,9,9,9,8,10,10,6,8,7,7,7',
        reel_set13: '8,8,3,5,5,5,4,6,4,4,4,7,3,8,3,10,7,4,5,10,6,9,9,9,6,7,6,2,2,2~8,8,3,5,5,5,4,6,4,4,4,9,9,9,7,3,8,2,2,2,3,10,7,4,5,10,6,6,7,6~8,8,3,2,2,2,5,5,5,4,6,4,4,4,7,3,8,3,10,7,4,5,10,6,9,9,9,6,7,6',
        sh: '3',
        wilds: '2~75,0,0~1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '400.00',
        sver: '5',
        counter: '2',
        reel_set14: '7,7,7,6,7,9,8,4,3,3,3,4,4,4,6,9,2,2,4,10,9,8,3,2,10,10,10,9,6,6,6,2,5,5,5,2,9,10,10,6,9~7,7,7,6,7,9,8,4,3,3,3,4,4,4,6,9,2,2,4,10,9,8,3,2,10,10,10,9,6,6,6,2,5,5,5,2,9,10,10,6,9~7,7,7,6,7,9,8,4,3,3,3,4,4,4,6,9,2,2,4,10,9,8,3,2,10,10,10,9,6,6,6,2,5,5,5,2,9,10,10,6,9',
        paytable: '0,0,0;0,0,0;0,0,0;25,0,0;15,0,0;10,0,0;7,0,0;6,0,0;5,0,0;3,0,0;2,0,0',
        l: '5',
        reel_set15: '8,8,9,5,5,5,4,6,4,4,4,10,10,10,7,9,8,9,3,7,4,5,3,6,6,7,6,2,2,2~8,8,9,5,5,5,4,6,4,4,4,10,10,10,7,9,8,9,3,7,4,5,3,6,6,7,6,2,2,2~8,8,9,2,2,2,5,5,5,4,6,4,4,4,7,9,8,9,3,7,4,5,3,6,10,10,10,6,7,6',
        reel_set16: '6,7,10,8,4,6,10,9,9,9,6,6,6,2,2,4,3,10,8,9,2,3,3,3,10,4,4,4,2,5,5,5,2,10,3,3,6,10,7,7,7~6,7,10,8,4,6,10,4,4,4,6,6,6,2,2,4,3,10,8,9,2,3,3,3,10,2,5,5,5,2,7,7,7,9,9,9,10,3,3,6,10~6,7,10,8,4,6,10,6,6,6,9,9,9,2,2,4,3,10,8,9,2,3,3,3,10,4,4,4,2,5,5,5,2,7,7,7,10,3,3,6,10',
        rtp: '94.50',
        reel_set0: '6,2,7,8,8,8,2,2,2,5,5,5,6,6,6,7,7,7,4,4,4,9,9,9,8,8,8,3,3,3,6,2,8,7,7,7,10,10,10,6,6,6,2,2,2,8,8,8,9,9,9,4,4,4~2,2,2,6,6,6,7,7,7,10,10,10,5,5,5,6,6,6,9,9,9,9,4,5,7,7,7,4,10,9,8,8,8,2,2,2,5,5,5,4,4,4,8,8,8,5,2,4,3,3,3,6,6,6,8,8,8,5,5,5~10,10,10,3,3,3,7,7,7,9,9,9,6,6,6,2,2,2,5,5,5,8,2,7,8,8,8,6,6,6,8,9,7,4,4,4,9,9,9,7,7,7,2,2,2,5,5,5,9,9,9,8,8,8,4,4,4',
        s: '3,4,5,3,4,5,3,4,5',
        reel_set2: '6,7,3,8,4,6,3,2,7,7,7,2,4,10,3,8,9,2,6,6,6,10,10,10,3,2,5,5,5,2,9,9,9,4,4,4,3,10,10,6,3~6,7,3,8,4,6,3,7,7,7,6,6,6,2,2,4,10,3,8,9,2,4,4,4,10,10,10,3,2,5,5,5,2,9,9,9,3,10,10,6,3~6,7,3,8,4,6,3,6,6,6,2,10,10,10,2,4,10,3,8,9,2,3,4,4,4,7,7,7,2,5,5,5,2,9,9,9,3,10,10,6,3',
        reel_set1: '8,8,9,5,5,5,4,6,3,3,3,7,9,8,9,10,7,4,4,4,4,5,10,6,6,7,6,2,2,2~8,8,9,4,6,4,4,4,7,9,8,9,10,7,4,5,10,6,3,3,3,6,7,6,2,2,2,5,5,5~8,8,9,5,5,5,4,6,4,4,4,3,3,3,7,9,8,9,10,7,4,5,10,6,6,2,2,2,7,6',
        reel_set4: '6,7,4,8,3,6,4,2,7,7,7,2,3,10,4,8,9,2,10,10,10,6,6,6,4,3,3,3,2,5,5,5,2,9,9,9,4,10,10,6,4~6,7,4,8,3,6,4,7,7,7,6,6,6,2,2,3,10,4,8,9,2,10,10,10,4,3,3,3,2,5,5,5,2,9,9,9,4,10,10,6,4~6,7,4,8,3,6,4,6,6,6,2,7,7,7,9,9,9,2,3,10,4,8,9,2,4,3,3,3,2,5,5,5,2,10,10,10,4,10,10,6,4',
        reel_set3: '8,8,9,5,5,5,3,6,3,3,3,7,9,8,9,10,7,3,5,10,6,4,4,4,6,7,6,2,2,2,4,4,4~8,8,9,3,6,5,5,5,3,3,3,4,4,4,7,9,8,9,10,7,3,5,10,6,4,4,4,6,7,6,2,2,2~8,8,9,3,6,3,3,3,4,4,4,5,5,5,7,9,8,2,2,2,9,10,7,3,5,10,6,4,4,4,6,7,6',
        reel_set6: '6,7,5,8,4,6,5,6,6,6,2,4,4,4,7,7,7,9,9,9,2,4,10,5,8,9,2,10,10,10,5,2,3,3,3,2,5,10,10,6,5~6,7,5,8,4,6,5,6,6,6,2,2,4,10,5,8,9,2,10,10,10,7,7,7,5,4,4,4,2,2,9,9,9,5,10,10,6,5,3,3,3~6,7,5,8,4,6,5,10,10,10,6,6,6,2,7,7,7,2,4,10,5,8,9,2,5,9,9,9,4,4,4,2,3,3,3,2,5,10,10,6,5',
        reel_set5: '8,8,9,4,6,4,4,4,7,9,8,2,2,2,9,10,7,4,3,10,6,5,5,5,3,3,3,6,7,6~8,8,9,2,2,2,3,3,3,4,6,4,4,4,7,9,8,9,10,7,4,3,10,6,5,5,5,6,7,6~8,8,9,3,3,3,4,6,5,5,5,7,9,8,9,10,7,4,3,10,6,5,5,5,4,4,4,6,7,6,2,2,2',
        reel_set8: '3,7,6,8,4,3,6,2,7,7,7,2,4,10,6,8,9,2,10,10,10,3,3,3,6,4,4,4,2,5,5,5,2,9,9,9,6,10,10,3,6~3,7,6,8,4,3,6,10,10,10,3,3,3,2,7,7,7,2,4,10,6,8,9,2,6,4,4,4,2,5,5,5,2,9,9,9,6,10,10,3,6~3,7,6,8,4,3,6,3,3,3,2,2,4,10,6,8,9,2,10,10,10,6,4,4,4,2,5,5,5,2,9,9,9,6,10,10,3,6,7,7,7',
        reel_set7: '8,8,9,5,5,5,4,3,7,9,8,9,10,7,4,5,10,3,6,6,6,3,7,3,2,2,2,4,4,4~8,8,9,2,2,2,5,5,5,4,3,4,4,4,7,9,8,9,10,7,4,5,10,3,6,6,6,3,7,3~8,8,9,5,5,5,4,3,6,6,6,7,9,8,2,2,2,9,10,7,4,5,10,3,3,7,3,4,4,4',
        reel_set9: '8,8,9,5,5,5,4,6,4,4,4,3,9,8,9,10,3,4,5,10,6,7,7,7,6,3,6,2,2,2~8,8,9,5,5,5,4,6,4,4,4,7,7,7,3,9,8,9,10,3,4,5,10,6,6,3,6,2,2,2~8,8,9,2,2,2,5,5,5,4,6,4,4,4,3,9,8,9,10,3,4,5,10,6,7,7,7,6,3,6',
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
        stime: new Date().getTime(),
        sh: 3,
        sver: 5,
        c: player.betPerLine,
        l: 5,
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
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.prevTumbleStatus == "NOTUMBLE" && player.machine.tumbleStatus == "TUMBLE") {
        result["n_rsl"] = "3,4,5,6,7,8,9,10";
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "mc";
        result["s_reel_set"] = 1;
        result["sty"] = "";
    } else if (player.machine.prevTumbleStatus == "TUMBLE") {
        result["is"] = "";

        if (player.machine.tumbleStatus == "TUMBLE") {
            ;
            result["na"] = "s";
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.tumbleIndex;
            result["rs_win"] = 0;
            result["rs"] = "mc";
            result["sty"] = "";
        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["rs_t"] = player.machine.tumbleIndex;
            result["rs_win"] = player.machine.winMoney;
            result["na"] = "c";
        }
    }

    if (player.machine.tumbleStickyPos.length)
        result["sty"] = player.machine.tumbleStickyPos.join('~');

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS") {
            result["na"] = "b";
            result["bgid"] = 8;
            result["bgt"] = 42;
            result["bw"] = 1;
            result["coef"] = player.machine.winMoney;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["rw"] = 0;
            result["wp"] = 0;

            var wof_mask = [];
            var wof_status = [];

            player.machine.wof_set.forEach(function (item) {
                if (item == 1)
                    wof_mask.push("up");
                else
                    wof_mask.push("wlm");

                wof_status.push(0);
            });
            result["wof_mask"] = wof_mask.join();
            result["wof_set"] = player.machine.wof_set.join();
            result["wof_status"] = wof_status.join();
        }
    }

    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
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
        balance_cash: '100,000.00',
        balance: '100,000.00',
        counter: '1',
        index: '1',
        na: 'b',
        s: player.machine.view.join(),
        stime: "1629939208592",
        sver: '5',
    }

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["bgid"] = 8;
    result["bgt"] = 42;
    result["coef"] = player.machine.winMoney;
    result["end"] = player.machine.moneyBonusLevel;
    result["level"] = player.machine.moneyBonusLevel;
    result["lifes"] = 1 - player.machine.moneyBonusLevel;
    result["rw"] = 0;
    result["tw"] = player.machine.winMoney;

    var wof_mask = [];
    var wof_status = [];

    player.machine.wof_set.forEach(function (item) {
        if (item == 1)
            wof_mask.push("up");
        else
            wof_mask.push("wlm");

        wof_status.push(0);
    });
    if (player.machine.multiIndex >= 0) {
        wof_status[player.machine.multiIndex] = 1;
        result["wof_wi"] = player.machine.multiIndex;
    }
    result["wof_mask"] = wof_mask.join();
    result["wof_set"] = player.machine.wof_set.join();
    result["wof_status"] = wof_status.join();
    result["wp"] = player.machine.totalMulti - 1;


    if (player.machine.currentGame == "BASE") {
        //                    
        result["rw"] = player.machine.winMoney;
        result["tw"] = player.machine.moneyBonusWin;
        result["na"] = "cb";
    }
    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        coef: player.machine.winMoney,
        counter: "2",
        index: "3",
        na: "s",
        rw: "100,000",
        stime: "1629939208592",
        sver: "5",
        wp: "0"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = player.machine.moneyBonusWin - player.machine.winMoney;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

module.exports = ApiManager;
