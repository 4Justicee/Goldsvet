var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "12,4,12,7,11,13,13,8,10,9,6,5,13,13,11,11,8,8,4,13,13,6,9,12,7,3,13,13,5,6,12,12,3,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13",
        balance: "100,000.00",
        cfgs: "1",
        nas: "13",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "4",
        def_sb: "5,10,11,8,1,7,13,13",
        def_sa: "8,3,4,3,11,3,13,13",
        reel_set: "0",
        bonusInit: '[{bgid:0,bgt:39,sps_wins:"1,75,150,125,250,100,1,125,100,75,150,250,1,100,75,250,150,100,1,125,250,100,150,75,1,250,125,200,100,75",sps_wins_mask:"pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w"}]',
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0,0,0~0,0,0,0,0,0,0~1,1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{props:{max_rnd_sim:"1",max_rnd_hr:"83333333",max_rnd_win:"3500"}}',
        stime: "1647586406452",
        sa: "8,3,4,3,11,3,13,13",
        sb: "5,10,11,8,1,7,13,13",
        sc: "10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00",
        defc: "100.00",
        sh: "7",
        wilds: "2~3500,0,500,200,25,0,0~1,1,1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;3500,0,500,100,25,0,0;1000,0,250,75,10,0,0;750,0,125,50,10,0,0;600,0,100,25,5,0,0;450,0,85,18,5,0,0;375,0,75,12,5,0,0;250,0,50,8,2,0,0;250,0,50,8,2,0,0;250,0,50,8,2,0,0;250,0,50,8,2,0,0;0,0,0,0,0,0,0",
        l: "20",
        rtp: "96.52",
        reel_set0: "7,7,9,9,2,11,11,8,8,4,4,10,10,7,7,6,6,12,12,3,3,9,9,7,7,10,10,5,5,11,11,7,7,8,8,10,10,4,4,12,12,7,7,9,9,6,6,8,8,11,11,7,7,10,10,2,12,12,8,8,5,5,9,9,10,10,7,7,11,11,4,4,10,10,12,12,6,6,11,11,2,12,12,5,5,9,9,11,11,6,6,10,10,3,3,12,12,8,8,9,9~4,4,10,10,6,6,1,12,12,7,7,11,11,4,4,9,9,7,7,1,11,11,5,5,12,12,8,8,2,10,10,6,6,1,11,11,4,4,9,9,8,8,3,3,12,9,6,6,1,10,10,8,8,12,12,4,4,11,11,7,7,2,9,9,6,6,11,11,1,10,10,5,5,12,12,8,8,1,9,9,6,6,10,10,4,4,11,11,7,7,1,12,12,6,6,10,10,5,5,11,11,1,6,6,9,9,2,8,8,12,12,3,3,11,11,7,7,10~3,3,6,6,12,6,7,7,9,9,1,10,10,8,8,9,9,5,5,2,11,11,8,8,12,12,6,6,9,9,1,8,10,10,4,4,9,9,5,5,10,10,7,7,11,11,8,9,12,12,1,9,9,8,8,2,10,10,5,5,12,12,7,7,11,11,1,8,8,9,9,5,5,1,12,12,4,4,10,10,8,8,9,9,2,11,11,6,6,12,12,1,7,7,10,10,3,3,9,9,8,8,11,11,5,5,12,12,1,10,10,8,8,9,9,6~7,7,12,12,7,4,1,9,9,5,5,8,8,10,10,3,3,5,6,12,12,4,4,9,9,7,7,11,11,2,10,10,5,5,12,12,1,6,6,11,11,7,7,3,3,9,9,8,8,5,5,10,10,6,6,1,9,9,5,5,12,12,7,5,3,9,9,8,8,11,11,5,5,12,12,1,7,7,10,10,4,4,7,7,2,9,9,5,5,6,6,11,11,8,8,3,3,12,12,7,7,10,10,5,5,9,9,6,6,1,12,12,7,7,4,4,9,9,7,7,2,12,12,6,6,3,3,11,11,7,8~8,8,11,11,4,4,6,6,9,9,5,5,2,10,10,7,7,4,4,9,9,6,6,11,11,3,3,7,7,10,10,4,7,6,6,11,11,2,9,9,8,8,5,5,11,11,4,7,10,10,7,7,8,8,12,12,5,5,6,6,10,10,7,7,8,8,9,9,4,4,11,11,8,8,10,10,6,6,12,12,3,3,9,9,6,6,8,8,12,12,6,6,10,10,2,11,11,7,7,12,12,4,4,10,10,6,6,11,11,5,5,9,9,8,8,6,6,10,10,4,4,7,7,11,6,12~13,13,13,13,13,13,13~13,13,13,13,13,13,13",
        s: "12,4,12,7,11,13,13,8,10,9,6,5,13,13,11,11,8,8,4,13,13,6,9,12,7,3,13,13,5,6,12,12,3,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13",
        reel_set2: "8,8,10,10,5,5,12,12,2,9,9,4,4,11,11,7,7,10,10,12,12,5,5,11,11,8,8,12,12,6,6,10,10,7,7,9,9,11,11,3,3,12,12,6,6,11,11,8,8,2,10,10,4,4,9,9,5,5,12,12,7,7,10,10,6,6,9,9,8,8,11,11,4,4,9,9~8,8,11,11,6,6,9,9,7,7,12,12,4,4,9,9,5,5,10,10,8,8,11,11,2,12,12,6,6,10,10,3,3,9,9,5,5,11,11,7,7,10,10,4,4,12,12,6,6,11,11,7,7,9,9,12,12,3,3,10,7,6,6,11,11,2,9,9,5,5,12,12,8,11,10,10,7,7,9,9~8,8,10,10,6,6,11,11,8,8,9,9,4,4,12,12,7,7,11,11,2,10,10,5,5,12,12,7,7,10,10,3,3,8,10,9,9,6,6,10,10,4,4,11,11,7,7,12,12,5,5,11,11,8,8,9,9,6,6,5,10,2,12,12,7,7,11,11,4,8,3,3,10,10,5,5,12,12,7,7,9,9~8,8,11,11,6,5,10,10,5,5,12,12,8,8,11,11,3,4,9,9,7,7,12,12,8,8,10,10,4,4,9,9,6,6,11,11,7,7,12,12,8,8,11,11,2,9,9,5,5,10,10,7,7,12,12,3,3,10,7,6,6,9,9,8,8,11,10,7,7,12,12,5,5,9,9~6,6,12,12,7,7,11,11,4,4,9,9,8,8,10,10,5,5,12,12,6,6,11,11,3,3,10,10,7,7,9,9,2,12,12,7,8,11,11,5,5,8,10,6,6,12,12,8,8,9,9,4,4,10,10,6,9,11,11,7,7,9,9,3,3,10,12,5,5,11,11,7,7,9,9~13,13,13,13,13,13,13~13,13,13,13,13,13,13",
        reel_set1: "2,2,2,2,2,2,2~3,3,9,9,10,10,8,8,12,12,7,7,9,9,5,5,10,10,8,8,9,9,6,6,11,11,4,4,10,10,8,8,9,9,7,7,12,12,6,6,11,11,8,8,9,9,10,10,7,7,11,11,9,9,3,3,12,12,8,8,10,10,7,7,9,9,10,10,5,5,11,11,6,6,10,10,2,12,12,8,8,9,9,11,11,7,7,12,12,10,10,4,4,11,11,8,8,9,9,12,12,5,5,11,11,6,6~3,3,9,7,11,11,5,5,10,10,6,6,12,12,7,7,9,9,11,11,4,4,12,12,10,10,6,6,11,11,7,7,12,12,5,5,9,9,11,11,8,6,10,10,2,12,12,7,7,11,11,3,3,12,12,8,8,9,9,4,4,7,11,6,6,4,10,8,8,12,12,7,7,11,11,12,12,2,9,9,10,10,6,6,11,11,9,9,7,7,12,12,8,8,10,10,4,4,9,9,7,7,11,11,8,8,12,12,5~2,2,2,2,2,2,2~3,3,9,9,4,4,8,8,12,12,3,3,6,6,9,9,5,5,12,4,4,5,5,10,10,3,3,8,8,9,9,5,5,4,4,12,12,5,5,7,7,9,9,2,11,11,3,3,10,10,5,5,7,7,9,9,6,6,4,4,11,11,5,5,9,9,6,6,12,12,5,5,10,10,7,7,2,11,11,5,5,8,8,12,12,7,7,4,4,10,10,6,6,9,9,7,7,3,3,11,11,8,8,7,7,9,9,6,6,10,10,7,7,12,12,8,8,11,11,12,12~4,4,5,5,9,9,7,7,11,11,8,8,10,10,4,4,9,9,3,3,12,12,6,6,11,11,7,7,5,5,11,11,8,4,10,10,2,5,5,12,12,6,6,7,7,11,11,4,4,5,5,10,10,6,7,8,8,12,12,7,7,9,9,8,8,6,6,10,5,4,4,5,5,11,11,6,6,7,7,9,9,8,8,4,4,10,10,6,6,8,8,12,12,2,11,11,6,6,8,8,10,10,3,3,9,9,6,6,7,7,10,10,5,11,11,4,10,8,8,11,11,6,6,12,12~2,2,2,2,2,2,2",
        reel_set3: "2,2,2,2,2,2,2~3,3,11,11,7,7,10,10,6,6,9,9,8,8,12,12,4,4,11,11,4,8,10,10,7,7,4,9,12,12,5,5,10,10,9,9,8,8,10,10,6,6,9,9,11,11,7,7,12,12,9,9,5,5,11,11,8,8,10,10,9,9,6,6,10,10,8,8,12,12,2,7,7,10,10,8,8,11,11,9,9,3,3,12,12,5,5,11,11,9,9,6~3,3,11,5,6,6,12,12,10,10,2,11,11,4,4,12,12,9,9,7,7,11,11,5,5,12,12,8,8,10,10,2,12,12,6,6,11,11,7,7,9,9,8,8,2,10,10,4,4,12,12,6,6,11,11,8,8,9,9,2,8,10,7,7,12,12,5,5,11,11,7,7,2,9,9,8,8,10,10,6,6,12,12,4,4,11,11,2,12,12,3,11,11,5,5,12,12,7,7,2,10,10,8,8,9,9,7,7~2,2,2,2,2,2,2~3,3,12,12,6,6,7,7,10,10,4,4,8,8,9,9,5,5,7,7,12,12,6,6,11,11,7,7,9,9,5,5,12,12,4,4,10,10,7,7,9,9,3,3,8,8,12,12,7,7,4,4,11,11,6,6,7,7,9,9,3,3,5,5,12,12,7,7,10,10,6,6,8,8,9,9,5,5,7,7,11,11,2,12,12,5,5,8,8,10,10,4,5,5,6,6,12,12,4,4,11,11,5,5,10,10,8,8,9,9,3,3,6,6,11,11,4,4,12,12,5,5,9,9,4,4~3,3,9,9,8,8,10,10,5,5,6,6,11,11,8,8,7,7,10,10,4,4,8,8,11,11,5,5,4,6,9,9,4,4,7,7,10,10,2,6,6,11,4,4,12,12,7,7,6,7,9,9,8,8,4,4,11,11,5,5,10,4,6,6,7,7,8,12,4,4,8,11,6,6,10,10,5,5,8,8,12,12,3,8,8,9,9,4,4,10,10,6,6,11,11,5,5,12,12,8,8,9,9,6,6,10,10,4,4,11,11,7,7,12,12,8,8,10,10~2,2,2,2,2,2,2",
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
    result["stime"] = new Date().getTime();

    if (player.betPerLine > 0) {
        result["c"] = player.betPerLine;
        result["defc"] = player.betPerLine;
    }
    return result;
};

ApiManager.prototype.GameApi = function (player, prevGameMode, param) {
    var result = {
        tw: player.machine.winMoney,
        ls: "0",
        balance: "179,900.00",
        index: "7",
        balance_cash: "179,900.00",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "2,12,7,2,11,13,13",
        sb: "10,12,8,11,12,13,13",
        sh: "7",
        c: player.betPerLine,
        sver: "5",
        counter: "14",
        l: "20",
        s: Util.view2String(player.machine.view),
        w: player.machine.winMoney,
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

    result["ls"] = player.machine.baseType;
    result["reel_set"] = player.machine.baseType;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "BONUS" || player.machine.currentGame == "FREE") {
            result["bgid"] = 0;
            result["bgt"] = 39;
            result["bw"] = 1;
            result["coef"] = player.betPerLine;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["status"] = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
            result["wins_mask"] = "pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w";
            result["wins"] = "1,75,150,125,250,100,1,125,100,75,150,250,1,100,75,250,150,100,1,125,250,100,150,75,1,250,125,200,100,75";
            result["wp"] = 0;
            result["rw"] = 0;
            result["na"] = "b";
        }
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        result["ls"] = player.machine.freeSpinType;
        result["is"] = Util.view2String(player.machine.maskView);
        result["reel_set"] = player.machine.freeSpinType + 2;

        //          
        if (player.machine.freeSpinType == 0) {
            result["rwd"] = `2~${player.machine.freeSpinWilds.join()}`;
        }
        //                       
        else if (player.machine.freeSpinType == 1) {
            var stickys = [];
            for (var i = 0; i < player.machine.freeSpinWilds.length; i++) {
                stickys.push(`${player.machine.freeSpinWilds[i]},${player.machine.freeSpinWilds[i]}`);
            }
            result["sty"] = stickys.join("~");
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["n_reel_set"] = 1;
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            //                                            -1          
            if (player.machine.freeSpinType == 1) {
                var stickys = [];
                for (var i = 0; i < player.machine.freeSpinWilds.length; i++) {
                    stickys.push(`${player.machine.freeSpinWilds[i]},-1`);
                }
                result["sty"] = stickys.join("~");
            }

            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        bgid: "0",
        balance: "106,900.00",
        coef: "100.00",
        level: "1",
        index: "5",
        balance_cash: "106,900.00",
        balance_bonus: "0.00",
        stime: "1647586443291",
        bgt: "39",
        lifes: "0",
        wp: "750",
        end: "1",
        sver: "5",
        counter: "10",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    if (player.machine.bonusWheelFlag) {
        result["bgid"] = 0;
        result["bgt"] = 39;
        result["end"] = 1;
        result["level"] = 1;
        result["lifes"] = 0;
        result["na"] = "cb";
        result["coef"] = player.betPerLine;
        result["wins_mask"] = "pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w";
        result["wins"] = "1,75,150,125,250,100,1,125,100,75,150,250,1,100,75,250,150,100,1,125,250,100,150,75,1,250,125,200,100,75";

        result["wp"] = player.machine.bonusMulti;
        result["rw"] = player.machine.moneyBonusWin;
        result["tw"] = player.machine.moneyBonusWin;

        var status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < player.machine.bonusIndexArr.length; i++) {
            status[player.machine.bonusIndexArr[i]] = i + 1;
        }
        result["status"] = status.join();
    } else if (player.machine.currentGame == "FREE") {
        if (player.machine.freeSpinBonusStep == "FS_BONUS_START") {
            result["bgid"] = 0;
            result["bgt"] = 39;
            result["end"] = 1;
            result["level"] = 1;
            result["lifes"] = 0;
            result["na"] = "b";
            result["wp"] = 0;
            result["rw"] = 0;
            result["tw"] = 0;
            result["wins_mask"] = "pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w,pbf,w,w,w,w,w";
            result["wins"] = "1,75,150,125,250,100,1,125,100,75,150,250,1,100,75,250,150,100,1,125,250,100,150,75,1,250,125,200,100,75";

            var status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            status[player.machine.freeSpinWheelIndex] = 1;

            result["status"] = status.join();

            player.machine.freeSpinBonusStep = "FS_BONUS_OPTION";
        } else if (player.machine.freeSpinBonusStep == "FS_BONUS_OPTION") {
            result["bgid"] = 1;
            result["wins"] = "8,5";
            result["level"] = 0;
            result["na"] = "b";
            result["status"] = "0,0";
            result["rw"] = 0;
            result["bgt"] = 30;
            result["lifes"] = 1;
            result["wins_mask"] = "nff,nff";
            result["wp"] = 0;
            result["end"] = 0;
            result["coef"] = player.virtualBet;
            player.machine.freeSpinBonusStep = "FS_BONUS_END";
        } else if (player.machine.freeSpinBonusStep == "FS_BONUS_END") {
            result["bgid"] = 1;
            result["wins"] = "8,5";
            result["level"] = 1;
            result["na"] = "s";
            result["rw"] = 0;
            result["bgt"] = 30;
            result["lifes"] = 1;
            result["wins_mask"] = "nff,nff";
            result["wp"] = 0;
            result["end"] = 1;
            result["coef"] = player.virtualBet;
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;

            var status = [0, 0];
            status[player.machine.freeSpinType] = 1;
            result["status"] = status.join();
        }
    }

    return result;
};

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        rw: "100,000",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        wp: "0",
        coef: player.virtualBet,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;