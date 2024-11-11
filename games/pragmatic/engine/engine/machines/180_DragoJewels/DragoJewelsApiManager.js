var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,9,10,8,6,3,9,10,8,6,3,9,10,8,6,3,9,10,8,6,3,20,20,20,6",
        balance: "100,000.00",
        cfgs: "1",
        nas: "20",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "3",
        def_sb: "10,7,9,11,8",
        def_sa: "11,4,9,7,5",
        reel_set: "0",
        bonusInit: "[{bgid:0,bgt:45,bg_i:\"13,16,17,15,18\",bg_i_mask:\"r,wd,ms,fs,m\"}]",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: "{rtps:{purchase:\"96.50\",regular:\"96.50\"},props:{max_rnd_sim:\"1\",max_rnd_hr:\"20000000\",max_rnd_win:\"10000\"}}",
        stime: "1646975051340",
        sa: "11,4,9,7,5",
        sb: "10,7,9,11,8",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "5",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;19~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;200,50,25,0,0;100,40,20,0,0;50,25,15,0,0;40,20,10,0,0;20,10,8,0,0;15,8,6,0,0;10,8,6,0,0;10,6,4,0,0;10,6,4,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.50",
        total_bet_max: "10,000,000.00",
        reel_set0: "9,10,11,3,3,3,3,9,10,8,6,10,4,9,8,5,9,10,8,4,10,9,6,11,4,10,9,3,6,9,4,10,4,11,9,7,5,8,9,10,6,3,10~5,9,8,5,7,9,5,8,9,6,7,11,8,2,11,8,7,9,11,7,7,6,8,9,5,11,6,9,8,11,7,8,5,6,10,6,9,5,9,8,5,7,11,5,8,9,6,7,11,8,7,11,8,11,9,11,7,7,6,8,9,5,11,6,9,7,11,3,4,5,6,11,6,9,5,9,8,5,7,9,5,8,9,6,7,11,8,3,11,8,7,9,11,7,7,6,8,9,5,11,6,9,8,11,7,8,5,6,10,6,9,5,9,8,5,7,11,5,8,9,6,7,11,8,7,11,8,11,9,11,7,7,6,8,9,5,11,6,9,7,11,3,4,5,6,11,6,9~7,11,8,6,11,10,5,7,3,11,4,7,11,3,4,5,4,10,11,3,8,10,4,8,5,10,7,2,10,7,11,5,10,4,7,10,8,7,11,8,6,11,10,5,7,8,11,4,7,11,3,4,5,4,11,11,3,8,10,4,8,5,10,7,9,10,7,11,8,10,4,7,10,8~11,10,7,6,10,11,6,9,3,3,3,3,9,7,4,9,7,6,7,4,11,6,10,2,8,7,3,4,5,6,11,2,10,7,10,6,9,2,9,7,4,6,11,10,7,6,10,11,6,9,7,11,3,10,9,7,4,9,7,6,7,4,11,6,10,9,8,7,3,4,5,6,11,10~6,10,11,3,3,3,3,9,10,7,11,10,5,8,6,10,9,4,8,5,9,10,8,9,6,7,8,3,3,9,8,5,10,9,7,8,9,6,10,5,8,4,7,11,4,8,10,5,7,6,9,7,5,11,6,7,4,8,11,7,5,9,11,10",
        s: "3,9,10,8,6,3,9,10,8,6,3,9,10,8,6,3,9,10,8,6,3,20,20,20,6",
        reel_set2: "10,11,3,3,3,3,10,6,10,4,6,10,4,11,6,11,4,10,11,6,4,10,4,11,5,11,10,6,11~5,9,8,5,7,11,5,8,9,6,7,11,8,11,8,11,9,11,7,7,6,9,5,11,6,9,11,5,6,6~7,8,10,7,8,4,7,3,4,4,9,3,8,10,4,8,10,7,10,7,8,10,4,7,10~11,10,7,6,10,11,5,8,7,11,3,10,9,7,4,9,7,6,7,4,11,6,10,2,8,7,3,4,5,6,11,2,10,7,10,6,9,10,9,7,4~6,10,9,3,3,3,3,9,10,7,8,10,5,8,6,10,9,4,8,5,9,10,8,9,6,7,8,11,10,9,8,5,10,9,7,8,9,6,10,5,8,4,7,10,4,8,10,5,7,6,9,7,5,10,6,7,4,8,11,7,5,9,11",
        t: "243",
        reel_set1: "9,11,3,3,3,3,10,4,8,9,11,11,6,6,4,10,4,11,7,9,6,11,5~8,5,7,5,8,11,8,2,11,8,11,7,9,5,6,11,11,7,4,6,10,8,7,6,5,11,5,8,6,8,11,9,11,5,7,10,9,5,6,9,7,11,3,6,8,9,8,7,9,6~7,10,7,8,7,11,5,9,7,10,10,10,7,8,2,7,5,11,8,5,11,8,11,10,5,8,4,11,3,4,6,10,11,7,8,10,7,8,10,11,8,10,11,4,8,5,10~6,10,11,11,9,10,9,7,4,9,4,11,6,7,4,5,11,7,2,9,9,4,8,9,10,11,5,7,11,9,10,9,7,8,6,6,11,3,6,11,10,10,8,9~10,3,3,3,3,9,5,8,9,5,9,10,8,9,6,7,8,10,10,5,10,7,8,5,8,4,8,7,9,5,7,5,9,11",
        purInit: "[{type:\"wbg\",bet:2000,game_ids:[0]}]",
        total_bet_min: "200.00"
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
        balance: "100,116.81",
        index: "10",
        balance_cash: "100,116.81",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "11,9,6,9,4",
        sb: "7,3,9,8,10",
        sh: "5",
        c: player.betPerLine,
        sver: "5",
        counter: "20",
        l: "20",
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    //                                 
    var winLines = player.machine.winLines;
    result["wlc_v"] = winLines.join(";");

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

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "BONUS") {
            result["bgid"] = 0,
                result["bgt"] = 45,
                result["bw"] = 1,
                result["end"] = 0,

                result["is"] = player.machine.isView.join();
            result["s"] = player.machine.view.join();

            result["mo_t"] = player.machine.bonusMo_T.join();
            result["mo"] = player.machine.bonusMo.join();

            result["puri"] = 0;
            result["purtr"] = 1;
            result["reel_set"] = 2;

            result["rs_s"] = player.machine.rs_s.join();
            result["rsb_c"] = 0;
            result["rsb_m"] = 3;
            result["rsb_p"] = 0;
            result["rsb_w_mask"] = "wd,ms,fs,m";
            result["rsb_w"] = "0,0,0,1";
            result["na"] = "b";
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {

            result["trail"] = `ms~${player.machine.freespinRwd[0]};wd~${player.machine.freespinRwd[1]};fs~${player.machine.freespinRwd[2]};m~${player.machine.freespinRwd[3]}`;

            if (player.machine.wildStickStr.wildPos != "") {
                result["sty"] = player.machine.wildStickStr.wildPos;
            }

            if (player.machine.freeSpinIndex + 1 == 1 && player.machine.rwd != "") {
                result["rwd"] = player.machine.rwd;
            }

            if (player.machine.freeSpinIndex > 2 && player.machine.misteryStr.length > 0) {
                // this.misterySymbol = misterySym.sym;
                // this.misteryStr = misterySym.misteryPos;
                result["srf"] = `12~${player.machine.misterySymbol}~${player.machine.misteryStr.join()}`;
            }

            result["puri"] = 0;
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex + 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["is"] = player.machine.isView.join();

        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["is"] = player.machine.isView.join();
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;

            if (player.machine.freeSpinIndex > 2 && player.machine.misteryStr.length > 0) {
                result["srf"] = `12~${player.machine.misterySymbol}~${player.machine.misteryStr.join()}`;
            }

            if (player.machine.wildStickStr.wildPos != "") {
                result["sty"] = player.machine.wildStickStr.wildPos;
            }

            result["trail"] = `ms~${player.machine.freespinRwd[0]};wd~${player.machine.freespinRwd[1]};fs~${player.machine.freespinRwd[2]};m~${player.machine.freespinRwd[3]}`;
        }
    }

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        index: param.index,
        na: "b",
        stime: new Date().getTime(),
        sver: "5",
        bgid: 0,
        bgt: 45,
        end: 0,
    };

    result["rs_s"] = player.machine.rs_s.join();
    result["mo_t"] = player.machine.bonusMo_T.join();
    result["mo"] = player.machine.bonusMo.join();

    result["rsb_w_mask"] = "wd,ms,fs,m";
    result["rsb_w"] = player.machine.rsb_w.join();
    result["rsb_c"] = player.machine.bonusSpinLevel;
    result["rsb_m"] = 3;
    result["rsb_p"] = player.machine.bonusSpinIndex;
    result["na"] = "b";

    if (player.machine.currentGame == "FREE") {
        result["end"] = 1;
        result["na"] = "s";
        result["fs"] = 1;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsmul"] = 1;
        result["fswin"] = 0;
        result["fsres"] = 0;
    }

    return result;
};

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
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;
