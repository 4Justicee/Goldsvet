var Util = require('../../../utils/slot_utils');

var randomModeArray = ["", "rwf_s0", "rwf_s1", "msf", "cmp"];
var freeSpinTypeArray = ["", "prf", "psm"];

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: '12',
        def_s: '9,6,3,4,5,4,8,6,9,8,5,3,8,8,7',
        msr: '3',
        balance: '0.00',
        cfgs: '3398',
        ver: '2',
        index: '1',
        balance_cash: '0.00',
        reel_set_size: '8',
        def_sb: '2,7,5,3,5',
        def_sa: '6,2,7,3,8',
        reel_set: '0',
        prg_cfg_m: 'wm,s,s,wms,s',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        cls_s: '-1',
        gmb: '0,0,0',
        rt: 'd',
        stime: '1646040050781',
        sa: '6,2,7,3,8',
        sb: '2,7,5,3,5',
        prg_cfg: '1,16,15,16,15',
        sc: '10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00',
        defc: '100.00',
        sh: '3',
        wilds: '2~500,200,40,2,0~1,1,1,1,1;17~500,200,40,2,0~1,1,1,1,1;18~500,200,40,2,0~1,1,1,1,1',
        bonuses: '0;13;14',
        fsbonus: '',
        c: '100.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;400,200,40,2,0;300,140,40,0,0;200,100,20,0,0;200,100,20,0,0;100,20,8,0,0;100,20,8,0,0;50,10,4,0,0;50,10,4,0,0;50,10,4,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0',
        l: '20',
        rtp: '94.50',
        reel_set0: '2,9,10,11,3,3,3,9,10,8,6,10,4,9,8,5,9,0,7,8~5,9,8,4,7,4,9,11,4,7,5,2,10,9,5,11,6,9,10,11,3,3,3,10,6,9,8~11,10,5,7,6,11,4,7,11,3,3,3,9,11,0,9,10,4,8,5,10,2,7,0~11,10,7,6,10,11,3,3,3,8,5,9,7,2,4,9,8,5,9~6,10,9,3,3,3,9,10,2,8,10,5,8,6,11,9,6,11,14,9,13,4,11,6,7,8,11,4,9,8,5,10,7,14,4,11,10,2,8',
        s: '9,6,3,4,5,4,8,6,9,8,5,3,8,8,7',
        reel_set2: '4,9,10,11,3,3,3,5,7,11,9,5,10,8,11,9,7,10,8,11,10,6,11,7~5,9,8,4,7,11,4,8,10,6,7,11,8,7,9,6,11,3,3,3~7,11,8,6,11,10,5,7,6,11,5,3,3,3,7,4,8,5,10,6,9,8~11,10,7,6,10,6,7,4,11,6,10,11,5,8,3,3,3,3,11,9,5,8,10,4,8,10,9,7,4,11,5,9,8~6,10,9,3,3,3,3,9,10,11,8,10,5,8,6,7,5,10,6,7,4,8',
        reel_set1: '8,12,9,12,12,12,9,12,8,12,12,11,12,8,2,4,5,12,12,12,12,12,7,12,12,12,6,2,8,12,12,10,6,3~12,12,9,12,10,4,12,9,12,12,12,3,12,2,5,10,12,12,12,12,10,12,11,7,12,8,12,10,6,12~12,8,12,12,10,12,8,12,12,7,12,12,12,12,12,12,12,12,6,12,7,2,9,6,2,9,12,12,3,4,4,5,11~5,10,4,7,6,10,5,12,12,9,12,6,12,12,10,12,11,12,5,12,4,8,3,11,2,9,3,8,12,10,12,7,12~6,2,11,12,7,12,12,12,5,12,8,12,9,12,8,12,12,12,12,10,12,7,12,10,12,9,12,9,11,12,4,3',
        reel_set4: '9,10,11,3,3,3,9,10,8,6,10,4,9,8,5,9,10,2,2,2,7~5,9,8,4,7,11,4,8,10,2,7,11,8,2,3,3,3,10,6,9,8,7,9,6,11~7,11,8,7,2,10,7,2,8,9,2,7,4,8,5,10,6,9,8,3,3,3~11,10,7,6,10,11,5,5,8,3,3,3,11,9,5,8,10,2,8,10,9,7,4,11,5,9,8,6,9~6,10,9,7,6,9,11,3,10,6,7,0,10,5,8,3,11,8,5,10,2,0,7,8,9,5,10,4,11,10,8,5,10,3,7,9',
        reel_set3: '9,2,7,10,11,3,3,3,9,10,8,6,10,4,9,8,5,9,10~5,9,8,4,7,11,4,8,10,2,7,11,8,2,3,3,3,10,6,9,8,7,9,6,11~7,11,8,7,2,10,7,2,8,9,2,7,4,8,5,10,6,9,8,3,3,3~11,10,7,6,10,11,5,5,8,3,3,3,11,9,5,8,10,2,8,10,9,7,4,11,5,9,8,6,9~6,10,9,7,6,9,11,3,10,6,7,0,10,5,8,3,11,8,5,10,0,7,8,9,2,5,10,4,11,10,8,5,10,3,7,9',
        reel_set6: '9,10,11,3,3,3,9,10,8,6,10,4,9,8,5,9,10,2,2,2,7~5,9,8,4,7,11,4,8,10,2,7,11,8,2,3,3,3,10,6,9,8,7,9,6,11~7,11,8,7,2,10,7,2,8,9,2,2,2,7,4,8,5,10,6,9,8,3,3,3~11,10,7,6,10,11,5,5,8,3,3,3,11,9,5,8,10,2,8,10,9,7,4,11,5,9,2,2,2,8,6,9~6,10,9,7,6,9,11,3,10,6,7,0,10,5,8,3,11,8,5,10,0,7,8,9,2,5,10,4,11,10,8,5,10,3,7,2,2,2,9',
        reel_set5: '7,9,10,11,3,3,3,9,2,2,2,10,8,6,10,4,9,8,5,9,10~5,9,8,4,7,11,4,8,10,2,7,11,8,2,3,3,3,10,6,9,8,7,9,6,11~7,11,8,7,2,10,7,2,8,9,2,7,4,8,5,10,6,9,8,3,3,3~11,10,7,6,10,11,5,5,8,3,3,3,11,9,5,8,10,2,8,10,9,2,2,2,7,4,11,5,9,8,6,9~6,10,9,7,6,9,11,3,10,6,7,0,10,5,8,3,11,8,5,10,0,2,7,8,9,5,10,4,11,10,8,5,10,3,7,9',
        reel_set7: '9,10,11,3,3,3,9,10,8,6,10,4,9,2,2,2,2,8,5,9,10,2,7~5,9,8,4,7,11,4,8,10,2,7,11,8,2,3,3,3,10,6,9,8,7,9,6,11~7,11,8,7,2,10,7,2,2,2,8,9,2,7,3,3,3,4,8,5,10,6,9,8~11,10,7,6,10,11,5,5,8,3,3,3,11,9,5,8,10,2,8,10,9,7,4,11,5,9,8,6,2,2,2,9~6,10,9,7,6,9,11,3,10,6,7,0,10,5,8,3,11,8,5,10,0,7,8,9,2,5,10,4,11,2,2,2,10,8,5,10,3,7,9',
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

    result["msr"] = player.machine.stackSymbol;

    var mode = player.machine.randomSpinMode;

    if (mode) {
        if (player.machine.randomSpinIndex == 0) {
            result["bgid"] = 0;
            result["bgt"] = 41;
            result["bw"] = 1;
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

        if (mode != 4) {
            result["is"] = player.machine.maskView;
            result["rs_f"] = randomModeArray[mode];

            if (player.machine.randomSpinCache.length == 1) {
                result["rs_t"] = 1;
            }
        }

        if (mode == 1) {
            if (player.machine.randomSpinCache.length == 2) {
                result.rs_f += "_es";

                result["apt"] = "tr";
                result["apv"] = 1;
                result["apwa"] = "0.00";

                if (player.machine.randomSpinIndex == 1) {
                    result["rs_c"] = 1;
                    result["rs_m"] = 1;
                    result["rs_p"] = 1;
                    result["rs"] = "mc";
                    result["na"] = "s";
                } else {
                    result["rs_t"] = 2;
                }
            }

            result["rwd"] = `17~${player.machine.wPosArr}`;
        } else if (mode == 2) {
            if (player.machine.multi > 1) {
                result.rs_f += "_mul";

                result["apt"] = "mul";
                result["apv"] = 2;
                result["apwa"] = "0.00";
                result["gwm"] = 2;
            }

            result["rwd"] = `18~${player.machine.wPosArr}`;
        }
    }

    var type = player.machine.freeSpinType;

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            if (type == 1) {
                result["apt"] = "tr,tr";
                result["apv"] = 1, 1;
                result["apwa"] = "0.00,0.00";
                result["prg_m"] = "cp,lvl,tp";
                result["prg"] = "0,0,1";
            } else {
                result["apt"] = "tr";
                result["apv"] = 1;
                result["apwa"] = "0.00";
                result["prg_m"] = "wm";
                result["prg"] = 1;
            }

            result["rs_c"] = 1;
            result["rs_f"] = freeSpinTypeArray[type];
            result["rs_m"] = 1;
            result["rs_p"] = mode ? 1 : 0;
        }
    } else if (prevGameMode == "FREE") {
        //                       

        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 3;

        if (player.machine.bottlePos >= 0) {
            result["is"] = Util.view2String(player.machine.maskView);
            result["srf"] = `0~${14 + type}~${player.machine.bottlePos}`;
        }

        if (type == 1) {
            result["prg_m"] = "cp,lvl,tp";
            result["prg"] = `${player.machine.freeSpinLevel}~${player.machine.freeSpinLevel}~${player.machine.freeSpinLevel + 1}`;
        } else {
            if (player.machine.multi > 1) {
                result["gwm"] = player.machine.multi;
            }

            result["prg_m"] = "wm";
            result["prg"] = player.machine.freeSpinLevel + 1;
        }

        if (player.machine.currentGame == "FREE") {


            result["na"] = "s";
            result["rs_c"] = 1;
            result["rs_f"] = freeSpinTypeArray[type];
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.freeSpinIndex + (mode ? 1 : 0);
            result["rs"] = "mc";
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            if (type == 1) {
                result["prg_m"] = "cp,lvl";
                result["prg"] = "5,5";
            }
            result["rs_f"] = freeSpinTypeArray[type];
            result["rs_t"] = player.machine.freeSpinLength + (mode ? 1 : 0);
            result["na"] = "c";
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
        bgid: 0,
        bgt: 41,
        coef: player.virtualBet,
        counter: ++param.counter,
        end: 1,
        index: param.index,
        level: 1,
        lifes: 0,
        na: "s",
        rs_c: 1,
        rs_f: randomModeArray[player.machine.randomSpinMode],
        rs_m: 1,
        rs_p: 0,
        rs: "sm",
        rw: 0,
        status: [0, 0, 0],
        stime: new Date().getTime(),
        sver: 5,
        wins_mask: ['h', 'h', 'h'],
        wins: [0, 0, 0],
        wp: 0
    };

    var randomInd = player.machine.randomInd;

    if (player.machine.randomSpinMode == 1 && player.machine.randomSpinCache.length == 2) {
        result.rs_f += "_es";
    } else if (player.machine.randomSpinMode == 2 && player.machine.multi > 1) {
        result.rs_f += "_mul";
    }

    result.status[randomInd] = result.rs_f;
    result.status[randomInd] = 1;
    result.wins_mask[randomInd] = result.rs_f;
    result.wins[randomInd] = 1;

    return result;
}

module.exports = ApiManager;