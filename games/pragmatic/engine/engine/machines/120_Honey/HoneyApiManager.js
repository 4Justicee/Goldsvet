var Util = require('../../../utils/slot_utils');

var randomModeArray = ["", "rwsm", "sssm", "bwsm", "nksm", "fssm"];
var freeSpinTypeArray = ["ssf", "gsft"];

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '10,9,11,10,10,11,8,8,7,9,3,4,1,6,3',
        balance: '0.00',
        cfgs: '3303',
        ver: '2',
        index: '1',
        balance_cash: '0.00',
        reel_set_size: '4',
        def_sb: '3,7,11,10,3',
        def_sa: '9,5,7,11,6',
        reel_set: '3',
        bonusInit: '[{bgid:2,bgt:40,av_symb:"3,4,5,6,7,8,9,10,11"},{bgid:3,bgt:40,av_symb:"3,4,5,6,7,8,9,10,11"}]',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        cls_s: '16',
        gmb: '0,0,0',
        rt: 'd',
        stime: '1646040134052',
        sa: '9,5,7,11,6',
        sb: '3,7,11,10,3',
        sc: '10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00',
        defc: '100.00',
        sh: '3',
        wilds: '2~500,200,50,2,0~1,1,1,1,1;12~500,200,50,2,0~1,1,1,1,1;13~500,200,50,2,0~1,1,1,1,1;14~500,200,50,2,0~1,1,1,1,1;15~500,200,50,2,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '100.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,200,40,2,0;300,100,30,0,0;200,80,20,0,0;200,80,20,0,0;150,40,8,0,0;150,40,8,0,0;100,10,4,0,0;100,10,4,0,0;100,10,4,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0',
        l: '20',
        rtp: '94.50',
        reel_set0: '4,8,7,3,3,3,3,10,6,2,11,5,9,1,8,5,7,10,6,11,4,9,2,8,10,4,7,6,1,5,9,8,5,7~4,8,7,3,3,3,3,10,6,2,11,5,9,8,5,7,10,6,11,4,9,8,2,10,4,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,2,11,5,9,1,8,5,7,10,6,11,4,9,2,8,10,4,7,6,1,5,9,8,5,7~4,8,7,3,3,3,3,10,6,2,11,5,9,8,5,7,10,6,11,4,9,8,2,10,4,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,2,11,5,9,1,8,5,7,10,6,11,4,9,2,8,10,4,7,6,1,5,9,8,5,7',
        s: '10,9,11,10,10,11,8,8,7,9,3,4,1,6,3',
        reel_set2: '4,8,7,3,3,3,3,10,6,11,5,9,2,8,5,7,10,6,11,4,9,8,10,4,2,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,11,5,9,2,8,5,7,10,6,11,4,9,8,10,4,2,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,11,5,9,2,8,5,7,10,6,11,4,9,8,10,4,2,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,11,5,9,2,8,5,7,10,6,11,4,9,8,10,4,2,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,11,5,9,2,8,5,7,10,6,11,4,9,8,10,4,2,7,6,11,5,9,8,5,7',
        reel_set1: '4,8,7,3,3,3,3,10,6,11,5,9,8,5,7,10,6,11,4,9,8,10,4,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,11,5,9,8,5,7,10,6,11,4,9,8,10,4,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,11,5,9,8,5,7,10,6,11,4,9,8,10,4,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,11,5,9,8,5,7,10,6,11,4,9,8,10,4,7,6,11,5,9,8,5,7~4,8,7,3,3,3,3,10,6,11,5,9,8,5,7,10,6,11,4,9,8,10,4,7,6,11,5,9,8,5,7',
        reel_set3: '11,9,5,8,10,3,11,4,8,9,7,5,10,6~3,11,4,8,9,7,5,10,6,11,9,5,8,10~6,11,9,5,8,10,3,11,4,8,9,7,5,10~8,9,7,5,10,6,11,9,5,8,10,3,11,4~5,8,10,3,11,4,8,9,7,5,10,6,11,9',
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
        balance_bonus: "0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        c: "100.00",
        counter: "1",
        index: "1",
        l: "20",
        ls: "0",
        na: "s",
        reel_set: "0",
        stime: new Date().getTime(),
        s: "14,6,4,11,8,9,7,6,9,10,8,11,7,5,4",
        sa: "11,9,1,8,12",
        sb: "13,12,11,13,13",
        sh: "3",
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    result["s"] = player.machine.view;
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

    var mode = player.machine.randomSpinMode;

    if (mode) {
        if (player.machine.randomSpinIndex == 0) {
            result["bgid"] = 1;
            result["bgt"] = 41;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["na"] = "b";
            result["rw"] = 0;
            result["status"] = '0,0,0';
            result["wins_mask"] = 'h,h,h';
            result["wins"] = '0,0,0';
            result["wp"] = 0;

            return result;
        }

        if (mode != 5) {
            if (player.machine.maskView.length) {
                result["is"] = player.machine.maskView;
            }
            result["rs_f"] = randomModeArray[mode];

            if (player.machine.randomSpinCache.length == 1) {
                result["rs_t"] = 1;
            }

            result["rs_win"] = player.machine.randomSpinWin;
        }

        if (mode == 5 && player.machine.randomSpinIndex == 0) {
            result["rs_f"] = freeSpinTypeArray[type];
            result["rs_t"] = 1;
            result["rs_win"] = 0;
        }

        if (mode == 1) {

            if (player.machine.randomSpinCache.length == 2) {
                var sty = [];

                player.machine.msrPosArr.forEach(function (item) {
                    sty.push(`${item},${player.machine.randomSpinIndex == 1 ? item : -1}`);
                });

                result["sty"] = sty.join(';');

                if (player.machine.randomSpinIndex == 1) {
                    result["na"] = "s";
                    result["rs_c"] = 1;
                    result["rs_m"] = 1;
                    result["rs_p"] = 1;
                    result["rs"] = "mc";

                } else {
                    result["rs_t"] = 2;
                    result["tw"] = player.machine.randomSpinWin;
                }
            } else {
                result["rwd"] = `13~${player.machine.msrPosArr}`;
            }

        } else if (mode == 2) {
            result["bgid"] = 2;
            result["bgt"] = 40;
            result["bw"] = 1;
            result["cwin_p"] = player.machine.msrPosArr;
            result["end"] = 0;
            result["na"] = "b";
            result["win_p"] = player.machine.msrPosArr;
        } else if (mode == 3) {
            var srf = [];

            player.machine.msrPosArr.forEach(function (item) {
                srf.push(`${player.machine.maskView[item]}~${player.machine.stackSymbol}~${item}`);
            });

            result["srf"] = srf.join(';');
        }
    }

    var type = player.machine.freeSpinType;

    if (prevGameMode != "FREE") {
        if (player.machine.currentGame == "FREE") {
            result["bgid"] = 0;
            result["bgt"] = 30;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["rw"] = 0;
            result["status"] = [0, 0];
            result["wins_mask"] = ['ssf', 'gsft'];
            result["wins"] = [8, 5];
            result["wp"] = 0;
            result["na"] = 'b';

        }
    } else if (prevGameMode == "FREE") {
        //                       

        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 3;

        if (player.machine.currentGame == "FREE") {
            if (player.machine.freeSpinIndex <= player.machine.freeSpinLength) {
                result["na"] = "s";
                result["fs"] = player.machine.freeSpinIndex;
                result["fsmax"] = player.machine.freeSpinLength;
                result["fsmul"] = 1;
                result["fsres"] = 0;
                result["fstype"] = freeSpinTypeArray[type];
                result["fswin"] = player.machine.freeSpinWinMoney;

            } else {
                result["fs_total"] = player.machine.freeSpinLength;
                result["fsmul_total"] = 1;
                result["fsres_total"] = 0;
                result["fstype"] = freeSpinTypeArray[type];
                result["fswin_total"] = 0;
                result["na"] = "b";
            }
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsres_total"] = 0;
            result["fstype"] = freeSpinTypeArray[type];
            result["fswin_total"] = 0;
            result["na"] = "c";
        }

        if (type == 0) {
            result["reel_set"] = 3;
            result["bgid"] = 3;
            result["bgt"] = 40;
            result["bw"] = 1;
            result["end"] = 1;
            if (player.machine.msrPosArr.length) {
                result["cwin_p"] = player.machine.msrPosArr;
                result["win_p"] = player.machine.msrPosArr;
                result["end"] = 0;
                result["na"] = "b";
            }
        } else {
            result["reel_set"] = 2;
            if (player.machine.msrPosArr.length) {
                result["is"] = player.machine.maskView;
                result["rwd"] = `${player.machine.stackSymbol}~${player.machine.msrPosArr.join()}`;
            }
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
        balance: player.balance,
        balance_cash: player.balance,
        balance_bonus: "0.00",
        bgid: 1,
        bgt: 41,
        counter: ++param.counter,
        end: 0,
        index: param.index,
        na: "s",
        stime: new Date().getTime(),
        sver: 5,
    };

    if (player.machine.randomSpinMode && player.machine.randomSpinIndex == 0) {
        var randomInd = player.machine.randomInd;

        result["end"] = 1;
        result["level"] = 1;
        result["lifes"] = 0;
        result["rs_c"] = 1;
        result["rs_f"] = randomModeArray[player.machine.randomSpinMode];
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "sm";
        result["rw"] = 0;
        result["status"] = [0, 0, 0];
        result["wins_mask"] = ['h', 'h', 'h'];
        result["wins"] = [0, 0, 0];
        result["wp"] = 0;

        result.status[randomInd] = result.rs_f;
        result.status[randomInd] = 1;
        result.wins_mask[randomInd] = result.rs_f;
        result.wins[randomInd] = 1;

        return result;
    }

    if (player.machine.randomSpinMode == 2 && player.machine.randomSpinIndex > 0 || player.machine.freeSpinIndex > 1) {
        result["bgid"] = 2;
        result["bgt"] = 40;
        result["s"] = player.machine.view;

        if (player.machine.freeSpinIndex > 1) {
            result["bgid"] = 3;
        }

        if (player.machine.strikeLevel == player.machine.strikeList.length) {
            var winLines = player.machine.winLines;

            for (var i = 0; i < winLines.length; i++) {
                result[`l${i}`] = winLines[i];
            }

            result["end"] = 1;
            result["rw"] = player.machine.winMoney;
            result["tw"] = result["rw"];

            if (player.machine.freeSpinIndex > 1) {
                result["tw"] = player.machine.freeSpinWinMoney;
                result["rw"] = player.machine.winMoney;

                if (player.machine.currentGame == "FREE") {
                    result["na"] = "s";
                } else if (player.machine.currentGame == "BASE") {
                    result["na"] = "c";
                }
            } else {
                result["na"] = "cb";
            }

        } else {
            result["end"] = 0;
            result["cwin_p"] = player.machine.msrAdds;
            result["na"] = "b";
        }

        result["win_p"] = player.machine.msrPosArr;

        return result;
    }
    //                
    if (player.machine.freeSpinIndex == 1) {
        var type = player.machine.freeSpinType;

        result["bgid"] = 0;
        result["bgt"] = 30;
        result["coef"] = player.virtualBet;
        result["end"] = 1;
        result["fs"] = 1;
        result["fsmax"] = player.machine.freeSpinLength;
        result["fsres"] = 0;
        result["fstype"] = freeSpinTypeArray[type];
        result["fswin"] = 0;
        result["level"] = 1;
        result["lifes"] = 0;
        result["rw"] = 0;

        result["status"] = [0, 0];
        result["wins_mask"] = ['h', 'h'];
        result["wins"] = [8, 5];
        result["wp"] = 0;

        result.status[type] = 1;
        result.wins_mask[type] = result.rs_f;
    }
    return result;
}

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
        wp: 0,
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result["coef"] = player.betPerLine;
    result["rw"] = player.machine.moneyBonusWin;

    return result;
}

module.exports = ApiManager;