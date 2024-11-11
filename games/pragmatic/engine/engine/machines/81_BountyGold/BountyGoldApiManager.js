var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,10,2,3,10,6,7,8,4,7,4,10,4,5,11,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13",
        balance: "0.00",
        cfgs: "5467",
        accm: "cp~tp~lvl~sc",
        ver: "2",
        mo_s: "11;12",
        acci: "0",
        index: "1",
        balance_cash: "0.00",
        mo_v: "25,50,75,100,125,150,175,200,250,375,500,625,1250,1875,2500,6250;250,375,500,625,1250,2500",
        reel_set_size: "5",
        balance_bonus: "0.00",
        na: "s",
        accv: "0~6~0~0",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{regular:\"94.51\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"871840\",jp1:\"25\",max_rnd_win:\"5000\",jp3:\"500\",jp2:\"50\",jp4:\"5000\"}}",
        wl_i: "tbm~5000",
        stime: "1646036413716",
        sc: "10.00,20.00,30.00,40.00,50.00,80.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "12",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        st: "rect",
        c: "100.00",
        sw: "5",
        sver: "5",
        g: "{base:{def_s:\"3,10,2,3,10,6,7,8,4,7,4,10,4,5,11\",def_sa:\"4,7,5,2,11\",def_sb:\"6,7,2,4,7\",reel_set:\"0\",s:\"3,10,2,3,10,6,7,8,4,7,4,10,4,5,11\",sa:\"4,7,5,2,11\",sb:\"6,7,2,4,7\",sh:\"3\",st:\"rect\",sw:\"5\"},matrix_2:{def_s:\"13,13,13,13,13,13,13,13,13,13,13,13,13,13,13\",def_sa:\"13,13,13,13,13\",def_sb:\"13,13,13,13,13\",reel_set:\"2\",s:\"13,13,13,13,13,13,13,13,13,13,13,13,13,13,13\",sa:\"13,13,13,13,13\",sb:\"13,13,13,13,13\",sh:\"3\",st:\"rect\",sw:\"5\"},matrix_3:{def_s:\"13,13,13,13,13,13,13,13,13,13,13,13,13,13,13\",def_sa:\"13,13,13,13,13\",def_sb:\"13,13,13,13,13\",reel_set:\"3\",s:\"13,13,13,13,13,13,13,13,13,13,13,13,13,13,13\",sa:\"13,13,13,13,13\",sb:\"13,13,13,13,13\",sh:\"3\",st:\"rect\",sw:\"5\"},matrix_4:{def_s:\"13,13,13,13,13,13,13,13,13,13,13,13,13,13,13\",def_sa:\"13,13,13,13,13\",def_sb:\"13,13,13,13,13\",reel_set:\"4\",s:\"13,13,13,13,13,13,13,13,13,13,13,13,13,13,13\",sa:\"13,13,13,13,13\",sb:\"13,13,13,13,13\",sh:\"3\",st:\"rect\",sw:\"5\"}}",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,50,10,0,0;150,30,5,0,0;125,25,5,0,0;75,25,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        reel_set0: "7,8,6,8,5,6,4,8,10,9,7,10,11,10,3,6,8,9,11,9,4,9,4,7,3,10,6,7,5,6,11,6,7,10,9,11,10,4,5,7,5,4,7,4,10,9,10,6,8,5,10,9,10,5,8,6~10,4,8,4,6,10,3,5,4,10,11,7,9,7,6,2,2,2,2,2,6,8,4,9,2,8,5,2,11,3,9,3,4,5,10,9,5,10,11,11,11,2,2,9,3,7,9,7,8,3,4,7,2,8,11,6,9,8,2,11~8,7,3,8,9,6,5,8,2,5,4,3,10,8,2,2,2,6,8,7,3,9,2,6,9,4,7,10,2,4,4,11,11,11,6,7,11,11,6,9,5,8,2,10,3,2,9,8,5~11,2,5,9,10,8,5,8,6,2,8,7,5,7,11,6,10,8,2,2,2,2,2,7,9,11,7,8,7,2,7,8,7,11,6,7,10,3,4,8,9,11,11,11,6,5,4,5,10,9,7,3,7,9,4,6,3,9,11,4,3,9,4,3~5,11,10,2,6,7,3,9,7,5,8,9,2,3,2,2,2,2,11,4,9,10,8,4,10,6,9,3,5,3,6,10,7,10,11,11,11,7,6,2,3,4,8,6,5,2,7,4,10,5,8,4,6",
        s: "3,10,2,3,10,6,7,8,4,7,4,10,4,5,11,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13",
        accInit: "[{id:0,mask:\"cp;tp;lvl;sc;cl\"}]",
        reel_set2: "11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13",
        reel_set1: "11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13",
        reel_set4: "11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13",
        reel_set3: "11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13~11,13,11,13,13,13,11,11,13,11,13,13",
    };

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
        balance: player.balance,
        balance_cash: player.balance,
        balance_bonus: "0.00",
        index: param.index,
        counter: ++param.counter,
        sver: "5",
        sw: "5",
        sh: "12",
        st: "rect",
        reel_set: "0",
        stime: new Date().getTime(),
        c: player.betPerLine,
        l: player.machine.lineCount,
        s: player.machine.view.join(),
        mo_t: player.machine.moneySignals.join(),
        mo: player.machine.moneyValues.join(),
    };

    for (var i = 0; i < player.machine.winLines.length; i++) {

        result[`l${i}`] = player.machine.winLines[i];
    }

    var matrix1 = player.machine.view.slice(0, 15);
    var matrix2 = player.machine.view.slice(15, 15);
    var matrix3 = player.machine.view.slice(30, 15);
    var matrix4 = player.machine.view.slice(45, 15);

    if (player.machine.prevGameMode == "BASE") {

        if (player.machine.currentGame == "BASE") {

            result["acci"] = 0;
            result["accm"] = "cp~tp~lvl~sc";
            result["accv"] = "0~6~0~0";

            result["g"] = `{base:{reel_set:"0",s:"${matrix1.join()}",sa:"${player.machine.virtualReels.above.join()}",sb:"${player.machine.virtualReels.above.join()}",sh:"3",st:"rect",sw:"5"},matrix_2:{reel_set:"2",s:"${matrix2.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_3:{reel_set:"3",s:"${matrix3.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_4:{reel_set:"4",s:"${matrix4.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"}}`;

            if (player.machine.winMoney > 0) {

                result["na"] = "c";
            } else {

                result["na"] = "s";
            }

            result["w"] = player.machine.winMoney;
            result["tw"] = player.machine.winMoney;

        } else if (player.machine.currentGame == "BONUS") {

            result["acci"] = 0;
            result["accm"] = "cp~tp~lvl~sc~cl";
            result["accv"] = `0~${player.machine.targetMoneySymbolCount}~${player.machine.bonusLevel}~${player.machine.newMoneySymbolCount}~0`;
            result["g"] = `{base:{reel_set:"1",s:"${matrix1.join()}",sa:"${player.machine.virtualReels.above.join()}",sb:"${player.machine.virtualReels.below.join()}",sh:"3",st:"rect",sw:"5"},matrix_2:{reel_set:"2",s:"${matrix2.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_3:{reel_set:"3",s:"${matrix3.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_4:{reel_set:"4",s:"${matrix4.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"}}`;
            result["na"] = "s";
            result["rs_c"] = 1;
            result["rs_m"] = 3;
            result["rs_p"] = 0;
            result["rs"] = "mc";
            result["sts"] = player.machine.stickySymbols.join();

            var arryForSty = [];

            for (var i = 0; i < player.machine.stickyPositions.length; i++) {

                arryForSty.push(`${player.machine.stickyPositions[i]},${player.machine.stickyPositions[i]}`);
            }

            result["sty"] = arryForSty.join('~');
            result["w"] = player.machine.winMoney;
            result["tw"] = player.machine.winMoney;
        }

    } else if (player.machine.prevGameMode == "BONUS") {

        if (player.machine.currentGame == "BONUS") {

            result["acci"] = 0;

            if (player.machine.newTarget) {

                result["accm"] = "cp~tp~lvl~sc~cl";
                result["accv"] = `0~${player.machine.targetMoneySymbolCount}~${player.machine.bonusLevel}~${player.machine.newMoneySymbolCount}~${player.machine.prevBonusLevel}`;
            } else {

                result["accm"] = "cp~tp~lvl~sc";
                result["accv"] = `0~${player.machine.targetMoneySymbolCount}~${player.machine.bonusLevel}~${player.machine.newMoneySymbolCount}`;
            }

            result["g"] = `{base:{reel_set:"1",s:"${matrix1.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_2:{reel_set:"2",s:"${matrix2.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_3:{reel_set:"3",s:"${matrix3.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_4:{reel_set:"4",s:"${matrix4.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"}}`;
            result["na"] = "s";
            result["pw"] = player.machine.currentCollect;
            result["rs_c"] = player.machine.bonusSpinCounter;
            result["rs_m"] = 3;
            result["rs_p"] = player.machine.bonusSpinIndex;
            result["rs"] = "mc";
            result["sts"] = player.machine.stickySymbols.join();

            var arryForSty = [];

            for (var i = 0; i < player.machine.stickyPositions.length; i++) {

                arryForSty.push(`${player.machine.stickyPositions[i]},${player.machine.stickyPositions[i]}`);
            }

            result["sty"] = arryForSty.join('~');
            result["trail"] = `st_prv~${player.machine.stickyPositions.join()};is~${player.machine.viewBeforeBonus}`;
            result["w"] = 0;
            result["tw"] = player.machine.moneyBonusWin;

        } else if (player.machine.currentGame == "BASE") {

            result["acci"] = 0;
            result["accm"] = "cp~tp~lvl~sc";
            result["accv"] = `0~${player.machine.targetMoneySymbolCount}~${player.machine.bonusLevel}~${player.machine.newMoneySymbolCount}`;

            result["apv"] = player.machine.jackpotMultiAry.join();
            result["apwa"] = player.machine.jackpotMoneyAry.join();

            result["g"] = `{base:{reel_set:"1",s:"${matrix1.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_2:{reel_set:"2",s:"${matrix2.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_3:{reel_set:"3",s:"${matrix3.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"},matrix_4:{reel_set:"4",s:"${matrix4.join()}",sa:"13,13,13,13,13",sb:"13,13,13,13,13",sh:"3",st:"rect",sw:"5"}}`;

            if (player.machine.moneyBonusWin > 0) {

                result["na"] = "c";
            } else {

                result["na"] = "s";
            }
            result["rs_t"] = player.machine.bonusSpinIndex;
            result["sts"] = player.machine.stickySymbols.join();

            var arryForSty = [];

            for (var i = 0; i < player.machine.stickyPositions.length; i++) {

                arryForSty.push(`${player.machine.stickyPositions[i]},-1`);
            }

            result["sty"] = arryForSty.join('~');
            result["trail"] = `st_prv~${player.machine.stickyPositions.join()};is~${player.machine.viewBeforeBonus}`;
            result["w"] = player.machine.moneyBonusWin;
            result["tw"] = player.machine.moneyBonusWin;
        }
    }

    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        index: param.index,
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
    };

    return result;
}

module.exports = ApiManager;