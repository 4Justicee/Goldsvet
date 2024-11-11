var Util = require('../../../utils/slot_utils');
var typeArr = ['nff', 'sff', 'mff'];
var typeNameArr = ['nfs', 'sfs', 'mfs'];

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: '3,3,7,7,4,11,5,6,7,11,10,5,9,8,8',
        balance: '100,000.00',
        cfgs: '1',
        ver: '2',
        index: '1',
        balance_cash: '100,000.00',
        reel_set_size: '6',
        def_sb: '7,11,8,10,6',
        def_sa: '6,3,5,8,11',
        reel_set: '0',
        prg_cfg_m: 'cp,wm,s',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        gameInfo: '{props:{max_rnd_sim:\"1\",max_rnd_hr:\"66666666\",max_rnd_win:\"2500\"}}',
        base_aw: 'tt~rwf;t;tt~rwgsf;n',
        stime: '1645776703879',
        sa: '6,3,5,8,11',
        sb: '7,11,8,10,6',
        sc: '10.00,20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00',
        defc: '100',
        prg_cfg: '0,4,12',
        sh: '3',
        wilds: '2~1000,400,100,4,0~1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '100',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,200,50,2,0;500,150,40,0,0;250,100,30,0,0;200,75,20,0,0;175,50,10,0,0;150,30,10,0,0;125,20,8,0,0;100,10,6,0,0;100,10,4,0,0;0,0,0,0,0',
        l: '20',
        rtp: '96.53',
        reel_set0: '9,8,6,3,3,3,11,5,10,5,2,4,3,3,3,10,1,7,7,8,11,1,9,10,6~7,10,9,7,11,4,3,3,3,10,8,3,3,3,11,9,10,6,11,5,2,8,9,6~2,9,4,11,1,6,10,9,7,7,4,3,3,3,8,10,8,11,5,10,5,3,3,3,6~8,7,3,3,3,10,7,6,11,10,7,11,8,11,4,9,7,11,3,3,3,9,5,10,8,6,8,9,2,9,10~1,11,4,9,7,1,3,3,3,8,10,10,5,6,6,8,2,7,11,9,9,11,7,8,8,10,7,3,3,3,10,9',
        s: '3,3,7,7,4,11,5,6,7,11,10,5,9,8,8',
        reel_set2: '2,9,3,2,10,7,2,11,8,2,5,4,6~2,9,2,3,10,8,2,7,11,2,6,4,5~2,3,4,5,6,7,8,9,10,11~2,11,8,2,9,7,2,3,6,4,2,10,5~2,5,11,8,9,2,11,4,7,2,10,6,9,8,7,10,4,3',
        reel_set1: '10,7,10,6,9,3,3,3,11,8,8,10,11,8,9,4,3,3,3,7,5~6,11,8,4,10,7,3,6,10,9,11,8,3,3,3,10,11,9,9,5~11,6,3,3,3,7,11,10,4,8,8,6,5,7,10,9,9,5~10,7,11,8,8,10,6,3,3,3,6,9,5,10,9,7,11,8,9,7,10,4,9,11,8,7,11~7,10,10,5,6,9,11,7,11,10,4,3,3,3,11,9,8,8,5,10,7,11,8,9,9,7,10,6,8',
        reel_set4: '7,9,11,2,8,6,12,10,9,10,4,12,11,6,7,8,3,3,3,5,3,8,10~9,3,3,3,7,5,10,4,9,6,11,9,10,8,8,11,11,2,10,6~3,3,3,11,10,12,10,6,9,4,8,11,10,9,2,7,4,5,5,8~10,4,6,8,8,9,9,6,3,3,3,5,2,8,7,9,10,7,8,9,7,10,11,11,10,11,7,11~6,2,7,8,4,11,10,11,9,10,3,3,3,9,10,7,11,9,12,8,7,9,12,8,10,8,4,6,11,7,5',
        reel_set3: '4,10,2,11,5,10,9,6,8,11,7,7,8,3,3,3,10,9,5~2,10,6,8,3,3,3,11,4,8,6,7,9,10,3,3,3,11,11,9,5,9,10~4,11,7,8,9,10,5,4,5,8,3,3,3,10,6,11,2,11,9~6,8,4,8,11,7,7,11,5,9,6,11,10,3,3,3,11,9,10,8,7,2,9,7,10,10,9,8~8,10,9,10,6,3,3,3,11,6,5,8,4,9,8,10,4,9,7,11,11,2,7,11,8,9,8,7,7',
        reel_set5: '2,7,4,2,5,6,2,10,8,2,11,9,3~2,4,9,2,10,3,2,5,8,2,11,7,6~2,3,4,5,6,7,8,9,10,11~2,11,9,2,7,6,2,8,10,2,5,4,3~2,8,3,10,5,2,6,7,11,4,2,5,6,8,7,9,9,11,10',
        awt: 'rsf',
    };

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
        tw: player.machine.winMoney,
        balance: 0,
        index: 1,  
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        reel_set: 0,    //                              
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 3,
        sver: 5,   
        c: player.betPerLine,
        counter: 1,
        l: 20,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
    };

    //          ,                          
    var screenAbove = player.machine.virtualReels.above;
    var screenBelow = player.machine.virtualReels.below;
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

    var mode = player.machine.randomSpinMode;

    if (mode) {
        result["aw"] = mode - 1;
        result["awt"] = 'rsf';
        result["reel_set"] = mode;

        if (mode == 2) {
            result["bgid"] = 0;
            result["bgt"] = 9;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["rw"] = 0;
            result["status"] = [0, 0, 0, 0, 0];
            result["wins_mask"] = ['h', 'h', 'h', 'h', 'h'];
            result["wins"] = [0, 0, 0, 0, 0];
            result["wp"] = 0;
            result["na"] = 'b';
        } else {
            result["is"] = player.machine.maskView.join();
            result["rwd"] = `${player.machine.changedSymbol}~${player.machine.changedArr.join()}`;
        }

        return result;
    }

    if (prevGameMode == "BASE") {
        result["aw"] = 3;
        result["awt"] = 'rsf';

        if (player.machine.currentGame == "FREE") {
            result["bgid"] = 1;
            result["bgt"] = 21;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["reel_set"] = 0;
            result["na"] = 'b';
            result["rw"] = 0;
            result["status"] = '0,0,0';
            result["wins_mask"] = 'h,h,h';
            result["wins"] = '0,0,0';
            result["wp"] = 0;

            if (player.machine.freeSpinNudge) {
                if (Util.probability(50)) {
                    result["sb"][4] = 1;
                    result["sn"] = `4~1~${player.machine.view[9]},${player.machine.view[14]},1~${Util.random(1, 100)}~1`;
                } else {
                    result["sa"][4] = 1;
                    result["sn"] = `4~1~1,${player.machine.view[4]},${player.machine.view[9]}~${Util.random(1, 100)}~-1`;
                }
            }
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["reel_set"] = player.machine.freeSpinType + 3;

        if (player.machine.freeSpinType == 1) {
            result["prg_m"] = 'cp,tp,wm';
            result["prg"] = `${player.machine.nCoins},5,${player.machine.multi}`;
            result["gwm"] = player.machine.multi;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            if (player.machine.isFreeSpinAdd) {
                result["fsmore"] = 5;
            }
            result["fsmul"] = 1;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["tw"] = player.machine.freeSpinWinMoney;

            if (player.machine.freeSpinType == 0) {
                result["fsmul"] = player.machine.multi;
                result["fswin"] = player.machine.freeSpinWinMoney / player.machine.multi;
                result["w"] = player.machine.winMoney / player.machine.multi;
            } else {
                result["fswin"] = player.machine.freeSpinWinMoney;
                result["w"] = player.machine.winMoney;
            }
        }
        else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            if (player.machine.freeSpinType == 0) {
                result["fsmul_total"] = player.machine.multi;
            }
            result["fswin_total"] = player.machine.freeSpinWinMoney / player.machine.multi;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["tw"] = player.machine.freeSpinWinMoney;
        }

    }
    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance: player.balance,
        index: param.index,
        balance_cash: player.balance,
        balance_bonus: "0.0",
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
        counter: ++param.counter
    };

    return result;
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: `0.00`,
        balance_cash: player.balance,
        balance: player.balance,
        end: 1,
        level: 1,
        counter: ++param.counter,
        index: param.index,
        na: `s`,
        stime: new Date().getTime(),
        sver: `5`,
    }

    if (player.machine.randomSpinMode) {
        var piddleMultiArr = [5, 10, 15, 20, 50];

        while (piddleMultiArr[player.machine.randomInd] != player.machine.multi) {
            Util.shuffle(piddleMultiArr);
        }

        var status = [0, 0, 0, 0, 0];
        status[player.machine.randomInd] = 1;

        result["bgid"] = 0;
        result["bgt"] = 9;
        result["ceof"] = player.virtualBet;
        result["rw"] = Number(player.virtualBet) * player.machine.multi;
        result["status"] = status.join();
        result["wins_mask"] = 'w,w,w,w,w';
        result["wins"] = piddleMultiArr.join();
        result["wp"] = player.machine.multi;
        result["lifes"] = 0;
        result["na"] = 'cb';
    } else if (player.machine.currentGame == "FREE") {
        var type = player.machine.freeSpinType;

        if (player.machine.freeSpinSelectLevel == 1) { //                                1                      
            result["bgid"] = 1;
            result["bgt"] = 21;

            if (type == 0) {
                result["na"] = 'b';
            } else {
                result["ceof"] = player.virtualBet;
                result["fs"] = 1;
                result["fsmax"] = player.machine.freeSpinLength;
                result["fsmul"] = 1;
                result["fswin"] = 0;
                result["fsres"] = 0;
                result["prg_m"] = 'cp,tp,wm';
                result["prg"] = '0,5,4'
            }

            var fsTypeArr = ['oswr', 'cmp', 'gsf'];
            var fsTypeRandomArr = ['oswr', 'cmp', 'gsf'];

            while (fsTypeRandomArr[player.machine.randomInd] != fsTypeArr[type]) {
                Util.shuffle(fsTypeRandomArr);
            }

            status = [0, 0, 0];
            status[player.machine.randomInd] = 1;
            result["status"] = status.join();

            var wins = [];

            for (var i = 0; i < 3; ++i) {
                switch (fsTypeRandomArr[i]) {
                    case 'oswr':
                        wins.push(1);
                        break;
                    case 'gsf':
                        wins.push(3);
                        break;
                    case 'cmp':
                        wins.push(player.machine.freeSpinLength);
                    default:
                        break;
                }
            }
            result["lifes"] = 0;
            result["rw"] = 0;
            result["wins_mask"] = fsTypeRandomArr.join();
            result["wins"] = wins.join();
            result["wp"] = 0;
        } else if (type == 0) {
            result["bgid"] = 2;
            result["bgt"] = 24;
            result["end"] = 0;
            result["level"] = player.machine.selectIndex - 1;
            result["na"] = 'b';
            result["status"] = player.machine.selectCache.status.join();
            result["win_fs"] = player.machine.freeSpinLength;
            result["win_mul"] = player.machine.multi;
            result["wins_mask"] = player.machine.selectCache.wins_mask.join();
            result["wins"] = player.machine.selectCache.wins.join();

            if (player.machine.selectIndex > player.machine.selectList.length) {
                result["end"] = 1;
                result["fs"] = 1;
                result["fsmax"] = player.machine.freeSpinLength;
                result["fsmul"] = player.machine.multi;
                result["fsres"] = 0;
                result["fswin"] = 0;
                result["na"] = 's';
            }
        }

    }

    return result;
}

ApiManager.prototype.CollectBonusApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        coef: player.virtualBet,
        na: "s",
        stime: "1629939208592",
        sver: "5",
        counter: "2",
        index: "3",
        wp: "0",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["rw"] = Number(player.virtualBet) * player.machine.multi;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

module.exports = ApiManager;