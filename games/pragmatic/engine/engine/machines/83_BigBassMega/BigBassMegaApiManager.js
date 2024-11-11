
var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "13,10,6,12,6,13,4,8,10,8,3,10,6,9,11,9,6,9,5,8,3,8,3,10,4,13,12,9,5,11,13,13,11,13,4,12,13,13,13,13,13,9",
        balance: "0.00",
        nas: "13",
        cfgs: "5517",
        ver: "2",
        mo_s: "7",
        index: "1",
        balance_cash: "0.00",
        mo_v: "40,100,200,300,400,500,1000,80000",
        reel_set_size: "10",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0,0~0,0,0,0,0,0~1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{regular:\"94.62\"},props:{nas:\"13\",max_rnd_sim:\"1\",max_rnd_hr:\"1313543\",max_rnd_win:\"4000\"}}",
        wl_i: "tbm~4000",
        stime: "1646036637254",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "7",
        wilds: "2~0,0,0,0,0,0~1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        st: "rect",
        c: "100.00",
        sw: "6",
        sver: "5",
        g: "{reg:{def_s:\"4,8,10,8,3,10,6,9,11,9,6,9,5,8,3,8,3,10,4,13,12,9,5,11,13,13,11,13,4,12,13,13,13,13,13,9\",def_sa:\"3,8,11,12,6,9\",def_sb:\"4,9,8,9,3,12\",reel_set:\"0\",s:\"4,8,10,8,3,10,6,9,11,9,6,9,5,8,3,8,3,10,4,13,12,9,5,11,13,13,11,13,4,12,13,13,13,13,13,9\",sa:\"3,8,11,12,6,9\",sb:\"4,9,8,9,3,12\",sh:\"6\",st:\"rect\",sw:\"6\"},top:{def_s:\"6,12,6,10\",def_sa:\"8\",def_sb:\"5\",reel_set:\"1\",s:\"6,12,6,10\",sa:\"8\",sb:\"5\",sh:\"4\",st:\"rect\",sw:\"1\"}}",
        counter: "2",
        paytable: "0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;1000,500,200,100,40,0;150,50,40,20,0,0;40,30,20,5,0,0;40,15,10,5,0,0;35,12,8,4,0,0;35,12,8,4,0,0;20,12,5,4,0,0;20,10,5,3,0,0;18,10,5,3,0,0;16,8,4,2,0,0;0,0,0,0,0,0;0,0,0,0,0,0",
        l: "20",
        reel_set0: "6,8,7,5,9,7,5,9,7,9,4,11,8,12,6,7,3,8,11,12,4,7,10,7,7,7,7,7,5,1,9,6,7,1,7,6,11,7,5,9,8,9,11,7,11,6,4,3,11,4,7,8,5,6,10~10,1,12,7,8,12,3,4,6,7,7,10,6,7,8,9,10,5,11,5,6,10,7,7,7,7,7,12,11,5,4,6,8,5,12,4,7,10,11,8,7,3,12,8,10,6,12,7,6,5,4,9~1,8,5,11,8,10,5,4,12,11,7,12,3,9,6,4,7,7,7,7,3,9,12,7,9,7,9,10,6,5,8,6,10,7,3,7,4,7,7,11~7,7,6,7,9,10,11,1,8,11,5,7,7,1,7,10,4,7,7,7,7,4,5,3,6,5,12,8,5,3,4,9,11,6,9,12,8,9,6,8,10~8,6,7,9,11,6,11,12,4,7,4,6,4,9,6,7,5,12,4,1,5,7,8,12,7,7,7,7,1,11,7,9,5,10,7,7,3,9,3,10,5,9,8,6,10,11,8,10,5,12,7,7,6,7~11,12,9,6,8,3,5,7,8,7,5,12,9,3,7,4,10,9,7,1,7,7,7,7,12,9,7,6,4,1,6,7,11,8,5,7,6,7,9,6,10,5,4",
        s: "13,10,6,12,6,13,4,8,10,8,3,10,6,9,11,9,6,9,5,8,3,8,3,10,4,13,12,9,5,11,13,13,11,13,4,12,13,13,13,13,13,9",
        accInit: "[{id:0,mask:\"cp;mp\"},{id:1,mask:\"cp;mp\"}]",
        reel_set2: "11,7,5,7,9,5,11,7,9,7,7,7,7,7,1,7,3,11,7,11,1,3,5,7,1,9,7,11,9~10,12,8,4,12,6,8,4,10,6,8,6,12,4,10,6,12,10,12,6,4,10,6,8~10,8,3,1,10,7,7,9,3,5,1,6,5,10,8,10,3,6,11,7,11,7,7,7,7,9,4,12,7,7,6,4,9,12,8,7,6,7,7,1,11,4,5,9,5,6,8,12,9,10~7,5,11,7,12,4,8,4,6,10,7,12,9,8,7,7,7,7,4,7,11,5,3,9,6,7,11,8,6,10,6,3,10,9~9,7,12,11,6,7,8,7,6,12,5,3,9,5,3,10,9,11,12,9,10,4,8,5,11,6,7,7,7,7,4,7,8,5,12,8,10,7,7,9,6,7,7,8,7,6,5,6,7,4,11,10,12,9,3,7,4,11~12,5,9,3,11,10,5,6,9,5,11,8,12,7,7,4,7,7,7,7,11,10,6,7,8,7,7,6,3,4,10,12,8,9,7,4,9,8,7,6",
        t: "243",
        reel_set1: "8,11,12,5,11,12,11,5,11,10,6,11,12,7,5,6,3,3,3,9,4,2,11,9,8,11,11,4,12,12,8,5,6,7,10,9,7,10,10,10,5,3,10,4,11,11,3,5,10,8,8,3,12,7,4,12,11,6,8,8,8,3,8,7,4,12,11,8,6,8,12,12,11,10,4,9,4,5,7,7,7,12,6,11,6,9,9,10,10,4,12,11,11,12,11,11,12,6,12,11,11,11,10,8,2,7,7,11,5,2,11,9,3,9,12,7,2,3,7,10,12",
        reel_set4: "8,12,10,8,10,4,6,10,6,10,8,6,12,6,4,8~9,7,9,11,5,7,11,7,7,3,7,7,7,7,7,5,7,7,9,3,1,11,7,5,7,11,1~7,8,4,7,4,5,7,10,8,11,9,6,4,5,7,12,10,3,7,10,7,7,7,7,6,7,5,8,12,3,6,9,7,7,9,10,11,6,11,10,6,12,3,11,9,8~8,7,1,11,8,4,9,6,7,9,6,7,8,9,7,1,7,6,10,7,11,12,7,7,7,7,6,12,6,3,4,11,6,12,8,9,3,1,10,5,7,5,4,10,5,9,5,4,9~9,10,9,12,6,5,6,7,3,4,3,9,10,7,4,5,7,9,11,7,9,6,5,12,7,7,7,7,6,8,9,8,4,8,12,6,11,7,10,5,12,7,5,6,7,11,10,7,8,4,7,7,11~9,11,7,10,4,7,7,9,6,7,9,8,7,6,9,10,12,5,9,3,8,4,5,7,7,7,7,11,9,11,6,7,7,6,8,6,3,5,10,7,4,11,8,12,6,5,7,12,5,10,7",
        reel_set3: "4,6,8,10,12,10,6,4,12,10,12,12,12,6,10,6,12,10,4,8,12,12,4,6,8,10,10,10,8,12,12,6,12,6,12,12,10,12,8,4,8,8,8,12,12,10,12,10,8,4,8,4,10,12,8,8",
        reel_set6: "7,9,11,7,7,3,11,9,7,7,7,7,7,9,5,7,5,11,7,7,11,5,7~8,6,12,8,10,12,6,4,8,6,8,10,12,4,6,10~5,3,10,9,4,9,6,3,4,11,10,12,7,10,5,6,7,12,7,7,7,7,5,10,11,7,4,3,8,11,9,7,6,8,12,6,7,3,5,7,12,7,10,7,8,6~4,8,12,9,7,5,6,9,8,6,10,6,7,7,7,7,4,7,1,8,7,10,11,1,9,7,3,5,12,7,11,5~4,7,8,10,9,10,7,8,11,12,11,1,6,7,4,6,1,12,6,12,7,7,7,7,5,3,5,1,10,4,9,8,6,7,11,9,10,6,7,3,5,7,9,7,5,12~9,7,5,7,6,7,5,9,4,7,12,6,12,9,4,8,10,6,7,7,7,7,9,8,5,7,8,3,11,9,11,4,5,10,3,10,8,7,7,12,6",
        reel_set5: "11,9,11,3,7,5,5,7,11,11,9,11,3,3,3,5,9,11,7,11,11,3,9,11,5,5,9,7,7,7,9,9,11,11,7,9,11,3,11,11,7,11,3,11,11,11,5,11,7,11,7,5,11,11,7,7,3,11,5,11,3",
        reel_set8: "9,8,6,7,10,10,3,10,4,8,10,12,9,5,9,11,12,5,6,9,12,7,10,10,14,3,8,9,11,5,7,8,11,7,11,7,10,9,12,4,10,11,7,9~11,7,4,8,10,10,12,11,8,11,10,3,7,6,11,9,3,10,11,4,6,8,12,14,12,5,7,10~8,7,4,12,10,8,8,4,5,12,14,12,3,6,11,7,9,9,6,5,10,11,7,12,11,3,10,11,5~11,7,8,9,11,4,10,12,6,12,12,12,4,7,6,9,5,3,11,12,12,10,9,10,11,11,11,8,8,5,12,5,10,11,14,6,3,11,7~10,11,6,10,9,11,5,11,12,9,9,12,12,12,12,8,3,8,7,9,14,4,4,12,9,7,6,9,9,9,10,11,11,12,12,11,3,12,7,12,5,11,11,11,4,8,6,7,12,5,11,11,10,12,5,10,12~5,7,14,10,6,7,11,11,5,6,6,6,8,10,6,11,12,9,11,7,7,11,9,9,9,4,4,12,3,9,5,14,12,11,4,3,11,11,11,6,10,11,12,8,9,12,11,6,10",
        reel_set7: "10,6,8,12,4,12,12,6,4,8,10,12,12,12,4,10,10,8,6,12,6,4,8,8,10,10,10,12,10,8,4,12,12,10,12,6,12,8,6,8,8,8,12,4,12,4,12,6,8,12,8,10,12,10,12",
        reel_set9: "9,7,11,3,8,9,11,6,11,2,2,9,8,5,11,10,11,12,8,12,2,3,3,3,8,9,11,8,4,6,2,4,5,9,8,7,4,5,10,12,10,9,11,6,2,12,10,10,10,2,11,11,12,12,10,11,4,10,11,10,7,6,8,8,10,12,12,2,11,11,2,12,8,8,8,3,11,2,9,12,3,9,12,11,8,11,6,2,11,12,7,3,11,7,14,10,12,7,7,7,10,7,12,7,5,3,5,8,12,2,12,11,10,11,7,6,10,12,11,4,9,4,11,11,11,14,12,8,8,4,11,7,10,4,11,5,5,4,2,6,11,10,2,12,12,2,9,8,11",
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
        balance_bonus: 0,
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: param.l,
        sh: 7,
        st: "rect",
        stime: new Date().getTime(),
        sver: 5,
        sw: 6
    };

    if (player.machine.prevGameMode == "BASE") {

        if (player.machine.currentGame == "BASE") {

            if (player.machine.prevTumbleStatus == "NOTUMBLE") {

                if (player.machine.tumbleStatus == "TUMBLE") {

                    var gObj = {
                        reg: {
                            reel_set: 0,
                            s: player.machine.boxView,
                            sa: player.machine.boxVirtualRow.above,
                            sb: player.machine.boxVirtualRow.below,
                            sh: 6,
                            st: "rect",
                            sw: 6,
                        },
                        top: {
                            reel_set: 1,
                            s: player.machine.reverseTopView,
                            sa: player.machine.topVirtualSymbol.right,
                            sb: player.machine.topVirtualSymbol.left,
                            sh: 4,
                            st: "rect",
                        }
                    }

                    if (player.machine.boxTumbleStr.length > 0) {
                        gObj.reg.tmb = player.machine.boxTumbleStr;
                    }

                    if (player.machine.topTumbleStr.length > 0) {
                        gObj.top.tmb = player.machine.topTumbleStr;
                    }

                    result["g"] = JSON.stringify(gObj);

                    if (player.machine.moneyValueList.length > 0) {

                        result["mo_t"] = player.machine.moneySignalList;
                        result["mo"] = player.machine.moneyValueList;
                    }

                    result["na"] = "s";
                    result["rs_c"] = 1;
                    result["rs_m"] = 1;
                    result["rs_p"] = 0;
                    result["rs"] = "mc";
                    result["s"] = player.machine.combineView.join();
                    result["tmb_win"] = player.machine.tmb_res;
                    result["tw"] = player.machine.tmb_res;
                    result["w"] = player.machine.winMoney;
                    result["wlc_v"] = player.machine.winLinesStr;

                } else if (player.machine.tumbleStatus == "NOTUMBLE") {

                    result["g"] = `{reg:{reel_set:"2",s:"${player.machine.boxView.join()}",sa:"${player.machine.boxVirtualRow.above.join()}",sb:"${player.machine.boxVirtualRow.below.join()}",sh:"6",st:"rect",sw:"6"},top:{reel_set:"3",s:"${player.machine.reverseTopView.join()}",sa:"${player.machine.topVirtualSymbol.right}",sb:"${player.machine.topVirtualSymbol.left}",sh:"4",st:"rect",sw:"1"}}`;

                    if (player.machine.moneyValueList.length > 0) {

                        result["mo_t"] = player.machine.moneySignalList;
                        result["mo"] = player.machine.moneyValueList;
                    }

                    result["na"] = "s";
                    result["s"] = player.machine.combineView.join();
                    result["tw"] = player.machine.tmb_res;
                    result["w"] = player.machine.winMoney;
                }

            } else if (player.machine.prevTumbleStatus == "TUMBLE") {

                if (player.machine.tumbleStatus == "NOTUMBLE") {

                    var gObj = {
                        reg: {
                            reel_set: 0,
                            s: player.machine.boxView,
                            sa: player.machine.boxVirtualRow.above,
                            sb: player.machine.boxVirtualRow.below,
                            sh: 6,
                            st: "rect",
                            sw: 6,
                        },
                        top: {
                            reel_set: 1,
                            s: player.machine.reverseTopView,
                            sa: player.machine.topVirtualSymbol.right,
                            sb: player.machine.topVirtualSymbol.left,
                            sh: 4,
                            st: "rect",
                        }
                    }

                    if (player.machine.boxTumbleStr.length > 0) {
                        gObj.reg.tmb = player.machine.boxTumbleStr;
                    }

                    if (player.machine.topTumbleStr.length > 0) {
                        gObj.top.tmb = player.machine.topTumbleStr;
                    }

                    result["g"] = JSON.stringify(gObj);

                    if (player.machine.moneyValueList.length > 0) {

                        result["mo_t"] = player.machine.moneySignalList;
                        result["mo"] = player.machine.moneyValueList;
                    }

                    if (player.machine.tmb_res > 0) {

                        result["na"] = "c";
                    } else {

                        result["na"] = "s";
                    }

                    result["rs_t"] = player.machine.tumbleIndex;
                    result["tmb_res"] = player.machine.tmb_res;
                    result["tmb_win"] = player.machine.tmb_res;
                    result["tw"] = player.machine.tmb_res;
                    result["w"] = 0;

                } else if (player.machine.tumbleStatus == "TUMBLE") {

                    var gObj = {
                        reg: {
                            reel_set: 0,
                            s: player.machine.boxView,
                            sa: player.machine.boxVirtualRow.above,
                            sb: player.machine.boxVirtualRow.below,
                            sh: 6,
                            st: "rect",
                            sw: 6,
                        },
                        top: {
                            reel_set: 1,
                            s: player.machine.reverseTopView,
                            sa: player.machine.topVirtualSymbol.right,
                            sb: player.machine.topVirtualSymbol.left,
                            sh: 4,
                            st: "rect",
                        }
                    }

                    if (player.machine.boxTumbleStr.length > 0) {
                        gObj.reg.tmb = player.machine.boxTumbleStr;
                    }

                    if (player.machine.topTumbleStr.length > 0) {
                        gObj.top.tmb = player.machine.topTumbleStr;
                    }

                    result["g"] = JSON.stringify(gObj);

                    if (player.machine.moneyValueList.length > 0) {

                        result["mo_t"] = player.machine.moneySignalList;
                        result["mo"] = player.machine.moneyValueList;
                    }

                    result["na"] = "s";
                    result["rs_c"] = 1;
                    result["rs_m"] = 1;
                    result["rs_p"] = player.machine.tumbleIndex;
                    result["rs"] = "mc";
                    result["s"] = player.machine.combineView.join();
                    result["tmb_win"] = player.machine.tmb_res;
                    result["tw"] = player.machine.tmb_res;
                    result["w"] = player.machine.winMoney;
                    result["wlc_v"] = player.machine.winLinesStr;
                }
            }

        } else if (player.machine.currentGame == "FREE") {

            result["acci"] = "0:1";
            result["accm"] = "cp~mp;cp~mp";
            result["accv"] = "0~12;1~4";
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
            result["g"] = `{reg:{reel_set:"0",s:"${player.machine.boxView.join()}",sa:"${player.machine.boxVirtualRow.above.join()}",sb:"${player.machine.boxVirtualRow.below.join()}",sh:"6",st:"rect",sw:"6"},top:{reel_set:"1",s:"${player.machine.reverseTopView.join()}",sa:"${player.machine.topVirtualSymbol.right}",sb:"${player.machine.topVirtualSymbol.left}",sh:"4",st:"rect",sw:"1"}}`;

            if (player.machine.moneyValueList.length > 0) {

                result["mo_t"] = player.machine.moneySignalList;
                result["mo"] = player.machine.moneyValueList;
            }

            result["na"] = "s";
            result["s"] = player.machine.combineView.join();
            result["tw"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.winMoney;
        }

    } else if (player.machine.prevGameMode == "FREE") {

        if (player.machine.currentGame == "FREE") {

            if (player.machine.prevTumbleStatus == "NOTUMBLE") {

                if (player.machine.tumbleStatus == "NOTUMBLE") {

                    result["acci"] = "0:1";
                    result["accm"] = "cp~mp;cp~mp";
                    result["accv"] = `${player.machine.freeSpinFishermanCnt}~12;${player.machine.freeSpinLevel}~4`;
                    result["fs"] = player.machine.freeSpinIndex + 1;
                    result["fsmax"] = player.machine.freeSpinLength;
                    if (player.machine.freeSpinMore > 0) {

                        result["fsmore"] = player.machine.freeSpinMore;
                    }
                    result["fsmul"] = 1;
                    result["fsres"] = player.machine.freeSpinWinMoney;
                    result["fswin"] = player.machine.freeSpinWinMoney;
                    result["g"] = `{reg:{reel_set:"8",s:"${player.machine.boxView.join()}",sa:"${player.machine.boxVirtualRow.above.join()}",sb:"${player.machine.boxVirtualRow.below.join()}",sh:"6",st:"rect",sw:"6"},top:{reel_set:"9",s:"${player.machine.reverseTopView.join()}",sa:"${player.machine.topVirtualSymbol.right}",sb:"${player.machine.topVirtualSymbol.left}",sh:"4",st:"rect",sw:"1"}}`;

                    if (player.machine.freeSpinMulti > 1) {

                        result["gwm"] = player.machine.freeSpinMulti;
                    }

                    if (player.machine.moneyValueList.length > 0) {

                        result["mo_t"] = player.machine.moneySignalList;
                        result["mo"] = player.machine.moneyValueList;
                    }

                    if (player.machine.freeSpinCollectMoney > 0) {

                        result["mo_c"] = 1;
                        if (player.machine.freeSpinMulti > 1) {

                            result["mo_m"] = player.machine.freeSpinMulti;
                        }
                        result["mo_tv"] = player.machine.freeSpinCollectMulti;
                        result["mo_tw"] = player.machine.freeSpinCollectMoney;
                        result["mo_wpos"] = player.machine.freeSpinCollectPositions.join();
                    }

                    result["na"] = "s";
                    result["s"] = player.machine.combineView.join();
                    result["tw"] = player.machine.freeSpinWinMoney;
                    result["w"] = player.machine.winMoney;
                    result["wmt"] = "pr2";
                    result["wmv"] = player.machine.freeSpinMulti;

                } else if (player.machine.tumbleStatus == "TUMBLE") {

                    result["acci"] = "0:1";
                    result["accm"] = "cp~mp;cp~mp";
                    result["accv"] = `${player.machine.freeSpinFishermanCnt}~12;${player.machine.freeSpinLevel}~4`;
                    result["fs"] = player.machine.freeSpinIndex + 1;
                    result["fsmax"] = player.machine.freeSpinLength;
                    result["fsmul"] = 1;
                    result["fsres"] = player.machine.freeSpinWinMoney;
                    result["fswin"] = player.machine.freeSpinWinMoney;

                    var gObj = {
                        reg: {
                            reel_set: 8,
                            s: player.machine.boxView,
                            sa: player.machine.boxVirtualRow.above,
                            sb: player.machine.boxVirtualRow.below,
                            sh: 6,
                            st: "rect",
                            sw: 6,
                        },
                        top: {
                            reel_set: 9,
                            s: player.machine.reverseTopView,
                            sa: player.machine.topVirtualSymbol.right,
                            sb: player.machine.topVirtualSymbol.left,
                            sh: 4,
                            st: "rect",
                        }
                    }

                    if (player.machine.boxTumbleStr.length > 0) {
                        gObj.reg.tmb = player.machine.boxTumbleStr;
                    }

                    if (player.machine.topTumbleStr.length > 0) {
                        gObj.top.tmb = player.machine.topTumbleStr;
                    }

                    result["g"] = JSON.stringify(gObj);

                    if (player.machine.freeSpinMulti > 1) {

                        result["gwm"] = player.machine.freeSpinMulti;
                    }

                    if (player.machine.moneyValueList.length > 0) {

                        result["mo_t"] = player.machine.moneySignalList;
                        result["mo"] = player.machine.moneyValueList;
                    }

                    result["na"] = "s";
                    result["s"] = player.machine.combineView.join();

                    result["rs_c"] = 1;
                    result["rs_m"] = 1;
                    result["rs_p"] = 0;
                    result["rs"] = "mc";

                    result["tmb_win"] = player.machine.tmb_res;
                    result["tmb_res"] = player.machine.tmb_res;
                    result["tw"] = player.machine.freeSpinWinMoney;
                    result["w"] = player.machine.winMoney;
                    result["wlc_v"] = player.machine.winLinesStr;
                    result["wmt"] = "pr2";
                    result["wmv"] = player.machine.freeSpinMulti;

                }

            } else if (player.machine.prevTumbleStatus == "TUMBLE") {

                if (player.machine.tumbleStatus == "NOTUMBLE") {

                    result["acci"] = "0:1";
                    result["accm"] = "cp~mp;cp~mp";
                    result["accv"] = `${player.machine.freeSpinFishermanCnt}~12;${player.machine.freeSpinLevel}~4`;

                    result["fs"] = player.machine.freeSpinIndex + 1;
                    result["fsmax"] = player.machine.freeSpinLength;
                    if (player.machine.freeSpinMore > 0) {

                        result["fsmore"] = player.machine.freeSpinMore;
                    }
                    result["fsmul"] = 1;
                    result["fsres"] = player.machine.freeSpinWinMoney;
                    result["fswin"] = player.machine.freeSpinWinMoney;

                    result["g"] = `{reg:{reel_set:"8",s:"${player.machine.boxView.join()}",sa:"${player.machine.boxVirtualRow.above.join()}",sb:"${player.machine.boxVirtualRow.below.join()}",sh:"6",st:"rect",sw:"6"},top:{reel_set:"9",s:"${player.machine.reverseTopView.join()}",sa:"${player.machine.topVirtualSymbol.right}",sb:"${player.machine.topVirtualSymbol.left}",sh:"4",st:"rect",sw:"1"}}`;

                    if (player.machine.freeSpinMulti > 1) {

                        result["gwm"] = player.machine.freeSpinMulti;
                    }

                    if (player.machine.moneyValueList.length > 0) {

                        result["mo_t"] = player.machine.moneySignalList;
                        result["mo"] = player.machine.moneyValueList;
                    }

                    if (player.machine.freeSpinCollectMoney > 0) {

                        result["mo_c"] = 1;
                        if (player.machine.freeSpinMulti > 1) {

                            result["mo_m"] = player.machine.freeSpinMulti;
                        }
                        result["mo_tv"] = player.machine.freeSpinCollectMulti;
                        result["mo_tw"] = player.machine.freeSpinCollectMoney;
                        result["mo_wpos"] = player.machine.freeSpinCollectPositions;
                    }

                    result["na"] = "s";
                    result["rs_t"] = player.machine.tumbleIndex;
                    result["s"] = player.machine.combineView.join();
                    result["tmb_win"] = player.machine.tmb_res;
                    result["tmb_res"] = player.machine.tmb_res;
                    result["tw"] = player.machine.freeSpinWinMoney;
                    result["w"] = player.machine.winMoney;
                    result["wmt"] = "pr2";
                    result["wmv"] = player.machine.freeSpinMulti;

                } else if (player.machine.tumbleStatus == "TUMBLE") {

                    result["acci"] = "0:1";
                    result["accm"] = "cp~mp;cp~mp";
                    result["accv"] = `${player.machine.freeSpinFishermanCnt}~12;${player.machine.freeSpinLevel}~4`;
                    result["fs"] = player.machine.freeSpinIndex + 1;
                    result["fsmax"] = player.machine.freeSpinLength;
                    result["fsmul"] = 1;
                    result["fsres"] = player.machine.freeSpinWinMoney;
                    result["fswin"] = player.machine.freeSpinWinMoney;

                    var gObj = {
                        reg: {
                            reel_set: 8,
                            s: player.machine.boxView,
                            sa: player.machine.boxVirtualRow.above,
                            sb: player.machine.boxVirtualRow.below,
                            sh: 6,
                            st: "rect",
                            sw: 6,
                        },
                        top: {
                            reel_set: 9,
                            s: player.machine.reverseTopView,
                            sa: player.machine.topVirtualSymbol.right,
                            sb: player.machine.topVirtualSymbol.left,
                            sh: 4,
                            st: "rect",
                        }
                    }

                    if (player.machine.boxTumbleStr.length > 0) {
                        gObj.reg.tmb = player.machine.boxTumbleStr;
                    }

                    if (player.machine.topTumbleStr.length > 0) {
                        gObj.top.tmb = player.machine.topTumbleStr;
                    }

                    result["g"] = JSON.stringify(gObj);

                    if (player.machine.freeSpinMulti > 1) {

                        result["gwm"] = player.machine.freeSpinMulti;
                    }

                    if (player.machine.moneyValueList.length > 0) {

                        result["mo_t"] = player.machine.moneySignalList;
                        result["mo"] = player.machine.moneyValueList;
                    }

                    result["na"] = "s";
                    result["s"] = player.machine.combineView.join();

                    result["rs_c"] = 1;
                    result["rs_m"] = 1;
                    result["rs_p"] = player.machine.tumbleIndex;
                    result["rs"] = "mc";

                    result["tmb_win"] = player.machine.tmb_res;
                    result["tw"] = player.machine.freeSpinWinMoney;
                    result["w"] = player.machine.winMoney;
                    result["wlc_v"] = player.machine.winLinesStr;
                    result["wmt"] = "pr2";
                    result["wmv"] = player.machine.freeSpinMulti;
                }

            }

        } else if (player.machine.currentGame == "BASE") {

            result["acci"] = "0:1";
            result["accm"] = "cp~mp;cp~mp";
            result["accv"] = `${player.machine.freeSpinFishermanCnt}~12;${player.machine.freeSpinLevel}~4`;

            result["fs_total"] = player.machine.freeSpinIndex;
            result["fs_endtotal"] = 1;
            // if (player.machine.freeSpinMulti > 1) {

            result["fsmul_total"] = 1;
            // }
            result["fs_restotal"] = player.machine.freeSpinWinMoney;
            result["fs_wintotal"] = player.machine.freeSpinWinMoney;

            result["g"] = `{reg:{reel_set:"8",s:"${player.machine.boxView.join()}",sa:"${player.machine.boxVirtualRow.above.join()}",sb:"${player.machine.boxVirtualRow.below.join()}",sh:"6",st:"rect",sw:"6"},top:{reel_set:"9",s:"${player.machine.reverseTopView.join()}",sa:"${player.machine.topVirtualSymbol.right}",sb:"${player.machine.topVirtualSymbol.left}",sh:"4",st:"rect",sw:"1"}}`;

            if (player.machine.freeSpinMulti > 1) {

                result["gwm"] = player.machine.freeSpinMulti;
            }

            if (player.machine.moneyValueList.length > 0) {

                result["mo_t"] = player.machine.moneySignalList;
                result["mo"] = player.machine.moneyValueList;
            }

            if (player.machine.freeSpinCollectMoney > 0) {

                result["mo_c"] = 1;
                if (player.machine.freeSpinMulti > 1) {

                    result["mo_m"] = player.machine.freeSpinMulti;
                }
                result["mo_tv"] = player.machine.freeSpinCollectMulti;
                result["mo_tw"] = player.machine.freeSpinCollectMoney;
                result["mo_wpos"] = player.machine.freeSpinCollectPositions;
            }

            if (player.machine.freeSpinWinMoney > 0) {

                result["na"] = "c";

            } else {

                result["na"] = "s";

            }

            if (player.machine.prevTumbleStatus == "TUMBLE") {

                result["rs_t"] = player.machine.tumbleIndex;
            }

            result["s"] = player.machine.combineView.join();
            result["tw"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.winMoney;
            result["wmt"] = "pr2";
            result["wmv"] = player.machine.freeSpinMulti;
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