var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "7,5,4,3,6,7,9,4,3,8,6,6,4,9,8",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "3,8,4,7,3",
        reel_set_size: "3",
        def_sa: "7,4,6,3,3",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{regular:\"96.70\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"2767921\",max_rnd_win:\"2500\"}}",
        wl_i: "tbm~2500",
        stime: "1644572185311",
        sa: "7,4,6,3,3",
        sb: "3,8,4,7,3",
        sc: "20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00,6000.00,7000.00,8000.00,10000.00",
        defc: "200.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "200.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;150,60,20,0,0;80,30,12,0,0;30,12,6,0,0;24,10,4,0,0;20,4,2,0,0;12,2,1,0,0;12,2,1,0,0",
        l: "10",
        reel_set0: "3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5,7,7,7,6,6,6,5,5,5~9,9,9,8,8,3,3,7,7,7,6,6,3,3,3,8,8,8,4,4,4,6,6,6,5,5,5,6,6,6,2~9,9,8,8,8,9,9,4,4,4,9,9,7,7,9,9,5,5,9,3,3,9,9,3,3,3,9,9,9,7,7,7,5,5,5,6,6,6,7,7,7,6,6,6,2~9,9,9,8,8,9,9,9,3,3,3,8,8,3,3,3,7,7,7,6,6,8,8,9,9,9,8,8,6,6,3,3,3,8,8,8,4,4,4,6,6,6,5,5,5,6,6,6,2~9,9,9,8,8,8,3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5",
        s: "7,5,4,3,6,7,9,4,3,8,6,6,4,9,8",
        accInit: "[{id:1,mask:\"cp;mp\"},{id:2,mask:\"cp;mp\"},{id:3,mask:\"cp;mp\"},{id:6,mask:\"cp;mp\"},{id:7,mask:\"cp;mp\"},{id:8,mask:\"cp;mp\"},{id:11,mask:\"cp;mp\"},{id:12,mask:\"cp;mp\"},{id:13,mask:\"cp;mp\"}]",
        reel_set2: "9,9,9,8,8,8,3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5,2,2,2,9,9,9~9,9,9,8,8,8,3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5,2,2,2,9,9,9~9,9,9,8,8,8,3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5,2,2,2,9,9,9~9,9,9,8,8,8,3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5,2,2,2,9,9,9~9,9,9,8,8,8,3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5,2,2,2,9,9,9",
        reel_set1: "9,9,9,8,8,8,3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5~9,9,9,7,7,7,5,5,5,3,3,3~8,8,8,6,6,6,4,4,4~9,9,9,7,7,7,5,5,5,3,3,3~9,9,9,8,8,8,3,3,3,9,9,9,8,8,8,4,4,4,7,7,7,6,6,6,5,5,5",
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
        s: Util.view2String(player.machine.view.map((item) => (item > 100) ? item % 100 : item)),
    };
    //                                 
    var lines = player.machine.lines;
    for (var i = 0; i < lines.winLines.length; i++) {
        result[`l${i}`] = lines.winLines[i];
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


    /*
    api         

    acci:                 
    accm: cp
    accv:                 
    is:         ,          
    s:                                           
    rs_c: 1
    rs_m: 1
    rs_p:                   
    rs:                   mc
    rs_t:                             
    slm_lmi:                       ,      
    slm_lmv:                           ,      
    slm_mp:                  
    slm_mv:                 
    stf : e:2~2~1;s:7~2~1                ~2~            , e:              , s:                   
    e:2~2~11;6~2~6;7~2~1,s:2~2~1;9~2~2;5~2~3;8~2~8;8~2~13
    1                                 e:                      ~2~            , s:                                           2~2~      ,                       ~2~      
    trail: d~               ,       d~1e
    */
    if (player.machine.prevRespinStatus == "RESPIN" || player.machine.respinStatus == "RESPIN") {     //                                   ...
        var acci = [];
        var accm = [];
        var accv = [];
        var view = player.machine.view;

        for (var i = 0; i < view.length; ++i) {
            if (view[i] % 100 == 2) {
                acci.push(i);
                accm.push("cp");
                accv.push(Math.floor(view[i] / 100));
            }
        }

        result["acci"] = acci.join(';');
        result["accm"] = accm.join(';');
        result["accv"] = accv.join(';');

        if (lines.multiLines.ids.length > 0) {
            result["slm_lmi"] = lines.multiLines.ids.join();
            result["slm_lmv"] = lines.multiLines.vals.join();
        }
        result["slm_mp"] = acci.join();
        result["slm_mv"] = accv.join();

        var stf = []; ``

        if (player.machine.respinNewWildList.length > 0) {
            var e = [];

            player.machine.respinNewWildList.forEach(function (item) {
                e.push(player.machine.respinMask[item] + "~2~" + item);
            });

            stf.push("e:" + e.join(';'));
        }

        if (player.machine.respinPrevWildList.length > 0) {
            var s = [];

            player.machine.respinPrevWildList.forEach(function (item) {
                if (player.machine.respinNewWildList.indexOf(item) < 0) {
                    s.push(player.machine.respinMask[item] + "~2~" + item);
                } else {
                    s.push("2~2~" + item);
                }
            });

            stf.push("s:" + s.join(';'));
        }
        result["stf"] = stf.join();
        result["tw"] = player.machine.respinWinMoney;
    }

    if (player.machine.respinStatus == "RESPIN") {            //                                
        result["is"] = player.machine.respinMask;
        result["na"] = "s";
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = player.machine.respinIndex;
        result["rs"] = "mc";
        result["trail"] = "d~" + player.machine.respinCompass.pos + player.machine.respinCompass.dir;
    }

    if (player.machine.prevRespinStatus == "RESPIN" && player.machine.respinStatus == "NORESPIN") {   //                      
        result["na"] = "c";
        result["rs_t"] = player.machine.respinIndex;
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
        counter: "2"
    };
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

module.exports = ApiManager;