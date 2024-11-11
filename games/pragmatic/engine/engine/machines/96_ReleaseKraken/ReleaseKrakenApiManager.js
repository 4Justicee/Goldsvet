var Util = require('../../../utils/slot_utils');

function ApiManager() { }
/*
119~122                
    cw, classical kraken wilds
233~236                
    iw
330~347              (         1+         3+      5)
    bonus = 0
                                                  ,,,              
521~535             
727~737                 lwb
    cwin_p                       
    win_p              
    wins 2                 2,1,1

    ws           +       
    s       (                          +       )
    mc 2       +       
    wc           +       
    c       
    sc ???
758~761                
771~779                
823~835          (         +         +         )
*/
ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '4,3,11,3,7,10,9,4,11,8,11,8,4,6,4,5,8,9,10,11',
        balance: '0.00',
        cfgs: '3520',
        ver: '2',
        index: '1',
        balance_cash: '0.00',
        reel_set_size: '3',
        def_sb: '8,6,11,8,6',
        def_sa: '9,3,7,10,4',
        reel_set: '0',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        fs_aw: 't',
        cls_s: '-1',
        gmb: '0,0,0',
        rt: 'd',
        stime: '1646039921749',
        sa: '9,3,7,10,4',
        sb: '8,6,11,8,6',
        sc: '10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00',
        defc: '100.00',
        sh: '4',
        wilds: '2~500,200,50,0,0~1,1,1,1,1;16~500,200,50,0,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '100.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;500,200,50,0,0;250,100,40,0,0;200,80,40,0,0;150,60,20,0,0;100,60,20,0,0;80,20,10,0,0;80,20,10,0,0;40,10,5,0,0;40,10,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0',
        l: '20',
        rtp: '94.50',
        total_bet_max: '10,000,000.00',
        reel_set0: '9,11,3,3,3,3,3,3,3,3,10,10,8,0,7,9,4,10,11,11,2,5,8,8,9,6,0,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10~9,11,3,3,3,3,3,3,3,3,10,10,8,7,9,4,10,11,11,2,5,8,8,9,6,3,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10~9,11,3,3,3,3,3,3,3,3,10,10,8,0,7,9,4,10,11,11,2,5,8,8,9,6,0,3,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10~9,11,3,3,3,3,3,3,3,3,10,10,8,7,9,4,10,11,11,2,5,8,8,9,6,3,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10~9,11,3,3,3,3,3,3,3,3,10,10,8,7,9,4,10,13,11,11,2,5,8,8,9,6,14,10,11,7,5,5,8,10,6,6,11,10,14,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10',
        s: '4,3,11,3,7,10,9,4,11,8,11,8,4,6,4,5,8,9,10,11',
        reel_set2: '11,11,11,11,3,3,3,3,3,3,3,3,9,9,9,9,2,10,10,10,10,0,4,4,4,4,7,7,7,7,8,8,8,8,5,5,5,5,11,11,11,11,6,6,6,6~11,11,11,11,3,3,3,3,3,3,3,3,9,9,9,9,2,10,10,10,10,4,4,4,4,3,7,7,7,7,8,8,8,8,5,5,5,5,11,11,11,11,6,6,6,6~11,11,11,11,3,3,3,3,3,3,3,3,9,9,9,9,2,10,10,10,10,0,4,4,4,4,3,7,7,7,7,8,8,8,8,5,5,5,5,11,11,11,11,6,6,6,6~11,11,11,11,3,3,3,3,3,3,3,3,9,9,9,9,2,10,10,10,10,4,4,4,4,3,7,7,7,7,8,8,8,8,5,5,11,11,11,11,6,6,6,6~11,11,11,11,3,3,3,3,3,3,3,3,9,9,9,9,2,10,10,10,10,4,4,4,4,7,7,7,7,13,8,8,8,8,5,5,5,5,14,11,11,11,11,6,6,6,6',
        reel_set1: '9,11,3,3,3,3,3,3,3,3,10,10,8,7,9,4,10,11,11,5,8,8,9,6,3,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10~9,11,3,3,3,3,3,3,3,3,10,10,8,7,9,4,10,11,11,5,8,8,9,6,3,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10~9,11,3,3,3,3,3,3,3,3,10,10,8,7,9,4,10,11,11,5,8,8,9,6,3,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10~9,11,3,3,3,3,3,3,3,3,10,10,8,7,9,4,10,11,11,5,8,8,9,6,3,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10~9,11,3,3,3,3,3,3,3,3,10,10,8,7,9,4,10,11,11,5,8,8,9,6,3,10,11,7,5,5,8,10,6,6,11,10,9,5,8,7,7,8,10,9,9,11,5,4,4,9,10',
        purInit: '[{type:"bg",bet:2000,game_id:2}]',
        total_bet_min: '10.00',
        awt: '6rl',
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
        balance_bonus: "0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: "100.00",
        counter: "1",
        index: "1",
        l: "20",
        ls: 0,
        na: "s",
        reel_set: 0,
        stime: new Date().getTime(),
        s: "9,4,12,11,12,12,4,11,10,10,4,12,4,7,5,4,2,4,7,5",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "4",
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

    var krakenMode = player.machine.krakenMode;

    if (krakenMode) {
        if (player.machine.krakenStep == 0) {
            result["bgid"] = 0;
            result["bgt"] = 41;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["na"] = 'b';     //      
            result["rw"] = 0;
            result["status"] = '0,0,0';
            result["wins_mask"] = 'h,h,h';
            result["wins"] = '0,0,0';
            result["wp"] = 0;
        }

        if (player.machine.krakenStep == 2) {
            result["rs_t"] = 1;
            result["rs_win"] = player.machine.winMoney;

            if (player.machine.krakenMode == 1) {
                result["bgid"] = 3;
                result["bgt"] = 43;
                result["bw"] = 1;
                result["cwin_p"] = player.machine.wPosArr;
                result["end"] = 0;
                result["level"] = 0;
                result["na"] = 'b'; //   ~      ~~
                result["rs_f"] = "lwb";
                result["rs_t"] = 1;
                result["rs_win"] = 0;
                result["spn"] = 1;
                result["status"] = '0,0,0';
                result["sublevel"] = 0;
                result["win_p"] = player.machine.wPosArr;
                result["wins_mask"] = 'h,h,h';
                result["wins"] = '0,0,0';
            }
            else if (player.machine.krakenMode == 2) {
                result["is"] = player.machine.maskView.join();
                result["rs_f"] = "cw";
                result["rwd"] = `2~${player.machine.wPosArr.join()}`;
            } else if (player.machine.krakenMode == 3) {
                result["is"] = player.machine.maskView.join();
                result["rs_f"] = "iw";
                result["rwd"] = `2~${player.machine.iPosArr};16~${player.machine.wPosArr}`;
            }
        }
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["bgid"] = 2;
            result["bgt"] = 24;
            result["bw"] = 1;
            result["end"] = 0;
            result["level"] = 0;
            result["na"] = "b"; //         ...
            result["status"] = player.machine.fsSelectCache.status;
            result["win_fs"] = 0;
            result["win_mul"] = 1;
            result["wins_mask"] = player.machine.fsSelectCache.wins_mask;
            result["wins"] = player.machine.fsSelectCache.wins;
        } else if (player.machine.currentGame == "BONUS") {
            result["bgid"] = 1;
            result["bgt"] = 34;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 1;
            result["na"] = "b";
            result["status"] = '0,0,0';
            result["sublevel"] = 0;
            result["wins_mask"] = 'h,h,h';
            result["wins"] = '0,0,0';
            result["wp"] = 0;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["aw"] = 0;
        result["awt"] = "6rl";
        result["reel_set"] = 1;
        result["is"] = player.machine.maskView;
        if (player.machine.wPosArr.length) {
            result["gwm"] = player.machine.totalMulti;
            result["rwd"] = `2~${player.machine.wPosArr.join()}`;
        }
        result["ls"] = 1;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fswin"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["w"] = player.machine.freeSpinWinMoney;
        }

        if (player.machine.wPosArr.length) {
            result["wmt"] = "sc";
            result["wmv"] = result["gwm"];
            result["wnd"] = result["rwd"];
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
        balance_bonus: '0.00',
        balance_cash: '100,000.00',
        balance: '100,000.00',
        counter: '1',
        index: '1',
        na: 'b',
        s: "",
        stime: "1629939208592",
        sver: '5',
    }

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["s"] = Util.view2String(player.machine.view);

    var krakenMode = player.machine.krakenMode;
    var status = [0, 0, 0];
    var wins_mask = ["h", "h", "h"];
    var wins = [0, 0, 0];

    if (krakenMode) {
        var krakenStep = player.machine.krakenStep;

        if (krakenStep == 1) {
            var krakenModes = ["", "lwb", "cw", "iw"];
            var krakenMode = krakenModes[player.machine.krakenMode];
            var krakenInd = player.machine.krakenInd;

            result["bgid"] = 0;
            result["bgt"] = 41;
            result["coef"] = player.virtualBet;
            result["end"] = 1;
            result["level"] = 1;
            result["lifes"] = 0;
            result["na"] = 's'; //   ~      ~~
            result["rs_c"] = 1;
            result["rs_f"] = krakenMode;
            result["rs_m"] = 1;
            result["rs_p"] = 0;
            result["rs"] = "sm";
            result["rw"] = 0;

            status[krakenInd] = 1;
            wins_mask[krakenInd] = krakenMode;
            wins[krakenInd] = 1;

            result["status"] = status.join();
            result["wins_mask"] = wins_mask.join();
            result["wins"] = wins.join();
            result["wp"] = 0;

        } else if (krakenMode == 1) {
            result["bgid"] = 3;
            result["bgt"] = 43;
            result["end"] = 0;
            result["level"] = player.machine.krakenLevel;
            result["sublevel"] = player.machine.krakenSubLevel;
            result["win_p"] = player.machine.wPosArr;

            if (player.machine.krakenSubLevel == 0) {
                result["spn"] = 0;
                result["status"] = '0,0,0';
                result["wins_mask"] = 'h,h,h';
                result["wins"] = '0,0,0';
            } else {
                var lockingMode = player.machine.lockingMode;
                var lockingInd = player.machine.lockingInd;
                var lockingBoxValues = ["s", "c", "wc", "ws", "mc"];
                var status = [0, 0, 0];
                var wins_mask = ["", "", ""];
                var randomPos = Util.random(0, lockingBoxValues.length);
                var wins = [1, 1, 1];

                for (var i = 0; i < 3; ++i) {
                    wins_mask[i] = lockingBoxValues[(randomPos + i) % lockingBoxValues.length];
                    if (wins_mask[i].includes('m')) {
                        wins[i] = 2;
                    }
                }

                status[lockingInd] = 1;
                wins_mask[lockingInd] = lockingMode;
                wins[lockingInd] = 1;

                result["spn"] = 1;

                if (lockingMode.includes('m')) {
                    result["mul"] = player.machine.totalMulti;
                    wins[lockingInd] = 2;
                }

                if (lockingMode.includes('w')) {
                    result["cwin_p"] = player.machine.wPosAddArr;
                }

                result["status"] = status.join();
                result["wins_mask"] = wins_mask.join();
                result["wins"] = wins.join();

                if (lockingMode.includes('c')) {
                    //                      
                    result["end"] = 1;
                    if (player.machine.totalMulti > 1) {
                        result["mul"] = player.machine.totalMulti;
                    }
                    if (player.machine.moneyBonusWin) {
                        result["na"] = "cb";
                        var winLines = player.machine.winLines;

                        for (var i = 0; i < winLines.length; i++) {
                            result[`l${i}`] = winLines[i];
                        }
                    } else {
                        result["na"] = "s";
                    }
                    result["rw"] = player.machine.moneyBonusWin;
                    result["spn"] = 0;
                    result["tw"] = player.machine.moneyBonusWin;
                }
            }
        }

        return result;
    }

    if (player.machine.currentGame == "FREE") {
        result["bgt"] = 2;
        result["bgid"] = 24;
        result["end"] = 0;
        result["level"] = player.machine.krakenLevel;
        result["status"] = player.machine.fsSelectCache.status;
        result["win_fs"] = player.machine.freeSpinLength;
        result["mul"] = 1;
        result["wins_mask"] = player.machine.fsSelectCache.wins_mask;
        result["wins"] = player.machine.fsSelectCache.wins;

        if (player.machine.freeSpinIndex == 1) {  //                            
            result["end"] = 1;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
            result["na"] = 's'; //          doSpin                   .
        }
        return result;
    }
    //                        

    result["bgid"] = 1;
    result["bgt"] = 34;
    result["coef"] = player.virtualBet;
    result["level"] = player.machine.krakenLevel;
    result["sublevel"] = player.machine.krakenSubLevel;

    var bonusInd = player.machine.bonusInd;

    if (player.machine.krakenSubLevel == 1) {
        wins = [2, 3, 5];
        Util.shuffle(wins);
        status[bonusInd] = 1;
        wins_mask[bonusInd] = "mul";

        var flag = 0;
        for (var i = 0; i < 3; ++i) {
            if (i != bonusInd) {
                if (!flag) {
                    wins_mask[i] = "mul";
                    wins[i] = Util.random(2, 5);
                    flag = 1;
                } else {
                    wins_mask[i] = "np";
                }
            }
        }

        wins[bonusInd] = player.machine.multi;
    }

    if (player.machine.currentGame == "BONUS") {
        result["end"] = 0;
    }
    if (player.machine.currentGame == "BASE") {
        //                       
        result["end"] = 1;
        result["na"] = "cb";

        result["rw"] = player.machine.moneyBonusWin;

        wins_mask = ["mul", "mul", "mul"];
        wins_mask[bonusInd] = "np";
    }

    result["status"] = status.join();
    result["wins_mask"] = wins_mask.join();
    result["wins"] = wins.join();
    result["wp"] = player.machine.totalMulti;

    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        coef: player.machine.krakenMode ? 1 : player.virtualBet,
        na: "s",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        index: "3",
        wp: "0",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = player.machine.moneyBonusWin;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

module.exports = ApiManager;