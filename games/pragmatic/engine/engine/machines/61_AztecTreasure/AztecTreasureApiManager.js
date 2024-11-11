var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: `13~14`,
        def_s: `9,3,11,6,6,11,5,9,11,4,6,12,4,9,9,6,8,11,9,9,1,3,11,9,9,4,3,8,4,4`,
        msr: `8~2`,
        balance: `100,000.00`,
        cfgs: `1`,
        nas: `15`,
        ver: `2`,
        index: `1`,
        balance_cash: `100,000.00`,
        reel_set_size: `2`,
        def_sb: `5,9,3,10,3`,
        def_sa: `4,9,7,9,10`,
        bonusInit: [{ bgid: 0, bgt: 21, bg_i: "5,10,15,20,25", bg_i_mask: "nff,nff,nff,nff,nff " }, { bgid: 1, bgt: 21, bg_i: "10,15,20,25", bg_i_mask: "nff,nff,nff,nff" }, { bgid: 2, bgt: 21, bg_i: "15,20,25", bg_i_mask: "nff,nff,nff" }, { bgid: 3, bgt: 21, bg_i: "3,4,5,10,15", bg_i_mask: "nff,nff,nff,nff,nff" }, { bgid: 4, bgt: 21, bg_i: "4,5,10,15", bg_i_mask: "nff,nff,nff,nff" }, { bgid: 5, bgt: 21, bg_i: "5,10,15", bg_i_mask: "nff,nff,nff" }, { bgid: 6, bgt: 21, bg_i: "10,15", bg_i_mask: "nff,nff" }],
        prg_cfg_m: `rtfs_left`,
        balance_bonus: `0.00`,
        na: `s`,
        scatters: `1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1`,
        gmb: `0,0,0`,
        rt: `d`,
        gameInfo: { props: { max_rnd_sim: "1", max_rnd_hr: "111111111", max_rnd_win: "2500" } },
        stime: `1639305349963`,
        sa: `4,9,7,9,10`,
        sb: `5,9,3,10,3`,
        sc: `10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00`,
        defc: `100`,
        prg_cfg: `0`,
        aw_reel_count: `6`,
        sh: `6`,
        wilds: `2~0,0,0,0,0~1,1,1,1,1`,
        bonuses: `0`,
        fsbonus: ``,
        c: `100`,
        aw_reel0: `m~2;m~3;m~5;m~7;m~10`,
        aw_reel2: `m~3`,
        sver: `5`,
        aw_reel1: `m~2`,
        n_reel_set: `0`,
        counter: `2`,
        paytable: `0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;80,30,15,0,0;50,25,12,0,0;30,15,10,0,0;20,12,8,0,0;20,12,8,0,0;15,10,5,0,0;10,8,5,0,0;10,8,5,0,0;8,6,4,0,0;8,6,4,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0`,
        l: `20`,
        rtp: `96.50`,
        reel_set0: `7,6,7,8,12,4,5,5,8,8,10,11,11,6,10,4,9,9,7,7,7,3,3,8,5,8,10,11,11,11,8,9,6,6,10,10,12,12,6,9,9,9,9,1,7,8,7,7,10,12,12,5,12,5,8,4,11,7,3~11,10,9,5,9,10,10,2,11,12,12,12,1,3,3,5,5,10,10,8,11,11,9,9,8,8,7,7,7,8,8,8,11,11,11,12,4,4,12,12,6,6,9,9,9,5,5,7,7,6,6,6,2,2,5,10,10,1,10,3,4,4,7,6,8,6,5,4,8,8,10,4,4~7,9,11,9,4,4,11,11,8,8,2,2,9,1,3,3,11,8,7,7,11,12,12,6,6,9,9,4,4,1,7,10,10,11,2,9,7,12,7,9,9,9,5,3,8,5,12,12,4,4,10,11,1,8,5,5,11,8,6,8,4,10,10,10,4,5,12,12,6~10,6,11,9,6,6,8,8,12,5,5,5,5,11,1,9,9,8,8,11,3,3,4,4,2,2,4,6,11,11,5,5,12,12,7,7,6,3,3,4,4,9,9,7,8,10,10,2,11,4,11,10,10,1,6,11,11,12,12,12,6,8,8,5,7,10,4~4,5,10,8,4,4,7,12,12,8,8,9,3,6,6,4,7,7,6,8,1,10,8,8,8,9,5,5,7,7,7,6,6,6,3,3,4,10,5,12,11,11,11,5,5,9,10,10,9,9,12,12,11,4,11,11,5,8`,
        s: `9,3,11,6,6,11,5,9,11,4,6,12,4,9,9,6,8,11,9,9,1,3,11,9,9,4,3,8,4,4`,
        t: `243`,
        reel_set1: `7,6,7,8,12,12,12,4,9,9,5,5,8,10,11,11,6,9,10,3,3,1,6,6,10,10,11,11,11,12,6,9,9,9,9,3,7,7,8,7,11,10,12,12,5,12,5,8,4,11,7,3~11,10,9,5,5,9,10,11,11,1,7,7,9,6,8,2,2,3,8,7,7,7,8,8,12,10,10,10,4,4,12,12,6,9,9,9,5,7,2,5,10,10,4,10,12,12,12,3,4,7,6,8,6,5,4,8,8,10,4,4~7,9,11,9,4,11,11,8,8,2,9,6,11,12,3,3,4,7,1,7,8,10,10,11,9,7,2,2,6,6,6,12,7,7,10,9,5,5,5,3,8,12,12,4,4,10,9,11,8,5,5,12,11,8,6,6,8,10,4,10,5,12,6~10,6,11,9,7,6,6,8,8,11,11,10,10,10,12,3,9,9,7,4,1,6,11,11,11,5,5,8,2,12,12,7,6,4,9,9,9,7,8,3,3,10,10,11,4,11,10,6,11,12,12,12,6,8,8,11,10,5,7,11,10,4~4,5,10,8,4,4,7,10,12,12,1,8,8,9,6,6,6,7,7,9,5,12,3,6,6,6,10,7,7,7,5,12,12,11,8,8,8,5,5,9,10,9,12,11,4,11,11,5,8`,
        aw_reel4: `m~7`,
        aw_reel3: `m~5`,
        aw_reel5: `m~10`,
    }

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
        balance_bonus: "0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: "100.00",
        counter: "1",
        index: "1",
        msr: "13~5",
        n_reel_set: 0,
        na: "s",
        s: "5,11,8,3,10,11,8,7,8,6,9,5,8,7,10,6,9,5,7,6,6,10,6,7,7,6,6,10,6,7",
        sa: "7,9,3,9,4",
        sb: "5,7,9,7,3",
        sh: "6",
        stime: new Date().getTime(),
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    result["s"] = Util.view2String(player.machine.view);
    result["c"] = player.betPerLine;

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS") {
            result["bgid"] = "0";
            result["bgt"] = "21";
            result["bw"] = "1";
            result["coef"] = player.virtualBet;
            result["na"] = "b";
            result["end"] = "0";
            result["level"] = "0";
            result["lifes"] = "1";
            result["rw"] = "0.00";
            result["status"] = "0,0,0,0,0";
            result["wins"] = "0,0,0,0,0";
            result["wins_mask"] = "h,h,h,h,h";
            result["wp"] = "0";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["aw_p"] = player.machine.aw_p;
        result["aw_reel"] = "0";
        result["gwm"] = player.machine.freeSpinMulti;
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_aw_reel"] = "0";
        result["n_reel_set"] = "1";
        result["na"] = "s";

        if (player.machine.currentGame == "FREE") {
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["n_reel_set"] = "0";
        }
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        tw: "0.08",
        fsmul: "1",
        bgid: "0",
        balance: "99,993.73",
        wins: "5,20,15,25,10",
        coef: "0.20",
        fsmax: "5",
        level: "1",
        index: "67",
        balance_cash: "99,993.73",
        balance_bonus: "0.00",
        na: "s",
        fswin: "0.00",
        status: "1,0,0,0,0",
        rw: "0.00",
        stime: "1639305601651",
        fs: "1",
        bgt: "21",
        lifes: "0",
        wins_mask: "nff,nff,nff,nff,nff",
        wp: "0",
        end: "1",
        fsres: "0.00",
        sver: "5",
        n_reel_set: "1",
        counter: "134",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["fsmax"] = player.machine.freeSpinLength;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["coef"] = player.virtualBet;

    result["wins"] = player.machine.wins;
    result["status"] = player.machine.status.join();
    result["tw"] = player.machine.freeSpinWinMoney;
    result["fswin"] = player.machine.freeSpinWinMoney;
    result["fsres"] = player.machine.freeSpinWinMoney;

    return result;
}

module.exports = ApiManager;