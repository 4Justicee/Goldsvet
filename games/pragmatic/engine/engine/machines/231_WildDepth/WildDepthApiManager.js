var Util = require("../../../utils/slot_utils");

function ApiManager() {

}

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "12,11,9,12,13,13,12,13,9,12,9,11,11,10,11,13,13,9,9,10",
        balance: "100,000.00",
        cfgs: "1",
        accm: "cp",
        ver: "2",
        acci: "0",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "9,12,11,10,12",
        reel_set_size: "3",
        def_sa: "9,11,13,11,12",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        accv: "1",
        scatters: "1~100,15,2,0,0~12,9,6,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{regular:\"96.48\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"488281\",max_rnd_win:\"5000\"}}",
        wl_i: "tbm~5000",
        stime: "1648280671083",
        sa: "9,11,13,11,12",
        sb: "9,12,11,10,12",
        sc: "10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00",
        defc: "50.00",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "50.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;400,100,30,0,0;250,75,25,0,0;150,40,15,0,0;100,25,10,0,0;75,15,7,0,0;50,10,5,0,0;30,6,3,0,0;30,6,3,0,0;20,5,2,0,0;20,5,2,0,0;20,5,2,0,0",
        l: "40",
        reel_set0: "12,10,6,12,13,8,11,10,8,5,11,5,11,9,8,6,11,13,8,11,11,12,9,9,6,9,4,13,7,8,1,12,12,10,10,1,4,7,11,7,6,13,10,12,3,10,13,13,8,10,9,3,5,13,12,4,7~12,7,12,10,13,13,11,3,6,10,7,12,7,4,9,11,9,13,13,7,5,11,11,1,13,3,12,11,13,5,8,1,11,10,10,9,4,6,9,10,7,8,5,10,12,2,6,4,6,9,9,13,9,7,12,8,11,13,13,9,8,12,10,13,12,6,8,11,8,12,8,10,11,3~8,13,11,3,11,6,13,6,8,11,11,9,6,8,11,7,9,10,9,13,12,5,7,3,9,5,10,12,8,7,11,11,13,10,12,3,10,10,7,12,9,4,13,6,7,8,4,13,6,12,8,11,8,13,13,5,6,4,11,9,1,7,12,2,10,12,9,5,9,5,6,9,5,7,10,1,12,8,4,9,8,13,10,6,10,11,5,13,5,8,7,12~7,5,10,7,11,10,11,9,4,8,2,7,10,8,13,7,10,9,1,2,6,11,8,13,6,9,11,5,12,10,13,3,7,13,11,3,11,5,10,6,4,9,8,9,13,13,12,8,11,13,7,10,12,5,1,4,12,12,6,10,12,11,13~10,12,7,11,8,10,5,12,5,8,9,8,11,9,6,10,11,8,1,5,8,7,10,11,6,5,9,1,12,1,6,13,9,10,13,10,2,12,10,3,9,7,13,11,8,13,13,10,10,4,8,6,11,3,6,3,13,13,4,6,12,12,7,12,11,8,6,5,13,4,12,12,9,13,13,4,11,13,5,11,9,8,12,12,7,12,3,7,5,10,13,10,11,9,10,9,5,7,12,9,2,4,10,13,13,5,7,10,4,13,5,12,9,13,9,13,3,6,8,4,11,8,10,9,7,5,11,6,4,9,9,6,9,11,8,10,12,12,13,3,11,6,3,6,10,1,13,4,7,5,10,11,8,13,6,11,3,12,12,7,5,13,9,3,9",
        s: "12,11,9,12,13,13,12,13,9,12,9,11,11,10,11,13,13,9,9,10",
        accInit: "[{id:0,mask:\"cp;mp\"}]",
        reel_set2: "11,13,5,11,13,13,9,13,4,9,3,10,10,13,7,5,8,6,12,6,11,12,10,5,9,7,11,13,7,3,11,8,12,10,13,8,6,7,8,3,3,3,3,12,12,8,11,10,9,12,10,9,10,6,11,6,11,12,10,10,7,8,9,8,12,7,4,7,8,13,11,10,3,8,13,9,11,4,9,10,12,3,13,12,10,4~12,7,11,11,8,9,8,9,8,9,10,13,8,11,3,9,5,8,4,10,8,13,12,9,4,6,9,8,7,13,10,7,11,10,6,13,13,5,13,12,10,8,9,7,13,2,12,11,4,6,8,9,2,13,12,12,4,11,13,13,8,4,2,13,6,8,12,10,13,11,11,7,10,7,13,6,13,5,6,10,9,10,10,9,11,2,12,11,3,10,5,7,5,10,12,10,12,11,12,13,7,11,12,13,12,12,11,9,8,3,10,13,12,12,9,9,8,9,7,13,10,11,8,4,11,4,10,7,12,11,12,9,11,13,4,13,9,12,3,9,2~5,4,8,9,5,10,10,6,13,5,9,12,6,9,5,11,6,12,13,5,8,9,6,13,13,11,11,12,13,12,9,4,12,13,5,7,11,4,3,9,8,3,4,13,8,7,8,9,11,6,9,12,9,6,10,5,12,11,13,8,11,3,7,8,7,13,2,7,9,11,8,13,11,10,7,10,2,12,10,10,11,7,10~11,12,11,3,10,5,13,9,7,6,11,6,11,10,4,7,10,13,4,7,12,11,8,7,10,9,11,10,13,5,3,6,4,6,9,6,13,13,12,12,8,9,10,11,7,8,7,4,13,10,9,8,9,6,2,5,11,13,12,5,2,10,13,12,7,10~7,4,11,10,4,11,10,5,9,10,10,12,5,13,5,11,9,3,9,5,6,9,12,12,10,3,2,2,3,7,8,12,6,7,6,4,10,5,13,11,8,11,8,7,8,13,12,4,11,13,6,13,9,6,13,8,13,12,11,11,6,13,7,3,8,9,4",
        reel_set1: "12,8,11,1,8,13,13,10,13,9,11,8,7,12,11,12,10,3,11,9,11,12,6,12,7,13,12,8,11,7,13,9,3,3,3,3,10,8,4,5,3,7,6,13,10,11,8,10,4,6,13,9,9,4,9,3,7,11,10,10,5,10,8,5,12,6,11,13,12~4,2,5,3,12,12,11,1,9,5,10,9,11,6,13,2,7,9,13,12,10,12,5,8,6,3,2,10,8,11,10,11,7,11,12,13,7,9,9,8,13,4,11,13,8,6,9,13,8,13,8,13,9,10,8,9,4,12,12,13,6,7,10,7,11,12,12,10,6,13,10~3,11,12,13,11,3,8,9,12,7,6,5,11,9,6,3,9,10,11,12,1,13,2,10,10,2,8,6,9,5,8,5,7,10,13,5,10,9,12,5,13,4,8,7,13,8,4,11,7,8,7,9,6,9,11,8,7,13,10,4,12,6,13,11,6,11,9,12,12,13,10,5~4,10,8,2,6,13,9,8,13,10,7,3,9,12,9,13,11,6,11,11,13,3,5,13,9,11,11,9,7,10,6,11,5,3,13,12,7,8,5,13,11,11,6,13,4,2,12,10,8,7,10,13,12,10,7,5,4,8,6,12,10,6,10,13,10,11,10,8,9,8,4,5,12,7,12,1,11~8,4,7,9,10,10,5,3,6,10,10,9,5,2,7,11,5,13,8,11,4,13,5,13,13,6,13,5,9,13,13,6,12,11,4,11,3,7,12,6,12,13,7,9,3,12,8,11,11,9,10,9,8,9,12,2,11,8,9,6,10,5,3,7,12,3,13,8,9,7,11,4,13,11,5,12,7,6,1,10,8"
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
        acci: "0",
        accm: "cp",
        accv: "1",
        balance_bonus: "0",
        balance_cash: player.balance,
        balance: player.balance,
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "40",
        ls: "0",
        reel_set: "0",
        na: "s",
        stime: new Date().getTime(),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "4",
        sver: "5",
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
    if (player.machine.winMoney > 0) {
        result["na"] = "c";
    }
    if(player.machine.wildCache.length > 0){
        let slm_tv = [];
        for(let i = 0;i < player.machine.wildCache.length;i ++)
        {
            slm_tv.push(2);
        }
        for(let i = 0;i < player.machine.view.length;i ++){
            if(player.machine.prevView[i] != player.machine.view[i]){
                result["is"] = Util.view2String(player.machine.prevView);
                break;
            }
        }
        result["slm_mp"] = Util.view2String(player.machine.wildCache);
        result["slm_mv"] = Util.view2String(slm_tv);
        result["sts"] = slm_tv.join(`~`);
        result["sty"] = player.machine.wildSticky;
        if(winLines.length > 0){
            let slm_lmi = [];
            let slm_lmv = [];
            for (var i = 0; i < winLines.length; i++) {
                let arr = winLines[i].split(`~`);
                if(player.machine.wildCount[arr[0]] > 0){
                    slm_lmi.push(arr[0]);
                    slm_lmv.push(Math.pow(2, player.machine.wildCount[arr[0]]));
                }
            }
            if(slm_lmi.length > 0){
                result["slm_lmi"] = Util.view2String(slm_lmi);
                result["slm_lmv"] = Util.view2String(slm_lmv);
            }
        }
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result['na'] = 's';
            result['psym'] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
            result["fs"] = "1";
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = "1";
            result["fswin"] = "0.00";
            result["fsres"] = "0.00";
        }
    } else if (prevGameMode == "FREE") {
        //                      
        result["reel_set"] = player.machine.freeReelsNo+1;
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = "1";
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["wmt"] = "pr";
            result["wmv"] = "1";
            if(player.machine.freeSpinMore > 0){
                result["fsmore"] = player.machines.freeSpinMore;
            }else{
                if(player.machine.wildCache.length > 0){
                    result["rs_c"] = player.machine.freeSpinMulti;
                    result["accv"] = player.machine.freeSpinMulti;
                    result["rs_c"] = player.machine.freeSpinMulti;
                    result["rs_m"] = player.machine.freeSpinMulti;
                    result["rs_p"] = player.machine.freeSpinMulti-1;
                    result["rs"] = "mc";
                    result["wmv"] = player.machine.freeSpinMulti;
                    if(player.machine.freeSpinMoreLength > 0){
                        result["rs_more"] = "1";
                        result["gwm"] = player.machine.freeSpinMulti;
                        result["rs_win"] = player.machine.freeSpinWinMoney;
                    }
                }else if(player.machine.freeSpinMoreLength > 0){
                    result["accv"] = player.machine.freeSpinMulti;
                    result["wmv"] = player.machine.freeSpinMulti;
                    result["gwm"] = player.machine.freeSpinMulti;
                    result["rs_t"] = player.machine.freeSpinMulti-1;
                    result["rs_win"] = player.machine.freeSpinWinMoney;
                }
            }
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
        }
    }

    return result;
};

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