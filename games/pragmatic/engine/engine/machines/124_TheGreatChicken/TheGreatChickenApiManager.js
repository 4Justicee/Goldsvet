var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: "12",
        def_s: "8,3,2,3,8,10,4,1,4,10,9,3,4,3,9",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "6",
        def_sb: "8,10,8,11,7",
        def_sa: "8,9,10,11,7",
        reel_set: "0",
        prg_cfg_m: "wm,s,s",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        base_aw: "n;tt~rwf;tt~rwf;tt~msf",
        stime: "1649375437981",
        sa: "8,9,10,11,7",
        sb: "8,10,8,11,7",
        sc: "10.00,20.00,50.00,100.00,200.00,250.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100",
        prg_cfg: "1,15,16",
        sh: "3",
        wilds: "2~500,200,40,2,0~1,1,1,1,1;13~500,200,40,2,0~1,1,1,1,1;14~500,200,40,2,0~1,1,1,1,1;15~500,200,40,2,0~1,1,1,1,1;16~500,200,40,2,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,200,40,2,0;300,100,20,0,0;300,100,20,0,0;200,60,10,0,0;200,60,10,0,0;100,20,8,0,0;100,20,8,0,0;80,10,4,0,0;80,10,4,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.50",
        reel_set0: "9,7,11,10,9,2,3,3,3,3,11,1,8,11,9,9,11,9,8,10,7,7,5,4,5,8,5,8,10,8,6,6,11,2,6,6,7,11,4,4,10,5,3,3,9,10~9,7,10,10,2,11,5,5,11,7,11,8,4,4,9,6,6,9,3,3,3,3,6,10,11,5,11,7,1,6,7,7,9,8,10,8,4,2,8,9,9,11,10,8~11,8,11,5,9,4,10,7,3,2,9,7,6,4,10,8,3,3,3,3,5,1,7,4,5,11,7,8,8,6,5,9,11,8,10,3,3,10,10,8,4,9,5,9,6,11,1~4,4,11,10,8,5,6,6,8,11,3,3,3,3,6,1,4,9,5,5,8,9,4,5,11,6,9,2,10,6,8,5,8,11,10,7,7,10,9,10,9,3,3,11,9,7,8,8,11,10~11,5,3,3,3,3,3,4,8,5,1,10,1,11,9,10,8,6,6,10,4,4,10,8,7,7,11,4,10,8,11,11,10,9,9,11,7,2,6,7,7,5,6,11,9,10,9,9,10,8,6,9,10,6,10,10,9,8,5,11,4,8,9,8,11,11,4,6,2,5,5,7,6,9,8,8",
        s: "8,3,2,3,8,10,4,1,4,10,9,3,4,3,9",
        reel_set2: "9,7,11,10,9,3,3,3,3,11,8,11,9,9,11,9,8,10,7,7,5,4,5,8,5,8,10,8,6,6,11,6,6,7,11,4,4,10,5,3,3,9,10~9,7,10,10,11,5,5,11,7,11,8,4,4,9,6,6,9,3,3,3,3,6,10,11,5,11,7,6,7,7,9,8,10,8,4,8,9,9,11,10,8~11,8,11,5,9,4,10,7,3,9,7,6,4,10,8,3,3,3,3,5,7,4,5,11,7,8,8,6,5,9,11,8,10,3,3,10,10,8,4,9,5,9,6,11~4,4,11,10,8,5,6,6,8,11,3,3,3,3,6,4,9,5,5,8,9,4,5,11,6,9,10,6,8,5,8,11,10,7,7,10,9,10,9,3,3,11,9,7,8,8,11,10~11,5,3,3,3,3,3,4,8,5,10,11,9,10,8,6,6,10,4,4,10,8,7,7,11,4,10,8,11,11,10,9,9,11,7,6,7,7,5,6,11,9,10,9,9,10,8,6,9,10,6,10,10,9,8,5,11,4,8,9,8,11,11,4,6,5,5,7,6,9,8,8",
        reel_set1: "9,12,10,12,12,12,12,12,12,12,12,10,12,9,12,12,7,12,9,2,4,8,6,3,11,12,12,7,8,3,12,9,12,10,12,5~12,12,10,12,11,4,12,10,12,12,12,3,12,11,12,12,12,12,12,12,12,11,12,7,8,12,9,12,11,2,6,12,11,5~7,5,12,12,12,10,3,11,12,4,12,9,12,12,11,12,9,12,12,8,12,12,12,12,12,12,12,12,6,12,8,2,10,6,2,10,12,12~12,5,12,4,9,3,7,2,8,6,12,11,5,12,6,12,12,10,12,7,12,4,5,12,8,2,10,3,9,12,11,12,8,12,10,12,12,9~6,2,7,12,8,12,12,12,5,12,9,12,10,12,9,4,10,3,4,12,12,12,12,12,11,12,8,12",
        reel_set4: "9,7,11,10,9,15,3,3,3,3,11,8,11,9,9,11,9,8,10,7,7,5,4,5,8,5,8,10,8,6,6,11,15,6,6,7,11,4,4,10,5,3,3,9,10~9,7,10,10,15,11,5,5,11,7,11,8,4,4,9,6,6,9,3,3,3,3,6,10,11,5,11,7,6,7,7,9,8,10,8,4,15,8,9,9,11,10,8~11,8,11,5,9,4,10,7,3,15,9,7,6,4,10,8,3,3,3,3,5,7,4,5,11,7,8,8,6,5,9,11,8,10,3,3,10,10,8,4,9,5,9,6,11~4,4,11,10,8,5,6,6,8,11,3,3,3,3,6,4,9,5,5,8,9,4,5,11,6,9,15,10,6,8,5,8,11,10,7,7,10,9,10,9,3,3,11,9,7,8,8,11,10~11,5,3,3,3,3,3,4,8,5,10,11,9,10,8,6,6,10,4,4,10,8,7,7,11,4,10,8,11,11,10,9,9,11,7,15,6,7,7,5,6,11,9,10,9,9,10,8,6,9,10,6,10,10,9,8,5,11,4,8,9,8,11,11,4,6,15,5,5,7,6,9,8,8",
        reel_set3: "9,7,11,10,9,3,3,3,3,11,8,11,9,9,11,9,8,10,7,7,5,4,5,8,5,8,10,8,6,6,11,6,6,7,11,4,4,10,5,3,3,9,10~9,7,10,10,11,5,5,11,7,11,8,4,4,9,6,6,9,3,3,3,3,6,10,11,5,11,7,6,7,7,9,8,10,8,4,8,9,9,11,10,8~11,8,11,5,9,4,10,7,3,9,7,6,4,10,8,3,3,3,3,5,7,4,5,11,7,8,8,6,5,9,11,8,10,3,3,10,10,8,4,9,5,9,6,11~4,4,11,10,8,5,6,6,8,11,3,3,3,3,6,4,9,5,5,8,9,4,5,11,6,9,10,6,8,5,8,11,10,7,7,10,9,10,9,3,3,11,9,7,8,8,11,10~11,5,3,3,3,3,3,4,8,5,10,11,9,10,8,6,6,10,4,4,10,8,7,7,11,4,10,8,11,11,10,9,9,11,7,6,7,7,5,6,11,9,10,9,9,10,8,6,9,10,6,10,10,9,8,5,11,4,8,9,8,11,11,4,6,5,5,7,6,9,8,8",
        reel_set5: "9,7,11,10,9,16,3,3,3,3,11,8,11,9,9,11,9,8,10,7,7,5,4,5,8,5,8,10,8,6,6,11,16,6,6,7,11,4,4,10,5,3,3,9,10~9,7,10,10,16,11,5,5,11,7,11,8,4,4,9,6,6,9,3,3,3,3,6,10,11,5,11,7,6,7,7,9,8,10,8,4,16,8,9,9,11,10,8~11,8,11,5,9,4,10,7,3,16,9,7,6,4,10,8,3,3,3,3,5,7,4,5,11,7,8,8,6,5,9,11,8,10,3,3,10,10,8,4,9,5,9,6,11~4,4,11,10,8,5,6,6,8,11,3,3,3,3,6,4,9,5,5,8,9,4,5,11,6,9,16,10,6,8,5,8,11,10,7,7,10,9,10,9,3,3,11,9,7,8,8,11,10~11,5,3,3,3,3,3,4,8,5,10,11,9,10,8,6,6,10,4,4,10,8,7,7,11,4,10,8,11,11,10,9,9,11,7,16,6,7,7,5,6,11,9,10,9,9,10,8,6,9,10,6,10,10,9,8,5,11,4,8,9,8,11,11,4,6,16,5,5,7,6,9,8,8",
        awt: "rsf"
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
        sh: "3",
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

    if (player.machine.viewStatus != null) {
        if (player.machine.viewStatus.status == "egg") {
            var viewStatus = player.machine.viewStatus;
            var isView = [...viewStatus.isView];
            for (var i = 0; i < isView.length; i++) {
                if (isView[i] == viewStatus.sym) {
                    isView[i] = 12;
                }
            }
            result["aw"] = "3";
            result["awt"] = "rsf";
            result["msr"] = viewStatus.sym;
            result["is"] = isView.join();
            result["reel_set"] = 1;
        } else if (player.machine.viewStatus.status == "wild") {
            var viewStatus = player.machine.viewStatus;
            var isView = [...viewStatus.isView];
            var rwdPos = [];

            for (var i = 0; i < viewStatus.pos.length; i++) {
                for (var j = 0; j < 3; j++) {
                    isView[viewStatus.pos[i] + j * 5] = Util.random(3, 12);
                    rwdPos.push(viewStatus.pos[i] + j * 5);
                }
            }

            result["aw"] = "2";
            result["awt"] = "rsf";
            result["is"] = isView.join();
            result["rwd"] = `14~${rwdPos.join()}`
        }
    }


    if (prevGameMode == "BASE") {
        //                                   ,                    
        // if (player.machine.currentGame == "FREE") {
        //     result["fs"] = 1;
        //     result["fsmax"] = player.machine.freeSpinLength;
        //     result["fsmul"] = 1;
        //     result["fsres"] = 0.0;
        //     result["fswin"] = 0.0;
        //     result["na"] = "s";
        //     result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join(",")}`;
        // } else 
        if (player.machine.currentGame == "BONUS") {
            result["bw"] = 1;
            result["aw"] = 0;
            result["awt"] = "rsf";
            result["bgid"] = 0;
            result["bgt"] = 21;
            result["bw"] = 1;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["status"] = "0,0,0,0,0";
            result["wins_mask"] = "h,h,h,h,h";
            result["wins"] = "0,0,0,0,0";
            result["wp"] = "0";
            result["status"] = "0,0,0,0,0";
            result["na"] = "b";
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;

        var isWild = false;
        var isView = [...player.machine.view];
        var rwdStr = [];
        for (var i = 0; i < isView.length; i++) {
            if (isView[i] == 15) {
                isView[i] = Util.random(3, 12);
                rwdStr.push(i);
                isWild = true;
            }
        }

        if (isWild) {
            result["is"] = isView.join();
            result["rwd"] = `15~${rwdStr.join()}`;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex + 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["gwm"] = player.machine.totalMulti + 1;
            result["prg"] = player.machine.totalMulti + 1;
            result["fstype"] = player.machine.currentSelectBonus;
            result["prg_m"] = "wm";
            result["reel_set"] = 4;

        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
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
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        counter: "1",
        index: param.index,
        na: "b",
        rw: "0.00",
        wp: 0,
        stime: new Date().getTime(),
        sver: "5",
        coef: player.virtualBet,
    };
    result["counter"] = ++param.counter;

    if (player.machine.firstIndex == 1 && player.machine.prevBonusIndex == 0) {
        result["end"] = 1;
        result["level"] = 1;
        result["lifes"] = 0;
        result["wins_mask"] = player.machine.bonusStatus;
        result["wins"] = "1,1,1,1,1";
        result["wp"] = 0;

        result["status"] = player.machine.statusStr;
        result["na"] = "b";
        result["bgid"] = 0;
        result["bgt"] = 21;
    } else if (player.machine.firstIndex == 2 && player.machine.prevBonusIndex == 1) {
        var list = [0, 0, 0, 0, 0];
        list[player.machine.bonusLevel] = 1;
        result["na"] = "b";
        result["status"] = list.join();
        result["bgid"] = 6;
        result["bgt"] = 35;
        result["level"] = 0;
        result["lifes"] = 1;
        result["end"] = 0;
        result["wins"] = "1,1,10,10,1"
        result["wins_mask"] = "spbf,mbf,swfof,swrssf,cbf";

    } else if (player.machine.firstIndex == 3 && player.machine.prevBonusIndex == 2) {
        //                             
        var list = [0, 0, 0, 0, 0];
        list[player.machine.bonusLevel] = 1;

        result["status"] = list.join();
        result["end"] = 1;
        result["level"] = 1;
        result["lifes"] = 1;
        result["wins"] = "1,1,10,10,1"
        result["wins_mask"] = "spbf,mbf,swfof,swrssf,cbf";

        if (player.machine.bonusLevel == 3 || player.machine.bonusLevel == 2) {
            var win_mask = ["spbf", "mbf", "swfof", "swrssf", "cbf"];
            result["na"] = "s";
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["rw"] = player.machine.freeSpinWinMoney;
            result["fstype"] = win_mask[player.machine.bonusLevel];
            result["end"] = 1;
            result["prg_m"] = "wm";
            result["prg"] = 1;
            result["wp"] = 0;
        }

    } else if (player.machine.firstIndex == 2 && player.machine.prevBonusIndex == 2) {
        //                              
        if (player.machine.gambleWin) {
            var list = [0, 0, 0, 0, 0];
            list[player.machine.bonusLevel] = 1;

            result["wins_mask"] = "spbf,mbf,swfof,swrssf,cbf";
            result["wins"] = "1,1,10,10,1";
            result["status"] = list.join();
            result["na"] = "b";
            result["level"] = player.machine.gambleIndex;
            result["end"] = 0;
            result["lifes"] = 1;
        } else {
            var list = [0, 0, 0, 0, 0];
            list[player.machine.bonusLevel] = 1;

            result["tw"] = player.machine.moneyBonusWin;
            result["bgid"] = 6;
            result["balance"] = 99982.60;
            result["wins"] = "1, 1, 10, 10, 1";
            result["level"] = player.machine.gambleIndex;
            result["na"] = "cb";
            result["status"] = list.join();
            result["rw"] = player.machine.moneyBonusWin;
            result["stime"] = 1649375813439;
            result["bgt"] = 35;
            result["lifes"] = 0;
            result["wins_mask"] = "spbf, mbf, swfof, swrssf, cbf";
            result["wp"] = 14
            result["end"] = 1;
        }
    } else if (player.machine.firstIndex == 3 && player.machine.prevBonusIndex == 3) {
        //                        
        if (player.machine.currentSelectBonus == "spbf") {
            //                                       
            result["na"] = "b";
            result["bgid"] = 2;
            result["bgt"] = 34;
            result["end"] = 0;

            if (!player.machine.bonusEnd) {
                if (!player.machine.isBox) {
                    var status = [0, 0, 0];
                    var win_mask = ["", "", ""];
                    var default_mask = ["sf", "np"];
                    var wins = [0, 0, 0];

                    status[player.machine.boxSelectIndex] = 1;
                    win_mask[player.machine.boxSelectIndex] = "mul";

                    var j = 0;
                    for (var i = 0; i < win_mask.length; i++) {
                        if (win_mask[i] == "") {
                            win_mask[i] = default_mask[j];
                            j++;
                        }
                    }

                    for (var i = 0; i < win_mask.length; i++) {
                        if (win_mask[i] == "mul") {
                            wins[i] = player.machine.boxValue;
                        } else if (win_mask[i] == "sf") {
                            wins[i] = 1;
                        }
                    }

                    result["end"] = 0;
                    result["level"] = player.machine.bonusSpinIndex;
                    result["status"] = status.join();
                    result["sublevel"] = 1;
                    result["wins_mask"] = win_mask.join();
                    result["wins"] = wins.join();
                    result["wp"] = player.machine.totalMulti;
                } else {
                    result["level"] = player.machine.bonusSpinIndex;
                    result["status"] = "0,0,0";
                    result["sublevel"] = 0;
                    result["wins_mask"] = "h,h,h";
                    result["wins"] = "0,0,0";
                    result["wp"] = player.machine.totalMulti;
                }
            } else {
                if (player.machine.isBox) {
                    result["level"] = player.machine.bonusSpinIndex;
                    result["status"] = "0,0,0";
                    result["sublevel"] = 0;
                    result["wins_mask"] = "h,h,h";
                    result["wins"] = "0,0,0";
                    result["wp"] = player.machine.totalMulti;
                } else {
                    var status = [0, 0, 0];
                    var win_mask = ["", "", ""];
                    var default_mask = ["sf", "mul"];
                    var wins = [0, 0, 0];

                    status[player.machine.boxSelectIndex] = 1;
                    win_mask[player.machine.boxSelectIndex] = "np";

                    var j = 0;
                    for (var i = 0; i < win_mask.length; i++) {
                        if (win_mask[i] == "") {
                            win_mask[i] = default_mask[j];
                            j++;
                        }
                    }

                    for (var i = 0; i < win_mask.length; i++) {
                        if (win_mask[i] == "np") {
                            wins[i] = 0;
                        } else if (win_mask[i] == "sf") {
                            wins[i] = 1;
                        } else if (win_mask[i] == "mul") {
                            wins[i] = 1;
                        }
                    }

                    result["na"] = "cb";
                    result["end"] = 1;
                    result["level"] = player.machine.bonusSpinIndex;
                    result["status"] = status.join();
                    result["sublevel"] = 1;
                    result["wins_mask"] = win_mask.join();
                    result["wins"] = wins.join();
                    result["rw"] = player.machine.moneyBonusWin;
                    result["wp"] = player.machine.totalMulti;
                }
            }
        } else if (player.machine.currentSelectBonus == "mbf") {
            //                                       
            if (player.machine.isFirstRoad == 2) {
                result["wof_mi"] = 0;
                result["wof_p"] = 0;
                result["wp"] = 0;

                result["end"] = 0;
                result["level"] = 0;
                result["wof_map"] = "1,5,6,7,8,9,10,12,14,15,16,17,18,19,20,22,25,30,35,40,50,0";
                result["wof_mask"] = "p,p,p,p,p,pc";
                result["wof_set"] = "1,2,3,4,5,collect";
                result["na"] = "b";
                result["bgid"] = 4;
                result["bgt"] = 23;

                result["rw"] = 0;
            } else {
                if (player.machine.currentGame == "BASE") {
                    result["wof_mi"] = player.machine.totalStep;
                    result["wof_p"] = 5;
                    result["wp"] = player.machine.totalMulti;

                    result["end"] = 1;
                    result["level"] = player.machine.bonusSpinIndex + 1;
                    result["wof_map"] = "1,5,6,7,8,9,10,12,14,15,16,17,18,19,20,22,25,30,35,40,50,0";
                    result["wof_mask"] = "p,p,p,p,p,pc";
                    result["wof_set"] = "1,2,3,4,5,collect";
                    result["na"] = "cb";
                    result["bgid"] = 4;
                    result["bgt"] = 23;

                    result["rw"] = player.machine.moneyBonusWin;

                } else {
                    result["wof_mi"] = player.machine.totalStep;
                    result["wof_p"] = player.machine.boxValue;
                    result["wp"] = player.machine.totalMulti;

                    result["end"] = 0;
                    result["level"] = player.machine.bonusSpinIndex + 1;
                    result["wof_map"] = "1,5,6,7,8,9,10,12,14,15,16,17,18,19,20,22,25,30,35,40,50,0";
                    result["wof_mask"] = "p,p,p,p,p,pc";
                    result["wof_set"] = "1,2,3,4,5,collect";
                    result["na"] = "b";
                    result["bgid"] = 4;
                    result["bgt"] = 23;

                    result["rw"] = player.machine.winMoney;
                }
            }

        }

    }

    return result;
}


ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "99,986.50",
        coef: "1.00",
        index: "90",
        balance_cash: "99,986.50",
        balance_bonus: "0.00",
        na: "s",
        rw: "2.00",
        stime: "1643365512789",
        wp: "0",
        sver: "5",
        counter: "180",
        coef: player.virtualBet,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["rw"] = player.machine.moneyBonusWin;

    return result;
};

module.exports = ApiManager;
